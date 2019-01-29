/**
 * Event Entity (ES6 Class)
 */

class Event {
    constructor(id, type, actorId, created_at) {
        this.id = id;
        this.type = type;
        this.actorId = actorId;
        this.created_at = created_at;
    }
}

module.exports = Event;