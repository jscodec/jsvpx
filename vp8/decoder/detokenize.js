'use strict';

var blockd = require('../common/blockd.js');
var vp8_block2left = blockd.vp8_block2left;
var vp8_block2above = blockd.vp8_block2above;

var bitreader = require('../../vpx_dsp/bitreader.js');
var vpx_read = bitreader.vpx_read;
var vpx_read_bit = bitreader.vpx_read_bit;

var c_utils = require('../../util/c_utils.js');
var memset = c_utils.memset;

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


var TOKEN_BLOCK_Y1 = 0;
var TOKEN_BLOCK_UV = 1;
var TOKEN_BLOCK_Y2 = 2;
var TOKEN_BLOCK_TYPES = 3;

var EOB_CONTEXT_NODE = 0;
var ZERO_CONTEXT_NODE = 1;
var ONE_CONTEXT_NODE = 2;
var LOW_VAL_CONTEXT_NODE = 3;
var TWO_CONTEXT_NODE = 4;
var THREE_CONTEXT_NODE = 5;
var HIGH_LOW_CONTEXT_NODE = 6;
var CAT_ONE_CONTEXT_NODE = 7;
var CAT_THREEFOUR_CONTEXT_NODE = 8;
var CAT_THREE_CONTEXT_NODE = 9;
var CAT_FIVE_CONTEXT_NODE = 10;


var DCT_VAL_CATEGORY1 = 5;
var DCT_VAL_CATEGORY2 = 6;
var DCT_VAL_CATEGORY3 = 7;
var DCT_VAL_CATEGORY4 = 8;
var DCT_VAL_CATEGORY5 = 9;
var DCT_VAL_CATEGORY6 = 10;


var ENTROPY_NODES = 11;

/**
 * Comparable to vp8_reset_mb_tokens_context
 * @param {type} left
 * @param {type} above
 * @param {type} mode
 * @returns {null}
 */
function vp8_reset_mb_tokens_context(left, above, mode) {
    /* Reset the macroblock context on the left and right. We have to
     * preserve the context of the second order block if this mode
     * would not have updated it.
     */
    memset(left, 0, 0, 8);
    memset(above, 0, 0, 8);



    if (mode !== B_PRED && mode !== SPLITMV) {
        left[8] = 0;
        above[8] = 0;
    }
}



function X(n) {
    return ((n) * 33); //PREV_COEF_CONTEXTS * ENTROPY_NODES
}

var bands_x =
        new Int32Array([
            X(0), X(1), X(2), X(3), X(6), X(4), X(5), X(6),
            X(6), X(6), X(6), X(6), X(6), X(6), X(6), X(7)
        ]);

var extrabits =
        [
            {min_val: 0, length: -1, probs: new Uint8Array([0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0])}, //ZERO_TOKEN
            {min_val: 1, length: 0, probs: new Uint8Array([0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0])}, //ONE_TOKEN
            {min_val: 2, length: 0, probs: new Uint8Array([0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0])}, //TWO_TOKEN
            {min_val: 3, length: 0, probs: new Uint8Array([0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0])}, //THREE_TOKEN
            {min_val: 4, length: 0, probs: new Uint8Array([0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0])}, //FOUR_TOKEN
            {min_val: 5, length: 0, probs: new Uint8Array([159, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0])}, //DCT_VAL_CATEGORY1
            {min_val: 7, length: 1, probs: new Uint8Array([145, 165, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0])}, //DCT_VAL_CATEGORY2
            {min_val: 11, length: 2, probs: new Uint8Array([140, 148, 173, 0, 0, 0,
                    0, 0, 0, 0, 0, 0])}, //DCT_VAL_CATEGORY3
            {min_val: 19, length: 3, probs: new Uint8Array([135, 140, 155, 176, 0, 0,
                    0, 0, 0, 0, 0, 0])}, //DCT_VAL_CATEGORY4
            {min_val: 35, length: 4, probs: new Uint8Array([130, 134, 141, 157, 180, 0,
                    0, 0, 0, 0, 0, 0])}, //DCT_VAL_CATEGORY5
            {min_val: 67, length: 10, probs: new Uint8Array([129, 130, 133, 140, 153, 177,
                    196, 230, 243, 254, 254, 0])}, //DCT_VAL_CATEGORY6
            {min_val: 0, length: -1, probs: new Uint8Array([0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0])} // EOB TOKEN
        ];

var zigzag = new Uint32Array([
    0, 1, 4, 8, 5, 2, 3, 6, 9, 12, 13, 10, 7, 11, 14, 15
]);

