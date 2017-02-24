'use strict';

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

var c_utils = require('../../util/c_utils.js');
var memset = c_utils.memset;

/*
     if (start_col === 0) {
        //vp8_setup_intra_recon
        fixup_left(img.y, img.y_off, 16, img.stride, row, mbi[mbi_off].base.y_mode);
        fixup_left(img.u, img.u_off, 8, img.uv_stride, row, mbi[mbi_off].base.uv_mode);
        fixup_left(img.v, img.v_off, 8, img.uv_stride, row, mbi[mbi_off].base.uv_mode);

        //doesnt seem to do anything
        //if (row === 0)
        //  img.y[img.y_off - img.stride - 1]= 127;
        //console.warn(img.y_off - img.stride - 1);
    }
 */

function vp8_setup_intra_recon(predict, y_off, u_off, v_off, y_stride, uv_stride) {
    //The left column of out-of-frame pixels is taken to be 129,
    // unless we're doing DC_PRED, in which case we duplicate the
    // above row, unless this is also row 0, in which case we use
    // 129.
    //
    var y_buffer = predict;
    var y_off = (y_off - 1);
    var i = 0;
    /* Need to re-set the above row, in case the above MB was
     * DC_PRED.
     */
    y_off -= y_stride;

    for (i = -1; i < 16; i++) {
        y_buffer[y_off] = 129;
        y_off += y_stride;
    }
    
    /*
    var u_buffer = predict;
    var u_off = (u_off - 1);

    u_off -= uv_stride;

    for (i = 0; i < 8; i++) {
        y_buffer[y_off] = 129;//*
        y_off += y_stride;
    }
    
    var u_buffer = predict;
    var u_off = (u_off - 1);


    u_off -= uv_stride;

    for (i = -1; i < 8; i++) {
        u_buffer[u_off] = 129;//*
        u_off += uv_stride;
    }
*/
}

function vp8_setup_intra_recon_top_line(ybf) {
    //console.log(ybf.planes_off[0]);
    var data = ybf.img_data;

    var uv_ptr = ybf.planes_off[1] - 1 - ybf.uv_stride;
    var uv_length = (ybf.d_w >> 1) + 5;
    memset(data, ybf.planes_off[0] - 1 - ybf.stride, 127, ybf.d_w + 5);//ybf.y_width + 5
    memset(data, uv_ptr, 127, uv_length);
    //memset(data, uv_ptr, 127, uv_length);
}


module.exports = {};
module.exports.vp8_setup_intra_recon = vp8_setup_intra_recon;
module.exports.vp8_setup_intra_recon_top_line = vp8_setup_intra_recon_top_line;