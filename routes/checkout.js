const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/checkout', (req, res) => {
        db.query(`
            SELECT * FROM users;
        `)
        .then(data => {console.log(data)});
    })
    return router;
}













// */
// const express = require('express');
// const router  = express.Router();

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     let query = `SELECT * FROM widgets`;
//     console.log(query);

//     db.query(query)
//       .then(data => {
//         const widgets = data.rows;
//         res.json({ widgets });
//       })

//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };