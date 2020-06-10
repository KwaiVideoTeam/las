typeof window !== "undefined" &&
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Las"] = factory();
	else
		root["Las"] = factory();
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/querystringify/index.js":
/*!**********************************************!*\
  !*** ./node_modules/querystringify/index.js ***!
  \**********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , undef;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String|Null} The decoded string.
 * @api private
 */
function decode(input) {
  try {
    return decodeURIComponent(input.replace(/\+/g, ' '));
  } catch (e) {
    return null;
  }
}

/**
 * Attempts to encode a given input.
 *
 * @param {String} input The string that needs to be encoded.
 * @returns {String|Null} The encoded string.
 * @api private
 */
function encode(input) {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return null;
  }
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  while (part = parser.exec(query)) {
    var key = decode(part[1])
      , value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    // In the case if failed decoding, we want to omit the key/value pairs
    // from the result.
    //
    if (key === null || value === null || key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = []
    , value
    , key;

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (key in obj) {
    if (has.call(obj, key)) {
      value = obj[key];

      //
      // Edge cases where we actually want to encode the value to an empty
      // string instead of the stringified value.
      //
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = '';
      }

      key = encodeURIComponent(key);
      value = encodeURIComponent(value);

      //
      // If we failed to encode the strings, we should bail out as we don't
      // want to add invalid strings to the query.
      //
      if (key === null || value === null) continue;
      pairs.push(key +'='+ value);
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;


/***/ }),

/***/ "./node_modules/requires-port/index.js":
/*!*********************************************!*\
  !*** ./node_modules/requires-port/index.js ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};


/***/ }),

/***/ "./node_modules/url-parse/index.js":
/*!*****************************************!*\
  !*** ./node_modules/url-parse/index.js ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var required = __webpack_require__(/*! requires-port */ "./node_modules/requires-port/index.js")
  , qs = __webpack_require__(/*! querystringify */ "./node_modules/querystringify/index.js")
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
  , whitespace = '[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]'
  , left = new RegExp('^'+ whitespace +'+');

/**
 * Trim a given string.
 *
 * @param {String} str String to trim.
 * @public
 */
function trimLeft(str) {
  return (str ? str : '').toString().replace(left, '');
}

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  function sanitize(address) {          // Sanitize what is left of the address
    return address.replace('\\', '/');
  },
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
function lolcation(loc) {
  var globalVar;

  if (typeof window !== 'undefined') globalVar = window;
  else if (typeof global !== 'undefined') globalVar = global;
  else if (typeof self !== 'undefined') globalVar = self;
  else globalVar = {};

  var location = globalVar.location || {};
  loc = loc || location;

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
function extractProtocol(address) {
  address = trimLeft(address);
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @private
 */
function resolve(relative, base) {
  if (relative === '') return base;

  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} [location] Location defaults for relative paths.
 * @param {Boolean|Function} [parser] Parser for the query string.
 * @private
 */
function Url(address, location, parser) {
  address = trimLeft(address);

  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];

    if (typeof instruction === 'function') {
      address = instruction(address);
      continue;
    }

    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL} URL instance for chaining.
 * @public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.trimLeft = trimLeft;
Url.qs = qs;

module.exports = Url;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webworkify-webpack/index.js":
/*!**************************************************!*\
  !*** ./node_modules/webworkify-webpack/index.js ***!
  \**************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

function webpackBootstrapFunc (modules) {
/******/  // The module cache
/******/  var installedModules = {};

/******/  // The require function
/******/  function __webpack_require__(moduleId) {

/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;

/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      i: moduleId,
/******/      l: false,
/******/      exports: {}
/******/    };

/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/    // Flag the module as loaded
/******/    module.l = true;

/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }

/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;

/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;

/******/  // identity function for calling harmony imports with the correct context
/******/  __webpack_require__.i = function(value) { return value; };

/******/  // define getter function for harmony exports
/******/  __webpack_require__.d = function(exports, name, getter) {
/******/    if(!__webpack_require__.o(exports, name)) {
/******/      Object.defineProperty(exports, name, {
/******/        configurable: false,
/******/        enumerable: true,
/******/        get: getter
/******/      });
/******/    }
/******/  };

/******/  // define __esModule on exports
/******/  __webpack_require__.r = function(exports) {
/******/    Object.defineProperty(exports, '__esModule', { value: true });
/******/  };

/******/  // getDefaultExport function for compatibility with non-harmony modules
/******/  __webpack_require__.n = function(module) {
/******/    var getter = module && module.__esModule ?
/******/      function getDefault() { return module['default']; } :
/******/      function getModuleExports() { return module; };
/******/    __webpack_require__.d(getter, 'a', getter);
/******/    return getter;
/******/  };

/******/  // Object.prototype.hasOwnProperty.call
/******/  __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "/";

/******/  // on error function for async loading
/******/  __webpack_require__.oe = function(err) { console.error(err); throw err; };

  var f = __webpack_require__(__webpack_require__.s = ENTRY_MODULE)
  return f.default || f // try to call default if defined to also support babel esmodule exports
}

var moduleNameReqExp = '[\\.|\\-|\\+|\\w|\/|@]+'
var dependencyRegExp = '\\(\\s*(\/\\*.*?\\*\/)?\\s*.*?(' + moduleNameReqExp + ').*?\\)' // additional chars when output.pathinfo is true

// http://stackoverflow.com/a/2593661/130442
function quoteRegExp (str) {
  return (str + '').replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&')
}

function isNumeric(n) {
  return !isNaN(1 * n); // 1 * n converts integers, integers as string ("123"), 1e3 and "1e3" to integers and strings to NaN
}

function getModuleDependencies (sources, module, queueName) {
  var retval = {}
  retval[queueName] = []

  var fnString = module.toString()
  var wrapperSignature = fnString.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/)
  if (!wrapperSignature) return retval
  var webpackRequireName = wrapperSignature[1]

  // main bundle deps
  var re = new RegExp('(\\\\n|\\W)' + quoteRegExp(webpackRequireName) + dependencyRegExp, 'g')
  var match
  while ((match = re.exec(fnString))) {
    if (match[3] === 'dll-reference') continue
    retval[queueName].push(match[3])
  }

  // dll deps
  re = new RegExp('\\(' + quoteRegExp(webpackRequireName) + '\\("(dll-reference\\s(' + moduleNameReqExp + '))"\\)\\)' + dependencyRegExp, 'g')
  while ((match = re.exec(fnString))) {
    if (!sources[match[2]]) {
      retval[queueName].push(match[1])
      sources[match[2]] = __webpack_require__(match[1]).m
    }
    retval[match[2]] = retval[match[2]] || []
    retval[match[2]].push(match[4])
  }

  // convert 1e3 back to 1000 - this can be important after uglify-js converted 1000 to 1e3
  var keys = Object.keys(retval);
  for (var i = 0; i < keys.length; i++) {
    for (var j = 0; j < retval[keys[i]].length; j++) {
      if (isNumeric(retval[keys[i]][j])) {
        retval[keys[i]][j] = 1 * retval[keys[i]][j];
      }
    }
  }

  return retval
}

function hasValuesInQueues (queues) {
  var keys = Object.keys(queues)
  return keys.reduce(function (hasValues, key) {
    return hasValues || queues[key].length > 0
  }, false)
}

function getRequiredModules (sources, moduleId) {
  var modulesQueue = {
    main: [moduleId]
  }
  var requiredModules = {
    main: []
  }
  var seenModules = {
    main: {}
  }

  while (hasValuesInQueues(modulesQueue)) {
    var queues = Object.keys(modulesQueue)
    for (var i = 0; i < queues.length; i++) {
      var queueName = queues[i]
      var queue = modulesQueue[queueName]
      var moduleToCheck = queue.pop()
      seenModules[queueName] = seenModules[queueName] || {}
      if (seenModules[queueName][moduleToCheck] || !sources[queueName][moduleToCheck]) continue
      seenModules[queueName][moduleToCheck] = true
      requiredModules[queueName] = requiredModules[queueName] || []
      requiredModules[queueName].push(moduleToCheck)
      var newModules = getModuleDependencies(sources, sources[queueName][moduleToCheck], queueName)
      var newModulesKeys = Object.keys(newModules)
      for (var j = 0; j < newModulesKeys.length; j++) {
        modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]] || []
        modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]].concat(newModules[newModulesKeys[j]])
      }
    }
  }

  return requiredModules
}

module.exports = function (moduleId, options) {
  options = options || {}
  var sources = {
    main: __webpack_require__.m
  }

  var requiredModules = options.all ? { main: Object.keys(sources.main) } : getRequiredModules(sources, moduleId)

  var src = ''

  Object.keys(requiredModules).filter(function (m) { return m !== 'main' }).forEach(function (module) {
    var entryModule = 0
    while (requiredModules[module][entryModule]) {
      entryModule++
    }
    requiredModules[module].push(entryModule)
    sources[module][entryModule] = '(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })'
    src = src + 'var ' + module + ' = (' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(entryModule)) + ')({' + requiredModules[module].map(function (id) { return '' + JSON.stringify(id) + ': ' + sources[module][id].toString() }).join(',') + '});\n'
  })

  src = src + 'new ((' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(moduleId)) + ')({' + requiredModules.main.map(function (id) { return '' + JSON.stringify(id) + ': ' + sources.main[id].toString() }).join(',') + '}))(self);'

  var blob = new window.Blob([src], { type: 'text/javascript' })
  if (options.bare) { return blob }

  var URL = window.URL || window.webkitURL || window.mozURL || window.msURL

  var workerUrl = URL.createObjectURL(blob)
  var worker = new window.Worker(workerUrl)
  worker.objectURL = workerUrl

  return worker
}


/***/ }),

/***/ "./src/core/errors.ts":
/*!****************************!*\
  !*** ./src/core/errors.ts ***!
  \****************************/
/*! exports provided: ErrorTypes, ErrorDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorTypes", function() { return ErrorTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorDetails", function() { return ErrorDetails; });
var ErrorTypes;

(function (ErrorTypes) {
  ErrorTypes["NETWORK_ERROR"] = "networkError";
  ErrorTypes["MEDIA_ERROR"] = "mediaError";
  ErrorTypes["MUX_ERROR"] = "muxError";
  ErrorTypes["OTHER_ERROR"] = "otherError";
  ErrorTypes["MSE_ERROR"] = "mseError";
})(ErrorTypes || (ErrorTypes = {}));

;
var ErrorDetails;

(function (ErrorDetails) {
  ErrorDetails[ErrorDetails["LOAD_ERROR"] = 10] = "LOAD_ERROR";
  ErrorDetails[ErrorDetails["VIDEO_ERROR"] = 101] = "VIDEO_ERROR";
  ErrorDetails[ErrorDetails["UNSUPPORTED"] = 102] = "UNSUPPORTED";
  ErrorDetails[ErrorDetails["CONFIG_ERROR"] = 103] = "CONFIG_ERROR";
  ErrorDetails[ErrorDetails["MEDIASOURCE_ERROR"] = 200] = "MEDIASOURCE_ERROR";
  ErrorDetails[ErrorDetails["ADDSOURCEBUFFER_ERROR"] = 201] = "ADDSOURCEBUFFER_ERROR";
  ErrorDetails[ErrorDetails["SOURCEBUFFER_ERROR"] = 202] = "SOURCEBUFFER_ERROR";
  ErrorDetails[ErrorDetails["ENDOFSTREAM_ERROR"] = 203] = "ENDOFSTREAM_ERROR";
  ErrorDetails[ErrorDetails["APPENDBUFFER_ERROR"] = 204] = "APPENDBUFFER_ERROR";
  ErrorDetails[ErrorDetails["PARSING_ERROR"] = 301] = "PARSING_ERROR";
  ErrorDetails[ErrorDetails["REMUX_ERROR"] = 302] = "REMUX_ERROR";
  ErrorDetails[ErrorDetails["REMUX_ALLOC_ERROR"] = 303] = "REMUX_ALLOC_ERROR";
})(ErrorDetails || (ErrorDetails = {}));

;

/***/ }),

/***/ "./src/core/events.ts":
/*!****************************!*\
  !*** ./src/core/events.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var LasEvents = {
  MEDIA_INFO: 'mediaInfo',
  PARSING_INIT_SEGMENT: 'parsingInitSegment',
  PARSING_DATA: 'parsingData',
  PARSED_DATA: 'parsedData',
  SCRIPT_PARSED: 'scriptParsed',
  LOAD_END: 'loadEnd',
  DISCONTINUITY: 'discontinuity',
  ERROR: 'lasError',
  LEVEL_SWITCH_FAILED: 'levelSwitchFailed',
  LEVEL_SWITCHING: 'levelSwitching',
  LEVEL_SWITCHED: 'levelSwitched',
  MANIFEST_PARSED: 'manifestParsed',
  BUFFER_FLUSHING: 'bufferFlushing',
  INIT_PTS_FOUND: 'initPTSFound',
  FLV_HEAD: 'flvHead',
  REPORT: 'report',
  HEARTBEAT: 'heartbeat'
};
/* harmony default export */ __webpack_exports__["default"] = (LasEvents);

/***/ }),

/***/ "./src/core/observer.ts":
/*!******************************!*\
  !*** ./src/core/observer.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



var Observer =
/*#__PURE__*/
function (_EventEmitter) {
  _inheritsLoose(Observer, _EventEmitter);

  function Observer() {
    return _EventEmitter.apply(this, arguments) || this;
  }

  var _proto = Observer.prototype;

  _proto.trigger = function trigger(event) {
    var _EventEmitter$prototy;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_EventEmitter$prototy = _EventEmitter.prototype.emit).call.apply(_EventEmitter$prototy, [this, event, event].concat(args));
  };

  return Observer;
}(events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]);

/* harmony default export */ __webpack_exports__["default"] = (Observer);

/***/ }),

/***/ "./src/demux/flv/flv-demuxer-inline.ts":
/*!**********************************************************!*\
  !*** ./src/demux/flv/flv-demuxer-inline.ts + 13 modules ***!
  \**********************************************************/
/*! exports provided: default */
/*! ModuleConcatenation bailout: Cannot concat with ./src/core/errors.ts because of ./src/index.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/core/events.ts because of ./src/index.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/demux/flv/flv.ts because of ./src/index.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/polyfills/object-assign.js because of ./src/index.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/utils/browser.ts because of ./src/index.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/utils/log.ts because of ./src/index.ts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/core/events.ts
var events = __webpack_require__("./src/core/events.ts");

// CONCATENATED MODULE: ./src/polyfills/number-isFinite.js
var isFiniteNumber = Number.isFinite || function (value) {
  return typeof value === 'number' && isFinite(value);
};
// EXTERNAL MODULE: ./src/polyfills/object-assign.js
var object_assign = __webpack_require__("./src/polyfills/object-assign.js");

// EXTERNAL MODULE: ./src/core/errors.ts
var errors = __webpack_require__("./src/core/errors.ts");

// EXTERNAL MODULE: ./src/utils/browser.ts
var browser = __webpack_require__("./src/utils/browser.ts");

// EXTERNAL MODULE: ./src/utils/log.ts
var log = __webpack_require__("./src/utils/log.ts");

// CONCATENATED MODULE: ./src/remux/aac-helper.ts
/**
 *  AAC helper
 */
var AAC =
/*#__PURE__*/
function () {
  function AAC() {}

  AAC.getSilentFrame = function getSilentFrame(codec, channelCount) {
    switch (codec) {
      case 'mp4a.40.2':
        if (channelCount === 1) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80]);
        } else if (channelCount === 2) {
          return new Uint8Array([0x21, 0x00, 0x49, 0x90, 0x02, 0x19, 0x00, 0x23, 0x80]);
        } else if (channelCount === 3) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x8e]);
        } else if (channelCount === 4) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x80, 0x2c, 0x80, 0x08, 0x02, 0x38]);
        } else if (channelCount === 5) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x38]);
        } else if (channelCount === 6) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x00, 0xb2, 0x00, 0x20, 0x08, 0xe0]);
        }

        break;
      // handle HE-AAC below (mp4a.40.5 / mp4a.40.29)

      default:
        if (channelCount === 1) {
          /* ffmpeg -y -f lavfi -i "aevalsrc=0:d=0.05" -c:a libfdk_aac -profile:a aac_he -b:a
          4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
          */
          return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x4e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x1c, 0x6, 0xf1, 0xc1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
        } else if (channelCount === 2) {
          /* ffmpeg -y -f lavfi -i "aevalsrc=0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a
              4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
          */
          return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
        } else if (channelCount === 3) {
          /* ffmpeg -y -f lavfi -i "aevalsrc=0|0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a
              4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
           */
          return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
        }

        break;
    }

    return null;
  };

  return AAC;
}();

/* harmony default export */ var aac_helper = (AAC);
// CONCATENATED MODULE: ./src/types/remux.ts
var TrackType;

(function (TrackType) {
  TrackType["video"] = "video";
  TrackType["audio"] = "audio";
})(TrackType || (TrackType = {}));

var RemuxerTrackIdConfig;

(function (RemuxerTrackIdConfig) {
  RemuxerTrackIdConfig[RemuxerTrackIdConfig["video"] = 1] = "video";
  RemuxerTrackIdConfig[RemuxerTrackIdConfig["audio"] = 2] = "audio";
})(RemuxerTrackIdConfig || (RemuxerTrackIdConfig = {}));
// CONCATENATED MODULE: ./src/remux/mp4-generator.ts
/**
 * Generate MP4 Box
 */

var UINT32_MAX = Math.pow(2, 32) - 1;

var mp4_generator_MP4 =
/*#__PURE__*/
function () {
  function MP4() {}

  MP4.init = function init() {
    MP4.types = {
      'avc1': [],
      // codingname
      'avcC': [],
      'btrt': [],
      'dinf': [],
      'dref': [],
      'esds': [],
      'ftyp': [],
      'hdlr': [],
      'mdat': [],
      'mdhd': [],
      'mdia': [],
      'mfhd': [],
      'minf': [],
      'moof': [],
      'moov': [],
      'mp4a': [],
      '.mp3': [],
      'mvex': [],
      'mvhd': [],
      'pasp': [],
      'sdtp': [],
      'stbl': [],
      'stco': [],
      'stsc': [],
      'stsd': [],
      'stsz': [],
      'stts': [],
      'tfdt': [],
      'tfhd': [],
      'traf': [],
      'trak': [],
      'trun': [],
      'trex': [],
      'tkhd': [],
      'vmhd': [],
      'smhd': [],
      'hev1': [],
      'hvcC': []
    };
    var i;

    for (i in MP4.types) {
      if (MP4.types.hasOwnProperty(i)) {
        MP4.types[i] = [i.charCodeAt(0), i.charCodeAt(1), i.charCodeAt(2), i.charCodeAt(3)];
      }
    }

    var videoHdlr = new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // pre_defined
    0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
    ]);
    var audioHdlr = new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // pre_defined
    0x73, 0x6f, 0x75, 0x6e, // handler_type: 'soun'
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'SoundHandler'
    ]);
    MP4.HDLR_TYPES = {
      video: videoHdlr,
      audio: audioHdlr
    };
    var dref = new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x01, // entry_count
    0x00, 0x00, 0x00, 0x0c, // entry_size
    0x75, 0x72, 0x6c, 0x20, // 'url' type
    0x00, // version 0
    0x00, 0x00, 0x01 // entry_flags
    ]);
    var stco = new Uint8Array([0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00 // entry_count
    ]);
    MP4.STTS = MP4.STSC = MP4.STCO = stco;
    MP4.STSZ = new Uint8Array([0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // sample_size
    0x00, 0x00, 0x00, 0x00 // sample_count
    ]);
    MP4.VMHD = new Uint8Array([0x00, // version
    0x00, 0x00, 0x01, // flags
    0x00, 0x00, // graphicsmode
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // opcolor
    ]);
    MP4.SMHD = new Uint8Array([0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, // balance
    0x00, 0x00 // reserved
    ]);
    MP4.STSD = new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x01]); // entry_count

    var majorBrand = new Uint8Array([105, 115, 111, 109]); // isom

    var avc1Brand = new Uint8Array([97, 118, 99, 49]); // avc1

    var hev1Brand = new Uint8Array([104, 101, 118, 49]); // hev1

    var minorVersion = new Uint8Array([0, 0, 0, 1]);
    MP4.FTYP_AVC = MP4.box(MP4.types.ftyp, majorBrand, minorVersion, majorBrand, avc1Brand);
    MP4.FTYP_HEVC = MP4.box(MP4.types.ftyp, majorBrand, minorVersion, majorBrand, hev1Brand);
    MP4.DINF = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, dref));
  };

  MP4.box = function box(type) {
    for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      payload[_key - 1] = arguments[_key];
    }

    var size = 8,
        i = payload.length,
        len = i,
        result; // calculate the total size we need to allocate

    while (i--) {
      size += payload[i].byteLength;
    }

    result = new Uint8Array(size);
    result[0] = size >> 24 & 0xff;
    result[1] = size >> 16 & 0xff;
    result[2] = size >> 8 & 0xff;
    result[3] = size & 0xff;
    result.set(type, 4); // copy the payload into the result

    for (i = 0, size = 8; i < len; i++) {
      // copy payload[i] array @ offset size
      result.set(payload[i], size);
      size += payload[i].byteLength;
    }

    return result;
  };

  MP4.hdlr = function hdlr(type) {
    return MP4.box(MP4.types.hdlr, MP4.HDLR_TYPES[type]);
  };

  MP4.mdat = function mdat(data) {
    return MP4.box(MP4.types.mdat, data);
  };

  MP4.mdhd = function mdhd(timescale, duration) {
    duration *= timescale;
    var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
    var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
    return MP4.box(MP4.types.mdhd, new Uint8Array([0x01, // version 1
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
    timescale >> 24 & 0xff, timescale >> 16 & 0xff, timescale >> 8 & 0xff, timescale & 0xff, // timescale
    upperWordDuration >> 24, upperWordDuration >> 16 & 0xff, upperWordDuration >> 8 & 0xff, upperWordDuration & 0xff, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xff, lowerWordDuration >> 8 & 0xff, lowerWordDuration & 0xff, 0x55, 0xc4, // 'und' language (undetermined)
    0x00, 0x00]));
  };

  MP4.mdia = function mdia(track) {
    return MP4.box(MP4.types.mdia, MP4.mdhd(track.timescale, track.duration), MP4.hdlr(track.type), MP4.minf(track));
  };

  MP4.mfhd = function mfhd(sequenceNumber) {
    return MP4.box(MP4.types.mfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // flags
    sequenceNumber >> 24, sequenceNumber >> 16 & 0xff, sequenceNumber >> 8 & 0xff, sequenceNumber & 0xff // sequence_number
    ]));
  };

  MP4.minf = function minf(track) {
    if (track.type === 'audio') {
      return MP4.box(MP4.types.minf, MP4.box(MP4.types.smhd, MP4.SMHD), MP4.DINF, MP4.stbl(track));
    }

    return MP4.box(MP4.types.minf, MP4.box(MP4.types.vmhd, MP4.VMHD), MP4.DINF, MP4.stbl(track));
  };

  MP4.moof = function moof(sn, baseMediaDecodeTime, track) {
    return MP4.box(MP4.types.moof, MP4.mfhd(sn), MP4.traf(track, baseMediaDecodeTime));
  }
  /**
   * @param tracks... (optional) {array} the tracks associated with this movie
   */
  ;

  MP4.moov = function moov(tracks) {
    var i = tracks.length,
        boxes = [];

    while (i--) {
      boxes[i] = MP4.trak(tracks[i]);
    }

    return MP4.box.apply(MP4, [MP4.types.moov].concat([MP4.mvhd(tracks[0].timescale, tracks[0].duration)].concat(boxes).concat(MP4.mvex(tracks))));
  };

  MP4.mvex = function mvex(tracks) {
    var i = tracks.length;
    var boxes = [];

    while (i--) {
      boxes[i] = MP4.trex(tracks[i]);
    }

    return MP4.box.apply(MP4, [MP4.types.mvex].concat(boxes));
  };

  MP4.mvhd = function mvhd(timescale, duration) {
    duration *= timescale;
    var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
    var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
    var bytes = new Uint8Array([0x01, // version 1
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
    timescale >> 24 & 0xff, timescale >> 16 & 0xff, timescale >> 8 & 0xff, timescale & 0xff, // timescale
    upperWordDuration >> 24, upperWordDuration >> 16 & 0xff, upperWordDuration >> 8 & 0xff, upperWordDuration & 0xff, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xff, lowerWordDuration >> 8 & 0xff, lowerWordDuration & 0xff, 0x00, 0x01, 0x00, 0x00, // 1.0 rate
    0x01, 0x00, // 1.0 volume
    0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
    0xff, 0xff, 0xff, 0xff // next_track_ID
    ]);
    return MP4.box(MP4.types.mvhd, bytes);
  };

  MP4.sdtp = function sdtp(track) {
    var samples = track.samples || [],
        bytes = new Uint8Array(4 + samples.length),
        flags,
        i; // leave the full box header (4 bytes) all zero
    // write the sample table

    for (i = 0; i < samples.length; i++) {
      flags = samples[i].flags;
      bytes[i + 4] = flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
    }

    return MP4.box(MP4.types.sdtp, bytes);
  };

  MP4.stbl = function stbl(track) {
    return MP4.box(MP4.types.stbl, MP4.stsd(track), MP4.box(MP4.types.stts, MP4.STTS), MP4.box(MP4.types.stsc, MP4.STSC), MP4.box(MP4.types.stsz, MP4.STSZ), MP4.box(MP4.types.stco, MP4.STCO));
  };

  MP4.avc1 = function avc1(track) {
    var sps = [],
        pps = [],
        i,
        data,
        len; // assemble the SPSs

    for (i = 0; i < track.sps.length; i++) {
      data = track.sps[i];
      len = data.byteLength;
      sps.push(len >>> 8 & 0xff);
      sps.push(len & 0xff); // SPS

      sps = sps.concat(Array.prototype.slice.call(data));
    } // assemble the PPSs


    for (i = 0; i < track.pps.length; i++) {
      data = track.pps[i];
      len = data.byteLength;
      pps.push(len >>> 8 & 0xff);
      pps.push(len & 0xff);
      pps = pps.concat(Array.prototype.slice.call(data));
    }

    var avcc = MP4.box(MP4.types.avcC, new Uint8Array([0x01, // version
    sps[3], // profile
    sps[4], // profile compat
    sps[5], // level
    0xfc | 3, // lengthSizeMinusOne, hard-coded to 4 bytes
    0xe0 | track.sps.length // 3bit reserved (111) + numOfSequenceParameterSets
    ].concat(sps).concat([track.pps.length // numOfPictureParameterSets
    ]).concat(pps))),
        // "PPS"
    width = track.width,
        height = track.height,
        hSpacing = track.pixelRatio[0],
        vSpacing = track.pixelRatio[1];
    return MP4.box(MP4.types.avc1, new Uint8Array([0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // data_reference_index
    0x00, 0x00, // pre_defined
    0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
    width >> 8 & 0xff, width & 0xff, // width
    height >> 8 & 0xff, height & 0xff, // height
    0x00, 0x48, 0x00, 0x00, // horizresolution
    0x00, 0x48, 0x00, 0x00, // vertresolution
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // frame_count
    0x12, 0x64, 0x61, 0x69, 0x6c, // dailymotion/hls.js
    0x79, 0x6d, 0x6f, 0x74, 0x69, 0x6f, 0x6e, 0x2f, 0x68, 0x6c, 0x73, 0x2e, 0x6a, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // compressorname
    0x00, 0x18, // depth = 24
    0x11, 0x11]), // pre_defined = -1
    avcc, MP4.box(MP4.types.btrt, new Uint8Array([0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
    0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
    0x00, 0x2d, 0xc6, 0xc0])), // avgBitrate
    MP4.box(MP4.types.pasp, new Uint8Array([hSpacing >> 24, // hSpacing
    hSpacing >> 16 & 0xff, hSpacing >> 8 & 0xff, hSpacing & 0xff, vSpacing >> 24, // vSpacing
    vSpacing >> 16 & 0xff, vSpacing >> 8 & 0xff, vSpacing & 0xff])));
  };

  MP4.hev1 = function hev1(track) {
    var hvcc = track.hvcc;
    var width = track.codecWidth,
        height = track.codecHeight;
    var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, // reserved(4)
    0x00, 0x00, 0x00, 0x01, // reserved(2) + data_reference_index(2)
    0x00, 0x00, 0x00, 0x00, // pre_defined(2) + reserved(2)
    0x00, 0x00, 0x00, 0x00, // pre_defined: 3 * 4 bytes
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, width >>> 8 & 0xff, // width: 2 bytes
    width & 0xff, height >>> 8 & 0xff, // height: 2 bytes
    height & 0xff, 0x00, 0x48, 0x00, 0x00, // horizresolution: 4 bytes
    0x00, 0x48, 0x00, 0x00, // vertresolution: 4 bytes
    0x00, 0x00, 0x00, 0x00, // reserved: 4 bytes
    0x00, 0x01, // frame_count
    0x0a, // strlen
    0x78, 0x71, 0x71, 0x2f, // compressorname: 32 bytes
    0x66, 0x6c, 0x76, 0x2e, 0x6a, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, // depth
    0xff, 0xff // pre_defined = -1
    ]);
    return MP4.box(MP4.types.hev1, data, MP4.box(MP4.types.hvcC, hvcc));
  };

  MP4.esds = function esds(track) {
    var configlen = track.config.length;
    return new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x03, // descriptor_type
    0x17 + configlen, // length
    0x00, 0x01, // es_id
    0x00, // stream_priority
    0x04, // descriptor_type
    0x0f + configlen, // length
    0x40, // codec : mpeg4_audio
    0x15, // stream_type
    0x00, 0x00, 0x00, // buffer_size
    0x00, 0x00, 0x00, 0x00, // maxBitrate
    0x00, 0x00, 0x00, 0x00, // avgBitrate
    0x05 // descriptor_type
    ].concat([configlen]).concat(track.config).concat([0x06, 0x01, 0x02])); // GASpecificConfig)); // length + audio config descriptor
  };

  MP4.mp4a = function mp4a(track) {
    var samplerate = track.samplerate;
    return MP4.box(MP4.types.mp4a, new Uint8Array([0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // data_reference_index
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
    0x00, track.channelCount, // channelcount
    0x00, 0x10, // sampleSize:16bits
    0x00, 0x00, 0x00, 0x00, // reserved2
    samplerate >> 8 & 0xff, samplerate & 0xff, //
    0x00, 0x00]), MP4.box(MP4.types.esds, MP4.esds(track)));
  };

  MP4.mp3 = function mp3(track) {
    var samplerate = track.samplerate;
    return MP4.box(MP4.types['.mp3'], new Uint8Array([0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // data_reference_index
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
    0x00, track.channelCount, // channelcount
    0x00, 0x10, // sampleSize:16bits
    0x00, 0x00, 0x00, 0x00, // reserved2
    samplerate >> 8 & 0xff, samplerate & 0xff, //
    0x00, 0x00]));
  };

  MP4.stsd = function stsd(track) {
    if (track.type === TrackType.audio) {
      if (!track.isAAC && track.codec === 'mp3') {
        return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp3(track));
      }

      return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp4a(track));
    }

    if (track.codec.indexOf('hev1') === 0) {
      return MP4.box(MP4.types.stsd, MP4.STSD, MP4.hev1(track));
    }

    return MP4.box(MP4.types.stsd, MP4.STSD, MP4.avc1(track));
  };

  MP4.tkhd = function tkhd(track) {
    var id = track.id,
        duration = track.duration * track.timescale,
        upperWordDuration = Math.floor(duration / (UINT32_MAX + 1)),
        lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
    var width = 0,
        height = 0;

    if (track.hasOwnProperty('width')) {
      width = track.width;
    }

    if (track.hasOwnProperty('height')) {
      height = track.height;
    }

    return MP4.box(MP4.types.tkhd, new Uint8Array([0x01, // version 1
    0x00, 0x00, 0x07, // flags
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
    id >> 24 & 0xff, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff, // track_ID
    0x00, 0x00, 0x00, 0x00, // reserved
    upperWordDuration >> 24, upperWordDuration >> 16 & 0xff, upperWordDuration >> 8 & 0xff, upperWordDuration & 0xff, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xff, lowerWordDuration >> 8 & 0xff, lowerWordDuration & 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, // layer
    0x00, 0x00, // alternate_group
    0x00, 0x00, // non-audio track volume
    0x00, 0x00, // reserved
    0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
    width >> 8 & 0xff, width & 0xff, 0x00, 0x00, // width
    height >> 8 & 0xff, height & 0xff, 0x00, 0x00 // height
    ]));
  };

  MP4.traf = function traf(track, baseMediaDecodeTime) {
    var sampleDependencyTable = MP4.sdtp(track),
        id = track.id,
        upperWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime / (UINT32_MAX + 1)),
        lowerWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime % (UINT32_MAX + 1));
    return MP4.box(MP4.types.traf, MP4.box(MP4.types.tfhd, new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    id >> 24, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff // track_ID
    ])), MP4.box(MP4.types.tfdt, new Uint8Array([0x01, // version 1
    0x00, 0x00, 0x00, // flags
    upperWordBaseMediaDecodeTime >> 24, upperWordBaseMediaDecodeTime >> 16 & 0xff, upperWordBaseMediaDecodeTime >> 8 & 0xff, upperWordBaseMediaDecodeTime & 0xff, lowerWordBaseMediaDecodeTime >> 24, lowerWordBaseMediaDecodeTime >> 16 & 0xff, lowerWordBaseMediaDecodeTime >> 8 & 0xff, lowerWordBaseMediaDecodeTime & 0xff])), MP4.trun(track, sampleDependencyTable.length + 16 // tfhd
    + 20 // tfdt
    + 8 // traf header
    + 16 // mfhd
    + 8 // moof header
    + 8), // mdat header
    sampleDependencyTable);
  }
  /**
   * Generate a track box.
   * @param track {object} a track definition
   * @return {Uint8Array} the track box
   */
  ;

  MP4.trak = function trak(track) {
    // TODO:
    // track.duration = track.duration || 0xffffffff;
    return MP4.box(MP4.types.trak, MP4.tkhd(track), MP4.mdia(track));
  };

  MP4.trex = function trex(track) {
    var id = track.id;
    return MP4.box(MP4.types.trex, new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    id >> 24, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff, // track_ID
    0x00, 0x00, 0x00, 0x01, // default_sample_description_index
    0x00, 0x00, 0x00, 0x00, // default_sample_duration
    0x00, 0x00, 0x00, 0x00, // default_sample_size
    0x00, 0x01, 0x00, 0x01 // default_sample_flags
    ]));
  };

  MP4.trun = function trun(track, offset) {
    var samples = track.samples || [],
        len = samples.length,
        arraylen = 12 + 16 * len,
        array = new Uint8Array(arraylen),
        i,
        sample,
        duration,
        size,
        flags,
        cts;
    offset += 8 + arraylen;
    array.set([0x00, // version 0
    0x00, 0x0f, 0x01, // flags
    len >>> 24 & 0xff, len >>> 16 & 0xff, len >>> 8 & 0xff, len & 0xff, // sample_count
    offset >>> 24 & 0xff, offset >>> 16 & 0xff, offset >>> 8 & 0xff, offset & 0xff // data_offset
    ], 0);

    for (i = 0; i < len; i++) {
      sample = samples[i];
      duration = sample.duration;
      size = sample.size;
      flags = sample.flags;
      cts = sample.cts;
      array.set([duration >>> 24 & 0xff, duration >>> 16 & 0xff, duration >>> 8 & 0xff, duration & 0xff, // sample_duration
      size >>> 24 & 0xff, size >>> 16 & 0xff, size >>> 8 & 0xff, size & 0xff, // sample_size
      flags.isLeading << 2 | flags.dependsOn, flags.isDependedOn << 6 | flags.hasRedundancy << 4 | flags.paddingValue << 1 | flags.isNonSync, flags.degradPrio & 0xf0 << 8, flags.degradPrio & 0x0f, // sample_flags
      cts >>> 24 & 0xff, cts >>> 16 & 0xff, cts >>> 8 & 0xff, cts & 0xff // sample_composition_time_offset
      ], 12 + 16 * i);
    }

    return MP4.box(MP4.types.trun, array);
  };

  MP4.initSegment = function initSegment(tracks) {
    if (!MP4.types) {
      MP4.init();
    }

    var ftyp = MP4.FTYP_AVC;
    var i = tracks.length;

    while (i--) {
      if (tracks[i].type === 'video' && tracks[i].codec.indexOf('hev1') === 0) {
        ftyp = MP4.FTYP_HEVC;
      }
    }

    var movie = MP4.moov(tracks);
    var result = new Uint8Array(ftyp.byteLength + movie.byteLength);
    result.set(ftyp);
    result.set(movie, ftyp.byteLength);
    return result;
  };

  return MP4;
}();

mp4_generator_MP4.types = void 0;
mp4_generator_MP4.HDLR_TYPES = void 0;
mp4_generator_MP4.STTS = void 0;
mp4_generator_MP4.STSC = void 0;
mp4_generator_MP4.STCO = void 0;
mp4_generator_MP4.STSZ = void 0;
mp4_generator_MP4.VMHD = void 0;
mp4_generator_MP4.SMHD = void 0;
mp4_generator_MP4.STSD = void 0;
mp4_generator_MP4.FTYP_AVC = void 0;
mp4_generator_MP4.FTYP_HEVC = void 0;
mp4_generator_MP4.DINF = void 0;
/* harmony default export */ var mp4_generator = (mp4_generator_MP4);
// CONCATENATED MODULE: ./src/remux/mp4-remuxer.ts




function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * fMP4 remuxer
 */





 // 100 seconds

var MAX_SILENT_FRAME_DURATION = 100 * 1000;

