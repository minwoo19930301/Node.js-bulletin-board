var express = require('express');
var connection = require('../db/mysql');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

/* board Update page */
router.get('/update', function(req, res, next) {
  connection.query('select * from t_user where uid = ?', [req.query.bid], function(err, rows){
      if(err) {
          console.log(err);
          res.render('boardUpdate', {'status':'Error'});
      } else {
          console.log("success");
          res.render('boardUpdate', {'status':'OK', 'data':rows});
      }
  });
});