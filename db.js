const mongoose = require('mongoose')

const connectDb = async () => {
    await mongoose
        .connect(process.env.dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }, { autoReconnect: true })
        .then(() => { console.log('Connected With Database'); })
        .catch((err) => {
            console.log('Not Connected With Database');
            console.log(err);
        });
}

module.exports = connectDb;