var mp4_remuxer_MP4Remuxer =
/*#__PURE__*/
function () {
  function MP4Remuxer(observer, config, typeSupported, vendor) {
    if (vendor === void 0) {
      vendor = '';
    }

    this._observer = void 0;
    this._config = void 0;
    this._typeSupported = void 0;
    this._isSafari = void 0;
    this._forceFirstIDR = void 0;
    this._stash = void 0;
    this._stashInfo = void 0;
    this._stashLastVideoSample = void 0;
    this._ISGenerated = false;
    this._videoTime = void 0;
    this._extra = void 0;
    this._nextAudioPts = void 0;
    this._nextAvcDts = void 0;
    this._initPTS = void 0;
    this._initDTS = void 0;
    this._initSegment = {};
    this._observer = observer;
    this._config = config;
    this._typeSupported = typeSupported;
    var userAgent = navigator.userAgent;
    this._isSafari = !!(vendor && vendor.indexOf('Apple') > -1 && userAgent && !userAgent.match('CriOS'));
    this._ISGenerated = false;
    this._stash = !config.gopRemux; // 计算平均sampleDuration

    this._resetVideoTime();

    this._stashInfo = {};

    if (!mp4_generator.types) {
      mp4_generator.init();
    } // Workaround for chrome < 50: Always force first sample as a Random Access Point in media segment
    // see https://bugs.chromium.org/p/chromium/issues/detail?id=229412


    this._forceFirstIDR = browser["default"].chrome && (browser["default"].version.major < 50 || browser["default"].version.major === 50 && browser["default"].version.build < 2661) ? true : false;
  }

  var _proto = MP4Remuxer.prototype;

  _proto.setStat = function setStat(stat) {
    if (stat) {
      this._ISGenerated = stat.ISGenerated;
      this._nextAudioPts = stat.nextAudioPts;
      this._nextAvcDts = stat.nextAvcDts;
      this._initPTS = stat.initPTS;
      this._initDTS = stat.initDTS;
      this._videoTime.nbSamples = stat.videoTime.nbSamples;
      this._videoTime.firstDTS = stat.videoTime.firstDTS;
      this._videoTime.sampleDuration = stat.videoTime.sampleDuration;
      this._videoTime.vLastPTS = stat.videoTime.vLastPTS;
      this._videoTime.aLastPTS = stat.videoTime.aLastPTS;
      this._videoTime.endDts = stat.videoTime.endDts;
    }
  };

  _proto.getStat = function getStat() {
    return {
      ISGenerated: this._ISGenerated,
      nextAudioPts: this._nextAudioPts,
      nextAvcDts: this._nextAvcDts,
      initPTS: this._initPTS,
      initDTS: this._initDTS,
      videoTime: {
        nbSamples: this._videoTime.nbSamples,
        firstDTS: this._videoTime.firstDTS,
        sampleDuration: this._videoTime.sampleDuration,
        vLastPTS: this._videoTime.vLastPTS,
        aLastPTS: this._videoTime.aLastPTS,
        endDts: this._videoTime.endDts
      }
    };
  };

  _proto.destroy = function destroy() {};

  _proto.setExtra = function setExtra(data) {
    this._extra = data;
  };

  _proto.resetTimeStamp = function resetTimeStamp(defaultTimeStamp) {
    this._initPTS = this._initDTS = defaultTimeStamp;

    this._resetVideoTime();
  };

  _proto.resetInitSegment = function resetInitSegment() {
    this._ISGenerated = false;
    this._initSegment = {};
    this.resetStash();
  };

  _proto.getLastPTS = function getLastPTS() {
    return {
      video: this._videoTime.vLastPTS,
      audio: this._videoTime.aLastPTS
    };
  };

  _proto.flush = function flush(audioTrackLength) {
    if (audioTrackLength === void 0) {
      audioTrackLength = 0;
    }

    var videoData = null;

    if (this._stash && this._stashLastVideoSample) {
      var info = this._stashInfo;
      info.track.samples = [this._stashLastVideoSample];
      this._stashLastVideoSample = null;
      info.sequenceNumber += 1;
      videoData = this.remuxVideo(info.track, info.timeOffset, true, audioTrackLength, info.accurateTimeOffset);
    }

    this.resetStash();
    return videoData;
  };

  _proto.resetStash = function resetStash() {
    this._stashLastVideoSample = null;
    this._stashInfo = {};
  };

  _proto.remux = function remux(audioTrack, videoTrack, timeOffset, contiguous, accurateTimeOffset, isFlush) {
    if (isFlush === void 0) {
      isFlush = false;
    }

    // generate Init Segment if needed
    if (!this._ISGenerated) {
      this.generateIS(audioTrack, videoTrack, timeOffset);
    } // 兼容safari


    if (!contiguous && videoTrack.samples.length) {
      videoTrack.samples[0].pts = videoTrack.samples[0].dts;
    }

    if (this._ISGenerated) {
      var nbVideoStashSamples = isFlush && this._stashLastVideoSample ? 1 : 0;
      var nbAudioSamples = audioTrack.samples.length;
      var nbVideoSamples = videoTrack.samples.length;
      var audioTimeOffset = timeOffset;
      var videoTimeOffset = timeOffset;

      if (nbAudioSamples && nbVideoSamples) {
        if (!contiguous && accurateTimeOffset) {
          // 利用首个视频帧填充视频帧，accurateTimeOffset=true会根据timeoffset填充音频帧
          if (audioTrack.samples[0].pts - videoTrack.samples[0].pts < 0) {
            var sample = Object(object_assign["ObjectAssign"])({}, videoTrack.samples[0]);

            sample.dts = sample.pts = audioTrack.samples[0].pts;
            videoTrack.samples.unshift(sample);
          }
        } else {
          // timeOffset is expected to be the offset of the first timestamp of this fragment (first DTS)
          // if first audio DTS is not aligned with first video DTS then we need to take that into account
          // when providing timeOffset to remuxAudio / remuxVideo.
          // if we don't do that, there might be a permanent / small drift between audio and video streams
          var audiovideoDeltaDts = (audioTrack.samples[0].pts - videoTrack.samples[0].pts) / videoTrack.inputTimeScale;
          audioTimeOffset += Math.max(0, audiovideoDeltaDts);
          videoTimeOffset += Math.max(0, -audiovideoDeltaDts);
        }
      } // Purposefully remuxing audio before video, so that remuxVideo can use nextAudioPts, which is
      // calculated in remuxAudio.
      // Log.v('nb AAC samples:' + audioTrack.samples.length);


      if (nbAudioSamples) {
        // if initSegment was generated without video samples, regenerate it again
        if (!audioTrack.timescale) {
          log["Log"].w('regenerate InitSegment as audio detected');
          this.generateIS(audioTrack, videoTrack, timeOffset);
        }

        var audioData = this.remuxAudio(audioTrack, audioTimeOffset, contiguous, accurateTimeOffset); // Log.v('nb AVC samples:' + videoTrack.samples.length);

        var audioTrackLength;

        if (audioData) {
          audioTrackLength = audioData.endPTS - audioData.startPTS;
        }

        if (nbVideoSamples) {
          // if initSegment was generated without video samples, regenerate it again
          if (!videoTrack.timescale) {
            log["Log"].w('regenerate InitSegment as video detected');
            this.generateIS(audioTrack, videoTrack, timeOffset);
          }

          this.remuxVideo(videoTrack, videoTimeOffset, contiguous, audioTrackLength, accurateTimeOffset, isFlush);
        } else {
          this.flush(audioTrackLength);
        }
      } else {
        // Log.v('nb AVC samples:' + videoTrack.samples.length);
        var videoData = null;

        if (nbVideoSamples) {
          videoData = this.remuxVideo(videoTrack, videoTimeOffset, contiguous, 0, accurateTimeOffset, isFlush);
        } else if (nbVideoStashSamples) {
          videoData = this.flush();
        }

        if (videoData && audioTrack.codec && isFiniteNumber(videoData.startDTS) && isFiniteNumber(videoData.endDTS)) {
          this.remuxEmptyAudio(audioTrack, audioTimeOffset, contiguous, videoData);
        }
      }
    }
  };

  _proto.generateIS = function generateIS(audioTrack, videoTrack, timeOffset) {
    var observer = this._observer,
        audioSamples = audioTrack.samples,
        videoSamples = videoTrack.samples,
        typeSupported = this._typeSupported,
        tracks = {},
        data = {
      tracks: tracks
    },
        computePTSDTS = typeof this._initPTS === 'undefined';
    var container = 'audio/mp4',
        initPTS,
        initDTS;

    if (computePTSDTS) {
      initPTS = initDTS = Infinity;
    }

    if (audioTrack.config && audioSamples.length) {
      // let's use audio sampling rate as MP4 time scale.
      // rationale is that there is a integer nb of audio frames per audio sample (1024 for AAC)
      // using audio sampling rate here helps having an integer MP4 frame duration
      // this avoids potential rounding issue and AV sync issue
      audioTrack.timescale = audioTrack.samplerate;
      log["Log"].v("audio sampling rate : " + audioTrack.samplerate);

      if (!audioTrack.isAAC) {
        if (typeSupported.mpeg) {
          // Chrome and Safari
          container = 'audio/mpeg';
          audioTrack.codec = '';
        } else if (typeSupported.mp3) {
          // Firefox
          audioTrack.codec = 'mp3';
        }
      }

      this._initSegment.audio = !audioTrack.isAAC && typeSupported.mpeg ? new Uint8Array() : mp4_generator.initSegment([audioTrack]);
      tracks.audio = {
        container: container,
        codec: audioTrack.codec,
        metadata: {
          channelCount: audioTrack.channelCount,
          audioSampleRate: audioTrack.samplerate
        }
      };

      if (computePTSDTS) {
        // remember first PTS of this demuxing context. for audio, PTS = DTS
        initPTS = initDTS = audioSamples[0].pts - audioTrack.inputTimeScale * timeOffset;
      }
    }

    if (videoTrack.sps && videoTrack.pps && videoSamples.length) {
      // let's use input time scale as MP4 video timescale
      // we use input time scale straight away to avoid rounding issues on frame duration / cts computation
      var inputTimeScale = videoTrack.inputTimeScale;
      videoTrack.timescale = inputTimeScale;
      this._initSegment.video = mp4_generator.initSegment([videoTrack]);
      tracks.video = {
        container: 'video/mp4',
        codec: videoTrack.codec,
        metadata: {
          width: videoTrack.width,
          height: videoTrack.height,
          fps: videoTrack.fps,
          profile: videoTrack.profile,
          level: videoTrack.level,
          chromaFormat: videoTrack.chromaFormat
        }
      };

      if (computePTSDTS) {
        initPTS = Math.min(initPTS ? initPTS : Infinity, videoSamples[0].pts - inputTimeScale * timeOffset);
        initDTS = Math.min(initDTS ? initDTS : Infinity, videoSamples[0].dts - inputTimeScale * timeOffset);

        this._observer.trigger(events["default"].INIT_PTS_FOUND, {
          initPTS: initPTS
        });
      }
    }

    if (Object.keys(tracks).length) {
      observer.trigger(events["default"].PARSING_INIT_SEGMENT, data);
      this._ISGenerated = true;

      if (computePTSDTS) {
        this._initPTS = initPTS;
        this._initDTS = initDTS;
      }
    } else {
      observer.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MUX_ERROR,
        details: errors["ErrorDetails"].PARSING_ERROR,
        fatal: false,
        reason: 'no audio/video samples found'
      });
    }
  };

  _proto.remuxVideo = function remuxVideo(track, timeOffset, contiguous, audioTrackLength, accurateTimeOffset, isFlush) {
    if (accurateTimeOffset === void 0) {
      accurateTimeOffset = false;
    }

    if (isFlush === void 0) {
      isFlush = false;
    }

    var timeScale = track.timescale,
        inputSamples = track.samples,
        outputSamples = [],
        ptsNormalize = this._PTSNormalize,
        initPTS = this._initPTS,
        streamDTS = inputSamples[0].streamDTS / 1000,
        key = inputSamples[0].key,
        time = this._videoTime;
    var offset = 8,
        mp4SampleDuration = 0,
        mdat,
        moof = null,
        firstPTS = 0,
        firstDTS = 0,
        lastPTS = 0,
        lastDTS = 0,
        nbSamples = inputSamples.length;

    if (typeof initPTS === 'undefined') {
      return;
    } // for (let i = 0; i < track.samples.length; i++) {
    //   let avcSample = track.samples[i];
    //   let units = avcSample.units;
    //   let unitsString = '';
    //   for (let j = 0; j < units.length ; j++) {
    //     unitsString += units[j].type + ',';
    //     if (units[j].data.length < 500) {
    //       unitsString += Hex.hexDump(units[j].data);
    //     }
    //   }
    //   Log.v(avcSample.pts + '/' + avcSample.dts + ',' + unitsString + avcSample.units.length);
    // }
    // if parsed fragment is contiguous with last one, let's use last DTS value as reference


    var nextAvcDts = this._nextAvcDts;
    var isSafari = this._isSafari;

    if (nbSamples === 0 || track.timescale === 0) {
      return null;
    } // Safari does not like overlapping DTS on consecutive fragments.
    // let's use nextAvcDts to overcome this if fragments are consecutive


    if (isSafari) {
      // also consider consecutive fragments as being contiguous (even if a level switch occurs),
      // for sake of clarity:
      // consecutive fragments are frags with
      //  - less than 100ms gaps between new time offset (if accurate) and next expected PTS OR
      //  - less than 200 ms PTS gaps (timeScale/5)
      contiguous = contiguous || !!(inputSamples.length && nextAvcDts && (accurateTimeOffset && Math.abs(timeOffset - nextAvcDts / timeScale) < 0.1 || Math.abs(inputSamples[0].pts - nextAvcDts - initPTS) < timeScale / 5));
    }

    if (!contiguous) {
      // if not contiguous, let's use target timeOffset
      nextAvcDts = timeOffset * timeScale;

      this._resetVideoTime();
    }

    if (typeof nextAvcDts === 'undefined') {
      return;
    } // PTS is coded on 33bits, and can loop from -2^32 to 2^32
    // ptsNormalize will make PTS/DTS value monotonic, we use last known DTS value as reference value


    inputSamples.forEach(function (sample) {
      sample.pts = ptsNormalize(sample.pts - initPTS, nextAvcDts);
      sample.dts = ptsNormalize(sample.dts - initPTS, nextAvcDts);
    }); // sort video samples by DTS then PTS then demux id order

    inputSamples.sort(function (a, b) {
      var deltadts = a.dts - b.dts;
      var deltapts = a.pts - b.pts;
      return deltadts || deltapts || a.id - b.id;
    }); // handle broken streams with PTS < DTS, tolerance up 200ms (18000 in 90kHz timescale)

    var PTSDTSshift = inputSamples.reduce(function (prev, curr) {
      return Math.max(Math.min(prev, curr.pts - curr.dts), -18000);
    }, 0);

    if (PTSDTSshift < 0) {
      log["Log"].w("PTS < DTS detected in video samples, shifting DTS by " + Math.round(PTSDTSshift / 90) + " ms to overcome this issue");

      for (var i = 0; i < inputSamples.length; i++) {
        inputSamples[i].dts += PTSDTSshift;
      }
    } // 删除最后一个sample并缓存，用于计算remux最后一个sampleDuration


    if (this._stash) {
      this._stashInfo.timeOffset = timeOffset;
      this._stashInfo.accurateTimeOffset = accurateTimeOffset;
      this._stashInfo.track = track;

      if (this._stashLastVideoSample) {
        nbSamples++;
        inputSamples.unshift(this._stashLastVideoSample);
        this._stashLastVideoSample = null;
      }

      if (inputSamples.length > 1 && !isFlush) {
        this._stashLastVideoSample = inputSamples.pop();
        nbSamples--;
      }
    } // compute first DTS and last DTS, normalize them against reference value


    var sample = inputSamples[0];
    firstDTS = Math.max(sample.dts, 0);
    firstPTS = Math.max(sample.pts, 0); // check timestamp continuity accross consecutive fragments (this is to remove inter-fragment gap/hole)

    var delta = Math.round((firstDTS - nextAvcDts) / 90); // if fragment are contiguous, detect hole/overlapping between fragments

    if (contiguous) {
      if (delta) {
        if (delta > 1) {
          log["Log"].v("AVC:" + delta + " ms hole between fragments detected,filling it");
        } else if (delta < -1) {
          log["Log"].v("AVC:" + -delta + " ms overlapping between fragments detected");
        }

        firstPTS = Math.max(firstPTS - (firstDTS - nextAvcDts), nextAvcDts); // remove hole/gap : set DTS to next expected DTS

        firstDTS = nextAvcDts;
        inputSamples[0].dts = firstDTS; // offset PTS as well, ensure that PTS is smaller or equal than new DTS

        inputSamples[0].pts = firstPTS;
        log["Log"].v("Video/PTS/DTS adjusted: " + Math.round(firstPTS / 90) + "/" + Math.round(firstDTS / 90) + ",delta:" + delta + " ms");
      }
    } // compute lastPTS/lastDTS


    sample = inputSamples[inputSamples.length - 1];
    lastDTS = Math.max(sample.dts, 0);
    lastPTS = Math.max(sample.pts, 0, lastDTS); // on Safari let's signal the same sample duration for all samples
    // sample duration (as expected by trun MP4 boxes), should be the delta between sample DTS
    // set this constant duration as being the avg delta between consecutive DTS.

    if (isSafari) {
      mp4SampleDuration = Math.round((lastDTS - firstDTS) / (inputSamples.length - 1));
    }

    var nbNalu = 0,
        naluLen = 0;

    for (var _i = 0; _i < nbSamples; _i++) {
      // compute total/avc sample length and nb of NAL units
      var _sample = inputSamples[_i],
          units = _sample.units,
          nbUnits = units.length;
      var sampleLen = 0;

      for (var j = 0; j < nbUnits; j++) {
        sampleLen += units[j].data.length;
      }

      naluLen += sampleLen;
      nbNalu += nbUnits;
      _sample.length = sampleLen; // normalize PTS/DTS

      if (isSafari) {
        // sample DTS is computed using a constant decoding offset (mp4SampleDuration) between samples
        _sample.dts = firstDTS + _i * mp4SampleDuration;
      } else {
        // ensure sample monotonic DTS
        _sample.dts = Math.max(_sample.dts, firstDTS);
      } // ensure that computed value is greater or equal than sample DTS


      _sample.pts = Math.max(_sample.pts, _sample.dts);
    }
    /* concatenate the video data and construct the mdat in place
    (need 8 more bytes to fill length and mpdat type) */


    var mdatSize = naluLen + 4 * nbNalu + 8;

    try {
      mdat = new Uint8Array(mdatSize);
    } catch (err) {
      this._observer.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MUX_ERROR,
        details: errors["ErrorDetails"].REMUX_ALLOC_ERROR,
        fatal: false,
        bytes: mdatSize,
        reason: "fail allocating video mdat " + mdatSize
      });

      return null;
    }

    var view = new DataView(mdat.buffer);
    view.setUint32(0, mdatSize);
    mdat.set(mp4_generator.types.mdat, 4);

    for (var _i2 = 0; _i2 < nbSamples; _i2++) {
      var avcSample = inputSamples[_i2],
          avcSampleUnits = avcSample.units;
      var mp4SampleLength = 0,
          compositionTimeOffset = void 0; // convert NALU bitstream to MP4 format (prepend NALU with size field)

      for (var _j = 0, _nbUnits = avcSampleUnits.length; _j < _nbUnits; _j++) {
        var unit = avcSampleUnits[_j],
            unitData = unit.data,
            unitDataLen = unit.data.byteLength;
        view.setUint32(offset, unitDataLen);
        offset += 4;
        mdat.set(unitData, offset);
        offset += unitDataLen;
        mp4SampleLength += 4 + unitDataLen;
      }

      if (!isSafari) {
        // expected sample duration is the Decoding Timestamp diff of consecutive samples
        if (_i2 < nbSamples - 1) {
          mp4SampleDuration = inputSamples[_i2 + 1].dts - avcSample.dts;
        } else {
          var config = this._config;
          var lastFrameDuration = 0;

          if (this._stashLastVideoSample) {
            lastFrameDuration = this._stashLastVideoSample.dts - avcSample.dts;
          } else {
            lastFrameDuration = track.refSampleDuration || time.sampleDuration || avcSample.dts - inputSamples[_i2 > 0 ? _i2 - 1 : _i2].dts;
          }

          lastFrameDuration = Math.floor(lastFrameDuration / 90) * 90;

          if (config.stretchShortVideoTrack && this._nextAudioPts) {
            // In some cases, a segment's audio track duration may exceed the video track duration.
            // Since we've already remuxed audio, and we know how long the audio track is, we look to
            // see if the delta to the next segment is longer than maxBufferHole.
            // If so, playback would potentially get stuck, so we artificially inflate
            // the duration of the last frame to minimize any potential gap between segments.
            var maxBufferHole = config.maxBufferHole,
                gapTolerance = Math.floor(maxBufferHole * timeScale),
                deltaToFrameEnd = (audioTrackLength ? firstPTS + audioTrackLength * timeScale : this._nextAudioPts) - avcSample.pts;

            if (deltaToFrameEnd > gapTolerance) {
              // We subtract lastFrameDuration from deltaToFrameEnd to try to prevent any video
              // frame overlap. maxBufferHole should be >> lastFrameDuration anyway.
              mp4SampleDuration = deltaToFrameEnd - lastFrameDuration;

              if (mp4SampleDuration < 0) {
                mp4SampleDuration = lastFrameDuration;
              }

              log["Log"].v("It is approximately " + deltaToFrameEnd / 90 + " ms to the next segment; using duration " + mp4SampleDuration / 90 + " ms for the last video frame.");
            } else {
              mp4SampleDuration = lastFrameDuration;
            }
          } else {
            mp4SampleDuration = lastFrameDuration;
          }
        }

        compositionTimeOffset = Math.round(avcSample.pts - avcSample.dts);
      } else {
        compositionTimeOffset = Math.max(0, mp4SampleDuration * Math.round((avcSample.pts - avcSample.dts) / mp4SampleDuration));
      } // 无法根据多个sample计算mp4SampleDuration时，利用fps和平均duration计算当前duration


      if (mp4SampleDuration < 0 || isNaN(mp4SampleDuration)) {
        var fix = 0;

        if (contiguous && inputSamples.length < 2) {
          fix = delta * 90;
        }

        mp4SampleDuration = Math.max((track.refSampleDuration || time.sampleDuration) - fix, 90);
      } // console.log('mp4SampleDuration', mp4SampleDuration);


      outputSamples.push({
        size: mp4SampleLength,
        // constant duration
        duration: mp4SampleDuration,
        cts: compositionTimeOffset,
        flags: {
          isLeading: 0,
          isDependedOn: 0,
          hasRedundancy: 0,
          degradPrio: 0,
          dependsOn: avcSample.key ? 2 : 1,
          isNonSync: avcSample.key ? 0 : 1
        }
      });
    } // next AVC sample DTS should be equal to last sample DTS + last sample duration (in PES timescale)


    this._nextAvcDts = lastDTS + mp4SampleDuration;
    var dropped = track.dropped;
    track.dropped = 0;

    if (outputSamples.length && this._forceFirstIDR) {
      var flags = outputSamples[0].flags; // chrome workaround, mark first sample as being a Random Access Point to avoid sourcebuffer append issue
      // https://code.google.com/p/chromium/issues/detail?id=229412

      flags.dependsOn = 2;
      flags.isNonSync = 0;
    }

    track.samples = outputSamples;
    moof = mp4_generator.moof(track.sequenceNumber++, firstDTS, track);
    track.samples = [];
    var data = {
      payload: this._mergeBoxes('video', moof, mdat),
      startPTS: firstPTS / timeScale,
      endPTS: (lastPTS + mp4SampleDuration) / timeScale,
      startDTS: firstDTS / timeScale,
      endDTS: this._nextAvcDts / timeScale,
      type: 'video',
      hasAudio: false,
      hasVideo: true,
      nb: outputSamples.length,
      dropped: dropped,
      streamDTS: streamDTS,
      key: key,
      extra: this._extra
    };
    this._videoTime.vLastPTS = data.endPTS;

    this._observer.trigger(events["default"].PARSING_DATA, data); // 记录数据计算平均duration


    if (time.nbSamples === 0) {
      time.firstDTS = firstDTS;
    }

    time.nbSamples += nbSamples;
    time.sampleDuration = Math.round((this._nextAvcDts - time.firstDTS) / time.nbSamples);
    time.endDts = this._nextAvcDts;
    return data;
  };

  _proto.remuxAudio = function remuxAudio(track, timeOffset, contiguous, accurateTimeOffset) {
    if (accurateTimeOffset === void 0) {
      accurateTimeOffset = false;
    }

    if (!track.samples.length) {
      return null;
    }

    var inputTimeScale = track.inputTimeScale,
        mp4timeScale = track.timescale,
        scaleFactor = inputTimeScale / mp4timeScale,
        mp4SampleDuration = track.isAAC ? 1024 : 1152,
        inputSampleDuration = mp4SampleDuration * scaleFactor,
        ptsNormalize = this._PTSNormalize,
        initPTS = this._initPTS,
        rawMPEG = !track.isAAC && this._typeSupported.mpeg,
        outputSamples = [],
        streamDTS = track.samples[0].streamDTS / 1000;
    var offset = rawMPEG ? 0 : 8,
        mp4Sample,
        fillFrame,
        mdat,
        moof,
        firstPTS,
        lastPTS,
        inputSamples = track.samples,
        nextAudioPts = this._nextAudioPts,
        resetPts = false;

    if (typeof initPTS === 'undefined') {
      return;
    } // for audio samples, also consider consecutive fragments as being contiguous (even if a level switch occurs),
    // for sake of clarity:
    // consecutive fragments are frags with
    //  - less than 100ms gaps between new time offset (if accurate) and next expected PTS OR
    //  - less than 20 audio frames distance
    // contiguous fragments are consecutive fragments from same quality level (same level, new SN = old SN + 1)
    // this helps ensuring audio continuity and this also avoids audio glitches/cut when switching quality,
    // or reporting wrong duration on first audio frame


    contiguous = contiguous || !!(inputSamples.length && nextAudioPts && (accurateTimeOffset && Math.abs(timeOffset - nextAudioPts / inputTimeScale) < 0.1 || Math.abs(inputSamples[0].pts - nextAudioPts - initPTS) < 20 * inputSampleDuration)); // compute normalized PTS

    inputSamples.forEach(function (sample) {
      sample.pts = sample.dts = ptsNormalize(sample.pts - initPTS, timeOffset * inputTimeScale);
    }); // filter out sample with negative PTS that are not playable anyway
    // if we don't remove these negative samples, they will shift all audio samples forward.
    // leading to audio overlap between current / next fragment

    inputSamples = inputSamples.filter(function (sample) {
      return sample.pts >= 0;
    }); // in case all samples have negative PTS, and have been filtered out, return now

    if (inputSamples.length === 0) {
      return null;
    }

    if (!contiguous || typeof nextAudioPts === 'undefined') {
      if (!accurateTimeOffset) {
        // if frag are mot contiguous and if we cant trust time offset,
        // let's use first sample PTS as next audio PTS
        nextAudioPts = inputSamples[0].pts;
      } else {
        // if timeOffset is accurate, let's use it as predicted next audio PTS
        nextAudioPts = timeOffset * inputTimeScale;
      }

      resetPts = true;
    } // If the audio track is missing samples, the frames seem to get "left-shifted" within the
    // resulting mp4 segment, causing sync issues and leaving gaps at the end of the audio segment.
    // In an effort to prevent this from happening, we inject frames here where there are gaps.
    // When possible, we inject a silent frame; when that's not possible, we duplicate the last
    // frame.


    if (typeof nextAudioPts === 'undefined') {
      return;
    }

    if (track.isAAC) {
      var maxAudioFramesDrift = this._config.maxAudioFramesDrift;

      for (var i = 0, nextPts = nextAudioPts; i < inputSamples.length;) {
        // First, let's see how far off this frame is from where we expect it to be
        var sample = inputSamples[i],
            pts = sample.pts,
            delta = pts - nextPts;
        var duration = Math.abs(1000 * delta / inputTimeScale); // If we're overlapping by more than a duration, drop this sample

        if (delta <= -maxAudioFramesDrift * inputSampleDuration) {
          log["Log"].w("Dropping 1 audio frame @ " + (nextPts / inputTimeScale).toFixed(3) + "s due to " + Math.round(duration) + " ms overlap.");
          inputSamples.splice(i, 1); // Don't touch nextPtsNorm or i
        } // eslint-disable-line brace-style
        // Insert missing frames if:
        // 1: We're more than maxAudioFramesDrift frame away
        // 2: Not more than MAX_SILENT_FRAME_DURATION away
        // 3: currentTime (aka nextPtsNorm) is not 0
        else if (delta >= maxAudioFramesDrift * inputSampleDuration && duration < MAX_SILENT_FRAME_DURATION && nextPts) {
            var missing = Math.round(delta / inputSampleDuration);
            log["Log"].w("Injecting " + missing + " audio frame @ " + (nextPts / inputTimeScale).toFixed(3) + "s due to " + Math.round(1000 * delta / inputTimeScale) + " ms gap.");

            for (var j = 0; j < missing; j++) {
              var newStamp = Math.max(nextPts, 0);
              fillFrame = aac_helper.getSilentFrame(track.manifestCodec || track.codec, track.channelCount);

              if (!fillFrame) {
                log["Log"].v('Unable to get silent frame for given audio codec; duplicating last frame instead.');
                fillFrame = sample.unit.subarray();
              }

              inputSamples.splice(i, 0, {
                unit: fillFrame,
                pts: newStamp,
                dts: newStamp
              });
              nextPts += inputSampleDuration;
              i++;
            } // Adjust sample to next expected pts


            sample.pts = sample.dts = nextPts;
            nextPts += inputSampleDuration;
            i++;
          } else {
            // Otherwise, just adjust pts
            if (Math.abs(delta) > 0.1 * inputSampleDuration) {// Log.v(
              //     `Invalid frame delta ${Math.round(delta + inputSampleDuration)} at PTS ${Math.round(
              //         pts / 90
              //     )} (should be ${Math.round(inputSampleDuration)}).`
              // );
            }

            sample.pts = sample.dts = nextPts;
            nextPts += inputSampleDuration;
            i++;
          }
      }
    } // compute mdat size, as we eventually filtered/added some samples


    var nbSamples = inputSamples.length;
    var mdatSize = 0;

    while (nbSamples--) {
      mdatSize += inputSamples[nbSamples].unit.byteLength;
    }

    for (var _j2 = 0, _nbSamples = inputSamples.length; _j2 < _nbSamples; _j2++) {
      var audioSample = inputSamples[_j2];
      var unit = audioSample.unit;
      var _pts = audioSample.pts; // console.log('audioSample.pts', audioSample);
      // Log.v(`Audio/PTS:${Math.round(pts/90)}`);
      // if not first sample

      if (typeof lastPTS !== 'undefined' && mp4Sample) {
        mp4Sample.duration = Math.round((_pts - lastPTS) / scaleFactor);
      } else {
        var _delta = Math.round(1000 * (_pts - nextAudioPts) / inputTimeScale);

        var numMissingFrames = 0; // if fragment are contiguous, detect hole/overlapping between fragments
        // contiguous fragments are consecutive fragments from same quality level
        // (same level, new SN = old SN + 1)

        if (contiguous && track.isAAC) {
          // log delta
          if (_delta) {
            if (_delta > 0 && _delta < MAX_SILENT_FRAME_DURATION) {
              numMissingFrames = Math.round((_pts - nextAudioPts) / inputSampleDuration);
              log["Log"].v(_delta + " ms hole between AAC samples detected,filling it");

              if (numMissingFrames > 0) {
                fillFrame = aac_helper.getSilentFrame(track.manifestCodec || track.codec, track.channelCount);

                if (!fillFrame) {
                  fillFrame = unit.subarray();
                }

                mdatSize += numMissingFrames * fillFrame.length;
              } // if we have frame overlap, overlapping for more than half a frame duraion

            } else if (_delta < -12) {
              // drop overlapping audio frames... browser will deal with it
              log["Log"].v("drop overlapping AAC sample, expected/parsed/delta:" + (nextAudioPts / inputTimeScale).toFixed(3) + "s/" + (_pts / inputTimeScale).toFixed(3) + "s/" + -_delta + "ms");
              mdatSize -= unit.byteLength;
              continue;
            } // set PTS/DTS to expected PTS/DTS


            _pts = nextAudioPts;
          }
        } // remember first PTS of our audioSamples


        firstPTS = _pts;

        if (mdatSize > 0) {
          mdatSize += offset;

          try {
            mdat = new Uint8Array(mdatSize);
          } catch (err) {
            this._observer.trigger(events["default"].ERROR, {
              type: errors["ErrorTypes"].MUX_ERROR,
              details: errors["ErrorDetails"].REMUX_ALLOC_ERROR,
              fatal: false,
              bytes: mdatSize,
              reason: "fail allocating audio mdat " + mdatSize
            });

            return null;
          }

          if (!rawMPEG) {
            var view = new DataView(mdat.buffer);
            view.setUint32(0, mdatSize);
            mdat.set(mp4_generator.types.mdat, 4);
          }
        } else {
          track.samples = []; // no audio samples

          return null;
        }

        for (var _i3 = 0; _i3 < numMissingFrames; _i3++) {
          fillFrame = aac_helper.getSilentFrame(track.manifestCodec || track.codec, track.channelCount);

          if (!fillFrame) {
            log["Log"].v('Unable to get silent frame for given audio codec; duplicating this frame instead.');
            fillFrame = unit.subarray();
          }

          mdat.set(fillFrame, offset);
          offset += fillFrame.byteLength;
          mp4Sample = {
            size: fillFrame.byteLength,
            cts: 0,
            duration: 1024,
            flags: {
              isLeading: 0,
              isDependedOn: 0,
              hasRedundancy: 0,
              degradPrio: 0,
              dependsOn: 1
            }
          };
          outputSamples.push(mp4Sample);
        }
      }

      if (!mdat) {
        return;
      }

      mdat.set(unit, offset);
      var unitLen = unit.byteLength;
      offset += unitLen; // PTS/DTS/initDTS/normPTS/normDTS/relative PTS

      mp4Sample = {
        size: unitLen,
        cts: 0,
        duration: 0,
        flags: {
          isLeading: 0,
          isDependedOn: 0,
          hasRedundancy: 0,
          degradPrio: 0,
          dependsOn: 1
        }
      };
      outputSamples.push(mp4Sample);
      lastPTS = _pts;
    }

    var lastSampleDuration = 0;
    nbSamples = outputSamples.length;

    if (!mp4Sample) {
      return;
    } // set last sample duration as being identical to previous sample


    if (nbSamples >= 2) {
      lastSampleDuration = outputSamples[nbSamples - 2].duration;
      mp4Sample.duration = lastSampleDuration;
    }

    if (nbSamples && typeof lastPTS === 'number' && mdat) {
      if (mp4Sample && mp4Sample.duration === 0) {
        mp4Sample.duration = track.isAAC ? 1024 : 1152;
      } // next audio sample PTS should be equal to last sample PTS + duration


      this._nextAudioPts = nextAudioPts = lastPTS + scaleFactor * (lastSampleDuration || mp4SampleDuration); // Log.v('Audio/PTS/PTSend:' + audioSample.pts.toFixed(0) + '/' + this.nextAacDts.toFixed(0));

      track.samples = outputSamples;

      if (rawMPEG) {
        moof = new Uint8Array();
      } else {
        moof = mp4_generator.moof(track.sequenceNumber++, firstPTS / scaleFactor, track);
      }

      track.samples = [];
      var start = firstPTS / inputTimeScale;
      var end = nextAudioPts / inputTimeScale;
      var audioData = {
        payload: this._mergeBoxes('audio', moof, mdat),
        startPTS: start,
        endPTS: end,
        startDTS: start,
        endDTS: end,
        type: 'audio',
        hasAudio: true,
        hasVideo: false,
        nb: nbSamples,
        streamDTS: streamDTS,
        extra: this._extra
      };
      this._videoTime.aLastPTS = audioData.endPTS;

      this._observer.trigger(events["default"].PARSING_DATA, audioData);

      return audioData;
    }

    if (resetPts) {
      delete this._nextAudioPts;
    }

    track.samples = [];
    return null;
  };

  _proto.remuxEmptyAudio = function remuxEmptyAudio(track, timeOffset, contiguous, videoData) {
    if (typeof this._initDTS === 'undefined') {
      return;
    }

    var inputTimeScale = track.inputTimeScale,
        mp4timeScale = track.samplerate ? track.samplerate : inputTimeScale,
        scaleFactor = inputTimeScale / mp4timeScale,
        nextAudioPts = this._nextAudioPts,
        // sync with video's timestamp
    startDTS = (typeof nextAudioPts !== 'undefined' ? nextAudioPts : videoData.startDTS * inputTimeScale) + this._initDTS,
        endDTS = videoData.endDTS * inputTimeScale + this._initDTS,
        // one sample's duration value
    sampleDuration = 1024,
        frameDuration = scaleFactor * sampleDuration,
        // samples count of this segment's duration
    nbSamples = Math.ceil((endDTS - startDTS) / frameDuration),
        // silent frame
    silentFrame = aac_helper.getSilentFrame(track.manifestCodec || track.codec, track.channelCount);
    log["Log"].w('remux empty Audio'); // Can't remux if we can't generate a silent frame...

    if (!silentFrame) {
      log["Log"].d('Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!');
      return;
    }

    var samples = [];

    for (var i = 0; i < nbSamples; i++) {
      var stamp = startDTS + i * frameDuration;
      samples.push({
        unit: silentFrame,
        pts: stamp,
        dts: stamp
      });
    }

    track.samples = samples;
    this.remuxAudio(track, timeOffset, contiguous);
  };

  _proto._PTSNormalize = function _PTSNormalize(value, reference) {
    var offset;

    if (typeof reference === 'undefined') {
      return value;
    }

    if (reference < value) {
      // - 2^33
      offset = -8589934592;
    } else {
      // + 2^33
      offset = 8589934592;
    }
    /* PTS is 33bit (from 0 to 2^33 -1)
    if diff between value and reference is bigger than half of the amplitude (2^32) then it means that
    PTS looping occured. fill the gap */


    while (Math.abs(value - reference) > 4294967296) {
      value += offset;
    }

    return value;
  };

  _proto._resetVideoTime = function _resetVideoTime() {
    this._videoTime = {
      nbSamples: 0,
      firstDTS: 0,
      sampleDuration: 3000,
      vLastPTS: 0,
      aLastPTS: 0
    };
  };

  _proto._mergeBoxes = function _mergeBoxes(type) {
    for (var _len = arguments.length, arr = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      arr[_key - 1] = arguments[_key];
    }

    if (this._initSegment[type]) {
      arr.unshift(this._initSegment[type]);
      delete this._initSegment[type];
    }

    var len = arr.reduce(function (prev, cur) {
      if (cur) {
        return prev + cur.byteLength;
      }

      return prev;
    }, 0);
    var result = new Uint8Array(len);
    var index = 0;
    arr.forEach(function (cur) {
      if (cur) {
        result.set(cur, index);
        index += cur.byteLength;
      }
    });
    return result;
  };

  _createClass(MP4Remuxer, [{
    key: "ISGenerated",
    get: function get() {
      return this._ISGenerated;
    }
  }]);

  return MP4Remuxer;
}();

