//Unit Tests
"use strict";
var assert = require('assert');
var readline = require('readline');
var vp8 = require('../vp8/decoder/onyxd_int.js');
//var onyxd_int =  require('../vp8/decoder/onyxd_int.js');

var ivf = require('flare-ivf');
var fs = require('fs');
var path = require('path');
var process = require("process");
var md5 = require('js-md5');


var decodemv = require("../vp8/decoder/decodemv.js");
var read_mb_features = decodemv.read_mb_features;
var decode_kf_mb_mode = decodemv.decode_kf_mb_mode;
var decode_mvs = decodemv.decode_mvs;
var vp8_decode_mode_mvs = decodemv.vp8_decode_mode_mvs;

var c_utils = require('../util/c_utils.js');
var copy_entropy_values = c_utils.copy_entropy_values;

var decodeframe = require('../vp8/decoder/decodeframe.js');
var decode_mb_rows = decodeframe.decode_mb_rows;
var setup_token_decoder = decodeframe.setup_token_decoder;

var bitreader = require('../vpx_dsp/bitreader.js');
var vpx_read = bitreader.vpx_read;
var vpx_read_bit = bitreader.vpx_read_bit;

var bitreader = require('../vpx_dsp/bitreader.js');
var vpx_read = bitreader.vpx_read;
var vpx_read_bit = bitreader.vpx_read_bit;

var default_coef_probs = require('../vp8/common/default_coef_probs.js');
var vp8_coef_update_probs = require('../vp8/common/coefupdateprobs.js');


var entropymv = require('../vp8/common/entropymv.js');
var vp8_mv_update_probs = entropymv.vp8_mv_update_probs;
var vp8_default_mv_context = entropymv.vp8_default_mv_context;

var entropymode = require('../vp8/common/entropymode.js');
var vp8_uv_mode_prob = entropymode.vp8_uv_mode_prob;
var vp8_bmode_prob = entropymode.vp8_bmode_prob;
var vp8_ymode_prob = entropymode.vp8_ymode_prob;

var dboolhuff = require('../vp8/decoder/dboolhuff.js');
var vp8dx_start_decode = dboolhuff.vp8dx_start_decode;

var decodeframe = require('../vp8/decoder/decodeframe.js');
var vp8cx_init_de_quantizer = decodeframe.vp8cx_init_de_quantizer;

var vpx_image = require('../vpx/vpx_image.js');
var vpx_img_set_rect = vpx_image.vpx_img_set_rect;
var img_alloc_helper = vpx_image.img_alloc_helper;

var filter = require('../vp8/common/filter.js');
var vp8_sub_pel_filters = filter.vp8_sub_pel_filters;
var vp8_bilinear_filters = filter.vp8_bilinear_filters;
var filter_block2d_first_pass = filter.filter_block2d_first_pass;
var filter_block2d_second_pass = filter.filter_block2d_second_pass;
var sixtap_2d = filter.sixtap_2d;
var filter_block = filter.filter_block;



var CURRENT_FRAME = 0;
var LAST_FRAME = 1;
var GOLDEN_FRAME = 2;
var ALTREF_FRAME = 3;
var NUM_REF_FRAMES = 4;

var BORDER_PIXELS = 16;

var BLOCK_TYPES = 4;
var PREV_COEF_CONTEXTS = 3;
var COEF_BANDS = 8;
var ENTROPY_NODES = 11;

var MV_PROB_CNT =19;

var VPX_IMG_FMT_I420 = 258;
var VPX_IMG_FMT_VPXI420 = 260;


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

var tmpFile = 'tmp.text';
var tmpPath = "tmp";

var CURRENT_FRAME = 0;
var LAST_FRAME = 1;
var GOLDEN_FRAME = 2;
var ALTREF_FRAME = 3;
var NUM_REF_FRAMES = 4;

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

var CURRENT_FRAME = 0;

var MB_FEATURE_TREE_PROBS = 3;
var MAX_MB_SEGMENTS = 4;

var vectorPath = 'vp8-test-vectors/';



var FRAME_HEADER_SZ = 3;
var KEYFRAME_HEADER_SZ = 7;
var MAX_PARTITIONS = 8;
var data;

var BLOCK_TYPES = 4;
var PREV_COEF_CONTEXTS = 3;
var COEF_BANDS = 8;
var ENTROPY_NODES = 11;

var CURRENT_FRAME = 0;
var LAST_FRAME = 1;
var GOLDEN_FRAME = 2;
var ALTREF_FRAME = 3;
var NUM_REF_FRAMES = 4;

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

function vp8_dixie_ref_frame(rcimg) {
    rcimg.ref_cnt++;
    return rcimg;
}

function pad(num, size) {
    var s = num + "";
    while (s.length < size)
        s = "0" + s;
    return s;
}


var _driver;

