/*
작성자 : 하주현
작성일 : 20/09/07
 */
var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', ejs.renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router = require(__dirname + '/router/user')(app);

var server = app.listen(2000, function () {
    console.log('서버가 가동되었습니다.');
})