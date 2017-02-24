'use strict';

var min = Math.min;
var max = Math.max;

function CLAMP_255(x) {

    return min(max(x, 0), 255);

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
        ip0 = ip[ip_off] | 0;
        ip4 = ip[ip_off + 4] | 0;
        ip8 = ip[ip_off + 8] | 0;
        ip12 = ip[ip_off + 12] | 0;


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
    }

    //var mb_dqcoeff = input;
    for (i = 0; i < 16; i++) {
        //coeffs[coeffs_off + i * 16] = y2[i]; //no y2_off need
        input[mb_dqcoeff_ptr + (i << 4)] = output[i];
    }
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
        

        
        r0 = CLAMP_255(predict[predict_off] + ((a1 + d1 + 4) >> 3));
        r1 = CLAMP_255(predict[predict_off + 1] + ((b1 + c1 + 4) >> 3));
        r2 = CLAMP_255(predict[predict_off + 2] + ((b1 - c1 + 4) >> 3));
        r3 = CLAMP_255(predict[predict_off + 3] + ((a1 - d1 + 4) >> 3));
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
