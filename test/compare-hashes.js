
//Unit Tests
"use strict";
var assert = require('assert');
var readline = require('readline');
var fs = require('fs');
var path = require('path');

describe('Comparing hashes', function () {
    var testFiles = fs.readdirSync("output-vectors");

    for (var key in testFiles) {
        if (path.extname(testFiles[key]) === ".md5") {
            it('Hash File Match : ' + testFiles[key], function () {
                var md5Data = fs.readFileSync("vp8-test-vectors/" + testFiles[key]).toString();
                var outputData = fs.readFileSync("output-vectors/" + testFiles[key]).toString();
                assert.equal(md5Data, outputData);
            });
        }

    }
});