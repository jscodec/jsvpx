var _ = require('lodash');
var process = require('process');
var Benchmark = require('benchmark');


var Benchmark = require('benchmark');
Benchmark = Benchmark.runInContext({_: _, process: process});
window.Benchmark = Benchmark;

var ivf = require('jsivf');
var jsvpx = require('../build-templates/jsvpx.js');
var testVectors = require('../test/test-vector-list.js');
var benchmarkOptions = {
    maxTime: 1000000,
    async: true
};


var suite = new Benchmark.Suite(benchmarkOptions);
var vectorFolder = '../vp8-test-vectors/';
var compressedFrames = [];
var comprehensiveTestFrames = [];

var decoder = new jsvpx();

//get first test vector
var vectorFile = testVectors[0];
var testVectorRequest = new XMLHttpRequest();
testVectorRequest.open("GET", vectorFolder + vectorFile, true);
testVectorRequest.responseType = "arraybuffer";

console.warn(testVectors.length);


document.getElementById('run').onclick = function () {
    console.log("Starting Experiments");
    //document.getElementById('gear').style.display = 'block';

    $("#gear").show("slow", function () {
        //loadVector(0);
        $("#results").hide("slow", function () {
            comprehensiveTestFrames = []; //todo: make this not suck and preload vectors
            loadVector(0);
        });
    });


};

function loadVector(vectorNumber) {
    //console.warn("Loading vector : " + vectorNumber);
    if (vectorNumber === testVectors.length) {
        runExperiment();
        return;
    }

    var file = testVectors[vectorNumber];
    var vectorLoader = new XMLHttpRequest();
    vectorLoader.open("GET", vectorFolder + file, true);
    vectorLoader.responseType = "arraybuffer";

    vectorLoader.onload = function (event) {
        //demux all the frames and append them to the compressed Frames array
        var demuxer = new ivf();

        demuxer.receiveBuffer(vectorLoader.response);
        demuxer.parseHeader();

        for (var i = 0; i < demuxer.frameCount; i++) {
            comprehensiveTestFrames.push(demuxer.processFrame());
        }

        loadVector(vectorNumber + 1);
    };

    vectorLoader.send(null);
}

function runExperiment() {

    suite.add("Working Copy", function () {

        for (var i = 0; i < comprehensiveTestFrames.length; i++) {
            decoder.decode(comprehensiveTestFrames[i]);

        }

    });

    suite.on('complete', function () {
        var benchTest1 = this[0];
        $("#gear").hide("slow", function () {
            document.getElementById('mean').innerHTML = benchTest1.stats.mean.toFixed(3) + "ms";
            document.getElementById('error').innerHTML = "&plusmn;" + benchTest1.stats.moe.toFixed(2) + "%";
            document.getElementById('stderror').innerHTML = benchTest1.stats.sem.toFixed(3) + "ms";
            document.getElementById('variance').innerHTML = benchTest1.stats.variance.toFixed(3) + "ms";
            document.getElementById('deviation').innerHTML = benchTest1.stats.deviation.toFixed(3) + "ms";
            $("#results").show("slow", function () {

            });
        });
        
        console.warn(this);
        if(benchTest1.aborted)
            console.warn(benchTest1.error.stack);

    }).run();
}

testVectorRequest.onload = function (event) {

    var demuxer = new ivf();

    demuxer.receiveBuffer(testVectorRequest.response);
    demuxer.parseHeader();

    for (var i = 0; i < demuxer.frameCount; i++) {
        compressedFrames.push(demuxer.processFrame());
    }

    addTest(compressedFrames, vectorFile);
    /*
     suite.on('complete', function () {
     var benchTest1 = this[0];
     document.getElementById('output').innerHTML = JSON.stringify(benchTest1.stats , null , ' ');   
     }).run();
     */
};
//testVectorRequest.send(null);


function addTest(compressedFrames, file) {

    suite.add(file, function () {
        var decoder = new jsvpx();
        for (var i = 0; i < compressedFrames.length; i++) {
            decoder.decode(compressedFrames[i]);
        }

    });
}







