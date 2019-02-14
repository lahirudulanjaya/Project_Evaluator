const express = require('express')

const router = express.Router()
const CtrlStudent = require('../controller/student.controller')


router.post('/Student/register',CtrlStudent.register)


module.exports=router 

