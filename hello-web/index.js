var http = require('http');

function handleRequest(request, response){
    response.end('Hello world: ' + request.url);
}

var server = http.createServer(handleRequest);

var port = 1234;
server.listen(port, function(){    
    console.log("Server listening on: http://localhost:%s", port);
});