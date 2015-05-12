
var csv = require( 'csv' );
var es = require('event-stream');
var jsonStream = require('JSONStream');
var url = require('url');

module.exports = function( createStream ) {

  function handleRequest(req, resp){     

    // filter favicon
    if (req.url === '/favicon.ico') {
      resp.writeHead(200, {'Content-Type': 'image/x-icon'} );
      resp.end();
      return;
    }

    var queryObject = url.parse(req.url,true).query;
    var user = queryObject.user && queryObject.user.trim() || 'nnorskov';

    createStream().pipe( csv.parse() )      
      .pipe( es.map( function ( data, cb ) {

        // only grab the lines where the first column is the requested user!
        var columnUser = data[0] && data[0].trim() || '';
        if ( columnUser !== user ) {    
          return cb();          
        }
        
        var simpleData = data.slice(0, 3);
        cb( null, simpleData );
      }))          
      .pipe( jsonStream.stringify() )      
      .pipe( resp );            
  }


  var server = require('http').createServer(handleRequest);

  var port = 1234;
  server.listen(port, function(){    
      console.log("Server listening on: http://localhost:%s", port);
  });
};
