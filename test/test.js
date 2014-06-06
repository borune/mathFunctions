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

/*global require*/
'use strict';
if (typeof Object.create != 'function') {
	try {
	    (function () {
			Object.create = function(o, props) {
				function F() {}
				F.prototype = o;

				if (typeof(props) === 'object') {
					for (var prop in props) {
						if (props.hasOwnProperty((prop))) {
							F[prop] = props[prop];
						}
					}
				}
				return new F();
			};
	    })();
   	} catch (ex){
	    if (ex instanceof TypeError){
	        //handle the error
	    } else if (ex instanceof ReferenceError){
	        //handle the error
	    } else {
			(function () {
		        var F = function () {};
		        Object.create = function (o) {
		            F.prototype = o;
		            return new F();
		        };
		    })();
	    }
	}
}


var test = require('tape'),
	mathFunctions = require('../mathFunctions.js');
var opt = {
	select: {
		'add': 'fn', 
		'minus': 'fn', 
		'vAdd': 'fn'},
	firstCoord: 'x',
    secondCoord: 'y'	
};

var opt2 = {
	select: {'vAdd': 'fn'},
	firstCoord: 'x',
    secondCoord: 'z'	
};

var MAX = Number.MAX_VALUE || 1.7976931348623157e+308,
	MIN = Number.MIN_VALUE || 5e-324,
	nINF = Number.NEGATIVE_INFINITY || Infinity,
	pINF = Number.POSITIVE_INFINITY || -Infinity;

var mathFn = mathFunctions(),
	mathFnOpt = mathFunctions(opt),
	mathFnOptxy = mathFunctions(opt2),
	mathNumMethods = mathFunctions('numberMethods'),
	mathVecMethods = mathFunctions('vectorMethods');

	var AB = { 'x': 3 , 'y': 1};
	var AC = { 'x':-2 , 'y': 3};
	var ABxy = { 'x': 3 , 'z': 1};
	var ACxy = { 'x':-2 , 'z': 3};
	var ACab = { x: 0.4615384615384616, y: -0.6923076923076924 };
	var line = {
		A: {x: 100,y:100},
		B: {x: -100,y:100}
	};

test('testing add:', function (t) {
    t.equal( mathFnOpt.add(2,-3), -1, '\t Testing add 2 + -3');
    t.equal( mathFnOpt.add(2, 3.4), 5.4, '\t Testing add 2 + NaN');
    t.equal( mathFnOpt.add(1, MAX), 1.7976931348623157e+308, '\t Testing add');
    t.equal( mathFnOpt.add(MIN,-3), -3, '\t Testing add');
    t.equal( mathFnOpt.add(2, pINF), pINF, '\t Testing add');
    t.equal( mathFnOpt.add(2, nINF), nINF, '\t Testing add');
    t.end();
});

test('testing opt:', function (t) {
    t.equal( mathFnOpt.add(2,-3), -1, '\t Testing add');
    t.equal( mathFnOpt.minus(2, 3), -1, '\t Testing minus');
    t.equal( mathFnOpt.vAdd(AB, AC).x, 1, '\t Testing vAdd.x');
    t.equal( mathFnOpt.vAdd(AB, AC).y, 4, '\t Testing vAdd.z');	
    t.end();
});

test('testing changing to optxy:', function (t) {
    t.equal( mathFnOptxy.vAdd(ABxy, ACxy).z, 4, '\t Testing vAdd.y');	
    t.end();
});

test('testing opt again:', function (t) {
    t.equal( mathFnOpt.vAdd(AB, AC).y, 4, '\t Testing vAdd.z');	
    t.end();
});

test('testing mathFunctions:', function (t) {

    t.equal( mathFn.add(2,-3), -1);
    t.equal( mathFn.minus(2, 3), -1);
    t.equal( mathFn.square(3), 9);
    t.equal( mathFn.sqrt(9), 3); 
    t.equal( mathFn.diag(3, 4), 5);
    t.equal( mathFn.vDot(AB, AC), -3, '\t Testing vDot fn' );
    t.equal( mathFn.vAbs(AC), 3.605551275463989);
    t.equal( mathFn.vProject(AB, AC).x, ACab.x);
    t.equal( mathFn.vProject(AB, AC).y, ACab.y);
    t.equal( mathFn.vMult(AB, 4).x, 12, '\t Testing vMult fn' );
    t.equal( mathFn.vMult(AB, 4).y, 4 );
    t.equal( mathFn.vDist(AB, AC).x, -5);
    t.equal( mathFn.vDist(AB, AC).y, 2);
    t.equal( mathFn.vAdd(AB, AC).x, 1);
    t.equal( mathFn.vAdd(AB, AC).y, 4);
    t.equal( mathFn.lDist(AB, line.A, line.B), 99);

    t.end();
});

test('testing mathNumMethods:', function (t) {
	var nr = Object.create(mathNumMethods);
	nr.value = 6;

    t.equal( nr.add(4).value, 10);
    t.equal( nr.square().value, 100);
    t.equal( nr.sqrt().value, 10);
    t.equal( nr.minus(6).value, 4); 
    t.equal( nr.diag(3).value, 5);

    t.end();
});

test('testing mathVecMethods:', function (t) {
	var vec = Object.create(mathVecMethods);
	vec.value = AB;

    t.equal( vec.vDot(AC), -3);
    t.equal( vec.vAbs(), 3.1622776601683795);
    t.deepEqual( vec.vMult(4).value, { x : 12, y: 4 });
    t.deepEqual( vec.vDist(AC).value, { x : -14, y: -1 });
    t.deepEqual( vec.vAdd(AC).value, { x : -16, y: 2 });
    t.deepEqual( vec.vProject(AC).value, {'x':-5.846153846153847,'y':8.76923076923077});
    t.equal( vec.lDist(line.A, line.B), 91.23076923076923);

    t.end();
});

