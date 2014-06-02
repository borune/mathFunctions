# mathFunctions

Basic mathematical functions or methods.

[![browser support](https://ci.testling.com/borune/mathFunctions.png)
](https://ci.testling.com/borune/mathFunctions)

# example

Function
```
var mFn = require('./mathFunctions.js')();

mFn.add(2, 3); // result: 5
```

Method
```
var mathNumMethods = require('./mathFunctions.js')("numberMethods");
// returns an object with the numberMethods in

var nr = Object.create(mathNumMethods);
// Attach the methods to nr as prototypes

nr.value = 6;	// value: 6		returned this
nr.add(4);		// value: 10	returned this
nr.square();	// value: 100	returned this
nr.sqrt();		// value: 10	returned this
nr.minus(4);	// value: 6		returned this

// The same but chained:
var result = nr.add(4).square().sqrt().minus(4).value;
				// result: 6
```

# license

MIT