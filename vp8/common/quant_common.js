'use strict';

var dc_qlookup =
        new Int32Array([
            4, 5, 6, 7, 8, 9, 10, 10,
            11, 12, 13, 14, 15, 16, 17, 17,
            18, 19, 20, 20, 21, 21, 22, 22,
            23, 23, 24, 25, 25, 26, 27, 28,
            29, 30, 31, 32, 33, 34, 35, 36,
            37, 37, 38, 39, 40, 41, 42, 43,
            44, 45, 46, 46, 47, 48, 49, 50,
            51, 52, 53, 54, 55, 56, 57, 58,
            59, 60, 61, 62, 63, 64, 65, 66,
            67, 68, 69, 70, 71, 72, 73, 74,
            75, 76, 76, 77, 78, 79, 80, 81,
            82, 83, 84, 85, 86, 87, 88, 89,
            91, 93, 95, 96, 98, 100, 101, 102,
            104, 106, 108, 110, 112, 114, 116, 118,
            122, 124, 126, 128, 130, 132, 134, 136,
            138, 140, 143, 145, 148, 151, 154, 157
        ]);

var dc_qlookup2 =
        new Int32Array([
            4, 5, 6, 7, 8, 9, 10, 10,
            11, 12, 13, 14, 15, 16, 17, 17,
            18, 19, 20, 20, 21, 21, 22, 22,
            23, 23, 24, 25, 25, 26, 27, 28,
            29, 30, 31, 32, 33, 34, 35, 36,
            37, 37, 38, 39, 40, 41, 42, 43,
            44, 45, 46, 46, 47, 48, 49, 50,
            51, 52, 53, 54, 55, 56, 57, 58,
            59, 60, 61, 62, 63, 64, 65, 66,
            67, 68, 69, 70, 71, 72, 73, 74,
            75, 76, 76, 77, 78, 79, 80, 81,
            82, 83, 84, 85, 86, 87, 88, 89,
            91, 93, 95, 96, 98, 100, 101, 102,
            104, 106, 108, 110, 112, 114, 116, 118,
            122, 124, 126, 128, 130, 132, 132, 132,
            132, 132, 132, 132, 132, 132, 132, 132
        ]);

//ac_q_lookup
var ac_qlookup =
        new Int32Array([
            4, 5, 6, 7, 8, 9, 10, 11,
            12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27,
            28, 29, 30, 31, 32, 33, 34, 35,
            36, 37, 38, 39, 40, 41, 42, 43,
            44, 45, 46, 47, 48, 49, 50, 51,
            52, 53, 54, 55, 56, 57, 58, 60,
            62, 64, 66, 68, 70, 72, 74, 76,
            78, 80, 82, 84, 86, 88, 90, 92,
            94, 96, 98, 100, 102, 104, 106, 108,
            110, 112, 114, 116, 119, 122, 125, 128,
            131, 134, 137, 140, 143, 146, 149, 152,
            155, 158, 161, 164, 167, 170, 173, 177,
            181, 185, 189, 193, 197, 201, 205, 209,
            213, 217, 221, 225, 229, 234, 239, 245,
            249, 254, 259, 264, 269, 274, 279, 284
        ]);

var ac_qlookup2 = new Int32Array([8,8,9,10,12,13,15,17,18,20,21,23,24,26,27,29,31,32,34,35,37,38,40,41,43,44,46,48,49,51,52,54,55,57,58,60,62,63,65,66,68,69,71,72,74,75,77,79,80,82,83,85,86,88,89,93,96,99,102,105,108,111,114,117,120,124,127,130,133,136,139,142,145,148,151,155,158,161,164,167,170,173,176,179,184,189,193,198,203,207,212,217,221,226,230,235,240,244,249,254,258,263,268,274,280,286,292,299,305,311,317,323,330,336,342,348,354,362,370,379,385,393,401,409,416,424,432,440]);


function vp8_dc_quant(QIndex, Delta) {
    var retval = 0;

    QIndex = QIndex + Delta;

    if (QIndex > 127) {
        return 157;
    } else if (QIndex < 0) {
        return 4;
    }

    return dc_qlookup[QIndex];
}

function vp8_dc2quant(QIndex, Delta) {
    var retval = 0;

    QIndex = QIndex + Delta;

    if (QIndex > 127) {
        return 314;
    } else if (QIndex < 0) {
        return 8;
    }

    retval = dc_qlookup[QIndex] << 1;
    return retval;
}

function vp8_dc_uv_quant(QIndex, Delta) {
    var retval = 0;

    QIndex = QIndex + Delta;

    if (QIndex > 127) {
        return 132;
    } else if (QIndex < 0) {
        return 4;
    }

    return dc_qlookup2[QIndex];
}

function vp8_ac_yquant(QIndex) {
    var retval = 0;

    if (QIndex > 127) {
        return 284;
    } else if (QIndex < 0) {
        return 4;
    }

    return ac_qlookup[QIndex];
}

function vp8_ac2quant(QIndex, Delta) {
    var retval = 0;

    QIndex = QIndex + Delta;

    if (QIndex > 127) {
        return 440;
    } else if (QIndex < 0) {
        return 8;
    }
    
    return ac_qlookup2[QIndex];
}

function vp8_ac_uv_quant(QIndex, Delta) {
    var retval = 0;

    QIndex = QIndex + Delta;

    if (QIndex > 127) {
        return 284;
    } else if (QIndex < 0) {
        return 4;
    }

    return ac_qlookup[QIndex];
}


module.exports = {};
module.exports.vp8_dc_quant = vp8_dc_quant;
module.exports.vp8_dc2quant = vp8_dc2quant;
module.exports.vp8_dc_uv_quant = vp8_dc_uv_quant;
module.exports.vp8_ac_yquant = vp8_ac_yquant;
module.exports.vp8_ac2quant = vp8_ac2quant;
module.exports.vp8_ac_uv_quant = vp8_ac_uv_quant;