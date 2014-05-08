exports.home = function(request, reply) {
	reply.view('index', {message: 'Hello World!'});
}