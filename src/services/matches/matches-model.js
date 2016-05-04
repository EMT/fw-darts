'use strict';

// matches-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchesSchema = new Schema({
  starting_point: { type: Number, required: true },
  players: {type: Array, required: true},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const matchesModel = mongoose.model('matches', matchesSchema);

module.exports = matchesModel;