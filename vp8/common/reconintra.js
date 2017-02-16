'use strict';

var reconintra4x4 = require('./reconintra4x4.js');
var intra_prediction_down_copy = reconintra4x4.intra_prediction_down_copy;

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

var idctllm = require('../common/idctllm.js');
var vp8_short_inv_walsh4x4_c = idctllm.vp8_short_inv_walsh4x4_c;
var vp8_short_idct4x4llm_c = idctllm.vp8_short_idct4x4llm_c;


var min = Math.min;
var max = Math.max;
function CLAMP_255(x) {
    return  min(max(x, 0), 255);
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
        dc += left[left_off] + above[above_off + i];//*left
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

            if ((i & 3) == 3)
                predict_off += stride * 4 - 16;
        }

    }

}

//found in reconintra4x4
//likeley line 183
function  b_pred(predict, predict_off, stride, mbi, coeffs, coeffs_off) {

    var i = 0;

    intra_prediction_down_copy(predict, predict_off, stride);

 
    //line 165 in decode frame

    for (i = 0; i < 16; i++) {
        var b_predict = predict;
        var b_predict_off = predict_off + (i & 3) * 4;


        switch (mbi.bmi.modes[i])
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
    
    predict[predict_off] = pred0 =
            (left0 + abovem1 + 1) >> 1;
    predict[predict_off + 1] = pred1 =
            (left0 + 2 * abovem1 + above0 + 2) >> 2;
    predict[predict_off + 2] = pred2 =
            (above[above_off - 1] + 2 * above0 + above1 + 2) >> 2;
    predict[predict_off + 3] = pred3 =
            (above0 + (above1 << 1) + above2 + 2) >> 2;
    predict_off += stride;

    predict[predict_off] = pred4 =
            (left1 + left0 + 1) >> 1;
    predict[predict_off + 1] = pred5 =
            (left1 + 2 * left0 + abovem1 + 2) >> 2;
    predict[predict_off + 2] = pred0;
    predict[predict_off + 3] = pred1;
    predict_off += stride;

  
    predict[predict_off] = pred6 =
            (left2 + left1 + 1) >> 1;
    predict[predict_off + 1] = pred7 =
            (left2 + 2 * left1 + left0 + 2) >> 2;
    predict[predict_off + 2] = pred4;
    predict[predict_off + 3] = pred5;
    predict_off += stride;

    
    
    predict[predict_off] = pred8 =
            (left3 + left2 + 1) >> 1;
    predict[predict_off + 1] = pred9 =
            (left3 + 2 * left2 + left1 + 2) >> 2;
    predict[predict_off + 2] = pred6;
    predict[predict_off + 3] = pred7;
}


function predict_vr_4x4(predict, predict_off, stride) {
    var left = predict;
    var left_off = predict_off - 1;
    var above = predict;
    var above_off = predict_off - stride;
    var pred0 = 0, pred1 = 0, pred2 = 0, pred3 = 0, pred4 = 0, pred5 = 0, pred6 = 0,
            pred7 = 0, pred8 = 0, pred9 = 0;
    
    var above0 = above[above_off];
    var above1 = above[above_off + 1];
    var above2 = above[above_off + 2];
    var above3 = above[above_off + 3];
    
    var left0 = left[left_off + 0];

    predict[predict_off] = pred0 = (above[above_off - 1] + above0 + 1) >> 1;
    predict[predict_off + 1] = pred1 = (above0 + above1 + 1) >> 1;
    predict[predict_off + 2] = pred2 = (above1 + above2 + 1) >> 1;
    predict[predict_off + 3] = pred3 = (above2 + above3 + 1) >> 1;
    predict_off += stride;

    predict[predict_off + 0] = pred4 =
            (left[left_off + 0] + 2 * above[above_off - 1] + above0 + 2) >> 2;
    predict[predict_off + 1] = pred5 =
            (above[above_off - 1] + 2 * above0 + above1 + 2) >> 2;
    predict[predict_off + 2] = pred6 =
            (above0 + 2 * above1 + above2 + 2) >> 2;
    predict[predict_off + 3] = pred7 =
            (above1 + 2 * above2 + above[above_off + 3] + 2) >> 2;
    predict_off += stride;

    predict[predict_off + 0] = pred8 =
            (left[left_off + stride] + 2 * left0 + above[above_off - 1] + 2) >> 2;
    predict[predict_off + 1] = pred0;
    predict[predict_off + 2] = pred1;
    predict[predict_off + 3] = pred2;
    predict_off += stride;

    predict[predict_off + 0] = pred9 =
            (left[left_off + stride * 2] + 2 * left[left_off + stride] + left0 + 2) >> 2;
    predict[predict_off + 1] = pred4;
    predict[predict_off + 2] = pred5;
    predict[predict_off + 3] = pred6;
}


function predict_rd_4x4(predict, predict_off, stride) {
    var left = predict;
    var left_off = predict_off - 1;
    var above = predict;
    var above_off = predict_off - stride;
    var pred0 = 0, pred1 = 0, pred2 = 0, pred3 = 0, pred4 = 0, pred5 = 0, pred6 = 0;

    var above0 = above[above_off];
    var above1 = above[above_off + 1];
    var above2 = above[above_off + 2];
    var above3 = above[above_off + 3];
    
    var left0 = left[left_off];
    var left1 = left[left_off + stride];
    var left2 = left[left_off + stride * 2];

    predict[predict_off + 0] = pred0 =
            (left[left_off + 0] + 2 * above[above_off - 1] + above0 + 2) >> 2;
    predict[predict_off + 1] = pred1 =
            (above[above_off - 1] + 2 * above0 + above1 + 2) >> 2;
    predict[predict_off + 2] = pred2 =
            (above0 + 2 * above1 + above2 + 2) >> 2;
    predict[predict_off + 3] = pred3 =
            (above1 + 2 * above2 + above3 + 2) >> 2;
    predict_off += stride;

    predict[predict_off + 0] = pred4 =
            (left1 + 2 * left0 + above[above_off - 1] + 2) >> 2;
    predict[predict_off + 1] = pred0;
    predict[predict_off + 2] = pred1;
    predict[predict_off + 3] = pred2;
    predict_off += stride;

    predict[predict_off + 0] = pred5 =
            (left2 + 2 * left1 + left0 + 2) >> 2;
    predict[predict_off + 1] = pred4;
    predict[predict_off + 2] = pred0;
    predict[predict_off + 3] = pred1;
    predict_off += stride;

    predict[predict_off + 0] = pred6 =
            (left[left_off + stride * 3] + 2 * left2 + left1 + 2) >> 2;
    predict[predict_off + 1] = pred5;
    predict[predict_off + 2] = pred4;
    predict[predict_off + 3] = pred0;
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

    predict[predict_off + 0] = pred0 =
            (left0 + left1 + 1) >> 1;
    predict[predict_off + 1] = pred1 =
            (left0 + 2 * left1 + left2 + 2) >> 2;
    predict[predict_off + 2] = pred2 =
            (left1 + left2 + 1) >> 1;
    predict[predict_off + 3] = pred3 =
            (left1 + 2 * left2 + left3 + 2) >> 2;
    predict_off += stride;

    predict[predict_off + 0] = pred2;
    predict[predict_off + 1] = pred3;
    predict[predict_off + 2] = pred4 =
            (left2 + left3 + 1) >> 1;
    predict[predict_off + 3] = pred5 =
            (left2 + 2 * left3 + left3 + 2) >> 2;
    predict_off += stride;

    predict[predict_off + 0] = pred4;
    predict[predict_off + 1] = pred5;
    predict[predict_off + 2] = pred6 = left3;
    predict[predict_off + 3] = pred6;
    predict_off += stride;

    predict[predict_off + 0] = pred6;
    predict[predict_off + 1] = pred6;
    predict[predict_off + 2] = pred6;
    predict[predict_off + 3] = pred6;
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
    pred3 = (above3 + (above4 << 1) + above[above_off + 5] + 2) >> 2;

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

    var above0 = above[above_off] | 0;
    var above1 = above[above_off + 1] | 0;
    var above2 = above[above_off + 2] | 0;
    var above3 = above[above_off + 3] | 0;
    var above4 = above[above_off + 4];
    
    
    predict[predict_off] = pred0 = (above0 + above1 + 1) >> 1;
    predict[predict_off + 1] = pred1 = (above1 + above2 + 1) >> 1;
    predict[predict_off + 2] = pred2 = (above2 + above3 + 1) >> 1;
    predict[predict_off + 3] = pred3 = (above[above_off + 3] + above4 + 1) >> 1;
    predict_off += stride;

    predict[predict_off] = pred4 =
            (above0 + 2 * above1 + above2 + 2) >> 2;
    predict[predict_off + 1] = pred5 =
            (above1 + 2 * above2 + above3 + 2) >> 2;
    predict[predict_off + 2] = pred6 =
            (above2 + 2 * above3 + above4 + 2) >> 2;
    predict[predict_off + 3] = pred7 =
            (above3 + 2 * above4 + above[above_off + 5] + 2) >> 2;
    predict_off += stride;

    predict[predict_off] = pred1;
    predict[predict_off + 1] = pred2;
    predict[predict_off + 2] = pred3;
    predict[predict_off + 3] = pred8 = (above4 + 2 * above[above_off + 5] + above[above_off + 6] + 2) >> 2;
    predict_off += stride;

    predict[predict_off] = pred5;
    predict[predict_off + 1] = pred6;
    predict[predict_off + 2] = pred7;
    predict[predict_off + 3] = (above[above_off + 5] + 2 * above[above_off + 6] + above[above_off + 7] + 2) >> 2;
}


module.exports = {};
module.exports.predict_intra_chroma = predict_intra_chroma;
module.exports.predict_intra_luma = predict_intra_luma;
