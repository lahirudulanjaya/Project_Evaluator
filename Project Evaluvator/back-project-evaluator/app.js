require('./config/config');

require('./model/db');
require('./config/passportconfig');

const express = require('express')
const bodyparser = require('body-parser')
const cors =require('cors')
const passport = require('passport');
const rtsIndex = require('./router/index.router');
const path =require('path')
var app = express();
var port = process.env.PORT || 4000

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('../front-project-evaluator/build'));
  
    app.get('*', (req, res) => {
        let reqPath = path.join(__dirname, '../')
      res.sendFile(path.resolve(reqPath, 'front-project-evaluator', 'build', 'index.html'));
    });
  }
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}));

app.use(cors())
app.use(passport.initialize())
app.use('/api',rtsIndex)
app.use('/uploads', express.static('uploads'));

app.use((err, req, res, next) => {
    if(err.name === 'ValidationError'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});
app.listen(port, ()=>
console.log(`server started at port :${process.env.PORT}`)
);

