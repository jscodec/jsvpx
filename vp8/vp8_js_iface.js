'use strict';

var VP8D_COMP = require('./decoder/onyxd_int.js');
var onyxd_if = require('./decoder/onyxd_if');
var vp8dx_receive_compressed_data = onyxd_if.vp8dx_receive_compressed_data;


class vpx_codec_alg_priv{
    
    constructor(){
        
        this.base; //vpx_codec_priv_t
        this.cfg;
        this.si; //vp8_stream_info_t
        this.decoder_init;
        this.postproc_cfg_set;
        this.postproc_cfg;
        
        this.decrypt_cb;
        this.decrypt_state;
        this.img;
        this.img_setup;
        this.yv12_frame_buffers; //frame_buffers
        this.user_priv;
        this.fragments; //FRAGMENT_DATA
        this.temp_pbi = null;
        
    }
    
}

function vp8_peek_si(){
    
}

function vp8_get_si(){
    
}

function vp8_decode(ctx, data, data_sz , user_priv , deadline){
    var res = 0; //VPX_CODEC_OK
    var resolution_change = 0;
    var w, h;
    //console.warn("decoding!");
    /*
     *  if (!ctx->fragments.enabled && (data == NULL && data_sz == 0)) {
    return 0;
  }
     */
    
    //if (update_fragments(ctx, data, data_sz, &res) <= 0) return res;
    
    //w = ctx.si.w;
    //h = ctx.si.h;
    
    //res = vp8_peek_si_internal(ctx->fragments.ptrs[0], ctx->fragments.sizes[0],
                      //       &ctx->si, ctx->decrypt_cb, ctx->decrypt_state);
                      
    //  if ((ctx->si.h != h) || (ctx->si.w != w)) resolution_change = 1;
    
    if (!res && !ctx.decoder_init) {
        
    }
    
    //line 399
    if (!ctx.temp_pbi) {
        
        var pbi = new VP8D_COMP();//this goes in frame buffers
        ctx.temp_pbi = pbi;
    }
    
    vp8dx_receive_compressed_data(ctx.temp_pbi, data_sz, data, deadline);
    
    return res;
    
}

function vp8_get_frame(decoder, iter) {
    if (decoder.priv.temp_pbi.common.show_frame) {
        return  decoder.priv.temp_pbi.ref_frames[0].img;
    }
    return null;
}

function vp8_init_ctx(ctx) {
    var priv = new vpx_codec_alg_priv();
    ctx.priv = priv;
    ctx.priv.init_flags = ctx.init_flags;
    //priv.si.sz = size of (priv.si)
    ctx.priv.decrypt_cb = null;
    ctx.priv.decrypt_state = null;

    if (ctx.config.dec) {
        // Update the reference to the config structure to an internal copy.
        priv.cfg = ctx.config.dec;
        ctx.config.dec = priv.cfg;
    }

    return 0;
}

function vp8_init(ctx, data) {

    var res; // = VPX_CODEC_OK;
    var priv = null;


    //vp8_rtcd();
    // vpx_dsp_rtcd();
    //vpx_scale_rtcd();

    if (!ctx.priv) {
        vp8_init_ctx(ctx);
        priv = ctx.priv;

        //priv.fragments.count = 0;

        //priv->fragments.enabled =
        //(priv->base.init_flags & VPX_CODEC_USE_INPUT_FRAGMENTS);
    } else {
        priv = ctx.priv;
    }

}

//vpx_codec_iface vpx_codec_internal.h

var vpx_codec_vp8_js = {
    name: "jscodec VP8 Decoder",
    abi_version : 0,
    caps : null,
    destroy : null,
    dec: {
        peek_si: vp8_peek_si,
        get_si: vp8_get_si,
        decode: vp8_decode,
        get_frame: vp8_get_frame
    },
    init : vp8_init
};//CODEC_INTERFACE

module.exports = vpx_codec_vp8_js;