/* harmony default export */ var mp4_remuxer = (mp4_remuxer_MP4Remuxer);
// CONCATENATED MODULE: ./src/demux/get-audio-config.ts



function getAudioConfig(observer, info, audioCodec) {
  if (audioCodec === void 0) {
    audioCodec = '';
  }

  var extensionSampleingIndex,
      // :int
  config,
      objectType = info.objectType,
      sampleingIndex = info.sampleingIndex,
      chanelConfig = info.chanelConfig;
  var userAgent = navigator.userAgent.toLowerCase(),
      manifestCodec = audioCodec,
      sampleingRates = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];

  if (sampleingIndex < 0 || sampleingIndex >= sampleingRates.length) {
    observer.trigger(events["default"].ERROR, {
      type: errors["ErrorTypes"].MUX_ERROR,
      details: errors["ErrorDetails"].PARSING_ERROR,
      fatal: true,
      reason: "invalid sampling index:" + sampleingIndex
    });
    return null;
  }

  if (chanelConfig < 0 || chanelConfig >= 8) {
    observer.trigger(events["default"].ERROR, {
      type: errors["ErrorTypes"].MUX_ERROR,
      details: errors["ErrorDetails"].PARSING_ERROR,
      fatal: true,
      reason: "invalid chanelConfig:" + chanelConfig
    });
    return null;
  }

  log["Log"].v("manifest codec:" + audioCodec + ",data:type:" + objectType + ",sampleingIndex:" + sampleingIndex + "[" + sampleingRates[sampleingIndex] + "Hz],channelConfig:" + chanelConfig); // firefox: freq less than 24kHz = AAC SBR (HE-AAC)

  if (/firefox/i.test(userAgent)) {
    if (sampleingIndex >= 6) {
      objectType = 5;
      config = new Array(4); // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
      // there is a factor 2 between frame sample rate and output sample rate
      // multiply frequency by 2 (see table below, equivalent to substract 3)

      extensionSampleingIndex = sampleingIndex - 3;
    } else {
      objectType = 2;
      config = new Array(2);
      extensionSampleingIndex = sampleingIndex;
    } // Android : always use AAC

  } else if (userAgent.indexOf('android') !== -1) {
    objectType = 2;
    config = new Array(2);
    extensionSampleingIndex = sampleingIndex;
  } else {
    /*  for other browsers (Chrome/Vivaldi/Opera ...)
    always force audio type to be HE-AAC SBR, as some browsers do not
    support audio codec switch properly (like Chrome ...)
    */
    objectType = 5;
    config = new Array(4); // if (manifest codec is HE-AAC or HE-AACv2) OR (manifest codec not specified AND frequency less than 24kHz)

    if (audioCodec && (audioCodec.indexOf('mp4a.40.29') !== -1 || audioCodec.indexOf('mp4a.40.5') !== -1) || !audioCodec && sampleingIndex >= 6) {
      // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
      // there is a factor 2 between frame sample rate and output sample rate
      // multiply frequency by 2 (see table below, equivalent to substract 3)
      extensionSampleingIndex = sampleingIndex - 3;
    } else {
      /* if (manifest codec is AAC) AND (frequency less than 24kHz AND nb channel is 1)
          OR(manifest codec not specified and mono audio)
          Chrome fails to play back with low frequency AAC LC mono when initialized with HE-AAC.
          This is not a problem with stereo.
      */
      if (audioCodec && audioCodec.indexOf('mp4a.40.2') !== -1 && (sampleingIndex >= 6 && chanelConfig === 1 || /vivaldi/i.test(userAgent)) || !audioCodec && chanelConfig === 1) {
        objectType = 2;
        config = new Array(2);
      }

      extensionSampleingIndex = sampleingIndex;
    }
  }
  /* refer to http://wiki.multimedia.cx/index.php?title=MPEG-4_Audio#Audio_Specific_Config
    ISO 14496-3 (AAC).pdf - Table 1.13 — Syntax of AudioSpecificConfig()
  Audio Profile / Audio Object Type
  0: Null
  1: AAC Main
  2: AAC LC (Low Complexity)
  3: AAC SSR (Scalable Sample Rate)
  4: AAC LTP (Long Term Prediction)
  5: SBR (Spectral Band Replication)
  6: AAC Scalable
  sampling freq
  0: 96000 Hz
  1: 88200 Hz
  2: 64000 Hz
  3: 48000 Hz
  4: 44100 Hz
  5: 32000 Hz
  6: 24000 Hz
  7: 22050 Hz
  8: 16000 Hz
  9: 12000 Hz
  10: 11025 Hz
  11: 8000 Hz
  12: 7350 Hz
  13: Reserved
  14: Reserved
  15: frequency is written explictly
  Channel Configurations
  These are the channel configurations:
  0: Defined in AOT Specifc Config
  1: 1 channel: front-center
  2: 2 channels: front-left, front-right
  */
  // audioObjectType = profile => profile, the MPEG-4 Audio Object Type minus 1


  config[0] = objectType << 3; // samplingFrequencyIndex

  config[0] |= (sampleingIndex & 0x0e) >> 1;
  config[1] |= (sampleingIndex & 0x01) << 7; // channelConfiguration

  config[1] |= chanelConfig << 3;

  if (objectType === 5) {
    // extensionSampleingIndex
    config[1] |= (extensionSampleingIndex & 0x0e) >> 1;
    config[2] = (extensionSampleingIndex & 0x01) << 7; // objectType (force to 2, chrome is checking that object type is less than 5 ???
    //    https://chromium.googlesource.com/chromium/src.git/+/master/media/formats/mp4/aac.cc

    config[2] |= 2 << 2;
    config[3] = 0;
  }

  return {
    config: config,
    samplerate: sampleingRates[sampleingIndex],
    channelCount: chanelConfig,
    codec: 'mp4a.40.' + objectType,
    manifestCodec: manifestCodec
  };
}
// CONCATENATED MODULE: ./src/demux/asc.ts

function parseData(data, offset) {
  return {
    objectType: data[offset + 2] >>> 3,
    // 5 bits
    sampleingIndex: (data[offset + 2] & 0x07) << 1 | data[offset + 3] >>> 7,
    // 4 bits
    chanelConfig: (data[offset + 3] & 0x78) >>> 3 // 4 bits

  };
}
function initTrackConfig(track, observer, data, offset, audioCodec) {
  if (audioCodec === void 0) {
    audioCodec = '';
  }

  if (!track.samplerate) {
    var config = getAudioConfig(observer, parseData(data, offset), audioCodec);

    if (config) {
      track.config = config.config;
      track.timescale = track.samplerate = config.samplerate;
      track.channelCount = config.channelCount;
      track.codec = config.codec;
      track.manifestCodec = config.manifestCodec;
      track.isAAC = true;
    }
  }
}
function getFrameDuration(samplerate) {
  return 1024 * 1000 / samplerate;
}
// CONCATENATED MODULE: ./src/demux/exp-golomb.ts
function exp_golomb_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function exp_golomb_createClass(Constructor, protoProps, staticProps) { if (protoProps) exp_golomb_defineProperties(Constructor.prototype, protoProps); if (staticProps) exp_golomb_defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable */
// Exponential-Golomb buffer decoder
var ExpGolomb =
/*#__PURE__*/
function () {
  function ExpGolomb(uint8array) {
    this._buffer = void 0;
    this._buffer_index = void 0;
    this._total_bytes = void 0;
    this._total_bits = void 0;
    this._current_word = void 0;
    this._current_word_bits_left = void 0;
    this._buffer = uint8array;
    this._buffer_index = 0;
    this._total_bytes = uint8array.byteLength;
    this._total_bits = uint8array.byteLength * 8;
    this._current_word = 0;
    this._current_word_bits_left = 0;
  }

  var _proto = ExpGolomb.prototype;

  _proto.destroy = function destroy() {
    this._buffer = null;
  };

  _proto._fillCurrentWord = function _fillCurrentWord() {
    var buffer_bytes_left = this._total_bytes - this._buffer_index;

    if (buffer_bytes_left <= 0 || !this._buffer) {
      throw new Error('ExpGolomb: _fillCurrentWord() but no bytes available');
    }

    var bytes_read = Math.min(4, buffer_bytes_left);
    var word = new Uint8Array(4);
    word.set(this._buffer.subarray(this._buffer_index, this._buffer_index + bytes_read));
    this._current_word = new DataView(word.buffer).getUint32(0, false);
    this._buffer_index += bytes_read;
    this._current_word_bits_left = bytes_read * 8;
  };

  _proto.readBits = function readBits(bits) {
    if (bits > 32) {
      throw new Error('ExpGolomb: readBits() bits exceeded max 32bits!');
    }

    if (bits <= this._current_word_bits_left) {
      var _result = this._current_word >>> 32 - bits;

      this._current_word <<= bits;
      this._current_word_bits_left -= bits;
      return _result;
    }

    var result = this._current_word_bits_left ? this._current_word : 0;
    result = result >>> 32 - this._current_word_bits_left;
    var bits_need_left = bits - this._current_word_bits_left;

    this._fillCurrentWord();

    var bits_read_next = Math.min(bits_need_left, this._current_word_bits_left);
    var result2 = this._current_word >>> 32 - bits_read_next;
    this._current_word <<= bits_read_next;
    this._current_word_bits_left -= bits_read_next;
    result = result << bits_read_next | result2;
    return result;
  };

  _proto.readBool = function readBool() {
    return this.readBits(1) === 1;
  } // ():int
  ;

  _proto.readUByte = function readUByte() {
    return this.readBits(8);
  };

  _proto.readUShort = function readUShort() {
    return this.readBits(16);
  };

  _proto.readUInt = function readUInt() {
    return this.readBits(32);
  };

  _proto.readByte = function readByte() {
    return this.readBits(8);
  };

  _proto._skipLeadingZero = function _skipLeadingZero() {
    var zero_count;

    for (zero_count = 0; zero_count < this._current_word_bits_left; zero_count++) {
      if ((this._current_word & 0x80000000 >>> zero_count) !== 0) {
        this._current_word <<= zero_count;
        this._current_word_bits_left -= zero_count;
        return zero_count;
      }
    }

    this._fillCurrentWord();

    return zero_count + this._skipLeadingZero();
  };

  _proto.readUEG = function readUEG() {
    // unsigned exponential golomb
    var leading_zeros = this._skipLeadingZero();

    return this.readBits(leading_zeros + 1) - 1;
  };

  _proto.readSEG = function readSEG() {
    // signed exponential golomb
    var value = this.readUEG();

    if (value & 0x01) {
      return value + 1 >>> 1;
    } else {
      return -1 * (value >>> 1);
    }
  };

  _proto.readSliceType = function readSliceType() {
    // skip NALu type
    this.readUByte(); // discard first_mb_in_slice

    this.readUEG(); // return slice_type

    return this.readUEG();
  };

  _proto.getBitsLeft = function getBitsLeft() {
    return (this._total_bytes - this._buffer_index) * 8 + this._current_word_bits_left;
  };

  exp_golomb_createClass(ExpGolomb, [{
    key: "bytesAvailable",
    get: function get() {
      return this._total_bytes - this._buffer_index;
    }
  }]);

  return ExpGolomb;
}();

/* harmony default export */ var exp_golomb = (ExpGolomb);
// CONCATENATED MODULE: ./src/demux/sps-parser.ts
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable */

var HEVC_MAX_SPS_COUNT = 16;
var HEVC_MAIN = {
  1: 'Main',
  2: 'Main 10',
  3: 'Main Still Picture',
  4: 'Rext'
};
var HEVC_LEVELS = {
  30: 1,
  60: 2,
  63: 2.1,
  90: 3,
  93: 3.1,
  120: 4,
  123: 4.1,
  150: 5,
  153: 5.1,
  156: 5.2,
  180: 6,
  183: 6.1,
  186: 6.2,
  255: 8.5
};

var sps_parser_SPSParser =
/*#__PURE__*/
function () {
  function SPSParser() {}

  SPSParser._ebsp2rbsp = function _ebsp2rbsp(uint8array) {
    var src = uint8array;
    var src_length = src.byteLength;
    var dst = new Uint8Array(src_length);
    var dst_idx = 0;

    for (var i = 0; i < src_length; i++) {
      if (i >= 2) {
        // Unescape: Skip 0x03 after 00 00
        if (src[i] === 0x03 && src[i - 1] === 0x00 && src[i - 2] === 0x00) {
          continue;
        }
      }

      dst[dst_idx] = src[i];
      dst_idx++;
    }

    return new Uint8Array(dst.buffer, 0, dst_idx);
  };

  SPSParser.parseHEVCSPS = function parseHEVCSPS(uint8array) {
    var rbsp = SPSParser._ebsp2rbsp(uint8array);

    var gb = new exp_golomb(rbsp);
    var ptl = {
      general_ptl: {},
      sub_layer_ptl: {}
    };
    gb.readBits(16);
    gb.readBits(4); // sps_video_parameter_set_id

    var max_sub_layers = gb.readBits(3) + 1; // sps_max_sub_layers_minus1

    gb.readBits(1); // temporalIdNested

    if (!SPSParser._parsePTL(gb, ptl, max_sub_layers)) {
      return null;
    }

    var sps_id = gb.readUEG();

    if (sps_id >= HEVC_MAX_SPS_COUNT) {
      return null;
    }

    var chroma_format_idc = gb.readUEG();

    if (chroma_format_idc == 3) {
      var separate_colour_plane_flag = gb.readBits(1);

      if (separate_colour_plane_flag) {
        chroma_format_idc = 0;
      }
    }

    var width = gb.readUEG();
    var height = gb.readUEG();
    gb.destroy();
    gb = null; // let conformance_window_flag = gb.readBits(1);

    return {
      chroma_format_string: chroma_format_idc === 3 ? '4:4:4' : '4:2:0',
      profile_string: ptl.general_ptl.profile_string,
      level_string: ptl.general_ptl.level_string,
      width: width,
      height: height
    }; // hvcc_parse_ptl end
  };

  SPSParser._parsePTL = function _parsePTL(gb, ptl, max_num_sub_layers) {
    if (!this._decodeProfileTierLevel(gb, ptl.general_ptl) || gb.getBitsLeft() < 8 + 8 * 2 * (max_num_sub_layers - 1 > 0 ? 1 : 0)) {
      return false;
    }

    ptl.general_ptl.level_idc = gb.readBits(8);
    ptl.general_ptl.level_string = this.getHEVCLevelString(ptl.general_ptl.level_idc);
    ptl.sub_layer_profile_present_flag = [];
    ptl.sub_layer_level_present_flag = [];

    for (var i = 0; i < max_num_sub_layers - 1; i++) {
      ptl.sub_layer_profile_present_flag[i] = gb.readBits(1);
      ptl.sub_layer_level_present_flag[i] = gb.readBits(1);
    }

    if (max_num_sub_layers - 1 > 0) {
      for (var _i = max_num_sub_layers - 1; _i < 8; _i++) {
        gb.readBits(2); // reserved_zero_2bits[i]
      }
    }

    for (var _i2 = 0; _i2 < max_num_sub_layers - 1; _i2++) {
      if (ptl.sub_layer_profile_present_flag[_i2] && this._decodeProfileTierLevel(gb, ptl.sub_layer_ptl)) {
        return false;
      }

      if (ptl.sub_layer_level_present_flag[_i2]) {
        if (gb.getBitsLeft() < 8) {
          return false;
        } else ptl.sub_layer_ptl[_i2].level_idc = gb.readBits(8);
      }
    }

    return true;
  };

  SPSParser._decodeProfileTierLevel = function _decodeProfileTierLevel(gb, ptl) {
    if (gb.getBitsLeft() < 2 + 1 + 5 + 32 + 4 + 16 + 16 + 12) {
      return false;
    }

    ptl.profile_space = gb.readBits(2);
    ptl.tier_flag = gb.readBits(1);
    ptl.profile_idc = gb.readBits(5);
    ptl.profile_compatibility_flag = [];

    for (var i = 0; i < 32; i++) {
      ptl.profile_compatibility_flag[i] = gb.readBits(1);
      if (ptl.profile_idc == 0 && i > 0 && ptl.profile_compatibility_flag[i]) ptl.profile_idc = i;
    }

    ptl.progressive_source_flag = gb.readBits(1);
    ptl.interlaced_source_flag = gb.readBits(1);
    ptl.non_packed_constraint_flag = gb.readBits(1);
    ptl.frame_only_constraint_flag = gb.readBits(1);
    gb.readBits(16);
    gb.readBits(16);
    gb.readBits(12);
    ptl.profile_string = this.getHEVCProfileString(ptl.profile_idc);
    return true;
  };

  SPSParser.parseSPS = function parseSPS(uint8array) {
    var rbsp = SPSParser._ebsp2rbsp(uint8array);

    var gb = new exp_golomb(rbsp);
    gb.readByte();
    var profile_idc = gb.readByte(); // profile_idc

    gb.readByte(); // constraint_set_flags[5] + reserved_zero[3]

    var level_idc = gb.readByte(); // level_idc

    gb.readUEG(); // seq_parameter_set_id

    var profile_string = SPSParser.getProfileString(profile_idc);
    var level_string = SPSParser.getLevelString(level_idc);
    var chroma_format_idc = 1;
    var chroma_format = 420;
    var chroma_format_table = [0, 420, 422, 444];
    var bit_depth = 8;

    if (profile_idc === 100 || profile_idc === 110 || profile_idc === 122 || profile_idc === 244 || profile_idc === 44 || profile_idc === 83 || profile_idc === 86 || profile_idc === 118 || profile_idc === 128 || profile_idc === 138 || profile_idc === 144) {
      chroma_format_idc = gb.readUEG();

      if (chroma_format_idc === 3) {
        gb.readBits(1); // separate_colour_plane_flag
      }

      if (chroma_format_idc <= 3) {
        chroma_format = chroma_format_table[chroma_format_idc];
      }

      bit_depth = gb.readUEG() + 8; // bit_depth_luma_minus8

      gb.readUEG(); // bit_depth_chroma_minus8

      gb.readBits(1); // qpprime_y_zero_transform_bypass_flag

      if (gb.readBool()) {
        // seq_scaling_matrix_present_flag
        var scaling_list_count = chroma_format_idc !== 3 ? 8 : 12;

        for (var i = 0; i < scaling_list_count; i++) {
          if (gb.readBool()) {
            // seq_scaling_list_present_flag
            if (i < 6) {
              SPSParser._skipScalingList(gb, 16);
            } else {
              SPSParser._skipScalingList(gb, 64);
            }
          }
        }
      }
    }

    gb.readUEG(); // log2_max_frame_num_minus4

    var pic_order_cnt_type = gb.readUEG();

    if (pic_order_cnt_type === 0) {
      gb.readUEG(); // log2_max_pic_order_cnt_lsb_minus_4
    } else if (pic_order_cnt_type === 1) {
      gb.readBits(1); // delta_pic_order_always_zero_flag

      gb.readSEG(); // offset_for_non_ref_pic

      gb.readSEG(); // offset_for_top_to_bottom_field

      var num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG();

      for (var _i3 = 0; _i3 < num_ref_frames_in_pic_order_cnt_cycle; _i3++) {
        gb.readSEG(); // offset_for_ref_frame
      }
    }

    gb.readUEG(); // max_num_ref_frames

    gb.readBits(1); // gaps_in_frame_num_value_allowed_flag

    var pic_width_in_mbs_minus1 = gb.readUEG();
    var pic_height_in_map_units_minus1 = gb.readUEG();
    var frame_mbs_only_flag = gb.readBits(1);

    if (frame_mbs_only_flag === 0) {
      gb.readBits(1); // mb_adaptive_frame_field_flag
    }

    gb.readBits(1); // direct_8x8_inference_flag

    var frame_crop_left_offset = 0;
    var frame_crop_right_offset = 0;
    var frame_crop_top_offset = 0;
    var frame_crop_bottom_offset = 0;
    var frame_cropping_flag = gb.readBool();

    if (frame_cropping_flag) {
      frame_crop_left_offset = gb.readUEG();
      frame_crop_right_offset = gb.readUEG();
      frame_crop_top_offset = gb.readUEG();
      frame_crop_bottom_offset = gb.readUEG();
    }

    var sar_width = 1,
        sar_height = 1;
    var fps = 0,
        fps_fixed = true,
        fps_num = 0,
        fps_den = 0;
    var vui_parameters_present_flag = gb.readBool();

    if (vui_parameters_present_flag) {
      if (gb.readBool()) {
        // aspect_ratio_info_present_flag
        var aspect_ratio_idc = gb.readByte();
        var sar_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2];
        var sar_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];

        if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
          sar_width = sar_w_table[aspect_ratio_idc - 1];
          sar_height = sar_h_table[aspect_ratio_idc - 1];
        } else if (aspect_ratio_idc === 255) {
          sar_width = gb.readByte() << 8 | gb.readByte();
          sar_height = gb.readByte() << 8 | gb.readByte();
        }
      }

      if (gb.readBool()) {
        // overscan_info_present_flag
        gb.readBool(); // overscan_appropriate_flag
      }

      if (gb.readBool()) {
        // video_signal_type_present_flag
        gb.readBits(4); // video_format & video_full_range_flag

        if (gb.readBool()) {
          // colour_description_present_flag
          gb.readBits(24); // colour_primaries & transfer_characteristics & matrix_coefficients
        }
      }

      if (gb.readBool()) {
        // chroma_loc_info_present_flag
        gb.readUEG(); // chroma_sample_loc_type_top_field

        gb.readUEG(); // chroma_sample_loc_type_bottom_field
      }

      if (gb.readBool()) {
        // timing_info_present_flag
        var num_units_in_tick = gb.readBits(32);
        var time_scale = gb.readBits(32);
        fps_fixed = gb.readBool(); // fixed_frame_rate_flag

        fps_num = time_scale;
        fps_den = num_units_in_tick * 2;
        fps = fps_num / fps_den;
      }
    }

    var sarScale = 1;

    if (sar_width !== 1 || sar_height !== 1) {
      sarScale = sar_width / sar_height;
    }

    var crop_unit_x = 0,
        crop_unit_y = 0;

    if (chroma_format_idc === 0) {
      crop_unit_x = 1;
      crop_unit_y = 2 - frame_mbs_only_flag;
    } else {
      var sub_wc = chroma_format_idc === 3 ? 1 : 2;
      var sub_hc = chroma_format_idc === 1 ? 2 : 1;
      crop_unit_x = sub_wc;
      crop_unit_y = sub_hc * (2 - frame_mbs_only_flag);
    }

    var codec_width = (pic_width_in_mbs_minus1 + 1) * 16;
    var codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16);
    codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x;
    codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y;
    var present_width = Math.ceil(codec_width * sarScale);
    gb.destroy();
    gb = null;
    return {
      profile_string: profile_string,
      // baseline, high, high10, ...
      level_string: level_string,
      // 3, 3.1, 4, 4.1, 5, 5.1, ...
      bit_depth: bit_depth,
      // 8bit, 10bit, ...
      chroma_format: chroma_format,
      // 4:2:0, 4:2:2, ...
      chroma_format_string: SPSParser.getChromaFormatString(chroma_format),
      frame_rate: {
        fixed: fps_fixed,
        fps: fps,
        fps_den: fps_den,
        fps_num: fps_num
      },
      sar_ratio: {
        width: sar_width,
        height: sar_height
      },
      codec_size: {
        width: codec_width,
        height: codec_height
      },
      present_size: {
        width: present_width,
        height: codec_height
      }
    };
  };

  SPSParser._skipScalingList = function _skipScalingList(gb, count) {
    var last_scale = 8,
        next_scale = 8;
    var delta_scale = 0;

    for (var i = 0; i < count; i++) {
      if (next_scale !== 0) {
        delta_scale = gb.readSEG();
        next_scale = (last_scale + delta_scale + 256) % 256;
      }

      last_scale = next_scale === 0 ? last_scale : next_scale;
    }
  };

  SPSParser.getProfileString = function getProfileString(profile_idc) {
    switch (profile_idc) {
      case 66:
        return 'Baseline';

      case 77:
        return 'Main';

      case 88:
        return 'Extended';

      case 100:
        return 'High';

      case 110:
        return 'High10';

      case 122:
        return 'High422';

      case 244:
        return 'High444';

      default:
        return 'Unknown';
    }
  };

  SPSParser.getLevelString = function getLevelString(level_idc) {
    return (level_idc / 10).toFixed(1);
  };

  SPSParser.getChromaFormatString = function getChromaFormatString(chroma) {
    switch (chroma) {
      case 420:
        return '4:2:0';

      case 422:
        return '4:2:2';

      case 444:
        return '4:4:4';

      default:
        return 'Unknown';
    }
  };

  SPSParser.getHEVCProfileString = function getHEVCProfileString(profile_idc) {
    return HEVC_MAIN[profile_idc];
  };

  SPSParser.getHEVCLevelString = function getHEVCLevelString(level_idc) {
    return HEVC_LEVELS[level_idc];
  };

  return SPSParser;
}();

/* harmony default export */ var sps_parser = (sps_parser_SPSParser);
// CONCATENATED MODULE: ./src/utils/decodeUTF8.ts
/* eslint-disable */
function decodeUTF8(uint8array) {
  var out = [];
  var input = uint8array;
  var i = 0;
  var length = uint8array.length;

  while (i < length) {
    if (input[i] < 0x80) {
      out.push(String.fromCharCode(input[i]));
      ++i;
      continue;
    } else if (input[i] < 0xc0) {// fallthrough
    } else if (input[i] < 0xe0) {
      if (checkContinuation(input, i, 1)) {
        var ucs4 = (input[i] & 0x1f) << 6 | input[i + 1] & 0x3f;

        if (ucs4 >= 0x80) {
          out.push(String.fromCharCode(ucs4 & 0xffff));
          i += 2;
          continue;
        }
      }
    } else if (input[i] < 0xf0) {
      if (checkContinuation(input, i, 2)) {
        var _ucs = (input[i] & 0xf) << 12 | (input[i + 1] & 0x3f) << 6 | input[i + 2] & 0x3f;

        if (_ucs >= 0x800 && (_ucs & 0xf800) !== 0xd800) {
          out.push(String.fromCharCode(_ucs & 0xffff));
          i += 3;
          continue;
        }
      }
    } else if (input[i] < 0xf8) {
      if (checkContinuation(input, i, 3)) {
        var _ucs2 = (input[i] & 0x7) << 18 | (input[i + 1] & 0x3f) << 12 | (input[i + 2] & 0x3f) << 6 | input[i + 3] & 0x3f;

        if (_ucs2 > 0x10000 && _ucs2 < 0x110000) {
          _ucs2 -= 0x10000;
          out.push(String.fromCharCode(_ucs2 >>> 10 | 0xd800));
          out.push(String.fromCharCode(_ucs2 & 0x3ff | 0xdc00));
          i += 4;
          continue;
        }
      }
    }

    out.push(String.fromCharCode(0xfffd));
    ++i;
  }

  return out.join('');
}

function checkContinuation(uint8array, start, checkLength) {
  var array = uint8array;

  if (start + checkLength < array.length) {
    while (checkLength--) {
      if ((array[++start] & 0xc0) !== 0x80) return false;
    }

    return true;
  } else {
    return false;
  }
}

/* harmony default export */ var utils_decodeUTF8 = (decodeUTF8);
// CONCATENATED MODULE: ./src/demux/flv/amf.ts
/* eslint-disable */


var amf_tag = 'AMF';

var amf_AMF =
/*#__PURE__*/
function () {
  function AMF() {}

  /**
   * 解析metadata
   */
  AMF.parseMetadata = function parseMetadata(arr) {
    var data = {};

    try {
      var name = AMF.parseScript(arr, 0);
      var value = AMF.parseScript(arr, name.size);
      data[name.data] = value.data;
    } catch (e) {
      log["Log"].e('AMF', e.toString());
    }

    return data;
  };

  AMF.parseObject = function parseObject(arrayBuffer, dataOffset) {
    var name = AMF.parseString(arrayBuffer, dataOffset);
    var value = AMF.parseScript(arrayBuffer, dataOffset + name.size);
    var isObjectEnd = value.objectEnd;
    return {
      data: {
        name: name.data,
        value: value.data
      },
      size: value.size,
      objectEnd: isObjectEnd
    };
  };

  AMF.parseVariable = function parseVariable(arrayBuffer, dataOffset) {
    return AMF.parseObject(arrayBuffer, dataOffset);
  };

  AMF.parseLongString = function parseLongString(arrayBuffer, dataOffset) {
    var v = new DataView(arrayBuffer, dataOffset);
    var length = v.getUint32(0);
    var str;

    if (length > 0) {
      str = utils_decodeUTF8(new Uint8Array(arrayBuffer, dataOffset + 4, length));
    } else {
      str = '';
    }

    return {
      data: str,
      size: 4 + length
    };
  };

  AMF.parseDate = function parseDate(arrayBuffer, dataOffset) {
    var v = new DataView(arrayBuffer, dataOffset);
    var timestamp = v.getFloat64(0);
    var localTimeOffset = v.getInt16(8);
    timestamp += localTimeOffset * 60 * 1000; // get UTC time

    return {
      data: new Date(timestamp),
      size: 8 + 2
    };
  };

  AMF.parseString = function parseString(arrayBuffer, dataOffset) {
    var v = new DataView(arrayBuffer, dataOffset);
    var length = v.getUint16(0);
    var str;

    if (length > 0) {
      str = utils_decodeUTF8(new Uint8Array(arrayBuffer, dataOffset + 2, length));
    } else {
      str = '';
    }

    return {
      data: str,
      size: 2 + length
    };
  };

  AMF.parseScript = function parseScript(arr, dataOffset) {
    var dataSize = arr.byteLength;
    var offset = dataOffset; // let uint8 = new Uint8Array(arr);

    var buffer = arr;
    var dv = new DataView(buffer, 0);
    var value = null;
    var type = dv.getUint8(offset);
    offset += 1;
    var objectEnd = false;

    switch (type) {
      case 0:
        // Number(Double) type
        value = dv.getFloat64(offset);
        offset += 8;
        break;

      case 1:
        {
          // Boolean type
          var b = dv.getUint8(offset);
          value = !!b;
          offset += 1;
          break;
        }

      case 2:
        {
          // String type
          var amfstr = AMF.parseString(buffer, offset);
          value = amfstr.data;
          offset += amfstr.size;
          break;
        }

      case 3:
        {
          // Object(s) type
          value = {};
          var terminal = 0; // workaround for malformed Objects which has missing ScriptDataObjectEnd

          if ((dv.getUint32(dataSize - 4) & 0x00ffffff) === 9) {
            terminal = 3;
          }

          while (offset < dataSize - 4) {
            // 4 === type(UI8) + ScriptDataObjectEnd(UI24)
            var amfobj = AMF.parseObject(buffer, offset);

            if (amfobj.objectEnd) {
              break;
            }

            value[amfobj.data.name] = amfobj.data.value; // dataOffset += amfobj.size;

            offset = amfobj.size;
          }

          if (offset <= dataSize - 3) {
            var marker = dv.getUint32(offset - 1) & 0x00ffffff;

            if (marker === 9) {
              offset += 3;
            }
          }

          break;
        }

      case 8:
        {
          // ECMA array type (Mixed array)
          value = {}; // dataOffset += 1;

          offset += 4; // ECMAArrayLength(UI32)

          var _terminal = 0; // workaround for malformed MixedArrays which has missing ScriptDataObjectEnd

          if ((dv.getUint32(dataSize - 4) & 0x00ffffff) === 9) {
            _terminal = 3;
          }

          while (offset < dataSize - 8) {
            // 8 === type(UI8) + ECMAArrayLength(UI32) + ScriptDataVariableEnd(UI24)
            var amfvar = AMF.parseVariable(buffer, offset);

            if (amfvar.objectEnd) {
              break;
            }

            value[amfvar.data.name] = amfvar.data.value;
            offset = amfvar.size;
          }

          if (offset <= dataSize - 3) {
            var _marker = dv.getUint32(offset - 1) & 0x00ffffff;

            if (_marker === 9) {
              offset += 3;
            }
          }

          break;
        }

      case 9:
        // ScriptDataObjectEnd
        value = undefined;
        offset = 1;
        objectEnd = true;
        break;

      case 10:
        {
          // Strict array type
          // ScriptDataValue[n]. NOTE: according to video_file_format_spec_v10_1.pdf
          value = [];
          var strictArrayLength = dv.getUint32(offset);
          offset += 4;

          for (var i = 0; i < strictArrayLength; i++) {
            var val = AMF.parseScript(buffer, offset);
            value.push(val.data);
            offset = val.size;
          }

          break;
        }

      case 11:
        {
          // Date type
          var date = AMF.parseDate(buffer, offset + 1);
          value = date.data;
          offset += date.size;
          break;
        }

      case 12:
        {
          // Long string type
          var amfLongStr = AMF.parseString(buffer, offset + 1);
          value = amfLongStr.data;
          offset += amfLongStr.size;
          break;
        }

      default:
        // ignore and skip
        offset = dataSize;
        log["Log"].v(amf_tag, 'AMF', 'Unsupported AMF value type ' + type);
    }

    return {
      data: value,
      size: offset,
      objectEnd: objectEnd
    };
  };

  return AMF;
}();


// EXTERNAL MODULE: ./src/demux/flv/flv.ts
var flv = __webpack_require__("./src/demux/flv/flv.ts");

// CONCATENATED MODULE: ./src/demux/flv/avc-helper.ts

var configBody = new Uint8Array([23, 0, 0, 0, 0, 1, 100, 0, 10, 255, 225, 0, 24, 103, 100, 0, 10, 172, 114, 4, 68, 122, 16, 0, 0, 3, 0, 16, 0, 0, 3, 3, 32, 241, 34, 88, 70, 1, 0, 6, 104, 232, 67, 143, 44, 139]);
var frameI = new Uint8Array([23, 1, 0, 0, 0, 0, 0, 2, 176, 6, 5, 255, 255, 172, 220, 69, 233, 189, 230, 217, 72, 183, 150, 44, 216, 32, 217, 35, 238, 239, 120, 50, 54, 52, 32, 45, 32, 99, 111, 114, 101, 32, 49, 53, 50, 32, 114, 50, 56, 53, 52, 32, 101, 57, 97, 53, 57, 48, 51, 32, 45, 32, 72, 46, 50, 54, 52, 47, 77, 80, 69, 71, 45, 52, 32, 65, 86, 67, 32, 99, 111, 100, 101, 99, 32, 45, 32, 67, 111, 112, 121, 108, 101, 102, 116, 32, 50, 48, 48, 51, 45, 50, 48, 49, 55, 32, 45, 32, 104, 116, 116, 112, 58, 47, 47, 119, 119, 119, 46, 118, 105, 100, 101, 111, 108, 97, 110, 46, 111, 114, 103, 47, 120, 50, 54, 52, 46, 104, 116, 109, 108, 32, 45, 32, 111, 112, 116, 105, 111, 110, 115, 58, 32, 99, 97, 98, 97, 99, 61, 49, 32, 114, 101, 102, 61, 49, 54, 32, 100, 101, 98, 108, 111, 99, 107, 61, 49, 58, 48, 58, 48, 32, 97, 110, 97, 108, 121, 115, 101, 61, 48, 120, 51, 58, 48, 120, 49, 51, 51, 32, 109, 101, 61, 117, 109, 104, 32, 115, 117, 98, 109, 101, 61, 49, 48, 32, 112, 115, 121, 61, 49, 32, 112, 115, 121, 95, 114, 100, 61, 49, 46, 48, 48, 58, 48, 46, 48, 48, 32, 109, 105, 120, 101, 100, 95, 114, 101, 102, 61, 49, 32, 109, 101, 95, 114, 97, 110, 103, 101, 61, 50, 52, 32, 99, 104, 114, 111, 109, 97, 95, 109, 101, 61, 49, 32, 116, 114, 101, 108, 108, 105, 115, 61, 50, 32, 56, 120, 56, 100, 99, 116, 61, 49, 32, 99, 113, 109, 61, 48, 32, 100, 101, 97, 100, 122, 111, 110, 101, 61, 50, 49, 44, 49, 49, 32, 102, 97, 115, 116, 95, 112, 115, 107, 105, 112, 61, 49, 32, 99, 104, 114, 111, 109, 97, 95, 113, 112, 95, 111, 102, 102, 115, 101, 116, 61, 45, 50, 32, 116, 104, 114, 101, 97, 100, 115, 61, 49, 32, 108, 111, 111, 107, 97, 104, 101, 97, 100, 95, 116, 104, 114, 101, 97, 100, 115, 61, 49, 32, 115, 108, 105, 99, 101, 100, 95, 116, 104, 114, 101, 97, 100, 115, 61, 48, 32, 110, 114, 61, 48, 32, 100, 101, 99, 105, 109, 97, 116, 101, 61, 49, 32, 105, 110, 116, 101, 114, 108, 97, 99, 101, 100, 61, 48, 32, 98, 108, 117, 114, 97, 121, 95, 99, 111, 109, 112, 97, 116, 61, 48, 32, 99, 111, 110, 115, 116, 114, 97, 105, 110, 101, 100, 95, 105, 110, 116, 114, 97, 61, 48, 32, 98, 102, 114, 97, 109, 101, 115, 61, 56, 32, 98, 95, 112, 121, 114, 97, 109, 105, 100, 61, 50, 32, 98, 95, 97, 100, 97, 112, 116, 61, 50, 32, 98, 95, 98, 105, 97, 115, 61, 48, 32, 100, 105, 114, 101, 99, 116, 61, 51, 32, 119, 101, 105, 103, 104, 116, 98, 61, 49, 32, 111, 112, 101, 110, 95, 103, 111, 112, 61, 48, 32, 119, 101, 105, 103, 104, 116, 112, 61, 50, 32, 107, 101, 121, 105, 110, 116, 61, 50, 53, 48, 32, 107, 101, 121, 105, 110, 116, 95, 109, 105, 110, 61, 50, 53, 32, 115, 99, 101, 110, 101, 99, 117, 116, 61, 52, 48, 32, 105, 110, 116, 114, 97, 95, 114, 101, 102, 114, 101, 115, 104, 61, 48, 32, 114, 99, 95, 108, 111, 111, 107, 97, 104, 101, 97, 100, 61, 54, 48, 32, 114, 99, 61, 99, 114, 102, 32, 109, 98, 116, 114, 101, 101, 61, 49, 32, 99, 114, 102, 61, 50, 51, 46, 48, 32, 113, 99, 111, 109, 112, 61, 48, 46, 54, 48, 32, 113, 112, 109, 105, 110, 61, 48, 32, 113, 112, 109, 97, 120, 61, 54, 57, 32, 113, 112, 115, 116, 101, 112, 61, 52, 32, 105, 112, 95, 114, 97, 116, 105, 111, 61, 49, 46, 52, 48, 32, 97, 113, 61, 49, 58, 49, 46, 48, 48, 0, 128, 0, 0, 0, 29, 101, 136, 129, 0, 5, 127, 254, 246, 115, 124, 10, 107, 109, 176, 149, 46, 5, 118, 246, 150, 55, 45, 60, 239, 89, 160, 124, 49, 129]);

