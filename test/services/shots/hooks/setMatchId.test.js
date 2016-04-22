'use strict';

const assert = require('assert');
const setMatchId = require('../../../../src/services/shots/hooks/setMatchId.js');

describe('shots setMatchId hook', () => {
  it('hook can be used', () => {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };
    
    setMatchId()(mockHook);
    
    assert.ok(mockHook.setMatchId);
  });
});
