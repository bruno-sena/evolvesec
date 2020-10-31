const express = require('express');
const routes = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars')
const db = require('./database/config');
const seq = require('./database/config2')
const transporter = require('./email/config');
const Post = require('./database/Post');


//Config do body-parser
routes.use(bodyParser.urlencoded({extended: false}))
routes.use(bodyParser.json())

//Configuração do handlebars
//Template engine
routes.engine('handlebars', handlebars({defaultLayout: 'main'}))
routes.set('view engine', 'handlebars')


// Rotas para criar usuário
routes.post('/user', (request, response) => {

	const {
		name,
		email,
		password
	} = request.body;

	let verify;
	// Verificando se o usuário existe
	let sql = `SELECT * FROM usuario WHERE email = '${email}'`;
	db.query(sql, (err, result) => {
		let sizeArray = result.rowsAffected[0];
	
		if(sizeArray != 0) {
			response.json({ message: "Esse usuário já existe!" });
		} else {
			const sql = `INSERT INTO usuario(nome, email, senha) VALUES('${name}', '${email}', '${password}')`;
			db.query(sql, (err, result) => {
				if (err) throw err;
				response.json({
					message: "Usuário criado com sucesso!"
				});
		
				const bodyEmailUser = {
					from: 'bruno.sena@bandtec.com.br',
					to: email,
					subject: 'Bem-vindo ao EvolveSec',
					html: 'Seu usuário foi criado com sucesso!'
				}
		
				transporter.sendMail(bodyEmailUser, (err) => {
					if (err) console.log(err)
					console.log('Email Enviado')
				})
			});
		}
	})
	
});

routes.get('/busca', function(req, res){
    Post.findAll().then(function(posts){
        res.json(posts)
    })
    
})

routes.post('/add', function(req, res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('write-ups.html')
    }).catch(function(err){
        res.send('Houve um problema na publicação: ' + err)
    })
})


routes.get('/user/all', (request, response) => {
	let sql = "SELECT * FROM usuario";
	db.query(sql, (err, result) => {
		response.json(result.recordsets[0]);
	});
})



// Login do usuário
routes.post('/login', (request, response) => {

	const { email, senha } = request.body;
	let sql = `SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}'`;
	
	db.query(sql, (err, result) => {
		if(err) throw err;
		let sizeArray = result.rowsAffected[0];
		if(sizeArray == 0) {
			response.json({ message: "Opps.. Usuário ou Senha inválidos!"})
		} else {
			response.json({
				message: "Login feito com sucesso!",
				user: {
					name: result.recordset[0].nomeUsuario,
					email: result.recordset[0].emailUsuario,
					id: result.recordset[0].idUsu
				}
			});
		}
	});
});

module.exports = routes;