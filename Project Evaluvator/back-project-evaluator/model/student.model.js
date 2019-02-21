const mongoose = require('mongoose');
const bcrypt =require('bcryptjs')
var Studentschema= new mongoose.Schema(
    {
        UserName:{
            type:String,
            unique:true,
            required:"User Name Can't Empty"
        },
        Email:{
            type:String,
            unique :true,
            required:"Email Can't Empty"
        },
        Registrationnumber:{
            type:String,
            unique:true,
            required:"Registration Number Can't empty"

        },
        Password:{
            type:String,
            required:"Password Can't empty"
        },
        Cpassword:{
            type:String,
            required:"Comfirm Password Can't Empty"

        },
        Salt:{
            type:String
        }
    }
)
Studentschema.path('Email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
 }, 'Invalid e-mail.');
 

Studentschema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.Password, salt, (err, hash) => {
            this.Password = hash;
            this.Cpassword= hash;
            this.Salt = salt;
            next();
        });
    });
});
Studentschema.methods.verifyPassword = function(password)
{
  return bcrypt.compareSync(password,this.Password);
}
Studentschema.methods.verifyEmail = function()
{
    return this.isvalid;
}


mongoose.model("Students",Studentschema)

