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
        //this.coeff_probs.data_64 = new Float64Array(this.coeff_probs.buffer);

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