'use strict';

/**
 * file onyxc_int
 */
var NUM_YV12_BUFFERS = 4;
var MAX_MB_SEGMENTS = 4;

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

class VP8_COMMON {

    constructor() {
        this.error = 0;

        this.dequant_factors = new Array(MAX_MB_SEGMENTS);
        for (var i = 0; i < MAX_MB_SEGMENTS; i ++)
            this.dequant_factors[i] = new dequant_factors();

        this.Width;
        this.Height;
        this.horiz_scale;
        this.vert_scale;
        
        this.clamp_type; //CLAMP_TYPE
        
        this.frame_to_show; // YV12_BUFFER_CONFIG
        
        this.yv12_fb = new Array(NUM_YV12_BUFFERS);//YV12_BUFFER_CONFIG
        this.fb_idx_ref_cnt = new Array(NUM_YV12_BUFFERS);
        this.new_fb_idx = 0;
        this.lst_fb_idx = 0;
        this.gld_fb_idx = 0;
        this.alt_fb_idx = 0;

        this.temp_scale_frame;// YV12_BUFFER_CONFIG


        this.last_frame_type; // FRAME_TYPE - Save last frame's frame type for motion search.
        this.frame_type; //FRAME_TYPE
    }

}

module.exports = VP8_COMMON;