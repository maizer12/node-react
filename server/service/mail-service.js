import nodemailer from 'nodemailer';

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});
	}
	async sendActivationMail(to, link) {
		try {
			await this.transporter.sendMail({
				from: process.env.SMTP_USER,
				to,
				subject: 'Activate your account ' + process.env.API_URL,
				text: '',
				html: `
				<div>
					<a href="test">activation</a>
				</div>
			`,
			});
			console.log('send');
		} catch (err) {
			console.log(err);
		}
	}
}

export default new MailService();
