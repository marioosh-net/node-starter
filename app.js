var Hapi = require('hapi');
var mongoose = require('mongoose');
var Config = require('./config');

var _port = process.env.PORT?process.env.PORT:Config.server.port;
var server = new Hapi.Server('0.0.0.0', _port, {cors: true});

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
 * mongoose
 * bootstrap db connection
 */
mongoose.connect(Config.db);

/**
 * mongoose
 * bootstrap models
 */
var models_path = __dirname + '/models'
require('fs').readdirSync(models_path).forEach(function(file) {
    require(models_path+'/'+file)
})

/**
 * routes loader
 */
var routes_path = __dirname + '/routes';
require('fs').readdirSync(routes_path).forEach(function(file) {
    if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
        server.route(require(routes_path+'/'+file));
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
        console.log('server started, port: '+_port);
        console.log('routes:');
        server.table().forEach(function(v){
            console.log(v.settings.method.toUpperCase()+": "+v.settings.path);  
        });
    });            
});
