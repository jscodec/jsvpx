'use strict';

var loopfilter_filters = require('./loopfilter_filters.js');
var vp8_filter = loopfilter_filters.vp8_filter;
var vp8_loop_filter_bhs_c = loopfilter_filters.vp8_loop_filter_bhs_c;
var vp8_loop_filter_simple_horizontal_edge_c = loopfilter_filters.vp8_loop_filter_simple_horizontal_edge_c;
var vp8_loop_filter_bvs_c = loopfilter_filters.vp8_loop_filter_bvs_c;
var vp8_loop_filter_simple_vertical_edge_c = loopfilter_filters.vp8_loop_filter_simple_vertical_edge_c;
var vp8_loop_filter_mbv = loopfilter_filters.vp8_loop_filter_mbv;
var vp8_loop_filter_bv_c = loopfilter_filters.vp8_loop_filter_bv_c;

var CURRENT_FRAME = 0;

var VPX_PLANE_PACKED = 0;   /**< To be used for all packed formats */
var VPX_PLANE_Y = 0;   /**< Y (Luminance) plane */
var VPX_PLANE_U = 1;   /**< U (Chroma) plane */
var VPX_PLANE_V = 2;   /**< V (Chroma) plane */

var PLANE_Y = VPX_PLANE_Y;
var PLANE_U = VPX_PLANE_U;
var PLANE_V = VPX_PLANE_V;

var B_PRED = 4; /* block mbmid prediction, each block has its own prediction mode */
var NEARESTMV = 5;
var NEARMV = 6;
var ZEROMV = 7;
var NEWMV = 8;
var SPLITMV = 9;


var abs = Math.abs;

var min = Math.min;
var max = Math.max;

var edge_limit = new Int32Array([0]), interior_limit = new Int32Array([0]), hev_threshold = new Int32Array([0]);

function vp8_loop_filter_row_simple(ctx, row) {
    var y = 0;
    var y_off = 0;
    var stride = 0;
    var mbi;
    var mbi_off = 0;//='mb_info'
    var col = 0;

    /* Adjust pointers mbmid on row, start_col */
    stride = ctx.ref_frames[CURRENT_FRAME].img.stride[PLANE_Y];
    y = ctx.ref_frames[CURRENT_FRAME].img.img_data;
    y_off = ctx.ref_frames[CURRENT_FRAME].img.planes_off[PLANE_Y];
    y_off += (stride * row) << 4;


    mbi = ctx.mb_info_rows;
    mbi_off = ctx.mb_info_rows_off[1 + row];
    //console.log(mbi[mbi_off]);

    for (col = 0; col < ctx.mb_cols; col++) {


        // TODO: only need to recalculate every MB if segmentation is
        //  enabled.

        calculate_filter_parameters(ctx, mbi[mbi_off], edge_limit,
                interior_limit, hev_threshold);

        if (edge_limit[0]) {


            var filter_subblocks = (mbi[mbi_off].mbmi.eob_mask
                    || mbi[mbi_off].mbmi.y_mode == SPLITMV
                    || mbi[mbi_off].mbmi.y_mode == B_PRED) + 0;

            var mb_limit = (edge_limit[0] + 2) * 2 + interior_limit[0];
            var b_limit = edge_limit[0] * 2 + interior_limit[0];

            if (col > 0)
                vp8_loop_filter_simple_vertical_edge_c(y, y_off, stride, mb_limit);

            if (filter_subblocks)
            {
                //vp8_loop_filter_simple_bv vp8_loop_filter_bvs_c
                vp8_loop_filter_bvs_c(y, y_off, stride, b_limit);

                //filter_v_edge_simple(y, y_off + 4, stride, b_limit);
                //filter_v_edge_simple(y, y_off + 8, stride, b_limit);
                //filter_v_edge_simple(y, y_off + 12, stride, b_limit);

            }

            if (row > 0)
                vp8_loop_filter_simple_horizontal_edge_c(y, y_off, stride, mb_limit);

            if (filter_subblocks)
            {
                vp8_loop_filter_bhs_c(y, y_off, stride, b_limit);
            }

        }

        y_off += 16;
        mbi_off++;
    }

}
var edge_limit_cache = new Uint8Array([0]), interior_limit_cache = new Uint8Array([0]), hev_threshold_cache = new Uint8Array([0]);

