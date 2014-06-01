var mFn = require('./mathFunctions.js')();
var mMethods = require('./mathFunctions.js')("numberMethods");
var should = require('chai').should() //actually call the the function

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


var nr = Object.create(mMethods);
nr.value = 6;
console.log(nr.value + " + 4 = " + nr.add(4).value);
console.log("10 squared = " + nr.square().value);
console.log("Squareroot of 100 = " + nr.sqrt().value);
console.log(nr.value + " - 4 = " + nr.minus(4).value);
console.log("sqroot( (6 + 4)^2 ) -4 = " + nr.add(4).square().sqrt().minus(4).value);





var foo = 'bar',
    beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.length(3);
beverages.should.have.property('tea').with.length(3);











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