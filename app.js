var Hapi = require('hapi');

var server = new Hapi.Server('0.0.0.0', 3000, {cors: true});

/**
 * configure template engine
 */ 
server.views({ 
	engines: {
		ejs: 'ejs'
	},
	path: './views'
});

/**
 * routes loader
 */
require('fs').readdirSync(__dirname + '/routes').forEach(function(file) {
  if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
    server.route(require('./routes/' + file));
  }
});

/**
 * start server, print routing table
 */
server.start(function(){
    console.log('server started');
    console.log('routes:');
    server.table().forEach(function(v){
        console.log(v.settings.method.toUpperCase()+": "+v.settings.path);  
    });
});        

