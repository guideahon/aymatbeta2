const Routes = require('express');
const meetupCheckInController = require('../controllers/checkInMeetupController');
const meetupCreateController = require('../controllers/createMeetupController');
const meetupJoinController = require('../controllers/joinMeetupController');
const meetupListController = require('../controllers/listMeetupController');
const getWeatherController = require('../controllers/getWeatherController');

const router = Routes();
 
router.put('/checkin', (req, res) => {
    return meetupCheckInController.checkInMeetups(req, res);
});

router.put('/join', (req, res) => {
    return meetupJoinController.joinMeetups(req, res);
});

router.get('/list', (req, res) => {
    return meetupListController.listMeetups(req, res);
});

router.post('/create', (req, res) => {
    return meetupCreateController.createMeetups(req, res);
});

router.get('/weather', (req, res) => {
    return getWeatherController.getWeather(req, res);
});


module.exports = router;