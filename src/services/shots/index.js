'use strict';

const hooks = require('./hooks');
const _ = require('lodash');

class Service {
  setup(app) {
    this.app = app;
  }

  create(data, params) {
    const matches = this.app.service('matches');
    const matchId = params.match_id;
    const score = data.score;
    const userId = data.user_id;
    const double = data.double;


    return matches.get(matchId)
      .then(match => {

        var indexer = {};
        for (var i = 0; i < match.players.length; i++) {
            indexer[match.players[i]._id] = parseInt(i);
        }
        var userIndex = indexer[userId];

        match.players[userIndex].score = match.players[userIndex].score - score;

        params.updated_player = userId;

        return matches.patch(matchId, match, {user_index: userIndex, double: double})
          .then(match => {
            return { match };
          });

      });
  }
}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/matches/:match_id/shots', new Service());

  // Get our initialize service to that we can bind hooks
  const shotsService = app.service('/matches/:match_id/shots');

  // Set up our before hooks
  shotsService.before(hooks.before);

  // Set up our after hooks
  shotsService.after(hooks.after);
};

module.exports.Service = Service;
