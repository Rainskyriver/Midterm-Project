const express = require('express');
const router  = express.Router();

module.exports = (db, orderTime) => {
  router.get("/", (req, res) => {
        res.json({ orderTime });
  });
  return router;
};
