'use strict';

var abs = Math.abs;
var min = Math.min;
var max = Math.max;

function saturate_int8(x) {

    return min(max(x, -128), 127);
}

function saturate_uint8(x) {
    return min(max(x, 0), 255);
}

//possible vp8_simple_filter
function vp8_filter(pixels, pixels_off, stride, use_outer_taps) {
    var p1 = pixels[pixels_off - 2 * stride];
    var p0 = pixels[pixels_off - stride];
    var q0 = pixels[pixels_off];
    var q1 = pixels[pixels_off + stride];

    var a = 0;
    var f1 = 0;
    var f2 = 0;

    a = 3 * (q0 - p0);

    if (use_outer_taps)
        a += saturate_int8(p1 - q1);

    a = saturate_int8(a);

    f1 = ((a + 4 > 127) ? 127 : a + 4) >> 3;
    f2 = ((a + 3 > 127) ? 127 : a + 3) >> 3;

    p0 = saturate_uint8(p0 + f2);
    q0 = saturate_uint8(q0 - f1);

    if (!use_outer_taps)
    {
        /* This handles the case of subblock_filter()
         * (from the bitstream guide.
         */
        a = (f1 + 1) >> 1;
        p1 = saturate_uint8(p1 + a);
        q1 = saturate_uint8(q1 - a);
    }

    pixels[pixels_off - 2 * stride] = p1;
    pixels[pixels_off - stride] = p0;
    pixels[pixels_off] = q0;
    pixels[pixels_off + stride] = q1;

}

//vp8_loop_filter_simple_bh
function vp8_loop_filter_bhs_c(y, y_ptr, y_stride, blimit) {
    vp8_loop_filter_simple_horizontal_edge_c(y, y_ptr + 4 * y_stride, y_stride, blimit);
    vp8_loop_filter_simple_horizontal_edge_c(y, y_ptr + 8 * y_stride, y_stride, blimit);
    vp8_loop_filter_simple_horizontal_edge_c(y, y_ptr + 12 * y_stride, y_stride, blimit);
}

//vp8_loop_filter_mbh_c

function vp8_loop_filter_simple_horizontal_edge_c(src, src_off, stride, filter_limit) {
    var i = 0;

    for (i = 0; i < 16; i++) {
        if (simple_threshold(src, src_off, stride, filter_limit) === 1)
            vp8_filter(src, src_off, stride, 1);

        src_off += 1;
    }
}

function simple_threshold(pixels, pixels_off, stride, filter_limit) {
    var p1 = pixels[pixels_off - (stride << 1)];
    var p0 = pixels[pixels_off - stride];
    var q0 = pixels[pixels_off];
    var q1 = pixels[pixels_off + stride];

    return (((abs(p0 - q0) << 1) + (abs(p1 - q1) >> 1)) <= filter_limit) | 0;
}

function vp8_loop_filter_bvs_c(y, y_off, stride, b_limit) {
    vp8_loop_filter_simple_vertical_edge_c(y, y_off + 4, stride, b_limit);
    vp8_loop_filter_simple_vertical_edge_c(y, y_off + 8, stride, b_limit);
    vp8_loop_filter_simple_vertical_edge_c(y, y_off + 12, stride, b_limit);
}

function vp8_loop_filter_simple_vertical_edge_c(src, src_off, stride, filter_limit) {
    var i = 0;

    for (i = 0; i < 16; i++) {
        if (simple_threshold(src, src_off, 1, filter_limit))
            vp8_filter(src, src_off, 1, 1);

        src_off += stride;
    }
}
/*
 function vp8_loop_filter_simple_horizontal_edge_c(src, src_off, stride, filter_limit) {
 
 var i = 0;
 
 for (i = 0; i < 16; i++) {
 if (simple_threshold(src, src_off, 1, filter_limit))
 vp8_filter(src, src_off, 1, 1);
 
 src_off += stride;
 
 }
 
 }
 */

function vp8_loop_filter_mbv(y, y_off, u_off, v_off, stride, uv_stride, edge_limit, interior_limit, hev_threshold) {
    //vp8_loop_filter_mbv
    filter_mb_v_edge(y, y_off, stride, edge_limit + 2,
            interior_limit, hev_threshold, 2);
    filter_mb_v_edge(y, u_off, uv_stride, edge_limit + 2,
            interior_limit, hev_threshold, 1);
    filter_mb_v_edge(y, v_off, uv_stride, edge_limit + 2,
            interior_limit, hev_threshold, 1);
}

function filter_mb_v_edge(src,
        src_off,
        stride,
        edge_limit,
        interior_limit,
        hev_threshold,
        size) {
    var i = 0;

    var length = size << 3;
    for (i = 0; i < length; i++) {
        if (normal_threshold(src, src_off, 1, edge_limit, interior_limit)) {
            if (high_edge_variance(src, src_off, 1, hev_threshold))
                vp8_filter(src, src_off, 1, 1);
            else
                filter_mb_edge(src, src_off, 1);
        }

        src_off += stride;
    }
}


