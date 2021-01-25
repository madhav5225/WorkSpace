const mongoose = require('mongoose')

//username:admin
// password:admin
// database:ChatApp
const dbUri='mongodb+srv://admin:admin@myfirstcluster.overm.mongodb.net/ChatApp?retryWrites=true&w=majority';

mongoose.connect(dbUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(()=>console.log('Connected With Database'));

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel;