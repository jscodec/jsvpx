"use strict";

class MotionVector {
    
    constructor() {
        var internalStruct = new Int16Array(2);
        var internalStruct32 = new Uint32Array(internalStruct.buffer);

        //this.x = 0;
        //this.y = 0;
        
        Object.defineProperty(this, 'x', {
            get: function () {
                return internalStruct[0];
            },
            set: function (x) {
                internalStruct[0] = x;
            }
        });

        Object.defineProperty(this, 'y', {
            get: function () {
                return internalStruct[1] ;
            },
            set: function (y) {
                internalStruct[1] = y;
            }
        });
        
        Object.defineProperty(this, 'as_int', {
            get: function () {
                return internalStruct32[0];
            },
            set: function (as_int) {
                internalStruct32[0] = as_int;
            }
        });
    }
}

module.exports = MotionVector;