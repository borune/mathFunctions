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

if (typeof Object.create != 'function') {
    (function () {
        var F = function () {};
        Object.create = function (o) {
            if (arguments.length > 1) { 
              throw Error('Second argument not supported');
            }
            if (o === null) { 
              throw Error('Cannot set a null [[Prototype]]');
            }
            if (typeof o != 'object') { 
              throw TypeError('Argument must be an object');
            }
            F.prototype = o;
            return new F();
        };
    })();
}

var test = require('tape'),
	mathFunctions = require('../mathFunctions.js');

var mathFn = mathFunctions(),
	mathNumMethods = mathFunctions("numberMethods"),
	mathVecMethods = mathFunctions("vectorMethods");

	var AB = { x: 3 , z: 1};
	var AC = { x:-2 , z: 3};
	var ACab = { x: 0.4615384615384616, z: -0.6923076923076924 };
	var line = {
		A: {x: 100,z:100},
		B: {x: -100,z:100}
	};

test('testing mathFunctions:', function (t) {

    t.equal( mathFn.add(2,-3), -1);
    t.equal( mathFn.minus(2, 3), -1);
    t.equal( mathFn.square(3), 9);
    t.equal( mathFn.sqrt(9), 3); 
    t.equal( mathFn.diag(3, 4), 5);
    t.equal( mathFn.vDot(AB, AC), -3);
    t.equal( mathFn.vAbs(AC), 3.605551275463989);
    t.equal( mathFn.vProject(AB, AC).x, ACab.x);
    t.equal( mathFn.vProject(AB, AC).z, ACab.z);
    t.equal( mathFn.vMult(AB, 4).x, 12 );
    t.equal( mathFn.vMult(AB, 4).z, 4 );
    t.equal( mathFn.vDist(AB, AC).x, -5);
    t.equal( mathFn.vDist(AB, AC).z, 2);
    t.equal( mathFn.vAdd(AB, AC).x, 1);
    t.equal( mathFn.vAdd(AB, AC).z, 4);
    t.equal( mathFn.lDist(AB, line.A, line.B), 99);

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

test('testing mathVecMethods:', function (t) {
	var vec = Object.create(mathVecMethods);
	vec.value = AB;

    t.equal( vec.vDot(AC), -3);
    t.equal( vec.vAbs(), 3.1622776601683795);
    t.deepEqual( vec.vMult(4).value, { x : 12, z: 4 });
    t.deepEqual( vec.vDist(AC).value, { x : -14, z: -1 });
    t.deepEqual( vec.vAdd(AC).value, { x : -16, z: 2 });
    t.deepEqual( vec.vProject(AC).value, {"x":-5.846153846153847,"z":8.76923076923077});
    t.equal( vec.lDist(line.A, line.B), 91.23076923076923);

    t.end()
});