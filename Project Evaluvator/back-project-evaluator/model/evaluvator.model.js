const mongoose =require('mongoose')
const bcrypt =require('bcryptjs')

var evaluvator = new mongoose.Schema(
    {

    Registrationnumber :{
        type:String,
        unique:true
    },
    Email:{
        type:String,
        unique:true
    },
    Password:{
        type:String

    },
    Salt:{
        type:String
    },
})

evaluvator.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.Password, salt, (err, hash) => {
            this.Password = hash;
            this.Salt = salt;
            next();
        });
    });
});
mongoose.model("Evaluvator",evaluvator)