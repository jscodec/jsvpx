'use strict';
var MotionVector = require('./mv.js');

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
            mv: new MotionVector(),
            partitioning: 0, 
            mb_skip_coeff: 0, 
            need_mc_border: 0,
            segment_id: 0,
            eob_mask: 0
        };
        
        this.bmi = null;

        /*
        var mvs = new Array(16);
        var i = 16;
        while (i--)
            mvs[i] = new MotionVector();
        
        //Only needed for spit mode, maybe can skip initialization unless splitt mode is on
        this.bmi =
                {
                    mvs: mvs,
                    modes: new Uint8Array(16)//16,'todo:enum prediction_mode')
                };
        */
    }

    init_split_mode() {
        var mvs = new Array(16);
        var i = 16;
        while (i--)
            mvs[i] = new MotionVector();

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