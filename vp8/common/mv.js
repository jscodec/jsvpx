"use strict";

class MotionVector {

    constructor() {
        this.internalStruct = new Int16Array(2);
        this.as_int = new Uint32Array(this.internalStruct.buffer);

    }
}

Object.defineProperty(MotionVector.prototype, 'x', {
    get: function () {
        return this.internalStruct[0];
    },
    set: function (x) {
        this.internalStruct[0] = x;
    }
});

Object.defineProperty(MotionVector.prototype, 'y', {
    get: function () {
        return this.internalStruct[1];
    },
    set: function (y) {
        this.internalStruct[1] = y;
    }
});

module.exports = MotionVector;