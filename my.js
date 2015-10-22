//rdsuenfaezuaq7n.mysql.rds.aliyuncs.com:3306
//cycok  cycmysql
//rj8329y7c6l3mrwl
'use strict'

var Sequelize = require('sequelize');

var sequelize = new Sequelize('rj8329y7c6l3mrwl', 'cycok', 'cycmysql', {
    host: 'rdsuenfaezuaq7n.mysql.rds.aliyuncs.com',
    dialect: 'mysql',
    logging: false
});



var Mans = sequelize.define('mans', {
    myid: {type: Sequelize.INTEGER, primaryKey:true, field :'id'},
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    interest: Sequelize.INTEGER,
},{
    freezeTableName: true,
    tableName: 'mans',
    timestamps: false,
});




//var Mans = sequelize.define('mans', {
//    id: {type:Sequelize.INTEGER, field: 'id', primaryKey:true},
//    name: Sequelize.STRING,
//    age: Sequelize.INTEGER,
//    interest: Sequelize.INTEGER
//});

Mans.all({ logging: console.log}).then(forx);

//Mans.destroy({where: {id:4}, logging: console.log}).then(si);

function si(data){
    console.log(data);
}
function forx(data){
    for(var key in data){
        console.log(data[key].dataValues);
    }

}

//si(Mans.getTableName())

module.exports = sequelize;