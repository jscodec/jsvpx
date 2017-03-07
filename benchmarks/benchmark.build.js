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

	var _ = __webpack_require__(2);
	var process = __webpack_require__(4);
	var Benchmark = __webpack_require__(5);

	var Benchmark = __webpack_require__(5);
	Benchmark = Benchmark.runInContext({_: _, process: process});
	window.Benchmark = Benchmark;

	var ivf = __webpack_require__(6);
	var jsvpx = __webpack_require__(7);
	var testVectors = __webpack_require__(40);

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









/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, module) {/**
	 * @license
	 * Lodash <https://lodash.com/>
	 * Copyright JS Foundation and other contributors <https://js.foundation/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	;(function() {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /** Used as the semantic version number. */
	  var VERSION = '4.17.4';

	  /** Used as the size to enable large array optimizations. */
	  var LARGE_ARRAY_SIZE = 200;

	  /** Error message constants. */
	  var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
	      FUNC_ERROR_TEXT = 'Expected a function';

	  /** Used to stand-in for `undefined` hash values. */
	  var HASH_UNDEFINED = '__lodash_hash_undefined__';

	  /** Used as the maximum memoize cache size. */
	  var MAX_MEMOIZE_SIZE = 500;

	  /** Used as the internal argument placeholder. */
	  var PLACEHOLDER = '__lodash_placeholder__';

	  /** Used to compose bitmasks for cloning. */
	  var CLONE_DEEP_FLAG = 1,
	      CLONE_FLAT_FLAG = 2,
	      CLONE_SYMBOLS_FLAG = 4;

	  /** Used to compose bitmasks for value comparisons. */
	  var COMPARE_PARTIAL_FLAG = 1,
	      COMPARE_UNORDERED_FLAG = 2;

	  /** Used to compose bitmasks for function metadata. */
	  var WRAP_BIND_FLAG = 1,
	      WRAP_BIND_KEY_FLAG = 2,
	      WRAP_CURRY_BOUND_FLAG = 4,
	      WRAP_CURRY_FLAG = 8,
	      WRAP_CURRY_RIGHT_FLAG = 16,
	      WRAP_PARTIAL_FLAG = 32,
	      WRAP_PARTIAL_RIGHT_FLAG = 64,
	      WRAP_ARY_FLAG = 128,
	      WRAP_REARG_FLAG = 256,
	      WRAP_FLIP_FLAG = 512;

	  /** Used as default options for `_.truncate`. */
	  var DEFAULT_TRUNC_LENGTH = 30,
	      DEFAULT_TRUNC_OMISSION = '...';

	  /** Used to detect hot functions by number of calls within a span of milliseconds. */
	  var HOT_COUNT = 800,
	      HOT_SPAN = 16;

	  /** Used to indicate the type of lazy iteratees. */
	  var LAZY_FILTER_FLAG = 1,
	      LAZY_MAP_FLAG = 2,
	      LAZY_WHILE_FLAG = 3;

	  /** Used as references for various `Number` constants. */
	  var INFINITY = 1 / 0,
	      MAX_SAFE_INTEGER = 9007199254740991,
	      MAX_INTEGER = 1.7976931348623157e+308,
	      NAN = 0 / 0;

	  /** Used as references for the maximum length and index of an array. */
	  var MAX_ARRAY_LENGTH = 4294967295,
	      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
	      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

	  /** Used to associate wrap methods with their bit flags. */
	  var wrapFlags = [
	    ['ary', WRAP_ARY_FLAG],
	    ['bind', WRAP_BIND_FLAG],
	    ['bindKey', WRAP_BIND_KEY_FLAG],
	    ['curry', WRAP_CURRY_FLAG],
	    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
	    ['flip', WRAP_FLIP_FLAG],
	    ['partial', WRAP_PARTIAL_FLAG],
	    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
	    ['rearg', WRAP_REARG_FLAG]
	  ];

	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]',
	      arrayTag = '[object Array]',
	      asyncTag = '[object AsyncFunction]',
	      boolTag = '[object Boolean]',
	      dateTag = '[object Date]',
	      domExcTag = '[object DOMException]',
	      errorTag = '[object Error]',
	      funcTag = '[object Function]',
	      genTag = '[object GeneratorFunction]',
	      mapTag = '[object Map]',
	      numberTag = '[object Number]',
	      nullTag = '[object Null]',
	      objectTag = '[object Object]',
	      promiseTag = '[object Promise]',
	      proxyTag = '[object Proxy]',
	      regexpTag = '[object RegExp]',
	      setTag = '[object Set]',
	      stringTag = '[object String]',
	      symbolTag = '[object Symbol]',
	      undefinedTag = '[object Undefined]',
	      weakMapTag = '[object WeakMap]',
	      weakSetTag = '[object WeakSet]';

	  var arrayBufferTag = '[object ArrayBuffer]',
	      dataViewTag = '[object DataView]',
	      float32Tag = '[object Float32Array]',
	      float64Tag = '[object Float64Array]',
	      int8Tag = '[object Int8Array]',
	      int16Tag = '[object Int16Array]',
	      int32Tag = '[object Int32Array]',
	      uint8Tag = '[object Uint8Array]',
	      uint8ClampedTag = '[object Uint8ClampedArray]',
	      uint16Tag = '[object Uint16Array]',
	      uint32Tag = '[object Uint32Array]';

	  /** Used to match empty string literals in compiled template source. */
	  var reEmptyStringLeading = /\b__p \+= '';/g,
	      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

	  /** Used to match HTML entities and HTML characters. */
	  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
	      reUnescapedHtml = /[&<>"']/g,
	      reHasEscapedHtml = RegExp(reEscapedHtml.source),
	      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

	  /** Used to match template delimiters. */
	  var reEscape = /<%-([\s\S]+?)%>/g,
	      reEvaluate = /<%([\s\S]+?)%>/g,
	      reInterpolate = /<%=([\s\S]+?)%>/g;

	  /** Used to match property names within property paths. */
	  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	      reIsPlainProp = /^\w*$/,
	      reLeadingDot = /^\./,
	      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	  /**
	   * Used to match `RegExp`
	   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	   */
	  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
	      reHasRegExpChar = RegExp(reRegExpChar.source);

	  /** Used to match leading and trailing whitespace. */
	  var reTrim = /^\s+|\s+$/g,
	      reTrimStart = /^\s+/,
	      reTrimEnd = /\s+$/;

	  /** Used to match wrap detail comments. */
	  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
	      reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
	      reSplitDetails = /,? & /;

	  /** Used to match words composed of alphanumeric characters. */
	  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

	  /** Used to match backslashes in property paths. */
	  var reEscapeChar = /\\(\\)?/g;

	  /**
	   * Used to match
	   * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
	   */
	  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

	  /** Used to match `RegExp` flags from their coerced string values. */
	  var reFlags = /\w*$/;

	  /** Used to detect bad signed hexadecimal string values. */
	  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	  /** Used to detect binary string values. */
	  var reIsBinary = /^0b[01]+$/i;

	  /** Used to detect host constructors (Safari). */
	  var reIsHostCtor = /^\[object .+?Constructor\]$/;

	  /** Used to detect octal string values. */
	  var reIsOctal = /^0o[0-7]+$/i;

	  /** Used to detect unsigned integer values. */
	  var reIsUint = /^(?:0|[1-9]\d*)$/;

	  /** Used to match Latin Unicode letters (excluding mathematical operators). */
	  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

	  /** Used to ensure capturing order of template delimiters. */
	  var reNoMatch = /($^)/;

	  /** Used to match unescaped characters in compiled string literals. */
	  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

	  /** Used to compose unicode character classes. */
	  var rsAstralRange = '\\ud800-\\udfff',
	      rsComboMarksRange = '\\u0300-\\u036f',
	      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	      rsComboSymbolsRange = '\\u20d0-\\u20ff',
	      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	      rsDingbatRange = '\\u2700-\\u27bf',
	      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	      rsPunctuationRange = '\\u2000-\\u206f',
	      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	      rsVarRange = '\\ufe0e\\ufe0f',
	      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

	  /** Used to compose unicode capture groups. */
	  var rsApos = "['\u2019]",
	      rsAstral = '[' + rsAstralRange + ']',
	      rsBreak = '[' + rsBreakRange + ']',
	      rsCombo = '[' + rsComboRange + ']',
	      rsDigits = '\\d+',
	      rsDingbat = '[' + rsDingbatRange + ']',
	      rsLower = '[' + rsLowerRange + ']',
	      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	      rsFitz = '\\ud83c[\\udffb-\\udfff]',
	      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	      rsNonAstral = '[^' + rsAstralRange + ']',
	      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	      rsUpper = '[' + rsUpperRange + ']',
	      rsZWJ = '\\u200d';

	  /** Used to compose unicode regexes. */
	  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
	      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
	      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
	      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
	      reOptMod = rsModifier + '?',
	      rsOptVar = '[' + rsVarRange + ']?',
	      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	      rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)',
	      rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)',
	      rsSeq = rsOptVar + reOptMod + rsOptJoin,
	      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
	      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

	  /** Used to match apostrophes. */
	  var reApos = RegExp(rsApos, 'g');

	  /**
	   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	   */
	  var reComboMark = RegExp(rsCombo, 'g');

	  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

	  /** Used to match complex or compound words. */
	  var reUnicodeWord = RegExp([
	    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
	    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
	    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
	    rsUpper + '+' + rsOptContrUpper,
	    rsOrdUpper,
	    rsOrdLower,
	    rsDigits,
	    rsEmoji
	  ].join('|'), 'g');

	  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

	  /** Used to detect strings that need a more robust regexp to match words. */
	  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

	  /** Used to assign default `context` object properties. */
	  var contextProps = [
	    'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
	    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
	    'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
	    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
	    '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
	  ];

	  /** Used to make template sourceURLs easier to identify. */
	  var templateCounter = -1;

	  /** Used to identify `toStringTag` values of typed arrays. */
	  var typedArrayTags = {};
	  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	  typedArrayTags[uint32Tag] = true;
	  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	  typedArrayTags[setTag] = typedArrayTags[stringTag] =
	  typedArrayTags[weakMapTag] = false;

	  /** Used to identify `toStringTag` values supported by `_.clone`. */
	  var cloneableTags = {};
	  cloneableTags[argsTag] = cloneableTags[arrayTag] =
	  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	  cloneableTags[boolTag] = cloneableTags[dateTag] =
	  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	  cloneableTags[int32Tag] = cloneableTags[mapTag] =
	  cloneableTags[numberTag] = cloneableTags[objectTag] =
	  cloneableTags[regexpTag] = cloneableTags[setTag] =
	  cloneableTags[stringTag] = cloneableTags[symbolTag] =
	  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	  cloneableTags[errorTag] = cloneableTags[funcTag] =
	  cloneableTags[weakMapTag] = false;

	  /** Used to map Latin Unicode letters to basic Latin letters. */
	  var deburredLetters = {
	    // Latin-1 Supplement block.
	    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	    '\xc7': 'C',  '\xe7': 'c',
	    '\xd0': 'D',  '\xf0': 'd',
	    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	    '\xd1': 'N',  '\xf1': 'n',
	    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	    '\xc6': 'Ae', '\xe6': 'ae',
	    '\xde': 'Th', '\xfe': 'th',
	    '\xdf': 'ss',
	    // Latin Extended-A block.
	    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
	    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
	    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
	    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
	    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
	    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
	    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
	    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
	    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
	    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
	    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
	    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
	    '\u0134': 'J',  '\u0135': 'j',
	    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
	    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
	    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
	    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
	    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
	    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
	    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
	    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
	    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
	    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
	    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
	    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
	    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
	    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
	    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
	    '\u0174': 'W',  '\u0175': 'w',
	    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
	    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
	    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
	    '\u0132': 'IJ', '\u0133': 'ij',
	    '\u0152': 'Oe', '\u0153': 'oe',
	    '\u0149': "'n", '\u017f': 's'
	  };

	  /** Used to map characters to HTML entities. */
	  var htmlEscapes = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;'
	  };

	  /** Used to map HTML entities to characters. */
	  var htmlUnescapes = {
	    '&amp;': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&#39;': "'"
	  };

	  /** Used to escape characters for inclusion in compiled string literals. */
	  var stringEscapes = {
	    '\\': '\\',
	    "'": "'",
	    '\n': 'n',
	    '\r': 'r',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  /** Built-in method references without a dependency on `root`. */
	  var freeParseFloat = parseFloat,
	      freeParseInt = parseInt;

	  /** Detect free variable `global` from Node.js. */
	  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	  /** Detect free variable `self`. */
	  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	  /** Used as a reference to the global object. */
	  var root = freeGlobal || freeSelf || Function('return this')();

	  /** Detect free variable `exports`. */
	  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	  /** Detect free variable `module`. */
	  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	  /** Detect the popular CommonJS extension `module.exports`. */
	  var moduleExports = freeModule && freeModule.exports === freeExports;

	  /** Detect free variable `process` from Node.js. */
	  var freeProcess = moduleExports && freeGlobal.process;

	  /** Used to access faster Node.js helpers. */
	  var nodeUtil = (function() {
	    try {
	      return freeProcess && freeProcess.binding && freeProcess.binding('util');
	    } catch (e) {}
	  }());

	  /* Node.js helper references. */
	  var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
	      nodeIsDate = nodeUtil && nodeUtil.isDate,
	      nodeIsMap = nodeUtil && nodeUtil.isMap,
	      nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
	      nodeIsSet = nodeUtil && nodeUtil.isSet,
	      nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Adds the key-value `pair` to `map`.
	   *
	   * @private
	   * @param {Object} map The map to modify.
	   * @param {Array} pair The key-value pair to add.
	   * @returns {Object} Returns `map`.
	   */
	  function addMapEntry(map, pair) {
	    // Don't return `map.set` because it's not chainable in IE 11.
	    map.set(pair[0], pair[1]);
	    return map;
	  }

	  /**
	   * Adds `value` to `set`.
	   *
	   * @private
	   * @param {Object} set The set to modify.
	   * @param {*} value The value to add.
	   * @returns {Object} Returns `set`.
	   */
	  function addSetEntry(set, value) {
	    // Don't return `set.add` because it's not chainable in IE 11.
	    set.add(value);
	    return set;
	  }

	  /**
	   * A faster alternative to `Function#apply`, this function invokes `func`
	   * with the `this` binding of `thisArg` and the arguments of `args`.
	   *
	   * @private
	   * @param {Function} func The function to invoke.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {Array} args The arguments to invoke `func` with.
	   * @returns {*} Returns the result of `func`.
	   */
	  function apply(func, thisArg, args) {
	    switch (args.length) {
	      case 0: return func.call(thisArg);
	      case 1: return func.call(thisArg, args[0]);
	      case 2: return func.call(thisArg, args[0], args[1]);
	      case 3: return func.call(thisArg, args[0], args[1], args[2]);
	    }
	    return func.apply(thisArg, args);
	  }

	  /**
	   * A specialized version of `baseAggregator` for arrays.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} setter The function to set `accumulator` values.
	   * @param {Function} iteratee The iteratee to transform keys.
	   * @param {Object} accumulator The initial aggregated object.
	   * @returns {Function} Returns `accumulator`.
	   */
	  function arrayAggregator(array, setter, iteratee, accumulator) {
	    var index = -1,
	        length = array == null ? 0 : array.length;

	    while (++index < length) {
	      var value = array[index];
	      setter(accumulator, value, iteratee(value), array);
	    }
	    return accumulator;
	  }

	  /**
	   * A specialized version of `_.forEach` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayEach(array, iteratee) {
	    var index = -1,
	        length = array == null ? 0 : array.length;

	    while (++index < length) {
	      if (iteratee(array[index], index, array) === false) {
	        break;
	      }
	    }
	    return array;
	  }

	  /**
	   * A specialized version of `_.forEachRight` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayEachRight(array, iteratee) {
	    var length = array == null ? 0 : array.length;

	    while (length--) {
	      if (iteratee(array[length], length, array) === false) {
	        break;
	      }
	    }
	    return array;
	  }

	  /**
	   * A specialized version of `_.every` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {boolean} Returns `true` if all elements pass the predicate check,
	   *  else `false`.
	   */
	  function arrayEvery(array, predicate) {
	    var index = -1,
	        length = array == null ? 0 : array.length;

	    while (++index < length) {
	      if (!predicate(array[index], index, array)) {
	        return false;
	      }
	    }
	    return true;
	  }

	  /**
	   * A specialized version of `_.filter` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {Array} Returns the new filtered array.
	   */
	  function arrayFilter(array, predicate) {
	    var index = -1,
	        length = array == null ? 0 : array.length,
	        resIndex = 0,
	        result = [];

	    while (++index < length) {
	      var value = array[index];
	      if (predicate(value, index, array)) {
	        result[resIndex++] = value;
	      }
	    }
	    return result;
	  }

	  /**
	   * A specialized version of `_.includes` for arrays without support for
	   * specifying an index to search from.
	   *
	   * @private
	   * @param {Array} [array] The array to inspect.
	   * @param {*} target The value to search for.
	   * @returns {boolean} Returns `true` if `target` is found, else `false`.
	   */
	  function arrayIncludes(array, value) {
	    var length = array == null ? 0 : array.length;
	    return !!length && baseIndexOf(array, value, 0) > -1;
	  }

	  /**
	   * This function is like `arrayIncludes` except that it accepts a comparator.
	   *
	   * @private
	   * @param {Array} [array] The array to inspect.
	   * @param {*} target The value to search for.
	   * @param {Function} comparator The comparator invoked per element.
	   * @returns {boolean} Returns `true` if `target` is found, else `false`.
	   */
	  function arrayIncludesWith(array, value, comparator) {
	    var index = -1,
	        length = array == null ? 0 : array.length;

	    while (++index < length) {
	      if (comparator(value, array[index])) {
	        return true;
	      }
	    }
	    return false;
	  }

	  /**
	   * A specialized version of `_.map` for arrays without support for iteratee
	   * shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns the new mapped array.
	   */
	  function arrayMap(array, iteratee) {
	    var index = -1,
	        length = array == null ? 0 : array.length,
	        result = Array(length);

	    while (++index < length) {
	      result[index] = iteratee(array[index], index, array);
	    }
	    return result;
	  }

	  /**
	   * Appends the elements of `values` to `array`.
	   *
	   * @private
	   * @param {Array} array The array to modify.
	   * @param {Array} values The values to append.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayPush(array, values) {
	    var index = -1,
	        length = values.length,
	        offset = array.length;

	    while (++index < length) {
	      array[offset + index] = values[index];
	    }
	    return array;
	  }

	  /**
	   * A specialized version of `_.reduce` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} [accumulator] The initial value.
	   * @param {boolean} [initAccum] Specify using the first element of `array` as
	   *  the initial value.
	   * @returns {*} Returns the accumulated value.
	   */
	  function arrayReduce(array, iteratee, accumulator, initAccum) {
	    var index = -1,
	        length = array == null ? 0 : array.length;

	    if (initAccum && length) {
	      accumulator = array[++index];
	    }
	    while (++index < length) {
	      accumulator = iteratee(accumulator, array[index], index, array);
	    }
	    return accumulator;
	  }

	  /**
	   * A specialized version of `_.reduceRight` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} [accumulator] The initial value.
	   * @param {boolean} [initAccum] Specify using the last element of `array` as
	   *  the initial value.
	   * @returns {*} Returns the accumulated value.
	   */
	  function arrayReduceRight(array, iteratee, accumulator, initAccum) {
	    var length = array == null ? 0 : array.length;
	    if (initAccum && length) {
	      accumulator = array[--length];
	    }
	    while (length--) {
	      accumulator = iteratee(accumulator, array[length], length, array);
	    }
	    return accumulator;
	  }

	  /**
	   * A specialized version of `_.some` for arrays without support for iteratee
	   * shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {boolean} Returns `true` if any element passes the predicate check,
	   *  else `false`.
	   */
	  function arraySome(array, predicate) {
	    var index = -1,
	        length = array == null ? 0 : array.length;

	    while (++index < length) {
	      if (predicate(array[index], index, array)) {
	        return true;
	      }
	    }
	    return false;
	  }

	  /**
	   * Gets the size of an ASCII `string`.
	   *
	   * @private
	   * @param {string} string The string inspect.
	   * @returns {number} Returns the string size.
	   */
	  var asciiSize = baseProperty('length');

	  /**
	   * Converts an ASCII `string` to an array.
	   *
	   * @private
	   * @param {string} string The string to convert.
	   * @returns {Array} Returns the converted array.
	   */
	  function asciiToArray(string) {
	    return string.split('');
	  }

	  /**
	   * Splits an ASCII `string` into an array of its words.
	   *
	   * @private
	   * @param {string} The string to inspect.
	   * @returns {Array} Returns the words of `string`.
	   */
	  function asciiWords(string) {
	    return string.match(reAsciiWord) || [];
	  }

	  /**
	   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
	   * without support for iteratee shorthands, which iterates over `collection`
	   * using `eachFunc`.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to inspect.
	   * @param {Function} predicate The function invoked per iteration.
	   * @param {Function} eachFunc The function to iterate over `collection`.
	   * @returns {*} Returns the found element or its key, else `undefined`.
	   */
	  function baseFindKey(collection, predicate, eachFunc) {
	    var result;
	    eachFunc(collection, function(value, key, collection) {
	      if (predicate(value, key, collection)) {
	        result = key;
	        return false;
	      }
	    });
	    return result;
	  }

	  /**
	   * The base implementation of `_.findIndex` and `_.findLastIndex` without
	   * support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {Function} predicate The function invoked per iteration.
	   * @param {number} fromIndex The index to search from.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
	  function baseFindIndex(array, predicate, fromIndex, fromRight) {
	    var length = array.length,
	        index = fromIndex + (fromRight ? 1 : -1);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (predicate(array[index], index, array)) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {*} value The value to search for.
	   * @param {number} fromIndex The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
	  function baseIndexOf(array, value, fromIndex) {
	    return value === value
	      ? strictIndexOf(array, value, fromIndex)
	      : baseFindIndex(array, baseIsNaN, fromIndex);
	  }

	  /**
	   * This function is like `baseIndexOf` except that it accepts a comparator.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {*} value The value to search for.
	   * @param {number} fromIndex The index to search from.
	   * @param {Function} comparator The comparator invoked per element.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
	  function baseIndexOfWith(array, value, fromIndex, comparator) {
	    var index = fromIndex - 1,
	        length = array.length;

	    while (++index < length) {
	      if (comparator(array[index], value)) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * The base implementation of `_.isNaN` without support for number objects.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	   */
	  function baseIsNaN(value) {
	    return value !== value;
	  }

	  /**
	   * The base implementation of `_.mean` and `_.meanBy` without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {number} Returns the mean.
	   */
	  function baseMean(array, iteratee) {
	    var length = array == null ? 0 : array.length;
	    return length ? (baseSum(array, iteratee) / length) : NAN;
	  }

	  /**
	   * The base implementation of `_.property` without support for deep paths.
	   *
	   * @private
	   * @param {string} key The key of the property to get.
	   * @returns {Function} Returns the new accessor function.
	   */
	  function baseProperty(key) {
	    return function(object) {
	      return object == null ? undefined : object[key];
	    };
	  }

	  /**
	   * The base implementation of `_.propertyOf` without support for deep paths.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {Function} Returns the new accessor function.
	   */
	  function basePropertyOf(object) {
	    return function(key) {
	      return object == null ? undefined : object[key];
	    };
	  }

	  /**
	   * The base implementation of `_.reduce` and `_.reduceRight`, without support
	   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} accumulator The initial value.
	   * @param {boolean} initAccum Specify using the first or last element of
	   *  `collection` as the initial value.
	   * @param {Function} eachFunc The function to iterate over `collection`.
	   * @returns {*} Returns the accumulated value.
	   */
	  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
	    eachFunc(collection, function(value, index, collection) {
	      accumulator = initAccum
	        ? (initAccum = false, value)
	        : iteratee(accumulator, value, index, collection);
	    });
	    return accumulator;
	  }

	  /**
	   * The base implementation of `_.sortBy` which uses `comparer` to define the
	   * sort order of `array` and replaces criteria objects with their corresponding
	   * values.
	   *
	   * @private
	   * @param {Array} array The array to sort.
	   * @param {Function} comparer The function to define sort order.
	   * @returns {Array} Returns `array`.
	   */
	  function baseSortBy(array, comparer) {
	    var length = array.length;

	    array.sort(comparer);
	    while (length--) {
	      array[length] = array[length].value;
	    }
	    return array;
	  }

	  /**
	   * The base implementation of `_.sum` and `_.sumBy` without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {number} Returns the sum.
	   */
	  function baseSum(array, iteratee) {
	    var result,
	        index = -1,
	        length = array.length;

	    while (++index < length) {
	      var current = iteratee(array[index]);
	      if (current !== undefined) {
	        result = result === undefined ? current : (result + current);
	      }
	    }
	    return result;
	  }

	  /**
	   * The base implementation of `_.times` without support for iteratee shorthands
	   * or max array length checks.
	   *
	   * @private
	   * @param {number} n The number of times to invoke `iteratee`.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns the array of results.
	   */
	  function baseTimes(n, iteratee) {
	    var index = -1,
	        result = Array(n);

	    while (++index < n) {
	      result[index] = iteratee(index);
	    }
	    return result;
	  }

	  /**
	   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	   * of key-value pairs for `object` corresponding to the property names of `props`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @param {Array} props The property names to get values for.
	   * @returns {Object} Returns the key-value pairs.
	   */
	  function baseToPairs(object, props) {
	    return arrayMap(props, function(key) {
	      return [key, object[key]];
	    });
	  }

	  /**
	   * The base implementation of `_.unary` without support for storing metadata.
	   *
	   * @private
	   * @param {Function} func The function to cap arguments for.
	   * @returns {Function} Returns the new capped function.
	   */
	  function baseUnary(func) {
	    return function(value) {
	      return func(value);
	    };
	  }

	  /**
	   * The base implementation of `_.values` and `_.valuesIn` which creates an
	   * array of `object` property values corresponding to the property names
	   * of `props`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @param {Array} props The property names to get values for.
	   * @returns {Object} Returns the array of property values.
	   */
	  function baseValues(object, props) {
	    return arrayMap(props, function(key) {
	      return object[key];
	    });
	  }

	  /**
	   * Checks if a `cache` value for `key` exists.
	   *
	   * @private
	   * @param {Object} cache The cache to query.
	   * @param {string} key The key of the entry to check.
	   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	   */
	  function cacheHas(cache, key) {
	    return cache.has(key);
	  }

	  /**
	   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
	   * that is not found in the character symbols.
	   *
	   * @private
	   * @param {Array} strSymbols The string symbols to inspect.
	   * @param {Array} chrSymbols The character symbols to find.
	   * @returns {number} Returns the index of the first unmatched string symbol.
	   */
	  function charsStartIndex(strSymbols, chrSymbols) {
	    var index = -1,
	        length = strSymbols.length;

	    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
	    return index;
	  }

	  /**
	   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
	   * that is not found in the character symbols.
	   *
	   * @private
	   * @param {Array} strSymbols The string symbols to inspect.
	   * @param {Array} chrSymbols The character symbols to find.
	   * @returns {number} Returns the index of the last unmatched string symbol.
	   */
	  function charsEndIndex(strSymbols, chrSymbols) {
	    var index = strSymbols.length;

	    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
	    return index;
	  }

	  /**
	   * Gets the number of `placeholder` occurrences in `array`.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {*} placeholder The placeholder to search for.
	   * @returns {number} Returns the placeholder count.
	   */
	  function countHolders(array, placeholder) {
	    var length = array.length,
	        result = 0;

	    while (length--) {
	      if (array[length] === placeholder) {
	        ++result;
	      }
	    }
	    return result;
	  }

	  /**
	   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
	   * letters to basic Latin letters.
	   *
	   * @private
	   * @param {string} letter The matched letter to deburr.
	   * @returns {string} Returns the deburred letter.
	   */
	  var deburrLetter = basePropertyOf(deburredLetters);

	  /**
	   * Used by `_.escape` to convert characters to HTML entities.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  var escapeHtmlChar = basePropertyOf(htmlEscapes);

	  /**
	   * Used by `_.template` to escape characters for inclusion in compiled string literals.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeStringChar(chr) {
	    return '\\' + stringEscapes[chr];
	  }

	  /**
	   * Gets the value at `key` of `object`.
	   *
	   * @private
	   * @param {Object} [object] The object to query.
	   * @param {string} key The key of the property to get.
	   * @returns {*} Returns the property value.
	   */
	  function getValue(object, key) {
	    return object == null ? undefined : object[key];
	  }

	  /**
	   * Checks if `string` contains Unicode symbols.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
	   */
	  function hasUnicode(string) {
	    return reHasUnicode.test(string);
	  }

	  /**
	   * Checks if `string` contains a word composed of Unicode symbols.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {boolean} Returns `true` if a word is found, else `false`.
	   */
	  function hasUnicodeWord(string) {
	    return reHasUnicodeWord.test(string);
	  }

	  /**
	   * Converts `iterator` to an array.
	   *
	   * @private
	   * @param {Object} iterator The iterator to convert.
	   * @returns {Array} Returns the converted array.
	   */
	  function iteratorToArray(iterator) {
	    var data,
	        result = [];

	    while (!(data = iterator.next()).done) {
	      result.push(data.value);
	    }
	    return result;
	  }

	  /**
	   * Converts `map` to its key-value pairs.
	   *
	   * @private
	   * @param {Object} map The map to convert.
	   * @returns {Array} Returns the key-value pairs.
	   */
	  function mapToArray(map) {
	    var index = -1,
	        result = Array(map.size);

	    map.forEach(function(value, key) {
	      result[++index] = [key, value];
	    });
	    return result;
	  }

	  /**
	   * Creates a unary function that invokes `func` with its argument transformed.
	   *
	   * @private
	   * @param {Function} func The function to wrap.
	   * @param {Function} transform The argument transform.
	   * @returns {Function} Returns the new function.
	   */
	  function overArg(func, transform) {
	    return function(arg) {
	      return func(transform(arg));
	    };
	  }

	  /**
	   * Replaces all `placeholder` elements in `array` with an internal placeholder
	   * and returns an array of their indexes.
	   *
	   * @private
	   * @param {Array} array The array to modify.
	   * @param {*} placeholder The placeholder to replace.
	   * @returns {Array} Returns the new array of placeholder indexes.
	   */
	  function replaceHolders(array, placeholder) {
	    var index = -1,
	        length = array.length,
	        resIndex = 0,
	        result = [];

	    while (++index < length) {
	      var value = array[index];
	      if (value === placeholder || value === PLACEHOLDER) {
	        array[index] = PLACEHOLDER;
	        result[resIndex++] = index;
	      }
	    }
	    return result;
	  }

	  /**
	   * Converts `set` to an array of its values.
	   *
	   * @private
	   * @param {Object} set The set to convert.
	   * @returns {Array} Returns the values.
	   */
	  function setToArray(set) {
	    var index = -1,
	        result = Array(set.size);

	    set.forEach(function(value) {
	      result[++index] = value;
	    });
	    return result;
	  }

	  /**
	   * Converts `set` to its value-value pairs.
	   *
	   * @private
	   * @param {Object} set The set to convert.
	   * @returns {Array} Returns the value-value pairs.
	   */
	  function setToPairs(set) {
	    var index = -1,
	        result = Array(set.size);

	    set.forEach(function(value) {
	      result[++index] = [value, value];
	    });
	    return result;
	  }

	  /**
	   * A specialized version of `_.indexOf` which performs strict equality
	   * comparisons of values, i.e. `===`.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {*} value The value to search for.
	   * @param {number} fromIndex The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
	  function strictIndexOf(array, value, fromIndex) {
	    var index = fromIndex - 1,
	        length = array.length;

	    while (++index < length) {
	      if (array[index] === value) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * A specialized version of `_.lastIndexOf` which performs strict equality
	   * comparisons of values, i.e. `===`.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {*} value The value to search for.
	   * @param {number} fromIndex The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
	  function strictLastIndexOf(array, value, fromIndex) {
	    var index = fromIndex + 1;
	    while (index--) {
	      if (array[index] === value) {
	        return index;
	      }
	    }
	    return index;
	  }

	  /**
	   * Gets the number of symbols in `string`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {number} Returns the string size.
	   */
	  function stringSize(string) {
	    return hasUnicode(string)
	      ? unicodeSize(string)
	      : asciiSize(string);
	  }

	  /**
	   * Converts `string` to an array.
	   *
	   * @private
	   * @param {string} string The string to convert.
	   * @returns {Array} Returns the converted array.
	   */
	  function stringToArray(string) {
	    return hasUnicode(string)
	      ? unicodeToArray(string)
	      : asciiToArray(string);
	  }

	  /**
	   * Used by `_.unescape` to convert HTML entities to characters.
	   *
	   * @private
	   * @param {string} chr The matched character to unescape.
	   * @returns {string} Returns the unescaped character.
	   */
	  var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

	  /**
	   * Gets the size of a Unicode `string`.
	   *
	   * @private
	   * @param {string} string The string inspect.
	   * @returns {number} Returns the string size.
	   */
	  function unicodeSize(string) {
	    var result = reUnicode.lastIndex = 0;
	    while (reUnicode.test(string)) {
	      ++result;
	    }
	    return result;
	  }

	  /**
	   * Converts a Unicode `string` to an array.
	   *
	   * @private
	   * @param {string} string The string to convert.
	   * @returns {Array} Returns the converted array.
	   */
	  function unicodeToArray(string) {
	    return string.match(reUnicode) || [];
	  }

	  /**
	   * Splits a Unicode `string` into an array of its words.
	   *
	   * @private
	   * @param {string} The string to inspect.
	   * @returns {Array} Returns the words of `string`.
	   */
	  function unicodeWords(string) {
	    return string.match(reUnicodeWord) || [];
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Create a new pristine `lodash` function using the `context` object.
	   *
	   * @static
	   * @memberOf _
	   * @since 1.1.0
	   * @category Util
	   * @param {Object} [context=root] The context object.
	   * @returns {Function} Returns a new `lodash` function.
	   * @example
	   *
	   * _.mixin({ 'foo': _.constant('foo') });
	   *
	   * var lodash = _.runInContext();
	   * lodash.mixin({ 'bar': lodash.constant('bar') });
	   *
	   * _.isFunction(_.foo);
	   * // => true
	   * _.isFunction(_.bar);
	   * // => false
	   *
	   * lodash.isFunction(lodash.foo);
	   * // => false
	   * lodash.isFunction(lodash.bar);
	   * // => true
	   *
	   * // Create a suped-up `defer` in Node.js.
	   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
	   */
	  var runInContext = (function runInContext(context) {
	    context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

	    /** Built-in constructor references. */
	    var Array = context.Array,
	        Date = context.Date,
	        Error = context.Error,
	        Function = context.Function,
	        Math = context.Math,
	        Object = context.Object,
	        RegExp = context.RegExp,
	        String = context.String,
	        TypeError = context.TypeError;

	    /** Used for built-in method references. */
	    var arrayProto = Array.prototype,
	        funcProto = Function.prototype,
	        objectProto = Object.prototype;

	    /** Used to detect overreaching core-js shims. */
	    var coreJsData = context['__core-js_shared__'];

	    /** Used to resolve the decompiled source of functions. */
	    var funcToString = funcProto.toString;

	    /** Used to check objects for own properties. */
	    var hasOwnProperty = objectProto.hasOwnProperty;

	    /** Used to generate unique IDs. */
	    var idCounter = 0;

	    /** Used to detect methods masquerading as native. */
	    var maskSrcKey = (function() {
	      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	      return uid ? ('Symbol(src)_1.' + uid) : '';
	    }());

	    /**
	     * Used to resolve the
	     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	     * of values.
	     */
	    var nativeObjectToString = objectProto.toString;

	    /** Used to infer the `Object` constructor. */
	    var objectCtorString = funcToString.call(Object);

	    /** Used to restore the original `_` reference in `_.noConflict`. */
	    var oldDash = root._;

	    /** Used to detect if a method is native. */
	    var reIsNative = RegExp('^' +
	      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	    );

	    /** Built-in value references. */
	    var Buffer = moduleExports ? context.Buffer : undefined,
	        Symbol = context.Symbol,
	        Uint8Array = context.Uint8Array,
	        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
	        getPrototype = overArg(Object.getPrototypeOf, Object),
	        objectCreate = Object.create,
	        propertyIsEnumerable = objectProto.propertyIsEnumerable,
	        splice = arrayProto.splice,
	        spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
	        symIterator = Symbol ? Symbol.iterator : undefined,
	        symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	    var defineProperty = (function() {
	      try {
	        var func = getNative(Object, 'defineProperty');
	        func({}, '', {});
	        return func;
	      } catch (e) {}
	    }());

	    /** Mocked built-ins. */
	    var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
	        ctxNow = Date && Date.now !== root.Date.now && Date.now,
	        ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;

	    /* Built-in method references for those with the same name as other `lodash` methods. */
	    var nativeCeil = Math.ceil,
	        nativeFloor = Math.floor,
	        nativeGetSymbols = Object.getOwnPropertySymbols,
	        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
	        nativeIsFinite = context.isFinite,
	        nativeJoin = arrayProto.join,
	        nativeKeys = overArg(Object.keys, Object),
	        nativeMax = Math.max,
	        nativeMin = Math.min,
	        nativeNow = Date.now,
	        nativeParseInt = context.parseInt,
	        nativeRandom = Math.random,
	        nativeReverse = arrayProto.reverse;

	    /* Built-in method references that are verified to be native. */
	    var DataView = getNative(context, 'DataView'),
	        Map = getNative(context, 'Map'),
	        Promise = getNative(context, 'Promise'),
	        Set = getNative(context, 'Set'),
	        WeakMap = getNative(context, 'WeakMap'),
	        nativeCreate = getNative(Object, 'create');

	    /** Used to store function metadata. */
	    var metaMap = WeakMap && new WeakMap;

	    /** Used to lookup unminified function names. */
	    var realNames = {};

	    /** Used to detect maps, sets, and weakmaps. */
	    var dataViewCtorString = toSource(DataView),
	        mapCtorString = toSource(Map),
	        promiseCtorString = toSource(Promise),
	        setCtorString = toSource(Set),
	        weakMapCtorString = toSource(WeakMap);

	    /** Used to convert symbols to primitives and strings. */
	    var symbolProto = Symbol ? Symbol.prototype : undefined,
	        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
	        symbolToString = symbolProto ? symbolProto.toString : undefined;

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a `lodash` object which wraps `value` to enable implicit method
	     * chain sequences. Methods that operate on and return arrays, collections,
	     * and functions can be chained together. Methods that retrieve a single value
	     * or may return a primitive value will automatically end the chain sequence
	     * and return the unwrapped value. Otherwise, the value must be unwrapped
	     * with `_#value`.
	     *
	     * Explicit chain sequences, which must be unwrapped with `_#value`, may be
	     * enabled using `_.chain`.
	     *
	     * The execution of chained methods is lazy, that is, it's deferred until
	     * `_#value` is implicitly or explicitly called.
	     *
	     * Lazy evaluation allows several methods to support shortcut fusion.
	     * Shortcut fusion is an optimization to merge iteratee calls; this avoids
	     * the creation of intermediate arrays and can greatly reduce the number of
	     * iteratee executions. Sections of a chain sequence qualify for shortcut
	     * fusion if the section is applied to an array and iteratees accept only
	     * one argument. The heuristic for whether a section qualifies for shortcut
	     * fusion is subject to change.
	     *
	     * Chaining is supported in custom builds as long as the `_#value` method is
	     * directly or indirectly included in the build.
	     *
	     * In addition to lodash methods, wrappers have `Array` and `String` methods.
	     *
	     * The wrapper `Array` methods are:
	     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	     *
	     * The wrapper `String` methods are:
	     * `replace` and `split`
	     *
	     * The wrapper methods that support shortcut fusion are:
	     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	     *
	     * The chainable wrapper methods are:
	     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
	     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
	     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
	     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
	     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
	     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
	     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
	     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
	     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
	     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
	     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
	     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
	     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
	     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
	     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
	     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
	     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
	     * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
	     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
	     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
	     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
	     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
	     * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
	     * `zipObject`, `zipObjectDeep`, and `zipWith`
	     *
	     * The wrapper methods that are **not** chainable by default are:
	     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
	     * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
	     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
	     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
	     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
	     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
	     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
	     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
	     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
	     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
	     * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
	     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
	     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
	     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
	     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
	     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
	     * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
	     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
	     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
	     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
	     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
	     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
	     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
	     * `upperFirst`, `value`, and `words`
	     *
	     * @name _
	     * @constructor
	     * @category Seq
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var wrapped = _([1, 2, 3]);
	     *
	     * // Returns an unwrapped value.
	     * wrapped.reduce(_.add);
	     * // => 6
	     *
	     * // Returns a wrapped value.
	     * var squares = wrapped.map(square);
	     *
	     * _.isArray(squares);
	     * // => false
	     *
	     * _.isArray(squares.value());
	     * // => true
	     */
	    function lodash(value) {
	      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
	        if (value instanceof LodashWrapper) {
	          return value;
	        }
	        if (hasOwnProperty.call(value, '__wrapped__')) {
	          return wrapperClone(value);
	        }
	      }
	      return new LodashWrapper(value);
	    }

	    /**
	     * The base implementation of `_.create` without support for assigning
	     * properties to the created object.
	     *
	     * @private
	     * @param {Object} proto The object to inherit from.
	     * @returns {Object} Returns the new object.
	     */
	    var baseCreate = (function() {
	      function object() {}
	      return function(proto) {
	        if (!isObject(proto)) {
	          return {};
	        }
	        if (objectCreate) {
	          return objectCreate(proto);
	        }
	        object.prototype = proto;
	        var result = new object;
	        object.prototype = undefined;
	        return result;
	      };
	    }());

	    /**
	     * The function whose prototype chain sequence wrappers inherit from.
	     *
	     * @private
	     */
	    function baseLodash() {
	      // No operation performed.
	    }

	    /**
	     * The base constructor for creating `lodash` wrapper objects.
	     *
	     * @private
	     * @param {*} value The value to wrap.
	     * @param {boolean} [chainAll] Enable explicit method chain sequences.
	     */
	    function LodashWrapper(value, chainAll) {
	      this.__wrapped__ = value;
	      this.__actions__ = [];
	      this.__chain__ = !!chainAll;
	      this.__index__ = 0;
	      this.__values__ = undefined;
	    }

	    /**
	     * By default, the template delimiters used by lodash are like those in
	     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
	     * following template settings to use alternative delimiters.
	     *
	     * @static
	     * @memberOf _
	     * @type {Object}
	     */
	    lodash.templateSettings = {

	      /**
	       * Used to detect `data` property values to be HTML-escaped.
	       *
	       * @memberOf _.templateSettings
	       * @type {RegExp}
	       */
	      'escape': reEscape,

	      /**
	       * Used to detect code to be evaluated.
	       *
	       * @memberOf _.templateSettings
	       * @type {RegExp}
	       */
	      'evaluate': reEvaluate,

	      /**
	       * Used to detect `data` property values to inject.
	       *
	       * @memberOf _.templateSettings
	       * @type {RegExp}
	       */
	      'interpolate': reInterpolate,

	      /**
	       * Used to reference the data object in the template text.
	       *
	       * @memberOf _.templateSettings
	       * @type {string}
	       */
	      'variable': '',

	      /**
	       * Used to import variables into the compiled template.
	       *
	       * @memberOf _.templateSettings
	       * @type {Object}
	       */
	      'imports': {

	        /**
	         * A reference to the `lodash` function.
	         *
	         * @memberOf _.templateSettings.imports
	         * @type {Function}
	         */
	        '_': lodash
	      }
	    };

	    // Ensure wrappers are instances of `baseLodash`.
	    lodash.prototype = baseLodash.prototype;
	    lodash.prototype.constructor = lodash;

	    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
	    LodashWrapper.prototype.constructor = LodashWrapper;

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	     *
	     * @private
	     * @constructor
	     * @param {*} value The value to wrap.
	     */
	    function LazyWrapper(value) {
	      this.__wrapped__ = value;
	      this.__actions__ = [];
	      this.__dir__ = 1;
	      this.__filtered__ = false;
	      this.__iteratees__ = [];
	      this.__takeCount__ = MAX_ARRAY_LENGTH;
	      this.__views__ = [];
	    }

	    /**
	     * Creates a clone of the lazy wrapper object.
	     *
	     * @private
	     * @name clone
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the cloned `LazyWrapper` object.
	     */
	    function lazyClone() {
	      var result = new LazyWrapper(this.__wrapped__);
	      result.__actions__ = copyArray(this.__actions__);
	      result.__dir__ = this.__dir__;
	      result.__filtered__ = this.__filtered__;
	      result.__iteratees__ = copyArray(this.__iteratees__);
	      result.__takeCount__ = this.__takeCount__;
	      result.__views__ = copyArray(this.__views__);
	      return result;
	    }

	    /**
	     * Reverses the direction of lazy iteration.
	     *
	     * @private
	     * @name reverse
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the new reversed `LazyWrapper` object.
	     */
	    function lazyReverse() {
	      if (this.__filtered__) {
	        var result = new LazyWrapper(this);
	        result.__dir__ = -1;
	        result.__filtered__ = true;
	      } else {
	        result = this.clone();
	        result.__dir__ *= -1;
	      }
	      return result;
	    }

	    /**
	     * Extracts the unwrapped value from its lazy wrapper.
	     *
	     * @private
	     * @name value
	     * @memberOf LazyWrapper
	     * @returns {*} Returns the unwrapped value.
	     */
	    function lazyValue() {
	      var array = this.__wrapped__.value(),
	          dir = this.__dir__,
	          isArr = isArray(array),
	          isRight = dir < 0,
	          arrLength = isArr ? array.length : 0,
	          view = getView(0, arrLength, this.__views__),
	          start = view.start,
	          end = view.end,
	          length = end - start,
	          index = isRight ? end : (start - 1),
	          iteratees = this.__iteratees__,
	          iterLength = iteratees.length,
	          resIndex = 0,
	          takeCount = nativeMin(length, this.__takeCount__);

	      if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
	        return baseWrapperValue(array, this.__actions__);
	      }
	      var result = [];

	      outer:
	      while (length-- && resIndex < takeCount) {
	        index += dir;

	        var iterIndex = -1,
	            value = array[index];

	        while (++iterIndex < iterLength) {
	          var data = iteratees[iterIndex],
	              iteratee = data.iteratee,
	              type = data.type,
	              computed = iteratee(value);

	          if (type == LAZY_MAP_FLAG) {
	            value = computed;
	          } else if (!computed) {
	            if (type == LAZY_FILTER_FLAG) {
	              continue outer;
	            } else {
	              break outer;
	            }
	          }
	        }
	        result[resIndex++] = value;
	      }
	      return result;
	    }

	    // Ensure `LazyWrapper` is an instance of `baseLodash`.
	    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
	    LazyWrapper.prototype.constructor = LazyWrapper;

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a hash object.
	     *
	     * @private
	     * @constructor
	     * @param {Array} [entries] The key-value pairs to cache.
	     */
	    function Hash(entries) {
	      var index = -1,
	          length = entries == null ? 0 : entries.length;

	      this.clear();
	      while (++index < length) {
	        var entry = entries[index];
	        this.set(entry[0], entry[1]);
	      }
	    }

	    /**
	     * Removes all key-value entries from the hash.
	     *
	     * @private
	     * @name clear
	     * @memberOf Hash
	     */
	    function hashClear() {
	      this.__data__ = nativeCreate ? nativeCreate(null) : {};
	      this.size = 0;
	    }

	    /**
	     * Removes `key` and its value from the hash.
	     *
	     * @private
	     * @name delete
	     * @memberOf Hash
	     * @param {Object} hash The hash to modify.
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
	    function hashDelete(key) {
	      var result = this.has(key) && delete this.__data__[key];
	      this.size -= result ? 1 : 0;
	      return result;
	    }

	    /**
	     * Gets the hash value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf Hash
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
	    function hashGet(key) {
	      var data = this.__data__;
	      if (nativeCreate) {
	        var result = data[key];
	        return result === HASH_UNDEFINED ? undefined : result;
	      }
	      return hasOwnProperty.call(data, key) ? data[key] : undefined;
	    }

	    /**
	     * Checks if a hash value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf Hash
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
	    function hashHas(key) {
	      var data = this.__data__;
	      return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	    }

	    /**
	     * Sets the hash `key` to `value`.
	     *
	     * @private
	     * @name set
	     * @memberOf Hash
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns the hash instance.
	     */
	    function hashSet(key, value) {
	      var data = this.__data__;
	      this.size += this.has(key) ? 0 : 1;
	      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	      return this;
	    }

	    // Add methods to `Hash`.
	    Hash.prototype.clear = hashClear;
	    Hash.prototype['delete'] = hashDelete;
	    Hash.prototype.get = hashGet;
	    Hash.prototype.has = hashHas;
	    Hash.prototype.set = hashSet;

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates an list cache object.
	     *
	     * @private
	     * @constructor
	     * @param {Array} [entries] The key-value pairs to cache.
	     */
	    function ListCache(entries) {
	      var index = -1,
	          length = entries == null ? 0 : entries.length;

	      this.clear();
	      while (++index < length) {
	        var entry = entries[index];
	        this.set(entry[0], entry[1]);
	      }
	    }

	    /**
	     * Removes all key-value entries from the list cache.
	     *
	     * @private
	     * @name clear
	     * @memberOf ListCache
	     */
	    function listCacheClear() {
	      this.__data__ = [];
	      this.size = 0;
	    }

	    /**
	     * Removes `key` and its value from the list cache.
	     *
	     * @private
	     * @name delete
	     * @memberOf ListCache
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
	    function listCacheDelete(key) {
	      var data = this.__data__,
	          index = assocIndexOf(data, key);

	      if (index < 0) {
	        return false;
	      }
	      var lastIndex = data.length - 1;
	      if (index == lastIndex) {
	        data.pop();
	      } else {
	        splice.call(data, index, 1);
	      }
	      --this.size;
	      return true;
	    }

	    /**
	     * Gets the list cache value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf ListCache
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
	    function listCacheGet(key) {
	      var data = this.__data__,
	          index = assocIndexOf(data, key);

	      return index < 0 ? undefined : data[index][1];
	    }

	    /**
	     * Checks if a list cache value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf ListCache
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
	    function listCacheHas(key) {
	      return assocIndexOf(this.__data__, key) > -1;
	    }

	    /**
	     * Sets the list cache `key` to `value`.
	     *
	     * @private
	     * @name set
	     * @memberOf ListCache
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns the list cache instance.
	     */
	    function listCacheSet(key, value) {
	      var data = this.__data__,
	          index = assocIndexOf(data, key);

	      if (index < 0) {
	        ++this.size;
	        data.push([key, value]);
	      } else {
	        data[index][1] = value;
	      }
	      return this;
	    }

	    // Add methods to `ListCache`.
	    ListCache.prototype.clear = listCacheClear;
	    ListCache.prototype['delete'] = listCacheDelete;
	    ListCache.prototype.get = listCacheGet;
	    ListCache.prototype.has = listCacheHas;
	    ListCache.prototype.set = listCacheSet;

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a map cache object to store key-value pairs.
	     *
	     * @private
	     * @constructor
	     * @param {Array} [entries] The key-value pairs to cache.
	     */
	    function MapCache(entries) {
	      var index = -1,
	          length = entries == null ? 0 : entries.length;

	      this.clear();
	      while (++index < length) {
	        var entry = entries[index];
	        this.set(entry[0], entry[1]);
	      }
	    }

	    /**
	     * Removes all key-value entries from the map.
	     *
	     * @private
	     * @name clear
	     * @memberOf MapCache
	     */
	    function mapCacheClear() {
	      this.size = 0;
	      this.__data__ = {
	        'hash': new Hash,
	        'map': new (Map || ListCache),
	        'string': new Hash
	      };
	    }

	    /**
	     * Removes `key` and its value from the map.
	     *
	     * @private
	     * @name delete
	     * @memberOf MapCache
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
	    function mapCacheDelete(key) {
	      var result = getMapData(this, key)['delete'](key);
	      this.size -= result ? 1 : 0;
	      return result;
	    }

	    /**
	     * Gets the map value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf MapCache
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
	    function mapCacheGet(key) {
	      return getMapData(this, key).get(key);
	    }

	    /**
	     * Checks if a map value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf MapCache
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
	    function mapCacheHas(key) {
	      return getMapData(this, key).has(key);
	    }

	    /**
	     * Sets the map `key` to `value`.
	     *
	     * @private
	     * @name set
	     * @memberOf MapCache
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns the map cache instance.
	     */
	    function mapCacheSet(key, value) {
	      var data = getMapData(this, key),
	          size = data.size;

	      data.set(key, value);
	      this.size += data.size == size ? 0 : 1;
	      return this;
	    }

	    // Add methods to `MapCache`.
	    MapCache.prototype.clear = mapCacheClear;
	    MapCache.prototype['delete'] = mapCacheDelete;
	    MapCache.prototype.get = mapCacheGet;
	    MapCache.prototype.has = mapCacheHas;
	    MapCache.prototype.set = mapCacheSet;

	    /*------------------------------------------------------------------------*/

	    /**
	     *
	     * Creates an array cache object to store unique values.
	     *
	     * @private
	     * @constructor
	     * @param {Array} [values] The values to cache.
	     */
	    function SetCache(values) {
	      var index = -1,
	          length = values == null ? 0 : values.length;

	      this.__data__ = new MapCache;
	      while (++index < length) {
	        this.add(values[index]);
	      }
	    }

	    /**
	     * Adds `value` to the array cache.
	     *
	     * @private
	     * @name add
	     * @memberOf SetCache
	     * @alias push
	     * @param {*} value The value to cache.
	     * @returns {Object} Returns the cache instance.
	     */
	    function setCacheAdd(value) {
	      this.__data__.set(value, HASH_UNDEFINED);
	      return this;
	    }

	    /**
	     * Checks if `value` is in the array cache.
	     *
	     * @private
	     * @name has
	     * @memberOf SetCache
	     * @param {*} value The value to search for.
	     * @returns {number} Returns `true` if `value` is found, else `false`.
	     */
	    function setCacheHas(value) {
	      return this.__data__.has(value);
	    }

	    // Add methods to `SetCache`.
	    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	    SetCache.prototype.has = setCacheHas;

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a stack cache object to store key-value pairs.
	     *
	     * @private
	     * @constructor
	     * @param {Array} [entries] The key-value pairs to cache.
	     */
	    function Stack(entries) {
	      var data = this.__data__ = new ListCache(entries);
	      this.size = data.size;
	    }

	    /**
	     * Removes all key-value entries from the stack.
	     *
	     * @private
	     * @name clear
	     * @memberOf Stack
	     */
	    function stackClear() {
	      this.__data__ = new ListCache;
	      this.size = 0;
	    }

	    /**
	     * Removes `key` and its value from the stack.
	     *
	     * @private
	     * @name delete
	     * @memberOf Stack
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
	    function stackDelete(key) {
	      var data = this.__data__,
	          result = data['delete'](key);

	      this.size = data.size;
	      return result;
	    }

	    /**
	     * Gets the stack value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf Stack
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
	    function stackGet(key) {
	      return this.__data__.get(key);
	    }

	    /**
	     * Checks if a stack value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf Stack
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
	    function stackHas(key) {
	      return this.__data__.has(key);
	    }

	    /**
	     * Sets the stack `key` to `value`.
	     *
	     * @private
	     * @name set
	     * @memberOf Stack
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns the stack cache instance.
	     */
	    function stackSet(key, value) {
	      var data = this.__data__;
	      if (data instanceof ListCache) {
	        var pairs = data.__data__;
	        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	          pairs.push([key, value]);
	          this.size = ++data.size;
	          return this;
	        }
	        data = this.__data__ = new MapCache(pairs);
	      }
	      data.set(key, value);
	      this.size = data.size;
	      return this;
	    }

	    // Add methods to `Stack`.
	    Stack.prototype.clear = stackClear;
	    Stack.prototype['delete'] = stackDelete;
	    Stack.prototype.get = stackGet;
	    Stack.prototype.has = stackHas;
	    Stack.prototype.set = stackSet;

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates an array of the enumerable property names of the array-like `value`.
	     *
	     * @private
	     * @param {*} value The value to query.
	     * @param {boolean} inherited Specify returning inherited property names.
	     * @returns {Array} Returns the array of property names.
	     */
	    function arrayLikeKeys(value, inherited) {
	      var isArr = isArray(value),
	          isArg = !isArr && isArguments(value),
	          isBuff = !isArr && !isArg && isBuffer(value),
	          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	          skipIndexes = isArr || isArg || isBuff || isType,
	          result = skipIndexes ? baseTimes(value.length, String) : [],
	          length = result.length;

	      for (var key in value) {
	        if ((inherited || hasOwnProperty.call(value, key)) &&
	            !(skipIndexes && (
	               // Safari 9 has enumerable `arguments.length` in strict mode.
	               key == 'length' ||
	               // Node.js 0.10 has enumerable non-index properties on buffers.
	               (isBuff && (key == 'offset' || key == 'parent')) ||
	               // PhantomJS 2 has enumerable non-index properties on typed arrays.
	               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	               // Skip index properties.
	               isIndex(key, length)
	            ))) {
	          result.push(key);
	        }
	      }
	      return result;
	    }

	    /**
	     * A specialized version of `_.sample` for arrays.
	     *
	     * @private
	     * @param {Array} array The array to sample.
	     * @returns {*} Returns the random element.
	     */
	    function arraySample(array) {
	      var length = array.length;
	      return length ? array[baseRandom(0, length - 1)] : undefined;
	    }

	    /**
	     * A specialized version of `_.sampleSize` for arrays.
	     *
	     * @private
	     * @param {Array} array The array to sample.
	     * @param {number} n The number of elements to sample.
	     * @returns {Array} Returns the random elements.
	     */
	    function arraySampleSize(array, n) {
	      return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
	    }

	    /**
	     * A specialized version of `_.shuffle` for arrays.
	     *
	     * @private
	     * @param {Array} array The array to shuffle.
	     * @returns {Array} Returns the new shuffled array.
	     */
	    function arrayShuffle(array) {
	      return shuffleSelf(copyArray(array));
	    }

	    /**
	     * This function is like `assignValue` except that it doesn't assign
	     * `undefined` values.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {string} key The key of the property to assign.
	     * @param {*} value The value to assign.
	     */
	    function assignMergeValue(object, key, value) {
	      if ((value !== undefined && !eq(object[key], value)) ||
	          (value === undefined && !(key in object))) {
	        baseAssignValue(object, key, value);
	      }
	    }

	    /**
	     * Assigns `value` to `key` of `object` if the existing value is not equivalent
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {string} key The key of the property to assign.
	     * @param {*} value The value to assign.
	     */
	    function assignValue(object, key, value) {
	      var objValue = object[key];
	      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	          (value === undefined && !(key in object))) {
	        baseAssignValue(object, key, value);
	      }
	    }

	    /**
	     * Gets the index at which the `key` is found in `array` of key-value pairs.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {*} key The key to search for.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     */
	    function assocIndexOf(array, key) {
	      var length = array.length;
	      while (length--) {
	        if (eq(array[length][0], key)) {
	          return length;
	        }
	      }
	      return -1;
	    }

	    /**
	     * Aggregates elements of `collection` on `accumulator` with keys transformed
	     * by `iteratee` and values set by `setter`.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} setter The function to set `accumulator` values.
	     * @param {Function} iteratee The iteratee to transform keys.
	     * @param {Object} accumulator The initial aggregated object.
	     * @returns {Function} Returns `accumulator`.
	     */
	    function baseAggregator(collection, setter, iteratee, accumulator) {
	      baseEach(collection, function(value, key, collection) {
	        setter(accumulator, value, iteratee(value), collection);
	      });
	      return accumulator;
	    }

	    /**
	     * The base implementation of `_.assign` without support for multiple sources
	     * or `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @returns {Object} Returns `object`.
	     */
	    function baseAssign(object, source) {
	      return object && copyObject(source, keys(source), object);
	    }

	    /**
	     * The base implementation of `_.assignIn` without support for multiple sources
	     * or `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @returns {Object} Returns `object`.
	     */
	    function baseAssignIn(object, source) {
	      return object && copyObject(source, keysIn(source), object);
	    }

	    /**
	     * The base implementation of `assignValue` and `assignMergeValue` without
	     * value checks.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {string} key The key of the property to assign.
	     * @param {*} value The value to assign.
	     */
	    function baseAssignValue(object, key, value) {
	      if (key == '__proto__' && defineProperty) {
	        defineProperty(object, key, {
	          'configurable': true,
	          'enumerable': true,
	          'value': value,
	          'writable': true
	        });
	      } else {
	        object[key] = value;
	      }
	    }

	    /**
	     * The base implementation of `_.at` without support for individual paths.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {string[]} paths The property paths to pick.
	     * @returns {Array} Returns the picked elements.
	     */
	    function baseAt(object, paths) {
	      var index = -1,
	          length = paths.length,
	          result = Array(length),
	          skip = object == null;

	      while (++index < length) {
	        result[index] = skip ? undefined : get(object, paths[index]);
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.clamp` which doesn't coerce arguments.
	     *
	     * @private
	     * @param {number} number The number to clamp.
	     * @param {number} [lower] The lower bound.
	     * @param {number} upper The upper bound.
	     * @returns {number} Returns the clamped number.
	     */
	    function baseClamp(number, lower, upper) {
	      if (number === number) {
	        if (upper !== undefined) {
	          number = number <= upper ? number : upper;
	        }
	        if (lower !== undefined) {
	          number = number >= lower ? number : lower;
	        }
	      }
	      return number;
	    }

	    /**
	     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	     * traversed objects.
	     *
	     * @private
	     * @param {*} value The value to clone.
	     * @param {boolean} bitmask The bitmask flags.
	     *  1 - Deep clone
	     *  2 - Flatten inherited properties
	     *  4 - Clone symbols
	     * @param {Function} [customizer] The function to customize cloning.
	     * @param {string} [key] The key of `value`.
	     * @param {Object} [object] The parent object of `value`.
	     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	     * @returns {*} Returns the cloned value.
	     */
	    function baseClone(value, bitmask, customizer, key, object, stack) {
	      var result,
	          isDeep = bitmask & CLONE_DEEP_FLAG,
	          isFlat = bitmask & CLONE_FLAT_FLAG,
	          isFull = bitmask & CLONE_SYMBOLS_FLAG;

	      if (customizer) {
	        result = object ? customizer(value, key, object, stack) : customizer(value);
	      }
	      if (result !== undefined) {
	        return result;
	      }
	      if (!isObject(value)) {
	        return value;
	      }
	      var isArr = isArray(value);
	      if (isArr) {
	        result = initCloneArray(value);
	        if (!isDeep) {
	          return copyArray(value, result);
	        }
	      } else {
	        var tag = getTag(value),
	            isFunc = tag == funcTag || tag == genTag;

	        if (isBuffer(value)) {
	          return cloneBuffer(value, isDeep);
	        }
	        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	          result = (isFlat || isFunc) ? {} : initCloneObject(value);
	          if (!isDeep) {
	            return isFlat
	              ? copySymbolsIn(value, baseAssignIn(result, value))
	              : copySymbols(value, baseAssign(result, value));
	          }
	        } else {
	          if (!cloneableTags[tag]) {
	            return object ? value : {};
	          }
	          result = initCloneByTag(value, tag, baseClone, isDeep);
	        }
	      }
	      // Check for circular references and return its corresponding clone.
	      stack || (stack = new Stack);
	      var stacked = stack.get(value);
	      if (stacked) {
	        return stacked;
	      }
	      stack.set(value, result);

	      var keysFunc = isFull
	        ? (isFlat ? getAllKeysIn : getAllKeys)
	        : (isFlat ? keysIn : keys);

	      var props = isArr ? undefined : keysFunc(value);
	      arrayEach(props || value, function(subValue, key) {
	        if (props) {
	          key = subValue;
	          subValue = value[key];
	        }
	        // Recursively populate clone (susceptible to call stack limits).
	        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.conforms` which doesn't clone `source`.
	     *
	     * @private
	     * @param {Object} source The object of property predicates to conform to.
	     * @returns {Function} Returns the new spec function.
	     */
	    function baseConforms(source) {
	      var props = keys(source);
	      return function(object) {
	        return baseConformsTo(object, source, props);
	      };
	    }

	    /**
	     * The base implementation of `_.conformsTo` which accepts `props` to check.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property predicates to conform to.
	     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
	     */
	    function baseConformsTo(object, source, props) {
	      var length = props.length;
	      if (object == null) {
	        return !length;
	      }
	      object = Object(object);
	      while (length--) {
	        var key = props[length],
	            predicate = source[key],
	            value = object[key];

	        if ((value === undefined && !(key in object)) || !predicate(value)) {
	          return false;
	        }
	      }
	      return true;
	    }

	    /**
	     * The base implementation of `_.delay` and `_.defer` which accepts `args`
	     * to provide to `func`.
	     *
	     * @private
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @param {Array} args The arguments to provide to `func`.
	     * @returns {number|Object} Returns the timer id or timeout object.
	     */
	    function baseDelay(func, wait, args) {
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      return setTimeout(function() { func.apply(undefined, args); }, wait);
	    }

	    /**
	     * The base implementation of methods like `_.difference` without support
	     * for excluding multiple arrays or iteratee shorthands.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Array} values The values to exclude.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new array of filtered values.
	     */
	    function baseDifference(array, values, iteratee, comparator) {
	      var index = -1,
	          includes = arrayIncludes,
	          isCommon = true,
	          length = array.length,
	          result = [],
	          valuesLength = values.length;

	      if (!length) {
	        return result;
	      }
	      if (iteratee) {
	        values = arrayMap(values, baseUnary(iteratee));
	      }
	      if (comparator) {
	        includes = arrayIncludesWith;
	        isCommon = false;
	      }
	      else if (values.length >= LARGE_ARRAY_SIZE) {
	        includes = cacheHas;
	        isCommon = false;
	        values = new SetCache(values);
	      }
	      outer:
	      while (++index < length) {
	        var value = array[index],
	            computed = iteratee == null ? value : iteratee(value);

	        value = (comparator || value !== 0) ? value : 0;
	        if (isCommon && computed === computed) {
	          var valuesIndex = valuesLength;
	          while (valuesIndex--) {
	            if (values[valuesIndex] === computed) {
	              continue outer;
	            }
	          }
	          result.push(value);
	        }
	        else if (!includes(values, computed, comparator)) {
	          result.push(value);
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.forEach` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array|Object} Returns `collection`.
	     */
	    var baseEach = createBaseEach(baseForOwn);

	    /**
	     * The base implementation of `_.forEachRight` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array|Object} Returns `collection`.
	     */
	    var baseEachRight = createBaseEach(baseForOwnRight, true);

	    /**
	     * The base implementation of `_.every` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`
	     */
	    function baseEvery(collection, predicate) {
	      var result = true;
	      baseEach(collection, function(value, index, collection) {
	        result = !!predicate(value, index, collection);
	        return result;
	      });
	      return result;
	    }

	    /**
	     * The base implementation of methods like `_.max` and `_.min` which accepts a
	     * `comparator` to determine the extremum value.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The iteratee invoked per iteration.
	     * @param {Function} comparator The comparator used to compare values.
	     * @returns {*} Returns the extremum value.
	     */
	    function baseExtremum(array, iteratee, comparator) {
	      var index = -1,
	          length = array.length;

	      while (++index < length) {
	        var value = array[index],
	            current = iteratee(value);

	        if (current != null && (computed === undefined
	              ? (current === current && !isSymbol(current))
	              : comparator(current, computed)
	            )) {
	          var computed = current,
	              result = value;
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.fill` without an iteratee call guard.
	     *
	     * @private
	     * @param {Array} array The array to fill.
	     * @param {*} value The value to fill `array` with.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns `array`.
	     */
	    function baseFill(array, value, start, end) {
	      var length = array.length;

	      start = toInteger(start);
	      if (start < 0) {
	        start = -start > length ? 0 : (length + start);
	      }
	      end = (end === undefined || end > length) ? length : toInteger(end);
	      if (end < 0) {
	        end += length;
	      }
	      end = start > end ? 0 : toLength(end);
	      while (start < end) {
	        array[start++] = value;
	      }
	      return array;
	    }

	    /**
	     * The base implementation of `_.filter` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     */
	    function baseFilter(collection, predicate) {
	      var result = [];
	      baseEach(collection, function(value, index, collection) {
	        if (predicate(value, index, collection)) {
	          result.push(value);
	        }
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.flatten` with support for restricting flattening.
	     *
	     * @private
	     * @param {Array} array The array to flatten.
	     * @param {number} depth The maximum recursion depth.
	     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	     * @param {Array} [result=[]] The initial result value.
	     * @returns {Array} Returns the new flattened array.
	     */
	    function baseFlatten(array, depth, predicate, isStrict, result) {
	      var index = -1,
	          length = array.length;

	      predicate || (predicate = isFlattenable);
	      result || (result = []);

	      while (++index < length) {
	        var value = array[index];
	        if (depth > 0 && predicate(value)) {
	          if (depth > 1) {
	            // Recursively flatten arrays (susceptible to call stack limits).
	            baseFlatten(value, depth - 1, predicate, isStrict, result);
	          } else {
	            arrayPush(result, value);
	          }
	        } else if (!isStrict) {
	          result[result.length] = value;
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `baseForOwn` which iterates over `object`
	     * properties returned by `keysFunc` and invokes `iteratee` for each property.
	     * Iteratee functions may exit iteration early by explicitly returning `false`.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @returns {Object} Returns `object`.
	     */
	    var baseFor = createBaseFor();

	    /**
	     * This function is like `baseFor` except that it iterates over properties
	     * in the opposite order.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @returns {Object} Returns `object`.
	     */
	    var baseForRight = createBaseFor(true);

	    /**
	     * The base implementation of `_.forOwn` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
	    function baseForOwn(object, iteratee) {
	      return object && baseFor(object, iteratee, keys);
	    }

	    /**
	     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
	    function baseForOwnRight(object, iteratee) {
	      return object && baseForRight(object, iteratee, keys);
	    }

	    /**
	     * The base implementation of `_.functions` which creates an array of
	     * `object` function property names filtered from `props`.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Array} props The property names to filter.
	     * @returns {Array} Returns the function names.
	     */
	    function baseFunctions(object, props) {
	      return arrayFilter(props, function(key) {
	        return isFunction(object[key]);
	      });
	    }

	    /**
	     * The base implementation of `_.get` without support for default values.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to get.
	     * @returns {*} Returns the resolved value.
	     */
	    function baseGet(object, path) {
	      path = castPath(path, object);

	      var index = 0,
	          length = path.length;

	      while (object != null && index < length) {
	        object = object[toKey(path[index++])];
	      }
	      return (index && index == length) ? object : undefined;
	    }

	    /**
	     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	     * symbols of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @param {Function} symbolsFunc The function to get the symbols of `object`.
	     * @returns {Array} Returns the array of property names and symbols.
	     */
	    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	      var result = keysFunc(object);
	      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	    }

	    /**
	     * The base implementation of `getTag` without fallbacks for buggy environments.
	     *
	     * @private
	     * @param {*} value The value to query.
	     * @returns {string} Returns the `toStringTag`.
	     */
	    function baseGetTag(value) {
	      if (value == null) {
	        return value === undefined ? undefinedTag : nullTag;
	      }
	      return (symToStringTag && symToStringTag in Object(value))
	        ? getRawTag(value)
	        : objectToString(value);
	    }

	    /**
	     * The base implementation of `_.gt` which doesn't coerce arguments.
	     *
	     * @private
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is greater than `other`,
	     *  else `false`.
	     */
	    function baseGt(value, other) {
	      return value > other;
	    }

	    /**
	     * The base implementation of `_.has` without support for deep paths.
	     *
	     * @private
	     * @param {Object} [object] The object to query.
	     * @param {Array|string} key The key to check.
	     * @returns {boolean} Returns `true` if `key` exists, else `false`.
	     */
	    function baseHas(object, key) {
	      return object != null && hasOwnProperty.call(object, key);
	    }

	    /**
	     * The base implementation of `_.hasIn` without support for deep paths.
	     *
	     * @private
	     * @param {Object} [object] The object to query.
	     * @param {Array|string} key The key to check.
	     * @returns {boolean} Returns `true` if `key` exists, else `false`.
	     */
	    function baseHasIn(object, key) {
	      return object != null && key in Object(object);
	    }

	    /**
	     * The base implementation of `_.inRange` which doesn't coerce arguments.
	     *
	     * @private
	     * @param {number} number The number to check.
	     * @param {number} start The start of the range.
	     * @param {number} end The end of the range.
	     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
	     */
	    function baseInRange(number, start, end) {
	      return number >= nativeMin(start, end) && number < nativeMax(start, end);
	    }

	    /**
	     * The base implementation of methods like `_.intersection`, without support
	     * for iteratee shorthands, that accepts an array of arrays to inspect.
	     *
	     * @private
	     * @param {Array} arrays The arrays to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new array of shared values.
	     */
	    function baseIntersection(arrays, iteratee, comparator) {
	      var includes = comparator ? arrayIncludesWith : arrayIncludes,
	          length = arrays[0].length,
	          othLength = arrays.length,
	          othIndex = othLength,
	          caches = Array(othLength),
	          maxLength = Infinity,
	          result = [];

	      while (othIndex--) {
	        var array = arrays[othIndex];
	        if (othIndex && iteratee) {
	          array = arrayMap(array, baseUnary(iteratee));
	        }
	        maxLength = nativeMin(array.length, maxLength);
	        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
	          ? new SetCache(othIndex && array)
	          : undefined;
	      }
	      array = arrays[0];

	      var index = -1,
	          seen = caches[0];

	      outer:
	      while (++index < length && result.length < maxLength) {
	        var value = array[index],
	            computed = iteratee ? iteratee(value) : value;

	        value = (comparator || value !== 0) ? value : 0;
	        if (!(seen
	              ? cacheHas(seen, computed)
	              : includes(result, computed, comparator)
	            )) {
	          othIndex = othLength;
	          while (--othIndex) {
	            var cache = caches[othIndex];
	            if (!(cache
	                  ? cacheHas(cache, computed)
	                  : includes(arrays[othIndex], computed, comparator))
	                ) {
	              continue outer;
	            }
	          }
	          if (seen) {
	            seen.push(computed);
	          }
	          result.push(value);
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.invert` and `_.invertBy` which inverts
	     * `object` with values transformed by `iteratee` and set by `setter`.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} setter The function to set `accumulator` values.
	     * @param {Function} iteratee The iteratee to transform values.
	     * @param {Object} accumulator The initial inverted object.
	     * @returns {Function} Returns `accumulator`.
	     */
	    function baseInverter(object, setter, iteratee, accumulator) {
	      baseForOwn(object, function(value, key, object) {
	        setter(accumulator, iteratee(value), key, object);
	      });
	      return accumulator;
	    }

	    /**
	     * The base implementation of `_.invoke` without support for individual
	     * method arguments.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the method to invoke.
	     * @param {Array} args The arguments to invoke the method with.
	     * @returns {*} Returns the result of the invoked method.
	     */
	    function baseInvoke(object, path, args) {
	      path = castPath(path, object);
	      object = parent(object, path);
	      var func = object == null ? object : object[toKey(last(path))];
	      return func == null ? undefined : apply(func, object, args);
	    }

	    /**
	     * The base implementation of `_.isArguments`.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	     */
	    function baseIsArguments(value) {
	      return isObjectLike(value) && baseGetTag(value) == argsTag;
	    }

	    /**
	     * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
	     */
	    function baseIsArrayBuffer(value) {
	      return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
	    }

	    /**
	     * The base implementation of `_.isDate` without Node.js optimizations.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
	     */
	    function baseIsDate(value) {
	      return isObjectLike(value) && baseGetTag(value) == dateTag;
	    }

	    /**
	     * The base implementation of `_.isEqual` which supports partial comparisons
	     * and tracks traversed objects.
	     *
	     * @private
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {boolean} bitmask The bitmask flags.
	     *  1 - Unordered comparison
	     *  2 - Partial comparison
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     */
	    function baseIsEqual(value, other, bitmask, customizer, stack) {
	      if (value === other) {
	        return true;
	      }
	      if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
	        return value !== value && other !== other;
	      }
	      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	    }

	    /**
	     * A specialized version of `baseIsEqual` for arrays and objects which performs
	     * deep comparisons and tracks traversed objects enabling objects with circular
	     * references to be compared.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	     * @param {Function} customizer The function to customize comparisons.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	      var objIsArr = isArray(object),
	          othIsArr = isArray(other),
	          objTag = objIsArr ? arrayTag : getTag(object),
	          othTag = othIsArr ? arrayTag : getTag(other);

	      objTag = objTag == argsTag ? objectTag : objTag;
	      othTag = othTag == argsTag ? objectTag : othTag;

	      var objIsObj = objTag == objectTag,
	          othIsObj = othTag == objectTag,
	          isSameTag = objTag == othTag;

	      if (isSameTag && isBuffer(object)) {
	        if (!isBuffer(other)) {
	          return false;
	        }
	        objIsArr = true;
	        objIsObj = false;
	      }
	      if (isSameTag && !objIsObj) {
	        stack || (stack = new Stack);
	        return (objIsArr || isTypedArray(object))
	          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	      }
	      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	        if (objIsWrapped || othIsWrapped) {
	          var objUnwrapped = objIsWrapped ? object.value() : object,
	              othUnwrapped = othIsWrapped ? other.value() : other;

	          stack || (stack = new Stack);
	          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	        }
	      }
	      if (!isSameTag) {
	        return false;
	      }
	      stack || (stack = new Stack);
	      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	    }

	    /**
	     * The base implementation of `_.isMap` without Node.js optimizations.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	     */
	    function baseIsMap(value) {
	      return isObjectLike(value) && getTag(value) == mapTag;
	    }

	    /**
	     * The base implementation of `_.isMatch` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @param {Array} matchData The property names, values, and compare flags to match.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     */
	    function baseIsMatch(object, source, matchData, customizer) {
	      var index = matchData.length,
	          length = index,
	          noCustomizer = !customizer;

	      if (object == null) {
	        return !length;
	      }
	      object = Object(object);
	      while (index--) {
	        var data = matchData[index];
	        if ((noCustomizer && data[2])
	              ? data[1] !== object[data[0]]
	              : !(data[0] in object)
	            ) {
	          return false;
	        }
	      }
	      while (++index < length) {
	        data = matchData[index];
	        var key = data[0],
	            objValue = object[key],
	            srcValue = data[1];

	        if (noCustomizer && data[2]) {
	          if (objValue === undefined && !(key in object)) {
	            return false;
	          }
	        } else {
	          var stack = new Stack;
	          if (customizer) {
	            var result = customizer(objValue, srcValue, key, object, source, stack);
	          }
	          if (!(result === undefined
	                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
	                : result
	              )) {
	            return false;
	          }
	        }
	      }
	      return true;
	    }

	    /**
	     * The base implementation of `_.isNative` without bad shim checks.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a native function,
	     *  else `false`.
	     */
	    function baseIsNative(value) {
	      if (!isObject(value) || isMasked(value)) {
	        return false;
	      }
	      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	      return pattern.test(toSource(value));
	    }

	    /**
	     * The base implementation of `_.isRegExp` without Node.js optimizations.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
	     */
	    function baseIsRegExp(value) {
	      return isObjectLike(value) && baseGetTag(value) == regexpTag;
	    }

	    /**
	     * The base implementation of `_.isSet` without Node.js optimizations.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	     */
	    function baseIsSet(value) {
	      return isObjectLike(value) && getTag(value) == setTag;
	    }

	    /**
	     * The base implementation of `_.isTypedArray` without Node.js optimizations.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	     */
	    function baseIsTypedArray(value) {
	      return isObjectLike(value) &&
	        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	    }

	    /**
	     * The base implementation of `_.iteratee`.
	     *
	     * @private
	     * @param {*} [value=_.identity] The value to convert to an iteratee.
	     * @returns {Function} Returns the iteratee.
	     */
	    function baseIteratee(value) {
	      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	      if (typeof value == 'function') {
	        return value;
	      }
	      if (value == null) {
	        return identity;
	      }
	      if (typeof value == 'object') {
	        return isArray(value)
	          ? baseMatchesProperty(value[0], value[1])
	          : baseMatches(value);
	      }
	      return property(value);
	    }

	    /**
	     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     */
	    function baseKeys(object) {
	      if (!isPrototype(object)) {
	        return nativeKeys(object);
	      }
	      var result = [];
	      for (var key in Object(object)) {
	        if (hasOwnProperty.call(object, key) && key != 'constructor') {
	          result.push(key);
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     */
	    function baseKeysIn(object) {
	      if (!isObject(object)) {
	        return nativeKeysIn(object);
	      }
	      var isProto = isPrototype(object),
	          result = [];

	      for (var key in object) {
	        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	          result.push(key);
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.lt` which doesn't coerce arguments.
	     *
	     * @private
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is less than `other`,
	     *  else `false`.
	     */
	    function baseLt(value, other) {
	      return value < other;
	    }

	    /**
	     * The base implementation of `_.map` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     */
	    function baseMap(collection, iteratee) {
	      var index = -1,
	          result = isArrayLike(collection) ? Array(collection.length) : [];

	      baseEach(collection, function(value, key, collection) {
	        result[++index] = iteratee(value, key, collection);
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.matches` which doesn't clone `source`.
	     *
	     * @private
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new spec function.
	     */
	    function baseMatches(source) {
	      var matchData = getMatchData(source);
	      if (matchData.length == 1 && matchData[0][2]) {
	        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	      }
	      return function(object) {
	        return object === source || baseIsMatch(object, source, matchData);
	      };
	    }

	    /**
	     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	     *
	     * @private
	     * @param {string} path The path of the property to get.
	     * @param {*} srcValue The value to match.
	     * @returns {Function} Returns the new spec function.
	     */
	    function baseMatchesProperty(path, srcValue) {
	      if (isKey(path) && isStrictComparable(srcValue)) {
	        return matchesStrictComparable(toKey(path), srcValue);
	      }
	      return function(object) {
	        var objValue = get(object, path);
	        return (objValue === undefined && objValue === srcValue)
	          ? hasIn(object, path)
	          : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	      };
	    }

	    /**
	     * The base implementation of `_.merge` without support for multiple sources.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {number} srcIndex The index of `source`.
	     * @param {Function} [customizer] The function to customize merged values.
	     * @param {Object} [stack] Tracks traversed source values and their merged
	     *  counterparts.
	     */
	    function baseMerge(object, source, srcIndex, customizer, stack) {
	      if (object === source) {
	        return;
	      }
	      baseFor(source, function(srcValue, key) {
	        if (isObject(srcValue)) {
	          stack || (stack = new Stack);
	          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	        }
	        else {
	          var newValue = customizer
	            ? customizer(object[key], srcValue, (key + ''), object, source, stack)
	            : undefined;

	          if (newValue === undefined) {
	            newValue = srcValue;
	          }
	          assignMergeValue(object, key, newValue);
	        }
	      }, keysIn);
	    }

	    /**
	     * A specialized version of `baseMerge` for arrays and objects which performs
	     * deep merges and tracks traversed objects enabling objects with circular
	     * references to be merged.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {string} key The key of the value to merge.
	     * @param {number} srcIndex The index of `source`.
	     * @param {Function} mergeFunc The function to merge values.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @param {Object} [stack] Tracks traversed source values and their merged
	     *  counterparts.
	     */
	    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	      var objValue = object[key],
	          srcValue = source[key],
	          stacked = stack.get(srcValue);

	      if (stacked) {
	        assignMergeValue(object, key, stacked);
	        return;
	      }
	      var newValue = customizer
	        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	        : undefined;

	      var isCommon = newValue === undefined;

	      if (isCommon) {
	        var isArr = isArray(srcValue),
	            isBuff = !isArr && isBuffer(srcValue),
	            isTyped = !isArr && !isBuff && isTypedArray(srcValue);

	        newValue = srcValue;
	        if (isArr || isBuff || isTyped) {
	          if (isArray(objValue)) {
	            newValue = objValue;
	          }
	          else if (isArrayLikeObject(objValue)) {
	            newValue = copyArray(objValue);
	          }
	          else if (isBuff) {
	            isCommon = false;
	            newValue = cloneBuffer(srcValue, true);
	          }
	          else if (isTyped) {
	            isCommon = false;
	            newValue = cloneTypedArray(srcValue, true);
	          }
	          else {
	            newValue = [];
	          }
	        }
	        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	          newValue = objValue;
	          if (isArguments(objValue)) {
	            newValue = toPlainObject(objValue);
	          }
	          else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	            newValue = initCloneObject(srcValue);
	          }
	        }
	        else {
	          isCommon = false;
	        }
	      }
	      if (isCommon) {
	        // Recursively merge objects and arrays (susceptible to call stack limits).
	        stack.set(srcValue, newValue);
	        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	        stack['delete'](srcValue);
	      }
	      assignMergeValue(object, key, newValue);
	    }

	    /**
	     * The base implementation of `_.nth` which doesn't coerce arguments.
	     *
	     * @private
	     * @param {Array} array The array to query.
	     * @param {number} n The index of the element to return.
	     * @returns {*} Returns the nth element of `array`.
	     */
	    function baseNth(array, n) {
	      var length = array.length;
	      if (!length) {
	        return;
	      }
	      n += n < 0 ? length : 0;
	      return isIndex(n, length) ? array[n] : undefined;
	    }

	    /**
	     * The base implementation of `_.orderBy` without param guards.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	     * @param {string[]} orders The sort orders of `iteratees`.
	     * @returns {Array} Returns the new sorted array.
	     */
	    function baseOrderBy(collection, iteratees, orders) {
	      var index = -1;
	      iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(getIteratee()));

	      var result = baseMap(collection, function(value, key, collection) {
	        var criteria = arrayMap(iteratees, function(iteratee) {
	          return iteratee(value);
	        });
	        return { 'criteria': criteria, 'index': ++index, 'value': value };
	      });

	      return baseSortBy(result, function(object, other) {
	        return compareMultiple(object, other, orders);
	      });
	    }

	    /**
	     * The base implementation of `_.pick` without support for individual
	     * property identifiers.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {string[]} paths The property paths to pick.
	     * @returns {Object} Returns the new object.
	     */
	    function basePick(object, paths) {
	      return basePickBy(object, paths, function(value, path) {
	        return hasIn(object, path);
	      });
	    }

	    /**
	     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {string[]} paths The property paths to pick.
	     * @param {Function} predicate The function invoked per property.
	     * @returns {Object} Returns the new object.
	     */
	    function basePickBy(object, paths, predicate) {
	      var index = -1,
	          length = paths.length,
	          result = {};

	      while (++index < length) {
	        var path = paths[index],
	            value = baseGet(object, path);

	        if (predicate(value, path)) {
	          baseSet(result, castPath(path, object), value);
	        }
	      }
	      return result;
	    }

	    /**
	     * A specialized version of `baseProperty` which supports deep paths.
	     *
	     * @private
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new accessor function.
	     */
	    function basePropertyDeep(path) {
	      return function(object) {
	        return baseGet(object, path);
	      };
	    }

	    /**
	     * The base implementation of `_.pullAllBy` without support for iteratee
	     * shorthands.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to remove.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns `array`.
	     */
	    function basePullAll(array, values, iteratee, comparator) {
	      var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
	          index = -1,
	          length = values.length,
	          seen = array;

	      if (array === values) {
	        values = copyArray(values);
	      }
	      if (iteratee) {
	        seen = arrayMap(array, baseUnary(iteratee));
	      }
	      while (++index < length) {
	        var fromIndex = 0,
	            value = values[index],
	            computed = iteratee ? iteratee(value) : value;

	        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
	          if (seen !== array) {
	            splice.call(seen, fromIndex, 1);
	          }
	          splice.call(array, fromIndex, 1);
	        }
	      }
	      return array;
	    }

	    /**
	     * The base implementation of `_.pullAt` without support for individual
	     * indexes or capturing the removed elements.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {number[]} indexes The indexes of elements to remove.
	     * @returns {Array} Returns `array`.
	     */
	    function basePullAt(array, indexes) {
	      var length = array ? indexes.length : 0,
	          lastIndex = length - 1;

	      while (length--) {
	        var index = indexes[length];
	        if (length == lastIndex || index !== previous) {
	          var previous = index;
	          if (isIndex(index)) {
	            splice.call(array, index, 1);
	          } else {
	            baseUnset(array, index);
	          }
	        }
	      }
	      return array;
	    }

	    /**
	     * The base implementation of `_.random` without support for returning
	     * floating-point numbers.
	     *
	     * @private
	     * @param {number} lower The lower bound.
	     * @param {number} upper The upper bound.
	     * @returns {number} Returns the random number.
	     */
	    function baseRandom(lower, upper) {
	      return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
	    }

	    /**
	     * The base implementation of `_.range` and `_.rangeRight` which doesn't
	     * coerce arguments.
	     *
	     * @private
	     * @param {number} start The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} step The value to increment or decrement by.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Array} Returns the range of numbers.
	     */
	    function baseRange(start, end, step, fromRight) {
	      var index = -1,
	          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	          result = Array(length);

	      while (length--) {
	        result[fromRight ? length : ++index] = start;
	        start += step;
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.repeat` which doesn't coerce arguments.
	     *
	     * @private
	     * @param {string} string The string to repeat.
	     * @param {number} n The number of times to repeat the string.
	     * @returns {string} Returns the repeated string.
	     */
	    function baseRepeat(string, n) {
	      var result = '';
	      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
	        return result;
	      }
	      // Leverage the exponentiation by squaring algorithm for a faster repeat.
	      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
	      do {
	        if (n % 2) {
	          result += string;
	        }
	        n = nativeFloor(n / 2);
	        if (n) {
	          string += string;
	        }
	      } while (n);

	      return result;
	    }

	    /**
	     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	     *
	     * @private
	     * @param {Function} func The function to apply a rest parameter to.
	     * @param {number} [start=func.length-1] The start position of the rest parameter.
	     * @returns {Function} Returns the new function.
	     */
	    function baseRest(func, start) {
	      return setToString(overRest(func, start, identity), func + '');
	    }

	    /**
	     * The base implementation of `_.sample`.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to sample.
	     * @returns {*} Returns the random element.
	     */
	    function baseSample(collection) {
	      return arraySample(values(collection));
	    }

	    /**
	     * The base implementation of `_.sampleSize` without param guards.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to sample.
	     * @param {number} n The number of elements to sample.
	     * @returns {Array} Returns the random elements.
	     */
	    function baseSampleSize(collection, n) {
	      var array = values(collection);
	      return shuffleSelf(array, baseClamp(n, 0, array.length));
	    }

	    /**
	     * The base implementation of `_.set`.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to set.
	     * @param {*} value The value to set.
	     * @param {Function} [customizer] The function to customize path creation.
	     * @returns {Object} Returns `object`.
	     */
	    function baseSet(object, path, value, customizer) {
	      if (!isObject(object)) {
	        return object;
	      }
	      path = castPath(path, object);

	      var index = -1,
	          length = path.length,
	          lastIndex = length - 1,
	          nested = object;

	      while (nested != null && ++index < length) {
	        var key = toKey(path[index]),
	            newValue = value;

	        if (index != lastIndex) {
	          var objValue = nested[key];
	          newValue = customizer ? customizer(objValue, key, nested) : undefined;
	          if (newValue === undefined) {
	            newValue = isObject(objValue)
	              ? objValue
	              : (isIndex(path[index + 1]) ? [] : {});
	          }
	        }
	        assignValue(nested, key, newValue);
	        nested = nested[key];
	      }
	      return object;
	    }

	    /**
	     * The base implementation of `setData` without support for hot loop shorting.
	     *
	     * @private
	     * @param {Function} func The function to associate metadata with.
	     * @param {*} data The metadata.
	     * @returns {Function} Returns `func`.
	     */
	    var baseSetData = !metaMap ? identity : function(func, data) {
	      metaMap.set(func, data);
	      return func;
	    };

	    /**
	     * The base implementation of `setToString` without support for hot loop shorting.
	     *
	     * @private
	     * @param {Function} func The function to modify.
	     * @param {Function} string The `toString` result.
	     * @returns {Function} Returns `func`.
	     */
	    var baseSetToString = !defineProperty ? identity : function(func, string) {
	      return defineProperty(func, 'toString', {
	        'configurable': true,
	        'enumerable': false,
	        'value': constant(string),
	        'writable': true
	      });
	    };

	    /**
	     * The base implementation of `_.shuffle`.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to shuffle.
	     * @returns {Array} Returns the new shuffled array.
	     */
	    function baseShuffle(collection) {
	      return shuffleSelf(values(collection));
	    }

	    /**
	     * The base implementation of `_.slice` without an iteratee call guard.
	     *
	     * @private
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */
	    function baseSlice(array, start, end) {
	      var index = -1,
	          length = array.length;

	      if (start < 0) {
	        start = -start > length ? 0 : (length + start);
	      }
	      end = end > length ? length : end;
	      if (end < 0) {
	        end += length;
	      }
	      length = start > end ? 0 : ((end - start) >>> 0);
	      start >>>= 0;

	      var result = Array(length);
	      while (++index < length) {
	        result[index] = array[index + start];
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.some` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     */
	    function baseSome(collection, predicate) {
	      var result;

	      baseEach(collection, function(value, index, collection) {
	        result = predicate(value, index, collection);
	        return !result;
	      });
	      return !!result;
	    }

	    /**
	     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
	     * performs a binary search of `array` to determine the index at which `value`
	     * should be inserted into `array` in order to maintain its sort order.
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */
	    function baseSortedIndex(array, value, retHighest) {
	      var low = 0,
	          high = array == null ? low : array.length;

	      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
	        while (low < high) {
	          var mid = (low + high) >>> 1,
	              computed = array[mid];

	          if (computed !== null && !isSymbol(computed) &&
	              (retHighest ? (computed <= value) : (computed < value))) {
	            low = mid + 1;
	          } else {
	            high = mid;
	          }
	        }
	        return high;
	      }
	      return baseSortedIndexBy(array, value, identity, retHighest);
	    }

	    /**
	     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
	     * which invokes `iteratee` for `value` and each element of `array` to compute
	     * their sort ranking. The iteratee is invoked with one argument; (value).
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function} iteratee The iteratee invoked per element.
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */
	    function baseSortedIndexBy(array, value, iteratee, retHighest) {
	      value = iteratee(value);

	      var low = 0,
	          high = array == null ? 0 : array.length,
	          valIsNaN = value !== value,
	          valIsNull = value === null,
	          valIsSymbol = isSymbol(value),
	          valIsUndefined = value === undefined;

	      while (low < high) {
	        var mid = nativeFloor((low + high) / 2),
	            computed = iteratee(array[mid]),
	            othIsDefined = computed !== undefined,
	            othIsNull = computed === null,
	            othIsReflexive = computed === computed,
	            othIsSymbol = isSymbol(computed);

	        if (valIsNaN) {
	          var setLow = retHighest || othIsReflexive;
	        } else if (valIsUndefined) {
	          setLow = othIsReflexive && (retHighest || othIsDefined);
	        } else if (valIsNull) {
	          setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
	        } else if (valIsSymbol) {
	          setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
	        } else if (othIsNull || othIsSymbol) {
	          setLow = false;
	        } else {
	          setLow = retHighest ? (computed <= value) : (computed < value);
	        }
	        if (setLow) {
	          low = mid + 1;
	        } else {
	          high = mid;
	        }
	      }
	      return nativeMin(high, MAX_ARRAY_INDEX);
	    }

	    /**
	     * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
	     * support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     */
	    function baseSortedUniq(array, iteratee) {
	      var index = -1,
	          length = array.length,
	          resIndex = 0,
	          result = [];

	      while (++index < length) {
	        var value = array[index],
	            computed = iteratee ? iteratee(value) : value;

	        if (!index || !eq(computed, seen)) {
	          var seen = computed;
	          result[resIndex++] = value === 0 ? 0 : value;
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.toNumber` which doesn't ensure correct
	     * conversions of binary, hexadecimal, or octal string values.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {number} Returns the number.
	     */
	    function baseToNumber(value) {
	      if (typeof value == 'number') {
	        return value;
	      }
	      if (isSymbol(value)) {
	        return NAN;
	      }
	      return +value;
	    }

	    /**
	     * The base implementation of `_.toString` which doesn't convert nullish
	     * values to empty strings.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {string} Returns the string.
	     */
	    function baseToString(value) {
	      // Exit early for strings to avoid a performance hit in some environments.
	      if (typeof value == 'string') {
	        return value;
	      }
	      if (isArray(value)) {
	        // Recursively convert values (susceptible to call stack limits).
	        return arrayMap(value, baseToString) + '';
	      }
	      if (isSymbol(value)) {
	        return symbolToString ? symbolToString.call(value) : '';
	      }
	      var result = (value + '');
	      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	    }

	    /**
	     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     */
	    function baseUniq(array, iteratee, comparator) {
	      var index = -1,
	          includes = arrayIncludes,
	          length = array.length,
	          isCommon = true,
	          result = [],
	          seen = result;

	      if (comparator) {
	        isCommon = false;
	        includes = arrayIncludesWith;
	      }
	      else if (length >= LARGE_ARRAY_SIZE) {
	        var set = iteratee ? null : createSet(array);
	        if (set) {
	          return setToArray(set);
	        }
	        isCommon = false;
	        includes = cacheHas;
	        seen = new SetCache;
	      }
	      else {
	        seen = iteratee ? [] : result;
	      }
	      outer:
	      while (++index < length) {
	        var value = array[index],
	            computed = iteratee ? iteratee(value) : value;

	        value = (comparator || value !== 0) ? value : 0;
	        if (isCommon && computed === computed) {
	          var seenIndex = seen.length;
	          while (seenIndex--) {
	            if (seen[seenIndex] === computed) {
	              continue outer;
	            }
	          }
	          if (iteratee) {
	            seen.push(computed);
	          }
	          result.push(value);
	        }
	        else if (!includes(seen, computed, comparator)) {
	          if (seen !== result) {
	            seen.push(computed);
	          }
	          result.push(value);
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.unset`.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The property path to unset.
	     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
	     */
	    function baseUnset(object, path) {
	      path = castPath(path, object);
	      object = parent(object, path);
	      return object == null || delete object[toKey(last(path))];
	    }

	    /**
	     * The base implementation of `_.update`.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to update.
	     * @param {Function} updater The function to produce the updated value.
	     * @param {Function} [customizer] The function to customize path creation.
	     * @returns {Object} Returns `object`.
	     */
	    function baseUpdate(object, path, updater, customizer) {
	      return baseSet(object, path, updater(baseGet(object, path)), customizer);
	    }

	    /**
	     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
	     * without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array} array The array to query.
	     * @param {Function} predicate The function invoked per iteration.
	     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Array} Returns the slice of `array`.
	     */
	    function baseWhile(array, predicate, isDrop, fromRight) {
	      var length = array.length,
	          index = fromRight ? length : -1;

	      while ((fromRight ? index-- : ++index < length) &&
	        predicate(array[index], index, array)) {}

	      return isDrop
	        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
	        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
	    }

	    /**
	     * The base implementation of `wrapperValue` which returns the result of
	     * performing a sequence of actions on the unwrapped `value`, where each
	     * successive action is supplied the return value of the previous.
	     *
	     * @private
	     * @param {*} value The unwrapped value.
	     * @param {Array} actions Actions to perform to resolve the unwrapped value.
	     * @returns {*} Returns the resolved value.
	     */
	    function baseWrapperValue(value, actions) {
	      var result = value;
	      if (result instanceof LazyWrapper) {
	        result = result.value();
	      }
	      return arrayReduce(actions, function(result, action) {
	        return action.func.apply(action.thisArg, arrayPush([result], action.args));
	      }, result);
	    }

	    /**
	     * The base implementation of methods like `_.xor`, without support for
	     * iteratee shorthands, that accepts an array of arrays to inspect.
	     *
	     * @private
	     * @param {Array} arrays The arrays to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new array of values.
	     */
	    function baseXor(arrays, iteratee, comparator) {
	      var length = arrays.length;
	      if (length < 2) {
	        return length ? baseUniq(arrays[0]) : [];
	      }
	      var index = -1,
	          result = Array(length);

	      while (++index < length) {
	        var array = arrays[index],
	            othIndex = -1;

	        while (++othIndex < length) {
	          if (othIndex != index) {
	            result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
	          }
	        }
	      }
	      return baseUniq(baseFlatten(result, 1), iteratee, comparator);
	    }

	    /**
	     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
	     *
	     * @private
	     * @param {Array} props The property identifiers.
	     * @param {Array} values The property values.
	     * @param {Function} assignFunc The function to assign values.
	     * @returns {Object} Returns the new object.
	     */
	    function baseZipObject(props, values, assignFunc) {
	      var index = -1,
	          length = props.length,
	          valsLength = values.length,
	          result = {};

	      while (++index < length) {
	        var value = index < valsLength ? values[index] : undefined;
	        assignFunc(result, props[index], value);
	      }
	      return result;
	    }

	    /**
	     * Casts `value` to an empty array if it's not an array like object.
	     *
	     * @private
	     * @param {*} value The value to inspect.
	     * @returns {Array|Object} Returns the cast array-like object.
	     */
	    function castArrayLikeObject(value) {
	      return isArrayLikeObject(value) ? value : [];
	    }

	    /**
	     * Casts `value` to `identity` if it's not a function.
	     *
	     * @private
	     * @param {*} value The value to inspect.
	     * @returns {Function} Returns cast function.
	     */
	    function castFunction(value) {
	      return typeof value == 'function' ? value : identity;
	    }

	    /**
	     * Casts `value` to a path array if it's not one.
	     *
	     * @private
	     * @param {*} value The value to inspect.
	     * @param {Object} [object] The object to query keys on.
	     * @returns {Array} Returns the cast property path array.
	     */
	    function castPath(value, object) {
	      if (isArray(value)) {
	        return value;
	      }
	      return isKey(value, object) ? [value] : stringToPath(toString(value));
	    }

	    /**
	     * A `baseRest` alias which can be replaced with `identity` by module
	     * replacement plugins.
	     *
	     * @private
	     * @type {Function}
	     * @param {Function} func The function to apply a rest parameter to.
	     * @returns {Function} Returns the new function.
	     */
	    var castRest = baseRest;

	    /**
	     * Casts `array` to a slice if it's needed.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {number} start The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the cast slice.
	     */
	    function castSlice(array, start, end) {
	      var length = array.length;
	      end = end === undefined ? length : end;
	      return (!start && end >= length) ? array : baseSlice(array, start, end);
	    }

	    /**
	     * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
	     *
	     * @private
	     * @param {number|Object} id The timer id or timeout object of the timer to clear.
	     */
	    var clearTimeout = ctxClearTimeout || function(id) {
	      return root.clearTimeout(id);
	    };

	    /**
	     * Creates a clone of  `buffer`.
	     *
	     * @private
	     * @param {Buffer} buffer The buffer to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Buffer} Returns the cloned buffer.
	     */
	    function cloneBuffer(buffer, isDeep) {
	      if (isDeep) {
	        return buffer.slice();
	      }
	      var length = buffer.length,
	          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	      buffer.copy(result);
	      return result;
	    }

	    /**
	     * Creates a clone of `arrayBuffer`.
	     *
	     * @private
	     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	     * @returns {ArrayBuffer} Returns the cloned array buffer.
	     */
	    function cloneArrayBuffer(arrayBuffer) {
	      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	      return result;
	    }

	    /**
	     * Creates a clone of `dataView`.
	     *
	     * @private
	     * @param {Object} dataView The data view to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the cloned data view.
	     */
	    function cloneDataView(dataView, isDeep) {
	      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	    }

	    /**
	     * Creates a clone of `map`.
	     *
	     * @private
	     * @param {Object} map The map to clone.
	     * @param {Function} cloneFunc The function to clone values.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the cloned map.
	     */
	    function cloneMap(map, isDeep, cloneFunc) {
	      var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
	      return arrayReduce(array, addMapEntry, new map.constructor);
	    }

	    /**
	     * Creates a clone of `regexp`.
	     *
	     * @private
	     * @param {Object} regexp The regexp to clone.
	     * @returns {Object} Returns the cloned regexp.
	     */
	    function cloneRegExp(regexp) {
	      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	      result.lastIndex = regexp.lastIndex;
	      return result;
	    }

	    /**
	     * Creates a clone of `set`.
	     *
	     * @private
	     * @param {Object} set The set to clone.
	     * @param {Function} cloneFunc The function to clone values.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the cloned set.
	     */
	    function cloneSet(set, isDeep, cloneFunc) {
	      var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
	      return arrayReduce(array, addSetEntry, new set.constructor);
	    }

	    /**
	     * Creates a clone of the `symbol` object.
	     *
	     * @private
	     * @param {Object} symbol The symbol object to clone.
	     * @returns {Object} Returns the cloned symbol object.
	     */
	    function cloneSymbol(symbol) {
	      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	    }

	    /**
	     * Creates a clone of `typedArray`.
	     *
	     * @private
	     * @param {Object} typedArray The typed array to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the cloned typed array.
	     */
	    function cloneTypedArray(typedArray, isDeep) {
	      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	    }

	    /**
	     * Compares values to sort them in ascending order.
	     *
	     * @private
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {number} Returns the sort order indicator for `value`.
	     */
	    function compareAscending(value, other) {
	      if (value !== other) {
	        var valIsDefined = value !== undefined,
	            valIsNull = value === null,
	            valIsReflexive = value === value,
	            valIsSymbol = isSymbol(value);

	        var othIsDefined = other !== undefined,
	            othIsNull = other === null,
	            othIsReflexive = other === other,
	            othIsSymbol = isSymbol(other);

	        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
	            (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
	            (valIsNull && othIsDefined && othIsReflexive) ||
	            (!valIsDefined && othIsReflexive) ||
	            !valIsReflexive) {
	          return 1;
	        }
	        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
	            (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
	            (othIsNull && valIsDefined && valIsReflexive) ||
	            (!othIsDefined && valIsReflexive) ||
	            !othIsReflexive) {
	          return -1;
	        }
	      }
	      return 0;
	    }

	    /**
	     * Used by `_.orderBy` to compare multiple properties of a value to another
	     * and stable sort them.
	     *
	     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
	     * specify an order of "desc" for descending or "asc" for ascending sort order
	     * of corresponding values.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {boolean[]|string[]} orders The order to sort by for each property.
	     * @returns {number} Returns the sort order indicator for `object`.
	     */
	    function compareMultiple(object, other, orders) {
	      var index = -1,
	          objCriteria = object.criteria,
	          othCriteria = other.criteria,
	          length = objCriteria.length,
	          ordersLength = orders.length;

	      while (++index < length) {
	        var result = compareAscending(objCriteria[index], othCriteria[index]);
	        if (result) {
	          if (index >= ordersLength) {
	            return result;
	          }
	          var order = orders[index];
	          return result * (order == 'desc' ? -1 : 1);
	        }
	      }
	      // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
	      // that causes it, under certain circumstances, to provide the same value for
	      // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
	      // for more details.
	      //
	      // This also ensures a stable sort in V8 and other engines.
	      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
	      return object.index - other.index;
	    }

	    /**
	     * Creates an array that is the composition of partially applied arguments,
	     * placeholders, and provided arguments into a single array of arguments.
	     *
	     * @private
	     * @param {Array} args The provided arguments.
	     * @param {Array} partials The arguments to prepend to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @params {boolean} [isCurried] Specify composing for a curried function.
	     * @returns {Array} Returns the new array of composed arguments.
	     */
	    function composeArgs(args, partials, holders, isCurried) {
	      var argsIndex = -1,
	          argsLength = args.length,
	          holdersLength = holders.length,
	          leftIndex = -1,
	          leftLength = partials.length,
	          rangeLength = nativeMax(argsLength - holdersLength, 0),
	          result = Array(leftLength + rangeLength),
	          isUncurried = !isCurried;

	      while (++leftIndex < leftLength) {
	        result[leftIndex] = partials[leftIndex];
	      }
	      while (++argsIndex < holdersLength) {
	        if (isUncurried || argsIndex < argsLength) {
	          result[holders[argsIndex]] = args[argsIndex];
	        }
	      }
	      while (rangeLength--) {
	        result[leftIndex++] = args[argsIndex++];
	      }
	      return result;
	    }

	    /**
	     * This function is like `composeArgs` except that the arguments composition
	     * is tailored for `_.partialRight`.
	     *
	     * @private
	     * @param {Array} args The provided arguments.
	     * @param {Array} partials The arguments to append to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @params {boolean} [isCurried] Specify composing for a curried function.
	     * @returns {Array} Returns the new array of composed arguments.
	     */
	    function composeArgsRight(args, partials, holders, isCurried) {
	      var argsIndex = -1,
	          argsLength = args.length,
	          holdersIndex = -1,
	          holdersLength = holders.length,
	          rightIndex = -1,
	          rightLength = partials.length,
	          rangeLength = nativeMax(argsLength - holdersLength, 0),
	          result = Array(rangeLength + rightLength),
	          isUncurried = !isCurried;

	      while (++argsIndex < rangeLength) {
	        result[argsIndex] = args[argsIndex];
	      }
	      var offset = argsIndex;
	      while (++rightIndex < rightLength) {
	        result[offset + rightIndex] = partials[rightIndex];
	      }
	      while (++holdersIndex < holdersLength) {
	        if (isUncurried || argsIndex < argsLength) {
	          result[offset + holders[holdersIndex]] = args[argsIndex++];
	        }
	      }
	      return result;
	    }

	    /**
	     * Copies the values of `source` to `array`.
	     *
	     * @private
	     * @param {Array} source The array to copy values from.
	     * @param {Array} [array=[]] The array to copy values to.
	     * @returns {Array} Returns `array`.
	     */
	    function copyArray(source, array) {
	      var index = -1,
	          length = source.length;

	      array || (array = Array(length));
	      while (++index < length) {
	        array[index] = source[index];
	      }
	      return array;
	    }

	    /**
	     * Copies properties of `source` to `object`.
	     *
	     * @private
	     * @param {Object} source The object to copy properties from.
	     * @param {Array} props The property identifiers to copy.
	     * @param {Object} [object={}] The object to copy properties to.
	     * @param {Function} [customizer] The function to customize copied values.
	     * @returns {Object} Returns `object`.
	     */
	    function copyObject(source, props, object, customizer) {
	      var isNew = !object;
	      object || (object = {});

	      var index = -1,
	          length = props.length;

	      while (++index < length) {
	        var key = props[index];

	        var newValue = customizer
	          ? customizer(object[key], source[key], key, object, source)
	          : undefined;

	        if (newValue === undefined) {
	          newValue = source[key];
	        }
	        if (isNew) {
	          baseAssignValue(object, key, newValue);
	        } else {
	          assignValue(object, key, newValue);
	        }
	      }
	      return object;
	    }

	    /**
	     * Copies own symbols of `source` to `object`.
	     *
	     * @private
	     * @param {Object} source The object to copy symbols from.
	     * @param {Object} [object={}] The object to copy symbols to.
	     * @returns {Object} Returns `object`.
	     */
	    function copySymbols(source, object) {
	      return copyObject(source, getSymbols(source), object);
	    }

	    /**
	     * Copies own and inherited symbols of `source` to `object`.
	     *
	     * @private
	     * @param {Object} source The object to copy symbols from.
	     * @param {Object} [object={}] The object to copy symbols to.
	     * @returns {Object} Returns `object`.
	     */
	    function copySymbolsIn(source, object) {
	      return copyObject(source, getSymbolsIn(source), object);
	    }

	    /**
	     * Creates a function like `_.groupBy`.
	     *
	     * @private
	     * @param {Function} setter The function to set accumulator values.
	     * @param {Function} [initializer] The accumulator object initializer.
	     * @returns {Function} Returns the new aggregator function.
	     */
	    function createAggregator(setter, initializer) {
	      return function(collection, iteratee) {
	        var func = isArray(collection) ? arrayAggregator : baseAggregator,
	            accumulator = initializer ? initializer() : {};

	        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
	      };
	    }

	    /**
	     * Creates a function like `_.assign`.
	     *
	     * @private
	     * @param {Function} assigner The function to assign values.
	     * @returns {Function} Returns the new assigner function.
	     */
	    function createAssigner(assigner) {
	      return baseRest(function(object, sources) {
	        var index = -1,
	            length = sources.length,
	            customizer = length > 1 ? sources[length - 1] : undefined,
	            guard = length > 2 ? sources[2] : undefined;

	        customizer = (assigner.length > 3 && typeof customizer == 'function')
	          ? (length--, customizer)
	          : undefined;

	        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	          customizer = length < 3 ? undefined : customizer;
	          length = 1;
	        }
	        object = Object(object);
	        while (++index < length) {
	          var source = sources[index];
	          if (source) {
	            assigner(object, source, index, customizer);
	          }
	        }
	        return object;
	      });
	    }

	    /**
	     * Creates a `baseEach` or `baseEachRight` function.
	     *
	     * @private
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */
	    function createBaseEach(eachFunc, fromRight) {
	      return function(collection, iteratee) {
	        if (collection == null) {
	          return collection;
	        }
	        if (!isArrayLike(collection)) {
	          return eachFunc(collection, iteratee);
	        }
	        var length = collection.length,
	            index = fromRight ? length : -1,
	            iterable = Object(collection);

	        while ((fromRight ? index-- : ++index < length)) {
	          if (iteratee(iterable[index], index, iterable) === false) {
	            break;
	          }
	        }
	        return collection;
	      };
	    }

	    /**
	     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */
	    function createBaseFor(fromRight) {
	      return function(object, iteratee, keysFunc) {
	        var index = -1,
	            iterable = Object(object),
	            props = keysFunc(object),
	            length = props.length;

	        while (length--) {
	          var key = props[fromRight ? length : ++index];
	          if (iteratee(iterable[key], key, iterable) === false) {
	            break;
	          }
	        }
	        return object;
	      };
	    }

	    /**
	     * Creates a function that wraps `func` to invoke it with the optional `this`
	     * binding of `thisArg`.
	     *
	     * @private
	     * @param {Function} func The function to wrap.
	     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createBind(func, bitmask, thisArg) {
	      var isBind = bitmask & WRAP_BIND_FLAG,
	          Ctor = createCtor(func);

	      function wrapper() {
	        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	        return fn.apply(isBind ? thisArg : this, arguments);
	      }
	      return wrapper;
	    }

	    /**
	     * Creates a function like `_.lowerFirst`.
	     *
	     * @private
	     * @param {string} methodName The name of the `String` case method to use.
	     * @returns {Function} Returns the new case function.
	     */
	    function createCaseFirst(methodName) {
	      return function(string) {
	        string = toString(string);

	        var strSymbols = hasUnicode(string)
	          ? stringToArray(string)
	          : undefined;

	        var chr = strSymbols
	          ? strSymbols[0]
	          : string.charAt(0);

	        var trailing = strSymbols
	          ? castSlice(strSymbols, 1).join('')
	          : string.slice(1);

	        return chr[methodName]() + trailing;
	      };
	    }

	    /**
	     * Creates a function like `_.camelCase`.
	     *
	     * @private
	     * @param {Function} callback The function to combine each word.
	     * @returns {Function} Returns the new compounder function.
	     */
	    function createCompounder(callback) {
	      return function(string) {
	        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
	      };
	    }

	    /**
	     * Creates a function that produces an instance of `Ctor` regardless of
	     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	     *
	     * @private
	     * @param {Function} Ctor The constructor to wrap.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createCtor(Ctor) {
	      return function() {
	        // Use a `switch` statement to work with class constructors. See
	        // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	        // for more details.
	        var args = arguments;
	        switch (args.length) {
	          case 0: return new Ctor;
	          case 1: return new Ctor(args[0]);
	          case 2: return new Ctor(args[0], args[1]);
	          case 3: return new Ctor(args[0], args[1], args[2]);
	          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
	          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	        }
	        var thisBinding = baseCreate(Ctor.prototype),
	            result = Ctor.apply(thisBinding, args);

	        // Mimic the constructor's `return` behavior.
	        // See https://es5.github.io/#x13.2.2 for more details.
	        return isObject(result) ? result : thisBinding;
	      };
	    }

	    /**
	     * Creates a function that wraps `func` to enable currying.
	     *
	     * @private
	     * @param {Function} func The function to wrap.
	     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	     * @param {number} arity The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createCurry(func, bitmask, arity) {
	      var Ctor = createCtor(func);

	      function wrapper() {
	        var length = arguments.length,
	            args = Array(length),
	            index = length,
	            placeholder = getHolder(wrapper);

	        while (index--) {
	          args[index] = arguments[index];
	        }
	        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
	          ? []
	          : replaceHolders(args, placeholder);

	        length -= holders.length;
	        if (length < arity) {
	          return createRecurry(
	            func, bitmask, createHybrid, wrapper.placeholder, undefined,
	            args, holders, undefined, undefined, arity - length);
	        }
	        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	        return apply(fn, this, args);
	      }
	      return wrapper;
	    }

	    /**
	     * Creates a `_.find` or `_.findLast` function.
	     *
	     * @private
	     * @param {Function} findIndexFunc The function to find the collection index.
	     * @returns {Function} Returns the new find function.
	     */
	    function createFind(findIndexFunc) {
	      return function(collection, predicate, fromIndex) {
	        var iterable = Object(collection);
	        if (!isArrayLike(collection)) {
	          var iteratee = getIteratee(predicate, 3);
	          collection = keys(collection);
	          predicate = function(key) { return iteratee(iterable[key], key, iterable); };
	        }
	        var index = findIndexFunc(collection, predicate, fromIndex);
	        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
	      };
	    }

	    /**
	     * Creates a `_.flow` or `_.flowRight` function.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new flow function.
	     */
	    function createFlow(fromRight) {
	      return flatRest(function(funcs) {
	        var length = funcs.length,
	            index = length,
	            prereq = LodashWrapper.prototype.thru;

	        if (fromRight) {
	          funcs.reverse();
	        }
	        while (index--) {
	          var func = funcs[index];
	          if (typeof func != 'function') {
	            throw new TypeError(FUNC_ERROR_TEXT);
	          }
	          if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
	            var wrapper = new LodashWrapper([], true);
	          }
	        }
	        index = wrapper ? index : length;
	        while (++index < length) {
	          func = funcs[index];

	          var funcName = getFuncName(func),
	              data = funcName == 'wrapper' ? getData(func) : undefined;

	          if (data && isLaziable(data[0]) &&
	                data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
	                !data[4].length && data[9] == 1
	              ) {
	            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
	          } else {
	            wrapper = (func.length == 1 && isLaziable(func))
	              ? wrapper[funcName]()
	              : wrapper.thru(func);
	          }
	        }
	        return function() {
	          var args = arguments,
	              value = args[0];

	          if (wrapper && args.length == 1 && isArray(value)) {
	            return wrapper.plant(value).value();
	          }
	          var index = 0,
	              result = length ? funcs[index].apply(this, args) : value;

	          while (++index < length) {
	            result = funcs[index].call(this, result);
	          }
	          return result;
	        };
	      });
	    }

	    /**
	     * Creates a function that wraps `func` to invoke it with optional `this`
	     * binding of `thisArg`, partial application, and currying.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to wrap.
	     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to prepend to those provided to
	     *  the new function.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [partialsRight] The arguments to append to those provided
	     *  to the new function.
	     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	      var isAry = bitmask & WRAP_ARY_FLAG,
	          isBind = bitmask & WRAP_BIND_FLAG,
	          isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
	          isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
	          isFlip = bitmask & WRAP_FLIP_FLAG,
	          Ctor = isBindKey ? undefined : createCtor(func);

	      function wrapper() {
	        var length = arguments.length,
	            args = Array(length),
	            index = length;

	        while (index--) {
	          args[index] = arguments[index];
	        }
	        if (isCurried) {
	          var placeholder = getHolder(wrapper),
	              holdersCount = countHolders(args, placeholder);
	        }
	        if (partials) {
	          args = composeArgs(args, partials, holders, isCurried);
	        }
	        if (partialsRight) {
	          args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
	        }
	        length -= holdersCount;
	        if (isCurried && length < arity) {
	          var newHolders = replaceHolders(args, placeholder);
	          return createRecurry(
	            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
	            args, newHolders, argPos, ary, arity - length
	          );
	        }
	        var thisBinding = isBind ? thisArg : this,
	            fn = isBindKey ? thisBinding[func] : func;

	        length = args.length;
	        if (argPos) {
	          args = reorder(args, argPos);
	        } else if (isFlip && length > 1) {
	          args.reverse();
	        }
	        if (isAry && ary < length) {
	          args.length = ary;
	        }
	        if (this && this !== root && this instanceof wrapper) {
	          fn = Ctor || createCtor(fn);
	        }
	        return fn.apply(thisBinding, args);
	      }
	      return wrapper;
	    }

	    /**
	     * Creates a function like `_.invertBy`.
	     *
	     * @private
	     * @param {Function} setter The function to set accumulator values.
	     * @param {Function} toIteratee The function to resolve iteratees.
	     * @returns {Function} Returns the new inverter function.
	     */
	    function createInverter(setter, toIteratee) {
	      return function(object, iteratee) {
	        return baseInverter(object, setter, toIteratee(iteratee), {});
	      };
	    }

	    /**
	     * Creates a function that performs a mathematical operation on two values.
	     *
	     * @private
	     * @param {Function} operator The function to perform the operation.
	     * @param {number} [defaultValue] The value used for `undefined` arguments.
	     * @returns {Function} Returns the new mathematical operation function.
	     */
	    function createMathOperation(operator, defaultValue) {
	      return function(value, other) {
	        var result;
	        if (value === undefined && other === undefined) {
	          return defaultValue;
	        }
	        if (value !== undefined) {
	          result = value;
	        }
	        if (other !== undefined) {
	          if (result === undefined) {
	            return other;
	          }
	          if (typeof value == 'string' || typeof other == 'string') {
	            value = baseToString(value);
	            other = baseToString(other);
	          } else {
	            value = baseToNumber(value);
	            other = baseToNumber(other);
	          }
	          result = operator(value, other);
	        }
	        return result;
	      };
	    }

	    /**
	     * Creates a function like `_.over`.
	     *
	     * @private
	     * @param {Function} arrayFunc The function to iterate over iteratees.
	     * @returns {Function} Returns the new over function.
	     */
	    function createOver(arrayFunc) {
	      return flatRest(function(iteratees) {
	        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
	        return baseRest(function(args) {
	          var thisArg = this;
	          return arrayFunc(iteratees, function(iteratee) {
	            return apply(iteratee, thisArg, args);
	          });
	        });
	      });
	    }

	    /**
	     * Creates the padding for `string` based on `length`. The `chars` string
	     * is truncated if the number of characters exceeds `length`.
	     *
	     * @private
	     * @param {number} length The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padding for `string`.
	     */
	    function createPadding(length, chars) {
	      chars = chars === undefined ? ' ' : baseToString(chars);

	      var charsLength = chars.length;
	      if (charsLength < 2) {
	        return charsLength ? baseRepeat(chars, length) : chars;
	      }
	      var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
	      return hasUnicode(chars)
	        ? castSlice(stringToArray(result), 0, length).join('')
	        : result.slice(0, length);
	    }

	    /**
	     * Creates a function that wraps `func` to invoke it with the `this` binding
	     * of `thisArg` and `partials` prepended to the arguments it receives.
	     *
	     * @private
	     * @param {Function} func The function to wrap.
	     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {Array} partials The arguments to prepend to those provided to
	     *  the new function.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createPartial(func, bitmask, thisArg, partials) {
	      var isBind = bitmask & WRAP_BIND_FLAG,
	          Ctor = createCtor(func);

	      function wrapper() {
	        var argsIndex = -1,
	            argsLength = arguments.length,
	            leftIndex = -1,
	            leftLength = partials.length,
	            args = Array(leftLength + argsLength),
	            fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

	        while (++leftIndex < leftLength) {
	          args[leftIndex] = partials[leftIndex];
	        }
	        while (argsLength--) {
	          args[leftIndex++] = arguments[++argsIndex];
	        }
	        return apply(fn, isBind ? thisArg : this, args);
	      }
	      return wrapper;
	    }

	    /**
	     * Creates a `_.range` or `_.rangeRight` function.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new range function.
	     */
	    function createRange(fromRight) {
	      return function(start, end, step) {
	        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
	          end = step = undefined;
	        }
	        // Ensure the sign of `-0` is preserved.
	        start = toFinite(start);
	        if (end === undefined) {
	          end = start;
	          start = 0;
	        } else {
	          end = toFinite(end);
	        }
	        step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
	        return baseRange(start, end, step, fromRight);
	      };
	    }

	    /**
	     * Creates a function that performs a relational operation on two values.
	     *
	     * @private
	     * @param {Function} operator The function to perform the operation.
	     * @returns {Function} Returns the new relational operation function.
	     */
	    function createRelationalOperation(operator) {
	      return function(value, other) {
	        if (!(typeof value == 'string' && typeof other == 'string')) {
	          value = toNumber(value);
	          other = toNumber(other);
	        }
	        return operator(value, other);
	      };
	    }

	    /**
	     * Creates a function that wraps `func` to continue currying.
	     *
	     * @private
	     * @param {Function} func The function to wrap.
	     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	     * @param {Function} wrapFunc The function to create the `func` wrapper.
	     * @param {*} placeholder The placeholder value.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to prepend to those provided to
	     *  the new function.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
	      var isCurry = bitmask & WRAP_CURRY_FLAG,
	          newHolders = isCurry ? holders : undefined,
	          newHoldersRight = isCurry ? undefined : holders,
	          newPartials = isCurry ? partials : undefined,
	          newPartialsRight = isCurry ? undefined : partials;

	      bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
	      bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

	      if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
	        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
	      }
	      var newData = [
	        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
	        newHoldersRight, argPos, ary, arity
	      ];

	      var result = wrapFunc.apply(undefined, newData);
	      if (isLaziable(func)) {
	        setData(result, newData);
	      }
	      result.placeholder = placeholder;
	      return setWrapToString(result, func, bitmask);
	    }

	    /**
	     * Creates a function like `_.round`.
	     *
	     * @private
	     * @param {string} methodName The name of the `Math` method to use when rounding.
	     * @returns {Function} Returns the new round function.
	     */
	    function createRound(methodName) {
	      var func = Math[methodName];
	      return function(number, precision) {
	        number = toNumber(number);
	        precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
	        if (precision) {
	          // Shift with exponential notation to avoid floating-point issues.
	          // See [MDN](https://mdn.io/round#Examples) for more details.
	          var pair = (toString(number) + 'e').split('e'),
	              value = func(pair[0] + 'e' + (+pair[1] + precision));

	          pair = (toString(value) + 'e').split('e');
	          return +(pair[0] + 'e' + (+pair[1] - precision));
	        }
	        return func(number);
	      };
	    }

	    /**
	     * Creates a set object of `values`.
	     *
	     * @private
	     * @param {Array} values The values to add to the set.
	     * @returns {Object} Returns the new set.
	     */
	    var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
	      return new Set(values);
	    };

	    /**
	     * Creates a `_.toPairs` or `_.toPairsIn` function.
	     *
	     * @private
	     * @param {Function} keysFunc The function to get the keys of a given object.
	     * @returns {Function} Returns the new pairs function.
	     */
	    function createToPairs(keysFunc) {
	      return function(object) {
	        var tag = getTag(object);
	        if (tag == mapTag) {
	          return mapToArray(object);
	        }
	        if (tag == setTag) {
	          return setToPairs(object);
	        }
	        return baseToPairs(object, keysFunc(object));
	      };
	    }

	    /**
	     * Creates a function that either curries or invokes `func` with optional
	     * `this` binding and partially applied arguments.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to wrap.
	     * @param {number} bitmask The bitmask flags.
	     *    1 - `_.bind`
	     *    2 - `_.bindKey`
	     *    4 - `_.curry` or `_.curryRight` of a bound function
	     *    8 - `_.curry`
	     *   16 - `_.curryRight`
	     *   32 - `_.partial`
	     *   64 - `_.partialRight`
	     *  128 - `_.rearg`
	     *  256 - `_.ary`
	     *  512 - `_.flip`
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to be partially applied.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	      var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
	      if (!isBindKey && typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      var length = partials ? partials.length : 0;
	      if (!length) {
	        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
	        partials = holders = undefined;
	      }
	      ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
	      arity = arity === undefined ? arity : toInteger(arity);
	      length -= holders ? holders.length : 0;

	      if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
	        var partialsRight = partials,
	            holdersRight = holders;

	        partials = holders = undefined;
	      }
	      var data = isBindKey ? undefined : getData(func);

	      var newData = [
	        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
	        argPos, ary, arity
	      ];

	      if (data) {
	        mergeData(newData, data);
	      }
	      func = newData[0];
	      bitmask = newData[1];
	      thisArg = newData[2];
	      partials = newData[3];
	      holders = newData[4];
	      arity = newData[9] = newData[9] === undefined
	        ? (isBindKey ? 0 : func.length)
	        : nativeMax(newData[9] - length, 0);

	      if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
	        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
	      }
	      if (!bitmask || bitmask == WRAP_BIND_FLAG) {
	        var result = createBind(func, bitmask, thisArg);
	      } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
	        result = createCurry(func, bitmask, arity);
	      } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
	        result = createPartial(func, bitmask, thisArg, partials);
	      } else {
	        result = createHybrid.apply(undefined, newData);
	      }
	      var setter = data ? baseSetData : setData;
	      return setWrapToString(setter(result, newData), func, bitmask);
	    }

	    /**
	     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
	     * of source objects to the destination object for all destination properties
	     * that resolve to `undefined`.
	     *
	     * @private
	     * @param {*} objValue The destination value.
	     * @param {*} srcValue The source value.
	     * @param {string} key The key of the property to assign.
	     * @param {Object} object The parent object of `objValue`.
	     * @returns {*} Returns the value to assign.
	     */
	    function customDefaultsAssignIn(objValue, srcValue, key, object) {
	      if (objValue === undefined ||
	          (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
	        return srcValue;
	      }
	      return objValue;
	    }

	    /**
	     * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
	     * objects into destination objects that are passed thru.
	     *
	     * @private
	     * @param {*} objValue The destination value.
	     * @param {*} srcValue The source value.
	     * @param {string} key The key of the property to merge.
	     * @param {Object} object The parent object of `objValue`.
	     * @param {Object} source The parent object of `srcValue`.
	     * @param {Object} [stack] Tracks traversed source values and their merged
	     *  counterparts.
	     * @returns {*} Returns the value to assign.
	     */
	    function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
	      if (isObject(objValue) && isObject(srcValue)) {
	        // Recursively merge objects and arrays (susceptible to call stack limits).
	        stack.set(srcValue, objValue);
	        baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
	        stack['delete'](srcValue);
	      }
	      return objValue;
	    }

	    /**
	     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
	     * objects.
	     *
	     * @private
	     * @param {*} value The value to inspect.
	     * @param {string} key The key of the property to inspect.
	     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
	     */
	    function customOmitClone(value) {
	      return isPlainObject(value) ? undefined : value;
	    }

	    /**
	     * A specialized version of `baseIsEqualDeep` for arrays with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Array} array The array to compare.
	     * @param {Array} other The other array to compare.
	     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	     * @param {Function} customizer The function to customize comparisons.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Object} stack Tracks traversed `array` and `other` objects.
	     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	     */
	    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	          arrLength = array.length,
	          othLength = other.length;

	      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(array);
	      if (stacked && stack.get(other)) {
	        return stacked == other;
	      }
	      var index = -1,
	          result = true,
	          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

	      stack.set(array, other);
	      stack.set(other, array);

	      // Ignore non-index properties.
	      while (++index < arrLength) {
	        var arrValue = array[index],
	            othValue = other[index];

	        if (customizer) {
	          var compared = isPartial
	            ? customizer(othValue, arrValue, index, other, array, stack)
	            : customizer(arrValue, othValue, index, array, other, stack);
	        }
	        if (compared !== undefined) {
	          if (compared) {
	            continue;
	          }
	          result = false;
	          break;
	        }
	        // Recursively compare arrays (susceptible to call stack limits).
	        if (seen) {
	          if (!arraySome(other, function(othValue, othIndex) {
	                if (!cacheHas(seen, othIndex) &&
	                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	                  return seen.push(othIndex);
	                }
	              })) {
	            result = false;
	            break;
	          }
	        } else if (!(
	              arrValue === othValue ||
	                equalFunc(arrValue, othValue, bitmask, customizer, stack)
	            )) {
	          result = false;
	          break;
	        }
	      }
	      stack['delete'](array);
	      stack['delete'](other);
	      return result;
	    }

	    /**
	     * A specialized version of `baseIsEqualDeep` for comparing objects of
	     * the same `toStringTag`.
	     *
	     * **Note:** This function only supports comparing values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {string} tag The `toStringTag` of the objects to compare.
	     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	     * @param {Function} customizer The function to customize comparisons.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Object} stack Tracks traversed `object` and `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	      switch (tag) {
	        case dataViewTag:
	          if ((object.byteLength != other.byteLength) ||
	              (object.byteOffset != other.byteOffset)) {
	            return false;
	          }
	          object = object.buffer;
	          other = other.buffer;

	        case arrayBufferTag:
	          if ((object.byteLength != other.byteLength) ||
	              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	            return false;
	          }
	          return true;

	        case boolTag:
	        case dateTag:
	        case numberTag:
	          // Coerce booleans to `1` or `0` and dates to milliseconds.
	          // Invalid dates are coerced to `NaN`.
	          return eq(+object, +other);

	        case errorTag:
	          return object.name == other.name && object.message == other.message;

	        case regexpTag:
	        case stringTag:
	          // Coerce regexes to strings and treat strings, primitives and objects,
	          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	          // for more details.
	          return object == (other + '');

	        case mapTag:
	          var convert = mapToArray;

	        case setTag:
	          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
	          convert || (convert = setToArray);

	          if (object.size != other.size && !isPartial) {
	            return false;
	          }
	          // Assume cyclic values are equal.
	          var stacked = stack.get(object);
	          if (stacked) {
	            return stacked == other;
	          }
	          bitmask |= COMPARE_UNORDERED_FLAG;

	          // Recursively compare objects (susceptible to call stack limits).
	          stack.set(object, other);
	          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	          stack['delete'](object);
	          return result;

	        case symbolTag:
	          if (symbolValueOf) {
	            return symbolValueOf.call(object) == symbolValueOf.call(other);
	          }
	      }
	      return false;
	    }

	    /**
	     * A specialized version of `baseIsEqualDeep` for objects with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	     * @param {Function} customizer The function to customize comparisons.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Object} stack Tracks traversed `object` and `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	          objProps = getAllKeys(object),
	          objLength = objProps.length,
	          othProps = getAllKeys(other),
	          othLength = othProps.length;

	      if (objLength != othLength && !isPartial) {
	        return false;
	      }
	      var index = objLength;
	      while (index--) {
	        var key = objProps[index];
	        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	          return false;
	        }
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked && stack.get(other)) {
	        return stacked == other;
	      }
	      var result = true;
	      stack.set(object, other);
	      stack.set(other, object);

	      var skipCtor = isPartial;
	      while (++index < objLength) {
	        key = objProps[index];
	        var objValue = object[key],
	            othValue = other[key];

	        if (customizer) {
	          var compared = isPartial
	            ? customizer(othValue, objValue, key, other, object, stack)
	            : customizer(objValue, othValue, key, object, other, stack);
	        }
	        // Recursively compare objects (susceptible to call stack limits).
	        if (!(compared === undefined
	              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	              : compared
	            )) {
	          result = false;
	          break;
	        }
	        skipCtor || (skipCtor = key == 'constructor');
	      }
	      if (result && !skipCtor) {
	        var objCtor = object.constructor,
	            othCtor = other.constructor;

	        // Non `Object` object instances with different constructors are not equal.
	        if (objCtor != othCtor &&
	            ('constructor' in object && 'constructor' in other) &&
	            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	          result = false;
	        }
	      }
	      stack['delete'](object);
	      stack['delete'](other);
	      return result;
	    }

	    /**
	     * A specialized version of `baseRest` which flattens the rest array.
	     *
	     * @private
	     * @param {Function} func The function to apply a rest parameter to.
	     * @returns {Function} Returns the new function.
	     */
	    function flatRest(func) {
	      return setToString(overRest(func, undefined, flatten), func + '');
	    }

	    /**
	     * Creates an array of own enumerable property names and symbols of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names and symbols.
	     */
	    function getAllKeys(object) {
	      return baseGetAllKeys(object, keys, getSymbols);
	    }

	    /**
	     * Creates an array of own and inherited enumerable property names and
	     * symbols of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names and symbols.
	     */
	    function getAllKeysIn(object) {
	      return baseGetAllKeys(object, keysIn, getSymbolsIn);
	    }

	    /**
	     * Gets metadata for `func`.
	     *
	     * @private
	     * @param {Function} func The function to query.
	     * @returns {*} Returns the metadata for `func`.
	     */
	    var getData = !metaMap ? noop : function(func) {
	      return metaMap.get(func);
	    };

	    /**
	     * Gets the name of `func`.
	     *
	     * @private
	     * @param {Function} func The function to query.
	     * @returns {string} Returns the function name.
	     */
	    function getFuncName(func) {
	      var result = (func.name + ''),
	          array = realNames[result],
	          length = hasOwnProperty.call(realNames, result) ? array.length : 0;

	      while (length--) {
	        var data = array[length],
	            otherFunc = data.func;
	        if (otherFunc == null || otherFunc == func) {
	          return data.name;
	        }
	      }
	      return result;
	    }

	    /**
	     * Gets the argument placeholder value for `func`.
	     *
	     * @private
	     * @param {Function} func The function to inspect.
	     * @returns {*} Returns the placeholder value.
	     */
	    function getHolder(func) {
	      var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
	      return object.placeholder;
	    }

	    /**
	     * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
	     * this function returns the custom method, otherwise it returns `baseIteratee`.
	     * If arguments are provided, the chosen function is invoked with them and
	     * its result is returned.
	     *
	     * @private
	     * @param {*} [value] The value to convert to an iteratee.
	     * @param {number} [arity] The arity of the created iteratee.
	     * @returns {Function} Returns the chosen function or its result.
	     */
	    function getIteratee() {
	      var result = lodash.iteratee || iteratee;
	      result = result === iteratee ? baseIteratee : result;
	      return arguments.length ? result(arguments[0], arguments[1]) : result;
	    }

	    /**
	     * Gets the data for `map`.
	     *
	     * @private
	     * @param {Object} map The map to query.
	     * @param {string} key The reference key.
	     * @returns {*} Returns the map data.
	     */
	    function getMapData(map, key) {
	      var data = map.__data__;
	      return isKeyable(key)
	        ? data[typeof key == 'string' ? 'string' : 'hash']
	        : data.map;
	    }

	    /**
	     * Gets the property names, values, and compare flags of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the match data of `object`.
	     */
	    function getMatchData(object) {
	      var result = keys(object),
	          length = result.length;

	      while (length--) {
	        var key = result[length],
	            value = object[key];

	        result[length] = [key, value, isStrictComparable(value)];
	      }
	      return result;
	    }

	    /**
	     * Gets the native function at `key` of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {string} key The key of the method to get.
	     * @returns {*} Returns the function if it's native, else `undefined`.
	     */
	    function getNative(object, key) {
	      var value = getValue(object, key);
	      return baseIsNative(value) ? value : undefined;
	    }

	    /**
	     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	     *
	     * @private
	     * @param {*} value The value to query.
	     * @returns {string} Returns the raw `toStringTag`.
	     */
	    function getRawTag(value) {
	      var isOwn = hasOwnProperty.call(value, symToStringTag),
	          tag = value[symToStringTag];

	      try {
	        value[symToStringTag] = undefined;
	        var unmasked = true;
	      } catch (e) {}

	      var result = nativeObjectToString.call(value);
	      if (unmasked) {
	        if (isOwn) {
	          value[symToStringTag] = tag;
	        } else {
	          delete value[symToStringTag];
	        }
	      }
	      return result;
	    }

	    /**
	     * Creates an array of the own enumerable symbols of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of symbols.
	     */
	    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	      if (object == null) {
	        return [];
	      }
	      object = Object(object);
	      return arrayFilter(nativeGetSymbols(object), function(symbol) {
	        return propertyIsEnumerable.call(object, symbol);
	      });
	    };

	    /**
	     * Creates an array of the own and inherited enumerable symbols of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of symbols.
	     */
	    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
	      var result = [];
	      while (object) {
	        arrayPush(result, getSymbols(object));
	        object = getPrototype(object);
	      }
	      return result;
	    };

	    /**
	     * Gets the `toStringTag` of `value`.
	     *
	     * @private
	     * @param {*} value The value to query.
	     * @returns {string} Returns the `toStringTag`.
	     */
	    var getTag = baseGetTag;

	    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	        (Map && getTag(new Map) != mapTag) ||
	        (Promise && getTag(Promise.resolve()) != promiseTag) ||
	        (Set && getTag(new Set) != setTag) ||
	        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	      getTag = function(value) {
	        var result = baseGetTag(value),
	            Ctor = result == objectTag ? value.constructor : undefined,
	            ctorString = Ctor ? toSource(Ctor) : '';

	        if (ctorString) {
	          switch (ctorString) {
	            case dataViewCtorString: return dataViewTag;
	            case mapCtorString: return mapTag;
	            case promiseCtorString: return promiseTag;
	            case setCtorString: return setTag;
	            case weakMapCtorString: return weakMapTag;
	          }
	        }
	        return result;
	      };
	    }

	    /**
	     * Gets the view, applying any `transforms` to the `start` and `end` positions.
	     *
	     * @private
	     * @param {number} start The start of the view.
	     * @param {number} end The end of the view.
	     * @param {Array} transforms The transformations to apply to the view.
	     * @returns {Object} Returns an object containing the `start` and `end`
	     *  positions of the view.
	     */
	    function getView(start, end, transforms) {
	      var index = -1,
	          length = transforms.length;

	      while (++index < length) {
	        var data = transforms[index],
	            size = data.size;

	        switch (data.type) {
	          case 'drop':      start += size; break;
	          case 'dropRight': end -= size; break;
	          case 'take':      end = nativeMin(end, start + size); break;
	          case 'takeRight': start = nativeMax(start, end - size); break;
	        }
	      }
	      return { 'start': start, 'end': end };
	    }

	    /**
	     * Extracts wrapper details from the `source` body comment.
	     *
	     * @private
	     * @param {string} source The source to inspect.
	     * @returns {Array} Returns the wrapper details.
	     */
	    function getWrapDetails(source) {
	      var match = source.match(reWrapDetails);
	      return match ? match[1].split(reSplitDetails) : [];
	    }

	    /**
	     * Checks if `path` exists on `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @param {Function} hasFunc The function to check properties.
	     * @returns {boolean} Returns `true` if `path` exists, else `false`.
	     */
	    function hasPath(object, path, hasFunc) {
	      path = castPath(path, object);

	      var index = -1,
	          length = path.length,
	          result = false;

	      while (++index < length) {
	        var key = toKey(path[index]);
	        if (!(result = object != null && hasFunc(object, key))) {
	          break;
	        }
	        object = object[key];
	      }
	      if (result || ++index != length) {
	        return result;
	      }
	      length = object == null ? 0 : object.length;
	      return !!length && isLength(length) && isIndex(key, length) &&
	        (isArray(object) || isArguments(object));
	    }

	    /**
	     * Initializes an array clone.
	     *
	     * @private
	     * @param {Array} array The array to clone.
	     * @returns {Array} Returns the initialized clone.
	     */
	    function initCloneArray(array) {
	      var length = array.length,
	          result = array.constructor(length);

	      // Add properties assigned by `RegExp#exec`.
	      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	        result.index = array.index;
	        result.input = array.input;
	      }
	      return result;
	    }

	    /**
	     * Initializes an object clone.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @returns {Object} Returns the initialized clone.
	     */
	    function initCloneObject(object) {
	      return (typeof object.constructor == 'function' && !isPrototype(object))
	        ? baseCreate(getPrototype(object))
	        : {};
	    }

	    /**
	     * Initializes an object clone based on its `toStringTag`.
	     *
	     * **Note:** This function only supports cloning values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @param {string} tag The `toStringTag` of the object to clone.
	     * @param {Function} cloneFunc The function to clone values.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the initialized clone.
	     */
	    function initCloneByTag(object, tag, cloneFunc, isDeep) {
	      var Ctor = object.constructor;
	      switch (tag) {
	        case arrayBufferTag:
	          return cloneArrayBuffer(object);

	        case boolTag:
	        case dateTag:
	          return new Ctor(+object);

	        case dataViewTag:
	          return cloneDataView(object, isDeep);

	        case float32Tag: case float64Tag:
	        case int8Tag: case int16Tag: case int32Tag:
	        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	          return cloneTypedArray(object, isDeep);

	        case mapTag:
	          return cloneMap(object, isDeep, cloneFunc);

	        case numberTag:
	        case stringTag:
	          return new Ctor(object);

	        case regexpTag:
	          return cloneRegExp(object);

	        case setTag:
	          return cloneSet(object, isDeep, cloneFunc);

	        case symbolTag:
	          return cloneSymbol(object);
	      }
	    }

	    /**
	     * Inserts wrapper `details` in a comment at the top of the `source` body.
	     *
	     * @private
	     * @param {string} source The source to modify.
	     * @returns {Array} details The details to insert.
	     * @returns {string} Returns the modified source.
	     */
	    function insertWrapDetails(source, details) {
	      var length = details.length;
	      if (!length) {
	        return source;
	      }
	      var lastIndex = length - 1;
	      details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
	      details = details.join(length > 2 ? ', ' : ' ');
	      return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
	    }

	    /**
	     * Checks if `value` is a flattenable `arguments` object or array.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	     */
	    function isFlattenable(value) {
	      return isArray(value) || isArguments(value) ||
	        !!(spreadableSymbol && value && value[spreadableSymbol]);
	    }

	    /**
	     * Checks if `value` is a valid array-like index.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	     */
	    function isIndex(value, length) {
	      length = length == null ? MAX_SAFE_INTEGER : length;
	      return !!length &&
	        (typeof value == 'number' || reIsUint.test(value)) &&
	        (value > -1 && value % 1 == 0 && value < length);
	    }

	    /**
	     * Checks if the given arguments are from an iteratee call.
	     *
	     * @private
	     * @param {*} value The potential iteratee value argument.
	     * @param {*} index The potential iteratee index or key argument.
	     * @param {*} object The potential iteratee object argument.
	     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	     *  else `false`.
	     */
	    function isIterateeCall(value, index, object) {
	      if (!isObject(object)) {
	        return false;
	      }
	      var type = typeof index;
	      if (type == 'number'
	            ? (isArrayLike(object) && isIndex(index, object.length))
	            : (type == 'string' && index in object)
	          ) {
	        return eq(object[index], value);
	      }
	      return false;
	    }

	    /**
	     * Checks if `value` is a property name and not a property path.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {Object} [object] The object to query keys on.
	     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	     */
	    function isKey(value, object) {
	      if (isArray(value)) {
	        return false;
	      }
	      var type = typeof value;
	      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	          value == null || isSymbol(value)) {
	        return true;
	      }
	      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	        (object != null && value in Object(object));
	    }

	    /**
	     * Checks if `value` is suitable for use as unique object key.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	     */
	    function isKeyable(value) {
	      var type = typeof value;
	      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	        ? (value !== '__proto__')
	        : (value === null);
	    }

	    /**
	     * Checks if `func` has a lazy counterpart.
	     *
	     * @private
	     * @param {Function} func The function to check.
	     * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
	     *  else `false`.
	     */
	    function isLaziable(func) {
	      var funcName = getFuncName(func),
	          other = lodash[funcName];

	      if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
	        return false;
	      }
	      if (func === other) {
	        return true;
	      }
	      var data = getData(other);
	      return !!data && func === data[0];
	    }

	    /**
	     * Checks if `func` has its source masked.
	     *
	     * @private
	     * @param {Function} func The function to check.
	     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	     */
	    function isMasked(func) {
	      return !!maskSrcKey && (maskSrcKey in func);
	    }

	    /**
	     * Checks if `func` is capable of being masked.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
	     */
	    var isMaskable = coreJsData ? isFunction : stubFalse;

	    /**
	     * Checks if `value` is likely a prototype object.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	     */
	    function isPrototype(value) {
	      var Ctor = value && value.constructor,
	          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	      return value === proto;
	    }

	    /**
	     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` if suitable for strict
	     *  equality comparisons, else `false`.
	     */
	    function isStrictComparable(value) {
	      return value === value && !isObject(value);
	    }

	    /**
	     * A specialized version of `matchesProperty` for source values suitable
	     * for strict equality comparisons, i.e. `===`.
	     *
	     * @private
	     * @param {string} key The key of the property to get.
	     * @param {*} srcValue The value to match.
	     * @returns {Function} Returns the new spec function.
	     */
	    function matchesStrictComparable(key, srcValue) {
	      return function(object) {
	        if (object == null) {
	          return false;
	        }
	        return object[key] === srcValue &&
	          (srcValue !== undefined || (key in Object(object)));
	      };
	    }

	    /**
	     * A specialized version of `_.memoize` which clears the memoized function's
	     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	     *
	     * @private
	     * @param {Function} func The function to have its output memoized.
	     * @returns {Function} Returns the new memoized function.
	     */
	    function memoizeCapped(func) {
	      var result = memoize(func, function(key) {
	        if (cache.size === MAX_MEMOIZE_SIZE) {
	          cache.clear();
	        }
	        return key;
	      });

	      var cache = result.cache;
	      return result;
	    }

	    /**
	     * Merges the function metadata of `source` into `data`.
	     *
	     * Merging metadata reduces the number of wrappers used to invoke a function.
	     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	     * may be applied regardless of execution order. Methods like `_.ary` and
	     * `_.rearg` modify function arguments, making the order in which they are
	     * executed important, preventing the merging of metadata. However, we make
	     * an exception for a safe combined case where curried functions have `_.ary`
	     * and or `_.rearg` applied.
	     *
	     * @private
	     * @param {Array} data The destination metadata.
	     * @param {Array} source The source metadata.
	     * @returns {Array} Returns `data`.
	     */
	    function mergeData(data, source) {
	      var bitmask = data[1],
	          srcBitmask = source[1],
	          newBitmask = bitmask | srcBitmask,
	          isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

	      var isCombo =
	        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
	        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
	        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

	      // Exit early if metadata can't be merged.
	      if (!(isCommon || isCombo)) {
	        return data;
	      }
	      // Use source `thisArg` if available.
	      if (srcBitmask & WRAP_BIND_FLAG) {
	        data[2] = source[2];
	        // Set when currying a bound function.
	        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
	      }
	      // Compose partial arguments.
	      var value = source[3];
	      if (value) {
	        var partials = data[3];
	        data[3] = partials ? composeArgs(partials, value, source[4]) : value;
	        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
	      }
	      // Compose partial right arguments.
	      value = source[5];
	      if (value) {
	        partials = data[5];
	        data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
	        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
	      }
	      // Use source `argPos` if available.
	      value = source[7];
	      if (value) {
	        data[7] = value;
	      }
	      // Use source `ary` if it's smaller.
	      if (srcBitmask & WRAP_ARY_FLAG) {
	        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
	      }
	      // Use source `arity` if one is not provided.
	      if (data[9] == null) {
	        data[9] = source[9];
	      }
	      // Use source `func` and merge bitmasks.
	      data[0] = source[0];
	      data[1] = newBitmask;

	      return data;
	    }

	    /**
	     * This function is like
	     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	     * except that it includes inherited enumerable properties.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     */
	    function nativeKeysIn(object) {
	      var result = [];
	      if (object != null) {
	        for (var key in Object(object)) {
	          result.push(key);
	        }
	      }
	      return result;
	    }

	    /**
	     * Converts `value` to a string using `Object.prototype.toString`.
	     *
	     * @private
	     * @param {*} value The value to convert.
	     * @returns {string} Returns the converted string.
	     */
	    function objectToString(value) {
	      return nativeObjectToString.call(value);
	    }

	    /**
	     * A specialized version of `baseRest` which transforms the rest array.
	     *
	     * @private
	     * @param {Function} func The function to apply a rest parameter to.
	     * @param {number} [start=func.length-1] The start position of the rest parameter.
	     * @param {Function} transform The rest array transform.
	     * @returns {Function} Returns the new function.
	     */
	    function overRest(func, start, transform) {
	      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	      return function() {
	        var args = arguments,
	            index = -1,
	            length = nativeMax(args.length - start, 0),
	            array = Array(length);

	        while (++index < length) {
	          array[index] = args[start + index];
	        }
	        index = -1;
	        var otherArgs = Array(start + 1);
	        while (++index < start) {
	          otherArgs[index] = args[index];
	        }
	        otherArgs[start] = transform(array);
	        return apply(func, this, otherArgs);
	      };
	    }

	    /**
	     * Gets the parent value at `path` of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array} path The path to get the parent value of.
	     * @returns {*} Returns the parent value.
	     */
	    function parent(object, path) {
	      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
	    }

	    /**
	     * Reorder `array` according to the specified indexes where the element at
	     * the first index is assigned as the first element, the element at
	     * the second index is assigned as the second element, and so on.
	     *
	     * @private
	     * @param {Array} array The array to reorder.
	     * @param {Array} indexes The arranged array indexes.
	     * @returns {Array} Returns `array`.
	     */
	    function reorder(array, indexes) {
	      var arrLength = array.length,
	          length = nativeMin(indexes.length, arrLength),
	          oldArray = copyArray(array);

	      while (length--) {
	        var index = indexes[length];
	        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
	      }
	      return array;
	    }

	    /**
	     * Sets metadata for `func`.
	     *
	     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	     * period of time, it will trip its breaker and transition to an identity
	     * function to avoid garbage collection pauses in V8. See
	     * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
	     * for more details.
	     *
	     * @private
	     * @param {Function} func The function to associate metadata with.
	     * @param {*} data The metadata.
	     * @returns {Function} Returns `func`.
	     */
	    var setData = shortOut(baseSetData);

	    /**
	     * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
	     *
	     * @private
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @returns {number|Object} Returns the timer id or timeout object.
	     */
	    var setTimeout = ctxSetTimeout || function(func, wait) {
	      return root.setTimeout(func, wait);
	    };

	    /**
	     * Sets the `toString` method of `func` to return `string`.
	     *
	     * @private
	     * @param {Function} func The function to modify.
	     * @param {Function} string The `toString` result.
	     * @returns {Function} Returns `func`.
	     */
	    var setToString = shortOut(baseSetToString);

	    /**
	     * Sets the `toString` method of `wrapper` to mimic the source of `reference`
	     * with wrapper details in a comment at the top of the source body.
	     *
	     * @private
	     * @param {Function} wrapper The function to modify.
	     * @param {Function} reference The reference function.
	     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	     * @returns {Function} Returns `wrapper`.
	     */
	    function setWrapToString(wrapper, reference, bitmask) {
	      var source = (reference + '');
	      return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
	    }

	    /**
	     * Creates a function that'll short out and invoke `identity` instead
	     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	     * milliseconds.
	     *
	     * @private
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new shortable function.
	     */
	    function shortOut(func) {
	      var count = 0,
	          lastCalled = 0;

	      return function() {
	        var stamp = nativeNow(),
	            remaining = HOT_SPAN - (stamp - lastCalled);

	        lastCalled = stamp;
	        if (remaining > 0) {
	          if (++count >= HOT_COUNT) {
	            return arguments[0];
	          }
	        } else {
	          count = 0;
	        }
	        return func.apply(undefined, arguments);
	      };
	    }

	    /**
	     * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
	     *
	     * @private
	     * @param {Array} array The array to shuffle.
	     * @param {number} [size=array.length] The size of `array`.
	     * @returns {Array} Returns `array`.
	     */
	    function shuffleSelf(array, size) {
	      var index = -1,
	          length = array.length,
	          lastIndex = length - 1;

	      size = size === undefined ? length : size;
	      while (++index < size) {
	        var rand = baseRandom(index, lastIndex),
	            value = array[rand];

	        array[rand] = array[index];
	        array[index] = value;
	      }
	      array.length = size;
	      return array;
	    }

	    /**
	     * Converts `string` to a property path array.
	     *
	     * @private
	     * @param {string} string The string to convert.
	     * @returns {Array} Returns the property path array.
	     */
	    var stringToPath = memoizeCapped(function(string) {
	      var result = [];
	      if (reLeadingDot.test(string)) {
	        result.push('');
	      }
	      string.replace(rePropName, function(match, number, quote, string) {
	        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	      });
	      return result;
	    });

	    /**
	     * Converts `value` to a string key if it's not a string or symbol.
	     *
	     * @private
	     * @param {*} value The value to inspect.
	     * @returns {string|symbol} Returns the key.
	     */
	    function toKey(value) {
	      if (typeof value == 'string' || isSymbol(value)) {
	        return value;
	      }
	      var result = (value + '');
	      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	    }

	    /**
	     * Converts `func` to its source code.
	     *
	     * @private
	     * @param {Function} func The function to convert.
	     * @returns {string} Returns the source code.
	     */
	    function toSource(func) {
	      if (func != null) {
	        try {
	          return funcToString.call(func);
	        } catch (e) {}
	        try {
	          return (func + '');
	        } catch (e) {}
	      }
	      return '';
	    }

	    /**
	     * Updates wrapper `details` based on `bitmask` flags.
	     *
	     * @private
	     * @returns {Array} details The details to modify.
	     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	     * @returns {Array} Returns `details`.
	     */
	    function updateWrapDetails(details, bitmask) {
	      arrayEach(wrapFlags, function(pair) {
	        var value = '_.' + pair[0];
	        if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
	          details.push(value);
	        }
	      });
	      return details.sort();
	    }

	    /**
	     * Creates a clone of `wrapper`.
	     *
	     * @private
	     * @param {Object} wrapper The wrapper to clone.
	     * @returns {Object} Returns the cloned wrapper.
	     */
	    function wrapperClone(wrapper) {
	      if (wrapper instanceof LazyWrapper) {
	        return wrapper.clone();
	      }
	      var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
	      result.__actions__ = copyArray(wrapper.__actions__);
	      result.__index__  = wrapper.__index__;
	      result.__values__ = wrapper.__values__;
	      return result;
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates an array of elements split into groups the length of `size`.
	     * If `array` can't be split evenly, the final chunk will be the remaining
	     * elements.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to process.
	     * @param {number} [size=1] The length of each chunk
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Array} Returns the new array of chunks.
	     * @example
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 2);
	     * // => [['a', 'b'], ['c', 'd']]
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 3);
	     * // => [['a', 'b', 'c'], ['d']]
	     */
	    function chunk(array, size, guard) {
	      if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
	        size = 1;
	      } else {
	        size = nativeMax(toInteger(size), 0);
	      }
	      var length = array == null ? 0 : array.length;
	      if (!length || size < 1) {
	        return [];
	      }
	      var index = 0,
	          resIndex = 0,
	          result = Array(nativeCeil(length / size));

	      while (index < length) {
	        result[resIndex++] = baseSlice(array, index, (index += size));
	      }
	      return result;
	    }

	    /**
	     * Creates an array with all falsey values removed. The values `false`, `null`,
	     * `0`, `""`, `undefined`, and `NaN` are falsey.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to compact.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.compact([0, 1, false, 2, '', 3]);
	     * // => [1, 2, 3]
	     */
	    function compact(array) {
	      var index = -1,
	          length = array == null ? 0 : array.length,
	          resIndex = 0,
	          result = [];

	      while (++index < length) {
	        var value = array[index];
	        if (value) {
	          result[resIndex++] = value;
	        }
	      }
	      return result;
	    }

	    /**
	     * Creates a new array concatenating `array` with any additional arrays
	     * and/or values.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to concatenate.
	     * @param {...*} [values] The values to concatenate.
	     * @returns {Array} Returns the new concatenated array.
	     * @example
	     *
	     * var array = [1];
	     * var other = _.concat(array, 2, [3], [[4]]);
	     *
	     * console.log(other);
	     * // => [1, 2, 3, [4]]
	     *
	     * console.log(array);
	     * // => [1]
	     */
	    function concat() {
	      var length = arguments.length;
	      if (!length) {
	        return [];
	      }
	      var args = Array(length - 1),
	          array = arguments[0],
	          index = length;

	      while (index--) {
	        args[index - 1] = arguments[index];
	      }
	      return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
	    }

	    /**
	     * Creates an array of `array` values not included in the other given arrays
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * for equality comparisons. The order and references of result values are
	     * determined by the first array.
	     *
	     * **Note:** Unlike `_.pullAll`, this method returns a new array.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {...Array} [values] The values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     * @see _.without, _.xor
	     * @example
	     *
	     * _.difference([2, 1], [2, 3]);
	     * // => [1]
	     */
	    var difference = baseRest(function(array, values) {
	      return isArrayLikeObject(array)
	        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
	        : [];
	    });

	    /**
	     * This method is like `_.difference` except that it accepts `iteratee` which
	     * is invoked for each element of `array` and `values` to generate the criterion
	     * by which they're compared. The order and references of result values are
	     * determined by the first array. The iteratee is invoked with one argument:
	     * (value).
	     *
	     * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {...Array} [values] The values to exclude.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
	     * // => [1.2]
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
	     * // => [{ 'x': 2 }]
	     */
	    var differenceBy = baseRest(function(array, values) {
	      var iteratee = last(values);
	      if (isArrayLikeObject(iteratee)) {
	        iteratee = undefined;
	      }
	      return isArrayLikeObject(array)
	        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
	        : [];
	    });

	    /**
	     * This method is like `_.difference` except that it accepts `comparator`
	     * which is invoked to compare elements of `array` to `values`. The order and
	     * references of result values are determined by the first array. The comparator
	     * is invoked with two arguments: (arrVal, othVal).
	     *
	     * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {...Array} [values] The values to exclude.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
	     *
	     * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
	     * // => [{ 'x': 2, 'y': 1 }]
	     */
	    var differenceWith = baseRest(function(array, values) {
	      var comparator = last(values);
	      if (isArrayLikeObject(comparator)) {
	        comparator = undefined;
	      }
	      return isArrayLikeObject(array)
	        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
	        : [];
	    });

	    /**
	     * Creates a slice of `array` with `n` elements dropped from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.5.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.drop([1, 2, 3]);
	     * // => [2, 3]
	     *
	     * _.drop([1, 2, 3], 2);
	     * // => [3]
	     *
	     * _.drop([1, 2, 3], 5);
	     * // => []
	     *
	     * _.drop([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */
	    function drop(array, n, guard) {
	      var length = array == null ? 0 : array.length;
	      if (!length) {
	        return [];
	      }
	      n = (guard || n === undefined) ? 1 : toInteger(n);
	      return baseSlice(array, n < 0 ? 0 : n, length);
	    }

	    /**
	     * Creates a slice of `array` with `n` elements dropped from the end.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropRight([1, 2, 3]);
	     * // => [1, 2]
	     *
	     * _.dropRight([1, 2, 3], 2);
	     * // => [1]
	     *
	     * _.dropRight([1, 2, 3], 5);
	     * // => []
	     *
	     * _.dropRight([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */
	    function dropRight(array, n, guard) {
	      var length = array == null ? 0 : array.length;
	      if (!length) {
	        return [];
	      }
	      n = (guard || n === undefined) ? 1 : toInteger(n);
	      n = length - n;
	      return baseSlice(array, 0, n < 0 ? 0 : n);
	    }

	    /**
	     * Creates a slice of `array` excluding elements dropped from the end.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * invoked with three arguments: (value, index, array).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * _.dropRightWhile(users, function(o) { return !o.active; });
	     * // => objects for ['barney']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
	     * // => objects for ['barney', 'fred']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.dropRightWhile(users, ['active', false]);
	     * // => objects for ['barney']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.dropRightWhile(users, 'active');
	     * // => objects for ['barney', 'fred', 'pebbles']
	     */
	    function dropRightWhile(array, predicate) {
	      return (array && array.length)
	        ? baseWhile(array, getIteratee(predicate, 3), true, true)
	        : [];
	    }

	    /**
	     * Creates a slice of `array` excluding elements dropped from the beginning.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * invoked with three arguments: (value, index, array).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * _.dropWhile(users, function(o) { return !o.active; });
	     * // => objects for ['pebbles']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.dropWhile(users, { 'user': 'barney', 'active': false });
	     * // => objects for ['fred', 'pebbles']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.dropWhile(users, ['active', false]);
	     * // => objects for ['pebbles']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.dropWhile(users, 'active');
	     * // => objects for ['barney', 'fred', 'pebbles']
	     */
	    function dropWhile(array, predicate) {
	      return (array && array.length)
	        ? baseWhile(array, getIteratee(predicate, 3), true)
	        : [];
	    }

	    /**
	     * Fills elements of `array` with `value` from `start` up to, but not
	     * including, `end`.
	     *
	     * **Note:** This method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.2.0
	     * @category Array
	     * @param {Array} array The array to fill.
	     * @param {*} value The value to fill `array` with.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _.fill(array, 'a');
	     * console.log(array);
	     * // => ['a', 'a', 'a']
	     *
	     * _.fill(Array(3), 2);
	     * // => [2, 2, 2]
	     *
	     * _.fill([4, 6, 8, 10], '*', 1, 3);
	     * // => [4, '*', '*', 10]
	     */
	    function fill(array, value, start, end) {
	      var length = array == null ? 0 : array.length;
	      if (!length) {
	        return [];
	      }
	      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
	        start = 0;
	        end = length;
	      }
	      return baseFill(array, value, start, end);
	    }

	    /**
	     * This method is like `_.find` except that it returns the index of the first
	     * element `predicate` returns truthy for instead of the element itself.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.1.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * _.findIndex(users, function(o) { return o.user == 'barney'; });
	     * // => 0
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.findIndex(users, { 'user': 'fred', 'active': false });
	     * // => 1
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.findIndex(users, ['active', false]);
	     * // => 0
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.findIndex(users, 'active');
	     * // => 2
	     */
	    function findIndex(array, predicate, fromIndex) {
	      var length = array == null ? 0 : array.length;
	      if (!length) {
	        return -1;
	      }
	      var index = fromIndex == null ? 0 : toInteger(fromIndex);
	      if (index < 0) {
	        index = nativeMax(length + index, 0);
	      }
	      return baseFindIndex(array, getIteratee(predicate, 3), index);
	    }

	    /**
	     * This method is like `_.findIndex` except that it iterates over elements
	     * of `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @param {number} [fromIndex=array.length-1] The index to search from.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
	     * // => 2
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
	     * // => 0
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.findLastIndex(users, ['active', false]);
	     * // => 2
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.findLastIndex(users, 'active');
	     * // => 0
	     */
	    function findLastIndex(array, predicate, fromIndex) {
	      var length = array == null ? 0 : array.length;
	      if (!length) {
	        return -1;
	      }
	      var index = length - 1;
	      if (fromIndex !== undefined) {
	        index = toInteger(fromIndex);
	        index = fromIndex < 0
	          ? nativeMax(length + index, 0)
	          : nativeMin(index, length - 1);
	      }
	      return baseFindIndex(array, getIteratee(predicate, 3), index, true);
	    }

	    /**
	     * Flattens `array` a single level deep.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to flatten.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flatten([1, [2, [3, [4]], 5]]);
	     * // => [1, 2, [3, [4]], 5]
	     */
	    function flatten(array) {
	      var length = array == null ? 0 : array.length;
	      return length ? baseFlatten(array, 1) : [];
	    }

	    /**
	     * Recursively flattens `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to flatten.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flattenDeep([1, [2, [3, [4]], 5]]);
	     * // => [1, 2, 3, 4, 5]
	     */
	    function flattenDeep(array) {
	      var length = array == null ? 0 : array.length;
	      return length ? baseFlatten(array, INFINITY) : [];
	    }

	    /**
	     * Recursively flatten `array` up to `depth` times.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.4.0
	     * @category Array
	     * @param {Array} array The array to flatten.
	     * @param {number} [depth=1] The maximum recursion depth.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * var array = [1, [2, [3, [4]], 5]];
	     *
	     * _.flattenDepth(array, 1);
	     * // => [1, 2, [3, [4]], 5]
	     *
	     * _.flattenDepth(array, 2);
	     * // => [1, 2, 3, [4], 5]
	     */
	    function flattenDepth(array, depth) {
	      var length = array == null ? 0 : array.length;
	      if (!length) {
	        return [];
	      }
	      depth = depth === undefined ? 1 : toInteger(depth);
	      return baseFlatten(array, depth);
	    }

	    /**
	     * The inverse of `_.toPairs`; this method returns an object composed
	     * from key-value `pairs`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} pairs The key-value pairs.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * _.fromPairs([['a', 1], ['b', 2]]);
	     * // => { 'a': 1, 'b': 2 }
	     */
	    function fromPairs(pairs) {
	      var index = -1,
	          length = pairs == null ? 0 : pairs.length,
	          result = {};

	      while (++index < length) {
	        var pair = pairs[index];
	        result[pair[0]] = pair[1];
	      }
	      return result;
	    }

	    /**
	     * Gets the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @alias first
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the first element of `array`.
	     * @example
	     *
	     * _.head([1, 2, 3]);
	     * // => 1
	     *
	     * _.head([]);
	     * // => undefined
	     */
	    function head(array) {
	      return (array && array.length) ? array[0] : undefined;
	    }

	    /**
	     * Gets the index at which the first occurrence of `value` is found in `array`
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * for equality comparisons. If `fromIndex` is negative, it's used as the
	     * offset from the end of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {*} value The value to search for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.indexOf([1, 2, 1, 2], 2);
	     * // => 1
	     *
	     * // Search from the `fromIndex`.
	     * _.indexOf([1, 2, 1, 2], 2, 2);
	     * // => 3
	     */
	    function indexOf(array, value, fromIndex) {
	      var length = array == null ? 0 : array.length;
	      if (!length) {
	        return -1;
	      }
	      var index = fromIndex == null ? 0 : toInteger(fromIndex);
	      if (index < 0) {
	        index = nativeMax(length + index, 0);
	      }
	      return baseIndexOf(array, value, index);
	    }

	    /**
	     * Gets all but the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.initial([1, 2, 3]);
	     * // => [1, 2]
	     */
	    function initial(array) {
	      var length = array == null ? 0 : array.length;
	      return length ? baseSlice(array, 0, -1) : [];
	    }

	    /**
	     * Creates an array of unique values that are included in all given arrays
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * for equality comparisons. The order and references of result values are
	     * determined by the first array.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of intersecting values.
	     * @example
	     *
	     * _.intersection([2, 1], [2, 3]);
	     * // => [2]
	     */
	    var intersection = baseRest(function(arrays) {
	      var mapped = arrayMap(arrays, castArrayLikeObject);
	      return (mapped.length && mapped[0] === arrays[0])
	        ? baseIntersection(mapped)
	        : [];
	    });

	    /**
	     * This method is like `_.intersection` except that it accepts `iteratee`
	     * which is invoked for each element of each `arrays` to generate the criterion
	     * by which they're compared. The order and references of result values are
	     * determined by the first array. The iteratee is invoked with one argument:
	     * (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {Array} Returns the new array of intersecting values.
	     * @example
	     *
	     * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
	     * // => [2.1]
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 1 }]
	     */
	    var intersectionBy = baseRest(function(arrays) {
	      var iteratee = last(arrays),
	          mapped = arrayMap(arrays, castArrayLikeObject);

	      if (iteratee === last(mapped)) {
	        iteratee = undefined;
	      } else {
	        mapped.pop();
	      }
	      return (mapped.length && mapped[0] === arrays[0])
	        ? baseIntersection(mapped, getIteratee(iteratee, 2))
	        : [];
	    });

	    /**
	     * This method is like `_.intersection` except that it accepts `comparator`
	     * which is invoked to compare elements of `arrays`. The order and references
	     * of result values are determined by the first array. The comparator is
	     * invoked with two arguments: (arrVal, othVal).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new array of intersecting values.
	     * @example
	     *
	     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
	     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
	     *
	     * _.intersectionWith(objects, others, _.isEqual);
	     * // => [{ 'x': 1, 'y': 2 }]
	     */
	    var intersectionWith = baseRest(function(arrays) {
	      var comparator = last(arrays),
	          mapped = arrayMap(arrays, castArrayLikeObject);

	      comparator = typeof comparator == 'function' ? comparator : undefined;
	      if (comparator) {
	        mapped.pop();
	      }
	      return (mapped.length && mapped[0] === arrays[0])
	        ? baseIntersection(mapped, undefined, comparator)
	        : [];
	    });

	    /**
	     * Converts all elements in `array` into a string separated by `separator`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to convert.
	     * @param {string} [separator=','] The element separator.
	     * @returns {string} Returns the joined string.
	     * @example
	     *
	     * _.join(['a', 'b', 'c'], '~');
	     * // => 'a~b~c'
	     */
	    function join(array, separator) {
	      return array == null ? '' : nativeJoin.call(array, separator);
	    }

	    /**
	     * Gets the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the last element of `array`.
	     * @example
	     *
	     * _.last([1, 2, 3]);
	     * // => 3
	     */
	    function last(array) {
	      var length = array == null ? 0 : array.length;
	      return length ? array[length - 1] : undefined;
	    }

	    /**
	     * This method is like `_.indexOf` except that it iterates over elements of
	     * `array` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {*} value The value to search for.
	     * @param {number} [fromIndex=array.length-1] The index to search from.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.lastIndexOf([1, 2, 1, 2], 2);
	     * // => 3
	     *
	     * // Search from the `fromIndex`.
	     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
	     * // => 1
	     */
	    function lastIndexOf(array, value, fromIndex) {
	      var length = array == null ? 0 : array.length;
	      if (!length) {
	        return -1;
	      }
	      var index = length;
	      if (fromIndex !== undefined) {
	        index = toInteger(fromIndex);
	        index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
	      }
	      return value === value
	        ? strictLastIndexOf(array, value, index)
	        : baseFindIndex(array, baseIsNaN, index, true);
	    }

	    /**
	     * Gets the element at index `n` of `array`. If `n` is negative, the nth
	     * element from the end is returned.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.11.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=0] The index of the element to return.
	     * @returns {*} Returns the nth element of `array`.
	     * @example
	     *
	     * var array = ['a', 'b', 'c', 'd'];
	     *
	     * _.nth(array, 1);
	     * // => 'b'
	     *
	     * _.nth(array, -2);
	     * // => 'c';
	     */
	    function nth(array, n) {
	      return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
	    }

	    /**
	     * Removes all given values from `array` using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
	     * to remove elements from an array by predicate.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {...*} [values] The values to remove.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
	     *
	     * _.pull(array, 'a', 'c');
	     * console.log(array);
	     * // => ['b', 'b']
	     */
	    var pull = baseRest(pullAll);

	    /**
	     * This method is like `_.pull` except that it accepts an array of values to remove.
	     *
	     * **Note:** Unlike `_.difference`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to remove.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
	     *
	     * _.pullAll(array, ['a', 'c']);
	     * console.log(array);
	     * // => ['b', 'b']
	     */
	    function pullAll(array, values) {
	      return (array && array.length && values && values.length)
	        ? basePullAll(array, values)
	        : array;
	    }

	    /**
	     * This method is like `_.pullAll` except that it accepts `iteratee` which is
	     * invoked for each element of `array` and `values` to generate the criterion
	     * by which they're compared. The iteratee is invoked with one argument: (value).
	     *
	     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to remove.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
	     *
	     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
	     * console.log(array);
	     * // => [{ 'x': 2 }]
	     */
	    function pullAllBy(array, values, iteratee) {
	      return (array && array.length && values && values.length)
	        ? basePullAll(array, values, getIteratee(iteratee, 2))
	        : array;
	    }

	    /**
	     * This method is like `_.pullAll` except that it accepts `comparator` which
	     * is invoked to compare elements of `array` to `values`. The comparator is
	     * invoked with two arguments: (arrVal, othVal).
	     *
	     * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.6.0
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to remove.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
	     *
	     * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
	     * console.log(array);
	     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
	     */
	    function pullAllWith(array, values, comparator) {
	      return (array && array.length && values && values.length)
	        ? basePullAll(array, values, undefined, comparator)
	        : array;
	    }

	    /**
	     * Removes elements from `array` corresponding to `indexes` and returns an
	     * array of removed elements.
	     *
	     * **Note:** Unlike `_.at`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {...(number|number[])} [indexes] The indexes of elements to remove.
	     * @returns {Array} Returns the new array of removed elements.
	     * @example
	     *
	     * var array = ['a', 'b', 'c', 'd'];
	     * var pulled = _.pullAt(array, [1, 3]);
	     *
	     * console.log(array);
	     * // => ['a', 'c']
	     *
	     * console.log(pulled);
	     * // => ['b', 'd']
	     */
	    var pullAt = flatRest(function(array, indexes) {
	      var length = array == null ? 0 : array.length,
	          result = baseAt(array, indexes);

	      basePullAt(array, arrayMap(indexes, function(index) {
	        return isIndex(index, length) ? +index : index;
	      }).sort(compareAscending));

	      return result;
	    });

	    /**
	     * Removes all elements from `array` that `predicate` returns truthy for
	     * and returns an array of the removed elements. The predicate is invoked
	     * with three arguments: (value, index, array).
	     *
	     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
	     * to pull elements from an array by value.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new array of removed elements.
	     * @example
	     *
	     * var array = [1, 2, 3, 4];
	     * var evens = _.remove(array, function(n) {
	     *   return n % 2 == 0;
	     * });
	     *
	     * console.log(array);
	     * // => [1, 3]
	     *
	     * console.log(evens);
	     * // => [2, 4]
	     */
	    function remove(array, predicate) {
	      var result = [];
	      if (!(array && array.length)) {
	        return result;
	      }
	      var index = -1,
	          indexes = [],
	          length = array.length;

	      predicate = getIteratee(predicate, 3);
	      while (++index < length) {
	        var value = array[index];
	        if (predicate(value, index, array)) {
	          result.push(value);
	          indexes.push(index);
	        }
	      }
	      basePullAt(array, indexes);
	      return result;
	    }

	    /**
	     * Reverses `array` so that the first element becomes the last, the second
	     * element becomes the second to last, and so on.
	     *
	     * **Note:** This method mutates `array` and is based on
	     * [`Array#reverse`](https://mdn.io/Array/reverse).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _.reverse(array);
	     * // => [3, 2, 1]
	     *
	     * console.log(array);
	     * // => [3, 2, 1]
	     */
	    function reverse(array) {
	      return array == null ? array : nativeReverse.call(array);
	    }

	    /**
	     * Creates a slice of `array` from `start` up to, but not including, `end`.
	     *
	     * **Note:** This method is used instead of
	     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
	     * returned.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */
	    function slice(array, start, end) {
	      var length = array == null ? 0 : array.length;
	      if (!length) {
	        return [];
	      }
	      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
	        start = 0;
	        end = length;
	      }
	      else {
	        start = start == null ? 0 : toInteger(start);
	        end = end === undefined ? length : toInteger(end);
	      }
	      return baseSlice(array, start, end);
	    }

	    /**
	     * Uses a binary search to determine the lowest index at which `value`
	     * should be inserted into `array` in order to maintain its sort order.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedIndex([30, 50], 40);
	     * // => 1
	     */
	    function sortedIndex(array, value) {
	      return baseSortedIndex(array, value);
	    }

	    /**
	     * This method is like `_.sortedIndex` except that it accepts `iteratee`
	     * which is invoked for `value` and each element of `array` to compute their
	     * sort ranking. The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * var objects = [{ 'x': 4 }, { 'x': 5 }];
	     *
	     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
	     * // => 0
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
	     * // => 0
	     */
	    function sortedIndexBy(array, value, iteratee) {
	      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
	    }

	    /**
	     * This method is like `_.indexOf` except that it performs a binary
	     * search on a sorted `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {*} value The value to search for.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
	     * // => 1
	     */
	    function sortedIndexOf(array, value) {
	      var length = array == null ? 0 : array.length;
	      if (length) {
	        var index = baseSortedIndex(array, value);
	        if (index < length && eq(array[index], value)) {
	          return index;
	        }
	      }
	      return -1;
	    }

	    /**
	     * This method is like `_.sortedIndex` except that it returns the highest
	     * index at which `value` should be inserted into `array` in order to
	     * maintain its sort order.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
	     * // => 4
	     */
	    function sortedLastIndex(array, value) {
	      return baseSortedIndex(array, value, true);
	    }

	    /**
	     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
	     * which is invoked for `value` and each element of `array` to compute their
	     * sort ranking. The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * var objects = [{ 'x': 4 }, { 'x': 5 }];
	     *
	     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
	     * // => 1
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
	     * // => 1
	     */
	    function sortedLastIndexBy(array, value, iteratee) {
	      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
	    }

	    /**
	     * This method is like `_.lastIndexOf` except that it performs a binary
	     * search on a sorted `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {*} value The value to search for.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
	     * // => 3
	     */
	    function sortedLastIndexOf(array, value) {
	      var length = array == null ? 0 : array.length;
	      if (length) {
	        var index = baseSortedIndex(array, value, true) - 1;
	        if (eq(array[index], value)) {
	          return index;
	        }
	      }
	      return -1;
	    }

	    /**
	     * This method is like `_.uniq` except that it's designed and optimized
	     * for sorted arrays.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * _.sortedUniq([1, 1, 2]);
	     * // => [1, 2]
	     */
	    function sortedUniq(array) {
	      return (array && array.length)
	        ? baseSortedUniq(array)
	        : [];
	    }

	    /**
	     * This method is like `_.uniqBy` except that it's designed and optimized
	     * for sorted arrays.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
	     * // => [1.1, 2.3]
	     */
	    function sortedUniqBy(array, iteratee) {
	      return (array && array.length)
	        ? baseSortedUniq(array, getIteratee(iteratee, 2))
	        : [];
	    }

	    /**
	     * Gets all but the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.tail([1, 2, 3]);
	     * // => [2, 3]
	     */
	    function tail(array) {
	      var length = array == null ? 0 : array.length;
	      return length ? baseSlice(array, 1, length) : [];
	    }

	    /**
	     * Creates a slice of `array` with `n` elements taken from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.take([1, 2, 3]);
	     * // => [1]
	     *
	     * _.take([1, 2, 3], 2);
	     * // => [1, 2]
	     *
	     * _.take([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.take([1, 2, 3], 0);
	     * // => []
	     */
	    function take(array, n, guard) {
	      if (!(array && array.length)) {
	        return [];
	      }
	      n = (guard || n === undefined) ? 1 : toInteger(n);
	      return baseSlice(array, 0, n < 0 ? 0 : n);
	    }

	    /**
	     * Creates a slice of `array` with `n` elements taken from the end.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeRight([1, 2, 3]);
	     * // => [3]
	     *
	     * _.takeRight([1, 2, 3], 2);
	     * // => [2, 3]
	     *
	     * _.takeRight([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.takeRight([1, 2, 3], 0);
	     * // => []
	     */
	    function takeRight(array, n, guard) {
	      var length = array == null ? 0 : array.length;
	      if (!length) {
	        return [];
	      }
	      n = (guard || n === undefined) ? 1 : toInteger(n);
	      n = length - n;
	      return baseSlice(array, n < 0 ? 0 : n, length);
	    }

	    /**
	     * Creates a slice of `array` with elements taken from the end. Elements are
	     * taken until `predicate` returns falsey. The predicate is invoked with
	     * three arguments: (value, index, array).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * _.takeRightWhile(users, function(o) { return !o.active; });
	     * // => objects for ['fred', 'pebbles']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
	     * // => objects for ['pebbles']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.takeRightWhile(users, ['active', false]);
	     * // => objects for ['fred', 'pebbles']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.takeRightWhile(users, 'active');
	     * // => []
	     */
	    function takeRightWhile(array, predicate) {
	      return (array && array.length)
	        ? baseWhile(array, getIteratee(predicate, 3), false, true)
	        : [];
	    }

	    /**
	     * Creates a slice of `array` with elements taken from the beginning. Elements
	     * are taken until `predicate` returns falsey. The predicate is invoked with
	     * three arguments: (value, index, array).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * _.takeWhile(users, function(o) { return !o.active; });
	     * // => objects for ['barney', 'fred']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.takeWhile(users, { 'user': 'barney', 'active': false });
	     * // => objects for ['barney']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.takeWhile(users, ['active', false]);
	     * // => objects for ['barney', 'fred']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.takeWhile(users, 'active');
	     * // => []
	     */
	    function takeWhile(array, predicate) {
	      return (array && array.length)
	        ? baseWhile(array, getIteratee(predicate, 3))
	        : [];
	    }

	    /**
	     * Creates an array of unique values, in order, from all given arrays using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of combined values.
	     * @example
	     *
	     * _.union([2], [1, 2]);
	     * // => [2, 1]
	     */
	    var union = baseRest(function(arrays) {
	      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
	    });

	    /**
	     * This method is like `_.union` except that it accepts `iteratee` which is
	     * invoked for each element of each `arrays` to generate the criterion by
	     * which uniqueness is computed. Result values are chosen from the first
	     * array in which the value occurs. The iteratee is invoked with one argument:
	     * (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {Array} Returns the new array of combined values.
	     * @example
	     *
	     * _.unionBy([2.1], [1.2, 2.3], Math.floor);
	     * // => [2.1, 1.2]
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 1 }, { 'x': 2 }]
	     */
	    var unionBy = baseRest(function(arrays) {
	      var iteratee = last(arrays);
	      if (isArrayLikeObject(iteratee)) {
	        iteratee = undefined;
	      }
	      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
	    });

	    /**
	     * This method is like `_.union` except that it accepts `comparator` which
	     * is invoked to compare elements of `arrays`. Result values are chosen from
	     * the first array in which the value occurs. The comparator is invoked
	     * with two arguments: (arrVal, othVal).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new array of combined values.
	     * @example
	     *
	     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
	     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
	     *
	     * _.unionWith(objects, others, _.isEqual);
	     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
	     */
	    var unionWith = baseRest(function(arrays) {
	      var comparator = last(arrays);
	      comparator = typeof comparator == 'function' ? comparator : undefined;
	      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
	    });

	    /**
	     * Creates a duplicate-free version of an array, using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * for equality comparisons, in which only the first occurrence of each element
	     * is kept. The order of result values is determined by the order they occur
	     * in the array.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * _.uniq([2, 1, 2]);
	     * // => [2, 1]
	     */
	    function uniq(array) {
	      return (array && array.length) ? baseUniq(array) : [];
	    }

	    /**
	     * This method is like `_.uniq` except that it accepts `iteratee` which is
	     * invoked for each element in `array` to generate the criterion by which
	     * uniqueness is computed. The order of result values is determined by the
	     * order they occur in the array. The iteratee is invoked with one argument:
	     * (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
	     * // => [2.1, 1.2]
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 1 }, { 'x': 2 }]
	     */
	    function uniqBy(array, iteratee) {
	      return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
	    }

	    /**
	     * This method is like `_.uniq` except that it accepts `comparator` which
	     * is invoked to compare elements of `array`. The order of result values is
	     * determined by the order they occur in the array.The comparator is invoked
	     * with two arguments: (arrVal, othVal).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
	     *
	     * _.uniqWith(objects, _.isEqual);
	     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
	     */
	    function uniqWith(array, comparator) {
	      comparator = typeof comparator == 'function' ? comparator : undefined;
	      return (array && array.length) ? baseUniq(array, undefined, comparator) : [];
	    }

	    /**
	     * This method is like `_.zip` except that it accepts an array of grouped
	     * elements and creates an array regrouping the elements to their pre-zip
	     * configuration.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.2.0
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
	     * // => [['a', 1, true], ['b', 2, false]]
	     *
	     * _.unzip(zipped);
	     * // => [['a', 'b'], [1, 2], [true, false]]
	     */
	    function unzip(array) {
	      if (!(array && array.length)) {
	        return [];
	      }
	      var length = 0;
	      array = arrayFilter(array, function(group) {
	        if (isArrayLikeObject(group)) {
	          length = nativeMax(group.length, length);
	          return true;
	        }
	      });
	      return baseTimes(length, function(index) {
	        return arrayMap(array, baseProperty(index));
	      });
	    }

	    /**
	     * This method is like `_.unzip` except that it accepts `iteratee` to specify
	     * how regrouped values should be combined. The iteratee is invoked with the
	     * elements of each group: (...group).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.8.0
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @param {Function} [iteratee=_.identity] The function to combine
	     *  regrouped values.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
	     * // => [[1, 10, 100], [2, 20, 200]]
	     *
	     * _.unzipWith(zipped, _.add);
	     * // => [3, 30, 300]
	     */
	    function unzipWith(array, iteratee) {
	      if (!(array && array.length)) {
	        return [];
	      }
	      var result = unzip(array);
	      if (iteratee == null) {
	        return result;
	      }
	      return arrayMap(result, function(group) {
	        return apply(iteratee, undefined, group);
	      });
	    }

	    /**
	     * Creates an array excluding all given values using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * **Note:** Unlike `_.pull`, this method returns a new array.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {...*} [values] The values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     * @see _.difference, _.xor
	     * @example
	     *
	     * _.without([2, 1, 2, 3], 1, 2);
	     * // => [3]
	     */
	    var without = baseRest(function(array, values) {
	      return isArrayLikeObject(array)
	        ? baseDifference(array, values)
	        : [];
	    });

	    /**
	     * Creates an array of unique values that is the
	     * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
	     * of the given arrays. The order of result values is determined by the order
	     * they occur in the arrays.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.4.0
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of filtered values.
	     * @see _.difference, _.without
	     * @example
	     *
	     * _.xor([2, 1], [2, 3]);
	     * // => [1, 3]
	     */
	    var xor = baseRest(function(arrays) {
	      return baseXor(arrayFilter(arrays, isArrayLikeObject));
	    });

	    /**
	     * This method is like `_.xor` except that it accepts `iteratee` which is
	     * invoked for each element of each `arrays` to generate the criterion by
	     * which by which they're compared. The order of result values is determined
	     * by the order they occur in the arrays. The iteratee is invoked with one
	     * argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
	     * // => [1.2, 3.4]
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 2 }]
	     */
	    var xorBy = baseRest(function(arrays) {
	      var iteratee = last(arrays);
	      if (isArrayLikeObject(iteratee)) {
	        iteratee = undefined;
	      }
	      return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
	    });

	    /**
	     * This method is like `_.xor` except that it accepts `comparator` which is
	     * invoked to compare elements of `arrays`. The order of result values is
	     * determined by the order they occur in the arrays. The comparator is invoked
	     * with two arguments: (arrVal, othVal).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
	     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
	     *
	     * _.xorWith(objects, others, _.isEqual);
	     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
	     */
	    var xorWith = baseRest(function(arrays) {
	      var comparator = last(arrays);
	      comparator = typeof comparator == 'function' ? comparator : undefined;
	      return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
	    });

	    /**
	     * Creates an array of grouped elements, the first of which contains the
	     * first elements of the given arrays, the second of which contains the
	     * second elements of the given arrays, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {...Array} [arrays] The arrays to process.
	     * @returns {Array} Returns the new array of grouped elements.
	     * @example
	     *
	     * _.zip(['a', 'b'], [1, 2], [true, false]);
	     * // => [['a', 1, true], ['b', 2, false]]
	     */
	    var zip = baseRest(unzip);

	    /**
	     * This method is like `_.fromPairs` except that it accepts two arrays,
	     * one of property identifiers and one of corresponding values.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.4.0
	     * @category Array
	     * @param {Array} [props=[]] The property identifiers.
	     * @param {Array} [values=[]] The property values.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * _.zipObject(['a', 'b'], [1, 2]);
	     * // => { 'a': 1, 'b': 2 }
	     */
	    function zipObject(props, values) {
	      return baseZipObject(props || [], values || [], assignValue);
	    }

	    /**
	     * This method is like `_.zipObject` except that it supports property paths.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.1.0
	     * @category Array
	     * @param {Array} [props=[]] The property identifiers.
	     * @param {Array} [values=[]] The property values.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
	     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
	     */
	    function zipObjectDeep(props, values) {
	      return baseZipObject(props || [], values || [], baseSet);
	    }

	    /**
	     * This method is like `_.zip` except that it accepts `iteratee` to specify
	     * how grouped values should be combined. The iteratee is invoked with the
	     * elements of each group: (...group).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.8.0
	     * @category Array
	     * @param {...Array} [arrays] The arrays to process.
	     * @param {Function} [iteratee=_.identity] The function to combine
	     *  grouped values.
	     * @returns {Array} Returns the new array of grouped elements.
	     * @example
	     *
	     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
	     *   return a + b + c;
	     * });
	     * // => [111, 222]
	     */
	    var zipWith = baseRest(function(arrays) {
	      var length = arrays.length,
	          iteratee = length > 1 ? arrays[length - 1] : undefined;

	      iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
	      return unzipWith(arrays, iteratee);
	    });

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a `lodash` wrapper instance that wraps `value` with explicit method
	     * chain sequences enabled. The result of such sequences must be unwrapped
	     * with `_#value`.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.3.0
	     * @category Seq
	     * @param {*} value The value to wrap.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36 },
	     *   { 'user': 'fred',    'age': 40 },
	     *   { 'user': 'pebbles', 'age': 1 }
	     * ];
	     *
	     * var youngest = _
	     *   .chain(users)
	     *   .sortBy('age')
	     *   .map(function(o) {
	     *     return o.user + ' is ' + o.age;
	     *   })
	     *   .head()
	     *   .value();
	     * // => 'pebbles is 1'
	     */
	    function chain(value) {
	      var result = lodash(value);
	      result.__chain__ = true;
	      return result;
	    }

	    /**
	     * This method invokes `interceptor` and returns `value`. The interceptor
	     * is invoked with one argument; (value). The purpose of this method is to
	     * "tap into" a method chain sequence in order to modify intermediate results.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Seq
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * _([1, 2, 3])
	     *  .tap(function(array) {
	     *    // Mutate input array.
	     *    array.pop();
	     *  })
	     *  .reverse()
	     *  .value();
	     * // => [2, 1]
	     */
	    function tap(value, interceptor) {
	      interceptor(value);
	      return value;
	    }

	    /**
	     * This method is like `_.tap` except that it returns the result of `interceptor`.
	     * The purpose of this method is to "pass thru" values replacing intermediate
	     * results in a method chain sequence.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Seq
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @returns {*} Returns the result of `interceptor`.
	     * @example
	     *
	     * _('  abc  ')
	     *  .chain()
	     *  .trim()
	     *  .thru(function(value) {
	     *    return [value];
	     *  })
	     *  .value();
	     * // => ['abc']
	     */
	    function thru(value, interceptor) {
	      return interceptor(value);
	    }

	    /**
	     * This method is the wrapper version of `_.at`.
	     *
	     * @name at
	     * @memberOf _
	     * @since 1.0.0
	     * @category Seq
	     * @param {...(string|string[])} [paths] The property paths to pick.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
	     *
	     * _(object).at(['a[0].b.c', 'a[1]']).value();
	     * // => [3, 4]
	     */
	    var wrapperAt = flatRest(function(paths) {
	      var length = paths.length,
	          start = length ? paths[0] : 0,
	          value = this.__wrapped__,
	          interceptor = function(object) { return baseAt(object, paths); };

	      if (length > 1 || this.__actions__.length ||
	          !(value instanceof LazyWrapper) || !isIndex(start)) {
	        return this.thru(interceptor);
	      }
	      value = value.slice(start, +start + (length ? 1 : 0));
	      value.__actions__.push({
	        'func': thru,
	        'args': [interceptor],
	        'thisArg': undefined
	      });
	      return new LodashWrapper(value, this.__chain__).thru(function(array) {
	        if (length && !array.length) {
	          array.push(undefined);
	        }
	        return array;
	      });
	    });

	    /**
	     * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
	     *
	     * @name chain
	     * @memberOf _
	     * @since 0.1.0
	     * @category Seq
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // A sequence without explicit chaining.
	     * _(users).head();
	     * // => { 'user': 'barney', 'age': 36 }
	     *
	     * // A sequence with explicit chaining.
	     * _(users)
	     *   .chain()
	     *   .head()
	     *   .pick('user')
	     *   .value();
	     * // => { 'user': 'barney' }
	     */
	    function wrapperChain() {
	      return chain(this);
	    }

	    /**
	     * Executes the chain sequence and returns the wrapped result.
	     *
	     * @name commit
	     * @memberOf _
	     * @since 3.2.0
	     * @category Seq
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2];
	     * var wrapped = _(array).push(3);
	     *
	     * console.log(array);
	     * // => [1, 2]
	     *
	     * wrapped = wrapped.commit();
	     * console.log(array);
	     * // => [1, 2, 3]
	     *
	     * wrapped.last();
	     * // => 3
	     *
	     * console.log(array);
	     * // => [1, 2, 3]
	     */
	    function wrapperCommit() {
	      return new LodashWrapper(this.value(), this.__chain__);
	    }

	    /**
	     * Gets the next value on a wrapped object following the
	     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
	     *
	     * @name next
	     * @memberOf _
	     * @since 4.0.0
	     * @category Seq
	     * @returns {Object} Returns the next iterator value.
	     * @example
	     *
	     * var wrapped = _([1, 2]);
	     *
	     * wrapped.next();
	     * // => { 'done': false, 'value': 1 }
	     *
	     * wrapped.next();
	     * // => { 'done': false, 'value': 2 }
	     *
	     * wrapped.next();
	     * // => { 'done': true, 'value': undefined }
	     */
	    function wrapperNext() {
	      if (this.__values__ === undefined) {
	        this.__values__ = toArray(this.value());
	      }
	      var done = this.__index__ >= this.__values__.length,
	          value = done ? undefined : this.__values__[this.__index__++];

	      return { 'done': done, 'value': value };
	    }

	    /**
	     * Enables the wrapper to be iterable.
	     *
	     * @name Symbol.iterator
	     * @memberOf _
	     * @since 4.0.0
	     * @category Seq
	     * @returns {Object} Returns the wrapper object.
	     * @example
	     *
	     * var wrapped = _([1, 2]);
	     *
	     * wrapped[Symbol.iterator]() === wrapped;
	     * // => true
	     *
	     * Array.from(wrapped);
	     * // => [1, 2]
	     */
	    function wrapperToIterator() {
	      return this;
	    }

	    /**
	     * Creates a clone of the chain sequence planting `value` as the wrapped value.
	     *
	     * @name plant
	     * @memberOf _
	     * @since 3.2.0
	     * @category Seq
	     * @param {*} value The value to plant.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var wrapped = _([1, 2]).map(square);
	     * var other = wrapped.plant([3, 4]);
	     *
	     * other.value();
	     * // => [9, 16]
	     *
	     * wrapped.value();
	     * // => [1, 4]
	     */
	    function wrapperPlant(value) {
	      var result,
	          parent = this;

	      while (parent instanceof baseLodash) {
	        var clone = wrapperClone(parent);
	        clone.__index__ = 0;
	        clone.__values__ = undefined;
	        if (result) {
	          previous.__wrapped__ = clone;
	        } else {
	          result = clone;
	        }
	        var previous = clone;
	        parent = parent.__wrapped__;
	      }
	      previous.__wrapped__ = value;
	      return result;
	    }

	    /**
	     * This method is the wrapper version of `_.reverse`.
	     *
	     * **Note:** This method mutates the wrapped array.
	     *
	     * @name reverse
	     * @memberOf _
	     * @since 0.1.0
	     * @category Seq
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _(array).reverse().value()
	     * // => [3, 2, 1]
	     *
	     * console.log(array);
	     * // => [3, 2, 1]
	     */
	    function wrapperReverse() {
	      var value = this.__wrapped__;
	      if (value instanceof LazyWrapper) {
	        var wrapped = value;
	        if (this.__actions__.length) {
	          wrapped = new LazyWrapper(this);
	        }
	        wrapped = wrapped.reverse();
	        wrapped.__actions__.push({
	          'func': thru,
	          'args': [reverse],
	          'thisArg': undefined
	        });
	        return new LodashWrapper(wrapped, this.__chain__);
	      }
	      return this.thru(reverse);
	    }

	    /**
	     * Executes the chain sequence to resolve the unwrapped value.
	     *
	     * @name value
	     * @memberOf _
	     * @since 0.1.0
	     * @alias toJSON, valueOf
	     * @category Seq
	     * @returns {*} Returns the resolved unwrapped value.
	     * @example
	     *
	     * _([1, 2, 3]).value();
	     * // => [1, 2, 3]
	     */
	    function wrapperValue() {
	      return baseWrapperValue(this.__wrapped__, this.__actions__);
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` thru `iteratee`. The corresponding value of
	     * each key is the number of times the key was returned by `iteratee`. The
	     * iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 0.5.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.countBy([6.1, 4.2, 6.3], Math.floor);
	     * // => { '4': 1, '6': 2 }
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.countBy(['one', 'two', 'three'], 'length');
	     * // => { '3': 2, '5': 1 }
	     */
	    var countBy = createAggregator(function(result, value, key) {
	      if (hasOwnProperty.call(result, key)) {
	        ++result[key];
	      } else {
	        baseAssignValue(result, key, 1);
	      }
	    });

	    /**
	     * Checks if `predicate` returns truthy for **all** elements of `collection`.
	     * Iteration is stopped once `predicate` returns falsey. The predicate is
	     * invoked with three arguments: (value, index|key, collection).
	     *
	     * **Note:** This method returns `true` for
	     * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
	     * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
	     * elements of empty collections.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`.
	     * @example
	     *
	     * _.every([true, 1, null, 'yes'], Boolean);
	     * // => false
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.every(users, { 'user': 'barney', 'active': false });
	     * // => false
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.every(users, ['active', false]);
	     * // => true
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.every(users, 'active');
	     * // => false
	     */
	    function every(collection, predicate, guard) {
	      var func = isArray(collection) ? arrayEvery : baseEvery;
	      if (guard && isIterateeCall(collection, predicate, guard)) {
	        predicate = undefined;
	      }
	      return func(collection, getIteratee(predicate, 3));
	    }

	    /**
	     * Iterates over elements of `collection`, returning an array of all elements
	     * `predicate` returns truthy for. The predicate is invoked with three
	     * arguments: (value, index|key, collection).
	     *
	     * **Note:** Unlike `_.remove`, this method returns a new array.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     * @see _.reject
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * _.filter(users, function(o) { return !o.active; });
	     * // => objects for ['fred']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.filter(users, { 'age': 36, 'active': true });
	     * // => objects for ['barney']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.filter(users, ['active', false]);
	     * // => objects for ['fred']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.filter(users, 'active');
	     * // => objects for ['barney']
	     */
	    function filter(collection, predicate) {
	      var func = isArray(collection) ? arrayFilter : baseFilter;
	      return func(collection, getIteratee(predicate, 3));
	    }

	    /**
	     * Iterates over elements of `collection`, returning the first element
	     * `predicate` returns truthy for. The predicate is invoked with three
	     * arguments: (value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to inspect.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': true },
	     *   { 'user': 'fred',    'age': 40, 'active': false },
	     *   { 'user': 'pebbles', 'age': 1,  'active': true }
	     * ];
	     *
	     * _.find(users, function(o) { return o.age < 40; });
	     * // => object for 'barney'
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.find(users, { 'age': 1, 'active': true });
	     * // => object for 'pebbles'
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.find(users, ['active', false]);
	     * // => object for 'fred'
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.find(users, 'active');
	     * // => object for 'barney'
	     */
	    var find = createFind(findIndex);

	    /**
	     * This method is like `_.find` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to inspect.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @param {number} [fromIndex=collection.length-1] The index to search from.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * _.findLast([1, 2, 3, 4], function(n) {
	     *   return n % 2 == 1;
	     * });
	     * // => 3
	     */
	    var findLast = createFind(findLastIndex);

	    /**
	     * Creates a flattened array of values by running each element in `collection`
	     * thru `iteratee` and flattening the mapped results. The iteratee is invoked
	     * with three arguments: (value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * function duplicate(n) {
	     *   return [n, n];
	     * }
	     *
	     * _.flatMap([1, 2], duplicate);
	     * // => [1, 1, 2, 2]
	     */
	    function flatMap(collection, iteratee) {
	      return baseFlatten(map(collection, iteratee), 1);
	    }

	    /**
	     * This method is like `_.flatMap` except that it recursively flattens the
	     * mapped results.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.7.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * function duplicate(n) {
	     *   return [[[n, n]]];
	     * }
	     *
	     * _.flatMapDeep([1, 2], duplicate);
	     * // => [1, 1, 2, 2]
	     */
	    function flatMapDeep(collection, iteratee) {
	      return baseFlatten(map(collection, iteratee), INFINITY);
	    }

	    /**
	     * This method is like `_.flatMap` except that it recursively flattens the
	     * mapped results up to `depth` times.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.7.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {number} [depth=1] The maximum recursion depth.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * function duplicate(n) {
	     *   return [[[n, n]]];
	     * }
	     *
	     * _.flatMapDepth([1, 2], duplicate, 2);
	     * // => [[1, 1], [2, 2]]
	     */
	    function flatMapDepth(collection, iteratee, depth) {
	      depth = depth === undefined ? 1 : toInteger(depth);
	      return baseFlatten(map(collection, iteratee), depth);
	    }

	    /**
	     * Iterates over elements of `collection` and invokes `iteratee` for each element.
	     * The iteratee is invoked with three arguments: (value, index|key, collection).
	     * Iteratee functions may exit iteration early by explicitly returning `false`.
	     *
	     * **Note:** As with other "Collections" methods, objects with a "length"
	     * property are iterated like arrays. To avoid this behavior use `_.forIn`
	     * or `_.forOwn` for object iteration.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @alias each
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array|Object} Returns `collection`.
	     * @see _.forEachRight
	     * @example
	     *
	     * _.forEach([1, 2], function(value) {
	     *   console.log(value);
	     * });
	     * // => Logs `1` then `2`.
	     *
	     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	     */
	    function forEach(collection, iteratee) {
	      var func = isArray(collection) ? arrayEach : baseEach;
	      return func(collection, getIteratee(iteratee, 3));
	    }

	    /**
	     * This method is like `_.forEach` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @alias eachRight
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array|Object} Returns `collection`.
	     * @see _.forEach
	     * @example
	     *
	     * _.forEachRight([1, 2], function(value) {
	     *   console.log(value);
	     * });
	     * // => Logs `2` then `1`.
	     */
	    function forEachRight(collection, iteratee) {
	      var func = isArray(collection) ? arrayEachRight : baseEachRight;
	      return func(collection, getIteratee(iteratee, 3));
	    }

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` thru `iteratee`. The order of grouped values
	     * is determined by the order they occur in `collection`. The corresponding
	     * value of each key is an array of elements responsible for generating the
	     * key. The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
	     * // => { '4': [4.2], '6': [6.1, 6.3] }
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.groupBy(['one', 'two', 'three'], 'length');
	     * // => { '3': ['one', 'two'], '5': ['three'] }
	     */
	    var groupBy = createAggregator(function(result, value, key) {
	      if (hasOwnProperty.call(result, key)) {
	        result[key].push(value);
	      } else {
	        baseAssignValue(result, key, [value]);
	      }
	    });

	    /**
	     * Checks if `value` is in `collection`. If `collection` is a string, it's
	     * checked for a substring of `value`, otherwise
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * is used for equality comparisons. If `fromIndex` is negative, it's used as
	     * the offset from the end of `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to inspect.
	     * @param {*} value The value to search for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
	     * @returns {boolean} Returns `true` if `value` is found, else `false`.
	     * @example
	     *
	     * _.includes([1, 2, 3], 1);
	     * // => true
	     *
	     * _.includes([1, 2, 3], 1, 2);
	     * // => false
	     *
	     * _.includes({ 'a': 1, 'b': 2 }, 1);
	     * // => true
	     *
	     * _.includes('abcd', 'bc');
	     * // => true
	     */
	    function includes(collection, value, fromIndex, guard) {
	      collection = isArrayLike(collection) ? collection : values(collection);
	      fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

	      var length = collection.length;
	      if (fromIndex < 0) {
	        fromIndex = nativeMax(length + fromIndex, 0);
	      }
	      return isString(collection)
	        ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
	        : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
	    }

	    /**
	     * Invokes the method at `path` of each element in `collection`, returning
	     * an array of the results of each invoked method. Any additional arguments
	     * are provided to each invoked method. If `path` is a function, it's invoked
	     * for, and `this` bound to, each element in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Array|Function|string} path The path of the method to invoke or
	     *  the function invoked per iteration.
	     * @param {...*} [args] The arguments to invoke each method with.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *
	     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
	     * // => [[1, 5, 7], [1, 2, 3]]
	     *
	     * _.invokeMap([123, 456], String.prototype.split, '');
	     * // => [['1', '2', '3'], ['4', '5', '6']]
	     */
	    var invokeMap = baseRest(function(collection, path, args) {
	      var index = -1,
	          isFunc = typeof path == 'function',
	          result = isArrayLike(collection) ? Array(collection.length) : [];

	      baseEach(collection, function(value) {
	        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
	      });
	      return result;
	    });

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` thru `iteratee`. The corresponding value of
	     * each key is the last element responsible for generating the key. The
	     * iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * var array = [
	     *   { 'dir': 'left', 'code': 97 },
	     *   { 'dir': 'right', 'code': 100 }
	     * ];
	     *
	     * _.keyBy(array, function(o) {
	     *   return String.fromCharCode(o.code);
	     * });
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.keyBy(array, 'dir');
	     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
	     */
	    var keyBy = createAggregator(function(result, value, key) {
	      baseAssignValue(result, key, value);
	    });

	    /**
	     * Creates an array of values by running each element in `collection` thru
	     * `iteratee`. The iteratee is invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * Many lodash methods are guarded to work as iteratees for methods like
	     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	     *
	     * The guarded methods are:
	     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
	     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
	     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
	     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * _.map([4, 8], square);
	     * // => [16, 64]
	     *
	     * _.map({ 'a': 4, 'b': 8 }, square);
	     * // => [16, 64] (iteration order is not guaranteed)
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.map(users, 'user');
	     * // => ['barney', 'fred']
	     */
	    function map(collection, iteratee) {
	      var func = isArray(collection) ? arrayMap : baseMap;
	      return func(collection, getIteratee(iteratee, 3));
	    }

	    /**
	     * This method is like `_.sortBy` except that it allows specifying the sort
	     * orders of the iteratees to sort by. If `orders` is unspecified, all values
	     * are sorted in ascending order. Otherwise, specify an order of "desc" for
	     * descending or "asc" for ascending sort order of corresponding values.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
	     *  The iteratees to sort by.
	     * @param {string[]} [orders] The sort orders of `iteratees`.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'fred',   'age': 48 },
	     *   { 'user': 'barney', 'age': 34 },
	     *   { 'user': 'fred',   'age': 40 },
	     *   { 'user': 'barney', 'age': 36 }
	     * ];
	     *
	     * // Sort by `user` in ascending order and by `age` in descending order.
	     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
	     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
	     */
	    function orderBy(collection, iteratees, orders, guard) {
	      if (collection == null) {
	        return [];
	      }
	      if (!isArray(iteratees)) {
	        iteratees = iteratees == null ? [] : [iteratees];
	      }
	      orders = guard ? undefined : orders;
	      if (!isArray(orders)) {
	        orders = orders == null ? [] : [orders];
	      }
	      return baseOrderBy(collection, iteratees, orders);
	    }

	    /**
	     * Creates an array of elements split into two groups, the first of which
	     * contains elements `predicate` returns truthy for, the second of which
	     * contains elements `predicate` returns falsey for. The predicate is
	     * invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the array of grouped elements.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': false },
	     *   { 'user': 'fred',    'age': 40, 'active': true },
	     *   { 'user': 'pebbles', 'age': 1,  'active': false }
	     * ];
	     *
	     * _.partition(users, function(o) { return o.active; });
	     * // => objects for [['fred'], ['barney', 'pebbles']]
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.partition(users, { 'age': 1, 'active': false });
	     * // => objects for [['pebbles'], ['barney', 'fred']]
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.partition(users, ['active', false]);
	     * // => objects for [['barney', 'pebbles'], ['fred']]
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.partition(users, 'active');
	     * // => objects for [['fred'], ['barney', 'pebbles']]
	     */
	    var partition = createAggregator(function(result, value, key) {
	      result[key ? 0 : 1].push(value);
	    }, function() { return [[], []]; });

	    /**
	     * Reduces `collection` to a value which is the accumulated result of running
	     * each element in `collection` thru `iteratee`, where each successive
	     * invocation is supplied the return value of the previous. If `accumulator`
	     * is not given, the first element of `collection` is used as the initial
	     * value. The iteratee is invoked with four arguments:
	     * (accumulator, value, index|key, collection).
	     *
	     * Many lodash methods are guarded to work as iteratees for methods like
	     * `_.reduce`, `_.reduceRight`, and `_.transform`.
	     *
	     * The guarded methods are:
	     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
	     * and `sortBy`
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @returns {*} Returns the accumulated value.
	     * @see _.reduceRight
	     * @example
	     *
	     * _.reduce([1, 2], function(sum, n) {
	     *   return sum + n;
	     * }, 0);
	     * // => 3
	     *
	     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	     *   (result[value] || (result[value] = [])).push(key);
	     *   return result;
	     * }, {});
	     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
	     */
	    function reduce(collection, iteratee, accumulator) {
	      var func = isArray(collection) ? arrayReduce : baseReduce,
	          initAccum = arguments.length < 3;

	      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
	    }

	    /**
	     * This method is like `_.reduce` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @returns {*} Returns the accumulated value.
	     * @see _.reduce
	     * @example
	     *
	     * var array = [[0, 1], [2, 3], [4, 5]];
	     *
	     * _.reduceRight(array, function(flattened, other) {
	     *   return flattened.concat(other);
	     * }, []);
	     * // => [4, 5, 2, 3, 0, 1]
	     */
	    function reduceRight(collection, iteratee, accumulator) {
	      var func = isArray(collection) ? arrayReduceRight : baseReduce,
	          initAccum = arguments.length < 3;

	      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
	    }

	    /**
	     * The opposite of `_.filter`; this method returns the elements of `collection`
	     * that `predicate` does **not** return truthy for.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     * @see _.filter
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false },
	     *   { 'user': 'fred',   'age': 40, 'active': true }
	     * ];
	     *
	     * _.reject(users, function(o) { return !o.active; });
	     * // => objects for ['fred']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.reject(users, { 'age': 40, 'active': true });
	     * // => objects for ['barney']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.reject(users, ['active', false]);
	     * // => objects for ['fred']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.reject(users, 'active');
	     * // => objects for ['barney']
	     */
	    function reject(collection, predicate) {
	      var func = isArray(collection) ? arrayFilter : baseFilter;
	      return func(collection, negate(getIteratee(predicate, 3)));
	    }

	    /**
	     * Gets a random element from `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to sample.
	     * @returns {*} Returns the random element.
	     * @example
	     *
	     * _.sample([1, 2, 3, 4]);
	     * // => 2
	     */
	    function sample(collection) {
	      var func = isArray(collection) ? arraySample : baseSample;
	      return func(collection);
	    }

	    /**
	     * Gets `n` random elements at unique keys from `collection` up to the
	     * size of `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to sample.
	     * @param {number} [n=1] The number of elements to sample.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Array} Returns the random elements.
	     * @example
	     *
	     * _.sampleSize([1, 2, 3], 2);
	     * // => [3, 1]
	     *
	     * _.sampleSize([1, 2, 3], 4);
	     * // => [2, 3, 1]
	     */
	    function sampleSize(collection, n, guard) {
	      if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
	        n = 1;
	      } else {
	        n = toInteger(n);
	      }
	      var func = isArray(collection) ? arraySampleSize : baseSampleSize;
	      return func(collection, n);
	    }

	    /**
	     * Creates an array of shuffled values, using a version of the
	     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to shuffle.
	     * @returns {Array} Returns the new shuffled array.
	     * @example
	     *
	     * _.shuffle([1, 2, 3, 4]);
	     * // => [4, 1, 3, 2]
	     */
	    function shuffle(collection) {
	      var func = isArray(collection) ? arrayShuffle : baseShuffle;
	      return func(collection);
	    }

	    /**
	     * Gets the size of `collection` by returning its length for array-like
	     * values or the number of own enumerable string keyed properties for objects.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to inspect.
	     * @returns {number} Returns the collection size.
	     * @example
	     *
	     * _.size([1, 2, 3]);
	     * // => 3
	     *
	     * _.size({ 'a': 1, 'b': 2 });
	     * // => 2
	     *
	     * _.size('pebbles');
	     * // => 7
	     */
	    function size(collection) {
	      if (collection == null) {
	        return 0;
	      }
	      if (isArrayLike(collection)) {
	        return isString(collection) ? stringSize(collection) : collection.length;
	      }
	      var tag = getTag(collection);
	      if (tag == mapTag || tag == setTag) {
	        return collection.size;
	      }
	      return baseKeys(collection).length;
	    }

	    /**
	     * Checks if `predicate` returns truthy for **any** element of `collection`.
	     * Iteration is stopped once `predicate` returns truthy. The predicate is
	     * invoked with three arguments: (value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     * @example
	     *
	     * _.some([null, 0, 'yes', false], Boolean);
	     * // => true
	     *
	     * var users = [
	     *   { 'user': 'barney', 'active': true },
	     *   { 'user': 'fred',   'active': false }
	     * ];
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.some(users, { 'user': 'barney', 'active': false });
	     * // => false
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.some(users, ['active', false]);
	     * // => true
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.some(users, 'active');
	     * // => true
	     */
	    function some(collection, predicate, guard) {
	      var func = isArray(collection) ? arraySome : baseSome;
	      if (guard && isIterateeCall(collection, predicate, guard)) {
	        predicate = undefined;
	      }
	      return func(collection, getIteratee(predicate, 3));
	    }

	    /**
	     * Creates an array of elements, sorted in ascending order by the results of
	     * running each element in a collection thru each iteratee. This method
	     * performs a stable sort, that is, it preserves the original sort order of
	     * equal elements. The iteratees are invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {...(Function|Function[])} [iteratees=[_.identity]]
	     *  The iteratees to sort by.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'fred',   'age': 48 },
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 },
	     *   { 'user': 'barney', 'age': 34 }
	     * ];
	     *
	     * _.sortBy(users, [function(o) { return o.user; }]);
	     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
	     *
	     * _.sortBy(users, ['user', 'age']);
	     * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
	     */
	    var sortBy = baseRest(function(collection, iteratees) {
	      if (collection == null) {
	        return [];
	      }
	      var length = iteratees.length;
	      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
	        iteratees = [];
	      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
	        iteratees = [iteratees[0]];
	      }
	      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
	    });

	    /*------------------------------------------------------------------------*/

	    /**
	     * Gets the timestamp of the number of milliseconds that have elapsed since
	     * the Unix epoch (1 January 1970 00:00:00 UTC).
	     *
	     * @static
	     * @memberOf _
	     * @since 2.4.0
	     * @category Date
	     * @returns {number} Returns the timestamp.
	     * @example
	     *
	     * _.defer(function(stamp) {
	     *   console.log(_.now() - stamp);
	     * }, _.now());
	     * // => Logs the number of milliseconds it took for the deferred invocation.
	     */
	    var now = ctxNow || function() {
	      return root.Date.now();
	    };

	    /*------------------------------------------------------------------------*/

	    /**
	     * The opposite of `_.before`; this method creates a function that invokes
	     * `func` once it's called `n` or more times.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {number} n The number of calls before `func` is invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var saves = ['profile', 'settings'];
	     *
	     * var done = _.after(saves.length, function() {
	     *   console.log('done saving!');
	     * });
	     *
	     * _.forEach(saves, function(type) {
	     *   asyncSave({ 'type': type, 'complete': done });
	     * });
	     * // => Logs 'done saving!' after the two async saves have completed.
	     */
	    function after(n, func) {
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      n = toInteger(n);
	      return function() {
	        if (--n < 1) {
	          return func.apply(this, arguments);
	        }
	      };
	    }

	    /**
	     * Creates a function that invokes `func`, with up to `n` arguments,
	     * ignoring any additional arguments.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Function
	     * @param {Function} func The function to cap arguments for.
	     * @param {number} [n=func.length] The arity cap.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Function} Returns the new capped function.
	     * @example
	     *
	     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
	     * // => [6, 8, 10]
	     */
	    function ary(func, n, guard) {
	      n = guard ? undefined : n;
	      n = (func && n == null) ? func.length : n;
	      return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
	    }

	    /**
	     * Creates a function that invokes `func`, with the `this` binding and arguments
	     * of the created function, while it's called less than `n` times. Subsequent
	     * calls to the created function return the result of the last `func` invocation.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Function
	     * @param {number} n The number of calls at which `func` is no longer invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * jQuery(element).on('click', _.before(5, addContactToList));
	     * // => Allows adding up to 4 contacts to the list.
	     */
	    function before(n, func) {
	      var result;
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      n = toInteger(n);
	      return function() {
	        if (--n > 0) {
	          result = func.apply(this, arguments);
	        }
	        if (n <= 1) {
	          func = undefined;
	        }
	        return result;
	      };
	    }

	    /**
	     * Creates a function that invokes `func` with the `this` binding of `thisArg`
	     * and `partials` prepended to the arguments it receives.
	     *
	     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
	     * may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
	     * property of bound functions.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {Function} func The function to bind.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * function greet(greeting, punctuation) {
	     *   return greeting + ' ' + this.user + punctuation;
	     * }
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * var bound = _.bind(greet, object, 'hi');
	     * bound('!');
	     * // => 'hi fred!'
	     *
	     * // Bound with placeholders.
	     * var bound = _.bind(greet, object, _, '!');
	     * bound('hi');
	     * // => 'hi fred!'
	     */
	    var bind = baseRest(function(func, thisArg, partials) {
	      var bitmask = WRAP_BIND_FLAG;
	      if (partials.length) {
	        var holders = replaceHolders(partials, getHolder(bind));
	        bitmask |= WRAP_PARTIAL_FLAG;
	      }
	      return createWrap(func, bitmask, thisArg, partials, holders);
	    });

	    /**
	     * Creates a function that invokes the method at `object[key]` with `partials`
	     * prepended to the arguments it receives.
	     *
	     * This method differs from `_.bind` by allowing bound functions to reference
	     * methods that may be redefined or don't yet exist. See
	     * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
	     * for more details.
	     *
	     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.10.0
	     * @category Function
	     * @param {Object} object The object to invoke the method on.
	     * @param {string} key The key of the method.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var object = {
	     *   'user': 'fred',
	     *   'greet': function(greeting, punctuation) {
	     *     return greeting + ' ' + this.user + punctuation;
	     *   }
	     * };
	     *
	     * var bound = _.bindKey(object, 'greet', 'hi');
	     * bound('!');
	     * // => 'hi fred!'
	     *
	     * object.greet = function(greeting, punctuation) {
	     *   return greeting + 'ya ' + this.user + punctuation;
	     * };
	     *
	     * bound('!');
	     * // => 'hiya fred!'
	     *
	     * // Bound with placeholders.
	     * var bound = _.bindKey(object, 'greet', _, '!');
	     * bound('hi');
	     * // => 'hiya fred!'
	     */
	    var bindKey = baseRest(function(object, key, partials) {
	      var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
	      if (partials.length) {
	        var holders = replaceHolders(partials, getHolder(bindKey));
	        bitmask |= WRAP_PARTIAL_FLAG;
	      }
	      return createWrap(key, bitmask, object, partials, holders);
	    });

	    /**
	     * Creates a function that accepts arguments of `func` and either invokes
	     * `func` returning its result, if at least `arity` number of arguments have
	     * been provided, or returns a function that accepts the remaining `func`
	     * arguments, and so on. The arity of `func` may be specified if `func.length`
	     * is not sufficient.
	     *
	     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
	     * may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method doesn't set the "length" property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curry(abc);
	     *
	     * curried(1)(2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // Curried with placeholders.
	     * curried(1)(_, 3)(2);
	     * // => [1, 2, 3]
	     */
	    function curry(func, arity, guard) {
	      arity = guard ? undefined : arity;
	      var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
	      result.placeholder = curry.placeholder;
	      return result;
	    }

	    /**
	     * This method is like `_.curry` except that arguments are applied to `func`
	     * in the manner of `_.partialRight` instead of `_.partial`.
	     *
	     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method doesn't set the "length" property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curryRight(abc);
	     *
	     * curried(3)(2)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(2, 3)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // Curried with placeholders.
	     * curried(3)(1, _)(2);
	     * // => [1, 2, 3]
	     */
	    function curryRight(func, arity, guard) {
	      arity = guard ? undefined : arity;
	      var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
	      result.placeholder = curryRight.placeholder;
	      return result;
	    }

	    /**
	     * Creates a debounced function that delays invoking `func` until after `wait`
	     * milliseconds have elapsed since the last time the debounced function was
	     * invoked. The debounced function comes with a `cancel` method to cancel
	     * delayed `func` invocations and a `flush` method to immediately invoke them.
	     * Provide `options` to indicate whether `func` should be invoked on the
	     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	     * with the last arguments provided to the debounced function. Subsequent
	     * calls to the debounced function return the result of the last `func`
	     * invocation.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is
	     * invoked on the trailing edge of the timeout only if the debounced function
	     * is invoked more than once during the `wait` timeout.
	     *
	     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	     *
	     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	     * for details over the differences between `_.debounce` and `_.throttle`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {Function} func The function to debounce.
	     * @param {number} [wait=0] The number of milliseconds to delay.
	     * @param {Object} [options={}] The options object.
	     * @param {boolean} [options.leading=false]
	     *  Specify invoking on the leading edge of the timeout.
	     * @param {number} [options.maxWait]
	     *  The maximum time `func` is allowed to be delayed before it's invoked.
	     * @param {boolean} [options.trailing=true]
	     *  Specify invoking on the trailing edge of the timeout.
	     * @returns {Function} Returns the new debounced function.
	     * @example
	     *
	     * // Avoid costly calculations while the window size is in flux.
	     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	     *
	     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	     * jQuery(element).on('click', _.debounce(sendMail, 300, {
	     *   'leading': true,
	     *   'trailing': false
	     * }));
	     *
	     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	     * var source = new EventSource('/stream');
	     * jQuery(source).on('message', debounced);
	     *
	     * // Cancel the trailing debounced invocation.
	     * jQuery(window).on('popstate', debounced.cancel);
	     */
	    function debounce(func, wait, options) {
	      var lastArgs,
	          lastThis,
	          maxWait,
	          result,
	          timerId,
	          lastCallTime,
	          lastInvokeTime = 0,
	          leading = false,
	          maxing = false,
	          trailing = true;

	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      wait = toNumber(wait) || 0;
	      if (isObject(options)) {
	        leading = !!options.leading;
	        maxing = 'maxWait' in options;
	        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	        trailing = 'trailing' in options ? !!options.trailing : trailing;
	      }

	      function invokeFunc(time) {
	        var args = lastArgs,
	            thisArg = lastThis;

	        lastArgs = lastThis = undefined;
	        lastInvokeTime = time;
	        result = func.apply(thisArg, args);
	        return result;
	      }

	      function leadingEdge(time) {
	        // Reset any `maxWait` timer.
	        lastInvokeTime = time;
	        // Start the timer for the trailing edge.
	        timerId = setTimeout(timerExpired, wait);
	        // Invoke the leading edge.
	        return leading ? invokeFunc(time) : result;
	      }

	      function remainingWait(time) {
	        var timeSinceLastCall = time - lastCallTime,
	            timeSinceLastInvoke = time - lastInvokeTime,
	            result = wait - timeSinceLastCall;

	        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	      }

	      function shouldInvoke(time) {
	        var timeSinceLastCall = time - lastCallTime,
	            timeSinceLastInvoke = time - lastInvokeTime;

	        // Either this is the first call, activity has stopped and we're at the
	        // trailing edge, the system time has gone backwards and we're treating
	        // it as the trailing edge, or we've hit the `maxWait` limit.
	        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	      }

	      function timerExpired() {
	        var time = now();
	        if (shouldInvoke(time)) {
	          return trailingEdge(time);
	        }
	        // Restart the timer.
	        timerId = setTimeout(timerExpired, remainingWait(time));
	      }

	      function trailingEdge(time) {
	        timerId = undefined;

	        // Only invoke if we have `lastArgs` which means `func` has been
	        // debounced at least once.
	        if (trailing && lastArgs) {
	          return invokeFunc(time);
	        }
	        lastArgs = lastThis = undefined;
	        return result;
	      }

	      function cancel() {
	        if (timerId !== undefined) {
	          clearTimeout(timerId);
	        }
	        lastInvokeTime = 0;
	        lastArgs = lastCallTime = lastThis = timerId = undefined;
	      }

	      function flush() {
	        return timerId === undefined ? result : trailingEdge(now());
	      }

	      function debounced() {
	        var time = now(),
	            isInvoking = shouldInvoke(time);

	        lastArgs = arguments;
	        lastThis = this;
	        lastCallTime = time;

	        if (isInvoking) {
	          if (timerId === undefined) {
	            return leadingEdge(lastCallTime);
	          }
	          if (maxing) {
	            // Handle invocations in a tight loop.
	            timerId = setTimeout(timerExpired, wait);
	            return invokeFunc(lastCallTime);
	          }
	        }
	        if (timerId === undefined) {
	          timerId = setTimeout(timerExpired, wait);
	        }
	        return result;
	      }
	      debounced.cancel = cancel;
	      debounced.flush = flush;
	      return debounced;
	    }

	    /**
	     * Defers invoking the `func` until the current call stack has cleared. Any
	     * additional arguments are provided to `func` when it's invoked.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {Function} func The function to defer.
	     * @param {...*} [args] The arguments to invoke `func` with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.defer(function(text) {
	     *   console.log(text);
	     * }, 'deferred');
	     * // => Logs 'deferred' after one millisecond.
	     */
	    var defer = baseRest(function(func, args) {
	      return baseDelay(func, 1, args);
	    });

	    /**
	     * Invokes `func` after `wait` milliseconds. Any additional arguments are
	     * provided to `func` when it's invoked.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @param {...*} [args] The arguments to invoke `func` with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.delay(function(text) {
	     *   console.log(text);
	     * }, 1000, 'later');
	     * // => Logs 'later' after one second.
	     */
	    var delay = baseRest(function(func, wait, args) {
	      return baseDelay(func, toNumber(wait) || 0, args);
	    });

	    /**
	     * Creates a function that invokes `func` with arguments reversed.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Function
	     * @param {Function} func The function to flip arguments for.
	     * @returns {Function} Returns the new flipped function.
	     * @example
	     *
	     * var flipped = _.flip(function() {
	     *   return _.toArray(arguments);
	     * });
	     *
	     * flipped('a', 'b', 'c', 'd');
	     * // => ['d', 'c', 'b', 'a']
	     */
	    function flip(func) {
	      return createWrap(func, WRAP_FLIP_FLAG);
	    }

	    /**
	     * Creates a function that memoizes the result of `func`. If `resolver` is
	     * provided, it determines the cache key for storing the result based on the
	     * arguments provided to the memoized function. By default, the first argument
	     * provided to the memoized function is used as the map cache key. The `func`
	     * is invoked with the `this` binding of the memoized function.
	     *
	     * **Note:** The cache is exposed as the `cache` property on the memoized
	     * function. Its creation may be customized by replacing the `_.memoize.Cache`
	     * constructor with one whose instances implement the
	     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {Function} func The function to have its output memoized.
	     * @param {Function} [resolver] The function to resolve the cache key.
	     * @returns {Function} Returns the new memoized function.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': 2 };
	     * var other = { 'c': 3, 'd': 4 };
	     *
	     * var values = _.memoize(_.values);
	     * values(object);
	     * // => [1, 2]
	     *
	     * values(other);
	     * // => [3, 4]
	     *
	     * object.a = 2;
	     * values(object);
	     * // => [1, 2]
	     *
	     * // Modify the result cache.
	     * values.cache.set(object, ['a', 'b']);
	     * values(object);
	     * // => ['a', 'b']
	     *
	     * // Replace `_.memoize.Cache`.
	     * _.memoize.Cache = WeakMap;
	     */
	    function memoize(func, resolver) {
	      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      var memoized = function() {
	        var args = arguments,
	            key = resolver ? resolver.apply(this, args) : args[0],
	            cache = memoized.cache;

	        if (cache.has(key)) {
	          return cache.get(key);
	        }
	        var result = func.apply(this, args);
	        memoized.cache = cache.set(key, result) || cache;
	        return result;
	      };
	      memoized.cache = new (memoize.Cache || MapCache);
	      return memoized;
	    }

	    // Expose `MapCache`.
	    memoize.Cache = MapCache;

	    /**
	     * Creates a function that negates the result of the predicate `func`. The
	     * `func` predicate is invoked with the `this` binding and arguments of the
	     * created function.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Function
	     * @param {Function} predicate The predicate to negate.
	     * @returns {Function} Returns the new negated function.
	     * @example
	     *
	     * function isEven(n) {
	     *   return n % 2 == 0;
	     * }
	     *
	     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
	     * // => [1, 3, 5]
	     */
	    function negate(predicate) {
	      if (typeof predicate != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      return function() {
	        var args = arguments;
	        switch (args.length) {
	          case 0: return !predicate.call(this);
	          case 1: return !predicate.call(this, args[0]);
	          case 2: return !predicate.call(this, args[0], args[1]);
	          case 3: return !predicate.call(this, args[0], args[1], args[2]);
	        }
	        return !predicate.apply(this, args);
	      };
	    }

	    /**
	     * Creates a function that is restricted to invoking `func` once. Repeat calls
	     * to the function return the value of the first invocation. The `func` is
	     * invoked with the `this` binding and arguments of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var initialize = _.once(createApplication);
	     * initialize();
	     * initialize();
	     * // => `createApplication` is invoked once
	     */
	    function once(func) {
	      return before(2, func);
	    }

	    /**
	     * Creates a function that invokes `func` with its arguments transformed.
	     *
	     * @static
	     * @since 4.0.0
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to wrap.
	     * @param {...(Function|Function[])} [transforms=[_.identity]]
	     *  The argument transforms.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function doubled(n) {
	     *   return n * 2;
	     * }
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var func = _.overArgs(function(x, y) {
	     *   return [x, y];
	     * }, [square, doubled]);
	     *
	     * func(9, 3);
	     * // => [81, 6]
	     *
	     * func(10, 5);
	     * // => [100, 10]
	     */
	    var overArgs = castRest(function(func, transforms) {
	      transforms = (transforms.length == 1 && isArray(transforms[0]))
	        ? arrayMap(transforms[0], baseUnary(getIteratee()))
	        : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

	      var funcsLength = transforms.length;
	      return baseRest(function(args) {
	        var index = -1,
	            length = nativeMin(args.length, funcsLength);

	        while (++index < length) {
	          args[index] = transforms[index].call(this, args[index]);
	        }
	        return apply(func, this, args);
	      });
	    });

	    /**
	     * Creates a function that invokes `func` with `partials` prepended to the
	     * arguments it receives. This method is like `_.bind` except it does **not**
	     * alter the `this` binding.
	     *
	     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** This method doesn't set the "length" property of partially
	     * applied functions.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.2.0
	     * @category Function
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * function greet(greeting, name) {
	     *   return greeting + ' ' + name;
	     * }
	     *
	     * var sayHelloTo = _.partial(greet, 'hello');
	     * sayHelloTo('fred');
	     * // => 'hello fred'
	     *
	     * // Partially applied with placeholders.
	     * var greetFred = _.partial(greet, _, 'fred');
	     * greetFred('hi');
	     * // => 'hi fred'
	     */
	    var partial = baseRest(function(func, partials) {
	      var holders = replaceHolders(partials, getHolder(partial));
	      return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
	    });

	    /**
	     * This method is like `_.partial` except that partially applied arguments
	     * are appended to the arguments it receives.
	     *
	     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** This method doesn't set the "length" property of partially
	     * applied functions.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.0.0
	     * @category Function
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * function greet(greeting, name) {
	     *   return greeting + ' ' + name;
	     * }
	     *
	     * var greetFred = _.partialRight(greet, 'fred');
	     * greetFred('hi');
	     * // => 'hi fred'
	     *
	     * // Partially applied with placeholders.
	     * var sayHelloTo = _.partialRight(greet, 'hello', _);
	     * sayHelloTo('fred');
	     * // => 'hello fred'
	     */
	    var partialRight = baseRest(function(func, partials) {
	      var holders = replaceHolders(partials, getHolder(partialRight));
	      return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
	    });

	    /**
	     * Creates a function that invokes `func` with arguments arranged according
	     * to the specified `indexes` where the argument value at the first index is
	     * provided as the first argument, the argument value at the second index is
	     * provided as the second argument, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Function
	     * @param {Function} func The function to rearrange arguments for.
	     * @param {...(number|number[])} indexes The arranged argument indexes.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var rearged = _.rearg(function(a, b, c) {
	     *   return [a, b, c];
	     * }, [2, 0, 1]);
	     *
	     * rearged('b', 'c', 'a')
	     * // => ['a', 'b', 'c']
	     */
	    var rearg = flatRest(function(func, indexes) {
	      return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
	    });

	    /**
	     * Creates a function that invokes `func` with the `this` binding of the
	     * created function and arguments from `start` and beyond provided as
	     * an array.
	     *
	     * **Note:** This method is based on the
	     * [rest parameter](https://mdn.io/rest_parameters).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Function
	     * @param {Function} func The function to apply a rest parameter to.
	     * @param {number} [start=func.length-1] The start position of the rest parameter.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.rest(function(what, names) {
	     *   return what + ' ' + _.initial(names).join(', ') +
	     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	     * });
	     *
	     * say('hello', 'fred', 'barney', 'pebbles');
	     * // => 'hello fred, barney, & pebbles'
	     */
	    function rest(func, start) {
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      start = start === undefined ? start : toInteger(start);
	      return baseRest(func, start);
	    }

	    /**
	     * Creates a function that invokes `func` with the `this` binding of the
	     * create function and an array of arguments much like
	     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
	     *
	     * **Note:** This method is based on the
	     * [spread operator](https://mdn.io/spread_operator).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.2.0
	     * @category Function
	     * @param {Function} func The function to spread arguments over.
	     * @param {number} [start=0] The start position of the spread.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.spread(function(who, what) {
	     *   return who + ' says ' + what;
	     * });
	     *
	     * say(['fred', 'hello']);
	     * // => 'fred says hello'
	     *
	     * var numbers = Promise.all([
	     *   Promise.resolve(40),
	     *   Promise.resolve(36)
	     * ]);
	     *
	     * numbers.then(_.spread(function(x, y) {
	     *   return x + y;
	     * }));
	     * // => a Promise of 76
	     */
	    function spread(func, start) {
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      start = start == null ? 0 : nativeMax(toInteger(start), 0);
	      return baseRest(function(args) {
	        var array = args[start],
	            otherArgs = castSlice(args, 0, start);

	        if (array) {
	          arrayPush(otherArgs, array);
	        }
	        return apply(func, this, otherArgs);
	      });
	    }

	    /**
	     * Creates a throttled function that only invokes `func` at most once per
	     * every `wait` milliseconds. The throttled function comes with a `cancel`
	     * method to cancel delayed `func` invocations and a `flush` method to
	     * immediately invoke them. Provide `options` to indicate whether `func`
	     * should be invoked on the leading and/or trailing edge of the `wait`
	     * timeout. The `func` is invoked with the last arguments provided to the
	     * throttled function. Subsequent calls to the throttled function return the
	     * result of the last `func` invocation.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is
	     * invoked on the trailing edge of the timeout only if the throttled function
	     * is invoked more than once during the `wait` timeout.
	     *
	     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	     *
	     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	     * for details over the differences between `_.throttle` and `_.debounce`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {Function} func The function to throttle.
	     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	     * @param {Object} [options={}] The options object.
	     * @param {boolean} [options.leading=true]
	     *  Specify invoking on the leading edge of the timeout.
	     * @param {boolean} [options.trailing=true]
	     *  Specify invoking on the trailing edge of the timeout.
	     * @returns {Function} Returns the new throttled function.
	     * @example
	     *
	     * // Avoid excessively updating the position while scrolling.
	     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	     *
	     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	     * jQuery(element).on('click', throttled);
	     *
	     * // Cancel the trailing throttled invocation.
	     * jQuery(window).on('popstate', throttled.cancel);
	     */
	    function throttle(func, wait, options) {
	      var leading = true,
	          trailing = true;

	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      if (isObject(options)) {
	        leading = 'leading' in options ? !!options.leading : leading;
	        trailing = 'trailing' in options ? !!options.trailing : trailing;
	      }
	      return debounce(func, wait, {
	        'leading': leading,
	        'maxWait': wait,
	        'trailing': trailing
	      });
	    }

	    /**
	     * Creates a function that accepts up to one argument, ignoring any
	     * additional arguments.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Function
	     * @param {Function} func The function to cap arguments for.
	     * @returns {Function} Returns the new capped function.
	     * @example
	     *
	     * _.map(['6', '8', '10'], _.unary(parseInt));
	     * // => [6, 8, 10]
	     */
	    function unary(func) {
	      return ary(func, 1);
	    }

	    /**
	     * Creates a function that provides `value` to `wrapper` as its first
	     * argument. Any additional arguments provided to the function are appended
	     * to those provided to the `wrapper`. The wrapper is invoked with the `this`
	     * binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {*} value The value to wrap.
	     * @param {Function} [wrapper=identity] The wrapper function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var p = _.wrap(_.escape, function(func, text) {
	     *   return '<p>' + func(text) + '</p>';
	     * });
	     *
	     * p('fred, barney, & pebbles');
	     * // => '<p>fred, barney, &amp; pebbles</p>'
	     */
	    function wrap(value, wrapper) {
	      return partial(castFunction(wrapper), value);
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Casts `value` as an array if it's not one.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.4.0
	     * @category Lang
	     * @param {*} value The value to inspect.
	     * @returns {Array} Returns the cast array.
	     * @example
	     *
	     * _.castArray(1);
	     * // => [1]
	     *
	     * _.castArray({ 'a': 1 });
	     * // => [{ 'a': 1 }]
	     *
	     * _.castArray('abc');
	     * // => ['abc']
	     *
	     * _.castArray(null);
	     * // => [null]
	     *
	     * _.castArray(undefined);
	     * // => [undefined]
	     *
	     * _.castArray();
	     * // => []
	     *
	     * var array = [1, 2, 3];
	     * console.log(_.castArray(array) === array);
	     * // => true
	     */
	    function castArray() {
	      if (!arguments.length) {
	        return [];
	      }
	      var value = arguments[0];
	      return isArray(value) ? value : [value];
	    }

	    /**
	     * Creates a shallow clone of `value`.
	     *
	     * **Note:** This method is loosely based on the
	     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
	     * and supports cloning arrays, array buffers, booleans, date objects, maps,
	     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
	     * arrays. The own enumerable properties of `arguments` objects are cloned
	     * as plain objects. An empty object is returned for uncloneable values such
	     * as error objects, functions, DOM nodes, and WeakMaps.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to clone.
	     * @returns {*} Returns the cloned value.
	     * @see _.cloneDeep
	     * @example
	     *
	     * var objects = [{ 'a': 1 }, { 'b': 2 }];
	     *
	     * var shallow = _.clone(objects);
	     * console.log(shallow[0] === objects[0]);
	     * // => true
	     */
	    function clone(value) {
	      return baseClone(value, CLONE_SYMBOLS_FLAG);
	    }

	    /**
	     * This method is like `_.clone` except that it accepts `customizer` which
	     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
	     * cloning is handled by the method instead. The `customizer` is invoked with
	     * up to four arguments; (value [, index|key, object, stack]).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to clone.
	     * @param {Function} [customizer] The function to customize cloning.
	     * @returns {*} Returns the cloned value.
	     * @see _.cloneDeepWith
	     * @example
	     *
	     * function customizer(value) {
	     *   if (_.isElement(value)) {
	     *     return value.cloneNode(false);
	     *   }
	     * }
	     *
	     * var el = _.cloneWith(document.body, customizer);
	     *
	     * console.log(el === document.body);
	     * // => false
	     * console.log(el.nodeName);
	     * // => 'BODY'
	     * console.log(el.childNodes.length);
	     * // => 0
	     */
	    function cloneWith(value, customizer) {
	      customizer = typeof customizer == 'function' ? customizer : undefined;
	      return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
	    }

	    /**
	     * This method is like `_.clone` except that it recursively clones `value`.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.0.0
	     * @category Lang
	     * @param {*} value The value to recursively clone.
	     * @returns {*} Returns the deep cloned value.
	     * @see _.clone
	     * @example
	     *
	     * var objects = [{ 'a': 1 }, { 'b': 2 }];
	     *
	     * var deep = _.cloneDeep(objects);
	     * console.log(deep[0] === objects[0]);
	     * // => false
	     */
	    function cloneDeep(value) {
	      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
	    }

	    /**
	     * This method is like `_.cloneWith` except that it recursively clones `value`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to recursively clone.
	     * @param {Function} [customizer] The function to customize cloning.
	     * @returns {*} Returns the deep cloned value.
	     * @see _.cloneWith
	     * @example
	     *
	     * function customizer(value) {
	     *   if (_.isElement(value)) {
	     *     return value.cloneNode(true);
	     *   }
	     * }
	     *
	     * var el = _.cloneDeepWith(document.body, customizer);
	     *
	     * console.log(el === document.body);
	     * // => false
	     * console.log(el.nodeName);
	     * // => 'BODY'
	     * console.log(el.childNodes.length);
	     * // => 20
	     */
	    function cloneDeepWith(value, customizer) {
	      customizer = typeof customizer == 'function' ? customizer : undefined;
	      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
	    }

	    /**
	     * Checks if `object` conforms to `source` by invoking the predicate
	     * properties of `source` with the corresponding property values of `object`.
	     *
	     * **Note:** This method is equivalent to `_.conforms` when `source` is
	     * partially applied.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.14.0
	     * @category Lang
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property predicates to conform to.
	     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': 2 };
	     *
	     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
	     * // => true
	     *
	     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
	     * // => false
	     */
	    function conformsTo(object, source) {
	      return source == null || baseConformsTo(object, source, keys(source));
	    }

	    /**
	     * Performs a
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * comparison between two values to determine if they are equivalent.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'a': 1 };
	     * var other = { 'a': 1 };
	     *
	     * _.eq(object, object);
	     * // => true
	     *
	     * _.eq(object, other);
	     * // => false
	     *
	     * _.eq('a', 'a');
	     * // => true
	     *
	     * _.eq('a', Object('a'));
	     * // => false
	     *
	     * _.eq(NaN, NaN);
	     * // => true
	     */
	    function eq(value, other) {
	      return value === other || (value !== value && other !== other);
	    }

	    /**
	     * Checks if `value` is greater than `other`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.9.0
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is greater than `other`,
	     *  else `false`.
	     * @see _.lt
	     * @example
	     *
	     * _.gt(3, 1);
	     * // => true
	     *
	     * _.gt(3, 3);
	     * // => false
	     *
	     * _.gt(1, 3);
	     * // => false
	     */
	    var gt = createRelationalOperation(baseGt);

	    /**
	     * Checks if `value` is greater than or equal to `other`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.9.0
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is greater than or equal to
	     *  `other`, else `false`.
	     * @see _.lte
	     * @example
	     *
	     * _.gte(3, 1);
	     * // => true
	     *
	     * _.gte(3, 3);
	     * // => true
	     *
	     * _.gte(1, 3);
	     * // => false
	     */
	    var gte = createRelationalOperation(function(value, other) {
	      return value >= other;
	    });

	    /**
	     * Checks if `value` is likely an `arguments` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	     *  else `false`.
	     * @example
	     *
	     * _.isArguments(function() { return arguments; }());
	     * // => true
	     *
	     * _.isArguments([1, 2, 3]);
	     * // => false
	     */
	    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	        !propertyIsEnumerable.call(value, 'callee');
	    };

	    /**
	     * Checks if `value` is classified as an `Array` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	     * @example
	     *
	     * _.isArray([1, 2, 3]);
	     * // => true
	     *
	     * _.isArray(document.body.children);
	     * // => false
	     *
	     * _.isArray('abc');
	     * // => false
	     *
	     * _.isArray(_.noop);
	     * // => false
	     */
	    var isArray = Array.isArray;

	    /**
	     * Checks if `value` is classified as an `ArrayBuffer` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.3.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
	     * @example
	     *
	     * _.isArrayBuffer(new ArrayBuffer(2));
	     * // => true
	     *
	     * _.isArrayBuffer(new Array(2));
	     * // => false
	     */
	    var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

	    /**
	     * Checks if `value` is array-like. A value is considered array-like if it's
	     * not a function and has a `value.length` that's an integer greater than or
	     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	     * @example
	     *
	     * _.isArrayLike([1, 2, 3]);
	     * // => true
	     *
	     * _.isArrayLike(document.body.children);
	     * // => true
	     *
	     * _.isArrayLike('abc');
	     * // => true
	     *
	     * _.isArrayLike(_.noop);
	     * // => false
	     */
	    function isArrayLike(value) {
	      return value != null && isLength(value.length) && !isFunction(value);
	    }

	    /**
	     * This method is like `_.isArrayLike` except that it also checks if `value`
	     * is an object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an array-like object,
	     *  else `false`.
	     * @example
	     *
	     * _.isArrayLikeObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isArrayLikeObject(document.body.children);
	     * // => true
	     *
	     * _.isArrayLikeObject('abc');
	     * // => false
	     *
	     * _.isArrayLikeObject(_.noop);
	     * // => false
	     */
	    function isArrayLikeObject(value) {
	      return isObjectLike(value) && isArrayLike(value);
	    }

	    /**
	     * Checks if `value` is classified as a boolean primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
	     * @example
	     *
	     * _.isBoolean(false);
	     * // => true
	     *
	     * _.isBoolean(null);
	     * // => false
	     */
	    function isBoolean(value) {
	      return value === true || value === false ||
	        (isObjectLike(value) && baseGetTag(value) == boolTag);
	    }

	    /**
	     * Checks if `value` is a buffer.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.3.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	     * @example
	     *
	     * _.isBuffer(new Buffer(2));
	     * // => true
	     *
	     * _.isBuffer(new Uint8Array(2));
	     * // => false
	     */
	    var isBuffer = nativeIsBuffer || stubFalse;

	    /**
	     * Checks if `value` is classified as a `Date` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
	     * @example
	     *
	     * _.isDate(new Date);
	     * // => true
	     *
	     * _.isDate('Mon April 23 2012');
	     * // => false
	     */
	    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

	    /**
	     * Checks if `value` is likely a DOM element.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
	     * @example
	     *
	     * _.isElement(document.body);
	     * // => true
	     *
	     * _.isElement('<body>');
	     * // => false
	     */
	    function isElement(value) {
	      return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
	    }

	    /**
	     * Checks if `value` is an empty object, collection, map, or set.
	     *
	     * Objects are considered empty if they have no own enumerable string keyed
	     * properties.
	     *
	     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	     * jQuery-like collections are considered empty if they have a `length` of `0`.
	     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	     * @example
	     *
	     * _.isEmpty(null);
	     * // => true
	     *
	     * _.isEmpty(true);
	     * // => true
	     *
	     * _.isEmpty(1);
	     * // => true
	     *
	     * _.isEmpty([1, 2, 3]);
	     * // => false
	     *
	     * _.isEmpty({ 'a': 1 });
	     * // => false
	     */
	    function isEmpty(value) {
	      if (value == null) {
	        return true;
	      }
	      if (isArrayLike(value) &&
	          (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
	            isBuffer(value) || isTypedArray(value) || isArguments(value))) {
	        return !value.length;
	      }
	      var tag = getTag(value);
	      if (tag == mapTag || tag == setTag) {
	        return !value.size;
	      }
	      if (isPrototype(value)) {
	        return !baseKeys(value).length;
	      }
	      for (var key in value) {
	        if (hasOwnProperty.call(value, key)) {
	          return false;
	        }
	      }
	      return true;
	    }

	    /**
	     * Performs a deep comparison between two values to determine if they are
	     * equivalent.
	     *
	     * **Note:** This method supports comparing arrays, array buffers, booleans,
	     * date objects, error objects, maps, numbers, `Object` objects, regexes,
	     * sets, strings, symbols, and typed arrays. `Object` objects are compared
	     * by their own, not inherited, enumerable properties. Functions and DOM
	     * nodes are compared by strict equality, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'a': 1 };
	     * var other = { 'a': 1 };
	     *
	     * _.isEqual(object, other);
	     * // => true
	     *
	     * object === other;
	     * // => false
	     */
	    function isEqual(value, other) {
	      return baseIsEqual(value, other);
	    }

	    /**
	     * This method is like `_.isEqual` except that it accepts `customizer` which
	     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
	     * are handled by the method instead. The `customizer` is invoked with up to
	     * six arguments: (objValue, othValue [, index|key, object, other, stack]).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * function isGreeting(value) {
	     *   return /^h(?:i|ello)$/.test(value);
	     * }
	     *
	     * function customizer(objValue, othValue) {
	     *   if (isGreeting(objValue) && isGreeting(othValue)) {
	     *     return true;
	     *   }
	     * }
	     *
	     * var array = ['hello', 'goodbye'];
	     * var other = ['hi', 'goodbye'];
	     *
	     * _.isEqualWith(array, other, customizer);
	     * // => true
	     */
	    function isEqualWith(value, other, customizer) {
	      customizer = typeof customizer == 'function' ? customizer : undefined;
	      var result = customizer ? customizer(value, other) : undefined;
	      return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
	    }

	    /**
	     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
	     * `SyntaxError`, `TypeError`, or `URIError` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
	     * @example
	     *
	     * _.isError(new Error);
	     * // => true
	     *
	     * _.isError(Error);
	     * // => false
	     */
	    function isError(value) {
	      if (!isObjectLike(value)) {
	        return false;
	      }
	      var tag = baseGetTag(value);
	      return tag == errorTag || tag == domExcTag ||
	        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
	    }

	    /**
	     * Checks if `value` is a finite primitive number.
	     *
	     * **Note:** This method is based on
	     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
	     * @example
	     *
	     * _.isFinite(3);
	     * // => true
	     *
	     * _.isFinite(Number.MIN_VALUE);
	     * // => true
	     *
	     * _.isFinite(Infinity);
	     * // => false
	     *
	     * _.isFinite('3');
	     * // => false
	     */
	    function isFinite(value) {
	      return typeof value == 'number' && nativeIsFinite(value);
	    }

	    /**
	     * Checks if `value` is classified as a `Function` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	     * @example
	     *
	     * _.isFunction(_);
	     * // => true
	     *
	     * _.isFunction(/abc/);
	     * // => false
	     */
	    function isFunction(value) {
	      if (!isObject(value)) {
	        return false;
	      }
	      // The use of `Object#toString` avoids issues with the `typeof` operator
	      // in Safari 9 which returns 'object' for typed arrays and other constructors.
	      var tag = baseGetTag(value);
	      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	    }

	    /**
	     * Checks if `value` is an integer.
	     *
	     * **Note:** This method is based on
	     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
	     * @example
	     *
	     * _.isInteger(3);
	     * // => true
	     *
	     * _.isInteger(Number.MIN_VALUE);
	     * // => false
	     *
	     * _.isInteger(Infinity);
	     * // => false
	     *
	     * _.isInteger('3');
	     * // => false
	     */
	    function isInteger(value) {
	      return typeof value == 'number' && value == toInteger(value);
	    }

	    /**
	     * Checks if `value` is a valid array-like length.
	     *
	     * **Note:** This method is loosely based on
	     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	     * @example
	     *
	     * _.isLength(3);
	     * // => true
	     *
	     * _.isLength(Number.MIN_VALUE);
	     * // => false
	     *
	     * _.isLength(Infinity);
	     * // => false
	     *
	     * _.isLength('3');
	     * // => false
	     */
	    function isLength(value) {
	      return typeof value == 'number' &&
	        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	    }

	    /**
	     * Checks if `value` is the
	     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	     * @example
	     *
	     * _.isObject({});
	     * // => true
	     *
	     * _.isObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isObject(_.noop);
	     * // => true
	     *
	     * _.isObject(null);
	     * // => false
	     */
	    function isObject(value) {
	      var type = typeof value;
	      return value != null && (type == 'object' || type == 'function');
	    }

	    /**
	     * Checks if `value` is object-like. A value is object-like if it's not `null`
	     * and has a `typeof` result of "object".
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	     * @example
	     *
	     * _.isObjectLike({});
	     * // => true
	     *
	     * _.isObjectLike([1, 2, 3]);
	     * // => true
	     *
	     * _.isObjectLike(_.noop);
	     * // => false
	     *
	     * _.isObjectLike(null);
	     * // => false
	     */
	    function isObjectLike(value) {
	      return value != null && typeof value == 'object';
	    }

	    /**
	     * Checks if `value` is classified as a `Map` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.3.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	     * @example
	     *
	     * _.isMap(new Map);
	     * // => true
	     *
	     * _.isMap(new WeakMap);
	     * // => false
	     */
	    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

	    /**
	     * Performs a partial deep comparison between `object` and `source` to
	     * determine if `object` contains equivalent property values.
	     *
	     * **Note:** This method is equivalent to `_.matches` when `source` is
	     * partially applied.
	     *
	     * Partial comparisons will match empty array and empty object `source`
	     * values against any array or object value, respectively. See `_.isEqual`
	     * for a list of supported value comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Lang
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': 2 };
	     *
	     * _.isMatch(object, { 'b': 2 });
	     * // => true
	     *
	     * _.isMatch(object, { 'b': 1 });
	     * // => false
	     */
	    function isMatch(object, source) {
	      return object === source || baseIsMatch(object, source, getMatchData(source));
	    }

	    /**
	     * This method is like `_.isMatch` except that it accepts `customizer` which
	     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
	     * are handled by the method instead. The `customizer` is invoked with five
	     * arguments: (objValue, srcValue, index|key, object, source).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     * @example
	     *
	     * function isGreeting(value) {
	     *   return /^h(?:i|ello)$/.test(value);
	     * }
	     *
	     * function customizer(objValue, srcValue) {
	     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
	     *     return true;
	     *   }
	     * }
	     *
	     * var object = { 'greeting': 'hello' };
	     * var source = { 'greeting': 'hi' };
	     *
	     * _.isMatchWith(object, source, customizer);
	     * // => true
	     */
	    function isMatchWith(object, source, customizer) {
	      customizer = typeof customizer == 'function' ? customizer : undefined;
	      return baseIsMatch(object, source, getMatchData(source), customizer);
	    }

	    /**
	     * Checks if `value` is `NaN`.
	     *
	     * **Note:** This method is based on
	     * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
	     * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
	     * `undefined` and other non-number values.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	     * @example
	     *
	     * _.isNaN(NaN);
	     * // => true
	     *
	     * _.isNaN(new Number(NaN));
	     * // => true
	     *
	     * isNaN(undefined);
	     * // => true
	     *
	     * _.isNaN(undefined);
	     * // => false
	     */
	    function isNaN(value) {
	      // An `NaN` primitive is the only value that is not equal to itself.
	      // Perform the `toStringTag` check first to avoid errors with some
	      // ActiveX objects in IE.
	      return isNumber(value) && value != +value;
	    }

	    /**
	     * Checks if `value` is a pristine native function.
	     *
	     * **Note:** This method can't reliably detect native functions in the presence
	     * of the core-js package because core-js circumvents this kind of detection.
	     * Despite multiple requests, the core-js maintainer has made it clear: any
	     * attempt to fix the detection will be obstructed. As a result, we're left
	     * with little choice but to throw an error. Unfortunately, this also affects
	     * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
	     * which rely on core-js.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a native function,
	     *  else `false`.
	     * @example
	     *
	     * _.isNative(Array.prototype.push);
	     * // => true
	     *
	     * _.isNative(_);
	     * // => false
	     */
	    function isNative(value) {
	      if (isMaskable(value)) {
	        throw new Error(CORE_ERROR_TEXT);
	      }
	      return baseIsNative(value);
	    }

	    /**
	     * Checks if `value` is `null`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	     * @example
	     *
	     * _.isNull(null);
	     * // => true
	     *
	     * _.isNull(void 0);
	     * // => false
	     */
	    function isNull(value) {
	      return value === null;
	    }

	    /**
	     * Checks if `value` is `null` or `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
	     * @example
	     *
	     * _.isNil(null);
	     * // => true
	     *
	     * _.isNil(void 0);
	     * // => true
	     *
	     * _.isNil(NaN);
	     * // => false
	     */
	    function isNil(value) {
	      return value == null;
	    }

	    /**
	     * Checks if `value` is classified as a `Number` primitive or object.
	     *
	     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
	     * classified as numbers, use the `_.isFinite` method.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a number, else `false`.
	     * @example
	     *
	     * _.isNumber(3);
	     * // => true
	     *
	     * _.isNumber(Number.MIN_VALUE);
	     * // => true
	     *
	     * _.isNumber(Infinity);
	     * // => true
	     *
	     * _.isNumber('3');
	     * // => false
	     */
	    function isNumber(value) {
	      return typeof value == 'number' ||
	        (isObjectLike(value) && baseGetTag(value) == numberTag);
	    }

	    /**
	     * Checks if `value` is a plain object, that is, an object created by the
	     * `Object` constructor or one with a `[[Prototype]]` of `null`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.8.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     * }
	     *
	     * _.isPlainObject(new Foo);
	     * // => false
	     *
	     * _.isPlainObject([1, 2, 3]);
	     * // => false
	     *
	     * _.isPlainObject({ 'x': 0, 'y': 0 });
	     * // => true
	     *
	     * _.isPlainObject(Object.create(null));
	     * // => true
	     */
	    function isPlainObject(value) {
	      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	        return false;
	      }
	      var proto = getPrototype(value);
	      if (proto === null) {
	        return true;
	      }
	      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	        funcToString.call(Ctor) == objectCtorString;
	    }

	    /**
	     * Checks if `value` is classified as a `RegExp` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
	     * @example
	     *
	     * _.isRegExp(/abc/);
	     * // => true
	     *
	     * _.isRegExp('/abc/');
	     * // => false
	     */
	    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

	    /**
	     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
	     * double precision number which isn't the result of a rounded unsafe integer.
	     *
	     * **Note:** This method is based on
	     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
	     * @example
	     *
	     * _.isSafeInteger(3);
	     * // => true
	     *
	     * _.isSafeInteger(Number.MIN_VALUE);
	     * // => false
	     *
	     * _.isSafeInteger(Infinity);
	     * // => false
	     *
	     * _.isSafeInteger('3');
	     * // => false
	     */
	    function isSafeInteger(value) {
	      return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
	    }

	    /**
	     * Checks if `value` is classified as a `Set` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.3.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	     * @example
	     *
	     * _.isSet(new Set);
	     * // => true
	     *
	     * _.isSet(new WeakSet);
	     * // => false
	     */
	    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

	    /**
	     * Checks if `value` is classified as a `String` primitive or object.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	     * @example
	     *
	     * _.isString('abc');
	     * // => true
	     *
	     * _.isString(1);
	     * // => false
	     */
	    function isString(value) {
	      return typeof value == 'string' ||
	        (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
	    }

	    /**
	     * Checks if `value` is classified as a `Symbol` primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	     * @example
	     *
	     * _.isSymbol(Symbol.iterator);
	     * // => true
	     *
	     * _.isSymbol('abc');
	     * // => false
	     */
	    function isSymbol(value) {
	      return typeof value == 'symbol' ||
	        (isObjectLike(value) && baseGetTag(value) == symbolTag);
	    }

	    /**
	     * Checks if `value` is classified as a typed array.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	     * @example
	     *
	     * _.isTypedArray(new Uint8Array);
	     * // => true
	     *
	     * _.isTypedArray([]);
	     * // => false
	     */
	    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	    /**
	     * Checks if `value` is `undefined`.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	     * @example
	     *
	     * _.isUndefined(void 0);
	     * // => true
	     *
	     * _.isUndefined(null);
	     * // => false
	     */
	    function isUndefined(value) {
	      return value === undefined;
	    }

	    /**
	     * Checks if `value` is classified as a `WeakMap` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.3.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
	     * @example
	     *
	     * _.isWeakMap(new WeakMap);
	     * // => true
	     *
	     * _.isWeakMap(new Map);
	     * // => false
	     */
	    function isWeakMap(value) {
	      return isObjectLike(value) && getTag(value) == weakMapTag;
	    }

	    /**
	     * Checks if `value` is classified as a `WeakSet` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.3.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
	     * @example
	     *
	     * _.isWeakSet(new WeakSet);
	     * // => true
	     *
	     * _.isWeakSet(new Set);
	     * // => false
	     */
	    function isWeakSet(value) {
	      return isObjectLike(value) && baseGetTag(value) == weakSetTag;
	    }

	    /**
	     * Checks if `value` is less than `other`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.9.0
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is less than `other`,
	     *  else `false`.
	     * @see _.gt
	     * @example
	     *
	     * _.lt(1, 3);
	     * // => true
	     *
	     * _.lt(3, 3);
	     * // => false
	     *
	     * _.lt(3, 1);
	     * // => false
	     */
	    var lt = createRelationalOperation(baseLt);

	    /**
	     * Checks if `value` is less than or equal to `other`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.9.0
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is less than or equal to
	     *  `other`, else `false`.
	     * @see _.gte
	     * @example
	     *
	     * _.lte(1, 3);
	     * // => true
	     *
	     * _.lte(3, 3);
	     * // => true
	     *
	     * _.lte(3, 1);
	     * // => false
	     */
	    var lte = createRelationalOperation(function(value, other) {
	      return value <= other;
	    });

	    /**
	     * Converts `value` to an array.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {Array} Returns the converted array.
	     * @example
	     *
	     * _.toArray({ 'a': 1, 'b': 2 });
	     * // => [1, 2]
	     *
	     * _.toArray('abc');
	     * // => ['a', 'b', 'c']
	     *
	     * _.toArray(1);
	     * // => []
	     *
	     * _.toArray(null);
	     * // => []
	     */
	    function toArray(value) {
	      if (!value) {
	        return [];
	      }
	      if (isArrayLike(value)) {
	        return isString(value) ? stringToArray(value) : copyArray(value);
	      }
	      if (symIterator && value[symIterator]) {
	        return iteratorToArray(value[symIterator]());
	      }
	      var tag = getTag(value),
	          func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

	      return func(value);
	    }

	    /**
	     * Converts `value` to a finite number.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.12.0
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {number} Returns the converted number.
	     * @example
	     *
	     * _.toFinite(3.2);
	     * // => 3.2
	     *
	     * _.toFinite(Number.MIN_VALUE);
	     * // => 5e-324
	     *
	     * _.toFinite(Infinity);
	     * // => 1.7976931348623157e+308
	     *
	     * _.toFinite('3.2');
	     * // => 3.2
	     */
	    function toFinite(value) {
	      if (!value) {
	        return value === 0 ? value : 0;
	      }
	      value = toNumber(value);
	      if (value === INFINITY || value === -INFINITY) {
	        var sign = (value < 0 ? -1 : 1);
	        return sign * MAX_INTEGER;
	      }
	      return value === value ? value : 0;
	    }

	    /**
	     * Converts `value` to an integer.
	     *
	     * **Note:** This method is loosely based on
	     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.toInteger(3.2);
	     * // => 3
	     *
	     * _.toInteger(Number.MIN_VALUE);
	     * // => 0
	     *
	     * _.toInteger(Infinity);
	     * // => 1.7976931348623157e+308
	     *
	     * _.toInteger('3.2');
	     * // => 3
	     */
	    function toInteger(value) {
	      var result = toFinite(value),
	          remainder = result % 1;

	      return result === result ? (remainder ? result - remainder : result) : 0;
	    }

	    /**
	     * Converts `value` to an integer suitable for use as the length of an
	     * array-like object.
	     *
	     * **Note:** This method is based on
	     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.toLength(3.2);
	     * // => 3
	     *
	     * _.toLength(Number.MIN_VALUE);
	     * // => 0
	     *
	     * _.toLength(Infinity);
	     * // => 4294967295
	     *
	     * _.toLength('3.2');
	     * // => 3
	     */
	    function toLength(value) {
	      return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
	    }

	    /**
	     * Converts `value` to a number.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to process.
	     * @returns {number} Returns the number.
	     * @example
	     *
	     * _.toNumber(3.2);
	     * // => 3.2
	     *
	     * _.toNumber(Number.MIN_VALUE);
	     * // => 5e-324
	     *
	     * _.toNumber(Infinity);
	     * // => Infinity
	     *
	     * _.toNumber('3.2');
	     * // => 3.2
	     */
	    function toNumber(value) {
	      if (typeof value == 'number') {
	        return value;
	      }
	      if (isSymbol(value)) {
	        return NAN;
	      }
	      if (isObject(value)) {
	        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	        value = isObject(other) ? (other + '') : other;
	      }
	      if (typeof value != 'string') {
	        return value === 0 ? value : +value;
	      }
	      value = value.replace(reTrim, '');
	      var isBinary = reIsBinary.test(value);
	      return (isBinary || reIsOctal.test(value))
	        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	        : (reIsBadHex.test(value) ? NAN : +value);
	    }

	    /**
	     * Converts `value` to a plain object flattening inherited enumerable string
	     * keyed properties of `value` to own properties of the plain object.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {Object} Returns the converted plain object.
	     * @example
	     *
	     * function Foo() {
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.assign({ 'a': 1 }, new Foo);
	     * // => { 'a': 1, 'b': 2 }
	     *
	     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	     * // => { 'a': 1, 'b': 2, 'c': 3 }
	     */
	    function toPlainObject(value) {
	      return copyObject(value, keysIn(value));
	    }

	    /**
	     * Converts `value` to a safe integer. A safe integer can be compared and
	     * represented correctly.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.toSafeInteger(3.2);
	     * // => 3
	     *
	     * _.toSafeInteger(Number.MIN_VALUE);
	     * // => 0
	     *
	     * _.toSafeInteger(Infinity);
	     * // => 9007199254740991
	     *
	     * _.toSafeInteger('3.2');
	     * // => 3
	     */
	    function toSafeInteger(value) {
	      return value
	        ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
	        : (value === 0 ? value : 0);
	    }

	    /**
	     * Converts `value` to a string. An empty string is returned for `null`
	     * and `undefined` values. The sign of `-0` is preserved.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {string} Returns the converted string.
	     * @example
	     *
	     * _.toString(null);
	     * // => ''
	     *
	     * _.toString(-0);
	     * // => '-0'
	     *
	     * _.toString([1, 2, 3]);
	     * // => '1,2,3'
	     */
	    function toString(value) {
	      return value == null ? '' : baseToString(value);
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Assigns own enumerable string keyed properties of source objects to the
	     * destination object. Source objects are applied from left to right.
	     * Subsequent sources overwrite property assignments of previous sources.
	     *
	     * **Note:** This method mutates `object` and is loosely based on
	     * [`Object.assign`](https://mdn.io/Object/assign).
	     *
	     * @static
	     * @memberOf _
	     * @since 0.10.0
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @returns {Object} Returns `object`.
	     * @see _.assignIn
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     * }
	     *
	     * function Bar() {
	     *   this.c = 3;
	     * }
	     *
	     * Foo.prototype.b = 2;
	     * Bar.prototype.d = 4;
	     *
	     * _.assign({ 'a': 0 }, new Foo, new Bar);
	     * // => { 'a': 1, 'c': 3 }
	     */
	    var assign = createAssigner(function(object, source) {
	      if (isPrototype(source) || isArrayLike(source)) {
	        copyObject(source, keys(source), object);
	        return;
	      }
	      for (var key in source) {
	        if (hasOwnProperty.call(source, key)) {
	          assignValue(object, key, source[key]);
	        }
	      }
	    });

	    /**
	     * This method is like `_.assign` except that it iterates over own and
	     * inherited source properties.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @alias extend
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @returns {Object} Returns `object`.
	     * @see _.assign
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     * }
	     *
	     * function Bar() {
	     *   this.c = 3;
	     * }
	     *
	     * Foo.prototype.b = 2;
	     * Bar.prototype.d = 4;
	     *
	     * _.assignIn({ 'a': 0 }, new Foo, new Bar);
	     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
	     */
	    var assignIn = createAssigner(function(object, source) {
	      copyObject(source, keysIn(source), object);
	    });

	    /**
	     * This method is like `_.assignIn` except that it accepts `customizer`
	     * which is invoked to produce the assigned values. If `customizer` returns
	     * `undefined`, assignment is handled by the method instead. The `customizer`
	     * is invoked with five arguments: (objValue, srcValue, key, object, source).
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @alias extendWith
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} sources The source objects.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @returns {Object} Returns `object`.
	     * @see _.assignWith
	     * @example
	     *
	     * function customizer(objValue, srcValue) {
	     *   return _.isUndefined(objValue) ? srcValue : objValue;
	     * }
	     *
	     * var defaults = _.partialRight(_.assignInWith, customizer);
	     *
	     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	     * // => { 'a': 1, 'b': 2 }
	     */
	    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
	      copyObject(source, keysIn(source), object, customizer);
	    });

	    /**
	     * This method is like `_.assign` except that it accepts `customizer`
	     * which is invoked to produce the assigned values. If `customizer` returns
	     * `undefined`, assignment is handled by the method instead. The `customizer`
	     * is invoked with five arguments: (objValue, srcValue, key, object, source).
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} sources The source objects.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @returns {Object} Returns `object`.
	     * @see _.assignInWith
	     * @example
	     *
	     * function customizer(objValue, srcValue) {
	     *   return _.isUndefined(objValue) ? srcValue : objValue;
	     * }
	     *
	     * var defaults = _.partialRight(_.assignWith, customizer);
	     *
	     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	     * // => { 'a': 1, 'b': 2 }
	     */
	    var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
	      copyObject(source, keys(source), object, customizer);
	    });

	    /**
	     * Creates an array of values corresponding to `paths` of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.0.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {...(string|string[])} [paths] The property paths to pick.
	     * @returns {Array} Returns the picked values.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
	     *
	     * _.at(object, ['a[0].b.c', 'a[1]']);
	     * // => [3, 4]
	     */
	    var at = flatRest(baseAt);

	    /**
	     * Creates an object that inherits from the `prototype` object. If a
	     * `properties` object is given, its own enumerable string keyed properties
	     * are assigned to the created object.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.3.0
	     * @category Object
	     * @param {Object} prototype The object to inherit from.
	     * @param {Object} [properties] The properties to assign to the object.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * function Circle() {
	     *   Shape.call(this);
	     * }
	     *
	     * Circle.prototype = _.create(Shape.prototype, {
	     *   'constructor': Circle
	     * });
	     *
	     * var circle = new Circle;
	     * circle instanceof Circle;
	     * // => true
	     *
	     * circle instanceof Shape;
	     * // => true
	     */
	    function create(prototype, properties) {
	      var result = baseCreate(prototype);
	      return properties == null ? result : baseAssign(result, properties);
	    }

	    /**
	     * Assigns own and inherited enumerable string keyed properties of source
	     * objects to the destination object for all destination properties that
	     * resolve to `undefined`. Source objects are applied from left to right.
	     * Once a property is set, additional values of the same property are ignored.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @returns {Object} Returns `object`.
	     * @see _.defaultsDeep
	     * @example
	     *
	     * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	     * // => { 'a': 1, 'b': 2 }
	     */
	    var defaults = baseRest(function(args) {
	      args.push(undefined, customDefaultsAssignIn);
	      return apply(assignInWith, undefined, args);
	    });

	    /**
	     * This method is like `_.defaults` except that it recursively assigns
	     * default properties.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.10.0
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @returns {Object} Returns `object`.
	     * @see _.defaults
	     * @example
	     *
	     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
	     * // => { 'a': { 'b': 2, 'c': 3 } }
	     */
	    var defaultsDeep = baseRest(function(args) {
	      args.push(undefined, customDefaultsMerge);
	      return apply(mergeWith, undefined, args);
	    });

	    /**
	     * This method is like `_.find` except that it returns the key of the first
	     * element `predicate` returns truthy for instead of the element itself.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.1.0
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {string|undefined} Returns the key of the matched element,
	     *  else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findKey(users, function(o) { return o.age < 40; });
	     * // => 'barney' (iteration order is not guaranteed)
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.findKey(users, { 'age': 1, 'active': true });
	     * // => 'pebbles'
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.findKey(users, ['active', false]);
	     * // => 'fred'
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.findKey(users, 'active');
	     * // => 'barney'
	     */
	    function findKey(object, predicate) {
	      return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
	    }

	    /**
	     * This method is like `_.findKey` except that it iterates over elements of
	     * a collection in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {string|undefined} Returns the key of the matched element,
	     *  else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findLastKey(users, function(o) { return o.age < 40; });
	     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.findLastKey(users, { 'age': 36, 'active': true });
	     * // => 'barney'
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.findLastKey(users, ['active', false]);
	     * // => 'fred'
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.findLastKey(users, 'active');
	     * // => 'pebbles'
	     */
	    function findLastKey(object, predicate) {
	      return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
	    }

	    /**
	     * Iterates over own and inherited enumerable string keyed properties of an
	     * object and invokes `iteratee` for each property. The iteratee is invoked
	     * with three arguments: (value, key, object). Iteratee functions may exit
	     * iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.3.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     * @see _.forInRight
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forIn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
	     */
	    function forIn(object, iteratee) {
	      return object == null
	        ? object
	        : baseFor(object, getIteratee(iteratee, 3), keysIn);
	    }

	    /**
	     * This method is like `_.forIn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     * @see _.forIn
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forInRight(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
	     */
	    function forInRight(object, iteratee) {
	      return object == null
	        ? object
	        : baseForRight(object, getIteratee(iteratee, 3), keysIn);
	    }

	    /**
	     * Iterates over own enumerable string keyed properties of an object and
	     * invokes `iteratee` for each property. The iteratee is invoked with three
	     * arguments: (value, key, object). Iteratee functions may exit iteration
	     * early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.3.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     * @see _.forOwnRight
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	     */
	    function forOwn(object, iteratee) {
	      return object && baseForOwn(object, getIteratee(iteratee, 3));
	    }

	    /**
	     * This method is like `_.forOwn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     * @see _.forOwn
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwnRight(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
	     */
	    function forOwnRight(object, iteratee) {
	      return object && baseForOwnRight(object, getIteratee(iteratee, 3));
	    }

	    /**
	     * Creates an array of function property names from own enumerable properties
	     * of `object`.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the function names.
	     * @see _.functionsIn
	     * @example
	     *
	     * function Foo() {
	     *   this.a = _.constant('a');
	     *   this.b = _.constant('b');
	     * }
	     *
	     * Foo.prototype.c = _.constant('c');
	     *
	     * _.functions(new Foo);
	     * // => ['a', 'b']
	     */
	    function functions(object) {
	      return object == null ? [] : baseFunctions(object, keys(object));
	    }

	    /**
	     * Creates an array of function property names from own and inherited
	     * enumerable properties of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the function names.
	     * @see _.functions
	     * @example
	     *
	     * function Foo() {
	     *   this.a = _.constant('a');
	     *   this.b = _.constant('b');
	     * }
	     *
	     * Foo.prototype.c = _.constant('c');
	     *
	     * _.functionsIn(new Foo);
	     * // => ['a', 'b', 'c']
	     */
	    function functionsIn(object) {
	      return object == null ? [] : baseFunctions(object, keysIn(object));
	    }

	    /**
	     * Gets the value at `path` of `object`. If the resolved value is
	     * `undefined`, the `defaultValue` is returned in its place.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.7.0
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.get(object, 'a[0].b.c');
	     * // => 3
	     *
	     * _.get(object, ['a', '0', 'b', 'c']);
	     * // => 3
	     *
	     * _.get(object, 'a.b.c', 'default');
	     * // => 'default'
	     */
	    function get(object, path, defaultValue) {
	      var result = object == null ? undefined : baseGet(object, path);
	      return result === undefined ? defaultValue : result;
	    }

	    /**
	     * Checks if `path` is a direct property of `object`.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @returns {boolean} Returns `true` if `path` exists, else `false`.
	     * @example
	     *
	     * var object = { 'a': { 'b': 2 } };
	     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
	     *
	     * _.has(object, 'a');
	     * // => true
	     *
	     * _.has(object, 'a.b');
	     * // => true
	     *
	     * _.has(object, ['a', 'b']);
	     * // => true
	     *
	     * _.has(other, 'a');
	     * // => false
	     */
	    function has(object, path) {
	      return object != null && hasPath(object, path, baseHas);
	    }

	    /**
	     * Checks if `path` is a direct or inherited property of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @returns {boolean} Returns `true` if `path` exists, else `false`.
	     * @example
	     *
	     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	     *
	     * _.hasIn(object, 'a');
	     * // => true
	     *
	     * _.hasIn(object, 'a.b');
	     * // => true
	     *
	     * _.hasIn(object, ['a', 'b']);
	     * // => true
	     *
	     * _.hasIn(object, 'b');
	     * // => false
	     */
	    function hasIn(object, path) {
	      return object != null && hasPath(object, path, baseHasIn);
	    }

	    /**
	     * Creates an object composed of the inverted keys and values of `object`.
	     * If `object` contains duplicate values, subsequent values overwrite
	     * property assignments of previous values.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.7.0
	     * @category Object
	     * @param {Object} object The object to invert.
	     * @returns {Object} Returns the new inverted object.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': 2, 'c': 1 };
	     *
	     * _.invert(object);
	     * // => { '1': 'c', '2': 'b' }
	     */
	    var invert = createInverter(function(result, value, key) {
	      result[value] = key;
	    }, constant(identity));

	    /**
	     * This method is like `_.invert` except that the inverted object is generated
	     * from the results of running each element of `object` thru `iteratee`. The
	     * corresponding inverted value of each inverted key is an array of keys
	     * responsible for generating the inverted value. The iteratee is invoked
	     * with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.1.0
	     * @category Object
	     * @param {Object} object The object to invert.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {Object} Returns the new inverted object.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': 2, 'c': 1 };
	     *
	     * _.invertBy(object);
	     * // => { '1': ['a', 'c'], '2': ['b'] }
	     *
	     * _.invertBy(object, function(value) {
	     *   return 'group' + value;
	     * });
	     * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
	     */
	    var invertBy = createInverter(function(result, value, key) {
	      if (hasOwnProperty.call(result, value)) {
	        result[value].push(key);
	      } else {
	        result[value] = [key];
	      }
	    }, getIteratee);

	    /**
	     * Invokes the method at `path` of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the method to invoke.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {*} Returns the result of the invoked method.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
	     *
	     * _.invoke(object, 'a[0].b.c.slice', 1, 3);
	     * // => [2, 3]
	     */
	    var invoke = baseRest(baseInvoke);

	    /**
	     * Creates an array of the own enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects. See the
	     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	     * for more details.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keys(new Foo);
	     * // => ['a', 'b'] (iteration order is not guaranteed)
	     *
	     * _.keys('hi');
	     * // => ['0', '1']
	     */
	    function keys(object) {
	      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	    }

	    /**
	     * Creates an array of the own and inherited enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keysIn(new Foo);
	     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	     */
	    function keysIn(object) {
	      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	    }

	    /**
	     * The opposite of `_.mapValues`; this method creates an object with the
	     * same values as `object` and keys generated by running each own enumerable
	     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
	     * with three arguments: (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.8.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns the new mapped object.
	     * @see _.mapValues
	     * @example
	     *
	     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
	     *   return key + value;
	     * });
	     * // => { 'a1': 1, 'b2': 2 }
	     */
	    function mapKeys(object, iteratee) {
	      var result = {};
	      iteratee = getIteratee(iteratee, 3);

	      baseForOwn(object, function(value, key, object) {
	        baseAssignValue(result, iteratee(value, key, object), value);
	      });
	      return result;
	    }

	    /**
	     * Creates an object with the same keys as `object` and values generated
	     * by running each own enumerable string keyed property of `object` thru
	     * `iteratee`. The iteratee is invoked with three arguments:
	     * (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @since 2.4.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns the new mapped object.
	     * @see _.mapKeys
	     * @example
	     *
	     * var users = {
	     *   'fred':    { 'user': 'fred',    'age': 40 },
	     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	     * };
	     *
	     * _.mapValues(users, function(o) { return o.age; });
	     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.mapValues(users, 'age');
	     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	     */
	    function mapValues(object, iteratee) {
	      var result = {};
	      iteratee = getIteratee(iteratee, 3);

	      baseForOwn(object, function(value, key, object) {
	        baseAssignValue(result, key, iteratee(value, key, object));
	      });
	      return result;
	    }

	    /**
	     * This method is like `_.assign` except that it recursively merges own and
	     * inherited enumerable string keyed properties of source objects into the
	     * destination object. Source properties that resolve to `undefined` are
	     * skipped if a destination value exists. Array and plain object properties
	     * are merged recursively. Other objects and value types are overridden by
	     * assignment. Source objects are applied from left to right. Subsequent
	     * sources overwrite property assignments of previous sources.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.5.0
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var object = {
	     *   'a': [{ 'b': 2 }, { 'd': 4 }]
	     * };
	     *
	     * var other = {
	     *   'a': [{ 'c': 3 }, { 'e': 5 }]
	     * };
	     *
	     * _.merge(object, other);
	     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
	     */
	    var merge = createAssigner(function(object, source, srcIndex) {
	      baseMerge(object, source, srcIndex);
	    });

	    /**
	     * This method is like `_.merge` except that it accepts `customizer` which
	     * is invoked to produce the merged values of the destination and source
	     * properties. If `customizer` returns `undefined`, merging is handled by the
	     * method instead. The `customizer` is invoked with six arguments:
	     * (objValue, srcValue, key, object, source, stack).
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} sources The source objects.
	     * @param {Function} customizer The function to customize assigned values.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function customizer(objValue, srcValue) {
	     *   if (_.isArray(objValue)) {
	     *     return objValue.concat(srcValue);
	     *   }
	     * }
	     *
	     * var object = { 'a': [1], 'b': [2] };
	     * var other = { 'a': [3], 'b': [4] };
	     *
	     * _.mergeWith(object, other, customizer);
	     * // => { 'a': [1, 3], 'b': [2, 4] }
	     */
	    var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
	      baseMerge(object, source, srcIndex, customizer);
	    });

	    /**
	     * The opposite of `_.pick`; this method creates an object composed of the
	     * own and inherited enumerable property paths of `object` that are not omitted.
	     *
	     * **Note:** This method is considerably slower than `_.pick`.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {...(string|string[])} [paths] The property paths to omit.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': '2', 'c': 3 };
	     *
	     * _.omit(object, ['a', 'c']);
	     * // => { 'b': '2' }
	     */
	    var omit = flatRest(function(object, paths) {
	      var result = {};
	      if (object == null) {
	        return result;
	      }
	      var isDeep = false;
	      paths = arrayMap(paths, function(path) {
	        path = castPath(path, object);
	        isDeep || (isDeep = path.length > 1);
	        return path;
	      });
	      copyObject(object, getAllKeysIn(object), result);
	      if (isDeep) {
	        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
	      }
	      var length = paths.length;
	      while (length--) {
	        baseUnset(result, paths[length]);
	      }
	      return result;
	    });

	    /**
	     * The opposite of `_.pickBy`; this method creates an object composed of
	     * the own and inherited enumerable string keyed properties of `object` that
	     * `predicate` doesn't return truthy for. The predicate is invoked with two
	     * arguments: (value, key).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function} [predicate=_.identity] The function invoked per property.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': '2', 'c': 3 };
	     *
	     * _.omitBy(object, _.isNumber);
	     * // => { 'b': '2' }
	     */
	    function omitBy(object, predicate) {
	      return pickBy(object, negate(getIteratee(predicate)));
	    }

	    /**
	     * Creates an object composed of the picked `object` properties.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {...(string|string[])} [paths] The property paths to pick.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': '2', 'c': 3 };
	     *
	     * _.pick(object, ['a', 'c']);
	     * // => { 'a': 1, 'c': 3 }
	     */
	    var pick = flatRest(function(object, paths) {
	      return object == null ? {} : basePick(object, paths);
	    });

	    /**
	     * Creates an object composed of the `object` properties `predicate` returns
	     * truthy for. The predicate is invoked with two arguments: (value, key).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function} [predicate=_.identity] The function invoked per property.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': '2', 'c': 3 };
	     *
	     * _.pickBy(object, _.isNumber);
	     * // => { 'a': 1, 'c': 3 }
	     */
	    function pickBy(object, predicate) {
	      if (object == null) {
	        return {};
	      }
	      var props = arrayMap(getAllKeysIn(object), function(prop) {
	        return [prop];
	      });
	      predicate = getIteratee(predicate);
	      return basePickBy(object, props, function(value, path) {
	        return predicate(value, path[0]);
	      });
	    }

	    /**
	     * This method is like `_.get` except that if the resolved value is a
	     * function it's invoked with the `this` binding of its parent object and
	     * its result is returned.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to resolve.
	     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	     *
	     * _.result(object, 'a[0].b.c1');
	     * // => 3
	     *
	     * _.result(object, 'a[0].b.c2');
	     * // => 4
	     *
	     * _.result(object, 'a[0].b.c3', 'default');
	     * // => 'default'
	     *
	     * _.result(object, 'a[0].b.c3', _.constant('default'));
	     * // => 'default'
	     */
	    function result(object, path, defaultValue) {
	      path = castPath(path, object);

	      var index = -1,
	          length = path.length;

	      // Ensure the loop is entered when path is empty.
	      if (!length) {
	        length = 1;
	        object = undefined;
	      }
	      while (++index < length) {
	        var value = object == null ? undefined : object[toKey(path[index])];
	        if (value === undefined) {
	          index = length;
	          value = defaultValue;
	        }
	        object = isFunction(value) ? value.call(object) : value;
	      }
	      return object;
	    }

	    /**
	     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
	     * it's created. Arrays are created for missing index properties while objects
	     * are created for all other missing properties. Use `_.setWith` to customize
	     * `path` creation.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.7.0
	     * @category Object
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.set(object, 'a[0].b.c', 4);
	     * console.log(object.a[0].b.c);
	     * // => 4
	     *
	     * _.set(object, ['x', '0', 'y', 'z'], 5);
	     * console.log(object.x[0].y.z);
	     * // => 5
	     */
	    function set(object, path, value) {
	      return object == null ? object : baseSet(object, path, value);
	    }

	    /**
	     * This method is like `_.set` except that it accepts `customizer` which is
	     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
	     * path creation is handled by the method instead. The `customizer` is invoked
	     * with three arguments: (nsValue, key, nsObject).
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to set.
	     * @param {*} value The value to set.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var object = {};
	     *
	     * _.setWith(object, '[0][1]', 'a', Object);
	     * // => { '0': { '1': 'a' } }
	     */
	    function setWith(object, path, value, customizer) {
	      customizer = typeof customizer == 'function' ? customizer : undefined;
	      return object == null ? object : baseSet(object, path, value, customizer);
	    }

	    /**
	     * Creates an array of own enumerable string keyed-value pairs for `object`
	     * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
	     * entries are returned.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @alias entries
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the key-value pairs.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.toPairs(new Foo);
	     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	     */
	    var toPairs = createToPairs(keys);

	    /**
	     * Creates an array of own and inherited enumerable string keyed-value pairs
	     * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
	     * or set, its entries are returned.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @alias entriesIn
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the key-value pairs.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.toPairsIn(new Foo);
	     * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
	     */
	    var toPairsIn = createToPairs(keysIn);

	    /**
	     * An alternative to `_.reduce`; this method transforms `object` to a new
	     * `accumulator` object which is the result of running each of its own
	     * enumerable string keyed properties thru `iteratee`, with each invocation
	     * potentially mutating the `accumulator` object. If `accumulator` is not
	     * provided, a new object with the same `[[Prototype]]` will be used. The
	     * iteratee is invoked with four arguments: (accumulator, value, key, object).
	     * Iteratee functions may exit iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.3.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The custom accumulator value.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * _.transform([2, 3, 4], function(result, n) {
	     *   result.push(n *= n);
	     *   return n % 2 == 0;
	     * }, []);
	     * // => [4, 9]
	     *
	     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	     *   (result[value] || (result[value] = [])).push(key);
	     * }, {});
	     * // => { '1': ['a', 'c'], '2': ['b'] }
	     */
	    function transform(object, iteratee, accumulator) {
	      var isArr = isArray(object),
	          isArrLike = isArr || isBuffer(object) || isTypedArray(object);

	      iteratee = getIteratee(iteratee, 4);
	      if (accumulator == null) {
	        var Ctor = object && object.constructor;
	        if (isArrLike) {
	          accumulator = isArr ? new Ctor : [];
	        }
	        else if (isObject(object)) {
	          accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
	        }
	        else {
	          accumulator = {};
	        }
	      }
	      (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
	        return iteratee(accumulator, value, index, object);
	      });
	      return accumulator;
	    }

	    /**
	     * Removes the property at `path` of `object`.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to unset.
	     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
	     * _.unset(object, 'a[0].b.c');
	     * // => true
	     *
	     * console.log(object);
	     * // => { 'a': [{ 'b': {} }] };
	     *
	     * _.unset(object, ['a', '0', 'b', 'c']);
	     * // => true
	     *
	     * console.log(object);
	     * // => { 'a': [{ 'b': {} }] };
	     */
	    function unset(object, path) {
	      return object == null ? true : baseUnset(object, path);
	    }

	    /**
	     * This method is like `_.set` except that accepts `updater` to produce the
	     * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
	     * is invoked with one argument: (value).
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.6.0
	     * @category Object
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to set.
	     * @param {Function} updater The function to produce the updated value.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.update(object, 'a[0].b.c', function(n) { return n * n; });
	     * console.log(object.a[0].b.c);
	     * // => 9
	     *
	     * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
	     * console.log(object.x[0].y.z);
	     * // => 0
	     */
	    function update(object, path, updater) {
	      return object == null ? object : baseUpdate(object, path, castFunction(updater));
	    }

	    /**
	     * This method is like `_.update` except that it accepts `customizer` which is
	     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
	     * path creation is handled by the method instead. The `customizer` is invoked
	     * with three arguments: (nsValue, key, nsObject).
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.6.0
	     * @category Object
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to set.
	     * @param {Function} updater The function to produce the updated value.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var object = {};
	     *
	     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
	     * // => { '0': { '1': 'a' } }
	     */
	    function updateWith(object, path, updater, customizer) {
	      customizer = typeof customizer == 'function' ? customizer : undefined;
	      return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
	    }

	    /**
	     * Creates an array of the own enumerable string keyed property values of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.values(new Foo);
	     * // => [1, 2] (iteration order is not guaranteed)
	     *
	     * _.values('hi');
	     * // => ['h', 'i']
	     */
	    function values(object) {
	      return object == null ? [] : baseValues(object, keys(object));
	    }

	    /**
	     * Creates an array of the own and inherited enumerable string keyed property
	     * values of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.valuesIn(new Foo);
	     * // => [1, 2, 3] (iteration order is not guaranteed)
	     */
	    function valuesIn(object) {
	      return object == null ? [] : baseValues(object, keysIn(object));
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Clamps `number` within the inclusive `lower` and `upper` bounds.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Number
	     * @param {number} number The number to clamp.
	     * @param {number} [lower] The lower bound.
	     * @param {number} upper The upper bound.
	     * @returns {number} Returns the clamped number.
	     * @example
	     *
	     * _.clamp(-10, -5, 5);
	     * // => -5
	     *
	     * _.clamp(10, -5, 5);
	     * // => 5
	     */
	    function clamp(number, lower, upper) {
	      if (upper === undefined) {
	        upper = lower;
	        lower = undefined;
	      }
	      if (upper !== undefined) {
	        upper = toNumber(upper);
	        upper = upper === upper ? upper : 0;
	      }
	      if (lower !== undefined) {
	        lower = toNumber(lower);
	        lower = lower === lower ? lower : 0;
	      }
	      return baseClamp(toNumber(number), lower, upper);
	    }

	    /**
	     * Checks if `n` is between `start` and up to, but not including, `end`. If
	     * `end` is not specified, it's set to `start` with `start` then set to `0`.
	     * If `start` is greater than `end` the params are swapped to support
	     * negative ranges.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.3.0
	     * @category Number
	     * @param {number} number The number to check.
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
	     * @see _.range, _.rangeRight
	     * @example
	     *
	     * _.inRange(3, 2, 4);
	     * // => true
	     *
	     * _.inRange(4, 8);
	     * // => true
	     *
	     * _.inRange(4, 2);
	     * // => false
	     *
	     * _.inRange(2, 2);
	     * // => false
	     *
	     * _.inRange(1.2, 2);
	     * // => true
	     *
	     * _.inRange(5.2, 4);
	     * // => false
	     *
	     * _.inRange(-3, -2, -6);
	     * // => true
	     */
	    function inRange(number, start, end) {
	      start = toFinite(start);
	      if (end === undefined) {
	        end = start;
	        start = 0;
	      } else {
	        end = toFinite(end);
	      }
	      number = toNumber(number);
	      return baseInRange(number, start, end);
	    }

	    /**
	     * Produces a random number between the inclusive `lower` and `upper` bounds.
	     * If only one argument is provided a number between `0` and the given number
	     * is returned. If `floating` is `true`, or either `lower` or `upper` are
	     * floats, a floating-point number is returned instead of an integer.
	     *
	     * **Note:** JavaScript follows the IEEE-754 standard for resolving
	     * floating-point values which can produce unexpected results.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.7.0
	     * @category Number
	     * @param {number} [lower=0] The lower bound.
	     * @param {number} [upper=1] The upper bound.
	     * @param {boolean} [floating] Specify returning a floating-point number.
	     * @returns {number} Returns the random number.
	     * @example
	     *
	     * _.random(0, 5);
	     * // => an integer between 0 and 5
	     *
	     * _.random(5);
	     * // => also an integer between 0 and 5
	     *
	     * _.random(5, true);
	     * // => a floating-point number between 0 and 5
	     *
	     * _.random(1.2, 5.2);
	     * // => a floating-point number between 1.2 and 5.2
	     */
	    function random(lower, upper, floating) {
	      if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
	        upper = floating = undefined;
	      }
	      if (floating === undefined) {
	        if (typeof upper == 'boolean') {
	          floating = upper;
	          upper = undefined;
	        }
	        else if (typeof lower == 'boolean') {
	          floating = lower;
	          lower = undefined;
	        }
	      }
	      if (lower === undefined && upper === undefined) {
	        lower = 0;
	        upper = 1;
	      }
	      else {
	        lower = toFinite(lower);
	        if (upper === undefined) {
	          upper = lower;
	          lower = 0;
	        } else {
	          upper = toFinite(upper);
	        }
	      }
	      if (lower > upper) {
	        var temp = lower;
	        lower = upper;
	        upper = temp;
	      }
	      if (floating || lower % 1 || upper % 1) {
	        var rand = nativeRandom();
	        return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
	      }
	      return baseRandom(lower, upper);
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the camel cased string.
	     * @example
	     *
	     * _.camelCase('Foo Bar');
	     * // => 'fooBar'
	     *
	     * _.camelCase('--foo-bar--');
	     * // => 'fooBar'
	     *
	     * _.camelCase('__FOO_BAR__');
	     * // => 'fooBar'
	     */
	    var camelCase = createCompounder(function(result, word, index) {
	      word = word.toLowerCase();
	      return result + (index ? capitalize(word) : word);
	    });

	    /**
	     * Converts the first character of `string` to upper case and the remaining
	     * to lower case.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to capitalize.
	     * @returns {string} Returns the capitalized string.
	     * @example
	     *
	     * _.capitalize('FRED');
	     * // => 'Fred'
	     */
	    function capitalize(string) {
	      return upperFirst(toString(string).toLowerCase());
	    }

	    /**
	     * Deburrs `string` by converting
	     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
	     * letters to basic Latin letters and removing
	     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to deburr.
	     * @returns {string} Returns the deburred string.
	     * @example
	     *
	     * _.deburr('déjà vu');
	     * // => 'deja vu'
	     */
	    function deburr(string) {
	      string = toString(string);
	      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
	    }

	    /**
	     * Checks if `string` ends with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to inspect.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=string.length] The position to search up to.
	     * @returns {boolean} Returns `true` if `string` ends with `target`,
	     *  else `false`.
	     * @example
	     *
	     * _.endsWith('abc', 'c');
	     * // => true
	     *
	     * _.endsWith('abc', 'b');
	     * // => false
	     *
	     * _.endsWith('abc', 'b', 2);
	     * // => true
	     */
	    function endsWith(string, target, position) {
	      string = toString(string);
	      target = baseToString(target);

	      var length = string.length;
	      position = position === undefined
	        ? length
	        : baseClamp(toInteger(position), 0, length);

	      var end = position;
	      position -= target.length;
	      return position >= 0 && string.slice(position, end) == target;
	    }

	    /**
	     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
	     * corresponding HTML entities.
	     *
	     * **Note:** No other characters are escaped. To escape additional
	     * characters use a third-party library like [_he_](https://mths.be/he).
	     *
	     * Though the ">" character is escaped for symmetry, characters like
	     * ">" and "/" don't need escaping in HTML and have no special meaning
	     * unless they're part of a tag or unquoted attribute value. See
	     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	     * (under "semi-related fun fact") for more details.
	     *
	     * When working with HTML you should always
	     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
	     * XSS vectors.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escape('fred, barney, & pebbles');
	     * // => 'fred, barney, &amp; pebbles'
	     */
	    function escape(string) {
	      string = toString(string);
	      return (string && reHasUnescapedHtml.test(string))
	        ? string.replace(reUnescapedHtml, escapeHtmlChar)
	        : string;
	    }

	    /**
	     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
	     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escapeRegExp('[lodash](https://lodash.com/)');
	     * // => '\[lodash\]\(https://lodash\.com/\)'
	     */
	    function escapeRegExp(string) {
	      string = toString(string);
	      return (string && reHasRegExpChar.test(string))
	        ? string.replace(reRegExpChar, '\\$&')
	        : string;
	    }

	    /**
	     * Converts `string` to
	     * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the kebab cased string.
	     * @example
	     *
	     * _.kebabCase('Foo Bar');
	     * // => 'foo-bar'
	     *
	     * _.kebabCase('fooBar');
	     * // => 'foo-bar'
	     *
	     * _.kebabCase('__FOO_BAR__');
	     * // => 'foo-bar'
	     */
	    var kebabCase = createCompounder(function(result, word, index) {
	      return result + (index ? '-' : '') + word.toLowerCase();
	    });

	    /**
	     * Converts `string`, as space separated words, to lower case.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the lower cased string.
	     * @example
	     *
	     * _.lowerCase('--Foo-Bar--');
	     * // => 'foo bar'
	     *
	     * _.lowerCase('fooBar');
	     * // => 'foo bar'
	     *
	     * _.lowerCase('__FOO_BAR__');
	     * // => 'foo bar'
	     */
	    var lowerCase = createCompounder(function(result, word, index) {
	      return result + (index ? ' ' : '') + word.toLowerCase();
	    });

	    /**
	     * Converts the first character of `string` to lower case.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the converted string.
	     * @example
	     *
	     * _.lowerFirst('Fred');
	     * // => 'fred'
	     *
	     * _.lowerFirst('FRED');
	     * // => 'fRED'
	     */
	    var lowerFirst = createCaseFirst('toLowerCase');

	    /**
	     * Pads `string` on the left and right sides if it's shorter than `length`.
	     * Padding characters are truncated if they can't be evenly divided by `length`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.pad('abc', 8);
	     * // => '  abc   '
	     *
	     * _.pad('abc', 8, '_-');
	     * // => '_-abc_-_'
	     *
	     * _.pad('abc', 3);
	     * // => 'abc'
	     */
	    function pad(string, length, chars) {
	      string = toString(string);
	      length = toInteger(length);

	      var strLength = length ? stringSize(string) : 0;
	      if (!length || strLength >= length) {
	        return string;
	      }
	      var mid = (length - strLength) / 2;
	      return (
	        createPadding(nativeFloor(mid), chars) +
	        string +
	        createPadding(nativeCeil(mid), chars)
	      );
	    }

	    /**
	     * Pads `string` on the right side if it's shorter than `length`. Padding
	     * characters are truncated if they exceed `length`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padEnd('abc', 6);
	     * // => 'abc   '
	     *
	     * _.padEnd('abc', 6, '_-');
	     * // => 'abc_-_'
	     *
	     * _.padEnd('abc', 3);
	     * // => 'abc'
	     */
	    function padEnd(string, length, chars) {
	      string = toString(string);
	      length = toInteger(length);

	      var strLength = length ? stringSize(string) : 0;
	      return (length && strLength < length)
	        ? (string + createPadding(length - strLength, chars))
	        : string;
	    }

	    /**
	     * Pads `string` on the left side if it's shorter than `length`. Padding
	     * characters are truncated if they exceed `length`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padStart('abc', 6);
	     * // => '   abc'
	     *
	     * _.padStart('abc', 6, '_-');
	     * // => '_-_abc'
	     *
	     * _.padStart('abc', 3);
	     * // => 'abc'
	     */
	    function padStart(string, length, chars) {
	      string = toString(string);
	      length = toInteger(length);

	      var strLength = length ? stringSize(string) : 0;
	      return (length && strLength < length)
	        ? (createPadding(length - strLength, chars) + string)
	        : string;
	    }

	    /**
	     * Converts `string` to an integer of the specified radix. If `radix` is
	     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
	     * hexadecimal, in which case a `radix` of `16` is used.
	     *
	     * **Note:** This method aligns with the
	     * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.1.0
	     * @category String
	     * @param {string} string The string to convert.
	     * @param {number} [radix=10] The radix to interpret `value` by.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.parseInt('08');
	     * // => 8
	     *
	     * _.map(['6', '08', '10'], _.parseInt);
	     * // => [6, 8, 10]
	     */
	    function parseInt(string, radix, guard) {
	      if (guard || radix == null) {
	        radix = 0;
	      } else if (radix) {
	        radix = +radix;
	      }
	      return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
	    }

	    /**
	     * Repeats the given string `n` times.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to repeat.
	     * @param {number} [n=1] The number of times to repeat the string.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {string} Returns the repeated string.
	     * @example
	     *
	     * _.repeat('*', 3);
	     * // => '***'
	     *
	     * _.repeat('abc', 2);
	     * // => 'abcabc'
	     *
	     * _.repeat('abc', 0);
	     * // => ''
	     */
	    function repeat(string, n, guard) {
	      if ((guard ? isIterateeCall(string, n, guard) : n === undefined)) {
	        n = 1;
	      } else {
	        n = toInteger(n);
	      }
	      return baseRepeat(toString(string), n);
	    }

	    /**
	     * Replaces matches for `pattern` in `string` with `replacement`.
	     *
	     * **Note:** This method is based on
	     * [`String#replace`](https://mdn.io/String/replace).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to modify.
	     * @param {RegExp|string} pattern The pattern to replace.
	     * @param {Function|string} replacement The match replacement.
	     * @returns {string} Returns the modified string.
	     * @example
	     *
	     * _.replace('Hi Fred', 'Fred', 'Barney');
	     * // => 'Hi Barney'
	     */
	    function replace() {
	      var args = arguments,
	          string = toString(args[0]);

	      return args.length < 3 ? string : string.replace(args[1], args[2]);
	    }

	    /**
	     * Converts `string` to
	     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the snake cased string.
	     * @example
	     *
	     * _.snakeCase('Foo Bar');
	     * // => 'foo_bar'
	     *
	     * _.snakeCase('fooBar');
	     * // => 'foo_bar'
	     *
	     * _.snakeCase('--FOO-BAR--');
	     * // => 'foo_bar'
	     */
	    var snakeCase = createCompounder(function(result, word, index) {
	      return result + (index ? '_' : '') + word.toLowerCase();
	    });

	    /**
	     * Splits `string` by `separator`.
	     *
	     * **Note:** This method is based on
	     * [`String#split`](https://mdn.io/String/split).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to split.
	     * @param {RegExp|string} separator The separator pattern to split by.
	     * @param {number} [limit] The length to truncate results to.
	     * @returns {Array} Returns the string segments.
	     * @example
	     *
	     * _.split('a-b-c', '-', 2);
	     * // => ['a', 'b']
	     */
	    function split(string, separator, limit) {
	      if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
	        separator = limit = undefined;
	      }
	      limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
	      if (!limit) {
	        return [];
	      }
	      string = toString(string);
	      if (string && (
	            typeof separator == 'string' ||
	            (separator != null && !isRegExp(separator))
	          )) {
	        separator = baseToString(separator);
	        if (!separator && hasUnicode(string)) {
	          return castSlice(stringToArray(string), 0, limit);
	        }
	      }
	      return string.split(separator, limit);
	    }

	    /**
	     * Converts `string` to
	     * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.1.0
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the start cased string.
	     * @example
	     *
	     * _.startCase('--foo-bar--');
	     * // => 'Foo Bar'
	     *
	     * _.startCase('fooBar');
	     * // => 'Foo Bar'
	     *
	     * _.startCase('__FOO_BAR__');
	     * // => 'FOO BAR'
	     */
	    var startCase = createCompounder(function(result, word, index) {
	      return result + (index ? ' ' : '') + upperFirst(word);
	    });

	    /**
	     * Checks if `string` starts with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to inspect.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=0] The position to search from.
	     * @returns {boolean} Returns `true` if `string` starts with `target`,
	     *  else `false`.
	     * @example
	     *
	     * _.startsWith('abc', 'a');
	     * // => true
	     *
	     * _.startsWith('abc', 'b');
	     * // => false
	     *
	     * _.startsWith('abc', 'b', 1);
	     * // => true
	     */
	    function startsWith(string, target, position) {
	      string = toString(string);
	      position = position == null
	        ? 0
	        : baseClamp(toInteger(position), 0, string.length);

	      target = baseToString(target);
	      return string.slice(position, position + target.length) == target;
	    }

	    /**
	     * Creates a compiled template function that can interpolate data properties
	     * in "interpolate" delimiters, HTML-escape interpolated data properties in
	     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
	     * properties may be accessed as free variables in the template. If a setting
	     * object is given, it takes precedence over `_.templateSettings` values.
	     *
	     * **Note:** In the development build `_.template` utilizes
	     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
	     * for easier debugging.
	     *
	     * For more information on precompiling templates see
	     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
	     *
	     * For more information on Chrome extension sandboxes see
	     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The template string.
	     * @param {Object} [options={}] The options object.
	     * @param {RegExp} [options.escape=_.templateSettings.escape]
	     *  The HTML "escape" delimiter.
	     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
	     *  The "evaluate" delimiter.
	     * @param {Object} [options.imports=_.templateSettings.imports]
	     *  An object to import into the template as free variables.
	     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
	     *  The "interpolate" delimiter.
	     * @param {string} [options.sourceURL='lodash.templateSources[n]']
	     *  The sourceURL of the compiled template.
	     * @param {string} [options.variable='obj']
	     *  The data object variable name.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Function} Returns the compiled template function.
	     * @example
	     *
	     * // Use the "interpolate" delimiter to create a compiled template.
	     * var compiled = _.template('hello <%= user %>!');
	     * compiled({ 'user': 'fred' });
	     * // => 'hello fred!'
	     *
	     * // Use the HTML "escape" delimiter to escape data property values.
	     * var compiled = _.template('<b><%- value %></b>');
	     * compiled({ 'value': '<script>' });
	     * // => '<b>&lt;script&gt;</b>'
	     *
	     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
	     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // Use the internal `print` function in "evaluate" delimiters.
	     * var compiled = _.template('<% print("hello " + user); %>!');
	     * compiled({ 'user': 'barney' });
	     * // => 'hello barney!'
	     *
	     * // Use the ES template literal delimiter as an "interpolate" delimiter.
	     * // Disable support by replacing the "interpolate" delimiter.
	     * var compiled = _.template('hello ${ user }!');
	     * compiled({ 'user': 'pebbles' });
	     * // => 'hello pebbles!'
	     *
	     * // Use backslashes to treat delimiters as plain text.
	     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
	     * compiled({ 'value': 'ignored' });
	     * // => '<%- value %>'
	     *
	     * // Use the `imports` option to import `jQuery` as `jq`.
	     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
	     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
	     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
	     * compiled(data);
	     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
	     *
	     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
	     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
	     * compiled.source;
	     * // => function(data) {
	     * //   var __t, __p = '';
	     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
	     * //   return __p;
	     * // }
	     *
	     * // Use custom template delimiters.
	     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
	     * var compiled = _.template('hello {{ user }}!');
	     * compiled({ 'user': 'mustache' });
	     * // => 'hello mustache!'
	     *
	     * // Use the `source` property to inline compiled templates for meaningful
	     * // line numbers in error messages and stack traces.
	     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
	     *   var JST = {\
	     *     "main": ' + _.template(mainText).source + '\
	     *   };\
	     * ');
	     */
	    function template(string, options, guard) {
	      // Based on John Resig's `tmpl` implementation
	      // (http://ejohn.org/blog/javascript-micro-templating/)
	      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
	      var settings = lodash.templateSettings;

	      if (guard && isIterateeCall(string, options, guard)) {
	        options = undefined;
	      }
	      string = toString(string);
	      options = assignInWith({}, options, settings, customDefaultsAssignIn);

	      var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
	          importsKeys = keys(imports),
	          importsValues = baseValues(imports, importsKeys);

	      var isEscaping,
	          isEvaluating,
	          index = 0,
	          interpolate = options.interpolate || reNoMatch,
	          source = "__p += '";

	      // Compile the regexp to match each delimiter.
	      var reDelimiters = RegExp(
	        (options.escape || reNoMatch).source + '|' +
	        interpolate.source + '|' +
	        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	        (options.evaluate || reNoMatch).source + '|$'
	      , 'g');

	      // Use a sourceURL for easier debugging.
	      var sourceURL = '//# sourceURL=' +
	        ('sourceURL' in options
	          ? options.sourceURL
	          : ('lodash.templateSources[' + (++templateCounter) + ']')
	        ) + '\n';

	      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	        interpolateValue || (interpolateValue = esTemplateValue);

	        // Escape characters that can't be included in string literals.
	        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

	        // Replace delimiters with snippets.
	        if (escapeValue) {
	          isEscaping = true;
	          source += "' +\n__e(" + escapeValue + ") +\n'";
	        }
	        if (evaluateValue) {
	          isEvaluating = true;
	          source += "';\n" + evaluateValue + ";\n__p += '";
	        }
	        if (interpolateValue) {
	          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	        }
	        index = offset + match.length;

	        // The JS engine embedded in Adobe products needs `match` returned in
	        // order to produce the correct `offset` value.
	        return match;
	      });

	      source += "';\n";

	      // If `variable` is not specified wrap a with-statement around the generated
	      // code to add the data object to the top of the scope chain.
	      var variable = options.variable;
	      if (!variable) {
	        source = 'with (obj) {\n' + source + '\n}\n';
	      }
	      // Cleanup code by stripping empty strings.
	      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	        .replace(reEmptyStringMiddle, '$1')
	        .replace(reEmptyStringTrailing, '$1;');

	      // Frame code as the function body.
	      source = 'function(' + (variable || 'obj') + ') {\n' +
	        (variable
	          ? ''
	          : 'obj || (obj = {});\n'
	        ) +
	        "var __t, __p = ''" +
	        (isEscaping
	           ? ', __e = _.escape'
	           : ''
	        ) +
	        (isEvaluating
	          ? ', __j = Array.prototype.join;\n' +
	            "function print() { __p += __j.call(arguments, '') }\n"
	          : ';\n'
	        ) +
	        source +
	        'return __p\n}';

	      var result = attempt(function() {
	        return Function(importsKeys, sourceURL + 'return ' + source)
	          .apply(undefined, importsValues);
	      });

	      // Provide the compiled function's source by its `toString` method or
	      // the `source` property as a convenience for inlining compiled templates.
	      result.source = source;
	      if (isError(result)) {
	        throw result;
	      }
	      return result;
	    }

	    /**
	     * Converts `string`, as a whole, to lower case just like
	     * [String#toLowerCase](https://mdn.io/toLowerCase).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the lower cased string.
	     * @example
	     *
	     * _.toLower('--Foo-Bar--');
	     * // => '--foo-bar--'
	     *
	     * _.toLower('fooBar');
	     * // => 'foobar'
	     *
	     * _.toLower('__FOO_BAR__');
	     * // => '__foo_bar__'
	     */
	    function toLower(value) {
	      return toString(value).toLowerCase();
	    }

	    /**
	     * Converts `string`, as a whole, to upper case just like
	     * [String#toUpperCase](https://mdn.io/toUpperCase).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the upper cased string.
	     * @example
	     *
	     * _.toUpper('--foo-bar--');
	     * // => '--FOO-BAR--'
	     *
	     * _.toUpper('fooBar');
	     * // => 'FOOBAR'
	     *
	     * _.toUpper('__foo_bar__');
	     * // => '__FOO_BAR__'
	     */
	    function toUpper(value) {
	      return toString(value).toUpperCase();
	    }

	    /**
	     * Removes leading and trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trim('  abc  ');
	     * // => 'abc'
	     *
	     * _.trim('-_-abc-_-', '_-');
	     * // => 'abc'
	     *
	     * _.map(['  foo  ', '  bar  '], _.trim);
	     * // => ['foo', 'bar']
	     */
	    function trim(string, chars, guard) {
	      string = toString(string);
	      if (string && (guard || chars === undefined)) {
	        return string.replace(reTrim, '');
	      }
	      if (!string || !(chars = baseToString(chars))) {
	        return string;
	      }
	      var strSymbols = stringToArray(string),
	          chrSymbols = stringToArray(chars),
	          start = charsStartIndex(strSymbols, chrSymbols),
	          end = charsEndIndex(strSymbols, chrSymbols) + 1;

	      return castSlice(strSymbols, start, end).join('');
	    }

	    /**
	     * Removes trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimEnd('  abc  ');
	     * // => '  abc'
	     *
	     * _.trimEnd('-_-abc-_-', '_-');
	     * // => '-_-abc'
	     */
	    function trimEnd(string, chars, guard) {
	      string = toString(string);
	      if (string && (guard || chars === undefined)) {
	        return string.replace(reTrimEnd, '');
	      }
	      if (!string || !(chars = baseToString(chars))) {
	        return string;
	      }
	      var strSymbols = stringToArray(string),
	          end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

	      return castSlice(strSymbols, 0, end).join('');
	    }

	    /**
	     * Removes leading whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimStart('  abc  ');
	     * // => 'abc  '
	     *
	     * _.trimStart('-_-abc-_-', '_-');
	     * // => 'abc-_-'
	     */
	    function trimStart(string, chars, guard) {
	      string = toString(string);
	      if (string && (guard || chars === undefined)) {
	        return string.replace(reTrimStart, '');
	      }
	      if (!string || !(chars = baseToString(chars))) {
	        return string;
	      }
	      var strSymbols = stringToArray(string),
	          start = charsStartIndex(strSymbols, stringToArray(chars));

	      return castSlice(strSymbols, start).join('');
	    }

	    /**
	     * Truncates `string` if it's longer than the given maximum string length.
	     * The last characters of the truncated string are replaced with the omission
	     * string which defaults to "...".
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to truncate.
	     * @param {Object} [options={}] The options object.
	     * @param {number} [options.length=30] The maximum string length.
	     * @param {string} [options.omission='...'] The string to indicate text is omitted.
	     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
	     * @returns {string} Returns the truncated string.
	     * @example
	     *
	     * _.truncate('hi-diddly-ho there, neighborino');
	     * // => 'hi-diddly-ho there, neighbo...'
	     *
	     * _.truncate('hi-diddly-ho there, neighborino', {
	     *   'length': 24,
	     *   'separator': ' '
	     * });
	     * // => 'hi-diddly-ho there,...'
	     *
	     * _.truncate('hi-diddly-ho there, neighborino', {
	     *   'length': 24,
	     *   'separator': /,? +/
	     * });
	     * // => 'hi-diddly-ho there...'
	     *
	     * _.truncate('hi-diddly-ho there, neighborino', {
	     *   'omission': ' [...]'
	     * });
	     * // => 'hi-diddly-ho there, neig [...]'
	     */
	    function truncate(string, options) {
	      var length = DEFAULT_TRUNC_LENGTH,
	          omission = DEFAULT_TRUNC_OMISSION;

	      if (isObject(options)) {
	        var separator = 'separator' in options ? options.separator : separator;
	        length = 'length' in options ? toInteger(options.length) : length;
	        omission = 'omission' in options ? baseToString(options.omission) : omission;
	      }
	      string = toString(string);

	      var strLength = string.length;
	      if (hasUnicode(string)) {
	        var strSymbols = stringToArray(string);
	        strLength = strSymbols.length;
	      }
	      if (length >= strLength) {
	        return string;
	      }
	      var end = length - stringSize(omission);
	      if (end < 1) {
	        return omission;
	      }
	      var result = strSymbols
	        ? castSlice(strSymbols, 0, end).join('')
	        : string.slice(0, end);

	      if (separator === undefined) {
	        return result + omission;
	      }
	      if (strSymbols) {
	        end += (result.length - end);
	      }
	      if (isRegExp(separator)) {
	        if (string.slice(end).search(separator)) {
	          var match,
	              substring = result;

	          if (!separator.global) {
	            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
	          }
	          separator.lastIndex = 0;
	          while ((match = separator.exec(substring))) {
	            var newEnd = match.index;
	          }
	          result = result.slice(0, newEnd === undefined ? end : newEnd);
	        }
	      } else if (string.indexOf(baseToString(separator), end) != end) {
	        var index = result.lastIndexOf(separator);
	        if (index > -1) {
	          result = result.slice(0, index);
	        }
	      }
	      return result + omission;
	    }

	    /**
	     * The inverse of `_.escape`; this method converts the HTML entities
	     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
	     * their corresponding characters.
	     *
	     * **Note:** No other HTML entities are unescaped. To unescape additional
	     * HTML entities use a third-party library like [_he_](https://mths.be/he).
	     *
	     * @static
	     * @memberOf _
	     * @since 0.6.0
	     * @category String
	     * @param {string} [string=''] The string to unescape.
	     * @returns {string} Returns the unescaped string.
	     * @example
	     *
	     * _.unescape('fred, barney, &amp; pebbles');
	     * // => 'fred, barney, & pebbles'
	     */
	    function unescape(string) {
	      string = toString(string);
	      return (string && reHasEscapedHtml.test(string))
	        ? string.replace(reEscapedHtml, unescapeHtmlChar)
	        : string;
	    }

	    /**
	     * Converts `string`, as space separated words, to upper case.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the upper cased string.
	     * @example
	     *
	     * _.upperCase('--foo-bar');
	     * // => 'FOO BAR'
	     *
	     * _.upperCase('fooBar');
	     * // => 'FOO BAR'
	     *
	     * _.upperCase('__foo_bar__');
	     * // => 'FOO BAR'
	     */
	    var upperCase = createCompounder(function(result, word, index) {
	      return result + (index ? ' ' : '') + word.toUpperCase();
	    });

	    /**
	     * Converts the first character of `string` to upper case.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the converted string.
	     * @example
	     *
	     * _.upperFirst('fred');
	     * // => 'Fred'
	     *
	     * _.upperFirst('FRED');
	     * // => 'FRED'
	     */
	    var upperFirst = createCaseFirst('toUpperCase');

	    /**
	     * Splits `string` into an array of its words.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to inspect.
	     * @param {RegExp|string} [pattern] The pattern to match words.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Array} Returns the words of `string`.
	     * @example
	     *
	     * _.words('fred, barney, & pebbles');
	     * // => ['fred', 'barney', 'pebbles']
	     *
	     * _.words('fred, barney, & pebbles', /[^, ]+/g);
	     * // => ['fred', 'barney', '&', 'pebbles']
	     */
	    function words(string, pattern, guard) {
	      string = toString(string);
	      pattern = guard ? undefined : pattern;

	      if (pattern === undefined) {
	        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
	      }
	      return string.match(pattern) || [];
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Attempts to invoke `func`, returning either the result or the caught error
	     * object. Any additional arguments are provided to `func` when it's invoked.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Util
	     * @param {Function} func The function to attempt.
	     * @param {...*} [args] The arguments to invoke `func` with.
	     * @returns {*} Returns the `func` result or error object.
	     * @example
	     *
	     * // Avoid throwing errors for invalid selectors.
	     * var elements = _.attempt(function(selector) {
	     *   return document.querySelectorAll(selector);
	     * }, '>_>');
	     *
	     * if (_.isError(elements)) {
	     *   elements = [];
	     * }
	     */
	    var attempt = baseRest(function(func, args) {
	      try {
	        return apply(func, undefined, args);
	      } catch (e) {
	        return isError(e) ? e : new Error(e);
	      }
	    });

	    /**
	     * Binds methods of an object to the object itself, overwriting the existing
	     * method.
	     *
	     * **Note:** This method doesn't set the "length" property of bound functions.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Util
	     * @param {Object} object The object to bind and assign the bound methods to.
	     * @param {...(string|string[])} methodNames The object method names to bind.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'click': function() {
	     *     console.log('clicked ' + this.label);
	     *   }
	     * };
	     *
	     * _.bindAll(view, ['click']);
	     * jQuery(element).on('click', view.click);
	     * // => Logs 'clicked docs' when clicked.
	     */
	    var bindAll = flatRest(function(object, methodNames) {
	      arrayEach(methodNames, function(key) {
	        key = toKey(key);
	        baseAssignValue(object, key, bind(object[key], object));
	      });
	      return object;
	    });

	    /**
	     * Creates a function that iterates over `pairs` and invokes the corresponding
	     * function of the first predicate to return truthy. The predicate-function
	     * pairs are invoked with the `this` binding and arguments of the created
	     * function.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Util
	     * @param {Array} pairs The predicate-function pairs.
	     * @returns {Function} Returns the new composite function.
	     * @example
	     *
	     * var func = _.cond([
	     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
	     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
	     *   [_.stubTrue,                      _.constant('no match')]
	     * ]);
	     *
	     * func({ 'a': 1, 'b': 2 });
	     * // => 'matches A'
	     *
	     * func({ 'a': 0, 'b': 1 });
	     * // => 'matches B'
	     *
	     * func({ 'a': '1', 'b': '2' });
	     * // => 'no match'
	     */
	    function cond(pairs) {
	      var length = pairs == null ? 0 : pairs.length,
	          toIteratee = getIteratee();

	      pairs = !length ? [] : arrayMap(pairs, function(pair) {
	        if (typeof pair[1] != 'function') {
	          throw new TypeError(FUNC_ERROR_TEXT);
	        }
	        return [toIteratee(pair[0]), pair[1]];
	      });

	      return baseRest(function(args) {
	        var index = -1;
	        while (++index < length) {
	          var pair = pairs[index];
	          if (apply(pair[0], this, args)) {
	            return apply(pair[1], this, args);
	          }
	        }
	      });
	    }

	    /**
	     * Creates a function that invokes the predicate properties of `source` with
	     * the corresponding property values of a given object, returning `true` if
	     * all predicates return truthy, else `false`.
	     *
	     * **Note:** The created function is equivalent to `_.conformsTo` with
	     * `source` partially applied.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Util
	     * @param {Object} source The object of property predicates to conform to.
	     * @returns {Function} Returns the new spec function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': 2, 'b': 1 },
	     *   { 'a': 1, 'b': 2 }
	     * ];
	     *
	     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
	     * // => [{ 'a': 1, 'b': 2 }]
	     */
	    function conforms(source) {
	      return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
	    }

	    /**
	     * Creates a function that returns `value`.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.4.0
	     * @category Util
	     * @param {*} value The value to return from the new function.
	     * @returns {Function} Returns the new constant function.
	     * @example
	     *
	     * var objects = _.times(2, _.constant({ 'a': 1 }));
	     *
	     * console.log(objects);
	     * // => [{ 'a': 1 }, { 'a': 1 }]
	     *
	     * console.log(objects[0] === objects[1]);
	     * // => true
	     */
	    function constant(value) {
	      return function() {
	        return value;
	      };
	    }

	    /**
	     * Checks `value` to determine whether a default value should be returned in
	     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
	     * or `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.14.0
	     * @category Util
	     * @param {*} value The value to check.
	     * @param {*} defaultValue The default value.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * _.defaultTo(1, 10);
	     * // => 1
	     *
	     * _.defaultTo(undefined, 10);
	     * // => 10
	     */
	    function defaultTo(value, defaultValue) {
	      return (value == null || value !== value) ? defaultValue : value;
	    }

	    /**
	     * Creates a function that returns the result of invoking the given functions
	     * with the `this` binding of the created function, where each successive
	     * invocation is supplied the return value of the previous.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Util
	     * @param {...(Function|Function[])} [funcs] The functions to invoke.
	     * @returns {Function} Returns the new composite function.
	     * @see _.flowRight
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var addSquare = _.flow([_.add, square]);
	     * addSquare(1, 2);
	     * // => 9
	     */
	    var flow = createFlow();

	    /**
	     * This method is like `_.flow` except that it creates a function that
	     * invokes the given functions from right to left.
	     *
	     * @static
	     * @since 3.0.0
	     * @memberOf _
	     * @category Util
	     * @param {...(Function|Function[])} [funcs] The functions to invoke.
	     * @returns {Function} Returns the new composite function.
	     * @see _.flow
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var addSquare = _.flowRight([square, _.add]);
	     * addSquare(1, 2);
	     * // => 9
	     */
	    var flowRight = createFlow(true);

	    /**
	     * This method returns the first argument it receives.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Util
	     * @param {*} value Any value.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * var object = { 'a': 1 };
	     *
	     * console.log(_.identity(object) === object);
	     * // => true
	     */
	    function identity(value) {
	      return value;
	    }

	    /**
	     * Creates a function that invokes `func` with the arguments of the created
	     * function. If `func` is a property name, the created function returns the
	     * property value for a given element. If `func` is an array or object, the
	     * created function returns `true` for elements that contain the equivalent
	     * source properties, otherwise it returns `false`.
	     *
	     * @static
	     * @since 4.0.0
	     * @memberOf _
	     * @category Util
	     * @param {*} [func=_.identity] The value to convert to a callback.
	     * @returns {Function} Returns the callback.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
	     * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.filter(users, _.iteratee(['user', 'fred']));
	     * // => [{ 'user': 'fred', 'age': 40 }]
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.map(users, _.iteratee('user'));
	     * // => ['barney', 'fred']
	     *
	     * // Create custom iteratee shorthands.
	     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
	     *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
	     *     return func.test(string);
	     *   };
	     * });
	     *
	     * _.filter(['abc', 'def'], /ef/);
	     * // => ['def']
	     */
	    function iteratee(func) {
	      return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
	    }

	    /**
	     * Creates a function that performs a partial deep comparison between a given
	     * object and `source`, returning `true` if the given object has equivalent
	     * property values, else `false`.
	     *
	     * **Note:** The created function is equivalent to `_.isMatch` with `source`
	     * partially applied.
	     *
	     * Partial comparisons will match empty array and empty object `source`
	     * values against any array or object value, respectively. See `_.isEqual`
	     * for a list of supported value comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Util
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new spec function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': 1, 'b': 2, 'c': 3 },
	     *   { 'a': 4, 'b': 5, 'c': 6 }
	     * ];
	     *
	     * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
	     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
	     */
	    function matches(source) {
	      return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
	    }

	    /**
	     * Creates a function that performs a partial deep comparison between the
	     * value at `path` of a given object to `srcValue`, returning `true` if the
	     * object value is equivalent, else `false`.
	     *
	     * **Note:** Partial comparisons will match empty array and empty object
	     * `srcValue` values against any array or object value, respectively. See
	     * `_.isEqual` for a list of supported value comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.2.0
	     * @category Util
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} srcValue The value to match.
	     * @returns {Function} Returns the new spec function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': 1, 'b': 2, 'c': 3 },
	     *   { 'a': 4, 'b': 5, 'c': 6 }
	     * ];
	     *
	     * _.find(objects, _.matchesProperty('a', 4));
	     * // => { 'a': 4, 'b': 5, 'c': 6 }
	     */
	    function matchesProperty(path, srcValue) {
	      return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
	    }

	    /**
	     * Creates a function that invokes the method at `path` of a given object.
	     * Any additional arguments are provided to the invoked method.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.7.0
	     * @category Util
	     * @param {Array|string} path The path of the method to invoke.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Function} Returns the new invoker function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': { 'b': _.constant(2) } },
	     *   { 'a': { 'b': _.constant(1) } }
	     * ];
	     *
	     * _.map(objects, _.method('a.b'));
	     * // => [2, 1]
	     *
	     * _.map(objects, _.method(['a', 'b']));
	     * // => [2, 1]
	     */
	    var method = baseRest(function(path, args) {
	      return function(object) {
	        return baseInvoke(object, path, args);
	      };
	    });

	    /**
	     * The opposite of `_.method`; this method creates a function that invokes
	     * the method at a given path of `object`. Any additional arguments are
	     * provided to the invoked method.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.7.0
	     * @category Util
	     * @param {Object} object The object to query.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Function} Returns the new invoker function.
	     * @example
	     *
	     * var array = _.times(3, _.constant),
	     *     object = { 'a': array, 'b': array, 'c': array };
	     *
	     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
	     * // => [2, 0]
	     *
	     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
	     * // => [2, 0]
	     */
	    var methodOf = baseRest(function(object, args) {
	      return function(path) {
	        return baseInvoke(object, path, args);
	      };
	    });

	    /**
	     * Adds all own enumerable string keyed function properties of a source
	     * object to the destination object. If `object` is a function, then methods
	     * are added to its prototype as well.
	     *
	     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
	     * avoid conflicts caused by modifying the original.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Util
	     * @param {Function|Object} [object=lodash] The destination object.
	     * @param {Object} source The object of functions to add.
	     * @param {Object} [options={}] The options object.
	     * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
	     * @returns {Function|Object} Returns `object`.
	     * @example
	     *
	     * function vowels(string) {
	     *   return _.filter(string, function(v) {
	     *     return /[aeiou]/i.test(v);
	     *   });
	     * }
	     *
	     * _.mixin({ 'vowels': vowels });
	     * _.vowels('fred');
	     * // => ['e']
	     *
	     * _('fred').vowels().value();
	     * // => ['e']
	     *
	     * _.mixin({ 'vowels': vowels }, { 'chain': false });
	     * _('fred').vowels();
	     * // => ['e']
	     */
	    function mixin(object, source, options) {
	      var props = keys(source),
	          methodNames = baseFunctions(source, props);

	      if (options == null &&
	          !(isObject(source) && (methodNames.length || !props.length))) {
	        options = source;
	        source = object;
	        object = this;
	        methodNames = baseFunctions(source, keys(source));
	      }
	      var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
	          isFunc = isFunction(object);

	      arrayEach(methodNames, function(methodName) {
	        var func = source[methodName];
	        object[methodName] = func;
	        if (isFunc) {
	          object.prototype[methodName] = function() {
	            var chainAll = this.__chain__;
	            if (chain || chainAll) {
	              var result = object(this.__wrapped__),
	                  actions = result.__actions__ = copyArray(this.__actions__);

	              actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
	              result.__chain__ = chainAll;
	              return result;
	            }
	            return func.apply(object, arrayPush([this.value()], arguments));
	          };
	        }
	      });

	      return object;
	    }

	    /**
	     * Reverts the `_` variable to its previous value and returns a reference to
	     * the `lodash` function.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Util
	     * @returns {Function} Returns the `lodash` function.
	     * @example
	     *
	     * var lodash = _.noConflict();
	     */
	    function noConflict() {
	      if (root._ === this) {
	        root._ = oldDash;
	      }
	      return this;
	    }

	    /**
	     * This method returns `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.3.0
	     * @category Util
	     * @example
	     *
	     * _.times(2, _.noop);
	     * // => [undefined, undefined]
	     */
	    function noop() {
	      // No operation performed.
	    }

	    /**
	     * Creates a function that gets the argument at index `n`. If `n` is negative,
	     * the nth argument from the end is returned.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Util
	     * @param {number} [n=0] The index of the argument to return.
	     * @returns {Function} Returns the new pass-thru function.
	     * @example
	     *
	     * var func = _.nthArg(1);
	     * func('a', 'b', 'c', 'd');
	     * // => 'b'
	     *
	     * var func = _.nthArg(-2);
	     * func('a', 'b', 'c', 'd');
	     * // => 'c'
	     */
	    function nthArg(n) {
	      n = toInteger(n);
	      return baseRest(function(args) {
	        return baseNth(args, n);
	      });
	    }

	    /**
	     * Creates a function that invokes `iteratees` with the arguments it receives
	     * and returns their results.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Util
	     * @param {...(Function|Function[])} [iteratees=[_.identity]]
	     *  The iteratees to invoke.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var func = _.over([Math.max, Math.min]);
	     *
	     * func(1, 2, 3, 4);
	     * // => [4, 1]
	     */
	    var over = createOver(arrayMap);

	    /**
	     * Creates a function that checks if **all** of the `predicates` return
	     * truthy when invoked with the arguments it receives.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Util
	     * @param {...(Function|Function[])} [predicates=[_.identity]]
	     *  The predicates to check.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var func = _.overEvery([Boolean, isFinite]);
	     *
	     * func('1');
	     * // => true
	     *
	     * func(null);
	     * // => false
	     *
	     * func(NaN);
	     * // => false
	     */
	    var overEvery = createOver(arrayEvery);

	    /**
	     * Creates a function that checks if **any** of the `predicates` return
	     * truthy when invoked with the arguments it receives.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Util
	     * @param {...(Function|Function[])} [predicates=[_.identity]]
	     *  The predicates to check.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var func = _.overSome([Boolean, isFinite]);
	     *
	     * func('1');
	     * // => true
	     *
	     * func(null);
	     * // => true
	     *
	     * func(NaN);
	     * // => false
	     */
	    var overSome = createOver(arraySome);

	    /**
	     * Creates a function that returns the value at `path` of a given object.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.4.0
	     * @category Util
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new accessor function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': { 'b': 2 } },
	     *   { 'a': { 'b': 1 } }
	     * ];
	     *
	     * _.map(objects, _.property('a.b'));
	     * // => [2, 1]
	     *
	     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	     * // => [1, 2]
	     */
	    function property(path) {
	      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	    }

	    /**
	     * The opposite of `_.property`; this method creates a function that returns
	     * the value at a given path of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Util
	     * @param {Object} object The object to query.
	     * @returns {Function} Returns the new accessor function.
	     * @example
	     *
	     * var array = [0, 1, 2],
	     *     object = { 'a': array, 'b': array, 'c': array };
	     *
	     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
	     * // => [2, 0]
	     *
	     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
	     * // => [2, 0]
	     */
	    function propertyOf(object) {
	      return function(path) {
	        return object == null ? undefined : baseGet(object, path);
	      };
	    }

	    /**
	     * Creates an array of numbers (positive and/or negative) progressing from
	     * `start` up to, but not including, `end`. A step of `-1` is used if a negative
	     * `start` is specified without an `end` or `step`. If `end` is not specified,
	     * it's set to `start` with `start` then set to `0`.
	     *
	     * **Note:** JavaScript follows the IEEE-754 standard for resolving
	     * floating-point values which can produce unexpected results.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Util
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} [step=1] The value to increment or decrement by.
	     * @returns {Array} Returns the range of numbers.
	     * @see _.inRange, _.rangeRight
	     * @example
	     *
	     * _.range(4);
	     * // => [0, 1, 2, 3]
	     *
	     * _.range(-4);
	     * // => [0, -1, -2, -3]
	     *
	     * _.range(1, 5);
	     * // => [1, 2, 3, 4]
	     *
	     * _.range(0, 20, 5);
	     * // => [0, 5, 10, 15]
	     *
	     * _.range(0, -4, -1);
	     * // => [0, -1, -2, -3]
	     *
	     * _.range(1, 4, 0);
	     * // => [1, 1, 1]
	     *
	     * _.range(0);
	     * // => []
	     */
	    var range = createRange();

	    /**
	     * This method is like `_.range` except that it populates values in
	     * descending order.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Util
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} [step=1] The value to increment or decrement by.
	     * @returns {Array} Returns the range of numbers.
	     * @see _.inRange, _.range
	     * @example
	     *
	     * _.rangeRight(4);
	     * // => [3, 2, 1, 0]
	     *
	     * _.rangeRight(-4);
	     * // => [-3, -2, -1, 0]
	     *
	     * _.rangeRight(1, 5);
	     * // => [4, 3, 2, 1]
	     *
	     * _.rangeRight(0, 20, 5);
	     * // => [15, 10, 5, 0]
	     *
	     * _.rangeRight(0, -4, -1);
	     * // => [-3, -2, -1, 0]
	     *
	     * _.rangeRight(1, 4, 0);
	     * // => [1, 1, 1]
	     *
	     * _.rangeRight(0);
	     * // => []
	     */
	    var rangeRight = createRange(true);

	    /**
	     * This method returns a new empty array.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.13.0
	     * @category Util
	     * @returns {Array} Returns the new empty array.
	     * @example
	     *
	     * var arrays = _.times(2, _.stubArray);
	     *
	     * console.log(arrays);
	     * // => [[], []]
	     *
	     * console.log(arrays[0] === arrays[1]);
	     * // => false
	     */
	    function stubArray() {
	      return [];
	    }

	    /**
	     * This method returns `false`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.13.0
	     * @category Util
	     * @returns {boolean} Returns `false`.
	     * @example
	     *
	     * _.times(2, _.stubFalse);
	     * // => [false, false]
	     */
	    function stubFalse() {
	      return false;
	    }

	    /**
	     * This method returns a new empty object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.13.0
	     * @category Util
	     * @returns {Object} Returns the new empty object.
	     * @example
	     *
	     * var objects = _.times(2, _.stubObject);
	     *
	     * console.log(objects);
	     * // => [{}, {}]
	     *
	     * console.log(objects[0] === objects[1]);
	     * // => false
	     */
	    function stubObject() {
	      return {};
	    }

	    /**
	     * This method returns an empty string.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.13.0
	     * @category Util
	     * @returns {string} Returns the empty string.
	     * @example
	     *
	     * _.times(2, _.stubString);
	     * // => ['', '']
	     */
	    function stubString() {
	      return '';
	    }

	    /**
	     * This method returns `true`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.13.0
	     * @category Util
	     * @returns {boolean} Returns `true`.
	     * @example
	     *
	     * _.times(2, _.stubTrue);
	     * // => [true, true]
	     */
	    function stubTrue() {
	      return true;
	    }

	    /**
	     * Invokes the iteratee `n` times, returning an array of the results of
	     * each invocation. The iteratee is invoked with one argument; (index).
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Util
	     * @param {number} n The number of times to invoke `iteratee`.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *
	     * _.times(3, String);
	     * // => ['0', '1', '2']
	     *
	     *  _.times(4, _.constant(0));
	     * // => [0, 0, 0, 0]
	     */
	    function times(n, iteratee) {
	      n = toInteger(n);
	      if (n < 1 || n > MAX_SAFE_INTEGER) {
	        return [];
	      }
	      var index = MAX_ARRAY_LENGTH,
	          length = nativeMin(n, MAX_ARRAY_LENGTH);

	      iteratee = getIteratee(iteratee);
	      n -= MAX_ARRAY_LENGTH;

	      var result = baseTimes(length, iteratee);
	      while (++index < n) {
	        iteratee(index);
	      }
	      return result;
	    }

	    /**
	     * Converts `value` to a property path array.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Util
	     * @param {*} value The value to convert.
	     * @returns {Array} Returns the new property path array.
	     * @example
	     *
	     * _.toPath('a.b.c');
	     * // => ['a', 'b', 'c']
	     *
	     * _.toPath('a[0].b.c');
	     * // => ['a', '0', 'b', 'c']
	     */
	    function toPath(value) {
	      if (isArray(value)) {
	        return arrayMap(value, toKey);
	      }
	      return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
	    }

	    /**
	     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Util
	     * @param {string} [prefix=''] The value to prefix the ID with.
	     * @returns {string} Returns the unique ID.
	     * @example
	     *
	     * _.uniqueId('contact_');
	     * // => 'contact_104'
	     *
	     * _.uniqueId();
	     * // => '105'
	     */
	    function uniqueId(prefix) {
	      var id = ++idCounter;
	      return toString(prefix) + id;
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Adds two numbers.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.4.0
	     * @category Math
	     * @param {number} augend The first number in an addition.
	     * @param {number} addend The second number in an addition.
	     * @returns {number} Returns the total.
	     * @example
	     *
	     * _.add(6, 4);
	     * // => 10
	     */
	    var add = createMathOperation(function(augend, addend) {
	      return augend + addend;
	    }, 0);

	    /**
	     * Computes `number` rounded up to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.10.0
	     * @category Math
	     * @param {number} number The number to round up.
	     * @param {number} [precision=0] The precision to round up to.
	     * @returns {number} Returns the rounded up number.
	     * @example
	     *
	     * _.ceil(4.006);
	     * // => 5
	     *
	     * _.ceil(6.004, 2);
	     * // => 6.01
	     *
	     * _.ceil(6040, -2);
	     * // => 6100
	     */
	    var ceil = createRound('ceil');

	    /**
	     * Divide two numbers.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.7.0
	     * @category Math
	     * @param {number} dividend The first number in a division.
	     * @param {number} divisor The second number in a division.
	     * @returns {number} Returns the quotient.
	     * @example
	     *
	     * _.divide(6, 4);
	     * // => 1.5
	     */
	    var divide = createMathOperation(function(dividend, divisor) {
	      return dividend / divisor;
	    }, 1);

	    /**
	     * Computes `number` rounded down to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.10.0
	     * @category Math
	     * @param {number} number The number to round down.
	     * @param {number} [precision=0] The precision to round down to.
	     * @returns {number} Returns the rounded down number.
	     * @example
	     *
	     * _.floor(4.006);
	     * // => 4
	     *
	     * _.floor(0.046, 2);
	     * // => 0.04
	     *
	     * _.floor(4060, -2);
	     * // => 4000
	     */
	    var floor = createRound('floor');

	    /**
	     * Computes the maximum value of `array`. If `array` is empty or falsey,
	     * `undefined` is returned.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * _.max([4, 2, 8, 6]);
	     * // => 8
	     *
	     * _.max([]);
	     * // => undefined
	     */
	    function max(array) {
	      return (array && array.length)
	        ? baseExtremum(array, identity, baseGt)
	        : undefined;
	    }

	    /**
	     * This method is like `_.max` except that it accepts `iteratee` which is
	     * invoked for each element in `array` to generate the criterion by which
	     * the value is ranked. The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * var objects = [{ 'n': 1 }, { 'n': 2 }];
	     *
	     * _.maxBy(objects, function(o) { return o.n; });
	     * // => { 'n': 2 }
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.maxBy(objects, 'n');
	     * // => { 'n': 2 }
	     */
	    function maxBy(array, iteratee) {
	      return (array && array.length)
	        ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
	        : undefined;
	    }

	    /**
	     * Computes the mean of the values in `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @returns {number} Returns the mean.
	     * @example
	     *
	     * _.mean([4, 2, 8, 6]);
	     * // => 5
	     */
	    function mean(array) {
	      return baseMean(array, identity);
	    }

	    /**
	     * This method is like `_.mean` except that it accepts `iteratee` which is
	     * invoked for each element in `array` to generate the value to be averaged.
	     * The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.7.0
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {number} Returns the mean.
	     * @example
	     *
	     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
	     *
	     * _.meanBy(objects, function(o) { return o.n; });
	     * // => 5
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.meanBy(objects, 'n');
	     * // => 5
	     */
	    function meanBy(array, iteratee) {
	      return baseMean(array, getIteratee(iteratee, 2));
	    }

	    /**
	     * Computes the minimum value of `array`. If `array` is empty or falsey,
	     * `undefined` is returned.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * _.min([4, 2, 8, 6]);
	     * // => 2
	     *
	     * _.min([]);
	     * // => undefined
	     */
	    function min(array) {
	      return (array && array.length)
	        ? baseExtremum(array, identity, baseLt)
	        : undefined;
	    }

	    /**
	     * This method is like `_.min` except that it accepts `iteratee` which is
	     * invoked for each element in `array` to generate the criterion by which
	     * the value is ranked. The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * var objects = [{ 'n': 1 }, { 'n': 2 }];
	     *
	     * _.minBy(objects, function(o) { return o.n; });
	     * // => { 'n': 1 }
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.minBy(objects, 'n');
	     * // => { 'n': 1 }
	     */
	    function minBy(array, iteratee) {
	      return (array && array.length)
	        ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
	        : undefined;
	    }

	    /**
	     * Multiply two numbers.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.7.0
	     * @category Math
	     * @param {number} multiplier The first number in a multiplication.
	     * @param {number} multiplicand The second number in a multiplication.
	     * @returns {number} Returns the product.
	     * @example
	     *
	     * _.multiply(6, 4);
	     * // => 24
	     */
	    var multiply = createMathOperation(function(multiplier, multiplicand) {
	      return multiplier * multiplicand;
	    }, 1);

	    /**
	     * Computes `number` rounded to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.10.0
	     * @category Math
	     * @param {number} number The number to round.
	     * @param {number} [precision=0] The precision to round to.
	     * @returns {number} Returns the rounded number.
	     * @example
	     *
	     * _.round(4.006);
	     * // => 4
	     *
	     * _.round(4.006, 2);
	     * // => 4.01
	     *
	     * _.round(4060, -2);
	     * // => 4100
	     */
	    var round = createRound('round');

	    /**
	     * Subtract two numbers.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Math
	     * @param {number} minuend The first number in a subtraction.
	     * @param {number} subtrahend The second number in a subtraction.
	     * @returns {number} Returns the difference.
	     * @example
	     *
	     * _.subtract(6, 4);
	     * // => 2
	     */
	    var subtract = createMathOperation(function(minuend, subtrahend) {
	      return minuend - subtrahend;
	    }, 0);

	    /**
	     * Computes the sum of the values in `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.4.0
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @returns {number} Returns the sum.
	     * @example
	     *
	     * _.sum([4, 2, 8, 6]);
	     * // => 20
	     */
	    function sum(array) {
	      return (array && array.length)
	        ? baseSum(array, identity)
	        : 0;
	    }

	    /**
	     * This method is like `_.sum` except that it accepts `iteratee` which is
	     * invoked for each element in `array` to generate the value to be summed.
	     * The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {number} Returns the sum.
	     * @example
	     *
	     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
	     *
	     * _.sumBy(objects, function(o) { return o.n; });
	     * // => 20
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.sumBy(objects, 'n');
	     * // => 20
	     */
	    function sumBy(array, iteratee) {
	      return (array && array.length)
	        ? baseSum(array, getIteratee(iteratee, 2))
	        : 0;
	    }

	    /*------------------------------------------------------------------------*/

	    // Add methods that return wrapped values in chain sequences.
	    lodash.after = after;
	    lodash.ary = ary;
	    lodash.assign = assign;
	    lodash.assignIn = assignIn;
	    lodash.assignInWith = assignInWith;
	    lodash.assignWith = assignWith;
	    lodash.at = at;
	    lodash.before = before;
	    lodash.bind = bind;
	    lodash.bindAll = bindAll;
	    lodash.bindKey = bindKey;
	    lodash.castArray = castArray;
	    lodash.chain = chain;
	    lodash.chunk = chunk;
	    lodash.compact = compact;
	    lodash.concat = concat;
	    lodash.cond = cond;
	    lodash.conforms = conforms;
	    lodash.constant = constant;
	    lodash.countBy = countBy;
	    lodash.create = create;
	    lodash.curry = curry;
	    lodash.curryRight = curryRight;
	    lodash.debounce = debounce;
	    lodash.defaults = defaults;
	    lodash.defaultsDeep = defaultsDeep;
	    lodash.defer = defer;
	    lodash.delay = delay;
	    lodash.difference = difference;
	    lodash.differenceBy = differenceBy;
	    lodash.differenceWith = differenceWith;
	    lodash.drop = drop;
	    lodash.dropRight = dropRight;
	    lodash.dropRightWhile = dropRightWhile;
	    lodash.dropWhile = dropWhile;
	    lodash.fill = fill;
	    lodash.filter = filter;
	    lodash.flatMap = flatMap;
	    lodash.flatMapDeep = flatMapDeep;
	    lodash.flatMapDepth = flatMapDepth;
	    lodash.flatten = flatten;
	    lodash.flattenDeep = flattenDeep;
	    lodash.flattenDepth = flattenDepth;
	    lodash.flip = flip;
	    lodash.flow = flow;
	    lodash.flowRight = flowRight;
	    lodash.fromPairs = fromPairs;
	    lodash.functions = functions;
	    lodash.functionsIn = functionsIn;
	    lodash.groupBy = groupBy;
	    lodash.initial = initial;
	    lodash.intersection = intersection;
	    lodash.intersectionBy = intersectionBy;
	    lodash.intersectionWith = intersectionWith;
	    lodash.invert = invert;
	    lodash.invertBy = invertBy;
	    lodash.invokeMap = invokeMap;
	    lodash.iteratee = iteratee;
	    lodash.keyBy = keyBy;
	    lodash.keys = keys;
	    lodash.keysIn = keysIn;
	    lodash.map = map;
	    lodash.mapKeys = mapKeys;
	    lodash.mapValues = mapValues;
	    lodash.matches = matches;
	    lodash.matchesProperty = matchesProperty;
	    lodash.memoize = memoize;
	    lodash.merge = merge;
	    lodash.mergeWith = mergeWith;
	    lodash.method = method;
	    lodash.methodOf = methodOf;
	    lodash.mixin = mixin;
	    lodash.negate = negate;
	    lodash.nthArg = nthArg;
	    lodash.omit = omit;
	    lodash.omitBy = omitBy;
	    lodash.once = once;
	    lodash.orderBy = orderBy;
	    lodash.over = over;
	    lodash.overArgs = overArgs;
	    lodash.overEvery = overEvery;
	    lodash.overSome = overSome;
	    lodash.partial = partial;
	    lodash.partialRight = partialRight;
	    lodash.partition = partition;
	    lodash.pick = pick;
	    lodash.pickBy = pickBy;
	    lodash.property = property;
	    lodash.propertyOf = propertyOf;
	    lodash.pull = pull;
	    lodash.pullAll = pullAll;
	    lodash.pullAllBy = pullAllBy;
	    lodash.pullAllWith = pullAllWith;
	    lodash.pullAt = pullAt;
	    lodash.range = range;
	    lodash.rangeRight = rangeRight;
	    lodash.rearg = rearg;
	    lodash.reject = reject;
	    lodash.remove = remove;
	    lodash.rest = rest;
	    lodash.reverse = reverse;
	    lodash.sampleSize = sampleSize;
	    lodash.set = set;
	    lodash.setWith = setWith;
	    lodash.shuffle = shuffle;
	    lodash.slice = slice;
	    lodash.sortBy = sortBy;
	    lodash.sortedUniq = sortedUniq;
	    lodash.sortedUniqBy = sortedUniqBy;
	    lodash.split = split;
	    lodash.spread = spread;
	    lodash.tail = tail;
	    lodash.take = take;
	    lodash.takeRight = takeRight;
	    lodash.takeRightWhile = takeRightWhile;
	    lodash.takeWhile = takeWhile;
	    lodash.tap = tap;
	    lodash.throttle = throttle;
	    lodash.thru = thru;
	    lodash.toArray = toArray;
	    lodash.toPairs = toPairs;
	    lodash.toPairsIn = toPairsIn;
	    lodash.toPath = toPath;
	    lodash.toPlainObject = toPlainObject;
	    lodash.transform = transform;
	    lodash.unary = unary;
	    lodash.union = union;
	    lodash.unionBy = unionBy;
	    lodash.unionWith = unionWith;
	    lodash.uniq = uniq;
	    lodash.uniqBy = uniqBy;
	    lodash.uniqWith = uniqWith;
	    lodash.unset = unset;
	    lodash.unzip = unzip;
	    lodash.unzipWith = unzipWith;
	    lodash.update = update;
	    lodash.updateWith = updateWith;
	    lodash.values = values;
	    lodash.valuesIn = valuesIn;
	    lodash.without = without;
	    lodash.words = words;
	    lodash.wrap = wrap;
	    lodash.xor = xor;
	    lodash.xorBy = xorBy;
	    lodash.xorWith = xorWith;
	    lodash.zip = zip;
	    lodash.zipObject = zipObject;
	    lodash.zipObjectDeep = zipObjectDeep;
	    lodash.zipWith = zipWith;

	    // Add aliases.
	    lodash.entries = toPairs;
	    lodash.entriesIn = toPairsIn;
	    lodash.extend = assignIn;
	    lodash.extendWith = assignInWith;

	    // Add methods to `lodash.prototype`.
	    mixin(lodash, lodash);

	    /*------------------------------------------------------------------------*/

	    // Add methods that return unwrapped values in chain sequences.
	    lodash.add = add;
	    lodash.attempt = attempt;
	    lodash.camelCase = camelCase;
	    lodash.capitalize = capitalize;
	    lodash.ceil = ceil;
	    lodash.clamp = clamp;
	    lodash.clone = clone;
	    lodash.cloneDeep = cloneDeep;
	    lodash.cloneDeepWith = cloneDeepWith;
	    lodash.cloneWith = cloneWith;
	    lodash.conformsTo = conformsTo;
	    lodash.deburr = deburr;
	    lodash.defaultTo = defaultTo;
	    lodash.divide = divide;
	    lodash.endsWith = endsWith;
	    lodash.eq = eq;
	    lodash.escape = escape;
	    lodash.escapeRegExp = escapeRegExp;
	    lodash.every = every;
	    lodash.find = find;
	    lodash.findIndex = findIndex;
	    lodash.findKey = findKey;
	    lodash.findLast = findLast;
	    lodash.findLastIndex = findLastIndex;
	    lodash.findLastKey = findLastKey;
	    lodash.floor = floor;
	    lodash.forEach = forEach;
	    lodash.forEachRight = forEachRight;
	    lodash.forIn = forIn;
	    lodash.forInRight = forInRight;
	    lodash.forOwn = forOwn;
	    lodash.forOwnRight = forOwnRight;
	    lodash.get = get;
	    lodash.gt = gt;
	    lodash.gte = gte;
	    lodash.has = has;
	    lodash.hasIn = hasIn;
	    lodash.head = head;
	    lodash.identity = identity;
	    lodash.includes = includes;
	    lodash.indexOf = indexOf;
	    lodash.inRange = inRange;
	    lodash.invoke = invoke;
	    lodash.isArguments = isArguments;
	    lodash.isArray = isArray;
	    lodash.isArrayBuffer = isArrayBuffer;
	    lodash.isArrayLike = isArrayLike;
	    lodash.isArrayLikeObject = isArrayLikeObject;
	    lodash.isBoolean = isBoolean;
	    lodash.isBuffer = isBuffer;
	    lodash.isDate = isDate;
	    lodash.isElement = isElement;
	    lodash.isEmpty = isEmpty;
	    lodash.isEqual = isEqual;
	    lodash.isEqualWith = isEqualWith;
	    lodash.isError = isError;
	    lodash.isFinite = isFinite;
	    lodash.isFunction = isFunction;
	    lodash.isInteger = isInteger;
	    lodash.isLength = isLength;
	    lodash.isMap = isMap;
	    lodash.isMatch = isMatch;
	    lodash.isMatchWith = isMatchWith;
	    lodash.isNaN = isNaN;
	    lodash.isNative = isNative;
	    lodash.isNil = isNil;
	    lodash.isNull = isNull;
	    lodash.isNumber = isNumber;
	    lodash.isObject = isObject;
	    lodash.isObjectLike = isObjectLike;
	    lodash.isPlainObject = isPlainObject;
	    lodash.isRegExp = isRegExp;
	    lodash.isSafeInteger = isSafeInteger;
	    lodash.isSet = isSet;
	    lodash.isString = isString;
	    lodash.isSymbol = isSymbol;
	    lodash.isTypedArray = isTypedArray;
	    lodash.isUndefined = isUndefined;
	    lodash.isWeakMap = isWeakMap;
	    lodash.isWeakSet = isWeakSet;
	    lodash.join = join;
	    lodash.kebabCase = kebabCase;
	    lodash.last = last;
	    lodash.lastIndexOf = lastIndexOf;
	    lodash.lowerCase = lowerCase;
	    lodash.lowerFirst = lowerFirst;
	    lodash.lt = lt;
	    lodash.lte = lte;
	    lodash.max = max;
	    lodash.maxBy = maxBy;
	    lodash.mean = mean;
	    lodash.meanBy = meanBy;
	    lodash.min = min;
	    lodash.minBy = minBy;
	    lodash.stubArray = stubArray;
	    lodash.stubFalse = stubFalse;
	    lodash.stubObject = stubObject;
	    lodash.stubString = stubString;
	    lodash.stubTrue = stubTrue;
	    lodash.multiply = multiply;
	    lodash.nth = nth;
	    lodash.noConflict = noConflict;
	    lodash.noop = noop;
	    lodash.now = now;
	    lodash.pad = pad;
	    lodash.padEnd = padEnd;
	    lodash.padStart = padStart;
	    lodash.parseInt = parseInt;
	    lodash.random = random;
	    lodash.reduce = reduce;
	    lodash.reduceRight = reduceRight;
	    lodash.repeat = repeat;
	    lodash.replace = replace;
	    lodash.result = result;
	    lodash.round = round;
	    lodash.runInContext = runInContext;
	    lodash.sample = sample;
	    lodash.size = size;
	    lodash.snakeCase = snakeCase;
	    lodash.some = some;
	    lodash.sortedIndex = sortedIndex;
	    lodash.sortedIndexBy = sortedIndexBy;
	    lodash.sortedIndexOf = sortedIndexOf;
	    lodash.sortedLastIndex = sortedLastIndex;
	    lodash.sortedLastIndexBy = sortedLastIndexBy;
	    lodash.sortedLastIndexOf = sortedLastIndexOf;
	    lodash.startCase = startCase;
	    lodash.startsWith = startsWith;
	    lodash.subtract = subtract;
	    lodash.sum = sum;
	    lodash.sumBy = sumBy;
	    lodash.template = template;
	    lodash.times = times;
	    lodash.toFinite = toFinite;
	    lodash.toInteger = toInteger;
	    lodash.toLength = toLength;
	    lodash.toLower = toLower;
	    lodash.toNumber = toNumber;
	    lodash.toSafeInteger = toSafeInteger;
	    lodash.toString = toString;
	    lodash.toUpper = toUpper;
	    lodash.trim = trim;
	    lodash.trimEnd = trimEnd;
	    lodash.trimStart = trimStart;
	    lodash.truncate = truncate;
	    lodash.unescape = unescape;
	    lodash.uniqueId = uniqueId;
	    lodash.upperCase = upperCase;
	    lodash.upperFirst = upperFirst;

	    // Add aliases.
	    lodash.each = forEach;
	    lodash.eachRight = forEachRight;
	    lodash.first = head;

	    mixin(lodash, (function() {
	      var source = {};
	      baseForOwn(lodash, function(func, methodName) {
	        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
	          source[methodName] = func;
	        }
	      });
	      return source;
	    }()), { 'chain': false });

	    /*------------------------------------------------------------------------*/

	    /**
	     * The semantic version number.
	     *
	     * @static
	     * @memberOf _
	     * @type {string}
	     */
	    lodash.VERSION = VERSION;

	    // Assign default placeholders.
	    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
	      lodash[methodName].placeholder = lodash;
	    });

	    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
	    arrayEach(['drop', 'take'], function(methodName, index) {
	      LazyWrapper.prototype[methodName] = function(n) {
	        n = n === undefined ? 1 : nativeMax(toInteger(n), 0);

	        var result = (this.__filtered__ && !index)
	          ? new LazyWrapper(this)
	          : this.clone();

	        if (result.__filtered__) {
	          result.__takeCount__ = nativeMin(n, result.__takeCount__);
	        } else {
	          result.__views__.push({
	            'size': nativeMin(n, MAX_ARRAY_LENGTH),
	            'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
	          });
	        }
	        return result;
	      };

	      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
	        return this.reverse()[methodName](n).reverse();
	      };
	    });

	    // Add `LazyWrapper` methods that accept an `iteratee` value.
	    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
	      var type = index + 1,
	          isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

	      LazyWrapper.prototype[methodName] = function(iteratee) {
	        var result = this.clone();
	        result.__iteratees__.push({
	          'iteratee': getIteratee(iteratee, 3),
	          'type': type
	        });
	        result.__filtered__ = result.__filtered__ || isFilter;
	        return result;
	      };
	    });

	    // Add `LazyWrapper` methods for `_.head` and `_.last`.
	    arrayEach(['head', 'last'], function(methodName, index) {
	      var takeName = 'take' + (index ? 'Right' : '');

	      LazyWrapper.prototype[methodName] = function() {
	        return this[takeName](1).value()[0];
	      };
	    });

	    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
	    arrayEach(['initial', 'tail'], function(methodName, index) {
	      var dropName = 'drop' + (index ? '' : 'Right');

	      LazyWrapper.prototype[methodName] = function() {
	        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
	      };
	    });

	    LazyWrapper.prototype.compact = function() {
	      return this.filter(identity);
	    };

	    LazyWrapper.prototype.find = function(predicate) {
	      return this.filter(predicate).head();
	    };

	    LazyWrapper.prototype.findLast = function(predicate) {
	      return this.reverse().find(predicate);
	    };

	    LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
	      if (typeof path == 'function') {
	        return new LazyWrapper(this);
	      }
	      return this.map(function(value) {
	        return baseInvoke(value, path, args);
	      });
	    });

	    LazyWrapper.prototype.reject = function(predicate) {
	      return this.filter(negate(getIteratee(predicate)));
	    };

	    LazyWrapper.prototype.slice = function(start, end) {
	      start = toInteger(start);

	      var result = this;
	      if (result.__filtered__ && (start > 0 || end < 0)) {
	        return new LazyWrapper(result);
	      }
	      if (start < 0) {
	        result = result.takeRight(-start);
	      } else if (start) {
	        result = result.drop(start);
	      }
	      if (end !== undefined) {
	        end = toInteger(end);
	        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
	      }
	      return result;
	    };

	    LazyWrapper.prototype.takeRightWhile = function(predicate) {
	      return this.reverse().takeWhile(predicate).reverse();
	    };

	    LazyWrapper.prototype.toArray = function() {
	      return this.take(MAX_ARRAY_LENGTH);
	    };

	    // Add `LazyWrapper` methods to `lodash.prototype`.
	    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
	      var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
	          isTaker = /^(?:head|last)$/.test(methodName),
	          lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName],
	          retUnwrapped = isTaker || /^find/.test(methodName);

	      if (!lodashFunc) {
	        return;
	      }
	      lodash.prototype[methodName] = function() {
	        var value = this.__wrapped__,
	            args = isTaker ? [1] : arguments,
	            isLazy = value instanceof LazyWrapper,
	            iteratee = args[0],
	            useLazy = isLazy || isArray(value);

	        var interceptor = function(value) {
	          var result = lodashFunc.apply(lodash, arrayPush([value], args));
	          return (isTaker && chainAll) ? result[0] : result;
	        };

	        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
	          // Avoid lazy use if the iteratee has a "length" value other than `1`.
	          isLazy = useLazy = false;
	        }
	        var chainAll = this.__chain__,
	            isHybrid = !!this.__actions__.length,
	            isUnwrapped = retUnwrapped && !chainAll,
	            onlyLazy = isLazy && !isHybrid;

	        if (!retUnwrapped && useLazy) {
	          value = onlyLazy ? value : new LazyWrapper(this);
	          var result = func.apply(value, args);
	          result.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined });
	          return new LodashWrapper(result, chainAll);
	        }
	        if (isUnwrapped && onlyLazy) {
	          return func.apply(this, args);
	        }
	        result = this.thru(interceptor);
	        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
	      };
	    });

	    // Add `Array` methods to `lodash.prototype`.
	    arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
	      var func = arrayProto[methodName],
	          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
	          retUnwrapped = /^(?:pop|shift)$/.test(methodName);

	      lodash.prototype[methodName] = function() {
	        var args = arguments;
	        if (retUnwrapped && !this.__chain__) {
	          var value = this.value();
	          return func.apply(isArray(value) ? value : [], args);
	        }
	        return this[chainName](function(value) {
	          return func.apply(isArray(value) ? value : [], args);
	        });
	      };
	    });

	    // Map minified method names to their real names.
	    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
	      var lodashFunc = lodash[methodName];
	      if (lodashFunc) {
	        var key = (lodashFunc.name + ''),
	            names = realNames[key] || (realNames[key] = []);

	        names.push({ 'name': methodName, 'func': lodashFunc });
	      }
	    });

	    realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
	      'name': 'wrapper',
	      'func': undefined
	    }];

	    // Add methods to `LazyWrapper`.
	    LazyWrapper.prototype.clone = lazyClone;
	    LazyWrapper.prototype.reverse = lazyReverse;
	    LazyWrapper.prototype.value = lazyValue;

	    // Add chain sequence methods to the `lodash` wrapper.
	    lodash.prototype.at = wrapperAt;
	    lodash.prototype.chain = wrapperChain;
	    lodash.prototype.commit = wrapperCommit;
	    lodash.prototype.next = wrapperNext;
	    lodash.prototype.plant = wrapperPlant;
	    lodash.prototype.reverse = wrapperReverse;
	    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

	    // Add lazy aliases.
	    lodash.prototype.first = lodash.prototype.head;

	    if (symIterator) {
	      lodash.prototype[symIterator] = wrapperToIterator;
	    }
	    return lodash;
	  });

	  /*--------------------------------------------------------------------------*/

	  // Export lodash.
	  var _ = runInContext();

	  // Some AMD build optimizers, like r.js, check for condition patterns like:
	  if (true) {
	    // Expose Lodash on the global object to prevent errors when Lodash is
	    // loaded by a script tag in the presence of an AMD loader.
	    // See http://requirejs.org/docs/errors.html#mismatch for more details.
	    // Use `_.noConflict` to remove Lodash from the global object.
	    root._ = _;

	    // Define as an anonymous module so, through path mapping, it can be
	    // referenced as the "underscore" module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // Check for `exports` after `define` in case a build optimizer adds it.
	  else if (freeModule) {
	    // Export for Node.js.
	    (freeModule.exports = _)._ = _;
	    // Export for CommonJS support.
	    freeExports._ = _;
	  }
	  else {
	    // Export to the global object.
	    root._ = _;
	  }
	}.call(this));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3)(module)))

/***/ },
/* 3 */
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

	/*!
	 * Benchmark.js <https://benchmarkjs.com/>
	 * Copyright 2010-2016 Mathias Bynens <https://mths.be/>
	 * Based on JSLitmus.js, copyright Robert Kieffer <http://broofa.com/>
	 * Modified by John-David Dalton <http://allyoucanleet.com/>
	 * Available under MIT license <https://mths.be/mit>
	 */
	;(function() {
	  'use strict';

	  /** Used as a safe reference for `undefined` in pre ES5 environments. */
	  var undefined;

	  /** Used to determine if values are of the language type Object. */
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };

	  /** Used as a reference to the global object. */
	  var root = (objectTypes[typeof window] && window) || this;

	  /** Detect free variable `define`. */
	  var freeDefine = typeof define == 'function' && typeof define.amd == 'object' && define.amd && define;

	  /** Detect free variable `exports`. */
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

	  /** Detect free variable `module`. */
	  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

	  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
	  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
	  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
	    root = freeGlobal;
	  }

	  /** Detect free variable `require`. */
	  var freeRequire = typeof require == 'function' && require;

	  /** Used to assign each benchmark an incremented id. */
	  var counter = 0;

	  /** Detect the popular CommonJS extension `module.exports`. */
	  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

	  /** Used to detect primitive types. */
	  var rePrimitive = /^(?:boolean|number|string|undefined)$/;

	  /** Used to make every compiled test unique. */
	  var uidCounter = 0;

	  /** Used to assign default `context` object properties. */
	  var contextProps = [
	    'Array', 'Date', 'Function', 'Math', 'Object', 'RegExp', 'String', '_',
	    'clearTimeout', 'chrome', 'chromium', 'document', 'navigator', 'phantom',
	    'platform', 'process', 'runtime', 'setTimeout'
	  ];

	  /** Used to avoid hz of Infinity. */
	  var divisors = {
	    '1': 4096,
	    '2': 512,
	    '3': 64,
	    '4': 8,
	    '5': 0
	  };

	  /**
	   * T-Distribution two-tailed critical values for 95% confidence.
	   * For more info see http://www.itl.nist.gov/div898/handbook/eda/section3/eda3672.htm.
	   */
	  var tTable = {
	    '1':  12.706, '2':  4.303, '3':  3.182, '4':  2.776, '5':  2.571, '6':  2.447,
	    '7':  2.365,  '8':  2.306, '9':  2.262, '10': 2.228, '11': 2.201, '12': 2.179,
	    '13': 2.16,   '14': 2.145, '15': 2.131, '16': 2.12,  '17': 2.11,  '18': 2.101,
	    '19': 2.093,  '20': 2.086, '21': 2.08,  '22': 2.074, '23': 2.069, '24': 2.064,
	    '25': 2.06,   '26': 2.056, '27': 2.052, '28': 2.048, '29': 2.045, '30': 2.042,
	    'infinity': 1.96
	  };

	  /**
	   * Critical Mann-Whitney U-values for 95% confidence.
	   * For more info see http://www.saburchill.com/IBbiology/stats/003.html.
	   */
	  var uTable = {
	    '5':  [0, 1, 2],
	    '6':  [1, 2, 3, 5],
	    '7':  [1, 3, 5, 6, 8],
	    '8':  [2, 4, 6, 8, 10, 13],
	    '9':  [2, 4, 7, 10, 12, 15, 17],
	    '10': [3, 5, 8, 11, 14, 17, 20, 23],
	    '11': [3, 6, 9, 13, 16, 19, 23, 26, 30],
	    '12': [4, 7, 11, 14, 18, 22, 26, 29, 33, 37],
	    '13': [4, 8, 12, 16, 20, 24, 28, 33, 37, 41, 45],
	    '14': [5, 9, 13, 17, 22, 26, 31, 36, 40, 45, 50, 55],
	    '15': [5, 10, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64],
	    '16': [6, 11, 15, 21, 26, 31, 37, 42, 47, 53, 59, 64, 70, 75],
	    '17': [6, 11, 17, 22, 28, 34, 39, 45, 51, 57, 63, 67, 75, 81, 87],
	    '18': [7, 12, 18, 24, 30, 36, 42, 48, 55, 61, 67, 74, 80, 86, 93, 99],
	    '19': [7, 13, 19, 25, 32, 38, 45, 52, 58, 65, 72, 78, 85, 92, 99, 106, 113],
	    '20': [8, 14, 20, 27, 34, 41, 48, 55, 62, 69, 76, 83, 90, 98, 105, 112, 119, 127],
	    '21': [8, 15, 22, 29, 36, 43, 50, 58, 65, 73, 80, 88, 96, 103, 111, 119, 126, 134, 142],
	    '22': [9, 16, 23, 30, 38, 45, 53, 61, 69, 77, 85, 93, 101, 109, 117, 125, 133, 141, 150, 158],
	    '23': [9, 17, 24, 32, 40, 48, 56, 64, 73, 81, 89, 98, 106, 115, 123, 132, 140, 149, 157, 166, 175],
	    '24': [10, 17, 25, 33, 42, 50, 59, 67, 76, 85, 94, 102, 111, 120, 129, 138, 147, 156, 165, 174, 183, 192],
	    '25': [10, 18, 27, 35, 44, 53, 62, 71, 80, 89, 98, 107, 117, 126, 135, 145, 154, 163, 173, 182, 192, 201, 211],
	    '26': [11, 19, 28, 37, 46, 55, 64, 74, 83, 93, 102, 112, 122, 132, 141, 151, 161, 171, 181, 191, 200, 210, 220, 230],
	    '27': [11, 20, 29, 38, 48, 57, 67, 77, 87, 97, 107, 118, 125, 138, 147, 158, 168, 178, 188, 199, 209, 219, 230, 240, 250],
	    '28': [12, 21, 30, 40, 50, 60, 70, 80, 90, 101, 111, 122, 132, 143, 154, 164, 175, 186, 196, 207, 218, 228, 239, 250, 261, 272],
	    '29': [13, 22, 32, 42, 52, 62, 73, 83, 94, 105, 116, 127, 138, 149, 160, 171, 182, 193, 204, 215, 226, 238, 249, 260, 271, 282, 294],
	    '30': [13, 23, 33, 43, 54, 65, 76, 87, 98, 109, 120, 131, 143, 154, 166, 177, 189, 200, 212, 223, 235, 247, 258, 270, 282, 293, 305, 317]
	  };

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Create a new `Benchmark` function using the given `context` object.
	   *
	   * @static
	   * @memberOf Benchmark
	   * @param {Object} [context=root] The context object.
	   * @returns {Function} Returns a new `Benchmark` function.
	   */
	  function runInContext(context) {
	    // Exit early if unable to acquire lodash.
	    var _ = context && context._ || require('lodash') || root._;
	    if (!_) {
	      Benchmark.runInContext = runInContext;
	      return Benchmark;
	    }
	    // Avoid issues with some ES3 environments that attempt to use values, named
	    // after built-in constructors like `Object`, for the creation of literals.
	    // ES5 clears this up by stating that literals must use built-in constructors.
	    // See http://es5.github.io/#x11.1.5.
	    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

	    /** Native constructor references. */
	    var Array = context.Array,
	        Date = context.Date,
	        Function = context.Function,
	        Math = context.Math,
	        Object = context.Object,
	        RegExp = context.RegExp,
	        String = context.String;

	    /** Used for `Array` and `Object` method references. */
	    var arrayRef = [],
	        objectProto = Object.prototype;

	    /** Native method shortcuts. */
	    var abs = Math.abs,
	        clearTimeout = context.clearTimeout,
	        floor = Math.floor,
	        log = Math.log,
	        max = Math.max,
	        min = Math.min,
	        pow = Math.pow,
	        push = arrayRef.push,
	        setTimeout = context.setTimeout,
	        shift = arrayRef.shift,
	        slice = arrayRef.slice,
	        sqrt = Math.sqrt,
	        toString = objectProto.toString,
	        unshift = arrayRef.unshift;

	    /** Used to avoid inclusion in Browserified bundles. */
	    var req = require;

	    /** Detect DOM document object. */
	    var doc = isHostType(context, 'document') && context.document;

	    /** Used to access Wade Simmons' Node.js `microtime` module. */
	    var microtimeObject = req('microtime');

	    /** Used to access Node.js's high resolution timer. */
	    var processObject = isHostType(context, 'process') && context.process;

	    /** Used to prevent a `removeChild` memory leak in IE < 9. */
	    var trash = doc && doc.createElement('div');

	    /** Used to integrity check compiled tests. */
	    var uid = 'uid' + _.now();

	    /** Used to avoid infinite recursion when methods call each other. */
	    var calledBy = {};

	    /**
	     * An object used to flag environments/features.
	     *
	     * @static
	     * @memberOf Benchmark
	     * @type Object
	     */
	    var support = {};

	    (function() {

	      /**
	       * Detect if running in a browser environment.
	       *
	       * @memberOf Benchmark.support
	       * @type boolean
	       */
	      support.browser = doc && isHostType(context, 'navigator') && !isHostType(context, 'phantom');

	      /**
	       * Detect if the Timers API exists.
	       *
	       * @memberOf Benchmark.support
	       * @type boolean
	       */
	      support.timeout = isHostType(context, 'setTimeout') && isHostType(context, 'clearTimeout');

	      /**
	       * Detect if function decompilation is support.
	       *
	       * @name decompilation
	       * @memberOf Benchmark.support
	       * @type boolean
	       */
	      try {
	        // Safari 2.x removes commas in object literals from `Function#toString` results.
	        // See http://webk.it/11609 for more details.
	        // Firefox 3.6 and Opera 9.25 strip grouping parentheses from `Function#toString` results.
	        // See http://bugzil.la/559438 for more details.
	        support.decompilation = Function(
	          ('return (' + (function(x) { return { 'x': '' + (1 + x) + '', 'y': 0 }; }) + ')')
	          // Avoid issues with code added by Istanbul.
	          .replace(/__cov__[^;]+;/g, '')
	        )()(0).x === '1';
	      } catch(e) {
	        support.decompilation = false;
	      }
	    }());

	    /**
	     * Timer object used by `clock()` and `Deferred#resolve`.
	     *
	     * @private
	     * @type Object
	     */
	    var timer = {

	      /**
	       * The timer namespace object or constructor.
	       *
	       * @private
	       * @memberOf timer
	       * @type {Function|Object}
	       */
	      'ns': Date,

	      /**
	       * Starts the deferred timer.
	       *
	       * @private
	       * @memberOf timer
	       * @param {Object} deferred The deferred instance.
	       */
	      'start': null, // Lazy defined in `clock()`.

	      /**
	       * Stops the deferred timer.
	       *
	       * @private
	       * @memberOf timer
	       * @param {Object} deferred The deferred instance.
	       */
	      'stop': null // Lazy defined in `clock()`.
	    };

	    /*------------------------------------------------------------------------*/

	    /**
	     * The Benchmark constructor.
	     *
	     * Note: The Benchmark constructor exposes a handful of lodash methods to
	     * make working with arrays, collections, and objects easier. The lodash
	     * methods are:
	     * [`each/forEach`](https://lodash.com/docs#forEach), [`forOwn`](https://lodash.com/docs#forOwn),
	     * [`has`](https://lodash.com/docs#has), [`indexOf`](https://lodash.com/docs#indexOf),
	     * [`map`](https://lodash.com/docs#map), and [`reduce`](https://lodash.com/docs#reduce)
	     *
	     * @constructor
	     * @param {string} name A name to identify the benchmark.
	     * @param {Function|string} fn The test to benchmark.
	     * @param {Object} [options={}] Options object.
	     * @example
	     *
	     * // basic usage (the `new` operator is optional)
	     * var bench = new Benchmark(fn);
	     *
	     * // or using a name first
	     * var bench = new Benchmark('foo', fn);
	     *
	     * // or with options
	     * var bench = new Benchmark('foo', fn, {
	     *
	     *   // displayed by `Benchmark#toString` if `name` is not available
	     *   'id': 'xyz',
	     *
	     *   // called when the benchmark starts running
	     *   'onStart': onStart,
	     *
	     *   // called after each run cycle
	     *   'onCycle': onCycle,
	     *
	     *   // called when aborted
	     *   'onAbort': onAbort,
	     *
	     *   // called when a test errors
	     *   'onError': onError,
	     *
	     *   // called when reset
	     *   'onReset': onReset,
	     *
	     *   // called when the benchmark completes running
	     *   'onComplete': onComplete,
	     *
	     *   // compiled/called before the test loop
	     *   'setup': setup,
	     *
	     *   // compiled/called after the test loop
	     *   'teardown': teardown
	     * });
	     *
	     * // or name and options
	     * var bench = new Benchmark('foo', {
	     *
	     *   // a flag to indicate the benchmark is deferred
	     *   'defer': true,
	     *
	     *   // benchmark test function
	     *   'fn': function(deferred) {
	     *     // call `Deferred#resolve` when the deferred test is finished
	     *     deferred.resolve();
	     *   }
	     * });
	     *
	     * // or options only
	     * var bench = new Benchmark({
	     *
	     *   // benchmark name
	     *   'name': 'foo',
	     *
	     *   // benchmark test as a string
	     *   'fn': '[1,2,3,4].sort()'
	     * });
	     *
	     * // a test's `this` binding is set to the benchmark instance
	     * var bench = new Benchmark('foo', function() {
	     *   'My name is '.concat(this.name); // "My name is foo"
	     * });
	     */
	    function Benchmark(name, fn, options) {
	      var bench = this;

	      // Allow instance creation without the `new` operator.
	      if (!(bench instanceof Benchmark)) {
	        return new Benchmark(name, fn, options);
	      }
	      // Juggle arguments.
	      if (_.isPlainObject(name)) {
	        // 1 argument (options).
	        options = name;
	      }
	      else if (_.isFunction(name)) {
	        // 2 arguments (fn, options).
	        options = fn;
	        fn = name;
	      }
	      else if (_.isPlainObject(fn)) {
	        // 2 arguments (name, options).
	        options = fn;
	        fn = null;
	        bench.name = name;
	      }
	      else {
	        // 3 arguments (name, fn [, options]).
	        bench.name = name;
	      }
	      setOptions(bench, options);

	      bench.id || (bench.id = ++counter);
	      bench.fn == null && (bench.fn = fn);

	      bench.stats = cloneDeep(bench.stats);
	      bench.times = cloneDeep(bench.times);
	    }

	    /**
	     * The Deferred constructor.
	     *
	     * @constructor
	     * @memberOf Benchmark
	     * @param {Object} clone The cloned benchmark instance.
	     */
	    function Deferred(clone) {
	      var deferred = this;
	      if (!(deferred instanceof Deferred)) {
	        return new Deferred(clone);
	      }
	      deferred.benchmark = clone;
	      clock(deferred);
	    }

	    /**
	     * The Event constructor.
	     *
	     * @constructor
	     * @memberOf Benchmark
	     * @param {Object|string} type The event type.
	     */
	    function Event(type) {
	      var event = this;
	      if (type instanceof Event) {
	        return type;
	      }
	      return (event instanceof Event)
	        ? _.assign(event, { 'timeStamp': _.now() }, typeof type == 'string' ? { 'type': type } : type)
	        : new Event(type);
	    }

	    /**
	     * The Suite constructor.
	     *
	     * Note: Each Suite instance has a handful of wrapped lodash methods to
	     * make working with Suites easier. The wrapped lodash methods are:
	     * [`each/forEach`](https://lodash.com/docs#forEach), [`indexOf`](https://lodash.com/docs#indexOf),
	     * [`map`](https://lodash.com/docs#map), and [`reduce`](https://lodash.com/docs#reduce)
	     *
	     * @constructor
	     * @memberOf Benchmark
	     * @param {string} name A name to identify the suite.
	     * @param {Object} [options={}] Options object.
	     * @example
	     *
	     * // basic usage (the `new` operator is optional)
	     * var suite = new Benchmark.Suite;
	     *
	     * // or using a name first
	     * var suite = new Benchmark.Suite('foo');
	     *
	     * // or with options
	     * var suite = new Benchmark.Suite('foo', {
	     *
	     *   // called when the suite starts running
	     *   'onStart': onStart,
	     *
	     *   // called between running benchmarks
	     *   'onCycle': onCycle,
	     *
	     *   // called when aborted
	     *   'onAbort': onAbort,
	     *
	     *   // called when a test errors
	     *   'onError': onError,
	     *
	     *   // called when reset
	     *   'onReset': onReset,
	     *
	     *   // called when the suite completes running
	     *   'onComplete': onComplete
	     * });
	     */
	    function Suite(name, options) {
	      var suite = this;

	      // Allow instance creation without the `new` operator.
	      if (!(suite instanceof Suite)) {
	        return new Suite(name, options);
	      }
	      // Juggle arguments.
	      if (_.isPlainObject(name)) {
	        // 1 argument (options).
	        options = name;
	      } else {
	        // 2 arguments (name [, options]).
	        suite.name = name;
	      }
	      setOptions(suite, options);
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * A specialized version of `_.cloneDeep` which only clones arrays and plain
	     * objects assigning all other values by reference.
	     *
	     * @private
	     * @param {*} value The value to clone.
	     * @returns {*} The cloned value.
	     */
	    var cloneDeep = _.partial(_.cloneDeepWith, _, function(value) {
	      // Only clone primitives, arrays, and plain objects.
	      if (!_.isArray(value) && !_.isPlainObject(value)) {
	        return value;
	      }
	    });

	    /**
	     * Creates a function from the given arguments string and body.
	     *
	     * @private
	     * @param {string} args The comma separated function arguments.
	     * @param {string} body The function body.
	     * @returns {Function} The new function.
	     */
	    function createFunction() {
	      // Lazy define.
	      createFunction = function(args, body) {
	        var result,
	            anchor = freeDefine ? freeDefine.amd : Benchmark,
	            prop = uid + 'createFunction';

	        runScript((freeDefine ? 'define.amd.' : 'Benchmark.') + prop + '=function(' + args + '){' + body + '}');
	        result = anchor[prop];
	        delete anchor[prop];
	        return result;
	      };
	      // Fix JaegerMonkey bug.
	      // For more information see http://bugzil.la/639720.
	      createFunction = support.browser && (createFunction('', 'return"' + uid + '"') || _.noop)() == uid ? createFunction : Function;
	      return createFunction.apply(null, arguments);
	    }

	    /**
	     * Delay the execution of a function based on the benchmark's `delay` property.
	     *
	     * @private
	     * @param {Object} bench The benchmark instance.
	     * @param {Object} fn The function to execute.
	     */
	    function delay(bench, fn) {
	      bench._timerId = _.delay(fn, bench.delay * 1e3);
	    }

	    /**
	     * Destroys the given element.
	     *
	     * @private
	     * @param {Element} element The element to destroy.
	     */
	    function destroyElement(element) {
	      trash.appendChild(element);
	      trash.innerHTML = '';
	    }

	    /**
	     * Gets the name of the first argument from a function's source.
	     *
	     * @private
	     * @param {Function} fn The function.
	     * @returns {string} The argument name.
	     */
	    function getFirstArgument(fn) {
	      return (!_.has(fn, 'toString') &&
	        (/^[\s(]*function[^(]*\(([^\s,)]+)/.exec(fn) || 0)[1]) || '';
	    }

	    /**
	     * Computes the arithmetic mean of a sample.
	     *
	     * @private
	     * @param {Array} sample The sample.
	     * @returns {number} The mean.
	     */
	    function getMean(sample) {
	      return (_.reduce(sample, function(sum, x) {
	        return sum + x;
	      }) / sample.length) || 0;
	    }

	    /**
	     * Gets the source code of a function.
	     *
	     * @private
	     * @param {Function} fn The function.
	     * @returns {string} The function's source code.
	     */
	    function getSource(fn) {
	      var result = '';
	      if (isStringable(fn)) {
	        result = String(fn);
	      } else if (support.decompilation) {
	        // Escape the `{` for Firefox 1.
	        result = _.result(/^[^{]+\{([\s\S]*)\}\s*$/.exec(fn), 1);
	      }
	      // Trim string.
	      result = (result || '').replace(/^\s+|\s+$/g, '');

	      // Detect strings containing only the "use strict" directive.
	      return /^(?:\/\*+[\w\W]*?\*\/|\/\/.*?[\n\r\u2028\u2029]|\s)*(["'])use strict\1;?$/.test(result)
	        ? ''
	        : result;
	    }

	    /**
	     * Checks if an object is of the specified class.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {string} name The name of the class.
	     * @returns {boolean} Returns `true` if the value is of the specified class, else `false`.
	     */
	    function isClassOf(value, name) {
	      return value != null && toString.call(value) == '[object ' + name + ']';
	    }

	    /**
	     * Host objects can return type values that are different from their actual
	     * data type. The objects we are concerned with usually return non-primitive
	     * types of "object", "function", or "unknown".
	     *
	     * @private
	     * @param {*} object The owner of the property.
	     * @param {string} property The property to check.
	     * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
	     */
	    function isHostType(object, property) {
	      if (object == null) {
	        return false;
	      }
	      var type = typeof object[property];
	      return !rePrimitive.test(type) && (type != 'object' || !!object[property]);
	    }

	    /**
	     * Checks if a value can be safely coerced to a string.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the value can be coerced, else `false`.
	     */
	    function isStringable(value) {
	      return _.isString(value) || (_.has(value, 'toString') && _.isFunction(value.toString));
	    }

	    /**
	     * A wrapper around `require` to suppress `module missing` errors.
	     *
	     * @private
	     * @param {string} id The module id.
	     * @returns {*} The exported module or `null`.
	     */
	    function require(id) {
	      try {
	        var result = freeExports && freeRequire(id);
	      } catch(e) {}
	      return result || null;
	    }

	    /**
	     * Runs a snippet of JavaScript via script injection.
	     *
	     * @private
	     * @param {string} code The code to run.
	     */
	    function runScript(code) {
	      var anchor = freeDefine ? define.amd : Benchmark,
	          script = doc.createElement('script'),
	          sibling = doc.getElementsByTagName('script')[0],
	          parent = sibling.parentNode,
	          prop = uid + 'runScript',
	          prefix = '(' + (freeDefine ? 'define.amd.' : 'Benchmark.') + prop + '||function(){})();';

	      // Firefox 2.0.0.2 cannot use script injection as intended because it executes
	      // asynchronously, but that's OK because script injection is only used to avoid
	      // the previously commented JaegerMonkey bug.
	      try {
	        // Remove the inserted script *before* running the code to avoid differences
	        // in the expected script element count/order of the document.
	        script.appendChild(doc.createTextNode(prefix + code));
	        anchor[prop] = function() { destroyElement(script); };
	      } catch(e) {
	        parent = parent.cloneNode(false);
	        sibling = null;
	        script.text = code;
	      }
	      parent.insertBefore(script, sibling);
	      delete anchor[prop];
	    }

	    /**
	     * A helper function for setting options/event handlers.
	     *
	     * @private
	     * @param {Object} object The benchmark or suite instance.
	     * @param {Object} [options={}] Options object.
	     */
	    function setOptions(object, options) {
	      options = object.options = _.assign({}, cloneDeep(object.constructor.options), cloneDeep(options));

	      _.forOwn(options, function(value, key) {
	        if (value != null) {
	          // Add event listeners.
	          if (/^on[A-Z]/.test(key)) {
	            _.each(key.split(' '), function(key) {
	              object.on(key.slice(2).toLowerCase(), value);
	            });
	          } else if (!_.has(object, key)) {
	            object[key] = cloneDeep(value);
	          }
	        }
	      });
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Handles cycling/completing the deferred benchmark.
	     *
	     * @memberOf Benchmark.Deferred
	     */
	    function resolve() {
	      var deferred = this,
	          clone = deferred.benchmark,
	          bench = clone._original;

	      if (bench.aborted) {
	        // cycle() -> clone cycle/complete event -> compute()'s invoked bench.run() cycle/complete.
	        deferred.teardown();
	        clone.running = false;
	        cycle(deferred);
	      }
	      else if (++deferred.cycles < clone.count) {
	        clone.compiled.call(deferred, context, timer);
	      }
	      else {
	        timer.stop(deferred);
	        deferred.teardown();
	        delay(clone, function() { cycle(deferred); });
	      }
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * A generic `Array#filter` like method.
	     *
	     * @static
	     * @memberOf Benchmark
	     * @param {Array} array The array to iterate over.
	     * @param {Function|string} callback The function/alias called per iteration.
	     * @returns {Array} A new array of values that passed callback filter.
	     * @example
	     *
	     * // get odd numbers
	     * Benchmark.filter([1, 2, 3, 4, 5], function(n) {
	     *   return n % 2;
	     * }); // -> [1, 3, 5];
	     *
	     * // get fastest benchmarks
	     * Benchmark.filter(benches, 'fastest');
	     *
	     * // get slowest benchmarks
	     * Benchmark.filter(benches, 'slowest');
	     *
	     * // get benchmarks that completed without erroring
	     * Benchmark.filter(benches, 'successful');
	     */
	    function filter(array, callback) {
	      if (callback === 'successful') {
	        // Callback to exclude those that are errored, unrun, or have hz of Infinity.
	        callback = function(bench) {
	          return bench.cycles && _.isFinite(bench.hz) && !bench.error;
	        };
	      }
	      else if (callback === 'fastest' || callback === 'slowest') {
	        // Get successful, sort by period + margin of error, and filter fastest/slowest.
	        var result = filter(array, 'successful').sort(function(a, b) {
	          a = a.stats; b = b.stats;
	          return (a.mean + a.moe > b.mean + b.moe ? 1 : -1) * (callback === 'fastest' ? 1 : -1);
	        });

	        return _.filter(result, function(bench) {
	          return result[0].compare(bench) == 0;
	        });
	      }
	      return _.filter(array, callback);
	    }

	    /**
	     * Converts a number to a more readable comma-separated string representation.
	     *
	     * @static
	     * @memberOf Benchmark
	     * @param {number} number The number to convert.
	     * @returns {string} The more readable string representation.
	     */
	    function formatNumber(number) {
	      number = String(number).split('.');
	      return number[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',') +
	        (number[1] ? '.' + number[1] : '');
	    }

	    /**
	     * Invokes a method on all items in an array.
	     *
	     * @static
	     * @memberOf Benchmark
	     * @param {Array} benches Array of benchmarks to iterate over.
	     * @param {Object|string} name The name of the method to invoke OR options object.
	     * @param {...*} [args] Arguments to invoke the method with.
	     * @returns {Array} A new array of values returned from each method invoked.
	     * @example
	     *
	     * // invoke `reset` on all benchmarks
	     * Benchmark.invoke(benches, 'reset');
	     *
	     * // invoke `emit` with arguments
	     * Benchmark.invoke(benches, 'emit', 'complete', listener);
	     *
	     * // invoke `run(true)`, treat benchmarks as a queue, and register invoke callbacks
	     * Benchmark.invoke(benches, {
	     *
	     *   // invoke the `run` method
	     *   'name': 'run',
	     *
	     *   // pass a single argument
	     *   'args': true,
	     *
	     *   // treat as queue, removing benchmarks from front of `benches` until empty
	     *   'queued': true,
	     *
	     *   // called before any benchmarks have been invoked.
	     *   'onStart': onStart,
	     *
	     *   // called between invoking benchmarks
	     *   'onCycle': onCycle,
	     *
	     *   // called after all benchmarks have been invoked.
	     *   'onComplete': onComplete
	     * });
	     */
	    function invoke(benches, name) {
	      var args,
	          bench,
	          queued,
	          index = -1,
	          eventProps = { 'currentTarget': benches },
	          options = { 'onStart': _.noop, 'onCycle': _.noop, 'onComplete': _.noop },
	          result = _.toArray(benches);

	      /**
	       * Invokes the method of the current object and if synchronous, fetches the next.
	       */
	      function execute() {
	        var listeners,
	            async = isAsync(bench);

	        if (async) {
	          // Use `getNext` as the first listener.
	          bench.on('complete', getNext);
	          listeners = bench.events.complete;
	          listeners.splice(0, 0, listeners.pop());
	        }
	        // Execute method.
	        result[index] = _.isFunction(bench && bench[name]) ? bench[name].apply(bench, args) : undefined;
	        // If synchronous return `true` until finished.
	        return !async && getNext();
	      }

	      /**
	       * Fetches the next bench or executes `onComplete` callback.
	       */
	      function getNext(event) {
	        var cycleEvent,
	            last = bench,
	            async = isAsync(last);

	        if (async) {
	          last.off('complete', getNext);
	          last.emit('complete');
	        }
	        // Emit "cycle" event.
	        eventProps.type = 'cycle';
	        eventProps.target = last;
	        cycleEvent = Event(eventProps);
	        options.onCycle.call(benches, cycleEvent);

	        // Choose next benchmark if not exiting early.
	        if (!cycleEvent.aborted && raiseIndex() !== false) {
	          bench = queued ? benches[0] : result[index];
	          if (isAsync(bench)) {
	            delay(bench, execute);
	          }
	          else if (async) {
	            // Resume execution if previously asynchronous but now synchronous.
	            while (execute()) {}
	          }
	          else {
	            // Continue synchronous execution.
	            return true;
	          }
	        } else {
	          // Emit "complete" event.
	          eventProps.type = 'complete';
	          options.onComplete.call(benches, Event(eventProps));
	        }
	        // When used as a listener `event.aborted = true` will cancel the rest of
	        // the "complete" listeners because they were already called above and when
	        // used as part of `getNext` the `return false` will exit the execution while-loop.
	        if (event) {
	          event.aborted = true;
	        } else {
	          return false;
	        }
	      }

	      /**
	       * Checks if invoking `Benchmark#run` with asynchronous cycles.
	       */
	      function isAsync(object) {
	        // Avoid using `instanceof` here because of IE memory leak issues with host objects.
	        var async = args[0] && args[0].async;
	        return name == 'run' && (object instanceof Benchmark) &&
	          ((async == null ? object.options.async : async) && support.timeout || object.defer);
	      }

	      /**
	       * Raises `index` to the next defined index or returns `false`.
	       */
	      function raiseIndex() {
	        index++;

	        // If queued remove the previous bench.
	        if (queued && index > 0) {
	          shift.call(benches);
	        }
	        // If we reached the last index then return `false`.
	        return (queued ? benches.length : index < result.length)
	          ? index
	          : (index = false);
	      }
	      // Juggle arguments.
	      if (_.isString(name)) {
	        // 2 arguments (array, name).
	        args = slice.call(arguments, 2);
	      } else {
	        // 2 arguments (array, options).
	        options = _.assign(options, name);
	        name = options.name;
	        args = _.isArray(args = 'args' in options ? options.args : []) ? args : [args];
	        queued = options.queued;
	      }
	      // Start iterating over the array.
	      if (raiseIndex() !== false) {
	        // Emit "start" event.
	        bench = result[index];
	        eventProps.type = 'start';
	        eventProps.target = bench;
	        options.onStart.call(benches, Event(eventProps));

	        // End early if the suite was aborted in an "onStart" listener.
	        if (name == 'run' && (benches instanceof Suite) && benches.aborted) {
	          // Emit "cycle" event.
	          eventProps.type = 'cycle';
	          options.onCycle.call(benches, Event(eventProps));
	          // Emit "complete" event.
	          eventProps.type = 'complete';
	          options.onComplete.call(benches, Event(eventProps));
	        }
	        // Start method execution.
	        else {
	          if (isAsync(bench)) {
	            delay(bench, execute);
	          } else {
	            while (execute()) {}
	          }
	        }
	      }
	      return result;
	    }

	    /**
	     * Creates a string of joined array values or object key-value pairs.
	     *
	     * @static
	     * @memberOf Benchmark
	     * @param {Array|Object} object The object to operate on.
	     * @param {string} [separator1=','] The separator used between key-value pairs.
	     * @param {string} [separator2=': '] The separator used between keys and values.
	     * @returns {string} The joined result.
	     */
	    function join(object, separator1, separator2) {
	      var result = [],
	          length = (object = Object(object)).length,
	          arrayLike = length === length >>> 0;

	      separator2 || (separator2 = ': ');
	      _.each(object, function(value, key) {
	        result.push(arrayLike ? value : key + separator2 + value);
	      });
	      return result.join(separator1 || ',');
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Aborts all benchmarks in the suite.
	     *
	     * @name abort
	     * @memberOf Benchmark.Suite
	     * @returns {Object} The suite instance.
	     */
	    function abortSuite() {
	      var event,
	          suite = this,
	          resetting = calledBy.resetSuite;

	      if (suite.running) {
	        event = Event('abort');
	        suite.emit(event);
	        if (!event.cancelled || resetting) {
	          // Avoid infinite recursion.
	          calledBy.abortSuite = true;
	          suite.reset();
	          delete calledBy.abortSuite;

	          if (!resetting) {
	            suite.aborted = true;
	            invoke(suite, 'abort');
	          }
	        }
	      }
	      return suite;
	    }

	    /**
	     * Adds a test to the benchmark suite.
	     *
	     * @memberOf Benchmark.Suite
	     * @param {string} name A name to identify the benchmark.
	     * @param {Function|string} fn The test to benchmark.
	     * @param {Object} [options={}] Options object.
	     * @returns {Object} The suite instance.
	     * @example
	     *
	     * // basic usage
	     * suite.add(fn);
	     *
	     * // or using a name first
	     * suite.add('foo', fn);
	     *
	     * // or with options
	     * suite.add('foo', fn, {
	     *   'onCycle': onCycle,
	     *   'onComplete': onComplete
	     * });
	     *
	     * // or name and options
	     * suite.add('foo', {
	     *   'fn': fn,
	     *   'onCycle': onCycle,
	     *   'onComplete': onComplete
	     * });
	     *
	     * // or options only
	     * suite.add({
	     *   'name': 'foo',
	     *   'fn': fn,
	     *   'onCycle': onCycle,
	     *   'onComplete': onComplete
	     * });
	     */
	    function add(name, fn, options) {
	      var suite = this,
	          bench = new Benchmark(name, fn, options),
	          event = Event({ 'type': 'add', 'target': bench });

	      if (suite.emit(event), !event.cancelled) {
	        suite.push(bench);
	      }
	      return suite;
	    }

	    /**
	     * Creates a new suite with cloned benchmarks.
	     *
	     * @name clone
	     * @memberOf Benchmark.Suite
	     * @param {Object} options Options object to overwrite cloned options.
	     * @returns {Object} The new suite instance.
	     */
	    function cloneSuite(options) {
	      var suite = this,
	          result = new suite.constructor(_.assign({}, suite.options, options));

	      // Copy own properties.
	      _.forOwn(suite, function(value, key) {
	        if (!_.has(result, key)) {
	          result[key] = _.isFunction(_.get(value, 'clone'))
	            ? value.clone()
	            : cloneDeep(value);
	        }
	      });
	      return result;
	    }

	    /**
	     * An `Array#filter` like method.
	     *
	     * @name filter
	     * @memberOf Benchmark.Suite
	     * @param {Function|string} callback The function/alias called per iteration.
	     * @returns {Object} A new suite of benchmarks that passed callback filter.
	     */
	    function filterSuite(callback) {
	      var suite = this,
	          result = new suite.constructor(suite.options);

	      result.push.apply(result, filter(suite, callback));
	      return result;
	    }

	    /**
	     * Resets all benchmarks in the suite.
	     *
	     * @name reset
	     * @memberOf Benchmark.Suite
	     * @returns {Object} The suite instance.
	     */
	    function resetSuite() {
	      var event,
	          suite = this,
	          aborting = calledBy.abortSuite;

	      if (suite.running && !aborting) {
	        // No worries, `resetSuite()` is called within `abortSuite()`.
	        calledBy.resetSuite = true;
	        suite.abort();
	        delete calledBy.resetSuite;
	      }
	      // Reset if the state has changed.
	      else if ((suite.aborted || suite.running) &&
	          (suite.emit(event = Event('reset')), !event.cancelled)) {
	        suite.aborted = suite.running = false;
	        if (!aborting) {
	          invoke(suite, 'reset');
	        }
	      }
	      return suite;
	    }

	    /**
	     * Runs the suite.
	     *
	     * @name run
	     * @memberOf Benchmark.Suite
	     * @param {Object} [options={}] Options object.
	     * @returns {Object} The suite instance.
	     * @example
	     *
	     * // basic usage
	     * suite.run();
	     *
	     * // or with options
	     * suite.run({ 'async': true, 'queued': true });
	     */
	    function runSuite(options) {
	      var suite = this;

	      suite.reset();
	      suite.running = true;
	      options || (options = {});

	      invoke(suite, {
	        'name': 'run',
	        'args': options,
	        'queued': options.queued,
	        'onStart': function(event) {
	          suite.emit(event);
	        },
	        'onCycle': function(event) {
	          var bench = event.target;
	          if (bench.error) {
	            suite.emit({ 'type': 'error', 'target': bench });
	          }
	          suite.emit(event);
	          event.aborted = suite.aborted;
	        },
	        'onComplete': function(event) {
	          suite.running = false;
	          suite.emit(event);
	        }
	      });
	      return suite;
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Executes all registered listeners of the specified event type.
	     *
	     * @memberOf Benchmark, Benchmark.Suite
	     * @param {Object|string} type The event type or object.
	     * @param {...*} [args] Arguments to invoke the listener with.
	     * @returns {*} Returns the return value of the last listener executed.
	     */
	    function emit(type) {
	      var listeners,
	          object = this,
	          event = Event(type),
	          events = object.events,
	          args = (arguments[0] = event, arguments);

	      event.currentTarget || (event.currentTarget = object);
	      event.target || (event.target = object);
	      delete event.result;

	      if (events && (listeners = _.has(events, event.type) && events[event.type])) {
	        _.each(listeners.slice(), function(listener) {
	          if ((event.result = listener.apply(object, args)) === false) {
	            event.cancelled = true;
	          }
	          return !event.aborted;
	        });
	      }
	      return event.result;
	    }

	    /**
	     * Returns an array of event listeners for a given type that can be manipulated
	     * to add or remove listeners.
	     *
	     * @memberOf Benchmark, Benchmark.Suite
	     * @param {string} type The event type.
	     * @returns {Array} The listeners array.
	     */
	    function listeners(type) {
	      var object = this,
	          events = object.events || (object.events = {});

	      return _.has(events, type) ? events[type] : (events[type] = []);
	    }

	    /**
	     * Unregisters a listener for the specified event type(s),
	     * or unregisters all listeners for the specified event type(s),
	     * or unregisters all listeners for all event types.
	     *
	     * @memberOf Benchmark, Benchmark.Suite
	     * @param {string} [type] The event type.
	     * @param {Function} [listener] The function to unregister.
	     * @returns {Object} The current instance.
	     * @example
	     *
	     * // unregister a listener for an event type
	     * bench.off('cycle', listener);
	     *
	     * // unregister a listener for multiple event types
	     * bench.off('start cycle', listener);
	     *
	     * // unregister all listeners for an event type
	     * bench.off('cycle');
	     *
	     * // unregister all listeners for multiple event types
	     * bench.off('start cycle complete');
	     *
	     * // unregister all listeners for all event types
	     * bench.off();
	     */
	    function off(type, listener) {
	      var object = this,
	          events = object.events;

	      if (!events) {
	        return object;
	      }
	      _.each(type ? type.split(' ') : events, function(listeners, type) {
	        var index;
	        if (typeof listeners == 'string') {
	          type = listeners;
	          listeners = _.has(events, type) && events[type];
	        }
	        if (listeners) {
	          if (listener) {
	            index = _.indexOf(listeners, listener);
	            if (index > -1) {
	              listeners.splice(index, 1);
	            }
	          } else {
	            listeners.length = 0;
	          }
	        }
	      });
	      return object;
	    }

	    /**
	     * Registers a listener for the specified event type(s).
	     *
	     * @memberOf Benchmark, Benchmark.Suite
	     * @param {string} type The event type.
	     * @param {Function} listener The function to register.
	     * @returns {Object} The current instance.
	     * @example
	     *
	     * // register a listener for an event type
	     * bench.on('cycle', listener);
	     *
	     * // register a listener for multiple event types
	     * bench.on('start cycle', listener);
	     */
	    function on(type, listener) {
	      var object = this,
	          events = object.events || (object.events = {});

	      _.each(type.split(' '), function(type) {
	        (_.has(events, type)
	          ? events[type]
	          : (events[type] = [])
	        ).push(listener);
	      });
	      return object;
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Aborts the benchmark without recording times.
	     *
	     * @memberOf Benchmark
	     * @returns {Object} The benchmark instance.
	     */
	    function abort() {
	      var event,
	          bench = this,
	          resetting = calledBy.reset;

	      if (bench.running) {
	        event = Event('abort');
	        bench.emit(event);
	        if (!event.cancelled || resetting) {
	          // Avoid infinite recursion.
	          calledBy.abort = true;
	          bench.reset();
	          delete calledBy.abort;

	          if (support.timeout) {
	            clearTimeout(bench._timerId);
	            delete bench._timerId;
	          }
	          if (!resetting) {
	            bench.aborted = true;
	            bench.running = false;
	          }
	        }
	      }
	      return bench;
	    }

	    /**
	     * Creates a new benchmark using the same test and options.
	     *
	     * @memberOf Benchmark
	     * @param {Object} options Options object to overwrite cloned options.
	     * @returns {Object} The new benchmark instance.
	     * @example
	     *
	     * var bizarro = bench.clone({
	     *   'name': 'doppelganger'
	     * });
	     */
	    function clone(options) {
	      var bench = this,
	          result = new bench.constructor(_.assign({}, bench, options));

	      // Correct the `options` object.
	      result.options = _.assign({}, cloneDeep(bench.options), cloneDeep(options));

	      // Copy own custom properties.
	      _.forOwn(bench, function(value, key) {
	        if (!_.has(result, key)) {
	          result[key] = cloneDeep(value);
	        }
	      });

	      return result;
	    }

	    /**
	     * Determines if a benchmark is faster than another.
	     *
	     * @memberOf Benchmark
	     * @param {Object} other The benchmark to compare.
	     * @returns {number} Returns `-1` if slower, `1` if faster, and `0` if indeterminate.
	     */
	    function compare(other) {
	      var bench = this;

	      // Exit early if comparing the same benchmark.
	      if (bench == other) {
	        return 0;
	      }
	      var critical,
	          zStat,
	          sample1 = bench.stats.sample,
	          sample2 = other.stats.sample,
	          size1 = sample1.length,
	          size2 = sample2.length,
	          maxSize = max(size1, size2),
	          minSize = min(size1, size2),
	          u1 = getU(sample1, sample2),
	          u2 = getU(sample2, sample1),
	          u = min(u1, u2);

	      function getScore(xA, sampleB) {
	        return _.reduce(sampleB, function(total, xB) {
	          return total + (xB > xA ? 0 : xB < xA ? 1 : 0.5);
	        }, 0);
	      }

	      function getU(sampleA, sampleB) {
	        return _.reduce(sampleA, function(total, xA) {
	          return total + getScore(xA, sampleB);
	        }, 0);
	      }

	      function getZ(u) {
	        return (u - ((size1 * size2) / 2)) / sqrt((size1 * size2 * (size1 + size2 + 1)) / 12);
	      }
	      // Reject the null hypothesis the two samples come from the
	      // same population (i.e. have the same median) if...
	      if (size1 + size2 > 30) {
	        // ...the z-stat is greater than 1.96 or less than -1.96
	        // http://www.statisticslectures.com/topics/mannwhitneyu/
	        zStat = getZ(u);
	        return abs(zStat) > 1.96 ? (u == u1 ? 1 : -1) : 0;
	      }
	      // ...the U value is less than or equal the critical U value.
	      critical = maxSize < 5 || minSize < 3 ? 0 : uTable[maxSize][minSize - 3];
	      return u <= critical ? (u == u1 ? 1 : -1) : 0;
	    }

	    /**
	     * Reset properties and abort if running.
	     *
	     * @memberOf Benchmark
	     * @returns {Object} The benchmark instance.
	     */
	    function reset() {
	      var bench = this;
	      if (bench.running && !calledBy.abort) {
	        // No worries, `reset()` is called within `abort()`.
	        calledBy.reset = true;
	        bench.abort();
	        delete calledBy.reset;
	        return bench;
	      }
	      var event,
	          index = 0,
	          changes = [],
	          queue = [];

	      // A non-recursive solution to check if properties have changed.
	      // For more information see http://www.jslab.dk/articles/non.recursive.preorder.traversal.part4.
	      var data = {
	        'destination': bench,
	        'source': _.assign({}, cloneDeep(bench.constructor.prototype), cloneDeep(bench.options))
	      };

	      do {
	        _.forOwn(data.source, function(value, key) {
	          var changed,
	              destination = data.destination,
	              currValue = destination[key];

	          // Skip pseudo private properties and event listeners.
	          if (/^_|^events$|^on[A-Z]/.test(key)) {
	            return;
	          }
	          if (_.isObjectLike(value)) {
	            if (_.isArray(value)) {
	              // Check if an array value has changed to a non-array value.
	              if (!_.isArray(currValue)) {
	                changed = true;
	                currValue = [];
	              }
	              // Check if an array has changed its length.
	              if (currValue.length != value.length) {
	                changed = true;
	                currValue = currValue.slice(0, value.length);
	                currValue.length = value.length;
	              }
	            }
	            // Check if an object has changed to a non-object value.
	            else if (!_.isObjectLike(currValue)) {
	              changed = true;
	              currValue = {};
	            }
	            // Register a changed object.
	            if (changed) {
	              changes.push({ 'destination': destination, 'key': key, 'value': currValue });
	            }
	            queue.push({ 'destination': currValue, 'source': value });
	          }
	          // Register a changed primitive.
	          else if (!_.eq(currValue, value) && value !== undefined) {
	            changes.push({ 'destination': destination, 'key': key, 'value': value });
	          }
	        });
	      }
	      while ((data = queue[index++]));

	      // If changed emit the `reset` event and if it isn't cancelled reset the benchmark.
	      if (changes.length &&
	          (bench.emit(event = Event('reset')), !event.cancelled)) {
	        _.each(changes, function(data) {
	          data.destination[data.key] = data.value;
	        });
	      }
	      return bench;
	    }

	    /**
	     * Displays relevant benchmark information when coerced to a string.
	     *
	     * @name toString
	     * @memberOf Benchmark
	     * @returns {string} A string representation of the benchmark instance.
	     */
	    function toStringBench() {
	      var bench = this,
	          error = bench.error,
	          hz = bench.hz,
	          id = bench.id,
	          stats = bench.stats,
	          size = stats.sample.length,
	          pm = '\xb1',
	          result = bench.name || (_.isNaN(id) ? id : '<Test #' + id + '>');

	      if (error) {
	        var errorStr;
	        if (!_.isObject(error)) {
	          errorStr = String(error);
	        } else if (!_.isError(Error)) {
	          errorStr = join(error);
	        } else {
	          // Error#name and Error#message properties are non-enumerable.
	          errorStr = join(_.assign({ 'name': error.name, 'message': error.message }, error));
	        }
	        result += ': ' + errorStr;
	      }
	      else {
	        result += ' x ' + formatNumber(hz.toFixed(hz < 100 ? 2 : 0)) + ' ops/sec ' + pm +
	          stats.rme.toFixed(2) + '% (' + size + ' run' + (size == 1 ? '' : 's') + ' sampled)';
	      }
	      return result;
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Clocks the time taken to execute a test per cycle (secs).
	     *
	     * @private
	     * @param {Object} bench The benchmark instance.
	     * @returns {number} The time taken.
	     */
	    function clock() {
	      var options = Benchmark.options,
	          templateData = {},
	          timers = [{ 'ns': timer.ns, 'res': max(0.0015, getRes('ms')), 'unit': 'ms' }];

	      // Lazy define for hi-res timers.
	      clock = function(clone) {
	        var deferred;

	        if (clone instanceof Deferred) {
	          deferred = clone;
	          clone = deferred.benchmark;
	        }
	        var bench = clone._original,
	            stringable = isStringable(bench.fn),
	            count = bench.count = clone.count,
	            decompilable = stringable || (support.decompilation && (clone.setup !== _.noop || clone.teardown !== _.noop)),
	            id = bench.id,
	            name = bench.name || (typeof id == 'number' ? '<Test #' + id + '>' : id),
	            result = 0;

	        // Init `minTime` if needed.
	        clone.minTime = bench.minTime || (bench.minTime = bench.options.minTime = options.minTime);

	        // Compile in setup/teardown functions and the test loop.
	        // Create a new compiled test, instead of using the cached `bench.compiled`,
	        // to avoid potential engine optimizations enabled over the life of the test.
	        var funcBody = deferred
	          ? 'var d#=this,${fnArg}=d#,m#=d#.benchmark._original,f#=m#.fn,su#=m#.setup,td#=m#.teardown;' +
	            // When `deferred.cycles` is `0` then...
	            'if(!d#.cycles){' +
	            // set `deferred.fn`,
	            'd#.fn=function(){var ${fnArg}=d#;if(typeof f#=="function"){try{${fn}\n}catch(e#){f#(d#)}}else{${fn}\n}};' +
	            // set `deferred.teardown`,
	            'd#.teardown=function(){d#.cycles=0;if(typeof td#=="function"){try{${teardown}\n}catch(e#){td#()}}else{${teardown}\n}};' +
	            // execute the benchmark's `setup`,
	            'if(typeof su#=="function"){try{${setup}\n}catch(e#){su#()}}else{${setup}\n};' +
	            // start timer,
	            't#.start(d#);' +
	            // and then execute `deferred.fn` and return a dummy object.
	            '}d#.fn();return{uid:"${uid}"}'

	          : 'var r#,s#,m#=this,f#=m#.fn,i#=m#.count,n#=t#.ns;${setup}\n${begin};' +
	            'while(i#--){${fn}\n}${end};${teardown}\nreturn{elapsed:r#,uid:"${uid}"}';

	        var compiled = bench.compiled = clone.compiled = createCompiled(bench, decompilable, deferred, funcBody),
	            isEmpty = !(templateData.fn || stringable);

	        try {
	          if (isEmpty) {
	            // Firefox may remove dead code from `Function#toString` results.
	            // For more information see http://bugzil.la/536085.
	            throw new Error('The test "' + name + '" is empty. This may be the result of dead code removal.');
	          }
	          else if (!deferred) {
	            // Pretest to determine if compiled code exits early, usually by a
	            // rogue `return` statement, by checking for a return object with the uid.
	            bench.count = 1;
	            compiled = decompilable && (compiled.call(bench, context, timer) || {}).uid == templateData.uid && compiled;
	            bench.count = count;
	          }
	        } catch(e) {
	          compiled = null;
	          clone.error = e || new Error(String(e));
	          bench.count = count;
	        }
	        // Fallback when a test exits early or errors during pretest.
	        if (!compiled && !deferred && !isEmpty) {
	          funcBody = (
	            stringable || (decompilable && !clone.error)
	              ? 'function f#(){${fn}\n}var r#,s#,m#=this,i#=m#.count'
	              : 'var r#,s#,m#=this,f#=m#.fn,i#=m#.count'
	            ) +
	            ',n#=t#.ns;${setup}\n${begin};m#.f#=f#;while(i#--){m#.f#()}${end};' +
	            'delete m#.f#;${teardown}\nreturn{elapsed:r#}';

	          compiled = createCompiled(bench, decompilable, deferred, funcBody);

	          try {
	            // Pretest one more time to check for errors.
	            bench.count = 1;
	            compiled.call(bench, context, timer);
	            bench.count = count;
	            delete clone.error;
	          }
	          catch(e) {
	            bench.count = count;
	            if (!clone.error) {
	              clone.error = e || new Error(String(e));
	            }
	          }
	        }
	        // If no errors run the full test loop.
	        if (!clone.error) {
	          compiled = bench.compiled = clone.compiled = createCompiled(bench, decompilable, deferred, funcBody);
	          result = compiled.call(deferred || bench, context, timer).elapsed;
	        }
	        return result;
	      };

	      /*----------------------------------------------------------------------*/

	      /**
	       * Creates a compiled function from the given function `body`.
	       */
	      function createCompiled(bench, decompilable, deferred, body) {
	        var fn = bench.fn,
	            fnArg = deferred ? getFirstArgument(fn) || 'deferred' : '';

	        templateData.uid = uid + uidCounter++;

	        _.assign(templateData, {
	          'setup': decompilable ? getSource(bench.setup) : interpolate('m#.setup()'),
	          'fn': decompilable ? getSource(fn) : interpolate('m#.fn(' + fnArg + ')'),
	          'fnArg': fnArg,
	          'teardown': decompilable ? getSource(bench.teardown) : interpolate('m#.teardown()')
	        });

	        // Use API of chosen timer.
	        if (timer.unit == 'ns') {
	          _.assign(templateData, {
	            'begin': interpolate('s#=n#()'),
	            'end': interpolate('r#=n#(s#);r#=r#[0]+(r#[1]/1e9)')
	          });
	        }
	        else if (timer.unit == 'us') {
	          if (timer.ns.stop) {
	            _.assign(templateData, {
	              'begin': interpolate('s#=n#.start()'),
	              'end': interpolate('r#=n#.microseconds()/1e6')
	            });
	          } else {
	            _.assign(templateData, {
	              'begin': interpolate('s#=n#()'),
	              'end': interpolate('r#=(n#()-s#)/1e6')
	            });
	          }
	        }
	        else if (timer.ns.now) {
	          _.assign(templateData, {
	            'begin': interpolate('s#=n#.now()'),
	            'end': interpolate('r#=(n#.now()-s#)/1e3')
	          });
	        }
	        else {
	          _.assign(templateData, {
	            'begin': interpolate('s#=new n#().getTime()'),
	            'end': interpolate('r#=(new n#().getTime()-s#)/1e3')
	          });
	        }
	        // Define `timer` methods.
	        timer.start = createFunction(
	          interpolate('o#'),
	          interpolate('var n#=this.ns,${begin};o#.elapsed=0;o#.timeStamp=s#')
	        );

	        timer.stop = createFunction(
	          interpolate('o#'),
	          interpolate('var n#=this.ns,s#=o#.timeStamp,${end};o#.elapsed=r#')
	        );

	        // Create compiled test.
	        return createFunction(
	          interpolate('window,t#'),
	          'var global = window, clearTimeout = global.clearTimeout, setTimeout = global.setTimeout;\n' +
	          interpolate(body)
	        );
	      }

	      /**
	       * Gets the current timer's minimum resolution (secs).
	       */
	      function getRes(unit) {
	        var measured,
	            begin,
	            count = 30,
	            divisor = 1e3,
	            ns = timer.ns,
	            sample = [];

	        // Get average smallest measurable time.
	        while (count--) {
	          if (unit == 'us') {
	            divisor = 1e6;
	            if (ns.stop) {
	              ns.start();
	              while (!(measured = ns.microseconds())) {}
	            } else {
	              begin = ns();
	              while (!(measured = ns() - begin)) {}
	            }
	          }
	          else if (unit == 'ns') {
	            divisor = 1e9;
	            begin = (begin = ns())[0] + (begin[1] / divisor);
	            while (!(measured = ((measured = ns())[0] + (measured[1] / divisor)) - begin)) {}
	            divisor = 1;
	          }
	          else if (ns.now) {
	            begin = ns.now();
	            while (!(measured = ns.now() - begin)) {}
	          }
	          else {
	            begin = new ns().getTime();
	            while (!(measured = new ns().getTime() - begin)) {}
	          }
	          // Check for broken timers.
	          if (measured > 0) {
	            sample.push(measured);
	          } else {
	            sample.push(Infinity);
	            break;
	          }
	        }
	        // Convert to seconds.
	        return getMean(sample) / divisor;
	      }

	      /**
	       * Interpolates a given template string.
	       */
	      function interpolate(string) {
	        // Replaces all occurrences of `#` with a unique number and template tokens with content.
	        return _.template(string.replace(/\#/g, /\d+/.exec(templateData.uid)))(templateData);
	      }

	      /*----------------------------------------------------------------------*/

	      // Detect Chrome's microsecond timer:
	      // enable benchmarking via the --enable-benchmarking command
	      // line switch in at least Chrome 7 to use chrome.Interval
	      try {
	        if ((timer.ns = new (context.chrome || context.chromium).Interval)) {
	          timers.push({ 'ns': timer.ns, 'res': getRes('us'), 'unit': 'us' });
	        }
	      } catch(e) {}

	      // Detect Node.js's nanosecond resolution timer available in Node.js >= 0.8.
	      if (processObject && typeof (timer.ns = processObject.hrtime) == 'function') {
	        timers.push({ 'ns': timer.ns, 'res': getRes('ns'), 'unit': 'ns' });
	      }
	      // Detect Wade Simmons' Node.js `microtime` module.
	      if (microtimeObject && typeof (timer.ns = microtimeObject.now) == 'function') {
	        timers.push({ 'ns': timer.ns,  'res': getRes('us'), 'unit': 'us' });
	      }
	      // Pick timer with highest resolution.
	      timer = _.minBy(timers, 'res');

	      // Error if there are no working timers.
	      if (timer.res == Infinity) {
	        throw new Error('Benchmark.js was unable to find a working timer.');
	      }
	      // Resolve time span required to achieve a percent uncertainty of at most 1%.
	      // For more information see http://spiff.rit.edu/classes/phys273/uncert/uncert.html.
	      options.minTime || (options.minTime = max(timer.res / 2 / 0.01, 0.05));
	      return clock.apply(null, arguments);
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Computes stats on benchmark results.
	     *
	     * @private
	     * @param {Object} bench The benchmark instance.
	     * @param {Object} options The options object.
	     */
	    function compute(bench, options) {
	      options || (options = {});

	      var async = options.async,
	          elapsed = 0,
	          initCount = bench.initCount,
	          minSamples = bench.minSamples,
	          queue = [],
	          sample = bench.stats.sample;

	      /**
	       * Adds a clone to the queue.
	       */
	      function enqueue() {
	        queue.push(bench.clone({
	          '_original': bench,
	          'events': {
	            'abort': [update],
	            'cycle': [update],
	            'error': [update],
	            'start': [update]
	          }
	        }));
	      }

	      /**
	       * Updates the clone/original benchmarks to keep their data in sync.
	       */
	      function update(event) {
	        var clone = this,
	            type = event.type;

	        if (bench.running) {
	          if (type == 'start') {
	            // Note: `clone.minTime` prop is inited in `clock()`.
	            clone.count = bench.initCount;
	          }
	          else {
	            if (type == 'error') {
	              bench.error = clone.error;
	            }
	            if (type == 'abort') {
	              bench.abort();
	              bench.emit('cycle');
	            } else {
	              event.currentTarget = event.target = bench;
	              bench.emit(event);
	            }
	          }
	        } else if (bench.aborted) {
	          // Clear abort listeners to avoid triggering bench's abort/cycle again.
	          clone.events.abort.length = 0;
	          clone.abort();
	        }
	      }

	      /**
	       * Determines if more clones should be queued or if cycling should stop.
	       */
	      function evaluate(event) {
	        var critical,
	            df,
	            mean,
	            moe,
	            rme,
	            sd,
	            sem,
	            variance,
	            clone = event.target,
	            done = bench.aborted,
	            now = _.now(),
	            size = sample.push(clone.times.period),
	            maxedOut = size >= minSamples && (elapsed += now - clone.times.timeStamp) / 1e3 > bench.maxTime,
	            times = bench.times,
	            varOf = function(sum, x) { return sum + pow(x - mean, 2); };

	        // Exit early for aborted or unclockable tests.
	        if (done || clone.hz == Infinity) {
	          maxedOut = !(size = sample.length = queue.length = 0);
	        }

	        if (!done) {
	          // Compute the sample mean (estimate of the population mean).
	          mean = getMean(sample);
	          // Compute the sample variance (estimate of the population variance).
	          variance = _.reduce(sample, varOf, 0) / (size - 1) || 0;
	          // Compute the sample standard deviation (estimate of the population standard deviation).
	          sd = sqrt(variance);
	          // Compute the standard error of the mean (a.k.a. the standard deviation of the sampling distribution of the sample mean).
	          sem = sd / sqrt(size);
	          // Compute the degrees of freedom.
	          df = size - 1;
	          // Compute the critical value.
	          critical = tTable[Math.round(df) || 1] || tTable.infinity;
	          // Compute the margin of error.
	          moe = sem * critical;
	          // Compute the relative margin of error.
	          rme = (moe / mean) * 100 || 0;

	          _.assign(bench.stats, {
	            'deviation': sd,
	            'mean': mean,
	            'moe': moe,
	            'rme': rme,
	            'sem': sem,
	            'variance': variance
	          });

	          // Abort the cycle loop when the minimum sample size has been collected
	          // and the elapsed time exceeds the maximum time allowed per benchmark.
	          // We don't count cycle delays toward the max time because delays may be
	          // increased by browsers that clamp timeouts for inactive tabs. For more
	          // information see https://developer.mozilla.org/en/window.setTimeout#Inactive_tabs.
	          if (maxedOut) {
	            // Reset the `initCount` in case the benchmark is rerun.
	            bench.initCount = initCount;
	            bench.running = false;
	            done = true;
	            times.elapsed = (now - times.timeStamp) / 1e3;
	          }
	          if (bench.hz != Infinity) {
	            bench.hz = 1 / mean;
	            times.cycle = mean * bench.count;
	            times.period = mean;
	          }
	        }
	        // If time permits, increase sample size to reduce the margin of error.
	        if (queue.length < 2 && !maxedOut) {
	          enqueue();
	        }
	        // Abort the `invoke` cycle when done.
	        event.aborted = done;
	      }

	      // Init queue and begin.
	      enqueue();
	      invoke(queue, {
	        'name': 'run',
	        'args': { 'async': async },
	        'queued': true,
	        'onCycle': evaluate,
	        'onComplete': function() { bench.emit('complete'); }
	      });
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Cycles a benchmark until a run `count` can be established.
	     *
	     * @private
	     * @param {Object} clone The cloned benchmark instance.
	     * @param {Object} options The options object.
	     */
	    function cycle(clone, options) {
	      options || (options = {});

	      var deferred;
	      if (clone instanceof Deferred) {
	        deferred = clone;
	        clone = clone.benchmark;
	      }
	      var clocked,
	          cycles,
	          divisor,
	          event,
	          minTime,
	          period,
	          async = options.async,
	          bench = clone._original,
	          count = clone.count,
	          times = clone.times;

	      // Continue, if not aborted between cycles.
	      if (clone.running) {
	        // `minTime` is set to `Benchmark.options.minTime` in `clock()`.
	        cycles = ++clone.cycles;
	        clocked = deferred ? deferred.elapsed : clock(clone);
	        minTime = clone.minTime;

	        if (cycles > bench.cycles) {
	          bench.cycles = cycles;
	        }
	        if (clone.error) {
	          event = Event('error');
	          event.message = clone.error;
	          clone.emit(event);
	          if (!event.cancelled) {
	            clone.abort();
	          }
	        }
	      }
	      // Continue, if not errored.
	      if (clone.running) {
	        // Compute the time taken to complete last test cycle.
	        bench.times.cycle = times.cycle = clocked;
	        // Compute the seconds per operation.
	        period = bench.times.period = times.period = clocked / count;
	        // Compute the ops per second.
	        bench.hz = clone.hz = 1 / period;
	        // Avoid working our way up to this next time.
	        bench.initCount = clone.initCount = count;
	        // Do we need to do another cycle?
	        clone.running = clocked < minTime;

	        if (clone.running) {
	          // Tests may clock at `0` when `initCount` is a small number,
	          // to avoid that we set its count to something a bit higher.
	          if (!clocked && (divisor = divisors[clone.cycles]) != null) {
	            count = floor(4e6 / divisor);
	          }
	          // Calculate how many more iterations it will take to achieve the `minTime`.
	          if (count <= clone.count) {
	            count += Math.ceil((minTime - clocked) / period);
	          }
	          clone.running = count != Infinity;
	        }
	      }
	      // Should we exit early?
	      event = Event('cycle');
	      clone.emit(event);
	      if (event.aborted) {
	        clone.abort();
	      }
	      // Figure out what to do next.
	      if (clone.running) {
	        // Start a new cycle.
	        clone.count = count;
	        if (deferred) {
	          clone.compiled.call(deferred, context, timer);
	        } else if (async) {
	          delay(clone, function() { cycle(clone, options); });
	        } else {
	          cycle(clone);
	        }
	      }
	      else {
	        // Fix TraceMonkey bug associated with clock fallbacks.
	        // For more information see http://bugzil.la/509069.
	        if (support.browser) {
	          runScript(uid + '=1;delete ' + uid);
	        }
	        // We're done.
	        clone.emit('complete');
	      }
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Runs the benchmark.
	     *
	     * @memberOf Benchmark
	     * @param {Object} [options={}] Options object.
	     * @returns {Object} The benchmark instance.
	     * @example
	     *
	     * // basic usage
	     * bench.run();
	     *
	     * // or with options
	     * bench.run({ 'async': true });
	     */
	    function run(options) {
	      var bench = this,
	          event = Event('start');

	      // Set `running` to `false` so `reset()` won't call `abort()`.
	      bench.running = false;
	      bench.reset();
	      bench.running = true;

	      bench.count = bench.initCount;
	      bench.times.timeStamp = _.now();
	      bench.emit(event);

	      if (!event.cancelled) {
	        options = { 'async': ((options = options && options.async) == null ? bench.async : options) && support.timeout };

	        // For clones created within `compute()`.
	        if (bench._original) {
	          if (bench.defer) {
	            Deferred(bench);
	          } else {
	            cycle(bench, options);
	          }
	        }
	        // For original benchmarks.
	        else {
	          compute(bench, options);
	        }
	      }
	      return bench;
	    }

	    /*------------------------------------------------------------------------*/

	    // Firefox 1 erroneously defines variable and argument names of functions on
	    // the function itself as non-configurable properties with `undefined` values.
	    // The bugginess continues as the `Benchmark` constructor has an argument
	    // named `options` and Firefox 1 will not assign a value to `Benchmark.options`,
	    // making it non-writable in the process, unless it is the first property
	    // assigned by for-in loop of `_.assign()`.
	    _.assign(Benchmark, {

	      /**
	       * The default options copied by benchmark instances.
	       *
	       * @static
	       * @memberOf Benchmark
	       * @type Object
	       */
	      'options': {

	        /**
	         * A flag to indicate that benchmark cycles will execute asynchronously
	         * by default.
	         *
	         * @memberOf Benchmark.options
	         * @type boolean
	         */
	        'async': false,

	        /**
	         * A flag to indicate that the benchmark clock is deferred.
	         *
	         * @memberOf Benchmark.options
	         * @type boolean
	         */
	        'defer': false,

	        /**
	         * The delay between test cycles (secs).
	         * @memberOf Benchmark.options
	         * @type number
	         */
	        'delay': 0.005,

	        /**
	         * Displayed by `Benchmark#toString` when a `name` is not available
	         * (auto-generated if absent).
	         *
	         * @memberOf Benchmark.options
	         * @type string
	         */
	        'id': undefined,

	        /**
	         * The default number of times to execute a test on a benchmark's first cycle.
	         *
	         * @memberOf Benchmark.options
	         * @type number
	         */
	        'initCount': 1,

	        /**
	         * The maximum time a benchmark is allowed to run before finishing (secs).
	         *
	         * Note: Cycle delays aren't counted toward the maximum time.
	         *
	         * @memberOf Benchmark.options
	         * @type number
	         */
	        'maxTime': 5,

	        /**
	         * The minimum sample size required to perform statistical analysis.
	         *
	         * @memberOf Benchmark.options
	         * @type number
	         */
	        'minSamples': 5,

	        /**
	         * The time needed to reduce the percent uncertainty of measurement to 1% (secs).
	         *
	         * @memberOf Benchmark.options
	         * @type number
	         */
	        'minTime': 0,

	        /**
	         * The name of the benchmark.
	         *
	         * @memberOf Benchmark.options
	         * @type string
	         */
	        'name': undefined,

	        /**
	         * An event listener called when the benchmark is aborted.
	         *
	         * @memberOf Benchmark.options
	         * @type Function
	         */
	        'onAbort': undefined,

	        /**
	         * An event listener called when the benchmark completes running.
	         *
	         * @memberOf Benchmark.options
	         * @type Function
	         */
	        'onComplete': undefined,

	        /**
	         * An event listener called after each run cycle.
	         *
	         * @memberOf Benchmark.options
	         * @type Function
	         */
	        'onCycle': undefined,

	        /**
	         * An event listener called when a test errors.
	         *
	         * @memberOf Benchmark.options
	         * @type Function
	         */
	        'onError': undefined,

	        /**
	         * An event listener called when the benchmark is reset.
	         *
	         * @memberOf Benchmark.options
	         * @type Function
	         */
	        'onReset': undefined,

	        /**
	         * An event listener called when the benchmark starts running.
	         *
	         * @memberOf Benchmark.options
	         * @type Function
	         */
	        'onStart': undefined
	      },

	      /**
	       * Platform object with properties describing things like browser name,
	       * version, and operating system. See [`platform.js`](https://mths.be/platform).
	       *
	       * @static
	       * @memberOf Benchmark
	       * @type Object
	       */
	      'platform': context.platform || require('platform') || ({
	        'description': context.navigator && context.navigator.userAgent || null,
	        'layout': null,
	        'product': null,
	        'name': null,
	        'manufacturer': null,
	        'os': null,
	        'prerelease': null,
	        'version': null,
	        'toString': function() {
	          return this.description || '';
	        }
	      }),

	      /**
	       * The semantic version number.
	       *
	       * @static
	       * @memberOf Benchmark
	       * @type string
	       */
	      'version': '2.1.3'
	    });

	    _.assign(Benchmark, {
	      'filter': filter,
	      'formatNumber': formatNumber,
	      'invoke': invoke,
	      'join': join,
	      'runInContext': runInContext,
	      'support': support
	    });

	    // Add lodash methods to Benchmark.
	    _.each(['each', 'forEach', 'forOwn', 'has', 'indexOf', 'map', 'reduce'], function(methodName) {
	      Benchmark[methodName] = _[methodName];
	    });

	    /*------------------------------------------------------------------------*/

	    _.assign(Benchmark.prototype, {

	      /**
	       * The number of times a test was executed.
	       *
	       * @memberOf Benchmark
	       * @type number
	       */
	      'count': 0,

	      /**
	       * The number of cycles performed while benchmarking.
	       *
	       * @memberOf Benchmark
	       * @type number
	       */
	      'cycles': 0,

	      /**
	       * The number of executions per second.
	       *
	       * @memberOf Benchmark
	       * @type number
	       */
	      'hz': 0,

	      /**
	       * The compiled test function.
	       *
	       * @memberOf Benchmark
	       * @type {Function|string}
	       */
	      'compiled': undefined,

	      /**
	       * The error object if the test failed.
	       *
	       * @memberOf Benchmark
	       * @type Object
	       */
	      'error': undefined,

	      /**
	       * The test to benchmark.
	       *
	       * @memberOf Benchmark
	       * @type {Function|string}
	       */
	      'fn': undefined,

	      /**
	       * A flag to indicate if the benchmark is aborted.
	       *
	       * @memberOf Benchmark
	       * @type boolean
	       */
	      'aborted': false,

	      /**
	       * A flag to indicate if the benchmark is running.
	       *
	       * @memberOf Benchmark
	       * @type boolean
	       */
	      'running': false,

	      /**
	       * Compiled into the test and executed immediately **before** the test loop.
	       *
	       * @memberOf Benchmark
	       * @type {Function|string}
	       * @example
	       *
	       * // basic usage
	       * var bench = Benchmark({
	       *   'setup': function() {
	       *     var c = this.count,
	       *         element = document.getElementById('container');
	       *     while (c--) {
	       *       element.appendChild(document.createElement('div'));
	       *     }
	       *   },
	       *   'fn': function() {
	       *     element.removeChild(element.lastChild);
	       *   }
	       * });
	       *
	       * // compiles to something like:
	       * var c = this.count,
	       *     element = document.getElementById('container');
	       * while (c--) {
	       *   element.appendChild(document.createElement('div'));
	       * }
	       * var start = new Date;
	       * while (count--) {
	       *   element.removeChild(element.lastChild);
	       * }
	       * var end = new Date - start;
	       *
	       * // or using strings
	       * var bench = Benchmark({
	       *   'setup': '\
	       *     var a = 0;\n\
	       *     (function() {\n\
	       *       (function() {\n\
	       *         (function() {',
	       *   'fn': 'a += 1;',
	       *   'teardown': '\
	       *          }())\n\
	       *        }())\n\
	       *      }())'
	       * });
	       *
	       * // compiles to something like:
	       * var a = 0;
	       * (function() {
	       *   (function() {
	       *     (function() {
	       *       var start = new Date;
	       *       while (count--) {
	       *         a += 1;
	       *       }
	       *       var end = new Date - start;
	       *     }())
	       *   }())
	       * }())
	       */
	      'setup': _.noop,

	      /**
	       * Compiled into the test and executed immediately **after** the test loop.
	       *
	       * @memberOf Benchmark
	       * @type {Function|string}
	       */
	      'teardown': _.noop,

	      /**
	       * An object of stats including mean, margin or error, and standard deviation.
	       *
	       * @memberOf Benchmark
	       * @type Object
	       */
	      'stats': {

	        /**
	         * The margin of error.
	         *
	         * @memberOf Benchmark#stats
	         * @type number
	         */
	        'moe': 0,

	        /**
	         * The relative margin of error (expressed as a percentage of the mean).
	         *
	         * @memberOf Benchmark#stats
	         * @type number
	         */
	        'rme': 0,

	        /**
	         * The standard error of the mean.
	         *
	         * @memberOf Benchmark#stats
	         * @type number
	         */
	        'sem': 0,

	        /**
	         * The sample standard deviation.
	         *
	         * @memberOf Benchmark#stats
	         * @type number
	         */
	        'deviation': 0,

	        /**
	         * The sample arithmetic mean (secs).
	         *
	         * @memberOf Benchmark#stats
	         * @type number
	         */
	        'mean': 0,

	        /**
	         * The array of sampled periods.
	         *
	         * @memberOf Benchmark#stats
	         * @type Array
	         */
	        'sample': [],

	        /**
	         * The sample variance.
	         *
	         * @memberOf Benchmark#stats
	         * @type number
	         */
	        'variance': 0
	      },

	      /**
	       * An object of timing data including cycle, elapsed, period, start, and stop.
	       *
	       * @memberOf Benchmark
	       * @type Object
	       */
	      'times': {

	        /**
	         * The time taken to complete the last cycle (secs).
	         *
	         * @memberOf Benchmark#times
	         * @type number
	         */
	        'cycle': 0,

	        /**
	         * The time taken to complete the benchmark (secs).
	         *
	         * @memberOf Benchmark#times
	         * @type number
	         */
	        'elapsed': 0,

	        /**
	         * The time taken to execute the test once (secs).
	         *
	         * @memberOf Benchmark#times
	         * @type number
	         */
	        'period': 0,

	        /**
	         * A timestamp of when the benchmark started (ms).
	         *
	         * @memberOf Benchmark#times
	         * @type number
	         */
	        'timeStamp': 0
	      }
	    });

	    _.assign(Benchmark.prototype, {
	      'abort': abort,
	      'clone': clone,
	      'compare': compare,
	      'emit': emit,
	      'listeners': listeners,
	      'off': off,
	      'on': on,
	      'reset': reset,
	      'run': run,
	      'toString': toStringBench
	    });

	    /*------------------------------------------------------------------------*/

	    _.assign(Deferred.prototype, {

	      /**
	       * The deferred benchmark instance.
	       *
	       * @memberOf Benchmark.Deferred
	       * @type Object
	       */
	      'benchmark': null,

	      /**
	       * The number of deferred cycles performed while benchmarking.
	       *
	       * @memberOf Benchmark.Deferred
	       * @type number
	       */
	      'cycles': 0,

	      /**
	       * The time taken to complete the deferred benchmark (secs).
	       *
	       * @memberOf Benchmark.Deferred
	       * @type number
	       */
	      'elapsed': 0,

	      /**
	       * A timestamp of when the deferred benchmark started (ms).
	       *
	       * @memberOf Benchmark.Deferred
	       * @type number
	       */
	      'timeStamp': 0
	    });

	    _.assign(Deferred.prototype, {
	      'resolve': resolve
	    });

	    /*------------------------------------------------------------------------*/

	    _.assign(Event.prototype, {

	      /**
	       * A flag to indicate if the emitters listener iteration is aborted.
	       *
	       * @memberOf Benchmark.Event
	       * @type boolean
	       */
	      'aborted': false,

	      /**
	       * A flag to indicate if the default action is cancelled.
	       *
	       * @memberOf Benchmark.Event
	       * @type boolean
	       */
	      'cancelled': false,

	      /**
	       * The object whose listeners are currently being processed.
	       *
	       * @memberOf Benchmark.Event
	       * @type Object
	       */
	      'currentTarget': undefined,

	      /**
	       * The return value of the last executed listener.
	       *
	       * @memberOf Benchmark.Event
	       * @type Mixed
	       */
	      'result': undefined,

	      /**
	       * The object to which the event was originally emitted.
	       *
	       * @memberOf Benchmark.Event
	       * @type Object
	       */
	      'target': undefined,

	      /**
	       * A timestamp of when the event was created (ms).
	       *
	       * @memberOf Benchmark.Event
	       * @type number
	       */
	      'timeStamp': 0,

	      /**
	       * The event type.
	       *
	       * @memberOf Benchmark.Event
	       * @type string
	       */
	      'type': ''
	    });

	    /*------------------------------------------------------------------------*/

	    /**
	     * The default options copied by suite instances.
	     *
	     * @static
	     * @memberOf Benchmark.Suite
	     * @type Object
	     */
	    Suite.options = {

	      /**
	       * The name of the suite.
	       *
	       * @memberOf Benchmark.Suite.options
	       * @type string
	       */
	      'name': undefined
	    };

	    /*------------------------------------------------------------------------*/

	    _.assign(Suite.prototype, {

	      /**
	       * The number of benchmarks in the suite.
	       *
	       * @memberOf Benchmark.Suite
	       * @type number
	       */
	      'length': 0,

	      /**
	       * A flag to indicate if the suite is aborted.
	       *
	       * @memberOf Benchmark.Suite
	       * @type boolean
	       */
	      'aborted': false,

	      /**
	       * A flag to indicate if the suite is running.
	       *
	       * @memberOf Benchmark.Suite
	       * @type boolean
	       */
	      'running': false
	    });

	    _.assign(Suite.prototype, {
	      'abort': abortSuite,
	      'add': add,
	      'clone': cloneSuite,
	      'emit': emit,
	      'filter': filterSuite,
	      'join': arrayRef.join,
	      'listeners': listeners,
	      'off': off,
	      'on': on,
	      'pop': arrayRef.pop,
	      'push': push,
	      'reset': resetSuite,
	      'run': runSuite,
	      'reverse': arrayRef.reverse,
	      'shift': shift,
	      'slice': slice,
	      'sort': arrayRef.sort,
	      'splice': arrayRef.splice,
	      'unshift': unshift
	    });

	    /*------------------------------------------------------------------------*/

	    // Expose Deferred, Event, and Suite.
	    _.assign(Benchmark, {
	      'Deferred': Deferred,
	      'Event': Event,
	      'Suite': Suite
	    });

	    /*------------------------------------------------------------------------*/

	    // Add lodash methods as Suite methods.
	    _.each(['each', 'forEach', 'indexOf', 'map', 'reduce'], function(methodName) {
	      var func = _[methodName];
	      Suite.prototype[methodName] = function() {
	        var args = [this];
	        push.apply(args, arguments);
	        return func.apply(_, args);
	      };
	    });

	    // Avoid array-like object bugs with `Array#shift` and `Array#splice`
	    // in Firefox < 10 and IE < 9.
	    _.each(['pop', 'shift', 'splice'], function(methodName) {
	      var func = arrayRef[methodName];

	      Suite.prototype[methodName] = function() {
	        var value = this,
	            result = func.apply(value, arguments);

	        if (value.length === 0) {
	          delete value[0];
	        }
	        return result;
	      };
	    });

	    // Avoid buggy `Array#unshift` in IE < 8 which doesn't return the new
	    // length of the array.
	    Suite.prototype.unshift = function() {
	      var value = this;
	      unshift.apply(value, arguments);
	      return value.length;
	    };

	    return Benchmark;
	  }

	  /*--------------------------------------------------------------------------*/

	  // Export Benchmark.
	  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
	  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
	    // Define as an anonymous module so, through path mapping, it can be aliased.
	    define(['lodash', 'platform'], function(_, platform) {
	      return runInContext({
	        '_': _,
	        'platform': platform
	      });
	    });
	  }
	  else {
	    var Benchmark = runInContext();

	    // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
	    if (freeExports && freeModule) {
	      // Export for Node.js.
	      if (moduleExports) {
	        (freeModule.exports = Benchmark).Benchmark = Benchmark;
	      }
	      // Export for CommonJS support.
	      freeExports.Benchmark = Benchmark;
	    }
	    else {
	      // Export to the global object.
	      root.Benchmark = Benchmark;
	    }
	  }
	}.call(this));


/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var jsvpx = __webpack_require__(8);

	var vpx_codec = __webpack_require__(39);
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
/* 8 */
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
	        iface : __webpack_require__(9)
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var VP8D_COMP = __webpack_require__(10);
	var onyxd_if = __webpack_require__(17);
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var VP8_COMMON = __webpack_require__(11);

	var dboolhuff = __webpack_require__(12);
	var BoolDecoder = dboolhuff.BOOL_DECODER;


	var blockd = __webpack_require__(14);
	var MACROBLOCKD = blockd.MACROBLOCKD;
	var FRAGMENT_DATA = blockd.FRAGMENT_DATA;
	var mb_info = blockd.MODE_INFO;

	var vpx_image = __webpack_require__(16);
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
	        this.coeffs = 0;
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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bitreader = __webpack_require__(13);
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
	        return get_uint(this, bits);
	    }
	    
	    get_int(bits){
	        return bool_get_int(this, bits);
	    }
	    
	    maybe_get_int(bits){
	        return maybe_get_int(this, bits);
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


	module.exports = {};
	module.exports.vp8dx_start_decode = vp8dx_start_decode;
	module.exports.bool_get_int = bool_get_int;
	//module.exports.maybe_get_int = maybe_get_int;

	module.exports.BOOL_DECODER = BOOL_DECODER;



/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var MotionVector = __webpack_require__(15);

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
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var decodeframe = __webpack_require__(18);
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var vp8_loopfilter = __webpack_require__(19);
	var vp8_loop_filter_row_simple = vp8_loopfilter.vp8_loop_filter_row_simple;
	var vp8_loop_filter_row_normal = vp8_loopfilter.vp8_loop_filter_row_normal;

	var detokenize = __webpack_require__(21);
	var decode_mb_tokens = detokenize.decode_mb_tokens;
	var vp8_reset_mb_tokens_context = detokenize.vp8_reset_mb_tokens_context;

	var bitreader = __webpack_require__(13);
	var vpx_read = bitreader.vpx_read;
	var vpx_read_bit = bitreader.vpx_read_bit;

	var entropymv = __webpack_require__(23);
	var vp8_default_mv_context = entropymv.vp8_default_mv_context;


	var entropy = __webpack_require__(24);
	var vp8_default_coef_probs = entropy.vp8_default_coef_probs;

	var quant_common = __webpack_require__(26);
	var vp8_dc_quant = quant_common.vp8_dc_quant;
	var vp8_dc2quant = quant_common.vp8_dc2quant;
	var vp8_dc_uv_quant = quant_common.vp8_dc_uv_quant;
	var vp8_ac_yquant = quant_common.vp8_ac_yquant;
	var vp8_ac2quant = quant_common.vp8_ac2quant;
	var vp8_ac_uv_quant = quant_common.vp8_ac_uv_quant;

	var reconinter = __webpack_require__(27);
	var vp8_build_inter_predictors_mb = reconinter.vp8_build_inter_predictors_mb;

	var reconintra = __webpack_require__(30);
	var predict_intra_chroma = reconintra.predict_intra_chroma;
	var predict_intra_luma = reconintra.predict_intra_luma;

	var dboolhuff = __webpack_require__(12);
	var vp8dx_start_decode = dboolhuff.vp8dx_start_decode;

	var decodemv = __webpack_require__(32);
	var vp8_decode_mode_mvs = decodemv.vp8_decode_mode_mvs;

	var entropymode = __webpack_require__(36);
	var vp8_init_mbmode_probs = entropymode.vp8_init_mbmode_probs;

	var vpx_image = __webpack_require__(16);
	var vpx_img_set_rect = vpx_image.vpx_img_set_rect;
	var img_alloc_helper = vpx_image.img_alloc_helper;

	var filter = __webpack_require__(28);
	var vp8_sub_pel_filters = filter.vp8_sub_pel_filters;
	var vp8_bilinear_filters = filter.vp8_bilinear_filters;

	var c_utils = __webpack_require__(22);
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
	        coeffs = ctx.tokens[row & (ctx.token_hdr.partitions - 1)].coeffs;



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

	var coeff_clear = new Float64Array(200);
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

	    //memset(coeffs, coeffs_off, 0, 400);
	    var copy_dest = coeffs.data_64;
	    copy_dest.set(coeff_clear);
	    /*
	     for(var c = 0; c < 200; c++){
	     copy_dest[c] = 0;
	     }*/



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

	    var i = 0;
	    var decoder = hdr.decoder;
	    var bool = decoder.boolDecoder;
	    hdr.partitions = 1 << bool.get_uint(2);
	    var partitions = hdr.partitions;//cache 

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



	    setup_token_decoder(decoder.token_hdr, data, data.ptr + first_partition_length_in_bytes,
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

	    if (pc.frame_size_updated === 1) {
	        var i = 0;
	        var coeff_row_sz = ctx.mb_cols * 400;

	        for (i = 0; i < partitions; i++) {
	            ctx.tokens[i].coeffs = new Uint32Array(coeff_row_sz);
	            ctx.tokens[i].coeffs.data_64 = new Float64Array(ctx.tokens[i].coeffs.buffer);
	        }

	        var mb_cols = ctx.mb_cols;
	        //ENTROPY_CONTEXT_PLANES
	        ctx.above_token_entropy_ctx = new Array(mb_cols);
	        for (var i = 0; i < mb_cols; i++)
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var loopfilter_filters = __webpack_require__(20);
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


	        if (ctx.segment_hdr.enabled === 1 && row)
	        {
	            calculate_filter_parameters(ctx, mbi[mbi_off], edge_limit,
	                    interior_limit, hev_threshold);
	        } else {
	            calculate_filter_parameters(ctx, mbi[mbi_off], edge_limit,
	                    interior_limit, hev_threshold);
	        }

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

	        if (ctx.segment_hdr.enabled === 1 && row)
	        {
	            calculate_filter_parameters(ctx, mbi[mbi_off], edge_limit,
	                    interior_limit, hev_threshold);
	        } else {
	            calculate_filter_parameters(ctx, mbi[mbi_off], edge_limit,
	                    interior_limit, hev_threshold);
	        }
	        
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
/* 20 */
/***/ function(module, exports) {

	'use strict';

	//var abs = Math.abs;

	function abs(value ){
	    return (value ^ (value >> 31)) - (value >> 31);
	}
	var min = Math.min;
	var max = Math.max;

	function saturate_int8(x) {

	    return min(max(x, -128), 127);

	}

	function saturate_uint8(x) {
	    return min(max(x, 0), 255);
	    
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var blockd = __webpack_require__(14);
	var vp8_block2left = blockd.vp8_block2left;
	var vp8_block2above = blockd.vp8_block2above;

	var bitreader = __webpack_require__(13);
	var vpx_read = bitreader.vpx_read;
	var vpx_read_bit = bitreader.vpx_read_bit;

	var c_utils = __webpack_require__(22);
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
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var default_coef_probs = __webpack_require__(25);
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
/* 25 */
/***/ function(module, exports) {

	'use strict';
	var default_coef_probs = new Uint8Array([128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 253, 136, 254, 255, 228, 219, 128, 128, 128, 128, 128, 189, 129, 242, 255, 227, 213, 255, 219, 128, 128, 128, 106, 126, 227, 252, 214, 209, 255, 255, 128, 128, 128, 1, 98, 248, 255, 236, 226, 255, 255, 128, 128, 128, 181, 133, 238, 254, 221, 234, 255, 154, 128, 128, 128, 78, 134, 202, 247, 198, 180, 255, 219, 128, 128, 128, 1, 185, 249, 255, 243, 255, 128, 128, 128, 128, 128, 184, 150, 247, 255, 236, 224, 128, 128, 128, 128, 128, 77, 110, 216, 255, 236, 230, 128, 128, 128, 128, 128, 1, 101, 251, 255, 241, 255, 128, 128, 128, 128, 128, 170, 139, 241, 252, 236, 209, 255, 255, 128, 128, 128, 37, 116, 196, 243, 228, 255, 255, 255, 128, 128, 128, 1, 204, 254, 255, 245, 255, 128, 128, 128, 128, 128, 207, 160, 250, 255, 238, 128, 128, 128, 128, 128, 128, 102, 103, 231, 255, 211, 171, 128, 128, 128, 128, 128, 1, 152, 252, 255, 240, 255, 128, 128, 128, 128, 128, 177, 135, 243, 255, 234, 225, 128, 128, 128, 128, 128, 80, 129, 211, 255, 194, 224, 128, 128, 128, 128, 128, 1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 246, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 255, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 198, 35, 237, 223, 193, 187, 162, 160, 145, 155, 62, 131, 45, 198, 221, 172, 176, 220, 157, 252, 221, 1, 68, 47, 146, 208, 149, 167, 221, 162, 255, 223, 128, 1, 149, 241, 255, 221, 224, 255, 255, 128, 128, 128, 184, 141, 234, 253, 222, 220, 255, 199, 128, 128, 128, 81, 99, 181, 242, 176, 190, 249, 202, 255, 255, 128, 1, 129, 232, 253, 214, 197, 242, 196, 255, 255, 128, 99, 121, 210, 250, 201, 198, 255, 202, 128, 128, 128, 23, 91, 163, 242, 170, 187, 247, 210, 255, 255, 128, 1, 200, 246, 255, 234, 255, 128, 128, 128, 128, 128, 109, 178, 241, 255, 231, 245, 255, 255, 128, 128, 128, 44, 130, 201, 253, 205, 192, 255, 255, 128, 128, 128, 1, 132, 239, 251, 219, 209, 255, 165, 128, 128, 128, 94, 136, 225, 251, 218, 190, 255, 255, 128, 128, 128, 22, 100, 174, 245, 186, 161, 255, 199, 128, 128, 128, 1, 182, 249, 255, 232, 235, 128, 128, 128, 128, 128, 124, 143, 241, 255, 227, 234, 128, 128, 128, 128, 128, 35, 77, 181, 251, 193, 211, 255, 205, 128, 128, 128, 1, 157, 247, 255, 236, 231, 255, 255, 128, 128, 128, 121, 141, 235, 255, 225, 227, 255, 255, 128, 128, 128, 45, 99, 188, 251, 195, 217, 255, 224, 128, 128, 128, 1, 1, 251, 255, 213, 255, 128, 128, 128, 128, 128, 203, 1, 248, 255, 255, 128, 128, 128, 128, 128, 128, 137, 1, 177, 255, 224, 255, 128, 128, 128, 128, 128, 253, 9, 248, 251, 207, 208, 255, 192, 128, 128, 128, 175, 13, 224, 243, 193, 185, 249, 198, 255, 255, 128, 73, 17, 171, 221, 161, 179, 236, 167, 255, 234, 128, 1, 95, 247, 253, 212, 183, 255, 255, 128, 128, 128, 239, 90, 244, 250, 211, 209, 255, 255, 128, 128, 128, 155, 77, 195, 248, 188, 195, 255, 255, 128, 128, 128, 1, 24, 239, 251, 218, 219, 255, 205, 128, 128, 128, 201, 51, 219, 255, 196, 186, 128, 128, 128, 128, 128, 69, 46, 190, 239, 201, 218, 255, 228, 128, 128, 128, 1, 191, 251, 255, 255, 128, 128, 128, 128, 128, 128, 223, 165, 249, 255, 213, 255, 128, 128, 128, 128, 128, 141, 124, 248, 255, 255, 128, 128, 128, 128, 128, 128, 1, 16, 248, 255, 255, 128, 128, 128, 128, 128, 128, 190, 36, 230, 255, 236, 255, 128, 128, 128, 128, 128, 149, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 1, 226, 255, 128, 128, 128, 128, 128, 128, 128, 128, 247, 192, 255, 128, 128, 128, 128, 128, 128, 128, 128, 240, 128, 255, 128, 128, 128, 128, 128, 128, 128, 128, 1, 134, 252, 255, 255, 128, 128, 128, 128, 128, 128, 213, 62, 250, 255, 255, 128, 128, 128, 128, 128, 128, 55, 93, 255, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 202, 24, 213, 235, 186, 191, 220, 160, 240, 175, 255, 126, 38, 182, 232, 169, 184, 228, 174, 255, 187, 128, 61, 46, 138, 219, 151, 178, 240, 170, 255, 216, 128, 1, 112, 230, 250, 199, 191, 247, 159, 255, 255, 128, 166, 109, 228, 252, 211, 215, 255, 174, 128, 128, 128, 39, 77, 162, 232, 172, 180, 245, 178, 255, 255, 128, 1, 52, 220, 246, 198, 199, 249, 220, 255, 255, 128, 124, 74, 191, 243, 183, 193, 250, 221, 255, 255, 128, 24, 71, 130, 219, 154, 170, 243, 182, 255, 255, 128, 1, 182, 225, 249, 219, 240, 255, 224, 128, 128, 128, 149, 150, 226, 252, 216, 205, 255, 171, 128, 128, 128, 28, 108, 170, 242, 183, 194, 254, 223, 255, 255, 128, 1, 81, 230, 252, 204, 203, 255, 192, 128, 128, 128, 123, 102, 209, 247, 188, 196, 255, 233, 128, 128, 128, 20, 95, 153, 243, 164, 173, 255, 203, 128, 128, 128, 1, 222, 248, 255, 216, 213, 128, 128, 128, 128, 128, 168, 175, 246, 252, 235, 205, 255, 255, 128, 128, 128, 47, 116, 215, 255, 211, 212, 255, 255, 128, 128, 128, 1, 121, 236, 253, 212, 214, 255, 255, 128, 128, 128, 141, 84, 213, 252, 201, 202, 255, 219, 128, 128, 128, 42, 80, 160, 240, 162, 185, 255, 205, 128, 128, 128, 1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 244, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128, 238, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128]);
	default_coef_probs.data_32 = new Uint32Array(default_coef_probs.buffer);
	default_coef_probs.data_64 = new Float64Array(default_coef_probs.buffer);

	module.exports = default_coef_probs;



/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	/*
	 * #define MINQ 0
	#define MAXQ 127
	#define QINDEX_RANGE (MAXQ + 1)
	 */
	//QINDEX_RANGE = 128

	//dc_q_lookup
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

	var min = Math.min;
	var max = Math.max;
	function CLAMP_255(x) {
	    return  min(max(x, 0), 255);
	}

	function vp8_dc_quant (QIndex, Delta) {
	  var retval = 0;

	  QIndex = QIndex + Delta;

	  if (QIndex > 127) {
	    QIndex = 127;
	  } else if (QIndex < 0) {
	    QIndex = 0;
	  }

	    QIndex = min(max(QIndex, 0), 127);
	    retval = dc_qlookup[QIndex];
	  return retval;
	}

	function vp8_dc2quant( QIndex,  Delta) {
	  var retval = 0;

	  QIndex = QIndex + Delta;

	  if (QIndex > 127) {
	    QIndex = 127;
	  } else if (QIndex < 0) {
	    QIndex = 0;
	  }

	  retval = dc_qlookup[QIndex] << 1;
	  return retval;
	}

	function vp8_dc_uv_quant( QIndex,  Delta) {
	  var retval = 0;

	  QIndex = QIndex + Delta;

	  if (QIndex > 127) {
	    QIndex = 127;
	  } else if (QIndex < 0) {
	    QIndex = 0;
	  }

	  retval = dc_qlookup[QIndex];

	  if (retval > 132) retval = 132;

	  return retval;
	}

	function vp8_ac_yquant(QIndex) {
	  var retval = 0;

	  if (QIndex > 127) {
	    QIndex = 127;
	  } else if (QIndex < 0) {
	    QIndex = 0;
	  }

	  retval = ac_qlookup[QIndex];
	  return retval;
	}

	function vp8_ac2quant( QIndex,  Delta) {
	  var retval = 0;

	  QIndex = QIndex + Delta;

	  if (QIndex > 127) {
	    QIndex = 127;
	  } else if (QIndex < 0) {
	    QIndex = 0;
	  }

	  /* For all x in [0..284], x*155/100 is bitwise equal to (x*101581) >> 16.
	   * The smallest precision for that is '(x*6349) >> 12' but 16 is a good
	   * word size. */
	  retval = (ac_qlookup[QIndex] * 101581) >> 16;

	  if (retval < 8) retval = 8;

	  return retval;
	}

	function vp8_ac_uv_quant( QIndex,  Delta) {
	  var retval = 0;

	  QIndex = QIndex + Delta;

	  if (QIndex > 127) {
	    QIndex = 127;
	  } else if (QIndex < 0) {
	    QIndex = 0;
	  }

	  retval = ac_qlookup[QIndex];
	  return retval;
	}


	module.exports = {};
	module.exports.vp8_dc_quant = vp8_dc_quant;
	module.exports.vp8_dc2quant = vp8_dc2quant;
	module.exports.vp8_dc_uv_quant = vp8_dc_uv_quant;
	module.exports.vp8_ac_yquant = vp8_ac_yquant;
	module.exports.vp8_ac2quant = vp8_ac2quant;
	module.exports.vp8_ac_uv_quant = vp8_ac_uv_quant;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var MotionVector = __webpack_require__(15);

	var filter = __webpack_require__(28);
	var filter_block2d = filter.filter_block2d;

	var SPLITMV = 9;

	var idctllm = __webpack_require__(29);
	var vp8_short_inv_walsh4x4_c = idctllm.vp8_short_inv_walsh4x4_c;
	var vp8_short_idct4x4llm_c = idctllm.vp8_short_idct4x4llm_c;

	var c_utils = __webpack_require__(22);
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
	        uvmv.as_row_col[0] = (x + 1 + ((x >> 31) << 1));
	        uvmv.as_row_col[1] = (y + 1 + ((y >> 31) << 1));
	        uvmv.as_row_col[0] /= 2;
	        uvmv.as_row_col[1] /= 2;

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
/* 28 */
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
/* 29 */
/***/ function(module, exports) {

	'use strict';



	var min = Math.min;
	var max = Math.max;

	function CLAMP_255(x) {

	    return min(max(x, 0), 255);

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
	    }

	    //var mb_dqcoeff = input;

	    for (i = 0; i < 16; i++) {
	        //coeffs[coeffs_off + i * 16] = y2[i]; //no y2_off need
	        input[mb_dqcoeff_ptr + (i << 4)] = output[i];
	    }

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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var reconintra4x4 = __webpack_require__(31);
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

	var idctllm = __webpack_require__(29);
	var vp8_short_inv_walsh4x4_c = idctllm.vp8_short_inv_walsh4x4_c;
	var vp8_short_idct4x4llm_c = idctllm.vp8_short_idct4x4llm_c;


	var min = Math.min;
	var max = Math.max;
	function CLAMP_255(x) {
	    return  min(max(x, 0), 255);
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
	    
	    var left0 = left[left_off + 0];

	    pred0 = (above[above_off - 1] + above0 + 1) >> 1;
	    pred1 = (above0 + above1 + 1) >> 1;
	    pred2 = (above1 + above2 + 1) >> 1;
	    pred3 = (above2 + above3 + 1) >> 1;
	    
	    predict.data_32[predict_off >> 2] = pred0 | (pred1 << 8) | (pred2 << 16) | (pred3 << 24);
	    predict_off += stride;

	    pred4 = (left[left_off + 0] + 2 * above[above_off - 1] + above0 + 2) >> 2;
	    pred5 = (above[above_off - 1] + 2 * above0 + above1 + 2) >> 2;
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
	    pred3 = (above3 + (above4 << 1) + above[above_off + 5] + 2) >> 2;

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
	    pred7 = (above3 + 2 * above4 + above[above_off + 5] + 2) >> 2;
	    
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
/* 31 */
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var findenearmv = __webpack_require__(33);
	var left_block_mode = findenearmv.left_block_mode;
	var above_block_mode = findenearmv.above_block_mode;

	var MotionVector = __webpack_require__(15);
	var vp8_entropymodedata = __webpack_require__(34);

	var vp8_kf_bmode_prob = vp8_entropymodedata.vp8_kf_bmode_prob;

	var vp8_coef_update_probs = __webpack_require__(35);

	var entropymode = __webpack_require__(36);
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

	var vp8_mode_contexts = __webpack_require__(37);

	var bitreader = __webpack_require__(13);
	var vpx_read = bitreader.vpx_read;
	var vpx_read_bit = bitreader.vpx_read_bit;


	var vp8_treed_read = __webpack_require__(38);

	var entropymv = __webpack_require__(23);
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var MotionVector = __webpack_require__(15);

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
/* 34 */
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
/* 35 */
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
/* 36 */
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
/* 37 */
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bitreader = __webpack_require__(13);
	var vpx_read = bitreader.vpx_read;


	function vp8_treed_read(r, t, p, p_off) {
	    
	    var i = 0;


	        while ((i = t[ i + vpx_read(r, p[p_off + (i >> 1)])]) > 0) {}




	    return (-i) | 0;
	}

	module.exports = vp8_treed_read;

/***/ },
/* 39 */
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

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = [
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


/***/ }
/******/ ]);