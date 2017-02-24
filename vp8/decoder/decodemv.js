'use strict';
var findenearmv = require('../common/findnearmv.js');
var left_block_mode = findenearmv.left_block_mode;
var above_block_mode = findenearmv.above_block_mode;

var MotionVector = require('../common/mv.js');
var vp8_entropymodedata = require("../common/vp8_entropymodedata");

var vp8_kf_bmode_prob = vp8_entropymodedata.vp8_kf_bmode_prob;

var vp8_coef_update_probs = require('../common/coefupdateprobs.js');

var entropymode = require('../common/entropymode');
var vp8_bmode_tree = entropymode.vp8_bmode_tree;
var vp8_kf_ymode_tree = entropymode.vp8_kf_ymode_tree;
var vp8_uv_mode_tree = entropymode.vp8_uv_mode_tree;
var vp8_kf_uv_mode_prob = entropymode.vp8_kf_uv_mode_prob;
var vp8_kf_ymode_prob = entropymode.vp8_kf_ymode_prob;
var vp8_sub_mv_ref_tree = entropymode.vp8_sub_mv_ref_tree;
var vp8_small_mvtree = entropymode.vp8_small_mvtree;
var vp8_mbsplit_tree = entropymode.vp8_mbsplit_tree;
var vp8_mbsplits = entropymode.vp8_mbsplits;
var vp8_sub_mv_ref_prob2 = entropymode.vp8_sub_mv_ref_prob2;
var vp8_bmode_prob = entropymode.vp8_bmode_prob;
var vp8_kf_ymode_tree = entropymode.vp8_kf_ymode_tree;
var vp8_bmode_tree = entropymode.vp8_bmode_tree;
var vp8_ymode_tree = entropymode.vp8_ymode_tree;
var vp8_uv_mode_tree = entropymode.vp8_uv_mode_tree;

var vp8_mode_contexts = require('../common/modecont.js');

var bitreader = require('../../vpx_dsp/bitreader.js');
var vpx_read = bitreader.vpx_read;
var vpx_read_bit = bitreader.vpx_read_bit;


var vp8_treed_read = require('./treereader.js');

var entropymv = require('../common/entropymv.js');
var vp8_mv_update_probs = entropymv.vp8_mv_update_probs;

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

var CNT_BEST = 0;
var CNT_ZEROZERO = 0;

var CNT_INTRA = 0;
var CNT_NEAREST = 1;
var CNT_NEAR = 2;
var CNT_SPLITMV = 3;


var CURRENT_FRAME = 0;


var MV_PROB_CNT = 19;

var INTRA_FRAME = 0;


var mbsplit_fill_count = new Uint8Array([ 8, 8, 4, 1 ]);

/*
 * read_segment_id
 * vp8_reader *r, MB_MODE_INFO *mi, MACROBLOCKD *x
 * passing in segment header for now
 */
function read_mb_features(r, mi, x) {
    // Is segmentation enabled 
    
    if (x.enabled && x.update_map) {

        // If so then read the segment id. 
        if (vpx_read(r, x.tree_probs[0]) === 1) {
            mi.mbmi.segment_id = 2 + vpx_read(r, x.tree_probs[2]);
        } else {
            mi.mbmi.segment_id = vpx_read(r, x.tree_probs[1]);
        }

    }
}

/**
 * static MB_PREDICTION_MODE
 */
function read_kf_ymode(bc, p) {

    var i = vp8_treed_read(bc, vp8_kf_ymode_tree, p, 0);

    return i;
}

/*
 * static B_PREDICTION_MODE
 */
function read_bmode(bc, p) {
    var i = vp8_treed_read(bc, vp8_bmode_tree, p , 0);

    return i;
}


/**
 * static MB_PREDICTION_MODE
 */
function read_uv_mode(bc, p) {

    var i = vp8_treed_read(bc, vp8_uv_mode_tree, p , 0);

    return i;
}


