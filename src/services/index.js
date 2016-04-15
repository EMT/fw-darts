'use strict';


const matches = require('./matches');


module.exports = function() {
  const app = this;


  app.configure(matches);
};
