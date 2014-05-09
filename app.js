var Hapi = require('hapi');
var Config = require('./config');

var server = new Hapi.Server('0.0.0.0', Config.server.port, {cors: true});

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
 * default error handler
 */
server.ext('onPreResponse', function(request, reply) {
	var response = request.response;	
    if (!response.isBoom) {
        return reply();
    }
    var error = response;
    reply.view('error', {error: error}).code(error.output.statusCode);
});

/**
 * load hapi plugin module
 */
server.pack.require('./node_modules/hapi-plugin-app', function (err) {
    if(err) {
        throw err;
    }

    /**
     * start server, print routing table
     */
    server.start(function(){
        console.log('server started, port: '+Config.server.port);
        console.log('routes:');
        server.table().forEach(function(v){
            console.log(v.settings.method.toUpperCase()+": "+v.settings.path);  
        });
    });            
});
