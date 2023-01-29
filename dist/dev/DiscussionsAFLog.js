//DiscussionsAFLog by Sophiedp
//PLEASE DON'T EDIT DIRECTLY WITHOUT INFORMING ME! If you do so it will likely be overwritten at a later date, as this script is pre-compiled
(function () {
    "use strict";

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
    function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
    function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
    mw.loader.using('mediawiki.util').then(function () {
      if (!mw.config.get('profileUserName') || !mw.config.get('wgUserGroups').includes('sysop')) {
        return;
      }
      var apiUrl = mw.util.wikiScript('wikia') + '?controller=DiscussionsAbuseFilter&method=getAllFilterHitLogs&limit=100&page=';
      var makeAPIRequest = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(page) {
          var api, res;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(apiUrl + page);
              case 2:
                api = _context.sent;
                _context.next = 5;
                return api.json();
              case 5:
                res = _context.sent;
                return _context.abrupt("return", res);
              case 7:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function makeAPIRequest(_x) {
          return _ref.apply(this, arguments);
        };
      }();
    
      //Structure by https://stackoverflow.com/a/61472884, improved by Kocka
      var handleAPI = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(page, results) {
          var data;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return makeAPIRequest(page);
              case 2:
                data = _context2.sent;
                page++;
                if (!data.logs.length) {
                  _context2.next = 7;
                  break;
                }
                results.push.apply(results, _toConsumableArray(data.logs));
                return _context2.abrupt("return", handleAPI(page, results));
              case 7:
                return _context2.abrupt("return", results);
              case 8:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function handleAPI(_x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }();
      var getHits = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var results, filteredResults;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return handleAPI(0, []);
              case 2:
                results = _context3.sent;
                filteredResults = results.filter(function (result) {
                  return result.triggeredBy === mw.config.get('profileUserName');
                });
                return _context3.abrupt("return", filteredResults);
              case 5:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }));
        return function getHits() {
          return _ref3.apply(this, arguments);
        };
      }();
      var calcuateActions = /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(actions) {
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!actions.prevent && !actions.block)) {
                  _context4.next = 2;
                  break;
                }
                return _context4.abrupt("return", '(none)');
              case 2:
                if (!(actions.prevent && !actions.block)) {
                  _context4.next = 4;
                  break;
                }
                return _context4.abrupt("return", 'Prevent');
              case 4:
                if (!(!actions.prevent && actions.block)) {
                  _context4.next = 6;
                  break;
                }
                return _context4.abrupt("return", 'Block');
              case 6:
                return _context4.abrupt("return", 'Prevent, Block');
              case 7:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }));
        return function calcuateActions(_x4) {
          return _ref4.apply(this, arguments);
        };
      }();
      var generateRows = /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          var results, rows, _iterator, _step, result, row;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return getHits();
              case 2:
                results = _context5.sent;
                rows = [$('<tr>', {
                  append: [$('<th>', {
                    text: 'Timestamp'
                  }), $('<th>', {
                    text: 'Filter'
                  }), $('<th>', {
                    text: 'Actions'
                  }), $('<th>')]
                })];
                _iterator = _createForOfIteratorHelper(results);
                _context5.prev = 5;
                _iterator.s();
              case 7:
                if ((_step = _iterator.n()).done) {
                  _context5.next = 25;
                  break;
                }
                result = _step.value;
                _context5.t0 = $;
                _context5.t1 = $('<td>', {
                  //https://www.epochconverter.com/programming/#javascript
                  html: new Date(result.triggeredAt.epochSecond * 1000).toLocaleString()
                });
                _context5.t2 = $('<td>', {
                  append: $('<a>', {
                    text: "".concat(result.title, " (#").concat(result.filterId, ")"),
                    href: mw.util.getUrl("Special:DiscussionsAbuseFilter/filter/".concat(result.filterId))
                  })
                });
                _context5.t3 = $;
                _context5.next = 15;
                return calcuateActions(result.actions);
              case 15:
                _context5.t4 = _context5.sent;
                _context5.t5 = {
                  text: _context5.t4
                };
                _context5.t6 = (0, _context5.t3)('<td>', _context5.t5);
                _context5.t7 = $('<td>', {
                  append: ['(', $('<a>', {
                    text: 'examine',
                    href: mw.util.getUrl("Special:DiscussionsAbuseFilter/examine/log/".concat(result.id))
                  }), ')']
                });
                _context5.t8 = [_context5.t1, _context5.t2, _context5.t6, _context5.t7];
                _context5.t9 = {
                  append: _context5.t8
                };
                row = (0, _context5.t0)('<tr>', _context5.t9);
                rows.push(row);
              case 23:
                _context5.next = 7;
                break;
              case 25:
                _context5.next = 30;
                break;
              case 27:
                _context5.prev = 27;
                _context5.t10 = _context5["catch"](5);
                _iterator.e(_context5.t10);
              case 30:
                _context5.prev = 30;
                _iterator.f();
                return _context5.finish(30);
              case 33:
                return _context5.abrupt("return", rows);
              case 34:
              case "end":
                return _context5.stop();
            }
          }, _callee5, null, [[5, 27, 30, 33]]);
        }));
        return function generateRows() {
          return _ref5.apply(this, arguments);
        };
      }();
      var buttonClick = /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(modal) {
          var results, content;
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                modal.show({
                  loading: true,
                  title: 'Loading...'
                });
                _context6.next = 3;
                return generateRows();
              case 3:
                results = _context6.sent;
                content = $('<table>', {
                  "class": 'article-table',
                  append: results
                });
                modal.show({
                  content: results.length === 1 ? 'No results found.' : content,
                  title: 'Discussions AbuseFilter logs for ' + mw.config.get('profileUserName')
                });
              case 6:
              case "end":
                return _context6.stop();
            }
          }, _callee6);
        }));
        return function buttonClick(_x5) {
          return _ref6.apply(this, arguments);
        };
      }();
      var init = /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(QDmodal) {
          var _yield$fetch, status, modal;
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return fetch(mw.util.getUrl('Special:DiscussionsAbuseFilter'), {
                  method: 'HEAD'
                });
              case 2:
                _yield$fetch = _context9.sent;
                status = _yield$fetch.status;
                if (!(status === 404)) {
                  _context9.next = 6;
                  break;
                }
                return _context9.abrupt("return");
              case 6:
                modal = new QDmodal('daf-user-hit-log');
                if (mw.config.get('wgCanonicalSpecialPageName') === 'Contributions') {
                  //regular contribs page operation
                  $('.mw-contributions-user-tools .mw-changeslist-links').append($('<span>', {
                    append: $('<a>', {
                      click: function click() {
                        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
                          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                            while (1) switch (_context7.prev = _context7.next) {
                              case 0:
                                _context7.next = 2;
                                return buttonClick(modal);
                              case 2:
                              case "end":
                                return _context7.stop();
                            }
                          }, _callee7);
                        }))();
                      },
                      text: '/d AF log',
                      css: {
                        cursor: 'pointer'
                      },
                      id: 'DiscussionsAFLog'
                    })
                  }));
                } else {
                  //throw in a custom link for zsotroav
                  $('<a>', {
                    click: function click() {
                      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
                        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                          while (1) switch (_context8.prev = _context8.next) {
                            case 0:
                              _context8.next = 2;
                              return buttonClick(modal);
                            case 2:
                            case "end":
                              return _context8.stop();
                          }
                        }, _callee8);
                      }))();
                    },
                    text: '/d AF log',
                    css: {
                      display: 'none'
                    },
                    id: 'DiscussionsAFLog',
                    appendTo: $('body')
                  });
                }
              case 8:
              case "end":
                return _context9.stop();
            }
          }, _callee9);
        }));
        return function init(_x6) {
          return _ref7.apply(this, arguments);
        };
      }();
      mw.hook('dev.qdmodal').add(init);
      importArticles({
        type: 'script',
        articles: ['u:dev:MediaWiki:QDmodal.js']
      });
    });
})();