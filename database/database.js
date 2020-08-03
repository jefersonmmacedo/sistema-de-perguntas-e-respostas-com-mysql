const Sequelize = require('sequelize');

const connection = new Sequelize('pergunte-aqui', 'root', '211902fluminense',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;

