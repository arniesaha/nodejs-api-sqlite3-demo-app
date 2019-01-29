/* Load Actor entity */
const Actor = require('../model/actor');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Actor Data Access Object
 */
class ActorDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        // let sqlRequest = "SELECT id, login, avatar_url FROM actor WHERE id=$id";
        let sqlRequest = "SELECT event.id as eventId, event.type as type, event.created_at as created_at," +
                        " actor.id as id, actor.login as login, actor.avatar_url as avatar_url," +
                        " repo.id as repoId, repo.name as repoName, repo.url as repoUrl " +
                        "FROM event LEFT JOIN actor ON actor.id = event.actorId " +
                        "LEFT JOIN repo ON repo.actorId = event.actorId " +
                        "WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row => {
            let events = [];
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
            return events;
        });
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM actor";
        return this.common.findAll(sqlRequest).then(rows => {
            let actors = [];
            for (const row of rows) {
                actors.push(new Actor(row.id, row.login, row.avatar_url));
            }
            return actors;
        });
    };


    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM actor";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Actor
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Actor) {
        let sqlRequest = "UPDATE actor SET " +
            "login=$login, " +
            "avatar_url=$avatar_url " +
            "WHERE id=$id";

        let sqlParams = {
            $login: Actor.login,
            $avatar_url: Actor.avatar_url,
            $id: Actor.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };


    getAllActors(){

    
        let sqlRequest = "SELECT actor.id AS id, login, avatar_url FROM actor " +
                        "JOIN event ON event.actorId = actor.id GROUP BY event.id " +
                        "ORDER BY COUNT(event.id) DESC, event.created_at DESC, actor.login ASC";

        return this.common.findAll(sqlRequest).then(rows => {
            let actors = [];
            for (const row of rows) {
              
                actors.push(new Actor(row.id, row.login, row.avatar_url));
            }
            return actors;
        });
    }

     /**
     * Finds all entities.
     * @return all entities
     */
    getStreak() {

        console.log("in streak");

        let sqlRequest = "SELECT DISTINCT(actor.id) as id, actor.login as login, actor.avatar_url as avatar_url " +
                        "FROM event JOIN actor ON actor.id = event.actorId " +
                        "JOIN repo ON repo.actorId = event.actorId GROUP BY actor.id " +
                        "ORDER BY COUNT(event.created_at) DESC, event.created_at DESC, actor.login ASC ";

        console.log(sqlRequest);
        
        return this.common.findAll(sqlRequest).then(rows => {
            let actors = [];
            for (const row of rows) {
                
                actors.push(new Actor(row.id, row.login, row.avatar_url));
            }
            return actors;
        });
    };

     /**
     * Updates the given entity in the database
     * @params Actor
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateAvatarURL(Actor) {

        let sqlRequest = "SELECT login FROM actor WHERE id=$id";
        let sqlParams = {$id: Actor.id};

        var toUpdate = false;
        var context = this;
        return context.common.findOne(sqlRequest, sqlParams).then(function(result){
            // console.log(result.login);

            console.log(Actor.login.localeCompare(result.login));

            if(Actor.login.localeCompare(result.login) == 0){
                let updateSqlRequest = "UPDATE actor SET " +
                    "login=$login, " +
                    "avatar_url=$avatar_url " +
                    "WHERE id=$id";

                let updateSqlParams = {
                        $login: Actor.login,
                        $avatar_url: Actor.avatar_url,
                        $id: Actor.id
                };

                return context.common.run(updateSqlRequest, updateSqlParams);
            }

            if(Actor.login.localeCompare(result.login) == -1 || Actor.login.localeCompare(result.login) == 1){

                return new Promise(function(resolve, reject){
                    new DaoError(22, "Login Id cannot be changed")
                });

            }

        });
        
    };

    /**
     * Creates the given entity in the database
     * @params Actor
     * returns database insertion status
     */
    create(Actor) {
        let sqlRequest = "INSERT into actor (login, avatar_url) " +
            "VALUES ($login, avatar_url)";
        let sqlParams = {
            $login: Actor.login,
            $avatar_url: Actor.avatar_url
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Actor
     * returns database insertion status
     */
    createWithId(Actor) {
        console.log("creating actor");
        let sqlRequest = "INSERT into actor (id, login, avatar_url) " +
            "VALUES ($id, $login, $avatar_url)";
        let sqlParams = {
            $id: Actor.id,
            $login: Actor.login,
            $avatar_url: Actor.avatar_url
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM actor WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM actor WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = ActorDao;