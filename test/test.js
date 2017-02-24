//Unit Tests
"use strict";
var jsvpx = require('../vpx/vpx_decoder.js');

var vpx_codec = require('../vpx/vpx_codec.js');
var vpx_codec_ctx_t = vpx_codec.vpx_codec_ctx_t;
//console.warn(jsvpx);

var assert = require('assert');
var readline = require('readline');
var vp8 = require('../vp8/decoder/onyxd_int.js');
//var onyxd_int =  require('../vp8/decoder/onyxd_int.js');

var ivf = require('jsivf');
var fs = require('fs');
var path = require('path');
var process = require("process");
var md5 = require('js-md5');


var c_utils = require('../util/c_utils.js');
var copy_entropy_values = c_utils.copy_entropy_values;



var decodeframe = require('../vp8/decoder/decodeframe.js');
var decode_mb_rows = decodeframe.decode_mb_rows;
var setup_token_decoder = decodeframe.setup_token_decoder;




var decodeframe = require('../vp8/decoder/decodeframe.js');
var vp8cx_init_de_quantizer = decodeframe.vp8cx_init_de_quantizer;

var vpx_image = require('../vpx/vpx_image.js');
var vpx_img_set_rect = vpx_image.vpx_img_set_rect;
var img_alloc_helper = vpx_image.img_alloc_helper;



var CURRENT_FRAME = 0;
var LAST_FRAME = 1;
var GOLDEN_FRAME = 2;
var ALTREF_FRAME = 3;
var NUM_REF_FRAMES = 4;

var BORDER_PIXELS = 16;

var BLOCK_TYPES = 4;
var PREV_COEF_CONTEXTS = 3;
var COEF_BANDS = 8;
var ENTROPY_NODES = 11;
var tmpFile = 'tmp.text';
var tmpPath = "tmp";


var vectorPath = 'vp8-test-vectors/';






var CURRENT_FRAME = 0;
var LAST_FRAME = 1;
var GOLDEN_FRAME = 2;
var ALTREF_FRAME = 3;
var NUM_REF_FRAMES = 4;


function pad(num, size) {
    var s = num + "";
    while (s.length < size)
        s = "0" + s;
    return s;
}


function testWrapper(ivfDataFile) {

    it('Testing vector Vector : ' + ivfDataFile, function () {


        var basename = ivfDataFile.substring(0, ivfDataFile.indexOf('.'));

        var md5OutPath = "output-vectors/" + basename + ".ivf.md5";
        //output-vectors/vp80-05-sharpness-1434.ivf.md5
        //output-vectors/vp80-05-sharpness-1443.ivf.md5
        //console.log(md5OutPath);
        if (fs.existsSync(md5OutPath)) {
            fs.unlinkSync(md5OutPath);
            //console.log("exists");
        }

        var data = fs.readFileSync(vectorPath + ivfDataFile);
        var demuxer = new ivf();

        demuxer.receiveBuffer(data);
        demuxer.parseHeader();

        var decoder_ = new vp8();
        

        var iface = jsvpx.ifaces[0].iface; // get jsvp8 decoder
        var cfg = null;
        var flags = null;
        
        
        var decoder = new vpx_codec_ctx_t();
        //console.log(iface.name);
        jsvpx.vpx_codec_dec_init(decoder, iface, cfg, flags);//ctx, iface, cfg, flags
        
        //vpx_codec_decode
        

        for (var i = 0; i < demuxer.frameCount; i++) {
            var data = new Uint8Array(demuxer.processFrame());
            //decode_frame(data, decoder_);
            
            var iter = null; //vpx_codec_iter_t
            
            var user_priv;
            var deadline;
            
            jsvpx.vpx_codec_decode(decoder, data, data.length, user_priv, deadline);
            
            //if ((img = vpx_codec_get_frame(&decoder, &iter)))
            //++frame_out;
            //}
            
            var testImg = jsvpx.vpx_codec_get_frame(decoder, iter);
            
            if (testImg) {
                //decoder.img = decoder.priv.temp_pbi.ref_frames[CURRENT_FRAME].img;

                //CURRENT_FRAME
                //var testImg = decoder.priv.temp_pbi.ref_frames[0].img;
                var offsets = testImg.planes_off;
                var y_off = offsets[0];
                var u_off = offsets[1];
                var v_off = offsets[2];


                var mainHash = md5.create();

                for (var y = 0; y < testImg.d_h; y++) {
                    mainHash.update(testImg.img_data.subarray(y_off, y_off + testImg.d_w));
                    y_off += testImg.stride[0];
                }

                var chromaHeight = ((1 + testImg.d_h) / 2) | 0;
                var chromaWidth = ((1 + testImg.d_w) / 2) | 0;


                //UPDATING MAIN HASH U
                u_off = offsets[1];
                for (var y = 0; y < chromaHeight; y++) //testImg.d_h
                {


                    mainHash.update(testImg.img_data.subarray(u_off, u_off + chromaWidth));
                    u_off += testImg.stride[1];
                }

                //UPDATING MAIN HASH V
                v_off = offsets[2];
                for (var y = 0; y < chromaHeight; y++) //testImg.d_h
                {

                    mainHash.update(testImg.img_data.subarray(v_off, v_off + chromaWidth));
                    v_off += testImg.stride[2];
                }


                var outData = mainHash.hex() + "  " + basename + "-";
                outData += testImg.d_w + "x" + testImg.d_h;
                outData += "-" + pad(decoder.priv.temp_pbi.frame_cnt, 4);
                outData += ".i420";
                outData += "\n";
                fs.appendFileSync("./output-vectors/" + basename + ".ivf.md5", outData);
            }

            //assert.equal(md5Data, outputData);
        }
        var md5Data = fs.readFileSync("vp8-test-vectors/" + basename + ".ivf.md5").toString();
        var outputData = fs.readFileSync("output-vectors/" + basename + ".ivf.md5").toString();
        //console.log(outputData);
        assert.equal(md5Data, outputData);


    });
}




describe('Running Test Vector Unit Tests', function () {


    var vectorPath = './vp8-test-vectors/';
    var testFiles = fs.readdirSync(vectorPath);
    if (!testFiles.length) {
        throw new Error('No test vectors; may need to run "git submodule update --init"');
    }

    var md5File;

    for (var key in testFiles) {

        var file = testFiles[key];
        if (path.extname(file) !== ".ivf")
            continue;


        var ivfDataFile = file.slice(0, -4);
        //md5File = ivfDataFile + ".md5";

        testWrapper(file);
        //describe('Testing vector Vector : ' + ivfDataFile, function () {

    }

});

