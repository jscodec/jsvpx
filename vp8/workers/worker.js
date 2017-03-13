
var filter = require('../common/filter.js');
var filter_block2d = filter.filter_block2d;

var c_utils = require('../../util/c_utils.js');
var memset = c_utils.memset;
var memcpy = c_utils.memcpy;

function CLAMP_255(x) {
    return Math.min(Math.max(x, 0), 255);
}


var SPLITMV = 9;

console.warn('worker on');

onmessage = function (e) {
    
    var data = e.data;
    console.log( data);
    //console.warn(data);
    worker_filter(
            data[0],
            data[1],
            data[2],
            data[3],
            data[4],
            data[5],
            data[6],
            data[7],
            data[8],
            data[9],
            data[10],
            data[11],
            data[12],
            data[13],
            data[14],
            data[15],
            data[16]
            );

};
function worker_filter(mb_col, mb_row, w, h, u, u_off,
        v_off, emul_block, emul_block_off,
        reference, subpixel_filters, coeffs, coeffs_off, mbi, reference_offset, chroma_mv_prv , uv_stride) {


    var tmp = emul_block;
    emul_block = new Uint8Array(tmp);
    emul_block.data_32 = new Uint32Array(tmp);
    
    tmp = reference;
    reference = new Uint8Array(tmp);
    reference.data_32 = new Uint32Array(tmp);

    coeffs = new Uint32Array(coeffs);
    
    var x = mb_col << 4;
    var y = mb_row << 4;

    // Chroma 
    x >>= 1;
    y >>= 1;
    w >>= 1;
    h >>= 1;

    var uv_stride_4_8 = 4 * uv_stride - 8;

    for (var b = 0; b < 4; b++) {

        recon_1_edge_block(u, u_off, emul_block, emul_block_off, reference, u_off + reference_offset, //u
                uv_stride,
                chroma_mv_prv[b], subpixel_filters,
                coeffs, coeffs_off, mbi, x, y, w, h, b + 16);


        recon_1_edge_block(u, v_off, emul_block, emul_block_off, reference, v_off + reference_offset, //v
                uv_stride,
                chroma_mv_prv[b], subpixel_filters,
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

var tmp = new Int16Array(16);
var cospi8sqrt2minus1 = 20091;
var sinpi8sqrt2 = 35468; // (<<15 + 2700)
function vp8_short_idct4x4llm_c(recon, recon_off, predict, predict_off, stride, coeffs, coeffs_off) {

    var i = 0;
    var a1 = 0, b1 = 0, c1 = 0, d1 = 0, temp1 = 0, temp2 = 0;
    var tmp_off = 0;



    //START IDCT
    var ip = coeffs;
    var ip_off = coeffs_off;
    var op = tmp;
    var op_off = tmp_off;
    var shortpitch = 4;
    
    for (i = 0; i < 4; i++) {
        var ip_0 = ip[ip_off];
        var ip_4 = ip[ip_off + 4];
        var ip_12 = ip[ip_off + 12];
        var ip_8 = ip[ip_off + 8];

        a1 = ip_0+ ip_8;
        b1 = ip_0 - ip_8;

        temp1 = (ip_4 * sinpi8sqrt2) >> 16;
        temp2 = ip_12 +
                ((ip_12 * cospi8sqrt2minus1/* + rounding */) >> 16);
        c1 = temp1 - temp2;

        temp1 = ip_4 +
                ((ip_4 * cospi8sqrt2minus1) >> 16);
        temp2 = (ip_12 * sinpi8sqrt2) >> 16;
        d1 = temp1 + temp2;

        op[op_off] = a1 + d1;
        op[op_off + shortpitch * 3] = a1 - d1;

        op[op_off + shortpitch] = b1 + c1;
        op[op_off + shortpitch * 2] = b1 - c1;

        ip_off++;
        op_off++;
    }

    //END IDCT

    coeffs = tmp;
    coeffs_off = tmp_off;

    for (i = 0; i < 4; i++) {

        var coeffs_0 = coeffs[coeffs_off];
        var coeff_1 = coeffs[coeffs_off + 1];
        var coeffs_2 = coeffs[coeffs_off + 2];
        var coeff_3 = coeffs[coeffs_off + 3];
        
        
        
        a1 = coeffs_0 + coeffs_2;
        b1 = coeffs_0 - coeffs_2;

        temp1 = (coeff_1 * sinpi8sqrt2/* + rounding */) >> 16;
        temp2 = coeff_3 + ((coeff_3 * cospi8sqrt2minus1/* + rounding */) >> 16);
        c1 = temp1 - temp2;

        temp1 = coeff_1 +
                ((coeff_1 * cospi8sqrt2minus1/* + rounding */) >> 16);
        temp2 = (coeff_3 * sinpi8sqrt2/* + rounding */) >> 16;
        d1 = temp1 + temp2;

        recon[recon_off + 0] = CLAMP_255(predict[predict_off] + ((a1 + d1 + 4) >> 3));//CLAMP_255
        recon[recon_off + 3] = CLAMP_255(predict[predict_off + 3] + ((a1 - d1 + 4) >> 3));//CLAMP_255
        recon[recon_off + 1] = CLAMP_255(predict[predict_off + 1] + ((b1 + c1 + 4) >> 3));//CLAMP_255
        recon[recon_off + 2] = CLAMP_255(predict[predict_off + 2] + ((b1 - c1 + 4) >> 3));//CLAMP_255

        coeffs_off += 4;
        recon_off += stride;
        predict_off += stride;
    }

    //clamp might be at the end
}