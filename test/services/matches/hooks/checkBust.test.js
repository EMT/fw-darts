'use strict';

const assert = require('assert');
const checkBust = require('../../../../src/services/matches/hooks/checkBust.js');

describe('matches checkBust hook', () => {
  it('hook can be used', () => {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };
    
    checkBust()(mockHook);
    
    assert.ok(mockHook.checkBust);
  });
});
