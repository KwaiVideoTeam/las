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

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

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

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
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

  checkListener(listener);

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
    m = _getMaxListeners(target);
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
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
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
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

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
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:38:33 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:39:19
 * las.js中的错误相关定义
 */

/**
 * las.js错误类型定义
 */
var ErrorTypes;

(function (ErrorTypes) {
  ErrorTypes["NETWORK_ERROR"] = "networkError";
  ErrorTypes["MEDIA_ERROR"] = "mediaError";
  ErrorTypes["MUX_ERROR"] = "muxError";
  ErrorTypes["OTHER_ERROR"] = "otherError";
  ErrorTypes["MSE_ERROR"] = "mseError";
})(ErrorTypes || (ErrorTypes = {}));

;
/**
 * las.js具体错误定义
 */

var ErrorDetails;

(function (ErrorDetails) {
  ErrorDetails[ErrorDetails["LOAD_ERROR"] = 10] = "LOAD_ERROR";
  ErrorDetails[ErrorDetails["LOAD_ERROR_TIMEOUT"] = 11] = "LOAD_ERROR_TIMEOUT";
  ErrorDetails[ErrorDetails["VIDEO_ERROR"] = 101] = "VIDEO_ERROR";
  ErrorDetails[ErrorDetails["UNSUPPORTED"] = 102] = "UNSUPPORTED";
  ErrorDetails[ErrorDetails["CONFIG_ERROR"] = 103] = "CONFIG_ERROR";
  ErrorDetails[ErrorDetails["MANIFEST_ERROR"] = 104] = "MANIFEST_ERROR";
  ErrorDetails[ErrorDetails["NO_VIDEO"] = 105] = "NO_VIDEO";
  ErrorDetails[ErrorDetails["MEDIASOURCE_ERROR"] = 200] = "MEDIASOURCE_ERROR";
  ErrorDetails[ErrorDetails["ADDSOURCEBUFFER_ERROR"] = 201] = "ADDSOURCEBUFFER_ERROR";
  ErrorDetails[ErrorDetails["SOURCEBUFFER_ERROR"] = 202] = "SOURCEBUFFER_ERROR";
  ErrorDetails[ErrorDetails["ENDOFSTREAM_ERROR"] = 203] = "ENDOFSTREAM_ERROR";
  ErrorDetails[ErrorDetails["APPENDBUFFER_ERROR"] = 204] = "APPENDBUFFER_ERROR";
  ErrorDetails[ErrorDetails["DEMUX_ERROR"] = 301] = "DEMUX_ERROR";
  ErrorDetails[ErrorDetails["REMUX_ERROR"] = 302] = "REMUX_ERROR";
  ErrorDetails[ErrorDetails["REMUX_ALLOC_ERROR"] = 303] = "REMUX_ALLOC_ERROR";
})(ErrorDetails || (ErrorDetails = {}));

;
/**
 * las.js错误事件返回数据定义
 */

/***/ }),

/***/ "./src/core/events.ts":
/*!****************************!*\
  !*** ./src/core/events.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:38:52 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:41:35
 * las.js事件定义
 */
var LasEvents = {
  // 视频头信息事件，读取到视频头信息时触发
  MEDIA_INFO: 'mediaInfo',
  // remux一次MP4 Segment触发一次
  MP4_SEGMENT: 'mp4Segment',
  // 读取到flv script tag时触发
  SCRIPT_PARSED: 'scriptParsed',
  // http请求正常结束时触发
  LOAD_END: 'loadEnd',
  // 错误时触发
  ERROR: 'lasError',
  // 清晰度切换失败时触发
  LEVEL_SWITCH_FAILED: 'levelSwitchFailed',
  // 清晰度开始切换时触发
  LEVEL_SWITCHING: 'levelSwitching',
  // 清晰度切换完成时触发
  LEVEL_SWITCHED: 'levelSwitched',
  // manifest解析完成时触发
  MANIFEST_PARSED: 'manifestParsed',
  // 读取到flv头时触发
  FLV_HEAD: 'flvHead',
  // 通知事件
  REPORT: 'report',
  // 心跳事件
  HEARTBEAT: 'heartbeat'
};
/* harmony default export */ __webpack_exports__["default"] = (LasEvents);

/***/ }),

/***/ "./src/core/worker-cmd.ts":
/*!********************************!*\
  !*** ./src/core/worker-cmd.ts ***!
  \********************************/
/*! exports provided: WorkerCmd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkerCmd", function() { return WorkerCmd; });
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:41:25 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:41:25 
 * worker通信定义
 */
var WorkerCmd;

(function (WorkerCmd) {
  WorkerCmd["INIT"] = "init";
  WorkerCmd["FLV_HEAD"] = "flvHead";
  WorkerCmd["SET_CODECS"] = "setCodecs";
  WorkerCmd["FLUSH"] = "flush";
  WorkerCmd["APPEND_DATA"] = "appendData";
  WorkerCmd["LOAD_END"] = "loadEnd";
  WorkerCmd["DESTROY"] = "destroy";
  WorkerCmd["SET_EXTRA"] = "setExtra";
})(WorkerCmd || (WorkerCmd = {}));

;

/***/ }),

/***/ "./src/demux/flv/flv-demuxer-inline.ts":
/*!**********************************************************!*\
  !*** ./src/demux/flv/flv-demuxer-inline.ts + 10 modules ***!
  \**********************************************************/
/*! exports provided: default */
/*! ModuleConcatenation bailout: Cannot concat with ./src/core/errors.ts because of ./src/index.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/core/events.ts because of ./src/index.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/types/flv-object.ts because of ./src/index.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/utils/browser-helper.ts because of ./src/index.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/utils/log.ts because of ./src/index.ts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/core/events.ts
var events = __webpack_require__("./src/core/events.ts");

// EXTERNAL MODULE: ./src/core/errors.ts
var errors = __webpack_require__("./src/core/errors.ts");

// CONCATENATED MODULE: ./src/types/remux.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:47:05 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 15:28:59
 * 转封装相关类型定义
 */
var TrackType;
/**
 * 音视频描述
 */

(function (TrackType) {
  TrackType["video"] = "video";
  TrackType["audio"] = "audio";
})(TrackType || (TrackType = {}));
// CONCATENATED MODULE: ./src/utils/aac-helper.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:43:15 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:43:56
 * aac工具，获取aac控制，计算frame长度
 */
var AAC_SAMPLE_DURATION = 1024;
var AAC_SILENT_FRAME_DATA = {
  'mp4a.40.2': {
    1: new Uint8Array([0, 200, 0, 128, 35, 128]),
    2: new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]),
    3: new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]),
    4: new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]),
    5: new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]),
    6: new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224])
  },
  'mp4a.40.5': {
    1: new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]),
    2: new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]),
    3: new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94])
  }
};
/**
 * 计算单帧aac长度 ms
 * @param samplerate 音频samplerate
 */

function getAACFrameDuration(samplerate) {
  return AAC_SAMPLE_DURATION * 1000 / samplerate;
}
/**
 * 获取静音音频数据
 * @param audioCodec 音频codec
 * @param channelCount 声道数量
 */

function getAACSilentFrame(audioCodec, channelCount) {
  if (!AAC_SILENT_FRAME_DATA[audioCodec]) {
    audioCodec = 'mp4a.40.5';
  }

  return AAC_SILENT_FRAME_DATA[audioCodec][channelCount];
}
// EXTERNAL MODULE: ./src/utils/log.ts
var log = __webpack_require__("./src/utils/log.ts");

// CONCATENATED MODULE: ./src/remux/mp4-generator.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:47:47 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:48:11
 * 生成fragmented mp4
 */

