/*
작성자 : 하주현
작성일 : 20/09/07
수정일 : 20/09/09 - 회원가입 라우팅 추가, 유저 비밀번호 암호화&검증 구현
 */
const crypto = require('crypto');
var mysql = require('mysql');
var conn_info = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'uaena'
}

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('user/login');
    });

    app.get('/signup', function (req, res) {
        res.render('user/signup');
    })

    app.post('/', function (req, res) {
        var userName = req.body.userName;
        var userPasswd = req.body.userPasswd;

        var conn = mysql.createConnection(conn_info);
        var sql = 'select * from user where user_name = ?';
        var inputData = [userName];

        conn.query(sql, inputData, function (error, data) {
            dbHashPasswd = data[0].user_passwd;
            userHashPasswd = crypto.createHash('sha512').update(userPasswd + data[0].user_salt).digest('hex');
            if (dbHashPasswd == userHashPasswd) {
                res.redirect('/home');
            }
            else {
                res.redirect('/');
            }
        })
    });

    app.post('/signup', function (req, res) {
        var userName = req.body.userName;
        var userPasswd = req.body.userPasswd;

        var salt = Math.round(new Date().valueOf() * Math.random()) + "";
        var userHashPasswd = crypto.createHash('sha512').update(userPasswd + salt).digest('hex');

        var conn = mysql.createConnection(conn_info);
        var sql = 'insert into user(user_name, user_passwd, user_salt) values(?, ?, ?)';
        var inputData = [userName, userHashPasswd, salt];

        conn.query(sql, inputData, function (error) {
        });
        res.redirect('/');
    });

}