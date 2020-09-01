var Meetup = require('../models/meetup');
var User = require('../models/user');

function createMeetups(req,res) {
    var meetup = new Meetup();
    var params = req.body;
    var userId = params.user_id;

    meetup.date = params.date;
    meetup.description = params.description;
    meetup.users = [];

    User.findById(userId, function(err, user) {
        if (err) {
            console.log('error', err);
            res.status(400).send({message: 'Usuario no encontrado'});
        } else {
            if(!user || user.role !== "admin"){
                console.log('error', err);
                res.status(403).send({message: 'Acceso denegado'});
            } else {
                meetup.save((err, meetupStored) => {
                    if (err) {
                        res.status(500).send({message: 'Error al crear la meetup'});
                    } else if (!meetupStored) {
                        res.status(404).send({message: 'Error al crear la meetup'});
                    } else {
                        res.status(200).send({meetup: meetupStored});
                    }
                });
            }
        }
    }); 
}

module.exports = {
    createMeetups,   
};