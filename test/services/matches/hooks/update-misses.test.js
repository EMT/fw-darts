'use strict';

const assert = require('assert');
const updateMisses = require('../../../../src/services/matches/hooks/update-misses.js');

describe('matches updateMisses hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    updateMisses()(mockHook);

    assert.ok(mockHook.updateMisses);
  });
});
