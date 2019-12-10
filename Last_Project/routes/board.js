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


/* search list page */
router.post('/search', function(req, res, next) {
    var sql = "select * from t_board where title like ?"
    var value = ['\%' + req.body.searchKey + '\%']
    connection.query(sql,value ,function(err, rows){
        if(err) {
            console.log(err);
            res.render('boardList', {'status':'Error'});
        } else {
            console.log(rows);
            res.render('boardList', {'status':'OK', 'data':rows});
        }
    });
});



/* board Update page */
router.get('/update', function(req, res, next) {
    connection.query('select * from t_board where bid = ?', [req.query.bid], function(err, rows){
        if(err) {
            console.log(err);
            res.render('boardUpdate', {'status':'Error'});
        } else {
            console.log("success");
            res.render('boardUpdate', {'status':'OK', 'data':rows});
        }
    });
});

//update process
router.post('/update/process', function(req, res, next) {
    var sql =  'update t_board set title=?, content=? where bid = ?;';
    var values = [req.body.board_title,
                    req.body.board_content,
                    req.body.bid];
    connection.query(sql, values, function(err, result){
        if(err) {
            res.json({'status':'Error'});
        } else {
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
    var sql =  'delete from t_board where bid = ?;';
    connection.query(sql, req.body.bid, function(err, result){
        if(err) {
            res.json({'status':'Error'});
        } else {
            res.json({'status':'OK'});
        }
    });

});


module.exports = router;
