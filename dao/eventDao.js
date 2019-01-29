/* Load Event entity */
const Event = require('../model/event');

const Actor = require('../model/actor');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Event Data Access Object
 */
class EventDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, type FROM event WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Event(row.id, row.type));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {

        let sqlRequest = "SELECT event.id as eventId, event.type as type, event.created_at as created_at," +
                        " actor.id as id, actor.login as login, actor.avatar_url as avatar_url," +
                        " repo.id as repoId, repo.name as repoName, repo.url as repoUrl " +
                        "FROM event LEFT JOIN actor ON actor.id = event.actorId " +
                        "LEFT JOIN repo ON repo.actorId = event.actorId " +
                        "ORDER BY event.id ASC";
        
        return this.common.findAll(sqlRequest).then(rows => {
            let events = [];
            for (const row of rows) {
                // console.log('actorid: '+row.actorId);
                var response = {};

                response['id'] = row.eventId;
                response['type'] = row.type; 
                

                var actor = {};
                actor['id'] = row.id;
                actor['login'] = row.login;
                actor['avatar_url'] = row.avatar_url;
                response['actor'] = actor;


                var repo = {};
                repo['id'] = row.repoId;
                repo['name'] = row.repoName;
                repo['url'] = row.repoUrl;
                response['repo'] = repo;

                response['created_at'] = row.created_at;

                events.push(response);
                
            }
            return events;
        });
    };



    findByActorId(id){

       
        // let sqlRequest = "SELECT event.id as eventId, event.type as type, actor.id as id, actor.login as login, actor.avatar_url as avatar_url FROM event JOIN actor ON actor.id = event.actorId WHERE event.actorId=$id ORDER BY event.id ASC";
        let sqlRequest = "SELECT event.id as eventId, event.type as type, event.created_at as created_at," +
                        " actor.id as id, actor.login as login, actor.avatar_url as avatar_url," +
                        " repo.id as repoId, repo.name as repoName, repo.url as repoUrl " +
                        "FROM event LEFT JOIN actor ON actor.id = event.actorId " +
                        "LEFT JOIN repo ON repo.actorId = event.actorId " +
                        "WHERE event.actorId=$id "
                        "ORDER BY event.id ASC";
        let sqlParams = {$id: id};
    
        return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
            let events = [];
         
            for (const row of rows) {
                // console.log('actorid: '+row.actorId);
                var response = {};

                response['id'] = row.eventId;
                response['type'] = row.type; 
                

                var actor = {};
                actor['id'] = row.id;
                actor['login'] = row.login;
                actor['avatar_url'] = row.avatar_url;
                response['actor'] = actor;

                var repo = {};
                repo['id'] = row.repoId;
                repo['name'] = row.repoName;
                repo['url'] = row.repoUrl;
                response['repo'] = repo;

                response['created_at'] = row.created_at;

                events.push(response);
                
            }
            return events;
        });
    }

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM event";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Event
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Event) {
        let sqlRequest = "UPDATE event SET " +
            "type=$type " +
            "WHERE id=$id";

        let sqlParams = {
            $type: Event.type,
            $id: Event.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Event
     * returns database insertion status
     */

     /**
     To-do pass Actor Object here
     check first if Actor Id present in actor db
     if not insert else do nothing
     **/
    create(Event) {
        let sqlRequest = "INSERT into event (type, actorId, created_at) " +
            "VALUES ($type, $actorId, $created_at)";
        let sqlParams = {
            $type: Event.type,
            $actorId: Event.actorId,
            $created_at: Event.created_at
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    deleteEvents(){
    
        let sqlRequest = "DELETE FROM actor";

        console.log(sqlRequest);
                        
        return this.common.runWithoutParams(sqlRequest);
    }

    /**
     * Creates the given entity with a provided id in the database
     * @params Event
     * returns database insertion status
     */
    createWithId(Event) {
        let sqlRequest = "INSERT into event (id, type, actorId, created_at) " +
            "VALUES ($id, $type, $actorId, $created_at)";
        let sqlParams = {
            $id: Event.id,
            $type: Event.type,
            $actorId: Event.actorId,
            $created_at: Event.created_at
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM event WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM event WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = EventDao;