let low = require('lowdb');
let FileSync = require('lowdb/adapters/FileSync');

let adapter = new FileSync('db.json');
let db = low(adapter);

// Set some defaults
db.defaults({ books: []})
    .write();

module.exports = db;