var BLOCK_LOOP = 0, DO_WHILE = 1, CHECK_0_ = 2, CAT_FIVE_CONTEXT_NODE_0_ = 3, CAT_THREEFOUR_CONTEXT_NODE_0_ = 4, CAT_THREE_CONTEXT_NODE_0_ = 5, HIGH_LOW_CONTEXT_NODE_0_ = 6, CAT_ONE_CONTEXT_NODE_0_ = 7, LOW_VAL_CONTEXT_NODE_0_ = 8, THREE_CONTEXT_NODE_0_ = 9, TWO_CONTEXT_NODE_0_ = 10, ONE_CONTEXT_NODE_0_ = 11, BLOCK_FINISHED = 12, END = 13;


var i = 0, stopp = 0, type = 0;
var c = 0, t = 0, v = 0;
var val = 0, bits_count = 0;
var eob_mask = 0;
var b_tokens = 0;
var b_tokens_off = 0;//*   /* tokens for this block */
var type_probs = 0;
var type_probs_off = 0;//* /* probabilities for this block type */
var prob = 0;
var prob_off = 0;//*
var dqf = 0;
var global_bool;
var goto_;

function DECODE_AND_APPLYSIGN(value_to_sign) {

    if (vpx_read_bit(global_bool) === 1) {
        v = -value_to_sign * dqf[(!!c) + 0];
    } else {
        v = value_to_sign * dqf[(!!c) + 0];
    }
}

function DECODE_AND_BRANCH_IF_ZERO(probability, branch) {
        if (!vpx_read(global_bool, probability)) {
            goto_ = branch;
            return 1;
        }
    }
    
