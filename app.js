'use strict';
var express = require('express');
var hbs = require('hbs');
var send = require('send');
var bodyParser = require('body-parser');
var app = express();
var resolve = require('path').resolve;
//var wechat = require('wechat');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

app.set('view engine', 'hbs');
app.set('views', 'views');
app.engine('hbs', hbs.__express);

var config = {
    token: 'cycweixin',
    appid: 'wxfd5c42c5c6ec5e3b',
    encodingAESKey: 'ILcPKgWv0mWxXpmVzJnSTWBWVza0Kg4rOhmSoIywf4v'
};

//
//app.use(session({
//    store: new RedisStore(options),
//    secret: 'cyc'
//}));

app.use('/static', express.static('static', {Mixed: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use(session({
    store: new RedisStore({
        host: "121.40.221.49",
        port: 6379,
        db: 0
    }),
    resave: true,
    saveUninitialized: true,
    secret: 'cyc'
}));


app.get('/', function (req, res) {
    if (req.cookies.login == 1) {
        res.redirect('/show');
    } else {
        res.render('home', req.session);
    }

});


app.get('/show', function (req, res) {
    if (req.cookies.login == 1) {
        res.render('show', req.session);
    } else {
        res.redirect('/');
    }
});
app.get('/set', function (req, res) {
    res.cookie('login', 1, {maxAge: 900000,});
    res.cookie('name', 'cyc', {maxAge: 900000,});
    req.session.sname = '成';
    res.send('ok');
});

app.get('/logout', function (req, res) {
    res.clearCookie('login');
    res.clearCookie('name');


    //req.session.destroy(function (err) {
    //});
    res.redirect('/');

});

app.get('/do', function (req, res) {

    res.download('app.js');
});


app.get('/check', function (req, res) {
    var msg = req.query.echostr;
    res.send(msg);
});


app.use(function (req, res) {
    res.status(404);
    res.send('404－未找到');
});

app.use(function (err, req, res, next) {
    res.status(500);
    res.send('错误');
});

var env = process.env.NODE_ENV || 'development';

var port = env == 'development' ? 4000 : 80;

app.listen(port, function () {
    console.log('app start port: ' + port);
});