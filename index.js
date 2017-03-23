// TODO: try Proxy ES6 feature

var checkers = [{
  name: 'eq',
  check: function(initArgs, checkArgs) {
    return initArgs[0] === checkArgs[0];
  }
}, {
  name: 'gt',
  check: function(initArgs, checkArgs) {
    return initArgs[0] > checkArgs[0];
  }
}, {
  name: 'lt',
  check: function(initArgs, checkArgs) {
    return initArgs[0] < checkArgs[0];
  }
}, {
  name: 'btw',
  check: function(initArgs, checkArgs) {
    return (initArgs[0] < checkArgs[0]) && (checkArgs[0] < initArgs[1]);
  }
}];

var checker = {};

for (const checkerItem of checkers) {
  Object.defineProperty(checker, checkerItem.name, {
    get: function() {
      return function() {
        var initArgs = Array.prototype.slice.call(arguments);
        return {
          check: function() {
            var checkArgs = Array.prototype.slice.call(arguments);
            return checkerItem.check.call(null, initArgs, checkArgs);
          },
          toJSON: function() {
            return {$check: {[checkerItem.name]: initArgs.join()}}
          }
        }
      };
    }
  });
}

module.exports = checker;
