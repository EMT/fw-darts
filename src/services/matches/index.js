'use strict';

const service = require('feathers-mongoose');
const matches = require('./matches-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: matches,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/matches', service(options));

  // Get our initialize service to that we can bind hooks
  const matchesService = app.service('/matches');

  // Set up our before hooks
  matchesService.before(hooks.before);

  // Set up our after hooks
  matchesService.after(hooks.after);
};
