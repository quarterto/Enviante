var expect = require('@quarterto/chai');
var sinon = require('sinon');
var createStore = require('./');

describe('enviante', () => {
	it('should send dispatches to a subscribed receiver', done => {
		var connect = createStore({thing: 1});
		var first = true;

		connect((subscribe) => {
			const thing = subscribe('thing');
			if(first) {
				expect(thing).to.equal(1);
				first = false;
			} else {
				expect(thing).to.equal(2);
				done();
			}
		});

		connect((subscribe, dispatch) => {
			dispatch('thing', () => 2);
		});
	});
});
