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
  let today = new Date();
  //RESPONSE FROM RESTAURANT
  textMessage = req.body.Body;
  if (textMessage === 'Complete') {
    db.query(`
    UPDATE orders
    SET active='false'
    WHERE id=(SELECT id FROM orders
      ORDER BY id DESC LIMIT 1)
    `);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  } else {


  //CREATE NEW DATES && CHECK FOR >59 to rollover hours
  let timezone = 0;
  let readyMinutes = today.getMinutes() + Number(textMessage);
  if (readyMinutes > 59) {
    timezone+=1;
    readyMinutes-=60;
  }
  let start_time = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}T${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  let end_time = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}T${today.getHours()+timezone}:${readyMinutes}:${today.getSeconds()}`;
  //ADD STARTTIME/ENDTIME TO ORDERS TABLE FROM HERE.
  db.query(`
  UPDATE orders
  SET start_time='${start_time} UTC', end_time='${end_time} UTC'
  WHERE id=(SELECT id FROM orders
    ORDER BY id DESC LIMIT 1)
  `);
  twiml.message(`-
  -------------------
  Successfully sent order to customer!`);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}});
//render index
app.get("/", (req, res) => {
  const templateVars = {
    user: req.session.userID
  }
  res.render("index", templateVars);
});
//login
app.post('/api/login', (req,res) => {
  req.session.userID = 3;
  res.redirect("/");
});
//logout
app.post('/api/logout', (req,res) => {
  req.session = null;
  res.redirect("/");
});
//shopping cart checkout button
app.post('/api/checkout', (req , res) => {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = (today.getHours()) + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date+' '+time + ' UTC';
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
    .then((data) => res.redirect('/'))
  }
  //Construct message to send to restaurant
  let orderMessage = '';
  let total = 0;
  for (const item of shoppingCart) {
    orderMessage += `${item.name}  @  ${item.quantity}  For  ${item.price * item.quantity}$\n`
    total += item.price * item.quantity;
  }
  orderMessage += `Total : ${total}$`;
  //Send Message to Restaurant on Checkout
  sendMessage('2506824529', `-
  New Order
  ---------------\n${orderMessage}
  ---------------\n
  Please respond with how long the order will take to fulfill`);
})
app.get('*', (req, res) => {
  res.send(404)
  res.redirect('/')
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
