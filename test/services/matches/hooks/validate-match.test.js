'use strict';

const assert = require('assert');
const validateMatch = require('../../../../src/services/matches/hooks/validate-match.js');

describe('matches validateMatch hook', () => {
  it('hook can be used', () => {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };
    
    validateMatch()(mockHook);
    
    assert.ok(mockHook.validateMatch);
  });
});
