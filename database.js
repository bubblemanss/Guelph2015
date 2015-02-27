var mongojs = require('mongojs');
const dburl = "mongodb://localhost:27017"
var db = mongojs(dburl);
var UserDB = db.collection('users');

exports.EmailExists = function(email, callback) {
  //faster to user find as opposed to findOne?
  UserDB.find({
    email: email
  }, function(err, cursor) {
    if (!err && cursor)
      callback(true);
    callback(false);
  });
}

exports.CreateUser = function(user, callback) {
  //note: if we create a specific _id for each user based on their
  // username and pass, then we can simplify this next part a bit
  // by just attempting an insert (which will fail if _id already exists).
  EmailExists(user['email'], function(exists) {
    if (callback && exists) {
      callback(false);
    } else {
      //Add the user to the database
      UserDB.insert(user)
      if (callback) callback(true);
    }
  });
}
