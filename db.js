const mongoose = require('mongoose')

const connectDb = async () => {
    var connected = 0;
    var count = 1;
    while (connected == 0) {
        await mongoose
            .connect(process.env.dbUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            }, { autoReconnect: true })
            .then(() => { console.log('Connected With Database'); connected = 1; })
            .catch((err) => {
                console.log('Not Connected With Database');
                count++;
                console.log('trying to connect' + count + 'times');

                console.log(err);
            });
    }
}

module.exports = connectDb;