'use strict';

const assert = require('assert');
const calculateMoves = require('../../../../src/services/matches/hooks/calculateMoves.js');

describe('matches calculateMoves hook', () => {
  it('hook can be used', () => {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };
    
    calculateMoves()(mockHook);
    
    assert.ok(mockHook.calculateMoves);
  });
});
