
// var getAllEvents = () => {

// };

// var addEvent = (req, res) => {

// 	console.log("Adding event");
// 	res.send("ok");

// };


// var getByActor = () => {

// };


// var eraseEvents = () => {

// };

// module.exports = {
// 	getAllEvents: getAllEvents,
// 	addEvent: addEvent,
// 	getByActor: getByActor,
// 	eraseEvents: eraseEvents
// };


/* Load Event Data Access Object */
const EventDao = require('../dao/eventDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load event entity */
const Event = require('../model/event');
const Actor = require('../model/actor');
/**
 * Event Controller
 */
class EventController {

    constructor() {
        this.eventDao = new EventDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.eventDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    getAllEvents(res) {
        this.eventDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.emptyEvents(res));
    };

     /**
     * Finds all entities by actorId.
     * @return all entities
     */
    getByActor(req, res) {
    	let id = req.params.actorId;
    	
        this.eventDao.findByActorId(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
    **/
    deleteEvents(res){
    	return this.eventDao.deleteEvents()
                .then(this.common.eraseSuccess(res))
                .catch(this.common.serverError(res));
    }


    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.eventDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let event = new Event();
        event.id = req.body.id;
        event.type = req.body.type;

        return this.eventDao.update(event)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    addEvent(req, res) {
        let event = new Event();
        let actor = new Actor();

        if (req.body.id) {
            event.id = req.body.id;
        }
        event.type = req.body.type;

        var actorBody = req.body.actor;
        // console.log("actor id"+ actor.id);
        event.actorId = actorBody.id;

        actor.id = actorBody.id;
        actor.login = actor.login;
        actor.avatar_url = actor.avatar_url;

        event.created_at = req.body.created_at;


        if (req.body.id) {
            return this.eventDao.createWithId(event, actor)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
        else {
            return this.eventDao.create(event, actor)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }

    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let id = req.params.id;

        this.eventDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        this.eventDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = EventController;














