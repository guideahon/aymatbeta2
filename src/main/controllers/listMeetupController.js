var Meetup = require('../models/meetup');

function listMeetups(req, res) {
    Meetup.find({}, function(err, meetupList) {    
        res.send(meetupList);
    });
}

module.exports = {
    listMeetups    
};