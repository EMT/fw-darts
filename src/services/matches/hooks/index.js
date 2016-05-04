'use strict';

const findMostCommonShot = require('./find-most-common-shot');

const updateMisses = require('./update-misses');

const updateBullseyes = require('./update-bullseyes');

const updateWins = require('./update-wins');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const service = require('feathers-mongoose');

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [service.hooks.toObject()],
  find: [],
  get: [],
  create: [updateWins(), updateBullseyes(), updateMisses(), findMostCommonShot()],
  update: [],
  patch: [],
  remove: []
};
