
# Legends
**Legends** must be removed and replaced in this document

[check] - name of the project

[packageName] - npm package name of this project

# Intro
[check] provide interface for various checks, with ability to stringify in readable format

# Installation
`npm install --save-dev [packageName]`

## Append to project
#### nodejs
```javascript
var check = require('[packageName]');
```

#### browser
```html
<script type="text/javascript" src="[path to node modules]/[packageName]/index.js"></script>
```

# Usage
```javascript

var gt5 = check.gt(5);
JSON.stringfiy(gt5); // {$check: {gt: 5}}
gt5.check(6); // true
gt5.check(4); // false

var btw10and100 = check.btw(10, 100);
JSON.stringfiy(btw10and100); // {$check: {btw: [10, 100]}}
btw10and100.check(0); // false
btw10and100.check(50); // true
btw10and100.check(150); // false
```