var avc_helper_AVC =
/*#__PURE__*/
function () {
  function AVC() {}

  AVC.getFlvVideoTag = function getFlvVideoTag(timestamp, config) {
    if (config === void 0) {
      config = false;
    }

    var tag = new flv["FlvTag"]();
    tag.tagType = flv["FlvTagType"].VIDEO;

    if (config) {
      tag.body = configBody;
    } else {
      tag.body = frameI;
    }

    tag.dataSize = tag.body.byteLength;
    tag.timestamp = Math.round(timestamp);
    tag.frameType = 1;
    tag.codecId = 7;
    tag.fill = true;
    return tag;
  };

  return AVC;
}();

/* harmony default export */ var avc_helper = (avc_helper_AVC);
// CONCATENATED MODULE: ./src/demux/flv/flv-demuxer.ts
function flv_demuxer_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function flv_demuxer_createClass(Constructor, protoProps, staticProps) { if (protoProps) flv_demuxer_defineProperties(Constructor.prototype, protoProps); if (staticProps) flv_demuxer_defineProperties(Constructor, staticProps); return Constructor; }









 // 连续Non-monotonous上限，超过上限重置remux

var DISCONTINUITY_ON_NON_MONOTONOUS = 10;

var flv_demuxer_FlvDemux =
/*#__PURE__*/
function () {
  function FlvDemux(observer, remuxer, config) {
    this.tag = 'FlvDemux';
    this._observer = void 0;
    this._remuxer = void 0;
    this._config = void 0;
    this._duration = void 0;
    this._naluLengthSize = void 0;
    this._hasVideo = void 0;
    this._hasAudio = void 0;
    this._videoTrack = void 0;
    this._audioTrack = void 0;
    this._remuxStat = void 0;
    this._currentTimestamp = 0;
    this._aLastDTS = 0;
    this._vLastDTS = 0;
    this._nonMonotonousCache = void 0;
    this._fillAtStart = {
      enabled: true,
      start: 0,
      avcConfig: true
    };
    this._observer = observer;
    this._remuxer = remuxer;
    this._config = config;
    this._duration = 0;
    this._naluLengthSize = 4;
    this._hasVideo = true;
    this._hasAudio = true;
    this._videoTrack = {
      id: 1,
      type: TrackType.video,
      container: '',
      codec: '',
      timescale: 90000,
      duration: Infinity,
      samples: [],
      inputTimeScale: 90000,
      sequenceNumber: 0,
      pid: -1,
      width: 0,
      height: 0,
      codecWidth: 0,
      codecHeight: 0,
      sps: [],
      pps: [],
      pixelRatio: [],
      profile: '',
      level: '',
      chromaFormat: '',
      fps: 0,
      dropped: 0,
      refSampleDuration: 0
    };
    this._audioTrack = {
      id: 2,
      type: TrackType.audio,
      container: '',
      codec: '',
      timescale: 90000,
      duration: Infinity,
      samples: [],
      inputTimeScale: 90000,
      sequenceNumber: 0,
      pid: -1,
      isAAC: true,
      samplerate: 0,
      channelCount: 0,
      config: []
    };
  }

  var _proto = FlvDemux.prototype;

  _proto.append = function append(tags, timeOffset, contiguous, accurateTimeOffset) {
    var _this = this;

    if (!this._remuxStat) {
      this._remuxStat = {
        timeOffset: timeOffset,
        contiguous: contiguous,
        accurateTimeOffset: accurateTimeOffset
      };
    }

    if (!tags.length) return;
    tags.forEach(function (tag) {
      if (tag.tagType === flv["FlvTagType"].VIDEO && _this._hasVideo) {
        if (_this._fillAtStart.enabled) {
          // 收到视频tag，停止填充
          _this._fillAtStart.enabled = false;

          if (_this._audioTrack.samples.length) {
            _this._fillFrame(_this._audioTrack.samples[_this._audioTrack.samples.length - 1].dts / 90);
          }
        }

        _this._parseVideoData(tag);
      }

      if (tag.tagType === flv["FlvTagType"].AUDIO && _this._hasAudio) {
        _this._parseAudioData(tag);
      }

      if (tag.tagType === flv["FlvTagType"].SCRIPT) {
        _this._parseScriptTag(tag);
      }
    });

    if (this._fillAtStart.enabled && this._audioTrack.samples.length) {
      // 填充与音频同样长度的视频
      var st = this._audioTrack.samples[0].dts / 90;
      var ed = this._audioTrack.samples[this._audioTrack.samples.length - 1].dts / 90;

      if (this._fillAtStart.start <= 0) {
        this._fillAtStart.start = st;
      }

      if (ed > this._fillAtStart.start) {
        this._fillFrame(ed);
      }
    }

    this._remux();
  };

  _proto.flvHead = function flvHead(hasAudio, hasVideo) {
    this._hasAudio = hasAudio;
    this._hasVideo = hasVideo;
    this._fillAtStart.enabled = this._hasVideo;
  };

  _proto.destroy = function destroy() {};

  _proto.flush = function flush() {
    this._remux(true);

    this._remuxStat = undefined;
  };

  _proto.resetInitSegment = function resetInitSegment() {
    this._videoTrack.samples = [];
    this._audioTrack.samples = [];
    this._aLastDTS = this._vLastDTS = 0;
    this._remuxStat = undefined;
  };

  _proto.resetTimeStamp = function resetTimeStamp() {} // 设置视频长度
  ;

  _proto._parseScriptTag = function _parseScriptTag(tag) {
    if (tag.body) {
      var scriptData = amf_AMF.parseMetadata(tag.body.buffer);
      scriptData.timestamp = this._currentTimestamp || 0;

      if (scriptData.hasOwnProperty('onMetaData')) {
        var onMetaData = scriptData.onMetaData;

        if (typeof onMetaData.framerate === 'number') {
          this._videoTrack.fps = this._videoTrack.fps || onMetaData.framerate;
        }

        log["Log"].i(this.tag, 'Parsed onMetaData');
      }

      this._observer.trigger(events["default"].SCRIPT_PARSED, scriptData);
    }
  };

  _proto._parseVideoData = function _parseVideoData(tag) {
    if (!tag.body) {
      return;
    } // 获取 video tag body 第一字节


    var spec = tag.body[0]; // 获取是否是关键帧

    tag.frameType = (spec & 240) >>> 4; // 获取编码格式

    var codecId = spec & 15;

    if (codecId !== 7 && codecId !== 12) {
      this._observer.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MUX_ERROR,
        details: errors["ErrorDetails"].PARSING_ERROR,
        fatal: true,
        reason: "Flv: Unsupported codec in video frame: " + codecId
      });

      return;
    }

    tag.codecId = codecId; // IF CodecID == 7  AVCPacketType
    // 0 = AVC sequence header
    // 1 = AVC NALU
    // 2 = AVC end of sequence (lower level NALU sequence ender is not required or supported)

    var packetType = tag.body[1]; // 3字节
    // IF AVCPacketType == 1
    //  Composition time offset
    // ELSE
    //  0

    tag.cts = ((tag.body[2] & 0xff) << 16) + ((tag.body[3] & 0xff) << 8) + (tag.body[4] & 0xff); // IF AVCPacketType == 0 AVCDecoderConfigurationRecord（AVC sequence header）
    // IF AVCPacketType == 1 One or more NALUs (Full frames are required)

    if (packetType === 0) {
      if (codecId === 7) {
        this._parseAVCDecoderConfigurationRecord(tag, 5);
      }
    } else if (packetType === 1) {
      this._parseAVCVideoData(tag, 5) || {};
    } else if (packetType === 2) {// empty, AVC end of sequence
    } else {
      this._observer.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MUX_ERROR,
        details: errors["ErrorDetails"].PARSING_ERROR,
        fatal: true,
        reason: "Flv: Invalid video packet type " + packetType
      });

      return;
    }
  }
  /**
   * AVC 初始化
   * @param {FlvTag} tag flvtag
   * @param {number} dataOffset tag body offset
   */
  ;

  _proto._parseAVCDecoderConfigurationRecord = function _parseAVCDecoderConfigurationRecord(tag, dataOffset) {
    if (!tag.body) {
      return;
    }

    var track = this._videoTrack;
    var arrayBuffer = tag.body.buffer;
    var dataSize = tag.body.byteLength - dataOffset;
    var v = new DataView(arrayBuffer, dataOffset, dataSize);
    var version = v.getUint8(0); // configurationVersion

    var avcProfile = v.getUint8(1); // avcProfileIndication
    // const profileCompatibility = v.getUint8(2); // profile_compatibility
    // const avcLevel = v.getUint8(3); // AVCLevelIndication

    if (version !== 1 || avcProfile === 0) {
      this._observer.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MUX_ERROR,
        details: errors["ErrorDetails"].PARSING_ERROR,
        fatal: true,
        reason: 'Flv: Invalid AVCDecoderConfigurationRecord'
      });

      return;
    }

    this._naluLengthSize = (v.getUint8(4) & 3) + 1; // lengthSizeMinusOne

    if (this._naluLengthSize !== 3 && this._naluLengthSize !== 4) {
      this._observer.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MUX_ERROR,
        details: errors["ErrorDetails"].PARSING_ERROR,
        fatal: true,
        reason: "Flv: Strange NaluLengthSizeMinusOne: " + (this._naluLengthSize - 1)
      });

      return;
    }

    var spsCount = v.getUint8(5) & 31; // numOfSequenceParameterSets

    if (spsCount === 0 || spsCount > 1) {
      this._observer.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MUX_ERROR,
        details: errors["ErrorDetails"].PARSING_ERROR,
        fatal: true,
        reason: "Flv: Invalid H264 SPS count: " + spsCount
      });

      return;
    }

    var offset = 6;
    var spsList = [];

    for (var i = 0; i < spsCount; i++) {
      var len = v.getUint16(offset); // sequenceParameterSetLength

      offset += 2;

      if (len === 0) {
        continue;
      } // Notice: Nalu without startcode header (00 00 00 01)


      var sps = new Uint8Array(arrayBuffer, dataOffset + offset, len);
      offset += len;
      spsList.push(sps);
      var config = sps_parser.parseSPS(sps);
      var codecArray = sps.subarray(1, 4);
      var codecString = 'avc1.';

      for (var j = 0; j < 3; j++) {
        var h = codecArray[j].toString(16);

        if (h.length < 2) {
          h = '0' + h;
        }

        codecString += h;
      } // sps update


      if (!!track.codec && (track.width !== config.codec_size.width || track.height !== config.codec_size.height || codecString !== track.codec)) {
        if (!tag.fill) {
          this._remux(true);
        }

        if (this._remuxer.ISGenerated) {
          this._remuxer.resetInitSegment();
        }
      }

      track.sps = spsList;
      track.width = config.codec_size.width;
      track.height = config.codec_size.height;
      track.pixelRatio = [config.sar_ratio.width, config.sar_ratio.height];

      if (config.frame_rate.fixed && config.frame_rate.fps !== 0) {
        track.fps = config.frame_rate.fps;
      }

      track.codec = codecString;
      track.profile = config.profile_string;
      track.level = config.level_string;
      track.chromaFormat = config.chroma_format_string;
    }

    var ppsCount = v.getUint8(offset); // numOfPictureParameterSets

    if (ppsCount === 0 || ppsCount > 1) {
      this._observer.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MUX_ERROR,
        details: errors["ErrorDetails"].PARSING_ERROR,
        fatal: true,
        reason: "Flv: Invalid H264 PPS count: " + ppsCount
      });

      return;
    }

    offset++;
    track.pps = [];

    for (var _i = 0; _i < ppsCount; _i++) {
      var _len = v.getUint16(offset); // pictureParameterSetLength


      offset += 2;
      var pps = new Uint8Array(arrayBuffer, dataOffset + offset, _len);
      track.pps.push(pps);

      if (_len === 0) {
        continue;
      }

      offset += _len;
    }

    log["Log"].v(this.tag, 'Parsed AVCDecoderConfigurationRecord');
    track.duration = this._duration;
    track.container = 'video/mp4';

    if (track.fps) {
      track.refSampleDuration = Math.floor(track.timescale / track.fps);
    } else {
      // 兼容无fps信息的情况，无fps时影响mp4sample duration估算，改为以gop为单位remux
      // this._config.gopRemux = true;
      track.refSampleDuration = Math.floor(track.timescale / 30);
    }
  }
  /**
   * 普通的AVC 片段
   * @param {Flvtag} tag flv tag
   * @param {number} dataOffset dataOffset
   */
  ;

  _proto._parseAVCVideoData = function _parseAVCVideoData(tag, dataOffset, ignoreNonMonotonous) {
    if (ignoreNonMonotonous === void 0) {
      ignoreNonMonotonous = false;
    }

    if (!tag.body) {
      return;
    }

    var info;
    var arrayBuffer = tag.body.buffer;
    var dataSize = tag.body.byteLength - dataOffset;
    var v = new DataView(arrayBuffer, dataOffset, dataSize);
    var units = [];
    var length = 0;
    var offset = 0;
    var lengthSize = this._naluLengthSize;
    var dts = tag.timestamp;
    var keyframe = tag.frameType === 1; // from FLV Frame Type constants
    // 处理Non-monotonous DTS及丢帧时间修正后可能出现的时间重叠，加速播放

    if (!ignoreNonMonotonous && dts <= this._vLastDTS && this._vLastDTS > 0) {
      log["Log"].w(this.tag, "debug Non-monotonous DTS dts:" + dts + " last:" + this._vLastDTS);

      this._onNonMonotonous({
        tag: tag,
        dataOffset: dataOffset
      }, TrackType.video);

      return;
    }

    if (!ignoreNonMonotonous && this._nonMonotonousCache) {
      this._flushNonMonotonousCache();
    }

    var pts = dts + tag.cts;

    while (offset < dataSize) {
      if (offset + 4 >= dataSize) {
        log["Log"].v(this.tag, "Malformed Nalu near timestamp " + dts + ", offset = " + offset + ", dataSize = " + dataSize);
        break; // data not enough for next Nalu
      } // Nalu with length-header (AVC1)


      var naluSize = v.getUint32(offset); // Big-Endian read

      if (lengthSize === 3) {
        naluSize >>>= 8;
      }

      if (naluSize > dataSize - lengthSize) {
        log["Log"].v(this.tag, "Malformed Nalus near timestamp " + dts + ", NaluSize > DataSize!");
        return;
      }

      var data = new Uint8Array(arrayBuffer, dataOffset + offset + 4, lengthSize + naluSize - 4);
      var unitType = void 0;

      if (tag.codecId === 7) {
        // AVC
        unitType = v.getUint8(offset + lengthSize) & 0x1f;

        if (unitType === 5) {
          keyframe = true;
        }
      }

      var unit = {
        type: unitType,
        data: data
      };
      units.push(unit);
      length += data.byteLength;
      offset += lengthSize + naluSize;
    }

    if (units.length) {
      var track = this._videoTrack;
      var avcSample = {
        units: units,
        length: length,
        dts: dts * 90,
        cts: tag.cts * 90,
        pts: pts * 90,
        streamDTS: dts,
        key: keyframe
      };
      track.samples.push(avcSample);
    }

    this._vLastDTS = dts;
    return info;
  };

  _proto._parseAudioData = function _parseAudioData(tag, ignoreNonMonotonous) {
    if (ignoreNonMonotonous === void 0) {
      ignoreNonMonotonous = false;
    }

    if (!tag.body) {
      return;
    }

    var dataSize = tag.body.byteLength;
    var aacFrameLen;

    if (dataSize <= 1) {
      log["Log"].v(this.tag, 'Flv: Invalid audio packet, missing SoundData payload!');
      return;
    }

    var track = this._audioTrack;
    var packetType = tag.body[1];

    if (packetType === 0) {
      if (tag.body.byteLength < 4) {
        return;
      }

      initTrackConfig(track, this._observer, tag.body, 0, this._config.audioCodec);
      track.duration = this._duration;
      return;
    } else if (packetType === 1) {
      var aacData = tag.body.subarray(2); // AAC raw frame data

      var dts = tag.timestamp; // 通过时间计算的dts与通过帧长度计算的dts比对，判断是否发生了跳帧
      // aac帧长度

      aacFrameLen = getFrameDuration(track.samplerate);
      var maxAudioFramesDrift = aacFrameLen * this._config.maxAudioFramesDrift;

      if (this._aLastDTS > 0) {
        // 默认使用时间戳累加
        dts = this._aLastDTS + aacFrameLen;
        var dtsDiff = tag.timestamp - dts;

        if (!ignoreNonMonotonous && dtsDiff < -maxAudioFramesDrift) {
          this._onNonMonotonous({
            tag: tag
          }, TrackType.audio);

          return;
        }
      }

      if (!ignoreNonMonotonous && this._nonMonotonousCache) {
        this._flushNonMonotonousCache();
      }

      var sampleDts = dts * track.inputTimeScale / 1000;
      var aacSample = {
        unit: aacData,
        dts: sampleDts,
        pts: sampleDts,
        streamDTS: tag.timestamp,
        length: aacData.byteLength
      };
      this._aLastDTS = dts;
      track.samples.push(aacSample);
    } else {
      log["Log"].v(this.tag, "Flv: Unsupported AAC data type " + packetType);
    }
  }
  /**
   * 检测到Non-monotonous，连续出现Non-monotonous按照中断重推处理
   * @param {object} data tag相关数据
   * @param {string} type audio|video
   */
  ;

  _proto._onNonMonotonous = function _onNonMonotonous(data, type) {
    if (!this._nonMonotonousCache) {
      this._nonMonotonousCache = {
        video: [],
        audio: []
      };
    }

    var cache = this._nonMonotonousCache[type];

    if (cache.length > DISCONTINUITY_ON_NON_MONOTONOUS) {
      this.flush();

      var lastPts = this._remuxer.getLastPTS();

      var ptsSync = lastPts.audio;

      if (ptsSync === 0 || lastPts.video > 0 && lastPts.video < ptsSync) {
        ptsSync = lastPts.video;
      }

      this._videoTrack.samples = [];
      this._audioTrack.samples = [];
      this._aLastDTS = this._vLastDTS = 0;
      this._remuxStat = {
        accurateTimeOffset: false,
        contiguous: false,
        timeOffset: ptsSync
      };

      this._remuxer.resetInitSegment();

      this._remuxer.resetTimeStamp();

      log["Log"].i(this.tag, 'NON_MONOTONOUS reset time');

      this._flushNonMonotonousCache();
    } else {
      cache.push(data);
    }
  }
  /**
   * 清空Non-monotonous数据，remux
   */
  ;

  _proto._flushNonMonotonousCache = function _flushNonMonotonousCache() {
    if (this._nonMonotonousCache) {
      var nonMonotonousCache = this._nonMonotonousCache;

      for (var key in nonMonotonousCache) {
        var cache = nonMonotonousCache[key];

        while (cache.length) {
          var data = cache.shift();

          if (data) {
            if (key === 'video') {
              this._parseAVCVideoData(data.tag, data.dataOffset, true);
            } else if (key === 'audio') {
              this._parseAudioData(data.tag, true);
            }
          }
        }
      }

      this._nonMonotonousCache = undefined;
    }
  };

  _proto._remux = function _remux(end) {
    if (end === void 0) {
      end = false;
    }

    var audiotrack = this._audioTrack;
    var videotrack = this._videoTrack;
    var contiguous = true,
        timeOffset = 0,
        accurateTimeOffset = false;

    if (this._remuxStat) {
      contiguous = this._remuxStat.contiguous;
      timeOffset = this._remuxStat.timeOffset;
      accurateTimeOffset = this._remuxStat.accurateTimeOffset;
    }

    if (audiotrack.samples.length === 0 && videotrack.samples.length === 0) {
      if (end) {
        this._remuxer.flush();
      }

      return;
    }

    if (!end && (this._hasAudio && audiotrack.samples.length === 0 || this._hasVideo && videotrack.samples.length < 2)) {
      return;
    }

    try {
      this._remuxer.remux(audiotrack, videotrack, timeOffset, contiguous, accurateTimeOffset, end);

      this._remuxStat = undefined;
    } catch (error) {
      log["Log"].e(this.tag, error);

      this._observer.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MUX_ERROR,
        details: errors["ErrorDetails"].REMUX_ERROR,
        fatal: true,
        reason: error.message
      });
    }
  }
  /**
   * 填充视频空数据
   * @param ed 结束时间戳 ms
   */
  ;

  _proto._fillFrame = function _fillFrame(ed) {
    var _this2 = this;

    if (this._audioTrack.samples.length === 0) {
      return;
    }

    var st = this._fillAtStart.start || this._audioTrack.samples[0].dts * 90;

    if (ed > st) {
      log["Log"].i(this.tag, "fill video frame: " + st + " " + ed);
      this._fillAtStart.start = ed;
      var tags = [avc_helper.getFlvVideoTag(st), avc_helper.getFlvVideoTag(ed - 1)];

      if (this._fillAtStart.avcConfig) {
        tags.unshift(avc_helper.getFlvVideoTag(st, true));
        this._fillAtStart.avcConfig = false;
      }

      tags.forEach(function (tag) {
        _this2._parseVideoData(tag);
      });
    }
  };

  flv_demuxer_createClass(FlvDemux, [{
    key: "duration",
    set: function set(sec) {
      this._duration = sec;
    }
  }]);

  return FlvDemux;
}();

/* harmony default export */ var flv_demuxer = (flv_demuxer_FlvDemux);
// CONCATENATED MODULE: ./src/demux/flv/flv-demuxer-inline.ts




var flv_demuxer_inline_FlvDemuxerInline =
/*#__PURE__*/
function () {
  function FlvDemuxerInline(observer, config, extraData, vendor) {
    this.tag = 'Flv';
    this._observer = void 0;
    this._config = void 0;
    this._extraData = void 0;
    this._demuxer = void 0;
    this._remuxer = void 0;
    this._bitrate = void 0;
    this._vendor = void 0;
    this._observer = observer;
    this._config = config;
    this._bitrate = this._config.bitrate;
    this._extraData = extraData;
    this._vendor = vendor;
  }

  var _proto = FlvDemuxerInline.prototype;

  _proto.init = function init() {
    var config = this._config,
        observer = this._observer;
    var remuxer = this._remuxer = new mp4_remuxer(observer, config, {
      mp4: true,
      mpeg: false,
      mp3: false
    });
    var demuxer = this._demuxer = new flv_demuxer(observer, remuxer, config);
    remuxer.setExtra(this._extraData);
    demuxer.duration = config.duration || 0;
  };

  _proto.flvHead = function flvHead(hasAudio, hasVideo) {
    this._demuxer.flvHead(hasAudio, hasVideo);
  };

  _proto.append = function append(tags, timeOffset, discontinuity, contiguous, accurateTimeOffset) {
    if (discontinuity) {
      this._demuxer.resetInitSegment();

      this._remuxer.resetInitSegment();

      this._demuxer.resetTimeStamp();

      this._remuxer.resetTimeStamp();
    }

    this._demuxer.append(tags, timeOffset, contiguous, accurateTimeOffset);
  };

  _proto.end = function end() {
    this._demuxer.flush();

    this._remuxer.flush();

    this._observer.trigger(events["default"].LOAD_END);
  };

  _proto.flush = function flush() {
    if (this._demuxer) {
      this._demuxer.flush();
    }
  };

  _proto.setExtra = function setExtra(data) {
    this._extraData = data;
    this._extraData.bitrate = this._bitrate;

    if (this._remuxer) {
      this._remuxer.setExtra(this._extraData);
    }
  };

  _proto.destroy = function destroy() {};

  return FlvDemuxerInline;
}();

/* harmony default export */ var flv_demuxer_inline = __webpack_exports__["default"] = (flv_demuxer_inline_FlvDemuxerInline);

/***/ }),

/***/ "./src/demux/flv/flv-demuxer-worker.ts":
/*!*********************************************!*\
  !*** ./src/demux/flv/flv-demuxer-worker.ts ***!
  \*********************************************/
/*! exports provided: default */
/*! ModuleConcatenation bailout: Module is referenced from these modules with unsupported syntax: ./src/core/trans-flv.ts (referenced with require.resolve) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/observer */ "./src/core/observer.ts");
/* harmony import */ var _core_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/events */ "./src/core/events.ts");
/* harmony import */ var _flv_demuxer_inline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flv-demuxer-inline */ "./src/demux/flv/flv-demuxer-inline.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/log */ "./src/utils/log.ts");




/* harmony default export */ __webpack_exports__["default"] = (function (self) {
  var flv;
  var observer = new _core_observer__WEBPACK_IMPORTED_MODULE_0__["default"]();

  var forwardMessage = function forwardMessage(ev, data) {
    self.postMessage({
      event: ev,
      data: data
    });
  };

  observer.on(_core_events__WEBPACK_IMPORTED_MODULE_1__["default"].PARSING_INIT_SEGMENT, forwardMessage);
  observer.on(_core_events__WEBPACK_IMPORTED_MODULE_1__["default"].ERROR, forwardMessage);
  observer.on(_core_events__WEBPACK_IMPORTED_MODULE_1__["default"].SCRIPT_PARSED, forwardMessage);
  observer.on(_core_events__WEBPACK_IMPORTED_MODULE_1__["default"].LOAD_END, forwardMessage);
  observer.on(_core_events__WEBPACK_IMPORTED_MODULE_1__["default"].PARSING_DATA, function (ev, data) {
    var message = {
      event: ev,
      data: data
    };
    message.payload = data.payload;
    delete data.payload;
    self.postMessage(message, [message.payload.buffer]);
  });

  function init(observer, config, data, vendor) {
    flv = new _flv_demuxer_inline__WEBPACK_IMPORTED_MODULE_2__["default"](observer, config, data, vendor);
    flv.init();
  }

  function destroy() {
    if (flv) {
      flv.destroy();
    }

    if (observer) {
      observer.removeAllListeners();
    }
  }

  self.addEventListener('message', function (e) {
    var d = e.data;

    switch (d.cmd) {
      case 'init':
        _utils_log__WEBPACK_IMPORTED_MODULE_3__["Log"].level(d.config.debug);
        init(observer, d.config, d.data, d.vendor);
        break;

      case 'destroy':
        destroy();
        break;

      case 'append':
        flv.append(d.tags, d.timeOffset, d.discontinuity, d.contiguous, d.accurateTimeOffset);
        break;

      case 'flvHead':
        flv.flvHead(d.hasAudio, d.hasVideo);
        break;

      case 'flush':
        flv.flush();
        break;

      case 'setExtra':
        flv.setExtra(d.data);
        break;

      case 'end':
        flv.end();
        break;
    }
  });
});

/***/ }),

/***/ "./src/demux/flv/flv.ts":
/*!******************************!*\
  !*** ./src/demux/flv/flv.ts ***!
  \******************************/
/*! exports provided: FlvTagType, FlvSize, FlvTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlvTagType", function() { return FlvTagType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlvSize", function() { return FlvSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlvTag", function() { return FlvTag; });
var FlvTagType;

(function (FlvTagType) {
  FlvTagType[FlvTagType["AUDIO"] = 8] = "AUDIO";
  FlvTagType[FlvTagType["VIDEO"] = 9] = "VIDEO";
  FlvTagType[FlvTagType["SCRIPT"] = 18] = "SCRIPT";
})(FlvTagType || (FlvTagType = {}));

var FlvSize = {
  FLV_HEAD_LEN: 13,
  FLV_TAG_HEAD_LEN: 11,
  FLV_TAG_SIZE_LEN: 4,
  AVC_KEY_FRAME_CHECK_LEN: 2
};
var FlvTag = function FlvTag() {
  this.tagType = FlvTagType.VIDEO;
  this.dataSize = 0;
  this.timestamp = 0;
  this.size = 0;
  this.cts = 0;
  this.frameType = 0;
  this.codecId = 0;
  this.body = null;
  this.fill = void 0;
};

/***/ }),

/***/ "./src/index.ts":
/*!***********************************!*\
  !*** ./src/index.ts + 23 modules ***!
  \***********************************/
/*! exports provided: default */
/*! ModuleConcatenation bailout: Cannot concat with ./src/core/errors.ts because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/core/events.ts because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/core/observer.ts because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/demux/flv/flv-demuxer-inline.ts because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/demux/flv/flv.ts because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/polyfills/object-assign.js because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/utils/browser.ts because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/utils/log.ts because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/events/events.js (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/url-parse/index.js (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/webworkify-webpack/index.js (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/polyfills/object-assign.js
var object_assign = __webpack_require__("./src/polyfills/object-assign.js");

// EXTERNAL MODULE: ./node_modules/events/events.js
var events = __webpack_require__("./node_modules/events/events.js");

// EXTERNAL MODULE: ./src/utils/browser.ts
var browser = __webpack_require__("./src/utils/browser.ts");

// EXTERNAL MODULE: ./src/utils/log.ts
var log = __webpack_require__("./src/utils/log.ts");

// CONCATENATED MODULE: ./src/config.ts




var CLEANUP_DURATION_STEP = 10;
var URL_REG = new RegExp('^(http|https)://');
var DEFAULT_CONFIG = {
  webWorker: true,
  // 是否开启webworker
  autoCleanupMaxBackwardDuration: 60,
  // 清除sourcebuffer最大时间
  autoCleanupMinBackwardDuration: 15,
  // 清除sourcebuffer最小时间
  appendErrorMaxRetry: 3,
  // mse append出错后重试次数
  credentials: false,
  // 请求是否带cookie
  defaultSpts: -2000,
  debug: log["LOG_LEVEL"].LEVEL_ERROR,
  connectionTimeout: 10000,
  // 流连接超时
  transmissionTimeout: 30000,
  // 流传输超时
  stretchShortVideoTrack: false,
  maxBufferHole: 0.5,
  maxAudioFramesDrift: 5 // used by mp4-remuxer

};

var config_ConfigHelper =
/*#__PURE__*/
function () {
  function ConfigHelper() {}

  /**
   * 处理传入的config
   * @param {object} userConfig 传入config
   * @returns {object} config
   */
  ConfigHelper.processConfig = function processConfig(userConfig) {
    var config = Object(object_assign["ObjectAssign"])({}, DEFAULT_CONFIG);

    Object(object_assign["ObjectAssign"])(config, userConfig);

    ConfigHelper.setSrc(config);

    if (!window.Worker) {
      config.webWorker = false;
    }

    if (config.debug) {
      log["Log"].level(config.debug);
    }

    ConfigHelper.detectStreamingMux(config);
    config.autoCleanupMaxBackwardDuration = Math.max(config.autoCleanupMaxBackwardDuration, config.autoCleanupMinBackwardDuration + CLEANUP_DURATION_STEP);
    return config;
  };

  ConfigHelper.detectStreamingMux = function detectStreamingMux(config) {
    config.gopRemux = browser["default"].safari || browser["default"].opera && browser["default"].version.major < 37;
  }
  /**
   * 重新设置config的src
   * @param {object} config 传入config
   * @param {*} src src或manifest
   */
  ;

  ConfigHelper.setSrc = function setSrc(config, src) {
    if (src === void 0) {
      src = null;
    }

    if (src) {
      config.src = src;
      config.manifest = '';
    }

    if (typeof config.src === 'string' && !URL_REG.test(config.src)) {
      try {
        config.src = JSON.parse(config.src);
      } catch (e) {
        config.manifest = '';
      }
    }

    if (typeof config.src === 'object') {
      config.manifest = config.src;
      config.src = '';
    }
  };

  return ConfigHelper;
}();


// EXTERNAL MODULE: ./src/core/errors.ts
var errors = __webpack_require__("./src/core/errors.ts");

// EXTERNAL MODULE: ./src/core/events.ts
var core_events = __webpack_require__("./src/core/events.ts");

// CONCATENATED MODULE: ./src/core/media.ts
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Media =
/*#__PURE__*/
function () {
  function Media() {
    this._video = void 0;
    this._mse = void 0;
    this._streamTime = 0;
    this._localTime = 0;
  }

  var _proto = Media.prototype;

  _proto.reset = function reset() {
    this._streamTime = 0;
    this._localTime = 0;
  };

  _proto.attachVideo = function attachVideo(video) {
    this._video = video;
  };

  _proto.attachMSE = function attachMSE(mse) {
    this._mse = mse;
  }
  /**
   * 指定时间是否在video缓冲区内
   * @param sec time
   * @returns isTimeinBuffered
   */
  ;

  _proto.isTimeinBuffered = function isTimeinBuffered(sec) {
    if (this._video) {
      var buffered = this._video.buffered;

      for (var i = 0; i < buffered.length; i++) {
        if (sec >= buffered.start(i) && sec < buffered.end(i)) {
          return true;
        }
      }
    }

    return false;
  }
  /*
   * 计算video buffer量
   */
  ;

  _proto.bufferedSec = function bufferedSec() {
    if (this._video && this._video.buffered.length > 0) {
      return Math.max(0, this._video.buffered.end(this._video.buffered.length - 1) - this._video.currentTime);
    }

    return 0;
  }
  /**
   * 音频、视频的buffer长度
   * @param type video|audio
   */
  ;

  _proto.bufferedSecByType = function bufferedSecByType(type) {
    if (this._mse && this._video) {
      var end = this._mse.bufferedEndByType(type);

      if (end > 0) {
        return this._mse.bufferedEndByType(type) - this._video.currentTime;
      }
    }

    return 0;
  }
  /**
   * 音频、视频的buffer长度
   * @param type video|audio
   */
  ;

  _proto.mseBufferedSecByType = function mseBufferedSecByType(type) {
    if (this._mse) {
      return this._mse.bufferedByType(type);
    }

    return {
      start: 0,
      end: 0
    };
  }
  /**
   * 音频、视频buffer的段数
   * @param type video|audio
   */
  ;

  _proto.bufferSliceNumByType = function bufferSliceNumByType(type) {
    if (this._mse) {
      return this._mse.bufferSliceNumByType(type);
    }

    return 0;
  };

  _proto.pendingNum = function pendingNum() {
    if (this._mse) {
      return this._mse.pendingNum();
    }

    return 0;
  }
  /**
   * 待填充的buffer数据长度
   * @param type video|audio
   */
  ;

  _proto.pendingSecByType = function pendingSecByType(type) {
    if (this._mse) {
      return this._mse.pendingSecByType(type);
    }

    return 0;
  }
  /**
   * 指定时间所在的buffer区域结束时间，不在任何buffer区域时返回空
   * @param time 时间
   */
  ;

  _proto.currentBuffer = function currentBuffer(time) {
    if (this._video) {
      var buffered = this._video.buffered;

      for (var i = 0; i < buffered.length; i++) {
        var start = buffered.start(i);
        var end = buffered.end(i);

        if (start <= time && time < end) {
          return {
            start: start,
            end: end
          };
        }
      }
    }

    return undefined;
  }
  /**
   * 指定时间所在的buffer区域结束时间，不在任何buffer区域时返回空
   * @param time 时间
   */
  ;

  _proto.nextBuffer = function nextBuffer(time) {
    if (this._video) {
      var buffered = this._video.buffered;

      for (var i = 0; i < buffered.length; i++) {
        var start = buffered.start(i);
        var end = buffered.end(i);

        if (start > time) {
          return {
            start: start,
            end: end
          };
        }
      }
    }

    return undefined;
  }
  /**
   * 更新转封装后的时间对应关系
   * @param streamTime 流中的时间戳，秒
   * @param localTime 本地时间，秒
   */
  ;

  _proto.updateStreamTime = function updateStreamTime(streamTime, localTime) {
    this._streamTime = streamTime;
    this._localTime = localTime;
  }
  /**
   * 根据流时间推算对应的本地时间戳
   * @param streamTime 流时间
   */
  ;

  _proto.getLocalTime = function getLocalTime(streamTime) {
    if (this._streamTime) {
      return streamTime - this._streamTime + this._localTime;
    }

    return;
  };

  _createClass(Media, [{
    key: "video",
    get: function get() {
      return this._video;
    }
  }, {
    key: "mse",
    get: function get() {
      return this._mse;
    }
    /**
     * 获取MSE当前状态，mse.readyState
     */

  }, {
    key: "mseReadyState",
    get: function get() {
      if (this._mse) {
        return this._mse.readyState;
      }

      return 'closed';
    }
    /**
     * 获取MSE当前状态，mse.readyState
     */

  }, {
    key: "videoReadyState",
    get: function get() {
      if (this._video) {
        return this._video.readyState;
      }

      return 0;
    }
    /**
     * video当前播放时间
     */

  }, {
    key: "currentTime",
    get: function get() {
      if (this._video) {
        return this._video.currentTime;
      }

      return 0;
    }
  }]);

  return Media;
}();

