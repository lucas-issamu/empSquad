const mongoose = require("mongoose");

const connection = async function () {
    try {
        await mongoose.connect(
            'mongodb+srv://<username>:<password>@enterpriseapi.4wyt7.mongodb.net/enterprise?retryWrites=true&w=majority',
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Connection Failed'));
        db.once('open', function () {
            console.log('Connected!');
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = connection 