/**
 * @param {type} this_
 * @param {type} this_off
 * @param {type} left
 * @param {type} left_off
 * @param {type} above
 * @param {type} above_off
 * @param {type} bool
 * @returns {undefined}
 */
function read_kf_modes(pbi, mi, this_off, bool) {

    var uv_mode = 0;
    var mis = pbi.common.mode_info_stride;
    var bc = bool;
    var mi_cache = mi[this_off];
    
    //Add split mode dynamically to block info
    mi_cache.init_split_mode();
    
    var modes_cache = mi_cache.bmi.modes;
    mi_cache.mbmi.ref_frame = INTRA_FRAME;
    mi_cache.mbmi.y_mode = read_kf_ymode(bc, vp8_kf_ymode_prob);

    if (mi_cache.mbmi.y_mode === B_PRED) {
        var i = 0;
        mi_cache.mbmi.is_4x4 = 1;

        do {
            var A = above_block_mode(mi, this_off, i, mis);
            var L = left_block_mode(mi, this_off, i);


            modes_cache[i] = read_bmode(bc, vp8_kf_bmode_prob[A][L]);

        } while (++i < 16);

    }


    mi_cache.mbmi.uv_mode = read_uv_mode(bc, vp8_kf_uv_mode_prob);


}

var clamped_best_mv_1 = new MotionVector();

var LEFT_TOP_MARGIN  = (16 << 3);
var RIGHT_BOTTOM_MARGIN = (16 << 3);

function vp8_clamp_mv2(mv, bounds) {
    if (mv.x < (bounds.mb_to_left_edge)) {
        mv.x = bounds.mb_to_left_edge ;
    } else if (mv.x > bounds.mb_to_right_edge) {
        mv.x = bounds.mb_to_right_edge;
    }

    if (mv.y < (bounds.mb_to_top_edge )) {
        mv.y = bounds.mb_to_top_edge;
    }
    else if (mv.y > bounds.mb_to_bottom_edge) {
        mv.y = bounds.mb_to_bottom_edge ;
    }
}

//var mv_clamp_mv = new MotionVector();


function read_mv(bool, mv, mvc) {
    mv.y = read_mv_component(bool, mvc[0]);
    mv.x = read_mv_component(bool, mvc[1]);
}


var blockmv = new MotionVector();
var left_mv = new MotionVector();
var above_mv = new MotionVector();

function decode_split_mv(mi, left_mb, above_mb, hdr, best_mv, bool) {
    var partition = 0;
    var j = 0;
    var k = 0;
    var s; //split configuration


    var num_p = 0;
    s = 3;
    num_p = 16;
    if (vpx_read(bool, 110)) {
        s = 2;
        num_p = 4;
        if (vpx_read(bool, 111)) {
            s = vpx_read(bool, 150);
            num_p = 2;
        }
    }


    partition = vp8_mbsplits[s];
    var mvs = mi.bmi.mvs;


    do {
        blockmv.as_int = 0;
        left_mv.as_int = 0;
        above_mv.as_int = 0;
        
        var subblock_mode;//='prediction_mode'

        var prob;

        /* Find the first subblock in this partition. */
        for (k = 0; j !== partition[k]; k++)
            ;

        /* Decode the next MV */
        if (!(k & 3)) {
            if (left_mb.mbmi.y_mode === SPLITMV){
                left_mv.as_int = left_mb.bmi.mvs[k + 3].as_int;
            }else{
                left_mv.as_int = left_mb.mbmi.mv.as_int;
            }

        } else {
            left_mv.as_int = mi.bmi.mvs[k - 1].as_int;
        }
        
        
        if (!(k >> 2)) {
            if (above_mb.mbmi.y_mode === SPLITMV) {
                above_mv.as_int = above_mb.bmi.mvs[k + 12].as_int;
            } else {
                above_mv.as_int = above_mb.mbmi.mv.as_int;
            }

        } else {
            above_mv.as_int = mi.bmi.mvs[k - 4].as_int;
        }
        
        prob = get_sub_mv_ref_prob(left_mv.as_int, above_mv.as_int);
        
        if (vpx_read(bool, prob[0])) {
            if (vpx_read(bool, prob[1])) {
                //blockmv.as_int = 0;
                if (vpx_read(bool, prob[2])) {
                    read_mv(bool, blockmv, hdr.mv_probs);
                    blockmv.x = (blockmv.x + best_mv.x);
                    blockmv.y = (blockmv.y + best_mv.y);
                }
            } else {
                blockmv.as_int = above_mv.as_int;
            }
        } else {
            blockmv.as_int = left_mv.as_int;
        }
        
        var fill_count = mbsplit_fill_count[s];
        /* Fill the MV's for this partition */
        for (; k < 16; k++)
            if (j === partition[k]) {
                mvs[k].as_int = blockmv.as_int;

            }

    } while (++j < num_p);
    
    mi.mbmi.partitioning = s;
}

