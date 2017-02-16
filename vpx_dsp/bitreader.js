'use strict';


/**
 * vp8dx_decode_bool
 * bool_get
 * @param {type} prob
 * @returns {Number}
 * vpx_read(vpx_reader *r, int prob) 
 */
function vpx_read(r, prob) {
    
    var split = 1 + (((r.range - 1) * prob) >> 8);
    var SPLIT = split << 8;
    var retval = 0;

    if (r.value >= SPLIT) {
        retval = 1;
        r.range -= split;
        r.value -= SPLIT;
    } else {
        retval = 0;
        r.range = split;
    }

    while (r.range < 128) {
        r.value <<= 1;
        r.range <<= 1;
        if (++r.bit_count === 8) {
            r.bit_count = 0;
            if (r.input_len) {
                r.value |= r.input[r.ptr++];
                r.input_len--;
            }
        }
    }
    return retval;
}


function vpx_read_bit(r) {

    return vpx_read(r, 128); 

}

function vpx_read_literal(r, bits) {
    var z = 0;
    var bit = 0;

    for (bit = bits - 1; bit >= 0; bit--) {
        z |= (vpx_read_bit(r) << bit);
    }

    return z;
}
    
module.exports = {};
module.exports.vpx_read_bit = vpx_read_bit;
module.exports.vpx_read = vpx_read;
module.exports.vpx_read_literal = vpx_read_literal;