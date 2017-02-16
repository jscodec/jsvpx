'use strict';

var bitreader = require('../../vpx_dsp/bitreader.js');
var vpx_read = bitreader.vpx_read;
var vpx_read_bit = bitreader.vpx_read_bit;

class BOOL_DECODER {
    
    constructor() {
        this.range = 0;
        this.value = 0;
        this.input = 0;
        this.ptr = 0; //dont need
        this.input_len = 0;
        this.bit_count = 0;
        this.buffer_end;
        this.decrypt_cb;
        this.decrypt_state;
        this.clear_buffer;
    }
    
    get_uint(bits){
        return get_uint(this, bits);
    }
    
    get_int(bits){
        return bool_get_int(this, bits);
    }
    
    maybe_get_int(bits){
        return maybe_get_int(this, bits);
    }
    
}
    
function vp8dx_start_decode(bool, start_partition, ptr, sz) {

    if (sz >= 2) {
        bool.value = (start_partition[ptr] << 8) | start_partition[ptr + 1];
        bool.input = start_partition;
        bool.ptr = (ptr + 2) | 0;
        bool.input_len = (sz - 2) | 0;
    } else {
        bool.value = 0;
        bool.input = null;
        bool.input_len = 0;
    }

    bool.range = 255;
    bool.bit_count = 0;
}

function get_uint(bool, bits) {
    var z = 0;
    var bit = 0;

    for (bit = bits - 1; bit >= 0; bit--) {
        z |= (vpx_read_bit(bool) << bit);
    }

    return z;
}
    
/*
 * bool_get_int
 * vp8_decode_value
 * @param {type} bits
 * @returns {BoolDecoder.get_int.z|Number}
 */
function bool_get_int(bool, bits) {
    var z = 0;
    var bit = 0;

    for (bit = bits - 1; bit >= 0; bit--)
    {
        z |= (vpx_read_bit(bool) << bit);
    }

    return vpx_read_bit(bool) ? -z : z;
}

function maybe_get_int(bool, bits) {

    return vpx_read_bit(bool) ? bool.get_int(bits) : 0;
}


module.exports = {};
module.exports.vp8dx_start_decode = vp8dx_start_decode;
module.exports.bool_get_int = bool_get_int;
//module.exports.maybe_get_int = maybe_get_int;

module.exports.BOOL_DECODER = BOOL_DECODER;

