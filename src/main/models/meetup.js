var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MeetupSchema = Schema({
    date: String, 
    description: String,
    place: String,
    users: [{
        type: Schema.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Meetup', MeetupSchema);