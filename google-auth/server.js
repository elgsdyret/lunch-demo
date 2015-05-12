

var stream = require( 'stream' );
var csv = require( 'csv' );
var JSONStream = require( 'JSONStream' );

module.exports = function( data ) {

  function handleRequest(req, resp){ 
    var s = new stream.Readable();
    s._read = function noop() {};
    s.push( data.body );  

    s.pipe( csv.parse() ).pipe( JSONStream.stringify() ).pipe( resp );

    //resp.end ( data.body );
  }


  var server = require('http').createServer(handleRequest);

  var port = 1234;
  server.listen(port, function(){    
      console.log("Server listening on: http://localhost:%s", port);
  });
};
