var express = require('express');
var connection = require('../db/mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* user list page */
router.get('/admin', function(req, res, next) {

  connection.query('select * from t_user', function(err, rows){
      if(err) {
          res.render('userList', {'status':'Error'});
      } else {
          res.render('userList', {'status':'OK', 'data':rows});
      }
  });
});


/* user Update page */
router.get('/admin/update', function(req, res, next) {
  connection.query('select * from t_user where uid = ?', [req.query.uid], function(err, rows){
      if(err) {
          console.log(err);
          res.render('userUpdate', {'status':'Error'});
      } else {
          console.log(rows);
          res.render('userUpdate', {'status':'OK', 'data':rows});
      }
  });
});


//update process
router.post('/update/process', function(req, res, next) {
  var sql =  'update t_user set uid=?, login_id=?, login_pwd =?, user_name = ?, email=? where uid = ?;';
  var values = [req.body.user_uid,
                req.body.login_id,
                req.body.login_pwd,
                  req.body.user_name,
                  req.body.user_email,
                  req.body.user_uid];
  
  connection.query(sql, values, function(err, result){
      if(err) {
        console.log(err);
          res.json({'status':'Error'});
      } else {
        console.log(result); 
          ///수정사항 있을 경우 없을 경우
          if(result.changedRows!=0){
              res.json({'status':'OK'});
          } else{
              res.json({'status':'error'});
          }
          
      }
  });

});
//update process
router.post('/update/delete', function(req, res, next) {
  var sql =  'delete from t_user where uid = ?;';
  connection.query(sql, req.body.user_uid, function(err, result){
      if(err) {
          res.json({'status':'Error'});
      } else {
          res.json({'status':'OK'});
      }
  });

});



module.exports = router;