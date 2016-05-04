'use strict';

// user-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Move misses/wins/most_common/etc.. into stats sub object.

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: { type: String, required: true },
  wins: {type: Number, 'default': 0},
  misses: {type: Number, 'default': 0},
  bullseyes: {type: Number, 'default': 0},
  most_common_shot: {type: Number, 'default': null},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;