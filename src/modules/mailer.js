const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0a65f726558bfd",
      pass: "f1bd8c12f53f77"
    }
  });

transport.use('compite',hbs({
    viewEngine: 'handlebars',
    viewPath: __dirname,
    extName: '.html',
}))

module.exports = transport