/* Load Event entity */
const Event = require('../model/event');

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
        let sqlRequest = "SELECT * FROM event";
        return this.common.findAll(sqlRequest).then(rows => {
            let events = [];
            for (const row of rows) {
                events.push(new Event(row.id, row.type));
            }
            return events;
        });
    };

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
            "type=$type, " +
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
    create(Event) {
        let sqlRequest = "INSERT into event (type) " +
            "VALUES ($type)";
        let sqlParams = {
            $type: Event.type,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Event
     * returns database insertion status
     */
    createWithId(Event) {
        let sqlRequest = "INSERT into event (id, type) " +
            "VALUES ($id, $type)";
        let sqlParams = {
            $id: Event.id,
            $type: Event.type
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