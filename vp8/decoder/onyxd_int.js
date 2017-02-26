"use strict";
var VP8_COMMON = require('../common/onyxc_int');

var dboolhuff = require('./dboolhuff.js');
var BoolDecoder = dboolhuff.BOOL_DECODER;


var blockd = require('../common/blockd.js');
var MACROBLOCKD = blockd.MACROBLOCKD;
var FRAGMENT_DATA = blockd.FRAGMENT_DATA;
var mb_info = blockd.MODE_INFO;

var vpx_image = require('../../vpx/vpx_image.js');
var vpx_image_t = vpx_image.vpx_image_t;


var CURRENT_FRAME = 0;
var LAST_FRAME = 1;
var GOLDEN_FRAME = 2;
var ALTREF_FRAME = 3;
var NUM_REF_FRAMES = 4;

var MAX_PARTITIONS = 8;
var MAX_MB_SEGMENTS = 4;




var MAX_FB_MT_DEC = 32;

Uint8Array.prototype.ptr = 0;

class frame_buffers {
    /*
     * this struct will be populated with frame buffer management
     * info in future commits. */

    // decoder instances 
    constructor() {
        this.pbi = new Array(MAX_FB_MT_DEC);//VP8D_COMP
    }

}
;


var ref_cnt_img = function () {
    this.img = new vpx_image_t();
    this.ref_cnt = 0;
};



//possibly line 65 vp8common
class dequant_factors {
    constructor() {
        this.quant_idx = 0;
        this.factor = [
            new Int16Array([0, 0]), //Y1
            new Int16Array([0, 0]), // UV
            new Int16Array([0, 0]) //Y2
        ];

    }
}



class token_decoder {

    constructor() {
        this.bool = new BoolDecoder();
        this.left_token_entropy_ctx = new Int32Array(9);
        this.coeffs = 0;
    }

}




//VP8D_COMP
class VP8D_COMP {

    constructor() {

        this.frame_cnt = 0;

        this.cpuTime = 0;

        this.saved_entropy_valid = 0;

        this.mb_info_rows_storage = null; //**
        this.mb_info_rows_storage_off = 0;
        this.mb_info_rows_storage_object = (mb_info); //new 
        this.mb_info_rows = null; //mb_info**
        this.mb_info_rows_off = 0;
        this.above_token_entropy_ctx = null;
        //this.above_token_entropy_ctx_object = (token_entropy_ctx_t); //*

        this.common = new VP8_COMMON();
        this.boolDecoder = new BoolDecoder();
        this.segment_hdr = new MACROBLOCKD(this);
        this.token_hdr = new FRAGMENT_DATA(this);



        this.tokens = new Array(MAX_PARTITIONS);
        for (var i = 0; i < MAX_PARTITIONS; i ++)
            this.tokens[i] = new token_decoder();



        this.frame_strg = [
            {
                img: new vpx_image_t(),
                ref_cnt: 0
            },
            {
                img: new vpx_image_t(),
                ref_cnt: 0
            },
            {
                img: new vpx_image_t(),
                ref_cnt: 0
            },
            {
                img: new vpx_image_t(),
                ref_cnt: 0
            }
        ];


        this.ref_frames = new Array(NUM_REF_FRAMES);
        for (var i = 0; i < NUM_REF_FRAMES; i ++)
            this.ref_frames[i] = new ref_cnt_img();

        this.dequant_factors = new Array(MAX_MB_SEGMENTS);
        for (var i = 0; i < MAX_MB_SEGMENTS; i ++)
            this.dequant_factors[i] = new dequant_factors();


 


        this.ref_frame_offsets = new Uint32Array([0, 0, 0, 0]);
        this.ref_frame_offsets_ = [0, 0, 0, 0];
        this.subpixel_filters = null;

        this.img_avail;
        this.img;

    }

 

    /**
     * vp8_alloc_frame_buffers
     * vp8_dixie_modemv_init
     * @returns {undefined}
     */
    modemv_init() {
        var mbi_w = 0;
        var mbi_h = 0;
        var i = 0;
        var mbi = mbi_cache;
        

        mbi_w = this.mb_cols + 1; /* For left border col */
        mbi_h = this.mb_rows + 1; /* For above border row */
        
        this.common.mode_info_stride = this.mb_cols + 1;

        if (this.common.frame_size_updated === 1) {
            this.mb_info_storage = null;
            this.mb_info_rows_storage = null;
        }

        if (this.mb_info_storage === null) {
            var length = mbi_w * mbi_h;
            this.mb_info_storage = new Array(length);


            for (var i = 0; i < length; i ++)
                this.mb_info_storage[i] = new mb_info();

            this.mb_info_storage_off = 0;
            
            this.mb_info_rows_storage_off = new Uint32Array(mbi_h);
        }

        var ptr = 1;

        for (i = 0; i < mbi_h; i++) {
            this.mb_info_rows_storage_off[i] = ptr;
            ptr = (ptr + mbi_w) | 0;
        }


        this.mb_info_rows = this.mb_info_storage;
        this.mb_info_rows_off = this.mb_info_rows_storage_off;
    }


}

var mbi_cache = new mb_info();

module.exports = VP8D_COMP;