function get_sub_mv_ref_prob(left, above) {
  var lez = (left === 0);
  var aez = (above === 0);
  var lea = (left === above);
  var prob;

  prob = vp8_sub_mv_ref_prob3[(aez << 2) | (lez << 1) | (lea)];

  return prob;
}


var vp8_sub_mv_ref_prob3 = [
  new Uint8Array([ 147, 136, 18 ]), /* SUBMVREF_NORMAL          */
  new Uint8Array([ 223, 1, 34 ]),   /* SUBMVREF_LEFT_ABOVE_SAME */
  new Uint8Array([ 106, 145, 1 ]),  /* SUBMVREF_LEFT_ZED        */
  new Uint8Array([ 208, 1, 1 ]),    /* SUBMVREF_LEFT_ABOVE_ZED  */
  new Uint8Array([ 179, 121, 1 ]),  /* SUBMVREF_ABOVE_ZED       */
  new Uint8Array([ 223, 1, 34 ]),   /* SUBMVREF_LEFT_ABOVE_SAME */
  new Uint8Array([ 179, 121, 1 ]),  /* SUBMVREF_ABOVE_ZED       */
  new Uint8Array([ 208, 1, 1 ])     /* SUBMVREF_LEFT_ABOVE_ZED  */
];

//(need_mc_border(this_.mbmi.mv, x, y, 16, w, h))
function need_mc_border(mv, l, t, b_w, w, h) {
    var b = 0;
    var r = 0;

    // Get distance to edge for top-left pixel 
    l += (mv.x >> 3);
    t += (mv.y >> 3);

    // Get distance to edge for bottom-right pixel 
    r = w - (l + b_w);
    b = h - (t + b_w);

    return (l >> 1 < 2 || r >> 1 < 3 || t >> 1 < 2 || b >> 1 < 3);
}

function mv_bias(mb, sign_bias, ref_frame, mv) {

    if (sign_bias[mb.mbmi.ref_frame] ^ sign_bias[ref_frame]) {
        mv.x *= -1;
        mv.y *= -1;
    }

}

function read_mv_component(bool, mvc) {
    var IS_SHORT = 0, SIGN = 1, SHORT = 2, BITS = SHORT + 7, LONG_WIDTH = 10;
    var x = 0;

    if (vpx_read(bool, mvc[IS_SHORT])) // Large 
    {
        var i = 0;

        for (i = 0; i < 3; i++)
            x += vpx_read(bool, mvc[BITS + i]) << i;

        /* Skip bit 3, which is sometimes implicit */
        for (i = LONG_WIDTH - 1; i > 3; i--)
            x += vpx_read(bool, mvc[BITS + i]) << i;

        if (!(x & 0xFFF0) || vpx_read(bool, mvc[BITS + 3]))
            x += 8;
    } else   /* small */
        x = vp8_treed_read(bool, vp8_small_mvtree, mvc, +SHORT);//todo

    if (x && vpx_read(bool, mvc[SIGN]))
        x = -x;

    return (x << 1) | 0;
}

