const mongoose = require('mongoose')
const Googlespreadsheet = require('google-spreadsheet')
var async = require('async');
const Milestone = mongoose.model('Milestone')
const Project = mongoose.model('Project')


var groups = []
var gropnumbers = []
var groupstudents = []
var Rowheader = ["groupnumber", "GroupMembers", "Supervisor", "Mentor"]


function getgroup(name, document) {
    Project.find({ Projectname: name }, 'groups', (err, doc) => {
        if (!err) {
            doc.forEach(element => {
                element.groups.map(group => {
                    group.students.map(item => {
                        var Rowdata = {
                            groupnumber: group.groupno,
                            GroupMembers: item.Registrationnumber
                        }
                        console.log(Rowdata)
                        document.addRow(1, Rowdata, function (err, rows) {
                            if (err) {
                                console.log(err)
                            }
                        });
                    })
                })
            });
        }
        else {
            res.status(422).send(err)
        }
    })
}




module.exports.createspreadsheet = (req, res, next) => {
    Milestone.find({ Projectname: req.body.Projectname }, function (err, milestone) {
        if (!err) {
            console.log(milestone)
            console.log(groups)
            milestone.map(milestone => {
                Rowheader.push(milestone.name)
            })
            console.log(Rowheader)
            const doc = new Googlespreadsheet(req.body.sheetid)
            async.series([
                function setAuth(step) {
                    var creds_json = {
                        client_email: "ucscprojectevaluation@ucsc-projec-tevaluation.iam.gserviceaccount.com",
                        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCXkMGSOIokbJDZ\ndPljrtMT6X/PLwDlzH4uaQJjopx9E6j3WkE/buhG/Qmvgrp80YAOAR+decnEDyz1\nZpjpAoi9qOmKr65TWK20dUeYetNPZ4avSXcHQO29L9G59huHubaqTfAbYH8ECjqc\noBpp+0Zwl69hf2BFKIYydurc/wy+K34Fpghx7+Y0/cC+xMUQ6ik9Q3XV1FdIEGiy\nRDTjhyiPnwG93cuevU0HiJGIB+S8kAHc33DgS5R13v2GA/iVyMKEWDH5G2i+bJfp\nQr6v6syGG7vthD0J6cJ3dOzg2+7/lsO4rKi5JIoPPfLRE1mQ6343/wleXyPRqHEf\njxonn8pdAgMBAAECggEASfiDEIr5mLdHpmm5gVYEfFZcY1BsXrsD5kCnwtrNBxo+\nP6JT79KAGI1MWdUykNJqbetMc73JpB9H8OjGvgnXlMDIYkBFkzXXaRhH/foMAVfk\nWs4/AlJE9S1ObTTY0M/pf4qUIbhhpSYc3u4glhLlmPPey3WwFXCmtiBllcAAhxrQ\ncz23LDwFIAAeBJAEQVFJq7AkTRXGx+gQwOfA8PSEPDfBbG/fPpTYSBI+KJFog0eq\nd+L2MsLfbuhnQRfuU3NQSsGfxqLMFBQiMuC+EOedVrnk8tJdJA1gNe+8VcEjd6NG\nD0IRZO7ShUyjclddE+m3PEy5xX/AfO1RhCcQcDZHXQKBgQDNJayu8p1EWJNK/5R/\n5zn2cOIYvzNyChI0Vy1vueELODmB2dwwy1urv1oT7/4Brh5F4D/izrn63+pn1x3j\nEfME0X+5kD5JbcTMlS/vjBu39nI4oDwXP85icG/Hk1pdMtnwGQP0en2/jofP3lGo\n7ZYmbDjlDOkRrF2bIFD+dnMCdwKBgQC9It44uO6njzvWg8bEI8La8wo6FAK59d1J\nrZRdw7m22wCTO/L5+osCsDPBVtPYT1RKYIvx8RCgPRdPyluwFJPhVKyS0eaBSC+P\nRrMd4jRn5soEy/6mQyrkbEi0BZCK80kmnkoSDHdde5JgtqA9LHaa+KrXKxIvJVV6\nNMyP7alaywKBgQC55wMmgqsrbU0E8Likc2heQAtTu6imFiRLFBkTnxEldqz+U+uq\nuA35hGzflmLLKPs7/SxHn2h/xHwJ37GwvOpJmoOxJ9qZ9gQaFLOc042m1ojJccMi\nmmqvYA6bf5eqz1MZtcGUwY/EkCfYojHD8JFZfkbMojdvEZC967oZ7kLonwKBgFQn\nd4j1f/q+GHnSGFadMs4I5bwBu1TSuKtXuHQf6joaJ59bRTlE6SVBEUYtRAUzBuYx\nHxN/l0404HJ4L2OhREs2SbLqAg3z+HVfl8LsKzUv0yNfQObpa+RG6fJvp2ir5xhv\nxbVSJqpJmU++8n1Fk2BQ1HL4jxa7HdVKONqxfHERAoGBALhtH9fprQwngJcUYqp4\nBVa1zeeDsqTmAvefnyHk/NmpxhS2HmJxnU7WrfE9h3PBbDTnI0sjX55DAYqMeiCi\nWg4/QS9XJyr2Oz20Bp8ihRFHK8a8/Oevv9yiLM6zKegMRYyTb4a6Uu9UrllfqaWb\niwWwMfpy5yviczmeILNIsQNQ\n-----END PRIVATE KEY-----\n"
                    }
                    doc.useServiceAccountAuth(creds_json, step);

                },
                function getInfoAndWorksheets(step) {
                    doc.getInfo(function (err, info) {
                        console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
                        sheet = info.worksheets[0];


                        sheet.setTitle(req.body.Projectname, (err, res) => {
                            if (!err) {

                            }
                        })
                        console.log('sheet 1: ' + sheet.title + 'rows ' + sheet.rowCount + 'coloums :' + sheet.colCount);


                        sheet.setHeaderRow(Rowheader, function (er) {
                            getgroup(req.body.Projectname, doc)
                        })
                        step();
                    });
                },
            ],(err)=>{
                if(!err){

                   

                    Project.findOneAndUpdate({Projectname:req.body.Projectname},{$set:{Sheeturl:req.body.Sheeturl}},(err,doc)=>{
                        if(!err){
                            res.send("successfuly Uploaded and Updated database")
                        }
                    })
                }
                else{
                    res.status(404).send(err)
                }
            })
        }
        else if (!project) {
            res.status(422).send("No project found")
        }
        else {
            res.status(422).send(err)
        }

    })
}







