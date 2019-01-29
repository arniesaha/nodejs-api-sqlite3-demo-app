/* Load Repo entity */
const Repo = require('../model/repo');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Repo Data Access Object
 */
class RepoDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, name, url, actorId FROM repo WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Actor(row.id, row.name, row.url));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM repo";
        return this.common.findAll(sqlRequest).then(rows => {
            let actors = [];
            for (const row of rows) {
                actors.push(new Repo(row.id, row.name, row.url, row.actorId));
            }
            return actors;
        });
    };


    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM repo";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Actor
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Repo) {
        let sqlRequest = "UPDATE actor SET " +
            "name=$name, " +
            "url=$url " +
            "WHERE id=$id";

        let sqlParams = {
            $name: Repo.name,
            $url: Repo.url,
            $id: Repo.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };


    /**
     * Creates the given entity in the database
     * @params Repo
     * returns database insertion status
     */
    create(Repo) {
        let sqlRequest = "INSERT into repo (name, url) " +
            "VALUES ($name, url, $actorId)";
        let sqlParams = {
            $name: Repo.name,
            $url: Repo.url,
            $actorId: Repo.actorId
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Actor
     * returns database insertion status
     */
    createWithId(Repo) {
        let sqlRequest = "INSERT into repo (id, name, url, actorId) " +
            "VALUES ($id, $name, $url, $actorId)";
        let sqlParams = {
            $id: Repo.id,
            $name: Repo.name,
            $url: Repo.url,
            $actorId: Repo.actorId
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM repo WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM repo WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = RepoDao;