require('dotenv').config();
const { sendMessage } = require('./twilio');
let textMessage = null;

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const cookie = require('cookie-session');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

app.set("view engine", "ejs");
app.use(morgan('dev'));
app.use(cookie({
  name:'session',
  keys: ['key1']}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

const usersRoutes = require("./routes/users");
const itemsRoutes = require("./routes/items");
const ordersRoutes = require("./routes/orders");
const order_itemsRoutes = require("./routes/order_items");
app.use("/api/users", usersRoutes(db));
app.use("/api/items", itemsRoutes(db));
app.use("/api/orders", ordersRoutes(db));
app.use("/api/order_items", order_itemsRoutes(db));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  //RESPONSE FROM RESTAURANT
  textMessage = req.body.Body;
  //CREATE NEW DATES && CHECK FOR >59 to rollover hours
  let today = new Date();
  let timezone = 8;
  let readyMinutes = today.getMinutes() + Number(textMessage);
  if (readyMinutes > 59) {
    timezone-=1;
    readyMinutes-=60;
  }
  let start_time = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}T${today.getHours()-timezone}:${today.getMinutes()}:${today.getSeconds()}.000`;
  let end_time = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}T${today.getHours()-timezone}:${readyMinutes}:${today.getSeconds()}.000`;
  //ADD STARTTIME/ENDTIME TO ORDERS TABLE FROM HERE.
  db.query(`
  UPDATE orders
  SET start_time='${start_time}', end_time='${end_time}'
  WHERE id=(SELECT id FROM orders
    ORDER BY id DESC LIMIT 1)
  `, []);
  twiml.message('Server successfully received text');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});
//render index
app.get("/", (req, res) => {
  const templateVars = {
    user: req.session.userID
  }
  res.render("index", templateVars);
});
//login
app.post('/api/login', (req,res) => {
  req.session.userID = 1;
    const templateVars = {
      user: req.session.userID
    }
  res.render("index", templateVars);
});
//logout
app.post('/api/logout', (req,res) => {
  req.session = null;
  res.redirect("/");
});
//shopping cart checkout button
app.post('/api/checkout', (req , res) => {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = (today.getHours()-8) + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  //ADD NEW ORDER
  const shoppingCart = req.body.shoppingCartArray
  db.query(`
    INSERT INTO orders (order_time, user_id)
    VALUES ('${dateTime}',${req.session.userID}) RETURNING *;
  `)

  for (const items of shoppingCart) {
    db.query(`
      INSERT INTO order_items (user_id, item_id, order_id, quantity)
      VALUES('${req.session.userID}',(SELECT id FROM items WHERE name = '${items.name}'),(select id FROM orders ORDER BY id DESC LIMIT 1),${items.quantity} ) RETURNING *
    `)
    .then(data => res.redirect('/'))
  }
  //Send Message to Restaurant on Checkout
  // sendMessage('2506824529', 'Hi !!');

})
app.get('*', (req, res) => {
  res.send(404)
  res.redirect('/')
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

