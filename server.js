require('dotenv').config();
const sendMessage = require('./twilio');

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

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
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

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const itemsRoutes = require("./routes/items");
const ordersRoutes = require("./routes/orders");
const order_itemsRoutes = require("./routes/order_items");
//const checkoutRoutes = require("./routes/checkout")

app.use("/api/users", usersRoutes(db));
app.use("/api/items", itemsRoutes(db));
app.use("/api/orders", ordersRoutes(db));
app.use("/api/order_items", order_itemsRoutes(db));
//app.use("/api/checkout", checkoutRoutes(db));

                      //

                      //
                      app.post('/sms', (req, res) => {
                        const twiml = new MessagingResponse();
                        //ADD STARTTIME/ENDTIME TO ORDERS TABLE FROM HERE.
                        twiml.message('Your order will be ready in X minutes!');

                        res.writeHead(200, {'Content-Type': 'text/xml'});
                        res.end(twiml.toString());
                      });
                      //


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

//pass through quantity
//pass through price, items, etc

//We're trying to grab quantity from shopping-cart, and insert it into order_items. 
//We want to include data from shopping-cart into req.body

  db.query(`
  INSERT INTO orders (order_time, user_id) VALUES ('${dateTime}',${req.session.userID}) RETURNING *;
`)
.then(data => {res.json(data)});


  // db.query(`
  //   INSERT INTO order_items (user_id, quantity)
  //   VALUES(${req.session.userID}, 2) RETURNING *;
  // `)
  // .then(data => {res.json(data)});




//sendMessage()


})
app.get('*', (req, res) => {  
  res.send(404)
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

