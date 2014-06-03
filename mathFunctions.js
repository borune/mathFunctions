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
            vProject: vProjectm,
            lDist: lDistm
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

    function add(x, y) {
        return (x+y);
    }

    function minus(x, y) {
        return x - y;
    }

    function square(x) {
        return (x*x);
    }

    function sqrt(x) {
        return Math.sqrt(x);
    }
   
    function diag(x, y) {
        return sqrt( add( square(x), square(y) ) );
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
			x: minus(b.x, a.x),
			z: minus(b.z, a.z)
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

    // distance from point "c" to line with two points "a" and "b"
    function lDist(c, a, b) { 	
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
   
    function diagm(x) {
        this.value = sqrt( add( square(this.value), square(x) ) )
        return this
    }

    function minusm(x) {
        this.value -= x;
        return this
    }

    function vDotm(b) {
        return this.value.x * b.x + this.value.z * b.z;
    }

    function vAbsm() {
        return sqrt( add( square(this.value.x), square(this.value.z) ) );
    }

    function vMultm(k) {
        this.value.x = this.value.x * k;
        this.value.z = this.value.z * k;
        return this  
    }

    function vDistm(b) { // from a to b
        this.value.x = minus(b.x, this.value.x);
        this.value.z = minus(b.z, this.value.z);
        return this
    }

    function vAddm(b) { // from a to b
        this.value.x = add(b.x, this.value.x);
        this.value.z = add(b.z, this.value.z);
        return this
    }

    function vProjectm(b) { // project a on b
        var v = vMult(b, vDot(b, this.value) / square(vAbs(b)));
        this.value.x = v.x;
        this.value.z = v.z;
        return this
    }

    function lDistm(a, b) {   // distance from point "c" to line with two points "a" and "b"
        var vC = vDist( a, this.value ),
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
        return vAbs( vDist( vFrom, this.value ) );
    }

}