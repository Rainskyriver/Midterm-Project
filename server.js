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

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/items", itemsRoutes(db));
app.use("/api/orders", ordersRoutes(db));
app.use("/api/order_items", order_itemsRoutes(db));
//app.use("/api/checkout", checkoutRoutes(db));

// Note: mount other resources here, using the same pattern above


                      //

                      //
                      app.post('/sms', (req, res) => {
                        const twiml = new MessagingResponse();

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

  db.query(`
  INSERT INTO orders (order_time, user_id) VALUES ('2020-02-08 10:34:09 AM', 3) RETURNING *;
`)
.then(data => {res.json(data)});
//sendMessage()
res.redirect('/');

})
app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

