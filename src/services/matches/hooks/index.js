'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');

const schema = require('../match-model.js')

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    globalHooks.createdAt(),
    globalHooks.updatedAt(),
    globalHooks.validateSchema(schema),
    globalHooks.trimSchema(schema)
  ],
  update: [
    globalHooks.updatedAt(),
    globalHooks.validateSchema(schema),
    globalHooks.trimSchema(schema)
  ],
  patch: [
  ],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [
    // globalHooks.validateSchema(schema),
    // globalHooks.trimSchema(schema),
    globalHooks.updatedAt(),
  ],
  remove: []
};
