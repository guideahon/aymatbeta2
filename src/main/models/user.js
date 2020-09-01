var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    meetups: [{
        type: Schema.ObjectId,
        ref: 'Meetup'
    }]
});

module.exports = mongoose.model('User', UserSchema);