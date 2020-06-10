(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LasTools"] = factory();
	else
		root["LasTools"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./tools/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./tools/index.ts":
/*!************************!*\
  !*** ./tools/index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./modules/buffered-bar */ \"./tools/modules/buffered-bar.ts\"), __webpack_require__(/*! ./modules/progress-bar */ \"./tools/modules/progress-bar.ts\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(typeof globalThis !== \"undefined\" ? globalThis : typeof self !== \"undefined\" ? self : this, function (_exports, _bufferedBar, _progressBar) {\n  \"use strict\";\n\n  _exports.__esModule = true;\n  _exports.default = void 0;\n  _bufferedBar = _interopRequireDefault(_bufferedBar);\n  _progressBar = _interopRequireDefault(_progressBar);\n\n  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\n  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n  var LasTools =\n  /*#__PURE__*/\n  function () {\n    function LasTools() {}\n\n    _createClass(LasTools, null, [{\n      key: \"ProgressBarClass\",\n      get: function get() {\n        return _progressBar.default;\n      }\n    }, {\n      key: \"BufferedBarClass\",\n      get: function get() {\n        return _bufferedBar.default;\n      }\n    }]);\n\n    return LasTools;\n  }();\n\n  var _default = LasTools;\n  _exports.default = _default;\n});\n\n//# sourceURL=webpack://LasTools/./tools/index.ts?");

/***/ }),

/***/ "./tools/modules/buffered-bar.ts":
/*!***************************************!*\
  !*** ./tools/modules/buffered-bar.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(typeof globalThis !== \"undefined\" ? globalThis : typeof self !== \"undefined\" ? self : this, function (_exports) {\n  \"use strict\";\n\n  _exports.__esModule = true;\n  _exports.default = void 0;\n\n  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\n  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n  var BufferedBar =\n  /*#__PURE__*/\n  function () {\n    function BufferedBar(w, h) {\n      this._w = 800;\n      this._h = 20;\n      this._canvas = void 0;\n      this._ctx = void 0;\n      this._video = void 0;\n      this._w = w || this._w;\n      this._h = h || this._h;\n      this._canvas = document.createElement('canvas');\n      this._canvas.width = this._w;\n      this._canvas.height = this._h;\n      this._ctx = this._canvas.getContext('2d');\n      this._ctx.textBaseline = 'top';\n    }\n\n    var _proto = BufferedBar.prototype;\n\n    _proto.attachMedia = function attachMedia(video) {\n      this._video = video;\n    };\n\n    _proto.refresh = function refresh() {\n      var v = this._video;\n\n      if (!v) {\n        return;\n      }\n\n      var b = v.buffered;\n\n      if (!b.length) {\n        return;\n      }\n\n      var x = 0,\n          y = 3,\n          w = this._canvas.width,\n          h = this._canvas.height,\n          buffered = Math.max(v.currentTime, b.end(b.length - 1)) - v.currentTime,\n          max = Math.max(2, Math.ceil(buffered));\n\n      this._ctx.clearRect(0, 0, w, h); // 整体背景\n\n\n      this._ctx.fillStyle = '#011935';\n\n      this._ctx.fillRect(0, 0, w, h);\n\n      var barH = h - 6; // 进度条背景\n\n      this._ctx.fillStyle = '#00343f';\n\n      this._ctx.fillRect(x, y, w, barH);\n\n      this._ctx.fillStyle = '#555555';\n      var barW = Math.min(w, buffered / max * w);\n\n      this._ctx.fillRect(x, y, barW, h - 6);\n\n      this._ctx.fillStyle = '#FFFFFF';\n      this._ctx.font = h * 0.7 + \"px Consolas, Arial\";\n      this._ctx.textBaseline = 'bottom';\n      this._ctx.textAlign = 'left';\n\n      this._ctx.fillText(\"Video Buffer: \" + buffered.toFixed(3) + \" s\", 5, h * 0.9);\n\n      this._ctx.fillStyle = '#AAAAAA';\n      this._ctx.textAlign = 'end';\n\n      this._ctx.fillText(max + \"s\", w - 5, h * 0.9);\n    };\n\n    _proto.setSize = function setSize(w, h) {\n      this._canvas.width = this._w = w;\n      this._canvas.height = this._h = h;\n    };\n\n    _createClass(BufferedBar, [{\n      key: \"dom\",\n      get: function get() {\n        return this._canvas;\n      }\n    }]);\n\n    return BufferedBar;\n  }();\n\n  var _default = BufferedBar;\n  _exports.default = _default;\n});\n\n//# sourceURL=webpack://LasTools/./tools/modules/buffered-bar.ts?");

/***/ }),

