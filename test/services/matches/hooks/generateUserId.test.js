'use strict';

const assert = require('assert');
const generateUserId = require('../../../../src/services/matches/hooks/generateUserId.js');

describe('matches generateUserId hook', () => {
  it('hook can be used', () => {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };
    
    generateUserId()(mockHook);
    
    assert.ok(mockHook.generateUserId);
  });
});
