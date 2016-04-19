'use strict';

// match-model.js - A just a generic object literal model

const MatchModel = {
  created_at: {
  	type: 'string',
  },
  updated_at: {
  	type: 'string',
  },
  player_one_name: {
	type: 'string',
	required: true
  },
  player_one_score: {
  	type: 'number',
  	required: true
  },
  player_two_name: {
	type: 'string',
	required: true
  },
  player_two_score: {
  	type: 'number',
  	required: true
  },
  starting_point: {
  	// required: true,
  	type: 'number',
    pattern: '^[0-9]+$'
  }
};

module.exports = MatchModel;
