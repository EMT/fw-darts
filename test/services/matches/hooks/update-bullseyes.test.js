'use strict';

const assert = require('assert');
const updateBullseyes = require('../../../../src/services/matches/hooks/update-bullseyes.js');

describe('matches updateBullseyes hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    updateBullseyes()(mockHook);

    assert.ok(mockHook.updateBullseyes);
  });
});
