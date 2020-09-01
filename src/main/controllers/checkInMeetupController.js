var Meetup = require('../models/meetup');
var User = require('../models/user');

function checkInMeetups(req,res){
    var userId = req.body.user_id;
    var meetupId = req.body.meetup_id;

    var foundMeetup;
    Meetup.findById(meetupId, function(err, meetup){
        if (err) {
            console.log('error', err);
            res.status(400).send({message: 'Meetup no encontrada'});
        } else {
            foundMeetup = meetup;
            var foundUser;
            User.findById(userId, function(err, user){
                if (err) {
                    console.log('error', err);
                    res.status(400).send({message: 'Usuario no encontrado'});
                } else if (!user || user.role !== "user") {
                        console.log('error', err);
                        res.status(403).send({message: 'Acceso denegado'}); 
                } else {
                    foundUser = user;
                    foundUser.meetups.push(foundMeetup);
                    foundUser.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({message: 'Error al hacer el check-in, usuario no encontrado'});
                        } else if (!userStored) {
                            res.status(404).send({message: 'Error al hacer el check-in'});
                        } else {
                            res.status(200).send({user: userStored});
                        }
                    });
                }
            });
        }
    });
}
module.exports = {
    checkInMeetups,
};