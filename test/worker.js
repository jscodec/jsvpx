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

	
	var filter = __webpack_require__(2);
	var filter_block2d = filter.filter_block2d;

	var c_utils = __webpack_require__(3);
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

/***/ },
/* 2 */
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
/* 3 */
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


/***/ }
/******/ ]);