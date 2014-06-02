module.exports = function mathFn(use) {
    if (use === "numberMethods") {
        return { 
            add: addm,
            minus: minusm,
            diag: diagm,
            square: squarem,
            sqrt: sqrtm
        }
    } else if (use === "vectorMethods") {
        return { 
            vDot: vDotm,
            vAbs: vAbsm,
            vMult: vMultm,
            vDist: vDistm,
            vAdd: vAddm,
            vProject: vProjectm
        }
    } else {
        return { 
            add: add,
            minus: minus,
            diag: diag,
            square: square,
            sqrt: sqrt,
            vDot: vDot,
            vAbs: vAbs,
            vMult: vMult,
            vDist: vDist,
            vAdd: vAdd,
            vProject: vProject,
            lDist: lDist
        }
    }


    function square(x) {
        return (x*x);
    }

    function add(x, y) {
        return (x+y);
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
		return sqrt( add( square(a.x), square(a.z) ) );
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
        return vMult(b, vDot(b, a) / square(vAbs(b)))            
    }

    function lDist(c, a, b) { 	// distance from point "c" to line with two points "a" and "b"
        var vC = vDist( a, c ),
    		vB = vDist( a, b ),
    		dotBC = vDot(vB, vC),
    		vCp = vProject( vC, vB ),
    		vCpl = vAbs(vCp),
    		vFrom = {};

    	if ( dotBC < 0 ) {
    		console.log("lower")
    		vFrom = a;
    	} else if ( vCpl > vAbs(vB) ) {
    		console.log("higher")
    		vFrom = b;
    	} else {
    		vFrom = vAdd(a, vCp)
    	}
		return vAbs( vDist( vFrom, c ) );
    }

//******************************************************
//  Methods
//******************************************************

    function addm(x) {
        this.value += x;
        return this
    }

    function squarem() {
        this.value = this.value * this.value;
        return this;
    }

    function sqrtm() {
        this.value = Math.sqrt(this.value);
        return this
    }
   
    function diagm(x, y) {
        return sqrt( add( square(x), square(y) ) );
    }

    function minusm(x) {
        this.value -= x;
        return this
    }

    function vDotm(a, b) {
        return a.x * b.x + a.z * b.z;
    }

    function vAbsm(a) {
        return sqrt( add( square(a.x), square(a.z) ) );
    }

    function vMultm(a, x) {
        return { 
            x: a.x * x,
            z: a.z * x
        };              
    }

    function vDistm(a, b) { // from a to b
        return { 
            x: minus(a.x, b.x),
            z: minus(a.z, b.z)
        };
    }

    function vAddm(a, b) { // from a to b
        return { 
            x: add(a.x, b.x),
            z: add(a.z, b.z)
        };
    }

    function vProjectm(a, b) { // project a on b
        return vMult(b, vDot(b, a) / square(vAbs(b)))            
    }

    function lDistm(c, a, b) {   // distance from point "c" to line with two points "a" and "b"
        var vC = vDist( a, c ),
            vB = vDist( a, b ),
            dotBC = vDot(vB, vC),
            vCp = vProject( vC, vB ),
            vCpl = vAbs(vCp),
            vFrom = {};

        if ( dotBC < 0 ) {
            console.log("lower")
            vFrom = a;
        } else if ( vCpl > vAbs(vB) ) {
            console.log("higher")
            vFrom = b;
        } else {
            vFrom = vAdd(a, vCp)
        }
        return vAbs( vDist( vFrom, c ) );
    }

}