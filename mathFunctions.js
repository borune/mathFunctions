/*global module*/
module.exports = function mathFn(use) {
    'use strict';
    var firstCoord = 'x';
    var secondCoord = 'y';
    var ref = { 
        fn: {
            add: add,
            minus: minus,
            diag: Math.hypot || diag,
            square: square,
            sqrt: sqrt,
            vDot: vDot,
            vAbs: vAbs,
            vMult: vMult,
            vDist: vDist,
            vAdd: vAdd,
            vProject: vProject,
            lDist: lDist
        },
        method: {
            add: addm,
            minus: minusm,
            diag: diagm,
            square: squarem,
            sqrt: sqrtm,        
            vDot: vDotm,
            vAbs: vAbsm,
            vMult: vMultm,
            vDist: vDistm,
            vAdd: vAddm,
            vProject: vProjectm,
            lDist: lDistm
        }
    };

    if(toType(use) === 'object') {
        firstCoord = use.firstCoord || 'x';
        secondCoord = use.secondCoord || 'y';

        if(toType(use.select) === 'object') {
            var s = {};
            for(var each in use.select) {
                s[each] = ref[use.select[each]][each];
            }
            return s;
        }

    } else if (use === 'numberMethods') {
        return { 
            add: addm,
            minus: minusm,
            diag: diagm,
            square: squarem,
            sqrt: sqrtm
        };
    } else if (use === 'vectorMethods') {
        return { 
            vDot: vDotm,
            vAbs: vAbsm,
            vMult: vMultm,
            vDist: vDistm,
            vAdd: vAddm,
            vProject: vProjectm,
            lDist: lDistm
        };
    } else {
        return ref.fn;
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

    function vAdd(a, b) { // from a to b
        var o = {};
        o[firstCoord] = add(a[firstCoord], b[firstCoord]);
        o[secondCoord] = add(a[secondCoord], b[secondCoord]);
        return o;
    }

    function vDot(a, b) {
		return a[firstCoord] * b[firstCoord] + a[secondCoord] * b[secondCoord];
    }

    function vAbs(a) {
		return sqrt( add( square(a[firstCoord]), square(a[secondCoord]) ) );
    }

    function vMult(a, x) {
        var o = {};
        o[firstCoord] = a[firstCoord] * x;
        o[secondCoord] = a[secondCoord] * x;
        return o;	    	
    }

    function vDist(a, b) { // from a to b
        var o = {};
        o[firstCoord] = minus(b[firstCoord], a[firstCoord]);
        o[secondCoord] = minus(b[secondCoord], a[secondCoord]);
        return o;
    }


    function vProject(a, b) { // project a on b
        return vMult(b, vDot(b, a) / square(vAbs(b)));            
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
    		vFrom = a;
    	} else if ( vCpl > vAbs(vB) ) {
    		vFrom = b;
    	} else {
    		vFrom = vAdd(a, vCp);
    	}
		return vAbs( vDist( vFrom, c ) );
    }

//******************************************************
//  Methods
//******************************************************

    function addm(x) {
        /*jshint validthis: true */
        this.value = this.value + x;
        return this;
    }

    function squarem() {
        /*jshint validthis: true */
        this.value = this.value * this.value;
        return this;
    }

    function sqrtm() {
        /*jshint validthis: true */
        this.value = Math.sqrt(this.value);
        return this;
    }
   
    function diagm(x) {
        /*jshint validthis: true */
        this.value = sqrt( add( square(this.value), square(x) ) );
        return this;
    }

    function minusm(x) {
        /*jshint validthis: true */
        this.value -= x;
        return this;
    }

    function vDotm(b) {
        /*jshint validthis: true */
        return this.value[firstCoord] * b[firstCoord] + this.value[secondCoord] * b[secondCoord];
    }

    function vAbsm() {
        /*jshint validthis: true */
        return sqrt( add( square(this.value[firstCoord]), square(this.value[secondCoord]) ) );
    }

    function vMultm(k) {
        /*jshint validthis: true */
        this.value[firstCoord] = this.value[firstCoord] * k;
        this.value[secondCoord] = this.value[secondCoord] * k;
        return this; 
    }

    function vDistm(b) { // from a to b
        /*jshint validthis: true */
        this.value[firstCoord] = minus(b[firstCoord], this.value[firstCoord]);
        this.value[secondCoord] = minus(b[secondCoord], this.value[secondCoord]);
        return this;
    }

    function vAddm(b) { // from a to b
        /*jshint validthis: true */
        this.value[firstCoord] = add(b[firstCoord], this.value[firstCoord]);
        this.value[secondCoord] = add(b[secondCoord], this.value[secondCoord]);
        return this;
    }

    function vProjectm(b) { // project a on b
        /*jshint validthis: true */
        var v = vMult(b, vDot(b, this.value) / square(vAbs(b)));
        this.value[firstCoord] = v[firstCoord];
        this.value[secondCoord] = v[secondCoord];
        return this;
    }

    function lDistm(a, b) {   // distance from point "c" to line with two points "a" and "b"
        /*jshint validthis: true */
        var vC = vDist( a, this.value ),
            vB = vDist( a, b ),
            dotBC = vDot(vB, vC),
            vCp = vProject( vC, vB ),
            vCpl = vAbs(vCp),
            vFrom = {};

        if ( dotBC < 0 ) {
            vFrom = a;
        } else if ( vCpl > vAbs(vB) ) {
            vFrom = b;
        } else {
            vFrom = vAdd(a, vCp);
        }
        return vAbs( vDist( vFrom, this.value ) );
    }

    function toType(obj) {
        return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    }
};