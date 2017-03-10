'use strict';
var gpujs = require('../../libs/gpu.js');
var gpu;
var gpu_controller;

if (typeof document !== 'undefined') {
    var canvasEl = document.createElement('canvas'); //create the canvas object
    if (canvasEl.getContext) //if the method is not supported, i.e canvas is not supported
    {
        gpu = new gpujs();
        console.warn("Loading GPU");
    }
}


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


var VP8_FILTER_SHIFT = 7;


function CLAMP_255(x) {
    return  Math.min(Math.max(x, 0), 255);
}



function filter_block2d_first_pass(output,
        output_off, output_width, src, src_ptr,
        reference_stride, cols, output_height, vp8_filter) {
            
    var r = 0, c = 0;
    var Temp = 0;
    
    /*
    var render = gpu.createKernel(function (img_buffer) {
        
        return img_buffer[this.thread.x];
        
    }).dimensions([output.length]);
    */
    //output = render(output);
    //output = Uint8Array.from(render(output));
    //console.warn("done");

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

    for (r = 0; r < rows; r++)
    {
        for (c = 0; c < cols; c++)
        {
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

//likely filter_block2d
var temp = new Uint8Array(336);

function filter_block2d_gpu(output, output_off,
        output_stride, reference,
        reference_off, reference_stride,
        cols, rows,
        mx, my, filters) {


    filter_block2d_first_pass(temp, 0, 16,
            reference, reference_off - 2 * reference_stride, reference_stride,
            cols, rows + 5, filters[mx]);

    filter_block2d_second_pass(output, output_off, output_stride,
            temp, 32, 16, cols, rows, filters[my]);
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
    var mx = 0, my = 0;



    mx = mv_.x & 7;
    my = mv_.y & 7;
    //reference_off += ((mv_.y >> 3) * stride) + (mv_.x >> 3);

    if (mx | my)
    {
        filter_block2d(output, output_off, stride, reference, reference_off, stride, 4, 4, mx, my,
                filters);
        //reference = output;
        //reference_off = output_off;
    }

    //return_off[0] = reference_off;
    //return reference;
}

module.exports = {};
module.exports.filter_block2d_gpu = filter_block2d_gpu;
