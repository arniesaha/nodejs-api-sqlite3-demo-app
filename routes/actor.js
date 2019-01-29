var express = require('express');
var router = express.Router();

// Routes related to actor.

const ActorController = require("../controllers/actors");
const actorController = new ActorController();

router.put('/', function (req, res){
	actorController.updateAvatarURL(req, res);
});

router.get('/', function (req, res){
	actorController.getAllActors(res);
})

router.get('/streak', function (req, res){
	actorController.getStreak(res);
})

module.exports = router;