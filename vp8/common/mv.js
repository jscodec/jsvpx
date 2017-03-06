"use strict";

class MotionVector {

    constructor() {
        this.as_row_col = new Int16Array(2);
        this.as_int = new Uint32Array(this.as_row_col.buffer);
    }
    
    static create(){
        var as_row_col = new Int16Array(2);
        var as_int = new Uint32Array(as_row_col.buffer);
        return {
            'as_row_col' : as_row_col,
            'as_int' : as_int
        };
    }
}

module.exports = MotionVector;