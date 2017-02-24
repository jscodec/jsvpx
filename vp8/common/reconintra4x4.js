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