function vp8_loop_filter_row_normal(ctx, row, start_col, num_cols) {

    var y = 0, u = 0, v = 0;
    var y_off = 0, u_off = 0, v_off = 0;
    var stride = 0, uv_stride = 0;
    var mbi;
    var mbi_off = 0;//='mb_info'
    var col = 0;

    /* Adjust pointers mbmid on row, start_col */
    var currentImg = ctx.ref_frames[CURRENT_FRAME].img;
    stride = currentImg.stride[PLANE_Y];
    y = u = v = currentImg.img_data;
    uv_stride = currentImg.stride[PLANE_U];
    y_off = currentImg.planes_off[PLANE_Y];
    u_off = currentImg.planes_off[PLANE_U];
    v_off = currentImg.planes_off[PLANE_V];
    y_off += (stride * row) * 16;
    u_off += (uv_stride * row) * 8;
    v_off += (uv_stride * row) * 8;
    mbi = ctx.mb_info_rows; //[1 + row];
    mbi_off = ctx.mb_info_rows_off[1 + row];


    for (col = 0; col < num_cols; col++)
    {
        //var edge_limit = [0], interior_limit = [0], hev_threshold = [0];
        var edge_limit = edge_limit_cache, interior_limit = interior_limit_cache, hev_threshold = hev_threshold_cache;
        // TODO: only need to recalculate every MB if segmentation is
        //  enabled.

        calculate_filter_parameters(ctx, mbi[mbi_off], edge_limit,
                interior_limit, hev_threshold);
        edge_limit = edge_limit[0], interior_limit = interior_limit[0], hev_threshold = hev_threshold[0];


        if (edge_limit)
        {
            if (col > 0)
                vp8_loop_filter_mbv(y, y_off, u_off, v_off, stride, uv_stride, edge_limit, interior_limit, hev_threshold);


            //vp8_loop_filter_bv_c
            if (mbi[mbi_off].mbmi.eob_mask
                    || mbi[mbi_off].mbmi.y_mode === SPLITMV
                    || mbi[mbi_off].mbmi.y_mode === B_PRED)
            {

                vp8_loop_filter_bv_c(y, y_off, u_off, v_off, stride, uv_stride, edge_limit, interior_limit, hev_threshold);

            }

            //vp8_loop_filter_bhs_c
            if (row > 0) {
                //vp8_loop_filter_simple_horizontal_edge_c
                filter_mb_h_edge(y, y_off, stride, edge_limit + 2,
                        interior_limit, hev_threshold, 2);
                filter_mb_h_edge(u, u_off, uv_stride, edge_limit + 2,
                        interior_limit, hev_threshold, 1);
                filter_mb_h_edge(v, v_off, uv_stride, edge_limit + 2,
                        interior_limit, hev_threshold, 1);
            }

            if (mbi[mbi_off].mbmi.eob_mask
                    || mbi[mbi_off].mbmi.y_mode === SPLITMV
                    || mbi[mbi_off].mbmi.y_mode === B_PRED)
            {
                filter_subblock_h_edge(y, y_off + 4 * stride, stride,
                        edge_limit, interior_limit,
                        hev_threshold, 2);
                filter_subblock_h_edge(y, y_off + 8 * stride, stride,
                        edge_limit, interior_limit,
                        hev_threshold, 2);
                filter_subblock_h_edge(y, y_off + 12 * stride, stride,
                        edge_limit, interior_limit,
                        hev_threshold, 2);
                filter_subblock_h_edge(u, u_off + 4 * uv_stride, uv_stride,
                        edge_limit, interior_limit,
                        hev_threshold, 1);
                filter_subblock_h_edge(v, v_off + 4 * uv_stride, uv_stride,
                        edge_limit, interior_limit,
                        hev_threshold, 1);
            }

        }

        y_off += 16;
        u_off += 8;
        v_off += 8;
        mbi_off++;
    }

}

