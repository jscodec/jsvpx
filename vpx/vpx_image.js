'use strict';


var VPX_IMG_FMT_PLANAR = 0x100;
var VPX_IMG_FMT_UV_FLIP = 0x200;
var VPX_IMG_FMT_HAS_ALPHA = 0x400;

//Image format codes
var VPX_IMG_FMT_NONE = 0;
var VPX_IMG_FMT_RGB24 = 1;
var VPX_IMG_FMT_RGB32 = 2;
var VPX_IMG_FMT_RGB565 = 3;
var VPX_IMG_FMT_RGB555 = 4;
var VPX_IMG_FMT_UYVY = 5;
var VPX_IMG_FMT_YUY2 = 6;
var VPX_IMG_FMT_YVYU = 7;
var VPX_IMG_FMT_BGR24 = 8;
var VPX_IMG_FMT_RGB32_LE = 9;
var VPX_IMG_FMT_ARGB = 10;
var VPX_IMG_FMT_ARGB_LE = 11;
var VPX_IMG_FMT_RGB565_LE = 12;
var VPX_IMG_FMT_RGB555_LE = 13;
var VPX_IMG_FMT_YV12 = VPX_IMG_FMT_PLANAR | VPX_IMG_FMT_UV_FLIP | 1;
var VPX_IMG_FMT_I420 = VPX_IMG_FMT_PLANAR | 2;
var VPX_IMG_FMT_VPXYV12 = VPX_IMG_FMT_PLANAR | VPX_IMG_FMT_UV_FLIP | 3;
var VPX_IMG_FMT_VPXI420 = VPX_IMG_FMT_PLANAR | 4;

var VPX_PLANE_PACKED = 0;   /**< To be used for all packed formats */
var VPX_PLANE_Y = 0;   /**< Y (Luminance) plane */
var VPX_PLANE_U = 1;   /**< U (Chroma) plane */
var VPX_PLANE_V = 2;   /**< V (Chroma) plane */
var VPX_PLANE_ALPHA = 3;   /**< A (Transparency) plane */
var PLANE_PACKED = VPX_PLANE_PACKED;
var PLANE_Y = VPX_PLANE_Y;
var PLANE_U = VPX_PLANE_U;
var PLANE_V = VPX_PLANE_V;
var PLANE_ALPHA = VPX_PLANE_ALPHA;


Uint8ClampedArray.prototype.data_32 = null;
Uint8Array.prototype.data_32 = null;
/**
 * typedef struct vpx_image
 * vpx_image_t is alias for vpx_image
 */
class vpx_image_t {

    constructor() {
        this.fmt = 0; //can probably be uint

        /* Image storage dimensions */
        this.w = 0; // uint  struct0
        this.h = 0; // uint  struct1

        /* Image display dimensions */
        this.d_w = 0; //uint struct2
        this.d_h = 0; //uint struct3

        /* Chroma subsampling info */
        this.x_chroma_shift = 0; //uint
        this.y_chroma_shift = 0; // uint

        //this.planes = [0,0,0,0];//yuva
        this.planes_off = new Int32Array(4); // yuva
        this.stride = new Int32Array(4);

        this.bps = 0; // int
        this.user_priv = 0; 

        this.img_data = null;
        this.img_data_off = 0; //uint
        this.img_data_owner = 0; //int
        this.self_allocd = 0; //int
           
    }
}


function vpx_img_set_rect(img, x, y, w, h) {
        var data = 0;
        var data_off = 0;

        if (x + w <= img.w && y + h <= img.h) {
            img.d_w = w;
            img.d_h = h;

            /* Calculate plane pointers */
            if ((img.fmt & VPX_IMG_FMT_PLANAR) === 0) {
                img.img_data_off + (x * img.bps >> 3 + y * img.stride[VPX_PLANE_PACKED]) | 0;
            } else {
                data = img.img_data;
                data_off = img.img_data_off;

                if (img.fmt & VPX_IMG_FMT_HAS_ALPHA) {
                    img.planes_off[VPX_PLANE_ALPHA] =
                            data_off + x + y * img.stride[VPX_PLANE_ALPHA];
                    data_off += img.h * img.stride[VPX_PLANE_ALPHA];
                }


                img.planes_off[VPX_PLANE_Y] = data_off + x + y * img.stride[VPX_PLANE_Y];
                data_off += img.h * img.stride[VPX_PLANE_Y];

                if (!(img.fmt & VPX_IMG_FMT_UV_FLIP)) {
                    img.planes_off[VPX_PLANE_U] = data_off
                            + (x >> img.x_chroma_shift)
                            + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_U];
                    data_off += (img.h >> img.y_chroma_shift) * img.stride[VPX_PLANE_U];
                    img.planes_off[VPX_PLANE_V] = data_off
                            + (x >> img.x_chroma_shift)
                            + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_V];
                } else {
                    img.planes_off[VPX_PLANE_V] = data_off
                            + (x >> img.x_chroma_shift)
                            + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_V];
                    data_off += (img.h >> img.y_chroma_shift) * img.stride[VPX_PLANE_V];
                    img.planes_off[VPX_PLANE_U] = data_off
                            + (x >> img.x_chroma_shift)
                            + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_U];
                }
            }

            return 0;
        }

        return -1;
    }


