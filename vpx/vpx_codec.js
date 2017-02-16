'use strict';



class vpx_codec_ctx {

    constructor() {
        this.name;             //Printable interface name
        this.iface;     //vpx_codec_iface_t
        this.err; //vpx_codec_err_t       /**< Last returned error */
        this.err_detail;       /**< Detailed info, if available */
        this.init_flags; // Flags passed at init time //vpx_codec_flags_t
        this.config = {
            vpx_codec_dec_cfg : null
        };


        this.priv; //vpx_codec_priv_t Algorithm private storage 
    }
    
}

module.exports = {};
module.exports.vpx_codec_ctx_t = vpx_codec_ctx; //vpx_codec_ctx_t