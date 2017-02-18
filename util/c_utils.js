'use strict';

var BLOCK_TYPES = 4;
var PREV_COEF_CONTEXTS = 3;
var COEF_BANDS = 8;
var ENTROPY_NODES = 11;

var MV_PROB_CNT =19;

function copy_entropy_values(header, otherHeader) {

        var probs = otherHeader.coeff_probs;
        header.coeff_probs = otherHeader.coeff_probs.slice(0);

        //load mv probs
        probs = otherHeader.mv_probs;
        //header can probably be done faster
        for (var i = 0; i < MV_PROB_CNT; i++)
            header.mv_probs[0][i] = probs[0][i];

        for (var i = 0; i < MV_PROB_CNT; i++)
            header.mv_probs[1][i] = probs[1][i];

        //load y mode probs
        probs = otherHeader.y_mode_probs_32;
        header.y_mode_probs_32[0] = probs[0];



        //load uv mode probs
        probs = otherHeader.uv_mode_probs;
        //for (var i = 0; i < 3; i++)
        header.uv_mode_probs[0] = probs[0];
        header.uv_mode_probs[1] = probs[1];
        header.uv_mode_probs[2] = probs[2];
        
        
        header.prob_inter = otherHeader.prob_inter;
        header.prob_last = otherHeader.prob_inter;
        header.prob_gf = otherHeader.prob_inter;
}

function memset(ptr, ptr_off, value, num) {

    var i = num;
    while (i--)
        ptr[ptr_off + i] = value;
}

function memset_32(ptr, ptr_off, value, num) {

    var i = num;//>> 2;
    var ptr_off_32 = ptr_off >> 2;
    var ptr_32 = ptr.data_32;
    var value_32 = value | value << 8 | value << 16 | value << 24;

    var num_32 = num >> 2;
    for (var i = 0; i < num_32; i++) {
        ptr_32[ptr_off_32 + (i >> 2)] = value_32;
    }

}

function memcpy(dst, dst_off, src, src_off, num) {
    
    var i = num;
    while (i--) {
        dst[dst_off + i] = src[src_off + i];
    }
    return dst;
    
}


module.exports = {};
module.exports.copy_entropy_values = copy_entropy_values;
module.exports.memset = memset;
module.exports.memset_32 = memset_32;
module.exports.memcpy = memcpy;
