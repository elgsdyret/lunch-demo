
var GoogleClientLogin = require( 'googleclientlogin' ).GoogleClientLogin;
var request = require( 'request' );
var server = require( './server' ); // require "own" dependency

var username = process.env.GUserName;
var password = process.env.GPassword;

if (!username || !password) {
  console.error('please provide username and password');
  return;
}

var googleAuth = new GoogleClientLogin({
  email: username,
  password: password,
  service: 'spreadsheets',
  accountType: GoogleClientLogin.accountTypes.hostedOrGoogle
});

googleAuth.on(GoogleClientLogin.events.login, function( ) {
  var options = {
    url: 'https://docs.google.com/spreadsheets/d/1urNDmP3dk4gIO2Jbhjtcu8Z21wRDKJPZcPFyzuxDt0g/export?format=csv',
    headers: {
      'Authorization': 'GoogleLogin auth=' + googleAuth.getAuthId()
    }
  };

  request(options, function(err, resp, body) { 
    if (err) {
      console.error( err );
      return;
    }

    if ( resp.statusCode !== 200 ) {
      console.log( resp );
      return;
    }

    server( resp );

  } );
});

googleAuth.on(GoogleClientLogin.events.error, function(e) {    
    throw new Error('google login failed...');
});
googleAuth.login();