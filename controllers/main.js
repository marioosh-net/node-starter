var Joi = require('joi');
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

	/**
	 * validate by joi validator
	 */
	var validation = Joi.validate(request.payload, {
		name: Joi.string().min(5),
		color: Joi.string()
	});

	if(validation == null) {
		var kitty = new Cat({ name: request.payload.name, color: request.payload.color});
		kitty.save(function (err) {
			if (err) {
				throw err;
			}
			reply().code(200);
		});		
	} else {
		// reply with validation error message 
		reply(validation.message).code(400);
	}
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