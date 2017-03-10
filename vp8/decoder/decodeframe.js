'use strict';
var vp8_loopfilter = require('../common/vp8_loopfilter');
var vp8_loop_filter_row_simple = vp8_loopfilter.vp8_loop_filter_row_simple;
var vp8_loop_filter_row_normal = vp8_loopfilter.vp8_loop_filter_row_normal;

var detokenize = require('../decoder/detokenize');
var decode_mb_tokens = detokenize.decode_mb_tokens;
var vp8_reset_mb_tokens_context = detokenize.vp8_reset_mb_tokens_context;

var bitreader = require('../../vpx_dsp/bitreader.js');
var vpx_read = bitreader.vpx_read;
var vpx_read_bit = bitreader.vpx_read_bit;

var entropymv = require('../common/entropymv.js');
var vp8_default_mv_context = entropymv.vp8_default_mv_context;


var entropy = require('../common/entropy.js');
var vp8_default_coef_probs = entropy.vp8_default_coef_probs;

var quant_common = require('../common/quant_common.js');
var vp8_dc_quant = quant_common.vp8_dc_quant;
var vp8_dc2quant = quant_common.vp8_dc2quant;
var vp8_dc_uv_quant = quant_common.vp8_dc_uv_quant;
var vp8_ac_yquant = quant_common.vp8_ac_yquant;
var vp8_ac2quant = quant_common.vp8_ac2quant;
var vp8_ac_uv_quant = quant_common.vp8_ac_uv_quant;

var reconinter = require('../common/reconinter.js');
var vp8_build_inter_predictors_mb = reconinter.vp8_build_inter_predictors_mb;

var reconintra = require('../common/reconintra.js');
var predict_intra_chroma = reconintra.predict_intra_chroma;
var predict_intra_luma = reconintra.predict_intra_luma;

var dboolhuff = require('./dboolhuff.js');
var vp8dx_start_decode = dboolhuff.vp8dx_start_decode;

var decodemv = require("./decodemv.js");
var vp8_decode_mode_mvs = decodemv.vp8_decode_mode_mvs;

var entropymode = require('../common/entropymode.js');
var vp8_init_mbmode_probs = entropymode.vp8_init_mbmode_probs;

var vpx_image = require('../../vpx/vpx_image.js');
var vpx_img_set_rect = vpx_image.vpx_img_set_rect;
var img_alloc_helper = vpx_image.img_alloc_helper;

var filter = require('../common/filter.js');
var vp8_sub_pel_filters = filter.vp8_sub_pel_filters;
var vp8_bilinear_filters = filter.vp8_bilinear_filters;

var c_utils = require('../../util/c_utils.js');
var copy_entropy_values = c_utils.copy_entropy_values;
var memset = c_utils.memset;
var memset_32 = c_utils.memset_32;

var filter_gpu = require('../common/filter_gpu.js');
var using_gpu = false;
var gpujs = require('../../libs/gpu.js');
var gpu;

var FRAME_HEADER_SZ = 3;
var KEYFRAME_HEADER_SZ = 7;

var CURRENT_FRAME = 0;
var LAST_FRAME = 1;
var GOLDEN_FRAME = 2;
var ALTREF_FRAME = 3;
var NUM_REF_FRAMES = 4;

var MAX_MB_SEGMENTS = 4;

var TOKEN_BLOCK_Y1 = 0;
var TOKEN_BLOCK_UV = 1;
var TOKEN_BLOCK_Y2 = 2;

var VPX_PLANE_PACKED = 0;
var VPX_PLANE_Y = 0;
var VPX_PLANE_U = 1;
var VPX_PLANE_V = 2;
var VPX_PLANE_ALPHA = 3;
var PLANE_PACKED = VPX_PLANE_PACKED;
var PLANE_Y = VPX_PLANE_Y;
var PLANE_U = VPX_PLANE_U;
var PLANE_V = VPX_PLANE_V;

var CURRENT_FRAME = 0;
var LAST_FRAME = 1;
var GOLDEN_FRAME = 2;
var ALTREF_FRAME = 3;
var NUM_REF_FRAMES = 4;

