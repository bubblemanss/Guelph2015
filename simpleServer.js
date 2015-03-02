var http = require("http");

var server = http.createServer(function(request, response) {

    if (request.method == "POST"){
        request.on("data", function(jsonBody){
            var parsedBody = JSON.parse(jsonBody);
            console.log("in");
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(parsedBody.toString());
            response.end();
        });
    }

});

server.listen(8080);
console.log("Server is listening");
