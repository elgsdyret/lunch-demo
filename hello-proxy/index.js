
var http = require('http');
var request = require('request');
var url = require('url');

function handleRequest(req, resp){
	var queryObject = url.parse(req.url,true).query;
	var path = queryObject.www || 'http://www.google.com';

	request.get(path).pipe(resp);
}

var server = http.createServer(handleRequest);

var port = 1234;
server.listen(port, function(){    
    console.log("Server listening on: http://localhost:%s", port);
});