/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./sqlite.db');

/* Init event tables if they don't exist */
let init = function () {

    db.get("PRAGMA foreign_keys = ON");

    db.run("CREATE TABLE if not exists actor (" +
        "id INTEGER PRIMARY KEY NOT NULL UNIQUE," +
        "login TEXT UNIQUE," +
        "avatar_url TEXT" +
        ")");

    db.run("CREATE TABLE if not exists event (" +
        "id INTEGER PRIMARY KEY NOT NULL UNIQUE," +
        " type TEXT," + 
        " actorId INTEGER," +
        " created_at TEXT," +
        " CONSTRAINT event_fk_actorId FOREIGN KEY (actorId) REFERENCES actor(id) ON UPDATE CASCADE ON DELETE CASCADE" +
        ")");

    db.run("CREATE TABLE if not exists repo (" +
        "id INTEGER PRIMARY KEY NOT NULL UNIQUE," +
        " name TEXT," + 
        " url TEXT," +
        " actorId INTEGER," +
        " CONSTRAINT repo_fk_actorId FOREIGN KEY (actorId) REFERENCES actor(id) ON UPDATE CASCADE ON DELETE CASCADE" +
        ")");
};

module.exports = {
    init: init,
    db: db
};

