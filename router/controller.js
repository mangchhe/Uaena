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
        res.render('index.ejs');
    });

    app.post('/login', function (req, res) {
        var user_name = req.body.user_name;
        var user_passwd = req.body.user_passwd;

        var conn = mysql.createConnection(conn_info);
        var sql = 'select * from login where user_name = ? and user_passwd = ?';
        var input_data = [user_name, user_passwd];

        conn.query(sql, input_data, function (error, data) {
            if (data.length != 0) {
                res.render('login.ejs', { is_login: '로그인 성공' });
            }
            else {
                res.render('login.ejs', { is_login: '로그인 실패' });
            }
        })

    });

}