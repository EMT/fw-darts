'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const service = require('feathers-mongoose');

exports.before = {
  all: [
    service.hooks.toObject()
  ],
  find: [
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: '_id' })
  ],
  create: [
    auth.hashPassword()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: '_id' })
  ],
  patch: [
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: '_id' })
  ]
};

exports.after = {
  all: [
    hooks.remove('password'),
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