//Do not need to redeclare these
var near_mvs = [
    new MotionVector(),
    new MotionVector(),
    new MotionVector(),
    new MotionVector()
];

var near_mvs_best =  new MotionVector();

var chroma_mv = [
    new MotionVector(),
    new MotionVector(),
    new MotionVector(),
    new MotionVector()
];
        
var cnt = new Int32Array(4);
var this_mv_tmp = new MotionVector();
function read_mb_modes_mv(pbi, mi, this_off, bool, bounds) {

    var mbmi = mi[this_off].mbmi;
    var hdr = pbi.common.entropy_hdr;
    var this_ = mi[this_off];

    if (vpx_read(bool, hdr.prob_inter)) {

        //START DECODE_MVS
        
        
        //nearmvs
        var clamped_best_mv = clamped_best_mv_1;

        //var probs = new Uint8Array(4);
        
        var left_ = mi[this_off - 1];

        var BEST = 0;
        var NEAREST = 1;
        var NEAR = 2;
        
        var mis = pbi.common.mode_info_stride;
        
        var above = mi[this_off - mis];
        
        
        var sign_bias = pbi.common.sign_bias;

        var x = 0, y = 0, w = 0, h = 0, b = 0;

        mi[this_off].mbmi.ref_frame = vpx_read(bool, hdr.prob_last)
                ? 2 + vpx_read(bool, hdr.prob_gf)
                : 1;


        //START FIND NEAR MVS
        var aboveleft_off = (this_off - mis) - 1;
        var nmv = (near_mvs);
        var mv_off = 0;
        var cntx = cnt;
        var cntx_off = 0;

        /* Zero accumulators */
        nmv[0].as_int = nmv[1].as_int = nmv[2].as_int = 0;
        cnt[0] = cnt[1] = cnt[2] = cnt[3] = 0;

        
        
        var aboveleft_ = mi[aboveleft_off];
        /* Process above */
        if (above.mbmi.ref_frame !== INTRA_FRAME) {
            if (above.mbmi.mv.as_int) {
                nmv[++mv_off].as_int = above.mbmi.mv.as_int;
                mv_bias(above, sign_bias, this_.mbmi.ref_frame, nmv[mv_off]);
                ++cntx_off;

            }
            cntx[cntx_off] += 2;
        }

        /* Process left */
        if (left_.mbmi.ref_frame !== INTRA_FRAME) {
            if (left_.mbmi.mv.as_int) {
                var this_mv = this_mv_tmp;

                this_mv.as_int = left_.mbmi.mv.as_int;
                mv_bias(left_, sign_bias, this_.mbmi.ref_frame, this_mv);

                if (this_mv.as_int !== nmv[mv_off].as_int) {
                    nmv[++mv_off].as_int = this_mv.as_int;
                    ++cntx_off;
                }
                cntx[cntx_off] += 2;
            } else
                cnt[CNT_ZEROZERO] += 2;
        }

        /* Process above left */
        if (aboveleft_.mbmi.ref_frame !== INTRA_FRAME) {

            if (aboveleft_.mbmi.mv.as_int) {
                var this_mv = this_mv_tmp;

                this_mv.as_int = aboveleft_.mbmi.mv.as_int;
                mv_bias(aboveleft_, sign_bias, this_.mbmi.ref_frame,
                        this_mv);

                if (this_mv.as_int !== nmv[mv_off].as_int) {
                    nmv[(++mv_off)].as_int = this_mv.as_int;
                    ++cntx_off;
                }

                cntx[cntx_off] += 1;
            } else
                cnt[CNT_ZEROZERO] += 1;
        }

        /* If we have three distinct MV's ... */
        if (cnt[CNT_SPLITMV]) {
            /* See if above-left MV can be merged with NEAREST */
            if (nmv[mv_off].as_int === near_mvs[CNT_NEAREST].as_int)//.raw
                cnt[CNT_NEAREST] += 1;
        }

        cnt[CNT_SPLITMV] = ((above.mbmi.y_mode === SPLITMV)
                + (left_.mbmi.y_mode === SPLITMV)) * 2
                + (aboveleft_.mbmi.y_mode === SPLITMV);

        /* Swap near and nearest if necessary */
        if (cnt[CNT_NEAR] > cnt[CNT_NEAREST]) {
            var tmp = 0;
            tmp = cnt[CNT_NEAREST];
            cnt[CNT_NEAREST] = cnt[CNT_NEAR];
            cnt[CNT_NEAR] = tmp;
            tmp = near_mvs[CNT_NEAREST].as_int;
            near_mvs[CNT_NEAREST].as_int = near_mvs[CNT_NEAR].as_int;
            near_mvs[CNT_NEAR].as_int = tmp;
        }
        
        var near_index;
        /* Use near_mvs[CNT_BEST] to store the "best" MV. Note that this
         * storage shares the same address as near_mvs[CNT_ZEROZERO].
         */
        if (cnt[CNT_NEAREST] >= cnt[CNT_BEST]) {
            near_mvs[CNT_BEST].as_int = near_mvs[CNT_NEAREST].as_int;
            //near_mvs[CNT_BEST].y = near_mvs[CNT_NEAREST].y;
        }
        


        this_.mbmi.need_mc_border = 0;
        x = (-bounds.mb_to_left_edge - 128) >> 3;
        y = (-bounds.mb_to_top_edge - 128) >> 3;
        w = pbi.mb_cols << 4;
        h = pbi.mb_rows << 4;
        

        if (vpx_read(bool, vp8_mode_contexts[cnt[CNT_INTRA]][0])) {


            if (vpx_read(bool, vp8_mode_contexts[cnt[CNT_NEAREST]][1])) {
                if (vpx_read(bool, vp8_mode_contexts[cnt[CNT_NEAR]][2])) {



                    if (vpx_read(bool, vp8_mode_contexts[cnt[CNT_SPLITMV]][3])) {
                        //splitmv

                        this_.mbmi.y_mode = SPLITMV;
                        
                        
                        //Reset, dont redeclare
                        chroma_mv[0].as_int = 0;
                        chroma_mv[1].as_int = 0;
                        chroma_mv[2].as_int = 0;
                        chroma_mv[3].as_int = 0;
               

                        //clamped_best_mv = clamp_mv(near_mvs[BEST], bounds);
                        
                        clamped_best_mv = near_mvs[BEST];
                        vp8_clamp_mv2(clamped_best_mv, bounds);
                        
                        
                        decode_split_mv(this_, left_, above, hdr, clamped_best_mv, bool);//&clamped_best_mv
                        this_.mbmi.mv.as_int = this_.bmi.mvs[15].as_int;
       
                        var this_mvs = this_.bmi.mvs;
                        for (b = 0; b < 16; b++) {
                            
                            chroma_mv[(b >> 1 & 1) + (b >> 2 & 2)].x +=
                                    this_mvs[b].x;
                            chroma_mv[(b >> 1 & 1) + (b >> 2 & 2)].y +=
                                    this_mvs[b].y;

                            if (need_mc_border(this_mvs[b],
                                    x + (b & 3) * 4, y + (b & ~3), 4, w, h))
                            {
                                this_.mbmi.need_mc_border = 1;
                                break;
                            }
                        }

                        for (b = 0; b < 4; b++) {
                            chroma_mv[b].x += 4 + (chroma_mv[b].x >> 28) | 0;///* + 8 * (chroma_mv[b].x >> 31)*/;
                            chroma_mv[b].y += 4 + (chroma_mv[b].y >> 28) | 0;
                            chroma_mv[b].x = (chroma_mv[b].x >> 2);
                            chroma_mv[b].y = (chroma_mv[b].y >> 2);

                            //note we're passing in non-subsampled coordinates
                            if (need_mc_border(chroma_mv[b],
                                    x + (b & 1) * 8, y + ((b >> 1) << 3), 16, w, h))
                            {
                                this_.mbmi.need_mc_border = 1;
                                break;
                            }
                        }


                    } else {
                        //new mv
                        clamped_best_mv = near_mvs[BEST];
                        vp8_clamp_mv2(clamped_best_mv, bounds);
                        
                        read_mv(bool, this_.mbmi.mv, hdr.mv_probs);
                        this_.mbmi.mv.x += clamped_best_mv.x;
                        this_.mbmi.mv.y += clamped_best_mv.y;
                        this_.mbmi.y_mode = NEWMV;
                    }
                } else {
                    //nearmv
                    this_.mbmi.mv.as_int = near_mvs[NEAR].as_int;
                    vp8_clamp_mv2(this_.mbmi.mv, bounds);
                    this_.mbmi.y_mode = NEARMV;
                }
            } else {
                this_.mbmi.y_mode = NEARESTMV;
                this_.mbmi.mv.as_int = near_mvs[NEAREST].as_int;
                vp8_clamp_mv2(this_.mbmi.mv, bounds);

                
            }
        } else {
            this_.mbmi.y_mode = ZEROMV;
            this_.mbmi.mv.as_int = 0; 
        }
        
        
        
        if (need_mc_border(this_.mbmi.mv, x, y, 16, w, h))
            this_.mbmi.need_mc_border = 1;
        //END DECODE_MVS

    } else {

        //decode_intra_mb_mode(mi[this_off], pbi.common.entropy_hdr, bool);

        var y_mode = 0, uv_mode = 0;

        y_mode = vp8_treed_read(bool, vp8_ymode_tree, hdr.y_mode_probs , 0);
        
        if (y_mode === B_PRED) {
            var i = 0;
            var modes = this_.bmi.modes;
            var mvs = this_.bmi.mvs;
            for (i = 0; i < 16; i++) {
                var b;

                b = vp8_treed_read(bool, vp8_bmode_tree, vp8_bmode_prob , 0);
                modes[i] = mvs[i].x = b;
                //mvs[i].y = 0;
            }
        }

   
        mbmi.y_mode = y_mode;
        mbmi.uv_mode = vp8_treed_read(bool, vp8_uv_mode_tree, hdr.uv_mode_probs , 0);
        mbmi.mv.x = mi[this_off].mbmi.mv.y = 0;
        mbmi.ref_frame = CURRENT_FRAME;

    }

}


