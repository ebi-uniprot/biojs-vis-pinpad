/*
 * biojs-vis-pinpad
 * https://github.com/ljgarcia/biojs-vis-pinpad
 *
 * Copyright (c) 2014 ljgarcia
 * Licensed under the Apache 2 license.
 */

// chai is an assertion library
var chai = require('chai');

// @see http://chaijs.com/api/assert/
var assert = chai.assert;

// register alternative styles
// @see http://chaijs.com/api/bdd/
chai.expect();
chai.should();

// requires your main app (specified in index.js)
var biojsvispinpad = require('../..');


describe('biojs-vis-pinpad module', function(){
  describe('#hello()', function(){
    it('should return a hello', function(){

      assert.equal(biojsvispinpad.hello('biojs'), ("hello biojs"));
      
      // alternative styles
      biojsvispinpad.hello('biojs').should.equal("hello biojs");
    });
  });
});
