// var assert = require("assert")
// var mathFn = require('./mathFunctions.js')();


// describe('mathFunctions', function(){
//   describe('numbers', function(){
//     it('should return -1 when the value is not present', function(){
//       assert.equal(-1, mathFn.add(-3,2));
//       assert.equal(-1, mathFn.add(2,-3));
//     })
//   })
// })



var mathFn = require('../')();
var test = require('tape');

test('simple comparisons', function (t) {
    t.plan(1);

    var n = mathFn.add(2,-3);
    t.equal(n, -1);
});