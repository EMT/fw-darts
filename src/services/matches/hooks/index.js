'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');

const schema = require('../match-model.js')

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    globalHooks.validateSchema(schema),
    globalHooks.trimSchema(schema)
  ],
  update: [
    globalHooks.validateSchema(schema),
    globalHooks.trimSchema(schema)
  ],
  patch: [
    globalHooks.validateSchema(schema),
    globalHooks.trimSchema(schema)
  ],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
