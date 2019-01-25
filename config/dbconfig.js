/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./sqlite.db');

/* Init event tables if they don't exist */
let init = function () {
    db.run("CREATE TABLE if not exists event (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " type TEXT" + 
        ")");
};

module.exports = {
    init: init,
    db: db
};

