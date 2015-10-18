'use strict';
var redis = require('redis');
var client = redis.createClient(6379,'121.40.221.49',{});
//var client = redis.createClient('redis://cycok.com:6379',{});
client.on("error", function (err) {
    console.log("Error " + err);
});
client.get('name', function(err, response){
    "use strict";
    console.log(response);

});

client.quit();