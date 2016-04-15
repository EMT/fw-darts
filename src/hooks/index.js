'use strict';

// Add any common hooks you want to share across services in here.
//
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

var validator = require('is-my-json-valid')
var errors = require('feathers-errors')

exports.myHook = function(options) {
  return function(hook) {
    console.log('My custom global hook ran. Feathers is awesome!');
  };
};

exports.validateSchema = function(model, options) {
  var schema = {
    required: true,
    type: 'object',
    properties: model
  }

  options = Object.assign({
    verbose: true,
    greedy: true
  }, options)

  return (hook) => {
    var validate = validator(schema, options)
    var valid = validate(hook.data)

    let data = hook.data

    if (!valid) {
      data.errors = validate.errors
      throw new errors.BadRequest('Validation failed', data)
    }
  }
}

exports.trimSchema = function(model, options) {
  var filter = validator.filter({
    required: true,
    type: 'object',
    properties: model,
    additionalProperties: false
  })

  return (hook) => {
    let data = hook.data
    data = filter(data);
  }
}