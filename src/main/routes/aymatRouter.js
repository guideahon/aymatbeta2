const Routes = require('express');
const router = Routes();
const CallLogin = require("../services/growattAPI");

router.get('/ping', (req, res) => {
    CallLogin()
        .then( (data) => {
            return res.status(200).send(data);
        });
});
 
module.exports = router;