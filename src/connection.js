const mongoose = require("mongoose");

module.exports = {
    connection: async function () {
        try {
            // Connect to the MongoDB cluster
            await mongoose.connect(
                'mongodb+srv://<username>:<password></password>@enterpriseapi.4wyt7.mongodb.net/enterprise?retryWrites=true&w=majority',
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
        // finally{
        //     await db.close()
        //     console.log('Connection Closed!');
        // }
    }
}