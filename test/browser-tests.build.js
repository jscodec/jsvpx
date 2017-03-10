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

	var vpx_codec = __webpack_require__(101);
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

	var reconintra = __webpack_require__(92);
	var predict_intra_chroma = reconintra.predict_intra_chroma;
	var predict_intra_luma = reconintra.predict_intra_luma;

	var dboolhuff = __webpack_require__(69);
	var vp8dx_start_decode = dboolhuff.vp8dx_start_decode;

	var decodemv = __webpack_require__(94);
	var vp8_decode_mode_mvs = decodemv.vp8_decode_mode_mvs;

	var entropymode = __webpack_require__(98);
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

	var filter_gpu = __webpack_require__(86);
	var using_gpu = false;
	var gpujs = __webpack_require__(87);
	var gpu;

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


	if (typeof document !== 'undefined') {
	    var canvasEl = document.createElement('canvas'); //create the canvas object
	    if (!canvasEl.getContext) //if the method is not supported, i.e canvas is not supported
	    {
	        console.warn("No GPU support");

	    } else {

	        
	        using_gpu = true;
	        gpu = new gpujs();

	    }
	}

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
	   
	   


	    var render = gpu.createKernel(function (img_buffer) {
	        
	        return img_buffer[this.thread.x];
	        
	    }).dimensions([img.y.length]).outputToTexture(true);
	    
	    var chained = gpu.createKernel(function (img_buffer) {
	        
	        return img_buffer[this.thread.x];
	        
	    }).dimensions([img.y.length]);
	    
	    var temp_gpu = render(img.y);
	    var temp_gpu_chained = chained(temp_gpu);

	    
	    var new_frame = Uint8Array.from(temp_gpu_chained);
	    ctx.ref_frames[CURRENT_FRAME].img.img_data = new_frame;
	    ctx.ref_frames[CURRENT_FRAME].img.img_data.data_32 = new Uint32Array(new_frame.buffer);

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
	    
	    /*
	    var out_img = ref_frames[CURRENT_FRAME].img.img_data;
	    var render = gpu.createKernel(function (img_buffer) {
	        
	        return img_buffer[this.thread.x];
	        
	    }).dimensions([out_img.length]);
	    
	    var temp_gpu = render(ref_frames[CURRENT_FRAME].img.img_data);
	    //this_frame_mbmi = temp_gpu;//Uint8Array.from(render(temp_gpu));
	    ref_frames[CURRENT_FRAME].img.img_data = Uint8Array.from(temp_gpu);
	    ref_frames[CURRENT_FRAME].img.img_data.data_32 = new Uint32Array(ref_frames[CURRENT_FRAME].img.img_data.buffer);
	    //output = Uint8Array.from(render(output));
	    
	*/
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
	            var use_filter = mbi[mbi_off].mbmi.eob_mask
	                    || mbi[mbi_off].mbmi.y_mode === SPLITMV
	                    || mbi[mbi_off].mbmi.y_mode === B_PRED;
	            
	            if (col > 0)
	                vp8_loop_filter_mbv(y, y_off, u_off, v_off, stride, uv_stride, edge_limit, interior_limit, hev_threshold);


	            //vp8_loop_filter_bv_c
	            if (use_filter)
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

	            if (use_filter)
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
	        f2 = 15;
	    }else{
	        f1 = (a + 4) >> 3;
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

	var filter_gpu = __webpack_require__(86);
	var using_gpu = false;
	var gpujs = __webpack_require__(87);
	var gpu;

	var SPLITMV = 9;

	var idctllm = __webpack_require__(91);
	var vp8_short_inv_walsh4x4_c = idctllm.vp8_short_inv_walsh4x4_c;
	var vp8_short_idct4x4llm_c = idctllm.vp8_short_idct4x4llm_c;

	var c_utils = __webpack_require__(79);
	var memset = c_utils.memset;
	var memcpy = c_utils.memcpy;

	if (typeof document !== 'undefined') {
	    var canvasEl = document.createElement('canvas'); //create the canvas object
	    if (!canvasEl.getContext) //if the method is not supported, i.e canvas is not supported
	    {
	        console.warn("No GPU support");

	    } else {

	        filter_block2d = filter_gpu.filter_block2d_gpu;
	        using_gpu = true;
	        gpu = new gpujs();

	    }
	}




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
	    
	    //if (using_gpu)
	      //  output = Uint8Array.from(render(output));
	    

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var gpujs = __webpack_require__(87);
	var gpu;
	var gpu_controller;

	if (typeof document !== 'undefined') {
	    var canvasEl = document.createElement('canvas'); //create the canvas object
	    if (canvasEl.getContext) //if the method is not supported, i.e canvas is not supported
	    {
	        gpu = new gpujs();
	        console.warn("Loading GPU");
	    }
	}


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


	var VP8_FILTER_SHIFT = 7;


	function CLAMP_255(x) {
	    return  Math.min(Math.max(x, 0), 255);
	}



	function filter_block2d_first_pass(output,
	        output_off, output_width, src, src_ptr,
	        reference_stride, cols, output_height, vp8_filter) {
	            
	    var r = 0, c = 0;
	    var Temp = 0;
	    
	    /*
	    var render = gpu.createKernel(function (img_buffer) {
	        
	        return img_buffer[this.thread.x];
	        
	    }).dimensions([output.length]);
	    */
	    //output = render(output);
	    //output = Uint8Array.from(render(output));
	    //console.warn("done");

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

	    for (r = 0; r < rows; r++)
	    {
	        for (c = 0; c < cols; c++)
	        {
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

	//likely filter_block2d
	var temp = new Uint8Array(336);

	function filter_block2d_gpu(output, output_off,
	        output_stride, reference,
	        reference_off, reference_stride,
	        cols, rows,
	        mx, my, filters) {


	    filter_block2d_first_pass(temp, 0, 16,
	            reference, reference_off - 2 * reference_stride, reference_stride,
	            cols, rows + 5, filters[mx]);

	    filter_block2d_second_pass(output, output_off, output_stride,
	            temp, 32, 16, cols, rows, filters[my]);
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
	    var mx = 0, my = 0;



	    mx = mv_.x & 7;
	    my = mv_.y & 7;
	    //reference_off += ((mv_.y >> 3) * stride) + (mv_.x >> 3);

	    if (mx | my)
	    {
	        filter_block2d(output, output_off, stride, reference, reference_off, stride, 4, 4, mx, my,
	                filters);
	        //reference = output;
	        //reference_off = output_off;
	    }

	    //return_off[0] = reference_off;
	    //return reference;
	}

	module.exports = {};
	module.exports.filter_block2d_gpu = filter_block2d_gpu;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, module) {///
	/// gpu.js
	/// http://gpu.rocks/
	///
	/// GPU Accelerated JavaScript
	///
	/// @version 0.0.0
	/// @date    Mon Jan 30 2017 12:00:46 GMT+0800 (SGT)
	///
	/// @license MIT
	/// The MIT License
	///
	/// Copyright (c) 2017 Fazli Sapuan, Matthew Saw and Eugene Cheah
	///
	/// Permission is hereby granted, free of charge, to any person obtaining a copy
	/// of this software and associated documentation files (the "Software"), to deal
	/// in the Software without restriction, including without limitation the rights
	/// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	/// copies of the Software, and to permit persons to whom the Software is
	/// furnished to do so, subject to the following conditions:
	///
	/// The above copyright notice and this permission notice shall be included in
	/// all copies or substantial portions of the Software.
	///
	/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	/// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	/// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	/// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	/// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	/// THE SOFTWARE.
	///
	module.exports=function(){var parser=function(){function createSourceLocation(source,firstToken,lastToken){return new SourceLocation(source,new Position(firstToken.first_line,firstToken.first_column),new Position(lastToken.last_line,lastToken.last_column))}function parseRegularExpressionLiteral(literal){var last=literal.lastIndexOf("/"),body=literal.substring(1,last),flags=literal.substring(last+1);return new RegExp(body,flags)}function parseNumericLiteral(literal){return"0"===literal.charAt(0)?"x"===literal.charAt(1).toLowerCase()?parseInt(literal,16):"."===literal.charAt(1)?parseFloat(literal):parseInt(literal,8):Number(literal)}function ProgramNode(body,loc){this.type="Program",this.body=body,this.loc=loc}function EmptyStatementNode(loc){this.type="EmptyStatement",this.loc=loc}function BlockStatementNode(body,loc){this.type="BlockStatement",this.body=body,this.loc=loc}function ExpressionStatementNode(expression,loc){this.type="ExpressionStatement",this.expression=expression,this.loc=loc}function IfStatementNode(test,consequent,alternate,loc){this.type="IfStatement",this.test=test,this.consequent=consequent,this.alternate=alternate,this.loc=loc}function LabeledStatementNode(label,body,loc){this.type="LabeledStatement",this.label=label,this.body=body,this.loc=loc}function BreakStatementNode(label,loc){this.type="BreakStatement",this.label=label,this.loc=loc}function ContinueStatementNode(label,loc){this.type="ContinueStatement",this.label=label,this.loc=loc}function WithStatementNode(object,body,loc){this.type="WithStatement",this.object=object,this.body=body,this.loc=loc}function SwitchStatementNode(discriminant,cases,loc){this.type="SwitchStatement",this.discriminant=discriminant,this.cases=cases,this.loc=loc}function ReturnStatementNode(argument,loc){this.type="ReturnStatement",this.argument=argument,this.loc=loc}function ThrowStatementNode(argument,loc){this.type="ThrowStatement",this.argument=argument,this.loc=loc}function TryStatementNode(block,handlers,finalizer,loc){this.type="TryStatement",this.block=block,this.handlers=handlers,this.finalizer=finalizer,this.loc=loc}function WhileStatementNode(test,body,loc){this.type="WhileStatement",this.test=test,this.body=body,this.loc=loc}function DoWhileStatementNode(body,test,loc){this.type="DoWhileStatement",this.body=body,this.test=test,this.loc=loc}function ForStatementNode(init,test,update,body,loc){this.type="ForStatement",this.init=init,this.test=test,this.update=update,this.body=body,this.loc=loc}function ForInStatementNode(left,right,body,loc){this.type="ForInStatement",this.left=left,this.right=right,this.body=body,this.loc=loc}function DebugggerStatementNode(loc){this.type="DebuggerStatement",this.loc=loc}function FunctionDeclarationNode(id,params,body,generator,expression,loc){this.type="FunctionDeclaration",this.id=id,this.params=params,this.body=body,this.generator=generator,this.expression=expression,this.loc=loc}function VariableDeclarationNode(declarations,kind,loc){this.type="VariableDeclaration",this.declarations=declarations,this.kind=kind,this.loc=loc}function VariableDeclaratorNode(id,init,loc){this.type="VariableDeclarator",this.id=id,this.init=init,this.loc=loc}function ThisExpressionNode(loc){this.type="ThisExpression",this.loc=loc}function ArrayExpressionNode(elements,loc){this.type="ArrayExpression",this.elements=elements,this.loc=loc}function ObjectExpressionNode(properties,loc){this.type="ObjectExpression",this.properties=properties,this.loc=loc}function FunctionExpressionNode(id,params,body,generator,expression,loc){this.type="FunctionExpression",this.id=id,this.params=params,this.body=body,this.generator=generator,this.expression=expression,this.loc=loc}function SequenceExpressionNode(expressions,loc){this.type="SequenceExpression",this.expressions=expressions,this.loc=loc}function UnaryExpressionNode(operator,prefix,argument,loc){this.type="UnaryExpression",this.operator=operator,this.prefix=prefix,this.argument=argument,this.loc=loc}function BinaryExpressionNode(operator,left,right,loc){this.type="BinaryExpression",this.operator=operator,this.left=left,this.right=right,this.loc=loc}function AssignmentExpressionNode(operator,left,right,loc){this.type="AssignmentExpression",this.operator=operator,this.left=left,this.right=right,this.loc=loc}function UpdateExpressionNode(operator,argument,prefix,loc){this.type="UpdateExpression",this.operator=operator,this.argument=argument,this.prefix=prefix,this.loc=loc}function LogicalExpressionNode(operator,left,right,loc){this.type="LogicalExpression",this.operator=operator,this.left=left,this.right=right,this.loc=loc}function ConditionalExpressionNode(test,consequent,alternate,loc){this.type="ConditionalExpression",this.test=test,this.consequent=consequent,this.alternate=alternate,this.loc=loc}function NewExpressionNode(callee,args,loc){this.type="NewExpression",this.callee=callee,this.arguments=args,this.loc=loc}function CallExpressionNode(callee,args,loc){this.type="CallExpression",this.callee=callee,this.arguments=args,this.loc=loc}function MemberExpressionNode(object,property,computed,loc){this.type="MemberExpression",this.object=object,this.property=property,this.computed=computed,this.loc=loc}function SwitchCaseNode(test,consequent,loc){this.type="SwitchCase",this.test=test,this.consequent=consequent,this.loc=loc}function CatchClauseNode(param,body,loc){this.type="CatchClause",this.param=param,this.guard=null,this.body=body,this.loc=loc}function IdentifierNode(name,loc){this.type="Identifier",this.name=name,this.loc=loc}function LiteralNode(value,loc){this.type="Literal",this.value=value,this.loc=loc}function SourceLocation(source,start,end){this.source=source,this.start=start,this.end=end}function Position(line,column){this.line=line,this.column=column}function Parser(){this.yy={}}var parser={trace:function(){},yy:{},symbols_:{error:2,Statement:3,Block:4,VariableStatement:5,EmptyStatement:6,ExpressionStatement:7,IfStatement:8,IterationStatement:9,ContinueStatement:10,BreakStatement:11,ReturnStatement:12,WithStatement:13,LabelledStatement:14,SwitchStatement:15,ThrowStatement:16,TryStatement:17,DebuggerStatement:18,"{":19,StatementList:20,"}":21,VAR:22,VariableDeclarationList:23,VariableDeclaration:24,",":25,VariableDeclarationListNoIn:26,VariableDeclarationNoIn:27,IDENTIFIER:28,Initialiser:29,InitialiserNoIn:30,"=":31,AssignmentExpression:32,AssignmentExpressionNoIn:33,";":34,ExpressionNoBF:35,IF:36,"(":37,Expression:38,")":39,ELSE:40,DO:41,WHILE:42,FOR:43,ExpressionNoIn:44,LeftHandSideExpression:45,IN:46,CONTINUE:47,BREAK:48,RETURN:49,WITH:50,SWITCH:51,CaseBlock:52,CaseClauses:53,DefaultClause:54,CaseClause:55,CASE:56,":":57,DEFAULT:58,THROW:59,TRY:60,Catch:61,Finally:62,CATCH:63,FINALLY:64,DEBUGGER:65,FunctionDeclaration:66,FUNCTION:67,FunctionBody:68,FormalParameterList:69,FunctionExpression:70,SourceElements:71,Program:72,EOF:73,SourceElement:74,PrimaryExpression:75,PrimaryExpressionNoBrace:76,ObjectLiteral:77,THIS:78,Literal:79,ArrayLiteral:80,"[":81,"]":82,Elision:83,ElementList:84,PropertyNameAndValueList:85,PropertyAssignment:86,PropertyName:87,PropertySetParameterList:88,IdentifierName:89,StringLiteral:90,NumericLiteral:91,MemberExpression:92,".":93,NEW:94,Arguments:95,MemberExpressionNoBF:96,NewExpression:97,NewExpressionNoBF:98,CallExpression:99,CallExpressionNoBF:100,ReservedWord:101,ArgumentList:102,LeftHandSideExpressionNoBF:103,PostfixExpression:104,"++":105,"--":106,PostfixExpressionNoBF:107,UnaryExpression:108,UnaryExpr:109,UnaryExpressionNoBF:110,DELETE:111,VOID:112,TYPEOF:113,"BR++":114,"BR--":115,"+":116,"-":117,"~":118,"!":119,MultiplicativeExpression:120,"*":121,"/":122,"%":123,MultiplicativeExpressionNoBF:124,AdditiveExpression:125,AdditiveExpressionNoBF:126,ShiftExpression:127,"<<":128,">>":129,">>>":130,ShiftExpressionNoBF:131,RelationalExpression:132,"<":133,">":134,"<=":135,">=":136,INSTANCEOF:137,RelationalExpressionNoIn:138,RelationalExpressionNoBF:139,EqualityExpression:140,"==":141,"!=":142,"===":143,"!==":144,EqualityExpressionNoIn:145,EqualityExpressionNoBF:146,BitwiseANDExpression:147,"&":148,BitwiseANDExpressionNoIn:149,BitwiseANDExpressionNoBF:150,BitwiseXORExpression:151,"^":152,BitwiseXORExpressionNoIn:153,BitwiseXORExpressionNoBF:154,BitwiseORExpression:155,"|":156,BitwiseORExpressionNoIn:157,BitwiseORExpressionNoBF:158,LogicalANDExpression:159,"&&":160,LogicalANDExpressionNoIn:161,LogicalANDExpressionNoBF:162,LogicalORExpression:163,"||":164,LogicalORExpressionNoIn:165,LogicalORExpressionNoBF:166,ConditionalExpression:167,"?":168,ConditionalExpressionNoIn:169,ConditionalExpressionNoBF:170,AssignmentOperator:171,AssignmentExpressionNoBF:172,"*=":173,"/=":174,"%=":175,"+=":176,"-=":177,"<<=":178,">>=":179,">>>=":180,"&=":181,"^=":182,"|=":183,NullLiteral:184,BooleanLiteral:185,RegularExpressionLiteral:186,NULL:187,TRUE:188,FALSE:189,NUMERIC_LITERAL:190,STRING_LITERAL:191,RegularExpressionLiteralBegin:192,REGEXP_LITERAL:193,CLASS:194,CONST:195,ENUM:196,EXPORT:197,EXTENDS:198,IMPORT:199,SUPER:200,$accept:0,$end:1},terminals_:{2:"error",19:"{",21:"}",22:"VAR",25:",",28:"IDENTIFIER",31:"=",34:";",36:"IF",37:"(",39:")",40:"ELSE",41:"DO",42:"WHILE",43:"FOR",46:"IN",47:"CONTINUE",48:"BREAK",49:"RETURN",50:"WITH",51:"SWITCH",56:"CASE",57:":",58:"DEFAULT",59:"THROW",60:"TRY",63:"CATCH",64:"FINALLY",65:"DEBUGGER",67:"FUNCTION",73:"EOF",78:"THIS",81:"[",82:"]",93:".",94:"NEW",105:"++",106:"--",111:"DELETE",112:"VOID",113:"TYPEOF",114:"BR++",115:"BR--",116:"+",117:"-",118:"~",119:"!",121:"*",122:"/",123:"%",128:"<<",129:">>",130:">>>",133:"<",134:">",135:"<=",136:">=",137:"INSTANCEOF",141:"==",142:"!=",143:"===",144:"!==",148:"&",152:"^",156:"|",160:"&&",164:"||",168:"?",173:"*=",174:"/=",175:"%=",176:"+=",177:"-=",178:"<<=",179:">>=",180:">>>=",181:"&=",182:"^=",183:"|=",187:"NULL",188:"TRUE",189:"FALSE",190:"NUMERIC_LITERAL",191:"STRING_LITERAL",193:"REGEXP_LITERAL",194:"CLASS",195:"CONST",196:"ENUM",197:"EXPORT",198:"EXTENDS",199:"IMPORT",200:"SUPER"},productions_:[0,[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[4,3],[20,2],[20,0],[5,2],[23,1],[23,3],[26,1],[26,3],[24,1],[24,2],[27,1],[27,2],[29,2],[30,2],[6,1],[7,2],[7,2],[8,5],[8,7],[9,7],[9,7],[9,5],[9,9],[9,8],[9,8],[9,7],[9,8],[9,7],[9,7],[9,6],[9,10],[9,9],[9,9],[9,8],[9,7],[9,8],[10,2],[10,2],[10,3],[10,3],[11,2],[11,2],[11,3],[11,3],[12,2],[12,2],[12,3],[12,3],[13,5],[15,5],[52,3],[52,5],[53,2],[53,0],[55,4],[54,3],[14,3],[16,3],[16,3],[17,3],[17,3],[17,4],[61,5],[62,2],[18,2],[18,2],[66,7],[66,8],[70,7],[70,8],[70,6],[70,7],[69,1],[69,3],[68,1],[72,2],[71,2],[71,0],[74,1],[74,1],[75,1],[75,1],[76,1],[76,1],[76,1],[76,1],[76,3],[80,2],[80,3],[80,3],[80,4],[80,5],[84,1],[84,2],[84,3],[84,4],[83,1],[83,2],[77,2],[77,3],[77,4],[85,1],[85,3],[86,3],[86,7],[86,8],[87,1],[87,1],[87,1],[88,1],[92,1],[92,1],[92,4],[92,3],[92,3],[96,1],[96,4],[96,3],[96,3],[97,1],[97,2],[98,1],[98,2],[99,2],[99,2],[99,4],[99,3],[100,2],[100,2],[100,4],[100,3],[89,1],[89,1],[95,2],[95,3],[102,1],[102,3],[45,1],[45,1],[103,1],[103,1],[104,1],[104,2],[104,2],[107,1],[107,2],[107,2],[108,1],[108,1],[110,1],[110,1],[109,2],[109,2],[109,2],[109,2],[109,2],[109,2],[109,2],[109,2],[109,2],[109,2],[109,2],[120,1],[120,3],[120,3],[120,3],[124,1],[124,3],[124,3],[124,3],[125,1],[125,3],[125,3],[126,1],[126,3],[126,3],[127,1],[127,3],[127,3],[127,3],[131,1],[131,3],[131,3],[131,3],[132,1],[132,3],[132,3],[132,3],[132,3],[132,3],[132,3],[138,1],[138,3],[138,3],[138,3],[138,3],[138,3],[139,1],[139,3],[139,3],[139,3],[139,3],[139,3],[139,3],[140,1],[140,3],[140,3],[140,3],[140,3],[145,1],[145,3],[145,3],[145,3],[145,3],[146,1],[146,3],[146,3],[146,3],[146,3],[147,1],[147,3],[149,1],[149,3],[150,1],[150,3],[151,1],[151,3],[153,1],[153,3],[154,1],[154,3],[155,1],[155,3],[157,1],[157,3],[158,1],[158,3],[159,1],[159,3],[161,1],[161,3],[162,1],[162,3],[163,1],[163,3],[165,1],[165,3],[166,1],[166,3],[167,1],[167,5],[169,1],[169,5],[170,1],[170,5],[32,1],[32,3],[32,3],[33,1],[33,3],[33,3],[172,1],[172,3],[172,3],[171,1],[171,1],[171,1],[171,1],[171,1],[171,1],[171,1],[171,1],[171,1],[171,1],[171,1],[38,1],[38,3],[44,1],[44,3],[35,1],[35,3],[79,1],[79,1],[79,1],[79,1],[79,1],[184,1],[185,1],[185,1],[91,1],[90,1],[186,2],[192,1],[192,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1],[101,1]],performAction:function(yytext,yyleng,yylineno,yy,yystate,$$,_$){var $0=$$.length-1;switch(yystate){case 16:this.$=new BlockStatementNode($$[$0-1],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 17:this.$=$$[$0-1].concat($$[$0]);break;case 18:this.$=[];break;case 19:this.$=new VariableDeclarationNode($$[$0],"var",createSourceLocation(null,_$[$0-1],_$[$0]));break;case 20:this.$=[$$[$0]];break;case 21:this.$=$$[$0-2].concat($$[$0]);break;case 22:this.$=[$$[$0]];break;case 23:this.$=$$[$0-2].concat($$[$0]);break;case 24:this.$=new VariableDeclaratorNode(new IdentifierNode($$[$0],createSourceLocation(null,_$[$0],_$[$0])),null,createSourceLocation(null,_$[$0],_$[$0]));break;case 25:this.$=new VariableDeclaratorNode(new IdentifierNode($$[$0-1],createSourceLocation(null,_$[$0-1],_$[$0-1])),$$[$0],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 26:this.$=new VariableDeclaratorNode(new IdentifierNode($$[$0],createSourceLocation(null,_$[$0],_$[$0])),null,createSourceLocation(null,_$[$0],_$[$0]));break;case 27:this.$=new VariableDeclaratorNode(new IdentifierNode($$[$0-1],createSourceLocation(null,_$[$0-1],_$[$0-1])),$$[$0],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 28:this.$=$$[$0];break;case 29:this.$=$$[$0];break;case 30:this.$=new EmptyStatementNode(createSourceLocation(null,_$[$0],_$[$0]));break;case 31:this.$=new ExpressionStatementNode($$[$0-1],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 32:this.$=new ExpressionStatementNode($$[$0-1],createSourceLocation(null,_$[$0-1],_$[$0-1]));break;case 33:this.$=new IfStatementNode($$[$0-2],$$[$0],null,createSourceLocation(null,_$[$0-4],_$[$0]));break;case 34:this.$=new IfStatementNode($$[$0-4],$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-6],_$[$0]));break;case 35:this.$=new DoWhileStatementNode($$[$0-5],$$[$0-2],createSourceLocation(null,_$[$0-6],_$[$0]));break;case 36:this.$=new DoWhileStatementNode($$[$0-5],$$[$0-2],createSourceLocation(null,_$[$0-6],_$[$0-1]));break;case 37:this.$=new WhileStatementNode($$[$0-2],$$[$0],createSourceLocation(null,_$[$0-4],_$[$0]));break;case 38:this.$=new ForStatementNode($$[$0-6],$$[$0-4],$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-8],_$[$0]));break;case 39:this.$=new ForStatementNode($$[$0-5],$$[$0-3],null,$$[$0],createSourceLocation(null,_$[$0-7],_$[$0]));break;case 40:this.$=new ForStatementNode($$[$0-5],null,$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-7],_$[$0]));break;case 41:this.$=new ForStatementNode($$[$0-4],null,null,$$[$0],createSourceLocation(null,_$[$0-6],_$[$0]));break;case 42:this.$=new ForStatementNode(null,$$[$0-4],$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-7],_$[$0]));break;case 43:this.$=new ForStatementNode(null,$$[$0-3],null,$$[$0],createSourceLocation(null,_$[$0-6],_$[$0]));break;case 44:this.$=new ForStatementNode(null,null,$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-6],_$[$0]));break;case 45:this.$=new ForStatementNode(null,null,null,$$[$0],createSourceLocation(null,_$[$0-5],_$[$0]));break;case 46:this.$=new ForStatementNode($$[$0-6],$$[$0-4],$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-9],_$[$0]));break;case 47:this.$=new ForStatementNode($$[$0-5],$$[$0-3],null,$$[$0],createSourceLocation(null,_$[$0-8],_$[$0]));break;case 48:this.$=new ForStatementNode($$[$0-5],null,$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-8],_$[$0]));break;case 49:this.$=new ForStatementNode($$[$0-4],null,null,$$[$0],createSourceLocation(null,_$[$0-7],_$[$0]));break;case 50:this.$=new ForInStatementNode($$[$0-4],$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-6],_$[$0]));break;case 51:this.$=new ForInStatementNode($$[$0-4],$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-7],_$[$0]));break;case 52:this.$=new ContinueStatementNode(null,createSourceLocation(null,_$[$0-1],_$[$0]));break;case 53:this.$=new ContinueStatementNode(null,createSourceLocation(null,_$[$0-1],_$[$0-1]));break;case 54:this.$=new ContinueStatementNode(new IdentifierNode($$[$0-1],createSourceLocation(null,_$[$0-1],_$[$0-1])),createSourceLocation(null,_$[$0-2],_$[$0]));break;case 55:this.$=new ContinueStatementNode(new IdentifierNode($$[$0-1],createSourceLocation(null,_$[$0-1],_$[$0-1])),createSourceLocation(null,_$[$0-2],_$[$0-1]));break;case 56:this.$=new BreakStatementNode(null,createSourceLocation(null,_$[$0-1],_$[$0]));break;case 57:this.$=new BreakStatementNode(null,createSourceLocation(null,_$[$0-1],_$[$0-1]));break;case 58:this.$=new BreakStatementNode(new IdentifierNode($$[$0-1],createSourceLocation(null,_$[$0-1],_$[$0-1])),createSourceLocation(null,_$[$0-2],_$[$0]));break;case 59:this.$=new BreakStatementNode(new IdentifierNode($$[$0-1],createSourceLocation(null,_$[$0-1],_$[$0-1])),createSourceLocation(null,_$[$0-2],_$[$0-1]));break;case 60:this.$=new ReturnStatementNode(null,createSourceLocation(null,_$[$0-1],_$[$0]));break;case 61:this.$=new ReturnStatementNode(null,createSourceLocation(null,_$[$0-1],_$[$0-1]));break;case 62:this.$=new ReturnStatementNode($$[$0-1],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 63:this.$=new ReturnStatementNode($$[$0-1],createSourceLocation(null,_$[$0-2],_$[$0-1]));break;case 64:this.$=new WithStatementNode($$[$0-2],$$[$0],createSourceLocation(null,_$[$0-4],_$[$0]));break;case 65:this.$=new SwitchStatementNode($$[$0-2],$$[$0],createSourceLocation(null,_$[$0-4],_$[$0]));break;case 66:this.$=$$[$0-1];break;case 67:this.$=$$[$0-3].concat($$[$0-2]).concat($$[$0-1]);break;case 68:this.$=$$[$0-1].concat($$[$0]);break;case 69:this.$=[];break;case 70:this.$=new SwitchCaseNode($$[$0-2],$$[$0],createSourceLocation(null,_$[$0-3],_$[$0]));break;case 71:this.$=new SwitchCaseNode(null,$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 72:this.$=new LabeledStatementNode(new IdentifierNode($$[$0-2],createSourceLocation(null,_$[$0-2],_$[$0-2])),$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 73:this.$=new ThrowStatementNode($$[$0-1],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 74:this.$=new ThrowStatementNode($$[$0-1],createSourceLocation(null,_$[$0-2],_$[$0-1]));break;case 75:this.$=new TryStatementNode($$[$0-1],$$[$0],null,createSourceLocation(null,_$[$0-2],_$[$0]));break;case 76:this.$=new TryStatementNode($$[$0-1],null,$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 77:this.$=new TryStatementNode($$[$0-2],$$[$0-1],$$[$0],createSourceLocation(null,_$[$0-3],_$[$0]));break;case 78:this.$=new CatchClauseNode(new IdentifierNode($$[$0-2],createSourceLocation(null,_$[$0-2],_$[$0-2])),$$[$0],createSourceLocation(null,_$[$0-4],_$[$0]));break;case 79:this.$=$$[$0];break;case 80:this.$=new DebugggerStatementNode(createSourceLocation(null,_$[$0-1],_$[$0]));break;case 81:this.$=new DebugggerStatementNode(createSourceLocation(null,_$[$0-1],_$[$0-1]));break;case 82:this.$=new FunctionDeclarationNode(new IdentifierNode($$[$0-5],createSourceLocation(null,_$[$0-5],_$[$0-5])),[],$$[$0-1],(!1),(!1),createSourceLocation(null,_$[$0-6],_$[$0]));break;case 83:this.$=new FunctionDeclarationNode(new IdentifierNode($$[$0-6],createSourceLocation(null,_$[$0-6],_$[$0-6])),$$[$0-4],$$[$0-1],(!1),(!1),createSourceLocation(null,_$[$0-7],_$[$0]));break;case 84:this.$=new FunctionExpressionNode(new IdentifierNode($$[$0-5],createSourceLocation(null,_$[$0-5],_$[$0-5])),[],$$[$0-1],(!1),(!1),createSourceLocation(null,_$[$0-6],_$[$0]));break;case 85:this.$=new FunctionExpressionNode(new IdentifierNode($$[$0-6],createSourceLocation(null,_$[$0-6],_$[$0-6])),$$[$0-4],$$[$0-1],(!1),(!1),createSourceLocation(null,_$[$0-7],_$[$0]));break;case 86:this.$=new FunctionExpressionNode(null,[],$$[$0-1],(!1),(!1),createSourceLocation(null,_$[$0-5],_$[$0]));break;case 87:this.$=new FunctionExpressionNode(null,$$[$0-4],$$[$0-1],(!1),(!1),createSourceLocation(null,_$[$0-6],_$[$0]));break;case 88:this.$=[new IdentifierNode($$[$0],createSourceLocation(null,_$[$0],_$[$0]))];break;case 89:this.$=$$[$0-2].concat(new IdentifierNode($$[$0],createSourceLocation(null,_$[$0],_$[$0])));break;case 91:return this.$=new ProgramNode($$[$0-1],createSourceLocation(null,_$[$0-1],_$[$0])),this.$;case 92:this.$=$$[$0-1].concat($$[$0]);break;case 93:this.$=[];break;case 98:this.$=new ThisExpressionNode(createSourceLocation(null,_$[$0],_$[$0]));break;case 99:this.$=new IdentifierNode($$[$0],createSourceLocation(null,_$[$0],_$[$0]));break;case 102:this.$=$$[$0-1];break;case 103:this.$=new ArrayExpressionNode([],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 104:this.$=new ArrayExpressionNode($$[$0-1],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 105:this.$=new ArrayExpressionNode($$[$0-1],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 106:this.$=new ArrayExpressionNode($$[$0-2].concat(null),createSourceLocation(null,_$[$0-3],_$[$0]));break;case 107:this.$=new ArrayExpressionNode($$[$0-3].concat($$[$0-1]),createSourceLocation(null,_$[$0-4],_$[$0]));break;case 108:this.$=[$$[$0]];break;case 109:this.$=$$[$0-1].concat($$[$0]);break;case 110:this.$=$$[$0-2].concat($$[$0]);break;case 111:this.$=$$[$0-3].concat($$[$0-1]).concat($$[$0]);break;case 112:this.$=[null,null];break;case 113:this.$=$$[$0-1].concat(null);break;case 114:this.$=new ObjectExpressionNode([],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 115:this.$=new ObjectExpressionNode($$[$0-1],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 116:this.$=new ObjectExpressionNode($$[$0-2],createSourceLocation(null,_$[$0-3],_$[$0]));break;case 117:this.$=[$$[$0]];break;case 118:this.$=$$[$0-2].concat($$[$0]);break;case 119:this.$={key:$$[$0-2],value:$$[$0],kind:"init"};break;case 120:"get"===$$[$0-6]?this.$={key:$$[$0-5],value:new FunctionExpressionNode(null,[],$$[$0-1],(!1),(!1),createSourceLocation(null,_$[$0-5],_$[$0])),kind:"get"}:this.parseError("Invalid getter",{});break;case 121:"set"===$$[$0-7]?this.$={key:$$[$0-6],value:new FunctionExpressionNode(null,$$[$0-4],$$[$0-1],(!1),(!1),createSourceLocation(null,_$[$0-6],_$[$0])),kind:"set"}:this.parseError("Invalid setter",{});break;case 125:this.$=[new IdentifierNode($$[$0],createSourceLocation(null,_$[$0],_$[$0]))];break;case 128:this.$=new MemberExpressionNode($$[$0-3],$$[$0-1],(!0),createSourceLocation(null,_$[$0-3],_$[$0]));break;case 129:this.$=new MemberExpressionNode($$[$0-2],$$[$0],(!1),createSourceLocation(null,_$[$0-2],_$[$0]));break;case 130:this.$=new NewExpressionNode($$[$0-1],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 132:this.$=new MemberExpressionNode($$[$0-3],$$[$0-1],(!0),createSourceLocation(null,_$[$0-3],_$[$0]));break;case 133:this.$=new MemberExpressionNode($$[$0-2],$$[$0],(!1),createSourceLocation(null,_$[$0-2],_$[$0]));break;case 134:this.$=new NewExpressionNode($$[$0-1],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 136:this.$=new NewExpressionNode($$[$0],null,createSourceLocation(null,_$[$0-1],_$[$0]));break;case 138:this.$=new NewExpressionNode($$[$0],null,createSourceLocation(null,_$[$0-1],_$[$0]));break;case 139:this.$=new CallExpressionNode($$[$0-1],$$[$0],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 140:this.$=new CallExpressionNode($$[$0-1],$$[$0],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 141:this.$=new MemberExpressionNode($$[$0-3],$$[$0-1],(!0),createSourceLocation(null,_$[$0-3],_$[$0]));break;case 142:this.$=new MemberExpressionNode($$[$0-2],$$[$0],(!1),createSourceLocation(null,_$[$0-2],_$[$0]));break;case 143:this.$=new CallExpressionNode($$[$0-1],$$[$0],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 144:this.$=new CallExpressionNode($$[$0-1],$$[$0],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 145:this.$=new MemberExpressionNode($$[$0-3],$$[$0-1],(!0),createSourceLocation(null,_$[$0-3],_$[$0]));break;case 146:this.$=new MemberExpressionNode($$[$0-2],$$[$0],(!1),createSourceLocation(null,_$[$0-2],_$[$0]));break;case 147:this.$=new IdentifierNode($$[$0],createSourceLocation(null,_$[$0],_$[$0]));break;case 148:this.$=new IdentifierNode($$[$0],createSourceLocation(null,_$[$0],_$[$0]));break;case 149:this.$=[];break;case 150:this.$=$$[$0-1];break;case 151:this.$=[$$[$0]];break;case 152:this.$=$$[$0-2].concat($$[$0]);break;case 158:this.$=new UpdateExpressionNode("++",$$[$0-1],(!1),createSourceLocation(null,_$[$0-1],_$[$0]));break;case 159:this.$=new UpdateExpressionNode("--",$$[$0-1],(!1),createSourceLocation(null,_$[$0-1],_$[$0]));break;case 161:this.$=new UpdateExpressionNode("++",$$[$0-1],(!1),createSourceLocation(null,_$[$0-1],_$[$0]));break;case 162:this.$=new UpdateExpressionNode("--",$$[$0-1],(!1),createSourceLocation(null,_$[$0-1],_$[$0]));break;case 167:this.$=new UnaryExpressionNode("delete",(!0),$$[$0],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 168:this.$=new UnaryExpressionNode("void",(!0),$$[$0],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 169:this.$=new UnaryExpressionNode("typeof",(!0),$$[$0],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 170:_$[$0-1].first_line=_$[$0-1].last_line,_$[$0-1].first_column=_$[$0-1].last_column-2,this.$=new UpdateExpressionNode("++",$$[$0],(!0),createSourceLocation(null,_$[$0-1],_$[$0]));break;case 171:_$[$0-1].first_line=_$[$0-1].last_line,_$[$0-1].first_column=_$[$0-1].last_column-2,this.$=new UpdateExpressionNode("--",$$[$0],(!0),createSourceLocation(null,_$[$0-1],_$[$0]));break;case 172:this.$=new UpdateExpressionNode("++",$$[$0],(!0),createSourceLocation(null,_$[$0-1],_$[$0]));break;case 173:this.$=new UpdateExpressionNode("--",$$[$0],(!0),createSourceLocation(null,_$[$0-1],_$[$0]));break;case 174:this.$=new UnaryExpressionNode("+",(!0),$$[$0],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 175:this.$=new UnaryExpressionNode("-",(!0),$$[$0],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 176:this.$=new UnaryExpressionNode("~",(!0),$$[$0],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 177:this.$=new UnaryExpressionNode("!",(!0),$$[$0],createSourceLocation(null,_$[$0-1],_$[$0]));break;case 179:this.$=new BinaryExpressionNode("*",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 180:this.$=new BinaryExpressionNode("/",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 181:this.$=new BinaryExpressionNode("%",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 183:this.$=new BinaryExpressionNode("*",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 184:this.$=new BinaryExpressionNode("/",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 185:this.$=new BinaryExpressionNode("%",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 187:this.$=new BinaryExpressionNode("+",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 188:this.$=new BinaryExpressionNode("-",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 190:this.$=new BinaryExpressionNode("+",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 191:this.$=new BinaryExpressionNode("-",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 193:this.$=new BinaryExpressionNode("<<",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 194:this.$=new BinaryExpressionNode(">>",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 195:this.$=new BinaryExpressionNode(">>>",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 197:this.$=new BinaryExpressionNode("<<",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 198:this.$=new BinaryExpressionNode(">>",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 199:this.$=new BinaryExpressionNode(">>>",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 201:this.$=new BinaryExpressionNode("<",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 202:this.$=new BinaryExpressionNode(">",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 203:this.$=new BinaryExpressionNode("<=",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 204:this.$=new BinaryExpressionNode(">=",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 205:this.$=new BinaryExpressionNode("instanceof",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 206:this.$=new BinaryExpressionNode("in",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 208:this.$=new BinaryExpressionNode("<",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 209:this.$=new BinaryExpressionNode(">",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 210:this.$=new BinaryExpressionNode("<=",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 211:this.$=new BinaryExpressionNode(">=",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 212:this.$=new BinaryExpressionNode("instanceof",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 214:this.$=new BinaryExpressionNode("<",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 215:this.$=new BinaryExpressionNode(">",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 216:this.$=new BinaryExpressionNode("<=",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 217:this.$=new BinaryExpressionNode(">=",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 218:this.$=new BinaryExpressionNode("instanceof",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 219:this.$=new BinaryExpressionNode("in",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 221:this.$=new BinaryExpressionNode("==",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 222:this.$=new BinaryExpressionNode("!=",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 223:this.$=new BinaryExpressionNode("===",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 224:this.$=new BinaryExpressionNode("!==",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 226:this.$=new BinaryExpressionNode("==",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 227:this.$=new BinaryExpressionNode("!=",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 228:this.$=new BinaryExpressionNode("===",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 229:this.$=new BinaryExpressionNode("!==",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 231:this.$=new BinaryExpressionNode("==",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 232:this.$=new BinaryExpressionNode("!=",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 233:this.$=new BinaryExpressionNode("===",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 234:this.$=new BinaryExpressionNode("!==",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 236:this.$=new BinaryExpressionNode("&",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 238:this.$=new BinaryExpressionNode("&",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 240:this.$=new BinaryExpressionNode("&",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 242:this.$=new BinaryExpressionNode("^",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 244:this.$=new BinaryExpressionNode("^",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));
	break;case 246:this.$=new BinaryExpressionNode("^",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 248:this.$=new BinaryExpressionNode("|",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 250:this.$=new BinaryExpressionNode("|",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 252:this.$=new BinaryExpressionNode("|",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 254:this.$=new LogicalExpressionNode("&&",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 256:this.$=new LogicalExpressionNode("&&",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 258:this.$=new LogicalExpressionNode("&&",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 260:this.$=new LogicalExpressionNode("||",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 262:this.$=new LogicalExpressionNode("||",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 264:this.$=new LogicalExpressionNode("||",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 266:this.$=new ConditionalExpressionNode($$[$0-4],$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-4],_$[$0]));break;case 268:this.$=new ConditionalExpressionNode($$[$0-4],$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-4],_$[$0]));break;case 270:this.$=new ConditionalExpressionNode($$[$0-4],$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-4],_$[$0]));break;case 272:this.$=new AssignmentExpressionNode("=",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 273:this.$=new AssignmentExpressionNode($$[$0-1],$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 275:this.$=new AssignmentExpressionNode("=",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 276:this.$=new AssignmentExpressionNode($$[$0-1],$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 278:this.$=new AssignmentExpressionNode("=",$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 279:this.$=new AssignmentExpressionNode($$[$0-1],$$[$0-2],$$[$0],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 292:"SequenceExpression"===$$[$0-2].type?($$[$0-2].expressions.concat($$[$0]),$$[$0-2].loc=createSourceLocation(null,_$[$0-2],_$[$0]),this.$=$$[$0-2]):this.$=new SequenceExpressionNode([$$[$0-2],$$[$0]],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 294:"SequenceExpression"===$$[$0-2].type?($$[$0-2].expressions.concat($$[$0]),$$[$0-2].loc=createSourceLocation(null,_$[$0-2],_$[$0]),this.$=$$[$0-2]):this.$=new SequenceExpressionNode([$$[$0-2],$$[$0]],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 296:"SequenceExpression"===$$[$0-2].type?($$[$0-2].expressions.concat($$[$0]),$$[$0-2].loc=createSourceLocation(null,_$[$0-2],_$[$0]),this.$=$$[$0-2]):this.$=new SequenceExpressionNode([$$[$0-2],$$[$0]],createSourceLocation(null,_$[$0-2],_$[$0]));break;case 302:this.$=new LiteralNode(null,createSourceLocation(null,_$[$0],_$[$0]));break;case 303:this.$=new LiteralNode((!0),createSourceLocation(null,_$[$0],_$[$0]));break;case 304:this.$=new LiteralNode((!1),createSourceLocation(null,_$[$0],_$[$0]));break;case 305:this.$=new LiteralNode(parseNumericLiteral($$[$0]),createSourceLocation(null,_$[$0],_$[$0]));break;case 306:this.$=new LiteralNode($$[$0],createSourceLocation(null,_$[$0],_$[$0]));break;case 307:this.$=new LiteralNode(parseRegularExpressionLiteral($$[$0-1]+$$[$0]),createSourceLocation(null,_$[$0-1],_$[$0]));break;case 308:yy.lexer.begin("REGEXP");break;case 309:yy.lexer.begin("REGEXP")}},table:[{19:[2,93],22:[2,93],28:[2,93],34:[2,93],36:[2,93],37:[2,93],41:[2,93],42:[2,93],43:[2,93],47:[2,93],48:[2,93],49:[2,93],50:[2,93],51:[2,93],59:[2,93],60:[2,93],65:[2,93],67:[2,93],71:2,72:1,73:[2,93],78:[2,93],81:[2,93],94:[2,93],105:[2,93],106:[2,93],111:[2,93],112:[2,93],113:[2,93],114:[2,93],115:[2,93],116:[2,93],117:[2,93],118:[2,93],119:[2,93],122:[2,93],174:[2,93],187:[2,93],188:[2,93],189:[2,93],190:[2,93],191:[2,93]},{1:[3]},{3:5,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],66:6,67:[1,22],73:[1,3],74:4,76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{1:[2,91]},{19:[2,92],21:[2,92],22:[2,92],28:[2,92],34:[2,92],36:[2,92],37:[2,92],41:[2,92],42:[2,92],43:[2,92],47:[2,92],48:[2,92],49:[2,92],50:[2,92],51:[2,92],59:[2,92],60:[2,92],65:[2,92],67:[2,92],73:[2,92],78:[2,92],81:[2,92],94:[2,92],105:[2,92],106:[2,92],111:[2,92],112:[2,92],113:[2,92],114:[2,92],115:[2,92],116:[2,92],117:[2,92],118:[2,92],119:[2,92],122:[2,92],174:[2,92],187:[2,92],188:[2,92],189:[2,92],190:[2,92],191:[2,92]},{19:[2,94],21:[2,94],22:[2,94],28:[2,94],34:[2,94],36:[2,94],37:[2,94],41:[2,94],42:[2,94],43:[2,94],47:[2,94],48:[2,94],49:[2,94],50:[2,94],51:[2,94],59:[2,94],60:[2,94],65:[2,94],67:[2,94],73:[2,94],78:[2,94],81:[2,94],94:[2,94],105:[2,94],106:[2,94],111:[2,94],112:[2,94],113:[2,94],114:[2,94],115:[2,94],116:[2,94],117:[2,94],118:[2,94],119:[2,94],122:[2,94],174:[2,94],187:[2,94],188:[2,94],189:[2,94],190:[2,94],191:[2,94]},{19:[2,95],21:[2,95],22:[2,95],28:[2,95],34:[2,95],36:[2,95],37:[2,95],41:[2,95],42:[2,95],43:[2,95],47:[2,95],48:[2,95],49:[2,95],50:[2,95],51:[2,95],59:[2,95],60:[2,95],65:[2,95],67:[2,95],73:[2,95],78:[2,95],81:[2,95],94:[2,95],105:[2,95],106:[2,95],111:[2,95],112:[2,95],113:[2,95],114:[2,95],115:[2,95],116:[2,95],117:[2,95],118:[2,95],119:[2,95],122:[2,95],174:[2,95],187:[2,95],188:[2,95],189:[2,95],190:[2,95],191:[2,95]},{19:[2,1],21:[2,1],22:[2,1],28:[2,1],34:[2,1],36:[2,1],37:[2,1],40:[2,1],41:[2,1],42:[2,1],43:[2,1],47:[2,1],48:[2,1],49:[2,1],50:[2,1],51:[2,1],56:[2,1],58:[2,1],59:[2,1],60:[2,1],65:[2,1],67:[2,1],73:[2,1],78:[2,1],81:[2,1],94:[2,1],105:[2,1],106:[2,1],111:[2,1],112:[2,1],113:[2,1],114:[2,1],115:[2,1],116:[2,1],117:[2,1],118:[2,1],119:[2,1],122:[2,1],174:[2,1],187:[2,1],188:[2,1],189:[2,1],190:[2,1],191:[2,1]},{19:[2,2],21:[2,2],22:[2,2],28:[2,2],34:[2,2],36:[2,2],37:[2,2],40:[2,2],41:[2,2],42:[2,2],43:[2,2],47:[2,2],48:[2,2],49:[2,2],50:[2,2],51:[2,2],56:[2,2],58:[2,2],59:[2,2],60:[2,2],65:[2,2],67:[2,2],73:[2,2],78:[2,2],81:[2,2],94:[2,2],105:[2,2],106:[2,2],111:[2,2],112:[2,2],113:[2,2],114:[2,2],115:[2,2],116:[2,2],117:[2,2],118:[2,2],119:[2,2],122:[2,2],174:[2,2],187:[2,2],188:[2,2],189:[2,2],190:[2,2],191:[2,2]},{19:[2,3],21:[2,3],22:[2,3],28:[2,3],34:[2,3],36:[2,3],37:[2,3],40:[2,3],41:[2,3],42:[2,3],43:[2,3],47:[2,3],48:[2,3],49:[2,3],50:[2,3],51:[2,3],56:[2,3],58:[2,3],59:[2,3],60:[2,3],65:[2,3],67:[2,3],73:[2,3],78:[2,3],81:[2,3],94:[2,3],105:[2,3],106:[2,3],111:[2,3],112:[2,3],113:[2,3],114:[2,3],115:[2,3],116:[2,3],117:[2,3],118:[2,3],119:[2,3],122:[2,3],174:[2,3],187:[2,3],188:[2,3],189:[2,3],190:[2,3],191:[2,3]},{19:[2,4],21:[2,4],22:[2,4],28:[2,4],34:[2,4],36:[2,4],37:[2,4],40:[2,4],41:[2,4],42:[2,4],43:[2,4],47:[2,4],48:[2,4],49:[2,4],50:[2,4],51:[2,4],56:[2,4],58:[2,4],59:[2,4],60:[2,4],65:[2,4],67:[2,4],73:[2,4],78:[2,4],81:[2,4],94:[2,4],105:[2,4],106:[2,4],111:[2,4],112:[2,4],113:[2,4],114:[2,4],115:[2,4],116:[2,4],117:[2,4],118:[2,4],119:[2,4],122:[2,4],174:[2,4],187:[2,4],188:[2,4],189:[2,4],190:[2,4],191:[2,4]},{19:[2,5],21:[2,5],22:[2,5],28:[2,5],34:[2,5],36:[2,5],37:[2,5],40:[2,5],41:[2,5],42:[2,5],43:[2,5],47:[2,5],48:[2,5],49:[2,5],50:[2,5],51:[2,5],56:[2,5],58:[2,5],59:[2,5],60:[2,5],65:[2,5],67:[2,5],73:[2,5],78:[2,5],81:[2,5],94:[2,5],105:[2,5],106:[2,5],111:[2,5],112:[2,5],113:[2,5],114:[2,5],115:[2,5],116:[2,5],117:[2,5],118:[2,5],119:[2,5],122:[2,5],174:[2,5],187:[2,5],188:[2,5],189:[2,5],190:[2,5],191:[2,5]},{19:[2,6],21:[2,6],22:[2,6],28:[2,6],34:[2,6],36:[2,6],37:[2,6],40:[2,6],41:[2,6],42:[2,6],43:[2,6],47:[2,6],48:[2,6],49:[2,6],50:[2,6],51:[2,6],56:[2,6],58:[2,6],59:[2,6],60:[2,6],65:[2,6],67:[2,6],73:[2,6],78:[2,6],81:[2,6],94:[2,6],105:[2,6],106:[2,6],111:[2,6],112:[2,6],113:[2,6],114:[2,6],115:[2,6],116:[2,6],117:[2,6],118:[2,6],119:[2,6],122:[2,6],174:[2,6],187:[2,6],188:[2,6],189:[2,6],190:[2,6],191:[2,6]},{19:[2,7],21:[2,7],22:[2,7],28:[2,7],34:[2,7],36:[2,7],37:[2,7],40:[2,7],41:[2,7],42:[2,7],43:[2,7],47:[2,7],48:[2,7],49:[2,7],50:[2,7],51:[2,7],56:[2,7],58:[2,7],59:[2,7],60:[2,7],65:[2,7],67:[2,7],73:[2,7],78:[2,7],81:[2,7],94:[2,7],105:[2,7],106:[2,7],111:[2,7],112:[2,7],113:[2,7],114:[2,7],115:[2,7],116:[2,7],117:[2,7],118:[2,7],119:[2,7],122:[2,7],174:[2,7],187:[2,7],188:[2,7],189:[2,7],190:[2,7],191:[2,7]},{19:[2,8],21:[2,8],22:[2,8],28:[2,8],34:[2,8],36:[2,8],37:[2,8],40:[2,8],41:[2,8],42:[2,8],43:[2,8],47:[2,8],48:[2,8],49:[2,8],50:[2,8],51:[2,8],56:[2,8],58:[2,8],59:[2,8],60:[2,8],65:[2,8],67:[2,8],73:[2,8],78:[2,8],81:[2,8],94:[2,8],105:[2,8],106:[2,8],111:[2,8],112:[2,8],113:[2,8],114:[2,8],115:[2,8],116:[2,8],117:[2,8],118:[2,8],119:[2,8],122:[2,8],174:[2,8],187:[2,8],188:[2,8],189:[2,8],190:[2,8],191:[2,8]},{19:[2,9],21:[2,9],22:[2,9],28:[2,9],34:[2,9],36:[2,9],37:[2,9],40:[2,9],41:[2,9],42:[2,9],43:[2,9],47:[2,9],48:[2,9],49:[2,9],50:[2,9],51:[2,9],56:[2,9],58:[2,9],59:[2,9],60:[2,9],65:[2,9],67:[2,9],73:[2,9],78:[2,9],81:[2,9],94:[2,9],105:[2,9],106:[2,9],111:[2,9],112:[2,9],113:[2,9],114:[2,9],115:[2,9],116:[2,9],117:[2,9],118:[2,9],119:[2,9],122:[2,9],174:[2,9],187:[2,9],188:[2,9],189:[2,9],190:[2,9],191:[2,9]},{19:[2,10],21:[2,10],22:[2,10],28:[2,10],34:[2,10],36:[2,10],37:[2,10],40:[2,10],41:[2,10],42:[2,10],43:[2,10],47:[2,10],48:[2,10],49:[2,10],50:[2,10],51:[2,10],56:[2,10],58:[2,10],59:[2,10],60:[2,10],65:[2,10],67:[2,10],73:[2,10],78:[2,10],81:[2,10],94:[2,10],105:[2,10],106:[2,10],111:[2,10],112:[2,10],113:[2,10],114:[2,10],115:[2,10],116:[2,10],117:[2,10],118:[2,10],119:[2,10],122:[2,10],174:[2,10],187:[2,10],188:[2,10],189:[2,10],190:[2,10],191:[2,10]},{19:[2,11],21:[2,11],22:[2,11],28:[2,11],34:[2,11],36:[2,11],37:[2,11],40:[2,11],41:[2,11],42:[2,11],43:[2,11],47:[2,11],48:[2,11],49:[2,11],50:[2,11],51:[2,11],56:[2,11],58:[2,11],59:[2,11],60:[2,11],65:[2,11],67:[2,11],73:[2,11],78:[2,11],81:[2,11],94:[2,11],105:[2,11],106:[2,11],111:[2,11],112:[2,11],113:[2,11],114:[2,11],115:[2,11],116:[2,11],117:[2,11],118:[2,11],119:[2,11],122:[2,11],174:[2,11],187:[2,11],188:[2,11],189:[2,11],190:[2,11],191:[2,11]},{19:[2,12],21:[2,12],22:[2,12],28:[2,12],34:[2,12],36:[2,12],37:[2,12],40:[2,12],41:[2,12],42:[2,12],43:[2,12],47:[2,12],48:[2,12],49:[2,12],50:[2,12],51:[2,12],56:[2,12],58:[2,12],59:[2,12],60:[2,12],65:[2,12],67:[2,12],73:[2,12],78:[2,12],81:[2,12],94:[2,12],105:[2,12],106:[2,12],111:[2,12],112:[2,12],113:[2,12],114:[2,12],115:[2,12],116:[2,12],117:[2,12],118:[2,12],119:[2,12],122:[2,12],174:[2,12],187:[2,12],188:[2,12],189:[2,12],190:[2,12],191:[2,12]},{19:[2,13],21:[2,13],22:[2,13],28:[2,13],34:[2,13],36:[2,13],37:[2,13],40:[2,13],41:[2,13],42:[2,13],43:[2,13],47:[2,13],48:[2,13],49:[2,13],50:[2,13],51:[2,13],56:[2,13],58:[2,13],59:[2,13],60:[2,13],65:[2,13],67:[2,13],73:[2,13],78:[2,13],81:[2,13],94:[2,13],105:[2,13],106:[2,13],111:[2,13],112:[2,13],113:[2,13],114:[2,13],115:[2,13],116:[2,13],117:[2,13],118:[2,13],119:[2,13],122:[2,13],174:[2,13],187:[2,13],188:[2,13],189:[2,13],190:[2,13],191:[2,13]},{19:[2,14],21:[2,14],22:[2,14],28:[2,14],34:[2,14],36:[2,14],37:[2,14],40:[2,14],41:[2,14],42:[2,14],43:[2,14],47:[2,14],48:[2,14],49:[2,14],50:[2,14],51:[2,14],56:[2,14],58:[2,14],59:[2,14],60:[2,14],65:[2,14],67:[2,14],73:[2,14],78:[2,14],81:[2,14],94:[2,14],105:[2,14],106:[2,14],111:[2,14],112:[2,14],113:[2,14],114:[2,14],115:[2,14],116:[2,14],117:[2,14],118:[2,14],119:[2,14],122:[2,14],174:[2,14],187:[2,14],188:[2,14],189:[2,14],190:[2,14],191:[2,14]},{19:[2,15],21:[2,15],22:[2,15],28:[2,15],34:[2,15],36:[2,15],37:[2,15],40:[2,15],41:[2,15],42:[2,15],43:[2,15],47:[2,15],48:[2,15],49:[2,15],50:[2,15],51:[2,15],56:[2,15],58:[2,15],59:[2,15],60:[2,15],65:[2,15],67:[2,15],73:[2,15],78:[2,15],81:[2,15],94:[2,15],105:[2,15],106:[2,15],111:[2,15],112:[2,15],113:[2,15],114:[2,15],115:[2,15],116:[2,15],117:[2,15],118:[2,15],119:[2,15],122:[2,15],174:[2,15],187:[2,15],188:[2,15],189:[2,15],190:[2,15],191:[2,15]},{28:[1,90]},{19:[2,18],20:91,21:[2,18],22:[2,18],28:[2,18],34:[2,18],36:[2,18],37:[2,18],41:[2,18],42:[2,18],43:[2,18],47:[2,18],48:[2,18],49:[2,18],50:[2,18],51:[2,18],59:[2,18],60:[2,18],65:[2,18],78:[2,18],81:[2,18],94:[2,18],105:[2,18],106:[2,18],111:[2,18],112:[2,18],113:[2,18],114:[2,18],115:[2,18],116:[2,18],117:[2,18],118:[2,18],119:[2,18],122:[2,18],174:[2,18],187:[2,18],188:[2,18],189:[2,18],190:[2,18],191:[2,18]},{23:92,24:93,28:[1,94]},{19:[2,30],21:[2,30],22:[2,30],28:[2,30],34:[2,30],36:[2,30],37:[2,30],40:[2,30],41:[2,30],42:[2,30],43:[2,30],47:[2,30],48:[2,30],49:[2,30],50:[2,30],51:[2,30],56:[2,30],58:[2,30],59:[2,30],60:[2,30],65:[2,30],67:[2,30],73:[2,30],78:[2,30],81:[2,30],94:[2,30],105:[2,30],106:[2,30],111:[2,30],112:[2,30],113:[2,30],114:[2,30],115:[2,30],116:[2,30],117:[2,30],118:[2,30],119:[2,30],122:[2,30],174:[2,30],187:[2,30],188:[2,30],189:[2,30],190:[2,30],191:[2,30]},{2:[1,96],25:[1,97],34:[1,95]},{37:[1,98]},{3:99,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{37:[1,100]},{37:[1,101]},{2:[1,103],28:[1,104],34:[1,102]},{2:[1,106],28:[1,107],34:[1,105]},{2:[1,109],19:[1,129],28:[1,128],32:111,34:[1,108],37:[1,55],38:110,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{37:[1,138]},{2:[2,99],25:[2,99],31:[2,99],34:[2,99],37:[2,99],46:[2,99],57:[1,139],81:[2,99],93:[2,99],105:[2,99],106:[2,99],116:[2,99],117:[2,99],121:[2,99],122:[2,99],123:[2,99],128:[2,99],129:[2,99],130:[2,99],133:[2,99],134:[2,99],135:[2,99],136:[2,99],137:[2,99],141:[2,99],142:[2,99],143:[2,99],144:[2,99],148:[2,99],152:[2,99],156:[2,99],160:[2,99],164:[2,99],168:[2,99],173:[2,99],174:[2,99],175:[2,99],176:[2,99],177:[2,99],178:[2,99],179:[2,99],180:[2,99],181:[2,99],182:[2,99],183:[2,99]},{37:[1,140]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:141,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{4:142,19:[1,23]},{2:[1,144],34:[1,143]},{2:[2,295],25:[2,295],34:[2,295]},{2:[2,277],25:[2,277],34:[2,277]},{2:[2,160],25:[2,160],31:[1,145],34:[2,160],46:[2,160],105:[1,147],106:[1,148],116:[2,160],117:[2,160],121:[2,160],122:[2,160],123:[2,160],128:[2,160],129:[2,160],130:[2,160],133:[2,160],134:[2,160],135:[2,160],136:[2,160],137:[2,160],141:[2,160],142:[2,160],143:[2,160],144:[2,160],148:[2,160],152:[2,160],156:[2,160],160:[2,160],164:[2,160],168:[2,160],171:146,173:[1,149],174:[1,150],175:[1,151],176:[1,152],177:[1,153],178:[1,154],179:[1,155],180:[1,156],181:[1,157],182:[1,158],183:[1,159]},{2:[2,269],25:[2,269],34:[2,269],164:[1,161],168:[1,160]},{2:[2,155],25:[2,155],31:[2,155],34:[2,155],46:[2,155],105:[2,155],106:[2,155],116:[2,155],117:[2,155],121:[2,155],122:[2,155],123:[2,155],128:[2,155],129:[2,155],130:[2,155],133:[2,155],134:[2,155],135:[2,155],136:[2,155],137:[2,155],141:[2,155],142:[2,155],143:[2,155],144:[2,155],148:[2,155],152:[2,155],156:[2,155],160:[2,155],164:[2,155],168:[2,155],173:[2,155],174:[2,155],175:[2,155],176:[2,155],177:[2,155],178:[2,155],179:[2,155],180:[2,155],181:[2,155],182:[2,155],183:[2,155]},{2:[2,156],25:[2,156],31:[2,156],34:[2,156],37:[1,165],46:[2,156],81:[1,163],93:[1,164],95:162,105:[2,156],106:[2,156],116:[2,156],117:[2,156],121:[2,156],122:[2,156],123:[2,156],128:[2,156],129:[2,156],130:[2,156],133:[2,156],134:[2,156],135:[2,156],136:[2,156],137:[2,156],141:[2,156],142:[2,156],143:[2,156],144:[2,156],148:[2,156],152:[2,156],156:[2,156],160:[2,156],164:[2,156],168:[2,156],173:[2,156],174:[2,156],175:[2,156],176:[2,156],177:[2,156],178:[2,156],179:[2,156],180:[2,156],181:[2,156],182:[2,156],183:[2,156]},{2:[2,263],25:[2,263],34:[2,263],160:[1,166],164:[2,263],168:[2,263]},{2:[2,137],25:[2,137],31:[2,137],34:[2,137],37:[1,165],46:[2,137],81:[1,168],93:[1,169],95:167,105:[2,137],106:[2,137],116:[2,137],117:[2,137],121:[2,137],122:[2,137],123:[2,137],128:[2,137],129:[2,137],130:[2,137],133:[2,137],134:[2,137],135:[2,137],136:[2,137],137:[2,137],141:[2,137],142:[2,137],143:[2,137],144:[2,137],148:[2,137],152:[2,137],156:[2,137],160:[2,137],164:[2,137],168:[2,137],173:[2,137],174:[2,137],175:[2,137],176:[2,137],177:[2,137],178:[2,137],179:[2,137],180:[2,137],181:[2,137],182:[2,137],183:[2,137]},{19:[1,129],28:[1,128],37:[1,55],67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:171,94:[1,119],97:170,122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,257],25:[2,257],34:[2,257],156:[1,172],160:[2,257],164:[2,257],168:[2,257]},{2:[2,131],25:[2,131],31:[2,131],34:[2,131],37:[2,131],46:[2,131],81:[2,131],93:[2,131],105:[2,131],106:[2,131],116:[2,131],117:[2,131],121:[2,131],122:[2,131],123:[2,131],128:[2,131],129:[2,131],130:[2,131],133:[2,131],134:[2,131],135:[2,131],136:[2,131],137:[2,131],141:[2,131],142:[2,131],143:[2,131],144:[2,131],148:[2,131],152:[2,131],156:[2,131],160:[2,131],164:[2,131],168:[2,131],173:[2,131],174:[2,131],175:[2,131],176:[2,131],177:[2,131],178:[2,131],179:[2,131],180:[2,131],181:[2,131],182:[2,131],183:[2,131]},{2:[2,251],25:[2,251],34:[2,251],152:[1,173],156:[2,251],160:[2,251],164:[2,251],168:[2,251]},{2:[2,98],19:[2,98],21:[2,98],22:[2,98],25:[2,98],28:[2,98],31:[2,98],34:[2,98],36:[2,98],37:[2,98],39:[2,98],40:[2,98],41:[2,98],42:[2,98],43:[2,98],46:[2,98],47:[2,98],48:[2,98],49:[2,98],50:[2,98],51:[2,98],56:[2,98],57:[2,98],58:[2,98],59:[2,98],60:[2,98],65:[2,98],67:[2,98],73:[2,98],78:[2,98],81:[2,98],82:[2,98],93:[2,98],94:[2,98],105:[2,98],106:[2,98],111:[2,98],112:[2,98],113:[2,98],114:[2,98],115:[2,98],116:[2,98],117:[2,98],118:[2,98],119:[2,98],121:[2,98],122:[2,98],123:[2,98],128:[2,98],129:[2,98],130:[2,98],133:[2,98],134:[2,98],135:[2,98],136:[2,98],137:[2,98],141:[2,98],142:[2,98],143:[2,98],144:[2,98],148:[2,98],152:[2,98],156:[2,98],160:[2,98],164:[2,98],168:[2,98],173:[2,98],174:[2,98],175:[2,98],176:[2,98],177:[2,98],178:[2,98],179:[2,98],180:[2,98],181:[2,98],182:[2,98],183:[2,98],187:[2,98],188:[2,98],189:[2,98],190:[2,98],191:[2,98]},{2:[2,100],19:[2,100],21:[2,100],22:[2,100],25:[2,100],28:[2,100],31:[2,100],34:[2,100],36:[2,100],37:[2,100],39:[2,100],40:[2,100],41:[2,100],42:[2,100],43:[2,100],46:[2,100],47:[2,100],48:[2,100],49:[2,100],50:[2,100],51:[2,100],56:[2,100],57:[2,100],58:[2,100],59:[2,100],60:[2,100],65:[2,100],67:[2,100],73:[2,100],78:[2,100],81:[2,100],82:[2,100],93:[2,100],94:[2,100],105:[2,100],106:[2,100],111:[2,100],112:[2,100],113:[2,100],114:[2,100],115:[2,100],116:[2,100],117:[2,100],118:[2,100],119:[2,100],121:[2,100],122:[2,100],123:[2,100],128:[2,100],129:[2,100],130:[2,100],133:[2,100],134:[2,100],135:[2,100],136:[2,100],137:[2,100],141:[2,100],142:[2,100],143:[2,100],144:[2,100],148:[2,100],152:[2,100],156:[2,100],160:[2,100],164:[2,100],168:[2,100],173:[2,100],174:[2,100],175:[2,100],176:[2,100],177:[2,100],178:[2,100],179:[2,100],180:[2,100],181:[2,100],182:[2,100],183:[2,100],187:[2,100],188:[2,100],189:[2,100],190:[2,100],191:[2,100]},{2:[2,101],19:[2,101],21:[2,101],22:[2,101],25:[2,101],28:[2,101],31:[2,101],34:[2,101],36:[2,101],37:[2,101],39:[2,101],40:[2,101],41:[2,101],42:[2,101],43:[2,101],46:[2,101],47:[2,101],48:[2,101],49:[2,101],50:[2,101],51:[2,101],56:[2,101],57:[2,101],58:[2,101],59:[2,101],60:[2,101],65:[2,101],67:[2,101],73:[2,101],78:[2,101],81:[2,101],82:[2,101],93:[2,101],94:[2,101],105:[2,101],106:[2,101],111:[2,101],112:[2,101],113:[2,101],114:[2,101],115:[2,101],116:[2,101],117:[2,101],118:[2,101],119:[2,101],121:[2,101],122:[2,101],123:[2,101],128:[2,101],129:[2,101],130:[2,101],133:[2,101],134:[2,101],135:[2,101],136:[2,101],137:[2,101],141:[2,101],142:[2,101],143:[2,101],144:[2,101],148:[2,101],152:[2,101],156:[2,101],160:[2,101],164:[2,101],168:[2,101],173:[2,101],174:[2,101],175:[2,101],176:[2,101],177:[2,101],178:[2,101],179:[2,101],180:[2,101],181:[2,101],182:[2,101],183:[2,101],187:[2,101],188:[2,101],189:[2,101],190:[2,101],191:[2,101]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:174,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,245],25:[2,245],34:[2,245],148:[1,175],152:[2,245],156:[2,245],160:[2,245],164:[2,245],168:[2,245]},{2:[2,297],19:[2,297],21:[2,297],22:[2,297],25:[2,297],28:[2,297],31:[2,297],34:[2,297],36:[2,297],37:[2,297],39:[2,297],40:[2,297],41:[2,297],42:[2,297],43:[2,297],46:[2,297],47:[2,297],48:[2,297],49:[2,297],50:[2,297],51:[2,297],56:[2,297],57:[2,297],58:[2,297],59:[2,297],60:[2,297],65:[2,297],67:[2,297],73:[2,297],78:[2,297],81:[2,297],82:[2,297],93:[2,297],94:[2,297],105:[2,297],106:[2,297],111:[2,297],112:[2,297],113:[2,297],114:[2,297],115:[2,297],116:[2,297],117:[2,297],118:[2,297],119:[2,297],121:[2,297],122:[2,297],123:[2,297],128:[2,297],129:[2,297],130:[2,297],133:[2,297],134:[2,297],135:[2,297],136:[2,297],137:[2,297],141:[2,297],142:[2,297],143:[2,297],144:[2,297],148:[2,297],152:[2,297],156:[2,297],160:[2,297],164:[2,297],168:[2,297],173:[2,297],174:[2,297],175:[2,297],176:[2,297],177:[2,297],178:[2,297],179:[2,297],180:[2,297],181:[2,297],182:[2,297],183:[2,297],187:[2,297],188:[2,297],189:[2,297],190:[2,297],191:[2,297]},{2:[2,298],19:[2,298],21:[2,298],22:[2,298],25:[2,298],28:[2,298],31:[2,298],34:[2,298],36:[2,298],37:[2,298],39:[2,298],40:[2,298],41:[2,298],42:[2,298],43:[2,298],46:[2,298],47:[2,298],48:[2,298],49:[2,298],50:[2,298],51:[2,298],56:[2,298],57:[2,298],58:[2,298],59:[2,298],60:[2,298],65:[2,298],67:[2,298],73:[2,298],78:[2,298],81:[2,298],82:[2,298],93:[2,298],94:[2,298],105:[2,298],106:[2,298],111:[2,298],112:[2,298],113:[2,298],114:[2,298],115:[2,298],116:[2,298],117:[2,298],118:[2,298],119:[2,298],121:[2,298],122:[2,298],123:[2,298],128:[2,298],129:[2,298],130:[2,298],133:[2,298],134:[2,298],135:[2,298],136:[2,298],137:[2,298],141:[2,298],142:[2,298],143:[2,298],144:[2,298],148:[2,298],152:[2,298],156:[2,298],160:[2,298],164:[2,298],168:[2,298],173:[2,298],174:[2,298],175:[2,298],176:[2,298],177:[2,298],178:[2,298],179:[2,298],180:[2,298],181:[2,298],182:[2,298],183:[2,298],187:[2,298],188:[2,298],189:[2,298],190:[2,298],191:[2,298]},{2:[2,299],19:[2,299],21:[2,299],22:[2,299],25:[2,299],28:[2,299],31:[2,299],34:[2,299],36:[2,299],37:[2,299],39:[2,299],40:[2,299],41:[2,299],42:[2,299],43:[2,299],46:[2,299],47:[2,299],48:[2,299],49:[2,299],50:[2,299],51:[2,299],56:[2,299],57:[2,299],58:[2,299],59:[2,299],60:[2,299],65:[2,299],67:[2,299],73:[2,299],78:[2,299],81:[2,299],82:[2,299],93:[2,299],94:[2,299],105:[2,299],106:[2,299],111:[2,299],112:[2,299],113:[2,299],114:[2,299],115:[2,299],116:[2,299],117:[2,299],118:[2,299],119:[2,299],121:[2,299],122:[2,299],123:[2,299],128:[2,299],129:[2,299],130:[2,299],133:[2,299],134:[2,299],135:[2,299],136:[2,299],137:[2,299],141:[2,299],142:[2,299],143:[2,299],144:[2,299],148:[2,299],152:[2,299],156:[2,299],160:[2,299],164:[2,299],168:[2,299],173:[2,299],174:[2,299],175:[2,299],176:[2,299],177:[2,299],178:[2,299],179:[2,299],180:[2,299],181:[2,299],182:[2,299],183:[2,299],187:[2,299],188:[2,299],189:[2,299],190:[2,299],191:[2,299]},{2:[2,300],19:[2,300],21:[2,300],22:[2,300],25:[2,300],28:[2,300],31:[2,300],34:[2,300],36:[2,300],37:[2,300],39:[2,300],40:[2,300],41:[2,300],42:[2,300],43:[2,300],46:[2,300],47:[2,300],48:[2,300],49:[2,300],50:[2,300],51:[2,300],56:[2,300],57:[2,300],58:[2,300],59:[2,300],60:[2,300],65:[2,300],67:[2,300],73:[2,300],78:[2,300],81:[2,300],82:[2,300],93:[2,300],94:[2,300],105:[2,300],106:[2,300],111:[2,300],112:[2,300],113:[2,300],114:[2,300],115:[2,300],116:[2,300],117:[2,300],118:[2,300],119:[2,300],121:[2,300],122:[2,300],123:[2,300],128:[2,300],129:[2,300],130:[2,300],133:[2,300],134:[2,300],135:[2,300],136:[2,300],137:[2,300],141:[2,300],142:[2,300],143:[2,300],144:[2,300],148:[2,300],152:[2,300],156:[2,300],160:[2,300],164:[2,300],168:[2,300],173:[2,300],174:[2,300],175:[2,300],176:[2,300],177:[2,300],178:[2,300],179:[2,300],180:[2,300],181:[2,300],182:[2,300],183:[2,300],187:[2,300],188:[2,300],189:[2,300],190:[2,300],191:[2,300]},{2:[2,301],19:[2,301],21:[2,301],22:[2,301],25:[2,301],28:[2,301],31:[2,301],34:[2,301],36:[2,301],37:[2,301],39:[2,301],40:[2,301],41:[2,301],42:[2,301],43:[2,301],46:[2,301],47:[2,301],48:[2,301],49:[2,301],50:[2,301],51:[2,301],56:[2,301],57:[2,301],58:[2,301],59:[2,301],60:[2,301],65:[2,301],67:[2,301],73:[2,301],78:[2,301],81:[2,301],82:[2,301],93:[2,301],94:[2,301],105:[2,301],106:[2,301],111:[2,301],112:[2,301],113:[2,301],114:[2,301],115:[2,301],116:[2,301],117:[2,301],118:[2,301],119:[2,301],121:[2,301],122:[2,301],123:[2,301],128:[2,301],129:[2,301],130:[2,301],133:[2,301],134:[2,301],135:[2,301],136:[2,301],137:[2,301],141:[2,301],142:[2,301],143:[2,301],144:[2,301],148:[2,301],152:[2,301],156:[2,301],160:[2,301],164:[2,301],168:[2,301],173:[2,301],174:[2,301],175:[2,301],176:[2,301],177:[2,301],178:[2,301],179:[2,301],180:[2,301],181:[2,301],182:[2,301],183:[2,301],187:[2,301],188:[2,301],189:[2,301],190:[2,301],191:[2,301]},{19:[1,129],25:[1,179],28:[1,128],32:180,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],82:[1,176],83:177,84:178,90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,239],25:[2,239],34:[2,239],141:[1,181],142:[1,182],143:[1,183],144:[1,184],148:[2,239],152:[2,239],156:[2,239],160:[2,239],164:[2,239],168:[2,239]},{2:[2,302],19:[2,302],21:[2,302],22:[2,302],25:[2,302],28:[2,302],31:[2,302],34:[2,302],36:[2,302],37:[2,302],39:[2,302],40:[2,302],41:[2,302],42:[2,302],43:[2,302],46:[2,302],47:[2,302],48:[2,302],49:[2,302],50:[2,302],51:[2,302],56:[2,302],57:[2,302],58:[2,302],59:[2,302],60:[2,302],65:[2,302],67:[2,302],73:[2,302],78:[2,302],81:[2,302],82:[2,302],93:[2,302],94:[2,302],105:[2,302],106:[2,302],111:[2,302],112:[2,302],113:[2,302],114:[2,302],115:[2,302],116:[2,302],117:[2,302],118:[2,302],119:[2,302],121:[2,302],122:[2,302],123:[2,302],128:[2,302],129:[2,302],130:[2,302],133:[2,302],134:[2,302],135:[2,302],136:[2,302],137:[2,302],141:[2,302],142:[2,302],143:[2,302],144:[2,302],148:[2,302],152:[2,302],156:[2,302],160:[2,302],164:[2,302],168:[2,302],173:[2,302],174:[2,302],175:[2,302],176:[2,302],177:[2,302],178:[2,302],179:[2,302],180:[2,302],181:[2,302],182:[2,302],183:[2,302],187:[2,302],188:[2,302],189:[2,302],190:[2,302],191:[2,302]},{2:[2,303],19:[2,303],21:[2,303],22:[2,303],25:[2,303],28:[2,303],31:[2,303],34:[2,303],36:[2,303],37:[2,303],39:[2,303],40:[2,303],41:[2,303],42:[2,303],43:[2,303],46:[2,303],47:[2,303],48:[2,303],49:[2,303],50:[2,303],51:[2,303],56:[2,303],57:[2,303],58:[2,303],59:[2,303],60:[2,303],65:[2,303],67:[2,303],73:[2,303],78:[2,303],81:[2,303],82:[2,303],93:[2,303],94:[2,303],105:[2,303],106:[2,303],111:[2,303],112:[2,303],113:[2,303],114:[2,303],115:[2,303],116:[2,303],117:[2,303],118:[2,303],119:[2,303],121:[2,303],122:[2,303],123:[2,303],128:[2,303],129:[2,303],130:[2,303],133:[2,303],134:[2,303],135:[2,303],136:[2,303],137:[2,303],141:[2,303],142:[2,303],143:[2,303],144:[2,303],148:[2,303],152:[2,303],156:[2,303],160:[2,303],164:[2,303],168:[2,303],173:[2,303],174:[2,303],175:[2,303],176:[2,303],177:[2,303],178:[2,303],179:[2,303],180:[2,303],181:[2,303],182:[2,303],183:[2,303],187:[2,303],188:[2,303],189:[2,303],190:[2,303],191:[2,303]},{2:[2,304],19:[2,304],21:[2,304],22:[2,304],25:[2,304],28:[2,304],31:[2,304],34:[2,304],36:[2,304],37:[2,304],39:[2,304],40:[2,304],41:[2,304],42:[2,304],43:[2,304],46:[2,304],47:[2,304],48:[2,304],49:[2,304],50:[2,304],51:[2,304],56:[2,304],57:[2,304],58:[2,304],59:[2,304],60:[2,304],65:[2,304],67:[2,304],73:[2,304],78:[2,304],81:[2,304],82:[2,304],93:[2,304],94:[2,304],105:[2,304],106:[2,304],111:[2,304],112:[2,304],113:[2,304],114:[2,304],115:[2,304],116:[2,304],117:[2,304],118:[2,304],119:[2,304],121:[2,304],122:[2,304],123:[2,304],128:[2,304],129:[2,304],130:[2,304],133:[2,304],134:[2,304],135:[2,304],136:[2,304],137:[2,304],141:[2,304],142:[2,304],143:[2,304],144:[2,304],148:[2,304],152:[2,304],156:[2,304],160:[2,304],164:[2,304],168:[2,304],173:[2,304],174:[2,304],175:[2,304],176:[2,304],177:[2,304],178:[2,304],179:[2,304],180:[2,304],181:[2,304],182:[2,304],183:[2,304],187:[2,304],188:[2,304],189:[2,304],190:[2,304],191:[2,304]},{2:[2,305],19:[2,305],21:[2,305],22:[2,305],25:[2,305],28:[2,305],31:[2,305],34:[2,305],36:[2,305],37:[2,305],39:[2,305],40:[2,305],41:[2,305],42:[2,305],43:[2,305],46:[2,305],47:[2,305],48:[2,305],49:[2,305],50:[2,305],51:[2,305],56:[2,305],57:[2,305],58:[2,305],59:[2,305],60:[2,305],65:[2,305],67:[2,305],73:[2,305],78:[2,305],81:[2,305],82:[2,305],93:[2,305],94:[2,305],105:[2,305],106:[2,305],111:[2,305],112:[2,305],113:[2,305],114:[2,305],115:[2,305],116:[2,305],117:[2,305],118:[2,305],119:[2,305],121:[2,305],122:[2,305],123:[2,305],128:[2,305],129:[2,305],130:[2,305],133:[2,305],134:[2,305],135:[2,305],136:[2,305],137:[2,305],141:[2,305],142:[2,305],143:[2,305],144:[2,305],148:[2,305],152:[2,305],156:[2,305],160:[2,305],164:[2,305],168:[2,305],173:[2,305],174:[2,305],175:[2,305],176:[2,305],177:[2,305],178:[2,305],179:[2,305],180:[2,305],181:[2,305],182:[2,305],183:[2,305],187:[2,305],188:[2,305],189:[2,305],190:[2,305],191:[2,305]},{2:[2,306],19:[2,306],21:[2,306],22:[2,306],25:[2,306],28:[2,306],31:[2,306],34:[2,306],36:[2,306],37:[2,306],39:[2,306],40:[2,306],41:[2,306],42:[2,306],43:[2,306],46:[2,306],47:[2,306],48:[2,306],49:[2,306],50:[2,306],51:[2,306],56:[2,306],57:[2,306],58:[2,306],59:[2,306],60:[2,306],
	65:[2,306],67:[2,306],73:[2,306],78:[2,306],81:[2,306],82:[2,306],93:[2,306],94:[2,306],105:[2,306],106:[2,306],111:[2,306],112:[2,306],113:[2,306],114:[2,306],115:[2,306],116:[2,306],117:[2,306],118:[2,306],119:[2,306],121:[2,306],122:[2,306],123:[2,306],128:[2,306],129:[2,306],130:[2,306],133:[2,306],134:[2,306],135:[2,306],136:[2,306],137:[2,306],141:[2,306],142:[2,306],143:[2,306],144:[2,306],148:[2,306],152:[2,306],156:[2,306],160:[2,306],164:[2,306],168:[2,306],173:[2,306],174:[2,306],175:[2,306],176:[2,306],177:[2,306],178:[2,306],179:[2,306],180:[2,306],181:[2,306],182:[2,306],183:[2,306],187:[2,306],188:[2,306],189:[2,306],190:[2,306],191:[2,306]},{193:[1,185]},{2:[2,230],25:[2,230],34:[2,230],46:[1,191],133:[1,186],134:[1,187],135:[1,188],136:[1,189],137:[1,190],141:[2,230],142:[2,230],143:[2,230],144:[2,230],148:[2,230],152:[2,230],156:[2,230],160:[2,230],164:[2,230],168:[2,230]},{193:[2,308]},{193:[2,309]},{2:[2,213],25:[2,213],34:[2,213],46:[2,213],128:[1,192],129:[1,193],130:[1,194],133:[2,213],134:[2,213],135:[2,213],136:[2,213],137:[2,213],141:[2,213],142:[2,213],143:[2,213],144:[2,213],148:[2,213],152:[2,213],156:[2,213],160:[2,213],164:[2,213],168:[2,213]},{2:[2,196],25:[2,196],34:[2,196],46:[2,196],116:[1,195],117:[1,196],128:[2,196],129:[2,196],130:[2,196],133:[2,196],134:[2,196],135:[2,196],136:[2,196],137:[2,196],141:[2,196],142:[2,196],143:[2,196],144:[2,196],148:[2,196],152:[2,196],156:[2,196],160:[2,196],164:[2,196],168:[2,196]},{2:[2,189],25:[2,189],34:[2,189],46:[2,189],116:[2,189],117:[2,189],121:[1,197],122:[1,198],123:[1,199],128:[2,189],129:[2,189],130:[2,189],133:[2,189],134:[2,189],135:[2,189],136:[2,189],137:[2,189],141:[2,189],142:[2,189],143:[2,189],144:[2,189],148:[2,189],152:[2,189],156:[2,189],160:[2,189],164:[2,189],168:[2,189]},{2:[2,182],25:[2,182],34:[2,182],46:[2,182],116:[2,182],117:[2,182],121:[2,182],122:[2,182],123:[2,182],128:[2,182],129:[2,182],130:[2,182],133:[2,182],134:[2,182],135:[2,182],136:[2,182],137:[2,182],141:[2,182],142:[2,182],143:[2,182],144:[2,182],148:[2,182],152:[2,182],156:[2,182],160:[2,182],164:[2,182],168:[2,182]},{2:[2,165],25:[2,165],34:[2,165],46:[2,165],116:[2,165],117:[2,165],121:[2,165],122:[2,165],123:[2,165],128:[2,165],129:[2,165],130:[2,165],133:[2,165],134:[2,165],135:[2,165],136:[2,165],137:[2,165],141:[2,165],142:[2,165],143:[2,165],144:[2,165],148:[2,165],152:[2,165],156:[2,165],160:[2,165],164:[2,165],168:[2,165]},{2:[2,166],25:[2,166],34:[2,166],46:[2,166],116:[2,166],117:[2,166],121:[2,166],122:[2,166],123:[2,166],128:[2,166],129:[2,166],130:[2,166],133:[2,166],134:[2,166],135:[2,166],136:[2,166],137:[2,166],141:[2,166],142:[2,166],143:[2,166],144:[2,166],148:[2,166],152:[2,166],156:[2,166],160:[2,166],164:[2,166],168:[2,166]},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:200,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:202,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:203,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:204,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:205,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:206,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:207,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:208,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:209,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:210,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:211,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{37:[1,212]},{3:214,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],21:[1,213],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[2,19],21:[2,19],22:[2,19],25:[1,215],28:[2,19],34:[2,19],36:[2,19],37:[2,19],40:[2,19],41:[2,19],42:[2,19],43:[2,19],47:[2,19],48:[2,19],49:[2,19],50:[2,19],51:[2,19],56:[2,19],58:[2,19],59:[2,19],60:[2,19],65:[2,19],67:[2,19],73:[2,19],78:[2,19],81:[2,19],94:[2,19],105:[2,19],106:[2,19],111:[2,19],112:[2,19],113:[2,19],114:[2,19],115:[2,19],116:[2,19],117:[2,19],118:[2,19],119:[2,19],122:[2,19],174:[2,19],187:[2,19],188:[2,19],189:[2,19],190:[2,19],191:[2,19]},{19:[2,20],21:[2,20],22:[2,20],25:[2,20],28:[2,20],34:[2,20],36:[2,20],37:[2,20],40:[2,20],41:[2,20],42:[2,20],43:[2,20],47:[2,20],48:[2,20],49:[2,20],50:[2,20],51:[2,20],56:[2,20],58:[2,20],59:[2,20],60:[2,20],65:[2,20],67:[2,20],73:[2,20],78:[2,20],81:[2,20],94:[2,20],105:[2,20],106:[2,20],111:[2,20],112:[2,20],113:[2,20],114:[2,20],115:[2,20],116:[2,20],117:[2,20],118:[2,20],119:[2,20],122:[2,20],174:[2,20],187:[2,20],188:[2,20],189:[2,20],190:[2,20],191:[2,20]},{19:[2,24],21:[2,24],22:[2,24],25:[2,24],28:[2,24],29:216,31:[1,217],34:[2,24],36:[2,24],37:[2,24],40:[2,24],41:[2,24],42:[2,24],43:[2,24],47:[2,24],48:[2,24],49:[2,24],50:[2,24],51:[2,24],56:[2,24],58:[2,24],59:[2,24],60:[2,24],65:[2,24],67:[2,24],73:[2,24],78:[2,24],81:[2,24],94:[2,24],105:[2,24],106:[2,24],111:[2,24],112:[2,24],113:[2,24],114:[2,24],115:[2,24],116:[2,24],117:[2,24],118:[2,24],119:[2,24],122:[2,24],174:[2,24],187:[2,24],188:[2,24],189:[2,24],190:[2,24],191:[2,24]},{19:[2,31],21:[2,31],22:[2,31],28:[2,31],34:[2,31],36:[2,31],37:[2,31],40:[2,31],41:[2,31],42:[2,31],43:[2,31],47:[2,31],48:[2,31],49:[2,31],50:[2,31],51:[2,31],56:[2,31],58:[2,31],59:[2,31],60:[2,31],65:[2,31],67:[2,31],73:[2,31],78:[2,31],81:[2,31],94:[2,31],105:[2,31],106:[2,31],111:[2,31],112:[2,31],113:[2,31],114:[2,31],115:[2,31],116:[2,31],117:[2,31],118:[2,31],119:[2,31],122:[2,31],174:[2,31],187:[2,31],188:[2,31],189:[2,31],190:[2,31],191:[2,31]},{19:[2,32],21:[2,32],22:[2,32],28:[2,32],34:[2,32],36:[2,32],37:[2,32],40:[2,32],41:[2,32],42:[2,32],43:[2,32],47:[2,32],48:[2,32],49:[2,32],50:[2,32],51:[2,32],56:[2,32],58:[2,32],59:[2,32],60:[2,32],65:[2,32],67:[2,32],73:[2,32],78:[2,32],81:[2,32],94:[2,32],105:[2,32],106:[2,32],111:[2,32],112:[2,32],113:[2,32],114:[2,32],115:[2,32],116:[2,32],117:[2,32],118:[2,32],119:[2,32],122:[2,32],174:[2,32],187:[2,32],188:[2,32],189:[2,32],190:[2,32],191:[2,32]},{19:[1,129],28:[1,128],32:218,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],32:111,37:[1,55],38:219,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{42:[1,220]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:221,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],22:[1,224],28:[1,128],33:226,34:[1,223],37:[1,55],44:222,45:225,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:234,145:233,149:232,153:231,157:230,161:229,165:228,169:227,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[2,52],21:[2,52],22:[2,52],28:[2,52],34:[2,52],36:[2,52],37:[2,52],40:[2,52],41:[2,52],42:[2,52],43:[2,52],47:[2,52],48:[2,52],49:[2,52],50:[2,52],51:[2,52],56:[2,52],58:[2,52],59:[2,52],60:[2,52],65:[2,52],67:[2,52],73:[2,52],78:[2,52],81:[2,52],94:[2,52],105:[2,52],106:[2,52],111:[2,52],112:[2,52],113:[2,52],114:[2,52],115:[2,52],116:[2,52],117:[2,52],118:[2,52],119:[2,52],122:[2,52],174:[2,52],187:[2,52],188:[2,52],189:[2,52],190:[2,52],191:[2,52]},{19:[2,53],21:[2,53],22:[2,53],28:[2,53],34:[2,53],36:[2,53],37:[2,53],40:[2,53],41:[2,53],42:[2,53],43:[2,53],47:[2,53],48:[2,53],49:[2,53],50:[2,53],51:[2,53],56:[2,53],58:[2,53],59:[2,53],60:[2,53],65:[2,53],67:[2,53],73:[2,53],78:[2,53],81:[2,53],94:[2,53],105:[2,53],106:[2,53],111:[2,53],112:[2,53],113:[2,53],114:[2,53],115:[2,53],116:[2,53],117:[2,53],118:[2,53],119:[2,53],122:[2,53],174:[2,53],187:[2,53],188:[2,53],189:[2,53],190:[2,53],191:[2,53]},{2:[1,237],34:[1,236]},{19:[2,56],21:[2,56],22:[2,56],28:[2,56],34:[2,56],36:[2,56],37:[2,56],40:[2,56],41:[2,56],42:[2,56],43:[2,56],47:[2,56],48:[2,56],49:[2,56],50:[2,56],51:[2,56],56:[2,56],58:[2,56],59:[2,56],60:[2,56],65:[2,56],67:[2,56],73:[2,56],78:[2,56],81:[2,56],94:[2,56],105:[2,56],106:[2,56],111:[2,56],112:[2,56],113:[2,56],114:[2,56],115:[2,56],116:[2,56],117:[2,56],118:[2,56],119:[2,56],122:[2,56],174:[2,56],187:[2,56],188:[2,56],189:[2,56],190:[2,56],191:[2,56]},{19:[2,57],21:[2,57],22:[2,57],28:[2,57],34:[2,57],36:[2,57],37:[2,57],40:[2,57],41:[2,57],42:[2,57],43:[2,57],47:[2,57],48:[2,57],49:[2,57],50:[2,57],51:[2,57],56:[2,57],58:[2,57],59:[2,57],60:[2,57],65:[2,57],67:[2,57],73:[2,57],78:[2,57],81:[2,57],94:[2,57],105:[2,57],106:[2,57],111:[2,57],112:[2,57],113:[2,57],114:[2,57],115:[2,57],116:[2,57],117:[2,57],118:[2,57],119:[2,57],122:[2,57],174:[2,57],187:[2,57],188:[2,57],189:[2,57],190:[2,57],191:[2,57]},{2:[1,239],34:[1,238]},{19:[2,60],21:[2,60],22:[2,60],28:[2,60],34:[2,60],36:[2,60],37:[2,60],40:[2,60],41:[2,60],42:[2,60],43:[2,60],47:[2,60],48:[2,60],49:[2,60],50:[2,60],51:[2,60],56:[2,60],58:[2,60],59:[2,60],60:[2,60],65:[2,60],67:[2,60],73:[2,60],78:[2,60],81:[2,60],94:[2,60],105:[2,60],106:[2,60],111:[2,60],112:[2,60],113:[2,60],114:[2,60],115:[2,60],116:[2,60],117:[2,60],118:[2,60],119:[2,60],122:[2,60],174:[2,60],187:[2,60],188:[2,60],189:[2,60],190:[2,60],191:[2,60]},{19:[2,61],21:[2,61],22:[2,61],28:[2,61],34:[2,61],36:[2,61],37:[2,61],40:[2,61],41:[2,61],42:[2,61],43:[2,61],47:[2,61],48:[2,61],49:[2,61],50:[2,61],51:[2,61],56:[2,61],58:[2,61],59:[2,61],60:[2,61],65:[2,61],67:[2,61],73:[2,61],78:[2,61],81:[2,61],94:[2,61],105:[2,61],106:[2,61],111:[2,61],112:[2,61],113:[2,61],114:[2,61],115:[2,61],116:[2,61],117:[2,61],118:[2,61],119:[2,61],122:[2,61],174:[2,61],187:[2,61],188:[2,61],189:[2,61],190:[2,61],191:[2,61]},{2:[1,241],25:[1,242],34:[1,240]},{2:[2,291],25:[2,291],34:[2,291],39:[2,291],57:[2,291],82:[2,291]},{2:[2,271],19:[2,271],21:[2,271],22:[2,271],25:[2,271],28:[2,271],34:[2,271],36:[2,271],37:[2,271],39:[2,271],40:[2,271],41:[2,271],42:[2,271],43:[2,271],47:[2,271],48:[2,271],49:[2,271],50:[2,271],51:[2,271],56:[2,271],57:[2,271],58:[2,271],59:[2,271],60:[2,271],65:[2,271],67:[2,271],73:[2,271],78:[2,271],81:[2,271],82:[2,271],94:[2,271],105:[2,271],106:[2,271],111:[2,271],112:[2,271],113:[2,271],114:[2,271],115:[2,271],116:[2,271],117:[2,271],118:[2,271],119:[2,271],122:[2,271],174:[2,271],187:[2,271],188:[2,271],189:[2,271],190:[2,271],191:[2,271]},{2:[2,157],19:[2,157],21:[2,157],22:[2,157],25:[2,157],28:[2,157],31:[1,243],34:[2,157],36:[2,157],37:[2,157],39:[2,157],40:[2,157],41:[2,157],42:[2,157],43:[2,157],46:[2,157],47:[2,157],48:[2,157],49:[2,157],50:[2,157],51:[2,157],56:[2,157],57:[2,157],58:[2,157],59:[2,157],60:[2,157],65:[2,157],67:[2,157],73:[2,157],78:[2,157],81:[2,157],82:[2,157],94:[2,157],105:[1,245],106:[1,246],111:[2,157],112:[2,157],113:[2,157],114:[2,157],115:[2,157],116:[2,157],117:[2,157],118:[2,157],119:[2,157],121:[2,157],122:[2,157],123:[2,157],128:[2,157],129:[2,157],130:[2,157],133:[2,157],134:[2,157],135:[2,157],136:[2,157],137:[2,157],141:[2,157],142:[2,157],143:[2,157],144:[2,157],148:[2,157],152:[2,157],156:[2,157],160:[2,157],164:[2,157],168:[2,157],171:244,173:[1,149],174:[1,150],175:[1,151],176:[1,152],177:[1,153],178:[1,154],179:[1,155],180:[1,156],181:[1,157],182:[1,158],183:[1,159],187:[2,157],188:[2,157],189:[2,157],190:[2,157],191:[2,157]},{2:[2,265],19:[2,265],21:[2,265],22:[2,265],25:[2,265],28:[2,265],34:[2,265],36:[2,265],37:[2,265],39:[2,265],40:[2,265],41:[2,265],42:[2,265],43:[2,265],47:[2,265],48:[2,265],49:[2,265],50:[2,265],51:[2,265],56:[2,265],57:[2,265],58:[2,265],59:[2,265],60:[2,265],65:[2,265],67:[2,265],73:[2,265],78:[2,265],81:[2,265],82:[2,265],94:[2,265],105:[2,265],106:[2,265],111:[2,265],112:[2,265],113:[2,265],114:[2,265],115:[2,265],116:[2,265],117:[2,265],118:[2,265],119:[2,265],122:[2,265],164:[1,248],168:[1,247],174:[2,265],187:[2,265],188:[2,265],189:[2,265],190:[2,265],191:[2,265]},{2:[2,153],19:[2,153],21:[2,153],22:[2,153],25:[2,153],28:[2,153],31:[2,153],34:[2,153],36:[2,153],37:[2,153],39:[2,153],40:[2,153],41:[2,153],42:[2,153],43:[2,153],46:[2,153],47:[2,153],48:[2,153],49:[2,153],50:[2,153],51:[2,153],56:[2,153],57:[2,153],58:[2,153],59:[2,153],60:[2,153],65:[2,153],67:[2,153],73:[2,153],78:[2,153],81:[2,153],82:[2,153],94:[2,153],105:[2,153],106:[2,153],111:[2,153],112:[2,153],113:[2,153],114:[2,153],115:[2,153],116:[2,153],117:[2,153],118:[2,153],119:[2,153],121:[2,153],122:[2,153],123:[2,153],128:[2,153],129:[2,153],130:[2,153],133:[2,153],134:[2,153],135:[2,153],136:[2,153],137:[2,153],141:[2,153],142:[2,153],143:[2,153],144:[2,153],148:[2,153],152:[2,153],156:[2,153],160:[2,153],164:[2,153],168:[2,153],173:[2,153],174:[2,153],175:[2,153],176:[2,153],177:[2,153],178:[2,153],179:[2,153],180:[2,153],181:[2,153],182:[2,153],183:[2,153],187:[2,153],188:[2,153],189:[2,153],190:[2,153],191:[2,153]},{2:[2,154],19:[2,154],21:[2,154],22:[2,154],25:[2,154],28:[2,154],31:[2,154],34:[2,154],36:[2,154],37:[1,165],39:[2,154],40:[2,154],41:[2,154],42:[2,154],43:[2,154],46:[2,154],47:[2,154],48:[2,154],49:[2,154],50:[2,154],51:[2,154],56:[2,154],57:[2,154],58:[2,154],59:[2,154],60:[2,154],65:[2,154],67:[2,154],73:[2,154],78:[2,154],81:[1,250],82:[2,154],93:[1,251],94:[2,154],95:249,105:[2,154],106:[2,154],111:[2,154],112:[2,154],113:[2,154],114:[2,154],115:[2,154],116:[2,154],117:[2,154],118:[2,154],119:[2,154],121:[2,154],122:[2,154],123:[2,154],128:[2,154],129:[2,154],130:[2,154],133:[2,154],134:[2,154],135:[2,154],136:[2,154],137:[2,154],141:[2,154],142:[2,154],143:[2,154],144:[2,154],148:[2,154],152:[2,154],156:[2,154],160:[2,154],164:[2,154],168:[2,154],173:[2,154],174:[2,154],175:[2,154],176:[2,154],177:[2,154],178:[2,154],179:[2,154],180:[2,154],181:[2,154],182:[2,154],183:[2,154],187:[2,154],188:[2,154],189:[2,154],190:[2,154],191:[2,154]},{2:[2,259],19:[2,259],21:[2,259],22:[2,259],25:[2,259],28:[2,259],34:[2,259],36:[2,259],37:[2,259],39:[2,259],40:[2,259],41:[2,259],42:[2,259],43:[2,259],47:[2,259],48:[2,259],49:[2,259],50:[2,259],51:[2,259],56:[2,259],57:[2,259],58:[2,259],59:[2,259],60:[2,259],65:[2,259],67:[2,259],73:[2,259],78:[2,259],81:[2,259],82:[2,259],94:[2,259],105:[2,259],106:[2,259],111:[2,259],112:[2,259],113:[2,259],114:[2,259],115:[2,259],116:[2,259],117:[2,259],118:[2,259],119:[2,259],122:[2,259],160:[1,252],164:[2,259],168:[2,259],174:[2,259],187:[2,259],188:[2,259],189:[2,259],190:[2,259],191:[2,259]},{2:[2,135],19:[2,135],21:[2,135],22:[2,135],25:[2,135],28:[2,135],31:[2,135],34:[2,135],36:[2,135],37:[1,165],39:[2,135],40:[2,135],41:[2,135],42:[2,135],43:[2,135],46:[2,135],47:[2,135],48:[2,135],49:[2,135],50:[2,135],51:[2,135],56:[2,135],57:[2,135],58:[2,135],59:[2,135],60:[2,135],65:[2,135],67:[2,135],73:[2,135],78:[2,135],81:[1,254],82:[2,135],93:[1,255],94:[2,135],95:253,105:[2,135],106:[2,135],111:[2,135],112:[2,135],113:[2,135],114:[2,135],115:[2,135],116:[2,135],117:[2,135],118:[2,135],119:[2,135],121:[2,135],122:[2,135],123:[2,135],128:[2,135],129:[2,135],130:[2,135],133:[2,135],134:[2,135],135:[2,135],136:[2,135],137:[2,135],141:[2,135],142:[2,135],143:[2,135],144:[2,135],148:[2,135],152:[2,135],156:[2,135],160:[2,135],164:[2,135],168:[2,135],173:[2,135],174:[2,135],175:[2,135],176:[2,135],177:[2,135],178:[2,135],179:[2,135],180:[2,135],181:[2,135],182:[2,135],183:[2,135],187:[2,135],188:[2,135],189:[2,135],190:[2,135],191:[2,135]},{19:[1,129],28:[1,128],37:[1,55],67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:257,94:[1,119],97:256,122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,253],19:[2,253],21:[2,253],22:[2,253],25:[2,253],28:[2,253],34:[2,253],36:[2,253],37:[2,253],39:[2,253],40:[2,253],41:[2,253],42:[2,253],43:[2,253],47:[2,253],48:[2,253],49:[2,253],50:[2,253],51:[2,253],56:[2,253],57:[2,253],58:[2,253],59:[2,253],60:[2,253],65:[2,253],67:[2,253],73:[2,253],78:[2,253],81:[2,253],82:[2,253],94:[2,253],105:[2,253],106:[2,253],111:[2,253],112:[2,253],113:[2,253],114:[2,253],115:[2,253],116:[2,253],117:[2,253],118:[2,253],119:[2,253],122:[2,253],156:[1,258],160:[2,253],164:[2,253],168:[2,253],174:[2,253],187:[2,253],188:[2,253],189:[2,253],190:[2,253],191:[2,253]},{2:[2,126],19:[2,126],21:[2,126],22:[2,126],25:[2,126],28:[2,126],31:[2,126],34:[2,126],36:[2,126],37:[2,126],39:[2,126],40:[2,126],41:[2,126],42:[2,126],43:[2,126],46:[2,126],47:[2,126],48:[2,126],49:[2,126],50:[2,126],51:[2,126],56:[2,126],57:[2,126],58:[2,126],59:[2,126],60:[2,126],65:[2,126],67:[2,126],73:[2,126],78:[2,126],81:[2,126],82:[2,126],93:[2,126],94:[2,126],105:[2,126],106:[2,126],111:[2,126],112:[2,126],113:[2,126],114:[2,126],115:[2,126],116:[2,126],117:[2,126],118:[2,126],119:[2,126],121:[2,126],122:[2,126],123:[2,126],128:[2,126],129:[2,126],130:[2,126],133:[2,126],134:[2,126],135:[2,126],136:[2,126],137:[2,126],141:[2,126],142:[2,126],143:[2,126],144:[2,126],148:[2,126],152:[2,126],156:[2,126],160:[2,126],164:[2,126],168:[2,126],173:[2,126],174:[2,126],175:[2,126],176:[2,126],177:[2,126],178:[2,126],179:[2,126],180:[2,126],181:[2,126],182:[2,126],183:[2,126],187:[2,126],188:[2,126],189:[2,126],190:[2,126],191:[2,126]},{2:[2,127],19:[2,127],21:[2,127],22:[2,127],25:[2,127],28:[2,127],31:[2,127],34:[2,127],36:[2,127],37:[2,127],39:[2,127],40:[2,127],41:[2,127],42:[2,127],43:[2,127],46:[2,127],47:[2,127],48:[2,127],49:[2,127],50:[2,127],51:[2,127],56:[2,127],57:[2,127],58:[2,127],59:[2,127],60:[2,127],65:[2,127],67:[2,127],73:[2,127],78:[2,127],81:[2,127],82:[2,127],93:[2,127],94:[2,127],105:[2,127],106:[2,127],111:[2,127],112:[2,127],113:[2,127],114:[2,127],115:[2,127],116:[2,127],117:[2,127],118:[2,127],119:[2,127],121:[2,127],122:[2,127],123:[2,127],128:[2,127],129:[2,127],130:[2,127],133:[2,127],134:[2,127],135:[2,127],136:[2,127],137:[2,127],141:[2,127],142:[2,127],143:[2,127],144:[2,127],148:[2,127],152:[2,127],156:[2,127],160:[2,127],164:[2,127],168:[2,127],173:[2,127],174:[2,127],175:[2,127],176:[2,127],177:[2,127],178:[2,127],179:[2,127],180:[2,127],181:[2,127],182:[2,127],183:[2,127],187:[2,127],188:[2,127],189:[2,127],190:[2,127],191:[2,127]},{2:[2,247],19:[2,247],21:[2,247],22:[2,247],25:[2,247],28:[2,247],34:[2,247],36:[2,247],37:[2,247],39:[2,247],40:[2,247],41:[2,247],42:[2,247],43:[2,247],47:[2,247],48:[2,247],49:[2,247],50:[2,247],51:[2,247],56:[2,247],57:[2,247],58:[2,247],59:[2,247],60:[2,247],65:[2,247],67:[2,247],73:[2,247],78:[2,247],81:[2,247],82:[2,247],94:[2,247],105:[2,247],106:[2,247],111:[2,247],112:[2,247],113:[2,247],114:[2,247],115:[2,247],116:[2,247],117:[2,247],118:[2,247],119:[2,247],122:[2,247],152:[1,259],156:[2,247],160:[2,247],164:[2,247],168:[2,247],174:[2,247],187:[2,247],188:[2,247],189:[2,247],190:[2,247],191:[2,247]},{2:[2,96],19:[2,96],21:[2,96],22:[2,96],25:[2,96],28:[2,96],31:[2,96],34:[2,96],36:[2,96],37:[2,96],39:[2,96],40:[2,96],41:[2,96],42:[2,96],43:[2,96],46:[2,96],47:[2,96],48:[2,96],49:[2,96],50:[2,96],51:[2,96],56:[2,96],57:[2,96],58:[2,96],59:[2,96],60:[2,96],65:[2,96],67:[2,96],73:[2,96],78:[2,96],81:[2,96],82:[2,96],93:[2,96],94:[2,96],105:[2,96],106:[2,96],111:[2,96],112:[2,96],113:[2,96],114:[2,96],115:[2,96],116:[2,96],117:[2,96],118:[2,96],119:[2,96],121:[2,96],122:[2,96],123:[2,96],128:[2,96],129:[2,96],130:[2,96],133:[2,96],134:[2,96],135:[2,96],136:[2,96],137:[2,96],141:[2,96],142:[2,96],143:[2,96],144:[2,96],148:[2,96],152:[2,96],156:[2,96],160:[2,96],164:[2,96],168:[2,96],173:[2,96],174:[2,96],175:[2,96],176:[2,96],177:[2,96],178:[2,96],179:[2,96],180:[2,96],181:[2,96],182:[2,96],183:[2,96],187:[2,96],188:[2,96],189:[2,96],190:[2,96],191:[2,96]},{2:[2,97],19:[2,97],21:[2,97],22:[2,97],25:[2,97],28:[2,97],31:[2,97],34:[2,97],36:[2,97],37:[2,97],39:[2,97],40:[2,97],41:[2,97],42:[2,97],43:[2,97],46:[2,97],47:[2,97],48:[2,97],49:[2,97],50:[2,97],51:[2,97],56:[2,97],57:[2,97],58:[2,97],59:[2,97],60:[2,97],65:[2,97],67:[2,97],73:[2,97],78:[2,97],81:[2,97],82:[2,97],93:[2,97],94:[2,97],105:[2,97],106:[2,97],111:[2,97],112:[2,97],113:[2,97],114:[2,97],115:[2,97],116:[2,97],117:[2,97],118:[2,97],119:[2,97],121:[2,97],122:[2,97],123:[2,97],128:[2,97],129:[2,97],130:[2,97],133:[2,97],134:[2,97],135:[2,97],136:[2,97],137:[2,97],141:[2,97],142:[2,97],143:[2,97],144:[2,97],148:[2,97],152:[2,97],156:[2,97],160:[2,97],164:[2,97],168:[2,97],173:[2,97],174:[2,97],175:[2,97],176:[2,97],177:[2,97],178:[2,97],179:[2,97],180:[2,97],181:[2,97],182:[2,97],183:[2,97],187:[2,97],188:[2,97],189:[2,97],190:[2,97],191:[2,97]},{28:[1,260],37:[1,261]},{2:[2,241],19:[2,241],21:[2,241],22:[2,241],25:[2,241],28:[2,241],34:[2,241],36:[2,241],37:[2,241],39:[2,241],40:[2,241],41:[2,241],42:[2,241],43:[2,241],47:[2,241],48:[2,241],49:[2,241],50:[2,241],51:[2,241],56:[2,241],57:[2,241],58:[2,241],59:[2,241],60:[2,241],65:[2,241],67:[2,241],73:[2,241],78:[2,241],81:[2,241],82:[2,241],94:[2,241],105:[2,241],106:[2,241],111:[2,241],112:[2,241],113:[2,241],114:[2,241],115:[2,241],116:[2,241],117:[2,241],118:[2,241],119:[2,241],122:[2,241],148:[1,262],152:[2,241],156:[2,241],160:[2,241],164:[2,241],168:[2,241],174:[2,241],187:[2,241],188:[2,241],189:[2,241],190:[2,241],191:[2,241]},{2:[2,99],19:[2,99],21:[2,99],22:[2,99],25:[2,99],28:[2,99],31:[2,99],34:[2,99],36:[2,99],37:[2,99],39:[2,99],40:[2,99],41:[2,99],42:[2,99],43:[2,99],46:[2,99],47:[2,99],48:[2,99],49:[2,99],50:[2,99],51:[2,99],56:[2,99],57:[2,99],58:[2,99],59:[2,99],60:[2,99],65:[2,99],67:[2,99],73:[2,99],78:[2,99],81:[2,99],82:[2,99],93:[2,99],94:[2,99],105:[2,99],106:[2,99],111:[2,99],112:[2,99],113:[2,99],114:[2,99],115:[2,99],116:[2,99],117:[2,99],118:[2,99],119:[2,99],121:[2,99],122:[2,99],123:[2,99],128:[2,99],129:[2,99],130:[2,99],133:[2,99],134:[2,99],135:[2,99],136:[2,99],137:[2,99],141:[2,99],142:[2,99],143:[2,99],144:[2,99],148:[2,99],152:[2,99],156:[2,99],160:[2,99],164:[2,99],168:[2,99],173:[2,99],174:[2,99],175:[2,99],176:[2,99],177:[2,99],178:[2,99],179:[2,99],180:[2,99],181:[2,99],182:[2,99],183:[2,99],187:[2,99],188:[2,99],189:[2,99],190:[2,99],191:[2,99]},{21:[1,263],22:[1,294],28:[1,267],36:[1,284],40:[1,280],41:[1,279],42:[1,296],43:[1,282],46:[1,285],47:[1,275],48:[1,272],49:[1,288],50:[1,297],51:[1,289],56:[1,273],58:[1,277],59:[1,291],60:[1,292],63:[1,274],64:[1,281],65:[1,276],67:[1,283],78:[1,290],85:264,86:265,87:266,89:268,90:269,91:270,94:[1,287],101:271,111:[1,278],112:[1,295],113:[1,293],137:[1,286],187:[1,300],188:[1,298],189:[1,299],190:[1,67],191:[1,68],194:[1,301],195:[1,302],196:[1,303],197:[1,304],198:[1,305],199:[1,306],200:[1,307]},{2:[2,235],19:[2,235],21:[2,235],22:[2,235],25:[2,235],28:[2,235],34:[2,235],36:[2,235],37:[2,235],39:[2,235],40:[2,235],41:[2,235],42:[2,235],43:[2,235],47:[2,235],48:[2,235],49:[2,235],50:[2,235],51:[2,235],56:[2,235],57:[2,235],58:[2,235],59:[2,235],60:[2,235],65:[2,235],67:[2,235],73:[2,235],78:[2,235],81:[2,235],82:[2,235],94:[2,235],105:[2,235],106:[2,235],111:[2,235],112:[2,235],113:[2,235],114:[2,235],115:[2,235],116:[2,235],117:[2,235],118:[2,235],119:[2,235],122:[2,235],141:[1,308],142:[1,309],143:[1,310],144:[1,311],148:[2,235],152:[2,235],156:[2,235],160:[2,235],164:[2,235],168:[2,235],174:[2,235],187:[2,235],188:[2,235],189:[2,235],190:[2,235],191:[2,235]},{2:[2,220],19:[2,220],21:[2,220],22:[2,220],25:[2,220],28:[2,220],34:[2,220],36:[2,220],37:[2,220],39:[2,220],40:[2,220],41:[2,220],42:[2,220],43:[2,220],46:[1,317],47:[2,220],48:[2,220],49:[2,220],50:[2,220],51:[2,220],56:[2,220],57:[2,220],58:[2,220],59:[2,220],60:[2,220],65:[2,220],67:[2,220],73:[2,220],78:[2,220],81:[2,220],82:[2,220],94:[2,220],105:[2,220],106:[2,220],111:[2,220],112:[2,220],113:[2,220],114:[2,220],115:[2,220],116:[2,220],117:[2,220],118:[2,220],119:[2,220],122:[2,220],133:[1,312],134:[1,313],135:[1,314],136:[1,315],137:[1,316],141:[2,220],142:[2,220],143:[2,220],144:[2,220],148:[2,220],152:[2,220],156:[2,220],160:[2,220],164:[2,220],168:[2,220],174:[2,220],187:[2,220],188:[2,220],189:[2,220],190:[2,220],191:[2,220]},{2:[2,200],19:[2,200],21:[2,200],22:[2,200],25:[2,200],28:[2,200],34:[2,200],36:[2,200],37:[2,200],39:[2,200],40:[2,200],41:[2,200],42:[2,200],43:[2,200],46:[2,200],47:[2,200],48:[2,200],49:[2,200],50:[2,200],51:[2,200],56:[2,200],57:[2,200],58:[2,200],59:[2,200],60:[2,200],65:[2,200],67:[2,200],73:[2,200],78:[2,200],81:[2,200],82:[2,200],94:[2,200],105:[2,200],106:[2,200],111:[2,200],112:[2,200],113:[2,200],114:[2,200],115:[2,200],116:[2,200],117:[2,200],118:[2,200],119:[2,200],122:[2,200],128:[1,318],129:[1,319],130:[1,320],133:[2,200],134:[2,200],135:[2,200],136:[2,200],137:[2,200],141:[2,200],142:[2,200],143:[2,200],144:[2,200],148:[2,200],152:[2,200],156:[2,200],160:[2,200],164:[2,200],168:[2,200],174:[2,200],187:[2,200],188:[2,200],189:[2,200],190:[2,200],191:[2,200]},{2:[2,192],19:[2,192],21:[2,192],22:[2,192],25:[2,192],28:[2,192],34:[2,192],36:[2,192],37:[2,192],39:[2,192],40:[2,192],41:[2,192],42:[2,192],43:[2,192],46:[2,192],47:[2,192],48:[2,192],49:[2,192],50:[2,192],51:[2,192],56:[2,192],57:[2,192],58:[2,192],59:[2,192],60:[2,192],65:[2,192],67:[2,192],73:[2,192],78:[2,192],81:[2,192],82:[2,192],94:[2,192],105:[2,192],106:[2,192],111:[2,192],112:[2,192],113:[2,192],114:[2,192],115:[2,192],116:[1,321],117:[1,322],118:[2,192],119:[2,192],122:[2,192],128:[2,192],129:[2,192],130:[2,192],133:[2,192],134:[2,192],135:[2,192],136:[2,192],137:[2,192],141:[2,192],142:[2,192],143:[2,192],144:[2,192],148:[2,192],152:[2,192],156:[2,192],160:[2,192],164:[2,192],168:[2,192],174:[2,192],187:[2,192],188:[2,192],189:[2,192],190:[2,192],191:[2,192]},{2:[2,186],19:[2,186],21:[2,186],22:[2,186],25:[2,186],28:[2,186],34:[2,186],36:[2,186],37:[2,186],39:[2,186],40:[2,186],41:[2,186],42:[2,186],43:[2,186],46:[2,186],47:[2,186],48:[2,186],49:[2,186],50:[2,186],51:[2,186],56:[2,186],57:[2,186],58:[2,186],59:[2,186],60:[2,186],65:[2,186],67:[2,186],73:[2,186],78:[2,186],81:[2,186],82:[2,186],94:[2,186],105:[2,186],106:[2,186],111:[2,186],112:[2,186],113:[2,186],114:[2,186],115:[2,186],116:[2,186],117:[2,186],118:[2,186],119:[2,186],121:[1,323],122:[1,324],123:[1,325],128:[2,186],129:[2,186],130:[2,186],133:[2,186],134:[2,186],135:[2,186],136:[2,186],137:[2,186],141:[2,186],142:[2,186],143:[2,186],144:[2,186],148:[2,186],152:[2,186],156:[2,186],160:[2,186],164:[2,186],168:[2,186],174:[2,186],187:[2,186],188:[2,186],189:[2,186],190:[2,186],191:[2,186]},{2:[2,178],19:[2,178],21:[2,178],22:[2,178],25:[2,178],28:[2,178],34:[2,178],36:[2,178],37:[2,178],39:[2,178],40:[2,178],41:[2,178],42:[2,178],43:[2,178],46:[2,178],47:[2,178],48:[2,178],49:[2,178],50:[2,178],51:[2,178],56:[2,178],57:[2,178],58:[2,178],59:[2,178],60:[2,178],
	65:[2,178],67:[2,178],73:[2,178],78:[2,178],81:[2,178],82:[2,178],94:[2,178],105:[2,178],106:[2,178],111:[2,178],112:[2,178],113:[2,178],114:[2,178],115:[2,178],116:[2,178],117:[2,178],118:[2,178],119:[2,178],121:[2,178],122:[2,178],123:[2,178],128:[2,178],129:[2,178],130:[2,178],133:[2,178],134:[2,178],135:[2,178],136:[2,178],137:[2,178],141:[2,178],142:[2,178],143:[2,178],144:[2,178],148:[2,178],152:[2,178],156:[2,178],160:[2,178],164:[2,178],168:[2,178],174:[2,178],187:[2,178],188:[2,178],189:[2,178],190:[2,178],191:[2,178]},{2:[2,163],19:[2,163],21:[2,163],22:[2,163],25:[2,163],28:[2,163],34:[2,163],36:[2,163],37:[2,163],39:[2,163],40:[2,163],41:[2,163],42:[2,163],43:[2,163],46:[2,163],47:[2,163],48:[2,163],49:[2,163],50:[2,163],51:[2,163],56:[2,163],57:[2,163],58:[2,163],59:[2,163],60:[2,163],65:[2,163],67:[2,163],73:[2,163],78:[2,163],81:[2,163],82:[2,163],94:[2,163],105:[2,163],106:[2,163],111:[2,163],112:[2,163],113:[2,163],114:[2,163],115:[2,163],116:[2,163],117:[2,163],118:[2,163],119:[2,163],121:[2,163],122:[2,163],123:[2,163],128:[2,163],129:[2,163],130:[2,163],133:[2,163],134:[2,163],135:[2,163],136:[2,163],137:[2,163],141:[2,163],142:[2,163],143:[2,163],144:[2,163],148:[2,163],152:[2,163],156:[2,163],160:[2,163],164:[2,163],168:[2,163],174:[2,163],187:[2,163],188:[2,163],189:[2,163],190:[2,163],191:[2,163]},{2:[2,164],19:[2,164],21:[2,164],22:[2,164],25:[2,164],28:[2,164],34:[2,164],36:[2,164],37:[2,164],39:[2,164],40:[2,164],41:[2,164],42:[2,164],43:[2,164],46:[2,164],47:[2,164],48:[2,164],49:[2,164],50:[2,164],51:[2,164],56:[2,164],57:[2,164],58:[2,164],59:[2,164],60:[2,164],65:[2,164],67:[2,164],73:[2,164],78:[2,164],81:[2,164],82:[2,164],94:[2,164],105:[2,164],106:[2,164],111:[2,164],112:[2,164],113:[2,164],114:[2,164],115:[2,164],116:[2,164],117:[2,164],118:[2,164],119:[2,164],121:[2,164],122:[2,164],123:[2,164],128:[2,164],129:[2,164],130:[2,164],133:[2,164],134:[2,164],135:[2,164],136:[2,164],137:[2,164],141:[2,164],142:[2,164],143:[2,164],144:[2,164],148:[2,164],152:[2,164],156:[2,164],160:[2,164],164:[2,164],168:[2,164],174:[2,164],187:[2,164],188:[2,164],189:[2,164],190:[2,164],191:[2,164]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:326,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{3:327,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],32:111,37:[1,55],38:328,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[1,330],25:[1,242],34:[1,329]},{61:331,62:332,63:[1,333],64:[1,334]},{19:[2,80],21:[2,80],22:[2,80],28:[2,80],34:[2,80],36:[2,80],37:[2,80],40:[2,80],41:[2,80],42:[2,80],43:[2,80],47:[2,80],48:[2,80],49:[2,80],50:[2,80],51:[2,80],56:[2,80],58:[2,80],59:[2,80],60:[2,80],65:[2,80],67:[2,80],73:[2,80],78:[2,80],81:[2,80],94:[2,80],105:[2,80],106:[2,80],111:[2,80],112:[2,80],113:[2,80],114:[2,80],115:[2,80],116:[2,80],117:[2,80],118:[2,80],119:[2,80],122:[2,80],174:[2,80],187:[2,80],188:[2,80],189:[2,80],190:[2,80],191:[2,80]},{19:[2,81],21:[2,81],22:[2,81],28:[2,81],34:[2,81],36:[2,81],37:[2,81],40:[2,81],41:[2,81],42:[2,81],43:[2,81],47:[2,81],48:[2,81],49:[2,81],50:[2,81],51:[2,81],56:[2,81],58:[2,81],59:[2,81],60:[2,81],65:[2,81],67:[2,81],73:[2,81],78:[2,81],81:[2,81],94:[2,81],105:[2,81],106:[2,81],111:[2,81],112:[2,81],113:[2,81],114:[2,81],115:[2,81],116:[2,81],117:[2,81],118:[2,81],119:[2,81],122:[2,81],174:[2,81],187:[2,81],188:[2,81],189:[2,81],190:[2,81],191:[2,81]},{19:[1,129],28:[1,128],32:335,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],32:336,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,161],25:[2,161],34:[2,161],46:[2,161],116:[2,161],117:[2,161],121:[2,161],122:[2,161],123:[2,161],128:[2,161],129:[2,161],130:[2,161],133:[2,161],134:[2,161],135:[2,161],136:[2,161],137:[2,161],141:[2,161],142:[2,161],143:[2,161],144:[2,161],148:[2,161],152:[2,161],156:[2,161],160:[2,161],164:[2,161],168:[2,161]},{2:[2,162],25:[2,162],34:[2,162],46:[2,162],116:[2,162],117:[2,162],121:[2,162],122:[2,162],123:[2,162],128:[2,162],129:[2,162],130:[2,162],133:[2,162],134:[2,162],135:[2,162],136:[2,162],137:[2,162],141:[2,162],142:[2,162],143:[2,162],144:[2,162],148:[2,162],152:[2,162],156:[2,162],160:[2,162],164:[2,162],168:[2,162]},{19:[2,280],28:[2,280],37:[2,280],67:[2,280],78:[2,280],81:[2,280],94:[2,280],105:[2,280],106:[2,280],111:[2,280],112:[2,280],113:[2,280],114:[2,280],115:[2,280],116:[2,280],117:[2,280],118:[2,280],119:[2,280],122:[2,280],174:[2,280],187:[2,280],188:[2,280],189:[2,280],190:[2,280],191:[2,280]},{19:[2,281],28:[2,281],37:[2,281],67:[2,281],78:[2,281],81:[2,281],94:[2,281],105:[2,281],106:[2,281],111:[2,281],112:[2,281],113:[2,281],114:[2,281],115:[2,281],116:[2,281],117:[2,281],118:[2,281],119:[2,281],122:[2,281],174:[2,281],187:[2,281],188:[2,281],189:[2,281],190:[2,281],191:[2,281]},{19:[2,282],28:[2,282],37:[2,282],67:[2,282],78:[2,282],81:[2,282],94:[2,282],105:[2,282],106:[2,282],111:[2,282],112:[2,282],113:[2,282],114:[2,282],115:[2,282],116:[2,282],117:[2,282],118:[2,282],119:[2,282],122:[2,282],174:[2,282],187:[2,282],188:[2,282],189:[2,282],190:[2,282],191:[2,282]},{19:[2,283],28:[2,283],37:[2,283],67:[2,283],78:[2,283],81:[2,283],94:[2,283],105:[2,283],106:[2,283],111:[2,283],112:[2,283],113:[2,283],114:[2,283],115:[2,283],116:[2,283],117:[2,283],118:[2,283],119:[2,283],122:[2,283],174:[2,283],187:[2,283],188:[2,283],189:[2,283],190:[2,283],191:[2,283]},{19:[2,284],28:[2,284],37:[2,284],67:[2,284],78:[2,284],81:[2,284],94:[2,284],105:[2,284],106:[2,284],111:[2,284],112:[2,284],113:[2,284],114:[2,284],115:[2,284],116:[2,284],117:[2,284],118:[2,284],119:[2,284],122:[2,284],174:[2,284],187:[2,284],188:[2,284],189:[2,284],190:[2,284],191:[2,284]},{19:[2,285],28:[2,285],37:[2,285],67:[2,285],78:[2,285],81:[2,285],94:[2,285],105:[2,285],106:[2,285],111:[2,285],112:[2,285],113:[2,285],114:[2,285],115:[2,285],116:[2,285],117:[2,285],118:[2,285],119:[2,285],122:[2,285],174:[2,285],187:[2,285],188:[2,285],189:[2,285],190:[2,285],191:[2,285]},{19:[2,286],28:[2,286],37:[2,286],67:[2,286],78:[2,286],81:[2,286],94:[2,286],105:[2,286],106:[2,286],111:[2,286],112:[2,286],113:[2,286],114:[2,286],115:[2,286],116:[2,286],117:[2,286],118:[2,286],119:[2,286],122:[2,286],174:[2,286],187:[2,286],188:[2,286],189:[2,286],190:[2,286],191:[2,286]},{19:[2,287],28:[2,287],37:[2,287],67:[2,287],78:[2,287],81:[2,287],94:[2,287],105:[2,287],106:[2,287],111:[2,287],112:[2,287],113:[2,287],114:[2,287],115:[2,287],116:[2,287],117:[2,287],118:[2,287],119:[2,287],122:[2,287],174:[2,287],187:[2,287],188:[2,287],189:[2,287],190:[2,287],191:[2,287]},{19:[2,288],28:[2,288],37:[2,288],67:[2,288],78:[2,288],81:[2,288],94:[2,288],105:[2,288],106:[2,288],111:[2,288],112:[2,288],113:[2,288],114:[2,288],115:[2,288],116:[2,288],117:[2,288],118:[2,288],119:[2,288],122:[2,288],174:[2,288],187:[2,288],188:[2,288],189:[2,288],190:[2,288],191:[2,288]},{19:[2,289],28:[2,289],37:[2,289],67:[2,289],78:[2,289],81:[2,289],94:[2,289],105:[2,289],106:[2,289],111:[2,289],112:[2,289],113:[2,289],114:[2,289],115:[2,289],116:[2,289],117:[2,289],118:[2,289],119:[2,289],122:[2,289],174:[2,289],187:[2,289],188:[2,289],189:[2,289],190:[2,289],191:[2,289]},{19:[2,290],28:[2,290],37:[2,290],67:[2,290],78:[2,290],81:[2,290],94:[2,290],105:[2,290],106:[2,290],111:[2,290],112:[2,290],113:[2,290],114:[2,290],115:[2,290],116:[2,290],117:[2,290],118:[2,290],119:[2,290],122:[2,290],174:[2,290],187:[2,290],188:[2,290],189:[2,290],190:[2,290],191:[2,290]},{19:[1,129],28:[1,128],32:337,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:338,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,144],25:[2,144],31:[2,144],34:[2,144],37:[2,144],46:[2,144],81:[2,144],93:[2,144],105:[2,144],106:[2,144],116:[2,144],117:[2,144],121:[2,144],122:[2,144],123:[2,144],128:[2,144],129:[2,144],130:[2,144],133:[2,144],134:[2,144],135:[2,144],136:[2,144],137:[2,144],141:[2,144],142:[2,144],143:[2,144],144:[2,144],148:[2,144],152:[2,144],156:[2,144],160:[2,144],164:[2,144],168:[2,144],173:[2,144],174:[2,144],175:[2,144],176:[2,144],177:[2,144],178:[2,144],179:[2,144],180:[2,144],181:[2,144],182:[2,144],183:[2,144]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:339,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{22:[1,294],28:[1,341],36:[1,284],40:[1,280],41:[1,279],42:[1,296],43:[1,282],46:[1,285],47:[1,275],48:[1,272],49:[1,288],50:[1,297],51:[1,289],56:[1,273],58:[1,277],59:[1,291],60:[1,292],63:[1,274],64:[1,281],65:[1,276],67:[1,283],78:[1,290],89:340,94:[1,287],101:271,111:[1,278],112:[1,295],113:[1,293],137:[1,286],187:[1,300],188:[1,298],189:[1,299],194:[1,301],195:[1,302],196:[1,303],197:[1,304],198:[1,305],199:[1,306],200:[1,307]},{19:[1,129],28:[1,128],32:344,37:[1,55],39:[1,342],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,102:343,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:345,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,143],25:[2,143],31:[2,143],34:[2,143],37:[2,143],46:[2,143],81:[2,143],93:[2,143],105:[2,143],106:[2,143],116:[2,143],117:[2,143],121:[2,143],122:[2,143],123:[2,143],128:[2,143],129:[2,143],130:[2,143],133:[2,143],134:[2,143],135:[2,143],136:[2,143],137:[2,143],141:[2,143],142:[2,143],143:[2,143],144:[2,143],148:[2,143],152:[2,143],156:[2,143],160:[2,143],164:[2,143],168:[2,143],173:[2,143],174:[2,143],175:[2,143],176:[2,143],177:[2,143],178:[2,143],179:[2,143],180:[2,143],181:[2,143],182:[2,143],183:[2,143]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:346,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{22:[1,294],28:[1,341],36:[1,284],40:[1,280],41:[1,279],42:[1,296],43:[1,282],46:[1,285],47:[1,275],48:[1,272],49:[1,288],50:[1,297],51:[1,289],56:[1,273],58:[1,277],59:[1,291],60:[1,292],63:[1,274],64:[1,281],65:[1,276],67:[1,283],78:[1,290],89:347,94:[1,287],101:271,111:[1,278],112:[1,295],113:[1,293],137:[1,286],187:[1,300],188:[1,298],189:[1,299],194:[1,301],195:[1,302],196:[1,303],197:[1,304],198:[1,305],199:[1,306],200:[1,307]},{2:[2,138],25:[2,138],31:[2,138],34:[2,138],46:[2,138],105:[2,138],106:[2,138],116:[2,138],117:[2,138],121:[2,138],122:[2,138],123:[2,138],128:[2,138],129:[2,138],130:[2,138],133:[2,138],134:[2,138],135:[2,138],136:[2,138],137:[2,138],141:[2,138],142:[2,138],143:[2,138],144:[2,138],148:[2,138],152:[2,138],156:[2,138],160:[2,138],164:[2,138],168:[2,138],173:[2,138],174:[2,138],175:[2,138],176:[2,138],177:[2,138],178:[2,138],179:[2,138],180:[2,138],181:[2,138],182:[2,138],183:[2,138]},{2:[2,135],25:[2,135],31:[2,135],34:[2,135],37:[1,165],46:[2,135],81:[1,254],93:[1,255],95:348,105:[2,135],106:[2,135],116:[2,135],117:[2,135],121:[2,135],122:[2,135],123:[2,135],128:[2,135],129:[2,135],130:[2,135],133:[2,135],134:[2,135],135:[2,135],136:[2,135],137:[2,135],141:[2,135],142:[2,135],143:[2,135],144:[2,135],148:[2,135],152:[2,135],156:[2,135],160:[2,135],164:[2,135],168:[2,135],173:[2,135],174:[2,135],175:[2,135],176:[2,135],177:[2,135],178:[2,135],179:[2,135],180:[2,135],181:[2,135],182:[2,135],183:[2,135]},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:349,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:350,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{25:[1,242],39:[1,351]},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:352,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,103],19:[2,103],21:[2,103],22:[2,103],25:[2,103],28:[2,103],31:[2,103],34:[2,103],36:[2,103],37:[2,103],39:[2,103],40:[2,103],41:[2,103],42:[2,103],43:[2,103],46:[2,103],47:[2,103],48:[2,103],49:[2,103],50:[2,103],51:[2,103],56:[2,103],57:[2,103],58:[2,103],59:[2,103],60:[2,103],65:[2,103],67:[2,103],73:[2,103],78:[2,103],81:[2,103],82:[2,103],93:[2,103],94:[2,103],105:[2,103],106:[2,103],111:[2,103],112:[2,103],113:[2,103],114:[2,103],115:[2,103],116:[2,103],117:[2,103],118:[2,103],119:[2,103],121:[2,103],122:[2,103],123:[2,103],128:[2,103],129:[2,103],130:[2,103],133:[2,103],134:[2,103],135:[2,103],136:[2,103],137:[2,103],141:[2,103],142:[2,103],143:[2,103],144:[2,103],148:[2,103],152:[2,103],156:[2,103],160:[2,103],164:[2,103],168:[2,103],173:[2,103],174:[2,103],175:[2,103],176:[2,103],177:[2,103],178:[2,103],179:[2,103],180:[2,103],181:[2,103],182:[2,103],183:[2,103],187:[2,103],188:[2,103],189:[2,103],190:[2,103],191:[2,103]},{19:[1,129],25:[1,354],28:[1,128],32:355,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],82:[1,353],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{25:[1,357],82:[1,356]},{19:[2,112],25:[2,112],28:[2,112],37:[2,112],67:[2,112],78:[2,112],81:[2,112],82:[2,112],94:[2,112],105:[2,112],106:[2,112],111:[2,112],112:[2,112],113:[2,112],114:[2,112],115:[2,112],116:[2,112],117:[2,112],118:[2,112],119:[2,112],122:[2,112],174:[2,112],187:[2,112],188:[2,112],189:[2,112],190:[2,112],191:[2,112]},{25:[2,108],82:[2,108]},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:358,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:359,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:360,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:361,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,307],19:[2,307],21:[2,307],22:[2,307],25:[2,307],28:[2,307],31:[2,307],34:[2,307],36:[2,307],37:[2,307],39:[2,307],40:[2,307],41:[2,307],42:[2,307],43:[2,307],46:[2,307],47:[2,307],48:[2,307],49:[2,307],50:[2,307],51:[2,307],56:[2,307],57:[2,307],58:[2,307],59:[2,307],60:[2,307],65:[2,307],67:[2,307],73:[2,307],78:[2,307],81:[2,307],82:[2,307],93:[2,307],94:[2,307],105:[2,307],106:[2,307],111:[2,307],112:[2,307],113:[2,307],114:[2,307],115:[2,307],116:[2,307],117:[2,307],118:[2,307],119:[2,307],121:[2,307],122:[2,307],123:[2,307],128:[2,307],129:[2,307],130:[2,307],133:[2,307],134:[2,307],135:[2,307],136:[2,307],137:[2,307],141:[2,307],142:[2,307],143:[2,307],144:[2,307],148:[2,307],152:[2,307],156:[2,307],160:[2,307],164:[2,307],168:[2,307],173:[2,307],174:[2,307],175:[2,307],176:[2,307],177:[2,307],178:[2,307],179:[2,307],180:[2,307],181:[2,307],182:[2,307],183:[2,307],187:[2,307],188:[2,307],189:[2,307],190:[2,307],191:[2,307]},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:362,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:363,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:364,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:365,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:366,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:367,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:368,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:369,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:370,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:371,122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:372,122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:373,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:374,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:375,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,167],19:[2,167],21:[2,167],22:[2,167],25:[2,167],28:[2,167],34:[2,167],36:[2,167],37:[2,167],39:[2,167],40:[2,167],41:[2,167],42:[2,167],43:[2,167],46:[2,167],47:[2,167],48:[2,167],49:[2,167],50:[2,167],51:[2,167],56:[2,167],57:[2,167],58:[2,167],59:[2,167],60:[2,167],65:[2,167],67:[2,167],73:[2,167],78:[2,167],81:[2,167],82:[2,167],94:[2,167],105:[2,167],106:[2,167],111:[2,167],112:[2,167],113:[2,167],114:[2,167],115:[2,167],116:[2,167],117:[2,167],118:[2,167],119:[2,167],121:[2,167],122:[2,167],123:[2,167],128:[2,167],129:[2,167],130:[2,167],133:[2,167],134:[2,167],135:[2,167],136:[2,167],137:[2,167],141:[2,167],142:[2,167],143:[2,167],144:[2,167],148:[2,167],152:[2,167],156:[2,167],160:[2,167],164:[2,167],168:[2,167],174:[2,167],187:[2,167],188:[2,167],189:[2,167],190:[2,167],191:[2,167]},{2:[2,157],19:[2,157],21:[2,157],22:[2,157],25:[2,157],28:[2,157],34:[2,157],36:[2,157],37:[2,157],39:[2,157],40:[2,157],41:[2,157],42:[2,157],43:[2,157],46:[2,157],47:[2,157],48:[2,157],49:[2,157],50:[2,157],51:[2,157],56:[2,157],57:[2,157],58:[2,157],59:[2,157],60:[2,157],65:[2,157],67:[2,157],73:[2,157],78:[2,157],81:[2,157],82:[2,157],94:[2,157],105:[1,245],106:[1,246],111:[2,157],112:[2,157],113:[2,157],114:[2,157],115:[2,157],116:[2,157],117:[2,157],118:[2,157],119:[2,157],121:[2,157],122:[2,157],123:[2,157],128:[2,157],129:[2,157],130:[2,157],133:[2,157],134:[2,157],135:[2,157],136:[2,157],137:[2,157],141:[2,157],142:[2,157],143:[2,157],144:[2,157],148:[2,157],152:[2,157],156:[2,157],160:[2,157],164:[2,157],168:[2,157],174:[2,157],187:[2,157],188:[2,157],189:[2,157],190:[2,157],191:[2,157]},{2:[2,168],19:[2,168],21:[2,168],22:[2,168],25:[2,168],28:[2,168],34:[2,168],36:[2,168],37:[2,168],39:[2,168],40:[2,168],41:[2,168],42:[2,168],43:[2,168],46:[2,168],47:[2,168],48:[2,168],49:[2,168],50:[2,168],51:[2,168],56:[2,168],57:[2,168],58:[2,168],59:[2,168],60:[2,168],65:[2,168],67:[2,168],73:[2,168],78:[2,168],81:[2,168],82:[2,168],94:[2,168],105:[2,168],106:[2,168],111:[2,168],112:[2,168],113:[2,168],114:[2,168],115:[2,168],116:[2,168],117:[2,168],118:[2,168],119:[2,168],121:[2,168],122:[2,168],123:[2,168],128:[2,168],129:[2,168],130:[2,168],133:[2,168],134:[2,168],135:[2,168],136:[2,168],137:[2,168],141:[2,168],142:[2,168],143:[2,168],144:[2,168],148:[2,168],152:[2,168],156:[2,168],160:[2,168],164:[2,168],168:[2,168],174:[2,168],187:[2,168],188:[2,168],189:[2,168],190:[2,168],191:[2,168]},{2:[2,169],19:[2,169],21:[2,169],22:[2,169],25:[2,169],28:[2,169],34:[2,169],36:[2,169],37:[2,169],39:[2,169],40:[2,169],41:[2,169],42:[2,169],43:[2,169],46:[2,169],47:[2,169],48:[2,169],49:[2,169],50:[2,169],51:[2,169],56:[2,169],57:[2,169],58:[2,169],59:[2,169],60:[2,169],65:[2,169],67:[2,169],73:[2,169],78:[2,169],81:[2,169],82:[2,169],94:[2,169],105:[2,169],106:[2,169],111:[2,169],112:[2,169],113:[2,169],114:[2,169],115:[2,169],116:[2,169],117:[2,169],118:[2,169],119:[2,169],121:[2,169],122:[2,169],123:[2,169],128:[2,169],129:[2,169],130:[2,169],133:[2,169],134:[2,169],135:[2,169],136:[2,169],137:[2,169],141:[2,169],142:[2,169],143:[2,169],144:[2,169],148:[2,169],152:[2,169],156:[2,169],160:[2,169],164:[2,169],168:[2,169],174:[2,169],187:[2,169],188:[2,169],189:[2,169],190:[2,169],191:[2,169]},{2:[2,170],19:[2,170],21:[2,170],22:[2,170],25:[2,170],28:[2,170],34:[2,170],36:[2,170],37:[2,170],39:[2,170],40:[2,170],41:[2,170],42:[2,170],43:[2,170],46:[2,170],47:[2,170],48:[2,170],49:[2,170],50:[2,170],51:[2,170],56:[2,170],57:[2,170],58:[2,170],59:[2,170],60:[2,170],65:[2,170],67:[2,170],73:[2,170],78:[2,170],81:[2,170],82:[2,170],94:[2,170],105:[2,170],106:[2,170],111:[2,170],112:[2,170],113:[2,170],114:[2,170],115:[2,170],116:[2,170],117:[2,170],118:[2,170],119:[2,170],121:[2,170],122:[2,170],123:[2,170],128:[2,170],129:[2,170],130:[2,170],133:[2,170],134:[2,170],135:[2,170],136:[2,170],137:[2,170],141:[2,170],142:[2,170],143:[2,170],144:[2,170],148:[2,170],152:[2,170],156:[2,170],160:[2,170],164:[2,170],168:[2,170],174:[2,170],187:[2,170],188:[2,170],189:[2,170],190:[2,170],191:[2,170]},{2:[2,171],19:[2,171],21:[2,171],22:[2,171],25:[2,171],28:[2,171],34:[2,171],36:[2,171],37:[2,171],39:[2,171],40:[2,171],41:[2,171],42:[2,171],43:[2,171],46:[2,171],47:[2,171],48:[2,171],49:[2,171],50:[2,171],51:[2,171],56:[2,171],57:[2,171],58:[2,171],59:[2,171],60:[2,171],65:[2,171],67:[2,171],73:[2,171],78:[2,171],81:[2,171],82:[2,171],94:[2,171],105:[2,171],106:[2,171],111:[2,171],112:[2,171],113:[2,171],114:[2,171],115:[2,171],116:[2,171],117:[2,171],118:[2,171],119:[2,171],121:[2,171],
	122:[2,171],123:[2,171],128:[2,171],129:[2,171],130:[2,171],133:[2,171],134:[2,171],135:[2,171],136:[2,171],137:[2,171],141:[2,171],142:[2,171],143:[2,171],144:[2,171],148:[2,171],152:[2,171],156:[2,171],160:[2,171],164:[2,171],168:[2,171],174:[2,171],187:[2,171],188:[2,171],189:[2,171],190:[2,171],191:[2,171]},{2:[2,172],19:[2,172],21:[2,172],22:[2,172],25:[2,172],28:[2,172],34:[2,172],36:[2,172],37:[2,172],39:[2,172],40:[2,172],41:[2,172],42:[2,172],43:[2,172],46:[2,172],47:[2,172],48:[2,172],49:[2,172],50:[2,172],51:[2,172],56:[2,172],57:[2,172],58:[2,172],59:[2,172],60:[2,172],65:[2,172],67:[2,172],73:[2,172],78:[2,172],81:[2,172],82:[2,172],94:[2,172],105:[2,172],106:[2,172],111:[2,172],112:[2,172],113:[2,172],114:[2,172],115:[2,172],116:[2,172],117:[2,172],118:[2,172],119:[2,172],121:[2,172],122:[2,172],123:[2,172],128:[2,172],129:[2,172],130:[2,172],133:[2,172],134:[2,172],135:[2,172],136:[2,172],137:[2,172],141:[2,172],142:[2,172],143:[2,172],144:[2,172],148:[2,172],152:[2,172],156:[2,172],160:[2,172],164:[2,172],168:[2,172],174:[2,172],187:[2,172],188:[2,172],189:[2,172],190:[2,172],191:[2,172]},{2:[2,173],19:[2,173],21:[2,173],22:[2,173],25:[2,173],28:[2,173],34:[2,173],36:[2,173],37:[2,173],39:[2,173],40:[2,173],41:[2,173],42:[2,173],43:[2,173],46:[2,173],47:[2,173],48:[2,173],49:[2,173],50:[2,173],51:[2,173],56:[2,173],57:[2,173],58:[2,173],59:[2,173],60:[2,173],65:[2,173],67:[2,173],73:[2,173],78:[2,173],81:[2,173],82:[2,173],94:[2,173],105:[2,173],106:[2,173],111:[2,173],112:[2,173],113:[2,173],114:[2,173],115:[2,173],116:[2,173],117:[2,173],118:[2,173],119:[2,173],121:[2,173],122:[2,173],123:[2,173],128:[2,173],129:[2,173],130:[2,173],133:[2,173],134:[2,173],135:[2,173],136:[2,173],137:[2,173],141:[2,173],142:[2,173],143:[2,173],144:[2,173],148:[2,173],152:[2,173],156:[2,173],160:[2,173],164:[2,173],168:[2,173],174:[2,173],187:[2,173],188:[2,173],189:[2,173],190:[2,173],191:[2,173]},{2:[2,174],19:[2,174],21:[2,174],22:[2,174],25:[2,174],28:[2,174],34:[2,174],36:[2,174],37:[2,174],39:[2,174],40:[2,174],41:[2,174],42:[2,174],43:[2,174],46:[2,174],47:[2,174],48:[2,174],49:[2,174],50:[2,174],51:[2,174],56:[2,174],57:[2,174],58:[2,174],59:[2,174],60:[2,174],65:[2,174],67:[2,174],73:[2,174],78:[2,174],81:[2,174],82:[2,174],94:[2,174],105:[2,174],106:[2,174],111:[2,174],112:[2,174],113:[2,174],114:[2,174],115:[2,174],116:[2,174],117:[2,174],118:[2,174],119:[2,174],121:[2,174],122:[2,174],123:[2,174],128:[2,174],129:[2,174],130:[2,174],133:[2,174],134:[2,174],135:[2,174],136:[2,174],137:[2,174],141:[2,174],142:[2,174],143:[2,174],144:[2,174],148:[2,174],152:[2,174],156:[2,174],160:[2,174],164:[2,174],168:[2,174],174:[2,174],187:[2,174],188:[2,174],189:[2,174],190:[2,174],191:[2,174]},{2:[2,175],19:[2,175],21:[2,175],22:[2,175],25:[2,175],28:[2,175],34:[2,175],36:[2,175],37:[2,175],39:[2,175],40:[2,175],41:[2,175],42:[2,175],43:[2,175],46:[2,175],47:[2,175],48:[2,175],49:[2,175],50:[2,175],51:[2,175],56:[2,175],57:[2,175],58:[2,175],59:[2,175],60:[2,175],65:[2,175],67:[2,175],73:[2,175],78:[2,175],81:[2,175],82:[2,175],94:[2,175],105:[2,175],106:[2,175],111:[2,175],112:[2,175],113:[2,175],114:[2,175],115:[2,175],116:[2,175],117:[2,175],118:[2,175],119:[2,175],121:[2,175],122:[2,175],123:[2,175],128:[2,175],129:[2,175],130:[2,175],133:[2,175],134:[2,175],135:[2,175],136:[2,175],137:[2,175],141:[2,175],142:[2,175],143:[2,175],144:[2,175],148:[2,175],152:[2,175],156:[2,175],160:[2,175],164:[2,175],168:[2,175],174:[2,175],187:[2,175],188:[2,175],189:[2,175],190:[2,175],191:[2,175]},{2:[2,176],19:[2,176],21:[2,176],22:[2,176],25:[2,176],28:[2,176],34:[2,176],36:[2,176],37:[2,176],39:[2,176],40:[2,176],41:[2,176],42:[2,176],43:[2,176],46:[2,176],47:[2,176],48:[2,176],49:[2,176],50:[2,176],51:[2,176],56:[2,176],57:[2,176],58:[2,176],59:[2,176],60:[2,176],65:[2,176],67:[2,176],73:[2,176],78:[2,176],81:[2,176],82:[2,176],94:[2,176],105:[2,176],106:[2,176],111:[2,176],112:[2,176],113:[2,176],114:[2,176],115:[2,176],116:[2,176],117:[2,176],118:[2,176],119:[2,176],121:[2,176],122:[2,176],123:[2,176],128:[2,176],129:[2,176],130:[2,176],133:[2,176],134:[2,176],135:[2,176],136:[2,176],137:[2,176],141:[2,176],142:[2,176],143:[2,176],144:[2,176],148:[2,176],152:[2,176],156:[2,176],160:[2,176],164:[2,176],168:[2,176],174:[2,176],187:[2,176],188:[2,176],189:[2,176],190:[2,176],191:[2,176]},{2:[2,177],19:[2,177],21:[2,177],22:[2,177],25:[2,177],28:[2,177],34:[2,177],36:[2,177],37:[2,177],39:[2,177],40:[2,177],41:[2,177],42:[2,177],43:[2,177],46:[2,177],47:[2,177],48:[2,177],49:[2,177],50:[2,177],51:[2,177],56:[2,177],57:[2,177],58:[2,177],59:[2,177],60:[2,177],65:[2,177],67:[2,177],73:[2,177],78:[2,177],81:[2,177],82:[2,177],94:[2,177],105:[2,177],106:[2,177],111:[2,177],112:[2,177],113:[2,177],114:[2,177],115:[2,177],116:[2,177],117:[2,177],118:[2,177],119:[2,177],121:[2,177],122:[2,177],123:[2,177],128:[2,177],129:[2,177],130:[2,177],133:[2,177],134:[2,177],135:[2,177],136:[2,177],137:[2,177],141:[2,177],142:[2,177],143:[2,177],144:[2,177],148:[2,177],152:[2,177],156:[2,177],160:[2,177],164:[2,177],168:[2,177],174:[2,177],187:[2,177],188:[2,177],189:[2,177],190:[2,177],191:[2,177]},{28:[1,378],39:[1,376],69:377},{19:[2,16],21:[2,16],22:[2,16],28:[2,16],34:[2,16],36:[2,16],37:[2,16],40:[2,16],41:[2,16],42:[2,16],43:[2,16],47:[2,16],48:[2,16],49:[2,16],50:[2,16],51:[2,16],56:[2,16],58:[2,16],59:[2,16],60:[2,16],63:[2,16],64:[2,16],65:[2,16],67:[2,16],73:[2,16],78:[2,16],81:[2,16],94:[2,16],105:[2,16],106:[2,16],111:[2,16],112:[2,16],113:[2,16],114:[2,16],115:[2,16],116:[2,16],117:[2,16],118:[2,16],119:[2,16],122:[2,16],174:[2,16],187:[2,16],188:[2,16],189:[2,16],190:[2,16],191:[2,16]},{19:[2,17],21:[2,17],22:[2,17],28:[2,17],34:[2,17],36:[2,17],37:[2,17],41:[2,17],42:[2,17],43:[2,17],47:[2,17],48:[2,17],49:[2,17],50:[2,17],51:[2,17],56:[2,17],58:[2,17],59:[2,17],60:[2,17],65:[2,17],78:[2,17],81:[2,17],94:[2,17],105:[2,17],106:[2,17],111:[2,17],112:[2,17],113:[2,17],114:[2,17],115:[2,17],116:[2,17],117:[2,17],118:[2,17],119:[2,17],122:[2,17],174:[2,17],187:[2,17],188:[2,17],189:[2,17],190:[2,17],191:[2,17]},{24:379,28:[1,94]},{19:[2,25],21:[2,25],22:[2,25],25:[2,25],28:[2,25],34:[2,25],36:[2,25],37:[2,25],40:[2,25],41:[2,25],42:[2,25],43:[2,25],47:[2,25],48:[2,25],49:[2,25],50:[2,25],51:[2,25],56:[2,25],58:[2,25],59:[2,25],60:[2,25],65:[2,25],67:[2,25],73:[2,25],78:[2,25],81:[2,25],94:[2,25],105:[2,25],106:[2,25],111:[2,25],112:[2,25],113:[2,25],114:[2,25],115:[2,25],116:[2,25],117:[2,25],118:[2,25],119:[2,25],122:[2,25],174:[2,25],187:[2,25],188:[2,25],189:[2,25],190:[2,25],191:[2,25]},{19:[1,129],28:[1,128],32:380,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,296],25:[2,296],34:[2,296]},{25:[1,242],39:[1,381]},{37:[1,382]},{25:[1,242],39:[1,383]},{25:[1,385],34:[1,384]},{19:[1,129],28:[1,128],32:111,34:[1,387],37:[1,55],38:386,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{26:388,27:389,28:[1,390]},{25:[2,157],31:[1,392],34:[2,157],46:[1,391],105:[1,245],106:[1,246],116:[2,157],117:[2,157],121:[2,157],122:[2,157],123:[2,157],128:[2,157],129:[2,157],130:[2,157],133:[2,157],134:[2,157],135:[2,157],136:[2,157],137:[2,157],141:[2,157],142:[2,157],143:[2,157],144:[2,157],148:[2,157],152:[2,157],156:[2,157],160:[2,157],164:[2,157],168:[2,157],171:393,173:[1,149],174:[1,150],175:[1,151],176:[1,152],177:[1,153],178:[1,154],179:[1,155],180:[1,156],181:[1,157],182:[1,158],183:[1,159]},{25:[2,293],34:[2,293]},{25:[2,274],34:[2,274],46:[2,274]},{25:[2,267],34:[2,267],46:[2,267],164:[1,395],168:[1,394]},{25:[2,261],34:[2,261],46:[2,261],160:[1,396],164:[2,261],168:[2,261]},{25:[2,255],34:[2,255],46:[2,255],156:[1,397],160:[2,255],164:[2,255],168:[2,255]},{25:[2,249],34:[2,249],46:[2,249],152:[1,398],156:[2,249],160:[2,249],164:[2,249],168:[2,249]},{25:[2,243],34:[2,243],46:[2,243],148:[1,399],152:[2,243],156:[2,243],160:[2,243],164:[2,243],168:[2,243]},{25:[2,237],34:[2,237],46:[2,237],141:[1,400],142:[1,401],143:[1,402],144:[1,403],148:[2,237],152:[2,237],156:[2,237],160:[2,237],164:[2,237],168:[2,237]},{25:[2,225],34:[2,225],46:[2,225],133:[1,404],134:[1,405],135:[1,406],136:[1,407],137:[1,408],141:[2,225],142:[2,225],143:[2,225],144:[2,225],148:[2,225],152:[2,225],156:[2,225],160:[2,225],164:[2,225],168:[2,225]},{25:[2,207],34:[2,207],46:[2,207],128:[1,318],129:[1,319],130:[1,320],133:[2,207],134:[2,207],135:[2,207],136:[2,207],137:[2,207],141:[2,207],142:[2,207],143:[2,207],144:[2,207],148:[2,207],152:[2,207],156:[2,207],160:[2,207],164:[2,207],168:[2,207]},{19:[2,54],21:[2,54],22:[2,54],28:[2,54],34:[2,54],36:[2,54],37:[2,54],40:[2,54],41:[2,54],42:[2,54],43:[2,54],47:[2,54],48:[2,54],49:[2,54],50:[2,54],51:[2,54],56:[2,54],58:[2,54],59:[2,54],60:[2,54],65:[2,54],67:[2,54],73:[2,54],78:[2,54],81:[2,54],94:[2,54],105:[2,54],106:[2,54],111:[2,54],112:[2,54],113:[2,54],114:[2,54],115:[2,54],116:[2,54],117:[2,54],118:[2,54],119:[2,54],122:[2,54],174:[2,54],187:[2,54],188:[2,54],189:[2,54],190:[2,54],191:[2,54]},{19:[2,55],21:[2,55],22:[2,55],28:[2,55],34:[2,55],36:[2,55],37:[2,55],40:[2,55],41:[2,55],42:[2,55],43:[2,55],47:[2,55],48:[2,55],49:[2,55],50:[2,55],51:[2,55],56:[2,55],58:[2,55],59:[2,55],60:[2,55],65:[2,55],67:[2,55],73:[2,55],78:[2,55],81:[2,55],94:[2,55],105:[2,55],106:[2,55],111:[2,55],112:[2,55],113:[2,55],114:[2,55],115:[2,55],116:[2,55],117:[2,55],118:[2,55],119:[2,55],122:[2,55],174:[2,55],187:[2,55],188:[2,55],189:[2,55],190:[2,55],191:[2,55]},{19:[2,58],21:[2,58],22:[2,58],28:[2,58],34:[2,58],36:[2,58],37:[2,58],40:[2,58],41:[2,58],42:[2,58],43:[2,58],47:[2,58],48:[2,58],49:[2,58],50:[2,58],51:[2,58],56:[2,58],58:[2,58],59:[2,58],60:[2,58],65:[2,58],67:[2,58],73:[2,58],78:[2,58],81:[2,58],94:[2,58],105:[2,58],106:[2,58],111:[2,58],112:[2,58],113:[2,58],114:[2,58],115:[2,58],116:[2,58],117:[2,58],118:[2,58],119:[2,58],122:[2,58],174:[2,58],187:[2,58],188:[2,58],189:[2,58],190:[2,58],191:[2,58]},{19:[2,59],21:[2,59],22:[2,59],28:[2,59],34:[2,59],36:[2,59],37:[2,59],40:[2,59],41:[2,59],42:[2,59],43:[2,59],47:[2,59],48:[2,59],49:[2,59],50:[2,59],51:[2,59],56:[2,59],58:[2,59],59:[2,59],60:[2,59],65:[2,59],67:[2,59],73:[2,59],78:[2,59],81:[2,59],94:[2,59],105:[2,59],106:[2,59],111:[2,59],112:[2,59],113:[2,59],114:[2,59],115:[2,59],116:[2,59],117:[2,59],118:[2,59],119:[2,59],122:[2,59],174:[2,59],187:[2,59],188:[2,59],189:[2,59],190:[2,59],191:[2,59]},{19:[2,62],21:[2,62],22:[2,62],28:[2,62],34:[2,62],36:[2,62],37:[2,62],40:[2,62],41:[2,62],42:[2,62],43:[2,62],47:[2,62],48:[2,62],49:[2,62],50:[2,62],51:[2,62],56:[2,62],58:[2,62],59:[2,62],60:[2,62],65:[2,62],67:[2,62],73:[2,62],78:[2,62],81:[2,62],94:[2,62],105:[2,62],106:[2,62],111:[2,62],112:[2,62],113:[2,62],114:[2,62],115:[2,62],116:[2,62],117:[2,62],118:[2,62],119:[2,62],122:[2,62],174:[2,62],187:[2,62],188:[2,62],189:[2,62],190:[2,62],191:[2,62]},{19:[2,63],21:[2,63],22:[2,63],28:[2,63],34:[2,63],36:[2,63],37:[2,63],40:[2,63],41:[2,63],42:[2,63],43:[2,63],47:[2,63],48:[2,63],49:[2,63],50:[2,63],51:[2,63],56:[2,63],58:[2,63],59:[2,63],60:[2,63],65:[2,63],67:[2,63],73:[2,63],78:[2,63],81:[2,63],94:[2,63],105:[2,63],106:[2,63],111:[2,63],112:[2,63],113:[2,63],114:[2,63],115:[2,63],116:[2,63],117:[2,63],118:[2,63],119:[2,63],122:[2,63],174:[2,63],187:[2,63],188:[2,63],189:[2,63],190:[2,63],191:[2,63]},{19:[1,129],28:[1,128],32:409,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],32:410,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],32:411,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,158],19:[2,158],21:[2,158],22:[2,158],25:[2,158],28:[2,158],34:[2,158],36:[2,158],37:[2,158],39:[2,158],40:[2,158],41:[2,158],42:[2,158],43:[2,158],46:[2,158],47:[2,158],48:[2,158],49:[2,158],50:[2,158],51:[2,158],56:[2,158],57:[2,158],58:[2,158],59:[2,158],60:[2,158],65:[2,158],67:[2,158],73:[2,158],78:[2,158],81:[2,158],82:[2,158],94:[2,158],105:[2,158],106:[2,158],111:[2,158],112:[2,158],113:[2,158],114:[2,158],115:[2,158],116:[2,158],117:[2,158],118:[2,158],119:[2,158],121:[2,158],122:[2,158],123:[2,158],128:[2,158],129:[2,158],130:[2,158],133:[2,158],134:[2,158],135:[2,158],136:[2,158],137:[2,158],141:[2,158],142:[2,158],143:[2,158],144:[2,158],148:[2,158],152:[2,158],156:[2,158],160:[2,158],164:[2,158],168:[2,158],174:[2,158],187:[2,158],188:[2,158],189:[2,158],190:[2,158],191:[2,158]},{2:[2,159],19:[2,159],21:[2,159],22:[2,159],25:[2,159],28:[2,159],34:[2,159],36:[2,159],37:[2,159],39:[2,159],40:[2,159],41:[2,159],42:[2,159],43:[2,159],46:[2,159],47:[2,159],48:[2,159],49:[2,159],50:[2,159],51:[2,159],56:[2,159],57:[2,159],58:[2,159],59:[2,159],60:[2,159],65:[2,159],67:[2,159],73:[2,159],78:[2,159],81:[2,159],82:[2,159],94:[2,159],105:[2,159],106:[2,159],111:[2,159],112:[2,159],113:[2,159],114:[2,159],115:[2,159],116:[2,159],117:[2,159],118:[2,159],119:[2,159],121:[2,159],122:[2,159],123:[2,159],128:[2,159],129:[2,159],130:[2,159],133:[2,159],134:[2,159],135:[2,159],136:[2,159],137:[2,159],141:[2,159],142:[2,159],143:[2,159],144:[2,159],148:[2,159],152:[2,159],156:[2,159],160:[2,159],164:[2,159],168:[2,159],174:[2,159],187:[2,159],188:[2,159],189:[2,159],190:[2,159],191:[2,159]},{19:[1,129],28:[1,128],32:412,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:413,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,140],19:[2,140],21:[2,140],22:[2,140],25:[2,140],28:[2,140],31:[2,140],34:[2,140],36:[2,140],37:[2,140],39:[2,140],40:[2,140],41:[2,140],42:[2,140],43:[2,140],46:[2,140],47:[2,140],48:[2,140],49:[2,140],50:[2,140],51:[2,140],56:[2,140],57:[2,140],58:[2,140],59:[2,140],60:[2,140],65:[2,140],67:[2,140],73:[2,140],78:[2,140],81:[2,140],82:[2,140],93:[2,140],94:[2,140],105:[2,140],106:[2,140],111:[2,140],112:[2,140],113:[2,140],114:[2,140],115:[2,140],116:[2,140],117:[2,140],118:[2,140],119:[2,140],121:[2,140],122:[2,140],123:[2,140],128:[2,140],129:[2,140],130:[2,140],133:[2,140],134:[2,140],135:[2,140],136:[2,140],137:[2,140],141:[2,140],142:[2,140],143:[2,140],144:[2,140],148:[2,140],152:[2,140],156:[2,140],160:[2,140],164:[2,140],168:[2,140],173:[2,140],174:[2,140],175:[2,140],176:[2,140],177:[2,140],178:[2,140],179:[2,140],180:[2,140],181:[2,140],182:[2,140],183:[2,140],187:[2,140],188:[2,140],189:[2,140],190:[2,140],191:[2,140]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:414,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{22:[1,294],28:[1,341],36:[1,284],40:[1,280],41:[1,279],42:[1,296],43:[1,282],46:[1,285],47:[1,275],48:[1,272],49:[1,288],50:[1,297],51:[1,289],56:[1,273],58:[1,277],59:[1,291],60:[1,292],63:[1,274],64:[1,281],65:[1,276],67:[1,283],78:[1,290],89:415,94:[1,287],101:271,111:[1,278],112:[1,295],113:[1,293],137:[1,286],187:[1,300],188:[1,298],189:[1,299],194:[1,301],195:[1,302],196:[1,303],197:[1,304],198:[1,305],199:[1,306],200:[1,307]},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:416,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,139],19:[2,139],21:[2,139],22:[2,139],25:[2,139],28:[2,139],31:[2,139],34:[2,139],36:[2,139],37:[2,139],39:[2,139],40:[2,139],41:[2,139],42:[2,139],43:[2,139],46:[2,139],47:[2,139],48:[2,139],49:[2,139],50:[2,139],51:[2,139],56:[2,139],57:[2,139],58:[2,139],59:[2,139],60:[2,139],65:[2,139],67:[2,139],73:[2,139],78:[2,139],81:[2,139],82:[2,139],93:[2,139],94:[2,139],105:[2,139],106:[2,139],111:[2,139],112:[2,139],113:[2,139],114:[2,139],115:[2,139],116:[2,139],117:[2,139],118:[2,139],119:[2,139],121:[2,139],122:[2,139],123:[2,139],128:[2,139],129:[2,139],130:[2,139],133:[2,139],134:[2,139],135:[2,139],136:[2,139],137:[2,139],141:[2,139],142:[2,139],143:[2,139],144:[2,139],148:[2,139],152:[2,139],156:[2,139],160:[2,139],164:[2,139],168:[2,139],173:[2,139],174:[2,139],175:[2,139],176:[2,139],177:[2,139],178:[2,139],179:[2,139],180:[2,139],181:[2,139],182:[2,139],183:[2,139],187:[2,139],188:[2,139],189:[2,139],190:[2,139],191:[2,139]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:417,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{22:[1,294],28:[1,341],36:[1,284],40:[1,280],41:[1,279],42:[1,296],43:[1,282],46:[1,285],47:[1,275],48:[1,272],49:[1,288],50:[1,297],51:[1,289],56:[1,273],58:[1,277],59:[1,291],60:[1,292],63:[1,274],64:[1,281],65:[1,276],67:[1,283],78:[1,290],89:418,94:[1,287],101:271,111:[1,278],112:[1,295],113:[1,293],137:[1,286],187:[1,300],188:[1,298],189:[1,299],194:[1,301],195:[1,302],196:[1,303],197:[1,304],198:[1,305],199:[1,306],200:[1,307]},{2:[2,136],19:[2,136],21:[2,136],22:[2,136],25:[2,136],28:[2,136],31:[2,136],34:[2,136],36:[2,136],37:[2,136],39:[2,136],40:[2,136],41:[2,136],42:[2,136],43:[2,136],46:[2,136],47:[2,136],48:[2,136],49:[2,136],50:[2,136],51:[2,136],56:[2,136],57:[2,136],58:[2,136],59:[2,136],60:[2,136],65:[2,136],67:[2,136],73:[2,136],78:[2,136],81:[2,136],82:[2,136],94:[2,136],105:[2,136],106:[2,136],111:[2,136],112:[2,136],113:[2,136],114:[2,136],115:[2,136],116:[2,136],117:[2,136],118:[2,136],119:[2,136],121:[2,136],122:[2,136],123:[2,136],128:[2,136],129:[2,136],130:[2,136],133:[2,136],134:[2,136],135:[2,136],136:[2,136],137:[2,136],141:[2,136],142:[2,136],143:[2,136],144:[2,136],148:[2,136],152:[2,136],156:[2,136],160:[2,136],164:[2,136],168:[2,136],173:[2,136],174:[2,136],175:[2,136],176:[2,136],177:[2,136],178:[2,136],179:[2,136],180:[2,136],181:[2,136],182:[2,136],183:[2,136],187:[2,136],188:[2,136],189:[2,136],190:[2,136],191:[2,136]},{2:[2,135],19:[2,135],21:[2,135],22:[2,135],25:[2,135],28:[2,135],31:[2,135],34:[2,135],36:[2,135],37:[1,165],39:[2,135],40:[2,135],41:[2,135],42:[2,135],43:[2,135],46:[2,135],47:[2,135],48:[2,135],49:[2,135],50:[2,135],51:[2,135],56:[2,135],57:[2,135],58:[2,135],59:[2,135],60:[2,135],65:[2,135],67:[2,135],73:[2,135],78:[2,135],81:[1,254],82:[2,135],93:[1,255],94:[2,135],95:419,105:[2,135],106:[2,135],111:[2,135],112:[2,135],113:[2,135],114:[2,135],115:[2,135],116:[2,135],117:[2,135],118:[2,135],119:[2,135],121:[2,135],122:[2,135],123:[2,135],128:[2,135],129:[2,135],130:[2,135],133:[2,135],134:[2,135],135:[2,135],136:[2,135],137:[2,135],141:[2,135],142:[2,135],143:[2,135],144:[2,135],148:[2,135],152:[2,135],156:[2,135],160:[2,135],164:[2,135],168:[2,135],173:[2,135],174:[2,135],175:[2,135],176:[2,135],177:[2,135],178:[2,135],179:[2,135],180:[2,135],181:[2,135],182:[2,135],183:[2,135],187:[2,135],188:[2,135],189:[2,135],190:[2,135],191:[2,135]},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:420,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:421,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{37:[1,422]},{28:[1,378],39:[1,423],69:424},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:425,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,114],19:[2,114],21:[2,114],22:[2,114],25:[2,114],28:[2,114],31:[2,114],34:[2,114],36:[2,114],37:[2,114],39:[2,114],40:[2,114],41:[2,114],42:[2,114],43:[2,114],46:[2,114],47:[2,114],48:[2,114],49:[2,114],50:[2,114],51:[2,114],56:[2,114],57:[2,114],58:[2,114],59:[2,114],60:[2,114],65:[2,114],67:[2,114],73:[2,114],78:[2,114],81:[2,114],82:[2,114],93:[2,114],94:[2,114],105:[2,114],106:[2,114],111:[2,114],112:[2,114],113:[2,114],114:[2,114],115:[2,114],116:[2,114],117:[2,114],118:[2,114],119:[2,114],121:[2,114],122:[2,114],123:[2,114],128:[2,114],129:[2,114],130:[2,114],133:[2,114],134:[2,114],135:[2,114],136:[2,114],137:[2,114],141:[2,114],142:[2,114],143:[2,114],144:[2,114],148:[2,114],152:[2,114],156:[2,114],160:[2,114],164:[2,114],168:[2,114],173:[2,114],174:[2,114],175:[2,114],176:[2,114],177:[2,114],178:[2,114],179:[2,114],180:[2,114],181:[2,114],182:[2,114],183:[2,114],187:[2,114],188:[2,114],189:[2,114],190:[2,114],191:[2,114]},{21:[1,426],25:[1,427]},{21:[2,117],25:[2,117]},{57:[1,428]},{22:[1,294],28:[1,341],36:[1,284],40:[1,280],41:[1,279],42:[1,296],43:[1,282],46:[1,285],47:[1,275],48:[1,272],49:[1,288],50:[1,297],51:[1,289],56:[1,273],57:[2,147],58:[1,277],59:[1,291],60:[1,292],63:[1,274],64:[1,281],65:[1,276],67:[1,283],78:[1,290],87:429,89:268,90:269,91:270,94:[1,287],101:271,111:[1,278],112:[1,295],113:[1,293],137:[1,286],187:[1,300],188:[1,298],189:[1,299],190:[1,67],191:[1,68],194:[1,301],195:[1,302],196:[1,303],197:[1,304],198:[1,305],199:[1,306],200:[1,307]},{37:[2,122],57:[2,122]},{37:[2,123],57:[2,123]},{37:[2,124],57:[2,124]},{2:[2,148],19:[2,148],21:[2,148],22:[2,148],25:[2,148],28:[2,148],31:[2,148],34:[2,148],36:[2,148],37:[2,148],39:[2,148],40:[2,148],41:[2,148],42:[2,148],43:[2,148],46:[2,148],47:[2,148],48:[2,148],49:[2,148],50:[2,148],51:[2,148],56:[2,148],57:[2,148],58:[2,148],59:[2,148],60:[2,148],65:[2,148],67:[2,148],73:[2,148],78:[2,148],81:[2,148],82:[2,148],93:[2,148],94:[2,148],105:[2,148],106:[2,148],111:[2,148],112:[2,148],113:[2,148],114:[2,148],115:[2,148],116:[2,148],117:[2,148],118:[2,148],119:[2,148],121:[2,148],122:[2,148],123:[2,148],128:[2,148],129:[2,148],130:[2,148],133:[2,148],134:[2,148],135:[2,148],136:[2,148],137:[2,148],141:[2,148],142:[2,148],143:[2,148],144:[2,148],148:[2,148],152:[2,148],156:[2,148],160:[2,148],164:[2,148],168:[2,148],173:[2,148],174:[2,148],175:[2,148],176:[2,148],177:[2,148],178:[2,148],179:[2,148],180:[2,148],181:[2,148],182:[2,148],183:[2,148],187:[2,148],188:[2,148],189:[2,148],190:[2,148],191:[2,148]},{2:[2,310],19:[2,310],21:[2,310],22:[2,310],25:[2,310],28:[2,310],31:[2,310],34:[2,310],36:[2,310],37:[2,310],39:[2,310],40:[2,310],41:[2,310],42:[2,310],43:[2,310],46:[2,310],47:[2,310],48:[2,310],49:[2,310],50:[2,310],51:[2,310],56:[2,310],57:[2,310],58:[2,310],59:[2,310],60:[2,310],65:[2,310],67:[2,310],73:[2,310],78:[2,310],81:[2,310],82:[2,310],93:[2,310],94:[2,310],105:[2,310],106:[2,310],111:[2,310],112:[2,310],113:[2,310],114:[2,310],115:[2,310],116:[2,310],117:[2,310],118:[2,310],119:[2,310],121:[2,310],122:[2,310],123:[2,310],128:[2,310],129:[2,310],130:[2,310],133:[2,310],134:[2,310],135:[2,310],136:[2,310],137:[2,310],141:[2,310],142:[2,310],143:[2,310],144:[2,310],148:[2,310],152:[2,310],156:[2,310],160:[2,310],164:[2,310],168:[2,310],173:[2,310],174:[2,310],175:[2,310],176:[2,310],177:[2,310],178:[2,310],179:[2,310],180:[2,310],181:[2,310],182:[2,310],183:[2,310],187:[2,310],188:[2,310],189:[2,310],190:[2,310],191:[2,310]},{2:[2,311],19:[2,311],21:[2,311],22:[2,311],25:[2,311],28:[2,311],31:[2,311],34:[2,311],36:[2,311],37:[2,311],39:[2,311],40:[2,311],41:[2,311],42:[2,311],43:[2,311],46:[2,311],47:[2,311],48:[2,311],49:[2,311],50:[2,311],51:[2,311],56:[2,311],57:[2,311],58:[2,311],59:[2,311],60:[2,311],65:[2,311],67:[2,311],73:[2,311],78:[2,311],81:[2,311],82:[2,311],93:[2,311],94:[2,311],105:[2,311],106:[2,311],111:[2,311],112:[2,311],113:[2,311],114:[2,311],115:[2,311],116:[2,311],117:[2,311],118:[2,311],119:[2,311],121:[2,311],122:[2,311],123:[2,311],128:[2,311],129:[2,311],130:[2,311],133:[2,311],134:[2,311],135:[2,311],136:[2,311],137:[2,311],141:[2,311],142:[2,311],143:[2,311],144:[2,311],148:[2,311],152:[2,311],156:[2,311],160:[2,311],164:[2,311],168:[2,311],173:[2,311],174:[2,311],175:[2,311],176:[2,311],177:[2,311],178:[2,311],179:[2,311],180:[2,311],181:[2,311],182:[2,311],183:[2,311],187:[2,311],188:[2,311],189:[2,311],190:[2,311],191:[2,311]},{2:[2,312],19:[2,312],21:[2,312],22:[2,312],25:[2,312],28:[2,312],31:[2,312],34:[2,312],36:[2,312],37:[2,312],39:[2,312],40:[2,312],41:[2,312],42:[2,312],43:[2,312],46:[2,312],47:[2,312],48:[2,312],49:[2,312],50:[2,312],51:[2,312],56:[2,312],57:[2,312],58:[2,312],59:[2,312],60:[2,312],65:[2,312],67:[2,312],73:[2,312],78:[2,312],81:[2,312],82:[2,312],93:[2,312],94:[2,312],105:[2,312],106:[2,312],111:[2,312],112:[2,312],113:[2,312],114:[2,312],115:[2,312],116:[2,312],117:[2,312],118:[2,312],119:[2,312],121:[2,312],122:[2,312],123:[2,312],128:[2,312],129:[2,312],130:[2,312],133:[2,312],134:[2,312],135:[2,312],136:[2,312],137:[2,312],141:[2,312],142:[2,312],143:[2,312],144:[2,312],148:[2,312],152:[2,312],156:[2,312],160:[2,312],164:[2,312],168:[2,312],173:[2,312],174:[2,312],175:[2,312],176:[2,312],177:[2,312],178:[2,312],179:[2,312],180:[2,312],181:[2,312],182:[2,312],183:[2,312],187:[2,312],188:[2,312],189:[2,312],190:[2,312],191:[2,312]},{2:[2,313],19:[2,313],21:[2,313],22:[2,313],25:[2,313],28:[2,313],31:[2,313],34:[2,313],36:[2,313],37:[2,313],39:[2,313],40:[2,313],41:[2,313],42:[2,313],43:[2,313],46:[2,313],47:[2,313],48:[2,313],49:[2,313],50:[2,313],51:[2,313],56:[2,313],57:[2,313],58:[2,313],59:[2,313],60:[2,313],65:[2,313],67:[2,313],73:[2,313],78:[2,313],81:[2,313],82:[2,313],93:[2,313],94:[2,313],105:[2,313],106:[2,313],111:[2,313],112:[2,313],113:[2,313],114:[2,313],115:[2,313],116:[2,313],117:[2,313],118:[2,313],119:[2,313],121:[2,313],122:[2,313],123:[2,313],128:[2,313],129:[2,313],130:[2,313],133:[2,313],134:[2,313],135:[2,313],136:[2,313],137:[2,313],141:[2,313],142:[2,313],143:[2,313],144:[2,313],148:[2,313],152:[2,313],156:[2,313],160:[2,313],164:[2,313],168:[2,313],173:[2,313],174:[2,313],175:[2,313],176:[2,313],177:[2,313],178:[2,313],179:[2,313],180:[2,313],181:[2,313],182:[2,313],183:[2,313],187:[2,313],188:[2,313],189:[2,313],190:[2,313],191:[2,313]},{2:[2,314],19:[2,314],21:[2,314],22:[2,314],25:[2,314],28:[2,314],31:[2,314],34:[2,314],36:[2,314],37:[2,314],39:[2,314],40:[2,314],41:[2,314],42:[2,314],43:[2,314],46:[2,314],47:[2,314],48:[2,314],49:[2,314],50:[2,314],51:[2,314],56:[2,314],57:[2,314],58:[2,314],59:[2,314],60:[2,314],65:[2,314],67:[2,314],73:[2,314],78:[2,314],81:[2,314],82:[2,314],93:[2,314],94:[2,314],105:[2,314],106:[2,314],111:[2,314],112:[2,314],113:[2,314],114:[2,314],115:[2,314],116:[2,314],117:[2,314],118:[2,314],119:[2,314],121:[2,314],122:[2,314],123:[2,314],128:[2,314],129:[2,314],130:[2,314],133:[2,314],134:[2,314],135:[2,314],136:[2,314],137:[2,314],141:[2,314],142:[2,314],143:[2,314],144:[2,314],148:[2,314],152:[2,314],156:[2,314],160:[2,314],164:[2,314],168:[2,314],173:[2,314],174:[2,314],175:[2,314],176:[2,314],177:[2,314],178:[2,314],179:[2,314],180:[2,314],181:[2,314],182:[2,314],183:[2,314],187:[2,314],188:[2,314],189:[2,314],190:[2,314],191:[2,314]},{2:[2,315],19:[2,315],21:[2,315],22:[2,315],25:[2,315],28:[2,315],31:[2,315],34:[2,315],36:[2,315],37:[2,315],39:[2,315],40:[2,315],41:[2,315],42:[2,315],43:[2,315],46:[2,315],47:[2,315],48:[2,315],49:[2,315],50:[2,315],51:[2,315],56:[2,315],57:[2,315],58:[2,315],59:[2,315],60:[2,315],65:[2,315],67:[2,315],73:[2,315],78:[2,315],81:[2,315],82:[2,315],93:[2,315],94:[2,315],105:[2,315],106:[2,315],111:[2,315],112:[2,315],113:[2,315],114:[2,315],115:[2,315],116:[2,315],117:[2,315],118:[2,315],119:[2,315],121:[2,315],122:[2,315],123:[2,315],128:[2,315],129:[2,315],130:[2,315],133:[2,315],134:[2,315],135:[2,315],136:[2,315],137:[2,315],141:[2,315],142:[2,315],143:[2,315],144:[2,315],148:[2,315],152:[2,315],156:[2,315],160:[2,315],164:[2,315],168:[2,315],173:[2,315],174:[2,315],175:[2,315],176:[2,315],177:[2,315],178:[2,315],179:[2,315],180:[2,315],181:[2,315],182:[2,315],183:[2,315],187:[2,315],188:[2,315],189:[2,315],190:[2,315],191:[2,315]
	},{2:[2,316],19:[2,316],21:[2,316],22:[2,316],25:[2,316],28:[2,316],31:[2,316],34:[2,316],36:[2,316],37:[2,316],39:[2,316],40:[2,316],41:[2,316],42:[2,316],43:[2,316],46:[2,316],47:[2,316],48:[2,316],49:[2,316],50:[2,316],51:[2,316],56:[2,316],57:[2,316],58:[2,316],59:[2,316],60:[2,316],65:[2,316],67:[2,316],73:[2,316],78:[2,316],81:[2,316],82:[2,316],93:[2,316],94:[2,316],105:[2,316],106:[2,316],111:[2,316],112:[2,316],113:[2,316],114:[2,316],115:[2,316],116:[2,316],117:[2,316],118:[2,316],119:[2,316],121:[2,316],122:[2,316],123:[2,316],128:[2,316],129:[2,316],130:[2,316],133:[2,316],134:[2,316],135:[2,316],136:[2,316],137:[2,316],141:[2,316],142:[2,316],143:[2,316],144:[2,316],148:[2,316],152:[2,316],156:[2,316],160:[2,316],164:[2,316],168:[2,316],173:[2,316],174:[2,316],175:[2,316],176:[2,316],177:[2,316],178:[2,316],179:[2,316],180:[2,316],181:[2,316],182:[2,316],183:[2,316],187:[2,316],188:[2,316],189:[2,316],190:[2,316],191:[2,316]},{2:[2,317],19:[2,317],21:[2,317],22:[2,317],25:[2,317],28:[2,317],31:[2,317],34:[2,317],36:[2,317],37:[2,317],39:[2,317],40:[2,317],41:[2,317],42:[2,317],43:[2,317],46:[2,317],47:[2,317],48:[2,317],49:[2,317],50:[2,317],51:[2,317],56:[2,317],57:[2,317],58:[2,317],59:[2,317],60:[2,317],65:[2,317],67:[2,317],73:[2,317],78:[2,317],81:[2,317],82:[2,317],93:[2,317],94:[2,317],105:[2,317],106:[2,317],111:[2,317],112:[2,317],113:[2,317],114:[2,317],115:[2,317],116:[2,317],117:[2,317],118:[2,317],119:[2,317],121:[2,317],122:[2,317],123:[2,317],128:[2,317],129:[2,317],130:[2,317],133:[2,317],134:[2,317],135:[2,317],136:[2,317],137:[2,317],141:[2,317],142:[2,317],143:[2,317],144:[2,317],148:[2,317],152:[2,317],156:[2,317],160:[2,317],164:[2,317],168:[2,317],173:[2,317],174:[2,317],175:[2,317],176:[2,317],177:[2,317],178:[2,317],179:[2,317],180:[2,317],181:[2,317],182:[2,317],183:[2,317],187:[2,317],188:[2,317],189:[2,317],190:[2,317],191:[2,317]},{2:[2,318],19:[2,318],21:[2,318],22:[2,318],25:[2,318],28:[2,318],31:[2,318],34:[2,318],36:[2,318],37:[2,318],39:[2,318],40:[2,318],41:[2,318],42:[2,318],43:[2,318],46:[2,318],47:[2,318],48:[2,318],49:[2,318],50:[2,318],51:[2,318],56:[2,318],57:[2,318],58:[2,318],59:[2,318],60:[2,318],65:[2,318],67:[2,318],73:[2,318],78:[2,318],81:[2,318],82:[2,318],93:[2,318],94:[2,318],105:[2,318],106:[2,318],111:[2,318],112:[2,318],113:[2,318],114:[2,318],115:[2,318],116:[2,318],117:[2,318],118:[2,318],119:[2,318],121:[2,318],122:[2,318],123:[2,318],128:[2,318],129:[2,318],130:[2,318],133:[2,318],134:[2,318],135:[2,318],136:[2,318],137:[2,318],141:[2,318],142:[2,318],143:[2,318],144:[2,318],148:[2,318],152:[2,318],156:[2,318],160:[2,318],164:[2,318],168:[2,318],173:[2,318],174:[2,318],175:[2,318],176:[2,318],177:[2,318],178:[2,318],179:[2,318],180:[2,318],181:[2,318],182:[2,318],183:[2,318],187:[2,318],188:[2,318],189:[2,318],190:[2,318],191:[2,318]},{2:[2,319],19:[2,319],21:[2,319],22:[2,319],25:[2,319],28:[2,319],31:[2,319],34:[2,319],36:[2,319],37:[2,319],39:[2,319],40:[2,319],41:[2,319],42:[2,319],43:[2,319],46:[2,319],47:[2,319],48:[2,319],49:[2,319],50:[2,319],51:[2,319],56:[2,319],57:[2,319],58:[2,319],59:[2,319],60:[2,319],65:[2,319],67:[2,319],73:[2,319],78:[2,319],81:[2,319],82:[2,319],93:[2,319],94:[2,319],105:[2,319],106:[2,319],111:[2,319],112:[2,319],113:[2,319],114:[2,319],115:[2,319],116:[2,319],117:[2,319],118:[2,319],119:[2,319],121:[2,319],122:[2,319],123:[2,319],128:[2,319],129:[2,319],130:[2,319],133:[2,319],134:[2,319],135:[2,319],136:[2,319],137:[2,319],141:[2,319],142:[2,319],143:[2,319],144:[2,319],148:[2,319],152:[2,319],156:[2,319],160:[2,319],164:[2,319],168:[2,319],173:[2,319],174:[2,319],175:[2,319],176:[2,319],177:[2,319],178:[2,319],179:[2,319],180:[2,319],181:[2,319],182:[2,319],183:[2,319],187:[2,319],188:[2,319],189:[2,319],190:[2,319],191:[2,319]},{2:[2,320],19:[2,320],21:[2,320],22:[2,320],25:[2,320],28:[2,320],31:[2,320],34:[2,320],36:[2,320],37:[2,320],39:[2,320],40:[2,320],41:[2,320],42:[2,320],43:[2,320],46:[2,320],47:[2,320],48:[2,320],49:[2,320],50:[2,320],51:[2,320],56:[2,320],57:[2,320],58:[2,320],59:[2,320],60:[2,320],65:[2,320],67:[2,320],73:[2,320],78:[2,320],81:[2,320],82:[2,320],93:[2,320],94:[2,320],105:[2,320],106:[2,320],111:[2,320],112:[2,320],113:[2,320],114:[2,320],115:[2,320],116:[2,320],117:[2,320],118:[2,320],119:[2,320],121:[2,320],122:[2,320],123:[2,320],128:[2,320],129:[2,320],130:[2,320],133:[2,320],134:[2,320],135:[2,320],136:[2,320],137:[2,320],141:[2,320],142:[2,320],143:[2,320],144:[2,320],148:[2,320],152:[2,320],156:[2,320],160:[2,320],164:[2,320],168:[2,320],173:[2,320],174:[2,320],175:[2,320],176:[2,320],177:[2,320],178:[2,320],179:[2,320],180:[2,320],181:[2,320],182:[2,320],183:[2,320],187:[2,320],188:[2,320],189:[2,320],190:[2,320],191:[2,320]},{2:[2,321],19:[2,321],21:[2,321],22:[2,321],25:[2,321],28:[2,321],31:[2,321],34:[2,321],36:[2,321],37:[2,321],39:[2,321],40:[2,321],41:[2,321],42:[2,321],43:[2,321],46:[2,321],47:[2,321],48:[2,321],49:[2,321],50:[2,321],51:[2,321],56:[2,321],57:[2,321],58:[2,321],59:[2,321],60:[2,321],65:[2,321],67:[2,321],73:[2,321],78:[2,321],81:[2,321],82:[2,321],93:[2,321],94:[2,321],105:[2,321],106:[2,321],111:[2,321],112:[2,321],113:[2,321],114:[2,321],115:[2,321],116:[2,321],117:[2,321],118:[2,321],119:[2,321],121:[2,321],122:[2,321],123:[2,321],128:[2,321],129:[2,321],130:[2,321],133:[2,321],134:[2,321],135:[2,321],136:[2,321],137:[2,321],141:[2,321],142:[2,321],143:[2,321],144:[2,321],148:[2,321],152:[2,321],156:[2,321],160:[2,321],164:[2,321],168:[2,321],173:[2,321],174:[2,321],175:[2,321],176:[2,321],177:[2,321],178:[2,321],179:[2,321],180:[2,321],181:[2,321],182:[2,321],183:[2,321],187:[2,321],188:[2,321],189:[2,321],190:[2,321],191:[2,321]},{2:[2,322],19:[2,322],21:[2,322],22:[2,322],25:[2,322],28:[2,322],31:[2,322],34:[2,322],36:[2,322],37:[2,322],39:[2,322],40:[2,322],41:[2,322],42:[2,322],43:[2,322],46:[2,322],47:[2,322],48:[2,322],49:[2,322],50:[2,322],51:[2,322],56:[2,322],57:[2,322],58:[2,322],59:[2,322],60:[2,322],65:[2,322],67:[2,322],73:[2,322],78:[2,322],81:[2,322],82:[2,322],93:[2,322],94:[2,322],105:[2,322],106:[2,322],111:[2,322],112:[2,322],113:[2,322],114:[2,322],115:[2,322],116:[2,322],117:[2,322],118:[2,322],119:[2,322],121:[2,322],122:[2,322],123:[2,322],128:[2,322],129:[2,322],130:[2,322],133:[2,322],134:[2,322],135:[2,322],136:[2,322],137:[2,322],141:[2,322],142:[2,322],143:[2,322],144:[2,322],148:[2,322],152:[2,322],156:[2,322],160:[2,322],164:[2,322],168:[2,322],173:[2,322],174:[2,322],175:[2,322],176:[2,322],177:[2,322],178:[2,322],179:[2,322],180:[2,322],181:[2,322],182:[2,322],183:[2,322],187:[2,322],188:[2,322],189:[2,322],190:[2,322],191:[2,322]},{2:[2,323],19:[2,323],21:[2,323],22:[2,323],25:[2,323],28:[2,323],31:[2,323],34:[2,323],36:[2,323],37:[2,323],39:[2,323],40:[2,323],41:[2,323],42:[2,323],43:[2,323],46:[2,323],47:[2,323],48:[2,323],49:[2,323],50:[2,323],51:[2,323],56:[2,323],57:[2,323],58:[2,323],59:[2,323],60:[2,323],65:[2,323],67:[2,323],73:[2,323],78:[2,323],81:[2,323],82:[2,323],93:[2,323],94:[2,323],105:[2,323],106:[2,323],111:[2,323],112:[2,323],113:[2,323],114:[2,323],115:[2,323],116:[2,323],117:[2,323],118:[2,323],119:[2,323],121:[2,323],122:[2,323],123:[2,323],128:[2,323],129:[2,323],130:[2,323],133:[2,323],134:[2,323],135:[2,323],136:[2,323],137:[2,323],141:[2,323],142:[2,323],143:[2,323],144:[2,323],148:[2,323],152:[2,323],156:[2,323],160:[2,323],164:[2,323],168:[2,323],173:[2,323],174:[2,323],175:[2,323],176:[2,323],177:[2,323],178:[2,323],179:[2,323],180:[2,323],181:[2,323],182:[2,323],183:[2,323],187:[2,323],188:[2,323],189:[2,323],190:[2,323],191:[2,323]},{2:[2,324],19:[2,324],21:[2,324],22:[2,324],25:[2,324],28:[2,324],31:[2,324],34:[2,324],36:[2,324],37:[2,324],39:[2,324],40:[2,324],41:[2,324],42:[2,324],43:[2,324],46:[2,324],47:[2,324],48:[2,324],49:[2,324],50:[2,324],51:[2,324],56:[2,324],57:[2,324],58:[2,324],59:[2,324],60:[2,324],65:[2,324],67:[2,324],73:[2,324],78:[2,324],81:[2,324],82:[2,324],93:[2,324],94:[2,324],105:[2,324],106:[2,324],111:[2,324],112:[2,324],113:[2,324],114:[2,324],115:[2,324],116:[2,324],117:[2,324],118:[2,324],119:[2,324],121:[2,324],122:[2,324],123:[2,324],128:[2,324],129:[2,324],130:[2,324],133:[2,324],134:[2,324],135:[2,324],136:[2,324],137:[2,324],141:[2,324],142:[2,324],143:[2,324],144:[2,324],148:[2,324],152:[2,324],156:[2,324],160:[2,324],164:[2,324],168:[2,324],173:[2,324],174:[2,324],175:[2,324],176:[2,324],177:[2,324],178:[2,324],179:[2,324],180:[2,324],181:[2,324],182:[2,324],183:[2,324],187:[2,324],188:[2,324],189:[2,324],190:[2,324],191:[2,324]},{2:[2,325],19:[2,325],21:[2,325],22:[2,325],25:[2,325],28:[2,325],31:[2,325],34:[2,325],36:[2,325],37:[2,325],39:[2,325],40:[2,325],41:[2,325],42:[2,325],43:[2,325],46:[2,325],47:[2,325],48:[2,325],49:[2,325],50:[2,325],51:[2,325],56:[2,325],57:[2,325],58:[2,325],59:[2,325],60:[2,325],65:[2,325],67:[2,325],73:[2,325],78:[2,325],81:[2,325],82:[2,325],93:[2,325],94:[2,325],105:[2,325],106:[2,325],111:[2,325],112:[2,325],113:[2,325],114:[2,325],115:[2,325],116:[2,325],117:[2,325],118:[2,325],119:[2,325],121:[2,325],122:[2,325],123:[2,325],128:[2,325],129:[2,325],130:[2,325],133:[2,325],134:[2,325],135:[2,325],136:[2,325],137:[2,325],141:[2,325],142:[2,325],143:[2,325],144:[2,325],148:[2,325],152:[2,325],156:[2,325],160:[2,325],164:[2,325],168:[2,325],173:[2,325],174:[2,325],175:[2,325],176:[2,325],177:[2,325],178:[2,325],179:[2,325],180:[2,325],181:[2,325],182:[2,325],183:[2,325],187:[2,325],188:[2,325],189:[2,325],190:[2,325],191:[2,325]},{2:[2,326],19:[2,326],21:[2,326],22:[2,326],25:[2,326],28:[2,326],31:[2,326],34:[2,326],36:[2,326],37:[2,326],39:[2,326],40:[2,326],41:[2,326],42:[2,326],43:[2,326],46:[2,326],47:[2,326],48:[2,326],49:[2,326],50:[2,326],51:[2,326],56:[2,326],57:[2,326],58:[2,326],59:[2,326],60:[2,326],65:[2,326],67:[2,326],73:[2,326],78:[2,326],81:[2,326],82:[2,326],93:[2,326],94:[2,326],105:[2,326],106:[2,326],111:[2,326],112:[2,326],113:[2,326],114:[2,326],115:[2,326],116:[2,326],117:[2,326],118:[2,326],119:[2,326],121:[2,326],122:[2,326],123:[2,326],128:[2,326],129:[2,326],130:[2,326],133:[2,326],134:[2,326],135:[2,326],136:[2,326],137:[2,326],141:[2,326],142:[2,326],143:[2,326],144:[2,326],148:[2,326],152:[2,326],156:[2,326],160:[2,326],164:[2,326],168:[2,326],173:[2,326],174:[2,326],175:[2,326],176:[2,326],177:[2,326],178:[2,326],179:[2,326],180:[2,326],181:[2,326],182:[2,326],183:[2,326],187:[2,326],188:[2,326],189:[2,326],190:[2,326],191:[2,326]},{2:[2,327],19:[2,327],21:[2,327],22:[2,327],25:[2,327],28:[2,327],31:[2,327],34:[2,327],36:[2,327],37:[2,327],39:[2,327],40:[2,327],41:[2,327],42:[2,327],43:[2,327],46:[2,327],47:[2,327],48:[2,327],49:[2,327],50:[2,327],51:[2,327],56:[2,327],57:[2,327],58:[2,327],59:[2,327],60:[2,327],65:[2,327],67:[2,327],73:[2,327],78:[2,327],81:[2,327],82:[2,327],93:[2,327],94:[2,327],105:[2,327],106:[2,327],111:[2,327],112:[2,327],113:[2,327],114:[2,327],115:[2,327],116:[2,327],117:[2,327],118:[2,327],119:[2,327],121:[2,327],122:[2,327],123:[2,327],128:[2,327],129:[2,327],130:[2,327],133:[2,327],134:[2,327],135:[2,327],136:[2,327],137:[2,327],141:[2,327],142:[2,327],143:[2,327],144:[2,327],148:[2,327],152:[2,327],156:[2,327],160:[2,327],164:[2,327],168:[2,327],173:[2,327],174:[2,327],175:[2,327],176:[2,327],177:[2,327],178:[2,327],179:[2,327],180:[2,327],181:[2,327],182:[2,327],183:[2,327],187:[2,327],188:[2,327],189:[2,327],190:[2,327],191:[2,327]},{2:[2,328],19:[2,328],21:[2,328],22:[2,328],25:[2,328],28:[2,328],31:[2,328],34:[2,328],36:[2,328],37:[2,328],39:[2,328],40:[2,328],41:[2,328],42:[2,328],43:[2,328],46:[2,328],47:[2,328],48:[2,328],49:[2,328],50:[2,328],51:[2,328],56:[2,328],57:[2,328],58:[2,328],59:[2,328],60:[2,328],65:[2,328],67:[2,328],73:[2,328],78:[2,328],81:[2,328],82:[2,328],93:[2,328],94:[2,328],105:[2,328],106:[2,328],111:[2,328],112:[2,328],113:[2,328],114:[2,328],115:[2,328],116:[2,328],117:[2,328],118:[2,328],119:[2,328],121:[2,328],122:[2,328],123:[2,328],128:[2,328],129:[2,328],130:[2,328],133:[2,328],134:[2,328],135:[2,328],136:[2,328],137:[2,328],141:[2,328],142:[2,328],143:[2,328],144:[2,328],148:[2,328],152:[2,328],156:[2,328],160:[2,328],164:[2,328],168:[2,328],173:[2,328],174:[2,328],175:[2,328],176:[2,328],177:[2,328],178:[2,328],179:[2,328],180:[2,328],181:[2,328],182:[2,328],183:[2,328],187:[2,328],188:[2,328],189:[2,328],190:[2,328],191:[2,328]},{2:[2,329],19:[2,329],21:[2,329],22:[2,329],25:[2,329],28:[2,329],31:[2,329],34:[2,329],36:[2,329],37:[2,329],39:[2,329],40:[2,329],41:[2,329],42:[2,329],43:[2,329],46:[2,329],47:[2,329],48:[2,329],49:[2,329],50:[2,329],51:[2,329],56:[2,329],57:[2,329],58:[2,329],59:[2,329],60:[2,329],65:[2,329],67:[2,329],73:[2,329],78:[2,329],81:[2,329],82:[2,329],93:[2,329],94:[2,329],105:[2,329],106:[2,329],111:[2,329],112:[2,329],113:[2,329],114:[2,329],115:[2,329],116:[2,329],117:[2,329],118:[2,329],119:[2,329],121:[2,329],122:[2,329],123:[2,329],128:[2,329],129:[2,329],130:[2,329],133:[2,329],134:[2,329],135:[2,329],136:[2,329],137:[2,329],141:[2,329],142:[2,329],143:[2,329],144:[2,329],148:[2,329],152:[2,329],156:[2,329],160:[2,329],164:[2,329],168:[2,329],173:[2,329],174:[2,329],175:[2,329],176:[2,329],177:[2,329],178:[2,329],179:[2,329],180:[2,329],181:[2,329],182:[2,329],183:[2,329],187:[2,329],188:[2,329],189:[2,329],190:[2,329],191:[2,329]},{2:[2,330],19:[2,330],21:[2,330],22:[2,330],25:[2,330],28:[2,330],31:[2,330],34:[2,330],36:[2,330],37:[2,330],39:[2,330],40:[2,330],41:[2,330],42:[2,330],43:[2,330],46:[2,330],47:[2,330],48:[2,330],49:[2,330],50:[2,330],51:[2,330],56:[2,330],57:[2,330],58:[2,330],59:[2,330],60:[2,330],65:[2,330],67:[2,330],73:[2,330],78:[2,330],81:[2,330],82:[2,330],93:[2,330],94:[2,330],105:[2,330],106:[2,330],111:[2,330],112:[2,330],113:[2,330],114:[2,330],115:[2,330],116:[2,330],117:[2,330],118:[2,330],119:[2,330],121:[2,330],122:[2,330],123:[2,330],128:[2,330],129:[2,330],130:[2,330],133:[2,330],134:[2,330],135:[2,330],136:[2,330],137:[2,330],141:[2,330],142:[2,330],143:[2,330],144:[2,330],148:[2,330],152:[2,330],156:[2,330],160:[2,330],164:[2,330],168:[2,330],173:[2,330],174:[2,330],175:[2,330],176:[2,330],177:[2,330],178:[2,330],179:[2,330],180:[2,330],181:[2,330],182:[2,330],183:[2,330],187:[2,330],188:[2,330],189:[2,330],190:[2,330],191:[2,330]},{2:[2,331],19:[2,331],21:[2,331],22:[2,331],25:[2,331],28:[2,331],31:[2,331],34:[2,331],36:[2,331],37:[2,331],39:[2,331],40:[2,331],41:[2,331],42:[2,331],43:[2,331],46:[2,331],47:[2,331],48:[2,331],49:[2,331],50:[2,331],51:[2,331],56:[2,331],57:[2,331],58:[2,331],59:[2,331],60:[2,331],65:[2,331],67:[2,331],73:[2,331],78:[2,331],81:[2,331],82:[2,331],93:[2,331],94:[2,331],105:[2,331],106:[2,331],111:[2,331],112:[2,331],113:[2,331],114:[2,331],115:[2,331],116:[2,331],117:[2,331],118:[2,331],119:[2,331],121:[2,331],122:[2,331],123:[2,331],128:[2,331],129:[2,331],130:[2,331],133:[2,331],134:[2,331],135:[2,331],136:[2,331],137:[2,331],141:[2,331],142:[2,331],143:[2,331],144:[2,331],148:[2,331],152:[2,331],156:[2,331],160:[2,331],164:[2,331],168:[2,331],173:[2,331],174:[2,331],175:[2,331],176:[2,331],177:[2,331],178:[2,331],179:[2,331],180:[2,331],181:[2,331],182:[2,331],183:[2,331],187:[2,331],188:[2,331],189:[2,331],190:[2,331],191:[2,331]},{2:[2,332],19:[2,332],21:[2,332],22:[2,332],25:[2,332],28:[2,332],31:[2,332],34:[2,332],36:[2,332],37:[2,332],39:[2,332],40:[2,332],41:[2,332],42:[2,332],43:[2,332],46:[2,332],47:[2,332],48:[2,332],49:[2,332],50:[2,332],51:[2,332],56:[2,332],57:[2,332],58:[2,332],59:[2,332],60:[2,332],65:[2,332],67:[2,332],73:[2,332],78:[2,332],81:[2,332],82:[2,332],93:[2,332],94:[2,332],105:[2,332],106:[2,332],111:[2,332],112:[2,332],113:[2,332],114:[2,332],115:[2,332],116:[2,332],117:[2,332],118:[2,332],119:[2,332],121:[2,332],122:[2,332],123:[2,332],128:[2,332],129:[2,332],130:[2,332],133:[2,332],134:[2,332],135:[2,332],136:[2,332],137:[2,332],141:[2,332],142:[2,332],143:[2,332],144:[2,332],148:[2,332],152:[2,332],156:[2,332],160:[2,332],164:[2,332],168:[2,332],173:[2,332],174:[2,332],175:[2,332],176:[2,332],177:[2,332],178:[2,332],179:[2,332],180:[2,332],181:[2,332],182:[2,332],183:[2,332],187:[2,332],188:[2,332],189:[2,332],190:[2,332],191:[2,332]},{2:[2,333],19:[2,333],21:[2,333],22:[2,333],25:[2,333],28:[2,333],31:[2,333],34:[2,333],36:[2,333],37:[2,333],39:[2,333],40:[2,333],41:[2,333],42:[2,333],43:[2,333],46:[2,333],47:[2,333],48:[2,333],49:[2,333],50:[2,333],51:[2,333],56:[2,333],57:[2,333],58:[2,333],59:[2,333],60:[2,333],65:[2,333],67:[2,333],73:[2,333],78:[2,333],81:[2,333],82:[2,333],93:[2,333],94:[2,333],105:[2,333],106:[2,333],111:[2,333],112:[2,333],113:[2,333],114:[2,333],115:[2,333],116:[2,333],117:[2,333],118:[2,333],119:[2,333],121:[2,333],122:[2,333],123:[2,333],128:[2,333],129:[2,333],130:[2,333],133:[2,333],134:[2,333],135:[2,333],136:[2,333],137:[2,333],141:[2,333],142:[2,333],143:[2,333],144:[2,333],148:[2,333],152:[2,333],156:[2,333],160:[2,333],164:[2,333],168:[2,333],173:[2,333],174:[2,333],175:[2,333],176:[2,333],177:[2,333],178:[2,333],179:[2,333],180:[2,333],181:[2,333],182:[2,333],183:[2,333],187:[2,333],188:[2,333],189:[2,333],190:[2,333],191:[2,333]},{2:[2,334],19:[2,334],21:[2,334],22:[2,334],25:[2,334],28:[2,334],31:[2,334],34:[2,334],36:[2,334],37:[2,334],39:[2,334],40:[2,334],41:[2,334],42:[2,334],43:[2,334],46:[2,334],47:[2,334],48:[2,334],49:[2,334],50:[2,334],51:[2,334],56:[2,334],57:[2,334],58:[2,334],59:[2,334],60:[2,334],65:[2,334],67:[2,334],73:[2,334],78:[2,334],81:[2,334],82:[2,334],93:[2,334],94:[2,334],105:[2,334],106:[2,334],111:[2,334],112:[2,334],113:[2,334],114:[2,334],115:[2,334],116:[2,334],117:[2,334],118:[2,334],119:[2,334],121:[2,334],122:[2,334],123:[2,334],128:[2,334],129:[2,334],130:[2,334],133:[2,334],134:[2,334],135:[2,334],136:[2,334],137:[2,334],141:[2,334],142:[2,334],143:[2,334],144:[2,334],148:[2,334],152:[2,334],156:[2,334],160:[2,334],164:[2,334],168:[2,334],173:[2,334],174:[2,334],175:[2,334],176:[2,334],177:[2,334],178:[2,334],179:[2,334],180:[2,334],181:[2,334],182:[2,334],183:[2,334],187:[2,334],188:[2,334],189:[2,334],190:[2,334],191:[2,334]},{2:[2,335],19:[2,335],21:[2,335],22:[2,335],25:[2,335],28:[2,335],31:[2,335],34:[2,335],36:[2,335],37:[2,335],39:[2,335],40:[2,335],41:[2,335],42:[2,335],43:[2,335],46:[2,335],47:[2,335],48:[2,335],49:[2,335],50:[2,335],51:[2,335],56:[2,335],57:[2,335],58:[2,335],59:[2,335],60:[2,335],65:[2,335],67:[2,335],73:[2,335],78:[2,335],81:[2,335],82:[2,335],93:[2,335],94:[2,335],105:[2,335],106:[2,335],111:[2,335],112:[2,335],113:[2,335],114:[2,335],115:[2,335],116:[2,335],117:[2,335],118:[2,335],119:[2,335],121:[2,335],122:[2,335],123:[2,335],128:[2,335],129:[2,335],130:[2,335],133:[2,335],134:[2,335],135:[2,335],136:[2,335],137:[2,335],141:[2,335],142:[2,335],143:[2,335],144:[2,335],148:[2,335],152:[2,335],156:[2,335],160:[2,335],164:[2,335],168:[2,335],173:[2,335],174:[2,335],175:[2,335],176:[2,335],177:[2,335],178:[2,335],179:[2,335],180:[2,335],181:[2,335],182:[2,335],183:[2,335],187:[2,335],188:[2,335],189:[2,335],190:[2,335],191:[2,335]},{2:[2,336],19:[2,336],21:[2,336],22:[2,336],25:[2,336],28:[2,336],31:[2,336],34:[2,336],36:[2,336],37:[2,336],39:[2,336],40:[2,336],41:[2,336],42:[2,336],43:[2,336],46:[2,336],47:[2,336],48:[2,336],49:[2,336],50:[2,336],51:[2,336],56:[2,336],57:[2,336],58:[2,336],59:[2,336],60:[2,336],65:[2,336],67:[2,336],73:[2,336],78:[2,336],81:[2,336],82:[2,336],93:[2,336],94:[2,336],105:[2,336],106:[2,336],111:[2,336],112:[2,336],113:[2,336],114:[2,336],115:[2,336],116:[2,336],117:[2,336],118:[2,336],119:[2,336],121:[2,336],122:[2,336],123:[2,336],128:[2,336],129:[2,336],130:[2,336],133:[2,336],134:[2,336],135:[2,336],136:[2,336],137:[2,336],141:[2,336],142:[2,336],143:[2,336],144:[2,336],148:[2,336],152:[2,336],156:[2,336],160:[2,336],164:[2,336],168:[2,336],173:[2,336],174:[2,336],175:[2,336],176:[2,336],177:[2,336],178:[2,336],179:[2,336],180:[2,336],181:[2,336],182:[2,336],183:[2,336],187:[2,336],188:[2,336],189:[2,336],190:[2,336],191:[2,336]},{2:[2,337],19:[2,337],21:[2,337],22:[2,337],25:[2,337],28:[2,337],31:[2,337],34:[2,337],36:[2,337],37:[2,337],39:[2,337],40:[2,337],41:[2,337],42:[2,337],43:[2,337],46:[2,337],47:[2,337],48:[2,337],49:[2,337],50:[2,337],51:[2,337],56:[2,337],57:[2,337],58:[2,337],59:[2,337],60:[2,337],65:[2,337],67:[2,337],73:[2,337],78:[2,337],81:[2,337],82:[2,337],93:[2,337],94:[2,337],105:[2,337],106:[2,337],111:[2,337],112:[2,337],113:[2,337],114:[2,337],115:[2,337],116:[2,337],117:[2,337],118:[2,337],119:[2,337],121:[2,337],122:[2,337],123:[2,337],128:[2,337],129:[2,337],130:[2,337],133:[2,337],134:[2,337],135:[2,337],136:[2,337],137:[2,337],141:[2,337],142:[2,337],143:[2,337],144:[2,337],148:[2,337],152:[2,337],156:[2,337],160:[2,337],164:[2,337],168:[2,337],173:[2,337],174:[2,337],175:[2,337],176:[2,337],177:[2,337],178:[2,337],179:[2,337],180:[2,337],181:[2,337],182:[2,337],183:[2,337],187:[2,337],188:[2,337],189:[2,337],190:[2,337],191:[2,337]},{2:[2,338],19:[2,338],21:[2,338],22:[2,338],25:[2,338],28:[2,338],31:[2,338],34:[2,338],36:[2,338],37:[2,338],39:[2,338],40:[2,338],41:[2,338],42:[2,338],43:[2,338],46:[2,338],47:[2,338],48:[2,338],49:[2,338],50:[2,338],51:[2,338],56:[2,338],57:[2,338],58:[2,338],59:[2,338],60:[2,338],65:[2,338],67:[2,338],73:[2,338],78:[2,338],81:[2,338],82:[2,338],93:[2,338],94:[2,338],105:[2,338],106:[2,338],111:[2,338],112:[2,338],113:[2,338],114:[2,338],115:[2,338],116:[2,338],117:[2,338],118:[2,338],119:[2,338],121:[2,338],122:[2,338],123:[2,338],128:[2,338],129:[2,338],130:[2,338],133:[2,338],134:[2,338],135:[2,338],136:[2,338],137:[2,338],141:[2,338],142:[2,338],143:[2,338],144:[2,338],148:[2,338],152:[2,338],156:[2,338],160:[2,338],164:[2,338],168:[2,338],173:[2,338],174:[2,338],175:[2,338],176:[2,338],177:[2,338],178:[2,338],179:[2,338],180:[2,338],181:[2,338],182:[2,338],183:[2,338],187:[2,338],188:[2,338],189:[2,338],190:[2,338],191:[2,338]},{2:[2,339],19:[2,339],21:[2,339],22:[2,339],25:[2,339],28:[2,339],31:[2,339],34:[2,339],36:[2,339],37:[2,339],39:[2,339],40:[2,339],41:[2,339],42:[2,339],43:[2,339],46:[2,339],47:[2,339],48:[2,339],49:[2,339],50:[2,339],51:[2,339],56:[2,339],57:[2,339],58:[2,339],59:[2,339],60:[2,339],65:[2,339],67:[2,339],73:[2,339],78:[2,339],81:[2,339],82:[2,339],93:[2,339],94:[2,339],105:[2,339],106:[2,339],111:[2,339],112:[2,339],113:[2,339],114:[2,339],115:[2,339],116:[2,339],117:[2,339],118:[2,339],119:[2,339],121:[2,339],122:[2,339],123:[2,339],128:[2,339],129:[2,339],130:[2,339],133:[2,339],134:[2,339],135:[2,339],136:[2,339],137:[2,339],141:[2,339],142:[2,339],143:[2,339],144:[2,339],148:[2,339],152:[2,339],156:[2,339],160:[2,339],164:[2,339],168:[2,339],173:[2,339],174:[2,339],175:[2,339],176:[2,339],177:[2,339],178:[2,339],179:[2,339],180:[2,339],181:[2,339],182:[2,339],183:[2,339],187:[2,339],188:[2,339],189:[2,339],190:[2,339],191:[2,339]},{2:[2,340],19:[2,340],21:[2,340],22:[2,340],25:[2,340],28:[2,340],31:[2,340],34:[2,340],36:[2,340],37:[2,340],39:[2,340],40:[2,340],41:[2,340],42:[2,340],43:[2,340],46:[2,340],47:[2,340],48:[2,340],49:[2,340],50:[2,340],51:[2,340],56:[2,340],57:[2,340],58:[2,340],59:[2,340],60:[2,340],65:[2,340],67:[2,340],73:[2,340],78:[2,340],81:[2,340],82:[2,340],93:[2,340],94:[2,340],105:[2,340],106:[2,340],111:[2,340],112:[2,340],113:[2,340],114:[2,340],115:[2,340],116:[2,340],117:[2,340],118:[2,340],119:[2,340],121:[2,340],122:[2,340],123:[2,340],128:[2,340],129:[2,340],130:[2,340],133:[2,340],134:[2,340],135:[2,340],136:[2,340],137:[2,340],141:[2,340],142:[2,340],143:[2,340],144:[2,340],148:[2,340],152:[2,340],156:[2,340],160:[2,340],164:[2,340],168:[2,340],173:[2,340],174:[2,340],175:[2,340],176:[2,340],177:[2,340],178:[2,340],179:[2,340],180:[2,340],181:[2,340],182:[2,340],183:[2,340],187:[2,340],188:[2,340],189:[2,340],190:[2,340],191:[2,340]},{2:[2,341],19:[2,341],21:[2,341],22:[2,341],25:[2,341],28:[2,341],31:[2,341],34:[2,341],36:[2,341],37:[2,341],39:[2,341],40:[2,341],41:[2,341],42:[2,341],43:[2,341],46:[2,341],47:[2,341],48:[2,341],49:[2,341],50:[2,341],51:[2,341],56:[2,341],57:[2,341],58:[2,341],59:[2,341],60:[2,341],65:[2,341],67:[2,341],73:[2,341],78:[2,341],81:[2,341],82:[2,341],93:[2,341],94:[2,341],105:[2,341],106:[2,341],111:[2,341],112:[2,341],113:[2,341],114:[2,341],115:[2,341],116:[2,341],117:[2,341],118:[2,341],119:[2,341],121:[2,341],122:[2,341],123:[2,341],128:[2,341],129:[2,341],130:[2,341],133:[2,341],134:[2,341],135:[2,341],136:[2,341],137:[2,341],141:[2,341],142:[2,341],143:[2,341],144:[2,341],148:[2,341],152:[2,341],156:[2,341],160:[2,341],164:[2,341],168:[2,341],173:[2,341],174:[2,341],175:[2,341],176:[2,341],177:[2,341],178:[2,341],179:[2,341],180:[2,341],181:[2,341],182:[2,341],183:[2,341],187:[2,341],188:[2,341],189:[2,341],190:[2,341],191:[2,341]},{2:[2,342],19:[2,342],21:[2,342],22:[2,342],25:[2,342],28:[2,342],31:[2,342],34:[2,342],36:[2,342],37:[2,342],39:[2,342],40:[2,342],41:[2,342],42:[2,342],43:[2,342],46:[2,342],47:[2,342],48:[2,342],49:[2,342],50:[2,342],51:[2,342],56:[2,342],57:[2,342],58:[2,342],59:[2,342],60:[2,342],65:[2,342],67:[2,342],73:[2,342],78:[2,342],81:[2,342],82:[2,342],93:[2,342],94:[2,342],105:[2,342],106:[2,342],111:[2,342],112:[2,342],113:[2,342],114:[2,342],115:[2,342],116:[2,342],117:[2,342],118:[2,342],119:[2,342],121:[2,342],122:[2,342],123:[2,342],128:[2,342],129:[2,342],130:[2,342],133:[2,342],134:[2,342],135:[2,342],136:[2,342],137:[2,342],141:[2,342],142:[2,342],143:[2,342],144:[2,342],148:[2,342],152:[2,342],156:[2,342],160:[2,342],164:[2,342],168:[2,342],173:[2,342],174:[2,342],175:[2,342],176:[2,342],177:[2,342],178:[2,342],179:[2,342],180:[2,342],181:[2,342],182:[2,342],183:[2,342],187:[2,342],188:[2,342],189:[2,342],190:[2,342],191:[2,342]},{2:[2,343],19:[2,343],21:[2,343],22:[2,343],25:[2,343],28:[2,343],31:[2,343],34:[2,343],36:[2,343],37:[2,343],39:[2,343],40:[2,343],41:[2,343],42:[2,343],43:[2,343],46:[2,343],47:[2,343],48:[2,343],49:[2,343],50:[2,343],51:[2,343],56:[2,343],57:[2,343],58:[2,343],59:[2,343],60:[2,343],65:[2,343],67:[2,343],73:[2,343],78:[2,343],81:[2,343],82:[2,343],93:[2,343],94:[2,343],105:[2,343],106:[2,343],111:[2,343],112:[2,343],113:[2,343],114:[2,343],115:[2,343],116:[2,343],117:[2,343],118:[2,343],119:[2,343],121:[2,343],122:[2,343],123:[2,343],128:[2,343],129:[2,343],130:[2,343],133:[2,343],134:[2,343],135:[2,343],136:[2,343],137:[2,343],141:[2,343],142:[2,343],143:[2,343],144:[2,343],148:[2,343],152:[2,343],156:[2,343],160:[2,343],164:[2,343],168:[2,343],173:[2,343],174:[2,343],175:[2,343],176:[2,343],177:[2,343],178:[2,343],179:[2,343],180:[2,343],181:[2,343],182:[2,343],183:[2,343],187:[2,343],188:[2,343],189:[2,343],190:[2,343],191:[2,343]},{2:[2,344],19:[2,344],21:[2,344],22:[2,344],25:[2,344],28:[2,344],31:[2,344],34:[2,344],36:[2,344],37:[2,344],39:[2,344],40:[2,344],41:[2,344],42:[2,344],43:[2,344],46:[2,344],47:[2,344],48:[2,344],49:[2,344],50:[2,344],51:[2,344],56:[2,344],57:[2,344],58:[2,344],59:[2,344],60:[2,344],65:[2,344],67:[2,344],73:[2,344],78:[2,344],81:[2,344],82:[2,344],93:[2,344],94:[2,344],105:[2,344],106:[2,344],111:[2,344],112:[2,344],113:[2,344],114:[2,344],115:[2,344],116:[2,344],117:[2,344],118:[2,344],119:[2,344],121:[2,344],122:[2,344],123:[2,344],128:[2,344],129:[2,344],130:[2,344],133:[2,344],134:[2,344],135:[2,344],136:[2,344],137:[2,344],141:[2,344],142:[2,344],143:[2,344],144:[2,344],148:[2,344],152:[2,344],156:[2,344],160:[2,344],164:[2,344],168:[2,344],173:[2,344],174:[2,344],175:[2,344],176:[2,344],177:[2,344],178:[2,344],179:[2,344],180:[2,344],181:[2,344],182:[2,344],183:[2,344],187:[2,344],188:[2,344],189:[2,344],190:[2,344],191:[2,344]},{2:[2,345],19:[2,345],21:[2,345],22:[2,345],25:[2,345],28:[2,345],31:[2,345],34:[2,345],36:[2,345],37:[2,345],39:[2,345],40:[2,345],41:[2,345],42:[2,345],43:[2,345],46:[2,345],47:[2,345],48:[2,345],49:[2,345],50:[2,345],51:[2,345],56:[2,345],57:[2,345],58:[2,345],59:[2,345],60:[2,345],65:[2,345],67:[2,345],73:[2,345],78:[2,345],81:[2,345],82:[2,345],93:[2,345],94:[2,345],105:[2,345],106:[2,345],111:[2,345],112:[2,345],113:[2,345],114:[2,345],115:[2,345],116:[2,345],117:[2,345],118:[2,345],119:[2,345],121:[2,345],122:[2,345],123:[2,345],128:[2,345],129:[2,345],130:[2,345],133:[2,345],134:[2,345],135:[2,345],136:[2,345],137:[2,345],141:[2,345],142:[2,345],143:[2,345],144:[2,345],148:[2,345],152:[2,345],156:[2,345],160:[2,345],164:[2,345],168:[2,345],173:[2,345],174:[2,345],175:[2,345],176:[2,345],177:[2,345],178:[2,345],179:[2,345],180:[2,345],181:[2,345],182:[2,345],183:[2,345],187:[2,345],188:[2,345],189:[2,345],190:[2,345],191:[2,345]},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:430,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:431,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:432,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:433,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:434,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:435,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:436,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:437,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69
	},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:438,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:439,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:440,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:441,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:442,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:443,122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:444,122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:445,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:446,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:447,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{25:[1,242],39:[1,448]},{19:[2,72],21:[2,72],22:[2,72],28:[2,72],34:[2,72],36:[2,72],37:[2,72],40:[2,72],41:[2,72],42:[2,72],43:[2,72],47:[2,72],48:[2,72],49:[2,72],50:[2,72],51:[2,72],56:[2,72],58:[2,72],59:[2,72],60:[2,72],65:[2,72],67:[2,72],73:[2,72],78:[2,72],81:[2,72],94:[2,72],105:[2,72],106:[2,72],111:[2,72],112:[2,72],113:[2,72],114:[2,72],115:[2,72],116:[2,72],117:[2,72],118:[2,72],119:[2,72],122:[2,72],174:[2,72],187:[2,72],188:[2,72],189:[2,72],190:[2,72],191:[2,72]},{25:[1,242],39:[1,449]},{19:[2,73],21:[2,73],22:[2,73],28:[2,73],34:[2,73],36:[2,73],37:[2,73],40:[2,73],41:[2,73],42:[2,73],43:[2,73],47:[2,73],48:[2,73],49:[2,73],50:[2,73],51:[2,73],56:[2,73],58:[2,73],59:[2,73],60:[2,73],65:[2,73],67:[2,73],73:[2,73],78:[2,73],81:[2,73],94:[2,73],105:[2,73],106:[2,73],111:[2,73],112:[2,73],113:[2,73],114:[2,73],115:[2,73],116:[2,73],117:[2,73],118:[2,73],119:[2,73],122:[2,73],174:[2,73],187:[2,73],188:[2,73],189:[2,73],190:[2,73],191:[2,73]},{19:[2,74],21:[2,74],22:[2,74],28:[2,74],34:[2,74],36:[2,74],37:[2,74],40:[2,74],41:[2,74],42:[2,74],43:[2,74],47:[2,74],48:[2,74],49:[2,74],50:[2,74],51:[2,74],56:[2,74],58:[2,74],59:[2,74],60:[2,74],65:[2,74],67:[2,74],73:[2,74],78:[2,74],81:[2,74],94:[2,74],105:[2,74],106:[2,74],111:[2,74],112:[2,74],113:[2,74],114:[2,74],115:[2,74],116:[2,74],117:[2,74],118:[2,74],119:[2,74],122:[2,74],174:[2,74],187:[2,74],188:[2,74],189:[2,74],190:[2,74],191:[2,74]},{19:[2,75],21:[2,75],22:[2,75],28:[2,75],34:[2,75],36:[2,75],37:[2,75],40:[2,75],41:[2,75],42:[2,75],43:[2,75],47:[2,75],48:[2,75],49:[2,75],50:[2,75],51:[2,75],56:[2,75],58:[2,75],59:[2,75],60:[2,75],62:450,64:[1,334],65:[2,75],67:[2,75],73:[2,75],78:[2,75],81:[2,75],94:[2,75],105:[2,75],106:[2,75],111:[2,75],112:[2,75],113:[2,75],114:[2,75],115:[2,75],116:[2,75],117:[2,75],118:[2,75],119:[2,75],122:[2,75],174:[2,75],187:[2,75],188:[2,75],189:[2,75],190:[2,75],191:[2,75]},{19:[2,76],21:[2,76],22:[2,76],28:[2,76],34:[2,76],36:[2,76],37:[2,76],40:[2,76],41:[2,76],42:[2,76],43:[2,76],47:[2,76],48:[2,76],49:[2,76],50:[2,76],51:[2,76],56:[2,76],58:[2,76],59:[2,76],60:[2,76],65:[2,76],67:[2,76],73:[2,76],78:[2,76],81:[2,76],94:[2,76],105:[2,76],106:[2,76],111:[2,76],112:[2,76],113:[2,76],114:[2,76],115:[2,76],116:[2,76],117:[2,76],118:[2,76],119:[2,76],122:[2,76],174:[2,76],187:[2,76],188:[2,76],189:[2,76],190:[2,76],191:[2,76]},{37:[1,451]},{4:452,19:[1,23]},{2:[2,278],25:[2,278],34:[2,278]},{2:[2,279],25:[2,279],34:[2,279]},{57:[1,453]},{2:[2,264],25:[2,264],34:[2,264],160:[1,252],164:[2,264],168:[2,264]},{25:[1,242],82:[1,454]},{2:[2,146],25:[2,146],31:[2,146],34:[2,146],37:[2,146],46:[2,146],81:[2,146],93:[2,146],105:[2,146],106:[2,146],116:[2,146],117:[2,146],121:[2,146],122:[2,146],123:[2,146],128:[2,146],129:[2,146],130:[2,146],133:[2,146],134:[2,146],135:[2,146],136:[2,146],137:[2,146],141:[2,146],142:[2,146],143:[2,146],144:[2,146],148:[2,146],152:[2,146],156:[2,146],160:[2,146],164:[2,146],168:[2,146],173:[2,146],174:[2,146],175:[2,146],176:[2,146],177:[2,146],178:[2,146],179:[2,146],180:[2,146],181:[2,146],182:[2,146],183:[2,146]},{2:[2,147],19:[2,147],21:[2,147],22:[2,147],25:[2,147],28:[2,147],31:[2,147],34:[2,147],36:[2,147],37:[2,147],39:[2,147],40:[2,147],41:[2,147],42:[2,147],43:[2,147],46:[2,147],47:[2,147],48:[2,147],49:[2,147],50:[2,147],51:[2,147],56:[2,147],57:[2,147],58:[2,147],59:[2,147],60:[2,147],65:[2,147],67:[2,147],73:[2,147],78:[2,147],81:[2,147],82:[2,147],93:[2,147],94:[2,147],105:[2,147],106:[2,147],111:[2,147],112:[2,147],113:[2,147],114:[2,147],115:[2,147],116:[2,147],117:[2,147],118:[2,147],119:[2,147],121:[2,147],122:[2,147],123:[2,147],128:[2,147],129:[2,147],130:[2,147],133:[2,147],134:[2,147],135:[2,147],136:[2,147],137:[2,147],141:[2,147],142:[2,147],143:[2,147],144:[2,147],148:[2,147],152:[2,147],156:[2,147],160:[2,147],164:[2,147],168:[2,147],173:[2,147],174:[2,147],175:[2,147],176:[2,147],177:[2,147],178:[2,147],179:[2,147],180:[2,147],181:[2,147],182:[2,147],183:[2,147],187:[2,147],188:[2,147],189:[2,147],190:[2,147],191:[2,147]},{2:[2,149],19:[2,149],21:[2,149],22:[2,149],25:[2,149],28:[2,149],31:[2,149],34:[2,149],36:[2,149],37:[2,149],39:[2,149],40:[2,149],41:[2,149],42:[2,149],43:[2,149],46:[2,149],47:[2,149],48:[2,149],49:[2,149],50:[2,149],51:[2,149],56:[2,149],57:[2,149],58:[2,149],59:[2,149],60:[2,149],65:[2,149],67:[2,149],73:[2,149],78:[2,149],81:[2,149],82:[2,149],93:[2,149],94:[2,149],105:[2,149],106:[2,149],111:[2,149],112:[2,149],113:[2,149],114:[2,149],115:[2,149],116:[2,149],117:[2,149],118:[2,149],119:[2,149],121:[2,149],122:[2,149],123:[2,149],128:[2,149],129:[2,149],130:[2,149],133:[2,149],134:[2,149],135:[2,149],136:[2,149],137:[2,149],141:[2,149],142:[2,149],143:[2,149],144:[2,149],148:[2,149],152:[2,149],156:[2,149],160:[2,149],164:[2,149],168:[2,149],173:[2,149],174:[2,149],175:[2,149],176:[2,149],177:[2,149],178:[2,149],179:[2,149],180:[2,149],181:[2,149],182:[2,149],183:[2,149],187:[2,149],188:[2,149],189:[2,149],190:[2,149],191:[2,149]},{25:[1,456],39:[1,455]},{25:[2,151],39:[2,151]},{2:[2,258],25:[2,258],34:[2,258],156:[1,258],160:[2,258],164:[2,258],168:[2,258]},{25:[1,242],82:[1,457]},{2:[2,133],25:[2,133],31:[2,133],34:[2,133],37:[2,133],46:[2,133],81:[2,133],93:[2,133],105:[2,133],106:[2,133],116:[2,133],117:[2,133],121:[2,133],122:[2,133],123:[2,133],128:[2,133],129:[2,133],130:[2,133],133:[2,133],134:[2,133],135:[2,133],136:[2,133],137:[2,133],141:[2,133],142:[2,133],143:[2,133],144:[2,133],148:[2,133],152:[2,133],156:[2,133],160:[2,133],164:[2,133],168:[2,133],173:[2,133],174:[2,133],175:[2,133],176:[2,133],177:[2,133],178:[2,133],179:[2,133],180:[2,133],181:[2,133],182:[2,133],183:[2,133]},{2:[2,134],25:[2,134],31:[2,134],34:[2,134],37:[2,134],46:[2,134],81:[2,134],93:[2,134],105:[2,134],106:[2,134],116:[2,134],117:[2,134],121:[2,134],122:[2,134],123:[2,134],128:[2,134],129:[2,134],130:[2,134],133:[2,134],134:[2,134],135:[2,134],136:[2,134],137:[2,134],141:[2,134],142:[2,134],143:[2,134],144:[2,134],148:[2,134],152:[2,134],156:[2,134],160:[2,134],164:[2,134],168:[2,134],173:[2,134],174:[2,134],175:[2,134],176:[2,134],177:[2,134],178:[2,134],179:[2,134],180:[2,134],181:[2,134],182:[2,134],183:[2,134]},{2:[2,252],25:[2,252],34:[2,252],152:[1,259],156:[2,252],160:[2,252],164:[2,252],168:[2,252]},{2:[2,246],25:[2,246],34:[2,246],148:[1,262],152:[2,246],156:[2,246],160:[2,246],164:[2,246],168:[2,246]},{2:[2,102],19:[2,102],21:[2,102],22:[2,102],25:[2,102],28:[2,102],31:[2,102],34:[2,102],36:[2,102],37:[2,102],39:[2,102],40:[2,102],41:[2,102],42:[2,102],43:[2,102],46:[2,102],47:[2,102],48:[2,102],49:[2,102],50:[2,102],51:[2,102],56:[2,102],57:[2,102],58:[2,102],59:[2,102],60:[2,102],65:[2,102],67:[2,102],73:[2,102],78:[2,102],81:[2,102],82:[2,102],93:[2,102],94:[2,102],105:[2,102],106:[2,102],111:[2,102],112:[2,102],113:[2,102],114:[2,102],115:[2,102],116:[2,102],117:[2,102],118:[2,102],119:[2,102],121:[2,102],122:[2,102],123:[2,102],128:[2,102],129:[2,102],130:[2,102],133:[2,102],134:[2,102],135:[2,102],136:[2,102],137:[2,102],141:[2,102],142:[2,102],143:[2,102],144:[2,102],148:[2,102],152:[2,102],156:[2,102],160:[2,102],164:[2,102],168:[2,102],173:[2,102],174:[2,102],175:[2,102],176:[2,102],177:[2,102],178:[2,102],179:[2,102],180:[2,102],181:[2,102],182:[2,102],183:[2,102],187:[2,102],188:[2,102],189:[2,102],190:[2,102],191:[2,102]},{2:[2,240],25:[2,240],34:[2,240],141:[1,308],142:[1,309],143:[1,310],144:[1,311],148:[2,240],152:[2,240],156:[2,240],160:[2,240],164:[2,240],168:[2,240]},{2:[2,104],19:[2,104],21:[2,104],22:[2,104],25:[2,104],28:[2,104],31:[2,104],34:[2,104],36:[2,104],37:[2,104],39:[2,104],40:[2,104],41:[2,104],42:[2,104],43:[2,104],46:[2,104],47:[2,104],48:[2,104],49:[2,104],50:[2,104],51:[2,104],56:[2,104],57:[2,104],58:[2,104],59:[2,104],60:[2,104],65:[2,104],67:[2,104],73:[2,104],78:[2,104],81:[2,104],82:[2,104],93:[2,104],94:[2,104],105:[2,104],106:[2,104],111:[2,104],112:[2,104],113:[2,104],114:[2,104],115:[2,104],116:[2,104],117:[2,104],118:[2,104],119:[2,104],121:[2,104],122:[2,104],123:[2,104],128:[2,104],129:[2,104],130:[2,104],133:[2,104],134:[2,104],135:[2,104],136:[2,104],137:[2,104],141:[2,104],142:[2,104],143:[2,104],144:[2,104],148:[2,104],152:[2,104],156:[2,104],160:[2,104],164:[2,104],168:[2,104],173:[2,104],174:[2,104],175:[2,104],176:[2,104],177:[2,104],178:[2,104],179:[2,104],180:[2,104],181:[2,104],182:[2,104],183:[2,104],187:[2,104],188:[2,104],189:[2,104],190:[2,104],191:[2,104]},{19:[2,113],25:[2,113],28:[2,113],37:[2,113],67:[2,113],78:[2,113],81:[2,113],82:[2,113],94:[2,113],105:[2,113],106:[2,113],111:[2,113],112:[2,113],113:[2,113],114:[2,113],115:[2,113],116:[2,113],117:[2,113],118:[2,113],119:[2,113],122:[2,113],174:[2,113],187:[2,113],188:[2,113],189:[2,113],190:[2,113],191:[2,113]},{25:[2,109],82:[2,109]},{2:[2,105],19:[2,105],21:[2,105],22:[2,105],25:[2,105],28:[2,105],31:[2,105],34:[2,105],36:[2,105],37:[2,105],39:[2,105],40:[2,105],41:[2,105],42:[2,105],43:[2,105],46:[2,105],47:[2,105],48:[2,105],49:[2,105],50:[2,105],51:[2,105],56:[2,105],57:[2,105],58:[2,105],59:[2,105],60:[2,105],65:[2,105],67:[2,105],73:[2,105],78:[2,105],81:[2,105],82:[2,105],93:[2,105],94:[2,105],105:[2,105],106:[2,105],111:[2,105],112:[2,105],113:[2,105],114:[2,105],115:[2,105],116:[2,105],117:[2,105],118:[2,105],119:[2,105],121:[2,105],122:[2,105],123:[2,105],128:[2,105],129:[2,105],130:[2,105],133:[2,105],134:[2,105],135:[2,105],136:[2,105],137:[2,105],141:[2,105],142:[2,105],143:[2,105],144:[2,105],148:[2,105],152:[2,105],156:[2,105],160:[2,105],164:[2,105],168:[2,105],173:[2,105],174:[2,105],175:[2,105],176:[2,105],177:[2,105],178:[2,105],179:[2,105],180:[2,105],181:[2,105],182:[2,105],183:[2,105],187:[2,105],188:[2,105],189:[2,105],190:[2,105],191:[2,105]},{19:[1,129],25:[1,179],28:[1,128],32:460,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],82:[1,458],83:459,90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,231],25:[2,231],34:[2,231],46:[1,317],133:[1,312],134:[1,313],135:[1,314],136:[1,315],137:[1,316],141:[2,231],142:[2,231],143:[2,231],144:[2,231],148:[2,231],152:[2,231],156:[2,231],160:[2,231],164:[2,231],168:[2,231]},{2:[2,232],25:[2,232],34:[2,232],46:[1,317],133:[1,312],134:[1,313],135:[1,314],136:[1,315],137:[1,316],141:[2,232],142:[2,232],143:[2,232],144:[2,232],148:[2,232],152:[2,232],156:[2,232],160:[2,232],164:[2,232],168:[2,232]},{2:[2,233],25:[2,233],34:[2,233],46:[1,317],133:[1,312],134:[1,313],135:[1,314],136:[1,315],137:[1,316],141:[2,233],142:[2,233],143:[2,233],144:[2,233],148:[2,233],152:[2,233],156:[2,233],160:[2,233],164:[2,233],168:[2,233]},{2:[2,234],25:[2,234],34:[2,234],46:[1,317],133:[1,312],134:[1,313],135:[1,314],136:[1,315],137:[1,316],141:[2,234],142:[2,234],143:[2,234],144:[2,234],148:[2,234],152:[2,234],156:[2,234],160:[2,234],164:[2,234],168:[2,234]},{2:[2,214],25:[2,214],34:[2,214],46:[2,214],128:[1,318],129:[1,319],130:[1,320],133:[2,214],134:[2,214],135:[2,214],136:[2,214],137:[2,214],141:[2,214],142:[2,214],143:[2,214],144:[2,214],148:[2,214],152:[2,214],156:[2,214],160:[2,214],164:[2,214],168:[2,214]},{2:[2,215],25:[2,215],34:[2,215],46:[2,215],128:[1,318],129:[1,319],130:[1,320],133:[2,215],134:[2,215],135:[2,215],136:[2,215],137:[2,215],141:[2,215],142:[2,215],143:[2,215],144:[2,215],148:[2,215],152:[2,215],156:[2,215],160:[2,215],164:[2,215],168:[2,215]},{2:[2,216],25:[2,216],34:[2,216],46:[2,216],128:[1,318],129:[1,319],130:[1,320],133:[2,216],134:[2,216],135:[2,216],136:[2,216],137:[2,216],141:[2,216],142:[2,216],143:[2,216],144:[2,216],148:[2,216],152:[2,216],156:[2,216],160:[2,216],164:[2,216],168:[2,216]},{2:[2,217],25:[2,217],34:[2,217],46:[2,217],128:[1,318],129:[1,319],130:[1,320],133:[2,217],134:[2,217],135:[2,217],136:[2,217],137:[2,217],141:[2,217],142:[2,217],143:[2,217],144:[2,217],148:[2,217],152:[2,217],156:[2,217],160:[2,217],164:[2,217],168:[2,217]},{2:[2,218],25:[2,218],34:[2,218],46:[2,218],128:[1,318],129:[1,319],130:[1,320],133:[2,218],134:[2,218],135:[2,218],136:[2,218],137:[2,218],141:[2,218],142:[2,218],143:[2,218],144:[2,218],148:[2,218],152:[2,218],156:[2,218],160:[2,218],164:[2,218],168:[2,218]},{2:[2,219],25:[2,219],34:[2,219],46:[2,219],128:[1,318],129:[1,319],130:[1,320],133:[2,219],134:[2,219],135:[2,219],136:[2,219],137:[2,219],141:[2,219],142:[2,219],143:[2,219],144:[2,219],148:[2,219],152:[2,219],156:[2,219],160:[2,219],164:[2,219],168:[2,219]},{2:[2,197],25:[2,197],34:[2,197],46:[2,197],116:[1,321],117:[1,322],128:[2,197],129:[2,197],130:[2,197],133:[2,197],134:[2,197],135:[2,197],136:[2,197],137:[2,197],141:[2,197],142:[2,197],143:[2,197],144:[2,197],148:[2,197],152:[2,197],156:[2,197],160:[2,197],164:[2,197],168:[2,197]},{2:[2,198],25:[2,198],34:[2,198],46:[2,198],116:[1,321],117:[1,322],128:[2,198],129:[2,198],130:[2,198],133:[2,198],134:[2,198],135:[2,198],136:[2,198],137:[2,198],141:[2,198],142:[2,198],143:[2,198],144:[2,198],148:[2,198],152:[2,198],156:[2,198],160:[2,198],164:[2,198],168:[2,198]},{2:[2,199],25:[2,199],34:[2,199],46:[2,199],116:[1,321],117:[1,322],128:[2,199],129:[2,199],130:[2,199],133:[2,199],134:[2,199],135:[2,199],136:[2,199],137:[2,199],141:[2,199],142:[2,199],143:[2,199],144:[2,199],148:[2,199],152:[2,199],156:[2,199],160:[2,199],164:[2,199],168:[2,199]},{2:[2,190],25:[2,190],34:[2,190],46:[2,190],116:[2,190],117:[2,190],121:[1,323],122:[1,324],123:[1,325],128:[2,190],129:[2,190],130:[2,190],133:[2,190],134:[2,190],135:[2,190],136:[2,190],137:[2,190],141:[2,190],142:[2,190],143:[2,190],144:[2,190],148:[2,190],152:[2,190],156:[2,190],160:[2,190],164:[2,190],168:[2,190]},{2:[2,191],25:[2,191],34:[2,191],46:[2,191],116:[2,191],117:[2,191],121:[1,323],122:[1,324],123:[1,325],128:[2,191],129:[2,191],130:[2,191],133:[2,191],134:[2,191],135:[2,191],136:[2,191],137:[2,191],141:[2,191],142:[2,191],143:[2,191],144:[2,191],148:[2,191],152:[2,191],156:[2,191],160:[2,191],164:[2,191],168:[2,191]},{2:[2,183],25:[2,183],34:[2,183],46:[2,183],116:[2,183],117:[2,183],121:[2,183],122:[2,183],123:[2,183],128:[2,183],129:[2,183],130:[2,183],133:[2,183],134:[2,183],135:[2,183],136:[2,183],137:[2,183],141:[2,183],142:[2,183],143:[2,183],144:[2,183],148:[2,183],152:[2,183],156:[2,183],160:[2,183],164:[2,183],168:[2,183]},{2:[2,184],25:[2,184],34:[2,184],46:[2,184],116:[2,184],117:[2,184],121:[2,184],122:[2,184],123:[2,184],128:[2,184],129:[2,184],130:[2,184],133:[2,184],134:[2,184],135:[2,184],136:[2,184],137:[2,184],141:[2,184],142:[2,184],143:[2,184],144:[2,184],148:[2,184],152:[2,184],156:[2,184],160:[2,184],164:[2,184],168:[2,184]},{2:[2,185],25:[2,185],34:[2,185],46:[2,185],116:[2,185],117:[2,185],121:[2,185],122:[2,185],123:[2,185],128:[2,185],129:[2,185],130:[2,185],133:[2,185],134:[2,185],135:[2,185],136:[2,185],137:[2,185],141:[2,185],142:[2,185],143:[2,185],144:[2,185],148:[2,185],152:[2,185],156:[2,185],160:[2,185],164:[2,185],168:[2,185]},{19:[1,461]},{25:[1,463],39:[1,462]},{25:[2,88],39:[2,88]},{19:[2,21],21:[2,21],22:[2,21],25:[2,21],28:[2,21],34:[2,21],36:[2,21],37:[2,21],40:[2,21],41:[2,21],42:[2,21],43:[2,21],47:[2,21],48:[2,21],49:[2,21],50:[2,21],51:[2,21],56:[2,21],58:[2,21],59:[2,21],60:[2,21],65:[2,21],67:[2,21],73:[2,21],78:[2,21],81:[2,21],94:[2,21],105:[2,21],106:[2,21],111:[2,21],112:[2,21],113:[2,21],114:[2,21],115:[2,21],116:[2,21],117:[2,21],118:[2,21],119:[2,21],122:[2,21],174:[2,21],187:[2,21],188:[2,21],189:[2,21],190:[2,21],191:[2,21]},{19:[2,28],21:[2,28],22:[2,28],25:[2,28],28:[2,28],34:[2,28],36:[2,28],37:[2,28],40:[2,28],41:[2,28],42:[2,28],43:[2,28],47:[2,28],48:[2,28],49:[2,28],50:[2,28],51:[2,28],56:[2,28],58:[2,28],59:[2,28],60:[2,28],65:[2,28],67:[2,28],73:[2,28],78:[2,28],81:[2,28],94:[2,28],105:[2,28],106:[2,28],111:[2,28],112:[2,28],113:[2,28],114:[2,28],115:[2,28],116:[2,28],117:[2,28],118:[2,28],119:[2,28],122:[2,28],174:[2,28],187:[2,28],188:[2,28],189:[2,28],190:[2,28],191:[2,28]},{3:464,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],32:111,37:[1,55],38:465,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{3:466,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],32:111,34:[1,468],37:[1,55],38:467,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],33:469,37:[1,55],45:470,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:234,145:233,149:232,153:231,157:230,161:229,165:228,169:227,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{25:[1,242],34:[1,471]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:472,39:[1,473],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{25:[1,475],34:[1,474]},{25:[2,22],34:[2,22],46:[1,476]},{25:[2,26],30:477,31:[1,478],34:[2,26],46:[2,26]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:479,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],33:480,37:[1,55],45:470,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:234,145:233,149:232,153:231,157:230,161:229,165:228,169:227,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],33:481,37:[1,55],45:470,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:234,145:233,149:232,153:231,157:230,161:229,165:228,169:227,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],32:482,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:234,145:233,149:232,153:231,157:230,161:483,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:234,145:233,149:232,153:231,157:484,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:234,145:233,149:232,153:485,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:234,145:233,149:486,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:234,145:487,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:488,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:489,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:490,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:491,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:492,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:493,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:494,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:495,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],37:[1,55],45:201,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],
	120:134,122:[1,71],125:133,127:496,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,292],25:[2,292],34:[2,292],39:[2,292],57:[2,292],82:[2,292]},{2:[2,272],19:[2,272],21:[2,272],22:[2,272],25:[2,272],28:[2,272],34:[2,272],36:[2,272],37:[2,272],39:[2,272],40:[2,272],41:[2,272],42:[2,272],43:[2,272],47:[2,272],48:[2,272],49:[2,272],50:[2,272],51:[2,272],56:[2,272],57:[2,272],58:[2,272],59:[2,272],60:[2,272],65:[2,272],67:[2,272],73:[2,272],78:[2,272],81:[2,272],82:[2,272],94:[2,272],105:[2,272],106:[2,272],111:[2,272],112:[2,272],113:[2,272],114:[2,272],115:[2,272],116:[2,272],117:[2,272],118:[2,272],119:[2,272],122:[2,272],174:[2,272],187:[2,272],188:[2,272],189:[2,272],190:[2,272],191:[2,272]},{2:[2,273],19:[2,273],21:[2,273],22:[2,273],25:[2,273],28:[2,273],34:[2,273],36:[2,273],37:[2,273],39:[2,273],40:[2,273],41:[2,273],42:[2,273],43:[2,273],47:[2,273],48:[2,273],49:[2,273],50:[2,273],51:[2,273],56:[2,273],57:[2,273],58:[2,273],59:[2,273],60:[2,273],65:[2,273],67:[2,273],73:[2,273],78:[2,273],81:[2,273],82:[2,273],94:[2,273],105:[2,273],106:[2,273],111:[2,273],112:[2,273],113:[2,273],114:[2,273],115:[2,273],116:[2,273],117:[2,273],118:[2,273],119:[2,273],122:[2,273],174:[2,273],187:[2,273],188:[2,273],189:[2,273],190:[2,273],191:[2,273]},{57:[1,497]},{2:[2,260],19:[2,260],21:[2,260],22:[2,260],25:[2,260],28:[2,260],34:[2,260],36:[2,260],37:[2,260],39:[2,260],40:[2,260],41:[2,260],42:[2,260],43:[2,260],47:[2,260],48:[2,260],49:[2,260],50:[2,260],51:[2,260],56:[2,260],57:[2,260],58:[2,260],59:[2,260],60:[2,260],65:[2,260],67:[2,260],73:[2,260],78:[2,260],81:[2,260],82:[2,260],94:[2,260],105:[2,260],106:[2,260],111:[2,260],112:[2,260],113:[2,260],114:[2,260],115:[2,260],116:[2,260],117:[2,260],118:[2,260],119:[2,260],122:[2,260],160:[1,252],164:[2,260],168:[2,260],174:[2,260],187:[2,260],188:[2,260],189:[2,260],190:[2,260],191:[2,260]},{25:[1,242],82:[1,498]},{2:[2,142],19:[2,142],21:[2,142],22:[2,142],25:[2,142],28:[2,142],31:[2,142],34:[2,142],36:[2,142],37:[2,142],39:[2,142],40:[2,142],41:[2,142],42:[2,142],43:[2,142],46:[2,142],47:[2,142],48:[2,142],49:[2,142],50:[2,142],51:[2,142],56:[2,142],57:[2,142],58:[2,142],59:[2,142],60:[2,142],65:[2,142],67:[2,142],73:[2,142],78:[2,142],81:[2,142],82:[2,142],93:[2,142],94:[2,142],105:[2,142],106:[2,142],111:[2,142],112:[2,142],113:[2,142],114:[2,142],115:[2,142],116:[2,142],117:[2,142],118:[2,142],119:[2,142],121:[2,142],122:[2,142],123:[2,142],128:[2,142],129:[2,142],130:[2,142],133:[2,142],134:[2,142],135:[2,142],136:[2,142],137:[2,142],141:[2,142],142:[2,142],143:[2,142],144:[2,142],148:[2,142],152:[2,142],156:[2,142],160:[2,142],164:[2,142],168:[2,142],173:[2,142],174:[2,142],175:[2,142],176:[2,142],177:[2,142],178:[2,142],179:[2,142],180:[2,142],181:[2,142],182:[2,142],183:[2,142],187:[2,142],188:[2,142],189:[2,142],190:[2,142],191:[2,142]},{2:[2,254],19:[2,254],21:[2,254],22:[2,254],25:[2,254],28:[2,254],34:[2,254],36:[2,254],37:[2,254],39:[2,254],40:[2,254],41:[2,254],42:[2,254],43:[2,254],47:[2,254],48:[2,254],49:[2,254],50:[2,254],51:[2,254],56:[2,254],57:[2,254],58:[2,254],59:[2,254],60:[2,254],65:[2,254],67:[2,254],73:[2,254],78:[2,254],81:[2,254],82:[2,254],94:[2,254],105:[2,254],106:[2,254],111:[2,254],112:[2,254],113:[2,254],114:[2,254],115:[2,254],116:[2,254],117:[2,254],118:[2,254],119:[2,254],122:[2,254],156:[1,258],160:[2,254],164:[2,254],168:[2,254],174:[2,254],187:[2,254],188:[2,254],189:[2,254],190:[2,254],191:[2,254]},{25:[1,242],82:[1,499]},{2:[2,129],19:[2,129],21:[2,129],22:[2,129],25:[2,129],28:[2,129],31:[2,129],34:[2,129],36:[2,129],37:[2,129],39:[2,129],40:[2,129],41:[2,129],42:[2,129],43:[2,129],46:[2,129],47:[2,129],48:[2,129],49:[2,129],50:[2,129],51:[2,129],56:[2,129],57:[2,129],58:[2,129],59:[2,129],60:[2,129],65:[2,129],67:[2,129],73:[2,129],78:[2,129],81:[2,129],82:[2,129],93:[2,129],94:[2,129],105:[2,129],106:[2,129],111:[2,129],112:[2,129],113:[2,129],114:[2,129],115:[2,129],116:[2,129],117:[2,129],118:[2,129],119:[2,129],121:[2,129],122:[2,129],123:[2,129],128:[2,129],129:[2,129],130:[2,129],133:[2,129],134:[2,129],135:[2,129],136:[2,129],137:[2,129],141:[2,129],142:[2,129],143:[2,129],144:[2,129],148:[2,129],152:[2,129],156:[2,129],160:[2,129],164:[2,129],168:[2,129],173:[2,129],174:[2,129],175:[2,129],176:[2,129],177:[2,129],178:[2,129],179:[2,129],180:[2,129],181:[2,129],182:[2,129],183:[2,129],187:[2,129],188:[2,129],189:[2,129],190:[2,129],191:[2,129]},{2:[2,130],19:[2,130],21:[2,130],22:[2,130],25:[2,130],28:[2,130],31:[2,130],34:[2,130],36:[2,130],37:[2,130],39:[2,130],40:[2,130],41:[2,130],42:[2,130],43:[2,130],46:[2,130],47:[2,130],48:[2,130],49:[2,130],50:[2,130],51:[2,130],56:[2,130],57:[2,130],58:[2,130],59:[2,130],60:[2,130],65:[2,130],67:[2,130],73:[2,130],78:[2,130],81:[2,130],82:[2,130],93:[2,130],94:[2,130],105:[2,130],106:[2,130],111:[2,130],112:[2,130],113:[2,130],114:[2,130],115:[2,130],116:[2,130],117:[2,130],118:[2,130],119:[2,130],121:[2,130],122:[2,130],123:[2,130],128:[2,130],129:[2,130],130:[2,130],133:[2,130],134:[2,130],135:[2,130],136:[2,130],137:[2,130],141:[2,130],142:[2,130],143:[2,130],144:[2,130],148:[2,130],152:[2,130],156:[2,130],160:[2,130],164:[2,130],168:[2,130],173:[2,130],174:[2,130],175:[2,130],176:[2,130],177:[2,130],178:[2,130],179:[2,130],180:[2,130],181:[2,130],182:[2,130],183:[2,130],187:[2,130],188:[2,130],189:[2,130],190:[2,130],191:[2,130]},{2:[2,248],19:[2,248],21:[2,248],22:[2,248],25:[2,248],28:[2,248],34:[2,248],36:[2,248],37:[2,248],39:[2,248],40:[2,248],41:[2,248],42:[2,248],43:[2,248],47:[2,248],48:[2,248],49:[2,248],50:[2,248],51:[2,248],56:[2,248],57:[2,248],58:[2,248],59:[2,248],60:[2,248],65:[2,248],67:[2,248],73:[2,248],78:[2,248],81:[2,248],82:[2,248],94:[2,248],105:[2,248],106:[2,248],111:[2,248],112:[2,248],113:[2,248],114:[2,248],115:[2,248],116:[2,248],117:[2,248],118:[2,248],119:[2,248],122:[2,248],152:[1,259],156:[2,248],160:[2,248],164:[2,248],168:[2,248],174:[2,248],187:[2,248],188:[2,248],189:[2,248],190:[2,248],191:[2,248]},{2:[2,242],19:[2,242],21:[2,242],22:[2,242],25:[2,242],28:[2,242],34:[2,242],36:[2,242],37:[2,242],39:[2,242],40:[2,242],41:[2,242],42:[2,242],43:[2,242],47:[2,242],48:[2,242],49:[2,242],50:[2,242],51:[2,242],56:[2,242],57:[2,242],58:[2,242],59:[2,242],60:[2,242],65:[2,242],67:[2,242],73:[2,242],78:[2,242],81:[2,242],82:[2,242],94:[2,242],105:[2,242],106:[2,242],111:[2,242],112:[2,242],113:[2,242],114:[2,242],115:[2,242],116:[2,242],117:[2,242],118:[2,242],119:[2,242],122:[2,242],148:[1,262],152:[2,242],156:[2,242],160:[2,242],164:[2,242],168:[2,242],174:[2,242],187:[2,242],188:[2,242],189:[2,242],190:[2,242],191:[2,242]},{28:[1,378],39:[1,500],69:501},{19:[1,502]},{25:[1,463],39:[1,503]},{2:[2,236],19:[2,236],21:[2,236],22:[2,236],25:[2,236],28:[2,236],34:[2,236],36:[2,236],37:[2,236],39:[2,236],40:[2,236],41:[2,236],42:[2,236],43:[2,236],47:[2,236],48:[2,236],49:[2,236],50:[2,236],51:[2,236],56:[2,236],57:[2,236],58:[2,236],59:[2,236],60:[2,236],65:[2,236],67:[2,236],73:[2,236],78:[2,236],81:[2,236],82:[2,236],94:[2,236],105:[2,236],106:[2,236],111:[2,236],112:[2,236],113:[2,236],114:[2,236],115:[2,236],116:[2,236],117:[2,236],118:[2,236],119:[2,236],122:[2,236],141:[1,308],142:[1,309],143:[1,310],144:[1,311],148:[2,236],152:[2,236],156:[2,236],160:[2,236],164:[2,236],168:[2,236],174:[2,236],187:[2,236],188:[2,236],189:[2,236],190:[2,236],191:[2,236]},{2:[2,115],19:[2,115],21:[2,115],22:[2,115],25:[2,115],28:[2,115],31:[2,115],34:[2,115],36:[2,115],37:[2,115],39:[2,115],40:[2,115],41:[2,115],42:[2,115],43:[2,115],46:[2,115],47:[2,115],48:[2,115],49:[2,115],50:[2,115],51:[2,115],56:[2,115],57:[2,115],58:[2,115],59:[2,115],60:[2,115],65:[2,115],67:[2,115],73:[2,115],78:[2,115],81:[2,115],82:[2,115],93:[2,115],94:[2,115],105:[2,115],106:[2,115],111:[2,115],112:[2,115],113:[2,115],114:[2,115],115:[2,115],116:[2,115],117:[2,115],118:[2,115],119:[2,115],121:[2,115],122:[2,115],123:[2,115],128:[2,115],129:[2,115],130:[2,115],133:[2,115],134:[2,115],135:[2,115],136:[2,115],137:[2,115],141:[2,115],142:[2,115],143:[2,115],144:[2,115],148:[2,115],152:[2,115],156:[2,115],160:[2,115],164:[2,115],168:[2,115],173:[2,115],174:[2,115],175:[2,115],176:[2,115],177:[2,115],178:[2,115],179:[2,115],180:[2,115],181:[2,115],182:[2,115],183:[2,115],187:[2,115],188:[2,115],189:[2,115],190:[2,115],191:[2,115]},{21:[1,504],22:[1,294],28:[1,267],36:[1,284],40:[1,280],41:[1,279],42:[1,296],43:[1,282],46:[1,285],47:[1,275],48:[1,272],49:[1,288],50:[1,297],51:[1,289],56:[1,273],58:[1,277],59:[1,291],60:[1,292],63:[1,274],64:[1,281],65:[1,276],67:[1,283],78:[1,290],86:505,87:266,89:268,90:269,91:270,94:[1,287],101:271,111:[1,278],112:[1,295],113:[1,293],137:[1,286],187:[1,300],188:[1,298],189:[1,299],190:[1,67],191:[1,68],194:[1,301],195:[1,302],196:[1,303],197:[1,304],198:[1,305],199:[1,306],200:[1,307]},{19:[1,129],28:[1,128],32:506,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{37:[1,507]},{2:[2,221],19:[2,221],21:[2,221],22:[2,221],25:[2,221],28:[2,221],34:[2,221],36:[2,221],37:[2,221],39:[2,221],40:[2,221],41:[2,221],42:[2,221],43:[2,221],46:[1,317],47:[2,221],48:[2,221],49:[2,221],50:[2,221],51:[2,221],56:[2,221],57:[2,221],58:[2,221],59:[2,221],60:[2,221],65:[2,221],67:[2,221],73:[2,221],78:[2,221],81:[2,221],82:[2,221],94:[2,221],105:[2,221],106:[2,221],111:[2,221],112:[2,221],113:[2,221],114:[2,221],115:[2,221],116:[2,221],117:[2,221],118:[2,221],119:[2,221],122:[2,221],133:[1,312],134:[1,313],135:[1,314],136:[1,315],137:[1,316],141:[2,221],142:[2,221],143:[2,221],144:[2,221],148:[2,221],152:[2,221],156:[2,221],160:[2,221],164:[2,221],168:[2,221],174:[2,221],187:[2,221],188:[2,221],189:[2,221],190:[2,221],191:[2,221]},{2:[2,222],19:[2,222],21:[2,222],22:[2,222],25:[2,222],28:[2,222],34:[2,222],36:[2,222],37:[2,222],39:[2,222],40:[2,222],41:[2,222],42:[2,222],43:[2,222],46:[1,317],47:[2,222],48:[2,222],49:[2,222],50:[2,222],51:[2,222],56:[2,222],57:[2,222],58:[2,222],59:[2,222],60:[2,222],65:[2,222],67:[2,222],73:[2,222],78:[2,222],81:[2,222],82:[2,222],94:[2,222],105:[2,222],106:[2,222],111:[2,222],112:[2,222],113:[2,222],114:[2,222],115:[2,222],116:[2,222],117:[2,222],118:[2,222],119:[2,222],122:[2,222],133:[1,312],134:[1,313],135:[1,314],136:[1,315],137:[1,316],141:[2,222],142:[2,222],143:[2,222],144:[2,222],148:[2,222],152:[2,222],156:[2,222],160:[2,222],164:[2,222],168:[2,222],174:[2,222],187:[2,222],188:[2,222],189:[2,222],190:[2,222],191:[2,222]},{2:[2,223],19:[2,223],21:[2,223],22:[2,223],25:[2,223],28:[2,223],34:[2,223],36:[2,223],37:[2,223],39:[2,223],40:[2,223],41:[2,223],42:[2,223],43:[2,223],46:[1,317],47:[2,223],48:[2,223],49:[2,223],50:[2,223],51:[2,223],56:[2,223],57:[2,223],58:[2,223],59:[2,223],60:[2,223],65:[2,223],67:[2,223],73:[2,223],78:[2,223],81:[2,223],82:[2,223],94:[2,223],105:[2,223],106:[2,223],111:[2,223],112:[2,223],113:[2,223],114:[2,223],115:[2,223],116:[2,223],117:[2,223],118:[2,223],119:[2,223],122:[2,223],133:[1,312],134:[1,313],135:[1,314],136:[1,315],137:[1,316],141:[2,223],142:[2,223],143:[2,223],144:[2,223],148:[2,223],152:[2,223],156:[2,223],160:[2,223],164:[2,223],168:[2,223],174:[2,223],187:[2,223],188:[2,223],189:[2,223],190:[2,223],191:[2,223]},{2:[2,224],19:[2,224],21:[2,224],22:[2,224],25:[2,224],28:[2,224],34:[2,224],36:[2,224],37:[2,224],39:[2,224],40:[2,224],41:[2,224],42:[2,224],43:[2,224],46:[1,317],47:[2,224],48:[2,224],49:[2,224],50:[2,224],51:[2,224],56:[2,224],57:[2,224],58:[2,224],59:[2,224],60:[2,224],65:[2,224],67:[2,224],73:[2,224],78:[2,224],81:[2,224],82:[2,224],94:[2,224],105:[2,224],106:[2,224],111:[2,224],112:[2,224],113:[2,224],114:[2,224],115:[2,224],116:[2,224],117:[2,224],118:[2,224],119:[2,224],122:[2,224],133:[1,312],134:[1,313],135:[1,314],136:[1,315],137:[1,316],141:[2,224],142:[2,224],143:[2,224],144:[2,224],148:[2,224],152:[2,224],156:[2,224],160:[2,224],164:[2,224],168:[2,224],174:[2,224],187:[2,224],188:[2,224],189:[2,224],190:[2,224],191:[2,224]},{2:[2,201],19:[2,201],21:[2,201],22:[2,201],25:[2,201],28:[2,201],34:[2,201],36:[2,201],37:[2,201],39:[2,201],40:[2,201],41:[2,201],42:[2,201],43:[2,201],46:[2,201],47:[2,201],48:[2,201],49:[2,201],50:[2,201],51:[2,201],56:[2,201],57:[2,201],58:[2,201],59:[2,201],60:[2,201],65:[2,201],67:[2,201],73:[2,201],78:[2,201],81:[2,201],82:[2,201],94:[2,201],105:[2,201],106:[2,201],111:[2,201],112:[2,201],113:[2,201],114:[2,201],115:[2,201],116:[2,201],117:[2,201],118:[2,201],119:[2,201],122:[2,201],128:[1,318],129:[1,319],130:[1,320],133:[2,201],134:[2,201],135:[2,201],136:[2,201],137:[2,201],141:[2,201],142:[2,201],143:[2,201],144:[2,201],148:[2,201],152:[2,201],156:[2,201],160:[2,201],164:[2,201],168:[2,201],174:[2,201],187:[2,201],188:[2,201],189:[2,201],190:[2,201],191:[2,201]},{2:[2,202],19:[2,202],21:[2,202],22:[2,202],25:[2,202],28:[2,202],34:[2,202],36:[2,202],37:[2,202],39:[2,202],40:[2,202],41:[2,202],42:[2,202],43:[2,202],46:[2,202],47:[2,202],48:[2,202],49:[2,202],50:[2,202],51:[2,202],56:[2,202],57:[2,202],58:[2,202],59:[2,202],60:[2,202],65:[2,202],67:[2,202],73:[2,202],78:[2,202],81:[2,202],82:[2,202],94:[2,202],105:[2,202],106:[2,202],111:[2,202],112:[2,202],113:[2,202],114:[2,202],115:[2,202],116:[2,202],117:[2,202],118:[2,202],119:[2,202],122:[2,202],128:[1,318],129:[1,319],130:[1,320],133:[2,202],134:[2,202],135:[2,202],136:[2,202],137:[2,202],141:[2,202],142:[2,202],143:[2,202],144:[2,202],148:[2,202],152:[2,202],156:[2,202],160:[2,202],164:[2,202],168:[2,202],174:[2,202],187:[2,202],188:[2,202],189:[2,202],190:[2,202],191:[2,202]},{2:[2,203],19:[2,203],21:[2,203],22:[2,203],25:[2,203],28:[2,203],34:[2,203],36:[2,203],37:[2,203],39:[2,203],40:[2,203],41:[2,203],42:[2,203],43:[2,203],46:[2,203],47:[2,203],48:[2,203],49:[2,203],50:[2,203],51:[2,203],56:[2,203],57:[2,203],58:[2,203],59:[2,203],60:[2,203],65:[2,203],67:[2,203],73:[2,203],78:[2,203],81:[2,203],82:[2,203],94:[2,203],105:[2,203],106:[2,203],111:[2,203],112:[2,203],113:[2,203],114:[2,203],115:[2,203],116:[2,203],117:[2,203],118:[2,203],119:[2,203],122:[2,203],128:[1,318],129:[1,319],130:[1,320],133:[2,203],134:[2,203],135:[2,203],136:[2,203],137:[2,203],141:[2,203],142:[2,203],143:[2,203],144:[2,203],148:[2,203],152:[2,203],156:[2,203],160:[2,203],164:[2,203],168:[2,203],174:[2,203],187:[2,203],188:[2,203],189:[2,203],190:[2,203],191:[2,203]},{2:[2,204],19:[2,204],21:[2,204],22:[2,204],25:[2,204],28:[2,204],34:[2,204],36:[2,204],37:[2,204],39:[2,204],40:[2,204],41:[2,204],42:[2,204],43:[2,204],46:[2,204],47:[2,204],48:[2,204],49:[2,204],50:[2,204],51:[2,204],56:[2,204],57:[2,204],58:[2,204],59:[2,204],60:[2,204],65:[2,204],67:[2,204],73:[2,204],78:[2,204],81:[2,204],82:[2,204],94:[2,204],105:[2,204],106:[2,204],111:[2,204],112:[2,204],113:[2,204],114:[2,204],115:[2,204],116:[2,204],117:[2,204],118:[2,204],119:[2,204],122:[2,204],128:[1,318],129:[1,319],130:[1,320],133:[2,204],134:[2,204],135:[2,204],136:[2,204],137:[2,204],141:[2,204],142:[2,204],143:[2,204],144:[2,204],148:[2,204],152:[2,204],156:[2,204],160:[2,204],164:[2,204],168:[2,204],174:[2,204],187:[2,204],188:[2,204],189:[2,204],190:[2,204],191:[2,204]},{2:[2,205],19:[2,205],21:[2,205],22:[2,205],25:[2,205],28:[2,205],34:[2,205],36:[2,205],37:[2,205],39:[2,205],40:[2,205],41:[2,205],42:[2,205],43:[2,205],46:[2,205],47:[2,205],48:[2,205],49:[2,205],50:[2,205],51:[2,205],56:[2,205],57:[2,205],58:[2,205],59:[2,205],60:[2,205],65:[2,205],67:[2,205],73:[2,205],78:[2,205],81:[2,205],82:[2,205],94:[2,205],105:[2,205],106:[2,205],111:[2,205],112:[2,205],113:[2,205],114:[2,205],115:[2,205],116:[2,205],117:[2,205],118:[2,205],119:[2,205],122:[2,205],128:[1,318],129:[1,319],130:[1,320],133:[2,205],134:[2,205],135:[2,205],136:[2,205],137:[2,205],141:[2,205],142:[2,205],143:[2,205],144:[2,205],148:[2,205],152:[2,205],156:[2,205],160:[2,205],164:[2,205],168:[2,205],174:[2,205],187:[2,205],188:[2,205],189:[2,205],190:[2,205],191:[2,205]},{2:[2,206],19:[2,206],21:[2,206],22:[2,206],25:[2,206],28:[2,206],34:[2,206],36:[2,206],37:[2,206],39:[2,206],40:[2,206],41:[2,206],42:[2,206],43:[2,206],46:[2,206],47:[2,206],48:[2,206],49:[2,206],50:[2,206],51:[2,206],56:[2,206],57:[2,206],58:[2,206],59:[2,206],60:[2,206],65:[2,206],67:[2,206],73:[2,206],78:[2,206],81:[2,206],82:[2,206],94:[2,206],105:[2,206],106:[2,206],111:[2,206],112:[2,206],113:[2,206],114:[2,206],115:[2,206],116:[2,206],117:[2,206],118:[2,206],119:[2,206],122:[2,206],128:[1,318],129:[1,319],130:[1,320],133:[2,206],134:[2,206],135:[2,206],136:[2,206],137:[2,206],141:[2,206],142:[2,206],143:[2,206],144:[2,206],148:[2,206],152:[2,206],156:[2,206],160:[2,206],164:[2,206],168:[2,206],174:[2,206],187:[2,206],188:[2,206],189:[2,206],190:[2,206],191:[2,206]},{2:[2,193],19:[2,193],21:[2,193],22:[2,193],25:[2,193],28:[2,193],34:[2,193],36:[2,193],37:[2,193],39:[2,193],40:[2,193],41:[2,193],42:[2,193],43:[2,193],46:[2,193],47:[2,193],48:[2,193],49:[2,193],50:[2,193],51:[2,193],56:[2,193],57:[2,193],58:[2,193],59:[2,193],60:[2,193],65:[2,193],67:[2,193],73:[2,193],78:[2,193],81:[2,193],82:[2,193],94:[2,193],105:[2,193],106:[2,193],111:[2,193],112:[2,193],113:[2,193],114:[2,193],115:[2,193],116:[1,321],117:[1,322],118:[2,193],119:[2,193],122:[2,193],128:[2,193],129:[2,193],130:[2,193],133:[2,193],134:[2,193],135:[2,193],136:[2,193],137:[2,193],141:[2,193],142:[2,193],143:[2,193],144:[2,193],148:[2,193],152:[2,193],156:[2,193],160:[2,193],164:[2,193],168:[2,193],174:[2,193],187:[2,193],188:[2,193],189:[2,193],190:[2,193],191:[2,193]},{2:[2,194],19:[2,194],21:[2,194],22:[2,194],25:[2,194],28:[2,194],34:[2,194],36:[2,194],37:[2,194],39:[2,194],40:[2,194],41:[2,194],42:[2,194],43:[2,194],46:[2,194],47:[2,194],48:[2,194],49:[2,194],50:[2,194],51:[2,194],56:[2,194],57:[2,194],58:[2,194],59:[2,194],60:[2,194],65:[2,194],67:[2,194],73:[2,194],78:[2,194],81:[2,194],82:[2,194],94:[2,194],105:[2,194],106:[2,194],111:[2,194],112:[2,194],113:[2,194],114:[2,194],115:[2,194],116:[1,321],117:[1,322],118:[2,194],119:[2,194],122:[2,194],128:[2,194],129:[2,194],130:[2,194],133:[2,194],134:[2,194],135:[2,194],136:[2,194],137:[2,194],141:[2,194],142:[2,194],143:[2,194],144:[2,194],148:[2,194],152:[2,194],156:[2,194],160:[2,194],164:[2,194],168:[2,194],174:[2,194],187:[2,194],188:[2,194],189:[2,194],190:[2,194],191:[2,194]},{2:[2,195],19:[2,195],21:[2,195],22:[2,195],25:[2,195],28:[2,195],34:[2,195],36:[2,195],37:[2,195],39:[2,195],40:[2,195],41:[2,195],42:[2,195],43:[2,195],46:[2,195],47:[2,195],48:[2,195],49:[2,195],50:[2,195],51:[2,195],56:[2,195],57:[2,195],58:[2,195],59:[2,195],60:[2,195],65:[2,195],67:[2,195],73:[2,195],78:[2,195],81:[2,195],82:[2,195],94:[2,195],105:[2,195],106:[2,195],111:[2,195],112:[2,195],113:[2,195],114:[2,195],115:[2,195],116:[1,321],117:[1,322],118:[2,195],119:[2,195],122:[2,195],128:[2,195],129:[2,195],130:[2,195],133:[2,195],134:[2,195],135:[2,195],136:[2,195],137:[2,195],141:[2,195],142:[2,195],143:[2,195],144:[2,195],148:[2,195],152:[2,195],156:[2,195],160:[2,195],164:[2,195],168:[2,195],174:[2,195],187:[2,195],188:[2,195],189:[2,195],190:[2,195],191:[2,195]},{2:[2,187],19:[2,187],21:[2,187],22:[2,187],25:[2,187],28:[2,187],34:[2,187],36:[2,187],37:[2,187],39:[2,187],40:[2,187],41:[2,187],42:[2,187],43:[2,187],46:[2,187],47:[2,187],48:[2,187],49:[2,187],50:[2,187],51:[2,187],56:[2,187],57:[2,187],58:[2,187],59:[2,187],60:[2,187],65:[2,187],67:[2,187],73:[2,187],78:[2,187],81:[2,187],82:[2,187],94:[2,187],105:[2,187],106:[2,187],111:[2,187],112:[2,187],113:[2,187],114:[2,187],115:[2,187],116:[2,187],117:[2,187],118:[2,187],119:[2,187],121:[1,323],122:[1,324],123:[1,325],128:[2,187],129:[2,187],130:[2,187],133:[2,187],134:[2,187],135:[2,187],136:[2,187],137:[2,187],141:[2,187],142:[2,187],143:[2,187],144:[2,187],148:[2,187],152:[2,187],156:[2,187],160:[2,187],164:[2,187],168:[2,187],174:[2,187],187:[2,187],188:[2,187],189:[2,187],190:[2,187],191:[2,187]},{2:[2,188],19:[2,188],21:[2,188],22:[2,188],25:[2,188],28:[2,188],34:[2,188],36:[2,188],37:[2,188],39:[2,188],40:[2,188],41:[2,188],42:[2,188],43:[2,188],46:[2,188],47:[2,188],48:[2,188],49:[2,188],50:[2,188],51:[2,188],56:[2,188],57:[2,188],58:[2,188],59:[2,188],60:[2,188],65:[2,188],67:[2,188],73:[2,188],78:[2,188],81:[2,188],82:[2,188],94:[2,188],105:[2,188],106:[2,188],111:[2,188],112:[2,188],113:[2,188],114:[2,188],115:[2,188],116:[2,188],117:[2,188],118:[2,188],119:[2,188],121:[1,323],122:[1,324],123:[1,325],128:[2,188],129:[2,188],130:[2,188],133:[2,188],134:[2,188],135:[2,188],136:[2,188],137:[2,188],141:[2,188],142:[2,188],143:[2,188],144:[2,188],148:[2,188],152:[2,188],156:[2,188],160:[2,188],164:[2,188],168:[2,188],174:[2,188],187:[2,188],188:[2,188],189:[2,188],190:[2,188],191:[2,188]},{2:[2,179],19:[2,179],21:[2,179],22:[2,179],25:[2,179],28:[2,179],34:[2,179],36:[2,179],37:[2,179],39:[2,179],40:[2,179],41:[2,179],42:[2,179],43:[2,179],46:[2,179],47:[2,179],48:[2,179],49:[2,179],50:[2,179],51:[2,179],56:[2,179],57:[2,179],58:[2,179],59:[2,179],60:[2,179],65:[2,179],67:[2,179],73:[2,179],78:[2,179],81:[2,179],82:[2,179],94:[2,179],105:[2,179],106:[2,179],111:[2,179],112:[2,179],113:[2,179],114:[2,179],115:[2,179],116:[2,179],117:[2,179],118:[2,179],119:[2,179],121:[2,179],122:[2,179],123:[2,179],128:[2,179],129:[2,179],130:[2,179],133:[2,179],134:[2,179],135:[2,179],136:[2,179],137:[2,179],141:[2,179],142:[2,179],143:[2,179],144:[2,179],148:[2,179],152:[2,179],156:[2,179],160:[2,179],164:[2,179],168:[2,179],174:[2,179],187:[2,179],188:[2,179],189:[2,179],190:[2,179],191:[2,179]},{2:[2,180],19:[2,180],21:[2,180],22:[2,180],25:[2,180],28:[2,180],34:[2,180],36:[2,180],37:[2,180],39:[2,180],40:[2,180],41:[2,180],42:[2,180],43:[2,180],46:[2,180],47:[2,180],48:[2,180],49:[2,180],50:[2,180],51:[2,180],56:[2,180],57:[2,180],58:[2,180],59:[2,180],60:[2,180],65:[2,180],67:[2,180],73:[2,180],78:[2,180],81:[2,180],82:[2,180],94:[2,180],105:[2,180],106:[2,180],111:[2,180],112:[2,180],113:[2,180],114:[2,180],115:[2,180],116:[2,180],117:[2,180],118:[2,180],119:[2,180],121:[2,180],122:[2,180],123:[2,180],128:[2,180],129:[2,180],130:[2,180],133:[2,180],134:[2,180],135:[2,180],136:[2,180],137:[2,180],141:[2,180],142:[2,180],143:[2,180],144:[2,180],148:[2,180],152:[2,180],156:[2,180],160:[2,180],164:[2,180],168:[2,180],174:[2,180],187:[2,180],188:[2,180],189:[2,180],190:[2,180],191:[2,180]},{2:[2,181],19:[2,181],21:[2,181],22:[2,181],25:[2,181],28:[2,181],34:[2,181],36:[2,181],37:[2,181],39:[2,181],40:[2,181],41:[2,181],42:[2,181],43:[2,181],46:[2,181],47:[2,181],48:[2,181],49:[2,181],50:[2,181],51:[2,181],56:[2,181],57:[2,181],58:[2,181],59:[2,181],60:[2,181],65:[2,181],67:[2,181],73:[2,181],78:[2,181],81:[2,181],82:[2,181],94:[2,181],105:[2,181],106:[2,181],111:[2,181],112:[2,181],113:[2,181],114:[2,181],115:[2,181],116:[2,181],117:[2,181],118:[2,181],119:[2,181],121:[2,181],122:[2,181],123:[2,181],128:[2,181],129:[2,181],130:[2,181],133:[2,181],134:[2,181],135:[2,181],136:[2,181],137:[2,181],141:[2,181],142:[2,181],143:[2,181],144:[2,181],148:[2,181],152:[2,181],156:[2,181],160:[2,181],164:[2,181],168:[2,181],174:[2,181],187:[2,181],188:[2,181],189:[2,181],190:[2,181],191:[2,181]},{3:508,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,510],52:509},{19:[2,77],21:[2,77],22:[2,77],28:[2,77],34:[2,77],36:[2,77],37:[2,77],40:[2,77],41:[2,77],42:[2,77],43:[2,77],47:[2,77],48:[2,77],49:[2,77],50:[2,77],51:[2,77],56:[2,77],58:[2,77],59:[2,77],60:[2,77],65:[2,77],67:[2,77],73:[2,77],78:[2,77],81:[2,77],94:[2,77],105:[2,77],106:[2,77],111:[2,77],112:[2,77],113:[2,77],114:[2,77],115:[2,77],116:[2,77],117:[2,77],118:[2,77],119:[2,77],122:[2,77],174:[2,77],187:[2,77],188:[2,77],189:[2,77],190:[2,77],191:[2,77]},{28:[1,511]},{19:[2,79],21:[2,79],22:[2,79],28:[2,79],34:[2,79],36:[2,79],37:[2,79],40:[2,79],41:[2,79],42:[2,79],43:[2,79],47:[2,79],48:[2,79],49:[2,79],50:[2,79],51:[2,79],56:[2,79],58:[2,79],59:[2,79],60:[2,79],65:[2,79],67:[2,79],73:[2,79],78:[2,79],81:[2,79],94:[2,79],105:[2,79],106:[2,79],111:[2,79],112:[2,79],113:[2,79],114:[2,79],115:[2,79],116:[2,79],117:[2,79],118:[2,79],119:[2,79],122:[2,79],174:[2,79],187:[2,79],188:[2,79],189:[2,79],190:[2,79],191:[2,79]},{19:[1,129],28:[1,128],32:512,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,145],25:[2,145],31:[2,145],34:[2,145],37:[2,145],46:[2,145],81:[2,145],93:[2,145],105:[2,145],106:[2,145],116:[2,145],117:[2,145],121:[2,145],122:[2,145],123:[2,145],128:[2,145],129:[2,145],130:[2,145],133:[2,145],134:[2,145],135:[2,145],136:[2,145],137:[2,145],141:[2,145],142:[2,145],143:[2,145],144:[2,145],148:[2,145],152:[2,145],156:[2,145],160:[2,145],164:[2,145],168:[2,145],173:[2,145],174:[2,145],175:[2,145],176:[2,145],177:[2,145],178:[2,145],179:[2,145],180:[2,145],181:[2,145],182:[2,145],183:[2,145]},{2:[2,150],19:[2,150],21:[2,150],22:[2,150],25:[2,150],28:[2,150],31:[2,150],34:[2,150],36:[2,150],37:[2,150],39:[2,150],40:[2,150],41:[2,150],42:[2,150],43:[2,150],46:[2,150],47:[2,150],48:[2,150],49:[2,150],50:[2,150],51:[2,150],56:[2,150],57:[2,150],58:[2,150],59:[2,150],60:[2,150],65:[2,150],67:[2,150],73:[2,150],78:[2,150],81:[2,150],82:[2,150],93:[2,150],94:[2,150],105:[2,150],106:[2,150],111:[2,150],112:[2,150],113:[2,150],114:[2,150],115:[2,150],116:[2,150],117:[2,150],118:[2,150],119:[2,150],121:[2,150],122:[2,150],123:[2,150],128:[2,150],129:[2,150],130:[2,150],133:[2,150],134:[2,150],135:[2,150],136:[2,150],137:[2,150],141:[2,150],142:[2,150],143:[2,150],144:[2,150],148:[2,150],152:[2,150],156:[2,150],160:[2,150],164:[2,150],168:[2,150],173:[2,150],174:[2,150],175:[2,150],176:[2,150],177:[2,150],178:[2,150],179:[2,150],180:[2,150],181:[2,150],182:[2,150],183:[2,150],187:[2,150],188:[2,150],189:[2,150],190:[2,150],191:[2,150]},{19:[1,129],28:[1,128],32:513,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,132],25:[2,132],31:[2,132],34:[2,132],37:[2,132],46:[2,132],81:[2,132],93:[2,132],105:[2,132],106:[2,132],116:[2,132],117:[2,132],121:[2,132],122:[2,132],123:[2,132],128:[2,132],129:[2,132],130:[2,132],133:[2,132],134:[2,132],135:[2,132],136:[2,132],137:[2,132],141:[2,132],142:[2,132],143:[2,132],144:[2,132],148:[2,132],152:[2,132],156:[2,132],160:[2,132],164:[2,132],168:[2,132],173:[2,132],174:[2,132],175:[2,132],176:[2,132],177:[2,132],178:[2,132],179:[2,132],180:[2,132],181:[2,132],182:[2,132],183:[2,132]},{2:[2,106],19:[2,106],21:[2,106],22:[2,106],25:[2,106],28:[2,106],31:[2,106],34:[2,106],36:[2,106],37:[2,106],39:[2,106],40:[2,106],41:[2,106],42:[2,106],43:[2,106],46:[2,106],47:[2,106],48:[2,106],49:[2,106],50:[2,106],51:[2,106],56:[2,106],57:[2,106],58:[2,106],59:[2,106],60:[2,106],65:[2,106],67:[2,106],73:[2,106],78:[2,106],81:[2,106],82:[2,106],93:[2,106],94:[2,106],105:[2,106],106:[2,106],111:[2,106],112:[2,106],113:[2,106],114:[2,106],115:[2,106],116:[2,106],117:[2,106],118:[2,106],119:[2,106],121:[2,106],122:[2,106],123:[2,106],128:[2,106],129:[2,106],130:[2,106],133:[2,106],134:[2,106],135:[2,106],136:[2,106],137:[2,106],141:[2,106],142:[2,106],143:[2,106],144:[2,106],148:[2,106],152:[2,106],156:[2,106],160:[2,106],164:[2,106],168:[2,106],173:[2,106],174:[2,106],175:[2,106],176:[2,106],177:[2,106],178:[2,106],179:[2,106],180:[2,106],181:[2,106],182:[2,106],183:[2,106],187:[2,106],188:[2,106],189:[2,106],190:[2,106],191:[2,106]},{19:[1,129],25:[1,354],28:[1,128],32:515,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],82:[1,514],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{25:[2,110],82:[2,110]},{19:[2,93],21:[2,93],22:[2,93],28:[2,93],34:[2,93],36:[2,93],37:[2,93],41:[2,93],42:[2,93],43:[2,93],47:[2,93],48:[2,93],49:[2,93],50:[2,93],51:[2,93],59:[2,93],60:[2,93],65:[2,93],67:[2,93],68:516,71:517,78:[2,93],81:[2,93],94:[2,93],105:[2,93],106:[2,93],111:[2,93],112:[2,93],113:[2,93],114:[2,93],115:[2,93],116:[2,93],117:[2,93],118:[2,93],119:[2,93],122:[2,93],174:[2,93],187:[2,93],188:[2,93],189:[2,93],190:[2,93],191:[2,93]},{19:[1,518]},{28:[1,519]},{19:[2,33],21:[2,33],22:[2,33],28:[2,33],34:[2,33],36:[2,33],37:[2,33],40:[1,520],41:[2,33],42:[2,33],43:[2,33],47:[2,33],48:[2,33],49:[2,33],50:[2,33],51:[2,33],56:[2,33],58:[2,33],59:[2,33],60:[2,33],65:[2,33],67:[2,33],73:[2,33],78:[2,33],81:[2,33],94:[2,33],105:[2,33],106:[2,33],111:[2,33],112:[2,33],113:[2,33],114:[2,33],115:[2,33],116:[2,33],117:[2,33],118:[2,33],119:[2,33],122:[2,33],174:[2,33],187:[2,33],188:[2,33],189:[2,33],190:[2,33],191:[2,33]},{25:[1,242],39:[1,521]},{19:[2,37],21:[2,37],22:[2,37],28:[2,37],34:[2,37],36:[2,37],37:[2,37],40:[2,37],41:[2,37],42:[2,37],43:[2,37],47:[2,37],48:[2,37],49:[2,37],50:[2,37],51:[2,37],56:[2,37],58:[2,37],59:[2,37],60:[2,37],65:[2,37],67:[2,37],73:[2,37],78:[2,37],81:[2,37],94:[2,37],105:[2,37],106:[2,37],111:[2,37],112:[2,37],113:[2,37],114:[2,37],115:[2,37],116:[2,37],117:[2,37],118:[2,37],119:[2,37],122:[2,37],174:[2,37],187:[2,37],188:[2,37],189:[2,37],190:[2,37],191:[2,37]},{25:[1,242],34:[1,522]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:523,39:[1,524],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{25:[2,294],34:[2,294]},{25:[2,157],31:[1,392],34:[2,157],46:[2,157],105:[1,245],106:[1,246],116:[2,157],117:[2,157],121:[2,157],122:[2,157],123:[2,157],128:[2,157],129:[2,157],130:[2,157],133:[2,157],134:[2,157],135:[2,157],136:[2,157],137:[2,157],141:[2,157],142:[2,157],143:[2,157],144:[2,157],148:[2,157],152:[2,157],156:[2,157],160:[2,157],164:[2,157],168:[2,157],171:393,173:[1,149],174:[1,150],175:[1,151],176:[1,152],177:[1,153],
	178:[1,154],179:[1,155],180:[1,156],181:[1,157],182:[1,158],183:[1,159]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:525,39:[1,526],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{25:[1,242],39:[1,527]},{3:528,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],32:111,34:[1,530],37:[1,55],38:529,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{27:531,28:[1,390]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:532,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{25:[2,27],34:[2,27],46:[2,27]},{19:[1,129],28:[1,128],33:533,37:[1,55],45:470,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:234,145:233,149:232,153:231,157:230,161:229,165:228,169:227,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{25:[1,242],39:[1,534]},{25:[2,275],34:[2,275],46:[2,275]},{25:[2,276],34:[2,276],46:[2,276]},{57:[1,535]},{25:[2,262],34:[2,262],46:[2,262],160:[1,396],164:[2,262],168:[2,262]},{25:[2,256],34:[2,256],46:[2,256],156:[1,397],160:[2,256],164:[2,256],168:[2,256]},{25:[2,250],34:[2,250],46:[2,250],152:[1,398],156:[2,250],160:[2,250],164:[2,250],168:[2,250]},{25:[2,244],34:[2,244],46:[2,244],148:[1,399],152:[2,244],156:[2,244],160:[2,244],164:[2,244],168:[2,244]},{25:[2,238],34:[2,238],46:[2,238],141:[1,400],142:[1,401],143:[1,402],144:[1,403],148:[2,238],152:[2,238],156:[2,238],160:[2,238],164:[2,238],168:[2,238]},{25:[2,226],34:[2,226],46:[2,226],133:[1,404],134:[1,405],135:[1,406],136:[1,407],137:[1,408],141:[2,226],142:[2,226],143:[2,226],144:[2,226],148:[2,226],152:[2,226],156:[2,226],160:[2,226],164:[2,226],168:[2,226]},{25:[2,227],34:[2,227],46:[2,227],133:[1,404],134:[1,405],135:[1,406],136:[1,407],137:[1,408],141:[2,227],142:[2,227],143:[2,227],144:[2,227],148:[2,227],152:[2,227],156:[2,227],160:[2,227],164:[2,227],168:[2,227]},{25:[2,228],34:[2,228],46:[2,228],133:[1,404],134:[1,405],135:[1,406],136:[1,407],137:[1,408],141:[2,228],142:[2,228],143:[2,228],144:[2,228],148:[2,228],152:[2,228],156:[2,228],160:[2,228],164:[2,228],168:[2,228]},{25:[2,229],34:[2,229],46:[2,229],133:[1,404],134:[1,405],135:[1,406],136:[1,407],137:[1,408],141:[2,229],142:[2,229],143:[2,229],144:[2,229],148:[2,229],152:[2,229],156:[2,229],160:[2,229],164:[2,229],168:[2,229]},{25:[2,208],34:[2,208],46:[2,208],128:[1,318],129:[1,319],130:[1,320],133:[2,208],134:[2,208],135:[2,208],136:[2,208],137:[2,208],141:[2,208],142:[2,208],143:[2,208],144:[2,208],148:[2,208],152:[2,208],156:[2,208],160:[2,208],164:[2,208],168:[2,208]},{25:[2,209],34:[2,209],46:[2,209],128:[1,318],129:[1,319],130:[1,320],133:[2,209],134:[2,209],135:[2,209],136:[2,209],137:[2,209],141:[2,209],142:[2,209],143:[2,209],144:[2,209],148:[2,209],152:[2,209],156:[2,209],160:[2,209],164:[2,209],168:[2,209]},{25:[2,210],34:[2,210],46:[2,210],128:[1,318],129:[1,319],130:[1,320],133:[2,210],134:[2,210],135:[2,210],136:[2,210],137:[2,210],141:[2,210],142:[2,210],143:[2,210],144:[2,210],148:[2,210],152:[2,210],156:[2,210],160:[2,210],164:[2,210],168:[2,210]},{25:[2,211],34:[2,211],46:[2,211],128:[1,318],129:[1,319],130:[1,320],133:[2,211],134:[2,211],135:[2,211],136:[2,211],137:[2,211],141:[2,211],142:[2,211],143:[2,211],144:[2,211],148:[2,211],152:[2,211],156:[2,211],160:[2,211],164:[2,211],168:[2,211]},{25:[2,212],34:[2,212],46:[2,212],128:[1,318],129:[1,319],130:[1,320],133:[2,212],134:[2,212],135:[2,212],136:[2,212],137:[2,212],141:[2,212],142:[2,212],143:[2,212],144:[2,212],148:[2,212],152:[2,212],156:[2,212],160:[2,212],164:[2,212],168:[2,212]},{19:[1,129],28:[1,128],32:536,37:[1,55],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,141],19:[2,141],21:[2,141],22:[2,141],25:[2,141],28:[2,141],31:[2,141],34:[2,141],36:[2,141],37:[2,141],39:[2,141],40:[2,141],41:[2,141],42:[2,141],43:[2,141],46:[2,141],47:[2,141],48:[2,141],49:[2,141],50:[2,141],51:[2,141],56:[2,141],57:[2,141],58:[2,141],59:[2,141],60:[2,141],65:[2,141],67:[2,141],73:[2,141],78:[2,141],81:[2,141],82:[2,141],93:[2,141],94:[2,141],105:[2,141],106:[2,141],111:[2,141],112:[2,141],113:[2,141],114:[2,141],115:[2,141],116:[2,141],117:[2,141],118:[2,141],119:[2,141],121:[2,141],122:[2,141],123:[2,141],128:[2,141],129:[2,141],130:[2,141],133:[2,141],134:[2,141],135:[2,141],136:[2,141],137:[2,141],141:[2,141],142:[2,141],143:[2,141],144:[2,141],148:[2,141],152:[2,141],156:[2,141],160:[2,141],164:[2,141],168:[2,141],173:[2,141],174:[2,141],175:[2,141],176:[2,141],177:[2,141],178:[2,141],179:[2,141],180:[2,141],181:[2,141],182:[2,141],183:[2,141],187:[2,141],188:[2,141],189:[2,141],190:[2,141],191:[2,141]},{2:[2,128],19:[2,128],21:[2,128],22:[2,128],25:[2,128],28:[2,128],31:[2,128],34:[2,128],36:[2,128],37:[2,128],39:[2,128],40:[2,128],41:[2,128],42:[2,128],43:[2,128],46:[2,128],47:[2,128],48:[2,128],49:[2,128],50:[2,128],51:[2,128],56:[2,128],57:[2,128],58:[2,128],59:[2,128],60:[2,128],65:[2,128],67:[2,128],73:[2,128],78:[2,128],81:[2,128],82:[2,128],93:[2,128],94:[2,128],105:[2,128],106:[2,128],111:[2,128],112:[2,128],113:[2,128],114:[2,128],115:[2,128],116:[2,128],117:[2,128],118:[2,128],119:[2,128],121:[2,128],122:[2,128],123:[2,128],128:[2,128],129:[2,128],130:[2,128],133:[2,128],134:[2,128],135:[2,128],136:[2,128],137:[2,128],141:[2,128],142:[2,128],143:[2,128],144:[2,128],148:[2,128],152:[2,128],156:[2,128],160:[2,128],164:[2,128],168:[2,128],173:[2,128],174:[2,128],175:[2,128],176:[2,128],177:[2,128],178:[2,128],179:[2,128],180:[2,128],181:[2,128],182:[2,128],183:[2,128],187:[2,128],188:[2,128],189:[2,128],190:[2,128],191:[2,128]},{19:[1,537]},{25:[1,463],39:[1,538]},{19:[2,93],21:[2,93],22:[2,93],28:[2,93],34:[2,93],36:[2,93],37:[2,93],41:[2,93],42:[2,93],43:[2,93],47:[2,93],48:[2,93],49:[2,93],50:[2,93],51:[2,93],59:[2,93],60:[2,93],65:[2,93],67:[2,93],68:539,71:517,78:[2,93],81:[2,93],94:[2,93],105:[2,93],106:[2,93],111:[2,93],112:[2,93],113:[2,93],114:[2,93],115:[2,93],116:[2,93],117:[2,93],118:[2,93],119:[2,93],122:[2,93],174:[2,93],187:[2,93],188:[2,93],189:[2,93],190:[2,93],191:[2,93]},{19:[1,540]},{2:[2,116],19:[2,116],21:[2,116],22:[2,116],25:[2,116],28:[2,116],31:[2,116],34:[2,116],36:[2,116],37:[2,116],39:[2,116],40:[2,116],41:[2,116],42:[2,116],43:[2,116],46:[2,116],47:[2,116],48:[2,116],49:[2,116],50:[2,116],51:[2,116],56:[2,116],57:[2,116],58:[2,116],59:[2,116],60:[2,116],65:[2,116],67:[2,116],73:[2,116],78:[2,116],81:[2,116],82:[2,116],93:[2,116],94:[2,116],105:[2,116],106:[2,116],111:[2,116],112:[2,116],113:[2,116],114:[2,116],115:[2,116],116:[2,116],117:[2,116],118:[2,116],119:[2,116],121:[2,116],122:[2,116],123:[2,116],128:[2,116],129:[2,116],130:[2,116],133:[2,116],134:[2,116],135:[2,116],136:[2,116],137:[2,116],141:[2,116],142:[2,116],143:[2,116],144:[2,116],148:[2,116],152:[2,116],156:[2,116],160:[2,116],164:[2,116],168:[2,116],173:[2,116],174:[2,116],175:[2,116],176:[2,116],177:[2,116],178:[2,116],179:[2,116],180:[2,116],181:[2,116],182:[2,116],183:[2,116],187:[2,116],188:[2,116],189:[2,116],190:[2,116],191:[2,116]},{21:[2,118],25:[2,118]},{21:[2,119],25:[2,119]},{28:[1,543],39:[1,541],88:542},{19:[2,64],21:[2,64],22:[2,64],28:[2,64],34:[2,64],36:[2,64],37:[2,64],40:[2,64],41:[2,64],42:[2,64],43:[2,64],47:[2,64],48:[2,64],49:[2,64],50:[2,64],51:[2,64],56:[2,64],58:[2,64],59:[2,64],60:[2,64],65:[2,64],67:[2,64],73:[2,64],78:[2,64],81:[2,64],94:[2,64],105:[2,64],106:[2,64],111:[2,64],112:[2,64],113:[2,64],114:[2,64],115:[2,64],116:[2,64],117:[2,64],118:[2,64],119:[2,64],122:[2,64],174:[2,64],187:[2,64],188:[2,64],189:[2,64],190:[2,64],191:[2,64]},{19:[2,65],21:[2,65],22:[2,65],28:[2,65],34:[2,65],36:[2,65],37:[2,65],40:[2,65],41:[2,65],42:[2,65],43:[2,65],47:[2,65],48:[2,65],49:[2,65],50:[2,65],51:[2,65],56:[2,65],58:[2,65],59:[2,65],60:[2,65],65:[2,65],67:[2,65],73:[2,65],78:[2,65],81:[2,65],94:[2,65],105:[2,65],106:[2,65],111:[2,65],112:[2,65],113:[2,65],114:[2,65],115:[2,65],116:[2,65],117:[2,65],118:[2,65],119:[2,65],122:[2,65],174:[2,65],187:[2,65],188:[2,65],189:[2,65],190:[2,65],191:[2,65]},{21:[2,69],53:544,56:[2,69],58:[2,69]},{39:[1,545]},{2:[2,270],25:[2,270],34:[2,270]},{25:[2,152],39:[2,152]},{2:[2,107],19:[2,107],21:[2,107],22:[2,107],25:[2,107],28:[2,107],31:[2,107],34:[2,107],36:[2,107],37:[2,107],39:[2,107],40:[2,107],41:[2,107],42:[2,107],43:[2,107],46:[2,107],47:[2,107],48:[2,107],49:[2,107],50:[2,107],51:[2,107],56:[2,107],57:[2,107],58:[2,107],59:[2,107],60:[2,107],65:[2,107],67:[2,107],73:[2,107],78:[2,107],81:[2,107],82:[2,107],93:[2,107],94:[2,107],105:[2,107],106:[2,107],111:[2,107],112:[2,107],113:[2,107],114:[2,107],115:[2,107],116:[2,107],117:[2,107],118:[2,107],119:[2,107],121:[2,107],122:[2,107],123:[2,107],128:[2,107],129:[2,107],130:[2,107],133:[2,107],134:[2,107],135:[2,107],136:[2,107],137:[2,107],141:[2,107],142:[2,107],143:[2,107],144:[2,107],148:[2,107],152:[2,107],156:[2,107],160:[2,107],164:[2,107],168:[2,107],173:[2,107],174:[2,107],175:[2,107],176:[2,107],177:[2,107],178:[2,107],179:[2,107],180:[2,107],181:[2,107],182:[2,107],183:[2,107],187:[2,107],188:[2,107],189:[2,107],190:[2,107],191:[2,107]},{25:[2,111],82:[2,111]},{21:[1,546]},{3:5,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],21:[2,90],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],66:6,67:[1,22],74:4,76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[2,93],21:[2,93],22:[2,93],28:[2,93],34:[2,93],36:[2,93],37:[2,93],41:[2,93],42:[2,93],43:[2,93],47:[2,93],48:[2,93],49:[2,93],50:[2,93],51:[2,93],59:[2,93],60:[2,93],65:[2,93],67:[2,93],68:547,71:517,78:[2,93],81:[2,93],94:[2,93],105:[2,93],106:[2,93],111:[2,93],112:[2,93],113:[2,93],114:[2,93],115:[2,93],116:[2,93],117:[2,93],118:[2,93],119:[2,93],122:[2,93],174:[2,93],187:[2,93],188:[2,93],189:[2,93],190:[2,93],191:[2,93]},{25:[2,89],39:[2,89]},{3:548,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[1,550],34:[1,549]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:551,39:[1,552],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{25:[1,242],39:[1,553]},{3:554,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{25:[1,242],39:[1,555]},{3:556,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{3:557,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[2,45],21:[2,45],22:[2,45],28:[2,45],34:[2,45],36:[2,45],37:[2,45],40:[2,45],41:[2,45],42:[2,45],43:[2,45],47:[2,45],48:[2,45],49:[2,45],50:[2,45],51:[2,45],56:[2,45],58:[2,45],59:[2,45],60:[2,45],65:[2,45],67:[2,45],73:[2,45],78:[2,45],81:[2,45],94:[2,45],105:[2,45],106:[2,45],111:[2,45],112:[2,45],113:[2,45],114:[2,45],115:[2,45],116:[2,45],117:[2,45],118:[2,45],119:[2,45],122:[2,45],174:[2,45],187:[2,45],188:[2,45],189:[2,45],190:[2,45],191:[2,45]},{25:[1,242],34:[1,558]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:559,39:[1,560],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{25:[2,23],34:[2,23]},{25:[1,242],39:[1,561]},{25:[2,29],34:[2,29],46:[2,29]},{3:562,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[1,129],28:[1,128],33:563,37:[1,55],45:470,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:235,138:234,145:233,149:232,153:231,157:230,161:229,165:228,169:227,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{2:[2,266],19:[2,266],21:[2,266],22:[2,266],25:[2,266],28:[2,266],34:[2,266],36:[2,266],37:[2,266],39:[2,266],40:[2,266],41:[2,266],42:[2,266],43:[2,266],47:[2,266],48:[2,266],49:[2,266],50:[2,266],51:[2,266],56:[2,266],57:[2,266],58:[2,266],59:[2,266],60:[2,266],65:[2,266],67:[2,266],73:[2,266],78:[2,266],81:[2,266],82:[2,266],94:[2,266],105:[2,266],106:[2,266],111:[2,266],112:[2,266],113:[2,266],114:[2,266],115:[2,266],116:[2,266],117:[2,266],118:[2,266],119:[2,266],122:[2,266],174:[2,266],187:[2,266],188:[2,266],189:[2,266],190:[2,266],191:[2,266]},{19:[2,93],21:[2,93],22:[2,93],28:[2,93],34:[2,93],36:[2,93],37:[2,93],41:[2,93],42:[2,93],43:[2,93],47:[2,93],48:[2,93],49:[2,93],50:[2,93],51:[2,93],59:[2,93],60:[2,93],65:[2,93],67:[2,93],68:564,71:517,78:[2,93],81:[2,93],94:[2,93],105:[2,93],106:[2,93],111:[2,93],112:[2,93],113:[2,93],114:[2,93],115:[2,93],116:[2,93],117:[2,93],118:[2,93],119:[2,93],122:[2,93],174:[2,93],187:[2,93],188:[2,93],189:[2,93],190:[2,93],191:[2,93]},{19:[1,565]},{21:[1,566]},{19:[2,93],21:[2,93],22:[2,93],28:[2,93],34:[2,93],36:[2,93],37:[2,93],41:[2,93],42:[2,93],43:[2,93],47:[2,93],48:[2,93],49:[2,93],50:[2,93],51:[2,93],59:[2,93],60:[2,93],65:[2,93],67:[2,93],68:567,71:517,78:[2,93],81:[2,93],94:[2,93],105:[2,93],106:[2,93],111:[2,93],112:[2,93],113:[2,93],114:[2,93],115:[2,93],116:[2,93],117:[2,93],118:[2,93],119:[2,93],122:[2,93],174:[2,93],187:[2,93],188:[2,93],189:[2,93],190:[2,93],191:[2,93]},{19:[1,568]},{39:[1,569]},{39:[2,125]},{21:[1,570],54:571,55:572,56:[1,574],58:[1,573]},{4:575,19:[1,23]},{19:[2,82],21:[2,82],22:[2,82],28:[2,82],34:[2,82],36:[2,82],37:[2,82],41:[2,82],42:[2,82],43:[2,82],47:[2,82],48:[2,82],49:[2,82],50:[2,82],51:[2,82],59:[2,82],60:[2,82],65:[2,82],67:[2,82],73:[2,82],78:[2,82],81:[2,82],94:[2,82],105:[2,82],106:[2,82],111:[2,82],112:[2,82],113:[2,82],114:[2,82],115:[2,82],116:[2,82],117:[2,82],118:[2,82],119:[2,82],122:[2,82],174:[2,82],187:[2,82],188:[2,82],189:[2,82],190:[2,82],191:[2,82]},{21:[1,576]},{19:[2,34],21:[2,34],22:[2,34],28:[2,34],34:[2,34],36:[2,34],37:[2,34],40:[2,34],41:[2,34],42:[2,34],43:[2,34],47:[2,34],48:[2,34],49:[2,34],50:[2,34],51:[2,34],56:[2,34],58:[2,34],59:[2,34],60:[2,34],65:[2,34],67:[2,34],73:[2,34],78:[2,34],81:[2,34],94:[2,34],105:[2,34],106:[2,34],111:[2,34],112:[2,34],113:[2,34],114:[2,34],115:[2,34],116:[2,34],117:[2,34],118:[2,34],119:[2,34],122:[2,34],174:[2,34],187:[2,34],188:[2,34],189:[2,34],190:[2,34],191:[2,34]},{19:[2,35],21:[2,35],22:[2,35],28:[2,35],34:[2,35],36:[2,35],37:[2,35],40:[2,35],41:[2,35],42:[2,35],43:[2,35],47:[2,35],48:[2,35],49:[2,35],50:[2,35],51:[2,35],56:[2,35],58:[2,35],59:[2,35],60:[2,35],65:[2,35],67:[2,35],73:[2,35],78:[2,35],81:[2,35],94:[2,35],105:[2,35],106:[2,35],111:[2,35],112:[2,35],113:[2,35],114:[2,35],115:[2,35],116:[2,35],117:[2,35],118:[2,35],119:[2,35],122:[2,35],174:[2,35],187:[2,35],188:[2,35],189:[2,35],190:[2,35],191:[2,35]},{19:[2,36],21:[2,36],22:[2,36],28:[2,36],34:[2,36],36:[2,36],37:[2,36],40:[2,36],41:[2,36],42:[2,36],43:[2,36],47:[2,36],48:[2,36],49:[2,36],50:[2,36],51:[2,36],56:[2,36],58:[2,36],59:[2,36],60:[2,36],65:[2,36],67:[2,36],73:[2,36],78:[2,36],81:[2,36],94:[2,36],105:[2,36],106:[2,36],111:[2,36],112:[2,36],113:[2,36],114:[2,36],115:[2,36],116:[2,36],117:[2,36],118:[2,36],119:[2,36],122:[2,36],174:[2,36],187:[2,36],188:[2,36],189:[2,36],190:[2,36],191:[2,36]},{25:[1,242],39:[1,577]},{3:578,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{3:579,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[2,41],21:[2,41],22:[2,41],28:[2,41],34:[2,41],36:[2,41],37:[2,41],40:[2,41],41:[2,41],42:[2,41],43:[2,41],47:[2,41],48:[2,41],49:[2,41],50:[2,41],51:[2,41],56:[2,41],58:[2,41],59:[2,41],60:[2,41],65:[2,41],67:[2,41],73:[2,41],78:[2,41],81:[2,41],94:[2,41],105:[2,41],106:[2,41],111:[2,41],112:[2,41],113:[2,41],114:[2,41],115:[2,41],116:[2,41],117:[2,41],118:[2,41],119:[2,41],122:[2,41],174:[2,41],187:[2,41],188:[2,41],189:[2,41],190:[2,41],191:[2,41]},{3:580,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[2,43],21:[2,43],22:[2,43],28:[2,43],34:[2,43],36:[2,43],37:[2,43],40:[2,43],41:[2,43],42:[2,43],43:[2,43],47:[2,43],48:[2,43],49:[2,43],50:[2,43],51:[2,43],56:[2,43],58:[2,43],59:[2,43],60:[2,43],65:[2,43],67:[2,43],73:[2,43],78:[2,43],81:[2,43],94:[2,43],105:[2,43],106:[2,43],111:[2,43],112:[2,43],113:[2,43],114:[2,43],115:[2,43],116:[2,43],117:[2,43],118:[2,43],119:[2,43],122:[2,43],174:[2,43],187:[2,43],188:[2,43],189:[2,43],190:[2,43],191:[2,43]},{19:[2,44],21:[2,44],22:[2,44],28:[2,44],34:[2,44],36:[2,44],37:[2,44],40:[2,44],41:[2,44],42:[2,44],43:[2,44],47:[2,44],48:[2,44],49:[2,44],50:[2,44],51:[2,44],56:[2,44],58:[2,44],59:[2,44],60:[2,44],65:[2,44],67:[2,44],73:[2,44],78:[2,44],81:[2,44],94:[2,44],105:[2,44],106:[2,44],111:[2,44],112:[2,44],113:[2,44],114:[2,44],115:[2,44],116:[2,44],117:[2,44],118:[2,44],119:[2,44],122:[2,44],174:[2,44],187:[2,44],188:[2,44],189:[2,44],190:[2,44],191:[2,44]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:581,39:[1,582],45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{25:[1,242],39:[1,583]},{3:584,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{3:585,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[2,50],21:[2,50],22:[2,50],28:[2,50],34:[2,50],36:[2,50],37:[2,50],40:[2,50],41:[2,50],42:[2,50],43:[2,50],47:[2,50],48:[2,50],49:[2,50],50:[2,50],51:[2,50],56:[2,50],58:[2,50],59:[2,50],60:[2,50],65:[2,50],67:[2,50],73:[2,50],78:[2,50],81:[2,50],94:[2,50],105:[2,50],106:[2,50],111:[2,50],112:[2,50],113:[2,50],114:[2,50],115:[2,50],116:[2,50],117:[2,50],118:[2,50],119:[2,50],122:[2,50],174:[2,50],187:[2,50],188:[2,50],189:[2,50],190:[2,50],191:[2,50]},{25:[2,268],34:[2,268],46:[2,268]},{21:[1,586]},{19:[2,93],21:[2,93],22:[2,93],28:[2,93],34:[2,93],36:[2,93],37:[2,93],41:[2,93],42:[2,93],43:[2,93],47:[2,93],48:[2,93],49:[2,93],50:[2,93],51:[2,93],59:[2,93],60:[2,93],65:[2,93],67:[2,93],68:587,71:517,78:[2,93],81:[2,93],94:[2,93],105:[2,93],106:[2,93],111:[2,93],112:[2,93],113:[2,93],114:[2,93],115:[2,93],116:[2,93],117:[2,93],118:[2,93],119:[2,93],122:[2,93],174:[2,93],187:[2,93],188:[2,93],189:[2,93],190:[2,93],191:[2,93]},{2:[2,86],19:[2,86],21:[2,86],22:[2,86],25:[2,86],28:[2,86],31:[2,86],34:[2,86],36:[2,86],37:[2,86],39:[2,86],40:[2,86],41:[2,86],42:[2,86],43:[2,86],46:[2,86],47:[2,86],48:[2,86],49:[2,86],50:[2,86],51:[2,86],56:[2,86],57:[2,86],58:[2,86],59:[2,86],60:[2,86],65:[2,86],67:[2,86],73:[2,86],78:[2,86],81:[2,86],82:[2,86],93:[2,86],94:[2,86],105:[2,86],106:[2,86],111:[2,86],112:[2,86],113:[2,86],114:[2,86],115:[2,86],116:[2,86],117:[2,86],118:[2,86],119:[2,86],121:[2,86],122:[2,86],123:[2,86],128:[2,86],129:[2,86],130:[2,86],133:[2,86],134:[2,86],135:[2,86],136:[2,86],137:[2,86],141:[2,86],142:[2,86],143:[2,86],144:[2,86],148:[2,86],152:[2,86],156:[2,86],160:[2,86],164:[2,86],168:[2,86],173:[2,86],174:[2,86],175:[2,86],176:[2,86],177:[2,86],178:[2,86],179:[2,86],180:[2,86],181:[2,86],182:[2,86],183:[2,86],187:[2,86],188:[2,86],189:[2,86],190:[2,86],191:[2,86]},{21:[1,588]},{19:[2,93],21:[2,93],22:[2,93],28:[2,93],34:[2,93],36:[2,93],37:[2,93],41:[2,93],42:[2,93],43:[2,93],47:[2,93],48:[2,93],49:[2,93],50:[2,93],51:[2,93],59:[2,93],60:[2,93],65:[2,93],67:[2,93],68:589,71:517,78:[2,93],81:[2,93],94:[2,93],105:[2,93],106:[2,93],111:[2,93],112:[2,93],113:[2,93],114:[2,93],115:[2,93],116:[2,93],117:[2,93],118:[2,93],119:[2,93],122:[2,93],174:[2,93],187:[2,93],188:[2,93],189:[2,93],190:[2,93],191:[2,93]},{19:[1,590]},{19:[2,66],21:[2,66],22:[2,66],28:[2,66],34:[2,66],36:[2,66],37:[2,66],40:[2,66],41:[2,66],42:[2,66],43:[2,66],47:[2,66],48:[2,66],49:[2,66],50:[2,66],51:[2,66],56:[2,66],58:[2,66],59:[2,66],60:[2,66],65:[2,66],67:[2,66],73:[2,66],78:[2,66],81:[2,66],94:[2,66],105:[2,66],106:[2,66],111:[2,66],112:[2,66],113:[2,66],114:[2,66],115:[2,66],116:[2,66],117:[2,66],118:[2,66],119:[2,66],122:[2,66],174:[2,66],187:[2,66],188:[2,66],189:[2,66],190:[2,66],191:[2,66]},{21:[2,69],53:591,56:[2,69]},{21:[2,68],56:[2,68],58:[2,68]},{57:[1,592]},{19:[1,129],28:[1,128],32:111,37:[1,55],38:593,45:113,67:[1,126],70:122,75:121,76:124,77:125,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,92:118,94:[1,119],97:115,99:116,104:136,105:[1,84],106:[1,85],108:135,109:137,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],120:134,122:[1,71],125:133,127:132,132:131,140:130,147:127,151:123,155:120,159:117,163:114,167:112,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[2,78],21:[2,78],22:[2,78],28:[2,78],34:[2,78],36:[2,78],37:[2,78],40:[2,78],41:[2,78],42:[2,78],43:[2,78],47:[2,78],48:[2,78],49:[2,78],50:[2,78],51:[2,78],56:[2,78],58:[2,78],59:[2,78],60:[2,78],64:[2,78],65:[2,78],67:[2,78],73:[2,78],78:[2,78],81:[2,78],94:[2,78],105:[2,78],106:[2,78],111:[2,78],112:[2,78],113:[2,78],114:[2,78],115:[2,78],116:[2,78],117:[2,78],118:[2,78],119:[2,78],122:[2,78],174:[2,78],187:[2,78],188:[2,78],189:[2,78],190:[2,78],191:[2,78]},{19:[2,83],21:[2,83],22:[2,83],28:[2,83],34:[2,83],36:[2,83],37:[2,83],41:[2,83],42:[2,83],43:[2,83],47:[2,83],48:[2,83],49:[2,83],50:[2,83],51:[2,83],59:[2,83],60:[2,83],65:[2,83],67:[2,83],73:[2,83],78:[2,83],81:[2,83],94:[2,83],105:[2,83],106:[2,83],111:[2,83],112:[2,83],113:[2,83],114:[2,83],115:[2,83],116:[2,83],117:[2,83],118:[2,83],119:[2,83],122:[2,83],174:[2,83],187:[2,83],188:[2,83],189:[2,83],190:[2,83],191:[2,83]},{3:594,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[2,39],21:[2,39],22:[2,39],28:[2,39],34:[2,39],36:[2,39],37:[2,39],40:[2,39],
	41:[2,39],42:[2,39],43:[2,39],47:[2,39],48:[2,39],49:[2,39],50:[2,39],51:[2,39],56:[2,39],58:[2,39],59:[2,39],60:[2,39],65:[2,39],67:[2,39],73:[2,39],78:[2,39],81:[2,39],94:[2,39],105:[2,39],106:[2,39],111:[2,39],112:[2,39],113:[2,39],114:[2,39],115:[2,39],116:[2,39],117:[2,39],118:[2,39],119:[2,39],122:[2,39],174:[2,39],187:[2,39],188:[2,39],189:[2,39],190:[2,39],191:[2,39]},{19:[2,40],21:[2,40],22:[2,40],28:[2,40],34:[2,40],36:[2,40],37:[2,40],40:[2,40],41:[2,40],42:[2,40],43:[2,40],47:[2,40],48:[2,40],49:[2,40],50:[2,40],51:[2,40],56:[2,40],58:[2,40],59:[2,40],60:[2,40],65:[2,40],67:[2,40],73:[2,40],78:[2,40],81:[2,40],94:[2,40],105:[2,40],106:[2,40],111:[2,40],112:[2,40],113:[2,40],114:[2,40],115:[2,40],116:[2,40],117:[2,40],118:[2,40],119:[2,40],122:[2,40],174:[2,40],187:[2,40],188:[2,40],189:[2,40],190:[2,40],191:[2,40]},{19:[2,42],21:[2,42],22:[2,42],28:[2,42],34:[2,42],36:[2,42],37:[2,42],40:[2,42],41:[2,42],42:[2,42],43:[2,42],47:[2,42],48:[2,42],49:[2,42],50:[2,42],51:[2,42],56:[2,42],58:[2,42],59:[2,42],60:[2,42],65:[2,42],67:[2,42],73:[2,42],78:[2,42],81:[2,42],94:[2,42],105:[2,42],106:[2,42],111:[2,42],112:[2,42],113:[2,42],114:[2,42],115:[2,42],116:[2,42],117:[2,42],118:[2,42],119:[2,42],122:[2,42],174:[2,42],187:[2,42],188:[2,42],189:[2,42],190:[2,42],191:[2,42]},{25:[1,242],39:[1,595]},{3:596,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{3:597,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[2,49],21:[2,49],22:[2,49],28:[2,49],34:[2,49],36:[2,49],37:[2,49],40:[2,49],41:[2,49],42:[2,49],43:[2,49],47:[2,49],48:[2,49],49:[2,49],50:[2,49],51:[2,49],56:[2,49],58:[2,49],59:[2,49],60:[2,49],65:[2,49],67:[2,49],73:[2,49],78:[2,49],81:[2,49],94:[2,49],105:[2,49],106:[2,49],111:[2,49],112:[2,49],113:[2,49],114:[2,49],115:[2,49],116:[2,49],117:[2,49],118:[2,49],119:[2,49],122:[2,49],174:[2,49],187:[2,49],188:[2,49],189:[2,49],190:[2,49],191:[2,49]},{19:[2,51],21:[2,51],22:[2,51],28:[2,51],34:[2,51],36:[2,51],37:[2,51],40:[2,51],41:[2,51],42:[2,51],43:[2,51],47:[2,51],48:[2,51],49:[2,51],50:[2,51],51:[2,51],56:[2,51],58:[2,51],59:[2,51],60:[2,51],65:[2,51],67:[2,51],73:[2,51],78:[2,51],81:[2,51],94:[2,51],105:[2,51],106:[2,51],111:[2,51],112:[2,51],113:[2,51],114:[2,51],115:[2,51],116:[2,51],117:[2,51],118:[2,51],119:[2,51],122:[2,51],174:[2,51],187:[2,51],188:[2,51],189:[2,51],190:[2,51],191:[2,51]},{2:[2,84],19:[2,84],21:[2,84],22:[2,84],25:[2,84],28:[2,84],31:[2,84],34:[2,84],36:[2,84],37:[2,84],39:[2,84],40:[2,84],41:[2,84],42:[2,84],43:[2,84],46:[2,84],47:[2,84],48:[2,84],49:[2,84],50:[2,84],51:[2,84],56:[2,84],57:[2,84],58:[2,84],59:[2,84],60:[2,84],65:[2,84],67:[2,84],73:[2,84],78:[2,84],81:[2,84],82:[2,84],93:[2,84],94:[2,84],105:[2,84],106:[2,84],111:[2,84],112:[2,84],113:[2,84],114:[2,84],115:[2,84],116:[2,84],117:[2,84],118:[2,84],119:[2,84],121:[2,84],122:[2,84],123:[2,84],128:[2,84],129:[2,84],130:[2,84],133:[2,84],134:[2,84],135:[2,84],136:[2,84],137:[2,84],141:[2,84],142:[2,84],143:[2,84],144:[2,84],148:[2,84],152:[2,84],156:[2,84],160:[2,84],164:[2,84],168:[2,84],173:[2,84],174:[2,84],175:[2,84],176:[2,84],177:[2,84],178:[2,84],179:[2,84],180:[2,84],181:[2,84],182:[2,84],183:[2,84],187:[2,84],188:[2,84],189:[2,84],190:[2,84],191:[2,84]},{21:[1,598]},{2:[2,87],19:[2,87],21:[2,87],22:[2,87],25:[2,87],28:[2,87],31:[2,87],34:[2,87],36:[2,87],37:[2,87],39:[2,87],40:[2,87],41:[2,87],42:[2,87],43:[2,87],46:[2,87],47:[2,87],48:[2,87],49:[2,87],50:[2,87],51:[2,87],56:[2,87],57:[2,87],58:[2,87],59:[2,87],60:[2,87],65:[2,87],67:[2,87],73:[2,87],78:[2,87],81:[2,87],82:[2,87],93:[2,87],94:[2,87],105:[2,87],106:[2,87],111:[2,87],112:[2,87],113:[2,87],114:[2,87],115:[2,87],116:[2,87],117:[2,87],118:[2,87],119:[2,87],121:[2,87],122:[2,87],123:[2,87],128:[2,87],129:[2,87],130:[2,87],133:[2,87],134:[2,87],135:[2,87],136:[2,87],137:[2,87],141:[2,87],142:[2,87],143:[2,87],144:[2,87],148:[2,87],152:[2,87],156:[2,87],160:[2,87],164:[2,87],168:[2,87],173:[2,87],174:[2,87],175:[2,87],176:[2,87],177:[2,87],178:[2,87],179:[2,87],180:[2,87],181:[2,87],182:[2,87],183:[2,87],187:[2,87],188:[2,87],189:[2,87],190:[2,87],191:[2,87]},{21:[1,599]},{19:[2,93],21:[2,93],22:[2,93],28:[2,93],34:[2,93],36:[2,93],37:[2,93],41:[2,93],42:[2,93],43:[2,93],47:[2,93],48:[2,93],49:[2,93],50:[2,93],51:[2,93],59:[2,93],60:[2,93],65:[2,93],67:[2,93],68:600,71:517,78:[2,93],81:[2,93],94:[2,93],105:[2,93],106:[2,93],111:[2,93],112:[2,93],113:[2,93],114:[2,93],115:[2,93],116:[2,93],117:[2,93],118:[2,93],119:[2,93],122:[2,93],174:[2,93],187:[2,93],188:[2,93],189:[2,93],190:[2,93],191:[2,93]},{21:[1,601],55:572,56:[1,574]},{19:[2,18],20:602,21:[2,18],22:[2,18],28:[2,18],34:[2,18],36:[2,18],37:[2,18],41:[2,18],42:[2,18],43:[2,18],47:[2,18],48:[2,18],49:[2,18],50:[2,18],51:[2,18],56:[2,18],59:[2,18],60:[2,18],65:[2,18],78:[2,18],81:[2,18],94:[2,18],105:[2,18],106:[2,18],111:[2,18],112:[2,18],113:[2,18],114:[2,18],115:[2,18],116:[2,18],117:[2,18],118:[2,18],119:[2,18],122:[2,18],174:[2,18],187:[2,18],188:[2,18],189:[2,18],190:[2,18],191:[2,18]},{25:[1,242],57:[1,603]},{19:[2,38],21:[2,38],22:[2,38],28:[2,38],34:[2,38],36:[2,38],37:[2,38],40:[2,38],41:[2,38],42:[2,38],43:[2,38],47:[2,38],48:[2,38],49:[2,38],50:[2,38],51:[2,38],56:[2,38],58:[2,38],59:[2,38],60:[2,38],65:[2,38],67:[2,38],73:[2,38],78:[2,38],81:[2,38],94:[2,38],105:[2,38],106:[2,38],111:[2,38],112:[2,38],113:[2,38],114:[2,38],115:[2,38],116:[2,38],117:[2,38],118:[2,38],119:[2,38],122:[2,38],174:[2,38],187:[2,38],188:[2,38],189:[2,38],190:[2,38],191:[2,38]},{3:604,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[2,47],21:[2,47],22:[2,47],28:[2,47],34:[2,47],36:[2,47],37:[2,47],40:[2,47],41:[2,47],42:[2,47],43:[2,47],47:[2,47],48:[2,47],49:[2,47],50:[2,47],51:[2,47],56:[2,47],58:[2,47],59:[2,47],60:[2,47],65:[2,47],67:[2,47],73:[2,47],78:[2,47],81:[2,47],94:[2,47],105:[2,47],106:[2,47],111:[2,47],112:[2,47],113:[2,47],114:[2,47],115:[2,47],116:[2,47],117:[2,47],118:[2,47],119:[2,47],122:[2,47],174:[2,47],187:[2,47],188:[2,47],189:[2,47],190:[2,47],191:[2,47]},{19:[2,48],21:[2,48],22:[2,48],28:[2,48],34:[2,48],36:[2,48],37:[2,48],40:[2,48],41:[2,48],42:[2,48],43:[2,48],47:[2,48],48:[2,48],49:[2,48],50:[2,48],51:[2,48],56:[2,48],58:[2,48],59:[2,48],60:[2,48],65:[2,48],67:[2,48],73:[2,48],78:[2,48],81:[2,48],94:[2,48],105:[2,48],106:[2,48],111:[2,48],112:[2,48],113:[2,48],114:[2,48],115:[2,48],116:[2,48],117:[2,48],118:[2,48],119:[2,48],122:[2,48],174:[2,48],187:[2,48],188:[2,48],189:[2,48],190:[2,48],191:[2,48]},{2:[2,85],19:[2,85],21:[2,85],22:[2,85],25:[2,85],28:[2,85],31:[2,85],34:[2,85],36:[2,85],37:[2,85],39:[2,85],40:[2,85],41:[2,85],42:[2,85],43:[2,85],46:[2,85],47:[2,85],48:[2,85],49:[2,85],50:[2,85],51:[2,85],56:[2,85],57:[2,85],58:[2,85],59:[2,85],60:[2,85],65:[2,85],67:[2,85],73:[2,85],78:[2,85],81:[2,85],82:[2,85],93:[2,85],94:[2,85],105:[2,85],106:[2,85],111:[2,85],112:[2,85],113:[2,85],114:[2,85],115:[2,85],116:[2,85],117:[2,85],118:[2,85],119:[2,85],121:[2,85],122:[2,85],123:[2,85],128:[2,85],129:[2,85],130:[2,85],133:[2,85],134:[2,85],135:[2,85],136:[2,85],137:[2,85],141:[2,85],142:[2,85],143:[2,85],144:[2,85],148:[2,85],152:[2,85],156:[2,85],160:[2,85],164:[2,85],168:[2,85],173:[2,85],174:[2,85],175:[2,85],176:[2,85],177:[2,85],178:[2,85],179:[2,85],180:[2,85],181:[2,85],182:[2,85],183:[2,85],187:[2,85],188:[2,85],189:[2,85],190:[2,85],191:[2,85]},{21:[2,120],25:[2,120]},{21:[1,605]},{19:[2,67],21:[2,67],22:[2,67],28:[2,67],34:[2,67],36:[2,67],37:[2,67],40:[2,67],41:[2,67],42:[2,67],43:[2,67],47:[2,67],48:[2,67],49:[2,67],50:[2,67],51:[2,67],56:[2,67],58:[2,67],59:[2,67],60:[2,67],65:[2,67],67:[2,67],73:[2,67],78:[2,67],81:[2,67],94:[2,67],105:[2,67],106:[2,67],111:[2,67],112:[2,67],113:[2,67],114:[2,67],115:[2,67],116:[2,67],117:[2,67],118:[2,67],119:[2,67],122:[2,67],174:[2,67],187:[2,67],188:[2,67],189:[2,67],190:[2,67],191:[2,67]},{3:214,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],21:[2,71],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],56:[2,71],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69},{19:[2,18],20:606,21:[2,18],22:[2,18],28:[2,18],34:[2,18],36:[2,18],37:[2,18],41:[2,18],42:[2,18],43:[2,18],47:[2,18],48:[2,18],49:[2,18],50:[2,18],51:[2,18],56:[2,18],58:[2,18],59:[2,18],60:[2,18],65:[2,18],78:[2,18],81:[2,18],94:[2,18],105:[2,18],106:[2,18],111:[2,18],112:[2,18],113:[2,18],114:[2,18],115:[2,18],116:[2,18],117:[2,18],118:[2,18],119:[2,18],122:[2,18],174:[2,18],187:[2,18],188:[2,18],189:[2,18],190:[2,18],191:[2,18]},{19:[2,46],21:[2,46],22:[2,46],28:[2,46],34:[2,46],36:[2,46],37:[2,46],40:[2,46],41:[2,46],42:[2,46],43:[2,46],47:[2,46],48:[2,46],49:[2,46],50:[2,46],51:[2,46],56:[2,46],58:[2,46],59:[2,46],60:[2,46],65:[2,46],67:[2,46],73:[2,46],78:[2,46],81:[2,46],94:[2,46],105:[2,46],106:[2,46],111:[2,46],112:[2,46],113:[2,46],114:[2,46],115:[2,46],116:[2,46],117:[2,46],118:[2,46],119:[2,46],122:[2,46],174:[2,46],187:[2,46],188:[2,46],189:[2,46],190:[2,46],191:[2,46]},{21:[2,121],25:[2,121]},{3:214,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:[1,23],21:[2,70],22:[1,24],28:[1,35],34:[1,25],35:26,36:[1,27],37:[1,55],41:[1,28],42:[1,29],43:[1,30],47:[1,31],48:[1,32],49:[1,33],50:[1,34],51:[1,36],56:[2,70],58:[2,70],59:[1,37],60:[1,38],65:[1,39],76:50,78:[1,52],79:53,80:54,81:[1,62],90:60,91:59,94:[1,48],96:47,98:44,100:45,103:42,105:[1,84],106:[1,85],107:77,109:78,110:76,111:[1,79],112:[1,80],113:[1,81],114:[1,82],115:[1,83],116:[1,86],117:[1,87],118:[1,88],119:[1,89],122:[1,71],124:75,126:74,131:73,139:70,146:63,150:56,154:51,158:49,162:46,166:43,170:41,172:40,174:[1,72],184:57,185:58,186:61,187:[1,64],188:[1,65],189:[1,66],190:[1,67],191:[1,68],192:69}],defaultActions:{3:[2,91],71:[2,308],72:[2,309],543:[2,125]},parseError:function(str,hash){if(!hash.recoverable)throw new Error(str);this.trace(str)},parse:function(input){function popStack(n){stack.length=stack.length-2*n,vstack.length=vstack.length-n,lstack.length=lstack.length-n}function lex(){var token;return token=self.lexer.lex()||EOF,"number"!=typeof token&&(token=self.symbols_[token]||token),token}function locateNearestErrorRecoveryRule(state){for(var stack_probe=stack.length-1,depth=0;;){if(TERROR.toString()in table[state])return depth;if(0===state||stack_probe<2)return!1;stack_probe-=2,state=stack[stack_probe],++depth}}var self=this,stack=[0],vstack=[null],lstack=[],table=this.table,yytext="",yylineno=0,yyleng=0,recovering=0,TERROR=2,EOF=1,args=lstack.slice.call(arguments,1);this.lexer.setInput(input),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,"undefined"==typeof this.lexer.yylloc&&(this.lexer.yylloc={});var yyloc=this.lexer.yylloc;lstack.push(yyloc);var ranges=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError?this.parseError=this.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var symbol,preErrorSymbol,state,action,r,p,len,newState,expected,yyval={};;){if(state=stack[stack.length-1],this.defaultActions[state]?action=this.defaultActions[state]:(null!==symbol&&"undefined"!=typeof symbol||(symbol=lex()),action=table[state]&&table[state][symbol]),"undefined"==typeof action||!action.length||!action[0]){var error_rule_depth,errStr="";if(recovering)preErrorSymbol!==EOF&&(error_rule_depth=locateNearestErrorRecoveryRule(state));else{error_rule_depth=locateNearestErrorRecoveryRule(state),expected=[];for(p in table[state])this.terminals_[p]&&p>TERROR&&expected.push("'"+this.terminals_[p]+"'");errStr=this.lexer.showPosition?"Parse error on line "+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(", ")+", got '"+(this.terminals_[symbol]||symbol)+"'":"Parse error on line "+(yylineno+1)+": Unexpected "+(symbol==EOF?"end of input":"'"+(this.terminals_[symbol]||symbol)+"'"),this.parseError(errStr,{text:this.lexer.match,token:this.terminals_[symbol]||symbol,line:this.lexer.yylineno,loc:yyloc,expected:expected,recoverable:error_rule_depth!==!1})}if(3==recovering){if(symbol===EOF||preErrorSymbol===EOF)throw new Error(errStr||"Parsing halted while starting to recover from another error.");yyleng=this.lexer.yyleng,yytext=this.lexer.yytext,yylineno=this.lexer.yylineno,yyloc=this.lexer.yylloc,symbol=lex()}if(error_rule_depth===!1)throw new Error(errStr||"Parsing halted. No suitable error recovery rule available.");popStack(error_rule_depth),preErrorSymbol=symbol==TERROR?null:symbol,symbol=TERROR,state=stack[stack.length-1],action=table[state]&&table[state][TERROR],recovering=3}if(action[0]instanceof Array&&action.length>1)throw new Error("Parse Error: multiple actions possible at state: "+state+", token: "+symbol);switch(action[0]){case 1:stack.push(symbol),vstack.push(this.lexer.yytext),lstack.push(this.lexer.yylloc),stack.push(action[1]),symbol=null,preErrorSymbol?(symbol=preErrorSymbol,preErrorSymbol=null):(yyleng=this.lexer.yyleng,yytext=this.lexer.yytext,yylineno=this.lexer.yylineno,yyloc=this.lexer.yylloc,recovering>0&&recovering--);break;case 2:if(len=this.productions_[action[1]][1],yyval.$=vstack[vstack.length-len],yyval._$={first_line:lstack[lstack.length-(len||1)].first_line,last_line:lstack[lstack.length-1].last_line,first_column:lstack[lstack.length-(len||1)].first_column,last_column:lstack[lstack.length-1].last_column},ranges&&(yyval._$.range=[lstack[lstack.length-(len||1)].range[0],lstack[lstack.length-1].range[1]]),r=this.performAction.apply(yyval,[yytext,yyleng,yylineno,this.yy,action[1],vstack,lstack].concat(args)),"undefined"!=typeof r)return r;len&&(stack=stack.slice(0,-1*len*2),vstack=vstack.slice(0,-1*len),lstack=lstack.slice(0,-1*len)),stack.push(this.productions_[action[1]][0]),vstack.push(yyval.$),lstack.push(yyval._$),newState=table[stack[stack.length-2]][stack[stack.length-1]],stack.push(newState);break;case 3:return!0}}return!0}},_originalParseMethod=parser.parse;parser.parse=function(source,args){return parser.wasNewLine=!1,parser.newLine=!1,parser.restricted=!1,_originalParseMethod.call(this,source)},parser.parseError=function(str,hash){if(!(hash.expected&&hash.expected.indexOf("';'")>=0&&("}"===hash.token||"EOF"===hash.token||"BR++"===hash.token||"BR--"===hash.token||parser.newLine||parser.wasNewLine)))throw new SyntaxError(str)},parser.ast={},parser.ast.ProgramNode=ProgramNode,parser.ast.EmptyStatementNode=EmptyStatementNode,parser.ast.BlockStatementNode=BlockStatementNode,parser.ast.ExpressionStatementNode=ExpressionStatementNode,parser.ast.IfStatementNode=IfStatementNode,parser.ast.LabeledStatementNode=LabeledStatementNode,parser.ast.BreakStatementNode=BreakStatementNode,parser.ast.ContinueStatementNode=ContinueStatementNode,parser.ast.WithStatementNode=WithStatementNode,parser.ast.SwitchStatementNode=SwitchStatementNode,parser.ast.ReturnStatementNode=ReturnStatementNode,parser.ast.ThrowStatementNode=ThrowStatementNode,parser.ast.TryStatementNode=TryStatementNode,parser.ast.WhileStatementNode=WhileStatementNode,parser.ast.DoWhileStatementNode=DoWhileStatementNode,parser.ast.ForStatementNode=ForStatementNode,parser.ast.ForInStatementNode=ForInStatementNode,parser.ast.DebugggerStatementNode=DebugggerStatementNode,parser.ast.FunctionDeclarationNode=FunctionDeclarationNode,parser.ast.VariableDeclarationNode=VariableDeclarationNode,parser.ast.VariableDeclaratorNode=VariableDeclaratorNode,parser.ast.ThisExpressionNode=ThisExpressionNode,parser.ast.ArrayExpressionNode=ArrayExpressionNode,parser.ast.ObjectExpressionNode=ObjectExpressionNode,parser.ast.FunctionExpressionNode=FunctionExpressionNode,parser.ast.SequenceExpressionNode=SequenceExpressionNode,parser.ast.UnaryExpressionNode=UnaryExpressionNode,parser.ast.BinaryExpressionNode=BinaryExpressionNode,parser.ast.AssignmentExpressionNode=AssignmentExpressionNode,parser.ast.UpdateExpressionNode=UpdateExpressionNode,parser.ast.LogicalExpressionNode=LogicalExpressionNode,parser.ast.ConditionalExpressionNode=ConditionalExpressionNode,parser.ast.NewExpressionNode=NewExpressionNode,parser.ast.CallExpressionNode=CallExpressionNode,parser.ast.MemberExpressionNode=MemberExpressionNode,parser.ast.SwitchCaseNode=SwitchCaseNode,parser.ast.CatchClauseNode=CatchClauseNode,parser.ast.IdentifierNode=IdentifierNode,parser.ast.LiteralNode=LiteralNode;var lexer=function(){var lexer={EOF:1,parseError:function(str,hash){if(!this.yy.parser)throw new Error(str);this.yy.parser.parseError(str,hash)},setInput:function(input){return this._input=input,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var ch=this._input[0];this.yytext+=ch,this.yyleng++,this.offset++,this.match+=ch,this.matched+=ch;var lines=ch.match(/(?:\r\n?|\n).*/g);return lines?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),ch},unput:function(ch){var len=ch.length,lines=ch.split(/(?:\r\n?|\n)/g);this._input=ch+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-len-1),this.offset-=len;var oldLines=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),lines.length-1&&(this.yylineno-=lines.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:lines?(lines.length===oldLines.length?this.yylloc.first_column:0)+oldLines[oldLines.length-lines.length].length-lines[0].length:this.yylloc.first_column-len},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-len]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},less:function(n){this.unput(this.match.slice(n))},pastInput:function(){var past=this.matched.substr(0,this.matched.length-this.match.length);return(past.length>20?"...":"")+past.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var next=this.match;return next.length<20&&(next+=this._input.substr(0,20-next.length)),(next.substr(0,20)+(next.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var pre=this.pastInput(),c=new Array(pre.length+1).join("-");return pre+this.upcomingInput()+"\n"+c+"^"},test_match:function(match,indexed_rule){var token,lines,backup;if(this.options.backtrack_lexer&&(backup={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(backup.yylloc.range=this.yylloc.range.slice(0))),lines=match[0].match(/(?:\r\n?|\n).*/g),lines&&(this.yylineno+=lines.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:lines?lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+match[0].length},this.yytext+=match[0],this.match+=match[0],this.matches=match,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(match[0].length),this.matched+=match[0],token=this.performAction.call(this,this.yy,this,indexed_rule,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),token)return token;if(this._backtrack){for(var k in backup)this[k]=backup[k];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var token,match,tempMatch,index;this._more||(this.yytext="",this.match="");for(var rules=this._currentRules(),i=0;i<rules.length;i++)if(tempMatch=this._input.match(this.rules[rules[i]]),tempMatch&&(!match||tempMatch[0].length>match[0].length)){if(match=tempMatch,index=i,this.options.backtrack_lexer){if(token=this.test_match(tempMatch,rules[i]),token!==!1)return token;if(this._backtrack){match=!1;continue}return!1}if(!this.options.flex)break}return match?(token=this.test_match(match,rules[index]),token!==!1&&token):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var r=this.next();return r?r:this.lex()},begin:function(condition){this.conditionStack.push(condition)},popState:function(){var n=this.conditionStack.length-1;return n>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(n){return n=this.conditionStack.length-1-Math.abs(n||0),n>=0?this.conditionStack[n]:"INITIAL"},pushState:function(condition){this.begin(condition)},stateStackSize:function(){return this.conditionStack.length},options:{flex:!0},performAction:function(yy,yy_,$avoiding_name_collisions,YY_START){switch($avoiding_name_collisions){case 0:return this.begin("INITIAL"),"REGEXP_LITERAL";case 1:return"BR++";case 2:return"BR--";case 3:if(yy_.yytext.match(/\r|\n/)&&(parser.newLine=!0),parser.restricted&&parser.newLine)return this.unput(yy_.yytext),parser.restricted=!1,";";break;case 4:if(yy_.yytext.match(/\r|\n/)&&(parser.newLine=!0),parser.restricted&&parser.newLine)return this.unput(yy_.yytext),parser.restricted=!1,";";break;case 5:if(yy_.yytext.match(/\r|\n/)&&(parser.newLine=!0),parser.restricted&&parser.newLine)return this.unput(yy_.yytext),parser.restricted=!1,";";break;case 6:return parser.restricted=!1,"STRING_LITERAL";case 7:return parser.restricted=!0,"BREAK";case 8:return"CASE";case 9:return"CATCH";case 10:return parser.restricted=!0,"CONTINUE";case 11:return"DEBUGGER";case 12:return"DEFAULT";case 13:return"DELETE";case 14:return"DO";case 15:return"ELSE";case 16:return"FINALLY";case 17:return"FOR";case 18:return"FUNCTION";case 19:return"IF";case 20:return"IN";case 21:return"INSTANCEOF";case 22:return parser.restricted=!1,"NEW";case 23:return parser.restricted=!0,"RETURN";case 24:return"SWITCH";case 25:return parser.restricted=!1,"THIS";case 26:return parser.restricted=!0,"THROW";case 27:return"TRY";case 28:return parser.restricted=!1,"TYPEOF";case 29:return"VAR";case 30:return parser.restricted=!1,"VOID";case 31:return"WHILE";case 32:return"WITH";case 33:return parser.restricted=!1,"TRUE";case 34:return parser.restricted=!1,"FALSE";case 35:return parser.restricted=!1,"NULL";case 36:return"CLASS";case 37:return"CONST";case 38:return"ENUM";case 39:return"EXPORT";case 40:return"EXTENDS";case 41:return"IMPORT";case 42:return"SUPER";case 43:return parser.restricted=!1,"IDENTIFIER";case 44:return parser.restricted=!1,"NUMERIC_LITERAL";case 45:return parser.restricted=!1,"NUMERIC_LITERAL";case 46:return parser.restricted=!1,"NUMERIC_LITERAL";case 47:return parser.restricted=!1,"{";case 48:return"}";case 49:return parser.restricted=!1,"(";case 50:return")";case 51:return parser.restricted=!1,"[";case 52:return"]";case 53:return".";case 54:return parser.restricted=!1,";";case 55:return",";case 56:return"?";case 57:return":";case 58:return"===";case 59:return"==";case 60:return"=";case 61:return"!==";case 62:return"!=";case 63:return parser.restricted=!1,"!";case 64:return"<<=";case 65:return"<<";case 66:return"<=";case 67:return"<";case 68:return">>>=";case 69:return">>>";case 70:return">>=";case 71:return">>";case 72:return">=";case 73:return">";case 74:return"+=";case 75:return parser.restricted=!1,"++";case 76:return"+";case 77:return"-=";case 78:return parser.restricted=!1,"--";case 79:return"-";case 80:return"*=";case 81:return"*";case 82:return"/=";case 83:return"/";case 84:return"%=";case 85:return"%";case 86:return"&&";case 87:return"&=";case 88:return"&";case 89:return"||";case 90:return"|=";case 91:return"|";case 92:return"^=";case 93:return"^";case 94:return parser.restricted=!1,"~";case 95:return"EOF";case 96:return"ERROR";case 97:console.log(yy_.yytext)}},rules:[/^(?:(((([^\n\r\*\\\/\[])|(\\([^\n\r]))|(\[([^\n\r\]\\]|(\\([^\n\r])))*\]))(([^\n\r\\\/\[])|(\\([^\n\r]))|(\[([^\n\r\]\\]|(\\([^\n\r])))*\]))*)\/(((([\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc])|[$_a-zA-Z]|(\\[u]([0-9a-fA-F]){4}))|([\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc0-9\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19b0-\u19c0\u19c8\u19c9\u19d0-\u19d9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f])|[0-9])*)))/,/^(?:(\r\n|\r|\n)+\s*\+\+)/,/^(?:(\r\n|\r|\n)+\s*--)/,/^(?:\s+)/,/^(?:\/\*(.|\r|\n)*?\*\/)/,/^(?:\/\/.*($|\r\n|\r|\n))/,/^(?:(("(([^\"\\\n\r]+)|(\\((([\'\"\\bfnrtv])|([^\'\"\\bfnrtv0-9xu]))|((?:[1-7][0-7]{0,2}|[0-7]{2,3}))|([x]([0-9a-fA-F]){2})|([u]([0-9a-fA-F]){4})))|(\\(\r\n|\r|\n)))*")|('(([^\'\\\n\r]+)|(\\((([\'\"\\bfnrtv])|([^\'\"\\bfnrtv0-9xu]))|((?:[1-7][0-7]{0,2}|[0-7]{2,3}))|([x]([0-9a-fA-F]){2})|([u]([0-9a-fA-F]){4})))|(\\(\r\n|\r|\n)))*')))/,/^(?:break)/,/^(?:case)/,/^(?:catch)/,/^(?:continue)/,/^(?:debugger)/,/^(?:default)/,/^(?:delete)/,/^(?:do)/,/^(?:else)/,/^(?:finally)/,/^(?:for)/,/^(?:function)/,/^(?:if)/,/^(?:in)/,/^(?:instanceof)/,/^(?:new)/,/^(?:return)/,/^(?:switch)/,/^(?:this)/,/^(?:throw)/,/^(?:try)/,/^(?:typeof)/,/^(?:var)/,/^(?:void)/,/^(?:while)/,/^(?:with)/,/^(?:true)/,/^(?:false)/,/^(?:null)/,/^(?:class)/,/^(?:const)/,/^(?:enum)/,/^(?:export)/,/^(?:extends)/,/^(?:import)/,/^(?:super)/,/^(?:((([\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc])|[$_a-zA-Z]|(\\[u]([0-9a-fA-F]){4}))((([\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc])|[$_a-zA-Z]|(\\[u]([0-9a-fA-F]){4}))|([\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc0-9\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19b0-\u19c0\u19c8\u19c9\u19d0-\u19d9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f])|[0-9])*))/,/^(?:((([0]|(([1-9])([0-9]+)*))\.([0-9]+)*(([eE])([+-]?[0-9]+))?)|(\.([0-9]+)(([eE])([+-]?[0-9]+))?)|(([0]|(([1-9])([0-9]+)*))(([eE])([+-]?[0-9]+))?)))/,/^(?:([0][xX]([0-9a-fA-F])+))/,/^(?:([0]([0-7])+))/,/^(?:\{)/,/^(?:\})/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:\.)/,/^(?:;)/,/^(?:,)/,/^(?:\?)/,/^(?::)/,/^(?:===)/,/^(?:==)/,/^(?:=)/,/^(?:!==)/,/^(?:!=)/,/^(?:!)/,/^(?:<<=)/,/^(?:<<)/,/^(?:<=)/,/^(?:<)/,/^(?:>>>=)/,/^(?:>>>)/,/^(?:>>=)/,/^(?:>>)/,/^(?:>=)/,/^(?:>)/,/^(?:\+=)/,/^(?:\+\+)/,/^(?:\+)/,/^(?:-=)/,/^(?:--)/,/^(?:-)/,/^(?:\*=)/,/^(?:\*)/,/^(?:\/=)/,/^(?:\/)/,/^(?:%=)/,/^(?:%)/,/^(?:&&)/,/^(?:&=)/,/^(?:&)/,/^(?:\|\|)/,/^(?:\|=)/,/^(?:\|)/,/^(?:\^=)/,/^(?:\^)/,/^(?:~)/,/^(?:$)/,/^(?:.)/,/^(?:.)/],
	conditions:{REGEXP:{rules:[0],inclusive:!1},INITIAL:{rules:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97],inclusive:!0}}},_originalLexMethod=lexer.lex;return lexer.lex=function(){return parser.wasNewLine=parser.newLine,parser.newLine=!1,_originalLexMethod.call(this)},lexer}();return parser.lexer=lexer,Parser.prototype=parser,parser.Parser=Parser,new Parser}();"undefined"!="function"&&"undefined"!=typeof exports&&(exports.parser=parser,exports.Parser=parser.Parser,exports.parse=function(){return parser.parse.apply(parser,arguments)},exports.main=function(args){args[1]||(console.log("Usage: "+args[0]+" FILE"),process.exit(1));var source=__webpack_require__(89).readFileSync(__webpack_require__(90).normalize(args[1]),"utf8");return exports.parser.parse(source)},"undefined"!=typeof module&&__webpack_require__.c[0]===module&&exports.main(process.argv.slice(1)));var GPUUtils=function(){function systemEndianness(){if(null!==endianness)return endianness;var b=new ArrayBuffer(4),a=new Uint32Array(b),c=new Uint8Array(b);if(a[0]=3735928559,239==c[0])return endianness="LE";if(222==c[0])return endianness="BE";throw new Error("unknown endianness")}function isFunction(funcObj){return"function"==typeof funcObj}function isFunctionString(funcStr){return null!==funcStr&&"function"==funcStr.toString().slice(0,"function".length).toLowerCase()}function getFunctionName_fromString(funcStr){return FUNCTION_NAME.exec(funcStr)[1]}function getParamNames_fromString(func){var fnStr=func.toString().replace(STRIP_COMMENTS,""),result=fnStr.slice(fnStr.indexOf("(")+1,fnStr.indexOf(")")).match(ARGUMENT_NAMES);return null===result&&(result=[]),result}function clone(obj){if(null===obj||"object"!=typeof obj||"isActiveClone"in obj)return obj;var temp=obj.constructor();for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(obj.isActiveClone=null,temp[key]=clone(obj[key]),delete obj.isActiveClone);return temp}function newPromise(executor){var imple=Promise||small_promise;if(null===imple)throw TypeError("Browser is missing Promise implmentation. Consider adding small_promise.js polyfill");return new imple(executor)}function functionBinder(inFunc,thisObj){return inFunc.bind?inFunc.bind(thisObj):function(){var args=1===arguments.length?[arguments[0]]:Array.apply(null,arguments);return inFunc.apply(thisObj,args)}}function isArray(arr){var tag=Object.prototype.toString.call(arr);return tag.indexOf("Array]",tag.length-6)!==-1}function getArgumentType(arg){return GPUUtils.isArray(arg)?"Array":"number"==typeof arg?"Number":arg instanceof GPUTexture?"Texture":"Unknown"}function isCanvas(canvasObj){return null!=canvasObj&&canvasObj.nodeName&&canvasObj.getContext&&"CANVAS"===canvasObj.nodeName.toUpperCase()}function browserSupport_canvas(){return null!==browserSupport_canvas_memoizer?browserSupport_canvas_memoizer:browserSupport_canvas_memoizer=isCanvas(document.createElement("canvas"))}function init_canvas(){if(browserSupport_canvas_memoizer===!1)return null;var canvas=document.createElement("canvas");return null===browserSupport_canvas_memoizer&&(browserSupport_canvas_memoizer=isCanvas(canvas),browserSupport_canvas_memoizer===!1)?null:(canvas.width=2,canvas.height=2,canvas)}function isWebgl(webglObj){return null!=webglObj&&webglObj.getExtension}function browserSupport_webgl(){return null!==browserSupport_webgl_memoizer?browserSupport_webgl_memoizer:browserSupport_webgl_memoizer=isWebgl(init_webgl(init_canvas()))}function init_webgl(canvasObj){if(!isCanvas(canvasObj))throw new Error("Invalid canvas object - "+canvasObj);if(browserSupport_canvas_memoizer===!1||browserSupport_webgl_memoizer===!1)return null;var webgl=canvasObj.getContext("experimental-webgl",init_webgl_defaultOptions)||canvasObj.getContext("webgl",init_webgl_defaultOptions);return null===browserSupport_webgl_memoizer&&(browserSupport_webgl_memoizer=isWebgl(webgl),browserSupport_webgl_memoizer===!1)?null:(GPUUtils.OES_texture_float=webgl.getExtension("OES_texture_float"),GPUUtils.OES_texture_float_linear=webgl.getExtension("OES_texture_float_linear"),GPUUtils.OES_element_index_uint=webgl.getExtension("OES_element_index_uint"),webgl)}function test_floatReadPixels(gpu){if(null!==test_floatReadPixels_memoizer)return test_floatReadPixels_memoizer;var x=gpu.createKernel(function(){return 1},{dimensions:[2],floatTextures:!0,floatOutput:!0,floatOutputForce:!0}).dimensions([2])();return 1==x[0]}var GPUUtils={},endianness=null;GPUUtils.systemEndianness=systemEndianness,GPUUtils.isFunction=isFunction,GPUUtils.isFunctionString=isFunctionString;var FUNCTION_NAME=/function ([^(]*)/;GPUUtils.getFunctionName_fromString=getFunctionName_fromString;var STRIP_COMMENTS=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,ARGUMENT_NAMES=/([^\s,]+)/g;GPUUtils.getParamNames_fromString=getParamNames_fromString,GPUUtils.clone=clone,GPUUtils.newPromise=newPromise,GPUUtils.functionBinder=functionBinder,GPUUtils.isArray=isArray,GPUUtils.getArgumentType=getArgumentType,GPUUtils.isCanvas=isCanvas;var browserSupport_canvas_memoizer=null;GPUUtils.browserSupport_canvas=browserSupport_canvas,GPUUtils.init_canvas=init_canvas,GPUUtils.isWebgl=isWebgl;var browserSupport_webgl_memoizer=null;GPUUtils.browserSupport_webgl=browserSupport_webgl;var init_webgl_defaultOptions={alpha:!1,depth:!1,antialias:!1};GPUUtils.init_webgl=init_webgl;var test_floatReadPixels_memoizer=null;return GPUUtils.test_floatReadPixels=test_floatReadPixels,GPUUtils}(),GPUTexture=function(){function GPUTexture(gpu,texture,size,dimensions){this.gpu=gpu,this.texture=texture,this.size=size,this.dimensions=dimensions}return GPUTexture.prototype.toArray=function(){return this.gpu.textureToArray(this)},GPUTexture.prototype["delete"]=function(){return this.gpu.deleteTexture(this)},GPUTexture}(),GPUCore=function(){function GPUCore(){this.programCache={},this.endianness=GPUUtils.systemEndianness(),this.functionBuilder=new functionBuilder(this),this.functionBuilder.polyfillStandardFunctions()}function getSynchronousModeExecutor(){var kernel=this._kernelFunction,paramObj=this._kernelParamObj;paramObj.dimensions=paramObj.dimensions||[];var mode=this.computeMode;if("cpu"==mode)return this._mode_cpu(kernel,paramObj);try{return this._mode_gpu(kernel,paramObj)}catch(e){if("gpu"!=mode)return console.warning("Falling back to CPU!"),this.computeMode=mode="cpu",this._mode_cpu(kernel,paramObj);throw e}}function getPromiseModeExecutor(){return null}function setupExecutorExtendedFunctions(ret,opt){var gpu=this;return ret.gpujs=gpu,ret.dimensions=function(dim){return opt.dimensions=dim,ret},ret.debug=function(flag){return opt.debug=flag,ret},ret.graphical=function(flag){return opt.graphical=flag,ret},ret.loopMaxIterations=function(max){return opt.loopMaxIterations=max,ret},ret.constants=function(constants){return opt.constants=constants,ret},ret.wraparound=function(flag){return console.warn("Wraparound mode is not supported and undocumented."),opt.wraparound=flag,ret},ret.hardcodeConstants=function(flag){return opt.hardcodeConstants=flag,ret},ret.outputToTexture=function(flag){return opt.outputToTexture=flag,ret},ret.floatTextures=function(flag){return opt.floatTextures=flag,ret},ret.floatOutput=function(flag){return opt.floatOutput=flag,ret},ret.mode=function(mode){return opt.mode=mode,gpu.createKernel(gpu._kernelFunction,gpu._kernelParamObj)},ret.getCanvas=function(mode){return ret.canvas},ret.getWebgl=function(mode){return ret.webgl},ret}return GPUCore.prototype.getGl=function(){return this._webgl},GPUCore.prototype.textureToArray=function(texture){var copy=this.createKernel(function(x){return x[this.thread.z][this.thread.y][this.thread.x]});return copy(texture)},GPUCore.prototype.deleteTexture=function(texture){var gl=this._webgl;gl.deleteTexture(texture.texture)},GPUCore.prototype.getSynchronousModeExecutor=getSynchronousModeExecutor,GPUCore.prototype.getPromiseModeExecutor=getPromiseModeExecutor,GPUCore.prototype.setupExecutorExtendedFunctions=setupExecutorExtendedFunctions,GPUCore}(),GPU=function(){function createKernel(kernel,paramObj){if(void 0===kernel)throw"Missing kernel parameter";if(!GPUUtils.isFunction(kernel))throw"kernel parameter not a function";void 0===paramObj&&(paramObj={}),this._kernelFunction=kernel,this._kernelParamObj=paramObj||this._kernelParamObj||{};var mode=paramObj.mode&&paramObj.mode.toLowerCase();this.computeMode=mode||"auto";var ret=this.getSynchronousModeExecutor();return ret.gpujs=this,ret.exec=ret.execute=GPUUtils.functionBinder(this.execute,this),this._kernelSynchronousExecutor=ret,ret}function getKernelFunction(){return this._kernelFunction}function getKernelParamObj(){return this._kernelParamObj}function execute(){var args=1===arguments.length?[arguments[0]]:Array.apply(null,arguments),self=this;return GPUUtils.newPromise(function(accept,reject){try{accept(self._kernelSynchronousExecutor.apply(self,args))}catch(e){return void reject(e)}})}function addFunction(jsFunction,paramTypeArray,returnType){return this.functionBuilder.addFunction(null,jsFunction,paramTypeArray,returnType),this}function getWebgl(){if(this.webgl)return this.webgl;throw"only call getWebgl after createKernel(gpu)"}function getCanvas(mode){if(this.canvas)return this.canvas;throw"only call getCanvas after createKernel()"}function supportWebgl(){return GPUUtils.browserSupport_webgl()}var GPU=GPUCore;return GPU.prototype.createKernel=createKernel,GPU.prototype.getKernelFunction=getKernelFunction,GPU.prototype.getKernelParamObj=getKernelParamObj,GPU.prototype.execute=execute,GPU.prototype.exec=execute,GPU.prototype.addFunction=addFunction,GPU.prototype.getWebgl=getWebgl,GPU.prototype.getCanvas=getCanvas,GPU.prototype.supportWebgl=supportWebgl,GPU.supportWebgl=supportWebgl,GPU}(),functionNode_webgl=function(){function isIdentifierConstant(paramName){return!!opt.constants&&opt.constants.indexOf(paramName)!=-1}function functionNode_webgl(inNode,_opt){return gpu=inNode.gpu,opt=_opt||{},opt.debug&&console.log(inNode),jsFunctionString=inNode.jsFunctionString,opt.prototypeOnly?ast_FunctionPrototype(inNode.getJS_AST(),[],inNode).join("").trim():(inNode.webglFunctionString_array=ast_generic(inNode.getJS_AST(),[],inNode),inNode.webglFunctionString=webgl_regex_optimize(inNode.webglFunctionString_array.join("").trim()),inNode.webglFunctionString)}function webgl_regex_optimize(inStr){return inStr.replace(DECODE32_ENCODE32,"((").replace(ENCODE32_DECODE32,"((")}function ast_errorOutput(error,ast,funcParam){return console.error(error,ast,funcParam),error}function ast_generic(ast,retArr,funcParam){if(null===ast)throw ast_errorOutput("NULL ast",ast,funcParam);if(Array.isArray(ast)){for(var i=0;i<ast.length;i++)ast_generic(ast[i],retArr,funcParam);return retArr}switch(ast.type){case"FunctionDeclaration":return ast_FunctionDeclaration(ast,retArr,funcParam);case"FunctionExpression":return ast_FunctionExpression(ast,retArr,funcParam);case"ReturnStatement":return ast_ReturnStatement(ast,retArr,funcParam);case"Literal":return ast_Literal(ast,retArr,funcParam);case"BinaryExpression":return ast_BinaryExpression(ast,retArr,funcParam);case"Identifier":return ast_IdentifierExpression(ast,retArr,funcParam);case"AssignmentExpression":return ast_AssignmentExpression(ast,retArr,funcParam);case"ExpressionStatement":return ast_ExpressionStatement(ast,retArr,funcParam);case"EmptyStatement":return ast_EmptyStatement(ast,retArr,funcParam);case"BlockStatement":return ast_BlockStatement(ast,retArr,funcParam);case"IfStatement":return ast_IfStatement(ast,retArr,funcParam);case"BreakStatement":return ast_BreakStatement(ast,retArr,funcParam);case"ContinueStatement":return ast_ContinueStatement(ast,retArr,funcParam);case"ForStatement":return ast_ForStatement(ast,retArr,funcParam);case"WhileStatement":return ast_WhileStatement(ast,retArr,funcParam);case"VariableDeclaration":return ast_VariableDeclaration(ast,retArr,funcParam);case"VariableDeclarator":return ast_VariableDeclarator(ast,retArr,funcParam);case"ThisExpression":return ast_ThisExpression(ast,retArr,funcParam);case"SequenceExpression":return ast_SequenceExpression(ast,retArr,funcParam);case"UnaryExpression":return ast_UnaryExpression(ast,retArr,funcParam);case"UpdateExpression":return ast_UpdateExpression(ast,retArr,funcParam);case"LogicalExpression":return ast_LogicalExpression(ast,retArr,funcParam);case"MemberExpression":return ast_MemberExpression(ast,retArr,funcParam);case"CallExpression":return ast_CallExpression(ast,retArr,funcParam);case"ArrayExpression":return ast_ArrayExpression(ast,retArr,funcParam)}throw ast_errorOutput("Unknown ast type : "+ast.type,ast,funcParam)}function ast_FunctionDeclaration(ast,retArr,funcParam){var lines=jsFunctionString.split(/\r?\n/),start=ast.loc.start,end=ast.loc.end,funcArr=[];funcArr.push(lines[start.line-1].slice(start.column));for(var i=start.line;i<end.line-1;i++)funcArr.push(lines[i]);funcArr.push(lines[end.line-1].slice(0,end.column));var funcStr=funcArr.join("\n");return gpu.addFunction(funcStr),retArr}function ast_FunctionPrototype(ast,retArr,funcParam){if(funcParam.isRootKernel)return retArr;retArr.push(funcParam.returnType),retArr.push(" "),retArr.push(funcParam.functionName),retArr.push("(");for(var i=0;i<funcParam.paramNames.length;++i)i>0&&retArr.push(", "),retArr.push(funcParam.paramType[i]),retArr.push(" "),retArr.push("user_"),retArr.push(funcParam.paramNames[i]);return retArr.push(");\n"),retArr}function ast_FunctionExpression(ast,retArr,funcParam){if(funcParam.isRootKernel?(retArr.push("void"),funcParam.kernalAst=ast):retArr.push(funcParam.returnType),retArr.push(" "),retArr.push(funcParam.functionName),retArr.push("("),!funcParam.isRootKernel)for(var i=0;i<funcParam.paramNames.length;++i)i>0&&retArr.push(", "),retArr.push(funcParam.paramType[i]),retArr.push(" "),retArr.push("user_"),retArr.push(funcParam.paramNames[i]);retArr.push(") {\n");for(var i=0;i<ast.body.length;++i)ast_generic(ast.body[i],retArr,funcParam),retArr.push("\n");return retArr.push("}\n"),retArr}function ast_ReturnStatement(ast,retArr,funcParam){return funcParam.isRootKernel?(retArr.push("kernelResult = "),ast_generic(ast.argument,retArr,funcParam),retArr.push(";"),retArr.push("return;")):(retArr.push("return "),ast_generic(ast.argument,retArr,funcParam),retArr.push(";")),retArr}function ast_Literal(ast,retArr,funcParam){if(isNaN(ast.value))throw ast_errorOutput("Non-numeric literal not supported : "+ast.value,ast,funcParam);return retArr.push(ast.value),Number.isInteger(ast.value)&&retArr.push(".0"),retArr}function ast_BinaryExpression(ast,retArr,funcParam){return retArr.push("("),"%"==ast.operator?(retArr.push("mod("),ast_generic(ast.left,retArr,funcParam),retArr.push(","),ast_generic(ast.right,retArr,funcParam),retArr.push(")")):"==="==ast.operator?(ast_generic(ast.left,retArr,funcParam),retArr.push("=="),ast_generic(ast.right,retArr,funcParam)):"!=="==ast.operator?(ast_generic(ast.left,retArr,funcParam),retArr.push("!="),ast_generic(ast.right,retArr,funcParam)):(ast_generic(ast.left,retArr,funcParam),retArr.push(ast.operator),ast_generic(ast.right,retArr,funcParam)),retArr.push(")"),retArr}function ast_IdentifierExpression(idtNode,retArr,funcParam){if("Identifier"!=idtNode.type)throw ast_errorOutput("IdentifierExpression - not an Identifier",ast,funcParam);return"gpu_threadX"==idtNode.name?retArr.push("threadId.x"):"gpu_threadY"==idtNode.name?retArr.push("threadId.y"):"gpu_threadZ"==idtNode.name?retArr.push("threadId.z"):"gpu_dimensionsX"==idtNode.name?retArr.push("uOutputDim.x"):"gpu_dimensionsY"==idtNode.name?retArr.push("uOutputDim.y"):"gpu_dimensionsZ"==idtNode.name?retArr.push("uOutputDim.z"):retArr.push("user_"+idtNode.name),retArr}function ast_ForStatement(forNode,retArr,funcParam){if("ForStatement"!=forNode.type)throw ast_errorOutput("Invalid for statment",ast,funcParam);if(forNode.test&&"BinaryExpression"==forNode.test.type){if("Identifier"==forNode.test.right.type&&"<"==forNode.test.operator&&0==isIdentifierConstant(forNode.test.right.name)){if(void 0===opt.loopMaxIterations&&(console.warn("Warning: loopMaxIterations is not set! Using default of 100 which may result in unintended behavior."),console.warn("Set loopMaxIterations or use a for loop of fixed length to silence this message.")),retArr.push("for (float "),ast_generic(forNode.init,retArr,funcParam),retArr.push(";"),ast_generic(forNode.test.left,retArr,funcParam),retArr.push(forNode.test.operator),retArr.push("LOOP_MAX"),retArr.push(";"),ast_generic(forNode.update,retArr,funcParam),retArr.push(")"),retArr.push("{\n"),retArr.push("if ("),ast_generic(forNode.test.left,retArr,funcParam),retArr.push(forNode.test.operator),ast_generic(forNode.test.right,retArr,funcParam),retArr.push(") {\n"),"BlockStatement"==forNode.body.type)for(var i=0;i<forNode.body.body.length;i++)ast_generic(forNode.body.body[i],retArr,funcParam);else ast_generic(forNode.body,retArr,funcParam);return retArr.push("} else {\n"),retArr.push("break;\n"),retArr.push("}\n"),retArr.push("}\n"),retArr}return retArr.push("for (float "),ast_generic(forNode.init,retArr,funcParam),retArr.push(";"),ast_generic(forNode.test,retArr,funcParam),retArr.push(";"),ast_generic(forNode.update,retArr,funcParam),retArr.push(")"),ast_generic(forNode.body,retArr,funcParam),retArr}throw ast_errorOutput("Invalid for statment",ast,funcParam)}function ast_WhileStatement(whileNode,retArr,funcParam){if("WhileStatement"!=whileNode.type)throw ast_errorOutput("Invalid while statment",ast,funcParam);return retArr.push("for (float i=0.0; i<LOOP_MAX; i++) {"),retArr.push("if ("),ast_generic(whileNode.test,retArr,funcParam),retArr.push(") {\n"),ast_generic(whileNode.body,retArr,funcParam),retArr.push("} else {\n"),retArr.push("break;\n"),retArr.push("}\n"),retArr.push("}\n"),retArr}function ast_AssignmentExpression(assNode,retArr,funcParam){return"%="!=assNode.operator?(ast_generic(assNode.left,retArr,funcParam),retArr.push(assNode.operator),ast_generic(assNode.right,retArr,funcParam),retArr):(ast_generic(assNode.left,retArr,funcParam),retArr.push("="),retArr.push("mod("),ast_generic(assNode.left,retArr,funcParam),retArr.push(","),ast_generic(assNode.right,retArr,funcParam),retArr.push(")"),void 0)}function ast_EmptyStatement(eNode,retArr,funcParam){return retArr.push(";\n"),retArr}function ast_BlockStatement(bNode,retArr,funcParam){retArr.push("{\n");for(var i=0;i<bNode.body.length;i++)ast_generic(bNode.body[i],retArr,funcParam);return retArr.push("}\n"),retArr}function ast_ExpressionStatement(esNode,retArr,funcParam){return ast_generic(esNode.expression,retArr,funcParam),retArr.push(";\n"),retArr}function ast_VariableDeclaration(vardecNode,retArr,funcParam){retArr.push("float ");for(var i=0;i<vardecNode.declarations.length;i++)i>0&&retArr.push(","),ast_generic(vardecNode.declarations[i],retArr,funcParam);return retArr.push(";"),retArr}function ast_VariableDeclarator(ivardecNode,retArr,funcParam){return ast_generic(ivardecNode.id,retArr,funcParam),null!==ivardecNode.init&&(retArr.push("="),ast_generic(ivardecNode.init,retArr,funcParam)),retArr}function ast_IfStatement(ifNode,retArr,funcParam){return retArr.push("if("),ast_generic(ifNode.test,retArr,funcParam),retArr.push(")"),"BlockStatement"==ifNode.consequent.type?ast_generic(ifNode.consequent,retArr,funcParam):(retArr.push(" {\n"),ast_generic(ifNode.consequent,retArr,funcParam),retArr.push("\n}\n")),ifNode.alternate&&(retArr.push("else "),"BlockStatement"==ifNode.alternate.type?ast_generic(ifNode.alternate,retArr,funcParam):(retArr.push(" {\n"),ast_generic(ifNode.alternate,retArr,funcParam),retArr.push("\n}\n"))),retArr}function ast_BreakStatement(brNode,retArr,funcParam){return retArr.push("break;\n"),retArr}function ast_LogicalExpression(logNode,retArr,funcParam){return retArr.push("("),ast_generic(logNode.left,retArr,funcParam),retArr.push(logNode.operator),ast_generic(logNode.right,retArr,funcParam),retArr.push(")"),retArr}function ast_UpdateExpression(uNode,retArr,funcParam){return uNode.prefix?(retArr.push(uNode.operator),ast_generic(uNode.argument,retArr,funcParam)):(ast_generic(uNode.argument,retArr,funcParam),retArr.push(uNode.operator)),retArr}function ast_UnaryExpression(uNode,retArr,funcParam){return uNode.prefix?(retArr.push(uNode.operator),ast_generic(uNode.argument,retArr,funcParam)):(ast_generic(uNode.argument,retArr,funcParam),retArr.push(uNode.operator)),retArr}function ast_ThisExpression(tNode,retArr,funcParam){return retArr.push("this"),retArr}function ast_MemberExpression(mNode,retArr,funcParam){if(mNode.computed)if("Identifier"==mNode.object.type){var reqName=mNode.object.name,assumeNotTexture=(funcParam.funcName||"kernel",!1);if("kernel"!=funcParam&&funcParam.paramNames){var idx=funcParam.paramNames.indexOf(reqName);idx>=0&&"float"==funcParam.paramType[idx]&&(assumeNotTexture=!0)}assumeNotTexture?(ast_generic(mNode.object,retArr,funcParam),retArr.push("[int("),ast_generic(mNode.property,retArr,funcParam),retArr.push(")]")):(retArr.push("get("),ast_generic(mNode.object,retArr,funcParam),retArr.push(", vec2("),ast_generic(mNode.object,retArr,funcParam),retArr.push("Size[0],"),ast_generic(mNode.object,retArr,funcParam),retArr.push("Size[1]), vec3("),ast_generic(mNode.object,retArr,funcParam),retArr.push("Dim[0],"),ast_generic(mNode.object,retArr,funcParam),retArr.push("Dim[1],"),ast_generic(mNode.object,retArr,funcParam),retArr.push("Dim[2]"),retArr.push("), "),ast_generic(mNode.property,retArr,funcParam),retArr.push(")"))}else{ast_generic(mNode.object,retArr,funcParam);retArr.pop();retArr.push(","),ast_generic(mNode.property,retArr,funcParam),retArr.push(")")}else{var unrolled=ast_MemberExpression_unroll(mNode),unrolled_lc=unrolled.toLowerCase();0===unrolled.indexOf(constantsPrefix)&&(unrolled="constants_"+unrolled.slice(constantsPrefix.length)),"this.thread.x"==unrolled_lc?retArr.push("threadId.x"):"this.thread.y"==unrolled_lc?retArr.push("threadId.y"):"this.thread.z"==unrolled_lc?retArr.push("threadId.z"):"this.dimensions.x"==unrolled_lc?retArr.push("uOutputDim.x"):"this.dimensions.y"==unrolled_lc?retArr.push("uOutputDim.y"):"this.dimensions.z"==unrolled_lc?retArr.push("uOutputDim.z"):retArr.push(unrolled)}return retArr}function ast_SequenceExpression(sNode,retArr,funcParam){for(var i=0;i<sNode.expressions.length;i++)i>0&&retArr.push(","),ast_generic(sNode.expressions,retArr,funcParam);return retArr}function ast_MemberExpression_unroll(ast,funcParam){if("Identifier"==ast.type)return ast.name;if("ThisExpression"==ast.type)return"this";if("MemberExpression"==ast.type&&ast.object&&ast.property)return ast_MemberExpression_unroll(ast.object,funcParam)+"."+ast_MemberExpression_unroll(ast.property,funcParam);throw ast_errorOutput("Unknown CallExpression_unroll",ast,funcParam)}function ast_CallExpression(ast,retArr,funcParam){if(ast.callee){var funcName=ast_MemberExpression_unroll(ast.callee);0===funcName.indexOf(jsMathPrefix)&&(funcName=funcName.slice(jsMathPrefix.length)),0===funcName.indexOf(localPrefix)&&(funcName=funcName.slice(localPrefix.length)),funcParam.calledFunctions.indexOf(funcName)<0&&funcParam.calledFunctions.push(funcName),retArr.push(funcName),retArr.push("(");for(var i=0;i<ast.arguments.length;++i)i>0&&retArr.push(", "),ast_generic(ast.arguments[i],retArr,funcParam);return retArr.push(")"),retArr}throw ast_errorOutput("Unknown CallExpression",ast,funcParam)}function ast_ArrayExpression(arrNode,retArr,funcParam){var arrLen=arrNode.elements.length;retArr.push("float["+arrLen+"](");for(var i=0;i<arrLen;++i){i>0&&retArr.push(", ");var subNode=arrNode.elements[i];ast_generic(subNode,retArr,funcParam)}return retArr.push(")"),retArr}var gpu,opt,jsFunctionString,DECODE32_ENCODE32=/decode32\(\s+encode32\(/g,ENCODE32_DECODE32=/encode32\(\s+decode32\(/g,jsMathPrefix="Math.",localPrefix="this.",constantsPrefix="this.constants.";return functionNode_webgl}(),functionNode=function(){function functionNode(gpu,functionName,jsFunction,paramTypeArray,returnType){if(this.gpu=gpu,this.calledFunctions=[],this.initVariables=[],this.readVariables=[],this.writeVariables=[],null==jsFunction)throw"jsFunction, parameter is null";if(this.jsFunctionString=jsFunction.toString(),!GPUUtils.isFunctionString(this.jsFunctionString))throw console.error("jsFunction, to string conversion check falied: not a function?",this.jsFunctionString),"jsFunction, to string conversion check falied: not a function?";if(GPUUtils.isFunction(jsFunction)?this.jsFunction=jsFunction:this.jsFunction=null,this.functionName=functionName||jsFunction&&jsFunction.name||GPUUtils.getFunctionName_fromString(this.jsFunctionString),!this.functionName)throw"jsFunction, missing name argument or value";if(this.paramNames=GPUUtils.getParamNames_fromString(this.jsFunctionString),null!=paramTypeArray){if(paramTypeArray.length!=this.paramNames.length)throw"Invalid argument type array length, against function length -> ("+paramTypeArray.length+","+this.paramNames.length+")";this.paramType=paramTypeArray}else{this.paramType=[];for(var a=0;a<this.paramNames.length;++a)this.paramType.push("float")}this.returnType=returnType||"float"}function getJSFunction(){if(this.jsFunction)return this.jsFunction;if(this.jsFunctionString)return this.jsFunction=eval(this.jsFunctionString),this.jsFunction;throw"Missin jsFunction, and jsFunctionString parameter"}function getJS_AST(inParser){if(this.jsFunctionAST)return this.jsFunctionAST;if(inParser=inParser||parser,null==inParser)throw"Missing JS to AST parser";var prasedObj=parser.parse("var "+this.functionName+" = "+this.jsFunctionString+";");if(null===prasedObj)throw"Failed to parse JS code via JISON";var funcAST=prasedObj.body[0].declarations[0].init;return this.jsFunctionAST=funcAST,funcAST}function getWebglFunctionString(opt){return this.webglFunctionString?this.webglFunctionString:this.webglFunctionString=functionNode_webgl(this,opt)}function getWebglFunctionPrototypeString(opt){return opt=opt||{},this.webglFunctionPrototypeString?this.webglFunctionPrototypeString:this.webglFunctionPrototypeString=functionNode_webgl(this,{prototypeOnly:!0,isRootKernel:opt.isRootKernel})}function setWebglFunctionString(shaderCode){this.webglFunctionString=shaderCode}return functionNode.prototype.getJSFunction=getJSFunction,functionNode.prototype.getJS_AST=getJS_AST,functionNode.prototype.getWebglFunctionString=getWebglFunctionString,functionNode.prototype.getWebglFunctionPrototypeString=getWebglFunctionPrototypeString,functionNode.prototype.setWebglFunctionString=setWebglFunctionString,functionNode}(),functionBuilder=function(){function functionBuilder(gpu){this.nodeMap={},this.gpu=gpu}function addFunction(functionName,jsFunction,paramTypeArray,returnType){this.addFunctionNode(new functionNode(this.gpu,functionName,jsFunction,paramTypeArray,returnType))}function addFunctionNode(inNode){this.nodeMap[inNode.functionName]=inNode}function traceFunctionCalls(functionName,retList,opt){functionName=functionName||"kernel",retList=retList||[];var fNode=this.nodeMap[functionName];if(fNode)if(retList.indexOf(functionName)>=0);else{retList.push(functionName),fNode.getWebglFunctionString(opt);for(var i=0;i<fNode.calledFunctions.length;++i)this.traceFunctionCalls(fNode.calledFunctions[i],retList,opt)}return retList}function webglString_fromFunctionNames(functionList,opt){for(var ret=[],i=0;i<functionList.length;++i){var node=this.nodeMap[functionList[i]];node&&ret.push(this.nodeMap[functionList[i]].getWebglFunctionString(opt))}return ret.join("\n")}function webglPrototypeString_fromFunctionNames(functionList,opt){for(var ret=[],i=0;i<functionList.length;++i){var node=this.nodeMap[functionList[i]];node&&ret.push(this.nodeMap[functionList[i]].getWebglFunctionPrototypeString(opt))}return ret.join("\n")}function webglString(functionName,opt){return void 0==opt&&(opt={}),functionName?this.webglString_fromFunctionNames(this.traceFunctionCalls(functionName,[],opt).reverse(),opt):this.webglString_fromFunctionNames(Object.keys(this.nodeMap),opt)}function webglPrototypeString(functionName,opt){return void 0==opt&&(opt={}),functionName?this.webglPrototypeString_fromFunctionNames(this.traceFunctionCalls(functionName,[],opt).reverse(),opt):this.webglPrototypeString_fromFunctionNames(Object.keys(this.nodeMap),opt)}function round(a){return Math.floor(a+.5)}function polyfillStandardFunctions(){this.addFunction(null,round)}return functionBuilder.prototype.addFunction=addFunction,functionBuilder.prototype.addFunctionNode=addFunctionNode,functionBuilder.prototype.traceFunctionCalls=traceFunctionCalls,functionBuilder.prototype.webglString_fromFunctionNames=webglString_fromFunctionNames,functionBuilder.prototype.webglPrototypeString_fromFunctionNames=webglPrototypeString_fromFunctionNames,functionBuilder.prototype.webglString=webglString,functionBuilder.prototype.webglPrototypeString=webglPrototypeString,functionBuilder.prototype.polyfillStandardFunctions=polyfillStandardFunctions,functionBuilder}();return function(GPU){GPU.prototype._mode_cpu=function(kernel,opt){function ret(){if(!opt.dimensions||0===opt.dimensions.length){if(1!=arguments.length)throw"Auto dimensions only supported for kernels with only one input";var argType=GPUUtils.getArgumentType(arguments[0]);if("Array"==argType)opt.dimensions=getDimensions(argType);else{if("Texture"!=argType)throw"Auto dimensions not supported for input type: "+argType;opt.dimensions=arguments[0].dimensions}}for(var kernelArgs=[],i=0;i<arguments.length;i++){var argType=GPUUtils.getArgumentType(arguments[i]);if("Array"==argType||"Number"==argType)kernelArgs[i]=arguments[i];else{if("Texture"!=argType)throw"Input type not supported (CPU): "+arguments[i];kernelArgs[i]=arguments[i].toArray()}}for(var threadDim=GPUUtils.clone(opt.dimensions);threadDim.length<3;)threadDim.push(1);for(var ret=new Array(threadDim[2]),i=0;i<threadDim[2];i++){ret[i]=new Array(threadDim[1]);for(var j=0;j<threadDim[1];j++)ret[i][j]=new Array(threadDim[0])}var canvasCtx,imageData,data,ctx={thread:{x:0,y:0,z:0},dimensions:{x:threadDim[0],y:threadDim[1],z:threadDim[2]},constants:opt.constants};for(opt.graphical&&(canvas.width=threadDim[0],canvas.height=threadDim[1],canvasCtx=canvas.getContext("2d"),imageData=canvasCtx.createImageData(threadDim[0],threadDim[1]),data=new Uint8ClampedArray(threadDim[0]*threadDim[1]*4),ctx.color=function(r,g,b,a){void 0==a&&(a=1),r=Math.floor(255*r),g=Math.floor(255*g),b=Math.floor(255*b),a=Math.floor(255*a);var width=ctx.dimensions.x,height=ctx.dimensions.y,x=ctx.thread.x,y=height-ctx.thread.y-1,index=x+y*width;data[4*index+0]=r,data[4*index+1]=g,data[4*index+2]=b,data[4*index+3]=a}),ctx.thread.z=0;ctx.thread.z<threadDim[2];ctx.thread.z++)for(ctx.thread.y=0;ctx.thread.y<threadDim[1];ctx.thread.y++)for(ctx.thread.x=0;ctx.thread.x<threadDim[0];ctx.thread.x++)ret[ctx.thread.z][ctx.thread.y][ctx.thread.x]=kernel.apply(ctx,kernelArgs);return opt.graphical&&(imageData.data.set(data),canvasCtx.putImageData(imageData,0,0)),1==opt.dimensions.length?ret=ret[0][0]:2==opt.dimensions.length&&(ret=ret[0]),ret}var gpu=this,canvas=gpu._canvasCpu;return canvas||(canvas=gpu._canvasCpu=GPUUtils.init_canvas()),ret.canvas=canvas,gpu.setupExecutorExtendedFunctions(ret,opt)}}(GPU),function(GPU){function dimToTexSize(opt,dimensions,output){for(var numTexels=dimensions[0],i=1;i<dimensions.length;i++)numTexels*=dimensions[i];!opt.floatTextures||output&&!opt.floatOutput||(numTexels=Math.ceil(numTexels/4));var w=Math.ceil(Math.sqrt(numTexels));return[w,w]}function getDimensions(x,pad){var ret;if(GPUUtils.isArray(x)){for(var dim=[],temp=x;GPUUtils.isArray(temp);)dim.push(temp.length),temp=temp[0];ret=dim.reverse()}else{if(!(x instanceof GPUTexture))throw"Unknown dimensions of "+x;ret=x.dimensions}if(pad)for(ret=GPUUtils.clone(ret);ret.length<3;)ret.push(1);return ret}function flatten(arr){return GPUUtils.isArray(arr[0])?GPUUtils.isArray(arr[0][0])?Array.isArray(arr[0][0])?[].concat.apply([],[].concat.apply([],arr)):[].concat.apply([],[].concat.apply([],arr).map(function(x){
	return Array.prototype.slice.call(x)})):[].concat.apply([],arr):arr}function splitArray(array,part){for(var tmp=[],i=0;i<array.length;i+=part)tmp.push(array.slice(i,i+part));return tmp}function getProgramCacheKey(args,opt,outputDim){for(var key="",i=0;i<args.length;i++){var argType=GPUUtils.getArgumentType(args[i]);if(key+=argType,opt.hardcodeConstants){var dimensions;"Array"!=argType&&"Texture"!=argType||(dimensions=getDimensions(args[i],!0),key+="["+dimensions[0]+","+dimensions[1]+","+dimensions[2]+"]")}}var specialFlags="";return opt.wraparound&&(specialFlags+="Wraparound"),opt.hardcodeConstants&&(specialFlags+="Hardcode",specialFlags+="["+outputDim[0]+","+outputDim[1]+","+outputDim[2]+"]"),opt.constants&&(specialFlags+="Constants",specialFlags+=JSON.stringify(opt.constants)),specialFlags&&(key=key+"-"+specialFlags),key}GPU.prototype._mode_gpu=function(kernel,opt){function ret(){function getUniformLocation(name){var location=programUniformLocationCache[programCacheKey][name];return location||(location=gl.getUniformLocation(program,name),programUniformLocationCache[programCacheKey][name]=location),location}if(opt.floatTextures===!0&&!GPUUtils.OES_texture_float)throw"Float textures are not supported on this browser";if(opt.floatOutput===!0&&opt.floatOutputForce!==!0&&!GPUUtils.test_floatReadPixels(gpu))throw"Float texture outputs are not supported on this browser";if(void 0===opt.floatTextures&&GPUUtils.OES_texture_float&&(opt.floatTextures=!0,opt.floatOutput=GPUUtils.test_floatReadPixels(gpu)&&!opt.graphical),!opt.dimensions||0===opt.dimensions.length){if(1!=arguments.length)throw"Auto dimensions only supported for kernels with only one input";var argType=GPUUtils.getArgumentType(arguments[0]);if("Array"==argType)opt.dimensions=getDimensions(argType);else{if("Texture"!=argType)throw"Auto dimensions not supported for input type: "+argType;opt.dimensions=arguments[0].dimensions}}var texSize=dimToTexSize(opt,opt.dimensions,!0);if(opt.graphical){if(2!=opt.dimensions.length)throw"Output must have 2 dimensions on graphical mode";if(opt.floatOutput)throw"Cannot use graphical mode and float output at the same time";texSize=GPUUtils.clone(opt.dimensions)}else void 0===opt.floatOutput&&GPUUtils.OES_texture_float&&(opt.floatOutput=!0);canvas.width=texSize[0],canvas.height=texSize[1],gl.viewport(0,0,texSize[0],texSize[1]);for(var threadDim=GPUUtils.clone(opt.dimensions);threadDim.length<3;)threadDim.push(1);var programCacheKey=getProgramCacheKey(arguments,opt,opt.dimensions),program=programCache[programCacheKey];if(void 0===program){var constantsStr="";if(opt.constants)for(var name in opt.constants){var value=parseFloat(opt.constants[name]);constantsStr+=Number.isInteger(value)?"const float constants_"+name+"="+parseInt(value)+".0;\n":"const float constants_"+name+"="+parseFloat(value)+";\n"}for(var paramStr="",paramType=[],i=0;i<paramNames.length;i++){var argType=GPUUtils.getArgumentType(arguments[i]);if(paramType.push(argType),opt.hardcodeConstants)if("Array"==argType||"Texture"==argType){var paramDim=getDimensions(arguments[i],!0),paramSize=dimToTexSize(gpu,paramDim);paramStr+="uniform highp sampler2D user_"+paramNames[i]+";\n",paramStr+="highp vec2 user_"+paramNames[i]+"Size = vec2("+paramSize[0]+".0, "+paramSize[1]+".0);\n",paramStr+="highp vec3 user_"+paramNames[i]+"Dim = vec3("+paramDim[0]+".0, "+paramDim[1]+".0, "+paramDim[2]+".0);\n"}else"Number"==argType&&Number.isInteger(arguments[i])?paramStr+="highp float user_"+paramNames[i]+" = "+arguments[i]+".0;\n":"Number"==argType&&(paramStr+="highp float user_"+paramNames[i]+" = "+arguments[i]+";\n");else"Array"==argType||"Texture"==argType?(paramStr+="uniform highp sampler2D user_"+paramNames[i]+";\n",paramStr+="uniform highp vec2 user_"+paramNames[i]+"Size;\n",paramStr+="uniform highp vec3 user_"+paramNames[i]+"Dim;\n"):"Number"==argType&&(paramStr+="uniform highp float user_"+paramNames[i]+";\n")}var kernelNode=new functionNode(gpu,"kernel",kernel);kernelNode.paramNames=paramNames,kernelNode.paramType=paramType,kernelNode.isRootKernel=!0,builder.addFunctionNode(kernelNode);var vertShaderSrc=["precision highp float;","precision highp int;","precision highp sampler2D;","","attribute highp vec2 aPos;","attribute highp vec2 aTexCoord;","","varying highp vec2 vTexCoord;","","void main(void) {","   gl_Position = vec4(aPos, 0, 1);","   vTexCoord = aTexCoord;","}"].join("\n"),fragShaderSrc=["precision highp float;","precision highp int;","precision highp sampler2D;","","#define LOOP_MAX "+(opt.loopMaxIterations?parseInt(opt.loopMaxIterations)+".0":"100.0"),"#define EPSILON 0.0000001","",opt.hardcodeConstants?"highp vec3 uOutputDim = vec3("+threadDim[0]+","+threadDim[1]+", "+threadDim[2]+");":"uniform highp vec3 uOutputDim;",opt.hardcodeConstants?"highp vec2 uTexSize = vec2("+texSize[0]+","+texSize[1]+");":"uniform highp vec2 uTexSize;","varying highp vec2 vTexCoord;","","vec4 round(vec4 x) {","\treturn floor(x + 0.5);","}","","highp float round(highp float x) {","\treturn floor(x + 0.5);","}","","vec2 integerMod(vec2 x, float y) {","\tvec2 res = floor(mod(x, y));","\treturn res * step(1.0 - floor(y), -res);","}","","vec3 integerMod(vec3 x, float y) {","\tvec3 res = floor(mod(x, y));","\treturn res * step(1.0 - floor(y), -res);","}","","vec4 integerMod(vec4 x, vec4 y) {","\tvec4 res = floor(mod(x, y));","\treturn res * step(1.0 - floor(y), -res);","}","","highp float integerMod(highp float x, highp float y) {","\thighp float res = floor(mod(x, y));","\treturn res * (res > floor(y) - 1.0 ? 0.0 : 1.0);","}","","highp int integerMod(highp int x, highp int y) {","\treturn int(integerMod(float(x), float(y)));","}","","// Here be dragons!","// DO NOT OPTIMIZE THIS CODE","// YOU WILL BREAK SOMETHING ON SOMEBODY'S MACHINE","// LEAVE IT AS IT IS, LEST YOU WASTE YOUR OWN TIME","const vec2 MAGIC_VEC = vec2(1.0, -256.0);","const vec4 SCALE_FACTOR = vec4(1.0, 256.0, 65536.0, 0.0);","const vec4 SCALE_FACTOR_INV = vec4(1.0, 0.00390625, 0.0000152587890625, 0.0); // 1, 1/256, 1/65536","highp float decode32(highp vec4 rgba) {","LE"==endianness?"":"\trgba.rgba = rgba.abgr;","\trgba *= 255.0;","\tvec2 gte128;","\tgte128.x = rgba.b >= 128.0 ? 1.0 : 0.0;","\tgte128.y = rgba.a >= 128.0 ? 1.0 : 0.0;","\tfloat exponent = 2.0 * rgba.a - 127.0 + dot(gte128, MAGIC_VEC);","\tfloat res = exp2(round(exponent));","\trgba.b = rgba.b - 128.0 * gte128.x;","\tres = dot(rgba, SCALE_FACTOR) * exp2(round(exponent-23.0)) + res;","\tres *= gte128.y * -2.0 + 1.0;","\treturn res;","}","","highp vec4 encode32(highp float f) {","\thighp float F = abs(f);","\thighp float sign = f < 0.0 ? 1.0 : 0.0;","\thighp float exponent = floor(log2(F));","\thighp float mantissa = (exp2(-exponent) * F);","\t// exponent += floor(log2(mantissa));","\tvec4 rgba = vec4(F * exp2(23.0-exponent)) * SCALE_FACTOR_INV;","\trgba.rg = integerMod(rgba.rg, 256.0);","\trgba.b = integerMod(rgba.b, 128.0);","\trgba.a = exponent*0.5 + 63.5;","\trgba.ba += vec2(integerMod(exponent+127.0, 2.0), sign) * 128.0;","\trgba = floor(rgba);","\trgba *= 0.003921569; // 1/255","LE"==endianness?"":"\trgba.rgba = rgba.abgr;","\treturn rgba;","}","// Dragons end here","","highp float index;","highp vec3 threadId;","","highp vec3 indexTo3D(highp float idx, highp vec3 texDim) {","\thighp float z = floor(idx / (texDim.x * texDim.y));","\tidx -= z * texDim.x * texDim.y;","\thighp float y = floor(idx / texDim.x);","\thighp float x = integerMod(idx, texDim.x);","\treturn vec3(x, y, z);","}","","highp float get(highp sampler2D tex, highp vec2 texSize, highp vec3 texDim, highp float z, highp float y, highp float x) {","\thighp vec3 xyz = vec3(x, y, z);","\txyz = floor(xyz + 0.5);",opt.wraparound?"\txyz = mod(xyz, texDim);":"","\thighp float index = round(xyz.x + texDim.x * (xyz.y + texDim.y * xyz.z));",opt.floatTextures?"\tint channel = int(integerMod(index, 4.0));":"",opt.floatTextures?"\tindex = float(int(index)/4);":"","\thighp float w = round(texSize.x);","\tvec2 st = vec2(integerMod(index, w), float(int(index) / int(w))) + 0.5;",opt.floatTextures?"\tindex = float(int(index)/4);":"","\thighp vec4 texel = texture2D(tex, st / texSize);",opt.floatTextures?"\tif (channel == 0) return texel.r;":"",opt.floatTextures?"\tif (channel == 1) return texel.g;":"",opt.floatTextures?"\tif (channel == 2) return texel.b;":"",opt.floatTextures?"\tif (channel == 3) return texel.a;":"",opt.floatTextures?"":"\treturn decode32(texel);","}","","highp float get(highp sampler2D tex, highp vec2 texSize, highp vec3 texDim, highp float y, highp float x) {","\treturn get(tex, texSize, texDim, 0.0, y, x);","}","","highp float get(highp sampler2D tex, highp vec2 texSize, highp vec3 texDim, highp float x) {","\treturn get(tex, texSize, texDim, 0.0, 0.0, x);","}","","const bool outputToColor = "+(opt.graphical?"true":"false")+";","highp vec4 actualColor;","void color(float r, float g, float b, float a) {","\tactualColor = vec4(r,g,b,a);","}","","void color(float r, float g, float b) {","\tcolor(r,g,b,1.0);","}","","highp float kernelResult = 0.0;",paramStr,constantsStr,builder.webglPrototypeString("kernel",opt),builder.webglString("kernel",opt),"","void main(void) {","\tindex = floor(vTexCoord.s * float(uTexSize.x)) + floor(vTexCoord.t * float(uTexSize.y)) * uTexSize.x;",opt.floatOutput?"index *= 4.0;":"","\tthreadId = indexTo3D(index, uOutputDim);","\tkernel();","\tif (outputToColor == true) {","\t\tgl_FragColor = actualColor;","\t} else {",opt.floatOutput?"":"gl_FragColor = encode32(kernelResult);",opt.floatOutput?"gl_FragColor.r = kernelResult;":"",opt.floatOutput?"index += 1.0; threadId = indexTo3D(index, uOutputDim); kernel();":"",opt.floatOutput?"gl_FragColor.g = kernelResult;":"",opt.floatOutput?"index += 1.0; threadId = indexTo3D(index, uOutputDim); kernel();":"",opt.floatOutput?"gl_FragColor.b = kernelResult;":"",opt.floatOutput?"index += 1.0; threadId = indexTo3D(index, uOutputDim); kernel();":"",opt.floatOutput?"gl_FragColor.a = kernelResult;":"","\t}","}"].join("\n"),vertShader=gl.createShader(gl.VERTEX_SHADER),fragShader=gl.createShader(gl.FRAGMENT_SHADER);if(gl.shaderSource(vertShader,vertShaderSrc),gl.shaderSource(fragShader,fragShaderSrc),gl.compileShader(vertShader),gl.compileShader(fragShader),!gl.getShaderParameter(vertShader,gl.COMPILE_STATUS))throw console.log(vertShaderSrc),console.error("An error occurred compiling the shaders: "+gl.getShaderInfoLog(vertShader)),"Error compiling vertex shader";if(!gl.getShaderParameter(fragShader,gl.COMPILE_STATUS))throw console.log(fragShaderSrc),console.error("An error occurred compiling the shaders: "+gl.getShaderInfoLog(fragShader)),"Error compiling fragment shader";opt.debug&&(console.log("Options:"),console.dir(opt),console.log("GLSL Shader Output:"),console.log(fragShaderSrc)),program=gl.createProgram(),gl.attachShader(program,vertShader),gl.attachShader(program,fragShader),gl.linkProgram(program),programCache[programCacheKey]=program,programUniformLocationCache[programCacheKey]=[]}gl.useProgram(program);var texCoordOffset=vertices.byteLength,buffer=bufferCache[programCacheKey];buffer?gl.bindBuffer(gl.ARRAY_BUFFER,buffer):(buffer=gl.createBuffer(),bufferCache[programCacheKey]=buffer,gl.bindBuffer(gl.ARRAY_BUFFER,buffer),gl.bufferData(gl.ARRAY_BUFFER,vertices.byteLength+texCoords.byteLength,gl.STATIC_DRAW)),gl.bufferSubData(gl.ARRAY_BUFFER,0,vertices),gl.bufferSubData(gl.ARRAY_BUFFER,texCoordOffset,texCoords);var aPosLoc=gl.getAttribLocation(program,"aPos");gl.enableVertexAttribArray(aPosLoc),gl.vertexAttribPointer(aPosLoc,2,gl.FLOAT,gl.FALSE,0,0);var aTexCoordLoc=gl.getAttribLocation(program,"aTexCoord");if(gl.enableVertexAttribArray(aTexCoordLoc),gl.vertexAttribPointer(aTexCoordLoc,2,gl.FLOAT,gl.FALSE,0,texCoordOffset),!opt.hardcodeConstants){var uOutputDimLoc=getUniformLocation("uOutputDim");gl.uniform3fv(uOutputDimLoc,threadDim);var uTexSizeLoc=getUniformLocation("uTexSize");gl.uniform2fv(uTexSizeLoc,texSize)}textureCache[programCacheKey]||(textureCache[programCacheKey]=[]);var textureCount=0;for(textureCount=0;textureCount<paramNames.length;textureCount++){var paramDim,paramSize,texture,argType=GPUUtils.getArgumentType(arguments[textureCount]);if("Array"==argType){paramDim=getDimensions(arguments[textureCount],!0),paramSize=dimToTexSize(opt,paramDim),textureCache[programCacheKey][textureCount]?texture=textureCache[programCacheKey][textureCount]:(texture=gl.createTexture(),textureCache[programCacheKey][textureCount]=texture),gl.activeTexture(gl["TEXTURE"+textureCount]),gl.bindTexture(gl.TEXTURE_2D,texture),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);var paramLength=paramSize[0]*paramSize[1];opt.floatTextures&&(paramLength*=4);var paramArray=new Float32Array(paramLength);paramArray.set(flatten(arguments[textureCount]));var argBuffer;opt.floatTextures?(argBuffer=new Float32Array(paramArray),gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,paramSize[0],paramSize[1],0,gl.RGBA,gl.FLOAT,argBuffer)):(argBuffer=new Uint8Array(new Float32Array(paramArray).buffer),gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,paramSize[0],paramSize[1],0,gl.RGBA,gl.UNSIGNED_BYTE,argBuffer));var paramLoc=getUniformLocation("user_"+paramNames[textureCount]),paramSizeLoc=getUniformLocation("user_"+paramNames[textureCount]+"Size"),paramDimLoc=getUniformLocation("user_"+paramNames[textureCount]+"Dim");opt.hardcodeConstants||(gl.uniform3fv(paramDimLoc,paramDim),gl.uniform2fv(paramSizeLoc,paramSize)),gl.uniform1i(paramLoc,textureCount)}else if("Number"==argType){var argLoc=getUniformLocation("user_"+paramNames[textureCount]);gl.uniform1f(argLoc,arguments[textureCount])}else{if("Texture"!=argType)throw"Input type not supported (GPU): "+arguments[textureCount];paramDim=getDimensions(arguments[textureCount],!0),paramSize=arguments[textureCount].size,texture=arguments[textureCount].texture,gl.activeTexture(gl["TEXTURE"+textureCount]),gl.bindTexture(gl.TEXTURE_2D,texture);var paramLoc=getUniformLocation("user_"+paramNames[textureCount]),paramSizeLoc=getUniformLocation("user_"+paramNames[textureCount]+"Size"),paramDimLoc=getUniformLocation("user_"+paramNames[textureCount]+"Dim");gl.uniform3fv(paramDimLoc,paramDim),gl.uniform2fv(paramSizeLoc,paramSize),gl.uniform1i(paramLoc,textureCount)}}var outputTexture=textureCache[programCacheKey][textureCount];if(outputTexture||(outputTexture=gl.createTexture(),textureCache[programCacheKey][textureCount]=outputTexture),gl.activeTexture(gl["TEXTURE"+textureCount]),gl.bindTexture(gl.TEXTURE_2D,outputTexture),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST),opt.floatOutput?gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,texSize[0],texSize[1],0,gl.RGBA,gl.FLOAT,null):gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,texSize[0],texSize[1],0,gl.RGBA,gl.UNSIGNED_BYTE,null),opt.graphical)return gl.bindRenderbuffer(gl.RENDERBUFFER,null),gl.bindFramebuffer(gl.FRAMEBUFFER,null),void gl.drawArrays(gl.TRIANGLE_STRIP,0,4);var framebuffer=framebufferCache[programCacheKey];if(framebuffer||(framebuffer=gl.createFramebuffer(),framebufferCache[programCacheKey]=framebuffer),framebuffer.width=texSize[0],framebuffer.height=texSize[1],gl.bindFramebuffer(gl.FRAMEBUFFER,framebuffer),gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,outputTexture,0),gl.drawArrays(gl.TRIANGLE_STRIP,0,4),opt.outputToTexture)return delete textureCache[programCacheKey][textureCount],new GPUTexture(gpu,outputTexture,texSize,opt.dimensions);var result;if(opt.floatOutput)result=new Float32Array(texSize[0]*texSize[1]*4),gl.readPixels(0,0,texSize[0],texSize[1],gl.RGBA,gl.FLOAT,result);else{var bytes=new Uint8Array(texSize[0]*texSize[1]*4);gl.readPixels(0,0,texSize[0],texSize[1],gl.RGBA,gl.UNSIGNED_BYTE,bytes),result=Float32Array.prototype.slice.call(new Float32Array(bytes.buffer))}if(result=result.subarray(0,threadDim[0]*threadDim[1]*threadDim[2]),1==opt.dimensions.length)return result;if(2==opt.dimensions.length)return splitArray(result,opt.dimensions[0]);if(3==opt.dimensions.length){var cube=splitArray(result,opt.dimensions[0]*opt.dimensions[1]);return cube.map(function(x){return splitArray(x,opt.dimensions[0])})}}var gpu=this,canvas=this._canvas;canvas||(canvas=this._canvas=GPUUtils.init_canvas());var gl=this._webgl;gl||(gl=this._webgl=GPUUtils.init_webgl(canvas));var builder=this.functionBuilder,endianness=this.endianness,funcStr=kernel.toString();if(!GPUUtils.isFunctionString(funcStr))throw"Unable to get body of kernel function";var paramNames=GPUUtils.getParamNames_fromString(funcStr),programCache={},programUniformLocationCache={},bufferCache={},textureCache={},framebufferCache={},vertices=new Float32Array([-1,-1,1,-1,-1,1,1,1]),texCoords=new Float32Array([0,0,1,0,0,1,1,1]);return ret.canvas=canvas,ret.webgl=gl,gpu.setupExecutorExtendedFunctions(ret,opt)}}(GPU),GPU}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(88)(module)))

/***/ },
/* 88 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 89 */
/***/ function(module, exports) {

	

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
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

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 91 */
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
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var reconintra4x4 = __webpack_require__(93);
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

	var idctllm = __webpack_require__(91);
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
/* 93 */
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
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var findenearmv = __webpack_require__(95);
	var left_block_mode = findenearmv.left_block_mode;
	var above_block_mode = findenearmv.above_block_mode;

	var MotionVector = __webpack_require__(72);
	var vp8_entropymodedata = __webpack_require__(96);

	var vp8_kf_bmode_prob = vp8_entropymodedata.vp8_kf_bmode_prob;


	var vp8_coef_update_probs = __webpack_require__(97);

	var entropymode = __webpack_require__(98);
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

	var vp8_mode_contexts = __webpack_require__(99);

	var bitreader = __webpack_require__(70);
	var vpx_read = bitreader.vpx_read;
	var vpx_read_bit = bitreader.vpx_read_bit;


	var vp8_treed_read = __webpack_require__(100);

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
	function read_bmode(bc, p , p_ptr) {
	    var i = vp8_treed_read(bc, vp8_bmode_tree, p , p_ptr);

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

	            modes_cache[i] = read_bmode(bc, vp8_kf_bmode_prob, (A * 90) + L * 9);

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
/* 95 */
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
/* 96 */
/***/ function(module, exports) {

	'use strict';

	//k_default_y_mode_probs
	var vp8_ymode_prob = new Uint8Array([112, 86, 140, 37]);
	      
	var vp8_kf_bmode_prob = new Uint8Array([
	                /* left mode 0 */ 231, 120, 48, 89, 115, 113, 120, 152, 112,
	                /* left mode 1 */ 152, 179, 64, 126, 170, 118, 46, 70, 95,
	                /* left mode 2 */ 175, 69, 143, 80, 85, 82, 72, 155, 103,
	                /* left mode 3 */ 56, 58, 10, 171, 218, 189, 17, 13, 152,
	                /* left mode 4 */ 144, 71, 10, 38, 171, 213, 144, 34, 26,
	                /* left mode 5 */ 114, 26, 17, 163, 44, 195, 21, 10, 173,
	                /* left mode 6 */ 121, 24, 80, 195, 26, 62, 44, 64, 85,
	                /* left mode 7 */ 170, 46, 55, 19, 136, 160, 33, 206, 71,
	                /* left mode 8 */ 63, 20, 8, 114, 114, 208, 12, 9, 226,
	                /* left mode 9 */ 81, 40, 11, 96, 182, 84, 29, 16, 36,
	                /* left mode 0 */ 134, 183, 89, 137, 98, 101, 106, 165, 148,
	                /* left mode 1 */ 72, 187, 100, 130, 157, 111, 32, 75, 80,
	                /* left mode 2 */ 66, 102, 167, 99, 74, 62, 40, 234, 128,
	                /* left mode 3 */ 41, 53, 9, 178, 241, 141, 26, 8, 107,
	                /* left mode 4 */ 104, 79, 12, 27, 217, 255, 87, 17, 7,
	                /* left mode 5 */ 74, 43, 26, 146, 73, 166, 49, 23, 157,
	                /* left mode 6 */ 65, 38, 105, 160, 51, 52, 31, 115, 128,
	                /* left mode 7 */ 87, 68, 71, 44, 114, 51, 15, 186, 23,
	                /* left mode 8 */ 47, 41, 14, 110, 182, 183, 21, 17, 194,
	                /* left mode 9 */ 66, 45, 25, 102, 197, 189, 23, 18, 22,
	                /* left mode 0 */ 88, 88, 147, 150, 42, 46, 45, 196, 205,
	                /* left mode 1 */ 43, 97, 183, 117, 85, 38, 35, 179, 61,
	                /* left mode 2 */ 39, 53, 200, 87, 26, 21, 43, 232, 171,
	                /* left mode 3 */ 56, 34, 51, 104, 114, 102, 29, 93, 77,
	                /* left mode 4 */ 107, 54, 32, 26, 51, 1, 81, 43, 31,
	                /* left mode 5 */ 39, 28, 85, 171, 58, 165, 90, 98, 64,
	                /* left mode 6 */ 34, 22, 116, 206, 23, 34, 43, 166, 73,
	                /* left mode 7 */ 68, 25, 106, 22, 64, 171, 36, 225, 114,
	                /* left mode 8 */ 34, 19, 21, 102, 132, 188, 16, 76, 124,
	                /* left mode 9 */ 62, 18, 78, 95, 85, 57, 50, 48, 51,
	                /* left mode 0 */ 193, 101, 35, 159, 215, 111, 89, 46, 111,
	                /* left mode 1 */ 60, 148, 31, 172, 219, 228, 21, 18, 111,
	                /* left mode 2 */ 112, 113, 77, 85, 179, 255, 38, 120, 114,
	                /* left mode 3 */ 40, 42, 1, 196, 245, 209, 10, 25, 109,
	                /* left mode 4 */ 100, 80, 8, 43, 154, 1, 51, 26, 71,
	                /* left mode 5 */ 88, 43, 29, 140, 166, 213, 37, 43, 154,
	                /* left mode 6 */ 61, 63, 30, 155, 67, 45, 68, 1, 209,
	                /* left mode 7 */ 142, 78, 78, 16, 255, 128, 34, 197, 171,
	                /* left mode 8 */ 41, 40, 5, 102, 211, 183, 4, 1, 221,
	                /* left mode 9 */ 51, 50, 17, 168, 209, 192, 23, 25, 82,
	                /* left mode 0 */ 125, 98, 42, 88, 104, 85, 117, 175, 82,
	                /* left mode 1 */ 95, 84, 53, 89, 128, 100, 113, 101, 45,
	                /* left mode 2 */ 75, 79, 123, 47, 51, 128, 81, 171, 1,
	                /* left mode 3 */ 57, 17, 5, 71, 102, 57, 53, 41, 49,
	                /* left mode 4 */ 115, 21, 2, 10, 102, 255, 166, 23, 6,
	                /* left mode 5 */ 38, 33, 13, 121, 57, 73, 26, 1, 85,
	                /* left mode 6 */ 41, 10, 67, 138, 77, 110, 90, 47, 114,
	                /* left mode 7 */ 101, 29, 16, 10, 85, 128, 101, 196, 26,
	                /* left mode 8 */ 57, 18, 10, 102, 102, 213, 34, 20, 43,
	                /* left mode 9 */ 117, 20, 15, 36, 163, 128, 68, 1, 26,
	                /* left mode 0 */ 138, 31, 36, 171, 27, 166, 38, 44, 229,
	                /* left mode 1 */ 67, 87, 58, 169, 82, 115, 26, 59, 179,
	                /* left mode 2 */ 63, 59, 90, 180, 59, 166, 93, 73, 154,
	                /* left mode 3 */ 40, 40, 21, 116, 143, 209, 34, 39, 175,
	                /* left mode 4 */ 57, 46, 22, 24, 128, 1, 54, 17, 37,
	                /* left mode 5 */ 47, 15, 16, 183, 34, 223, 49, 45, 183,
	                /* left mode 6 */ 46, 17, 33, 183, 6, 98, 15, 32, 183,
	                /* left mode 7 */ 65, 32, 73, 115, 28, 128, 23, 128, 205,
	                /* left mode 8 */ 40, 3, 9, 115, 51, 192, 18, 6, 223,
	                /* left mode 9 */ 87, 37, 9, 115, 59, 77, 64, 21, 47,
	                /* left mode 0 */ 104, 55, 44, 218, 9, 54, 53, 130, 226,
	                /* left mode 1 */ 64, 90, 70, 205, 40, 41, 23, 26, 57,
	                /* left mode 2 */ 54, 57, 112, 184, 5, 41, 38, 166, 213,
	                /* left mode 3 */ 30, 34, 26, 133, 152, 116, 10, 32, 134,
	                /* left mode 4 */ 75, 32, 12, 51, 192, 255, 160, 43, 51,
	                /* left mode 5 */ 39, 19, 53, 221, 26, 114, 32, 73, 255,
	                /* left mode 6 */ 31, 9, 65, 234, 2, 15, 1, 118, 73,
	                /* left mode 7 */ 88, 31, 35, 67, 102, 85, 55, 186, 85,
	                /* left mode 8 */ 56, 21, 23, 111, 59, 205, 45, 37, 192,
	                /* left mode 9 */ 55, 38, 70, 124, 73, 102, 1, 34, 98,
	                /* left mode 0 */ 102, 61, 71, 37, 34, 53, 31, 243, 192,
	                /* left mode 1 */ 69, 60, 71, 38, 73, 119, 28, 222, 37,
	                /* left mode 2 */ 68, 45, 128, 34, 1, 47, 11, 245, 171,
	                /* left mode 3 */ 62, 17, 19, 70, 146, 85, 55, 62, 70,
	                /* left mode 4 */ 75, 15, 9, 9, 64, 255, 184, 119, 16,
	                /* left mode 5 */ 37, 43, 37, 154, 100, 163, 85, 160, 1,
	                /* left mode 6 */ 63, 9, 92, 136, 28, 64, 32, 201, 85,
	                /* left mode 7 */ 86, 6, 28, 5, 64, 255, 25, 248, 1,
	                /* left mode 8 */ 56, 8, 17, 132, 137, 255, 55, 116, 128,
	                /* left mode 9 */ 58, 15, 20, 82, 135, 57, 26, 121, 40,
	                /* left mode 0 */ 164, 50, 31, 137, 154, 133, 25, 35, 218,
	                /* left mode 1 */ 51, 103, 44, 131, 131, 123, 31, 6, 158,
	                /* left mode 2 */ 86, 40, 64, 135, 148, 224, 45, 183, 128,
	                /* left mode 3 */ 22, 26, 17, 131, 240, 154, 14, 1, 209,
	                /* left mode 4 */ 83, 12, 13, 54, 192, 255, 68, 47, 28,
	                /* left mode 5 */ 45, 16, 21, 91, 64, 222, 7, 1, 197,
	                /* left mode 6 */ 56, 21, 39, 155, 60, 138, 23, 102, 213,
	                /* left mode 7 */ 85, 26, 85, 85, 128, 128, 32, 146, 171,
	                /* left mode 8 */ 18, 11, 7, 63, 144, 171, 4, 4, 246,
	                /* left mode 9 */ 35, 27, 10, 146, 174, 171, 12, 26, 128,
	                /* left mode 0 */ 190, 80, 35, 99, 180, 80, 126, 54, 45,
	                /* left mode 1 */ 85, 126, 47, 87, 176, 51, 41, 20, 32,
	                /* left mode 2 */ 101, 75, 128, 139, 118, 146, 116, 128, 85,
	                /* left mode 3 */ 56, 41, 15, 176, 236, 85, 37, 9, 62,
	                /* left mode 4 */ 146, 36, 19, 30, 171, 255, 97, 27, 20,
	                /* left mode 5 */ 71, 30, 17, 119, 118, 255, 17, 18, 138,
	                /* left mode 6 */ 101, 38, 60, 138, 55, 70, 43, 26, 142,
	                /* left mode 7 */ 138, 45, 61, 62, 219, 1, 81, 188, 64,
	                /* left mode 8 */ 32, 41, 20, 117, 151, 142, 20, 21, 163,
	                /* left mode 9 */ 112, 19, 12, 61, 195, 128, 48, 4, 24
	            
	        ]);
	module.exports = {};
	module.exports.vp8_kf_bmode_prob = vp8_kf_bmode_prob;
	module.exports.vp8_ymode_prob = vp8_ymode_prob;

/***/ },
/* 97 */
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
/* 98 */
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
/* 99 */
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
/* 100 */
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
/* 101 */
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