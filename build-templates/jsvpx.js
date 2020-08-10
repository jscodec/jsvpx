var jsvpx = require('../vpx/vpx_decoder.js');

var vpx_codec = require('../vpx/vpx_codec.js');
var vpx_codec_ctx_t = vpx_codec.vpx_codec_ctx_t;


/**
 * Javascript style interface
 */

class JsVpx {

    constructor() {

        this.iface = jsvpx.ifaces[0].iface; // get jsvp8 decoder
        var cfg = null;
        var flags = null;
        this.decoder = new vpx_codec_ctx_t();

        jsvpx.vpx_codec_dec_init(this.decoder, this.iface, cfg, flags);//ctx, iface, cfg, flags

    }

    decode(buf) {
        var data = new Uint8Array(buf);
        var iter = null; //vpx_codec_iter_t

        var user_priv;
        var deadline;

        jsvpx.vpx_codec_decode(this.decoder, data, data.length, user_priv, deadline);

        var img = jsvpx.vpx_codec_get_frame(this.decoder, iter);

        if (img) {
            return img;
        }

    }

}

module.exports = JsVpx;