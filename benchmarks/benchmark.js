var _ = require('lodash');
var process = require('process');
var Benchmark = require('benchmark');

var Benchmark = require('benchmark');
Benchmark = Benchmark.runInContext({_: _, process: process});
window.Benchmark = Benchmark;

var ivf = require('jsivf');
var jsvpx = require('../build-templates/jsvpx.js');
var testVectors = require('../test/test-vector-list.js');

var suite = new Benchmark.Suite();
var vectorFolder = '../vp8-test-vectors/';

//get first test vector
var vectorFile = testVectors[0];
var testVectorRequest = new XMLHttpRequest();
testVectorRequest.open("GET", vectorFolder + vectorFile, true);
testVectorRequest.responseType = "arraybuffer";

testVectorRequest.onload = function (event) {
    var demuxer = new ivf();
    var compressedFrames = [];
    demuxer.receiveBuffer(testVectorRequest.response);
    demuxer.parseHeader();

    for (var i = 0; i < demuxer.frameCount; i++) {
        compressedFrames.push(demuxer.processFrame());
    }

    addTest(compressedFrames, vectorFile);

    suite.on('complete', function () {
        var benchTest1 = this[0];
        document.getElementById('output').innerHTML = JSON.stringify(benchTest1.stats , null , ' ');   
    }).run();


};
testVectorRequest.send(null);


function addTest(compressedFrames, file) {

    suite.add(file, function () {
        var decoder = new jsvpx();
        for (var i = 0; i < compressedFrames.length; i++) {
            decoder.decode(compressedFrames[i]);
        }

    });
}







