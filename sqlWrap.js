'use strict'

const sql = require('sqlite3');
const util = require('util');


// old-fashioned database creation code 

// creates a new database object, not a 
// new database. 
const db = new sql.Database("activities.db");

// check if database exists
let cmd = " SELECT name FROM sqlite_master WHERE type='table' AND name='ActivityTable' ";

db.get(cmd, function (err, val) {
  if (val == undefined) {
        console.log("No database file - creating one");
        createActivityTable();
  } else {
        console.log("Database file found");
  }
});

// EDIT 5/9: make profile table
// check if profile database exists
let cmdp = " SELECT name FROM sqlite_master WHERE type='table' AND name='ProfileTable' ";

db.get(cmdp, function (err, val) {
  if (val == undefined) {
        console.log("No database file - creating one");
        createProfileTable();
  } else {
        console.log("Database file found");
  }
});


// EDIT Yanbin 5/10:
// include a userid column
// called to create table if needed
function createActivityTable() {
  // explicitly declaring the rowIdNum protects rowids from changing if the 
  // table is compacted; not an issue here, but good practice
  const cmd = 'CREATE TABLE ActivityTable (rowIdNum INTEGER PRIMARY KEY, activity TEXT, date INTEGER, amount FLOAT, userId TEXT)';
  db.run(cmd, function(err, val) {
    if (err) {
      console.log("Database creation failure",err.message);
    } else {
      console.log("Created database");
    }
  });
}

// called to create profile table if needed
function createProfileTable() {
  const cmdp2 = 'CREATE TABLE ProfileTable (pRowIdNum INTEGER PRIMARY KEY, GoogleID TEXT, firstName TEXT)';
  db.run(cmdp2, function(err, val) {
    if (err) {
      console.log("Database creation failure",err.message);
    } else {
      console.log("Created database");
    }
  });
}

// wrap all database commands in promises
db.run = util.promisify(db.run);
db.get = util.promisify(db.get);
db.all = util.promisify(db.all);

// empty all activity data from db
db.deleteEverything = async function() {
  await db.run("delete from ActivityTable");
  db.run("vacuum");
}

// empty all profile data from db
db.deleteEverythingFromProfile = async function() {
  await db.run("delete from ProfileTable");
  db.run("vacuum");
}

// allow code in index.js to use the db object
module.exports = db;
