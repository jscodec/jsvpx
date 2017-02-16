var jsvpx = require('../vpx/vpx_decoder.js');

var vpx_codec = require('../vpx/vpx_codec.js');
var vpx_codec_ctx_t = vpx_codec.vpx_codec_ctx_t;


var getTimestamp;
if (typeof performance === 'undefined' || typeof performance.now === 'undefined') {
    getTimestamp = Date.now;
} else {
    getTimestamp = performance.now.bind(performance);
}

class OGVVideoDecoder {

    constructor(options) {
        this.cpuTime = 0;
        this.loadedMetadata = true;
        this.frameBuffer = null;
        this.videoFormat = options.videoFormat || null;


        this.iface = jsvpx.ifaces[0].iface; // get jsvp8 decoder
        var cfg = null;
        var flags = null;
        this.decoder = new vpx_codec_ctx_t();

        jsvpx.vpx_codec_dec_init(this.decoder, this.iface, cfg, flags);//ctx, iface, cfg, flags


    }

    init(callback) {
        console.warn("STARTING CODEC JSVPX");
        callback();
    }

    processHeader(data, callback) {
        //console.error("PROCESS HEADER");
        this.loadedMetadata = true;
        callback(0);
    }

    processFrame(buf, callback) {

        var start = getTimestamp();

        var data = new Uint8Array(buf);


        var iter = null; //vpx_codec_iter_t

        var user_priv;
        var deadline;

        jsvpx.vpx_codec_decode(this.decoder, data, data.length, user_priv, deadline);

        var img = jsvpx.vpx_codec_get_frame(this.decoder, iter);

        if (img) {
            var offsets = img.planes_off;

            var imgData = img.img_data;

            var videoFormat = this.videoFormat;
            this.frameBuffer = {
                // @fixme what to do about the crop coordinates if resolution changes? can this happen in webm land? what about if ogv gets a new steam?
                format: {
                    width: img.d_w + 2, // this is wierd, ogv is cropping it at the wrong spot and making a green line
                    height: img.d_h,
                    chromaWidth: img.d_w >> 1,
                    chromaHeight: img.d_h >> 1,
                    cropLeft: videoFormat.cropLeft,
                    cropTop: videoFormat.cropTop,
                    cropWidth: videoFormat.cropWidth,
                    cropHeight: videoFormat.cropHeight,
                    displayWidth: videoFormat.displayWidth,
                    displayHeight: videoFormat.displayHeight
                },
                y: {
                    bytes: imgData.subarray(offsets[0], offsets[1]),
                    stride: img.stride[0]
                },
                u: {
                    bytes: imgData.subarray(offsets[1], offsets[2]),
                    stride: img.stride[1]
                },
                v: {
                    bytes: imgData.subarray(offsets[2]),
                    stride: img.stride[2]
                }
            };

        }

        var delta = (getTimestamp() - start);
        this.cpuTime += delta;
        callback(1);
    }

    close() {

    }
}

self.FlareVpx = OGVVideoDecoder;
module.exports = OGVVideoDecoder;