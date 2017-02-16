'use strict';
var MotionVector = require('./mv.js');

var CURRENT_FRAME = 0;
var LAST_FRAME = 1;
var GOLDEN_FRAME = 2;
var ALTREF_FRAME = 3;
var NUM_REF_FRAMES = 4;

var CNT_BEST = 0;
var CNT_ZEROZERO = 0;
var CNT_NEAREST = 1;
var CNT_NEAR = 2;
var CNT_SPLITMV = 3;

var DC_PRED = 0;
var V_PRED = 1;
var H_PRED = 2; 
var TM_PRED = 3; 
var B_PRED = 4; 
var NEARESTMV = 5;
var NEARMV = 6;
var ZEROMV = 7;
var NEWMV = 8;
var SPLITMV = 9;
var MB_MODE_COUNT = 10;

var DC_PRED = 0;
var V_PRED = 1;
var H_PRED = 2;
var TM_PRED = 3;
var B_PRED = 4;
var NEARESTMV = 5;
var NEARMV = 6;
var ZEROMV = 7;
var NEWMV = 8;
var SPLITMV = 9;
var MB_MODE_COUNT = 10;

var B_DC_PRED = 0; /* average of above and left pixels */
var B_TM_PRED = 1;
var B_VE_PRED = 2; /* vertical prediction */
var B_HE_PRED = 3; /* horizontal prediction */
var LEFT4X4 = 10;
var ABOVE4X4 = 11;
var ZERO4X4 = 12;
var NEW4X4 = 13;
var B_MODE_COUNT = 14;



var this_mv_1 = new MotionVector();

var this_mv_2 = new MotionVector();


function find_near_mvs(this_, mi, left_off, above, above_off, sign_bias, near_mvs, cnt) {
    
    var aboveleft_off = above_off - 1;
    var mv_ = (near_mvs);
    var mv_off = 0;
    var cntx = cnt;
    var cntx_off = 0;

    /* Zero accumulators */
    mv_[0].as_int = mv_[1].as_int = mv_[2].as_int = 0;//.raw
    cnt[0] = cnt[1] = cnt[2] = cnt[3] = 0;

    var above_ = mi[above_off];
    var left_ = mi[left_off];
    var aboveleft_ = mi[aboveleft_off];
    /* Process above */
    if (above_.mbmi.ref_frame !== CURRENT_FRAME) {
        
        if (above_.mbmi.mv.as_int) {

            mv_[(++mv_off)].x = above_.mbmi.mv.x;
            mv_[(mv_off)].y = above_.mbmi.mv.y;
            mv_bias(above_, sign_bias, this_.mbmi.ref_frame, mv_[mv_off]);
            ++cntx_off;
            
        }

        cntx[cntx_off] += 2;
    }

    /* Process left */
    if (left_.mbmi.ref_frame !== CURRENT_FRAME) {
        if (left_.mbmi.mv.as_int){//.raw 
            var this_mv = this_mv_1;

            this_mv.x = left_.mbmi.mv.x;//.raw
            this_mv.y = left_.mbmi.mv.y;//.raw
            mv_bias(left_, sign_bias, this_.mbmi.ref_frame, this_mv);

            if (this_mv.as_int !== mv_[mv_off].as_int) {
                mv_[(++mv_off)].x = this_mv.x;//->raw
                mv_[(mv_off)].y = this_mv.y;//->raw
                ++cntx_off;
            }

            cntx[cntx_off] += 2;
        } else
            cnt[CNT_ZEROZERO] += 2;
    }

    /* Process above left */
    if (aboveleft_.mbmi.ref_frame !== CURRENT_FRAME) {
        
        if (aboveleft_.mbmi.mv.as_int) {
            var this_mv = this_mv_2;

            this_mv.as_int = aboveleft_.mbmi.mv.as_int;
            mv_bias(aboveleft_, sign_bias, this_.mbmi.ref_frame,
                    this_mv);

            if (this_mv.as_int !== mv_[mv_off].as_int) {
                mv_[(++mv_off)].x = this_mv.x;//.raw
                mv_[(mv_off)].y = this_mv.y;//.raw
                ++cntx_off;
            }

            cntx[cntx_off] += 1;
        } else
            cnt[CNT_ZEROZERO] += 1;
    }

    /* If we have three distinct MV's ... */
    if (cnt[CNT_SPLITMV]) {
        /* See if above-left MV can be merged with NEAREST */
        if (mv_[mv_off].as_int === near_mvs[CNT_NEAREST].as_int)
            cnt[CNT_NEAREST] += 1;
    }

    cnt[CNT_SPLITMV] = ((above_.mbmi.y_mode === SPLITMV)
            + (left_.mbmi.y_mode === SPLITMV)) * 2
            + (aboveleft_.mbmi.y_mode === SPLITMV);

    /* Swap near and nearest if necessary */
    if (cnt[CNT_NEAR] > cnt[CNT_NEAREST]) {
        var tmp = 0;
        var tmp2 = 0;
        tmp = cnt[CNT_NEAREST];
        cnt[CNT_NEAREST] = cnt[CNT_NEAR];
        cnt[CNT_NEAR] = tmp;
        tmp = near_mvs[CNT_NEAREST].x;//.raw;
        tmp2 = near_mvs[CNT_NEAREST].y;//.raw;
        near_mvs[CNT_NEAREST].x = near_mvs[CNT_NEAR].x;
        near_mvs[CNT_NEAREST].y = near_mvs[CNT_NEAR].y;
        near_mvs[CNT_NEAR].x = tmp;
        near_mvs[CNT_NEAR].y = tmp2;
    }

    /* Use near_mvs[CNT_BEST] to store the "best" MV. Note that this
     * storage shares the same address as near_mvs[CNT_ZEROZERO].
     */
    if (cnt[CNT_NEAREST] >= cnt[CNT_BEST]) {
        near_mvs[CNT_BEST].x = near_mvs[CNT_NEAREST].x;
        near_mvs[CNT_BEST].y = near_mvs[CNT_NEAREST].y;
    }
}

function mv_bias(mb, sign_bias, ref_frame, mv) {
    
    if (sign_bias[mb.mbmi.ref_frame] ^ sign_bias[ref_frame]) {
        mv.x *= -1;
        mv.y *= -1;
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
module.exports.find_near_mvs = find_near_mvs;
module.exports.left_block_mode = left_block_mode;
module.exports.above_block_mode = above_block_mode;