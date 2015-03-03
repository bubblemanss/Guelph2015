var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017';

var SearchUser = function(email, userdb, callback, closeCallback) {
  userdb.findOne({email: email}, function(err, user) {
      if (err){
        console.log(err);
        callback(null);
        closeCallback();
      }
      else{
        callback(user);
        closeCallback();
      }
    }
  );
}

var EmailExists = function(email, userdb, callback) {
  userdb.findOne({email: email}, function(err, cursor) {
      if (!err && cursor){
        callback(true);
      }
      else  {
        callback(false);
      }
    }
  );
}

var CreateUser = function(user, userdb, callback, closeCallback) {
  EmailExists(user['email'], userdb, function (exists) {
    if (callback && exists) {
      callback(false);
      closeCallback();
    }
    else {
      userdb.insert(user, function(err, result){
        if (!err && callback){
          callback(true);
          closeCallback();
        }
        else{
          console.log(err);
        }
      })
    }
  });
}

var FindAll = function(userdb, callback, closeCallback){
  userdb.find({}, function(err, cursor){
    if(err){
      console.log(err);
    }
    else {
      callback(cursor.toArray());
      closeCallback();
    }
  });
}

module.exports = function(data, method, callback){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var userdb = db.collection('users');

    if (method == "CreateUser"){
      CreateUser(data, userdb, callback, function(){
        db.close();
      });
    }
    else if (method == "SearchUser"){
      SearchUser(data, userdb, callback, function(){
        db.close();
      });
    }
    else if (method == "FindAll"){
      FindAll(userdb, callback, function(){
        db.close();
      });
    }
    else{

    }
  })
}