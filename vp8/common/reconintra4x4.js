'use strict';


var tmp_4 = new Uint8Array(4);//4
//intra_prediction_down_copy in reconintra4x4
function intra_prediction_down_copy(recon, recon_off, stride) {
    /* Copy the four pixels above-right of subblock 3 to
     * above-right of subblocks 7, 11, and 15
     */
    
    var tmp = 0;
    var copy = (recon);
    var copy_off = (recon_off + 16 - stride);//*(void *)

    //recon[recon_off] = 0xFF;

    //stride = stride/4;



    var i;
    for (i = 0; i < 4; ++i)
        tmp_4[i] = copy[copy_off + i];
    copy_off += stride << 2;
    
    for (i = 0; i < 4; ++i)
        copy[copy_off + i] = tmp_4[i];

    copy_off += stride << 2;
    for (i = 0; i < 4; ++i)
        copy[copy_off + i] = tmp_4[i];
    copy_off += stride << 2;
    
    for (i = 0; i < 4; ++i)
        copy[copy_off + i] = tmp_4[i];

}


module.exports = {};
module.exports.intra_prediction_down_copy = intra_prediction_down_copy;