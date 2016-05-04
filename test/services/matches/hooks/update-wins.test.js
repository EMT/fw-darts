'use strict';

const assert = require('assert');
const updateWins = require('../../../../src/services/matches/hooks/update-wins.js');

describe('matches updateWins hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    updateWins()(mockHook);

    assert.ok(mockHook.updateWins);
  });
});