var BORDER_PIXELS = 16;

var MV_PROB_CNT = 19;

var VPX_IMG_FMT_I420 = 258;

var VPX_PLANE_PACKED = 0;
var VPX_PLANE_Y = 0;
var VPX_PLANE_U = 1;
var VPX_PLANE_V = 2;
var VPX_PLANE_ALPHA = 3;
var PLANE_PACKED = VPX_PLANE_PACKED;
var PLANE_Y = VPX_PLANE_Y;
var PLANE_U = VPX_PLANE_U;
var PLANE_V = VPX_PLANE_V;
var PLANE_ALPHA = VPX_PLANE_ALPHA;

var DC_PRED = 0;
var B_PRED = 4;

var CURRENT_FRAME = 0;

var MB_FEATURE_TREE_PROBS = 3;
var MAX_MB_SEGMENTS = 4;

var FRAME_HEADER_SZ = 3;
var KEYFRAME_HEADER_SZ = 7;


if (typeof document !== 'undefined') {
    var canvasEl = document.createElement('canvas'); //create the canvas object
    if (!canvasEl.getContext) //if the method is not supported, i.e canvas is not supported
    {
        console.warn("No GPU support");

    } else {

        
        using_gpu = true;
        gpu = new gpujs();

    }
}

/*
 * was dequant_init
 * @param {type} factors
 * @param {type} seg
 * @param {type} common
 * @returns {undefined}
 */
function vp8cx_init_de_quantizer(factors, seg, common) {
    var i = 0;
    var q = 0;
    var dqf = factors;
    var factor;

    var length = 1;
    if (seg.enabled === 1) {
        length = MAX_MB_SEGMENTS;
    }

    for (i = 0; i < length; i++) {
        q = common.mbmi_qindex;

        if (seg.enabled === 1)
            q = (!seg.abs) ? q + seg.quant_idx[i] : seg.quant_idx[i];

        factor = dqf[i].factor;

        if (dqf[i].quant_idx !== q || common.delta_update) {
            factor[TOKEN_BLOCK_Y1][0] = vp8_dc_quant(q, common.y1dc_delta_q);
            factor[TOKEN_BLOCK_Y2][0] = vp8_dc2quant(q, common.y2dc_delta_q);
            factor[TOKEN_BLOCK_UV][0] = vp8_dc_uv_quant(q, common.uvdc_delta_q);
            factor[TOKEN_BLOCK_Y1][1] = vp8_ac_yquant(q);
            factor[TOKEN_BLOCK_Y2][1] = vp8_ac2quant(q, common.y2ac_delta_q);
            factor[TOKEN_BLOCK_UV][1] = vp8_ac_uv_quant(q, common.uvac_delta_q);


            dqf[i].quant_idx = q;
        }
    }
}


var img = {//img_index litteral
    y: null,
    u: null,
    v: null,
    data_32: null,
    y_off: 0,
    u_off: 0,
    v_off: 0,
    stride: 0,
    uv_stride: 0
};

var recon_above_off = new Uint32Array([0, 0, 0]);
var recon_left_off = new Uint32Array([0, 0, 0]);

