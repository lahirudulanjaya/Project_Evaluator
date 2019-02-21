const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const ctrlStudent = require('../controller/student.controller')
var Student = mongoose.model('Students')

passport.use(
    new localStrategy({ usernameField: 'userName' },
    (username, password, done) => {
        Student.findOne({ userName: username },
            (err, user) => {
                if (err)
                    return done(err);
                // unknown user
                else if (!Student)
                    return done(null, false, { message: 'Invalid Username' });
                // wrong password
                else if (!Student.verifyPassword(password))
                    return done(null, false, { message: 'Invalid Password.' });
                // unconfiremed Email
                else if(!Student.verifyEmail())
                    return done(null,false, {message : 'please verify email address'});
                // authentication succeeded
                else{
                //   ctrluser.sendsms(user.phonenumber);
                    return done(null, Student);

                }
            });
        })
)

