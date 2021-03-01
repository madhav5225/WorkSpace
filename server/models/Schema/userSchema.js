const { Schema } = require("mongoose");
const crypto = require('crypto');

const userSchema = new Schema(
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
        gender: {
            type: String,
            enum: ["male", "female"]
        },
        hashed_password: { type: String, required: true },
        salt: String,
        encrypted_private_key: {type:String},
        public_key:{type:String},
        state: {
            online: { type: Boolean, default: false },
            available: { type: Boolean, default: false }
        },
        log: {
            last_active: { type: Date, default: Date.now }
        },
        joinedAt: {
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

module.exports = userSchema;