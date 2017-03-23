module.exports = {
  eq: function(arg1) {
    return ({
      check: function(arg2) {
        return arg2 === arg1;
      },
      toJSON: function() {
        return {"$check": {"eq": arg1}};
      },
    });
  }
};
