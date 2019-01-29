/* Load Event Data Access Object */
const RepoDao = require('../dao/repoDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load event entity */
const Repo = require('../model/repo');

/**
 * Repo Controller
 */
class RepoController {

    constructor() {
        this.repoDao = new RepoDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.repoDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.repoDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };


    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.repoDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let repo = new Repo();
        repo.id = req.body.repo.id;
        repo.name = repo.body.repo.name;
        repo.url = repo.body.repo.url;
        repo.actorId = repo.body.repo.created_at;

        return this.repoDao.update(repo)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    addRepo(req, res) {
        let repo = new Repo();
        
        if (req.body.repo.id) {
            repo.id = req.body.repo.id;
        }
        repo.name = req.body.repo.name;
        repo.url = req.body.repo.url;

        var actorBody = req.body.actor;
        repo.actorId = actorBody.id;

        console.log("add repo actor", actorBody);

        if (req.body.repo.id) {
            return this.repoDao.createWithId(repo)
                .then(this.common.editSuccess(res))
                .catch(this.common.existsError(res));
        }
        else {
            return this.repoDao.create(repo)
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

        this.repoDao.deleteById(id)
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

        this.repoDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = RepoController;














