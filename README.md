# rename-paths [![NPM version](https://badge.fury.io/js/rename-paths.png)](http://badge.fury.io/js/rename-paths)

> Return src-dest mappings from an array of filepaths, based on options passed.

## Install
Install with [npm](npmjs.org):

```bash
npm i rename-paths --save-dev
```

## Usage

```js
var rename = require('rename-paths');
var filepath = 'foo/bar/baz.min.js';

console.log(rename(filepath));
//=> '.min.js'

console.log(rename(filepath));
//=> '.min'

console.log(rename(filepath));
//=> '.js'
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

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on June 17, 2014._