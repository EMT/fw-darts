'use strict';

// src/services/matches/hooks/find-most-common-shot.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

// TODO: Make a distinction between a D5 and 10, both are recorded as 10,
// 		 so it figures that 10 is your most common shot. This isn't a huge
// 		 issue, but will influence the data a bit.

const defaults = {};

module.exports = function(options) {
  return function(hook) {
  	const players = hook.result.players;

	return Promise.all(players.map(function (player) {

		return hook.app.service('matches').find({
			query: {
				"players._id": player._id
			}
		}).then(result => {
			var shots = [];
			var matches = result.data;

			for (var i = matches.length - 1; i >= 0; i--) {
				for (var j = matches[i].players.length - 1; j >= 0; j--) {
					Array.prototype.push.apply(shots, matches[i].players[j].shot_history)
				}
			}

			var store = shots;
			var frequency = {};  // array of frequency.
			var max = 0;  // holds the max frequency.
			var result;   // holds the max frequency element.
			for(var v in store) {
			        frequency[store[v]]=(frequency[store[v]] || 0)+1; // increment frequency.
			        if(frequency[store[v]] > max) { // is this frequency > max so far ?
			                max = frequency[store[v]];  // update max.
			                result = store[v];          // update result.
			        }
			}

			console.log('Most common shot: ' + result);
			return hook.app.service('users').patch(player._id, { most_common_shot: result }, hook.params).then(data => {

			});
		});

		// Get the user with the current id
		// => then
		// set the most_common attribute with the most common shot.

	})).then(result => {
	 	return hook;
	});

  };
};
