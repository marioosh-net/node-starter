var Hapi = require('hapi');
var routes = require('./routes');

var server = new Hapi.Server('0.0.0.0', 3000, {cors: true});

server.views({ 
	engines: {
		ejs: 'ejs'
	},
	path: './views'
});

server.route(routes.main);
server.route(routes.others);

server.start(function(){
    console.log('server started');
    console.log('routes:');
    server.table().forEach(function(v){
        console.log(v.settings.method.toUpperCase()+": "+v.settings.path);  
    });
});        

