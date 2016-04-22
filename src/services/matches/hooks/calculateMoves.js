'use strict';

// src/services/matches/hooks/calculateMoves.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  return function(hook) {
  	// console.log(hook.data)
  	// console.log(hook.result)

  	// if (hook.data.player_one) {
  	// 	var score = hook.data.player_one.score;
  	// } else {
  	// 	var score = hook.data.player_two.score
  	// }

  	// console.log(score);

  	// Test dividing by 1
  	// 	is it zero
  	// 	 Test dividing by 2
  	// 	  is it zero
  	// 	   repeat 3 times.

  	// hook.result.messages = [
  	// 	possible_moves = []
  	// ]

    hook.calculateMoves = true;
  };
};
