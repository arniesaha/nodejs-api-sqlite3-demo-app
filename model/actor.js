/**
 * Actor Entity (ES6 Class)
 */

class Actor {
    constructor(id, login, avatar_url) {
        this.id = id;
        this.login = login;
        this.avatar_url = avatar_url;
    }
}

module.exports = Actor;