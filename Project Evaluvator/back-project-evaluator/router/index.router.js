const express = require('express')
const Jwtverify = require('../config/jwt')
const router = express.Router()
const CtrlStudent = require('../controller/student.controller')
const CtrlMilestone =require('../controller/milestone.controller')
const CtrlProject =require('../controller/project.controller')
const Ctrlrequest=require('../controller/grouprequest.controller')
const CtrlSheet =require('../controller/googleSheet.controller')
const Ctrltimeslot =require('../controller/timeslot.controller')
const Ctrlevaluvator =require('../controller/evaluvator.controller')
const CtrlSC =require('../controller/sessioncoordinator.controller')


router.post('/Student/register',CtrlStudent.register)
router.post('/authenticate',CtrlStudent.authenticate)
router.get('/userprofile',Jwtverify.verifyJwtToken, CtrlStudent.userprofile);
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
router.get('/pg/getproject/:id',CtrlProject.getproject)

router.get('/pg/getpresentations/:id',CtrlMilestone.getpresentationmilstones)

//grouprequest
router.post('/sendgrouprequest',Ctrlrequest.sendgrouprequest)
router.get('/getsendresquest/:id',Ctrlrequest.getsendrequest)
router.get('/getresquest/:id',Ctrlrequest.getrequest)
router.get('/checkaccepted/:id',Ctrlrequest.checkaccepted)
router.get('/checkallaccepted/:id',Ctrlrequest.checkallaccepted)


//google sheet

router.post('/setgooglesheet',CtrlSheet.createspreadsheet)

//timeslots

router.post('/posttimeslots',Ctrltimeslot.addtimeslots)

//evaluvators

router.post('/addEvaluvator' ,Ctrlevaluvator.addEvaluvator)

router.get('/getEvaluvators' ,Ctrlevaluvator.getEvaluvators)

//sessioncoodinator
router.post('/addSessioncoodinator' ,CtrlSC.addsessioncoodinator)

router.get('/getSessioncoodinator' ,CtrlSC.getsessioncoodinator)

//crud milestones
router.put('/pg/updatemilestone',CtrlMilestone.updatemilestones)
router.delete('/pg/deletemilestone',CtrlMilestone.deletemilestone)

//crud project

router.put('/pg/updateproject',CtrlProject.updateproject)
router.delete('/pg/deleteproject',CtrlProject.deleteproject)

module.exports=router 

