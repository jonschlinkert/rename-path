# rename-path [![NPM version](https://badge.fury.io/js/rename-path.png)](http://badge.fury.io/js/rename-path)

> Return a mapped dest for a src a filepath.

## Install
Install with [npm](npmjs.org):

```bash
npm i rename-path --save-dev
```

## Usage

```js
var rename = require('rename-paths');
var filepath = 'a/b/c.js';

console.log(rename(filepath, {ext: '.min.js'}));
//=> 'a/b/c.min.js'

console.log(rename(filepath, {destBase: 'dist', flatten: true, ext: '.min.js'}));
//=> 'c.min.js'

console.log(rename(filepath, {flatten: true, ext: '.min.js'}));
//=> 'dist/a/b/c.min.js'
```

See [the tests](./test) for more examples.


## Tests

In the command line, run:

```bash
mocha
```

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on June 28, 2014._