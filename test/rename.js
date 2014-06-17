/*!
 * map-paths <https://github.com/jonschlinkert/map-paths>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */
'use strict';

var expect = require('chai').expect;
var rename = require('../lib/rename');

describe('rename()', function() {
  describe('when a path is passed:', function() {
    it('should return the extension from options.ext', function() {
      var actual = rename('foo/bar/baz.min.js', {ext: '.foo'});
      expect(actual).to.eql('foo/bar/baz.min.foo');
    });
    it('should convert foo to bar.', function () {
      var actual = 'foo/bar.js';
      var expected = 'foo/bar.json';
      expect(rename(actual, {ext: '.json'})).to.eql(expected);
    });
  });
});

