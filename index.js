/*!
 * rename-path <https://github.com/jonschlinkert/rename-path>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */
'use strict';


var path = require('path');
var parsepath = require('parse-filepath');
var extname = require('ext-ext');
var relative = require('relative');


var flatten = function(filepath) {
  return path.basename(filepath);
};

var removeSrcBase = function(filepath, options) {
  options = options || {};
  var prefix = options.srcBase && (options.srcBase === true);
  return filepath.replace(prefix, '');
};

var normalizePath = function(filepath) {
  return filepath
    .replace(/^[\\\/]+/, '')
    .replace(/\\/g, '/');
};

var createDest = function(filepath, ext) {
  var parsed = parsepath(filepath);
  return filepath.replace(parsed.basename, parsed.name + ext);
};


module.exports = function renamePaths(filepath, options) {
  options = options || {};
  options.extDot = options.extDot || 'first';
  options.cwd = options.cwd || options.srcBase;

  var orig = filepath;
  var parsed = parsepath(filepath);
  var ext = options.ext || extname(filepath, options);

  // Strip the srcBase or cwd from the filepath
  filepath = removeSrcBase(filepath, options)

  if (options.flatten) {
    filepath = flatten(filepath);
  }


  // Create the destination filepath.
  var dest = createDest(filepath, ext);

  if (options.cwd && options.hasOwnProperty('prefixBase') && options.prefixBase === true) {
    dest = path.join(options.cwd, dest);
  }

  if (options.destBase) {
    dest = path.join(options.destBase, dest);
  }

  if (options.normalize) {
    dest = normalizePath(dest);
  }

  if (options.rename) {
    return options.rename.call(options, dest);
  }
  return dest;
};