var mFn = require('../mathFunctions.js')();
var mathNumMethods = require('./mathFunctions.js')("numberMethods");
var mathVecMethods = require('./mathFunctions.js')("vectorMethods");
var expect = require('chai').expect



var functionText = '';
for (var func in mFn) { functionText += mFn[func] }   
console.log(functionText.length);

try {
	console.log("testing mathFunctions");

	if( 5 === mFn.add(2, 3) ) {
		console.log("mFn.add(2, 3) === 5 successfull")
	} else {
		consolee.log("mFn.add(2, 3) !== 5 failed")
	}
} catch(err) {
	console.log("Catching error: " + err)
}


console.log("testing mathFunction vProj");
var AB = { x: 3 , z: 1};
var AC = { x:-2 , z: 3};

console.log( mFn.vDot(AB, AC) );
console.log( mFn.vAbs(AC) );

console.log( mFn.vProject(AB, AC) ); // AB onto AC


var nr = Object.create(mathNumMethods);
nr.value = 6;
console.log(nr.value + " + 4 = " + nr.add(4).value);
console.log("10 squared = " + nr.square().value);
console.log("Squareroot of 100 = " + nr.sqrt().value);
console.log(nr.value + " - 4 = " + nr.minus(4).value);
console.log("sqroot( (6 + 4)^2 ) -4 = " + nr.add(4).square().sqrt().minus(4).value);




var foo = 'bar',
    beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };


expect(nr.value).to.be.a('Number');
expect(nr.value).to.equal(7);
expect(foo).to.have.length(3);
expect(tea).to.have.property('flavors').with.length(3);




console.log("the end")






var walls = [
	// {
	// 	firstPoint: {x: 800,z:-800},
	// 	secondPoint: {x: 800,z:800}
	// },
	{
		firstPoint: {x: 100,z:100},
		secondPoint: {x: -100,z:100}
	}//,
	// {
	// 	firstPoint: {x: -800,z:800},
	// 	secondPoint: {x: -800,z:-800}
	// }
]

    // t.equal( mathFn.add(2,-3), -1);
    // t.equal( mathFn.minus(2,-3), 5);
    // t.equal( mathFn.square(3), 9);
    // t.equal( mathFn.sqrt(9), 3); 
    // t.equal( mathFn.diag(3, 4), 5);