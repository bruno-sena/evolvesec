const seq = require('./config2')

const Post = seq.sequelize.define('postagens', {
    titulo: {
        type: seq.Sequelize.STRING
    },
    conteudo: {
        type: seq.Sequelize.TEXT
    }

})

// Post.sync({force: true})

module.exports = Post