var Cat = require('mongoose').model('Cat');

var findKittens = function(callback) {
	Cat.find(function(err, kittens){
		if(err) {
			throw err;
		}
		callback(kittens);
	});
}

exports.home = function(request, reply) {
	findKittens(function(kittens){
		reply.view('index', {kittens: kittens});
	});	
};

exports.add = function(request, reply) {
	var kitty = new Cat({ name: request.payload.name});
	kitty.save(function (err) {
		if (err) {
			throw err;
		}
		reply().redirect('/');
	});
};

exports.del = function(request, reply) {
	var conditions = request.params.id ? {_id:request.params.id}:{};
	Cat.remove(conditions, function(err) {
		if (err) {
			throw err;
		}
		reply().redirect('/');		
	});
};

exports.list = function(request, reply) {
	findKittens(function(kittens){
		reply.view('list', {kittens: kittens});
	});
};