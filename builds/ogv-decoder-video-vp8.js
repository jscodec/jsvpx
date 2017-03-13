/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var jsvpx = __webpack_require__(2);

	var vpx_codec = __webpack_require__(33);
	var vpx_codec_ctx_t = vpx_codec.vpx_codec_ctx_t;


	var getTimestamp;
	if (typeof performance === 'undefined' || typeof performance.now === 'undefined') {
	    getTimestamp = Date.now;
	} else {
	    getTimestamp = performance.now.bind(performance);
	}

	class OGVDecoderVideoVP8 {

	    constructor(options) {
	        this.cpuTime = 0;
	        this.loadedMetadata = true;
	        this.frameBuffer = null;
	        this.videoFormat = options.videoFormat || null;


	        this.iface = jsvpx.ifaces[0].iface; // get jsvp8 decoder
	        var cfg = null;
	        var flags = null;
	        this.decoder = new vpx_codec_ctx_t();

	        jsvpx.vpx_codec_dec_init(this.decoder, this.iface, cfg, flags);//ctx, iface, cfg, flags


	    }

	    init(callback) {
	        console.warn("STARTING CODEC JSVPX");
	        callback();
	    }

	    processHeader(data, callback) {
	        //console.error("PROCESS HEADER");
	        this.loadedMetadata = true;
	        callback(0);
	    }

	    processFrame(buf, callback) {

	        var start = getTimestamp();

	        var data = new Uint8Array(buf);


	        var iter = null; //vpx_codec_iter_t

	        var user_priv;
	        var deadline;

	        jsvpx.vpx_codec_decode(this.decoder, data, data.length, user_priv, deadline);

	        var img = jsvpx.vpx_codec_get_frame(this.decoder, iter);

	        if (img) {
	            var offsets = img.planes_off;

	            var imgData = img.img_data;

	            var videoFormat = this.videoFormat;
	            this.frameBuffer = {
	                // @fixme what to do about the crop coordinates if resolution changes? can this happen in webm land? what about if ogv gets a new steam?
	                format: {
	                    width: img.d_w + 2, // this is wierd, ogv is cropping it at the wrong spot and making a green line
	                    height: img.d_h,
	                    chromaWidth: img.d_w >> 1,
	                    chromaHeight: img.d_h >> 1,
	                    cropLeft: videoFormat.cropLeft,
	                    cropTop: videoFormat.cropTop,
	                    cropWidth: videoFormat.cropWidth,
	                    cropHeight: videoFormat.cropHeight,
	                    displayWidth: videoFormat.displayWidth,
	                    displayHeight: videoFormat.displayHeight
	                },
	                y: {
	                    bytes: imgData.subarray(offsets[0], offsets[1]),
	                    stride: img.stride[0]
	                },
	                u: {
	                    bytes: imgData.subarray(offsets[1], offsets[2]),
	                    stride: img.stride[1]
	                },
	                v: {
	                    bytes: imgData.subarray(offsets[2]),
	                    stride: img.stride[2]
	                }
	            };

	        }

	        var delta = (getTimestamp() - start);
	        this.cpuTime += delta;
	        callback(1);
	    }

	    close() {

	    }
	}



	if(typeof window !== 'undefined'){
	    window.OGVDecoderVideoVP8 = OGVDecoderVideoVP8;
	}else if(typeof self !== 'undefined'){
	    self.OGVDecoderVideoVP8 = OGVDecoderVideoVP8;
	}

	module.exports = OGVDecoderVideoVP8;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 
	 * This file provides our highest level interface into the decoders
	 */

	//possibly move interfaces to vp8dx
	var ifaces = [
	    {
	        name: "jsvp8",
	        iface : __webpack_require__(3)
	    }
	];

	var VPX_CODEC_ABI_VERSION = 1;//temp
	var VPX_DECODER_ABI_VERSION = VPX_CODEC_ABI_VERSION + 3;


	function get_alg_priv(ctx) {
	  return ctx.priv;
	}


	function vpx_codec_dec_init(ctx, iface, cfg, flags){
	    
	    return vpx_codec_dec_init_ver(ctx, iface, cfg, flags , VPX_DECODER_ABI_VERSION);
	    
	}

	/**
	 * 
	 * @param {type} ctx
	 * @param {vpx_codec_iface_t} iface vpx_codec_vp8_dx_algo
	 * @param {type} cfg
	 * @param {type} flags
	 * @param {type} ver
	 * @returns {undefined}
	 */
	function vpx_codec_dec_init_ver(ctx, iface, cfg, flags, ver){
	    
	    //iface.init()
	    //console.log("Initializing decoder");
	    //clear the ctx
	    ctx.iface = iface;
	    ctx.name = iface.name;
	    ctx.priv = null;
	    ctx.init_flags = flags;
	    ctx.config.dec = cfg;
	    
	    
	    ctx.iface.init(ctx, null);
	}


	function vpx_codec_peek_stream_info(){
	    
	}

	function vpx_codec_get_stream_info(){
	    
	}

	//line 104
	function vpx_codec_decode(ctx, data, data_sz, user_priv, deadline) {
	    var res = 0;

	    //if (!ctx || (!data && data_sz) || (data && !data_sz))
	    //   res = VPX_CODEC_INVALID_PARAM;
	    //else if (!ctx.iface || !ctx.priv)
	    //  res = VPX_CODEC_ERROR;
	    //else {
	    //get_alg_priv(ctx)
	    res = ctx.iface.dec.decode(get_alg_priv(ctx), data, data_sz, user_priv,
	            deadline);
	    //console.log("NOW DECODING");
	    //}

	//return SAVE_STATUS(ctx, res);
	}

	function vpx_codec_get_frame(ctx, iter){
	    var img;
	    
	    img = ctx.iface.dec.get_frame(ctx, iter);
	    
	    return img;
	}

	function vpx_codec_put_frame_cb_fn_t(){
	    
	}

	function vpx_codec_register_put_frame_cb(){
	    
	}

	function vpx_codec_register_put_slice_cb(){
	    
	}

	module.exports = {
	    ifaces : ifaces,
	    vpx_codec_dec_init : vpx_codec_dec_init,
	    vpx_codec_dec_init_ver : vpx_codec_dec_init_ver,
	    vpx_codec_peek_stream_info : vpx_codec_peek_stream_info,
	    vpx_codec_get_stream_info : vpx_codec_get_stream_info,
	    vpx_codec_decode : vpx_codec_decode,
	    vpx_codec_get_frame : vpx_codec_get_frame,
	    vpx_codec_put_frame_cb_fn_t : vpx_codec_put_frame_cb_fn_t,
	    vpx_codec_register_put_frame_cb : vpx_codec_register_put_frame_cb,
	    vpx_codec_register_put_slice_cb : vpx_codec_register_put_slice_cb
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var VP8D_COMP = __webpack_require__(4);
	var onyxd_if = __webpack_require__(11);
	var vp8dx_receive_compressed_data = onyxd_if.vp8dx_receive_compressed_data;


	class vpx_codec_alg_priv{
	    
	    constructor(){
	        
	        this.base; //vpx_codec_priv_t
	        this.cfg;
	        this.si; //vp8_stream_info_t
	        this.decoder_init;
	        this.postproc_cfg_set;
	        this.postproc_cfg;
	        
	        this.decrypt_cb;
	        this.decrypt_state;
	        this.img;
	        this.img_setup;
	        this.yv12_frame_buffers; //frame_buffers
	        this.user_priv;
	        this.fragments; //FRAGMENT_DATA
	        this.temp_pbi = null;
	        
	    }
	    
	}

	function vp8_peek_si(){
	    
	}

	function vp8_get_si(){
	    
	}

	function vp8_decode(ctx, data, data_sz , user_priv , deadline){
	    var res = 0; //VPX_CODEC_OK
	    var resolution_change = 0;
	    var w, h;
	    //console.warn("decoding!");
	    /*
	     *  if (!ctx->fragments.enabled && (data == NULL && data_sz == 0)) {
	    return 0;
	  }
	     */
	    
	    //if (update_fragments(ctx, data, data_sz, &res) <= 0) return res;
	    
	    //w = ctx.si.w;
	    //h = ctx.si.h;
	    
	    //res = vp8_peek_si_internal(ctx->fragments.ptrs[0], ctx->fragments.sizes[0],
	                      //       &ctx->si, ctx->decrypt_cb, ctx->decrypt_state);
	                      
	    //  if ((ctx->si.h != h) || (ctx->si.w != w)) resolution_change = 1;
	    
	    if (!res && !ctx.decoder_init) {
	        
	    }
	    
	    //line 399
	    if (!ctx.temp_pbi) {
	        
	        var pbi = new VP8D_COMP();//this goes in frame buffers
	        ctx.temp_pbi = pbi;
	    }
	    
	    vp8dx_receive_compressed_data(ctx.temp_pbi, data_sz, data, deadline);
	    
	    return res;
	    
	}

	function vp8_get_frame(decoder, iter) {
	    if (decoder.priv.temp_pbi.common.show_frame) {
	        return  decoder.priv.temp_pbi.ref_frames[0].img;
	    }
	    return null;
	}

	function vp8_init_ctx(ctx) {
	    var priv = new vpx_codec_alg_priv();
	    ctx.priv = priv;
	    ctx.priv.init_flags = ctx.init_flags;
	    //priv.si.sz = size of (priv.si)
	    ctx.priv.decrypt_cb = null;
	    ctx.priv.decrypt_state = null;

	    if (ctx.config.dec) {
	        // Update the reference to the config structure to an internal copy.
	        priv.cfg = ctx.config.dec;
	        ctx.config.dec = priv.cfg;
	    }

	    return 0;
	}

	function vp8_init(ctx, data) {

	    var res; // = VPX_CODEC_OK;
	    var priv = null;


	    //vp8_rtcd();
	    // vpx_dsp_rtcd();
	    //vpx_scale_rtcd();

	    if (!ctx.priv) {
	        vp8_init_ctx(ctx);
	        priv = ctx.priv;

	        //priv.fragments.count = 0;

	        //priv->fragments.enabled =
	        //(priv->base.init_flags & VPX_CODEC_USE_INPUT_FRAGMENTS);
	    } else {
	        priv = ctx.priv;
	    }

	}

	//vpx_codec_iface vpx_codec_internal.h

	var vpx_codec_vp8_js = {
	    name: "jscodec VP8 Decoder",
	    abi_version : 0,
	    caps : null,
	    destroy : null,
	    dec: {
	        peek_si: vp8_peek_si,
	        get_si: vp8_get_si,
	        decode: vp8_decode,
	        get_frame: vp8_get_frame
	    },
	    init : vp8_init
	};//CODEC_INTERFACE

	module.exports = vpx_codec_vp8_js;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var VP8_COMMON = __webpack_require__(5);

	var dboolhuff = __webpack_require__(6);
	var BoolDecoder = dboolhuff.BOOL_DECODER;


	var blockd = __webpack_require__(8);
	var MACROBLOCKD = blockd.MACROBLOCKD;
	var FRAGMENT_DATA = blockd.FRAGMENT_DATA;
	var mb_info = blockd.MODE_INFO;

	var vpx_image = __webpack_require__(10);
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
	        this.coeffs = null;
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
	        this.ref_frame = null;
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var MV_PROB_CNT =19;

	class FRAME_CONTEXT {
	    //FRAME_CONTEXT
	    constructor(decoder) {
	        this.decoder = decoder;
	        //coeff_probs [BLOCK_TYPES][COEFF_BANDS]
	        //[PREV_COEFF_CONTEXTS][ENTROPY_NODES]
	        //Coeff probs gets treated as a pointer later so cant use multi array anyway
	        this.coeff_probs = new Uint8Array(1056);
	        this.coeff_probs.data_32 = new Uint32Array(this.coeff_probs.buffer);
	        this.coeff_probs.data_64 = new Float64Array(this.coeff_probs.buffer);

	        //MV_CONTEXT
	        this.mv_probs = [
	            new Uint8Array(MV_PROB_CNT), //mv_component_probs_t
	            new Uint8Array(MV_PROB_CNT) //mv_component_probs_t
	        ];
	        this.coeff_skip_enabled = 0;
	        this.coeff_skip_prob = 0;
	        this.y_mode_probs = new Uint8Array(4);
	        this.y_mode_probs_32 = new Uint32Array(this.y_mode_probs.buffer);
	        this.uv_mode_probs = new Uint8Array(3);
	        this.prob_inter = 0;
	        this.prob_last = 0;
	        this.prob_gf = 0;
	        
	    }
	 
	}
	var RECON_CLAMP_NOTREQUIRED = 0;
	var RECON_CLAMP_REQUIRED = 1

	var NORMAL_LOOPFILTER = 0;
	var SIMPLE_LOOPFILTER = 1;

	var NUM_YV12_BUFFERS = 4;


	/**
	 * @classdesc VP8Common
	 * merge all other headers here
	 * alias VP8_COMMON
	 * vpx_codec_ctx_t
	 * file onyxc_int.h
	 * @property {number} is_keyframe is it a keyframe
	 * @property {number} show_frame should the frame be shown
	 * @property {number} part0_sz the partition size of 0
	 * @property {number} frame_size_updated indicates if need a resolution update
	 */
	class VP8_COMMON {
	    

	    constructor() {
	        
	        this.error;
	        
	        this.Width = 0;
	        this.Height = 0;
	        this.horiz_scale = 0;
	        this.vert_scale = 0;
	        
	        this.frame_to_show;
	        this.yv12_fb = new Array(NUM_YV12_BUFFERS);
	        this.fb_idx_ref_cnt = [0 ,0 ,0 ,0];
	        
	        this.clamp_type = RECON_CLAMP_NOTREQUIRED;
	        
	        this.entropy_hdr = new FRAME_CONTEXT();
	        this.saved_entropy = new FRAME_CONTEXT();
	        
	        
	        this.is_keyframe = 0;
	        this.is_experimental = 0;
	        
	        this.show_frame = 0;

	        
	        
	        this.frame_size_updated = 0;
	        
	        this.mode_info_stride = 0;
	        
	        //line 108
	        this.base_qindex = 0; 
	        
	        this.delta_update = 0; 
	        
	        
	        this.y1dc_delta_q = 0; 
	        this.y2dc_delta_q = 0; 
	        this.y2ac_delta_q = 0; 
	        this.uvdc_delta_q = 0; 
	        this.uvac_delta_q = 0; 
	        
	        this.mip; // MODE_INFO
	        this.mi; //MODE_INFO
	        this.prev_mip; 
	        this.prev_mi;
	        
	        this.show_frame_mi;
	        
	        //Filter information
	        this.filter_type = NORMAL_LOOPFILTER;
	        
	        
	        
	        this.lf_info = null;
	        
	        this.level = 0;
	        this.sharpness = 0;
	        this.last_sharpness_level = 0;
	        
	        this.delta_enabled = 0;
	        this.ref_delta = new Int32Array(4);
	        this.mode_delta = new Int32Array(4);
	        
	        //reference information
	        this.refresh_last = 0;
	        this.refresh_gf = 0;
	        this.refresh_arf = 0;

	        this.copy_gf = 0; 
	        this.copy_arf = 0;
	        
	        this.refresh_entropy_probs = 0; 
	        
	        this.sign_bias = new Int32Array(4);
	        
	    
	        this.current_video_frame = 0;
	        
	        this.version = 0;
	    }

	}//vpx_codec_ctx_t


	module.exports = VP8_COMMON;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bitreader = __webpack_require__(7);
	var vpx_read = bitreader.vpx_read;
	var vpx_read_bit = bitreader.vpx_read_bit;

	class BOOL_DECODER {
	    
	    constructor() {
	        this.range = 0;
	        this.value = 0;
	        this.input = 0;
	        this.ptr = 0; //dont need
	        this.input_len = 0;
	        this.bit_count = 0;
	        this.buffer_end;
	        this.decrypt_cb;
	        this.decrypt_state;
	        this.clear_buffer;
	    }
	    
	    get_uint(bits){
	        return bool_get_uint(this, bits);
	    }
	    
	    get_int(bits){
	        return bool_get_int(this, bits);
	    }
	    
	    maybe_get_int(bits){
	        return bool_maybe_get_int(this, bits);
	    }
	    
	}
	    
	function vp8dx_start_decode(bool, start_partition, ptr, sz) {

	    if (sz >= 2) {
	        bool.value = (start_partition[ptr] << 8) | start_partition[ptr + 1];
	        bool.input = start_partition;
	        bool.ptr = (ptr + 2) | 0;
	        bool.input_len = (sz - 2) | 0;
	    } else {
	        bool.value = 0;
	        bool.input = null;
	        bool.input_len = 0;
	    }

	    bool.range = 255;
	    bool.bit_count = 0;
	}

	function get_uint(bool, bits) {
	    var z = 0;
	    var bit = 0;

	    for (bit = bits - 1; bit >= 0; bit--) {
	        z |= (vpx_read_bit(bool) << bit);
	    }

	    return z;
	}
	var bool_get_uint = get_uint;
	    
	/*
	 * bool_get_int
	 * vp8_decode_value
	 * @param {type} bits
	 * @returns {BoolDecoder.get_int.z|Number}
	 */
	function bool_get_int(bool, bits) {
	    var z = 0;
	    var bit = 0;

	    for (bit = bits - 1; bit >= 0; bit--)
	    {
	        z |= (vpx_read_bit(bool) << bit);
	    }

	    return vpx_read_bit(bool) ? -z : z;
	}

	function maybe_get_int(bool, bits) {

	    return vpx_read_bit(bool) ? bool.get_int(bits) : 0;
	}

	var bool_maybe_get_int = maybe_get_int;

	module.exports = {};
	module.exports.vp8dx_start_decode = vp8dx_start_decode;
	module.exports.bool_get_int = bool_get_int;
	//module.exports.maybe_get_int = maybe_get_int;

	module.exports.BOOL_DECODER = BOOL_DECODER;



/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';


	/**
	 * vp8dx_decode_bool
	 * bool_get
	 * @param {type} prob
	 * @returns {Number}
	 * vpx_read(vpx_reader *r, int prob) 
	 */
	function vpx_read(r, prob) {
	    
	    var split = 1 + (((r.range - 1) * prob) >> 8);
	    var SPLIT = split << 8;
	    var retval = 0;

	    if (r.value >= SPLIT) {
	        retval = 1;
	        r.range -= split;
	        r.value -= SPLIT;
	    } else {
	        retval = 0;
	        r.range = split;
	    }

	    while (r.range < 128) {
	        r.value <<= 1;
	        r.range <<= 1;
	        if (++r.bit_count === 8) {
	            r.bit_count = 0;
	            if (r.input_len) {
	                r.value |= r.input[r.ptr++];
	                r.input_len--;
	            }
	        }
	    }
	    return retval;
	}


	function vpx_read_bit(r) {

	    return vpx_read(r, 128); 

	}

	function vpx_read_literal(r, bits) {
	    var z = 0;
	    var bit = 0;

	    for (bit = bits - 1; bit >= 0; bit--) {
	        z |= (vpx_read_bit(r) << bit);
	    }

	    return z;
	}
	    
	module.exports = {};
	module.exports.vpx_read_bit = vpx_read_bit;
	module.exports.vpx_read = vpx_read;
	module.exports.vpx_read_literal = vpx_read_literal;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var MotionVector = __webpack_require__(9);

	//left_context_index
	var vp8_block2left =
	        new Uint8Array([
	            0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3,
	            4, 4, 5, 5, 6, 6, 7, 7, 8
	        ]);

	//above_context_index
	var vp8_block2above =
	        new Uint8Array([
	            0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3,
	            4, 5, 4, 5, 6, 7, 6, 7, 8
	        ]);
	        
	        


	var MAX_PARTITIONS = 8;

	//FRAGMENT_DATA 
	//supposed to go in VP8D_COMP
	class FRAGMENT_DATA {
	    
	    constructor(decoder) {
	        this.decoder = decoder;
	        this.partitions = 0;
	        this.partition_sz = new Int32Array(MAX_PARTITIONS);

	    }
	    
	}



	       
	/*
	 * likely MB_MODE_INFO
	 */
	class MODE_INFO {
	    //MB_MODE_INFO
	    constructor() {
	        //mv_mbmi_info
	        
	        this.mbmi = {
	            y_mode: 0, 
	            uv_mode: 0, 
	            ref_frame: 0,
	            is_4x4: 0,
	            mv: MotionVector.create(),
	            partitioning: 0, 
	            mb_skip_coeff: 0, 
	            need_mc_border: 0,
	            segment_id: 0,
	            eob_mask: 0
	        };
	        
	        this.bmi = null;


	    }

	    init_split_mode() {
	        var mvs = new Array(16);
	        var i = 16;
	        while (i--)
	            mvs[i] = MotionVector.create();

	        //Only needed for spit mode, maybe can skip initialization unless splitt mode is on
	        this.bmi =
	                {
	                    mvs: mvs,
	                    modes: new Uint8Array(16)//16,'todo:enum prediction_mode')
	                };
	    }
	}

	/*
	 */
	class MACROBLOCKD {

	    constructor(decoder) {
	        this.decoder = decoder;
	        this.enabled = 0;
	        this.update_data = 0;
	        this.update_map = 0;
	        this.abs = 0;
	        this.tree_probs = new Uint32Array(3);
	        this.lf_level = new Int32Array(4);
	        this.lf_level_64 = new Float64Array(this.lf_level.buffer);
	        this.quant_idx = new Int32Array(4);
	        this.quant_idx_64 = new Float64Array(this.quant_idx.buffer);


	    }
	}





	module.exports = {};

	module.exports.vp8_block2left = vp8_block2left;
	module.exports.vp8_block2above = vp8_block2above;
	module.exports.MACROBLOCKD = MACROBLOCKD;
	module.exports.FRAGMENT_DATA = FRAGMENT_DATA;
	module.exports.MODE_INFO = MODE_INFO;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	class MotionVector {

	    constructor() {
	        this.as_row_col = new Int16Array(2);
	        this.as_int = new Uint32Array(this.as_row_col.buffer);
	    }
	    
	    static create(){
	        var as_row_col = new Int16Array(2);
	        var as_int = new Uint32Array(as_row_col.buffer);
	        return {
	            'as_row_col' : as_row_col,
	            'as_int' : as_int
	        };
	    }
	}

	module.exports = MotionVector;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';


	var VPX_IMG_FMT_PLANAR = 0x100;
	var VPX_IMG_FMT_UV_FLIP = 0x200;
	var VPX_IMG_FMT_HAS_ALPHA = 0x400;

	//Image format codes
	var VPX_IMG_FMT_NONE = 0;
	var VPX_IMG_FMT_RGB24 = 1;
	var VPX_IMG_FMT_RGB32 = 2;
	var VPX_IMG_FMT_RGB565 = 3;
	var VPX_IMG_FMT_RGB555 = 4;
	var VPX_IMG_FMT_UYVY = 5;
	var VPX_IMG_FMT_YUY2 = 6;
	var VPX_IMG_FMT_YVYU = 7;
	var VPX_IMG_FMT_BGR24 = 8;
	var VPX_IMG_FMT_RGB32_LE = 9;
	var VPX_IMG_FMT_ARGB = 10;
	var VPX_IMG_FMT_ARGB_LE = 11;
	var VPX_IMG_FMT_RGB565_LE = 12;
	var VPX_IMG_FMT_RGB555_LE = 13;
	var VPX_IMG_FMT_YV12 = VPX_IMG_FMT_PLANAR | VPX_IMG_FMT_UV_FLIP | 1;
	var VPX_IMG_FMT_I420 = VPX_IMG_FMT_PLANAR | 2;
	var VPX_IMG_FMT_VPXYV12 = VPX_IMG_FMT_PLANAR | VPX_IMG_FMT_UV_FLIP | 3;
	var VPX_IMG_FMT_VPXI420 = VPX_IMG_FMT_PLANAR | 4;

	var VPX_PLANE_PACKED = 0;   /**< To be used for all packed formats */
	var VPX_PLANE_Y = 0;   /**< Y (Luminance) plane */
	var VPX_PLANE_U = 1;   /**< U (Chroma) plane */
	var VPX_PLANE_V = 2;   /**< V (Chroma) plane */
	var VPX_PLANE_ALPHA = 3;   /**< A (Transparency) plane */
	var PLANE_PACKED = VPX_PLANE_PACKED;
	var PLANE_Y = VPX_PLANE_Y;
	var PLANE_U = VPX_PLANE_U;
	var PLANE_V = VPX_PLANE_V;
	var PLANE_ALPHA = VPX_PLANE_ALPHA;


	Uint8ClampedArray.prototype.data_32 = null;
	Uint8Array.prototype.data_32 = null;
	/**
	 * typedef struct vpx_image
	 * vpx_image_t is alias for vpx_image
	 */
	class vpx_image_t {

	    constructor() {
	        this.fmt = 0; //can probably be uint

	        /* Image storage dimensions */
	        this.w = 0; // uint  struct0
	        this.h = 0; // uint  struct1

	        /* Image display dimensions */
	        this.d_w = 0; //uint struct2
	        this.d_h = 0; //uint struct3

	        /* Chroma subsampling info */
	        this.x_chroma_shift = 0; //uint
	        this.y_chroma_shift = 0; // uint

	        //this.planes = [0,0,0,0];//yuva
	        this.planes_off = new Int32Array(4); // yuva
	        this.stride = new Int32Array(4);

	        this.bps = 0; // int
	        this.user_priv = 0; 

	        this.img_data = null;
	        this.img_data_off = 0; //uint
	        this.img_data_owner = 0; //int
	        this.self_allocd = 0; //int
	           
	    }
	}


	function vpx_img_set_rect(img, x, y, w, h) {
	        var data = 0;
	        var data_off = 0;

	        if (x + w <= img.w && y + h <= img.h) {
	            img.d_w = w;
	            img.d_h = h;

	            /* Calculate plane pointers */
	            if ((img.fmt & VPX_IMG_FMT_PLANAR) === 0) {
	                img.img_data_off + (x * img.bps >> 3 + y * img.stride[VPX_PLANE_PACKED]) | 0;
	            } else {
	                data = img.img_data;
	                data_off = img.img_data_off;

	                if (img.fmt & VPX_IMG_FMT_HAS_ALPHA) {
	                    img.planes_off[VPX_PLANE_ALPHA] =
	                            data_off + x + y * img.stride[VPX_PLANE_ALPHA];
	                    data_off += img.h * img.stride[VPX_PLANE_ALPHA];
	                }


	                img.planes_off[VPX_PLANE_Y] = data_off + x + y * img.stride[VPX_PLANE_Y];
	                data_off += img.h * img.stride[VPX_PLANE_Y];

	                if (!(img.fmt & VPX_IMG_FMT_UV_FLIP)) {
	                    img.planes_off[VPX_PLANE_U] = data_off
	                            + (x >> img.x_chroma_shift)
	                            + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_U];
	                    data_off += (img.h >> img.y_chroma_shift) * img.stride[VPX_PLANE_U];
	                    img.planes_off[VPX_PLANE_V] = data_off
	                            + (x >> img.x_chroma_shift)
	                            + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_V];
	                } else {
	                    img.planes_off[VPX_PLANE_V] = data_off
	                            + (x >> img.x_chroma_shift)
	                            + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_V];
	                    data_off += (img.h >> img.y_chroma_shift) * img.stride[VPX_PLANE_V];
	                    img.planes_off[VPX_PLANE_U] = data_off
	                            + (x >> img.x_chroma_shift)
	                            + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_U];
	                }
	            }

	            return 0;
	        }

	        return -1;
	    }


	function img_alloc_helper(img, fmt, d_w, d_h, stride_align, img_data) {
	    var h = 0;
	    var w = 0;
	    var s = 0;
	    var xcs = 0;
	    var ycs = 0;
	    var bps = 0;
	    var align = 0;

	    /* Treat align==0 like align==1 */
	    if (!stride_align)
	        stride_align = 1;

	    /* Validate alignment (must be power of 2) */
	    if (stride_align & (stride_align - 1))
	        console.warn('Invalid stride align');

	    /* Get sample size for img format */
	    switch (fmt) {
	        case VPX_IMG_FMT_RGB32:
	        case VPX_IMG_FMT_RGB32_LE:
	        case VPX_IMG_FMT_ARGB:
	        case VPX_IMG_FMT_ARGB_LE:
	            bps = 32;
	            break;
	        case VPX_IMG_FMT_RGB24:
	        case VPX_IMG_FMT_BGR24:
	            bps = 24;
	            break;
	        case VPX_IMG_FMT_RGB565:
	        case VPX_IMG_FMT_RGB565_LE:
	        case VPX_IMG_FMT_RGB555:
	        case VPX_IMG_FMT_RGB555_LE:
	        case VPX_IMG_FMT_UYVY:
	        case VPX_IMG_FMT_YUY2:
	        case VPX_IMG_FMT_YVYU:
	            bps = 16;
	            break;
	        case VPX_IMG_FMT_I420:
	        case VPX_IMG_FMT_YV12:
	        case VPX_IMG_FMT_VPXI420:
	        case VPX_IMG_FMT_VPXYV12:
	            bps = 12;
	            break;
	        default:
	            bps = 16;
	            break;
	    }

	    /* Get chroma shift values for img format */
	    switch (fmt) {
	        case VPX_IMG_FMT_I420:
	        case VPX_IMG_FMT_YV12:
	        case VPX_IMG_FMT_VPXI420:
	        case VPX_IMG_FMT_VPXYV12:
	            xcs = 1;
	            break;
	        default:
	            xcs = 0;
	            break;
	    }

	    switch (fmt) {
	        case VPX_IMG_FMT_I420:
	        case VPX_IMG_FMT_YV12:
	        case VPX_IMG_FMT_VPXI420:
	        case VPX_IMG_FMT_VPXYV12:
	            ycs = 1;
	            break;
	        default:
	            ycs = 0;
	            break;
	    }

	    /* Calculate storage sizes given the chroma subsampling */
	    align = ((1 << xcs) - 1) | 0;
	    w = ((d_w + align) & ~align) | 0;
	    align = ((1 << ycs) - 1) | 0;
	    h = ((d_h + align) & ~align) | 0;
	    s = ((fmt & VPX_IMG_FMT_PLANAR) ? w : bps * w >> 3) | 0;
	    s = ((s + stride_align - 1) & ~(stride_align - 1)) | 0;

	    /* Allocate the new image */

	    //todo: reset


	    img.img_data = img_data;

	    if (img_data === null) {

	    } else {
	        var size = 0;
	        if ((fmt & VPX_IMG_FMT_PLANAR) === 0) {
	            size = h * s;
	        } else {

	            size = (h * w * bps) >> 3;
	        }
	        //img.img_data = new Uint8ClampedArray(size);
	        img.img_data = new Uint8Array(size);
	        img.img_data.data_32 = new Uint32Array(img.img_data.buffer);
	        img.img_data_owner = 1;
	    }


	    img.fmt = fmt;
	    img.w = w;
	    img.h = h;
	    img.x_chroma_shift = xcs;
	    img.y_chroma_shift = ycs;
	    img.bps = bps;

	    /* Calculate strides */
	    img.stride[VPX_PLANE_Y] = img.stride[VPX_PLANE_ALPHA] = s;
	    img.stride[VPX_PLANE_U] = img.stride[VPX_PLANE_V] = s >> xcs;

	    /* Default viewport to entire image */
	    if (vpx_img_set_rect(img, 0, 0, d_w, d_h) === 0)
	        return img;

	}


	module.exports = {};
	module.exports.vpx_img_set_rect = vpx_img_set_rect;
	module.exports.img_alloc_helper = img_alloc_helper;
	module.exports.vpx_image_t = vpx_image_t;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var decodeframe = __webpack_require__(12);
	var vp8_decode_frame = decodeframe.vp8_decode_frame;

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

	function vp8_dixie_ref_frame(rcimg) {
	    
	    rcimg.ref_cnt++;
	    return rcimg;
	    
	}

	function vp8dx_receive_compressed_data(pbi, size, source, time_stamp){
	    
	    var retcode = 0;
	    //console.log("Compressed data called");
	    retcode = vp8_decode_frame(source , pbi);
	    
	    swap_frame_buffers(pbi);
	    
	}


	//vp8_dixie_release_ref_frame
	//vp8_dixie_ref_frame
	function ref_cnt_fb(buf, idx, new_idx) {
	    if (buf[idx] > 0)
	        buf[idx]--;

	    idx = new_idx;

	    buf[new_idx]++;
	}

	function swap_frame_buffers(cm){
	    var err = 0;
	    
	    
	    
	    /* Handle reference frame updates */
	    if (cm.common.copy_arf === 1) {
	        
	        vp8_dixie_release_ref_frame(cm.ref_frames[ALTREF_FRAME]);
	        cm.ref_frames[ALTREF_FRAME] =
	                vp8_dixie_ref_frame(cm.ref_frames[LAST_FRAME]);
	        
	        
	        //ref_cnt_fb( ALTREF_FRAME, LAST_FRAME);
	    } else if (cm.common.copy_arf === 2) {
	        
	        vp8_dixie_release_ref_frame(cm.ref_frames[ALTREF_FRAME]);
	        cm.ref_frames[ALTREF_FRAME] =
	                vp8_dixie_ref_frame(cm.ref_frames[GOLDEN_FRAME]);
	        
	    }
	    
	    

	    if (cm.common.copy_gf === 1)
	    {
	        vp8_dixie_release_ref_frame(cm.ref_frames[GOLDEN_FRAME]);
	        cm.ref_frames[GOLDEN_FRAME] =
	                vp8_dixie_ref_frame(cm.ref_frames[LAST_FRAME]);
	    } else if (cm.common.copy_gf === 2)
	    {
	        vp8_dixie_release_ref_frame(cm.ref_frames[GOLDEN_FRAME]);
	        cm.ref_frames[GOLDEN_FRAME] =
	                vp8_dixie_ref_frame(cm.ref_frames[ALTREF_FRAME]);
	    }

	    if (cm.common.refresh_gf === 1)
	    {
	        vp8_dixie_release_ref_frame(cm.ref_frames[GOLDEN_FRAME]);
	        cm.ref_frames[GOLDEN_FRAME] =
	                vp8_dixie_ref_frame(cm.ref_frames[CURRENT_FRAME]);
	    }

	    if (cm.common.refresh_arf === 1)
	    {
	        vp8_dixie_release_ref_frame(cm.ref_frames[ALTREF_FRAME]);
	        cm.ref_frames[ALTREF_FRAME] =
	                vp8_dixie_ref_frame(cm.ref_frames[CURRENT_FRAME]);
	    }

	    if (cm.common.refresh_last === 1)
	    {
	        vp8_dixie_release_ref_frame(cm.ref_frames[LAST_FRAME]);
	        cm.ref_frames[LAST_FRAME] =
	                vp8_dixie_ref_frame(cm.ref_frames[CURRENT_FRAME]);
	    }


	    
	}


	module.exports = {
	    vp8dx_receive_compressed_data:vp8dx_receive_compressed_data
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var vp8_loopfilter = __webpack_require__(13);
	var vp8_loop_filter_row_simple = vp8_loopfilter.vp8_loop_filter_row_simple;
	var vp8_loop_filter_row_normal = vp8_loopfilter.vp8_loop_filter_row_normal;

	var detokenize = __webpack_require__(15);
	var decode_mb_tokens = detokenize.decode_mb_tokens;
	var vp8_reset_mb_tokens_context = detokenize.vp8_reset_mb_tokens_context;

	var bitreader = __webpack_require__(7);
	var vpx_read = bitreader.vpx_read;
	var vpx_read_bit = bitreader.vpx_read_bit;

	var entropymv = __webpack_require__(17);
	var vp8_default_mv_context = entropymv.vp8_default_mv_context;


	var entropy = __webpack_require__(18);
	var vp8_default_coef_probs = entropy.vp8_default_coef_probs;

	var quant_common = __webpack_require__(20);
	var vp8_dc_quant = quant_common.vp8_dc_quant;
	var vp8_dc2quant = quant_common.vp8_dc2quant;
	var vp8_dc_uv_quant = quant_common.vp8_dc_uv_quant;
	var vp8_ac_yquant = quant_common.vp8_ac_yquant;
	var vp8_ac2quant = quant_common.vp8_ac2quant;
	var vp8_ac_uv_quant = quant_common.vp8_ac_uv_quant;

	var reconinter = __webpack_require__(21);
	var vp8_build_inter_predictors_mb = reconinter.vp8_build_inter_predictors_mb;

	var reconintra = __webpack_require__(24);
	var predict_intra_chroma = reconintra.predict_intra_chroma;
	var predict_intra_luma = reconintra.predict_intra_luma;

	var dboolhuff = __webpack_require__(6);
	var vp8dx_start_decode = dboolhuff.vp8dx_start_decode;

	var decodemv = __webpack_require__(26);
	var vp8_decode_mode_mvs = decodemv.vp8_decode_mode_mvs;

	var entropymode = __webpack_require__(30);
	var vp8_init_mbmode_probs = entropymode.vp8_init_mbmode_probs;

	var vpx_image = __webpack_require__(10);
	var vpx_img_set_rect = vpx_image.vpx_img_set_rect;
	var img_alloc_helper = vpx_image.img_alloc_helper;

	var filter = __webpack_require__(22);
	var vp8_sub_pel_filters = filter.vp8_sub_pel_filters;
	var vp8_bilinear_filters = filter.vp8_bilinear_filters;

	var c_utils = __webpack_require__(16);
	var copy_entropy_values = c_utils.copy_entropy_values;
	var memset = c_utils.memset;
	var memset_32 = c_utils.memset_32;

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

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var loopfilter_filters = __webpack_require__(14);
	var vp8_filter = loopfilter_filters.vp8_filter;
	var vp8_loop_filter_bhs_c = loopfilter_filters.vp8_loop_filter_bhs_c;
	var vp8_loop_filter_simple_horizontal_edge_c = loopfilter_filters.vp8_loop_filter_simple_horizontal_edge_c;
	var vp8_loop_filter_bvs_c = loopfilter_filters.vp8_loop_filter_bvs_c;
	var vp8_loop_filter_simple_vertical_edge_c = loopfilter_filters.vp8_loop_filter_simple_vertical_edge_c;
	var vp8_loop_filter_mbv = loopfilter_filters.vp8_loop_filter_mbv;
	var vp8_loop_filter_bv_c = loopfilter_filters.vp8_loop_filter_bv_c;
	var filter_mb_edge = loopfilter_filters.filter_mb_edge;
	var normal_threshold = loopfilter_filters.normal_threshold;
	var high_edge_variance = loopfilter_filters.high_edge_variance;

	var CURRENT_FRAME = 0;

	var VPX_PLANE_PACKED = 0;   /**< To be used for all packed formats */
	var VPX_PLANE_Y = 0;   /**< Y (Luminance) plane */
	var VPX_PLANE_U = 1;   /**< U (Chroma) plane */
	var VPX_PLANE_V = 2;   /**< V (Chroma) plane */

	var PLANE_Y = VPX_PLANE_Y;
	var PLANE_U = VPX_PLANE_U;
	var PLANE_V = VPX_PLANE_V;

	var B_PRED = 4; /* block mbmid prediction, each block has its own prediction mode */
	var ZEROMV = 7;
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
	    var mb_cols = ctx.mb_cols;

	        

	    for (col = 0; col < mb_cols; col++) {


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
	            var use_filter = mbi[mbi_off].mbmi.eob_mask
	                    || mbi[mbi_off].mbmi.y_mode === SPLITMV
	                    || mbi[mbi_off].mbmi.y_mode === B_PRED;
	            
	            if (col > 0)
	                vp8_loop_filter_mbv(y, y_off, u_off, v_off, stride, uv_stride, edge_limit, interior_limit, hev_threshold);


	            //vp8_loop_filter_bv_c
	            if (use_filter)
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

	            if (use_filter)
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

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	//var abs = Math.abs;

	function abs(value ){
	    return (value ^ (value >> 31)) - (value >> 31);
	}

	function saturate_int8(x) {

	    //return min(max(x, -128), 127);
	    return Math.min(Math.max(x, -128), 127);

	}

	function saturate_uint8(x) {
	    //return min(max(x, 0), 255);
	    return Math.min(Math.max(x, 0), 255);
	}

	//possible vp8_simple_filter
	function vp8_filter(pixels, pixels_off, stride, use_outer_taps) {
	    var stride2 = 2 * stride;
	    var p1 = pixels[pixels_off - stride2];
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


	    

	    //f1 = ((a + 4 > 127) ? 127 : a + 4) >> 3;
	    if((a + 4) > 127){
	        f1 = 15;
	        f2 = 15;
	    }else{
	        f1 = (a + 4) >> 3;
	        f2 = (a + 3) >> 3;
	    }
	    

	    

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

	    pixels[pixels_off - stride2] = p1;
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
	    var E = edge_limit;
	    var I = interior_limit;

	    if (simple_threshold(pixels, pixels_off, stride, 2 * E + I) === 0)
	        return 0;

	    var p3 = pixels[pixels_off - 4 * stride];
	    var p2 = pixels[pixels_off - 3 * stride];

	    if (abs(p3 - p2) > I)
	        return 0;

	    var p1 = pixels[pixels_off - 2 * stride];


	    if (abs(p2 - p1) > I)
	        return 0;

	    var p0 = pixels[pixels_off - stride];
	   
	    if(abs(p1 - p0) > I)
	        return 0;
	 
	    var q2 = pixels[pixels_off + 2 * stride];
	    var q3 = pixels[pixels_off + 3 * stride];
	    
	    if(abs(q3 - q2) > I)
	        return 0;
	    
	    var q0 = pixels[pixels_off];
	    var q1 = pixels[pixels_off + stride];
	    
	    if(abs(q2 - q1) > I)
	        return 0;
	    
	    
	    return abs(q1 - q0) <= I;
	    
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
	    

	    if(abs(p1 - p0) > hev_threshold)
	        return 1;
	    
	    var q0 = pixels[pixels_off];
	    var q1 = pixels[pixels_off + stride];
	    
	    return abs(q1 - q0) > hev_threshold;

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
	            
	            vp8_filter(src, src_off, 1, high_edge_variance(src, src_off, 1, hev_threshold));


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
	module.exports.filter_mb_edge = filter_mb_edge;
	module.exports.normal_threshold = normal_threshold;
	module.exports.high_edge_variance = high_edge_variance;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var blockd = __webpack_require__(8);
	var vp8_block2left = blockd.vp8_block2left;
	var vp8_block2above = blockd.vp8_block2above;

	var bitreader = __webpack_require__(7);
	var vpx_read = bitreader.vpx_read;
	var vpx_read_bit = bitreader.vpx_read_bit;

	var c_utils = __webpack_require__(16);
	var memset = c_utils.memset;

	var B_PRED = 4;
	var SPLITMV = 9;

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
	var context_clear = new Uint32Array(8);
	function vp8_reset_mb_tokens_context(left, above, mode) {
	    /* Reset the macroblock context on the left and right. We have to
	     * preserve the context of the second order block if this mode
	     * would not have updated it.
	     */
	    left.set(context_clear);
	    above.set(context_clear);
	    //memset(left, 0, 0, 8);
	    //memset(above, 0, 0, 8);



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

	function DECODE_EXTRABIT_AND_ADJUST_VAL(t, bits_count) {
	    val += vpx_read(global_bool, extrabits[t].probs[bits_count]) << bits_count;
	}


	function DECODE_AND_LOOP_IF_ZERO(probability, branch) {
	    if (!vpx_read(global_bool, probability))
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


	function decode_mb_tokens(bool, left,
	        above,
	        tokens,
	        tokens_off,
	        mode,
	        probs, factor) {

	    global_bool = bool;









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

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	var MV_PROB_CNT = 19;

	function copy_entropy_values(header, otherHeader) {

	    var probs = otherHeader.coeff_probs.data_32;
	    var to = header.coeff_probs.data_32;
	    //header.coeff_probs = otherHeader.coeff_probs.slice(0);
	    for (var i = 0; i < 264; i++)
	        to[i] = probs[i];

	    //load mv probs
	    probs = otherHeader.mv_probs;
	    //header can probably be done faster
	    for (var i = 0; i < MV_PROB_CNT; i++)
	        header.mv_probs[0][i] = probs[0][i];

	    for (var i = 0; i < MV_PROB_CNT; i++)
	        header.mv_probs[1][i] = probs[1][i];

	    //load y mode probs
	    probs = otherHeader.y_mode_probs_32;
	    header.y_mode_probs_32[0] = probs[0];



	    //load uv mode probs
	    probs = otherHeader.uv_mode_probs;
	    //for (var i = 0; i < 3; i++)
	    header.uv_mode_probs[0] = probs[0];
	    header.uv_mode_probs[1] = probs[1];
	    header.uv_mode_probs[2] = probs[2];


	    header.prob_inter = otherHeader.prob_inter;
	    header.prob_last = otherHeader.prob_inter;
	    header.prob_gf = otherHeader.prob_inter;
	}

	function memset(ptr, ptr_off, value, num) {

	    var i = num;
	    while (i--)
	        ptr[ptr_off + i] = value;
	        
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

	function memcpy(dst, dst_off, src, src_off, num) {
	    dst.set(src.subarray(src_off, src_off + num) , dst_off);
	    /*
	    var i = num;
	    while (i--) {
	        dst[dst_off + i] = src[src_off + i];
	    }
	    */
	    return dst;

	}


	module.exports = {};
	module.exports.copy_entropy_values = copy_entropy_values;
	module.exports.memset = memset;
	module.exports.memset_32 = memset_32;
	module.exports.memcpy = memcpy;


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';


	//k_mv_entropy_update_probs
	var vp8_mv_update_probs =
	        [
	            new Uint8Array([
	                237,
	                246,
	                253, 253, 254, 254, 254, 254, 254,
	                254, 254, 254, 254, 254, 250, 250, 252, 254, 254
	            ]),
	            new Uint8Array([
	                231,
	                243,
	                245, 253, 254, 254, 254, 254, 254,
	                254, 254, 254, 254, 254, 251, 251, 254, 254, 254
	            ])
	        ];


	//k_default_mv_probs
	var vp8_default_mv_context =
	        [
	            new Uint8Array([// row
	                162, // is short
	                128, // sign
	                225, 146, 172, 147, 214, 39, 156, // short tree
	                128, 129, 132, 75, 145, 178, 206, 239, 254, 254 // long bits
	            ]),
	            new Uint8Array([
	                164,
	                128,
	                204, 170, 119, 235, 140, 230, 228,
	                128, 130, 130, 74, 148, 180, 203, 236, 254, 254

	            ])
	        ];



	module.exports = {};
	module.exports.vp8_mv_update_probs = vp8_mv_update_probs;
	module.exports.vp8_default_mv_context = vp8_default_mv_context;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var default_coef_probs = __webpack_require__(19);
	var default_coef_probs_32 = default_coef_probs.data_32;
	var default_coef_probs_64 = default_coef_probs.data_64;

	function vp8_default_coef_probs(pc) {

	    //for (var i = 0; i < 1056; i++)
	    //pc.entropy_hdr.coeff_probs[i] = default_coef_probs[i];

	/*
	    var to = pc.entropy_hdr.coeff_probs.data_32;
	    for (var i = 0; i < 264; i++)
	        to[i] = default_coef_probs_32[i];
	     */
	    pc.entropy_hdr.coeff_probs.data_64.set(default_coef_probs_64);
	    /*
	    var to = pc.entropy_hdr.coeff_probs.data_64;
	    for (var i = 0; i < 132; i++)
	        to[i] = default_coef_probs_64[i];
	      */
	}

	module.exports = {
	    vp8_default_coef_probs : vp8_default_coef_probs
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	var default_coef_probs = new Uint8Array([128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 253, 136, 254, 255, 228, 219, 128, 128, 128, 128, 128, 189, 129, 242, 255, 227, 213, 255, 219, 128, 128, 128, 106, 126, 227, 252, 214, 209, 255, 255, 128, 128, 128, 1, 98, 248, 255, 236, 226, 255, 255, 128, 128, 128, 181, 133, 238, 254, 221, 234, 255, 154, 128, 128, 128, 78, 134, 202, 247, 198, 180, 255, 219, 128, 128, 128, 1, 185, 249, 255, 243, 255, 128, 128, 128, 128, 128, 184, 150, 247, 255, 236, 224, 128, 128, 128, 128, 128, 77, 110, 216, 255, 236, 230, 128, 128, 128, 128, 128, 1, 101, 251, 255, 241, 255, 128, 128, 128, 128, 128, 170, 139, 241, 252, 236, 209, 255, 255, 128, 128, 128, 37, 116, 196, 243, 228, 255, 255, 255, 128, 128, 128, 1, 204, 254, 255, 245, 255, 128, 128, 128, 128, 128, 207, 160, 250, 255, 238, 128, 128, 128, 128, 128, 128, 102, 103, 231, 255, 211, 171, 128, 128, 128, 128, 128, 1, 152, 252, 255, 240, 255, 128, 128, 128, 128, 128, 177, 135, 243, 255, 234, 225, 128, 128, 128, 128, 128, 80, 129, 211, 255, 194, 224, 128, 128, 128, 128, 128, 1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 246, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 255, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 198, 35, 237, 223, 193, 187, 162, 160, 145, 155, 62, 131, 45, 198, 221, 172, 176, 220, 157, 252, 221, 1, 68, 47, 146, 208, 149, 167, 221, 162, 255, 223, 128, 1, 149, 241, 255, 221, 224, 255, 255, 128, 128, 128, 184, 141, 234, 253, 222, 220, 255, 199, 128, 128, 128, 81, 99, 181, 242, 176, 190, 249, 202, 255, 255, 128, 1, 129, 232, 253, 214, 197, 242, 196, 255, 255, 128, 99, 121, 210, 250, 201, 198, 255, 202, 128, 128, 128, 23, 91, 163, 242, 170, 187, 247, 210, 255, 255, 128, 1, 200, 246, 255, 234, 255, 128, 128, 128, 128, 128, 109, 178, 241, 255, 231, 245, 255, 255, 128, 128, 128, 44, 130, 201, 253, 205, 192, 255, 255, 128, 128, 128, 1, 132, 239, 251, 219, 209, 255, 165, 128, 128, 128, 94, 136, 225, 251, 218, 190, 255, 255, 128, 128, 128, 22, 100, 174, 245, 186, 161, 255, 199, 128, 128, 128, 1, 182, 249, 255, 232, 235, 128, 128, 128, 128, 128, 124, 143, 241, 255, 227, 234, 128, 128, 128, 128, 128, 35, 77, 181, 251, 193, 211, 255, 205, 128, 128, 128, 1, 157, 247, 255, 236, 231, 255, 255, 128, 128, 128, 121, 141, 235, 255, 225, 227, 255, 255, 128, 128, 128, 45, 99, 188, 251, 195, 217, 255, 224, 128, 128, 128, 1, 1, 251, 255, 213, 255, 128, 128, 128, 128, 128, 203, 1, 248, 255, 255, 128, 128, 128, 128, 128, 128, 137, 1, 177, 255, 224, 255, 128, 128, 128, 128, 128, 253, 9, 248, 251, 207, 208, 255, 192, 128, 128, 128, 175, 13, 224, 243, 193, 185, 249, 198, 255, 255, 128, 73, 17, 171, 221, 161, 179, 236, 167, 255, 234, 128, 1, 95, 247, 253, 212, 183, 255, 255, 128, 128, 128, 239, 90, 244, 250, 211, 209, 255, 255, 128, 128, 128, 155, 77, 195, 248, 188, 195, 255, 255, 128, 128, 128, 1, 24, 239, 251, 218, 219, 255, 205, 128, 128, 128, 201, 51, 219, 255, 196, 186, 128, 128, 128, 128, 128, 69, 46, 190, 239, 201, 218, 255, 228, 128, 128, 128, 1, 191, 251, 255, 255, 128, 128, 128, 128, 128, 128, 223, 165, 249, 255, 213, 255, 128, 128, 128, 128, 128, 141, 124, 248, 255, 255, 128, 128, 128, 128, 128, 128, 1, 16, 248, 255, 255, 128, 128, 128, 128, 128, 128, 190, 36, 230, 255, 236, 255, 128, 128, 128, 128, 128, 149, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 1, 226, 255, 128, 128, 128, 128, 128, 128, 128, 128, 247, 192, 255, 128, 128, 128, 128, 128, 128, 128, 128, 240, 128, 255, 128, 128, 128, 128, 128, 128, 128, 128, 1, 134, 252, 255, 255, 128, 128, 128, 128, 128, 128, 213, 62, 250, 255, 255, 128, 128, 128, 128, 128, 128, 55, 93, 255, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 202, 24, 213, 235, 186, 191, 220, 160, 240, 175, 255, 126, 38, 182, 232, 169, 184, 228, 174, 255, 187, 128, 61, 46, 138, 219, 151, 178, 240, 170, 255, 216, 128, 1, 112, 230, 250, 199, 191, 247, 159, 255, 255, 128, 166, 109, 228, 252, 211, 215, 255, 174, 128, 128, 128, 39, 77, 162, 232, 172, 180, 245, 178, 255, 255, 128, 1, 52, 220, 246, 198, 199, 249, 220, 255, 255, 128, 124, 74, 191, 243, 183, 193, 250, 221, 255, 255, 128, 24, 71, 130, 219, 154, 170, 243, 182, 255, 255, 128, 1, 182, 225, 249, 219, 240, 255, 224, 128, 128, 128, 149, 150, 226, 252, 216, 205, 255, 171, 128, 128, 128, 28, 108, 170, 242, 183, 194, 254, 223, 255, 255, 128, 1, 81, 230, 252, 204, 203, 255, 192, 128, 128, 128, 123, 102, 209, 247, 188, 196, 255, 233, 128, 128, 128, 20, 95, 153, 243, 164, 173, 255, 203, 128, 128, 128, 1, 222, 248, 255, 216, 213, 128, 128, 128, 128, 128, 168, 175, 246, 252, 235, 205, 255, 255, 128, 128, 128, 47, 116, 215, 255, 211, 212, 255, 255, 128, 128, 128, 1, 121, 236, 253, 212, 214, 255, 255, 128, 128, 128, 141, 84, 213, 252, 201, 202, 255, 219, 128, 128, 128, 42, 80, 160, 240, 162, 185, 255, 205, 128, 128, 128, 1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 244, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 238, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128]);
	default_coef_probs.data_32 = new Uint32Array(default_coef_probs.buffer);
	default_coef_probs.data_64 = new Float64Array(default_coef_probs.buffer);

	module.exports = default_coef_probs;



/***/ },
/* 20 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

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

	var dc_qlookup3 =
	        new Int32Array([8, 10, 12, 14, 16, 18, 20, 20, 22, 24, 26, 28, 30, 32, 34, 34, 36, 38, 40, 40, 42, 42, 44, 44, 46, 46, 48, 50, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 182, 186, 190, 192, 196, 200, 202, 204, 208, 212, 216, 220, 224, 228, 232, 236, 244, 248, 252, 256, 260, 264, 268, 272, 276, 280, 286, 290, 296, 302, 308, 314]);
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

	var ac_qlookup2 = new Int32Array([8, 8, 9, 10, 12, 13, 15, 17, 18, 20, 21, 23, 24, 26, 27, 29, 31, 32, 34, 35, 37, 38, 40, 41, 43, 44, 46, 48, 49, 51, 52, 54, 55, 57, 58, 60, 62, 63, 65, 66, 68, 69, 71, 72, 74, 75, 77, 79, 80, 82, 83, 85, 86, 88, 89, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120, 124, 127, 130, 133, 136, 139, 142, 145, 148, 151, 155, 158, 161, 164, 167, 170, 173, 176, 179, 184, 189, 193, 198, 203, 207, 212, 217, 221, 226, 230, 235, 240, 244, 249, 254, 258, 263, 268, 274, 280, 286, 292, 299, 305, 311, 317, 323, 330, 336, 342, 348, 354, 362, 370, 379, 385, 393, 401, 409, 416, 424, 432, 440]);


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

	    retval = dc_qlookup3[QIndex];
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

	function QuantModule(stdlib, foreign, heap) {
	    "use asm";

	    var HEAP32 = new stdlib.Int32Array(heap);


	    // this is what we're validating
	    function vp8_ac_uv_quant(QIndex, Delta) {
	        QIndex = QIndex | 0;
	        Delta = Delta | 0;
	        var res = 0;

	        QIndex = QIndex + Delta | 0;

	        if ((QIndex | 0) > 127) {
	            return 284 | 0;
	        } else if ((QIndex | 0) < 0) {
	            return 4 | 0;
	        }

	        return HEAP32[(QIndex << 2 )>> 2] |0;
	    }

	    return {vp8_ac_uv_quant: vp8_ac_uv_quant};
	}

	var stdlib;
	if(typeof window !== 'undefined'){
	    stdlib = window;
	}else if(typeof self !== 'undefined'){
	    stdlib = self;
	}if(typeof global !== 'undefined'){
	    stdlib = global;
	}

	var moduleBuffer = new Uint32Array(16384);
	moduleBuffer.set(ac_qlookup);
	var quantModule = QuantModule(stdlib, {}, moduleBuffer.buffer);

	module.exports = {};
	module.exports.vp8_dc_quant = vp8_dc_quant;
	module.exports.vp8_dc2quant = vp8_dc2quant;
	module.exports.vp8_dc_uv_quant = vp8_dc_uv_quant;
	module.exports.vp8_ac_yquant = vp8_ac_yquant;
	module.exports.vp8_ac2quant = vp8_ac2quant;
	module.exports.vp8_ac_uv_quant = quantModule.vp8_ac_uv_quant;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var MotionVector = __webpack_require__(9);

	var filter = __webpack_require__(22);
	var filter_block2d = filter.filter_block2d;

	var SPLITMV = 9;

	var idctllm = __webpack_require__(23);
	var vp8_short_inv_walsh4x4_c = idctllm.vp8_short_inv_walsh4x4_c;
	var vp8_short_idct4x4llm_c = idctllm.vp8_short_idct4x4llm_c;

	var c_utils = __webpack_require__(16);
	var memset = c_utils.memset;
	var memcpy = c_utils.memcpy;




	//Keep from having to redeclare this
	var chroma_mv = [
	        MotionVector.create(),
	        MotionVector.create(),
	        MotionVector.create(),
	        MotionVector.create()
	    ];
	    
	    
	    //build_inter_predictors4b
	function predict_inter_emulated_edge(ctx,
	        img, coeffs, coeffs_off, mbi, mb_col, mb_row) {


	    var emul_block = ctx.frame_strg[0].img.img_data;
	    var emul_block_off = ctx.frame_strg[0].img.img_data_off;
	    
	    var reference = 0;
	    var reference_off = 0;
	    var output = 0;
	    var output_off = 0;
	    var reference_offset = 0;
	    var w = 0, h = 0, x = 0, y = 0, b = 0;

	    

	    var ref_frame = mbi.mbmi.ref_frame;
	    
	    var u = img.u, v = img.v;
	    var u_off = img.u_off;
	    var v_off = img.v_off;
	    var full_pixel = (ctx.common.version === 3) + 0;

	    x = mb_col << 4;
	    y = mb_row << 4;
	    w = ctx.mb_cols << 4;
	    h = ctx.mb_rows << 4;

	    output = img.y;
	    output_off = img.y_off;

	    reference_off = output_off + reference_offset;
	    var mode = mbi.mbmi.y_mode;
	    var mvs = mbi.bmi.mvs;

	    reference_offset = ctx.ref_frame_offsets[ref_frame];
	    reference = ctx.ref_frame_offsets_[ref_frame];
	    
	 

	    // Luma 
	    for (b = 0; b < 16; b++) {
	        
	        var ymv;

	        if (mode !== SPLITMV)
	            ymv = mbi.mbmi.mv;
	        else
	            ymv = mvs[b];

	        recon_1_edge_block(output, output_off, emul_block, emul_block_off, reference, reference_off, img.stride,
	                ymv, ctx.subpixel_filters,
	                coeffs, coeffs_off, mbi, x, y, w, h, b);

	        x += 4;
	        output_off += 4;
	        reference_off += 4;

	        if ((b & 3) === 3) {
	            x -= 16;
	            y += 4;
	            output_off += (img.stride << 2) - 16;
	            reference_off += (img.stride << 2)  - 16;
	        }
	        
	    }

	    x = mb_col << 4;
	    y = mb_row << 4;

	    // Chroma 
	    x >>= 1;
	    y >>= 1;
	    w >>= 1;
	    h >>= 1;

	    //if (mbi.mbmi.y_mode !== SPLITMV)
	    //{
	    var uv_stride_4_8 = 4 * img.uv_stride - 8;
	    
	    for (b = 0; b < 4; b++) {

	        recon_1_edge_block(u, u_off, emul_block, emul_block_off, reference, u_off + reference_offset, //u
	                img.uv_stride,
	                chroma_mv[b], ctx.subpixel_filters,
	                coeffs, coeffs_off, mbi, x, y, w, h, b + 16);


	        recon_1_edge_block(v, v_off, emul_block, emul_block_off, reference, v_off + reference_offset, //v
	                img.uv_stride,
	                chroma_mv[b], ctx.subpixel_filters,
	                coeffs, coeffs_off, mbi, x, y, w, h, b + 20);


	        u_off += 4;
	        v_off += 4;
	        x += 4;

	        if ((b & 1) === 1) {
	            x -= 8;
	            y += 4;
	            u_off += uv_stride_4_8;
	            v_off += uv_stride_4_8;
	        }

	    }
	    //}

	}



	function build_4x4uvmvs(mbi, full_pixel) {
	    var mvs = mbi.bmi.mvs;
	    for (var i = 0; i < 2; ++i) {
	        for (var j = 0; j < 2; ++j) {

	            var b = (i << 3) + (j  << 1);
	            var chroma_ptr = (i << 1) + j;
	            var chroma_mv_cache = chroma_mv[chroma_ptr];
	            
	            var temp = 0;

	            

	            temp = mvs[b].as_row_col[0] +
	                    mvs[b + 1].as_row_col[0] +
	                    mvs[b + 4].as_row_col[0] +
	                    mvs[b + 5].as_row_col[0];

	            if (temp < 0)
	                temp -= 4;
	            else
	                temp += 4;

	            chroma_mv_cache.as_row_col[0] = (temp / 8 ) | 0;

	            temp = mvs[b].as_row_col[1] +
	                    mvs[b + 1].as_row_col[1] +
	                    mvs[b + 4].as_row_col[1] +
	                    mvs[b + 5].as_row_col[1];

	            if (temp < 0)
	                temp -= 4;
	            else
	                temp += 4;

	            chroma_mv_cache.as_row_col[1] = (temp / 8) | 0;

	            if (full_pixel === 1) {
	                chroma_mv_cache.as_int[0] &= 0xFFF8FFF8;

	            }


	        }
	    }
	}




	function build_mc_border(dst, dst_off, src, src_off, stride, x, y, b_w, b_h, w, h) {
	    var ref_row = 0;
	    var ref_row_off = 0;
	    
	    /* Get a pointer to the start of the real data for this row */
	    ref_row = src;
	    ref_row_off = src_off - x - y * stride;

	    if (y >= h)
	        ref_row_off += (h - 1) * stride;
	    else if (y > 0)
	        ref_row_off += y * stride;

	    do {
	        var left = 0, right = 0, copy = 0;


	        if (x < 0) {
	            left = -x;
	        } else {
	            left = 0;
	        }

	        if (left > b_w)
	            left = b_w;

	        if (x + b_w > w)
	            right = x + b_w - w;

	        if (right > b_w)
	            right = b_w;

	        copy = b_w - left - right;
	        
	        if (left > 0)
	            memset(dst, dst_off, ref_row[ref_row_off], left);

	        if (copy > 0)
	            memcpy(dst, dst_off + left, ref_row, ref_row_off + x + left, copy);

	        if (right > 0)
	            memset(dst, dst_off + left + copy, ref_row[ref_row_off + w - 1], right);

	        dst_off += stride;
	        y++;

	        if (y < h && y > 0)
	            ref_row_off += stride;
	    } while (--b_h);
	}

	var uvmv = MotionVector.create();

	function predict_inter(ctx, img, coeffs, coeffs_off, mbi) {
	    var y, u , v;
	    var y = u = v =  img.y;
	    var y_off = img.y_off;
	    var u_off = img.u_off;
	    var v_off = img.v_off;
	    var reference;
	    var reference_offset = 0;

	    var full_pixel = (ctx.common.version === 3) + 0;
	    var b = 0;

	    var mbmi_cache = mbi.mbmi;
	    var mode = mbmi_cache.y_mode;
	    

	    reference_offset = ctx.ref_frame_offsets[mbi.mbmi.ref_frame];
	    reference = ctx.ref_frame_offsets_[mbi.mbmi.ref_frame];
	    var stride = img.stride;
	    var subpixel_filters = ctx.subpixel_filters;

	    var mvs = mbi.bmi.mvs;
	    for (b = 0; b < 16; b++) {
	        var ymv;

	        if (mode !== SPLITMV)
	            ymv = mbmi_cache.mv;
	        else
	            ymv = mvs[b];


	        recon_1_block(y, y_off, reference, y_off + reference_offset, stride, //y
	                ymv, subpixel_filters, coeffs, coeffs_off, mbi, b);
	        y_off += 4;

	        if ((b & 3) === 3)
	            y_off += (img.stride << 2) - 16;
	    }

	    var uv_stride = img.uv_stride;
	    
	    for (b = 0; b < 4; b++) {

	        
	        recon_1_block(u, u_off, reference, u_off + reference_offset, //u
	                uv_stride, chroma_mv[b],
	                subpixel_filters, coeffs, coeffs_off, mbi, b + 16);

	        recon_1_block(v, v_off, reference, v_off + reference_offset, //v
	                uv_stride, chroma_mv[b],
	                subpixel_filters, coeffs, coeffs_off, mbi, b + 20);

	        u_off += 4;
	        v_off += 4;

	        if ((b & 1) === 1)
	        {
	            u_off += (uv_stride << 2) - 8;
	            v_off += (uv_stride << 2) - 8;
	        }

	    }
	    
	    

	}


	//build_inter_predictors2b
	function recon_1_block(output, output_off, reference, reference_off, stride, mv, filters, coeffs, coeffs_off, mbi, b) {
	    var predict = reference;
	    var predict_off = reference_off;
	    var mx = 0, my = 0;

	    if (mv.as_int[0]) {

	        mx = mv.as_row_col[0] & 7;
	        my = mv.as_row_col[1] & 7;

	        reference_off += ((mv.as_row_col[1] >> 3) * stride) + (mv.as_row_col[0] >> 3);



	        filter_block2d(output, output_off, stride, reference, reference_off, stride, 4, 4, mx, my,
	                filters);

	        predict = output;
	        predict_off = output_off;


	    } else {
	        predict_off = reference_off;
	    }

	    vp8_short_idct4x4llm_c(output, output_off, predict, predict_off, stride, coeffs, coeffs_off + 16 * b);

	}

	function recon_1_edge_block(output, output_off,
	        emul_block, emul_block_off, reference, reference_off, stride, mv_, filters, coeffs,
	        coeffs_off, mbi, x, y, w, h, start_b) {
	            
	    var predict = reference;
	    var predict_off = reference_off;
	    var b = start_b;
	    var b_w = 4;
	    var b_h = 4;
	    var mx = 0, my = 0;

	    x += mv_.as_row_col[0] >> 3;
	    y += mv_.as_row_col[1] >> 3;



	    if (x < 2 || x + b_w - 1 + 3 >= w || y < 2 || y + b_h - 1 + 3 >= h) {
	        
	        reference_off += (mv_.as_row_col[0] >> 3) + (mv_.as_row_col[1] >> 3) * stride;
	        build_mc_border(emul_block, emul_block_off,
	                reference, reference_off - 2 - (stride << 1), stride,
	                x - 2, y - 2, b_w + 5, b_h + 5, w, h);
	        reference = emul_block;
	        reference_off = emul_block_off + (stride << 1) + 2;
	        reference_off -= (mv_.as_row_col[0] >> 3) + (mv_.as_row_col[1] >> 3) * stride;
	        
	    }
	 

	    

	    if (mv_.as_int[0]) {

	        mx = mv_.as_row_col[0] & 7;
	        my = mv_.as_row_col[1] & 7;


	        reference_off += ((mv_.as_row_col[1] >> 3) * stride) + (mv_.as_row_col[0] >> 3);




	        filter_block2d(output, output_off, stride, reference, reference_off, stride, 4, 4, mx, my,
	                filters);

	        predict = output;
	        predict_off = output_off;

	    } else {
	        reference_off += ((mv_.as_row_col[1] >> 3) * stride) + (mv_.as_row_col[0] >> 3);
	        predict = reference;
	        predict_off = reference_off;
	        
	    }
	    
	    
	    vp8_short_idct4x4llm_c(output, output_off, predict, predict_off, stride, coeffs, coeffs_off + 16 * b);
	    
	}

	function build_inter4x4_predictors_mb(){
	    
	}

	function vp8_build_inter16x16_predictors_mb(mbi, full_pixel) {

	    var mbmi_cache = mbi.mbmi;

	    uvmv.as_int[0] = mbmi_cache.mv.as_int[0];

	    if (mbi.mbmi.need_mc_border === 1) {
	        var x = uvmv.as_row_col[0];
	        var y = uvmv.as_row_col[1] ;
	        uvmv.as_row_col[0] = (x + 1 + ((x >> 31) << 1)) / 2;
	        uvmv.as_row_col[1] = (y + 1 + ((y >> 31) << 1)) / 2;

	    } else {
	        uvmv.as_row_col[0] = (uvmv.as_row_col[0] + 1) >> 1;
	        uvmv.as_row_col[1] = (uvmv.as_row_col[1] + 1) >> 1;
	    }

	    if (full_pixel) {
	        uvmv.as_int[0] &= 0xFFF8FFF8;
	    }

	    chroma_mv[0].as_int[0] =
	            chroma_mv[1].as_int[0] =
	            chroma_mv[2].as_int[0] =
	            chroma_mv[3].as_int[0] = uvmv.as_int[0];

	}

	//xd->subpixel_predict8x8 = vp8_sixtap_predict8x8;
	function vp8_build_inter_predictors_mb(ctx,
	        img, coeffs, coeffs_off, mbi, mb_col, mb_row) {

	    var y, u, v;
	    var y = u = v = img.y;
	    var y_off = img.y_off;
	    var u_off = img.u_off;
	    var v_off = img.v_off;
	    var reference;
	    var reference_offset = 0;

	    var full_pixel = (ctx.common.version === 3) + 0;
	    var b = 0;

	    var mbmi_cache = mbi.mbmi;
	    
	    if (mbmi_cache.y_mode !== SPLITMV) {

	        vp8_short_inv_walsh4x4_c(coeffs, coeffs_off + 384, coeffs_off);
	        vp8_build_inter16x16_predictors_mb(mbi, full_pixel);


	    } else {

	        build_4x4uvmvs(mbi, full_pixel);
	        build_inter4x4_predictors_mb();
	    }


	    if (mbi.mbmi.need_mc_border === 1)
	        predict_inter_emulated_edge(ctx, img, coeffs, coeffs_off, mbi, mb_col, mb_row);

	    else
	        predict_inter(ctx, img, coeffs, coeffs_off, mbi);

	}

	module.exports = {};
	module.exports.predict_inter_emulated_edge = predict_inter_emulated_edge;
	module.exports.predict_inter = predict_inter;
	module.exports.vp8_build_inter_predictors_mb = vp8_build_inter_predictors_mb;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	//bilinear_filters
	var vp8_bilinear_filters =
	        [
	            new Int16Array([0, 0, 128, 0, 0, 0]),
	            new Int16Array([0, 0, 112, 16, 0, 0]),
	            new Int16Array([0, 0, 96, 32, 0, 0]),
	            new Int16Array([0, 0, 80, 48, 0, 0]),
	            new Int16Array([0, 0, 64, 64, 0, 0]),
	            new Int16Array([0, 0, 48, 80, 0, 0]),
	            new Int16Array([0, 0, 32, 96, 0, 0]),
	            new Int16Array([0, 0, 16, 112, 0, 0])
	        ];
	vp8_bilinear_filters[0].shape = 1;
	vp8_bilinear_filters[1].shape = 1;
	vp8_bilinear_filters[2].shape = 1;
	vp8_bilinear_filters[3].shape = 1;
	vp8_bilinear_filters[4].shape = 1;
	vp8_bilinear_filters[5].shape = 1;
	vp8_bilinear_filters[6].shape = 1;
	vp8_bilinear_filters[7].shape = 1;

	// sixtap_filters
	var vp8_sub_pel_filters =
	        [
	            new Int16Array([0, 0, 128, 0, 0, 0]),
	            new Int16Array([0, -6, 123, 12, -1, 0]),
	            new Int16Array([2, -11, 108, 36, -8, 1]),
	            new Int16Array([0, -9, 93, 50, -6, 0]),
	            new Int16Array([3, -16, 77, 77, -16, 3]),
	            new Int16Array([0, -6, 50, 93, -9, 0]),
	            new Int16Array([1, -8, 36, 108, -11, 2]),
	            new Int16Array([0, -1, 12, 123, -6, 0])
	        ];
	vp8_sub_pel_filters[0].shape = 1;
	vp8_sub_pel_filters[1].shape = 2;
	vp8_sub_pel_filters[2].shape = 0;
	vp8_sub_pel_filters[3].shape = 2;
	vp8_sub_pel_filters[4].shape = 0;
	vp8_sub_pel_filters[5].shape = 2;
	vp8_sub_pel_filters[6].shape = 0;
	vp8_sub_pel_filters[7].shape = 2;


	var VP8_FILTER_SHIFT = 7;

	function filter_block2d_first_pass(output,
	        output_off, output_width, src, src_ptr,
	        reference_stride, cols, output_height, vp8_filter) {
	            
	    var r = 0, c = 0;
	    var Temp = 0;

	    var filter0 = vp8_filter[0] | 0;
	    var filter1 = vp8_filter[1] | 0;
	    var filter2 = vp8_filter[2] | 0;
	    var filter3 = vp8_filter[3] | 0;
	    var filter4 = vp8_filter[4] | 0;
	    var filter5 = vp8_filter[5] | 0;

	    for (r = 0; r < output_height; r++) {
	        for (c = 0; c < cols; c++){
	            Temp = (src[src_ptr - 2] * filter0) +
	                    (src[src_ptr - 1] * filter1) +
	                    (src[src_ptr] * filter2) +
	                    (src[src_ptr + 1] * filter3) +
	                    (src[src_ptr + 2] * filter4) +
	                    (src[src_ptr + 3] * filter5) +
	                    64;
	            
	            
	            Temp >>= VP8_FILTER_SHIFT;
	            
	            if (Temp < 0) {
	                Temp = 0;
	            } else if (Temp > 255) {
	                Temp = 255;
	            }
	      
	            output[output_off + c] = Temp;
	            src_ptr++;
	        }

	        src_ptr += reference_stride - cols;
	        output_off += output_width;
	    }
	}

	function filter_block2d_first_pass_shape_2(output,
	        output_off, output_width, src, src_ptr,
	        reference_stride, cols, output_height, vp8_filter) {
	            
	    var r = 0, c = 0;
	    var Temp = 0;


	    var filter1 = vp8_filter[1] | 0;
	    var filter2 = vp8_filter[2] | 0;
	    var filter3 = vp8_filter[3] | 0;
	    var filter4 = vp8_filter[4] | 0;


	    for (r = 0; r < output_height; r++) {
	        for (c = 0; c < cols; c++){
	            Temp = 
	                    (src[src_ptr - 1] * filter1) +
	                    (src[src_ptr] * filter2) +
	                    (src[src_ptr + 1] * filter3) +
	                    (src[src_ptr + 2] * filter4) +
	                    
	                    64;
	            
	            
	            Temp >>= VP8_FILTER_SHIFT;
	            
	            if (Temp < 0) {
	                Temp = 0;
	            } else if (Temp > 255) {
	                Temp = 255;
	            }
	      
	            output[output_off + c] = Temp;
	            src_ptr++;
	        }

	        src_ptr += reference_stride - cols;
	        output_off += output_width;
	    }
	}

	function filter_block2d_first_pass_shape_1(output,
	        output_off, output_width, src, src_ptr,
	        reference_stride, cols, output_height, vp8_filter) {
	            
	    var r = 0, c = 0;
	    var Temp = 0;

	    var filter2 = vp8_filter[2] | 0;
	    var filter3 = vp8_filter[3] | 0;

	    for (r = 0; r < output_height; r++) {
	        for (c = 0; c < cols; c++){
	            Temp = 
	                    (src[src_ptr] * filter2) +
	                    (src[src_ptr + 1] * filter3) +
	                    64;
	            
	            
	            Temp >>= VP8_FILTER_SHIFT;
	            
	            if (Temp < 0) {
	                Temp = 0;
	            } else if (Temp > 255) {
	                Temp = 255;
	            }
	      
	            output[output_off + c] = Temp;
	            src_ptr++;
	        }

	        src_ptr += reference_stride - cols;
	        output_off += output_width;
	    }
	}

	function filter_block2d_second_pass(output,
	        output_off,
	        output_stride,
	        reference,
	        reference_off,
	        reference_stride,
	        cols,
	        rows,
	        filter
	        ) {
	    var r = 0, c = 0, Temp = 0;
	    var filter0 = filter[0] | 0;
	    var filter1 = filter[1] | 0;
	    var filter2 = filter[2] | 0;
	    var filter3 = filter[3] | 0;
	    var filter4 = filter[4] | 0;
	    var filter5 = filter[5] | 0;
	    var twoRef = reference_stride << 1;
	    var threeRef = 3 * reference_stride;

	    for (r = 0; r < rows; r++) {
	        for (c = 0; c < cols; c++) {
	            Temp = (reference[reference_off - twoRef] * filter0) +
	                    (reference[reference_off - reference_stride] * filter1) +
	                    (reference[reference_off] * filter2) +
	                    (reference[reference_off + reference_stride] * filter3) +
	                    (reference[reference_off + twoRef] * filter4) +
	                    (reference[reference_off + threeRef] * filter5) +
	                    64;
	            Temp >>= 7;
	            
	            if (Temp < 0) {
	                Temp = 0;
	            } else if (Temp > 255) {
	                Temp = 255;
	            }
	      
	            output[output_off + c] = Temp;
	            
	            reference_off++;
	        }

	        reference_off += reference_stride - cols;
	        output_off += output_stride;
	    }

	}

	function filter_block2d_second_pass_shape_1(output,
	        output_off,
	        output_stride,
	        reference,
	        reference_off,
	        reference_stride,
	        cols,
	        rows,
	        filter
	        ) {
	    var r = 0, c = 0, Temp = 0;
	    var filter2 = filter[2] | 0;
	    var filter3 = filter[3] | 0;
	    var twoRef = reference_stride << 1;
	    var threeRef = 3 * reference_stride;

	    for (r = 0; r < rows; r++) {
	        for (c = 0; c < cols; c++) {
	            Temp = 
	                    (reference[reference_off] * filter2) +
	                    (reference[reference_off + reference_stride] * filter3) +
	                    64;
	            Temp >>= 7;
	            
	            if (Temp < 0) {
	                Temp = 0;
	            } else if (Temp > 255) {
	                Temp = 255;
	            }
	      
	            output[output_off + c] = Temp;
	            
	            reference_off++;
	        }

	        reference_off += reference_stride - cols;
	        output_off += output_stride;
	    }

	}

	function filter_block2d_second_pass_shape_2(output,
	        output_off,
	        output_stride,
	        reference,
	        reference_off,
	        reference_stride,
	        cols,
	        rows,
	        filter
	        ) {
	    var r = 0, c = 0, Temp = 0;

	    var filter1 = filter[1] | 0;
	    var filter2 = filter[2] | 0;
	    var filter3 = filter[3] | 0;
	    var filter4 = filter[4] | 0;

	    var twoRef = reference_stride << 1;
	    var threeRef = 3 * reference_stride;

	    for (r = 0; r < rows; r++) {
	        for (c = 0; c < cols; c++) {
	            Temp = 
	                    (reference[reference_off - reference_stride] * filter1) +
	                    (reference[reference_off] * filter2) +
	                    (reference[reference_off + reference_stride] * filter3) +
	                    (reference[reference_off + twoRef] * filter4) +
	                    64;
	            Temp >>= 7;
	            
	            if (Temp < 0) {
	                Temp = 0;
	            } else if (Temp > 255) {
	                Temp = 255;
	            }
	      
	            output[output_off + c] = Temp;
	            
	            reference_off++;
	        }

	        reference_off += reference_stride - cols;
	        output_off += output_stride;
	    }
	}

	//likely filter_block2d
	var temp = new Uint8Array(336);

	function filter_block2d(output, output_off,
	        output_stride, reference,
	        reference_off, reference_stride,
	        cols, rows,
	        mx, my, filters) {


	    if (filters[mx].shape === 1) {
	        filter_block2d_first_pass_shape_1(temp, 0, 16,
	                reference, reference_off - 2 * reference_stride, reference_stride,
	                cols, rows + 5, filters[mx]);
	    } else if(filters[mx].shape === 2) {
	        filter_block2d_first_pass_shape_2(temp, 0, 16,
	                reference, reference_off - 2 * reference_stride, reference_stride,
	                cols, rows + 5, filters[mx]);
	    } else {
	        filter_block2d_first_pass(temp, 0, 16,
	                reference, reference_off - 2 * reference_stride, reference_stride,
	                cols, rows + 5, filters[mx]);
	    }
	    
	    if (filters[my].shape === 1) {
	        filter_block2d_second_pass_shape_1(output, output_off, output_stride,
	                temp, 32, 16, cols, rows, filters[my]);
	    } else if (filters[my].shape === 1) {
	        filter_block2d_second_pass_shape_2(output, output_off, output_stride,
	                temp, 32, 16, cols, rows, filters[my]);
	    } else {
	        filter_block2d_second_pass(output, output_off, output_stride,
	                temp, 32, 16, cols, rows, filters[my]);
	    }

	    
	}



	//subpixel_predict
	function filter_block(return_off,
	        output,
	        output_off,
	        reference,
	        reference_off,
	        stride,
	        mv_,
	        filters) {

	    //reference_off += ((mv_.y >> 3) * stride) + (mv_.x >> 3);

	    if (mv_.as_int[0])
	    {
	        filter_block2d(output, output_off, stride, reference, reference_off, stride, 4, 4, mv_.x & 7, mv_.y & 7,
	                filters);

	    }


	}

	module.exports = {};
	module.exports.vp8_sub_pel_filters = vp8_sub_pel_filters;
	module.exports.vp8_bilinear_filters = vp8_bilinear_filters;
	module.exports.filter_block2d_first_pass = filter_block2d_first_pass;
	module.exports.filter_block2d_second_pass = filter_block2d_second_pass;
	module.exports.sixtap_2d = filter_block2d;
	module.exports.filter_block = filter_block;
	module.exports.filter_block2d = filter_block2d;


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';




	function CLAMP_255(x) {
	    return Math.min(Math.max(x, 0), 255);
	}

	var cospi8sqrt2minus1 = 20091;
	var sinpi8sqrt2 = 35468; // (<<15 + 2700)
	var output = new Int16Array(16);
	var output_32 = new Uint32Array(output.buffer);
	var output_32_i = new Int32Array(output.buffer);
	output.data_32 = output_32;
	output.data_32_i = output_32_i;
	//
	//vp8_short_inv_walsh4x4_c
	function vp8_short_inv_walsh4x4_c(input, input_off, mb_dqcoeff_ptr) {

	    //var mb_dqcoeff_ptr = input_off;

	    var output_off = 0;
	    var i;
	    var a1, b1, c1, d1;
	    var a2, b2, c2, d2;
	    var ip = input;
	    var ip_off = input_off;
	    var op = output;
	    var op_off = 0;

	    var ip0 = 0;
	    var ip1 = 0;
	    var ip2 = 0;
	    var ip3 = 0;
	    var ip12 = 0;
	    var ip8 = 0;
	    var ip4 = 0;

	    for (i = 0; i < 4; i++)
	    {
	        ip0 = ip[ip_off];
	        ip4 = ip[ip_off + 4];
	        ip8 = ip[ip_off + 8];
	        ip12 = ip[ip_off + 12];


	        a1 = (ip0 + ip12) | 0;
	        b1 = (ip4 + ip8) | 0;
	        c1 = (ip4 - ip8) | 0;
	        d1 = (ip0 - ip12) | 0;

	        op[op_off] = a1 + b1;
	        op[op_off + 4] = c1 + d1;
	        op[op_off + 8] = a1 - b1;
	        op[op_off + 12] = d1 - c1;
	        ip_off++;
	        op_off++;
	    }


	    
	    ip = output;
	    ip_off = output_off;
	    op = output;
	    op_off = output_off;

	    var data_32 = ip.data_32;
	    var ip_32 = 0;
	/*
	    for (i = 0; i < 4; i++)
	    {

	        ip_32 = data_32[ip_off >> 1];
	        ip1 = ((ip_32 >> 16));
	        ip0 = ((ip_32 << 16) >> 16);
	        
	        ip_32 = data_32[(ip_off + 2) >> 1];
	        ip3 = ((ip_32 >> 16));
	        ip2 = ((ip_32 << 16) >> 16);
	        
	        a1 = ip0 + ip3;
	        b1 = ip1 + ip2;
	        c1 = ip1 - ip2;
	        d1 = ip0 - ip3;

	        a2 = a1 + b1;
	        b2 = c1 + d1;
	        c2 = a1 - b1;
	        d2 = d1 - c1;

	        output_32[op_off >> 1] = ((a2 + 3) >> 3) & 0xFFFF | (((b2 + 3) >> 3) << 16);
	        output_32[(op_off + 2) >> 1] = ((c2 + 3) >> 3) & 0xFFFF | (((d2 + 3) >> 3) << 16);


	        ip_off += 4;
	        op_off += 4;
	    }*/
	    var output_off_32 = op_off >> 1;
	    var ip_off_32 = ip_off >> 1;
	    //Loop 1
	    ip_32 = data_32[ip_off_32];
	    ip1 = ((ip_32 >> 16));
	    ip0 = ((ip_32 << 16) >> 16);

	    ip_32 = data_32[ip_off_32 + 1];
	    ip3 = ((ip_32 >> 16));
	    ip2 = ((ip_32 << 16) >> 16);

	    a1 = ip0 + ip3;
	    b1 = ip1 + ip2;
	    c1 = ip1 - ip2;
	    d1 = ip0 - ip3;

	    a2 = a1 + b1;
	    b2 = c1 + d1;
	    c2 = a1 - b1;
	    d2 = d1 - c1;

	    output_32[output_off_32] = ((a2 + 3) >> 3) & 0xFFFF | (((b2 + 3) >> 3) << 16);
	    output_32[output_off_32 + 1] = ((c2 + 3) >> 3) & 0xFFFF | (((d2 + 3) >> 3) << 16);



	    //Loop 2
	    ip_32 = data_32[ip_off_32 + 2];
	    ip1 = ((ip_32 >> 16));
	    ip0 = ((ip_32 << 16) >> 16);

	    ip_32 = data_32[ip_off_32 + 3];
	    ip3 = ((ip_32 >> 16));
	    ip2 = ((ip_32 << 16) >> 16);

	    a1 = ip0 + ip3;
	    b1 = ip1 + ip2;
	    c1 = ip1 - ip2;
	    d1 = ip0 - ip3;

	    a2 = a1 + b1;
	    b2 = c1 + d1;
	    c2 = a1 - b1;
	    d2 = d1 - c1;

	    output_32[output_off_32 + 2] = ((a2 + 3) >> 3) & 0xFFFF | (((b2 + 3) >> 3) << 16);
	    output_32[output_off_32 + 3] = ((c2 + 3) >> 3) & 0xFFFF | (((d2 + 3) >> 3) << 16);




	    //Loop 3
	    ip_32 = data_32[ip_off_32 + 4];
	    ip1 = ((ip_32 >> 16));
	    ip0 = ((ip_32 << 16) >> 16);

	    ip_32 = data_32[ip_off_32 + 5];
	    ip3 = ((ip_32 >> 16));
	    ip2 = ((ip_32 << 16) >> 16);

	    a1 = ip0 + ip3;
	    b1 = ip1 + ip2;
	    c1 = ip1 - ip2;
	    d1 = ip0 - ip3;

	    a2 = a1 + b1;
	    b2 = c1 + d1;
	    c2 = a1 - b1;
	    d2 = d1 - c1;

	    output_32[output_off_32 + 4] = ((a2 + 3) >> 3) & 0xFFFF | (((b2 + 3) >> 3) << 16);
	    output_32[output_off_32 + 5] = ((c2 + 3) >> 3) & 0xFFFF | (((d2 + 3) >> 3) << 16);



	    //loop 4
	    ip_32 = data_32[ip_off_32 + 6];
	    ip1 = ((ip_32 >> 16));
	    ip0 = ((ip_32 << 16) >> 16);

	    ip_32 = data_32[ip_off_32 + 7];
	    ip3 = ((ip_32 >> 16));
	    ip2 = ((ip_32 << 16) >> 16);

	    a1 = ip0 + ip3;
	    b1 = ip1 + ip2;
	    c1 = ip1 - ip2;
	    d1 = ip0 - ip3;

	    a2 = a1 + b1;
	    b2 = c1 + d1;
	    c2 = a1 - b1;
	    d2 = d1 - c1;

	    output_32[output_off_32 + 6] = ((a2 + 3) >> 3) & 0xFFFF | (((b2 + 3) >> 3) << 16);
	    output_32[output_off_32 + 7] = ((c2 + 3) >> 3) & 0xFFFF | (((d2 + 3) >> 3) << 16);



	    //var mb_dqcoeff = input;

	    //for (i = 0; i < 16; i++) {
	        //coeffs[coeffs_off + i * 16] = y2[i]; //no y2_off need
	      //  input[mb_dqcoeff_ptr + (i << 4)] = output[i];
	    //}
	    input[mb_dqcoeff_ptr + 0] = output[0];
	    input[mb_dqcoeff_ptr + 16] = output[1];
	    input[mb_dqcoeff_ptr + 32] = output[2];
	    input[mb_dqcoeff_ptr + 48] = output[3];
	    input[mb_dqcoeff_ptr + 64] = output[4];
	    input[mb_dqcoeff_ptr + 80] = output[5];
	    input[mb_dqcoeff_ptr + 96] = output[6];
	    input[mb_dqcoeff_ptr + 112] = output[7];
	    input[mb_dqcoeff_ptr + 128] = output[8];
	    input[mb_dqcoeff_ptr + 144] = output[9];
	    input[mb_dqcoeff_ptr + 160] = output[10];
	    input[mb_dqcoeff_ptr + 176] = output[11];
	    input[mb_dqcoeff_ptr + 192] = output[12];
	    input[mb_dqcoeff_ptr + 208] = output[13];
	    input[mb_dqcoeff_ptr + 224] = output[14];
	    input[mb_dqcoeff_ptr + 240] = output[15];

	}

	var tmp = new Int16Array(16);
	var shortpitch = 4;
	var shortpitch2 = 8;
	var shortpitch3 = 12;

	function vp8_short_idct4x4llm_c(recon, recon_off, predict, predict_off, stride, coeffs, coeffs_off) {

	    var i = 0;
	    var a1 = 0, b1 = 0, c1 = 0, d1 = 0, temp1 = 0, temp2 = 0;
	    var tmp_off = 0;



	    //START IDCT
	    var ip = coeffs;
	    var ip_off = coeffs_off;
	    var op = tmp;
	    var op_off = tmp_off;


	    for (i = 0; i < 4; i++) {
	        var ip_0 = ip[ip_off];
	        var ip_4 = ip[ip_off + 4];
	        var ip_12 = ip[ip_off + 12];
	        var ip_8 = ip[ip_off + 8];

	        a1 = ip_0 + ip_8;
	        b1 = ip_0 - ip_8;

	        temp1 = (ip_4 * sinpi8sqrt2) >> 16;
	        temp2 = ip_12 + ((ip_12 * cospi8sqrt2minus1/* + rounding */) >> 16);
	        c1 = temp1 - temp2;

	        temp1 = ip_4 + ((ip_4 * cospi8sqrt2minus1) >> 16);
	        temp2 = (ip_12 * sinpi8sqrt2) >> 16;
	        d1 = temp1 + temp2;

	        op[op_off] = a1 + d1;
	        op[op_off + shortpitch3] = a1 - d1;

	        op[op_off + shortpitch] = b1 + c1;
	        op[op_off + shortpitch2] = b1 - c1;

	        ip_off++;
	        op_off++;
	    }

	    //END IDCT

	    coeffs = tmp;
	    coeffs_off = tmp_off;
	    var recon_32 = recon.data_32;
	    var r0, r1, r2, r3;
	    var p0, p1, p2, p3;
	    var p32;
	    
	    for (i = 0; i < 4; i++) {

	        
	        var coeffs_0 = coeffs[coeffs_off];
	        var coeff_1 = coeffs[coeffs_off + 1];
	        var coeffs_2 = coeffs[coeffs_off + 2];
	        var coeff_3 = coeffs[coeffs_off + 3];



	        a1 = coeffs_0 + coeffs_2;
	        b1 = coeffs_0 - coeffs_2;

	        temp1 = (coeff_1 * sinpi8sqrt2) >> 16;
	        temp2 = coeff_3 + ((coeff_3 * cospi8sqrt2minus1) >> 16);
	        c1 = temp1 - temp2;

	        temp1 = coeff_1 + ((coeff_1 * cospi8sqrt2minus1) >> 16);
	        temp2 = (coeff_3 * sinpi8sqrt2) >> 16;
	        d1 = temp1 + temp2;


	        p0 = predict[predict_off];
	        p1 = predict[predict_off + 1];
	        p2 = predict[predict_off + 2];
	        p3 = predict[predict_off + 3];



	        r0 = CLAMP_255(p0 + ((a1 + d1 + 4) >> 3));
	        r1 = CLAMP_255(p1 + ((b1 + c1 + 4) >> 3));
	        r2 = CLAMP_255(p2 + ((b1 - c1 + 4) >> 3));
	        r3 = CLAMP_255(p3 + ((a1 - d1 + 4) >> 3));
	        recon_32[recon_off >> 2] = r0 | r1 << 8 | r2 << 16 | r3 << 24;



	        coeffs_off += 4;
	        recon_off += stride;
	        predict_off += stride;
	    }

	    //clamp might be at the end
	}

	module.exports = {};
	module.exports.vp8_short_inv_walsh4x4_c = vp8_short_inv_walsh4x4_c;
	module.exports.vp8_short_idct4x4llm_c = vp8_short_idct4x4llm_c;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var reconintra4x4 = __webpack_require__(25);
	var intra_prediction_down_copy = reconintra4x4.intra_prediction_down_copy;

	var DC_PRED = 0;
	var V_PRED = 1;
	var H_PRED = 2;
	var TM_PRED = 3;
	var B_PRED = 4;




	var B_DC_PRED = 0;
	var B_TM_PRED = 1;
	var B_VE_PRED = 2;
	var B_HE_PRED = 3;
	var B_LD_PRED = 4;
	var B_RD_PRED = 5;
	var B_VR_PRED = 6;
	var B_VL_PRED = 7;
	var B_HD_PRED = 8;
	var B_HU_PRED = 9;

	var idctllm = __webpack_require__(23);
	var vp8_short_inv_walsh4x4_c = idctllm.vp8_short_inv_walsh4x4_c;
	var vp8_short_idct4x4llm_c = idctllm.vp8_short_idct4x4llm_c;

	function CLAMP_255(x) {
	    return Math.min(Math.max(x, 0), 255);
	}

	function predict_tm_16x16(predict, predict_off, stride){
	    predict_tm_nxn(predict, predict_off, stride, 16);
	}


	function predict_v_8x8(predict, predict_off, stride) {
	    predict_v_nxn(predict, predict_off, stride, 8);
	}

	function predict_h_16x16(predict, predict_off, stride) {
	    predict_h_nxn(predict, predict_off, stride, 16);
	}

	function predict_v_16x16(predict, predict_off, stride)
	{
	    predict_v_nxn(predict, predict_off, stride, 16);
	}


	function predict_tm_8x8(predict, predict_off, stride)
	{
	    predict_tm_nxn(predict, predict_off, stride, 8);
	}

	function predict_h_8x8(predict, predict_off, stride)
	{
	    predict_h_nxn(predict, predict_off, stride, 8);
	}


	function predict_tm_8x8(predict, predict_off, stride)
	{
	    predict_tm_nxn(predict, predict_off, stride, 8);
	}


	//likely vp8_build_intra_predictors_mbuv_s
	function predict_intra_chroma(predict_u,
	        predict_u_off,
	        predict_v,
	        predict_v_off,
	        stride,
	        mbi,
	        coeffs,
	        coeffs_off) {
	    var i = 0;

	    switch (mbi.mbmi.uv_mode)
	    {
	        case DC_PRED:
	            
	            //line84
	            predict_dc_nxn(predict_u, predict_u_off, stride, 8);
	            predict_dc_nxn(predict_v, predict_v_off, stride, 8);
	            break;
	        case V_PRED:
	            predict_v_8x8(predict_u, predict_u_off, stride);
	            predict_v_8x8(predict_v, predict_v_off, stride);
	            break;
	        case H_PRED:
	            predict_h_8x8(predict_u, predict_u_off, stride);
	            predict_h_8x8(predict_v, predict_v_off, stride);
	            break;
	        case TM_PRED:
	            predict_tm_8x8(predict_u, predict_u_off, stride);
	            predict_tm_8x8(predict_v, predict_v_off, stride);
	            break;
	        default:
	           
	    }

	    coeffs_off += 256;
	    var stride4_8 = stride * 4 - 8;
	    //likely line 178
	    for (i = 16; i < 20; i++) {
	        vp8_short_idct4x4llm_c(predict_u, predict_u_off, predict_u, predict_u_off, stride, coeffs, coeffs_off);
	        coeffs_off += 16;
	        predict_u_off += 4;

	        if (i & 1)
	            predict_u_off += stride4_8;
	    }

	    for (i = 20; i < 24; i++) {
	        vp8_short_idct4x4llm_c(predict_v, predict_v_off, predict_v, predict_v_off, stride, coeffs, coeffs_off);
	        coeffs_off += 16;
	        predict_v_off += 4;

	        if (i & 1)
	            predict_v_off += stride4_8;
	    }

	}

	function predict_v_nxn(predict, predict_off, stride, n) {
	    var above = predict;
	    var above_off = (predict_off - stride) | 0;
	    var i = 0, j = 0;
	    var istride = 0;
	    for (i = 0; i < n; i++) {
	        istride = i * stride;
	        for (j = 0; j < n; j++)
	            predict[predict_off + istride + j] = above[above_off + j];
	    }
	}

	function predict_h_nxn(predict, predict_off, stride, n) {
	    var left = predict;
	    var left_off = (predict_off - 1) | 0;
	    var i = 0;
	    var j = 0;

	    var istride = 0;
	    for (i = 0; i < n; i++) {
	        istride = i * stride;
	        for (j = 0; j < n; j++)
	            predict[predict_off + istride + j] = left[left_off + i * stride];
	    }
	}


	function  predict_dc_nxn(predict, predict_off, stride, n) {
	    n = n | 0;
	    var left = predict;
	    var left_off = predict_off - 1;
	    var above = predict;
	    var above_off = predict_off - stride;
	    var i = 0, j = 0;
	    var dc = 0;

	    for (i = 0; i < n; i++) {
	        dc += left[left_off] + above[above_off + i];
	        left_off += stride;
	    }

	    switch (n) {
	        case 16:
	            dc = ((dc + 16) >> 5);
	            break;
	        case  8:
	            dc = ((dc + 8) >> 4);
	            break;
	        case  4:
	            dc = ((dc + 4) >> 3);
	            break;
	    }

	    for (i = 0; i < n; i++)
	        for (j = 0; j < n; j++)
	            predict[predict_off + i * stride + j] = dc;
	}

	function predict_tm_nxn(predict, predict_off, stride, n) {
	    /* Transposes the left column to the top row for later consumption
	     * by the idct/recon stage
	     */
	    var left = predict;
	    var left_off = predict_off - 1;
	    var above = predict;
	    var above_off = predict_off - stride;
	    var p = above[above_off - 1];
	    var i = 0, j = 0;

	    for (j = 0; j < n; j++)
	    {
	        for (i = 0; i < n; i++)
	            predict[predict_off + i] = CLAMP_255(left[left_off] + above[above_off + i] - p);//*left //CLAMP_255

	        predict_off += stride;
	        left_off += stride;
	    }
	}


	//possibly vp8_build_intra_predictors_mby_s
	function predict_intra_luma(predict,
	        predict_off,
	        stride,
	        mbi,
	        coeffs,
	        coeffs_off) {

	    if (mbi.mbmi.y_mode === B_PRED)
	        b_pred(predict, predict_off, stride, mbi, coeffs, coeffs_off);

	    else
	    {
	        var i = 0;

	        switch (mbi.mbmi.y_mode)
	        {
	            case DC_PRED:
	                predict_dc_nxn(predict, predict_off, stride, 16);
	                break;
	            case V_PRED:
	                predict_v_16x16(predict, predict_off, stride);
	                break;
	            case H_PRED:
	                predict_h_16x16(predict, predict_off, stride);
	                break;
	            case TM_PRED:
	                predict_tm_16x16(predict, predict_off, stride);
	                break;
	            default:
	               
	        }


	        vp8_short_inv_walsh4x4_c(coeffs, coeffs_off + 384, coeffs_off); 

	        for (i = 0; i < 16; i++)
	        {
	            vp8_short_idct4x4llm_c(predict, predict_off, predict, predict_off, stride, coeffs, coeffs_off);
	            coeffs_off += 16;
	            predict_off += 4;

	            if ((i & 3) === 3)
	                predict_off += (stride << 2) - 16;
	        }

	    }

	}

	//found in reconintra4x4
	//likeley line 183
	function  b_pred(predict, predict_off, stride, mbi, coeffs, coeffs_off) {

	    var i = 0;

	    intra_prediction_down_copy(predict, predict_off, stride);

	 
	    //line 165 in decode frame
	    var modes = mbi.bmi.modes;
	    for (i = 0; i < 16; i++) {
	        var b_predict = predict;
	        var b_predict_off = predict_off + ((i & 3) << 2);


	        switch (modes[i])
	        {
	            case B_DC_PRED:
	                predict_dc_nxn(b_predict, b_predict_off, stride, 4);
	                break;
	            case B_TM_PRED:
	                predict_tm_nxn(b_predict, b_predict_off, stride, 4);
	                break;
	            case B_VE_PRED:
	                predict_ve_4x4(b_predict, b_predict_off, stride);
	                break;
	            case B_HE_PRED:
	                predict_he_4x4(b_predict, b_predict_off, stride);
	                break;
	            case B_LD_PRED:
	                predict_ld_4x4(b_predict, b_predict_off, stride);
	                break;
	            case B_RD_PRED:
	                predict_rd_4x4(b_predict, b_predict_off, stride);
	                break;
	            case B_VR_PRED:
	                predict_vr_4x4(b_predict, b_predict_off, stride);
	                break;
	            case B_VL_PRED:
	                predict_vl_4x4(b_predict, b_predict_off, stride);
	                break;
	            case B_HD_PRED:
	                predict_hd_4x4(b_predict, b_predict_off, stride);
	                break;
	            case B_HU_PRED:
	                predict_hu_4x4(b_predict, b_predict_off, stride);
	                break;
	            default:
	                throw "ERROR :(";
	        }

	        vp8_short_idct4x4llm_c(b_predict, b_predict_off, b_predict, b_predict_off, stride, coeffs, coeffs_off);
	        coeffs_off += 16;

	        if ((i & 3) === 3) {
	            predict_off += stride * 4;
	        }

	    }

	}


	function predict_hd_4x4(predict, predict_off, stride) {
	        var left = predict;
	    var left_off = predict_off - 1;
	    var above = predict;
	    var above_off = predict_off - stride;
	    var pred0 = 0, pred1 = 0, pred2 = 0, pred3 = 0, pred4 = 0, pred5 = 0, pred6 = 0,
	            pred7 = 0, pred8 = 0, pred9 = 0;

	    var abovem1 = above[above_off - 1] | 0;
	    var above0 = above[above_off] | 0;
	    var above1 = above[above_off + 1] | 0;
	    var above2 = above[above_off + 2] | 0;
	    var stride2 = stride << 1;
	    var stride3 = stride * 3;
	    
	    var left0 = left[left_off]|0;
	    var left1  = left[left_off + stride]|0;
	    var left2 = left[left_off + stride2]|0;
	    var left3 = left[left_off + stride3]|0;
	    
	    var pred_32 = predict.data_32;
	    
	    pred0 = (left0 + abovem1 + 1) >> 1;
	    pred1 = (left0 + 2 * abovem1 + above0 + 2) >> 2;
	    pred2 = (above[above_off - 1] + 2 * above0 + above1 + 2) >> 2;
	    pred3 = (above0 + (above1 << 1) + above2 + 2) >> 2;
	    pred_32[predict_off >> 2] = pred0 | (pred1 << 8) | (pred2 << 16) | (pred3 << 24);
	    predict_off += stride;

	    pred4 = (left1 + left0 + 1) >> 1;
	    pred5 = (left1 + 2 * left0 + abovem1 + 2) >> 2;
	    pred_32[predict_off >> 2] = pred4 | (pred5 << 8) | (pred0 << 16) | (pred1 << 24);
	    predict_off += stride;

	  
	    pred6 = (left2 + left1 + 1) >> 1;
	    pred7 = (left2 + 2 * left1 + left0 + 2) >> 2;
	    pred_32[predict_off >> 2] = pred6 | (pred7 << 8) | (pred4 << 16) | (pred5 << 24);
	    predict_off += stride;

	    
	    
	    pred8 = (left3 + left2 + 1) >> 1;
	    pred9 = (left3 + 2 * left2 + left1 + 2) >> 2;

	    
	    pred_32[predict_off >> 2] = pred8 | (pred9 << 8) | (pred6 << 16) | (pred7 << 24);
	}


	function predict_vr_4x4(predict, predict_off, stride) {
	    var left = predict;
	    var left_off = predict_off - 1;
	    var above = predict;
	    var above_off = predict_off - stride;
	    var pred0 = 0, pred1 = 0, pred2 = 0, pred3 = 0, pred4 = 0, pred5 = 0, pred6 = 0,
	            pred7 = 0, pred8 = 0, pred9 = 0;
	    
	    var above_32 = above.data_32[above_off >> 2];
	    var above0 = above_32 & 0xFF;
	    var above1 = (above_32 >> 8) & 0xFF;
	    var above2 = (above_32 >> 16) & 0xFF;
	    var above3 = (above_32 >> 24) & 0xFF;
	    var above_m1 = above[above_off - 1];
	    
	    var left0 = left[left_off + 0];

	    pred0 = (above[above_off - 1] + above0 + 1) >> 1;
	    pred1 = (above0 + above1 + 1) >> 1;
	    pred2 = (above1 + above2 + 1) >> 1;
	    pred3 = (above2 + above3 + 1) >> 1;
	    
	    predict.data_32[predict_off >> 2] = pred0 | (pred1 << 8) | (pred2 << 16) | (pred3 << 24);
	    predict_off += stride;

	    pred4 = (left[left_off + 0] + 2 * above_m1 + above0 + 2) >> 2;
	    pred5 = (above_m1 + 2 * above0 + above1 + 2) >> 2;
	    pred6 = (above0 + 2 * above1 + above2 + 2) >> 2;
	    pred7 = (above1 + 2 * above2 + above[above_off + 3] + 2) >> 2;
	    
	    predict.data_32[predict_off >> 2] = pred4 | (pred5 << 8) | (pred6 << 16) | (pred7 << 24);
	    
	    predict_off += stride;

	    pred8 = (left[left_off + stride] + 2 * left0 + above[above_off - 1] + 2) >> 2;

	    
	    predict.data_32[predict_off >> 2] = pred8 | (pred0 << 8) | (pred1 << 16) | (pred2 << 24);
	    
	    predict_off += stride;

	    pred9 = (left[left_off + stride * 2] + 2 * left[left_off + stride] + left0 + 2) >> 2;

	    
	    predict.data_32[predict_off >> 2] = pred9 | (pred4 << 8) | (pred5 << 16) | (pred6 << 24);
	}


	function predict_rd_4x4(predict, predict_off, stride) {
	    var left = predict;
	    var left_off = predict_off - 1;
	    var above = predict;
	    var above_off = predict_off - stride;
	    var pred0 = 0, pred1 = 0, pred2 = 0, pred3 = 0, pred4 = 0, pred5 = 0, pred6 = 0;

	    var above_32 = above.data_32[above_off >> 2];
	    var above0 = above_32 & 0xFF;
	    var above1 = (above_32 >> 8) & 0xFF;
	    var above2 = (above_32 >> 16) & 0xFF;
	    var above3 = (above_32 >> 24) & 0xFF;
	    
	    var left0 = left[left_off];
	    var left1 = left[left_off + stride];
	    var left2 = left[left_off + stride * 2];

	    pred0 = (left[left_off + 0] + 2 * above[above_off - 1] + above0 + 2) >> 2;
	    pred1 = (above[above_off - 1] + 2 * above0 + above1 + 2) >> 2;
	    pred2 = (above0 + 2 * above1 + above2 + 2) >> 2;
	    pred3 = (above1 + 2 * above2 + above3 + 2) >> 2;
	    
	    predict.data_32[predict_off >> 2] = pred0 | (pred1 << 8) | (pred2 << 16) | (pred3 << 24);
	    
	    
	    predict_off += stride;

	    pred4 = (left1 + 2 * left0 + above[above_off - 1] + 2) >> 2;

	    predict.data_32[predict_off >> 2] = pred4 | (pred0 << 8) | (pred1 << 16) | (pred2 << 24);
	    
	    predict_off += stride;

	    pred5 = (left2 + 2 * left1 + left0 + 2) >> 2;

	    
	    predict.data_32[predict_off >> 2] = pred5 | (pred4 << 8) | (pred0 << 16) | (pred1 << 24);
	    predict_off += stride;

	    pred6 = (left[left_off + stride * 3] + 2 * left2 + left1 + 2) >> 2;

	    
	    predict.data_32[predict_off >> 2] = pred6 | (pred5 << 8) | (pred4 << 16) | (pred0 << 24);
	}


	function predict_ve_4x4(predict, predict_off, stride) {
	    var above = predict;
	    var above_32 = predict.data_32;
	    var above_off = predict_off - stride;
	    var i = 0, j = 0;

	    var above_temp = above_32[above_off >> 2] | 0;
	    var above0 = above_temp & 0xFF; //above[above_off] | 0;//
	    var above1 = (above_temp >> 8) & 0xFF; //above[above_off + 1] | 0; //
	    var above2 = (above_temp >> 16) & 0xFF; // above[above_off + 2] | 0; //
	    var above3 = (above_temp >> 24) & 0xFF; //above[above_off + 3] | 0;//

	    var pred1 = (above[above_off - 1] + (above0 << 1) + above1 + 2) >> 2;
	    var pred2 = (above0 + (above1 << 1) + above2 + 2) >> 2;
	    var pred3 = (above1 + (above2 << 1) + above3 + 2) >> 2;
	    var pred4 = (above2 + (above3 << 1) + above[above_off + 4] + 2) >> 2;

	    predict.data_32[predict_off >> 2] = pred1 | (pred2 << 8) | (pred3 << 16) | (pred4 << 24);

	    var istride = 0;// i * stride;
	    for (i = 1; i < 4; i++) {
	        istride = i * stride;
	        for (j = 0; j < 4; j++) {
	            predict[predict_off + istride + j] = predict[predict_off + j];
	        }
	    }
	}


	function predict_he_4x4(predict, predict_off, stride) {
	    var left = predict;
	    var left_off = predict_off - 1;
	    var above_32 = predict.data_32;
	    
	    var temp = (left[left_off - stride] + 2 * left[left_off] + left[left_off + stride] + 2) >> 2;
	    above_32[predict_off >> 2] = temp | (temp << 8) | (temp << 16) | (temp << 24);

	    predict_off += stride;
	    left_off += stride;


	    temp = (left[left_off - stride] + 2 * left[left_off] + left[left_off + stride] + 2) >> 2;
	    above_32[predict_off >> 2] = temp | (temp << 8) | (temp << 16) | (temp << 24);

	    predict_off += stride;
	    left_off += stride;

	    temp = (left[left_off - stride] + 2 * left[left_off] + left[left_off + stride] + 2) >> 2;

	    above_32[predict_off >> 2] = temp | (temp << 8) | (temp << 16) | (temp << 24);
	    predict_off += stride;
	    left_off += stride;

	    temp = (left[left_off - stride] + 2 * left[left_off] + left[left_off + 0] + 2) >> 2;
	    above_32[predict_off >> 2] = temp | (temp << 8) | (temp << 16) | (temp << 24);
	}


	function predict_hu_4x4(predict, predict_off, stride) {
	    var left = predict;
	    var left_off = predict_off - 1;
	    var pred0 = 0, pred1 = 0, pred2 = 0, pred3 = 0, pred4 = 0, pred5 = 0, pred6 = 0;

	    var stride3 = (stride * 3) | 0;
	    var stride2 = (stride << 1);
	    var left0 = left[left_off];
	    var left1 = left[left_off + stride];
	    var left2 = left[left_off + stride * 2];
	    var left3 = left[left_off + stride * 3];

	    pred0 = (left0 + left1 + 1) >> 1;
	    pred1 = (left0 + 2 * left1 + left2 + 2) >> 2;
	    pred2 = (left1 + left2 + 1) >> 1;
	    pred3 = (left1 + 2 * left2 + left3 + 2) >> 2;
	    
	    predict.data_32[predict_off >> 2] = pred0 | pred1 << 8 | pred2 << 16 | pred3 << 24;
	    
	    predict_off += stride;
	    
	    

	    //predict[predict_off + 0] = pred2;
	    //predict[predict_off + 1] = pred3;
	    pred4 = (left2 + left3 + 1) >> 1;
	    pred5 = (left2 + 2 * left3 + left3 + 2) >> 2;
	    
	    predict.data_32[predict_off >> 2] = pred2 | pred3 << 8 | pred4 << 16 | pred5 << 24;
	    predict_off += stride;
	    
	    pred6 = left3;


	    predict.data_32[predict_off >> 2] = pred4 | pred5 << 8 | pred6 << 16 | pred6 << 24;
	    predict_off += stride;


	    predict.data_32[predict_off >> 2] = pred6 | pred6 << 8 | pred6 << 16 | pred6 << 24;
	}


	function predict_ld_4x4(predict, predict_off, stride) {
	    var above = predict;
	    var above_off = predict_off - stride;
	    var pred0 = 0, pred1 = 0, pred2 = 0, pred3 = 0, pred4 = 0, pred5 = 0, pred6 = 0;

	    var above_32 = predict.data_32;
	    var above_32_value = above_32[above_off >> 2];
	    var above0 = above_32_value & 0xFF; //above[above_off] | 0;
	    var above1 = (above_32_value >> 8) & 0xFF;  // above[above_off + 1] | 0;
	    var above2 = (above_32_value >> 16) & 0xFF;  //above[above_off + 2] | 0;
	    var above3 = (above_32_value >> 24) & 0xFF;

	    above_32_value = above_32[(above_off >> 2) + 1];
	    var above4 = above_32_value & 0xFF; //above[above_off] | 0;
	    var above5 = (above_32_value >> 8) & 0xFF;  // above[above_off + 1] | 0;
	    var above6 = (above_32_value >> 16) & 0xFF;  //above[above_off + 2] | 0;
	    var above7 = (above_32_value >> 24) & 0xFF;

	    pred0 = (above0 + (above1 << 1) + above2 + 2) >> 2;
	    pred1 = (above1 + (above2 << 1) + above3 + 2) >> 2;
	    pred2 = (above2 + (above3 << 1) + above4 + 2) >> 2;
	    pred3 = (above3 + (above4 << 1) + above5 + 2) >> 2;

	    predict.data_32[predict_off >> 2] = pred0 | (pred1 << 8) | (pred2 << 16) | (pred3 << 24);
	    predict_off += stride;


	    pred4 = (above4 + 2 * above5 + above6 + 2) >> 2;
	    predict.data_32[predict_off >> 2] = pred1 | (pred2 << 8) | (pred3 << 16) | (pred4 << 24);

	    predict_off += stride;


	    pred5 = (above5 + (above6 << 1) + above7 + 2) >> 2;
	    predict.data_32[predict_off >> 2] = pred2 | (pred3 << 8) | (pred4 << 16) | (pred5 << 24);

	    predict_off += stride;


	    pred6 = (above6 + 2 * above7 + above7 + 2) >> 2;
	    predict.data_32[predict_off >> 2] = pred3 | (pred4 << 8) | (pred5 << 16) | (pred6 << 24);

	}


	function predict_vl_4x4(predict, predict_off, stride) {
	    var above = predict;
	    var above_off = predict_off - stride;
	    var pred0 = 0, pred1 = 0, pred2 = 0, pred3 = 0, pred4 = 0, pred5 = 0, pred6 = 0,
	            pred7 = 0, pred8 = 0, pred9 = 0;

	    var above_32 = above.data_32[above_off >> 2];
	    var above0 = above_32 & 0xFF;
	    var above1 = (above_32 >> 8) & 0xFF;
	    var above2 = (above_32 >> 16) & 0xFF;
	    var above3 = (above_32 >> 24) & 0xFF;
	    
	    above_32 = above.data_32[(above_off >> 2) + 1];
	    var above4 = above_32 & 0xFF; //above[above_off] | 0;
	    var above5 = (above_32 >> 8) & 0xFF;  // above[above_off + 1] | 0;
	    var above6 = (above_32 >> 16) & 0xFF;  //above[above_off + 2] | 0;
	    var above7 = (above_32 >> 24) & 0xFF;
	    
	    
	    pred0 = (above0 + above1 + 1) >> 1;
	    pred1 = (above1 + above2 + 1) >> 1;
	    pred2 = (above2 + above3 + 1) >> 1;
	    pred3 = (above[above_off + 3] + above4 + 1) >> 1;
	    
	    predict.data_32[predict_off >> 2] = pred0 | pred1 << 8 | pred2 << 16 | pred3 << 24;
	    
	    predict_off += stride;

	    pred4 = (above0 + 2 * above1 + above2 + 2) >> 2;
	    pred5 = (above1 + 2 * above2 + above3 + 2) >> 2;
	    pred6 = (above2 + 2 * above3 + above4 + 2) >> 2;
	    pred7 = (above3 + 2 * above4 + above5 + 2) >> 2;
	    
	    predict.data_32[predict_off >> 2] = pred4 | pred5 << 8 | pred6 << 16 | pred7 << 24;
	    
	    predict_off += stride;


	    pred8 = (above4 + 2 * above5 + above6 + 2) >> 2;
	    
	    predict.data_32[predict_off >> 2] = pred1 | pred2 << 8 | pred3 << 16 | pred8 << 24;
	    
	    predict_off += stride;


	    pred8 = (above5 + 2 * above6 + above7 + 2) >> 2;
	    
	    predict.data_32[predict_off >> 2] = pred5 | pred6 << 8 | pred7 << 16 | pred8 << 24;
	}


	module.exports = {};
	module.exports.predict_intra_chroma = predict_intra_chroma;
	module.exports.predict_intra_luma = predict_intra_luma;


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	//intra_prediction_down_copy in reconintra4x4
	function intra_prediction_down_copy(recon, recon_off, stride) {
	    /* Copy the four pixels above-right of subblock 3 to
	     * above-right of subblocks 7, 11, and 15
	     */

	    var copy = (recon);
	    var copy_off = (recon_off + 16 - stride);//*(void *)

	    var i;
	    var copy_32 = copy.data_32;
	    var tmp_32 = copy_32[copy_off >> 2];

	    copy_off += stride << 2;

	    copy_32[copy_off >> 2] = tmp_32;

	    copy_off += stride << 2;

	    copy_32[copy_off >> 2] = tmp_32;

	    copy_off += stride << 2;

	    copy_32[copy_off >> 2] = tmp_32;

	}


	module.exports = {};
	module.exports.intra_prediction_down_copy = intra_prediction_down_copy;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var findenearmv = __webpack_require__(27);
	var left_block_mode = findenearmv.left_block_mode;
	var above_block_mode = findenearmv.above_block_mode;

	var MotionVector = __webpack_require__(9);
	var vp8_entropymodedata = __webpack_require__(28);

	var vp8_kf_bmode_prob = vp8_entropymodedata.vp8_kf_bmode_prob;


	var vp8_coef_update_probs = __webpack_require__(29);

	var entropymode = __webpack_require__(30);
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

	var vp8_mode_contexts = __webpack_require__(31);

	var bitreader = __webpack_require__(7);
	var vpx_read = bitreader.vpx_read;
	var vpx_read_bit = bitreader.vpx_read_bit;


	var vp8_treed_read = __webpack_require__(32);

	var entropymv = __webpack_require__(17);
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
	function read_bmode(bc, p , p_ptr) {
	    var i = vp8_treed_read(bc, vp8_bmode_tree, p , p_ptr);

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

	            modes_cache[i] = read_bmode(bc, vp8_kf_bmode_prob, (A * 90) + L * 9);

	        } while (++i < 16);

	    }


	    mi_cache.mbmi.uv_mode = read_uv_mode(bc, vp8_kf_uv_mode_prob);


	}

	var clamped_best_mv_1 = MotionVector.create();

	var LEFT_TOP_MARGIN  = (16 << 3);
	var RIGHT_BOTTOM_MARGIN = (16 << 3);

	function vp8_clamp_mv2(mv, bounds) {
	    if (mv.as_row_col[0] < (bounds.mb_to_left_edge)) {
	        mv.as_row_col[0] = bounds.mb_to_left_edge ;
	    } else if (mv.as_row_col[0] > bounds.mb_to_right_edge) {
	        mv.as_row_col[0] = bounds.mb_to_right_edge;
	    }

	    if (mv.as_row_col[1] < (bounds.mb_to_top_edge )) {
	        mv.as_row_col[1] = bounds.mb_to_top_edge;
	    }
	    else if (mv.as_row_col[1] > bounds.mb_to_bottom_edge) {
	        mv.as_row_col[1] = bounds.mb_to_bottom_edge ;
	    }
	}

	//var mv_clamp_mv = MotionVector.create();


	function read_mv(bool, mv, mvc) {
	    mv.as_row_col[1] = read_mv_component(bool, mvc[0]);
	    mv.as_row_col[0] = read_mv_component(bool, mvc[1]);
	}


	var blockmv = MotionVector.create();
	var left_mv = MotionVector.create();
	var above_mv = MotionVector.create();

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
	        blockmv.as_int[0] = 0;
	        left_mv.as_int[0] = 0;
	        above_mv.as_int[0] = 0;
	        
	        var subblock_mode;//='prediction_mode'

	        var prob;

	        /* Find the first subblock in this partition. */
	        for (k = 0; j !== partition[k]; k++)
	            ;

	        /* Decode the next MV */
	        if (!(k & 3)) {
	            if (left_mb.mbmi.y_mode === SPLITMV){
	                left_mv.as_int[0] = left_mb.bmi.mvs[k + 3].as_int[0];
	            }else{
	                left_mv.as_int[0] = left_mb.mbmi.mv.as_int[0];
	            }

	        } else {
	            left_mv.as_int[0] = mi.bmi.mvs[k - 1].as_int[0];
	        }
	        
	        
	        if (!(k >> 2)) {
	            if (above_mb.mbmi.y_mode === SPLITMV) {
	                above_mv.as_int[0] = above_mb.bmi.mvs[k + 12].as_int[0];
	            } else {
	                above_mv.as_int[0] = above_mb.mbmi.mv.as_int[0];
	            }

	        } else {
	            above_mv.as_int[0] = mi.bmi.mvs[k - 4].as_int[0];
	        }
	        
	        prob = get_sub_mv_ref_prob(left_mv.as_int[0], above_mv.as_int[0]);
	        
	        if (vpx_read(bool, prob[0])) {
	            if (vpx_read(bool, prob[1])) {
	                //blockmv.as_int[0] = 0;
	                if (vpx_read(bool, prob[2])) {
	                    read_mv(bool, blockmv, hdr.mv_probs);
	                    blockmv.as_row_col[0] = (blockmv.as_row_col[0] + best_mv.as_row_col[0]);
	                    blockmv.as_row_col[1] = (blockmv.as_row_col[1] + best_mv.as_row_col[1] );
	                }
	            } else {
	                blockmv.as_int[0] = above_mv.as_int[0];
	            }
	        } else {
	            blockmv.as_int[0] = left_mv.as_int[0];
	        }
	        
	        var fill_count = mbsplit_fill_count[s];
	        /* Fill the MV's for this partition */
	        for (; k < 16; k++)
	            if (j === partition[k]) {
	                mvs[k].as_int[0] = blockmv.as_int[0];

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
	    l += (mv.as_row_col[0] >> 3);
	    t += (mv.as_row_col[1] >> 3);

	    // Get distance to edge for bottom-right pixel 
	    r = w - (l + b_w);
	    b = h - (t + b_w);

	    return (l >> 1 < 2 || r >> 1 < 3 || t >> 1 < 2 || b >> 1 < 3);
	}

	function mv_bias(mb, sign_bias, ref_frame, mv) {

	    if (sign_bias[mb.mbmi.ref_frame] ^ sign_bias[ref_frame]) {
	        mv.as_row_col[0] *= -1;
	        mv.as_row_col[1] *= -1;
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
	    MotionVector.create(),
	    MotionVector.create(),
	    MotionVector.create(),
	    MotionVector.create()
	];

	var near_mvs_best =  MotionVector.create();

	var chroma_mv = [
	    MotionVector.create(),
	    MotionVector.create(),
	    MotionVector.create(),
	    MotionVector.create()
	];
	        
	var cnt = new Int32Array(4);
	var this_mv_tmp = MotionVector.create();
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
	        nmv[0].as_int[0] = nmv[1].as_int[0] = nmv[2].as_int[0] = 0;
	        cnt[0] = cnt[1] = cnt[2] = cnt[3] = 0;

	        
	        
	        var aboveleft_ = mi[aboveleft_off];
	        /* Process above */
	        if (above.mbmi.ref_frame !== INTRA_FRAME) {
	            if (above.mbmi.mv.as_int[0]) {
	                nmv[++mv_off].as_int[0] = above.mbmi.mv.as_int[0];
	                mv_bias(above, sign_bias, this_.mbmi.ref_frame, nmv[mv_off]);
	                ++cntx_off;

	            }
	            cntx[cntx_off] += 2;
	        }

	        /* Process left */
	        if (left_.mbmi.ref_frame !== INTRA_FRAME) {
	            if (left_.mbmi.mv.as_int[0]) {
	                var this_mv = this_mv_tmp;

	                this_mv.as_int[0] = left_.mbmi.mv.as_int[0];
	                mv_bias(left_, sign_bias, this_.mbmi.ref_frame, this_mv);

	                if (this_mv.as_int[0] !== nmv[mv_off].as_int[0]) {
	                    nmv[++mv_off].as_int[0] = this_mv.as_int[0];
	                    ++cntx_off;
	                }
	                cntx[cntx_off] += 2;
	            } else
	                cnt[CNT_ZEROZERO] += 2;
	        }

	        /* Process above left */
	        if (aboveleft_.mbmi.ref_frame !== INTRA_FRAME) {

	            if (aboveleft_.mbmi.mv.as_int[0]) {
	                var this_mv = this_mv_tmp;

	                this_mv.as_int[0] = aboveleft_.mbmi.mv.as_int[0];
	                mv_bias(aboveleft_, sign_bias, this_.mbmi.ref_frame,
	                        this_mv);

	                if (this_mv.as_int[0] !== nmv[mv_off].as_int[0]) {
	                    nmv[(++mv_off)].as_int[0] = this_mv.as_int[0];
	                    ++cntx_off;
	                }

	                cntx[cntx_off] += 1;
	            } else
	                cnt[CNT_ZEROZERO] += 1;
	        }

	        /* If we have three distinct MV's ... */
	        if (cnt[CNT_SPLITMV]) {
	            /* See if above-left MV can be merged with NEAREST */
	            if (nmv[mv_off].as_int[0] === near_mvs[CNT_NEAREST].as_int[0])//.raw
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
	            tmp = near_mvs[CNT_NEAREST].as_int[0];
	            near_mvs[CNT_NEAREST].as_int[0] = near_mvs[CNT_NEAR].as_int[0];
	            near_mvs[CNT_NEAR].as_int[0] = tmp;
	        }
	        
	        var near_index;
	        /* Use near_mvs[CNT_BEST] to store the "best" MV. Note that this
	         * storage shares the same address as near_mvs[CNT_ZEROZERO].
	         */
	        if (cnt[CNT_NEAREST] >= cnt[CNT_BEST]) {
	            near_mvs[CNT_BEST].as_int[0] = near_mvs[CNT_NEAREST].as_int[0];
	            //near_mvs[CNT_BEST].as_row_col[1] = near_mvs[CNT_NEAREST].y;
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
	                        chroma_mv[0].as_int[0] = 0;
	                        chroma_mv[1].as_int[0] = 0;
	                        chroma_mv[2].as_int[0] = 0;
	                        chroma_mv[3].as_int[0] = 0;
	               

	                        //clamped_best_mv = clamp_mv(near_mvs[BEST], bounds);
	                        
	                        clamped_best_mv = near_mvs[BEST];
	                        vp8_clamp_mv2(clamped_best_mv, bounds);
	                        
	                        
	                        decode_split_mv(this_, left_, above, hdr, clamped_best_mv, bool);//&clamped_best_mv
	                        this_.mbmi.mv.as_int[0] = this_.bmi.mvs[15].as_int[0];
	       
	                        var this_mvs = this_.bmi.mvs;
	                        for (b = 0; b < 16; b++) {
	                            
	                            chroma_mv[(b >> 1 & 1) + (b >> 2 & 2)].as_row_col[0] +=
	                                    this_mvs[b].as_row_col[0];
	                            chroma_mv[(b >> 1 & 1) + (b >> 2 & 2)].as_row_col[1] +=
	                                    this_mvs[b].as_row_col[1] ;

	                            if (need_mc_border(this_mvs[b],
	                                    x + (b & 3) * 4, y + (b & ~3), 4, w, h))
	                            {
	                                this_.mbmi.need_mc_border = 1;
	                                break;
	                            }
	                        }

	                        for (b = 0; b < 4; b++) {
	                            chroma_mv[b].as_row_col[0] += 4 + (chroma_mv[b].as_row_col[0] >> 28) | 0;///* + 8 * (chroma_mv[b].as_row_col[0] >> 31)*/;
	                            chroma_mv[b].as_row_col[1] += 4 + (chroma_mv[b].as_row_col[1] >> 28) | 0;
	                            chroma_mv[b].as_row_col[0] = (chroma_mv[b].as_row_col[0] >> 2);
	                            chroma_mv[b].as_row_col[1] = (chroma_mv[b].as_row_col[1] >> 2);

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
	                        this_.mbmi.mv.as_row_col[0] += clamped_best_mv.as_row_col[0];
	                        this_.mbmi.mv.as_row_col[1] += clamped_best_mv.as_row_col[1] ;
	                        this_.mbmi.y_mode = NEWMV;
	                    }
	                } else {
	                    //nearmv
	                    this_.mbmi.mv.as_int[0] = near_mvs[NEAR].as_int[0];
	                    vp8_clamp_mv2(this_.mbmi.mv, bounds);
	                    this_.mbmi.y_mode = NEARMV;
	                }
	            } else {
	                this_.mbmi.y_mode = NEARESTMV;
	                this_.mbmi.mv.as_int[0] = near_mvs[NEAREST].as_int[0];
	                vp8_clamp_mv2(this_.mbmi.mv, bounds);

	                
	            }
	        } else {
	            this_.mbmi.y_mode = ZEROMV;
	            this_.mbmi.mv.as_int[0] = 0; 
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
	                modes[i] = mvs[i].as_row_col[0] = b;
	                //mvs[i].as_row_col[1] = 0;
	            }
	        }

	   
	        mbmi.y_mode = y_mode;
	        mbmi.uv_mode = vp8_treed_read(bool, vp8_uv_mode_tree, hdr.uv_mode_probs , 0);
	        mbmi.mv.as_row_col[0] = mi[this_off].mbmi.mv.as_row_col[1] = 0;
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

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var MotionVector = __webpack_require__(9);

	var DC_PRED = 0;
	var V_PRED = 1;
	var H_PRED = 2; 
	var TM_PRED = 3; 
	var B_PRED = 4; 

	var DC_PRED = 0;
	var V_PRED = 1;
	var H_PRED = 2;
	var TM_PRED = 3;
	var B_PRED = 4;


	var B_DC_PRED = 0; /* average of above and left pixels */
	var B_TM_PRED = 1;
	var B_VE_PRED = 2; /* vertical prediction */
	var B_HE_PRED = 3; /* horizontal prediction */


	function mv_bias(mb, sign_bias, ref_frame, mv) {
	    
	    if (sign_bias[mb.mbmi.ref_frame] ^ sign_bias[ref_frame]) {
	        mv.as_row_col[0] *= -1;
	        mv.as_row_col[1] *= -1;
	    }
	    
	}

	function above_block_mode(cur_mb, cur_mb_ptr, b, mi_stride) {

	    if (!(b >> 2)) {

	        cur_mb_ptr -= mi_stride;

	        switch (cur_mb[cur_mb_ptr].mbmi.y_mode) {
	            case B_PRED: return cur_mb[cur_mb_ptr].bmi.modes[b + 12];
	            case DC_PRED: return B_DC_PRED;
	            case V_PRED: return B_VE_PRED;
	            case H_PRED: return B_HE_PRED;
	            case TM_PRED: return B_TM_PRED;
	            default: return B_DC_PRED;
	        }
	    }

	    return cur_mb[cur_mb_ptr].bmi.modes[b - 4];
	}



	function left_block_mode(cur_mb, cur_mb_ptr, b) {
	    
	    if (!(b & 3)){
	        cur_mb_ptr -= 1;
	        switch (cur_mb[cur_mb_ptr].mbmi.y_mode) {
	            case DC_PRED: return B_DC_PRED;
	            case V_PRED: return B_VE_PRED;
	            case H_PRED: return B_HE_PRED;
	            case TM_PRED: return B_TM_PRED;
	            case B_PRED: return cur_mb[cur_mb_ptr].bmi.modes[b + 3];
	            default: return B_DC_PRED;
	        }
	    }

	    return cur_mb[cur_mb_ptr].bmi.modes[b - 1];
	}

	module.exports = {};
	module.exports.left_block_mode = left_block_mode;
	module.exports.above_block_mode = above_block_mode;

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	//k_default_y_mode_probs
	var vp8_ymode_prob = new Uint8Array([112, 86, 140, 37]);
	      
	var vp8_kf_bmode_prob = new Uint8Array([
	                /* left mode 0 */ 231, 120, 48, 89, 115, 113, 120, 152, 112,
	                /* left mode 1 */ 152, 179, 64, 126, 170, 118, 46, 70, 95,
	                /* left mode 2 */ 175, 69, 143, 80, 85, 82, 72, 155, 103,
	                /* left mode 3 */ 56, 58, 10, 171, 218, 189, 17, 13, 152,
	                /* left mode 4 */ 144, 71, 10, 38, 171, 213, 144, 34, 26,
	                /* left mode 5 */ 114, 26, 17, 163, 44, 195, 21, 10, 173,
	                /* left mode 6 */ 121, 24, 80, 195, 26, 62, 44, 64, 85,
	                /* left mode 7 */ 170, 46, 55, 19, 136, 160, 33, 206, 71,
	                /* left mode 8 */ 63, 20, 8, 114, 114, 208, 12, 9, 226,
	                /* left mode 9 */ 81, 40, 11, 96, 182, 84, 29, 16, 36,
	                /* left mode 0 */ 134, 183, 89, 137, 98, 101, 106, 165, 148,
	                /* left mode 1 */ 72, 187, 100, 130, 157, 111, 32, 75, 80,
	                /* left mode 2 */ 66, 102, 167, 99, 74, 62, 40, 234, 128,
	                /* left mode 3 */ 41, 53, 9, 178, 241, 141, 26, 8, 107,
	                /* left mode 4 */ 104, 79, 12, 27, 217, 255, 87, 17, 7,
	                /* left mode 5 */ 74, 43, 26, 146, 73, 166, 49, 23, 157,
	                /* left mode 6 */ 65, 38, 105, 160, 51, 52, 31, 115, 128,
	                /* left mode 7 */ 87, 68, 71, 44, 114, 51, 15, 186, 23,
	                /* left mode 8 */ 47, 41, 14, 110, 182, 183, 21, 17, 194,
	                /* left mode 9 */ 66, 45, 25, 102, 197, 189, 23, 18, 22,
	                /* left mode 0 */ 88, 88, 147, 150, 42, 46, 45, 196, 205,
	                /* left mode 1 */ 43, 97, 183, 117, 85, 38, 35, 179, 61,
	                /* left mode 2 */ 39, 53, 200, 87, 26, 21, 43, 232, 171,
	                /* left mode 3 */ 56, 34, 51, 104, 114, 102, 29, 93, 77,
	                /* left mode 4 */ 107, 54, 32, 26, 51, 1, 81, 43, 31,
	                /* left mode 5 */ 39, 28, 85, 171, 58, 165, 90, 98, 64,
	                /* left mode 6 */ 34, 22, 116, 206, 23, 34, 43, 166, 73,
	                /* left mode 7 */ 68, 25, 106, 22, 64, 171, 36, 225, 114,
	                /* left mode 8 */ 34, 19, 21, 102, 132, 188, 16, 76, 124,
	                /* left mode 9 */ 62, 18, 78, 95, 85, 57, 50, 48, 51,
	                /* left mode 0 */ 193, 101, 35, 159, 215, 111, 89, 46, 111,
	                /* left mode 1 */ 60, 148, 31, 172, 219, 228, 21, 18, 111,
	                /* left mode 2 */ 112, 113, 77, 85, 179, 255, 38, 120, 114,
	                /* left mode 3 */ 40, 42, 1, 196, 245, 209, 10, 25, 109,
	                /* left mode 4 */ 100, 80, 8, 43, 154, 1, 51, 26, 71,
	                /* left mode 5 */ 88, 43, 29, 140, 166, 213, 37, 43, 154,
	                /* left mode 6 */ 61, 63, 30, 155, 67, 45, 68, 1, 209,
	                /* left mode 7 */ 142, 78, 78, 16, 255, 128, 34, 197, 171,
	                /* left mode 8 */ 41, 40, 5, 102, 211, 183, 4, 1, 221,
	                /* left mode 9 */ 51, 50, 17, 168, 209, 192, 23, 25, 82,
	                /* left mode 0 */ 125, 98, 42, 88, 104, 85, 117, 175, 82,
	                /* left mode 1 */ 95, 84, 53, 89, 128, 100, 113, 101, 45,
	                /* left mode 2 */ 75, 79, 123, 47, 51, 128, 81, 171, 1,
	                /* left mode 3 */ 57, 17, 5, 71, 102, 57, 53, 41, 49,
	                /* left mode 4 */ 115, 21, 2, 10, 102, 255, 166, 23, 6,
	                /* left mode 5 */ 38, 33, 13, 121, 57, 73, 26, 1, 85,
	                /* left mode 6 */ 41, 10, 67, 138, 77, 110, 90, 47, 114,
	                /* left mode 7 */ 101, 29, 16, 10, 85, 128, 101, 196, 26,
	                /* left mode 8 */ 57, 18, 10, 102, 102, 213, 34, 20, 43,
	                /* left mode 9 */ 117, 20, 15, 36, 163, 128, 68, 1, 26,
	                /* left mode 0 */ 138, 31, 36, 171, 27, 166, 38, 44, 229,
	                /* left mode 1 */ 67, 87, 58, 169, 82, 115, 26, 59, 179,
	                /* left mode 2 */ 63, 59, 90, 180, 59, 166, 93, 73, 154,
	                /* left mode 3 */ 40, 40, 21, 116, 143, 209, 34, 39, 175,
	                /* left mode 4 */ 57, 46, 22, 24, 128, 1, 54, 17, 37,
	                /* left mode 5 */ 47, 15, 16, 183, 34, 223, 49, 45, 183,
	                /* left mode 6 */ 46, 17, 33, 183, 6, 98, 15, 32, 183,
	                /* left mode 7 */ 65, 32, 73, 115, 28, 128, 23, 128, 205,
	                /* left mode 8 */ 40, 3, 9, 115, 51, 192, 18, 6, 223,
	                /* left mode 9 */ 87, 37, 9, 115, 59, 77, 64, 21, 47,
	                /* left mode 0 */ 104, 55, 44, 218, 9, 54, 53, 130, 226,
	                /* left mode 1 */ 64, 90, 70, 205, 40, 41, 23, 26, 57,
	                /* left mode 2 */ 54, 57, 112, 184, 5, 41, 38, 166, 213,
	                /* left mode 3 */ 30, 34, 26, 133, 152, 116, 10, 32, 134,
	                /* left mode 4 */ 75, 32, 12, 51, 192, 255, 160, 43, 51,
	                /* left mode 5 */ 39, 19, 53, 221, 26, 114, 32, 73, 255,
	                /* left mode 6 */ 31, 9, 65, 234, 2, 15, 1, 118, 73,
	                /* left mode 7 */ 88, 31, 35, 67, 102, 85, 55, 186, 85,
	                /* left mode 8 */ 56, 21, 23, 111, 59, 205, 45, 37, 192,
	                /* left mode 9 */ 55, 38, 70, 124, 73, 102, 1, 34, 98,
	                /* left mode 0 */ 102, 61, 71, 37, 34, 53, 31, 243, 192,
	                /* left mode 1 */ 69, 60, 71, 38, 73, 119, 28, 222, 37,
	                /* left mode 2 */ 68, 45, 128, 34, 1, 47, 11, 245, 171,
	                /* left mode 3 */ 62, 17, 19, 70, 146, 85, 55, 62, 70,
	                /* left mode 4 */ 75, 15, 9, 9, 64, 255, 184, 119, 16,
	                /* left mode 5 */ 37, 43, 37, 154, 100, 163, 85, 160, 1,
	                /* left mode 6 */ 63, 9, 92, 136, 28, 64, 32, 201, 85,
	                /* left mode 7 */ 86, 6, 28, 5, 64, 255, 25, 248, 1,
	                /* left mode 8 */ 56, 8, 17, 132, 137, 255, 55, 116, 128,
	                /* left mode 9 */ 58, 15, 20, 82, 135, 57, 26, 121, 40,
	                /* left mode 0 */ 164, 50, 31, 137, 154, 133, 25, 35, 218,
	                /* left mode 1 */ 51, 103, 44, 131, 131, 123, 31, 6, 158,
	                /* left mode 2 */ 86, 40, 64, 135, 148, 224, 45, 183, 128,
	                /* left mode 3 */ 22, 26, 17, 131, 240, 154, 14, 1, 209,
	                /* left mode 4 */ 83, 12, 13, 54, 192, 255, 68, 47, 28,
	                /* left mode 5 */ 45, 16, 21, 91, 64, 222, 7, 1, 197,
	                /* left mode 6 */ 56, 21, 39, 155, 60, 138, 23, 102, 213,
	                /* left mode 7 */ 85, 26, 85, 85, 128, 128, 32, 146, 171,
	                /* left mode 8 */ 18, 11, 7, 63, 144, 171, 4, 4, 246,
	                /* left mode 9 */ 35, 27, 10, 146, 174, 171, 12, 26, 128,
	                /* left mode 0 */ 190, 80, 35, 99, 180, 80, 126, 54, 45,
	                /* left mode 1 */ 85, 126, 47, 87, 176, 51, 41, 20, 32,
	                /* left mode 2 */ 101, 75, 128, 139, 118, 146, 116, 128, 85,
	                /* left mode 3 */ 56, 41, 15, 176, 236, 85, 37, 9, 62,
	                /* left mode 4 */ 146, 36, 19, 30, 171, 255, 97, 27, 20,
	                /* left mode 5 */ 71, 30, 17, 119, 118, 255, 17, 18, 138,
	                /* left mode 6 */ 101, 38, 60, 138, 55, 70, 43, 26, 142,
	                /* left mode 7 */ 138, 45, 61, 62, 219, 1, 81, 188, 64,
	                /* left mode 8 */ 32, 41, 20, 117, 151, 142, 20, 21, 163,
	                /* left mode 9 */ 112, 19, 12, 61, 195, 128, 48, 4, 24
	            
	        ]);
	module.exports = {};
	module.exports.vp8_kf_bmode_prob = vp8_kf_bmode_prob;
	module.exports.vp8_ymode_prob = vp8_ymode_prob;

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	/*
	 * File: coefupdateprobs
	 */
	var vp8_coef_update_probs = new Uint8Array([
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 176, 246, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 223, 241, 252, 255, 255, 255,
	    255, 255, 255, 255, 255, 249, 253, 253, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 244, 252, 255,
	    255, 255, 255, 255, 255, 255, 255, 234, 254, 254,
	    255, 255, 255, 255, 255, 255, 255, 255, 253, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    246, 254, 255, 255, 255, 255, 255, 255, 255, 255,
	    239, 253, 254, 255, 255, 255, 255, 255, 255, 255,
	    255, 254, 255, 254, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 248, 254, 255, 255, 255, 255, 255,
	    255, 255, 255, 251, 255, 254, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 253, 254, 255, 255,
	    255, 255, 255, 255, 255, 255, 251, 254, 254, 255,
	    255, 255, 255, 255, 255, 255, 255, 254, 255, 254,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 254,
	    253, 255, 254, 255, 255, 255, 255, 255, 255, 250,
	    255, 254, 255, 254, 255, 255, 255, 255, 255, 255,
	    254, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 217, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 225, 252, 241, 253, 255,
	    255, 254, 255, 255, 255, 255, 234, 250, 241, 250,
	    253, 255, 253, 254, 255, 255, 255, 255, 254, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 223, 254,
	    254, 255, 255, 255, 255, 255, 255, 255, 255, 238,
	    253, 254, 254, 255, 255, 255, 255, 255, 255, 255,
	    255, 248, 254, 255, 255, 255, 255, 255, 255, 255,
	    255, 249, 254, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 253, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 247, 254, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 253, 254, 255,
	    255, 255, 255, 255, 255, 255, 255, 252, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    254, 254, 255, 255, 255, 255, 255, 255, 255, 255,
	    253, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 254, 253, 255, 255, 255, 255, 255,
	    255, 255, 255, 250, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 254, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 186, 251,
	    250, 255, 255, 255, 255, 255, 255, 255, 255, 234,
	    251, 244, 254, 255, 255, 255, 255, 255, 255, 255,
	    251, 251, 243, 253, 254, 255, 254, 255, 255, 255,
	    255, 255, 253, 254, 255, 255, 255, 255, 255, 255,
	    255, 255, 236, 253, 254, 255, 255, 255, 255, 255,
	    255, 255, 255, 251, 253, 253, 254, 254, 255, 255,
	    255, 255, 255, 255, 255, 254, 254, 255, 255, 255,
	    255, 255, 255, 255, 255, 254, 254, 254, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 254, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 254, 254,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 254,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 254, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 248, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 250, 254, 252, 254, 255, 255, 255,
	    255, 255, 255, 255, 248, 254, 249, 253, 255, 255,
	    255, 255, 255, 255, 255, 255, 253, 253, 255, 255,
	    255, 255, 255, 255, 255, 255, 246, 253, 253, 255,
	    255, 255, 255, 255, 255, 255, 255, 252, 254, 251,
	    254, 254, 255, 255, 255, 255, 255, 255, 255, 254,
	    252, 255, 255, 255, 255, 255, 255, 255, 255, 248,
	    254, 253, 255, 255, 255, 255, 255, 255, 255, 255,
	    253, 255, 254, 254, 255, 255, 255, 255, 255, 255,
	    255, 255, 251, 254, 255, 255, 255, 255, 255, 255,
	    255, 255, 245, 251, 254, 255, 255, 255, 255, 255,
	    255, 255, 255, 253, 253, 254, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 251, 253, 255, 255, 255,
	    255, 255, 255, 255, 255, 252, 253, 254, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 254, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 252, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 249, 255,
	    254, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 254, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 253, 255, 255, 255, 255, 255, 255, 255,
	    255, 250, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 254, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255]);

	module.exports = vp8_coef_update_probs;

/***/ },
/* 30 */
/***/ function(module, exports) {

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
	var vp8_ymode_prob_32 = new Uint32Array(vp8_ymode_prob.buffer);

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
	    x.entropy_hdr.y_mode_probs_32[0] = vp8_ymode_prob_32[0];
	/*
	    probs = vp8_uv_mode_prob;
	    //for (var i = 0; i < 3; i++)
	    x.entropy_hdr.uv_mode_probs[0] = probs[0];
	    x.entropy_hdr.uv_mode_probs[1] = probs[1];
	    x.entropy_hdr.uv_mode_probs[2] = probs[2];
	    */
	    x.entropy_hdr.uv_mode_probs.set(vp8_uv_mode_prob);
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

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	var vp8_mode_contexts =
	        [
	            new Uint8Array([7, 1, 1, 143]),
	            new Uint8Array([14, 18, 14, 107]),
	            new Uint8Array([135, 64, 57, 68]),
	            new Uint8Array([60, 56, 128, 65]),
	            new Uint8Array([159, 134, 128, 34]),
	            new Uint8Array([234, 188, 128, 28])

	        ];

	module.exports = vp8_mode_contexts;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bitreader = __webpack_require__(7);
	var vpx_read = bitreader.vpx_read;


	function vp8_treed_read(r, t, p, p_off) {
	    
	    var i = 0;


	        while ((i = t[ i + vpx_read(r, p[p_off + (i >> 1)])]) > 0) {}




	    return (-i) | 0;
	}

	module.exports = vp8_treed_read;

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';



	class vpx_codec_ctx {

	    constructor() {
	        this.name;             //Printable interface name
	        this.iface;     //vpx_codec_iface_t
	        this.err; //vpx_codec_err_t       /**< Last returned error */
	        this.err_detail;       /**< Detailed info, if available */
	        this.init_flags; // Flags passed at init time //vpx_codec_flags_t
	        this.config = {
	            vpx_codec_dec_cfg : null
	        };


	        this.priv; //vpx_codec_priv_t Algorithm private storage 
	    }
	    
	}

	module.exports = {};
	module.exports.vpx_codec_ctx_t = vpx_codec_ctx; //vpx_codec_ctx_t

/***/ }
/******/ ]);