'use strict';
var DC_PRED = 0;
var V_PRED = 1;
var H_PRED = 2; /* horizontal prediction */
var TM_PRED = 3; /* Truemotion prediction */
var B_PRED = 4; /* block based prediction, each block has its own prediction mode */
var NEARESTMV = 5;
var NEARMV = 6;
var ZEROMV = 7;
var NEWMV = 8;
var SPLITMV = 9;
var MB_MODE_COUNT = 10;

var B_DC_PRED = 0, /* average of above and left pixels */
        B_TM_PRED = 1,
        B_VE_PRED = 2, /* vertical prediction */
        B_HE_PRED = 3, /* horizontal prediction */

        B_LD_PRED = 4,
        B_RD_PRED = 5,
        B_VR_PRED = 6,
        B_VL_PRED = 7,
        B_HD_PRED = 8,
        B_HU_PRED = 9,
        LEFT4X4 = 10,
        ABOVE4X4 = 11,
        ZERO4X4 = 12,
        NEW4X4 = 13,
        B_MODE_COUNT = 14
        ;//} B_PREDICTION_MODE;

//b_mode_tree in dixie version
var vp8_bmode_tree =
        new Int32Array([
            -B_DC_PRED, 2, /* 0 = DC_NODE */
            -B_TM_PRED, 4, /* 1 = TM_NODE */
            -B_VE_PRED, 6, /* 2 = VE_NODE */
            8, 12, /* 3 = COM_NODE */
            -B_HE_PRED, 10, /* 4 = HE_NODE */
            -B_RD_PRED, -B_VR_PRED, /* 5 = RD_NODE */
            -B_LD_PRED, 14, /* 6 = LD_NODE */
            -B_VL_PRED, 16, /* 7 = VL_NODE */
            -B_HD_PRED, -B_HU_PRED         /* 8 = HD_NODE */
        ]);

//kf_y_mode_tree in dixie version
var vp8_kf_ymode_tree =
        new Int32Array([
            -B_PRED, 2,
            4, 6,
            -DC_PRED, -V_PRED,
            -H_PRED, -TM_PRED
        ]);

var vp8_ymode_tree =
        new Int32Array([
            -DC_PRED, 2,
            4, 6,
            -V_PRED, -H_PRED,
            -TM_PRED, -B_PRED
        ]);

var vp8_uv_mode_tree =
        new Int32Array([
            -DC_PRED, 2,
            -V_PRED, 4,
            -H_PRED, -TM_PRED
        ]);

var vp8_mv_ref_tree = new Int32Array([
    -ZEROMV, 2,
    -NEARESTMV, 4,
    -NEARMV, 6,
    -NEWMV, -SPLITMV
]);

var vp8_sub_mv_ref_tree = new Int32Array([
    -LEFT4X4, 2,
    -ABOVE4X4, 4,
    -ZERO4X4, -NEW4X4
]);

var vp8_small_mvtree =
        new Int32Array([
            2, 8,
            4, 6,
            -0, -1,
            -2, -3,
            10, 12,
            -4, -5,
            -6, -7
        ]);

var vp8_mbsplit_tree = new Int32Array([
    -3, 2,
    -2, 4,
    -0, -1
]);

var vp8_mbsplits =
        [
            new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]),
            new Int32Array([0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1]),
            new Int32Array([0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 3, 3, 2, 2, 3, 3]),
            new Int32Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        ];

var vp8_sub_mv_ref_prob2 =
        [
            new Int32Array([147, 136, 18]),
            new Int32Array([106, 145, 1]),
            new Int32Array([179, 121, 1]),
            new Int32Array([223, 1, 34]),
            new Int32Array([208, 1, 1])
        ];

//vp8_mbsplit_probs
var vp8_mbsplit_probs = new Uint8Array([110, 111, 150]);


// k_default_y_mode_probs
var vp8_ymode_prob = new Uint8Array([112, 86, 140, 37]);

//k_default_uv_mode_probs
var vp8_uv_mode_prob = new Uint8Array([162, 101, 204]);

//kf_uv_mode_probs
var vp8_kf_uv_mode_prob = new Uint8Array([142, 114, 183]);

//kf_y_mode_probs        
var vp8_kf_ymode_prob = new Uint8Array([145, 156, 163, 128]);

//default_b_mode_probs
var vp8_bmode_prob = new Uint8Array([120, 90, 79, 133, 87, 85, 80, 111, 151]);

function vp8_init_mbmode_probs(x) {
    
    var probs = vp8_ymode_prob;
    x.entropy_hdr.y_mode_probs[0] = probs[0];
    x.entropy_hdr.y_mode_probs[1] = probs[1];
    x.entropy_hdr.y_mode_probs[2] = probs[2];
    x.entropy_hdr.y_mode_probs[3] = probs[3];

    probs = vp8_uv_mode_prob;
    //for (var i = 0; i < 3; i++)
    x.entropy_hdr.uv_mode_probs[0] = probs[0];
    x.entropy_hdr.uv_mode_probs[1] = probs[1];
    x.entropy_hdr.uv_mode_probs[2] = probs[2];
    
}

module.exports = {};
module.exports.vp8_bmode_tree = vp8_bmode_tree;
module.exports.vp8_kf_ymode_tree = vp8_kf_ymode_tree;
module.exports.vp8_uv_mode_tree = vp8_uv_mode_tree;
module.exports.vp8_kf_uv_mode_prob = vp8_kf_uv_mode_prob;
module.exports.vp8_kf_ymode_prob = vp8_kf_ymode_prob;
module.exports.vp8_uv_mode_prob = vp8_uv_mode_prob;
module.exports.vp8_bmode_prob = vp8_bmode_prob;
module.exports.vp8_ymode_prob = vp8_ymode_prob;
module.exports.vp8_ymode_tree = vp8_ymode_tree;
module.exports.vp8_mbsplit_probs = vp8_mbsplit_probs;
module.exports.vp8_mv_ref_tree = vp8_mv_ref_tree;
module.exports.vp8_sub_mv_ref_tree = vp8_sub_mv_ref_tree;
module.exports.vp8_small_mvtree = vp8_small_mvtree;
module.exports.vp8_mbsplit_tree = vp8_mbsplit_tree;
module.exports.vp8_mbsplits = vp8_mbsplits;
module.exports.vp8_sub_mv_ref_prob2 = vp8_sub_mv_ref_prob2;
module.exports.vp8_init_mbmode_probs = vp8_init_mbmode_probs;