var express = require('express');
var router = express.Router();

/* Load controller */
const EventController = require("../controllers/events");
const eventController = new EventController();

// Route related to delete events

router.delete('/', function(req, res){
	eventController.deleteEvents(res);
});

module.exports = router;