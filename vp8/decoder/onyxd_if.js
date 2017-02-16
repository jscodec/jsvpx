'use strict';

var decodeframe = require('./decodeframe');
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