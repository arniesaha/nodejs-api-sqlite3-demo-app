var express = require('express');
var router = express.Router();

/* Load controller */
const EventController = require("../controllers/events");
const eventController = new EventController();

router.post('/', function (req, res) {
    eventController.addEvent(req, res);
});

router.get('/', function (req, res){
	eventController.getAllEvents(res);
});

module.exports = router;