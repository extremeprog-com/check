(function() {
  var checker = Object.create(null);

  var checkers = [{
    name: 'eq',
    initArgsChecker: argsCheckExactLength(1),
    check: function(initArgs, checkArgs) {
      return initArgs[0] === checkArgs[0];
    }
  }, {
    name: 'gt',
    initArgsChecker: argsCheckExactLength(1),
    check: function(initArgs, checkArgs) {
      return initArgs[0] > checkArgs[0];
    }
  }, {
    name: 'lt',
    initArgsChecker: argsCheckExactLength(1),
    check: function(initArgs, checkArgs) {
      return initArgs[0] < checkArgs[0];
    }
  }, {
    name: 'btw',
    initArgsChecker: argsCheckExactLength(2),
    check: function(initArgs, checkArgs) {
      return (initArgs[0] < checkArgs[0]) && (checkArgs[0] < initArgs[1]);
    }
  }, {
    name: 'isNaN',
    initArgsChecker: argsCheckExactLength(0),
    check: function(initArgs, checkArgs) {
      return isNaN(checkerArgs[0]);
    }
  }];

  for (var checkerIndex in checkers) {
    defineChecker(checkers[checkerIndex]);
  }

  function argsCheckExactLength(expectedArgumentsLength) {
    return function(args, checkerName) {
      if (args.length === expectedArgumentsLength) {
        return true;
      }

      throw new Error('Checker "' + checkerName + '" expect exactly ' + expectedArgumentsLength + ' argument' + (expectedArgumentsLength > 1 ? 's' : '') + ', got ' + args.length);
    }
  };

  function formatArgs(args) {
    switch (args.length) {
      case 0:
        return true;
      case 1:
        return args[0];
      default:
        return args;
    }
  };

  function defineChecker(checkerItem) {
    Object.defineProperty(checker, checkerItem.name, {
      get: function() {
        return function() {
          var initArgs = Array.prototype.slice.call(arguments);

          typeof checkerItem.initArgsChecker === "function" && checkerItem.initArgsChecker(initArgs, checkerItem.name);

          return {
            check: function() {
              var checkArgs = Array.prototype.slice.call(arguments);
              return checkerItem.check.call(null, initArgs, checkArgs);
            },
            toJSON: function() {
              var $check = {};
              $check[checkerItem.name] = formatArgs(initArgs);
              return {$check: $check}
            }
          }
        };
      }
    });
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = checker;
  } else if (typeof window !== 'undefined') {
    window.check = checker;
  } else {
    throw new Error('Unknown environment. Cannot be loaded.');
  }
})();
