const assert = require('assert');
const ivf = require('jsivf');
const fs = require('fs');
const path = require('path');
const md5 = require('js-md5');

const JsVpx = require('../build-templates/jsvpx.js');
const vectorPath = 'vp8-test-vectors/';

function pad(num, size) {
  var s = num + "";
  while (s.length < size)
    s = "0" + s;
  return s;
}

function testWrapper(ivfDataFile) {
  it('Testing vector Vector : ' + ivfDataFile, function () {
    var basename = ivfDataFile.substring(0, ivfDataFile.indexOf('.'));

    var data = fs.readFileSync(vectorPath + ivfDataFile);
    var demuxer = new ivf();

    demuxer.receiveBuffer(data);
    demuxer.parseHeader();

    const jsvpx = new JsVpx();
    let md5OutputData = '';

    for (var i = 0; i < demuxer.frameCount; i++) {
      var data = new Uint8Array(demuxer.processFrame());
      var testImg = jsvpx.decode(data);
      if (testImg) {
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
        for (var y = 0; y < chromaHeight; y++) {
          mainHash.update(testImg.img_data.subarray(u_off, u_off + chromaWidth));
          u_off += testImg.stride[1];
        }

        //UPDATING MAIN HASH V
        v_off = offsets[2];
        for (var y = 0; y < chromaHeight; y++) {
          mainHash.update(testImg.img_data.subarray(v_off, v_off + chromaWidth));
          v_off += testImg.stride[2];
        }

        var outData = mainHash.hex() + "  " + basename + "-";
        outData += testImg.d_w + "x" + testImg.d_h;
        outData += "-" + pad(jsvpx.decoder.priv.temp_pbi.frame_cnt, 4);
        outData += ".i420";
        outData += "\n";
        md5OutputData += outData;
      }
    }
    var md5Data = fs.readFileSync("vp8-test-vectors/" + basename + ".ivf.md5").toString();
    assert.equal(md5Data, md5OutputData);
  });
}

describe('Running Test Vector Unit Tests', function () {
  var vectorPath = './vp8-test-vectors/';
  var testFiles = fs.readdirSync(vectorPath);
  if (!testFiles.length) {
    throw new Error('No test vectors; may need to run "git submodule update --init"');
  }
  for (var key in testFiles) {
    var file = testFiles[key];
    if (path.extname(file) !== ".ivf")
      continue;
    testWrapper(file);
  }
});
