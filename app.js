var http = require("http");
var user = require("./userData/user");
var mongo = require("./userData/database");
var notifyHandler = require("./notifications/notifyHandler");
//var parseHandler = require(./parse/parseHandler);

var createUser = function(data, callback){
    mongo(user(data), "CreateUser", callback);
}
var searchUser = function(data, callback){
    mongo(data.email, "SearchUser", callback)
}
var findAllUser = function(callback){
    mongo(null, "FindAll", callback);
}

var server = http.createServer(function(request, response) {

    if (request.method == "POST"){
        request.on("data", function(jsonBody){
            var parsedBody = JSON.parse(jsonBody);
            if (parsedBody.method == "create"){
                createUser(parsedBody, function(check){
                    if(check){

                        /*
                        var csvObjects = [];
                        parseHandler(parsedBody.address, function(err, data){
                            if(!err){
                                csvObjects.push(data);
                            }
                            else{
                                console.log(err);
                            }
                        });
                         */

                        response.writeHead(200, {"Content-Type": "application/json"});
                        response.write("Created user.");
                        response.end();
                    }
                    else{
                        response.writeHead(404, {"Content-Type": "application/json"});
                        response.write("Failed to create user.");
                        response.end();
                    }
                });
            }
            else if (parsedBody.method == "search"){
                searchUser(parsedBody, function(data){
                    if(data){
                        response.writeHead(200, {"Content-Type": "application/json"});
                        response.write("" + JSON.stringify(data));
                        response.end();
                    }
                    else{
                        response.writeHead(404, {"Content-Type": "application/json"});
                        response.write("User does not exist.");
                        response.end();
                    }
                });
            }
        });
    }

});

server.listen(8080);
console.log("Server is listening");