/***/ "./tools/modules/progress-bar.ts":
/*!***************************************!*\
  !*** ./tools/modules/progress-bar.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ../utils */ \"./tools/utils.ts\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(typeof globalThis !== \"undefined\" ? globalThis : typeof self !== \"undefined\" ? self : this, function (_exports, _utils) {\n  \"use strict\";\n\n  _exports.__esModule = true;\n  _exports.default = void 0;\n\n  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\n  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n  var ProgressBar =\n  /*#__PURE__*/\n  function () {\n    function ProgressBar(w, h) {\n      this._w = 800;\n      this._h = 20;\n      this._canvas = void 0;\n      this._ctx = void 0;\n      this._video = void 0;\n\n      this.value2x = function (value, p) {\n        return (value - p.rangeSt) / (p.rangeEd - p.rangeSt) * p.w;\n      };\n\n      this._w = w || this._w;\n      this._h = h || this._h;\n      this._canvas = document.createElement('canvas');\n      this._canvas.width = this._w;\n      this._canvas.height = this._h;\n      this._ctx = this._canvas.getContext('2d');\n      this._ctx.textBaseline = 'top';\n    }\n\n    var _proto = ProgressBar.prototype;\n\n    _proto.attachMedia = function attachMedia(video) {\n      this._video = video;\n    };\n\n    _proto.refresh = function refresh() {\n      var v = this._video;\n\n      if (!v) {\n        return;\n      }\n\n      var b = v.buffered;\n\n      if (!b.length) {\n        return;\n      }\n\n      var x = 0,\n          y = 3,\n          w = this._canvas.width,\n          h = this._canvas.height,\n          pos = {\n        rangeSt: Math.min(v.currentTime, b.start(0)),\n        rangeEd: Math.max(v.currentTime, b.end(b.length - 1)),\n        w: w\n      };\n\n      this._ctx.clearRect(0, 0, w, h); // 整体背景\n\n\n      this._ctx.fillStyle = '#011935';\n\n      this._ctx.fillRect(0, 0, w, h);\n\n      var barH = h - 6; // 进度条背景\n\n      this._ctx.fillStyle = '#00343f';\n\n      this._ctx.fillRect(x, y, w, barH);\n\n      this._ctx.fillStyle = '#555555';\n\n      for (var i = 0; i < b.length; i++) {\n        this._ctx.fillRect(this.value2x(b.start(i), pos), y, this.value2x(b.end(i), pos) - this.value2x(b.start(i), pos), h - 6);\n      }\n\n      this._ctx.fillStyle = '#d0e9ff';\n      this._ctx.font = h * 0.7 + \"px Consolas, Arial\";\n      this._ctx.textAlign = 'start';\n\n      this._ctx.fillText((0, _utils.secFormat)(pos.rangeSt), 5, h * 0.25);\n\n      this._ctx.textAlign = 'end';\n\n      this._ctx.fillText((0, _utils.secFormat)(v.currentTime) + ' / ' + (0, _utils.secFormat)(pos.rangeEd), w - 5, h * 0.15);\n\n      this._ctx.lineWidth = 1;\n\n      this._ctx.beginPath();\n\n      this._ctx.moveTo(this.value2x(v.currentTime, pos), 0);\n\n      this._ctx.lineTo(this.value2x(v.currentTime, pos), h);\n\n      this._ctx.strokeStyle = '#ffff00';\n\n      this._ctx.stroke();\n    };\n\n    _proto.setSize = function setSize(w, h) {\n      this._canvas.width = this._w = w;\n      this._canvas.height = this._h = h;\n    };\n\n    _createClass(ProgressBar, [{\n      key: \"dom\",\n      get: function get() {\n        return this._canvas;\n      }\n    }]);\n\n    return ProgressBar;\n  }();\n\n  var _default = ProgressBar;\n  _exports.default = _default;\n});\n\n//# sourceURL=webpack://LasTools/./tools/modules/progress-bar.ts?");

/***/ }),

/***/ "./tools/utils.ts":
/*!************************!*\
  !*** ./tools/utils.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(typeof globalThis !== \"undefined\" ? globalThis : typeof self !== \"undefined\" ? self : this, function (_exports) {\n  \"use strict\";\n\n  _exports.__esModule = true;\n  _exports.secFormat = secFormat;\n\n  function secFormat(s) {\n    s = Math.floor(s);\n    var m = Math.floor(s / 60) || 0;\n    s = s % 60;\n    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;\n  }\n});\n\n//# sourceURL=webpack://LasTools/./tools/utils.ts?");

/***/ })

/******/ })["default"];
});