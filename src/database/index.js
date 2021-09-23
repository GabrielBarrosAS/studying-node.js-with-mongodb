const mongoose = require('mongoose')

mongoose.connect("mongodb://mongo:27017/apirest'",
                {useNewUrlParser: true })
                .then(() => console.log('MongoDB Connected'))
                .catch(err => console.log(err));

mongoose.Promise = global.Promise

module.exports = mongoose
