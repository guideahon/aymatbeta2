const weatherApi =require('../services/weatherAPI');
var Meetup = require('../models/meetup');
var User = require('../models/user');

function calculate(req,res){
    var meetupId = req.body.meetup_id;
    var userId = req.body.user_id

    User.findById(userId, function(err, user){
        if(err){
            console.log('error', err);
            res.status(400).send({message: 'Usuario no encontrado'});
        }else{
            if(!user || user.role !== "admin"){
                console.log('error', err);
                res.status(403).send({message: 'Acceso denegado'});
            } else {
                Meetup.findById(meetupId, function(err, foundMeetup){
                    if(err){
                        console.log('error', err);
                    } else {
                        var assistants = foundMeetup.users.length;
            
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
                            } else {
                                var beersToBuy = 0; 
                            
                                if (temperatureOfMeetupDay >= 24) {
                                    beersToBuy = assistants * 3;
                                } else if (temperatureOfMeetupDay < 24 && temperatureOfMeetupDay > 20) {
                                    beersToBuy = assistants;
                                } else {
                                    beersToBuy = assistants * 0.75;
                                }
                            
                                beersToBuy = Math.round( beersToBuy );
                                beersToBuy = beersToBuy + (6 - (beersToBuy % 6));
                                
                                res.status(200).send({beersToBuy: beersToBuy});
                            }
                        });
                    }
                });
            }
        }
    });

    

  
}

module.exports = {
    calculate
};