function img_alloc_helper(img, fmt, d_w, d_h, stride_align, img_data) {
    var h = 0;
    var w = 0;
    var s = 0;
    var xcs = 0;
    var ycs = 0;
    var bps = 0;
    var align = 0;

    /* Treat align==0 like align==1 */
    if (!stride_align)
        stride_align = 1;

    /* Validate alignment (must be power of 2) */
    if (stride_align & (stride_align - 1))
        console.warn('Invalid stride align');

    /* Get sample size for img format */
    switch (fmt) {
        case VPX_IMG_FMT_RGB32:
        case VPX_IMG_FMT_RGB32_LE:
        case VPX_IMG_FMT_ARGB:
        case VPX_IMG_FMT_ARGB_LE:
            bps = 32;
            break;
        case VPX_IMG_FMT_RGB24:
        case VPX_IMG_FMT_BGR24:
            bps = 24;
            break;
        case VPX_IMG_FMT_RGB565:
        case VPX_IMG_FMT_RGB565_LE:
        case VPX_IMG_FMT_RGB555:
        case VPX_IMG_FMT_RGB555_LE:
        case VPX_IMG_FMT_UYVY:
        case VPX_IMG_FMT_YUY2:
        case VPX_IMG_FMT_YVYU:
            bps = 16;
            break;
        case VPX_IMG_FMT_I420:
        case VPX_IMG_FMT_YV12:
        case VPX_IMG_FMT_VPXI420:
        case VPX_IMG_FMT_VPXYV12:
            bps = 12;
            break;
        default:
            bps = 16;
            break;
    }

    /* Get chroma shift values for img format */
    switch (fmt) {
        case VPX_IMG_FMT_I420:
        case VPX_IMG_FMT_YV12:
        case VPX_IMG_FMT_VPXI420:
        case VPX_IMG_FMT_VPXYV12:
            xcs = 1;
            break;
        default:
            xcs = 0;
            break;
    }

    switch (fmt) {
        case VPX_IMG_FMT_I420:
        case VPX_IMG_FMT_YV12:
        case VPX_IMG_FMT_VPXI420:
        case VPX_IMG_FMT_VPXYV12:
            ycs = 1;
            break;
        default:
            ycs = 0;
            break;
    }

    /* Calculate storage sizes given the chroma subsampling */
    align = ((1 << xcs) - 1) | 0;
    w = ((d_w + align) & ~align) | 0;
    align = ((1 << ycs) - 1) | 0;
    h = ((d_h + align) & ~align) | 0;
    s = ((fmt & VPX_IMG_FMT_PLANAR) ? w : bps * w >> 3) | 0;
    s = ((s + stride_align - 1) & ~(stride_align - 1)) | 0;

    /* Allocate the new image */

    //todo: reset


    img.img_data = img_data;

    if (img_data === null) {

    } else {
        var size = 0;
        if ((fmt & VPX_IMG_FMT_PLANAR) === 0) {
            size = h * s;
        } else {

            size = (h * w * bps) >> 3;
        }
        //img.img_data = new Uint8ClampedArray(size);
        img.img_data = new Uint8Array(size);
        img.img_data.data_32 = new Uint32Array(img.img_data.buffer);
        img.img_data.data_16 = new Uint16Array(img.img_data.buffer);
        img.img_data_owner = 1;
    }


    img.fmt = fmt;
    img.w = w;
    img.h = h;
    img.x_chroma_shift = xcs;
    img.y_chroma_shift = ycs;
    img.bps = bps;

    /* Calculate strides */
    img.stride[VPX_PLANE_Y] = img.stride[VPX_PLANE_ALPHA] = s;
    img.stride[VPX_PLANE_U] = img.stride[VPX_PLANE_V] = s >> xcs;

    /* Default viewport to entire image */
    if (vpx_img_set_rect(img, 0, 0, d_w, d_h) === 0)
        return img;

}


module.exports = {};
module.exports.vpx_img_set_rect = vpx_img_set_rect;
module.exports.img_alloc_helper = img_alloc_helper;
module.exports.vpx_image_t = vpx_image_t;