const User = require("../models/user");

const userListController = (req,res)=>{
    User.find({},{email:1}).exec((err,result)=>{
        console.log(result);
    })
}

module.exports = userListController;