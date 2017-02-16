'use strict';
/**
 * 
 * This file provides our highest level interface into the decoders
 */

//possibly move interfaces to vp8dx
var ifaces = [
    {
        name: "jsvp8",
        iface : require('../vp8/vp8_js_iface.js')
    }
];

var VPX_CODEC_ABI_VERSION = 1;//temp
var VPX_DECODER_ABI_VERSION = VPX_CODEC_ABI_VERSION + 3;


function get_alg_priv(ctx) {
  return ctx.priv;
}


function vpx_codec_dec_init(ctx, iface, cfg, flags){
    
    return vpx_codec_dec_init_ver(ctx, iface, cfg, flags , VPX_DECODER_ABI_VERSION);
    
}

/**
 * 
 * @param {type} ctx
 * @param {vpx_codec_iface_t} iface vpx_codec_vp8_dx_algo
 * @param {type} cfg
 * @param {type} flags
 * @param {type} ver
 * @returns {undefined}
 */
function vpx_codec_dec_init_ver(ctx, iface, cfg, flags, ver){
    
    //iface.init()
    //console.log("Initializing decoder");
    //clear the ctx
    ctx.iface = iface;
    ctx.name = iface.name;
    ctx.priv = null;
    ctx.init_flags = flags;
    ctx.config.dec = cfg;
    
    
    ctx.iface.init(ctx, null);
}


function vpx_codec_peek_stream_info(){
    
}

function vpx_codec_get_stream_info(){
    
}

//line 104
function vpx_codec_decode(ctx, data, data_sz, user_priv, deadline) {
    var res = 0;

    //if (!ctx || (!data && data_sz) || (data && !data_sz))
    //   res = VPX_CODEC_INVALID_PARAM;
    //else if (!ctx.iface || !ctx.priv)
    //  res = VPX_CODEC_ERROR;
    //else {
    //get_alg_priv(ctx)
    res = ctx.iface.dec.decode(get_alg_priv(ctx), data, data_sz, user_priv,
            deadline);
    //console.log("NOW DECODING");
    //}

//return SAVE_STATUS(ctx, res);
}

function vpx_codec_get_frame(ctx, iter){
    var img;
    
    img = ctx.iface.dec.get_frame(ctx, iter);
    
    return img;
}

function vpx_codec_put_frame_cb_fn_t(){
    
}

function vpx_codec_register_put_frame_cb(){
    
}

function vpx_codec_register_put_slice_cb(){
    
}

module.exports = {
    ifaces : ifaces,
    vpx_codec_dec_init : vpx_codec_dec_init,
    vpx_codec_dec_init_ver : vpx_codec_dec_init_ver,
    vpx_codec_peek_stream_info : vpx_codec_peek_stream_info,
    vpx_codec_get_stream_info : vpx_codec_get_stream_info,
    vpx_codec_decode : vpx_codec_decode,
    vpx_codec_get_frame : vpx_codec_get_frame,
    vpx_codec_put_frame_cb_fn_t : vpx_codec_put_frame_cb_fn_t,
    vpx_codec_register_put_frame_cb : vpx_codec_register_put_frame_cb,
    vpx_codec_register_put_slice_cb : vpx_codec_register_put_slice_cb
};