(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict"; 
var VPX_CODEC_CORRUPT_FRAME = -1;
var VPX_CODEC_OK = 1;
var VPX_CODEC_UNSUP_BITSTREAM = 0;


var FRAME_HEADER_SZ = 3;
var KEYFRAME_HEADER_SZ = 7;
var MB_FEATURE_TREE_PROBS = 3;
var MAX_MB_SEGMENTS = 4;

/*
 *Bit ops
 */
function BITS_MASK(n) {
    return ((1 << (n)) - 1);
}


function BITS_GET(val, bit, len) {
    return (((val) >> (bit)) & BITS_MASK(len));
}

function CHECK_FOR_UPDATE(lval, rval, update_flag) {
    do {
        var old = lval;
        update_flag[0] |= (old !== (lval = rval));
    } while (0)
    return lval;
}

//This is our ctx, just keep one main class
class Vp8 {

    constructor() {
        this.currentFrame;
        this.frame_hdr = new FrameHeader(this);
    }

    decode(frame) {
        var bool = new BoolDecoder(); // the bool decoder
        this.currentFrame = new Uint8Array(frame);
        console.log("decoding");
        var status = 1;
        var i = 0, row = 0, partition = 0;
        this.data_off = 0;
        this.sz = frame.byteLength;
        this.saved_entropy_valid = 0;

        status = this.vp8_parse_frame_header();

        this.data_off += FRAME_HEADER_SZ;
        this.sz -= FRAME_HEADER_SZ;

        if (this.frame_hdr.is_keyframe) {
            this.data_off += KEYFRAME_HEADER_SZ;
            this.sz -= KEYFRAME_HEADER_SZ;
            this.mb_cols = Math.floor((this.frame_hdr.kf.w + 15) / 16);
            this.mb_rows = Math.floor((this.frame_hdr.kf.h + 15) / 16);
        }

        //bool.init(new Uint8Array(frame, this.data_off));
//vp8dx_start_decode(bool , new Uint8Array(frame, this.data_off))
        this.decode_segmentation_header(bool);


        /* Skip the colorspace and clamping bits */
        //if (this.frame_hdr.is_keyframe)
            //if (bool.get_uint(2))
                //throw "Reserved bits not supported.";


        //console.log(this);
        //console.log(bool);
    }

    decode_segmentation_header(bool)
    {
        if (this.frame_hdr.is_keyframe)
            this.frame_hdr.enabled = bool.get_bit();

        if (this.frame_hdr.enabled)
        {
            var i = 0;

            this.frame_hdr.update_map = bool.get_bit();
            this.frame_hdr.update_data = bool.get_bit();

            if (this.frame_hdr.update_data)
            {
                this.frame_hdr.abs_ = bool.get_bit();

                for (i = 0; i < MAX_MB_SEGMENTS; i++)
                    this.frame_hdr.quant_idx[i] = bool.maybe_get_int(7);

                for (i = 0; i < MAX_MB_SEGMENTS; i++)
                    this.frame_hdr.lf_level[i] = bool.maybe_get_int(6);
            }

            if (this.frame_hdr.update_map)
            {
                for (i = 0; i < MB_FEATURE_TREE_PROBS; i++)
                    this.frame_hdr.tree_probs[i] = bool.get_bit()
                            ? bool.get_uint(8)
                            : 255;
            }
        } else
        {
            this.frame_hdr.update_map = 0;
            this.frame_hdr.update_data = 0;
        }
    }

    vp8_parse_frame_header() {

        var raw = 0;
        var data = this.currentFrame;

        if (data.byteLength < 10)
            return VPX_CODEC_CORRUPT_FRAME;

        raw = data[0] | (data[1] << 8) | (data[2] << 16);
        this.frame_hdr.is_keyframe = !BITS_GET(raw, 0, 1);
        this.frame_hdr.version = BITS_GET(raw, 1, 2);
        this.frame_hdr.is_experimental = BITS_GET(raw, 3, 1);
        this.frame_hdr.is_shown = BITS_GET(raw, 4, 1);
        this.frame_hdr.part0_sz = BITS_GET(raw, 5, 19);

        if (data.byteLength <= this.frame_hdr.part0_sz + (this.frame_hdr.is_keyframe ? 10 : 3))
            return VPX_CODEC_CORRUPT_FRAME;

        this.frame_hdr.frame_size_updated = 0;

        if (this.frame_hdr.is_keyframe)
        {
            var update = [0];

            /* Keyframe header consists of a three byte sync code followed
             * by the width and height and associated scaling factors.
             */
            if (data[3] !== 0x9d || data[4] !== 0x01 || data[5] !== 0x2a)
                return -1;// VPX_CODEC_UNSUP_BITSTREAM;

            raw = data[6] | (data[7] << 8)
                    | (data[8] << 16) | (data[9] << 24);

            this.frame_hdr.kf.w = CHECK_FOR_UPDATE(this.frame_hdr.kf.w, BITS_GET(raw, 0, 14),
                    update);
            this.frame_hdr.kf.scale_w = CHECK_FOR_UPDATE(this.frame_hdr.kf.scale_w, BITS_GET(raw, 14, 2),
                    update);
            this.frame_hdr.kf.h = CHECK_FOR_UPDATE(this.frame_hdr.kf.h, BITS_GET(raw, 16, 14),
                    update);
            this.frame_hdr.kf.scale_h = CHECK_FOR_UPDATE(this.frame_hdr.kf.scale_h, BITS_GET(raw, 30, 2),
                    update);

            this.frame_hdr.frame_size_updated = update[0];

            if (!this.frame_hdr.kf.w || !this.frame_hdr.kf.h)
                return -1;//VPX_CODEC_UNSUP_BITSTREAM;
        }


        return VPX_CODEC_OK;
    }

}

class FrameHeader {
    
    constructor(context) {
   
        this.context = context;
        this.kf = {//vp8_kf_hdr:
            w: 0, /* Width */
            h: 0, /* Height */
            scale_w: 0, /* Scaling factor, Width */
            scale_h: 0   /* Scaling factor, Height */
        }; // kf;
    }
}

class BoolDecoder {

    constructor() {
        this.input;
        this.input_len;
        this.range;
        this.value;
        this.bit_count;
    }

    init(frame, offset) {
        this.input = new Uint8Array(frame, offset);
        this.sz = frame.byteLength;
        if (this.sz >= 2)
        {
            this.value = (this.input[0] << 8) | this.input[1];
            this.input = new Uint8Array(frame, offset + 2);
            this.input_len = this.sz - 2;
        } else
        {
            this.value = 0;
            this.input = null;
            this.input_len = 0;
        }

        this.range = 255;    /* initial range is full */
        this.bit_count = 0;  /* have not yet shifted out any bits */
    }


    get(probability)
    {
        /* range and split are identical to the corresponding values
         used by the encoder when this bool was written */

        var split = 1 + (((this.range - 1) * probability) >> 8);
        var SPLIT = split << 8;
        var retval = 0;           /* will be 0 or 1 */

        if (this.value >= SPLIT)    /* encoded a one */
        {
            retval = 1;
            this.range -= split;  /* reduce range */
            this.value -= SPLIT;  /* subtract off left endpoint of interval */
        } else                  /* encoded a zero */
        {
            retval = 0;
            this.range = split; /* reduce range, no change in left endpoint */
        }

        while (this.range < 128)    /* shift out irrelevant value bits */
        {
            this.value <<= 1;
            this.range <<= 1;

            if (++this.bit_count === 8)    /* shift in new bits 8 at a time */
            {
                this.bit_count = 0;

                if (this.input_len)
                {
                    this.value |= this.input[this.input_off++];
                    this.input_len--;
                }
            }
        }

        return retval;
    }

    get_bit() {
        return this.get(128);
    }

    get_uint(bits) {
        var z = 0;
        var bit = 0;

        for (bit = bits - 1; bit >= 0; bit--)
        {
            z |= (this.get_bit() << bit);
        }

        return z;
    }

    bool_maybe_get_int(bits){
        return this.get_bit() ? this.get_int(bits) : 0;
    }

}

//window.Flare = window.Flare || {};
//window.Flare.Vp8 = Vp8;
module.exports = Vp8;
},{}]},{},[1]);
