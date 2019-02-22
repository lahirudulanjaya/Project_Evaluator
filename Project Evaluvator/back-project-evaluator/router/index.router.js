const express = require('express')
const Jwtverify = require('../config/jwt')
const router = express.Router()
const CtrlStudent = require('../controller/student.controller')


router.post('/Student/register',CtrlStudent.register)
router.post('/authenticate',CtrlStudent.authenticate)
router.get('/studentprofile', Jwtverify.verifyJwtToken, CtrlStudent.studentprofile);



module.exports=router 

