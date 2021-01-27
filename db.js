const mongoose = require('mongoose')
try {
    mongoose.connect(process.env.dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, { autoReconnect: true }).then(() => { console.log('Connected With Database'); })
        .catch((err) => {
            console.log('Not Connected With Database');
            console.log(err);
        });
}
catch (errr) {
    console.log('Not Connected With Database');
    console.log(err);
}