var express = require('express');
var router = express.Router();

/* Load controller */
const EventController = require("../controllers/events");
const eventController = new EventController();

const ActorController = require("../controllers/actors");
const actorController = new ActorController();

const RepoController = require("../controllers/repo");
const repoController = new RepoController();

router.post('/', function (req, res) {

	console.log(req.body.repo);

	actorController.addActor(req.body.actor);
	repoController.addRepo(req);
    eventController.addEvent(req, res);

});

router.get('/', function (req, res){
	eventController.getAllEvents(res);
});

router.get('/actors/:actorId', function (req, res){
	eventController.getByActor(req, res);
});



module.exports = router;