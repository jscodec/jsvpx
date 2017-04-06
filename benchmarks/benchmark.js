google.charts.load('current', {packages: ['corechart', 'bar']});
var testVectors = require('../test/test-vector-list.js');

var select = $('#vector-select');
for(var val in testVectors) {
    $('<option />', {value: val, text: testVectors[val]}).appendTo(select);
}


var _ = require('lodash');
var process = require('process');
var Benchmark = require('benchmark');

var blankFormat = {
    videoFormat: {
        cropLeft: null,
        cropTop: null,
        cropWidth: null,
        cropHeight: null,
        displayWidth: null,
        displayHeight: null
    }
};

var Benchmark = require('benchmark');
Benchmark = Benchmark.runInContext({_: _, process: process});
window.Benchmark = Benchmark;

var emscriptenDecoder = new OGVDecoderVideoVP8(blankFormat);
emscriptenDecoder.init(function () {});

var ivf = require('jsivf');
var jsvpx = require('../build-templates/OgVVideoDecoder.js');

var benchmarkOptions = {
    maxTime: 1000000,
    async: true
};


var suite = new Benchmark.Suite(benchmarkOptions);
var vectorFolder = '../vp8-test-vectors/';
var compressedFrames = [];
window.comprehensiveTestFrames = [];



var decoder = new jsvpx(blankFormat);


document.getElementById('run').onclick = function () {
    console.log("Starting Experiments");
    //document.getElementById('gear').style.display = 'block';

    $("#gear").show("slow", function () {
        //loadVector(0);
        $("#results").hide("slow", function () {
            comprehensiveTestFrames = []; //todo: make this not suck and preload vectors
            loadVector(select.val());
        });
    });

};

function loadVector(vectorNumber) {



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

        suite.run();
    };

    vectorLoader.send(null);
}

suite.add("JsVpx", function () {

    for (var i = 0; i < comprehensiveTestFrames.length; i++) {

        decoder.processFrame(comprehensiveTestFrames[i], function () {});

    }

});

suite.add("Emscripten", function () {

    for (var i = 0; i < comprehensiveTestFrames.length; i++) {
        emscriptenDecoder.processFrame(comprehensiveTestFrames[i], function () {});
    }

});

suite.on('complete', function () {
    var benchTest1 = this[0];
    var benchTest2 = this[1];
    $("#gear").hide("slow", function () {
        document.getElementById('mean1').innerHTML = benchTest1.stats.mean.toFixed(3) + "ms";
        document.getElementById('error1').innerHTML = "&plusmn;" + benchTest1.stats.moe.toFixed(2) + "%";
        document.getElementById('stderror1').innerHTML = benchTest1.stats.sem.toFixed(3) + "ms";
        document.getElementById('variance1').innerHTML = benchTest1.stats.variance.toFixed(3) + "ms";
        document.getElementById('deviation1').innerHTML = benchTest1.stats.deviation.toFixed(3) + "ms";
        document.getElementById('change').innerHTML = (benchTest1.stats.mean / benchTest2.stats.mean ).toFixed(3);

        document.getElementById('mean2').innerHTML = benchTest2.stats.mean.toFixed(3) + "ms";
        document.getElementById('error2').innerHTML = "&plusmn;" + benchTest2.stats.moe.toFixed(2) + "%";
        document.getElementById('stderror2').innerHTML = benchTest2.stats.sem.toFixed(3) + "ms";
        document.getElementById('variance2').innerHTML = benchTest2.stats.variance.toFixed(3) + "ms";
        document.getElementById('deviation2').innerHTML = benchTest2.stats.deviation.toFixed(3) + "ms";
        $("#results").show("slow", function () {

        });
    });
    console.warn(decoder.frameBuffer);
    console.warn(emscriptenDecoder.frameBuffer);
    console.warn(this);
    if (benchTest1.aborted)
        console.warn(benchTest1.error.stack);

    updateChart(this[0], this[1]);

});

function updateChart(bench1, bench2) {
    var options = {
        title: "JsVpx vs Emscripten",
        //width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: {position: "none"},
        vAxis:{
            minValue : 0
        }
    };

    var data = google.visualization.arrayToDataTable([
        ['Decoder', 'Avg Time', {role: 'style'}],
        ['JsVpx', bench1.stats.mean, 'red'],
        ['Emscripten', bench2.stats.mean, 'silver']

    ]);
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}