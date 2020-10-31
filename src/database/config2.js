const Sequelize = require('sequelize');
const sequelize = new Sequelize('postapp', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'

})

sequelize.authenticate().then(function(){
    console.log('Conectado com sucesso')
}).catch(function(err){
    console.log('Falha na conexão' + err)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}