/* harmony default export */ var core_media = (Media);
// CONCATENATED MODULE: ./src/utils/mediasource-helper.ts
/**
 * MediaSource helper
 */
function getMediaSource() {
  return window.MediaSource || window.WebKitMediaSource;
}
// CONCATENATED MODULE: ./src/core/mse-controller.ts
function mse_controller_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function mse_controller_createClass(Constructor, protoProps, staticProps) { if (protoProps) mse_controller_defineProperties(Constructor.prototype, protoProps); if (staticProps) mse_controller_defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }






 // append关闭时queue允许缓存的长度上限

var QUEUE_SIZE_LIMIT = 200 * 1024 * 1024;
var MIN_CLEANUP_DURATION = 10;
var mse_controller_CLEANUP_DURATION_STEP = 10;
var MAX_BUFFERED = 30;

var mse_controller_MSEController =
/*#__PURE__*/
function (_EventEmitter) {
  _inheritsLoose(MSEController, _EventEmitter);

  /**
   * Mediasource 控制层
   * @class Mediasource
   * @param {Element} videoElement videoElement
   * @param {object} config config
   */
  function MSEController(config) {
    var _this;

    _this = _EventEmitter.call(this) || this;
    _this.tag = 'mse-controller';
    _this._config = void 0;
    _this.video = void 0;
    _this._sourceBuffer = void 0;
    _this._mediaSource = null;
    _this._mimeCodec = void 0;
    _this._cleanUpTask = void 0;
    _this._appendQueue = void 0;
    _this._hasVideo = void 0;
    _this._hasAudio = void 0;
    _this._endOfData = false;
    _this._appendEnabled = void 0;
    _this._duration = null;
    _this._appendError = 0;
    _this._appendBufferError = false;
    _this._sbHandler = {};
    _this._souceBufferLocked = false;

    _this._onSourceOpen = function () {
      log["Log"].i(_this.tag, 'MediaSource onSourceOpen');

      if (_this._mediaSource) {
        _this._mediaSource.removeEventListener('sourceopen', _this._onSourceOpen);

        _this._checkSourceBuffer();

        _this.refresh();

        _this.emit('source_open');
      }
    };

    _this._onSourceEnded = function () {
      log["Log"].i(_this.tag, 'MediaSource onSourceEnded');
    };

    _this._onSourceClose = function () {
      log["Log"].i(_this.tag, 'MediaSource onSourceClose');

      if (_this._mediaSource) {
        _this._mediaSource.removeEventListener('sourceopen', _this._onSourceOpen);

        _this._mediaSource.removeEventListener('sourceended', _this._onSourceEnded);

        _this._mediaSource.removeEventListener('sourceclose', _this._onSourceClose);
      }
    };

    _this._onSourceBufferUpdateEnd = function (type) {
      _this._update(type);

      if (_this._endOfData) {
        _this._endOfStream();
      }

      _this.emit('updateend');
    };

    _this._onSourceBufferError = function (e) {
      log["Log"].e(_this.tag, "SourceBuffer Error: " + e);

      _this.emit(core_events["default"].ERROR, {
        type: errors["ErrorTypes"].MSE_ERROR,
        details: errors["ErrorDetails"].SOURCEBUFFER_ERROR,
        fatal: true,
        reason: 'source buffer error'
      });
    };

    _this._config = config;
    _this._hasVideo = false;
    _this._hasAudio = false;
    _this._appendQueue = {
      video: [],
      audio: [],
      audiovideo: []
    };
    _this._sourceBuffer = {};
    _this._cleanUpTask = {
      video: [],
      audio: [],
      audiovideo: []
    };
    _this._mimeCodec = {};
    _this._appendEnabled = true;
    return _this;
  }
  /**
   * 绑定HTMLvideo
   * @param video video
   */


  var _proto = MSEController.prototype;

  _proto.attach = function attach(video) {
    var _this2 = this;

    this.video = video;
    var MediaSourceDef = getMediaSource();

    if (MediaSourceDef) {
      var ms = this._mediaSource = new MediaSourceDef();
      this.video.src = URL.createObjectURL(ms);
      this.video.load();
      ms.addEventListener('sourceopen', this._onSourceOpen);
      ms.addEventListener('sourceended', this._onSourceEnded);
      ms.addEventListener('sourceclose', this._onSourceClose);
      this._souceBufferLocked = false;
    } else {
      setTimeout(function () {
        _this2.emit(core_events["default"].ERROR, {
          type: errors["ErrorTypes"].MSE_ERROR,
          details: errors["ErrorDetails"].MEDIASOURCE_ERROR,
          fatal: true,
          reason: 'MediaSource is not support'
        });
      }, 0);
    }
  }
  /**
   * mediaSource init
   * @param {Object} mediaInfo mediaInfo
   */
  ;

  _proto.trackInfo = function trackInfo(mediaInfo) {
    if ((this._hasAudio !== mediaInfo.hasAudio || this._hasVideo !== mediaInfo.hasVideo || !!mediaInfo.audiovideo !== !!this._mimeCodec.audiovideo) && this.video && this.hasSourceBuffer()) {
      // 音视频轨数量发生变化时需要重建mse
      log["Log"].i(this.tag, 'trackInfo rebuild mse');

      for (var type in this._sourceBuffer) {
        if (this._sourceBuffer[type] && this._sbHandler[type]) {
          this._sourceBuffer[type].removeEventListener('error', this._sbHandler[type].error);

          this._sourceBuffer[type].removeEventListener('updateend', this._sbHandler[type].updateend);
        }
      }

      this._sourceBuffer = {};

      if (this._mediaSource) {
        this._mediaSource.removeEventListener('sourceopen', this._onSourceOpen);

        this._mediaSource.removeEventListener('sourceended', this._onSourceEnded);

        this._mediaSource.removeEventListener('sourceclose', this._onSourceClose);
      }

      this._mimeCodec = {};
      this.attach(this.video);
    }

    if (!mediaInfo.audiovideo) {
      if (mediaInfo.hasAudio && mediaInfo.audioCodec) {
        this._mimeCodec.audio = "audio/mp4; codecs=\"" + mediaInfo.audioCodec + "\"";
      }

      if (mediaInfo.hasVideo && mediaInfo.videoCodec) {
        this._mimeCodec.video = "video/mp4; codecs=\"" + mediaInfo.videoCodec + "\"";
      }
    } else {
      this._mimeCodec.audiovideo = "video/mp4; codecs=\"" + mediaInfo.codec + "\"";
    }

    this._hasAudio = this._hasAudio || mediaInfo.hasAudio;
    this._hasVideo = this._hasVideo || mediaInfo.hasVideo;

    this._checkSourceBuffer();
  }
  /**
   * 检查track是否已获取codec
   */
  ;

  _proto._checkSourceBuffer = function _checkSourceBuffer() {
    var expected = (this._hasAudio ? 1 : 0) + (this._hasVideo ? 1 : 0);
    var codecs = (this._mimeCodec.audio ? 1 : 0) + (this._mimeCodec.video ? 1 : 0);

    if (this._mimeCodec.audiovideo) {
      expected = 1;
      codecs = 1;
    }

    log["Log"].v(this.tag, 'checkSourceBuffer', expected, codecs, this._mimeCodec);

    if (this._mediaSource && this._mediaSource.readyState === 'open' && expected > 0 && codecs >= expected) {
      for (var type in this._mimeCodec) {
        if (this._mimeCodec[type]) {
          this._addSourceBuffer(type);
        }
      }
    }
  }
  /**
   * mediaSource open
   */
  ;

  /**
   * addSourceBuffer
   * @param {String} type type
   */
  _proto._addSourceBuffer = function _addSourceBuffer(type) {
    var _this3 = this;

    if (this._sourceBuffer[type] || this._souceBufferLocked) {
      return;
    }

    try {
      if (this._mediaSource) {
        this._sourceBuffer[type] = this._mediaSource.addSourceBuffer(this._mimeCodec[type]);
      }
    } catch (e) {
      log["Log"].e(this.tag, e);
      this.emit(core_events["default"].ERROR, {
        type: errors["ErrorTypes"].MSE_ERROR,
        details: errors["ErrorDetails"].ADDSOURCEBUFFER_ERROR,
        fatal: true,
        reason: e.message
      });
      return;
    }

    var sb = this._sourceBuffer[type];
    this._sbHandler[type] = {
      updateend: function updateend() {
        _this3._onSourceBufferUpdateEnd(type);
      },
      error: function error(e) {
        _this3._onSourceBufferError(e);
      }
    };
    sb.addEventListener('error', this._sbHandler[type].error);
    sb.addEventListener('updateend', this._sbHandler[type].updateend);

    if (this._duration && this._mediaSource) {
      this._mediaSource.duration = this._duration;
    }
  }
  /**
   * 是否有待处理的数据
   */
  ;

  _proto._hasPendingData = function _hasPendingData() {
    return !!(this._appendQueue && (this._appendQueue.video && this._appendQueue.video.length || this._appendQueue.audio && this._appendQueue.audio.length));
  }
  /**
   * 刷新MSE，计算一次清理任务，尝试重启填充buffer任务
   */
  ;

  _proto.refresh = function refresh() {
    for (var type in this._sourceBuffer) {
      this._update(type);
    }
  }
  /**
   * 填充mse sourcebuffer
   */
  ;

  _proto._doAppend = function _doAppend(type) {
    if (this._hasPendingData()) {
      if (!this._appendEnabled) {
        var size = this._getBufferQueueSize();

        if (size > QUEUE_SIZE_LIMIT && !this._appendBufferError) {
          this._appendBufferError = true;
          this.emit(core_events["default"].ERROR, {
            type: errors["ErrorTypes"].MSE_ERROR,
            details: errors["ErrorDetails"].APPENDBUFFER_ERROR,
            fatal: true,
            reason: 'bufferfull'
          });
        }

        return;
      }

      if (this._appendQueue[type].length > 0 && this._sourceBuffer[type] && !this._sourceBuffer[type].updating && !this._appendBufferError) {
        var data = this._appendQueue[type].shift();

        this._appendBuffer(data, type);
      }
    }
  }
  /**
   * 转封装后fmp4数据
   * @param segment segment
   */
  ;

  _proto.mediaSegment = function mediaSegment(segment) {
    var type = segment.type;
    var queue = this._appendQueue[type];

    if (!this._souceBufferLocked || this._sourceBuffer[type]) {
      queue.push(segment);
    }

    if (this._sourceBuffer[type]) {
      this._souceBufferLocked = true;

      this._update(type);
    }
  }
  /**
   * mse buffer范围，秒
   * @param type video|audio|audiovideo
   */
  ;

  _proto.bufferedByType = function bufferedByType(type) {
    var sb = this._sourceBuffer[type];

    if (sb && sb.buffered.length > 0) {
      return {
        start: sb.buffered.start(0),
        end: sb.buffered.end(sb.buffered.length - 1)
      };
    }

    return {
      start: 0,
      end: 0
    };
  }
  /**
   * mse buffer结束时间点，秒
   * @param type video|audio|audiovideo
   */
  ;

  _proto.bufferedEndByType = function bufferedEndByType(type) {
    var sb = this._sourceBuffer[type];

    if (sb && sb.buffered.length > 0) {
      return sb.buffered.end(sb.buffered.length - 1);
    }

    return 0;
  }
  /**
   * mse buffer的分段数量，正常情况不大于1
   * @param type video|audio|audiovideo
   */
  ;

  _proto.bufferSliceNumByType = function bufferSliceNumByType(type) {
    var sb = this._sourceBuffer[type];

    if (sb) {
      return sb.buffered.length;
    }

    return 0;
  }
  /**
   * 待填充buffer长度
   * @param type video|audio|audiovideo
   */
  ;

  _proto.pendingSecByType = function pendingSecByType(type) {
    var buffer = this._appendQueue[type];

    if (buffer) {
      return buffer.reduce(function (prev, current) {
        return prev + current.duration;
      }, 0);
    }

    return 0;
  }
  /**
   * 待填充buffer数量
   */
  ;

  _proto.pendingNum = function pendingNum() {
    var num = 0;

    for (var type in this._appendQueue) {
      num += this._appendQueue[type].length;
    }

    return num;
  }
  /**
   * 根据填充策略计算需要缓存清理的范围
   * @param type video|audio|audiovideo
   */
  ;

  _proto._calculateRemoveRange = function _calculateRemoveRange(type) {
    var video = this.video;

    if (!video || video.seeking) {
      return;
    }

    var time = video.currentTime;

    if (this._sourceBuffer[type]) {
      var task = this._cleanUpTask[type];
      var buffered = this._sourceBuffer[type].buffered;

      if (buffered.length >= 1 && time - buffered.start(0) >= this._config.autoCleanupMaxBackwardDuration) {
        var end = time - this._config.autoCleanupMinBackwardDuration;

        if (task.length) {
          if (task[task.length - 1].start === 0 && task[task.length - 1].end === end) {
            return;
          }
        }

        task.push({
          start: 0,
          end: end
        });
      }
    }
  }
  /**
   * 尝试清理sourcebufer缓存
   * @param sb 需要清理的sourceBuffer
   * @param range 需要清理的范围
   */
  ;

  _proto._cleanUpRange = function _cleanUpRange(type, range) {
    var sb = this._sourceBuffer[type];

    if (sb) {
      if (!sb.updating) {
        try {
          for (var i = 0; i < sb.buffered.length; i++) {
            var bufStart = browser["default"].firefox ? 0 : sb.buffered.start(i);
            var bufEnd = sb.buffered.end(i);
            var removeStart = Math.max(bufStart, range.start);
            var removeEnd = Math.min(bufEnd, range.end);
            /**
             * remove不一定准确按照指定值进行，remove长度小于500ms，可能无效
             */

            if (removeEnd > removeStart) {
              sb.remove(removeStart, removeEnd);
              this.emit('remove'); // 多段buffer时可能需要多次清理

              if (i < sb.buffered.length - 1) {
                return false;
              }
            }
          }
        } catch (error) {}
      } else {
        return false;
      }
    }

    return true;
  }
  /**
   * 向sourcebuffer中填充数据
   * @param data data
   * @param type type
   */
  ;

  _proto._appendBuffer = function _appendBuffer(data, type) {
    if (!this._sourceBuffer[type] || !this.video || this.video.error) {
      return;
    }

    try {
      this._sourceBuffer[type].appendBuffer(data.data.buffer);
    } catch (e) {
      log["Log"].w(this.tag, e.code, e);

      if (e.code !== 22) {
        if (this._appendError) {
          this._appendError++;
        } else {
          this._appendError = 1;
        }

        if (this._appendError > this._config.appendErrorMaxRetry) {
          this._appendBufferError = true;
          this.emit(core_events["default"].ERROR, {
            type: errors["ErrorTypes"].MSE_ERROR,
            details: errors["ErrorDetails"].APPENDBUFFER_ERROR,
            fatal: true,
            reason: e.message
          });
        } else {
          this._appendQueue[type].unshift(data);
        }
      } else {
        var v = this.video,
            conf = this._config;
        this._appendEnabled = false;

        this._appendQueue[type].unshift(data);

        var buffered = v.buffered.end(v.buffered.length - 1) - v.currentTime; // mse bufferfull 降级策略

        var useless = v.currentTime - v.buffered.start(0);

        if (buffered < MAX_BUFFERED) {
          //  修改buffer清理阈值并清理buffer
          if (useless < conf.autoCleanupMaxBackwardDuration) {
            conf.autoCleanupMaxBackwardDuration = Math.max(conf.autoCleanupMaxBackwardDuration / 2, MIN_CLEANUP_DURATION + mse_controller_CLEANUP_DURATION_STEP);
            conf.autoCleanupMinBackwardDuration = MIN_CLEANUP_DURATION;
          }

          this._calculateRemoveRange(type);

          if (this.hasCleanUpTask(type)) {
            this._cleanUp(type);
          }
        } else if (useless < conf.autoCleanupMinBackwardDuration) {
          //  已满足buffer阈值，抛错
          this.emit(core_events["default"].ERROR, {
            type: errors["ErrorTypes"].MSE_ERROR,
            details: errors["ErrorDetails"].APPENDBUFFER_ERROR,
            fatal: true,
            reason: 'buffer full, append error'
          });
        }

        log["Log"].i(this.tag, 'mse bufferfull');
        this.emit('bufferFull');
      }
    }
  }
  /**
   * sourcebuffer end
   */
  ;

  /**
   * 清理mse sourcebuffer缓存
   * @param startSec 开始时间点，未指从0点开始
   * @param endSec 结束时间点，未指定时结束点为正无穷大
   * @param flushType 类型，未指定时清理所有sourcebuffe
   */
  _proto.flush = function flush(startSec, endSec, flushType) {
    var start = 0,
        end = Number.POSITIVE_INFINITY;
    this._endOfData = false; // 计算清理范围

    for (var type in this._sourceBuffer) {
      if (flushType && flushType !== type) {
        continue;
      }

      var sb = this._sourceBuffer[type];

      if (!sb) {
        continue;
      } // 清理未填充数据


      if (startSec) {
        start = Math.max(start, startSec);

        for (var i = this._appendQueue[type].length - 1; i >= 0; i--) {
          if (!this._appendQueue[type][i].startPTS || this._appendQueue[type][i].startPTS >= startSec) {
            this._appendQueue[type].pop();
          } else {
            break;
          }
        }
      } else {
        this._appendQueue[type] = [];
      }

      if (endSec) {
        end = Math.min(end, endSec);
      }

      this._cleanUpTask[type].push({
        start: start,
        end: end
      });

      this._cleanUp(type);
    }

    this._appendEnabled = true;
  }
  /**
   * 是否开启buffer填充
   * @param value 开关
   */
  ;

  _proto.setAppendEnabled = function setAppendEnabled(value) {
    if (!this._appendEnabled && value) {
      this._appendEnabled = value;
      this.refresh();
    } else {
      this._appendEnabled = value;
    }
  };

  _proto.getAppendEnabled = function getAppendEnabled() {
    return this._appendEnabled;
  };

  _proto.endOfData = function endOfData() {
    this._endOfData = true;

    if (!this._hasPendingData()) {
      this._endOfStream();
    }
  };

  _proto.ended = function ended() {
    return this._endOfData;
  };

  _proto._endOfStream = function _endOfStream() {
    var ms = this._mediaSource;

    if (!ms || ms.readyState !== 'open') {
      return;
    }

    for (var type in this._sourceBuffer) {
      var sb = this._sourceBuffer[type];

      if (sb && sb.updating) {
        return;
      }
    }

    try {
      ms.endOfStream();
    } catch (error) {
      log["Log"].e(this.tag, error);
      this.emit(core_events["default"].ERROR, {
        type: errors["ErrorTypes"].MSE_ERROR,
        details: errors["ErrorDetails"].ENDOFSTREAM_ERROR,
        fatal: true,
        reason: error.message
      });
    }
  }
  /**
   * destroy
   */
  ;

  _proto.destroy = function destroy() {
    if (this._mediaSource) {
      var ms = this._mediaSource; // pending segments should be discard
      // remove all sourcebuffers

      this._endOfStream();

      if (ms.readyState !== 'closed') {
        for (var type in this._sourceBuffer) {
          if (this._sourceBuffer[type] && this._sbHandler[type]) {
            this._sourceBuffer[type].removeEventListener('error', this._sbHandler[type].error);

            this._sourceBuffer[type].removeEventListener('updateend', this._sbHandler[type].updateend);

            ms.removeSourceBuffer(this._sourceBuffer[type]);
          }
        }
      }

      ms.removeEventListener('sourceopen', this._onSourceOpen);
      ms.removeEventListener('sourceended', this._onSourceEnded);
      ms.removeEventListener('sourceclose', this._onSourceClose);
      this._mediaSource = null;
    }

    this.removeAllListeners();
    this._appendQueue = {};
    this._mimeCodec = {};
    this._cleanUpTask = {};
    this._sourceBuffer = {};
    this._sbHandler = {};
  }
  /**
   * 是否有未完成的清理任务
   * @param type video|audio|audiovideo
   */
  ;

  _proto.hasCleanUpTask = function hasCleanUpTask(type) {
    var num = 0;

    if (typeof type === 'undefined') {
      for (var _type in this._cleanUpTask) {
        num += this._cleanUpTask[_type].length;
      }
    } else {
      if (this._cleanUpTask[type]) {
        num = this._cleanUpTask[type].length;
      }
    }

    return num > 0;
  };

  _proto.hasSourceBuffer = function hasSourceBuffer() {
    return !!Object.keys(this._sourceBuffer).length;
  };

  _proto._getBufferQueueSize = function _getBufferQueueSize() {
    var num = 0;

    for (var type in this._appendQueue) {
      num += this._appendQueue[type].reduce(function (prev, current) {
        if (current.data && current.data.byteLength) {
          return prev + current.data.byteLength;
        }

        return prev;
      }, 0);
    }

    return num;
  }
  /**
   * 待填充队列中的数据时长
   * @param {string} type video|audio|audiovideo，为空时返回video|audio最大值
   * @returns {number} 时长
   */
  ;

  _proto.getBufferQueueSec = function getBufferQueueSec(type) {
    var _this4 = this;

    if (!this._appendQueue) {
      return 0;
    }

    var keys;

    if (type) {
      keys = [type];
    } else {
      keys = Object.keys(this._appendQueue);
    }

    return keys.reduce(function (prev, current) {
      if (_this4._appendQueue[current] && _this4._appendQueue[current].length > 0 && (Object.keys(_this4._sourceBuffer).length === 0 || _this4._sourceBuffer[current])) {
        return Math.max(prev, _this4._appendQueue[current].reduce(function (prevDuration, currentSeg) {
          if (currentSeg.duration) {
            return prevDuration + currentSeg.duration;
          }

          return prevDuration;
        }, 0));
      }

      return prev;
    }, 0);
  }
  /**
   * 获取MSE当前状态，mse.readyState
   */
  ;

  /**
   * 更新souceBuffer，清理或填充
   */
  _proto._update = function _update(type) {
    if (this.hasCleanUpTask(type)) {
      this._cleanUp(type);
    }

    this._doAppend(type);
  }
  /**
   * 执行清理任务
   * @param type video|audio|audiovideo
   */
  ;

  _proto._cleanUp = function _cleanUp(type) {
    var range = this._cleanUpTask[type];

    while (range && range.length) {
      var item = range[0];

      if (this._cleanUpRange(type, item)) {
        range.shift();
      } else {
        return;
      }
    }

    this.refresh();
  };

  mse_controller_createClass(MSEController, [{
    key: "readyState",
    get: function get() {
      if (this._mediaSource) {
        return this._mediaSource.readyState;
      }

      return 'closed';
    }
  }]);

  return MSEController;
}(events["EventEmitter"]);


// EXTERNAL MODULE: ./node_modules/webworkify-webpack/index.js
var webworkify_webpack = __webpack_require__("./node_modules/webworkify-webpack/index.js");
var webworkify_webpack_default = /*#__PURE__*/__webpack_require__.n(webworkify_webpack);

// EXTERNAL MODULE: ./node_modules/url-parse/index.js
var url_parse = __webpack_require__("./node_modules/url-parse/index.js");
var url_parse_default = /*#__PURE__*/__webpack_require__.n(url_parse);

// CONCATENATED MODULE: ./src/abr/abr-get-url.ts

/**
 * 生成切换flv的请求地址
 * @param url 流地址
 * @param spts 切换时间戳，单位毫秒。大于0：关键帧pts；小于0：直播延迟
 */

function abrGetUrl(url, spts) {
  if (typeof spts === 'undefined') {
    return url;
  }

  var urlparse = new url_parse_default.a(url, true);
  urlparse.query.lasSpts = "" + spts;
  return urlparse.toString();
}
// CONCATENATED MODULE: ./src/abr/abr-level.ts
var AbrLevel = function AbrLevel(url) {
  this.url = void 0;
  this.bitrate = 0;
  this.maxBitrate = 0;
  this.avgBitrate = 0;
  this.qualityType = '';
  this.qualityLabel = '';
  this.id = 0;
  this.codec = '';
  this.hidden = false;
  this.enableAdaptive = true;
  this.defaultSelect = false;
  this.url = url;
};


// CONCATENATED MODULE: ./src/abr/abr-manifest.ts
function abr_manifest_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function abr_manifest_createClass(Constructor, protoProps, staticProps) { if (protoProps) abr_manifest_defineProperties(Constructor.prototype, protoProps); if (staticProps) abr_manifest_defineProperties(Constructor, staticProps); return Constructor; }



/**
 * las manifest
 */
var abr_manifest_AbrManifest =
/*#__PURE__*/
function () {
  /**
   * 验证las manifest数据
   * @param data 输入数据
   */
  AbrManifest.verify = function verify(data) {
    if (data && data.hasOwnProperty('version') && data.hasOwnProperty('adaptationSet') && Array.isArray(data.adaptationSet) && data.adaptationSet.length > 0) {
      return data.adaptationSet.reduce(function (prev, item) {
        return !!(prev && item.representation && item.representation.length);
      }, true);
    }

    return false;
  };

  function AbrManifest(manifest) {
    var _this = this;

    this._levels = [];
    this._abrLevels = [];
    this._default = void 0;

    if (AbrManifest.verify(manifest)) {
      manifest.adaptationSet[0].representation.sort(function (a, b) {
        return a.maxBitrate - b.maxBitrate;
      });
      manifest.adaptationSet[0].representation.forEach(function (item, index) {
        var level = new AbrLevel(item.url);
        level.id = item.id || 0;
        level.maxBitrate = item.maxBitrate || 0;
        level.avgBitrate = item.avgBitrate || 0;
        level.bitrate = level.maxBitrate;
        level.qualityType = item.qualityType || '';
        level.qualityLabel = item.qualityLabel || '';
        level.codec = item.codecs || '';
        level.hidden = item.hidden || false;
        level.enableAdaptive = typeof item.disableAdaptive === 'undefined' ? true : !item.disableAdaptive;
        level.defaultSelect = item.defaultSelect || false;

        _this._levels.push(level);

        if (level.enableAdaptive) {
          _this._abrLevels.push(index);
        }

        if (level.defaultSelect && typeof _this._default === 'undefined') {
          _this._default = index;
        }
      });
    } else {
      return;
    }
  }
  /**
   * 码率列表
   */


  abr_manifest_createClass(AbrManifest, [{
    key: "levels",
    get: function get() {
      return this._levels;
    }
    /**
     * 可用于自适应切换的码率index列表
     */

  }, {
    key: "abrLevels",
    get: function get() {
      return this._abrLevels;
    }
    /**
     * 默认起播清晰度
     */

  }, {
    key: "default",
    get: function get() {
      return this._default || 0;
    }
  }]);

  return AbrManifest;
}();
// EXTERNAL MODULE: ./src/core/observer.ts
var core_observer = __webpack_require__("./src/core/observer.ts");

// CONCATENATED MODULE: ./src/utils/matrix.ts


var matrix_type = function type(input) {
  switch (input.constructor.name) {
    case 'Int8Array':
      return Int8Array;

    case 'Uint8Array':
      return Uint8Array;

    case 'Int16Array':
      return Int16Array;

    case 'Uint16Array':
      return Uint16Array;

    case 'Int32Array':
      return Int32Array;

    case 'Uint32Array':
      return Uint32Array;

    case 'Uint8ClampedArray':
      return Uint8ClampedArray;

    case 'Float64Array':
      return Float64Array;

    default:
      return Float32Array;
  }
};

