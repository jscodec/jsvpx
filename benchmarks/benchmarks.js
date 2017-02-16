var loadButton = document.getElementById("load-file");
var inputFile = document.getElementById("input-file");
var fileAlertReady = document.getElementById("file-alert-ready");
var runExpirimentButton = document.getElementById("run-expiriment");

var frameCountDisplay = document.getElementById("frame-count");
var totalTimeDisplay = document.getElementById("total-time");
var averageFrameTimeDisplay = document.getElementById("average-frame-time");
var totalPercentChangeDisplay = document.getElementById("total-percent-change");
//var FlareWebmDemuxer = require('flare-webm-demuxer');
var fileLoaded = false;

var getTimestamp;
if (typeof performance === 'undefined' || typeof performance.now === 'undefined') {
    getTimestamp = Date.now;
} else {
    getTimestamp = performance.now.bind(performance);
}

var iterations = 10;
var frameCount = 0; //temp

var fileData;

var getTimestamp;
if (typeof performance === 'undefined' || typeof performance.now === 'undefined') {
    getTimestamp = Date.now;
} else {
    getTimestamp = performance.now.bind(performance);
}
    
loadButton.onclick = loadFile;
        
function loadFile() {
    console.warn("running");

    var reader = new FileReader();

    reader.onload = function (e) {

        fileData = new Uint8Array(e.target.result);
        fileLoaded = true;
        fileAlertReady.style.display = "block";


    };

    reader.readAsArrayBuffer(inputFile.files[0]);

    return false;
}
;

runExpirimentButton.onclick = function(){
    
    var expirimentCombinedResults = new Array();
    
    var totalTime = 0;
    for (var i = 0 ; i < iterations; i++){
         
        var expirimentData = runBasicExpiriment();
        expirimentCombinedResults.push(expirimentData);
        //totalTime += expirimentData.deltaTime;
    }
    
    processStatistics(expirimentCombinedResults);
    
    //var averageTime = totalTime / iterations;
    //totalTimeDisplay.innerHTML = averageTime.toFixed(2);
    return false;
};

function processStatistics(expirimentResults){
    
    var frameAverages = new Array(frameCount);
    var frameAveragesControl = new Array(frameCount);
    var scatterData = new Array();
    var totalTime = 0;
    var controlTotalTime = 0;
    
    for (var i = 0; i < iterations; i++) {
//var i = 0;
        for (var x = 0; x < frameCount; x++) {
            var frameData = expirimentResults[i][x];
            frameAverages[x] += frameData.deltaTime;
            //frameAveragesControl[x] += frameData.controlDeltaTime;
            scatterData.push([frameData.packetSize, Math.round(frameData.deltaTime) ]);
            totalTime += frameData.deltaTime;
            //controlTotalTime += frameData.controlDeltaTime;
        }
        
    }
    

    for (var x = 0; x < frameCount; x++) {
        
        frameAverages[x] /= iterations;

    }
        
    //updateScatterPlot(scatterData);

    var averageTime = totalTime / iterations;
    var averageFrameTime = averageTime / frameCount;
    //var averageControlTime = controlTotalTime / iterations;
    //var percentChange = ((totalTime - controlTotalTime) /  controlTotalTime * 100 );
    //totalPercentChangeDisplay.innerHTML = percentChange.toFixed(2);
    totalTimeDisplay.innerHTML = averageTime.toFixed(2);
    averageFrameTimeDisplay.innerHTML = averageFrameTime.toFixed(2);
    frameCountDisplay.innerHTML = frameCount;
}

function runBasicExpiriment() {
    
    var expirimentResults = new Array();
    
    var expirimentTime = 0;
    var expirimentControlTime = 0;
    //load the demuxer
    //console.warn(fileData);
    var demuxer = new FlareIvf();
    demuxer.receiveBuffer(fileData);
    demuxer.parseHeader();

    

    var decoder = new JsVpxBenchmark();
    var decoderControl = new JsVpx();

    //frameCountDisplay.innerHTML = demuxer.frameCount;
    frameCount = demuxer.frameCount;
    //console.warn("total frames : " + );

    for (var i = 0; i < demuxer.frameCount; i++) {
        var data = new Uint8Array(demuxer.processFrame());
        
        var startTime = getTimestamp();
        decoder.decode(data);
        expirimentTime += getTimestamp() - startTime;
        
        //startTime = getTimestamp();
        //decoderControl.decode(data);
        //expirimentControlTime += getTimestamp() - startTime;
        
        expirimentResults.push({
            deltaTime: expirimentTime,
            //controlDeltaTime : expirimentControlTime,
            packetSize: data.length
            
        });
        
        
    }
    
    //console.warn("Expiriment Complete");
    //console.warn(expirimentResults);
    return expirimentResults;
    
    
}



function runExpiriment() {

/*
    
*/

    

    return false;
}

function callback(ret) {
    returnValue = ret;
}

function updateScatterPlot(scatterData){
    if ($('#echart_scatter').length ){ 
			  
			  var echartScatter = echarts.init(document.getElementById('echart_scatter'));

			  echartScatter.setOption({
				title: {
				  text: 'Scatter Graph',
				  subtext: 'Heinz  2003'
				},
				tooltip: {
				  trigger: 'axis',
				  showDelay: 0,
				  axisPointer: {
					type: 'cross',
					lineStyle: {
					  type: 'dashed',
					  width: 1
					}
				  }
				},
				legend: {
				  data: ['Data1']
				},
				toolbox: {
				  show: true,
				  feature: {
					saveAsImage: {
					  show: true,
					  title: "Save Image"
					}
				  }
				},
				xAxis: [{
				  type: 'value',
				  scale: true,
				  axisLabel: {
					formatter: '{value} bytes'
				  }
				}],
				yAxis: [{
				  type: 'value',
				  scale: true,
				  axisLabel: {
					formatter: '{value} ms'
				  }
				}],
				series: [{
				  name: 'Data1',
				  type: 'scatter',
				  tooltip: {
					trigger: 'item',
					formatter: function(params) {
					  if (params.value.length > 1) {
						return params.seriesName + ' :<br/>' + params.value[0] + 'byte ' + params.value[1] + 'bytes ';
					  } else {
						return params.seriesName + ' :<br/>' + params.name + ' : ' + params.value + 'ms ';
					  }
					}
				  },
				  data: scatterData,
				  markPoint: {
					data: [{
					  type: 'max',
					  name: 'Max'
					}, {
					  type: 'min',
					  name: 'Min'
					}]
				  },
				  markLine: {
					data: [{
					  type: 'average',
					  name: 'Mean'
					}]
				  }
				}
                            ]
			  });

			} 
                        }

