'use strict';
var MotionVector = require('./mv.js');

var DC_PRED = 0;
var V_PRED = 1;
var H_PRED = 2; 
var TM_PRED = 3; 
var B_PRED = 4; 

var DC_PRED = 0;
var V_PRED = 1;
var H_PRED = 2;
var TM_PRED = 3;
var B_PRED = 4;


var B_DC_PRED = 0; /* average of above and left pixels */
var B_TM_PRED = 1;
var B_VE_PRED = 2; /* vertical prediction */
var B_HE_PRED = 3; /* horizontal prediction */


function mv_bias(mb, sign_bias, ref_frame, mv) {
    
    if (sign_bias[mb.mbmi.ref_frame] ^ sign_bias[ref_frame]) {
        mv.as_row_col[0] *= -1;
        mv.as_row_col[1] *= -1;
    }
    
}

function above_block_mode(cur_mb, cur_mb_ptr, b, mi_stride) {

    if (!(b >> 2)) {

        cur_mb_ptr -= mi_stride;

        switch (cur_mb[cur_mb_ptr].mbmi.y_mode) {
            case B_PRED: return cur_mb[cur_mb_ptr].bmi.modes[b + 12];
            case DC_PRED: return B_DC_PRED;
            case V_PRED: return B_VE_PRED;
            case H_PRED: return B_HE_PRED;
            case TM_PRED: return B_TM_PRED;
            default: return B_DC_PRED;
        }
    }

    return cur_mb[cur_mb_ptr].bmi.modes[b - 4];
}



function left_block_mode(cur_mb, cur_mb_ptr, b) {
    
    if (!(b & 3)){
        cur_mb_ptr -= 1;
        switch (cur_mb[cur_mb_ptr].mbmi.y_mode) {
            case DC_PRED: return B_DC_PRED;
            case V_PRED: return B_VE_PRED;
            case H_PRED: return B_HE_PRED;
            case TM_PRED: return B_TM_PRED;
            case B_PRED: return cur_mb[cur_mb_ptr].bmi.modes[b + 3];
            default: return B_DC_PRED;
        }
    }

    return cur_mb[cur_mb_ptr].bmi.modes[b - 1];
}

module.exports = {};
module.exports.left_block_mode = left_block_mode;
module.exports.above_block_mode = above_block_mode;