var flatten = function flatten(input) {
  return input.reduce(function (acc, next) {
    return acc.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
};

var shape = function shape(input) {
  return Array.isArray(input) ? [input.length].concat(shape(input[0])) : [];
};

var isTypedArray = function isTypedArray(input) {
  return !!(input && input.buffer instanceof ArrayBuffer && input.BYTES_PER_ELEMENT);
};

var matrix_Matrix =
/*#__PURE__*/
function () {
  /**
   * Static method. Adds two matrices `a` and `b` together.
   */
  Matrix.add = function add(a, b) {
    return a.copy().add(b);
  }
  /**
   * Static method. Subtracts the matrix `b` from matrix `a`.
   */
  ;

  Matrix.subtract = function subtract(a, b) {
    return a.copy().subtract(b);
  }
  /**
   * Static method. Augments two matrices `a` and `b` of matching dimensions
   * (appends `b` to `a`).
   */
  ;

  Matrix.augment = function augment(a, b) {
    return a.copy().augment(b);
  }
  /**
   * Static method. Multiplies two matrices `a` and `b` of matching dimensions.
   */
  ;

  Matrix.multiply = function multiply(a, b) {
    return a.multiply(b);
  }
  /**
   * Static method. Creates an `r x c` matrix containing zeros (`0`), takes an
   * optional `type` argument which should be an instance of `TypedArray`.
   */
  ;

  Matrix.zeros = function zeros(r, c, type) {
    if (type === void 0) {
      type = Float32Array;
    }

    return Matrix.fill(r, c, 0, type);
  }
  /**
   * Static method. Creates a `r x c` matrix containing optional 'value' (default 0), takes
   * an optional `type` argument which should be an instance of `TypedArray`.
   */
  ;

  Matrix.fill = function fill(r, c, value, type) {
    if (value === void 0) {
      value = 0;
    }

    if (type === void 0) {
      type = Float32Array;
    }

    if (r <= 0 || c <= 0) {
      throw new Error('invalid size');
    }

    var size = r * c;
    var data = new type(size);
    return new Matrix(data, {
      shape: [r, c]
    }).fill(value);
  };

  /**
   * Static method. Creates an identity matrix of `size`, takes an optional `type` argument
   * which should be an instance of `TypedArray`.
   */
  Matrix.identity = function identity(size, type) {
    if (type === void 0) {
      type = Float32Array;
    }

    return Matrix.fill(size, size, function (i) {
      return i % size === Math.floor(i / size) ? 1 : 0;
    }, type);
  };

  function Matrix(data, options) {
    this.data = new Float32Array(0);
    this.length = 0;
    this.shape = [0];
    this.type = Float32Array;

    if (typeof data === 'number' && typeof options === 'number') {
      this._init(new Float32Array(data * options), {
        shape: [data, options]
      });
    } else {
      this._init(data, options);
    }
  }

  var _proto = Matrix.prototype;

  _proto._init = function _init(data, options) {
    if (isTypedArray(data)) {
      this.data = data;
      this.shape = typeof options === 'object' ? options.shape : [this.data.length];
      this.length = this.data.length;
      this.type = matrix_type(data);
    } else if (data instanceof Array) {
      this.data = new Float32Array(flatten(data));
      this.shape = shape(data);
      this.length = this.data.length;
    } else if (data instanceof Matrix) {
      return data.copy();
    }
  };

  _proto.multiply = function multiply(matrix) {
    var _this$shape = this.shape,
        r1 = _this$shape[0],
        c1 = _this$shape[1];
    var _matrix$shape = matrix.shape,
        r2 = _matrix$shape[0],
        c2 = _matrix$shape[1];

    if (c1 !== r2) {
      throw new Error('sizes do not match');
    }

    var d1 = this.data;
    var d2 = matrix.data;
    var data = new this.type(r1 * c2);
    var i;
    var j;
    var k;
    var sum;

    for (i = 0; i < r1; i += 1) {
      for (j = 0; j < c2; j += 1) {
        sum = 0;

        for (k = 0; k < c1; k += 1) {
          sum += d1[i * c1 + k] * d2[j + k * c2];
        }

        data[i * c2 + j] = sum;
      }
    }

    return new Matrix(data, {
      shape: [r1, c2]
    });
  }
  /**
   * Adds `x` multiplied by `alpha` to the current array.
   */
  ;

  _proto.add = function add(x, alpha) {
    if (alpha === void 0) {
      alpha = 1;
    }

    this.equilateral(x);
    this.equidimensional(x);
    var d1 = this.data,
        l1 = this.length;
    var d2 = x.data;
    var i;

    for (i = 0; i < l1; i += 1) {
      d1[i] += alpha * d2[i];
    }

    return this;
  }
  /**
   * Subtracts `x` to the current array.
   */
  ;

  _proto.subtract = function subtract(x) {
    return this.add(x, -1);
  }
  /**
   * Augments `matrix` with current matrix.
   */
  ;

  _proto.augment = function augment(matrix) {
    var _this$shape2 = this.shape,
        r1 = _this$shape2[0],
        c1 = _this$shape2[1];
    var _matrix$shape2 = matrix.shape,
        r2 = _matrix$shape2[0],
        c2 = _matrix$shape2[1];

    if (r2 === 0 || c2 === 0) {
      return this;
    }

    if (r1 !== r2) {
      throw new Error('rows do not match');
    }

    var d1 = this.data;
    var d2 = matrix.data;
    var length = c1 + c2;
    var data = new this.type(length * r1);
    var i;
    var j;

    for (i = 0; i < r1; i += 1) {
      for (j = 0; j < c1; j += 1) {
        data[i * length + j] = d1[i * c1 + j];
      }
    }

    for (i = 0; i < r2; i += 1) {
      for (j = 0; j < c2; j += 1) {
        data[i * length + j + c1] = d2[i * c2 + j];
      }
    }

    this.shape = [r1, length];
    this.length = data.length;
    this.data = data;
    return this;
  }
  /**
   * Fills the array with a scalar value, takes an optional `type` argument
   * which should be an instance of `TypedArray`.
   */
  ;

  _proto.fill = function fill(value) {
    if (value === void 0) {
      value = 0;
    }

    var data = this.data,
        length = this.length;
    var i;

    for (i = 0; i < length; i += 1) {
      data[i] = value instanceof Function ? value(i) : value;
    }

    return this;
  }
  /**
   * Transposes a matrix (mirror across the diagonal).
   */
  ;

  _proto.transpose = function transpose() {
    var _this$shape3 = this.shape,
        r = _this$shape3[0],
        c = _this$shape3[1];
    var data = new this.type(c * r);
    var i;
    var j;

    for (i = 0; i < r; i += 1) {
      for (j = 0; j < c; j += 1) {
        data[j * r + i] = this.data[i * c + j];
      }
    }

    return new Matrix(data, {
      shape: [c, r]
    });
  }
  /**
   * Determines the inverse of any invertible square matrix using
   * Gaussian elimination.
   */
  ;

  _proto.inverse = function inverse() {
    var _this$shape4 = this.shape,
        r = _this$shape4[0],
        c = _this$shape4[1];

    if (r !== c) {
      throw new Error('invalid dimensions');
    }

    var identity = Matrix.identity(r);
    var augmented = Matrix.augment(this, identity);
    var gauss = augmented.gauss();
    var left = Matrix.zeros(r, c);
    var right = Matrix.zeros(r, c);
    var n = gauss.shape[1];
    var i;
    var j;

    for (i = 0; i < r; i += 1) {
      for (j = 0; j < n; j += 1) {
        if (j < c) {
          left.set(i, j, gauss.get(i, j));
        } else {
          right.set(i, j - r, gauss.get(i, j));
        }
      }
    }

    if (!left.equals(Matrix.identity(r))) {
      throw new Error('matrix is not invertible');
    }

    return right;
  }
  /**
   * Performs Gaussian elimination on a matrix.
   */
  ;

  _proto.gauss = function gauss() {
    var _this$shape5 = this.shape,
        r = _this$shape5[0],
        c = _this$shape5[1];
    var copy = this.copy();
    var lead = 0;
    var pivot;
    var leadValue;
    var i;
    var j;
    var k;

    for (i = 0; i < r; i += 1) {
      if (c <= lead) {
        throw new Error('matrix is singular');
      }

      j = i;

      while (copy.data[j * c + lead] === 0) {
        j += 1;

        if (r === j) {
          j = i;
          lead += 1;

          if (c === lead) {
            throw new Error('matrix is singular');
          }
        }
      }

      copy.swap(i, j);
      pivot = copy.data[i * c + lead];

      if (pivot !== 0) {
        for (k = 0; k < c; k += 1) {
          copy.data[i * c + k] = copy.data[i * c + k] / pivot;
        }
      }

      for (j = 0; j < r; j += 1) {
        leadValue = copy.data[j * c + lead];

        if (j !== i) {
          for (k = 0; k < c; k += 1) {
            copy.data[j * c + k] = copy.data[j * c + k] - copy.data[i * c + k] * leadValue;
          }
        }
      }

      lead += 1;
    }

    for (i = 0; i < r; i += 1) {
      pivot = 0;

      for (j = 0; j < c; j += 1) {
        if (pivot === 0) {
          pivot = copy.data[i * c + j];
        }
      }

      if (pivot === 0) {
        for (k = 0; k < c; k += 1) {
          copy.data[i * c + k] = copy.data[i * c + k] / pivot;
        }
      }
    }

    return copy;
  }
  /**
   * Checks if current array and `x` are equal.
   */
  ;

  _proto.equals = function equals(x) {
    this.equilateral(x);
    this.equidimensional(x);
    var d1 = this.data,
        l1 = this.length;
    var d2 = x.data;
    var i;

    for (i = 0; i < l1; i += 1) {
      if (d1[i] !== d2[i]) {
        return false;
      }
    }

    return true;
  }
  /**
   * Check if `i` and `j` is within the bounds for current matrix.
   */
  ;

  _proto.check = function check(i, j) {
    var _this$shape6 = this.shape,
        r = _this$shape6[0],
        c = _this$shape6[1];

    if (isNaN(i) || isNaN(j)) {
      throw new Error('one of the indices is not a number');
    }

    if (i < 0 || j < 0 || i > r - 1 || j > c - 1) {
      throw new Error('index out of bounds');
    }
  }
  /**
   * Sets the element at row `i`, column `j` to value
   */
  ;

  _proto.set = function set(i, j, value) {
    this.check(i, j);
    this.data[i * this.shape[1] + j] = value;
    return this;
  }
  /**
   * Gets the value of the element in row `i`, column `j` of current matrix
   */
  ;

  _proto.get = function get(i, j) {
    this.check(i, j);
    return this.data[i * this.shape[1] + j];
  }
  /**
   * Swaps two rows `i` and `j` in a matrix
   */
  ;

  _proto.swap = function swap(i, j) {
    var _this$shape7 = this.shape,
        r = _this$shape7[0],
        c = _this$shape7[1];

    if (i < 0 || j < 0 || i > r - 1 || j > r - 1) {
      throw new Error('index out of bounds');
    }

    if (this.data.slice) {
      var copy = this.data.slice(i * c, (i + 1) * c);
      this.data.copyWithin(i * c, j * c, (j + 1) * c);
      this.data.set(copy, j * c);
    } else {
      // IE 11 无 slice copyWithin 方法
      var D = this.data.constructor;

      var _copy = new D(this.data.buffer.slice(0));

      this.data.set(_copy.subarray(i * c, (i + 1) * c), j * c);
      this.data.set(_copy.subarray(j * c, (j + 1) * c), i * c);
    }

    return this;
  }
  /**
   * Makes a copy of the class and underlying data
   */
  ;

  _proto.copy = function copy() {
    var copy = Object(object_assign["ObjectAssign"])(Object.create(Object.getPrototypeOf(this)), this);

    copy.data = new this.type(this.data);
    copy.shape = this.shape;
    copy.length = this.length;
    copy.type = this.type;
    return copy;
  }
  /**
   * Asserts if current array and `x` have the same shape
   */
  ;

  _proto.equidimensional = function equidimensional(x) {
    var s1 = this.shape;
    var s2 = x.shape;

    if (!s1.every(function (dim, i) {
      return dim === s2[i];
    })) {
      throw new Error("shapes " + s1 + " and " + s2 + " do not match");
    }
  }
  /**
   * Asserts if current array and `x` have the same length
   */
  ;

  _proto.equilateral = function equilateral(x) {
    var l1 = this.length;
    var l2 = x.length;

    if (l1 !== l2) {
      throw new Error("lengths " + l1 + " and " + l2 + " do not match");
    }
  };

  return Matrix;
}();
// CONCATENATED MODULE: ./src/abr/abr-algorithm.ts



function abr_algorithm_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function abr_algorithm_createClass(Constructor, protoProps, staticProps) { if (protoProps) abr_algorithm_defineProperties(Constructor.prototype, protoProps); if (staticProps) abr_algorithm_defineProperties(Constructor, staticProps); return Constructor; }

function abr_algorithm_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }




var abr_algorithm_tag = 'algorithm-flv';
var CONFIG = {
  beacon: false,
  // 算法上报开关
  predictStep: 5,
  minBuffer: 0.2,
  // 最小buffer长度
  bufferOffset: -1,
  duration: 2,
  // 切片长度
  smoothRatioToTarget: 0.25,
  speedSmoothRatio: 0.5,
  switchPenalty: 1.5 * 1e-6,
  slidingWindowSize: 3,
  kalmanR: Math.pow(0.2, 2),
  kalmanQ: 4e-4,
  initBitrateLevel: 3,
  // 起播清晰度
  speedPredictNum: 3 // 根据速度预测次数

};
/**
 * HLS自适应码率算法入口
 */

var abr_algorithm_AbrAlgorithm =
/*#__PURE__*/
function (_EventEmitter) {
  abr_algorithm_inheritsLoose(AbrAlgorithm, _EventEmitter);

  // 当前正在加载的流index
  // 下一个切换的流index
  function AbrAlgorithm() {
    var _this;

    _this = _EventEmitter.call(this) || this;
    _this.MATRIX_E = void 0;
    _this.MATRIX_G = void 0;
    _this._conf = void 0;
    _this._xPrev = 0;
    _this._PPrev = 0;
    _this._pastBuffer = void 0;
    _this._pastThroughput = void 0;
    _this._levels = void 0;
    _this._availableList = void 0;
    _this._current = 0;
    _this._next = 0;
    return _this;
  }
  /**
   * 初始化，并写入初始码率
   * @param manifest 流信息
   * @param config 算法配置
   */


  var _proto = AbrAlgorithm.prototype;

  _proto.init = function init(manifest, config) {
    // TODO: config
    this._processConfig(config);

    log["Log"].i(abr_algorithm_tag, 'init', manifest, config, this._conf);
    this._levels = manifest.levels.slice(0); // TODO: default与config.initBitrateLevel冲突

    this._current = manifest.default; // initialize the parameters

    this._next = 0;
    this._pastBuffer = [0, 0];
    this._pastThroughput = new Array(this._conf.slidingWindowSize);
    this._pastThroughput[this._conf.slidingWindowSize - 1] = 0; // initialize the parameters of kalman filter

    this._xPrev = 0;
    this._PPrev = 0; // matrix initialization

    this.MATRIX_E = matrix_Matrix.zeros(this._conf.predictStep, this._conf.predictStep);
    this.MATRIX_G = matrix_Matrix.zeros(this._conf.predictStep, 2);

    for (var i = 0; i < this._conf.predictStep; i++) {
      for (var j = 0; j < i + 1; j++) {
        this.MATRIX_E.set(i, j, i - j + 1);
      }
    }

    for (var _i = 0; _i < this._conf.predictStep; _i++) {
      this.MATRIX_G.set(_i, 0, _i + 2);
      this.MATRIX_G.set(_i, 1, -_i - 1);
    }
  }
  /**
   * 设置码率列表中的清晰度是否可用
   * @param list 码率index列表
   */
  ;

  _proto.setAvailableBitrates = function setAvailableBitrates(list) {
    if (list.length) {
      this._availableList = list;
    }
  }
  /**
   * 获取下一个清晰度
   * @returns {number} 下个清晰度index
   */
  ;

  /**
   * 收到关键帧
   * @param buffered buffer长度（秒）
   * @param size 下载长度
   * @param time 下载耗时（秒）
   */
  _proto.onGOP = function onGOP(buffered, size, time) {
    // Byte/s -> kbps: {x} * 1000 * 8 / 1024;
    var speed = size / time * 8 / 1024;
    this._next = this._nextRateIndex(this._recentSpeed(speed), buffered);
  }
  /**
   * 当开始加载新流
   * @param index 清晰度index
   */
  ;

  _proto.onLevelLoad = function onLevelLoad(index) {
    this._current = Math.max(0, index);
  }
  /**
   * 处理传入配置，与默认配置合并
   * @param config 配置
   */
  ;

  _proto._processConfig = function _processConfig(config) {
    var c = Object(object_assign["ObjectAssign"])({}, CONFIG);

    this._conf = Object(object_assign["ObjectAssign"])(c, config);
  };

  _proto._quantization = function _quantization(bitrate, speed) {
    var index = this._current;

    for (var i = this._levels.length - 1; i >= 0; i--) {
      if (bitrate >= this._levels[i].bitrate) {
        index = i;
        break;
      }
    }

    if (index > this._current && speed < this._levels[index].bitrate) {
      index -= 1;
    }

    return index;
  }
  /**
   * 计算下一个使用的码率
   * @param value 下载速度 kpbs
   * @param buffered 当前buffer ms
   */
  ;

  _proto._nextRateIndex = function _nextRateIndex(value, buffered) {
    this._pastThroughput.shift();

    this._pastThroughput.push(value);

    var index = this._nextRateBySpeedAndBuffered(value, buffered);

    if (index >= this._current) {
      this._pastBuffer.shift();

      this._pastBuffer.push(buffered);
    } else {
      this._pastBuffer = [buffered, buffered];
    }

    if (this._availableList && this._availableList.length && this._availableList.indexOf(index) === -1) {
      for (var i = this._availableList.length - 1; i >= 0; i--) {
        if (this._availableList[i] <= index) {
          index = this._availableList[i];
          break;
        }
      }

      index = Math.max(index, this._availableList[0]);
    }

    return index;
  }
  /**
   * 重置算法
   */
  ;

  _proto._resetAlgorithm = function _resetAlgorithm() {
    this._pastBuffer = [0, 0];
    this._pastThroughput = new Array(this._conf.slidingWindowSize);
  }
  /**
   * 获取最近buffer水平
   */
  ;

  _proto._recentBuffer = function _recentBuffer() {
    return this._pastBuffer.reduce(function (a, b) {
      return a + b;
    }) / this._pastBuffer.length;
  }
  /**
   * 获取最近带宽水平
   */
  ;

  _proto._recentSpeed = function _recentSpeed(value) {
    var speed = this._pastThroughput[this._pastThroughput.length - 1];

    if (speed > 0) {
      return speed * this._conf.speedSmoothRatio + value * (1 - this._conf.speedSmoothRatio);
    }

    return value;
  }
  /**
   * 依据最近buffer水平，设置Target Buffer
   */
  ;

  _proto._adjustedTargetBuffer = function _adjustedTargetBuffer() {
    var targetBuffer = Math.max(this._conf.minBuffer, this._recentBuffer() + this._conf.bufferOffset);
    log["Log"].v(abr_algorithm_tag, "targetBuffer:" + targetBuffer);
    return targetBuffer;
  }
  /**
   * 计算码率变化值
   * @param switchPenaltyArray 切换代价
   * @param estimatedThroughput 预估带宽
   * @param Bk 目标buffer水平
   * @param br 预测buffer水平
   */
  ;

  _proto._rateChangeArray = function _rateChangeArray(switchPenaltyArray, estimatedThroughput, Bk, br) {
    var targetBufferArray = new matrix_Matrix(br);

    this._printFirstColumn(targetBufferArray, 'targetBufferArray');

    var matrixG = this.MATRIX_G;
    var predictedBufferArray = matrix_Matrix.multiply(matrixG, Bk);

    this._printFirstColumn(predictedBufferArray, 'predictedBufferArray');

    var matrixE = this.MATRIX_E;
    var matrixF = matrixE.multiply(this._diag(estimatedThroughput));
    return matrix_Matrix.multiply(matrix_Matrix.multiply(matrix_Matrix.add(matrix_Matrix.multiply(matrixF.transpose(), matrixF), switchPenaltyArray).inverse(), matrixF.transpose()), matrix_Matrix.subtract(targetBufferArray, predictedBufferArray));
  }
  /**
   * 根据下载速度和buffer长度计算下一个码率
   * @param speed 下载速度 kbps
   * @param buffered 当前buffer ms
   */
  ;

  _proto._nextRateBySpeedAndBuffered = function _nextRateBySpeedAndBuffered(speed, buffered) {
    var _this2 = this;

    var switchPenaltyArray = matrix_Matrix.zeros(this._conf.predictStep, this._conf.predictStep);

    for (var i = 0; i < this._conf.predictStep; i++) {
      switchPenaltyArray.set(i, i, this._conf.switchPenalty * (this._conf.predictStep - i));
    }

    var futureThroughput = this._multistepPred(this._pastThroughput, this._conf.predictStep); // const result = this._multistepKalmanfilter(
    //     this._xPrev,
    //     this._pastThroughput[this._pastThroughput.length - 1],
    //     this._PPrev,
    //     this._conf.predictStep
    // );
    // const futureThroughput = result.futureThroughput;
    // this._xPrev = result.xRet;
    // this._PPrev = result.PRet;


    log["Log"].v(abr_algorithm_tag, "futureThroughput:" + futureThroughput);
    var estimatedThroughput = futureThroughput.map(function (item) {
      return -(_this2._conf.duration / item);
    });
    var Bk = new matrix_Matrix([[buffered], [this._recentBuffer()]]);
    var br = [];
    br[0] = [buffered];

    var target = this._adjustedTargetBuffer();

    for (var _i2 = 0; _i2 < this._conf.predictStep; _i2++) {
      br[_i2 + 1] = [this._conf.smoothRatioToTarget * br[_i2] + (1 - this._conf.smoothRatioToTarget) * target];
    }

    var rateChangeArray = this._rateChangeArray(switchPenaltyArray, estimatedThroughput, Bk, br.slice(1));

    log["Log"].v(abr_algorithm_tag, "algorithm input speed:" + speed + " buffered:" + buffered, "output result:" + rateChangeArray.get(0, 0));
    return this._quantization(this._levels[this._current].bitrate + rateChangeArray.get(0, 0), speed);
  };

  _proto._printFirstColumn = function _printFirstColumn(matrix, name) {
    var out = [];

    for (var i = 0; i < matrix.shape[0]; ++i) {
      out[i] = +matrix.get(i, 0).toFixed(2);
    }

    log["Log"].v(abr_algorithm_tag, name, JSON.stringify(out));
  };

  _proto._printFirstRow = function _printFirstRow(matrix, name) {
    var out = [];

    for (var i = 0; i < matrix.shape[0]; ++i) {
      out[i] = +matrix.get(0, i).toFixed(2);
    }

    log["Log"].v(abr_algorithm_tag, name, JSON.stringify(out));
  };

  _proto._diag = function _diag(arr) {
    var dist = [],
        len = arr.length;

    for (var i = 0; i < len; i++) {
      dist[i] = new Array(len);

      for (var j = 0; j < len; j++) {
        dist[i][j] = 0;
      }

      dist[i][i] = arr[i];
    }

    return new matrix_Matrix(dist, {
      shape: [len, len]
    });
  };

  _proto._multistepPred = function _multistepPred(pastThroughput, predictStep) {
    var futureThroughput = new Array(predictStep);
    var pastThroughputClone = pastThroughput.slice(0);

    for (var i = 0; i < predictStep; i++) {
      var bandwidthSum = 0,
          nonzeroCnt = 0;

      for (var j = 0; j < pastThroughput.length; j++) {
        if (pastThroughputClone[j]) {
          bandwidthSum += 1.0 / pastThroughputClone[j];
          nonzeroCnt += 1;
        }
      }

      if (nonzeroCnt === 0) {
        continue;
      } else {
        futureThroughput[i] = 1.0 / (bandwidthSum / nonzeroCnt);
      }

      pastThroughputClone.shift();
      pastThroughputClone.push(futureThroughput[i]);
    }

    return futureThroughput;
  };

  _proto._multistepKalmanfilter = function _multistepKalmanfilter(xLast, z, PLast, predictStep) {
    var R = this._conf.kalmanR,
        Q = this._conf.kalmanQ;
    var futureThroughput = new Array(this._conf.predictStep);
    var xPrev = xLast,
        PPrev = PLast,
        xRet = 0,
        PRet = 0;

    for (var i = 0; i < predictStep; i++) {
      var xMinus = xPrev,
          PMinus = PPrev + Q,
          K = PMinus / (PMinus + R),
          predX = xMinus + K * (z - xMinus),
          P = (1 - K) * PMinus;

      if (i === 0) {
        xRet = predX;
        PRet = P;
      }

      futureThroughput[i] = predX;
      xPrev = predX;
      PPrev = P;
    }

    return {
      futureThroughput: futureThroughput,
      xRet: xRet,
      PRet: PRet
    };
  };

  abr_algorithm_createClass(AbrAlgorithm, [{
    key: "nextLevel",
    get: function get() {
      return this._next;
    }
  }]);

  return AbrAlgorithm;
}(events["EventEmitter"]);

/* harmony default export */ var abr_algorithm = (abr_algorithm_AbrAlgorithm);
// CONCATENATED MODULE: ./src/abr/multirate.ts
function multirate_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function multirate_createClass(Constructor, protoProps, staticProps) { if (protoProps) multirate_defineProperties(Constructor.prototype, protoProps); if (staticProps) multirate_defineProperties(Constructor, staticProps); return Constructor; }

function multirate_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }







/**
 * 多码率及自适应码率
 */
var multirate_Multirate =
/*#__PURE__*/
function (_Observer) {
  multirate_inheritsLoose(Multirate, _Observer);

  function Multirate(config, media) {
    var _this;

    _this = _Observer.call(this) || this;
    _this._config = void 0;
    _this._media = void 0;
    _this._next = 0;
    _this._downloadSize = 0;
    _this._downloadStartTime = 0;
    _this._keyCount = 0;
    _this._index = 0;
    _this._alg = void 0;
    _this._manifest = void 0;
    _this._autoLevelEnabled = false;
    _this._config = config;
    _this._media = media;
    _this._manifest = new abr_manifest_AbrManifest(config.manifest);
    _this._alg = new abr_algorithm();

    _this._alg.init(_this._manifest);

    _this._autoLevelEnabled = _this._manifest.abrLevels.length > 0;
    return _this;
  }
  /**
   * 初始化flv多码率
   */


  var _proto = Multirate.prototype;

  _proto.init = function init() {
    this._downloadSize = 0;
    this._downloadStartTime = performance.now(); // 当前流收到I帧计数

    this._keyCount = 0;
    this._index = this._next = 0;

    if (this.current) {
      if (this._autoLevelEnabled) {
        this._index = this._next = this._alg.nextLevel;
      }

      this.trigger(core_events["default"].MANIFEST_PARSED, {
        levels: this._manifest.levels,
        currentLevel: this._index
      });
    }
  };

  _proto.destory = function destory() {
    if (this._alg) {
      this._alg.removeAllListeners();
    }
  };

  _proto.onLoaderChunk = function onLoaderChunk(size) {
    this._downloadSize += size;
  };

  _proto.onLevelLoad = function onLevelLoad(index) {
    if (this._manifest.levels.length && index >= 0 && index < this._manifest.levels.length) {
      this._keyCount = 0;
      this._index = index;
      this._downloadStartTime = performance.now();
      this._downloadSize = 0;

      this._alg.onLevelLoad(index);
    }
  }
  /**
   * 处理关键帧，是否切换码率
   * @param time flv tag timestamp
   */
  ;

  _proto.onKeyFrame = function onKeyFrame(time) {
    var levels = this._manifest.levels;
    this._keyCount++;

    if ((this._alg || this._next !== this._index) && this._keyCount > 1 && levels) {
      var next = this._index;

      if (this._next !== this._index) {
        // 平滑切换
        next = this._next;
      } else if (this._autoLevelEnabled) {
        // 自动
        var now = performance.now();

        this._alg.onGOP(this._media.bufferedSec(), this._downloadSize, (now - this._downloadStartTime) / 1000);

        this._downloadSize = 0;
        this._downloadStartTime = now;
        this._next = next = this._alg.nextLevel;
      } else {
        return;
      } // TEST:
      // next = (this._index + 1) % levels.length;


      if (next !== this._index) {
        return {
          url: this._getRequestUrl(next, time),
          level: next
        };
      }
    }

    return;
  };

  /**
   * 获取切换flv的请求地址
   * @param index 码率index
   * @param spts 切换时间戳，单位毫秒。大于0：关键帧pts；小于0：直播延迟
   */
  _proto._getRequestUrl = function _getRequestUrl(index, spts) {
    var url = this._config.src;
    var level = this._manifest.levels[index];

    if (level) {
      url = level.url;
    }

    return abrGetUrl(url, spts || this._config.defaultSpts);
  };

  multirate_createClass(Multirate, [{
    key: "autoLevelEnabled",
    get: function get() {
      return this._autoLevelEnabled;
    }
    /**
     * 清晰度列表
     */

  }, {
    key: "levels",
    get: function get() {
      return this._manifest.levels;
    }
  }, {
    key: "nextLevel",
    get: function get() {
      if (typeof this._next === 'number') {
        return this._next;
      } else {
        return this._index;
      }
    },
    set: function set(value) {
      if (value >= 0 && this._manifest.levels.length > value) {
        this._autoLevelEnabled = false;
        this._next = value;
      } else if (value === -1) {
        this._autoLevelEnabled = true;
      }
    }
  }, {
    key: "currentLevel",
    get: function get() {
      return this._index;
    },
    set: function set(value) {
      if (value >= 0 && this._manifest.levels.length > value) {
        this._autoLevelEnabled = false;
        this._index = this._next = value;
      } else if (value === -1) {
        this._autoLevelEnabled = true;
      }
    }
  }, {
    key: "current",
    get: function get() {
      return this._manifest.levels[this._index];
    }
  }]);

  return Multirate;
}(core_observer["default"]);

/* harmony default export */ var multirate = (multirate_Multirate);
// EXTERNAL MODULE: ./src/demux/flv/flv-demuxer-inline.ts + 13 modules
var flv_demuxer_inline = __webpack_require__("./src/demux/flv/flv-demuxer-inline.ts");

// CONCATENATED MODULE: ./src/io/cache.ts
function cache_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function cache_createClass(Constructor, protoProps, staticProps) { if (protoProps) cache_defineProperties(Constructor.prototype, protoProps); if (staticProps) cache_defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Uint8Array数据缓存
 */
var Cache =
/*#__PURE__*/
function () {
  // 100m = 104857600 = 100 * 1024 * 1024
  // 初始cache大小
  // cache
  function Cache(size) {
    if (size === void 0) {
      size = 0;
    }

    this._size = void 0;
    this._readOffset = 0;
    this._writeOffset = 0;
    this._storage = void 0;
    this._cache = void 0;

    if (size > 0) {
      this._size = size;
    } else {
      this._size = Cache.DEFAULT_CACHE_SIZE;
    }

    this._storage = new ArrayBuffer(this._size);
    this._cache = new Uint8Array(this._storage);
  }
  /**
   * 添加至cache
   * @param chunk 数据
   */


  var _proto = Cache.prototype;

  _proto.put = function put(chunk) {
    if (this._readOffset === this._writeOffset) {
      this._readOffset = this._writeOffset = 0;
    }

    if (this._writeOffset + chunk.byteLength > this._size) {
      var expected = this._writeOffset + chunk.byteLength - this._readOffset;

      if (expected > this._size) {
        // 扩展
        this._collateCache();

        this.expandCache(expected);
      } else {
        // 整理buffer
        this._collateCache();
      }
    }

    this._cache.set(chunk, this._writeOffset);

    this._writeOffset += chunk.byteLength;
  }
  /**
   * 获取数据拷贝
   * @param len 数据长度
   * @returns 数据
   */
  ;

  _proto.get = function get(len) {
    if (len + this._readOffset > this._writeOffset) {
      return null;
    }

    var data = null;

    if (this._cache.slice) {
      data = this._cache.slice(this._readOffset, this._readOffset + len);
    } else {
      var offset = this._cache.byteOffset + this._readOffset;
      data = new Uint8Array(this._storage.slice(offset, offset + len));
    }

    this._readOffset += len;
    return data;
  }
  /**
   * 获取数据读取Uint8Array，从cache中直接读取，异步使用可能出现故障
   * @param len 长度
   * @returns 数据
   */
  ;

  _proto.read = function read(len) {
    if (len + this._readOffset > this._writeOffset) {
      return null;
    }

    return new Uint8Array(this._storage, this._readOffset, len);
  }
  /**
   * 后移读指针
   * @param len 数据长度
   */
  ;

  _proto.skip = function skip(len) {
    if (len + this._readOffset > this._writeOffset) {
      return;
    }

    this._readOffset += len;
  }
  /**
   * 清理
   */
  ;

  _proto.clear = function clear() {
    this._readOffset = this._writeOffset = 0;
  }
  /**
   * 扩展cache，cache不足时，cache容量max(翻倍,预期)
   * @param expected 预期最小值
   */
  ;

  _proto.expandCache = function expandCache(expected) {
    if (expected === void 0) {
      expected = 0;
    }

    this._size = Math.max(this._size * 2, expected);

    if (this._size >= Cache.MAX_CACHE_SIZE) {
      throw new Error('max cache size');
    }

    if (this._readOffset === 0 && this._writeOffset === 0) {
      this._storage = new ArrayBuffer(this._size);
    } else {
      this._storage = this._transfer(this._storage, this._size);
    }

    this._cache = new Uint8Array(this._storage);
  }
  /**
   * 未读取数据长度
   */
  ;

  /**
   * 整理cache中的数据，抛弃已读取的数据
   */
  _proto._collateCache = function _collateCache() {
    var remain = new Uint8Array(this._storage, this._readOffset, this._writeOffset - this._readOffset);

    this._cache.set(remain);

    this._writeOffset -= this._readOffset;
    this._readOffset = 0;
  };

  _proto._transfer = function _transfer(source, length) {
    if (!(source instanceof ArrayBuffer)) {
      throw new TypeError('Source must be an instance of ArrayBuffer');
    }

    if (length <= source.byteLength) {
      return source.slice(0, length);
    }

    var sourceView = new Uint8Array(source),
        destView = new Uint8Array(new ArrayBuffer(length));
    destView.set(sourceView);
    return destView.buffer;
  };

  cache_createClass(Cache, [{
    key: "unreadLen",
    get: function get() {
      return this._writeOffset - this._readOffset;
    }
  }]);

  return Cache;
}();

Cache.MAX_CACHE_SIZE = 104857600;
Cache.DEFAULT_CACHE_SIZE = 3145728;
/* harmony default export */ var cache = (Cache);
// EXTERNAL MODULE: ./src/demux/flv/flv.ts
var flv = __webpack_require__("./src/demux/flv/flv.ts");

// CONCATENATED MODULE: ./src/demux/flv/flv-tag-dump.ts





var flv_tag_dump_FlvTagDump =
/*#__PURE__*/
function () {
  function FlvTagDump(observer, onAbr) {
    this._observer = void 0;
    this._cache = void 0;
    this._tag = void 0;
    this._result = void 0;
    this._parseLen = 0;
    this._parseFunc = void 0;
    this._onAbr = void 0;
    this._observer = observer;
    this._onAbr = onAbr;
    this._cache = new cache();
    this._parseLen = flv["FlvSize"].FLV_HEAD_LEN;
    this._parseFunc = this._parseFlvHead;
    this._result = {
      list: []
    };
  }

  var _proto = FlvTagDump.prototype;

  _proto.reset = function reset() {
    this._parseLen = flv["FlvSize"].FLV_HEAD_LEN;
    this._parseFunc = this._parseFlvHead;

    this._cache.clear();

    this._tag = undefined;
    this._result.list = [];
    this._result.abr = undefined;
  };

  _proto.append = function append(input) {
    this._cache.put(new Uint8Array(input));

    while (this._cache.unreadLen > this._parseLen) {
      this._parseFunc();
    }

    var data = {
      list: this._result.list.splice(0),
      abr: this._result.abr
    };
    this._result.abr = undefined;
    return data;
  }
  /**
   * 解析tag头
   */
  ;

  _proto._parseFlvHead = function _parseFlvHead() {
    var data = this._cache.read(flv["FlvSize"].FLV_HEAD_LEN);

    if (data) {
      if (data[0] !== 0x46 || data[1] !== 0x4c || data[2] !== 0x56 || data[3] !== 0x01) {
        this._observer.trigger(core_events["default"].ERROR, {
          type: errors["ErrorTypes"].MUX_ERROR,
          details: errors["ErrorDetails"].PARSING_ERROR,
          fatal: true,
          reason: 'Flv: wrong head'
        });
      }

      this._observer.trigger(core_events["default"].FLV_HEAD, {
        hasAudio: (data[4] & 4) >>> 2,
        hasVideo: data[4] & 1
      }); // TEST:
      // this._observer.trigger(KEvents.FLV_HEAD, {
      //     hasAudio: true,
      //     hasVideo: true
      // });


      this._cache.skip(flv["FlvSize"].FLV_HEAD_LEN);

      this._parseLen = flv["FlvSize"].FLV_TAG_HEAD_LEN;
      this._parseFunc = this._parseFlvTagHead;
    }
  }
  /**
   * 解析flv tag head
   */
  ;

  _proto._parseFlvTagHead = function _parseFlvTagHead() {
    this._tag = new flv["FlvTag"]();

    var data = this._cache.read(flv["FlvSize"].FLV_TAG_HEAD_LEN);

    if (data) {
      // 取出tag类型
      this._tag.tagType = data[0]; // 取出包体大小

      this._tag.dataSize = ((data[1] & 0xff) << 16) + ((data[2] & 0xff) << 8) + (data[3] & 0xff); // 取出解码时间

      this._tag.timestamp = ((data[7] & 0xff) << 24) + ((data[4] & 0xff) << 16) + ((data[5] & 0xff) << 8) + (data[6] & 0xff);

      this._cache.skip(flv["FlvSize"].FLV_TAG_HEAD_LEN); // 尝试在处理完整个tag之前判断是否为关键帧，用于自适应码率


      if (this._tag.tagType === flv["FlvTagType"].VIDEO) {
        this._parseFunc = this._detectKeyFrame;
        this._parseLen = flv["FlvSize"].AVC_KEY_FRAME_CHECK_LEN;
      } else {
        this._parseFunc = this._parseFlvTag;
        this._parseLen = this._tag.dataSize + flv["FlvSize"].FLV_TAG_SIZE_LEN;
      }
    }
  }
  /**
   * 检测关键帧
   */
  ;

  _proto._detectKeyFrame = function _detectKeyFrame() {
    var data = this._cache.read(2);

    if (data && this._tag) {
      var frameType = (data[0] & 240) >>> 4;
      var packetType = data[1];
      this._parseFunc = this._parseFlvTag;
      this._parseLen = this._tag.dataSize + flv["FlvSize"].FLV_TAG_SIZE_LEN; // 获取是否是关键帧

      if (frameType === 1 && packetType === 1 && this._onAbr) {
        this._result.abr = this._onAbr(this._tag.timestamp);

        if (this._result.abr) {
          this._parseLen = flv["FlvSize"].FLV_HEAD_LEN;
          this._parseFunc = this._parseFlvHead;

          this._cache.clear();

          this._tag = undefined;
        }
      }
    }
  }
  /**
   * 解析flv tag
   */
  ;

  _proto._parseFlvTag = function _parseFlvTag() {
    var tag = this._tag;

    if (!tag) {
      return;
    }

    if (tag.tagType === flv["FlvTagType"].SCRIPT || tag.tagType === flv["FlvTagType"].AUDIO || tag.tagType === flv["FlvTagType"].VIDEO) {
      tag.body = this._cache.get(tag.dataSize);

      this._cache.skip(4); // skip size


      if (tag) this._result.list.push(tag);
      this._tag = undefined;
    }

    this._parseFunc = this._parseFlvTagHead;
    this._parseLen = flv["FlvSize"].FLV_TAG_HEAD_LEN;
  };

  return FlvTagDump;
}();

/* harmony default export */ var flv_tag_dump = (flv_tag_dump_FlvTagDump);
// CONCATENATED MODULE: ./src/io/fetch.ts
/**
 * FetchLoader
 */
var FetchLoader =
/*#__PURE__*/
function () {
  function FetchLoader() {
    this.tag = 'fetch';
    this._context = void 0;
    this._callbacks = null;
    this._controller = null;
    this._reader = null;
    this._abort = false;
  }

  /**
   * broswer is support moz-chunk
   * @returns 是否支持
   */
  FetchLoader.isSupport = function isSupport() {
    if (self.fetch && self.ReadableStream) {
      return true;
    }

    return false;
  }
  /**
   * 开始加载
   * @param context context
   * @param callbacks 回调
   */
  ;

  var _proto = FetchLoader.prototype;

  _proto.load = function load(context, callbacks) {
    var _this = this;

    this._context = context;
    this._callbacks = callbacks;
    var reqHeaders = new Headers();

    if (context.headers) {
      context.headers.forEach(function (element) {
        reqHeaders.append(element.header, element.value);
      });
    }

    if (context.range) {
      reqHeaders.append('Range', context.range);
    }

    var params = {
      method: 'GET',
      headers: reqHeaders,
      mode: 'cors',
      cache: 'default',
      referrerPolicy: 'no-referrer-when-downgrade',
      signal: this._getAbortSignal()
    };

    if (context.credentials) {
      params.credentials = 'include';
    }

    fetch(context.url, params).then(function (res) {
      context.responseUrl = res.url;
      context.responseHeader = res.headers;

      if (_this._callbacks && _this._callbacks.onConnect) {
        _this._callbacks.onConnect(res.status);
      }

      if (res.ok) {
        // 兼容AbortController不可用
        if (_this._abort) {
          if (res.body) {
            res.body.getReader().cancel();
          }

          return;
        }

        if (context.responseType === 'arraybuffer') {
          if (context.progress) {
            if (res.body) {
              _this._reader = res.body.getReader();

              _this._pump(_this._reader);
            }

            return;
          }

          res.arrayBuffer().then(function (responseData) {
            _this._onEnd(context, responseData);
          });
          return;
        }

        res.text().then(function (responseData) {
          _this._onEnd(context, responseData);
        });
        return;
      }

      var error = new Error(res.status + ' ' + res.statusText);

      _this._onError(error);

      return;
    }).catch(function (e) {
      // 忽略AbortError，避免与timeout手动abort冲突
      if (e.name !== 'AbortError') {
        _this._onError(e);
      }
    });
  };

  _proto.abort = function abort() {
    if (this._controller) {
      this._controller.abort();
    } else if (this._reader) {
      this._reader.cancel();

      this._reader = null;
    }

    this._abort = true;
  };

  _proto.destroy = function destroy() {
    this._callbacks = null;
    this.abort();
  };

  _proto._onProgress = function _onProgress(context, chunk) {
    if (this._callbacks && this._callbacks.onProgress) {
      this._callbacks.onProgress(context, chunk);
    }
  };

  _proto._onEnd = function _onEnd(context, responseData) {
    if (this._callbacks && this._callbacks.onEnd) {
      this._reader = null;
      this._controller = null;

      this._callbacks.onEnd(context, responseData);
    }
  };

  _proto._onError = function _onError(e) {
    if (this._callbacks && this._callbacks.onError) {
      this._callbacks.onError(e);
    }
  }
  /**
   * pump data
   * @param reader 读取数据
   * @private
   */
  ;

  _proto._pump = function _pump(reader) {
    var _this2 = this;

    reader.read().then(function (result) {
      if (_this2._abort) {
        reader.cancel();
        return null;
      }

      if (result.done) {
        _this2._onEnd(_this2._context, null);

        return null;
      }

      var chunk = result.value.buffer;

      _this2._onProgress(_this2._context, chunk);

      return _this2._pump(reader);
    }).catch(function (e) {
      if (e.name !== 'AbortError') {
        _this2._onError(e);
      }
    });
  };

  _proto._getAbortSignal = function _getAbortSignal() {
    try {
      if (AbortController) {
        this._controller = new AbortController();
        return this._controller.signal;
      }
    } catch (e) {
      return null;
    }

    return null;
  };

  return FetchLoader;
}();


// CONCATENATED MODULE: ./src/io/xhr.ts
var XHR_TYPE;
/**
 * XhrLoader
 * @class XhrLoader
 */

(function (XHR_TYPE) {
  XHR_TYPE["MOZ_CHUNK"] = "moz-chunked-arraybuffer";
  XHR_TYPE["MS_STREAM"] = "ms-stream";
  XHR_TYPE["UNKNOW"] = "unknow";
  XHR_TYPE["UNSUPPORT"] = "";
})(XHR_TYPE || (XHR_TYPE = {}));

var XHR =
/*#__PURE__*/
function () {
  // 16MB
  XHR.isSupportChunk = function isSupportChunk() {
    if (XHR.supportChunk !== XHR_TYPE.UNKNOW) {
      return XHR.supportChunk;
    }

    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://example.com', true);
      xhr.responseType = XHR_TYPE.MOZ_CHUNK;

      if (xhr.responseType === XHR_TYPE.MOZ_CHUNK) {
        XHR.supportChunk = XHR_TYPE.MOZ_CHUNK;
        return XHR.supportChunk;
      }
    } catch (e) {
      XHR.supportChunk = XHR_TYPE.UNSUPPORT;
    }

    try {
      var _xhr = new XMLHttpRequest();

      _xhr.open('GET', 'https://example.com', true);

      _xhr.responseType = XHR_TYPE.MS_STREAM;

      if (_xhr.responseType === XHR_TYPE.MS_STREAM) {
        XHR.supportChunk = XHR_TYPE.MS_STREAM;
        return XHR.supportChunk;
      }
    } catch (e) {
      XHR.supportChunk = XHR_TYPE.UNSUPPORT;
    }

    return XHR_TYPE.UNSUPPORT;
  };

  function XHR() {
    this.tag = 'xhr';
    this._xhr = null;
    this._context = void 0;
    this._callbacks = null;
    this._reader = null;
    this._msBufferOffset = 0;
    this._msBufferUpper = 16 * 1024 * 1024;
    this._progress = XHR_TYPE.UNKNOW;
    this._xhr = null;
    this._msBufferOffset = 0;
  }
  /**
   * 开始加载
   * @param context
   * @param callbacks
   */


  var _proto = XHR.prototype;

  _proto.load = function load(context, callbacks) {
    this._callbacks = callbacks;
    this._context = context;
    this._progress = XHR_TYPE.UNSUPPORT;

    if (context.progress && context.responseType === 'arraybuffer') {
      this._progress = XHR.isSupportChunk();

      if (this._progress === XHR_TYPE.MS_STREAM) {
        var reader = this._reader = new self.MSStreamReader();
        reader.onprogress = this._msrOnProgress.bind(this);
        reader.onload = this._onLoadEnd.bind(this);
        reader.onerror = this._onError.bind(this);
      }
    }

    var xhr = this._xhr = new XMLHttpRequest();
    xhr.open('GET', this._context.url, true); // arraybuffer类型尝试使用chunk

    if (this._progress === XHR_TYPE.MOZ_CHUNK) {
      xhr.responseType = XHR_TYPE.MOZ_CHUNK;
      xhr.onprogress = this._onProgress.bind(this);
      xhr.onload = this._onLoadEnd.bind(this);
    } else if (this._progress === XHR_TYPE.MS_STREAM) {
      xhr.responseType = XHR_TYPE.MS_STREAM;
    } else {
      xhr.responseType = context.responseType || 'arraybuffer';
      xhr.onload = this._onLoadEnd.bind(this);
    }

    xhr.onreadystatechange = this._onReadyStateChange.bind(this);
    xhr.onerror = this._onError.bind(this);
    xhr.withCredentials = !!context.credentials;

    if (context.range) {
      xhr.setRequestHeader('Range', context.range);
    }

    xhr.send();
  }
  /**
   * abort request
   */
  ;

  _proto.abort = function abort() {
    if (this._reader) {
      // 0 EMPTY 1 LOADING 2 DONE
      if (this._reader.readyState === 1) {
        this._reader.abort();
      }

      this._reader.onprogress = null;
      this._reader.onload = null;
      this._reader.onerror = null;
      this._reader = null;
    }

    if (this._xhr) {
      this._xhr.onreadystatechange = null;
      this._xhr.onprogress = null;
      this._xhr.onload = null;
      this._xhr.onerror = null;

      this._xhr.abort();

      this._xhr = null;
    }
  }
  /**
   * destroy xhr Object clean cache
   */
  ;

  _proto.destroy = function destroy() {
    this._callbacks = null;
    this.abort();
  };

  _proto._onReadyStateChange = function _onReadyStateChange(e) {
    if (!this._xhr) {
      return;
    }

    var xhr = this._xhr;

    if (xhr.readyState === 2) {
      this._context.responseUrl = xhr.responseURL;
      this._context.responseHeader = xhr.getAllResponseHeaders();

      if (this._callbacks && this._callbacks.onConnect) {
        this._callbacks.onConnect(xhr.status);
      }

      if (xhr.status < 200 || xhr.status > 299) {
        this._onError(new Error('xhr error'));
      }
    } else if (xhr.readyState === 3) {
      if (this._reader && this._reader.readyState === 0 && xhr.status >= 200 && xhr.status <= 299) {
        this._reader.readAsArrayBuffer(xhr.response);
      }
    }
  }
  /**
   * xhr onProgress
   * @param {*} e xhr回调数据
   */
  ;

  _proto._onProgress = function _onProgress(e) {
    if (!this._xhr) {
      return;
    }

    var chunk = this._xhr.response;

    if (this._callbacks && this._callbacks.onProgress && chunk) {
      this._callbacks.onProgress(this._context, chunk);
    }
  }
  /**
   * ms-stream progress
   * @param {*} e MSStreamReader回调
   */
  ;

  _proto._msrOnProgress = function _msrOnProgress(e) {
    var reader = e.target;
    var buffer = reader.result;

    if (!buffer) {
      // result may be null, workaround for buggy M$
      this._onError(new Error('ms buffer null'));

      return;
    }

    var chunk = buffer.slice(this._msBufferOffset);
    this._msBufferOffset = buffer.byteLength;

    if (this._callbacks && this._callbacks.onProgress) {
      this._callbacks.onProgress(this._context, chunk);
    }

    if (buffer.byteLength >= this._msBufferUpper) {
      this._onError(new Error('ms buffer too large'));
    }
  }
  /**
   * xhr onLoadEnd
   * @param {*} e xhr回调数据
   */
  ;

  _proto._onLoadEnd = function _onLoadEnd(e) {
    var data = null;
    var target = this._xhr;

    if (!this._progress && target) {
      data = target.response;
    }

    if (this._callbacks) {
      this._callbacks.onEnd(this._context, data);
    }
  }
  /**
   * xhr onXhrError
   * @param {*} e xhr回调数据
   * @private
   */
  ;

  _proto._onError = function _onError(e) {
    if (this._callbacks && this._callbacks.onError) {
      this._callbacks.onError(e);
    }
  };

  return XHR;
}();
XHR.supportChunk = XHR_TYPE.UNKNOW;
// CONCATENATED MODULE: ./src/io/loader.ts




