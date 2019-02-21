require('./config/config');

require('./model/db');
require('./config/passportconfig');

const express = require('express')
const bodyparser = require('body-parser')
const cors =require('cors')
const passport = require('passport');
const rtsIndex = require('./router/index.router');

var app = express();
var port = process.env.PORT || 4000

app.use(bodyparser.json())
app.use(cors())
app.use(passport.initialize())
app.use('/api',rtsIndex)

app.use((err, req, res, next) => {
    if(err.name === 'ValidationError'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});
app.listen(port, ()=>
console.log('server started at port :${process.env.PORT}')
);