function decode_mb_tokens(bool, left,
        above,
        tokens,
        tokens_off,
        mode,
        probs, factor) {

    global_bool = bool;


    
    function DECODE_AND_LOOP_IF_ZERO(probability, branch) {
        if (!vpx_read(bool, probability))
        {
            prob_off = type_probs_off;
            if (c < 15) {
                ++c;
                prob_off += bands_x[c] | 0;
                goto_ = branch;
                return 1;
            } else {
                goto_ = BLOCK_FINISHED;
                return 1; /*for malformed input */
            }
        }
    }
    function DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) {
        DECODE_AND_APPLYSIGN(val);
        prob_off = type_probs_off + 22;//(ENTROPY_NODES * 2)
        if (c < 15) {
            b_tokens[b_tokens_off + zigzag[c]] = v;
            ++c;
            goto_ = DO_WHILE;
            return 1;
        }
        b_tokens[b_tokens_off + zigzag[15]] = v;
        goto_ = BLOCK_FINISHED;
        return 1;
    }

    function DECODE_EXTRABIT_AND_ADJUST_VAL(t, bits_count) {
        val += vpx_read(bool, extrabits[t].probs[bits_count]) << bits_count;
    }



    //*

    eob_mask = 0;

    if (mode !== B_PRED && mode !== SPLITMV)
    {
        i = 24;
        stopp = 24;
        type = 1;
        b_tokens = tokens;
        b_tokens_off = tokens_off + 384;
        dqf = factor[TOKEN_BLOCK_Y2];
    } else {
        i = 0;
        stopp = 16;
        type = 3;
        b_tokens = tokens;
        b_tokens_off = tokens_off;
        dqf = factor[TOKEN_BLOCK_Y1];
    }

    /* Save a pointer to the coefficient probs for the current type.
     * Need to repeat this whenever type changes.
     */
    type_probs = probs; /*[type][0][0];*/
    type_probs_off = type * 264; //COEF_BANDS * PREV_COEF_CONTEXTS * ENTROPY_NODES; //8 * 3 * 11

    goto_ = BLOCK_LOOP;
    do {
        if (goto_ === BLOCK_LOOP) {
            t = left[vp8_block2left[i]] + above[vp8_block2above[i]];
            c = (!type) + 0; /* all blocks start at 0 except type 0, which starts
             * at 1. */

            prob = type_probs;
            prob_off = type_probs_off;
            prob_off += t * ENTROPY_NODES;

            goto_ = DO_WHILE;
        }
        if (goto_ === DO_WHILE) {
            prob_off += bands_x[c];
            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + EOB_CONTEXT_NODE], BLOCK_FINISHED))
                continue;

            goto_ = CHECK_0_;
        }
        if (goto_ === CHECK_0_) {
            if (DECODE_AND_LOOP_IF_ZERO(prob[prob_off + ZERO_CONTEXT_NODE], CHECK_0_) === 1)
                continue;
            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + ONE_CONTEXT_NODE],
                    ONE_CONTEXT_NODE_0_) === 1)
                continue;
            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + LOW_VAL_CONTEXT_NODE],
                    LOW_VAL_CONTEXT_NODE_0_) === 1)
                continue;
            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + HIGH_LOW_CONTEXT_NODE],
                    HIGH_LOW_CONTEXT_NODE_0_) === 1)
                continue;
            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + CAT_THREEFOUR_CONTEXT_NODE],
                    CAT_THREEFOUR_CONTEXT_NODE_0_) === 1)
                continue;
            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + CAT_FIVE_CONTEXT_NODE],
                    CAT_FIVE_CONTEXT_NODE_0_) === 1)
                continue;
            val = extrabits[DCT_VAL_CATEGORY6].min_val;
            bits_count = extrabits[DCT_VAL_CATEGORY6].length;

            do
            {
                DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY6, bits_count);
                bits_count--;
            } while (bits_count >= 0);

            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) === 1)
                continue;

        }
        if (goto_ === CAT_FIVE_CONTEXT_NODE_0_) {
            val = extrabits[DCT_VAL_CATEGORY5].min_val;
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 4);
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 3);
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 2);
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 1);
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 0);
            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) === 1)
                continue;

        }
        if (goto_ === CAT_THREEFOUR_CONTEXT_NODE_0_) {
            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + CAT_THREE_CONTEXT_NODE],
                    CAT_THREE_CONTEXT_NODE_0_) === 1)
                continue;
            val = extrabits[DCT_VAL_CATEGORY4].min_val;
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY4, 3);
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY4, 2);
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY4, 1);
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY4, 0);
            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) === 1)
                continue;

        }
        if (goto_ === CAT_THREE_CONTEXT_NODE_0_) {
            val = extrabits[DCT_VAL_CATEGORY3].min_val;
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY3, 2);
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY3, 1);
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY3, 0);
            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) === 1)
                continue;

        }
        if (goto_ === HIGH_LOW_CONTEXT_NODE_0_) {
            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + CAT_ONE_CONTEXT_NODE],
                    CAT_ONE_CONTEXT_NODE_0_) === 1)
                continue;

            val = extrabits[DCT_VAL_CATEGORY2].min_val;
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY2, 1);
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY2, 0);
            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) === 1)
                continue;

        }
        if (goto_ === CAT_ONE_CONTEXT_NODE_0_) {
            val = extrabits[DCT_VAL_CATEGORY1].min_val;
            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY1, 0);
            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) === 1)
                continue;

        }
        if (goto_ === LOW_VAL_CONTEXT_NODE_0_) {
            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + TWO_CONTEXT_NODE],
                    TWO_CONTEXT_NODE_0_))
                continue;
            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + THREE_CONTEXT_NODE],
                    THREE_CONTEXT_NODE_0_))
                continue;
            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(4))
                continue;

        }
        if (goto_ === THREE_CONTEXT_NODE_0_) {
            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(3))
                continue;

        }
        if (goto_ === TWO_CONTEXT_NODE_0_) {
            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(2))
                continue;

        }
        if (goto_ === ONE_CONTEXT_NODE_0_) {
            DECODE_AND_APPLYSIGN(1);
            prob_off = type_probs_off + ENTROPY_NODES;

            if (c < 15)
            {
                b_tokens[b_tokens_off + zigzag[c]] = v;
                ++c;
                goto_ = DO_WHILE;
                continue;
            }

            b_tokens[b_tokens_off + zigzag[15]] = v;
            goto_ = BLOCK_FINISHED;
        }
        if (goto_ === BLOCK_FINISHED) {
            eob_mask = (eob_mask | ((c > 1) + 0 << i)) >>> 0;
            t = (c != !type) + 0;   // any nonzero data?
            eob_mask = (eob_mask | (t << 31)) >>> 0;//intBitLeft(t , 31);

            left[vp8_block2left[i]] = above[vp8_block2above[i]] = t;
            b_tokens_off += 16;

            i++;

            if (i < stopp) {
                goto_ = BLOCK_LOOP;
                continue;
            }

            if (i === 25)
            {
                type = 0;
                i = 0;
                stopp = 16;
                type_probs_off = type << 8;//type_probs = probs[type][0][0]; //COEF_BANDS * PREV_COEF_CONTEXTS * ENTROPY_NODES
                b_tokens_off = tokens_off;
                dqf = factor[TOKEN_BLOCK_Y1];
                goto_ = BLOCK_LOOP;
                continue;
            }

            if (i === 16)
            {
                type = 2;
                type_probs_off = type * 264;//type_probs = probs[type][0][0];
                stopp = 24;
                dqf = factor[TOKEN_BLOCK_UV];
                goto_ = BLOCK_LOOP;
                continue;
            }
        }
        goto_ = END;
    } while (goto_ !== END);

    return eob_mask;
}

module.exports = {};
module.exports.decode_mb_tokens = decode_mb_tokens;
module.exports.vp8_reset_mb_tokens_context = vp8_reset_mb_tokens_context;