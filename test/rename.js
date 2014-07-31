/*!
 * rename-path <https://github.com/jonschlinkert/rename-path>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */
'use strict';

var path = require('chai');
var expect = require('chai').expect;
var parsePath = require('..');

describe('parsePath()', function() {
  describe('when options.ext is defined:', function() {
    var options = {ext: '.js', normalize: true};

    it('should change the extension.', function () {
      var actual = 'foo/bar.json';
      var expected = 'foo/bar.js';
      expect(parsePath(actual, options)).to.eql(expected);
    });

    it('should overwrite multi-extensions with the one defined', function() {
      var fixture = 'foo/bar/baz.min.js';
      var expected = 'foo/bar/baz.js';
      expect(parsePath(fixture, options)).to.eql(expected);
    });

    it('should add an extension if one doesn\'t already exist', function() {
      var fixture = 'foo/bar/baz';
      var expected = 'foo/bar/baz.js';
      expect(parsePath(fixture, options)).to.eql(expected);
    });
  });

  describe('when options.flatten is defined:', function() {
    var options = {flatten: true, normalize: true};

    it('should strip the dirname from the generated path.', function () {
      var fixture = 'foo/bar.js';
      var expected = 'bar.js';
      expect(parsePath(fixture, options)).to.eql(expected);
    });
  });

  describe('when options.destBase is defined:', function() {
    var options = {destBase: 'dist', normalize: true};

    it('should prepend the destBase to the generated path.', function () {
      var fixture = 'foo/bar.js';
      var expected = 'dist/foo/bar.js';
      expect(parsePath(fixture, options)).to.eql(expected);
    });
  });

  describe('when options.prefixBase is defined:', function() {
    var options = {prefixBase: true, normalize: true};

    it('should prepend the src dirname to the generated path.', function () {
      var fixture = 'a/b/c/d/e/f/g.js';
      var expected = 'a/b/c/d/e/f/g.js';
      expect(parsePath(fixture, options)).to.eql(expected);
    });
  });

  describe('when options.srcBase is defined:', function() {
    var options = {srcBase: 'a/b/c', prefixBase: false, normalize: true};

    it('should strip the srcBase from the file path.', function () {
      var fixture = 'd/e/f/g.js';
      var expected = 'd/e/f/g.js';
      expect(parsePath(fixture, options)).to.eql(expected);
    });
  });

  describe('when options.srcBase and prefixBase are defined:', function() {
    var options = {srcBase: 'a/b/c', prefixBase: true, normalize: true};

    it('should prefix the srcBase to the dest path.', function () {
      var fixture = 'd/e/f/g.js';
      var expected = 'a/b/c/d/e/f/g.js';
      expect(parsePath(fixture, options)).to.eql(expected);
    });
  });

  describe('when destBase is defined:', function() {
    var options = {prefixBase: true, destBase: 'dist', normalize: true};

    it('should prepend the destBase to the generated path', function () {
      var fixture = 'a/b/c/d/e/f/g.js';
      var expected = 'dist/a/b/c/d/e/f/g.js';
      expect(parsePath(fixture, options)).to.eql(expected);
    });
  });

  describe('when prefixBase and destBase are defined:', function() {
    var options = {prefixBase: true, srcBase: 'src', destBase: 'dist', normalize: true};

    it('should prefix the destBase/srcBase to the generated path', function () {
      var fixture = 'a/b/c/d/e/f/g.js';
      var expected = 'dist/src/a/b/c/d/e/f/g.js';
      expect(parsePath(fixture, options)).to.eql(expected);
    });
  });
});

describe('basic mapping', function () {
  it('default options should create same-to-same src-dest mappings.', function (done) {
    var actual = ['a.txt', 'b.txt', 'c.txt'].map(function (filepath) {
      return parsePath(filepath, {
        destBase: 'dist',
        normalize: true
      });
    });
    var expected = ['dist/a.txt', 'dist/b.txt', 'dist/c.txt'];
    expect(actual).to.eql(expected);
    done();
  });
});

