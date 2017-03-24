if (typeof require !== 'undefined') {
  var expect = require('chai').expect;
  var check = require('./index.js');
} else {
  var expect = window.chai.expect;
  var check = window.check;
}

describe('check', function() {
  it('should be an object', function() {
    expect(check).to.be.an('object');
  });

  describe('check.eq', function() {
    it('should be an function', function() {
      expect(check.eq).to.be.a('function');
    });

    it('should throw an error without input arguments', function() {
      expect(check.eq).to.throw(Error);
    });

    it('should have an property check', function() {
      expect(check.eq(3)).to.have.property('check');
    });

    it('should return true for equal arguments', function() {
      expect(check.eq(5).check(5)).to.be.true;
    });

    it('should return false for unequal arguments', function() {
      expect(check.eq("4").check(4)).to.be.false;
    });

    it('should return JSON.stringify in proper format', function() {
      var expected = JSON.stringify({$check: {eq: 5}});
      expect(JSON.stringify(check.eq(5))).to.be.equal(expected);
    });
  });

  describe('checker JSON.stringify format', function() {
    it('should return true if no input args present', function() {
      var expected = JSON.stringify({$check: {isNaN: true}});
      var result = JSON.stringify(check.isNaN());
      expect(result).to.be.equal(expected);
    });

    it('should return argument itself if one input args present', function() {
      var expected = JSON.stringify({$check: {eq: 1}});
      var result = JSON.stringify(check.eq(1));
      expect(result).to.be.equal(expected);
    });

    it('should return array of arguments if more than one input args present', function() {
      var expected = JSON.stringify({$check: {btw: [1, 2]}});
      var result = JSON.stringify(check.btw(1, 2));
      expect(result).to.be.equal(expected);
    });
  });
});
