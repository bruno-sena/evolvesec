const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: 'smtp.live.com',
	secureConnection: false,
	port: 587,
	auth: {
		user: 'email',
		pass: 'password'
	},
	tls: {
		ciphers: 'SSLv3'
	}
});

module.exports = transporter;