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

test('testing mathFunctions:', function (t) {

    t.equal( mathFn.add(2,-3), -1);
    t.equal( mathFn.minus(2, 3), -1);
    t.equal( mathFn.square(3), 9);
    t.equal( mathFn.sqrt(9), 3); 
    t.equal( mathFn.diag(3, 4), 5);

    // t.equal( mathFn.vDot(a, b) 
    // t.equal( mathFn.vAbs(a) 
    // t.equal( mathFn.vMult(a, x) 

    t.end()
});