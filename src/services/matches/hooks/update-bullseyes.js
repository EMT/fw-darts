'use strict';

// src/services/matches/hooks/update-misses.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function() {
  return function(hook) {
  	const players = hook.result.players;

	return Promise.all(players.map(function (player) {
		return hook.app.service('users').get(player._id).then(user => {
	  		var bullseyes = 0;
	  		console.log(player.shot_history);
	  		for (var j = player.shot_history.length - 1; j >= 0; j--) {
	  			if (player.shot_history[j] == 50) {
	  				bullseyes++;
	  			}
	  		}
			hook.app.service('users').patch(player._id, { bullseyes: user.bullseyes + bullseyes }, hook.params).then(data => {

			});
		});
	})).then(result => {
	 	return hook;
	});

  };
};
