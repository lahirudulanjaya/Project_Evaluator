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

Studentschema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.Password = hash;
            this.Cpassword= hash;
            this.Salt = salt;
            next();
        });
    });
});
mongoose.model("Students",Studentschema)

