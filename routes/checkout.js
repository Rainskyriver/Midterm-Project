const express = require('express');
const router = express.Router();


//This route is not currently in use, middlewear is commented out in server.js


module.exports = (db) => {
    router.get('/checkout', (req, res) => {
        db.query(`
            SELECT * FROM users;
        `)
        .then(data => {console.log(data)});
    })
    return router;
}