describe('options.srcBase', function () {
  it('default options should create same-to-same src-dest mappings.', function (done) {
    var actual = ['a.txt', 'bar/b.txt', 'bar/baz/c.txt'].map(function(filepath) {
      return parsePath(filepath, {srcBase: 'foo', prefixBase: true, normalize: true});
    });

    var expected = ['foo/a.txt', 'foo/bar/b.txt', 'foo/bar/baz/c.txt'];
    expect(actual).to.eql(expected);
    done();
  });
});

describe('options.destBase', function () {
  it('should prefix destBase with a trailing slash', function (done) {
    var actual = ['a.txt', 'bar/b.txt', 'bar/baz/c.txt'].map(function(filepath) {
      return parsePath(filepath, {destBase: 'foo/', normalize: true});
    });

    var expected = ['foo/a.txt', 'foo/bar/b.txt', 'foo/bar/baz/c.txt'];
    expect(actual).to.eql(expected);
    done();
  });

  it('should prefix destBase without a trailing slash', function (done) {
    var actual = ['a.txt', 'bar/b.txt', 'bar/baz/c.txt'].map(function(filepath) {
      return parsePath(filepath, {destBase: 'foo', normalize: true});
    });

    var expected = ['foo/a.txt', 'foo/bar/b.txt', 'foo/bar/baz/c.txt'];
    expect(actual).to.eql(expected);
    done();
  });
});

describe('options.flatten', function () {
  it('should remove the dirname', function (done) {
    var actual = ['a.txt', 'bar/b.txt', 'bar/baz/c.txt'].map(function(filepath) {
      return parsePath(filepath, {flatten: true});
    });

    var expected = ['a.txt', 'b.txt', 'c.txt'];
    expect(actual).to.eql(expected);
    done();
  });
});

describe('options.flatten + options.destBase', function () {
  it('should remove the dirname', function (done) {
    var actual = ['a.txt', 'bar/b.txt', 'bar/baz/c.txt'].map(function (filepath) {
      return parsePath(filepath, {
        flatten: true,
        destBase: 'blah',
        normalize: true
      });
    });

    var expected = ['blah/a.txt', 'blah/b.txt', 'blah/c.txt'];
    expect(actual).to.eql(expected);
    done();
  });
});

describe('options.ext', function () {
  it('should remove the dirname', function (done) {
    var actual = ['a.txt', 'bar/b.txt', 'bar/baz/c.txt'].map(function (filepath) {
      return parsePath(filepath, {
        flatten: true,
        destBase: 'blah',
        ext: '.js',
        normalize: true
      });
    });

    var expected = ['blah/a.js', 'blah/b.js', 'blah/c.js'];
    expect(actual).to.eql(expected);
    done();
  });
});

describe('options.extDot', function () {
  it('should use the first extension', function (done) {
    var actual = ['x/a.js.bar', 'x.y/b.bbb.min.js', 'x.y/z.z/c.js.foo'].map(function(filepath) {
      return parsePath(filepath, {extDot: 'first'});
    });

    var expected = ['x/a.js', 'x.y/b.bbb', 'x.y/z.z/c.js'];
    expect(actual).to.eql(expected);
    done();
  });

  it('should use the last extension', function (done) {
    var actual = ['x/a.js.bar', 'x.y/b.bbb.min.js', 'x.y/z.z/c.js.foo'].map(function(filepath) {
      return parsePath(filepath, {extDot: 'last'});
    });

    var expected = ['x/a.bar', 'x.y/b.js', 'x.y/z.z/c.foo'];
    expect(actual).to.eql(expected);
    done();
  });
});


describe('options.rename', function () {
  it('should use the last extension', function (done) {
    var actual = ['x/a.js.bar', 'x.y/b.bbb.min.js', 'x.y/z.z/c.js.foo'].map(function(filepath) {
      return parsePath(filepath, {
        arbitraryProp: 'ARBITRARY',
        rename: function(filepath) {
          return this.arbitraryProp + '/' + filepath.toUpperCase();
        }
      });
    });

    var expected = ['ARBITRARY/X/A.JS', 'ARBITRARY/X.Y/B.BBB', 'ARBITRARY/X.Y/Z.Z/C.JS'];
    expect(actual).to.eql(expected);
    done();
  });
});


