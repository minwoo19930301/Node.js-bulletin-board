var mysql = require('mysql');
module.exports = mysql.createConnection({
    host:'localhost',
    user:'board_user',
    password:'skkutest',
    database:'board_db'
});