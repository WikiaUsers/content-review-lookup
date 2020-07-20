// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = (typeof Module !== 'undefined' ? Module : null) || {};

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  if (!Module['print']) Module['print'] = function print(x) {
    process['stdout'].write(x + '\n');
  };
  if (!Module['printErr']) Module['printErr'] = function printErr(x) {
    process['stderr'].write(x + '\n');
  };

  var nodeFS = require('fs');
  var nodePath = require('path');

  Module['read'] = function read(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };

  Module['readBinary'] = function readBinary(filename) { return Module['read'](filename, true) };

  Module['load'] = function load(f) {
    globalEval(read(f));
  };

  if (process['argv'].length > 1) {
    Module['thisProgram'] = process['argv'][1].replace(/\\/g, '/');
  } else {
    Module['thisProgram'] = 'unknown-program';
  }

  Module['arguments'] = process['argv'].slice(2);

  if (typeof module !== 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });
}
else if (ENVIRONMENT_IS_SHELL) {
  if (!Module['print']) Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm

  if (typeof read != 'undefined') {
    Module['read'] = read;
  } else {
    Module['read'] = function read() { throw 'no read() available (jsc?)' };
  }

  Module['readBinary'] = function readBinary(f) {
    if (typeof readbuffer === 'function') {
      return new Uint8Array(readbuffer(f));
    }
    var data = read(f, 'binary');
    assert(typeof data === 'object');
    return data;
  };

  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  this['Module'] = Module;

}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };

  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof console !== 'undefined') {
    if (!Module['print']) Module['print'] = function print(x) {
      console.log(x);
    };
    if (!Module['printErr']) Module['printErr'] = function printErr(x) {
      console.log(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    if (!Module['print']) Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }

  if (ENVIRONMENT_IS_WEB) {
    window['Module'] = Module;
  } else {
    Module['load'] = importScripts;
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}

function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
if (!Module['thisProgram']) {
  Module['thisProgram'] = './this.program';
}

// *** Environment setup code ***

// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];

// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];

// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}



// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in: 
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at: 
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

//========================================
// Runtime code shared with compiler
//========================================

var Runtime = {
  setTempRet0: function (value) {
    tempRet0 = value;
  },
  getTempRet0: function () {
    return tempRet0;
  },
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  STACK_ALIGN: 16,
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (!vararg && (type == 'i64' || type == 'double')) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      assert(args.length == sig.length-1);
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      assert(sig.length == 1);
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2*(1 + i);
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  getAsmConst: function (code, numArgs) {
    // code is a constant string on the heap, so we can cache these
    if (!Runtime.asmConstCache) Runtime.asmConstCache = {};
    var func = Runtime.asmConstCache[code];
    if (func) return func;
    var args = [];
    for (var i = 0; i < numArgs; i++) {
      args.push(String.fromCharCode(36) + i); // $0, $1 etc
    }
    var source = Pointer_stringify(code);
    if (source[0] === '"') {
      // tolerate EM_ASM("..code..") even though EM_ASM(..code..) is correct
      if (source.indexOf('"', 1) === source.length-1) {
        source = source.substr(1, source.length-2);
      } else {
        // something invalid happened, e.g. EM_ASM("..code($0)..", input)
        abort('invalid EM_ASM input |' + source + '|. Please use EM_ASM(..code..) (no quotes) or EM_ASM({ ..code($0).. }, input) (to input values)');
      }
    }
    try {
      // Module is the only 'upvar', which we provide directly. We also provide FS for legacy support.
      var evalled = eval('(function(Module, FS) { return function(' + args.join(',') + '){ ' + source + ' } })')(Module, typeof FS !== 'undefined' ? FS : null);
    } catch(e) {
      Module.printErr('error in executing inline EM_ASM code: ' + e + ' on: \n\n' + source + '\n\nwith args |' + args + '| (make sure to use the right one out of EM_ASM, EM_ASM_ARGS, etc.)');
      throw e;
    }
    return Runtime.asmConstCache[code] = evalled;
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[sig]) {
      Runtime.funcWrappers[sig] = {};
    }
    var sigCache = Runtime.funcWrappers[sig];
    if (!sigCache[func]) {
      sigCache[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return sigCache[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xFF;

      if (buffer.length == 0) {
        if ((code & 0x80) == 0x00) {        // 0xxxxxxx
          return String.fromCharCode(code);
        }
        buffer.push(code);
        if ((code & 0xE0) == 0xC0) {        // 110xxxxx
          needed = 1;
        } else if ((code & 0xF0) == 0xE0) { // 1110xxxx
          needed = 2;
        } else {                            // 11110xxx
          needed = 3;
        }
        return '';
      }

      if (needed) {
        buffer.push(code);
        needed--;
        if (needed > 0) return '';
      }

      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var c4 = buffer[3];
      var ret;
      if (buffer.length == 2) {
        ret = String.fromCharCode(((c1 & 0x1F) << 6)  | (c2 & 0x3F));
      } else if (buffer.length == 3) {
        ret = String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6)  | (c3 & 0x3F));
      } else {
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var codePoint = ((c1 & 0x07) << 18) | ((c2 & 0x3F) << 12) |
                        ((c3 & 0x3F) << 6)  | (c4 & 0x3F);
        ret = String.fromCharCode(
          (((codePoint - 0x10000) / 0x400)|0) + 0xD800,
          (codePoint - 0x10000) % 0x400 + 0xDC00);
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function processJSString(string) {
      /* TODO: use TextEncoder when present,
        var encoder = new TextEncoder();
        encoder['encoding'] = "utf-8";
        var utf8Array = encoder['encode'](aMsg.data);
      */
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  getCompilerSetting: function (name) {
    throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work';
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+15)&-16);(assert((((STACKTOP|0) < (STACK_MAX|0))|0))|0); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + (assert(!staticSealed),size))|0;STATICTOP = (((STATICTOP)+15)&-16); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + (assert(DYNAMICTOP > 0),size))|0;DYNAMICTOP = (((DYNAMICTOP)+15)&-16); if (DYNAMICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 16))*(quantum ? quantum : 16); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*4294967296.0)) : ((+((low>>>0)))+((+((high|0)))*4294967296.0))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}


Module['Runtime'] = Runtime;









//========================================
// Runtime essentials
//========================================

var __THREW__ = 0; // Used in checking for thrown exceptions.

var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;

var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;

function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

var globalScope = this;

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  if (!func) {
    try {
      func = eval('_' + ident); // explicit lookup
    } catch(e) {}
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}

var cwrap, ccall;
(function(){
  var stack = 0;
  var JSfuncs = {
    'stackSave' : function() {
      stack = Runtime.stackSave();
    },
    'stackRestore' : function() {
      Runtime.stackRestore(stack);
    },
    // type conversion from js to c
    'arrayToC' : function(arr) {
      var ret = Runtime.stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    },
    'stringToC' : function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        ret = Runtime.stackAlloc((str.length << 2) + 1);
        writeStringToMemory(str, ret);
      }
      return ret;
    }
  };
  // For fast lookup of conversion functions
  var toC = {'string' : JSfuncs['stringToC'], 'array' : JSfuncs['arrayToC']};

  // C calling interface. 
  ccall = function ccallFunc(ident, returnType, argTypes, args) {
    var func = getCFunc(ident);
    var cArgs = [];
    assert(returnType !== 'array', 'Return type should not be "array".');
    if (args) {
      for (var i = 0; i < args.length; i++) {
        var converter = toC[argTypes[i]];
        if (converter) {
          if (stack === 0) stack = Runtime.stackSave();
          cArgs[i] = converter(args[i]);
        } else {
          cArgs[i] = args[i];
        }
      }
    }
    var ret = func.apply(null, cArgs);
    if (returnType === 'string') ret = Pointer_stringify(ret);
    if (stack !== 0) JSfuncs['stackRestore']();
    return ret;
  }

  var sourceRegex = /^function\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;
  function parseJSFunc(jsfunc) {
    // Match the body and the return value of a javascript function source
    var parsed = jsfunc.toString().match(sourceRegex).slice(1);
    return {arguments : parsed[0], body : parsed[1], returnValue: parsed[2]}
  }
  var JSsource = {};
  for (var fun in JSfuncs) {
    if (JSfuncs.hasOwnProperty(fun)) {
      // Elements of toCsource are arrays of three items:
      // the code, and the return value
      JSsource[fun] = parseJSFunc(JSfuncs[fun]);
    }
  }

  
  cwrap = function cwrap(ident, returnType, argTypes) {
    argTypes = argTypes || [];
    var cfunc = getCFunc(ident);
    // When the function takes numbers and returns a number, we can just return
    // the original function
    var numericArgs = argTypes.every(function(type){ return type === 'number'});
    var numericRet = (returnType !== 'string');
    if ( numericRet && numericArgs) {
      return cfunc;
    }
    // Creation of the arguments list (["$1","$2",...,"$nargs"])
    var argNames = argTypes.map(function(x,i){return '$'+i});
    var funcstr = "(function(" + argNames.join(',') + ") {";
    var nargs = argTypes.length;
    if (!numericArgs) {
      // Generate the code needed to convert the arguments from javascript
      // values to pointers
      funcstr += JSsource['stackSave'].body + ';';
      for (var i = 0; i < nargs; i++) {
        var arg = argNames[i], type = argTypes[i];
        if (type === 'number') continue;
        var convertCode = JSsource[type + 'ToC']; // [code, return]
        funcstr += 'var ' + convertCode.arguments + ' = ' + arg + ';';
        funcstr += convertCode.body + ';';
        funcstr += arg + '=' + convertCode.returnValue + ';';
      }
    }

    // When the code is compressed, the name of cfunc is not literally 'cfunc' anymore
    var cfuncname = parseJSFunc(function(){return cfunc}).returnValue;
    // Call the function
    funcstr += 'var ret = ' + cfuncname + '(' + argNames.join(',') + ');';
    if (!numericRet) { // Return type can only by 'string' or 'number'
      // Convert the result to a string
      var strgfy = parseJSFunc(function(){return Pointer_stringify}).returnValue;
      funcstr += 'ret = ' + strgfy + '(ret);';
    }
    if (!numericArgs) {
      // If we had a stack, restore it
      funcstr += JSsource['stackRestore'].body + ';';
    }
    funcstr += 'return ret})';
    return eval(funcstr);
  };
})();
Module["cwrap"] = cwrap;
Module["ccall"] = ccall;


function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[((ptr)>>0)]=value; break;
      case 'i8': HEAP8[((ptr)>>0)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;


function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)>>0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    assert(type, 'Must know what type to store in allocate!');

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}
Module['allocate'] = allocate;

function Pointer_stringify(ptr, /* optional */ length) {
  if (length === 0 || !ptr) return '';
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    assert(ptr + i < TOTAL_MEMORY);
    t = HEAPU8[(((ptr)+(i))>>0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;

  var ret = '';

  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }

  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    assert(ptr + i < TOTAL_MEMORY);
    t = HEAPU8[(((ptr)+(i))>>0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;

function UTF16ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
    if (codeUnit == 0)
      return str;
    ++i;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
}
Module['UTF16ToString'] = UTF16ToString;


function stringToUTF16(str, outPtr) {
  for(var i = 0; i < str.length; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[(((outPtr)+(i*2))>>1)]=codeUnit;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[(((outPtr)+(str.length*2))>>1)]=0;
}
Module['stringToUTF16'] = stringToUTF16;


function UTF32ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}
Module['UTF32ToString'] = UTF32ToString;


function stringToUTF32(str, outPtr) {
  var iChar = 0;
  for(var iCodeUnit = 0; iCodeUnit < str.length; ++iCodeUnit) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    var codeUnit = str.charCodeAt(iCodeUnit); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++iCodeUnit);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[(((outPtr)+(iChar*4))>>2)]=codeUnit;
    ++iChar;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[(((outPtr)+(iChar*4))>>2)]=0;
}
Module['stringToUTF32'] = stringToUTF32;

function demangle(func) {
  var hasLibcxxabi = !!Module['___cxa_demangle'];
  if (hasLibcxxabi) {
    try {
      var buf = _malloc(func.length);
      writeStringToMemory(func.substr(1), buf);
      var status = _malloc(4);
      var ret = Module['___cxa_demangle'](buf, 0, 0, status);
      if (getValue(status, 'i32') === 0 && ret) {
        return Pointer_stringify(ret);
      }
      // otherwise, libcxxabi failed, we can try ours which may return a partial result
    } catch(e) {
      // failure when using libcxxabi, we can try ours which may return a partial result
    } finally {
      if (buf) _free(buf);
      if (status) _free(status);
      if (ret) _free(ret);
    }
  }
  var i = 3;
  // params, etc.
  var basicTypes = {
    'v': 'void',
    'b': 'bool',
    'c': 'char',
    's': 'short',
    'i': 'int',
    'l': 'long',
    'f': 'float',
    'd': 'double',
    'w': 'wchar_t',
    'a': 'signed char',
    'h': 'unsigned char',
    't': 'unsigned short',
    'j': 'unsigned int',
    'm': 'unsigned long',
    'x': 'long long',
    'y': 'unsigned long long',
    'z': '...'
  };
  var subs = [];
  var first = true;
  function dump(x) {
    //return;
    if (x) Module.print(x);
    Module.print(func);
    var pre = '';
    for (var a = 0; a < i; a++) pre += ' ';
    Module.print (pre + '^');
  }
  function parseNested() {
    i++;
    if (func[i] === 'K') i++; // ignore const
    var parts = [];
    while (func[i] !== 'E') {
      if (func[i] === 'S') { // substitution
        i++;
        var next = func.indexOf('_', i);
        var num = func.substring(i, next) || 0;
        parts.push(subs[num] || '?');
        i = next+1;
        continue;
      }
      if (func[i] === 'C') { // constructor
        parts.push(parts[parts.length-1]);
        i += 2;
        continue;
      }
      var size = parseInt(func.substr(i));
      var pre = size.toString().length;
      if (!size || !pre) { i--; break; } // counter i++ below us
      var curr = func.substr(i + pre, size);
      parts.push(curr);
      subs.push(curr);
      i += pre + size;
    }
    i++; // skip E
    return parts;
  }
  function parse(rawList, limit, allowVoid) { // main parser
    limit = limit || Infinity;
    var ret = '', list = [];
    function flushList() {
      return '(' + list.join(', ') + ')';
    }
    var name;
    if (func[i] === 'N') {
      // namespaced N-E
      name = parseNested().join('::');
      limit--;
      if (limit === 0) return rawList ? [name] : name;
    } else {
      // not namespaced
      if (func[i] === 'K' || (first && func[i] === 'L')) i++; // ignore const and first 'L'
      var size = parseInt(func.substr(i));
      if (size) {
        var pre = size.toString().length;
        name = func.substr(i + pre, size);
        i += pre + size;
      }
    }
    first = false;
    if (func[i] === 'I') {
      i++;
      var iList = parse(true);
      var iRet = parse(true, 1, true);
      ret += iRet[0] + ' ' + name + '<' + iList.join(', ') + '>';
    } else {
      ret = name;
    }
    paramLoop: while (i < func.length && limit-- > 0) {
      //dump('paramLoop');
      var c = func[i++];
      if (c in basicTypes) {
        list.push(basicTypes[c]);
      } else {
        switch (c) {
          case 'P': list.push(parse(true, 1, true)[0] + '*'); break; // pointer
          case 'R': list.push(parse(true, 1, true)[0] + '&'); break; // reference
          case 'L': { // literal
            i++; // skip basic type
            var end = func.indexOf('E', i);
            var size = end - i;
            list.push(func.substr(i, size));
            i += size + 2; // size + 'EE'
            break;
          }
          case 'A': { // array
            var size = parseInt(func.substr(i));
            i += size.toString().length;
            if (func[i] !== '_') throw '?';
            i++; // skip _
            list.push(parse(true, 1, true)[0] + ' [' + size + ']');
            break;
          }
          case 'E': break paramLoop;
          default: ret += '?' + c; break paramLoop;
        }
      }
    }
    if (!allowVoid && list.length === 1 && list[0] === 'void') list = []; // avoid (void)
    if (rawList) {
      if (ret) {
        list.push(ret + '?');
      }
      return list;
    } else {
      return ret + flushList();
    }
  }
  var final = func;
  try {
    // Special-case the entry point, since its name differs from other name mangling.
    if (func == 'Object._main' || func == '_main') {
      return 'main()';
    }
    if (typeof func === 'number') func = Pointer_stringify(func);
    if (func[0] !== '_') return func;
    if (func[1] !== '_') return func; // C function
    if (func[2] !== 'Z') return func;
    switch (func[3]) {
      case 'n': return 'operator new()';
      case 'd': return 'operator delete()';
    }
    final = parse();
  } catch(e) {
    final += '?';
  }
  if (final.indexOf('?') >= 0 && !hasLibcxxabi) {
    Runtime.warnOnce('warning: a problem occurred in builtin C++ name demangling; build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
  }
  return final;
}

function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function(x) { var y = demangle(x); return x === y ? x : (x + ' [' + y + ']') });
}

function jsStackTrace() {
  var err = new Error();
  if (!err.stack) {
    // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
    // so try that as a special-case.
    try {
      throw new Error(0);
    } catch(e) {
      err = e;
    }
    if (!err.stack) {
      return '(no stack trace available)';
    }
  }
  return err.stack.toString();
}

function stackTrace() {
  return demangleAll(jsStackTrace());
}
Module['stackTrace'] = stackTrace;

// Memory management

var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return (x+4095)&-4096;
}

var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk

function enlargeMemory() {
  abort('Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value ' + TOTAL_MEMORY + ', (2) compile with ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.');
}


var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;

var totalMemory = 64*1024;
while (totalMemory < TOTAL_MEMORY || totalMemory < 2*TOTAL_STACK) {
  if (totalMemory < 16*1024*1024) {
    totalMemory *= 2;
  } else {
    totalMemory += 16*1024*1024
  }
}
if (totalMemory !== TOTAL_MEMORY) {
  Module.printErr('increasing TOTAL_MEMORY to ' + totalMemory + ' to be compliant with the asm.js spec');
  TOTAL_MEMORY = totalMemory;
}

// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'JS engine does not provide full typed array support');

var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);

// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');

Module['HEAP'] = HEAP;
Module['buffer'] = buffer;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited

var runtimeInitialized = false;
var runtimeExited = false;

function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
  runtimeExited = true;
}

function postRun() {
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module['addOnPreRun'] = Module.addOnPreRun = addOnPreRun;

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module['addOnInit'] = Module.addOnInit = addOnInit;

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module['addOnPreMain'] = Module.addOnPreMain = addOnPreMain;

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module['addOnExit'] = Module.addOnExit = addOnExit;

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module['addOnPostRun'] = Module.addOnPostRun = addOnPostRun;

// Tools


function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;

function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))>>0)]=chr;
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;

function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))>>0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; i++) {
    assert(str.charCodeAt(i) === str.charCodeAt(i)&0xff);
    HEAP8[(((buffer)+(i))>>0)]=str.charCodeAt(i);
  }
  if (!dontAddNull) HEAP8[(((buffer)+(str.length))>>0)]=0;
}
Module['writeAsciiToMemory'] = writeAsciiToMemory;

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}

// check for imul support, and also for correctness ( https://bugs.webkit.org/show_bug.cgi?id=126345 )
if (!Math['imul'] || Math['imul'](0xffffffff, 5) !== -5) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];


var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            Module.printErr('still waiting on run dependencies:');
          }
          Module.printErr('dependency: ' + dep);
        }
        if (shown) {
          Module.printErr('(end of list)');
        }
      }, 10000);
    }
  } else {
    Module.printErr('warning: run dependency added without ID');
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    Module.printErr('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module['removeRunDependency'] = removeRunDependency;

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data


var memoryInitializer = null;

// === Body ===





STATIC_BASE = 8;

STATICTOP = STATIC_BASE + 7200;
  /* global initializers */ __ATINIT__.push();
  

/* memory initializer */ allocate([0,0,0,0,80,0,0,0,1,0,0,0,2,0,0,0,78,54,115,113,117,105,115,104,49,48,67,108,117,115,116,101,114,70,105,116,69,0,0,0,78,54,115,113,117,105,115,104,57,67,111,108,111,117,114,70,105,116,69,0,0,0,0,0,168,25,0,0,48,0,0,0,208,25,0,0,24,0,0,0,72,0,0,0,0,0,0,0,0,0,0,0,72,0,0,0,3,0,0,0,3,0,0,0,0,0,0,0,152,0,0,0,4,0,0,0,5,0,0,0,78,54,115,113,117,105,115,104,56,82,97,110,103,101,70,105,116,69,0,0,0,0,0,0,208,25,0,0,128,0,0,0,72,0,0,0,0,0,0,0,0,0,0,0,248,24,0,0,6,0,0,0,7,0,0,0,200,0,0,0,200,6,0,0,200,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,2,0,0,2,0,0,3,0,1,1,0,0,4,0,1,0,1,0,3,0,1,1,1,0,2,0,1,2,1,0,1,0,2,1,1,0,0,0,2,0,1,0,1,0,2,1,1,0,2,0,2,2,1,0,3,0,3,1,1,0,4,0,3,0,2,0,3,0,3,1,2,0,2,0,3,2,2,0,1,0,4,1,2,0,0,0,4,0,2,0,1,0,4,1,2,0,2,0,4,2,2,0,3,0,5,1,2,0,4,0,5,0,3,0,3,0,5,1,3,0,2,0,5,2,3,0,1,0,6,1,3,0,0,0,6,0,3,0,1,0,6,1,3,0,2,0,6,2,3,0,3,0,7,1,3,0,4,0,7,0,4,0,4,0,7,1,4,0,3,0,7,2,4,0,2,1,7,1,4,0,1,1,7,0,4,0,0,0,8,0,4,0,1,0,8,1,4,0,2,2,7,1,4,0,3,2,7,0,4,0,4,0,9,0,5,0,3,0,9,1,5,0,2,3,7,1,5,0,1,3,7,0,5,0,0,0,10,0,5,0,1,0,10,1,5,0,2,0,10,2,5,0,3,0,11,1,5,0,4,0,11,0,6,0,3,0,11,1,6,0,2,0,11,2,6,0,1,0,12,1,6,0,0,0,12,0,6,0,1,0,12,1,6,0,2,0,12,2,6,0,3,0,13,1,6,0,4,0,13,0,7,0,3,0,13,1,7,0,2,0,13,2,7,0,1,0,14,1,7,0,0,0,14,0,7,0,1,0,14,1,7,0,2,0,14,2,7,0,3,0,15,1,7,0,4,0,15,0,8,0,4,0,15,1,8,0,3,0,15,2,8,0,2,1,15,1,8,0,1,1,15,0,8,0,0,0,16,0,8,0,1,0,16,1,8,0,2,2,15,1,8,0,3,2,15,0,8,0,4,0,17,0,9,0,3,0,17,1,9,0,2,3,15,1,9,0,1,3,15,0,9,0,0,0,18,0,9,0,1,0,18,1,9,0,2,0,18,2,9,0,3,0,19,1,9,0,4,0,19,0,10,0,3,0,19,1,10,0,2,0,19,2,10,0,1,0,20,1,10,0,0,0,20,0,10,0,1,0,20,1,10,0,2,0,20,2,10,0,3,0,21,1,10,0,4,0,21,0,11,0,3,0,21,1,11,0,2,0,21,2,11,0,1,0,22,1,11,0,0,0,22,0,11,0,1,0,22,1,11,0,2,0,22,2,11,0,3,0,23,1,11,0,4,0,23,0,12,0,4,0,23,1,12,0,3,0,23,2,12,0,2,1,23,1,12,0,1,1,23,0,12,0,0,0,24,0,12,0,1,0,24,1,12,0,2,2,23,1,12,0,3,2,23,0,12,0,4,0,25,0,13,0,3,0,25,1,13,0,2,3,23,1,13,0,1,3,23,0,13,0,0,0,26,0,13,0,1,0,26,1,13,0,2,0,26,2,13,0,3,0,27,1,13,0,4,0,27,0,14,0,3,0,27,1,14,0,2,0,27,2,14,0,1,0,28,1,14,0,0,0,28,0,14,0,1,0,28,1,14,0,2,0,28,2,14,0,3,0,29,1,14,0,4,0,29,0,15,0,3,0,29,1,15,0,2,0,29,2,15,0,1,0,30,1,15,0,0,0,30,0,15,0,1,0,30,1,15,0,2,0,30,2,15,0,3,0,31,1,15,0,4,0,31,0,16,0,4,0,31,1,16,0,3,0,31,2,16,0,2,1,31,1,16,0,1,1,31,0,16,0,0,4,28,0,16,0,1,4,28,1,16,0,2,2,31,1,16,0,3,2,31,0,16,0,4,4,29,0,17,0,3,4,29,1,17,0,2,3,31,1,17,0,1,3,31,0,17,0,0,4,30,0,17,0,1,4,30,1,17,0,2,4,30,2,17,0,3,4,31,1,17,0,4,4,31,0,18,0,3,4,31,1,18,0,2,4,31,2,18,0,1,5,31,1,18,0,0,5,31,0,18,0,1,5,31,1,18,0,2,5,31,2,18,0,3,6,31,1,18,0,4,6,31,0,19,0,3,6,31,1,19,0,2,6,31,2,19,0,1,7,31,1,19,0,0,7,31,0,19,0,1,7,31,1,19,0,2,7,31,2,19,0,3,8,31,1,19,0,4,8,31,0,20,0,4,8,31,1,20,0,3,8,31,2,20,0,2,9,31,1,20,0,1,9,31,0,20,0,0,12,28,0,20,0,1,12,28,1,20,0,2,10,31,1,20,0,3,10,31,0,20,0,4,12,29,0,21,0,3,12,29,1,21,0,2,11,31,1,21,0,1,11,31,0,21,0,0,12,30,0,21,0,1,12,30,1,21,0,2,12,30,2,21,0,3,12,31,1,21,0,4,12,31,0,22,0,3,12,31,1,22,0,2,12,31,2,22,0,1,13,31,1,22,0,0,13,31,0,22,0,1,13,31,1,22,0,2,13,31,2,22,0,3,14,31,1,22,0,4,14,31,0,23,0,3,14,31,1,23,0,2,14,31,2,23,0,1,15,31,1,23,0,0,15,31,0,23,0,1,15,31,1,23,0,2,15,31,2,23,0,3,16,31,1,23,0,4,16,31,0,24,0,4,16,31,1,24,0,3,16,31,2,24,0,2,17,31,1,24,0,1,17,31,0,24,0,0,20,28,0,24,0,1,20,28,1,24,0,2,18,31,1,24,0,3,18,31,0,24,0,4,20,29,0,25,0,3,20,29,1,25,0,2,19,31,1,25,0,1,19,31,0,25,0,0,20,30,0,25,0,1,20,30,1,25,0,2,20,30,2,25,0,3,20,31,1,25,0,4,20,31,0,26,0,3,20,31,1,26,0,2,20,31,2,26,0,1,21,31,1,26,0,0,21,31,0,26,0,1,21,31,1,26,0,2,21,31,2,26,0,3,22,31,1,26,0,4,22,31,0,27,0,3,22,31,1,27,0,2,22,31,2,27,0,1,23,31,1,27,0,0,23,31,0,27,0,1,23,31,1,27,0,2,23,31,2,27,0,3,24,31,1,27,0,4,24,31,0,28,0,4,24,31,1,28,0,3,24,31,2,28,0,2,25,31,1,28,0,1,25,31,0,28,0,0,28,28,0,28,0,1,28,28,1,28,0,2,26,31,1,28,0,3,26,31,0,28,0,4,28,29,0,29,0,3,28,29,1,29,0,2,27,31,1,29,0,1,27,31,0,29,0,0,28,30,0,29,0,1,28,30,1,29,0,2,28,30,2,29,0,3,28,31,1,29,0,4,28,31,0,30,0,3,28,31,1,30,0,2,28,31,2,30,0,1,29,31,1,30,0,0,29,31,0,30,0,1,29,31,1,30,0,2,29,31,2,30,0,3,30,31,1,30,0,4,30,31,0,31,0,3,30,31,1,31,0,2,30,31,2,31,0,1,31,31,1,31,0,0,31,31,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,2,0,1,0,1,0,1,0,2,1,1,0,0,0,2,0,1,0,1,0,3,1,1,0,2,0,3,0,2,0,1,0,4,1,2,0,0,0,4,0,2,0,1,0,5,1,2,0,2,0,5,0,3,0,1,0,6,1,3,0,0,0,6,0,3,0,1,0,7,1,3,0,2,0,7,0,4,0,1,0,8,1,4,0,0,0,8,0,4,0,1,0,9,1,4,0,2,0,9,0,5,0,1,0,10,1,5,0,0,0,10,0,5,0,1,0,11,1,5,0,2,0,11,0,6,0,1,0,12,1,6,0,0,0,12,0,6,0,1,0,13,1,6,0,2,0,13,0,7,0,1,0,14,1,7,0,0,0,14,0,7,0,1,0,15,1,7,0,2,0,15,0,8,0,1,0,16,1,8,0,0,0,16,0,8,0,1,0,17,1,8,0,2,0,17,0,9,0,1,0,18,1,9,0,0,0,18,0,9,0,1,0,19,1,9,0,2,0,19,0,10,0,1,0,20,1,10,0,0,0,20,0,10,0,1,0,21,1,10,0,2,0,21,0,11,0,1,0,22,1,11,0,0,0,22,0,11,0,1,0,23,1,11,0,2,0,23,0,12,0,1,0,24,1,12,0,0,0,24,0,12,0,1,0,25,1,12,0,2,0,25,0,13,0,1,0,26,1,13,0,0,0,26,0,13,0,1,0,27,1,13,0,2,0,27,0,14,0,1,0,28,1,14,0,0,0,28,0,14,0,1,0,29,1,14,0,2,0,29,0,15,0,1,0,30,1,15,0,0,0,30,0,15,0,1,0,31,1,15,0,2,0,31,0,16,0,2,1,31,1,16,0,1,1,31,0,16,0,0,0,32,0,16,0,1,2,31,0,16,0,2,0,33,0,17,0,1,3,31,0,17,0,0,0,34,0,17,0,1,4,31,0,17,0,2,0,35,0,18,0,1,5,31,0,18,0,0,0,36,0,18,0,1,6,31,0,18,0,2,0,37,0,19,0,1,7,31,0,19,0,0,0,38,0,19,0,1,8,31,0,19,0,2,0,39,0,20,0,1,9,31,0,20,0,0,0,40,0,20,0,1,10,31,0,20,0,2,0,41,0,21,0,1,11,31,0,21,0,0,0,42,0,21,0,1,12,31,0,21,0,2,0,43,0,22,0,1,13,31,0,22,0,0,0,44,0,22,0,1,14,31,0,22,0,2,0,45,0,23,0,1,15,31,0,23,0,0,0,46,0,23,0,1,0,47,1,23,0,2,0,47,0,24,0,1,0,48,1,24,0,0,0,48,0,24,0,1,0,49,1,24,0,2,0,49,0,25,0,1,0,50,1,25,0,0,0,50,0,25,0,1,0,51,1,25,0,2,0,51,0,26,0,1,0,52,1,26,0,0,0,52,0,26,0,1,0,53,1,26,0,2,0,53,0,27,0,1,0,54,1,27,0,0,0,54,0,27,0,1,0,55,1,27,0,2,0,55,0,28,0,1,0,56,1,28,0,0,0,56,0,28,0,1,0,57,1,28,0,2,0,57,0,29,0,1,0,58,1,29,0,0,0,58,0,29,0,1,0,59,1,29,0,2,0,59,0,30,0,1,0,60,1,30,0,0,0,60,0,30,0,1,0,61,1,30,0,2,0,61,0,31,0,1,0,62,1,31,0,0,0,62,0,31,0,1,0,63,1,31,0,2,0,63,0,32,0,2,1,63,1,32,0,1,1,63,0,32,0,0,16,48,0,32,0,1,2,63,0,32,0,2,16,49,0,33,0,1,3,63,0,33,0,0,16,50,0,33,0,1,4,63,0,33,0,2,16,51,0,34,0,1,5,63,0,34,0,0,16,52,0,34,0,1,6,63,0,34,0,2,16,53,0,35,0,1,7,63,0,35,0,0,16,54,0,35,0,1,8,63,0,35,0,2,16,55,0,36,0,1,9,63,0,36,0,0,16,56,0,36,0,1,10,63,0,36,0,2,16,57,0,37,0,1,11,63,0,37,0,0,16,58,0,37,0,1,12,63,0,37,0,2,16,59,0,38,0,1,13,63,0,38,0,0,16,60,0,38,0,1,14,63,0,38,0,2,16,61,0,39,0,1,15,63,0,39,0,0,16,62,0,39,0,1,16,63,1,39,0,2,16,63,0,40,0,1,17,63,1,40,0,0,17,63,0,40,0,1,18,63,1,40,0,2,18,63,0,41,0,1,19,63,1,41,0,0,19,63,0,41,0,1,20,63,1,41,0,2,20,63,0,42,0,1,21,63,1,42,0,0,21,63,0,42,0,1,22,63,1,42,0,2,22,63,0,43,0,1,23,63,1,43,0,0,23,63,0,43,0,1,24,63,1,43,0,2,24,63,0,44,0,1,25,63,1,44,0,0,25,63,0,44,0,1,26,63,1,44,0,2,26,63,0,45,0,1,27,63,1,45,0,0,27,63,0,45,0,1,28,63,1,45,0,2,28,63,0,46,0,1,29,63,1,46,0,0,29,63,0,46,0,1,30,63,1,46,0,2,30,63,0,47,0,1,31,63,1,47,0,0,31,63,0,47,0,1,32,63,1,47,0,2,32,63,0,48,0,2,33,63,1,48,0,1,33,63,0,48,0,0,48,48,0,48,0,1,34,63,0,48,0,2,48,49,0,49,0,1,35,63,0,49,0,0,48,50,0,49,0,1,36,63,0,49,0,2,48,51,0,50,0,1,37,63,0,50,0,0,48,52,0,50,0,1,38,63,0,50,0,2,48,53,0,51,0,1,39,63,0,51,0,0,48,54,0,51,0,1,40,63,0,51,0,2,48,55,0,52,0,1,41,63,0,52,0,0,48,56,0,52,0,1,42,63,0,52,0,2,48,57,0,53,0,1,43,63,0,53,0,0,48,58,0,53,0,1,44,63,0,53,0,2,48,59,0,54,0,1,45,63,0,54,0,0,48,60,0,54,0,1,46,63,0,54,0,2,48,61,0,55,0,1,47,63,0,55,0,0,48,62,0,55,0,1,48,63,1,55,0,2,48,63,0,56,0,1,49,63,1,56,0,0,49,63,0,56,0,1,50,63,1,56,0,2,50,63,0,57,0,1,51,63,1,57,0,0,51,63,0,57,0,1,52,63,1,57,0,2,52,63,0,58,0,1,53,63,1,58,0,0,53,63,0,58,0,1,54,63,1,58,0,2,54,63,0,59,0,1,55,63,1,59,0,0,55,63,0,59,0,1,56,63,1,59,0,2,56,63,0,60,0,1,57,63,1,60,0,0,57,63,0,60,0,1,58,63,1,60,0,2,58,63,0,61,0,1,59,63,1,61,0,0,59,63,0,61,0,1,60,63,1,61,0,2,60,63,0,62,0,1,61,63,1,62,0,0,61,63,0,62,0,1,62,63,1,62,0,2,62,63,0,63,0,1,63,63,1,63,0,0,63,63,0,216,12,0,0,216,18,0,0,216,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,2,0,1,0,0,0,3,0,1,1,0,0,4,0,2,1,1,0,3,0,2,0,1,0,2,0,2,1,1,0,1,0,3,1,1,0,0,0,3,0,1,0,1,1,2,1,1,0,2,1,2,0,1,0,3,0,4,0,1,0,4,0,5,1,2,0,3,0,5,0,2,0,2,0,5,1,2,0,1,0,6,1,2,0,0,0,6,0,2,0,1,2,3,1,2,0,2,2,3,0,2,0,3,0,7,0,2,0,4,1,6,1,3,0,3,1,6,0,3,0,2,0,8,0,3,0,1,0,9,1,3,0,0,0,9,0,3,0,1,0,9,1,3,0,2,0,10,1,3,0,3,0,10,0,3,0,4,2,7,1,4,0,4,2,7,0,4,0,3,0,11,0,4,0,2,1,10,1,4,0,1,1,10,0,4,0,0,0,12,0,4,0,1,0,13,1,4,0,2,0,13,0,4,0,3,0,13,1,4,0,4,0,14,1,5,0,3,0,14,0,5,0,2,2,11,1,5,0,1,2,11,0,5,0,0,0,15,0,5,0,1,1,14,1,5,0,2,1,14,0,5,0,3,0,16,0,5,0,4,0,17,1,6,0,3,0,17,0,6,0,2,0,17,1,6,0,1,0,18,1,6,0,0,0,18,0,6,0,1,2,15,1,6,0,2,2,15,0,6,0,3,0,19,0,6,0,4,1,18,1,7,0,3,1,18,0,7,0,2,0,20,0,7,0,1,0,21,1,7,0,0,0,21,0,7,0,1,0,21,1,7,0,2,0,22,1,7,0,3,0,22,0,7,0,4,2,19,1,8,0,4,2,19,0,8,0,3,0,23,0,8,0,2,1,22,1,8,0,1,1,22,0,8,0,0,0,24,0,8,0,1,0,25,1,8,0,2,0,25,0,8,0,3,0,25,1,8,0,4,0,26,1,9,0,3,0,26,0,9,0,2,2,23,1,9,0,1,2,23,0,9,0,0,0,27,0,9,0,1,1,26,1,9,0,2,1,26,0,9,0,3,0,28,0,9,0,4,0,29,1,10,0,3,0,29,0,10,0,2,0,29,1,10,0,1,0,30,1,10,0,0,0,30,0,10,0,1,2,27,1,10,0,2,2,27,0,10,0,3,0,31,0,10,0,4,1,30,1,11,0,3,1,30,0,11,0,2,4,24,0,11,0,1,1,31,1,11,0,0,1,31,0,11,0,1,1,31,1,11,0,2,2,30,1,11,0,3,2,30,0,11,0,4,2,31,1,12,0,4,2,31,0,12,0,3,4,27,0,12,0,2,3,30,1,12,0,1,3,30,0,12,0,0,4,28,0,12,0,1,3,31,1,12,0,2,3,31,0,12,0,3,3,31,1,12,0,4,4,30,1,13,0,3,4,30,0,13,0,2,6,27,1,13,0,1,6,27,0,13,0,0,4,31,0,13,0,1,5,30,1,13,0,2,5,30,0,13,0,3,8,24,0,13,0,4,5,31,1,14,0,3,5,31,0,14,0,2,5,31,1,14,0,1,6,30,1,14,0,0,6,30,0,14,0,1,6,31,1,14,0,2,6,31,0,14,0,3,8,27,0,14,0,4,7,30,1,15,0,3,7,30,0,15,0,2,8,28,0,15,0,1,7,31,1,15,0,0,7,31,0,15,0,1,7,31,1,15,0,2,8,30,1,15,0,3,8,30,0,15,0,4,10,27,1,16,0,4,10,27,0,16,0,3,8,31,0,16,0,2,9,30,1,16,0,1,9,30,0,16,0,0,12,24,0,16,0,1,9,31,1,16,0,2,9,31,0,16,0,3,9,31,1,16,0,4,10,30,1,17,0,3,10,30,0,17,0,2,10,31,1,17,0,1,10,31,0,17,0,0,12,27,0,17,0,1,11,30,1,17,0,2,11,30,0,17,0,3,12,28,0,17,0,4,11,31,1,18,0,3,11,31,0,18,0,2,11,31,1,18,0,1,12,30,1,18,0,0,12,30,0,18,0,1,14,27,1,18,0,2,14,27,0,18,0,3,12,31,0,18,0,4,13,30,1,19,0,3,13,30,0,19,0,2,16,24,0,19,0,1,13,31,1,19,0,0,13,31,0,19,0,1,13,31,1,19,0,2,14,30,1,19,0,3,14,30,0,19,0,4,14,31,1,20,0,4,14,31,0,20,0,3,16,27,0,20,0,2,15,30,1,20,0,1,15,30,0,20,0,0,16,28,0,20,0,1,15,31,1,20,0,2,15,31,0,20,0,3,15,31,1,20,0,4,16,30,1,21,0,3,16,30,0,21,0,2,18,27,1,21,0,1,18,27,0,21,0,0,16,31,0,21,0,1,17,30,1,21,0,2,17,30,0,21,0,3,20,24,0,21,0,4,17,31,1,22,0,3,17,31,0,22,0,2,17,31,1,22,0,1,18,30,1,22,0,0,18,30,0,22,0,1,18,31,1,22,0,2,18,31,0,22,0,3,20,27,0,22,0,4,19,30,1,23,0,3,19,30,0,23,0,2,20,28,0,23,0,1,19,31,1,23,0,0,19,31,0,23,0,1,19,31,1,23,0,2,20,30,1,23,0,3,20,30,0,23,0,4,22,27,1,24,0,4,22,27,0,24,0,3,20,31,0,24,0,2,21,30,1,24,0,1,21,30,0,24,0,0,24,24,0,24,0,1,21,31,1,24,0,2,21,31,0,24,0,3,21,31,1,24,0,4,22,30,1,25,0,3,22,30,0,25,0,2,22,31,1,25,0,1,22,31,0,25,0,0,24,27,0,25,0,1,23,30,1,25,0,2,23,30,0,25,0,3,24,28,0,25,0,4,23,31,1,26,0,3,23,31,0,26,0,2,23,31,1,26,0,1,24,30,1,26,0,0,24,30,0,26,0,1,26,27,1,26,0,2,26,27,0,26,0,3,24,31,0,26,0,4,25,30,1,27,0,3,25,30,0,27,0,2,28,24,0,27,0,1,25,31,1,27,0,0,25,31,0,27,0,1,25,31,1,27,0,2,26,30,1,27,0,3,26,30,0,27,0,4,26,31,1,28,0,4,26,31,0,28,0,3,28,27,0,28,0,2,27,30,1,28,0,1,27,30,0,28,0,0,28,28,0,28,0,1,27,31,1,28,0,2,27,31,0,28,0,3,27,31,1,28,0,4,28,30,1,29,0,3,28,30,0,29,0,2,30,27,1,29,0,1,30,27,0,29,0,0,28,31,0,29,0,1,29,30,1,29,0,2,29,30,0,29,0,3,29,30,1,29,0,4,29,31,1,30,0,3,29,31,0,30,0,2,29,31,1,30,0,1,30,30,1,30,0,0,30,30,0,30,0,1,30,31,1,30,0,2,30,31,0,30,0,3,30,31,1,30,0,4,31,30,1,31,0,3,31,30,0,31,0,2,31,30,1,31,0,1,31,31,1,31,0,0,31,31,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,2,0,2,0,1,0,1,0,3,1,1,0,0,0,3,0,1,0,1,0,4,0,1,0,2,0,5,0,2,0,1,0,6,1,2,0,0,0,6,0,2,0,1,0,7,0,2,0,2,0,8,0,3,0,1,0,9,1,3,0,0,0,9,0,3,0,1,0,10,0,3,0,2,0,11,0,4,0,1,0,12,1,4,0,0,0,12,0,4,0,1,0,13,0,4,0,2,0,14,0,5,0,1,0,15,1,5,0,0,0,15,0,5,0,1,0,16,0,5,0,2,1,15,0,6,0,1,0,17,0,6,0,0,0,18,0,6,0,1,0,19,0,6,0,2,3,14,0,7,0,1,0,20,0,7,0,0,0,21,0,7,0,1,0,22,0,7,0,2,4,15,0,8,0,1,0,23,0,8,0,0,0,24,0,8,0,1,0,25,0,8,0,2,6,14,0,9,0,1,0,26,0,9,0,0,0,27,0,9,0,1,0,28,0,9,0,2,7,15,0,10,0,1,0,29,0,10,0,0,0,30,0,10,0,1,0,31,0,10,0,2,9,14,0,11,0,1,0,32,0,11,0,0,0,33,0,11,0,1,2,30,0,11,0,2,0,34,0,12,0,1,0,35,0,12,0,0,0,36,0,12,0,1,3,31,0,12,0,2,0,37,0,13,0,1,0,38,0,13,0,0,0,39,0,13,0,1,5,30,0,13,0,2,0,40,0,14,0,1,0,41,0,14,0,0,0,42,0,14,0,1,6,31,0,14,0,2,0,43,0,15,0,1,0,44,0,15,0,0,0,45,0,15,0,1,8,30,0,15,0,2,0,46,0,16,0,2,0,47,0,16,0,1,1,46,0,16,0,0,0,48,0,16,0,1,0,49,0,16,0,2,0,50,0,17,0,1,2,47,0,17,0,0,0,51,0,17,0,1,0,52,0,17,0,2,0,53,0,18,0,1,4,46,0,18,0,0,0,54,0,18,0,1,0,55,0,18,0,2,0,56,0,19,0,1,5,47,0,19,0,0,0,57,0,19,0,1,0,58,0,19,0,2,0,59,0,20,0,1,7,46,0,20,0,0,0,60,0,20,0,1,0,61,0,20,0,2,0,62,0,21,0,1,8,47,0,21,0,0,0,63,0,21,0,1,1,62,0,21,0,2,1,63,0,22,0,1,10,46,0,22,0,0,2,62,0,22,0,1,2,63,0,22,0,2,3,62,0,23,0,1,11,47,0,23,0,0,3,63,0,23,0,1,4,62,0,23,0,2,4,63,0,24,0,1,13,46,0,24,0,0,5,62,0,24,0,1,5,63,0,24,0,2,6,62,0,25,0,1,14,47,0,25,0,0,6,63,0,25,0,1,7,62,0,25,0,2,7,63,0,26,0,1,16,45,0,26,0,0,8,62,0,26,0,1,8,63,0,26,0,2,9,62,0,27,0,1,16,48,0,27,0,0,9,63,0,27,0,1,10,62,0,27,0,2,10,63,0,28,0,1,16,51,0,28,0,0,11,62,0,28,0,1,11,63,0,28,0,2,12,62,0,29,0,1,16,54,0,29,0,0,12,63,0,29,0,1,13,62,0,29,0,2,13,63,0,30,0,1,16,57,0,30,0,0,14,62,0,30,0,1,14,63,0,30,0,2,15,62,0,31,0,1,16,60,0,31,0,0,15,63,0,31,0,1,24,46,0,31,0,2,16,62,0,32,0,2,16,63,0,32,0,1,17,62,0,32,0,0,25,47,0,32,0,1,17,63,0,32,0,2,18,62,0,33,0,1,18,63,0,33,0,0,27,46,0,33,0,1,19,62,0,33,0,2,19,63,0,34,0,1,20,62,0,34,0,0,28,47,0,34,0,1,20,63,0,34,0,2,21,62,0,35,0,1,21,63,0,35,0,0,30,46,0,35,0,1,22,62,0,35,0,2,22,63,0,36,0,1,23,62,0,36,0,0,31,47,0,36,0,1,23,63,0,36,0,2,24,62,0,37,0,1,24,63,0,37,0,0,32,47,0,37,0,1,25,62,0,37,0,2,25,63,0,38,0,1,26,62,0,38,0,0,32,50,0,38,0,1,26,63,0,38,0,2,27,62,0,39,0,1,27,63,0,39,0,0,32,53,0,39,0,1,28,62,0,39,0,2,28,63,0,40,0,1,29,62,0,40,0,0,32,56,0,40,0,1,29,63,0,40,0,2,30,62,0,41,0,1,30,63,0,41,0,0,32,59,0,41,0,1,31,62,0,41,0,2,31,63,0,42,0,1,32,61,0,42,0,0,32,62,0,42,0,1,32,63,0,42,0,2,41,46,0,43,0,1,33,62,0,43,0,0,33,63,0,43,0,1,34,62,0,43,0,2,42,47,0,44,0,1,34,63,0,44,0,0,35,62,0,44,0,1,35,63,0,44,0,2,44,46,0,45,0,1,36,62,0,45,0,0,36,63,0,45,0,1,37,62,0,45,0,2,45,47,0,46,0,1,37,63,0,46,0,0,38,62,0,46,0,1,38,63,0,46,0,2,47,46,0,47,0,1,39,62,0,47,0,0,39,63,0,47,0,1,40,62,0,47,0,2,48,46,0,48,0,2,40,63,0,48,0,1,41,62,0,48,0,0,41,63,0,48,0,1,48,49,0,48,0,2,42,62,0,49,0,1,42,63,0,49,0,0,43,62,0,49,0,1,48,52,0,49,0,2,43,63,0,50,0,1,44,62,0,50,0,0,44,63,0,50,0,1,48,55,0,50,0,2,45,62,0,51,0,1,45,63,0,51,0,0,46,62,0,51,0,1,48,58,0,51,0,2,46,63,0,52,0,1,47,62,0,52,0,0,47,63,0,52,0,1,48,61,0,52,0,2,48,62,0,53,0,1,56,47,0,53,0,0,48,63,0,53,0,1,49,62,0,53,0,2,49,63,0,54,0,1,58,46,0,54,0,0,50,62,0,54,0,1,50,63,0,54,0,2,51,62,0,55,0,1,59,47,0,55,0,0,51,63,0,55,0,1,52,62,0,55,0,2,52,63,0,56,0,1,61,46,0,56,0,0,53,62,0,56,0,1,53,63,0,56,0,2,54,62,0,57,0,1,62,47,0,57,0,0,54,63,0,57,0,1,55,62,0,57,0,2,55,63,0,58,0,1,56,62,1,58,0,0,56,62,0,58,0,1,56,63,0,58,0,2,57,62,0,59,0,1,57,63,1,59,0,0,57,63,0,59,0,1,58,62,0,59,0,2,58,63,0,60,0,1,59,62,1,60,0,0,59,62,0,60,0,1,59,63,0,60,0,2,60,62,0,61,0,1,60,63,1,61,0,0,60,63,0,61,0,1,61,62,0,61,0,2,61,63,0,62,0,1,62,62,1,62,0,0,62,62,0,62,0,1,62,63,0,62,0,2,63,62,0,63,0,1,63,63,1,63,0,0,63,63,0,78,54,115,113,117,105,115,104,49,53,83,105,110,103,108,101,67,111,108,111,117,114,70,105,116,69,0,0,0,0,0,0,208,25,0,0,216,24,0,0,72,0,0,0,0,0,0,0,115,113,117,105,115,104,82,101,97,100,121,40,41,0,0,0,83,116,57,116,121,112,101,95,105,110,102,111,0,0,0,0,168,25,0,0,24,25,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,0,208,25,0,0,48,25,0,0,40,25,0,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,208,25,0,0,104,25,0,0,88,25,0,0,0,0,0,0,0,0,0,0,144,25,0,0,8,0,0,0,9,0,0,0,10,0,0,0,11,0,0,0,12,0,0,0,13,0,0,0,14,0,0,0,15,0,0,0,0,0,0,0,24,26,0,0,8,0,0,0,16,0,0,0,10,0,0,0,11,0,0,0,12,0,0,0,17,0,0,0,18,0,0,0,19,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,208,25,0,0,240,25,0,0,144,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);




var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);

assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

}

function copyTempDouble(ptr) {

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];

  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];

  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];

  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];

}


  var _cosf=Math_cos;

  function ___cxa_pure_virtual() {
      ABORT = true;
      throw 'Pure virtual function called!';
    }

  var _fabsf=Math_abs;

  var _floorf=Math_floor;

   
  Module["_memset"] = _memset;

  var _ceilf=Math_ceil;

  function _abort() {
      Module['abort']();
    }

  var _sinf=Math_sin;

   
  Module["_strlen"] = _strlen;

  var _sqrtf=Math_sqrt;

  function _emscripten_asm_const(code) {
      Runtime.getAsmConst(code, 0)();
    }

  
  
  var ___errno_state=0;function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      HEAP32[((___errno_state)>>2)]=value;
      return value;
    }
  
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 30: return PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 79:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
          return 200809;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1000;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: {
          if (typeof navigator === 'object') return navigator['hardwareConcurrency'] || 1;
          return 1;
        }
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }

  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) self.alloc(bytes);
      return ret;  // Previous break location.
    }

  function ___errno_location() {
      return ___errno_state;
    }

  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
      return dest;
    } 
  Module["_memcpy"] = _memcpy;

  var _llvm_pow_f32=Math_pow;

  
  
  
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          if (stream.tty.output.length) {
            stream.tty.ops.put_char(stream.tty, 10);
          }
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          for (var i = 0; i < length; i++) {
            try {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              result = process['stdin']['read']();
              if (!result) {
                if (process['stdin']['_readableState'] && process['stdin']['_readableState']['ended']) {
                  return null;  // EOF
                }
                return undefined;  // no data available
              }
            } else if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['print'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['printErr'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }}};
  
  var MEMFS={ops_table:null,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            },
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.buffer.byteLength which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },getFileDataAsRegularArray:function (node) {
        if (node.contents && node.contents.subarray) {
          var arr = [];
          for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
          return arr; // Returns a copy of the original data.
        }
        return node.contents; // No-op, the file contents are already in a JS array. Return as-is.
      },getFileDataAsTypedArray:function (node) {
        if (!node.contents) return new Uint8Array;
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },expandFileStorage:function (node, newCapacity) {
  
        // If we are asked to expand the size of a file that already exists, revert to using a standard JS array to store the file
        // instead of a typed array. This makes resizing the array more flexible because we can just .push() elements at the back to
        // increase the size.
        if (node.contents && node.contents.subarray && newCapacity > node.contents.length) {
          node.contents = MEMFS.getFileDataAsRegularArray(node);
          node.usedBytes = node.contents.length; // We might be writing to a lazy-loaded file which had overridden this property, so force-reset it.
        }
  
        if (!node.contents || node.contents.subarray) { // Keep using a typed array if creating a new storage, or if old one was a typed array as well.
          var prevCapacity = node.contents ? node.contents.buffer.byteLength : 0;
          if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
          // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
          // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
          // avoid overshooting the allocation cap by a very large margin.
          var CAPACITY_DOUBLING_MAX = 1024 * 1024;
          newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) | 0);
          if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
          var oldContents = node.contents;
          node.contents = new Uint8Array(newCapacity); // Allocate new storage.
          if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
          return;
        }
        // Not using a typed array to back the file storage. Use a standard JS array instead.
        if (!node.contents && newCapacity > 0) node.contents = [];
        while (node.contents.length < newCapacity) node.contents.push(0);
      },resizeFileStorage:function (node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
          return;
        }
  
        if (!node.contents || node.contents.subarray) { // Resize a typed array if that is being used as the backing store.
          var oldContents = node.contents;
          node.contents = new Uint8Array(new ArrayBuffer(newSize)); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
          return;
        }
        // Backing with a JS array.
        if (!node.contents) node.contents = [];
        if (node.contents.length > newSize) node.contents.length = newSize;
        else while (node.contents.length < newSize) node.contents.push(0);
        node.usedBytes = newSize;
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else
          {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) { // Can we just reuse the buffer we are given?
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = new Uint8Array(buffer.subarray(offset, offset + length));
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position); // Use typed array write if available.
          else
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          node.usedBytes = Math.max(node.usedBytes, position+length);
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < stream.node.usedBytes) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        }}};
  
  var IDBFS={dbs:{},indexedDB:function () {
        if (typeof indexedDB !== 'undefined') return indexedDB;
        var ret = null;
        if (typeof window === 'object') ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        assert(ret, 'IDBFS used, but indexedDB not supported');
        return ret;
      },DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        // reuse all of the core MEMFS functionality
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },getDB:function (name, callback) {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        req.onupgradeneeded = function(e) {
          var db = e.target.result;
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          fileStore.createIndex('timestamp', 'timestamp', { unique: false });
        };
        req.onsuccess = function() {
          db = req.result;
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function() {
          callback(this.error);
        };
      },getLocalSet:function (mount, callback) {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { timestamp: stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },getRemoteSet:function (mount, callback) {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
          transaction.onerror = function() { callback(this.error); };
  
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          var index = store.index('timestamp');
  
          index.openKeyCursor().onsuccess = function(event) {
            var cursor = event.target.result;
  
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, entries: entries });
            }
  
            entries[cursor.primaryKey] = { timestamp: cursor.key };
  
            cursor.continue();
          };
        });
      },loadLocalEntry:function (path, callback) {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode });
        } else if (FS.isFile(stat.mode)) {
          // Performance consideration: storing a normal JavaScript array to a IndexedDB is much slower than storing a typed array.
          // Therefore always convert the file contents to a typed array first before writing the data to IndexedDB.
          node.contents = MEMFS.getFileDataAsTypedArray(node);
          return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },storeLocalEntry:function (path, entry, callback) {
        try {
          if (FS.isDir(entry.mode)) {
            FS.mkdir(path, entry.mode);
          } else if (FS.isFile(entry.mode)) {
            FS.writeFile(path, entry.contents, { encoding: 'binary', canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.chmod(path, entry.mode);
          FS.utime(path, entry.timestamp, entry.timestamp);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },removeLocalEntry:function (path, callback) {
        try {
          var lookup = FS.lookupPath(path);
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },loadRemoteEntry:function (store, path, callback) {
        var req = store.get(path);
        req.onsuccess = function(event) { callback(null, event.target.result); };
        req.onerror = function() { callback(this.error); };
      },storeRemoteEntry:function (store, path, entry, callback) {
        var req = store.put(entry, path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function() { callback(this.error); };
      },removeRemoteEntry:function (store, path, callback) {
        var req = store.delete(path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function() { callback(this.error); };
      },reconcile:function (src, dst, callback) {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          var e = dst.entries[key];
          var e2 = src.entries[key];
          if (!e2) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var completed = 0;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= total) {
            return callback(null);
          }
        };
  
        transaction.onerror = function() { done(this.error); };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach(function(path) {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      }};
  
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // On Windows, directories return permission bits 'rw-rw-rw-', even though they have 'rwxrwxrwx', so 
            // propagate write bits to execute bits.
            stat.mode = stat.mode | ((stat.mode & 146) >> 1);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:function (flags) {
        if (flags in NODEFS.flagsToPermissionStringMap) {
          return NODEFS.flagsToPermissionStringMap[flags];
        } else {
          return flags;
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsToPermissionString(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          if (length === 0) return 0; // node errors on 0 length reads
          // FIXME this is terrible.
          var nbuffer = new Buffer(length);
          var res;
          try {
            res = fs.readSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          if (res > 0) {
            for (var i = 0; i < res; i++) {
              buffer[offset + i] = nbuffer[i];
            }
          }
          return res;
        },write:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(buffer.subarray(offset, offset + length));
          var res;
          try {
            res = fs.writeSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return res;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
  
          return position;
        }}};
  
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
      // we don't currently perform any user-space buffering of data
    }var FS={root:null,mounts:[],devices:[null],streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate:{},tracking:{openFlags:{READ:1,WRITE:2}},ErrnoError:null,genericErrors:{},handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || {};
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
              
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
          };
  
          FS.FSNode.prototype = {};
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); },
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); },
            },
          });
        }
  
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return !!node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var accmode = flag & 2097155;
        var perms = ['r', 'w', 'rw'][accmode];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return ERRNO_CODES.EACCES;
        }
        return 0;
      },mayLookup:function (dir) {
        var err = FS.nodePermissions(dir, 'x');
        if (err) return err;
        if (!dir.node_ops.lookup) return ERRNO_CODES.EACCES;
        return 0;
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return ERRNO_CODES.EEXIST;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return ERRNO_CODES.ENOTDIR;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return ERRNO_CODES.EBUSY;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return ERRNO_CODES.ENOENT;
        }
        if (FS.isLink(node.mode)) {
          return ERRNO_CODES.ELOOP;
        } else if (FS.isDir(node.mode)) {
          if ((flags & 2097155) !== 0 ||  // opening for write
              (flags & 512)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        // clone it, so we can return an instance of FSStream
        var newStream = new FS.FSStream();
        for (var p in stream) {
          newStream[p] = stream[p];
        }
        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },getStreamFromPtr:function (ptr) {
        return FS.streams[ptr - 1];
      },getPtrForStream:function (stream) {
        return stream ? stream.fd + 1 : 0;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },getMounts:function (mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= mounts.length) {
            callback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function (type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        if (!PATH.resolve(oldpath)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        if (!old_dir || !new_dir) throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        try {
          if (FS.trackingDelegate['willMovePath']) {
            FS.trackingDelegate['willMovePath'](old_path, new_path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
        try {
          if (FS.trackingDelegate['onMovePath']) FS.trackingDelegate['onMovePath'](old_path, new_path);
        } catch(e) {
          console.log("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // POSIX says unlink should set EPERM, not EISDIR
          if (err === ERRNO_CODES.EISDIR) err = ERRNO_CODES.EPERM;
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readlink:function (path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        return link.node_ops.readlink(link);
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        if (path === "") {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var err = FS.mayOpen(node, flags);
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            Module['printErr']('read file: ' + path);
          }
        }
        try {
          if (FS.trackingDelegate['onOpenFile']) {
            var trackingFlags = 0;
            if ((flags & 2097155) !== 1) {
              trackingFlags |= FS.tracking.openFlags.READ;
            }
            if ((flags & 2097155) !== 0) {
              trackingFlags |= FS.tracking.openFlags.WRITE;
            }
            FS.trackingDelegate['onOpenFile'](path, trackingFlags);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: " + e.message);
        }
        return stream;
      },close:function (stream) {
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
      },llseek:function (stream, offset, whence) {
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        try {
          if (stream.path && FS.trackingDelegate['onWriteToFile']) FS.trackingDelegate['onWriteToFile'](stream.path);
        } catch(e) {
          console.log("FS.trackingDelegate['onWriteToFile']('"+path+"') threw an exception: " + e.message);
        }
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EACCES);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = '';
          var utf8 = new Runtime.UTF8Processor();
          for (var i = 0; i < length; i++) {
            ret += utf8.processCChar(buf[i]);
          }
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var utf8 = new Runtime.UTF8Processor();
          var buf = new Uint8Array(utf8.processJSString(data));
          FS.write(stream, buf, 0, buf.length, 0, opts.canOwn);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0, opts.canOwn);
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function() { return 0; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        var random_device;
        if (typeof crypto !== 'undefined') {
          // for modern web browsers
          var randomBuffer = new Uint8Array(1);
          random_device = function() { crypto.getRandomValues(randomBuffer); return randomBuffer[0]; };
        } else if (ENVIRONMENT_IS_NODE) {
          // for nodejs
          random_device = function() { return require('crypto').randomBytes(1)[0]; };
        } else {
          // default for ES5 platforms
          random_device = function() { return (Math.random()*256)|0; };
        }
        FS.createDevice('/dev', 'random', random_device);
        FS.createDevice('/dev', 'urandom', random_device);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        HEAP32[((_stdin)>>2)]=FS.getPtrForStream(stdin);
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
  
        var stdout = FS.open('/dev/stdout', 'w');
        HEAP32[((_stdout)>>2)]=FS.getPtrForStream(stdout);
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
  
        var stderr = FS.open('/dev/stderr', 'w');
        HEAP32[((_stderr)>>2)]=FS.getPtrForStream(stderr);
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = function(errno) {
            this.errno = errno;
            for (var key in ERRNO_CODES) {
              if (ERRNO_CODES[key] === errno) {
                this.code = key;
                break;
              }
            }
          };
          this.setErrno(errno);
          this.message = ERRNO_MESSAGES[errno];
          if (this.stack) this.stack = demangleAll(this.stack);
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [ERRNO_CODES.ENOENT].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        }
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        }
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (function(from, to) {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(xhr.response || []);
            } else {
              return intArrayFromString(xhr.responseText || '', true);
            }
          });
          var lazyArray = this;
          lazyArray.setDataGetter(function(chunkNum) {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
            return lazyArray.chunks[chunkNum];
          });
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        }
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperty(lazyArray, "length", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._length;
              }
          });
          Object.defineProperty(lazyArray, "chunkSize", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._chunkSize;
              }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperty(node, "usedBytes", {
            get: function() { return this.contents.length; }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn) {
        Browser.init();
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
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
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
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
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
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
      }};
  
  
  function _emscripten_set_main_loop_timing(mode, value) {
      Browser.mainLoop.timingMode = mode;
      Browser.mainLoop.timingValue = value;
  
      if (!Browser.mainLoop.func) {
        console.error('emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.');
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (mode == 0 /*EM_TIMING_SETTIMEOUT*/) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          setTimeout(Browser.mainLoop.runner, value); // doing this each time means that on exception, we stop
        };
        Browser.mainLoop.method = 'timeout';
      } else if (mode == 1 /*EM_TIMING_RAF*/) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'rAF';
      }
      return 0;
    }function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg) {
      Module['noExitRuntime'] = true;
  
      assert(!Browser.mainLoop.func, 'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.');
  
      Browser.mainLoop.func = func;
      Browser.mainLoop.arg = arg;
  
      var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
  
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              Browser.mainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + ' ms'); //, left: ' + Browser.mainLoop.remainingBlockers);
          Browser.mainLoop.updateStatus();
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
  
        // Implement very basic swap interval control
        Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
        if (Browser.mainLoop.timingMode == 1/*EM_TIMING_RAF*/ && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          Browser.mainLoop.scheduler();
          return;
        }
  
        // Signal GL rendering layer that processing of a new frame is about to start. This helps it optimize
        // VBO double-buffering and reduce GPU stalls.
  
        if (Browser.mainLoop.method === 'timeout' && Module.ctx) {
          Module.printErr('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          Browser.mainLoop.method = ''; // just warn once per call to set main loop
        }
  
        Browser.mainLoop.runIter(function() {
          if (typeof arg !== 'undefined') {
            Runtime.dynCall('vi', func, [arg]);
          } else {
            Runtime.dynCall('v', func);
          }
        });
  
        // catch pauses from the main loop itself
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
  
        // Queue new audio data. This is important to be right after the main loop invocation, so that we will immediately be able
        // to queue the newest produced audio samples.
        // TODO: Consider adding pre- and post- rAF callbacks so that GL.newRenderingFrameStarted() and SDL.audio.queueNewAudioData()
        //       do not need to be hardcoded into this function, but can be more generic.
        if (typeof SDL === 'object' && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData();
  
        Browser.mainLoop.scheduler();
      }
  
      if (fps && fps > 0) _emscripten_set_main_loop_timing(0/*EM_TIMING_SETTIMEOUT*/, 1000.0 / fps);
      else _emscripten_set_main_loop_timing(1/*EM_TIMING_RAF*/, 1); // Do rAF by rendering each frame (no decimating)
  
      Browser.mainLoop.scheduler();
  
      if (simulateInfiniteLoop) {
        throw 'SimulateInfiniteLoop';
      }
    }var Browser={mainLoop:{scheduler:null,method:"",currentlyRunningMainloop:0,func:null,arg:0,timingMode:0,timingValue:0,currentFrameNumber:0,queue:[],pause:function () {
          Browser.mainLoop.scheduler = null;
          Browser.mainLoop.currentlyRunningMainloop++; // Incrementing this signals the previous main loop that it's now become old, and it must return.
        },resume:function () {
          Browser.mainLoop.currentlyRunningMainloop++;
          var timingMode = Browser.mainLoop.timingMode;
          var timingValue = Browser.mainLoop.timingValue;
          var func = Browser.mainLoop.func;
          Browser.mainLoop.func = null;
          _emscripten_set_main_loop(func, 0, false, Browser.mainLoop.arg);
          _emscripten_set_main_loop_timing(timingMode, timingValue);
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        },runIter:function (func) {
          if (ABORT) return;
          if (Module['preMainLoop']) {
            var preRet = Module['preMainLoop']();
            if (preRet === false) {
              return; // |return false| skips a frame
            }
          }
          try {
            func();
          } catch (e) {
            if (e instanceof ExitStatus) {
              return;
            } else {
              if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
              throw e;
            }
          }
          if (Module['postMainLoop']) Module['postMainLoop']();
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
  
        if (Browser.initted) return;
        Browser.initted = true;
  
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            assert(typeof url == 'string', 'createObjectURL must return a url as a string');
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
  
        // Canvas event setup
  
        var canvas = Module['canvas'];
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas ||
                                document['msPointerLockElement'] === canvas;
        }
        if (canvas) {
          // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
          // Module['forcedAspectRatio'] = 4 / 3;
          
          canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                      canvas['mozRequestPointerLock'] ||
                                      canvas['webkitRequestPointerLock'] ||
                                      canvas['msRequestPointerLock'] ||
                                      function(){};
          canvas.exitPointerLock = document['exitPointerLock'] ||
                                   document['mozExitPointerLock'] ||
                                   document['webkitExitPointerLock'] ||
                                   document['msExitPointerLock'] ||
                                   function(){}; // no-op if function does not exist
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
  
          document.addEventListener('pointerlockchange', pointerLockChange, false);
          document.addEventListener('mozpointerlockchange', pointerLockChange, false);
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
          document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
          if (Module['elementPointerLock']) {
            canvas.addEventListener("click", function(ev) {
              if (!Browser.pointerLock && canvas.requestPointerLock) {
                canvas.requestPointerLock();
                ev.preventDefault();
              }
            }, false);
          }
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx; // no need to recreate GL context if it's already been created for this canvas.
  
        var ctx;
        var contextHandle;
        if (useWebGL) {
          // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
          var contextAttributes = {
            antialias: false,
            alpha: false
          };
  
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute];
            }
          }
  
          contextHandle = GL.createContext(canvas, contextAttributes);
          if (contextHandle) {
            ctx = GL.getContext(contextHandle).GLctx;
          }
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
        } else {
          ctx = canvas.getContext('2d');
        }
  
        if (!ctx) return null;
  
        if (setInModule) {
          if (!useWebGL) assert(typeof GLctx === 'undefined', 'cannot set in module if GLctx is used, but we are a non-GL context that would replace it');
  
          Module.ctx = ctx;
          if (useWebGL) GL.makeContextCurrent(contextHandle);
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          var canvasContainer = canvas.parentNode;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement'] ||
               document['msFullScreenElement'] || document['msFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'] ||
                                      document['msExitFullscreen'] ||
                                      document['exitFullscreen'] ||
                                      function() {};
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else {
            
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
            
            if (Browser.resizeCanvas) Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
          Browser.updateCanvasDimensions(canvas);
        }
  
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
          document.addEventListener('MSFullscreenChange', fullScreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
        
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullScreen = canvasContainer['requestFullScreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullScreen'] ? function() { canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvasContainer.requestFullScreen();
      },nextRAF:0,fakeRequestAnimationFrame:function (func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (Browser.nextRAF === 0) {
          Browser.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= Browser.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            Browser.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(Browser.nextRAF - now, 0);
        setTimeout(func, delay);
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          Browser.fakeRequestAnimationFrame(func);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           Browser.fakeRequestAnimationFrame;
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (!ABORT) func();
        });
      },safeSetTimeout:function (func, timeout) {
        Module['noExitRuntime'] = true;
        return setTimeout(function() {
          if (!ABORT) func();
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        Module['noExitRuntime'] = true;
        return setInterval(function() {
          if (!ABORT) func();
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },getMouseWheelDelta:function (event) {
        var delta = 0;
        switch (event.type) {
          case 'DOMMouseScroll': 
            delta = event.detail;
            break;
          case 'mousewheel': 
            delta = event.wheelDelta;
            break;
          case 'wheel': 
            delta = event['deltaY'];
            break;
          default:
            throw 'unrecognized mouse wheel event: ' + event.type;
        }
        return delta;
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,touches:{},lastTouches:{},calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
  
          // Neither .scrollX or .pageXOffset are defined in a spec, but
          // we prefer .scrollX because it is currently in a spec draft.
          // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
          var scrollX = ((typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset);
          var scrollY = ((typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset);
          // If this assert lands, it's likely because the browser doesn't support scrollX or pageXOffset
          // and we have no viable fallback.
          assert((typeof scrollX !== 'undefined') && (typeof scrollY !== 'undefined'), 'Unable to retrieve scroll position, mouse positions likely broken.');
  
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch;
            if (touch === undefined) {
              return; // the "touch" property is only defined in SDL
  
            }
            var adjustedX = touch.pageX - (scrollX + rect.left);
            var adjustedY = touch.pageY - (scrollY + rect.top);
  
            adjustedX = adjustedX * (cw / rect.width);
            adjustedY = adjustedY * (ch / rect.height);
  
            var coords = { x: adjustedX, y: adjustedY };
            
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              Browser.lastTouches[touch.identifier] = Browser.touches[touch.identifier];
              Browser.touches[touch.identifier] = { x: adjustedX, y: adjustedY };
            } 
            return;
          }
  
          var x = event.pageX - (scrollX + rect.left);
          var y = event.pageY - (scrollY + rect.top);
  
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
  
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },updateCanvasDimensions:function (canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
             document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
             document['fullScreenElement'] || document['fullscreenElement'] ||
             document['msFullScreenElement'] || document['msFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      },wgetRequests:{},nextWgetRequestHandle:0,getNextWgetRequestHandle:function () {
        var handle = Browser.nextWgetRequestHandle;
        Browser.nextWgetRequestHandle++;
        return handle;
      }};

  function _time(ptr) {
      var ret = (Date.now()/1000)|0;
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret;
      }
      return ret;
    }

  var _atan2f=Math_atan2;
___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
FS.staticInit();__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
__ATINIT__.unshift({ func: function() { TTY.init() } });__ATEXIT__.push({ func: function() { TTY.shutdown() } });TTY.utf8 = new Runtime.UTF8Processor();
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); NODEFS.staticInit(); }
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);

staticSealed = true; // seal the static portion of memory

STACK_MAX = STACK_BASE + TOTAL_STACK;

DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);

assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");



function nullFunc_viiiii(x) { Module["printErr"]("Invalid function pointer called with signature 'viiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info."); abort(x) }

function nullFunc_vi(x) { Module["printErr"]("Invalid function pointer called with signature 'vi'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info."); abort(x) }

function nullFunc_vii(x) { Module["printErr"]("Invalid function pointer called with signature 'vii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info."); abort(x) }

function nullFunc_iiii(x) { Module["printErr"]("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info."); abort(x) }

function nullFunc_v(x) { Module["printErr"]("Invalid function pointer called with signature 'v'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info."); abort(x) }

function nullFunc_viiiiii(x) { Module["printErr"]("Invalid function pointer called with signature 'viiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info."); abort(x) }

function nullFunc_viiii(x) { Module["printErr"]("Invalid function pointer called with signature 'viiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info."); abort(x) }

function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  try {
    Module["dynCall_viiiii"](index,a1,a2,a3,a4,a5);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_vi(index,a1) {
  try {
    Module["dynCall_vi"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_vii(index,a1,a2) {
  try {
    Module["dynCall_vii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module["dynCall_iiii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_v(index) {
  try {
    Module["dynCall_v"](index);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module["dynCall_viiiiii"](index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiii(index,a1,a2,a3,a4) {
  try {
    Module["dynCall_viiii"](index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

Module.asmGlobalArg = { "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array };
Module.asmLibraryArg = { "abort": abort, "assert": assert, "min": Math_min, "nullFunc_viiiii": nullFunc_viiiii, "nullFunc_vi": nullFunc_vi, "nullFunc_vii": nullFunc_vii, "nullFunc_iiii": nullFunc_iiii, "nullFunc_v": nullFunc_v, "nullFunc_viiiiii": nullFunc_viiiiii, "nullFunc_viiii": nullFunc_viiii, "invoke_viiiii": invoke_viiiii, "invoke_vi": invoke_vi, "invoke_vii": invoke_vii, "invoke_iiii": invoke_iiii, "invoke_v": invoke_v, "invoke_viiiiii": invoke_viiiiii, "invoke_viiii": invoke_viiii, "_sbrk": _sbrk, "_fflush": _fflush, "_sinf": _sinf, "_cosf": _cosf, "_emscripten_asm_const": _emscripten_asm_const, "_emscripten_set_main_loop": _emscripten_set_main_loop, "_abort": _abort, "_emscripten_set_main_loop_timing": _emscripten_set_main_loop_timing, "_fabsf": _fabsf, "_ceilf": _ceilf, "_time": _time, "_llvm_pow_f32": _llvm_pow_f32, "_floorf": _floorf, "___setErrNo": ___setErrNo, "_emscripten_memcpy_big": _emscripten_memcpy_big, "_sqrtf": _sqrtf, "___errno_location": ___errno_location, "_sysconf": _sysconf, "___cxa_pure_virtual": ___cxa_pure_virtual, "_atan2f": _atan2f, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "NaN": NaN, "Infinity": Infinity };
// EMSCRIPTEN_START_ASM
var asm = (function(global, env, buffer) {
  'almost asm';
  
  var HEAP8 = new global.Int8Array(buffer);
  var HEAP16 = new global.Int16Array(buffer);
  var HEAP32 = new global.Int32Array(buffer);
  var HEAPU8 = new global.Uint8Array(buffer);
  var HEAPU16 = new global.Uint16Array(buffer);
  var HEAPU32 = new global.Uint32Array(buffer);
  var HEAPF32 = new global.Float32Array(buffer);
  var HEAPF64 = new global.Float64Array(buffer);


  var STACKTOP=env.STACKTOP|0;
  var STACK_MAX=env.STACK_MAX|0;
  var tempDoublePtr=env.tempDoublePtr|0;
  var ABORT=env.ABORT|0;

  var __THREW__ = 0;
  var threwValue = 0;
  var setjmpId = 0;
  var undef = 0;
  var nan = +env.NaN, inf = +env.Infinity;
  var tempInt = 0, tempBigInt = 0, tempBigIntP = 0, tempBigIntS = 0, tempBigIntR = 0.0, tempBigIntI = 0, tempBigIntD = 0, tempValue = 0, tempDouble = 0.0;

  var tempRet0 = 0;
  var tempRet1 = 0;
  var tempRet2 = 0;
  var tempRet3 = 0;
  var tempRet4 = 0;
  var tempRet5 = 0;
  var tempRet6 = 0;
  var tempRet7 = 0;
  var tempRet8 = 0;
  var tempRet9 = 0;
  var Math_floor=global.Math.floor;
  var Math_abs=global.Math.abs;
  var Math_sqrt=global.Math.sqrt;
  var Math_pow=global.Math.pow;
  var Math_cos=global.Math.cos;
  var Math_sin=global.Math.sin;
  var Math_tan=global.Math.tan;
  var Math_acos=global.Math.acos;
  var Math_asin=global.Math.asin;
  var Math_atan=global.Math.atan;
  var Math_atan2=global.Math.atan2;
  var Math_exp=global.Math.exp;
  var Math_log=global.Math.log;
  var Math_ceil=global.Math.ceil;
  var Math_imul=global.Math.imul;
  var abort=env.abort;
  var assert=env.assert;
  var Math_min=env.min;
  var nullFunc_viiiii=env.nullFunc_viiiii;
  var nullFunc_vi=env.nullFunc_vi;
  var nullFunc_vii=env.nullFunc_vii;
  var nullFunc_iiii=env.nullFunc_iiii;
  var nullFunc_v=env.nullFunc_v;
  var nullFunc_viiiiii=env.nullFunc_viiiiii;
  var nullFunc_viiii=env.nullFunc_viiii;
  var invoke_viiiii=env.invoke_viiiii;
  var invoke_vi=env.invoke_vi;
  var invoke_vii=env.invoke_vii;
  var invoke_iiii=env.invoke_iiii;
  var invoke_v=env.invoke_v;
  var invoke_viiiiii=env.invoke_viiiiii;
  var invoke_viiii=env.invoke_viiii;
  var _sbrk=env._sbrk;
  var _fflush=env._fflush;
  var _sinf=env._sinf;
  var _cosf=env._cosf;
  var _emscripten_asm_const=env._emscripten_asm_const;
  var _emscripten_set_main_loop=env._emscripten_set_main_loop;
  var _abort=env._abort;
  var _emscripten_set_main_loop_timing=env._emscripten_set_main_loop_timing;
  var _fabsf=env._fabsf;
  var _ceilf=env._ceilf;
  var _time=env._time;
  var _llvm_pow_f32=env._llvm_pow_f32;
  var _floorf=env._floorf;
  var ___setErrNo=env.___setErrNo;
  var _emscripten_memcpy_big=env._emscripten_memcpy_big;
  var _sqrtf=env._sqrtf;
  var ___errno_location=env.___errno_location;
  var _sysconf=env._sysconf;
  var ___cxa_pure_virtual=env.___cxa_pure_virtual;
  var _atan2f=env._atan2f;
  var tempFloat = 0.0;

// EMSCRIPTEN_START_FUNCS
function stackAlloc(size) {
  size = size|0;
  var ret = 0;
  ret = STACKTOP;
  STACKTOP = (STACKTOP + size)|0;
STACKTOP = (STACKTOP + 15)&-16;
if ((STACKTOP|0) >= (STACK_MAX|0)) abort();

  return ret|0;
}
function stackSave() {
  return STACKTOP|0;
}
function stackRestore(top) {
  top = top|0;
  STACKTOP = top;
}

function setThrew(threw, value) {
  threw = threw|0;
  value = value|0;
  if ((__THREW__|0) == 0) {
    __THREW__ = threw;
    threwValue = value;
  }
}
function copyTempFloat(ptr) {
  ptr = ptr|0;
  HEAP8[tempDoublePtr>>0] = HEAP8[ptr>>0];
  HEAP8[tempDoublePtr+1>>0] = HEAP8[ptr+1>>0];
  HEAP8[tempDoublePtr+2>>0] = HEAP8[ptr+2>>0];
  HEAP8[tempDoublePtr+3>>0] = HEAP8[ptr+3>>0];
}
function copyTempDouble(ptr) {
  ptr = ptr|0;
  HEAP8[tempDoublePtr>>0] = HEAP8[ptr>>0];
  HEAP8[tempDoublePtr+1>>0] = HEAP8[ptr+1>>0];
  HEAP8[tempDoublePtr+2>>0] = HEAP8[ptr+2>>0];
  HEAP8[tempDoublePtr+3>>0] = HEAP8[ptr+3>>0];
  HEAP8[tempDoublePtr+4>>0] = HEAP8[ptr+4>>0];
  HEAP8[tempDoublePtr+5>>0] = HEAP8[ptr+5>>0];
  HEAP8[tempDoublePtr+6>>0] = HEAP8[ptr+6>>0];
  HEAP8[tempDoublePtr+7>>0] = HEAP8[ptr+7>>0];
}
function setTempRet0(value) {
  value = value|0;
  tempRet0 = value;
}
function getTempRet0() {
  return tempRet0|0;
}

function __ZN6squish17CompressAlphaDxt3EPKhiPv($rgba,$mask,$block) {
 $rgba = $rgba|0;
 $mask = $mask|0;
 $block = $block|0;
 var $$ = 0, $$$i = 0, $$op = 0, $0 = 0, $1 = 0, $10 = 0.0, $11 = 0.0, $12 = 0, $13 = 0, $14 = 0, $15 = 0.0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0;
 var $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $4 = 0.0, $5 = 0.0, $6 = 0, $7 = 0, $8 = 0, $9 = 0.0, $exitcond = 0, $i$03 = 0, $phitmp = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 $i$03 = 0;
 while(1) {
  $0 = $i$03 << 3;
  $1 = $0 | 3;
  $2 = (($rgba) + ($1)|0);
  $3 = HEAP8[$2>>0]|0;
  $4 = (+($3&255));
  $5 = $4 * 0.0588235296308994293213;
  $6 = $0 | 7;
  $7 = (($rgba) + ($6)|0);
  $8 = HEAP8[$7>>0]|0;
  $9 = (+($8&255));
  $10 = $9 * 0.0588235296308994293213;
  $11 = $5 + 0.5;
  $12 = (~~(($11)));
  $13 = ($12|0)<(0);
  if ($13) {
   $25 = 0;
  } else {
   $14 = ($12|0)>(15);
   $$$i = $14 ? 15 : $12;
   $25 = $$$i;
  }
  $15 = $10 + 0.5;
  $16 = (~~(($15)));
  $17 = ($16|0)<(0);
  if ($17) {
   $29 = 0;
  } else {
   $18 = ($16|0)>(15);
   $$op = $16 << 4;
   $phitmp = $18 ? 240 : $$op;
   $29 = $phitmp;
  }
  $19 = $i$03 << 1;
  $20 = 1 << $19;
  $21 = $19 | 1;
  $22 = 1 << $21;
  $23 = $20 & $mask;
  $24 = ($23|0)==(0);
  $$ = $24 ? 0 : $25;
  $26 = $22 & $mask;
  $27 = ($26|0)==(0);
  $28 = $27 ? 0 : $29;
  $30 = $28 | $$;
  $31 = $30&255;
  $32 = (($block) + ($i$03)|0);
  HEAP8[$32>>0] = $31;
  $33 = (($i$03) + 1)|0;
  $exitcond = ($33|0)==(8);
  if ($exitcond) {
   break;
  } else {
   $i$03 = $33;
  }
 }
 STACKTOP = sp;return;
}
function __ZN6squish19DecompressAlphaDxt3EPhPKv($rgba,$block) {
 $rgba = $rgba|0;
 $block = $block|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $exitcond = 0, $i$01 = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 $i$01 = 0;
 while(1) {
  $0 = (($block) + ($i$01)|0);
  $1 = HEAP8[$0>>0]|0;
  $2 = $1&255;
  $3 = $2 & 15;
  $4 = $2 & 240;
  $5 = $2 << 4;
  $6 = $3 | $5;
  $7 = $6&255;
  $8 = $i$01 << 3;
  $9 = $8 | 3;
  $10 = (($rgba) + ($9)|0);
  HEAP8[$10>>0] = $7;
  $11 = $2 >>> 4;
  $12 = $4 | $11;
  $13 = $12&255;
  $14 = $8 | 7;
  $15 = (($rgba) + ($14)|0);
  HEAP8[$15>>0] = $13;
  $16 = (($i$01) + 1)|0;
  $exitcond = ($16|0)==(8);
  if ($exitcond) {
   break;
  } else {
   $i$01 = $16;
  }
 }
 STACKTOP = sp;return;
}
function __ZN6squish17CompressAlphaDxt5EPKhiPv($rgba,$mask,$block) {
 $rgba = $rgba|0;
 $mask = $mask|0;
 $block = $block|0;
 var $$ = 0, $$11 = 0, $$12 = 0, $$13 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0;
 var $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0;
 var $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0;
 var $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0;
 var $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0;
 var $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0;
 var $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0;
 var $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0;
 var $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0;
 var $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0;
 var $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0;
 var $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0;
 var $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0;
 var $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0;
 var $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0;
 var $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0;
 var $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0;
 var $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0;
 var $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0;
 var $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0;
 var $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0, $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0;
 var $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0, $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0;
 var $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0, $497 = 0, $498 = 0, $499 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0;
 var $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0;
 var $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0;
 var $96 = 0, $97 = 0, $98 = 0, $99 = 0, $codes5 = 0, $codes7 = 0, $cond = 0, $exitcond = 0, $exitcond$i = 0, $exitcond$i4 = 0, $i$019 = 0, $i$03$i = 0, $i$03$i2 = 0, $indices5 = 0, $indices7 = 0, $scevgep$i$i = 0, $scevgep$i$i5 = 0, $scevgep$i1$i = 0, $scevgep$i1$i7 = 0, $scevgep10$i$i = 0;
 var $scevgep10$i$i6 = 0, $scevgep10$i2$i = 0, $scevgep10$i2$i8 = 0, $swapped$i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $swapped$i = sp + 48|0;
 $codes5 = sp;
 $codes7 = sp + 8|0;
 $indices5 = sp + 16|0;
 $indices7 = sp + 32|0;
 $11 = 0;$14 = 255;$17 = 0;$9 = 255;$i$019 = 0;
 while(1) {
  $0 = 1 << $i$019;
  $1 = $0 & $mask;
  $2 = ($1|0)==(0);
  do {
   if ($2) {
    $20 = $14;$21 = $17;$23 = $9;$24 = $11;
   } else {
    $3 = $i$019 << 2;
    $4 = $3 | 3;
    $5 = (($rgba) + ($4)|0);
    $6 = HEAP8[$5>>0]|0;
    $7 = $6&255;
    $8 = ($7|0)<($9|0);
    $$ = $8 ? $7 : $9;
    $10 = ($7|0)>($11|0);
    $12 = $10 ? $7 : $11;
    $cond = ($6<<24>>24)==(0);
    if ($cond) {
     $499 = $14;
    } else {
     $13 = ($7|0)<($14|0);
     $$11 = $13 ? $7 : $14;
     $15 = ($6<<24>>24)==(-1);
     if ($15) {
      $20 = $$11;$21 = $17;$23 = $$;$24 = $12;
      break;
     } else {
      $499 = $$11;
     }
    }
    $16 = ($7|0)>($17|0);
    $$12 = $16 ? $7 : $17;
    $20 = $499;$21 = $$12;$23 = $$;$24 = $12;
   }
  } while(0);
  $18 = (($i$019) + 1)|0;
  $exitcond = ($18|0)==(16);
  if ($exitcond) {
   break;
  } else {
   $11 = $24;$14 = $20;$17 = $21;$9 = $23;$i$019 = $18;
  }
 }
 $19 = ($20|0)>($21|0);
 $$13 = $19 ? $21 : $20;
 $22 = ($23|0)>($24|0);
 $25 = $22 ? $24 : $23;
 $26 = (($21) - ($$13))|0;
 $27 = ($26|0)<(5);
 if ($27) {
  $28 = (($$13) + 5)|0;
  $29 = ($28|0)>(255);
  $30 = $29 ? 255 : $28;
  $32 = $30;
 } else {
  $32 = $21;
 }
 $31 = (($32) - ($$13))|0;
 $33 = ($31|0)<(5);
 if ($33) {
  $34 = (($32) + -5)|0;
  $35 = ($34|0)>(0);
  $36 = $35 ? $34 : 0;
  $49 = $36;
 } else {
  $49 = $$13;
 }
 $37 = (($24) - ($25))|0;
 $38 = ($37|0)<(7);
 if ($38) {
  $39 = (($25) + 7)|0;
  $40 = ($39|0)>(255);
  $41 = $40 ? 255 : $39;
  $43 = $41;
 } else {
  $43 = $24;
 }
 $42 = (($43) - ($25))|0;
 $44 = ($42|0)<(7);
 if ($44) {
  $45 = (($43) + -7)|0;
  $46 = ($45|0)>(0);
  $47 = $46 ? $45 : 0;
  $77 = $47;
 } else {
  $77 = $25;
 }
 $48 = $49&255;
 HEAP8[$codes5>>0] = $48;
 $50 = $32&255;
 $51 = (($codes5) + 1|0);
 HEAP8[$51>>0] = $50;
 $52 = $49 << 2;
 $53 = (($52) + ($32))|0;
 $54 = (($53|0) / 5)&-1;
 $55 = $54&255;
 $56 = (($codes5) + 2|0);
 HEAP8[$56>>0] = $55;
 $57 = ($49*3)|0;
 $58 = $32 << 1;
 $59 = (($57) + ($58))|0;
 $60 = (($59|0) / 5)&-1;
 $61 = $60&255;
 $62 = (($codes5) + 3|0);
 HEAP8[$62>>0] = $61;
 $63 = $49 << 1;
 $64 = ($32*3)|0;
 $65 = (($63) + ($64))|0;
 $66 = (($65|0) / 5)&-1;
 $67 = $66&255;
 $68 = (($codes5) + 4|0);
 HEAP8[$68>>0] = $67;
 $69 = $32 << 2;
 $70 = (($49) + ($69))|0;
 $71 = (($70|0) / 5)&-1;
 $72 = $71&255;
 $73 = (($codes5) + 5|0);
 HEAP8[$73>>0] = $72;
 $74 = (($codes5) + 6|0);
 HEAP8[$74>>0] = 0;
 $75 = (($codes5) + 7|0);
 HEAP8[$75>>0] = -1;
 $76 = $77&255;
 HEAP8[$codes7>>0] = $76;
 $78 = $43&255;
 $79 = (($codes7) + 1|0);
 HEAP8[$79>>0] = $78;
 $80 = ($77*6)|0;
 $81 = (($80) + ($43))|0;
 $82 = (($81|0) / 7)&-1;
 $83 = $82&255;
 $84 = (($codes7) + 2|0);
 HEAP8[$84>>0] = $83;
 $85 = ($77*5)|0;
 $86 = $43 << 1;
 $87 = (($85) + ($86))|0;
 $88 = (($87|0) / 7)&-1;
 $89 = $88&255;
 $90 = (($codes7) + 3|0);
 HEAP8[$90>>0] = $89;
 $91 = $77 << 2;
 $92 = ($43*3)|0;
 $93 = (($91) + ($92))|0;
 $94 = (($93|0) / 7)&-1;
 $95 = $94&255;
 $96 = (($codes7) + 4|0);
 HEAP8[$96>>0] = $95;
 $97 = ($77*3)|0;
 $98 = $43 << 2;
 $99 = (($97) + ($98))|0;
 $100 = (($99|0) / 7)&-1;
 $101 = $100&255;
 $102 = (($codes7) + 5|0);
 HEAP8[$102>>0] = $101;
 $103 = $77 << 1;
 $104 = ($43*5)|0;
 $105 = (($103) + ($104))|0;
 $106 = (($105|0) / 7)&-1;
 $107 = $106&255;
 $108 = (($codes7) + 6|0);
 HEAP8[$108>>0] = $107;
 $109 = ($43*6)|0;
 $110 = (($77) + ($109))|0;
 $111 = (($110|0) / 7)&-1;
 $112 = $111&255;
 $113 = (($codes7) + 7|0);
 HEAP8[$113>>0] = $112;
 $114 = (__ZN6squishL8FitCodesEPKhiS1_Ph($rgba,$mask,$codes5,$indices5)|0);
 $115 = (__ZN6squishL8FitCodesEPKhiS1_Ph($rgba,$mask,$codes7,$indices7)|0);
 $116 = ($114|0)>($115|0);
 if ($116) {
  $309 = ($77|0)<($43|0);
  if ($309) {
   $i$03$i = 0;
  } else {
   HEAP8[$block>>0] = $76;
   $409 = (($block) + 1|0);
   HEAP8[$409>>0] = $78;
   $410 = (($block) + 2|0);
   $411 = (($indices7) + 1|0);
   $412 = HEAP8[$indices7>>0]|0;
   $413 = $412&255;
   $414 = (($indices7) + 2|0);
   $415 = HEAP8[$411>>0]|0;
   $416 = $415&255;
   $417 = $416 << 3;
   $418 = $417 | $413;
   $419 = (($indices7) + 3|0);
   $420 = HEAP8[$414>>0]|0;
   $421 = $420&255;
   $422 = $421 << 6;
   $423 = $418 | $422;
   $424 = (($indices7) + 4|0);
   $425 = HEAP8[$419>>0]|0;
   $426 = $425&255;
   $427 = $426 << 9;
   $428 = $427 | $423;
   $429 = (($indices7) + 5|0);
   $430 = HEAP8[$424>>0]|0;
   $431 = $430&255;
   $432 = $431 << 12;
   $433 = $428 | $432;
   $434 = (($indices7) + 6|0);
   $435 = HEAP8[$429>>0]|0;
   $436 = $435&255;
   $437 = $436 << 15;
   $438 = $433 | $437;
   $439 = (($indices7) + 7|0);
   $440 = HEAP8[$434>>0]|0;
   $441 = $440&255;
   $442 = $441 << 18;
   $443 = $442 | $438;
   $444 = HEAP8[$439>>0]|0;
   $445 = $444&255;
   $446 = $445 << 21;
   $447 = $443 | $446;
   $scevgep$i1$i = (($indices7) + 8|0);
   $448 = $423&255;
   $449 = (($block) + 3|0);
   HEAP8[$410>>0] = $448;
   $450 = $438 >>> 8;
   $451 = $450&255;
   $452 = (($block) + 4|0);
   HEAP8[$449>>0] = $451;
   $453 = $447 >>> 16;
   $454 = $453&255;
   HEAP8[$452>>0] = $454;
   $scevgep10$i2$i = (($block) + 5|0);
   $455 = (($indices7) + 9|0);
   $456 = HEAP8[$scevgep$i1$i>>0]|0;
   $457 = $456&255;
   $458 = (($indices7) + 10|0);
   $459 = HEAP8[$455>>0]|0;
   $460 = $459&255;
   $461 = $460 << 3;
   $462 = $461 | $457;
   $463 = (($indices7) + 11|0);
   $464 = HEAP8[$458>>0]|0;
   $465 = $464&255;
   $466 = $465 << 6;
   $467 = $462 | $466;
   $468 = (($indices7) + 12|0);
   $469 = HEAP8[$463>>0]|0;
   $470 = $469&255;
   $471 = $470 << 9;
   $472 = $471 | $467;
   $473 = (($indices7) + 13|0);
   $474 = HEAP8[$468>>0]|0;
   $475 = $474&255;
   $476 = $475 << 12;
   $477 = $472 | $476;
   $478 = (($indices7) + 14|0);
   $479 = HEAP8[$473>>0]|0;
   $480 = $479&255;
   $481 = $480 << 15;
   $482 = $477 | $481;
   $483 = (($indices7) + 15|0);
   $484 = HEAP8[$478>>0]|0;
   $485 = $484&255;
   $486 = $485 << 18;
   $487 = $486 | $482;
   $488 = HEAP8[$483>>0]|0;
   $489 = $488&255;
   $490 = $489 << 21;
   $491 = $487 | $490;
   $492 = $467&255;
   $493 = (($block) + 6|0);
   HEAP8[$scevgep10$i2$i>>0] = $492;
   $494 = $482 >>> 8;
   $495 = $494&255;
   $496 = (($block) + 7|0);
   HEAP8[$493>>0] = $495;
   $497 = $491 >>> 16;
   $498 = $497&255;
   HEAP8[$496>>0] = $498;
   STACKTOP = sp;return;
  }
  while(1) {
   $310 = (($indices7) + ($i$03$i)|0);
   $311 = HEAP8[$310>>0]|0;
   if ((($311<<24>>24) == 1)) {
    $313 = (($swapped$i) + ($i$03$i)|0);
    HEAP8[$313>>0] = 0;
   } else if ((($311<<24>>24) == 0)) {
    $312 = (($swapped$i) + ($i$03$i)|0);
    HEAP8[$312>>0] = 1;
   } else {
    $314 = $311&255;
    $315 = (9 - ($314))|0;
    $316 = $315&255;
    $317 = (($swapped$i) + ($i$03$i)|0);
    HEAP8[$317>>0] = $316;
   }
   $318 = (($i$03$i) + 1)|0;
   $exitcond$i = ($318|0)==(16);
   if ($exitcond$i) {
    break;
   } else {
    $i$03$i = $318;
   }
  }
  HEAP8[$block>>0] = $78;
  $319 = (($block) + 1|0);
  HEAP8[$319>>0] = $76;
  $320 = (($block) + 2|0);
  $321 = (($swapped$i) + 1|0);
  $322 = HEAP8[$swapped$i>>0]|0;
  $323 = $322&255;
  $324 = (($swapped$i) + 2|0);
  $325 = HEAP8[$321>>0]|0;
  $326 = $325&255;
  $327 = $326 << 3;
  $328 = $327 | $323;
  $329 = (($swapped$i) + 3|0);
  $330 = HEAP8[$324>>0]|0;
  $331 = $330&255;
  $332 = $331 << 6;
  $333 = $328 | $332;
  $334 = (($swapped$i) + 4|0);
  $335 = HEAP8[$329>>0]|0;
  $336 = $335&255;
  $337 = $336 << 9;
  $338 = $337 | $333;
  $339 = (($swapped$i) + 5|0);
  $340 = HEAP8[$334>>0]|0;
  $341 = $340&255;
  $342 = $341 << 12;
  $343 = $338 | $342;
  $344 = (($swapped$i) + 6|0);
  $345 = HEAP8[$339>>0]|0;
  $346 = $345&255;
  $347 = $346 << 15;
  $348 = $343 | $347;
  $349 = (($swapped$i) + 7|0);
  $350 = HEAP8[$344>>0]|0;
  $351 = $350&255;
  $352 = $351 << 18;
  $353 = $352 | $348;
  $354 = HEAP8[$349>>0]|0;
  $355 = $354&255;
  $356 = $355 << 21;
  $357 = $353 | $356;
  $scevgep$i$i = (($swapped$i) + 8|0);
  $358 = $333&255;
  $359 = (($block) + 3|0);
  HEAP8[$320>>0] = $358;
  $360 = $348 >>> 8;
  $361 = $360&255;
  $362 = (($block) + 4|0);
  HEAP8[$359>>0] = $361;
  $363 = $357 >>> 16;
  $364 = $363&255;
  HEAP8[$362>>0] = $364;
  $scevgep10$i$i = (($block) + 5|0);
  $365 = (($swapped$i) + 9|0);
  $366 = HEAP8[$scevgep$i$i>>0]|0;
  $367 = $366&255;
  $368 = (($swapped$i) + 10|0);
  $369 = HEAP8[$365>>0]|0;
  $370 = $369&255;
  $371 = $370 << 3;
  $372 = $371 | $367;
  $373 = (($swapped$i) + 11|0);
  $374 = HEAP8[$368>>0]|0;
  $375 = $374&255;
  $376 = $375 << 6;
  $377 = $372 | $376;
  $378 = (($swapped$i) + 12|0);
  $379 = HEAP8[$373>>0]|0;
  $380 = $379&255;
  $381 = $380 << 9;
  $382 = $381 | $377;
  $383 = (($swapped$i) + 13|0);
  $384 = HEAP8[$378>>0]|0;
  $385 = $384&255;
  $386 = $385 << 12;
  $387 = $382 | $386;
  $388 = (($swapped$i) + 14|0);
  $389 = HEAP8[$383>>0]|0;
  $390 = $389&255;
  $391 = $390 << 15;
  $392 = $387 | $391;
  $393 = (($swapped$i) + 15|0);
  $394 = HEAP8[$388>>0]|0;
  $395 = $394&255;
  $396 = $395 << 18;
  $397 = $396 | $392;
  $398 = HEAP8[$393>>0]|0;
  $399 = $398&255;
  $400 = $399 << 21;
  $401 = $397 | $400;
  $402 = $377&255;
  $403 = (($block) + 6|0);
  HEAP8[$scevgep10$i$i>>0] = $402;
  $404 = $392 >>> 8;
  $405 = $404&255;
  $406 = (($block) + 7|0);
  HEAP8[$403>>0] = $405;
  $407 = $401 >>> 16;
  $408 = $407&255;
  HEAP8[$406>>0] = $408;
  STACKTOP = sp;return;
 }
 $117 = ($49|0)>($32|0);
 if ($117) {
  $i$03$i2 = 0;
 } else {
  HEAP8[$block>>0] = $48;
  $219 = (($block) + 1|0);
  HEAP8[$219>>0] = $50;
  $220 = (($block) + 2|0);
  $221 = (($indices5) + 1|0);
  $222 = HEAP8[$indices5>>0]|0;
  $223 = $222&255;
  $224 = (($indices5) + 2|0);
  $225 = HEAP8[$221>>0]|0;
  $226 = $225&255;
  $227 = $226 << 3;
  $228 = $227 | $223;
  $229 = (($indices5) + 3|0);
  $230 = HEAP8[$224>>0]|0;
  $231 = $230&255;
  $232 = $231 << 6;
  $233 = $228 | $232;
  $234 = (($indices5) + 4|0);
  $235 = HEAP8[$229>>0]|0;
  $236 = $235&255;
  $237 = $236 << 9;
  $238 = $237 | $233;
  $239 = (($indices5) + 5|0);
  $240 = HEAP8[$234>>0]|0;
  $241 = $240&255;
  $242 = $241 << 12;
  $243 = $238 | $242;
  $244 = (($indices5) + 6|0);
  $245 = HEAP8[$239>>0]|0;
  $246 = $245&255;
  $247 = $246 << 15;
  $248 = $243 | $247;
  $249 = (($indices5) + 7|0);
  $250 = HEAP8[$244>>0]|0;
  $251 = $250&255;
  $252 = $251 << 18;
  $253 = $252 | $248;
  $254 = HEAP8[$249>>0]|0;
  $255 = $254&255;
  $256 = $255 << 21;
  $257 = $253 | $256;
  $scevgep$i1$i7 = (($indices5) + 8|0);
  $258 = $233&255;
  $259 = (($block) + 3|0);
  HEAP8[$220>>0] = $258;
  $260 = $248 >>> 8;
  $261 = $260&255;
  $262 = (($block) + 4|0);
  HEAP8[$259>>0] = $261;
  $263 = $257 >>> 16;
  $264 = $263&255;
  HEAP8[$262>>0] = $264;
  $scevgep10$i2$i8 = (($block) + 5|0);
  $265 = (($indices5) + 9|0);
  $266 = HEAP8[$scevgep$i1$i7>>0]|0;
  $267 = $266&255;
  $268 = (($indices5) + 10|0);
  $269 = HEAP8[$265>>0]|0;
  $270 = $269&255;
  $271 = $270 << 3;
  $272 = $271 | $267;
  $273 = (($indices5) + 11|0);
  $274 = HEAP8[$268>>0]|0;
  $275 = $274&255;
  $276 = $275 << 6;
  $277 = $272 | $276;
  $278 = (($indices5) + 12|0);
  $279 = HEAP8[$273>>0]|0;
  $280 = $279&255;
  $281 = $280 << 9;
  $282 = $281 | $277;
  $283 = (($indices5) + 13|0);
  $284 = HEAP8[$278>>0]|0;
  $285 = $284&255;
  $286 = $285 << 12;
  $287 = $282 | $286;
  $288 = (($indices5) + 14|0);
  $289 = HEAP8[$283>>0]|0;
  $290 = $289&255;
  $291 = $290 << 15;
  $292 = $287 | $291;
  $293 = (($indices5) + 15|0);
  $294 = HEAP8[$288>>0]|0;
  $295 = $294&255;
  $296 = $295 << 18;
  $297 = $296 | $292;
  $298 = HEAP8[$293>>0]|0;
  $299 = $298&255;
  $300 = $299 << 21;
  $301 = $297 | $300;
  $302 = $277&255;
  $303 = (($block) + 6|0);
  HEAP8[$scevgep10$i2$i8>>0] = $302;
  $304 = $292 >>> 8;
  $305 = $304&255;
  $306 = (($block) + 7|0);
  HEAP8[$303>>0] = $305;
  $307 = $301 >>> 16;
  $308 = $307&255;
  HEAP8[$306>>0] = $308;
  STACKTOP = sp;return;
 }
 while(1) {
  $118 = (($indices5) + ($i$03$i2)|0);
  $119 = HEAP8[$118>>0]|0;
  $120 = $119&255;
  do {
   if ((($119<<24>>24) == 0)) {
    $121 = (($swapped$i) + ($i$03$i2)|0);
    HEAP8[$121>>0] = 1;
   } else if ((($119<<24>>24) == 1)) {
    $122 = (($swapped$i) + ($i$03$i2)|0);
    HEAP8[$122>>0] = 0;
   } else {
    $123 = ($119&255)<(6);
    if ($123) {
     $124 = (7 - ($120))|0;
     $125 = $124&255;
     $126 = (($swapped$i) + ($i$03$i2)|0);
     HEAP8[$126>>0] = $125;
     break;
    } else {
     $127 = (($swapped$i) + ($i$03$i2)|0);
     HEAP8[$127>>0] = $119;
     break;
    }
   }
  } while(0);
  $128 = (($i$03$i2) + 1)|0;
  $exitcond$i4 = ($128|0)==(16);
  if ($exitcond$i4) {
   break;
  } else {
   $i$03$i2 = $128;
  }
 }
 HEAP8[$block>>0] = $50;
 $129 = (($block) + 1|0);
 HEAP8[$129>>0] = $48;
 $130 = (($block) + 2|0);
 $131 = (($swapped$i) + 1|0);
 $132 = HEAP8[$swapped$i>>0]|0;
 $133 = $132&255;
 $134 = (($swapped$i) + 2|0);
 $135 = HEAP8[$131>>0]|0;
 $136 = $135&255;
 $137 = $136 << 3;
 $138 = $137 | $133;
 $139 = (($swapped$i) + 3|0);
 $140 = HEAP8[$134>>0]|0;
 $141 = $140&255;
 $142 = $141 << 6;
 $143 = $138 | $142;
 $144 = (($swapped$i) + 4|0);
 $145 = HEAP8[$139>>0]|0;
 $146 = $145&255;
 $147 = $146 << 9;
 $148 = $147 | $143;
 $149 = (($swapped$i) + 5|0);
 $150 = HEAP8[$144>>0]|0;
 $151 = $150&255;
 $152 = $151 << 12;
 $153 = $148 | $152;
 $154 = (($swapped$i) + 6|0);
 $155 = HEAP8[$149>>0]|0;
 $156 = $155&255;
 $157 = $156 << 15;
 $158 = $153 | $157;
 $159 = (($swapped$i) + 7|0);
 $160 = HEAP8[$154>>0]|0;
 $161 = $160&255;
 $162 = $161 << 18;
 $163 = $162 | $158;
 $164 = HEAP8[$159>>0]|0;
 $165 = $164&255;
 $166 = $165 << 21;
 $167 = $163 | $166;
 $scevgep$i$i5 = (($swapped$i) + 8|0);
 $168 = $143&255;
 $169 = (($block) + 3|0);
 HEAP8[$130>>0] = $168;
 $170 = $158 >>> 8;
 $171 = $170&255;
 $172 = (($block) + 4|0);
 HEAP8[$169>>0] = $171;
 $173 = $167 >>> 16;
 $174 = $173&255;
 HEAP8[$172>>0] = $174;
 $scevgep10$i$i6 = (($block) + 5|0);
 $175 = (($swapped$i) + 9|0);
 $176 = HEAP8[$scevgep$i$i5>>0]|0;
 $177 = $176&255;
 $178 = (($swapped$i) + 10|0);
 $179 = HEAP8[$175>>0]|0;
 $180 = $179&255;
 $181 = $180 << 3;
 $182 = $181 | $177;
 $183 = (($swapped$i) + 11|0);
 $184 = HEAP8[$178>>0]|0;
 $185 = $184&255;
 $186 = $185 << 6;
 $187 = $182 | $186;
 $188 = (($swapped$i) + 12|0);
 $189 = HEAP8[$183>>0]|0;
 $190 = $189&255;
 $191 = $190 << 9;
 $192 = $191 | $187;
 $193 = (($swapped$i) + 13|0);
 $194 = HEAP8[$188>>0]|0;
 $195 = $194&255;
 $196 = $195 << 12;
 $197 = $192 | $196;
 $198 = (($swapped$i) + 14|0);
 $199 = HEAP8[$193>>0]|0;
 $200 = $199&255;
 $201 = $200 << 15;
 $202 = $197 | $201;
 $203 = (($swapped$i) + 15|0);
 $204 = HEAP8[$198>>0]|0;
 $205 = $204&255;
 $206 = $205 << 18;
 $207 = $206 | $202;
 $208 = HEAP8[$203>>0]|0;
 $209 = $208&255;
 $210 = $209 << 21;
 $211 = $207 | $210;
 $212 = $187&255;
 $213 = (($block) + 6|0);
 HEAP8[$scevgep10$i$i6>>0] = $212;
 $214 = $202 >>> 8;
 $215 = $214&255;
 $216 = (($block) + 7|0);
 HEAP8[$213>>0] = $215;
 $217 = $211 >>> 16;
 $218 = $217&255;
 HEAP8[$216>>0] = $218;
 STACKTOP = sp;return;
}
function __ZN6squishL8FitCodesEPKhiS1_Ph($rgba,$mask,$codes,$indices) {
 $rgba = $rgba|0;
 $mask = $mask|0;
 $codes = $codes|0;
 $indices = $indices|0;
 var $$least$0$1 = 0, $$least$0$2 = 0, $$least$0$3 = 0, $$least$0$4 = 0, $$least$0$5 = 0, $$least$0$6 = 0, $$least$0$7 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0;
 var $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0;
 var $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0;
 var $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $7 = 0, $8 = 0, $9 = 0, $err$06 = 0, $err$1 = 0, $exitcond = 0, $i$04 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $err$06 = 0;$i$04 = 0;
 while(1) {
  $0 = 1 << $i$04;
  $1 = $0 & $mask;
  $2 = ($1|0)==(0);
  if ($2) {
   $3 = (($indices) + ($i$04)|0);
   HEAP8[$3>>0] = 0;
   $err$1 = $err$06;
  } else {
   $4 = $i$04 << 2;
   $5 = $4 | 3;
   $6 = (($rgba) + ($5)|0);
   $7 = HEAP8[$6>>0]|0;
   $8 = $7&255;
   $9 = HEAP8[$codes>>0]|0;
   $10 = $9&255;
   $11 = (($8) - ($10))|0;
   $12 = Math_imul($11, $11)|0;
   $13 = (($codes) + 1|0);
   $14 = HEAP8[$13>>0]|0;
   $15 = $14&255;
   $16 = (($8) - ($15))|0;
   $17 = Math_imul($16, $16)|0;
   $18 = ($17>>>0)<($12>>>0);
   $$least$0$1 = $18 ? $17 : $12;
   $19 = (($codes) + 2|0);
   $20 = HEAP8[$19>>0]|0;
   $21 = $20&255;
   $22 = (($8) - ($21))|0;
   $23 = Math_imul($22, $22)|0;
   $24 = ($23>>>0)<($$least$0$1>>>0);
   $$least$0$2 = $24 ? $23 : $$least$0$1;
   $25 = (($codes) + 3|0);
   $26 = HEAP8[$25>>0]|0;
   $27 = $26&255;
   $28 = (($8) - ($27))|0;
   $29 = Math_imul($28, $28)|0;
   $30 = ($29>>>0)<($$least$0$2>>>0);
   $$least$0$3 = $30 ? $29 : $$least$0$2;
   $31 = (($codes) + 4|0);
   $32 = HEAP8[$31>>0]|0;
   $33 = $32&255;
   $34 = (($8) - ($33))|0;
   $35 = Math_imul($34, $34)|0;
   $36 = ($35>>>0)<($$least$0$3>>>0);
   $$least$0$4 = $36 ? $35 : $$least$0$3;
   $37 = (($codes) + 5|0);
   $38 = HEAP8[$37>>0]|0;
   $39 = $38&255;
   $40 = (($8) - ($39))|0;
   $41 = Math_imul($40, $40)|0;
   $42 = ($41>>>0)<($$least$0$4>>>0);
   $$least$0$5 = $42 ? $41 : $$least$0$4;
   $43 = (($codes) + 6|0);
   $44 = HEAP8[$43>>0]|0;
   $45 = $44&255;
   $46 = (($8) - ($45))|0;
   $47 = Math_imul($46, $46)|0;
   $48 = ($47>>>0)<($$least$0$5>>>0);
   $$least$0$6 = $48 ? $47 : $$least$0$5;
   $49 = (($codes) + 7|0);
   $50 = HEAP8[$49>>0]|0;
   $51 = $50&255;
   $52 = (($8) - ($51))|0;
   $53 = Math_imul($52, $52)|0;
   $54 = ($53|0)<($$least$0$6|0);
   $$least$0$7 = $54 ? $53 : $$least$0$6;
   $55 = $18&1;
   $56 = $24 ? 2 : $55;
   $57 = $30 ? 3 : $56;
   $58 = $36 ? 4 : $57;
   $59 = $42 ? 5 : $58;
   $60 = $48 ? 6 : $59;
   $61 = $54 ? 7 : $60;
   $62 = (($indices) + ($i$04)|0);
   HEAP8[$62>>0] = $61;
   $63 = (($$least$0$7) + ($err$06))|0;
   $err$1 = $63;
  }
  $64 = (($i$04) + 1)|0;
  $exitcond = ($64|0)==(16);
  if ($exitcond) {
   break;
  } else {
   $err$06 = $err$1;$i$04 = $64;
  }
 }
 STACKTOP = sp;return ($err$1|0);
}
function __ZN6squish19DecompressAlphaDxt5EPhPKv($rgba,$block) {
 $rgba = $rgba|0;
 $block = $block|0;
 var $$phi$trans$insert = 0, $$pre = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0;
 var $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0;
 var $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0;
 var $150 = 0, $151 = 0, $152 = 0, $153 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0;
 var $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0;
 var $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0;
 var $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0;
 var $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $codes = 0, $exitcond = 0, $i4$01 = 0, $indices = 0;
 var $scevgep = 0, $scevgep18 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $codes = sp + 16|0;
 $indices = sp;
 $0 = HEAP8[$block>>0]|0;
 $1 = $0&255;
 $2 = (($block) + 1|0);
 $3 = HEAP8[$2>>0]|0;
 $4 = $3&255;
 HEAP8[$codes>>0] = $0;
 $5 = (($codes) + 1|0);
 HEAP8[$5>>0] = $3;
 $6 = ($0&255)>($3&255);
 if ($6) {
  $31 = ($1*6)|0;
  $32 = (($31) + ($4))|0;
  $33 = (($32>>>0) / 7)&-1;
  $34 = $33&255;
  $35 = (($codes) + 2|0);
  HEAP8[$35>>0] = $34;
  $36 = ($1*5)|0;
  $37 = $4 << 1;
  $38 = (($36) + ($37))|0;
  $39 = (($38>>>0) / 7)&-1;
  $40 = $39&255;
  $41 = (($codes) + 3|0);
  HEAP8[$41>>0] = $40;
  $42 = $1 << 2;
  $43 = ($4*3)|0;
  $44 = (($42) + ($43))|0;
  $45 = (($44>>>0) / 7)&-1;
  $46 = $45&255;
  $47 = (($codes) + 4|0);
  HEAP8[$47>>0] = $46;
  $48 = ($1*3)|0;
  $49 = $4 << 2;
  $50 = (($48) + ($49))|0;
  $51 = (($50>>>0) / 7)&-1;
  $52 = $51&255;
  $53 = (($codes) + 5|0);
  HEAP8[$53>>0] = $52;
  $54 = $1 << 1;
  $55 = ($4*5)|0;
  $56 = (($54) + ($55))|0;
  $57 = (($56>>>0) / 7)&-1;
  $58 = $57&255;
  $59 = (($codes) + 6|0);
  HEAP8[$59>>0] = $58;
  $60 = ($4*6)|0;
  $61 = (($1) + ($60))|0;
  $62 = (($61>>>0) / 7)&-1;
  $63 = $62&255;
  $64 = (($codes) + 7|0);
  HEAP8[$64>>0] = $63;
 } else {
  $7 = $1 << 2;
  $8 = (($7) + ($4))|0;
  $9 = (($8>>>0) / 5)&-1;
  $10 = $9&255;
  $11 = (($codes) + 2|0);
  HEAP8[$11>>0] = $10;
  $12 = ($1*3)|0;
  $13 = $4 << 1;
  $14 = (($12) + ($13))|0;
  $15 = (($14>>>0) / 5)&-1;
  $16 = $15&255;
  $17 = (($codes) + 3|0);
  HEAP8[$17>>0] = $16;
  $18 = $1 << 1;
  $19 = ($4*3)|0;
  $20 = (($18) + ($19))|0;
  $21 = (($20>>>0) / 5)&-1;
  $22 = $21&255;
  $23 = (($codes) + 4|0);
  HEAP8[$23>>0] = $22;
  $24 = $4 << 2;
  $25 = (($1) + ($24))|0;
  $26 = (($25>>>0) / 5)&-1;
  $27 = $26&255;
  $28 = (($codes) + 5|0);
  HEAP8[$28>>0] = $27;
  $29 = (($codes) + 6|0);
  HEAP8[$29>>0] = 0;
  $30 = (($codes) + 7|0);
  HEAP8[$30>>0] = -1;
 }
 $65 = (($block) + 2|0);
 $66 = (($block) + 3|0);
 $67 = HEAP8[$65>>0]|0;
 $68 = $67&255;
 $69 = (($block) + 4|0);
 $70 = HEAP8[$66>>0]|0;
 $71 = $70&255;
 $72 = $71 << 8;
 $73 = $72 | $68;
 $74 = HEAP8[$69>>0]|0;
 $75 = $74&255;
 $76 = $75 << 16;
 $77 = $76 | $72;
 $scevgep = (($block) + 5|0);
 $78 = $68 & 7;
 $79 = $78&255;
 $80 = (($indices) + 1|0);
 HEAP8[$indices>>0] = $79;
 $81 = $68 >>> 3;
 $82 = $81 & 7;
 $83 = $82&255;
 $84 = (($indices) + 2|0);
 HEAP8[$80>>0] = $83;
 $85 = $73 >>> 6;
 $86 = $85 & 7;
 $87 = $86&255;
 $88 = (($indices) + 3|0);
 HEAP8[$84>>0] = $87;
 $89 = $71 >>> 1;
 $90 = $89 & 7;
 $91 = $90&255;
 $92 = (($indices) + 4|0);
 HEAP8[$88>>0] = $91;
 $93 = $71 >>> 4;
 $94 = $93 & 7;
 $95 = $94&255;
 $96 = (($indices) + 5|0);
 HEAP8[$92>>0] = $95;
 $97 = $77 >>> 15;
 $98 = $97 & 7;
 $99 = $98&255;
 $100 = (($indices) + 6|0);
 HEAP8[$96>>0] = $99;
 $101 = $75 >>> 2;
 $102 = $101 & 7;
 $103 = $102&255;
 $104 = (($indices) + 7|0);
 HEAP8[$100>>0] = $103;
 $105 = ($74&255) >>> 5;
 HEAP8[$104>>0] = $105;
 $scevgep18 = (($indices) + 8|0);
 $106 = (($block) + 6|0);
 $107 = HEAP8[$scevgep>>0]|0;
 $108 = $107&255;
 $109 = (($block) + 7|0);
 $110 = HEAP8[$106>>0]|0;
 $111 = $110&255;
 $112 = $111 << 8;
 $113 = $112 | $108;
 $114 = HEAP8[$109>>0]|0;
 $115 = $114&255;
 $116 = $115 << 16;
 $117 = $116 | $112;
 $118 = $108 & 7;
 $119 = $118&255;
 $120 = (($indices) + 9|0);
 HEAP8[$scevgep18>>0] = $119;
 $121 = $108 >>> 3;
 $122 = $121 & 7;
 $123 = $122&255;
 $124 = (($indices) + 10|0);
 HEAP8[$120>>0] = $123;
 $125 = $113 >>> 6;
 $126 = $125 & 7;
 $127 = $126&255;
 $128 = (($indices) + 11|0);
 HEAP8[$124>>0] = $127;
 $129 = $111 >>> 1;
 $130 = $129 & 7;
 $131 = $130&255;
 $132 = (($indices) + 12|0);
 HEAP8[$128>>0] = $131;
 $133 = $111 >>> 4;
 $134 = $133 & 7;
 $135 = $134&255;
 $136 = (($indices) + 13|0);
 HEAP8[$132>>0] = $135;
 $137 = $117 >>> 15;
 $138 = $137 & 7;
 $139 = $138&255;
 $140 = (($indices) + 14|0);
 HEAP8[$136>>0] = $139;
 $141 = $115 >>> 2;
 $142 = $141 & 7;
 $143 = $142&255;
 $144 = (($indices) + 15|0);
 HEAP8[$140>>0] = $143;
 $145 = ($114&255) >>> 5;
 HEAP8[$144>>0] = $145;
 $147 = $79;$i4$01 = 0;
 while(1) {
  $146 = $147&255;
  $148 = (($codes) + ($146)|0);
  $149 = HEAP8[$148>>0]|0;
  $150 = $i4$01 << 2;
  $151 = $150 | 3;
  $152 = (($rgba) + ($151)|0);
  HEAP8[$152>>0] = $149;
  $153 = (($i4$01) + 1)|0;
  $exitcond = ($153|0)==(16);
  if ($exitcond) {
   break;
  }
  $$phi$trans$insert = (($indices) + ($153)|0);
  $$pre = HEAP8[$$phi$trans$insert>>0]|0;
  $147 = $$pre;$i4$01 = $153;
 }
 STACKTOP = sp;return;
}
function __ZN6squish10ClusterFitC2EPKNS_9ColourSetEi($this,$colours,$flags) {
 $this = $this|0;
 $colours = $colours|0;
 $flags = $flags|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $3 = 0;
 var $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $covariance = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $covariance = sp + 16|0;
 $0 = sp;
 __ZN6squish9ColourFitC2EPKNS_9ColourSetEi($this,$colours,$flags);
 HEAP32[$this>>2] = ((8 + 8|0));
 $1 = (($this) + 16|0);
 $2 = (($this) + 8|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = $3 & 256;
 $5 = ($4|0)!=(0);
 $6 = $5 ? 8 : 1;
 $7 = (($this) + 12|0);
 HEAP32[$7>>2] = $6;
 $8 = (($this) + 444|0);
 HEAPF32[$8>>2] = 3.40282346638528859812E+38;
 $9 = (($this) + 448|0);
 HEAPF32[$9>>2] = 3.40282346638528859812E+38;
 $10 = (($this) + 452|0);
 HEAPF32[$10>>2] = 3.40282346638528859812E+38;
 $11 = (($this) + 456|0);
 HEAPF32[$11>>2] = 3.40282346638528859812E+38;
 $12 = $3 & 32;
 $13 = ($12|0)==(0);
 $14 = (($this) + 428|0);
 if ($13) {
  HEAPF32[$14>>2] = 1.0;
  $18 = (($this) + 432|0);
  HEAPF32[$18>>2] = 1.0;
  $19 = (($this) + 436|0);
  HEAPF32[$19>>2] = 1.0;
  $20 = (($this) + 440|0);
  HEAPF32[$20>>2] = 1.0;
 } else {
  HEAPF32[$14>>2] = 0.212599992752075195313;
  $15 = (($this) + 432|0);
  HEAPF32[$15>>2] = 0.715200006961822509765;
  $16 = (($this) + 436|0);
  HEAPF32[$16>>2] = 0.0722000002861022949219;
  $17 = (($this) + 440|0);
  HEAPF32[$17>>2] = 0.0;
 }
 $21 = (($this) + 4|0);
 $22 = HEAP32[$21>>2]|0;
 $23 = HEAP32[$22>>2]|0;
 $24 = (($22) + 4|0);
 $25 = (($22) + 196|0);
 __ZN6squish25ComputeWeightedCovarianceEiPKNS_4Vec3EPKf($covariance,$23,$24,$25);
 __ZN6squish25ComputePrincipleComponentERKNS_6Sym3x3E($0,$covariance);
 ;HEAP32[$1+0>>2]=HEAP32[$0+0>>2]|0;HEAP32[$1+4>>2]=HEAP32[$0+4>>2]|0;HEAP32[$1+8>>2]=HEAP32[$0+8>>2]|0;
 STACKTOP = sp;return;
}
function __ZN6squish10ClusterFit17ConstructOrderingERKNS_4Vec3Ei($this,$axis,$iteration) {
 $this = $this|0;
 $axis = $axis|0;
 $iteration = $iteration|0;
 var $$0 = 0, $$phi$trans$insert = 0, $$pre = 0.0, $$sum = 0, $$sum1 = 0, $$sum2 = 0, $$sum3 = 0, $$sum4 = 0, $$sum5 = 0, $0 = 0, $1 = 0, $10 = 0.0, $11 = 0, $12 = 0.0, $13 = 0.0, $14 = 0.0, $15 = 0.0, $16 = 0, $17 = 0.0, $18 = 0.0;
 var $19 = 0.0, $2 = 0, $20 = 0.0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0.0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0;
 var $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0;
 var $55 = 0, $56 = 0, $57 = 0.0, $58 = 0, $59 = 0.0, $6 = 0, $60 = 0, $61 = 0.0, $62 = 0, $63 = 0.0, $64 = 0.0, $65 = 0.0, $66 = 0.0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0.0, $72 = 0.0;
 var $73 = 0.0, $74 = 0.0, $75 = 0.0, $76 = 0.0, $77 = 0.0, $78 = 0.0, $79 = 0, $8 = 0.0, $9 = 0.0, $dps = 0, $exitcond = 0, $exitcond21 = 0, $exitcond22 = 0, $i$018 = 0, $i1$017 = 0, $i2$09 = 0, $i3$07 = 0, $it$011 = 0, $j$014 = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $dps = sp;
 $0 = (($this) + 4|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = HEAP32[$1>>2]|0;
 $3 = $iteration << 4;
 $4 = ($2|0)>(0);
 if ($4) {
  $5 = (($axis) + 4|0);
  $6 = (($axis) + 8|0);
  $i$018 = 0;
  while(1) {
   $7 = ((($1) + (($i$018*12)|0)|0) + 4|0);
   $8 = +HEAPF32[$7>>2];
   $9 = +HEAPF32[$axis>>2];
   $10 = $8 * $9;
   $11 = ((($1) + (($i$018*12)|0)|0) + 8|0);
   $12 = +HEAPF32[$11>>2];
   $13 = +HEAPF32[$5>>2];
   $14 = $12 * $13;
   $15 = $10 + $14;
   $16 = ((($1) + (($i$018*12)|0)|0) + 12|0);
   $17 = +HEAPF32[$16>>2];
   $18 = +HEAPF32[$6>>2];
   $19 = $17 * $18;
   $20 = $15 + $19;
   $21 = (($dps) + ($i$018<<2)|0);
   HEAPF32[$21>>2] = $20;
   $22 = $i$018&255;
   $$sum5 = (($i$018) + ($3))|0;
   $23 = ((($this) + ($$sum5)|0) + 28|0);
   HEAP8[$23>>0] = $22;
   $24 = (($i$018) + 1)|0;
   $exitcond22 = ($24|0)==($2|0);
   if ($exitcond22) {
    break;
   } else {
    $i$018 = $24;
   }
  }
  if ($4) {
   $i1$017 = 0;
   while(1) {
    $25 = ($i1$017|0)>(0);
    L8: do {
     if ($25) {
      $$phi$trans$insert = (($dps) + ($i1$017<<2)|0);
      $$pre = +HEAPF32[$$phi$trans$insert>>2];
      $j$014 = $i1$017;
      while(1) {
       $27 = (($j$014) + -1)|0;
       $28 = (($dps) + ($27<<2)|0);
       $29 = +HEAPF32[$28>>2];
       $30 = $$pre < $29;
       if (!($30)) {
        break L8;
       }
       $31 = (($dps) + ($j$014<<2)|0);
       HEAPF32[$31>>2] = $29;
       HEAPF32[$28>>2] = $$pre;
       $$sum3 = (($j$014) + ($3))|0;
       $32 = ((($this) + ($$sum3)|0) + 28|0);
       $$sum4 = (($27) + ($3))|0;
       $33 = ((($this) + ($$sum4)|0) + 28|0);
       $34 = HEAP8[$32>>0]|0;
       $35 = HEAP8[$33>>0]|0;
       HEAP8[$32>>0] = $35;
       HEAP8[$33>>0] = $34;
       $36 = ($27|0)>(0);
       if ($36) {
        $j$014 = $27;
       } else {
        break;
       }
      }
     }
    } while(0);
    $37 = (($i1$017) + 1)|0;
    $exitcond21 = ($37|0)==($2|0);
    if ($exitcond21) {
     break;
    } else {
     $i1$017 = $37;
    }
   }
  }
 }
 $26 = ($iteration|0)>(0);
 L15: do {
  if ($26) {
   if ($4) {
    $it$011 = 0;
   } else {
    $$0 = 0;
    STACKTOP = sp;return ($$0|0);
   }
   L19: while(1) {
    $38 = $it$011 << 4;
    $i2$09 = 0;
    while(1) {
     $$sum1 = (($i2$09) + ($3))|0;
     $41 = ((($this) + ($$sum1)|0) + 28|0);
     $42 = HEAP8[$41>>0]|0;
     $$sum2 = (($i2$09) + ($38))|0;
     $43 = ((($this) + ($$sum2)|0) + 28|0);
     $44 = HEAP8[$43>>0]|0;
     $45 = ($42<<24>>24)==($44<<24>>24);
     $40 = (($i2$09) + 1)|0;
     if (!($45)) {
      break;
     }
     $39 = ($40|0)<($2|0);
     if ($39) {
      $i2$09 = $40;
     } else {
      $$0 = 0;
      break L19;
     }
    }
    $46 = (($it$011) + 1)|0;
    $47 = ($46|0)<($iteration|0);
    if ($47) {
     $it$011 = $46;
    } else {
     break L15;
    }
   }
   STACKTOP = sp;return ($$0|0);
  }
 } while(0);
 $48 = HEAP32[$0>>2]|0;
 $49 = (($this) + 412|0);
 $50 = (($this) + 416|0);
 $51 = (($this) + 420|0);
 $52 = (($this) + 424|0);
 ;HEAP32[$49+0>>2]=0|0;HEAP32[$49+4>>2]=0|0;HEAP32[$49+8>>2]=0|0;HEAP32[$49+12>>2]=0|0;
 if ($4) {
  $i3$07 = 0;
 } else {
  $$0 = 1;
  STACKTOP = sp;return ($$0|0);
 }
 while(1) {
  $$sum = (($i3$07) + ($3))|0;
  $53 = ((($this) + ($$sum)|0) + 28|0);
  $54 = HEAP8[$53>>0]|0;
  $55 = $54&255;
  $56 = ((($48) + (($55*12)|0)|0) + 4|0);
  $57 = +HEAPF32[$56>>2];
  $58 = ((($48) + (($55*12)|0)|0) + 8|0);
  $59 = +HEAPF32[$58>>2];
  $60 = ((($48) + (($55*12)|0)|0) + 12|0);
  $61 = +HEAPF32[$60>>2];
  $62 = ((($48) + ($55<<2)|0) + 196|0);
  $63 = +HEAPF32[$62>>2];
  $64 = $57 * $63;
  $65 = $59 * $63;
  $66 = $61 * $63;
  $67 = ((($this) + ($i3$07<<4)|0) + 156|0);
  HEAPF32[$67>>2] = $64;
  $68 = ((($this) + ($i3$07<<4)|0) + 160|0);
  HEAPF32[$68>>2] = $65;
  $69 = ((($this) + ($i3$07<<4)|0) + 164|0);
  HEAPF32[$69>>2] = $66;
  $70 = ((($this) + ($i3$07<<4)|0) + 168|0);
  HEAPF32[$70>>2] = $63;
  $71 = +HEAPF32[$49>>2];
  $72 = $64 + $71;
  HEAPF32[$49>>2] = $72;
  $73 = +HEAPF32[$50>>2];
  $74 = $65 + $73;
  HEAPF32[$50>>2] = $74;
  $75 = +HEAPF32[$51>>2];
  $76 = $66 + $75;
  HEAPF32[$51>>2] = $76;
  $77 = +HEAPF32[$52>>2];
  $78 = $63 + $77;
  HEAPF32[$52>>2] = $78;
  $79 = (($i3$07) + 1)|0;
  $exitcond = ($79|0)==($2|0);
  if ($exitcond) {
   $$0 = 1;
   break;
  } else {
   $i3$07 = $79;
  }
 }
 STACKTOP = sp;return ($$0|0);
}
function __ZN6squish10ClusterFit9Compress3EPv($this,$block) {
 $this = $this|0;
 $block = $block|0;
 var $$115 = 0.0, $$116 = 0.0, $$117 = 0.0, $$119 = 0.0, $$120 = 0.0, $$121 = 0.0, $$122 = 0.0, $$123 = 0.0, $$124 = 0.0, $$125 = 0.0, $$lcssa139 = 0.0, $$lcssa140 = 0.0, $$lcssa141 = 0.0, $$lcssa143 = 0.0, $$lcssa144 = 0.0, $$lcssa145 = 0.0, $$lcssa146 = 0.0, $$lcssa147 = 0.0, $$lcssa148 = 0.0, $$lcssa149 = 0.0;
 var $$op = 0.0, $$op126 = 0.0, $$op127 = 0.0, $$op129 = 0.0, $$op130 = 0.0, $$op131 = 0.0, $$sum = 0, $$sum1 = 0, $$sum2 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0.0, $102 = 0, $103 = 0.0, $104 = 0, $105 = 0, $106 = 0, $107 = 0;
 var $108 = 0.0, $109 = 0, $11 = 0.0, $110 = 0.0, $111 = 0, $112 = 0.0, $113 = 0, $114 = 0, $115 = 0, $116 = 0.0, $117 = 0.0, $118 = 0.0, $119 = 0.0, $12 = 0, $120 = 0.0, $121 = 0.0, $122 = 0, $123 = 0.0, $124 = 0.0, $125 = 0;
 var $126 = 0.0, $127 = 0.0, $128 = 0, $129 = 0.0, $13 = 0.0, $130 = 0.0, $131 = 0.0, $132 = 0.0, $133 = 0.0, $134 = 0.0, $135 = 0.0, $136 = 0.0, $137 = 0.0, $138 = 0.0, $139 = 0.0, $14 = 0, $140 = 0.0, $141 = 0.0, $142 = 0.0, $143 = 0;
 var $144 = 0.0, $145 = 0.0, $146 = 0, $147 = 0.0, $148 = 0.0, $149 = 0, $15 = 0, $150 = 0.0, $151 = 0.0, $152 = 0.0, $153 = 0.0, $154 = 0.0, $155 = 0.0, $156 = 0.0, $157 = 0.0, $158 = 0.0, $159 = 0.0, $16 = 0, $160 = 0.0, $161 = 0.0;
 var $162 = 0.0, $163 = 0.0, $164 = 0.0, $165 = 0.0, $166 = 0.0, $167 = 0.0, $168 = 0.0, $169 = 0.0, $17 = 0, $170 = 0.0, $171 = 0.0, $172 = 0.0, $173 = 0.0, $174 = 0.0, $175 = 0.0, $176 = 0.0, $177 = 0.0, $178 = 0.0, $179 = 0.0, $18 = 0;
 var $180 = 0.0, $181 = 0.0, $182 = 0.0, $183 = 0.0, $184 = 0.0, $185 = 0.0, $186 = 0.0, $187 = 0.0, $188 = 0.0, $189 = 0.0, $19 = 0, $190 = 0.0, $191 = 0.0, $192 = 0.0, $193 = 0.0, $194 = 0.0, $195 = 0.0, $196 = 0.0, $197 = 0.0, $198 = 0.0;
 var $199 = 0.0, $2 = 0, $20 = 0, $200 = 0.0, $201 = 0.0, $202 = 0, $203 = 0.0, $204 = 0, $205 = 0.0, $206 = 0, $207 = 0.0, $208 = 0, $209 = 0.0, $21 = 0, $210 = 0.0, $211 = 0.0, $212 = 0.0, $213 = 0.0, $214 = 0.0, $215 = 0.0;
 var $216 = 0, $217 = 0, $218 = 0.0, $219 = 0.0, $22 = 0, $220 = 0, $221 = 0.0, $222 = 0.0, $223 = 0, $224 = 0.0, $225 = 0.0, $226 = 0, $227 = 0.0, $228 = 0.0, $229 = 0, $23 = 0, $230 = 0, $231 = 0.0, $232 = 0.0, $233 = 0;
 var $234 = 0.0, $235 = 0.0, $236 = 0, $237 = 0.0, $238 = 0.0, $239 = 0, $24 = 0, $240 = 0.0, $241 = 0.0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0.0, $248 = 0.0, $249 = 0.0, $25 = 0, $250 = 0, $251 = 0.0;
 var $252 = 0, $253 = 0.0, $254 = 0, $255 = 0.0, $256 = 0, $257 = 0.0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0;
 var $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0.0, $284 = 0.0, $285 = 0.0, $286 = 0.0, $287 = 0.0, $288 = 0.0;
 var $289 = 0.0, $29 = 0.0, $290 = 0.0, $291 = 0.0, $292 = 0.0, $293 = 0.0, $294 = 0.0, $295 = 0.0, $296 = 0.0, $297 = 0.0, $298 = 0.0, $299 = 0.0, $3 = 0, $30 = 0.0, $300 = 0.0, $301 = 0.0, $302 = 0.0, $303 = 0.0, $304 = 0.0, $305 = 0.0;
 var $306 = 0.0, $31 = 0.0, $32 = 0.0, $33 = 0.0, $34 = 0.0, $35 = 0.0, $36 = 0, $37 = 0.0, $38 = 0.0, $39 = 0.0, $4 = 0, $40 = 0.0, $41 = 0, $42 = 0.0, $43 = 0.0, $44 = 0.0, $45 = 0.0, $46 = 0.0, $47 = 0.0, $48 = 0.0;
 var $49 = 0.0, $5 = 0, $50 = 0.0, $51 = 0.0, $52 = 0.0, $53 = 0.0, $54 = 0.0, $55 = 0.0, $56 = 0.0, $57 = 0.0, $58 = 0.0, $59 = 0.0, $6 = 0, $60 = 0.0, $61 = 0.0, $62 = 0.0, $63 = 0.0, $64 = 0.0, $65 = 0.0, $66 = 0.0;
 var $67 = 0.0, $68 = 0.0, $69 = 0.0, $7 = 0.0, $70 = 0.0, $71 = 0.0, $72 = 0.0, $73 = 0.0, $74 = 0.0, $75 = 0.0, $76 = 0.0, $77 = 0.0, $78 = 0.0, $79 = 0.0, $8 = 0, $80 = 0.0, $81 = 0.0, $82 = 0.0, $83 = 0.0, $84 = 0.0;
 var $85 = 0.0, $86 = 0.0, $87 = 0.0, $88 = 0.0, $89 = 0.0, $9 = 0.0, $90 = 0.0, $91 = 0.0, $92 = 0.0, $93 = 0.0, $94 = 0.0, $95 = 0.0, $96 = 0.0, $97 = 0.0, $98 = 0, $99 = 0.0, $axis = 0, $besti$0 = 0, $besti$1$lcssa = 0, $besti$1152 = 0;
 var $besti$2 = 0, $bestindices = 0, $bestiteration$0 = 0, $bestiteration$0$phi = 0, $bestiteration$1$lcssa = 0, $bestiteration$1$lcssa$lcssa = 0, $bestiteration$1153 = 0, $bestiteration$2 = 0, $bestj$0 = 0, $bestj$1$lcssa = 0, $bestj$1150 = 0, $bestj$2 = 0, $exitcond = 0, $exitcond173 = 0, $exitcond174 = 0, $exitcond175 = 0, $i$0$besti$2 = 0, $i$0151 = 0, $iterationIndex$0 = 0, $iterationIndex$0$bestiteration$2 = 0;
 var $j$0 = 0, $j$0$bestj$2 = 0, $m$0137 = 0, $m1$0135 = 0, $m2$0133 = 0, $or$cond = 0, $or$cond113 = 0, $or$cond114 = 0, $unordered = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 80|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $bestindices = sp + 56|0;
 $axis = sp;
 $unordered = sp + 40|0;
 $0 = sp + 12|0;
 $1 = sp + 24|0;
 $2 = (($this) + 4|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = HEAP32[$3>>2]|0;
 $5 = (($this) + 16|0);
 (__ZN6squish10ClusterFit17ConstructOrderingERKNS_4Vec3Ei($this,$5,0)|0);
 $6 = (($this) + 444|0);
 $7 = +HEAPF32[$6>>2];
 $8 = (($this) + 448|0);
 $9 = +HEAPF32[$8>>2];
 $10 = (($this) + 452|0);
 $11 = +HEAPF32[$10>>2];
 $12 = (($this) + 456|0);
 $13 = +HEAPF32[$12>>2];
 $14 = ($4|0)>(0);
 $15 = (($this) + 12|0);
 $16 = (($axis) + 4|0);
 $17 = (($axis) + 8|0);
 $18 = (($this) + 156|0);
 $19 = (($this) + 160|0);
 $20 = (($this) + 164|0);
 $21 = (($this) + 168|0);
 $22 = (($this) + 412|0);
 $23 = (($this) + 416|0);
 $24 = (($this) + 420|0);
 $25 = (($this) + 424|0);
 $26 = (($this) + 428|0);
 $27 = (($this) + 432|0);
 $28 = (($this) + 436|0);
 $283 = 0.0;$284 = 0.0;$285 = 0.0;$286 = 0.0;$287 = 0.0;$288 = 0.0;$289 = $13;$290 = $11;$291 = $9;$292 = $7;$besti$0 = 0;$bestiteration$0 = 0;$bestj$0 = 0;$iterationIndex$0 = 0;
 while(1) {
  if ($14) {
   $29 = +HEAPF32[$22>>2];
   $30 = +HEAPF32[$23>>2];
   $31 = +HEAPF32[$24>>2];
   $32 = +HEAPF32[$25>>2];
   $33 = +HEAPF32[$26>>2];
   $34 = +HEAPF32[$27>>2];
   $35 = +HEAPF32[$28>>2];
   $293 = $292;$294 = $291;$295 = $290;$296 = $289;$297 = $288;$298 = $287;$299 = $286;$300 = $285;$301 = $284;$302 = $283;$51 = 0.0;$53 = 0.0;$55 = 0.0;$57 = 0.0;$besti$1152 = $besti$0;$bestiteration$1153 = $bestiteration$0;$bestj$1150 = $bestj$0;$i$0151 = 0;
   while(1) {
    $36 = ($i$0151|0)==(0);
    if ($36) {
     $37 = +HEAPF32[$18>>2];
     $38 = +HEAPF32[$19>>2];
     $39 = +HEAPF32[$20>>2];
     $40 = +HEAPF32[$21>>2];
     $303 = $40;$304 = $39;$305 = $38;$306 = $37;
    } else {
     $303 = 0.0;$304 = 0.0;$305 = 0.0;$306 = 0.0;
    }
    $41 = $36 ? 1 : $i$0151;
    $203 = $293;$205 = $294;$207 = $295;$209 = $296;$210 = $302;$211 = $301;$212 = $300;$213 = $299;$214 = $298;$215 = $297;$43 = $306;$45 = $305;$47 = $304;$49 = $303;$besti$2 = $besti$1152;$bestiteration$2 = $bestiteration$1153;$bestj$2 = $bestj$1150;$j$0 = $41;
    while(1) {
     $42 = $29 - $43;
     $44 = $30 - $45;
     $46 = $31 - $47;
     $48 = $32 - $49;
     $50 = $42 - $51;
     $52 = $44 - $53;
     $54 = $46 - $55;
     $56 = $48 - $57;
     $58 = $43 * 0.5;
     $59 = $45 * 0.5;
     $60 = $47 * 0.5;
     $61 = $49 * 0.25;
     $62 = $51 + $58;
     $63 = $53 + $59;
     $64 = $55 + $60;
     $65 = $57 + $61;
     $66 = $58 + $50;
     $67 = $59 + $52;
     $68 = $60 + $54;
     $69 = $61 + $56;
     $70 = $65 * $69;
     $71 = $61 * $61;
     $72 = $70 - $71;
     $73 = 1.0 / $72;
     $74 = $62 * $69;
     $75 = $63 * $69;
     $76 = $64 * $69;
     $77 = $61 * $66;
     $78 = $61 * $67;
     $79 = $61 * $68;
     $80 = $74 - $77;
     $81 = $75 - $78;
     $82 = $76 - $79;
     $83 = $73 * $80;
     $84 = $73 * $81;
     $85 = $73 * $82;
     $86 = $65 * $66;
     $87 = $65 * $67;
     $88 = $65 * $68;
     $89 = $61 * $62;
     $90 = $61 * $63;
     $91 = $61 * $64;
     $92 = $86 - $89;
     $93 = $87 - $90;
     $94 = $88 - $91;
     $95 = $73 * $92;
     $96 = $73 * $93;
     $97 = $73 * $94;
     $98 = $83 > 0.0;
     $99 = $98 ? $83 : 0.0;
     $100 = $84 > 0.0;
     $101 = $100 ? $84 : 0.0;
     $102 = $85 > 0.0;
     $103 = $102 ? $85 : 0.0;
     $104 = $99 < 1.0;
     $105 = $101 < 1.0;
     $106 = $103 < 1.0;
     $107 = $95 > 0.0;
     $108 = $107 ? $95 : 0.0;
     $109 = $96 > 0.0;
     $110 = $109 ? $96 : 0.0;
     $111 = $97 > 0.0;
     $112 = $111 ? $97 : 0.0;
     $113 = $108 < 1.0;
     $114 = $110 < 1.0;
     $115 = $112 < 1.0;
     $$op = $99 * 31.0;
     $116 = $104 ? $$op : 31.0;
     $$op126 = $101 * 63.0;
     $117 = $105 ? $$op126 : 63.0;
     $$op127 = $103 * 31.0;
     $118 = $106 ? $$op127 : 31.0;
     $119 = $116 + 0.5;
     $120 = $117 + 0.5;
     $121 = $118 + 0.5;
     $122 = $119 > 0.0;
     if ($122) {
      $123 = (+Math_floor((+$119)));
      $132 = $123;
     } else {
      $124 = (+Math_ceil((+$119)));
      $132 = $124;
     }
     $125 = $120 > 0.0;
     if ($125) {
      $126 = (+Math_floor((+$120)));
      $134 = $126;
     } else {
      $127 = (+Math_ceil((+$120)));
      $134 = $127;
     }
     $128 = $121 > 0.0;
     if ($128) {
      $129 = (+Math_floor((+$121)));
      $136 = $129;
     } else {
      $130 = (+Math_ceil((+$121)));
      $136 = $130;
     }
     $131 = $132 * 0.0322580635547637939453;
     $133 = $134 * 0.0158730167895555496216;
     $135 = $136 * 0.0322580635547637939453;
     $$op129 = $108 * 31.0;
     $137 = $113 ? $$op129 : 31.0;
     $$op130 = $110 * 63.0;
     $138 = $114 ? $$op130 : 63.0;
     $$op131 = $112 * 31.0;
     $139 = $115 ? $$op131 : 31.0;
     $140 = $137 + 0.5;
     $141 = $138 + 0.5;
     $142 = $139 + 0.5;
     $143 = $140 > 0.0;
     if ($143) {
      $144 = (+Math_floor((+$140)));
      $153 = $144;
     } else {
      $145 = (+Math_ceil((+$140)));
      $153 = $145;
     }
     $146 = $141 > 0.0;
     if ($146) {
      $147 = (+Math_floor((+$141)));
      $155 = $147;
     } else {
      $148 = (+Math_ceil((+$141)));
      $155 = $148;
     }
     $149 = $142 > 0.0;
     if ($149) {
      $150 = (+Math_floor((+$142)));
      $157 = $150;
     } else {
      $151 = (+Math_ceil((+$142)));
      $157 = $151;
     }
     $152 = $153 * 0.0322580635547637939453;
     $154 = $155 * 0.0158730167895555496216;
     $156 = $157 * 0.0322580635547637939453;
     $158 = $131 * $131;
     $159 = $133 * $133;
     $160 = $135 * $135;
     $161 = $152 * $152;
     $162 = $154 * $154;
     $163 = $156 * $156;
     $164 = $69 * $161;
     $165 = $69 * $162;
     $166 = $69 * $163;
     $167 = $65 * $158;
     $168 = $65 * $159;
     $169 = $65 * $160;
     $170 = $167 + $164;
     $171 = $168 + $165;
     $172 = $169 + $166;
     $173 = $131 * $152;
     $174 = $133 * $154;
     $175 = $135 * $156;
     $176 = $61 * $173;
     $177 = $61 * $174;
     $178 = $61 * $175;
     $179 = $62 * $131;
     $180 = $63 * $133;
     $181 = $64 * $135;
     $182 = $176 - $179;
     $183 = $177 - $180;
     $184 = $178 - $181;
     $185 = $66 * $152;
     $186 = $67 * $154;
     $187 = $68 * $156;
     $188 = $182 - $185;
     $189 = $183 - $186;
     $190 = $184 - $187;
     $191 = $188 * 2.0;
     $192 = $189 * 2.0;
     $193 = $190 * 2.0;
     $194 = $170 + $191;
     $195 = $171 + $192;
     $196 = $172 + $193;
     $197 = $194 * $33;
     $198 = $195 * $34;
     $199 = $196 * $35;
     $200 = $197 + $198;
     $201 = $200 + $199;
     $202 = $201 < $203;
     $204 = $201 < $205;
     $or$cond = $202 | $204;
     $206 = $201 < $207;
     $or$cond113 = $or$cond | $206;
     $208 = $201 < $209;
     $or$cond114 = $or$cond113 | $208;
     $$115 = $or$cond114 ? $135 : $210;
     $$116 = $or$cond114 ? $133 : $211;
     $$117 = $or$cond114 ? $131 : $212;
     $$119 = $or$cond114 ? $156 : $213;
     $$120 = $or$cond114 ? $154 : $214;
     $$121 = $or$cond114 ? $152 : $215;
     $$122 = $or$cond114 ? $201 : $209;
     $$123 = $or$cond114 ? $201 : $207;
     $$124 = $or$cond114 ? $201 : $205;
     $$125 = $or$cond114 ? $201 : $203;
     $j$0$bestj$2 = $or$cond114 ? $j$0 : $bestj$2;
     $i$0$besti$2 = $or$cond114 ? $i$0151 : $besti$2;
     $iterationIndex$0$bestiteration$2 = $or$cond114 ? $iterationIndex$0 : $bestiteration$2;
     $216 = ($j$0|0)==($4|0);
     if ($216) {
      break;
     }
     $217 = ((($this) + ($j$0<<4)|0) + 156|0);
     $218 = +HEAPF32[$217>>2];
     $219 = $43 + $218;
     $220 = ((($this) + ($j$0<<4)|0) + 160|0);
     $221 = +HEAPF32[$220>>2];
     $222 = $45 + $221;
     $223 = ((($this) + ($j$0<<4)|0) + 164|0);
     $224 = +HEAPF32[$223>>2];
     $225 = $47 + $224;
     $226 = ((($this) + ($j$0<<4)|0) + 168|0);
     $227 = +HEAPF32[$226>>2];
     $228 = $49 + $227;
     $229 = (($j$0) + 1)|0;
     $203 = $$125;$205 = $$124;$207 = $$123;$209 = $$122;$210 = $$115;$211 = $$116;$212 = $$117;$213 = $$119;$214 = $$120;$215 = $$121;$43 = $219;$45 = $222;$47 = $225;$49 = $228;$besti$2 = $i$0$besti$2;$bestiteration$2 = $iterationIndex$0$bestiteration$2;$bestj$2 = $j$0$bestj$2;$j$0 = $229;
    }
    $230 = ((($this) + ($i$0151<<4)|0) + 156|0);
    $231 = +HEAPF32[$230>>2];
    $232 = $51 + $231;
    $233 = ((($this) + ($i$0151<<4)|0) + 160|0);
    $234 = +HEAPF32[$233>>2];
    $235 = $53 + $234;
    $236 = ((($this) + ($i$0151<<4)|0) + 164|0);
    $237 = +HEAPF32[$236>>2];
    $238 = $55 + $237;
    $239 = ((($this) + ($i$0151<<4)|0) + 168|0);
    $240 = +HEAPF32[$239>>2];
    $241 = $57 + $240;
    $242 = (($i$0151) + 1)|0;
    $exitcond175 = ($242|0)==($4|0);
    if ($exitcond175) {
     $$lcssa139 = $$115;$$lcssa140 = $$116;$$lcssa141 = $$117;$$lcssa143 = $$119;$$lcssa144 = $$120;$$lcssa145 = $$121;$$lcssa146 = $$122;$$lcssa147 = $$123;$$lcssa148 = $$124;$$lcssa149 = $$125;$besti$1$lcssa = $i$0$besti$2;$bestiteration$1$lcssa = $iterationIndex$0$bestiteration$2;$bestj$1$lcssa = $j$0$bestj$2;
     break;
    } else {
     $293 = $$125;$294 = $$124;$295 = $$123;$296 = $$122;$297 = $$121;$298 = $$120;$299 = $$119;$300 = $$117;$301 = $$116;$302 = $$115;$51 = $232;$53 = $235;$55 = $238;$57 = $241;$besti$1152 = $i$0$besti$2;$bestiteration$1153 = $iterationIndex$0$bestiteration$2;$bestj$1150 = $j$0$bestj$2;$i$0151 = $242;
    }
   }
  } else {
   $$lcssa139 = $283;$$lcssa140 = $284;$$lcssa141 = $285;$$lcssa143 = $286;$$lcssa144 = $287;$$lcssa145 = $288;$$lcssa146 = $289;$$lcssa147 = $290;$$lcssa148 = $291;$$lcssa149 = $292;$besti$1$lcssa = $besti$0;$bestiteration$1$lcssa = $bestiteration$0;$bestj$1$lcssa = $bestj$0;
  }
  $243 = ($bestiteration$1$lcssa|0)==($iterationIndex$0|0);
  if (!($243)) {
   $bestiteration$1$lcssa$lcssa = $bestiteration$1$lcssa;
   break;
  }
  $244 = (($iterationIndex$0) + 1)|0;
  $245 = HEAP32[$15>>2]|0;
  $246 = ($244|0)==($245|0);
  if ($246) {
   $bestiteration$1$lcssa$lcssa = $iterationIndex$0;
   break;
  }
  $247 = $$lcssa145 - $$lcssa141;
  $248 = $$lcssa144 - $$lcssa140;
  $249 = $$lcssa143 - $$lcssa139;
  HEAPF32[$axis>>2] = $247;
  HEAPF32[$16>>2] = $248;
  HEAPF32[$17>>2] = $249;
  $250 = (__ZN6squish10ClusterFit17ConstructOrderingERKNS_4Vec3Ei($this,$axis,$244)|0);
  if ($250) {
   $bestiteration$0$phi = $iterationIndex$0;$283 = $$lcssa139;$284 = $$lcssa140;$285 = $$lcssa141;$286 = $$lcssa143;$287 = $$lcssa144;$288 = $$lcssa145;$289 = $$lcssa146;$290 = $$lcssa147;$291 = $$lcssa148;$292 = $$lcssa149;$besti$0 = $besti$1$lcssa;$bestj$0 = $bestj$1$lcssa;$iterationIndex$0 = $244;$bestiteration$0 = $bestiteration$0$phi;
  } else {
   $bestiteration$1$lcssa$lcssa = $iterationIndex$0;
   break;
  }
 }
 $251 = +HEAPF32[$6>>2];
 $252 = $$lcssa149 < $251;
 if (!($252)) {
  $253 = +HEAPF32[$8>>2];
  $254 = $$lcssa148 < $253;
  if (!($254)) {
   $255 = +HEAPF32[$10>>2];
   $256 = $$lcssa147 < $255;
   if (!($256)) {
    $257 = +HEAPF32[$12>>2];
    $258 = $$lcssa146 < $257;
    if (!($258)) {
     STACKTOP = sp;return;
    }
   }
  }
 }
 $259 = $bestiteration$1$lcssa$lcssa << 4;
 $260 = ($besti$1$lcssa|0)>(0);
 if ($260) {
  $m$0137 = 0;
  while(1) {
   $$sum2 = (($m$0137) + ($259))|0;
   $262 = ((($this) + ($$sum2)|0) + 28|0);
   $263 = HEAP8[$262>>0]|0;
   $264 = $263&255;
   $265 = (($unordered) + ($264)|0);
   HEAP8[$265>>0] = 0;
   $266 = (($m$0137) + 1)|0;
   $exitcond174 = ($266|0)==($besti$1$lcssa|0);
   if ($exitcond174) {
    break;
   } else {
    $m$0137 = $266;
   }
  }
 }
 $261 = ($besti$1$lcssa|0)<($bestj$1$lcssa|0);
 if ($261) {
  $m1$0135 = $besti$1$lcssa;
  while(1) {
   $$sum1 = (($m1$0135) + ($259))|0;
   $268 = ((($this) + ($$sum1)|0) + 28|0);
   $269 = HEAP8[$268>>0]|0;
   $270 = $269&255;
   $271 = (($unordered) + ($270)|0);
   HEAP8[$271>>0] = 2;
   $272 = (($m1$0135) + 1)|0;
   $exitcond173 = ($272|0)==($bestj$1$lcssa|0);
   if ($exitcond173) {
    break;
   } else {
    $m1$0135 = $272;
   }
  }
 }
 $267 = ($bestj$1$lcssa|0)<($4|0);
 if ($267) {
  $m2$0133 = $bestj$1$lcssa;
  while(1) {
   $$sum = (($m2$0133) + ($259))|0;
   $273 = ((($this) + ($$sum)|0) + 28|0);
   $274 = HEAP8[$273>>0]|0;
   $275 = $274&255;
   $276 = (($unordered) + ($275)|0);
   HEAP8[$276>>0] = 1;
   $277 = (($m2$0133) + 1)|0;
   $exitcond = ($277|0)==($4|0);
   if ($exitcond) {
    break;
   } else {
    $m2$0133 = $277;
   }
  }
 }
 $278 = HEAP32[$2>>2]|0;
 __ZNK6squish9ColourSet12RemapIndicesEPKhPh($278,$unordered,$bestindices);
 HEAPF32[$0>>2] = $$lcssa141;
 $279 = (($0) + 4|0);
 HEAPF32[$279>>2] = $$lcssa140;
 $280 = (($0) + 8|0);
 HEAPF32[$280>>2] = $$lcssa139;
 HEAPF32[$1>>2] = $$lcssa145;
 $281 = (($1) + 4|0);
 HEAPF32[$281>>2] = $$lcssa144;
 $282 = (($1) + 8|0);
 HEAPF32[$282>>2] = $$lcssa143;
 __ZN6squish17WriteColourBlock3ERKNS_4Vec3ES2_PKhPv($0,$1,$bestindices,$block);
 HEAPF32[$6>>2] = $$lcssa149;
 HEAPF32[$8>>2] = $$lcssa148;
 HEAPF32[$10>>2] = $$lcssa147;
 HEAPF32[$12>>2] = $$lcssa146;
 STACKTOP = sp;return;
}
function __ZN6squish10ClusterFit9Compress4EPv($this,$block) {
 $this = $this|0;
 $block = $block|0;
 var $$132 = 0.0, $$133 = 0.0, $$134 = 0.0, $$136 = 0.0, $$137 = 0.0, $$138 = 0.0, $$139 = 0.0, $$140 = 0.0, $$141 = 0.0, $$142 = 0.0, $$lcssa160 = 0.0, $$lcssa161 = 0.0, $$lcssa162 = 0.0, $$lcssa164 = 0.0, $$lcssa165 = 0.0, $$lcssa166 = 0.0, $$lcssa167 = 0.0, $$lcssa168 = 0.0, $$lcssa169 = 0.0, $$lcssa170 = 0.0;
 var $$op = 0.0, $$op143 = 0.0, $$op144 = 0.0, $$op146 = 0.0, $$op147 = 0.0, $$op148 = 0.0, $$sum = 0, $$sum1 = 0, $$sum2 = 0, $$sum3 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0.0, $101 = 0.0, $102 = 0.0, $103 = 0.0, $104 = 0.0, $105 = 0.0, $106 = 0.0;
 var $107 = 0.0, $108 = 0.0, $109 = 0.0, $11 = 0.0, $110 = 0.0, $111 = 0.0, $112 = 0.0, $113 = 0.0, $114 = 0.0, $115 = 0.0, $116 = 0.0, $117 = 0.0, $118 = 0.0, $119 = 0.0, $12 = 0, $120 = 0.0, $121 = 0.0, $122 = 0.0, $123 = 0.0, $124 = 0.0;
 var $125 = 0.0, $126 = 0.0, $127 = 0.0, $128 = 0, $129 = 0.0, $13 = 0.0, $130 = 0, $131 = 0.0, $132 = 0, $133 = 0.0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0.0, $139 = 0, $14 = 0, $140 = 0.0, $141 = 0, $142 = 0.0;
 var $143 = 0, $144 = 0, $145 = 0, $146 = 0.0, $147 = 0.0, $148 = 0.0, $149 = 0.0, $15 = 0, $150 = 0.0, $151 = 0.0, $152 = 0, $153 = 0.0, $154 = 0.0, $155 = 0, $156 = 0.0, $157 = 0.0, $158 = 0, $159 = 0.0, $16 = 0, $160 = 0.0;
 var $161 = 0.0, $162 = 0.0, $163 = 0.0, $164 = 0.0, $165 = 0.0, $166 = 0.0, $167 = 0.0, $168 = 0.0, $169 = 0.0, $17 = 0, $170 = 0.0, $171 = 0.0, $172 = 0.0, $173 = 0, $174 = 0.0, $175 = 0.0, $176 = 0, $177 = 0.0, $178 = 0.0, $179 = 0;
 var $18 = 0, $180 = 0.0, $181 = 0.0, $182 = 0.0, $183 = 0.0, $184 = 0.0, $185 = 0.0, $186 = 0.0, $187 = 0.0, $188 = 0.0, $189 = 0.0, $19 = 0, $190 = 0.0, $191 = 0.0, $192 = 0.0, $193 = 0.0, $194 = 0.0, $195 = 0.0, $196 = 0.0, $197 = 0.0;
 var $198 = 0.0, $199 = 0.0, $2 = 0, $20 = 0, $200 = 0.0, $201 = 0.0, $202 = 0.0, $203 = 0.0, $204 = 0.0, $205 = 0.0, $206 = 0.0, $207 = 0.0, $208 = 0.0, $209 = 0.0, $21 = 0, $210 = 0.0, $211 = 0.0, $212 = 0.0, $213 = 0.0, $214 = 0.0;
 var $215 = 0.0, $216 = 0.0, $217 = 0.0, $218 = 0.0, $219 = 0.0, $22 = 0, $220 = 0.0, $221 = 0.0, $222 = 0.0, $223 = 0.0, $224 = 0.0, $225 = 0.0, $226 = 0.0, $227 = 0.0, $228 = 0.0, $229 = 0.0, $23 = 0, $230 = 0.0, $231 = 0.0, $232 = 0;
 var $233 = 0.0, $234 = 0, $235 = 0.0, $236 = 0, $237 = 0.0, $238 = 0, $239 = 0.0, $24 = 0, $240 = 0.0, $241 = 0.0, $242 = 0.0, $243 = 0.0, $244 = 0.0, $245 = 0.0, $246 = 0, $247 = 0, $248 = 0.0, $249 = 0.0, $25 = 0, $250 = 0;
 var $251 = 0.0, $252 = 0.0, $253 = 0, $254 = 0.0, $255 = 0.0, $256 = 0, $257 = 0.0, $258 = 0.0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0.0, $263 = 0.0, $264 = 0, $265 = 0.0, $266 = 0.0, $267 = 0, $268 = 0.0, $269 = 0.0;
 var $27 = 0, $270 = 0, $271 = 0.0, $272 = 0.0, $273 = 0, $274 = 0, $275 = 0.0, $276 = 0.0, $277 = 0, $278 = 0.0, $279 = 0.0, $28 = 0, $280 = 0, $281 = 0.0, $282 = 0.0, $283 = 0, $284 = 0.0, $285 = 0.0, $286 = 0, $287 = 0;
 var $288 = 0, $289 = 0, $29 = 0.0, $290 = 0, $291 = 0.0, $292 = 0.0, $293 = 0.0, $294 = 0, $295 = 0.0, $296 = 0, $297 = 0.0, $298 = 0, $299 = 0.0, $3 = 0, $30 = 0.0, $300 = 0, $301 = 0.0, $302 = 0, $303 = 0, $304 = 0;
 var $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0.0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0.0, $320 = 0, $321 = 0, $322 = 0;
 var $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0.0, $330 = 0, $331 = 0, $332 = 0, $333 = 0.0, $334 = 0.0, $335 = 0.0, $336 = 0.0, $337 = 0.0, $338 = 0.0, $339 = 0.0, $34 = 0.0, $340 = 0.0;
 var $341 = 0.0, $342 = 0.0, $343 = 0.0, $344 = 0.0, $345 = 0.0, $346 = 0.0, $347 = 0.0, $348 = 0.0, $349 = 0.0, $35 = 0.0, $350 = 0.0, $351 = 0.0, $352 = 0.0, $353 = 0.0, $354 = 0.0, $355 = 0.0, $356 = 0.0, $357 = 0.0, $358 = 0.0, $359 = 0.0;
 var $36 = 0, $360 = 0.0, $361 = 0.0, $362 = 0.0, $363 = 0.0, $364 = 0.0, $365 = 0.0, $366 = 0.0, $37 = 0.0, $38 = 0.0, $39 = 0.0, $4 = 0, $40 = 0.0, $41 = 0, $42 = 0.0, $43 = 0.0, $44 = 0.0, $45 = 0.0, $46 = 0.0, $47 = 0.0;
 var $48 = 0.0, $49 = 0.0, $5 = 0, $50 = 0.0, $51 = 0.0, $52 = 0.0, $53 = 0.0, $54 = 0.0, $55 = 0.0, $56 = 0.0, $57 = 0.0, $58 = 0.0, $59 = 0.0, $6 = 0, $60 = 0.0, $61 = 0.0, $62 = 0.0, $63 = 0.0, $64 = 0.0, $65 = 0.0;
 var $66 = 0.0, $67 = 0.0, $68 = 0.0, $69 = 0.0, $7 = 0.0, $70 = 0.0, $71 = 0.0, $72 = 0.0, $73 = 0.0, $74 = 0.0, $75 = 0.0, $76 = 0.0, $77 = 0.0, $78 = 0.0, $79 = 0.0, $8 = 0, $80 = 0.0, $81 = 0.0, $82 = 0.0, $83 = 0.0;
 var $84 = 0.0, $85 = 0.0, $86 = 0.0, $87 = 0.0, $88 = 0.0, $89 = 0.0, $9 = 0.0, $90 = 0.0, $91 = 0.0, $92 = 0.0, $93 = 0.0, $94 = 0.0, $95 = 0.0, $96 = 0.0, $97 = 0.0, $98 = 0.0, $99 = 0.0, $axis = 0, $besti$0 = 0, $besti$1$lcssa = 0;
 var $besti$1174 = 0, $besti$2 = 0, $besti$3 = 0, $bestindices = 0, $bestiteration$0 = 0, $bestiteration$0$phi = 0, $bestiteration$1$lcssa = 0, $bestiteration$1$lcssa$lcssa = 0, $bestiteration$1175 = 0, $bestiteration$2 = 0, $bestiteration$3 = 0, $bestj$0 = 0, $bestj$1$lcssa = 0, $bestj$1171 = 0, $bestj$2 = 0, $bestj$3 = 0, $bestk$0 = 0, $bestk$1$lcssa = 0, $bestk$1172 = 0, $bestk$2 = 0;
 var $bestk$3 = 0, $exitcond = 0, $exitcond195 = 0, $exitcond196 = 0, $exitcond197 = 0, $exitcond198 = 0, $i$0$besti$3 = 0, $i$0173 = 0, $iterationIndex$0 = 0, $iterationIndex$0$bestiteration$3 = 0, $j$0 = 0, $j$0$bestj$3 = 0, $k$0 = 0, $k$0$bestk$3 = 0, $m$0157 = 0, $m1$0155 = 0, $m2$0152 = 0, $m3$0150 = 0, $or$cond = 0, $or$cond130 = 0;
 var $or$cond131 = 0, $unordered = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 80|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $bestindices = sp + 56|0;
 $axis = sp;
 $unordered = sp + 40|0;
 $0 = sp + 12|0;
 $1 = sp + 24|0;
 $2 = (($this) + 4|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = HEAP32[$3>>2]|0;
 $5 = (($this) + 16|0);
 (__ZN6squish10ClusterFit17ConstructOrderingERKNS_4Vec3Ei($this,$5,0)|0);
 $6 = (($this) + 444|0);
 $7 = +HEAPF32[$6>>2];
 $8 = (($this) + 448|0);
 $9 = +HEAPF32[$8>>2];
 $10 = (($this) + 452|0);
 $11 = +HEAPF32[$10>>2];
 $12 = (($this) + 456|0);
 $13 = +HEAPF32[$12>>2];
 $14 = ($4|0)>(0);
 $15 = (($this) + 12|0);
 $16 = (($axis) + 4|0);
 $17 = (($axis) + 8|0);
 $18 = (($this) + 156|0);
 $19 = (($this) + 160|0);
 $20 = (($this) + 164|0);
 $21 = (($this) + 168|0);
 $22 = (($this) + 412|0);
 $23 = (($this) + 416|0);
 $24 = (($this) + 420|0);
 $25 = (($this) + 424|0);
 $26 = (($this) + 428|0);
 $27 = (($this) + 432|0);
 $28 = (($this) + 436|0);
 $333 = 0.0;$334 = 0.0;$335 = 0.0;$336 = 0.0;$337 = 0.0;$338 = 0.0;$339 = $13;$340 = $11;$341 = $9;$342 = $7;$besti$0 = 0;$bestiteration$0 = 0;$bestj$0 = 0;$bestk$0 = 0;$iterationIndex$0 = 0;
 while(1) {
  if ($14) {
   $29 = +HEAPF32[$22>>2];
   $30 = +HEAPF32[$23>>2];
   $31 = +HEAPF32[$24>>2];
   $32 = +HEAPF32[$25>>2];
   $33 = +HEAPF32[$26>>2];
   $34 = +HEAPF32[$27>>2];
   $35 = +HEAPF32[$28>>2];
   $343 = $342;$344 = $341;$345 = $340;$346 = $339;$347 = $338;$348 = $337;$349 = $336;$350 = $335;$351 = $334;$352 = $333;$51 = 0.0;$53 = 0.0;$55 = 0.0;$57 = 0.0;$besti$1174 = $besti$0;$bestiteration$1175 = $bestiteration$0;$bestj$1171 = $bestj$0;$bestk$1172 = $bestk$0;$i$0173 = 0;
   while(1) {
    $353 = $352;$354 = $351;$355 = $350;$356 = $349;$357 = $348;$358 = $347;$359 = $346;$360 = $345;$361 = $344;$362 = $343;$43 = 0.0;$45 = 0.0;$47 = 0.0;$49 = 0.0;$besti$2 = $besti$1174;$bestiteration$2 = $bestiteration$1175;$bestj$2 = $bestj$1171;$bestk$2 = $bestk$1172;$j$0 = $i$0173;
    while(1) {
     $36 = ($j$0|0)==(0);
     if ($36) {
      $37 = +HEAPF32[$18>>2];
      $38 = +HEAPF32[$19>>2];
      $39 = +HEAPF32[$20>>2];
      $40 = +HEAPF32[$21>>2];
      $363 = $40;$364 = $39;$365 = $38;$366 = $37;
     } else {
      $363 = 0.0;$364 = 0.0;$365 = 0.0;$366 = 0.0;
     }
     $41 = $36 ? 1 : $j$0;
     $42 = $43 * 0.666666686534881591796;
     $44 = $45 * 0.666666686534881591796;
     $46 = $47 * 0.666666686534881591796;
     $48 = $49 * 0.444444447755813598633;
     $50 = $51 + $42;
     $52 = $53 + $44;
     $54 = $55 + $46;
     $56 = $57 + $48;
     $58 = $43 * 0.333333343267440795898;
     $59 = $45 * 0.333333343267440795898;
     $60 = $47 * 0.333333343267440795898;
     $61 = $49 * 0.111111111938953399658;
     $233 = $362;$235 = $361;$237 = $360;$239 = $359;$240 = $353;$241 = $354;$242 = $355;$243 = $356;$244 = $357;$245 = $358;$63 = $366;$65 = $365;$67 = $364;$69 = $363;$besti$3 = $besti$2;$bestiteration$3 = $bestiteration$2;$bestj$3 = $bestj$2;$bestk$3 = $bestk$2;$k$0 = $41;
     while(1) {
      $62 = $29 - $63;
      $64 = $30 - $65;
      $66 = $31 - $67;
      $68 = $32 - $69;
      $70 = $62 - $43;
      $71 = $64 - $45;
      $72 = $66 - $47;
      $73 = $68 - $49;
      $74 = $70 - $51;
      $75 = $71 - $53;
      $76 = $72 - $55;
      $77 = $73 - $57;
      $78 = $63 * 0.333333343267440795898;
      $79 = $65 * 0.333333343267440795898;
      $80 = $67 * 0.333333343267440795898;
      $81 = $69 * 0.111111111938953399658;
      $82 = $50 + $78;
      $83 = $52 + $79;
      $84 = $54 + $80;
      $85 = $56 + $81;
      $86 = $63 * 0.666666686534881591796;
      $87 = $65 * 0.666666686534881591796;
      $88 = $67 * 0.666666686534881591796;
      $89 = $69 * 0.444444447755813598633;
      $90 = $86 + $74;
      $91 = $87 + $75;
      $92 = $88 + $76;
      $93 = $89 + $77;
      $94 = $58 + $90;
      $95 = $59 + $91;
      $96 = $60 + $92;
      $97 = $61 + $93;
      $98 = $49 + $69;
      $99 = $98 * 0.222222223877906799316;
      $100 = $85 * $97;
      $101 = $99 * $99;
      $102 = $100 - $101;
      $103 = 1.0 / $102;
      $104 = $82 * $97;
      $105 = $83 * $97;
      $106 = $84 * $97;
      $107 = $99 * $94;
      $108 = $99 * $95;
      $109 = $99 * $96;
      $110 = $104 - $107;
      $111 = $105 - $108;
      $112 = $106 - $109;
      $113 = $103 * $110;
      $114 = $103 * $111;
      $115 = $103 * $112;
      $116 = $85 * $94;
      $117 = $85 * $95;
      $118 = $85 * $96;
      $119 = $99 * $82;
      $120 = $99 * $83;
      $121 = $99 * $84;
      $122 = $116 - $119;
      $123 = $117 - $120;
      $124 = $118 - $121;
      $125 = $103 * $122;
      $126 = $103 * $123;
      $127 = $103 * $124;
      $128 = $113 > 0.0;
      $129 = $128 ? $113 : 0.0;
      $130 = $114 > 0.0;
      $131 = $130 ? $114 : 0.0;
      $132 = $115 > 0.0;
      $133 = $132 ? $115 : 0.0;
      $134 = $129 < 1.0;
      $135 = $131 < 1.0;
      $136 = $133 < 1.0;
      $137 = $125 > 0.0;
      $138 = $137 ? $125 : 0.0;
      $139 = $126 > 0.0;
      $140 = $139 ? $126 : 0.0;
      $141 = $127 > 0.0;
      $142 = $141 ? $127 : 0.0;
      $143 = $138 < 1.0;
      $144 = $140 < 1.0;
      $145 = $142 < 1.0;
      $$op = $129 * 31.0;
      $146 = $134 ? $$op : 31.0;
      $$op143 = $131 * 63.0;
      $147 = $135 ? $$op143 : 63.0;
      $$op144 = $133 * 31.0;
      $148 = $136 ? $$op144 : 31.0;
      $149 = $146 + 0.5;
      $150 = $147 + 0.5;
      $151 = $148 + 0.5;
      $152 = $149 > 0.0;
      if ($152) {
       $153 = (+Math_floor((+$149)));
       $162 = $153;
      } else {
       $154 = (+Math_ceil((+$149)));
       $162 = $154;
      }
      $155 = $150 > 0.0;
      if ($155) {
       $156 = (+Math_floor((+$150)));
       $164 = $156;
      } else {
       $157 = (+Math_ceil((+$150)));
       $164 = $157;
      }
      $158 = $151 > 0.0;
      if ($158) {
       $159 = (+Math_floor((+$151)));
       $166 = $159;
      } else {
       $160 = (+Math_ceil((+$151)));
       $166 = $160;
      }
      $161 = $162 * 0.0322580635547637939453;
      $163 = $164 * 0.0158730167895555496216;
      $165 = $166 * 0.0322580635547637939453;
      $$op146 = $138 * 31.0;
      $167 = $143 ? $$op146 : 31.0;
      $$op147 = $140 * 63.0;
      $168 = $144 ? $$op147 : 63.0;
      $$op148 = $142 * 31.0;
      $169 = $145 ? $$op148 : 31.0;
      $170 = $167 + 0.5;
      $171 = $168 + 0.5;
      $172 = $169 + 0.5;
      $173 = $170 > 0.0;
      if ($173) {
       $174 = (+Math_floor((+$170)));
       $183 = $174;
      } else {
       $175 = (+Math_ceil((+$170)));
       $183 = $175;
      }
      $176 = $171 > 0.0;
      if ($176) {
       $177 = (+Math_floor((+$171)));
       $185 = $177;
      } else {
       $178 = (+Math_ceil((+$171)));
       $185 = $178;
      }
      $179 = $172 > 0.0;
      if ($179) {
       $180 = (+Math_floor((+$172)));
       $187 = $180;
      } else {
       $181 = (+Math_ceil((+$172)));
       $187 = $181;
      }
      $182 = $183 * 0.0322580635547637939453;
      $184 = $185 * 0.0158730167895555496216;
      $186 = $187 * 0.0322580635547637939453;
      $188 = $161 * $161;
      $189 = $163 * $163;
      $190 = $165 * $165;
      $191 = $182 * $182;
      $192 = $184 * $184;
      $193 = $186 * $186;
      $194 = $97 * $191;
      $195 = $97 * $192;
      $196 = $97 * $193;
      $197 = $85 * $188;
      $198 = $85 * $189;
      $199 = $85 * $190;
      $200 = $197 + $194;
      $201 = $198 + $195;
      $202 = $199 + $196;
      $203 = $161 * $182;
      $204 = $163 * $184;
      $205 = $165 * $186;
      $206 = $99 * $203;
      $207 = $99 * $204;
      $208 = $99 * $205;
      $209 = $82 * $161;
      $210 = $83 * $163;
      $211 = $84 * $165;
      $212 = $206 - $209;
      $213 = $207 - $210;
      $214 = $208 - $211;
      $215 = $94 * $182;
      $216 = $95 * $184;
      $217 = $96 * $186;
      $218 = $212 - $215;
      $219 = $213 - $216;
      $220 = $214 - $217;
      $221 = $218 * 2.0;
      $222 = $219 * 2.0;
      $223 = $220 * 2.0;
      $224 = $200 + $221;
      $225 = $201 + $222;
      $226 = $202 + $223;
      $227 = $224 * $33;
      $228 = $225 * $34;
      $229 = $226 * $35;
      $230 = $227 + $228;
      $231 = $230 + $229;
      $232 = $231 < $233;
      $234 = $231 < $235;
      $or$cond = $232 | $234;
      $236 = $231 < $237;
      $or$cond130 = $or$cond | $236;
      $238 = $231 < $239;
      $or$cond131 = $or$cond130 | $238;
      $$132 = $or$cond131 ? $165 : $240;
      $$133 = $or$cond131 ? $163 : $241;
      $$134 = $or$cond131 ? $161 : $242;
      $$136 = $or$cond131 ? $186 : $243;
      $$137 = $or$cond131 ? $184 : $244;
      $$138 = $or$cond131 ? $182 : $245;
      $$139 = $or$cond131 ? $231 : $239;
      $$140 = $or$cond131 ? $231 : $237;
      $$141 = $or$cond131 ? $231 : $235;
      $$142 = $or$cond131 ? $231 : $233;
      $j$0$bestj$3 = $or$cond131 ? $j$0 : $bestj$3;
      $k$0$bestk$3 = $or$cond131 ? $k$0 : $bestk$3;
      $i$0$besti$3 = $or$cond131 ? $i$0173 : $besti$3;
      $iterationIndex$0$bestiteration$3 = $or$cond131 ? $iterationIndex$0 : $bestiteration$3;
      $246 = ($k$0|0)==($4|0);
      if ($246) {
       break;
      }
      $247 = ((($this) + ($k$0<<4)|0) + 156|0);
      $248 = +HEAPF32[$247>>2];
      $249 = $63 + $248;
      $250 = ((($this) + ($k$0<<4)|0) + 160|0);
      $251 = +HEAPF32[$250>>2];
      $252 = $65 + $251;
      $253 = ((($this) + ($k$0<<4)|0) + 164|0);
      $254 = +HEAPF32[$253>>2];
      $255 = $67 + $254;
      $256 = ((($this) + ($k$0<<4)|0) + 168|0);
      $257 = +HEAPF32[$256>>2];
      $258 = $69 + $257;
      $259 = (($k$0) + 1)|0;
      $233 = $$142;$235 = $$141;$237 = $$140;$239 = $$139;$240 = $$132;$241 = $$133;$242 = $$134;$243 = $$136;$244 = $$137;$245 = $$138;$63 = $249;$65 = $252;$67 = $255;$69 = $258;$besti$3 = $i$0$besti$3;$bestiteration$3 = $iterationIndex$0$bestiteration$3;$bestj$3 = $j$0$bestj$3;$bestk$3 = $k$0$bestk$3;$k$0 = $259;
     }
     $260 = ($j$0|0)==($4|0);
     if ($260) {
      break;
     }
     $261 = ((($this) + ($j$0<<4)|0) + 156|0);
     $262 = +HEAPF32[$261>>2];
     $263 = $43 + $262;
     $264 = ((($this) + ($j$0<<4)|0) + 160|0);
     $265 = +HEAPF32[$264>>2];
     $266 = $45 + $265;
     $267 = ((($this) + ($j$0<<4)|0) + 164|0);
     $268 = +HEAPF32[$267>>2];
     $269 = $47 + $268;
     $270 = ((($this) + ($j$0<<4)|0) + 168|0);
     $271 = +HEAPF32[$270>>2];
     $272 = $49 + $271;
     $273 = (($j$0) + 1)|0;
     $353 = $$132;$354 = $$133;$355 = $$134;$356 = $$136;$357 = $$137;$358 = $$138;$359 = $$139;$360 = $$140;$361 = $$141;$362 = $$142;$43 = $263;$45 = $266;$47 = $269;$49 = $272;$besti$2 = $i$0$besti$3;$bestiteration$2 = $iterationIndex$0$bestiteration$3;$bestj$2 = $j$0$bestj$3;$bestk$2 = $k$0$bestk$3;$j$0 = $273;
    }
    $274 = ((($this) + ($i$0173<<4)|0) + 156|0);
    $275 = +HEAPF32[$274>>2];
    $276 = $51 + $275;
    $277 = ((($this) + ($i$0173<<4)|0) + 160|0);
    $278 = +HEAPF32[$277>>2];
    $279 = $53 + $278;
    $280 = ((($this) + ($i$0173<<4)|0) + 164|0);
    $281 = +HEAPF32[$280>>2];
    $282 = $55 + $281;
    $283 = ((($this) + ($i$0173<<4)|0) + 168|0);
    $284 = +HEAPF32[$283>>2];
    $285 = $57 + $284;
    $286 = (($i$0173) + 1)|0;
    $exitcond198 = ($286|0)==($4|0);
    if ($exitcond198) {
     $$lcssa160 = $$132;$$lcssa161 = $$133;$$lcssa162 = $$134;$$lcssa164 = $$136;$$lcssa165 = $$137;$$lcssa166 = $$138;$$lcssa167 = $$139;$$lcssa168 = $$140;$$lcssa169 = $$141;$$lcssa170 = $$142;$besti$1$lcssa = $i$0$besti$3;$bestiteration$1$lcssa = $iterationIndex$0$bestiteration$3;$bestj$1$lcssa = $j$0$bestj$3;$bestk$1$lcssa = $k$0$bestk$3;
     break;
    } else {
     $343 = $$142;$344 = $$141;$345 = $$140;$346 = $$139;$347 = $$138;$348 = $$137;$349 = $$136;$350 = $$134;$351 = $$133;$352 = $$132;$51 = $276;$53 = $279;$55 = $282;$57 = $285;$besti$1174 = $i$0$besti$3;$bestiteration$1175 = $iterationIndex$0$bestiteration$3;$bestj$1171 = $j$0$bestj$3;$bestk$1172 = $k$0$bestk$3;$i$0173 = $286;
    }
   }
  } else {
   $$lcssa160 = $333;$$lcssa161 = $334;$$lcssa162 = $335;$$lcssa164 = $336;$$lcssa165 = $337;$$lcssa166 = $338;$$lcssa167 = $339;$$lcssa168 = $340;$$lcssa169 = $341;$$lcssa170 = $342;$besti$1$lcssa = $besti$0;$bestiteration$1$lcssa = $bestiteration$0;$bestj$1$lcssa = $bestj$0;$bestk$1$lcssa = $bestk$0;
  }
  $287 = ($bestiteration$1$lcssa|0)==($iterationIndex$0|0);
  if (!($287)) {
   $bestiteration$1$lcssa$lcssa = $bestiteration$1$lcssa;
   break;
  }
  $288 = (($iterationIndex$0) + 1)|0;
  $289 = HEAP32[$15>>2]|0;
  $290 = ($288|0)==($289|0);
  if ($290) {
   $bestiteration$1$lcssa$lcssa = $iterationIndex$0;
   break;
  }
  $291 = $$lcssa166 - $$lcssa162;
  $292 = $$lcssa165 - $$lcssa161;
  $293 = $$lcssa164 - $$lcssa160;
  HEAPF32[$axis>>2] = $291;
  HEAPF32[$16>>2] = $292;
  HEAPF32[$17>>2] = $293;
  $294 = (__ZN6squish10ClusterFit17ConstructOrderingERKNS_4Vec3Ei($this,$axis,$288)|0);
  if ($294) {
   $bestiteration$0$phi = $iterationIndex$0;$333 = $$lcssa160;$334 = $$lcssa161;$335 = $$lcssa162;$336 = $$lcssa164;$337 = $$lcssa165;$338 = $$lcssa166;$339 = $$lcssa167;$340 = $$lcssa168;$341 = $$lcssa169;$342 = $$lcssa170;$besti$0 = $besti$1$lcssa;$bestj$0 = $bestj$1$lcssa;$bestk$0 = $bestk$1$lcssa;$iterationIndex$0 = $288;$bestiteration$0 = $bestiteration$0$phi;
  } else {
   $bestiteration$1$lcssa$lcssa = $iterationIndex$0;
   break;
  }
 }
 $295 = +HEAPF32[$6>>2];
 $296 = $$lcssa170 < $295;
 if (!($296)) {
  $297 = +HEAPF32[$8>>2];
  $298 = $$lcssa169 < $297;
  if (!($298)) {
   $299 = +HEAPF32[$10>>2];
   $300 = $$lcssa168 < $299;
   if (!($300)) {
    $301 = +HEAPF32[$12>>2];
    $302 = $$lcssa167 < $301;
    if (!($302)) {
     STACKTOP = sp;return;
    }
   }
  }
 }
 $303 = $bestiteration$1$lcssa$lcssa << 4;
 $304 = ($besti$1$lcssa|0)>(0);
 if ($304) {
  $m$0157 = 0;
  while(1) {
   $$sum3 = (($m$0157) + ($303))|0;
   $306 = ((($this) + ($$sum3)|0) + 28|0);
   $307 = HEAP8[$306>>0]|0;
   $308 = $307&255;
   $309 = (($unordered) + ($308)|0);
   HEAP8[$309>>0] = 0;
   $310 = (($m$0157) + 1)|0;
   $exitcond197 = ($310|0)==($besti$1$lcssa|0);
   if ($exitcond197) {
    break;
   } else {
    $m$0157 = $310;
   }
  }
 }
 $305 = ($besti$1$lcssa|0)<($bestj$1$lcssa|0);
 if ($305) {
  $m1$0155 = $besti$1$lcssa;
  while(1) {
   $$sum2 = (($m1$0155) + ($303))|0;
   $312 = ((($this) + ($$sum2)|0) + 28|0);
   $313 = HEAP8[$312>>0]|0;
   $314 = $313&255;
   $315 = (($unordered) + ($314)|0);
   HEAP8[$315>>0] = 2;
   $316 = (($m1$0155) + 1)|0;
   $exitcond196 = ($316|0)==($bestj$1$lcssa|0);
   if ($exitcond196) {
    break;
   } else {
    $m1$0155 = $316;
   }
  }
 }
 $311 = ($bestj$1$lcssa|0)<($bestk$1$lcssa|0);
 if ($311) {
  $m2$0152 = $bestj$1$lcssa;
  while(1) {
   $$sum1 = (($m2$0152) + ($303))|0;
   $318 = ((($this) + ($$sum1)|0) + 28|0);
   $319 = HEAP8[$318>>0]|0;
   $320 = $319&255;
   $321 = (($unordered) + ($320)|0);
   HEAP8[$321>>0] = 3;
   $322 = (($m2$0152) + 1)|0;
   $exitcond195 = ($322|0)==($bestk$1$lcssa|0);
   if ($exitcond195) {
    break;
   } else {
    $m2$0152 = $322;
   }
  }
 }
 $317 = ($bestk$1$lcssa|0)<($4|0);
 if ($317) {
  $m3$0150 = $bestk$1$lcssa;
  while(1) {
   $$sum = (($m3$0150) + ($303))|0;
   $323 = ((($this) + ($$sum)|0) + 28|0);
   $324 = HEAP8[$323>>0]|0;
   $325 = $324&255;
   $326 = (($unordered) + ($325)|0);
   HEAP8[$326>>0] = 1;
   $327 = (($m3$0150) + 1)|0;
   $exitcond = ($327|0)==($4|0);
   if ($exitcond) {
    break;
   } else {
    $m3$0150 = $327;
   }
  }
 }
 $328 = HEAP32[$2>>2]|0;
 __ZNK6squish9ColourSet12RemapIndicesEPKhPh($328,$unordered,$bestindices);
 HEAPF32[$0>>2] = $$lcssa162;
 $329 = (($0) + 4|0);
 HEAPF32[$329>>2] = $$lcssa161;
 $330 = (($0) + 8|0);
 HEAPF32[$330>>2] = $$lcssa160;
 HEAPF32[$1>>2] = $$lcssa166;
 $331 = (($1) + 4|0);
 HEAPF32[$331>>2] = $$lcssa165;
 $332 = (($1) + 8|0);
 HEAPF32[$332>>2] = $$lcssa164;
 __ZN6squish17WriteColourBlock4ERKNS_4Vec3ES2_PKhPv($0,$1,$bestindices,$block);
 HEAPF32[$6>>2] = $$lcssa170;
 HEAPF32[$8>>2] = $$lcssa169;
 HEAPF32[$10>>2] = $$lcssa168;
 HEAPF32[$12>>2] = $$lcssa167;
 STACKTOP = sp;return;
}
function __ZN6squish17WriteColourBlock3ERKNS_4Vec3ES2_PKhPv($start,$end,$indices,$block) {
 $start = $start|0;
 $end = $end|0;
 $indices = $indices|0;
 $block = $block|0;
 var $$op$i = 0, $$op$i1 = 0, $$op6$i = 0, $$op6$i4 = 0, $0 = 0.0, $1 = 0.0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0;
 var $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0;
 var $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0.0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $15 = 0.0, $16 = 0.0;
 var $17 = 0, $18 = 0, $19 = 0, $2 = 0.0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0.0, $26 = 0.0, $27 = 0.0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0.0, $33 = 0.0, $34 = 0.0;
 var $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0.0, $4 = 0, $40 = 0.0, $41 = 0.0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0;
 var $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0.0, $70 = 0;
 var $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0.0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0;
 var $9 = 0.0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $exitcond = 0, $i1$09 = 0, $limit$$i$i = 0, $limit$$i$i7 = 0, $phitmp$i = 0, $phitmp$i2 = 0, $phitmp5$i = 0, $phitmp5$i5 = 0, $remapped = 0;
 var dest = 0, label = 0, sp = 0, src = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $remapped = sp;
 $0 = +HEAPF32[$start>>2];
 $1 = $0 * 31.0;
 $2 = $1 + 0.5;
 $3 = (~~(($2)));
 $4 = ($3|0)<(0);
 if ($4) {
  $22 = 0;
 } else {
  $5 = ($3|0)>(31);
  $$op$i = $3 << 11;
  $phitmp$i = $5 ? 63488 : $$op$i;
  $22 = $phitmp$i;
 }
 $6 = (($start) + 4|0);
 $7 = +HEAPF32[$6>>2];
 $8 = $7 * 63.0;
 $9 = $8 + 0.5;
 $10 = (~~(($9)));
 $11 = ($10|0)<(0);
 if ($11) {
  $21 = 0;
 } else {
  $12 = ($10|0)>(63);
  $$op6$i = $10 << 5;
  $phitmp5$i = $12 ? 2016 : $$op6$i;
  $21 = $phitmp5$i;
 }
 $13 = (($start) + 8|0);
 $14 = +HEAPF32[$13>>2];
 $15 = $14 * 31.0;
 $16 = $15 + 0.5;
 $17 = (~~(($16)));
 $18 = ($17|0)<(0);
 if ($18) {
  $24 = 0;
 } else {
  $19 = ($17|0)>(31);
  $limit$$i$i = $19 ? 31 : $17;
  $24 = $limit$$i$i;
 }
 $20 = $21 | $22;
 $23 = $20 | $24;
 $25 = +HEAPF32[$end>>2];
 $26 = $25 * 31.0;
 $27 = $26 + 0.5;
 $28 = (~~(($27)));
 $29 = ($28|0)<(0);
 if ($29) {
  $47 = 0;
 } else {
  $30 = ($28|0)>(31);
  $$op$i1 = $28 << 11;
  $phitmp$i2 = $30 ? 63488 : $$op$i1;
  $47 = $phitmp$i2;
 }
 $31 = (($end) + 4|0);
 $32 = +HEAPF32[$31>>2];
 $33 = $32 * 63.0;
 $34 = $33 + 0.5;
 $35 = (~~(($34)));
 $36 = ($35|0)<(0);
 if ($36) {
  $46 = 0;
 } else {
  $37 = ($35|0)>(63);
  $$op6$i4 = $35 << 5;
  $phitmp5$i5 = $37 ? 2016 : $$op6$i4;
  $46 = $phitmp5$i5;
 }
 $38 = (($end) + 8|0);
 $39 = +HEAPF32[$38>>2];
 $40 = $39 * 31.0;
 $41 = $40 + 0.5;
 $42 = (~~(($41)));
 $43 = ($42|0)<(0);
 if ($43) {
  $49 = 0;
 } else {
  $44 = ($42|0)>(31);
  $limit$$i$i7 = $44 ? 31 : $42;
  $49 = $limit$$i$i7;
 }
 $45 = $46 | $47;
 $48 = $45 | $49;
 $50 = ($23|0)>($48|0);
 if ($50) {
  $i1$09 = 0;
  while(1) {
   $51 = (($indices) + ($i1$09)|0);
   $52 = HEAP8[$51>>0]|0;
   if ((($52<<24>>24) == 0)) {
    $53 = (($remapped) + ($i1$09)|0);
    HEAP8[$53>>0] = 1;
   } else if ((($52<<24>>24) == 1)) {
    $54 = (($remapped) + ($i1$09)|0);
    HEAP8[$54>>0] = 0;
   } else {
    $55 = (($remapped) + ($i1$09)|0);
    HEAP8[$55>>0] = $52;
   }
   $56 = (($i1$09) + 1)|0;
   $exitcond = ($56|0)==(16);
   if ($exitcond) {
    $58 = $48;$63 = $23;
    break;
   } else {
    $i1$09 = $56;
   }
  }
 } else {
  dest=$remapped+0|0; src=$indices+0|0; stop=dest+16|0; do { HEAP8[dest>>0]=HEAP8[src>>0]|0; dest=dest+1|0; src=src+1|0; } while ((dest|0) < (stop|0));
  $58 = $23;$63 = $48;
 }
 $57 = $58&255;
 HEAP8[$block>>0] = $57;
 $59 = $58 >>> 8;
 $60 = $59&255;
 $61 = (($block) + 1|0);
 HEAP8[$61>>0] = $60;
 $62 = $63&255;
 $64 = (($block) + 2|0);
 HEAP8[$64>>0] = $62;
 $65 = $63 >>> 8;
 $66 = $65&255;
 $67 = (($block) + 3|0);
 HEAP8[$67>>0] = $66;
 $68 = HEAP8[$remapped>>0]|0;
 $69 = $68&255;
 $70 = (($remapped) + 1|0);
 $71 = HEAP8[$70>>0]|0;
 $72 = $71&255;
 $73 = $72 << 2;
 $74 = $73 | $69;
 $75 = (($remapped) + 2|0);
 $76 = HEAP8[$75>>0]|0;
 $77 = $76&255;
 $78 = $77 << 4;
 $79 = $74 | $78;
 $80 = (($remapped) + 3|0);
 $81 = HEAP8[$80>>0]|0;
 $82 = $81&255;
 $83 = $82 << 6;
 $84 = $79 | $83;
 $85 = $84&255;
 $86 = (($block) + 4|0);
 HEAP8[$86>>0] = $85;
 $87 = (($remapped) + 4|0);
 $88 = HEAP8[$87>>0]|0;
 $89 = $88&255;
 $90 = (($remapped) + 5|0);
 $91 = HEAP8[$90>>0]|0;
 $92 = $91&255;
 $93 = $92 << 2;
 $94 = $93 | $89;
 $95 = (($remapped) + 6|0);
 $96 = HEAP8[$95>>0]|0;
 $97 = $96&255;
 $98 = $97 << 4;
 $99 = $94 | $98;
 $100 = (($remapped) + 7|0);
 $101 = HEAP8[$100>>0]|0;
 $102 = $101&255;
 $103 = $102 << 6;
 $104 = $99 | $103;
 $105 = $104&255;
 $106 = (($block) + 5|0);
 HEAP8[$106>>0] = $105;
 $107 = (($remapped) + 8|0);
 $108 = HEAP8[$107>>0]|0;
 $109 = $108&255;
 $110 = (($remapped) + 9|0);
 $111 = HEAP8[$110>>0]|0;
 $112 = $111&255;
 $113 = $112 << 2;
 $114 = $113 | $109;
 $115 = (($remapped) + 10|0);
 $116 = HEAP8[$115>>0]|0;
 $117 = $116&255;
 $118 = $117 << 4;
 $119 = $114 | $118;
 $120 = (($remapped) + 11|0);
 $121 = HEAP8[$120>>0]|0;
 $122 = $121&255;
 $123 = $122 << 6;
 $124 = $119 | $123;
 $125 = $124&255;
 $126 = (($block) + 6|0);
 HEAP8[$126>>0] = $125;
 $127 = (($remapped) + 12|0);
 $128 = HEAP8[$127>>0]|0;
 $129 = $128&255;
 $130 = (($remapped) + 13|0);
 $131 = HEAP8[$130>>0]|0;
 $132 = $131&255;
 $133 = $132 << 2;
 $134 = $133 | $129;
 $135 = (($remapped) + 14|0);
 $136 = HEAP8[$135>>0]|0;
 $137 = $136&255;
 $138 = $137 << 4;
 $139 = $134 | $138;
 $140 = (($remapped) + 15|0);
 $141 = HEAP8[$140>>0]|0;
 $142 = $141&255;
 $143 = $142 << 6;
 $144 = $139 | $143;
 $145 = $144&255;
 $146 = (($block) + 7|0);
 HEAP8[$146>>0] = $145;
 STACKTOP = sp;return;
}
function __ZN6squish17WriteColourBlock4ERKNS_4Vec3ES2_PKhPv($start,$end,$indices,$block) {
 $start = $start|0;
 $end = $end|0;
 $indices = $indices|0;
 $block = $block|0;
 var $$op$i = 0, $$op$i1 = 0, $$op6$i = 0, $$op6$i4 = 0, $0 = 0.0, $1 = 0.0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0;
 var $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0;
 var $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0.0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0;
 var $149 = 0, $15 = 0.0, $16 = 0.0, $17 = 0, $18 = 0, $19 = 0, $2 = 0.0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0.0, $26 = 0.0, $27 = 0.0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0;
 var $32 = 0.0, $33 = 0.0, $34 = 0.0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0.0, $4 = 0, $40 = 0.0, $41 = 0.0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0;
 var $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0;
 var $69 = 0, $7 = 0.0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0.0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0;
 var $87 = 0, $88 = 0, $89 = 0, $9 = 0.0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $exitcond = 0, $i$09 = 0, $limit$$i$i = 0, $limit$$i$i7 = 0, $phitmp$i = 0, $phitmp$i2 = 0;
 var $phitmp5$i = 0, $phitmp5$i5 = 0, $remapped = 0, dest = 0, label = 0, sp = 0, src = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $remapped = sp;
 $0 = +HEAPF32[$start>>2];
 $1 = $0 * 31.0;
 $2 = $1 + 0.5;
 $3 = (~~(($2)));
 $4 = ($3|0)<(0);
 if ($4) {
  $22 = 0;
 } else {
  $5 = ($3|0)>(31);
  $$op$i = $3 << 11;
  $phitmp$i = $5 ? 63488 : $$op$i;
  $22 = $phitmp$i;
 }
 $6 = (($start) + 4|0);
 $7 = +HEAPF32[$6>>2];
 $8 = $7 * 63.0;
 $9 = $8 + 0.5;
 $10 = (~~(($9)));
 $11 = ($10|0)<(0);
 if ($11) {
  $21 = 0;
 } else {
  $12 = ($10|0)>(63);
  $$op6$i = $10 << 5;
  $phitmp5$i = $12 ? 2016 : $$op6$i;
  $21 = $phitmp5$i;
 }
 $13 = (($start) + 8|0);
 $14 = +HEAPF32[$13>>2];
 $15 = $14 * 31.0;
 $16 = $15 + 0.5;
 $17 = (~~(($16)));
 $18 = ($17|0)<(0);
 if ($18) {
  $24 = 0;
 } else {
  $19 = ($17|0)>(31);
  $limit$$i$i = $19 ? 31 : $17;
  $24 = $limit$$i$i;
 }
 $20 = $21 | $22;
 $23 = $20 | $24;
 $25 = +HEAPF32[$end>>2];
 $26 = $25 * 31.0;
 $27 = $26 + 0.5;
 $28 = (~~(($27)));
 $29 = ($28|0)<(0);
 if ($29) {
  $47 = 0;
 } else {
  $30 = ($28|0)>(31);
  $$op$i1 = $28 << 11;
  $phitmp$i2 = $30 ? 63488 : $$op$i1;
  $47 = $phitmp$i2;
 }
 $31 = (($end) + 4|0);
 $32 = +HEAPF32[$31>>2];
 $33 = $32 * 63.0;
 $34 = $33 + 0.5;
 $35 = (~~(($34)));
 $36 = ($35|0)<(0);
 if ($36) {
  $46 = 0;
 } else {
  $37 = ($35|0)>(63);
  $$op6$i4 = $35 << 5;
  $phitmp5$i5 = $37 ? 2016 : $$op6$i4;
  $46 = $phitmp5$i5;
 }
 $38 = (($end) + 8|0);
 $39 = +HEAPF32[$38>>2];
 $40 = $39 * 31.0;
 $41 = $40 + 0.5;
 $42 = (~~(($41)));
 $43 = ($42|0)<(0);
 if ($43) {
  $49 = 0;
 } else {
  $44 = ($42|0)>(31);
  $limit$$i$i7 = $44 ? 31 : $42;
  $49 = $limit$$i$i7;
 }
 $45 = $46 | $47;
 $48 = $45 | $49;
 $50 = ($23|0)<($48|0);
 do {
  if ($50) {
   $i$09 = 0;
   while(1) {
    $51 = (($indices) + ($i$09)|0);
    $52 = HEAP8[$51>>0]|0;
    $53 = $52&255;
    $54 = $53 & 3;
    $55 = $54 ^ 1;
    $56 = $55&255;
    $57 = (($remapped) + ($i$09)|0);
    HEAP8[$57>>0] = $56;
    $58 = (($i$09) + 1)|0;
    $exitcond = ($58|0)==(16);
    if ($exitcond) {
     $61 = $48;$66 = $23;
     break;
    } else {
     $i$09 = $58;
    }
   }
  } else {
   $59 = ($23|0)==($48|0);
   if ($59) {
    dest=$remapped+0|0; stop=dest+16|0; do { HEAP8[dest>>0]=0|0; dest=dest+1|0; } while ((dest|0) < (stop|0));
    $61 = $23;$66 = $23;
    break;
   } else {
    dest=$remapped+0|0; src=$indices+0|0; stop=dest+16|0; do { HEAP8[dest>>0]=HEAP8[src>>0]|0; dest=dest+1|0; src=src+1|0; } while ((dest|0) < (stop|0));
    $61 = $23;$66 = $48;
    break;
   }
  }
 } while(0);
 $60 = $61&255;
 HEAP8[$block>>0] = $60;
 $62 = $61 >>> 8;
 $63 = $62&255;
 $64 = (($block) + 1|0);
 HEAP8[$64>>0] = $63;
 $65 = $66&255;
 $67 = (($block) + 2|0);
 HEAP8[$67>>0] = $65;
 $68 = $66 >>> 8;
 $69 = $68&255;
 $70 = (($block) + 3|0);
 HEAP8[$70>>0] = $69;
 $71 = HEAP8[$remapped>>0]|0;
 $72 = $71&255;
 $73 = (($remapped) + 1|0);
 $74 = HEAP8[$73>>0]|0;
 $75 = $74&255;
 $76 = $75 << 2;
 $77 = $76 | $72;
 $78 = (($remapped) + 2|0);
 $79 = HEAP8[$78>>0]|0;
 $80 = $79&255;
 $81 = $80 << 4;
 $82 = $77 | $81;
 $83 = (($remapped) + 3|0);
 $84 = HEAP8[$83>>0]|0;
 $85 = $84&255;
 $86 = $85 << 6;
 $87 = $82 | $86;
 $88 = $87&255;
 $89 = (($block) + 4|0);
 HEAP8[$89>>0] = $88;
 $90 = (($remapped) + 4|0);
 $91 = HEAP8[$90>>0]|0;
 $92 = $91&255;
 $93 = (($remapped) + 5|0);
 $94 = HEAP8[$93>>0]|0;
 $95 = $94&255;
 $96 = $95 << 2;
 $97 = $96 | $92;
 $98 = (($remapped) + 6|0);
 $99 = HEAP8[$98>>0]|0;
 $100 = $99&255;
 $101 = $100 << 4;
 $102 = $97 | $101;
 $103 = (($remapped) + 7|0);
 $104 = HEAP8[$103>>0]|0;
 $105 = $104&255;
 $106 = $105 << 6;
 $107 = $102 | $106;
 $108 = $107&255;
 $109 = (($block) + 5|0);
 HEAP8[$109>>0] = $108;
 $110 = (($remapped) + 8|0);
 $111 = HEAP8[$110>>0]|0;
 $112 = $111&255;
 $113 = (($remapped) + 9|0);
 $114 = HEAP8[$113>>0]|0;
 $115 = $114&255;
 $116 = $115 << 2;
 $117 = $116 | $112;
 $118 = (($remapped) + 10|0);
 $119 = HEAP8[$118>>0]|0;
 $120 = $119&255;
 $121 = $120 << 4;
 $122 = $117 | $121;
 $123 = (($remapped) + 11|0);
 $124 = HEAP8[$123>>0]|0;
 $125 = $124&255;
 $126 = $125 << 6;
 $127 = $122 | $126;
 $128 = $127&255;
 $129 = (($block) + 6|0);
 HEAP8[$129>>0] = $128;
 $130 = (($remapped) + 12|0);
 $131 = HEAP8[$130>>0]|0;
 $132 = $131&255;
 $133 = (($remapped) + 13|0);
 $134 = HEAP8[$133>>0]|0;
 $135 = $134&255;
 $136 = $135 << 2;
 $137 = $136 | $132;
 $138 = (($remapped) + 14|0);
 $139 = HEAP8[$138>>0]|0;
 $140 = $139&255;
 $141 = $140 << 4;
 $142 = $137 | $141;
 $143 = (($remapped) + 15|0);
 $144 = HEAP8[$143>>0]|0;
 $145 = $144&255;
 $146 = $145 << 6;
 $147 = $142 | $146;
 $148 = $147&255;
 $149 = (($block) + 7|0);
 HEAP8[$149>>0] = $148;
 STACKTOP = sp;return;
}
function __ZN6squish16DecompressColourEPhPKvb($rgba,$block,$isDxt1) {
 $rgba = $rgba|0;
 $block = $block|0;
 $isDxt1 = $isDxt1|0;
 var $$idx = 0, $$idx$val = 0, $$phi$trans$insert = 0, $$pre = 0, $$val = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0;
 var $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0;
 var $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0;
 var $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0;
 var $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0;
 var $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0;
 var $block$idx = 0, $block$idx$val = 0, $block$val = 0, $codes = 0, $exitcond = 0, $i2$06 = 0, $indices = 0, $isDxt1$not = 0, $or$cond = 0, $phitmp1 = 0, $phitmp1$ = 0, $scevgep = 0, $scevgep9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $codes = sp + 16|0;
 $indices = sp;
 $block$val = HEAP8[$block>>0]|0;
 $block$idx = (($block) + 1|0);
 $block$idx$val = HEAP8[$block$idx>>0]|0;
 $0 = $block$val&255;
 $1 = $block$idx$val&255;
 $2 = $1 << 8;
 $3 = $2 | $0;
 $4 = ($block$idx$val&255) >>> 3;
 $5 = $3 >>> 5;
 $6 = $4&255;
 $7 = $6 << 3;
 $8 = $6 >>> 2;
 $9 = $7 | $8;
 $10 = $9&255;
 HEAP8[$codes>>0] = $10;
 $11 = $5 << 2;
 $12 = $1 >>> 1;
 $13 = $12 & 3;
 $14 = $11 | $13;
 $15 = $14&255;
 $16 = (($codes) + 1|0);
 HEAP8[$16>>0] = $15;
 $17 = $0 << 3;
 $18 = $0 >>> 2;
 $19 = $18 & 7;
 $20 = $19 | $17;
 $21 = $20&255;
 $22 = (($codes) + 2|0);
 HEAP8[$22>>0] = $21;
 $23 = (($codes) + 3|0);
 HEAP8[$23>>0] = -1;
 $24 = (($block) + 2|0);
 $25 = (($codes) + 4|0);
 $$val = HEAP8[$24>>0]|0;
 $$idx = (($block) + 3|0);
 $$idx$val = HEAP8[$$idx>>0]|0;
 $26 = $$val&255;
 $27 = $$idx$val&255;
 $28 = $27 << 8;
 $29 = $28 | $26;
 $30 = ($$idx$val&255) >>> 3;
 $31 = $29 >>> 5;
 $32 = $30&255;
 $33 = $32 << 3;
 $34 = $32 >>> 2;
 $35 = $33 | $34;
 $36 = $35&255;
 HEAP8[$25>>0] = $36;
 $37 = $31 << 2;
 $38 = $27 >>> 1;
 $39 = $38 & 3;
 $40 = $37 | $39;
 $41 = $40&255;
 $42 = (($codes) + 5|0);
 HEAP8[$42>>0] = $41;
 $43 = $26 << 3;
 $44 = $26 >>> 2;
 $45 = $44 & 7;
 $46 = $45 | $43;
 $47 = $46&255;
 $48 = (($codes) + 6|0);
 HEAP8[$48>>0] = $47;
 $49 = (($codes) + 7|0);
 HEAP8[$49>>0] = -1;
 $isDxt1$not = $isDxt1 ^ 1;
 $50 = ($3>>>0)>($29>>>0);
 $or$cond = $50 | $isDxt1$not;
 if ($or$cond) {
  $141 = $9 << 1;
  $142 = (($141) + ($35))|0;
  $143 = (($142>>>0) / 3)&-1;
  $144 = $143&255;
  $145 = (($codes) + 8|0);
  HEAP8[$145>>0] = $144;
  $146 = $35 << 1;
  $147 = (($146) + ($9))|0;
  $148 = (($147>>>0) / 3)&-1;
  $149 = $148&255;
  $150 = (($codes) + 12|0);
  HEAP8[$150>>0] = $149;
  $151 = $14 & 255;
  $152 = $40 & 255;
  $153 = $151 << 1;
  $154 = (($153) + ($152))|0;
  $155 = (($154>>>0) / 3)&-1;
  $156 = $155&255;
  $157 = (($codes) + 9|0);
  HEAP8[$157>>0] = $156;
  $158 = $152 << 1;
  $159 = (($158) + ($151))|0;
  $160 = (($159>>>0) / 3)&-1;
  $161 = $160&255;
  $162 = (($codes) + 13|0);
  HEAP8[$162>>0] = $161;
  $163 = $20 & 255;
  $164 = $46 & 255;
  $165 = $163 << 1;
  $166 = (($165) + ($164))|0;
  $167 = (($166>>>0) / 3)&-1;
  $168 = $167&255;
  $169 = (($codes) + 10|0);
  HEAP8[$169>>0] = $168;
  $170 = $164 << 1;
  $171 = (($170) + ($163))|0;
  $172 = (($171>>>0) / 3)&-1;
  $173 = $172&255;
  $174 = (($codes) + 14|0);
  HEAP8[$174>>0] = $173;
 } else {
  $122 = (($35) + ($9))|0;
  $123 = $122 >>> 1;
  $124 = $123&255;
  $125 = (($codes) + 8|0);
  HEAP8[$125>>0] = $124;
  $126 = (($codes) + 12|0);
  HEAP8[$126>>0] = 0;
  $127 = $40 & 255;
  $128 = $14 & 255;
  $129 = (($127) + ($128))|0;
  $130 = $129 >>> 1;
  $131 = $130&255;
  $132 = (($codes) + 9|0);
  HEAP8[$132>>0] = $131;
  $133 = (($codes) + 13|0);
  HEAP8[$133>>0] = 0;
  $134 = $46 & 255;
  $135 = $20 & 255;
  $136 = (($134) + ($135))|0;
  $137 = $136 >>> 1;
  $138 = $137&255;
  $139 = (($codes) + 10|0);
  HEAP8[$139>>0] = $138;
  $140 = (($codes) + 14|0);
  HEAP8[$140>>0] = 0;
 }
 $51 = (($codes) + 11|0);
 HEAP8[$51>>0] = -1;
 $phitmp1 = $50 << 31 >> 31;
 $phitmp1$ = $isDxt1 ? $phitmp1 : -1;
 $52 = (($codes) + 15|0);
 HEAP8[$52>>0] = $phitmp1$;
 $53 = (($block) + 4|0);
 $54 = HEAP8[$53>>0]|0;
 $55 = $54&255;
 $56 = $55 & 3;
 $57 = $56&255;
 HEAP8[$indices>>0] = $57;
 $58 = $55 >>> 2;
 $59 = $58 & 3;
 $60 = $59&255;
 $61 = (($indices) + 1|0);
 HEAP8[$61>>0] = $60;
 $62 = $55 >>> 4;
 $63 = $62 & 3;
 $64 = $63&255;
 $65 = (($indices) + 2|0);
 HEAP8[$65>>0] = $64;
 $66 = ($54&255) >>> 6;
 $67 = (($indices) + 3|0);
 HEAP8[$67>>0] = $66;
 $68 = (($indices) + 4|0);
 $69 = (($block) + 5|0);
 $70 = HEAP8[$69>>0]|0;
 $71 = $70&255;
 $72 = $71 & 3;
 $73 = $72&255;
 HEAP8[$68>>0] = $73;
 $74 = $71 >>> 2;
 $75 = $74 & 3;
 $76 = $75&255;
 $77 = (($indices) + 5|0);
 HEAP8[$77>>0] = $76;
 $78 = $71 >>> 4;
 $79 = $78 & 3;
 $80 = $79&255;
 $81 = (($indices) + 6|0);
 HEAP8[$81>>0] = $80;
 $82 = ($70&255) >>> 6;
 $83 = (($indices) + 7|0);
 HEAP8[$83>>0] = $82;
 $84 = (($indices) + 8|0);
 $85 = (($block) + 6|0);
 $86 = HEAP8[$85>>0]|0;
 $87 = $86&255;
 $88 = $87 & 3;
 $89 = $88&255;
 HEAP8[$84>>0] = $89;
 $90 = $87 >>> 2;
 $91 = $90 & 3;
 $92 = $91&255;
 $93 = (($indices) + 9|0);
 HEAP8[$93>>0] = $92;
 $94 = $87 >>> 4;
 $95 = $94 & 3;
 $96 = $95&255;
 $97 = (($indices) + 10|0);
 HEAP8[$97>>0] = $96;
 $98 = ($86&255) >>> 6;
 $99 = (($indices) + 11|0);
 HEAP8[$99>>0] = $98;
 $100 = (($indices) + 12|0);
 $101 = (($block) + 7|0);
 $102 = HEAP8[$101>>0]|0;
 $103 = $102&255;
 $104 = $103 & 3;
 $105 = $104&255;
 HEAP8[$100>>0] = $105;
 $106 = $103 >>> 2;
 $107 = $106 & 3;
 $108 = $107&255;
 $109 = (($indices) + 13|0);
 HEAP8[$109>>0] = $108;
 $110 = $103 >>> 4;
 $111 = $110 & 3;
 $112 = $111&255;
 $113 = (($indices) + 14|0);
 HEAP8[$113>>0] = $112;
 $114 = ($102&255) >>> 6;
 $115 = (($indices) + 15|0);
 HEAP8[$115>>0] = $114;
 $118 = $57;$i2$06 = 0;
 while(1) {
  $116 = $i2$06 << 2;
  $scevgep = (($rgba) + ($116)|0);
  $117 = ($118 << 2)&255;
  $119 = $117&255;
  $scevgep9 = (($codes) + ($119)|0);
  $120 = HEAPU8[$scevgep9>>0]|(HEAPU8[$scevgep9+1>>0]<<8)|(HEAPU8[$scevgep9+2>>0]<<16)|(HEAPU8[$scevgep9+3>>0]<<24);
  HEAP8[$scevgep>>0]=$120&255;HEAP8[$scevgep+1>>0]=($120>>8)&255;HEAP8[$scevgep+2>>0]=($120>>16)&255;HEAP8[$scevgep+3>>0]=$120>>24;
  $121 = (($i2$06) + 1)|0;
  $exitcond = ($121|0)==(16);
  if ($exitcond) {
   break;
  }
  $$phi$trans$insert = (($indices) + ($121)|0);
  $$pre = HEAP8[$$phi$trans$insert>>0]|0;
  $118 = $$pre;$i2$06 = $121;
 }
 STACKTOP = sp;return;
}
function __ZN6squish9ColourFitC2EPKNS_9ColourSetEi($this,$colours,$flags) {
 $this = $this|0;
 $colours = $colours|0;
 $flags = $flags|0;
 var $0 = 0, $1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 HEAP32[$this>>2] = ((96 + 8|0));
 $0 = (($this) + 4|0);
 HEAP32[$0>>2] = $colours;
 $1 = (($this) + 8|0);
 HEAP32[$1>>2] = $flags;
 STACKTOP = sp;return;
}
function __ZN6squish9ColourFit8CompressEPv($this,$block) {
 $this = $this|0;
 $block = $block|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($this) + 8|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = $1 & 1;
 $3 = ($2|0)==(0);
 $4 = HEAP32[$this>>2]|0;
 if ($3) {
  $14 = (($4) + 4|0);
  $15 = HEAP32[$14>>2]|0;
  FUNCTION_TABLE_vii[$15 & 7]($this,$block);
  STACKTOP = sp;return;
 }
 $5 = HEAP32[$4>>2]|0;
 FUNCTION_TABLE_vii[$5 & 7]($this,$block);
 $6 = (($this) + 4|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = (($7) + 324|0);
 $9 = HEAP8[$8>>0]|0;
 $10 = ($9<<24>>24)==(0);
 if (!($10)) {
  STACKTOP = sp;return;
 }
 $11 = HEAP32[$this>>2]|0;
 $12 = (($11) + 4|0);
 $13 = HEAP32[$12>>2]|0;
 FUNCTION_TABLE_vii[$13 & 7]($this,$block);
 STACKTOP = sp;return;
}
function __ZN6squish9ColourSetC2EPKhii($this,$rgba,$mask,$flags) {
 $this = $this|0;
 $rgba = $rgba|0;
 $mask = $mask|0;
 $flags = $flags|0;
 var $$pre$phi18Z2D = 0, $$pre$phi22Z2D = 0, $$pre$phi26Z2D = 0, $$pre$phiZ2D = 0, $$pre21 = 0, $$pre25 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0.0, $101 = 0.0, $102 = 0, $103 = 0.0, $104 = 0.0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0;
 var $110 = 0.0, $111 = 0.0, $112 = 0, $113 = 0, $114 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0;
 var $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0;
 var $44 = 0, $45 = 0.0, $46 = 0.0, $47 = 0, $48 = 0.0, $49 = 0.0, $5 = 0, $50 = 0, $51 = 0.0, $52 = 0.0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0.0, $58 = 0.0, $59 = 0, $6 = 0, $60 = 0, $61 = 0;
 var $62 = 0, $63 = 0.0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0;
 var $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0;
 var $99 = 0.0, $exitcond = 0, $i$010 = 0, $i2$04 = 0, $j$0$lcssa6 = 0, $j$07 = 0, $j$07$us = 0, $phitmp = 0, label = 0, sp = 0;
 sp = STACKTOP;
 HEAP32[$this>>2] = 0;
 $0 = (($this) + 324|0);
 HEAP8[$0>>0] = 0;
 $1 = $flags & 1;
 $2 = ($1|0)!=(0);
 $3 = $flags & 128;
 $4 = ($3|0)!=(0);
 $i$010 = 0;
 while(1) {
  $7 = 1 << $i$010;
  $8 = $7 & $mask;
  $9 = ($8|0)==(0);
  L3: do {
   if ($9) {
    $10 = ((($this) + ($i$010<<2)|0) + 260|0);
    HEAP32[$10>>2] = -1;
   } else {
    if ($2) {
     $38 = $i$010 << 2;
     $39 = $38 | 3;
     $40 = (($rgba) + ($39)|0);
     $41 = HEAP8[$40>>0]|0;
     $42 = ($41<<24>>24)>(-1);
     if ($42) {
      $43 = ((($this) + ($i$010<<2)|0) + 260|0);
      HEAP32[$43>>2] = -1;
      HEAP8[$0>>0] = 1;
      break;
     }
    }
    $11 = ($i$010|0)==(0);
    do {
     if ($11) {
      $$pre21 = (($rgba) + 1|0);
      $$pre25 = (($rgba) + 2|0);
      $$pre$phi18Z2D = $rgba;$$pre$phi22Z2D = $$pre21;$$pre$phi26Z2D = $$pre25;$$pre$phiZ2D = 3;
     } else {
      $12 = $i$010 << 2;
      $13 = (($rgba) + ($12)|0);
      $14 = $12 | 1;
      $15 = (($rgba) + ($14)|0);
      $16 = $12 | 2;
      $17 = (($rgba) + ($16)|0);
      L12: do {
       if ($2) {
        $j$07 = 0;
        while(1) {
         $70 = 1 << $j$07;
         $71 = $70 & $mask;
         $72 = ($71|0)==(0);
         if (!($72)) {
          $73 = HEAP8[$13>>0]|0;
          $74 = $j$07 << 2;
          $75 = (($rgba) + ($74)|0);
          $76 = HEAP8[$75>>0]|0;
          $77 = ($73<<24>>24)==($76<<24>>24);
          if ($77) {
           $78 = HEAP8[$15>>0]|0;
           $79 = $74 | 1;
           $80 = (($rgba) + ($79)|0);
           $81 = HEAP8[$80>>0]|0;
           $82 = ($78<<24>>24)==($81<<24>>24);
           if ($82) {
            $83 = HEAP8[$17>>0]|0;
            $84 = $74 | 2;
            $85 = (($rgba) + ($84)|0);
            $86 = HEAP8[$85>>0]|0;
            $87 = ($83<<24>>24)==($86<<24>>24);
            if ($87) {
             $88 = $74 | 3;
             $89 = (($rgba) + ($88)|0);
             $90 = HEAP8[$89>>0]|0;
             $91 = ($90<<24>>24)<(0);
             if ($91) {
              $j$0$lcssa6 = $j$07;
              label = 23;
              break L12;
             }
            }
           }
          }
         }
         $106 = (($j$07) + 1)|0;
         $107 = ($106|0)==($i$010|0);
         if ($107) {
          label = 16;
          break;
         } else {
          $j$07 = $106;
         }
        }
       } else {
        $j$07$us = 0;
        while(1) {
         $18 = 1 << $j$07$us;
         $19 = $18 & $mask;
         $20 = ($19|0)==(0);
         if (!($20)) {
          $21 = HEAP8[$13>>0]|0;
          $22 = $j$07$us << 2;
          $23 = (($rgba) + ($22)|0);
          $24 = HEAP8[$23>>0]|0;
          $25 = ($21<<24>>24)==($24<<24>>24);
          if ($25) {
           $26 = HEAP8[$15>>0]|0;
           $27 = $22 | 1;
           $28 = (($rgba) + ($27)|0);
           $29 = HEAP8[$28>>0]|0;
           $30 = ($26<<24>>24)==($29<<24>>24);
           if ($30) {
            $31 = HEAP8[$17>>0]|0;
            $32 = $22 | 2;
            $33 = (($rgba) + ($32)|0);
            $34 = HEAP8[$33>>0]|0;
            $35 = ($31<<24>>24)==($34<<24>>24);
            if ($35) {
             $j$0$lcssa6 = $j$07$us;
             label = 23;
             break L12;
            }
           }
          }
         }
         $36 = (($j$07$us) + 1)|0;
         $37 = ($36|0)==($i$010|0);
         if ($37) {
          label = 16;
          break;
         } else {
          $j$07$us = $36;
         }
        }
       }
      } while(0);
      if ((label|0) == 16) {
       label = 0;
       $phitmp = $12 | 3;
       $$pre$phi18Z2D = $13;$$pre$phi22Z2D = $15;$$pre$phi26Z2D = $17;$$pre$phiZ2D = $phitmp;
       break;
      }
      else if ((label|0) == 23) {
       label = 0;
       $92 = ((($this) + ($j$0$lcssa6<<2)|0) + 260|0);
       $93 = HEAP32[$92>>2]|0;
       $94 = $12 | 3;
       $95 = (($rgba) + ($94)|0);
       $96 = HEAP8[$95>>0]|0;
       $97 = $96&255;
       $98 = (($97) + 1)|0;
       $99 = (+($98|0));
       $100 = $99 * 0.00390625;
       $101 = $4 ? $100 : 1.0;
       $102 = ((($this) + ($93<<2)|0) + 196|0);
       $103 = +HEAPF32[$102>>2];
       $104 = $103 + $101;
       HEAPF32[$102>>2] = $104;
       $105 = ((($this) + ($i$010<<2)|0) + 260|0);
       HEAP32[$105>>2] = $93;
       break L3;
      }
     }
    } while(0);
    $44 = HEAP8[$$pre$phi18Z2D>>0]|0;
    $45 = (+($44&255));
    $46 = $45 / 255.0;
    $47 = HEAP8[$$pre$phi22Z2D>>0]|0;
    $48 = (+($47&255));
    $49 = $48 / 255.0;
    $50 = HEAP8[$$pre$phi26Z2D>>0]|0;
    $51 = (+($50&255));
    $52 = $51 / 255.0;
    $53 = (($rgba) + ($$pre$phiZ2D)|0);
    $54 = HEAP8[$53>>0]|0;
    $55 = $54&255;
    $56 = (($55) + 1)|0;
    $57 = (+($56|0));
    $58 = $57 * 0.00390625;
    $59 = HEAP32[$this>>2]|0;
    $60 = ((($this) + (($59*12)|0)|0) + 4|0);
    HEAPF32[$60>>2] = $46;
    $61 = ((($this) + (($59*12)|0)|0) + 8|0);
    HEAPF32[$61>>2] = $49;
    $62 = ((($this) + (($59*12)|0)|0) + 12|0);
    HEAPF32[$62>>2] = $52;
    $63 = $4 ? $58 : 1.0;
    $64 = HEAP32[$this>>2]|0;
    $65 = ((($this) + ($64<<2)|0) + 196|0);
    HEAPF32[$65>>2] = $63;
    $66 = HEAP32[$this>>2]|0;
    $67 = ((($this) + ($i$010<<2)|0) + 260|0);
    HEAP32[$67>>2] = $66;
    $68 = HEAP32[$this>>2]|0;
    $69 = (($68) + 1)|0;
    HEAP32[$this>>2] = $69;
   }
  } while(0);
  $108 = (($i$010) + 1)|0;
  $exitcond = ($108|0)==(16);
  if ($exitcond) {
   break;
  } else {
   $i$010 = $108;
  }
 }
 $5 = HEAP32[$this>>2]|0;
 $6 = ($5|0)>(0);
 if ($6) {
  $i2$04 = 0;
 } else {
  STACKTOP = sp;return;
 }
 while(1) {
  $109 = ((($this) + ($i2$04<<2)|0) + 196|0);
  $110 = +HEAPF32[$109>>2];
  $111 = (+Math_sqrt((+$110)));
  HEAPF32[$109>>2] = $111;
  $112 = (($i2$04) + 1)|0;
  $113 = HEAP32[$this>>2]|0;
  $114 = ($112|0)<($113|0);
  if ($114) {
   $i2$04 = $112;
  } else {
   break;
  }
 }
 STACKTOP = sp;return;
}
function __ZNK6squish9ColourSet12RemapIndicesEPKhPh($this,$source,$target) {
 $this = $this|0;
 $source = $source|0;
 $target = $target|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $exitcond = 0, $i$01 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $i$01 = 0;
 while(1) {
  $0 = ((($this) + ($i$01<<2)|0) + 260|0);
  $1 = HEAP32[$0>>2]|0;
  $2 = ($1|0)==(-1);
  if ($2) {
   $3 = (($target) + ($i$01)|0);
   HEAP8[$3>>0] = 3;
  } else {
   $4 = (($source) + ($1)|0);
   $5 = HEAP8[$4>>0]|0;
   $6 = (($target) + ($i$01)|0);
   HEAP8[$6>>0] = $5;
  }
  $7 = (($i$01) + 1)|0;
  $exitcond = ($7|0)==(16);
  if ($exitcond) {
   break;
  } else {
   $i$01 = $7;
  }
 }
 STACKTOP = sp;return;
}
function __ZN6squish25ComputeWeightedCovarianceEiPKNS_4Vec3EPKf($agg$result,$n,$points,$weights) {
 $agg$result = $agg$result|0;
 $n = $n|0;
 $points = $points|0;
 $weights = $weights|0;
 var $$lcssa12 = 0.0, $$lcssa13 = 0.0, $$lcssa14 = 0.0, $0 = 0, $1 = 0, $10 = 0.0, $11 = 0.0, $12 = 0.0, $13 = 0.0, $14 = 0.0, $15 = 0.0, $16 = 0.0, $17 = 0.0, $18 = 0.0, $19 = 0, $2 = 0.0, $20 = 0.0, $21 = 0.0, $22 = 0.0, $23 = 0.0;
 var $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0.0, $30 = 0.0, $31 = 0, $32 = 0.0, $33 = 0, $34 = 0.0, $35 = 0.0, $36 = 0.0, $37 = 0.0, $38 = 0, $39 = 0.0, $4 = 0, $40 = 0.0, $41 = 0.0;
 var $42 = 0.0, $43 = 0.0, $44 = 0.0, $45 = 0.0, $46 = 0.0, $47 = 0.0, $48 = 0.0, $49 = 0.0, $5 = 0.0, $50 = 0.0, $51 = 0.0, $52 = 0.0, $53 = 0.0, $54 = 0.0, $55 = 0.0, $56 = 0.0, $57 = 0.0, $58 = 0.0, $59 = 0.0, $6 = 0;
 var $60 = 0.0, $61 = 0, $7 = 0.0, $8 = 0, $9 = 0.0, $exitcond = 0, $exitcond32 = 0, $i$016 = 0, $i1$01 = 0, $total$0$lcssa = 0.0, $total$015 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($n|0)>(0);
 if ($0) {
  $14 = 0.0;$16 = 0.0;$18 = 0.0;$i$016 = 0;$total$015 = 0.0;
  while(1) {
   $1 = (($weights) + ($i$016<<2)|0);
   $2 = +HEAPF32[$1>>2];
   $3 = $total$015 + $2;
   $4 = (($points) + (($i$016*12)|0)|0);
   $5 = +HEAPF32[$4>>2];
   $6 = ((($points) + (($i$016*12)|0)|0) + 4|0);
   $7 = +HEAPF32[$6>>2];
   $8 = ((($points) + (($i$016*12)|0)|0) + 8|0);
   $9 = +HEAPF32[$8>>2];
   $10 = $2 * $5;
   $11 = $2 * $7;
   $12 = $2 * $9;
   $13 = $14 + $10;
   $15 = $16 + $11;
   $17 = $18 + $12;
   $19 = (($i$016) + 1)|0;
   $exitcond32 = ($19|0)==($n|0);
   if ($exitcond32) {
    $$lcssa12 = $17;$$lcssa13 = $15;$$lcssa14 = $13;$total$0$lcssa = $3;
    break;
   } else {
    $14 = $13;$16 = $15;$18 = $17;$i$016 = $19;$total$015 = $3;
   }
  }
 } else {
  $$lcssa12 = 0.0;$$lcssa13 = 0.0;$$lcssa14 = 0.0;$total$0$lcssa = 0.0;
 }
 $20 = 1.0 / $total$0$lcssa;
 $21 = $$lcssa14 * $20;
 $22 = $$lcssa13 * $20;
 $23 = $$lcssa12 * $20;
 $24 = (($agg$result) + 4|0);
 $25 = (($agg$result) + 8|0);
 $26 = (($agg$result) + 12|0);
 $27 = (($agg$result) + 16|0);
 $28 = (($agg$result) + 20|0);
 ;HEAP32[$agg$result+0>>2]=0|0;HEAP32[$agg$result+4>>2]=0|0;HEAP32[$agg$result+8>>2]=0|0;HEAP32[$agg$result+12>>2]=0|0;HEAP32[$agg$result+16>>2]=0|0;HEAP32[$agg$result+20>>2]=0|0;
 if ($0) {
  $45 = 0.0;$48 = 0.0;$51 = 0.0;$54 = 0.0;$57 = 0.0;$60 = 0.0;$i1$01 = 0;
 } else {
  STACKTOP = sp;return;
 }
 while(1) {
  $29 = (($points) + (($i1$01*12)|0)|0);
  $30 = +HEAPF32[$29>>2];
  $31 = ((($points) + (($i1$01*12)|0)|0) + 4|0);
  $32 = +HEAPF32[$31>>2];
  $33 = ((($points) + (($i1$01*12)|0)|0) + 8|0);
  $34 = +HEAPF32[$33>>2];
  $35 = $30 - $21;
  $36 = $32 - $22;
  $37 = $34 - $23;
  $38 = (($weights) + ($i1$01<<2)|0);
  $39 = +HEAPF32[$38>>2];
  $40 = $35 * $39;
  $41 = $36 * $39;
  $42 = $37 * $39;
  $43 = $35 * $40;
  $44 = $45 + $43;
  $46 = $35 * $41;
  $47 = $48 + $46;
  $49 = $35 * $42;
  $50 = $49 + $51;
  $52 = $36 * $41;
  $53 = $52 + $54;
  $55 = $36 * $42;
  $56 = $55 + $57;
  $58 = $37 * $42;
  $59 = $58 + $60;
  $61 = (($i1$01) + 1)|0;
  $exitcond = ($61|0)==($n|0);
  if ($exitcond) {
   break;
  } else {
   $45 = $44;$48 = $47;$51 = $50;$54 = $53;$57 = $56;$60 = $59;$i1$01 = $61;
  }
 }
 HEAPF32[$agg$result>>2] = $44;
 HEAPF32[$24>>2] = $47;
 HEAPF32[$25>>2] = $50;
 HEAPF32[$26>>2] = $53;
 HEAPF32[$27>>2] = $56;
 HEAPF32[$28>>2] = $59;
 STACKTOP = sp;return;
}
function __ZN6squish25ComputePrincipleComponentERKNS_6Sym3x3E($agg$result,$matrix) {
 $agg$result = $agg$result|0;
 $matrix = $matrix|0;
 var $0 = 0.0, $1 = 0, $10 = 0, $100 = 0.0, $101 = 0, $102 = 0.0, $103 = 0, $104 = 0.0, $105 = 0, $106 = 0.0, $107 = 0, $108 = 0.0, $109 = 0, $11 = 0.0, $110 = 0.0, $111 = 0, $112 = 0, $113 = 0.0, $114 = 0, $115 = 0;
 var $116 = 0.0, $117 = 0, $118 = 0, $119 = 0.0, $12 = 0.0, $120 = 0, $121 = 0, $13 = 0, $14 = 0.0, $15 = 0.0, $16 = 0.0, $17 = 0.0, $18 = 0.0, $19 = 0.0, $2 = 0.0, $20 = 0.0, $21 = 0.0, $22 = 0.0, $23 = 0.0, $24 = 0.0;
 var $25 = 0.0, $26 = 0.0, $27 = 0.0, $28 = 0.0, $29 = 0.0, $3 = 0.0, $30 = 0.0, $31 = 0.0, $32 = 0.0, $33 = 0.0, $34 = 0.0, $35 = 0.0, $36 = 0.0, $37 = 0.0, $38 = 0.0, $39 = 0.0, $4 = 0, $40 = 0.0, $41 = 0.0, $42 = 0.0;
 var $43 = 0.0, $44 = 0.0, $45 = 0.0, $46 = 0.0, $47 = 0.0, $48 = 0.0, $49 = 0.0, $5 = 0.0, $50 = 0.0, $51 = 0.0, $52 = 0.0, $53 = 0.0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0.0, $59 = 0.0, $6 = 0.0, $60 = 0.0;
 var $61 = 0.0, $62 = 0.0, $63 = 0.0, $64 = 0.0, $65 = 0.0, $66 = 0.0, $67 = 0.0, $68 = 0.0, $69 = 0.0, $7 = 0, $70 = 0.0, $71 = 0.0, $72 = 0.0, $73 = 0.0, $74 = 0.0, $75 = 0.0, $76 = 0.0, $77 = 0.0, $78 = 0.0, $79 = 0.0;
 var $8 = 0.0, $80 = 0, $81 = 0.0, $82 = 0.0, $83 = 0, $84 = 0, $85 = 0.0, $86 = 0.0, $87 = 0.0, $88 = 0.0, $89 = 0.0, $9 = 0.0, $90 = 0.0, $91 = 0.0, $92 = 0.0, $93 = 0.0, $94 = 0.0, $95 = 0, $96 = 0.0, $97 = 0.0;
 var $98 = 0.0, $99 = 0.0, $l1$0 = 0.0, $l1$1 = 0.0, $mc$1$1$i = 0.0, $mc$1$2$i = 0.0, $mc$1$3$i = 0.0, $mc$1$i = 0.0, $mi$1$1$i = 0, $mi$1$2$i = 0, $mi$1$3$i = 0, $mi$1$4$i = 0, $mi$1$i = 0, $rt1$0 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = +HEAPF32[$matrix>>2];
 $1 = (($matrix) + 12|0);
 $2 = +HEAPF32[$1>>2];
 $3 = $0 * $2;
 $4 = (($matrix) + 20|0);
 $5 = +HEAPF32[$4>>2];
 $6 = $3 * $5;
 $7 = (($matrix) + 4|0);
 $8 = +HEAPF32[$7>>2];
 $9 = $8 * 2.0;
 $10 = (($matrix) + 8|0);
 $11 = +HEAPF32[$10>>2];
 $12 = $9 * $11;
 $13 = (($matrix) + 16|0);
 $14 = +HEAPF32[$13>>2];
 $15 = $12 * $14;
 $16 = $6 + $15;
 $17 = $0 * $14;
 $18 = $14 * $17;
 $19 = $16 - $18;
 $20 = $2 * $11;
 $21 = $11 * $20;
 $22 = $19 - $21;
 $23 = $5 * $8;
 $24 = $8 * $23;
 $25 = $22 - $24;
 $26 = $0 * $5;
 $27 = $3 + $26;
 $28 = $2 * $5;
 $29 = $28 + $27;
 $30 = $8 * $8;
 $31 = $29 - $30;
 $32 = $11 * $11;
 $33 = $31 - $32;
 $34 = $14 * $14;
 $35 = $33 - $34;
 $36 = $0 + $2;
 $37 = $36 + $5;
 $38 = $37 * 0.333333343267440795898;
 $39 = $37 * $38;
 $40 = $35 - $39;
 $41 = $37 * -0.0740740746259689331055;
 $42 = $37 * $41;
 $43 = $37 * $42;
 $44 = $35 * 0.333333343267440795898;
 $45 = $37 * $44;
 $46 = $43 + $45;
 $47 = $46 - $25;
 $48 = $47 * 0.25;
 $49 = $47 * $48;
 $50 = $40 * 0.0370370373129844665527;
 $51 = $40 * $50;
 $52 = $40 * $51;
 $53 = $52 + $49;
 $54 = $53 > 1.1920928955078125E-7;
 if ($54) {
  HEAPF32[$agg$result>>2] = 1.0;
  $55 = (($agg$result) + 4|0);
  HEAPF32[$55>>2] = 1.0;
  $56 = (($agg$result) + 8|0);
  HEAPF32[$56>>2] = 1.0;
  STACKTOP = sp;return;
 }
 $57 = $53 < -1.1920928955078125E-7;
 if ($57) {
  $58 = -$53;
  $59 = (+Math_sqrt((+$58)));
  $60 = $47 * -0.5;
  $61 = (+Math_atan2((+$59),(+$60)));
  $62 = $49 - $53;
  $63 = (+Math_sqrt((+$62)));
  $64 = (+Math_pow((+$63),0.333333343267440795898));
  $65 = $61 / 3.0;
  $66 = (+Math_cos((+$65)));
  $67 = (+Math_sin((+$65)));
  $68 = $64 * 2.0;
  $69 = $68 * $66;
  $70 = $38 + $69;
  $71 = $67 * 1.73205077648162841797;
  $72 = $66 + $71;
  $73 = $64 * $72;
  $74 = $38 - $73;
  $75 = $66 - $71;
  $76 = $64 * $75;
  $77 = $38 - $76;
  $78 = (+Math_abs((+$74)));
  $79 = (+Math_abs((+$70)));
  $80 = $78 > $79;
  $l1$0 = $80 ? $74 : $70;
  $81 = (+Math_abs((+$77)));
  $82 = (+Math_abs((+$l1$0)));
  $83 = $81 > $82;
  $l1$1 = $83 ? $77 : $l1$0;
  __ZN6squishL23GetMultiplicity1EvectorERKNS_6Sym3x3Ef($agg$result,$matrix,$l1$1);
  STACKTOP = sp;return;
 }
 $84 = $47 < 0.0;
 if ($84) {
  $85 = $47 * -0.5;
  $86 = (+Math_pow((+$85),0.333333343267440795898));
  $87 = -$86;
  $rt1$0 = $87;
 } else {
  $88 = $47 * 0.5;
  $89 = (+Math_pow((+$88),0.333333343267440795898));
  $rt1$0 = $89;
 }
 $90 = $38 + $rt1$0;
 $91 = $rt1$0 * 2.0;
 $92 = $38 - $91;
 $93 = (+Math_abs((+$90)));
 $94 = (+Math_abs((+$92)));
 $95 = $93 > $94;
 if (!($95)) {
  __ZN6squishL23GetMultiplicity1EvectorERKNS_6Sym3x3Ef($agg$result,$matrix,$92);
  STACKTOP = sp;return;
 }
 $96 = $0 - $90;
 $97 = $2 - $90;
 $98 = $5 - $90;
 $99 = (+Math_abs((+$96)));
 $100 = (+Math_abs((+$8)));
 $101 = $100 > $99;
 $mi$1$i = $101&1;
 $mc$1$i = $101 ? $100 : $99;
 $102 = (+Math_abs((+$11)));
 $103 = $102 > $mc$1$i;
 $mi$1$1$i = $103 ? 2 : $mi$1$i;
 $mc$1$1$i = $103 ? $102 : $mc$1$i;
 $104 = (+Math_abs((+$97)));
 $105 = $104 > $mc$1$1$i;
 $mi$1$2$i = $105 ? 3 : $mi$1$1$i;
 $mc$1$2$i = $105 ? $104 : $mc$1$1$i;
 $106 = (+Math_abs((+$14)));
 $107 = $106 > $mc$1$2$i;
 $mi$1$3$i = $107 ? 4 : $mi$1$2$i;
 $mc$1$3$i = $107 ? $106 : $mc$1$2$i;
 $108 = (+Math_abs((+$98)));
 $109 = $108 > $mc$1$3$i;
 $mi$1$4$i = $109 ? 5 : $mi$1$3$i;
 switch ($mi$1$4$i|0) {
 case 4: case 3:  {
  $116 = -$14;
  HEAPF32[$agg$result>>2] = 0.0;
  $117 = (($agg$result) + 4|0);
  HEAPF32[$117>>2] = $116;
  $118 = (($agg$result) + 8|0);
  HEAPF32[$118>>2] = $97;
  STACKTOP = sp;return;
  break;
 }
 case 1: case 0:  {
  $110 = -$8;
  HEAPF32[$agg$result>>2] = $110;
  $111 = (($agg$result) + 4|0);
  HEAPF32[$111>>2] = $96;
  $112 = (($agg$result) + 8|0);
  HEAPF32[$112>>2] = 0.0;
  STACKTOP = sp;return;
  break;
 }
 case 2:  {
  $113 = -$96;
  HEAPF32[$agg$result>>2] = $11;
  $114 = (($agg$result) + 4|0);
  HEAPF32[$114>>2] = 0.0;
  $115 = (($agg$result) + 8|0);
  HEAPF32[$115>>2] = $113;
  STACKTOP = sp;return;
  break;
 }
 default: {
  $119 = -$98;
  HEAPF32[$agg$result>>2] = 0.0;
  $120 = (($agg$result) + 4|0);
  HEAPF32[$120>>2] = $119;
  $121 = (($agg$result) + 8|0);
  HEAPF32[$121>>2] = $14;
  STACKTOP = sp;return;
 }
 }
}
function __ZN6squishL23GetMultiplicity1EvectorERKNS_6Sym3x3Ef($agg$result,$matrix,$evalue) {
 $agg$result = $agg$result|0;
 $matrix = $matrix|0;
 $evalue = +$evalue;
 var $0 = 0.0, $1 = 0.0, $10 = 0.0, $11 = 0, $12 = 0.0, $13 = 0.0, $14 = 0.0, $15 = 0.0, $16 = 0.0, $17 = 0.0, $18 = 0.0, $19 = 0.0, $2 = 0, $20 = 0.0, $21 = 0.0, $22 = 0.0, $23 = 0.0, $24 = 0.0, $25 = 0.0, $26 = 0.0;
 var $27 = 0.0, $28 = 0.0, $29 = 0.0, $3 = 0.0, $30 = 0.0, $31 = 0.0, $32 = 0.0, $33 = 0.0, $34 = 0, $35 = 0.0, $36 = 0, $37 = 0.0, $38 = 0, $39 = 0.0, $4 = 0, $40 = 0, $41 = 0.0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $5 = 0.0, $6 = 0, $7 = 0.0, $8 = 0.0, $9 = 0, $mc$1 = 0.0, $mc$1$1 = 0.0, $mc$1$2 = 0.0, $mc$1$3 = 0.0, $mi$1 = 0, $mi$1$1 = 0, $mi$1$2 = 0, $mi$1$3 = 0, $mi$1$4 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = +HEAPF32[$matrix>>2];
 $1 = $0 - $evalue;
 $2 = (($matrix) + 4|0);
 $3 = +HEAPF32[$2>>2];
 $4 = (($matrix) + 8|0);
 $5 = +HEAPF32[$4>>2];
 $6 = (($matrix) + 12|0);
 $7 = +HEAPF32[$6>>2];
 $8 = $7 - $evalue;
 $9 = (($matrix) + 16|0);
 $10 = +HEAPF32[$9>>2];
 $11 = (($matrix) + 20|0);
 $12 = +HEAPF32[$11>>2];
 $13 = $12 - $evalue;
 $14 = $8 * $13;
 $15 = $10 * $10;
 $16 = $14 - $15;
 $17 = $5 * $10;
 $18 = $3 * $13;
 $19 = $17 - $18;
 $20 = $3 * $10;
 $21 = $5 * $8;
 $22 = $20 - $21;
 $23 = $1 * $13;
 $24 = $5 * $5;
 $25 = $23 - $24;
 $26 = $3 * $5;
 $27 = $1 * $10;
 $28 = $26 - $27;
 $29 = $1 * $8;
 $30 = $3 * $3;
 $31 = $29 - $30;
 $32 = (+Math_abs((+$16)));
 $33 = (+Math_abs((+$19)));
 $34 = $33 > $32;
 $mi$1 = $34&1;
 $mc$1 = $34 ? $33 : $32;
 $35 = (+Math_abs((+$22)));
 $36 = $35 > $mc$1;
 $mi$1$1 = $36 ? 2 : $mi$1;
 $mc$1$1 = $36 ? $35 : $mc$1;
 $37 = (+Math_abs((+$25)));
 $38 = $37 > $mc$1$1;
 $mi$1$2 = $38 ? 3 : $mi$1$1;
 $mc$1$2 = $38 ? $37 : $mc$1$1;
 $39 = (+Math_abs((+$28)));
 $40 = $39 > $mc$1$2;
 $mi$1$3 = $40 ? 4 : $mi$1$2;
 $mc$1$3 = $40 ? $39 : $mc$1$2;
 $41 = (+Math_abs((+$31)));
 $42 = $41 > $mc$1$3;
 $mi$1$4 = $42 ? 5 : $mi$1$3;
 if ((($mi$1$4|0) == 3) | (($mi$1$4|0) == 1)) {
  HEAPF32[$agg$result>>2] = $19;
  $45 = (($agg$result) + 4|0);
  HEAPF32[$45>>2] = $25;
  $46 = (($agg$result) + 8|0);
  HEAPF32[$46>>2] = $28;
  STACKTOP = sp;return;
 } else if ((($mi$1$4|0) == 0)) {
  HEAPF32[$agg$result>>2] = $16;
  $43 = (($agg$result) + 4|0);
  HEAPF32[$43>>2] = $19;
  $44 = (($agg$result) + 8|0);
  HEAPF32[$44>>2] = $22;
  STACKTOP = sp;return;
 } else {
  HEAPF32[$agg$result>>2] = $22;
  $47 = (($agg$result) + 4|0);
  HEAPF32[$47>>2] = $28;
  $48 = (($agg$result) + 8|0);
  HEAPF32[$48>>2] = $31;
  STACKTOP = sp;return;
 }
}
function __ZN6squish8RangeFitC2EPKNS_9ColourSetEi($this,$colours,$flags) {
 $this = $this|0;
 $colours = $colours|0;
 $flags = $flags|0;
 var $$op = 0.0, $$op41 = 0.0, $$op42 = 0.0, $$op43 = 0.0, $$op44 = 0.0, $$op45 = 0.0, $0 = 0, $1 = 0, $10 = 0, $100 = 0.0, $101 = 0, $102 = 0.0, $103 = 0.0, $104 = 0, $105 = 0.0, $106 = 0.0, $107 = 0, $108 = 0.0, $109 = 0.0, $11 = 0;
 var $110 = 0.0, $111 = 0.0, $112 = 0.0, $113 = 0.0, $114 = 0.0, $115 = 0.0, $116 = 0, $117 = 0, $118 = 0, $119 = 0.0, $12 = 0, $120 = 0.0, $121 = 0.0, $122 = 0.0, $123 = 0.0, $124 = 0.0, $125 = 0.0, $126 = 0.0, $127 = 0.0, $128 = 0.0;
 var $129 = 0.0, $13 = 0, $130 = 0.0, $14 = 0, $15 = 0, $16 = 0, $17 = 0.0, $18 = 0, $19 = 0.0, $2 = 0, $20 = 0, $21 = 0.0, $22 = 0.0, $23 = 0.0, $24 = 0, $25 = 0.0, $26 = 0.0, $27 = 0.0, $28 = 0, $29 = 0.0;
 var $3 = 0, $30 = 0.0, $31 = 0.0, $32 = 0, $33 = 0, $34 = 0.0, $35 = 0.0, $36 = 0, $37 = 0.0, $38 = 0.0, $39 = 0.0, $4 = 0, $40 = 0, $41 = 0.0, $42 = 0.0, $43 = 0.0, $44 = 0, $45 = 0, $46 = 0, $47 = 0;
 var $48 = 0.0, $49 = 0.0, $5 = 0, $50 = 0, $51 = 0.0, $52 = 0.0, $53 = 0, $54 = 0.0, $55 = 0.0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0.0, $61 = 0.0, $62 = 0, $63 = 0.0, $64 = 0.0, $65 = 0;
 var $66 = 0.0, $67 = 0.0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0.0, $72 = 0.0, $73 = 0.0, $74 = 0.0, $75 = 0.0, $76 = 0.0, $77 = 0, $78 = 0.0, $79 = 0.0, $8 = 0, $80 = 0, $81 = 0.0, $82 = 0.0, $83 = 0;
 var $84 = 0.0, $85 = 0.0, $86 = 0.0, $87 = 0.0, $88 = 0.0, $89 = 0.0, $9 = 0, $90 = 0.0, $91 = 0.0, $92 = 0, $93 = 0, $94 = 0, $95 = 0.0, $96 = 0.0, $97 = 0.0, $98 = 0.0, $99 = 0.0, $covariance = 0, $exitcond = 0, $i$052 = 0;
 var $max$051 = 0.0, $max$1 = 0.0, $min$053 = 0.0, $min$1 = 0.0, $principle = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $covariance = sp + 16|0;
 $principle = sp;
 __ZN6squish9ColourFitC2EPKNS_9ColourSetEi($this,$colours,$flags);
 HEAP32[$this>>2] = ((112 + 8|0));
 $0 = (($this) + 8|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = $1 & 32;
 $3 = ($2|0)==(0);
 $4 = (($this) + 12|0);
 if ($3) {
  HEAPF32[$4>>2] = 1.0;
  $7 = (($this) + 16|0);
  HEAPF32[$7>>2] = 1.0;
  $8 = (($this) + 20|0);
  HEAPF32[$8>>2] = 1.0;
 } else {
  HEAPF32[$4>>2] = 0.212599992752075195313;
  $5 = (($this) + 16|0);
  HEAPF32[$5>>2] = 0.715200006961822509765;
  $6 = (($this) + 20|0);
  HEAPF32[$6>>2] = 0.0722000002861022949219;
 }
 $9 = (($this) + 48|0);
 HEAPF32[$9>>2] = 3.40282346638528859812E+38;
 $10 = (($this) + 4|0);
 $11 = HEAP32[$10>>2]|0;
 $12 = HEAP32[$11>>2]|0;
 $13 = (($11) + 4|0);
 $14 = (($11) + 196|0);
 __ZN6squish25ComputeWeightedCovarianceEiPKNS_4Vec3EPKf($covariance,$12,$13,$14);
 __ZN6squish25ComputePrincipleComponentERKNS_6Sym3x3E($principle,$covariance);
 $15 = ($12|0)>(0);
 if ($15) {
  $16 = (($11) + 4|0);
  $17 = +HEAPF32[$16>>2];
  $18 = (($11) + 8|0);
  $19 = +HEAPF32[$18>>2];
  $20 = (($11) + 12|0);
  $21 = +HEAPF32[$20>>2];
  $22 = +HEAPF32[$principle>>2];
  $23 = $17 * $22;
  $24 = (($principle) + 4|0);
  $25 = +HEAPF32[$24>>2];
  $26 = $19 * $25;
  $27 = $23 + $26;
  $28 = (($principle) + 8|0);
  $29 = +HEAPF32[$28>>2];
  $30 = $21 * $29;
  $31 = $27 + $30;
  $32 = ($12|0)>(1);
  if ($32) {
   $119 = $17;$120 = $19;$121 = $21;$122 = $17;$123 = $19;$124 = $21;$i$052 = 1;$max$051 = $31;$min$053 = $31;
   while(1) {
    $33 = ((($11) + (($i$052*12)|0)|0) + 4|0);
    $34 = +HEAPF32[$33>>2];
    $35 = $34 * $22;
    $36 = ((($11) + (($i$052*12)|0)|0) + 8|0);
    $37 = +HEAPF32[$36>>2];
    $38 = $37 * $25;
    $39 = $35 + $38;
    $40 = ((($11) + (($i$052*12)|0)|0) + 12|0);
    $41 = +HEAPF32[$40>>2];
    $42 = $41 * $29;
    $43 = $39 + $42;
    $44 = $43 < $min$053;
    if ($44) {
     $125 = $41;$126 = $37;$127 = $34;$128 = $121;$129 = $120;$130 = $119;$max$1 = $max$051;$min$1 = $43;
    } else {
     $45 = $43 > $max$051;
     if ($45) {
      $125 = $124;$126 = $123;$127 = $122;$128 = $41;$129 = $37;$130 = $34;$max$1 = $43;$min$1 = $min$053;
     } else {
      $125 = $124;$126 = $123;$127 = $122;$128 = $121;$129 = $120;$130 = $119;$max$1 = $max$051;$min$1 = $min$053;
     }
    }
    $46 = (($i$052) + 1)|0;
    $exitcond = ($46|0)==($12|0);
    if ($exitcond) {
     $48 = $127;$51 = $126;$54 = $125;$60 = $130;$63 = $129;$66 = $128;
     break;
    } else {
     $119 = $130;$120 = $129;$121 = $128;$122 = $127;$123 = $126;$124 = $125;$i$052 = $46;$max$051 = $max$1;$min$053 = $min$1;
    }
   }
  } else {
   $48 = $17;$51 = $19;$54 = $21;$60 = $17;$63 = $19;$66 = $21;
  }
 } else {
  $48 = 0.0;$51 = 0.0;$54 = 0.0;$60 = 0.0;$63 = 0.0;$66 = 0.0;
 }
 $47 = $48 > 0.0;
 $49 = $47 ? $48 : 0.0;
 $50 = $51 > 0.0;
 $52 = $50 ? $51 : 0.0;
 $53 = $54 > 0.0;
 $55 = $53 ? $54 : 0.0;
 $56 = $49 < 1.0;
 $57 = $52 < 1.0;
 $58 = $55 < 1.0;
 $59 = $60 > 0.0;
 $61 = $59 ? $60 : 0.0;
 $62 = $63 > 0.0;
 $64 = $62 ? $63 : 0.0;
 $65 = $66 > 0.0;
 $67 = $65 ? $66 : 0.0;
 $68 = $61 < 1.0;
 $69 = $64 < 1.0;
 $70 = $67 < 1.0;
 $$op = $49 * 31.0;
 $71 = $56 ? $$op : 31.0;
 $$op41 = $52 * 63.0;
 $72 = $57 ? $$op41 : 63.0;
 $$op42 = $55 * 31.0;
 $73 = $58 ? $$op42 : 31.0;
 $74 = $71 + 0.5;
 $75 = $72 + 0.5;
 $76 = $73 + 0.5;
 $77 = $74 > 0.0;
 if ($77) {
  $78 = (+Math_floor((+$74)));
  $87 = $78;
 } else {
  $79 = (+Math_ceil((+$74)));
  $87 = $79;
 }
 $80 = $75 > 0.0;
 if ($80) {
  $81 = (+Math_floor((+$75)));
  $89 = $81;
 } else {
  $82 = (+Math_ceil((+$75)));
  $89 = $82;
 }
 $83 = $76 > 0.0;
 if ($83) {
  $84 = (+Math_floor((+$76)));
  $91 = $84;
 } else {
  $85 = (+Math_ceil((+$76)));
  $91 = $85;
 }
 $86 = $87 * 0.0322580635547637939453;
 $88 = $89 * 0.0158730167895555496216;
 $90 = $91 * 0.0322580635547637939453;
 $92 = (($this) + 24|0);
 HEAPF32[$92>>2] = $86;
 $93 = (($this) + 28|0);
 HEAPF32[$93>>2] = $88;
 $94 = (($this) + 32|0);
 HEAPF32[$94>>2] = $90;
 $$op43 = $61 * 31.0;
 $95 = $68 ? $$op43 : 31.0;
 $$op44 = $64 * 63.0;
 $96 = $69 ? $$op44 : 63.0;
 $$op45 = $67 * 31.0;
 $97 = $70 ? $$op45 : 31.0;
 $98 = $95 + 0.5;
 $99 = $96 + 0.5;
 $100 = $97 + 0.5;
 $101 = $98 > 0.0;
 if ($101) {
  $102 = (+Math_floor((+$98)));
  $111 = $102;
 } else {
  $103 = (+Math_ceil((+$98)));
  $111 = $103;
 }
 $104 = $99 > 0.0;
 if ($104) {
  $105 = (+Math_floor((+$99)));
  $113 = $105;
 } else {
  $106 = (+Math_ceil((+$99)));
  $113 = $106;
 }
 $107 = $100 > 0.0;
 if ($107) {
  $108 = (+Math_floor((+$100)));
  $115 = $108;
  $110 = $111 * 0.0322580635547637939453;
  $112 = $113 * 0.0158730167895555496216;
  $114 = $115 * 0.0322580635547637939453;
  $116 = (($this) + 36|0);
  HEAPF32[$116>>2] = $110;
  $117 = (($this) + 40|0);
  HEAPF32[$117>>2] = $112;
  $118 = (($this) + 44|0);
  HEAPF32[$118>>2] = $114;
  STACKTOP = sp;return;
 } else {
  $109 = (+Math_ceil((+$100)));
  $115 = $109;
  $110 = $111 * 0.0322580635547637939453;
  $112 = $113 * 0.0158730167895555496216;
  $114 = $115 * 0.0322580635547637939453;
  $116 = (($this) + 36|0);
  HEAPF32[$116>>2] = $110;
  $117 = (($this) + 40|0);
  HEAPF32[$117>>2] = $112;
  $118 = (($this) + 44|0);
  HEAPF32[$118>>2] = $114;
  STACKTOP = sp;return;
 }
}
function __ZN6squish8RangeFit9Compress3EPv($this,$block) {
 $this = $this|0;
 $block = $block|0;
 var $$phi$trans$insert = 0, $$phi$trans$insert22 = 0, $$phi$trans$insert24 = 0, $$phi$trans$insert26 = 0, $$phi$trans$insert28 = 0, $$pre = 0.0, $$pre18 = 0.0, $$pre19 = 0.0, $$pre20 = 0.0, $$pre21 = 0.0, $$pre23 = 0.0, $$pre25 = 0.0, $$pre27 = 0.0, $$pre29 = 0.0, $0 = 0, $1 = 0, $10 = 0.0, $11 = 0.0, $12 = 0.0, $13 = 0.0;
 var $14 = 0.0, $15 = 0, $16 = 0.0, $17 = 0, $18 = 0.0, $19 = 0.0, $2 = 0, $20 = 0.0, $21 = 0.0, $22 = 0.0, $23 = 0.0, $24 = 0.0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0;
 var $32 = 0, $33 = 0.0, $34 = 0, $35 = 0.0, $36 = 0, $37 = 0.0, $38 = 0.0, $39 = 0.0, $4 = 0, $40 = 0.0, $41 = 0.0, $42 = 0.0, $43 = 0.0, $44 = 0.0, $45 = 0.0, $46 = 0.0, $47 = 0.0, $48 = 0.0, $49 = 0, $5 = 0;
 var $50 = 0.0, $51 = 0.0, $52 = 0.0, $53 = 0.0, $54 = 0.0, $55 = 0.0, $56 = 0.0, $57 = 0.0, $58 = 0.0, $59 = 0.0, $6 = 0.0, $60 = 0.0, $61 = 0, $62 = 0.0, $63 = 0.0, $64 = 0.0, $65 = 0.0, $66 = 0.0, $67 = 0.0, $68 = 0.0;
 var $69 = 0.0, $7 = 0, $70 = 0.0, $71 = 0.0, $72 = 0.0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0.0, $78 = 0, $79 = 0, $8 = 0.0, $80 = 0.0, $81 = 0, $9 = 0, $closest = 0, $codes = 0, $dist$1 = 0.0, $dist$1$1 = 0.0;
 var $dist$1$2 = 0.0, $error$0$lcssa = 0.0, $error$017 = 0.0, $exitcond = 0, $i$016 = 0, $indices = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 80|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $codes = sp;
 $closest = sp + 56|0;
 $indices = sp + 40|0;
 $0 = (($this) + 4|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = HEAP32[$1>>2]|0;
 $3 = (($this) + 24|0);
 ;HEAP32[$codes+0>>2]=HEAP32[$3+0>>2]|0;HEAP32[$codes+4>>2]=HEAP32[$3+4>>2]|0;HEAP32[$codes+8>>2]=HEAP32[$3+8>>2]|0;
 $4 = (($codes) + 12|0);
 $5 = (($this) + 36|0);
 ;HEAP32[$4+0>>2]=HEAP32[$5+0>>2]|0;HEAP32[$4+4>>2]=HEAP32[$5+4>>2]|0;HEAP32[$4+8>>2]=HEAP32[$5+8>>2]|0;
 $6 = +HEAPF32[$3>>2];
 $7 = (($this) + 28|0);
 $8 = +HEAPF32[$7>>2];
 $9 = (($this) + 32|0);
 $10 = +HEAPF32[$9>>2];
 $11 = $6 * 0.5;
 $12 = $8 * 0.5;
 $13 = $10 * 0.5;
 $14 = +HEAPF32[$5>>2];
 $15 = (($this) + 40|0);
 $16 = +HEAPF32[$15>>2];
 $17 = (($this) + 44|0);
 $18 = +HEAPF32[$17>>2];
 $19 = $14 * 0.5;
 $20 = $16 * 0.5;
 $21 = $18 * 0.5;
 $22 = $11 + $19;
 $23 = $12 + $20;
 $24 = $13 + $21;
 $25 = (($codes) + 24|0);
 HEAPF32[$25>>2] = $22;
 $26 = (($codes) + 28|0);
 HEAPF32[$26>>2] = $23;
 $27 = (($codes) + 32|0);
 HEAPF32[$27>>2] = $24;
 $28 = ($2|0)>(0);
 if ($28) {
  $29 = (($this) + 12|0);
  $30 = (($this) + 16|0);
  $31 = (($this) + 20|0);
  $$pre = +HEAPF32[$29>>2];
  $$pre18 = +HEAPF32[$30>>2];
  $$pre19 = +HEAPF32[$31>>2];
  $$pre20 = +HEAPF32[$codes>>2];
  $$phi$trans$insert = (($codes) + 4|0);
  $$pre21 = +HEAPF32[$$phi$trans$insert>>2];
  $$phi$trans$insert22 = (($codes) + 8|0);
  $$pre23 = +HEAPF32[$$phi$trans$insert22>>2];
  $$phi$trans$insert24 = (($codes) + 12|0);
  $$pre25 = +HEAPF32[$$phi$trans$insert24>>2];
  $$phi$trans$insert26 = (($codes) + 16|0);
  $$pre27 = +HEAPF32[$$phi$trans$insert26>>2];
  $$phi$trans$insert28 = (($codes) + 20|0);
  $$pre29 = +HEAPF32[$$phi$trans$insert28>>2];
  $error$017 = 0.0;$i$016 = 0;
  while(1) {
   $32 = ((($1) + (($i$016*12)|0)|0) + 4|0);
   $33 = +HEAPF32[$32>>2];
   $34 = ((($1) + (($i$016*12)|0)|0) + 8|0);
   $35 = +HEAPF32[$34>>2];
   $36 = ((($1) + (($i$016*12)|0)|0) + 12|0);
   $37 = +HEAPF32[$36>>2];
   $38 = $33 - $$pre20;
   $39 = $35 - $$pre21;
   $40 = $37 - $$pre23;
   $41 = $38 * $$pre;
   $42 = $39 * $$pre18;
   $43 = $40 * $$pre19;
   $44 = $41 * $41;
   $45 = $42 * $42;
   $46 = $44 + $45;
   $47 = $43 * $43;
   $48 = $46 + $47;
   $49 = $48 < 3.40282346638528859812E+38;
   $dist$1 = $49 ? $48 : 3.40282346638528859812E+38;
   $50 = $33 - $$pre25;
   $51 = $35 - $$pre27;
   $52 = $37 - $$pre29;
   $53 = $50 * $$pre;
   $54 = $51 * $$pre18;
   $55 = $52 * $$pre19;
   $56 = $53 * $53;
   $57 = $54 * $54;
   $58 = $56 + $57;
   $59 = $55 * $55;
   $60 = $58 + $59;
   $61 = $60 < $dist$1;
   $dist$1$1 = $61 ? $60 : $dist$1;
   $62 = $33 - $22;
   $63 = $35 - $23;
   $64 = $37 - $24;
   $65 = $62 * $$pre;
   $66 = $63 * $$pre18;
   $67 = $64 * $$pre19;
   $68 = $65 * $65;
   $69 = $66 * $66;
   $70 = $68 + $69;
   $71 = $67 * $67;
   $72 = $70 + $71;
   $73 = $72 < $dist$1$1;
   $dist$1$2 = $73 ? $72 : $dist$1$1;
   $74 = $61&1;
   $75 = $73 ? 2 : $74;
   $76 = (($closest) + ($i$016)|0);
   HEAP8[$76>>0] = $75;
   $77 = $error$017 + $dist$1$2;
   $78 = (($i$016) + 1)|0;
   $exitcond = ($78|0)==($2|0);
   if ($exitcond) {
    $error$0$lcssa = $77;
    break;
   } else {
    $error$017 = $77;$i$016 = $78;
   }
  }
 } else {
  $error$0$lcssa = 0.0;
 }
 $79 = (($this) + 48|0);
 $80 = +HEAPF32[$79>>2];
 $81 = $error$0$lcssa < $80;
 if (!($81)) {
  STACKTOP = sp;return;
 }
 __ZNK6squish9ColourSet12RemapIndicesEPKhPh($1,$closest,$indices);
 __ZN6squish17WriteColourBlock3ERKNS_4Vec3ES2_PKhPv($3,$5,$indices,$block);
 HEAPF32[$79>>2] = $error$0$lcssa;
 STACKTOP = sp;return;
}
function __ZN6squish8RangeFit9Compress4EPv($this,$block) {
 $this = $this|0;
 $block = $block|0;
 var $$phi$trans$insert = 0, $$phi$trans$insert31 = 0, $$phi$trans$insert33 = 0, $$phi$trans$insert35 = 0, $$phi$trans$insert37 = 0, $$pre = 0.0, $$pre27 = 0.0, $$pre28 = 0.0, $$pre29 = 0.0, $$pre30 = 0.0, $$pre32 = 0.0, $$pre34 = 0.0, $$pre36 = 0.0, $$pre38 = 0.0, $0 = 0, $1 = 0, $10 = 0.0, $100 = 0, $101 = 0, $102 = 0.0;
 var $103 = 0, $104 = 0, $105 = 0.0, $106 = 0, $11 = 0.0, $12 = 0.0, $13 = 0.0, $14 = 0.0, $15 = 0, $16 = 0.0, $17 = 0, $18 = 0.0, $19 = 0.0, $2 = 0, $20 = 0.0, $21 = 0.0, $22 = 0.0, $23 = 0.0, $24 = 0.0, $25 = 0;
 var $26 = 0, $27 = 0, $28 = 0.0, $29 = 0.0, $3 = 0, $30 = 0.0, $31 = 0.0, $32 = 0.0, $33 = 0.0, $34 = 0.0, $35 = 0.0, $36 = 0.0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0;
 var $44 = 0, $45 = 0.0, $46 = 0, $47 = 0.0, $48 = 0, $49 = 0.0, $5 = 0, $50 = 0.0, $51 = 0.0, $52 = 0.0, $53 = 0.0, $54 = 0.0, $55 = 0.0, $56 = 0.0, $57 = 0.0, $58 = 0.0, $59 = 0.0, $6 = 0.0, $60 = 0.0, $61 = 0;
 var $62 = 0.0, $63 = 0.0, $64 = 0.0, $65 = 0.0, $66 = 0.0, $67 = 0.0, $68 = 0.0, $69 = 0.0, $7 = 0, $70 = 0.0, $71 = 0.0, $72 = 0.0, $73 = 0, $74 = 0.0, $75 = 0.0, $76 = 0.0, $77 = 0.0, $78 = 0.0, $79 = 0.0, $8 = 0.0;
 var $80 = 0.0, $81 = 0.0, $82 = 0.0, $83 = 0.0, $84 = 0.0, $85 = 0, $86 = 0.0, $87 = 0.0, $88 = 0.0, $89 = 0.0, $9 = 0, $90 = 0.0, $91 = 0.0, $92 = 0.0, $93 = 0.0, $94 = 0.0, $95 = 0.0, $96 = 0.0, $97 = 0, $98 = 0;
 var $99 = 0, $closest = 0, $codes = 0, $dist$1 = 0.0, $dist$1$1 = 0.0, $dist$1$2 = 0.0, $dist$1$3 = 0.0, $error$0$lcssa = 0.0, $error$026 = 0.0, $exitcond = 0, $i$025 = 0, $indices = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 80|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $codes = sp;
 $closest = sp + 64|0;
 $indices = sp + 48|0;
 $0 = (($this) + 4|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = HEAP32[$1>>2]|0;
 $3 = (($this) + 24|0);
 ;HEAP32[$codes+0>>2]=HEAP32[$3+0>>2]|0;HEAP32[$codes+4>>2]=HEAP32[$3+4>>2]|0;HEAP32[$codes+8>>2]=HEAP32[$3+8>>2]|0;
 $4 = (($codes) + 12|0);
 $5 = (($this) + 36|0);
 ;HEAP32[$4+0>>2]=HEAP32[$5+0>>2]|0;HEAP32[$4+4>>2]=HEAP32[$5+4>>2]|0;HEAP32[$4+8>>2]=HEAP32[$5+8>>2]|0;
 $6 = +HEAPF32[$3>>2];
 $7 = (($this) + 28|0);
 $8 = +HEAPF32[$7>>2];
 $9 = (($this) + 32|0);
 $10 = +HEAPF32[$9>>2];
 $11 = $6 * 0.666666686534881591796;
 $12 = $8 * 0.666666686534881591796;
 $13 = $10 * 0.666666686534881591796;
 $14 = +HEAPF32[$5>>2];
 $15 = (($this) + 40|0);
 $16 = +HEAPF32[$15>>2];
 $17 = (($this) + 44|0);
 $18 = +HEAPF32[$17>>2];
 $19 = $14 * 0.333333343267440795898;
 $20 = $16 * 0.333333343267440795898;
 $21 = $18 * 0.333333343267440795898;
 $22 = $11 + $19;
 $23 = $12 + $20;
 $24 = $13 + $21;
 $25 = (($codes) + 24|0);
 HEAPF32[$25>>2] = $22;
 $26 = (($codes) + 28|0);
 HEAPF32[$26>>2] = $23;
 $27 = (($codes) + 32|0);
 HEAPF32[$27>>2] = $24;
 $28 = $6 * 0.333333343267440795898;
 $29 = $8 * 0.333333343267440795898;
 $30 = $10 * 0.333333343267440795898;
 $31 = $14 * 0.666666686534881591796;
 $32 = $16 * 0.666666686534881591796;
 $33 = $18 * 0.666666686534881591796;
 $34 = $28 + $31;
 $35 = $29 + $32;
 $36 = $30 + $33;
 $37 = (($codes) + 36|0);
 HEAPF32[$37>>2] = $34;
 $38 = (($codes) + 40|0);
 HEAPF32[$38>>2] = $35;
 $39 = (($codes) + 44|0);
 HEAPF32[$39>>2] = $36;
 $40 = ($2|0)>(0);
 if ($40) {
  $41 = (($this) + 12|0);
  $42 = (($this) + 16|0);
  $43 = (($this) + 20|0);
  $$pre = +HEAPF32[$41>>2];
  $$pre27 = +HEAPF32[$42>>2];
  $$pre28 = +HEAPF32[$43>>2];
  $$pre29 = +HEAPF32[$codes>>2];
  $$phi$trans$insert = (($codes) + 4|0);
  $$pre30 = +HEAPF32[$$phi$trans$insert>>2];
  $$phi$trans$insert31 = (($codes) + 8|0);
  $$pre32 = +HEAPF32[$$phi$trans$insert31>>2];
  $$phi$trans$insert33 = (($codes) + 12|0);
  $$pre34 = +HEAPF32[$$phi$trans$insert33>>2];
  $$phi$trans$insert35 = (($codes) + 16|0);
  $$pre36 = +HEAPF32[$$phi$trans$insert35>>2];
  $$phi$trans$insert37 = (($codes) + 20|0);
  $$pre38 = +HEAPF32[$$phi$trans$insert37>>2];
  $error$026 = 0.0;$i$025 = 0;
  while(1) {
   $44 = ((($1) + (($i$025*12)|0)|0) + 4|0);
   $45 = +HEAPF32[$44>>2];
   $46 = ((($1) + (($i$025*12)|0)|0) + 8|0);
   $47 = +HEAPF32[$46>>2];
   $48 = ((($1) + (($i$025*12)|0)|0) + 12|0);
   $49 = +HEAPF32[$48>>2];
   $50 = $45 - $$pre29;
   $51 = $47 - $$pre30;
   $52 = $49 - $$pre32;
   $53 = $50 * $$pre;
   $54 = $51 * $$pre27;
   $55 = $52 * $$pre28;
   $56 = $53 * $53;
   $57 = $54 * $54;
   $58 = $56 + $57;
   $59 = $55 * $55;
   $60 = $58 + $59;
   $61 = $60 < 3.40282346638528859812E+38;
   $dist$1 = $61 ? $60 : 3.40282346638528859812E+38;
   $62 = $45 - $$pre34;
   $63 = $47 - $$pre36;
   $64 = $49 - $$pre38;
   $65 = $62 * $$pre;
   $66 = $63 * $$pre27;
   $67 = $64 * $$pre28;
   $68 = $65 * $65;
   $69 = $66 * $66;
   $70 = $68 + $69;
   $71 = $67 * $67;
   $72 = $70 + $71;
   $73 = $72 < $dist$1;
   $dist$1$1 = $73 ? $72 : $dist$1;
   $74 = $45 - $22;
   $75 = $47 - $23;
   $76 = $49 - $24;
   $77 = $74 * $$pre;
   $78 = $75 * $$pre27;
   $79 = $76 * $$pre28;
   $80 = $77 * $77;
   $81 = $78 * $78;
   $82 = $80 + $81;
   $83 = $79 * $79;
   $84 = $82 + $83;
   $85 = $84 < $dist$1$1;
   $dist$1$2 = $85 ? $84 : $dist$1$1;
   $86 = $45 - $34;
   $87 = $47 - $35;
   $88 = $49 - $36;
   $89 = $86 * $$pre;
   $90 = $87 * $$pre27;
   $91 = $88 * $$pre28;
   $92 = $89 * $89;
   $93 = $90 * $90;
   $94 = $92 + $93;
   $95 = $91 * $91;
   $96 = $94 + $95;
   $97 = $96 < $dist$1$2;
   $dist$1$3 = $97 ? $96 : $dist$1$2;
   $98 = $73&1;
   $99 = $85 ? 2 : $98;
   $100 = $97 ? 3 : $99;
   $101 = (($closest) + ($i$025)|0);
   HEAP8[$101>>0] = $100;
   $102 = $error$026 + $dist$1$3;
   $103 = (($i$025) + 1)|0;
   $exitcond = ($103|0)==($2|0);
   if ($exitcond) {
    $error$0$lcssa = $102;
    break;
   } else {
    $error$026 = $102;$i$025 = $103;
   }
  }
 } else {
  $error$0$lcssa = 0.0;
 }
 $104 = (($this) + 48|0);
 $105 = +HEAPF32[$104>>2];
 $106 = $error$0$lcssa < $105;
 if (!($106)) {
  STACKTOP = sp;return;
 }
 __ZNK6squish9ColourSet12RemapIndicesEPKhPh($1,$closest,$indices);
 __ZN6squish17WriteColourBlock4ERKNS_4Vec3ES2_PKhPv($3,$5,$indices,$block);
 HEAPF32[$104>>2] = $error$0$lcssa;
 STACKTOP = sp;return;
}
function __ZN6squish15SingleColourFitC2EPKNS_9ColourSetEi($this,$colours,$flags) {
 $this = $this|0;
 $colours = $colours|0;
 $flags = $flags|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0.0, $14 = 0.0, $15 = 0.0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0.0, $24 = 0.0, $25 = 0.0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0.0, $30 = 0, $31 = 0, $32 = 0, $4 = 0.0, $5 = 0.0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $phitmp = 0, $phitmp5 = 0, $phitmp6 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 __ZN6squish9ColourFitC2EPKNS_9ColourSetEi($this,$colours,$flags);
 HEAP32[$this>>2] = ((168 + 8|0));
 $0 = (($this) + 4|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = (($1) + 4|0);
 $3 = +HEAPF32[$2>>2];
 $4 = $3 * 255.0;
 $5 = $4 + 0.5;
 $6 = (~~(($5)));
 $7 = ($6|0)<(0);
 if ($7) {
  $11 = 0;
 } else {
  $8 = ($6|0)>(255);
  $9 = $6&255;
  $phitmp = $8 ? -1 : $9;
  $11 = $phitmp;
 }
 $10 = (($this) + 12|0);
 HEAP8[$10>>0] = $11;
 $12 = (($1) + 8|0);
 $13 = +HEAPF32[$12>>2];
 $14 = $13 * 255.0;
 $15 = $14 + 0.5;
 $16 = (~~(($15)));
 $17 = ($16|0)<(0);
 if ($17) {
  $21 = 0;
 } else {
  $18 = ($16|0)>(255);
  $19 = $16&255;
  $phitmp5 = $18 ? -1 : $19;
  $21 = $phitmp5;
 }
 $20 = (($this) + 13|0);
 HEAP8[$20>>0] = $21;
 $22 = (($1) + 12|0);
 $23 = +HEAPF32[$22>>2];
 $24 = $23 * 255.0;
 $25 = $24 + 0.5;
 $26 = (~~(($25)));
 $27 = ($26|0)<(0);
 if ($27) {
  $31 = 0;
  $30 = (($this) + 14|0);
  HEAP8[$30>>0] = $31;
  $32 = (($this) + 48|0);
  HEAP32[$32>>2] = 2147483647;
  STACKTOP = sp;return;
 }
 $28 = ($26|0)>(255);
 $29 = $26&255;
 $phitmp6 = $28 ? -1 : $29;
 $31 = $phitmp6;
 $30 = (($this) + 14|0);
 HEAP8[$30>>0] = $31;
 $32 = (($this) + 48|0);
 HEAP32[$32>>2] = 2147483647;
 STACKTOP = sp;return;
}
function __ZN6squish15SingleColourFit9Compress3EPv($this,$block) {
 $this = $this|0;
 $block = $block|0;
 var $0 = 0, $1 = 0, $10 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $indices = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $indices = sp;
 __ZN6squish15SingleColourFit16ComputeEndPointsEPKPKNS_18SingleColourLookupE($this,184);
 $0 = (($this) + 44|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = (($this) + 48|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = ($1|0)<($3|0);
 if (!($4)) {
  STACKTOP = sp;return;
 }
 $5 = (($this) + 4|0);
 $6 = HEAP32[$5>>2]|0;
 $7 = (($this) + 40|0);
 __ZNK6squish9ColourSet12RemapIndicesEPKhPh($6,$7,$indices);
 $8 = (($this) + 16|0);
 $9 = (($this) + 28|0);
 __ZN6squish17WriteColourBlock3ERKNS_4Vec3ES2_PKhPv($8,$9,$indices,$block);
 $10 = HEAP32[$0>>2]|0;
 HEAP32[$2>>2] = $10;
 STACKTOP = sp;return;
}
function __ZN6squish15SingleColourFit16ComputeEndPointsEPKPKNS_18SingleColourLookupE($this,$lookups) {
 $this = $this|0;
 $lookups = $lookups|0;
 var $$pre = 0, $$pre7 = 0, $$pre8 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0.0, $103 = 0.0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0;
 var $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0;
 var $39 = 0.0, $4 = 0, $40 = 0.0, $41 = 0, $42 = 0, $43 = 0.0, $44 = 0.0, $45 = 0, $46 = 0, $47 = 0.0, $48 = 0.0, $49 = 0, $5 = 0, $50 = 0, $51 = 0.0, $52 = 0.0, $53 = 0, $54 = 0, $55 = 0.0, $56 = 0.0;
 var $57 = 0, $58 = 0, $59 = 0.0, $6 = 0, $60 = 0.0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0;
 var $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0.0, $83 = 0.0, $84 = 0, $85 = 0, $86 = 0.0, $87 = 0.0, $88 = 0, $89 = 0, $9 = 0, $90 = 0.0, $91 = 0.0, $92 = 0;
 var $93 = 0, $94 = 0.0, $95 = 0.0, $96 = 0, $97 = 0, $98 = 0.0, $99 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($this) + 44|0);
 HEAP32[$0>>2] = 2147483647;
 $1 = (($this) + 16|0);
 $2 = (($this) + 20|0);
 $3 = (($this) + 24|0);
 $4 = (($this) + 28|0);
 $5 = (($this) + 32|0);
 $6 = (($this) + 36|0);
 $7 = (($this) + 40|0);
 $8 = HEAP32[$lookups>>2]|0;
 $9 = (($this) + 12|0);
 $10 = HEAP8[$9>>0]|0;
 $11 = $10&255;
 $12 = ((($8) + (($11*6)|0)|0) + 2|0);
 $13 = HEAP8[$12>>0]|0;
 $14 = $13&255;
 $15 = Math_imul($14, $14)|0;
 $16 = (($lookups) + 4|0);
 $17 = HEAP32[$16>>2]|0;
 $18 = (($this) + 13|0);
 $19 = HEAP8[$18>>0]|0;
 $20 = $19&255;
 $21 = ((($17) + (($20*6)|0)|0) + 2|0);
 $22 = HEAP8[$21>>0]|0;
 $23 = $22&255;
 $24 = Math_imul($23, $23)|0;
 $25 = (($24) + ($15))|0;
 $26 = (($lookups) + 8|0);
 $27 = HEAP32[$26>>2]|0;
 $28 = (($this) + 14|0);
 $29 = HEAP8[$28>>0]|0;
 $30 = $29&255;
 $31 = ((($27) + (($30*6)|0)|0) + 2|0);
 $32 = HEAP8[$31>>0]|0;
 $33 = $32&255;
 $34 = Math_imul($33, $33)|0;
 $35 = (($34) + ($25))|0;
 $36 = ($35|0)==(2147483647);
 if ($36) {
  $62 = $8;$67 = $17;$73 = $27;$79 = 2147483647;
 } else {
  $37 = (($8) + (($11*6)|0)|0);
  $38 = HEAP8[$37>>0]|0;
  $39 = (+($38&255));
  $40 = $39 / 31.0;
  $41 = (($17) + (($20*6)|0)|0);
  $42 = HEAP8[$41>>0]|0;
  $43 = (+($42&255));
  $44 = $43 / 63.0;
  $45 = (($27) + (($30*6)|0)|0);
  $46 = HEAP8[$45>>0]|0;
  $47 = (+($46&255));
  $48 = $47 / 31.0;
  HEAPF32[$1>>2] = $40;
  HEAPF32[$2>>2] = $44;
  HEAPF32[$3>>2] = $48;
  $49 = ((($8) + (($11*6)|0)|0) + 1|0);
  $50 = HEAP8[$49>>0]|0;
  $51 = (+($50&255));
  $52 = $51 / 31.0;
  $53 = ((($17) + (($20*6)|0)|0) + 1|0);
  $54 = HEAP8[$53>>0]|0;
  $55 = (+($54&255));
  $56 = $55 / 63.0;
  $57 = ((($27) + (($30*6)|0)|0) + 1|0);
  $58 = HEAP8[$57>>0]|0;
  $59 = (+($58&255));
  $60 = $59 / 31.0;
  HEAPF32[$4>>2] = $52;
  HEAPF32[$5>>2] = $56;
  HEAPF32[$6>>2] = $60;
  HEAP8[$7>>0] = 0;
  HEAP32[$0>>2] = $35;
  $$pre = HEAP32[$lookups>>2]|0;
  $$pre7 = HEAP32[$16>>2]|0;
  $$pre8 = HEAP32[$26>>2]|0;
  $62 = $$pre;$67 = $$pre7;$73 = $$pre8;$79 = $35;
 }
 $61 = ((($62) + (($11*6)|0)|0) + 5|0);
 $63 = HEAP8[$61>>0]|0;
 $64 = $63&255;
 $65 = Math_imul($64, $64)|0;
 $66 = ((($67) + (($20*6)|0)|0) + 5|0);
 $68 = HEAP8[$66>>0]|0;
 $69 = $68&255;
 $70 = Math_imul($69, $69)|0;
 $71 = (($70) + ($65))|0;
 $72 = ((($73) + (($30*6)|0)|0) + 5|0);
 $74 = HEAP8[$72>>0]|0;
 $75 = $74&255;
 $76 = Math_imul($75, $75)|0;
 $77 = (($76) + ($71))|0;
 $78 = ($77|0)<($79|0);
 if (!($78)) {
  STACKTOP = sp;return;
 }
 $80 = ((($62) + (($11*6)|0)|0) + 3|0);
 $81 = HEAP8[$80>>0]|0;
 $82 = (+($81&255));
 $83 = $82 / 31.0;
 $84 = ((($67) + (($20*6)|0)|0) + 3|0);
 $85 = HEAP8[$84>>0]|0;
 $86 = (+($85&255));
 $87 = $86 / 63.0;
 $88 = ((($73) + (($30*6)|0)|0) + 3|0);
 $89 = HEAP8[$88>>0]|0;
 $90 = (+($89&255));
 $91 = $90 / 31.0;
 HEAPF32[$1>>2] = $83;
 HEAPF32[$2>>2] = $87;
 HEAPF32[$3>>2] = $91;
 $92 = ((($62) + (($11*6)|0)|0) + 4|0);
 $93 = HEAP8[$92>>0]|0;
 $94 = (+($93&255));
 $95 = $94 / 31.0;
 $96 = ((($67) + (($20*6)|0)|0) + 4|0);
 $97 = HEAP8[$96>>0]|0;
 $98 = (+($97&255));
 $99 = $98 / 63.0;
 $100 = ((($73) + (($30*6)|0)|0) + 4|0);
 $101 = HEAP8[$100>>0]|0;
 $102 = (+($101&255));
 $103 = $102 / 31.0;
 HEAPF32[$4>>2] = $95;
 HEAPF32[$5>>2] = $99;
 HEAPF32[$6>>2] = $103;
 HEAP8[$7>>0] = 2;
 HEAP32[$0>>2] = $77;
 STACKTOP = sp;return;
}
function __ZN6squish15SingleColourFit9Compress4EPv($this,$block) {
 $this = $this|0;
 $block = $block|0;
 var $0 = 0, $1 = 0, $10 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $indices = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $indices = sp;
 __ZN6squish15SingleColourFit16ComputeEndPointsEPKPKNS_18SingleColourLookupE($this,3272);
 $0 = (($this) + 44|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = (($this) + 48|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = ($1|0)<($3|0);
 if (!($4)) {
  STACKTOP = sp;return;
 }
 $5 = (($this) + 4|0);
 $6 = HEAP32[$5>>2]|0;
 $7 = (($this) + 40|0);
 __ZNK6squish9ColourSet12RemapIndicesEPKhPh($6,$7,$indices);
 $8 = (($this) + 16|0);
 $9 = (($this) + 28|0);
 __ZN6squish17WriteColourBlock4ERKNS_4Vec3ES2_PKhPv($8,$9,$indices,$block);
 $10 = HEAP32[$0>>2]|0;
 HEAP32[$2>>2] = $10;
 STACKTOP = sp;return;
}
function _main() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 _emscripten_asm_const((6408|0));
 STACKTOP = sp;return 0;
}
function __ZN6squish14CompressMaskedEPKhiPvi($rgba,$mask,$block,$flags) {
 $rgba = $rgba|0;
 $mask = $mask|0;
 $block = $block|0;
 $flags = $flags|0;
 var $$$i = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0;
 var $8 = 0, $9 = 0, $block$ = 0, $colours = 0, $fit = 0, $fit1 = 0, $fit2 = 0, $method$0$i = 0, $metric$0$i = 0, $or$cond = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 896|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $colours = sp + 568|0;
 $fit = sp;
 $fit1 = sp + 52|0;
 $fit2 = sp + 104|0;
 $0 = $flags & 7;
 $1 = $flags & 280;
 $2 = $flags & 96;
 $3 = $flags & 128;
 if ((($0|0) == 2) | (($0|0) == 4)) {
  $method$0$i = $0;
 } else {
  $method$0$i = 1;
 }
 $4 = ($1|0)==(16);
 $$$i = $4 ? 16 : 8;
 $5 = ($2|0)==(64);
 $metric$0$i = $5 ? 64 : 32;
 $6 = $$$i | $3;
 $7 = $6 | $metric$0$i;
 $8 = $7 | $method$0$i;
 $9 = $method$0$i & 6;
 $10 = ($9|0)==(0);
 $11 = (($block) + 8|0);
 $block$ = $10 ? $block : $11;
 __ZN6squish9ColourSetC2EPKhii($colours,$rgba,$mask,$8);
 $12 = HEAP32[$colours>>2]|0;
 $13 = ($12|0)==(1);
 do {
  if ($13) {
   __ZN6squish15SingleColourFitC2EPKNS_9ColourSetEi($fit,$colours,$8);
   __ZN6squish9ColourFit8CompressEPv($fit,$block$);
  } else {
   $14 = $$$i & 16;
   $15 = ($14|0)!=(0);
   $16 = ($12|0)==(0);
   $or$cond = $15 | $16;
   if ($or$cond) {
    __ZN6squish8RangeFitC2EPKNS_9ColourSetEi($fit1,$colours,$8);
    __ZN6squish9ColourFit8CompressEPv($fit1,$block$);
    break;
   } else {
    __ZN6squish10ClusterFitC2EPKNS_9ColourSetEi($fit2,$colours,$8);
    __ZN6squish9ColourFit8CompressEPv($fit2,$block$);
    break;
   }
  }
 } while(0);
 $17 = $method$0$i & 2;
 $18 = ($17|0)==(0);
 if (!($18)) {
  __ZN6squish17CompressAlphaDxt3EPKhiPv($rgba,$mask,$block);
  STACKTOP = sp;return;
 }
 $19 = $method$0$i & 4;
 $20 = ($19|0)==(0);
 if ($20) {
  STACKTOP = sp;return;
 }
 __ZN6squish17CompressAlphaDxt5EPKhiPv($rgba,$mask,$block);
 STACKTOP = sp;return;
}
function _GetStorageRequirements($width,$height,$flags) {
 $width = $width|0;
 $height = $height|0;
 $flags = $flags|0;
 var $0 = 0, $1 = 0, $10 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $method$0$i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = $flags & 7;
 if ((($0|0) == 2) | (($0|0) == 4)) {
  $method$0$i = $0;
 } else {
  $method$0$i = 1;
 }
 $1 = (($width) + 3)|0;
 $2 = (($1|0) / 4)&-1;
 $3 = (($height) + 3)|0;
 $4 = (($3|0) / 4)&-1;
 $5 = Math_imul($4, $2)|0;
 $6 = $method$0$i << 3;
 $7 = $6 & 8;
 $8 = $7 ^ 8;
 $9 = (($8) + 8)|0;
 $10 = Math_imul($5, $9)|0;
 STACKTOP = sp;return ($10|0);
}
function _CompressImage($rgba,$width,$height,$blocks,$flags) {
 $rgba = $rgba|0;
 $width = $width|0;
 $height = $height|0;
 $blocks = $blocks|0;
 $flags = $flags|0;
 var $$$i = 0, $$sum = 0, $$sum32 = 0, $$sum3334 = 0, $$sum3536 = 0, $$sum37 = 0, $$sum3839 = 0, $$sum4041 = 0, $$sum42 = 0, $$sum4344 = 0, $$sum4546 = 0, $$sum47 = 0, $$sum4849 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0;
 var $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0;
 var $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0;
 var $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0;
 var $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0;
 var $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $exitcond = 0, $mask$09$us = 0, $mask$1$lcssa$us = 0, $mask$2$us$us$1 = 0, $mask$2$us$us$2 = 0, $mask$2$us$us$3 = 0, $method$0$i = 0, $metric$0$i = 0, $py$010$us = 0, $scevgep = 0, $sourceRgba = 0;
 var $targetBlock$016$us = 0, $targetBlock$113$us = 0, $targetPixel$08$us = 0, $targetPixel$1$lcssa$us = 0, $targetPixel$3$us$us$1 = 0, $targetPixel$3$us$us$2 = 0, $x$012$us = 0, $y$014 = 0, $y$014$us = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $sourceRgba = sp;
 $0 = $flags & 7;
 $1 = $flags & 280;
 $2 = $flags & 96;
 $3 = $flags & 128;
 if ((($0|0) == 2) | (($0|0) == 4)) {
  $method$0$i = $0;
 } else {
  $method$0$i = 1;
 }
 $4 = ($1|0)==(16);
 $$$i = $4 ? 16 : 8;
 $5 = ($2|0)==(64);
 $metric$0$i = $5 ? 64 : 32;
 $6 = $$$i | $3;
 $7 = $6 | $metric$0$i;
 $8 = $7 | $method$0$i;
 $9 = $method$0$i << 3;
 $10 = $9 & 8;
 $11 = $10 ^ 8;
 $12 = (($11) + 8)|0;
 $13 = ($height|0)>(0);
 if (!($13)) {
  STACKTOP = sp;return;
 }
 $14 = ($width|0)>(0);
 if ($14) {
  $targetBlock$016$us = $blocks;$y$014$us = 0;
 } else {
  $y$014 = 0;
  while(1) {
   $42 = (($y$014) + 4)|0;
   $43 = ($42|0)<($height|0);
   if ($43) {
    $y$014 = $42;
   } else {
    break;
   }
  }
  STACKTOP = sp;return;
 }
 while(1) {
  $targetBlock$113$us = $targetBlock$016$us;$x$012$us = 0;
  while(1) {
   $mask$09$us = 0;$py$010$us = 0;$targetPixel$08$us = $sourceRgba;
   while(1) {
    $21 = (($py$010$us) + ($y$014$us))|0;
    $22 = ($21|0)<($height|0);
    $23 = Math_imul($21, $width)|0;
    $24 = $py$010$us << 2;
    if ($22) {
     $25 = (($x$012$us) + ($23))|0;
     $26 = $25 << 2;
     $27 = (($rgba) + ($26)|0);
     $$sum32 = $26 | 1;
     $28 = (($rgba) + ($$sum32)|0);
     $29 = HEAP8[$27>>0]|0;
     $30 = (($targetPixel$08$us) + 1|0);
     HEAP8[$targetPixel$08$us>>0] = $29;
     $$sum = (($$sum32) + 1)|0;
     $31 = (($rgba) + ($$sum)|0);
     $32 = HEAP8[$28>>0]|0;
     $33 = (($targetPixel$08$us) + 2|0);
     HEAP8[$30>>0] = $32;
     $$sum3334 = $26 | 3;
     $34 = (($rgba) + ($$sum3334)|0);
     $35 = HEAP8[$31>>0]|0;
     $36 = (($targetPixel$08$us) + 3|0);
     HEAP8[$33>>0] = $35;
     $37 = HEAP8[$34>>0]|0;
     HEAP8[$36>>0] = $37;
     $38 = 1 << $24;
     $39 = $38 | $mask$09$us;
     $40 = $x$012$us | 1;
     $41 = ($40|0)<($width|0);
     if ($41) {
      $scevgep = (($targetPixel$08$us) + 4|0);
      $44 = (($40) + ($23))|0;
      $45 = $44 << 2;
      $46 = (($rgba) + ($45)|0);
      $$sum4546 = $45 | 1;
      $47 = (($rgba) + ($$sum4546)|0);
      $48 = HEAP8[$46>>0]|0;
      $49 = (($targetPixel$08$us) + 5|0);
      HEAP8[$scevgep>>0] = $48;
      $$sum47 = (($$sum4546) + 1)|0;
      $50 = (($rgba) + ($$sum47)|0);
      $51 = HEAP8[$47>>0]|0;
      $52 = (($targetPixel$08$us) + 6|0);
      HEAP8[$49>>0] = $51;
      $$sum4849 = $45 | 3;
      $53 = (($rgba) + ($$sum4849)|0);
      $54 = HEAP8[$50>>0]|0;
      $55 = (($targetPixel$08$us) + 7|0);
      HEAP8[$52>>0] = $54;
      $56 = HEAP8[$53>>0]|0;
      HEAP8[$55>>0] = $56;
      $57 = $24 | 1;
      $58 = 1 << $57;
      $59 = $58 | $39;
      $mask$2$us$us$1 = $59;
     } else {
      $mask$2$us$us$1 = $39;
     }
     $60 = $x$012$us | 2;
     $61 = ($60|0)<($width|0);
     if ($61) {
      $targetPixel$3$us$us$1 = (($targetPixel$08$us) + 8|0);
      $62 = (($60) + ($23))|0;
      $63 = $62 << 2;
      $64 = (($rgba) + ($63)|0);
      $$sum4041 = $63 | 1;
      $65 = (($rgba) + ($$sum4041)|0);
      $66 = HEAP8[$64>>0]|0;
      $67 = (($targetPixel$08$us) + 9|0);
      HEAP8[$targetPixel$3$us$us$1>>0] = $66;
      $$sum42 = (($$sum4041) + 1)|0;
      $68 = (($rgba) + ($$sum42)|0);
      $69 = HEAP8[$65>>0]|0;
      $70 = (($targetPixel$08$us) + 10|0);
      HEAP8[$67>>0] = $69;
      $$sum4344 = $63 | 3;
      $71 = (($rgba) + ($$sum4344)|0);
      $72 = HEAP8[$68>>0]|0;
      $73 = (($targetPixel$08$us) + 11|0);
      HEAP8[$70>>0] = $72;
      $74 = HEAP8[$71>>0]|0;
      HEAP8[$73>>0] = $74;
      $75 = $24 | 2;
      $76 = 1 << $75;
      $77 = $76 | $mask$2$us$us$1;
      $mask$2$us$us$2 = $77;
     } else {
      $mask$2$us$us$2 = $mask$2$us$us$1;
     }
     $78 = $x$012$us | 3;
     $79 = ($78|0)<($width|0);
     if ($79) {
      $targetPixel$3$us$us$2 = (($targetPixel$08$us) + 12|0);
      $80 = (($78) + ($23))|0;
      $81 = $80 << 2;
      $82 = (($rgba) + ($81)|0);
      $$sum3536 = $81 | 1;
      $83 = (($rgba) + ($$sum3536)|0);
      $84 = HEAP8[$82>>0]|0;
      $85 = (($targetPixel$08$us) + 13|0);
      HEAP8[$targetPixel$3$us$us$2>>0] = $84;
      $$sum37 = (($$sum3536) + 1)|0;
      $86 = (($rgba) + ($$sum37)|0);
      $87 = HEAP8[$83>>0]|0;
      $88 = (($targetPixel$08$us) + 14|0);
      HEAP8[$85>>0] = $87;
      $$sum3839 = $81 | 3;
      $89 = (($rgba) + ($$sum3839)|0);
      $90 = HEAP8[$86>>0]|0;
      $91 = (($targetPixel$08$us) + 15|0);
      HEAP8[$88>>0] = $90;
      $92 = HEAP8[$89>>0]|0;
      HEAP8[$91>>0] = $92;
      $93 = $24 | 3;
      $94 = 1 << $93;
      $95 = $94 | $mask$2$us$us$2;
      $mask$2$us$us$3 = $95;
     } else {
      $mask$2$us$us$3 = $mask$2$us$us$2;
     }
     $mask$1$lcssa$us = $mask$2$us$us$3;
    } else {
     $mask$1$lcssa$us = $mask$09$us;
    }
    $targetPixel$1$lcssa$us = (($targetPixel$08$us) + 16|0);
    $20 = (($py$010$us) + 1)|0;
    $exitcond = ($20|0)==(4);
    if ($exitcond) {
     break;
    } else {
     $mask$09$us = $mask$1$lcssa$us;$py$010$us = $20;$targetPixel$08$us = $targetPixel$1$lcssa$us;
    }
   }
   __ZN6squish14CompressMaskedEPKhiPvi($sourceRgba,$mask$1$lcssa$us,$targetBlock$113$us,$8);
   $17 = (($targetBlock$113$us) + ($12)|0);
   $18 = (($x$012$us) + 4)|0;
   $19 = ($18|0)<($width|0);
   if ($19) {
    $targetBlock$113$us = $17;$x$012$us = $18;
   } else {
    break;
   }
  }
  $15 = (($y$014$us) + 4)|0;
  $16 = ($15|0)<($height|0);
  if ($16) {
   $targetBlock$016$us = $17;$y$014$us = $15;
  } else {
   break;
  }
 }
 STACKTOP = sp;return;
}
function _DecompressImage($rgba,$width,$height,$blocks,$flags) {
 $rgba = $rgba|0;
 $width = $width|0;
 $height = $height|0;
 $blocks = $blocks|0;
 $flags = $flags|0;
 var $$sum = 0, $$sum18 = 0, $$sum1920 = 0, $$sum2122 = 0, $$sum23 = 0, $$sum2425 = 0, $$sum2627 = 0, $$sum28 = 0, $$sum2930 = 0, $$sum3132 = 0, $$sum33 = 0, $$sum3435 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0;
 var $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0;
 var $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0;
 var $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0;
 var $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $9 = 0, $block$$i = 0, $exitcond = 0, $method$0$i = 0, $method$0$i$i = 0, $or$cond$1 = 0;
 var $or$cond$2 = 0, $or$cond$3 = 0, $py$07 = 0, $sourceBlock$013 = 0, $sourceBlock$1$lcssa = 0, $sourceBlock$110 = 0, $sourcePixel$06 = 0, $sourcePixel$3 = 0, $sourcePixel$3$1 = 0, $sourcePixel$3$2 = 0, $sourcePixel$3$3 = 0, $targetRgba = 0, $x$09 = 0, $y$011 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $targetRgba = sp;
 $0 = $flags & 7;
 if ((($0|0) == 2) | (($0|0) == 4)) {
  $method$0$i = $0;
 } else {
  $method$0$i = 1;
 }
 $1 = $method$0$i << 3;
 $2 = $1 & 8;
 $3 = $2 ^ 8;
 $4 = (($3) + 8)|0;
 $5 = ($height|0)>(0);
 if (!($5)) {
  STACKTOP = sp;return;
 }
 $6 = ($width|0)>(0);
 $sourceBlock$013 = $blocks;$y$011 = 0;
 while(1) {
  if ($6) {
   $sourceBlock$110 = $sourceBlock$013;$x$09 = 0;
   while(1) {
    if ((($method$0$i|0) == 2) | (($method$0$i|0) == 4)) {
     $method$0$i$i = $method$0$i;
    } else {
     $method$0$i$i = 1;
    }
    $7 = $method$0$i$i & 6;
    $8 = ($7|0)==(0);
    $9 = (($sourceBlock$110) + 8|0);
    $block$$i = $8 ? $sourceBlock$110 : $9;
    $10 = $method$0$i$i & 1;
    $11 = ($10|0)!=(0);
    __ZN6squish16DecompressColourEPhPKvb($targetRgba,$block$$i,$11);
    $12 = $method$0$i$i & 2;
    $13 = ($12|0)==(0);
    if ($13) {
     $14 = $method$0$i$i & 4;
     $15 = ($14|0)==(0);
     if ($15) {
      $py$07 = 0;$sourcePixel$06 = $targetRgba;
     } else {
      __ZN6squish19DecompressAlphaDxt5EPhPKv($targetRgba,$sourceBlock$110);
      $py$07 = 0;$sourcePixel$06 = $targetRgba;
     }
    } else {
     __ZN6squish19DecompressAlphaDxt3EPhPKv($targetRgba,$sourceBlock$110);
     $py$07 = 0;$sourcePixel$06 = $targetRgba;
    }
    while(1) {
     $16 = (($py$07) + ($y$011))|0;
     $17 = ($16|0)<($height|0);
     $18 = Math_imul($16, $width)|0;
     if ($17) {
      $19 = (($x$09) + ($18))|0;
      $20 = $19 << 2;
      $21 = (($rgba) + ($20)|0);
      $22 = (($sourcePixel$06) + 1|0);
      $23 = HEAP8[$sourcePixel$06>>0]|0;
      $$sum3132 = $20 | 1;
      $24 = (($rgba) + ($$sum3132)|0);
      HEAP8[$21>>0] = $23;
      $25 = (($sourcePixel$06) + 2|0);
      $26 = HEAP8[$22>>0]|0;
      $$sum33 = (($$sum3132) + 1)|0;
      $27 = (($rgba) + ($$sum33)|0);
      HEAP8[$24>>0] = $26;
      $28 = (($sourcePixel$06) + 3|0);
      $29 = HEAP8[$25>>0]|0;
      $$sum3435 = $20 | 3;
      $30 = (($rgba) + ($$sum3435)|0);
      HEAP8[$27>>0] = $29;
      $31 = HEAP8[$28>>0]|0;
      HEAP8[$30>>0] = $31;
      $32 = $x$09 | 1;
      $33 = ($32|0)<($width|0);
      $or$cond$1 = $33 & $17;
      if ($or$cond$1) {
       $sourcePixel$3 = (($sourcePixel$06) + 4|0);
       $39 = (($32) + ($18))|0;
       $40 = $39 << 2;
       $41 = (($rgba) + ($40)|0);
       $42 = (($sourcePixel$06) + 5|0);
       $43 = HEAP8[$sourcePixel$3>>0]|0;
       $$sum2627 = $40 | 1;
       $44 = (($rgba) + ($$sum2627)|0);
       HEAP8[$41>>0] = $43;
       $45 = (($sourcePixel$06) + 6|0);
       $46 = HEAP8[$42>>0]|0;
       $$sum28 = (($$sum2627) + 1)|0;
       $47 = (($rgba) + ($$sum28)|0);
       HEAP8[$44>>0] = $46;
       $48 = (($sourcePixel$06) + 7|0);
       $49 = HEAP8[$45>>0]|0;
       $$sum2930 = $40 | 3;
       $50 = (($rgba) + ($$sum2930)|0);
       HEAP8[$47>>0] = $49;
       $51 = HEAP8[$48>>0]|0;
       HEAP8[$50>>0] = $51;
      }
      $52 = $x$09 | 2;
      $53 = ($52|0)<($width|0);
      $or$cond$2 = $53 & $17;
      if ($or$cond$2) {
       $sourcePixel$3$1 = (($sourcePixel$06) + 8|0);
       $54 = (($52) + ($18))|0;
       $55 = $54 << 2;
       $56 = (($rgba) + ($55)|0);
       $57 = (($sourcePixel$06) + 9|0);
       $58 = HEAP8[$sourcePixel$3$1>>0]|0;
       $$sum2122 = $55 | 1;
       $59 = (($rgba) + ($$sum2122)|0);
       HEAP8[$56>>0] = $58;
       $60 = (($sourcePixel$06) + 10|0);
       $61 = HEAP8[$57>>0]|0;
       $$sum23 = (($$sum2122) + 1)|0;
       $62 = (($rgba) + ($$sum23)|0);
       HEAP8[$59>>0] = $61;
       $63 = (($sourcePixel$06) + 11|0);
       $64 = HEAP8[$60>>0]|0;
       $$sum2425 = $55 | 3;
       $65 = (($rgba) + ($$sum2425)|0);
       HEAP8[$62>>0] = $64;
       $66 = HEAP8[$63>>0]|0;
       HEAP8[$65>>0] = $66;
      }
      $67 = $x$09 | 3;
      $68 = ($67|0)<($width|0);
      $or$cond$3 = $68 & $17;
      if ($or$cond$3) {
       $sourcePixel$3$2 = (($sourcePixel$06) + 12|0);
       $69 = (($67) + ($18))|0;
       $70 = $69 << 2;
       $71 = (($rgba) + ($70)|0);
       $72 = (($sourcePixel$06) + 13|0);
       $73 = HEAP8[$sourcePixel$3$2>>0]|0;
       $$sum18 = $70 | 1;
       $74 = (($rgba) + ($$sum18)|0);
       HEAP8[$71>>0] = $73;
       $75 = (($sourcePixel$06) + 14|0);
       $76 = HEAP8[$72>>0]|0;
       $$sum = (($$sum18) + 1)|0;
       $77 = (($rgba) + ($$sum)|0);
       HEAP8[$74>>0] = $76;
       $78 = (($sourcePixel$06) + 15|0);
       $79 = HEAP8[$75>>0]|0;
       $$sum1920 = $70 | 3;
       $80 = (($rgba) + ($$sum1920)|0);
       HEAP8[$77>>0] = $79;
       $81 = HEAP8[$78>>0]|0;
       HEAP8[$80>>0] = $81;
      }
     }
     $sourcePixel$3$3 = (($sourcePixel$06) + 16|0);
     $82 = (($py$07) + 1)|0;
     $exitcond = ($82|0)==(4);
     if ($exitcond) {
      break;
     } else {
      $py$07 = $82;$sourcePixel$06 = $sourcePixel$3$3;
     }
    }
    $34 = (($sourceBlock$110) + ($4)|0);
    $35 = (($x$09) + 4)|0;
    $36 = ($35|0)<($width|0);
    if ($36) {
     $sourceBlock$110 = $34;$x$09 = $35;
    } else {
     $sourceBlock$1$lcssa = $34;
     break;
    }
   }
  } else {
   $sourceBlock$1$lcssa = $sourceBlock$013;
  }
  $37 = (($y$011) + 4)|0;
  $38 = ($37|0)<($height|0);
  if ($38) {
   $sourceBlock$013 = $sourceBlock$1$lcssa;$y$011 = $37;
  } else {
   break;
  }
 }
 STACKTOP = sp;return;
}
function __ZdlPv($ptr) {
 $ptr = $ptr|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 _free($ptr);
 STACKTOP = sp;return;
}
function __ZNSt9type_infoD2Ev($this) {
 $this = $this|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = sp;return;
}
function __ZN10__cxxabiv116__shim_type_infoD2Ev($this) {
 $this = $this|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = sp;return;
}
function __ZNK10__cxxabiv116__shim_type_info5noop1Ev($this) {
 $this = $this|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = sp;return;
}
function __ZNK10__cxxabiv116__shim_type_info5noop2Ev($this) {
 $this = $this|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = sp;return;
}
function __ZN10__cxxabiv117__class_type_infoD0Ev($this) {
 $this = $this|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 __ZdlPv($this);
 STACKTOP = sp;return;
}
function __ZN10__cxxabiv120__si_class_type_infoD0Ev($this) {
 $this = $this|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 __ZdlPv($this);
 STACKTOP = sp;return;
}
function __ZNK10__cxxabiv117__class_type_info9can_catchEPKNS_16__shim_type_infoERPv($this,$thrown_type,$adjustedPtr) {
 $this = $this|0;
 $thrown_type = $thrown_type|0;
 $adjustedPtr = $adjustedPtr|0;
 var $$1 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $info = 0, dest = 0, label = 0;
 var sp = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $info = sp;
 $0 = ($this|0)==($thrown_type|0);
 if ($0) {
  $$1 = 1;
  STACKTOP = sp;return ($$1|0);
 }
 $1 = ($thrown_type|0)==(0|0);
 if ($1) {
  $$1 = 0;
  STACKTOP = sp;return ($$1|0);
 }
 $2 = (___dynamic_cast($thrown_type,6488,6544,0)|0);
 $3 = ($2|0)==(0|0);
 if ($3) {
  $$1 = 0;
  STACKTOP = sp;return ($$1|0);
 }
 dest=$info+0|0; stop=dest+56|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
 HEAP32[$info>>2] = $2;
 $4 = (($info) + 8|0);
 HEAP32[$4>>2] = $this;
 $5 = (($info) + 12|0);
 HEAP32[$5>>2] = -1;
 $6 = (($info) + 48|0);
 HEAP32[$6>>2] = 1;
 $7 = HEAP32[$2>>2]|0;
 $8 = (($7) + 28|0);
 $9 = HEAP32[$8>>2]|0;
 $10 = HEAP32[$adjustedPtr>>2]|0;
 FUNCTION_TABLE_viiii[$9 & 31]($2,$info,$10,1);
 $11 = (($info) + 24|0);
 $12 = HEAP32[$11>>2]|0;
 $13 = ($12|0)==(1);
 if (!($13)) {
  $$1 = 0;
  STACKTOP = sp;return ($$1|0);
 }
 $14 = (($info) + 16|0);
 $15 = HEAP32[$14>>2]|0;
 HEAP32[$adjustedPtr>>2] = $15;
 $$1 = 1;
 STACKTOP = sp;return ($$1|0);
}
function __ZNK10__cxxabiv117__class_type_info24process_found_base_classEPNS_19__dynamic_cast_infoEPvi($this,$info,$adjustedPtr,$path_below) {
 $this = $this|0;
 $info = $info|0;
 $adjustedPtr = $adjustedPtr|0;
 $path_below = $path_below|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($info) + 16|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($1|0)==(0|0);
 if ($2) {
  HEAP32[$0>>2] = $adjustedPtr;
  $3 = (($info) + 24|0);
  HEAP32[$3>>2] = $path_below;
  $4 = (($info) + 36|0);
  HEAP32[$4>>2] = 1;
  STACKTOP = sp;return;
 }
 $5 = ($1|0)==($adjustedPtr|0);
 if (!($5)) {
  $9 = (($info) + 36|0);
  $10 = HEAP32[$9>>2]|0;
  $11 = (($10) + 1)|0;
  HEAP32[$9>>2] = $11;
  $12 = (($info) + 24|0);
  HEAP32[$12>>2] = 2;
  $13 = (($info) + 54|0);
  HEAP8[$13>>0] = 1;
  STACKTOP = sp;return;
 }
 $6 = (($info) + 24|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = ($7|0)==(2);
 if (!($8)) {
  STACKTOP = sp;return;
 }
 HEAP32[$6>>2] = $path_below;
 STACKTOP = sp;return;
}
function __ZNK10__cxxabiv117__class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi($this,$info,$adjustedPtr,$path_below) {
 $this = $this|0;
 $info = $info|0;
 $adjustedPtr = $adjustedPtr|0;
 $path_below = $path_below|0;
 var $0 = 0, $1 = 0, $2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($info) + 8|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($1|0)==($this|0);
 if (!($2)) {
  STACKTOP = sp;return;
 }
 __ZNK10__cxxabiv117__class_type_info24process_found_base_classEPNS_19__dynamic_cast_infoEPvi(0,$info,$adjustedPtr,$path_below);
 STACKTOP = sp;return;
}
function __ZNK10__cxxabiv120__si_class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi($this,$info,$adjustedPtr,$path_below) {
 $this = $this|0;
 $info = $info|0;
 $adjustedPtr = $adjustedPtr|0;
 $path_below = $path_below|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($info) + 8|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($this|0)==($1|0);
 if ($2) {
  __ZNK10__cxxabiv117__class_type_info24process_found_base_classEPNS_19__dynamic_cast_infoEPvi(0,$info,$adjustedPtr,$path_below);
  STACKTOP = sp;return;
 } else {
  $3 = (($this) + 8|0);
  $4 = HEAP32[$3>>2]|0;
  $5 = HEAP32[$4>>2]|0;
  $6 = (($5) + 28|0);
  $7 = HEAP32[$6>>2]|0;
  FUNCTION_TABLE_viiii[$7 & 31]($4,$info,$adjustedPtr,$path_below);
  STACKTOP = sp;return;
 }
}
function ___dynamic_cast($static_ptr,$static_type,$dst_type,$src2dst_offset) {
 $static_ptr = $static_ptr|0;
 $static_type = $static_type|0;
 $dst_type = $dst_type|0;
 $src2dst_offset = $src2dst_offset|0;
 var $$ = 0, $$1 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0;
 var $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0;
 var $43 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $dst_ptr$0 = 0, $info = 0, dest = 0, label = 0, sp = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $info = sp;
 $0 = HEAP32[$static_ptr>>2]|0;
 $1 = (($0) + -8|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = $2;
 $4 = (($static_ptr) + ($3)|0);
 $5 = (($0) + -4|0);
 $6 = HEAP32[$5>>2]|0;
 HEAP32[$info>>2] = $dst_type;
 $7 = (($info) + 4|0);
 HEAP32[$7>>2] = $static_ptr;
 $8 = (($info) + 8|0);
 HEAP32[$8>>2] = $static_type;
 $9 = (($info) + 12|0);
 HEAP32[$9>>2] = $src2dst_offset;
 $10 = (($info) + 16|0);
 $11 = (($info) + 20|0);
 $12 = (($info) + 24|0);
 $13 = (($info) + 28|0);
 $14 = (($info) + 32|0);
 $15 = (($info) + 40|0);
 $16 = ($6|0)==($dst_type|0);
 dest=$10+0|0; stop=dest+36|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));HEAP16[$10+36>>1]=0|0;HEAP8[$10+38>>0]=0|0;
 if ($16) {
  $17 = (($info) + 48|0);
  HEAP32[$17>>2] = 1;
  $18 = HEAP32[$6>>2]|0;
  $19 = (($18) + 20|0);
  $20 = HEAP32[$19>>2]|0;
  FUNCTION_TABLE_viiiiii[$20 & 31]($6,$info,$4,$4,1,0);
  $21 = HEAP32[$12>>2]|0;
  $22 = ($21|0)==(1);
  $$ = $22 ? $4 : 0;
  $dst_ptr$0 = $$;
  STACKTOP = sp;return ($dst_ptr$0|0);
 }
 $23 = (($info) + 36|0);
 $24 = HEAP32[$6>>2]|0;
 $25 = (($24) + 24|0);
 $26 = HEAP32[$25>>2]|0;
 FUNCTION_TABLE_viiiii[$26 & 31]($6,$info,$4,1,0);
 $27 = HEAP32[$23>>2]|0;
 if ((($27|0) == 1)) {
  $35 = HEAP32[$12>>2]|0;
  $36 = ($35|0)==(1);
  if (!($36)) {
   $37 = HEAP32[$15>>2]|0;
   $38 = ($37|0)==(0);
   if (!($38)) {
    $dst_ptr$0 = 0;
    STACKTOP = sp;return ($dst_ptr$0|0);
   }
   $39 = HEAP32[$13>>2]|0;
   $40 = ($39|0)==(1);
   if (!($40)) {
    $dst_ptr$0 = 0;
    STACKTOP = sp;return ($dst_ptr$0|0);
   }
   $41 = HEAP32[$14>>2]|0;
   $42 = ($41|0)==(1);
   if (!($42)) {
    $dst_ptr$0 = 0;
    STACKTOP = sp;return ($dst_ptr$0|0);
   }
  }
  $43 = HEAP32[$10>>2]|0;
  $dst_ptr$0 = $43;
  STACKTOP = sp;return ($dst_ptr$0|0);
 } else if ((($27|0) == 0)) {
  $28 = HEAP32[$15>>2]|0;
  $29 = ($28|0)==(1);
  if (!($29)) {
   $dst_ptr$0 = 0;
   STACKTOP = sp;return ($dst_ptr$0|0);
  }
  $30 = HEAP32[$13>>2]|0;
  $31 = ($30|0)==(1);
  if (!($31)) {
   $dst_ptr$0 = 0;
   STACKTOP = sp;return ($dst_ptr$0|0);
  }
  $32 = HEAP32[$14>>2]|0;
  $33 = ($32|0)==(1);
  $34 = HEAP32[$11>>2]|0;
  $$1 = $33 ? $34 : 0;
  $dst_ptr$0 = $$1;
  STACKTOP = sp;return ($dst_ptr$0|0);
 } else {
  $dst_ptr$0 = 0;
  STACKTOP = sp;return ($dst_ptr$0|0);
 }
 return 0|0;
}
function __ZNK10__cxxabiv117__class_type_info29process_static_type_above_dstEPNS_19__dynamic_cast_infoEPKvS4_i($this,$info,$dst_ptr,$current_ptr,$path_below) {
 $this = $this|0;
 $info = $info|0;
 $dst_ptr = $dst_ptr|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, $or$cond1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($info) + 53|0);
 HEAP8[$0>>0] = 1;
 $1 = (($info) + 4|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = ($2|0)==($current_ptr|0);
 if (!($3)) {
  STACKTOP = sp;return;
 }
 $4 = (($info) + 52|0);
 HEAP8[$4>>0] = 1;
 $5 = (($info) + 16|0);
 $6 = HEAP32[$5>>2]|0;
 $7 = ($6|0)==(0|0);
 if ($7) {
  HEAP32[$5>>2] = $dst_ptr;
  $8 = (($info) + 24|0);
  HEAP32[$8>>2] = $path_below;
  $9 = (($info) + 36|0);
  HEAP32[$9>>2] = 1;
  $10 = (($info) + 48|0);
  $11 = HEAP32[$10>>2]|0;
  $12 = ($11|0)==(1);
  $13 = ($path_below|0)==(1);
  $or$cond = $12 & $13;
  if (!($or$cond)) {
   STACKTOP = sp;return;
  }
  $14 = (($info) + 54|0);
  HEAP8[$14>>0] = 1;
  STACKTOP = sp;return;
 }
 $15 = ($6|0)==($dst_ptr|0);
 if (!($15)) {
  $25 = (($info) + 36|0);
  $26 = HEAP32[$25>>2]|0;
  $27 = (($26) + 1)|0;
  HEAP32[$25>>2] = $27;
  $28 = (($info) + 54|0);
  HEAP8[$28>>0] = 1;
  STACKTOP = sp;return;
 }
 $16 = (($info) + 24|0);
 $17 = HEAP32[$16>>2]|0;
 $18 = ($17|0)==(2);
 if ($18) {
  HEAP32[$16>>2] = $path_below;
  $23 = $path_below;
 } else {
  $23 = $17;
 }
 $19 = (($info) + 48|0);
 $20 = HEAP32[$19>>2]|0;
 $21 = ($20|0)==(1);
 $22 = ($23|0)==(1);
 $or$cond1 = $21 & $22;
 if (!($or$cond1)) {
  STACKTOP = sp;return;
 }
 $24 = (($info) + 54|0);
 HEAP8[$24>>0] = 1;
 STACKTOP = sp;return;
}
function __ZNK10__cxxabiv120__si_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib($this,$info,$current_ptr,$path_below,$use_strcmp) {
 $this = $this|0;
 $info = $info|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 $use_strcmp = $use_strcmp|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $is_dst_type_derived_from_static_type$0$off01 = 0, $not$ = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($info) + 8|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($this|0)==($1|0);
 if ($2) {
  $3 = (($info) + 4|0);
  $4 = HEAP32[$3>>2]|0;
  $5 = ($4|0)==($current_ptr|0);
  if (!($5)) {
   STACKTOP = sp;return;
  }
  $6 = (($info) + 28|0);
  $7 = HEAP32[$6>>2]|0;
  $8 = ($7|0)==(1);
  if ($8) {
   STACKTOP = sp;return;
  }
  HEAP32[$6>>2] = $path_below;
  STACKTOP = sp;return;
 }
 $9 = HEAP32[$info>>2]|0;
 $10 = ($this|0)==($9|0);
 if (!($10)) {
  $43 = (($this) + 8|0);
  $44 = HEAP32[$43>>2]|0;
  $45 = HEAP32[$44>>2]|0;
  $46 = (($45) + 24|0);
  $47 = HEAP32[$46>>2]|0;
  FUNCTION_TABLE_viiiii[$47 & 31]($44,$info,$current_ptr,$path_below,$use_strcmp);
  STACKTOP = sp;return;
 }
 $11 = (($info) + 16|0);
 $12 = HEAP32[$11>>2]|0;
 $13 = ($12|0)==($current_ptr|0);
 if (!($13)) {
  $14 = (($info) + 20|0);
  $15 = HEAP32[$14>>2]|0;
  $16 = ($15|0)==($current_ptr|0);
  if (!($16)) {
   $19 = (($info) + 32|0);
   HEAP32[$19>>2] = $path_below;
   $20 = (($info) + 44|0);
   $21 = HEAP32[$20>>2]|0;
   $22 = ($21|0)==(4);
   if ($22) {
    STACKTOP = sp;return;
   }
   $23 = (($info) + 52|0);
   HEAP8[$23>>0] = 0;
   $24 = (($info) + 53|0);
   HEAP8[$24>>0] = 0;
   $25 = (($this) + 8|0);
   $26 = HEAP32[$25>>2]|0;
   $27 = HEAP32[$26>>2]|0;
   $28 = (($27) + 20|0);
   $29 = HEAP32[$28>>2]|0;
   FUNCTION_TABLE_viiiiii[$29 & 31]($26,$info,$current_ptr,$current_ptr,1,$use_strcmp);
   $30 = HEAP8[$24>>0]|0;
   $31 = ($30<<24>>24)==(0);
   if ($31) {
    $is_dst_type_derived_from_static_type$0$off01 = 0;
    label = 13;
   } else {
    $32 = HEAP8[$23>>0]|0;
    $not$ = ($32<<24>>24)==(0);
    if ($not$) {
     $is_dst_type_derived_from_static_type$0$off01 = 1;
     label = 13;
    }
   }
   do {
    if ((label|0) == 13) {
     HEAP32[$14>>2] = $current_ptr;
     $33 = (($info) + 40|0);
     $34 = HEAP32[$33>>2]|0;
     $35 = (($34) + 1)|0;
     HEAP32[$33>>2] = $35;
     $36 = (($info) + 36|0);
     $37 = HEAP32[$36>>2]|0;
     $38 = ($37|0)==(1);
     if ($38) {
      $39 = (($info) + 24|0);
      $40 = HEAP32[$39>>2]|0;
      $41 = ($40|0)==(2);
      if ($41) {
       $42 = (($info) + 54|0);
       HEAP8[$42>>0] = 1;
       if ($is_dst_type_derived_from_static_type$0$off01) {
        break;
       }
      } else {
       label = 16;
      }
     } else {
      label = 16;
     }
     if ((label|0) == 16) {
      if ($is_dst_type_derived_from_static_type$0$off01) {
       break;
      }
     }
     HEAP32[$20>>2] = 4;
     STACKTOP = sp;return;
    }
   } while(0);
   HEAP32[$20>>2] = 3;
   STACKTOP = sp;return;
  }
 }
 $17 = ($path_below|0)==(1);
 if (!($17)) {
  STACKTOP = sp;return;
 }
 $18 = (($info) + 32|0);
 HEAP32[$18>>2] = 1;
 STACKTOP = sp;return;
}
function __ZNK10__cxxabiv117__class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib($this,$info,$current_ptr,$path_below,$use_strcmp) {
 $this = $this|0;
 $info = $info|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 $use_strcmp = $use_strcmp|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($info) + 8|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($1|0)==($this|0);
 if ($2) {
  $3 = (($info) + 4|0);
  $4 = HEAP32[$3>>2]|0;
  $5 = ($4|0)==($current_ptr|0);
  if (!($5)) {
   STACKTOP = sp;return;
  }
  $6 = (($info) + 28|0);
  $7 = HEAP32[$6>>2]|0;
  $8 = ($7|0)==(1);
  if ($8) {
   STACKTOP = sp;return;
  }
  HEAP32[$6>>2] = $path_below;
  STACKTOP = sp;return;
 }
 $9 = HEAP32[$info>>2]|0;
 $10 = ($9|0)==($this|0);
 if (!($10)) {
  STACKTOP = sp;return;
 }
 $11 = (($info) + 16|0);
 $12 = HEAP32[$11>>2]|0;
 $13 = ($12|0)==($current_ptr|0);
 if (!($13)) {
  $14 = (($info) + 20|0);
  $15 = HEAP32[$14>>2]|0;
  $16 = ($15|0)==($current_ptr|0);
  if (!($16)) {
   $19 = (($info) + 32|0);
   HEAP32[$19>>2] = $path_below;
   HEAP32[$14>>2] = $current_ptr;
   $20 = (($info) + 40|0);
   $21 = HEAP32[$20>>2]|0;
   $22 = (($21) + 1)|0;
   HEAP32[$20>>2] = $22;
   $23 = (($info) + 36|0);
   $24 = HEAP32[$23>>2]|0;
   $25 = ($24|0)==(1);
   if ($25) {
    $26 = (($info) + 24|0);
    $27 = HEAP32[$26>>2]|0;
    $28 = ($27|0)==(2);
    if ($28) {
     $29 = (($info) + 54|0);
     HEAP8[$29>>0] = 1;
    }
   }
   $30 = (($info) + 44|0);
   HEAP32[$30>>2] = 4;
   STACKTOP = sp;return;
  }
 }
 $17 = ($path_below|0)==(1);
 if (!($17)) {
  STACKTOP = sp;return;
 }
 $18 = (($info) + 32|0);
 HEAP32[$18>>2] = 1;
 STACKTOP = sp;return;
}
function __ZNK10__cxxabiv120__si_class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib($this,$info,$dst_ptr,$current_ptr,$path_below,$use_strcmp) {
 $this = $this|0;
 $info = $info|0;
 $dst_ptr = $dst_ptr|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 $use_strcmp = $use_strcmp|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($info) + 8|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($this|0)==($1|0);
 if ($2) {
  __ZNK10__cxxabiv117__class_type_info29process_static_type_above_dstEPNS_19__dynamic_cast_infoEPKvS4_i(0,$info,$dst_ptr,$current_ptr,$path_below);
  STACKTOP = sp;return;
 } else {
  $3 = (($this) + 8|0);
  $4 = HEAP32[$3>>2]|0;
  $5 = HEAP32[$4>>2]|0;
  $6 = (($5) + 20|0);
  $7 = HEAP32[$6>>2]|0;
  FUNCTION_TABLE_viiiiii[$7 & 31]($4,$info,$dst_ptr,$current_ptr,$path_below,$use_strcmp);
  STACKTOP = sp;return;
 }
}
function __ZNK10__cxxabiv117__class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib($this,$info,$dst_ptr,$current_ptr,$path_below,$use_strcmp) {
 $this = $this|0;
 $info = $info|0;
 $dst_ptr = $dst_ptr|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 $use_strcmp = $use_strcmp|0;
 var $0 = 0, $1 = 0, $2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($info) + 8|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($1|0)==($this|0);
 if (!($2)) {
  STACKTOP = sp;return;
 }
 __ZNK10__cxxabiv117__class_type_info29process_static_type_above_dstEPNS_19__dynamic_cast_infoEPKvS4_i(0,$info,$dst_ptr,$current_ptr,$path_below);
 STACKTOP = sp;return;
}
function _malloc($bytes) {
 $bytes = $bytes|0;
 var $$$i = 0, $$3$i = 0, $$4$i = 0, $$pre = 0, $$pre$i = 0, $$pre$i$i = 0, $$pre$i25 = 0, $$pre$i25$i = 0, $$pre$phi$i$iZ2D = 0, $$pre$phi$i26$iZ2D = 0, $$pre$phi$i26Z2D = 0, $$pre$phi$iZ2D = 0, $$pre$phi58$i$iZ2D = 0, $$pre$phiZ2D = 0, $$pre57$i$i = 0, $$rsize$0$i = 0, $$rsize$3$i = 0, $$sum = 0, $$sum$i$i = 0, $$sum$i$i$i = 0;
 var $$sum$i14$i = 0, $$sum$i15$i = 0, $$sum$i18$i = 0, $$sum$i21$i = 0, $$sum$i2334 = 0, $$sum$i32 = 0, $$sum$i35 = 0, $$sum1 = 0, $$sum1$i = 0, $$sum1$i$i = 0, $$sum1$i16$i = 0, $$sum1$i22$i = 0, $$sum1$i24 = 0, $$sum10 = 0, $$sum10$i = 0, $$sum10$i$i = 0, $$sum10$pre$i$i = 0, $$sum107$i = 0, $$sum108$i = 0, $$sum109$i = 0;
 var $$sum11$i = 0, $$sum11$i$i = 0, $$sum11$i24$i = 0, $$sum110$i = 0, $$sum111$i = 0, $$sum1112 = 0, $$sum112$i = 0, $$sum113$i = 0, $$sum114$i = 0, $$sum115$i = 0, $$sum116$i = 0, $$sum117$i = 0, $$sum118$i = 0, $$sum119$i = 0, $$sum12$i = 0, $$sum12$i$i = 0, $$sum120$i = 0, $$sum13$i = 0, $$sum13$i$i = 0, $$sum14$i$i = 0;
 var $$sum14$pre$i = 0, $$sum15$i = 0, $$sum15$i$i = 0, $$sum16$i = 0, $$sum16$i$i = 0, $$sum17$i = 0, $$sum17$i$i = 0, $$sum18$i = 0, $$sum1819$i$i = 0, $$sum2 = 0, $$sum2$i = 0, $$sum2$i$i = 0, $$sum2$i$i$i = 0, $$sum2$i17$i = 0, $$sum2$i19$i = 0, $$sum2$i23$i = 0, $$sum2$pre$i = 0, $$sum20$i$i = 0, $$sum21$i$i = 0, $$sum22$i$i = 0;
 var $$sum23$i$i = 0, $$sum24$i$i = 0, $$sum25$i$i = 0, $$sum26$pre$i$i = 0, $$sum27$i$i = 0, $$sum28$i$i = 0, $$sum29$i$i = 0, $$sum3$i = 0, $$sum3$i$i = 0, $$sum3$i27 = 0, $$sum30$i$i = 0, $$sum3132$i$i = 0, $$sum34$i$i = 0, $$sum3536$i$i = 0, $$sum3738$i$i = 0, $$sum39$i$i = 0, $$sum4 = 0, $$sum4$i = 0, $$sum4$i28 = 0, $$sum40$i$i = 0;
 var $$sum41$i$i = 0, $$sum42$i$i = 0, $$sum5$i = 0, $$sum5$i$i = 0, $$sum56 = 0, $$sum6$i = 0, $$sum67$i$i = 0, $$sum7$i = 0, $$sum8$i = 0, $$sum8$pre = 0, $$sum9 = 0, $$sum9$i = 0, $$sum9$i$i = 0, $$tsize$1$i = 0, $$v$0$i = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $1000 = 0;
 var $1001 = 0, $1002 = 0, $1003 = 0, $1004 = 0, $1005 = 0, $1006 = 0, $1007 = 0, $1008 = 0, $1009 = 0, $101 = 0, $1010 = 0, $1011 = 0, $1012 = 0, $1013 = 0, $1014 = 0, $1015 = 0, $1016 = 0, $1017 = 0, $1018 = 0, $1019 = 0;
 var $102 = 0, $1020 = 0, $1021 = 0, $1022 = 0, $1023 = 0, $1024 = 0, $1025 = 0, $1026 = 0, $1027 = 0, $1028 = 0, $1029 = 0, $103 = 0, $1030 = 0, $1031 = 0, $1032 = 0, $1033 = 0, $1034 = 0, $1035 = 0, $1036 = 0, $1037 = 0;
 var $1038 = 0, $1039 = 0, $104 = 0, $1040 = 0, $1041 = 0, $1042 = 0, $1043 = 0, $1044 = 0, $1045 = 0, $1046 = 0, $1047 = 0, $1048 = 0, $1049 = 0, $105 = 0, $1050 = 0, $1051 = 0, $1052 = 0, $1053 = 0, $1054 = 0, $1055 = 0;
 var $1056 = 0, $1057 = 0, $1058 = 0, $1059 = 0, $106 = 0, $1060 = 0, $1061 = 0, $1062 = 0, $1063 = 0, $1064 = 0, $1065 = 0, $1066 = 0, $1067 = 0, $1068 = 0, $1069 = 0, $107 = 0, $1070 = 0, $1071 = 0, $1072 = 0, $1073 = 0;
 var $1074 = 0, $1075 = 0, $1076 = 0, $1077 = 0, $1078 = 0, $1079 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0;
 var $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0;
 var $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0;
 var $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0;
 var $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0;
 var $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0;
 var $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0;
 var $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0;
 var $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0;
 var $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0;
 var $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0;
 var $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0;
 var $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0;
 var $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0;
 var $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0;
 var $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0;
 var $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0;
 var $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0;
 var $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0;
 var $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0, $462 = 0;
 var $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0;
 var $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0, $497 = 0, $498 = 0, $499 = 0;
 var $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0, $514 = 0, $515 = 0, $516 = 0;
 var $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0, $533 = 0, $534 = 0;
 var $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0, $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0;
 var $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0, $569 = 0, $57 = 0, $570 = 0;
 var $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0;
 var $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0;
 var $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0;
 var $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0, $64 = 0, $640 = 0, $641 = 0, $642 = 0;
 var $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0, $652 = 0, $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0, $659 = 0, $66 = 0, $660 = 0;
 var $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0, $670 = 0, $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0, $676 = 0, $677 = 0, $678 = 0, $679 = 0;
 var $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0, $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0, $695 = 0, $696 = 0, $697 = 0;
 var $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0, $706 = 0, $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0, $712 = 0, $713 = 0, $714 = 0;
 var $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0, $725 = 0, $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0, $730 = 0, $731 = 0, $732 = 0;
 var $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0, $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0, $749 = 0, $75 = 0, $750 = 0;
 var $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0, $760 = 0, $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0, $766 = 0, $767 = 0, $768 = 0, $769 = 0;
 var $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0, $779 = 0, $78 = 0, $780 = 0, $781 = 0, $782 = 0, $783 = 0, $784 = 0, $785 = 0, $786 = 0, $787 = 0;
 var $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0, $797 = 0, $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0, $801 = 0, $802 = 0, $803 = 0, $804 = 0;
 var $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0, $814 = 0, $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0, $82 = 0, $820 = 0, $821 = 0, $822 = 0;
 var $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0, $832 = 0, $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0, $838 = 0, $839 = 0, $84 = 0, $840 = 0;
 var $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0, $850 = 0, $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0, $856 = 0, $857 = 0, $858 = 0, $859 = 0;
 var $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0, $869 = 0, $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0, $874 = 0, $875 = 0, $876 = 0, $877 = 0;
 var $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0, $887 = 0, $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0, $892 = 0, $893 = 0, $894 = 0, $895 = 0;
 var $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0, $904 = 0, $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0, $91 = 0, $910 = 0, $911 = 0, $912 = 0;
 var $913 = 0, $914 = 0, $915 = 0, $916 = 0, $917 = 0, $918 = 0, $919 = 0, $92 = 0, $920 = 0, $921 = 0, $922 = 0, $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0, $928 = 0, $929 = 0, $93 = 0, $930 = 0;
 var $931 = 0, $932 = 0, $933 = 0, $934 = 0, $935 = 0, $936 = 0, $937 = 0, $938 = 0, $939 = 0, $94 = 0, $940 = 0, $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0, $946 = 0, $947 = 0, $948 = 0, $949 = 0;
 var $95 = 0, $950 = 0, $951 = 0, $952 = 0, $953 = 0, $954 = 0, $955 = 0, $956 = 0, $957 = 0, $958 = 0, $959 = 0, $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0, $964 = 0, $965 = 0, $966 = 0, $967 = 0;
 var $968 = 0, $969 = 0, $97 = 0, $970 = 0, $971 = 0, $972 = 0, $973 = 0, $974 = 0, $975 = 0, $976 = 0, $977 = 0, $978 = 0, $979 = 0, $98 = 0, $980 = 0, $981 = 0, $982 = 0, $983 = 0, $984 = 0, $985 = 0;
 var $986 = 0, $987 = 0, $988 = 0, $989 = 0, $99 = 0, $990 = 0, $991 = 0, $992 = 0, $993 = 0, $994 = 0, $995 = 0, $996 = 0, $997 = 0, $998 = 0, $999 = 0, $F$0$i$i = 0, $F1$0$i = 0, $F4$0 = 0, $F4$0$i$i = 0, $F5$0$i = 0;
 var $I1$0$c$i$i = 0, $I1$0$i$i = 0, $I7$0$i = 0, $I7$0$i$i = 0, $K12$025$i = 0, $K2$014$i$i = 0, $K8$052$i$i = 0, $R$0$i = 0, $R$0$i$i = 0, $R$0$i18 = 0, $R$1$i = 0, $R$1$i$i = 0, $R$1$i20 = 0, $RP$0$i = 0, $RP$0$i$i = 0, $RP$0$i17 = 0, $T$0$lcssa$i = 0, $T$0$lcssa$i$i = 0, $T$0$lcssa$i28$i = 0, $T$013$i$i = 0;
 var $T$024$i = 0, $T$051$i$i = 0, $br$0$i = 0, $cond$i = 0, $cond$i$i = 0, $cond$i21 = 0, $exitcond$i$i = 0, $i$02$i$i = 0, $idx$0$i = 0, $mem$0 = 0, $nb$0 = 0, $notlhs$i = 0, $notrhs$i = 0, $oldfirst$0$i$i = 0, $or$cond$i = 0, $or$cond$i29 = 0, $or$cond1$i = 0, $or$cond10$i = 0, $or$cond19$i = 0, $or$cond2$i = 0;
 var $or$cond49$i = 0, $or$cond5$i = 0, $or$cond6$i = 0, $or$cond8$not$i = 0, $or$cond9$i = 0, $qsize$0$i$i = 0, $rsize$0$i = 0, $rsize$0$i15 = 0, $rsize$1$i = 0, $rsize$2$i = 0, $rsize$3$lcssa$i = 0, $rsize$329$i = 0, $rst$0$i = 0, $rst$1$i = 0, $sizebits$0$i = 0, $sp$0$i$i = 0, $sp$0$i$i$i = 0, $sp$075$i = 0, $sp$168$i = 0, $ssize$0$$i = 0;
 var $ssize$0$i = 0, $ssize$1$i = 0, $ssize$2$i = 0, $t$0$i = 0, $t$0$i14 = 0, $t$1$i = 0, $t$2$ph$i = 0, $t$2$v$3$i = 0, $t$228$i = 0, $tbase$0$i = 0, $tbase$247$i = 0, $tsize$0$i = 0, $tsize$0323841$i = 0, $tsize$1$i = 0, $tsize$246$i = 0, $v$0$i = 0, $v$0$i16 = 0, $v$1$i = 0, $v$2$i = 0, $v$3$lcssa$i = 0;
 var $v$330$i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($bytes>>>0)<(245);
 do {
  if ($0) {
   $1 = ($bytes>>>0)<(11);
   if ($1) {
    $5 = 16;
   } else {
    $2 = (($bytes) + 11)|0;
    $3 = $2 & -8;
    $5 = $3;
   }
   $4 = $5 >>> 3;
   $6 = HEAP32[6696>>2]|0;
   $7 = $6 >>> $4;
   $8 = $7 & 3;
   $9 = ($8|0)==(0);
   if (!($9)) {
    $10 = $7 & 1;
    $11 = $10 ^ 1;
    $12 = (($11) + ($4))|0;
    $13 = $12 << 1;
    $14 = ((6696 + ($13<<2)|0) + 40|0);
    $$sum10 = (($13) + 2)|0;
    $15 = ((6696 + ($$sum10<<2)|0) + 40|0);
    $16 = HEAP32[$15>>2]|0;
    $17 = (($16) + 8|0);
    $18 = HEAP32[$17>>2]|0;
    $19 = ($14|0)==($18|0);
    do {
     if ($19) {
      $20 = 1 << $12;
      $21 = $20 ^ -1;
      $22 = $6 & $21;
      HEAP32[6696>>2] = $22;
     } else {
      $23 = HEAP32[((6696 + 16|0))>>2]|0;
      $24 = ($18>>>0)<($23>>>0);
      if ($24) {
       _abort();
       // unreachable;
      }
      $25 = (($18) + 12|0);
      $26 = HEAP32[$25>>2]|0;
      $27 = ($26|0)==($16|0);
      if ($27) {
       HEAP32[$25>>2] = $14;
       HEAP32[$15>>2] = $18;
       break;
      } else {
       _abort();
       // unreachable;
      }
     }
    } while(0);
    $28 = $12 << 3;
    $29 = $28 | 3;
    $30 = (($16) + 4|0);
    HEAP32[$30>>2] = $29;
    $$sum1112 = $28 | 4;
    $31 = (($16) + ($$sum1112)|0);
    $32 = HEAP32[$31>>2]|0;
    $33 = $32 | 1;
    HEAP32[$31>>2] = $33;
    $mem$0 = $17;
    STACKTOP = sp;return ($mem$0|0);
   }
   $34 = HEAP32[((6696 + 8|0))>>2]|0;
   $35 = ($5>>>0)>($34>>>0);
   if ($35) {
    $36 = ($7|0)==(0);
    if (!($36)) {
     $37 = $7 << $4;
     $38 = 2 << $4;
     $39 = (0 - ($38))|0;
     $40 = $38 | $39;
     $41 = $37 & $40;
     $42 = (0 - ($41))|0;
     $43 = $41 & $42;
     $44 = (($43) + -1)|0;
     $45 = $44 >>> 12;
     $46 = $45 & 16;
     $47 = $44 >>> $46;
     $48 = $47 >>> 5;
     $49 = $48 & 8;
     $50 = $49 | $46;
     $51 = $47 >>> $49;
     $52 = $51 >>> 2;
     $53 = $52 & 4;
     $54 = $50 | $53;
     $55 = $51 >>> $53;
     $56 = $55 >>> 1;
     $57 = $56 & 2;
     $58 = $54 | $57;
     $59 = $55 >>> $57;
     $60 = $59 >>> 1;
     $61 = $60 & 1;
     $62 = $58 | $61;
     $63 = $59 >>> $61;
     $64 = (($62) + ($63))|0;
     $65 = $64 << 1;
     $66 = ((6696 + ($65<<2)|0) + 40|0);
     $$sum4 = (($65) + 2)|0;
     $67 = ((6696 + ($$sum4<<2)|0) + 40|0);
     $68 = HEAP32[$67>>2]|0;
     $69 = (($68) + 8|0);
     $70 = HEAP32[$69>>2]|0;
     $71 = ($66|0)==($70|0);
     do {
      if ($71) {
       $72 = 1 << $64;
       $73 = $72 ^ -1;
       $74 = $6 & $73;
       HEAP32[6696>>2] = $74;
      } else {
       $75 = HEAP32[((6696 + 16|0))>>2]|0;
       $76 = ($70>>>0)<($75>>>0);
       if ($76) {
        _abort();
        // unreachable;
       }
       $77 = (($70) + 12|0);
       $78 = HEAP32[$77>>2]|0;
       $79 = ($78|0)==($68|0);
       if ($79) {
        HEAP32[$77>>2] = $66;
        HEAP32[$67>>2] = $70;
        break;
       } else {
        _abort();
        // unreachable;
       }
      }
     } while(0);
     $80 = $64 << 3;
     $81 = (($80) - ($5))|0;
     $82 = $5 | 3;
     $83 = (($68) + 4|0);
     HEAP32[$83>>2] = $82;
     $84 = (($68) + ($5)|0);
     $85 = $81 | 1;
     $$sum56 = $5 | 4;
     $86 = (($68) + ($$sum56)|0);
     HEAP32[$86>>2] = $85;
     $87 = (($68) + ($80)|0);
     HEAP32[$87>>2] = $81;
     $88 = HEAP32[((6696 + 8|0))>>2]|0;
     $89 = ($88|0)==(0);
     if (!($89)) {
      $90 = HEAP32[((6696 + 20|0))>>2]|0;
      $91 = $88 >>> 3;
      $92 = $91 << 1;
      $93 = ((6696 + ($92<<2)|0) + 40|0);
      $94 = HEAP32[6696>>2]|0;
      $95 = 1 << $91;
      $96 = $94 & $95;
      $97 = ($96|0)==(0);
      if ($97) {
       $98 = $94 | $95;
       HEAP32[6696>>2] = $98;
       $$sum8$pre = (($92) + 2)|0;
       $$pre = ((6696 + ($$sum8$pre<<2)|0) + 40|0);
       $$pre$phiZ2D = $$pre;$F4$0 = $93;
      } else {
       $$sum9 = (($92) + 2)|0;
       $99 = ((6696 + ($$sum9<<2)|0) + 40|0);
       $100 = HEAP32[$99>>2]|0;
       $101 = HEAP32[((6696 + 16|0))>>2]|0;
       $102 = ($100>>>0)<($101>>>0);
       if ($102) {
        _abort();
        // unreachable;
       } else {
        $$pre$phiZ2D = $99;$F4$0 = $100;
       }
      }
      HEAP32[$$pre$phiZ2D>>2] = $90;
      $103 = (($F4$0) + 12|0);
      HEAP32[$103>>2] = $90;
      $104 = (($90) + 8|0);
      HEAP32[$104>>2] = $F4$0;
      $105 = (($90) + 12|0);
      HEAP32[$105>>2] = $93;
     }
     HEAP32[((6696 + 8|0))>>2] = $81;
     HEAP32[((6696 + 20|0))>>2] = $84;
     $mem$0 = $69;
     STACKTOP = sp;return ($mem$0|0);
    }
    $106 = HEAP32[((6696 + 4|0))>>2]|0;
    $107 = ($106|0)==(0);
    if ($107) {
     $nb$0 = $5;
    } else {
     $108 = (0 - ($106))|0;
     $109 = $106 & $108;
     $110 = (($109) + -1)|0;
     $111 = $110 >>> 12;
     $112 = $111 & 16;
     $113 = $110 >>> $112;
     $114 = $113 >>> 5;
     $115 = $114 & 8;
     $116 = $115 | $112;
     $117 = $113 >>> $115;
     $118 = $117 >>> 2;
     $119 = $118 & 4;
     $120 = $116 | $119;
     $121 = $117 >>> $119;
     $122 = $121 >>> 1;
     $123 = $122 & 2;
     $124 = $120 | $123;
     $125 = $121 >>> $123;
     $126 = $125 >>> 1;
     $127 = $126 & 1;
     $128 = $124 | $127;
     $129 = $125 >>> $127;
     $130 = (($128) + ($129))|0;
     $131 = ((6696 + ($130<<2)|0) + 304|0);
     $132 = HEAP32[$131>>2]|0;
     $133 = (($132) + 4|0);
     $134 = HEAP32[$133>>2]|0;
     $135 = $134 & -8;
     $136 = (($135) - ($5))|0;
     $rsize$0$i = $136;$t$0$i = $132;$v$0$i = $132;
     while(1) {
      $137 = (($t$0$i) + 16|0);
      $138 = HEAP32[$137>>2]|0;
      $139 = ($138|0)==(0|0);
      if ($139) {
       $140 = (($t$0$i) + 20|0);
       $141 = HEAP32[$140>>2]|0;
       $142 = ($141|0)==(0|0);
       if ($142) {
        break;
       } else {
        $144 = $141;
       }
      } else {
       $144 = $138;
      }
      $143 = (($144) + 4|0);
      $145 = HEAP32[$143>>2]|0;
      $146 = $145 & -8;
      $147 = (($146) - ($5))|0;
      $148 = ($147>>>0)<($rsize$0$i>>>0);
      $$rsize$0$i = $148 ? $147 : $rsize$0$i;
      $$v$0$i = $148 ? $144 : $v$0$i;
      $rsize$0$i = $$rsize$0$i;$t$0$i = $144;$v$0$i = $$v$0$i;
     }
     $149 = HEAP32[((6696 + 16|0))>>2]|0;
     $150 = ($v$0$i>>>0)<($149>>>0);
     if ($150) {
      _abort();
      // unreachable;
     }
     $151 = (($v$0$i) + ($5)|0);
     $152 = ($v$0$i>>>0)<($151>>>0);
     if (!($152)) {
      _abort();
      // unreachable;
     }
     $153 = (($v$0$i) + 24|0);
     $154 = HEAP32[$153>>2]|0;
     $155 = (($v$0$i) + 12|0);
     $156 = HEAP32[$155>>2]|0;
     $157 = ($156|0)==($v$0$i|0);
     do {
      if ($157) {
       $167 = (($v$0$i) + 20|0);
       $168 = HEAP32[$167>>2]|0;
       $169 = ($168|0)==(0|0);
       if ($169) {
        $170 = (($v$0$i) + 16|0);
        $171 = HEAP32[$170>>2]|0;
        $172 = ($171|0)==(0|0);
        if ($172) {
         $R$1$i = 0;
         break;
        } else {
         $R$0$i = $171;$RP$0$i = $170;
        }
       } else {
        $R$0$i = $168;$RP$0$i = $167;
       }
       while(1) {
        $173 = (($R$0$i) + 20|0);
        $174 = HEAP32[$173>>2]|0;
        $175 = ($174|0)==(0|0);
        if (!($175)) {
         $R$0$i = $174;$RP$0$i = $173;
         continue;
        }
        $176 = (($R$0$i) + 16|0);
        $177 = HEAP32[$176>>2]|0;
        $178 = ($177|0)==(0|0);
        if ($178) {
         break;
        } else {
         $R$0$i = $177;$RP$0$i = $176;
        }
       }
       $179 = ($RP$0$i>>>0)<($149>>>0);
       if ($179) {
        _abort();
        // unreachable;
       } else {
        HEAP32[$RP$0$i>>2] = 0;
        $R$1$i = $R$0$i;
        break;
       }
      } else {
       $158 = (($v$0$i) + 8|0);
       $159 = HEAP32[$158>>2]|0;
       $160 = ($159>>>0)<($149>>>0);
       if ($160) {
        _abort();
        // unreachable;
       }
       $161 = (($159) + 12|0);
       $162 = HEAP32[$161>>2]|0;
       $163 = ($162|0)==($v$0$i|0);
       if (!($163)) {
        _abort();
        // unreachable;
       }
       $164 = (($156) + 8|0);
       $165 = HEAP32[$164>>2]|0;
       $166 = ($165|0)==($v$0$i|0);
       if ($166) {
        HEAP32[$161>>2] = $156;
        HEAP32[$164>>2] = $159;
        $R$1$i = $156;
        break;
       } else {
        _abort();
        // unreachable;
       }
      }
     } while(0);
     $180 = ($154|0)==(0|0);
     do {
      if (!($180)) {
       $181 = (($v$0$i) + 28|0);
       $182 = HEAP32[$181>>2]|0;
       $183 = ((6696 + ($182<<2)|0) + 304|0);
       $184 = HEAP32[$183>>2]|0;
       $185 = ($v$0$i|0)==($184|0);
       if ($185) {
        HEAP32[$183>>2] = $R$1$i;
        $cond$i = ($R$1$i|0)==(0|0);
        if ($cond$i) {
         $186 = 1 << $182;
         $187 = $186 ^ -1;
         $188 = HEAP32[((6696 + 4|0))>>2]|0;
         $189 = $188 & $187;
         HEAP32[((6696 + 4|0))>>2] = $189;
         break;
        }
       } else {
        $190 = HEAP32[((6696 + 16|0))>>2]|0;
        $191 = ($154>>>0)<($190>>>0);
        if ($191) {
         _abort();
         // unreachable;
        }
        $192 = (($154) + 16|0);
        $193 = HEAP32[$192>>2]|0;
        $194 = ($193|0)==($v$0$i|0);
        if ($194) {
         HEAP32[$192>>2] = $R$1$i;
        } else {
         $195 = (($154) + 20|0);
         HEAP32[$195>>2] = $R$1$i;
        }
        $196 = ($R$1$i|0)==(0|0);
        if ($196) {
         break;
        }
       }
       $197 = HEAP32[((6696 + 16|0))>>2]|0;
       $198 = ($R$1$i>>>0)<($197>>>0);
       if ($198) {
        _abort();
        // unreachable;
       }
       $199 = (($R$1$i) + 24|0);
       HEAP32[$199>>2] = $154;
       $200 = (($v$0$i) + 16|0);
       $201 = HEAP32[$200>>2]|0;
       $202 = ($201|0)==(0|0);
       do {
        if (!($202)) {
         $203 = HEAP32[((6696 + 16|0))>>2]|0;
         $204 = ($201>>>0)<($203>>>0);
         if ($204) {
          _abort();
          // unreachable;
         } else {
          $205 = (($R$1$i) + 16|0);
          HEAP32[$205>>2] = $201;
          $206 = (($201) + 24|0);
          HEAP32[$206>>2] = $R$1$i;
          break;
         }
        }
       } while(0);
       $207 = (($v$0$i) + 20|0);
       $208 = HEAP32[$207>>2]|0;
       $209 = ($208|0)==(0|0);
       if (!($209)) {
        $210 = HEAP32[((6696 + 16|0))>>2]|0;
        $211 = ($208>>>0)<($210>>>0);
        if ($211) {
         _abort();
         // unreachable;
        } else {
         $212 = (($R$1$i) + 20|0);
         HEAP32[$212>>2] = $208;
         $213 = (($208) + 24|0);
         HEAP32[$213>>2] = $R$1$i;
         break;
        }
       }
      }
     } while(0);
     $214 = ($rsize$0$i>>>0)<(16);
     if ($214) {
      $215 = (($rsize$0$i) + ($5))|0;
      $216 = $215 | 3;
      $217 = (($v$0$i) + 4|0);
      HEAP32[$217>>2] = $216;
      $$sum4$i = (($215) + 4)|0;
      $218 = (($v$0$i) + ($$sum4$i)|0);
      $219 = HEAP32[$218>>2]|0;
      $220 = $219 | 1;
      HEAP32[$218>>2] = $220;
     } else {
      $221 = $5 | 3;
      $222 = (($v$0$i) + 4|0);
      HEAP32[$222>>2] = $221;
      $223 = $rsize$0$i | 1;
      $$sum$i35 = $5 | 4;
      $224 = (($v$0$i) + ($$sum$i35)|0);
      HEAP32[$224>>2] = $223;
      $$sum1$i = (($rsize$0$i) + ($5))|0;
      $225 = (($v$0$i) + ($$sum1$i)|0);
      HEAP32[$225>>2] = $rsize$0$i;
      $226 = HEAP32[((6696 + 8|0))>>2]|0;
      $227 = ($226|0)==(0);
      if (!($227)) {
       $228 = HEAP32[((6696 + 20|0))>>2]|0;
       $229 = $226 >>> 3;
       $230 = $229 << 1;
       $231 = ((6696 + ($230<<2)|0) + 40|0);
       $232 = HEAP32[6696>>2]|0;
       $233 = 1 << $229;
       $234 = $232 & $233;
       $235 = ($234|0)==(0);
       if ($235) {
        $236 = $232 | $233;
        HEAP32[6696>>2] = $236;
        $$sum2$pre$i = (($230) + 2)|0;
        $$pre$i = ((6696 + ($$sum2$pre$i<<2)|0) + 40|0);
        $$pre$phi$iZ2D = $$pre$i;$F1$0$i = $231;
       } else {
        $$sum3$i = (($230) + 2)|0;
        $237 = ((6696 + ($$sum3$i<<2)|0) + 40|0);
        $238 = HEAP32[$237>>2]|0;
        $239 = HEAP32[((6696 + 16|0))>>2]|0;
        $240 = ($238>>>0)<($239>>>0);
        if ($240) {
         _abort();
         // unreachable;
        } else {
         $$pre$phi$iZ2D = $237;$F1$0$i = $238;
        }
       }
       HEAP32[$$pre$phi$iZ2D>>2] = $228;
       $241 = (($F1$0$i) + 12|0);
       HEAP32[$241>>2] = $228;
       $242 = (($228) + 8|0);
       HEAP32[$242>>2] = $F1$0$i;
       $243 = (($228) + 12|0);
       HEAP32[$243>>2] = $231;
      }
      HEAP32[((6696 + 8|0))>>2] = $rsize$0$i;
      HEAP32[((6696 + 20|0))>>2] = $151;
     }
     $244 = (($v$0$i) + 8|0);
     $mem$0 = $244;
     STACKTOP = sp;return ($mem$0|0);
    }
   } else {
    $nb$0 = $5;
   }
  } else {
   $245 = ($bytes>>>0)>(4294967231);
   if ($245) {
    $nb$0 = -1;
   } else {
    $246 = (($bytes) + 11)|0;
    $247 = $246 & -8;
    $248 = HEAP32[((6696 + 4|0))>>2]|0;
    $249 = ($248|0)==(0);
    if ($249) {
     $nb$0 = $247;
    } else {
     $250 = (0 - ($247))|0;
     $251 = $246 >>> 8;
     $252 = ($251|0)==(0);
     if ($252) {
      $idx$0$i = 0;
     } else {
      $253 = ($247>>>0)>(16777215);
      if ($253) {
       $idx$0$i = 31;
      } else {
       $254 = (($251) + 1048320)|0;
       $255 = $254 >>> 16;
       $256 = $255 & 8;
       $257 = $251 << $256;
       $258 = (($257) + 520192)|0;
       $259 = $258 >>> 16;
       $260 = $259 & 4;
       $261 = $260 | $256;
       $262 = $257 << $260;
       $263 = (($262) + 245760)|0;
       $264 = $263 >>> 16;
       $265 = $264 & 2;
       $266 = $261 | $265;
       $267 = (14 - ($266))|0;
       $268 = $262 << $265;
       $269 = $268 >>> 15;
       $270 = (($267) + ($269))|0;
       $271 = $270 << 1;
       $272 = (($270) + 7)|0;
       $273 = $247 >>> $272;
       $274 = $273 & 1;
       $275 = $274 | $271;
       $idx$0$i = $275;
      }
     }
     $276 = ((6696 + ($idx$0$i<<2)|0) + 304|0);
     $277 = HEAP32[$276>>2]|0;
     $278 = ($277|0)==(0|0);
     L126: do {
      if ($278) {
       $rsize$2$i = $250;$t$1$i = 0;$v$2$i = 0;
      } else {
       $279 = ($idx$0$i|0)==(31);
       if ($279) {
        $283 = 0;
       } else {
        $280 = $idx$0$i >>> 1;
        $281 = (25 - ($280))|0;
        $283 = $281;
       }
       $282 = $247 << $283;
       $rsize$0$i15 = $250;$rst$0$i = 0;$sizebits$0$i = $282;$t$0$i14 = $277;$v$0$i16 = 0;
       while(1) {
        $284 = (($t$0$i14) + 4|0);
        $285 = HEAP32[$284>>2]|0;
        $286 = $285 & -8;
        $287 = (($286) - ($247))|0;
        $288 = ($287>>>0)<($rsize$0$i15>>>0);
        if ($288) {
         $289 = ($286|0)==($247|0);
         if ($289) {
          $rsize$2$i = $287;$t$1$i = $t$0$i14;$v$2$i = $t$0$i14;
          break L126;
         } else {
          $rsize$1$i = $287;$v$1$i = $t$0$i14;
         }
        } else {
         $rsize$1$i = $rsize$0$i15;$v$1$i = $v$0$i16;
        }
        $290 = (($t$0$i14) + 20|0);
        $291 = HEAP32[$290>>2]|0;
        $292 = $sizebits$0$i >>> 31;
        $293 = ((($t$0$i14) + ($292<<2)|0) + 16|0);
        $294 = HEAP32[$293>>2]|0;
        $295 = ($291|0)==(0|0);
        $296 = ($291|0)==($294|0);
        $or$cond$i = $295 | $296;
        $rst$1$i = $or$cond$i ? $rst$0$i : $291;
        $297 = ($294|0)==(0|0);
        $298 = $sizebits$0$i << 1;
        if ($297) {
         $rsize$2$i = $rsize$1$i;$t$1$i = $rst$1$i;$v$2$i = $v$1$i;
         break;
        } else {
         $rsize$0$i15 = $rsize$1$i;$rst$0$i = $rst$1$i;$sizebits$0$i = $298;$t$0$i14 = $294;$v$0$i16 = $v$1$i;
        }
       }
      }
     } while(0);
     $299 = ($t$1$i|0)==(0|0);
     $300 = ($v$2$i|0)==(0|0);
     $or$cond19$i = $299 & $300;
     if ($or$cond19$i) {
      $301 = 2 << $idx$0$i;
      $302 = (0 - ($301))|0;
      $303 = $301 | $302;
      $304 = $248 & $303;
      $305 = ($304|0)==(0);
      if ($305) {
       $nb$0 = $247;
       break;
      }
      $306 = (0 - ($304))|0;
      $307 = $304 & $306;
      $308 = (($307) + -1)|0;
      $309 = $308 >>> 12;
      $310 = $309 & 16;
      $311 = $308 >>> $310;
      $312 = $311 >>> 5;
      $313 = $312 & 8;
      $314 = $313 | $310;
      $315 = $311 >>> $313;
      $316 = $315 >>> 2;
      $317 = $316 & 4;
      $318 = $314 | $317;
      $319 = $315 >>> $317;
      $320 = $319 >>> 1;
      $321 = $320 & 2;
      $322 = $318 | $321;
      $323 = $319 >>> $321;
      $324 = $323 >>> 1;
      $325 = $324 & 1;
      $326 = $322 | $325;
      $327 = $323 >>> $325;
      $328 = (($326) + ($327))|0;
      $329 = ((6696 + ($328<<2)|0) + 304|0);
      $330 = HEAP32[$329>>2]|0;
      $t$2$ph$i = $330;
     } else {
      $t$2$ph$i = $t$1$i;
     }
     $331 = ($t$2$ph$i|0)==(0|0);
     if ($331) {
      $rsize$3$lcssa$i = $rsize$2$i;$v$3$lcssa$i = $v$2$i;
     } else {
      $rsize$329$i = $rsize$2$i;$t$228$i = $t$2$ph$i;$v$330$i = $v$2$i;
      while(1) {
       $332 = (($t$228$i) + 4|0);
       $333 = HEAP32[$332>>2]|0;
       $334 = $333 & -8;
       $335 = (($334) - ($247))|0;
       $336 = ($335>>>0)<($rsize$329$i>>>0);
       $$rsize$3$i = $336 ? $335 : $rsize$329$i;
       $t$2$v$3$i = $336 ? $t$228$i : $v$330$i;
       $337 = (($t$228$i) + 16|0);
       $338 = HEAP32[$337>>2]|0;
       $339 = ($338|0)==(0|0);
       if (!($339)) {
        $rsize$329$i = $$rsize$3$i;$t$228$i = $338;$v$330$i = $t$2$v$3$i;
        continue;
       }
       $340 = (($t$228$i) + 20|0);
       $341 = HEAP32[$340>>2]|0;
       $342 = ($341|0)==(0|0);
       if ($342) {
        $rsize$3$lcssa$i = $$rsize$3$i;$v$3$lcssa$i = $t$2$v$3$i;
        break;
       } else {
        $rsize$329$i = $$rsize$3$i;$t$228$i = $341;$v$330$i = $t$2$v$3$i;
       }
      }
     }
     $343 = ($v$3$lcssa$i|0)==(0|0);
     if ($343) {
      $nb$0 = $247;
     } else {
      $344 = HEAP32[((6696 + 8|0))>>2]|0;
      $345 = (($344) - ($247))|0;
      $346 = ($rsize$3$lcssa$i>>>0)<($345>>>0);
      if ($346) {
       $347 = HEAP32[((6696 + 16|0))>>2]|0;
       $348 = ($v$3$lcssa$i>>>0)<($347>>>0);
       if ($348) {
        _abort();
        // unreachable;
       }
       $349 = (($v$3$lcssa$i) + ($247)|0);
       $350 = ($v$3$lcssa$i>>>0)<($349>>>0);
       if (!($350)) {
        _abort();
        // unreachable;
       }
       $351 = (($v$3$lcssa$i) + 24|0);
       $352 = HEAP32[$351>>2]|0;
       $353 = (($v$3$lcssa$i) + 12|0);
       $354 = HEAP32[$353>>2]|0;
       $355 = ($354|0)==($v$3$lcssa$i|0);
       do {
        if ($355) {
         $365 = (($v$3$lcssa$i) + 20|0);
         $366 = HEAP32[$365>>2]|0;
         $367 = ($366|0)==(0|0);
         if ($367) {
          $368 = (($v$3$lcssa$i) + 16|0);
          $369 = HEAP32[$368>>2]|0;
          $370 = ($369|0)==(0|0);
          if ($370) {
           $R$1$i20 = 0;
           break;
          } else {
           $R$0$i18 = $369;$RP$0$i17 = $368;
          }
         } else {
          $R$0$i18 = $366;$RP$0$i17 = $365;
         }
         while(1) {
          $371 = (($R$0$i18) + 20|0);
          $372 = HEAP32[$371>>2]|0;
          $373 = ($372|0)==(0|0);
          if (!($373)) {
           $R$0$i18 = $372;$RP$0$i17 = $371;
           continue;
          }
          $374 = (($R$0$i18) + 16|0);
          $375 = HEAP32[$374>>2]|0;
          $376 = ($375|0)==(0|0);
          if ($376) {
           break;
          } else {
           $R$0$i18 = $375;$RP$0$i17 = $374;
          }
         }
         $377 = ($RP$0$i17>>>0)<($347>>>0);
         if ($377) {
          _abort();
          // unreachable;
         } else {
          HEAP32[$RP$0$i17>>2] = 0;
          $R$1$i20 = $R$0$i18;
          break;
         }
        } else {
         $356 = (($v$3$lcssa$i) + 8|0);
         $357 = HEAP32[$356>>2]|0;
         $358 = ($357>>>0)<($347>>>0);
         if ($358) {
          _abort();
          // unreachable;
         }
         $359 = (($357) + 12|0);
         $360 = HEAP32[$359>>2]|0;
         $361 = ($360|0)==($v$3$lcssa$i|0);
         if (!($361)) {
          _abort();
          // unreachable;
         }
         $362 = (($354) + 8|0);
         $363 = HEAP32[$362>>2]|0;
         $364 = ($363|0)==($v$3$lcssa$i|0);
         if ($364) {
          HEAP32[$359>>2] = $354;
          HEAP32[$362>>2] = $357;
          $R$1$i20 = $354;
          break;
         } else {
          _abort();
          // unreachable;
         }
        }
       } while(0);
       $378 = ($352|0)==(0|0);
       do {
        if (!($378)) {
         $379 = (($v$3$lcssa$i) + 28|0);
         $380 = HEAP32[$379>>2]|0;
         $381 = ((6696 + ($380<<2)|0) + 304|0);
         $382 = HEAP32[$381>>2]|0;
         $383 = ($v$3$lcssa$i|0)==($382|0);
         if ($383) {
          HEAP32[$381>>2] = $R$1$i20;
          $cond$i21 = ($R$1$i20|0)==(0|0);
          if ($cond$i21) {
           $384 = 1 << $380;
           $385 = $384 ^ -1;
           $386 = HEAP32[((6696 + 4|0))>>2]|0;
           $387 = $386 & $385;
           HEAP32[((6696 + 4|0))>>2] = $387;
           break;
          }
         } else {
          $388 = HEAP32[((6696 + 16|0))>>2]|0;
          $389 = ($352>>>0)<($388>>>0);
          if ($389) {
           _abort();
           // unreachable;
          }
          $390 = (($352) + 16|0);
          $391 = HEAP32[$390>>2]|0;
          $392 = ($391|0)==($v$3$lcssa$i|0);
          if ($392) {
           HEAP32[$390>>2] = $R$1$i20;
          } else {
           $393 = (($352) + 20|0);
           HEAP32[$393>>2] = $R$1$i20;
          }
          $394 = ($R$1$i20|0)==(0|0);
          if ($394) {
           break;
          }
         }
         $395 = HEAP32[((6696 + 16|0))>>2]|0;
         $396 = ($R$1$i20>>>0)<($395>>>0);
         if ($396) {
          _abort();
          // unreachable;
         }
         $397 = (($R$1$i20) + 24|0);
         HEAP32[$397>>2] = $352;
         $398 = (($v$3$lcssa$i) + 16|0);
         $399 = HEAP32[$398>>2]|0;
         $400 = ($399|0)==(0|0);
         do {
          if (!($400)) {
           $401 = HEAP32[((6696 + 16|0))>>2]|0;
           $402 = ($399>>>0)<($401>>>0);
           if ($402) {
            _abort();
            // unreachable;
           } else {
            $403 = (($R$1$i20) + 16|0);
            HEAP32[$403>>2] = $399;
            $404 = (($399) + 24|0);
            HEAP32[$404>>2] = $R$1$i20;
            break;
           }
          }
         } while(0);
         $405 = (($v$3$lcssa$i) + 20|0);
         $406 = HEAP32[$405>>2]|0;
         $407 = ($406|0)==(0|0);
         if (!($407)) {
          $408 = HEAP32[((6696 + 16|0))>>2]|0;
          $409 = ($406>>>0)<($408>>>0);
          if ($409) {
           _abort();
           // unreachable;
          } else {
           $410 = (($R$1$i20) + 20|0);
           HEAP32[$410>>2] = $406;
           $411 = (($406) + 24|0);
           HEAP32[$411>>2] = $R$1$i20;
           break;
          }
         }
        }
       } while(0);
       $412 = ($rsize$3$lcssa$i>>>0)<(16);
       L204: do {
        if ($412) {
         $413 = (($rsize$3$lcssa$i) + ($247))|0;
         $414 = $413 | 3;
         $415 = (($v$3$lcssa$i) + 4|0);
         HEAP32[$415>>2] = $414;
         $$sum18$i = (($413) + 4)|0;
         $416 = (($v$3$lcssa$i) + ($$sum18$i)|0);
         $417 = HEAP32[$416>>2]|0;
         $418 = $417 | 1;
         HEAP32[$416>>2] = $418;
        } else {
         $419 = $247 | 3;
         $420 = (($v$3$lcssa$i) + 4|0);
         HEAP32[$420>>2] = $419;
         $421 = $rsize$3$lcssa$i | 1;
         $$sum$i2334 = $247 | 4;
         $422 = (($v$3$lcssa$i) + ($$sum$i2334)|0);
         HEAP32[$422>>2] = $421;
         $$sum1$i24 = (($rsize$3$lcssa$i) + ($247))|0;
         $423 = (($v$3$lcssa$i) + ($$sum1$i24)|0);
         HEAP32[$423>>2] = $rsize$3$lcssa$i;
         $424 = $rsize$3$lcssa$i >>> 3;
         $425 = ($rsize$3$lcssa$i>>>0)<(256);
         if ($425) {
          $426 = $424 << 1;
          $427 = ((6696 + ($426<<2)|0) + 40|0);
          $428 = HEAP32[6696>>2]|0;
          $429 = 1 << $424;
          $430 = $428 & $429;
          $431 = ($430|0)==(0);
          do {
           if ($431) {
            $432 = $428 | $429;
            HEAP32[6696>>2] = $432;
            $$sum14$pre$i = (($426) + 2)|0;
            $$pre$i25 = ((6696 + ($$sum14$pre$i<<2)|0) + 40|0);
            $$pre$phi$i26Z2D = $$pre$i25;$F5$0$i = $427;
           } else {
            $$sum17$i = (($426) + 2)|0;
            $433 = ((6696 + ($$sum17$i<<2)|0) + 40|0);
            $434 = HEAP32[$433>>2]|0;
            $435 = HEAP32[((6696 + 16|0))>>2]|0;
            $436 = ($434>>>0)<($435>>>0);
            if (!($436)) {
             $$pre$phi$i26Z2D = $433;$F5$0$i = $434;
             break;
            }
            _abort();
            // unreachable;
           }
          } while(0);
          HEAP32[$$pre$phi$i26Z2D>>2] = $349;
          $437 = (($F5$0$i) + 12|0);
          HEAP32[$437>>2] = $349;
          $$sum15$i = (($247) + 8)|0;
          $438 = (($v$3$lcssa$i) + ($$sum15$i)|0);
          HEAP32[$438>>2] = $F5$0$i;
          $$sum16$i = (($247) + 12)|0;
          $439 = (($v$3$lcssa$i) + ($$sum16$i)|0);
          HEAP32[$439>>2] = $427;
          break;
         }
         $440 = $rsize$3$lcssa$i >>> 8;
         $441 = ($440|0)==(0);
         if ($441) {
          $I7$0$i = 0;
         } else {
          $442 = ($rsize$3$lcssa$i>>>0)>(16777215);
          if ($442) {
           $I7$0$i = 31;
          } else {
           $443 = (($440) + 1048320)|0;
           $444 = $443 >>> 16;
           $445 = $444 & 8;
           $446 = $440 << $445;
           $447 = (($446) + 520192)|0;
           $448 = $447 >>> 16;
           $449 = $448 & 4;
           $450 = $449 | $445;
           $451 = $446 << $449;
           $452 = (($451) + 245760)|0;
           $453 = $452 >>> 16;
           $454 = $453 & 2;
           $455 = $450 | $454;
           $456 = (14 - ($455))|0;
           $457 = $451 << $454;
           $458 = $457 >>> 15;
           $459 = (($456) + ($458))|0;
           $460 = $459 << 1;
           $461 = (($459) + 7)|0;
           $462 = $rsize$3$lcssa$i >>> $461;
           $463 = $462 & 1;
           $464 = $463 | $460;
           $I7$0$i = $464;
          }
         }
         $465 = ((6696 + ($I7$0$i<<2)|0) + 304|0);
         $$sum2$i = (($247) + 28)|0;
         $466 = (($v$3$lcssa$i) + ($$sum2$i)|0);
         HEAP32[$466>>2] = $I7$0$i;
         $$sum3$i27 = (($247) + 16)|0;
         $467 = (($v$3$lcssa$i) + ($$sum3$i27)|0);
         $$sum4$i28 = (($247) + 20)|0;
         $468 = (($v$3$lcssa$i) + ($$sum4$i28)|0);
         HEAP32[$468>>2] = 0;
         HEAP32[$467>>2] = 0;
         $469 = HEAP32[((6696 + 4|0))>>2]|0;
         $470 = 1 << $I7$0$i;
         $471 = $469 & $470;
         $472 = ($471|0)==(0);
         if ($472) {
          $473 = $469 | $470;
          HEAP32[((6696 + 4|0))>>2] = $473;
          HEAP32[$465>>2] = $349;
          $$sum5$i = (($247) + 24)|0;
          $474 = (($v$3$lcssa$i) + ($$sum5$i)|0);
          HEAP32[$474>>2] = $465;
          $$sum6$i = (($247) + 12)|0;
          $475 = (($v$3$lcssa$i) + ($$sum6$i)|0);
          HEAP32[$475>>2] = $349;
          $$sum7$i = (($247) + 8)|0;
          $476 = (($v$3$lcssa$i) + ($$sum7$i)|0);
          HEAP32[$476>>2] = $349;
          break;
         }
         $477 = HEAP32[$465>>2]|0;
         $478 = ($I7$0$i|0)==(31);
         if ($478) {
          $486 = 0;
         } else {
          $479 = $I7$0$i >>> 1;
          $480 = (25 - ($479))|0;
          $486 = $480;
         }
         $481 = (($477) + 4|0);
         $482 = HEAP32[$481>>2]|0;
         $483 = $482 & -8;
         $484 = ($483|0)==($rsize$3$lcssa$i|0);
         L225: do {
          if ($484) {
           $T$0$lcssa$i = $477;
          } else {
           $485 = $rsize$3$lcssa$i << $486;
           $K12$025$i = $485;$T$024$i = $477;
           while(1) {
            $493 = $K12$025$i >>> 31;
            $494 = ((($T$024$i) + ($493<<2)|0) + 16|0);
            $489 = HEAP32[$494>>2]|0;
            $495 = ($489|0)==(0|0);
            if ($495) {
             break;
            }
            $487 = $K12$025$i << 1;
            $488 = (($489) + 4|0);
            $490 = HEAP32[$488>>2]|0;
            $491 = $490 & -8;
            $492 = ($491|0)==($rsize$3$lcssa$i|0);
            if ($492) {
             $T$0$lcssa$i = $489;
             break L225;
            } else {
             $K12$025$i = $487;$T$024$i = $489;
            }
           }
           $496 = HEAP32[((6696 + 16|0))>>2]|0;
           $497 = ($494>>>0)<($496>>>0);
           if ($497) {
            _abort();
            // unreachable;
           } else {
            HEAP32[$494>>2] = $349;
            $$sum11$i = (($247) + 24)|0;
            $498 = (($v$3$lcssa$i) + ($$sum11$i)|0);
            HEAP32[$498>>2] = $T$024$i;
            $$sum12$i = (($247) + 12)|0;
            $499 = (($v$3$lcssa$i) + ($$sum12$i)|0);
            HEAP32[$499>>2] = $349;
            $$sum13$i = (($247) + 8)|0;
            $500 = (($v$3$lcssa$i) + ($$sum13$i)|0);
            HEAP32[$500>>2] = $349;
            break L204;
           }
          }
         } while(0);
         $501 = (($T$0$lcssa$i) + 8|0);
         $502 = HEAP32[$501>>2]|0;
         $503 = HEAP32[((6696 + 16|0))>>2]|0;
         $504 = ($T$0$lcssa$i>>>0)<($503>>>0);
         if ($504) {
          _abort();
          // unreachable;
         }
         $505 = ($502>>>0)<($503>>>0);
         if ($505) {
          _abort();
          // unreachable;
         } else {
          $506 = (($502) + 12|0);
          HEAP32[$506>>2] = $349;
          HEAP32[$501>>2] = $349;
          $$sum8$i = (($247) + 8)|0;
          $507 = (($v$3$lcssa$i) + ($$sum8$i)|0);
          HEAP32[$507>>2] = $502;
          $$sum9$i = (($247) + 12)|0;
          $508 = (($v$3$lcssa$i) + ($$sum9$i)|0);
          HEAP32[$508>>2] = $T$0$lcssa$i;
          $$sum10$i = (($247) + 24)|0;
          $509 = (($v$3$lcssa$i) + ($$sum10$i)|0);
          HEAP32[$509>>2] = 0;
          break;
         }
        }
       } while(0);
       $510 = (($v$3$lcssa$i) + 8|0);
       $mem$0 = $510;
       STACKTOP = sp;return ($mem$0|0);
      } else {
       $nb$0 = $247;
      }
     }
    }
   }
  }
 } while(0);
 $511 = HEAP32[((6696 + 8|0))>>2]|0;
 $512 = ($nb$0>>>0)>($511>>>0);
 if (!($512)) {
  $513 = (($511) - ($nb$0))|0;
  $514 = HEAP32[((6696 + 20|0))>>2]|0;
  $515 = ($513>>>0)>(15);
  if ($515) {
   $516 = (($514) + ($nb$0)|0);
   HEAP32[((6696 + 20|0))>>2] = $516;
   HEAP32[((6696 + 8|0))>>2] = $513;
   $517 = $513 | 1;
   $$sum2 = (($nb$0) + 4)|0;
   $518 = (($514) + ($$sum2)|0);
   HEAP32[$518>>2] = $517;
   $519 = (($514) + ($511)|0);
   HEAP32[$519>>2] = $513;
   $520 = $nb$0 | 3;
   $521 = (($514) + 4|0);
   HEAP32[$521>>2] = $520;
  } else {
   HEAP32[((6696 + 8|0))>>2] = 0;
   HEAP32[((6696 + 20|0))>>2] = 0;
   $522 = $511 | 3;
   $523 = (($514) + 4|0);
   HEAP32[$523>>2] = $522;
   $$sum1 = (($511) + 4)|0;
   $524 = (($514) + ($$sum1)|0);
   $525 = HEAP32[$524>>2]|0;
   $526 = $525 | 1;
   HEAP32[$524>>2] = $526;
  }
  $527 = (($514) + 8|0);
  $mem$0 = $527;
  STACKTOP = sp;return ($mem$0|0);
 }
 $528 = HEAP32[((6696 + 12|0))>>2]|0;
 $529 = ($nb$0>>>0)<($528>>>0);
 if ($529) {
  $530 = (($528) - ($nb$0))|0;
  HEAP32[((6696 + 12|0))>>2] = $530;
  $531 = HEAP32[((6696 + 24|0))>>2]|0;
  $532 = (($531) + ($nb$0)|0);
  HEAP32[((6696 + 24|0))>>2] = $532;
  $533 = $530 | 1;
  $$sum = (($nb$0) + 4)|0;
  $534 = (($531) + ($$sum)|0);
  HEAP32[$534>>2] = $533;
  $535 = $nb$0 | 3;
  $536 = (($531) + 4|0);
  HEAP32[$536>>2] = $535;
  $537 = (($531) + 8|0);
  $mem$0 = $537;
  STACKTOP = sp;return ($mem$0|0);
 }
 $538 = HEAP32[7168>>2]|0;
 $539 = ($538|0)==(0);
 do {
  if ($539) {
   $540 = (_sysconf(30)|0);
   $541 = (($540) + -1)|0;
   $542 = $541 & $540;
   $543 = ($542|0)==(0);
   if ($543) {
    HEAP32[((7168 + 8|0))>>2] = $540;
    HEAP32[((7168 + 4|0))>>2] = $540;
    HEAP32[((7168 + 12|0))>>2] = -1;
    HEAP32[((7168 + 16|0))>>2] = -1;
    HEAP32[((7168 + 20|0))>>2] = 0;
    HEAP32[((6696 + 444|0))>>2] = 0;
    $544 = (_time((0|0))|0);
    $545 = $544 & -16;
    $546 = $545 ^ 1431655768;
    HEAP32[7168>>2] = $546;
    break;
   } else {
    _abort();
    // unreachable;
   }
  }
 } while(0);
 $547 = (($nb$0) + 48)|0;
 $548 = HEAP32[((7168 + 8|0))>>2]|0;
 $549 = (($nb$0) + 47)|0;
 $550 = (($548) + ($549))|0;
 $551 = (0 - ($548))|0;
 $552 = $550 & $551;
 $553 = ($552>>>0)>($nb$0>>>0);
 if (!($553)) {
  $mem$0 = 0;
  STACKTOP = sp;return ($mem$0|0);
 }
 $554 = HEAP32[((6696 + 440|0))>>2]|0;
 $555 = ($554|0)==(0);
 if (!($555)) {
  $556 = HEAP32[((6696 + 432|0))>>2]|0;
  $557 = (($556) + ($552))|0;
  $558 = ($557>>>0)<=($556>>>0);
  $559 = ($557>>>0)>($554>>>0);
  $or$cond1$i = $558 | $559;
  if ($or$cond1$i) {
   $mem$0 = 0;
   STACKTOP = sp;return ($mem$0|0);
  }
 }
 $560 = HEAP32[((6696 + 444|0))>>2]|0;
 $561 = $560 & 4;
 $562 = ($561|0)==(0);
 L269: do {
  if ($562) {
   $563 = HEAP32[((6696 + 24|0))>>2]|0;
   $564 = ($563|0)==(0|0);
   L271: do {
    if ($564) {
     label = 182;
    } else {
     $sp$0$i$i = ((6696 + 448|0));
     while(1) {
      $565 = HEAP32[$sp$0$i$i>>2]|0;
      $566 = ($565>>>0)>($563>>>0);
      if (!($566)) {
       $567 = (($sp$0$i$i) + 4|0);
       $568 = HEAP32[$567>>2]|0;
       $569 = (($565) + ($568)|0);
       $570 = ($569>>>0)>($563>>>0);
       if ($570) {
        break;
       }
      }
      $571 = (($sp$0$i$i) + 8|0);
      $572 = HEAP32[$571>>2]|0;
      $573 = ($572|0)==(0|0);
      if ($573) {
       label = 182;
       break L271;
      } else {
       $sp$0$i$i = $572;
      }
     }
     $574 = ($sp$0$i$i|0)==(0|0);
     if ($574) {
      label = 182;
     } else {
      $597 = HEAP32[((6696 + 12|0))>>2]|0;
      $598 = (($550) - ($597))|0;
      $599 = $598 & $551;
      $600 = ($599>>>0)<(2147483647);
      if ($600) {
       $601 = (_sbrk(($599|0))|0);
       $602 = HEAP32[$sp$0$i$i>>2]|0;
       $603 = HEAP32[$567>>2]|0;
       $604 = (($602) + ($603)|0);
       $605 = ($601|0)==($604|0);
       $$3$i = $605 ? $599 : 0;
       $$4$i = $605 ? $601 : (-1);
       $br$0$i = $601;$ssize$1$i = $599;$tbase$0$i = $$4$i;$tsize$0$i = $$3$i;
       label = 191;
      } else {
       $tsize$0323841$i = 0;
      }
     }
    }
   } while(0);
   do {
    if ((label|0) == 182) {
     $575 = (_sbrk(0)|0);
     $576 = ($575|0)==((-1)|0);
     if ($576) {
      $tsize$0323841$i = 0;
     } else {
      $577 = $575;
      $578 = HEAP32[((7168 + 4|0))>>2]|0;
      $579 = (($578) + -1)|0;
      $580 = $579 & $577;
      $581 = ($580|0)==(0);
      if ($581) {
       $ssize$0$i = $552;
      } else {
       $582 = (($579) + ($577))|0;
       $583 = (0 - ($578))|0;
       $584 = $582 & $583;
       $585 = (($552) - ($577))|0;
       $586 = (($585) + ($584))|0;
       $ssize$0$i = $586;
      }
      $587 = HEAP32[((6696 + 432|0))>>2]|0;
      $588 = (($587) + ($ssize$0$i))|0;
      $589 = ($ssize$0$i>>>0)>($nb$0>>>0);
      $590 = ($ssize$0$i>>>0)<(2147483647);
      $or$cond$i29 = $589 & $590;
      if ($or$cond$i29) {
       $591 = HEAP32[((6696 + 440|0))>>2]|0;
       $592 = ($591|0)==(0);
       if (!($592)) {
        $593 = ($588>>>0)<=($587>>>0);
        $594 = ($588>>>0)>($591>>>0);
        $or$cond2$i = $593 | $594;
        if ($or$cond2$i) {
         $tsize$0323841$i = 0;
         break;
        }
       }
       $595 = (_sbrk(($ssize$0$i|0))|0);
       $596 = ($595|0)==($575|0);
       $ssize$0$$i = $596 ? $ssize$0$i : 0;
       $$$i = $596 ? $575 : (-1);
       $br$0$i = $595;$ssize$1$i = $ssize$0$i;$tbase$0$i = $$$i;$tsize$0$i = $ssize$0$$i;
       label = 191;
      } else {
       $tsize$0323841$i = 0;
      }
     }
    }
   } while(0);
   L291: do {
    if ((label|0) == 191) {
     $606 = (0 - ($ssize$1$i))|0;
     $607 = ($tbase$0$i|0)==((-1)|0);
     if (!($607)) {
      $tbase$247$i = $tbase$0$i;$tsize$246$i = $tsize$0$i;
      label = 202;
      break L269;
     }
     $608 = ($br$0$i|0)!=((-1)|0);
     $609 = ($ssize$1$i>>>0)<(2147483647);
     $or$cond5$i = $608 & $609;
     $610 = ($ssize$1$i>>>0)<($547>>>0);
     $or$cond6$i = $or$cond5$i & $610;
     do {
      if ($or$cond6$i) {
       $611 = HEAP32[((7168 + 8|0))>>2]|0;
       $612 = (($549) - ($ssize$1$i))|0;
       $613 = (($612) + ($611))|0;
       $614 = (0 - ($611))|0;
       $615 = $613 & $614;
       $616 = ($615>>>0)<(2147483647);
       if ($616) {
        $617 = (_sbrk(($615|0))|0);
        $618 = ($617|0)==((-1)|0);
        if ($618) {
         (_sbrk(($606|0))|0);
         $tsize$0323841$i = $tsize$0$i;
         break L291;
        } else {
         $619 = (($615) + ($ssize$1$i))|0;
         $ssize$2$i = $619;
         break;
        }
       } else {
        $ssize$2$i = $ssize$1$i;
       }
      } else {
       $ssize$2$i = $ssize$1$i;
      }
     } while(0);
     $620 = ($br$0$i|0)==((-1)|0);
     if ($620) {
      $tsize$0323841$i = $tsize$0$i;
     } else {
      $tbase$247$i = $br$0$i;$tsize$246$i = $ssize$2$i;
      label = 202;
      break L269;
     }
    }
   } while(0);
   $621 = HEAP32[((6696 + 444|0))>>2]|0;
   $622 = $621 | 4;
   HEAP32[((6696 + 444|0))>>2] = $622;
   $tsize$1$i = $tsize$0323841$i;
   label = 199;
  } else {
   $tsize$1$i = 0;
   label = 199;
  }
 } while(0);
 if ((label|0) == 199) {
  $623 = ($552>>>0)<(2147483647);
  if ($623) {
   $624 = (_sbrk(($552|0))|0);
   $625 = (_sbrk(0)|0);
   $notlhs$i = ($624|0)!=((-1)|0);
   $notrhs$i = ($625|0)!=((-1)|0);
   $or$cond8$not$i = $notrhs$i & $notlhs$i;
   $626 = ($624>>>0)<($625>>>0);
   $or$cond9$i = $or$cond8$not$i & $626;
   if ($or$cond9$i) {
    $627 = $625;
    $628 = $624;
    $629 = (($627) - ($628))|0;
    $630 = (($nb$0) + 40)|0;
    $631 = ($629>>>0)>($630>>>0);
    $$tsize$1$i = $631 ? $629 : $tsize$1$i;
    if ($631) {
     $tbase$247$i = $624;$tsize$246$i = $$tsize$1$i;
     label = 202;
    }
   }
  }
 }
 if ((label|0) == 202) {
  $632 = HEAP32[((6696 + 432|0))>>2]|0;
  $633 = (($632) + ($tsize$246$i))|0;
  HEAP32[((6696 + 432|0))>>2] = $633;
  $634 = HEAP32[((6696 + 436|0))>>2]|0;
  $635 = ($633>>>0)>($634>>>0);
  if ($635) {
   HEAP32[((6696 + 436|0))>>2] = $633;
  }
  $636 = HEAP32[((6696 + 24|0))>>2]|0;
  $637 = ($636|0)==(0|0);
  L311: do {
   if ($637) {
    $638 = HEAP32[((6696 + 16|0))>>2]|0;
    $639 = ($638|0)==(0|0);
    $640 = ($tbase$247$i>>>0)<($638>>>0);
    $or$cond10$i = $639 | $640;
    if ($or$cond10$i) {
     HEAP32[((6696 + 16|0))>>2] = $tbase$247$i;
    }
    HEAP32[((6696 + 448|0))>>2] = $tbase$247$i;
    HEAP32[((6696 + 452|0))>>2] = $tsize$246$i;
    HEAP32[((6696 + 460|0))>>2] = 0;
    $641 = HEAP32[7168>>2]|0;
    HEAP32[((6696 + 36|0))>>2] = $641;
    HEAP32[((6696 + 32|0))>>2] = -1;
    $i$02$i$i = 0;
    while(1) {
     $642 = $i$02$i$i << 1;
     $643 = ((6696 + ($642<<2)|0) + 40|0);
     $$sum$i$i = (($642) + 3)|0;
     $644 = ((6696 + ($$sum$i$i<<2)|0) + 40|0);
     HEAP32[$644>>2] = $643;
     $$sum1$i$i = (($642) + 2)|0;
     $645 = ((6696 + ($$sum1$i$i<<2)|0) + 40|0);
     HEAP32[$645>>2] = $643;
     $646 = (($i$02$i$i) + 1)|0;
     $exitcond$i$i = ($646|0)==(32);
     if ($exitcond$i$i) {
      break;
     } else {
      $i$02$i$i = $646;
     }
    }
    $647 = (($tsize$246$i) + -40)|0;
    $648 = (($tbase$247$i) + 8|0);
    $649 = $648;
    $650 = $649 & 7;
    $651 = ($650|0)==(0);
    if ($651) {
     $655 = 0;
    } else {
     $652 = (0 - ($649))|0;
     $653 = $652 & 7;
     $655 = $653;
    }
    $654 = (($tbase$247$i) + ($655)|0);
    $656 = (($647) - ($655))|0;
    HEAP32[((6696 + 24|0))>>2] = $654;
    HEAP32[((6696 + 12|0))>>2] = $656;
    $657 = $656 | 1;
    $$sum$i14$i = (($655) + 4)|0;
    $658 = (($tbase$247$i) + ($$sum$i14$i)|0);
    HEAP32[$658>>2] = $657;
    $$sum2$i$i = (($tsize$246$i) + -36)|0;
    $659 = (($tbase$247$i) + ($$sum2$i$i)|0);
    HEAP32[$659>>2] = 40;
    $660 = HEAP32[((7168 + 16|0))>>2]|0;
    HEAP32[((6696 + 28|0))>>2] = $660;
   } else {
    $sp$075$i = ((6696 + 448|0));
    while(1) {
     $661 = HEAP32[$sp$075$i>>2]|0;
     $662 = (($sp$075$i) + 4|0);
     $663 = HEAP32[$662>>2]|0;
     $664 = (($661) + ($663)|0);
     $665 = ($tbase$247$i|0)==($664|0);
     if ($665) {
      label = 214;
      break;
     }
     $666 = (($sp$075$i) + 8|0);
     $667 = HEAP32[$666>>2]|0;
     $668 = ($667|0)==(0|0);
     if ($668) {
      break;
     } else {
      $sp$075$i = $667;
     }
    }
    if ((label|0) == 214) {
     $669 = (($sp$075$i) + 12|0);
     $670 = HEAP32[$669>>2]|0;
     $671 = $670 & 8;
     $672 = ($671|0)==(0);
     if ($672) {
      $673 = ($636>>>0)>=($661>>>0);
      $674 = ($636>>>0)<($tbase$247$i>>>0);
      $or$cond49$i = $673 & $674;
      if ($or$cond49$i) {
       $675 = (($663) + ($tsize$246$i))|0;
       HEAP32[$662>>2] = $675;
       $676 = HEAP32[((6696 + 12|0))>>2]|0;
       $677 = (($676) + ($tsize$246$i))|0;
       $678 = (($636) + 8|0);
       $679 = $678;
       $680 = $679 & 7;
       $681 = ($680|0)==(0);
       if ($681) {
        $685 = 0;
       } else {
        $682 = (0 - ($679))|0;
        $683 = $682 & 7;
        $685 = $683;
       }
       $684 = (($636) + ($685)|0);
       $686 = (($677) - ($685))|0;
       HEAP32[((6696 + 24|0))>>2] = $684;
       HEAP32[((6696 + 12|0))>>2] = $686;
       $687 = $686 | 1;
       $$sum$i18$i = (($685) + 4)|0;
       $688 = (($636) + ($$sum$i18$i)|0);
       HEAP32[$688>>2] = $687;
       $$sum2$i19$i = (($677) + 4)|0;
       $689 = (($636) + ($$sum2$i19$i)|0);
       HEAP32[$689>>2] = 40;
       $690 = HEAP32[((7168 + 16|0))>>2]|0;
       HEAP32[((6696 + 28|0))>>2] = $690;
       break;
      }
     }
    }
    $691 = HEAP32[((6696 + 16|0))>>2]|0;
    $692 = ($tbase$247$i>>>0)<($691>>>0);
    if ($692) {
     HEAP32[((6696 + 16|0))>>2] = $tbase$247$i;
    }
    $693 = (($tbase$247$i) + ($tsize$246$i)|0);
    $sp$168$i = ((6696 + 448|0));
    while(1) {
     $694 = HEAP32[$sp$168$i>>2]|0;
     $695 = ($694|0)==($693|0);
     if ($695) {
      label = 224;
      break;
     }
     $696 = (($sp$168$i) + 8|0);
     $697 = HEAP32[$696>>2]|0;
     $698 = ($697|0)==(0|0);
     if ($698) {
      break;
     } else {
      $sp$168$i = $697;
     }
    }
    if ((label|0) == 224) {
     $699 = (($sp$168$i) + 12|0);
     $700 = HEAP32[$699>>2]|0;
     $701 = $700 & 8;
     $702 = ($701|0)==(0);
     if ($702) {
      HEAP32[$sp$168$i>>2] = $tbase$247$i;
      $703 = (($sp$168$i) + 4|0);
      $704 = HEAP32[$703>>2]|0;
      $705 = (($704) + ($tsize$246$i))|0;
      HEAP32[$703>>2] = $705;
      $706 = (($tbase$247$i) + 8|0);
      $707 = $706;
      $708 = $707 & 7;
      $709 = ($708|0)==(0);
      if ($709) {
       $713 = 0;
      } else {
       $710 = (0 - ($707))|0;
       $711 = $710 & 7;
       $713 = $711;
      }
      $712 = (($tbase$247$i) + ($713)|0);
      $$sum107$i = (($tsize$246$i) + 8)|0;
      $714 = (($tbase$247$i) + ($$sum107$i)|0);
      $715 = $714;
      $716 = $715 & 7;
      $717 = ($716|0)==(0);
      if ($717) {
       $720 = 0;
      } else {
       $718 = (0 - ($715))|0;
       $719 = $718 & 7;
       $720 = $719;
      }
      $$sum108$i = (($720) + ($tsize$246$i))|0;
      $721 = (($tbase$247$i) + ($$sum108$i)|0);
      $722 = $721;
      $723 = $712;
      $724 = (($722) - ($723))|0;
      $$sum$i21$i = (($713) + ($nb$0))|0;
      $725 = (($tbase$247$i) + ($$sum$i21$i)|0);
      $726 = (($724) - ($nb$0))|0;
      $727 = $nb$0 | 3;
      $$sum1$i22$i = (($713) + 4)|0;
      $728 = (($tbase$247$i) + ($$sum1$i22$i)|0);
      HEAP32[$728>>2] = $727;
      $729 = HEAP32[((6696 + 24|0))>>2]|0;
      $730 = ($721|0)==($729|0);
      L348: do {
       if ($730) {
        $731 = HEAP32[((6696 + 12|0))>>2]|0;
        $732 = (($731) + ($726))|0;
        HEAP32[((6696 + 12|0))>>2] = $732;
        HEAP32[((6696 + 24|0))>>2] = $725;
        $733 = $732 | 1;
        $$sum42$i$i = (($$sum$i21$i) + 4)|0;
        $734 = (($tbase$247$i) + ($$sum42$i$i)|0);
        HEAP32[$734>>2] = $733;
       } else {
        $735 = HEAP32[((6696 + 20|0))>>2]|0;
        $736 = ($721|0)==($735|0);
        if ($736) {
         $737 = HEAP32[((6696 + 8|0))>>2]|0;
         $738 = (($737) + ($726))|0;
         HEAP32[((6696 + 8|0))>>2] = $738;
         HEAP32[((6696 + 20|0))>>2] = $725;
         $739 = $738 | 1;
         $$sum40$i$i = (($$sum$i21$i) + 4)|0;
         $740 = (($tbase$247$i) + ($$sum40$i$i)|0);
         HEAP32[$740>>2] = $739;
         $$sum41$i$i = (($738) + ($$sum$i21$i))|0;
         $741 = (($tbase$247$i) + ($$sum41$i$i)|0);
         HEAP32[$741>>2] = $738;
         break;
        }
        $$sum2$i23$i = (($tsize$246$i) + 4)|0;
        $$sum109$i = (($$sum2$i23$i) + ($720))|0;
        $742 = (($tbase$247$i) + ($$sum109$i)|0);
        $743 = HEAP32[$742>>2]|0;
        $744 = $743 & 3;
        $745 = ($744|0)==(1);
        if ($745) {
         $746 = $743 & -8;
         $747 = $743 >>> 3;
         $748 = ($743>>>0)<(256);
         L356: do {
          if ($748) {
           $$sum3738$i$i = $720 | 8;
           $$sum119$i = (($$sum3738$i$i) + ($tsize$246$i))|0;
           $749 = (($tbase$247$i) + ($$sum119$i)|0);
           $750 = HEAP32[$749>>2]|0;
           $$sum39$i$i = (($tsize$246$i) + 12)|0;
           $$sum120$i = (($$sum39$i$i) + ($720))|0;
           $751 = (($tbase$247$i) + ($$sum120$i)|0);
           $752 = HEAP32[$751>>2]|0;
           $753 = $747 << 1;
           $754 = ((6696 + ($753<<2)|0) + 40|0);
           $755 = ($750|0)==($754|0);
           do {
            if (!($755)) {
             $756 = HEAP32[((6696 + 16|0))>>2]|0;
             $757 = ($750>>>0)<($756>>>0);
             if ($757) {
              _abort();
              // unreachable;
             }
             $758 = (($750) + 12|0);
             $759 = HEAP32[$758>>2]|0;
             $760 = ($759|0)==($721|0);
             if ($760) {
              break;
             }
             _abort();
             // unreachable;
            }
           } while(0);
           $761 = ($752|0)==($750|0);
           if ($761) {
            $762 = 1 << $747;
            $763 = $762 ^ -1;
            $764 = HEAP32[6696>>2]|0;
            $765 = $764 & $763;
            HEAP32[6696>>2] = $765;
            break;
           }
           $766 = ($752|0)==($754|0);
           do {
            if ($766) {
             $$pre57$i$i = (($752) + 8|0);
             $$pre$phi58$i$iZ2D = $$pre57$i$i;
            } else {
             $767 = HEAP32[((6696 + 16|0))>>2]|0;
             $768 = ($752>>>0)<($767>>>0);
             if ($768) {
              _abort();
              // unreachable;
             }
             $769 = (($752) + 8|0);
             $770 = HEAP32[$769>>2]|0;
             $771 = ($770|0)==($721|0);
             if ($771) {
              $$pre$phi58$i$iZ2D = $769;
              break;
             }
             _abort();
             // unreachable;
            }
           } while(0);
           $772 = (($750) + 12|0);
           HEAP32[$772>>2] = $752;
           HEAP32[$$pre$phi58$i$iZ2D>>2] = $750;
          } else {
           $$sum34$i$i = $720 | 24;
           $$sum110$i = (($$sum34$i$i) + ($tsize$246$i))|0;
           $773 = (($tbase$247$i) + ($$sum110$i)|0);
           $774 = HEAP32[$773>>2]|0;
           $$sum5$i$i = (($tsize$246$i) + 12)|0;
           $$sum111$i = (($$sum5$i$i) + ($720))|0;
           $775 = (($tbase$247$i) + ($$sum111$i)|0);
           $776 = HEAP32[$775>>2]|0;
           $777 = ($776|0)==($721|0);
           do {
            if ($777) {
             $$sum67$i$i = $720 | 16;
             $$sum117$i = (($$sum2$i23$i) + ($$sum67$i$i))|0;
             $788 = (($tbase$247$i) + ($$sum117$i)|0);
             $789 = HEAP32[$788>>2]|0;
             $790 = ($789|0)==(0|0);
             if ($790) {
              $$sum118$i = (($$sum67$i$i) + ($tsize$246$i))|0;
              $791 = (($tbase$247$i) + ($$sum118$i)|0);
              $792 = HEAP32[$791>>2]|0;
              $793 = ($792|0)==(0|0);
              if ($793) {
               $R$1$i$i = 0;
               break;
              } else {
               $R$0$i$i = $792;$RP$0$i$i = $791;
              }
             } else {
              $R$0$i$i = $789;$RP$0$i$i = $788;
             }
             while(1) {
              $794 = (($R$0$i$i) + 20|0);
              $795 = HEAP32[$794>>2]|0;
              $796 = ($795|0)==(0|0);
              if (!($796)) {
               $R$0$i$i = $795;$RP$0$i$i = $794;
               continue;
              }
              $797 = (($R$0$i$i) + 16|0);
              $798 = HEAP32[$797>>2]|0;
              $799 = ($798|0)==(0|0);
              if ($799) {
               break;
              } else {
               $R$0$i$i = $798;$RP$0$i$i = $797;
              }
             }
             $800 = HEAP32[((6696 + 16|0))>>2]|0;
             $801 = ($RP$0$i$i>>>0)<($800>>>0);
             if ($801) {
              _abort();
              // unreachable;
             } else {
              HEAP32[$RP$0$i$i>>2] = 0;
              $R$1$i$i = $R$0$i$i;
              break;
             }
            } else {
             $$sum3536$i$i = $720 | 8;
             $$sum112$i = (($$sum3536$i$i) + ($tsize$246$i))|0;
             $778 = (($tbase$247$i) + ($$sum112$i)|0);
             $779 = HEAP32[$778>>2]|0;
             $780 = HEAP32[((6696 + 16|0))>>2]|0;
             $781 = ($779>>>0)<($780>>>0);
             if ($781) {
              _abort();
              // unreachable;
             }
             $782 = (($779) + 12|0);
             $783 = HEAP32[$782>>2]|0;
             $784 = ($783|0)==($721|0);
             if (!($784)) {
              _abort();
              // unreachable;
             }
             $785 = (($776) + 8|0);
             $786 = HEAP32[$785>>2]|0;
             $787 = ($786|0)==($721|0);
             if ($787) {
              HEAP32[$782>>2] = $776;
              HEAP32[$785>>2] = $779;
              $R$1$i$i = $776;
              break;
             } else {
              _abort();
              // unreachable;
             }
            }
           } while(0);
           $802 = ($774|0)==(0|0);
           if ($802) {
            break;
           }
           $$sum30$i$i = (($tsize$246$i) + 28)|0;
           $$sum113$i = (($$sum30$i$i) + ($720))|0;
           $803 = (($tbase$247$i) + ($$sum113$i)|0);
           $804 = HEAP32[$803>>2]|0;
           $805 = ((6696 + ($804<<2)|0) + 304|0);
           $806 = HEAP32[$805>>2]|0;
           $807 = ($721|0)==($806|0);
           do {
            if ($807) {
             HEAP32[$805>>2] = $R$1$i$i;
             $cond$i$i = ($R$1$i$i|0)==(0|0);
             if (!($cond$i$i)) {
              break;
             }
             $808 = 1 << $804;
             $809 = $808 ^ -1;
             $810 = HEAP32[((6696 + 4|0))>>2]|0;
             $811 = $810 & $809;
             HEAP32[((6696 + 4|0))>>2] = $811;
             break L356;
            } else {
             $812 = HEAP32[((6696 + 16|0))>>2]|0;
             $813 = ($774>>>0)<($812>>>0);
             if ($813) {
              _abort();
              // unreachable;
             }
             $814 = (($774) + 16|0);
             $815 = HEAP32[$814>>2]|0;
             $816 = ($815|0)==($721|0);
             if ($816) {
              HEAP32[$814>>2] = $R$1$i$i;
             } else {
              $817 = (($774) + 20|0);
              HEAP32[$817>>2] = $R$1$i$i;
             }
             $818 = ($R$1$i$i|0)==(0|0);
             if ($818) {
              break L356;
             }
            }
           } while(0);
           $819 = HEAP32[((6696 + 16|0))>>2]|0;
           $820 = ($R$1$i$i>>>0)<($819>>>0);
           if ($820) {
            _abort();
            // unreachable;
           }
           $821 = (($R$1$i$i) + 24|0);
           HEAP32[$821>>2] = $774;
           $$sum3132$i$i = $720 | 16;
           $$sum114$i = (($$sum3132$i$i) + ($tsize$246$i))|0;
           $822 = (($tbase$247$i) + ($$sum114$i)|0);
           $823 = HEAP32[$822>>2]|0;
           $824 = ($823|0)==(0|0);
           do {
            if (!($824)) {
             $825 = HEAP32[((6696 + 16|0))>>2]|0;
             $826 = ($823>>>0)<($825>>>0);
             if ($826) {
              _abort();
              // unreachable;
             } else {
              $827 = (($R$1$i$i) + 16|0);
              HEAP32[$827>>2] = $823;
              $828 = (($823) + 24|0);
              HEAP32[$828>>2] = $R$1$i$i;
              break;
             }
            }
           } while(0);
           $$sum115$i = (($$sum2$i23$i) + ($$sum3132$i$i))|0;
           $829 = (($tbase$247$i) + ($$sum115$i)|0);
           $830 = HEAP32[$829>>2]|0;
           $831 = ($830|0)==(0|0);
           if ($831) {
            break;
           }
           $832 = HEAP32[((6696 + 16|0))>>2]|0;
           $833 = ($830>>>0)<($832>>>0);
           if ($833) {
            _abort();
            // unreachable;
           } else {
            $834 = (($R$1$i$i) + 20|0);
            HEAP32[$834>>2] = $830;
            $835 = (($830) + 24|0);
            HEAP32[$835>>2] = $R$1$i$i;
            break;
           }
          }
         } while(0);
         $$sum9$i$i = $746 | $720;
         $$sum116$i = (($$sum9$i$i) + ($tsize$246$i))|0;
         $836 = (($tbase$247$i) + ($$sum116$i)|0);
         $837 = (($746) + ($726))|0;
         $oldfirst$0$i$i = $836;$qsize$0$i$i = $837;
        } else {
         $oldfirst$0$i$i = $721;$qsize$0$i$i = $726;
        }
        $838 = (($oldfirst$0$i$i) + 4|0);
        $839 = HEAP32[$838>>2]|0;
        $840 = $839 & -2;
        HEAP32[$838>>2] = $840;
        $841 = $qsize$0$i$i | 1;
        $$sum10$i$i = (($$sum$i21$i) + 4)|0;
        $842 = (($tbase$247$i) + ($$sum10$i$i)|0);
        HEAP32[$842>>2] = $841;
        $$sum11$i24$i = (($qsize$0$i$i) + ($$sum$i21$i))|0;
        $843 = (($tbase$247$i) + ($$sum11$i24$i)|0);
        HEAP32[$843>>2] = $qsize$0$i$i;
        $844 = $qsize$0$i$i >>> 3;
        $845 = ($qsize$0$i$i>>>0)<(256);
        if ($845) {
         $846 = $844 << 1;
         $847 = ((6696 + ($846<<2)|0) + 40|0);
         $848 = HEAP32[6696>>2]|0;
         $849 = 1 << $844;
         $850 = $848 & $849;
         $851 = ($850|0)==(0);
         do {
          if ($851) {
           $852 = $848 | $849;
           HEAP32[6696>>2] = $852;
           $$sum26$pre$i$i = (($846) + 2)|0;
           $$pre$i25$i = ((6696 + ($$sum26$pre$i$i<<2)|0) + 40|0);
           $$pre$phi$i26$iZ2D = $$pre$i25$i;$F4$0$i$i = $847;
          } else {
           $$sum29$i$i = (($846) + 2)|0;
           $853 = ((6696 + ($$sum29$i$i<<2)|0) + 40|0);
           $854 = HEAP32[$853>>2]|0;
           $855 = HEAP32[((6696 + 16|0))>>2]|0;
           $856 = ($854>>>0)<($855>>>0);
           if (!($856)) {
            $$pre$phi$i26$iZ2D = $853;$F4$0$i$i = $854;
            break;
           }
           _abort();
           // unreachable;
          }
         } while(0);
         HEAP32[$$pre$phi$i26$iZ2D>>2] = $725;
         $857 = (($F4$0$i$i) + 12|0);
         HEAP32[$857>>2] = $725;
         $$sum27$i$i = (($$sum$i21$i) + 8)|0;
         $858 = (($tbase$247$i) + ($$sum27$i$i)|0);
         HEAP32[$858>>2] = $F4$0$i$i;
         $$sum28$i$i = (($$sum$i21$i) + 12)|0;
         $859 = (($tbase$247$i) + ($$sum28$i$i)|0);
         HEAP32[$859>>2] = $847;
         break;
        }
        $860 = $qsize$0$i$i >>> 8;
        $861 = ($860|0)==(0);
        do {
         if ($861) {
          $I7$0$i$i = 0;
         } else {
          $862 = ($qsize$0$i$i>>>0)>(16777215);
          if ($862) {
           $I7$0$i$i = 31;
           break;
          }
          $863 = (($860) + 1048320)|0;
          $864 = $863 >>> 16;
          $865 = $864 & 8;
          $866 = $860 << $865;
          $867 = (($866) + 520192)|0;
          $868 = $867 >>> 16;
          $869 = $868 & 4;
          $870 = $869 | $865;
          $871 = $866 << $869;
          $872 = (($871) + 245760)|0;
          $873 = $872 >>> 16;
          $874 = $873 & 2;
          $875 = $870 | $874;
          $876 = (14 - ($875))|0;
          $877 = $871 << $874;
          $878 = $877 >>> 15;
          $879 = (($876) + ($878))|0;
          $880 = $879 << 1;
          $881 = (($879) + 7)|0;
          $882 = $qsize$0$i$i >>> $881;
          $883 = $882 & 1;
          $884 = $883 | $880;
          $I7$0$i$i = $884;
         }
        } while(0);
        $885 = ((6696 + ($I7$0$i$i<<2)|0) + 304|0);
        $$sum12$i$i = (($$sum$i21$i) + 28)|0;
        $886 = (($tbase$247$i) + ($$sum12$i$i)|0);
        HEAP32[$886>>2] = $I7$0$i$i;
        $$sum13$i$i = (($$sum$i21$i) + 16)|0;
        $887 = (($tbase$247$i) + ($$sum13$i$i)|0);
        $$sum14$i$i = (($$sum$i21$i) + 20)|0;
        $888 = (($tbase$247$i) + ($$sum14$i$i)|0);
        HEAP32[$888>>2] = 0;
        HEAP32[$887>>2] = 0;
        $889 = HEAP32[((6696 + 4|0))>>2]|0;
        $890 = 1 << $I7$0$i$i;
        $891 = $889 & $890;
        $892 = ($891|0)==(0);
        if ($892) {
         $893 = $889 | $890;
         HEAP32[((6696 + 4|0))>>2] = $893;
         HEAP32[$885>>2] = $725;
         $$sum15$i$i = (($$sum$i21$i) + 24)|0;
         $894 = (($tbase$247$i) + ($$sum15$i$i)|0);
         HEAP32[$894>>2] = $885;
         $$sum16$i$i = (($$sum$i21$i) + 12)|0;
         $895 = (($tbase$247$i) + ($$sum16$i$i)|0);
         HEAP32[$895>>2] = $725;
         $$sum17$i$i = (($$sum$i21$i) + 8)|0;
         $896 = (($tbase$247$i) + ($$sum17$i$i)|0);
         HEAP32[$896>>2] = $725;
         break;
        }
        $897 = HEAP32[$885>>2]|0;
        $898 = ($I7$0$i$i|0)==(31);
        if ($898) {
         $906 = 0;
        } else {
         $899 = $I7$0$i$i >>> 1;
         $900 = (25 - ($899))|0;
         $906 = $900;
        }
        $901 = (($897) + 4|0);
        $902 = HEAP32[$901>>2]|0;
        $903 = $902 & -8;
        $904 = ($903|0)==($qsize$0$i$i|0);
        L445: do {
         if ($904) {
          $T$0$lcssa$i28$i = $897;
         } else {
          $905 = $qsize$0$i$i << $906;
          $K8$052$i$i = $905;$T$051$i$i = $897;
          while(1) {
           $913 = $K8$052$i$i >>> 31;
           $914 = ((($T$051$i$i) + ($913<<2)|0) + 16|0);
           $909 = HEAP32[$914>>2]|0;
           $915 = ($909|0)==(0|0);
           if ($915) {
            break;
           }
           $907 = $K8$052$i$i << 1;
           $908 = (($909) + 4|0);
           $910 = HEAP32[$908>>2]|0;
           $911 = $910 & -8;
           $912 = ($911|0)==($qsize$0$i$i|0);
           if ($912) {
            $T$0$lcssa$i28$i = $909;
            break L445;
           } else {
            $K8$052$i$i = $907;$T$051$i$i = $909;
           }
          }
          $916 = HEAP32[((6696 + 16|0))>>2]|0;
          $917 = ($914>>>0)<($916>>>0);
          if ($917) {
           _abort();
           // unreachable;
          } else {
           HEAP32[$914>>2] = $725;
           $$sum23$i$i = (($$sum$i21$i) + 24)|0;
           $918 = (($tbase$247$i) + ($$sum23$i$i)|0);
           HEAP32[$918>>2] = $T$051$i$i;
           $$sum24$i$i = (($$sum$i21$i) + 12)|0;
           $919 = (($tbase$247$i) + ($$sum24$i$i)|0);
           HEAP32[$919>>2] = $725;
           $$sum25$i$i = (($$sum$i21$i) + 8)|0;
           $920 = (($tbase$247$i) + ($$sum25$i$i)|0);
           HEAP32[$920>>2] = $725;
           break L348;
          }
         }
        } while(0);
        $921 = (($T$0$lcssa$i28$i) + 8|0);
        $922 = HEAP32[$921>>2]|0;
        $923 = HEAP32[((6696 + 16|0))>>2]|0;
        $924 = ($T$0$lcssa$i28$i>>>0)<($923>>>0);
        if ($924) {
         _abort();
         // unreachable;
        }
        $925 = ($922>>>0)<($923>>>0);
        if ($925) {
         _abort();
         // unreachable;
        } else {
         $926 = (($922) + 12|0);
         HEAP32[$926>>2] = $725;
         HEAP32[$921>>2] = $725;
         $$sum20$i$i = (($$sum$i21$i) + 8)|0;
         $927 = (($tbase$247$i) + ($$sum20$i$i)|0);
         HEAP32[$927>>2] = $922;
         $$sum21$i$i = (($$sum$i21$i) + 12)|0;
         $928 = (($tbase$247$i) + ($$sum21$i$i)|0);
         HEAP32[$928>>2] = $T$0$lcssa$i28$i;
         $$sum22$i$i = (($$sum$i21$i) + 24)|0;
         $929 = (($tbase$247$i) + ($$sum22$i$i)|0);
         HEAP32[$929>>2] = 0;
         break;
        }
       }
      } while(0);
      $$sum1819$i$i = $713 | 8;
      $930 = (($tbase$247$i) + ($$sum1819$i$i)|0);
      $mem$0 = $930;
      STACKTOP = sp;return ($mem$0|0);
     }
    }
    $sp$0$i$i$i = ((6696 + 448|0));
    while(1) {
     $931 = HEAP32[$sp$0$i$i$i>>2]|0;
     $932 = ($931>>>0)>($636>>>0);
     if (!($932)) {
      $933 = (($sp$0$i$i$i) + 4|0);
      $934 = HEAP32[$933>>2]|0;
      $935 = (($931) + ($934)|0);
      $936 = ($935>>>0)>($636>>>0);
      if ($936) {
       break;
      }
     }
     $937 = (($sp$0$i$i$i) + 8|0);
     $938 = HEAP32[$937>>2]|0;
     $sp$0$i$i$i = $938;
    }
    $$sum$i15$i = (($934) + -47)|0;
    $$sum1$i16$i = (($934) + -39)|0;
    $939 = (($931) + ($$sum1$i16$i)|0);
    $940 = $939;
    $941 = $940 & 7;
    $942 = ($941|0)==(0);
    if ($942) {
     $945 = 0;
    } else {
     $943 = (0 - ($940))|0;
     $944 = $943 & 7;
     $945 = $944;
    }
    $$sum2$i17$i = (($$sum$i15$i) + ($945))|0;
    $946 = (($931) + ($$sum2$i17$i)|0);
    $947 = (($636) + 16|0);
    $948 = ($946>>>0)<($947>>>0);
    $949 = $948 ? $636 : $946;
    $950 = (($949) + 8|0);
    $951 = (($tsize$246$i) + -40)|0;
    $952 = (($tbase$247$i) + 8|0);
    $953 = $952;
    $954 = $953 & 7;
    $955 = ($954|0)==(0);
    if ($955) {
     $959 = 0;
    } else {
     $956 = (0 - ($953))|0;
     $957 = $956 & 7;
     $959 = $957;
    }
    $958 = (($tbase$247$i) + ($959)|0);
    $960 = (($951) - ($959))|0;
    HEAP32[((6696 + 24|0))>>2] = $958;
    HEAP32[((6696 + 12|0))>>2] = $960;
    $961 = $960 | 1;
    $$sum$i$i$i = (($959) + 4)|0;
    $962 = (($tbase$247$i) + ($$sum$i$i$i)|0);
    HEAP32[$962>>2] = $961;
    $$sum2$i$i$i = (($tsize$246$i) + -36)|0;
    $963 = (($tbase$247$i) + ($$sum2$i$i$i)|0);
    HEAP32[$963>>2] = 40;
    $964 = HEAP32[((7168 + 16|0))>>2]|0;
    HEAP32[((6696 + 28|0))>>2] = $964;
    $965 = (($949) + 4|0);
    HEAP32[$965>>2] = 27;
    ;HEAP32[$950+0>>2]=HEAP32[((6696 + 448|0))+0>>2]|0;HEAP32[$950+4>>2]=HEAP32[((6696 + 448|0))+4>>2]|0;HEAP32[$950+8>>2]=HEAP32[((6696 + 448|0))+8>>2]|0;HEAP32[$950+12>>2]=HEAP32[((6696 + 448|0))+12>>2]|0;
    HEAP32[((6696 + 448|0))>>2] = $tbase$247$i;
    HEAP32[((6696 + 452|0))>>2] = $tsize$246$i;
    HEAP32[((6696 + 460|0))>>2] = 0;
    HEAP32[((6696 + 456|0))>>2] = $950;
    $966 = (($949) + 28|0);
    HEAP32[$966>>2] = 7;
    $967 = (($949) + 32|0);
    $968 = ($967>>>0)<($935>>>0);
    if ($968) {
     $970 = $966;
     while(1) {
      $969 = (($970) + 4|0);
      HEAP32[$969>>2] = 7;
      $971 = (($970) + 8|0);
      $972 = ($971>>>0)<($935>>>0);
      if ($972) {
       $970 = $969;
      } else {
       break;
      }
     }
    }
    $973 = ($949|0)==($636|0);
    if (!($973)) {
     $974 = $949;
     $975 = $636;
     $976 = (($974) - ($975))|0;
     $977 = (($636) + ($976)|0);
     $$sum3$i$i = (($976) + 4)|0;
     $978 = (($636) + ($$sum3$i$i)|0);
     $979 = HEAP32[$978>>2]|0;
     $980 = $979 & -2;
     HEAP32[$978>>2] = $980;
     $981 = $976 | 1;
     $982 = (($636) + 4|0);
     HEAP32[$982>>2] = $981;
     HEAP32[$977>>2] = $976;
     $983 = $976 >>> 3;
     $984 = ($976>>>0)<(256);
     if ($984) {
      $985 = $983 << 1;
      $986 = ((6696 + ($985<<2)|0) + 40|0);
      $987 = HEAP32[6696>>2]|0;
      $988 = 1 << $983;
      $989 = $987 & $988;
      $990 = ($989|0)==(0);
      do {
       if ($990) {
        $991 = $987 | $988;
        HEAP32[6696>>2] = $991;
        $$sum10$pre$i$i = (($985) + 2)|0;
        $$pre$i$i = ((6696 + ($$sum10$pre$i$i<<2)|0) + 40|0);
        $$pre$phi$i$iZ2D = $$pre$i$i;$F$0$i$i = $986;
       } else {
        $$sum11$i$i = (($985) + 2)|0;
        $992 = ((6696 + ($$sum11$i$i<<2)|0) + 40|0);
        $993 = HEAP32[$992>>2]|0;
        $994 = HEAP32[((6696 + 16|0))>>2]|0;
        $995 = ($993>>>0)<($994>>>0);
        if (!($995)) {
         $$pre$phi$i$iZ2D = $992;$F$0$i$i = $993;
         break;
        }
        _abort();
        // unreachable;
       }
      } while(0);
      HEAP32[$$pre$phi$i$iZ2D>>2] = $636;
      $996 = (($F$0$i$i) + 12|0);
      HEAP32[$996>>2] = $636;
      $997 = (($636) + 8|0);
      HEAP32[$997>>2] = $F$0$i$i;
      $998 = (($636) + 12|0);
      HEAP32[$998>>2] = $986;
      break;
     }
     $999 = $976 >>> 8;
     $1000 = ($999|0)==(0);
     if ($1000) {
      $I1$0$i$i = 0;
     } else {
      $1001 = ($976>>>0)>(16777215);
      if ($1001) {
       $I1$0$i$i = 31;
      } else {
       $1002 = (($999) + 1048320)|0;
       $1003 = $1002 >>> 16;
       $1004 = $1003 & 8;
       $1005 = $999 << $1004;
       $1006 = (($1005) + 520192)|0;
       $1007 = $1006 >>> 16;
       $1008 = $1007 & 4;
       $1009 = $1008 | $1004;
       $1010 = $1005 << $1008;
       $1011 = (($1010) + 245760)|0;
       $1012 = $1011 >>> 16;
       $1013 = $1012 & 2;
       $1014 = $1009 | $1013;
       $1015 = (14 - ($1014))|0;
       $1016 = $1010 << $1013;
       $1017 = $1016 >>> 15;
       $1018 = (($1015) + ($1017))|0;
       $1019 = $1018 << 1;
       $1020 = (($1018) + 7)|0;
       $1021 = $976 >>> $1020;
       $1022 = $1021 & 1;
       $1023 = $1022 | $1019;
       $I1$0$i$i = $1023;
      }
     }
     $1024 = ((6696 + ($I1$0$i$i<<2)|0) + 304|0);
     $1025 = (($636) + 28|0);
     $I1$0$c$i$i = $I1$0$i$i;
     HEAP32[$1025>>2] = $I1$0$c$i$i;
     $1026 = (($636) + 20|0);
     HEAP32[$1026>>2] = 0;
     $1027 = (($636) + 16|0);
     HEAP32[$1027>>2] = 0;
     $1028 = HEAP32[((6696 + 4|0))>>2]|0;
     $1029 = 1 << $I1$0$i$i;
     $1030 = $1028 & $1029;
     $1031 = ($1030|0)==(0);
     if ($1031) {
      $1032 = $1028 | $1029;
      HEAP32[((6696 + 4|0))>>2] = $1032;
      HEAP32[$1024>>2] = $636;
      $1033 = (($636) + 24|0);
      HEAP32[$1033>>2] = $1024;
      $1034 = (($636) + 12|0);
      HEAP32[$1034>>2] = $636;
      $1035 = (($636) + 8|0);
      HEAP32[$1035>>2] = $636;
      break;
     }
     $1036 = HEAP32[$1024>>2]|0;
     $1037 = ($I1$0$i$i|0)==(31);
     if ($1037) {
      $1045 = 0;
     } else {
      $1038 = $I1$0$i$i >>> 1;
      $1039 = (25 - ($1038))|0;
      $1045 = $1039;
     }
     $1040 = (($1036) + 4|0);
     $1041 = HEAP32[$1040>>2]|0;
     $1042 = $1041 & -8;
     $1043 = ($1042|0)==($976|0);
     L499: do {
      if ($1043) {
       $T$0$lcssa$i$i = $1036;
      } else {
       $1044 = $976 << $1045;
       $K2$014$i$i = $1044;$T$013$i$i = $1036;
       while(1) {
        $1052 = $K2$014$i$i >>> 31;
        $1053 = ((($T$013$i$i) + ($1052<<2)|0) + 16|0);
        $1048 = HEAP32[$1053>>2]|0;
        $1054 = ($1048|0)==(0|0);
        if ($1054) {
         break;
        }
        $1046 = $K2$014$i$i << 1;
        $1047 = (($1048) + 4|0);
        $1049 = HEAP32[$1047>>2]|0;
        $1050 = $1049 & -8;
        $1051 = ($1050|0)==($976|0);
        if ($1051) {
         $T$0$lcssa$i$i = $1048;
         break L499;
        } else {
         $K2$014$i$i = $1046;$T$013$i$i = $1048;
        }
       }
       $1055 = HEAP32[((6696 + 16|0))>>2]|0;
       $1056 = ($1053>>>0)<($1055>>>0);
       if ($1056) {
        _abort();
        // unreachable;
       } else {
        HEAP32[$1053>>2] = $636;
        $1057 = (($636) + 24|0);
        HEAP32[$1057>>2] = $T$013$i$i;
        $1058 = (($636) + 12|0);
        HEAP32[$1058>>2] = $636;
        $1059 = (($636) + 8|0);
        HEAP32[$1059>>2] = $636;
        break L311;
       }
      }
     } while(0);
     $1060 = (($T$0$lcssa$i$i) + 8|0);
     $1061 = HEAP32[$1060>>2]|0;
     $1062 = HEAP32[((6696 + 16|0))>>2]|0;
     $1063 = ($T$0$lcssa$i$i>>>0)<($1062>>>0);
     if ($1063) {
      _abort();
      // unreachable;
     }
     $1064 = ($1061>>>0)<($1062>>>0);
     if ($1064) {
      _abort();
      // unreachable;
     } else {
      $1065 = (($1061) + 12|0);
      HEAP32[$1065>>2] = $636;
      HEAP32[$1060>>2] = $636;
      $1066 = (($636) + 8|0);
      HEAP32[$1066>>2] = $1061;
      $1067 = (($636) + 12|0);
      HEAP32[$1067>>2] = $T$0$lcssa$i$i;
      $1068 = (($636) + 24|0);
      HEAP32[$1068>>2] = 0;
      break;
     }
    }
   }
  } while(0);
  $1069 = HEAP32[((6696 + 12|0))>>2]|0;
  $1070 = ($1069>>>0)>($nb$0>>>0);
  if ($1070) {
   $1071 = (($1069) - ($nb$0))|0;
   HEAP32[((6696 + 12|0))>>2] = $1071;
   $1072 = HEAP32[((6696 + 24|0))>>2]|0;
   $1073 = (($1072) + ($nb$0)|0);
   HEAP32[((6696 + 24|0))>>2] = $1073;
   $1074 = $1071 | 1;
   $$sum$i32 = (($nb$0) + 4)|0;
   $1075 = (($1072) + ($$sum$i32)|0);
   HEAP32[$1075>>2] = $1074;
   $1076 = $nb$0 | 3;
   $1077 = (($1072) + 4|0);
   HEAP32[$1077>>2] = $1076;
   $1078 = (($1072) + 8|0);
   $mem$0 = $1078;
   STACKTOP = sp;return ($mem$0|0);
  }
 }
 $1079 = (___errno_location()|0);
 HEAP32[$1079>>2] = 12;
 $mem$0 = 0;
 STACKTOP = sp;return ($mem$0|0);
}
function _free($mem) {
 $mem = $mem|0;
 var $$pre = 0, $$pre$phi68Z2D = 0, $$pre$phi70Z2D = 0, $$pre$phiZ2D = 0, $$pre67 = 0, $$pre69 = 0, $$sum = 0, $$sum16$pre = 0, $$sum17 = 0, $$sum18 = 0, $$sum19 = 0, $$sum2 = 0, $$sum20 = 0, $$sum2324 = 0, $$sum25 = 0, $$sum26 = 0, $$sum28 = 0, $$sum29 = 0, $$sum3 = 0, $$sum30 = 0;
 var $$sum31 = 0, $$sum32 = 0, $$sum33 = 0, $$sum34 = 0, $$sum35 = 0, $$sum36 = 0, $$sum37 = 0, $$sum5 = 0, $$sum67 = 0, $$sum8 = 0, $$sum9 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0;
 var $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0;
 var $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0;
 var $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0;
 var $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0;
 var $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0;
 var $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0;
 var $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0;
 var $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0;
 var $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0;
 var $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0;
 var $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0;
 var $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0;
 var $322 = 0, $323 = 0, $324 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0;
 var $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0;
 var $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0;
 var $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $F16$0 = 0, $I18$0 = 0, $I18$0$c = 0, $K19$057 = 0;
 var $R$0 = 0, $R$1 = 0, $R7$0 = 0, $R7$1 = 0, $RP$0 = 0, $RP9$0 = 0, $T$0$lcssa = 0, $T$056 = 0, $cond = 0, $cond54 = 0, $p$0 = 0, $psize$0 = 0, $psize$1 = 0, $sp$0$i = 0, $sp$0$in$i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($mem|0)==(0|0);
 if ($0) {
  STACKTOP = sp;return;
 }
 $1 = (($mem) + -8|0);
 $2 = HEAP32[((6696 + 16|0))>>2]|0;
 $3 = ($1>>>0)<($2>>>0);
 if ($3) {
  _abort();
  // unreachable;
 }
 $4 = (($mem) + -4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 3;
 $7 = ($6|0)==(1);
 if ($7) {
  _abort();
  // unreachable;
 }
 $8 = $5 & -8;
 $$sum = (($8) + -8)|0;
 $9 = (($mem) + ($$sum)|0);
 $10 = $5 & 1;
 $11 = ($10|0)==(0);
 do {
  if ($11) {
   $12 = HEAP32[$1>>2]|0;
   $13 = ($6|0)==(0);
   if ($13) {
    STACKTOP = sp;return;
   }
   $$sum2 = (-8 - ($12))|0;
   $14 = (($mem) + ($$sum2)|0);
   $15 = (($12) + ($8))|0;
   $16 = ($14>>>0)<($2>>>0);
   if ($16) {
    _abort();
    // unreachable;
   }
   $17 = HEAP32[((6696 + 20|0))>>2]|0;
   $18 = ($14|0)==($17|0);
   if ($18) {
    $$sum3 = (($8) + -4)|0;
    $104 = (($mem) + ($$sum3)|0);
    $105 = HEAP32[$104>>2]|0;
    $106 = $105 & 3;
    $107 = ($106|0)==(3);
    if (!($107)) {
     $p$0 = $14;$psize$0 = $15;
     break;
    }
    HEAP32[((6696 + 8|0))>>2] = $15;
    $108 = HEAP32[$104>>2]|0;
    $109 = $108 & -2;
    HEAP32[$104>>2] = $109;
    $110 = $15 | 1;
    $$sum26 = (($$sum2) + 4)|0;
    $111 = (($mem) + ($$sum26)|0);
    HEAP32[$111>>2] = $110;
    HEAP32[$9>>2] = $15;
    STACKTOP = sp;return;
   }
   $19 = $12 >>> 3;
   $20 = ($12>>>0)<(256);
   if ($20) {
    $$sum36 = (($$sum2) + 8)|0;
    $21 = (($mem) + ($$sum36)|0);
    $22 = HEAP32[$21>>2]|0;
    $$sum37 = (($$sum2) + 12)|0;
    $23 = (($mem) + ($$sum37)|0);
    $24 = HEAP32[$23>>2]|0;
    $25 = $19 << 1;
    $26 = ((6696 + ($25<<2)|0) + 40|0);
    $27 = ($22|0)==($26|0);
    if (!($27)) {
     $28 = ($22>>>0)<($2>>>0);
     if ($28) {
      _abort();
      // unreachable;
     }
     $29 = (($22) + 12|0);
     $30 = HEAP32[$29>>2]|0;
     $31 = ($30|0)==($14|0);
     if (!($31)) {
      _abort();
      // unreachable;
     }
    }
    $32 = ($24|0)==($22|0);
    if ($32) {
     $33 = 1 << $19;
     $34 = $33 ^ -1;
     $35 = HEAP32[6696>>2]|0;
     $36 = $35 & $34;
     HEAP32[6696>>2] = $36;
     $p$0 = $14;$psize$0 = $15;
     break;
    }
    $37 = ($24|0)==($26|0);
    if ($37) {
     $$pre69 = (($24) + 8|0);
     $$pre$phi70Z2D = $$pre69;
    } else {
     $38 = ($24>>>0)<($2>>>0);
     if ($38) {
      _abort();
      // unreachable;
     }
     $39 = (($24) + 8|0);
     $40 = HEAP32[$39>>2]|0;
     $41 = ($40|0)==($14|0);
     if ($41) {
      $$pre$phi70Z2D = $39;
     } else {
      _abort();
      // unreachable;
     }
    }
    $42 = (($22) + 12|0);
    HEAP32[$42>>2] = $24;
    HEAP32[$$pre$phi70Z2D>>2] = $22;
    $p$0 = $14;$psize$0 = $15;
    break;
   }
   $$sum28 = (($$sum2) + 24)|0;
   $43 = (($mem) + ($$sum28)|0);
   $44 = HEAP32[$43>>2]|0;
   $$sum29 = (($$sum2) + 12)|0;
   $45 = (($mem) + ($$sum29)|0);
   $46 = HEAP32[$45>>2]|0;
   $47 = ($46|0)==($14|0);
   do {
    if ($47) {
     $$sum31 = (($$sum2) + 20)|0;
     $57 = (($mem) + ($$sum31)|0);
     $58 = HEAP32[$57>>2]|0;
     $59 = ($58|0)==(0|0);
     if ($59) {
      $$sum30 = (($$sum2) + 16)|0;
      $60 = (($mem) + ($$sum30)|0);
      $61 = HEAP32[$60>>2]|0;
      $62 = ($61|0)==(0|0);
      if ($62) {
       $R$1 = 0;
       break;
      } else {
       $R$0 = $61;$RP$0 = $60;
      }
     } else {
      $R$0 = $58;$RP$0 = $57;
     }
     while(1) {
      $63 = (($R$0) + 20|0);
      $64 = HEAP32[$63>>2]|0;
      $65 = ($64|0)==(0|0);
      if (!($65)) {
       $R$0 = $64;$RP$0 = $63;
       continue;
      }
      $66 = (($R$0) + 16|0);
      $67 = HEAP32[$66>>2]|0;
      $68 = ($67|0)==(0|0);
      if ($68) {
       break;
      } else {
       $R$0 = $67;$RP$0 = $66;
      }
     }
     $69 = ($RP$0>>>0)<($2>>>0);
     if ($69) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$RP$0>>2] = 0;
      $R$1 = $R$0;
      break;
     }
    } else {
     $$sum35 = (($$sum2) + 8)|0;
     $48 = (($mem) + ($$sum35)|0);
     $49 = HEAP32[$48>>2]|0;
     $50 = ($49>>>0)<($2>>>0);
     if ($50) {
      _abort();
      // unreachable;
     }
     $51 = (($49) + 12|0);
     $52 = HEAP32[$51>>2]|0;
     $53 = ($52|0)==($14|0);
     if (!($53)) {
      _abort();
      // unreachable;
     }
     $54 = (($46) + 8|0);
     $55 = HEAP32[$54>>2]|0;
     $56 = ($55|0)==($14|0);
     if ($56) {
      HEAP32[$51>>2] = $46;
      HEAP32[$54>>2] = $49;
      $R$1 = $46;
      break;
     } else {
      _abort();
      // unreachable;
     }
    }
   } while(0);
   $70 = ($44|0)==(0|0);
   if ($70) {
    $p$0 = $14;$psize$0 = $15;
   } else {
    $$sum32 = (($$sum2) + 28)|0;
    $71 = (($mem) + ($$sum32)|0);
    $72 = HEAP32[$71>>2]|0;
    $73 = ((6696 + ($72<<2)|0) + 304|0);
    $74 = HEAP32[$73>>2]|0;
    $75 = ($14|0)==($74|0);
    if ($75) {
     HEAP32[$73>>2] = $R$1;
     $cond = ($R$1|0)==(0|0);
     if ($cond) {
      $76 = 1 << $72;
      $77 = $76 ^ -1;
      $78 = HEAP32[((6696 + 4|0))>>2]|0;
      $79 = $78 & $77;
      HEAP32[((6696 + 4|0))>>2] = $79;
      $p$0 = $14;$psize$0 = $15;
      break;
     }
    } else {
     $80 = HEAP32[((6696 + 16|0))>>2]|0;
     $81 = ($44>>>0)<($80>>>0);
     if ($81) {
      _abort();
      // unreachable;
     }
     $82 = (($44) + 16|0);
     $83 = HEAP32[$82>>2]|0;
     $84 = ($83|0)==($14|0);
     if ($84) {
      HEAP32[$82>>2] = $R$1;
     } else {
      $85 = (($44) + 20|0);
      HEAP32[$85>>2] = $R$1;
     }
     $86 = ($R$1|0)==(0|0);
     if ($86) {
      $p$0 = $14;$psize$0 = $15;
      break;
     }
    }
    $87 = HEAP32[((6696 + 16|0))>>2]|0;
    $88 = ($R$1>>>0)<($87>>>0);
    if ($88) {
     _abort();
     // unreachable;
    }
    $89 = (($R$1) + 24|0);
    HEAP32[$89>>2] = $44;
    $$sum33 = (($$sum2) + 16)|0;
    $90 = (($mem) + ($$sum33)|0);
    $91 = HEAP32[$90>>2]|0;
    $92 = ($91|0)==(0|0);
    do {
     if (!($92)) {
      $93 = HEAP32[((6696 + 16|0))>>2]|0;
      $94 = ($91>>>0)<($93>>>0);
      if ($94) {
       _abort();
       // unreachable;
      } else {
       $95 = (($R$1) + 16|0);
       HEAP32[$95>>2] = $91;
       $96 = (($91) + 24|0);
       HEAP32[$96>>2] = $R$1;
       break;
      }
     }
    } while(0);
    $$sum34 = (($$sum2) + 20)|0;
    $97 = (($mem) + ($$sum34)|0);
    $98 = HEAP32[$97>>2]|0;
    $99 = ($98|0)==(0|0);
    if ($99) {
     $p$0 = $14;$psize$0 = $15;
    } else {
     $100 = HEAP32[((6696 + 16|0))>>2]|0;
     $101 = ($98>>>0)<($100>>>0);
     if ($101) {
      _abort();
      // unreachable;
     } else {
      $102 = (($R$1) + 20|0);
      HEAP32[$102>>2] = $98;
      $103 = (($98) + 24|0);
      HEAP32[$103>>2] = $R$1;
      $p$0 = $14;$psize$0 = $15;
      break;
     }
    }
   }
  } else {
   $p$0 = $1;$psize$0 = $8;
  }
 } while(0);
 $112 = ($p$0>>>0)<($9>>>0);
 if (!($112)) {
  _abort();
  // unreachable;
 }
 $$sum25 = (($8) + -4)|0;
 $113 = (($mem) + ($$sum25)|0);
 $114 = HEAP32[$113>>2]|0;
 $115 = $114 & 1;
 $116 = ($115|0)==(0);
 if ($116) {
  _abort();
  // unreachable;
 }
 $117 = $114 & 2;
 $118 = ($117|0)==(0);
 if ($118) {
  $119 = HEAP32[((6696 + 24|0))>>2]|0;
  $120 = ($9|0)==($119|0);
  if ($120) {
   $121 = HEAP32[((6696 + 12|0))>>2]|0;
   $122 = (($121) + ($psize$0))|0;
   HEAP32[((6696 + 12|0))>>2] = $122;
   HEAP32[((6696 + 24|0))>>2] = $p$0;
   $123 = $122 | 1;
   $124 = (($p$0) + 4|0);
   HEAP32[$124>>2] = $123;
   $125 = HEAP32[((6696 + 20|0))>>2]|0;
   $126 = ($p$0|0)==($125|0);
   if (!($126)) {
    STACKTOP = sp;return;
   }
   HEAP32[((6696 + 20|0))>>2] = 0;
   HEAP32[((6696 + 8|0))>>2] = 0;
   STACKTOP = sp;return;
  }
  $127 = HEAP32[((6696 + 20|0))>>2]|0;
  $128 = ($9|0)==($127|0);
  if ($128) {
   $129 = HEAP32[((6696 + 8|0))>>2]|0;
   $130 = (($129) + ($psize$0))|0;
   HEAP32[((6696 + 8|0))>>2] = $130;
   HEAP32[((6696 + 20|0))>>2] = $p$0;
   $131 = $130 | 1;
   $132 = (($p$0) + 4|0);
   HEAP32[$132>>2] = $131;
   $133 = (($p$0) + ($130)|0);
   HEAP32[$133>>2] = $130;
   STACKTOP = sp;return;
  }
  $134 = $114 & -8;
  $135 = (($134) + ($psize$0))|0;
  $136 = $114 >>> 3;
  $137 = ($114>>>0)<(256);
  do {
   if ($137) {
    $138 = (($mem) + ($8)|0);
    $139 = HEAP32[$138>>2]|0;
    $$sum2324 = $8 | 4;
    $140 = (($mem) + ($$sum2324)|0);
    $141 = HEAP32[$140>>2]|0;
    $142 = $136 << 1;
    $143 = ((6696 + ($142<<2)|0) + 40|0);
    $144 = ($139|0)==($143|0);
    if (!($144)) {
     $145 = HEAP32[((6696 + 16|0))>>2]|0;
     $146 = ($139>>>0)<($145>>>0);
     if ($146) {
      _abort();
      // unreachable;
     }
     $147 = (($139) + 12|0);
     $148 = HEAP32[$147>>2]|0;
     $149 = ($148|0)==($9|0);
     if (!($149)) {
      _abort();
      // unreachable;
     }
    }
    $150 = ($141|0)==($139|0);
    if ($150) {
     $151 = 1 << $136;
     $152 = $151 ^ -1;
     $153 = HEAP32[6696>>2]|0;
     $154 = $153 & $152;
     HEAP32[6696>>2] = $154;
     break;
    }
    $155 = ($141|0)==($143|0);
    if ($155) {
     $$pre67 = (($141) + 8|0);
     $$pre$phi68Z2D = $$pre67;
    } else {
     $156 = HEAP32[((6696 + 16|0))>>2]|0;
     $157 = ($141>>>0)<($156>>>0);
     if ($157) {
      _abort();
      // unreachable;
     }
     $158 = (($141) + 8|0);
     $159 = HEAP32[$158>>2]|0;
     $160 = ($159|0)==($9|0);
     if ($160) {
      $$pre$phi68Z2D = $158;
     } else {
      _abort();
      // unreachable;
     }
    }
    $161 = (($139) + 12|0);
    HEAP32[$161>>2] = $141;
    HEAP32[$$pre$phi68Z2D>>2] = $139;
   } else {
    $$sum5 = (($8) + 16)|0;
    $162 = (($mem) + ($$sum5)|0);
    $163 = HEAP32[$162>>2]|0;
    $$sum67 = $8 | 4;
    $164 = (($mem) + ($$sum67)|0);
    $165 = HEAP32[$164>>2]|0;
    $166 = ($165|0)==($9|0);
    do {
     if ($166) {
      $$sum9 = (($8) + 12)|0;
      $177 = (($mem) + ($$sum9)|0);
      $178 = HEAP32[$177>>2]|0;
      $179 = ($178|0)==(0|0);
      if ($179) {
       $$sum8 = (($8) + 8)|0;
       $180 = (($mem) + ($$sum8)|0);
       $181 = HEAP32[$180>>2]|0;
       $182 = ($181|0)==(0|0);
       if ($182) {
        $R7$1 = 0;
        break;
       } else {
        $R7$0 = $181;$RP9$0 = $180;
       }
      } else {
       $R7$0 = $178;$RP9$0 = $177;
      }
      while(1) {
       $183 = (($R7$0) + 20|0);
       $184 = HEAP32[$183>>2]|0;
       $185 = ($184|0)==(0|0);
       if (!($185)) {
        $R7$0 = $184;$RP9$0 = $183;
        continue;
       }
       $186 = (($R7$0) + 16|0);
       $187 = HEAP32[$186>>2]|0;
       $188 = ($187|0)==(0|0);
       if ($188) {
        break;
       } else {
        $R7$0 = $187;$RP9$0 = $186;
       }
      }
      $189 = HEAP32[((6696 + 16|0))>>2]|0;
      $190 = ($RP9$0>>>0)<($189>>>0);
      if ($190) {
       _abort();
       // unreachable;
      } else {
       HEAP32[$RP9$0>>2] = 0;
       $R7$1 = $R7$0;
       break;
      }
     } else {
      $167 = (($mem) + ($8)|0);
      $168 = HEAP32[$167>>2]|0;
      $169 = HEAP32[((6696 + 16|0))>>2]|0;
      $170 = ($168>>>0)<($169>>>0);
      if ($170) {
       _abort();
       // unreachable;
      }
      $171 = (($168) + 12|0);
      $172 = HEAP32[$171>>2]|0;
      $173 = ($172|0)==($9|0);
      if (!($173)) {
       _abort();
       // unreachable;
      }
      $174 = (($165) + 8|0);
      $175 = HEAP32[$174>>2]|0;
      $176 = ($175|0)==($9|0);
      if ($176) {
       HEAP32[$171>>2] = $165;
       HEAP32[$174>>2] = $168;
       $R7$1 = $165;
       break;
      } else {
       _abort();
       // unreachable;
      }
     }
    } while(0);
    $191 = ($163|0)==(0|0);
    if (!($191)) {
     $$sum18 = (($8) + 20)|0;
     $192 = (($mem) + ($$sum18)|0);
     $193 = HEAP32[$192>>2]|0;
     $194 = ((6696 + ($193<<2)|0) + 304|0);
     $195 = HEAP32[$194>>2]|0;
     $196 = ($9|0)==($195|0);
     if ($196) {
      HEAP32[$194>>2] = $R7$1;
      $cond54 = ($R7$1|0)==(0|0);
      if ($cond54) {
       $197 = 1 << $193;
       $198 = $197 ^ -1;
       $199 = HEAP32[((6696 + 4|0))>>2]|0;
       $200 = $199 & $198;
       HEAP32[((6696 + 4|0))>>2] = $200;
       break;
      }
     } else {
      $201 = HEAP32[((6696 + 16|0))>>2]|0;
      $202 = ($163>>>0)<($201>>>0);
      if ($202) {
       _abort();
       // unreachable;
      }
      $203 = (($163) + 16|0);
      $204 = HEAP32[$203>>2]|0;
      $205 = ($204|0)==($9|0);
      if ($205) {
       HEAP32[$203>>2] = $R7$1;
      } else {
       $206 = (($163) + 20|0);
       HEAP32[$206>>2] = $R7$1;
      }
      $207 = ($R7$1|0)==(0|0);
      if ($207) {
       break;
      }
     }
     $208 = HEAP32[((6696 + 16|0))>>2]|0;
     $209 = ($R7$1>>>0)<($208>>>0);
     if ($209) {
      _abort();
      // unreachable;
     }
     $210 = (($R7$1) + 24|0);
     HEAP32[$210>>2] = $163;
     $$sum19 = (($8) + 8)|0;
     $211 = (($mem) + ($$sum19)|0);
     $212 = HEAP32[$211>>2]|0;
     $213 = ($212|0)==(0|0);
     do {
      if (!($213)) {
       $214 = HEAP32[((6696 + 16|0))>>2]|0;
       $215 = ($212>>>0)<($214>>>0);
       if ($215) {
        _abort();
        // unreachable;
       } else {
        $216 = (($R7$1) + 16|0);
        HEAP32[$216>>2] = $212;
        $217 = (($212) + 24|0);
        HEAP32[$217>>2] = $R7$1;
        break;
       }
      }
     } while(0);
     $$sum20 = (($8) + 12)|0;
     $218 = (($mem) + ($$sum20)|0);
     $219 = HEAP32[$218>>2]|0;
     $220 = ($219|0)==(0|0);
     if (!($220)) {
      $221 = HEAP32[((6696 + 16|0))>>2]|0;
      $222 = ($219>>>0)<($221>>>0);
      if ($222) {
       _abort();
       // unreachable;
      } else {
       $223 = (($R7$1) + 20|0);
       HEAP32[$223>>2] = $219;
       $224 = (($219) + 24|0);
       HEAP32[$224>>2] = $R7$1;
       break;
      }
     }
    }
   }
  } while(0);
  $225 = $135 | 1;
  $226 = (($p$0) + 4|0);
  HEAP32[$226>>2] = $225;
  $227 = (($p$0) + ($135)|0);
  HEAP32[$227>>2] = $135;
  $228 = HEAP32[((6696 + 20|0))>>2]|0;
  $229 = ($p$0|0)==($228|0);
  if ($229) {
   HEAP32[((6696 + 8|0))>>2] = $135;
   STACKTOP = sp;return;
  } else {
   $psize$1 = $135;
  }
 } else {
  $230 = $114 & -2;
  HEAP32[$113>>2] = $230;
  $231 = $psize$0 | 1;
  $232 = (($p$0) + 4|0);
  HEAP32[$232>>2] = $231;
  $233 = (($p$0) + ($psize$0)|0);
  HEAP32[$233>>2] = $psize$0;
  $psize$1 = $psize$0;
 }
 $234 = $psize$1 >>> 3;
 $235 = ($psize$1>>>0)<(256);
 if ($235) {
  $236 = $234 << 1;
  $237 = ((6696 + ($236<<2)|0) + 40|0);
  $238 = HEAP32[6696>>2]|0;
  $239 = 1 << $234;
  $240 = $238 & $239;
  $241 = ($240|0)==(0);
  if ($241) {
   $242 = $238 | $239;
   HEAP32[6696>>2] = $242;
   $$sum16$pre = (($236) + 2)|0;
   $$pre = ((6696 + ($$sum16$pre<<2)|0) + 40|0);
   $$pre$phiZ2D = $$pre;$F16$0 = $237;
  } else {
   $$sum17 = (($236) + 2)|0;
   $243 = ((6696 + ($$sum17<<2)|0) + 40|0);
   $244 = HEAP32[$243>>2]|0;
   $245 = HEAP32[((6696 + 16|0))>>2]|0;
   $246 = ($244>>>0)<($245>>>0);
   if ($246) {
    _abort();
    // unreachable;
   } else {
    $$pre$phiZ2D = $243;$F16$0 = $244;
   }
  }
  HEAP32[$$pre$phiZ2D>>2] = $p$0;
  $247 = (($F16$0) + 12|0);
  HEAP32[$247>>2] = $p$0;
  $248 = (($p$0) + 8|0);
  HEAP32[$248>>2] = $F16$0;
  $249 = (($p$0) + 12|0);
  HEAP32[$249>>2] = $237;
  STACKTOP = sp;return;
 }
 $250 = $psize$1 >>> 8;
 $251 = ($250|0)==(0);
 if ($251) {
  $I18$0 = 0;
 } else {
  $252 = ($psize$1>>>0)>(16777215);
  if ($252) {
   $I18$0 = 31;
  } else {
   $253 = (($250) + 1048320)|0;
   $254 = $253 >>> 16;
   $255 = $254 & 8;
   $256 = $250 << $255;
   $257 = (($256) + 520192)|0;
   $258 = $257 >>> 16;
   $259 = $258 & 4;
   $260 = $259 | $255;
   $261 = $256 << $259;
   $262 = (($261) + 245760)|0;
   $263 = $262 >>> 16;
   $264 = $263 & 2;
   $265 = $260 | $264;
   $266 = (14 - ($265))|0;
   $267 = $261 << $264;
   $268 = $267 >>> 15;
   $269 = (($266) + ($268))|0;
   $270 = $269 << 1;
   $271 = (($269) + 7)|0;
   $272 = $psize$1 >>> $271;
   $273 = $272 & 1;
   $274 = $273 | $270;
   $I18$0 = $274;
  }
 }
 $275 = ((6696 + ($I18$0<<2)|0) + 304|0);
 $276 = (($p$0) + 28|0);
 $I18$0$c = $I18$0;
 HEAP32[$276>>2] = $I18$0$c;
 $277 = (($p$0) + 20|0);
 HEAP32[$277>>2] = 0;
 $278 = (($p$0) + 16|0);
 HEAP32[$278>>2] = 0;
 $279 = HEAP32[((6696 + 4|0))>>2]|0;
 $280 = 1 << $I18$0;
 $281 = $279 & $280;
 $282 = ($281|0)==(0);
 L199: do {
  if ($282) {
   $283 = $279 | $280;
   HEAP32[((6696 + 4|0))>>2] = $283;
   HEAP32[$275>>2] = $p$0;
   $284 = (($p$0) + 24|0);
   HEAP32[$284>>2] = $275;
   $285 = (($p$0) + 12|0);
   HEAP32[$285>>2] = $p$0;
   $286 = (($p$0) + 8|0);
   HEAP32[$286>>2] = $p$0;
  } else {
   $287 = HEAP32[$275>>2]|0;
   $288 = ($I18$0|0)==(31);
   if ($288) {
    $296 = 0;
   } else {
    $289 = $I18$0 >>> 1;
    $290 = (25 - ($289))|0;
    $296 = $290;
   }
   $291 = (($287) + 4|0);
   $292 = HEAP32[$291>>2]|0;
   $293 = $292 & -8;
   $294 = ($293|0)==($psize$1|0);
   L204: do {
    if ($294) {
     $T$0$lcssa = $287;
    } else {
     $295 = $psize$1 << $296;
     $K19$057 = $295;$T$056 = $287;
     while(1) {
      $303 = $K19$057 >>> 31;
      $304 = ((($T$056) + ($303<<2)|0) + 16|0);
      $299 = HEAP32[$304>>2]|0;
      $305 = ($299|0)==(0|0);
      if ($305) {
       break;
      }
      $297 = $K19$057 << 1;
      $298 = (($299) + 4|0);
      $300 = HEAP32[$298>>2]|0;
      $301 = $300 & -8;
      $302 = ($301|0)==($psize$1|0);
      if ($302) {
       $T$0$lcssa = $299;
       break L204;
      } else {
       $K19$057 = $297;$T$056 = $299;
      }
     }
     $306 = HEAP32[((6696 + 16|0))>>2]|0;
     $307 = ($304>>>0)<($306>>>0);
     if ($307) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$304>>2] = $p$0;
      $308 = (($p$0) + 24|0);
      HEAP32[$308>>2] = $T$056;
      $309 = (($p$0) + 12|0);
      HEAP32[$309>>2] = $p$0;
      $310 = (($p$0) + 8|0);
      HEAP32[$310>>2] = $p$0;
      break L199;
     }
    }
   } while(0);
   $311 = (($T$0$lcssa) + 8|0);
   $312 = HEAP32[$311>>2]|0;
   $313 = HEAP32[((6696 + 16|0))>>2]|0;
   $314 = ($T$0$lcssa>>>0)<($313>>>0);
   if ($314) {
    _abort();
    // unreachable;
   }
   $315 = ($312>>>0)<($313>>>0);
   if ($315) {
    _abort();
    // unreachable;
   } else {
    $316 = (($312) + 12|0);
    HEAP32[$316>>2] = $p$0;
    HEAP32[$311>>2] = $p$0;
    $317 = (($p$0) + 8|0);
    HEAP32[$317>>2] = $312;
    $318 = (($p$0) + 12|0);
    HEAP32[$318>>2] = $T$0$lcssa;
    $319 = (($p$0) + 24|0);
    HEAP32[$319>>2] = 0;
    break;
   }
  }
 } while(0);
 $320 = HEAP32[((6696 + 32|0))>>2]|0;
 $321 = (($320) + -1)|0;
 HEAP32[((6696 + 32|0))>>2] = $321;
 $322 = ($321|0)==(0);
 if ($322) {
  $sp$0$in$i = ((6696 + 456|0));
 } else {
  STACKTOP = sp;return;
 }
 while(1) {
  $sp$0$i = HEAP32[$sp$0$in$i>>2]|0;
  $323 = ($sp$0$i|0)==(0|0);
  $324 = (($sp$0$i) + 8|0);
  if ($323) {
   break;
  } else {
   $sp$0$in$i = $324;
  }
 }
 HEAP32[((6696 + 32|0))>>2] = -1;
 STACKTOP = sp;return;
}
function runPostSets() {
 
}
function _memset(ptr, value, num) {
    ptr = ptr|0; value = value|0; num = num|0;
    var stop = 0, value4 = 0, stop4 = 0, unaligned = 0;
    stop = (ptr + num)|0;
    if ((num|0) >= 20) {
      // This is unaligned, but quite large, so work hard to get to aligned settings
      value = value & 0xff;
      unaligned = ptr & 3;
      value4 = value | (value << 8) | (value << 16) | (value << 24);
      stop4 = stop & ~3;
      if (unaligned) {
        unaligned = (ptr + 4 - unaligned)|0;
        while ((ptr|0) < (unaligned|0)) { // no need to check for stop, since we have large num
          HEAP8[((ptr)>>0)]=value;
          ptr = (ptr+1)|0;
        }
      }
      while ((ptr|0) < (stop4|0)) {
        HEAP32[((ptr)>>2)]=value4;
        ptr = (ptr+4)|0;
      }
    }
    while ((ptr|0) < (stop|0)) {
      HEAP8[((ptr)>>0)]=value;
      ptr = (ptr+1)|0;
    }
    return (ptr-num)|0;
}
function _strlen(ptr) {
    ptr = ptr|0;
    var curr = 0;
    curr = ptr;
    while (((HEAP8[((curr)>>0)])|0)) {
      curr = (curr + 1)|0;
    }
    return (curr - ptr)|0;
}
function _memcpy(dest, src, num) {

    dest = dest|0; src = src|0; num = num|0;
    var ret = 0;
    if ((num|0) >= 4096) return _emscripten_memcpy_big(dest|0, src|0, num|0)|0;
    ret = dest|0;
    if ((dest&3) == (src&3)) {
      while (dest & 3) {
        if ((num|0) == 0) return ret|0;
        HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
        dest = (dest+1)|0;
        src = (src+1)|0;
        num = (num-1)|0;
      }
      while ((num|0) >= 4) {
        HEAP32[((dest)>>2)]=((HEAP32[((src)>>2)])|0);
        dest = (dest+4)|0;
        src = (src+4)|0;
        num = (num-4)|0;
      }
    }
    while ((num|0) > 0) {
      HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
      dest = (dest+1)|0;
      src = (src+1)|0;
      num = (num-1)|0;
    }
    return ret|0;
}

// EMSCRIPTEN_END_FUNCS

  
  function dynCall_viiiii(index,a1,a2,a3,a4,a5) {
    index = index|0;
    a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0;
    FUNCTION_TABLE_viiiii[index&31](a1|0,a2|0,a3|0,a4|0,a5|0);
  }


  function dynCall_vi(index,a1) {
    index = index|0;
    a1=a1|0;
    FUNCTION_TABLE_vi[index&31](a1|0);
  }


  function dynCall_vii(index,a1,a2) {
    index = index|0;
    a1=a1|0; a2=a2|0;
    FUNCTION_TABLE_vii[index&7](a1|0,a2|0);
  }


  function dynCall_iiii(index,a1,a2,a3) {
    index = index|0;
    a1=a1|0; a2=a2|0; a3=a3|0;
    return FUNCTION_TABLE_iiii[index&15](a1|0,a2|0,a3|0)|0;
  }


  function dynCall_v(index) {
    index = index|0;
    
    FUNCTION_TABLE_v[index&3]();
  }


  function dynCall_viiiiii(index,a1,a2,a3,a4,a5,a6) {
    index = index|0;
    a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0; a6=a6|0;
    FUNCTION_TABLE_viiiiii[index&31](a1|0,a2|0,a3|0,a4|0,a5|0,a6|0);
  }


  function dynCall_viiii(index,a1,a2,a3,a4) {
    index = index|0;
    a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0;
    FUNCTION_TABLE_viiii[index&31](a1|0,a2|0,a3|0,a4|0);
  }

function b0(p0,p1,p2,p3,p4) { p0 = p0|0;p1 = p1|0;p2 = p2|0;p3 = p3|0;p4 = p4|0; nullFunc_viiiii(0); }
  function b1(p0) { p0 = p0|0; nullFunc_vi(1); }
  function b2(p0,p1) { p0 = p0|0;p1 = p1|0; nullFunc_vii(2); }
  function b3(p0,p1,p2) { p0 = p0|0;p1 = p1|0;p2 = p2|0; nullFunc_iiii(3);return 0; }
  function b4() { ; nullFunc_v(4); }
  function ___cxa_pure_virtual__wrapper() { ; ___cxa_pure_virtual(); }
  function b5(p0,p1,p2,p3,p4,p5) { p0 = p0|0;p1 = p1|0;p2 = p2|0;p3 = p3|0;p4 = p4|0;p5 = p5|0; nullFunc_viiiiii(5); }
  function b6(p0,p1,p2,p3) { p0 = p0|0;p1 = p1|0;p2 = p2|0;p3 = p3|0; nullFunc_viiii(6); }
  // EMSCRIPTEN_END_FUNCS
  var FUNCTION_TABLE_viiiii = [b0,b0,b0,b0,b0,b0,b0,b0,b0,b0,b0,b0,b0,b0,__ZNK10__cxxabiv117__class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib,b0,b0,b0,__ZNK10__cxxabiv120__si_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib,b0,b0,b0,b0,b0,b0,b0,b0,b0,b0
  ,b0,b0,b0];
  var FUNCTION_TABLE_vi = [b1,b1,b1,b1,b1,b1,b1,b1,__ZN10__cxxabiv116__shim_type_infoD2Ev,__ZN10__cxxabiv117__class_type_infoD0Ev,__ZNK10__cxxabiv116__shim_type_info5noop1Ev,__ZNK10__cxxabiv116__shim_type_info5noop2Ev,b1,b1,b1,b1,__ZN10__cxxabiv120__si_class_type_infoD0Ev,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1
  ,b1,b1,b1];
  var FUNCTION_TABLE_vii = [b2,__ZN6squish10ClusterFit9Compress3EPv,__ZN6squish10ClusterFit9Compress4EPv,b2,__ZN6squish8RangeFit9Compress3EPv,__ZN6squish8RangeFit9Compress4EPv,__ZN6squish15SingleColourFit9Compress3EPv,__ZN6squish15SingleColourFit9Compress4EPv];
  var FUNCTION_TABLE_iiii = [b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,__ZNK10__cxxabiv117__class_type_info9can_catchEPKNS_16__shim_type_infoERPv,b3,b3,b3];
  var FUNCTION_TABLE_v = [b4,b4,b4,___cxa_pure_virtual__wrapper];
  var FUNCTION_TABLE_viiiiii = [b5,b5,b5,b5,b5,b5,b5,b5,b5,b5,b5,b5,b5,__ZNK10__cxxabiv117__class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib,b5,b5,b5,__ZNK10__cxxabiv120__si_class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib,b5,b5,b5,b5,b5,b5,b5,b5,b5,b5,b5
  ,b5,b5,b5];
  var FUNCTION_TABLE_viiii = [b6,b6,b6,b6,b6,b6,b6,b6,b6,b6,b6,b6,b6,b6,b6,__ZNK10__cxxabiv117__class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi,b6,b6,b6,__ZNK10__cxxabiv120__si_class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi,b6,b6,b6,b6,b6,b6,b6,b6,b6
  ,b6,b6,b6];

  return { _CompressImage: _CompressImage, _strlen: _strlen, _free: _free, _main: _main, _memset: _memset, _malloc: _malloc, _memcpy: _memcpy, _GetStorageRequirements: _GetStorageRequirements, _DecompressImage: _DecompressImage, runPostSets: runPostSets, stackAlloc: stackAlloc, stackSave: stackSave, stackRestore: stackRestore, setThrew: setThrew, setTempRet0: setTempRet0, getTempRet0: getTempRet0, dynCall_viiiii: dynCall_viiiii, dynCall_vi: dynCall_vi, dynCall_vii: dynCall_vii, dynCall_iiii: dynCall_iiii, dynCall_v: dynCall_v, dynCall_viiiiii: dynCall_viiiiii, dynCall_viiii: dynCall_viiii };
})
// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg, Module.asmLibraryArg, buffer);
var real__CompressImage = asm["_CompressImage"]; asm["_CompressImage"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__CompressImage.apply(null, arguments);
};

var real__strlen = asm["_strlen"]; asm["_strlen"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__strlen.apply(null, arguments);
};

var real__main = asm["_main"]; asm["_main"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__main.apply(null, arguments);
};

var real__GetStorageRequirements = asm["_GetStorageRequirements"]; asm["_GetStorageRequirements"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__GetStorageRequirements.apply(null, arguments);
};

var real__DecompressImage = asm["_DecompressImage"]; asm["_DecompressImage"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__DecompressImage.apply(null, arguments);
};

var real_runPostSets = asm["runPostSets"]; asm["runPostSets"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real_runPostSets.apply(null, arguments);
};
var _CompressImage = Module["_CompressImage"] = asm["_CompressImage"];
var _strlen = Module["_strlen"] = asm["_strlen"];
var _free = Module["_free"] = asm["_free"];
var _main = Module["_main"] = asm["_main"];
var _memset = Module["_memset"] = asm["_memset"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _GetStorageRequirements = Module["_GetStorageRequirements"] = asm["_GetStorageRequirements"];
var _DecompressImage = Module["_DecompressImage"] = asm["_DecompressImage"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var dynCall_viiiii = Module["dynCall_viiiii"] = asm["dynCall_viiiii"];
var dynCall_vi = Module["dynCall_vi"] = asm["dynCall_vi"];
var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
var dynCall_v = Module["dynCall_v"] = asm["dynCall_v"];
var dynCall_viiiiii = Module["dynCall_viiiiii"] = asm["dynCall_viiiiii"];
var dynCall_viiii = Module["dynCall_viiii"] = asm["dynCall_viiii"];

Runtime.stackAlloc = asm['stackAlloc'];
Runtime.stackSave = asm['stackSave'];
Runtime.stackRestore = asm['stackRestore'];
Runtime.setTempRet0 = asm['setTempRet0'];
Runtime.getTempRet0 = asm['getTempRet0'];


// Warning: printing of i64 values may be slightly rounded! No deep i64 math used, so precise i64 code not included
var i64Math = null;

// === Auto-generated postamble setup entry stuff ===

if (memoryInitializer) {
  if (typeof Module['locateFile'] === 'function') {
    memoryInitializer = Module['locateFile'](memoryInitializer);
  } else if (Module['memoryInitializerPrefixURL']) {
    memoryInitializer = Module['memoryInitializerPrefixURL'] + memoryInitializer;
  }
  if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
    var data = Module['readBinary'](memoryInitializer);
    HEAPU8.set(data, STATIC_BASE);
  } else {
    addRunDependency('memory initializer');
    Browser.asyncLoad(memoryInitializer, function(data) {
      for (var i = 0; i < data.length; i++) {
        assert(HEAPU8[STATIC_BASE + i] === 0, "area for memory initializer should not have been touched before it's loaded");
      }
      HEAPU8.set(data, STATIC_BASE);
      removeRunDependency('memory initializer');
    }, function(data) {
      throw 'could not load memory initializer ' + memoryInitializer;
    });
  }
}

function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var initialStackTop;
var preloadStartTime = null;
var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun'] && shouldRunNow) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  ensureInitRuntime();

  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString(Module['thisProgram']), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);

  initialStackTop = STACKTOP;

  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
    exit(ret);
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
}




function run(args) {
  args = args || Module['arguments'];

  if (preloadStartTime === null) preloadStartTime = Date.now();

  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return;
  }

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    if (ABORT) return; 

    ensureInitRuntime();

    preMain();

    if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
      Module.printErr('pre-main prep time: ' + (Date.now() - preloadStartTime) + ' ms');
    }

    if (Module['_main'] && shouldRunNow) {
      Module['callMain'](args);
    }

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module['run'] = Module.run = run;

function exit(status) {
  if (Module['noExitRuntime']) {
    Module.printErr('exit(' + status + ') called, but noExitRuntime, so not exiting');
    return;
  }

  ABORT = true;
  EXITSTATUS = status;
  STACKTOP = initialStackTop;

  // exit the runtime
  exitRuntime();

  if (ENVIRONMENT_IS_NODE) {
    // Work around a node.js bug where stdout buffer is not flushed at process exit:
    // Instead of process.exit() directly, wait for stdout flush event.
    // See https://github.com/joyent/node/issues/1669 and https://github.com/kripken/emscripten/issues/2582
    // Workaround is based on https://github.com/RReverser/acorn/commit/50ab143cecc9ed71a2d66f78b4aec3bb2e9844f6
    process['stdout']['once']('drain', function () {
      process['exit'](status);
    });
    console.log(' '); // Make sure to print something to force the drain event to occur, in case the stdout buffer was empty.
    // Work around another node bug where sometimes 'drain' is never fired - make another effort
    // to emit the exit status, after a significant delay (if node hasn't fired drain by then, give up)
    setTimeout(function() {
      process['exit'](status);
    }, 500);
  } else
  if (ENVIRONMENT_IS_SHELL && typeof quit === 'function') {
    quit(status);
  }
  // if we reach here, we must throw an exception to halt the current execution
  throw new ExitStatus(status);
}
Module['exit'] = Module.exit = exit;

function abort(text) {
  if (text) {
    Module.print(text);
    Module.printErr(text);
  }

  ABORT = true;
  EXITSTATUS = 1;

  var extra = '';

  throw 'abort() at ' + stackTrace() + extra;
}
Module['abort'] = Module.abort = abort;

// {{PRE_RUN_ADDITIONS}}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}

Module["noExitRuntime"] = true;

run();

// {{POST_RUN_ADDITIONS}}






// {{MODULE_ADDITIONS}}