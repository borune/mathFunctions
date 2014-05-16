exports.mathFn = function mathFn() {

    function square(x) {
        return (x*x);
    }

    function add(x) {
        return (x+x);
    }

    function sqrt(x) {
        return Math.sqrt(x);
    }
   
    function diag(x, y) {
        return sqrt( add( square(x), square(y) ) );
    }

    function minus(x, y) {
		return y - x;
    }

    function vDot(a, b) {
		return a.x * b.x + a.z * b.z;
    }

    function vAbs(a) {
		return sqrt( add( square(a.x) + square(a.z) ) );
    }

    function vMult(a, x) {
		return { 
			x: a.x * x,
			z: a.z * x
		};    	    	
    }

    function vDist(a, b) { // from a to b
		return { 
			x: minus(a.x, b.x),
			z: minus(a.z, b.z)
		};
    }

    function vAdd(a, b) { // from a to b
		return { 
			x: add(a.x, b.x),
			z: add(a.z, b.z)
		};
    }

    function vProject(a, b) { // project a on b
		return vMult(b, vDot(b, a) / vAbs(b))	    	
    }

    function lDist(c, a, b) { 	// distance from point "c" to line with two points "a" and "b"
    	var vC = vDist( a, c ),
    		vB = vDist( a, b ),
    		dotBC = vDot(vB, vC),
    		vCp = vProject( vC, vB ),
    		vCpl = vAbs(vCp),
    		vFrom = {};
    	console.log("ships point:" + c.x + "\t," + c.z + " \t from a to c: " + vAbs(vC));

    	if ( dotBC < 0 ) {
    		console.log("lower")
    		vFrom = a;
    	} else if ( vCpl < vAbs(vB) ) {
    		console.log("higher")
    		vFrom = b;
    	} else {
    		console.log("with in")
    		vFrom = vAdd(a, vCp)
    	}
		return vAbs( vDist( vFrom, c ) );
    }




    return { 
    	add: add,
        minus: minus,
    	diag: diag,
    	square: square,
        vDot: vDot,
        vAbs: vAbs,
        vMult: vMult,
        vDist: vDist,
        vAdd: vAdd,
        vProject: vProject,
    	lDist: lDist
    };
}