var ChunkLoader;
var loader_index = 0;
/**
 * 加载器封装
 * @param  {object} video config
 */

var loader_Loader =
/*#__PURE__*/
function () {
  var _proto = Loader.prototype;

  /**
   * 获取流式加载Loader类
   * @param useFetch 是否使用fetch
   * @returns class
   */
  _proto._getInternalLoader = function _getInternalLoader(useFetch) {
    if (typeof ChunkLoader !== 'undefined') {
      return ChunkLoader;
    }

    ChunkLoader = null; // ms优先使用xhr，其他浏览器优先使用fetch

    if (browser["default"].msie || browser["default"].msedge) {
      if (useFetch) {
        if (FetchLoader.isSupport()) {
          ChunkLoader = FetchLoader;
        }

        return ChunkLoader;
      }

      if (XHR.isSupportChunk()) {
        ChunkLoader = XHR;
      } else if (FetchLoader.isSupport()) {
        ChunkLoader = FetchLoader;
      }
    } else if (FetchLoader.isSupport()) {
      ChunkLoader = FetchLoader;
    } else if (XHR.isSupportChunk()) {
      ChunkLoader = XHR;
    }

    return ChunkLoader;
  };

  function Loader() {
    this.tag = 'loader';
    this.context = void 0;
    this._loader = void 0;
    this._callbacks = null;
    this._config = void 0;
    this._loaderCallback = void 0;
    this._stats = void 0;
    this._retryDelay = 0;
    this._loading = false;
    this._aborted = false;
    this._requestTimeout = void 0;
    this._transTimer = void 0;
    this._retryTimeout = void 0;
    this._rangeStart = void 0;
    this._continuedTransmissionRetry = false;
    this._progressTime = 0;
    this.tag = 'loader';
    loader_index++;
    this._loader = null;
    this._config = {
      useFetch: false,
      connectionTimeout: 0,
      transmissionTimeout: 0,
      maxRetry: 0,
      retryDelay: 0
    };
    this._loaderCallback = {
      onConnect: this._onConnect.bind(this),
      onProgress: this._onProgress.bind(this),
      onEnd: this._onEnd.bind(this),
      onError: this._onError.bind(this)
    };
  }

  _proto.load = function load(context, callbacks, config) {
    this._init(context, callbacks, config);

    this._loadInternal();
  }
  /**
   * destory
   */
  ;

  _proto.destroy = function destroy() {
    this._stopTimer();

    this._abortInternal();

    this._destroyLoader();

    this._callbacks = null;
  };

  _proto._init = function _init(context, callbacks, config) {
    this.context = context;
    this._rangeStart = context.rangeStart;
    this._callbacks = callbacks;
    this._config = config || this._config;
    this._stats = {
      id: '',
      trequest: performance.now(),
      retry: 0,
      loaded: 0,
      code: 0,
      output: 0,
      tfirst: 0,
      tload: 0,
      total: 0,
      tsload: 0,
      tstart: 0,
      fatal: false,
      text: ''
    };

    if (this._config.retryDelay) {
      this._retryDelay = this._config.retryDelay;
    }
  }
  /**
   * 销毁当前loader
   */
  ;

  _proto._destroyLoader = function _destroyLoader() {
    if (this._loader) {
      this._loader.destroy();

      this._loader = null;
    }
  }
  /**
   * 开始加载，非流式处理优先使用xhr
   */
  ;

  _proto._loadInternal = function _loadInternal() {
    this._loading = true;
    this._aborted = false;
    var stats = this._stats;
    stats.code = 0;
    stats.tfirst = 0;
    stats.loaded = 0;

    if (this._retryTimeout) {
      clearTimeout(this._retryTimeout);
      this._retryTimeout = null;
    }

    if (this.context.progress) {
      this._loader = new (this._getInternalLoader(!!this._config.useFetch))();
    } else {
      this._loader = new XHR();
    }

    if (!this._loader) {
      return;
    }

    stats.id = this._loader.tag + "-" + loader_index; // 连接超时

    if (this._config.connectionTimeout) {
      this._requestTimeout = setTimeout(this._onTimeout.bind(this), this._config.connectionTimeout);
    }

    if (this.context.rangeEnd) {
      this.context.range = 'bytes=' + this.context.rangeStart + '-' + (this.context.rangeEnd - 1);
    } else if (this.context.rangeStart) {
      this.context.range = 'bytes=' + this.context.rangeStart + '-';
    }

    stats.tsload = Date.now();
    stats.tstart = performance.now();

    this._loader.load(this.context, this._loaderCallback);
  };

  _proto._abortInternal = function _abortInternal() {
    if (this._callbacks && this._callbacks.onAbort && !this._aborted && this._loading) {
      this._callbacks.onAbort(this.context, this._stats);
    }

    this._aborted = true;

    if (this._loader) {
      this._loader.abort();
    }
  };

  _proto.abort = function abort() {
    this._stopTimer();

    this._abortInternal();
  }
  /**
   * 停止所有计时器
   * 连接超时、重试延迟、传输超时
   */
  ;

  _proto._stopTimer = function _stopTimer() {
    if (this._requestTimeout) {
      clearTimeout(this._requestTimeout);
      this._requestTimeout = null;
    }

    if (this._retryTimeout) {
      clearTimeout(this._retryTimeout);
      this._retryTimeout = null;
    }

    this._stopTransmissionTimer();
  };

  _proto._onConnect = function _onConnect(status) {
    if (this._requestTimeout) {
      clearTimeout(this._requestTimeout);
      this._requestTimeout = null;
    }

    this._startTransmissionTimer();

    this._stats.code = status;
    this._stats.tfirst = Math.max(this._stats.trequest, performance.now());
  };

  _proto._onProgress = function _onProgress(context, chunk) {
    var stats = this._stats;
    this._progressTime = performance.now(); // 流式下载错误重试后，从中断位置继续抛出数据，与range断点续传冲突，不支持range时使用

    if (!this._continuedTransmissionRetry && stats.output > stats.loaded) {
      var size = stats.loaded + chunk.byteLength - stats.output;

      if (size > 0) {
        var tmp = chunk.slice(stats.output - stats.loaded);

        this._callProgress(this.context, tmp, stats);
      }
    } else {
      this._callProgress(this.context, chunk, stats);
    }

    stats.loaded += chunk.byteLength;
  };

  _proto._callProgress = function _callProgress(context, chunk, stats) {
    this._stats.output += chunk.byteLength;

    if (this._callbacks && this._callbacks.onProgress) {
      this._callbacks.onProgress(context, chunk, stats);
    }
  };

  _proto._onEnd = function _onEnd(context, responseData) {
    this._stopTimer();

    var stats = this._stats;

    if (responseData) {
      if (typeof responseData === 'string') {
        stats.total = stats.loaded = responseData.length || 0;
      } else {
        stats.total = stats.loaded = responseData.byteLength || 0;
      }
    } else {
      stats.total = stats.loaded;
    }

    stats.tload = Math.max(stats.tfirst, performance.now());
    this._loading = false;
    stats.output = 0;

    if (this._callbacks) {
      this._callbacks.onEnd(context, responseData, stats);
    }
  };

  _proto._onError = function _onError(e) {
    log["Log"].i(this.tag, e);

    this._stopTimer();

    this._destroyLoader();

    var stats = this._stats;
    var config = this._config;
    this._loading = false;
    stats.fatal = !config.maxRetry || stats.retry >= config.maxRetry || !config.maxRetry;
    stats.text = e.message || 'load error';

    if (this._callbacks && this._callbacks.onError) {
      this._callbacks.onError(this.context, stats);
    }

    if (stats.fatal) {
      return;
    } // 尝试使用range做断点续传


    if (this._stats.output && this._stats.loaded > 0) {
      if (this._rangeStart) {
        this.context.rangeStart = this._rangeStart + this._stats.output;
      } else {
        this.context.rangeStart = this._stats.output;
      }

      this._continuedTransmissionRetry = true;
    } else {
      this.context.rangeStart = this._rangeStart;
      this._continuedTransmissionRetry = false;
    }

    stats.retry++;

    if (this._callbacks) {
      if (this._retryDelay) {
        this._retryTimeout = setTimeout(this._loadInternal.bind(this), this._retryDelay);
        this._retryDelay = 2 * this._retryDelay;
      } else {
        this._loadInternal();
      }
    }
  };

  _proto._onTimeout = function _onTimeout() {
    this._loading = false;

    this._abortInternal();

    var e = new Error('timeout');

    this._onError(e);
  } // 传输超时
  ;

  _proto._startTransmissionTimer = function _startTransmissionTimer() {
    var _this = this;

    this._stopTransmissionTimer();

    this._progressTime = performance.now();
    var timeout = this._config.transmissionTimeout || 0;

    if (timeout) {
      this._transTimer = setInterval(function () {
        if (performance.now() - _this._progressTime > timeout) {
          _this._onTimeout();
        }
      }, 1000);
    }
  };

  _proto._stopTransmissionTimer = function _stopTransmissionTimer() {
    if (this._transTimer) {
      clearInterval(this._transTimer);
      this._transTimer = null;
    }
  };

  return Loader;
}();


// CONCATENATED MODULE: ./src/core/report-types.ts
var REPORT_TYPES = {
  START_LOAD_STREAM: 'startLoadStream',
  LOADER_CHUNK_ARRIVAL: 'loader-chunk-arrival',
  KEY_FRAME: 'keyFrame'
};
// CONCATENATED MODULE: ./src/core/trans-flv.ts


function trans_flv_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function trans_flv_createClass(Constructor, protoProps, staticProps) { if (protoProps) trans_flv_defineProperties(Constructor.prototype, protoProps); if (staticProps) trans_flv_defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function trans_flv_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }













/**
 * TransFLV
 * @class TransFLV
 * @param {object} config 配置
 */

var trans_flv_tag = 'TransFLV';

var trans_flv_TransFLV =
/*#__PURE__*/
function (_Observer) {
  trans_flv_inheritsLoose(TransFLV, _Observer);

  function TransFLV(config, media) {
    var _this;

    _this = _Observer.call(this) || this;
    _this._config = void 0;
    _this._media = void 0;
    _this._w = void 0;
    _this._flv = void 0;
    _this._observer = void 0;
    _this._loader = null;
    _this._loaderConf = void 0;
    _this._loaderCallbacks = void 0;
    _this._multirate = void 0;
    _this._contiguous = void 0;
    _this._remuxId = void 0;
    _this._discontinuity = false;
    _this._accurateTimeOffset = false;
    _this._baseTimeSec = 0;
    _this._tagDump = void 0;
    _this._currentUrl = void 0;
    _this._lastDTS = 0;
    _this._isAbr = false;
    _this._progressTime = 0;

    _this._onKeyframe = function (timestamp) {
      if (_this._multirate) {
        var result = _this._multirate.onKeyFrame(timestamp);

        if (result) {
          if (_this._tagDump) {
            _this._tagDump.reset();
          } // 平滑切换


          var info = Object(object_assign["ObjectAssign"])({}, result);

          _this._baseTimeSec = _this._lastDTS;

          _this.emit(core_events["default"].LEVEL_SWITCHING, {
            level: info.level,
            startSec: _this._baseTimeSec,
            smooth: true
          });

          _this._media.updateStreamTime(0, 0);

          return info;
        }
      }

      return;
    };

    _this._onMessage = function (ev, data) {
      switch (ev) {
        case core_events["default"].FLV_HEAD:
          if (_this._w) {
            _this._w.postMessage({
              cmd: 'flvHead',
              hasAudio: data.hasAudio,
              hasVideo: data.hasVideo
            });
          } else if (_this._flv) {
            _this._flv.flvHead(data.hasAudio, data.hasVideo);
          }

          break;

        case core_events["default"].PARSING_INIT_SEGMENT:
          _this.emit(core_events["default"].PARSING_INIT_SEGMENT, data);

          break;

        case core_events["default"].PARSING_DATA:
          {
            if (data.extra && data.extra.remuxId !== _this._remuxId) {
              // 过期
              break;
            }

            if (data.type === 'audio' && data.startDTS > _this._baseTimeSec) {
              _this._media.updateStreamTime(data.streamDTS, data.startDTS);
            }

            _this._lastDTS = data.startDTS;

            _this.emit(core_events["default"].PARSING_DATA, {
              data: data.payload,
              type: data.type,
              startDTS: data.startDTS || 0,
              endDTS: data.endDTS || 0,
              startPTS: data.startPTS || 0,
              endPTS: data.endPTS || 0,
              duration: data.endDTS - data.startDTS,
              framesInfo: data.framesInfo
            });
          }
          break;

        case core_events["default"].DISCONTINUITY:
          if (_this._w) {
            _this._w.postMessage({
              cmd: 'flush'
            });
          } else if (_this._flv) {
            _this._flv.flush();
          }

          _this._tagDump.reset();

          _this._discontinuity = true;
          _this._accurateTimeOffset = false;
          _this._contiguous = false;
          _this._baseTimeSec = data;
          break;

        default:
          // LOST_FRAMES SCRIPT_PARSED REPORT ERROR END
          _this.emit(ev, data);

          break;
      }
    };

    _this._config = config;
    _this._media = media;

    if (config.manifest) {
      if (abr_manifest_AbrManifest.verify(config.manifest)) {
        _this._isAbr = true;
      } else {
        config.hasVideo = config.manifest.hasVideo;
        config.hasAudio = config.manifest.hasAudio;
      }
    }

    _this._loaderConf = {
      connectionTimeout: _this._config.connectionTimeout,
      transmissionTimeout: _this._config.transmissionTimeout,
      maxRetry: 0,
      retryDelay: 0,
      useFetch: true
    };
    _this._loaderCallbacks = {
      onProgress: _this._onProgress.bind(_assertThisInitialized(_this)),
      onError: _this._onLoaderError.bind(_assertThisInitialized(_this)),
      onEnd: _this._onLoaderEnd.bind(_assertThisInitialized(_this)),
      onAbort: _this._onAbort.bind(_assertThisInitialized(_this))
    };
    _this._contiguous = false;
    _this._remuxId = 1;
    var observer = _this._observer = new core_observer["default"]();
    var onMessage = _this._onMessage;
    observer.on(core_events["default"].PARSING_INIT_SEGMENT, onMessage);
    observer.on(core_events["default"].PARSING_DATA, onMessage);
    observer.on(core_events["default"].ERROR, onMessage);
    observer.on(core_events["default"].SCRIPT_PARSED, onMessage);
    observer.on(core_events["default"].DISCONTINUITY, onMessage);
    observer.on(core_events["default"].FLV_HEAD, onMessage);
    _this._tagDump = new flv_tag_dump(observer, _this._onKeyframe);

    if (_this._config.webWorker) {
      log["Log"].i(trans_flv_tag, 'webWorker');
      _this._onWorkMessage = _this._onWorkMessage.bind(_assertThisInitialized(_this));
      _this._w = webworkify_webpack_default()(/*require.resolve*/(/*! ../demux/flv/flv-demuxer-worker */ "./src/demux/flv/flv-demuxer-worker.ts"));

      if (_this._w) {
        _this._w.addEventListener('message', _this._onWorkMessage);

        _this._w.postMessage({
          cmd: 'init',
          config: _this._config,
          data: {
            remuxId: _this._remuxId
          },
          vendor: navigator.vendor
        });

        return _assertThisInitialized(_this);
      }
    }

    _this._flv = new flv_demuxer_inline["default"](observer, _this._config, {
      remuxId: _this._remuxId
    }, navigator.vendor);

    _this._flv.init();

    return _this;
  }

  var _proto = TransFLV.prototype;

  _proto.init = function init() {
    if (this._isAbr && !this._multirate) {
      this._multirate = new multirate(this._config, this._media);

      this._multirate.on(core_events["default"].MANIFEST_PARSED, this._onMessage);

      this._multirate.init();
    }
  };

  _proto._onWorkMessage = function _onWorkMessage(ev) {
    var data = ev.data;

    if (ev.data.event === core_events["default"].PARSING_DATA) {
      data.data.payload = data.payload;
    }

    this._onMessage(ev.data.event, data.data);
  };

  /**
   * instance ioloader
   */
  _proto.loadSource = function loadSource() {
    var mr = this._multirate;

    if (mr) {
      var data = mr.levels[mr.currentLevel];

      if (data) {
        this._load(abrGetUrl(data.url, this._config.defaultSpts), mr.currentLevel);
      } else {
        this.emit(core_events["default"].ERROR, {
          type: errors["ErrorTypes"].OTHER_ERROR,
          details: errors["ErrorDetails"].PARSING_ERROR,
          fatal: true,
          reason: 'manifest parse error'
        });
      }
    } else {
      this._load(this._config.src);
    }
  }
  /**
   * destroy
   */
  ;

  _proto.destroy = function destroy() {
    if (this._loader) {
      this._loader.destroy();

      this._loader = null;
    }

    if (this._w) {
      this._w.postMessage({
        cmd: 'destroy'
      });

      this._w.removeEventListener('message', this._onWorkMessage);

      this._w.terminate();
    }

    if (this._flv) {
      this._flv.destroy();

      this._flv = undefined;
    }

    if (this._multirate) {
      this._multirate.removeAllListeners();

      this._multirate.destory();
    }

    var observer = this._observer;

    if (observer) {
      observer.removeAllListeners();
    }
  };

  _proto._load = function _load(url, index) {
    if (index === void 0) {
      index = 0;
    }

    if (this._loader) {
      this._loader.destroy();

      this._loader = null;
    }

    if (this._multirate) {
      this._multirate.onLevelLoad(index);
    }

    this._currentUrl = url;
    var level = this.levels[index];
    this.emit(core_events["default"].REPORT, {
      type: REPORT_TYPES.START_LOAD_STREAM,
      url: url,
      sync: this._baseTimeSec,
      index: index,
      bitrate: level ? level.bitrate : 0
    });

    if (!this._loader) {
      this._loader = new loader_Loader();
    }

    var context = {
      url: url,
      progress: true,
      responseType: 'arraybuffer',
      credentials: this._config.credentials
    };

    if (this._loader instanceof loader_Loader) {
      this._loader.load(context, this._loaderCallbacks, this._loaderConf);
    }
  };

  _proto._append = function _append(tags, timeOffset, discontinuity, contiguous, accurateTimeOffset) {
    if (this._w) {
      this._w.postMessage({
        cmd: 'append',
        tags: tags,
        timeOffset: timeOffset || 0,
        discontinuity: discontinuity,
        contiguous: contiguous,
        accurateTimeOffset: accurateTimeOffset
      });
    } else if (this._flv) {
      this._flv.append(tags, timeOffset || 0, discontinuity, contiguous, accurateTimeOffset);
    }
  };

  _proto._onProgress = function _onProgress(context, data, stats) {
    if (!(data instanceof ArrayBuffer)) {
      return;
    }

    if (this._multirate) {
      this._multirate.onLoaderChunk(data.byteLength);
    }

    this.emit(core_events["default"].REPORT, {
      type: REPORT_TYPES.LOADER_CHUNK_ARRIVAL,
      byteLength: data.byteLength,
      timeCost: performance.now() - this._progressTime || stats.trequest,
      header: context.responseHeader
    });
    this._progressTime = performance.now();

    var result = this._tagDump.append(data);

    this._append(result.list, this._baseTimeSec, this._discontinuity, this._contiguous, this._accurateTimeOffset);

    this._accurateTimeOffset = true;
    this._contiguous = true;
    this._discontinuity = false; // 是否需要切换

    if (result.abr) {
      this._load(result.abr.url, result.abr.level);
    }
  };

  _proto._onAbort = function _onAbort() {};

  _proto._onLoaderError = function _onLoaderError(context, status) {
    if (!status.fatal) {
      return;
    }

    var errInfo = {
      type: errors["ErrorTypes"].NETWORK_ERROR,
      details: errors["ErrorDetails"].LOAD_ERROR,
      fatal: true,
      reason: status.text,
      statusCode: status.code,
      url: context.url
    };
    this.emit(core_events["default"].ERROR, errInfo);
  };

  _proto._onLoaderEnd = function _onLoaderEnd() {
    if (this._w) {
      this._w.postMessage({
        cmd: 'end'
      });
    } else if (this._flv) {
      this._flv.end();
    }
  };

  _proto._refreshRemuxId = function _refreshRemuxId() {
    this._remuxId++;
    var data = {
      remuxId: this._remuxId
    };

    if (this._w) {
      this._w.postMessage({
        cmd: 'setExtra',
        data: data
      });
    } else if (this._flv) {
      this._flv.setExtra(data);
    }
  };

  trans_flv_createClass(TransFLV, [{
    key: "autoLevelEnabled",
    get: function get() {
      if (this._multirate) {
        return this._multirate.autoLevelEnabled;
      }

      return false;
    }
  }, {
    key: "levels",
    get: function get() {
      if (this._multirate) {
        return this._multirate.levels;
      }

      return [];
    }
  }, {
    key: "nextLevel",
    get: function get() {
      if (this._multirate) {
        return this._multirate.nextLevel;
      }

      return 0;
    },
    set: function set(value) {
      var mr = this._multirate;

      if (mr) {
        mr.nextLevel = value;
      }
    }
  }, {
    key: "currentLevel",
    get: function get() {
      if (this._multirate) {
        return this._multirate.currentLevel;
      }

      return 0;
    },
    set: function set(value) {
      var mr = this._multirate;

      if (mr) {
        var load = value >= 0 || value !== mr.currentLevel;
        mr.currentLevel = value;
        var data = mr.levels[mr.currentLevel];

        if (load && data) {
          this._currentUrl = abrGetUrl(data.url, this._config.defaultSpts);

          this._refreshRemuxId();

          this._contiguous = false;
          this._discontinuity = true;
          this._accurateTimeOffset = false;

          if (this._tagDump) {
            this._tagDump.reset();
          }

          this._baseTimeSec = this._media.currentTime;
          this.emit(core_events["default"].LEVEL_SWITCHING, {
            level: mr.currentLevel,
            startSec: this._baseTimeSec,
            smooth: false
          });

          this._load(this._currentUrl, mr.currentLevel);
        }
      }
    }
  }]);

  return TransFLV;
}(core_observer["default"]);


// CONCATENATED MODULE: ./src/utils/get-error-code.ts
var ErrorCodeList = {
  400: '01',
  // http 400
  401: '02',
  // http 401
  403: '03',
  // http 403
  404: '04',
  // http 404
  other4xx: '05',
  // http 4xx
  serverError: '06',
  // http 5xx
  timeoutOpen: '07',
  timeoutIO: '08',
  200: '09',
  206: '09'
};
function getErrorCode(detail, reason, httpStatusCode) {
  if (httpStatusCode === void 0) {
    httpStatusCode = 0;
  }

  if (detail >= 100) {
    return detail;
  }

  var code = '00';

  if (reason === 'timeout') {
    if (!httpStatusCode) {
      code = ErrorCodeList.timeoutOpen || code;
      ;
    } else {
      code = ErrorCodeList.timeoutIO || code;
      ;
    }
  } else if (ErrorCodeList.hasOwnProperty(httpStatusCode)) {
    code = ErrorCodeList[httpStatusCode] || code;
  } else if (/^4\d{2}$/.test(httpStatusCode.toString())) {
    code = ErrorCodeList.other4xx || code;
    ;
  } else if (/^5\d{2}$/.test(httpStatusCode.toString())) {
    code = ErrorCodeList.serverError || code;
    ;
  }

  return parseInt(detail + code, 10);
}
// CONCATENATED MODULE: ./src/utils/is-supported.ts



function isSupported() {
  var mediaSource = getMediaSource();
  var sourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer;
  var isTypeSupported = mediaSource && typeof mediaSource.isTypeSupported === 'function' && mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  var sourceBufferValidAPI = !sourceBuffer || sourceBuffer.prototype && typeof sourceBuffer.prototype.appendBuffer === 'function' && typeof sourceBuffer.prototype.remove === 'function';
  var streaming = FetchLoader.isSupport() || XHR.isSupportChunk() === XHR_TYPE.MOZ_CHUNK;
  return isTypeSupported && sourceBufferValidAPI && streaming;
}
// CONCATENATED MODULE: ./src/types/monitor-data.ts
function getNewMonitorData() {
  return {
    decodedFPS: 0,
    droppedFPS: 0,
    decodedFrames: 0,
    droppedFrames: 0,
    loadStartTime: 0,
    firstFrameTime: 0,
    blockDuration: 0,
    blockCount: 0,
    downloadedBytes: 0
  };
}
// CONCATENATED MODULE: ./src/monitor/fps.ts
/*
 * FPS Controller
 */
var _window = window,
    fps_performance = _window.performance;

var FPS =
/*#__PURE__*/
function () {
  function FPS() {
    this.tag = 'fps';
    this._lastDroppedFrames = 0;
    this._lastDecodedFrames = 0;
    this._video = null;
    this._isVideoPlaybackQualityAvailable = false;
    this._lastTime = 0;
    this._decoded = 0;
    this._dropped = 0;
  }

  var _proto = FPS.prototype;

  _proto.attachMedia = function attachMedia(media) {
    var video = this._video = media instanceof window.HTMLVideoElement ? media : null;

    if (video) {
      // 部分浏览器seek后帧数信息归零的问题
      this._isVideoPlaybackQualityAvailable = typeof video.getVideoPlaybackQuality === 'function';
    }
  };

  _proto.destory = function destory() {};

  _proto.reset = function reset() {
    this._lastTime = fps_performance.now();
    this._lastDroppedFrames = this._lastDecodedFrames = this._decoded = this._dropped = 0;
    var video = this._video;

    if (video) {
      try {
        if (this._isVideoPlaybackQualityAvailable) {
          var videoPlaybackQuality = video.getVideoPlaybackQuality();
          this._lastDecodedFrames = videoPlaybackQuality.totalVideoFrames;
          this._lastDroppedFrames = videoPlaybackQuality.droppedVideoFrames;
        } else {
          this._lastDecodedFrames = video.webkitDecodedFrameCount;
          this._lastDroppedFrames = video.webkitDroppedFrameCount;
        }
      } catch (e) {
        return;
      }
    }
  };

  _proto.checkFPSInterval = function checkFPSInterval() {
    var video = this._video;
    var currentTime = fps_performance.now();
    var info = null,
        decoded = 0,
        dropped = 0;

    if (video) {
      if (this._isVideoPlaybackQualityAvailable) {
        var videoPlaybackQuality = video.getVideoPlaybackQuality();
        decoded = videoPlaybackQuality.totalVideoFrames;
        dropped = videoPlaybackQuality.droppedVideoFrames;
      } else {
        decoded = video.webkitDecodedFrameCount || 0;
        dropped = video.webkitDroppedFrameCount || 0;
      }
    }

    if (decoded) {
      if (decoded < this._lastDecodedFrames) {
        this._lastDecodedFrames = 0;
        this._lastDroppedFrames = 0;
      }

      var currentPeriod = currentTime - this._lastTime,
          currentDropped = dropped - this._lastDroppedFrames,
          currentDecoded = decoded - this._lastDecodedFrames,
          droppedFPS = 0,
          decodedFPS = 0;

      if (this._lastTime) {
        droppedFPS = parseFloat((1000 * currentDropped / currentPeriod).toFixed(2)), decodedFPS = parseFloat((1000 * currentDecoded / currentPeriod).toFixed(2));
      }

      this._decoded = this._decoded += currentDecoded;
      this._dropped = this._dropped += currentDropped;
      this._lastTime = currentTime;
      this._lastDroppedFrames = dropped;
      this._lastDecodedFrames = decoded;
      info = {
        decoded: this._decoded,
        dropped: this._dropped,
        decodedFPS: decodedFPS,
        droppedFPS: droppedFPS
      };
    }

    this._lastTime = currentTime;
    return info;
  };

  return FPS;
}();

/* harmony default export */ var fps = (FPS);
// CONCATENATED MODULE: ./src/monitor/stream-monitor.ts


function stream_monitor_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function stream_monitor_createClass(Constructor, protoProps, staticProps) { if (protoProps) stream_monitor_defineProperties(Constructor.prototype, protoProps); if (staticProps) stream_monitor_defineProperties(Constructor, staticProps); return Constructor; }

var RECORD_NUM_LIMIT = 10;
var RECORD_DOWNLOAD_NUM_LIMIT = 200;
var RECORD_SEGMRNT_NUM_LIMIT = 100;

/**
 * 监测流下载、remux质量信息
 */
var stream_monitor_StreamMonitor =
/*#__PURE__*/
function () {
  function StreamMonitor() {
    this._qos = void 0;
    this.reset();
  }
  /**
   * 重置状态
   */


  var _proto = StreamMonitor.prototype;

  _proto.reset = function reset() {
    this._qos = {
      traffic: 0,
      streams: [],
      download: []
    };
  }
  /**
   * 收到关键帧
   */
  ;

  _proto.onKeyFrame = function onKeyFrame() {
    this._qos.streams[this._qos.streams.length - 1].keyFrame++;
  }
  /**
   * 开始加载新流，增加一调流记录
   * @param index 流id
   * @param startPos 流开始位置
   * @param url 流地址
   * @param bitrate 流码率
   */
  ;

  _proto.onStreamOpen = function onStreamOpen(index, startPos, url, bitrate) {
    if (this._qos.streams.length > RECORD_NUM_LIMIT) {
      this._qos.streams.shift();
    }

    this._qos.streams.push({
      index: index,
      startPos: startPos,
      url: url,
      bitrate: bitrate,
      traffic: 0,
      loadTimeCost: 0,
      keyFrame: 0,
      videoDataRate: 0,
      audioDataRate: 0,
      segments: {}
    });
  }
  /**
   * 收到媒体信息，解完音视频头之后
   * @param data 媒体信息
   */
  ;

  _proto.onMediaInfo = function onMediaInfo(data) {
    var info = this.loadingInfo;

    if (info) {
      info.mediaInfo = Object(object_assign["ObjectAssign"])({}, data);
    }
  }
  /**
   * 数据下载相关信息
   * @param data 下载信息
   */
  ;

  _proto.onDataReceive = function onDataReceive(data) {
    this._qos.traffic += data.byteLength;
    var log = this._qos.download;

    if (log.length > RECORD_DOWNLOAD_NUM_LIMIT) {
      log.pop();
    }

    log.unshift(data);
    var info = this._qos.streams[this._qos.streams.length - 1];
    info.traffic += data.byteLength;
    info.loadTimeCost += data.timeCost;
  };

  _proto.onMediaSegment = function onMediaSegment(data) {
    var qos = this._qos;
    var stream = qos.streams[qos.streams.length - 1];
    var log = stream.segments[data.type] || [];
    stream.segments[data.type] = log;
    log.push({
      duration: data.duration,
      dts: data.dts,
      len: data.byteLength
    }); // datarate

    if (log.length > RECORD_SEGMRNT_NUM_LIMIT) {
      log.shift();
    }

    var duration = 0;
    var totalLen = 0;

    for (var i = 0; i < log.length; i++) {
      totalLen += log[i].len;
      duration += log[i].duration;
    }

    if (duration > 0) {
      if (data.type === 'video') {
        stream.videoDataRate = Math.round(totalLen * 8 / duration);
      } else if (data.type === 'audio') {
        stream.audioDataRate = Math.round(totalLen * 8 / duration);
      }
    }
  }
  /**
   * 获取指定位置的流质量信息
   * @param sec 视频时间轴时间（毫秒）
   */
  ;

  _proto.getInfoByTime = function getInfoByTime(sec) {
    for (var i = this._qos.streams.length - 1; i >= 0; i--) {
      if (this._qos.streams[i].startPos < sec) {
        return this._qos.streams[i];
      }
    }

    return null;
  }
  /**
   * 更新当前下载流的开始时间
   * @param sec 时间（毫秒）
   */
  ;

  _proto.updateStartPos = function updateStartPos(sec) {
    if (this._qos.streams.length) {
      this._qos.streams[this._qos.streams.length - 1].startPos = sec;
    }
  }
  /**
   * 获取当前正在加载的流质量信息
   */
  ;

  stream_monitor_createClass(StreamMonitor, [{
    key: "loadingInfo",
    get: function get() {
      if (this._qos.streams.length) {
        return this._qos.streams[this._qos.streams.length - 1];
      }

      return null;
    }
    /**
     * 当前下载速度
     */

  }, {
    key: "downloadSpeed",
    get: function get() {
      var qos = this._qos;
      var tsEnd = performance.now();
      var len = 0,
          timeCost = 0;

      for (var i = 0; i < qos.download.length; i++) {
        if (qos.download[i].ts > tsEnd - 1000) {
          len += qos.download[i].byteLength;
          timeCost += qos.download[i].timeCost;
        } else {
          break;
        }
      }

      return Math.round(len / timeCost * 1000) || 0;
    }
    /**
     * 当前加载流信息
     */

  }, {
    key: "mediaInfo",
    get: function get() {
      if (this._qos.streams.length) {
        return this._qos.streams[this._qos.streams.length - 1].mediaInfo;
      }

      return null;
    }
    /**
     * 当前加载流视频视频码率
     */

  }, {
    key: "videoDataRate",
    get: function get() {
      if (this._qos.streams.length) {
        return this._qos.streams[this._qos.streams.length - 1].videoDataRate;
      }

      return 0;
    }
    /**
     * 当前加载流视频音频码率
     */

  }, {
    key: "audioDataRate",
    get: function get() {
      if (this._qos.streams.length) {
        return this._qos.streams[this._qos.streams.length - 1].audioDataRate;
      }

      return 0;
    }
    /**
     * 当前加载流视频码率
     */

  }, {
    key: "bitrate",
    get: function get() {
      if (this._qos.streams.length) {
        return this._qos.streams[this._qos.streams.length - 1].bitrate;
      }

      return 0;
    }
    /**
     * 下载数据量（字节）
     */

  }, {
    key: "traffic",
    get: function get() {
      return this._qos.traffic;
    }
    /**
     * 下载，remux质量数据
     */

  }, {
    key: "data",
    get: function get() {
      return this._qos;
    }
  }]);

  return StreamMonitor;
}();


