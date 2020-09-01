const Routes = require('express');
const birras = require('../controllers/getBirrasController');

const router = Routes();
 
router.get('/', (req, res) => {
    return birras.calculate(req,res);
});
 
module.exports = router;