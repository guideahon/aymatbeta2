var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GuestSchema = Schema({
    id_meetup: Number,
    in_user: Number
});

module.exports = mongoose.model('Guest', GuestSchema);