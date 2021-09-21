const mongoose = require('mongoose')


const DB_URI = process.env.MONGODB_URI
mongoose.connect(DB_URI,
                {useNewUrlParser: true })
                .then(() => console.log('MongoDB Connected'))
                .catch(err => console.log(err));
mongoose.Promise = global.Promise

module.exports = mongoose
