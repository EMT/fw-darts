'use strict';

// match-model.js - A just a generic object literal model

const MatchModel = {
  text: {
  	required: true,
    type: 'string'
  },
  player_one: {
  	required: true,
  	type: 'string'
  },
  player_two: {
  	required: true,
  	type: 'string'
  }
};

module.exports = MatchModel;
