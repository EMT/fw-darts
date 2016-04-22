'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('shots service', () => {
  it('registered the shots service', () => {
    assert.ok(app.service('shots'));
  });
});
