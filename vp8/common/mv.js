"use strict";

class MotionVector {

    constructor() {
        this.internalStruct = new Int16Array(2);
        this.internalStruct32 = new Uint32Array(this.internalStruct.buffer);

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

this.x = {
    get: function () {
        return this.internalStruct[0];
    },
    set: function (x) {
        this.internalStruct[0] = x;
    }
};

Object.defineProperty(MotionVector.prototype, 'y', {
    get: function () {
        return this.internalStruct[1];
    },
    set: function (y) {
        this.internalStruct[1] = y;
    }
});

Object.defineProperty(MotionVector.prototype, 'as_int', {
    get: function () {
        return this.internalStruct32[0];
    },
    set: function (as_int) {
        this.internalStruct32[0] = as_int;
    }
});

module.exports = MotionVector;