const express = require('express')
const Jwtverify = require('../config/jwt')
const router = express.Router()
const CtrlStudent = require('../controller/student.controller')
const CtrlMilestone =require('../controller/milestone.controller')
const CtrlProject =require('../controller/project.controller')
const Ctrlrequest=require('../controller/grouprequest.controller')
const CtrlSheet =require('../controller/googleSheet.controller')

router.post('/Student/register',CtrlStudent.register)
router.post('/authenticate',CtrlStudent.authenticate)
router.get('/userprofile/:_id',  CtrlStudent.userprofile);
router.post('/pg/postmilestone',CtrlMilestone.addmilestone)
router.get('/pg/getmilestone/:Projectname',CtrlMilestone.getmilstones)
router.post('/pg/addproject',CtrlProject.addproject)
router.post('/pg/importstudent',CtrlStudent.Importstudent)
router.get('/pg/getprojectsnames',CtrlProject.getprojectsnames)
router.get('/pg/getallprojects',CtrlProject.getallprojects)
router.put('/pg/changestatus',CtrlProject.updatestate)
router.get('/pg/getstudentdetails',CtrlStudent.getallStudentdetail)
router.get('/pg/sendmails',CtrlStudent.sendemail)
router.get('/pg/getstudents/:year',CtrlStudent.getstudentsbyYear)
router.put('/pg/addGroups',CtrlProject.addGroups)
router.get('/getstudentproject/:id',CtrlProject.getreleventProject)



//grouprequest
router.post('/sendgrouprequest',Ctrlrequest.sendgrouprequest)
router.get('/getsendresquest/:id',Ctrlrequest.getsendrequest)
router.get('/getresquest/:id',Ctrlrequest.getrequest)
router.get('/checkaccepted/:id',Ctrlrequest.checkaccepted)
router.get('/checkallaccepted/:id',Ctrlrequest.checkallaccepted)


//google sheet

router.post('/setgooglesheet',CtrlSheet.createspreadsheet)
module.exports=router 

