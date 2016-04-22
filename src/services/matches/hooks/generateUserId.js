'use strict';

// src/services/matches/hooks/generateUserId.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};


function generateId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4();
}

module.exports = function() {
  return function(hook) {

  	for (var i = hook.data.players.length - 1; i >= 0; i--) {
  		hook.data.players[i]._id = generateId();
  	}
  };
};
