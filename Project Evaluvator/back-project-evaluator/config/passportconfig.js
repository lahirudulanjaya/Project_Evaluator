const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const ctrlStudent = require('../controller/student.controller')
var Student = mongoose.model('Students')

passport.use(
    new localStrategy({ usernameField: 'UserName' },
    (username, Password, done) => {
        Student.findOne({ UserName: username },
            (err, user) => {
                if (err)
                    return done(err,{message:err});
                // unknown user
                else if (!user)
                    return done(null, false, { message: 'Invalid Username' });
                // wrong password
                else if (!user.verifyPassword(Password))
                    return done(null, false, { message: 'Invalid Password.' });
                // unconfiremed Email
                // authentication succeeded
                else{
                //   ctrluser.sendsms(user.phonenumber);
                if(user.type=="student"){
                    if(!user.Active){
                    return done(null, false, { message: 'Please Verify Email.' });
                    }
                    else{
                        return done(null, user);

                    }

                }
                else{
                    return done(null, user);

                }

                }
            });
        })
)

