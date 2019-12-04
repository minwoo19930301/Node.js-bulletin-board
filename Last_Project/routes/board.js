var express = require('express');
var connection = require('../db/mysql');

var router = express.Router();

/* board list page */
router.get('/list', function(req, res, next) {

    connection.query('select * from t_board', function(err, rows){
        if(err) {
            res.render('boardList', {'status':'Error'});
        } else {
            res.render('boardList', {'status':'OK', 'data':rows});
        }
    });
});

/* board Register page */
router.get('/register', function(req, res, next) {
    res.render('boardRegister');
});

/* board register process ajax */
router.post('/register/process', function(req, res, next) {

    var sql = 'insert into t_board (user_id, user_name, title, content) ' +
                'values(?,?,?,?)';
    var values = [req.session.login_id, 
                    req.session.user_name,
                    req.body.board_title,
                    req.body.board_content];
    connection.query(sql, values, function(err, result){
        if(err) {
            res.json({'status':'Error'});
        } else {
            if(result.insertId != 0){
                console.log(result);
                res.json({'status':'OK'});
            } else{
                res.json({'status':'error'});
            }
            
        }
    });

});

/* board Register page */
router.get('/update', function(req, res, next) {
    res.render('boardUpdate');
});

module.exports = router;
