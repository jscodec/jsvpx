const ClosureCompilerPlugin = require('webpack-closure-compiler');
const path = require('path');

//console.log(env.USE_BENCHMARK);

var BrowserTests = {
    entry: [
        path.join(__dirname, 'test', 'browser-tests.js')
    ],
    output: {
        path: path.join(__dirname, 'test'),
        filename: 'browser-tests.build.js'
    }
};

var OGVVideoDecoder = {
    entry: [
        path.join(__dirname, 'build-templates', 'OGVVideoDecoder.js')
    ],
    output: {
        path: path.join(__dirname, 'builds'),
        filename: 'ogv-decoder-video-vp8.js'
    },

    plugins: [
        
        new ClosureCompilerPlugin({
            compiler: {
                compilation_level: 'SIMPLE'
            },
            concurrency: 3,
        })
        
    ]
    
};

var JsVpx = {
    entry: [
        path.join(__dirname, 'build-templates', 'jsvpx.js')
    ],
    output: {
        path: path.join(__dirname, 'builds'),
        filename: 'jsvpx.js'
    },

    plugins: [
        new ClosureCompilerPlugin({
            compiler: {
                compilation_level: 'SIMPLE'
            },
            concurrency: 3,
        })
    ]

};

var JsVpxBenchmark = {
    entry: [
        path.join(__dirname, 'benchmarks', 'benchmark.js')
    ],
    output: {
        path: path.join(__dirname, 'benchmarks'),
        filename: 'benchmark.build.js'
    },
    module: {
        noParse: [
            path.resolve(__dirname, './node_modules/benchmark/benchmark.js'),
        ]
    },
};


if (process.env) {
    if (process.env.USE_BENCHMARK === "true") {
        module.exports = [JsVpxBenchmark];
    } else {
        module.exports = [OGVVideoDecoder, JsVpx, BrowserTests];
    }

}