'use strict';

// match-model.js - A just a generic object literal model

const MatchModel = {
  created_at: {
  	type: 'string',
  },
  updated_at: {
  	type: 'string',
  },
  players: {
  	type: 'array',
  	  player_one: {
	  	type: 'object',
		  name: {
			type: 'string',
			required: true
		  },
		  score: {
		  	type: 'number',
		  	required: true
		  },
		  history: {
		  	type: 'array'
		  }
	  },
	  player_two: {
	  	type: 'object',
		  name: {
			type: 'string',
			required: true
		  },
		  score: {
		  	type: 'number',
		  	required: true
		  },
		  history: {
		  	type: 'array'
		  }
	  },
  },
  starting_point: {
  	// required: true,
  	type: 'number',
    pattern: '^[0-9]+$'
  }
};

module.exports = MatchModel;
