const mongoose = require('mongoose')
const crypto = require('crypto');
try
{
mongoose.connect(process.env.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
},{autoReconnect:true}).then(() =>{ console.log('Connected With Database');})
.catch((err)=>
{
    console.log('Not Connected With Database');
  console.log(err);
});
}
catch(errr)
{
    console.log('Not Connected With Database');
  console.log(err);
}
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        name: {
            first: String,
            last: String,
        },
        phone: {
            type: Number,
            maxlength: 10,
            minlength: 10
        },
        hashed_password: { type: String, required: true },
        salt: String,
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
    }
);

userSchema.virtual('fullname').get(function () {
    return this.name.first + ' ' + this.name.last;
}).set(function (v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
});

userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

// methods
userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },

    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

module.exports = mongoose.model('user', userSchema);