function calculate_filter_parameters(ctx,
        mbi,
        edge_limit_,
        interior_limit_,
        hev_threshold_) {
    var filter_level = 0, interior_limit = 0, hev_threshold = 0;

    /* Reference code/spec seems to conflate filter_level and
     * edge_limit
     */

    filter_level = ctx.common.level;
    //console.warn(mbi);

    if (ctx.segment_hdr.enabled === 1)
    {
        if (!ctx.segment_hdr.abs)
            filter_level += ctx.segment_hdr.lf_level[mbi.mbmi.segment_id];
        else
            filter_level = ctx.segment_hdr.lf_level[mbi.mbmi.segment_id];
    }




    if (ctx.common.delta_enabled)
    {
        filter_level +=
                ctx.common.ref_delta[mbi.mbmi.ref_frame];

        if (mbi.mbmi.ref_frame === CURRENT_FRAME)
        {
            if (mbi.mbmi.y_mode === B_PRED)
                filter_level += ctx.common.mode_delta[0];
        } else if (mbi.mbmi.y_mode === ZEROMV)
            filter_level += ctx.common.mode_delta[1];
        else if (mbi.mbmi.y_mode === SPLITMV)
            filter_level += ctx.common.mode_delta[3];
        else
            filter_level += ctx.common.mode_delta[2];
    }

    if (filter_level > 63)
        filter_level = 63;
    else if (filter_level < 0)
        filter_level = 0;

    interior_limit = filter_level;

    if (ctx.common.sharpness)
    {
        interior_limit >>= ctx.common.sharpness > 4 ? 2 : 1;

        if (interior_limit > 9 - ctx.common.sharpness)
            interior_limit = 9 - ctx.common.sharpness;
    }





    if (interior_limit < 1)
        interior_limit = 1;

    if (filter_level >= 15) {
        hev_threshold = 1;
    } else {
        hev_threshold = 0;
    }

    if (filter_level >= 40)
        hev_threshold++;

    if (filter_level >= 20 && !ctx.common.is_keyframe)
        hev_threshold++;

    edge_limit_[0] = filter_level;
    interior_limit_[0] = interior_limit;
    hev_threshold_[0] = hev_threshold;

}

function saturate_int8(x) {
    /*
     if (x < -128)
     return -128 | 0;
     
     if (x > 127)
     return 127 | 0;
     */
    return min(max(x, -128), 127);
    // return x;
}

function saturate_uint8(x) {
    /*
     x = x|0;
     if (x < 0)
     return 0|0;
     
     if (x > 255)
     return 255|0;
     
     return x|0;
     */
    return min(max(x, 0), 255);
}

function high_edge_variance(pixels, pixels_off, stride, hev_threshold) {
    var p1 = pixels[pixels_off - 2 * stride];
    var p0 = pixels[pixels_off - stride];
    var q0 = pixels[pixels_off];
    var q1 = pixels[pixels_off + stride];


    return abs(p1 - p0) > hev_threshold || abs(q1 - q0) > hev_threshold;
}


function simple_threshold(pixels, pixels_off, stride, filter_limit) {
    var p1 = pixels[pixels_off - (stride << 1)];
    var p0 = pixels[pixels_off - stride];
    var q0 = pixels[pixels_off];
    var q1 = pixels[pixels_off + stride];

    return ((abs(p0 - q0) * 2 + (abs(p1 - q1) >> 1)) <= filter_limit) | 0;
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


function filter_mb_h_edge(src, src_off, stride,
        edge_limit, interior_limit, hev_threshold, size) {
    var i = 0;

    var length = size << 3;
    for (i = 0; i < length; i++) {
        if (normal_threshold(src, src_off, stride, edge_limit, interior_limit))
        {
            if (high_edge_variance(src, src_off, stride, hev_threshold))
                vp8_filter(src, src_off, stride, 1);
            else
                filter_mb_edge(src, src_off, stride);
        }

        src_off += 1;
    }
}

function filter_subblock_h_edge(src,
        src_off,
        stride,
        edge_limit,
        interior_limit,
        hev_threshold,
        size) {
    var i = 0;
    var length = size << 3;
    for (i = 0; i < length; i++) {
        if (normal_threshold(src, src_off, stride, edge_limit, interior_limit))
            vp8_filter(src, src_off, stride,
                    high_edge_variance(src, src_off, stride,
                            hev_threshold));

        src_off += 1;
    }
}


module.exports = {};
module.exports.vp8_loop_filter_row_normal = vp8_loop_filter_row_normal;
module.exports.vp8_loop_filter_row_simple = vp8_loop_filter_row_simple;