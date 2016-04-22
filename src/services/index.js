'use strict';


const shots = require('./shots');
const matches = require('./matches');


module.exports = function() {
  const app = this;


  app.configure(matches);
  app.configure(shots);
};
