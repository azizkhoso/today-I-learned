# Generating Random 64-bit String in NodeJS

This can be achieved by `crypto` module built in NodeJS by default.

```
const crypto = require('crypto');
// randomBytes method accepts number for total bytes
// toString method accepts different arguments like base64, utf-8, hex, etc
const randomString = crypto.randomBytes(10).toString('base64');
console.log(randomString); // GAXGRX3wSUm7Yg==.
```