function decode_mb_mode_mvs(pbi, bool, mi, this_off, bounds) {

    var mi_cache = mi[this_off];
    
    if (pbi.segment_hdr.update_map === 1) {
        read_mb_features(bool, mi_cache, pbi.segment_hdr);
    } else if (pbi.common.is_keyframe === true && pbi.segment_hdr.update_map === 0) {
        mi_cache.mbmi.segment_id = 0;
    }


    if (pbi.common.entropy_hdr.coeff_skip_enabled === 1) {
        mi_cache.mbmi.mb_skip_coeff = vpx_read(bool, pbi.common.entropy_hdr.coeff_skip_prob);
    } else {
        mi_cache.mbmi.mb_skip_coeff = 0;
    }

    mi_cache.mbmi.is_4x4 = 0;
    if (pbi.common.is_keyframe === true) {
        read_kf_modes(pbi, mi, this_off, bool);
    } else {
        read_mb_modes_mv(pbi, mi, this_off, bool, bounds);
    }

}

function read_mvcontexts(bc, mvc) {
    var j = 0;
    for (var i = 0; i < 2; i++)
        for (j = 0; j < MV_PROB_CNT; j++)
            if (vpx_read(bc, vp8_mv_update_probs[i][j]))
            {
                var x = bc.get_uint(7);
                if (x > 0) {
                    mvc[i][j] = x << 1;
                } else {
                    mvc[i][j] = 1;
                }
            }
}

