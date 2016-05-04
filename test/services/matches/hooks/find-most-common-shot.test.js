'use strict';

const assert = require('assert');
const findMostCommonShot = require('../../../../src/services/matches/hooks/find-most-common-shot.js');

describe('matches findMostCommonShot hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    findMostCommonShot()(mockHook);

    assert.ok(mockHook.findMostCommonShot);
  });
});
