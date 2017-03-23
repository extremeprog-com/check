var expect = require('chai').expect;
var check = require('./index.js');

describe('check', function() {
  it('should be an object', function() {
    expect(check).to.be.an('object');
  });

  describe('check.eq', function() {
    it('should be an function', function() {
      expect(check.eq).to.be.a('function');
    });

    it('should have an property check', function() {
      expect(check.eq()).to.have.property('check');
    });

    it('should return true for equal arguments', function() {
      expect(check.eq(5).check(5)).to.be.equal(true);
    });

    it('should return false for unequal arguments', function() {
      expect(check.eq(5).check(4)).to.be.equal(false);
    });

    it('should return JSON.stringify in proper format', function() {
      // TODO convert arguments to string, so we must expect 5 as string
      var expected = JSON.stringify({$check: {eq: "5"}});
      expect(JSON.stringify(check.eq(5))).to.be.equal(expected);
    });
  })
});
