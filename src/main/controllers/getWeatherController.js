const weatherApi =require('../services/weatherAPI');
var Meetup = require('../models/meetup');
var User = require('../models/user');


function getWeather(req,res) {
    var meetupId = req.body.meetup_id;
    var userId = req.body.user_id;

    User.findById(userId, function(err, user) {
        if (err) {
            console.log('error', err);
            res.status(400).send({message: 'Usuario no encontrado'});
        } else if (!user || user.role !== "user" && user.role !== "admin" ) {
                console.log('error', err);
                res.status(403).send({message: 'Acceso denegado'}); 
        } else {
            Meetup.findById(meetupId, function(err, foundMeetup) {
                if(err) {
                    console.log('error', err);
                    res.status(400).send({message: "Error al buscar la meetup solicitada"});
                } else {
                    weatherApi(res)
                    .then(forecast => {
                        var temperatureOfMeetupDay;
                        forecast.list.forEach(e => {
                            if (e.dt_txt === foundMeetup.date + " 12:00:00") {
                                temperatureOfMeetupDay = e.main.temp;
                            }  
                        });

                        if (!temperatureOfMeetupDay) {
                            res.status(400).send({message: "Por limitante hora servidor de la api esta fecha no viene en el forecast"})
                        } else{ 
                            res.status(200).send({temperatureOfMeetupDay: temperatureOfMeetupDay});
                        }
                    });
                }
            });
        }
    });
}

module.exports = {
    getWeather
};