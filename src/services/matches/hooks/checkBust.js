'use strict';

// src/services/matches/hooks/checkBust.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const errors = require('feathers-errors');

const defaults = {};

module.exports = function() {
  return function(hook) {
  	console.log(hook.params)
  	var score = hook.data.players[hook.params.user_index].score;

	if (score < 0 || score == 1) {
      throw new errors.GeneralError('You are bust!', {
        errors: [
          {
            path: 'score',
            value: score,
            message: `You went past 0 or finished on 1`
          }
        ]
      });
    }

    if (score == 0 && hook.params.double != true) {
      throw new errors.GeneralError('You are bust!', {
        errors: [
          {
            path: 'score',
            value: score,
            message: `You need a double to finish`
          }
        ]
      });
    }

  };
};
