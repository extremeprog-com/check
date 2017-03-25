if (typeof require === 'function') {
  var expect = require('chai').expect;
  var check = require('../index.js');
}
else if (typeof window !== 'undefined') {
  var expect = chai.expect;
  // check defined in window
} else {
  throw new Error('Unknown environment. Cannot be loaded.');
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

    describe('nested arrays', function() {
      it('should properly check arrays', function() {
        expect(check.eq([1, 2, 3]).check([1, 2, 3])).to.be.true;
      });

      it('should properly check nested arrays', function() {
        expect(check.eq([1, [4, 5, 6], 3]).check([1, [4, 5, 6], 3])).to.be.true;
      });

      it('should properly check by reference', function() {
        var arr = [1, [4, 5, 6], 3];
        expect(check.eq(arr).check(arr)).to.be.true;
      });

      it('should consider order in arrays', function() {
        expect(check.eq([1, 2, 3]).check([3, 2, 1])).to.be.false;
      });

      it('should return false if arrays length different', function() {
        expect(check.eq([1, 2, 3]).check([1, 2])).to.be.false;
      });

      it('should properly check empty arrays', function() {
        expect(check.eq([]).check([])).to.be.true;
        expect(check.eq([]).check([3, 4, 5])).to.be.false;
        expect(check.eq([5, 6, 7]).check([])).to.be.false;
      });
    });

    describe('nested objects', function() {
      it('should properly check objects', function() {
        expect(check.eq({x: 1, z: 2}).check({z: 2, x: 1})).to.be.true;
      });

      it('should check nested objects', function() {
        expect(check.eq({x: 1, z: { v: 3 }}).check({z: {v: 3}, x: 1})).to.be.true;
      });

      it('should properly check by reference', function() {
        var obj = {x: 1, z: { v: 3 }};
        expect(check.eq(obj).check(obj)).to.be.true;
      });

      it('should return false if obj keys length different', function() {
        expect(check.eq({x: 1, y: 2}).check({x: 1, y: 2, z: 3})).to.be.false;
      })

      it('should properly check null', function() {
        expect(check.eq(null).check(null)).to.be.true;
        expect(check.eq(null).check({x: 1, y: 2})).to.be.false;
        expect(check.eq({x: 1, y: 2}).check(null)).to.be.false;
      });
    });

    describe('nested objects and arrays', function() {
      it('should check nested obejects and arrays', function() {
        expect(check.eq({x: [1, 5, 6, 2], h: {h: 2, x: 4, u: []}}).check({h: {u: [], h: 2, x: 4}, x: [1, 5, 6, 2]})).to.be.true;
      });
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