function mb_mode_mv_init(pbi) {
    var bc = pbi.boolDecoder;


    var bool = bc;

    var i = 0, j = 0, k = 0, l = 0;
    var x = 0;

    var coeff_probs = pbi.common.entropy_hdr.coeff_probs;
    /* Read coefficient probability updates */


    for (var i = 0; i < 1056; i++) {
        if (vpx_read(bool, vp8_coef_update_probs[i]) === 1)
            coeff_probs[i] = bool.get_uint(8);
    }


    /* Read coefficient skip mode probability */
    pbi.common.entropy_hdr.coeff_skip_enabled = vpx_read_bit(bool);

    if (pbi.common.entropy_hdr.coeff_skip_enabled === 1)
        pbi.common.entropy_hdr.coeff_skip_prob = bool.get_uint(8);
    else
        pbi.common.entropy_hdr.coeff_skip_prob = 0;

    /* Parse interframe probability updates */
    
    if (pbi.common.is_keyframe === false) {
        pbi.common.entropy_hdr.prob_inter = bool.get_uint(8);
        pbi.common.entropy_hdr.prob_last = bool.get_uint(8);
        pbi.common.entropy_hdr.prob_gf = bool.get_uint(8);

        if (vpx_read_bit(bool) === 1) {
            pbi.common.entropy_hdr.y_mode_probs[0] = bool.get_uint(8);
            pbi.common.entropy_hdr.y_mode_probs[1] = bool.get_uint(8);
            pbi.common.entropy_hdr.y_mode_probs[2] = bool.get_uint(8);
            pbi.common.entropy_hdr.y_mode_probs[3] = bool.get_uint(8);
        }

        if (vpx_read_bit(bool) === 1) {
            pbi.common.entropy_hdr.uv_mode_probs[0] = bool.get_uint(8);
            pbi.common.entropy_hdr.uv_mode_probs[1] = bool.get_uint(8);
            pbi.common.entropy_hdr.uv_mode_probs[2] = bool.get_uint(8);
        }

        read_mvcontexts(bc, pbi.common.entropy_hdr.mv_probs);
    }

}

