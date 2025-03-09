/// <reference types="./index.d.ts" />
/**
 * @author Headquarter8302 (Markus) <https://dev.fandom.com/wiki/User:Headquarter8302>
 * @description A namespace of shared common functions used by me
 * @license GNU-GPLv3 <https://www.gnu.org/licenses/gpl-3.0>
 */
(function (window, _mw, _$) {
  "use strict";

  window.hq8302 =
    typeof window.hq8302 !== "undefined"
      ? window.hq8302
      : {
          /** Prefix used in logs */
          prefix: "",
          /** Holds all logging functions */
          con: {
            log: function log() {
              var _console;
              for (
                var _len = arguments.length, msg = new Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                msg[_key] = arguments[_key];
              }
              (_console = console).log.apply(
                _console,
                ["[".concat(window.hq8302.prefix, "] ")].concat(msg)
              );
            },
            warn: function warn() {
              var _console2;
              for (
                var _len2 = arguments.length, msg = new Array(_len2), _key2 = 0;
                _key2 < _len2;
                _key2++
              ) {
                msg[_key2] = arguments[_key2];
              }
              (_console2 = console).warn.apply(
                _console2,
                ["[".concat(window.hq8302.prefix, "] (warn) ")].concat(msg)
              );
            },
            err: function err() {
              var _console3;
              for (
                var _len3 = arguments.length, msg = new Array(_len3), _key3 = 0;
                _key3 < _len3;
                _key3++
              ) {
                msg[_key3] = arguments[_key3];
              }
              (_console3 = console).error.apply(
                _console3,
                ["[".concat(window.hq8302.prefix, "] (error) ")].concat(msg)
              );
            },
            dbg: function dbg() {
              var _console4;
              for (
                var _len4 = arguments.length, msg = new Array(_len4), _key4 = 0;
                _key4 < _len4;
                _key4++
              ) {
                msg[_key4] = arguments[_key4];
              }
              (_console4 = console).debug.apply(
                _console4,
                ["[".concat(window.hq8302.prefix, "] (debug) ")].concat(msg)
              );
            },
          },
          /**
           * Replacement for the spread operator as to not turn it into an awful mess of a polyfill
           * @param objects n-argument of objects to merge
           * @returns A single object with all the properties of the merged objects
           */
          mergeobjects: function mergeobjects() {
            var resultObj = {};
            for (var i = 0; i < arguments.length; i++) {
              var obj =
                i < 0 || arguments.length <= i ? undefined : arguments[i];
              resultObj = Object.assign(resultObj, obj);
            }
            return resultObj;
          },
          /**
           * Strict deep comparison function
           *
           * _Comparing function to function is funky. Don't try it_
           * @param is Thing 1 to check
           * @param equal Thing 2 to compare against thing 1
           * @returns Bool indicating if the check has passed or not
           */
          equals: function equals(is, equal) {
            var returnVal;
            switch (typeof is) {
              case "boolean":
                returnVal = is && equal;
                break;
              case "string":
                returnVal =
                  is ===
                  (typeof equal === "object"
                    ? JSON.stringify(equal)
                    : equal.toString());
                break;
              case "number":
              case "undefined":
              case "function":
              case "bigint":
                returnVal = is === equal;
                break;
              case "symbol":
                returnVal = is.description === equal.description;
                break;
              case "object":
                returnVal = JSON.stringify(is) === JSON.stringify(equal);
                break;
              default:
                returnVal = false;
                break;
            }
            return returnVal;
          },
          /**
           * Specialized object comparison method, for checking arguments. Will also log an error, but will not throw an error, that's the responsibility of the user to check this function's result
           * @param args `args[0]` should be the `arguments` object of the function/constructor, `args[1]` should be whatever that you want to check against the arguments
           * @param message The custom message to pass
           * @returns Bool indicating if the check has passed or not
           */
          argcheck: function argcheck(args, message) {
            var ifErr = function ifErr() {
              window.hq8302.con.err(
                "TypeError: Argument mismatch between input:",
                args[0],
                "and expected argument:",
                args[1],
                message
              );
              return false;
            };
            return this.equals(args[0], args[1]) ? true : ifErr();
          },
        };
  // @ts-expect-error
})(this, mediaWiki, jQuery);