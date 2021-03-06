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
const Ctrlform =require('../controller/showformdata.controll')
const Ctrlmarks =require('../controller/evaluvatorMarks.controller')
const multer = require('multer');
const upload = multer({dest:'uploads/'})



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
router.get('/pg/getGroupMembers/:projectName/:indexOfstudentArray',CtrlProject.getGroupMembers)
router.get('/pg/checkusername/:UserName',CtrlStudent.checkusername)
router.put('/pg/changePassword/:UserName',CtrlStudent.resetPassword)
router.get('/pg/getpresentations/:id',CtrlMilestone.getpresentationmilstones)

//grouprequest
router.post('/sendgrouprequest',Ctrlrequest.sendgrouprequest)
router.get('/getsendresquest/:id',Ctrlrequest.getsendrequest)
router.get('/getresquest/:id',Ctrlrequest.getrequest)
router.get('/checkaccepted/:id',Ctrlrequest.checkaccepted)
router.get('/checkallaccepted/:id',Ctrlrequest.checkallaccepted)
router.delete('/deleterequest/:id', Ctrlrequest.deleteRequest)


router.put('/deletegroups/:Projectname',CtrlProject.deletegroups)

//google sheet

router.post('/setgooglesheet',CtrlSheet.createspreadsheet)
router.delete('/deletesheet/:Projectname',CtrlProject.deletegooglesheet)

//timeslots

router.post('/posttimeslots',Ctrltimeslot.addtimeslots)
router.get('/gettimeslots',Ctrltimeslot.gettimeslots)
router.put('/updatetimeslot',Ctrltimeslot.updatetimeslots)
router.delete('/deletetimeslot',Ctrltimeslot.deletetimeslot)

//evaluvators

router.post('/addEvaluvator' ,Ctrlevaluvator.addEvaluvator)

router.get('/getEvaluvators' ,Ctrlevaluvator.getEvaluvators)
router.delete('/deleteevaluvator/:Registrationnumber',Ctrlevaluvator.deleteEvaluvator)


//sessioncoodinator
router.post('/addSessioncoodinator' ,CtrlSC.addsessioncoodinator)
router.get('/getSessioncoodinator' ,CtrlSC.getsessioncoodinator)
router.delete('/deletesc/:Registrationnumber',CtrlSC.deleteSessionCoordinator)

//crud milestones
router.put('/pg/updatemilestone',CtrlMilestone.updatemilestones)
router.delete('/pg/deletemilestone',CtrlMilestone.deletemilestone)

//crud project

router.put('/pg/updateproject',CtrlProject.updateproject)
router.delete('/pg/deleteproject/:projectname',CtrlProject.deleteproject)

router.put('/pg/updatestudent',CtrlStudent.UpdateStudentDetail)
router.put('/pg/UpdateStudentDetailMarks',CtrlStudent.UpdateStudentDetailMarks)

router.delete('/pg/deletestudent/:Registrationnumber',CtrlStudent.deleteStudent)

router.get('/allmilestone',CtrlMilestone.getallmilstones)



router.get('/getprojectscount',CtrlProject.getprojectscount)
router.get('/getstudentcount',CtrlStudent.getstudentscount)
router.get('/getevaluvatorscount',Ctrlevaluvator.getevaluvatorscount)

router.put('/setrestrictions',CtrlProject.setRestrictions)
router.get('/getrestrictions/:Projectname',CtrlProject.getRestrictions)


router.get('/confirmation/:token',CtrlStudent.verifyemail)

router.get('/getgroupsbyprojectname/:Projectname',CtrlProject.getGroupsbyProject)


//update student

router.put('/updatestudent/:Registrationnumber',CtrlStudent.UpdateStudent)

//image upload

router.put('/imageupload', upload.single('imageData'), CtrlStudent.uploadImage)


//add form data

router.post('/addformdata',Ctrlform.addshowformdata)
router.get('/getallformdata',Ctrlform.getallform)


//add marks

router.post('/addmarks',Ctrlmarks.addmark)
router.delete('/deleteformdata',Ctrlform.deleteformdata)

module.exports=router 

