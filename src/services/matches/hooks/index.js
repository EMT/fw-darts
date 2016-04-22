'use strict';

const generateUserId = require('./generateUserId');

const calculateMoves = require('./calculateMoves');

const checkBust = require('./checkBust');

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
    globalHooks.trimSchema(schema),
    generateUserId()
  ],
  update: [
    globalHooks.updatedAt(),
    globalHooks.validateSchema(schema),
    globalHooks.trimSchema(schema),
    checkBust()
  ],
  patch: [checkBust()],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [calculateMoves()],
  patch: [// globalHooks.validateSchema(schema),
  // globalHooks.trimSchema(schema),
  globalHooks.updatedAt(), calculateMoves()],
  remove: []
};