function decode_mb_rows(ctx) {

    var mb_idx = 0;
    var pc = ctx.common; // change this later




    //var img = ctx.ref_frames[CURRENT_FRAME].img; //INTRA_FRAME
    var yv12_fb_new = ctx.ref_frames[CURRENT_FRAME].img;// cache reference
    img.stride = yv12_fb_new.stride[PLANE_Y];
    img.uv_stride = yv12_fb_new.stride[PLANE_U];
    img.y = img.v = img.u = yv12_fb_new.img_data;
    img.data_32 = yv12_fb_new.img_data.data_32;


    var mb_rows = ctx.mb_rows;
    var mb_cols = ctx.mb_cols;

    var recon_y_stride = yv12_fb_new.stride;
    var recon_uv_stride = yv12_fb_new.uv_stride;

    //vp8_setup_intra_recon(img.y, img.y_off, img.u_off, img.v_off, img.stride, img.uv_stride);
    //vp8_setup_intra_recon_top_line(yv12_fb_new);


    for (var row = 0, partition = 0; row < mb_rows; row++) {


        var mbi;
        var mbi_off = 0;
        var col = 0;
        var coeffs = 0;
        var coeffs_off = 0;



        img.y_off = yv12_fb_new.planes_off[PLANE_Y];
        img.u_off = yv12_fb_new.planes_off[PLANE_U];
        img.v_off = yv12_fb_new.planes_off[PLANE_V];



        img.y_off += (img.stride * row) << 4;
        img.u_off += (img.uv_stride * row) << 3;
        img.v_off += (img.uv_stride * row) << 3;
        mbi = ctx.mb_info_rows; //[1 + row];
        mbi_off = (ctx.mb_info_rows_off[1 + row]);
        //coeffs = ctx.tokens[row & (ctx.token_hdr.partitions - 1)].coeffs;
        coeffs = ctx.tokens[row & (ctx.token_hdr.partitions - 1)].coeffs;
        
        //if (ctx.tokens[row & (ctx.token_hdr.partitions - 1)].coeffs === null) {
            //console.warn(ctx.tokens);
            
        //}



        recon_above_off[0] = img.y_off;
        recon_above_off[1] = img.u_off;
        recon_above_off[2] = img.v_off;


        recon_left_off[0] = recon_above_off[0] - 1;
        recon_left_off[1] = recon_above_off[1] - 1;
        recon_left_off[2] = recon_above_off[2] - 1;


        // Fix up the out-of-frame pixels

        var mbi_cache = mbi[mbi_off];


        fixup_left(img.y, img.y_off, 16, img.stride, row, mbi_cache.mbmi.y_mode);
        fixup_left(img.u, img.u_off, 8, img.uv_stride, row, mbi_cache.mbmi.uv_mode);
        fixup_left(img.v, img.v_off, 8, img.uv_stride, row, mbi_cache.mbmi.uv_mode);
        //doesnt seem to do anything
        //if (row === 0)
        //  img.y[img.y_off - img.stride - 1]= 127;
        //console.warn(img.y_off - img.stride - 1);

        //vp8_setup_intra_recon(img.y, img.y_off, img.u_off, img.v_off, img.stride, img.uv_stride);


        //probably line 485
        for (col = 0; col < mb_cols; col++) {
            //if (col > 0) {




            if (row === 0) {
                //vp8_setup_intra_recon_top_line

                fixup_above(img.y, img.y_off, 16, img.stride, col, mbi[mbi_off].mbmi.y_mode);
                fixup_above(img.u, img.u_off, 8, img.uv_stride, col,
                        mbi[mbi_off].mbmi.uv_mode);
                fixup_above(img.v, img.v_off, 8, img.uv_stride, col,
                        mbi[mbi_off].mbmi.uv_mode);

            }

            //swap these two
            decode_macroblock(ctx, partition, row, col, img, mbi_cache, coeffs, coeffs_off);



            mbi_off++;
            img.y_off += 16;
            img.u_off += 8;
            img.v_off += 8;
            coeffs_off += 400;



        }

        //decode frame line 605
        if (ctx.common.level && row) {
            if (ctx.common.filter_type)
                vp8_loop_filter_row_simple(ctx, row - 1);
            else
                vp8_loop_filter_row_normal(ctx, row - 1, 0, ctx.mb_cols);

        }

        if (col === ctx.mb_cols) {

            var extend = img.y;
            var extend_off = (img.y_off + 15 * img.stride);//(uint32_t *)
            var val = img.y[img.y_off - 1 + 15 * img.stride];//0x01010101 * 
            extend[extend_off] = extend[extend_off + 1] = extend[extend_off + 2] = extend[extend_off + 3] = val;
        }


        if (++partition === ctx.token_hdr.partitions)
            partition = 0;
    }

    if (ctx.common.level) {
        if (ctx.common.filter_type)
            vp8_loop_filter_row_simple(ctx, row - 1);
        else
            vp8_loop_filter_row_normal(ctx, row - 1, 0, ctx.mb_cols);
    }
   

    var render = gpu.createKernel(function (img_buffer) {        
        //return img_buffer[this.thread.x];
    }).dimensions([img.y.length]).outputToTexture(true);
    
    
    var chain = gpu.createKernel(function (A) {
        return A[this.thread.x];
    }).dimensions([img.y.length]);

    var temp_gpu = render(img.y);
    var temp_gpu_chained = chain(temp_gpu);
    //this_frame_mbmi = temp_gpu;//Uint8Array.from(render(temp_gpu));
    img.y = Uint8Array.from(temp_gpu_chained);
    img.y = new Uint32Array(img.y.buffer);
    //output = Uint8Array.from(render(output));


}

