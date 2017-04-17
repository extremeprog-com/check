# Intro
An interface for various checks with ability to stringify to the readable format.

# Installation
`npm install --save this-is`

## Append to project
#### nodejs
```javascript
var this_is = require('this-is');
```

#### browser
```html
<script type="text/javascript" src="[path to node modules]/this-is/index.js"></script>
```

# Usage
```javascript

var gt5 = this_is.gt(5);
JSON.stringfy(gt5); // {$check: {gt: 5}}
gt5.check(6); // true
gt5.check(4); // false

var btw10and100 = this_is.btw(10, 100);
JSON.stringfy(btw10and100); // {$check: {btw: [10, 100]}}
btw10and100.check(0); // false
btw10and100.check(50); // true
btw10and100.check(150); // false
```