function decode_frame(i, valid, demuxer, decoder, basename) {


    it('decode frame : ' + i, function () {

        var data = new Uint8Array(demuxer.processFrame()); //frame data
        var sz = data.byteLength;
        var res;
        decoder.frame_hdr.saved_entropy_valid = 0;
        //if ((res = decoder.frame_hdr.parse(data, sz)))
        //  throw "Failed to parse frame header";

        var clear0 = data[0];
        decoder.frame_hdr.is_keyframe = !(clear0 & 0x01);
        decoder.frame_hdr.version = (clear0 >> 1) & 7;
        decoder.frame_hdr.is_shown = (clear0 >> 4) & 1;
        decoder.frame_hdr.part0_sz = (clear0 | (data[1] << 8) | (data[2] << 16)) >> 5;

        if (sz <= decoder.frame_hdr.part0_sz + (decoder.frame_hdr.is_keyframe ? 10 : 3))
            return VPX_CODEC_CORRUPT_FRAME;


        decoder.frame_hdr.frame_size_updated = 0;

        if (decoder.frame_hdr.is_keyframe === true) {


            var w = decoder.frame_hdr.kf.w;
            var h = decoder.frame_hdr.kf.h;
            var scale_h = decoder.frame_hdr.kf.scale_h;
            var scale_w = decoder.frame_hdr.kf.scale_w;

            if (data[3] !== 0x9d || data[4] !== 0x01 || data[5] !== 0x2a)
                return VPX_CODEC_UNSUP_BITSTREAM;

            var data7 = data[7];

            decoder.frame_hdr.kf.w = ((data[6] | (data7 << 8)) & 0x3fff);
            decoder.frame_hdr.kf.scale_w = data7 >> 6;
            decoder.frame_hdr.kf.h = ((data[8] | (data[9] << 8)) & 0x3fff);
            decoder.frame_hdr.kf.scale_h = data[9] >> 6;


            if (w !== decoder.frame_hdr.kf.w || h !== decoder.frame_hdr.kf.h
                    || scale_h !== decoder.frame_hdr.kf.scale_h
                    || scale_w !== decoder.frame_hdr.kf.scale_w) {
                decoder.frame_hdr.frame_size_updated = 1;
            }


            //if (this.kf.w === 0 || this.kf.h === 0)
            //  return VPX_CODEC_UNSUP_BITSTREAM;
        }




        assert.equal(decoder.frame_hdr.is_keyframe, valid.is_keyframe);
        assert.equal(decoder.frame_hdr.version, valid.version);
        assert.equal(decoder.frame_hdr.is_shown, valid.is_shown);


        if (valid.is_keyframe) {
            assert.equal(decoder.frame_hdr.kf.w, valid.w);
            assert.equal(decoder.frame_hdr.kf.h, valid.h);
            assert.equal(decoder.frame_hdr.kf.scale_w, valid.scale_w);
            assert.equal(decoder.frame_hdr.kf.scale_h, valid.scale_h);
            assert.equal(decoder.frame_hdr.frame_size_updated, valid.update_frame_size);
        }



        //now calculate how many macroblock rows and columns
        data.ptr += FRAME_HEADER_SZ;
        sz -= FRAME_HEADER_SZ;

        if (decoder.frame_hdr.is_keyframe === true) {
            data.ptr += KEYFRAME_HEADER_SZ;
            sz -= KEYFRAME_HEADER_SZ;
            decoder.mb_cols = ((decoder.frame_hdr.kf.w + 15) / 16) | 0;
            decoder.mb_rows = ((decoder.frame_hdr.kf.h + 15) / 16) | 0;

            assert.equal(decoder.mb_cols, valid.mb_cols);
            assert.equal(decoder.mb_rows, valid.mb_rows);
        }


        // decoder.boolDecoder.init(data, data.ptr, decoder.frame_hdr.part0_sz);
        vp8dx_start_decode(decoder.boolDecoder, data, data.ptr, decoder.frame_hdr.part0_sz);

        if (decoder.frame_hdr.is_keyframe) {
            decoder.boolDecoder.get_uint(2);//skip bits for now

        }


        //decoder.segment_hdr.decode(decoder.boolDecoder);
        //START Decode segment hdr
        if (decoder.frame_hdr.is_keyframe === true) {
            decoder.segment_hdr.enabled = 0;
            decoder.segment_hdr.update_data = 0;
            decoder.segment_hdr.update_map = 0;
            decoder.segment_hdr.abs = 0;
            decoder.segment_hdr.tree_probs[0] = 0;
            decoder.segment_hdr.tree_probs[1] = 0;
            decoder.segment_hdr.tree_probs[2] = 0;
            decoder.segment_hdr.lf_level_64[0] = 0;
            decoder.segment_hdr.lf_level_64[1] = 0;
            decoder.segment_hdr.quant_idx_64[0] = 0;
            decoder.segment_hdr.quant_idx_64[1] = 0;
        }


        decoder.segment_hdr.enabled = vpx_read_bit(decoder.boolDecoder);

        if (decoder.segment_hdr.enabled === 1) {
            var i = 0;

            decoder.segment_hdr.update_map = vpx_read_bit(decoder.boolDecoder);
            decoder.segment_hdr.update_data = vpx_read_bit(decoder.boolDecoder);

            if (decoder.segment_hdr.update_data === 1) {
                decoder.segment_hdr.abs = vpx_read_bit(decoder.boolDecoder);

                for (i = 0; i < MAX_MB_SEGMENTS; i++)
                    decoder.segment_hdr.quant_idx[i] = decoder.boolDecoder.maybe_get_int(7);

                for (i = 0; i < MAX_MB_SEGMENTS; i++)
                    decoder.segment_hdr.lf_level[i] = decoder.boolDecoder.maybe_get_int(6);
            }

            if (decoder.segment_hdr.update_map === 1) {
                for (i = 0; i < MB_FEATURE_TREE_PROBS; i++) {
                    if (vpx_read_bit(decoder.boolDecoder) === 1) {
                        decoder.segment_hdr.tree_probs[i] = decoder.boolDecoder.get_uint(8);
                    } else {
                        decoder.segment_hdr.tree_probs[i] = 255;
                    }
                }
            }
        } else {
            decoder.segment_hdr.update_map = 0;
            decoder.segment_hdr.update_data = 0;
        }
        //end decode segment header

        assert.equal(decoder.segment_hdr.enabled, valid.enabled);
        assert.equal(decoder.segment_hdr.update_data, valid.update_data);
        assert.equal(decoder.segment_hdr.update_map, valid.update_map);
        assert.equal(decoder.segment_hdr.abs, valid.abs);
        assert.equal(decoder.segment_hdr.tree_probs[0], valid["tree_probs[0]"]);
        assert.equal(decoder.segment_hdr.tree_probs[1], valid["tree_probs[1]"]);
        assert.equal(decoder.segment_hdr.tree_probs[2], valid["tree_probs[2]"]);


        assert.equal(decoder.segment_hdr.lf_level[0], valid["lf_level[0]"]);
        assert.equal(decoder.segment_hdr.lf_level[1], valid["lf_level[1]"]);
        assert.equal(decoder.segment_hdr.lf_level[2], valid["lf_level[2]"]);
        assert.equal(decoder.segment_hdr.lf_level[3], valid["lf_level[3]"]);

        assert.equal(decoder.segment_hdr.quant_idx[0], valid["quant_idx[0]"]);
        assert.equal(decoder.segment_hdr.quant_idx[1], valid["quant_idx[1]"]);
        assert.equal(decoder.segment_hdr.quant_idx[2], valid["quant_idx[2]"]);
        assert.equal(decoder.segment_hdr.quant_idx[3], valid["quant_idx[3]"]);

        assert.equal(decoder.segment_hdr.tree_probs[0], valid["tree_probs[0]"]);
        assert.equal(decoder.segment_hdr.tree_probs[1], valid["tree_probs[1]"]);
        assert.equal(decoder.segment_hdr.tree_probs[2], valid["tree_probs[2]"]);


        //decoder.frame_hdr.decode(decoder.boolDecoder);
        if (decoder.frame_hdr.is_keyframe === true) {

            decoder.frame_hdr.use_simple = 0;
            decoder.frame_hdr.level = 0;
            decoder.frame_hdr.sharpness = 0;
            decoder.frame_hdr.delta_enabled = 0;

            decoder.frame_hdr.ref_delta[0] = 0;
            decoder.frame_hdr.ref_delta[1] = 0;
            decoder.frame_hdr.ref_delta[2] = 0;
            decoder.frame_hdr.ref_delta[3] = 0;

            decoder.frame_hdr.mode_delta[0] = 0;
            decoder.frame_hdr.mode_delta[1] = 0;
            decoder.frame_hdr.mode_delta[2] = 0;
            decoder.frame_hdr.mode_delta[3] = 0;
        }
        //this.reInit();

        decoder.frame_hdr.use_simple = vpx_read_bit(decoder.boolDecoder);
        decoder.frame_hdr.level = decoder.boolDecoder.get_uint(6);
        decoder.frame_hdr.sharpness = decoder.boolDecoder.get_uint(3);
        decoder.frame_hdr.delta_enabled = vpx_read_bit(decoder.boolDecoder);

        var ref_delta = decoder.frame_hdr.ref_delta;

        if (decoder.frame_hdr.delta_enabled === 1 && vpx_read_bit(decoder.boolDecoder) === 1) {

            ref_delta[0] = decoder.boolDecoder.maybe_get_int(6);
            ref_delta[1] = decoder.boolDecoder.maybe_get_int(6);
            ref_delta[2] = decoder.boolDecoder.maybe_get_int(6);
            ref_delta[3] = decoder.boolDecoder.maybe_get_int(6);

            decoder.frame_hdr.mode_delta[0] = decoder.boolDecoder.maybe_get_int(6);
            decoder.frame_hdr.mode_delta[1] = decoder.boolDecoder.maybe_get_int(6);
            decoder.frame_hdr.mode_delta[2] = decoder.boolDecoder.maybe_get_int(6);
            decoder.frame_hdr.mode_delta[3] = decoder.boolDecoder.maybe_get_int(6);

        }



        assert.equal(decoder.frame_hdr.use_simple, valid.use_simple);
        assert.equal(decoder.frame_hdr.level, valid.level);
        assert.equal(decoder.frame_hdr.sharpness, valid.sharpness);
        assert.equal(decoder.frame_hdr.delta_enabled, valid.delta_enabled);


        assert.equal(decoder.frame_hdr.ref_delta[0], valid["ref_delta[0]"]);
        assert.equal(decoder.frame_hdr.ref_delta[1], valid["ref_delta[1]"]);
        assert.equal(decoder.frame_hdr.ref_delta[2], valid["ref_delta[2]"]);
        assert.equal(decoder.frame_hdr.ref_delta[3], valid["ref_delta[3]"]);

        assert.equal(decoder.frame_hdr.mode_delta[0], valid["mode_delta[0]"]);
        assert.equal(decoder.frame_hdr.mode_delta[1], valid["mode_delta[1]"]);
        assert.equal(decoder.frame_hdr.mode_delta[2], valid["mode_delta[2]"]);
        assert.equal(decoder.frame_hdr.mode_delta[3], valid["mode_delta[3]"]);

        //decoder.token_hdr.decode(data, data.ptr + decoder.frame_hdr.part0_sz,
          //      sz - decoder.frame_hdr.part0_sz);
          
        setup_token_decoder(decoder.token_hdr, data, data.ptr + decoder.frame_hdr.part0_sz,
                sz - decoder.frame_hdr.part0_sz);

        assert.equal(decoder.token_hdr.partition_sz[0], valid["partition_sz[0]"]);
        assert.equal(decoder.token_hdr.partition_sz[1], valid["partition_sz[1]"]);
        assert.equal(decoder.token_hdr.partition_sz[2], valid["partition_sz[2]"]);
        assert.equal(decoder.token_hdr.partition_sz[3], valid["partition_sz[3]"]);
        assert.equal(decoder.token_hdr.partition_sz[4], valid["partition_sz[4]"]);
        assert.equal(decoder.token_hdr.partition_sz[5], valid["partition_sz[5]"]);
        assert.equal(decoder.token_hdr.partition_sz[6], valid["partition_sz[6]"]);
        assert.equal(decoder.token_hdr.partition_sz[7], valid["partition_sz[7]"]);


        //decoder.frame_hdr.decode(decoder.boolDecoder);


        var q_update = 0;
        var last_q = decoder.frame_hdr.q_index;

        decoder.frame_hdr.q_index = decoder.boolDecoder.get_uint(7);
        q_update = (last_q !== decoder.frame_hdr.q_index) + 0;
        q_update |= (decoder.frame_hdr.y1_dc_delta_q = decoder.boolDecoder.maybe_get_int(4));
        q_update |= (decoder.frame_hdr.y2_dc_delta_q = decoder.boolDecoder.maybe_get_int(4));
        q_update |= (decoder.frame_hdr.y2_ac_delta_q = decoder.boolDecoder.maybe_get_int(4));
        q_update |= (decoder.frame_hdr.uv_dc_delta_q = decoder.boolDecoder.maybe_get_int(4));
        q_update |= (decoder.frame_hdr.uv_ac_delta_q = decoder.boolDecoder.maybe_get_int(4));
        decoder.frame_hdr.delta_update = q_update;


        assert.equal(decoder.frame_hdr.q_index, valid.q_index);
        //assert.equal(decoder.frame_hdr.delta_update, valid.delta_update);
        assert.equal(decoder.frame_hdr.y1_dc_delta_q, valid.y1_dc_delta_q);
        assert.equal(decoder.frame_hdr.y2_dc_delta_q, valid.y2_dc_delta_q);
        assert.equal(decoder.frame_hdr.y2_ac_delta_q, valid.y2_ac_delta_q);
        assert.equal(decoder.frame_hdr.uv_dc_delta_q, valid.uv_dc_delta_q);
        assert.equal(decoder.frame_hdr.uv_ac_delta_q, valid.uv_ac_delta_q);


        //Reference Header
        //decoder.frame_hdr.decode(decoder.boolDecoder);
        var key = decoder.frame_hdr.is_keyframe;

        if (key === true) {
            decoder.frame_hdr.refresh_gf = 1;
        } else {
            decoder.frame_hdr.refresh_gf = vpx_read_bit(decoder.boolDecoder);
        }


        if (key === true) {
            decoder.frame_hdr.refresh_arf = 1;
        } else {
            decoder.frame_hdr.refresh_arf = vpx_read_bit(decoder.boolDecoder);
        }


        if (key === true) {
            decoder.frame_hdr.copy_gf = 0;
        } else {
            decoder.frame_hdr.copy_gf = !decoder.frame_hdr.refresh_gf
                    ? decoder.boolDecoder.get_uint(2) : 0;
        }

        if (key === true) {
            decoder.frame_hdr.copy_arf = 0;
        } else {
            decoder.frame_hdr.copy_arf = !decoder.frame_hdr.refresh_arf
                    ? decoder.boolDecoder.get_uint(2) : 0;
        }

        if (key === true) {
            decoder.frame_hdr.sign_bias[GOLDEN_FRAME] = 0;
        } else {
            decoder.frame_hdr.sign_bias[GOLDEN_FRAME] = vpx_read_bit(decoder.boolDecoder);
        }

        if (key === true) {
            decoder.frame_hdr.sign_bias[ALTREF_FRAME] = 0;
        } else {
            decoder.frame_hdr.sign_bias[ALTREF_FRAME] = vpx_read_bit(decoder.boolDecoder);
        }

        decoder.frame_hdr.refresh_entropy = vpx_read_bit(decoder.boolDecoder);

        if (key === true) {
            decoder.frame_hdr.refresh_last = 1;
        } else {
            decoder.frame_hdr.refresh_last = vpx_read_bit(decoder.boolDecoder);
        }






        assert.equal(decoder.frame_hdr.refresh_last, valid.refresh_last);
        assert.equal(decoder.frame_hdr.refresh_gf, valid.refresh_gf);
        assert.equal(decoder.frame_hdr.refresh_arf, valid.refresh_arf);
        assert.equal(decoder.frame_hdr.copy_gf, valid.copy_gf);
        assert.equal(decoder.frame_hdr.copy_arf, valid.copy_arf);
        assert.equal(decoder.frame_hdr.sign_bias[0], valid["sign_bias[0]"]);
        assert.equal(decoder.frame_hdr.sign_bias[1], valid["sign_bias[1]"]);
        assert.equal(decoder.frame_hdr.sign_bias[2], valid["sign_bias[2]"]);
        assert.equal(decoder.frame_hdr.sign_bias[3], valid["sign_bias[3]"]);
        assert.equal(decoder.frame_hdr.refresh_entropy, valid.refresh_entropy);


        if (decoder.frame_hdr.is_keyframe === true) {
            // Load coefficient probability updates
            //decoder.frame_hdr.entropy_hdr.loadDefaultProbs();
            var probs;
            //load coef probs


            for (var i = 0; i < 1056; i++) {
                decoder.frame_hdr.entropy_hdr.coeff_probs[i] = default_coef_probs[i];
                //console.warn(this.coeff_probs_32);
                //console.warn(TABLES.k_default_coeff_probs_32);
                //throw "er";
            }


            //load mv probs
            probs = vp8_default_mv_context;
            //this can probably be done faster
            for (var i = 0; i < MV_PROB_CNT; i++)
                decoder.frame_hdr.entropy_hdr.mv_probs[0][i] = probs[0][i];

            for (var i = 0; i < MV_PROB_CNT; i++)
                decoder.frame_hdr.entropy_hdr.mv_probs[1][i] = probs[1][i];


            probs = vp8_ymode_prob;
            decoder.frame_hdr.entropy_hdr.y_mode_probs[0] = probs[0];
            decoder.frame_hdr.entropy_hdr.y_mode_probs[1] = probs[1];
            decoder.frame_hdr.entropy_hdr.y_mode_probs[2] = probs[2];
            decoder.frame_hdr.entropy_hdr.y_mode_probs[3] = probs[3];



            //load uv mode probs
            probs = vp8_uv_mode_prob;
            //for (var i = 0; i < 3; i++)
            decoder.frame_hdr.entropy_hdr.uv_mode_probs[0] = probs[0];
            decoder.frame_hdr.entropy_hdr.uv_mode_probs[1] = probs[1];
            decoder.frame_hdr.entropy_hdr.uv_mode_probs[2] = probs[2];

        }



        if (decoder.frame_hdr.refresh_entropy === 0) {
            //decoder.frame_hdr.saved_entropy.copyValues(decoder.frame_hdr.entropy_hdr);
            copy_entropy_values(decoder.frame_hdr.saved_entropy, decoder.frame_hdr.entropy_hdr);
            decoder.saved_entropy_valid = 1;
            //assert.equal(md5(decoder.frame_hdr.saved_entropy.coeff_probs), valid.frame_hdr.saved_entropy);

        }

        assert.equal(decoder.saved_entropy_valid, valid.saved_entropy_valid);


        //START DECODING ENTROPY HEADER


        //decoder.frame_hdr.entropy_hdr.decode();
        
    
        var bool = decoder.boolDecoder;

        var i = 0, j = 0, k = 0, l = 0;
        var x = 0;

        var coeff_probs = decoder.frame_hdr.entropy_hdr.coeff_probs;
        /* Read coefficient probability updates */

        
        for(var i = 0; i < 1056; i++) {
            if(vpx_read(bool , vp8_coef_update_probs[i])=== 1)
                coeff_probs[i] = bool.get_uint(8);
        }

       
        /* Read coefficient skip mode probability */
        decoder.frame_hdr.entropy_hdr.coeff_skip_enabled = vpx_read_bit(bool);

        if (decoder.frame_hdr.entropy_hdr.coeff_skip_enabled === 1)
            decoder.frame_hdr.entropy_hdr.coeff_skip_prob = bool.get_uint(8);
        else
            decoder.frame_hdr.entropy_hdr.coeff_skip_prob = 0;

        /* Parse interframe probability updates */
        if (decoder.frame_hdr.is_keyframe === false) {
            decoder.frame_hdr.entropy_hdr.prob_inter = bool.get_uint(8);
            decoder.frame_hdr.entropy_hdr.prob_last = bool.get_uint(8);
            decoder.frame_hdr.entropy_hdr.prob_gf = bool.get_uint(8);

            if (vpx_read_bit(bool) === 1) {
                decoder.frame_hdr.entropy_hdr.y_mode_probs[0] = bool.get_uint(8);
                decoder.frame_hdr.entropy_hdr.y_mode_probs[1] = bool.get_uint(8);
                decoder.frame_hdr.entropy_hdr.y_mode_probs[2] = bool.get_uint(8);
                decoder.frame_hdr.entropy_hdr.y_mode_probs[3] = bool.get_uint(8);
            }

            if (vpx_read_bit(bool) === 1) {
                decoder.frame_hdr.entropy_hdr.uv_mode_probs[0] = bool.get_uint(8);
                decoder.frame_hdr.entropy_hdr.uv_mode_probs[1] = bool.get_uint(8);
                decoder.frame_hdr.entropy_hdr.uv_mode_probs[2] = bool.get_uint(8);
            }

            for (i = 0; i < 2; i++)
                for (j = 0; j < MV_PROB_CNT; j++)
                    if (vpx_read( bool , vp8_mv_update_probs[i][j]))
                    {
                        var x = bool.get_uint(7);
                        //this.mv_probs[i][j] = x ? x << 1 : 1;
                        if(x > 0){
                            decoder.frame_hdr.entropy_hdr.mv_probs[i][j] = x << 1;
                        }else{
                            decoder.frame_hdr.entropy_hdr.mv_probs[i][j] = 1;
                        }
                    }
        }
        
        //END DECODING ENTROPY HEADER

        //Test decoded data
        assert.equal(md5(decoder.frame_hdr.entropy_hdr.coeff_probs), valid.coeff_probs);

        assert.equal(decoder.frame_hdr.entropy_hdr.coeff_skip_enabled, valid.coeff_skip_enabled);
        assert.equal(decoder.frame_hdr.entropy_hdr.coeff_skip_prob, valid.coeff_skip_prob);

        if (decoder.frame_hdr.is_keyframe === false) {
            assert.equal(decoder.frame_hdr.entropy_hdr.prob_inter, valid.prob_inter);
            assert.equal(decoder.frame_hdr.entropy_hdr.prob_last, valid.prob_last);
            assert.equal(decoder.frame_hdr.entropy_hdr.prob_gf, valid.prob_gf);
        }

        assert.equal(decoder.frame_hdr.entropy_hdr.y_mode_probs[0], valid["y_mode_probs[0]"]);
        assert.equal(decoder.frame_hdr.entropy_hdr.y_mode_probs[1], valid["y_mode_probs[1]"]);
        assert.equal(decoder.frame_hdr.entropy_hdr.y_mode_probs[2], valid["y_mode_probs[2]"]);
        assert.equal(decoder.frame_hdr.entropy_hdr.y_mode_probs[3], valid["y_mode_probs[3]"]);

        assert.equal(decoder.frame_hdr.entropy_hdr.uv_mode_probs[0], valid["uv_mode_probs[0]"]);
        assert.equal(decoder.frame_hdr.entropy_hdr.uv_mode_probs[1], valid["uv_mode_probs[1]"]);
        assert.equal(decoder.frame_hdr.entropy_hdr.uv_mode_probs[2], valid["uv_mode_probs[2]"]);




        decoder.modemv_init();
        
        
        
        
        //decoder.token_hdr.init();
        //INITIALIZING TOKENS
        
        
        var ctx = decoder;
        var partitions = ctx.token_hdr.partitions;

        if (ctx.frame_hdr.frame_size_updated === 1) {
            var i = 0;
            var coeff_row_sz = ctx.mb_cols * 400;

            for (i = 0; i < partitions; i++) {
                ctx.tokens[i].coeffs = new Uint32Array(coeff_row_sz);
            }

            var mb_cols = ctx.mb_cols;
            //ENTROPY_CONTEXT_PLANES
            ctx.above_token_entropy_ctx = new Array(mb_cols);
            for (var i = 0; i < mb_cols; i++)
                ctx.above_token_entropy_ctx[i] = new Int32Array(9);

        }
        
        
        //Predict.vp8_dixie_predict_init(decoder);
        //PREDICT INIT
        var i = 0;
        var this_frame_base = 0;
        var this_frame_base_off = 0;

        if (decoder.frame_hdr.frame_size_updated === 1) {

            for (i = 0; i < NUM_REF_FRAMES; i++) {

                var w = ((decoder.mb_cols << 4) + 32) | 0;
                var h = ((decoder.mb_rows << 4) + 32) | 0;

                vpx_img_free(decoder.frame_strg[i].img);
                decoder.frame_strg[i].ref_cnt = 0;
                decoder.ref_frames[i] = null;

                //if (!ctx.frame_strg[i].img.init(VPX_IMG_FMT_I420, w, h, 16))
                //  throw "Memory Error!";

                if (!img_alloc_helper(decoder.frame_strg[i].img, VPX_IMG_FMT_I420, w, h, 16))
                    throw "Memory Error!";

                vpx_img_set_rect(decoder.frame_strg[i].img, BORDER_PIXELS, BORDER_PIXELS,
                        decoder.frame_hdr.kf.w, decoder.frame_hdr.kf.h);

            }

            if (decoder.frame_hdr.version)
                decoder.subpixel_filters = vp8_bilinear_filters;
            else
                decoder.subpixel_filters = vp8_sub_pel_filters;
        }

        var ref_frames = decoder.ref_frames;
        /* Find a free framebuffer to predict into */
        if (ref_frames[CURRENT_FRAME])
            vp8_dixie_release_ref_frame(ref_frames[CURRENT_FRAME]);

        ref_frames[CURRENT_FRAME] =
                vp8_dixie_find_free_ref_frame(decoder.frame_strg);
        this_frame_base = ref_frames[CURRENT_FRAME].img.img_data;

        /* Calculate offsets to the other reference frames */

        for (i = 0; i < NUM_REF_FRAMES; i++) {
            var ref = ref_frames[i];

            if (ref) {
                decoder.ref_frame_offsets[i] = ref.img.img_data_off - this_frame_base_off;
                decoder.ref_frame_offsets_[i] = ref.img.img_data;
            } else {
                decoder.ref_frame_offsets[i] = 0;
                decoder.ref_frame_offsets_[i] = this_frame_base;
            }
        }
        
        //END PREDICT INIT
        //decoder.dequantInit();
        vp8cx_init_de_quantizer(decoder.dequant_factors, decoder.segment_hdr, decoder.frame_hdr);

        var length = 1;
        if (decoder.segment_hdr.enabled === 1) {
            length = 4;
        }

        //Test the quantize factors
        for (var i = 0; i < length; i++) {
            var keyStringBase = "dequant_factors[" + i + "]";
            assert.equal(decoder.dequant_factors[i].quant_idx, valid[keyStringBase + ".quant_idx"]);

            assert.equal(decoder.dequant_factors[i].factor[0][0], valid[keyStringBase + ".factor[0][0]"]);
            assert.equal(decoder.dequant_factors[i].factor[0][1], valid[keyStringBase + ".factor[0][1]"]);

            assert.equal(decoder.dequant_factors[i].factor[1][0], valid[keyStringBase + ".factor[1][0]"]);
            assert.equal(decoder.dequant_factors[i].factor[1][1], valid[keyStringBase + ".factor[1][1]"]);

            assert.equal(decoder.dequant_factors[i].factor[2][0], valid[keyStringBase + ".factor[2][0]"]);
            assert.equal(decoder.dequant_factors[i].factor[2][1], valid[keyStringBase + ".factor[2][1]"]);
        }


        var mb_rows = decoder.mb_rows;
        var mb_cols = decoder.mb_cols;
        var partition = 0;
        var row = 0;



        var bounds = {
            to_left: 0,
            to_right: 0,
            to_top: 0,
            to_bottom: 0
        };

        for (row = 0, partition = 0; row < mb_rows; row++) {
            //vp8_decode_mode_mvs
            //decoder.vp8_dixie_modemv_process_row(decoder, decoder.boolDecoder, row, 0, mb_cols);
    vp8_decode_mode_mvs(decoder, decoder.boolDecoder, row, 0, mb_cols)

            bounds.to_left = -((0 + 1) << 7);
            bounds.to_right = (decoder.mb_cols - 0) << 7;
            bounds.to_top = -((row + 1) << 7);
            bounds.to_bottom = (decoder.mb_rows - row) << 7;

            for (var col = 0; col < mb_cols; col++) {




                if (decoder.frame_hdr.is_keyframe === false) {
                    bounds.to_left -= 16 << 3;
                    bounds.to_right -= 16 << 3;
                }

                //TESTING MOTION VECTORS
                var this_ = decoder.mb_info_rows;
                var this_off = decoder.mb_info_rows_off[1 + row] + col;
                var above = decoder.mb_info_rows;
                var above_off = decoder.mb_info_rows_off[row] + col;

                var row_prefix = "modemv_process_row_" + row;
                var col_prefix = "modemv_col_" + col;



                assert.equal(bounds.to_left, valid[row_prefix][col_prefix].to_left);
                assert.equal(bounds.to_right, valid[row_prefix][col_prefix].to_right);
                //if(bounds.to_left !== valid[row_prefix][col_prefix].to_left){
                //  console.warn("failing on row , col : " + row + ", " + col + ", " + bounds.to_left + " is kf " + decoder.frame_hdr.is_keyframe);
                //}
                assert.equal(bounds.to_top, valid[row_prefix][col_prefix].to_top);
                assert.equal(bounds.to_bottom, valid[row_prefix][col_prefix].to_bottom);

                var mvTestVal;



                mvTestVal = valid[row_prefix][col_prefix]["this"]["base.y_mode"];
                assert.equal(this_[this_off].base.y_mode, mvTestVal);

                mvTestVal = valid[row_prefix][col_prefix]["this"]["base.uv_mode"];
                assert.equal(this_[this_off].base.uv_mode, mvTestVal);

                mvTestVal = valid[row_prefix][col_prefix]["this"]["base.segment_id"];
                assert.equal(this_[this_off].base.segment_id, mvTestVal);

                mvTestVal = valid[row_prefix][col_prefix]["this"]["base.ref_frame"];
                assert.equal(this_[this_off].base.ref_frame, mvTestVal);

                mvTestVal = valid[row_prefix][col_prefix]["this"]["base.skip_coeff"];
                assert.equal(this_[this_off].base.skip_coeff, mvTestVal);

                mvTestVal = valid[row_prefix][col_prefix]["this"]["base.need_mc_border"];
                assert.equal(this_[this_off].base.need_mc_border, mvTestVal);

                mvTestVal = valid[row_prefix][col_prefix]["this"]["base.partitioning"];
                assert.equal(this_[this_off].base.partitioning, mvTestVal);

                mvTestVal = valid[row_prefix][col_prefix]["this"]["base.eob_mask"];
                //assert.equal(this_[this_off].base.eob_mask, mvTestVal);


                //Testing motion vector
                mvTestVal = valid[row_prefix][col_prefix]["this"]["base.mv.x"];
                assert.equal(this_[this_off].base.mv.x, mvTestVal);

                mvTestVal = valid[row_prefix][col_prefix]["this"]["base.mv.y"];
                assert.equal(this_[this_off].base.mv.y, mvTestVal);





                //mvTestVal = valid[row_prefix][col_prefix]["this"]["base.partitioning"];
                //if(decoder.frame_hdr.is_keyframe === false)
                //assert.equal(this_[this_off].base.partitioning, mvTestVal);

                //TESTING SPLIT MV's
                if (this_[this_off].base.y_mode === SPLITMV) {
                    for (var mv_i = 0; mv_i < 16; mv_i++) {
                        var value = "mv_" + mv_i + "_x";
                        mvTestVal = valid[row_prefix][col_prefix]["this"]["split"][value];
                        assert.equal(this_[this_off].splitt.mvs[mv_i].x, mvTestVal);

                        value = "mv_" + mv_i + "_y";
                        mvTestVal = valid[row_prefix][col_prefix]["this"]["split"][value];
                        assert.equal(this_[this_off].splitt.mvs[mv_i].y, mvTestVal);

                        value = "mode_" + mv_i;
                        mvTestVal = valid[row_prefix][col_prefix]["this"]["split"][value];
                        //assert.equal(this_[this_off].splitt.modes[mv_i], mvTestVal);
                    }
                } else if (this_[this_off].base.y_mode === B_PRED) {
                    for (var mv_i = 0; mv_i < 16; mv_i++) {

                        value = "mode_" + mv_i;
                        mvTestVal = valid[row_prefix][col_prefix]["this"]["split"][value];
                        assert.equal(this_[this_off].splitt.modes[mv_i], mvTestVal);
                    }
                }

            }

            //console.warn(row + ":" + mb_cols);


            //DECODING TOKENS
            //TURN ON EOB MASK with this one

            if (++partition === decoder.token_hdr.partitions)
                partition = 0;


        }


        decode_mb_rows(decoder, row, 0, mb_cols, partition);


        //CURRENT_FRAME
        var testImg = decoder.ref_frames[0].img;
        var offsets = testImg.planes_off;
        var y_off = offsets[0];
        var u_off = offsets[1];
        var v_off = offsets[2];

        var yHash = md5.create();
        var uHash = md5.create();
        var vHash = md5.create();
        var totalHash = md5.create();

        var mainHash = md5.create();

        totalHash.update(testImg.img_data);

        for (var y = 0; y < testImg.d_h; y++) //testImg.d_h
        {
            yHash.update(testImg.img_data.subarray(y_off, y_off + testImg.d_w));
            mainHash.update(testImg.img_data.subarray(y_off, y_off + testImg.d_w));
            y_off += testImg.stride[0];

        }

        var chromaHeight = ((1 + testImg.d_h) / 2) | 0;
        var chromaWidth = ((1 + testImg.d_w) / 2) | 0;
        for (var y = 0; y < chromaHeight; y++) //testImg.d_h
        {

            uHash.update(testImg.img_data.subarray(u_off, u_off + chromaWidth));
            vHash.update(testImg.img_data.subarray(v_off, v_off + chromaWidth));
            u_off += testImg.stride[1];
            v_off += testImg.stride[2];
            //MD5Update(md5_ctx_y, buf, img.d_w);
            //      buf += img.stride[VPX_PLANE_Y];
        }

        //UPDATING MAIN HASH U
        u_off = offsets[1];
        for (var y = 0; y < chromaHeight; y++) //testImg.d_h
        {


            mainHash.update(testImg.img_data.subarray(u_off, u_off + chromaWidth));
            u_off += testImg.stride[1];
        }

        //UPDATING MAIN HASH V
        v_off = offsets[2];
        for (var y = 0; y < chromaHeight; y++) //testImg.d_h
        {

            mainHash.update(testImg.img_data.subarray(v_off, v_off + chromaWidth));
            v_off += testImg.stride[2];
        }

        //TURN ON EOB MASK
        //if(!decoder.frame_hdr.is_keyframe){
        mvTestVal = valid["predict_process"]["complete_data"];
        assert.equal(totalHash.hex(), mvTestVal); //testImg.img_data[offsets[2]]
        //}

        mvTestVal = valid["predict_process"]["y_plane_pre_filter"];
        assert.equal(yHash.hex(), mvTestVal);


        mvTestVal = valid["predict_process"]["u_plane_pre_filter"];
        assert.equal(uHash.hex(), mvTestVal);

        mvTestVal = valid["predict_process"]["v_plane_pre_filter"];
        assert.equal(vHash.hex(), mvTestVal);



        decoder.frame_cnt++;


        //UPDATE REFERENCES TO FRAMES AND STUFF
        if (decoder.saved_entropy_valid === 1) {
            //decoder.frame_hdr.entropy_hdr.copyValues(decoder.frame_hdr.saved_entropy);
            copy_entropy_values(decoder.frame_hdr.entropy_hdr, decoder.frame_hdr.saved_entropy);
            decoder.saved_entropy_valid = 0;
        }


        /* Handle reference frame updates */
        if (decoder.frame_hdr.copy_arf == 1)
        {
            vp8_dixie_release_ref_frame(decoder.ref_frames[ALTREF_FRAME]);
            decoder.ref_frames[ALTREF_FRAME] =
                    vp8_dixie_ref_frame(decoder.ref_frames[LAST_FRAME]);
        } else if (decoder.frame_hdr.copy_arf == 2)
        {
            vp8_dixie_release_ref_frame(decoder.ref_frames[ALTREF_FRAME]);
            decoder.ref_frames[ALTREF_FRAME] =
                    vp8_dixie_ref_frame(decoder.ref_frames[GOLDEN_FRAME]);
        }

        if (decoder.frame_hdr.copy_gf == 1)
        {
            vp8_dixie_release_ref_frame(decoder.ref_frames[GOLDEN_FRAME]);
            decoder.ref_frames[GOLDEN_FRAME] =
                    vp8_dixie_ref_frame(decoder.ref_frames[LAST_FRAME]);
        } else if (decoder.frame_hdr.copy_gf == 2)
        {
            vp8_dixie_release_ref_frame(decoder.ref_frames[GOLDEN_FRAME]);
            decoder.ref_frames[GOLDEN_FRAME] =
                    vp8_dixie_ref_frame(decoder.ref_frames[ALTREF_FRAME]);
        }

        if (decoder.frame_hdr.refresh_gf)
        {
            vp8_dixie_release_ref_frame(decoder.ref_frames[GOLDEN_FRAME]);
            decoder.ref_frames[GOLDEN_FRAME] =
                    vp8_dixie_ref_frame(decoder.ref_frames[CURRENT_FRAME]);
        }

        if (decoder.frame_hdr.refresh_arf)
        {
            vp8_dixie_release_ref_frame(decoder.ref_frames[ALTREF_FRAME]);
            decoder.ref_frames[ALTREF_FRAME] =
                    vp8_dixie_ref_frame(decoder.ref_frames[CURRENT_FRAME]);
        }

        if (decoder.frame_hdr.refresh_last)
        {
            vp8_dixie_release_ref_frame(decoder.ref_frames[LAST_FRAME]);
            decoder.ref_frames[LAST_FRAME] =
                    vp8_dixie_ref_frame(decoder.ref_frames[CURRENT_FRAME]);
        }

        decoder.img = decoder.ref_frames[CURRENT_FRAME].img;
        //if (decoder.frame_hdr.is_shown === 0)
        //  throw("inviz");

        decoder.img_avail = decoder.frame_hdr.is_shown;
        //console.log(decoder.img_avail);

        //driver = mainHash.hex();
        //done('asd');
// -o ${test_name}-%wx%h-%4.i420 --i420 $f > /tmp/$$.md5

        var data = mainHash.hex() + "  " + basename + "-";
        data += testImg.d_w + "x" + testImg.d_h;
        data += "-" + pad(decoder.frame_cnt, 4);
        data += ".i420";
        data += "\n";

        //console.log(testImg.d_h);
        // + "-" + testImg.d_w +"x" + testImg.d_h +
        //+ ".i420\n";
        if (decoder.frame_hdr.is_shown) {
            fs.appendFile("./output-vectors/" + basename + ".ivf.md5", data, function (err) {
                if (err)
                    throw err;

            });
        }

    });

    //console.log(driver);

}