function fixup_left(predict, predict_off, width, stride, row, mode) {
    //The left column of out-of-frame pixels is taken to be 129,
    // unless we're doing DC_PRED, in which case we duplicate the
    // above row, unless this is also row 0, in which case we use
    // 129.
    //

    var left = predict;
    var left_off = (predict_off - 1);
    var i = 0;

    if (mode === DC_PRED && row)
    {

        var above = predict;
        var above_off = predict_off - stride;//*

        for (i = 0; i < width; i++)
        {
            left[left_off] = above[above_off + i];//*
            left_off += stride;
        }
    } else
    {

        left_off -= stride;

        for (i = -1; i < width; i++)
        {
            left[left_off] = 129;//*
            left_off += stride;
        }
        // }
    }
}

function fixup_above(predict, predict_off, width, stride, col, mode) {
    // The above row of out-of-frame pixels is taken to be 127,
    // unless we're doing DC_PRED, in which case we duplicate the
    // left col, unless this is also col 0, in which case we use
    // 127.
    //
    var above = predict;
    var above_off = predict_off - stride;//*
    var i = 0;

    //maybe yv12_extend_frame_top_c
    if (mode === DC_PRED && col)
    {
        var left = predict;
        var left_off = predict_off - 1;//*

        for (i = 0; i < width; i++)
        {
            above[above_off + i] = left[left_off];//*
            left_off += stride;
        }
    } else
        /* Need to re-set the left col, in case the last MB was
         * DC_PRED.
         */
        memset(above, above_off - 1, 127, width + 1);

    memset_32(above, above_off + width, 127, 4); // for above-right subblock modes

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

var coeff_clear = new Uint8Array(400);
function decode_macroblock(ctx, partition, row, start_col, img, xd, coeffs, coeffs_off) {

    var tokens = ctx.tokens[partition];
    var coeffs = tokens.coeffs;
    var coeffs_off = 0;
    var col = 0;
    var above = ctx.above_token_entropy_ctx;
    var above_off = +start_col;
    var left = tokens.left_token_entropy_ctx;
    var left_off = 0;
    var mbi = ctx.mb_info_rows;
    var mbi_off = ctx.mb_info_rows_off[1 + row] + start_col;


    if (start_col === 0)
        reset_row_context(left);

    var mbi_cache = mbi[mbi_off];
    var mbmi_cache = mbi_cache.mbmi;

 
    //wtf why!?!?!?!
    /*
    if (coeffs === null) {
        //throw "coeff data missing";
        console.warn("Missing partition " + partition + " : " + ctx.token_hdr.partitions);
        coeffs = new Uint32Array(ctx.mb_cols * 400);
        //coeffs.data_64 = new Float64Array(coeffs.buffer);
    } else {
        var copy_dest = coeffs.data_64;
        copy_dest.set(coeff_clear);
    }
    */
    var copy_dest = coeffs.data_64;
      //  copy_dest.set(coeff_clear);
           //coeffs.set(coeff_clear); 
    //var copy_dest = coeffs.data_64;
            //copy_dest.set(coeff_clear);
    //memset(coeffs, coeffs_off, 0, 400);

    for (var c = 0; c < 200; c++) {
        copy_dest[c] = 0;
    }



    if (mbmi_cache.mb_skip_coeff === 1) {
        //vp8_reset_mb_tokens_context
        vp8_reset_mb_tokens_context(left, above[above_off], mbmi_cache.y_mode);
        mbmi_cache.eob_mask = 0;

    } else {


        var dqf;
        var dqf_off = 0;

        dqf = ctx.dequant_factors;
        dqf_off = +mbmi_cache.segment_id;

        //vp8_decode_mb_tokens
        mbmi_cache.eob_mask =
                decode_mb_tokens(tokens.bool,
                        left, above[above_off],
                        coeffs, coeffs_off,
                        mbmi_cache.y_mode,
                        ctx.common.entropy_hdr.coeff_probs,
                        dqf[dqf_off].factor);

    }


    if (mbmi_cache.y_mode <= B_PRED) {
        predict_intra_chroma(img.u, img.u_off, img.v, img.v_off, img.uv_stride, mbi_cache,
                coeffs, coeffs_off);
        predict_intra_luma(img.y, img.y_off, img.stride, mbi_cache, coeffs, coeffs_off);

    } else {

        vp8_build_inter_predictors_mb(ctx, img, coeffs, coeffs_off, mbi_cache, start_col, row);
    }



}

var left_reset = new Int32Array(9);
function reset_row_context(left) {
    //console.warn(left.length);
    left.set(left_reset);
    //var i = left.length;
    //while (i--)
      //  left[i] = 0;
}




function setup_token_decoder(hdr, data, ptr, sz) {
    var partition_change = 0;
    var i = 0;
    var decoder = hdr.decoder;
    var bool = decoder.boolDecoder;
    var partitions = 1 << bool.get_uint(2);
    //console.warn("New partitions : " + partitions);
    if(hdr.partitions !== partitions)
        partition_change = 1;
    
    hdr.partitions  = partitions;
    //var partitions = hdr.partitions;//cache 

    if (sz < 3 * (partitions - 1))
        throw "Truncated packet found parsing partition lenghts";

    sz -= 3 * (partitions - 1);

    for (i = 0; i < partitions; i++) {
        if (i < partitions - 1) {
            hdr.partition_sz[i] = (data[ptr + 2] << 16)
                    | (data[ptr + 1] << 8) | data[ptr];
            ptr += 3;
        } else
            hdr.partition_sz[i] = sz;

        if (sz < hdr.partition_sz[i])
            throw  "Truncated partition";

        sz -= hdr.partition_sz[i];
    }


    for (i = 0; i < partitions; i++) {

        vp8dx_start_decode(decoder.tokens[i].bool, data, ptr, hdr.partition_sz[i]);
        ptr += hdr.partition_sz[i];
    }
    return partition_change;
}


function vp8_dixie_release_ref_frame(rcimg) {
    if (rcimg) {
        if (rcimg.ref_cnt === 0)
            throw "ERROR :(";
        rcimg.ref_cnt--;
    }
}


function vpx_img_free(img) {
    if (img)
    {
        if (img.img_data && img.img_data_owner)
            img.img_data = null;

        if (img.self_allocd)
            img = null;
    }
}

function vp8_dixie_find_free_ref_frame(frames) {
    var i = 0;

    for (i = 0; i < NUM_REF_FRAMES; i++)
        if (frames[i].ref_cnt === 0) {
            frames[i].ref_cnt = 1;
            return frames[i];
        }

    return null;
}

function init_frame(pbi) {
    var pc = pbi.common;
    var xd = pbi.segment_hdr;

    var to = pc.entropy_hdr.mv_probs;

    if (pc.is_keyframe === true) {

        //for (var i = 0; i < MV_PROB_CNT; i++)
          //  to[0][i] = vp8_default_mv_context[0][i];
        
        to[0].set(vp8_default_mv_context[0]);
        to[1].set(vp8_default_mv_context[1]);

        //for (var i = 0; i < MV_PROB_CNT; i++)
          //  to[1][i] = vp8_default_mv_context[1][i];

        vp8_init_mbmode_probs(pc);
        vp8_default_coef_probs(pc);


    } else {

    }


}

function vp8_decode_frame(data, decoder) {

    var bc = decoder.boolDecoder;
    var pc = decoder.common;
    var xd = decoder.segment_hdr;

    var sz = data.byteLength;


    var first_partition_length_in_bytes = 0;

    var res;
    decoder.common.saved_entropy_valid = 0;



    var clear0 = data[0];
    pc.is_keyframe = !(clear0 & 0x01);
    pc.version = (clear0 >> 1) & 7;
    pc.show_frame = (clear0 >> 4) & 1;
    first_partition_length_in_bytes = (clear0 | (data[1] << 8) | (data[2] << 16)) >> 5;

    if (sz <= first_partition_length_in_bytes + (pc.is_keyframe ? 10 : 3))
        return -1;//VPX_CODEC_CORRUPT_FRAME;


    pc.frame_size_updated = 0;

    if (pc.is_keyframe === true) {


        var w = pc.Width;
        var h = pc.Height;
        var scale_h = pc.vert_scale;
        var scale_w = pc.horiz_scale;

        if (data[3] !== 0x9d || data[4] !== 0x01 || data[5] !== 0x2a)
            return -1;//VPX_CODEC_UNSUP_BITSTREAM;

        var data7 = data[7];

        pc.Width = ((data[6] | (data7 << 8)) & 0x3fff);
        pc.horiz_scale = data7 >> 6;
        pc.Height = ((data[8] | (data[9] << 8)) & 0x3fff);
        pc.vert_scale = data[9] >> 6;


        if (w !== pc.Width || h !== pc.Height
                || scale_h !== pc.vert_scale
                || scale_w !== pc.horiz_scale) {
            pc.frame_size_updated = 1;
        }



    }





    //now calculate how many macroblock rows and columns
    data.ptr += FRAME_HEADER_SZ;
    sz -= FRAME_HEADER_SZ;

    if (pc.is_keyframe === true) {
        data.ptr += KEYFRAME_HEADER_SZ;
        sz -= KEYFRAME_HEADER_SZ;
        decoder.mb_cols = ((pc.Width + 15) >> 4) | 0;
        decoder.mb_rows = ((pc.Height + 15) >> 4) | 0;

    }


    // bc.init(data, data.ptr, decoder.common.part0_sz);
    vp8dx_start_decode(bc, data, data.ptr, first_partition_length_in_bytes);

    if (pc.is_keyframe) {
        bc.get_uint(2);//skip bits for now

    }



    //START Decode segment hdr
    init_frame(decoder);

    xd.enabled = vpx_read_bit(bc);

    if (xd.enabled === 1) {
        var i = 0;

        xd.update_map = vpx_read_bit(bc);
        xd.update_data = vpx_read_bit(bc);

        if (xd.update_data === 1) {
            xd.abs = vpx_read_bit(bc);

            for (i = 0; i < MAX_MB_SEGMENTS; i++)
                xd.quant_idx[i] = bc.maybe_get_int(7);

            for (i = 0; i < MAX_MB_SEGMENTS; i++)
                xd.lf_level[i] = bc.maybe_get_int(6);
        }

        if (xd.update_map === 1) {
            for (i = 0; i < MB_FEATURE_TREE_PROBS; i++) {
                if (vpx_read_bit(bc) === 1) {
                    xd.tree_probs[i] = bc.get_uint(8);
                } else {
                    xd.tree_probs[i] = 255;
                }
            }
        }
    } else {
        xd.update_map = 0;
        xd.update_data = 0;
    }
    //end decode segment header



    //pc.decode(decoder.boolDecoder);
    if (pc.is_keyframe === true) {

        pc.filter_type = 0;
        pc.level = 0;
        pc.sharpness = 0;
        pc.delta_enabled = 0;

        pc.ref_delta[0] = 0;
        pc.ref_delta[1] = 0;
        pc.ref_delta[2] = 0;
        pc.ref_delta[3] = 0;

        pc.mode_delta[0] = 0;
        pc.mode_delta[1] = 0;
        pc.mode_delta[2] = 0;
        pc.mode_delta[3] = 0;
    }


    pc.filter_type = vpx_read_bit(bc);
    pc.level = bc.get_uint(6);
    pc.sharpness = bc.get_uint(3);
    pc.delta_enabled = vpx_read_bit(bc);

    var ref_delta = pc.ref_delta;

    if (pc.delta_enabled === 1 && vpx_read_bit(bc) === 1) {

        ref_delta[0] = bc.maybe_get_int(6);
        ref_delta[1] = bc.maybe_get_int(6);
        ref_delta[2] = bc.maybe_get_int(6);
        ref_delta[3] = bc.maybe_get_int(6);

        pc.mode_delta[0] = bc.maybe_get_int(6);
        pc.mode_delta[1] = bc.maybe_get_int(6);
        pc.mode_delta[2] = bc.maybe_get_int(6);
        pc.mode_delta[3] = bc.maybe_get_int(6);

    }



    var partition_change = setup_token_decoder(decoder.token_hdr, data, data.ptr + first_partition_length_in_bytes,
            sz - first_partition_length_in_bytes);




    var q_update = 0;
    var last_q = pc.mbmi_qindex;

    pc.mbmi_qindex = bc.get_uint(7);
    q_update = (last_q !== pc.mbmi_qindex) + 0;
    q_update |= (pc.y1dc_delta_q = bc.maybe_get_int(4));
    q_update |= (pc.y2dc_delta_q = bc.maybe_get_int(4));
    q_update |= (pc.y2ac_delta_q = bc.maybe_get_int(4));
    q_update |= (pc.uvdc_delta_q = bc.maybe_get_int(4));
    q_update |= (pc.uvac_delta_q = bc.maybe_get_int(4));
    pc.delta_update = q_update;




    //Reference Header

    var key = pc.is_keyframe;

    if (key === true) {
        pc.refresh_gf = 1;
        pc.refresh_arf = 1;
        pc.copy_gf = 0;
        pc.copy_arf = 0;
        pc.sign_bias[GOLDEN_FRAME] = 0;
        pc.sign_bias[ALTREF_FRAME] = 0;
    } else {
        pc.refresh_gf = vpx_read_bit(bc);
        pc.refresh_arf = vpx_read_bit(bc);
        pc.copy_gf = !pc.refresh_gf
                ? bc.get_uint(2) : 0;
        pc.copy_arf = !pc.refresh_arf
                ? bc.get_uint(2) : 0;
        pc.sign_bias[GOLDEN_FRAME] = vpx_read_bit(bc);
        pc.sign_bias[ALTREF_FRAME] = vpx_read_bit(bc);
    }




    pc.refresh_entropy_probs = vpx_read_bit(bc);

    if (key === true) {
        pc.refresh_last = 1;
    } else {
        pc.refresh_last = vpx_read_bit(bc);
    }



    if (pc.refresh_entropy_probs === 0) {

        copy_entropy_values(pc.saved_entropy, pc.entropy_hdr);
        decoder.saved_entropy_valid = 1;

    }




    decoder.modemv_init();





    var ctx = decoder;
    var partitions = ctx.token_hdr.partitions;

    //PREDICT INIT
    var i = 0;
    var this_frame_mbmi = 0;
    var this_frame_mbmi_off = 0;
    var coeff_row_sz = ctx.mb_cols * 400;

    if (pc.frame_size_updated === 1) {
        //console.warn("Frame size updated");
        var i = 0;
        

        for (i = 0; i < partitions; i++) {
            //ctx.tokens[i].coeffs = new Uint32Array(coeff_row_sz);
            //ctx.tokens[i].coeffs.data_64 = new Float64Array(ctx.tokens[i].coeffs.buffer);
        }

        var mb_cols = ctx.mb_cols;
        //ENTROPY_CONTEXT_PLANES
        ctx.above_token_entropy_ctx = new Array(mb_cols);
        for ( i = 0; i < mb_cols; i++)
            ctx.above_token_entropy_ctx[i] = new Int32Array(9);

        var w = ((decoder.mb_cols << 4) + 32) | 0;
        var h = ((decoder.mb_rows << 4) + 32) | 0;

        for (i = 0; i < NUM_REF_FRAMES; i++) {

            vpx_img_free(decoder.frame_strg[i].img);
            decoder.frame_strg[i].ref_cnt = 0;
            decoder.ref_frames[i] = null;

            img_alloc_helper(decoder.frame_strg[i].img, VPX_IMG_FMT_I420, w, h, 16);

            vpx_img_set_rect(decoder.frame_strg[i].img, BORDER_PIXELS, BORDER_PIXELS,
                    decoder.common.Width, decoder.common.Height);

        }

        if (pc.version)
            decoder.subpixel_filters = vp8_bilinear_filters;
        else
            decoder.subpixel_filters = vp8_sub_pel_filters;

    }
    
    if(pc.frame_size_updated === 1 || partition_change === 1){
        //console.log("Partition changing : " + partitions);
        for (i = 0; i < partitions; i++) {
            ctx.tokens[i].coeffs = new Uint32Array(coeff_row_sz);
            ctx.tokens[i].coeffs.data_64 = new Float64Array(ctx.tokens[i].coeffs.buffer);
        }
    }




    var ref_frames = decoder.ref_frames;
    /* Find a free framebuffer to predict into */
    if (ref_frames[CURRENT_FRAME])
        vp8_dixie_release_ref_frame(ref_frames[CURRENT_FRAME]);

    ref_frames[CURRENT_FRAME] =
            vp8_dixie_find_free_ref_frame(decoder.frame_strg);

    this_frame_mbmi = ref_frames[CURRENT_FRAME].img.img_data;

    /* Calculate offsets to the other reference frames */

    for (i = 0; i < NUM_REF_FRAMES; i++) {
        var ref = ref_frames[i];

        if (ref) {
            decoder.ref_frame_offsets[i] = ref.img.img_data_off - this_frame_mbmi_off;
            decoder.ref_frame_offsets_[i] = ref.img.img_data;

        } else {
            decoder.ref_frame_offsets[i] = 0;
            decoder.ref_frame_offsets_[i] = this_frame_mbmi;

        }
    }

    //END PREDICT INIT
    vp8cx_init_de_quantizer(decoder.dequant_factors, xd, pc);

    var length = 1;
    if (xd.enabled === 1) {
        length = 4;
    }

    vp8_decode_mode_mvs(decoder, bc);


    var above = decoder.above_token_entropy_ctx;
    var mb_cols = decoder.mb_cols;
    for (var col = 0; col < mb_cols; ++col)
        memset(above[col], 0, 0, 9);

    decode_mb_rows(decoder);
    
    /*
    var out_img = ref_frames[CURRENT_FRAME].img.img_data;
    var render = gpu.createKernel(function (img_buffer) {
        
        return img_buffer[this.thread.x];
        
    }).dimensions([out_img.length]);
    
    var temp_gpu = render(ref_frames[CURRENT_FRAME].img.img_data);
    //this_frame_mbmi = temp_gpu;//Uint8Array.from(render(temp_gpu));
    ref_frames[CURRENT_FRAME].img.img_data = Uint8Array.from(temp_gpu);
    ref_frames[CURRENT_FRAME].img.img_data.data_32 = new Uint32Array(ref_frames[CURRENT_FRAME].img.img_data.buffer);
    //output = Uint8Array.from(render(output));
    
*/
    decoder.frame_cnt++;

    //UPDATE REFERENCES TO FRAMES AND STUFF
    if (decoder.saved_entropy_valid === 1) {
        //decoder.common.entropy_hdr.copyValues(decoder.common.saved_entropy);
        copy_entropy_values(pc.entropy_hdr, pc.saved_entropy);
        decoder.saved_entropy_valid = 0;
    }


    decoder.img_avail = decoder.common.show_frame;


}


module.exports = {};
module.exports.vp8cx_init_de_quantizer = vp8cx_init_de_quantizer;
module.exports.decode_mb_rows = decode_mb_rows;
module.exports.setup_token_decoder = setup_token_decoder;
module.exports.vp8_decode_frame = vp8_decode_frame;