/* Load Actor Data Access Object */

const ActorDao = require('../dao/actorDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load actor entity */
const Actor = require('../model/actor');

/**
 * Actor Controller
 */
class ActorController {

    constructor() {
        this.actorDao = new ActorDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.actorDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.actorDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.actorDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateActor(req, res) {
        let actor = new Actor();
        actor.id = req.body.id;
        actor.login = req.body.login;
        actor.avatar_url = req.body.avatar_url;

        return this.actorDao.update(actor)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    updateAvatarURL(req, res){
    	let actor = new Actor();
        actor.id = req.body.id;
        actor.login = req.body.login;
        actor.avatar_url = req.body.avatar_url;

        return this.actorDao.updateAvatarURL(actor)
            .then(this.common.updateSuccess(res))
            .catch(this.common.updateError(res));
    }

    getAllActors(res){
    	return this.actorDao.getAllActors()
    		.then(this.common.findSuccess(res))
    		.catch(this.common.serverError(res))
    }

    getStreak(res){
    	return this.actorDao.getStreak()
    		.then(this.common.findSuccess(res))
    		.catch(this.common.serverError(res))
    }

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    addActor(req, res) {
        let actor = new Actor();
        // let actor = new Actor();
        
        if (req.id) {
            actor.id = req.id;
        }

        // console.log('actorid: '+req.id);
        
        actor.login = req.login;

        actor.avatar_url = req.avatar_url;


        if (req.id) {
            return this.actorDao.createWithId(actor)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
        else {
            return this.actorDao.create(actor)
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

        this.actorDao.deleteById(id)
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

        this.actorDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = ActorController;















