const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0a65f726558bfd",
      pass: "f1bd8c12f53f77"
    }
});

transport.use('compile',hbs({
    viewEngine: {
        extName: ".html",
        partialsDir: path.resolve('./src/resources/mail'),
        defaultLayout: false,
    },
    viewPath: path.resolve("./src/resources/mail"),
    extName: ".html",
}))

module.exports = transport