'use strict';

// src/services/matches/hooks/update-wins.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function() {
  return function(hook) {
  	const players = hook.result.players;

	return Promise.all(players.map(function (player) {
		if (player.winner == 'true') {
  			return hook.app.service('users').get(player._id).then(user => {
				hook.app.service('users').patch(player._id, { wins: user.wins + 1 }, hook.params).then(data => {

				})
  			});
  		}
	})).then(result => {
	 	return hook;
	});

  };
};
