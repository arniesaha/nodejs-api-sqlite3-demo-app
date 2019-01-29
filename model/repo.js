/**
 * Repo Entity (ES6 Class)
 */

class Repo {
    constructor(id, name, url, actorId) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.actorId = actorId;
    }
}

module.exports = Repo;