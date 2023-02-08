var express = require('express');
var router = express.Router();
const db = require('../pgpool');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('SUGAR');
});

router.get('/sugar', function(req, res, next) {
  console.log('HERE')
  db.query(`SELECT * FROM users`, (error, results) => {
    if (error) {
      console.log(error)
    }
    console.log(results.rows)
    res.status(200).json(results.rows);
  })
})

module.exports = router;