describe('Running Test Vector Unit Tests', function () {

    var driver;

    var testPath = "./test/test-data/";
    var testFiles = fs.readdirSync(testPath);
    var vectorPath = './vp8-test-vectors/';



    for (var key in testFiles) {


        var file = testFiles[key];
        if (path.extname(file) !== ".json")
            continue;

        var validationHashes = [];
        var ivfDataFile = file.slice(0, -5);
        //var testData = require(testPath + file);
        var testData = fs.readFileSync(testPath + file, 'utf8');
        var md5File = ivfDataFile + ".md5";

        var basename = ivfDataFile.substring(0, ivfDataFile.indexOf('.'));
        var md5OutPath = "./output-vectors/" + basename + ".ivf.md5";
        //console.log(basename);
        ///var md5Data = fs.readFileSync(vectorPath + md5File , 'utf8');

        //var md5Data = fs.readFileSync(vectorPath + md5File);//.toString().split("\n");

        //console.log(validationHashes);


        try {
            var validationData = JSON.parse(testData);
        } catch (e) {
            console.warn("Parsing error : " + file);
        }

        describe('Testing vector Vector : ' + ivfDataFile, function () {
            //var driver = 'test';

            //Delete old test file if exists

            if (fs.existsSync(md5OutPath))
                fs.unlinkSync(md5OutPath);

            var data = fs.readFileSync(vectorPath + ivfDataFile);
            var demuxer = new ivf();
            demuxer.receiveBuffer(data);
            demuxer.parseHeader();
            var decoder = new vp8();

            var valid = validationData.tests;
            var length = valid.length;
            //console.log(length);

            for (var i = 0; i < length; i++) {

                decode_frame(i, valid[i], demuxer, decoder, basename);
                //console.warn(global.driver);

            }






        });




    }


});