var UINT32_MAX = Math.pow(2, 32) - 1;
var BOX_HEAD_LEN = 8;
var HDLR = {
  video: new Uint8Array([0, 0, 0, 45, 104, 100, 108, 114, 0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]),
  audio: new Uint8Array([0, 0, 0, 45, 104, 100, 108, 114, 0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0])
};
var FTYP = new Uint8Array([0, 0, 0, 24, 102, 116, 121, 112, 105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49]);
var STTS = new Uint8Array([0, 0, 0, 16, 115, 116, 116, 115, 0, 0, 0, 0, 0, 0, 0, 0]);
var STSC = new Uint8Array([0, 0, 0, 16, 115, 116, 115, 99, 0, 0, 0, 0, 0, 0, 0, 0]);
var STCO = new Uint8Array([0, 0, 0, 16, 115, 116, 99, 111, 0, 0, 0, 0, 0, 0, 0, 0]);
var STSZ = new Uint8Array([0, 0, 0, 20, 115, 116, 115, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var DINF = new Uint8Array([0, 0, 0, 36, 100, 105, 110, 102, 0, 0, 0, 28, 100, 114, 101, 102, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]);
var VMHD = new Uint8Array([0, 0, 0, 20, 118, 109, 104, 100, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var SMHD = new Uint8Array([0, 0, 0, 16, 115, 109, 104, 100, 0, 0, 0, 0, 0, 0, 0, 0]);
var BTRT = new Uint8Array([0, 0, 0, 20, 98, 116, 114, 116, 0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192]);
var MVHD_TPL = new Uint8Array([0, 0, 0, 120, 109, 118, 104, 100, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
var TKHD_TPL = new Uint8Array([0, 0, 0, 104, 116, 107, 104, 100, 1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var TREX_TPL = new Uint8Array([0, 0, 0, 32, 116, 114, 101, 120, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);
var MDHD_TPL = new Uint8Array([0, 0, 0, 44, 109, 100, 104, 100, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 172, 68, 0, 0, 0, 0, 0, 0, 0, 0, 85, 196, 0, 0]);
var MP4A_STSD_TPL = new Uint8Array([0, 0, 0, 93, 115, 116, 115, 100, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 77, 109, 112, 52, 97, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 16, 0, 0, 0, 0, 172, 68, 0, 0, 0, 0, 0, 41, 101, 115, 100, 115, 0, 0, 0, 0, 3, 27, 0, 1, 0, 4, 19, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5]);
var AVC1_STSD_TPL = new Uint8Array([0, 0, 0, 185, 115, 116, 115, 100, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 169, 97, 118, 99, 49, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 2, 208, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]);
var PASP_TPL = new Uint8Array([0, 0, 0, 16, 112, 97, 115, 112, 0, 0, 0, 1, 0, 0, 0, 1]);

var mp4_generator_MP4 = /*#__PURE__*/function () {
  function MP4() {}

  /**
   * 获取当前音视频的moov
   * @param tracks 音视频描述数据
   */
  MP4.moov = function moov(tracks) {
    // 建立空moov
    var len = FTYP.byteLength + MP4._getMoovLen(tracks);

    var dest = {
      data: new Uint8Array(len),
      offset: 0
    }; // 写入

    dest.data.set(FTYP, 0);
    dest.offset += FTYP.byteLength;

    MP4._writeMoov(dest, tracks);

    return dest.data;
  }
  /**
   * 获取当前视频的segment数据
   * @param sn sn
   * @param baseMediaDecodeTime baseMediaDecodeTime
   * @param track 视频数据
   * @param moov moov box数据
   */
  ;

  MP4.videoMediaSegment = function videoMediaSegment(sn, baseMediaDecodeTime, track, moov) {
    // 计算mdat长度
    var mdatLen = 8 + track.mp4Samples.reduce(function (prev, item) {
      return prev + item.units.reduce(function (unitLen, unit) {
        return unitLen + unit.byteLength + 4;
      }, 0);
    }, 0);

    var d = MP4._getMediaSegmentData(track, mdatLen, moov);

    MP4._mediaSegmentHead(d, sn, baseMediaDecodeTime, track, mdatLen, moov);

    track.samples.forEach(function (sample) {
      sample.units.forEach(function (unitData) {
        var unitDataLen = unitData.byteLength;
        d.data[d.offset] = unitDataLen >> 24 & 0xff;
        d.data[d.offset + 1] = unitDataLen >> 16 & 0xff;
        d.data[d.offset + 2] = unitDataLen >> 8 & 0xff;
        d.data[d.offset + 3] = unitDataLen & 0xff;
        d.data.set(unitData, d.offset + 4);
        d.offset += 4 + unitDataLen;
      });
      delete sample.units;
    });
    return d.data;
  }
  /**
   * 获取当前音频的segment数据
   * @param sn sn
   * @param baseMediaDecodeTime baseMediaDecodeTime
   * @param track 音频数据
   * @param moov moov
   */
  ;

  MP4.audioMediaSegment = function audioMediaSegment(sn, baseMediaDecodeTime, track, moov) {
    var mdatLen = 8 + track.mp4Samples.reduce(function (prev, item) {
      return prev + item.unit.byteLength;
    }, 0);

    var d = MP4._getMediaSegmentData(track, mdatLen, moov);

    MP4._mediaSegmentHead(d, sn, baseMediaDecodeTime, track, mdatLen, moov);

    track.mp4Samples.forEach(function (sample) {
      d.data.set(sample.unit, d.offset);
      d.offset += sample.unit.byteLength;
      delete sample.unit;
    });
    return d.data;
  }
  /**
   * 计算moov头的长度
   * @param tracks 音视频轨数据
   */
  ;

  MP4._getMoovLen = function _getMoovLen(tracks) {
    var trakLen = tracks.reduce(function (prev, item) {
      return prev + MP4._getTrakLen(item);
    }, 0);
    return BOX_HEAD_LEN + MVHD_TPL.byteLength + trakLen + MP4._getMvexLen(tracks);
  }
  /**
   * 向目标数据写入moov
   * @param dest 写入目标
   * @param tracks 音视频轨数据
   */
  ;

  MP4._writeMoov = function _writeMoov(dest, tracks) {
    var moovLen = MP4._getMoovLen(tracks);

    MP4._writeBoxHead(dest, MP4.types.moov, moovLen);

    MP4._writeMvhd(dest, tracks[0].timescale, tracks[0].duration);

    tracks.forEach(function (item) {
      MP4._writeTrak(dest, item);
    });

    MP4._writeMvex(dest, tracks);
  }
  /**
   * 计算moof box长度
   * @param sampleCount sample数量
   */
  ;

  MP4._getMoofLen = function _getMoofLen(sampleCount) {
    return 100 + 17 * sampleCount;
  }
  /**
   * 处理mp4 segment头部数据，主要是moof
   * @param dest 写入目标
   * @param sn sn
   * @param baseMediaDecodeTime baseMediaDecodeTime
   * @param track 音视频描述数据
   * @param mdatLen mdatLen
   * @param initSegment moov头
   */
  ;

  MP4._mediaSegmentHead = function _mediaSegmentHead(dest, sn, baseMediaDecodeTime, track, mdatLen, initSegment) {
    if (initSegment) {
      dest.data.set(initSegment);
      dest.offset = initSegment.byteLength;
    }

    MP4._writeMoof(dest, sn, baseMediaDecodeTime, track);

    MP4._writeBoxHead(dest, MP4.types.mdat, mdatLen);
  }
  /**
   * 生成一个数据块用于承载mp4Segment数据
   * @param track 音视频描述数据
   * @param mdatLen mdat长度
   * @param moov moov
   */
  ;

  MP4._getMediaSegmentData = function _getMediaSegmentData(track, mdatLen, moov) {
    var moofLen = MP4._getMoofLen(track.mp4Samples.length);

    return {
      data: new Uint8Array(moofLen + mdatLen + (moov ? moov.byteLength : 0)),
      offset: 0
    };
  }
  /**
   * 向目标数据写入mvhd
   * @param dest 写入目标
   * @param timescale timescale
   * @param duration duration
   */
  ;

  MP4._writeMvhd = function _writeMvhd(dest, timescale, duration) {
    duration *= timescale;
    var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
    var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
    var mvhd = MVHD_TPL;
    mvhd[28] = timescale >> 24 & 0xff;
    mvhd[29] = timescale >> 16 & 0xff;
    mvhd[30] = timescale >> 8 & 0xff;
    mvhd[31] = timescale & 0xff;
    mvhd[32] = upperWordDuration >> 24;
    mvhd[33] = upperWordDuration >> 16 & 0xff;
    mvhd[34] = upperWordDuration >> 8 & 0xff;
    mvhd[35] = upperWordDuration & 0xff;
    mvhd[36] = lowerWordDuration >> 24;
    mvhd[37] = lowerWordDuration >> 16 & 0xff;
    mvhd[38] = lowerWordDuration >> 8 & 0xff;
    mvhd[39] = lowerWordDuration & 0xff;
    dest.data.set(mvhd, dest.offset);
    dest.offset += MVHD_TPL.byteLength;
  }
  /**
   * 向目标数据写入tkhd
   * @param dest 写入目标
   * @param track 音视频描述数据
   */
  ;

  MP4._writeTkhd = function _writeTkhd(dest, track) {
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

    var tkhd = TKHD_TPL;
    tkhd[28] = id >> 24 & 0xff;
    tkhd[29] = id >> 16 & 0xff;
    tkhd[30] = id >> 8 & 0xff;
    tkhd[31] = id & 0xff;
    tkhd[36] = upperWordDuration >> 24;
    tkhd[37] = upperWordDuration >> 16 & 0xff;
    tkhd[38] = upperWordDuration >> 8 & 0xff;
    tkhd[39] = upperWordDuration & 0xff;
    tkhd[40] = lowerWordDuration >> 24;
    tkhd[41] = lowerWordDuration >> 16 & 0xff;
    tkhd[42] = lowerWordDuration >> 8 & 0xff;
    tkhd[43] = lowerWordDuration & 0xff;
    tkhd[96] = width >> 8 & 0xff;
    tkhd[97] = width & 0xff;
    tkhd[100] = height >> 8 & 0xff;
    tkhd[101] = height & 0xff;
    dest.data.set(tkhd, dest.offset);
    dest.offset += TKHD_TPL.byteLength;
  }
  /**
   * 计算trak box长度
   * @param track 音视频描述数据
   */
  ;

  MP4._getTrakLen = function _getTrakLen(track) {
    return BOX_HEAD_LEN + TKHD_TPL.byteLength + MP4._getMdiaLen(track);
  }
  /**
   * 向目标数据写入trak
   * @param dest 写入目标
   * @param track 音视频描述数据
   */
  ;

  MP4._writeTrak = function _writeTrak(dest, track) {
    var trakLen = MP4._getTrakLen(track);

    this._writeBoxHead(dest, MP4.types.trak, trakLen);

    this._writeTkhd(dest, track);

    this._writeMdia(dest, track);
  }
  /**
   * 计算mdia长度
   * @param track 音视频描述数据
   */
  ;

  MP4._getMdiaLen = function _getMdiaLen(track) {
    return BOX_HEAD_LEN + MDHD_TPL.byteLength + HDLR[track.type].byteLength + MP4._getMinfLen(track);
  }
  /**
   * 向目标数据写入mdia
   * @param dest 写入目标
   * @param track 音视频描述数据
   */
  ;

  MP4._writeMdia = function _writeMdia(dest, track) {
    var mdiaLen = MP4._getMdiaLen(track);

    this._writeBoxHead(dest, MP4.types.mdia, mdiaLen);

    this._writeMdhd(dest, track.timescale, track.duration);

    dest.data.set(HDLR[track.type], dest.offset);
    dest.offset += HDLR[track.type].byteLength;

    this._writeMinf(dest, track);
  }
  /**
   * 向目标数据写入mdhd
   * @param dest 写入目标
   * @param timescale timescale
   * @param duration duration
   */
  ;

  MP4._writeMdhd = function _writeMdhd(dest, timescale, duration) {
    duration *= timescale;
    var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
    var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
    var mdhd = MDHD_TPL;
    mdhd[28] = timescale >> 24 & 0xff;
    mdhd[29] = timescale >> 16 & 0xff;
    mdhd[30] = timescale >> 8 & 0xff;
    mdhd[31] = timescale & 0xff; // timescale

    mdhd[32] = upperWordDuration >> 24;
    mdhd[33] = upperWordDuration >> 16 & 0xff;
    mdhd[34] = upperWordDuration >> 8 & 0xff;
    mdhd[35] = upperWordDuration & 0xff;
    mdhd[36] = lowerWordDuration >> 24;
    mdhd[37] = lowerWordDuration >> 16 & 0xff;
    mdhd[38] = lowerWordDuration >> 8 & 0xff;
    mdhd[39] = lowerWordDuration & 0xff;
    dest.data.set(mdhd, dest.offset);
    dest.offset += mdhd.byteLength;
  }
  /**
   * 计算minf长度
   * @param track 音视频描述数据
   */
  ;

  MP4._getMinfLen = function _getMinfLen(track) {
    if (track.type === TrackType.audio) {
      return BOX_HEAD_LEN + SMHD.byteLength + DINF.byteLength + MP4._getStblLen(track);
    }

    return BOX_HEAD_LEN + VMHD.byteLength + DINF.byteLength + MP4._getStblLen(track);
  }
  /**
   * 向目标数据写入minf
   * @param dest 写入目标
   * @param track 音视频描述数据
   */
  ;

  MP4._writeMinf = function _writeMinf(dest, track) {
    this._writeBoxHead(dest, MP4.types.minf, MP4._getMinfLen(track));

    if (track.type === 'audio') {
      dest.data.set(SMHD, dest.offset);
      dest.offset += SMHD.byteLength;
      dest.data.set(DINF, dest.offset);
      dest.offset += DINF.byteLength;

      this._writeStbl(dest, track);

      return;
    }

    dest.data.set(VMHD, dest.offset);
    dest.offset += VMHD.byteLength;
    dest.data.set(DINF, dest.offset);
    dest.offset += DINF.byteLength;

    this._writeStbl(dest, track);

    return;
  }
  /**
   * 计算stbl长度
   * @param track 音视频描述数据
   */
  ;

  MP4._getStblLen = function _getStblLen(track) {
    return BOX_HEAD_LEN + this._getStsdLen(track) + STTS.byteLength + STSC.byteLength + STSZ.byteLength + STCO.byteLength;
  }
  /**
   * 向目标数据写入stbl
   * @param dest 写入目标
   * @param track 音视频描述数据
   */
  ;

  MP4._writeStbl = function _writeStbl(dest, track) {
    var stblLen = this._getStblLen(track);

    this._writeBoxHead(dest, MP4.types.stbl, stblLen);

    this._writeStsd(dest, track);

    dest.data.set(STTS, dest.offset);
    dest.offset += STTS.byteLength;
    dest.data.set(STSC, dest.offset);
    dest.offset += STSC.byteLength;
    dest.data.set(STSZ, dest.offset);
    dest.offset += STSZ.byteLength;
    dest.data.set(STCO, dest.offset);
    dest.offset += STCO.byteLength;
  }
  /**
   * 计算stsd长度
   * @param track 音视频描述数据
   */
  ;

  MP4._getStsdLen = function _getStsdLen(track) {
    if (track.type === TrackType.audio) {
      return MP4._getMp4aStsdLen(track);
    } else {
      return MP4._getAvc1StsdLen(track);
    }
  }
  /**
   * 向目标数据写入stsd
   * @param dest 写入目标
   * @param track 音视频描述数据
   */
  ;

  MP4._writeStsd = function _writeStsd(dest, track) {
    if (track.type === TrackType.audio) {
      this._writeMp4aStsd(dest, track);

      return;
    }

    this._writeAvc1Stsd(dest, track);
  }
  /**
   * 计算avcC长度
   * @param track 音视频描述数据
   */
  ;

  MP4._getAvcCLen = function _getAvcCLen(track) {
    var spsLen = track.sps.reduce(function (prev, item) {
      return prev + item.byteLength + 2;
    }, 0);
    var ppsLen = track.pps.reduce(function (prev, item) {
      return prev + item.byteLength + 2;
    }, 0); // 8 + 5 + sps + 1 + pps

    return 15 + spsLen + ppsLen;
  }
  /**
   * 计算avc1长度
   * @param track 音视频描述数据
   */
  ;

  MP4._getAvc1Len = function _getAvc1Len(track) {
    // avc1 + avcc + btrt + pasp
    return 86 + MP4._getAvcCLen(track) + 20 + 16;
  }
  /**
   * 计算stsd + avc1长度
   * @param track 音视频描述数据
   */
  ;

  MP4._getAvc1StsdLen = function _getAvc1StsdLen(track) {
    // stsd + avc1
    return 16 + this._getAvc1Len(track);
  }
  /**
   * 向目标数据写入stsd(avc1)
   * @param dest 写入目标
   * @param track 音视频描述数据
   */
  ;

  MP4._writeAvc1Stsd = function _writeAvc1Stsd(dest, track) {
    var sps = [],
        pps = [],
        i,
        data,
        len;

    for (i = 0; i < track.sps.length; i++) {
      data = track.sps[i];
      len = data.byteLength;
      sps.push(len >>> 8 & 0xff);
      sps.push(len & 0xff);
      sps = sps.concat(Array.prototype.slice.call(data));
    }

    for (i = 0; i < track.pps.length; i++) {
      data = track.pps[i];
      len = data.byteLength;
      pps.push(len >>> 8 & 0xff);
      pps.push(len & 0xff);
      pps = pps.concat(Array.prototype.slice.call(data));
    }

    var avcCLen = this._getAvcCLen(track);

    var avc1Len = this._getAvc1Len(track);

    var stsdLen = this._getAvc1StsdLen(track);

    var avc1Stsd = AVC1_STSD_TPL;
    var width = track.width,
        height = track.height,
        hSpacing = track.pixelRatio[0],
        vSpacing = track.pixelRatio[1];
    avc1Stsd[0] = stsdLen >> 24 & 0xff;
    avc1Stsd[1] = stsdLen >> 16 & 0xff;
    avc1Stsd[2] = stsdLen >> 8 & 0xff;
    avc1Stsd[3] = stsdLen & 0xff;
    avc1Stsd[16] = avc1Len >> 24 & 0xff;
    avc1Stsd[17] = avc1Len >> 16 & 0xff;
    avc1Stsd[18] = avc1Len >> 8 & 0xff;
    avc1Stsd[19] = avc1Len & 0xff;
    avc1Stsd[48] = width >> 8 & 0xff;
    avc1Stsd[49] = width & 0xff; // width

    avc1Stsd[50] = height >> 8 & 0xff;
    avc1Stsd[51] = height & 0xff; // height

    dest.data.set(avc1Stsd, dest.offset);
    dest.offset += avc1Stsd.byteLength;

    this._writeBoxHead(dest, MP4.types.avcC, avcCLen);

    var avcc = [0x01, sps[3], sps[4], sps[5], 0xfc | 3, 0xe0 | track.sps.length].concat(sps).concat([track.pps.length]).concat(pps);
    dest.data.set(avcc, dest.offset);
    dest.offset += avcc.length;
    dest.data.set(BTRT, dest.offset);
    dest.offset += BTRT.byteLength;
    var pasp = PASP_TPL;
    pasp[8] = hSpacing >> 24; // hSpacing

    pasp[9] = hSpacing >> 16 & 0xff;
    pasp[10] = hSpacing >> 8 & 0xff;
    pasp[11] = hSpacing & 0xff;
    pasp[12] = vSpacing >> 24; // vSpacing

    pasp[13] = vSpacing >> 16 & 0xff;
    pasp[14] = vSpacing >> 8 & 0xff;
    pasp[15] = vSpacing & 0xff;
    dest.data.set(pasp, dest.offset);
    dest.offset += pasp.byteLength;
  }
  /**
   * 计算mp4 esds长度
   * @param track 音视频描述数据
   */
  ;

  MP4._getMp4aEsdsLen = function _getMp4aEsdsLen(track) {
    var configLen = track.config.length;
    return BOX_HEAD_LEN + 25 + configLen + 4;
  }
  /**
   * 计算stsd + mp4a + esds长度
   * @param track 音视频描述数据
   */
  ;

  MP4._getMp4aStsdLen = function _getMp4aStsdLen(track) {
    // stsd + mp4a + esds
    return 16 + 36 + MP4._getMp4aEsdsLen(track);
  }
  /**
   * 向目标数据写入stsd(mp4a)
   * @param dest 写入目标
   * @param track 音视频描述数据
   */
  ;

  MP4._writeMp4aStsd = function _writeMp4aStsd(dest, track) {
    var configLen = track.config.length;

    var esdsLen = MP4._getMp4aEsdsLen(track);

    var stsdLen = MP4._getMp4aStsdLen(track);

    var mp4aLen = stsdLen - 16;
    var mp4a = MP4A_STSD_TPL;
    mp4a[0] = stsdLen >> 24 & 0xff;
    mp4a[1] = stsdLen >> 16 & 0xff;
    mp4a[2] = stsdLen >> 8 & 0xff;
    mp4a[3] = stsdLen & 0xff;
    mp4a[16] = mp4aLen >> 24 & 0xff;
    mp4a[17] = mp4aLen >> 16 & 0xff;
    mp4a[18] = mp4aLen >> 8 & 0xff;
    mp4a[19] = mp4aLen & 0xff;
    mp4a[41] = track.channelCount;
    mp4a[48] = track.samplerate >> 8 & 0xff;
    mp4a[49] = track.samplerate & 0xff;
    mp4a[52] = esdsLen >> 24 & 0xff;
    mp4a[53] = esdsLen >> 16 & 0xff;
    mp4a[54] = esdsLen >> 8 & 0xff;
    mp4a[55] = esdsLen & 0xff;
    mp4a[65] = 23 + configLen;
    mp4a[70] = 15 + configLen;
    dest.data.set(mp4a, dest.offset);
    dest.offset += mp4a.byteLength;
    var tmp = [configLen].concat(track.config).concat([0x06, 0x01, 0x02]);
    dest.data.set(tmp, dest.offset);
    dest.offset += tmp.length;
  }
  /**
   * 计算mvex长度
   * @param tracks 音视频描述数据
   */
  ;

  MP4._getMvexLen = function _getMvexLen(tracks) {
    return BOX_HEAD_LEN + tracks.length * TREX_TPL.byteLength;
  }
  /**
   * 向目标数据写入mvex
   * @param dest 写入目标
   * @param tracks 音视频描述数据
   */
  ;

  MP4._writeMvex = function _writeMvex(dest, tracks) {
    var mvexLen = MP4._getMvexLen(tracks);

    this._writeBoxHead(dest, MP4.types.mvex, mvexLen);

    tracks.forEach(function (item) {
      MP4._writeTrex(dest, item);
    });
  }
  /**
   * 向目标数据写入trex
   * @param dest 写入目标
   * @param track 音视频描述数据
   */
  ;

  MP4._writeTrex = function _writeTrex(dest, track) {
    var id = track.id;
    var trex = TREX_TPL;
    trex[12] = id >> 24;
    trex[13] = id >> 16 & 0xff;
    trex[14] = id >> 8 & 0xff;
    trex[15] = id & 0xff; // track_ID

    dest.data.set(trex, dest.offset);
    dest.offset += trex.byteLength;
  }
  /**
   * 写入moof头
   * @param dest 写入目标
   * @param sn sn
   * @param baseMediaDecodeTime baseMediaDecodeTime
   * @param track 音视频描述数据
   * @param mdatLen mdat box 长度
   */
  ;

  MP4._writeMoof = function _writeMoof(dest, sn, baseMediaDecodeTime, track) {
    // mooflen = 8 + mfhd(8 + 8 ) + traf(8 + tfhd(8 + 8) + tfdt(8 + 12) + trun(8 + 12 + 16 * sample.len) + sdtp(8 + 4 + sample.len)) = 100 + 17 * track.samples.length;
    // trunOffset = moof + mdat header
    var len = track.mp4Samples.length,
        moofLen = MP4._getMoofLen(len),
        trafLen = moofLen - 24,
        sdtpLen = 12 + len,
        trunLen = 20 + 16 * len,
        trunOffset = moofLen + 8,
        id = track.id,
        samples = track.mp4Samples || [],
        upperWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime / (UINT32_MAX + 1)),
        lowerWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime % (UINT32_MAX + 1)); // moof


    MP4._writeBoxHead(dest, MP4.types.moof, moofLen); // mfhd


    MP4._writeBoxHead(dest, MP4.types.mfhd, 16);

    dest.data[dest.offset + 4] = sn >> 24;
    dest.data[dest.offset + 5] = sn >> 16 & 0xff;
    dest.data[dest.offset + 6] = sn >> 8 & 0xff;
    dest.data[dest.offset + 7] = sn & 0xff;
    dest.offset += 8; // traf

    MP4._writeBoxHead(dest, MP4.types.traf, trafLen); // tfhd


    MP4._writeBoxHead(dest, MP4.types.tfhd, 16);

    dest.data[dest.offset + 4] = id >> 24;
    dest.data[dest.offset + 5] = id >> 16 & 0xff;
    dest.data[dest.offset + 6] = id >> 8 & 0xff;
    dest.data[dest.offset + 7] = id & 0xff;
    dest.offset += 8; // tfdt

    MP4._writeBoxHead(dest, MP4.types.tfdt, 20);

    dest.data[dest.offset] = 1;
    dest.data[dest.offset + 4] = upperWordBaseMediaDecodeTime >> 24;
    dest.data[dest.offset + 5] = upperWordBaseMediaDecodeTime >> 16 & 0xff;
    dest.data[dest.offset + 6] = upperWordBaseMediaDecodeTime >> 8 & 0xff;
    dest.data[dest.offset + 7] = upperWordBaseMediaDecodeTime & 0xff;
    dest.data[dest.offset + 8] = lowerWordBaseMediaDecodeTime >> 24;
    dest.data[dest.offset + 9] = lowerWordBaseMediaDecodeTime >> 16 & 0xff;
    dest.data[dest.offset + 10] = lowerWordBaseMediaDecodeTime >> 8 & 0xff;
    dest.data[dest.offset + 11] = lowerWordBaseMediaDecodeTime & 0xff;
    dest.offset += 12; // sdtp

    MP4._writeBoxHead(dest, MP4.types.sdtp, sdtpLen);

    dest.offset += 4;
    samples.forEach(function (sample, index) {
      var flags = sample.flags;
      dest.data[dest.offset + index] = flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
    });
    dest.offset += len; // trun

    MP4._writeBoxHead(dest, MP4.types.trun, trunLen);

    dest.data[dest.offset + 2] = 15;
    dest.data[dest.offset + 3] = 1;
    dest.data[dest.offset + 4] = len >>> 24 & 0xff;
    dest.data[dest.offset + 5] = len >>> 16 & 0xff;
    dest.data[dest.offset + 6] = len >>> 8 & 0xff;
    dest.data[dest.offset + 7] = len & 0xff;
    dest.data[dest.offset + 8] = trunOffset >>> 24 & 0xff;
    dest.data[dest.offset + 9] = trunOffset >>> 16 & 0xff;
    dest.data[dest.offset + 10] = trunOffset >>> 8 & 0xff;
    dest.data[dest.offset + 11] = trunOffset & 0xff;
    dest.offset += 12;
    samples.forEach(function (sample, index) {
      dest.data.set([sample.duration >>> 24 & 0xff, sample.duration >>> 16 & 0xff, sample.duration >>> 8 & 0xff, sample.duration & 0xff, // sample_duration
      sample.len >>> 24 & 0xff, sample.len >>> 16 & 0xff, sample.len >>> 8 & 0xff, sample.len & 0xff, // sample_len
      sample.flags.isLeading << 2 | sample.flags.dependsOn, sample.flags.isDependedOn << 6 | sample.flags.hasRedundancy << 4 | sample.flags.isNonSync, sample.flags.degradPrio & 0xf0 << 8, sample.flags.degradPrio & 0x0f, // sample_flags
      sample.cts >>> 24 & 0xff, sample.cts >>> 16 & 0xff, sample.cts >>> 8 & 0xff, sample.cts & 0xff // sample_composition_time_offset
      ], dest.offset + 16 * index);
    });
    dest.offset += len * 16;
  }
  /**
   * 写入box头
   * @param dest 写入目标
   * @param type box type
   * @param len box len
   */
  ;

  MP4._writeBoxHead = function _writeBoxHead(dest, type, len) {
    dest.data[dest.offset] = len >> 24 & 0xff;
    dest.data[dest.offset + 1] = len >> 16 & 0xff;
    dest.data[dest.offset + 2] = len >> 8 & 0xff;
    dest.data[dest.offset + 3] = len & 0xff;
    dest.data.set(type, dest.offset + 4);
    dest.offset += 8;
  };

  return MP4;
}();

mp4_generator_MP4.types = {
  'avc1': [97, 118, 99, 49],
  'avcC': [97, 118, 99, 67],
  'btrt': [98, 116, 114, 116],
  'dinf': [100, 105, 110, 102],
  'dref': [100, 114, 101, 102],
  'esds': [101, 115, 100, 115],
  'ftyp': [102, 116, 121, 112],
  'hdlr': [104, 100, 108, 114],
  'mdat': [109, 100, 97, 116],
  'mdhd': [109, 100, 104, 100],
  'mdia': [109, 100, 105, 97],
  'mfhd': [109, 102, 104, 100],
  'minf': [109, 105, 110, 102],
  'moof': [109, 111, 111, 102],
  'moov': [109, 111, 111, 118],
  'mp4a': [109, 112, 52, 97],
  'mvex': [109, 118, 101, 120],
  'mvhd': [109, 118, 104, 100],
  'pasp': [112, 97, 115, 112],
  'sdtp': [115, 100, 116, 112],
  'stbl': [115, 116, 98, 108],
  'stco': [115, 116, 99, 111],
  'stsc': [115, 116, 115, 99],
  'stsd': [115, 116, 115, 100],
  'stsz': [115, 116, 115, 122],
  'stts': [115, 116, 116, 115],
  'tfdt': [116, 102, 100, 116],
  'tfhd': [116, 102, 104, 100],
  'traf': [116, 114, 97, 102],
  'trak': [116, 114, 97, 107],
  'trun': [116, 114, 117, 110],
  'trex': [116, 114, 101, 120],
  'tkhd': [116, 107, 104, 100],
  'vmhd': [118, 109, 104, 100],
  'smhd': [115, 109, 104, 100]
};
/* harmony default export */ var mp4_generator = (mp4_generator_MP4);
// CONCATENATED MODULE: ./src/remux/mp4-remuxer.ts
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:48:19 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 15:24:01
 * 整理音视频数据用于生成fragmented mp4
 */





 // 100 seconds

var MAX_FILL_FRAME_DURATION = 100 * 1000;
var DEFAULT_VIDEO_SAMPLE_DURATION = 40;

var mp4_remuxer_MP4Remuxer = /*#__PURE__*/function () {
  function MP4Remuxer(eventEmitter, config) {
    this.tag = 'MP4Remuxer';
    this._eventEmitter = void 0;
    this._forceFirstIDR = void 0;
    this._videoTimeReference = void 0;
    this._videoTimeReferenceInfo = void 0;
    this._extra = void 0;
    this._nextAudioPTS = void 0;
    this._nextVideoDTS = void 0;
    this._initPTS = void 0;
    this._videoLastPTS = 0;
    this._audioLastPTS = 0;
    this._videoSampleDuration = DEFAULT_VIDEO_SAMPLE_DURATION;
    this._moovs = void 0;
    this._eventEmitter = eventEmitter;
    this._videoTimeReference = !config.gopRemux; // 计算平均sampleDuration

    this._videoTimeReferenceInfo = {};
    this._forceFirstIDR = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  }

  var _proto = MP4Remuxer.prototype;

  _proto.resetMoov = function resetMoov() {
    this._moovs = undefined;

    this._clearVideoTimeReference();
  };

  _proto.setExtra = function setExtra(data) {
    this._extra = data;
  };

  _proto.resetTimeStamp = function resetTimeStamp() {
    this._initPTS = undefined;
    this._audioLastPTS = this._videoLastPTS = 0;
  };

  _proto.getLastPTS = function getLastPTS() {
    return {
      video: this._videoLastPTS,
      audio: this._audioLastPTS
    };
  };

  _proto.flush = function flush() {
    var videoData;
    var info = this._videoTimeReferenceInfo;

    if (this._videoTimeReference && info.sample) {
      info.track.samples = [info.sample];
      info.track.sequenceNumber++;
      info.sample = undefined;
      videoData = this._remuxVideo(info.track, true, false);
    }

    this._clearVideoTimeReference();

    return videoData;
  };

  _proto.remux = function remux(audioTrack, videoTrack, timeOffset, isContinuous, isFlush) {
    if (isFlush === void 0) {
      isFlush = false;
    }

    if (!this._moovs) {
      this._initMP4(audioTrack, videoTrack, timeOffset);
    }

    if (this._moovs) {
      var audioData;
      var videoData;

      if (audioTrack.samples.length && videoTrack.samples.length) {
        if (!isContinuous) {
          // 起始位置音视频不对齐，音频开始时间小于视频开始时间，填帧
          if (audioTrack.samples[0].pts < videoTrack.samples[0].pts) {
            var sample = _extends({}, videoTrack.samples[0]);

            sample.dts = sample.pts = audioTrack.samples[0].pts;
            videoTrack.samples.unshift(sample);
          }
        }
      } // 兼容safari


      if (!isContinuous && videoTrack.samples.length) {
        videoTrack.samples[0].pts = videoTrack.samples[0].dts;
      }

      audioData = this._remuxAudio(audioTrack, isContinuous);
      videoData = this._remuxVideo(videoTrack, isContinuous, !isFlush);

      if (!videoData && isFlush && this._videoTimeReferenceInfo.sample) {
        videoData = this.flush();
      }

      if (videoData && !audioData && audioTrack.codec) {
        audioData = this._fillEmptyAudio(audioTrack, isContinuous, videoData.startPTS, videoData.endPTS, videoData.streamDTS);
      }

      var segments = [];

      if (audioData) {
        segments.push(audioData);
      }

      if (videoData) {
        segments.push(videoData);
      }

      if (segments.length) {
        this._eventEmitter.emit(events["default"].MP4_SEGMENT, {
          segments: segments,
          extra: this._extra
        });
      }
    }
  }
  /**
   * 初始化mp4，生成moov，获取mediainfo
   * @param audioTrack 音频track
   * @param videoTrack 视频track
   * @param timeOffset 时间偏移量
   */
  ;

  _proto._initMP4 = function _initMP4(audioTrack, videoTrack, timeOffset) {
    var eventEmitter = this._eventEmitter,
        audioSamples = audioTrack.samples,
        videoSamples = videoTrack.samples,
        mediaInfo = {},
        moovs = {};
    var initPTS;

    if (audioTrack.config && audioSamples.length) {
      audioTrack.timescale = audioTrack.samplerate;
      moovs.audio = mp4_generator.moov([audioTrack]);
      mediaInfo.audioCodec = audioTrack.codec;
      mediaInfo.channelCount = audioTrack.channelCount;
      mediaInfo.audioSampleRate = audioTrack.samplerate;
      mediaInfo.hasAudio = true;
      mediaInfo.defaultAudioCodec = audioTrack.defaultCodec;
      initPTS = audioSamples[0].pts - audioTrack.inputTimescale * timeOffset;
    }

    if (videoTrack.sps && videoTrack.pps && videoSamples.length) {
      var inputTimeScale = videoTrack.inputTimescale;
      videoTrack.timescale = inputTimeScale;
      moovs.video = mp4_generator.moov([videoTrack]);
      mediaInfo.videoCodec = videoTrack.codec;
      mediaInfo.width = videoTrack.width;
      mediaInfo.height = videoTrack.height;
      mediaInfo.fps = videoTrack.fps;
      mediaInfo.profile = videoTrack.profile;
      mediaInfo.level = videoTrack.level;
      mediaInfo.chromaFormat = videoTrack.chromaFormat;
      mediaInfo.hasVideo = true;
      var videoInitPTS = videoSamples[0].pts - inputTimeScale * timeOffset;
      var videoInitDTS = videoSamples[0].dts - inputTimeScale * timeOffset;
      initPTS = initPTS ? Math.min(initPTS, videoInitDTS) : videoInitPTS;
    }

    if (mediaInfo.hasAudio || mediaInfo.hasVideo) {
      if (typeof this._initPTS === 'undefined') {
        this._initPTS = initPTS;
      }

      this._moovs = moovs;
      eventEmitter.emit(events["default"].MEDIA_INFO, mediaInfo);
    } else {
      eventEmitter.emit(events["default"].ERROR, {
        type: errors["ErrorTypes"].MUX_ERROR,
        details: errors["ErrorDetails"].DEMUX_ERROR,
        fatal: false,
        info: {
          reason: 'no audio/video samples found'
        }
      });
    }
  }
  /**
   * remux视频数据
   * 输出fmp4数据
   * @param track VideoTrack
   * @param isContinuous 数据是否连续
   * @param activeTimeReference 是否开启视频帧时间参考功能
   */
  ;

  _proto._remuxVideo = function _remuxVideo(track, isContinuous, activeTimeReference) {
    if (activeTimeReference === void 0) {
      activeTimeReference = true;
    }

    if (!track.samples.length) {
      return;
    }

    var initPTS = this._initPTS;
    var timescale = track.timescale,
        samples = track.samples,
        sampleDuration = 0,
        samplesCount = samples.length,
        mp4Samples = [],
        nextVideoDTS = this._nextVideoDTS;

    if (typeof initPTS === 'undefined' || samplesCount === 0 || timescale === 0) {
      return;
    }

    if (!isContinuous || typeof nextVideoDTS === 'undefined') {
      nextVideoDTS = samples[0].dts;
    } // 处理offset


    samples.forEach(function (sample) {
      sample.pts = sample.pts - initPTS;
      sample.dts = sample.dts - initPTS;
    }); // dts递增

    samples.sort(function (a, b) {
      return a.dts - b.dts || a.pts - b.pts;
    }); // 删除最后一个sample并缓存，用于计算remux最后一个sampleDuration

    if (this._videoTimeReference) {
      this._videoTimeReferenceInfo.track = track;

      if (this._videoTimeReferenceInfo.sample) {
        samplesCount++;
        samples.unshift(this._videoTimeReferenceInfo.sample);
        this._videoTimeReferenceInfo.sample = undefined;
      }

      if (samples.length > 1 && activeTimeReference) {
        this._videoTimeReferenceInfo.sample = samples.pop();
        samplesCount--;
      }
    } // 计算调整首个sample时间戳


    var sample = samples[0];
    var firstDTS = Math.max(sample.dts, 0);
    var firstPTS = Math.max(sample.pts, 0);

    if (isContinuous) {
      var delta = Math.round(firstDTS - nextVideoDTS);

      if (delta) {
        firstPTS = samples[0].pts = firstPTS - (firstDTS - nextVideoDTS);
        firstDTS = samples[0].dts = firstDTS = nextVideoDTS;
      }
    }

    for (var i = 0; i < samplesCount; i++) {
      var videoSample = samples[i];
      var mp4SampleLength = 0,
          cts = void 0; // 计算帧长度

      if (i < samplesCount - 1) {
        // 非末尾
        var nextSample = samples[i + 1];

        if (nextSample.dts <= videoSample.dts) {
          var nextSampleCts = nextSample.pts - nextSample.dts;
          nextSample.dts = videoSample.dts + 1;
          nextSample.pts = nextSample.dts + nextSampleCts;
        }

        sampleDuration = nextSample.dts - videoSample.dts;
      } else {
        // 末尾
        var duration = track.sampleDuration || this._videoSampleDuration; // 参考暂存帧计算长度

        if (this._videoTimeReferenceInfo.sample) {
          duration = this._videoTimeReferenceInfo.sample.dts - videoSample.dts;
        }

        sampleDuration = Math.floor(duration);
      }

      cts = Math.round(videoSample.pts - videoSample.dts);
      mp4SampleLength = videoSample.units.reduce(function (prev, unit) {
        return unit.byteLength + 4 + prev;
      }, 0);
      mp4Samples.push({
        len: mp4SampleLength,
        units: videoSample.units,
        duration: sampleDuration,
        cts: cts,
        streamDTS: videoSample.streamDTS,
        flags: {
          isLeading: 0,
          isDependedOn: 0,
          hasRedundancy: 0,
          degradPrio: 0,
          dependsOn: videoSample.key ? 2 : 1,
          isNonSync: videoSample.key ? 0 : 1
        }
      });
    }

    var lastSample = samples[samples.length - 1];
    this._nextVideoDTS = lastSample.dts + sampleDuration;
    var nextVideoPTS = lastSample.pts + sampleDuration;

    if (mp4Samples.length && this._forceFirstIDR) {
      var flags = mp4Samples[0].flags;
      flags.dependsOn = 2;
      flags.isNonSync = 0;
    }

    track.mp4Samples = mp4Samples;
    var payload = mp4_generator.videoMediaSegment(track.sequenceNumber++, firstDTS, track, this._getMoovByType(TrackType.video));
    var data = {
      payload: payload,
      startPTS: firstPTS / timescale,
      endPTS: nextVideoPTS / timescale,
      startDTS: firstDTS / timescale,
      endDTS: this._nextVideoDTS / timescale,
      type: TrackType.video,
      streamDTS: sample.streamDTS / timescale
    };
    this._videoLastPTS = data.endPTS;
    this._videoSampleDuration = Math.max(sampleDuration, 1);
    track.samples = [];
    track.mp4Samples = [];
    return data;
  }
  /**
   * remux音频数据
   * 输出fmp4数据
   * @param track AudioTrack
   * @param isContinuous 是否是连续数据
   */
  ;

  _proto._remuxAudio = function _remuxAudio(track, isContinuous) {
    if (!track.samples.length) {
      return;
    }

    var initPTS = this._initPTS;
    var inputAudioTimeScale = track.inputTimescale,
        scaleFactor = inputAudioTimeScale / track.timescale,
        inputSampleDuration = AAC_SAMPLE_DURATION * scaleFactor,
        mp4Samples = [],
        firstAudioPTS = 0,
        lastPTS,
        inputSamples = track.samples,
        nextAudioPTS = this._nextAudioPTS,
        frameDuration = getAACFrameDuration(track.samplerate);

    if (typeof initPTS === 'undefined') {
      return;
    }

    inputSamples.forEach(function (sample) {
      sample.pts = sample.dts = sample.pts - initPTS;
    });

    if (!isContinuous || typeof nextAudioPTS === 'undefined') {
      nextAudioPTS = inputSamples[0].pts;
    }

    if (typeof nextAudioPTS === 'undefined') {
      return;
    }

    for (var i = 0, nextPTS = nextAudioPTS; i < inputSamples.length; i++) {
      var audioSample = inputSamples[i],
          unit = audioSample.unit,
          pts = audioSample.pts,
          delta = Math.round(pts - nextPTS),
          duration = Math.abs(1000 * delta / inputAudioTimeScale);

      if (delta <= -inputSampleDuration) {
        // 丢帧
        log["Log"].v(this.tag, "drop audio frame. pts: " + pts);
        continue;
      } else if (delta >= inputSampleDuration && duration < MAX_FILL_FRAME_DURATION && nextPTS) {
        // 填空帧
        var fillCount = Math.round(delta / inputSampleDuration);
        log["Log"].v(this.tag, "fill audio frame. count: " + fillCount + " pts: " + pts);

        for (var j = 0; j < fillCount; j++) {
          var fillFrame = getAACSilentFrame(track.defaultCodec || track.codec, track.channelCount);

          if (!fillFrame) {
            log["Log"].v(this.tag, 'fill copy audio frame');
            fillFrame = unit.subarray();
          }

          mp4Samples.push({
            len: fillFrame.byteLength,
            unit: fillFrame,
            cts: 0,
            duration: AAC_SAMPLE_DURATION,
            streamDTS: Math.round(audioSample.streamDTS - fillCount * frameDuration),
            flags: {
              isLeading: 0,
              isDependedOn: 0,
              hasRedundancy: 0,
              degradPrio: 0,
              dependsOn: 1,
              isNonSync: 0
            }
          });
          firstAudioPTS = firstAudioPTS || Math.max(nextPTS, 0);
          nextPTS += inputSampleDuration;
        }
      } else {
        firstAudioPTS = firstAudioPTS || pts;
        nextPTS += inputSampleDuration;
      }

      mp4Samples.push({
        len: unit.byteLength,
        cts: 0,
        duration: AAC_SAMPLE_DURATION,
        unit: unit,
        streamDTS: audioSample.streamDTS,
        flags: {
          isLeading: 0,
          isDependedOn: 0,
          hasRedundancy: 0,
          degradPrio: 0,
          dependsOn: 1,
          isNonSync: 0
        }
      });
      lastPTS = pts;
    }

    if (mp4Samples.length && typeof lastPTS === 'number') {
      this._nextAudioPTS = nextAudioPTS = lastPTS + scaleFactor * AAC_SAMPLE_DURATION;
      track.mp4Samples = mp4Samples;
      var payload = mp4_generator.audioMediaSegment(track.sequenceNumber++, firstAudioPTS / scaleFactor, track, this._getMoovByType(TrackType.audio));
      track.samples = [];
      track.mp4Samples = [];
      var start = firstAudioPTS / inputAudioTimeScale;
      var end = nextAudioPTS / inputAudioTimeScale;
      var audioData = {
        payload: payload,
        startPTS: start,
        endPTS: end,
        startDTS: start,
        endDTS: end,
        type: TrackType.audio,
        streamDTS: mp4Samples[0].streamDTS / inputAudioTimeScale
      };
      this._audioLastPTS = audioData.endPTS;
      return audioData;
    }

    track.samples = [];
    track.mp4Samples = [];
    return;
  }
  /**
   * 填空audio
   * @param track audiotrack
   * @param isContinuous 是否是连续数据
   * @param startPTS 开始填充时间
   * @param endPTS 结束填充时间
   * @param streamDTS start对应的流时间戳
   */
  ;

  _proto._fillEmptyAudio = function _fillEmptyAudio(track, isContinuous, startPTS, endPTS, streamDTS) {
    log["Log"].v(this.tag, 'fill empty Audio');
    var fillFrame = getAACSilentFrame(track.defaultCodec || track.codec, track.channelCount);

    if (typeof this._initPTS === 'undefined' || !fillFrame) {
      return;
    }

    var timescale = track.inputTimescale,
        start = (typeof this._nextAudioPTS !== 'undefined' ? this._nextAudioPTS : startPTS * timescale) + this._initPTS,
        end = endPTS * timescale + this._initPTS,
        frameDuration = getAACFrameDuration(track.samplerate),
        fillCount = Math.ceil((end - start) / frameDuration);
    var samples = [];

    for (var i = 0; i < fillCount; i++) {
      var time = start + i * frameDuration;
      samples.push({
        unit: fillFrame,
        pts: time,
        dts: time,
        streamDTS: Math.round(streamDTS * timescale + i * frameDuration)
      });
    }

    track.samples = samples;
    return this._remuxAudio(track, isContinuous);
  }
  /**
   * 获取音/视频moov头
   * @param type track type
   */
  ;

  _proto._getMoovByType = function _getMoovByType(type) {
    var result;

    if (this._moovs && this._moovs[type]) {
      result = this._moovs[type];
      delete this._moovs[type];
    }

    return result;
  }
  /**
   * 清理暂存数据
   */
  ;

  _proto._clearVideoTimeReference = function _clearVideoTimeReference() {
    this._videoTimeReferenceInfo = {};
  };

  return MP4Remuxer;
}();

/* harmony default export */ var mp4_remuxer = (mp4_remuxer_MP4Remuxer);
// EXTERNAL MODULE: ./src/types/flv-object.ts
var flv_object = __webpack_require__("./src/types/flv-object.ts");

// EXTERNAL MODULE: ./src/utils/browser-helper.ts
var browser_helper = __webpack_require__("./src/utils/browser-helper.ts");

// CONCATENATED MODULE: ./src/demux/audio-specific-config.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:51:20 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 16:56:40
 * Adobe Flash Video File Format Specification Version 10.1
 * https://wiki.multimedia.cx/index.php?title=MPEG-4_Audio#Audio_Specific_Config
 * FraunhoferIIS_Application-Bulletin_AAC-Transport-Formats.pdf
 * AudioSpecificConfig解析处理
 */

var SAMPLING_FREQUENCY_LIST = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
function parseAudioSpecificConfig(data, offset, defaultCodec) {
  if (defaultCodec === void 0) {
    defaultCodec = '';
  }

  if (data.byteLength < offset + 3) {
    // 数据长度不对
    return;
  }

  var audioObjectType = data[offset + 2] >>> 3,
      // 5 bits
  samplingFrequencyIndex = (data[offset + 2] & 0x07) << 1 | data[offset + 3] >>> 7,
      // 4 bits
  extensionSamplingFrequencyIndex = samplingFrequencyIndex,
      channelConfiguration = (data[offset + 3] & 0x78) >>> 3,
      // 4 bits
  config = [];
  defaultCodec = defaultCodec || "mp4a.40." + audioObjectType;

  if (samplingFrequencyIndex < 0 || samplingFrequencyIndex >= SAMPLING_FREQUENCY_LIST.length || channelConfiguration < 0 || channelConfiguration >= 8) {
    // 数据读取错误
    return;
  }

  if (browser_helper["default"].isFirefox) {
    if (samplingFrequencyIndex >= 6) {
      audioObjectType = 5;
      extensionSamplingFrequencyIndex = samplingFrequencyIndex - 3;
    } else {
      audioObjectType = 2;
    }
  } else if (browser_helper["default"].isAndroid) {
    audioObjectType = 2;
  } else {
    audioObjectType = 5;

    if (defaultCodec === 'mp4a.40.29' || defaultCodec === 'mp4a.40.5') {
      extensionSamplingFrequencyIndex = samplingFrequencyIndex - 3;
    } else {
      if (defaultCodec === 'mp4a.40.2' && samplingFrequencyIndex >= 6 && channelConfiguration === 1) {
        audioObjectType = 2;
      }
    }
  } // audioObjectType(5) + samplingFrequencyIndex(3 . 1) + channelConfiguration(4) + extensionSamplingFrequencyIndex(3 . 1)


  config[0] = audioObjectType << 3 | samplingFrequencyIndex >> 1 & 0x07;
  config[1] = samplingFrequencyIndex << 7 & 0x80 | channelConfiguration << 3;

  if (audioObjectType === 5) {
    config[1] = config[1] | extensionSamplingFrequencyIndex >> 1 & 0x07;
    config[2] = (extensionSamplingFrequencyIndex & 1) << 7 | 8;
    config[3] = 0;
  }

  return {
    config: config,
    samplerate: SAMPLING_FREQUENCY_LIST[samplingFrequencyIndex],
    channelCount: channelConfiguration,
    codec: "mp4a.40." + audioObjectType,
    defaultCodec: defaultCodec
  };
}
// CONCATENATED MODULE: ./src/demux/exp-golomb.ts
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:51:05 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:51:05 
 * 哥伦布编码读取器
 */
var ExpGolomb = /*#__PURE__*/function () {
  function ExpGolomb(data) {
    this._data = void 0;
    this._byteIndex = void 0;
    this._bitIndex = void 0;
    this._data = data;
    this._byteIndex = 0;
    this._bitIndex = 0;
  }
  /**
   * 跳过指定长度bit
   * @param bitLen 位长度
   */


  var _proto = ExpGolomb.prototype;

  _proto.skipBits = function skipBits(bitLen) {
    if (this.bitRemaining > bitLen) {
      var bitMove = bitLen % 8;
      this._byteIndex = this._byteIndex + Math.floor(bitLen / 8) + Math.floor((this._bitIndex + bitMove) / 8);
      this._bitIndex = (this._bitIndex + bitMove) % 8;
    } else {
      // 结尾
      this._byteIndex = this._data.byteLength - 1;
      this._bitIndex = 7;
    }
  }
  /**
   * 读取指定长度bit
   * @param bitLen 位长度
   */
  ;

  _proto.bits = function bits(bitLen) {
    if (bitLen > 32) {
      throw new Error('len must be less 32');
    }

    var byte = this._data[this._byteIndex]; // 当前字节需要读取位数

    var readBitLen = Math.min(8 - this._bitIndex, bitLen); // 当前字节数据需要左移位数

    var shiftLeft = bitLen - readBitLen; // 刷新index

    this._bitIndex += readBitLen;
    var value = byte >> 8 - this._bitIndex & Math.pow(2, readBitLen) - 1;

    if (this._bitIndex === 8) {
      this._bitIndex = 0;
      this._byteIndex++;
    }

    if (shiftLeft) {
      return value << shiftLeft | this.bits(shiftLeft);
    }

    return value;
  }
  /**
   * 无符号指数哥伦布编码
   */
  ;

  _proto.ue = function ue() {
    var count = this._leadingZeroCount();

    return this.bits(count + 1) - 1;
  }
  /**
   * 有符号指数哥伦布编码
   */
  ;

  _proto.se = function se() {
    var ue = this.ue();
    return Math.pow(-1, ue + 1) * Math.ceil(ue / 2);
  }
  /**
   * 剩余bit数
   */
  ;

  /**
   * 哥伦布编码前导0计数
   */
  _proto._leadingZeroCount = function _leadingZeroCount() {
    var bitRemaining = this.bitRemaining;

    for (var i = 0; i < bitRemaining; i++) {
      if (this.bits(1) === 1) {
        if (this._bitIndex === 0) {
          this._byteIndex--;
          this._bitIndex = 7;
        } else {
          this._bitIndex--;
        }

        return i;
      }
    }

    return 0;
  };

  _createClass(ExpGolomb, [{
    key: "bitRemaining",
    get: function get() {
      return (this._data.byteLength - this._byteIndex) * 8 - this._bitIndex;
    }
  }]);

  return ExpGolomb;
}();

/* harmony default export */ var exp_golomb = (ExpGolomb);
// CONCATENATED MODULE: ./src/demux/sps-parser.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:50:50 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:50:50 
 * sps解析器
 */

var AspectRatio = [[1, 1], [12, 11], [10, 11], [16, 11], [40, 33], [24, 11], [20, 11], [32, 11], [80, 33], [18, 11], [15, 11], [64, 33], [160, 99], [4, 3], [3, 2], [2, 1]];
var ChromaFormat = {
  1: '4:2:0',
  2: '4:2:2',
  3: '4:4:4'
};
var Profile = {
  66: 'Baseline',
  77: 'Main',
  88: 'Extended',
  100: 'High',
  110: 'High10',
  122: 'High422',
  244: 'High444'
};
var ProfileIDCList = [100, 110, 122, 244, 44, 83, 86, 118, 128, 138, 144];
/**
 * 输出sps信息结构
 */

var sps_parser_SPSParser = /*#__PURE__*/function () {
  function SPSParser() {}

  /**
   * 解析sps数据
   * @param value sps数据
   */
  SPSParser.parse = function parse(value) {
    var spsData = new Uint8Array(value.byteLength); // 脱壳

    var index = 0;

    for (var i = 0; i < value.byteLength; i++) {
      if (i >= 2 && value[i] === 3 && value[i - 1] === 0 && value[i - 2] === 0) {
        continue;
      }

      spsData[index] = value[i];
      index++;
    }

    var data = new exp_golomb(spsData);
    data.skipBits(8);
    var profileIDC = data.bits(8); // profile_idc

    data.skipBits(8); // constraint_set_flags 4 reserved_zero 4

    var levelIDC = data.bits(8); // level_idc

    data.ue(); // seq_parameter_set_id

    var chromaFormatIDC = 1;

    if (ProfileIDCList.indexOf(profileIDC) !== -1) {
      chromaFormatIDC = data.ue(); // chrome_format_idc

      if (chromaFormatIDC === 3) {
        data.skipBits(1); // residual_colour_transform_flag
      }

      data.ue(); // bit_depth_luma_minus8

      data.ue(); // bit_depth_chroma_minus8

      data.skipBits(1); // qpprime_y_zero_transform_bypass_flag

      if (data.bits(1)) {
        // seq_scaling_matrix_present_flag
        var scalingListCount = chromaFormatIDC !== 3 ? 8 : 12;

        for (var _i = 0; _i < scalingListCount; _i++) {
          if (data.bits(1)) {
            // seq_scaling_list_present_flag
            if (_i < 6) {
              SPSParser._skipScalingList(data, 16);
            } else {
              SPSParser._skipScalingList(data, 64);
            }
          }
        }
      }
    }

    data.ue(); // log2_max_frame_num_minus4

    var picOrderCntType = data.ue(); // pic_order_cnt_type

    if (picOrderCntType === 0) {
      data.ue(); // log2_max_pic_order_cnt_lsb_minus_4
    } else if (picOrderCntType === 1) {
      data.bits(1); // delta_pic_order_always_zero_flag

      data.se(); // offset_for_non_ref_pic

      data.se(); // offset_for_top_to_bottom_field

      var num = data.ue(); // num_ref_frames_in_pic_order_cnt_cycle

      for (var _i2 = 0; _i2 < num; _i2++) {
        data.se(); // offset_for_ref_frame
      }
    }

    data.ue(); // num_ref_frames

    data.skipBits(1); // gaps_in_frame_num_value_allowed_flag

    var picWidthInMbsMinus1 = data.ue(); // pic_width_in_mbs_minus1

    var picHeightInMapUnitsMinus1 = data.ue(); // pic_height_in_map_units_minus1

    var frameMbsOnlyFlag = data.bits(1); // frame_mbs_only_flag

    if (frameMbsOnlyFlag === 0) {
      data.skipBits(1); // mb_adaptive_frame_field_flag
    }

    data.skipBits(1); // direct_8x8_inference_flag

    var frameCropLeftOffset = 0;
    var frameCropRightOffset = 0;
    var frameCropTopOffset = 0;
    var frameCropBottomOffset = 0;

    if (data.bits(1)) {
      // frame_cropping_flag
      frameCropLeftOffset = data.ue(); // frame_crop_left_offset

      frameCropRightOffset = data.ue(); // frame_crop_right_offset

      frameCropTopOffset = data.ue(); // frame_crop_top_offset

      frameCropBottomOffset = data.ue(); // frame_crop_bottom_offset
    }

    var fps = 0,
        pixelAspectRatio = [1, 1];

    if (data.bits(1)) {
      // vui_parameters_present_flag
      if (data.bits(1)) {
        // aspect_ratio_info_present_flag
        var aspectRatioIDC = data.bits(8); // aspect_ratio_idc

        if (aspectRatioIDC > 0 && aspectRatioIDC < 16) {
          pixelAspectRatio = AspectRatio[aspectRatioIDC - 1];
        } else if (aspectRatioIDC === 255) {
          pixelAspectRatio = [data.bits(8) << 8 | data.bits(8), data.bits(8) << 8 | data.bits(8)];
        }
      }

      if (data.bits(1)) {
        // overscan_info_present_flag
        data.bits(1); // overscan_appropriate_flag
      }

      if (data.bits(1)) {
        // video_signal_type_present_flag
        data.bits(4); // video_format 3 video_full_range_flag 1

        if (data.bits(1)) {
          // colour_description_present_flag
          data.bits(24); // colour_primaries 8 transfer_characteristics 8 matrix_coefficients 8
        }
      }

      if (data.bits(1)) {
        // chroma_loc_info_present_flag
        data.ue(); // chroma_sample_loc_type_top_field

        data.ue(); // chroma_sample_loc_type_bottom_field
      }

      if (data.bits(1)) {
        // timing_info_present_flag
        var numUnitsInTick = data.bits(32); // num_units_in_tick

        var timeScale = data.bits(32); // time_scale

        if (!!data.bits(1)) {
          // fixed_frame_rate_flag
          fps = timeScale / (numUnitsInTick * 2);
        }
      }
    }

    data = undefined;
    var cropUnitX = 0,
        cropUnitY = 0;

    if (chromaFormatIDC === 0) {
      cropUnitX = 1;
      cropUnitY = 2 - frameMbsOnlyFlag;
    } else {
      var subWc = chromaFormatIDC === 3 ? 1 : 2;
      var subHc = chromaFormatIDC === 1 ? 2 : 1;
      cropUnitX = subWc;
      cropUnitY = subHc * (2 - frameMbsOnlyFlag);
    }

    var width = (picWidthInMbsMinus1 + 1) * 16;
    var height = (2 - frameMbsOnlyFlag) * ((picHeightInMapUnitsMinus1 + 1) * 16);
    width -= (frameCropLeftOffset + frameCropRightOffset) * cropUnitX;
    height -= (frameCropTopOffset + frameCropBottomOffset) * cropUnitY;
    return {
      profile: Profile[profileIDC] || 'unknown',
      level: (levelIDC / 10).toFixed(1),
      chromaFormat: (chromaFormatIDC <= 3 ? ChromaFormat[chromaFormatIDC] : ChromaFormat[1]) || 'unknown',
      fps: fps,
      pixelAspectRatio: pixelAspectRatio,
      width: width,
      height: height
    };
  }
  /**
   * 忽略scaling_list数据
   * @param data 数据
   * @param count 长度
   */
  ;

  SPSParser._skipScalingList = function _skipScalingList(data, count) {
    var lastScale = 8,
        nextScale = 8;
    var deltaScale = 0;

    for (var i = 0; i < count; i++) {
      if (nextScale !== 0) {
        deltaScale = data.se();
        nextScale = (lastScale + deltaScale + 256) % 256;
      }

      lastScale = nextScale === 0 ? lastScale : nextScale;
    }
  };

  return SPSParser;
}();

/* harmony default export */ var sps_parser = (sps_parser_SPSParser);
// CONCATENATED MODULE: ./src/utils/decode-utf8.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:44:58 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:44:58 
 * 解码UTF-8
 */

/**
 * 从arraybuffer中读取utf8 数据
 * @param data 数据
 */
function decodeUTF8(value, offset, size) {
  var data = new Uint8Array(value, offset, size),
      unicode = [],
      i = 0,
      len = data.byteLength;

  while (i < len) {
    if (data[i] < 0x80) {
      // 单字节，同ASCII
      // 000000-00007F   0xxxxxxx
      unicode.push(data[i]);
    } else if (data[i] < 0xc0) {} else if (data[i] < 0xe0) {
      // 双字节，unicode = 5bit + 6bit 
      // 000080-0007FF   110xxxxx 10xxxxxx    首字节小于0xe0=11100000
      if (i < len - 1 && data[i + 1] >> 6 === 2) {
        unicode.push((data[i] & 0x1f) << 6 | data[i + 1] & 0x3f);
        i += 2;
        continue;
      }
    } else if (data[i] < 0xf0) {
      // 三字节，unicode = 4bit + 6bit + 6bit
      // 000800-00FFFF   1110xxxx 10xxxxxx 10xxxxxx   首字节小于0xf0=11110000
      if (i < len - 2 && data[i + 1] >> 6 === 2 && data[i + 2] >> 6 === 2) {
        // 1110xxxx -> 0b1111 ->  0xf
        unicode.push((data[i] & 0xf) << 12 | (data[i + 1] & 0x3f) << 6 | data[i + 2] & 0x3f);
        i += 3;
        continue;
      }
    } else if (data[i] < 0xf8) {
      // 四字节，unicode = 3bit + 6bit + 6bit + 6bit
      // 010000-10FFFF	11110xxx 10xxxxxx 10xxxxxx 10xxxxxx 首字节小于0xf8=11111000
      if (i < len - 3 && data[i + 1] >> 6 === 2 && data[i + 2] >> 6 === 2 && data[i + 3] >> 6 === 2) {
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
        unicode.push((data[i] & 0x7) << 18 | (data[i + 1] & 0x3f) << 12 | (data[i + 2] & 0x3f) << 6 | data[i + 3] & 0x3f);
        i += 4;
        continue;
      }
    }

    i++;
  } // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint


  return String.fromCodePoint.apply(null, unicode);
}
// CONCATENATED MODULE: ./src/demux/flv/flv-script-tag-decoder.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:52:42 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:53:05
 * flv script tag处理
 */
// amf0-file-format-specification
// Adobe Flash Video File Format Specification Version 10.1

/**
 * 数据源定义
 */

/**
 * 解码flv script tag数据
 * 处理AMF0数据
 */
var flv_script_tag_decoder_FlvScriptTagDecoder = /*#__PURE__*/function () {
  function FlvScriptTagDecoder() {}

  /**
   * 解码script tag数据
   * @param data script tag body数据
   * @param offset 数据偏移量，默认：0
   */
  FlvScriptTagDecoder.decode = function decode(data, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    var source = {
      view: new DataView(data, offset),
      i: 0
    };
    source.i = 0;
    var result = {};

    try {
      result[FlvScriptTagDecoder._read(source)] = FlvScriptTagDecoder._read(source);
    } catch (e) {}

    return result;
  }
  /**
   * 从数据源读取AMF0格式数据
   * @param s 数据源
   */
  ;

  FlvScriptTagDecoder._read = function _read(s) {
    var view = s.view;
    var len = view.byteLength;
    var type = view.getUint8(s.i);
    s.i++;
    var result;

    switch (type) {
      case 0:
        // Number Type
        result = view.getFloat64(s.i);
        s.i += 8;
        return result;

      case 1:
        // Boolean Type
        result = view.getUint8(s.i);
        s.i++;
        return result;

      case 2:
        // String Type
        return FlvScriptTagDecoder._readString(s);

      case 3:
        // Object Type
        result = {};

        while (s.i < len - 4) {
          if (FlvScriptTagDecoder._isObjectEnd(s)) {
            s.i += 3;
            break;
          }

          FlvScriptTagDecoder._readObjProperty(s, result);
        }

        return result;

      case 5:
        // null Type
        return null;

      case 8:
        // ECMA Array Type
        result = {};
        s.i += 4;

        while (s.i < len - 8) {
          if (FlvScriptTagDecoder._isObjectEnd(s)) {
            s.i += 3;
            break;
          }

          FlvScriptTagDecoder._readObjProperty(s, result);
        }

        return result;

      case 10:
        // Strict Array Type
        result = [];
        var size = view.getUint32(s.i);
        s.i += 4;

        for (var i = 0; i < size; i++) {
          result.push(FlvScriptTagDecoder._read(s));
        }

        return result;

      case 11:
        // Date Type
        return FlvScriptTagDecoder._readDate(s);

      case 12:
        // Long String Type
        return FlvScriptTagDecoder._readLongString(s);
    }
  }
  /**
   * 判断Object End Type
   * @param s 数据源
   */
  ;

  FlvScriptTagDecoder._isObjectEnd = function _isObjectEnd(s) {
    // 0x00 0x00 0x09
    if (s.i + 2 > s.view.byteLength - 1 || s.view.getInt16(s.i) === 0 && s.view.getUint8(s.i + 2) === 9) {
      return true;
    }

    return false;
  }
  /**
   * 读取object属性
   * @param s 数据源
   * @param obj 输出
   */
  ;

  FlvScriptTagDecoder._readObjProperty = function _readObjProperty(s, obj) {
    var name = FlvScriptTagDecoder._readString(s);

    var value = FlvScriptTagDecoder._read(s);

    obj[name] = value;
  }
  /**
   * 读取字符串
   * @param s 数据源
   */
  ;

  FlvScriptTagDecoder._readString = function _readString(s) {
    // 16bit（字符串长度） + 字符串
    var len = s.view.getUint16(s.i);
    var result;

    if (len > 0) {
      result = decodeUTF8(s.view.buffer, s.view.byteOffset + s.i + 2, len);
    } else {
      result = '';
    }

    s.i += 2 + len;
    return result;
  }
  /**
   * 读取长字符串
   * @param s 数据源
   */
  ;

  FlvScriptTagDecoder._readLongString = function _readLongString(s) {
    // 32bit（字符串长度） + 字符串
    var len = s.view.getUint32(s.i);
    var result;

    if (len > 0) {
      result = decodeUTF8(s.view.buffer, s.view.byteOffset + s.i + 4, len);
    } else {
      result = '';
    }

    s.i += 4 + len;
    return result;
  }
  /**
   * 读取日期
   * @param s 数据源
   */
  ;

  FlvScriptTagDecoder._readDate = function _readDate(s) {
    // 64bit(utc) + 16bit(时区，分钟)
    var timestamp = s.view.getFloat64(s.i);
    s.i += 8;
    var tz = s.view.getInt16(s.i);
    s.i += 2;
    return new Date(timestamp + tz * 60 * 1000);
  };

  return FlvScriptTagDecoder;
}();

/* harmony default export */ var flv_script_tag_decoder = (flv_script_tag_decoder_FlvScriptTagDecoder);
// CONCATENATED MODULE: ./src/demux/flv/flv-demuxer.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:53:14 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-30 18:29:55
 * flv解封装
 */







 // 连续Non-monotonous上限，超过上限重置remux

var DISCONTINUITY_ON_NON_MONOTONOUS = 10;
var AUDIO_TIME_ORIGIN_THRESHOLD = 5;

var flv_demuxer_FlvDemux = /*#__PURE__*/function () {
  function FlvDemux(eventEmitter, remuxer, config) {
    this.tag = 'FlvDemux';
    this._eventEmitter = void 0;
    this._remuxer = void 0;
    this._naluLengthSize = void 0;
    this._hasVideo = void 0;
    this._hasAudio = void 0;
    this._videoTrack = void 0;
    this._audioTrack = void 0;
    this._remuxStat = void 0;
    this._audioLastDTS = 0;
    this._videoLastDTS = 0;
    this._nonMonotonousTagCache = void 0;
    this._audioCodec = '';
    this._videoCodec = '';
    this._eventEmitter = eventEmitter;
    this._remuxer = remuxer;
    this._naluLengthSize = 4;
    this._hasVideo = true;
    this._hasAudio = true;
    this._videoTrack = {
      id: 1,
      type: TrackType.video,
      codec: '',
      timescale: 1000,
      duration: 0,
      samples: [],
      mp4Samples: [],
      inputTimescale: 1000,
      sequenceNumber: 0,
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
      sampleDuration: 0
    };
    this._audioTrack = {
      id: 2,
      type: TrackType.audio,
      codec: '',
      timescale: 1000,
      duration: 0,
      samples: [],
      mp4Samples: [],
      inputTimescale: 1000,
      sequenceNumber: 0,
      samplerate: 0,
      channelCount: 0,
      config: [],
      sampleDuration: 0
    };
  }

  var _proto = FlvDemux.prototype;

  _proto.append = function append(tags, timeOffset, isContinuous) {
    var _this = this;

    if (!this._remuxStat) {
      this._remuxStat = {
        timeOffset: timeOffset,
        isContinuous: isContinuous
      };
    }

    if (!tags.length) return;
    tags.forEach(function (tag) {
      if (tag.tagType === flv_object["FlvTagType"].VIDEO && _this._hasVideo) {
        _this._parseVideoData(tag);
      } else if (tag.tagType === flv_object["FlvTagType"].AUDIO && _this._hasAudio) {
        _this._parseAudioData(tag);
      } else if (tag.tagType === flv_object["FlvTagType"].SCRIPT) {
        _this._parseScriptTag(tag);
      }
    });

    this._remux();
  }
  /**
   * 设置codec
   * @param audioCodec audioCodec
   * @param videoCodec videoCodec
   */
  ;

  _proto.setCodecs = function setCodecs(audioCodec, videoCodec) {
    if (audioCodec === void 0) {
      audioCodec = '';
    }

    if (videoCodec === void 0) {
      videoCodec = '';
    }

    this._audioCodec = audioCodec;
    this._videoCodec = videoCodec;
  };

  _proto.flvHead = function flvHead(hasAudio, hasVideo) {
    this._hasAudio = hasAudio;
    this._hasVideo = hasVideo;
  };

  _proto.destroy = function destroy() {};

  _proto.flush = function flush() {
    this._remux(true);

    this._remuxStat = undefined;
  };

  _proto.reset = function reset() {
    this._videoTrack.samples = [];
    this._audioTrack.samples = [];
    this._audioLastDTS = this._videoLastDTS = 0;
    this._remuxStat = undefined;
  }
  /**
   * 处理script tag
   * @param tag flv tag
   */
  ;

  _proto._parseScriptTag = function _parseScriptTag(tag) {
    if (tag.body) {
      var scriptData = flv_script_tag_decoder.decode(tag.body.buffer);
      scriptData.timestamp = tag.timestamp;

      if (scriptData.hasOwnProperty('onMetaData')) {
        var onMetaData = scriptData.onMetaData;

        if (typeof onMetaData.framerate === 'number') {
          this._videoTrack.fps = this._videoTrack.fps || onMetaData.framerate;
        }

        log["Log"].i(this.tag, 'Parsed onMetaData');
      } // script tag数据整个抛出


      this._eventEmitter.emit(events["default"].SCRIPT_PARSED, scriptData);
    }
  }
  /**
   * 处理flv video tag
   * @param tag FlvTag
   */
  ;

  _proto._parseVideoData = function _parseVideoData(tag) {
    if (!tag.body) {
      return;
    } // 获取 video tag body 第一字节


    var spec = tag.body[0]; // UB[4] 获取是否是关键帧

    tag.frameType = (spec & 0xf0) >>> 4; // 获取编码格式
    // UB[4] CodecID 7 = AVC

    var codecId = spec & 0xf;

    if (codecId !== 7) {
      this._onError(errors["ErrorDetails"].DEMUX_ERROR, "video codec Unsupported: " + codecId);

      return;
    } // AVCPacketType


    tag.codecId = codecId;
    var packetType = tag.body[1]; // 3字节

    tag.cts = ((tag.body[2] & 0xff) << 16) + ((tag.body[3] & 0xff) << 8) + (tag.body[4] & 0xff);

    if (packetType === 0) {
      // 处理sps/pps
      this._parseAVCDecoderConfigurationRecord(tag, 5);
    } else if (packetType === 1) {
      this._parseAVCVideoData(tag, 5) || {};
    } else if (packetType === 2) {} else {
      this._onError(errors["ErrorDetails"].DEMUX_ERROR, "video packet type error: " + packetType + " ");

      return;
    }
  }
  /**
   * 解析AVCDecoderConfigurationRecord
   * @param tag flvtag
   * @param dataOffset tag body offset
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
    var version = v.getUint8(0);
    var avcProfile = v.getUint8(1); // 忽略profile_compatibility、AVCLevelIndication

    if (version !== 1 || avcProfile === 0) {
      this._onError(errors["ErrorDetails"].DEMUX_ERROR, 'AVCDecoderConfiguration error');

      return;
    }

    this._naluLengthSize = (v.getUint8(4) & 3) + 1;

    if (this._naluLengthSize !== 3 && this._naluLengthSize !== 4) {
      this._onError(errors["ErrorDetails"].DEMUX_ERROR, "nalu length size error: " + this._naluLengthSize);

      return;
    }

    var spsCount = v.getUint8(5) & 31;

    if (spsCount === 0 || spsCount > 1) {
      this._onError(errors["ErrorDetails"].DEMUX_ERROR, "H264 SPS count error: " + spsCount);

      return;
    }

    var offset = 6;
    var spsList = [];

    for (var i = 0; i < spsCount; i++) {
      var len = v.getUint16(offset);
      offset += 2;

      if (len === 0) {
        continue;
      }

      var sps = new Uint8Array(arrayBuffer, dataOffset + offset, len);
      offset += len;
      spsList.push(sps);
      var config = sps_parser.parse(sps);
      var codecArray = sps.subarray(1, 4);
      var codecString = 'avc1.';

      for (var j = 0; j < 3; j++) {
        var h = codecArray[j].toString(16);

        if (h.length < 2) {
          h = '0' + h;
        }

        codecString += h;
      }

      if (!!track.codec && (track.width !== config.width || track.height !== config.height || codecString !== track.codec)) {
        // sps有更新，现有缓存视频帧全部remux。需要重新生成mp4头
        this._remux(true);

        this._remuxer.resetMoov();
      }

      track.sps = spsList;
      track.width = config.width;
      track.height = config.height;
      track.pixelRatio = config.pixelAspectRatio;

      if (config.fps) {
        track.fps = config.fps;
      }

      track.codec = codecString;
      track.profile = config.profile;
      track.level = config.level;
      track.chromaFormat = config.chromaFormat;
    }

    var ppsCount = v.getUint8(offset);

    if (ppsCount === 0 || ppsCount > 1) {
      this._onError(errors["ErrorDetails"].DEMUX_ERROR, "H264 PPS count error: " + ppsCount);

      return;
    }

    offset++;
    track.pps = [];

    for (var _i = 0; _i < ppsCount; _i++) {
      var _len = v.getUint16(offset);

      offset += 2;
      var pps = new Uint8Array(arrayBuffer, dataOffset + offset, _len);
      track.pps.push(pps);

      if (_len === 0) {
        continue;
      }

      offset += _len;
    }

    log["Log"].v(this.tag, 'Parsed AVCDecoderConfigurationRecord');
    track.sampleDuration = Math.floor(track.timescale / (track.fps || 25));
  }
  /**
   * 解析视频tag
   * @param tag flv tag
   * @param dataOffset dataOffset
   */
  ;

  _proto._parseAVCVideoData = function _parseAVCVideoData(tag, dataOffset, fromNonMonotonousCache) {
    if (fromNonMonotonousCache === void 0) {
      fromNonMonotonousCache = false;
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
    // 处理Non-monotonous DTS及丢帧时间修正后可能出现的时间重叠

    if (!fromNonMonotonousCache && dts <= this._videoLastDTS && this._videoLastDTS > 0) {
      log["Log"].w(this.tag, "debug Non-monotonous DTS dts:" + dts + " last:" + this._videoLastDTS);

      this._onNonMonotonous({
        tag: tag,
        dataOffset: dataOffset
      }, TrackType.video);

      return;
    }

    if (!fromNonMonotonousCache && this._nonMonotonousTagCache) {
      this._flushNonMonotonousCache();
    }

    if (fromNonMonotonousCache && dts <= this._videoLastDTS) {
      dts = this._videoLastDTS + 1;
    }

    var pts = dts + tag.cts;

    while (offset < dataSize) {
      if (offset + 4 >= dataSize) {
        log["Log"].v(this.tag, "ignore nalu. timestamp = " + tag.timestamp + ", offset = " + offset + ", dataSize = " + dataSize);
        break;
      }

      var naluSize = v.getUint32(offset);

      if (lengthSize === 3) {
        naluSize >>>= 8;
      }

      if (naluSize > dataSize - lengthSize) {
        log["Log"].v(this.tag, "ignore nalu. naluSize > dataSize timestamp " + dts);
        return;
      }

      var data = new Uint8Array(arrayBuffer, dataOffset + offset + 4, lengthSize + naluSize - 4);
      var unitType = void 0;

      if (tag.codecId === 7) {
        unitType = v.getUint8(offset + lengthSize) & 0x1f;

        if (unitType === 5) {
          keyframe = true;
        }
      }

      units.push(data);
      length += data.byteLength;
      offset += lengthSize + naluSize;
    }

    if (units.length) {
      var track = this._videoTrack;
      var avcSample = {
        units: units,
        length: length,
        dts: dts,
        cts: tag.cts,
        pts: pts,
        streamDTS: tag.timestamp,
        key: keyframe
      };
      track.samples.push(avcSample);
    }

    this._videoLastDTS = dts;
    return info;
  }
  /**
   * 解析音频tag
   * @param tag flv tag
   */
  ;

  _proto._parseAudioData = function _parseAudioData(tag, fromNonMonotonousCache) {
    if (fromNonMonotonousCache === void 0) {
      fromNonMonotonousCache = false;
    }

    if (!tag.body) {
      return;
    }

    var dataSize = tag.body.byteLength;
    var aacFrameLen;

    if (dataSize <= 1) {
      log["Log"].v(this.tag, 'audio packet no payload!');
      return;
    }

    var track = this._audioTrack;
    var packetType = tag.body[1];

    if (packetType === 0) {
      if (tag.body.byteLength < 4) {
        return;
      }

      var info = parseAudioSpecificConfig(tag.body, 0, this._audioCodec);

      if (info) {
        track.config = info.config;
        track.timescale = track.samplerate = info.samplerate;
        track.channelCount = info.channelCount;
        track.codec = info.codec;
        track.defaultCodec = info.defaultCodec;
        track.sampleDuration = 1024 * 1000 / track.samplerate;
      } else {
        this._onError(errors["ErrorDetails"].DEMUX_ERROR, 'AudioSpecificConfig parse error');
      }

      return;
    } else if (packetType === 1) {
      var aacData = tag.body.subarray(2); // AAC raw frame data

      var dts = tag.timestamp; // 通过时间计算的dts与通过帧长度计算的dts比对，判断是否发生了跳帧
      // aac帧长度

      aacFrameLen = 1024 * 1000 / track.samplerate;

      if (this._audioLastDTS > 0) {
        // 默认使用时间戳累加方式
        dts = this._audioLastDTS + aacFrameLen;
        var dtsDiff = tag.timestamp - dts;
        var threshold = aacFrameLen * AUDIO_TIME_ORIGIN_THRESHOLD;

        if (dtsDiff > threshold) {
          // 超出阈值使用tag.timestamp
          dts = tag.timestamp;
        } else if (!fromNonMonotonousCache && dtsDiff < -threshold) {
          this._onNonMonotonous({
            tag: tag
          }, TrackType.audio);

          return;
        }
      }

      if (!fromNonMonotonousCache && this._nonMonotonousTagCache) {
        this._flushNonMonotonousCache();
      }

      var aacSample = {
        unit: aacData,
        length: aacData.byteLength,
        dts: dts,
        pts: dts,
        streamDTS: tag.timestamp
      };
      this._audioLastDTS = dts;
      track.samples.push(aacSample);
    } else {
      log["Log"].v(this.tag, "Unsupported AAC data type " + packetType);
    }
  }
  /**
   * 检测到Non-monotonous
   * 少量出现Non-monotonous尝试修正时间戳
   * 连续出现Non-monotonous按照中断重推处理
   * @param data tag相关数据
   * @param type audio|video
   */
  ;

  _proto._onNonMonotonous = function _onNonMonotonous(data, type) {
    if (!this._nonMonotonousTagCache) {
      this._nonMonotonousTagCache = {
        video: [],
        audio: []
      };
      ;
    }

    var cache = this._nonMonotonousTagCache[type];

    if (cache.length > DISCONTINUITY_ON_NON_MONOTONOUS) {
      this._remuxer.flush();

      var lastPTS = this._remuxer.getLastPTS();

      var ptsSync = lastPTS.audio;

      if (ptsSync === 0 || lastPTS.video > 0 && lastPTS.video < ptsSync) {
        ptsSync = lastPTS.video;
      }

      this._videoTrack.samples = [];
      this._audioTrack.samples = [];
      this._audioLastDTS = this._videoLastDTS = 0;
      this._remuxStat = {
        isContinuous: false,
        timeOffset: ptsSync
      };

      this._remuxer.resetMoov();

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
    if (this._nonMonotonousTagCache) {
      var nonMonotonousCache = this._nonMonotonousTagCache;

      for (var key in nonMonotonousCache) {
        var cache = nonMonotonousCache[key];

        while (cache.length) {
          var data = cache.shift();

          if (data) {
            if (key === 'video') {
              this._parseAVCVideoData(data.tag, data.dataOffset || 0, true);
            } else if (key === 'audio') {
              this._parseAudioData(data.tag, true);
            }
          }
        }
      }

      this._nonMonotonousTagCache = undefined;
    }
  };

  _proto._remux = function _remux(end) {
    if (end === void 0) {
      end = false;
    }

    var audiotrack = this._audioTrack;
    var videotrack = this._videoTrack;
    var isContinuous = true,
        timeOffset = 0;

    if (this._remuxStat) {
      isContinuous = this._remuxStat.isContinuous;
      timeOffset = this._remuxStat.timeOffset;
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
      this._remuxer.remux(audiotrack, videotrack, timeOffset, isContinuous, end);

      this._remuxStat = undefined;
    } catch (error) {
      log["Log"].e(this.tag, error);

      this._onError(errors["ErrorDetails"].REMUX_ERROR, error.message);
    }
  }
  /**
   * 错误处理，抛出错误事件
   * @param details ErrorDetails
   * @param reason 错误原因
   */
  ;

  _proto._onError = function _onError(details, reason) {
    this._eventEmitter.emit(events["default"].ERROR, {
      type: errors["ErrorTypes"].MUX_ERROR,
      details: details,
      fatal: true,
      info: {
        reason: reason
      }
    });
  };

  return FlvDemux;
}();

/* harmony default export */ var flv_demuxer = (flv_demuxer_FlvDemux);
// CONCATENATED MODULE: ./src/demux/flv/flv-demuxer-inline.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:52:14 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:52:14 
 */




var flv_demuxer_inline_FlvDemuxerInline = /*#__PURE__*/function () {
  function FlvDemuxerInline(eventEmitter, config, extraData) {
    this.tag = 'Flv';
    this._eventEmitter = void 0;
    this._config = void 0;
    this._extraData = void 0;
    this._demuxer = void 0;
    this._remuxer = void 0;
    this._eventEmitter = eventEmitter;
    this._config = config;
    this._extraData = extraData;
  }

  var _proto = FlvDemuxerInline.prototype;

  _proto.init = function init() {
    var config = this._config,
        eventEmitter = this._eventEmitter;
    var remuxer = this._remuxer = new mp4_remuxer(eventEmitter, config);
    this._demuxer = new flv_demuxer(eventEmitter, remuxer, config);
    remuxer.setExtra(this._extraData);
  };

  _proto.setCodecs = function setCodecs(audioCodec, videoCodec) {
    if (audioCodec === void 0) {
      audioCodec = '';
    }

    if (videoCodec === void 0) {
      videoCodec = '';
    }

    this._demuxer.setCodecs(audioCodec, videoCodec);
  };

  _proto.flvHead = function flvHead(hasAudio, hasVideo) {
    this._demuxer.flvHead(hasAudio, hasVideo);
  };

  _proto.append = function append(tags, timeOffset, isContinuous) {
    if (!isContinuous) {
      this._demuxer.reset();

      this._remuxer.resetMoov();

      this._remuxer.resetTimeStamp();
    }

    this._demuxer.append(tags, timeOffset, isContinuous);
  };

  _proto.end = function end() {
    this._demuxer.flush();

    this._remuxer.flush();

    this._eventEmitter.emit(events["default"].LOAD_END);
  };

  _proto.flush = function flush() {
    if (this._demuxer) {
      this._demuxer.flush();
    }
  };

  _proto.setExtra = function setExtra(data) {
    this._extraData = data;

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
/*! ModuleConcatenation bailout: Module is referenced from these modules with unsupported syntax: ./src/core/las-main.ts (referenced with require.resolve) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/events */ "./src/core/events.ts");
/* harmony import */ var _core_worker_cmd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/worker-cmd */ "./src/core/worker-cmd.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/log */ "./src/utils/log.ts");
/* harmony import */ var _flv_demuxer_inline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flv-demuxer-inline */ "./src/demux/flv/flv-demuxer-inline.ts");
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:51:57 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:51:57 
 * worker
 */





/* harmony default export */ __webpack_exports__["default"] = (function (self) {
  var flv;
  var eventEmitter = new events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
  eventEmitter.on(_core_events__WEBPACK_IMPORTED_MODULE_1__["default"].MEDIA_INFO, function (data) {
    self.postMessage({
      event: _core_events__WEBPACK_IMPORTED_MODULE_1__["default"].MEDIA_INFO,
      data: data
    });
  });
  eventEmitter.on(_core_events__WEBPACK_IMPORTED_MODULE_1__["default"].ERROR, function (data) {
    self.postMessage({
      event: _core_events__WEBPACK_IMPORTED_MODULE_1__["default"].ERROR,
      data: data
    });
  });
  eventEmitter.on(_core_events__WEBPACK_IMPORTED_MODULE_1__["default"].SCRIPT_PARSED, function (data) {
    self.postMessage({
      event: _core_events__WEBPACK_IMPORTED_MODULE_1__["default"].SCRIPT_PARSED,
      data: data
    });
  });
  eventEmitter.on(_core_events__WEBPACK_IMPORTED_MODULE_1__["default"].LOAD_END, function (data) {
    self.postMessage({
      event: _core_events__WEBPACK_IMPORTED_MODULE_1__["default"].LOAD_END,
      data: data
    });
  });
  eventEmitter.on(_core_events__WEBPACK_IMPORTED_MODULE_1__["default"].MP4_SEGMENT, function (data) {
    var message = {
      event: _core_events__WEBPACK_IMPORTED_MODULE_1__["default"].MP4_SEGMENT,
      data: data
    };
    var payloads = [];
    data.segments.forEach(function (element) {
      payloads.push(element.payload.buffer);
    });
    self.postMessage(message, payloads);
  });

  function init(eventEmitter, config, data) {
    flv = new _flv_demuxer_inline__WEBPACK_IMPORTED_MODULE_4__["default"](eventEmitter, config, data);
    flv.init();
  }

  function destroy() {
    if (flv) {
      flv.destroy();
    }

    if (eventEmitter) {
      eventEmitter.removeAllListeners();
    }
  }

  self.addEventListener('message', function (e) {
    var d = e.data;

    switch (d.cmd) {
      case _core_worker_cmd__WEBPACK_IMPORTED_MODULE_2__["WorkerCmd"].INIT:
        _utils_log__WEBPACK_IMPORTED_MODULE_3__["Log"].level(d.config.debug);
        init(eventEmitter, d.config, d.data);
        break;

      case _core_worker_cmd__WEBPACK_IMPORTED_MODULE_2__["WorkerCmd"].DESTROY:
        destroy();
        break;

      case _core_worker_cmd__WEBPACK_IMPORTED_MODULE_2__["WorkerCmd"].APPEND_DATA:
        flv.append(d.tags, d.timeOffset, d.isContinuous);
        break;

      case _core_worker_cmd__WEBPACK_IMPORTED_MODULE_2__["WorkerCmd"].SET_CODECS:
        flv.setCodecs(d.audioCodec, d.videoCodec);
        break;

      case _core_worker_cmd__WEBPACK_IMPORTED_MODULE_2__["WorkerCmd"].FLV_HEAD:
        flv.flvHead(d.hasAudio, d.hasVideo);
        break;

      case _core_worker_cmd__WEBPACK_IMPORTED_MODULE_2__["WorkerCmd"].FLUSH:
        flv.flush();
        break;

      case _core_worker_cmd__WEBPACK_IMPORTED_MODULE_2__["WorkerCmd"].SET_EXTRA:
        flv.setExtra(d.data);
        break;

      case _core_worker_cmd__WEBPACK_IMPORTED_MODULE_2__["WorkerCmd"].LOAD_END:
        flv.end();
        break;
    }
  });
});

/***/ }),

/***/ "./src/index.ts":
/*!***********************************!*\
  !*** ./src/index.ts + 23 modules ***!
  \***********************************/
/*! exports provided: default */
/*! ModuleConcatenation bailout: Cannot concat with ./src/core/errors.ts because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/core/events.ts because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/core/worker-cmd.ts because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/demux/flv/flv-demuxer-inline.ts because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/types/flv-object.ts because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/utils/browser-helper.ts because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/utils/log.ts because of ./src/demux/flv/flv-demuxer-worker.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/events/events.js (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/webworkify-webpack/index.js (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ src_Las; });

// EXTERNAL MODULE: ./node_modules/events/events.js
var events = __webpack_require__("./node_modules/events/events.js");

// EXTERNAL MODULE: ./src/utils/log.ts
var log = __webpack_require__("./src/utils/log.ts");

// CONCATENATED MODULE: ./src/config.ts
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:37:56 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-30 17:34:44
 * 配置解析处理
 */

var DEFAULT_CONFIG = {
  webWorker: true,
  // 是否开启webworker
  appendErrorMaxRetry: 3,
  // mse append出错后重试次数
  credentials: false,
  // 请求是否带cookie
  defaultLiveDelay: -2000,
  debug: log["LOG_LEVEL"].LEVEL_ERROR,
  connectionTimeout: 10000,
  // 流连接超时
  transmissionTimeout: 30000,
  // 流传输超时
  autoRecoverMedia: false,
  // 尝试自动恢复video.error
  autoPlaybackRate: true
};

var config_ConfigHelper = /*#__PURE__*/function () {
  function ConfigHelper() {}

  /**
   * 处理传入的config
   * @param userConfig 传入config
   * @returns config
   */
  ConfigHelper.processConfig = function processConfig(userConfig) {
    var config = _extends({}, DEFAULT_CONFIG);

    _extends(config, userConfig);

    if (!window.Worker) {
      config.webWorker = false;
    }

    if (config.debug) {
      log["Log"].level(config.debug);
    }

    this._initPlayBackRateRule(config);

    return config;
  }
  /**
   * 初始化自动倍速配置
   * @param config config
   */
  ;

  ConfigHelper._initPlayBackRateRule = function _initPlayBackRateRule(config) {
    var conf = config.autoPlaybackRateConf;

    if (conf) {
      var rule = conf.rule;

      if (rule && Array.isArray(rule)) {
        rule = rule.filter(function (item) {
          return item.upper > item.lower && item.rate > 0;
        }); // 速度控制规则，按playbackRate倒序

        rule.sort(function (a, b) {
          return b.rate - a.rate;
        });

        if (rule.length > 1) {
          conf.rule = rule;
          config.autoPlaybackRateConf = conf;
          return;
        }
      }
    } else {
      var delay = -config.defaultLiveDelay / 1000;
      var abrPlabackRateConf = {
        startDelay: delay,
        interval: 0.2,
        rule: [{
          rate: 1.1,
          lower: delay + 1,
          upper: Number.MAX_SAFE_INTEGER
        }, {
          rate: 1,
          lower: 0,
          upper: delay
        }]
      };
      config.autoPlaybackRateConf = abrPlabackRateConf;
    }
  };

  return ConfigHelper;
}();


// EXTERNAL MODULE: ./src/core/errors.ts
var errors = __webpack_require__("./src/core/errors.ts");

// EXTERNAL MODULE: ./src/core/events.ts
var core_events = __webpack_require__("./src/core/events.ts");

// EXTERNAL MODULE: ./node_modules/webworkify-webpack/index.js
var webworkify_webpack = __webpack_require__("./node_modules/webworkify-webpack/index.js");
var webworkify_webpack_default = /*#__PURE__*/__webpack_require__.n(webworkify_webpack);

// CONCATENATED MODULE: ./src/abr/abr-get-url.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:54:16 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 17:11:02
 * las请求地址生成
 */

/**
 * 生成切换flv的请求地址
 * @param url 流地址
 * @param spts 切换时间戳，单位毫秒。大于0：关键帧pts；小于0：直播延迟
 */
function abrGetUrl(url, spts) {
  if (typeof spts === 'undefined') {
    return url;
  }

  var arr = url.split('?');
  arr.splice(1, 0, "?startPts=" + spts + (arr.length > 1 ? '&' : ''));
  return arr.join('');
}
// CONCATENATED MODULE: ./src/utils/codec-helper.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:44:39 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:44:39 
 * 处理codec字符串，拆分音视频codec
 */

/**
 * 拆解codec串
 * @param value codec串
 */
function parseCodecStr(value) {
  var result = {};
  (value || '').split(/[ ,]+/).forEach(function (codec) {
    if (codec.indexOf('avc1') === 0) {
      result.video = codec;
    }

    if (codec.indexOf('mp4a') === 0) {
      result.audio = codec;
    }
  });
  return result;
}
// CONCATENATED MODULE: ./src/abr/abr-level.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:53:57 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:53:57 
 * 单个清晰度流定义
 */
var AbrLevel = function AbrLevel(url) {
  this.url = void 0;
  this.bitrate = 0;
  this.maxBitrate = 0;
  this.avgBitrate = 0;
  this.qualityType = '';
  this.qualityTypeName = '';
  this.id = 0;
  this.codec = '';
  this.audioCodec = '';
  this.videoCodec = '';
  this.hidden = false;
  this.disabledFromAdaptive = false;
  this.defaultSelected = false;
  this.url = url;
};


// CONCATENATED MODULE: ./src/abr/abr-manifest.ts
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:53:40 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:53:40 
 * manfest定义及解析
 */



/**
 * las manifest
 */
var abr_manifest_AbrManifest = /*#__PURE__*/function () {
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
  }
  /**
   * 构造函数，解析传入的manifest
   * @param manifest las manifest
   */
  ;

  function AbrManifest(manifest) {
    var _this = this;

    this._levels = [];
    this._abrLevels = [];
    this._default = void 0;

    if (AbrManifest.verify(manifest)) {
      manifest.adaptationSet[0].representation.forEach(function (item, index) {
        var level = new AbrLevel(item.url);
        level.id = item.id || 0;
        level.maxBitrate = item.maxBitrate || 0;
        level.avgBitrate = item.avgBitrate || 0;
        level.bitrate = item.avgBitrate || level.maxBitrate;
        level.qualityType = item.qualityType || '';
        level.qualityTypeName = item.qualityTypeName || '';
        level.codec = item.codec || '';

        if (level.codec) {
          var codecs = parseCodecStr(level.codec);
          level.audioCodec = codecs.audio;
          level.videoCodec = codecs.video;
        }

        level.hidden = item.hidden || false;
        level.disabledFromAdaptive = item.disabledFromAdaptive || item.disabledFromAdaptive;
        level.defaultSelected = item.defaultSelected || false;

        _this._levels.push(level);

        if (!level.disabledFromAdaptive) {
          _this._abrLevels.push(index);
        }

        if (level.defaultSelected && typeof _this._default === 'undefined') {
          _this._default = index;
        }
      });

      this._levels.sort(function (a, b) {
        return a.bitrate - b.bitrate;
      });
    } else {
      return;
    }
  }
  /**
   * 码率列表
   */


  _createClass(AbrManifest, [{
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
// CONCATENATED MODULE: ./src/io/fetch.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:50:16 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:50:16 
 * 封装的fetch
 */
var FetchLoader = /*#__PURE__*/function () {
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
      this._callbacks.onProgress(chunk);
    }
  };

  _proto._onEnd = function _onEnd(context, responseData) {
    if (this._callbacks && this._callbacks.onEnd) {
      this._reader = null;
      this._controller = null;

      this._callbacks.onEnd(responseData);
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
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:50:38 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:50:38 
 * 封装的xhr
 */
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

var XHR = /*#__PURE__*/function () {
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
      this._callbacks.onProgress(chunk);
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
      this._callbacks.onProgress(chunk);
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
      this._callbacks.onEnd(data);
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
function loader_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function loader_createClass(Constructor, protoProps, staticProps) { if (protoProps) loader_defineProperties(Constructor.prototype, protoProps); if (staticProps) loader_defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:50:30 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:50:30 
 * 下载器
 */



var ChunkLoader;
/**
 * 加载器
 */

var loader_Loader = /*#__PURE__*/function () {
  function Loader() {
    var _this = this;

    this.tag = 'loader';
    this._context = void 0;
    this._loader = void 0;
    this._callbacks = void 0;
    this._config = void 0;
    this._loaderCallback = void 0;
    this._stats = void 0;
    this._retryDelay = 0;
    this._loading = false;
    this._aborted = false;
    this._requestTimeout = void 0;
    this._transTimer = void 0;
    this._retryTimeout = void 0;
    this._progressTime = 0;

    this._onConnect = function (status) {
      if (_this._requestTimeout) {
        clearTimeout(_this._requestTimeout);
        _this._requestTimeout = null;
      }

      _this._startTransmissionTimer();

      _this._stats.httpStatusCode = status;
      _this._stats.firstDataTime = Math.max(_this._stats.requestStartTime, performance.now());
    };

    this._onProgress = function (chunk) {
      var stats = _this._stats;
      _this._progressTime = performance.now();

      if (_this._callbacks && _this._callbacks.onProgress) {
        _this._callbacks.onProgress(_this, chunk);
      }

      stats.loadedSize += chunk.byteLength;
    };

    this._onEnd = function (responseData) {
      _this._stopTimer();

      var stats = _this._stats;

      if (responseData) {
        if (typeof responseData === 'string') {
          stats.totalSize = stats.loadedSize = responseData.length || 0;
        } else {
          stats.totalSize = stats.loadedSize = responseData.byteLength || 0;
        }
      } else {
        stats.totalSize = stats.loadedSize;
      }

      stats.loadedTime = Math.max(stats.firstDataTime, performance.now());
      _this._loading = false;

      if (_this._callbacks) {
        _this._callbacks.onEnd(_this, responseData);
      }
    };

    this._onError = function (e) {
      log["Log"].i(_this.tag, e);

      _this._stopTimer();

      _this._destroyInternalLoader();

      var stats = _this._stats;
      var config = _this._config;
      _this._loading = false;
      stats.fatalError = !config.maxRetry || stats.retryCount >= config.maxRetry || !config.maxRetry;
      stats.errorMessage = e.message || 'load error';

      if (_this._callbacks && _this._callbacks.onError) {
        _this._callbacks.onError(_this);
      }

      if (stats.fatalError) {
        return;
      }

      stats.retryCount++;

      if (_this._callbacks) {
        if (_this._retryDelay) {
          _this._retryTimeout = setTimeout(_this._loadInternal.bind(_this), _this._retryDelay);
          _this._retryDelay = 2 * _this._retryDelay;
        } else {
          _this._loadInternal();
        }
      }
    };

    this._onTimeout = function () {
      _this._loading = false;

      _this._abortInternal();

      var e = new Error('timeout');

      _this._onError(e);
    };

    this._config = {
      useFetch: false,
      connectionTimeout: 0,
      transmissionTimeout: 0,
      maxRetry: 0,
      retryDelay: 0
    };
    this._loaderCallback = {
      onConnect: this._onConnect,
      onProgress: this._onProgress,
      onEnd: this._onEnd,
      onError: this._onError
    };
  }
  /**
   * 开始下载
   * @param context 下载上下文信息
   * @param callbacks 下载回调
   * @param config 下载配置
   */


  var _proto = Loader.prototype;

  _proto.load = function load(context, callbacks, config) {
    this._context = context;
    this._callbacks = callbacks;
    this._config = config || this._config;
    this._stats = {
      requestStartTime: performance.now(),
      retryCount: 0,
      loadedSize: 0,
      httpStatusCode: 0,
      firstDataTime: 0,
      loadedTime: 0,
      totalSize: 0,
      errorMessage: '',
      fatalError: false
    };

    if (this._config.retryDelay) {
      this._retryDelay = this._config.retryDelay;
    }

    this._loadInternal();
  }
  /**
   * 取消当前下载
   */
  ;

  _proto.abort = function abort() {
    this._stopTimer();

    this._abortInternal();
  }
  /**
   * 销毁loader
   */
  ;

  _proto.destroy = function destroy() {
    this._stopTimer();

    this._abortInternal();

    this._destroyInternalLoader();

    this._callbacks = undefined;
  }
  /**
   * 下载状态信息
   */
  ;

  /**
   * 获取流式加载Loader类
   * @param useFetch 是否使用fetch
   * @returns class
   */
  _proto._getInternalLoader = function _getInternalLoader(useFetch) {
    if (typeof ChunkLoader !== 'undefined') {
      return ChunkLoader;
    }

    ChunkLoader = null;

    if (FetchLoader.isSupport()) {
      ChunkLoader = FetchLoader;
    } else if (XHR.isSupportChunk()) {
      ChunkLoader = XHR;
    }

    return ChunkLoader;
  }
  /**
   * 销毁内部loader
   */
  ;

  _proto._destroyInternalLoader = function _destroyInternalLoader() {
    if (this._loader) {
      this._loader.destroy();

      this._loader = undefined;
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
    stats.httpStatusCode = 0;
    stats.firstDataTime = 0;
    stats.loadedSize = 0;

    if (this._retryTimeout) {
      clearTimeout(this._retryTimeout);
      this._retryTimeout = null;
    }

    if (this._context.progress) {
      this._loader = new (this._getInternalLoader(!!this._config.useFetch))();
    } else {
      this._loader = new XHR();
    }

    if (!this._loader) {
      return;
    } // 连接超时


    if (this._config.connectionTimeout) {
      this._requestTimeout = setTimeout(this._onTimeout, this._config.connectionTimeout);
    }

    this._loader.load(this._context, this._loaderCallback);
  };

  _proto._abortInternal = function _abortInternal() {
    if (this._callbacks && this._callbacks.onAbort && !this._aborted && this._loading) {
      this._callbacks.onAbort(this);
    }

    this._aborted = true;

    if (this._loader) {
      this._loader.abort();
    }
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

  /**
   * 开始传输超时计时器
   */
  _proto._startTransmissionTimer = function _startTransmissionTimer() {
    var _this2 = this;

    this._stopTransmissionTimer();

    this._progressTime = performance.now();
    var timeout = this._config.transmissionTimeout || 0;

    if (timeout) {
      this._transTimer = setInterval(function () {
        if (performance.now() - _this2._progressTime > timeout) {
          _this2._onTimeout();
        }
      }, 1000);
    }
  }
  /**
   * 停止传输超时计时器
   */
  ;

  _proto._stopTransmissionTimer = function _stopTransmissionTimer() {
    if (this._transTimer) {
      clearInterval(this._transTimer);
      this._transTimer = null;
    }
  };

  loader_createClass(Loader, [{
    key: "stats",
    get: function get() {
      return this._stats;
    }
    /**
     * 下载上下文
     */

  }, {
    key: "context",
    get: function get() {
      return this._context;
    }
  }]);

  return Loader;
}();


// CONCATENATED MODULE: ./src/utils/speed-test.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:45:57 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:45:57 
 * 测速工具
 */

// 单次测速用时上限
var MAX_TIMEOUT = 10000;
/**
 * 测速工具
 * 测速时间上线10s
 */

var speed_test_SpeedTest = /*#__PURE__*/function () {
  function SpeedTest() {
    var _this = this;

    this._context = void 0;
    this._result = void 0;
    this._callback = void 0;
    this._loader = void 0;
    this._loaderConf = void 0;
    this._loaderCallbacks = void 0;
    this._timer = void 0;
    this._startTime = 0;

    this._testEnd = function () {
      _this._stopTimer();

      if (_this._loader) {
        _this._loader.destroy();
      }

      if (_this._context && _this._result && _this._callback) {
        _this._result.firstPackageDuration = Math.round(_this._result.firstPackageDuration);
        _this._result.duration = Math.round(performance.now() - _this._startTime);

        _this._callback.onEnd(_this._context, _this._result);
      }
    };

    this._onProgress = function (target, data) {
      if (_this._result) {
        _this._result.firstPackageDuration = target.stats.firstDataTime ? target.stats.firstDataTime - target.stats.requestStartTime : 0;
        _this._result.loaded = target.stats.loadedSize;
      }
    };

    this._onLoaderError = function () {
      if (_this._result) {
        _this._result.succeeded = false;
      }

      _this._testEnd();
    };

    this._onLoaderEnd = function () {
      _this._testEnd();
    };

    this._onAbort = function () {};

    this._loaderConf = {
      connectionTimeout: 0,
      transmissionTimeout: 0,
      maxRetry: 0,
      retryDelay: 0,
      useFetch: true
    };
    this._loaderCallbacks = {
      onProgress: this._onProgress,
      onError: this._onLoaderError,
      onEnd: this._onLoaderEnd,
      onAbort: this._onAbort
    };
  }
  /**
   * 开始测速
   * @param context 测速上下文
   * @param callback 测速回调
   */


  var _proto = SpeedTest.prototype;

  _proto.start = function start(context, callback) {
    this._context = context;
    this._callback = callback;
    this._result = {
      loaded: 0,
      duration: 0,
      firstPackageDuration: 0,
      succeeded: true
    };
    this._startTime = performance.now();

    if (this._loader) {
      this._loader.destroy();
    }

    var timeout = Math.min(MAX_TIMEOUT, context.timeout);
    this._loaderConf.connectionTimeout = timeout;
    var loaderContext = {
      url: context.url,
      progress: true,
      responseType: 'arraybuffer'
    };
    this._loader = new loader_Loader();

    this._startTimer(timeout);

    this._loader.load(loaderContext, this._loaderCallbacks, this._loaderConf);
  }
  /**
   * 取消测速
   */
  ;

  _proto.cancel = function cancel() {
    this._stopTimer();

    if (this._loader) {
      this._loader.destroy();
    }
  }
  /**
   * 销毁
   */
  ;

  _proto.destroy = function destroy() {
    this.cancel();
  }
  /**
   * 开始测速计时
   * @param timeout 时长
   */
  ;

  _proto._startTimer = function _startTimer(timeout) {
    var _this2 = this;

    this._timer = setTimeout(function () {
      return _this2._testEnd();
    }, timeout);
  }
  /**
   * 停止测速计时器
   */
  ;

  _proto._stopTimer = function _stopTimer() {
    clearTimeout(this._timer);
  }
  /**
   * 测试结束，停止加载并回调
   */
  ;

  return SpeedTest;
}();
// CONCATENATED MODULE: ./src/abr/abr-algorithm-simple.ts
function abr_algorithm_simple_extends() { abr_algorithm_simple_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return abr_algorithm_simple_extends.apply(this, arguments); }

function abr_algorithm_simple_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function abr_algorithm_simple_createClass(Constructor, protoProps, staticProps) { if (protoProps) abr_algorithm_simple_defineProperties(Constructor.prototype, protoProps); if (staticProps) abr_algorithm_simple_defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * @Author: wuwenjun 
 * @Date: 2020-06-09 11:54:34 
 * @Last Modified by:   wuwenjun 
 * @Last Modified time: 2020-06-09 11:54:34 
 * 自适应算法
 */



var abr_algorithm_simple_tag = 'algorithm-simple';
var CONFIG = {
  stableBufferDiffThresholdSecond: 0.15,
  stableBufferIntervalMs: 2000,
  speedTestTimeoutMs: 500,
  generateSpeedGapMs: 3000,
  bufferCheckIntervalMs: 500,
  smoothedSpeedUtilizationRatio: 0.8,
  smallSpeedToBitrateRatio: 0.4,
  enoughSpeedToBitrateRatio: 0.9,
  bufferLowerLimitSecond: 0.6,
  recentBufferedSize: 16,
  smoothedSpeedRatio: 0.9,
  isSpeedFullyUsed: true
};
/**
 * HLS自适应码率算法入口
 */

var abr_algorithm_simple_AbrAlgorithmSimple = /*#__PURE__*/function (_EventEmitter) {
  _inheritsLoose(AbrAlgorithmSimple, _EventEmitter);

  // 当前正在加载的流index
  // 下一个切换的流index
  function AbrAlgorithmSimple() {
    var _this;

    _this = _EventEmitter.call(this) || this;
    _this._conf = void 0;
    _this._pastBuffer = void 0;
    _this._levels = void 0;
    _this._current = 0;
    _this._next = 0;
    _this._stableBufferStartTime = performance.now();
    _this._speedTester = new speed_test_SpeedTest();
    _this._generatedSpeed = 0;
    _this._lastCheckBuffer = 0;
    _this._lastSpeed = 0;
    _this._timer = void 0;
    return _this;
  }
  /**
   * 初始化，并写入初始码率
   * @param manifest 流信息
   * @param config 算法配置
   */


  var _proto = AbrAlgorithmSimple.prototype;

  _proto.init = function init(manifest, status, config) {
    var _this2 = this;

    this._conf = abr_algorithm_simple_extends({}, CONFIG);

    abr_algorithm_simple_extends(this._conf, config);

    log["Log"].i(abr_algorithm_simple_tag, 'init', manifest, config, this._conf);
    this._levels = manifest.levels.slice(0);
    this._next = manifest.default;
    this._pastBuffer = [0.1];

    if (status) {
      this._timer = setInterval(function () {
        _this2._checkBuffer(status);
      }, this._conf.bufferCheckIntervalMs);
    }
  };

  _proto._updateStableBuffer = function _updateStableBuffer(buffered) {
    var diff = buffered - this._lastCheckBuffer;
    var diffRatio = diff / buffered;
    var now = performance.now();

    if (diff < -this._conf.stableBufferDiffThresholdSecond || diffRatio < -0.2) {
      log["Log"].v(abr_algorithm_simple_tag, "bufferDiffDown: " + diff.toFixed(2) + "s, diffRatio: " + diffRatio.toFixed(2));
      this._stableBufferStartTime = Math.max(now, this._stableBufferStartTime);
    }

    if (diff > this._conf.stableBufferDiffThresholdSecond && now - this._stableBufferStartTime + this._conf.bufferCheckIntervalMs > this._conf.stableBufferIntervalMs) {
      this._stableBufferStartTime = Math.max(now - this._conf.bufferCheckIntervalMs * 2, this._stableBufferStartTime + this._conf.bufferCheckIntervalMs * 2);
      log["Log"].v(abr_algorithm_simple_tag, "bufferDiffUp: " + diff.toFixed(2) + "s");
    }

    this._lastCheckBuffer = buffered;
    return now - this._stableBufferStartTime > this._conf.stableBufferIntervalMs;
  };

  _proto._isSpeedFullyUsed = function _isSpeedFullyUsed() {
    return this._conf.isSpeedFullyUsed;
  }
  /**
   * 周期检查buffer水平和瞬时带宽，判断是否开启测速
   * @param status 获取buffer和下载信息
   */
  ;

  _proto._checkBuffer = function _checkBuffer(status) {
    var buffered = status.bufferedSec();

    var isBufferStable = this._updateStableBuffer(buffered);

    if (this._isSpeedFullyUsed()) {
      if (isBufferStable && this._current + 1 < this._levels.length) {
        this._generatedSpeed = this._levels[this._current + 1].bitrate;
      } else {
        this._generatedSpeed = 0;
      }
    } else if (isBufferStable && this._current + 1 < this._levels.length) {
      this._startTesting(status);

      this._stableBufferStartTime = performance.now() + this._conf.generateSpeedGapMs;
    }

    this._pastBuffer.push(buffered);

    if (this._pastBuffer.length > this._conf.recentBufferedSize) {
      this._pastBuffer.shift();
    }
  }
  /**
   * 基于下一档码率，开启测速，并更新_speedTestResult
   * @param status 获取buffer和下载信息
   */
  ;

  _proto._startTesting = function _startTesting(status) {
    var _this3 = this;

    log["Log"].v(abr_algorithm_simple_tag, "start speed testing on index: " + (this._current + 1));
    var lastDownloadSize = status.downloadSize();
    var testedBitrate = this._levels[this._current + 1].bitrate;

    this._speedTester.start({
      url: this._levels[this._current + 1].url,
      timeout: this._conf.speedTestTimeoutMs
    }, {
      onEnd: function onEnd(context, result) {
        var originalDownloadSize = status.downloadSize() - lastDownloadSize;

        if (result.succeeded && result.duration > 0 && result.firstPackageDuration > 0) {
          var testedSpeed = (originalDownloadSize + result.loaded) * 8 / result.duration;
          log["Log"].v(abr_algorithm_simple_tag, "testSpeed: " + testedSpeed.toFixed(0));

          if (testedSpeed >= testedBitrate) {
            _this3._generatedSpeed = testedBitrate;
          }
        }

        log["Log"].v(abr_algorithm_simple_tag, "succeeded: " + result.succeeded + ", firstPackageDuration: " + result.firstPackageDuration + ", originalDownloadSize: " + originalDownloadSize + ", downloadSize: " + result.loaded + ", downloadTime: " + result.duration);
      }
    });
  }
  /**
   * 设置码率列表中的清晰度是否可用
   * @param list 码率index列表
   */
  ;

  _proto.setAvailableBitrates = function setAvailableBitrates(list) {}
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
    var speed = size / Math.max(time, 0.05) * 8 / 1024;
    log["Log"].v(abr_algorithm_simple_tag, "buffered: " + buffered.toFixed(2) + ", size: " + size + ", time: " + time.toFixed(2));
    this._next = this._nextRateIndex(speed, buffered);
  }
  /**
   * 当开始加载新流
   * @param index 清晰度index
   */
  ;

  _proto.onLevelLoad = function onLevelLoad(index) {
    this._current = Math.max(0, index);
  };

  _proto.destroy = function destroy() {
    this._speedTester.destroy();

    clearInterval(this._timer);
  };

  _proto._quantization = function _quantization(speed) {
    var index = 0;

    for (var i = this._levels.length - 1; i >= 0; i--) {
      if (speed >= this._levels[i].bitrate) {
        index = i;
        break;
      }
    }

    return index;
  }
  /**
   * 计算下一个使用的码率
   * @param speed 下载速度 kbps
   * @param buffered 当前buffer ms
   */
  ;

  _proto._nextRateIndex = function _nextRateIndex(speed, buffered) {
    var index = this._nextRateBySpeedAndBuffered(speed, buffered);

    if (index != this._current) {
      this._stableBufferStartTime = performance.now() + this._conf.generateSpeedGapMs;
    }

    if (index < this._current) {
      this._speedTester.cancel();

      this._generatedSpeed = 0;
      this._lastSpeed = speed;
      this._pastBuffer = [buffered];
    } else {
      this._lastSpeed = this._getSmoothedSpeed(speed);
    }

    return index;
  }
  /**
   * 获取平滑带宽
   * @param speed 下载速度 kbps
   */
  ;

  _proto._getSmoothedSpeed = function _getSmoothedSpeed(speed) {
    if (this._lastSpeed > 0) {
      return speed * (1 - this._conf.smoothedSpeedRatio) + this._lastSpeed * this._conf.smoothedSpeedRatio;
    }

    return speed;
  };

  _proto._getPredictedBuffer = function _getPredictedBuffer(buffered) {
    var pastBuffer = Math.max.apply(Math, this._pastBuffer);
    return buffered + (buffered - pastBuffer);
  };

  _proto._getBufferSpeed = function _getBufferSpeed(buffered) {
    var pastBuffer = Math.max.apply(Math, this._pastBuffer);
    var bufferSpeedRatio = 1 + (buffered - pastBuffer) / pastBuffer;
    return bufferSpeedRatio * this._levels[this._current].bitrate;
  };

  _proto._isSpeedTooSmall = function _isSpeedTooSmall(speed) {
    return speed / this._levels[this._current].bitrate < this._conf.smallSpeedToBitrateRatio;
  };

  _proto._isSpeedEnough = function _isSpeedEnough(speed) {
    return speed / this._levels[this._current].bitrate > this._conf.enoughSpeedToBitrateRatio;
  }
  /**
   * 根据下载速度和buffer长度计算下一个码率
   * @param speed 下载速度 kbps
   * @param buffered 当前buffer ms
   */
  ;

  _proto._nextRateBySpeedAndBuffered = function _nextRateBySpeedAndBuffered(speed, buffered) {
    var bufferSpeed = this._getBufferSpeed(buffered);

    var smoothedSpeed = this._getSmoothedSpeed(speed);

    log["Log"].v(abr_algorithm_simple_tag, "gopSpeed: " + speed.toFixed(0) + ", smoothedSpeed: " + smoothedSpeed.toFixed(0));

    var predictedBuffered = this._getPredictedBuffer(buffered);

    log["Log"].v(abr_algorithm_simple_tag, "bufferSpeed: " + bufferSpeed.toFixed(0) + ", predictedBuffered: " + predictedBuffered.toFixed(1));
    var nextIndex = this._current;

    if (predictedBuffered < this._conf.bufferLowerLimitSecond || this._isSpeedTooSmall(bufferSpeed)) {
      nextIndex = Math.min(this._current, this._quantization(bufferSpeed));
    } else if (this._isSpeedEnough(bufferSpeed)) {
      if (this._generatedSpeed > 0) {
        log["Log"].i(abr_algorithm_simple_tag, "generatedSpeed used");
        nextIndex = this._quantization(this._generatedSpeed);
        this._generatedSpeed = 0;
      } else {
        nextIndex = this._quantization(smoothedSpeed * this._conf.smoothedSpeedUtilizationRatio);
      }

      nextIndex = Math.min(this._current + 1, Math.max(nextIndex, this._current));
    }

    return nextIndex;
  };

  abr_algorithm_simple_createClass(AbrAlgorithmSimple, [{
    key: "nextLevel",
    get: function get() {
      log["Log"].v(abr_algorithm_simple_tag, "nextLevel: " + this._next);
      return this._next;
    }
  }]);

  return AbrAlgorithmSimple;
}(events["EventEmitter"]);

/* harmony default export */ var abr_algorithm_simple = (abr_algorithm_simple_AbrAlgorithmSimple);
// CONCATENATED MODULE: ./src/abr/multirate.ts
function multirate_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function multirate_createClass(Constructor, protoProps, staticProps) { if (protoProps) multirate_defineProperties(Constructor.prototype, protoProps); if (staticProps) multirate_defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:53:31 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:53:31 
 * flv多码率处理
 */




/**
 * 多码率流处理
 * 自动+多清晰度切换
 */

var multirate_Multirate = /*#__PURE__*/function () {
  /**
   * 构造函数
   * @param eventEmitter 事件抛出
   * @param config 配置
   * @param media media
   * @param src manifest/url
   */
  function Multirate(eventEmitter, config, media, src) {
    var _this = this;

    this._eventEmitter = void 0;
    this._config = void 0;
    this._media = void 0;
    this._next = 0;
    this._downloadSizeTotal = 0;
    this._downloadSize = 0;
    this._downloadStartTime = 0;
    this._keyCount = 0;
    this._index = 0;
    this._alg = void 0;
    this._manifest = void 0;
    this._autoLevelEnabled = false;
    this._eventEmitter = eventEmitter;
    this._config = config;
    this._media = media;
    this._manifest = new abr_manifest_AbrManifest(src);
    var status = {
      bufferedSec: function bufferedSec() {
        return _this._media.bufferedSec();
      },
      downloadSize: function downloadSize() {
        return _this._downloadSizeTotal;
      }
    };
    this._alg = new abr_algorithm_simple();

    this._alg.init(this._manifest, status);

    this._autoLevelEnabled = this._manifest.abrLevels.length > 0;
  }
  /**
   * 初始化flv多码率
   */


  var _proto = Multirate.prototype;

  _proto.init = function init() {
    this._downloadSizeTotal = 0;
    this._downloadSize = 0;
    this._downloadStartTime = performance.now(); // 当前流收到I帧计数

    this._keyCount = 0;
    this._index = this._next = 0;

    if (this.current) {
      if (this._autoLevelEnabled) {
        this._index = this._next = this._alg.nextLevel;
      }

      this._eventEmitter.emit(core_events["default"].MANIFEST_PARSED, {
        levels: this._manifest.levels,
        currentLevel: this._index
      });
    }
  }
  /**
   * 回收
   */
  ;

  _proto.destory = function destory() {
    if (this._alg) {
      this._alg.destroy();

      this._alg.removeAllListeners();
    }
  }
  /**
   * 有数据下载
   * @param size 数据大小
   */
  ;

  _proto.onLoaderChunk = function onLoaderChunk(size) {
    this._downloadSize += size;
    this._downloadSizeTotal += size;
  }
  /**
   * 有清晰度切换
   * @param index 清晰度index
   */
  ;

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
          level: next,
          timestamp: time
        };
      }
    }

    return;
  }
  /**
   * 自动码率是否为开启状态
   */
  ;

  /**
   * 获取切换flv的请求地址
   * @param index 码率index
   * @param spts 切换时间戳，单位毫秒。大于0：关键帧pts；小于0：直播延迟
   */
  _proto._getRequestUrl = function _getRequestUrl(index, spts) {
    var url = '';
    var level = this._manifest.levels[index];

    if (level) {
      url = level.url;
    }

    return abrGetUrl(url, spts || this._config.defaultLiveDelay);
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
    /**
     * 下一个下载的流index
     */

  }, {
    key: "nextLevel",
    get: function get() {
      if (typeof this._next === 'number') {
        return this._next;
      } else {
        return this._index;
      }
    }
    /**
     * 在下一个关键帧位置切换流
     * 设置-1会启用自动码率
     */
    ,
    set: function set(value) {
      if (value >= 0 && this._manifest.levels.length > value) {
        this._autoLevelEnabled = false;
        this._next = value;
      } else if (value === -1) {
        this._autoLevelEnabled = true;
      }
    }
    /**
     * get: 当前正在下载的流index
     */

  }, {
    key: "currentLevel",
    get: function get() {
      return this._index;
    }
    /**
     * 立即切换码率，会清空buffer并从当前播放位置所在切片开始下载新的流
     * 设置-1会启用自动码率
     */
    ,
    set: function set(value) {
      if (value >= 0 && this._manifest.levels.length > value) {
        this._autoLevelEnabled = false;
        this._index = this._next = value;
      } else if (value === -1) {
        this._autoLevelEnabled = true;
      }
    }
    /**
     * 当前level
     */

  }, {
    key: "current",
    get: function get() {
      return this._manifest.levels[this._index];
    }
  }]);

  return Multirate;
}();

/* harmony default export */ var multirate = (multirate_Multirate);
// EXTERNAL MODULE: ./src/demux/flv/flv-demuxer-inline.ts + 10 modules
var flv_demuxer_inline = __webpack_require__("./src/demux/flv/flv-demuxer-inline.ts");

// CONCATENATED MODULE: ./src/io/cache.ts
function cache_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function cache_createClass(Constructor, protoProps, staticProps) { if (protoProps) cache_defineProperties(Constructor.prototype, protoProps); if (staticProps) cache_defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:49:54 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:49:54 
 * Uint8Array数据缓存
 */
var Cache = /*#__PURE__*/function () {
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
// EXTERNAL MODULE: ./src/types/flv-object.ts
var flv_object = __webpack_require__("./src/types/flv-object.ts");

// CONCATENATED MODULE: ./src/demux/flv/flv-preprocessor.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:52:22 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:52:22 
 * flv预处理器
 */




/**
 * 关键帧回调方法定义
 */

/**
 * flv预处理，拆解tag，关键帧位置回调
 */
var flv_preprocessor_FlvPreprocessor = /*#__PURE__*/function () {
  /**
   * 构造函数
   * @param eventEmitter 事件派发器
   * @param onFlvKeyframe 关键帧位置回调
   */
  function FlvPreprocessor(eventEmitter, onFlvKeyframe) {
    this._eventEmitter = void 0;
    this._cache = void 0;
    this._tag = void 0;
    this._result = void 0;
    this._parseLen = 0;
    this._parseFunc = void 0;
    this._onFlvKeyframe = void 0;
    this._eventEmitter = eventEmitter;
    this._onFlvKeyframe = onFlvKeyframe;
    this._cache = new cache();
    this._parseLen = flv_object["FlvSize"].FLV_HEAD_LEN;
    this._parseFunc = this._parseFlvHead;
    this._result = {
      list: []
    };
  }
  /**
   * 重置状态
   */


  var _proto = FlvPreprocessor.prototype;

  _proto.reset = function reset() {
    this._parseLen = flv_object["FlvSize"].FLV_HEAD_LEN;
    this._parseFunc = this._parseFlvHead;

    this._cache.clear();

    this._tag = undefined;
    this._result.list = [];
    this._result.callbackResult = undefined;
  }
  /**
   * 处理数据
   * @param input flv数据
   */
  ;

  _proto.processing = function processing(input) {
    this._cache.put(new Uint8Array(input));

    while (this._cache.unreadLen > this._parseLen) {
      this._parseFunc();
    }

    var data = {
      list: this._result.list.splice(0),
      callbackResult: this._result.callbackResult
    };
    this._result.callbackResult = undefined;
    return data;
  }
  /**
   * 解析tag头
   */
  ;

  _proto._parseFlvHead = function _parseFlvHead() {
    var data = this._cache.read(flv_object["FlvSize"].FLV_HEAD_LEN);

    if (data) {
      if (data[0] !== 0x46 || data[1] !== 0x4c || data[2] !== 0x56 || data[3] !== 0x01) {
        this._eventEmitter.emit(core_events["default"].ERROR, {
          type: errors["ErrorTypes"].MUX_ERROR,
          details: errors["ErrorDetails"].DEMUX_ERROR,
          fatal: true,
          info: {
            reason: 'flv wrong head'
          }
        });
      }

      this._eventEmitter.emit(core_events["default"].FLV_HEAD, {
        hasAudio: (data[4] & 4) >>> 2,
        hasVideo: data[4] & 1
      }); // TEST:
      // this._eventEmitter.emit(KEvents.FLV_HEAD, {
      //     hasAudio: true,
      //     hasVideo: true
      // });


      this._cache.skip(flv_object["FlvSize"].FLV_HEAD_LEN);

      this._parseLen = flv_object["FlvSize"].FLV_TAG_HEAD_LEN;
      this._parseFunc = this._parseFlvTagHead;
    }
  }
  /**
   * 解析flv tag head
   */
  ;

  _proto._parseFlvTagHead = function _parseFlvTagHead() {
    this._tag = new flv_object["FlvTag"]();

    var data = this._cache.read(flv_object["FlvSize"].FLV_TAG_HEAD_LEN);

    if (data) {
      // 取出tag类型
      this._tag.tagType = data[0]; // 取出包体大小

      this._tag.dataSize = ((data[1] & 0xff) << 16) + ((data[2] & 0xff) << 8) + (data[3] & 0xff); // 取出解码时间

      this._tag.timestamp = ((data[7] & 0xff) << 24) + ((data[4] & 0xff) << 16) + ((data[5] & 0xff) << 8) + (data[6] & 0xff);

      this._cache.skip(flv_object["FlvSize"].FLV_TAG_HEAD_LEN); // 尝试在处理完整个tag之前判断是否为关键帧，用于自适应码率


      if (this._tag.tagType === flv_object["FlvTagType"].VIDEO) {
        this._parseFunc = this._detectKeyFrame;
        this._parseLen = flv_object["FlvSize"].AVC_KEY_FRAME_CHECK_LEN;
      } else {
        this._parseFunc = this._parseFlvTag;
        this._parseLen = this._tag.dataSize + flv_object["FlvSize"].FLV_TAG_SIZE_LEN;
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
      this._parseLen = this._tag.dataSize + flv_object["FlvSize"].FLV_TAG_SIZE_LEN; // 获取是否是关键帧

      if (frameType === 1 && packetType === 1 && this._onFlvKeyframe) {
        this._result.callbackResult = this._onFlvKeyframe(this._tag.timestamp);

        if (this._result.callbackResult) {
          this._parseLen = flv_object["FlvSize"].FLV_HEAD_LEN;
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

    if (tag.tagType === flv_object["FlvTagType"].SCRIPT || tag.tagType === flv_object["FlvTagType"].AUDIO || tag.tagType === flv_object["FlvTagType"].VIDEO) {
      tag.body = this._cache.get(tag.dataSize);

      this._cache.skip(4); // skip size


      if (tag) this._result.list.push(tag);
      this._tag = undefined;
    }

    this._parseFunc = this._parseFlvTagHead;
    this._parseLen = flv_object["FlvSize"].FLV_TAG_HEAD_LEN;
  };

  return FlvPreprocessor;
}();

/* harmony default export */ var flv_preprocessor = (flv_preprocessor_FlvPreprocessor);
// CONCATENATED MODULE: ./src/core/report-types.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:42:27 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:42:27 
 * las.js的report事件类型定义
 */
var REPORT_TYPES = {
  // 开始加载流
  START_LOAD_STREAM: 'startLoadStream',
  // 有数据被下载
  LOADER_CHUNK_ARRIVAL: 'loader-chunk-arrival',
  // 关键帧
  KEY_FRAME: 'keyFrame'
};
// EXTERNAL MODULE: ./src/core/worker-cmd.ts
var worker_cmd = __webpack_require__("./src/core/worker-cmd.ts");

// CONCATENATED MODULE: ./src/core/las-main.ts
function las_main_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function las_main_createClass(Constructor, protoProps, staticProps) { if (protoProps) las_main_defineProperties(Constructor.prototype, protoProps); if (staticProps) las_main_defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function las_main_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:39:26 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:40:09
 * 处理las.js协议及flv流
 */













var URL_REG = new RegExp('^(http|https)://');
/**
 * flv视频流处理
 */

var las_main_tag = 'LasMain';

var las_main_LasMain = /*#__PURE__*/function (_EventEmitter) {
  las_main_inheritsLoose(LasMain, _EventEmitter);

  /**
   * 传入配置并初始化
   * @param config 配置信息
   * @param media Media
   */
  function LasMain(config, media) {
    var _this;

    _this = _EventEmitter.call(this) || this;
    _this._config = void 0;
    _this._media = void 0;
    _this._w = void 0;
    _this._flv = void 0;
    _this._eventEmitter = void 0;
    _this._loader = void 0;
    _this._loaderConf = void 0;
    _this._loaderCallbacks = void 0;
    _this._multirate = void 0;
    _this._isContinuous = void 0;
    _this._remuxId = void 0;
    _this._baseTimeSec = 0;
    _this._tagDump = void 0;
    _this._currentUrl = void 0;
    _this._isAbr = false;
    _this._progressTime = 0;
    _this._src = void 0;
    _this._audioCodec = '';

    _this._onWorkerEvent = function (ev) {
      var data = ev.data;

      _this._onEvent(data.event, data.data);
    };

    _this._flvKeyframeCallback = function (timestamp) {
      if (!_this._media.hasStreamTime) {
        _this._media.updateStreamTime(timestamp / 1000, 0);
      }

      return _this._multirate ? _this._multirate.onKeyFrame(timestamp) : undefined;
    };

    _this._onEvent = function (ev, data) {
      switch (ev) {
        case core_events["default"].FLV_HEAD:
          if (_this._w) {
            _this._w.postMessage({
              cmd: worker_cmd["WorkerCmd"].FLV_HEAD,
              hasAudio: data.hasAudio,
              hasVideo: data.hasVideo
            });
          } else if (_this._flv) {
            _this._flv.flvHead(data.hasAudio, data.hasVideo);
          }

          break;

        case core_events["default"].MEDIA_INFO:
          _this.emit(core_events["default"].MEDIA_INFO, data);

          break;

        case core_events["default"].MP4_SEGMENT:
          {
            var mp4Data = data;

            if (mp4Data.extra && mp4Data.extra.remuxId !== _this._remuxId) {
              // 过期，丢弃
              break;
            }

            mp4Data.segments.forEach(function (segment) {
              if (segment.type === 'audio' && segment.startDTS > _this._baseTimeSec) {
                _this._media.updateStreamTime(segment.streamDTS, segment.startDTS);
              }
            });

            _this.emit(core_events["default"].MP4_SEGMENT, mp4Data);
          }
          break;

        default:
          // SCRIPT_PARSED ERROR END
          _this.emit(ev, data);

          break;
      }
    };

    _this._onLoaderProgress = function (target, data) {
      if (!(data instanceof ArrayBuffer)) {
        return;
      }

      if (_this._multirate) {
        _this._multirate.onLoaderChunk(data.byteLength);
      }

      _this.emit(core_events["default"].REPORT, {
        type: REPORT_TYPES.LOADER_CHUNK_ARRIVAL,
        byteLength: data.byteLength,
        timeCost: performance.now() - _this._progressTime || target.stats.requestStartTime,
        header: target.context.responseHeader
      });

      _this._progressTime = performance.now();

      var result = _this._tagDump.processing(data);

      _this._append(result.list, _this._baseTimeSec, _this._isContinuous);

      _this._isContinuous = true; // 是否需要切换

      if (result.callbackResult) {
        if (_this._tagDump) {
          _this._tagDump.reset();
        }

        _this._baseTimeSec = result.callbackResult.timestamp ? _this._media.getLocalTime(result.callbackResult.timestamp / 1000) || 0 : 0; // 平滑切换

        _this.emit(core_events["default"].LEVEL_SWITCHING, {
          level: result.callbackResult.level,
          startSec: _this._baseTimeSec,
          smooth: true
        });

        _this._load(result.callbackResult.url, result.callbackResult.level);
      }
    };

    _this._onLoaderAbort = function () {};

    _this._onLoaderError = function (target) {
      if (!target.stats.fatalError) {
        return;
      }

      var errInfo = {
        type: errors["ErrorTypes"].NETWORK_ERROR,
        details: target.stats.errorMessage === 'timeout' ? errors["ErrorDetails"].LOAD_ERROR_TIMEOUT : errors["ErrorDetails"].LOAD_ERROR,
        fatal: true,
        info: {
          url: target.context.url,
          httpStatusCode: target.stats.httpStatusCode,
          reason: target.stats.errorMessage
        }
      };

      _this.emit(core_events["default"].ERROR, errInfo);
    };

    _this._onLoaderEnd = function () {
      if (_this._w) {
        _this._w.postMessage({
          cmd: worker_cmd["WorkerCmd"].LOAD_END
        });
      } else if (_this._flv) {
        _this._flv.end();
      }
    };

    _this._config = config;
    _this._media = media;
    _this._loaderConf = {
      connectionTimeout: _this._config.connectionTimeout,
      transmissionTimeout: _this._config.transmissionTimeout,
      maxRetry: 0,
      retryDelay: 0,
      useFetch: true
    };
    _this._loaderCallbacks = {
      onProgress: _this._onLoaderProgress,
      onError: _this._onLoaderError,
      onEnd: _this._onLoaderEnd,
      onAbort: _this._onLoaderAbort
    };
    _this._isContinuous = false;
    _this._remuxId = 1;
    var eventEmitter = _this._eventEmitter = new events["EventEmitter"]();
    eventEmitter.on(core_events["default"].MEDIA_INFO, function (data) {
      _this._onEvent(core_events["default"].MEDIA_INFO, data);
    });
    eventEmitter.on(core_events["default"].SCRIPT_PARSED, function (data) {
      _this._onEvent(core_events["default"].SCRIPT_PARSED, data);
    });
    eventEmitter.on(core_events["default"].MANIFEST_PARSED, function (data) {
      _this._onEvent(core_events["default"].MANIFEST_PARSED, data);
    });
    eventEmitter.on(core_events["default"].MP4_SEGMENT, function (data) {
      _this._onEvent(core_events["default"].MP4_SEGMENT, data);
    });
    eventEmitter.on(core_events["default"].ERROR, function (data) {
      _this._onEvent(core_events["default"].ERROR, data);
    });
    eventEmitter.on(core_events["default"].FLV_HEAD, function (data) {
      _this._onEvent(core_events["default"].FLV_HEAD, data);
    });
    _this._tagDump = new flv_preprocessor(_this._eventEmitter, _this._flvKeyframeCallback);

    if (_this._config.webWorker) {
      log["Log"].i(las_main_tag, 'webWorker');
      _this._w = webworkify_webpack_default()(/*require.resolve*/(/*! ../demux/flv/flv-demuxer-worker */ "./src/demux/flv/flv-demuxer-worker.ts"));

      if (_this._w) {
        _this._w.addEventListener('message', _this._onWorkerEvent);

        _this._w.postMessage({
          cmd: worker_cmd["WorkerCmd"].INIT,
          config: _this._config,
          data: {
            remuxId: _this._remuxId
          }
        });

        return _assertThisInitialized(_this);
      }
    }

    _this._flv = new flv_demuxer_inline["default"](eventEmitter, _this._config, {
      remuxId: _this._remuxId
    });

    _this._flv.init();

    return _this;
  }
  /**
   * 初始化
   * @param src manifest/播放url
   */


  var _proto = LasMain.prototype;

  _proto.init = function init(src, audioCodec) {
    if (audioCodec === void 0) {
      audioCodec = '';
    }

    this._src = src;
    this._audioCodec = audioCodec;

    if (typeof src === 'string' && !URL_REG.test(src)) {
      try {
        this._src = JSON.parse(src);
      } catch (e) {
        this.emit(core_events["default"].ERROR, {
          type: errors["ErrorTypes"].OTHER_ERROR,
          details: errors["ErrorDetails"].MANIFEST_ERROR,
          fatal: true,
          info: {
            reason: 'manifest parse error'
          }
        });
        return;
      }
    }

    if (this._src) {
      if (abr_manifest_AbrManifest.verify(this._src)) {
        this._isAbr = true;
      }
    } else {
      this.emit(core_events["default"].ERROR, {
        type: errors["ErrorTypes"].OTHER_ERROR,
        details: errors["ErrorDetails"].MANIFEST_ERROR,
        fatal: true,
        info: {
          reason: 'src empty'
        }
      });
      return;
    }

    if (this._isAbr && !this._multirate) {
      this._multirate = new multirate(this._eventEmitter, this._config, this._media, this._src);

      this._multirate.init();
    }
  }
  /**
   * 开始加载
   */
  ;

  _proto.load = function load() {
    var mr = this._multirate;

    if (mr) {
      var data = mr.levels[mr.currentLevel];

      if (data) {
        this._load(abrGetUrl(data.url, this._config.defaultLiveDelay), mr.currentLevel);
      } else {
        this.emit(core_events["default"].ERROR, {
          type: errors["ErrorTypes"].OTHER_ERROR,
          details: errors["ErrorDetails"].MANIFEST_ERROR,
          fatal: true,
          info: {
            reason: 'manifest parse error'
          }
        });
      }
    } else {
      this._load(this._src);
    }
  }
  /**
   * 销毁
   */
  ;

  _proto.destroy = function destroy() {
    this._destroyLoader();

    if (this._w) {
      this._w.postMessage({
        cmd: worker_cmd["WorkerCmd"].DESTROY
      });

      this._w.removeEventListener('message', this._onWorkerEvent);

      this._w.terminate();
    }

    if (this._flv) {
      this._flv.destroy();

      this._flv = undefined;
    }

    if (this._multirate) {
      this._multirate.destory();
    }

    var eventEmitter = this._eventEmitter;

    if (eventEmitter) {
      eventEmitter.removeAllListeners();
    }
  }
  /**
   * 自动码率是否是开启状态
   */
  ;

  _proto._destroyLoader = function _destroyLoader() {
    if (this._loader) {
      this._loader.destroy();

      this._loader = undefined;
    }
  }
  /**
   * 开始下载流
   * @param url flv地址
   * @param index level index
   */
  ;

  _proto._load = function _load(url, index) {
    if (index === void 0) {
      index = 0;
    }

    this._destroyLoader();

    if (this._multirate) {
      this._multirate.onLevelLoad(index);
    }

    this._currentUrl = url;
    var level = this.levels[index];

    if (level) {
      this._updateCodecs(this._audioCodec || level.audioCodec, level.videoCodec);
    }

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
  }
  /**
   * 读取的flv tag数据传入worker进行解封装、封装操作
   * @param tags 读取的flv tag数据
   * @param timeOffset 时间偏移
   * @param isContinuous 继续remux的时间戳进行处理
   */
  ;

  _proto._append = function _append(tags, timeOffset, isContinuous) {
    if (this._w) {
      this._w.postMessage({
        cmd: worker_cmd["WorkerCmd"].APPEND_DATA,
        tags: tags,
        timeOffset: timeOffset || 0,
        isContinuous: isContinuous
      });
    } else if (this._flv) {
      this._flv.append(tags, timeOffset || 0, isContinuous);
    }
  };

  _proto._updateCodecs = function _updateCodecs(audioCodec, videoCodec) {
    if (audioCodec === void 0) {
      audioCodec = '';
    }

    if (videoCodec === void 0) {
      videoCodec = '';
    }

    if (this._w) {
      this._w.postMessage({
        cmd: worker_cmd["WorkerCmd"].SET_CODECS,
        audioCodec: audioCodec,
        videoCodec: videoCodec
      });
    } else if (this._flv) {
      this._flv.setCodecs(audioCodec, videoCodec);
    }
  }
  /**
   * 下载数据progress处理
   * @param context 下载器上下文
   * @param data 下载数据
   * @param stats 下载器状态数据
   */
  ;

  /**
   * 处理worker中的过期数据
   */
  _proto._refreshRemuxId = function _refreshRemuxId() {
    this._remuxId++;
    var data = {
      remuxId: this._remuxId
    };

    if (this._w) {
      this._w.postMessage({
        cmd: worker_cmd["WorkerCmd"].SET_EXTRA,
        data: data
      });
    } else if (this._flv) {
      this._flv.setExtra(data);
    }
  };

  las_main_createClass(LasMain, [{
    key: "autoLevelEnabled",
    get: function get() {
      if (this._multirate) {
        return this._multirate.autoLevelEnabled;
      }

      return false;
    }
    /**
     * 返回多路流列表
     */

  }, {
    key: "levels",
    get: function get() {
      if (this._multirate) {
        return this._multirate.levels;
      }

      return [];
    }
    /**
     * 即将切换的level index
     */

  }, {
    key: "nextLevel",
    get: function get() {
      if (this._multirate) {
        return this._multirate.nextLevel;
      }

      return 0;
    }
    /**
     * 平滑切换清晰度，在关键帧位置切换
     */
    ,
    set: function set(value) {
      var mr = this._multirate;

      if (mr) {
        mr.nextLevel = value;
      }
    }
    /**
     * 当前正在加载的level index
     */

  }, {
    key: "currentLevel",
    get: function get() {
      if (this._multirate) {
        return this._multirate.currentLevel;
      }

      return 0;
    }
    /**
     * 立即切换清晰度，丢弃现有数据，重新拉指定index的流
     */
    ,
    set: function set(value) {
      var mr = this._multirate;

      if (mr) {
        var load = value >= 0 || value !== mr.currentLevel;
        mr.currentLevel = value;
        var data = mr.levels[mr.currentLevel];

        if (load && data) {
          this._currentUrl = abrGetUrl(data.url, this._config.defaultLiveDelay);

          this._refreshRemuxId();

          this._isContinuous = false;

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
    /**
     * worker通信
     * @param ev worker返回数据
     */

  }]);

  return LasMain;
}(events["EventEmitter"]);


// CONCATENATED MODULE: ./src/core/media.ts
function media_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function media_createClass(Constructor, protoProps, staticProps) { if (protoProps) media_defineProperties(Constructor.prototype, protoProps); if (staticProps) media_defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:41:45 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:42:08
 * video及MSE工具类，封装video和MSE的部分接口，并用于计算处理视频的缓冲相关信息
 */
var Media = /*#__PURE__*/function () {
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
  }
  /**
  * 当前是否有流时间
  */
  ;

  media_createClass(Media, [{
    key: "hasStreamTime",
    get: function get() {
      return !!this._streamTime;
    }
  }, {
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
// CONCATENATED MODULE: ./src/core/mse.ts
function mse_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function mse_createClass(Constructor, protoProps, staticProps) { if (protoProps) mse_defineProperties(Constructor.prototype, protoProps); if (staticProps) mse_defineProperties(Constructor, staticProps); return Constructor; }

function mse_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:40:17 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:41:13
 * MSE控制器，MSE的buffer管理
 */



 // append关闭时queue允许缓存的长度上限

var QUEUE_SIZE_LIMIT = 200 * 1024 * 1024;
var MAX_CLEANUP_DURATION = 10;
var MIN_CLEANUP_DURATION = 5;
var MAX_BUFFERED = 30;
/**
 * 处理MediaSource
 * https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSource
 */

var mse_MSE = /*#__PURE__*/function (_EventEmitter) {
  mse_inheritsLoose(MSE, _EventEmitter);

  /**
   * 传入配置参数，初始化MSE
   * @param config LasConfig
   */
  function MSE(config) {
    var _this;

    _this = _EventEmitter.call(this) || this;
    _this.tag = 'MSE';
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
        info: {
          reason: 'source buffer error'
        }
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
   * 绑定HTMLVideoElement
   * @param video HTMLVideoElement
   */


  var _proto = MSE.prototype;

  _proto.attach = function attach(video) {
    var _this2 = this;

    this.video = video;
    var MediaSourceDef = window.MediaSource || window.WebKitMediaSource;

    if (MediaSourceDef) {
      var ms = this._mediaSource = new MediaSourceDef();
      this.video.src = URL.createObjectURL(ms);
      this.video.load();
      ms.addEventListener('sourceopen', this._onSourceOpen);
      ms.addEventListener('sourceended', this._onSourceEnded);
      ms.addEventListener('sourceclose', this._onSourceClose);
    } else {
      setTimeout(function () {
        _this2.emit(core_events["default"].ERROR, {
          type: errors["ErrorTypes"].MSE_ERROR,
          details: errors["ErrorDetails"].MEDIASOURCE_ERROR,
          fatal: true,
          info: {
            reason: 'MediaSource is not support'
          }
        });
      }, 0);
    }
  }
  /**
   * 传入视频头信息
   * @param mediaInfo 
   */
  ;

  _proto.mediaInit = function mediaInit(mediaInfo) {
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
   * 刷新MSE，计算一次清理任务，尝试重启填充buffer任务
   */
  ;

  _proto.refresh = function refresh() {
    for (var type in this._sourceBuffer) {
      this._update(type);
    }
  }
  /**
   * 转封装后fmp4数据
   * @param segments segments
   */
  ;

  _proto.mediaSegment = function mediaSegment(segments) {
    var _this3 = this;

    segments.forEach(function (segment) {
      var type = segment.type;

      _this3._appendQueue[type].push(segment);

      if (_this3._sourceBuffer[type]) {
        _this3._update(type);
      }
    });
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
        return prev + current.endDTS - current.startDTS;
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
   * MediaSource的sourceopen事件处理
   */
  ;

  /**
   * 向mediaSource添加sourceBuffer
   * @param type video|audio
   */
  _proto._addSourceBuffer = function _addSourceBuffer(type) {
    var _this4 = this;

    if (this._sourceBuffer[type]) {
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
        info: {
          reason: e.message
        }
      });
      return;
    }

    var sb = this._sourceBuffer[type];
    this._sbHandler[type] = {
      updateend: function updateend() {
        _this4._onSourceBufferUpdateEnd(type);
      },
      error: function error(e) {
        _this4._onSourceBufferError(e);
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
   * 向sourcebuffer中填入数据
   * @param type video|audio
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
            info: {
              reason: 'bufferfull'
            }
          });
        }

        return;
      }

      if (this._appendQueue[type].length > 0 && this._sourceBuffer[type] && !this._sourceBuffer[type].updating && !this._appendBufferError) {
        var data = this._appendQueue[type].shift();

        this._appendBuffer(data);
      }
    }
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

      if (buffered.length >= 1 && time - buffered.start(0) >= MAX_CLEANUP_DURATION) {
        var end = time - MIN_CLEANUP_DURATION;

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
            var bufStart = 0;
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

  _proto._appendBuffer = function _appendBuffer(data) {
    if (!data || !this._sourceBuffer[data.type] || !this.video || this.video.error) {
      return;
    }

    try {
      this._sourceBuffer[data.type].appendBuffer(data.payload.buffer);
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
            info: {
              reason: e.message
            }
          });
        } else {
          this._appendQueue[data.type].unshift(data);
        }
      } else {
        // buffer满无法填充
        var v = this.video,
            conf = this._config;
        this._appendEnabled = false;

        this._appendQueue[data.type].unshift(data);

        var buffered = v.buffered.end(v.buffered.length - 1) - v.currentTime;
        var useless = v.currentTime - v.buffered.start(0); // 未使用buffer小于阈值，尝试清理已使用buffer

        if (buffered < MAX_BUFFERED) {
          this._calculateRemoveRange(data.type);

          if (this.hasCleanUpTask(data.type)) {
            this._cleanUp(data.type);
          } // 已使用buffer小于清理阈值时，抛错

        } else if (useless < MAX_CLEANUP_DURATION) {
          this.emit(core_events["default"].ERROR, {
            type: errors["ErrorTypes"].MSE_ERROR,
            details: errors["ErrorDetails"].APPENDBUFFER_ERROR,
            fatal: true,
            info: {
              reason: 'buffer full, append error'
            }
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
  }
  /**
   * 数据结束
   */
  ;

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
        info: {
          reason: error.message
        }
      });
    }
  }
  /**
   * 销毁
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
  }
  /**
   * 是否已添加了sourceBuffer
   */
  ;

  _proto.hasSourceBuffer = function hasSourceBuffer() {
    return !!Object.keys(this._sourceBuffer).length;
  }
  /**
   * 计算待填充数据队列中数据总大小
   */
  ;

  _proto._getBufferQueueSize = function _getBufferQueueSize() {
    var num = 0;

    for (var type in this._appendQueue) {
      num += this._appendQueue[type].reduce(function (prev, current) {
        if (current.payload && current.payload.byteLength) {
          return prev + current.payload.byteLength;
        }

        return prev;
      }, 0);
    }

    return num;
  }
  /**
   * 待填充队列中的数据时长
   * @param type video|audio|audiovideo，为空时返回video|audio最大值
   * @returns 时长（秒）
   */
  ;

  _proto.getBufferQueueSec = function getBufferQueueSec(type) {
    var _this5 = this;

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
      if (_this5._appendQueue[current] && _this5._appendQueue[current].length > 0 && (Object.keys(_this5._sourceBuffer).length === 0 || _this5._sourceBuffer[current])) {
        return Math.max(prev, _this5._appendQueue[current].reduce(function (prevDuration, currentSegment) {
          var duration = currentSegment.endDTS - currentSegment.startDTS;

          if (duration) {
            return prevDuration + duration;
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

  mse_createClass(MSE, [{
    key: "readyState",
    get: function get() {
      if (this._mediaSource) {
        return this._mediaSource.readyState;
      }

      return 'closed';
    }
  }]);

  return MSE;
}(events["EventEmitter"]);


// CONCATENATED MODULE: ./src/types/monitor-data.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:47:25 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:47:25 
 * 性能监控相关类型定义
 */
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
// CONCATENATED MODULE: ./src/monitor/playback-quality.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:48:59 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:48:59 
 * 播放质量信息
 */
var _window = window,
    playback_quality_performance = _window.performance;

/**
 * 播放质量信息
 * 计算视频播放的解码总数、丢帧总数，解码FPS，丢帧FPS
 */
var PlaybackQuality = /*#__PURE__*/function () {
  function PlaybackQuality() {
    this.tag = 'fps';
    this._lastDroppedFrames = 0;
    this._lastDecodedFrames = 0;
    this._video = null;
    this._isVideoPlaybackQualityAvailable = false;
    this._lastTime = 0;
    this._decoded = 0;
    this._dropped = 0;
  }
  /**
   * 绑定HTMLVideoElement元素
   * @param media HTMLVideoElement
   */


  var _proto = PlaybackQuality.prototype;

  _proto.attachMedia = function attachMedia(media) {
    var video = this._video = media instanceof window.HTMLVideoElement ? media : null;

    if (video) {
      // 部分浏览器seek后帧数信息归零的问题
      this._isVideoPlaybackQualityAvailable = typeof video.getVideoPlaybackQuality === 'function';
    }
  };

  _proto.destory = function destory() {}
  /**
   * 重置
   */
  ;

  _proto.reset = function reset() {
    this._lastTime = playback_quality_performance.now();
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
  }
  /**
   * 获取播放质量信息
   */
  ;

  _proto.getInfo = function getInfo() {
    var video = this._video;
    var currentTime = playback_quality_performance.now();
    var decoded = 0,
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
      return {
        decoded: this._decoded,
        dropped: this._dropped,
        decodedFPS: decodedFPS,
        droppedFPS: droppedFPS
      };
    }

    this._lastTime = currentTime;
    return;
  };

  return PlaybackQuality;
}();

/* harmony default export */ var playback_quality = (PlaybackQuality);
// CONCATENATED MODULE: ./src/monitor/stream-monitor.ts
function stream_monitor_extends() { stream_monitor_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return stream_monitor_extends.apply(this, arguments); }

function stream_monitor_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function stream_monitor_createClass(Constructor, protoProps, staticProps) { if (protoProps) stream_monitor_defineProperties(Constructor.prototype, protoProps); if (staticProps) stream_monitor_defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:49:17 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:49:17 
 * 流下载相关信息处理
 */
var RECORD_NUM_LIMIT = 10;
var RECORD_DOWNLOAD_NUM_LIMIT = 200;
var RECORD_SEGMRNT_NUM_LIMIT = 100;

/**
 * 监测流下载、remux质量信息
 */
var StreamMonitor = /*#__PURE__*/function () {
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
      info.mediaInfo = stream_monitor_extends({}, data);
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
      duration: (data.endDTS - data.startDTS) * 1000,
      dts: data.startDTS * 1000,
      len: data.payload.byteLength
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

/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:49:38 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:49:38 
 * 播放信息监控
 */






var HEARTBEAT_INTERVAL = 1000;
/**
 * 播放信息监控。收集播放器事件，集中处理
 */

var monitor_Monitor = /*#__PURE__*/function (_EventEmitter) {
  monitor_inheritsLoose(Monitor, _EventEmitter);

  /**
   * 初始化
   * @param media Media
   */
  function Monitor(media) {
    var _this;

    _this = _EventEmitter.call(this) || this;
    _this._media = void 0;
    _this._playbackQuality = void 0;
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

    _this._sm = new StreamMonitor();
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

    if (this._playbackQuality) {
      this._playbackQuality.reset();
    }

    this._refresh();
  }
  /**
   * report事件处理
   * @param event Report事件数据
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
  }
  /**
   * 销毁
   */
  ;

  _proto.destroy = function destroy() {
    if (this._playbackQuality) {
      this._playbackQuality.destory();

      this._playbackQuality = undefined;
    }

    this._stopHeartbeat();
  };

  _proto.onLoad = function onLoad() {
    this._startHeartbeat();

    if (this._media.video) {
      this._playbackQuality = new playback_quality();

      this._playbackQuality.attachMedia(this._media.video);
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
    var _this2 = this;

    data.segments.forEach(function (segment) {
      _this2._sm.onMediaSegment(segment);
    });
  };

  _proto._refresh = function _refresh() {
    var playbackQualityInfo;

    if (this._playbackQuality) {
      playbackQualityInfo = this._playbackQuality.getInfo();
    }

    var data = this._data;

    if (playbackQualityInfo) {
      data.decodedFPS = playbackQualityInfo.decodedFPS;
      data.droppedFPS = playbackQualityInfo.droppedFPS;
      data.droppedFrames = playbackQualityInfo.dropped;
      data.decodedFrames = playbackQualityInfo.decoded;
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
// EXTERNAL MODULE: ./src/utils/browser-helper.ts
var browser_helper = __webpack_require__("./src/utils/browser-helper.ts");

// CONCATENATED MODULE: ./src/utils/is-supported.ts
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:45:18 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:45:18 
 * 浏览器能力检测，是否支持flv播放
 */


function isSupported() {
  var mediaSource = window.MediaSource || window.WebKitMediaSource;
  var sourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer; // 解码

  var isTypeSupported = mediaSource && typeof mediaSource.isTypeSupported === 'function' && mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'); // MSE

  var sourceBufferValidAPI = !sourceBuffer || sourceBuffer.prototype && typeof sourceBuffer.prototype.appendBuffer === 'function' && typeof sourceBuffer.prototype.remove === 'function'; // Loader

  var streaming = FetchLoader.isSupport() || XHR.isSupportChunk() === XHR_TYPE.MOZ_CHUNK;
  return isTypeSupported && sourceBufferValidAPI && streaming;
}
// CONCATENATED MODULE: ./src/utils/playback-rate-manager.ts
/*
 * @Author: gengxing
 * @Date: 2020-06-30 16:22:55
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-30 18:29:35
 */

/**
 * 播放速度控制
 */

var playback_rate_manager_PlaybackRateManager = /*#__PURE__*/function () {
  function PlaybackRateManager(media, config) {
    this.tag = 'PlaybackRateManager';
    this._media = void 0;
    this._config = void 0;
    this._interval = 0;
    this._timer = void 0;
    this._media = media;
    this._config = config;
  }
  /**
   * 启动自动倍速控制
   */


  var _proto = PlaybackRateManager.prototype;

  _proto.start = function start() {
    this._interval = this._interval || this._config.startDelay || this._config.interval || 5;

    this._tick();

    this._interval = this._config.interval || 1;
  }
  /**
   * 停止自动倍速控制
   */
  ;

  _proto.stop = function stop() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = 0;
    }
  };

  _proto.destroy = function destroy() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = 0;
    }
  };

  _proto._tick = function _tick() {
    var _this = this;

    if (!this._timer) {
      this._timer = setTimeout(function () {
        if (_this._media.video) {
          _this._nextPlayBackRate(_this._media.bufferedSec(), _this._media.video);
        }

        _this._timer = 0;

        _this._tick();
      }, this._interval * 1000);
    }
  }
  /**
   * 处理一次播放倍速计算
   * @param buffered 当前待播放的buffer长度，秒
   * @param video video
   */
  ;

  _proto._nextPlayBackRate = function _nextPlayBackRate(buffered, video) {
    var playbackRate = 1;
    var rule = this._config.rule;
    var i = 0;

    for (i = 0; i < rule.length; i++) {
      if (video.playbackRate >= rule[i].rate) {
        break;
      }
    }

    var downRule = i < rule.length - 1 ? rule[i + 1] : null;
    var upRule = i > 0 ? rule[i - 1] : null;
    playbackRate = rule[i].rate;

    if (upRule && buffered > upRule.lower) {
      playbackRate = upRule.rate;
    }

    if (downRule && buffered < downRule.upper) {
      playbackRate = downRule.rate;
    }

    if (video.playbackRate !== playbackRate) {
      log["Log"].i(this.tag, "auto change playback rate from " + video.playbackRate + " to " + playbackRate);
      video.playbackRate = playbackRate;
    }
  };

  return PlaybackRateManager;
}();

/* harmony default export */ var playback_rate_manager = (playback_rate_manager_PlaybackRateManager);
// CONCATENATED MODULE: ./src/index.ts
function src_extends() { src_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return src_extends.apply(this, arguments); }

function src_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function src_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function src_createClass(Constructor, protoProps, staticProps) { if (protoProps) src_defineProperties(Constructor.prototype, protoProps); if (staticProps) src_defineProperties(Constructor, staticProps); return Constructor; }

function src_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:42:49 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-30 16:32:42
 */











 // 循环计时器间隔，毫秒

var MAIN_TIMER_INTERVAL = 200;
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

var src_Las = /*#__PURE__*/function (_EventEmitter) {
  src_inheritsLoose(Las, _EventEmitter);

  /**
   * 浏览器是否支持las.js
   */
  Las.isSupport = function isSupport() {
    return isSupported();
  }
  /**
   * las.js当前版本
   */
  ;

  src_createClass(Las, null, [{
    key: "version",
    get: function get() {
      return "1.0.5";
    }
    /**
     * las.js的事件列表
     */

  }, {
    key: "Events",
    get: function get() {
      return core_events["default"];
    }
    /**
     * las.js的错误类型列表
     */

  }, {
    key: "ErrorTypes",
    get: function get() {
      return errors["ErrorTypes"];
    }
    /**
     * las.js的错误详情列表
     */

  }, {
    key: "ErrorDetails",
    get: function get() {
      return errors["ErrorDetails"];
    }
    /**
     * 构造函数
     * @param config LasConfig
     */

  }]);

  function Las(config) {
    var _this;

    _this = _EventEmitter.call(this) || this;
    _this.tag = 'las';
    _this._config = void 0;
    _this._src = void 0;
    _this._video = void 0;
    _this._mse = void 0;
    _this._lasMain = void 0;
    _this._stat = STAT.INIT;
    _this._audioCodecSwap = false;
    _this._error = void 0;
    _this._audioCodec = '';
    _this._recoverMediaErrorTime = 0;
    _this._mainTimer = void 0;
    _this._media = void 0;
    _this._nextLevel = [];
    _this._mediaInfo = void 0;
    _this._loadStopped = false;
    _this._seekOnUpdateEnd = false;
    _this._playingLevel = void 0;
    _this._startLevel = void 0;
    _this._monitor = void 0;
    _this._playbackRateManager = void 0;

    _this._onVideoLoadeddata = function () {
      log["Log"].i(_this.tag, 'loadeddata');

      _this._monitor.onLoadeddata();
    };

    _this._onVideoCanplay = function () {
      log["Log"].v(_this.tag, "canplay " + !!_this._stat);

      _this._monitor.onCanplay();

      if (_this._video && _this._stat !== STAT.NONE) {
        _this._stat = STAT.NONE;

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

    _this._onVideoEnded = function () {
      _this._monitor.onEnd();

      if (_this._mse) {
        _this._mse.flush();
      }
    };

    _this._onVideoError = function (error) {
      log["Log"].e(_this.tag, 'video error', error);

      if (_this._error) {
        return;
      }

      if (_this._config.autoRecoverMedia) {
        var now = performance.now(); // 尝试切换remux方式

        if ((!_this._recoverMediaErrorTime || now - _this._recoverMediaErrorTime > 3000) && _this._recoverSwapRemuxType()) {
          _this._recoverMediaErrorTime = now;
          return;
        } // 尝试替换audio codec string


        if (_this._recoverSwapAudioCodec()) {
          return;
        }
      }

      var reason = 'video error';

      if (_this._video && _this._video.error) {
        reason += " code:" + _this._video.error.code + " message:" + _this._video.error.message;
      }

      _this._onError({
        type: errors["ErrorTypes"].MEDIA_ERROR,
        details: errors["ErrorDetails"].VIDEO_ERROR,
        fatal: true,
        info: {
          reason: reason
        }
      });
    };

    _this._resetMSE = function () {
      _this._seekOnUpdateEnd = false;

      if (_this._video) {
        log["Log"].i(_this.tag, 'rebuild mse');
        URL.revokeObjectURL(_this._video.src);
        _this._video.src = '';

        _this._video.removeAttribute('src');

        _this._destroyMSE();

        _this._initMSE();
      }
    };

    _this._mainLoop = function () {
      var EPS = 1e-3;
      var video = _this._video;

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
          jumpTo = jumpTo + (browser_helper["default"].isSafari ? 0.3 : EPS);

          _this._internalSeek(jumpTo);

          log["Log"].i(_this.tag, "jump to " + jumpTo);
        }
      }

      if (_this._nextLevel.length) {
        _this._checkLevelChange();
      }
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
          info: {
            reason: 'config data error'
          }
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
          info: {
            reason: 'unsupported'
          }
        });
      }, 0);
      return src_assertThisInitialized(_this);
    }

    _this._mainTimer = null;
    _this._stat = STAT.INIT;

    _this._startMainTimer();

    _this._initMonitor();

    if (_this._config.autoPlaybackRateConf) {
      _this._playbackRateManager = new playback_rate_manager(_this._media, _this._config.autoPlaybackRateConf);
    }

    log["Log"].i(_this.tag, Las.version, _this._config);
    return _this;
  }
  /**
   * 绑定HTMLVideoElement
   * @param video HTMLVideoElement
   */


  var _proto = Las.prototype;

  _proto.attachMedia = function attachMedia(video) {
    this._video = video;

    this._media.attachVideo(this._video);

    this._initMSE();

    this._bindVideoEvents();
  }
  /**
   * 开始加载视频
   * @param src src
   */
  ;

  _proto.load = function load(src) {
    if (src === void 0) {
      src = undefined;
    }

    if (!this._video) {
      this._onError({
        type: errors["ErrorTypes"].OTHER_ERROR,
        details: errors["ErrorDetails"].NO_VIDEO,
        fatal: true,
        info: {
          reason: 'no video attached'
        }
      });
    }

    this._playingLevel = undefined;

    this._monitor.reset();

    if (src) {
      this._src = src;
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
   * 回收资源
   */
  ;

  _proto.destroy = function destroy() {
    if (this._playbackRateManager) {
      this._playbackRateManager.destroy();
    }

    this._stopMonitor();

    this._stopMainTimer();

    this._unbindVideoEvents();

    this._stopVideo();

    this.removeAllListeners();
  }
  /**
   * 重新拉流
   */
  ;

  _proto.refresh = function refresh(reuseMSE) {
    if (reuseMSE === void 0) {
      reuseMSE = false;
    }

    log["Log"].i(this.tag, 'call refresh');

    if (this._config.autoRecoverMedia || !(this._error === errors["ErrorDetails"].VIDEO_ERROR && (this._recoverSwapRemuxType() || this._recoverSwapAudioCodec()))) {
      this._reload(reuseMSE);
    }

    this._error = undefined;
  }
  /**
   * 停止加载，内核停止，用于直播停止
   */
  ;

  _proto.stopLoad = function stopLoad() {
    log["Log"].i(this.tag, 'call stopLoad');

    if (this._lasMain) {
      this._destroyLasMain();

      this._mse.endOfData();

      this._loadStopped = true;

      this._monitor.onStopLoad();
    }

    if (this._playbackRateManager) {
      this._playbackRateManager.stop();
    }
  }
  /**
   * 获取视频信息
   */
  ;

  _proto.getMediaInfo = function getMediaInfo() {
    return src_extends({}, this._mediaInfo);
  }
  /**
   * 自动码率是否开启
   */
  ;

  _proto._reload = function _reload(reuseMSE) {
    if (reuseMSE === void 0) {
      reuseMSE = false;
    }

    if (this._lasMain && this._mse || this._error) {
      if (this._lasMain) {
        this._startLevel = this._lasMain.currentLevel;
      }

      this._nextLevel = [];

      if (reuseMSE && this._mse) {
        this._mse.flush();

        this._internalSeek(0);

        this._seekOnUpdateEnd = true;
      } else {
        this._stopVideo();

        this._initMSE();
      }

      this._destroyLasMain();

      this._initLasMain();

      if (this._lasMain) {
        this._lasMain.load();
      }
    } else {
      log["Log"].v(this.tag, 'transmuxer & mediaSource not ready');
    }
  }
  /**
   * 绑定video事件
   */
  ;

  _proto._bindVideoEvents = function _bindVideoEvents() {
    if (this._video) {
      this._video.addEventListener('loadeddata', this._onVideoLoadeddata);

      this._video.addEventListener('canplay', this._onVideoCanplay);

      this._video.addEventListener('waiting', this._onVideoWaiting);

      this._video.addEventListener('playing', this._onVideoPlaying);

      this._video.addEventListener('ended', this._onVideoEnded);

      this._video.addEventListener('error', this._onVideoError);
    }
  }
  /**
   * 取消video绑定事件
   */
  ;

  _proto._unbindVideoEvents = function _unbindVideoEvents() {
    if (this._video) {
      this._video.removeEventListener('loadeddata', this._onVideoLoadeddata);

      this._video.removeEventListener('canplay', this._onVideoCanplay);

      this._video.removeEventListener('waiting', this._onVideoWaiting);

      this._video.removeEventListener('playing', this._onVideoPlaying);

      this._video.removeEventListener('ended', this._onVideoEnded);

      this._video.removeEventListener('error', this._onVideoError);
    }
  }
  /**
   * 处理HTMLVideoElelment事件-loadeddata
   */
  ;

  /**
   * 初始化MSE
   * @param video HTMLVideoElement
   */
  _proto._initMSE = function _initMSE() {
    var _this2 = this;

    if (!this._video) {
      return;
    }

    var video = this._video;
    this._mse = new mse_MSE(this._config);

    this._mse.attach(video);

    this._media.attachMSE(this._mse);

    this._mse.on(core_events["default"].ERROR, function (data) {
      _this2._onError(data);
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
   * 销毁MSE
   */
  ;

  _proto._destroyMSE = function _destroyMSE() {
    if (this._mse) {
      this._mse.removeAllListeners();

      this._mse.destroy();
    }
  }
  /**
   * 开始加载视频
   */
  ;

  _proto._load = function _load() {
    this._loadStopped = false;
    this._error = undefined;
    this._stat = STAT.INIT;
    this._nextLevel = [];

    this._media.reset();

    this._monitor.onLoad();

    if (this._lasMain) {
      this._destroyLasMain();
    }

    if (this._mse.hasSourceBuffer() || this._video && this._video.error) {
      this._resetMSE();
    }

    this._initLasMain();

    if (this._lasMain) {
      this._lasMain.load();
    }

    if (this._config.autoPlaybackRate && this._playbackRateManager) {
      this._playbackRateManager.start();
    }
  }
  /**
   * 重置MSE，清空video.src，重新绑定一个新的MSE
   */
  ;

  _proto._verifyLevel = function _verifyLevel(value) {
    return !!(this._lasMain && this._lasMain.levels.length > 0 && value < this._lasMain.levels.length && value >= -1 && this._video && !this._video.ended);
  }
  /**
   * 初始化LasMain
   */
  ;

  _proto._initLasMain = function _initLasMain() {
    this._lasMain = new las_main_LasMain(this._config, this._media);

    this._bindLasMainEvent(this._lasMain);

    this._lasMain.init(this._src, this._audioCodec);
  }
  /**
   * 销毁LasMain
   */
  ;

  _proto._destroyLasMain = function _destroyLasMain() {
    if (this._lasMain) {
      this._lasMain.removeAllListeners();

      this._lasMain.destroy();

      this._lasMain = undefined;
    }
  }
  /**
   * 绑定lasMain事件
   */
  ;

  _proto._bindLasMainEvent = function _bindLasMainEvent(lasMain) {
    var _this3 = this;

    var mse = this._mse;
    lasMain.on(core_events["default"].MP4_SEGMENT, function (data) {
      if (mse) {
        mse.mediaSegment(data.segments);
      }

      if (_this3._monitor) {
        _this3._monitor.onSegment(data);
      }
    });
    lasMain.on(core_events["default"].MEDIA_INFO, function (data) {
      var mediaInfo = src_extends({}, data);

      _this3._monitor.onSegmentInit(mediaInfo);

      _this3.emit(core_events["default"].MEDIA_INFO, mediaInfo);

      _this3._mediaInfo = mediaInfo;
      _this3._audioCodec = data.defaultAudioCodec || data.audioCodec;

      if (mse) {
        mse.mediaInit(mediaInfo);
      }
    });
    lasMain.on(core_events["default"].ERROR, function (data) {
      _this3._onError(data);
    });
    lasMain.on(core_events["default"].LOAD_END, function () {
      if (mse) {
        mse.endOfData();
      }

      _this3.emit(core_events["default"].LOAD_END);
    });
    lasMain.on(core_events["default"].LEVEL_SWITCH_FAILED, function (data) {
      _this3.emit(core_events["default"].LEVEL_SWITCH_FAILED, data);
    });
    lasMain.on(core_events["default"].LEVEL_SWITCHING, function (data) {
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
    lasMain.on(core_events["default"].SCRIPT_PARSED, function (data) {
      _this3.emit(core_events["default"].SCRIPT_PARSED, data);
    });
    lasMain.on(core_events["default"].MANIFEST_PARSED, function (data) {
      if (typeof _this3._playingLevel === 'number') {
        lasMain.currentLevel = _this3._playingLevel;
        return;
      }

      if (typeof _this3._startLevel === 'number') {
        lasMain.currentLevel = _this3._startLevel;
      }

      data = src_extends({
        levels: _this3.levels.slice(0),
        currentLevel: _this3.currentLevel
      }, data);
      _this3._playingLevel = lasMain.currentLevel;
      log["Log"].i(_this3.tag, core_events["default"].MANIFEST_PARSED, data);

      _this3.emit(core_events["default"].MANIFEST_PARSED, data);
    });
    lasMain.on(core_events["default"].REPORT, function (data) {
      if (_this3._monitor) {
        _this3._monitor.onReport(data);
      }
    });
  }
  /**
   * 内部seek
   * @param time 时间
   */
  ;

  _proto._internalSeek = function _internalSeek(time) {
    if (this._video) {
      this._video.currentTime = time;
    }
  }
  /**
   * 主循环
   * 用于处理buffer空隙和清晰度切换轮询检测
   */
  ;

  /**
   * 错误处理
   * @param data 错误数据
   */
  _proto._onError = function _onError(data) {
    log["Log"].i(this.tag, "on error " + JSON.stringify(data));

    if (!data.info.url && this.levels && this.levels[this.currentLevel]) {
      data.info.url = this.levels[this.currentLevel].url;
    }

    if (data.fatal) {
      this.stopLoad();

      this._stopMainTimer();

      if (data.details === errors["ErrorDetails"].VIDEO_ERROR || this._video && this._video.error) {
        this._destroyMSE();
      }

      if (!this._error) {
        this._error = data.details;
        this.emit(core_events["default"].ERROR, data);
      }
    }
  }
  /**
   * 开始主循环计时器
   */
  ;

  _proto._startMainTimer = function _startMainTimer() {
    if (this._mainTimer === null) {
      this._mainTimer = setInterval(this._mainLoop, MAIN_TIMER_INTERVAL);
    }
  }
  /**
   * 停止主循环计时器
   */
  ;

  _proto._stopMainTimer = function _stopMainTimer() {
    if (this._mainTimer) {
      clearInterval(this._mainTimer);
      this._mainTimer = null;
    }
  }
  /**
   * 处理清晰度切换是否完成
   */
  ;

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

      this._destroyLasMain();

      this._destroyMSE();
    }
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
   * 解码错误时尝试更换remux方式
   */
  ;

  _proto._recoverSwapRemuxType = function _recoverSwapRemuxType() {
    var gopRemux = this._config.gopRemux;
    this._config.gopRemux = true;

    if (gopRemux === this._config.gopRemux) {
      return false;
    } else {
      log["Log"].i(this.tag, 'recover swap remux type');

      this._reload();

      return true;
    }
  }
  /**
   * 解码错误时尝试更换audio codec string
   */
  ;

  _proto._recoverSwapAudioCodec = function _recoverSwapAudioCodec() {
    if (!this._audioCodecSwap && this._audioCodec) {
      if (this._audioCodec.indexOf('mp4a.40.5') !== -1) {
        this._audioCodec = 'mp4a.40.2';
      } else {
        this._audioCodec = 'mp4a.40.5';
      }

      this._audioCodecSwap = true;
      log["Log"].i(this.tag, 'recover swap audio codec');

      this._reload();

      return true;
    } else {
      return false;
    }
  };

  src_createClass(Las, [{
    key: "autoLevelEnabled",
    get: function get() {
      if (this._lasMain) {
        return this._lasMain.autoLevelEnabled;
      }

      return false;
    }
    /**
     * 可用流列表
     */

  }, {
    key: "levels",
    get: function get() {
      if (this._lasMain) {
        this._lasMain.levels.slice(0);
      }

      return [];
    }
    /**
     * 下一个下载的流index
     */

  }, {
    key: "nextLevel",
    get: function get() {
      if (this._lasMain) {
        return this._lasMain.nextLevel;
      }

      return 0;
    }
    /**
     * 在下一个关键帧位置切换流
     * 设置-1会启用自动码率
     */
    ,
    set: function set(value) {
      if (!this._verifyLevel(value) || !this._lasMain) {
        this.emit(core_events["default"].LEVEL_SWITCH_FAILED, {
          level: value
        });
        return;
      }

      this._lasMain.nextLevel = value;
    }
    /**
     * get: 当前正在下载的流index
     */

  }, {
    key: "currentLevel",
    get: function get() {
      if (this._lasMain) {
        return this._lasMain.currentLevel;
      }

      return 0;
    }
    /**
     * 立即切换码率，会清空buffer并从当前播放位置所在切片开始下载新的流
     * 设置-1会启用自动码率
     */
    ,
    set: function set(value) {
      if (!this._verifyLevel(value) || !this._lasMain) {
        this.emit(core_events["default"].LEVEL_SWITCH_FAILED, {
          level: value
        });
        return;
      }

      if (value === -1) {
        this._lasMain.nextLevel = value;
      } else {
        this._stat = STAT.SELECT_BITRATE;
        this._seekOnUpdateEnd = true;

        if (this._mse) {
          this._mse.flush();
        }

        this._lasMain.currentLevel = value;
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

/***/ "./src/types/flv-object.ts":
/*!*********************************!*\
  !*** ./src/types/flv-object.ts ***!
  \*********************************/
/*! exports provided: FlvTagType, FlvSize, FlvTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlvTagType", function() { return FlvTagType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlvSize", function() { return FlvSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlvTag", function() { return FlvTag; });
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:46:33 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:46:33 
 * flv格式相关定义
 */

/**
 * flv tag类型
 */
var FlvTagType;
/**
 * flv主要字段长度定义
 */

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
/**
 * flv tag定义
 */

var FlvTag = function FlvTag() {
  this.tagType = FlvTagType.VIDEO;
  this.dataSize = 0;
  this.timestamp = 0;
  this.size = 0;
  this.cts = 0;
  this.frameType = 0;
  this.codecId = 0;
  this.body = null;
};

/***/ }),

/***/ "./src/utils/browser-helper.ts":
/*!*************************************!*\
  !*** ./src/utils/browser-helper.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:44:00 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 16:16:15
 * 浏览器ua解析，用于浏览器兼容性处理
 */

/**
 * 浏览器类型检测，用于处理浏览器兼容性问题
 */
var BrowserHelper = function () {
  var vendor = navigator.vendor;
  var userAgent = navigator.userAgent;
  return {
    isSafari: !!(vendor && vendor.indexOf('Apple') > -1 && userAgent && !userAgent.match('CriOS')),
    isFirefox: /firefox/i.test(userAgent),
    isAndroid: /android/i.test(userAgent)
  };
}();

/* harmony default export */ __webpack_exports__["default"] = (BrowserHelper);

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
/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:45:39 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:45:39 
 * log工具
 */
var GLOBAL_TAG = 'las.js-';
var FORCE_GLOBAL_TAG = true;
/**
 * 处理log参数
 * @param tag tag
 * @param msg msg
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
 * log信息输出
 */

(function (LOG_LEVEL) {
  LOG_LEVEL["LEVEL_ERROR"] = "e";
  LOG_LEVEL["LEVEL_WARN"] = "w";
  LOG_LEVEL["LEVEL_INFO"] = "i";
  LOG_LEVEL["LEVEL_DEBUG"] = "d";
  LOG_LEVEL["LEVEL_VERBOSE"] = "v";
})(LOG_LEVEL || (LOG_LEVEL = {}));

var Log = /*#__PURE__*/function () {
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