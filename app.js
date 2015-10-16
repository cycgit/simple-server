var express = require('express');
var hbs = require('hbs');
var send = require('send');
var bodyParser = require('body-parser');
var app = express();
var wechat = require('wechat');

app.set('view engine', 'hbs');
app.set('views', 'views');
app.engine('hbs', hbs.__express);

var config = {
    token: 'cycweixin',
    appid: 'wxfd5c42c5c6ec5e3b',
    encodingAESKey: 'ILcPKgWv0mWxXpmVzJnSTWBWVza0Kg4rOhmSoIywf4v'
};


//app.use(express.query());
app.use('/static', express.static('static',{Mixed: false}));

app.use(bodyParser.urlencoded({extended: false}));

app.use('/get', wechat(config, function (req, res, next) {
    console.log(req.weixin);
        res.reply({
            content: '你好来自的信息',
            type: 'text'
        });

})

);




app.get('/check', function (req, res) {
    var msg = req.query.echostr
    res.send(msg);
});


app.use(function (req, res) {
    res.status(404);
    res.send('404－未找到');
});

app.use(function (err, req, res, next) {
    res.status(500);
    res.send(err);
});

var env = process.env.NODE_ENV || 'development';

var port = env == 'development'? 4000: 80;

app.listen(port, function () {
    console.log('app start port: ' + port);
})