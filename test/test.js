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


var test = require('tape'),
	mathFunctions = require('../mathFunctions.js');

var mathFn = mathFunctions(),
	mathNumMethods = mathFunctions("numberMethods"),
	mathVecMethods = mathFunctions("vectorMethods");

	var AB = { x: 3 , z: 1};
	var AC = { x:-2 , z: 3};
	var ACab = { x: 0.4615384615384616, z: -0.6923076923076924 };


test('testing mathFunctions:', function (t) {

    t.equal( mathFn.add(2,-3), -1);
    t.equal( mathFn.minus(2, 3), 1);
    t.equal( mathFn.square(3), 9);
    t.equal( mathFn.sqrt(9), 3); 
    t.equal( mathFn.diag(3, 4), 5);
    t.equal( mathFn.vDot(AB, AC), -3);
    t.equal( mathFn.vAbs(AC), 3.605551275463989);
    var calc_ACab = mathFn.vProject(AB, AC);
    t.equal( calc_ACab.x, ACab.x);
    t.equal( calc_ACab.z, ACab.z);

    t.end()
});

test('testing mathNumMethods:', function (t) {
	var nr = Object.create(mathNumMethods);
	nr.value = 6;

    t.equal( nr.add(4).value, 10);
    t.equal( nr.square().value, 100);
    t.equal( nr.sqrt().value, 10);
    t.equal( nr.minus(6).value, 4); 
    t.equal( nr.diag(3).value, 5);

    t.end()
});