const express = require('express')
const Jwtverify = require('../config/jwt')
const router = express.Router()
const CtrlStudent = require('../controller/student.controller')
const CtrlMilestone =require('../controller/milestone.controller')
const CtrlProject =require('../controller/project.controller')


router.post('/Student/register',CtrlStudent.register)
router.post('/authenticate',CtrlStudent.authenticate)
router.get('/studentprofile', Jwtverify.verifyJwtToken, CtrlStudent.studentprofile);
router.post('/pg/postmilestone',CtrlMilestone.addmilestone)
router.get('/pg/getmilestone/:Projectname',CtrlMilestone.getmilstones)
router.post('/pg/addproject',CtrlProject.addproject)

module.exports=router 