function normal_threshold(pixels, pixels_off, stride, edge_limit, interior_limit) {
    var p3 = pixels[pixels_off - 4 * stride];
    var p2 = pixels[pixels_off - 3 * stride];
    var p1 = pixels[pixels_off - 2 * stride];
    var p0 = pixels[pixels_off - stride];
    var q0 = pixels[pixels_off];
    var q1 = pixels[pixels_off + stride];
    var q2 = pixels[pixels_off + 2 * stride];
    var q3 = pixels[pixels_off + 3 * stride];

    var E = edge_limit;
    var I = interior_limit;

    return simple_threshold(pixels, pixels_off, stride, 2 * E + I)
            && abs(p3 - p2) <= I && abs(p2 - p1) <= I
            && abs(p1 - p0) <= I && abs(q3 - q2) <= I
            && abs(q2 - q1) <= I && abs(q1 - q0) <= I;
}


//vp8_mbfilter
function filter_mb_edge(pixels, pixels_off, stride) {
//var p3 = pixels[pixels_off -4*stride];
    var stride2 = stride << 1;
    var stride3 = 3 * stride;

    var p2 = pixels[pixels_off - stride3];
    var p1 = pixels[pixels_off - stride2];
    var p0 = pixels[pixels_off - stride];
    var q0 = pixels[pixels_off];
    var q1 = pixels[pixels_off + stride];
    var q2 = pixels[pixels_off + stride2];
    var w = 0, a = 0;

    w = saturate_int8(saturate_int8(p1 - q1) + 3 * (q0 - p0));

    a = (27 * w + 63) >> 7;
    p0 = saturate_uint8(p0 + a);
    q0 = saturate_uint8(q0 - a);

    a = (18 * w + 63) >> 7;
    p1 = saturate_uint8(p1 + a);
    q1 = saturate_uint8(q1 - a);

    a = (9 * w + 63) >> 7;
    p2 = saturate_uint8(p2 + a);
    q2 = saturate_uint8(q2 - a);

    pixels[pixels_off - stride3] = p2;
    pixels[pixels_off - stride2] = p1;
    pixels[pixels_off - stride] = p0;
    pixels[pixels_off] = q0;
    pixels[pixels_off + stride] = q1;
    pixels[pixels_off + stride2] = q2;

}


function high_edge_variance(pixels, pixels_off, stride, hev_threshold) {

    var p1 = pixels[pixels_off - 2 * stride];
    var p0 = pixels[pixels_off - stride];
    var q0 = pixels[pixels_off];
    var q1 = pixels[pixels_off + stride];

    return abs(p1 - p0) > hev_threshold || abs(q1 - q0) > hev_threshold;
}

function vp8_loop_filter_bv_c(y, y_off, u_off, v_off, stride, uv_stride, edge_limit, interior_limit, hev_threshold) {
    var dat = y;
    filter_subblock_v_edge(y, y_off + 4, stride, edge_limit,
            interior_limit, hev_threshold, 2);

    filter_subblock_v_edge(dat, y_off + 8, stride, edge_limit,
            interior_limit, hev_threshold, 2);

    filter_subblock_v_edge(dat, y_off + 12, stride, edge_limit,
            interior_limit, hev_threshold, 2);

    filter_subblock_v_edge(dat, u_off + 4, uv_stride, edge_limit,
            interior_limit, hev_threshold, 1);

    filter_subblock_v_edge(dat, v_off + 4, uv_stride, edge_limit,
            interior_limit, hev_threshold, 1);
}


function filter_subblock_v_edge(src, src_off, stride, edge_limit, interior_limit, hev_threshold, size) {
    var i = 0;
    var limit = 8 * size;
    for (i = 0; i < limit; i++) {

        if (normal_threshold(src, src_off, 1, edge_limit, interior_limit))
            //  console.warn(i + ":" +  edge_limit + ":" + interior_limit + ":" + hev_threshold);
            vp8_filter(src, src_off, 1,
                    high_edge_variance(src, src_off, 1, hev_threshold));


        src_off += stride;
    }


}

module.exports = {};
module.exports.vp8_filter = vp8_filter;
module.exports.vp8_loop_filter_bhs_c = vp8_loop_filter_bhs_c;
module.exports.vp8_loop_filter_bvs_c = vp8_loop_filter_bvs_c;
module.exports.vp8_loop_filter_simple_horizontal_edge_c = vp8_loop_filter_simple_horizontal_edge_c;
module.exports.vp8_loop_filter_simple_vertical_edge_c = vp8_loop_filter_simple_vertical_edge_c;
module.exports.vp8_loop_filter_mbv = vp8_loop_filter_mbv;
module.exports.vp8_loop_filter_bv_c = vp8_loop_filter_bv_c;