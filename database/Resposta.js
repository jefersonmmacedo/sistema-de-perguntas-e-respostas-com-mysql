const Sequelize = require('sequelize');
const connection = require('./database');

const Resposta = connection.define('respostas',{
resposta:{
	type: Sequelize.TEXT,
	allowNull: false
	},
autorResposta:{
	type: Sequelize.STRING,
	allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

Resposta.sync({force:false}).then(() => {
    console.log('Sincronização efetuada com sucesso!')
});

module.exports = Resposta;