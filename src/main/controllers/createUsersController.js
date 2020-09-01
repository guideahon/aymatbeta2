var User = require('../models/user');

function createUsers(req,res){
    var user = new User();
    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.password =  params.password;
    user.role =  params.role.toLowerCase();

    user.meetups = [];

    user.save((err, userStored) => {
        if (err) {
            res.status(500).send({message: 'Error al crear el usuario'});
        } else if (!userStored) {
            res.status(404).send({message: 'Error al crear el usuario'});
        } else {
            res.status(200).send({user: userStored});
        }
    });
}

module.exports = {
    createUsers,   
};