var bounds = {
        mb_to_left_edge: 0,
        mb_to_right_edge: 0,
        mb_to_top_edge: 0,
        mb_to_bottom_edge: 0
    };
    
function vp8_decode_mode_mvs(pbi, bool) {

    var mb_row = -1;
    var mb_rows = pbi.mb_rows;
    var mb_cols = pbi.mb_cols;
    var start_col = 0;
    var mb_mb_to_right_edge_edge_start;

    bounds.mb_to_left_edge = 0;
    bounds.mb_to_right_edge = 0;
    bounds.mb_to_top_edge = 0;
    bounds.mb_to_bottom_edge = 0;

    mb_mode_mv_init(pbi);

    bounds.mb_to_top_edge = 0;

    while (++mb_row < mb_rows) {
        var mb_col = -1;

        var above_off = 0, this_, this_off = 0;



        this_ = pbi.mb_info_rows;
        this_off = pbi.mb_info_rows_off[1 + mb_row];
        above_off = pbi.mb_info_rows_off[mb_row];



        // Calculate the eighth-pel MV bounds using a 1 MB border.
        bounds.mb_to_left_edge = -((1) << 7);
        bounds.mb_to_right_edge = (pbi.mb_cols) << 7;
        bounds.mb_to_top_edge = -((mb_row + 1) << 7);
        bounds.mb_to_bottom_edge = (pbi.mb_rows - mb_row) << 7;


        
        while (++mb_col < mb_cols) {

            decode_mb_mode_mvs(pbi, bool, this_, this_off, bounds);


            if (pbi.common.is_keyframe === true) {


            } else {

                bounds.mb_to_left_edge -= 16 << 3;
                bounds.mb_to_right_edge -= 16 << 3;

            }

            // Advance to next mb

            this_off++; // probably mi_ptr;
            above_off++;
        }

    }

}

module.exports = {};
module.exports.read_mb_features = read_mb_features;
module.exports.read_kf_modes = read_kf_modes;
module.exports.vp8_decode_mode_mvs = vp8_decode_mode_mvs;