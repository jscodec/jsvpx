var ivf = require('jsivf');
var md5 = require('js-md5');
var jsvpx = require('../build-templates/jsvpx.js');
//var QUnit = require('qunitjs');

var testVectors = [
     /*
    'vp80-00-comprehensive-001.ivf',
    'vp80-00-comprehensive-002.ivf',
    'vp80-00-comprehensive-003.ivf',
    */
   
    'vp80-00-comprehensive-004.ivf',
    /*
    'vp80-00-comprehensive-005.ivf',
    'vp80-00-comprehensive-006.ivf',
    'vp80-00-comprehensive-007.ivf',
    'vp80-00-comprehensive-008.ivf',
    'vp80-00-comprehensive-009.ivf',
    'vp80-00-comprehensive-010.ivf',
    'vp80-00-comprehensive-011.ivf',
    'vp80-00-comprehensive-012.ivf',
    'vp80-00-comprehensive-013.ivf',
    'vp80-00-comprehensive-014.ivf',
    'vp80-00-comprehensive-015.ivf',
    'vp80-00-comprehensive-016.ivf',
    'vp80-00-comprehensive-017.ivf',
    'vp80-00-comprehensive-018.ivf',
    'vp80-01-intra-1400.ivf',
    'vp80-01-intra-1411.ivf',
    'vp80-01-intra-1416.ivf',
    'vp80-01-intra-1417.ivf',
    'vp80-02-inter-1402.ivf',
    'vp80-02-inter-1412.ivf',
    'vp80-02-inter-1418.ivf',
    'vp80-02-inter-1424.ivf',
    'vp80-03-segmentation-01.ivf',
    'vp80-03-segmentation-02.ivf',
    'vp80-03-segmentation-03.ivf',
    'vp80-03-segmentation-04.ivf',
    'vp80-03-segmentation-1401.ivf',
    'vp80-03-segmentation-1403.ivf',
    'vp80-03-segmentation-1407.ivf',
    'vp80-03-segmentation-1408.ivf',
    'vp80-03-segmentation-1409.ivf',
    'vp80-03-segmentation-1410.ivf',
    'vp80-03-segmentation-1413.ivf',
    'vp80-03-segmentation-1414.ivf',
    'vp80-03-segmentation-1415.ivf',
    'vp80-03-segmentation-1425.ivf',
    'vp80-03-segmentation-1426.ivf',
    'vp80-03-segmentation-1427.ivf',
    'vp80-03-segmentation-1432.ivf',
    'vp80-03-segmentation-1435.ivf',
    'vp80-03-segmentation-1436.ivf',
    'vp80-03-segmentation-1437.ivf',
    'vp80-03-segmentation-1441.ivf',
    'vp80-03-segmentation-1442.ivf',
    'vp80-04-partitions-1404.ivf',
    'vp80-04-partitions-1405.ivf',
    'vp80-04-partitions-1406.ivf',
    'vp80-05-sharpness-1428.ivf',
    'vp80-05-sharpness-1429.ivf',
    'vp80-05-sharpness-1430.ivf',
    'vp80-05-sharpness-1431.ivf',
    'vp80-05-sharpness-1433.ivf',
    'vp80-05-sharpness-1434.ivf',
    'vp80-05-sharpness-1438.ivf',
    'vp80-05-sharpness-1439.ivf',
    'vp80-05-sharpness-1440.ivf',
    'vp80-05-sharpness-1443.ivf'
    */
];

function pad(num, size) {
    var s = num + "";
    while (s.length < size)
        s = "0" + s;
    return s;
}

var vectorFolder = '../vp8-test-vectors/';
var output = document.getElementById('output');

var vector = 'vp80-00-comprehensive-001.ivf';


for (var i = 0; i < testVectors.length; i++) {
    loadTest(testVectors[i]);
    console.warn(testVectors[i]);
}

function loadTest(vectorFile) {
    

    

    QUnit.test(vectorFile, function (assert) {
        var done = assert.async();

        var testVectorRequest = new XMLHttpRequest();
        testVectorRequest.open("GET", vectorFolder + vectorFile, true);
        testVectorRequest.responseType = "arraybuffer";

        testVectorRequest.onload = function (event) {
            runTest(testVectorRequest.response, vectorFile, done);
        };
        testVectorRequest.send(null);
    });

    

    
}

function runTest(buffer, vectorFile, callback) {
    var demuxer = new ivf();

    demuxer.receiveBuffer(buffer);
    demuxer.parseHeader();

    var decoder = new jsvpx();
    var outData = "";

    for (var i = 0; i < demuxer.frameCount; i++) {
        var testImg = decoder.decode(demuxer.processFrame());
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


            outData += mainHash.hex() + "  " + vectorFile.split('.')[0] + "-";
            outData += testImg.d_w + "x" + testImg.d_h;
            outData += "-" + pad((i + 1), 4);
            outData += ".i420";
            outData += "\n";

        }


    }
    

    
    //output.innerHTML = outData;

    

        var validationRecordRequest = new XMLHttpRequest();
        validationRecordRequest.open("GET", vectorFolder + vectorFile + '.md5', true);
        validationRecordRequest.responseType = "text";
        validationRecordRequest.onload = function (event) {
            var validData = validationRecordRequest.response;
            QUnit.assert.strictEqual(outData, validData, "Md5 Vector Comparison");
            callback();
        };
        validationRecordRequest.send(null);
    //});

    

    


}
