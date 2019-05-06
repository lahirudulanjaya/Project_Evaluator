
const mongoose =require('mongoose')
const Timeslot = mongoose.model("Timeslots")




module.exports.addtimeslots=(req,res,next)=>{
    var timeslot = new Timeslot()
    timeslot.Projectname =req.body.Projectname
    timeslot.Milestone =req.body.Milestone
    timeslot.Timeslosts=req.body.Timeslots

    timeslot.save((err, doc) => {
        if (!err){
            res.send(doc);            
        }
        else
        {
                if (err.code === 11000){
                    res.status(422).send('Data you entered has already been used');
                }
                else{
                    console.log(err)
                    return next(err);
                    }
        }
        });

}