/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var ivf = __webpack_require__(2);
	var md5 = __webpack_require__(3);
	var jsvpx = __webpack_require__(64);
	//var QUnit = require('qunitjs');

	var testVectors = [
	    'vp80-00-comprehensive-001.ivf',
	    'vp80-00-comprehensive-002.ivf',
	    'vp80-00-comprehensive-003.ivf',
	    'vp80-00-comprehensive-004.ivf',
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	class JsIvf{
	    
	    constructor(){
	        this.data = null;
	        this.ptr = 0;
	        this.signature;
	        this.version;
	        this.headerLength;
	        this.codec;
	        this.width;
	        this.height;
	        this.frameRate;
	        this.timeScale;
	        this.frameCount;
	        this.currentFrame = 0;
	    }
	    
	    receiveBuffer(data){
	        this.data = new Uint8Array(data);
	    }
	    
	    processFrame() {
	        
	        //console.log("Frame Number : " + this.currentFrame);
	        var frameSize = this.data[this.ptr];
	        frameSize |= this.data[this.ptr + 1] << 8;
	        frameSize |= this.data[this.ptr + 2] << 16;
	        frameSize |= this.data[this.ptr + 3] << 24;


	        this.ptr += 12; //consume frame header
	        var frameBuffer = this.data.subarray(this.ptr, this.ptr + frameSize);
	        //console.log("Frame Size : " + frameSize);

	        this.ptr += frameSize; //consume frame data
	        this.currentFrame++;
	        return frameBuffer;
	        
	    }
	    
	    parseHeader(){
	        var temp0 = this.data[0];
	        var temp1 = this.data[1];
	        var temp2 = this.data[2];
	        var temp3 = this.data[3];
	        
	        this.signature = String.fromCharCode(temp0, temp1, temp2, temp3);
	        
	        this.version = this.data[4] << 8 | this.data[5];
	        this.headerLength = this.data[7] << 8 | this.data[6];
	        
	        temp0 = this.data[8];
	        temp1 = this.data[9];
	        temp2 = this.data[10];
	        temp3 = this.data[11];
	        
	        this.codec = String.fromCharCode(temp0, temp1, temp2, temp3);
	        this.width = this.data[13] << 8 | this.data[12];
	        this.height = this.data[15] << 8 | this.data[14];
	        this.frameRate = this.data[19] << 24 | this.data[18] << 16 | this.data[17] <<8 | this.data[16];
	        this.timeScale = this.data[23] << 24 | this.data[22] << 16 | this.data[21] <<8 | this.data[20];
	        this.frameCount = this.data[27] << 24 | this.data[26] << 16 | this.data[25] <<8 | this.data[24];
	        
	        this.ptr = this.headerLength;
	    }
	    
	}

	module.exports = JsIvf;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global) {/**
	 * [js-md5]{@link https://github.com/emn178/js-md5}
	 *
	 * @namespace md5
	 * @version 0.4.2
	 * @author Chen, Yi-Cyuan [emn178@gmail.com]
	 * @copyright Chen, Yi-Cyuan 2014-2017
	 * @license MIT
	 */
	(function () {
	  'use strict';

	  var root = typeof window === 'object' ? window : {};
	  var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
	  if (NODE_JS) {
	    root = global;
	  }
	  var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && typeof module === 'object' && module.exports;
	  var AMD = "function" === 'function' && __webpack_require__(5);
	  var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
	  var HEX_CHARS = '0123456789abcdef'.split('');
	  var EXTRA = [128, 32768, 8388608, -2147483648];
	  var SHIFT = [0, 8, 16, 24];
	  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer'];

	  var blocks = [], buffer8;
	  if (ARRAY_BUFFER) {
	    var buffer = new ArrayBuffer(68);
	    buffer8 = new Uint8Array(buffer);
	    blocks = new Uint32Array(buffer);
	  }

	  /**
	   * @method hex
	   * @memberof md5
	   * @description Output hash as hex string
	   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	   * @returns {String} Hex string
	   * @example
	   * md5.hex('The quick brown fox jumps over the lazy dog');
	   * // equal to
	   * md5('The quick brown fox jumps over the lazy dog');
	   */
	  /**
	   * @method digest
	   * @memberof md5
	   * @description Output hash as bytes array
	   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	   * @returns {Array} Bytes array
	   * @example
	   * md5.digest('The quick brown fox jumps over the lazy dog');
	   */
	  /**
	   * @method array
	   * @memberof md5
	   * @description Output hash as bytes array
	   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	   * @returns {Array} Bytes array
	   * @example
	   * md5.array('The quick brown fox jumps over the lazy dog');
	   */
	  /**
	   * @method arrayBuffer
	   * @memberof md5
	   * @description Output hash as ArrayBuffer
	   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	   * @returns {ArrayBuffer} ArrayBuffer
	   * @example
	   * md5.arrayBuffer('The quick brown fox jumps over the lazy dog');
	   */
	  /**
	   * @method buffer
	   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
	   * @memberof md5
	   * @description Output hash as ArrayBuffer
	   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	   * @returns {ArrayBuffer} ArrayBuffer
	   * @example
	   * md5.buffer('The quick brown fox jumps over the lazy dog');
	   */
	  var createOutputMethod = function (outputType) {
	    return function (message) {
	      return new Md5(true).update(message)[outputType]();
	    };
	  };

	  /**
	   * @method create
	   * @memberof md5
	   * @description Create Md5 object
	   * @returns {Md5} Md5 object.
	   * @example
	   * var hash = md5.create();
	   */
	  /**
	   * @method update
	   * @memberof md5
	   * @description Create and update Md5 object
	   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	   * @returns {Md5} Md5 object.
	   * @example
	   * var hash = md5.update('The quick brown fox jumps over the lazy dog');
	   * // equal to
	   * var hash = md5.create();
	   * hash.update('The quick brown fox jumps over the lazy dog');
	   */
	  var createMethod = function () {
	    var method = createOutputMethod('hex');
	    if (NODE_JS) {
	      method = nodeWrap(method);
	    }
	    method.create = function () {
	      return new Md5();
	    };
	    method.update = function (message) {
	      return method.create().update(message);
	    };
	    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
	      var type = OUTPUT_TYPES[i];
	      method[type] = createOutputMethod(type);
	    }
	    return method;
	  };

	  var nodeWrap = function (method) {
	    var crypto = __webpack_require__(6);
	    var Buffer = __webpack_require__(7).Buffer;
	    var nodeMethod = function (message) {
	      if (typeof message === 'string') {
	        return crypto.createHash('md5').update(message, 'utf8').digest('hex');
	      } else if (message.constructor === ArrayBuffer) {
	        message = new Uint8Array(message);
	      } else if (message.length === undefined) {
	        return method(message);
	      }
	      return crypto.createHash('md5').update(new Buffer(message)).digest('hex');
	    };
	    return nodeMethod;
	  };

	  /**
	   * Md5 class
	   * @class Md5
	   * @description This is internal class.
	   * @see {@link md5.create}
	   */
	  function Md5(sharedMemory) {
	    if (sharedMemory) {
	      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
	      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
	      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
	      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
	      this.blocks = blocks;
	      this.buffer8 = buffer8;
	    } else {
	      if (ARRAY_BUFFER) {
	        var buffer = new ArrayBuffer(68);
	        this.buffer8 = new Uint8Array(buffer);
	        this.blocks = new Uint32Array(buffer);
	      } else {
	        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	      }
	    }
	    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = 0;
	    this.finalized = this.hashed = false;
	    this.first = true;
	  }

	  /**
	   * @method update
	   * @memberof Md5
	   * @instance
	   * @description Update hash
	   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	   * @returns {Md5} Md5 object.
	   * @see {@link md5.update}
	   */
	  Md5.prototype.update = function (message) {
	    if (this.finalized) {
	      return;
	    }
	    var notString = typeof(message) != 'string';
	    if (notString && message.constructor == root.ArrayBuffer) {
	      message = new Uint8Array(message);
	    }
	    var code, index = 0, i, length = message.length || 0, blocks = this.blocks;
	    var buffer8 = this.buffer8;

	    while (index < length) {
	      if (this.hashed) {
	        this.hashed = false;
	        blocks[0] = blocks[16];
	        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
	        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
	        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
	        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
	      }

	      if (notString) {
	        if (ARRAY_BUFFER) {
	          for (i = this.start; index < length && i < 64; ++index) {
	            buffer8[i++] = message[index];
	          }
	        } else {
	          for (i = this.start; index < length && i < 64; ++index) {
	            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
	          }
	        }
	      } else {
	        if (ARRAY_BUFFER) {
	          for (i = this.start; index < length && i < 64; ++index) {
	            code = message.charCodeAt(index);
	            if (code < 0x80) {
	              buffer8[i++] = code;
	            } else if (code < 0x800) {
	              buffer8[i++] = 0xc0 | (code >> 6);
	              buffer8[i++] = 0x80 | (code & 0x3f);
	            } else if (code < 0xd800 || code >= 0xe000) {
	              buffer8[i++] = 0xe0 | (code >> 12);
	              buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
	              buffer8[i++] = 0x80 | (code & 0x3f);
	            } else {
	              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
	              buffer8[i++] = 0xf0 | (code >> 18);
	              buffer8[i++] = 0x80 | ((code >> 12) & 0x3f);
	              buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
	              buffer8[i++] = 0x80 | (code & 0x3f);
	            }
	          }
	        } else {
	          for (i = this.start; index < length && i < 64; ++index) {
	            code = message.charCodeAt(index);
	            if (code < 0x80) {
	              blocks[i >> 2] |= code << SHIFT[i++ & 3];
	            } else if (code < 0x800) {
	              blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
	              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
	            } else if (code < 0xd800 || code >= 0xe000) {
	              blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
	              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
	              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
	            } else {
	              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
	              blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
	              blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
	              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
	              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
	            }
	          }
	        }
	      }
	      this.lastByteIndex = i;
	      this.bytes += i - this.start;
	      if (i >= 64) {
	        this.start = i - 64;
	        this.hash();
	        this.hashed = true;
	      } else {
	        this.start = i;
	      }
	    }
	    return this;
	  };

	  Md5.prototype.finalize = function () {
	    if (this.finalized) {
	      return;
	    }
	    this.finalized = true;
	    var blocks = this.blocks, i = this.lastByteIndex;
	    blocks[i >> 2] |= EXTRA[i & 3];
	    if (i >= 56) {
	      if (!this.hashed) {
	        this.hash();
	      }
	      blocks[0] = blocks[16];
	      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
	      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
	      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
	      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
	    }
	    blocks[14] = this.bytes << 3;
	    this.hash();
	  };

	  Md5.prototype.hash = function () {
	    var a, b, c, d, bc, da, blocks = this.blocks;

	    if (this.first) {
	      a = blocks[0] - 680876937;
	      a = (a << 7 | a >>> 25) - 271733879 << 0;
	      d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;
	      d = (d << 12 | d >>> 20) + a << 0;
	      c = (-271733879 ^ (d & (a ^ -271733879))) + blocks[2] - 1126478375;
	      c = (c << 17 | c >>> 15) + d << 0;
	      b = (a ^ (c & (d ^ a))) + blocks[3] - 1316259209;
	      b = (b << 22 | b >>> 10) + c << 0;
	    } else {
	      a = this.h0;
	      b = this.h1;
	      c = this.h2;
	      d = this.h3;
	      a += (d ^ (b & (c ^ d))) + blocks[0] - 680876936;
	      a = (a << 7 | a >>> 25) + b << 0;
	      d += (c ^ (a & (b ^ c))) + blocks[1] - 389564586;
	      d = (d << 12 | d >>> 20) + a << 0;
	      c += (b ^ (d & (a ^ b))) + blocks[2] + 606105819;
	      c = (c << 17 | c >>> 15) + d << 0;
	      b += (a ^ (c & (d ^ a))) + blocks[3] - 1044525330;
	      b = (b << 22 | b >>> 10) + c << 0;
	    }

	    a += (d ^ (b & (c ^ d))) + blocks[4] - 176418897;
	    a = (a << 7 | a >>> 25) + b << 0;
	    d += (c ^ (a & (b ^ c))) + blocks[5] + 1200080426;
	    d = (d << 12 | d >>> 20) + a << 0;
	    c += (b ^ (d & (a ^ b))) + blocks[6] - 1473231341;
	    c = (c << 17 | c >>> 15) + d << 0;
	    b += (a ^ (c & (d ^ a))) + blocks[7] - 45705983;
	    b = (b << 22 | b >>> 10) + c << 0;
	    a += (d ^ (b & (c ^ d))) + blocks[8] + 1770035416;
	    a = (a << 7 | a >>> 25) + b << 0;
	    d += (c ^ (a & (b ^ c))) + blocks[9] - 1958414417;
	    d = (d << 12 | d >>> 20) + a << 0;
	    c += (b ^ (d & (a ^ b))) + blocks[10] - 42063;
	    c = (c << 17 | c >>> 15) + d << 0;
	    b += (a ^ (c & (d ^ a))) + blocks[11] - 1990404162;
	    b = (b << 22 | b >>> 10) + c << 0;
	    a += (d ^ (b & (c ^ d))) + blocks[12] + 1804603682;
	    a = (a << 7 | a >>> 25) + b << 0;
	    d += (c ^ (a & (b ^ c))) + blocks[13] - 40341101;
	    d = (d << 12 | d >>> 20) + a << 0;
	    c += (b ^ (d & (a ^ b))) + blocks[14] - 1502002290;
	    c = (c << 17 | c >>> 15) + d << 0;
	    b += (a ^ (c & (d ^ a))) + blocks[15] + 1236535329;
	    b = (b << 22 | b >>> 10) + c << 0;
	    a += (c ^ (d & (b ^ c))) + blocks[1] - 165796510;
	    a = (a << 5 | a >>> 27) + b << 0;
	    d += (b ^ (c & (a ^ b))) + blocks[6] - 1069501632;
	    d = (d << 9 | d >>> 23) + a << 0;
	    c += (a ^ (b & (d ^ a))) + blocks[11] + 643717713;
	    c = (c << 14 | c >>> 18) + d << 0;
	    b += (d ^ (a & (c ^ d))) + blocks[0] - 373897302;
	    b = (b << 20 | b >>> 12) + c << 0;
	    a += (c ^ (d & (b ^ c))) + blocks[5] - 701558691;
	    a = (a << 5 | a >>> 27) + b << 0;
	    d += (b ^ (c & (a ^ b))) + blocks[10] + 38016083;
	    d = (d << 9 | d >>> 23) + a << 0;
	    c += (a ^ (b & (d ^ a))) + blocks[15] - 660478335;
	    c = (c << 14 | c >>> 18) + d << 0;
	    b += (d ^ (a & (c ^ d))) + blocks[4] - 405537848;
	    b = (b << 20 | b >>> 12) + c << 0;
	    a += (c ^ (d & (b ^ c))) + blocks[9] + 568446438;
	    a = (a << 5 | a >>> 27) + b << 0;
	    d += (b ^ (c & (a ^ b))) + blocks[14] - 1019803690;
	    d = (d << 9 | d >>> 23) + a << 0;
	    c += (a ^ (b & (d ^ a))) + blocks[3] - 187363961;
	    c = (c << 14 | c >>> 18) + d << 0;
	    b += (d ^ (a & (c ^ d))) + blocks[8] + 1163531501;
	    b = (b << 20 | b >>> 12) + c << 0;
	    a += (c ^ (d & (b ^ c))) + blocks[13] - 1444681467;
	    a = (a << 5 | a >>> 27) + b << 0;
	    d += (b ^ (c & (a ^ b))) + blocks[2] - 51403784;
	    d = (d << 9 | d >>> 23) + a << 0;
	    c += (a ^ (b & (d ^ a))) + blocks[7] + 1735328473;
	    c = (c << 14 | c >>> 18) + d << 0;
	    b += (d ^ (a & (c ^ d))) + blocks[12] - 1926607734;
	    b = (b << 20 | b >>> 12) + c << 0;
	    bc = b ^ c;
	    a += (bc ^ d) + blocks[5] - 378558;
	    a = (a << 4 | a >>> 28) + b << 0;
	    d += (bc ^ a) + blocks[8] - 2022574463;
	    d = (d << 11 | d >>> 21) + a << 0;
	    da = d ^ a;
	    c += (da ^ b) + blocks[11] + 1839030562;
	    c = (c << 16 | c >>> 16) + d << 0;
	    b += (da ^ c) + blocks[14] - 35309556;
	    b = (b << 23 | b >>> 9) + c << 0;
	    bc = b ^ c;
	    a += (bc ^ d) + blocks[1] - 1530992060;
	    a = (a << 4 | a >>> 28) + b << 0;
	    d += (bc ^ a) + blocks[4] + 1272893353;
	    d = (d << 11 | d >>> 21) + a << 0;
	    da = d ^ a;
	    c += (da ^ b) + blocks[7] - 155497632;
	    c = (c << 16 | c >>> 16) + d << 0;
	    b += (da ^ c) + blocks[10] - 1094730640;
	    b = (b << 23 | b >>> 9) + c << 0;
	    bc = b ^ c;
	    a += (bc ^ d) + blocks[13] + 681279174;
	    a = (a << 4 | a >>> 28) + b << 0;
	    d += (bc ^ a) + blocks[0] - 358537222;
	    d = (d << 11 | d >>> 21) + a << 0;
	    da = d ^ a;
	    c += (da ^ b) + blocks[3] - 722521979;
	    c = (c << 16 | c >>> 16) + d << 0;
	    b += (da ^ c) + blocks[6] + 76029189;
	    b = (b << 23 | b >>> 9) + c << 0;
	    bc = b ^ c;
	    a += (bc ^ d) + blocks[9] - 640364487;
	    a = (a << 4 | a >>> 28) + b << 0;
	    d += (bc ^ a) + blocks[12] - 421815835;
	    d = (d << 11 | d >>> 21) + a << 0;
	    da = d ^ a;
	    c += (da ^ b) + blocks[15] + 530742520;
	    c = (c << 16 | c >>> 16) + d << 0;
	    b += (da ^ c) + blocks[2] - 995338651;
	    b = (b << 23 | b >>> 9) + c << 0;
	    a += (c ^ (b | ~d)) + blocks[0] - 198630844;
	    a = (a << 6 | a >>> 26) + b << 0;
	    d += (b ^ (a | ~c)) + blocks[7] + 1126891415;
	    d = (d << 10 | d >>> 22) + a << 0;
	    c += (a ^ (d | ~b)) + blocks[14] - 1416354905;
	    c = (c << 15 | c >>> 17) + d << 0;
	    b += (d ^ (c | ~a)) + blocks[5] - 57434055;
	    b = (b << 21 | b >>> 11) + c << 0;
	    a += (c ^ (b | ~d)) + blocks[12] + 1700485571;
	    a = (a << 6 | a >>> 26) + b << 0;
	    d += (b ^ (a | ~c)) + blocks[3] - 1894986606;
	    d = (d << 10 | d >>> 22) + a << 0;
	    c += (a ^ (d | ~b)) + blocks[10] - 1051523;
	    c = (c << 15 | c >>> 17) + d << 0;
	    b += (d ^ (c | ~a)) + blocks[1] - 2054922799;
	    b = (b << 21 | b >>> 11) + c << 0;
	    a += (c ^ (b | ~d)) + blocks[8] + 1873313359;
	    a = (a << 6 | a >>> 26) + b << 0;
	    d += (b ^ (a | ~c)) + blocks[15] - 30611744;
	    d = (d << 10 | d >>> 22) + a << 0;
	    c += (a ^ (d | ~b)) + blocks[6] - 1560198380;
	    c = (c << 15 | c >>> 17) + d << 0;
	    b += (d ^ (c | ~a)) + blocks[13] + 1309151649;
	    b = (b << 21 | b >>> 11) + c << 0;
	    a += (c ^ (b | ~d)) + blocks[4] - 145523070;
	    a = (a << 6 | a >>> 26) + b << 0;
	    d += (b ^ (a | ~c)) + blocks[11] - 1120210379;
	    d = (d << 10 | d >>> 22) + a << 0;
	    c += (a ^ (d | ~b)) + blocks[2] + 718787259;
	    c = (c << 15 | c >>> 17) + d << 0;
	    b += (d ^ (c | ~a)) + blocks[9] - 343485551;
	    b = (b << 21 | b >>> 11) + c << 0;

	    if (this.first) {
	      this.h0 = a + 1732584193 << 0;
	      this.h1 = b - 271733879 << 0;
	      this.h2 = c - 1732584194 << 0;
	      this.h3 = d + 271733878 << 0;
	      this.first = false;
	    } else {
	      this.h0 = this.h0 + a << 0;
	      this.h1 = this.h1 + b << 0;
	      this.h2 = this.h2 + c << 0;
	      this.h3 = this.h3 + d << 0;
	    }
	  };

	  /**
	   * @method hex
	   * @memberof Md5
	   * @instance
	   * @description Output hash as hex string
	   * @returns {String} Hex string
	   * @see {@link md5.hex}
	   * @example
	   * hash.hex();
	   */
	  Md5.prototype.hex = function () {
	    this.finalize();

	    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;

	    return HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
	       HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
	       HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
	       HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
	       HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
	       HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
	       HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
	       HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
	       HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
	       HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
	       HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
	       HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
	       HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
	       HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
	       HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
	       HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F];
	  };

	  /**
	   * @method toString
	   * @memberof Md5
	   * @instance
	   * @description Output hash as hex string
	   * @returns {String} Hex string
	   * @see {@link md5.hex}
	   * @example
	   * hash.toString();
	   */
	  Md5.prototype.toString = Md5.prototype.hex;

	  /**
	   * @method digest
	   * @memberof Md5
	   * @instance
	   * @description Output hash as bytes array
	   * @returns {Array} Bytes array
	   * @see {@link md5.digest}
	   * @example
	   * hash.digest();
	   */
	  Md5.prototype.digest = function () {
	    this.finalize();

	    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
	    return [
	      h0 & 0xFF, (h0 >> 8) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 24) & 0xFF,
	      h1 & 0xFF, (h1 >> 8) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 24) & 0xFF,
	      h2 & 0xFF, (h2 >> 8) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 24) & 0xFF,
	      h3 & 0xFF, (h3 >> 8) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 24) & 0xFF
	    ];
	  };

	  /**
	   * @method array
	   * @memberof Md5
	   * @instance
	   * @description Output hash as bytes array
	   * @returns {Array} Bytes array
	   * @see {@link md5.array}
	   * @example
	   * hash.array();
	   */
	  Md5.prototype.array = Md5.prototype.digest;

	  /**
	   * @method arrayBuffer
	   * @memberof Md5
	   * @instance
	   * @description Output hash as ArrayBuffer
	   * @returns {ArrayBuffer} ArrayBuffer
	   * @see {@link md5.arrayBuffer}
	   * @example
	   * hash.arrayBuffer();
	   */
	  Md5.prototype.arrayBuffer = function () {
	    this.finalize();

	    var buffer = new ArrayBuffer(16);
	    var blocks = new Uint32Array(buffer);
	    blocks[0] = this.h0;
	    blocks[1] = this.h1;
	    blocks[2] = this.h2;
	    blocks[3] = this.h3;
	    return buffer;
	  };

	  /**
	   * @method buffer
	   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
	   * @memberof Md5
	   * @instance
	   * @description Output hash as ArrayBuffer
	   * @returns {ArrayBuffer} ArrayBuffer
	   * @see {@link md5.buffer}
	   * @example
	   * hash.buffer();
	   */
	  Md5.prototype.buffer = Md5.prototype.arrayBuffer;

	  var exports = createMethod();

	  if (COMMON_JS) {
	    module.exports = exports;
	  } else {
	    /**
	     * @method md5
	     * @description Md5 hash function, export to global in browsers.
	     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	     * @returns {String} md5 hashes
	     * @example
	     * md5(''); // d41d8cd98f00b204e9800998ecf8427e
	     * md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6
	     * md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0
	     *
	     * // It also supports UTF-8 encoding
	     * md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07
	     *
	     * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
	     * md5([]); // d41d8cd98f00b204e9800998ecf8427e
	     * md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e
	     */
	    root.md5 = exports;
	    if (AMD) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	        return exports;
	      }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	  }
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var rng = __webpack_require__(11)

	function error () {
	  var m = [].slice.call(arguments).join(' ')
	  throw new Error([
	    m,
	    'we accept pull requests',
	    'http://github.com/dominictarr/crypto-browserify'
	    ].join('\n'))
	}

	exports.createHash = __webpack_require__(13)

	exports.createHmac = __webpack_require__(25)

	exports.randomBytes = function(size, callback) {
	  if (callback && callback.call) {
	    try {
	      callback.call(this, undefined, new Buffer(rng(size)))
	    } catch (err) { callback(err) }
	  } else {
	    return new Buffer(rng(size))
	  }
	}

	function each(a, f) {
	  for(var i in a)
	    f(a[i], i)
	}

	exports.getHashes = function () {
	  return ['sha1', 'sha256', 'sha512', 'md5', 'rmd160']
	}

	var p = __webpack_require__(26)(exports)
	exports.pbkdf2 = p.pbkdf2
	exports.pbkdf2Sync = p.pbkdf2Sync
	__webpack_require__(28)(exports, module.exports);

	// the least I can do is make error messages for the rest of the node.js/crypto api.
	each(['createCredentials'
	, 'createSign'
	, 'createVerify'
	, 'createDiffieHellman'
	], function (name) {
	  exports[name] = function () {
	    error('sorry,', name, 'is not implemented yet')
	  }
	})

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(8)
	var ieee754 = __webpack_require__(9)
	var isArray = __webpack_require__(10)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr(len * 3 / 4 - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function() {
	  var g = ('undefined' === typeof window ? global : window) || {}
	  _crypto = (
	    g.crypto || g.msCrypto || __webpack_require__(12)
	  )
	  module.exports = function(size) {
	    // Modern Browsers
	    if(_crypto.getRandomValues) {
	      var bytes = new Buffer(size); //in browserify, this is an extended Uint8Array
	      /* This will not work in older browsers.
	       * See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
	       */
	    
	      _crypto.getRandomValues(bytes);
	      return bytes;
	    }
	    else if (_crypto.randomBytes) {
	      return _crypto.randomBytes(size)
	    }
	    else
	      throw new Error(
	        'secure random number generation not supported by this browser\n'+
	        'use chrome, FireFox or Internet Explorer 11'
	      )
	  }
	}())

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(7).Buffer))

/***/ },
/* 12 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(14)

	var md5 = toConstructor(__webpack_require__(22))
	var rmd160 = toConstructor(__webpack_require__(24))

	function toConstructor (fn) {
	  return function () {
	    var buffers = []
	    var m= {
	      update: function (data, enc) {
	        if(!Buffer.isBuffer(data)) data = new Buffer(data, enc)
	        buffers.push(data)
	        return this
	      },
	      digest: function (enc) {
	        var buf = Buffer.concat(buffers)
	        var r = fn(buf)
	        buffers = null
	        return enc ? r.toString(enc) : r
	      }
	    }
	    return m
	  }
	}

	module.exports = function (alg) {
	  if('md5' === alg) return new md5()
	  if('rmd160' === alg) return new rmd160()
	  return createHash(alg)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var exports = module.exports = function (alg) {
	  var Alg = exports[alg]
	  if(!Alg) throw new Error(alg + ' is not supported (we accept pull requests)')
	  return new Alg()
	}

	var Buffer = __webpack_require__(7).Buffer
	var Hash   = __webpack_require__(15)(Buffer)

	exports.sha1 = __webpack_require__(16)(Buffer, Hash)
	exports.sha256 = __webpack_require__(20)(Buffer, Hash)
	exports.sha512 = __webpack_require__(21)(Buffer, Hash)


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function (Buffer) {

	  //prototype class for hash functions
	  function Hash (blockSize, finalSize) {
	    this._block = new Buffer(blockSize) //new Uint32Array(blockSize/4)
	    this._finalSize = finalSize
	    this._blockSize = blockSize
	    this._len = 0
	    this._s = 0
	  }

	  Hash.prototype.init = function () {
	    this._s = 0
	    this._len = 0
	  }

	  Hash.prototype.update = function (data, enc) {
	    if ("string" === typeof data) {
	      enc = enc || "utf8"
	      data = new Buffer(data, enc)
	    }

	    var l = this._len += data.length
	    var s = this._s = (this._s || 0)
	    var f = 0
	    var buffer = this._block

	    while (s < l) {
	      var t = Math.min(data.length, f + this._blockSize - (s % this._blockSize))
	      var ch = (t - f)

	      for (var i = 0; i < ch; i++) {
	        buffer[(s % this._blockSize) + i] = data[i + f]
	      }

	      s += ch
	      f += ch

	      if ((s % this._blockSize) === 0) {
	        this._update(buffer)
	      }
	    }
	    this._s = s

	    return this
	  }

	  Hash.prototype.digest = function (enc) {
	    // Suppose the length of the message M, in bits, is l
	    var l = this._len * 8

	    // Append the bit 1 to the end of the message
	    this._block[this._len % this._blockSize] = 0x80

	    // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
	    this._block.fill(0, this._len % this._blockSize + 1)

	    if (l % (this._blockSize * 8) >= this._finalSize * 8) {
	      this._update(this._block)
	      this._block.fill(0)
	    }

	    // to this append the block which is equal to the number l written in binary
	    // TODO: handle case where l is > Math.pow(2, 29)
	    this._block.writeInt32BE(l, this._blockSize - 4)

	    var hash = this._update(this._block) || this._hash()

	    return enc ? hash.toString(enc) : hash
	  }

	  Hash.prototype._update = function () {
	    throw new Error('_update must be implemented by subclass')
	  }

	  return Hash
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */

	var inherits = __webpack_require__(17).inherits

	module.exports = function (Buffer, Hash) {

	  var A = 0|0
	  var B = 4|0
	  var C = 8|0
	  var D = 12|0
	  var E = 16|0

	  var W = new (typeof Int32Array === 'undefined' ? Array : Int32Array)(80)

	  var POOL = []

	  function Sha1 () {
	    if(POOL.length)
	      return POOL.pop().init()

	    if(!(this instanceof Sha1)) return new Sha1()
	    this._w = W
	    Hash.call(this, 16*4, 14*4)

	    this._h = null
	    this.init()
	  }

	  inherits(Sha1, Hash)

	  Sha1.prototype.init = function () {
	    this._a = 0x67452301
	    this._b = 0xefcdab89
	    this._c = 0x98badcfe
	    this._d = 0x10325476
	    this._e = 0xc3d2e1f0

	    Hash.prototype.init.call(this)
	    return this
	  }

	  Sha1.prototype._POOL = POOL
	  Sha1.prototype._update = function (X) {

	    var a, b, c, d, e, _a, _b, _c, _d, _e

	    a = _a = this._a
	    b = _b = this._b
	    c = _c = this._c
	    d = _d = this._d
	    e = _e = this._e

	    var w = this._w

	    for(var j = 0; j < 80; j++) {
	      var W = w[j] = j < 16 ? X.readInt32BE(j*4)
	        : rol(w[j - 3] ^ w[j -  8] ^ w[j - 14] ^ w[j - 16], 1)

	      var t = add(
	        add(rol(a, 5), sha1_ft(j, b, c, d)),
	        add(add(e, W), sha1_kt(j))
	      )

	      e = d
	      d = c
	      c = rol(b, 30)
	      b = a
	      a = t
	    }

	    this._a = add(a, _a)
	    this._b = add(b, _b)
	    this._c = add(c, _c)
	    this._d = add(d, _d)
	    this._e = add(e, _e)
	  }

	  Sha1.prototype._hash = function () {
	    if(POOL.length < 100) POOL.push(this)
	    var H = new Buffer(20)
	    //console.log(this._a|0, this._b|0, this._c|0, this._d|0, this._e|0)
	    H.writeInt32BE(this._a|0, A)
	    H.writeInt32BE(this._b|0, B)
	    H.writeInt32BE(this._c|0, C)
	    H.writeInt32BE(this._d|0, D)
	    H.writeInt32BE(this._e|0, E)
	    return H
	  }

	  /*
	   * Perform the appropriate triplet combination function for the current
	   * iteration
	   */
	  function sha1_ft(t, b, c, d) {
	    if(t < 20) return (b & c) | ((~b) & d);
	    if(t < 40) return b ^ c ^ d;
	    if(t < 60) return (b & c) | (b & d) | (c & d);
	    return b ^ c ^ d;
	  }

	  /*
	   * Determine the appropriate additive constant for the current iteration
	   */
	  function sha1_kt(t) {
	    return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
	           (t < 60) ? -1894007588 : -899497514;
	  }

	  /*
	   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	   * to work around bugs in some JS interpreters.
	   * //dominictarr: this is 10 years old, so maybe this can be dropped?)
	   *
	   */
	  function add(x, y) {
	    return (x + y ) | 0
	  //lets see how this goes on testling.
	  //  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  //  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  //  return (msw << 16) | (lsw & 0xFFFF);
	  }

	  /*
	   * Bitwise rotate a 32-bit number to the left.
	   */
	  function rol(num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt));
	  }

	  return Sha1
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(18);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(19);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */

	var inherits = __webpack_require__(17).inherits

	module.exports = function (Buffer, Hash) {

	  var K = [
	      0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
	      0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
	      0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
	      0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
	      0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
	      0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
	      0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
	      0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
	      0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
	      0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
	      0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
	      0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
	      0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
	      0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
	      0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
	      0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
	    ]

	  var W = new Array(64)

	  function Sha256() {
	    this.init()

	    this._w = W //new Array(64)

	    Hash.call(this, 16*4, 14*4)
	  }

	  inherits(Sha256, Hash)

	  Sha256.prototype.init = function () {

	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0

	    this._len = this._s = 0

	    return this
	  }

	  function S (X, n) {
	    return (X >>> n) | (X << (32 - n));
	  }

	  function R (X, n) {
	    return (X >>> n);
	  }

	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }

	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }

	  function Sigma0256 (x) {
	    return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
	  }

	  function Sigma1256 (x) {
	    return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
	  }

	  function Gamma0256 (x) {
	    return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
	  }

	  function Gamma1256 (x) {
	    return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
	  }

	  Sha256.prototype._update = function(M) {

	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var T1, T2

	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0

	    for (var j = 0; j < 64; j++) {
	      var w = W[j] = j < 16
	        ? M.readInt32BE(j * 4)
	        : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16]

	      T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w

	      T2 = Sigma0256(a) + Maj(a, b, c);
	      h = g; g = f; f = e; e = d + T1; d = c; c = b; b = a; a = T1 + T2;
	    }

	    this._a = (a + this._a) | 0
	    this._b = (b + this._b) | 0
	    this._c = (c + this._c) | 0
	    this._d = (d + this._d) | 0
	    this._e = (e + this._e) | 0
	    this._f = (f + this._f) | 0
	    this._g = (g + this._g) | 0
	    this._h = (h + this._h) | 0

	  };

	  Sha256.prototype._hash = function () {
	    var H = new Buffer(32)

	    H.writeInt32BE(this._a,  0)
	    H.writeInt32BE(this._b,  4)
	    H.writeInt32BE(this._c,  8)
	    H.writeInt32BE(this._d, 12)
	    H.writeInt32BE(this._e, 16)
	    H.writeInt32BE(this._f, 20)
	    H.writeInt32BE(this._g, 24)
	    H.writeInt32BE(this._h, 28)

	    return H
	  }

	  return Sha256

	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(17).inherits

	module.exports = function (Buffer, Hash) {
	  var K = [
	    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	  ]

	  var W = new Array(160)

	  function Sha512() {
	    this.init()
	    this._w = W

	    Hash.call(this, 128, 112)
	  }

	  inherits(Sha512, Hash)

	  Sha512.prototype.init = function () {

	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0

	    this._al = 0xf3bcc908|0
	    this._bl = 0x84caa73b|0
	    this._cl = 0xfe94f82b|0
	    this._dl = 0x5f1d36f1|0
	    this._el = 0xade682d1|0
	    this._fl = 0x2b3e6c1f|0
	    this._gl = 0xfb41bd6b|0
	    this._hl = 0x137e2179|0

	    this._len = this._s = 0

	    return this
	  }

	  function S (X, Xl, n) {
	    return (X >>> n) | (Xl << (32 - n))
	  }

	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }

	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }

	  Sha512.prototype._update = function(M) {

	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var al, bl, cl, dl, el, fl, gl, hl

	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0

	    al = this._al | 0
	    bl = this._bl | 0
	    cl = this._cl | 0
	    dl = this._dl | 0
	    el = this._el | 0
	    fl = this._fl | 0
	    gl = this._gl | 0
	    hl = this._hl | 0

	    for (var i = 0; i < 80; i++) {
	      var j = i * 2

	      var Wi, Wil

	      if (i < 16) {
	        Wi = W[j] = M.readInt32BE(j * 4)
	        Wil = W[j + 1] = M.readInt32BE(j * 4 + 4)

	      } else {
	        var x  = W[j - 15*2]
	        var xl = W[j - 15*2 + 1]
	        var gamma0  = S(x, xl, 1) ^ S(x, xl, 8) ^ (x >>> 7)
	        var gamma0l = S(xl, x, 1) ^ S(xl, x, 8) ^ S(xl, x, 7)

	        x  = W[j - 2*2]
	        xl = W[j - 2*2 + 1]
	        var gamma1  = S(x, xl, 19) ^ S(xl, x, 29) ^ (x >>> 6)
	        var gamma1l = S(xl, x, 19) ^ S(x, xl, 29) ^ S(xl, x, 6)

	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7  = W[j - 7*2]
	        var Wi7l = W[j - 7*2 + 1]

	        var Wi16  = W[j - 16*2]
	        var Wi16l = W[j - 16*2 + 1]

	        Wil = gamma0l + Wi7l
	        Wi  = gamma0  + Wi7 + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0)
	        Wil = Wil + gamma1l
	        Wi  = Wi  + gamma1  + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0)
	        Wil = Wil + Wi16l
	        Wi  = Wi  + Wi16 + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0)

	        W[j] = Wi
	        W[j + 1] = Wil
	      }

	      var maj = Maj(a, b, c)
	      var majl = Maj(al, bl, cl)

	      var sigma0h = S(a, al, 28) ^ S(al, a, 2) ^ S(al, a, 7)
	      var sigma0l = S(al, a, 28) ^ S(a, al, 2) ^ S(a, al, 7)
	      var sigma1h = S(e, el, 14) ^ S(e, el, 18) ^ S(el, e, 9)
	      var sigma1l = S(el, e, 14) ^ S(el, e, 18) ^ S(e, el, 9)

	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki = K[j]
	      var Kil = K[j + 1]

	      var ch = Ch(e, f, g)
	      var chl = Ch(el, fl, gl)

	      var t1l = hl + sigma1l
	      var t1 = h + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0)
	      t1l = t1l + chl
	      t1 = t1 + ch + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0)
	      t1l = t1l + Kil
	      t1 = t1 + Ki + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0)
	      t1l = t1l + Wil
	      t1 = t1 + Wi + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0)

	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl
	      var t2 = sigma0h + maj + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0)

	      h  = g
	      hl = gl
	      g  = f
	      gl = fl
	      f  = e
	      fl = el
	      el = (dl + t1l) | 0
	      e  = (d + t1 + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	      d  = c
	      dl = cl
	      c  = b
	      cl = bl
	      b  = a
	      bl = al
	      al = (t1l + t2l) | 0
	      a  = (t1 + t2 + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0
	    }

	    this._al = (this._al + al) | 0
	    this._bl = (this._bl + bl) | 0
	    this._cl = (this._cl + cl) | 0
	    this._dl = (this._dl + dl) | 0
	    this._el = (this._el + el) | 0
	    this._fl = (this._fl + fl) | 0
	    this._gl = (this._gl + gl) | 0
	    this._hl = (this._hl + hl) | 0

	    this._a = (this._a + a + ((this._al >>> 0) < (al >>> 0) ? 1 : 0)) | 0
	    this._b = (this._b + b + ((this._bl >>> 0) < (bl >>> 0) ? 1 : 0)) | 0
	    this._c = (this._c + c + ((this._cl >>> 0) < (cl >>> 0) ? 1 : 0)) | 0
	    this._d = (this._d + d + ((this._dl >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	    this._e = (this._e + e + ((this._el >>> 0) < (el >>> 0) ? 1 : 0)) | 0
	    this._f = (this._f + f + ((this._fl >>> 0) < (fl >>> 0) ? 1 : 0)) | 0
	    this._g = (this._g + g + ((this._gl >>> 0) < (gl >>> 0) ? 1 : 0)) | 0
	    this._h = (this._h + h + ((this._hl >>> 0) < (hl >>> 0) ? 1 : 0)) | 0
	  }

	  Sha512.prototype._hash = function () {
	    var H = new Buffer(64)

	    function writeInt64BE(h, l, offset) {
	      H.writeInt32BE(h, offset)
	      H.writeInt32BE(l, offset + 4)
	    }

	    writeInt64BE(this._a, this._al, 0)
	    writeInt64BE(this._b, this._bl, 8)
	    writeInt64BE(this._c, this._cl, 16)
	    writeInt64BE(this._d, this._dl, 24)
	    writeInt64BE(this._e, this._el, 32)
	    writeInt64BE(this._f, this._fl, 40)
	    writeInt64BE(this._g, this._gl, 48)
	    writeInt64BE(this._h, this._hl, 56)

	    return H
	  }

	  return Sha512

	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */

	var helpers = __webpack_require__(23);

	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len)
	{
	  /* append padding */
	  x[len >> 5] |= 0x80 << ((len) % 32);
	  x[(((len + 64) >>> 9) << 4) + 14] = len;

	  var a =  1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d =  271733878;

	  for(var i = 0; i < x.length; i += 16)
	  {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;

	    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
	    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
	    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
	    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
	    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
	    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
	    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

	    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
	    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
	    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
	    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
	    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
	    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
	    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
	    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
	    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
	    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
	    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
	    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

	    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
	    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
	    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
	    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
	    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
	    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
	    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
	    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
	    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

	    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
	    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
	    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
	    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
	    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
	    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
	    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
	    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);

	}

	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t)
	{
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t)
	{
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t)
	{
	  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y)
	{
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return (msw << 16) | (lsw & 0xFFFF);
	}

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt)
	{
	  return (num << cnt) | (num >>> (32 - cnt));
	}

	module.exports = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var intSize = 4;
	var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
	var chrsz = 8;

	function toArray(buf, bigEndian) {
	  if ((buf.length % intSize) !== 0) {
	    var len = buf.length + (intSize - (buf.length % intSize));
	    buf = Buffer.concat([buf, zeroBuffer], len);
	  }

	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}

	function toBuffer(arr, size, bigEndian) {
	  var buf = new Buffer(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}

	function hash(buf, fn, hashSize, bigEndian) {
	  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}

	module.exports = { hash: hash };

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = ripemd160



	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	// Constants table
	var zl = [
	    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	    7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	    3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	    1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	    4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13];
	var zr = [
	    5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	    6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	    15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	    8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	    12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11];
	var sl = [
	     11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	    7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	    11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	      11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	    9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ];
	var sr = [
	    8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	    9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	    9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	    15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	    8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ];

	var hl =  [ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
	var hr =  [ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];

	var bytesToWords = function (bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << (24 - b % 32);
	  }
	  return words;
	};

	var wordsToBytes = function (words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	  }
	  return bytes;
	};

	var processBlock = function (H, M, offset) {

	  // Swap endian
	  for (var i = 0; i < 16; i++) {
	    var offset_i = offset + i;
	    var M_offset_i = M[offset_i];

	    // Swap
	    M[offset_i] = (
	        (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	        (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	    );
	  }

	  // Working variables
	  var al, bl, cl, dl, el;
	  var ar, br, cr, dr, er;

	  ar = al = H[0];
	  br = bl = H[1];
	  cr = cl = H[2];
	  dr = dl = H[3];
	  er = el = H[4];
	  // Computation
	  var t;
	  for (var i = 0; i < 80; i += 1) {
	    t = (al +  M[offset+zl[i]])|0;
	    if (i<16){
	        t +=  f1(bl,cl,dl) + hl[0];
	    } else if (i<32) {
	        t +=  f2(bl,cl,dl) + hl[1];
	    } else if (i<48) {
	        t +=  f3(bl,cl,dl) + hl[2];
	    } else if (i<64) {
	        t +=  f4(bl,cl,dl) + hl[3];
	    } else {// if (i<80) {
	        t +=  f5(bl,cl,dl) + hl[4];
	    }
	    t = t|0;
	    t =  rotl(t,sl[i]);
	    t = (t+el)|0;
	    al = el;
	    el = dl;
	    dl = rotl(cl, 10);
	    cl = bl;
	    bl = t;

	    t = (ar + M[offset+zr[i]])|0;
	    if (i<16){
	        t +=  f5(br,cr,dr) + hr[0];
	    } else if (i<32) {
	        t +=  f4(br,cr,dr) + hr[1];
	    } else if (i<48) {
	        t +=  f3(br,cr,dr) + hr[2];
	    } else if (i<64) {
	        t +=  f2(br,cr,dr) + hr[3];
	    } else {// if (i<80) {
	        t +=  f1(br,cr,dr) + hr[4];
	    }
	    t = t|0;
	    t =  rotl(t,sr[i]) ;
	    t = (t+er)|0;
	    ar = er;
	    er = dr;
	    dr = rotl(cr, 10);
	    cr = br;
	    br = t;
	  }
	  // Intermediate hash value
	  t    = (H[1] + cl + dr)|0;
	  H[1] = (H[2] + dl + er)|0;
	  H[2] = (H[3] + el + ar)|0;
	  H[3] = (H[4] + al + br)|0;
	  H[4] = (H[0] + bl + cr)|0;
	  H[0] =  t;
	};

	function f1(x, y, z) {
	  return ((x) ^ (y) ^ (z));
	}

	function f2(x, y, z) {
	  return (((x)&(y)) | ((~x)&(z)));
	}

	function f3(x, y, z) {
	  return (((x) | (~(y))) ^ (z));
	}

	function f4(x, y, z) {
	  return (((x) & (z)) | ((y)&(~(z))));
	}

	function f5(x, y, z) {
	  return ((x) ^ ((y) |(~(z))));
	}

	function rotl(x,n) {
	  return (x<<n) | (x>>>(32-n));
	}

	function ripemd160(message) {
	  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];

	  if (typeof message == 'string')
	    message = new Buffer(message, 'utf8');

	  var m = bytesToWords(message);

	  var nBitsLeft = message.length * 8;
	  var nBitsTotal = message.length * 8;

	  // Add padding
	  m[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	  m[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	      (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	      (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	  );

	  for (var i=0 ; i<m.length; i += 16) {
	    processBlock(H, m, i);
	  }

	  // Swap endian
	  for (var i = 0; i < 5; i++) {
	      // Shortcut
	    var H_i = H[i];

	    // Swap
	    H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	          (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	  }

	  var digestbytes = wordsToBytes(H);
	  return new Buffer(digestbytes);
	}



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(13)

	var zeroBuffer = new Buffer(128)
	zeroBuffer.fill(0)

	module.exports = Hmac

	function Hmac (alg, key) {
	  if(!(this instanceof Hmac)) return new Hmac(alg, key)
	  this._opad = opad
	  this._alg = alg

	  var blocksize = (alg === 'sha512') ? 128 : 64

	  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key

	  if(key.length > blocksize) {
	    key = createHash(alg).update(key).digest()
	  } else if(key.length < blocksize) {
	    key = Buffer.concat([key, zeroBuffer], blocksize)
	  }

	  var ipad = this._ipad = new Buffer(blocksize)
	  var opad = this._opad = new Buffer(blocksize)

	  for(var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36
	    opad[i] = key[i] ^ 0x5C
	  }

	  this._hash = createHash(alg).update(ipad)
	}

	Hmac.prototype.update = function (data, enc) {
	  this._hash.update(data, enc)
	  return this
	}

	Hmac.prototype.digest = function (enc) {
	  var h = this._hash.digest()
	  return createHash(this._alg).update(this._opad).update(h).digest(enc)
	}


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var pbkdf2Export = __webpack_require__(27)

	module.exports = function (crypto, exports) {
	  exports = exports || {}

	  var exported = pbkdf2Export(crypto)

	  exports.pbkdf2 = exported.pbkdf2
	  exports.pbkdf2Sync = exported.pbkdf2Sync

	  return exports
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function(crypto) {
	  function pbkdf2(password, salt, iterations, keylen, digest, callback) {
	    if ('function' === typeof digest) {
	      callback = digest
	      digest = undefined
	    }

	    if ('function' !== typeof callback)
	      throw new Error('No callback provided to pbkdf2')

	    setTimeout(function() {
	      var result

	      try {
	        result = pbkdf2Sync(password, salt, iterations, keylen, digest)
	      } catch (e) {
	        return callback(e)
	      }

	      callback(undefined, result)
	    })
	  }

	  function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	    if ('number' !== typeof iterations)
	      throw new TypeError('Iterations not a number')

	    if (iterations < 0)
	      throw new TypeError('Bad iterations')

	    if ('number' !== typeof keylen)
	      throw new TypeError('Key length not a number')

	    if (keylen < 0)
	      throw new TypeError('Bad key length')

	    digest = digest || 'sha1'

	    if (!Buffer.isBuffer(password)) password = new Buffer(password)
	    if (!Buffer.isBuffer(salt)) salt = new Buffer(salt)

	    var hLen, l = 1, r, T
	    var DK = new Buffer(keylen)
	    var block1 = new Buffer(salt.length + 4)
	    salt.copy(block1, 0, 0, salt.length)

	    for (var i = 1; i <= l; i++) {
	      block1.writeUInt32BE(i, salt.length)

	      var U = crypto.createHmac(digest, password).update(block1).digest()

	      if (!hLen) {
	        hLen = U.length
	        T = new Buffer(hLen)
	        l = Math.ceil(keylen / hLen)
	        r = keylen - (l - 1) * hLen

	        if (keylen > (Math.pow(2, 32) - 1) * hLen)
	          throw new TypeError('keylen exceeds maximum length')
	      }

	      U.copy(T, 0, 0, hLen)

	      for (var j = 1; j < iterations; j++) {
	        U = crypto.createHmac(digest, password).update(U).digest()

	        for (var k = 0; k < hLen; k++) {
	          T[k] ^= U[k]
	        }
	      }

	      var destPos = (i - 1) * hLen
	      var len = (i == l ? r : hLen)
	      T.copy(DK, destPos, 0, len)
	    }

	    return DK
	  }

	  return {
	    pbkdf2: pbkdf2,
	    pbkdf2Sync: pbkdf2Sync
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (crypto, exports) {
	  exports = exports || {};
	  var ciphers = __webpack_require__(29)(crypto);
	  exports.createCipher = ciphers.createCipher;
	  exports.createCipheriv = ciphers.createCipheriv;
	  var deciphers = __webpack_require__(63)(crypto);
	  exports.createDecipher = deciphers.createDecipher;
	  exports.createDecipheriv = deciphers.createDecipheriv;
	  var modes = __webpack_require__(54);
	  function listCiphers () {
	    return Object.keys(modes);
	  }
	  exports.listCiphers = listCiphers;
	};



/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(30);
	var Transform = __webpack_require__(31);
	var inherits = __webpack_require__(34);
	var modes = __webpack_require__(54);
	var ebtk = __webpack_require__(55);
	var StreamCipher = __webpack_require__(56);
	inherits(Cipher, Transform);
	function Cipher(mode, key, iv) {
	  if (!(this instanceof Cipher)) {
	    return new Cipher(mode, key, iv);
	  }
	  Transform.call(this);
	  this._cache = new Splitter();
	  this._cipher = new aes.AES(key);
	  this._prev = new Buffer(iv.length);
	  iv.copy(this._prev);
	  this._mode = mode;
	}
	Cipher.prototype._transform = function (data, _, next) {
	  this._cache.add(data);
	  var chunk;
	  var thing;
	  while ((chunk = this._cache.get())) {
	    thing = this._mode.encrypt(this, chunk);
	    this.push(thing);
	  }
	  next();
	};
	Cipher.prototype._flush = function (next) {
	  var chunk = this._cache.flush();
	  this.push(this._mode.encrypt(this, chunk));
	  this._cipher.scrub();
	  next();
	};


	function Splitter() {
	   if (!(this instanceof Splitter)) {
	    return new Splitter();
	  }
	  this.cache = new Buffer('');
	}
	Splitter.prototype.add = function (data) {
	  this.cache = Buffer.concat([this.cache, data]);
	};

	Splitter.prototype.get = function () {
	  if (this.cache.length > 15) {
	    var out = this.cache.slice(0, 16);
	    this.cache = this.cache.slice(16);
	    return out;
	  }
	  return null;
	};
	Splitter.prototype.flush = function () {
	  var len = 16 - this.cache.length;
	  var padBuff = new Buffer(len);

	  var i = -1;
	  while (++i < len) {
	    padBuff.writeUInt8(len, i);
	  }
	  var out = Buffer.concat([this.cache, padBuff]);
	  return out;
	};
	var modelist = {
	  ECB: __webpack_require__(57),
	  CBC: __webpack_require__(58),
	  CFB: __webpack_require__(60),
	  OFB: __webpack_require__(61),
	  CTR: __webpack_require__(62)
	};
	module.exports = function (crypto) {
	  function createCipheriv(suite, password, iv) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    if (typeof iv === 'string') {
	      iv = new Buffer(iv);
	    }
	    if (typeof password === 'string') {
	      password = new Buffer(password);
	    }
	    if (password.length !== config.key/8) {
	      throw new TypeError('invalid key length ' + password.length);
	    }
	    if (iv.length !== config.iv) {
	      throw new TypeError('invalid iv length ' + iv.length);
	    }
	    if (config.type === 'stream') {
	      return new StreamCipher(modelist[config.mode], password, iv);
	    }
	    return new Cipher(modelist[config.mode], password, iv);
	  }
	  function createCipher (suite, password) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    var keys = ebtk(crypto, password, config.key, config.iv);
	    return createCipheriv(suite, keys.key, keys.iv);
	  }
	  return {
	    createCipher: createCipher,
	    createCipheriv: createCipheriv
	  };
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var uint_max = Math.pow(2, 32);
	function fixup_uint32(x) {
	    var ret, x_pos;
	    ret = x > uint_max || x < 0 ? (x_pos = Math.abs(x) % uint_max, x < 0 ? uint_max - x_pos : x_pos) : x;
	    return ret;
	}
	function scrub_vec(v) {
	  var i, _i, _ref;
	  for (i = _i = 0, _ref = v.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	    v[i] = 0;
	  }
	  return false;
	}

	function Global() {
	  var i;
	  this.SBOX = [];
	  this.INV_SBOX = [];
	  this.SUB_MIX = (function() {
	    var _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 4; i = ++_i) {
	      _results.push([]);
	    }
	    return _results;
	  })();
	  this.INV_SUB_MIX = (function() {
	    var _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 4; i = ++_i) {
	      _results.push([]);
	    }
	    return _results;
	  })();
	  this.init();
	  this.RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
	}

	Global.prototype.init = function() {
	  var d, i, sx, t, x, x2, x4, x8, xi, _i;
	  d = (function() {
	    var _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 256; i = ++_i) {
	      if (i < 128) {
	        _results.push(i << 1);
	      } else {
	        _results.push((i << 1) ^ 0x11b);
	      }
	    }
	    return _results;
	  })();
	  x = 0;
	  xi = 0;
	  for (i = _i = 0; _i < 256; i = ++_i) {
	    sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	    sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	    this.SBOX[x] = sx;
	    this.INV_SBOX[sx] = x;
	    x2 = d[x];
	    x4 = d[x2];
	    x8 = d[x4];
	    t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	    this.SUB_MIX[0][x] = (t << 24) | (t >>> 8);
	    this.SUB_MIX[1][x] = (t << 16) | (t >>> 16);
	    this.SUB_MIX[2][x] = (t << 8) | (t >>> 24);
	    this.SUB_MIX[3][x] = t;
	    t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	    this.INV_SUB_MIX[0][sx] = (t << 24) | (t >>> 8);
	    this.INV_SUB_MIX[1][sx] = (t << 16) | (t >>> 16);
	    this.INV_SUB_MIX[2][sx] = (t << 8) | (t >>> 24);
	    this.INV_SUB_MIX[3][sx] = t;
	    if (x === 0) {
	      x = xi = 1;
	    } else {
	      x = x2 ^ d[d[d[x8 ^ x2]]];
	      xi ^= d[d[xi]];
	    }
	  }
	  return true;
	};

	var G = new Global();


	AES.blockSize = 4 * 4;

	AES.prototype.blockSize = AES.blockSize;

	AES.keySize = 256 / 8;

	AES.prototype.keySize = AES.keySize;

	AES.ivSize = AES.blockSize;

	AES.prototype.ivSize = AES.ivSize;

	 function bufferToArray(buf) {
	  var len = buf.length/4;
	  var out = new Array(len);
	  var i = -1;
	  while (++i < len) {
	    out[i] = buf.readUInt32BE(i * 4);
	  }
	  return out;
	 }
	function AES(key) {
	  this._key = bufferToArray(key);
	  this._doReset();
	}

	AES.prototype._doReset = function() {
	  var invKsRow, keySize, keyWords, ksRow, ksRows, t, _i, _j;
	  keyWords = this._key;
	  keySize = keyWords.length;
	  this._nRounds = keySize + 6;
	  ksRows = (this._nRounds + 1) * 4;
	  this._keySchedule = [];
	  for (ksRow = _i = 0; 0 <= ksRows ? _i < ksRows : _i > ksRows; ksRow = 0 <= ksRows ? ++_i : --_i) {
	    this._keySchedule[ksRow] = ksRow < keySize ? keyWords[ksRow] : (t = this._keySchedule[ksRow - 1], (ksRow % keySize) === 0 ? (t = (t << 8) | (t >>> 24), t = (G.SBOX[t >>> 24] << 24) | (G.SBOX[(t >>> 16) & 0xff] << 16) | (G.SBOX[(t >>> 8) & 0xff] << 8) | G.SBOX[t & 0xff], t ^= G.RCON[(ksRow / keySize) | 0] << 24) : keySize > 6 && ksRow % keySize === 4 ? t = (G.SBOX[t >>> 24] << 24) | (G.SBOX[(t >>> 16) & 0xff] << 16) | (G.SBOX[(t >>> 8) & 0xff] << 8) | G.SBOX[t & 0xff] : void 0, this._keySchedule[ksRow - keySize] ^ t);
	  }
	  this._invKeySchedule = [];
	  for (invKsRow = _j = 0; 0 <= ksRows ? _j < ksRows : _j > ksRows; invKsRow = 0 <= ksRows ? ++_j : --_j) {
	    ksRow = ksRows - invKsRow;
	    t = this._keySchedule[ksRow - (invKsRow % 4 ? 0 : 4)];
	    this._invKeySchedule[invKsRow] = invKsRow < 4 || ksRow <= 4 ? t : G.INV_SUB_MIX[0][G.SBOX[t >>> 24]] ^ G.INV_SUB_MIX[1][G.SBOX[(t >>> 16) & 0xff]] ^ G.INV_SUB_MIX[2][G.SBOX[(t >>> 8) & 0xff]] ^ G.INV_SUB_MIX[3][G.SBOX[t & 0xff]];
	  }
	  return true;
	};

	AES.prototype.encryptBlock = function(M) {
	  M = bufferToArray(new Buffer(M));
	  var out = this._doCryptBlock(M, this._keySchedule, G.SUB_MIX, G.SBOX);
	  var buf = new Buffer(16);
	  buf.writeUInt32BE(out[0], 0);
	  buf.writeUInt32BE(out[1], 4);
	  buf.writeUInt32BE(out[2], 8);
	  buf.writeUInt32BE(out[3], 12);
	  return buf;
	};

	AES.prototype.decryptBlock = function(M) {
	  M = bufferToArray(new Buffer(M));
	  var temp = [M[3], M[1]];
	  M[1] = temp[0];
	  M[3] = temp[1];
	  var out = this._doCryptBlock(M, this._invKeySchedule, G.INV_SUB_MIX, G.INV_SBOX);
	  var buf = new Buffer(16);
	  buf.writeUInt32BE(out[0], 0);
	  buf.writeUInt32BE(out[3], 4);
	  buf.writeUInt32BE(out[2], 8);
	  buf.writeUInt32BE(out[1], 12);
	  return buf;
	};

	AES.prototype.scrub = function() {
	  scrub_vec(this._keySchedule);
	  scrub_vec(this._invKeySchedule);
	  scrub_vec(this._key);
	};

	AES.prototype._doCryptBlock = function(M, keySchedule, SUB_MIX, SBOX) {
	  var ksRow, round, s0, s1, s2, s3, t0, t1, t2, t3, _i, _ref;

	  s0 = M[0] ^ keySchedule[0];
	  s1 = M[1] ^ keySchedule[1];
	  s2 = M[2] ^ keySchedule[2];
	  s3 = M[3] ^ keySchedule[3];
	  ksRow = 4;
	  for (round = _i = 1, _ref = this._nRounds; 1 <= _ref ? _i < _ref : _i > _ref; round = 1 <= _ref ? ++_i : --_i) {
	    t0 = SUB_MIX[0][s0 >>> 24] ^ SUB_MIX[1][(s1 >>> 16) & 0xff] ^ SUB_MIX[2][(s2 >>> 8) & 0xff] ^ SUB_MIX[3][s3 & 0xff] ^ keySchedule[ksRow++];
	    t1 = SUB_MIX[0][s1 >>> 24] ^ SUB_MIX[1][(s2 >>> 16) & 0xff] ^ SUB_MIX[2][(s3 >>> 8) & 0xff] ^ SUB_MIX[3][s0 & 0xff] ^ keySchedule[ksRow++];
	    t2 = SUB_MIX[0][s2 >>> 24] ^ SUB_MIX[1][(s3 >>> 16) & 0xff] ^ SUB_MIX[2][(s0 >>> 8) & 0xff] ^ SUB_MIX[3][s1 & 0xff] ^ keySchedule[ksRow++];
	    t3 = SUB_MIX[0][s3 >>> 24] ^ SUB_MIX[1][(s0 >>> 16) & 0xff] ^ SUB_MIX[2][(s1 >>> 8) & 0xff] ^ SUB_MIX[3][s2 & 0xff] ^ keySchedule[ksRow++];
	    s0 = t0;
	    s1 = t1;
	    s2 = t2;
	    s3 = t3;
	  }
	  t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	  t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	  t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	  t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];
	  return [
	    fixup_uint32(t0),
	    fixup_uint32(t1),
	    fixup_uint32(t2),
	    fixup_uint32(t3)
	  ];

	};




	  exports.AES = AES;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var Transform = __webpack_require__(32).Transform;
	var inherits = __webpack_require__(34);

	module.exports = CipherBase;
	inherits(CipherBase, Transform);
	function CipherBase() {
	  Transform.call(this);
	}
	CipherBase.prototype.update = function (data, inputEnd, outputEnc) {
	  this.write(data, inputEnd);
	  var outData = new Buffer('');
	  var chunk;
	  while ((chunk = this.read())) {
	    outData = Buffer.concat([outData, chunk]);
	  }
	  if (outputEnc) {
	    outData = outData.toString(outputEnc);
	  }
	  return outData;
	};
	CipherBase.prototype.final = function (outputEnc) {
	  this.end();
	  var outData = new Buffer('');
	  var chunk;
	  while ((chunk = this.read())) {
	    outData = Buffer.concat([outData, chunk]);
	  }
	  if (outputEnc) {
	    outData = outData.toString(outputEnc);
	  }
	  return outData;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Stream;

	var EE = __webpack_require__(33).EventEmitter;
	var inherits = __webpack_require__(34);

	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(35);
	Stream.Writable = __webpack_require__(50);
	Stream.Duplex = __webpack_require__(51);
	Stream.Transform = __webpack_require__(52);
	Stream.PassThrough = __webpack_require__(53);

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;



	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EE.call(this);
	}

	Stream.prototype.pipe = function(dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    dest.end();
	  }


	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);

	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);

	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);

	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);

	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);

	  dest.on('close', cleanup);

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ },
/* 33 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 34 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var Stream = (function (){
	  try {
	    return __webpack_require__(32); // hack to fix a circular dependency issue when used with browserify
	  } catch(_){}
	}());
	exports = module.exports = __webpack_require__(36);
	exports.Stream = Stream || exports;
	exports.Readable = exports;
	exports.Writable = __webpack_require__(43);
	exports.Duplex = __webpack_require__(42);
	exports.Transform = __webpack_require__(48);
	exports.PassThrough = __webpack_require__(49);

	if (!process.browser && process.env.READABLE_STREAM === 'disable' && Stream) {
	  module.exports = Stream;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	module.exports = Readable;

	/*<replacement>*/
	var processNextTick = __webpack_require__(37);
	/*</replacement>*/

	/*<replacement>*/
	var isArray = __webpack_require__(10);
	/*</replacement>*/

	/*<replacement>*/
	var Duplex;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	/*<replacement>*/
	var EE = __webpack_require__(33).EventEmitter;

	var EElistenerCount = function (emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	/*<replacement>*/
	var Stream;
	(function () {
	  try {
	    Stream = __webpack_require__(32);
	  } catch (_) {} finally {
	    if (!Stream) Stream = __webpack_require__(33).EventEmitter;
	  }
	})();
	/*</replacement>*/

	var Buffer = __webpack_require__(7).Buffer;
	/*<replacement>*/
	var bufferShim = __webpack_require__(38);
	/*</replacement>*/

	/*<replacement>*/
	var util = __webpack_require__(39);
	util.inherits = __webpack_require__(34);
	/*</replacement>*/

	/*<replacement>*/
	var debugUtil = __webpack_require__(40);
	var debug = void 0;
	if (debugUtil && debugUtil.debuglog) {
	  debug = debugUtil.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/

	var BufferList = __webpack_require__(41);
	var StringDecoder;

	util.inherits(Readable, Stream);

	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') {
	    return emitter.prependListener(event, fn);
	  } else {
	    // This is a hack to make sure that our error handler is attached before any
	    // userland ones.  NEVER DO THIS. This is here only because this code needs
	    // to continue to work with older versions of Node.js that do not include
	    // the prependListener() method. The goal is to eventually remove this hack.
	    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	  }
	}

	function ReadableState(options, stream) {
	  Duplex = Duplex || __webpack_require__(42);

	  options = options || {};

	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~ ~this.highWaterMark;

	  // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()
	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = __webpack_require__(47).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  Duplex = Duplex || __webpack_require__(42);

	  if (!(this instanceof Readable)) return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  if (options && typeof options.read === 'function') this._read = options.read;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;

	  if (!state.objectMode && typeof chunk === 'string') {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = bufferShim.from(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function (chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var _e = new Error('stream.unshift() after end event');
	      stream.emit('error', _e);
	    } else {
	      var skipAdd;
	      if (state.decoder && !addToFront && !encoding) {
	        chunk = state.decoder.write(chunk);
	        skipAdd = !state.objectMode && chunk.length === 0;
	      }

	      if (!addToFront) state.reading = false;

	      // Don't add to the buffer if we've decoded to an empty string chunk and
	      // we're not in object mode
	      if (!skipAdd) {
	        // if we want the data now, just emit it.
	        if (state.flowing && state.length === 0 && !state.sync) {
	          stream.emit('data', chunk);
	          stream.read(0);
	        } else {
	          // update the buffer info.
	          state.length += state.objectMode ? 1 : chunk.length;
	          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

	          if (state.needReadable) emitReadable(stream);
	        }
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}

	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = __webpack_require__(47).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 8MB
	var MAX_HWM = 0x800000;
	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }
	  return n;
	}

	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;
	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  }
	  // If we're asking for more than the current hwm, then raise the hwm.
	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n;
	  // Don't have enough
	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }
	  return state.length;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;

	  if (n !== 0) state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	    // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.
	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }

	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;

	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  } else {
	    state.length -= n;
	  }

	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true;

	    // If we tried to read() past the EOF, then emit end on the next tick.
	    if (nOrig !== n && state.ended) endReadable(this);
	  }

	  if (ret !== null) this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}

	function onEofChunk(stream, state) {
	  if (state.ended) return;
	  if (state.decoder) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}

	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    processNextTick(maybeReadMore_, stream, state);
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;else len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function (n) {
	  this.emit('error', new Error('_read() is not implemented'));
	};

	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  var cleanedUp = false;
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    cleanedUp = true;

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }

	  // If the user pushes more data while we're writing to dest then we'll end up
	  // in ondata again. However, we only want to increase awaitDrain once because
	  // dest will only emit one 'drain' event for the multiple writes.
	  // => Introduce a guard on increasing awaitDrain.
	  var increasedAwaitDrain = false;
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    increasedAwaitDrain = false;
	    var ret = dest.write(chunk);
	    if (false === ret && !increasedAwaitDrain) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', src._readableState.awaitDrain);
	        src._readableState.awaitDrain++;
	        increasedAwaitDrain = true;
	      }
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
	  }

	  // Make sure our error handler is attached before userland ones.
	  prependListener(dest, 'error', onerror);

	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function () {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;
	    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}

	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;

	    if (!dest) dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++) {
	      dests[i].emit('unpipe', this);
	    }return this;
	  }

	  // try to find the right one.
	  var index = indexOf(state.pipes, dest);
	  if (index === -1) return this;

	  state.pipes.splice(index, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  if (ev === 'data') {
	    // Start flowing on next tick if stream isn't explicitly paused
	    if (this._readableState.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    var state = this._readableState;
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.emittedReadable = false;
	      if (!state.reading) {
	        processNextTick(nReadingNextTick, this);
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	}

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function () {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    processNextTick(resume_, stream, state);
	  }
	}

	function resume_(stream, state) {
	  if (!state.reading) {
	    debug('resume read 0');
	    stream.read(0);
	  }

	  state.resumeScheduled = false;
	  state.awaitDrain = 0;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}

	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  while (state.flowing && stream.read() !== null) {}
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function (stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function () {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk);

	    // don't skip over falsy values in objectMode
	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function (method) {
	        return function () {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function (ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};

	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;

	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = fromListPartial(n, state.buffer, state.decoder);
	  }

	  return ret;
	}

	// Extracts only enough buffered data to satisfy the amount requested.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromListPartial(n, list, hasStrings) {
	  var ret;
	  if (n < list.head.data.length) {
	    // slice is the same for buffers and strings
	    ret = list.head.data.slice(0, n);
	    list.head.data = list.head.data.slice(n);
	  } else if (n === list.head.data.length) {
	    // first chunk is a perfect match
	    ret = list.shift();
	  } else {
	    // result spans more than one buffer
	    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
	  }
	  return ret;
	}

	// Copies a specified amount of characters from the list of buffered data
	// chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBufferString(n, list) {
	  var p = list.head;
	  var c = 1;
	  var ret = p.data;
	  n -= ret.length;
	  while (p = p.next) {
	    var str = p.data;
	    var nb = n > str.length ? str.length : n;
	    if (nb === str.length) ret += str;else ret += str.slice(0, n);
	    n -= nb;
	    if (n === 0) {
	      if (nb === str.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = str.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}

	// Copies a specified amount of bytes from the list of buffered data chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBuffer(n, list) {
	  var ret = bufferShim.allocUnsafe(n);
	  var p = list.head;
	  var c = 1;
	  p.data.copy(ret);
	  n -= p.data.length;
	  while (p = p.next) {
	    var buf = p.data;
	    var nb = n > buf.length ? buf.length : n;
	    buf.copy(ret, ret.length - n, 0, nb);
	    n -= nb;
	    if (n === 0) {
	      if (nb === buf.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = buf.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    processNextTick(endReadableNT, state, stream);
	  }
	}

	function endReadableNT(state, stream) {
	  // Check that we didn't get one last unshift.
	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');
	  }
	}

	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	if (!process.version ||
	    process.version.indexOf('v0.') === 0 ||
	    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
	  module.exports = nextTick;
	} else {
	  module.exports = process.nextTick;
	}

	function nextTick(fn, arg1, arg2, arg3) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('"callback" argument must be a function');
	  }
	  var len = arguments.length;
	  var args, i;
	  switch (len) {
	  case 0:
	  case 1:
	    return process.nextTick(fn);
	  case 2:
	    return process.nextTick(function afterTickOne() {
	      fn.call(null, arg1);
	    });
	  case 3:
	    return process.nextTick(function afterTickTwo() {
	      fn.call(null, arg1, arg2);
	    });
	  case 4:
	    return process.nextTick(function afterTickThree() {
	      fn.call(null, arg1, arg2, arg3);
	    });
	  default:
	    args = new Array(len - 1);
	    i = 0;
	    while (i < args.length) {
	      args[i++] = arguments[i];
	    }
	    return process.nextTick(function afterTick() {
	      fn.apply(null, args);
	    });
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var buffer = __webpack_require__(7);
	var Buffer = buffer.Buffer;
	var SlowBuffer = buffer.SlowBuffer;
	var MAX_LEN = buffer.kMaxLength || 2147483647;
	exports.alloc = function alloc(size, fill, encoding) {
	  if (typeof Buffer.alloc === 'function') {
	    return Buffer.alloc(size, fill, encoding);
	  }
	  if (typeof encoding === 'number') {
	    throw new TypeError('encoding must not be number');
	  }
	  if (typeof size !== 'number') {
	    throw new TypeError('size must be a number');
	  }
	  if (size > MAX_LEN) {
	    throw new RangeError('size is too large');
	  }
	  var enc = encoding;
	  var _fill = fill;
	  if (_fill === undefined) {
	    enc = undefined;
	    _fill = 0;
	  }
	  var buf = new Buffer(size);
	  if (typeof _fill === 'string') {
	    var fillBuf = new Buffer(_fill, enc);
	    var flen = fillBuf.length;
	    var i = -1;
	    while (++i < size) {
	      buf[i] = fillBuf[i % flen];
	    }
	  } else {
	    buf.fill(_fill);
	  }
	  return buf;
	}
	exports.allocUnsafe = function allocUnsafe(size) {
	  if (typeof Buffer.allocUnsafe === 'function') {
	    return Buffer.allocUnsafe(size);
	  }
	  if (typeof size !== 'number') {
	    throw new TypeError('size must be a number');
	  }
	  if (size > MAX_LEN) {
	    throw new RangeError('size is too large');
	  }
	  return new Buffer(size);
	}
	exports.from = function from(value, encodingOrOffset, length) {
	  if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
	    return Buffer.from(value, encodingOrOffset, length);
	  }
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number');
	  }
	  if (typeof value === 'string') {
	    return new Buffer(value, encodingOrOffset);
	  }
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    var offset = encodingOrOffset;
	    if (arguments.length === 1) {
	      return new Buffer(value);
	    }
	    if (typeof offset === 'undefined') {
	      offset = 0;
	    }
	    var len = length;
	    if (typeof len === 'undefined') {
	      len = value.byteLength - offset;
	    }
	    if (offset >= value.byteLength) {
	      throw new RangeError('\'offset\' is out of bounds');
	    }
	    if (len > value.byteLength - offset) {
	      throw new RangeError('\'length\' is out of bounds');
	    }
	    return new Buffer(value.slice(offset, offset + len));
	  }
	  if (Buffer.isBuffer(value)) {
	    var out = new Buffer(value.length);
	    value.copy(out, 0, 0, value.length);
	    return out;
	  }
	  if (value) {
	    if (Array.isArray(value) || (typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer) || 'length' in value) {
	      return new Buffer(value);
	    }
	    if (value.type === 'Buffer' && Array.isArray(value.data)) {
	      return new Buffer(value.data);
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
	}
	exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
	  if (typeof Buffer.allocUnsafeSlow === 'function') {
	    return Buffer.allocUnsafeSlow(size);
	  }
	  if (typeof size !== 'number') {
	    throw new TypeError('size must be a number');
	  }
	  if (size >= MAX_LEN) {
	    throw new RangeError('size is too large');
	  }
	  return new SlowBuffer(size);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.

	function isArray(arg) {
	  if (Array.isArray) {
	    return Array.isArray(arg);
	  }
	  return objectToString(arg) === '[object Array]';
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = Buffer.isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 40 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Buffer = __webpack_require__(7).Buffer;
	/*<replacement>*/
	var bufferShim = __webpack_require__(38);
	/*</replacement>*/

	module.exports = BufferList;

	function BufferList() {
	  this.head = null;
	  this.tail = null;
	  this.length = 0;
	}

	BufferList.prototype.push = function (v) {
	  var entry = { data: v, next: null };
	  if (this.length > 0) this.tail.next = entry;else this.head = entry;
	  this.tail = entry;
	  ++this.length;
	};

	BufferList.prototype.unshift = function (v) {
	  var entry = { data: v, next: this.head };
	  if (this.length === 0) this.tail = entry;
	  this.head = entry;
	  ++this.length;
	};

	BufferList.prototype.shift = function () {
	  if (this.length === 0) return;
	  var ret = this.head.data;
	  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	  --this.length;
	  return ret;
	};

	BufferList.prototype.clear = function () {
	  this.head = this.tail = null;
	  this.length = 0;
	};

	BufferList.prototype.join = function (s) {
	  if (this.length === 0) return '';
	  var p = this.head;
	  var ret = '' + p.data;
	  while (p = p.next) {
	    ret += s + p.data;
	  }return ret;
	};

	BufferList.prototype.concat = function (n) {
	  if (this.length === 0) return bufferShim.alloc(0);
	  if (this.length === 1) return this.head.data;
	  var ret = bufferShim.allocUnsafe(n >>> 0);
	  var p = this.head;
	  var i = 0;
	  while (p) {
	    p.data.copy(ret, i);
	    i += p.data.length;
	    p = p.next;
	  }
	  return ret;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	'use strict';

	/*<replacement>*/

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    keys.push(key);
	  }return keys;
	};
	/*</replacement>*/

	module.exports = Duplex;

	/*<replacement>*/
	var processNextTick = __webpack_require__(37);
	/*</replacement>*/

	/*<replacement>*/
	var util = __webpack_require__(39);
	util.inherits = __webpack_require__(34);
	/*</replacement>*/

	var Readable = __webpack_require__(36);
	var Writable = __webpack_require__(43);

	util.inherits(Duplex, Readable);

	var keys = objectKeys(Writable.prototype);
	for (var v = 0; v < keys.length; v++) {
	  var method = keys[v];
	  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	}

	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false) this.readable = false;

	  if (options && options.writable === false) this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended) return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  processNextTick(onEndNT, this);
	}

	function onEndNT(self) {
	  self.end();
	}

	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, setImmediate) {// A bit simpler than readable streams.
	// Implement an async ._write(chunk, encoding, cb), and it'll handle all
	// the drain event emission and buffering.

	'use strict';

	module.exports = Writable;

	/*<replacement>*/
	var processNextTick = __webpack_require__(37);
	/*</replacement>*/

	/*<replacement>*/
	var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
	/*</replacement>*/

	/*<replacement>*/
	var Duplex;
	/*</replacement>*/

	Writable.WritableState = WritableState;

	/*<replacement>*/
	var util = __webpack_require__(39);
	util.inherits = __webpack_require__(34);
	/*</replacement>*/

	/*<replacement>*/
	var internalUtil = {
	  deprecate: __webpack_require__(46)
	};
	/*</replacement>*/

	/*<replacement>*/
	var Stream;
	(function () {
	  try {
	    Stream = __webpack_require__(32);
	  } catch (_) {} finally {
	    if (!Stream) Stream = __webpack_require__(33).EventEmitter;
	  }
	})();
	/*</replacement>*/

	var Buffer = __webpack_require__(7).Buffer;
	/*<replacement>*/
	var bufferShim = __webpack_require__(38);
	/*</replacement>*/

	util.inherits(Writable, Stream);

	function nop() {}

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	  this.next = null;
	}

	function WritableState(options, stream) {
	  Duplex = Duplex || __webpack_require__(42);

	  options = options || {};

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~ ~this.highWaterMark;

	  // drain event flag.
	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null;

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;

	  // count buffered requests
	  this.bufferedRequestCount = 0;

	  // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two
	  this.corkedRequestsFree = new CorkedRequest(this);
	}

	WritableState.prototype.getBuffer = function getBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];
	  while (current) {
	    out.push(current);
	    current = current.next;
	  }
	  return out;
	};

	(function () {
	  try {
	    Object.defineProperty(WritableState.prototype, 'buffer', {
	      get: internalUtil.deprecate(function () {
	        return this.getBuffer();
	      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
	    });
	  } catch (_) {}
	})();

	// Test _writableState for inheritance to account for Duplex streams,
	// whose prototype chain only points to Readable.
	var realHasInstance;
	if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
	  realHasInstance = Function.prototype[Symbol.hasInstance];
	  Object.defineProperty(Writable, Symbol.hasInstance, {
	    value: function (object) {
	      if (realHasInstance.call(this, object)) return true;

	      return object && object._writableState instanceof WritableState;
	    }
	  });
	} else {
	  realHasInstance = function (object) {
	    return object instanceof this;
	  };
	}

	function Writable(options) {
	  Duplex = Duplex || __webpack_require__(42);

	  // Writable ctor is applied to Duplexes, too.
	  // `realHasInstance` is necessary because using plain `instanceof`
	  // would return false, as no `_writableState` property is attached.

	  // Trying to use the custom `instanceof` for Writable here will also break the
	  // Node.js LazyTransform implementation, which has a non-trivial getter for
	  // `_writableState` that would lead to infinite recursion.
	  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
	    return new Writable(options);
	  }

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;

	    if (typeof options.writev === 'function') this._writev = options.writev;
	  }

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  this.emit('error', new Error('Cannot pipe, not readable'));
	};

	function writeAfterEnd(stream, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  processNextTick(cb, er);
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  var er = false;
	  // Always throw error if a null is written
	  // if we are not in object mode then throw
	  // if it is not a buffer, string, or undefined.
	  if (chunk === null) {
	    er = new TypeError('May not write null values to stream');
	  } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  if (er) {
	    stream.emit('error', er);
	    processNextTick(cb, er);
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

	  if (typeof cb !== 'function') cb = nop;

	  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function () {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function () {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};

	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = bufferShim.from(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);

	  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret) state.needDrain = true;

	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }
	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;
	  if (sync) processNextTick(cb, er);else cb(er);

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state);

	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      /*<replacement>*/
	      asyncWrite(afterWrite, stream, state, finished, cb);
	      /*</replacement>*/
	    } else {
	        afterWrite(stream, state, finished, cb);
	      }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}

	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;

	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;

	    var count = 0;
	    while (entry) {
	      buffer[count] = entry;
	      entry = entry.next;
	      count += 1;
	    }

	    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

	    // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite
	    state.pendingcb++;
	    state.lastBufferedRequest = null;
	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        break;
	      }
	    }

	    if (entry === null) state.lastBufferedRequest = null;
	  }

	  state.bufferedRequestCount = 0;
	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new Error('_write() is not implemented'));
	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished) endWritable(this, state, cb);
	};

	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else {
	      prefinish(stream, state);
	    }
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
	  }
	  state.ended = true;
	  stream.writable = false;
	}

	// It seems a linked list but it is not
	// there will be only 2 of these for each stream
	function CorkedRequest(state) {
	  var _this = this;

	  this.next = null;
	  this.entry = null;

	  this.finish = function (err) {
	    var entry = _this.entry;
	    _this.entry = null;
	    while (entry) {
	      var cb = entry.callback;
	      state.pendingcb--;
	      cb(err);
	      entry = entry.next;
	    }
	    if (state.corkedRequestsFree) {
	      state.corkedRequestsFree.next = _this;
	    } else {
	      state.corkedRequestsFree = _this;
	    }
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(44).setImmediate))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// setimmediate attaches itself to the global object
	__webpack_require__(45);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();

	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();

	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();

	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();

	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ },
/* 46 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module exports.
	 */

	module.exports = deprecate;

	/**
	 * Mark that a method should not be used.
	 * Returns a modified function which warns once by default.
	 *
	 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
	 *
	 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
	 * will throw an Error when invoked.
	 *
	 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
	 * will invoke `console.trace()` instead of `console.error()`.
	 *
	 * @param {Function} fn - the function to deprecate
	 * @param {String} msg - the string to print to the console when `fn` is invoked
	 * @returns {Function} a new "deprecated" version of `fn`
	 * @api public
	 */

	function deprecate (fn, msg) {
	  if (config('noDeprecation')) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (config('throwDeprecation')) {
	        throw new Error(msg);
	      } else if (config('traceDeprecation')) {
	        console.trace(msg);
	      } else {
	        console.warn(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	}

	/**
	 * Checks `localStorage` for boolean values for the given `name`.
	 *
	 * @param {String} name
	 * @returns {Boolean}
	 * @api private
	 */

	function config (name) {
	  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
	  try {
	    if (!global.localStorage) return false;
	  } catch (_) {
	    return false;
	  }
	  var val = global.localStorage[name];
	  if (null == val) return false;
	  return String(val).toLowerCase() === 'true';
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(7).Buffer;

	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};


	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	'use strict';

	module.exports = Transform;

	var Duplex = __webpack_require__(42);

	/*<replacement>*/
	var util = __webpack_require__(39);
	util.inherits = __webpack_require__(34);
	/*</replacement>*/

	util.inherits(Transform, Duplex);

	function TransformState(stream) {
	  this.afterTransform = function (er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	  this.writeencoding = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (data !== null && data !== undefined) stream.push(data);

	  cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}

	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(this);

	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;

	    if (typeof options.flush === 'function') this._flush = options.flush;
	  }

	  // When the writable side finishes, then flush out anything remaining.
	  this.once('prefinish', function () {
	    if (typeof this._flush === 'function') this._flush(function (er, data) {
	      done(stream, er, data);
	    });else done(stream);
	  });
	}

	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function (chunk, encoding, cb) {
	  throw new Error('_transform() is not implemented');
	};

	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function (n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};

	function done(stream, er, data) {
	  if (er) return stream.emit('error', er);

	  if (data !== null && data !== undefined) stream.push(data);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

	  if (ts.transforming) throw new Error('Calling transform done when still transforming');

	  return stream.push(null);
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	'use strict';

	module.exports = PassThrough;

	var Transform = __webpack_require__(48);

	/*<replacement>*/
	var util = __webpack_require__(39);
	util.inherits = __webpack_require__(34);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(43)


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(42)


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(48)


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(49)


/***/ },
/* 54 */
/***/ function(module, exports) {

	exports['aes-128-ecb'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 0,
	  mode: 'ECB',
	  type: 'block'
	};
	exports['aes-192-ecb'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 0,
	  mode: 'ECB',
	  type: 'block'
	};
	exports['aes-256-ecb'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 0,
	  mode: 'ECB',
	  type: 'block'
	};
	exports['aes-128-cbc'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'CBC',
	  type: 'block'
	};
	exports['aes-192-cbc'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'CBC',
	  type: 'block'
	};
	exports['aes-256-cbc'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'CBC',
	  type: 'block'
	};
	exports['aes128'] = exports['aes-128-cbc'];
	exports['aes192'] = exports['aes-192-cbc'];
	exports['aes256'] = exports['aes-256-cbc'];
	exports['aes-128-cfb'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'CFB',
	  type: 'stream'
	};
	exports['aes-192-cfb'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'CFB',
	  type: 'stream'
	};
	exports['aes-256-cfb'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'CFB',
	  type: 'stream'
	};
	exports['aes-128-ofb'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'OFB',
	  type: 'stream'
	};
	exports['aes-192-ofb'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'OFB',
	  type: 'stream'
	};
	exports['aes-256-ofb'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'OFB',
	  type: 'stream'
	};
	exports['aes-128-ctr'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'CTR',
	  type: 'stream'
	};
	exports['aes-192-ctr'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'CTR',
	  type: 'stream'
	};
	exports['aes-256-ctr'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'CTR',
	  type: 'stream'
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = function (crypto, password, keyLen, ivLen) {
	  keyLen = keyLen/8;
	  ivLen = ivLen || 0;
	  var ki = 0;
	  var ii = 0;
	  var key = new Buffer(keyLen);
	  var iv = new Buffer(ivLen);
	  var addmd = 0;
	  var md, md_buf;
	  var i;
	  while (true) {
	    md = crypto.createHash('md5');
	    if(addmd++ > 0) {
	       md.update(md_buf);
	    }
	    md.update(password);
	    md_buf = md.digest();
	    i = 0;
	    if(keyLen > 0) {
	      while(true) {
	        if(keyLen === 0) {
	          break;
	        }
	        if(i === md_buf.length) {
	          break;
	        }
	        key[ki++] = md_buf[i];
	        keyLen--;
	        i++;
	       }
	    }
	    if(ivLen > 0 && i !== md_buf.length) {
	      while(true) {
	        if(ivLen === 0) {
	          break;
	        }
	        if(i === md_buf.length) {
	          break;
	        }
	       iv[ii++] = md_buf[i];
	       ivLen--;
	       i++;
	     }
	   }
	   if(keyLen === 0 && ivLen === 0) {
	      break;
	    }
	  }
	  for(i=0;i<md_buf.length;i++) {
	    md_buf[i] = 0;
	  }
	  return {
	    key: key,
	    iv: iv
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(30);
	var Transform = __webpack_require__(31);
	var inherits = __webpack_require__(34);

	inherits(StreamCipher, Transform);
	module.exports = StreamCipher;
	function StreamCipher(mode, key, iv, decrypt) {
	  if (!(this instanceof StreamCipher)) {
	    return new StreamCipher(mode, key, iv);
	  }
	  Transform.call(this);
	  this._cipher = new aes.AES(key);
	  this._prev = new Buffer(iv.length);
	  this._cache = new Buffer('');
	  this._secCache = new Buffer('');
	  this._decrypt = decrypt;
	  iv.copy(this._prev);
	  this._mode = mode;
	}
	StreamCipher.prototype._transform = function (chunk, _, next) {
	  next(null, this._mode.encrypt(this, chunk, this._decrypt));
	};
	StreamCipher.prototype._flush = function (next) {
	  this._cipher.scrub();
	  next();
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 57 */
/***/ function(module, exports) {

	exports.encrypt = function (self, block) {
	  return self._cipher.encryptBlock(block);
	};
	exports.decrypt = function (self, block) {
	  return self._cipher.decryptBlock(block);
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var xor = __webpack_require__(59);
	exports.encrypt = function (self, block) {
	  var data = xor(block, self._prev);
	  self._prev = self._cipher.encryptBlock(data);
	  return self._prev;
	};
	exports.decrypt = function (self, block) {
	  var pad = self._prev;
	  self._prev = block;
	  var out = self._cipher.decryptBlock(block);
	  return xor(out, pad);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = xor;
	function xor(a, b) {
	  var len = Math.min(a.length, b.length);
	  var out = new Buffer(len);
	  var i = -1;
	  while (++i < len) {
	    out.writeUInt8(a[i] ^ b[i], i);
	  }
	  return out;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(59);
	exports.encrypt = function (self, data, decrypt) {
	  var out = new Buffer('');
	  var len;
	  while (data.length) {
	    if (self._cache.length === 0) {
	      self._cache = self._cipher.encryptBlock(self._prev);
	      self._prev = new Buffer('');
	    }
	    if (self._cache.length <= data.length) {
	      len = self._cache.length;
	      out = Buffer.concat([out, encryptStart(self, data.slice(0, len), decrypt)]);
	      data = data.slice(len);
	    } else {
	      out = Buffer.concat([out, encryptStart(self, data, decrypt)]);
	      break;
	    }
	  }
	  return out;
	};
	function encryptStart(self, data, decrypt) {
	  var len = data.length;
	  var out = xor(data, self._cache);
	  self._cache = self._cache.slice(len);
	  self._prev = Buffer.concat([self._prev, decrypt?data:out]);
	  return out;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(59);
	function getBlock(self) {
	  self._prev = self._cipher.encryptBlock(self._prev);
	  return self._prev;
	}
	exports.encrypt = function (self, chunk) {
	  while (self._cache.length < chunk.length) {
	    self._cache = Buffer.concat([self._cache, getBlock(self)]);
	  }
	  var pad = self._cache.slice(0, chunk.length);
	  self._cache = self._cache.slice(chunk.length);
	  return xor(chunk, pad);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(59);
	function getBlock(self) {
	  var out = self._cipher.encryptBlock(self._prev);
	  incr32(self._prev);
	  return out;
	}
	exports.encrypt = function (self, chunk) {
	  while (self._cache.length < chunk.length) {
	    self._cache = Buffer.concat([self._cache, getBlock(self)]);
	  }
	  var pad = self._cache.slice(0, chunk.length);
	  self._cache = self._cache.slice(chunk.length);
	  return xor(chunk, pad);
	};
	function incr32(iv) {
	  var len = iv.length;
	  var item;
	  while (len--) {
	    item = iv.readUInt8(len);
	    if (item === 255) {
	      iv.writeUInt8(0, len);
	    } else {
	      item++;
	      iv.writeUInt8(item, len);
	      break;
	    }
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(30);
	var Transform = __webpack_require__(31);
	var inherits = __webpack_require__(34);
	var modes = __webpack_require__(54);
	var StreamCipher = __webpack_require__(56);
	var ebtk = __webpack_require__(55);

	inherits(Decipher, Transform);
	function Decipher(mode, key, iv) {
	  if (!(this instanceof Decipher)) {
	    return new Decipher(mode, key, iv);
	  }
	  Transform.call(this);
	  this._cache = new Splitter();
	  this._last = void 0;
	  this._cipher = new aes.AES(key);
	  this._prev = new Buffer(iv.length);
	  iv.copy(this._prev);
	  this._mode = mode;
	}
	Decipher.prototype._transform = function (data, _, next) {
	  this._cache.add(data);
	  var chunk;
	  var thing;
	  while ((chunk = this._cache.get())) {
	    thing = this._mode.decrypt(this, chunk);
	    this.push(thing);
	  }
	  next();
	};
	Decipher.prototype._flush = function (next) {
	  var chunk = this._cache.flush();
	  if (!chunk) {
	    return next;
	  }

	  this.push(unpad(this._mode.decrypt(this, chunk)));

	  next();
	};

	function Splitter() {
	   if (!(this instanceof Splitter)) {
	    return new Splitter();
	  }
	  this.cache = new Buffer('');
	}
	Splitter.prototype.add = function (data) {
	  this.cache = Buffer.concat([this.cache, data]);
	};

	Splitter.prototype.get = function () {
	  if (this.cache.length > 16) {
	    var out = this.cache.slice(0, 16);
	    this.cache = this.cache.slice(16);
	    return out;
	  }
	  return null;
	};
	Splitter.prototype.flush = function () {
	  if (this.cache.length) {
	    return this.cache;
	  }
	};
	function unpad(last) {
	  var padded = last[15];
	  if (padded === 16) {
	    return;
	  }
	  return last.slice(0, 16 - padded);
	}

	var modelist = {
	  ECB: __webpack_require__(57),
	  CBC: __webpack_require__(58),
	  CFB: __webpack_require__(60),
	  OFB: __webpack_require__(61),
	  CTR: __webpack_require__(62)
	};

	module.exports = function (crypto) {
	  function createDecipheriv(suite, password, iv) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    if (typeof iv === 'string') {
	      iv = new Buffer(iv);
	    }
	    if (typeof password === 'string') {
	      password = new Buffer(password);
	    }
	    if (password.length !== config.key/8) {
	      throw new TypeError('invalid key length ' + password.length);
	    }
	    if (iv.length !== config.iv) {
	      throw new TypeError('invalid iv length ' + iv.length);
	    }
	    if (config.type === 'stream') {
	      return new StreamCipher(modelist[config.mode], password, iv, true);
	    }
	    return new Decipher(modelist[config.mode], password, iv);
	  }

	  function createDecipher (suite, password) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    var keys = ebtk(crypto, password, config.key, config.iv);
	    return createDecipheriv(suite, keys.key, keys.iv);
	  }
	  return {
	    createDecipher: createDecipher,
	    createDecipheriv: createDecipheriv
	  };
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var jsvpx = __webpack_require__(65);

	var vpx_codec = __webpack_require__(96);
	var vpx_codec_ctx_t = vpx_codec.vpx_codec_ctx_t;


	/**
	 * Javascript style interface
	 */

	class JsVpx {

	    constructor() {

	        this.iface = jsvpx.ifaces[0].iface; // get jsvp8 decoder
	        var cfg = null;
	        var flags = null;
	        this.decoder = new vpx_codec_ctx_t();

	        jsvpx.vpx_codec_dec_init(this.decoder, this.iface, cfg, flags);//ctx, iface, cfg, flags

	    }

	    decode(buf) {
	        var data = new Uint8Array(buf);
	        var iter = null; //vpx_codec_iter_t

	        var user_priv;
	        var deadline;

	        jsvpx.vpx_codec_decode(this.decoder, data, data.length, user_priv, deadline);

	        var img = jsvpx.vpx_codec_get_frame(this.decoder, iter);

	        if (img) {
	            return img;
	        }

	    }

	}

	if(window){
	    window.JsVpx = JsVpx;
	}
	module.exports = JsVpx;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 
	 * This file provides our highest level interface into the decoders
	 */

	//possibly move interfaces to vp8dx
	var ifaces = [
	    {
	        name: "jsvp8",
	        iface : __webpack_require__(66)
	    }
	];

	var VPX_CODEC_ABI_VERSION = 1;//temp
	var VPX_DECODER_ABI_VERSION = VPX_CODEC_ABI_VERSION + 3;


	function get_alg_priv(ctx) {
	  return ctx.priv;
	}


	function vpx_codec_dec_init(ctx, iface, cfg, flags){
	    
	    return vpx_codec_dec_init_ver(ctx, iface, cfg, flags , VPX_DECODER_ABI_VERSION);
	    
	}

	/**
	 * 
	 * @param {type} ctx
	 * @param {vpx_codec_iface_t} iface vpx_codec_vp8_dx_algo
	 * @param {type} cfg
	 * @param {type} flags
	 * @param {type} ver
	 * @returns {undefined}
	 */
	function vpx_codec_dec_init_ver(ctx, iface, cfg, flags, ver){
	    
	    //iface.init()
	    //console.log("Initializing decoder");
	    //clear the ctx
	    ctx.iface = iface;
	    ctx.name = iface.name;
	    ctx.priv = null;
	    ctx.init_flags = flags;
	    ctx.config.dec = cfg;
	    
	    
	    ctx.iface.init(ctx, null);
	}


	function vpx_codec_peek_stream_info(){
	    
	}

	function vpx_codec_get_stream_info(){
	    
	}

	//line 104
	function vpx_codec_decode(ctx, data, data_sz, user_priv, deadline) {
	    var res = 0;

	    //if (!ctx || (!data && data_sz) || (data && !data_sz))
	    //   res = VPX_CODEC_INVALID_PARAM;
	    //else if (!ctx.iface || !ctx.priv)
	    //  res = VPX_CODEC_ERROR;
	    //else {
	    //get_alg_priv(ctx)
	    res = ctx.iface.dec.decode(get_alg_priv(ctx), data, data_sz, user_priv,
	            deadline);
	    //console.log("NOW DECODING");
	    //}

	//return SAVE_STATUS(ctx, res);
	}

	function vpx_codec_get_frame(ctx, iter){
	    var img;
	    
	    img = ctx.iface.dec.get_frame(ctx, iter);
	    
	    return img;
	}

	function vpx_codec_put_frame_cb_fn_t(){
	    
	}

	function vpx_codec_register_put_frame_cb(){
	    
	}

	function vpx_codec_register_put_slice_cb(){
	    
	}

	module.exports = {
	    ifaces : ifaces,
	    vpx_codec_dec_init : vpx_codec_dec_init,
	    vpx_codec_dec_init_ver : vpx_codec_dec_init_ver,
	    vpx_codec_peek_stream_info : vpx_codec_peek_stream_info,
	    vpx_codec_get_stream_info : vpx_codec_get_stream_info,
	    vpx_codec_decode : vpx_codec_decode,
	    vpx_codec_get_frame : vpx_codec_get_frame,
	    vpx_codec_put_frame_cb_fn_t : vpx_codec_put_frame_cb_fn_t,
	    vpx_codec_register_put_frame_cb : vpx_codec_register_put_frame_cb,
	    vpx_codec_register_put_slice_cb : vpx_codec_register_put_slice_cb
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var VP8D_COMP = __webpack_require__(67);
	var onyxd_if = __webpack_require__(74);
	var vp8dx_receive_compressed_data = onyxd_if.vp8dx_receive_compressed_data;


	class vpx_codec_alg_priv{
	    
	    constructor(){
	        
	        this.base; //vpx_codec_priv_t
	        this.cfg;
	        this.si; //vp8_stream_info_t
	        this.decoder_init;
	        this.postproc_cfg_set;
	        this.postproc_cfg;
	        
	        this.decrypt_cb;
	        this.decrypt_state;
	        this.img;
	        this.img_setup;
	        this.yv12_frame_buffers; //frame_buffers
	        this.user_priv;
	        this.fragments; //FRAGMENT_DATA
	        this.temp_pbi = null;
	        
	    }
	    
	}

	function vp8_peek_si(){
	    
	}

	function vp8_get_si(){
	    
	}

	function vp8_decode(ctx, data, data_sz , user_priv , deadline){
	    var res = 0; //VPX_CODEC_OK
	    var resolution_change = 0;
	    var w, h;
	    //console.warn("decoding!");
	    /*
	     *  if (!ctx->fragments.enabled && (data == NULL && data_sz == 0)) {
	    return 0;
	  }
	     */
	    
	    //if (update_fragments(ctx, data, data_sz, &res) <= 0) return res;
	    
	    //w = ctx.si.w;
	    //h = ctx.si.h;
	    
	    //res = vp8_peek_si_internal(ctx->fragments.ptrs[0], ctx->fragments.sizes[0],
	                      //       &ctx->si, ctx->decrypt_cb, ctx->decrypt_state);
	                      
	    //  if ((ctx->si.h != h) || (ctx->si.w != w)) resolution_change = 1;
	    
	    if (!res && !ctx.decoder_init) {
	        
	    }
	    
	    //line 399
	    if (!ctx.temp_pbi) {
	        
	        var pbi = new VP8D_COMP();//this goes in frame buffers
	        ctx.temp_pbi = pbi;
	    }
	    
	    vp8dx_receive_compressed_data(ctx.temp_pbi, data_sz, data, deadline);
	    
	    return res;
	    
	}

	function vp8_get_frame(decoder, iter) {
	    if (decoder.priv.temp_pbi.common.show_frame) {
	        return  decoder.priv.temp_pbi.ref_frames[0].img;
	    }
	    return null;
	}

	function vp8_init_ctx(ctx) {
	    var priv = new vpx_codec_alg_priv();
	    ctx.priv = priv;
	    ctx.priv.init_flags = ctx.init_flags;
	    //priv.si.sz = size of (priv.si)
	    ctx.priv.decrypt_cb = null;
	    ctx.priv.decrypt_state = null;

	    if (ctx.config.dec) {
	        // Update the reference to the config structure to an internal copy.
	        priv.cfg = ctx.config.dec;
	        ctx.config.dec = priv.cfg;
	    }

	    return 0;
	}

	function vp8_init(ctx, data) {

	    var res; // = VPX_CODEC_OK;
	    var priv = null;


	    //vp8_rtcd();
	    // vpx_dsp_rtcd();
	    //vpx_scale_rtcd();

	    if (!ctx.priv) {
	        vp8_init_ctx(ctx);
	        priv = ctx.priv;

	        //priv.fragments.count = 0;

	        //priv->fragments.enabled =
	        //(priv->base.init_flags & VPX_CODEC_USE_INPUT_FRAGMENTS);
	    } else {
	        priv = ctx.priv;
	    }

	}

	//vpx_codec_iface vpx_codec_internal.h

	var vpx_codec_vp8_js = {
	    name: "jscodec VP8 Decoder",
	    abi_version : 0,
	    caps : null,
	    destroy : null,
	    dec: {
	        peek_si: vp8_peek_si,
	        get_si: vp8_get_si,
	        decode: vp8_decode,
	        get_frame: vp8_get_frame
	    },
	    init : vp8_init
	};//CODEC_INTERFACE

	module.exports = vpx_codec_vp8_js;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var VP8_COMMON = __webpack_require__(68);

	var dboolhuff = __webpack_require__(69);
	var BoolDecoder = dboolhuff.BOOL_DECODER;


	var blockd = __webpack_require__(71);
	var MACROBLOCKD = blockd.MACROBLOCKD;
	var FRAGMENT_DATA = blockd.FRAGMENT_DATA;
	var mb_info = blockd.MODE_INFO;

	var vpx_image = __webpack_require__(73);
	var vpx_image_t = vpx_image.vpx_image_t;


	var CURRENT_FRAME = 0;
	var LAST_FRAME = 1;
	var GOLDEN_FRAME = 2;
	var ALTREF_FRAME = 3;
	var NUM_REF_FRAMES = 4;

	var MAX_PARTITIONS = 8;
	var MAX_MB_SEGMENTS = 4;




	var MAX_FB_MT_DEC = 32;

	Uint8Array.prototype.ptr = 0;

	class frame_buffers {
	    /*
	     * this struct will be populated with frame buffer management
	     * info in future commits. */

	    // decoder instances 
	    constructor() {
	        this.pbi = new Array(MAX_FB_MT_DEC);//VP8D_COMP
	    }

	}
	;


	var ref_cnt_img = function () {
	    this.img = new vpx_image_t();
	    this.ref_cnt = 0;
	};



	//possibly line 65 vp8common
	class dequant_factors {
	    constructor() {
	        this.quant_idx = 0;
	        this.factor = [
	            new Int16Array([0, 0]), //Y1
	            new Int16Array([0, 0]), // UV
	            new Int16Array([0, 0]) //Y2
	        ];

	    }
	}



	class token_decoder {

	    constructor() {
	        this.bool = new BoolDecoder();
	        this.left_token_entropy_ctx = new Int32Array(9);
	        this.coeffs = null;
	    }

	}




	//VP8D_COMP
	class VP8D_COMP {

	    constructor() {

	        this.frame_cnt = 0;

	        this.cpuTime = 0;

	        this.saved_entropy_valid = 0;

	        this.mb_info_rows_storage = null; //**
	        this.mb_info_rows_storage_off = 0;
	        this.mb_info_rows_storage_object = (mb_info); //new 
	        this.mb_info_rows = null; //mb_info**
	        this.mb_info_rows_off = 0;
	        this.above_token_entropy_ctx = null;
	        //this.above_token_entropy_ctx_object = (token_entropy_ctx_t); //*

	        this.common = new VP8_COMMON();
	        this.boolDecoder = new BoolDecoder();
	        this.segment_hdr = new MACROBLOCKD(this);
	        this.token_hdr = new FRAGMENT_DATA(this);



	        this.tokens = new Array(MAX_PARTITIONS);
	        for (var i = 0; i < MAX_PARTITIONS; i ++)
	            this.tokens[i] = new token_decoder();



	        this.frame_strg = [
	            {
	                img: new vpx_image_t(),
	                ref_cnt: 0
	            },
	            {
	                img: new vpx_image_t(),
	                ref_cnt: 0
	            },
	            {
	                img: new vpx_image_t(),
	                ref_cnt: 0
	            },
	            {
	                img: new vpx_image_t(),
	                ref_cnt: 0
	            }
	        ];


	        this.ref_frames = new Array(NUM_REF_FRAMES);
	        for (var i = 0; i < NUM_REF_FRAMES; i ++)
	            this.ref_frames[i] = new ref_cnt_img();

	        this.dequant_factors = new Array(MAX_MB_SEGMENTS);
	        for (var i = 0; i < MAX_MB_SEGMENTS; i ++)
	            this.dequant_factors[i] = new dequant_factors();


	 


	        this.ref_frame_offsets = new Uint32Array([0, 0, 0, 0]);
	        this.ref_frame = null;
	        this.ref_frame_offsets_ = [0, 0, 0, 0];
	        this.subpixel_filters = null;

	        this.img_avail;
	        this.img;

	    }

	 

	    /**
	     * vp8_alloc_frame_buffers
	     * vp8_dixie_modemv_init
	     * @returns {undefined}
	     */
	    modemv_init() {
	        var mbi_w = 0;
	        var mbi_h = 0;
	        var i = 0;
	        var mbi = mbi_cache;
	        

	        mbi_w = this.mb_cols + 1; /* For left border col */
	        mbi_h = this.mb_rows + 1; /* For above border row */
	        
	        this.common.mode_info_stride = this.mb_cols + 1;

	        if (this.common.frame_size_updated === 1) {
	            this.mb_info_storage = null;
	            this.mb_info_rows_storage = null;
	        }

	        if (this.mb_info_storage === null) {
	            var length = mbi_w * mbi_h;
	            this.mb_info_storage = new Array(length);


	            for (var i = 0; i < length; i ++)
	                this.mb_info_storage[i] = new mb_info();

	            this.mb_info_storage_off = 0;
	            
	            this.mb_info_rows_storage_off = new Uint32Array(mbi_h);
	        }

	        var ptr = 1;

	        for (i = 0; i < mbi_h; i++) {
	            this.mb_info_rows_storage_off[i] = ptr;
	            ptr = (ptr + mbi_w) | 0;
	        }


	        this.mb_info_rows = this.mb_info_storage;
	        this.mb_info_rows_off = this.mb_info_rows_storage_off;
	    }


	}

	var mbi_cache = new mb_info();

	module.exports = VP8D_COMP;

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	var MV_PROB_CNT =19;

	class FRAME_CONTEXT {
	    //FRAME_CONTEXT
	    constructor(decoder) {
	        this.decoder = decoder;
	        //coeff_probs [BLOCK_TYPES][COEFF_BANDS]
	        //[PREV_COEFF_CONTEXTS][ENTROPY_NODES]
	        //Coeff probs gets treated as a pointer later so cant use multi array anyway
	        this.coeff_probs = new Uint8Array(1056);
	        this.coeff_probs.data_32 = new Uint32Array(this.coeff_probs.buffer);
	        this.coeff_probs.data_64 = new Float64Array(this.coeff_probs.buffer);

	        //MV_CONTEXT
	        this.mv_probs = [
	            new Uint8Array(MV_PROB_CNT), //mv_component_probs_t
	            new Uint8Array(MV_PROB_CNT) //mv_component_probs_t
	        ];
	        this.coeff_skip_enabled = 0;
	        this.coeff_skip_prob = 0;
	        this.y_mode_probs = new Uint8Array(4);
	        this.y_mode_probs_32 = new Uint32Array(this.y_mode_probs.buffer);
	        this.uv_mode_probs = new Uint8Array(3);
	        this.prob_inter = 0;
	        this.prob_last = 0;
	        this.prob_gf = 0;
	        
	    }
	 
	}
	var RECON_CLAMP_NOTREQUIRED = 0;
	var RECON_CLAMP_REQUIRED = 1

	var NORMAL_LOOPFILTER = 0;
	var SIMPLE_LOOPFILTER = 1;

	var NUM_YV12_BUFFERS = 4;


	/**
	 * @classdesc VP8Common
	 * merge all other headers here
	 * alias VP8_COMMON
	 * vpx_codec_ctx_t
	 * file onyxc_int.h
	 * @property {number} is_keyframe is it a keyframe
	 * @property {number} show_frame should the frame be shown
	 * @property {number} part0_sz the partition size of 0
	 * @property {number} frame_size_updated indicates if need a resolution update
	 */
	class VP8_COMMON {
	    

	    constructor() {
	        
	        this.error;
	        
	        this.Width = 0;
	        this.Height = 0;
	        this.horiz_scale = 0;
	        this.vert_scale = 0;
	        
	        this.frame_to_show;
	        this.yv12_fb = new Array(NUM_YV12_BUFFERS);
	        this.fb_idx_ref_cnt = [0 ,0 ,0 ,0];
	        
	        this.clamp_type = RECON_CLAMP_NOTREQUIRED;
	        
	        this.entropy_hdr = new FRAME_CONTEXT();
	        this.saved_entropy = new FRAME_CONTEXT();
	        
	        
	        this.is_keyframe = 0;
	        this.is_experimental = 0;
	        
	        this.show_frame = 0;

	        
	        
	        this.frame_size_updated = 0;
	        
	        this.mode_info_stride = 0;
	        
	        //line 108
	        this.base_qindex = 0; 
	        
	        this.delta_update = 0; 
	        
	        
	        this.y1dc_delta_q = 0; 
	        this.y2dc_delta_q = 0; 
	        this.y2ac_delta_q = 0; 
	        this.uvdc_delta_q = 0; 
	        this.uvac_delta_q = 0; 
	        
	        this.mip; // MODE_INFO
	        this.mi; //MODE_INFO
	        this.prev_mip; 
	        this.prev_mi;
	        
	        this.show_frame_mi;
	        
	        //Filter information
	        this.filter_type = NORMAL_LOOPFILTER;
	        
	        
	        
	        this.lf_info = null;
	        
	        this.level = 0;
	        this.sharpness = 0;
	        this.last_sharpness_level = 0;
	        
	        this.delta_enabled = 0;
	        this.ref_delta = new Int32Array(4);
	        this.mode_delta = new Int32Array(4);
	        
	        //reference information
	        this.refresh_last = 0;
	        this.refresh_gf = 0;
	        this.refresh_arf = 0;

	        this.copy_gf = 0; 
	        this.copy_arf = 0;
	        
	        this.refresh_entropy_probs = 0; 
	        
	        this.sign_bias = new Int32Array(4);
	        
	    
	        this.current_video_frame = 0;
	        
	        this.version = 0;
	    }

	}//vpx_codec_ctx_t


	module.exports = VP8_COMMON;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bitreader = __webpack_require__(70);
	var vpx_read = bitreader.vpx_read;
	var vpx_read_bit = bitreader.vpx_read_bit;

	class BOOL_DECODER {
	    
	    constructor() {
	        this.range = 0;
	        this.value = 0;
	        this.input = 0;
	        this.ptr = 0; //dont need
	        this.input_len = 0;
	        this.bit_count = 0;
	        this.buffer_end;
	        this.decrypt_cb;
	        this.decrypt_state;
	        this.clear_buffer;
	    }
	    
	    get_uint(bits){
	        return bool_get_uint(this, bits);
	    }
	    
	    get_int(bits){
	        return bool_get_int(this, bits);
	    }
	    
	    maybe_get_int(bits){
	        return bool_maybe_get_int(this, bits);
	    }
	    
	}
	    
	function vp8dx_start_decode(bool, start_partition, ptr, sz) {

	    if (sz >= 2) {
	        bool.value = (start_partition[ptr] << 8) | start_partition[ptr + 1];
	        bool.input = start_partition;
	        bool.ptr = (ptr + 2) | 0;
	        bool.input_len = (sz - 2) | 0;
	    } else {
	        bool.value = 0;
	        bool.input = null;
	        bool.input_len = 0;
	    }

	    bool.range = 255;
	    bool.bit_count = 0;
	}

	function get_uint(bool, bits) {
	    var z = 0;
	    var bit = 0;

	    for (bit = bits - 1; bit >= 0; bit--) {
	        z |= (vpx_read_bit(bool) << bit);
	    }

	    return z;
	}
	var bool_get_uint = get_uint;
	    
	/*
	 * bool_get_int
	 * vp8_decode_value
	 * @param {type} bits
	 * @returns {BoolDecoder.get_int.z|Number}
	 */
	function bool_get_int(bool, bits) {
	    var z = 0;
	    var bit = 0;

	    for (bit = bits - 1; bit >= 0; bit--)
	    {
	        z |= (vpx_read_bit(bool) << bit);
	    }

	    return vpx_read_bit(bool) ? -z : z;
	}

	function maybe_get_int(bool, bits) {

	    return vpx_read_bit(bool) ? bool.get_int(bits) : 0;
	}

	var bool_maybe_get_int = maybe_get_int;

	module.exports = {};
	module.exports.vp8dx_start_decode = vp8dx_start_decode;
	module.exports.bool_get_int = bool_get_int;
	//module.exports.maybe_get_int = maybe_get_int;

	module.exports.BOOL_DECODER = BOOL_DECODER;



/***/ },
/* 70 */
/***/ function(module, exports) {

	'use strict';


	/**
	 * vp8dx_decode_bool
	 * bool_get
	 * @param {type} prob
	 * @returns {Number}
	 * vpx_read(vpx_reader *r, int prob) 
	 */
	function vpx_read(r, prob) {
	    
	    var split = 1 + (((r.range - 1) * prob) >> 8);
	    var SPLIT = split << 8;
	    var retval = 0;

	    if (r.value >= SPLIT) {
	        retval = 1;
	        r.range -= split;
	        r.value -= SPLIT;
	    } else {
	        retval = 0;
	        r.range = split;
	    }

	    while (r.range < 128) {
	        r.value <<= 1;
	        r.range <<= 1;
	        if (++r.bit_count === 8) {
	            r.bit_count = 0;
	            if (r.input_len) {
	                r.value |= r.input[r.ptr++];
	                r.input_len--;
	            }
	        }
	    }
	    return retval;
	}


	function vpx_read_bit(r) {

	    return vpx_read(r, 128); 

	}

	function vpx_read_literal(r, bits) {
	    var z = 0;
	    var bit = 0;

	    for (bit = bits - 1; bit >= 0; bit--) {
	        z |= (vpx_read_bit(r) << bit);
	    }

	    return z;
	}
	    
	module.exports = {};
	module.exports.vpx_read_bit = vpx_read_bit;
	module.exports.vpx_read = vpx_read;
	module.exports.vpx_read_literal = vpx_read_literal;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var MotionVector = __webpack_require__(72);

	//left_context_index
	var vp8_block2left =
	        new Uint8Array([
	            0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3,
	            4, 4, 5, 5, 6, 6, 7, 7, 8
	        ]);

	//above_context_index
	var vp8_block2above =
	        new Uint8Array([
	            0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3,
	            4, 5, 4, 5, 6, 7, 6, 7, 8
	        ]);
	        
	        


	var MAX_PARTITIONS = 8;

	//FRAGMENT_DATA 
	//supposed to go in VP8D_COMP
	class FRAGMENT_DATA {
	    
	    constructor(decoder) {
	        this.decoder = decoder;
	        this.partitions = 0;
	        this.partition_sz = new Int32Array(MAX_PARTITIONS);

	    }
	    
	}



	       
	/*
	 * likely MB_MODE_INFO
	 */
	class MODE_INFO {
	    //MB_MODE_INFO
	    constructor() {
	        //mv_mbmi_info
	        
	        this.mbmi = {
	            y_mode: 0, 
	            uv_mode: 0, 
	            ref_frame: 0,
	            is_4x4: 0,
	            mv: MotionVector.create(),
	            partitioning: 0, 
	            mb_skip_coeff: 0, 
	            need_mc_border: 0,
	            segment_id: 0,
	            eob_mask: 0
	        };
	        
	        this.bmi = null;


	    }

	    init_split_mode() {
	        var mvs = new Array(16);
	        var i = 16;
	        while (i--)
	            mvs[i] = MotionVector.create();

	        //Only needed for spit mode, maybe can skip initialization unless splitt mode is on
	        this.bmi =
	                {
	                    mvs: mvs,
	                    modes: new Uint8Array(16)//16,'todo:enum prediction_mode')
	                };
	    }
	}

	/*
	 */
	class MACROBLOCKD {

	    constructor(decoder) {
	        this.decoder = decoder;
	        this.enabled = 0;
	        this.update_data = 0;
	        this.update_map = 0;
	        this.abs = 0;
	        this.tree_probs = new Uint32Array(3);
	        this.lf_level = new Int32Array(4);
	        this.lf_level_64 = new Float64Array(this.lf_level.buffer);
	        this.quant_idx = new Int32Array(4);
	        this.quant_idx_64 = new Float64Array(this.quant_idx.buffer);


	    }
	}





	module.exports = {};

	module.exports.vp8_block2left = vp8_block2left;
	module.exports.vp8_block2above = vp8_block2above;
	module.exports.MACROBLOCKD = MACROBLOCKD;
	module.exports.FRAGMENT_DATA = FRAGMENT_DATA;
	module.exports.MODE_INFO = MODE_INFO;

/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";

	class MotionVector {

	    constructor() {
	        this.as_row_col = new Int16Array(2);
	        this.as_int = new Uint32Array(this.as_row_col.buffer);
	    }
	    
	    static create(){
	        var as_row_col = new Int16Array(2);
	        var as_int = new Uint32Array(as_row_col.buffer);
	        return {
	            'as_row_col' : as_row_col,
	            'as_int' : as_int
	        };
	    }
	}

	module.exports = MotionVector;

/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';


	var VPX_IMG_FMT_PLANAR = 0x100;
	var VPX_IMG_FMT_UV_FLIP = 0x200;
	var VPX_IMG_FMT_HAS_ALPHA = 0x400;

	//Image format codes
	var VPX_IMG_FMT_NONE = 0;
	var VPX_IMG_FMT_RGB24 = 1;
	var VPX_IMG_FMT_RGB32 = 2;
	var VPX_IMG_FMT_RGB565 = 3;
	var VPX_IMG_FMT_RGB555 = 4;
	var VPX_IMG_FMT_UYVY = 5;
	var VPX_IMG_FMT_YUY2 = 6;
	var VPX_IMG_FMT_YVYU = 7;
	var VPX_IMG_FMT_BGR24 = 8;
	var VPX_IMG_FMT_RGB32_LE = 9;
	var VPX_IMG_FMT_ARGB = 10;
	var VPX_IMG_FMT_ARGB_LE = 11;
	var VPX_IMG_FMT_RGB565_LE = 12;
	var VPX_IMG_FMT_RGB555_LE = 13;
	var VPX_IMG_FMT_YV12 = VPX_IMG_FMT_PLANAR | VPX_IMG_FMT_UV_FLIP | 1;
	var VPX_IMG_FMT_I420 = VPX_IMG_FMT_PLANAR | 2;
	var VPX_IMG_FMT_VPXYV12 = VPX_IMG_FMT_PLANAR | VPX_IMG_FMT_UV_FLIP | 3;
	var VPX_IMG_FMT_VPXI420 = VPX_IMG_FMT_PLANAR | 4;

	var VPX_PLANE_PACKED = 0;   /**< To be used for all packed formats */
	var VPX_PLANE_Y = 0;   /**< Y (Luminance) plane */
	var VPX_PLANE_U = 1;   /**< U (Chroma) plane */
	var VPX_PLANE_V = 2;   /**< V (Chroma) plane */
	var VPX_PLANE_ALPHA = 3;   /**< A (Transparency) plane */
	var PLANE_PACKED = VPX_PLANE_PACKED;
	var PLANE_Y = VPX_PLANE_Y;
	var PLANE_U = VPX_PLANE_U;
	var PLANE_V = VPX_PLANE_V;
	var PLANE_ALPHA = VPX_PLANE_ALPHA;


	Uint8ClampedArray.prototype.data_32 = null;
	Uint8Array.prototype.data_32 = null;
	/**
	 * typedef struct vpx_image
	 * vpx_image_t is alias for vpx_image
	 */
	class vpx_image_t {

	    constructor() {
	        this.fmt = 0; //can probably be uint

	        /* Image storage dimensions */
	        this.w = 0; // uint  struct0
	        this.h = 0; // uint  struct1

	        /* Image display dimensions */
	        this.d_w = 0; //uint struct2
	        this.d_h = 0; //uint struct3

	        /* Chroma subsampling info */
	        this.x_chroma_shift = 0; //uint
	        this.y_chroma_shift = 0; // uint

	        //this.planes = [0,0,0,0];//yuva
	        this.planes_off = new Int32Array(4); // yuva
	        this.stride = new Int32Array(4);

	        this.bps = 0; // int
	        this.user_priv = 0; 

	        this.img_data = null;
	        this.img_data_off = 0; //uint
	        this.img_data_owner = 0; //int
	        this.self_allocd = 0; //int
	           
	    }
	}


	function vpx_img_set_rect(img, x, y, w, h) {
	        var data = 0;
	        var data_off = 0;

	        if (x + w <= img.w && y + h <= img.h) {
	            img.d_w = w;
	            img.d_h = h;

	            /* Calculate plane pointers */
	            if ((img.fmt & VPX_IMG_FMT_PLANAR) === 0) {
	                img.img_data_off + (x * img.bps >> 3 + y * img.stride[VPX_PLANE_PACKED]) | 0;
	            } else {
	                data = img.img_data;
	                data_off = img.img_data_off;

	                if (img.fmt & VPX_IMG_FMT_HAS_ALPHA) {
	                    img.planes_off[VPX_PLANE_ALPHA] =
	                            data_off + x + y * img.stride[VPX_PLANE_ALPHA];
	                    data_off += img.h * img.stride[VPX_PLANE_ALPHA];
	                }


	                img.planes_off[VPX_PLANE_Y] = data_off + x + y * img.stride[VPX_PLANE_Y];
	                data_off += img.h * img.stride[VPX_PLANE_Y];

	                if (!(img.fmt & VPX_IMG_FMT_UV_FLIP)) {
	                    img.planes_off[VPX_PLANE_U] = data_off
	                            + (x >> img.x_chroma_shift)
	                            + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_U];
	                    data_off += (img.h >> img.y_chroma_shift) * img.stride[VPX_PLANE_U];
	                    img.planes_off[VPX_PLANE_V] = data_off
	                            + (x >> img.x_chroma_shift)
	                            + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_V];
	                } else {
	                    img.planes_off[VPX_PLANE_V] = data_off
	                            + (x >> img.x_chroma_shift)
	                            + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_V];
	                    data_off += (img.h >> img.y_chroma_shift) * img.stride[VPX_PLANE_V];
	                    img.planes_off[VPX_PLANE_U] = data_off
	                            + (x >> img.x_chroma_shift)
	                            + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_U];
	                }
	            }

	            return 0;
	        }

	        return -1;
	    }


	function img_alloc_helper(img, fmt, d_w, d_h, stride_align, img_data) {
	    var h = 0;
	    var w = 0;
	    var s = 0;
	    var xcs = 0;
	    var ycs = 0;
	    var bps = 0;
	    var align = 0;

	    /* Treat align==0 like align==1 */
	    if (!stride_align)
	        stride_align = 1;

	    /* Validate alignment (must be power of 2) */
	    if (stride_align & (stride_align - 1))
	        console.warn('Invalid stride align');

	    /* Get sample size for img format */
	    switch (fmt) {
	        case VPX_IMG_FMT_RGB32:
	        case VPX_IMG_FMT_RGB32_LE:
	        case VPX_IMG_FMT_ARGB:
	        case VPX_IMG_FMT_ARGB_LE:
	            bps = 32;
	            break;
	        case VPX_IMG_FMT_RGB24:
	        case VPX_IMG_FMT_BGR24:
	            bps = 24;
	            break;
	        case VPX_IMG_FMT_RGB565:
	        case VPX_IMG_FMT_RGB565_LE:
	        case VPX_IMG_FMT_RGB555:
	        case VPX_IMG_FMT_RGB555_LE:
	        case VPX_IMG_FMT_UYVY:
	        case VPX_IMG_FMT_YUY2:
	        case VPX_IMG_FMT_YVYU:
	            bps = 16;
	            break;
	        case VPX_IMG_FMT_I420:
	        case VPX_IMG_FMT_YV12:
	        case VPX_IMG_FMT_VPXI420:
	        case VPX_IMG_FMT_VPXYV12:
	            bps = 12;
	            break;
	        default:
	            bps = 16;
	            break;
	    }

	    /* Get chroma shift values for img format */
	    switch (fmt) {
	        case VPX_IMG_FMT_I420:
	        case VPX_IMG_FMT_YV12:
	        case VPX_IMG_FMT_VPXI420:
	        case VPX_IMG_FMT_VPXYV12:
	            xcs = 1;
	            break;
	        default:
	            xcs = 0;
	            break;
	    }

	    switch (fmt) {
	        case VPX_IMG_FMT_I420:
	        case VPX_IMG_FMT_YV12:
	        case VPX_IMG_FMT_VPXI420:
	        case VPX_IMG_FMT_VPXYV12:
	            ycs = 1;
	            break;
	        default:
	            ycs = 0;
	            break;
	    }

	    /* Calculate storage sizes given the chroma subsampling */
	    align = ((1 << xcs) - 1) | 0;
	    w = ((d_w + align) & ~align) | 0;
	    align = ((1 << ycs) - 1) | 0;
	    h = ((d_h + align) & ~align) | 0;
	    s = ((fmt & VPX_IMG_FMT_PLANAR) ? w : bps * w >> 3) | 0;
	    s = ((s + stride_align - 1) & ~(stride_align - 1)) | 0;

	    /* Allocate the new image */

	    //todo: reset


	    img.img_data = img_data;

	    if (img_data === null) {

	    } else {
	        var size = 0;
	        if ((fmt & VPX_IMG_FMT_PLANAR) === 0) {
	            size = h * s;
	        } else {

	            size = (h * w * bps) >> 3;
	        }
	        //img.img_data = new Uint8ClampedArray(size);
	        img.img_data = new Uint8Array(size);
	        img.img_data.data_32 = new Uint32Array(img.img_data.buffer);
	        img.img_data_owner = 1;
	    }


	    img.fmt = fmt;
	    img.w = w;
	    img.h = h;
	    img.x_chroma_shift = xcs;
	    img.y_chroma_shift = ycs;
	    img.bps = bps;

	    /* Calculate strides */
	    img.stride[VPX_PLANE_Y] = img.stride[VPX_PLANE_ALPHA] = s;
	    img.stride[VPX_PLANE_U] = img.stride[VPX_PLANE_V] = s >> xcs;

	    /* Default viewport to entire image */
	    if (vpx_img_set_rect(img, 0, 0, d_w, d_h) === 0)
	        return img;

	}


	module.exports = {};
	module.exports.vpx_img_set_rect = vpx_img_set_rect;
	module.exports.img_alloc_helper = img_alloc_helper;
	module.exports.vpx_image_t = vpx_image_t;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var decodeframe = __webpack_require__(75);
	var vp8_decode_frame = decodeframe.vp8_decode_frame;

	var CURRENT_FRAME = 0;
	var LAST_FRAME = 1;
	var GOLDEN_FRAME = 2;
	var ALTREF_FRAME = 3;
	var NUM_REF_FRAMES = 4;

	function vp8_dixie_release_ref_frame(rcimg) {
	    
	    if (rcimg) {
	        if (rcimg.ref_cnt === 0)
	            throw "ERROR :(";
	        rcimg.ref_cnt--;
	    }
	    
	}

	function vp8_dixie_ref_frame(rcimg) {
	    
	    rcimg.ref_cnt++;
	    return rcimg;
	    
	}

	function vp8dx_receive_compressed_data(pbi, size, source, time_stamp){
	    
	    var retcode = 0;
	    //console.log("Compressed data called");
	    retcode = vp8_decode_frame(source , pbi);
	    
	    swap_frame_buffers(pbi);
	    
	}


	//vp8_dixie_release_ref_frame
	//vp8_dixie_ref_frame
	function ref_cnt_fb(buf, idx, new_idx) {
	    if (buf[idx] > 0)
	        buf[idx]--;

	    idx = new_idx;

	    buf[new_idx]++;
	}

	function swap_frame_buffers(cm){
	    var err = 0;
	    
	    
	    
	    /* Handle reference frame updates */
	    if (cm.common.copy_arf === 1) {
	        
	        vp8_dixie_release_ref_frame(cm.ref_frames[ALTREF_FRAME]);
	        cm.ref_frames[ALTREF_FRAME] =
	                vp8_dixie_ref_frame(cm.ref_frames[LAST_FRAME]);
	        
	        
	        //ref_cnt_fb( ALTREF_FRAME, LAST_FRAME);
	    } else if (cm.common.copy_arf === 2) {
	        
	        vp8_dixie_release_ref_frame(cm.ref_frames[ALTREF_FRAME]);
	        cm.ref_frames[ALTREF_FRAME] =
	                vp8_dixie_ref_frame(cm.ref_frames[GOLDEN_FRAME]);
	        
	    }
	    
	    

	    if (cm.common.copy_gf === 1)
	    {
	        vp8_dixie_release_ref_frame(cm.ref_frames[GOLDEN_FRAME]);
	        cm.ref_frames[GOLDEN_FRAME] =
	                vp8_dixie_ref_frame(cm.ref_frames[LAST_FRAME]);
	    } else if (cm.common.copy_gf === 2)
	    {
	        vp8_dixie_release_ref_frame(cm.ref_frames[GOLDEN_FRAME]);
	        cm.ref_frames[GOLDEN_FRAME] =
	                vp8_dixie_ref_frame(cm.ref_frames[ALTREF_FRAME]);
	    }

	    if (cm.common.refresh_gf === 1)
	    {
	        vp8_dixie_release_ref_frame(cm.ref_frames[GOLDEN_FRAME]);
	        cm.ref_frames[GOLDEN_FRAME] =
	                vp8_dixie_ref_frame(cm.ref_frames[CURRENT_FRAME]);
	    }

	    if (cm.common.refresh_arf === 1)
	    {
	        vp8_dixie_release_ref_frame(cm.ref_frames[ALTREF_FRAME]);
	        cm.ref_frames[ALTREF_FRAME] =
	                vp8_dixie_ref_frame(cm.ref_frames[CURRENT_FRAME]);
	    }

	    if (cm.common.refresh_last === 1)
	    {
	        vp8_dixie_release_ref_frame(cm.ref_frames[LAST_FRAME]);
	        cm.ref_frames[LAST_FRAME] =
	                vp8_dixie_ref_frame(cm.ref_frames[CURRENT_FRAME]);
	    }


	    
	}


	module.exports = {
	    vp8dx_receive_compressed_data:vp8dx_receive_compressed_data
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var vp8_loopfilter = __webpack_require__(76);
	var vp8_loop_filter_row_simple = vp8_loopfilter.vp8_loop_filter_row_simple;
	var vp8_loop_filter_row_normal = vp8_loopfilter.vp8_loop_filter_row_normal;

	var detokenize = __webpack_require__(78);
	var decode_mb_tokens = detokenize.decode_mb_tokens;
	var vp8_reset_mb_tokens_context = detokenize.vp8_reset_mb_tokens_context;

	var bitreader = __webpack_require__(70);
	var vpx_read = bitreader.vpx_read;
	var vpx_read_bit = bitreader.vpx_read_bit;

	var entropymv = __webpack_require__(80);
	var vp8_default_mv_context = entropymv.vp8_default_mv_context;


	var entropy = __webpack_require__(81);
	var vp8_default_coef_probs = entropy.vp8_default_coef_probs;

	var quant_common = __webpack_require__(83);
	var vp8_dc_quant = quant_common.vp8_dc_quant;
	var vp8_dc2quant = quant_common.vp8_dc2quant;
	var vp8_dc_uv_quant = quant_common.vp8_dc_uv_quant;
	var vp8_ac_yquant = quant_common.vp8_ac_yquant;
	var vp8_ac2quant = quant_common.vp8_ac2quant;
	var vp8_ac_uv_quant = quant_common.vp8_ac_uv_quant;

	var reconinter = __webpack_require__(84);
	var vp8_build_inter_predictors_mb = reconinter.vp8_build_inter_predictors_mb;

	var reconintra = __webpack_require__(87);
	var predict_intra_chroma = reconintra.predict_intra_chroma;
	var predict_intra_luma = reconintra.predict_intra_luma;

	var dboolhuff = __webpack_require__(69);
	var vp8dx_start_decode = dboolhuff.vp8dx_start_decode;

	var decodemv = __webpack_require__(89);
	var vp8_decode_mode_mvs = decodemv.vp8_decode_mode_mvs;

	var entropymode = __webpack_require__(93);
	var vp8_init_mbmode_probs = entropymode.vp8_init_mbmode_probs;

	var vpx_image = __webpack_require__(73);
	var vpx_img_set_rect = vpx_image.vpx_img_set_rect;
	var img_alloc_helper = vpx_image.img_alloc_helper;

	var filter = __webpack_require__(85);
	var vp8_sub_pel_filters = filter.vp8_sub_pel_filters;
	var vp8_bilinear_filters = filter.vp8_bilinear_filters;

	var c_utils = __webpack_require__(79);
	var copy_entropy_values = c_utils.copy_entropy_values;
	var memset = c_utils.memset;
	var memset_32 = c_utils.memset_32;

	var FRAME_HEADER_SZ = 3;
	var KEYFRAME_HEADER_SZ = 7;

	var CURRENT_FRAME = 0;
	var LAST_FRAME = 1;
	var GOLDEN_FRAME = 2;
	var ALTREF_FRAME = 3;
	var NUM_REF_FRAMES = 4;

	var MAX_MB_SEGMENTS = 4;

	var TOKEN_BLOCK_Y1 = 0;
	var TOKEN_BLOCK_UV = 1;
	var TOKEN_BLOCK_Y2 = 2;

	var VPX_PLANE_PACKED = 0;
	var VPX_PLANE_Y = 0;
	var VPX_PLANE_U = 1;
	var VPX_PLANE_V = 2;
	var VPX_PLANE_ALPHA = 3;
	var PLANE_PACKED = VPX_PLANE_PACKED;
	var PLANE_Y = VPX_PLANE_Y;
	var PLANE_U = VPX_PLANE_U;
	var PLANE_V = VPX_PLANE_V;

	var CURRENT_FRAME = 0;
	var LAST_FRAME = 1;
	var GOLDEN_FRAME = 2;
	var ALTREF_FRAME = 3;
	var NUM_REF_FRAMES = 4;

	var BORDER_PIXELS = 16;

	var MV_PROB_CNT = 19;

	var VPX_IMG_FMT_I420 = 258;

	var VPX_PLANE_PACKED = 0;
	var VPX_PLANE_Y = 0;
	var VPX_PLANE_U = 1;
	var VPX_PLANE_V = 2;
	var VPX_PLANE_ALPHA = 3;
	var PLANE_PACKED = VPX_PLANE_PACKED;
	var PLANE_Y = VPX_PLANE_Y;
	var PLANE_U = VPX_PLANE_U;
	var PLANE_V = VPX_PLANE_V;
	var PLANE_ALPHA = VPX_PLANE_ALPHA;

	var DC_PRED = 0;
	var B_PRED = 4;

	var CURRENT_FRAME = 0;

	var MB_FEATURE_TREE_PROBS = 3;
	var MAX_MB_SEGMENTS = 4;

	var FRAME_HEADER_SZ = 3;
	var KEYFRAME_HEADER_SZ = 7;


	/*
	 * was dequant_init
	 * @param {type} factors
	 * @param {type} seg
	 * @param {type} common
	 * @returns {undefined}
	 */
	function vp8cx_init_de_quantizer(factors, seg, common) {
	    var i = 0;
	    var q = 0;
	    var dqf = factors;
	    var factor;

	    var length = 1;
	    if (seg.enabled === 1) {
	        length = MAX_MB_SEGMENTS;
	    }

	    for (i = 0; i < length; i++) {
	        q = common.mbmi_qindex;

	        if (seg.enabled === 1)
	            q = (!seg.abs) ? q + seg.quant_idx[i] : seg.quant_idx[i];

	        factor = dqf[i].factor;

	        if (dqf[i].quant_idx !== q || common.delta_update) {
	            factor[TOKEN_BLOCK_Y1][0] = vp8_dc_quant(q, common.y1dc_delta_q);
	            factor[TOKEN_BLOCK_Y2][0] = vp8_dc2quant(q, common.y2dc_delta_q);
	            factor[TOKEN_BLOCK_UV][0] = vp8_dc_uv_quant(q, common.uvdc_delta_q);
	            factor[TOKEN_BLOCK_Y1][1] = vp8_ac_yquant(q);
	            factor[TOKEN_BLOCK_Y2][1] = vp8_ac2quant(q, common.y2ac_delta_q);
	            factor[TOKEN_BLOCK_UV][1] = vp8_ac_uv_quant(q, common.uvac_delta_q);


	            dqf[i].quant_idx = q;
	        }
	    }
	}


	var img = {//img_index litteral
	    y: null,
	    u: null,
	    v: null,
	    data_32: null,
	    y_off: 0,
	    u_off: 0,
	    v_off: 0,
	    stride: 0,
	    uv_stride: 0
	};

	var recon_above_off = new Uint32Array([0, 0, 0]);
	var recon_left_off = new Uint32Array([0, 0, 0]);

	function decode_mb_rows(ctx) {

	    var mb_idx = 0;
	    var pc = ctx.common; // change this later




	    //var img = ctx.ref_frames[CURRENT_FRAME].img; //INTRA_FRAME
	    var yv12_fb_new = ctx.ref_frames[CURRENT_FRAME].img;// cache reference
	    img.stride = yv12_fb_new.stride[PLANE_Y];
	    img.uv_stride = yv12_fb_new.stride[PLANE_U];
	    img.y = img.v = img.u = yv12_fb_new.img_data;
	    img.data_32 = yv12_fb_new.img_data.data_32;


	    var mb_rows = ctx.mb_rows;
	    var mb_cols = ctx.mb_cols;

	    var recon_y_stride = yv12_fb_new.stride;
	    var recon_uv_stride = yv12_fb_new.uv_stride;

	    //vp8_setup_intra_recon(img.y, img.y_off, img.u_off, img.v_off, img.stride, img.uv_stride);
	    //vp8_setup_intra_recon_top_line(yv12_fb_new);


	    for (var row = 0, partition = 0; row < mb_rows; row++) {


	        var mbi;
	        var mbi_off = 0;
	        var col = 0;
	        var coeffs = 0;
	        var coeffs_off = 0;



	        img.y_off = yv12_fb_new.planes_off[PLANE_Y];
	        img.u_off = yv12_fb_new.planes_off[PLANE_U];
	        img.v_off = yv12_fb_new.planes_off[PLANE_V];



	        img.y_off += (img.stride * row) << 4;
	        img.u_off += (img.uv_stride * row) << 3;
	        img.v_off += (img.uv_stride * row) << 3;
	        mbi = ctx.mb_info_rows; //[1 + row];
	        mbi_off = (ctx.mb_info_rows_off[1 + row]);
	        //coeffs = ctx.tokens[row & (ctx.token_hdr.partitions - 1)].coeffs;
	        coeffs = ctx.tokens[row & (ctx.token_hdr.partitions - 1)].coeffs;
	        
	        //if (ctx.tokens[row & (ctx.token_hdr.partitions - 1)].coeffs === null) {
	            //console.warn(ctx.tokens);
	            
	        //}



	        recon_above_off[0] = img.y_off;
	        recon_above_off[1] = img.u_off;
	        recon_above_off[2] = img.v_off;


	        recon_left_off[0] = recon_above_off[0] - 1;
	        recon_left_off[1] = recon_above_off[1] - 1;
	        recon_left_off[2] = recon_above_off[2] - 1;


	        // Fix up the out-of-frame pixels

	        var mbi_cache = mbi[mbi_off];


	        fixup_left(img.y, img.y_off, 16, img.stride, row, mbi_cache.mbmi.y_mode);
	        fixup_left(img.u, img.u_off, 8, img.uv_stride, row, mbi_cache.mbmi.uv_mode);
	        fixup_left(img.v, img.v_off, 8, img.uv_stride, row, mbi_cache.mbmi.uv_mode);
	        //doesnt seem to do anything
	        //if (row === 0)
	        //  img.y[img.y_off - img.stride - 1]= 127;
	        //console.warn(img.y_off - img.stride - 1);

	        //vp8_setup_intra_recon(img.y, img.y_off, img.u_off, img.v_off, img.stride, img.uv_stride);


	        //probably line 485
	        for (col = 0; col < mb_cols; col++) {
	            //if (col > 0) {




	            if (row === 0) {
	                //vp8_setup_intra_recon_top_line

	                fixup_above(img.y, img.y_off, 16, img.stride, col, mbi[mbi_off].mbmi.y_mode);
	                fixup_above(img.u, img.u_off, 8, img.uv_stride, col,
	                        mbi[mbi_off].mbmi.uv_mode);
	                fixup_above(img.v, img.v_off, 8, img.uv_stride, col,
	                        mbi[mbi_off].mbmi.uv_mode);

	            }

	            //swap these two
	            decode_macroblock(ctx, partition, row, col, img, mbi_cache, coeffs, coeffs_off);



	            mbi_off++;
	            img.y_off += 16;
	            img.u_off += 8;
	            img.v_off += 8;
	            coeffs_off += 400;



	        }

	        //decode frame line 605
	        if (ctx.common.level && row) {
	            if (ctx.common.filter_type)
	                vp8_loop_filter_row_simple(ctx, row - 1);
	            else
	                vp8_loop_filter_row_normal(ctx, row - 1, 0, ctx.mb_cols);

	        }

	        if (col === ctx.mb_cols) {

	            var extend = img.y;
	            var extend_off = (img.y_off + 15 * img.stride);//(uint32_t *)
	            var val = img.y[img.y_off - 1 + 15 * img.stride];//0x01010101 * 
	            extend[extend_off] = extend[extend_off + 1] = extend[extend_off + 2] = extend[extend_off + 3] = val;
	        }


	        if (++partition === ctx.token_hdr.partitions)
	            partition = 0;
	    }

	    if (ctx.common.level) {
	        if (ctx.common.filter_type)
	            vp8_loop_filter_row_simple(ctx, row - 1);
	        else
	            vp8_loop_filter_row_normal(ctx, row - 1, 0, ctx.mb_cols);
	    }


	}

	function fixup_left(predict, predict_off, width, stride, row, mode) {
	    //The left column of out-of-frame pixels is taken to be 129,
	    // unless we're doing DC_PRED, in which case we duplicate the
	    // above row, unless this is also row 0, in which case we use
	    // 129.
	    //

	    var left = predict;
	    var left_off = (predict_off - 1);
	    var i = 0;

	    if (mode === DC_PRED && row)
	    {

	        var above = predict;
	        var above_off = predict_off - stride;//*

	        for (i = 0; i < width; i++)
	        {
	            left[left_off] = above[above_off + i];//*
	            left_off += stride;
	        }
	    } else
	    {

	        left_off -= stride;

	        for (i = -1; i < width; i++)
	        {
	            left[left_off] = 129;//*
	            left_off += stride;
	        }
	        // }
	    }
	}

	function fixup_above(predict, predict_off, width, stride, col, mode) {
	    // The above row of out-of-frame pixels is taken to be 127,
	    // unless we're doing DC_PRED, in which case we duplicate the
	    // left col, unless this is also col 0, in which case we use
	    // 127.
	    //
	    var above = predict;
	    var above_off = predict_off - stride;//*
	    var i = 0;

	    //maybe yv12_extend_frame_top_c
	    if (mode === DC_PRED && col)
	    {
	        var left = predict;
	        var left_off = predict_off - 1;//*

	        for (i = 0; i < width; i++)
	        {
	            above[above_off + i] = left[left_off];//*
	            left_off += stride;
	        }
	    } else
	        /* Need to re-set the left col, in case the last MB was
	         * DC_PRED.
	         */
	        memset(above, above_off - 1, 127, width + 1);

	    memset_32(above, above_off + width, 127, 4); // for above-right subblock modes

	}

	function memset_32(ptr, ptr_off, value, num) {
	    var i = num;//>> 2;
	    var ptr_off_32 = ptr_off >> 2;
	    var ptr_32 = ptr.data_32;
	    var value_32 = value | value << 8 | value << 16 | value << 24;
	    var num_32 = num >> 2;
	    for (var i = 0; i < num_32; i++) {
	        ptr_32[ptr_off_32 + (i >> 2)] = value_32;
	    }
	}

	var coeff_clear = new Uint8Array(400);
	function decode_macroblock(ctx, partition, row, start_col, img, xd, coeffs, coeffs_off) {

	    var tokens = ctx.tokens[partition];
	    var coeffs = tokens.coeffs;
	    var coeffs_off = 0;
	    var col = 0;
	    var above = ctx.above_token_entropy_ctx;
	    var above_off = +start_col;
	    var left = tokens.left_token_entropy_ctx;
	    var left_off = 0;
	    var mbi = ctx.mb_info_rows;
	    var mbi_off = ctx.mb_info_rows_off[1 + row] + start_col;


	    if (start_col === 0)
	        reset_row_context(left);

	    var mbi_cache = mbi[mbi_off];
	    var mbmi_cache = mbi_cache.mbmi;

	 
	    //wtf why!?!?!?!
	    /*
	    if (coeffs === null) {
	        //throw "coeff data missing";
	        console.warn("Missing partition " + partition + " : " + ctx.token_hdr.partitions);
	        coeffs = new Uint32Array(ctx.mb_cols * 400);
	        //coeffs.data_64 = new Float64Array(coeffs.buffer);
	    } else {
	        var copy_dest = coeffs.data_64;
	        copy_dest.set(coeff_clear);
	    }
	    */
	    var copy_dest = coeffs.data_64;
	      //  copy_dest.set(coeff_clear);
	           //coeffs.set(coeff_clear); 
	    //var copy_dest = coeffs.data_64;
	            //copy_dest.set(coeff_clear);
	    //memset(coeffs, coeffs_off, 0, 400);

	    for (var c = 0; c < 200; c++) {
	        copy_dest[c] = 0;
	    }



	    if (mbmi_cache.mb_skip_coeff === 1) {
	        //vp8_reset_mb_tokens_context
	        vp8_reset_mb_tokens_context(left, above[above_off], mbmi_cache.y_mode);
	        mbmi_cache.eob_mask = 0;

	    } else {


	        var dqf;
	        var dqf_off = 0;

	        dqf = ctx.dequant_factors;
	        dqf_off = +mbmi_cache.segment_id;

	        //vp8_decode_mb_tokens
	        mbmi_cache.eob_mask =
	                decode_mb_tokens(tokens.bool,
	                        left, above[above_off],
	                        coeffs, coeffs_off,
	                        mbmi_cache.y_mode,
	                        ctx.common.entropy_hdr.coeff_probs,
	                        dqf[dqf_off].factor);

	    }


	    if (mbmi_cache.y_mode <= B_PRED) {
	        predict_intra_chroma(img.u, img.u_off, img.v, img.v_off, img.uv_stride, mbi_cache,
	                coeffs, coeffs_off);
	        predict_intra_luma(img.y, img.y_off, img.stride, mbi_cache, coeffs, coeffs_off);

	    } else {

	        vp8_build_inter_predictors_mb(ctx, img, coeffs, coeffs_off, mbi_cache, start_col, row);
	    }



	}

	var left_reset = new Int32Array(9);
	function reset_row_context(left) {
	    //console.warn(left.length);
	    left.set(left_reset);
	    //var i = left.length;
	    //while (i--)
	      //  left[i] = 0;
	}




	function setup_token_decoder(hdr, data, ptr, sz) {
	    var partition_change = 0;
	    var i = 0;
	    var decoder = hdr.decoder;
	    var bool = decoder.boolDecoder;
	    var partitions = 1 << bool.get_uint(2);
	    //console.warn("New partitions : " + partitions);
	    if(hdr.partitions !== partitions)
	        partition_change = 1;
	    
	    hdr.partitions  = partitions;
	    //var partitions = hdr.partitions;//cache 

	    if (sz < 3 * (partitions - 1))
	        throw "Truncated packet found parsing partition lenghts";

	    sz -= 3 * (partitions - 1);

	    for (i = 0; i < partitions; i++) {
	        if (i < partitions - 1) {
	            hdr.partition_sz[i] = (data[ptr + 2] << 16)
	                    | (data[ptr + 1] << 8) | data[ptr];
	            ptr += 3;
	        } else
	            hdr.partition_sz[i] = sz;

	        if (sz < hdr.partition_sz[i])
	            throw  "Truncated partition";

	        sz -= hdr.partition_sz[i];
	    }


	    for (i = 0; i < partitions; i++) {

	        vp8dx_start_decode(decoder.tokens[i].bool, data, ptr, hdr.partition_sz[i]);
	        ptr += hdr.partition_sz[i];
	    }
	    return partition_change;
	}


	function vp8_dixie_release_ref_frame(rcimg) {
	    if (rcimg) {
	        if (rcimg.ref_cnt === 0)
	            throw "ERROR :(";
	        rcimg.ref_cnt--;
	    }
	}


	function vpx_img_free(img) {
	    if (img)
	    {
	        if (img.img_data && img.img_data_owner)
	            img.img_data = null;

	        if (img.self_allocd)
	            img = null;
	    }
	}

	function vp8_dixie_find_free_ref_frame(frames) {
	    var i = 0;

	    for (i = 0; i < NUM_REF_FRAMES; i++)
	        if (frames[i].ref_cnt === 0) {
	            frames[i].ref_cnt = 1;
	            return frames[i];
	        }

	    return null;
	}

	function init_frame(pbi) {
	    var pc = pbi.common;
	    var xd = pbi.segment_hdr;

	    var to = pc.entropy_hdr.mv_probs;

	    if (pc.is_keyframe === true) {

	        //for (var i = 0; i < MV_PROB_CNT; i++)
	          //  to[0][i] = vp8_default_mv_context[0][i];
	        
	        to[0].set(vp8_default_mv_context[0]);
	        to[1].set(vp8_default_mv_context[1]);

	        //for (var i = 0; i < MV_PROB_CNT; i++)
	          //  to[1][i] = vp8_default_mv_context[1][i];

	        vp8_init_mbmode_probs(pc);
	        vp8_default_coef_probs(pc);


	    } else {

	    }


	}

	function vp8_decode_frame(data, decoder) {

	    var bc = decoder.boolDecoder;
	    var pc = decoder.common;
	    var xd = decoder.segment_hdr;

	    var sz = data.byteLength;


	    var first_partition_length_in_bytes = 0;

	    var res;
	    decoder.common.saved_entropy_valid = 0;



	    var clear0 = data[0];
	    pc.is_keyframe = !(clear0 & 0x01);
	    pc.version = (clear0 >> 1) & 7;
	    pc.show_frame = (clear0 >> 4) & 1;
	    first_partition_length_in_bytes = (clear0 | (data[1] << 8) | (data[2] << 16)) >> 5;

	    if (sz <= first_partition_length_in_bytes + (pc.is_keyframe ? 10 : 3))
	        return -1;//VPX_CODEC_CORRUPT_FRAME;


	    pc.frame_size_updated = 0;

	    if (pc.is_keyframe === true) {


	        var w = pc.Width;
	        var h = pc.Height;
	        var scale_h = pc.vert_scale;
	        var scale_w = pc.horiz_scale;

	        if (data[3] !== 0x9d || data[4] !== 0x01 || data[5] !== 0x2a)
	            return -1;//VPX_CODEC_UNSUP_BITSTREAM;

	        var data7 = data[7];

	        pc.Width = ((data[6] | (data7 << 8)) & 0x3fff);
	        pc.horiz_scale = data7 >> 6;
	        pc.Height = ((data[8] | (data[9] << 8)) & 0x3fff);
	        pc.vert_scale = data[9] >> 6;


	        if (w !== pc.Width || h !== pc.Height
	                || scale_h !== pc.vert_scale
	                || scale_w !== pc.horiz_scale) {
	            pc.frame_size_updated = 1;
	        }



	    }





	    //now calculate how many macroblock rows and columns
	    data.ptr += FRAME_HEADER_SZ;
	    sz -= FRAME_HEADER_SZ;

	    if (pc.is_keyframe === true) {
	        data.ptr += KEYFRAME_HEADER_SZ;
	        sz -= KEYFRAME_HEADER_SZ;
	        decoder.mb_cols = ((pc.Width + 15) >> 4) | 0;
	        decoder.mb_rows = ((pc.Height + 15) >> 4) | 0;

	    }


	    // bc.init(data, data.ptr, decoder.common.part0_sz);
	    vp8dx_start_decode(bc, data, data.ptr, first_partition_length_in_bytes);

	    if (pc.is_keyframe) {
	        bc.get_uint(2);//skip bits for now

	    }



	    //START Decode segment hdr
	    init_frame(decoder);

	    xd.enabled = vpx_read_bit(bc);

	    if (xd.enabled === 1) {
	        var i = 0;

	        xd.update_map = vpx_read_bit(bc);
	        xd.update_data = vpx_read_bit(bc);

	        if (xd.update_data === 1) {
	            xd.abs = vpx_read_bit(bc);

	            for (i = 0; i < MAX_MB_SEGMENTS; i++)
	                xd.quant_idx[i] = bc.maybe_get_int(7);

	            for (i = 0; i < MAX_MB_SEGMENTS; i++)
	                xd.lf_level[i] = bc.maybe_get_int(6);
	        }

	        if (xd.update_map === 1) {
	            for (i = 0; i < MB_FEATURE_TREE_PROBS; i++) {
	                if (vpx_read_bit(bc) === 1) {
	                    xd.tree_probs[i] = bc.get_uint(8);
	                } else {
	                    xd.tree_probs[i] = 255;
	                }
	            }
	        }
	    } else {
	        xd.update_map = 0;
	        xd.update_data = 0;
	    }
	    //end decode segment header



	    //pc.decode(decoder.boolDecoder);
	    if (pc.is_keyframe === true) {

	        pc.filter_type = 0;
	        pc.level = 0;
	        pc.sharpness = 0;
	        pc.delta_enabled = 0;

	        pc.ref_delta[0] = 0;
	        pc.ref_delta[1] = 0;
	        pc.ref_delta[2] = 0;
	        pc.ref_delta[3] = 0;

	        pc.mode_delta[0] = 0;
	        pc.mode_delta[1] = 0;
	        pc.mode_delta[2] = 0;
	        pc.mode_delta[3] = 0;
	    }


	    pc.filter_type = vpx_read_bit(bc);
	    pc.level = bc.get_uint(6);
	    pc.sharpness = bc.get_uint(3);
	    pc.delta_enabled = vpx_read_bit(bc);

	    var ref_delta = pc.ref_delta;

	    if (pc.delta_enabled === 1 && vpx_read_bit(bc) === 1) {

	        ref_delta[0] = bc.maybe_get_int(6);
	        ref_delta[1] = bc.maybe_get_int(6);
	        ref_delta[2] = bc.maybe_get_int(6);
	        ref_delta[3] = bc.maybe_get_int(6);

	        pc.mode_delta[0] = bc.maybe_get_int(6);
	        pc.mode_delta[1] = bc.maybe_get_int(6);
	        pc.mode_delta[2] = bc.maybe_get_int(6);
	        pc.mode_delta[3] = bc.maybe_get_int(6);

	    }



	    var partition_change = setup_token_decoder(decoder.token_hdr, data, data.ptr + first_partition_length_in_bytes,
	            sz - first_partition_length_in_bytes);




	    var q_update = 0;
	    var last_q = pc.mbmi_qindex;

	    pc.mbmi_qindex = bc.get_uint(7);
	    q_update = (last_q !== pc.mbmi_qindex) + 0;
	    q_update |= (pc.y1dc_delta_q = bc.maybe_get_int(4));
	    q_update |= (pc.y2dc_delta_q = bc.maybe_get_int(4));
	    q_update |= (pc.y2ac_delta_q = bc.maybe_get_int(4));
	    q_update |= (pc.uvdc_delta_q = bc.maybe_get_int(4));
	    q_update |= (pc.uvac_delta_q = bc.maybe_get_int(4));
	    pc.delta_update = q_update;




	    //Reference Header

	    var key = pc.is_keyframe;

	    if (key === true) {
	        pc.refresh_gf = 1;
	        pc.refresh_arf = 1;
	        pc.copy_gf = 0;
	        pc.copy_arf = 0;
	        pc.sign_bias[GOLDEN_FRAME] = 0;
	        pc.sign_bias[ALTREF_FRAME] = 0;
	    } else {
	        pc.refresh_gf = vpx_read_bit(bc);
	        pc.refresh_arf = vpx_read_bit(bc);
	        pc.copy_gf = !pc.refresh_gf
	                ? bc.get_uint(2) : 0;
	        pc.copy_arf = !pc.refresh_arf
	                ? bc.get_uint(2) : 0;
	        pc.sign_bias[GOLDEN_FRAME] = vpx_read_bit(bc);
	        pc.sign_bias[ALTREF_FRAME] = vpx_read_bit(bc);
	    }




	    pc.refresh_entropy_probs = vpx_read_bit(bc);

	    if (key === true) {
	        pc.refresh_last = 1;
	    } else {
	        pc.refresh_last = vpx_read_bit(bc);
	    }



	    if (pc.refresh_entropy_probs === 0) {

	        copy_entropy_values(pc.saved_entropy, pc.entropy_hdr);
	        decoder.saved_entropy_valid = 1;

	    }




	    decoder.modemv_init();





	    var ctx = decoder;
	    var partitions = ctx.token_hdr.partitions;

	    //PREDICT INIT
	    var i = 0;
	    var this_frame_mbmi = 0;
	    var this_frame_mbmi_off = 0;
	    var coeff_row_sz = ctx.mb_cols * 400;

	    if (pc.frame_size_updated === 1) {
	        //console.warn("Frame size updated");
	        var i = 0;
	        

	        for (i = 0; i < partitions; i++) {
	            //ctx.tokens[i].coeffs = new Uint32Array(coeff_row_sz);
	            //ctx.tokens[i].coeffs.data_64 = new Float64Array(ctx.tokens[i].coeffs.buffer);
	        }

	        var mb_cols = ctx.mb_cols;
	        //ENTROPY_CONTEXT_PLANES
	        ctx.above_token_entropy_ctx = new Array(mb_cols);
	        for ( i = 0; i < mb_cols; i++)
	            ctx.above_token_entropy_ctx[i] = new Int32Array(9);

	        var w = ((decoder.mb_cols << 4) + 32) | 0;
	        var h = ((decoder.mb_rows << 4) + 32) | 0;

	        for (i = 0; i < NUM_REF_FRAMES; i++) {

	            vpx_img_free(decoder.frame_strg[i].img);
	            decoder.frame_strg[i].ref_cnt = 0;
	            decoder.ref_frames[i] = null;

	            img_alloc_helper(decoder.frame_strg[i].img, VPX_IMG_FMT_I420, w, h, 16);

	            vpx_img_set_rect(decoder.frame_strg[i].img, BORDER_PIXELS, BORDER_PIXELS,
	                    decoder.common.Width, decoder.common.Height);

	        }

	        if (pc.version)
	            decoder.subpixel_filters = vp8_bilinear_filters;
	        else
	            decoder.subpixel_filters = vp8_sub_pel_filters;

	    }
	    
	    if(pc.frame_size_updated === 1 || partition_change === 1){
	        //console.log("Partition changing : " + partitions);
	        for (i = 0; i < partitions; i++) {
	            ctx.tokens[i].coeffs = new Uint32Array(coeff_row_sz);
	            ctx.tokens[i].coeffs.data_64 = new Float64Array(ctx.tokens[i].coeffs.buffer);
	        }
	    }




	    var ref_frames = decoder.ref_frames;
	    /* Find a free framebuffer to predict into */
	    if (ref_frames[CURRENT_FRAME])
	        vp8_dixie_release_ref_frame(ref_frames[CURRENT_FRAME]);

	    ref_frames[CURRENT_FRAME] =
	            vp8_dixie_find_free_ref_frame(decoder.frame_strg);

	    this_frame_mbmi = ref_frames[CURRENT_FRAME].img.img_data;

	    /* Calculate offsets to the other reference frames */

	    for (i = 0; i < NUM_REF_FRAMES; i++) {
	        var ref = ref_frames[i];

	        if (ref) {
	            decoder.ref_frame_offsets[i] = ref.img.img_data_off - this_frame_mbmi_off;
	            decoder.ref_frame_offsets_[i] = ref.img.img_data;

	        } else {
	            decoder.ref_frame_offsets[i] = 0;
	            decoder.ref_frame_offsets_[i] = this_frame_mbmi;

	        }
	    }

	    //END PREDICT INIT
	    vp8cx_init_de_quantizer(decoder.dequant_factors, xd, pc);

	    var length = 1;
	    if (xd.enabled === 1) {
	        length = 4;
	    }

	    vp8_decode_mode_mvs(decoder, bc);


	    var above = decoder.above_token_entropy_ctx;
	    var mb_cols = decoder.mb_cols;
	    for (var col = 0; col < mb_cols; ++col)
	        memset(above[col], 0, 0, 9);

	    decode_mb_rows(decoder);

	    decoder.frame_cnt++;

	    //UPDATE REFERENCES TO FRAMES AND STUFF
	    if (decoder.saved_entropy_valid === 1) {
	        //decoder.common.entropy_hdr.copyValues(decoder.common.saved_entropy);
	        copy_entropy_values(pc.entropy_hdr, pc.saved_entropy);
	        decoder.saved_entropy_valid = 0;
	    }


	    decoder.img_avail = decoder.common.show_frame;


	}


	module.exports = {};
	module.exports.vp8cx_init_de_quantizer = vp8cx_init_de_quantizer;
	module.exports.decode_mb_rows = decode_mb_rows;
	module.exports.setup_token_decoder = setup_token_decoder;
	module.exports.vp8_decode_frame = vp8_decode_frame;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var loopfilter_filters = __webpack_require__(77);
	var vp8_filter = loopfilter_filters.vp8_filter;
	var vp8_loop_filter_bhs_c = loopfilter_filters.vp8_loop_filter_bhs_c;
	var vp8_loop_filter_simple_horizontal_edge_c = loopfilter_filters.vp8_loop_filter_simple_horizontal_edge_c;
	var vp8_loop_filter_bvs_c = loopfilter_filters.vp8_loop_filter_bvs_c;
	var vp8_loop_filter_simple_vertical_edge_c = loopfilter_filters.vp8_loop_filter_simple_vertical_edge_c;
	var vp8_loop_filter_mbv = loopfilter_filters.vp8_loop_filter_mbv;
	var vp8_loop_filter_bv_c = loopfilter_filters.vp8_loop_filter_bv_c;
	var filter_mb_edge = loopfilter_filters.filter_mb_edge;
	var normal_threshold = loopfilter_filters.normal_threshold;
	var high_edge_variance = loopfilter_filters.high_edge_variance;

	var CURRENT_FRAME = 0;

	var VPX_PLANE_PACKED = 0;   /**< To be used for all packed formats */
	var VPX_PLANE_Y = 0;   /**< Y (Luminance) plane */
	var VPX_PLANE_U = 1;   /**< U (Chroma) plane */
	var VPX_PLANE_V = 2;   /**< V (Chroma) plane */

	var PLANE_Y = VPX_PLANE_Y;
	var PLANE_U = VPX_PLANE_U;
	var PLANE_V = VPX_PLANE_V;

	var B_PRED = 4; /* block mbmid prediction, each block has its own prediction mode */
	var ZEROMV = 7;
	var SPLITMV = 9;


	var abs = Math.abs;

	var min = Math.min;
	var max = Math.max;

	var edge_limit = new Int32Array([0]), interior_limit = new Int32Array([0]), hev_threshold = new Int32Array([0]);

	function vp8_loop_filter_row_simple(ctx, row) {
	    var y = 0;
	    var y_off = 0;
	    var stride = 0;
	    var mbi;
	    var mbi_off = 0;//='mb_info'
	    var col = 0;

	    /* Adjust pointers mbmid on row, start_col */
	    stride = ctx.ref_frames[CURRENT_FRAME].img.stride[PLANE_Y];
	    y = ctx.ref_frames[CURRENT_FRAME].img.img_data;
	    y_off = ctx.ref_frames[CURRENT_FRAME].img.planes_off[PLANE_Y];
	    y_off += (stride * row) << 4;


	    mbi = ctx.mb_info_rows;
	    mbi_off = ctx.mb_info_rows_off[1 + row];
	    //console.log(mbi[mbi_off]);
	    var mb_cols = ctx.mb_cols;

	        

	    for (col = 0; col < mb_cols; col++) {


	        // TODO: only need to recalculate every MB if segmentation is
	        //  enabled.


	        calculate_filter_parameters(ctx, mbi[mbi_off], edge_limit,
	                interior_limit, hev_threshold);



	        if (edge_limit[0]) {


	            var filter_subblocks = (mbi[mbi_off].mbmi.eob_mask
	                    || mbi[mbi_off].mbmi.y_mode == SPLITMV
	                    || mbi[mbi_off].mbmi.y_mode == B_PRED) + 0;

	            var mb_limit = (edge_limit[0] + 2) * 2 + interior_limit[0];
	            var b_limit = edge_limit[0] * 2 + interior_limit[0];

	            if (col > 0)
	                vp8_loop_filter_simple_vertical_edge_c(y, y_off, stride, mb_limit);

	            if (filter_subblocks)
	            {
	                //vp8_loop_filter_simple_bv vp8_loop_filter_bvs_c
	                vp8_loop_filter_bvs_c(y, y_off, stride, b_limit);

	                //filter_v_edge_simple(y, y_off + 4, stride, b_limit);
	                //filter_v_edge_simple(y, y_off + 8, stride, b_limit);
	                //filter_v_edge_simple(y, y_off + 12, stride, b_limit);

	            }

	            if (row > 0)
	                vp8_loop_filter_simple_horizontal_edge_c(y, y_off, stride, mb_limit);

	            if (filter_subblocks)
	            {
	                vp8_loop_filter_bhs_c(y, y_off, stride, b_limit);
	            }

	        }

	        y_off += 16;
	        mbi_off++;
	    }

	}
	var edge_limit_cache = new Uint8Array([0]), interior_limit_cache = new Uint8Array([0]), hev_threshold_cache = new Uint8Array([0]);

	function vp8_loop_filter_row_normal(ctx, row, start_col, num_cols) {

	    var y = 0, u = 0, v = 0;
	    var y_off = 0, u_off = 0, v_off = 0;
	    var stride = 0, uv_stride = 0;
	    var mbi;
	    var mbi_off = 0;//='mb_info'
	    var col = 0;

	    /* Adjust pointers mbmid on row, start_col */
	    var currentImg = ctx.ref_frames[CURRENT_FRAME].img;
	    stride = currentImg.stride[PLANE_Y];
	    y = u = v = currentImg.img_data;
	    uv_stride = currentImg.stride[PLANE_U];
	    y_off = currentImg.planes_off[PLANE_Y];
	    u_off = currentImg.planes_off[PLANE_U];
	    v_off = currentImg.planes_off[PLANE_V];
	    y_off += (stride * row) * 16;
	    u_off += (uv_stride * row) * 8;
	    v_off += (uv_stride * row) * 8;
	    mbi = ctx.mb_info_rows; //[1 + row];
	    mbi_off = ctx.mb_info_rows_off[1 + row];


	    for (col = 0; col < num_cols; col++)
	    {
	        //var edge_limit = [0], interior_limit = [0], hev_threshold = [0];
	        var edge_limit = edge_limit_cache, interior_limit = interior_limit_cache, hev_threshold = hev_threshold_cache;
	        // TODO: only need to recalculate every MB if segmentation is
	        //  enabled.

	        calculate_filter_parameters(ctx, mbi[mbi_off], edge_limit,
	                    interior_limit, hev_threshold);
	        
	        edge_limit = edge_limit[0], interior_limit = interior_limit[0], hev_threshold = hev_threshold[0];


	        if (edge_limit)
	        {
	            if (col > 0)
	                vp8_loop_filter_mbv(y, y_off, u_off, v_off, stride, uv_stride, edge_limit, interior_limit, hev_threshold);


	            //vp8_loop_filter_bv_c
	            if (mbi[mbi_off].mbmi.eob_mask
	                    || mbi[mbi_off].mbmi.y_mode === SPLITMV
	                    || mbi[mbi_off].mbmi.y_mode === B_PRED)
	            {

	                vp8_loop_filter_bv_c(y, y_off, u_off, v_off, stride, uv_stride, edge_limit, interior_limit, hev_threshold);

	            }

	            //vp8_loop_filter_bhs_c
	            if (row > 0) {
	                //vp8_loop_filter_simple_horizontal_edge_c
	                filter_mb_h_edge(y, y_off, stride, edge_limit + 2,
	                        interior_limit, hev_threshold, 2);
	                filter_mb_h_edge(u, u_off, uv_stride, edge_limit + 2,
	                        interior_limit, hev_threshold, 1);
	                filter_mb_h_edge(v, v_off, uv_stride, edge_limit + 2,
	                        interior_limit, hev_threshold, 1);
	            }

	            if (mbi[mbi_off].mbmi.eob_mask
	                    || mbi[mbi_off].mbmi.y_mode === SPLITMV
	                    || mbi[mbi_off].mbmi.y_mode === B_PRED)
	            {
	                filter_subblock_h_edge(y, y_off + 4 * stride, stride,
	                        edge_limit, interior_limit,
	                        hev_threshold, 2);
	                filter_subblock_h_edge(y, y_off + 8 * stride, stride,
	                        edge_limit, interior_limit,
	                        hev_threshold, 2);
	                filter_subblock_h_edge(y, y_off + 12 * stride, stride,
	                        edge_limit, interior_limit,
	                        hev_threshold, 2);
	                filter_subblock_h_edge(u, u_off + 4 * uv_stride, uv_stride,
	                        edge_limit, interior_limit,
	                        hev_threshold, 1);
	                filter_subblock_h_edge(v, v_off + 4 * uv_stride, uv_stride,
	                        edge_limit, interior_limit,
	                        hev_threshold, 1);
	            }

	        }

	        y_off += 16;
	        u_off += 8;
	        v_off += 8;
	        mbi_off++;
	    }

	}

	function calculate_filter_parameters(ctx,
	        mbi,
	        edge_limit_,
	        interior_limit_,
	        hev_threshold_) {
	    var filter_level = 0, interior_limit = 0, hev_threshold = 0;

	    /* Reference code/spec seems to conflate filter_level and
	     * edge_limit
	     */

	    filter_level = ctx.common.level;
	    //console.warn(mbi);

	    if (ctx.segment_hdr.enabled === 1)
	    {
	        if (!ctx.segment_hdr.abs)
	            filter_level += ctx.segment_hdr.lf_level[mbi.mbmi.segment_id];
	        else
	            filter_level = ctx.segment_hdr.lf_level[mbi.mbmi.segment_id];
	    }




	    if (ctx.common.delta_enabled)
	    {
	        filter_level +=
	                ctx.common.ref_delta[mbi.mbmi.ref_frame];

	        if (mbi.mbmi.ref_frame === CURRENT_FRAME)
	        {
	            if (mbi.mbmi.y_mode === B_PRED)
	                filter_level += ctx.common.mode_delta[0];
	        } else if (mbi.mbmi.y_mode === ZEROMV)
	            filter_level += ctx.common.mode_delta[1];
	        else if (mbi.mbmi.y_mode === SPLITMV)
	            filter_level += ctx.common.mode_delta[3];
	        else
	            filter_level += ctx.common.mode_delta[2];
	    }

	    if (filter_level > 63)
	        filter_level = 63;
	    else if (filter_level < 0)
	        filter_level = 0;

	    interior_limit = filter_level;

	    if (ctx.common.sharpness)
	    {
	        interior_limit >>= ctx.common.sharpness > 4 ? 2 : 1;

	        if (interior_limit > 9 - ctx.common.sharpness)
	            interior_limit = 9 - ctx.common.sharpness;
	    }





	    if (interior_limit < 1)
	        interior_limit = 1;

	    if (filter_level >= 15) {
	        hev_threshold = 1;
	    } else {
	        hev_threshold = 0;
	    }

	    if (filter_level >= 40)
	        hev_threshold++;

	    if (filter_level >= 20 && !ctx.common.is_keyframe)
	        hev_threshold++;

	    edge_limit_[0] = filter_level;
	    interior_limit_[0] = interior_limit;
	    hev_threshold_[0] = hev_threshold;

	}



	function filter_mb_h_edge(src, src_off, stride,
	        edge_limit, interior_limit, hev_threshold, size) {
	    var i = 0;

	    var length = size << 3;
	    for (i = 0; i < length; i++) {
	        if (normal_threshold(src, src_off, stride, edge_limit, interior_limit))
	        {
	            if (high_edge_variance(src, src_off, stride, hev_threshold))
	                vp8_filter(src, src_off, stride, 1);
	            else
	                filter_mb_edge(src, src_off, stride);
	        }

	        src_off += 1;
	    }
	}

	function filter_subblock_h_edge(src,
	        src_off,
	        stride,
	        edge_limit,
	        interior_limit,
	        hev_threshold,
	        size) {
	    var i = 0;
	    var length = size << 3;
	    for (i = 0; i < length; i++) {
	        if (normal_threshold(src, src_off, stride, edge_limit, interior_limit))
	            vp8_filter(src, src_off, stride,
	                    high_edge_variance(src, src_off, stride,
	                            hev_threshold));

	        src_off += 1;
	    }
	}


	module.exports = {};
	module.exports.vp8_loop_filter_row_normal = vp8_loop_filter_row_normal;
	module.exports.vp8_loop_filter_row_simple = vp8_loop_filter_row_simple;

/***/ },
/* 77 */
/***/ function(module, exports) {

	'use strict';

	//var abs = Math.abs;

	function abs(value ){
	    return (value ^ (value >> 31)) - (value >> 31);
	}
	var min = Math.min;
	var max = Math.max;

	function saturate_int8(x) {

	    //return min(max(x, -128), 127);
	    return Math.min(Math.max(x, -128), 127);

	}

	function saturate_uint8(x) {
	    //return min(max(x, 0), 255);
	    return Math.min(Math.max(x, 0), 255);
	}

	//possible vp8_simple_filter
	function vp8_filter(pixels, pixels_off, stride, use_outer_taps) {
	    var stride2 = 2 * stride;
	    var p1 = pixels[pixels_off - stride2];
	    var p0 = pixels[pixels_off - stride];
	    var q0 = pixels[pixels_off];
	    var q1 = pixels[pixels_off + stride];

	    var a = 0;
	    var f1 = 0;
	    var f2 = 0;

	    a = 3 * (q0 - p0);

	    if (use_outer_taps)
	        a += saturate_int8(p1 - q1);

	    a = saturate_int8(a);


	    

	    //f1 = ((a + 4 > 127) ? 127 : a + 4) >> 3;
	    if((a + 4) > 127){
	        f1 = 15;
	    }else{
	        f1 = (a + 4) >> 3;
	    }
	    
	    
	    //f2 = ((a + 3 > 127) ? 127 : a + 3) >> 3;
	    if((a + 4) > 127){
	        f2 = 15;
	    }else{
	        f2 = (a + 3) >> 3;
	    }
	    

	    p0 = saturate_uint8(p0 + f2);
	    q0 = saturate_uint8(q0 - f1);

	    if (!use_outer_taps)
	    {
	        /* This handles the case of subblock_filter()
	         * (from the bitstream guide.
	         */
	        a = (f1 + 1) >> 1;
	        p1 = saturate_uint8(p1 + a);
	        q1 = saturate_uint8(q1 - a);
	    }

	    pixels[pixels_off - stride2] = p1;
	    pixels[pixels_off - stride] = p0;
	    pixels[pixels_off] = q0;
	    pixels[pixels_off + stride] = q1;

	}

	//vp8_loop_filter_simple_bh
	function vp8_loop_filter_bhs_c(y, y_ptr, y_stride, blimit) {
	    vp8_loop_filter_simple_horizontal_edge_c(y, y_ptr + 4 * y_stride, y_stride, blimit);
	    vp8_loop_filter_simple_horizontal_edge_c(y, y_ptr + 8 * y_stride, y_stride, blimit);
	    vp8_loop_filter_simple_horizontal_edge_c(y, y_ptr + 12 * y_stride, y_stride, blimit);
	}

	//vp8_loop_filter_mbh_c

	function vp8_loop_filter_simple_horizontal_edge_c(src, src_off, stride, filter_limit) {
	    var i = 0;

	    for (i = 0; i < 16; i++) {
	        if (simple_threshold(src, src_off, stride, filter_limit) === 1)
	            vp8_filter(src, src_off, stride, 1);

	        src_off += 1;
	    }
	}

	function simple_threshold(pixels, pixels_off, stride, filter_limit) {
	    var p1 = pixels[pixels_off - (stride << 1)];
	    var p0 = pixels[pixels_off - stride];
	    var q0 = pixels[pixels_off];
	    var q1 = pixels[pixels_off + stride];

	    return (((abs(p0 - q0) << 1) + (abs(p1 - q1) >> 1)) <= filter_limit) | 0;
	}

	function vp8_loop_filter_bvs_c(y, y_off, stride, b_limit) {
	    vp8_loop_filter_simple_vertical_edge_c(y, y_off + 4, stride, b_limit);
	    vp8_loop_filter_simple_vertical_edge_c(y, y_off + 8, stride, b_limit);
	    vp8_loop_filter_simple_vertical_edge_c(y, y_off + 12, stride, b_limit);
	}

	function vp8_loop_filter_simple_vertical_edge_c(src, src_off, stride, filter_limit) {
	    var i = 0;

	    for (i = 0; i < 16; i++) {
	        if (simple_threshold(src, src_off, 1, filter_limit))
	            vp8_filter(src, src_off, 1, 1);

	        src_off += stride;
	    }
	}
	/*
	 function vp8_loop_filter_simple_horizontal_edge_c(src, src_off, stride, filter_limit) {
	 
	 var i = 0;
	 
	 for (i = 0; i < 16; i++) {
	 if (simple_threshold(src, src_off, 1, filter_limit))
	 vp8_filter(src, src_off, 1, 1);
	 
	 src_off += stride;
	 
	 }
	 
	 }
	 */

	function vp8_loop_filter_mbv(y, y_off, u_off, v_off, stride, uv_stride, edge_limit, interior_limit, hev_threshold) {
	    //vp8_loop_filter_mbv
	    filter_mb_v_edge(y, y_off, stride, edge_limit + 2,
	            interior_limit, hev_threshold, 2);
	    filter_mb_v_edge(y, u_off, uv_stride, edge_limit + 2,
	            interior_limit, hev_threshold, 1);
	    filter_mb_v_edge(y, v_off, uv_stride, edge_limit + 2,
	            interior_limit, hev_threshold, 1);
	}

	function filter_mb_v_edge(src,
	        src_off,
	        stride,
	        edge_limit,
	        interior_limit,
	        hev_threshold,
	        size) {
	    var i = 0;

	    var length = size << 3;
	    for (i = 0; i < length; i++) {
	        if (normal_threshold(src, src_off, 1, edge_limit, interior_limit)) {
	            if (high_edge_variance(src, src_off, 1, hev_threshold))
	                vp8_filter(src, src_off, 1, 1);
	            else
	                filter_mb_edge(src, src_off, 1);
	        }

	        src_off += stride;
	    }
	}


	function normal_threshold(pixels, pixels_off, stride, edge_limit, interior_limit) {
	    var E = edge_limit;
	    var I = interior_limit;

	    if (simple_threshold(pixels, pixels_off, stride, 2 * E + I) === 0)
	        return 0;

	    var p3 = pixels[pixels_off - 4 * stride];
	    var p2 = pixels[pixels_off - 3 * stride];

	    if (abs(p3 - p2) > I)
	        return 0;

	    var p1 = pixels[pixels_off - 2 * stride];


	    if (abs(p2 - p1) > I)
	        return 0;

	    var p0 = pixels[pixels_off - stride];
	   
	    if(abs(p1 - p0) > I)
	        return 0;
	 
	    var q2 = pixels[pixels_off + 2 * stride];
	    var q3 = pixels[pixels_off + 3 * stride];
	    
	    if(abs(q3 - q2) > I)
	        return 0;
	    
	    var q0 = pixels[pixels_off];
	    var q1 = pixels[pixels_off + stride];
	    
	    if(abs(q2 - q1) > I)
	        return 0;
	    
	    
	    return abs(q1 - q0) <= I;
	    
	}


	//vp8_mbfilter
	function filter_mb_edge(pixels, pixels_off, stride) {
	//var p3 = pixels[pixels_off -4*stride];
	    var stride2 = stride << 1;
	    var stride3 = 3 * stride;

	    var p2 = pixels[pixels_off - stride3];
	    var p1 = pixels[pixels_off - stride2];
	    var p0 = pixels[pixels_off - stride];
	    var q0 = pixels[pixels_off];
	    var q1 = pixels[pixels_off + stride];
	    var q2 = pixels[pixels_off + stride2];
	    var w = 0, a = 0;

	    w = saturate_int8(saturate_int8(p1 - q1) + 3 * (q0 - p0));

	    a = (27 * w + 63) >> 7;
	    p0 = saturate_uint8(p0 + a);
	    q0 = saturate_uint8(q0 - a);

	    a = (18 * w + 63) >> 7;
	    p1 = saturate_uint8(p1 + a);
	    q1 = saturate_uint8(q1 - a);

	    a = (9 * w + 63) >> 7;
	    p2 = saturate_uint8(p2 + a);
	    q2 = saturate_uint8(q2 - a);

	    pixels[pixels_off - stride3] = p2;
	    pixels[pixels_off - stride2] = p1;
	    pixels[pixels_off - stride] = p0;
	    pixels[pixels_off] = q0;
	    pixels[pixels_off + stride] = q1;
	    pixels[pixels_off + stride2] = q2;

	}


	function high_edge_variance(pixels, pixels_off, stride, hev_threshold) {

	    var p1 = pixels[pixels_off - 2 * stride];
	    var p0 = pixels[pixels_off - stride];
	    

	    if(abs(p1 - p0) > hev_threshold)
	        return 1;
	    
	    var q0 = pixels[pixels_off];
	    var q1 = pixels[pixels_off + stride];
	    
	    return abs(q1 - q0) > hev_threshold;

	}

	function vp8_loop_filter_bv_c(y, y_off, u_off, v_off, stride, uv_stride, edge_limit, interior_limit, hev_threshold) {
	    var dat = y;
	    filter_subblock_v_edge(y, y_off + 4, stride, edge_limit,
	            interior_limit, hev_threshold, 2);

	    filter_subblock_v_edge(dat, y_off + 8, stride, edge_limit,
	            interior_limit, hev_threshold, 2);

	    filter_subblock_v_edge(dat, y_off + 12, stride, edge_limit,
	            interior_limit, hev_threshold, 2);

	    filter_subblock_v_edge(dat, u_off + 4, uv_stride, edge_limit,
	            interior_limit, hev_threshold, 1);

	    filter_subblock_v_edge(dat, v_off + 4, uv_stride, edge_limit,
	            interior_limit, hev_threshold, 1);
	}


	function filter_subblock_v_edge(src, src_off, stride, edge_limit, interior_limit, hev_threshold, size) {
	    var i = 0;
	    var limit = 8 * size;
	    for (i = 0; i < limit; i++) {

	        if (normal_threshold(src, src_off, 1, edge_limit, interior_limit))
	            
	            vp8_filter(src, src_off, 1, high_edge_variance(src, src_off, 1, hev_threshold));


	        src_off += stride;
	    }


	}

	module.exports = {};
	module.exports.vp8_filter = vp8_filter;
	module.exports.vp8_loop_filter_bhs_c = vp8_loop_filter_bhs_c;
	module.exports.vp8_loop_filter_bvs_c = vp8_loop_filter_bvs_c;
	module.exports.vp8_loop_filter_simple_horizontal_edge_c = vp8_loop_filter_simple_horizontal_edge_c;
	module.exports.vp8_loop_filter_simple_vertical_edge_c = vp8_loop_filter_simple_vertical_edge_c;
	module.exports.vp8_loop_filter_mbv = vp8_loop_filter_mbv;
	module.exports.vp8_loop_filter_bv_c = vp8_loop_filter_bv_c;
	module.exports.filter_mb_edge = filter_mb_edge;
	module.exports.normal_threshold = normal_threshold;
	module.exports.high_edge_variance = high_edge_variance;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var blockd = __webpack_require__(71);
	var vp8_block2left = blockd.vp8_block2left;
	var vp8_block2above = blockd.vp8_block2above;

	var bitreader = __webpack_require__(70);
	var vpx_read = bitreader.vpx_read;
	var vpx_read_bit = bitreader.vpx_read_bit;

	var c_utils = __webpack_require__(79);
	var memset = c_utils.memset;

	var B_PRED = 4;
	var SPLITMV = 9;

	var TOKEN_BLOCK_Y1 = 0;
	var TOKEN_BLOCK_UV = 1;
	var TOKEN_BLOCK_Y2 = 2;
	var TOKEN_BLOCK_TYPES = 3;

	var EOB_CONTEXT_NODE = 0;
	var ZERO_CONTEXT_NODE = 1;
	var ONE_CONTEXT_NODE = 2;
	var LOW_VAL_CONTEXT_NODE = 3;
	var TWO_CONTEXT_NODE = 4;
	var THREE_CONTEXT_NODE = 5;
	var HIGH_LOW_CONTEXT_NODE = 6;
	var CAT_ONE_CONTEXT_NODE = 7;
	var CAT_THREEFOUR_CONTEXT_NODE = 8;
	var CAT_THREE_CONTEXT_NODE = 9;
	var CAT_FIVE_CONTEXT_NODE = 10;


	var DCT_VAL_CATEGORY1 = 5;
	var DCT_VAL_CATEGORY2 = 6;
	var DCT_VAL_CATEGORY3 = 7;
	var DCT_VAL_CATEGORY4 = 8;
	var DCT_VAL_CATEGORY5 = 9;
	var DCT_VAL_CATEGORY6 = 10;


	var ENTROPY_NODES = 11;

	/**
	 * Comparable to vp8_reset_mb_tokens_context
	 * @param {type} left
	 * @param {type} above
	 * @param {type} mode
	 * @returns {null}
	 */
	var context_clear = new Uint32Array(8);
	function vp8_reset_mb_tokens_context(left, above, mode) {
	    /* Reset the macroblock context on the left and right. We have to
	     * preserve the context of the second order block if this mode
	     * would not have updated it.
	     */
	    left.set(context_clear);
	    above.set(context_clear);
	    //memset(left, 0, 0, 8);
	    //memset(above, 0, 0, 8);



	    if (mode !== B_PRED && mode !== SPLITMV) {
	        left[8] = 0;
	        above[8] = 0;
	    }
	}



	function X(n) {
	    return ((n) * 33); //PREV_COEF_CONTEXTS * ENTROPY_NODES
	}

	var bands_x =
	        new Int32Array([
	            X(0), X(1), X(2), X(3), X(6), X(4), X(5), X(6),
	            X(6), X(6), X(6), X(6), X(6), X(6), X(6), X(7)
	        ]);

	var extrabits =
	        [
	            {min_val: 0, length: -1, probs: new Uint8Array([0, 0, 0, 0, 0, 0,
	                    0, 0, 0, 0, 0, 0])}, //ZERO_TOKEN
	            {min_val: 1, length: 0, probs: new Uint8Array([0, 0, 0, 0, 0, 0,
	                    0, 0, 0, 0, 0, 0])}, //ONE_TOKEN
	            {min_val: 2, length: 0, probs: new Uint8Array([0, 0, 0, 0, 0, 0,
	                    0, 0, 0, 0, 0, 0])}, //TWO_TOKEN
	            {min_val: 3, length: 0, probs: new Uint8Array([0, 0, 0, 0, 0, 0,
	                    0, 0, 0, 0, 0, 0])}, //THREE_TOKEN
	            {min_val: 4, length: 0, probs: new Uint8Array([0, 0, 0, 0, 0, 0,
	                    0, 0, 0, 0, 0, 0])}, //FOUR_TOKEN
	            {min_val: 5, length: 0, probs: new Uint8Array([159, 0, 0, 0, 0, 0,
	                    0, 0, 0, 0, 0, 0])}, //DCT_VAL_CATEGORY1
	            {min_val: 7, length: 1, probs: new Uint8Array([145, 165, 0, 0, 0, 0,
	                    0, 0, 0, 0, 0, 0])}, //DCT_VAL_CATEGORY2
	            {min_val: 11, length: 2, probs: new Uint8Array([140, 148, 173, 0, 0, 0,
	                    0, 0, 0, 0, 0, 0])}, //DCT_VAL_CATEGORY3
	            {min_val: 19, length: 3, probs: new Uint8Array([135, 140, 155, 176, 0, 0,
	                    0, 0, 0, 0, 0, 0])}, //DCT_VAL_CATEGORY4
	            {min_val: 35, length: 4, probs: new Uint8Array([130, 134, 141, 157, 180, 0,
	                    0, 0, 0, 0, 0, 0])}, //DCT_VAL_CATEGORY5
	            {min_val: 67, length: 10, probs: new Uint8Array([129, 130, 133, 140, 153, 177,
	                    196, 230, 243, 254, 254, 0])}, //DCT_VAL_CATEGORY6
	            {min_val: 0, length: -1, probs: new Uint8Array([0, 0, 0, 0, 0, 0,
	                    0, 0, 0, 0, 0, 0])} // EOB TOKEN
	        ];

	var zigzag = new Uint32Array([
	    0, 1, 4, 8, 5, 2, 3, 6, 9, 12, 13, 10, 7, 11, 14, 15
	]);

	var BLOCK_LOOP = 0, DO_WHILE = 1, CHECK_0_ = 2, CAT_FIVE_CONTEXT_NODE_0_ = 3, CAT_THREEFOUR_CONTEXT_NODE_0_ = 4, CAT_THREE_CONTEXT_NODE_0_ = 5, HIGH_LOW_CONTEXT_NODE_0_ = 6, CAT_ONE_CONTEXT_NODE_0_ = 7, LOW_VAL_CONTEXT_NODE_0_ = 8, THREE_CONTEXT_NODE_0_ = 9, TWO_CONTEXT_NODE_0_ = 10, ONE_CONTEXT_NODE_0_ = 11, BLOCK_FINISHED = 12, END = 13;


	var i = 0, stopp = 0, type = 0;
	var c = 0, t = 0, v = 0;
	var val = 0, bits_count = 0;
	var eob_mask = 0;
	var b_tokens = 0;
	var b_tokens_off = 0;//*   /* tokens for this block */
	var type_probs = 0;
	var type_probs_off = 0;//* /* probabilities for this block type */
	var prob = 0;
	var prob_off = 0;//*
	var dqf = 0;
	var global_bool;
	var goto_;

	function DECODE_AND_APPLYSIGN(value_to_sign) {

	    if (vpx_read_bit(global_bool) === 1) {
	        v = -value_to_sign * dqf[(!!c) + 0];
	    } else {
	        v = value_to_sign * dqf[(!!c) + 0];
	    }
	}

	function DECODE_AND_BRANCH_IF_ZERO(probability, branch) {
	    if (!vpx_read(global_bool, probability)) {
	        goto_ = branch;
	        return 1;
	    }
	}

	function DECODE_EXTRABIT_AND_ADJUST_VAL(t, bits_count) {
	    val += vpx_read(global_bool, extrabits[t].probs[bits_count]) << bits_count;
	}


	function DECODE_AND_LOOP_IF_ZERO(probability, branch) {
	    if (!vpx_read(global_bool, probability))
	    {
	        prob_off = type_probs_off;
	        if (c < 15) {
	            ++c;
	            prob_off += bands_x[c] | 0;
	            goto_ = branch;
	            return 1;
	        } else {
	            goto_ = BLOCK_FINISHED;
	            return 1; /*for malformed input */
	        }
	    }
	}

	function DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) {
	    DECODE_AND_APPLYSIGN(val);
	    prob_off = type_probs_off + 22;//(ENTROPY_NODES * 2)
	    if (c < 15) {
	        b_tokens[b_tokens_off + zigzag[c]] = v;
	        ++c;
	        goto_ = DO_WHILE;
	        return 1;
	    }
	    b_tokens[b_tokens_off + zigzag[15]] = v;
	    goto_ = BLOCK_FINISHED;
	    return 1;
	}


	function decode_mb_tokens(bool, left,
	        above,
	        tokens,
	        tokens_off,
	        mode,
	        probs, factor) {

	    global_bool = bool;









	    //*

	    eob_mask = 0;

	    if (mode !== B_PRED && mode !== SPLITMV)
	    {
	        i = 24;
	        stopp = 24;
	        type = 1;
	        b_tokens = tokens;
	        b_tokens_off = tokens_off + 384;
	        dqf = factor[TOKEN_BLOCK_Y2];
	    } else {
	        i = 0;
	        stopp = 16;
	        type = 3;
	        b_tokens = tokens;
	        b_tokens_off = tokens_off;
	        dqf = factor[TOKEN_BLOCK_Y1];
	    }

	    /* Save a pointer to the coefficient probs for the current type.
	     * Need to repeat this whenever type changes.
	     */
	    type_probs = probs; /*[type][0][0];*/
	    type_probs_off = type * 264; //COEF_BANDS * PREV_COEF_CONTEXTS * ENTROPY_NODES; //8 * 3 * 11

	    goto_ = BLOCK_LOOP;
	    do {
	        if (goto_ === BLOCK_LOOP) {
	            t = left[vp8_block2left[i]] + above[vp8_block2above[i]];
	            c = (!type) + 0; /* all blocks start at 0 except type 0, which starts
	             * at 1. */

	            prob = type_probs;
	            prob_off = type_probs_off;
	            prob_off += t * ENTROPY_NODES;

	            goto_ = DO_WHILE;
	        }
	        if (goto_ === DO_WHILE) {
	            prob_off += bands_x[c];
	            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + EOB_CONTEXT_NODE], BLOCK_FINISHED))
	                continue;

	            goto_ = CHECK_0_;
	        }
	        if (goto_ === CHECK_0_) {
	            if (DECODE_AND_LOOP_IF_ZERO(prob[prob_off + ZERO_CONTEXT_NODE], CHECK_0_) === 1)
	                continue;
	            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + ONE_CONTEXT_NODE],
	                    ONE_CONTEXT_NODE_0_) === 1)
	                continue;
	            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + LOW_VAL_CONTEXT_NODE],
	                    LOW_VAL_CONTEXT_NODE_0_) === 1)
	                continue;
	            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + HIGH_LOW_CONTEXT_NODE],
	                    HIGH_LOW_CONTEXT_NODE_0_) === 1)
	                continue;
	            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + CAT_THREEFOUR_CONTEXT_NODE],
	                    CAT_THREEFOUR_CONTEXT_NODE_0_) === 1)
	                continue;
	            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + CAT_FIVE_CONTEXT_NODE],
	                    CAT_FIVE_CONTEXT_NODE_0_) === 1)
	                continue;
	            val = extrabits[DCT_VAL_CATEGORY6].min_val;
	            bits_count = extrabits[DCT_VAL_CATEGORY6].length;

	            do
	            {
	                DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY6, bits_count);
	                bits_count--;
	            } while (bits_count >= 0);

	            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) === 1)
	                continue;

	        }
	        if (goto_ === CAT_FIVE_CONTEXT_NODE_0_) {
	            val = extrabits[DCT_VAL_CATEGORY5].min_val;
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 4);
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 3);
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 2);
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 1);
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 0);
	            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) === 1)
	                continue;

	        }
	        if (goto_ === CAT_THREEFOUR_CONTEXT_NODE_0_) {
	            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + CAT_THREE_CONTEXT_NODE],
	                    CAT_THREE_CONTEXT_NODE_0_) === 1)
	                continue;
	            val = extrabits[DCT_VAL_CATEGORY4].min_val;
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY4, 3);
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY4, 2);
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY4, 1);
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY4, 0);
	            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) === 1)
	                continue;

	        }
	        if (goto_ === CAT_THREE_CONTEXT_NODE_0_) {
	            val = extrabits[DCT_VAL_CATEGORY3].min_val;
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY3, 2);
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY3, 1);
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY3, 0);
	            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) === 1)
	                continue;

	        }
	        if (goto_ === HIGH_LOW_CONTEXT_NODE_0_) {
	            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + CAT_ONE_CONTEXT_NODE],
	                    CAT_ONE_CONTEXT_NODE_0_) === 1)
	                continue;

	            val = extrabits[DCT_VAL_CATEGORY2].min_val;
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY2, 1);
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY2, 0);
	            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) === 1)
	                continue;

	        }
	        if (goto_ === CAT_ONE_CONTEXT_NODE_0_) {
	            val = extrabits[DCT_VAL_CATEGORY1].min_val;
	            DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY1, 0);
	            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) === 1)
	                continue;

	        }
	        if (goto_ === LOW_VAL_CONTEXT_NODE_0_) {
	            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + TWO_CONTEXT_NODE],
	                    TWO_CONTEXT_NODE_0_))
	                continue;
	            if (DECODE_AND_BRANCH_IF_ZERO(prob[prob_off + THREE_CONTEXT_NODE],
	                    THREE_CONTEXT_NODE_0_))
	                continue;
	            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(4))
	                continue;

	        }
	        if (goto_ === THREE_CONTEXT_NODE_0_) {
	            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(3))
	                continue;

	        }
	        if (goto_ === TWO_CONTEXT_NODE_0_) {
	            if (DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(2))
	                continue;

	        }
	        if (goto_ === ONE_CONTEXT_NODE_0_) {
	            DECODE_AND_APPLYSIGN(1);
	            prob_off = type_probs_off + ENTROPY_NODES;

	            if (c < 15)
	            {
	                b_tokens[b_tokens_off + zigzag[c]] = v;
	                ++c;
	                goto_ = DO_WHILE;
	                continue;
	            }

	            b_tokens[b_tokens_off + zigzag[15]] = v;
	            goto_ = BLOCK_FINISHED;
	        }
	        if (goto_ === BLOCK_FINISHED) {
	            eob_mask = (eob_mask | ((c > 1) + 0 << i)) >>> 0;
	            t = (c != !type) + 0;   // any nonzero data?
	            eob_mask = (eob_mask | (t << 31)) >>> 0;//intBitLeft(t , 31);

	            left[vp8_block2left[i]] = above[vp8_block2above[i]] = t;
	            b_tokens_off += 16;

	            i++;

	            if (i < stopp) {
	                goto_ = BLOCK_LOOP;
	                continue;
	            }

	            if (i === 25)
	            {
	                type = 0;
	                i = 0;
	                stopp = 16;
	                type_probs_off = type << 8;//type_probs = probs[type][0][0]; //COEF_BANDS * PREV_COEF_CONTEXTS * ENTROPY_NODES
	                b_tokens_off = tokens_off;
	                dqf = factor[TOKEN_BLOCK_Y1];
	                goto_ = BLOCK_LOOP;
	                continue;
	            }

	            if (i === 16)
	            {
	                type = 2;
	                type_probs_off = type * 264;//type_probs = probs[type][0][0];
	                stopp = 24;
	                dqf = factor[TOKEN_BLOCK_UV];
	                goto_ = BLOCK_LOOP;
	                continue;
	            }
	        }
	        goto_ = END;
	    } while (goto_ !== END);

	    return eob_mask;
	}

	module.exports = {};
	module.exports.decode_mb_tokens = decode_mb_tokens;
	module.exports.vp8_reset_mb_tokens_context = vp8_reset_mb_tokens_context;

/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';

	var MV_PROB_CNT = 19;

	function copy_entropy_values(header, otherHeader) {

	    var probs = otherHeader.coeff_probs.data_32;
	    var to = header.coeff_probs.data_32;
	    //header.coeff_probs = otherHeader.coeff_probs.slice(0);
	    for (var i = 0; i < 264; i++)
	        to[i] = probs[i];

	    //load mv probs
	    probs = otherHeader.mv_probs;
	    //header can probably be done faster
	    for (var i = 0; i < MV_PROB_CNT; i++)
	        header.mv_probs[0][i] = probs[0][i];

	    for (var i = 0; i < MV_PROB_CNT; i++)
	        header.mv_probs[1][i] = probs[1][i];

	    //load y mode probs
	    probs = otherHeader.y_mode_probs_32;
	    header.y_mode_probs_32[0] = probs[0];



	    //load uv mode probs
	    probs = otherHeader.uv_mode_probs;
	    //for (var i = 0; i < 3; i++)
	    header.uv_mode_probs[0] = probs[0];
	    header.uv_mode_probs[1] = probs[1];
	    header.uv_mode_probs[2] = probs[2];


	    header.prob_inter = otherHeader.prob_inter;
	    header.prob_last = otherHeader.prob_inter;
	    header.prob_gf = otherHeader.prob_inter;
	}

	function memset(ptr, ptr_off, value, num) {

	    var i = num;
	    while (i--)
	        ptr[ptr_off + i] = value;
	        
	}

	function memset_32(ptr, ptr_off, value, num) {

	    var i = num;//>> 2;
	    var ptr_off_32 = ptr_off >> 2;
	    var ptr_32 = ptr.data_32;
	    var value_32 = value | value << 8 | value << 16 | value << 24;

	    var num_32 = num >> 2;
	    for (var i = 0; i < num_32; i++) {
	        ptr_32[ptr_off_32 + (i >> 2)] = value_32;
	    }

	}

	function memcpy(dst, dst_off, src, src_off, num) {
	    dst.set(src.subarray(src_off, src_off + num) , dst_off);
	    /*
	    var i = num;
	    while (i--) {
	        dst[dst_off + i] = src[src_off + i];
	    }
	    */
	    return dst;

	}


	module.exports = {};
	module.exports.copy_entropy_values = copy_entropy_values;
	module.exports.memset = memset;
	module.exports.memset_32 = memset_32;
	module.exports.memcpy = memcpy;


/***/ },
/* 80 */
/***/ function(module, exports) {

	'use strict';


	//k_mv_entropy_update_probs
	var vp8_mv_update_probs =
	        [
	            new Uint8Array([
	                237,
	                246,
	                253, 253, 254, 254, 254, 254, 254,
	                254, 254, 254, 254, 254, 250, 250, 252, 254, 254
	            ]),
	            new Uint8Array([
	                231,
	                243,
	                245, 253, 254, 254, 254, 254, 254,
	                254, 254, 254, 254, 254, 251, 251, 254, 254, 254
	            ])
	        ];


	//k_default_mv_probs
	var vp8_default_mv_context =
	        [
	            new Uint8Array([// row
	                162, // is short
	                128, // sign
	                225, 146, 172, 147, 214, 39, 156, // short tree
	                128, 129, 132, 75, 145, 178, 206, 239, 254, 254 // long bits
	            ]),
	            new Uint8Array([
	                164,
	                128,
	                204, 170, 119, 235, 140, 230, 228,
	                128, 130, 130, 74, 148, 180, 203, 236, 254, 254

	            ])
	        ];



	module.exports = {};
	module.exports.vp8_mv_update_probs = vp8_mv_update_probs;
	module.exports.vp8_default_mv_context = vp8_default_mv_context;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var default_coef_probs = __webpack_require__(82);
	var default_coef_probs_32 = default_coef_probs.data_32;
	var default_coef_probs_64 = default_coef_probs.data_64;

	function vp8_default_coef_probs(pc) {

	    //for (var i = 0; i < 1056; i++)
	    //pc.entropy_hdr.coeff_probs[i] = default_coef_probs[i];

	/*
	    var to = pc.entropy_hdr.coeff_probs.data_32;
	    for (var i = 0; i < 264; i++)
	        to[i] = default_coef_probs_32[i];
	     */
	    pc.entropy_hdr.coeff_probs.data_64.set(default_coef_probs_64);
	    /*
	    var to = pc.entropy_hdr.coeff_probs.data_64;
	    for (var i = 0; i < 132; i++)
	        to[i] = default_coef_probs_64[i];
	      */
	}

	module.exports = {
	    vp8_default_coef_probs : vp8_default_coef_probs
	};

/***/ },
/* 82 */
/***/ function(module, exports) {

	'use strict';
	var default_coef_probs = new Uint8Array([128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 253, 136, 254, 255, 228, 219, 128, 128, 128, 128, 128, 189, 129, 242, 255, 227, 213, 255, 219, 128, 128, 128, 106, 126, 227, 252, 214, 209, 255, 255, 128, 128, 128, 1, 98, 248, 255, 236, 226, 255, 255, 128, 128, 128, 181, 133, 238, 254, 221, 234, 255, 154, 128, 128, 128, 78, 134, 202, 247, 198, 180, 255, 219, 128, 128, 128, 1, 185, 249, 255, 243, 255, 128, 128, 128, 128, 128, 184, 150, 247, 255, 236, 224, 128, 128, 128, 128, 128, 77, 110, 216, 255, 236, 230, 128, 128, 128, 128, 128, 1, 101, 251, 255, 241, 255, 128, 128, 128, 128, 128, 170, 139, 241, 252, 236, 209, 255, 255, 128, 128, 128, 37, 116, 196, 243, 228, 255, 255, 255, 128, 128, 128, 1, 204, 254, 255, 245, 255, 128, 128, 128, 128, 128, 207, 160, 250, 255, 238, 128, 128, 128, 128, 128, 128, 102, 103, 231, 255, 211, 171, 128, 128, 128, 128, 128, 1, 152, 252, 255, 240, 255, 128, 128, 128, 128, 128, 177, 135, 243, 255, 234, 225, 128, 128, 128, 128, 128, 80, 129, 211, 255, 194, 224, 128, 128, 128, 128, 128, 1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 246, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 255, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 198, 35, 237, 223, 193, 187, 162, 160, 145, 155, 62, 131, 45, 198, 221, 172, 176, 220, 157, 252, 221, 1, 68, 47, 146, 208, 149, 167, 221, 162, 255, 223, 128, 1, 149, 241, 255, 221, 224, 255, 255, 128, 128, 128, 184, 141, 234, 253, 222, 220, 255, 199, 128, 128, 128, 81, 99, 181, 242, 176, 190, 249, 202, 255, 255, 128, 1, 129, 232, 253, 214, 197, 242, 196, 255, 255, 128, 99, 121, 210, 250, 201, 198, 255, 202, 128, 128, 128, 23, 91, 163, 242, 170, 187, 247, 210, 255, 255, 128, 1, 200, 246, 255, 234, 255, 128, 128, 128, 128, 128, 109, 178, 241, 255, 231, 245, 255, 255, 128, 128, 128, 44, 130, 201, 253, 205, 192, 255, 255, 128, 128, 128, 1, 132, 239, 251, 219, 209, 255, 165, 128, 128, 128, 94, 136, 225, 251, 218, 190, 255, 255, 128, 128, 128, 22, 100, 174, 245, 186, 161, 255, 199, 128, 128, 128, 1, 182, 249, 255, 232, 235, 128, 128, 128, 128, 128, 124, 143, 241, 255, 227, 234, 128, 128, 128, 128, 128, 35, 77, 181, 251, 193, 211, 255, 205, 128, 128, 128, 1, 157, 247, 255, 236, 231, 255, 255, 128, 128, 128, 121, 141, 235, 255, 225, 227, 255, 255, 128, 128, 128, 45, 99, 188, 251, 195, 217, 255, 224, 128, 128, 128, 1, 1, 251, 255, 213, 255, 128, 128, 128, 128, 128, 203, 1, 248, 255, 255, 128, 128, 128, 128, 128, 128, 137, 1, 177, 255, 224, 255, 128, 128, 128, 128, 128, 253, 9, 248, 251, 207, 208, 255, 192, 128, 128, 128, 175, 13, 224, 243, 193, 185, 249, 198, 255, 255, 128, 73, 17, 171, 221, 161, 179, 236, 167, 255, 234, 128, 1, 95, 247, 253, 212, 183, 255, 255, 128, 128, 128, 239, 90, 244, 250, 211, 209, 255, 255, 128, 128, 128, 155, 77, 195, 248, 188, 195, 255, 255, 128, 128, 128, 1, 24, 239, 251, 218, 219, 255, 205, 128, 128, 128, 201, 51, 219, 255, 196, 186, 128, 128, 128, 128, 128, 69, 46, 190, 239, 201, 218, 255, 228, 128, 128, 128, 1, 191, 251, 255, 255, 128, 128, 128, 128, 128, 128, 223, 165, 249, 255, 213, 255, 128, 128, 128, 128, 128, 141, 124, 248, 255, 255, 128, 128, 128, 128, 128, 128, 1, 16, 248, 255, 255, 128, 128, 128, 128, 128, 128, 190, 36, 230, 255, 236, 255, 128, 128, 128, 128, 128, 149, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 1, 226, 255, 128, 128, 128, 128, 128, 128, 128, 128, 247, 192, 255, 128, 128, 128, 128, 128, 128, 128, 128, 240, 128, 255, 128, 128, 128, 128, 128, 128, 128, 128, 1, 134, 252, 255, 255, 128, 128, 128, 128, 128, 128, 213, 62, 250, 255, 255, 128, 128, 128, 128, 128, 128, 55, 93, 255, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 202, 24, 213, 235, 186, 191, 220, 160, 240, 175, 255, 126, 38, 182, 232, 169, 184, 228, 174, 255, 187, 128, 61, 46, 138, 219, 151, 178, 240, 170, 255, 216, 128, 1, 112, 230, 250, 199, 191, 247, 159, 255, 255, 128, 166, 109, 228, 252, 211, 215, 255, 174, 128, 128, 128, 39, 77, 162, 232, 172, 180, 245, 178, 255, 255, 128, 1, 52, 220, 246, 198, 199, 249, 220, 255, 255, 128, 124, 74, 191, 243, 183, 193, 250, 221, 255, 255, 128, 24, 71, 130, 219, 154, 170, 243, 182, 255, 255, 128, 1, 182, 225, 249, 219, 240, 255, 224, 128, 128, 128, 149, 150, 226, 252, 216, 205, 255, 171, 128, 128, 128, 28, 108, 170, 242, 183, 194, 254, 223, 255, 255, 128, 1, 81, 230, 252, 204, 203, 255, 192, 128, 128, 128, 123, 102, 209, 247, 188, 196, 255, 233, 128, 128, 128, 20, 95, 153, 243, 164, 173, 255, 203, 128, 128, 128, 1, 222, 248, 255, 216, 213, 128, 128, 128, 128, 128, 168, 175, 246, 252, 235, 205, 255, 255, 128, 128, 128, 47, 116, 215, 255, 211, 212, 255, 255, 128, 128, 128, 1, 121, 236, 253, 212, 214, 255, 255, 128, 128, 128, 141, 84, 213, 252, 201, 202, 255, 219, 128, 128, 128, 42, 80, 160, 240, 162, 185, 255, 205, 128, 128, 128, 1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 244, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 238, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128]);
	default_coef_probs.data_32 = new Uint32Array(default_coef_probs.buffer);
	default_coef_probs.data_64 = new Float64Array(default_coef_probs.buffer);

	module.exports = default_coef_probs;



/***/ },
/* 83 */
/***/ function(module, exports) {

	'use strict';

	var dc_qlookup =
	        new Int32Array([
	            4, 5, 6, 7, 8, 9, 10, 10,
	            11, 12, 13, 14, 15, 16, 17, 17,
	            18, 19, 20, 20, 21, 21, 22, 22,
	            23, 23, 24, 25, 25, 26, 27, 28,
	            29, 30, 31, 32, 33, 34, 35, 36,
	            37, 37, 38, 39, 40, 41, 42, 43,
	            44, 45, 46, 46, 47, 48, 49, 50,
	            51, 52, 53, 54, 55, 56, 57, 58,
	            59, 60, 61, 62, 63, 64, 65, 66,
	            67, 68, 69, 70, 71, 72, 73, 74,
	            75, 76, 76, 77, 78, 79, 80, 81,
	            82, 83, 84, 85, 86, 87, 88, 89,
	            91, 93, 95, 96, 98, 100, 101, 102,
	            104, 106, 108, 110, 112, 114, 116, 118,
	            122, 124, 126, 128, 130, 132, 134, 136,
	            138, 140, 143, 145, 148, 151, 154, 157
	        ]);

	var dc_qlookup2 =
	        new Int32Array([
	            4, 5, 6, 7, 8, 9, 10, 10,
	            11, 12, 13, 14, 15, 16, 17, 17,
	            18, 19, 20, 20, 21, 21, 22, 22,
	            23, 23, 24, 25, 25, 26, 27, 28,
	            29, 30, 31, 32, 33, 34, 35, 36,
	            37, 37, 38, 39, 40, 41, 42, 43,
	            44, 45, 46, 46, 47, 48, 49, 50,
	            51, 52, 53, 54, 55, 56, 57, 58,
	            59, 60, 61, 62, 63, 64, 65, 66,
	            67, 68, 69, 70, 71, 72, 73, 74,
	            75, 76, 76, 77, 78, 79, 80, 81,
	            82, 83, 84, 85, 86, 87, 88, 89,
	            91, 93, 95, 96, 98, 100, 101, 102,
	            104, 106, 108, 110, 112, 114, 116, 118,
	            122, 124, 126, 128, 130, 132, 132, 132,
	            132, 132, 132, 132, 132, 132, 132, 132
	        ]);

	var dc_qlookup3 =
	        new Int32Array([8,10,12,14,16,18,20,20,22,24,26,28,30,32,34,34,36,38,40,40,42,42,44,44,46,46,48,50,50,52,54,56,58,60,62,64,66,68,70,72,74,74,76,78,80,82,84,86,88,90,92,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,140,142,144,146,148,150,152,152,154,156,158,160,162,164,166,168,170,172,174,176,178,182,186,190,192,196,200,202,204,208,212,216,220,224,228,232,236,244,248,252,256,260,264,268,272,276,280,286,290,296,302,308,314]);
	//ac_q_lookup
	var ac_qlookup =
	        new Int32Array([
	            4, 5, 6, 7, 8, 9, 10, 11,
	            12, 13, 14, 15, 16, 17, 18, 19,
	            20, 21, 22, 23, 24, 25, 26, 27,
	            28, 29, 30, 31, 32, 33, 34, 35,
	            36, 37, 38, 39, 40, 41, 42, 43,
	            44, 45, 46, 47, 48, 49, 50, 51,
	            52, 53, 54, 55, 56, 57, 58, 60,
	            62, 64, 66, 68, 70, 72, 74, 76,
	            78, 80, 82, 84, 86, 88, 90, 92,
	            94, 96, 98, 100, 102, 104, 106, 108,
	            110, 112, 114, 116, 119, 122, 125, 128,
	            131, 134, 137, 140, 143, 146, 149, 152,
	            155, 158, 161, 164, 167, 170, 173, 177,
	            181, 185, 189, 193, 197, 201, 205, 209,
	            213, 217, 221, 225, 229, 234, 239, 245,
	            249, 254, 259, 264, 269, 274, 279, 284
	        ]);

	var ac_qlookup2 = new Int32Array([8,8,9,10,12,13,15,17,18,20,21,23,24,26,27,29,31,32,34,35,37,38,40,41,43,44,46,48,49,51,52,54,55,57,58,60,62,63,65,66,68,69,71,72,74,75,77,79,80,82,83,85,86,88,89,93,96,99,102,105,108,111,114,117,120,124,127,130,133,136,139,142,145,148,151,155,158,161,164,167,170,173,176,179,184,189,193,198,203,207,212,217,221,226,230,235,240,244,249,254,258,263,268,274,280,286,292,299,305,311,317,323,330,336,342,348,354,362,370,379,385,393,401,409,416,424,432,440]);


	function vp8_dc_quant(QIndex, Delta) {
	    var retval = 0;

	    QIndex = QIndex + Delta;

	    if (QIndex > 127) {
	        return 157;
	    } else if (QIndex < 0) {
	        return 4;
	    }

	    return dc_qlookup[QIndex];
	}

	function vp8_dc2quant(QIndex, Delta) {
	    var retval = 0;

	    QIndex = QIndex + Delta;

	    if (QIndex > 127) {
	        return 314;
	    } else if (QIndex < 0) {
	        return 8;
	    }

	    retval = dc_qlookup3[QIndex];
	    return retval;
	}

	function vp8_dc_uv_quant(QIndex, Delta) {
	    var retval = 0;

	    QIndex = QIndex + Delta;

	    if (QIndex > 127) {
	        return 132;
	    } else if (QIndex < 0) {
	        return 4;
	    }

	    return dc_qlookup2[QIndex];
	}

	function vp8_ac_yquant(QIndex) {
	    var retval = 0;

	    if (QIndex > 127) {
	        return 284;
	    } else if (QIndex < 0) {
	        return 4;
	    }

	    return ac_qlookup[QIndex];
	}

	function vp8_ac2quant(QIndex, Delta) {
	    var retval = 0;

	    QIndex = QIndex + Delta;

	    if (QIndex > 127) {
	        return 440;
	    } else if (QIndex < 0) {
	        return 8;
	    }
	    
	    return ac_qlookup2[QIndex];
	}

	function vp8_ac_uv_quant(QIndex, Delta) {
	    var retval = 0;

	    QIndex = QIndex + Delta;

	    if (QIndex > 127) {
	        return 284;
	    } else if (QIndex < 0) {
	        return 4;
	    }

	    return ac_qlookup[QIndex];
	}


	module.exports = {};
	module.exports.vp8_dc_quant = vp8_dc_quant;
	module.exports.vp8_dc2quant = vp8_dc2quant;
	module.exports.vp8_dc_uv_quant = vp8_dc_uv_quant;
	module.exports.vp8_ac_yquant = vp8_ac_yquant;
	module.exports.vp8_ac2quant = vp8_ac2quant;
	module.exports.vp8_ac_uv_quant = vp8_ac_uv_quant;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var MotionVector = __webpack_require__(72);

	var filter = __webpack_require__(85);
	var filter_block2d = filter.filter_block2d;

	var SPLITMV = 9;

	var idctllm = __webpack_require__(86);
	var vp8_short_inv_walsh4x4_c = idctllm.vp8_short_inv_walsh4x4_c;
	var vp8_short_idct4x4llm_c = idctllm.vp8_short_idct4x4llm_c;

	var c_utils = __webpack_require__(79);
	var memset = c_utils.memset;
	var memcpy = c_utils.memcpy;




	//Keep from having to redeclare this
	var chroma_mv = [
	        MotionVector.create(),
	        MotionVector.create(),
	        MotionVector.create(),
	        MotionVector.create()
	    ];
	    
	    
	    //build_inter_predictors4b
	function predict_inter_emulated_edge(ctx,
	        img, coeffs, coeffs_off, mbi, mb_col, mb_row) {


	    var emul_block = ctx.frame_strg[0].img.img_data;
	    var emul_block_off = ctx.frame_strg[0].img.img_data_off;
	    
	    var reference = 0;
	    var reference_off = 0;
	    var output = 0;
	    var output_off = 0;
	    var reference_offset = 0;
	    var w = 0, h = 0, x = 0, y = 0, b = 0;

	    

	    var ref_frame = mbi.mbmi.ref_frame;
	    
	    var u = img.u, v = img.v;
	    var u_off = img.u_off;
	    var v_off = img.v_off;
	    var full_pixel = (ctx.common.version === 3) + 0;

	    x = mb_col << 4;
	    y = mb_row << 4;
	    w = ctx.mb_cols << 4;
	    h = ctx.mb_rows << 4;

	    output = img.y;
	    output_off = img.y_off;

	    reference_off = output_off + reference_offset;
	    var mode = mbi.mbmi.y_mode;
	    var mvs = mbi.bmi.mvs;

	    reference_offset = ctx.ref_frame_offsets[ref_frame];
	    reference = ctx.ref_frame_offsets_[ref_frame];
	    
	 

	    // Luma 
	    for (b = 0; b < 16; b++) {
	        
	        var ymv;

	        if (mode !== SPLITMV)
	            ymv = mbi.mbmi.mv;
	        else
	            ymv = mvs[b];

	        recon_1_edge_block(output, output_off, emul_block, emul_block_off, reference, reference_off, img.stride,
	                ymv, ctx.subpixel_filters,
	                coeffs, coeffs_off, mbi, x, y, w, h, b);

	        x += 4;
	        output_off += 4;
	        reference_off += 4;

	        if ((b & 3) === 3) {
	            x -= 16;
	            y += 4;
	            output_off += (img.stride << 2) - 16;
	            reference_off += (img.stride << 2)  - 16;
	        }
	        
	    }

	    x = mb_col << 4;
	    y = mb_row << 4;

	    // Chroma 
	    x >>= 1;
	    y >>= 1;
	    w >>= 1;
	    h >>= 1;

	    //if (mbi.mbmi.y_mode !== SPLITMV)
	    //{
	    var uv_stride_4_8 = 4 * img.uv_stride - 8;
	    
	    for (b = 0; b < 4; b++) {

	        recon_1_edge_block(u, u_off, emul_block, emul_block_off, reference, u_off + reference_offset, //u
	                img.uv_stride,
	                chroma_mv[b], ctx.subpixel_filters,
	                coeffs, coeffs_off, mbi, x, y, w, h, b + 16);


	        recon_1_edge_block(v, v_off, emul_block, emul_block_off, reference, v_off + reference_offset, //v
	                img.uv_stride,
	                chroma_mv[b], ctx.subpixel_filters,
	                coeffs, coeffs_off, mbi, x, y, w, h, b + 20);


	        u_off += 4;
	        v_off += 4;
	        x += 4;

	        if ((b & 1) === 1) {
	            x -= 8;
	            y += 4;
	            u_off += uv_stride_4_8;
	            v_off += uv_stride_4_8;
	        }

	    }
	    //}

	}



	function build_4x4uvmvs(mbi, full_pixel) {
	    var mvs = mbi.bmi.mvs;
	    for (var i = 0; i < 2; ++i) {
	        for (var j = 0; j < 2; ++j) {

	            var b = (i << 3) + (j  << 1);
	            var chroma_ptr = (i << 1) + j;
	            var chroma_mv_cache = chroma_mv[chroma_ptr];
	            
	            var temp = 0;

	            

	            temp = mvs[b].as_row_col[0] +
	                    mvs[b + 1].as_row_col[0] +
	                    mvs[b + 4].as_row_col[0] +
	                    mvs[b + 5].as_row_col[0];

	            if (temp < 0)
	                temp -= 4;
	            else
	                temp += 4;

	            chroma_mv_cache.as_row_col[0] = (temp / 8 ) | 0;

	            temp = mvs[b].as_row_col[1] +
	                    mvs[b + 1].as_row_col[1] +
	                    mvs[b + 4].as_row_col[1] +
	                    mvs[b + 5].as_row_col[1];

	            if (temp < 0)
	                temp -= 4;
	            else
	                temp += 4;

	            chroma_mv_cache.as_row_col[1] = (temp / 8) | 0;

	            if (full_pixel === 1) {
	                chroma_mv_cache.as_int[0] &= 0xFFF8FFF8;

	            }


	        }
	    }
	}




	function build_mc_border(dst, dst_off, src, src_off, stride, x, y, b_w, b_h, w, h) {
	    var ref_row = 0;
	    var ref_row_off = 0;
	    
	    /* Get a pointer to the start of the real data for this row */
	    ref_row = src;
	    ref_row_off = src_off - x - y * stride;

	    if (y >= h)
	        ref_row_off += (h - 1) * stride;
	    else if (y > 0)
	        ref_row_off += y * stride;

	    do {
	        var left = 0, right = 0, copy = 0;


	        if (x < 0) {
	            left = -x;
	        } else {
	            left = 0;
	        }

	        if (left > b_w)
	            left = b_w;

	        if (x + b_w > w)
	            right = x + b_w - w;

	        if (right > b_w)
	            right = b_w;

	        copy = b_w - left - right;
	        
	        if (left > 0)
	            memset(dst, dst_off, ref_row[ref_row_off], left);

	        if (copy > 0)
	            memcpy(dst, dst_off + left, ref_row, ref_row_off + x + left, copy);

	        if (right > 0)
	            memset(dst, dst_off + left + copy, ref_row[ref_row_off + w - 1], right);

	        dst_off += stride;
	        y++;

	        if (y < h && y > 0)
	            ref_row_off += stride;
	    } while (--b_h);
	}

	var uvmv = MotionVector.create();

	function predict_inter(ctx, img, coeffs, coeffs_off, mbi) {
	    var y, u , v;
	    var y = u = v =  img.y;
	    var y_off = img.y_off;
	    var u_off = img.u_off;
	    var v_off = img.v_off;
	    var reference;
	    var reference_offset = 0;

	    var full_pixel = (ctx.common.version === 3) + 0;
	    var b = 0;

	    var mbmi_cache = mbi.mbmi;
	    var mode = mbmi_cache.y_mode;
	    

	    reference_offset = ctx.ref_frame_offsets[mbi.mbmi.ref_frame];
	    reference = ctx.ref_frame_offsets_[mbi.mbmi.ref_frame];
	    var stride = img.stride;
	    var subpixel_filters = ctx.subpixel_filters;

	    var mvs = mbi.bmi.mvs;
	    for (b = 0; b < 16; b++) {
	        var ymv;

	        if (mode !== SPLITMV)
	            ymv = mbmi_cache.mv;
	        else
	            ymv = mvs[b];


	        recon_1_block(y, y_off, reference, y_off + reference_offset, stride, //y
	                ymv, subpixel_filters, coeffs, coeffs_off, mbi, b);
	        y_off += 4;

	        if ((b & 3) === 3)
	            y_off += (img.stride << 2) - 16;
	    }

	    var uv_stride = img.uv_stride;
	    
	    for (b = 0; b < 4; b++) {

	        
	        recon_1_block(u, u_off, reference, u_off + reference_offset, //u
	                uv_stride, chroma_mv[b],
	                subpixel_filters, coeffs, coeffs_off, mbi, b + 16);

	        recon_1_block(v, v_off, reference, v_off + reference_offset, //v
	                uv_stride, chroma_mv[b],
	                subpixel_filters, coeffs, coeffs_off, mbi, b + 20);

	        u_off += 4;
	        v_off += 4;

	        if ((b & 1) === 1)
	        {
	            u_off += (uv_stride << 2) - 8;
	            v_off += (uv_stride << 2) - 8;
	        }

	    }
	    
	    

	}


	//build_inter_predictors2b
	function recon_1_block(output, output_off, reference, reference_off, stride, mv, filters, coeffs, coeffs_off, mbi, b) {
	    var predict = reference;
	    var predict_off = reference_off;
	    var mx = 0, my = 0;

	    if (mv.as_int[0]) {

	        mx = mv.as_row_col[0] & 7;
	        my = mv.as_row_col[1] & 7;

	        reference_off += ((mv.as_row_col[1] >> 3) * stride) + (mv.as_row_col[0] >> 3);



	        filter_block2d(output, output_off, stride, reference, reference_off, stride, 4, 4, mx, my,
	                filters);

	        predict = output;
	        predict_off = output_off;


	    } else {
	        predict_off = reference_off;
	    }

	    vp8_short_idct4x4llm_c(output, output_off, predict, predict_off, stride, coeffs, coeffs_off + 16 * b);

	}

	function recon_1_edge_block(output, output_off,
	        emul_block, emul_block_off, reference, reference_off, stride, mv_, filters, coeffs,
	        coeffs_off, mbi, x, y, w, h, start_b) {
	            
	    var predict = reference;
	    var predict_off = reference_off;
	    var b = start_b;
	    var b_w = 4;
	    var b_h = 4;
	    var mx = 0, my = 0;

	    x += mv_.as_row_col[0] >> 3;
	    y += mv_.as_row_col[1] >> 3;



	    if (x < 2 || x + b_w - 1 + 3 >= w || y < 2 || y + b_h - 1 + 3 >= h) {
	        
	        reference_off += (mv_.as_row_col[0] >> 3) + (mv_.as_row_col[1] >> 3) * stride;
	        build_mc_border(emul_block, emul_block_off,
	                reference, reference_off - 2 - (stride << 1), stride,
	                x - 2, y - 2, b_w + 5, b_h + 5, w, h);
	        reference = emul_block;
	        reference_off = emul_block_off + (stride << 1) + 2;
	        reference_off -= (mv_.as_row_col[0] >> 3) + (mv_.as_row_col[1] >> 3) * stride;
	        
	    }
	 

	    

	    if (mv_.as_int[0]) {

	        mx = mv_.as_row_col[0] & 7;
	        my = mv_.as_row_col[1] & 7;


	        reference_off += ((mv_.as_row_col[1] >> 3) * stride) + (mv_.as_row_col[0] >> 3);




	        filter_block2d(output, output_off, stride, reference, reference_off, stride, 4, 4, mx, my,
	                filters);

	        predict = output;
	        predict_off = output_off;

	    } else {
	        reference_off += ((mv_.as_row_col[1] >> 3) * stride) + (mv_.as_row_col[0] >> 3);
	        predict = reference;
	        predict_off = reference_off;
	        
	    }
	    
	    
	    vp8_short_idct4x4llm_c(output, output_off, predict, predict_off, stride, coeffs, coeffs_off + 16 * b);
	    
	}

	function build_inter4x4_predictors_mb(){
	    
	}

	function vp8_build_inter16x16_predictors_mb(mbi, full_pixel) {

	    var mbmi_cache = mbi.mbmi;

	    uvmv.as_int[0] = mbmi_cache.mv.as_int[0];

	    if (mbi.mbmi.need_mc_border === 1) {
	        var x = uvmv.as_row_col[0];
	        var y = uvmv.as_row_col[1] ;
	        uvmv.as_row_col[0] = (x + 1 + ((x >> 31) << 1)) / 2;
	        uvmv.as_row_col[1] = (y + 1 + ((y >> 31) << 1)) / 2;

	    } else {
	        uvmv.as_row_col[0] = (uvmv.as_row_col[0] + 1) >> 1;
	        uvmv.as_row_col[1] = (uvmv.as_row_col[1] + 1) >> 1;
	    }

	    if (full_pixel) {
	        uvmv.as_int[0] &= 0xFFF8FFF8;
	    }

	    chroma_mv[0].as_int[0] =
	            chroma_mv[1].as_int[0] =
	            chroma_mv[2].as_int[0] =
	            chroma_mv[3].as_int[0] = uvmv.as_int[0];

	}

	//xd->subpixel_predict8x8 = vp8_sixtap_predict8x8;
	function vp8_build_inter_predictors_mb(ctx,
	        img, coeffs, coeffs_off, mbi, mb_col, mb_row) {

	    var y, u, v;
	    var y = u = v = img.y;
	    var y_off = img.y_off;
	    var u_off = img.u_off;
	    var v_off = img.v_off;
	    var reference;
	    var reference_offset = 0;

	    var full_pixel = (ctx.common.version === 3) + 0;
	    var b = 0;

	    var mbmi_cache = mbi.mbmi;
	    
	    if (mbmi_cache.y_mode !== SPLITMV) {

	        vp8_short_inv_walsh4x4_c(coeffs, coeffs_off + 384, coeffs_off);
	        vp8_build_inter16x16_predictors_mb(mbi, full_pixel);


	    } else {

	        build_4x4uvmvs(mbi, full_pixel);
	        build_inter4x4_predictors_mb();
	    }


	    if (mbi.mbmi.need_mc_border === 1)
	        predict_inter_emulated_edge(ctx, img, coeffs, coeffs_off, mbi, mb_col, mb_row);

	    else
	        predict_inter(ctx, img, coeffs, coeffs_off, mbi);

	}

	module.exports = {};
	module.exports.predict_inter_emulated_edge = predict_inter_emulated_edge;
	module.exports.predict_inter = predict_inter;
	module.exports.vp8_build_inter_predictors_mb = vp8_build_inter_predictors_mb;

/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';
	//bilinear_filters
	var vp8_bilinear_filters =
	        [
	            new Int16Array([0, 0, 128, 0, 0, 0]),
	            new Int16Array([0, 0, 112, 16, 0, 0]),
	            new Int16Array([0, 0, 96, 32, 0, 0]),
	            new Int16Array([0, 0, 80, 48, 0, 0]),
	            new Int16Array([0, 0, 64, 64, 0, 0]),
	            new Int16Array([0, 0, 48, 80, 0, 0]),
	            new Int16Array([0, 0, 32, 96, 0, 0]),
	            new Int16Array([0, 0, 16, 112, 0, 0])
	        ];
	vp8_bilinear_filters[0].shape = 1;
	vp8_bilinear_filters[1].shape = 1;
	vp8_bilinear_filters[2].shape = 1;
	vp8_bilinear_filters[3].shape = 1;
	vp8_bilinear_filters[4].shape = 1;
	vp8_bilinear_filters[5].shape = 1;
	vp8_bilinear_filters[6].shape = 1;
	vp8_bilinear_filters[7].shape = 1;

	// sixtap_filters
	var vp8_sub_pel_filters =
	        [
	            new Int16Array([0, 0, 128, 0, 0, 0]),
	            new Int16Array([0, -6, 123, 12, -1, 0]),
	            new Int16Array([2, -11, 108, 36, -8, 1]),
	            new Int16Array([0, -9, 93, 50, -6, 0]),
	            new Int16Array([3, -16, 77, 77, -16, 3]),
	            new Int16Array([0, -6, 50, 93, -9, 0]),
	            new Int16Array([1, -8, 36, 108, -11, 2]),
	            new Int16Array([0, -1, 12, 123, -6, 0])
	        ];
	vp8_sub_pel_filters[0].shape = 1;
	vp8_sub_pel_filters[1].shape = 2;
	vp8_sub_pel_filters[2].shape = 0;
	vp8_sub_pel_filters[3].shape = 2;
	vp8_sub_pel_filters[4].shape = 0;
	vp8_sub_pel_filters[5].shape = 2;
	vp8_sub_pel_filters[6].shape = 0;
	vp8_sub_pel_filters[7].shape = 2;


	var VP8_FILTER_SHIFT = 7;

	function filter_block2d_first_pass(output,
	        output_off, output_width, src, src_ptr,
	        reference_stride, cols, output_height, vp8_filter) {
	            
	    var r = 0, c = 0;
	    var Temp = 0;

	    var filter0 = vp8_filter[0] | 0;
	    var filter1 = vp8_filter[1] | 0;
	    var filter2 = vp8_filter[2] | 0;
	    var filter3 = vp8_filter[3] | 0;
	    var filter4 = vp8_filter[4] | 0;
	    var filter5 = vp8_filter[5] | 0;

	    for (r = 0; r < output_height; r++) {
	        for (c = 0; c < cols; c++){
	            Temp = (src[src_ptr - 2] * filter0) +
	                    (src[src_ptr - 1] * filter1) +
	                    (src[src_ptr] * filter2) +
	                    (src[src_ptr + 1] * filter3) +
	                    (src[src_ptr + 2] * filter4) +
	                    (src[src_ptr + 3] * filter5) +
	                    64;
	            
	            
	            Temp >>= VP8_FILTER_SHIFT;
	            
	            if (Temp < 0) {
	                Temp = 0;
	            } else if (Temp > 255) {
	                Temp = 255;
	            }
	      
	            output[output_off + c] = Temp;
	            src_ptr++;
	        }

	        src_ptr += reference_stride - cols;
	        output_off += output_width;
	    }
	}

	function filter_block2d_first_pass_shape_2(output,
	        output_off, output_width, src, src_ptr,
	        reference_stride, cols, output_height, vp8_filter) {
	            
	    var r = 0, c = 0;
	    var Temp = 0;


	    var filter1 = vp8_filter[1] | 0;
	    var filter2 = vp8_filter[2] | 0;
	    var filter3 = vp8_filter[3] | 0;
	    var filter4 = vp8_filter[4] | 0;


	    for (r = 0; r < output_height; r++) {
	        for (c = 0; c < cols; c++){
	            Temp = 
	                    (src[src_ptr - 1] * filter1) +
	                    (src[src_ptr] * filter2) +
	                    (src[src_ptr + 1] * filter3) +
	                    (src[src_ptr + 2] * filter4) +
	                    
	                    64;
	            
	            
	            Temp >>= VP8_FILTER_SHIFT;
	            
	            if (Temp < 0) {
	                Temp = 0;
	            } else if (Temp > 255) {
	                Temp = 255;
	            }
	      
	            output[output_off + c] = Temp;
	            src_ptr++;
	        }

	        src_ptr += reference_stride - cols;
	        output_off += output_width;
	    }
	}

	function filter_block2d_first_pass_shape_1(output,
	        output_off, output_width, src, src_ptr,
	        reference_stride, cols, output_height, vp8_filter) {
	            
	    var r = 0, c = 0;
	    var Temp = 0;

	    var filter2 = vp8_filter[2] | 0;
	    var filter3 = vp8_filter[3] | 0;

	    for (r = 0; r < output_height; r++) {
	        for (c = 0; c < cols; c++){
	            Temp = 
	                    (src[src_ptr] * filter2) +
	                    (src[src_ptr + 1] * filter3) +
	                    64;
	            
	            
	            Temp >>= VP8_FILTER_SHIFT;
	            
	            if (Temp < 0) {
	                Temp = 0;
	            } else if (Temp > 255) {
	                Temp = 255;
	            }
	      
	            output[output_off + c] = Temp;
	            src_ptr++;
	        }

	        src_ptr += reference_stride - cols;
	        output_off += output_width;
	    }
	}

	function filter_block2d_second_pass(output,
	        output_off,
	        output_stride,
	        reference,
	        reference_off,
	        reference_stride,
	        cols,
	        rows,
	        filter
	        ) {
	    var r = 0, c = 0, Temp = 0;
	    var filter0 = filter[0] | 0;
	    var filter1 = filter[1] | 0;
	    var filter2 = filter[2] | 0;
	    var filter3 = filter[3] | 0;
	    var filter4 = filter[4] | 0;
	    var filter5 = filter[5] | 0;
	    var twoRef = reference_stride << 1;
	    var threeRef = 3 * reference_stride;

	    for (r = 0; r < rows; r++) {
	        for (c = 0; c < cols; c++) {
	            Temp = (reference[reference_off - twoRef] * filter0) +
	                    (reference[reference_off - reference_stride] * filter1) +
	                    (reference[reference_off] * filter2) +
	                    (reference[reference_off + reference_stride] * filter3) +
	                    (reference[reference_off + twoRef] * filter4) +
	                    (reference[reference_off + threeRef] * filter5) +
	                    64;
	            Temp >>= 7;
	            
	            if (Temp < 0) {
	                Temp = 0;
	            } else if (Temp > 255) {
	                Temp = 255;
	            }
	      
	            output[output_off + c] = Temp;
	            
	            reference_off++;
	        }

	        reference_off += reference_stride - cols;
	        output_off += output_stride;
	    }

	}

	function filter_block2d_second_pass_shape_1(output,
	        output_off,
	        output_stride,
	        reference,
	        reference_off,
	        reference_stride,
	        cols,
	        rows,
	        filter
	        ) {
	    var r = 0, c = 0, Temp = 0;
	    var filter2 = filter[2] | 0;
	    var filter3 = filter[3] | 0;
	    var twoRef = reference_stride << 1;
	    var threeRef = 3 * reference_stride;

	    for (r = 0; r < rows; r++) {
	        for (c = 0; c < cols; c++) {
	            Temp = 
	                    (reference[reference_off] * filter2) +
	                    (reference[reference_off + reference_stride] * filter3) +
	                    64;
	            Temp >>= 7;
	            
	            if (Temp < 0) {
	                Temp = 0;
	            } else if (Temp > 255) {
	                Temp = 255;
	            }
	      
	            output[output_off + c] = Temp;
	            
	            reference_off++;
	        }

	        reference_off += reference_stride - cols;
	        output_off += output_stride;
	    }

	}

	function filter_block2d_second_pass_shape_2(output,
	        output_off,
	        output_stride,
	        reference,
	        reference_off,
	        reference_stride,
	        cols,
	        rows,
	        filter
	        ) {
	    var r = 0, c = 0, Temp = 0;

	    var filter1 = filter[1] | 0;
	    var filter2 = filter[2] | 0;
	    var filter3 = filter[3] | 0;
	    var filter4 = filter[4] | 0;

	    var twoRef = reference_stride << 1;
	    var threeRef = 3 * reference_stride;

	    for (r = 0; r < rows; r++) {
	        for (c = 0; c < cols; c++) {
	            Temp = 
	                    (reference[reference_off - reference_stride] * filter1) +
	                    (reference[reference_off] * filter2) +
	                    (reference[reference_off + reference_stride] * filter3) +
	                    (reference[reference_off + twoRef] * filter4) +
	                    64;
	            Temp >>= 7;
	            
	            if (Temp < 0) {
	                Temp = 0;
	            } else if (Temp > 255) {
	                Temp = 255;
	            }
	      
	            output[output_off + c] = Temp;
	            
	            reference_off++;
	        }

	        reference_off += reference_stride - cols;
	        output_off += output_stride;
	    }
	}

	//likely filter_block2d
	var temp = new Uint8Array(336);

	function filter_block2d(output, output_off,
	        output_stride, reference,
	        reference_off, reference_stride,
	        cols, rows,
	        mx, my, filters) {


	    if (filters[mx].shape === 1) {
	        filter_block2d_first_pass_shape_1(temp, 0, 16,
	                reference, reference_off - 2 * reference_stride, reference_stride,
	                cols, rows + 5, filters[mx]);
	    } else if(filters[mx].shape === 2) {
	        filter_block2d_first_pass_shape_2(temp, 0, 16,
	                reference, reference_off - 2 * reference_stride, reference_stride,
	                cols, rows + 5, filters[mx]);
	    } else {
	        filter_block2d_first_pass(temp, 0, 16,
	                reference, reference_off - 2 * reference_stride, reference_stride,
	                cols, rows + 5, filters[mx]);
	    }
	    
	    if (filters[my].shape === 1) {
	        filter_block2d_second_pass_shape_1(output, output_off, output_stride,
	                temp, 32, 16, cols, rows, filters[my]);
	    } else if (filters[my].shape === 1) {
	        filter_block2d_second_pass_shape_2(output, output_off, output_stride,
	                temp, 32, 16, cols, rows, filters[my]);
	    } else {
	        filter_block2d_second_pass(output, output_off, output_stride,
	                temp, 32, 16, cols, rows, filters[my]);
	    }

	    
	}



	//subpixel_predict
	function filter_block(return_off,
	        output,
	        output_off,
	        reference,
	        reference_off,
	        stride,
	        mv_,
	        filters) {

	    //reference_off += ((mv_.y >> 3) * stride) + (mv_.x >> 3);

	    if (mv_.as_int[0])
	    {
	        filter_block2d(output, output_off, stride, reference, reference_off, stride, 4, 4, mv_.x & 7, mv_.y & 7,
	                filters);

	    }


	}

	module.exports = {};
	module.exports.vp8_sub_pel_filters = vp8_sub_pel_filters;
	module.exports.vp8_bilinear_filters = vp8_bilinear_filters;
	module.exports.filter_block2d_first_pass = filter_block2d_first_pass;
	module.exports.filter_block2d_second_pass = filter_block2d_second_pass;
	module.exports.sixtap_2d = filter_block2d;
	module.exports.filter_block = filter_block;
	module.exports.filter_block2d = filter_block2d;


/***/ },
/* 86 */
/***/ function(module, exports) {

	'use strict';




	function CLAMP_255(x) {
	    return Math.min(Math.max(x, 0), 255);
	}

	var cospi8sqrt2minus1 = 20091;
	var sinpi8sqrt2 = 35468; // (<<15 + 2700)
	var output = new Int16Array(16);
	var output_32 = new Uint32Array(output.buffer);
	var output_32_i = new Int32Array(output.buffer);
	output.data_32 = output_32;
	output.data_32_i = output_32_i;
	//
	//vp8_short_inv_walsh4x4_c
	function vp8_short_inv_walsh4x4_c(input, input_off, mb_dqcoeff_ptr) {

	    //var mb_dqcoeff_ptr = input_off;

	    var output_off = 0;
	    var i;
	    var a1, b1, c1, d1;
	    var a2, b2, c2, d2;
	    var ip = input;
	    var ip_off = input_off;
	    var op = output;
	    var op_off = 0;

	    var ip0 = 0;
	    var ip1 = 0;
	    var ip2 = 0;
	    var ip3 = 0;
	    var ip12 = 0;
	    var ip8 = 0;
	    var ip4 = 0;

	    /*
	    //Loop 1
	    var i0 = ip[ip_off];
	    var i1 = ip[ip_off + 1];
	    var i2 = ip[ip_off + 2];
	    var i3 = ip[ip_off + 3];
	    var i4 = ip[ip_off + 4];
	    var i5 = ip[ip_off + 5];
	    var i6 = ip[ip_off + 6];
	    var i7 = ip[ip_off + 7];
	    var i8 = ip[ip_off + 8];
	    var i9 = ip[ip_off + 9];
	    var i10 = ip[ip_off + 10];
	    var i11 = ip[ip_off + 11];
	    var i12 = ip[ip_off + 12];
	    var i13 = ip[ip_off + 13];
	    var i14 = ip[ip_off + 14];
	    var i15 = ip[ip_off + 15];


	    a1 = (i0 + i12) | 0;
	    b1 = (i4 + i8) | 0;
	    c1 = (i4 - i8) | 0;
	    d1 = (i0 - i12) | 0;

	    op[op_off] = a1 + b1;
	    op[op_off + 4] = c1 + d1;
	    op[op_off + 8] = a1 - b1;
	    op[op_off + 12] = d1 - c1;
	    //ip_off++;
	    //op_off++;

	    //Loop 2
	    a1 = (i1 + i13) | 0;
	    b1 = (i5 + i9) | 0;
	    c1 = (i5 - i9) | 0;
	    d1 = (i1 - i13) | 0;

	    op[op_off + 1] = a1 + b1;
	    op[op_off + 5] = c1 + d1;
	    op[op_off + 9] = a1 - b1;
	    op[op_off + 13] = d1 - c1;


	    //Loop 3
	    a1 = (i2 + i14) | 0;
	    b1 = (i6 + i10) | 0;
	    c1 = (i6 - i10) | 0;
	    d1 = (i2 - i14) | 0;

	    op[op_off + 2] = a1 + b1;
	    op[op_off + 6] = c1 + d1;
	    op[op_off + 10] = a1 - b1;
	    op[op_off + 14] = d1 - c1;
	    


	    //Loop 4
	    a1 = (i3 + i15) | 0;
	    b1 = (i7 + i11) | 0;
	    c1 = (i7 - i11) | 0;
	    d1 = (i3 - i15) | 0;

	    op[op_off + 3] = a1 + b1;
	    op[op_off + 7] = c1 + d1;
	    op[op_off + 11] = a1 - b1;
	    op[op_off + 15] = d1 - c1;
	*/
	    
	    for (i = 0; i < 4; i++)
	    {
	        ip0 = ip[ip_off];
	        ip4 = ip[ip_off + 4];
	        ip8 = ip[ip_off + 8];
	        ip12 = ip[ip_off + 12];


	        a1 = (ip0 + ip12) | 0;
	        b1 = (ip4 + ip8) | 0;
	        c1 = (ip4 - ip8) | 0;
	        d1 = (ip0 - ip12) | 0;

	        op[op_off] = a1 + b1;
	        op[op_off + 4] = c1 + d1;
	        op[op_off + 8] = a1 - b1;
	        op[op_off + 12] = d1 - c1;
	        ip_off++;
	        op_off++;
	    }

	    //ip_off += 3;
	    //op_off += 3;
	    
	    ip = output;
	    ip_off = output_off;
	    op = output;
	    op_off = output_off;

	    var data_32 = ip.data_32;
	    var ip_32 = 0;
	/*
	    for (i = 0; i < 4; i++)
	    {

	        ip_32 = data_32[ip_off >> 1];
	        ip1 = ((ip_32 >> 16));
	        ip0 = ((ip_32 << 16) >> 16);
	        
	        ip_32 = data_32[(ip_off + 2) >> 1];
	        ip3 = ((ip_32 >> 16));
	        ip2 = ((ip_32 << 16) >> 16);
	        
	        a1 = ip0 + ip3;
	        b1 = ip1 + ip2;
	        c1 = ip1 - ip2;
	        d1 = ip0 - ip3;

	        a2 = a1 + b1;
	        b2 = c1 + d1;
	        c2 = a1 - b1;
	        d2 = d1 - c1;

	        output_32[op_off >> 1] = ((a2 + 3) >> 3) & 0xFFFF | (((b2 + 3) >> 3) << 16);
	        output_32[(op_off + 2) >> 1] = ((c2 + 3) >> 3) & 0xFFFF | (((d2 + 3) >> 3) << 16);


	        ip_off += 4;
	        op_off += 4;
	    }*/
	    var output_off_32 = op_off >> 1;
	    var ip_off_32 = ip_off >> 1;
	    //Loop 1
	    ip_32 = data_32[ip_off_32];
	    ip1 = ((ip_32 >> 16));
	    ip0 = ((ip_32 << 16) >> 16);

	    ip_32 = data_32[ip_off_32 + 1];
	    ip3 = ((ip_32 >> 16));
	    ip2 = ((ip_32 << 16) >> 16);

	    a1 = ip0 + ip3;
	    b1 = ip1 + ip2;
	    c1 = ip1 - ip2;
	    d1 = ip0 - ip3;

	    a2 = a1 + b1;
	    b2 = c1 + d1;
	    c2 = a1 - b1;
	    d2 = d1 - c1;

	    output_32[output_off_32] = ((a2 + 3) >> 3) & 0xFFFF | (((b2 + 3) >> 3) << 16);
	    output_32[output_off_32 + 1] = ((c2 + 3) >> 3) & 0xFFFF | (((d2 + 3) >> 3) << 16);



	    //Loop 2
	    ip_32 = data_32[ip_off_32 + 2];
	    ip1 = ((ip_32 >> 16));
	    ip0 = ((ip_32 << 16) >> 16);

	    ip_32 = data_32[ip_off_32 + 3];
	    ip3 = ((ip_32 >> 16));
	    ip2 = ((ip_32 << 16) >> 16);

	    a1 = ip0 + ip3;
	    b1 = ip1 + ip2;
	    c1 = ip1 - ip2;
	    d1 = ip0 - ip3;

	    a2 = a1 + b1;
	    b2 = c1 + d1;
	    c2 = a1 - b1;
	    d2 = d1 - c1;

	    output_32[output_off_32 + 2] = ((a2 + 3) >> 3) & 0xFFFF | (((b2 + 3) >> 3) << 16);
	    output_32[output_off_32 + 3] = ((c2 + 3) >> 3) & 0xFFFF | (((d2 + 3) >> 3) << 16);




	    //Loop 3
	    ip_32 = data_32[ip_off_32 + 4];
	    ip1 = ((ip_32 >> 16));
	    ip0 = ((ip_32 << 16) >> 16);

	    ip_32 = data_32[ip_off_32 + 5];
	    ip3 = ((ip_32 >> 16));
	    ip2 = ((ip_32 << 16) >> 16);

	    a1 = ip0 + ip3;
	    b1 = ip1 + ip2;
	    c1 = ip1 - ip2;
	    d1 = ip0 - ip3;

	    a2 = a1 + b1;
	    b2 = c1 + d1;
	    c2 = a1 - b1;
	    d2 = d1 - c1;

	    output_32[output_off_32 + 4] = ((a2 + 3) >> 3) & 0xFFFF | (((b2 + 3) >> 3) << 16);
	    output_32[output_off_32 + 5] = ((c2 + 3) >> 3) & 0xFFFF | (((d2 + 3) >> 3) << 16);



	    //loop 4
	    ip_32 = data_32[ip_off_32 + 6];
	    ip1 = ((ip_32 >> 16));
	    ip0 = ((ip_32 << 16) >> 16);

	    ip_32 = data_32[ip_off_32 + 7];
	    ip3 = ((ip_32 >> 16));
	    ip2 = ((ip_32 << 16) >> 16);

	    a1 = ip0 + ip3;
	    b1 = ip1 + ip2;
	    c1 = ip1 - ip2;
	    d1 = ip0 - ip3;

	    a2 = a1 + b1;
	    b2 = c1 + d1;
	    c2 = a1 - b1;
	    d2 = d1 - c1;

	    output_32[output_off_32 + 6] = ((a2 + 3) >> 3) & 0xFFFF | (((b2 + 3) >> 3) << 16);
	    output_32[output_off_32 + 7] = ((c2 + 3) >> 3) & 0xFFFF | (((d2 + 3) >> 3) << 16);



	    //var mb_dqcoeff = input;

	    //for (i = 0; i < 16; i++) {
	        //coeffs[coeffs_off + i * 16] = y2[i]; //no y2_off need
	      //  input[mb_dqcoeff_ptr + (i << 4)] = output[i];
	    //}
	    input[mb_dqcoeff_ptr + 0] = output[0];
	    input[mb_dqcoeff_ptr + 16] = output[1];
	    input[mb_dqcoeff_ptr + 32] = output[2];
	    input[mb_dqcoeff_ptr + 48] = output[3];
	    input[mb_dqcoeff_ptr + 64] = output[4];
	    input[mb_dqcoeff_ptr + 80] = output[5];
	    input[mb_dqcoeff_ptr + 96] = output[6];
	    input[mb_dqcoeff_ptr + 112] = output[7];
	    input[mb_dqcoeff_ptr + 128] = output[8];
	    input[mb_dqcoeff_ptr + 144] = output[9];
	    input[mb_dqcoeff_ptr + 160] = output[10];
	    input[mb_dqcoeff_ptr + 176] = output[11];
	    input[mb_dqcoeff_ptr + 192] = output[12];
	    input[mb_dqcoeff_ptr + 208] = output[13];
	    input[mb_dqcoeff_ptr + 224] = output[14];
	    input[mb_dqcoeff_ptr + 240] = output[15];

	}

	var tmp = new Int16Array(16);
	var shortpitch = 4;
	var shortpitch2 = 8;
	var shortpitch3 = 12;

	function vp8_short_idct4x4llm_c(recon, recon_off, predict, predict_off, stride, coeffs, coeffs_off) {

	    var i = 0;
	    var a1 = 0, b1 = 0, c1 = 0, d1 = 0, temp1 = 0, temp2 = 0;
	    var tmp_off = 0;



	    //START IDCT
	    var ip = coeffs;
	    var ip_off = coeffs_off;
	    var op = tmp;
	    var op_off = tmp_off;


	    for (i = 0; i < 4; i++) {
	        var ip_0 = ip[ip_off];
	        var ip_4 = ip[ip_off + 4];
	        var ip_12 = ip[ip_off + 12];
	        var ip_8 = ip[ip_off + 8];

	        a1 = ip_0 + ip_8;
	        b1 = ip_0 - ip_8;

	        temp1 = (ip_4 * sinpi8sqrt2) >> 16;
	        temp2 = ip_12 + ((ip_12 * cospi8sqrt2minus1/* + rounding */) >> 16);
	        c1 = temp1 - temp2;

	        temp1 = ip_4 + ((ip_4 * cospi8sqrt2minus1) >> 16);
	        temp2 = (ip_12 * sinpi8sqrt2) >> 16;
	        d1 = temp1 + temp2;

	        op[op_off] = a1 + d1;
	        op[op_off + shortpitch3] = a1 - d1;

	        op[op_off + shortpitch] = b1 + c1;
	        op[op_off + shortpitch2] = b1 - c1;

	        ip_off++;
	        op_off++;
	    }

	    //END IDCT

	    coeffs = tmp;
	    coeffs_off = tmp_off;
	    var recon_32 = recon.data_32;
	    var r0, r1, r2, r3;
	    var p0, p1, p2, p3;
	    var p32;
	    
	    for (i = 0; i < 4; i++) {

	        
	        var coeffs_0 = coeffs[coeffs_off];
	        var coeff_1 = coeffs[coeffs_off + 1];
	        var coeffs_2 = coeffs[coeffs_off + 2];
	        var coeff_3 = coeffs[coeffs_off + 3];



	        a1 = coeffs_0 + coeffs_2;
	        b1 = coeffs_0 - coeffs_2;

	        temp1 = (coeff_1 * sinpi8sqrt2) >> 16;
	        temp2 = coeff_3 + ((coeff_3 * cospi8sqrt2minus1) >> 16);
	        c1 = temp1 - temp2;

	        temp1 = coeff_1 + ((coeff_1 * cospi8sqrt2minus1) >> 16);
	        temp2 = (coeff_3 * sinpi8sqrt2) >> 16;
	        d1 = temp1 + temp2;


	        p0 = predict[predict_off];
	        p1 = predict[predict_off + 1];
	        p2 = predict[predict_off + 2];
	        p3 = predict[predict_off + 3];



	        r0 = CLAMP_255(p0 + ((a1 + d1 + 4) >> 3));
	        r1 = CLAMP_255(p1 + ((b1 + c1 + 4) >> 3));
	        r2 = CLAMP_255(p2 + ((b1 - c1 + 4) >> 3));
	        r3 = CLAMP_255(p3 + ((a1 - d1 + 4) >> 3));
	        recon_32[recon_off >> 2] = r0 | r1 << 8 | r2 << 16 | r3 << 24;



	        coeffs_off += 4;
	        recon_off += stride;
	        predict_off += stride;
	    }

	    //clamp might be at the end
	}

	module.exports = {};
	module.exports.vp8_short_inv_walsh4x4_c = vp8_short_inv_walsh4x4_c;
	module.exports.vp8_short_idct4x4llm_c = vp8_short_idct4x4llm_c;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var reconintra4x4 = __webpack_require__(88);
	var intra_prediction_down_copy = reconintra4x4.intra_prediction_down_copy;

	var DC_PRED = 0;
	var V_PRED = 1;
	var H_PRED = 2;
	var TM_PRED = 3;
	var B_PRED = 4;




	var B_DC_PRED = 0;
	var B_TM_PRED = 1;
	var B_VE_PRED = 2;
	var B_HE_PRED = 3;
	var B_LD_PRED = 4;
	var B_RD_PRED = 5;
	var B_VR_PRED = 6;
	var B_VL_PRED = 7;
	var B_HD_PRED = 8;
	var B_HU_PRED = 9;

	var idctllm = __webpack_require__(86);
	var vp8_short_inv_walsh4x4_c = idctllm.vp8_short_inv_walsh4x4_c;
	var vp8_short_idct4x4llm_c = idctllm.vp8_short_idct4x4llm_c;

	function CLAMP_255(x) {
	    return Math.min(Math.max(x, 0), 255);
	}

	function predict_tm_16x16(predict, predict_off, stride){
	    predict_tm_nxn(predict, predict_off, stride, 16);
	}


	function predict_v_8x8(predict, predict_off, stride) {
	    predict_v_nxn(predict, predict_off, stride, 8);
	}

	function predict_h_16x16(predict, predict_off, stride) {
	    predict_h_nxn(predict, predict_off, stride, 16);
	}

	function predict_v_16x16(predict, predict_off, stride)
	{
	    predict_v_nxn(predict, predict_off, stride, 16);
	}


	function predict_tm_8x8(predict, predict_off, stride)
	{
	    predict_tm_nxn(predict, predict_off, stride, 8);
	}

	function predict_h_8x8(predict, predict_off, stride)
	{
	    predict_h_nxn(predict, predict_off, stride, 8);
	}


	function predict_tm_8x8(predict, predict_off, stride)
	{
	    predict_tm_nxn(predict, predict_off, stride, 8);
	}


	//likely vp8_build_intra_predictors_mbuv_s
	function predict_intra_chroma(predict_u,
	        predict_u_off,
	        predict_v,
	        predict_v_off,
	        stride,
	        mbi,
	        coeffs,
	        coeffs_off) {
	    var i = 0;

	    switch (mbi.mbmi.uv_mode)
	    {
	        case DC_PRED:
	            
	            //line84
	            predict_dc_nxn(predict_u, predict_u_off, stride, 8);
	            predict_dc_nxn(predict_v, predict_v_off, stride, 8);
	            break;
	        case V_PRED:
	            predict_v_8x8(predict_u, predict_u_off, stride);
	            predict_v_8x8(predict_v, predict_v_off, stride);
	            break;
	        case H_PRED:
	            predict_h_8x8(predict_u, predict_u_off, stride);
	            predict_h_8x8(predict_v, predict_v_off, stride);
	            break;
	        case TM_PRED:
	            predict_tm_8x8(predict_u, predict_u_off, stride);
	            predict_tm_8x8(predict_v, predict_v_off, stride);
	            break;
	        default:
	           
	    }

	    coeffs_off += 256;
	    var stride4_8 = stride * 4 - 8;
	    //likely line 178
	    for (i = 16; i < 20; i++) {
	        vp8_short_idct4x4llm_c(predict_u, predict_u_off, predict_u, predict_u_off, stride, coeffs, coeffs_off);
	        coeffs_off += 16;
	        predict_u_off += 4;

	        if (i & 1)
	            predict_u_off += stride4_8;
	    }

	    for (i = 20; i < 24; i++) {
	        vp8_short_idct4x4llm_c(predict_v, predict_v_off, predict_v, predict_v_off, stride, coeffs, coeffs_off);
	        coeffs_off += 16;
	        predict_v_off += 4;

	        if (i & 1)
	            predict_v_off += stride4_8;
	    }

	}

	function predict_v_nxn(predict, predict_off, stride, n) {
	    var above = predict;
	    var above_off = (predict_off - stride) | 0;
	    var i = 0, j = 0;
	    var istride = 0;
	    for (i = 0; i < n; i++) {
	        istride = i * stride;
	        for (j = 0; j < n; j++)
	            predict[predict_off + istride + j] = above[above_off + j];
	    }
	}

	function predict_h_nxn(predict, predict_off, stride, n) {
	    var left = predict;
	    var left_off = (predict_off - 1) | 0;
	    var i = 0;
	    var j = 0;

	    var istride = 0;
	    for (i = 0; i < n; i++) {
	        istride = i * stride;
	        for (j = 0; j < n; j++)
	            predict[predict_off + istride + j] = left[left_off + i * stride];
	    }
	}


	function  predict_dc_nxn(predict, predict_off, stride, n) {
	    n = n | 0;
	    var left = predict;
	    var left_off = predict_off - 1;
	    var above = predict;
	    var above_off = predict_off - stride;
	    var i = 0, j = 0;
	    var dc = 0;

	    for (i = 0; i < n; i++) {
	        dc += left[left_off] + above[above_off + i];
	        left_off += stride;
	    }

	    switch (n) {
	        case 16:
	            dc = ((dc + 16) >> 5);
	            break;
	        case  8:
	            dc = ((dc + 8) >> 4);
	            break;
	        case  4:
	            dc = ((dc + 4) >> 3);
	            break;
	    }

	    for (i = 0; i < n; i++)
	        for (j = 0; j < n; j++)
	            predict[predict_off + i * stride + j] = dc;
	}

	function predict_tm_nxn(predict, predict_off, stride, n) {
	    /* Transposes the left column to the top row for later consumption
	     * by the idct/recon stage
	     */
	    var left = predict;
	    var left_off = predict_off - 1;
	    var above = predict;
	    var above_off = predict_off - stride;
	    var p = above[above_off - 1];
	    var i = 0, j = 0;

	    for (j = 0; j < n; j++)
	    {
	        for (i = 0; i < n; i++)
	            predict[predict_off + i] = CLAMP_255(left[left_off] + above[above_off + i] - p);//*left //CLAMP_255

	        predict_off += stride;
	        left_off += stride;
	    }
	}


	//possibly vp8_build_intra_predictors_mby_s
	function predict_intra_luma(predict,
	        predict_off,
	        stride,
	        mbi,
	        coeffs,
	        coeffs_off) {

	    if (mbi.mbmi.y_mode === B_PRED)
	        b_pred(predict, predict_off, stride, mbi, coeffs, coeffs_off);

	    else
	    {
	        var i = 0;

	        switch (mbi.mbmi.y_mode)
	        {
	            case DC_PRED:
	                predict_dc_nxn(predict, predict_off, stride, 16);
	                break;
	            case V_PRED:
	                predict_v_16x16(predict, predict_off, stride);
	                break;
	            case H_PRED:
	                predict_h_16x16(predict, predict_off, stride);
	                break;
	            case TM_PRED:
	                predict_tm_16x16(predict, predict_off, stride);
	                break;
	            default:
	               
	        }


	        vp8_short_inv_walsh4x4_c(coeffs, coeffs_off + 384, coeffs_off); 

	        for (i = 0; i < 16; i++)
	        {
	            vp8_short_idct4x4llm_c(predict, predict_off, predict, predict_off, stride, coeffs, coeffs_off);
	            coeffs_off += 16;
	            predict_off += 4;

	            if ((i & 3) === 3)
	                predict_off += (stride << 2) - 16;
	        }

	    }

	}

	//found in reconintra4x4
	//likeley line 183
	function  b_pred(predict, predict_off, stride, mbi, coeffs, coeffs_off) {

	    var i = 0;

	    intra_prediction_down_copy(predict, predict_off, stride);

	 
	    //line 165 in decode frame
	    var modes = mbi.bmi.modes;
	    for (i = 0; i < 16; i++) {
	        var b_predict = predict;
	        var b_predict_off = predict_off + ((i & 3) << 2);


	        switch (modes[i])
	        {
	            case B_DC_PRED:
	                predict_dc_nxn(b_predict, b_predict_off, stride, 4);
	                break;
	            case B_TM_PRED:
	                predict_tm_nxn(b_predict, b_predict_off, stride, 4);
	                break;
	            case B_VE_PRED:
	                predict_ve_4x4(b_predict, b_predict_off, stride);
	                break;
	            case B_HE_PRED:
	                predict_he_4x4(b_predict, b_predict_off, stride);
	                break;
	            case B_LD_PRED:
	                predict_ld_4x4(b_predict, b_predict_off, stride);
	                break;
	            case B_RD_PRED:
	                predict_rd_4x4(b_predict, b_predict_off, stride);
	                break;
	            case B_VR_PRED:
	                predict_vr_4x4(b_predict, b_predict_off, stride);
	                break;
	            case B_VL_PRED:
	                predict_vl_4x4(b_predict, b_predict_off, stride);
	                break;
	            case B_HD_PRED:
	                predict_hd_4x4(b_predict, b_predict_off, stride);
	                break;
	            case B_HU_PRED:
	                predict_hu_4x4(b_predict, b_predict_off, stride);
	                break;
	            default:
	                throw "ERROR :(";
	        }

	        vp8_short_idct4x4llm_c(b_predict, b_predict_off, b_predict, b_predict_off, stride, coeffs, coeffs_off);
	        coeffs_off += 16;

	        if ((i & 3) === 3) {
	            predict_off += stride * 4;
	        }

	    }

	}


	function predict_hd_4x4(predict, predict_off, stride) {
	        var left = predict;
	    var left_off = predict_off - 1;
	    var above = predict;
	    var above_off = predict_off - stride;
	    var pred0 = 0, pred1 = 0, pred2 = 0, pred3 = 0, pred4 = 0, pred5 = 0, pred6 = 0,
	            pred7 = 0, pred8 = 0, pred9 = 0;

	    var abovem1 = above[above_off - 1] | 0;
	    var above0 = above[above_off] | 0;
	    var above1 = above[above_off + 1] | 0;
	    var above2 = above[above_off + 2] | 0;
	    var stride2 = stride << 1;
	    var stride3 = stride * 3;
	    
	    var left0 = left[left_off]|0;
	    var left1  = left[left_off + stride]|0;
	    var left2 = left[left_off + stride2]|0;
	    var left3 = left[left_off + stride3]|0;
	    
	    var pred_32 = predict.data_32;
	    
	    pred0 = (left0 + abovem1 + 1) >> 1;
	    pred1 = (left0 + 2 * abovem1 + above0 + 2) >> 2;
	    pred2 = (above[above_off - 1] + 2 * above0 + above1 + 2) >> 2;
	    pred3 = (above0 + (above1 << 1) + above2 + 2) >> 2;
	    pred_32[predict_off >> 2] = pred0 | (pred1 << 8) | (pred2 << 16) | (pred3 << 24);
	    predict_off += stride;

	    pred4 = (left1 + left0 + 1) >> 1;
	    pred5 = (left1 + 2 * left0 + abovem1 + 2) >> 2;
	    pred_32[predict_off >> 2] = pred4 | (pred5 << 8) | (pred0 << 16) | (pred1 << 24);
	    predict_off += stride;

	  
	    pred6 = (left2 + left1 + 1) >> 1;
	    pred7 = (left2 + 2 * left1 + left0 + 2) >> 2;
	    pred_32[predict_off >> 2] = pred6 | (pred7 << 8) | (pred4 << 16) | (pred5 << 24);
	    predict_off += stride;

	    
	    
	    pred8 = (left3 + left2 + 1) >> 1;
	    pred9 = (left3 + 2 * left2 + left1 + 2) >> 2;

	    
	    pred_32[predict_off >> 2] = pred8 | (pred9 << 8) | (pred6 << 16) | (pred7 << 24);
	}


	function predict_vr_4x4(predict, predict_off, stride) {
	    var left = predict;
	    var left_off = predict_off - 1;
	    var above = predict;
	    var above_off = predict_off - stride;
	    var pred0 = 0, pred1 = 0, pred2 = 0, pred3 = 0, pred4 = 0, pred5 = 0, pred6 = 0,
	            pred7 = 0, pred8 = 0, pred9 = 0;
	    
	    var above_32 = above.data_32[above_off >> 2];
	    var above0 = above_32 & 0xFF;
	    var above1 = (above_32 >> 8) & 0xFF;
	    var above2 = (above_32 >> 16) & 0xFF;
	    var above3 = (above_32 >> 24) & 0xFF;
	    var above_m1 = above[above_off - 1];
	    
	    var left0 = left[left_off + 0];

	    pred0 = (above[above_off - 1] + above0 + 1) >> 1;
	    pred1 = (above0 + above1 + 1) >> 1;
	    pred2 = (above1 + above2 + 1) >> 1;
	    pred3 = (above2 + above3 + 1) >> 1;
	    
	    predict.data_32[predict_off >> 2] = pred0 | (pred1 << 8) | (pred2 << 16) | (pred3 << 24);
	    predict_off += stride;

	    pred4 = (left[left_off + 0] + 2 * above_m1 + above0 + 2) >> 2;
	    pred5 = (above_m1 + 2 * above0 + above1 + 2) >> 2;
	    pred6 = (above0 + 2 * above1 + above2 + 2) >> 2;
	    pred7 = (above1 + 2 * above2 + above[above_off + 3] + 2) >> 2;
	    
	    predict.data_32[predict_off >> 2] = pred4 | (pred5 << 8) | (pred6 << 16) | (pred7 << 24);
	    
	    predict_off += stride;

	    pred8 = (left[left_off + stride] + 2 * left0 + above[above_off - 1] + 2) >> 2;

	    
	    predict.data_32[predict_off >> 2] = pred8 | (pred0 << 8) | (pred1 << 16) | (pred2 << 24);
	    
	    predict_off += stride;

	    pred9 = (left[left_off + stride * 2] + 2 * left[left_off + stride] + left0 + 2) >> 2;

	    
	    predict.data_32[predict_off >> 2] = pred9 | (pred4 << 8) | (pred5 << 16) | (pred6 << 24);
	}


	function predict_rd_4x4(predict, predict_off, stride) {
	    var left = predict;
	    var left_off = predict_off - 1;
	    var above = predict;
	    var above_off = predict_off - stride;
	    var pred0 = 0, pred1 = 0, pred2 = 0, pred3 = 0, pred4 = 0, pred5 = 0, pred6 = 0;

	    var above_32 = above.data_32[above_off >> 2];
	    var above0 = above_32 & 0xFF;
	    var above1 = (above_32 >> 8) & 0xFF;
	    var above2 = (above_32 >> 16) & 0xFF;
	    var above3 = (above_32 >> 24) & 0xFF;
	    
	    var left0 = left[left_off];
	    var left1 = left[left_off + stride];
	    var left2 = left[left_off + stride * 2];

	    pred0 = (left[left_off + 0] + 2 * above[above_off - 1] + above0 + 2) >> 2;
	    pred1 = (above[above_off - 1] + 2 * above0 + above1 + 2) >> 2;
	    pred2 = (above0 + 2 * above1 + above2 + 2) >> 2;
	    pred3 = (above1 + 2 * above2 + above3 + 2) >> 2;
	    
	    predict.data_32[predict_off >> 2] = pred0 | (pred1 << 8) | (pred2 << 16) | (pred3 << 24);
	    
	    
	    predict_off += stride;

	    pred4 = (left1 + 2 * left0 + above[above_off - 1] + 2) >> 2;

	    predict.data_32[predict_off >> 2] = pred4 | (pred0 << 8) | (pred1 << 16) | (pred2 << 24);
	    
	    predict_off += stride;

	    pred5 = (left2 + 2 * left1 + left0 + 2) >> 2;

	    
	    predict.data_32[predict_off >> 2] = pred5 | (pred4 << 8) | (pred0 << 16) | (pred1 << 24);
	    predict_off += stride;

	    pred6 = (left[left_off + stride * 3] + 2 * left2 + left1 + 2) >> 2;

	    
	    predict.data_32[predict_off >> 2] = pred6 | (pred5 << 8) | (pred4 << 16) | (pred0 << 24);
	}


	function predict_ve_4x4(predict, predict_off, stride) {
	    var above = predict;
	    var above_32 = predict.data_32;
	    var above_off = predict_off - stride;
	    var i = 0, j = 0;

	    var above_temp = above_32[above_off >> 2] | 0;
	    var above0 = above_temp & 0xFF; //above[above_off] | 0;//
	    var above1 = (above_temp >> 8) & 0xFF; //above[above_off + 1] | 0; //
	    var above2 = (above_temp >> 16) & 0xFF; // above[above_off + 2] | 0; //
	    var above3 = (above_temp >> 24) & 0xFF; //above[above_off + 3] | 0;//

	    var pred1 = (above[above_off - 1] + (above0 << 1) + above1 + 2) >> 2;
	    var pred2 = (above0 + (above1 << 1) + above2 + 2) >> 2;
	    var pred3 = (above1 + (above2 << 1) + above3 + 2) >> 2;
	    var pred4 = (above2 + (above3 << 1) + above[above_off + 4] + 2) >> 2;

	    predict.data_32[predict_off >> 2] = pred1 | (pred2 << 8) | (pred3 << 16) | (pred4 << 24);

	    var istride = 0;// i * stride;
	    for (i = 1; i < 4; i++) {
	        istride = i * stride;
	        for (j = 0; j < 4; j++) {
	            predict[predict_off + istride + j] = predict[predict_off + j];
	        }
	    }
	}


	function predict_he_4x4(predict, predict_off, stride) {
	    var left = predict;
	    var left_off = predict_off - 1;
	    var above_32 = predict.data_32;
	    
	    var temp = (left[left_off - stride] + 2 * left[left_off] + left[left_off + stride] + 2) >> 2;
	    above_32[predict_off >> 2] = temp | (temp << 8) | (temp << 16) | (temp << 24);

	    predict_off += stride;
	    left_off += stride;


	    temp = (left[left_off - stride] + 2 * left[left_off] + left[left_off + stride] + 2) >> 2;
	    above_32[predict_off >> 2] = temp | (temp << 8) | (temp << 16) | (temp << 24);

	    predict_off += stride;
	    left_off += stride;

	    temp = (left[left_off - stride] + 2 * left[left_off] + left[left_off + stride] + 2) >> 2;

	    above_32[predict_off >> 2] = temp | (temp << 8) | (temp << 16) | (temp << 24);
	    predict_off += stride;
	    left_off += stride;

	    temp = (left[left_off - stride] + 2 * left[left_off] + left[left_off + 0] + 2) >> 2;
	    above_32[predict_off >> 2] = temp | (temp << 8) | (temp << 16) | (temp << 24);
	}


	function predict_hu_4x4(predict, predict_off, stride) {
	    var left = predict;
	    var left_off = predict_off - 1;
	    var pred0 = 0, pred1 = 0, pred2 = 0, pred3 = 0, pred4 = 0, pred5 = 0, pred6 = 0;

	    var stride3 = (stride * 3) | 0;
	    var stride2 = (stride << 1);
	    var left0 = left[left_off];
	    var left1 = left[left_off + stride];
	    var left2 = left[left_off + stride * 2];
	    var left3 = left[left_off + stride * 3];

	    pred0 = (left0 + left1 + 1) >> 1;
	    pred1 = (left0 + 2 * left1 + left2 + 2) >> 2;
	    pred2 = (left1 + left2 + 1) >> 1;
	    pred3 = (left1 + 2 * left2 + left3 + 2) >> 2;
	    
	    predict.data_32[predict_off >> 2] = pred0 | pred1 << 8 | pred2 << 16 | pred3 << 24;
	    
	    predict_off += stride;
	    
	    

	    //predict[predict_off + 0] = pred2;
	    //predict[predict_off + 1] = pred3;
	    pred4 = (left2 + left3 + 1) >> 1;
	    pred5 = (left2 + 2 * left3 + left3 + 2) >> 2;
	    
	    predict.data_32[predict_off >> 2] = pred2 | pred3 << 8 | pred4 << 16 | pred5 << 24;
	    predict_off += stride;
	    
	    pred6 = left3;


	    predict.data_32[predict_off >> 2] = pred4 | pred5 << 8 | pred6 << 16 | pred6 << 24;
	    predict_off += stride;


	    predict.data_32[predict_off >> 2] = pred6 | pred6 << 8 | pred6 << 16 | pred6 << 24;
	}


	function predict_ld_4x4(predict, predict_off, stride) {
	    var above = predict;
	    var above_off = predict_off - stride;
	    var pred0 = 0, pred1 = 0, pred2 = 0, pred3 = 0, pred4 = 0, pred5 = 0, pred6 = 0;

	    var above_32 = predict.data_32;
	    var above_32_value = above_32[above_off >> 2];
	    var above0 = above_32_value & 0xFF; //above[above_off] | 0;
	    var above1 = (above_32_value >> 8) & 0xFF;  // above[above_off + 1] | 0;
	    var above2 = (above_32_value >> 16) & 0xFF;  //above[above_off + 2] | 0;
	    var above3 = (above_32_value >> 24) & 0xFF;

	    above_32_value = above_32[(above_off >> 2) + 1];
	    var above4 = above_32_value & 0xFF; //above[above_off] | 0;
	    var above5 = (above_32_value >> 8) & 0xFF;  // above[above_off + 1] | 0;
	    var above6 = (above_32_value >> 16) & 0xFF;  //above[above_off + 2] | 0;
	    var above7 = (above_32_value >> 24) & 0xFF;

	    pred0 = (above0 + (above1 << 1) + above2 + 2) >> 2;
	    pred1 = (above1 + (above2 << 1) + above3 + 2) >> 2;
	    pred2 = (above2 + (above3 << 1) + above4 + 2) >> 2;
	    pred3 = (above3 + (above4 << 1) + above5 + 2) >> 2;

	    predict.data_32[predict_off >> 2] = pred0 | (pred1 << 8) | (pred2 << 16) | (pred3 << 24);
	    predict_off += stride;


	    pred4 = (above4 + 2 * above5 + above6 + 2) >> 2;
	    predict.data_32[predict_off >> 2] = pred1 | (pred2 << 8) | (pred3 << 16) | (pred4 << 24);

	    predict_off += stride;


	    pred5 = (above5 + (above6 << 1) + above7 + 2) >> 2;
	    predict.data_32[predict_off >> 2] = pred2 | (pred3 << 8) | (pred4 << 16) | (pred5 << 24);

	    predict_off += stride;


	    pred6 = (above6 + 2 * above7 + above7 + 2) >> 2;
	    predict.data_32[predict_off >> 2] = pred3 | (pred4 << 8) | (pred5 << 16) | (pred6 << 24);

	}


	function predict_vl_4x4(predict, predict_off, stride) {
	    var above = predict;
	    var above_off = predict_off - stride;
	    var pred0 = 0, pred1 = 0, pred2 = 0, pred3 = 0, pred4 = 0, pred5 = 0, pred6 = 0,
	            pred7 = 0, pred8 = 0, pred9 = 0;

	    var above_32 = above.data_32[above_off >> 2];
	    var above0 = above_32 & 0xFF;
	    var above1 = (above_32 >> 8) & 0xFF;
	    var above2 = (above_32 >> 16) & 0xFF;
	    var above3 = (above_32 >> 24) & 0xFF;
	    
	    above_32 = above.data_32[(above_off >> 2) + 1];
	    var above4 = above_32 & 0xFF; //above[above_off] | 0;
	    var above5 = (above_32 >> 8) & 0xFF;  // above[above_off + 1] | 0;
	    var above6 = (above_32 >> 16) & 0xFF;  //above[above_off + 2] | 0;
	    var above7 = (above_32 >> 24) & 0xFF;
	    
	    
	    pred0 = (above0 + above1 + 1) >> 1;
	    pred1 = (above1 + above2 + 1) >> 1;
	    pred2 = (above2 + above3 + 1) >> 1;
	    pred3 = (above[above_off + 3] + above4 + 1) >> 1;
	    
	    predict.data_32[predict_off >> 2] = pred0 | pred1 << 8 | pred2 << 16 | pred3 << 24;
	    
	    predict_off += stride;

	    pred4 = (above0 + 2 * above1 + above2 + 2) >> 2;
	    pred5 = (above1 + 2 * above2 + above3 + 2) >> 2;
	    pred6 = (above2 + 2 * above3 + above4 + 2) >> 2;
	    pred7 = (above3 + 2 * above4 + above5 + 2) >> 2;
	    
	    predict.data_32[predict_off >> 2] = pred4 | pred5 << 8 | pred6 << 16 | pred7 << 24;
	    
	    predict_off += stride;


	    pred8 = (above4 + 2 * above5 + above6 + 2) >> 2;
	    
	    predict.data_32[predict_off >> 2] = pred1 | pred2 << 8 | pred3 << 16 | pred8 << 24;
	    
	    predict_off += stride;


	    pred8 = (above5 + 2 * above6 + above7 + 2) >> 2;
	    
	    predict.data_32[predict_off >> 2] = pred5 | pred6 << 8 | pred7 << 16 | pred8 << 24;
	}


	module.exports = {};
	module.exports.predict_intra_chroma = predict_intra_chroma;
	module.exports.predict_intra_luma = predict_intra_luma;


/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';

	//intra_prediction_down_copy in reconintra4x4
	function intra_prediction_down_copy(recon, recon_off, stride) {
	    /* Copy the four pixels above-right of subblock 3 to
	     * above-right of subblocks 7, 11, and 15
	     */

	    var copy = (recon);
	    var copy_off = (recon_off + 16 - stride);//*(void *)

	    var i;
	    var copy_32 = copy.data_32;
	    var tmp_32 = copy_32[copy_off >> 2];

	    copy_off += stride << 2;

	    copy_32[copy_off >> 2] = tmp_32;

	    copy_off += stride << 2;

	    copy_32[copy_off >> 2] = tmp_32;

	    copy_off += stride << 2;

	    copy_32[copy_off >> 2] = tmp_32;

	}


	module.exports = {};
	module.exports.intra_prediction_down_copy = intra_prediction_down_copy;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var findenearmv = __webpack_require__(90);
	var left_block_mode = findenearmv.left_block_mode;
	var above_block_mode = findenearmv.above_block_mode;

	var MotionVector = __webpack_require__(72);
	var vp8_entropymodedata = __webpack_require__(91);

	var vp8_kf_bmode_prob = vp8_entropymodedata.vp8_kf_bmode_prob;

	var vp8_coef_update_probs = __webpack_require__(92);

	var entropymode = __webpack_require__(93);
	var vp8_bmode_tree = entropymode.vp8_bmode_tree;
	var vp8_kf_ymode_tree = entropymode.vp8_kf_ymode_tree;
	var vp8_uv_mode_tree = entropymode.vp8_uv_mode_tree;
	var vp8_kf_uv_mode_prob = entropymode.vp8_kf_uv_mode_prob;
	var vp8_kf_ymode_prob = entropymode.vp8_kf_ymode_prob;
	var vp8_sub_mv_ref_tree = entropymode.vp8_sub_mv_ref_tree;
	var vp8_small_mvtree = entropymode.vp8_small_mvtree;
	var vp8_mbsplit_tree = entropymode.vp8_mbsplit_tree;
	var vp8_mbsplits = entropymode.vp8_mbsplits;
	var vp8_sub_mv_ref_prob2 = entropymode.vp8_sub_mv_ref_prob2;
	var vp8_bmode_prob = entropymode.vp8_bmode_prob;
	var vp8_kf_ymode_tree = entropymode.vp8_kf_ymode_tree;
	var vp8_bmode_tree = entropymode.vp8_bmode_tree;
	var vp8_ymode_tree = entropymode.vp8_ymode_tree;
	var vp8_uv_mode_tree = entropymode.vp8_uv_mode_tree;

	var vp8_mode_contexts = __webpack_require__(94);

	var bitreader = __webpack_require__(70);
	var vpx_read = bitreader.vpx_read;
	var vpx_read_bit = bitreader.vpx_read_bit;


	var vp8_treed_read = __webpack_require__(95);

	var entropymv = __webpack_require__(80);
	var vp8_mv_update_probs = entropymv.vp8_mv_update_probs;

	var DC_PRED = 0;
	var V_PRED = 1;
	var H_PRED = 2;
	var TM_PRED = 3;
	var B_PRED = 4;
	var NEARESTMV = 5;
	var NEARMV = 6;
	var ZEROMV = 7;
	var NEWMV = 8;
	var SPLITMV = 9;
	var MB_MODE_COUNT = 10;

	var CNT_BEST = 0;
	var CNT_ZEROZERO = 0;

	var CNT_INTRA = 0;
	var CNT_NEAREST = 1;
	var CNT_NEAR = 2;
	var CNT_SPLITMV = 3;


	var CURRENT_FRAME = 0;


	var MV_PROB_CNT = 19;

	var INTRA_FRAME = 0;


	var mbsplit_fill_count = new Uint8Array([ 8, 8, 4, 1 ]);

	/*
	 * read_segment_id
	 * vp8_reader *r, MB_MODE_INFO *mi, MACROBLOCKD *x
	 * passing in segment header for now
	 */
	function read_mb_features(r, mi, x) {
	    // Is segmentation enabled 
	    
	    if (x.enabled && x.update_map) {

	        // If so then read the segment id. 
	        if (vpx_read(r, x.tree_probs[0]) === 1) {
	            mi.mbmi.segment_id = 2 + vpx_read(r, x.tree_probs[2]);
	        } else {
	            mi.mbmi.segment_id = vpx_read(r, x.tree_probs[1]);
	        }

	    }
	}

	/**
	 * static MB_PREDICTION_MODE
	 */
	function read_kf_ymode(bc, p) {

	    var i = vp8_treed_read(bc, vp8_kf_ymode_tree, p, 0);

	    return i;
	}

	/*
	 * static B_PREDICTION_MODE
	 */
	function read_bmode(bc, p) {
	    var i = vp8_treed_read(bc, vp8_bmode_tree, p , 0);

	    return i;
	}


	/**
	 * static MB_PREDICTION_MODE
	 */
	function read_uv_mode(bc, p) {

	    var i = vp8_treed_read(bc, vp8_uv_mode_tree, p , 0);

	    return i;
	}


	/**
	 * @param {type} this_
	 * @param {type} this_off
	 * @param {type} left
	 * @param {type} left_off
	 * @param {type} above
	 * @param {type} above_off
	 * @param {type} bool
	 * @returns {undefined}
	 */
	function read_kf_modes(pbi, mi, this_off, bool) {

	    var uv_mode = 0;
	    var mis = pbi.common.mode_info_stride;
	    var bc = bool;
	    var mi_cache = mi[this_off];
	    
	    //Add split mode dynamically to block info
	    mi_cache.init_split_mode();
	    
	    var modes_cache = mi_cache.bmi.modes;
	    mi_cache.mbmi.ref_frame = INTRA_FRAME;
	    mi_cache.mbmi.y_mode = read_kf_ymode(bc, vp8_kf_ymode_prob);

	    if (mi_cache.mbmi.y_mode === B_PRED) {
	        var i = 0;
	        mi_cache.mbmi.is_4x4 = 1;

	        do {
	            var A = above_block_mode(mi, this_off, i, mis);
	            var L = left_block_mode(mi, this_off, i);


	            modes_cache[i] = read_bmode(bc, vp8_kf_bmode_prob[A][L]);

	        } while (++i < 16);

	    }


	    mi_cache.mbmi.uv_mode = read_uv_mode(bc, vp8_kf_uv_mode_prob);


	}

	var clamped_best_mv_1 = MotionVector.create();

	var LEFT_TOP_MARGIN  = (16 << 3);
	var RIGHT_BOTTOM_MARGIN = (16 << 3);

	function vp8_clamp_mv2(mv, bounds) {
	    if (mv.as_row_col[0] < (bounds.mb_to_left_edge)) {
	        mv.as_row_col[0] = bounds.mb_to_left_edge ;
	    } else if (mv.as_row_col[0] > bounds.mb_to_right_edge) {
	        mv.as_row_col[0] = bounds.mb_to_right_edge;
	    }

	    if (mv.as_row_col[1] < (bounds.mb_to_top_edge )) {
	        mv.as_row_col[1] = bounds.mb_to_top_edge;
	    }
	    else if (mv.as_row_col[1] > bounds.mb_to_bottom_edge) {
	        mv.as_row_col[1] = bounds.mb_to_bottom_edge ;
	    }
	}

	//var mv_clamp_mv = MotionVector.create();


	function read_mv(bool, mv, mvc) {
	    mv.as_row_col[1] = read_mv_component(bool, mvc[0]);
	    mv.as_row_col[0] = read_mv_component(bool, mvc[1]);
	}


	var blockmv = MotionVector.create();
	var left_mv = MotionVector.create();
	var above_mv = MotionVector.create();

	function decode_split_mv(mi, left_mb, above_mb, hdr, best_mv, bool) {
	    var partition = 0;
	    var j = 0;
	    var k = 0;
	    var s; //split configuration


	    var num_p = 0;
	    s = 3;
	    num_p = 16;
	    if (vpx_read(bool, 110)) {
	        s = 2;
	        num_p = 4;
	        if (vpx_read(bool, 111)) {
	            s = vpx_read(bool, 150);
	            num_p = 2;
	        }
	    }


	    partition = vp8_mbsplits[s];
	    var mvs = mi.bmi.mvs;


	    do {
	        blockmv.as_int[0] = 0;
	        left_mv.as_int[0] = 0;
	        above_mv.as_int[0] = 0;
	        
	        var subblock_mode;//='prediction_mode'

	        var prob;

	        /* Find the first subblock in this partition. */
	        for (k = 0; j !== partition[k]; k++)
	            ;

	        /* Decode the next MV */
	        if (!(k & 3)) {
	            if (left_mb.mbmi.y_mode === SPLITMV){
	                left_mv.as_int[0] = left_mb.bmi.mvs[k + 3].as_int[0];
	            }else{
	                left_mv.as_int[0] = left_mb.mbmi.mv.as_int[0];
	            }

	        } else {
	            left_mv.as_int[0] = mi.bmi.mvs[k - 1].as_int[0];
	        }
	        
	        
	        if (!(k >> 2)) {
	            if (above_mb.mbmi.y_mode === SPLITMV) {
	                above_mv.as_int[0] = above_mb.bmi.mvs[k + 12].as_int[0];
	            } else {
	                above_mv.as_int[0] = above_mb.mbmi.mv.as_int[0];
	            }

	        } else {
	            above_mv.as_int[0] = mi.bmi.mvs[k - 4].as_int[0];
	        }
	        
	        prob = get_sub_mv_ref_prob(left_mv.as_int[0], above_mv.as_int[0]);
	        
	        if (vpx_read(bool, prob[0])) {
	            if (vpx_read(bool, prob[1])) {
	                //blockmv.as_int[0] = 0;
	                if (vpx_read(bool, prob[2])) {
	                    read_mv(bool, blockmv, hdr.mv_probs);
	                    blockmv.as_row_col[0] = (blockmv.as_row_col[0] + best_mv.as_row_col[0]);
	                    blockmv.as_row_col[1] = (blockmv.as_row_col[1] + best_mv.as_row_col[1] );
	                }
	            } else {
	                blockmv.as_int[0] = above_mv.as_int[0];
	            }
	        } else {
	            blockmv.as_int[0] = left_mv.as_int[0];
	        }
	        
	        var fill_count = mbsplit_fill_count[s];
	        /* Fill the MV's for this partition */
	        for (; k < 16; k++)
	            if (j === partition[k]) {
	                mvs[k].as_int[0] = blockmv.as_int[0];

	            }

	    } while (++j < num_p);
	    
	    mi.mbmi.partitioning = s;
	}

	function get_sub_mv_ref_prob(left, above) {
	  var lez = (left === 0);
	  var aez = (above === 0);
	  var lea = (left === above);
	  var prob;

	  prob = vp8_sub_mv_ref_prob3[(aez << 2) | (lez << 1) | (lea)];

	  return prob;
	}


	var vp8_sub_mv_ref_prob3 = [
	  new Uint8Array([ 147, 136, 18 ]), /* SUBMVREF_NORMAL          */
	  new Uint8Array([ 223, 1, 34 ]),   /* SUBMVREF_LEFT_ABOVE_SAME */
	  new Uint8Array([ 106, 145, 1 ]),  /* SUBMVREF_LEFT_ZED        */
	  new Uint8Array([ 208, 1, 1 ]),    /* SUBMVREF_LEFT_ABOVE_ZED  */
	  new Uint8Array([ 179, 121, 1 ]),  /* SUBMVREF_ABOVE_ZED       */
	  new Uint8Array([ 223, 1, 34 ]),   /* SUBMVREF_LEFT_ABOVE_SAME */
	  new Uint8Array([ 179, 121, 1 ]),  /* SUBMVREF_ABOVE_ZED       */
	  new Uint8Array([ 208, 1, 1 ])     /* SUBMVREF_LEFT_ABOVE_ZED  */
	];

	//(need_mc_border(this_.mbmi.mv, x, y, 16, w, h))
	function need_mc_border(mv, l, t, b_w, w, h) {
	    var b = 0;
	    var r = 0;

	    // Get distance to edge for top-left pixel 
	    l += (mv.as_row_col[0] >> 3);
	    t += (mv.as_row_col[1] >> 3);

	    // Get distance to edge for bottom-right pixel 
	    r = w - (l + b_w);
	    b = h - (t + b_w);

	    return (l >> 1 < 2 || r >> 1 < 3 || t >> 1 < 2 || b >> 1 < 3);
	}

	function mv_bias(mb, sign_bias, ref_frame, mv) {

	    if (sign_bias[mb.mbmi.ref_frame] ^ sign_bias[ref_frame]) {
	        mv.as_row_col[0] *= -1;
	        mv.as_row_col[1] *= -1;
	    }

	}

	function read_mv_component(bool, mvc) {
	    var IS_SHORT = 0, SIGN = 1, SHORT = 2, BITS = SHORT + 7, LONG_WIDTH = 10;
	    var x = 0;

	    if (vpx_read(bool, mvc[IS_SHORT])) // Large 
	    {
	        var i = 0;

	        for (i = 0; i < 3; i++)
	            x += vpx_read(bool, mvc[BITS + i]) << i;

	        /* Skip bit 3, which is sometimes implicit */
	        for (i = LONG_WIDTH - 1; i > 3; i--)
	            x += vpx_read(bool, mvc[BITS + i]) << i;

	        if (!(x & 0xFFF0) || vpx_read(bool, mvc[BITS + 3]))
	            x += 8;
	    } else   /* small */
	        x = vp8_treed_read(bool, vp8_small_mvtree, mvc, +SHORT);//todo

	    if (x && vpx_read(bool, mvc[SIGN]))
	        x = -x;

	    return (x << 1) | 0;
	}

	//Do not need to redeclare these
	var near_mvs = [
	    MotionVector.create(),
	    MotionVector.create(),
	    MotionVector.create(),
	    MotionVector.create()
	];

	var near_mvs_best =  MotionVector.create();

	var chroma_mv = [
	    MotionVector.create(),
	    MotionVector.create(),
	    MotionVector.create(),
	    MotionVector.create()
	];
	        
	var cnt = new Int32Array(4);
	var this_mv_tmp = MotionVector.create();
	function read_mb_modes_mv(pbi, mi, this_off, bool, bounds) {

	    var mbmi = mi[this_off].mbmi;
	    var hdr = pbi.common.entropy_hdr;
	    var this_ = mi[this_off];

	    if (vpx_read(bool, hdr.prob_inter)) {

	        //START DECODE_MVS
	        
	        
	        //nearmvs
	        var clamped_best_mv = clamped_best_mv_1;

	        //var probs = new Uint8Array(4);
	        
	        var left_ = mi[this_off - 1];

	        var BEST = 0;
	        var NEAREST = 1;
	        var NEAR = 2;
	        
	        var mis = pbi.common.mode_info_stride;
	        
	        var above = mi[this_off - mis];
	        
	        
	        var sign_bias = pbi.common.sign_bias;

	        var x = 0, y = 0, w = 0, h = 0, b = 0;

	        mi[this_off].mbmi.ref_frame = vpx_read(bool, hdr.prob_last)
	                ? 2 + vpx_read(bool, hdr.prob_gf)
	                : 1;


	        //START FIND NEAR MVS
	        var aboveleft_off = (this_off - mis) - 1;
	        var nmv = (near_mvs);
	        var mv_off = 0;
	        var cntx = cnt;
	        var cntx_off = 0;

	        /* Zero accumulators */
	        nmv[0].as_int[0] = nmv[1].as_int[0] = nmv[2].as_int[0] = 0;
	        cnt[0] = cnt[1] = cnt[2] = cnt[3] = 0;

	        
	        
	        var aboveleft_ = mi[aboveleft_off];
	        /* Process above */
	        if (above.mbmi.ref_frame !== INTRA_FRAME) {
	            if (above.mbmi.mv.as_int[0]) {
	                nmv[++mv_off].as_int[0] = above.mbmi.mv.as_int[0];
	                mv_bias(above, sign_bias, this_.mbmi.ref_frame, nmv[mv_off]);
	                ++cntx_off;

	            }
	            cntx[cntx_off] += 2;
	        }

	        /* Process left */
	        if (left_.mbmi.ref_frame !== INTRA_FRAME) {
	            if (left_.mbmi.mv.as_int[0]) {
	                var this_mv = this_mv_tmp;

	                this_mv.as_int[0] = left_.mbmi.mv.as_int[0];
	                mv_bias(left_, sign_bias, this_.mbmi.ref_frame, this_mv);

	                if (this_mv.as_int[0] !== nmv[mv_off].as_int[0]) {
	                    nmv[++mv_off].as_int[0] = this_mv.as_int[0];
	                    ++cntx_off;
	                }
	                cntx[cntx_off] += 2;
	            } else
	                cnt[CNT_ZEROZERO] += 2;
	        }

	        /* Process above left */
	        if (aboveleft_.mbmi.ref_frame !== INTRA_FRAME) {

	            if (aboveleft_.mbmi.mv.as_int[0]) {
	                var this_mv = this_mv_tmp;

	                this_mv.as_int[0] = aboveleft_.mbmi.mv.as_int[0];
	                mv_bias(aboveleft_, sign_bias, this_.mbmi.ref_frame,
	                        this_mv);

	                if (this_mv.as_int[0] !== nmv[mv_off].as_int[0]) {
	                    nmv[(++mv_off)].as_int[0] = this_mv.as_int[0];
	                    ++cntx_off;
	                }

	                cntx[cntx_off] += 1;
	            } else
	                cnt[CNT_ZEROZERO] += 1;
	        }

	        /* If we have three distinct MV's ... */
	        if (cnt[CNT_SPLITMV]) {
	            /* See if above-left MV can be merged with NEAREST */
	            if (nmv[mv_off].as_int[0] === near_mvs[CNT_NEAREST].as_int[0])//.raw
	                cnt[CNT_NEAREST] += 1;
	        }

	        cnt[CNT_SPLITMV] = ((above.mbmi.y_mode === SPLITMV)
	                + (left_.mbmi.y_mode === SPLITMV)) * 2
	                + (aboveleft_.mbmi.y_mode === SPLITMV);

	        /* Swap near and nearest if necessary */
	        if (cnt[CNT_NEAR] > cnt[CNT_NEAREST]) {
	            var tmp = 0;
	            tmp = cnt[CNT_NEAREST];
	            cnt[CNT_NEAREST] = cnt[CNT_NEAR];
	            cnt[CNT_NEAR] = tmp;
	            tmp = near_mvs[CNT_NEAREST].as_int[0];
	            near_mvs[CNT_NEAREST].as_int[0] = near_mvs[CNT_NEAR].as_int[0];
	            near_mvs[CNT_NEAR].as_int[0] = tmp;
	        }
	        
	        var near_index;
	        /* Use near_mvs[CNT_BEST] to store the "best" MV. Note that this
	         * storage shares the same address as near_mvs[CNT_ZEROZERO].
	         */
	        if (cnt[CNT_NEAREST] >= cnt[CNT_BEST]) {
	            near_mvs[CNT_BEST].as_int[0] = near_mvs[CNT_NEAREST].as_int[0];
	            //near_mvs[CNT_BEST].as_row_col[1] = near_mvs[CNT_NEAREST].y;
	        }
	        


	        this_.mbmi.need_mc_border = 0;
	        x = (-bounds.mb_to_left_edge - 128) >> 3;
	        y = (-bounds.mb_to_top_edge - 128) >> 3;
	        w = pbi.mb_cols << 4;
	        h = pbi.mb_rows << 4;
	        

	        if (vpx_read(bool, vp8_mode_contexts[cnt[CNT_INTRA]][0])) {


	            if (vpx_read(bool, vp8_mode_contexts[cnt[CNT_NEAREST]][1])) {
	                if (vpx_read(bool, vp8_mode_contexts[cnt[CNT_NEAR]][2])) {



	                    if (vpx_read(bool, vp8_mode_contexts[cnt[CNT_SPLITMV]][3])) {
	                        //splitmv

	                        this_.mbmi.y_mode = SPLITMV;
	                        
	                        
	                        //Reset, dont redeclare
	                        chroma_mv[0].as_int[0] = 0;
	                        chroma_mv[1].as_int[0] = 0;
	                        chroma_mv[2].as_int[0] = 0;
	                        chroma_mv[3].as_int[0] = 0;
	               

	                        //clamped_best_mv = clamp_mv(near_mvs[BEST], bounds);
	                        
	                        clamped_best_mv = near_mvs[BEST];
	                        vp8_clamp_mv2(clamped_best_mv, bounds);
	                        
	                        
	                        decode_split_mv(this_, left_, above, hdr, clamped_best_mv, bool);//&clamped_best_mv
	                        this_.mbmi.mv.as_int[0] = this_.bmi.mvs[15].as_int[0];
	       
	                        var this_mvs = this_.bmi.mvs;
	                        for (b = 0; b < 16; b++) {
	                            
	                            chroma_mv[(b >> 1 & 1) + (b >> 2 & 2)].as_row_col[0] +=
	                                    this_mvs[b].as_row_col[0];
	                            chroma_mv[(b >> 1 & 1) + (b >> 2 & 2)].as_row_col[1] +=
	                                    this_mvs[b].as_row_col[1] ;

	                            if (need_mc_border(this_mvs[b],
	                                    x + (b & 3) * 4, y + (b & ~3), 4, w, h))
	                            {
	                                this_.mbmi.need_mc_border = 1;
	                                break;
	                            }
	                        }

	                        for (b = 0; b < 4; b++) {
	                            chroma_mv[b].as_row_col[0] += 4 + (chroma_mv[b].as_row_col[0] >> 28) | 0;///* + 8 * (chroma_mv[b].as_row_col[0] >> 31)*/;
	                            chroma_mv[b].as_row_col[1] += 4 + (chroma_mv[b].as_row_col[1] >> 28) | 0;
	                            chroma_mv[b].as_row_col[0] = (chroma_mv[b].as_row_col[0] >> 2);
	                            chroma_mv[b].as_row_col[1] = (chroma_mv[b].as_row_col[1] >> 2);

	                            //note we're passing in non-subsampled coordinates
	                            if (need_mc_border(chroma_mv[b],
	                                    x + (b & 1) * 8, y + ((b >> 1) << 3), 16, w, h))
	                            {
	                                this_.mbmi.need_mc_border = 1;
	                                break;
	                            }
	                        }


	                    } else {
	                        //new mv
	                        clamped_best_mv = near_mvs[BEST];
	                        vp8_clamp_mv2(clamped_best_mv, bounds);
	                        
	                        read_mv(bool, this_.mbmi.mv, hdr.mv_probs);
	                        this_.mbmi.mv.as_row_col[0] += clamped_best_mv.as_row_col[0];
	                        this_.mbmi.mv.as_row_col[1] += clamped_best_mv.as_row_col[1] ;
	                        this_.mbmi.y_mode = NEWMV;
	                    }
	                } else {
	                    //nearmv
	                    this_.mbmi.mv.as_int[0] = near_mvs[NEAR].as_int[0];
	                    vp8_clamp_mv2(this_.mbmi.mv, bounds);
	                    this_.mbmi.y_mode = NEARMV;
	                }
	            } else {
	                this_.mbmi.y_mode = NEARESTMV;
	                this_.mbmi.mv.as_int[0] = near_mvs[NEAREST].as_int[0];
	                vp8_clamp_mv2(this_.mbmi.mv, bounds);

	                
	            }
	        } else {
	            this_.mbmi.y_mode = ZEROMV;
	            this_.mbmi.mv.as_int[0] = 0; 
	        }
	        
	        
	        
	        if (need_mc_border(this_.mbmi.mv, x, y, 16, w, h))
	            this_.mbmi.need_mc_border = 1;
	        //END DECODE_MVS

	    } else {

	        //decode_intra_mb_mode(mi[this_off], pbi.common.entropy_hdr, bool);

	        var y_mode = 0, uv_mode = 0;

	        y_mode = vp8_treed_read(bool, vp8_ymode_tree, hdr.y_mode_probs , 0);
	        
	        if (y_mode === B_PRED) {
	            var i = 0;
	            var modes = this_.bmi.modes;
	            var mvs = this_.bmi.mvs;
	            for (i = 0; i < 16; i++) {
	                var b;

	                b = vp8_treed_read(bool, vp8_bmode_tree, vp8_bmode_prob , 0);
	                modes[i] = mvs[i].as_row_col[0] = b;
	                //mvs[i].as_row_col[1] = 0;
	            }
	        }

	   
	        mbmi.y_mode = y_mode;
	        mbmi.uv_mode = vp8_treed_read(bool, vp8_uv_mode_tree, hdr.uv_mode_probs , 0);
	        mbmi.mv.as_row_col[0] = mi[this_off].mbmi.mv.as_row_col[1] = 0;
	        mbmi.ref_frame = CURRENT_FRAME;

	    }

	}


	function decode_mb_mode_mvs(pbi, bool, mi, this_off, bounds) {

	    var mi_cache = mi[this_off];
	    
	    if (pbi.segment_hdr.update_map === 1) {
	        read_mb_features(bool, mi_cache, pbi.segment_hdr);
	    } else if (pbi.common.is_keyframe === true && pbi.segment_hdr.update_map === 0) {
	        mi_cache.mbmi.segment_id = 0;
	    }


	    if (pbi.common.entropy_hdr.coeff_skip_enabled === 1) {
	        mi_cache.mbmi.mb_skip_coeff = vpx_read(bool, pbi.common.entropy_hdr.coeff_skip_prob);
	    } else {
	        mi_cache.mbmi.mb_skip_coeff = 0;
	    }

	    mi_cache.mbmi.is_4x4 = 0;
	    if (pbi.common.is_keyframe === true) {
	        read_kf_modes(pbi, mi, this_off, bool);
	    } else {
	        read_mb_modes_mv(pbi, mi, this_off, bool, bounds);
	    }

	}

	function read_mvcontexts(bc, mvc) {
	    var j = 0;
	    for (var i = 0; i < 2; i++)
	        for (j = 0; j < MV_PROB_CNT; j++)
	            if (vpx_read(bc, vp8_mv_update_probs[i][j]))
	            {
	                var x = bc.get_uint(7);
	                if (x > 0) {
	                    mvc[i][j] = x << 1;
	                } else {
	                    mvc[i][j] = 1;
	                }
	            }
	}

	function mb_mode_mv_init(pbi) {
	    var bc = pbi.boolDecoder;


	    var bool = bc;

	    var i = 0, j = 0, k = 0, l = 0;
	    var x = 0;

	    var coeff_probs = pbi.common.entropy_hdr.coeff_probs;
	    /* Read coefficient probability updates */


	    for (var i = 0; i < 1056; i++) {
	        if (vpx_read(bool, vp8_coef_update_probs[i]) === 1)
	            coeff_probs[i] = bool.get_uint(8);
	    }


	    /* Read coefficient skip mode probability */
	    pbi.common.entropy_hdr.coeff_skip_enabled = vpx_read_bit(bool);

	    if (pbi.common.entropy_hdr.coeff_skip_enabled === 1)
	        pbi.common.entropy_hdr.coeff_skip_prob = bool.get_uint(8);
	    else
	        pbi.common.entropy_hdr.coeff_skip_prob = 0;

	    /* Parse interframe probability updates */
	    
	    if (pbi.common.is_keyframe === false) {
	        pbi.common.entropy_hdr.prob_inter = bool.get_uint(8);
	        pbi.common.entropy_hdr.prob_last = bool.get_uint(8);
	        pbi.common.entropy_hdr.prob_gf = bool.get_uint(8);

	        if (vpx_read_bit(bool) === 1) {
	            pbi.common.entropy_hdr.y_mode_probs[0] = bool.get_uint(8);
	            pbi.common.entropy_hdr.y_mode_probs[1] = bool.get_uint(8);
	            pbi.common.entropy_hdr.y_mode_probs[2] = bool.get_uint(8);
	            pbi.common.entropy_hdr.y_mode_probs[3] = bool.get_uint(8);
	        }

	        if (vpx_read_bit(bool) === 1) {
	            pbi.common.entropy_hdr.uv_mode_probs[0] = bool.get_uint(8);
	            pbi.common.entropy_hdr.uv_mode_probs[1] = bool.get_uint(8);
	            pbi.common.entropy_hdr.uv_mode_probs[2] = bool.get_uint(8);
	        }

	        read_mvcontexts(bc, pbi.common.entropy_hdr.mv_probs);
	    }

	}

	var bounds = {
	        mb_to_left_edge: 0,
	        mb_to_right_edge: 0,
	        mb_to_top_edge: 0,
	        mb_to_bottom_edge: 0
	    };
	    
	function vp8_decode_mode_mvs(pbi, bool) {

	    var mb_row = -1;
	    var mb_rows = pbi.mb_rows;
	    var mb_cols = pbi.mb_cols;
	    var start_col = 0;
	    var mb_mb_to_right_edge_edge_start;

	    bounds.mb_to_left_edge = 0;
	    bounds.mb_to_right_edge = 0;
	    bounds.mb_to_top_edge = 0;
	    bounds.mb_to_bottom_edge = 0;

	    mb_mode_mv_init(pbi);

	    bounds.mb_to_top_edge = 0;

	    while (++mb_row < mb_rows) {
	        var mb_col = -1;

	        var above_off = 0, this_, this_off = 0;



	        this_ = pbi.mb_info_rows;
	        this_off = pbi.mb_info_rows_off[1 + mb_row];
	        above_off = pbi.mb_info_rows_off[mb_row];



	        // Calculate the eighth-pel MV bounds using a 1 MB border.
	        bounds.mb_to_left_edge = -((1) << 7);
	        bounds.mb_to_right_edge = (pbi.mb_cols) << 7;
	        bounds.mb_to_top_edge = -((mb_row + 1) << 7);
	        bounds.mb_to_bottom_edge = (pbi.mb_rows - mb_row) << 7;


	        
	        while (++mb_col < mb_cols) {

	            decode_mb_mode_mvs(pbi, bool, this_, this_off, bounds);


	            if (pbi.common.is_keyframe === true) {


	            } else {

	                bounds.mb_to_left_edge -= 16 << 3;
	                bounds.mb_to_right_edge -= 16 << 3;

	            }

	            // Advance to next mb

	            this_off++; // probably mi_ptr;
	            above_off++;
	        }

	    }

	}

	module.exports = {};
	module.exports.read_mb_features = read_mb_features;
	module.exports.read_kf_modes = read_kf_modes;
	module.exports.vp8_decode_mode_mvs = vp8_decode_mode_mvs;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var MotionVector = __webpack_require__(72);

	var DC_PRED = 0;
	var V_PRED = 1;
	var H_PRED = 2; 
	var TM_PRED = 3; 
	var B_PRED = 4; 

	var DC_PRED = 0;
	var V_PRED = 1;
	var H_PRED = 2;
	var TM_PRED = 3;
	var B_PRED = 4;


	var B_DC_PRED = 0; /* average of above and left pixels */
	var B_TM_PRED = 1;
	var B_VE_PRED = 2; /* vertical prediction */
	var B_HE_PRED = 3; /* horizontal prediction */


	function mv_bias(mb, sign_bias, ref_frame, mv) {
	    
	    if (sign_bias[mb.mbmi.ref_frame] ^ sign_bias[ref_frame]) {
	        mv.as_row_col[0] *= -1;
	        mv.as_row_col[1] *= -1;
	    }
	    
	}

	function above_block_mode(cur_mb, cur_mb_ptr, b, mi_stride) {

	    if (!(b >> 2)) {

	        cur_mb_ptr -= mi_stride;

	        switch (cur_mb[cur_mb_ptr].mbmi.y_mode) {
	            case B_PRED: return cur_mb[cur_mb_ptr].bmi.modes[b + 12];
	            case DC_PRED: return B_DC_PRED;
	            case V_PRED: return B_VE_PRED;
	            case H_PRED: return B_HE_PRED;
	            case TM_PRED: return B_TM_PRED;
	            default: return B_DC_PRED;
	        }
	    }

	    return cur_mb[cur_mb_ptr].bmi.modes[b - 4];
	}



	function left_block_mode(cur_mb, cur_mb_ptr, b) {
	    
	    if (!(b & 3)){
	        cur_mb_ptr -= 1;
	        switch (cur_mb[cur_mb_ptr].mbmi.y_mode) {
	            case DC_PRED: return B_DC_PRED;
	            case V_PRED: return B_VE_PRED;
	            case H_PRED: return B_HE_PRED;
	            case TM_PRED: return B_TM_PRED;
	            case B_PRED: return cur_mb[cur_mb_ptr].bmi.modes[b + 3];
	            default: return B_DC_PRED;
	        }
	    }

	    return cur_mb[cur_mb_ptr].bmi.modes[b - 1];
	}

	module.exports = {};
	module.exports.left_block_mode = left_block_mode;
	module.exports.above_block_mode = above_block_mode;

/***/ },
/* 91 */
/***/ function(module, exports) {

	'use strict';

	//k_default_y_mode_probs
	var vp8_ymode_prob = new Uint8Array([112, 86, 140, 37]);

	//kf_b_mode_probs
	var vp8_kf_bmode_prob  =
	        [
	            [/* above mode 0 */
	                new Uint8Array([/* left mode 0 */ 231, 120, 48, 89, 115, 113, 120, 152, 112]),
	                new Uint8Array([/* left mode 1 */ 152, 179, 64, 126, 170, 118, 46, 70, 95]),
	                new Uint8Array([/* left mode 2 */ 175, 69, 143, 80, 85, 82, 72, 155, 103]),
	                new Uint8Array([/* left mode 3 */ 56, 58, 10, 171, 218, 189, 17, 13, 152]),
	                new Uint8Array([/* left mode 4 */ 144, 71, 10, 38, 171, 213, 144, 34, 26]),
	                new Uint8Array([/* left mode 5 */ 114, 26, 17, 163, 44, 195, 21, 10, 173]),
	                new Uint8Array([/* left mode 6 */ 121, 24, 80, 195, 26, 62, 44, 64, 85]),
	                new Uint8Array([/* left mode 7 */ 170, 46, 55, 19, 136, 160, 33, 206, 71]),
	                new Uint8Array([/* left mode 8 */ 63, 20, 8, 114, 114, 208, 12, 9, 226]),
	                new Uint8Array([/* left mode 9 */ 81, 40, 11, 96, 182, 84, 29, 16, 36])
	            ],
	            [/* above mode 1 */
	                new Uint8Array([/* left mode 0 */ 134, 183, 89, 137, 98, 101, 106, 165, 148]),
	                new Uint8Array([/* left mode 1 */ 72, 187, 100, 130, 157, 111, 32, 75, 80]),
	                new Uint8Array([/* left mode 2 */ 66, 102, 167, 99, 74, 62, 40, 234, 128]),
	                new Uint8Array([/* left mode 3 */ 41, 53, 9, 178, 241, 141, 26, 8, 107]),
	                new Uint8Array([/* left mode 4 */ 104, 79, 12, 27, 217, 255, 87, 17, 7]),
	                new Uint8Array([/* left mode 5 */ 74, 43, 26, 146, 73, 166, 49, 23, 157]),
	                new Uint8Array([/* left mode 6 */ 65, 38, 105, 160, 51, 52, 31, 115, 128]),
	                new Uint8Array([/* left mode 7 */ 87, 68, 71, 44, 114, 51, 15, 186, 23]),
	                new Uint8Array([/* left mode 8 */ 47, 41, 14, 110, 182, 183, 21, 17, 194]),
	                new Uint8Array([/* left mode 9 */ 66, 45, 25, 102, 197, 189, 23, 18, 22])
	            ],
	            [/* above mode 2 */
	                new Uint8Array([/* left mode 0 */ 88, 88, 147, 150, 42, 46, 45, 196, 205]),
	                new Uint8Array([/* left mode 1 */ 43, 97, 183, 117, 85, 38, 35, 179, 61]),
	                new Uint8Array([/* left mode 2 */ 39, 53, 200, 87, 26, 21, 43, 232, 171]),
	                new Uint8Array([/* left mode 3 */ 56, 34, 51, 104, 114, 102, 29, 93, 77]),
	                new Uint8Array([/* left mode 4 */ 107, 54, 32, 26, 51, 1, 81, 43, 31]),
	                new Uint8Array([/* left mode 5 */ 39, 28, 85, 171, 58, 165, 90, 98, 64]),
	                new Uint8Array([/* left mode 6 */ 34, 22, 116, 206, 23, 34, 43, 166, 73]),
	                new Uint8Array([/* left mode 7 */ 68, 25, 106, 22, 64, 171, 36, 225, 114]),
	                new Uint8Array([/* left mode 8 */ 34, 19, 21, 102, 132, 188, 16, 76, 124]),
	                new Uint8Array([/* left mode 9 */ 62, 18, 78, 95, 85, 57, 50, 48, 51])
	            ],
	            [/* above mode 3 */
	                new Uint8Array([/* left mode 0 */ 193, 101, 35, 159, 215, 111, 89, 46, 111]),
	                new Uint8Array([/* left mode 1 */ 60, 148, 31, 172, 219, 228, 21, 18, 111]),
	                new Uint8Array([/* left mode 2 */ 112, 113, 77, 85, 179, 255, 38, 120, 114]),
	                new Uint8Array([/* left mode 3 */ 40, 42, 1, 196, 245, 209, 10, 25, 109]),
	                new Uint8Array([/* left mode 4 */ 100, 80, 8, 43, 154, 1, 51, 26, 71]),
	                new Uint8Array([/* left mode 5 */ 88, 43, 29, 140, 166, 213, 37, 43, 154]),
	                new Uint8Array([/* left mode 6 */ 61, 63, 30, 155, 67, 45, 68, 1, 209]),
	                new Uint8Array([/* left mode 7 */ 142, 78, 78, 16, 255, 128, 34, 197, 171]),
	                new Uint8Array([/* left mode 8 */ 41, 40, 5, 102, 211, 183, 4, 1, 221]),
	                new Uint8Array([/* left mode 9 */ 51, 50, 17, 168, 209, 192, 23, 25, 82])
	            ],
	            [/* above mode 4 */
	                new Uint8Array([/* left mode 0 */ 125, 98, 42, 88, 104, 85, 117, 175, 82]),
	                new Uint8Array([/* left mode 1 */ 95, 84, 53, 89, 128, 100, 113, 101, 45]),
	                new Uint8Array([/* left mode 2 */ 75, 79, 123, 47, 51, 128, 81, 171, 1]),
	                new Uint8Array([/* left mode 3 */ 57, 17, 5, 71, 102, 57, 53, 41, 49]),
	                new Uint8Array([/* left mode 4 */ 115, 21, 2, 10, 102, 255, 166, 23, 6]),
	                new Uint8Array([/* left mode 5 */ 38, 33, 13, 121, 57, 73, 26, 1, 85]),
	                new Uint8Array([/* left mode 6 */ 41, 10, 67, 138, 77, 110, 90, 47, 114]),
	                new Uint8Array([/* left mode 7 */ 101, 29, 16, 10, 85, 128, 101, 196, 26]),
	                new Uint8Array([/* left mode 8 */ 57, 18, 10, 102, 102, 213, 34, 20, 43]),
	                new Uint8Array([/* left mode 9 */ 117, 20, 15, 36, 163, 128, 68, 1, 26])
	            ],
	            [/* above mode 5 */
	                new Uint8Array([/* left mode 0 */ 138, 31, 36, 171, 27, 166, 38, 44, 229]),
	                new Uint8Array([/* left mode 1 */ 67, 87, 58, 169, 82, 115, 26, 59, 179]),
	                new Uint8Array([/* left mode 2 */ 63, 59, 90, 180, 59, 166, 93, 73, 154]),
	                new Uint8Array([/* left mode 3 */ 40, 40, 21, 116, 143, 209, 34, 39, 175]),
	                new Uint8Array([/* left mode 4 */ 57, 46, 22, 24, 128, 1, 54, 17, 37]),
	                new Uint8Array([/* left mode 5 */ 47, 15, 16, 183, 34, 223, 49, 45, 183]),
	                new Uint8Array([/* left mode 6 */ 46, 17, 33, 183, 6, 98, 15, 32, 183]),
	                new Uint8Array([/* left mode 7 */ 65, 32, 73, 115, 28, 128, 23, 128, 205]),
	                new Uint8Array([/* left mode 8 */ 40, 3, 9, 115, 51, 192, 18, 6, 223]),
	                new Uint8Array([/* left mode 9 */ 87, 37, 9, 115, 59, 77, 64, 21, 47])
	            ],
	            [/* above mode 6 */
	                new Uint8Array([/* left mode 0 */ 104, 55, 44, 218, 9, 54, 53, 130, 226]),
	                new Uint8Array([/* left mode 1 */ 64, 90, 70, 205, 40, 41, 23, 26, 57]),
	                new Uint8Array([/* left mode 2 */ 54, 57, 112, 184, 5, 41, 38, 166, 213]),
	                new Uint8Array([/* left mode 3 */ 30, 34, 26, 133, 152, 116, 10, 32, 134]),
	                new Uint8Array([/* left mode 4 */ 75, 32, 12, 51, 192, 255, 160, 43, 51]),
	                new Uint8Array([/* left mode 5 */ 39, 19, 53, 221, 26, 114, 32, 73, 255]),
	                new Uint8Array([/* left mode 6 */ 31, 9, 65, 234, 2, 15, 1, 118, 73]),
	                new Uint8Array([/* left mode 7 */ 88, 31, 35, 67, 102, 85, 55, 186, 85]),
	                new Uint8Array([/* left mode 8 */ 56, 21, 23, 111, 59, 205, 45, 37, 192]),
	                new Uint8Array([/* left mode 9 */ 55, 38, 70, 124, 73, 102, 1, 34, 98])
	            ],
	            [/* above mode 7 */
	                new Uint8Array([/* left mode 0 */ 102, 61, 71, 37, 34, 53, 31, 243, 192]),
	                new Uint8Array([/* left mode 1 */ 69, 60, 71, 38, 73, 119, 28, 222, 37]),
	                new Uint8Array([/* left mode 2 */ 68, 45, 128, 34, 1, 47, 11, 245, 171]),
	                new Uint8Array([/* left mode 3 */ 62, 17, 19, 70, 146, 85, 55, 62, 70]),
	                new Uint8Array([/* left mode 4 */ 75, 15, 9, 9, 64, 255, 184, 119, 16]),
	                new Uint8Array([/* left mode 5 */ 37, 43, 37, 154, 100, 163, 85, 160, 1]),
	                new Uint8Array([/* left mode 6 */ 63, 9, 92, 136, 28, 64, 32, 201, 85]),
	                new Uint8Array([/* left mode 7 */ 86, 6, 28, 5, 64, 255, 25, 248, 1]),
	                new Uint8Array([/* left mode 8 */ 56, 8, 17, 132, 137, 255, 55, 116, 128]),
	                new Uint8Array([/* left mode 9 */ 58, 15, 20, 82, 135, 57, 26, 121, 40])
	            ],
	            [/* above mode 8 */
	                new Uint8Array([/* left mode 0 */ 164, 50, 31, 137, 154, 133, 25, 35, 218]),
	                new Uint8Array([/* left mode 1 */ 51, 103, 44, 131, 131, 123, 31, 6, 158]),
	                new Uint8Array([/* left mode 2 */ 86, 40, 64, 135, 148, 224, 45, 183, 128]),
	                new Uint8Array([/* left mode 3 */ 22, 26, 17, 131, 240, 154, 14, 1, 209]),
	                new Uint8Array([/* left mode 4 */ 83, 12, 13, 54, 192, 255, 68, 47, 28]),
	                new Uint8Array([/* left mode 5 */ 45, 16, 21, 91, 64, 222, 7, 1, 197]),
	                new Uint8Array([/* left mode 6 */ 56, 21, 39, 155, 60, 138, 23, 102, 213]),
	                new Uint8Array([/* left mode 7 */ 85, 26, 85, 85, 128, 128, 32, 146, 171]),
	                new Uint8Array([/* left mode 8 */ 18, 11, 7, 63, 144, 171, 4, 4, 246]),
	                new Uint8Array([/* left mode 9 */ 35, 27, 10, 146, 174, 171, 12, 26, 128])
	            ],
	            [/* above mode 9 */
	                new Uint8Array([/* left mode 0 */ 190, 80, 35, 99, 180, 80, 126, 54, 45]),
	                new Uint8Array([/* left mode 1 */ 85, 126, 47, 87, 176, 51, 41, 20, 32]),
	                new Uint8Array([/* left mode 2 */ 101, 75, 128, 139, 118, 146, 116, 128, 85]),
	                new Uint8Array([/* left mode 3 */ 56, 41, 15, 176, 236, 85, 37, 9, 62]),
	                new Uint8Array([/* left mode 4 */ 146, 36, 19, 30, 171, 255, 97, 27, 20]),
	                new Uint8Array([/* left mode 5 */ 71, 30, 17, 119, 118, 255, 17, 18, 138]),
	                new Uint8Array([/* left mode 6 */ 101, 38, 60, 138, 55, 70, 43, 26, 142]),
	                new Uint8Array([/* left mode 7 */ 138, 45, 61, 62, 219, 1, 81, 188, 64]),
	                new Uint8Array([/* left mode 8 */ 32, 41, 20, 117, 151, 142, 20, 21, 163]),
	                new Uint8Array([/* left mode 9 */ 112, 19, 12, 61, 195, 128, 48, 4, 24])
	            ]
	        ];

	module.exports = {};
	module.exports.vp8_kf_bmode_prob = vp8_kf_bmode_prob;
	module.exports.vp8_ymode_prob = vp8_ymode_prob;

/***/ },
/* 92 */
/***/ function(module, exports) {

	'use strict';
	/*
	 * File: coefupdateprobs
	 */
	var vp8_coef_update_probs = new Uint8Array([
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 176, 246, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 223, 241, 252, 255, 255, 255,
	    255, 255, 255, 255, 255, 249, 253, 253, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 244, 252, 255,
	    255, 255, 255, 255, 255, 255, 255, 234, 254, 254,
	    255, 255, 255, 255, 255, 255, 255, 255, 253, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    246, 254, 255, 255, 255, 255, 255, 255, 255, 255,
	    239, 253, 254, 255, 255, 255, 255, 255, 255, 255,
	    255, 254, 255, 254, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 248, 254, 255, 255, 255, 255, 255,
	    255, 255, 255, 251, 255, 254, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 253, 254, 255, 255,
	    255, 255, 255, 255, 255, 255, 251, 254, 254, 255,
	    255, 255, 255, 255, 255, 255, 255, 254, 255, 254,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 254,
	    253, 255, 254, 255, 255, 255, 255, 255, 255, 250,
	    255, 254, 255, 254, 255, 255, 255, 255, 255, 255,
	    254, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 217, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 225, 252, 241, 253, 255,
	    255, 254, 255, 255, 255, 255, 234, 250, 241, 250,
	    253, 255, 253, 254, 255, 255, 255, 255, 254, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 223, 254,
	    254, 255, 255, 255, 255, 255, 255, 255, 255, 238,
	    253, 254, 254, 255, 255, 255, 255, 255, 255, 255,
	    255, 248, 254, 255, 255, 255, 255, 255, 255, 255,
	    255, 249, 254, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 253, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 247, 254, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 253, 254, 255,
	    255, 255, 255, 255, 255, 255, 255, 252, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    254, 254, 255, 255, 255, 255, 255, 255, 255, 255,
	    253, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 254, 253, 255, 255, 255, 255, 255,
	    255, 255, 255, 250, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 254, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 186, 251,
	    250, 255, 255, 255, 255, 255, 255, 255, 255, 234,
	    251, 244, 254, 255, 255, 255, 255, 255, 255, 255,
	    251, 251, 243, 253, 254, 255, 254, 255, 255, 255,
	    255, 255, 253, 254, 255, 255, 255, 255, 255, 255,
	    255, 255, 236, 253, 254, 255, 255, 255, 255, 255,
	    255, 255, 255, 251, 253, 253, 254, 254, 255, 255,
	    255, 255, 255, 255, 255, 254, 254, 255, 255, 255,
	    255, 255, 255, 255, 255, 254, 254, 254, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 254, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 254, 254,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 254,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 254, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 248, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 250, 254, 252, 254, 255, 255, 255,
	    255, 255, 255, 255, 248, 254, 249, 253, 255, 255,
	    255, 255, 255, 255, 255, 255, 253, 253, 255, 255,
	    255, 255, 255, 255, 255, 255, 246, 253, 253, 255,
	    255, 255, 255, 255, 255, 255, 255, 252, 254, 251,
	    254, 254, 255, 255, 255, 255, 255, 255, 255, 254,
	    252, 255, 255, 255, 255, 255, 255, 255, 255, 248,
	    254, 253, 255, 255, 255, 255, 255, 255, 255, 255,
	    253, 255, 254, 254, 255, 255, 255, 255, 255, 255,
	    255, 255, 251, 254, 255, 255, 255, 255, 255, 255,
	    255, 255, 245, 251, 254, 255, 255, 255, 255, 255,
	    255, 255, 255, 253, 253, 254, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 251, 253, 255, 255, 255,
	    255, 255, 255, 255, 255, 252, 253, 254, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 254, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 252, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 249, 255,
	    254, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 254, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 253, 255, 255, 255, 255, 255, 255, 255,
	    255, 250, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 254, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
	    255, 255, 255, 255, 255, 255]);

	module.exports = vp8_coef_update_probs;

/***/ },
/* 93 */
/***/ function(module, exports) {

	'use strict';
	var DC_PRED = 0;
	var V_PRED = 1;
	var H_PRED = 2; /* horizontal prediction */
	var TM_PRED = 3; /* Truemotion prediction */
	var B_PRED = 4; /* block based prediction, each block has its own prediction mode */
	var NEARESTMV = 5;
	var NEARMV = 6;
	var ZEROMV = 7;
	var NEWMV = 8;
	var SPLITMV = 9;
	var MB_MODE_COUNT = 10;

	var B_DC_PRED = 0, /* average of above and left pixels */
	        B_TM_PRED = 1,
	        B_VE_PRED = 2, /* vertical prediction */
	        B_HE_PRED = 3, /* horizontal prediction */

	        B_LD_PRED = 4,
	        B_RD_PRED = 5,
	        B_VR_PRED = 6,
	        B_VL_PRED = 7,
	        B_HD_PRED = 8,
	        B_HU_PRED = 9,
	        LEFT4X4 = 10,
	        ABOVE4X4 = 11,
	        ZERO4X4 = 12,
	        NEW4X4 = 13,
	        B_MODE_COUNT = 14
	        ;//} B_PREDICTION_MODE;

	//b_mode_tree in dixie version
	var vp8_bmode_tree =
	        new Int32Array([
	            -B_DC_PRED, 2, /* 0 = DC_NODE */
	            -B_TM_PRED, 4, /* 1 = TM_NODE */
	            -B_VE_PRED, 6, /* 2 = VE_NODE */
	            8, 12, /* 3 = COM_NODE */
	            -B_HE_PRED, 10, /* 4 = HE_NODE */
	            -B_RD_PRED, -B_VR_PRED, /* 5 = RD_NODE */
	            -B_LD_PRED, 14, /* 6 = LD_NODE */
	            -B_VL_PRED, 16, /* 7 = VL_NODE */
	            -B_HD_PRED, -B_HU_PRED         /* 8 = HD_NODE */
	        ]);

	//kf_y_mode_tree in dixie version
	var vp8_kf_ymode_tree =
	        new Int32Array([
	            -B_PRED, 2,
	            4, 6,
	            -DC_PRED, -V_PRED,
	            -H_PRED, -TM_PRED
	        ]);

	var vp8_ymode_tree =
	        new Int32Array([
	            -DC_PRED, 2,
	            4, 6,
	            -V_PRED, -H_PRED,
	            -TM_PRED, -B_PRED
	        ]);

	var vp8_uv_mode_tree =
	        new Int32Array([
	            -DC_PRED, 2,
	            -V_PRED, 4,
	            -H_PRED, -TM_PRED
	        ]);

	var vp8_mv_ref_tree = new Int32Array([
	    -ZEROMV, 2,
	    -NEARESTMV, 4,
	    -NEARMV, 6,
	    -NEWMV, -SPLITMV
	]);

	var vp8_sub_mv_ref_tree = new Int32Array([
	    -LEFT4X4, 2,
	    -ABOVE4X4, 4,
	    -ZERO4X4, -NEW4X4
	]);

	var vp8_small_mvtree =
	        new Int32Array([
	            2, 8,
	            4, 6,
	            -0, -1,
	            -2, -3,
	            10, 12,
	            -4, -5,
	            -6, -7
	        ]);

	var vp8_mbsplit_tree = new Int32Array([
	    -3, 2,
	    -2, 4,
	    -0, -1
	]);

	var vp8_mbsplits =
	        [
	            new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]),
	            new Int32Array([0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1]),
	            new Int32Array([0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 3, 3, 2, 2, 3, 3]),
	            new Int32Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
	        ];

	var vp8_sub_mv_ref_prob2 =
	        [
	            new Int32Array([147, 136, 18]),
	            new Int32Array([106, 145, 1]),
	            new Int32Array([179, 121, 1]),
	            new Int32Array([223, 1, 34]),
	            new Int32Array([208, 1, 1])
	        ];

	//vp8_mbsplit_probs
	var vp8_mbsplit_probs = new Uint8Array([110, 111, 150]);


	// k_default_y_mode_probs
	var vp8_ymode_prob = new Uint8Array([112, 86, 140, 37]);
	var vp8_ymode_prob_32 = new Uint32Array(vp8_ymode_prob.buffer);

	//k_default_uv_mode_probs
	var vp8_uv_mode_prob = new Uint8Array([162, 101, 204]);

	//kf_uv_mode_probs
	var vp8_kf_uv_mode_prob = new Uint8Array([142, 114, 183]);

	//kf_y_mode_probs        
	var vp8_kf_ymode_prob = new Uint8Array([145, 156, 163, 128]);

	//default_b_mode_probs
	var vp8_bmode_prob = new Uint8Array([120, 90, 79, 133, 87, 85, 80, 111, 151]);

	function vp8_init_mbmode_probs(x) {

	    var probs = vp8_ymode_prob;
	    x.entropy_hdr.y_mode_probs_32[0] = vp8_ymode_prob_32[0];
	/*
	    probs = vp8_uv_mode_prob;
	    //for (var i = 0; i < 3; i++)
	    x.entropy_hdr.uv_mode_probs[0] = probs[0];
	    x.entropy_hdr.uv_mode_probs[1] = probs[1];
	    x.entropy_hdr.uv_mode_probs[2] = probs[2];
	    */
	    x.entropy_hdr.uv_mode_probs.set(vp8_uv_mode_prob);
	}

	module.exports = {};
	module.exports.vp8_bmode_tree = vp8_bmode_tree;
	module.exports.vp8_kf_ymode_tree = vp8_kf_ymode_tree;
	module.exports.vp8_uv_mode_tree = vp8_uv_mode_tree;
	module.exports.vp8_kf_uv_mode_prob = vp8_kf_uv_mode_prob;
	module.exports.vp8_kf_ymode_prob = vp8_kf_ymode_prob;
	module.exports.vp8_uv_mode_prob = vp8_uv_mode_prob;
	module.exports.vp8_bmode_prob = vp8_bmode_prob;
	module.exports.vp8_ymode_prob = vp8_ymode_prob;
	module.exports.vp8_ymode_tree = vp8_ymode_tree;
	module.exports.vp8_mbsplit_probs = vp8_mbsplit_probs;
	module.exports.vp8_mv_ref_tree = vp8_mv_ref_tree;
	module.exports.vp8_sub_mv_ref_tree = vp8_sub_mv_ref_tree;
	module.exports.vp8_small_mvtree = vp8_small_mvtree;
	module.exports.vp8_mbsplit_tree = vp8_mbsplit_tree;
	module.exports.vp8_mbsplits = vp8_mbsplits;
	module.exports.vp8_sub_mv_ref_prob2 = vp8_sub_mv_ref_prob2;
	module.exports.vp8_init_mbmode_probs = vp8_init_mbmode_probs;

/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';

	var vp8_mode_contexts =
	        [
	            new Uint8Array([7, 1, 1, 143]),
	            new Uint8Array([14, 18, 14, 107]),
	            new Uint8Array([135, 64, 57, 68]),
	            new Uint8Array([60, 56, 128, 65]),
	            new Uint8Array([159, 134, 128, 34]),
	            new Uint8Array([234, 188, 128, 28])

	        ];

	module.exports = vp8_mode_contexts;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bitreader = __webpack_require__(70);
	var vpx_read = bitreader.vpx_read;


	function vp8_treed_read(r, t, p, p_off) {
	    
	    var i = 0;


	        while ((i = t[ i + vpx_read(r, p[p_off + (i >> 1)])]) > 0) {}




	    return (-i) | 0;
	}

	module.exports = vp8_treed_read;

/***/ },
/* 96 */
/***/ function(module, exports) {

	'use strict';



	class vpx_codec_ctx {

	    constructor() {
	        this.name;             //Printable interface name
	        this.iface;     //vpx_codec_iface_t
	        this.err; //vpx_codec_err_t       /**< Last returned error */
	        this.err_detail;       /**< Detailed info, if available */
	        this.init_flags; // Flags passed at init time //vpx_codec_flags_t
	        this.config = {
	            vpx_codec_dec_cfg : null
	        };


	        this.priv; //vpx_codec_priv_t Algorithm private storage 
	    }
	    
	}

	module.exports = {};
	module.exports.vpx_codec_ctx_t = vpx_codec_ctx; //vpx_codec_ctx_t

/***/ }
/******/ ]);