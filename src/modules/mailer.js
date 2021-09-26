const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

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
    viewPath: path.resolve("./src/modules/"),
    extName: '.html',
}))

module.exports = transport