// CONCATENATED MODULE: ./src/monitor/monitor.ts
function monitor_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function monitor_createClass(Constructor, protoProps, staticProps) { if (protoProps) monitor_defineProperties(Constructor.prototype, protoProps); if (staticProps) monitor_defineProperties(Constructor, staticProps); return Constructor; }

function monitor_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }







var HEARTBEAT_INTERVAL = 1000;
/**
 * 播放日志处理。收集播放器事件，集中处理
 */

var monitor_Monitor =
/*#__PURE__*/
function (_EventEmitter) {
  monitor_inheritsLoose(Monitor, _EventEmitter);

  function Monitor(media) {
    var _this;

    _this = _EventEmitter.call(this) || this;
    _this._media = void 0;
    _this._fps = void 0;
    _this._data = void 0;
    _this._playing = false;
    _this._sm = void 0;
    _this._hbTimer = void 0;

    _this._heartbeat = function () {
      _this._refresh();

      var data = _this._data;
      var sm = _this._sm;
      var hb = {
        totalReceive: sm.traffic,
        speed: sm.downloadSpeed,
        videoDataRate: sm.videoDataRate,
        audioDataRate: sm.audioDataRate,
        decodedFPS: data.decodedFPS,
        droppedFPS: data.droppedFPS,
        decodedFrames: data.decodedFrames,
        droppedFrames: data.droppedFrames
      };

      _this.emit(core_events["default"].HEARTBEAT, hb);
    };

    _this._sm = new stream_monitor_StreamMonitor();
    _this._media = media;

    _this.reset();

    return _this;
  }
  /**
   * 重置状态
   */


  var _proto = Monitor.prototype;

  _proto.reset = function reset() {
    this._data = getNewMonitorData();

    this._sm.reset();

    if (this._fps) {
      this._fps.reset();
    }

    this._refresh();
  }
  /**
   * 记录事件及对应的数据
   * @param {object} event 事件数据
   * @param {string} type 事件类型
   */
  ;

  _proto.onReport = function onReport(event) {
    event.ts = event.ts || performance.now();
    var data = this._data;

    switch (event.type) {
      case REPORT_TYPES.LOADER_CHUNK_ARRIVAL:
        data.downloadedBytes += event.byteLength;

        this._sm.onDataReceive(event);

        break;

      case REPORT_TYPES.START_LOAD_STREAM:
        this._sm.onStreamOpen(event.index || 0, event.sync, event.url, event.bitrate);

        break;

      case REPORT_TYPES.KEY_FRAME:
        this._sm.onKeyFrame();

        break;
    }
  };

  _proto.destroy = function destroy() {
    if (this._fps) {
      this._fps.destory();

      this._fps = undefined;
    }

    this._stopHeartbeat();
  };

  _proto.onLoad = function onLoad() {
    this._startHeartbeat();

    if (this._media.video) {
      this._fps = new fps();

      this._fps.attachMedia(this._media.video);
    }
  };

  _proto.onSegmentInit = function onSegmentInit(data) {
    this._sm.onMediaInfo(data);
  };

  _proto.onLoadeddata = function onLoadeddata() {
    this._onFirstFrame();

    this._waitingEnd();
  };

  _proto.onCanplay = function onCanplay() {
    this._onFirstFrame();

    this._waitingEnd();
  };

  _proto.onPlaying = function onPlaying() {
    this._playing = true;

    this._waitingEnd();
  };

  _proto.onEnd = function onEnd() {
    this._waitingEnd();
  };

  _proto.onWaiting = function onWaiting(block) {
    if (this._playing && this._data.firstFrameTime && block) {
      this._waitingStart();
    }
  };

  _proto.onStopLoad = function onStopLoad() {
    this._stopHeartbeat();
  };

  _proto.onSegment = function onSegment(data) {
    this._sm.onMediaSegment(data);
  };

  _proto._refresh = function _refresh() {
    var fps;

    if (this._fps) {
      fps = this._fps.checkFPSInterval();
    }

    var data = this._data;

    if (fps) {
      data.decodedFPS = fps.decodedFPS;
      data.droppedFPS = fps.droppedFPS;
      data.droppedFrames = fps.dropped;
      data.decodedFrames = fps.decoded;
    } else {
      data.decodedFPS = data.droppedFPS = data.droppedFrames = data.decodedFrames = 0;
    }
  };

  _proto._onFirstFrame = function _onFirstFrame() {
    if (!this._data.firstFrameTime) {
      this._data.firstFrameTime = performance.now();
    }
  };

  _proto._waitingStart = function _waitingStart() {
    if (!this._data.bufferingStartMS) {
      this._data.blockCount++;
      this._data.bufferingStartMS = this._data.bufferingStartMS || performance.now();
    }
  };

  _proto._waitingEnd = function _waitingEnd() {
    if (this._data.bufferingStartMS) {
      this._data.blockDuration += performance.now() - this._data.bufferingStartMS;
    }

    this._data.bufferingStartMS = null;
  };

  _proto._startHeartbeat = function _startHeartbeat() {
    if (!this._hbTimer) {
      this._hbTimer = setInterval(this._heartbeat, HEARTBEAT_INTERVAL);
    }
  };

  _proto._stopHeartbeat = function _stopHeartbeat() {
    if (this._hbTimer) {
      clearInterval(this._hbTimer);
      this._hbTimer = undefined;
    }
  };

  monitor_createClass(Monitor, [{
    key: "data",
    get: function get() {
      return this._data;
    }
  }]);

  return Monitor;
}(events["EventEmitter"]);

/* harmony default export */ var monitor = (monitor_Monitor);
// CONCATENATED MODULE: ./src/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return src_Las; });





function src_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function src_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function src_createClass(Constructor, protoProps, staticProps) { if (protoProps) src_defineProperties(Constructor.prototype, protoProps); if (staticProps) src_defineProperties(Constructor, staticProps); return Constructor; }

function src_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }












 // 循环计时器间隔，毫秒

var MAIN_TIMER_INTERVAL = 200;
var BUFFER_THRESHOLD_DEFAULT = 0.5;
var BUFFER_THRESHOLD_STEP = 1;
var BUFFER_THRESHOLD_MAX = 3.5;
var STAT;
/**
 * Las controller
 * @export
 * @class Las
 */

(function (STAT) {
  STAT[STAT["NONE"] = 0] = "NONE";
  STAT[STAT["WAITING"] = 1] = "WAITING";
  STAT[STAT["SEEK"] = 2] = "SEEK";
  STAT[STAT["SELECT_BITRATE"] = 3] = "SELECT_BITRATE";
  STAT[STAT["INIT"] = 4] = "INIT";
})(STAT || (STAT = {}));

var src_Las =
/*#__PURE__*/
function (_EventEmitter) {
  src_inheritsLoose(Las, _EventEmitter);

  // (秒)发生卡顿时的buffer阈值，大于该阈值认为浏览器播放卡住，并尝试进行修正
  Las.isSupport = function isSupport() {
    return isSupported();
  };

  src_createClass(Las, null, [{
    key: "version",
    get: function get() {
      return "1.0.2";
    }
  }, {
    key: "Events",
    get: function get() {
      return core_events["default"];
    }
  }, {
    key: "ErrorTypes",
    get: function get() {
      return errors["ErrorTypes"];
    }
  }, {
    key: "ErrorDetails",
    get: function get() {
      return errors["ErrorDetails"];
    }
  }]);

  function Las(config) {
    var _this;

    _this = _EventEmitter.call(this) || this;
    _this.tag = 'las';
    _this._config = void 0;
    _this._video = void 0;
    _this._mse = void 0;
    _this._trans = void 0;
    _this._stat = STAT.INIT;
    _this._seekOnCanplay = false;
    _this._audioCodecSwap = false;
    _this._error = void 0;
    _this._audioCodec = '';
    _this._recoverMediaErrorTime = 0;
    _this._mainTimer = void 0;
    _this._media = void 0;
    _this._nextLevel = [];
    _this._mediaInfo = void 0;
    _this._bufferThreshold = BUFFER_THRESHOLD_DEFAULT;
    _this._loadStopped = false;
    _this._seekOnUpdateEnd = false;
    _this._playingLevel = void 0;
    _this._startLevel = void 0;
    _this._monitor = void 0;

    _this._onVideoPlay = function () {
      if (!_this._error) {
        if (!_this._trans) {
          _this.load();
        }
      }
    };

    _this._onVideoEnded = function () {
      _this._monitor.onEnd();

      if (_this._mse) {
        _this._mse.flush();
      }
    };

    _this._resetMSE = function () {
      _this._seekOnUpdateEnd = false;

      if (_this._video) {
        log["Log"].i(_this.tag, 'rebuild mse');
        URL.revokeObjectURL(_this._video.src);
        _this._video.src = '';

        _this._video.removeAttribute('src');

        _this._destroyMSE();

        _this._initMSE(_this._video);
      }
    };

    _this._mainLoop = function () {
      var EPS = 1e-3;
      var video = _this._video;
      /**
       * 兼容非I帧开始切片，起播位置音视频不对齐，音视频数据缺失会导致buffer不连续或播放位置处于buffer外
       * 处理方式：手动seek至buffer内
       * 1. 忽略buffer内seek：WAITING_STAT.WAITING && !video.seeking
       * 2. buffer外seek、切换清晰度、起播：WAITING_SEEK || WAITING_SELECT_BITRATE || WAITING_INIT
       * 3. 无待清理buffer
       */

      if (video && (_this._stat === STAT.WAITING && !video.seeking || _this._stat === STAT.INIT || _this._stat === STAT.SEEK || _this._stat === STAT.SELECT_BITRATE) && _this._mse && !_this._mse.hasCleanUpTask() && !video.ended) {
        var currentTime = video.currentTime;

        var currentBuffer = _this._media.currentBuffer(currentTime);

        var jumpTo = undefined; // 卡顿位置无buffer

        if (!currentBuffer || currentBuffer.end - currentTime < 1) {
          var nextBuffer = _this._media.nextBuffer(currentTime);

          if (nextBuffer) {
            log["Log"].i(_this.tag, 'try fix block-A');
            jumpTo = nextBuffer.start;
          }
        } else if (video.buffered.length > 1 && currentBuffer.end - currentTime > 1) {
          // 多段buffer播放卡顿
          log["Log"].i(_this.tag, 'try fix block-B');
          jumpTo = currentBuffer.start;
        }

        if (jumpTo) {
          jumpTo = jumpTo + (browser["default"].safari ? 0.3 : EPS);

          _this._internalSeek(jumpTo);

          log["Log"].i(_this.tag, "jump to " + jumpTo);
        }
      }

      if (_this._nextLevel.length) {
        _this._checkLevelChange();
      }
    };

    _this._onVideoLoadeddata = function () {
      log["Log"].i(_this.tag, 'loadeddata');

      _this._monitor.onLoadeddata();
    };

    _this._onVideoCanplay = function () {
      log["Log"].v(_this.tag, "canplay " + !!_this._stat);

      _this._monitor.onCanplay();

      if (_this._video && _this._stat !== STAT.NONE) {
        _this._stat = STAT.NONE;

        _this._detectSeekOnCanplay();

        _this._checkLevelChange();

        if (!_this._video.paused) {
          // 兼容waiting后不触发playing
          _this._onVideoPlaying();
        }
      }
    };

    _this._onVideoWaiting = function () {
      if (!_this._video) {
        return;
      }

      _this._stat = _this._stat || STAT.WAITING;
      var block = !_this._video.seeking && _this._stat === STAT.WAITING;

      if (block) {
        _this._bufferThreshold = Math.min(_this._bufferThreshold + BUFFER_THRESHOLD_STEP, BUFFER_THRESHOLD_MAX);
      }

      if (block) {
        log["Log"].i(_this.tag, 'waiting currentTime:', _this._video.currentTime);
      }

      _this._monitor.onWaiting(block);
    };

    _this._onVideoPlaying = function () {
      log["Log"].i(_this.tag, 'playing');

      if (!_this._error) {
        _this._stat = STAT.NONE;

        _this._monitor.onPlaying();
      }
    };

    _this._onVideoError = function (error) {
      log["Log"].e(_this.tag, 'video error', error);

      if (_this._error) {
        return;
      }

      var now = performance.now();

      if (!_this._recoverMediaErrorTime || now - _this._recoverMediaErrorTime > 3000) {
        _this._recoverMediaErrorTime = now;
        _this._config.gopRemux = true;

        _this._recoverMediaError();

        return;
      }

      if (!_this._audioCodecSwap && _this._audioCodec) {
        _this._audioCodecSwap = true;

        _this._recoverSwapAudioCodec();

        _this._recoverMediaError();

        return;
      }

      var reason = 'video error';

      if (_this._video && _this._video.error) {
        reason += " code:" + _this._video.error.code + " message:" + _this._video.error.message;
      }

      _this._onError({
        type: errors["ErrorTypes"].MEDIA_ERROR,
        details: errors["ErrorDetails"].VIDEO_ERROR,
        fatal: true,
        reason: reason
      });
    };

    if (!_this.off) {
      _this.off = _this.removeListener;
    }

    _this._config = config_ConfigHelper.processConfig(config);
    _this._media = new core_media();

    if (!_this._config) {
      setTimeout(function () {
        _this._onError({
          type: errors["ErrorTypes"].OTHER_ERROR,
          details: errors["ErrorDetails"].CONFIG_ERROR,
          fatal: true,
          reason: 'config data error'
        });
      }, 0);
      return src_assertThisInitialized(_this);
    }

    if (!Las.isSupport()) {
      setTimeout(function () {
        _this._onError({
          type: errors["ErrorTypes"].OTHER_ERROR,
          details: errors["ErrorDetails"].UNSUPPORTED,
          fatal: true,
          reason: 'unsupported'
        });
      }, 0);
      return src_assertThisInitialized(_this);
    }

    _this._mainTimer = null;
    _this._stat = STAT.INIT;

    _this._startMainTimer();

    _this._initMonitor();

    log["Log"].i(_this.tag, Las.version, _this._config);
    return _this;
  }
  /**
   * 绑定video并初始化MSE
   */


  var _proto = Las.prototype;

  _proto.attachMedia = function attachMedia(video) {
    this._video = video;

    this._media.attachVideo(this._video);

    this._initMSE(video);

    this._bindVideoEvents();
  }
  /**
   * load
   * @param {string} src src
   */
  ;

  _proto.load = function load(src) {
    if (src === void 0) {
      src = undefined;
    }

    this._playingLevel = undefined;

    this._monitor.reset();

    if (src) {
      config_ConfigHelper.setSrc(this._config, src);
    }

    if (!this._config.src && !this._config.manifest) {
      this._onError({
        type: errors["ErrorTypes"].OTHER_ERROR,
        details: errors["ErrorDetails"].CONFIG_ERROR,
        fatal: true,
        reason: 'url empty'
      });

      return;
    }

    this._load();
  }
  /**
   * 恢复播放。从暂停、停止状态恢复
   */
  ;

  _proto.resume = function resume() {
    log["Log"].i(this.tag, 'call resume');

    if (this._loadStopped) {
      this._loadStopped = false;

      this._load();
    }

    if (this._video && this._video.paused) {
      this._video.play();
    }
  }
  /**
   * destroy
   */
  ;

  _proto.destroy = function destroy() {
    this._stopMonitor();

    this._stopMainTimer();

    this._unbindVideoEvents();

    this._stopVideo();
  };

  _proto.refresh = function refresh() {
    log["Log"].i(this.tag, 'call refresh');

    if (this._trans && this._mse && this._video) {
      this._startLevel = this._trans.currentLevel;
      this._nextLevel = [];

      this._stopVideo();

      this._initMSE(this._video);

      this._initTrans();

      if (this._trans) {
        this._trans.loadSource();
      }
    } else {
      log["Log"].v(this.tag, 'transmuxer & mediaSource not ready');
    }
  }
  /**
   * 停止加载，内核停止，用于直播停止
   */
  ;

  _proto.stopLoad = function stopLoad() {
    log["Log"].i(this.tag, 'call stopLoad');

    if (this._trans) {
      this._destroyTrans();

      this._mse.endOfData();

      this._loadStopped = true;

      this._monitor.onStopLoad();
    }
  };

  _proto.getMediaInfo = function getMediaInfo() {
    return Object(object_assign["ObjectAssign"])({}, this._mediaInfo);
  };

  _proto._bindVideoEvents = function _bindVideoEvents() {
    if (this._video) {
      this._video.addEventListener('loadeddata', this._onVideoLoadeddata);

      this._video.addEventListener('canplay', this._onVideoCanplay);

      this._video.addEventListener('waiting', this._onVideoWaiting);

      this._video.addEventListener('playing', this._onVideoPlaying);

      this._video.addEventListener('play', this._onVideoPlay);

      this._video.addEventListener('error', this._onVideoError);

      this._video.addEventListener('ended', this._onVideoEnded);
    }
  };

  _proto._unbindVideoEvents = function _unbindVideoEvents() {
    if (this._video) {
      this._video.removeEventListener('loadeddata', this._onVideoLoadeddata);

      this._video.removeEventListener('canplay', this._onVideoCanplay);

      this._video.removeEventListener('waiting', this._onVideoWaiting);

      this._video.removeEventListener('playing', this._onVideoPlaying);

      this._video.removeEventListener('play', this._onVideoPlay);

      this._video.removeEventListener('error', this._onVideoError);

      this._video.removeEventListener('ended', this._onVideoEnded);
    }
  }
  /**
   * 移除mediasource事件
   * @param {MSEController} mediaSource MSEController
   */
  ;

  _proto._unbindMediaSourceEvent = function _unbindMediaSourceEvent(mediaSource) {
    mediaSource.removeAllListeners();
  };

  /**
   * new mediaSource
   */
  _proto._initMSE = function _initMSE(video) {
    var _this2 = this;

    this._mse = new mse_controller_MSEController(this._config);

    this._mse.attach(video);

    this._media.attachMSE(this._mse);

    this._mse.on(core_events["default"].ERROR, function (errorMessage) {
      _this2._onError(errorMessage);
    });

    this._mse.on('updateend', function () {
      if (_this2._seekOnUpdateEnd && video.buffered.length) {
        log["Log"].i(_this2.tag, 'seek on updateend');

        _this2._internalSeek(video.buffered.start(0));

        _this2._seekOnUpdateEnd = false;
      }
    });

    this._mse.on('resetDone', function () {
      _this2._seekOnUpdateEnd = true;
    });
  }
  /**
   * 开始加载视频
   */
  ;

  _proto._load = function _load() {
    this._loadStopped = false;
    this._error = false;
    this._stat = STAT.INIT;
    this._bufferThreshold = BUFFER_THRESHOLD_DEFAULT;
    this._nextLevel = [];

    this._media.reset();

    this._monitor.onLoad();

    if (this._trans) {
      this._destroyTrans();
    }

    if (this._mse.hasSourceBuffer() || this._video && this._video.error) {
      this._resetMSE();
    }

    this._initTrans();

    if (this._trans) {
      this._trans.loadSource();
    }
  }
  /**
   * reset MSE，重用
   */
  ;

  _proto._verifyLevel = function _verifyLevel(value) {
    return !!(this._trans && this._trans.levels.length > 0 && value < this._trans.levels.length && value >= -1 && this._video && !this._video.ended);
  };

  _proto._transmuxerEvent = function _transmuxerEvent(trans) {
    var _this3 = this;

    var mse = this._mse;
    trans.on(core_events["default"].PARSING_DATA, function (data) {
      if (mse) {
        mse.mediaSegment(data);
      }

      if (_this3._monitor) {
        _this3._monitor.onSegment({
          type: data.type,
          byteLength: data.data.byteLength,
          dts: Math.floor(data.startDTS * 1000),
          duration: Math.floor(data.duration * 1000),
          framesInfo: data.framesInfo
        });
      }
    });
    trans.on(core_events["default"].PARSING_INIT_SEGMENT, function (data) {
      var video = data.tracks.video,
          audio = data.tracks.audio,
          audiovideo = data.tracks.audiovideo;
      var info = {
        segments: [],
        audiovideo: !!audiovideo,
        hasVideo: !!(video || audiovideo),
        hasAudio: !!(audio || audiovideo)
      };

      for (var key in data.tracks) {
        var track = data.tracks[key];

        Object(object_assign["ObjectAssign"])(info, track.metadata);

        if (track.initSegment) {
          info.segments.push({
            type: key,
            data: new Uint8Array(track.initSegment)
          });
        }
      }

      info.videoCodec = video ? video.codec : null;
      info.audioCodec = audio ? audio.codec : null;
      _this3._audioCodec = data.manifestAudioCodec || info.audioCodec;

      var mediaInfo = Object(object_assign["ObjectAssign"])({}, info);

      delete mediaInfo.segments;

      _this3._monitor.onSegmentInit(mediaInfo);

      _this3.emit(core_events["default"].MEDIA_INFO, mediaInfo);

      _this3._mediaInfo = mediaInfo;

      if (mse) {
        mse.trackInfo(info);
      }
    });
    trans.on(core_events["default"].ERROR, function (errorMessage) {
      _this3._onError(errorMessage);
    });
    trans.on(core_events["default"].LOAD_END, function () {
      if (mse) {
        mse.endOfData();
      }

      _this3.emit(core_events["default"].LOAD_END);
    });
    trans.on(core_events["default"].LEVEL_SWITCH_FAILED, function (data) {
      _this3.emit(core_events["default"].LEVEL_SWITCH_FAILED, data);
    });
    trans.on(core_events["default"].LEVEL_SWITCHING, function (data) {
      if (!data.smooth && _this3._mse) {
        _this3._mse.flush();
      }

      _this3.emit(core_events["default"].LEVEL_SWITCHING, {
        level: data.level
      });

      _this3._nextLevel = _this3._nextLevel.sort(function (a, b) {
        return a.startSec - b.startSec;
      }).filter(function (value) {
        return value.startSec < data.startSec;
      });

      _this3._nextLevel.push(data);
    });
    trans.on(core_events["default"].BUFFER_FLUSHING, function (data) {
      if (_this3._mse && _this3._video) {
        _this3._mse.flush(data.startSec, _this3._video.duration);
      }
    });
    trans.on(core_events["default"].SCRIPT_PARSED, function (data) {
      _this3.emit(core_events["default"].SCRIPT_PARSED, data);
    });
    trans.on(core_events["default"].MANIFEST_PARSED, function (data) {
      if (typeof _this3._playingLevel === 'number') {
        trans.currentLevel = _this3._playingLevel;
        return;
      }

      if (typeof _this3._startLevel === 'number') {
        trans.currentLevel = _this3._startLevel;
      }

      data = Object(object_assign["ObjectAssign"])({
        levels: _this3.levels.slice(0),
        currentLevel: _this3.currentLevel
      }, data);
      _this3._playingLevel = trans.currentLevel;
      log["Log"].i(_this3.tag, core_events["default"].MANIFEST_PARSED, data);

      _this3.emit(core_events["default"].MANIFEST_PARSED, data);
    });
    trans.on(core_events["default"].REPORT, function (data) {
      if (_this3._monitor) {
        _this3._monitor.onReport(data);
      }
    });
  };

  _proto._internalSeek = function _internalSeek(time) {
    if (this._video) {
      this._video.currentTime = time;
    }
  }
  /**
   * Check buffer length regularly and apply various policies to avoid buffering
   */
  ;

  _proto._detectSeekOnCanplay = function _detectSeekOnCanplay() {
    if (this._video && this._seekOnCanplay && this._mse && !this._mse.hasCleanUpTask()) {
      var EPS = 1 / 30;
      var mediaInfo = this._mediaInfo;

      if (mediaInfo && mediaInfo.fps && mediaInfo.fps > 0) {
        EPS = 1 / mediaInfo.fps;
      }

      if (this._media.isTimeinBuffered(this._video.currentTime + EPS)) {
        log["Log"].i(this.tag, "seek on canplay " + this._video.currentTime + " + " + EPS);
        this._seekOnCanplay = false;

        this._internalSeek(this._video.currentTime + EPS);
      }
    }
  }
  /**
   * 'waiting' event listener
   */
  ;

  /**
   * 错误处理
   * @param {*} data 错误数据
   */
  _proto._onError = function _onError(data) {
    log["Log"].i(this.tag, "on error " + JSON.stringify(data));
    var errInfo = {};

    if (data.type === errors["ErrorTypes"].NETWORK_ERROR) {
      errInfo.statusCode = data.statusCode;
      errInfo.url = data.url;
    }

    if (data.fatal) {
      var errorCode = getErrorCode(data.details, data.reason, data.statusCode || 0);
      this.stopLoad();

      this._stopMainTimer();

      if (data.details === errors["ErrorDetails"].VIDEO_ERROR || this._video && this._video.error) {
        this._destroyMSE();
      }

      errInfo.code = errorCode;
      errInfo.type = data.type;
      errInfo.reason = data.reason;

      if (!this._error) {
        this._error = errInfo;
        this.emit(core_events["default"].ERROR, errInfo);
      }
    }
  };

  _proto._startMainTimer = function _startMainTimer() {
    if (this._mainTimer === null) {
      this._mainTimer = setInterval(this._mainLoop, MAIN_TIMER_INTERVAL);
    }
  };

  _proto._stopMainTimer = function _stopMainTimer() {
    if (this._mainTimer) {
      clearInterval(this._mainTimer);
      this._mainTimer = null;
    }
  };

  _proto._checkLevelChange = function _checkLevelChange() {
    var d = this._nextLevel[0];

    if (this._video && d && this._video.currentTime >= d.startSec && this._media.isTimeinBuffered(this._video.currentTime)) {
      this.emit(core_events["default"].LEVEL_SWITCHED, {
        level: d.level
      });
      this._playingLevel = d.level;

      this._nextLevel.shift();
    }
  };

  _proto._stopVideo = function _stopVideo() {
    if (this._video) {
      URL.revokeObjectURL(this._video.src);
      this._video.src = '';

      this._video.removeAttribute('src');

      this._destroyTrans();

      this._destroyMSE();
    }
  };

  _proto._destroyTrans = function _destroyTrans() {
    if (this._trans) {
      this._trans.removeAllListeners();

      this._trans.destroy();

      this._trans = undefined;
    }
  };

  _proto._destroyMSE = function _destroyMSE() {
    if (this._mse) {
      this._unbindMediaSourceEvent(this._mse);

      this._mse.destroy();
    }
  };

  _proto._initTrans = function _initTrans() {
    this._trans = new trans_flv_TransFLV(this._config, this._media);

    this._transmuxerEvent(this._trans);

    this._trans.init();
  };

  _proto._initMonitor = function _initMonitor() {
    var _this4 = this;

    if (!this._monitor) {
      this._monitor = new monitor(this._media);

      this._monitor.on(core_events["default"].HEARTBEAT, function (value) {
        _this4.emit(core_events["default"].HEARTBEAT, value);
      });
    }
  };

  _proto._stopMonitor = function _stopMonitor() {
    if (this._monitor) {
      this._monitor.destroy();

      this._monitor.removeAllListeners();
    }
  }
  /**
   * 解码错误时尝试更换audio codec string
   */
  ;

  _proto._recoverSwapAudioCodec = function _recoverSwapAudioCodec() {
    var audioCodec = this._audioCodec;

    if (audioCodec.indexOf('mp4a.40.5') !== -1) {
      audioCodec = 'mp4a.40.2';
    } else {
      audioCodec = 'mp4a.40.5';
    }

    this._config.audioCodec = audioCodec;
    this._config.audioCodecSwap = true;
  }
  /**
   * 恢复video error，重新绑定video，加载视频
   */
  ;

  _proto._recoverMediaError = function _recoverMediaError() {
    if (!this._video) {
      return;
    }

    this._nextLevel = [];

    this._stopVideo();

    this._initMSE(this._video);

    this._initTrans();

    if (this._trans) {
      this._trans.loadSource();
    }
  };

  src_createClass(Las, [{
    key: "autoLevelEnabled",
    get: function get() {
      if (this._trans) {
        return this._trans.autoLevelEnabled;
      }

      return false;
    }
  }, {
    key: "levels",
    get: function get() {
      if (this._trans) {
        return this._trans.levels;
      }

      return [];
    }
  }, {
    key: "nextLevel",
    get: function get() {
      if (this._trans) {
        return this._trans.nextLevel;
      }

      return 0;
    },
    set: function set(value) {
      if (!this._verifyLevel(value) || !this._trans) {
        this.emit(core_events["default"].LEVEL_SWITCH_FAILED, {
          level: value
        });
        return;
      }

      this._trans.nextLevel = value;
    }
  }, {
    key: "currentLevel",
    get: function get() {
      if (this._trans) {
        return this._trans.currentLevel;
      }

      return 0;
    },
    set: function set(value) {
      if (!this._verifyLevel(value) || !this._trans) {
        this.emit(core_events["default"].LEVEL_SWITCH_FAILED, {
          level: value
        });
        return;
      }

      if (value === -1) {
        this._trans.nextLevel = value;
      } else {
        this._stat = STAT.SELECT_BITRATE;
        this._bufferThreshold = BUFFER_THRESHOLD_DEFAULT;
        this._seekOnCanplay = true;

        if (this._mse) {
          this._mse.flush();
        }

        this._trans.currentLevel = value;
      }
    }
  }, {
    key: "startLevel",
    get: function get() {
      return typeof this._startLevel === 'undefined' ? -1 : this._startLevel;
    },
    set: function set(value) {
      this._startLevel = value;
    }
  }, {
    key: "monitorData",
    get: function get() {
      if (this._monitor) {
        return this._monitor.data;
      }

      return;
    }
  }]);

  return Las;
}(events["EventEmitter"]);



/***/ }),

/***/ "./src/polyfills/object-assign.js":
/*!****************************************!*\
  !*** ./src/polyfills/object-assign.js ***!
  \****************************************/
/*! exports provided: ObjectAssign */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectAssign", function() { return ObjectAssign; });
/* eslint-disable */
var ObjectAssign = Object.assign || function assign(target, varArgs) {
  // .length of function is 2
  if (target == null) {
    // TypeError if undefined or null
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var to = Object(target);

  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments[index];

    if (nextSource != null) {
      // Skip over if undefined or null
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }

  return to;
};

/***/ }),

/***/ "./src/utils/browser.ts":
/*!******************************!*\
  !*** ./src/utils/browser.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable */
var Browser = {};

function detect() {
  // modified from jquery-browser-plugin
  var ua = self.navigator.userAgent.toLowerCase();
  var match = /(edge)\/([\w.]+)/.exec(ua) || /(opr)[\/]([\w.]+)/.exec(ua) || /(chrome)[ \/]([\w.]+)/.exec(ua) || /(iemobile)[\/]([\w.]+)/.exec(ua) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) || ua.indexOf('compatible') < 0 && /(firefox)[ \/]([\w.]+)/.exec(ua) || [];
  var platform_match = /(ipad)/.exec(ua) || /(ipod)/.exec(ua) || /(windows phone)/.exec(ua) || /(iphone)/.exec(ua) || /(kindle)/.exec(ua) || /(android)/.exec(ua) || /(windows)/.exec(ua) || /(mac)/.exec(ua) || /(linux)/.exec(ua) || /(cros)/.exec(ua) || [];
  var matched = {
    browser: match[5] || match[3] || match[1] || '',
    version: match[2] || match[4] || '0',
    majorVersion: match[4] || match[2] || '0',
    platform: platform_match[0] || ''
  };
  var browser = {};

  if (matched.browser) {
    browser[matched.browser] = true;
    var versionArray = matched.majorVersion.split('.');
    browser.version = {
      major: parseInt(matched.majorVersion, 10),
      string: matched.version
    };

    if (versionArray.length > 1) {
      browser.version.minor = parseInt(versionArray[1], 10);
    }

    if (versionArray.length > 2) {
      browser.version.build = parseInt(versionArray[2], 10);
    }
  }

  if (matched.platform) {
    browser[matched.platform] = true;
  }

  if (browser.chrome || browser.opr || browser.safari) {
    browser.webkit = true;
  } // MSIE. IE11 has 'rv' identifer


  if (browser.rv || browser.iemobile) {
    if (browser.rv) {
      delete browser.rv;
    }

    var msie = 'msie';
    matched.browser = msie;
    browser[msie] = true;
  } // Microsoft Edge


  if (browser.edge) {
    delete browser.edge;
    var msedge = 'msedge';
    matched.browser = msedge;
    browser[msedge] = true;
  } // Opera 15+


  if (browser.opr) {
    var opera = 'opera';
    matched.browser = opera;
    browser[opera] = true;
  } // Stock android browsers are marked as Safari


  if (browser.safari && browser.android) {
    var android = 'android';
    matched.browser = android;
    browser[android] = true;
  }

  browser.name = matched.browser;
  browser.platform = matched.platform;

  for (var key in Browser) {
    if (Browser.hasOwnProperty(key)) {
      delete Browser[key];
    }
  }

  Browser = browser; // Object.assign(Browser, browser);
}

detect();
/* harmony default export */ __webpack_exports__["default"] = (Browser);

/***/ }),

/***/ "./src/utils/log.ts":
/*!**************************!*\
  !*** ./src/utils/log.ts ***!
  \**************************/
/*! exports provided: Log, LOG_LEVEL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Log", function() { return Log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOG_LEVEL", function() { return LOG_LEVEL; });
var GLOBAL_TAG = 'kwai-k';
var FORCE_GLOBAL_TAG = true;
/**
 * 处理log参数
 * @param {string=} tag tag
 * @param {Array=} msg messages
 * @returns {Array} msg
 */

/**
 * 处理log参数
 * @param tag
 * @param msg
 */

function formatter(tag, msg) {
  if (!msg || msg.length === 0) {
    msg = [tag];
    tag = '';
  }

  tag = FORCE_GLOBAL_TAG ? GLOBAL_TAG + (tag ? '::' + tag : '') : tag || GLOBAL_TAG;
  msg.unshift('[' + tag + '] > ');
  return msg;
}

var LOG_LEVEL;
/**
 * console日志
 * @class
 */

(function (LOG_LEVEL) {
  LOG_LEVEL["LEVEL_ERROR"] = "e";
  LOG_LEVEL["LEVEL_WARN"] = "w";
  LOG_LEVEL["LEVEL_INFO"] = "i";
  LOG_LEVEL["LEVEL_DEBUG"] = "d";
  LOG_LEVEL["LEVEL_VERBOSE"] = "v";
})(LOG_LEVEL || (LOG_LEVEL = {}));

var Log =
/*#__PURE__*/
function () {
  function Log() {}

  /**
   * 设置日志输出等级
   * @param l 日志等级
   */
  Log.level = function level(l) {
    Log.ENABLE_ERROR = Log.ENABLE_WARN = Log.ENABLE_INFO = Log.ENABLE_DEBUG = Log.ENABLE_VERBOSE = false;

    switch (l) {
      case LOG_LEVEL.LEVEL_WARN:
        Log.ENABLE_ERROR = Log.ENABLE_WARN = true;
        break;

      case LOG_LEVEL.LEVEL_INFO:
        Log.ENABLE_ERROR = Log.ENABLE_WARN = Log.ENABLE_INFO = true;
        break;

      case LOG_LEVEL.LEVEL_DEBUG:
        Log.ENABLE_ERROR = Log.ENABLE_WARN = Log.ENABLE_INFO = Log.ENABLE_DEBUG = true;
        break;

      case LOG_LEVEL.LEVEL_VERBOSE:
        Log.ENABLE_ERROR = Log.ENABLE_WARN = Log.ENABLE_INFO = Log.ENABLE_DEBUG = Log.ENABLE_VERBOSE = true;
        break;

      default:
        Log.ENABLE_ERROR = true;
        break;
    }
  }
  /**
   * error日志
   * @param tag tag
   * @param msg 日志信息
   */
  ;

  Log.e = function e(tag) {
    if (!Log.ENABLE_ERROR) {
      return;
    }

    for (var _len = arguments.length, msg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      msg[_key - 1] = arguments[_key];
    }

    var out = formatter(tag, msg);
    (console.error || console.warn || console.log).apply(console, out);
  }
  /**
   * warn日志
   * @param tag tag
   * @param msg 日志信息
   */
  ;

  Log.w = function w(tag) {
    if (!Log.ENABLE_WARN) {
      return;
    }

    for (var _len2 = arguments.length, msg = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      msg[_key2 - 1] = arguments[_key2];
    }

    var out = formatter(tag, msg);
    (console.warn || console.log).apply(console, out);
  }
  /**
   * info日志
   * @param tag tag
   * @param msg 日志信息
   */
  ;

  Log.i = function i(tag) {
    if (!Log.ENABLE_INFO) {
      return;
    }

    for (var _len3 = arguments.length, msg = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      msg[_key3 - 1] = arguments[_key3];
    }

    var out = formatter(tag, msg);
    (console.info || console.log).apply(console, out);
  }
  /**
   * debug日志
   * @param tag tag
   * @param msg 日志信息
   */
  ;

  Log.d = function d(tag) {
    if (!Log.ENABLE_DEBUG) {
      return;
    }

    for (var _len4 = arguments.length, msg = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      msg[_key4 - 1] = arguments[_key4];
    }

    var out = formatter(tag, msg);
    (console.debug || console.log).apply(console, out);
  }
  /**
   * verbose日志
   * @param tag tag
   * @param msg 日志信息
   */
  ;

  Log.v = function v(tag) {
    if (!Log.ENABLE_VERBOSE) {
      return;
    }

    for (var _len5 = arguments.length, msg = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      msg[_key5 - 1] = arguments[_key5];
    }

    var out = formatter(tag, msg);
    console.log.apply(console, out);
  };

  return Log;
}();

Log.ENABLE_ERROR = true;
Log.ENABLE_WARN = false;
Log.ENABLE_INFO = false;
Log.ENABLE_DEBUG = false;
Log.ENABLE_VERBOSE = false;


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=index.js.map