/* Seashell Content Manager 2.0.3. Complete script for MediaWiki:Common.js. */
(function () {
    "use strict";
    function _settle(pact, state, value) {
        if (!pact.s) {
            if (value instanceof _Pact) {
                if (value.s) {
                    if (state & 1) {
                        state = value.s;
                    }
                    value = value.v;
                } else {
                    value.o = _settle.bind(null, pact, state);
                    return;
                }
            }
            if (value && value.then) {
                value.then(
                    _settle.bind(null, pact, state),
                    _settle.bind(null, pact, 2)
                );
                return;
            }
            pact.s = state;
            pact.v = value;
            var observer = pact.o;
            if (observer) {
                observer(pact);
            }
        }
    }
    var _Pact = /*#__PURE__*/ (function () {
        function _Pact() {}
        _Pact.prototype.then = function (onFulfilled, onRejected) {
            var result = new _Pact();
            var state = this.s;
            if (state) {
                var callback = state & 1 ? onFulfilled : onRejected;
                if (callback) {
                    try {
                        _settle(result, 1, callback(this.v));
                    } catch (e) {
                        _settle(result, 2, e);
                    }
                    return result;
                } else {
                    return this;
                }
            }
            this.o = function (_this) {
                try {
                    var value = _this.v;
                    if (_this.s & 1) {
                        _settle(
                            result,
                            1,
                            onFulfilled ? onFulfilled(value) : value
                        );
                    } else if (onRejected) {
                        _settle(result, 1, onRejected(value));
                    } else {
                        _settle(result, 2, value);
                    }
                } catch (e) {
                    _settle(result, 2, e);
                }
            };
            return result;
        };
        return _Pact;
    })();
    function _isSettledPact(thenable) {
        return thenable instanceof _Pact && thenable.s & 1;
    }
    function _do(body, test) {
        var awaitBody;
        do {
            var result = body();
            if (result && result.then) {
                if (_isSettledPact(result)) {
                    result = result.v;
                } else {
                    awaitBody = true;
                    break;
                }
            }
            var shouldContinue = test();
            if (_isSettledPact(shouldContinue)) {
                shouldContinue = shouldContinue.v;
            }
            if (!shouldContinue) {
                return result;
            }
        } while (!shouldContinue.then);
        var pact = new _Pact();
        var reject = _settle.bind(null, pact, 2);
        (awaitBody
            ? result.then(_resumeAfterBody)
            : shouldContinue.then(_resumeAfterTest)
        ).then(void 0, reject);
        return pact;
        function _resumeAfterBody(value) {
            result = value;
            for (;;) {
                shouldContinue = test();
                if (_isSettledPact(shouldContinue)) {
                    shouldContinue = shouldContinue.v;
                }
                if (!shouldContinue) {
                    break;
                }
                if (shouldContinue.then) {
                    shouldContinue.then(_resumeAfterTest).then(void 0, reject);
                    return;
                }
                result = body();
                if (result && result.then) {
                    if (_isSettledPact(result)) {
                        result = result.v;
                    } else {
                        result.then(_resumeAfterBody).then(void 0, reject);
                        return;
                    }
                }
            }
            _settle(pact, 1, result);
        }
        function _resumeAfterTest(shouldContinue) {
            if (shouldContinue) {
                do {
                    result = body();
                    if (result && result.then) {
                        if (_isSettledPact(result)) {
                            result = result.v;
                        } else {
                            result.then(_resumeAfterBody).then(void 0, reject);
                            return;
                        }
                    }
                    shouldContinue = test();
                    if (_isSettledPact(shouldContinue)) {
                        shouldContinue = shouldContinue.v;
                    }
                    if (!shouldContinue) {
                        _settle(pact, 1, result);
                        return;
                    }
                } while (!shouldContinue.then);
                shouldContinue.then(_resumeAfterTest).then(void 0, reject);
            } else {
                _settle(pact, 1, result);
            }
        }
    }
    function _for(test, update, body) {
        var stage;
        for (;;) {
            var shouldContinue = test();
            if (_isSettledPact(shouldContinue)) {
                shouldContinue = shouldContinue.v;
            }
            if (!shouldContinue) {
                return result;
            }
            if (shouldContinue.then) {
                stage = 0;
                break;
            }
            var result = body();
            if (result && result.then) {
                if (_isSettledPact(result)) {
                    result = result.s;
                } else {
                    stage = 1;
                    break;
                }
            }
            if (update) {
                var updateValue = update();
                if (
                    updateValue &&
                    updateValue.then &&
                    !_isSettledPact(updateValue)
                ) {
                    stage = 2;
                    break;
                }
            }
        }
        var pact = new _Pact();
        var reject = _settle.bind(null, pact, 2);
        (stage === 0
            ? shouldContinue.then(_resumeAfterTest)
            : stage === 1
              ? result.then(_resumeAfterBody)
              : updateValue.then(_resumeAfterUpdate)
        ).then(void 0, reject);
        return pact;
        function _resumeAfterBody(value) {
            result = value;
            do {
                if (update) {
                    updateValue = update();
                    if (
                        updateValue &&
                        updateValue.then &&
                        !_isSettledPact(updateValue)
                    ) {
                        updateValue
                            .then(_resumeAfterUpdate)
                            .then(void 0, reject);
                        return;
                    }
                }
                shouldContinue = test();
                if (
                    !shouldContinue ||
                    (_isSettledPact(shouldContinue) && !shouldContinue.v)
                ) {
                    _settle(pact, 1, result);
                    return;
                }
                if (shouldContinue.then) {
                    shouldContinue.then(_resumeAfterTest).then(void 0, reject);
                    return;
                }
                result = body();
                if (_isSettledPact(result)) {
                    result = result.v;
                }
            } while (!result || !result.then);
            result.then(_resumeAfterBody).then(void 0, reject);
        }
        function _resumeAfterTest(shouldContinue) {
            if (shouldContinue) {
                result = body();
                if (result && result.then) {
                    result.then(_resumeAfterBody).then(void 0, reject);
                } else {
                    _resumeAfterBody(result);
                }
            } else {
                _settle(pact, 1, result);
            }
        }
        function _resumeAfterUpdate() {
            if ((shouldContinue = test())) {
                if (shouldContinue.then) {
                    shouldContinue.then(_resumeAfterTest).then(void 0, reject);
                } else {
                    _resumeAfterTest(shouldContinue);
                }
            } else {
                _settle(pact, 1, result);
            }
        }
    }
    function _catch(body, recover) {
        try {
            var result = body();
        } catch (e) {
            return recover(e);
        }
        if (result && result.then) {
            return result.then(void 0, recover);
        }
        return result;
    }
    function _finallyRethrows(body, finalizer) {
        try {
            var result = body();
        } catch (e) {
            return finalizer(true, e);
        }
        if (result && result.then) {
            return result.then(
                finalizer.bind(null, false),
                finalizer.bind(null, true)
            );
        }
        return finalizer(false, result);
    }
    var _iteratorSymbol =
        /*#__PURE__*/ typeof Symbol !== "undefined"
            ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))
            : "@@iterator";
    function _forTo(array, body, check) {
        var i = -1,
            pact,
            reject;
        function _cycle(result) {
            try {
                while (++i < array.length && (!check || !check())) {
                    result = body(i);
                    if (result && result.then) {
                        if (_isSettledPact(result)) {
                            result = result.v;
                        } else {
                            result.then(
                                _cycle,
                                reject ||
                                    (reject = _settle.bind(
                                        null,
                                        (pact = new _Pact()),
                                        2
                                    ))
                            );
                            return;
                        }
                    }
                }
                if (pact) {
                    _settle(pact, 1, result);
                } else {
                    pact = result;
                }
            } catch (e) {
                _settle(pact || (pact = new _Pact()), 2, e);
            }
        }
        _cycle();
        return pact;
    }
    function _forOf(target, body, check) {
        if (typeof target[_iteratorSymbol] === "function") {
            var iterator = target[_iteratorSymbol](),
                step,
                pact,
                reject;
            function _cycle(result) {
                try {
                    while (
                        !(step = iterator.next()).done &&
                        (!check || !check())
                    ) {
                        result = body(step.value);
                        if (result && result.then) {
                            if (_isSettledPact(result)) {
                                result = result.v;
                            } else {
                                result.then(
                                    _cycle,
                                    reject ||
                                        (reject = _settle.bind(
                                            null,
                                            (pact = new _Pact()),
                                            2
                                        ))
                                );
                                return;
                            }
                        }
                    }
                    if (pact) {
                        _settle(pact, 1, result);
                    } else {
                        pact = result;
                    }
                } catch (e) {
                    _settle(pact || (pact = new _Pact()), 2, e);
                }
            }
            _cycle();
            if (iterator.return) {
                var _fixup = function _fixup(value) {
                    try {
                        if (!step.done) {
                            iterator.return();
                        }
                    } catch (e) {}
                    return value;
                };
                if (pact && pact.then) {
                    return pact.then(_fixup, function (e) {
                        throw _fixup(e);
                    });
                }
                _fixup();
            }
            return pact;
        }
        // No support for Symbol.iterator
        if (!("length" in target)) {
            throw new TypeError("Object is not iterable");
        }
        // Handle live collections properly
        var values = [];
        for (var i = 0; i < target.length; i++) {
            values.push(target[i]);
        }
        return _forTo(
            values,
            function (i) {
                return body(values[i]);
            },
            check
        );
    }
    function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            (r &&
                (o = o.filter(function (r) {
                    return Object.getOwnPropertyDescriptor(e, r).enumerable;
                })),
                t.push.apply(t, o));
        }
        return t;
    }
    function _objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2
                ? ownKeys(Object(t), !0).forEach(function (r) {
                      _defineProperty(e, r, t[r]);
                  })
                : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                        e,
                        Object.getOwnPropertyDescriptors(t)
                    )
                  : ownKeys(Object(t)).forEach(function (r) {
                        Object.defineProperty(
                            e,
                            r,
                            Object.getOwnPropertyDescriptor(t, r)
                        );
                    });
        }
        return e;
    }
    function _defineProperty(e, r, t) {
        return (
            (r = _toPropertyKey(r)) in e
                ? Object.defineProperty(e, r, {
                      value: t,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0
                  })
                : (e[r] = t),
            e
        );
    }
    function _toPropertyKey(t) {
        var i = _toPrimitive(t, "string");
        return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
        if ("object" != _typeof(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
            var i = e.call(t, r || "default");
            if ("object" != _typeof(i)) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === r ? String : Number)(t);
    }
    function _createForOfIteratorHelper(r, e) {
        var t =
            ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
            r["@@iterator"];
        if (!t) {
            if (
                Array.isArray(r) ||
                (t = _unsupportedIterableToArray(r)) ||
                (e && r && "number" == typeof r.length)
            ) {
                t && (r = t);
                var _n = 0,
                    F = function F() {};
                return {
                    s: F,
                    n: function n() {
                        return _n >= r.length
                            ? { done: !0 }
                            : { done: !1, value: r[_n++] };
                    },
                    e: function e(r) {
                        throw r;
                    },
                    f: F
                };
            }
            throw new TypeError(
                "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
        }
        var o,
            a = !0,
            u = !1;
        return {
            s: function s() {
                t = t.call(r);
            },
            n: function n() {
                var r = t.next();
                return ((a = r.done), r);
            },
            e: function e(r) {
                ((u = !0), (o = r));
            },
            f: function f() {
                try {
                    a || null == t.return || t.return();
                } finally {
                    if (u) throw o;
                }
            }
        };
    }
    function _slicedToArray(r, e) {
        return (
            _arrayWithHoles(r) ||
            _iterableToArrayLimit(r, e) ||
            _unsupportedIterableToArray(r, e) ||
            _nonIterableRest()
        );
    }
    function _nonIterableRest() {
        throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
    }
    function _iterableToArrayLimit(r, l) {
        var t =
            null == r
                ? null
                : ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
                  r["@@iterator"];
        if (null != t) {
            var e,
                n,
                i,
                u,
                a = [],
                f = !0,
                o = !1;
            try {
                if (((i = (t = t.call(r)).next), 0 === l)) {
                    if (Object(t) !== t) return;
                    f = !1;
                } else
                    for (
                        ;
                        !(f = (e = i.call(t)).done) &&
                        (a.push(e.value), a.length !== l);
                        f = !0
                    );
            } catch (r) {
                ((o = !0), (n = r));
            } finally {
                try {
                    if (
                        !f &&
                        null != t.return &&
                        ((u = t.return()), Object(u) !== u)
                    )
                        return;
                } finally {
                    if (o) throw n;
                }
            }
            return a;
        }
    }
    function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
    }
    function _typeof(o) {
        "@babel/helpers - typeof";
        return (
            (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                    ? function (o) {
                          return typeof o;
                      }
                    : function (o) {
                          return o &&
                              "function" == typeof Symbol &&
                              o.constructor === Symbol &&
                              o !== Symbol.prototype
                              ? "symbol"
                              : typeof o;
                      }),
            _typeof(o)
        );
    }
    function _toConsumableArray(r) {
        return (
            _arrayWithoutHoles(r) ||
            _iterableToArray(r) ||
            _unsupportedIterableToArray(r) ||
            _nonIterableSpread()
        );
    }
    function _nonIterableSpread() {
        throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
    }
    function _unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return _arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return (
                "Object" === t && r.constructor && (t = r.constructor.name),
                "Map" === t || "Set" === t
                    ? Array.from(r)
                    : "Arguments" === t ||
                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                      ? _arrayLikeToArray(r, a)
                      : void 0
            );
        }
    }
    function _iterableToArray(r) {
        if (
            ("undefined" != typeof Symbol && null != r[Symbol.iterator]) ||
            null != r["@@iterator"]
        )
            return Array.from(r);
    }
    function _arrayWithoutHoles(r) {
        if (Array.isArray(r)) return _arrayLikeToArray(r);
    }
    function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    (function (_window$SeashellCards) {
        "use strict";

        var boot = function boot() {
            try {
                var _window$mw;
                if (window.SeashellCardsV2 !== state) return Promise.resolve();
                if (bootBusy) {
                    bootAgain = true;
                    return Promise.resolve();
                }
                if (
                    !(
                        (_window$mw = window.mw) !== null &&
                        _window$mw !== void 0 &&
                        _window$mw.loader
                    ) ||
                    !mw.config ||
                    !document.body
                ) {
                    state.attempts += 1;
                    if (state.attempts < 150) queueBoot();
                    else {
                        state.status = "startup failed";
                        window.SeashellSubmissionStatus = "startup failed";
                        var root = document.getElementById(
                            "seashell-submission-root"
                        );
                        if (root)
                            root.textContent =
                                "Fandom's JavaScript loader was not available. Refresh the page to try again.";
                    }
                    return Promise.resolve();
                }
                if (!contentHookAdded && typeof mw.hook === "function") {
                    contentHookAdded = true;
                    mw.hook("wikipage.content").add(queueBoot);
                }
                if (
                    !document.querySelector(
                        "#seashell-submission-root, .ss-card-browser[data-kind], .ss-entry-connections"
                    )
                ) {
                    state.status = "waiting for content";
                    return Promise.resolve();
                }
                bootBusy = true;
                state.status = "loading";
                window.SeashellSubmissionStatus = "loading";
                return Promise.resolve(
                    _finallyRethrows(
                        function () {
                            return _catch(
                                function () {
                                    if (!modulesReady)
                                        modulesReady = new Promise(function (
                                            resolve,
                                            reject
                                        ) {
                                            var timer = window.setTimeout(
                                                function () {
                                                    return reject(
                                                        new Error(
                                                            "Fandom's required JavaScript modules did not finish loading. Refresh the page and try again."
                                                        )
                                                    );
                                                },
                                                20000
                                            );
                                            mw.loader
                                                .using([
                                                    "mediawiki.api",
                                                    "mediawiki.util"
                                                ])
                                                .then(
                                                    function () {
                                                        window.clearTimeout(
                                                            timer
                                                        );
                                                        resolve();
                                                    },
                                                    function (error) {
                                                        window.clearTimeout(
                                                            timer
                                                        );
                                                        reject(error);
                                                    }
                                                );
                                        });
                                    return Promise.resolve(modulesReady).then(
                                        function () {
                                            function _temp24() {
                                                function _temp22() {
                                                    function _temp20() {
                                                        state.status = "ready";
                                                        window.SeashellSubmissionStatus =
                                                            "loaded";
                                                    }
                                                    var _temp19 = _forOf(
                                                        document.querySelectorAll(
                                                            ".ss-entry-connections"
                                                        ),
                                                        function (root) {
                                                            return Promise.resolve(
                                                                connections(
                                                                    root
                                                                )
                                                            ).then(
                                                                function () {}
                                                            );
                                                        }
                                                    );
                                                    return _temp19 &&
                                                        _temp19.then
                                                        ? _temp19.then(_temp20)
                                                        : _temp20(_temp19);
                                                }
                                                var _temp21 = _forOf(
                                                    document.querySelectorAll(
                                                        ".ss-card-browser[data-kind]"
                                                    ),
                                                    function (root) {
                                                        var _temp18 =
                                                            (function () {
                                                                if (
                                                                    cardType(
                                                                        root
                                                                            .dataset
                                                                            .kind
                                                                    )
                                                                )
                                                                    return Promise.resolve(
                                                                        browser(
                                                                            root,
                                                                            root
                                                                                .dataset
                                                                                .kind
                                                                        )
                                                                    ).then(
                                                                        function () {}
                                                                    );
                                                            })();
                                                        if (
                                                            _temp18 &&
                                                            _temp18.then
                                                        )
                                                            return _temp18.then(
                                                                function () {}
                                                            );
                                                    }
                                                );
                                                return _temp21 && _temp21.then
                                                    ? _temp21.then(_temp22)
                                                    : _temp22(_temp21);
                                            }
                                            if (!api) api = new mw.Api();
                                            userIsAdmin = (
                                                mw.config.get("wgUserGroups") ||
                                                []
                                            ).some(function (g) {
                                                return [
                                                    "sysop",
                                                    "bureaucrat",
                                                    "staff"
                                                ].includes(g);
                                            });
                                            if (
                                                !document.getElementById(
                                                    "seashell-cards-styles"
                                                )
                                            )
                                                document.head.append(
                                                    node("style", {
                                                        id: "seashell-cards-styles",
                                                        text: styles
                                                    })
                                                );
                                            var managerRoot =
                                                document.getElementById(
                                                    "seashell-submission-root"
                                                );
                                            var _temp23 = (function () {
                                                if (managerRoot)
                                                    return Promise.resolve(
                                                        manager(managerRoot)
                                                    ).then(function () {});
                                            })();
                                            return _temp23 && _temp23.then
                                                ? _temp23.then(_temp24)
                                                : _temp24(_temp23);
                                        }
                                    );
                                },
                                function (error) {
                                    modulesReady = null;
                                    state.status = "error";
                                    state.error = String(
                                        error.message || error
                                    );
                                    window.SeashellSubmissionStatus = "error";
                                    console.error(
                                        "Seashell Content Manager",
                                        error
                                    );
                                    var root = document.getElementById(
                                        "seashell-submission-root"
                                    );
                                    if (root) {
                                        delete root.dataset.ready;
                                        root.textContent =
                                            "The Content Manager could not load. " +
                                            state.error;
                                        root.append(
                                            button(
                                                "Try loading again",
                                                queueBoot
                                            )
                                        );
                                    }
                                }
                            );
                        },
                        function (_wasThrown6, _result0) {
                            bootBusy = false;
                            if (bootAgain) {
                                bootAgain = false;
                                queueBoot();
                            }
                            if (_wasThrown6) throw _result0;
                            return _result0;
                        }
                    )
                );
            } catch (e) {
                return Promise.reject(e);
            }
        };
        var connections = function connections(root) {
            try {
                if (root.dataset.ready) return Promise.resolve();
                root.dataset.ready = "1";
                root.classList.add("ss-tools", "ss-entry-connections");
                var title =
                    root.dataset.title ||
                    mw.config.get("wgPageName").replace(/_/g, " ");
                return Promise.resolve(
                    _catch(
                        function () {
                            return Promise.resolve(readPage("Medals")).then(
                                function (page) {
                                    var entries = directoryRecords(
                                        page.text,
                                        "medal"
                                    ).filter(function (entry) {
                                        return requirementNames(entry).some(
                                            function (name) {
                                                return key(name) === key(title);
                                            }
                                        );
                                    });
                                    if (!entries.length) {
                                        root.textContent = "";
                                        return;
                                    }
                                    root.replaceChildren(
                                        node("h3", {
                                            text: "Medals unlocked by " + title
                                        }),
                                        node.apply(
                                            void 0,
                                            ["ul", {}].concat(
                                                _toConsumableArray(
                                                    entries.map(
                                                        function (entry) {
                                                            return node(
                                                                "li",
                                                                {},
                                                                link(
                                                                    entry.name
                                                                ),
                                                                " (" +
                                                                    entry.rarity +
                                                                    ")"
                                                            );
                                                        }
                                                    )
                                                )
                                            )
                                        )
                                    );
                                    var articleBody =
                                        root.closest(".mw-parser-output");
                                    if (articleBody) articleBody.append(root);
                                }
                            );
                        },
                        function () {
                            root.replaceChildren(
                                link("Medals", "Browse Medal requirements")
                            );
                        }
                    )
                );
            } catch (e) {
                return Promise.reject(e);
            }
        };
        var manager = function manager(root) {
            try {
                var tagChange = function tagChange(operation, oldTag, newTag) {
                    try {
                        if (busy || !userIsAdmin) return Promise.resolve();
                        newTag = trim(newTag);
                        if (
                            operation !== "remove" &&
                            (!newTag ||
                                newTag.length > 60 ||
                                /[,\n<>|\[\]{}]/.test(newTag))
                        )
                            return Promise.resolve(
                                show(
                                    "Use a short plain text tag name without commas.",
                                    true
                                )
                            );
                        if (operation !== "create" && !oldTag)
                            return Promise.resolve(
                                show("Select an existing tag.", true)
                            );
                        if (
                            operation !== "remove" &&
                            (registry[type] || []).some(function (t) {
                                return (
                                    key(t) === key(newTag) &&
                                    key(t) !== key(oldTag)
                                );
                            })
                        )
                            return Promise.resolve(
                                show("That tag already exists.", true)
                            );
                        if (!promptDiscard()) return Promise.resolve();
                        if (
                            !window.confirm(
                                operation === "create"
                                    ? 'Create tag "' + newTag + '"?'
                                    : "Update every " +
                                          TYPES[type].title +
                                          ' using tag "' +
                                          oldTag +
                                          '"? This changes tags only.'
                            )
                        )
                            return Promise.resolve();
                        busy = true;
                        var completed = [];
                        var failures = [];
                        return Promise.resolve(
                            _finallyRethrows(
                                function () {
                                    return _catch(
                                        function () {
                                            return Promise.resolve(
                                                loadRegistry()
                                            ).then(function () {
                                                var _exit = false;
                                                function _temp17(_result7) {
                                                    return _exit
                                                        ? _result7
                                                        : Promise.resolve(
                                                              saveRegistry(next)
                                                          ).then(function () {
                                                              renderFields();
                                                              renderTagManager();
                                                              show(
                                                                  "Tag " +
                                                                      (operation ===
                                                                      "create"
                                                                          ? "created"
                                                                          : operation ===
                                                                              "rename"
                                                                            ? "renamed"
                                                                            : "removed") +
                                                                      ". " +
                                                                      completed.length +
                                                                      " entries updated."
                                                              );
                                                          });
                                                }
                                                var next = clone(registry);
                                                if (operation === "create")
                                                    next[type] = unique(
                                                        [].concat(
                                                            _toConsumableArray(
                                                                next[type]
                                                            ),
                                                            [newTag]
                                                        )
                                                    );
                                                else
                                                    next[type] = unique(
                                                        next[type]
                                                            .filter(
                                                                function (t) {
                                                                    return (
                                                                        key(
                                                                            t
                                                                        ) !==
                                                                        key(
                                                                            oldTag
                                                                        )
                                                                    );
                                                                }
                                                            )
                                                            .concat(
                                                                operation ===
                                                                    "rename"
                                                                    ? [newTag]
                                                                    : []
                                                            )
                                                    );
                                                var _temp16 = (function () {
                                                    if (
                                                        operation !== "create"
                                                    ) {
                                                        return Promise.resolve(
                                                            readPage(
                                                                TYPES[type]
                                                                    .directory
                                                            )
                                                        ).then(
                                                            function (
                                                                directory
                                                            ) {
                                                                var entries =
                                                                    directoryRecords(
                                                                        directory.text,
                                                                        type
                                                                    );
                                                                var affected =
                                                                    entries.filter(
                                                                        function (
                                                                            entry
                                                                        ) {
                                                                            return entry.tags.some(
                                                                                function (
                                                                                    tag
                                                                                ) {
                                                                                    return (
                                                                                        key(
                                                                                            tag
                                                                                        ) ===
                                                                                        key(
                                                                                            oldTag
                                                                                        )
                                                                                    );
                                                                                }
                                                                            );
                                                                        }
                                                                    );
                                                                var _affected$map =
                                                                    affected.map(
                                                                        function (
                                                                            e
                                                                        ) {
                                                                            return e.name;
                                                                        }
                                                                    );
                                                                return Promise.resolve(
                                                                    categoryNames(
                                                                        type
                                                                    )
                                                                ).then(
                                                                    function (
                                                                        _categoryNames
                                                                    ) {
                                                                        function _temp15() {
                                                                            if (
                                                                                failures.length
                                                                            ) {
                                                                                show(
                                                                                    "Tag changes completed for " +
                                                                                        completed.length +
                                                                                        " entries. These need attention: " +
                                                                                        failures.join(
                                                                                            "; "
                                                                                        ) +
                                                                                        ". The old tag remains available so you can retry.",
                                                                                    true
                                                                                );
                                                                                _exit = true;
                                                                            }
                                                                        }
                                                                        var names =
                                                                            unique(
                                                                                [].concat(
                                                                                    _toConsumableArray(
                                                                                        _affected$map
                                                                                    ),
                                                                                    _toConsumableArray(
                                                                                        _categoryNames
                                                                                    )
                                                                                )
                                                                            );
                                                                        var index = 0;
                                                                        var _temp14 =
                                                                            _for(
                                                                                function () {
                                                                                    return (
                                                                                        index <
                                                                                        names.length
                                                                                    );
                                                                                },
                                                                                function () {
                                                                                    return !!(index += 1);
                                                                                },
                                                                                function () {
                                                                                    var name =
                                                                                        names[
                                                                                            index
                                                                                        ];
                                                                                    show(
                                                                                        "Checking tag updates " +
                                                                                            (index +
                                                                                                1) +
                                                                                            " of " +
                                                                                            names.length +
                                                                                            ". Completed: " +
                                                                                            completed.length
                                                                                    );
                                                                                    var _temp13 =
                                                                                        _catch(
                                                                                            function () {
                                                                                                return Promise.resolve(
                                                                                                    readPage(
                                                                                                        name
                                                                                                    )
                                                                                                ).then(
                                                                                                    function (
                                                                                                        page
                                                                                                    ) {
                                                                                                        var _tpl$fields$tags;
                                                                                                        function _temp12() {
                                                                                                            function _temp10() {
                                                                                                                completed.push(
                                                                                                                    name
                                                                                                                );
                                                                                                            }
                                                                                                            var _temp1 =
                                                                                                                (function () {
                                                                                                                    if (
                                                                                                                        entry
                                                                                                                    ) {
                                                                                                                        return Promise.resolve(
                                                                                                                            readPage(
                                                                                                                                TYPES[
                                                                                                                                    type
                                                                                                                                ]
                                                                                                                                    .directory
                                                                                                                            )
                                                                                                                        ).then(
                                                                                                                            function (
                                                                                                                                freshDirectory
                                                                                                                            ) {
                                                                                                                                var updated =
                                                                                                                                    updateDirectory(
                                                                                                                                        freshDirectory.text,
                                                                                                                                        _objectSpread(
                                                                                                                                            _objectSpread(
                                                                                                                                                {},
                                                                                                                                                entry
                                                                                                                                            ),
                                                                                                                                            {},
                                                                                                                                            {
                                                                                                                                                tags: changed,
                                                                                                                                                image:
                                                                                                                                                    fields.image ||
                                                                                                                                                    entry.image
                                                                                                                                            }
                                                                                                                                        )
                                                                                                                                    );
                                                                                                                                return Promise.resolve(
                                                                                                                                    writePage(
                                                                                                                                        freshDirectory.title,
                                                                                                                                        updated,
                                                                                                                                        "Updated tags for " +
                                                                                                                                            name,
                                                                                                                                        freshDirectory,
                                                                                                                                        false
                                                                                                                                    )
                                                                                                                                ).then(
                                                                                                                                    function () {}
                                                                                                                                );
                                                                                                                            }
                                                                                                                        );
                                                                                                                    }
                                                                                                                })();
                                                                                                            return _temp1 &&
                                                                                                                _temp1.then
                                                                                                                ? _temp1.then(
                                                                                                                      _temp10
                                                                                                                  )
                                                                                                                : _temp10(
                                                                                                                      _temp1
                                                                                                                  );
                                                                                                        }
                                                                                                        if (
                                                                                                            page.missing
                                                                                                        )
                                                                                                            return;
                                                                                                        var tpl =
                                                                                                            template(
                                                                                                                page.text,
                                                                                                                TYPES[
                                                                                                                    type
                                                                                                                ]
                                                                                                                    .template
                                                                                                            );
                                                                                                        if (
                                                                                                            !tpl.found
                                                                                                        )
                                                                                                            return;
                                                                                                        var data =
                                                                                                            meta(
                                                                                                                page.text
                                                                                                            );
                                                                                                        var entry =
                                                                                                            entries.find(
                                                                                                                function (
                                                                                                                    e
                                                                                                                ) {
                                                                                                                    return (
                                                                                                                        key(
                                                                                                                            e.name
                                                                                                                        ) ===
                                                                                                                        key(
                                                                                                                            name
                                                                                                                        )
                                                                                                                    );
                                                                                                                }
                                                                                                            );
                                                                                                        var current =
                                                                                                            splitTags(
                                                                                                                (_tpl$fields$tags =
                                                                                                                    tpl
                                                                                                                        .fields
                                                                                                                        .tags) !==
                                                                                                                    null &&
                                                                                                                    _tpl$fields$tags !==
                                                                                                                        void 0
                                                                                                                    ? _tpl$fields$tags
                                                                                                                    : (
                                                                                                                          data.tags ||
                                                                                                                          (entry ===
                                                                                                                              null ||
                                                                                                                          entry ===
                                                                                                                              void 0
                                                                                                                              ? void 0
                                                                                                                              : entry.tags) ||
                                                                                                                          []
                                                                                                                      ).join(
                                                                                                                          ","
                                                                                                                      )
                                                                                                            );
                                                                                                        var articleNeedsUpdate =
                                                                                                            current.some(
                                                                                                                function (
                                                                                                                    tag
                                                                                                                ) {
                                                                                                                    return (
                                                                                                                        key(
                                                                                                                            tag
                                                                                                                        ) ===
                                                                                                                        key(
                                                                                                                            oldTag
                                                                                                                        )
                                                                                                                    );
                                                                                                                }
                                                                                                            );
                                                                                                        var directoryNeedsUpdate =
                                                                                                            entry ===
                                                                                                                null ||
                                                                                                            entry ===
                                                                                                                void 0
                                                                                                                ? void 0
                                                                                                                : entry.tags.some(
                                                                                                                      function (
                                                                                                                          tag
                                                                                                                      ) {
                                                                                                                          return (
                                                                                                                              key(
                                                                                                                                  tag
                                                                                                                              ) ===
                                                                                                                              key(
                                                                                                                                  oldTag
                                                                                                                              )
                                                                                                                          );
                                                                                                                      }
                                                                                                                  );
                                                                                                        if (
                                                                                                            !articleNeedsUpdate &&
                                                                                                            !directoryNeedsUpdate
                                                                                                        )
                                                                                                            return;
                                                                                                        var changed =
                                                                                                            unique(
                                                                                                                current
                                                                                                                    .filter(
                                                                                                                        function (
                                                                                                                            t
                                                                                                                        ) {
                                                                                                                            return (
                                                                                                                                key(
                                                                                                                                    t
                                                                                                                                ) !==
                                                                                                                                key(
                                                                                                                                    oldTag
                                                                                                                                )
                                                                                                                            );
                                                                                                                        }
                                                                                                                    )
                                                                                                                    .concat(
                                                                                                                        operation ===
                                                                                                                            "rename"
                                                                                                                            ? [
                                                                                                                                  newTag
                                                                                                                              ]
                                                                                                                            : []
                                                                                                                    )
                                                                                                            );
                                                                                                        var fields =
                                                                                                            _objectSpread(
                                                                                                                _objectSpread(
                                                                                                                    {},
                                                                                                                    tpl.fields
                                                                                                                ),
                                                                                                                {},
                                                                                                                {
                                                                                                                    tags: changed.join(
                                                                                                                        ", "
                                                                                                                    )
                                                                                                                }
                                                                                                            );
                                                                                                        var text =
                                                                                                            page.text.slice(
                                                                                                                0,
                                                                                                                tpl.start
                                                                                                            ) +
                                                                                                            templateText(
                                                                                                                TYPES[
                                                                                                                    type
                                                                                                                ]
                                                                                                                    .template,
                                                                                                                fields
                                                                                                            ) +
                                                                                                            page.text.slice(
                                                                                                                tpl.end
                                                                                                            );
                                                                                                        text =
                                                                                                            replaceMeta(
                                                                                                                text,
                                                                                                                _objectSpread(
                                                                                                                    _objectSpread(
                                                                                                                        {},
                                                                                                                        data
                                                                                                                    ),
                                                                                                                    {},
                                                                                                                    {
                                                                                                                        tags: changed
                                                                                                                    }
                                                                                                                )
                                                                                                            );
                                                                                                        var _temp11 =
                                                                                                            (function () {
                                                                                                                if (
                                                                                                                    articleNeedsUpdate
                                                                                                                )
                                                                                                                    return Promise.resolve(
                                                                                                                        writePage(
                                                                                                                            name,
                                                                                                                            text,
                                                                                                                            "Updated content tag " +
                                                                                                                                oldTag,
                                                                                                                            page,
                                                                                                                            false
                                                                                                                        )
                                                                                                                    ).then(
                                                                                                                        function () {}
                                                                                                                    );
                                                                                                            })();
                                                                                                        return _temp11 &&
                                                                                                            _temp11.then
                                                                                                            ? _temp11.then(
                                                                                                                  _temp12
                                                                                                              )
                                                                                                            : _temp12(
                                                                                                                  _temp11
                                                                                                              );
                                                                                                    }
                                                                                                );
                                                                                            },
                                                                                            function (
                                                                                                error
                                                                                            ) {
                                                                                                failures.push(
                                                                                                    name +
                                                                                                        ": " +
                                                                                                        error.message
                                                                                                );
                                                                                            }
                                                                                        );
                                                                                    if (
                                                                                        _temp13 &&
                                                                                        _temp13.then
                                                                                    )
                                                                                        return _temp13.then(
                                                                                            function () {}
                                                                                        );
                                                                                }
                                                                            );
                                                                        return _temp14 &&
                                                                            _temp14.then
                                                                            ? _temp14.then(
                                                                                  _temp15
                                                                              )
                                                                            : _temp15(
                                                                                  _temp14
                                                                              );
                                                                    }
                                                                );
                                                            }
                                                        );
                                                    }
                                                })();
                                                return _temp16 && _temp16.then
                                                    ? _temp16.then(_temp17)
                                                    : _temp17(_temp16);
                                            });
                                        },
                                        function (error) {
                                            show(
                                                "Tag update failed. " +
                                                    completed.length +
                                                    " entries already changed. " +
                                                    error.message,
                                                true
                                            );
                                        }
                                    );
                                },
                                function (_wasThrown5, _result8) {
                                    busy = false;
                                    if (_wasThrown5) throw _result8;
                                    return _result8;
                                }
                            )
                        );
                    } catch (e) {
                        return Promise.reject(e);
                    }
                };
                var deleteEntry = function deleteEntry() {
                    try {
                        if (busy || !userIsAdmin) return Promise.resolve();
                        var name = picker.value;
                        if (!name)
                            return Promise.resolve(
                                show("Select a page first.", true)
                            );
                        if (
                            !window.confirm(
                                'Delete "' +
                                    name +
                                    '" and remove its directory row?'
                            )
                        )
                            return Promise.resolve();
                        busy = true;
                        removeButton.disabled = true;
                        var deleted = false;
                        var _temp0 = _finallyRethrows(
                            function () {
                                return _catch(
                                    function () {
                                        return Promise.resolve(
                                            request(
                                                {
                                                    action: "delete",
                                                    title: name,
                                                    reason: "Deleted through Content Manager"
                                                },
                                                true
                                            )
                                        ).then(function () {
                                            deleted = true;
                                            return Promise.resolve(
                                                readPage(TYPES[type].directory)
                                            ).then(function (directory) {
                                                function _temp9() {
                                                    renderFields();
                                                    return Promise.resolve(
                                                        refreshNames()
                                                    ).then(function () {
                                                        show(
                                                            "Deleted " +
                                                                name +
                                                                " and removed its directory row."
                                                        );
                                                    });
                                                }
                                                var updated =
                                                    removeDirectoryRow(
                                                        directory.text,
                                                        name
                                                    );
                                                var _temp8 = (function () {
                                                    if (
                                                        !directory.missing &&
                                                        updated !==
                                                            directory.text
                                                    )
                                                        return Promise.resolve(
                                                            writePage(
                                                                directory.title,
                                                                updated,
                                                                "Removed " +
                                                                    name +
                                                                    " from directory",
                                                                directory,
                                                                false
                                                            )
                                                        ).then(function () {});
                                                })();
                                                return _temp8 && _temp8.then
                                                    ? _temp8.then(_temp9)
                                                    : _temp9(_temp8);
                                            });
                                        });
                                    },
                                    function (error) {
                                        show(
                                            (deleted
                                                ? "The article was deleted, but directory cleanup needs attention. "
                                                : "") + error.message,
                                            true
                                        );
                                    }
                                );
                            },
                            function (_wasThrown4, _result6) {
                                busy = false;
                                removeButton.disabled = false;
                                if (_wasThrown4) throw _result6;
                                return _result6;
                            }
                        );
                        return Promise.resolve(
                            _temp0 && _temp0.then
                                ? _temp0.then(function () {})
                                : void 0
                        );
                    } catch (e) {
                        return Promise.reject(e);
                    }
                };
                var loadEntry = function loadEntry() {
                    try {
                        if (busy) return Promise.resolve();
                        var name = picker.value;
                        if (!name)
                            return Promise.resolve(
                                show("Select a page first.", true)
                            );
                        if (!promptDiscard()) return Promise.resolve();
                        busy = true;
                        loadButton.disabled = true;
                        var requestedType = type;
                        return Promise.resolve(
                            _finallyRethrows(
                                function () {
                                    return _catch(
                                        function () {
                                            return Promise.resolve(
                                                readPage(name)
                                            ).then(function (page) {
                                                if (page.missing)
                                                    throw new Error(
                                                        "This page no longer exists."
                                                    );
                                                var tpl = template(
                                                    page.text,
                                                    TYPES[requestedType]
                                                        .template
                                                );
                                                if (!tpl.found)
                                                    throw new Error(
                                                        "The selected article does not use Template:" +
                                                            TYPES[requestedType]
                                                                .template +
                                                            ". Edit source instead so its content is preserved."
                                                    );
                                                renderFields();
                                                loaded = page;
                                                loadedName = name;
                                                originalText = page.text;
                                                controls.name.value = name;
                                                controls.name.disabled = true;
                                                var mapping = {
                                                    imageCaption:
                                                        "imagecaption",
                                                    itemCategory: "category",
                                                    weaponType: "weapontype",
                                                    locationType: "type",
                                                    placeLink: "placelink",
                                                    characterType: "type"
                                                };
                                                Object.entries(
                                                    controls
                                                ).forEach(function (_ref20) {
                                                    var _ref21 = _slicedToArray(
                                                            _ref20,
                                                            2
                                                        ),
                                                        fieldName = _ref21[0],
                                                        control = _ref21[1];
                                                    if (
                                                        [
                                                            "name",
                                                            "rulesArea",
                                                            "requirementsConfirmed"
                                                        ].includes(fieldName)
                                                    )
                                                        return;
                                                    var wikiName =
                                                        mapping[fieldName] ||
                                                        fieldName.toLowerCase();
                                                    if (
                                                        tpl.fields[wikiName] !==
                                                        undefined
                                                    )
                                                        control.value =
                                                            tpl.fields[
                                                                wikiName
                                                            ];
                                                });
                                                var data = meta(page.text);
                                                if (
                                                    controls.tags &&
                                                    tpl.fields.tags ===
                                                        undefined
                                                )
                                                    controls.tags.value = (
                                                        data.tags || []
                                                    ).join(", ");
                                                if (
                                                    controls.requirementsConfirmed
                                                )
                                                    controls.requirementsConfirmed.checked =
                                                        data.requirementsConfirmed ===
                                                        true;
                                                if (
                                                    controls.rulesArea &&
                                                    rulesValid(data.rules)
                                                )
                                                    data.rules.forEach(
                                                        function (group) {
                                                            return addRuleGroup(
                                                                controls.rulesArea,
                                                                group
                                                            );
                                                        }
                                                    );
                                                var sections = sectionsOf(
                                                    page.text
                                                ).map(function (s) {
                                                    return _objectSpread(
                                                        _objectSpread({}, s),
                                                        {},
                                                        {
                                                            content: cleanTail(
                                                                s.content
                                                            )
                                                        }
                                                    );
                                                });
                                                customArea.replaceChildren();
                                                sections.forEach(function (s) {
                                                    var title = key(s.title);
                                                    if (
                                                        title === "description"
                                                    ) {
                                                        if (
                                                            !controls
                                                                .description
                                                                .value
                                                        )
                                                            controls.description.value =
                                                                s.content;
                                                        return;
                                                    }
                                                    if (
                                                        title === "requirements"
                                                    ) {
                                                        if (
                                                            controls.requirements &&
                                                            !controls
                                                                .requirements
                                                                .value
                                                        )
                                                            controls.requirements.value =
                                                                s.content;
                                                        return;
                                                    }
                                                    if (
                                                        title ===
                                                            "demonstration" &&
                                                        controls.demo
                                                    ) {
                                                        var demo = parseDemo(
                                                            s.content
                                                        );
                                                        controls.demo.value =
                                                            demo.demo;
                                                        controls.demoCaption.value =
                                                            demo.demoCaption;
                                                        return;
                                                    }
                                                    if (
                                                        type === "item" &&
                                                        [
                                                            "statistics",
                                                            "usage"
                                                        ].includes(title)
                                                    ) {
                                                        controls[title].value =
                                                            s.content;
                                                        return;
                                                    }
                                                    if (
                                                        type === "character" &&
                                                        title === "skills"
                                                    ) {
                                                        if (
                                                            !trim(
                                                                controls.skills
                                                                    .value
                                                            )
                                                        )
                                                            controls.skills.value =
                                                                s.content;
                                                        return;
                                                    }
                                                    if (s.content)
                                                        addCustom(
                                                            s.title,
                                                            s.content
                                                        );
                                                });
                                                if (controls.characterType)
                                                    controls.characterType.dispatchEvent(
                                                        new Event("change")
                                                    );
                                                if (controls.itemCategory)
                                                    controls.itemCategory.dispatchEvent(
                                                        new Event("change")
                                                    );
                                                dirty = false;
                                                show(
                                                    "Loaded " +
                                                        name +
                                                        ". Existing descriptions and custom sections are preserved."
                                                );
                                            });
                                        },
                                        function (error) {
                                            show(error.message, true);
                                        }
                                    );
                                },
                                function (_wasThrown3, _result5) {
                                    busy = false;
                                    loadButton.disabled = false;
                                    if (_wasThrown3) throw _result5;
                                    return _result5;
                                }
                            )
                        );
                    } catch (e) {
                        return Promise.reject(e);
                    }
                };
                var refreshNames = function refreshNames() {
                    try {
                        var ticket = ++context;
                        var requestedType = type;
                        return Promise.resolve(
                            _catch(
                                function () {
                                    return Promise.resolve(
                                        readPage(TYPES[requestedType].directory)
                                    ).then(function (directory) {
                                        var rows =
                                            cardType(requestedType) &&
                                            !directory.missing
                                                ? directoryRecords(
                                                      directory.text,
                                                      requestedType
                                                  ).map(function (e) {
                                                      return e.name;
                                                  })
                                                : [];
                                        return Promise.resolve(
                                            categoryNames(requestedType)
                                        ).then(function (category) {
                                            if (ticket !== context) return;
                                            allNames = unique(
                                                [].concat(
                                                    _toConsumableArray(rows),
                                                    _toConsumableArray(category)
                                                )
                                            ).sort(function (a, b) {
                                                return a.localeCompare(b);
                                            });
                                            refreshPicker();
                                        });
                                    });
                                },
                                function (error) {
                                    if (ticket === context)
                                        show(
                                            "Could not load existing pages: " +
                                                error.message,
                                            true
                                        );
                                }
                            )
                        );
                    } catch (e) {
                        return Promise.reject(e);
                    }
                };
                if (root.dataset.ready) return Promise.resolve();
                root.dataset.ready = "1";
                root.classList.add("ss-tools");
                if (!mw.config.get("wgUserName")) {
                    root.replaceChildren(
                        node(
                            "p",
                            {},
                            "Sign in to use the Content Manager. ",
                            link("Special:UserLogin", "Log in")
                        )
                    );
                    return Promise.resolve();
                }
                var type = "medal";
                var mode = "create";
                var loaded = null;
                var loadedName = "";
                var originalText = "";
                var dirty = false;
                var busy = false;
                var context = 0;
                var controls = {};
                var typeTabs = node("div", {
                    class: "ss-tabs"
                });
                var modeTabs = node("div", {
                    class: "ss-tabs"
                });
                var picker = select([["", "Select an entry"]]);
                var find = node("input", {
                    type: "search",
                    placeholder: "Find an existing page"
                });
                var allNames = [];
                var pickerArea = node(
                    "div",
                    {
                        class: "ss-grid"
                    },
                    field("Find", find),
                    field("Existing page", picker)
                );
                var form = node("form", {});
                var fieldsArea = node("div", {
                    class: "ss-grid"
                });
                var customArea = node("div", {});
                var result = node("div", {
                    "aria-live": "polite"
                });
                var previewArea = node("details", {});
                var submit = node("button", {
                    type: "submit",
                    text: "Create Medal"
                });
                var loadButton = button("Load and prefill", loadEntry);
                pickerArea.append(loadButton);
                var removeButton = button("Delete selected page", deleteEntry);
                pickerArea.append(removeButton);
                var addSectionButton = button("Add section", function () {
                    addCustom("", "");
                    dirty = true;
                });
                var previewButton = button("Preview source", function () {
                    try {
                        var data = getData();
                        validate(data);
                        previewArea.replaceChildren(
                            node("summary", {
                                text: "Source preview"
                            }),
                            node("pre", {
                                text: buildArticle(data)
                            }),
                            node("h4", {
                                text: "Directory row"
                            }),
                            node("pre", {
                                text: rowText(data)
                            })
                        );
                        previewArea.open = true;
                    } catch (error) {
                        show(error.message, true);
                    }
                });
                var upload = node("a", {
                    class: "ss-upload",
                    href: mw.util.getUrl("Special:Upload"),
                    target: "_blank",
                    rel: "noopener",
                    text: "Upload a file"
                });
                var tagsArea = node("details", {});
                var tagsSummary = node("summary", {
                    text: "Manage tags"
                });
                tagsArea.append(tagsSummary);
                var customSection = node(
                    "section",
                    {
                        class: "ss-editor-section"
                    },
                    node("h3", {
                        text: "Optional article sections"
                    }),
                    node("p", {
                        class: "ss-help",
                        text: "Use Effects, Usage, or a custom section to explain mechanics. Empty sections are omitted."
                    }),
                    customArea,
                    addSectionButton
                );
                form.append(
                    fieldsArea,
                    customSection,
                    node(
                        "div",
                        {
                            class: "ss-row"
                        },
                        submit,
                        previewButton,
                        upload
                    ),
                    previewArea
                );
                function show(message, error) {
                    result.replaceChildren(
                        node("div", {
                            class: "ss-status" + (error ? " ss-error" : ""),
                            text: message
                        })
                    );
                }
                function addField(name, label, options) {
                    var o = options || {};
                    var control = o.options
                        ? select(o.options, o.value)
                        : node(
                              o.textarea ? "textarea" : "input",
                              _objectSpread(
                                  {
                                      type: o.number ? "number" : "text",
                                      placeholder: o.placeholder || ""
                                  },
                                  o.number
                                      ? {
                                            min: "0"
                                        }
                                      : {}
                              )
                          );
                    if (!o.options) control.value = o.value || "";
                    control.id = "sscm-" + name;
                    controls[name] = control;
                    var wrapper = field(label, control);
                    if (o.wide) wrapper.classList.add("ss-wide");
                    if (o.help)
                        wrapper.append(
                            node("span", {
                                class: "ss-help",
                                text: o.help
                            })
                        );
                    fieldsArea.append(wrapper);
                    return control;
                }
                function addCustom(title, content) {
                    var heading = node("input", {
                        placeholder: "Section name",
                        "aria-label": "Section name"
                    });
                    heading.value = title || "";
                    var body = node("textarea", {
                        "aria-label": "Section content"
                    });
                    body.value = content || "";
                    var row = node(
                        "div",
                        {
                            class: "ss-section-row"
                        },
                        heading,
                        body,
                        button("Remove", function () {
                            row.remove();
                            dirty = true;
                        })
                    );
                    row.classList.add("ss-custom-section");
                    customArea.append(row);
                }
                function promptDiscard() {
                    return (
                        !dirty ||
                        window.confirm("Discard your unsaved changes?")
                    );
                }
                function refreshPicker() {
                    var filter = key(find.value);
                    var chosen = picker.value;
                    picker.replaceChildren.apply(
                        picker,
                        [
                            node("option", {
                                value: "",
                                text: "Select an entry"
                            })
                        ].concat(
                            _toConsumableArray(
                                allNames
                                    .filter(function (n) {
                                        return key(n).includes(filter);
                                    })
                                    .map(function (n) {
                                        return node("option", {
                                            value: n,
                                            text: n
                                        });
                                    })
                            )
                        )
                    );
                    picker.value = chosen;
                }
                function rulesUI() {
                    var details = node("details", {
                        class: "ss-wide"
                    });
                    var groupsArea = node("div", {});
                    var confirmed = node("input", {
                        type: "checkbox"
                    });
                    controls.requirementsConfirmed = confirmed;
                    details.append(
                        node("summary", {
                            text: "Structured unlock requirements"
                        }),
                        node("p", {
                            class: "ss-help",
                            text: "All groups are required. Within each group, any one option is enough. Free text above is preserved for readers. Confirm these rules only after checking them."
                        }),
                        node(
                            "label",
                            {
                                class: "ss-checkbox"
                            },
                            confirmed,
                            "I confirmed the complete unlock rules, including when there are no requirements"
                        ),
                        groupsArea
                    );
                    controls.rulesArea = groupsArea;
                    details.append(
                        button("Add required group", function () {
                            addRuleGroup(groupsArea, []);
                            dirty = true;
                        })
                    );
                    fieldsArea.append(details);
                }
                function addRuleGroup(area, rules) {
                    var group = node("div", {
                        class: "ss-group"
                    });
                    var rows = node("div", {});
                    group.append(
                        node("strong", {
                            text: "Require any option in this group"
                        }),
                        rows,
                        button("Add alternative", function () {
                            addRule(rows, {
                                kind: "trait",
                                name: ""
                            });
                            dirty = true;
                        }),
                        button("Remove group", function () {
                            group.remove();
                            dirty = true;
                        })
                    );
                    area.append(group);
                    (rules.length
                        ? rules
                        : [
                              {
                                  kind: "trait",
                                  name: ""
                              }
                          ]
                    ).forEach(function (rule) {
                        return addRule(rows, rule);
                    });
                }
                function addRule(area, rule) {
                    var kindControl = select(
                        [
                            ["medal", "Medal"],
                            ["trait", "Trait"],
                            ["skill", "Skill"],
                            ["attribute", "Attribute"],
                            ["other", "Other condition"]
                        ],
                        rule.kind
                    );
                    var nameControl = node("input", {
                        placeholder: "Exact page name or condition",
                        "aria-label": "Requirement name"
                    });
                    nameControl.value = rule.name || "";
                    var amount = node("input", {
                        type: "number",
                        min: "1",
                        max: "5",
                        value: rule.min || 1,
                        "aria-label": "Minimum attribute"
                    });
                    var row = node(
                        "div",
                        {
                            class: "ss-rule"
                        },
                        kindControl,
                        nameControl,
                        amount,
                        button("Remove", function () {
                            row.remove();
                            dirty = true;
                        })
                    );
                    kindControl.addEventListener("change", function () {
                        amount.hidden = kindControl.value !== "attribute";
                        nameControl.placeholder =
                            kindControl.value === "attribute"
                                ? "Strength, Fortitude, Agility, Dexterity, Precision"
                                : "Exact page name or condition";
                    });
                    amount.hidden = rule.kind !== "attribute";
                    area.append(row);
                }
                function renderFields() {
                    fieldsArea.replaceChildren();
                    customArea.replaceChildren();
                    Object.keys(controls).forEach(function (k) {
                        return delete controls[k];
                    });
                    var c = TYPES[type];
                    addField("name", "Exact page name", {
                        help: "Use the exact name shown in game."
                    }).required = true;
                    if (c.rarity)
                        addField("rarity", "Rarity", {
                            options: [["", "Select rarity"]].concat(RARITIES)
                        });
                    if (cardType(type)) {
                        addField(
                            "requirements",
                            "Requirements on this article",
                            {
                                wide: true,
                                textarea: true,
                                help: "Optional. Traits and Skills do not show a requirements column in their directory."
                            }
                        );
                        addField("obtained", "How it is obtained", {
                            value: c.obtained || ""
                        });
                        addField("tags", "Tags", {
                            wide: true,
                            placeholder: "Separate tags with commas",
                            help: "Select existing tags below. Create, rename, or remove available tags in Manage tags."
                        });
                        var chosen = node("div", {
                            class: "ss-tags ss-wide"
                        });
                        unique(registry[type] || [])
                            .sort()
                            .forEach(function (tag) {
                                return chosen.append(
                                    button(tag, function () {
                                        controls.tags.value = unique(
                                            [].concat(
                                                _toConsumableArray(
                                                    splitTags(
                                                        controls.tags.value
                                                    )
                                                ),
                                                [tag]
                                            )
                                        ).join(", ");
                                        dirty = true;
                                    })
                                );
                            });
                        fieldsArea.append(chosen);
                        rulesUI();
                    }
                    if (type === "item") {
                        addField("itemCategory", "Item category", {
                            options: [
                                "Weapon",
                                "Medical",
                                "Utility",
                                "Accessory",
                                "Ammunition",
                                "Grenade",
                                "Explosive",
                                "Currency",
                                "Miscellaneous"
                            ]
                        });
                        addField("weaponType", "Weapon type", {
                            options: ["Melee", "Gun"]
                        });
                        var update = function update() {
                            controls.weaponType.parentElement.hidden =
                                controls.itemCategory.value !== "Weapon";
                        };
                        controls.itemCategory.addEventListener(
                            "change",
                            update
                        );
                        update();
                        addField("statistics", "Statistics", {
                            textarea: true,
                            wide: true
                        });
                        addField("usage", "Usage", {
                            textarea: true,
                            wide: true
                        });
                    }
                    if (type === "location") {
                        addField("locationType", "Location type", {
                            options: [
                                "Country",
                                "Region",
                                "City",
                                "Fort",
                                "Airfield Base",
                                "Landmark",
                                "Other"
                            ]
                        });
                        [
                            ["country", "Country"],
                            ["region", "Region"],
                            ["parent", "Parent location"],
                            ["placeLink", "Roblox Place link"]
                        ].forEach(function (_ref0) {
                            var _ref1 = _slicedToArray(_ref0, 2),
                                name = _ref1[0],
                                label = _ref1[1];
                            return addField(name, label, {
                                help: "Optional."
                            });
                        });
                    }
                    if (type === "character") {
                        addField("characterType", "Character type", {
                            options: ["Player", "NPC"]
                        });
                        addField("robloxUser", "Roblox username", {
                            help: "Optional for Players."
                        });
                        var _update = function _update() {
                            controls.robloxUser.parentElement.hidden =
                                controls.characterType.value !== "Player";
                        };
                        controls.characterType.addEventListener(
                            "change",
                            _update
                        );
                        _update();
                        [
                            ["fullName", "Full name"],
                            ["aliases", "Aliases"],
                            ["age", "Age"],
                            ["birthplace", "Born in"],
                            ["languages", "Languages"],
                            ["height", "Height"],
                            ["country", "Country"],
                            ["regiment", "Regiment"],
                            ["division", "Division"],
                            ["rank", "Rank"],
                            ["role", "Role"],
                            ["squad", "Squad"],
                            ["serviceStatus", "Service status"]
                        ].forEach(function (_ref10) {
                            var _ref11 = _slicedToArray(_ref10, 2),
                                name = _ref11[0],
                                label = _ref11[1];
                            return addField(name, label);
                        });
                        ATTRIBUTES.forEach(function (a) {
                            return addField(a.toLowerCase(), a, {
                                value: "1",
                                number: true
                            });
                        });
                        [
                            ["personality", "Personality"],
                            ["background", "Background"],
                            ["traits", "Traits"],
                            ["medals", "Medals"],
                            ["skills", "Skills"]
                        ].forEach(function (_ref12) {
                            var _ref13 = _slicedToArray(_ref12, 2),
                                name = _ref13[0],
                                label = _ref13[1];
                            return addField(name, label, {
                                textarea: true,
                                wide: true
                            });
                        });
                        [
                            ["titanKills", "Titan kills"],
                            ["abnormalKills", "Abnormal kills"],
                            ["humanKills", "Human kills"],
                            ["humanAssists", "Human assists"],
                            ["bandages", "Bandages used"],
                            ["bandageRemovals", "Bandage removals"],
                            ["revivals", "Revivals"]
                        ].forEach(function (_ref14) {
                            var _ref15 = _slicedToArray(_ref14, 2),
                                name = _ref15[0],
                                label = _ref15[1];
                            return addField(name, label, {
                                number: true,
                                value: "0"
                            });
                        });
                    }
                    addField(
                        "description",
                        cardType(type)
                            ? "In game card description"
                            : "Description",
                        {
                            wide: true,
                            textarea: true,
                            placeholder: cardType(type)
                                ? "Copy the exact description from the card"
                                : "Enter confirmed information",
                            help: cardType(type)
                                ? "Keep the exact card wording here. Explain mechanics in the optional sections below."
                                : "Optional. Used on the article and in its directory."
                        }
                    );
                    addField(
                        "image",
                        type === "location"
                            ? "Location image or map filename"
                            : type === "character"
                              ? "Character image filename"
                              : type === "item"
                                ? "Item image filename"
                                : "Card art filename",
                        {
                            value:
                                type === "character"
                                    ? "Character Image.png"
                                    : type === "location"
                                      ? ""
                                      : "Blank Card Art.png"
                        }
                    );
                    addField("imageCaption", "Image caption", {
                        value:
                            type === "character"
                                ? "Image of the character."
                                : type === "location"
                                  ? "Image or map of the location."
                                  : type === "item"
                                    ? "In game image of this item."
                                    : c.title + " card artwork."
                    });
                    if (type !== "character") {
                        addField("status", "Status", {
                            value:
                                type === "location"
                                    ? "Accessible"
                                    : "Obtainable"
                        });
                        addField(
                            "demo",
                            "YouTube link or uploaded video or GIF",
                            {
                                placeholder: "YouTube link or Example.gif"
                            }
                        );
                        addField("demoCaption", "Demonstration caption");
                    }
                    if (cardType(type)) {
                        addCustom("Effects", "");
                        addCustom("Usage", "");
                    }
                    if (type === "character") {
                        addCustom("History", "");
                        addCustom("Previous Information", "");
                        addCustom("Relationships", "");
                    }
                    loaded = null;
                    loadedName = "";
                    originalText = "";
                    dirty = false;
                    previewArea.replaceChildren();
                    previewArea.open = false;
                }
                function getData() {
                    var _controls$requirement;
                    var data = {
                        type: type,
                        sections: []
                    };
                    Object.entries(controls).forEach(function (_ref16) {
                        var _ref17 = _slicedToArray(_ref16, 2),
                            name = _ref17[0],
                            control = _ref17[1];
                        if (
                            ["rulesArea", "requirementsConfirmed"].includes(
                                name
                            )
                        )
                            return;
                        data[name] = trim(control.value);
                    });
                    data.image = (data.image || "").replace(/^File:/i, "");
                    data.tags = splitTags(data.tags);
                    data.requirementsConfirmed = !!(
                        (_controls$requirement =
                            controls.requirementsConfirmed) !== null &&
                        _controls$requirement !== void 0 &&
                        _controls$requirement.checked
                    );
                    data.rules = controls.rulesArea
                        ? _toConsumableArray(controls.rulesArea.children).map(
                              function (group) {
                                  return _toConsumableArray(
                                      group.querySelectorAll(".ss-rule")
                                  ).map(function (row) {
                                      var nodes =
                                          row.querySelectorAll("select,input");
                                      return _objectSpread(
                                          {
                                              kind: nodes[0].value,
                                              name: trim(nodes[1].value)
                                          },
                                          nodes[0].value === "attribute"
                                              ? {
                                                    min: Number(nodes[2].value)
                                                }
                                              : {}
                                      );
                                  });
                              }
                          )
                        : [];
                    if (
                        cardType(type) &&
                        !data.requirements &&
                        data.rules.length
                    ) {
                        var label = function label(rule) {
                            return ["medal", "trait", "skill"].includes(
                                rule.kind
                            )
                                ? "[[" +
                                      rule.name +
                                      "]] " +
                                      TYPES[rule.kind].title
                                : rule.kind === "attribute"
                                  ? rule.min + " " + rule.name
                                  : rule.name;
                        };
                        data.requirements = data.rules
                            .map(function (group) {
                                return group.map(label).join(" or ");
                            })
                            .join(", ");
                    }
                    customArea
                        .querySelectorAll(".ss-custom-section")
                        .forEach(function (row) {
                            var inputs = row.querySelectorAll("input,textarea");
                            if (trim(inputs[0].value) && trim(inputs[1].value))
                                data.sections.push({
                                    title: trim(inputs[0].value),
                                    content: trim(inputs[1].value)
                                });
                        });
                    if (type === "character" && data.characterType !== "Player")
                        data.robloxUser = "";
                    return data;
                }
                function validate(data) {
                    if (!titleValid(data.name))
                        throw new Error(
                            "Enter a valid page name without a namespace or wiki formatting."
                        );
                    if (type === "medal" && !RARITIES.includes(data.rarity))
                        throw new Error("Select a rarity.");
                    if (cardType(type) && !rulesValid(data.rules))
                        throw new Error(
                            "Each requirement group needs a named option. Attribute minimums must be from 1 through 5."
                        );
                    if (
                        cardType(type) &&
                        data.requirementsConfirmed &&
                        data.requirements &&
                        key(data.requirements) !== "none" &&
                        !data.rules.length
                    )
                        throw new Error(
                            "Add structured rules for the written requirements before confirming them. Leave the confirmation unchecked if the complete rules are not known yet."
                        );
                    if (
                        data.tags.some(function (tag) {
                            return tag.length > 60 || /[<>|\[\]{}]/.test(tag);
                        })
                    )
                        throw new Error(
                            "Tags must be short plain text labels."
                        );
                    if (
                        data.sections.some(function (s) {
                            return /[=\n\r<>]/.test(s.title);
                        })
                    )
                        throw new Error(
                            "Section names cannot contain wiki heading markup."
                        );
                    if (
                        data.sections.some(function (s) {
                            return [
                                "description",
                                "requirements",
                                "demonstration"
                            ].includes(key(s.title));
                        })
                    )
                        throw new Error(
                            "Use the dedicated Description, Requirements, or Demonstration fields for those sections."
                        );
                    if (
                        data.demo &&
                        (/^https?:\/\//i.test(data.demo)
                            ? /[\s\[\]<>]/.test(data.demo)
                            : /[|\[\]{}<>\n\r]/.test(data.demo))
                    )
                        throw new Error(
                            "Enter a valid demonstration link or file name."
                        );
                    if (
                        data.placeLink &&
                        !/^https:\/\/(?:www\.)?roblox\.com\/games\/\d+(?:\/[^\s\[\]<>]*)?$/i.test(
                            data.placeLink
                        )
                    )
                        throw new Error(
                            "Use a Roblox games link or leave the Place link blank."
                        );
                    if (mode === "edit" && !loaded)
                        throw new Error(
                            "Load an existing page before editing."
                        );
                }
                function articleFields(data) {
                    var previous = loaded
                        ? template(originalText, TYPES[type].template).fields
                        : {};
                    var fields = _objectSpread({}, previous);
                    fields.name = "{{PAGENAME}}";
                    fields.image = data.image;
                    fields.imagecaption = data.imageCaption;
                    fields.description = data.description;
                    if (cardType(type)) {
                        fields.requirements =
                            key(data.requirements) === "none"
                                ? ""
                                : data.requirements;
                        fields.obtained = data.obtained;
                        fields.tags = data.tags.join(", ");
                    }
                    if (type === "medal") fields.rarity = data.rarity;
                    if (type !== "character") fields.status = data.status;
                    if (type === "item") {
                        fields.category = data.itemCategory;
                        fields.weapontype =
                            data.itemCategory === "Weapon"
                                ? data.weaponType
                                : "";
                    }
                    if (type === "location") {
                        fields.type = data.locationType;
                        fields.country = data.country;
                        fields.region = data.region;
                        fields.parent = data.parent;
                        fields.placelink = data.placeLink;
                    }
                    if (type === "character") {
                        [
                            "fullName",
                            "aliases",
                            "robloxUser",
                            "age",
                            "birthplace",
                            "languages",
                            "height",
                            "country",
                            "regiment",
                            "division",
                            "personality",
                            "background",
                            "strength",
                            "fortitude",
                            "agility",
                            "dexterity",
                            "precision",
                            "rank",
                            "role",
                            "squad",
                            "serviceStatus",
                            "titanKills",
                            "abnormalKills",
                            "humanKills",
                            "humanAssists",
                            "bandages",
                            "bandageRemovals",
                            "revivals"
                        ].forEach(function (name) {
                            fields[name.toLowerCase()] = data[name] || "";
                        });
                        fields.type = data.characterType;
                        fields.traits = linkedLines(data.traits);
                        fields.medals = linkedLines(data.medals);
                        fields.skills = linkedLines(data.skills);
                        delete fields.status;
                    }
                    return fields;
                }
                function linkedLines(value) {
                    return trim(value)
                        .split("\n")
                        .map(trim)
                        .filter(Boolean)
                        .map(function (v) {
                            return /^\*/.test(v)
                                ? v
                                : v.startsWith("[[")
                                  ? "* " + v
                                  : "* [[" + v + "]]";
                        })
                        .join("\n");
                }
                function buildArticle(data) {
                    var fields = articleFields(data);
                    var tpl = templateText(TYPES[type].template, fields);
                    var out = [tpl];
                    var lead =
                        "'''{{PAGENAME}}''' is " +
                        (type === "item"
                            ? "an Item"
                            : "a " + TYPES[type].title) +
                        " in Seashell.";
                    var prefix = "";
                    var categories = [
                        "[[Category:" + TYPES[type].directory + "]]",
                        "[[Category:Community submissions]]"
                    ];
                    if (loaded) {
                        var previous = template(
                            originalText,
                            TYPES[type].template
                        );
                        prefix = originalText.slice(0, previous.start);
                        var tail = originalText.slice(previous.end);
                        var firstHeading = /^==[^=\n]+==[ \t]*$/m.exec(tail);
                        var existingLead = cleanTail(
                            firstHeading
                                ? tail.slice(0, firstHeading.index)
                                : tail
                        );
                        if (existingLead) lead = existingLead;
                        categories = unique(
                            [].concat(
                                _toConsumableArray(categories),
                                _toConsumableArray(
                                    originalText.match(
                                        /\[\[Category:[^\]]+\]\]/gi
                                    ) || []
                                )
                            )
                        );
                    }
                    out.push("", lead);
                    var add = function add(title, content) {
                        if (trim(content))
                            out.push("", "==" + title + "==", trim(content));
                    };
                    add("Description", data.description);
                    if (cardType(type) && key(data.requirements) !== "none")
                        add("Requirements", data.requirements);
                    if (type === "item") {
                        add("Statistics", data.statistics);
                        add("Usage", data.usage);
                    }
                    if (type === "character")
                        add("Skills", linkedLines(data.skills));
                    data.sections.forEach(function (s) {
                        return add(s.title, s.content);
                    });
                    if (type !== "character")
                        add(
                            "Demonstration",
                            demoText(data.demo, data.demoCaption)
                        );
                    if (type === "item") {
                        var _categories;
                        categories = categories.filter(function (c) {
                            return !/^\[\[Category:(?:Weapons|Guns|Melee Weapons|(?:Medical|Utility|Accessory|Ammunition|Grenade|Explosive|Currency|Miscellaneous) Items)\]\]$/i.test(
                                c
                            );
                        });
                        (_categories = categories).push.apply(
                            _categories,
                            _toConsumableArray(
                                data.itemCategory === "Weapon"
                                    ? [
                                          "[[Category:Weapons]]",
                                          "[[Category:" +
                                              (data.weaponType === "Gun"
                                                  ? "Guns"
                                                  : "Melee Weapons") +
                                              "]]"
                                      ]
                                    : [
                                          "[[Category:" +
                                              data.itemCategory +
                                              " Items]]"
                                      ]
                            )
                        );
                    }
                    if (type === "location") {
                        var map = {
                            Country: "Countries",
                            Region: "Regions",
                            City: "Cities",
                            Fort: "Forts",
                            "Airfield Base": "Airfield Bases",
                            Landmark: "Landmarks",
                            Other: "Other Locations"
                        };
                        categories = categories.filter(function (c) {
                            return !Object.values(map).some(function (v) {
                                return key(c) === key("[[Category:" + v + "]]");
                            });
                        });
                        categories.push(
                            "[[Category:" + map[data.locationType] + "]]"
                        );
                    }
                    if (cardType(type))
                        out.push("", metaLine(entryMetadata(data)));
                    out.push.apply(
                        out,
                        [""].concat(_toConsumableArray(unique(categories)))
                    );
                    return prefix + out.join("\n").trimEnd() + "\n";
                }
                function tabs() {
                    typeTabs.replaceChildren.apply(
                        typeTabs,
                        _toConsumableArray(
                            Object.entries(TYPES).map(function (_ref18) {
                                var _ref19 = _slicedToArray(_ref18, 2),
                                    id = _ref19[0],
                                    c = _ref19[1];
                                var b = button(c.directory, function () {
                                    return switchContext(id, mode);
                                });
                                b.classList.toggle("ss-active", type === id);
                                return b;
                            })
                        )
                    );
                    modeTabs.replaceChildren.apply(
                        modeTabs,
                        _toConsumableArray(
                            ["create", "edit"]
                                .concat(
                                    _toConsumableArray(
                                        userIsAdmin ? ["delete"] : []
                                    )
                                )
                                .map(function (id) {
                                    var b = button(
                                        id[0].toUpperCase() + id.slice(1),
                                        function () {
                                            return switchContext(type, id);
                                        }
                                    );
                                    b.classList.toggle(
                                        "ss-active",
                                        mode === id
                                    );
                                    return b;
                                })
                        )
                    );
                    pickerArea.hidden = mode === "create";
                    form.hidden = mode === "delete";
                    loadButton.hidden = mode !== "edit";
                    removeButton.hidden = mode !== "delete";
                    submit.textContent =
                        (mode === "edit" ? "Save " : "Create ") +
                        TYPES[type].title;
                    tagsArea.hidden = !cardType(type) || !userIsAdmin;
                }
                function switchContext(nextType, nextMode) {
                    if (busy || !promptDiscard()) return;
                    type = nextType;
                    mode = nextMode;
                    renderFields();
                    tabs();
                    renderTagManager();
                    refreshNames();
                }
                function renderTagManager() {
                    tagsArea.replaceChildren(tagsSummary);
                    if (!cardType(type) || !userIsAdmin) return;
                    var available = select(
                        [["", "Select a tag"]].concat(
                            _toConsumableArray((registry[type] || []).sort())
                        )
                    );
                    var name = node("input", {
                        placeholder: "Tag name",
                        "aria-label": "Tag name"
                    });
                    tagsArea.append(
                        node(
                            "div",
                            {
                                class: "ss-grid"
                            },
                            field("Existing tag", available),
                            field("New or replacement name", name)
                        ),
                        node(
                            "div",
                            {
                                class: "ss-row"
                            },
                            button("Create tag", function () {
                                return tagChange("create", "", name.value);
                            }),
                            button("Rename tag", function () {
                                return tagChange(
                                    "rename",
                                    available.value,
                                    name.value
                                );
                            }),
                            button("Remove tag", function () {
                                return tagChange("remove", available.value, "");
                            })
                        ),
                        node("p", {
                            class: "ss-help",
                            text: "Tag changes affect this content type. Renaming or removing a tag updates its directory entries and article tags without changing descriptions."
                        })
                    );
                }
                root.replaceChildren(
                    typeTabs,
                    modeTabs,
                    pickerArea,
                    form,
                    tagsArea,
                    result
                );
                form.addEventListener("input", function () {
                    dirty = true;
                });
                form.addEventListener("change", function () {
                    dirty = true;
                });
                find.addEventListener("input", refreshPicker);
                form.addEventListener("submit", function (event) {
                    try {
                        event.preventDefault();
                        if (busy) return Promise.resolve();
                        var saved = false;
                        return Promise.resolve(
                            _finallyRethrows(
                                function () {
                                    return _catch(
                                        function () {
                                            var data = getData();
                                            validate(data);
                                            busy = true;
                                            submit.disabled = true;
                                            var target =
                                                mode === "edit"
                                                    ? loadedName
                                                    : data.name;
                                            return Promise.resolve(
                                                readPage(TYPES[type].directory)
                                            ).then(function (directory) {
                                                function _temp7(page) {
                                                    if (
                                                        mode === "create" &&
                                                        !page.missing
                                                    )
                                                        throw new Error(
                                                            "That page already exists. Use Edit instead."
                                                        );
                                                    show(
                                                        "Saving " +
                                                            target +
                                                            "..."
                                                    );
                                                    return Promise.resolve(
                                                        writePage(
                                                            target,
                                                            buildArticle(data),
                                                            (mode === "create"
                                                                ? "Created "
                                                                : "Updated ") +
                                                                TYPES[type]
                                                                    .title +
                                                                " through Content Manager",
                                                            page,
                                                            mode === "create"
                                                        )
                                                    ).then(function (written) {
                                                        saved = true;
                                                        // Keep the saved base revision even if the separate directory edit fails.
                                                        loaded = _objectSpread(
                                                            _objectSpread(
                                                                {},
                                                                page
                                                            ),
                                                            {},
                                                            {
                                                                missing: false,
                                                                text: buildArticle(
                                                                    data
                                                                ),
                                                                id:
                                                                    written.edit
                                                                        .newrevid ||
                                                                    page.id,
                                                                timestamp:
                                                                    undefined,
                                                                start: undefined
                                                            }
                                                        );
                                                        originalText =
                                                            loaded.text;
                                                        loadedName = target;
                                                        return Promise.resolve(
                                                            writePage(
                                                                directory.title,
                                                                updatedDirectory,
                                                                "Updated directory entry for " +
                                                                    target,
                                                                directory,
                                                                false
                                                            )
                                                        ).then(function () {
                                                            if (
                                                                cardType(type)
                                                            ) {
                                                                var unknown =
                                                                    data.tags.filter(
                                                                        function (
                                                                            tag
                                                                        ) {
                                                                            return !(
                                                                                registry[
                                                                                    type
                                                                                ] ||
                                                                                []
                                                                            ).some(
                                                                                function (
                                                                                    t
                                                                                ) {
                                                                                    return (
                                                                                        key(
                                                                                            t
                                                                                        ) ===
                                                                                        key(
                                                                                            tag
                                                                                        )
                                                                                    );
                                                                                }
                                                                            );
                                                                        }
                                                                    );
                                                                if (
                                                                    unknown.length
                                                                )
                                                                    show(
                                                                        "Saved successfully. These tags are assigned but not registered in Manage tags: " +
                                                                            unknown.join(
                                                                                ", "
                                                                            ) +
                                                                            ". An administrator can register them."
                                                                    );
                                                                else
                                                                    show(
                                                                        "Saved " +
                                                                            target +
                                                                            " and its directory entry."
                                                                    );
                                                            } else
                                                                show(
                                                                    "Saved " +
                                                                        target +
                                                                        " and its directory entry."
                                                                );
                                                            dirty = false;
                                                            if (
                                                                mode ===
                                                                "create"
                                                            )
                                                                renderFields();
                                                            return Promise.resolve(
                                                                refreshNames()
                                                            ).then(
                                                                function () {}
                                                            );
                                                        });
                                                    });
                                                }
                                                if (directory.missing)
                                                    throw new Error(
                                                        "Create the directory page first."
                                                    );
                                                var updatedDirectory =
                                                    updateDirectory(
                                                        directory.text,
                                                        data
                                                    ); // Verify insertion before creating the article.
                                                var _temp6 = mode === "edit";
                                                return _temp6
                                                    ? _temp7(loaded)
                                                    : Promise.resolve(
                                                          readPage(target)
                                                      ).then(_temp7);
                                            });
                                        },
                                        function (error) {
                                            if (saved && mode === "create") {
                                                mode = "edit";
                                                controls.name.disabled = true;
                                                tabs();
                                            }
                                            show(
                                                (saved
                                                    ? "The article was saved, but its directory update failed. Stay in Edit and save again after resolving the problem. "
                                                    : "") + error.message,
                                                true
                                            );
                                        }
                                    );
                                },
                                function (_wasThrown2, _result3) {
                                    busy = false;
                                    submit.disabled = false;
                                    if (_wasThrown2) throw _result3;
                                    return _result3;
                                }
                            )
                        );
                    } catch (e) {
                        return Promise.reject(e);
                    }
                });
                window.addEventListener("beforeunload", function (event) {
                    if (dirty || busy) {
                        event.preventDefault();
                        event.returnValue = "";
                    }
                });
                renderFields();
                tabs();
                renderTagManager();
                refreshNames();
                loadRegistry()
                    .then(function () {
                        if (!dirty && !loaded && !busy && mode === "create")
                            renderFields();
                        if (!busy) renderTagManager();
                    })
                    .catch(function (error) {
                        return show(
                            "Could not load the tag registry. Existing article tags still work. " +
                                error.message,
                            true
                        );
                    });
                return Promise.resolve();
            } catch (e) {
                return Promise.reject(e);
            }
        };
        var browser = function browser(root, type) {
            try {
                if (root.dataset.ready) return Promise.resolve();
                root.dataset.ready = "1";
                root.classList.add("ss-tools");
                return Promise.resolve(
                    _catch(
                        function () {
                            return Promise.resolve(
                                readPage(TYPES[type].directory)
                            ).then(function (directory) {
                                if (directory.missing)
                                    throw new Error(
                                        "The directory page could not be found."
                                    );
                                var entries = directoryRecords(
                                    directory.text,
                                    type
                                );
                                if (!entries.length) {
                                    root.textContent =
                                        "No documented entries were found. The table below remains available.";
                                    return;
                                }
                                var query = new URLSearchParams(
                                    location.search
                                );
                                var currentPage = Math.max(
                                    1,
                                    Number(query.get("sspage")) || 1
                                );
                                var chosenTags = splitTags(
                                    query.get("sstags") || ""
                                );
                                var search = node("input", {
                                    type: "search",
                                    placeholder:
                                        "Search names, descriptions, tags, or requirements",
                                    "aria-label":
                                        "Search " + TYPES[type].directory
                                });
                                search.value = query.get("ssq") || "";
                                var rarity = select(
                                    [["", "All rarities"]].concat(RARITIES),
                                    query.get("ssrarity")
                                );
                                var sort = select(
                                    [
                                        ["name", "Name A to Z"],
                                        ["reverse", "Name Z to A"]
                                    ].concat(
                                        _toConsumableArray(
                                            type === "medal"
                                                ? [
                                                      [
                                                          "rarity",
                                                          "Rarity highest first"
                                                      ]
                                                  ]
                                                : []
                                        )
                                    ),
                                    query.get("sssort") || "name"
                                );
                                var unlock = select(
                                    [["", "All unlock requirements"]].concat(
                                        _toConsumableArray(
                                            unique(
                                                entries.flatMap(
                                                    requirementNames
                                                )
                                            ).sort()
                                        )
                                    ),
                                    query.get("ssunlock")
                                );
                                var missing = select(
                                    [
                                        ["", "All information"],
                                        ["any", "Any missing information"],
                                        ["description", "Missing description"],
                                        ["art", "Missing artwork"],
                                        ["tags", "Missing tags"],
                                        [
                                            "requirements",
                                            "Requirements not confirmed"
                                        ],
                                        ["article", "Missing article"]
                                    ],
                                    query.get("ssmissing")
                                );
                                var view = select(
                                    [
                                        ["list", "List view"],
                                        ["cards", "Card view"]
                                    ],
                                    query.get("ssview") || "list"
                                );
                                var limit = select(
                                    ["12", "24", "48"],
                                    query.get("sslimit") || "24"
                                );
                                var eligible = select(
                                    [
                                        ["all", "All entries"],
                                        ["met", "Requirements met"],
                                        ["unmet", "Requirements not met"],
                                        ["unknown", "Requirements unknown"]
                                    ],
                                    query.get("sseligible") || "all"
                                );
                                var hideOwned = node("input", {
                                    type: "checkbox"
                                });
                                hideOwned.checked =
                                    query.get("sshideowned") === "1";
                                var results = node("div", {
                                    class: "ss-results"
                                });
                                var count = node("p", {
                                    "aria-live": "polite"
                                });
                                var tags = node("div", {
                                    class: "ss-tags"
                                });
                                var pager = node("div", {
                                    class: "ss-pager"
                                });
                                var message = node("div", {
                                    "aria-live": "polite"
                                });
                                var profile = {
                                    owned: [],
                                    attributes: Object.fromEntries(
                                        ATTRIBUTES.map(function (a) {
                                            return [a, 1];
                                        })
                                    )
                                };
                                try {
                                    var stored = JSON.parse(
                                        localStorage.getItem(
                                            "seashell.profile.v2"
                                        ) || "{}"
                                    );
                                    if (
                                        stored &&
                                        _typeof(stored) === "object"
                                    ) {
                                        profile.owned = Array.isArray(
                                            stored.owned
                                        )
                                            ? unique(
                                                  stored.owned.filter(
                                                      function (value) {
                                                          return (
                                                              typeof value ===
                                                              "string"
                                                          );
                                                      }
                                                  )
                                              )
                                            : [];
                                        ATTRIBUTES.forEach(function (a) {
                                            var _stored$attributes;
                                            profile.attributes[a] = Math.min(
                                                5,
                                                Math.max(
                                                    1,
                                                    Number(
                                                        (_stored$attributes =
                                                            stored.attributes) ===
                                                            null ||
                                                            _stored$attributes ===
                                                                void 0
                                                            ? void 0
                                                            : _stored$attributes[
                                                                  a
                                                              ]
                                                    ) || 1
                                                )
                                            );
                                        });
                                    }
                                } catch (error) {
                                    /* Storage is optional. */
                                }
                                var own = node("textarea", {
                                    placeholder:
                                        "One exact Medal, Trait, or Skill page name per line"
                                });
                                own.value = (profile.owned || []).join("\n");
                                var remember = node("input", {
                                    type: "checkbox"
                                });
                                try {
                                    remember.checked = !!localStorage.getItem(
                                        "seashell.profile.v2"
                                    );
                                } catch (error) {
                                    /* Storage is optional. */
                                }
                                var attrs = node("div", {
                                    class: "ss-attributes"
                                });
                                var attributeInputs = {};
                                ATTRIBUTES.forEach(function (a) {
                                    var control = node("input", {
                                        type: "number",
                                        min: "1",
                                        max: "5",
                                        value: profile.attributes[a] || 1
                                    });
                                    attributeInputs[a] = control;
                                    attrs.append(field(a, control));
                                });
                                var publicName = node("input", {
                                    type: "text",
                                    placeholder:
                                        "Character page name or public wiki link"
                                });
                                var publicStatus = node("p", {
                                    class: "ss-help",
                                    "aria-live": "polite"
                                });
                                var loadPublic = button(
                                    "Load public character",
                                    function () {
                                        try {
                                            loadPublic.disabled = true;
                                            publicStatus.textContent =
                                                "Loading public character information...";
                                            return Promise.resolve(
                                                _finallyRethrows(
                                                    function () {
                                                        return _catch(
                                                            function () {
                                                                var title =
                                                                    publicCharacterTitle(
                                                                        publicName.value
                                                                    );
                                                                return Promise.resolve(
                                                                    readPage(
                                                                        title,
                                                                        true
                                                                    )
                                                                ).then(
                                                                    function (
                                                                        page
                                                                    ) {
                                                                        if (
                                                                            page.missing
                                                                        )
                                                                            throw new Error(
                                                                                "That public wiki page could not be found."
                                                                            );
                                                                        var imported =
                                                                            characterProfile(
                                                                                page.text
                                                                            );
                                                                        // Replace the previous person's inventory, never combine two characters.
                                                                        own.value =
                                                                            imported.owned.join(
                                                                                "\n"
                                                                            );
                                                                        ATTRIBUTES.forEach(
                                                                            function (
                                                                                name
                                                                            ) {
                                                                                attributeInputs[
                                                                                    name
                                                                                ].value =
                                                                                    imported
                                                                                        .attributes[
                                                                                        name
                                                                                    ] ||
                                                                                    1;
                                                                            }
                                                                        );
                                                                        profileChanged();
                                                                        var missingAttributes =
                                                                            ATTRIBUTES.filter(
                                                                                function (
                                                                                    name
                                                                                ) {
                                                                                    return (
                                                                                        imported
                                                                                            .attributes[
                                                                                            name
                                                                                        ] ===
                                                                                        undefined
                                                                                    );
                                                                                }
                                                                            );
                                                                        publicStatus.replaceChildren(
                                                                            "Loaded ",
                                                                            link(
                                                                                page.title ||
                                                                                    title
                                                                            ),
                                                                            ": " +
                                                                                imported
                                                                                    .owned
                                                                                    .length +
                                                                                " listed Medals, Traits, and Skills. You can adjust the fields below." +
                                                                                (missingAttributes.length
                                                                                    ? " Attributes not documented default to 1: " +
                                                                                      missingAttributes.join(
                                                                                          ", "
                                                                                      ) +
                                                                                      "."
                                                                                    : "") +
                                                                                " Unlisted abilities are not treated as owned."
                                                                        );
                                                                    }
                                                                );
                                                            },
                                                            function (error) {
                                                                publicStatus.textContent =
                                                                    error.message;
                                                            }
                                                        );
                                                    },
                                                    function (
                                                        _wasThrown,
                                                        _result2
                                                    ) {
                                                        loadPublic.disabled = false;
                                                        if (_wasThrown)
                                                            throw _result2;
                                                        return _result2;
                                                    }
                                                )
                                            );
                                        } catch (e) {
                                            return Promise.reject(e);
                                        }
                                    }
                                );
                                publicName.addEventListener(
                                    "keydown",
                                    function (event) {
                                        if (event.key === "Enter") {
                                            event.preventDefault();
                                            if (!loadPublic.disabled)
                                                loadPublic.click();
                                        }
                                    }
                                );
                                var profileBox = node(
                                    "details",
                                    {
                                        class: "ss-profile"
                                    },
                                    node("summary", {
                                        text: "Character requirements"
                                    }),
                                    node("p", {
                                        class: "ss-help",
                                        text: "Load any public character page from this wiki or enter abilities manually. This profile is private to this browser. Requirement matching uses documented rules and does not guarantee a roll or staff award."
                                    }),
                                    node(
                                        "div",
                                        {
                                            class: "ss-row"
                                        },
                                        field(
                                            "Public character page",
                                            publicName
                                        ),
                                        loadPublic
                                    ),
                                    publicStatus,
                                    field(
                                        "Owned Medals, Traits, and Skills",
                                        own
                                    ),
                                    attrs,
                                    node(
                                        "label",
                                        {
                                            class: "ss-checkbox"
                                        },
                                        remember,
                                        "Remember this profile in this browser"
                                    )
                                );
                                var share = button(
                                    "Copy filter link",
                                    function () {
                                        try {
                                            var _temp5 = _catch(
                                                function () {
                                                    return Promise.resolve(
                                                        navigator.clipboard.writeText(
                                                            filterURL()
                                                        )
                                                    ).then(function () {
                                                        message.textContent =
                                                            "Filter link copied. Your private profile is not included.";
                                                    });
                                                },
                                                function () {
                                                    var copy = node("input", {
                                                        readonly: true,
                                                        value: filterURL()
                                                    });
                                                    message.replaceChildren(
                                                        copy
                                                    );
                                                    copy.select();
                                                }
                                            );
                                            return Promise.resolve(
                                                _temp5 && _temp5.then
                                                    ? _temp5.then(
                                                          function () {}
                                                      )
                                                    : void 0
                                            );
                                        } catch (e) {
                                            return Promise.reject(e);
                                        }
                                    }
                                );
                                root.replaceChildren(
                                    node.apply(
                                        void 0,
                                        [
                                            "div",
                                            {
                                                class: "ss-toolbar"
                                            },
                                            field("Search", search)
                                        ].concat(
                                            _toConsumableArray(
                                                type === "medal"
                                                    ? [field("Rarity", rarity)]
                                                    : []
                                            ),
                                            [
                                                field("Sort", sort),
                                                field(
                                                    "Unlock requirement",
                                                    unlock
                                                ),
                                                field("Information", missing),
                                                field("View", view),
                                                field(
                                                    "Entries per page",
                                                    limit
                                                ),
                                                field("Eligibility", eligible)
                                            ]
                                        )
                                    ),
                                    tags,
                                    node.apply(
                                        void 0,
                                        [
                                            "div",
                                            {
                                                class: "ss-row"
                                            },
                                            button(
                                                "Clear filters",
                                                function () {
                                                    search.value = "";
                                                    rarity.value = "";
                                                    sort.value = "name";
                                                    unlock.value = "";
                                                    missing.value = "";
                                                    view.value = "list";
                                                    limit.value = "24";
                                                    eligible.value = "all";
                                                    hideOwned.checked = false;
                                                    chosenTags = [];
                                                    currentPage = 1;
                                                    renderTags();
                                                    render();
                                                }
                                            ),
                                            share
                                        ].concat(
                                            _toConsumableArray(
                                                type === "medal"
                                                    ? [
                                                          node(
                                                              "label",
                                                              {
                                                                  class: "ss-checkbox"
                                                              },
                                                              hideOwned,
                                                              "Hide owned Medals"
                                                          )
                                                      ]
                                                    : []
                                            )
                                        )
                                    ),
                                    profileBox,
                                    message,
                                    count,
                                    results,
                                    pager
                                );
                                function filterURL() {
                                    var url = new URL(location.href);
                                    _toConsumableArray(url.searchParams.keys())
                                        .filter(function (k) {
                                            return k.startsWith("ss");
                                        })
                                        .forEach(function (k) {
                                            return url.searchParams.delete(k);
                                        });
                                    var state = {
                                        ssq: search.value,
                                        ssrarity:
                                            type === "medal"
                                                ? rarity.value
                                                : "",
                                        sssort: sort.value,
                                        ssunlock: unlock.value,
                                        ssmissing: missing.value,
                                        ssview: view.value,
                                        sslimit: limit.value,
                                        sstags: chosenTags.join(","),
                                        sseligible: eligible.value,
                                        sshideowned: hideOwned.checked
                                            ? "1"
                                            : "",
                                        sspage: String(currentPage)
                                    };
                                    Object.entries(state).forEach(
                                        function (_ref8) {
                                            var _ref9 = _slicedToArray(
                                                    _ref8,
                                                    2
                                                ),
                                                k = _ref9[0],
                                                v = _ref9[1];
                                            if (v) url.searchParams.set(k, v);
                                        }
                                    );
                                    return url.href;
                                }
                                function renderTags() {
                                    var allTags = unique(
                                        entries.flatMap(function (e) {
                                            return e.tags;
                                        })
                                    ).sort();
                                    tags.replaceChildren.apply(
                                        tags,
                                        _toConsumableArray(
                                            allTags.map(function (tag) {
                                                var b = button(
                                                    tag,
                                                    function () {
                                                        chosenTags =
                                                            chosenTags.some(
                                                                function (t) {
                                                                    return (
                                                                        key(
                                                                            t
                                                                        ) ===
                                                                        key(tag)
                                                                    );
                                                                }
                                                            )
                                                                ? chosenTags.filter(
                                                                      function (
                                                                          t
                                                                      ) {
                                                                          return (
                                                                              key(
                                                                                  t
                                                                              ) !==
                                                                              key(
                                                                                  tag
                                                                              )
                                                                          );
                                                                      }
                                                                  )
                                                                : [].concat(
                                                                      _toConsumableArray(
                                                                          chosenTags
                                                                      ),
                                                                      [tag]
                                                                  );
                                                        currentPage = 1;
                                                        renderTags();
                                                        render();
                                                    }
                                                );
                                                var active = chosenTags.some(
                                                    function (t) {
                                                        return (
                                                            key(t) === key(tag)
                                                        );
                                                    }
                                                );
                                                b.classList.toggle(
                                                    "ss-active",
                                                    active
                                                );
                                                b.setAttribute(
                                                    "aria-pressed",
                                                    String(active)
                                                );
                                                return b;
                                            })
                                        )
                                    );
                                    chosenTags
                                        .filter(function (tag) {
                                            return !allTags.some(function (t) {
                                                return key(t) === key(tag);
                                            });
                                        })
                                        .forEach(function (tag) {
                                            return tags.append(
                                                button(
                                                    tag + " (remove filter)",
                                                    function () {
                                                        chosenTags =
                                                            chosenTags.filter(
                                                                function (t) {
                                                                    return (
                                                                        key(
                                                                            t
                                                                        ) !==
                                                                        key(tag)
                                                                    );
                                                                }
                                                            );
                                                        renderTags();
                                                        render();
                                                    }
                                                )
                                            );
                                        });
                                }
                                function hasMissing(entry, kind) {
                                    var artworkMissing =
                                        !trim(entry.image) ||
                                        /^Blank (?:Card|Medal Card)(?: Art)?\.png$/i.test(
                                            entry.image
                                        );
                                    var flags = {
                                        description:
                                            !trim(entry.description) ||
                                            entry.articleDescriptionMissing,
                                        art: artworkMissing,
                                        tags: !entry.tags.length,
                                        requirements:
                                            !entry.requirementsConfirmed,
                                        article: entry.articleMissing
                                    };
                                    return kind === "any"
                                        ? Object.values(flags).some(Boolean)
                                        : !!flags[kind];
                                }
                                function render() {
                                    profile.owned = unique(
                                        own.value.split("\n")
                                    );
                                    ATTRIBUTES.forEach(function (a) {
                                        profile.attributes[a] = Math.min(
                                            5,
                                            Math.max(
                                                1,
                                                Number(
                                                    attributeInputs[a].value
                                                ) || 1
                                            )
                                        );
                                    });
                                    var terms = key(search.value)
                                        .split(/\s+/)
                                        .filter(Boolean);
                                    var filtered = entries.filter(function (e) {
                                        return (
                                            terms.every(function (term) {
                                                return key(
                                                    e.name +
                                                        " " +
                                                        plain(e.description) +
                                                        " " +
                                                        e.tags.join(" ") +
                                                        " " +
                                                        plain(e.requirements) +
                                                        " " +
                                                        e.obtained
                                                ).includes(term);
                                            }) &&
                                            (!rarity.value ||
                                                e.rarity === rarity.value) &&
                                            (!chosenTags.length ||
                                                chosenTags.some(function (tag) {
                                                    return e.tags.some(
                                                        function (t) {
                                                            return (
                                                                key(t) ===
                                                                key(tag)
                                                            );
                                                        }
                                                    );
                                                })) &&
                                            (!unlock.value ||
                                                requirementNames(e).some(
                                                    function (n) {
                                                        return (
                                                            key(n) ===
                                                            key(unlock.value)
                                                        );
                                                    }
                                                )) &&
                                            (!missing.value ||
                                                hasMissing(e, missing.value)) &&
                                            (eligible.value === "all" ||
                                                eligibility(e, profile) ===
                                                    eligible.value) &&
                                            (!hideOwned.checked ||
                                                !profile.owned.some(
                                                    function (n) {
                                                        return (
                                                            key(n) ===
                                                            key(e.name)
                                                        );
                                                    }
                                                ))
                                        );
                                    });
                                    filtered.sort(function (a, b) {
                                        return (
                                            (sort.value === "rarity"
                                                ? RARITIES.indexOf(a.rarity) -
                                                  RARITIES.indexOf(b.rarity)
                                                : 0) ||
                                            (sort.value === "reverse"
                                                ? b.name.localeCompare(a.name)
                                                : a.name.localeCompare(b.name))
                                        );
                                    });
                                    var perPage = Number(limit.value) || 24;
                                    var pages = Math.max(
                                        1,
                                        Math.ceil(filtered.length / perPage)
                                    );
                                    currentPage = Math.min(currentPage, pages);
                                    var visible = filtered.slice(
                                        (currentPage - 1) * perPage,
                                        currentPage * perPage
                                    );
                                    count.textContent =
                                        filtered.length +
                                        " of " +
                                        entries.length +
                                        " " +
                                        TYPES[type].directory +
                                        " match";
                                    results.className =
                                        "ss-results" +
                                        (view.value === "cards"
                                            ? " ss-cards"
                                            : "");
                                    results.replaceChildren.apply(
                                        results,
                                        _toConsumableArray(
                                            visible.map(function (entry) {
                                                var article = node(
                                                    "article",
                                                    {
                                                        class: "ss-result"
                                                    },
                                                    node(
                                                        "h3",
                                                        {},
                                                        link(entry.name)
                                                    )
                                                );
                                                if (view.value === "cards") {
                                                    if (entry.image) {
                                                        var image = node(
                                                            "img",
                                                            {
                                                                class: "ss-art",
                                                                loading: "lazy",
                                                                src: mw.util.getUrl(
                                                                    "Special:FilePath/" +
                                                                        entry.image,
                                                                    {
                                                                        width: 240
                                                                    }
                                                                ),
                                                                alt:
                                                                    "Card art for " +
                                                                    entry.name
                                                            }
                                                        );
                                                        image.addEventListener(
                                                            "error",
                                                            function () {
                                                                return image.replaceWith(
                                                                    node(
                                                                        "div",
                                                                        {
                                                                            class: "ss-art-empty",
                                                                            text: "Artwork unavailable"
                                                                        }
                                                                    )
                                                                );
                                                            }
                                                        );
                                                        article.append(image);
                                                    } else
                                                        article.append(
                                                            node("div", {
                                                                class: "ss-art-empty",
                                                                text: "Artwork not added"
                                                            })
                                                        );
                                                }
                                                if (type === "medal")
                                                    article.append(
                                                        node("span", {
                                                            class: "ss-rarity",
                                                            "data-rarity":
                                                                entry.rarity,
                                                            text: entry.rarity
                                                        })
                                                    );
                                                article.append(
                                                    node("p", {
                                                        text:
                                                            plain(
                                                                entry.description
                                                            ) ||
                                                            "Description not added."
                                                    })
                                                );
                                                if (
                                                    type === "medal" &&
                                                    trim(entry.requirements) &&
                                                    key(entry.requirements) !==
                                                        "none"
                                                )
                                                    article.append(
                                                        node("p", {
                                                            class: "ss-help",
                                                            text:
                                                                "Requirements: " +
                                                                plain(
                                                                    entry.requirements
                                                                )
                                                        })
                                                    );
                                                if (
                                                    type !== "medal" &&
                                                    entry.obtained
                                                )
                                                    article.append(
                                                        node("p", {
                                                            class: "ss-help",
                                                            text:
                                                                "Obtained from: " +
                                                                plain(
                                                                    entry.obtained
                                                                )
                                                        })
                                                    );
                                                if (
                                                    type === "trait" ||
                                                    type === "skill"
                                                )
                                                    article.append(
                                                        node("a", {
                                                            href: mw.util.getUrl(
                                                                "Medals",
                                                                {
                                                                    ssunlock:
                                                                        entry.name
                                                                }
                                                            ),
                                                            text:
                                                                "View Medals linked to this " +
                                                                TYPES[type]
                                                                    .title
                                                        })
                                                    );
                                                article.append(
                                                    node.apply(
                                                        void 0,
                                                        [
                                                            "div",
                                                            {
                                                                class: "ss-tags"
                                                            }
                                                        ].concat(
                                                            _toConsumableArray(
                                                                entry.tags.map(
                                                                    function (
                                                                        tag
                                                                    ) {
                                                                        return node(
                                                                            "span",
                                                                            {
                                                                                class: "ss-tag",
                                                                                text: tag
                                                                            }
                                                                        );
                                                                    }
                                                                )
                                                            )
                                                        )
                                                    )
                                                );
                                                if (eligible.value !== "all")
                                                    article.append(
                                                        node("p", {
                                                            class: "ss-help",
                                                            text:
                                                                "Requirements " +
                                                                eligibility(
                                                                    entry,
                                                                    profile
                                                                )
                                                        })
                                                    );
                                                return article;
                                            })
                                        )
                                    );
                                    if (!visible.length)
                                        results.append(
                                            node("p", {
                                                text: "No entries match these filters."
                                            })
                                        );
                                    var previous = button(
                                        "Previous",
                                        function () {
                                            currentPage -= 1;
                                            render();
                                        }
                                    );
                                    previous.disabled = currentPage <= 1;
                                    var next = button("Next", function () {
                                        currentPage += 1;
                                        render();
                                    });
                                    next.disabled = currentPage >= pages;
                                    pager.replaceChildren(
                                        previous,
                                        node("span", {
                                            text:
                                                "Page " +
                                                currentPage +
                                                " of " +
                                                pages
                                        }),
                                        next
                                    );
                                    try {
                                        history.replaceState(
                                            null,
                                            "",
                                            filterURL()
                                        );
                                    } catch (error) {
                                        /* Filters still work without History access. */
                                    }
                                }
                                function profileChanged() {
                                    try {
                                        if (remember.checked) {
                                            profile.owned = unique(
                                                own.value.split("\n")
                                            );
                                            ATTRIBUTES.forEach(function (a) {
                                                return (profile.attributes[a] =
                                                    Math.min(
                                                        5,
                                                        Math.max(
                                                            1,
                                                            Number(
                                                                attributeInputs[
                                                                    a
                                                                ].value
                                                            ) || 1
                                                        )
                                                    ));
                                            });
                                            localStorage.setItem(
                                                "seashell.profile.v2",
                                                JSON.stringify(profile)
                                            );
                                        } else
                                            localStorage.removeItem(
                                                "seashell.profile.v2"
                                            );
                                    } catch (error) {
                                        message.textContent =
                                            "Browser storage is unavailable. This profile works until you leave the page.";
                                    }
                                    currentPage = 1;
                                    render();
                                }
                                var fallback = document.querySelector(
                                    '.ss-directory-fallback[data-kind="' +
                                        type +
                                        '"]'
                                );
                                [own, remember]
                                    .concat(
                                        _toConsumableArray(
                                            Object.values(attributeInputs)
                                        )
                                    )
                                    .forEach(function (control) {
                                        return control.addEventListener(
                                            "input",
                                            profileChanged
                                        );
                                    });
                                search.addEventListener("input", function () {
                                    currentPage = 1;
                                    render();
                                });
                                [
                                    rarity,
                                    sort,
                                    unlock,
                                    missing,
                                    view,
                                    limit,
                                    eligible,
                                    hideOwned
                                ].forEach(function (control) {
                                    return control.addEventListener(
                                        "change",
                                        function () {
                                            currentPage = 1;
                                            render();
                                        }
                                    );
                                });
                                renderTags();
                                render();
                                if (fallback) fallback.hidden = true;
                                message.textContent =
                                    "Loading artwork and article information...";
                                var _temp4 = _catch(
                                    function () {
                                        return Promise.resolve(
                                            hydrate(entries)
                                        ).then(function (_hydrate) {
                                            entries = _hydrate;
                                            var selectedUnlock = unlock.value;
                                            var availableUnlocks = unique(
                                                entries.flatMap(
                                                    requirementNames
                                                )
                                            ).sort();
                                            unlock.replaceChildren.apply(
                                                unlock,
                                                [
                                                    node("option", {
                                                        value: "",
                                                        text: "All unlock requirements"
                                                    })
                                                ].concat(
                                                    _toConsumableArray(
                                                        availableUnlocks.map(
                                                            function (name) {
                                                                return node(
                                                                    "option",
                                                                    {
                                                                        value: name,
                                                                        text: name
                                                                    }
                                                                );
                                                            }
                                                        )
                                                    )
                                                )
                                            );
                                            if (
                                                availableUnlocks.includes(
                                                    selectedUnlock
                                                )
                                            )
                                                unlock.value = selectedUnlock;
                                            renderTags();
                                            render();
                                            message.textContent = "";
                                        });
                                    },
                                    function (error) {
                                        message.textContent =
                                            "Article information could not be loaded. Artwork and missing information results may be incomplete. " +
                                            error.message;
                                    }
                                );
                                if (_temp4 && _temp4.then)
                                    return _temp4.then(function () {});
                            });
                        },
                        function (error) {
                            delete root.dataset.ready;
                            root.replaceChildren(
                                node("p", {
                                    class: "ss-error",
                                    text:
                                        error.message +
                                        " The table below remains available."
                                })
                            );
                        }
                    )
                );
            } catch (e) {
                return Promise.reject(e);
            }
        };
        var hydrate = function hydrate(entries) {
            try {
                var results = [];
                var _start = 0;
                var _temp3 = _for(
                    function () {
                        return _start < entries.length;
                    },
                    function () {
                        return !!(_start += 40);
                    },
                    function () {
                        var batch = entries.slice(_start, _start + 40);
                        return Promise.resolve(
                            request({
                                action: "query",
                                prop: "info|revisions",
                                titles: batch
                                    .map(function (e) {
                                        return e.name;
                                    })
                                    .join("|"),
                                rvprop: "content|ids|timestamp",
                                rvslots: "main"
                            })
                        ).then(function (response) {
                            var pages = new Map(
                                response.query.pages.map(function (p) {
                                    return [key(p.title), p];
                                })
                            );
                            batch.forEach(function (entry) {
                                var page = pages.get(key(entry.name));
                                var copy = _objectSpread({}, entry);
                                if (
                                    page &&
                                    !Object.prototype.hasOwnProperty.call(
                                        page,
                                        "missing"
                                    )
                                ) {
                                    var _fields$requirements;
                                    var content = pageFrom(page).text;
                                    var fields = template(
                                        content,
                                        TYPES[entry.type].template
                                    ).fields;
                                    var metadata = meta(content);
                                    copy.image =
                                        fields.image || copy.image || "";
                                    if (fields.tags !== undefined)
                                        copy.tags = splitTags(fields.tags);
                                    else if (metadata.tags)
                                        copy.tags = metadata.tags;
                                    if (metadata.rules)
                                        copy.rules = metadata.rules;
                                    if (
                                        metadata.requirementsConfirmed !==
                                        undefined
                                    )
                                        copy.requirementsConfirmed =
                                            metadata.requirementsConfirmed;
                                    // Directory descriptions remain authoritative until an editor saves the entry.
                                    copy.requirements =
                                        (_fields$requirements =
                                            fields.requirements) !== null &&
                                        _fields$requirements !== void 0
                                            ? _fields$requirements
                                            : copy.requirements;
                                    copy.articleDescriptionMissing = !trim(
                                        fields.description
                                    );
                                    copy.articleMissing = false;
                                } else copy.articleMissing = true;
                                results.push(copy);
                            });
                        });
                    }
                );
                return Promise.resolve(
                    _temp3 && _temp3.then
                        ? _temp3.then(function () {
                              return results;
                          })
                        : results
                );
            } catch (e) {
                return Promise.reject(e);
            }
        };
        var categoryNames = function categoryNames(type) {
            try {
                function _temp2() {
                    return unique(names).sort(function (a, b) {
                        return a.localeCompare(b);
                    });
                }
                var names = [];
                var continuation;
                var _temp = _do(
                    function () {
                        return Promise.resolve(
                            request(
                                _objectSpread(
                                    {
                                        action: "query",
                                        list: "categorymembers",
                                        cmtitle:
                                            "Category:" + TYPES[type].directory,
                                        cmnamespace: 0,
                                        cmlimit: "max"
                                    },
                                    continuation || {}
                                )
                            )
                        ).then(function (result) {
                            names.push.apply(
                                names,
                                _toConsumableArray(
                                    result.query.categorymembers.map(
                                        function (page) {
                                            return page.title;
                                        }
                                    )
                                )
                            );
                            continuation = result.continue;
                        });
                    },
                    function () {
                        return !!continuation;
                    }
                );
                return Promise.resolve(
                    _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp)
                );
            } catch (e) {
                return Promise.reject(e);
            }
        };
        var saveRegistry = function saveRegistry(next) {
            return Promise.resolve(readPage(TAG_PAGE)).then(function (page) {
                return Promise.resolve(
                    writePage(
                        TAG_PAGE,
                        "<pre>\n" +
                            JSON.stringify(next, null, 2) +
                            "\n</pre>\n",
                        "Updated content tags through Content Manager",
                        page,
                        page.missing
                    )
                ).then(function () {
                    registry = next;
                });
            });
        };
        var loadRegistry = function loadRegistry() {
            return Promise.resolve(readPage(TAG_PAGE)).then(function (page) {
                if (page.missing) {
                    registry = clone(DEFAULT_TAGS);
                    return;
                }
                var text = page.text
                    .replace(/^\s*<pre>\s*/, "")
                    .replace(/\s*<\/pre>\s*$/, "");
                var parsed = JSON.parse(text);
                CARD_TYPES.forEach(function (type) {
                    if (!Array.isArray(parsed[type]))
                        throw new Error(
                            "Content Tags is not a valid tag registry."
                        );
                });
                registry = Object.fromEntries(
                    CARD_TYPES.map(function (type) {
                        return [type, splitTags(parsed[type].join(","))];
                    })
                );
            });
        };
        var writePage = function writePage(title, text, summary, page, create) {
            try {
                var params = {
                    action: "edit",
                    title: title,
                    text: text,
                    summary: summary,
                    watchlist: "nochange"
                };
                if (
                    create ||
                    (page !== null && page !== void 0 && page.missing)
                )
                    params.createonly = 1;
                else {
                    params.nocreate = 1;
                    if (page !== null && page !== void 0 && page.id)
                        params.baserevid = page.id;
                    if (page !== null && page !== void 0 && page.timestamp)
                        params.basetimestamp = page.timestamp;
                    if (page !== null && page !== void 0 && page.start)
                        params.starttimestamp = page.start;
                }
                return Promise.resolve(request(params, true));
            } catch (e) {
                return Promise.reject(e);
            }
        };
        var readPage = function readPage(title, followRedirects) {
            try {
                return Promise.resolve(
                    request(
                        _objectSpread(
                            {
                                action: "query",
                                prop: "info|revisions",
                                titles: title,
                                rvprop: "ids|content|timestamp",
                                rvslots: "main",
                                curtimestamp: 1
                            },
                            followRedirects
                                ? {
                                      redirects: 1
                                  }
                                : {}
                        )
                    )
                ).then(function (response) {
                    if (
                        !response.query ||
                        !Array.isArray(response.query.pages) ||
                        !response.query.pages.length
                    )
                        throw new Error(
                            "The wiki did not return page information for " +
                                title +
                                "."
                        );
                    return pageFrom(
                        response.query.pages[0],
                        response.curtimestamp
                    );
                });
            } catch (e) {
                return Promise.reject(e);
            }
        };
        if (
            ((_window$SeashellCards = window.SeashellCardsV2) === null ||
            _window$SeashellCards === void 0
                ? void 0
                : _window$SeashellCards.version) === "2.0.3"
        ) {
            if (typeof window.SeashellCardsV2.refresh === "function")
                window.SeashellCardsV2.refresh();
            return;
        }
        var state = {
            status: "waiting",
            version: "2.0.3",
            attempts: 0
        };
        window.SeashellCardsV2 = state;
        window.SeashellSubmissionStatus = "waiting";
        var TYPES = {
            medal: {
                title: "Medal",
                directory: "Medals",
                template: "Medal",
                rarity: true,
                obtained: "Medal Roll"
            },
            trait: {
                title: "Trait",
                directory: "Traits",
                template: "Trait",
                obtained: ""
            },
            skill: {
                title: "Skill",
                directory: "Skills",
                template: "Skill",
                obtained: "Staff"
            },
            item: {
                title: "Item",
                directory: "Items",
                template: "Item"
            },
            location: {
                title: "Location",
                directory: "Locations",
                template: "Location"
            },
            character: {
                title: "Character",
                directory: "Characters",
                template: "Character"
            }
        };
        var CARD_TYPES = ["medal", "trait", "skill"];
        var RARITIES = ["Mythic", "Legendary", "Epic", "Uncommon", "Common"];
        var ATTRIBUTES = [
            "Strength",
            "Fortitude",
            "Agility",
            "Dexterity",
            "Precision"
        ];
        var TAG_PAGE = "Seashell Wiki:Content Tags";
        var DEFAULT_TAGS = {
            medal: [
                "Health",
                "Visual",
                "Notification",
                "Speed",
                "Damage",
                "Gun",
                "LMG",
                "Melee",
                "Swimming",
                "Skydiving"
            ],
            trait: ["Lore Trait", "Awakened"],
            skill: []
        };
        var trim = function trim(value) {
            return String(value == null ? "" : value).trim();
        };
        var key = function key(value) {
            return trim(value)
                .replace(/_/g, " ")
                .replace(/\s+/g, " ")
                .toLowerCase();
        };
        var esc = function esc(value) {
            return String(value == null ? "" : value).replace(
                /[&<>"']/g,
                function (c) {
                    return {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;"
                    }[c];
                }
            );
        };
        var reEsc = function reEsc(value) {
            return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        };
        var clone = function clone(value) {
            return JSON.parse(JSON.stringify(value));
        };
        var unique = function unique(values) {
            return _toConsumableArray(
                new Map(
                    values.map(function (v) {
                        return [key(v), trim(v)];
                    })
                ).values()
            ).filter(Boolean);
        };
        var splitTags = function splitTags(value) {
            return unique(trim(value).split(/[,\n]/).map(trim));
        };
        var plain = function plain(value) {
            return trim(value)
                .replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, "$2")
                .replace(/\[\[([^\]]+)\]\]/g, "$1")
                .replace(/'{2,5}/g, "")
                .replace(/<[^>]+>/g, "")
                .replace(/\{\{!\}\}/g, "|");
        };
        var cardType = function cardType(type) {
            return CARD_TYPES.includes(type);
        };
        var metaLine = function metaLine(data) {
            return (
                "<!-- SS_META " +
                encodeURIComponent(JSON.stringify(data)) +
                " -->"
            );
        };
        function meta(text) {
            var found = String(text).match(/<!-- SS_META ([^\s]+) -->/);
            if (!found) return {};
            try {
                var parsed = JSON.parse(decodeURIComponent(found[1]));
                if (
                    !parsed ||
                    _typeof(parsed) !== "object" ||
                    Array.isArray(parsed)
                )
                    return {};
                if (parsed.tags !== undefined)
                    parsed.tags = splitTags(
                        Array.isArray(parsed.tags)
                            ? parsed.tags.join(",")
                            : parsed.tags
                    );
                if (parsed.rules !== undefined && !rulesValid(parsed.rules))
                    parsed.rules = [];
                return parsed;
            } catch (error) {
                return {};
            }
        }
        function replaceMeta(text, data) {
            var line = metaLine(data);
            return /<!-- SS_META [^\s]+ -->/.test(text)
                ? text.replace(/<!-- SS_META [^\s]+ -->/, function () {
                      return line;
                  })
                : text.trimEnd() + "\n" + line + "\n";
        }
        // Split only outside nested templates and links so wiki formatting remains intact.
        function splitWiki(text, separator) {
            var result = [];
            var start = 0;
            var braces = 0;
            var links = 0;
            for (var i = 0; i < text.length; i += 1) {
                var pair = text.slice(i, i + 2);
                if (pair === "{{") {
                    braces += 1;
                    i += 1;
                } else if (pair === "}}") {
                    braces = Math.max(0, braces - 1);
                    i += 1;
                } else if (pair === "[[") {
                    links += 1;
                    i += 1;
                } else if (pair === "]]") {
                    links = Math.max(0, links - 1);
                    i += 1;
                } else if (!braces && !links && text[i] === separator) {
                    result.push(text.slice(start, i));
                    start = i + 1;
                }
            }
            result.push(text.slice(start));
            return result;
        }
        function template(text, name) {
            var match = new RegExp(
                "\\{\\{\\s*(?:Template:)?" + reEsc(name) + "\\s*(?=[|}\\n])",
                "i"
            ).exec(text);
            if (!match)
                return {
                    found: false,
                    start: 0,
                    end: 0,
                    fields: {}
                };
            var depth = 1;
            var end = match.index + match[0].length;
            for (; end < text.length; end += 1) {
                if (text.slice(end, end + 2) === "{{") {
                    depth += 1;
                    end += 1;
                } else if (text.slice(end, end + 2) === "}}") {
                    depth -= 1;
                    end += 1;
                    if (!depth) {
                        end += 1;
                        break;
                    }
                }
            }
            if (depth)
                throw new Error(
                    "The article template has unbalanced braces. Fix its source before using the manager."
                );
            var fields = {};
            splitWiki(text.slice(match.index + 2, end - 2), "|")
                .slice(1)
                .forEach(function (part) {
                    var equals = part.indexOf("=");
                    if (equals >= 0)
                        fields[trim(part.slice(0, equals)).toLowerCase()] =
                            trim(part.slice(equals + 1)).replace(
                                /\{\{!\}\}/g,
                                "|"
                            );
                });
            return {
                found: true,
                start: match.index,
                end: end,
                fields: fields
            };
        }
        function encodeValue(value) {
            // Preserve pipes inside wiki links and templates, escape only unprotected pipes.
            return splitWiki(trim(value), "|").join("{{!}}");
        }
        function templateText(name, fields) {
            return (
                "{{" +
                name +
                "\n" +
                Object.entries(fields)
                    .map(function (_ref) {
                        var _ref2 = _slicedToArray(_ref, 2),
                            field = _ref2[0],
                            value = _ref2[1];
                        return "|" + field + " = " + encodeValue(value);
                    })
                    .join("\n") +
                "\n}}"
            );
        }
        function sectionsOf(text) {
            var headers = _toConsumableArray(
                text.matchAll(/^==[ \t]*([^=\n]+?)[ \t]*==[ \t]*$/gm)
            );
            return headers.map(function (h, i) {
                return {
                    title: trim(h[1]),
                    content: trim(
                        text.slice(
                            h.index + h[0].length,
                            i + 1 < headers.length
                                ? headers[i + 1].index
                                : text.length
                        )
                    )
                };
            });
        }
        function cleanTail(text) {
            return text
                .replace(/<!-- SS_META [^\s]+ -->/g, "")
                .replace(/\[\[Category:[^\]]+\]\]/gi, "")
                .replace(/__(?:NOTOC|NOEDITSECTION)__/gi, "")
                .trim();
        }
        function titleValid(title) {
            return (
                !!trim(title) &&
                title.length <= 180 &&
                !/[#<>\[\]{}|:\n\r]/.test(title)
            );
        }
        function rulesValid(rules) {
            return (
                Array.isArray(rules) &&
                rules.every(function (group) {
                    return (
                        Array.isArray(group) &&
                        group.length &&
                        group.every(function (r) {
                            return (
                                [
                                    "medal",
                                    "trait",
                                    "skill",
                                    "attribute",
                                    "other"
                                ].includes(r.kind) &&
                                trim(r.name) &&
                                (r.kind !== "attribute" ||
                                    (ATTRIBUTES.includes(r.name) &&
                                        Number.isInteger(Number(r.min)) &&
                                        Number(r.min) >= 1 &&
                                        Number(r.min) <= 5))
                            );
                        })
                    );
                })
            );
        }
        function requirementNames(entry) {
            var names = [];
            (entry.rules || []).forEach(function (group) {
                return group.forEach(function (r) {
                    if (["medal", "trait", "skill"].includes(r.kind))
                        names.push(r.name);
                });
            });
            var _iterator = _createForOfIteratorHelper(
                    String(entry.requirements || "").matchAll(
                        /\[\[([^|\]]+)(?:\|[^\]]+)?\]\]/g
                    )
                ),
                _step;
            try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var match = _step.value;
                    names.push(match[1]);
                }
            } catch (err) {
                _iterator.e(err);
            } finally {
                _iterator.f();
            }
            return unique(names);
        }
        function eligibility(entry, profile) {
            if (!entry.requirementsConfirmed) return "unknown";
            var owned = (profile.owned || []).map(key);
            var ruleResult = function ruleResult(rule) {
                if (["medal", "trait", "skill"].includes(rule.kind))
                    return owned.includes(key(rule.name)) ? "met" : "unmet";
                if (rule.kind === "attribute")
                    return Number(profile.attributes[rule.name] || 1) >=
                        Number(rule.min)
                        ? "met"
                        : "unmet";
                return "unknown";
            };
            var groups = (entry.rules || []).map(function (group) {
                var results = group.map(ruleResult);
                return results.includes("met")
                    ? "met"
                    : results.includes("unknown")
                      ? "unknown"
                      : "unmet";
            });
            return groups.includes("unmet")
                ? "unmet"
                : groups.includes("unknown")
                  ? "unknown"
                  : "met";
        }
        function publicCharacterTitle(input) {
            var title = trim(input);
            if (/^https?:\/\//i.test(title)) {
                var url = new URL(title);
                if (url.origin !== location.origin)
                    throw new Error(
                        "Use a public character page on this wiki."
                    );
                if (url.pathname.startsWith("/wiki/"))
                    title = decodeURIComponent(url.pathname.slice(6));
                else title = url.searchParams.get("title") || "";
            }
            title = title
                .replace(/_/g, " ")
                .replace(/^\[\[([^|\]]+)(?:\|[^\]]+)?\]\]$/, "$1");
            if (
                !title ||
                title.length > 255 ||
                /[#<>\[\]{}|\n\r]/.test(title) ||
                /^(?:Special|Media|File|Category|Template|MediaWiki):/i.test(
                    title
                )
            )
                throw new Error(
                    "Enter a character page name or its public wiki link."
                );
            return title;
        }
        function characterProfile(text) {
            var fields = template(text, "Character").fields;
            var sections = sectionsOf(text);
            var names = [];
            function listedNames(value) {
                var links = _toConsumableArray(
                    String(value).matchAll(/\[\[([^|\]]+)(?:\|[^\]]+)?\]\]/g)
                ).map(function (match) {
                    return trim(match[1]);
                });
                // Linked lists may also contain plain names on separate lines.
                var simple = String(value)
                    .split("\n")
                    .filter(function (line) {
                        return !line.includes("[[");
                    })
                    .flatMap(function (line) {
                        return line.split(",");
                    })
                    .map(function (line) {
                        return trim(
                            line
                                .replace(/^[*#;:\s]+/, "")
                                .replace(/'{2,5}/g, "")
                        );
                    })
                    .filter(function (line) {
                        return (
                            line &&
                            !/[{}<>|=\[\]]/.test(line) &&
                            !/^(?:none|unknown|not added|n\/a)$/i.test(line)
                        );
                    });
                return []
                    .concat(
                        _toConsumableArray(links),
                        _toConsumableArray(simple)
                    )
                    .filter(function (name) {
                        return !/^(?:File|Category|Template):/i.test(name);
                    });
            }
            var listsFound = false;
            ["medals", "traits", "skills"].forEach(function (kind) {
                if (fields[kind] !== undefined) {
                    listsFound = true;
                    names.push.apply(
                        names,
                        _toConsumableArray(listedNames(fields[kind]))
                    );
                }
                sections
                    .filter(function (section) {
                        return (
                            key(section.title) === kind ||
                            key(section.title) === "owned " + kind
                        );
                    })
                    .forEach(function (section) {
                        listsFound = true;
                        names.push.apply(
                            names,
                            _toConsumableArray(
                                listedNames(cleanTail(section.content))
                            )
                        );
                    });
            });
            var attributes = {};
            ATTRIBUTES.forEach(function (name) {
                var value = trim(fields[name.toLowerCase()]);
                if (/^[1-5]$/.test(value)) attributes[name] = Number(value);
            });
            if (!listsFound && !Object.keys(attributes).length)
                throw new Error(
                    "This page has no documented Medals, Traits, Skills, or attributes to load. Add them to its Character template or named list sections first."
                );
            return {
                owned: unique(names),
                attributes: attributes,
                listsFound: listsFound
            };
        }
        function directoryRecords(source, type) {
            var records = [];
            var lines = source.split("\n");
            var rarity = "";
            var row = [];
            function flush() {
                if (!row.length) return;
                var text = row.join("\n");
                row = [];
                var name = text.match(
                    /^\|[ \t]*'''\[\[([^|\]]+)(?:\|[^\]]+)?\]\]'''[ \t]*$/m
                );
                if (!name) return;
                var cells = [];
                var current = null;
                var _iterator2 = _createForOfIteratorHelper(text.split("\n")),
                    _step2;
                try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        var line = _step2.value;
                        if (/^<!--.*-->[ \t]*$/.test(line)) continue;
                        if (/^\|[^-}]/.test(line) || line === "|") {
                            if (current !== null) cells.push(trim(current));
                            current = line.slice(1).trimStart();
                        } else if (current !== null) current += "\n" + line;
                    }
                } catch (err) {
                    _iterator2.e(err);
                } finally {
                    _iterator2.f();
                }
                if (current !== null) cells.push(trim(current));
                var data = meta(text);
                records.push(
                    _objectSpread(
                        _objectSpread({}, data),
                        {},
                        {
                            name: trim(name[1]),
                            type: type,
                            rarity: type === "medal" ? rarity : "",
                            requirements:
                                type === "medal"
                                    ? cells[1] || ""
                                    : data.requirements || "",
                            description: cells[type === "medal" ? 2 : 1] || "",
                            obtained:
                                type !== "medal"
                                    ? cells[2] || ""
                                    : data.obtained || "",
                            tags: splitTags(
                                Array.isArray(data.tags)
                                    ? data.tags.join(",")
                                    : data.tags || ""
                            ),
                            rules: rulesValid(data.rules) ? data.rules : [],
                            requirementsConfirmed:
                                data.requirementsConfirmed === true
                        }
                    )
                );
            }
            var _iterator3 = _createForOfIteratorHelper(lines),
                _step3;
            try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    var line = _step3.value;
                    var heading = line.match(
                        /class="ss-box-title"[^>]*>(Mythic|Legendary|Epic|Uncommon|Common) Medals</
                    );
                    if (heading) {
                        flush();
                        rarity = heading[1];
                    }
                    if (/^\|-\s*$/.test(line)) {
                        flush();
                        row = [];
                    } else if (
                        /^\|}\s*$/.test(line) ||
                        /^<!-- .*_END -->\s*$/.test(line)
                    )
                        flush();
                    else row.push(line);
                }
            } catch (err) {
                _iterator3.e(err);
            } finally {
                _iterator3.f();
            }
            flush();
            return records;
        }
        function removeDirectoryRow(text, name) {
            var lines = text.split("\n");
            var match = new RegExp(
                "^\\|[ \\t]*'''\\[\\[" +
                    reEsc(name) +
                    "(?:\\|[^\\]]+)?\\]\\]'''[ \\t]*$",
                "i"
            );
            for (;;) {
                var index = lines.findIndex(function (line) {
                    return match.test(line);
                });
                if (index < 0) break;
                var start = index;
                while (start >= 0 && !/^\|-\s*$/.test(lines[start])) start -= 1;
                if (start < 0)
                    throw new Error(
                        "The directory row has no row separator. Fix the table source first."
                    );
                var end = index + 1;
                while (
                    end < lines.length &&
                    !/^\|-\s*$|^\|}\s*$|^<!-- .*_END -->\s*$/.test(lines[end])
                )
                    end += 1;
                lines.splice(start, end - start);
            }
            return lines.join("\n");
        }
        function marker(data) {
            if (data.type === "medal")
                return (
                    "<!-- MEDAL_ROWS_" + data.rarity.toUpperCase() + "_END -->"
                );
            if (data.type === "trait" || data.type === "skill")
                return "<!-- " + data.type.toUpperCase() + "_ROWS_END -->";
            if (data.type === "item")
                return (
                    "<!-- ITEM_ROWS_" +
                    (data.itemCategory === "Weapon"
                        ? "WEAPON_" + data.weaponType.toUpperCase()
                        : data.itemCategory
                              .toUpperCase()
                              .replace(/\s+/g, "_")) +
                    "_END -->"
                );
            if (data.type === "location")
                return (
                    "<!-- LOCATION_ROWS_" +
                    data.locationType.toUpperCase().replace(/\s+/g, "_") +
                    "_END -->"
                );
            return "<!-- CHARACTER_ROWS_END -->";
        }
        function rowText(data) {
            var cells = ["'''[[" + data.name + "]]'''"];
            if (data.type === "medal") cells.push(data.requirements || "");
            if (data.type === "location" && data.locationType !== "Country") {
                var parent = data.parent || data.region || data.country;
                cells.push(parent ? "[[" + parent + "]]" : "");
            }
            cells.push(data.description || "");
            if (data.type === "trait" || data.type === "skill")
                cells.push(data.obtained || "");
            return (
                "|-\n" +
                cells
                    .map(function (cell) {
                        return (
                            "| " +
                            cell.replace(/^([|!])/gm, "<nowiki>$1</nowiki>")
                        );
                    })
                    .join("\n") +
                "\n" +
                (cardType(data.type)
                    ? metaLine(entryMetadata(data)) + "\n"
                    : "")
            );
        }
        function entryMetadata(data) {
            return {
                tags: data.tags || [],
                image: data.image || "",
                requirements: data.requirements || "",
                rules: data.rules || [],
                requirementsConfirmed: data.requirementsConfirmed === true
            };
        }
        function updateDirectory(source, data) {
            var mark = marker(data);
            if (!source.includes(mark))
                throw new Error(
                    "The directory needs this insertion marker: " +
                        mark +
                        ". No directory changes were made."
                );
            var clean = removeDirectoryRow(source, data.name);
            return clean.replace(mark, function () {
                return rowText(data) + mark;
            });
        }
        function youtubeId(value) {
            try {
                var url = new URL(value);
                if (["youtu.be", "www.youtu.be"].includes(url.hostname))
                    return /^[\w-]{11}$/.test(url.pathname.slice(1))
                        ? url.pathname.slice(1)
                        : "";
                if (
                    [
                        "youtube.com",
                        "www.youtube.com",
                        "m.youtube.com"
                    ].includes(url.hostname)
                ) {
                    var _url$pathname$match;
                    var id =
                        url.searchParams.get("v") ||
                        ((_url$pathname$match = url.pathname.match(
                            /^\/(?:shorts|embed)\/([\w-]{11})/
                        )) === null || _url$pathname$match === void 0
                            ? void 0
                            : _url$pathname$match[1]);
                    return /^[\w-]{11}$/.test(id || "") ? id : "";
                }
            } catch (error) {
                /* A filename is also allowed. */
            }
            return "";
        }
        function demoText(source, caption) {
            if (!trim(source)) return "";
            var id = youtubeId(source);
            if (id)
                return (
                    "{{#ev:youtube|" +
                    id +
                    "|640|center|" +
                    encodeValue(caption || "Demonstration.") +
                    "}}"
                );
            if (/^https?:\/\//i.test(source))
                return "[" + source + " View demonstration]";
            return (
                "[[File:" +
                source.replace(/^File:/i, "") +
                "|640px|center|" +
                encodeValue(caption || "Demonstration.") +
                "]]"
            );
        }
        function parseDemo(source) {
            var youtube = source.match(
                /\{\{#ev:youtube\|([\w-]{11})\|[^|}]*\|center\|([\s\S]*?)\}\}/i
            );
            if (youtube)
                return {
                    demo: "https://www.youtube.com/watch?v=" + youtube[1],
                    demoCaption: youtube[2].replace(/\{\{!\}\}/g, "|")
                };
            var file = source.match(/\[\[File:([^|\]]+)\|([^\]]*)\]\]/i);
            if (file)
                return {
                    demo: file[1],
                    demoCaption: file[2]
                        .split("|")
                        .filter(function (part) {
                            return !/^(?:\d+px|center|thumb|frame)$/.test(part);
                        })
                        .join("|")
                };
            var link = source.match(/\[(https?:\/\/[^\s\]]+)\s[^\]]*\]/i);
            return {
                demo: link ? link[1] : "",
                demoCaption: ""
            };
        }
        var api;
        var userIsAdmin = false;
        var registry = clone(DEFAULT_TAGS);
        function request(params, write) {
            return new Promise(function (resolve, reject) {
                var call = write
                    ? api.postWithToken(
                          "csrf",
                          _objectSpread(
                              _objectSpread({}, params),
                              {},
                              {
                                  formatversion: 2
                              }
                          )
                      )
                    : api.get(
                          _objectSpread(
                              _objectSpread({}, params),
                              {},
                              {
                                  formatversion: 2
                              }
                          ),
                          {
                              timeout: 20000
                          }
                      );
                call.then(
                    function (result) {
                        var _result$edit, _result$error, _result$edit2;
                        if (!result || _typeof(result) !== "object") {
                            reject(
                                new Error(
                                    "The wiki returned an empty response. Refresh and try again."
                                )
                            );
                            return;
                        }
                        if (
                            result.error ||
                            (params.action === "edit" &&
                                ((_result$edit = result.edit) === null ||
                                _result$edit === void 0
                                    ? void 0
                                    : _result$edit.result) !== "Success")
                        )
                            reject(
                                new Error(
                                    ((_result$error = result.error) === null ||
                                    _result$error === void 0
                                        ? void 0
                                        : _result$error.info) ||
                                        ((_result$edit2 = result.edit) ===
                                            null || _result$edit2 === void 0
                                            ? void 0
                                            : _result$edit2.info) ||
                                        "The wiki did not accept this edit. Open Edit source to resolve a CAPTCHA or permission restriction."
                                )
                            );
                        else resolve(result);
                    },
                    function (code, details) {
                        var _details$error;
                        return reject(
                            new Error(
                                (details === null ||
                                details === void 0 ||
                                (_details$error = details.error) === null ||
                                _details$error === void 0
                                    ? void 0
                                    : _details$error.info) ||
                                    (details === null || details === void 0
                                        ? void 0
                                        : details.info) ||
                                    String(code || "The request failed.")
                            )
                        );
                    }
                );
            });
        }
        function pageFrom(page, timestamp) {
            var _page$revisions, _rev$slots, _ref3, _ref4, _ref5, _slot$content;
            var rev =
                (_page$revisions = page.revisions) === null ||
                _page$revisions === void 0
                    ? void 0
                    : _page$revisions[0];
            var slot =
                rev === null ||
                rev === void 0 ||
                (_rev$slots = rev.slots) === null ||
                _rev$slots === void 0
                    ? void 0
                    : _rev$slots.main;
            return {
                title: page.title,
                missing: Object.hasOwn
                    ? Object.hasOwn(page, "missing")
                    : Object.prototype.hasOwnProperty.call(page, "missing"),
                text:
                    (_ref3 =
                        (_ref4 =
                            (_ref5 =
                                (_slot$content =
                                    slot === null || slot === void 0
                                        ? void 0
                                        : slot.content) !== null &&
                                _slot$content !== void 0
                                    ? _slot$content
                                    : slot === null || slot === void 0
                                      ? void 0
                                      : slot["*"]) !== null && _ref5 !== void 0
                                ? _ref5
                                : rev === null || rev === void 0
                                  ? void 0
                                  : rev.content) !== null && _ref4 !== void 0
                            ? _ref4
                            : rev === null || rev === void 0
                              ? void 0
                              : rev["*"]) !== null && _ref3 !== void 0
                        ? _ref3
                        : "",
                id:
                    page.lastrevid ||
                    (rev === null || rev === void 0 ? void 0 : rev.revid) ||
                    0,
                timestamp:
                    rev === null || rev === void 0 ? void 0 : rev.timestamp,
                start: timestamp
            };
        }
        function node(tag, attrs) {
            var element = document.createElement(tag);
            Object.entries(attrs || {}).forEach(function (_ref6) {
                var _ref7 = _slicedToArray(_ref6, 2),
                    name = _ref7[0],
                    value = _ref7[1];
                if (name === "class") element.className = value;
                else if (name === "text") element.textContent = value;
                else if (name.startsWith("on"))
                    element.addEventListener(name.slice(2), value);
                else if (value !== false && value != null)
                    element.setAttribute(name, value === true ? "" : value);
            });
            for (
                var _len = arguments.length,
                    children = new Array(_len > 2 ? _len - 2 : 0),
                    _key = 2;
                _key < _len;
                _key++
            ) {
                children[_key - 2] = arguments[_key];
            }
            children.forEach(function (child) {
                if (child != null) element.append(child);
            });
            return element;
        }
        var link = function link(title, label) {
            return node("a", {
                href: mw.util.getUrl(title),
                text: label || title
            });
        };
        var button = function button(label, callback) {
            return node("button", {
                type: "button",
                text: label,
                onclick: callback
            });
        };
        function select(options, value) {
            var control = node("select", {});
            options.forEach(function (option) {
                var pair = Array.isArray(option) ? option : [option, option];
                control.append(
                    node("option", {
                        value: pair[0],
                        text: pair[1]
                    })
                );
            });
            if (
                _toConsumableArray(control.options).some(function (o) {
                    return o.value === String(value || "");
                })
            )
                control.value = value || "";
            return control;
        }
        function field(label, control) {
            return node(
                "label",
                {
                    class: "ss-field"
                },
                node("span", {
                    text: label
                }),
                control
            );
        }
        var styles =
            "\n        .ss-tools{color:#e8e8e8;line-height:1.5}.ss-tools *{box-sizing:border-box}.ss-tools [hidden]{display:none!important}\n        .ss-tools button,.ss-tools select,.ss-tools input,.ss-tools textarea,.ss-tools .ss-upload{font:inherit;color:#f4f4f4;background:#191c23;border:1px solid #a84949;border-radius:4px;padding:9px 11px;max-width:100%}\n        .ss-tools button,.ss-tools select,.ss-tools .ss-upload{cursor:pointer}.ss-tools button:hover{background:#292b33}.ss-tools button:disabled{opacity:.5;cursor:wait}\n        .ss-tools input:not([type=checkbox]),.ss-tools textarea,.ss-tools select{width:100%}.ss-tools textarea{min-height:95px;resize:vertical}.ss-tools input[type=checkbox]{width:auto}\n        .ss-tools button:focus-visible,.ss-tools input:focus-visible,.ss-tools select:focus-visible,.ss-tools textarea:focus-visible{outline:2px solid #ff7d7d;outline-offset:2px}\n        .ss-tools .ss-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}.ss-tools .ss-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.ss-tools .ss-wide{grid-column:1/-1}\n        .ss-tools .ss-field{display:flex;flex-direction:column;gap:5px;min-width:0;font-weight:600}.ss-tools .ss-field input,.ss-tools .ss-field textarea{font-weight:400}.ss-tools .ss-help{color:#a9abb3;font-size:13px}\n        .ss-tools .ss-toolbar{display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px;padding:16px 0;border-bottom:1px solid #663838}.ss-tools .ss-tags{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}\n        .ss-tools .ss-tag{padding:4px 8px;background:#242630;border:1px solid #5e4242;border-radius:4px;font-size:13px}.ss-tools .ss-active{background:#a84949!important;color:#fff}\n        .ss-tools .ss-results{display:grid;gap:0}.ss-tools .ss-result{padding:15px 0;border-bottom:1px solid #38313a;min-width:0;overflow-wrap:anywhere}.ss-tools .ss-result h3{margin:0 0 5px;font-size:19px}.ss-tools .ss-result p{margin:6px 0}\n        .ss-tools .ss-cards{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:12px}.ss-tools .ss-cards .ss-result{border:1px solid #663838;border-radius:6px;padding:12px;background:#111319}\n        .ss-tools .ss-art{width:100%;height:220px;object-fit:contain;background:#090b0f}.ss-tools .ss-art-empty{height:90px;display:grid;place-items:center;color:#a9abb3;background:#090b0f}\n        .ss-tools .ss-rarity{font-size:13px;font-weight:bold}.ss-tools .ss-rarity[data-rarity=Mythic],.ss-tools .ss-rarity[data-rarity=Legendary]{color:#ff7d7d}.ss-tools .ss-rarity[data-rarity=Epic]{color:#bb8bf2}.ss-tools .ss-rarity[data-rarity=Uncommon]{color:#72c888}.ss-tools .ss-rarity[data-rarity=Common]{color:#bfc2ca}\n        .ss-tools .ss-pager{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-top:18px}.ss-tools .ss-status{padding:12px;border-left:4px solid #a84949;background:#191c23;margin:12px 0;overflow-wrap:anywhere}.ss-tools .ss-error{color:#ff9a9a}.ss-tools .ss-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.ss-tools .ss-tabs button{flex:1}\n        .ss-tools .ss-editor-section{padding:16px 0;border-top:1px solid #663838}.ss-tools .ss-section-row{display:grid;grid-template-columns:1fr 2fr auto;gap:10px;margin:12px 0}.ss-tools details{margin:12px 0}.ss-tools summary{cursor:pointer;font-weight:bold}\n        .ss-tools .ss-group{border:1px solid #663838;padding:12px;border-radius:4px;margin:10px 0}.ss-tools .ss-rule{display:grid;grid-template-columns:130px 1fr 80px auto;gap:8px;margin:8px 0}.ss-tools .ss-rule input[type=number]{min-width:60px}\n        .ss-tools .ss-checkbox{display:flex;align-items:center;gap:8px}.ss-tools .ss-profile{padding:12px 0;border-bottom:1px solid #663838}.ss-tools .ss-attributes{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}.ss-tools pre{white-space:pre-wrap;max-height:450px;overflow:auto;background:#111319;padding:12px;color:#e8e8e8}\n        .ss-entry-connections{clear:both;padding-top:16px}.ss-entry-connections:empty{display:none}.ss-entry-connections h3{font-size:18px}\n        @media(max-width:760px){.ss-tools .ss-toolbar,.ss-tools .ss-grid,.ss-tools .ss-section-row{grid-template-columns:1fr}.ss-tools .ss-cards{grid-template-columns:repeat(2,minmax(0,1fr))}.ss-tools .ss-rule{grid-template-columns:1fr 1fr}.ss-tools .ss-attributes{grid-template-columns:repeat(2,minmax(0,1fr))}}\n        @media(max-width:440px){.ss-tools .ss-cards{grid-template-columns:1fr}}\n    ";
        var bootBusy = false;
        var bootAgain = false;
        var bootTimer;
        var modulesReady;
        var contentHookAdded = false;
        function queueBoot() {
            window.clearTimeout(bootTimer);
            bootTimer = window.setTimeout(boot, 100);
        }
        state.refresh = queueBoot;
        var contentObserver =
            typeof MutationObserver === "function"
                ? new MutationObserver(function (records) {
                      if (
                          records.some(function (record) {
                              return _toConsumableArray(record.addedNodes).some(
                                  function (item) {
                                      var _item$matches, _item$querySelector;
                                      return (
                                          item.nodeType === 1 &&
                                          (((_item$matches = item.matches) ===
                                              null || _item$matches === void 0
                                              ? void 0
                                              : _item$matches.call(
                                                    item,
                                                    "#seashell-submission-root, .ss-card-browser[data-kind], .ss-entry-connections"
                                                )) ||
                                              ((_item$querySelector =
                                                  item.querySelector) ===
                                                  null ||
                                              _item$querySelector === void 0
                                                  ? void 0
                                                  : _item$querySelector.call(
                                                        item,
                                                        "#seashell-submission-root, .ss-card-browser[data-kind], .ss-entry-connections"
                                                    )))
                                      );
                                  }
                              );
                          })
                      )
                          queueBoot();
                  })
                : null;
        if (contentObserver)
            contentObserver.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        if (document.readyState === "loading")
            document.addEventListener("DOMContentLoaded", boot);
        else boot();
    })();
})();