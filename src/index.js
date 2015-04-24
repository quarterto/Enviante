var curry = require("curry");
var handleIntent = Symbol("handleIntent");

function Intent(path, data) {
	return {path, data};
}

Intent.scope = function(...scope) {
	return function(path, data) {
		return Intent([...scope, ...path], data)
	};
};

function find(xs, fn) {
	for(var i = 0, l = xs.length; i < l; ++i) {
		if(fn(xs[i], i, xs)) return xs[i];
	}
}

class Dispatcher {
	registry = [];

	canReceive(intent, receiver) {
		return receiver.receives.some(path =>
			path.every((part, i) => intent.path[i] === part)
		);
	}

	dispatch(intent) {
		var receiver = find(this.registry, receiver => this.canReceive(intent, receiver));
		if(receiver) {
			(receiver(intent) || []).forEach(i => this.dispatch(i));
		}
	}

	register(receiver) {
		this.registry.push(receiver);
	}
}

module.exports = Dispatcher;
