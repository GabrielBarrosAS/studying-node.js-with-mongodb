const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://root:<root>@cluster0.mu7dp.mongodb.net/nodemongo?retryWrites=true&w=majority",
                {useNewUrlParser: true })
                .then(() => console.log('MongoDB Connected'))
                .catch(err => console.log(err));
mongoose.Promise = global.Promise

module.exports = mongoose
