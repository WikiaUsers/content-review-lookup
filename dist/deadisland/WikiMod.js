/* wikiMod
 * by: jgjake2
 * 
 * wikiMod was originally designed to provide a base API for mobile JS hacks on Wikia,
 * but has since been generalized work in any situation on any platform.
 * 
 * Many functions are based on/taken from another project of mine called jMod
 * https://github.com/jgjake2/myUserJS-API
 */
 
// Several functions taken from another project of mine: jMod
// https://github.com/jgjake2/myUserJS-API
+function($, window, _mw, factory) {
    var global = this, debug = false, _undefined = "undefined", uw = typeof unsafeWindow != _undefined ? unsafeWindow : null, requirements = [], isMobile;
    try {
        if (!uw && window.wikiMod && true === window.wikiMod.isPrivileged) return;
    } catch (e) {}
    try {
        if (!uw && !debug && window && window.JSExtensionConfig && window.JSExtensionConfig.wikiMod && true === window.JSExtensionConfig.wikiMod.disable) return;
    } catch (e) {}
    if (!uw && window.mw && window.mw.loader && window.mw.loader.getState) try {
        if (!window.mw.loader.getState("wikimod")) {
            window.mw.loader.register("wikimod", 0, []);
            window.mw.loader.state("wikimod", "loading");
        }
        if ("registered" == window.mw.loader.getState("wikimod")) window.mw.loader.state("wikimod", "loading");
    } catch (e) {}
    var wikiMod = factory.call(global, $, window, _mw || void 0, uw, Object, _undefined);
    isMobile = wikiMod.isMobile;
    if (!wikiMod.mw || isMobile) requirements.push("mediawiki");
    if (isMobile || uw && uw.jQuery && !uw.jQuery.loadJQueryUI || !uw && $ && !$.loadJQueryUI) requirements.push("jquery.loaders");
    if (isMobile) requirements.push("wikia.jquery.ui");
    try {
        if (global.wikiMod) wikiMod._wikiMod = global.wikiMod;
    } catch (e) {}
    try {
        if (window.wikiMod) wikiMod.__wikiMod = window.wikiMod;
    } catch (e) {}
    function exportArgs(name, cb, coa) {
        var length = arguments.length;
        var t = {
            allowCallbacks: length > 1 ? true == cb : true,
            allowCrossOriginArguments: length > 2 ? true == coa : true
        };
        if (length > 0 && name) t.defineAs = name;
        return t;
    }
    var validDeepExports = [], excludePropsFromExport = [ "exportFunction", "cloneInto" ];
    function exportProxy(obj, args) {
        args = args || {};
        var exportHandlers = cloneInto({}, uw, {
            cloneFunctions: true,
            wrapReflectors: true
        }), _exportFunction = exportFunction;
        _exportFunction(args["get"] || function(oTarget, sKey) {
            if ("undefined" !== typeof obj[sKey] || sKey in obj) {
                try {
                    if (excludePropsFromExport.indexOf(sKey) > -1) return void 0;
                } catch (e) {}
                try {
                    if (obj === wikiMod && validDeepExports.indexOf(sKey) > -1) return exportProxy(obj[sKey]);
                } catch (e) {}
                if ("object" === typeof obj[sKey] || "function" === typeof obj[sKey]) try {
                    return cloneInto(obj[sKey], uw, {
                        cloneFunctions: true,
                        wrapReflectors: true
                    });
                } catch (e) {}
                return obj[sKey];
            } else return void 0;
        }, exportHandlers, exportArgs("get"));
        _exportFunction(args["set"] || function(oTarget, sKey, vValue) {
            try {
                obj[sKey] = vValue;
            } catch (e) {
                return false;
            }
            return true;
        }, exportHandlers, exportArgs("set"));
        _exportFunction(args["has"] || function(oTarget, sKey) {
            return sKey in obj;
        }, exportHandlers, exportArgs("has"));
        _exportFunction(args["enumerate"] || function(oTarget, sKey) {
            try {
                return obj.keys()[Symbol.iterator]();
            } catch (e) {}
            try {
                return obj.keys();
            } catch (e) {}
        }, exportHandlers, exportArgs("enumerate"));
        _exportFunction(args["ownKeys"] || function(oTarget, sKey) {
            return Object.getOwnPropertyNames(obj);
        }, exportHandlers, exportArgs("ownKeys"));
        _exportFunction(args["defineProperty"] || function(oTarget, sKey, oDesc) {
            if (oDesc && !(sKey in obj)) Object.defineProperty(obj, sKey, oDesc);
            return obj;
        }, exportHandlers, exportArgs("defineProperty"));
        _exportFunction(function(oTarget, sKey) {
            return Object.getOwnPropertyDescriptor(obj, sKey);
        }, exportHandlers, exportArgs("getOwnPropertyDescriptor"));
        _exportFunction(args["construct"] || function(oTarget, argumentsList) {
            return obj.apply(obj, argumentsList);
        }, exportHandlers, exportArgs("construct"));
        _exportFunction(function(oTarget, sKey) {
            return obj.prototype;
        }, exportHandlers, exportArgs("getPrototypeOf"));
        _exportFunction(function(oTarget, thisArg, argumentsList) {
            return obj.apply(obj, argumentsList);
        }, exportHandlers, exportArgs("apply"));
        try {
            return new uw.Proxy(_exportFunction(function() {
                return obj.apply(obj, arguments);
            }, uw, exportArgs()), exportHandlers);
        } catch (e) {
            console.log("export error", e);
            return void 0;
        }
    }
    try {
        if (uw && uw.wikiMod) wikiMod.__uwwikiMod = uw.wikiMod;
    } catch (e) {}
    try {
        window.wikiMod = global.wikiMod = wikiMod;
    } catch (e) {}
    if (uw && uw.Proxy) try {
        uw.wikiMod = exportProxy(wikiMod);
    } catch (e) {
        console.log("Error exportProxy: ", e);
    }
    function addOnWikiModReady() {
        var wmReadyName = "onWikiModReady";
        if (_undefined != typeof window[wmReadyName]) if (false === window[wmReadyName]) try {
            window[wmReadyName] = window.wikiMod;
        } catch (e) {} else if (true === window[wmReadyName]) ; else if ("function" == typeof window[wmReadyName]) try {
            window[wmReadyName]();
            window[wmReadyName] = void 0;
            delete window[wmReadyName];
        } catch (e) {}
        if (uw && _undefined != typeof uw[wmReadyName]) if (false === uw[wmReadyName]) uw[wmReadyName] = uw.wikiMod; else if (true === uw[wmReadyName]) ; else if ("function" == typeof uw[wmReadyName]) try {
            uw[wmReadyName]();
            uw[wmReadyName] = void 0;
            delete uw[wmReadyName];
        } catch (e) {}
        var exportArgs2 = {
            allowCallbacks: true,
            allowCrossOriginArguments: true
        }, getFn = function() {
            return true;
        }, setFn = function(fn) {
            try {
                fn();
            } catch (e) {}
        };
        if (uw && _undefined == typeof uw[wmReadyName] && _undefined != typeof exportFunction) try {
            Object.defineProperty(uw, wmReadyName, {
                get: exportFunction(getFn, uw, exportArgs2),
                set: exportFunction(setFn, uw, exportArgs2),
                enumerable: true,
                configurable: false
            });
        } catch (e) {
            console.log(e);
        }
        if (_undefined == typeof window[wmReadyName]) try {
            Object.defineProperty(window, wmReadyName, {
                get: getFn,
                set: setFn,
                enumerable: true,
                configurable: false
            });
        } catch (e) {
            console.log(e);
        }
    }
    if (!uw && window.define && window.define.amd) try {
        window.define("wikimod", function() {
            return wikiMod;
        });
    } catch (e) {}
    wikiMod.try_mwRegister();
    if (requirements.length) wikiMod.require(requirements);
    addOnWikiModReady();
}.call(this, "undefined" !== typeof jQuery ? jQuery : window.jQuery || window.$ || null, window || this, "undefined" !== typeof mediaWiki ? mediaWiki : window.mw || window.mediaWiki || ("undefined" !== typeof unsafeWindow ? unsafeWindow.mediaWiki || unsafeWindow.mw : null), function($, window, _mw, uw, Object, _undefined, undefined) {
    var global = this, debug = false || false, _object = "object", _string = "string", _boolean = "boolean", _function = "function", customCSSAdded = false, _css = "@import url(http://code.jmod.info/fonts/sansation.css);\n", _jQueryAvailable = $ ? true : false, __mw = _mw, mCloneIntoDefaultArgs = {
        cloneFunctions: true,
        wrapReflectors: true
    }, Slice = Array.prototype.slice, winUwGl = window || uw || global, winGlUw = window || global || uw, uwGlWin = uw || global || window, isURLPatt = /^\s*((((?:[A-Za-z]{3,9})?:(?:\/\/)?|\/)?((?:[\-;\:&=\+\$,\w]+\@)?[A-Za-z0-9\.\-]+(\:[0-9]+)?|(?:ww‌​w\.|[\-;:&=\+\$,\w]+)[A-Za-z0-9\.-]+))((?:\/[\\\-_\.~\!\*\'\"\`\(\);\:\@\&\=\+\$\,\/\%\[\]\{\}0-9a-zA-Z]*)?(?:\?([^\s\#]*))?(?:\#([\w\d\-_]*))?)?)\s*$/i;
    if (!String.prototype.trim) Object.defineProperty(String.prototype, "trim", {
        value: function() {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        },
        enumerable: false
    });
    function WikiMod() {
        var args = arguments, length = args.length, i = 1, types = [], arg0, type0;
        function type(x) {
            return x < length ? types[x] : "notdefined";
        }
        if (0 == length) return wikiMod; else {
            arg0 = args[0];
            types.push(type0 = typeof arg0);
            for (;i < args.length; i++) types.push(typeof args[i]);
            if (1 == length) switch (type0) {
              case "function":
                try {
                    wikiMod.onLoad = arg0;
                } catch (e) {}
                return;
                break;
 
              case "object":
                var isPlain = isPlainObject(arg0);
                if (isPlain && arg0.type && "string" == typeof arg0.type) try {
                    return createNewElement(arg0);
                } catch (e) {}
            } else switch (type0) {
              case "string":
                if ("function" == types[1] && wikiMod.Events.e.hasOwnProperty(arg0) && length < 4 && [ "boolean", "notdefined" ].indexOf(type(2)) > -1) return wikiMod.Events.addListener(arg0, args[1], "boolean" == type(2) ? args[2] : true);
            }
        }
    }
    var wikiMod = WikiMod;
    wikiMod.displayName = wikiMod.name = "wikiMod";
    wikiMod.Version = "0.1.1";
    wikiMod.getKeys = function(obj) {
        if (Object.keys) return Object.keys(obj); else {
            var keys = [], k;
            for (k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) keys.push(k);
            return keys;
        }
    };
    function splitKeyString(str) {
        var i = 0, cleanStr = str.replace(/\\\./g, "|!|");
        strArr = cleanStr.split(".");
        for (;i < strArr.length; i++) strArr[i] = strArr[i].replace("|!|", ".");
        return strArr;
    }
    function Object_SearchForKey(str, parent) {
        var i = 0, tmp = this, names = splitKeyString(str);
        for (i; i < names.length; i++) {
            if (typeof tmp[names[i]] === _undefined) return undefined;
            if (true === parent && i == names.length - 1) return tmp;
            tmp = tmp[names[i]];
        }
        return tmp;
    }
    function Object_SearchForKeyCaseInsensitive(str) {
        var x, i = 0, tmp = this, names = splitKeyString(str);
        if (0 == names.length) return undefined;
        for (i; i < names.length; i++) if ((x = Object.keys(tmp).join("|").toLowerCase().split("|").indexOf(names[i].toLowerCase())) != -1) tmp = tmp[Object.keys(tmp)[x]]; else return undefined;
        return tmp;
    }
    function Object_setKeyValueCaseInsensitive(str, val) {
        var parent, x, i = 0, names = splitKeyString(str), tmp = this;
        if (0 == names.length) return undefined;
        for (i; i < names.length; i++) if ((x = Object.keys(tmp).join("|").toLowerCase().split("|").indexOf(names[i].toLowerCase())) != -1) {
            parent = tmp;
            names[i] = Object.keys(tmp)[x];
            tmp = tmp[Object.keys(tmp)[x]];
        } else return undefined;
        parent[names[names.length - 1]] = val;
        return names;
    }
    function Object_SearchForKeys(arr) {
        var tmp, i = 0, args = "string" === typeof arr ? Slice.call(arguments) : arr;
        for (i; i < args.length; i++) if ((tmp = Object_SearchForKey.apply(this, [ args[i] ])) !== undefined) return tmp;
        return undefined;
    }
    function Object_setKeyValue(str, val, force) {
        var index = 0, names = splitKeyString(str), tmp = this;
        for (index; index < names.length - 1; index++) {
            if (typeof tmp[names[index]] === _undefined) if (force) tmp[names[index]] = {}; else return;
            tmp = tmp[names[index]];
        }
        tmp[names[names.length - 1]] = val;
    }
    var props = {
        SearchForKey: {
            value: Object_SearchForKey,
            enumerable: false
        },
        SearchForKeys: {
            value: Object_SearchForKeys,
            enumerable: false
        },
        setKeyValue: {
            value: Object_setKeyValue,
            enumerable: false
        },
        SearchForKeyI: {
            value: Object_SearchForKeyCaseInsensitive,
            enumerable: false
        },
        setKeyValueI: {
            value: Object_setKeyValueCaseInsensitive,
            enumerable: false
        }
    };
    wikiMod.ExtendObject = function(obj) {
        try {
            Object.defineProperties(obj, props);
        } catch (e) {}
        return obj;
    };
    function isMediaWiki(obj) {
        return obj && obj.loader && obj.messages && obj.libs ? true : false;
    }
    var _isMobile;
    Object.defineProperties(wikiMod, {
        isPrivileged: {
            value: uw || debug ? true : false,
            enumerable: true,
            configurable: false,
            writable: false
        },
        document: {
            get: function() {
                try {
                    return window.document || global.document || global || uw.document;
                } catch (e) {}
                return null;
            }
        },
        head: {
            get: function() {
                try {
                    var doc = wikiMod.document;
                    return doc.head || doc.getElementsByTagName("head")[0];
                } catch (e) {}
                return null;
            }
        },
        body: {
            get: function() {
                try {
                    var doc = wikiMod.document;
                    return doc.body || doc.getElementsByTagName("body")[0];
                } catch (e) {}
                return null;
            }
        },
        WikiaMainContent: {
            get: function() {
                return getWikiElement("#WikiaMainContent", "#wkMainCnt", true);
            }
        },
        WikiaPageHeader: {
            get: function() {
                return getWikiElement("#WikiaPageHeader", "#wkMainCntHdr", true);
            }
        },
        WikiaArticle: {
            get: function() {
                return getWikiElement("#WikiaArticle", null, true);
            }
        },
        jQueryAvailable: {
            get: function() {
                if (_jQueryAvailable || typeof $ !== _undefined) return _jQueryAvailable = true;
                if (typeof jQuery !== _undefined) return $ = jQuery, _jQueryAvailable = true;
                if (uw && typeof uw.jQuery !== _undefined) return $ = uw.jQuery, _jQueryAvailable = true;
                return false;
            },
            set: function(val) {
                _jQueryAvailable = val ? true : false;
                try {
                    if ("jQuery" == RealTypeOf(val)) $ = val;
                } catch (e) {}
            },
            enumerable: false
        },
        jQuery: {
            get: function() {
                return wikiMod.jQueryAvailable ? $ : undefined;
            },
            configurable: false
        },
        isMobile: {
            get: function() {
                if ("boolean" == typeof _isMobile) return _isMobile;
                var body = wikiMod.body;
                if (body) try {
                    return _isMobile = wikiMod.$("body.wkMobile") ? true : false;
                } catch (e) {}
                return null;
            },
            enumerable: true
        },
        CSS: {
            get: function() {
                return _css;
            },
            set: function(value) {
                _css += value;
                if (customCSSAdded) {
                    addStyle(_css);
                    _css = "";
                }
            }
        },
        mw: {
            get: function() {
                var check__mw = function() {
                    if (__mw && isMediaWiki(__mw)) {
                        if (wikiMod.Events && !wikiMod.onMediaWiki) {
                            try {
                                wikiMod.Events.fire.apply(wikiMod.Events, [ "onMediaWiki", {
                                    _this: global,
                                    args: __mw
                                } ]);
                            } catch (e) {}
                            setTimeout(function() {
                                wikiMod.try_mwRegister();
                            }, 0);
                        }
                        return true;
                    }
                    return false;
                };
                if (check__mw()) return __mw;
                __mw = global.mw || global.mediaWiki || window.mw || window.mediaWiki;
                if (check__mw()) return __mw;
                try {
                    if (uw) {
                        __mw = uw.mw || uw.mediaWiki;
                        if (check__mw()) return __mw;
                    }
                } catch (e) {}
                return __mw = undefined;
            }
        }
    });
    var storagePrefix = "_WIKIMOD_";
    wikiMod.localStorage = {
        available: function() {
            var s;
            try {
                s = this.stor;
                if (_undefined !== typeof s && null != s && s.getItem && s.setItem) return true;
            } catch (e) {}
            return false;
        },
        getValue: function(key, def) {
            if (!this.available()) return def;
            try {
                var r = this.stor.getItem(storagePrefix + key);
                return null !== r ? r : def;
            } catch (e) {}
            return def;
        },
        setValue: function(key, value) {
            if (!this.available()) return;
            try {
                return this.stor.setItem(storagePrefix + key, value);
            } catch (e) {}
        },
        setJSON: function(key, value) {
            if (!this.available()) return;
            var tmp;
            try {
                tmp = JSON.stringify(value);
            } catch (e) {
                console.log("error", e);
            }
            try {
                return this.setValue(key, tmp || value);
            } catch (e) {}
        },
        getJSON: function(key, def) {
            if (!this.available()) return def;
            var tmp;
            try {
                tmp = this.getValue(key, def);
            } catch (e) {}
            try {
                if ("string" === typeof tmp) return JSON.parse(tmp);
            } catch (e) {}
            return tmp || def;
        },
        deleteValue: function(key) {
            if (!this.available()) return;
            try {
                return this.stor.removeItem(storagePrefix + key);
            } catch (e) {}
        }
    };
    Object.defineProperty(wikiMod.localStorage, "stor", {
        get: function() {
            try {
                return typeof localStorage != _undefined ? localStorage : global.localStorage || window.localStorage || (uw ? uw.localStorage : null);
            } catch (e) {
                console.log("error", e);
            }
        },
        enumerable: false
    });
    var CacheClassInstances = {};
    wikiMod.CacheClass = function(name, options) {
        if (CacheClassInstances[name] && CacheClassInstances[name].instance) return CacheClassInstances[name].instance;
        if ("object" !== typeof this) throw new TypeError("Cache Objects must be constructed via new");
        if (!name || typeof name !== _string) throw new TypeError("Must Provide Valid Cache Name");
        options = wikiMod.extend(true, {
            version: undefined,
            deepCopy: true,
            noExtend: false,
            updateAfterSet: true,
            ttl: 1200,
            autoClearOutOfDate: false
        }, options || {});
        this.options = options;
        if (isNaN(options.ttl)) throw new TypeError("Invalid TTL");
        var newCacheObject = {
            value: {},
            storageName: name,
            initialized: false,
            updateStorage: function() {
                if (!this.value) this.value = {};
                if (!this.value.data) this.value.data = {};
                if (!this.value._wikiModVersion) this.value._wikiModVersion = wikiMod.Version;
                if (typeof options.version != _undefined && !this.value.version) this.value.version = options.version;
                if (!this.value.cacheUpdated) this.value.cacheUpdated = parseInt(Date.now() / 1e3);
                try {
                    wikiMod.localStorage.setJSON(this.storageName, this.value);
                } catch (e) {
                    console.log("Cache updateStorage Error", e);
                }
            },
            refresh: function() {
                this.initialized = true;
                try {
                    this.value = wikiMod.localStorage.getJSON(this.storageName, this.value);
                    if (!this.value || !this.value._wikiModVersion || this.value._wikiModVersion != wikiMod.Version || typeof options.version != _undefined && options.version && (!this.value.version || this.value.version != options.version) || options.autoClearOutOfDate && true === this.isOutOfDate()) {
                        this.value = {};
                        this.updateStorage();
                    }
                } catch (e) {
                    console.log("Cache Refresh Error", e);
                    this.value = {};
                    this.updateStorage();
                }
            },
            setValue: function() {
                if (!this.initialized) this.init();
                var args = Slice.call(arguments), length = args.length, val = this.value.data, val2 = this.value.data, i = 0, newValue = args[length - 1], time = parseInt(Date.now() / 1e3);
                try {
                    for (;i < (options.deepCopy && !options.noExtend && "object" == typeof newValue && null !== newValue ? length - 1 : length - 2); i++) {
                        if (!args[i].toString()) throw new Error("Invalid Key Value");
                        if (!(args[i].toString() in val)) val[args[i].toString()] = {};
                        val = val[args[i].toString()];
                    }
                    try {
                        if (options.deepCopy && !options.noExtend && "object" == typeof newValue && null !== newValue) val = wikiMod.extend(true, val, newValue, {
                            cacheUpdated: time
                        }); else if (!options.deepCopy || options.noExtend || "object" !== typeof newValue || null === newValue) if (options.noExtend || "object" !== typeof newValue || null === newValue) {
                            val[args[length - 2].toString()] = newValue;
                            val = val[args[length - 2].toString()];
                            if ("object" == typeof val || "function" == typeof val) try {
                                val.cacheUpdated = time;
                            } catch (y) {}
                        } else {
                            val = wikiMod.extend(options.deepCopy, val, newValue, {
                                cacheUpdated: time
                            });
                            try {
                                val.cacheUpdated = time;
                            } catch (y) {}
                        } else {
                            console.log("Cache Class Set Error", this.value, args);
                            throw new Error("Cache error");
                        }
                        this.value.cacheUpdated = time;
                        for (i = 0; i < length - 1; i++) {
                            if (!val2 || "object" != typeof val2) break;
                            val2.cacheUpdated = time;
                            val2 = val2[args[i].toString()];
                        }
                    } catch (e) {
                        console.log("err", e);
                    }
                } catch (x) {
                    console.log("storage error", x, args);
                }
                if (options.updateAfterSet) this.updateStorage();
            },
            getValue: function() {
                if (!this.initialized) this.init();
                var args = arguments, length = args.length, val = this.value.data, i = 0;
                try {
                    for (;i < length; i++) val = val[args[i].toString()];
                } catch (e) {}
                return val || null;
            },
            getValueIfCurrent: function() {
                if (!this.initialized) this.init();
                var args = arguments;
                var isout = this.isOutOfDate.apply(this, args);
                if (false === isout) return this.getValue.apply(this, args);
                return null;
            },
            timeSinceUpdate: function(KeyName) {
                if (!this.initialized) this.init();
                var args = arguments, time;
                if (!args.length) time = this.value.cacheUpdated; else {
                    var tmpInfo = this.getValue.apply(this, args);
                    if (tmpInfo && "object" == typeof tmpInfo && tmpInfo.cacheUpdated) time = tmpInfo.cacheUpdated; else {
                        if (args.length > 1) {
                            try {
                                tmpInfo = this.getValue.apply(this, Slice.call(args, 0, -1));
                            } catch (e) {}
                            if (!tmpInfo) try {
                                tmpInfo = this.getValue.call(this, KeyName);
                            } catch (e) {}
                            if (tmpInfo && tmpInfo.cacheUpdated) time = tmpInfo.cacheUpdated;
                        }
                        if (!time) if (tmpInfo && typeof tmpInfo == _object && !("cacheUpdated" in tmpInfo)) time = this.value.cacheUpdated; else if ("string" == typeof tmpInfo) time = this.value.cacheUpdated; else if (!tmpInfo) return -1; else time = tmpInfo.cacheUpdated;
                    }
                }
                return parseInt(Date.now() / 1e3) - parseInt(time || 0);
            },
            isOutOfDate: function(KeyName) {
                if (!this.initialized) this.init();
                if (options.ttl == -1) return false;
                var args = arguments, length = args.length, time = this.timeSinceUpdate.apply(this, args);
                if (time == -1 || isNaN(time) || null === time) return null;
                return parseInt(time) > options.ttl ? true : false;
            },
            clear: function() {
                this.value = {};
                this.updateStorage();
            },
            init: function() {
                if (!this.initialized) {
                    this.initialized = true;
                    this.refresh();
                }
            }
        };
        this.instance = newCacheObject;
        CacheClassInstances[name] = this;
        return newCacheObject;
    };
    wikiMod.wg = function(name, def) {
        var out, i, keys, tKey, wgPatt = /^wg/, tWin = uw ? uw : window;
        if (0 == arguments.length) {
            out = {};
            try {
                keys = Object.getOwnPropertyNames(tWin);
                for (i = 0; i < keys.length; i++) {
                    tKey = keys[i];
                    if (wgPatt.test(tKey)) out[tKey] = tWin[tKey];
                }
            } catch (e) {}
            return out;
        }
        if (out = global[name] || window[name] || (uw ? uw[name] : undefined)) return out;
        if (wikiMod.mw && wikiMod.mw.config) try {
            if (out = wikiMod.mw.config.get(name)) return out;
        } catch (e) {}
        switch (i = name.toLowerCase()) {
          case "wgcdnrooturl":
            return "http://slot1.images2.wikia.nocookie.net";
            break;
 
          case "wgresourcebasepath":
            return "https://images.wikia.nocookie.net/common";
            break;
 
          case "wgextensionspath":
            return "https://images.wikia.nocookie.net/common/extensions";
        }
        return global[i] || window[i] || (uw ? uw[i] : undefined) || def;
    };
    wikiMod.addCSS = function(css) {
        customCSSAdded = true;
        wikiMod.CSS = css || "";
    };
    var URLProtocolPatt = /^(?:https?\:\/\/|\:\/\/)/i, URLValidCharsPatt = /[^\\\-_\.~\!\*\'\"\`\(\);\:\@\&\=\+\$\,\/\?\%\#\[\]\?\{\}0-9a-zA-Z]/, isURLPatt = /(?:[a-zA-Z][0-9a-zA-Z\-_\.]+\.[a-zA-Z]{2,9}(?:\:[0-9]+)?\/|^\/)[\\\-_\.~\!\*\'\"\`\(\);\:\@\&\=\+\$\,\/\?\%\#\[\]\?\{\}0-9a-zA-Z]*$/i;
    function isValidURL(str) {
        return isURLPatt.test(str) && isURLPatt.test(str);
    }
    wikiMod.$$ = function(selector, target, nojQuery) {
        target = target || wikiMod.document;
        try {
            if (true !== nojQuery && wikiMod.jQueryAvailable) try {
                return $(selector, target).toArray();
            } catch (e) {}
            if ("string" !== typeof selector) return;
            var tmp = target.querySelectorAll(selector);
            return tmp ? [].map.call(tmp, function(element) {
                return element;
            }) : [];
        } catch (e) {
            console.log("Error (wikiMod.Query):", e);
        }
        return [];
    };
    wikiMod.$ = function(selector, target, nojQuery) {
        target = target || wikiMod.document;
        try {
            if (true !== nojQuery && wikiMod.jQueryAvailable) try {
                return $(selector, target).first()[0];
            } catch (e) {}
            if ("string" !== typeof selector) return;
            return target.querySelector(selector);
        } catch (e) {
            console.log("Error (wikiMod.Query):", e);
        }
    };
    function mExportFunction(func, scope, args) {
        if (typeof exportFunction !== _undefined) try {
            return exportFunction(func, scope, args);
        } catch (e) {}
        var name = "";
        if (args && args.defineAs) name = args.defineAs; else if ("function" === typeof func && "" != func.name) name = func.name;
        if (name && "" != name.trim()) try {
            return scope[name] = func;
        } catch (e) {} else return func;
    }
    wikiMod.exportFunction = mExportFunction;
    function cloneErrorObject(eObj, scope) {
        scope = scope || uw || global;
        var r, errRef = "Error", scopeRef = scope.Error && "function" === typeof scope.Error ? scope : uw || global;
        if (!scopeRef) return;
        if (eObj.name && "Error" != eObj.name && "function" == typeof scopeRef[eObj.name]) errRef = eObj.name;
        r = new scopeRef[errRef](eObj.message || null, eObj.fileName || null, eObj.lineNumber || null);
        r.name = eObj.name + "";
        r.stack = (eObj.stack || "") + "";
        r.message = eObj.message + "";
        r.fileName = typeof eObj.fileName != _undefined ? eObj.fileName + "" : null;
        r.lineNumber = typeof eObj.lineNumber != _undefined ? parseInt(eObj.lineNumber) : null;
        r.columnNumber = typeof eObj.columnNumber != _undefined ? parseInt(eObj.columnNumber) : null;
        delete r.toString;
        r.toString = function() {
            return this.name + ": " + this.message;
        }.bind(r);
        return r;
    }
    function mCloneInto(obj, scope, args, debug, depth) {
        if (typeof cloneInto !== _undefined) {
            depth = depth || 0;
            try {
                return cloneInto(obj, scope, args);
            } catch (e) {
                if (debug) console.log("mCloneInto error", e);
            }
            var x, output, objType = typeof obj;
            try {
                if ("object" == objType) if (obj instanceof Error) objType = "error"; else if (obj.constructor === new Array().constructor) objType = "array"; else if (null === obj) objType = "null";
            } catch (e) {}
            var objFn = function(o) {
                var type = typeof o;
                if ("string" == type || "number" == type || "boolean" == type || type == _undefined || null === o) return o; else if (o instanceof Error) try {
                    return cloneErrorObject(o, scope);
                } catch (e) {} else if ("object" == type) {
                    if (depth < 3) try {
                        return mCloneInto(o, scope, args, debug, depth + 1);
                    } catch (e) {}
                    try {
                        return cloneInto(o, scope, args);
                    } catch (e) {}
                } else if ("function" == type && args.cloneFunctions) try {
                    return cloneInto(o, scope, args);
                } catch (e) {}
            };
            if ("undefined" == objType || "null" == objType) return obj; else if ("error" == objType) try {
                output = cloneErrorObject(obj, scope);
            } catch (e) {} else if ("array" == objType) {
                output = cloneInto([], scope, args);
                for (x = 0; x < obj.length; x++) {
                    var tmpValue;
                    try {
                        tmpValue = objFn(obj[x]);
                    } catch (e) {}
                    try {
                        output.push(tmpValue);
                    } catch (e) {
                        output.push(undefined);
                    }
                }
            } else {
                output = cloneInto({}, scope, args);
                for (x in obj) if ("constructor" != x && Object.prototype.hasOwnProperty.call(obj, x)) {
                    var tmpValue;
                    try {
                        tmpValue = objFn(obj[x]);
                    } catch (e) {}
                    output[x] = tmpValue;
                }
            }
            return output;
        } else ;
        return obj;
    }
    wikiMod.cloneInto = mCloneInto;
    var addEventListener = wikiMod.addEventListener = function(el, eventName, handler, useCapture) {
        if (el.addEventListener) el.addEventListener(eventName, handler, useCapture ? true : false); else if (el.attachEvent) el.attachEvent("on" + eventName, handler); else el["on" + eventName] = handler;
    };
    var removeEventListener = wikiMod.removeEventListener = function(el, eventName, handler, useCapture) {
        if (el.removeEventListener) el.removeEventListener(eventName, handler, useCapture ? true : false); else if (el.detachEvent) el.detachEvent("on" + eventName, handler); else el["on" + eventName] = null;
    };
    var eventCancel = wikiMod.eventCancel = function(e) {
        var win = window || ("undefined" !== typeof unsafeWindow ? unsafeWindow : null);
        if (!e) if (win.event) e = win.event; else return;
        if (null != e.cancelBubble) e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        if (win.event) e.returnValue = false;
        if (null != e.cancel) e.cancel = true;
    };
    wikiMod.contentEval = function(source) {
        if ("function" == typeof source) source = "(" + source + ")();";
        var doc = wikiMod.document, head = wikiMod.head, script = doc.createElement("script");
        script.setAttribute("type", "application/javascript");
        script.textContent = source;
        head.appendChild(script);
        head.removeChild(script);
    };
    var addStyle = wikiMod.addStyle = function(css) {
        if (css) {
            var style, doc = wikiMod.document, head = wikiMod.head;
            if (head && doc) {
                style = doc.createElement("style");
                try {
                    style.innerHTML = css + "";
                } catch (x) {
                    style.innerText = css + "";
                }
                style.type = "text/css";
                return head.appendChild(style);
            }
        }
    };
    var addStylesheet = wikiMod.addStylesheet = function(url) {
        var style, head = wikiMod.head;
        if (head) {
            style = wikiMod.document.createElement("link");
            style.setAttribute("rel", "stylesheet");
            style.href = url;
            style.type = "text/css";
            return head.appendChild(style);
        }
    };
    var addScript = wikiMod.addScript = function(js, src, id, type, async, defer, appendToBody) {
        var target = wikiMod.head, jsType = typeof js, data = "object" == jsType ? js : {
            js: js || null,
            src: src || null,
            id: id || null,
            type: type || null,
            async: async,
            defer: defer,
            appendToBody: appendToBody
        }, newScript = wikiMod.document.createElement("script");
        if (true === data.appendToBody) target = wikiMod.body || target;
        if ("string" == jsType && data.js && !data.src && !URLValidCharsPatt.test(js) && isValidURL(js)) {
            data.src = js;
            data.js = undefined;
        }
        if (target) {
            newScript.setAttribute("async", false !== data.async);
            newScript.async = false !== data.async;
            if (true === data.defer) {
                newScript.setAttribute("defer", data.defer);
                newScript.defer = data.defer;
            }
            if (data.id && "string" == typeof data.id) try {
                newScript.id = data.id;
            } catch (x) {}
            if ("function" == typeof data.onload) {
                var interval, fired = false, count = 0, cb = function() {
                    if (!fired) {
                        fired = true;
                        newScript.onreadystatechange = null;
                        try {
                            if (interval) {
                                clearInterval(interval);
                                interval = null;
                            }
                        } catch (e) {}
                        try {
                            data.onload(newScript);
                        } catch (e) {}
                    }
                }, isLoaded = function() {
                    if ("loaded" == newScript.readyState || "complete" == newScript.readyState || count > 50) cb();
                    count++;
                };
                newScript.onload = cb;
                addEventListener(newScript, "load", cb);
                newScript.onreadystatechange = isLoaded;
                try {
                    interval = setInterval(isLoaded, 50);
                } catch (e) {}
            }
            if (null != data.onerror) newScript.onerror = data.onerror;
            newScript.type = data.type || "text/javascript";
            if (data.js && "string" === typeof data.js) try {
                newScript.innerHTML = data.js;
            } catch (x) {
                newScript.innerText = data.js;
            }
            if (data.src && "string" === typeof data.src) try {
                newScript.src = data.src;
            } catch (x) {}
            if (true === data.prepend) try {
                if (target.firstChild) return target.insertBefore(newScript, target.firstChild);
            } catch (x) {}
            try {
                return target.appendChild(newScript);
            } catch (x) {
                console.log("Add Script Error!", x);
            }
        }
        return null;
    };
    wikiMod.importStylesheetPage = function(page, server) {
        var url = "/index.php?title=" + encodeURIComponent(page.replace(/\s/g, "_")).replace("%2F", "/").replace("%3A", ":") + "&action=raw&ctype=text/css";
        if ("string" == typeof server) if (server.indexOf("://") == -1) url = "http://" + server + ".wikia.com" + url; else url = server + url;
        return addStylesheet(url);
    };
    wikiMod.importScriptPage = function(page, server, cb) {
        var _page, url;
        if (wikiMod.mw && wikiMod.mw.util) try {
            _page = wikiMod.mw.util.wikiUrlencode(page);
        } catch (e) {}
        if (!_page) _page = encodeURIComponent(page.replace(/\s/g, "_")).replace("%2F", "/").replace("%3A", ":");
        url = "/index.php?title=" + _page + "&action=raw&ctype=text/javascript";
        if ("string" == typeof server) if (server.indexOf("://") == -1) url = "http://" + server + ".wikia.com" + url; else url = server + url; else if ("function" == typeof server) cb = server;
        return wikiMod.loadURL(url, false, cb);
    };
    if (!window.importScriptPage && !global.importScriptPage && (!uw || uw && !uw.importScriptPage)) if (uw) mExportFunction(wikiMod.importScriptPage, uw, {
        defineAs: "importScriptPage",
        allowCallbacks: true,
        allowCrossOriginArguments: true
    }); else global.importScriptPage = window.importScriptPage = wikiMod.importScriptPage;
    wikiMod.importScriptURI = function(uri) {
        return wikiMod.load(uri, true);
    };
    if (!window.importScriptURI && !global.importScriptURI && (!uw || uw && !uw.importScriptURI)) if (uw) mExportFunction(wikiMod.importScriptURI, uw, {
        defineAs: "importScriptURI",
        allowCallbacks: true,
        allowCrossOriginArguments: true
    }); else global.importScriptURI = window.importScriptURI = wikiMod.importScriptURI;
    wikiMod.importScript = function(page, cb) {
        var _page, uri, _wgScript = wikiMod.wg("wgScript");
        if (!_wgScript) _wgScript = uw && uw.wgScript ? uw.wgScript : global.wgScript || window.wgScript || wikiMod.mw.config.get("wgScript");
        try {
            _page = wikiMod.mw.util.wikiUrlencode(page);
        } catch (e) {}
        if (!_page) _page = encodeURIComponent(page.replace(/\s/g, "_")).replace("%2F", "/").replace("%3A", ":");
        uri = _wgScript + "?title=" + _page + "&action=raw&ctype=text/javascript";
        return wikiMod.loadURL(uri, false, cb);
    };
    if (!window.importScript && !global.importScript && (!uw || uw && !uw.importScript)) if (uw) mExportFunction(wikiMod.importScript, uw, {
        defineAs: "importScript",
        allowCallbacks: true,
        allowCrossOriginArguments: true
    }); else global.importScript = window.importScript = wikiMod.importScript;
    var _prefetchList = {};
    wikiMod.prefetch = function(url) {
        if (_prefetchList[url]) return _prefetchList[url];
        var link, head = wikiMod.head;
        if (head) {
            link = wikiMod.document.createElement("link");
            link.setAttribute("rel", "prefetch");
            link.href = url;
            return _prefetchList[url] = head.appendChild(link);
        }
    };
    var isElement = wikiMod.isElement = function(obj) {
        try {
            return obj instanceof HTMLElement;
        } catch (e) {
            return "object" === typeof obj && 1 === obj.nodeType && "object" === typeof obj.style && "object" === typeof obj.ownerDocument;
        }
    };
    var isWindow = wikiMod.isWindow = function(obj) {
        try {
            if ("undefined" === typeof (uw || window).constructor) return obj instanceof (uw || window).constructor;
        } catch (e) {}
        try {
            return "window" === Object.prototype.toString.call(obj).replace(/^\[object |\]$/g, "").toLowerCase();
        } catch (e) {}
        try {
            return obj.window === obj;
        } catch (e) {}
        return false;
    };
    var RealTypeOf = wikiMod.RealTypeOf = function(_obj) {
        var obj;
        try {
            if (_obj.constructor === {}.constructor || _obj || null === _obj || Object.prototype.toString.call(_obj)) obj = _obj;
        } catch (e) {
            obj = mCloneInto(_obj, uw || global || window, mCloneIntoDefaultArgs);
        }
        try {
            if (typeof obj === _undefined) return _undefined;
            if ("number" === typeof obj && true == isNaN(obj)) return "nan";
            if ("object" === typeof obj) {
                if (null === obj) return "null";
                if (obj.constructor === {}.constructor) return "map";
                if (obj.constructor === new Array().constructor) return "array";
                if (obj.constructor === new Date().constructor) {
                    if (isNaN(obj.getTime())) return "invaliddate";
                    return "date";
                }
                if (obj.constructor === new RegExp().constructor) return "regex";
                return Object.prototype.toString.call(obj).replace(/^\[object |\]$/g, "").toLowerCase();
            }
        } catch (e) {}
        try {
            if ("function" === typeof obj) {
                if (obj.typeOfName && "string" === typeof obj.typeOfName) return obj.typeOfName;
                if (obj.displayName && "string" === typeof obj.displayName) return obj.displayName;
            }
        } catch (e) {}
        return typeof obj;
    };
    var isPlainObject = wikiMod.isPlainObject = function(obj) {
        try {
            if ("object" !== typeof obj || obj.nodeType || obj === obj.window) return false;
            if (obj.constructor && !obj.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) return false;
        } catch (e) {
            var obj2 = mCloneInto(obj, uw || global || window, mCloneIntoDefaultArgs);
            if ("object" !== typeof obj2 || obj2.nodeType || obj2 === obj2.window) return false;
            if (obj2.constructor && !obj2.hasOwnProperty.call(obj2.constructor.prototype, "isPrototypeOf")) return false;
        }
        return true;
    };
    var isArray = wikiMod.isArray = function(obj) {
        try {
            if (obj.constructor === new Array().constructor) return true;
        } catch (e) {
            try {
                var obj2 = mCloneInto(obj, unsafeWindow, mCloneIntoDefaultArgs);
                if (obj2.constructor === new Array().constructor) return true;
            } catch (e2) {
                return "[object Array]" === Object.prototype.toString.call(obj);
            }
        }
        return false;
    };
    var isEvent = wikiMod.isEvent = function(a) {
        var patt = /^\[object |\]$/g;
        try {
            if ("event" == Object.prototype.toString.call(a).replace(patt, "").toLowerCase()) return true;
        } catch (e) {}
        try {
            if ("event" == a.constructor.toString().replace(patt, "").toLowerCase()) return true;
        } catch (e) {}
        return false;
    };
    wikiMod.hexToRgb = function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            a: null
        } : null;
    };
    wikiMod.parseRGB = function(str) {
        var r = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\s*\)/im.exec(str);
        return r ? {
            r: parseInt(r[1]),
            g: parseInt(r[2]),
            b: parseInt(r[3]),
            a: r[4] && "" != r[4] ? parseFloat(r[4]) : null
        } : null;
    };
    wikiMod.parseColorString = function(str) {
        var r = wikiMod.parseRGB(str);
        return r || wikiMod.hexToRgb(str);
    };
    wikiMod.getClientRect = function(el) {
        try {
            var comp, r = wikiMod.extend({}, el.getBoundingClientRect());
            if (null == r.height || null == r.width) {
                comp = wikiMod.getComputedStyle(el);
                r.height = parseFloat(comp["height"]);
                r.width = parseFloat(comp["width"]);
            }
            return r;
        } catch (e) {}
    };
    wikiMod.getDefaultComputedStyle = function() {
        var args = arguments, length = args.length, el = args[0], doc, win, pseudoEl = null, newEl;
        if (isWindow(el)) {
            win = el;
            el = args[1];
        }
        if (length > 1 && "string" == typeof args[length - 1]) pseudoEl = args[length - 1];
        if (!isElement(el)) throw new Error("Invalid Element!");
        doc = win ? win.document : el.ownerDocument;
        win = win || doc.defaultView || el.defaultView || uw || window;
        if (win.getDefaultComputedStyle) return win.getDefaultComputedStyle(el, pseudoEl); else {
            newEl = (doc || document).createElement(el.tagName);
            newEl.ClassName = el.className;
            try {
                return win.getComputedStyle(newEl, pseudoEl);
            } catch (e) {
                return (newEl.defaultView || uw || window).getComputedStyle(newEl, pseudoEl);
            }
        }
    };
    wikiMod.getComputedStyle = function() {
        var args = arguments, length = args.length, el = args[0], doc, win, pseudoEl = null, comp, i = 1;
        if (isWindow(el)) {
            win = el;
            el = args[i++];
        }
        if (length > i && "string" == typeof args[i]) pseudoEl = args[i++] || null;
        if (length > i && "object" == typeof args[i]) comp = args[i++];
        if (!isElement(el)) throw new Error("Invalid Element!");
        doc = win ? win.document : el.ownerDocument;
        win = win || doc.defaultView || el.defaultView || uw || window;
        comp = comp || win.getComputedStyle(el, pseudoEl);
        return comp;
    };
    function fireClick(el, bubbles, cancelable) {
        var doc = wikiMod.document;
        if (wikiMod.jQueryAvailable) $(el).click(); else if (doc.createEvent) {
            var evt = doc.createEvent("MouseEvents");
            evt.initEvent("click", bubbles || true, cancelable || true);
            el.dispatchEvent(evt);
        } else if (doc.createEventObject) el.fireEvent("onclick"); else if ("function" == typeof el.onclick) el.onclick();
    }
    wikiMod.logFormatBuilder = function() {
        this.args = [];
        var addLine = function(value, type, style) {
            var isUndef = _undefined === typeof value, origType = typeof type;
            if (typeof type === _undefined) type = typeof value;
            var fmtType;
            switch (type) {
              case "d":
              case "%d":
                fmtType = "%d";
                break;
 
              case "i":
              case "%i":
                fmtType = "%i";
                break;
 
              case "f":
              case "%f":
                fmtType = "%.2f";
                break;
 
              case "number":
                if (parseInt(value) === value && value === +value) {
                    fmtType = "%d";
                    value = parseInt(value);
                } else {
                    fmtType = "%.2f";
                    value = parseFloat(value);
                }
                break;
 
              case "s":
              case "%s":
                if ("\n" == value || " \n" == value) {
                    fmtType = " \n";
                    value = undefined;
                    style = undefined;
                    isUndef = false;
                } else fmtType = "%s";
                break;
 
              case "string":
                fmtType = value;
                value = undefined;
                isUndef = false;
                break;
 
              case "o":
              case "%o":
                fmtType = "%o";
                break;
 
              case "object":
              default:
                if (origType == _undefined && _undefined == typeof style) fmtType = ""; else fmtType = "%o";
            }
            this.args.push({
                valueIsUndefined: isUndef,
                value: value,
                fmtString: fmtType,
                style: style
            });
        };
        this.add = function() {
            var i = 0, var0 = arguments[0];
            if (1 == arguments.length && "array" == RealTypeOf(var0)) for (i; i < var0.length; i++) addLine.apply(this, var0[i]); else addLine.apply(this, Slice.call(arguments));
        };
        this.build = function() {
            var fmtString = "";
            var arr = [];
            for (var i = 0; i < this.args.length; i++) {
                fmtString += ("undefined" !== typeof this.args[i].style ? "%c" : "") + this.args[i].fmtString;
                if ("undefined" !== typeof this.args[i].style) arr.push("" != this.args[i].style ? this.args[i].style : " ");
                if ("undefined" !== typeof this.args[i].value || this.args[i].valueIsUndefined) arr.push(this.args[i].value);
            }
            return [ fmtString ].concat(arr);
        };
        if (arguments.length > 0) this.add.apply(this, arguments);
    };
    var URLBuilder = wikiMod.URLBuilder = function(input) {
        var _this = this;
        _this.protocol = "http:";
        _this.hostname = "";
        _this.pathname = "";
        _this.args = [];
        _this.setHostname = function(str) {
            try {
                if ("string" === typeof str) {
                    var parser = document.createElement("a");
                    if (!/^\s*(?:https?\:)?\/\//i.test(str)) str = "http://" + str;
                    parser.href = str;
                    _this.hostname = parser.hostname;
                    _this.protocol = parser.protocol;
                }
            } catch (e) {} finally {
                return _this;
            }
        };
        _this.setPath = function(str) {
            if ("/" != str[0]) str = "/" + str;
            _this.pathname = str;
            return _this;
        };
        _this.addArg = function(key, value) {
            _this.args.push({
                name: key,
                value: value
            });
            return _this;
        };
        _this.addArgs = function(args) {
            for (var i = 0; i < args.length; i++) switch (RealTypeOf(args[i])) {
              case "array":
                _this.addArg(args[i][0], args[i][1]);
                break;
 
              case "map":
              case "object":
                var tmpName = getFirstValidKeyValue(args[i], [ "name", "key" ]);
                var tmpValue = getFirstValidKeyValue(args[i], [ "value" ]);
                if (tmpName && tmpValue) _this.addArg(tmpName, tmpValue);
            }
            return _this;
        };
        _this.buildArgs = function() {
            var argStr = "";
            var argsArr = [];
            for (var i = 0; i < _this.args.length; i++) argsArr.push(_this.args[i].name + "=" + _this.args[i].value);
            return argsArr.join("&");
        };
        _this.toString = function() {
            return _this.protocol + "//" + _this.hostname + _this.pathname + "?" + _this.buildArgs();
        };
        _this.setHostname(input);
    };
    +function() {
        var defaultTitle = "WikiMod";
        var defaultIconURL = "https://vignette.wikia.nocookie.net/deadisland/images/6/64/Favicon.ico/revision/latest?cb=20110217195632", defaultIconStyle = "" + "font-size:1.75em;" + "background-color: transparent;" + "background-clip: border-box;" + "background-position:left center;" + "background-size:auto 75%;" + "background-repeat: no-repeat;" + "letter-spacing: 20px;" + "white-space: pre;" + "display: run-in;", SansationFontFamily = 'font-family:"Sansation","Open Sans",Arial;', headerFontStyle = "font-size:175%;font-weight:300;" + SansationFontFamily, _defaultStyle = "display: run-in;", defaultHeaderStyle = headerFontStyle, defaultTitleStyle = "color:#000;font-size:125%;", defaultTextStyle = "font-weight:bold;font-size:120%;color:000;";
        var infoDefaultTextStyle = "font-weight:bold;font-size:120%;color:blue;";
        wikiMod.logger = function(loggerData) {
            var loggerTitle = loggerData.title || defaultTitle, defaultStyle = loggerData.defaultStyle || _defaultStyle, iconURL = loggerData.iconURL || defaultIconURL, iconStyle = (loggerData.iconStyle || defaultIconStyle) + 'background-image:url("' + iconURL + '");', headerStyle = loggerData.headerStyle || defaultHeaderStyle, titleStyle = loggerData.titleStyle || defaultTitleStyle, textStyle = loggerData.textStyle || defaultTextStyle;
            var infoDefaultStyle = loggerData.infoDefaultStyle || _defaultStyle, infoHeaderStyle = loggerData.infoHeaderStyle || defaultHeaderStyle, infoTitleStyle = loggerData.infoTitleStyle || defaultTitleStyle, infoTextStyle = loggerData.infoTextStyle || infoDefaultTextStyle;
            this.log = function(title, text) {
                var i = 2, fmtBuild = new wikiMod.logFormatBuilder([ [ "  ", "%s", defaultStyle + iconStyle ], [ loggerTitle + "", "string", defaultStyle + headerStyle ] ]);
                if (_undefined !== typeof text) fmtBuild.add([ [ " - ", "string", defaultStyle ], [ title || " ", "%s", defaultStyle + titleStyle ], [ " \n", "string" ], [ text || "", "%s", defaultStyle + textStyle ] ]); else fmtBuild.add([ [ " \n", "string" ], [ title || "", "%s", defaultStyle + textStyle ] ]);
                if (arguments.length > 2) fmtBuild.add(" \n", "string");
                for (i; i < arguments.length; i++) fmtBuild.add(arguments[i]);
                var args = fmtBuild.build();
                try {
                    console.log.apply(console, args);
                } catch (e) {
                    try {
                        var safeArgs = mCloneInto(args, uw || console || global || window, mCloneIntoDefaultArgs);
                        console.log.apply(console, safeArgs);
                    } catch (e) {}
                }
            };
            this.info = function(title, text) {
                var i = 2, fmtBuild = new wikiMod.logFormatBuilder([ [ "  ", "%s", infoDefaultStyle + iconStyle ], [ loggerTitle + "", "string", infoDefaultStyle + infoHeaderStyle ] ]);
                if (_undefined !== typeof text) fmtBuild.add([ [ " - ", "string", infoDefaultStyle ], [ title || " ", "%s", infoDefaultStyle + infoTitleStyle ], [ " \n", "string" ], [ text || "", "%s", infoDefaultStyle + infoTextStyle ] ]); else fmtBuild.add([ [ " \n", "string" ], [ title || "", "%s", infoDefaultStyle + infoTextStyle ] ]);
                if (arguments.length > 2) fmtBuild.add(" \n", "string");
                for (i; i < arguments.length; i++) fmtBuild.add(arguments[i]);
                var args = fmtBuild.build();
                try {
                    console.info.apply(console, args);
                } catch (e) {
                    try {
                        var safeArgs = mCloneInto(args, uw || console || global || window, mCloneIntoDefaultArgs);
                        console.info.apply(console, safeArgs);
                    } catch (e) {}
                }
            };
        };
    }();
    wikiMod.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if ("boolean" === typeof target) {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if ("object" !== typeof target && "function" !== typeof target) target = {};
        if (i === length) {
            target = this;
            i--;
        }
        for (;i < length; i++) if (null != (options = arguments[i])) for (name in options) {
            src = target[name];
            try {
                if (("object" === typeof options[name] || "function" === typeof options[name]) && options[name].constructor === {}.constructor || options[name] || target) copy = options[name];
            } catch (e) {
                copy = mCloneInto(options[name], target, mCloneIntoDefaultArgs);
            }
            if (target === options[name] || target === copy) continue;
            if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                    copyIsArray = false;
                    clone = src && isArray(src) ? src : [];
                } else clone = src && isPlainObject(src) ? src : {};
                target[name] = wikiMod.extend(deep, clone, copy);
            } else if (copy !== undefined) try {
                target[name] = copy;
            } catch (e) {
                target[name] = mCloneInto(copy, target, mCloneIntoDefaultArgs);
            }
        }
        return target;
    };
    var appendChild = wikiMod.appendChild = function(el, data) {
        var nodes, dummy, i;
        try {
            if (!isElement(el) && "object" === typeof el && null != el.type) {
                i = el.innerHTML === undefined && el.text !== undefined ? "text" : "innerHTML";
                if ("array" == RealTypeOf(el[i])) el[i].push(data); else el[i] = [ el[i], data ];
            } else if (typeof data === _undefined || null === data) return el; else if (isElement(data)) el.appendChild(data); else switch (RealTypeOf(data)) {
              case _undefined:
              case "null":
                break;
 
              case "array":
                for (i = 0; i < data.length; i++) el = appendChild(el, data[i]);
                break;
 
              case "object":
              case "map":
                if (dummy = createNewElement(data)) el.appendChild(dummy);
                break;
 
              default:
                nodes, dummy = (el.ownerDocument || wikiMod.document).createElement("div");
                dummy.innerHTML = data;
                nodes = dummy.childNodes;
                for (i = 0; i < nodes.length; i++) el.appendChild(nodes[i]);
            }
        } catch (e) {
            console.log("wikiMod.appendChild", e);
        } finally {
            return el;
        }
        return el;
    };
    var validElementProps = [ "id", "className", "checked", "defaultValue", "title", "async", "defer", "src", "onerror", "onload", "responseCallback", "value", "max", "min" ];
    var createNewElement = wikiMod.createNewElement = function(data) {
        var i, x, eventName, capture, callback, event, eventListeners = data.EventListeners || data.eventListeners, doc = wikiMod.document, newElement = doc.createElement(data.type || "div"), addListener = function(eventName, obj) {
            if ("function" === typeof obj) return addEventListener(newElement, eventName, obj);
            capture = obj.useCapture || obj.Capture || obj.capture || false;
            callback = obj.callback || obj["function"];
            if (callback) if ("array" == RealTypeOf(callback)) for (i in callback) {
                if ("function" !== typeof callback[i]) capture = callback[i].useCapture || callback[i].Capture || callback[i].capture || capture;
                addEventListener(newElement, eventName, callback[i], capture);
            } else addEventListener(newElement, eventName, callback, capture);
        };
        if ("string" === typeof data.style) newElement.setAttribute("style", data.style); else if ("object" === typeof data.style) for (i in data.style) newElement.style[i] = data.style[i];
        for (i = 0; i < validElementProps.length; i++) if (null != data[validElementProps[i]]) newElement[validElementProps[i]] = data[validElementProps[i]];
        if (null != data.attributes) for (i in data.attributes) if (null != data.attributes[i]) newElement.setAttribute(i, data.attributes[i]);
        if (eventListeners) for (eventName in eventListeners) {
            event = eventListeners[eventName];
            if ("array" == RealTypeOf(event)) for (x = 0; x < event.length; x++) addListener(eventName, event[x]); else addListener(eventName, event);
        }
        appendChild(newElement, data.innerHTML || data.text || null);
        return newElement;
    };
    function getUrlVars() {
        var vars = [], hash, hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), i = 0;
        for (;i < hashes.length; i++) {
            hash = hashes[i].split("=");
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
    function getJSExtensionConfig_URLArgs() {
        var tmpjsextcfg, urlVars = getUrlVars() || {};
        if (urlVars.jsextcfg) try {
            tmpjsextcfg = JSON.parse(unescape(diURLVars.jsextcfg)) || {};
        } catch (e) {
            tmpjsextcfg = {};
        }
        return tmpjsextcfg;
    }
    var gotJSExtensionConfig_URLArgs = false;
    wikiMod.JSExtensionConfig = function(name, data) {
        window.JSExtensionConfig = window.JSExtensionConfig || {};
        if (!gotJSExtensionConfig_URLArgs) {
            gotJSExtensionConfig_URLArgs = true;
            if (!window.JSExtensionConfig._urlArgs) {
                var tURLArgs = getJSExtensionConfig_URLArgs();
                if (tURLArgs) {
                    if (tURLArgs.wikiMod) tURLArgs.wikiMod = {};
                    wikiMod.extend(true, window.JSExtensionConfig, tURLArgs);
                    window.JSExtensionConfig.__urlArgs = tURLArgs;
                }
                window.JSExtensionConfig._urlArgs = true;
            }
        }
        if ("string" == typeof name && "object" == typeof data) {
            if (!window.JSExtensionConfig[name]) window.JSExtensionConfig[name] = {};
            wikiMod.extend(true, window.JSExtensionConfig[name], data);
        } else if ("string" == typeof name && !data) {
            window.JSExtensionConfig[name] = window.JSExtensionConfig[name] || {};
            return window.JSExtensionConfig[name];
        }
        return window.JSExtensionConfig;
    };
    var _requestAnimationFrameKey = (window || uw).requestAnimationFrame || global.requestAnimationFrame ? "requestAnimationFrame" : (window || uw).mozRequestAnimationFrame || global.mozRequestAnimationFrame ? "mozRequestAnimationFrame" : (window || uw).webkitRequestAnimationFrame || global.webkitRequestAnimationFrame ? "webkitRequestAnimationFrame" : (window || uw).oRequestAnimationFrame || global.oRequestAnimationFrame ? "oRequestAnimationFrame" : (window || uw).msRequestAnimationFrame || global.msRequestAnimationFrame ? "msRequestAnimationFrame" : null;
    var _cancelAnimationFrameKey = (window || uw).cancelAnimationFrame || global.cancelAnimationFrame ? "cancelAnimationFrame" : (window || uw).mozCancelAnimationFrame || global.mozCancelAnimationFrame ? "mozCancelAnimationFrame" : (window || uw).webkitCancelAnimationFrame || global.webkitCancelAnimationFrame ? "webkitCancelAnimationFrame" : (window || uw).oCancelAnimationFrame || global.oCancelAnimationFrame ? "oCancelAnimationFrame" : (window || uw).msCancelAnimationFrame || global.msCancelAnimationFrame ? "msCancelAnimationFrame" : (window || uw).clearTimeout || global.clearTimeout ? "clearTimeout" : null;
    wikiMod.requestAnimationFrame = function(fn) {
        if (_requestAnimationFrameKey) try {
            return (window[_requestAnimationFrameKey] || global[_requestAnimationFrameKey] || (uw ? uw[_requestAnimationFrameKey] : undefined))(fn);
        } catch (e) {}
        return (window || uw || global).setTimeout(fn, 17);
    };
    wikiMod.cancelAnimationFrame = function(id) {
        if (_cancelAnimationFrameKey) try {
            return (window[_cancelAnimationFrameKey] || global[_cancelAnimationFrameKey] || (uw ? uw[_cancelAnimationFrameKey] : undefined))(id);
        } catch (e) {}
    };
    var setAsap = function(main) {
        var orsc = "onreadystatechange", callbacks = [], hiddenDiv, scriptEl, timeoutFn;
        if (typeof window != _undefined) main = window;
        if (main.MutationObserver) {
            hiddenDiv = wikiMod.document.createElement("div");
            new MutationObserver(executeCallbacks).observe(hiddenDiv, {
                attributes: true
            });
            return getAsap(function() {
                hiddenDiv.setAttribute("yes", "no");
            });
        } else if (!uw && !main.setImmediate && main.postMessage && !main.importScripts && main.addEventListener) {
            var MESSAGE_PREFIX = "com.setImmediate" + Math.random(), hasPostMessage = false;
            var onGlobalMessage = function(event) {
                if (event.source === main && event.data === MESSAGE_PREFIX) executeCallbacks();
            };
            main.addEventListener("message", onGlobalMessage, false);
            return getAsap(function() {
                main.postMessage(MESSAGE_PREFIX, "*");
            });
        } else if (!main.setImmediate && wikiMod.document && orsc in wikiMod.document.createElement("script")) return getAsap(function() {
            scriptEl = wikiMod.document.createElement("script");
            scriptEl[orsc] = function() {
                scriptEl[orsc] = null;
                scriptEl.parentNode.removeChild(scriptEl);
                scriptEl = null;
                executeCallbacks();
            };
            wikiMod.body.appendChild(scriptEl);
        }); else {
            timeoutFn = main.setImmediate || main.process && main.process.nextTick || setTimeout;
            return getAsap(function() {
                timeoutFn(function() {
                    executeCallbacks();
                }, 0);
            });
        }
        function getAsap(fn) {
            return function(callback) {
                if (!callbacks.length) fn();
                callbacks.push(callback);
            };
        }
        function executeCallbacks() {
            var cbList = callbacks;
            callbacks = [];
            for (var i = 0, len = cbList.length; i < len; i++) cbList[i]();
        }
    }(global);
    wikiMod.setAsap = setAsap;
    +function() {
        var __Promise = global.Promise || window.Promise || (uw ? uw.Promise : undefined) || undefined;
        var asap = window.setImmediate || global.setImmediate || wikiMod.setAsap || __Promise.immediateFn || function(fn) {
            setTimeout(fn, 1);
        };
        function bind(fn, thisArg) {
            return function() {
                fn.apply(thisArg, arguments);
            };
        }
        function Promise(fn) {
            if ("object" !== typeof this) throw new TypeError("Promises must be constructed via new");
            if ("function" !== typeof fn) throw new TypeError("not a function");
            this._state = null;
            this._value = null;
            this._deferreds = [];
            doResolve(fn, bind(resolve, this), bind(reject, this));
        }
        function handle(deferred) {
            var me = this;
            if (null === this._state) {
                this._deferreds.push(deferred);
                return;
            }
            asap(function() {
                var cb = me._state ? deferred.onFulfilled : deferred.onRejected;
                if (null === cb) {
                    (me._state ? deferred.resolve : deferred.reject)(me._value);
                    return;
                }
                var ret;
                try {
                    ret = cb(me._value);
                } catch (e) {
                    deferred.reject(e);
                    return;
                }
                deferred.resolve(ret);
            });
        }
        function resolve(newValue) {
            try {
                if (newValue === this) throw new TypeError("A promise cannot be resolved with itself.");
                if (newValue && ("object" === typeof newValue || "function" === typeof newValue)) {
                    var then = newValue.then;
                    if ("function" === typeof then) {
                        doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
                        return;
                    }
                }
                this._state = true;
                this._value = newValue;
                finale.call(this);
            } catch (e) {
                reject.call(this, e);
            }
        }
        function reject(newValue) {
            this._state = false;
            this._value = newValue;
            finale.call(this);
        }
        function finale() {
            for (var i = 0, len = this._deferreds.length; i < len; i++) handle.call(this, this._deferreds[i]);
            this._deferreds = null;
        }
        function Handler(onFulfilled, onRejected, resolve, reject) {
            this.onFulfilled = "function" === typeof onFulfilled ? onFulfilled : null;
            this.onRejected = "function" === typeof onRejected ? onRejected : null;
            this.resolve = resolve;
            this.reject = reject;
        }
        function doResolve(fn, onFulfilled, onRejected) {
            var done = false;
            try {
                fn(function(value) {
                    if (done) return;
                    done = true;
                    onFulfilled(value);
                }, function(reason) {
                    if (done) return;
                    done = true;
                    onRejected(reason);
                });
            } catch (ex) {
                if (done) return;
                done = true;
                onRejected(ex);
            }
        }
        Promise.prototype["catch"] = function(onRejected) {
            return this.then(null, onRejected);
        };
        Promise.prototype.then = function(onFulfilled, onRejected) {
            var me = this;
            return new Promise(function(resolve, reject) {
                handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
            });
        };
        Promise.all = function() {
            var args = Array.prototype.slice.call(1 === arguments.length && isArray(arguments[0]) ? arguments[0] : arguments);
            return new Promise(function(resolve, reject) {
                if (0 === args.length) return resolve([]);
                var remaining = args.length;
                function res(i, val) {
                    try {
                        if (val && ("object" === typeof val || "function" === typeof val)) {
                            var then = val.then;
                            if ("function" === typeof then) {
                                then.call(val, function(val) {
                                    res(i, val);
                                }, reject);
                                return;
                            }
                        }
                        args[i] = val;
                        if (0 === --remaining) resolve(args);
                    } catch (ex) {
                        reject(ex);
                    }
                }
                for (var i = 0; i < args.length; i++) res(i, args[i]);
            });
        };
        Promise.resolve = function(value) {
            if (value && "object" === typeof value && value.constructor === Promise) return value;
            return new Promise(function(resolve) {
                resolve(value);
            });
        };
        Promise.reject = function(value) {
            return new Promise(function(resolve, reject) {
                reject(value);
            });
        };
        Promise.race = function(values) {
            return new Promise(function(resolve, reject) {
                for (var i = 0, len = values.length; i < len; i++) values[i].then(resolve, reject);
            });
        };
        var bps = "BrowserPromiseSupport";
        wikiMod[bps] = typeof __Promise !== _undefined;
        if (__Promise) {
            wikiMod.Promise = function(fn) {
                if ("object" !== typeof this) throw new TypeError("Promises must be constructed via new");
                if ("function" !== typeof fn) throw new TypeError("not a function");
                var r;
                if (wikiMod[bps] && __Promise) {
                    try {
                        r = new __Promise(fn);
                    } catch (e) {}
                    if (!r) try {
                        if (uw && uw.Promise && __Promise !== uw.Promise) r = new uw.Promise(fn);
                    } catch (e) {}
                }
                if (!r) r = new Promise(fn);
                return r;
            };
            Object.defineProperties(wikiMod.Promise, {
                race: {
                    get: function() {
                        return wikiMod[bps] && __Promise ? __Promise.race : Promise.race;
                    }
                },
                reject: {
                    get: function() {
                        return wikiMod[bps] && __Promise ? __Promise.reject : Promise.reject;
                    }
                },
                resolve: {
                    get: function() {
                        return wikiMod[bps] && __Promise ? __Promise.resolve : Promise.resolve;
                    }
                },
                all: {
                    get: function() {
                        return wikiMod[bps] && __Promise ? __Promise.all : Promise.all;
                    }
                }
            });
        } else wikiMod.Promise = Promise;
    }();
    +function() {
        function normalizeName(name) {
            if ("string" !== typeof name) name = name.toString();
            if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) throw new TypeError("Invalid character in header field name");
            return name.toLowerCase();
        }
        function normalizeValue(value) {
            if ("string" !== typeof value) value = value.toString();
            return value;
        }
        function Headers(headers) {
            this.map = {};
            var self = this;
            if (headers instanceof Headers) headers.forEach(function(name, values) {
                values.forEach(function(value) {
                    self.append(name, value);
                });
            }); else if (headers) Object.getOwnPropertyNames(headers).forEach(function(name) {
                self.append(name, headers[name]);
            });
        }
        Headers.prototype.append = function(name, value) {
            name = normalizeName(name);
            value = normalizeValue(value);
            var list = this.map[name];
            if (!list) {
                list = [];
                this.map[name] = list;
            }
            list.push(value);
        };
        Headers.prototype["delete"] = function(name) {
            delete this.map[normalizeName(name)];
        };
        Headers.prototype.get = function(name) {
            var values = this.map[normalizeName(name)];
            return values ? values[0] : null;
        };
        Headers.prototype.getAll = function(name) {
            return this.map[normalizeName(name)] || [];
        };
        Headers.prototype.has = function(name) {
            return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers.prototype.set = function(name, value) {
            this.map[normalizeName(name)] = [ normalizeValue(value) ];
        };
        Headers.prototype.forEach = function(callback) {
            var self = this;
            Object.getOwnPropertyNames(this.map).forEach(function(name) {
                callback(name, self.map[name]);
            });
        };
        function consumed(body) {
            if (body.bodyUsed) return wikiMod.Promise.reject(new TypeError("Already read"));
            body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
            return new wikiMod.Promise(function(resolve, reject) {
                reader.onload = function() {
                    resolve(reader.result);
                };
                reader.onerror = function() {
                    reject(reader.error);
                };
            });
        }
        function readBlobAsArrayBuffer(blob) {
            var reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            return fileReaderReady(reader);
        }
        function readBlobAsText(blob) {
            var reader = new FileReader();
            reader.readAsText(blob);
            return fileReaderReady(reader);
        }
        var support = {
            blob: "FileReader" in global && "Blob" in global && function() {
                try {
                    new Blob();
                    return true;
                } catch (e) {
                    return false;
                }
            }(),
            formData: "FormData" in global
        };
        function Body() {
            this.bodyUsed = false;
            this._initBody = function(body) {
                this._bodyInit = body;
                if ("string" === typeof body) this._bodyText = body; else if (support.blob && Blob.prototype.isPrototypeOf(body)) this._bodyBlob = body; else if (support.formData && FormData.prototype.isPrototypeOf(body)) this._bodyFormData = body; else if (!body) this._bodyText = ""; else throw new Error("unsupported BodyInit type");
            };
            if (support.blob) {
                this.blob = function() {
                    var rejected = consumed(this);
                    if (rejected) return rejected;
                    if (this._bodyBlob) return wikiMod.Promise.resolve(this._bodyBlob); else if (this._bodyFormData) throw new Error("could not read FormData body as blob"); else return wikiMod.Promise.resolve(new Blob([ this._bodyText ]));
                };
                this.arrayBuffer = function() {
                    return this.blob().then(readBlobAsArrayBuffer);
                };
                this.text = function() {
                    var rejected = consumed(this);
                    if (rejected) return rejected;
                    if (this._bodyBlob) return readBlobAsText(this._bodyBlob); else if (this._bodyFormData) throw new Error("could not read FormData body as text"); else return wikiMod.Promise.resolve(this._bodyText);
                };
            } else this.text = function() {
                var rejected = consumed(this);
                return rejected ? rejected : wikiMod.Promise.resolve(this._bodyText);
            };
            if (support.formData) this.formData = function() {
                return this.text().then(decode);
            };
            this.json = function() {
                return this.text().then(JSON.parse);
            };
            return this;
        }
        var methods = [ "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT" ];
        function normalizeMethod(method) {
            var upcased = method.toUpperCase();
            return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(url, options) {
            options = options || {};
            this.url = url;
            this.credentials = options.credentials || "omit";
            this.headers = new Headers(options.headers);
            this.method = normalizeMethod(options.method || "GET");
            this.mode = options.mode || null;
            this.referrer = null;
            if (("GET" === this.method || "HEAD" === this.method) && options.body) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(options.body);
        }
        function decode(body) {
            var form = new FormData();
            body.trim().split("&").forEach(function(bytes) {
                if (bytes) {
                    var split = bytes.split("=");
                    var name = split.shift().replace(/\+/g, " ");
                    var value = split.join("=").replace(/\+/g, " ");
                    form.append(decodeURIComponent(name), decodeURIComponent(value));
                }
            });
            return form;
        }
        function headers(xhr) {
            var head = new Headers();
            var pairs = xhr.getAllResponseHeaders().trim().split("\n");
            pairs.forEach(function(header) {
                var split = header.trim().split(":");
                var key = split.shift().trim();
                var value = split.join(":").trim();
                head.append(key, value);
            });
            return head;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
            if (!options) options = {};
            this._initBody(bodyInit);
            this.type = "default";
            this.url = null;
            this.status = options.status;
            this.ok = this.status >= 200 && this.status < 300;
            this.statusText = options.statusText;
            this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
            this.url = options.url || "";
        }
        Body.call(Response.prototype);
        wikiMod.Headers = Headers;
        wikiMod.Request = Request;
        wikiMod.Response = Response;
        wikiMod.fetch = function(input, init) {
            var request;
            if (Request.prototype.isPrototypeOf(input) && !init) request = input; else request = new Request(input, init);
            return new wikiMod.Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                function responseURL() {
                    if ("responseURL" in xhr) return xhr.responseURL;
                    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) return xhr.getResponseHeader("X-Request-URL");
                    return;
                }
                xhr.onload = function() {
                    var status = 1223 === xhr.status ? 204 : xhr.status;
                    if (status < 100 || status > 599) {
                        reject(new TypeError("Network request failed"));
                        return;
                    }
                    var options = {
                        status: status,
                        statusText: xhr.statusText,
                        headers: headers(xhr),
                        url: responseURL()
                    };
                    var body = "response" in xhr ? xhr.response : xhr.responseText;
                    resolve(new Response(body, options));
                };
                xhr.onerror = function() {
                    reject(new TypeError("Network request failed"));
                };
                xhr.open(request.method, request.url, true);
                if ("include" === request.credentials) xhr.withCredentials = true;
                if ("responseType" in xhr && support.blob) xhr.responseType = "blob";
                request.headers.forEach(function(name, values) {
                    values.forEach(function(value) {
                        xhr.setRequestHeader(name, value);
                    });
                });
                xhr.send("undefined" === typeof request._bodyInit ? null : request._bodyInit);
            });
        };
        wikiMod.fetch.polyfill = true;
    }();
    wikiMod.viewportSize = {
        getHeight: function() {
            return this.getSize("Height");
        },
        getWidth: function() {
            return this.getSize("Width");
        },
        getSize: function(Name) {
            var size;
            var name = Name.toLowerCase();
            var win = window || uw || global;
            var doc = wikiMod.document;
            var head = wikiMod.head;
            var documentElement = doc.documentElement;
            if (win["inner" + Name] === undefined) size = documentElement["client" + Name]; else if (win["inner" + Name] != documentElement["client" + Name]) {
                var bodyElement = doc.createElement("body");
                bodyElement.id = "vpw-test-b";
                bodyElement.style.cssText = "overflow:scroll";
                var divElement = doc.createElement("div");
                divElement.id = "vpw-test-d";
                divElement.style.cssText = "position:absolute;top:-1000px";
                divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
                bodyElement.appendChild(divElement);
                documentElement.insertBefore(bodyElement, head);
                if (7 == divElement["offset" + Name]) size = documentElement["client" + Name]; else size = win["inner" + Name];
                documentElement.removeChild(bodyElement);
            } else size = win["inner" + Name];
            return size;
        }
    };
    function Watcher(obj, property, handler) {
        if (!(Watcher.browserSupportsWatch && "function" === typeof obj.watch) || !Watcher.browserSupportsObserve) throw new Error("Browser does not support watch or observe");
        if (obj.__watcher) {
            obj.__watcher.add(property, handler);
            return obj.__watcher;
        }
        var _this = this;
        _this.target = obj;
        _this.properties = {};
        if (property && handler) {
            _this.defaultHandler = handler;
            _this.properties[property] = handler;
        }
        _this.enabled = true;
        obj.__watcher = this;
        if (Watcher.browserSupportsWatch && "function" === typeof obj.watch) {
            if (property && handler) obj.watch(property, handler);
        } else if (Watcher.browserSupportsObserve) Object.observe(obj, function(changes) {
            var i = 0, errs = [];
            for (i; i < changes.length; i++) {
                var change = changes[i], changeObj = change.object, changeName = change.name, changeOldValue = change.oldValue, changeType = change.type, changeWatcher = change.__watcher || _this || this;
                if (!changeWatcher || !changeWatcher.enabled || "__watcher" === changeName || !changeWatcher.properties[changeName]) return;
                try {
                    (changeWatcher.properties[changeName] || changeWatcher.defaultHandler).call(changeObj, changeName, changeOldValue, changeObj[changeName]);
                } catch (e) {
                    changeWatcher.enabled = false;
                    switch (type) {
                      case "update":
                        changeObj[changeName] = changeOldValue;
                        break;
 
                      case "add":
                        delete changeObj[changeName];
                        break;
 
                      case "delete":
                        changeObj[changeName] = changeOldValue;
                    }
                    changeWatcher.enabled = true;
                    errs.push(e);
                }
            }
            if (errs.length > 0) throw errs;
        });
        return _this;
    }
    Watcher.displayName = "Watcher";
    Watcher.browserSupportsWatch = Object.prototype.watch ? true : false;
    Watcher.browserSupportsObserve = Object.observe ? true : false;
    Watcher.prototype = {
        add: function(property, handler) {
            if (property && (handler || this.defaultHandler)) {
                if (!this.defaultHandler && handler) this.defaultHandler = handler;
                this.properties[property] = handler || null;
                if (Watcher.browserSupportsWatch && "function" === typeof obj.watch) obj.watch(property, handler || this.defaultHandler);
            }
            return this;
        },
        unwatch: function(property) {
            this.enabled = false;
            if (property) {
                if (this.properties[property]) delete this.properties[property];
                if (Watcher.browserSupportsWatch) this.target.unwatch(property);
            } else for (var prop in this.properties) if (prop) this.unwatch(prop);
            this.enabled = true;
            return this;
        }
    };
    wikiMod.Watcher = Watcher;
    var _editCountCache = {};
    wikiMod.EditCount = function(_name, _wikiName, callback) {
        if (!_name) throw new Error("Username Required");
        var i = 0, tmpDBName = wikiMod.wg("wgDBname") || "deadisland", wikiNameType = RealTypeOf(_wikiName);
        this.username = _name;
        try {
            if ("array" == wikiNameType && _wikiName.length > 0) try {
                this.defaultWikiName = _wikiName[0] + "" || tmpDBName;
            } catch (e) {} else this.defaultWikiName = (_wikiName || tmpDBName) + "";
        } catch (e) {}
        if (!this.defaultWikiName) this.defaultWikiName = tmpDBName;
        this.AllWikisCountLoaded = false;
        this.WikiNamesLoaded = [];
        if (!_editCountCache[_name]) _editCountCache[_name] = {};
        if ("array" == wikiNameType) for (i; i < _wikiName.length; i++) this.getData(function() {}, _wikiName[i]); else this.getData(callback || function() {}, this.defaultWikiName);
    };
    wikiMod.EditCount.prototype.isWikiLoaded = function(wikiName) {
        return this.WikiNamesLoaded.indexOf(wikiName || this.defaultWikiName) > -1;
    };
    wikiMod.EditCount.prototype.getAllWikisData = function() {
        if (!this.AllWikisCountLoaded) {
            this.getData(function() {}, this.defaultWikiName);
            return null;
        }
        return _editCountCache[this.username]["__AllWikis"];
    };
    wikiMod.EditCount.prototype.getAllWikiData = function(_wikiName) {
        var wikiName = _wikiName || this.defaultWikiName;
        if (!this.isWikiLoaded(wikiName)) {
            this.getData(function() {}, wikiName);
            return null;
        }
        return _editCountCache[this.username][wikiName];
    };
    wikiMod.EditCount.prototype.getData = function(callback, _wikiName, _namespace, allWikis) {
        var _thisEditCount = this, _thisUsername = _thisEditCount.username, wikiName = _wikiName || _thisEditCount.defaultWikiName || wikiMod.wg("wgDBname") || "deadisland", url = "http://" + wikiName + ".wikia.com/wiki/Special:Editcount/" + _thisEditCount.username, namespace = _namespace || "__Total", tmpValue;
        if (!_editCountCache[_thisUsername]) _editCountCache[_thisUsername] = {};
        if (!_editCountCache[_thisUsername][wikiName]) _editCountCache[_thisUsername][wikiName] = {};
        if (!_editCountCache[_thisUsername]["__AllWikis"]) _editCountCache[_thisUsername]["__AllWikis"] = {};
        if (allWikis) {
            if (_editCountCache[_thisUsername]["__AllWikis"][namespace]) {
                tmpValue = _editCountCache[_thisUsername]["__AllWikis"][namespace];
                if (callback) callback(tmpValue);
                return tmpValue;
            }
        } else if (_editCountCache[_thisUsername][wikiName][namespace]) {
            tmpValue = _editCountCache[_thisUsername][wikiName][namespace];
            if (callback) callback(tmpValue);
            return tmpValue;
        }
        var extractNumbers = function(str) {
            var out = str + "";
            try {
                out = out.replace(/[^\d\.]/g, "");
            } catch (e) {}
            try {
                return parseInt(out);
            } catch (e) {}
            return out;
        };
        var extractNumbersFromEl = function(el) {
            var tmp = extractNumbers($(el).html() + "");
            try {
                return parseInt(tmp);
            } catch (e) {
                return tmp;
            }
        };
        if (wikiMod.jQueryAvailable) {
            wikiMod.EditCount.runningAjax = (wikiMod.EditCount.runningAjax || 0) + 1;
            if (1 === wikiMod.EditCount.runningAjax) {
                wikiMod.EditCount.oldAjaxCrossDomainValue = "oldAjaxCrossDomainValue" in wikiMod.EditCount ? wikiMod.EditCount.oldAjaxCrossDomainValue : $.ajaxSettings.crossDomain;
                $.ajaxSetup({
                    crossDomain: true
                });
            }
            var el = wikiMod.document.createElement("div");
            $(el).load(url + " #editcount .TablePager", function() {
                var $trList = $(el).find("tbody > tr");
                $trList.each(function(index, element) {
                    var $_this = $(this), tmp = "";
                    if (0 == index) ; else if (1 == index) {
                        var $thTotals = $_this.children("th");
                        tmp = extractNumbersFromEl($thTotals.eq(0));
                        _editCountCache[_thisUsername][wikiName].__Total = tmp;
                        tmp = extractNumbersFromEl($thTotals.eq(3));
                        _editCountCache[_thisUsername]["__AllWikis"].__Total = tmp;
                    } else {
                        var $tds = $_this.children("td"), rowNamespace = $tds.eq(0).html(), rowCurrentWikiCount = extractNumbersFromEl($tds.eq(1)), rowAllWikisCount = extractNumbersFromEl($tds.eq(4));
                        try {
                            rowNamespace = rowNamespace.trim();
                        } catch (e) {}
                        _editCountCache[_thisUsername][wikiName][rowNamespace] = rowCurrentWikiCount;
                        _editCountCache[_thisUsername]["__AllWikis"][rowNamespace] = rowAllWikisCount;
                    }
                });
                _thisEditCount.AllWikisCountLoaded = true;
                _thisEditCount.WikiNamesLoaded.push(wikiName);
                try {
                    if (allWikis) {
                        if (callback) callback(_editCountCache[_thisUsername]["__AllWikis"][namespace]);
                        return;
                    } else {
                        if (callback) callback(_editCountCache[_thisUsername][wikiName][namespace]);
                        return;
                    }
                } catch (e) {
                    console.log("Error!", e);
                }
            });
            try {
                wikiMod.EditCount.runningAjax--;
            } catch (e) {}
            if (!wikiMod.EditCount.runningAjax || wikiMod.EditCount.runningAjax <= 0) {
                $.ajaxSetup({
                    crossDomain: wikiMod.EditCount.oldAjaxCrossDomainValue
                });
                if ("oldAjaxCrossDomainValue" in wikiMod.EditCount) try {
                    delete $.ajaxSettings.crossDomain;
                    delete wikiMod.EditCount.oldAjaxCrossDomainValue;
                } catch (e) {}
            }
        } else throw new Error("jQuery Not Available!!");
    };
    wikiMod.Events = {
        e: {},
        fired: {},
        addEvent: function(name, recordEvent) {
            this.e[name] = {
                recordEvent: typeof recordEvent !== _undefined ? recordEvent : true,
                listeners: []
            };
            Object.defineProperty(wikiMod, name, new function(propName) {
                return {
                    set: function(callback) {
                        wikiMod.Events.addListener(propName, callback);
                    },
                    get: function() {
                        return typeof wikiMod.Events.fired[propName] !== _undefined;
                    },
                    enumerable: false
                };
            }(name));
        },
        addListener: function(name, callback, fireRecorded) {
            this.e[name].listeners.push(callback);
            fireRecorded = typeof fireRecorded !== _undefined ? fireRecorded : true;
            if (fireRecorded && typeof this.fired[name] !== _undefined && typeof this.fired[name].args !== _undefined) callback.apply(this.fired[name]._this, this.fired[name].args);
        },
        fire: function(name, data) {
            if (typeof this.e[name] !== _undefined) {
                if (typeof this.fired[name] === _undefined) this.fired[name] = {
                    count: 0,
                    args: undefined,
                    _this: null
                };
                var args;
                var _this = null;
                if ("object" == typeof data && typeof data._this !== _undefined && typeof data.args !== _undefined) {
                    _this = data._this;
                    args = data.args;
                } else args = Slice.call(arguments, 1);
                if (this.e[name].recordEvent) {
                    this.fired[name].args = args;
                    this.fired[name]._this = _this;
                }
                var putBack = [];
                while (i = this.e[name].listeners.pop()) if (!i.apply(_this, args)) putBack.push(i);
                this.e[name].listeners = putBack;
                this.fired[name].count++;
            }
        }
    };
    wikiMod.Events.addEvent("onMediaWiki");
    wikiMod.Events.addEvent("onLoad");
    wikiMod.Events.addEvent("onPageReady");
    wikiMod.Events.addEvent("DOMContentLoaded");
    wikiMod.Events.addEvent("onreadystatechange");
    wikiMod.Events.addEvent("afterscriptexecute", false);
    wikiMod.Events.addEvent("beforescriptexecute", false);
    var loadedList = {};
    function isMimeType(str) {
        return "string" == typeof str && /^\w+\/\w+$/, test(str) ? true : false;
    }
    var wikiModLoad_v1 = function(name, _cb) {
        if (!name) return false;
        var allowDuplicateScripts = true === _cb;
        var lName = name.toLowerCase();
        var fireCB = function(val) {
            if ("function" == typeof _cb) setAsap(function() {
                if (val && ("object" == typeof val || "function" == typeof val) && "function" == typeof val.then) try {
                    return val.then(_cb, _cb);
                } catch (e) {}
                try {
                    _cb(val);
                } catch (e) {}
            });
        };
        if (!allowDuplicateScripts) {
            if (name in loadedList) {
                fireCB(loadedList[name]);
                return loadedList[name];
            }
            if (lName in loadedList) {
                fireCB(loadedList[name]);
                return loadedList[lName];
            }
        }
        var execRequire = false;
        switch (lName) {
          case "wikia.jquery.ui":
          case "jquery.ui":
          case "jqueryui":
            name = "wikia.jquery.ui";
            execRequire = true;
            break;
 
          case "wikia.mediawiki":
          case "mediawiki":
          case "mw":
            name = "wikia.mediawiki";
            execRequire = true;
            break;
 
          case "wikia.jquery.loaders":
          case "jquery.loaders":
          case "jqueryloaders":
            name = "wikia.jquery.loaders";
            execRequire = true;
            break;
 
          case "wikimod.animate":
          case "animate":
            name = "wikimod.animate";
            execRequire = true;
        }
        if (execRequire) {
            if (name in loadedList) {
                fireCB(loadedList[name]);
                return loadedList[name];
            }
            loadedList[name] = wikiMod.require(name);
            fireCB(loadedList[name]);
            return loadedList[name];
        }
        if (name.length > 10 && isValidURL(name)) return wikiMod.loadURL.apply(this, arguments);
        var mwLoaderNames = wikiMod.mw ? wikiMod.mw.loader.getModuleNames() : [];
        if (definitions[name] || wikiMod.isDefined(name) || mwLoaderNames.indexOf(name) > -1) {
            loadedList[name] = wikiMod.require(name);
            fireCB(loadedList[name]);
            return loadedList[name];
        } else if (definitions[lName] || wikiMod.isDefined(lName) || mwLoaderNames.indexOf(lName) > -1) {
            loadedList[lName] = wikiMod.require(lName);
            fireCB(loadedList[lName]);
            return loadedList[lName];
        }
        console.log("Name Not Loaded: ", name, isURLPatt.test(name));
        return false;
    };
    var wikiModLoad_v2 = function(modules, type, async) {
        var modulesType = typeof modules, realModulesType = RealTypeOf(modules), typeType = typeof type;
        type = type || "text/javascript";
        var processItem = function(item) {
            if (/\:\/\//.test(item) && isURLPatt.test(item)) {
                if (!type || !isMimeType(type)) type = "text/javascript";
                if (item in loadedList) return loadedList[item];
                if ("text/css" == type) return loadedList[item] = wikiMod.addStylesheet(item); else return loadedList[item] = addScript({
                    src: item,
                    type: type
                });
            } else {
                var lItem = item.toLowerCase();
                var mwLoaderNames = wikiMod.mw ? wikiMod.mw.loader.getModuleNames() : [];
                if (definitions[item] || wikiMod.isDefined(item) || mwLoaderNames.indexOf(item) > -1) return wikiMod.require(item); else if (definitions[lItem] || wikiMod.isDefined(lItem) || mwLoaderNames.indexOf(lItem) > -1) return wikiMod.require(lItem);
            }
            if (debug) console.log("wikiMod.load error. Cannot find module ", item);
            if (wikiMod.mw && wikiMod.mw.loader) return wikiMod.mw.loader.load(item);
        };
        if ("array" == realModulesType) {
            var r = [];
            for (var i = 0; i < modules.length; i++) r.push(processItem(modules[i]));
            return r;
        } else if ("string" == modulesType) return processItem(modules);
        return undefined;
    };
    wikiMod.load = function(name, allowDuplicateScripts, cb) {
        if (!name) return false;
        var args = arguments, length = args.length, argType1 = typeof name, argType2 = typeof allowDuplicateScripts, argType3 = typeof cb;
        if (length < 4 && "string" == argType1 && isValidURL(name) && ([ "boolean", "function", _undefined ].indexOf(argType2) > -1 || null === allowDuplicateScripts) && ([ "function", _undefined ].indexOf(argType3) > -1 || null === cb)) return wikiMod.loadURL.apply(this, args); else if (length < 3 && "string" == argType1 && (argType2 == _undefined || "boolean" == argType2 || "function" == argType2 || null === allowDuplicateScripts)) return wikiModLoad_v1(name, allowDuplicateScripts);
        return wikiModLoad_v2.apply(this, args);
    };
    wikiMod.loadURL = function(url, allowDuplicateScripts, cb) {
        if (!url || "string" != typeof url || !isValidURL(url)) return false;
        if ("function" == typeof allowDuplicateScripts) {
            cb = allowDuplicateScripts;
            allowDuplicateScripts = false;
        } else allowDuplicateScripts = true === allowDuplicateScripts;
        var r, timeoutFn, fired = false, fireCB = function(val) {
            if (!fired && "function" == typeof cb) {
                fired = true;
                if (timeoutFn) try {
                    clearTimeout(timeoutFn);
                } catch (e) {}
                setAsap(function() {
                    if (val && ("object" == typeof val || "function" == typeof val) && "function" == typeof val.then) try {
                        return val.then(cb, cb);
                    } catch (e) {}
                    try {
                        cb(val || loadedList[url] || r);
                    } catch (e) {}
                });
            }
        };
        if (url in loadedList && !allowDuplicateScripts) {
            fireCB(loadedList[url]);
            return loadedList[url];
        }
        r = wikiMod.$('script[src*="' + url + '"]');
        if (r && !allowDuplicateScripts) {
            fireCB(r);
            return r;
        } else {
            loadedList[url] = addScript({
                src: url,
                onload: "function" == typeof cb ? fireCB : undefined
            });
            if ("function" == typeof cb) timeoutFn = setTimeout(function() {
                fireCB(loadedList[url]);
            }, 5e3);
            return loadedList[url];
        }
        return false;
    };
    var jQueryLoaderFunctions = '+function(e,t){e[t]=function(o,n,i,r,a){var c=new jQuery.Deferred;return"undefined"===i?(e().log("loading "+o,t),n="string"==typeof n?[n]:n,e.getResources(n,function(){e().log(o+" loaded",t),"function"==typeof r&&r()},a).then(function(){c.resolve()}).fail(function(){c.reject()})):(e().log(o+" already loaded",t),"function"==typeof r&&r(),c.resolve()),c.promise()},e.loadYUI=function(e){return {{mw}}.loader.use("wikia.yui").done(e)},e.loadModalJS=function(e){"function"==typeof e&&e()},e.loadJQueryUI=function(e){return {{mw}}.loader.use("wikia.jquery.ui").done(e)},e.loadJQueryAutocomplete=function(e){return {{mw}}.loader.use("jquery.autocomplete").done(e)},e.loadJQueryAIM=function(e){return {{mw}}.loader.use("wikia.aim").done(e)},e.loadMustache=function(e){return {{mw}}.loader.use("jquery.mustache").done(e)},e.loadHandlebars=function(e){return {{mw}}.loader.use("wikia.handlebars").done(e)},e.loadGoogleMaps=function(o){var n=new jQuery.Deferred,i=function(){"function"==typeof o&&o(),n.resolve()};return"undefined"!=typeof(window.google&&window.google.maps)?i():(window.onGoogleMapsLoaded=function(){delete window.onGoogleMapsLoaded,i()},e[t]("GoogleMaps",[{url:"http://maps.googleapis.com/maps/api/js?sensor=false&callback=onGoogleMapsLoaded",type:"js"}],typeof(window.google&&window.google.maps)).fail(function(){n.reject()})),n.promise()},e.loadGooglePlusAPI=function(o){return e[t]("Google Plus API","//apis.google.com/js/plusone.js",typeof(window.gapi&&window.gapi.plusone),o)},e.loadTwitterAPI=function(o){return e[t]("Twitter API","//platform.twitter.com/widgets.js",typeof(window.twttr&&window.twttr.widgets),o)}}(jQuery,"loadLibrary");', jQueryLoaderFunctions_unsafe, jQueryLoaderFunctions_safe, jQueryLoaderFunctionsAdded = false;
    function __getJQuery() {
        var t = (uw ? uw.jQuery || uw.$ : undefined) || window.jQuery || window.$ || global.jQuery || global.$ || wikiMod.jQuery;
        return typeof t == _function ? t : undefined;
    }
    function custom_module_def(name, data) {
        var tServer, tPath = data.url || data.path || data.wikipath, tInit = "function" == typeof data.init ? data.init : null, testURLs = [];
        if (tPath && (data.server || data.wikipath || data.wikiname || !/^(?:[a-zA-Z]{2,6})?:\/\//.test(tPath))) tServer = data.server || data.wikiname || null;
        if (data.fileName) if ("array" == RealTypeOf(data.fileName)) testURLs.concat(data.fileName); else if ("string" == typeof data.fileName) testURLs.push(data.fileName);
        if (tPath && "undefined" == typeof tServer) testURLs.push(tPath);
        var findElement = function() {
            var r, i;
            if (testURLs.length) for (i = 0; i < testURLs.length; i++) {
                if (!data.type || "js" == data.type) r = wikiMod.$('script[src*="' + testURLs[i] + '"]'); else if ("css" == data.type) r = wikiMod.$('link[href*="' + testURLs[i] + '"]');
                if (r) return r;
            }
            return false;
        };
        var getValue = function() {
            var i, r;
            if (data.global) if ("array" == RealTypeOf(data.global)) {
                for (i = 0; i < data.global.length; i++) if ("string" == typeof data.global[i]) {
                    r = window[data.global[i]] || global[data.global[i]];
                    if (r) return r;
                }
            } else if ("string" == typeof data.global) {
                r = window[data.global] || global[data.global];
                if (r) return r;
            }
            if ("function" == typeof data.test) return data.test.apply(this, arguments) || false;
        }, testFn = function() {
            return findElement.apply(this, arguments) || getValue.apply(this, arguments) || false;
        }, initStarted = false, initFn = function() {
            var r;
            if (!initStarted) {
                initStarted = true;
                if (tInit) {
                    try {
                        r = tInit.apply(this, arguments);
                    } catch (e) {}
                    return r;
                }
            }
        }, check = function() {
            if (wikiMod.isDefined(name)) {
                if (defineCache[name].value) return defineCache[name].value;
                return defineCache[name].definition();
            }
            return ("function" == typeof data.get ? data.get.apply(this, arguments) : undefined) || getValue.apply(this, arguments) || undefined;
        }, getFn = function() {
            var _this = this, args = Slice.call(arguments), r = check.apply(_this, args);
            if (r) return wikiMod.Promise.resolve(r);
            return new wikiMod.Promise(function(resolve, reject) {
                var responded = false, respond = function(a) {
                    if (!responded) {
                        responded = true;
                        resolve(a);
                    }
                };
                wikiMod.onDefined(name, respond);
                if (findElement.apply(_this, args) && !check.apply(_this, args) && "function" == typeof window.require) try {
                    window.require([ name ], function() {}, function() {});
                } catch (e) {}
                var c = 0, wait;
                wait = function() {
                    if (!responded) {
                        c++;
                        r = check.apply(_this, args);
                        if (r || c > 500) return respond(r);
                        setTimeout(wait, 35);
                    }
                };
                wait();
            });
        };
        var r = {
            type: data.type || "js",
            dependencies: data.dependencies || data.dep || [],
            test: testFn
        };
        if (tPath) {
            if (data.url) r.url = tPath; else if (data.wikipath) r.wikipath = tPath; else r.path = tPath;
            if (tServer) if (data.server) r.server = tServer; else r.wikiname = tServer;
        }
        if (tInit && initFn) r.init = initFn;
        if (data.wait && getFn) r.get = getFn;
        return r;
    }
    var definitions = {
        jquery: {
            type: "js",
            test: function() {
                return __getJQuery() || false;
            }
        },
        "wikia.jquery": {
            type: "alias",
            target: "jquery"
        },
        "wikimod.jquery": {
            type: "alias",
            target: "jquery"
        },
        "wikia.jquery.loaders": {
            type: "js",
            dependencies: [ "jquery" ],
            test: function() {
                return jQueryLoaderFunctionsAdded;
            },
            init: function(_jquery) {
                if (jQueryLoaderFunctionsAdded) return _jquery || true;
                if (!jQueryLoaderFunctions_unsafe) jQueryLoaderFunctions_unsafe = jQueryLoaderFunctions.replace(/\{\{mw\}\}/g, '(window.mw||window.mediaWiki||("undefined"!=typeof wikiMod?wikiMod.mw:("undefined"!=typeof mw?mw:null)))');
                if (!jQueryLoaderFunctions_safe) jQueryLoaderFunctions_safe = jQueryLoaderFunctions.replace(/\{\{mw\}\}/g, '("undefined"!=typeof unsafeWindow&&unsafeWindow.top?(unsafeWindow.mw||unsafeWindow.mediaWiki||(wikiMod.mw || null)):("undefined"!=typeof wikiMod&&wikiMod.mw?wikiMod.mw:(window.mw||window.mediaWiki||null)))');
                if (wikiMod.jQueryAvailable || _jquery && typeof _jquery == _function) if (uw) {
                    if (uw.jQuery && !uw.jQuery.loadJQueryUI) try {
                        uw.eval(jQueryLoaderFunctions_unsafe);
                        jQueryLoaderFunctionsAdded = true;
                    } catch (e) {
                        console.log("Error adding jQuery Functions", e);
                    }
                    if (($ || _jquery) && !($ || _jquery).loadJQueryUI) try {
                        (global.eval || window.eval)(jQueryLoaderFunctions_safe);
                        jQueryLoaderFunctionsAdded = true;
                    } catch (e) {
                        console.log("Error adding jQuery Functions", e);
                    }
                    if (!jQueryLoaderFunctionsAdded && (uw.jQuery && uw.jQuery.loadJQueryUI || $ && $.loadJQueryUI)) jQueryLoaderFunctionsAdded = true;
                    return _jquery || uw.jQuery || $;
                } else {
                    var tmpjQuery = _jquery || __getJQuery();
                    if (tmpjQuery) if (tmpjQuery.loadJQueryUI) jQueryLoaderFunctionsAdded = true; else try {
                        window.eval(jQueryLoaderFunctions_safe);
                        jQueryLoaderFunctionsAdded = true;
                    } catch (e) {
                        console.log("Error adding jQuery Functions", e);
                    }
                    if (!jQueryLoaderFunctionsAdded && tmpjQuery && tmpjQuery.loadJQueryUI) jQueryLoaderFunctionsAdded = true;
                    return tmpjQuery || false;
                }
                return false;
            },
            get: function(_jquery) {
                return _jquery && typeof _jquery == _function ? _jquery : __getJQuery() || false;
            }
        },
        "jquery.loaders": {
            type: "alias",
            target: "wikia.jquery.loaders"
        },
        jqueryloaders: {
            type: "alias",
            target: "wikia.jquery.loaders"
        },
        "wikia.jquery.ui": function() {
            var getJQ = function(_jquery) {
                return _jquery && "function" == typeof _jquery ? _jquery : __getJQuery();
            };
            return {
                type: "js",
                dependencies: [ "jquery.loaders" ],
                test: function(_jquery) {
                    if (wikiMod.mw && wikiMod.mw.loader) {
                        var names = wikiMod.mw.loader.getModuleNames();
                        if (names.indexOf("jquery.ui.core") > -1) if ("ready" == wikiMod.mw.loader.getState("jquery.ui.core")) return getJQ(_jquery) || false;
                    }
                    return false;
                },
                init: function(_jquery) {
                    try {
                        if (wikiMod.mw && wikiMod.mw.loader) try {
                            var names = wikiMod.mw.loader.getModuleNames() || [];
                            if (names.indexOf("jquery.ui.core") > -1) return new wikiMod.Promise(function(resolve, reject) {
                                var responded = false, _resolve = function() {
                                    if (responded) return;
                                    responded = true;
                                    resolve(getJQ(_jquery));
                                };
                                wikiMod.mw.loader.use("jquery.ui.core").done(function(a) {
                                    _resolve();
                                });
                                setTimeout(function() {
                                    _resolve();
                                }, 200);
                            });
                        } catch (e) {}
                        if (getJQ(_jquery).loadJQueryUI) {
                            getJQ(_jquery).loadJQueryUI();
                            return getJQ(_jquery);
                        } else if (uw && uw.jQuery && uw.jQuery.loadJQueryUI) {
                            uw.jQuery.loadJQueryUI();
                            return getJQ(_jquery);
                        }
                    } catch (e) {}
                    return false;
                },
                get: function(_jquery) {
                    return getJQ(_jquery) || wikiMod.jQuery;
                }
            };
        }(),
        "jquery.ui": {
            type: "alias",
            target: "wikia.jquery.ui"
        },
        "wikimod.animate": {
            type: "css",
            path: "User:Jgjake2/css/animate.css",
            server: "deadisland",
            test: function() {
                return wikiMod.$('link[href*="animate.css"]') || false;
            }
        },
        animate: {
            type: "alias",
            target: "wikimod.animate"
        },
        "wikimod.velocity": custom_module_def("wikimod.velocity", {
            type: "js",
            dependencies: [ "jquery" ],
            path: "User:Jgjake2/js/velocity.min.js",
            server: "deadisland",
            wait: true,
            fileName: [ "velocity.js", "velocity.min.js" ],
            test: function(_jquery) {
                var r, win = uw || window, _jq = _jquery && "function" == typeof _jquery ? _jquery : __getJQuery();
                if (_jq) r = _jq && _jq.Velocity ? _jq.Velocity : false;
                if (!r && win) {
                    r = win.Velocity || (win.jQuery && win.jQuery.Velocity ? win.jQuery.Velocity : win.$ && win.$.Velocity ? win.$.Velocity : false);
                    if (r && !r.Promise) r.Promise = wikiMod.Promise;
                }
                return r || false;
            }
        }),
        "jquery.velocity": {
            type: "alias",
            target: "wikimod.velocity"
        },
        velocity: {
            type: "alias",
            target: "wikimod.velocity"
        },
        "wikimod.steamapi": custom_module_def("wikimod.steamapi", {
            type: "js",
            dependencies: [ "jquery" ],
            path: "User:Jgjake2/js/SteamAPI.js",
            server: "deadisland",
            wait: true,
            fileName: [ "wikiaSteamAPI.js", "wikiaSteamAPI.min.js", "SteamAPI.js", "SteamAPI.min.js" ],
            test: function(_jquery) {
                var r, win = uw || window;
                r = win.wikiaSteamAPI || global.wikiaSteamAPI || win.SteamAPI || global.SteamAPI || false;
                return r || false;
            }
        }),
        steamapi: {
            type: "alias",
            target: "wikimod.steamapi"
        },
        "wikimod.bigtext": custom_module_def("wikimod.bigtext", {
            type: "js",
            dependencies: [ "jquery" ],
            path: "User:Jgjake2/js/bigtext.min.js",
            server: "deadisland",
            wait: true,
            fileName: [ "bigtext.js", "bigtext.min.js" ],
            test: function(_jquery) {
                var r, win = uw || window, _jq = _jquery && "function" == typeof _jquery ? _jquery : __getJQuery();
                if (_jq) r = _jq && _jq.BigText ? _jq.BigText : false;
                if (!r && win) r = win.BigText || (win.jQuery && win.jQuery.BigText ? win.jQuery.BigText : win.$ && win.$.BigText ? win.$.BigText : false);
                return r || false;
            }
        }),
        "jquery.bigtext": {
            type: "alias",
            target: "wikimod.bigtext"
        },
        bigtext: {
            type: "alias",
            target: "wikimod.bigtext"
        },
        "wikia.mediawiki": {
            type: "js",
            init: function() {
                var path = wikiMod.wg("wgCdnRootUrl") + "/__load/-/debug%3Dfalse%26only%3Dscripts/mediawiki";
                return addScript({
                    src: path,
                    prepend: true
                });
            },
            test: function() {
                var script = wikiMod.$('script[src*="scripts/mediawiki"]') || wikiMod.$('script[src*="jquery,mediawiki"]') || wikiMod.$('script[src*="mediawiki"]');
                try {
                    if (script && script.src.indexOf("__load") == -1) script = null;
                } catch (e) {
                    script = null;
                }
                if (!wikiMod.mw && !script) return false;
                return wikiMod.mw;
            },
            get: function() {
                if (wikiMod.mw) return wikiMod.Promise.resolve(wikiMod.mw);
                var r, c = 0, wait, check = function() {
                    return wikiMod.mw;
                };
                return new wikiMod.Promise(function(resolve, reject) {
                    wait = function() {
                        c++;
                        r = check();
                        if (r || c > 500) return resolve(r);
                        setTimeout(wait, 35);
                    };
                    wait();
                });
            }
        },
        mediawiki: {
            type: "alias",
            target: "wikia.mediawiki"
        },
        mw: {
            type: "alias",
            target: "wikia.mediawiki"
        }
    };
    var DEFINITION_STATES = {
        DNE: 0,
        NOT_LOADED: 1,
        WORKING: 2,
        READY: 3
    };
    Object.defineProperties(definitions, {
        DEFINITION_STATES: {
            value: DEFINITION_STATES,
            enumerable: false,
            configurable: false,
            writable: false
        },
        definitionExists: {
            value: function(id) {
                if (!id || "string" != typeof id) throw new TypeError("Invalid Id");
                return definitions[id] ? true : false;
            },
            enumerable: false,
            configurable: false,
            writable: false
        },
        getTargetId: {
            value: function(id) {
                try {
                    if (!definitions.definitionExists(id)) return null;
                } catch (e) {
                    return null;
                }
                if ("alias" != definitions[id].type) {
                    try {
                        if (!definitions[id].target || !definitions.definitionExists(definitions[id].target)) return null;
                    } catch (e) {
                        return null;
                    }
                    return definitions[id].target;
                }
                return id;
            },
            enumerable: false,
            configurable: false,
            writable: false
        },
        definitionState: {
            value: function(id) {
                id = definitions.getTargetId(id);
                if (!id || "string" != typeof id || !definitions[id]) return DEFINITION_STATES.DNE;
                if (requireCache[id]) return DEFINITION_STATES.READY;
                switch (id) {
                  case "jquery":
                  case "wikia.jquery":
                  case "wikimod.jquery":
                    if (false !== definitions.jquery.test()) return DEFINITION_STATES.READY;
                    break;
 
                  case "mw":
                  case "wikia.mw":
                  case "mediawiki":
                  case "wikia.mediawiki":
                    if (false !== definitions["wikia.mediawiki"].test()) return DEFINITION_STATES.READY;
                }
                if (definitions[id].working && "function" == typeof definitions[id].working.then) return DEFINITION_STATES.WORKING;
                return DEFINITION_STATES.EXISTS;
            },
            enumerable: false,
            configurable: false,
            writable: false
        },
        isReady: {
            value: function(id) {
                return definitions.definitionState(id) == DEFINITION_STATES.READY;
            },
            enumerable: false,
            configurable: false,
            writable: false
        }
    });
    var requireCache = {};
    var defineCache = {};
    wikiMod.require = function(ids, callback, err, rChain) {
        wikiMod.try_mwRegister();
        if (!ids) {
            try {
                if (err) err("Invalid Id");
            } catch (e) {}
            return wikiMod.Promise.reject("Invalid Id");
        }
        var length = arguments.length, all, proms = [];
        if ("string" == typeof ids) ids = [ ids ]; else if ("array" != RealTypeOf(ids)) {
            try {
                if (err) err("Invalid Id Type");
            } catch (e) {}
            return wikiMod.Promise.reject("Invalid Id Type");
        }
        if (3 == length && ("array" == RealTypeOf(err) || "string" == typeof err)) {
            rChain = err;
            err = undefined;
        } else if (2 == length && ("array" == RealTypeOf(callback) || "string" == typeof callback)) {
            rChain = callback;
            callback = undefined;
        }
        rChain = rChain || [];
        if ("array" != RealTypeOf(rChain)) if ("string" == typeof rChain) rChain = [ rChain ]; else rChain = [];
        var __require = function(id, chain, aliasParent) {
            if ("wikimod" == id.toLowerCase()) return wikiMod.Promise.resolve(wikiMod);
            if ("jquery" == id && !uw && (window.jQuery || window.$ || wikiMod.jQuery)) return wikiMod.Promise.resolve(window.jQuery || window.$ || wikiMod.jQuery);
            if (requireCache[id]) return wikiMod.Promise.resolve(requireCache[id]);
            var _me = this;
            chain = chain || [];
            if (chain.indexOf(id) > -1) return wikiMod.Promise.resolve(false);
            if (definitions[id] && "alias" == definitions[id].type) {
                if (definitions[id].target && definitions[id].target !== id && (!aliasParent || definitions[id].target !== aliasParent)) return __require(definitions[id].target, chain, id);
                throw new Error("Invalid Alias Target");
            }
            var newChain = chain.slice();
            newChain.push(id);
            var depsResolved = false;
            var resolveDependencies = function() {
                var tDep = definitions[id].dependencies || definitions[id].dep;
                if (depsResolved || !tDep || "string" != typeof tDep && "array" != RealTypeOf(tDep)) {
                    depsResolved = depsResolved || [];
                    return wikiMod.Promise.resolve(depsResolved);
                }
                if ("string" == typeof tDep) tDep = [ tDep ];
                return new wikiMod.Promise(function(resolve, reject) {
                    setAsap(function() {
                        var tDepArr = [];
                        for (var i = 0; i < tDep.length; i++) if (chain.indexOf(tDep[i]) == -1) tDepArr.push(tDep[i]);
                        if (tDepArr.length > 0) return wikiMod.require(tDepArr, newChain).then(function(a) {
                            if ("array" == RealTypeOf(a)) depsResolved = a; else depsResolved = [ a ];
                            resolve(depsResolved);
                        }, function(e) {
                            reject(e);
                        }); else {
                            depsResolved = [];
                            return resolve(depsResolved);
                        }
                    });
                });
            };
            if (wikiMod.isDefined(id)) if (defineCache[id].dependencies && defineCache[id].dependencies.length > 0) return new wikiMod.Promise(function(resolve, reject) {
                wikiMod.require(defineCache[id].dependencies, newChain).then(function(a) {
                    if (defineCache[id].value) {
                        requireCache[id] = defineCache[id].value;
                        return resolve(requireCache[id]);
                    } else try {
                        requireCache[id] = defineCache[id].definition.apply(_me, "array" == RealTypeOf(a) ? a : [ a ]);
                        return resolve(requireCache[id]);
                    } catch (e) {}
                }, function(e) {
                    return reject(e);
                });
            }); else if (defineCache[id].value) {
                requireCache[id] = defineCache[id].value;
                return wikiMod.Promise.resolve(requireCache[id]);
            } else try {
                requireCache[id] = defineCache[id].definition.apply(_me, []);
                return wikiMod.Promise.resolve(requireCache[id]);
            } catch (e) {}
            var def = definitions[id];
            if (!def) {
                if (wikiMod.mw && wikiMod.mw.loader) {
                    var lId = id.toLowerCase();
                    var mwLoaderNames = wikiMod.mw.loader.getModuleNames() || [];
                    if (mwLoaderNames.indexOf(id) > -1) return new wikiMod.Promise(function(resolve, reject) {
                        wikiMod.mw.loader.using(id, function() {
                            resolve(Slice.call(arguments));
                        }, function() {
                            reject(Slice.call(arguments));
                        });
                    }); else if (mwLoaderNames.indexOf(lId) > -1) return new wikiMod.Promise(function(resolve, reject) {
                        wikiMod.mw.loader.using(lId, function() {
                            resolve(Slice.call(arguments));
                        }, function() {
                            reject(Slice.call(arguments));
                        });
                    });
                }
                if (window.require) return new wikiMod.Promise(function(resolve, reject) {
                    try {
                        window.require(id, function(a) {
                            requireCache[id] = a;
                            resolve(requireCache[id]);
                        }, function(a) {
                            reject(a);
                        });
                    } catch (x) {
                        reject(x);
                    }
                });
                return wikiMod.Promise.reject("Invalid Module: " + id);
            }
            if (def.working) return def.working;
            def.working = new wikiMod.Promise(function(resolve, reject) {
                var _this = this, rDependencyValues = [], r, responded = false, notWorking = function() {
                    def.working = null;
                }, respond = function(a, b) {
                    if (!responded) {
                        responded = true;
                        var tmp;
                        if (false === b) {
                            notWorking();
                            return reject(a);
                        }
                        if (true === b) {
                            if (a && "object" == typeof a && a.then && a["catch"]) return a.then(function(x) {
                                notWorking();
                                requireCache[id] = x;
                                resolve(requireCache[id]);
                            }, function(x) {
                                notWorking();
                                reject(x);
                            });
                            notWorking();
                            requireCache[id] = a;
                            return resolve(requireCache[id]);
                        }
                        if ("function" == typeof def.get) {
                            tmp = def.get.apply(_this, rDependencyValues || []);
                            if (tmp && "object" == typeof tmp && tmp.then) return tmp.then(function(x) {
                                requireCache[id] = x;
                                notWorking();
                                resolve(requireCache[id]);
                            }, function(y) {
                                notWorking();
                                reject(y);
                            });
                            requireCache[id] = tmp || a;
                            notWorking();
                            return resolve(requireCache[id]);
                        }
                        notWorking();
                        if ("function" == typeof def.test) {
                            requireCache[id] = def.test.apply(_this, rDependencyValues || []);
                            return resolve(requireCache[id]);
                        }
                        requireCache[id] = a;
                        return resolve(requireCache[id]);
                    }
                };
                var resolveRequirement = function() {
                    setAsap(function() {
                        if ("function" == typeof def.test && false !== (r = def.test.apply(_this, rDependencyValues || []))) {
                            if ("function" == typeof def.get) {
                                r = def.get.apply(_this, rDependencyValues || []);
                                return respond(r, true);
                            }
                            return respond(r);
                        }
                        var tServer, tPath = def.url || def.path || def.wikipath, tInit = "function" == typeof def.init ? def.init : null;
                        if (tPath && (def.server || def.wikipath || def.wikiname || !/^(?:[a-zA-Z]{2,6})?:\/\//.test(tPath))) tServer = def.server || def.wikiname || "deadisland";
                        if (!def.type) if (tPath) if (/\.css/i.test(tPath) && !/\.js/i.test(tPath)) def.type = "css";
                        switch (def.type || "js") {
                          case "css":
                            if (tPath) {
                                if (tServer) r = wikiMod.importStylesheetPage(tPath, tServer); else r = addStylesheet(tPath);
                                return setTimeout(function() {
                                    if (tInit) try {
                                        var z = tInit.apply(_this, rDependencyValues || []);
                                        return respond(z || r);
                                    } catch (e) {}
                                    respond(r);
                                }, 0);
                            }
                            break;
 
                          case "js":
                            if (tPath) {
                                if (tServer) r = wikiMod.importScriptPage(tPath, tServer, function(val) {
                                    var z;
                                    if (tInit) try {
                                        z = tInit.apply(_this, rDependencyValues || []);
                                    } catch (e) {}
                                    respond(z || val || r);
                                }); else r = addScript({
                                    src: tPath,
                                    onload: function(val) {
                                        var z;
                                        if (tInit) try {
                                            z = tInit.apply(_this, rDependencyValues || []);
                                        } catch (e) {}
                                        respond(z || val || r);
                                    },
                                    prepend: true === def.prepend
                                });
                                return;
                            }
                            if (tInit) {
                                r = tInit.apply(_this, rDependencyValues || []);
                                return respond(r);
                            }
                            var _findFn = "function" == typeof def.get ? def.get : "function" == typeof def.test ? def.test : null;
                            if (_findFn) {
                                var waitJS, rJS, jsC = 0, jsCheck = function() {
                                    try {
                                        return _findFn.apply(_this, rDependencyValues || []);
                                    } catch (e) {
                                        return false;
                                    }
                                };
                                waitJS = function() {
                                    jsC++;
                                    rJS = jsCheck();
                                    if (rJS || jsC > 200) return respond(rJS, true);
                                    setTimeout(waitJS, 35);
                                };
                                return waitJS();
                            }
                        }
                        return respond("Invalid def: ", false);
                    });
                };
                resolveDependencies().then(function(a) {
                    rDependencyValues = "array" == RealTypeOf(a) ? a : [ a ];
                    resolveRequirement();
                }, function(e) {
                    rDependencyValues = [];
                    resolveRequirement();
                });
            });
            return def.working;
        };
        var _require = function(index, chain) {
            var tProm = __require(ids[index], chain);
            proms.push(tProm);
        };
        for (var i = 0; i < ids.length; i++) _require(i, rChain);
        if (proms.length > 0) all = wikiMod.Promise.all(proms); else all = wikiMod.Promise.resolve([]);
        all.then(function(result) {
            if ("function" == typeof callback) try {
                callback.apply(global, result);
            } catch (e) {}
            if (proms.length) setAsap(checkRequire, 0);
        }, function(e) {
            if ("function" == typeof err) try {
                err(e);
            } catch (e) {}
        });
        return all;
    };
    var requiredDefProperties = {
        alias: [ "target" ],
        js: [ [ [ "path", "url", "wikipath" ], [ "test", "get" ] ], [ "test", "init" ], [ "get", "init" ] ],
        css: [ [ [ "path", "url", "wikipath", "init" ], [ "test", "get" ] ] ]
    };
    function objectHasRequiredProperties(obj, type) {
        var i, typeObj = requiredDefProperties[type || obj.type || "js"], hasRequiredProperties = function(requiredProps) {
            var y, x;
            for (y = 0; y < requiredProps.length; y++) if ("array" == RealTypeOf(requiredProps[y])) {
                var validSubset = false;
                for (x = 0; x < requiredProps[y].length; x++) if (obj[requiredProps[y][x]]) {
                    validSubset = true;
                    break;
                }
                if (!validSubset) return false;
            } else if (!obj[requiredProps[y]]) return false;
            return true;
        };
        if (!typeObj) return false;
        if ("array" == RealTypeOf(typeObj[0])) {
            for (i = 0; i < typeObj.length; i++) if (hasRequiredProperties(typeObj[i])) return true;
        } else return hasRequiredProperties(typeObj);
        return false;
    }
    wikiMod.require.config = function() {
        var args = arguments, length = args.length, type0 = length > 0 ? typeof args[0] : null, type1 = length > 1 ? typeof args[1] : null, name, data, r, err = [];
        var config_defs_fromPlainObject = function(dataObj) {
            var count = 0;
            for (var id in dataObj) if (dataObj.hasOwnProperty(id) && "object" == typeof dataObj[id]) {
                var x = null;
                try {
                    x = wikiMod.require.config(id, dataObj[id]);
                    count++;
                } catch (e) {
                    err.push(e);
                }
                if ("array" == RealTypeOf(x)) err.concat(x);
            }
            return count;
        };
        var config_paths_fromPlainObject = function(dataObj) {
            var count = 0;
            for (var id in dataObj) if (dataObj.hasOwnProperty(id) && "string" == typeof dataObj[id]) try {
                if (!definitions.definitionExists(id)) definitions[id] = {
                    path: dataObj[id]
                }; else err.push(new Error("Module Name Already Defined: " + id));
                count++;
            } catch (e) {
                err.push(e);
            }
            return count;
        };
        var config_preload = function(dataArr) {
            setAsap(function() {
                var preloadArr = [], state;
                for (var i = 0; i < dataArr.length; i++) {
                    state = definitions.definitionState(dataArr[i]);
                    if (state == DEFINITION_STATES.NOT_LOADED || state == DEFINITION_STATES.DNE) preloadArr.push(dataArr[i]);
                }
                if (preloadArr.length) wikiMod.require(preloadArr);
            });
        };
        if (1 == length && "object" == type0) {
            data = args[0];
            if (data.definitions || data.shim || data.modules) r = config_defs_fromPlainObject(data.definitions || data.shim || data.modules || data.override);
            if ("object" == typeof data.paths) r = config_paths_fromPlainObject(data.paths) || r;
            if (data.preload) if ("string" == typeof data.preload) config_preload([ data.preload ]); else if ("array" == RealTypeOf(data.preload)) config_preload(data.preload);
            if (!err.length && r) return true;
        } else if (2 == length && "string" == type0 && "object" == type1) {
            name = args[0];
            data = args[1];
            if (definitions[name]) err.push(new Error("Module Name Already Defined: " + name));
            if (!data) err.push(new Error("Invalid Module Definition (Null object value): " + name)); else {
                var r = wikiMod.getKeys(data);
                if (!r.length) err.push(new Error("Invalid Module Definition (No keys found): " + name));
                if ("alias" == data.type && !data.target) err.push(new Error("Invalid Alias Definition (missing target): " + name)); else if (!objectHasRequiredProperties(data, data.type)) err.push(new Error("Invalid Definition (missing required properties): " + name));
                if (!err.length) {
                    definitions[name] = data;
                    return true;
                }
            }
        } else err.push(new TypeError("Invalid Config Input"));
        return err.length ? err : false;
    };
    var _onDefined = {};
    wikiMod.define = function(id) {
        var args = arguments, length = args.length, dep, def;
        if (length < 2) throw new Error("Invalid Define Arguments");
        setTimeout(checkRequire, 5);
        def = args[1];
        if (length > 2) {
            dep = def;
            def = args[2];
        }
        if (defineCache[id]) {
            console.log(id + " already defined.");
            return;
        }
        if ("string" == typeof dep) dep = [ dep ]; else if (length > 2 && "array" !== RealTypeOf(dep) && dep) throw new Error("Invalid dependencies: " + id);
        defineCache[id] = {
            id: id,
            dependencies: dep || null
        };
        if ("function" == typeof def) defineCache[id].definition = function() {
            var dArgs = arguments;
            try {
                defineCache[id].value = def.apply(def, dArgs || []);
            } catch (e) {}
            return defineCache[id].value;
        }; else {
            defineCache[id].definition = function() {
                return def;
            };
            defineCache[id].value = def;
        }
        if (_onDefined[id] && _onDefined[id].length > 0) {
            var fireCBs = function(val) {
                var i = 0, cbs = _onDefined[id];
                _onDefined[id] = [];
                for (;i < cbs.length; i++) try {
                    cbs[i](val);
                } catch (e) {}
            };
            if (defineCache[id].value) fireCBs(defineCache[id].value); else if (!defineCache[id].dependencies || 0 == defineCache[id].dependencies.length) {
                var t = defineCache[id].definition();
                fireCBs(t);
            } else wikiMod.require(id).then(function(a) {
                fireCBs.apply(fireCBs, "array" == RealTypeOf(a) ? a : [ a ]);
            });
        }
    };
    wikiMod.isDefined = function(id) {
        return defineCache[id] && defineCache[id].definition;
    };
    function isDefinedAnywhere(name) {
        var mwLoaderNames, lName = name.toLowerCase(), r = definitions[name] || wikiMod.isDefined(name) || definitions[lName] || wikiMod.isDefined(lName) ? true : false;
        if (!r) {
            mwLoaderNames = wikiMod.mw ? wikiMod.mw.loader.getModuleNames() : [];
            r = mwLoaderNames.indexOf(name) > -1 || mwLoaderNames.indexOf(lName) > -1;
        }
        return r;
    }
    wikiMod.onDefined = function(id, cb) {
        if (wikiMod.isDefined(id)) {
            if (defineCache[id].value) return cb(defineCache[id].value);
            if (!defineCache[id].dependencies || 0 == defineCache[id].dependencies.length) return cb(defineCache[id].definition());
            return wikiMod.require(id).then(function(a) {
                cb.apply(cb, "array" == RealTypeOf(a) ? a : [ a ]);
            });
        }
        if (!_onDefined[id]) _onDefined[id] = [];
        _onDefined[id].push(cb);
    };
    var wikiModIsRegistered = false;
    wikiMod.try_mwRegister = function() {
        if (wikiModIsRegistered) return wikiModIsRegistered;
        try {
            if (wikiMod.mw) {
                if (!wikiMod.mw.loader.getState("wikimod")) {
                    wikiMod.mw.loader.register("wikimod", 0, []);
                    wikiMod.mw.loader.state("wikimod", "loading");
                }
                if ("registered" == wikiMod.mw.loader.getState("wikimod")) wikiMod.mw.loader.state("wikimod", "loading");
                if ("loaded" != wikiMod.mw.loader.getState("wikimod")) wikiMod.mw.loader.implement("wikimod", function() {
                    return wikiMod;
                }, {}, {});
                wikiModIsRegistered = true;
                wikiMod.mw.loader.state("wikimod", "ready");
            }
        } catch (e) {}
        return wikiModIsRegistered;
    };
    function checkRequire() {
        var wikiModConfig = wikiMod.JSExtensionConfig("wikiMod");
        var tRequireArr = [];
        wikiModConfig.required = wikiModConfig.required || {};
        var process = function(name) {
            if (name in wikiModConfig.required) return wikiModConfig.required[name];
            var tState = definitions.definitionState(name);
            if (!tState || tState == DEFINITION_STATES.DNE || tState == DEFINITION_STATES.NOT_LOADED) {
                tRequireArr.push(name);
                wikiModConfig.required[name] = false;
                return false;
            } else {
                wikiModConfig.required[name] = true;
                return true;
            }
        };
        if (wikiModConfig && wikiModConfig.require) if ("array" == RealTypeOf(wikiModConfig.require)) {
            for (var i = 0; i < wikiModConfig.require.length; i++) if ("string" == typeof wikiModConfig.require[i] && wikiModConfig.require[i]) {
                process(wikiModConfig.require[i]);
                wikiModConfig.require[i] = null;
            }
        } else if ("object" == typeof wikiModConfig.require) for (var key in wikiModConfig.require) if (wikiModConfig.require.hasOwnProperty(key) && true === wikiModConfig.require[key]) {
            process(key);
            wikiModConfig.require[key] = null;
        }
        if (tRequireArr.length) wikiMod.require(tRequireArr, function(a, b, c) {
            for (var i = 0; i < tRequireArr.length; i++) wikiModConfig.required[tRequireArr[i]] = true;
        }, function(e) {
            console.log("checkRequire require error", e);
        });
    }
    setAsap(function() {
        checkRequire();
    });
    wikiMod.noConflict = function() {
        var _this = wikiMod;
        try {
            global.wikiMod = undefined;
            delete global.wikiMod;
            global.wikiMod = undefined;
            delete global.wikiMod;
        } catch (x) {}
        try {
            window.wikiMod = undefined;
            delete window.wikiMod;
            window.wikiMod = undefined;
            delete window.wikiMod;
        } catch (x) {}
        if (uw && uw.wikiMod && _this.__uwwikiMod) try {
            uw.wikiMod = undefined;
            delete uw.wikiMod;
            uw.wikiMod = undefined;
            delete uw.wikiMod;
        } catch (x) {}
        try {
            global.wikiMod = _this._wikiMod;
            _this._wikiMod = undefined;
            delete _this._wikiMod;
            _this._wikiMod = undefined;
            delete _this._wikiMod;
        } catch (e) {}
        try {
            window.wikiMod = _this.__wikiMod;
            _this.__wikiMod = undefined;
            delete _this.__wikiMod;
            _this.__wikiMod = undefined;
            delete _this.__wikiMod;
        } catch (e) {}
        if (uw && _this.__uwwikiMod) try {
            uw.wikiMod = _this.__uwwikiMod;
            _this.__uwwikiMod = undefined;
            delete _this.__uwwikiMod;
            _this.__uwwikiMod = undefined;
            delete _this.__uwwikiMod;
        } catch (e) {}
        return _this;
    };
    +function() {
        var doc = wikiMod.document, pageReady = false, addDOMContentLoadedHandle = true, tryAddCSS = function() {
            if (!customCSSAdded) wikiMod.addCSS();
        };
        function onDOMContentLoadedHandle(e) {
            if ("complete" == doc.readyState) removeEventListener(doc, "DOMContentLoaded", onDOMContentLoadedHandle, false);
            if (!wikiMod.Events.DOMContentLoaded) wikiMod.Events.fire.apply(wikiMod.Events, [ "DOMContentLoaded", {
                _this: this,
                args: arguments
            } ]);
            setAsap(function() {
                checkRequire();
            });
        }
        function onreadystatechangeHandle(e) {
            wikiMod.Events.fire.apply(wikiMod.Events, [ "onreadystatechange", {
                _this: this,
                args: arguments
            } ]);
            if (!pageReady && "complete" == doc.readyState) {
                pageReady = true;
                tryAddCSS();
                if (!wikiMod.Events.onPageReady) wikiMod.Events.fire.apply(wikiMod.Events, [ "onPageReady", {
                    _this: this,
                    args: arguments
                } ]);
                setAsap(function() {
                    checkRequire();
                });
            }
        }
        if ("complete" == doc.readyState && !wikiMod.Events.DOMContentLoaded) try {
            addDOMContentLoadedHandle = false;
            onDOMContentLoadedHandle();
        } catch (e) {}
        if (addDOMContentLoadedHandle) addEventListener(doc, "DOMContentLoaded", onDOMContentLoadedHandle, false);
        if ("complete" == doc.readyState) try {
            onreadystatechangeHandle();
        } catch (e) {}
        doc.onreadystatechange = onreadystatechangeHandle;
        function onLoadEvent(e) {
            removeEventListener(window, "load", onLoadEvent, false);
            wikiMod.Events.fire.apply(wikiMod.Events, [ "onLoad", {
                _this: this,
                args: arguments
            } ]);
            tryAddCSS();
            setAsap(function() {
                checkRequire();
            });
        }
        addEventListener(window, "load", onLoadEvent, false);
        function BeforeScriptExec(e) {
            wikiMod.Events.fire.apply(wikiMod.Events, [ "beforescriptexecute", {
                _this: this,
                args: arguments
            } ]);
        }
        addEventListener(window, "beforescriptexecute", BeforeScriptExec, false);
        function AfterScriptExec(e) {
            wikiMod.Events.fire.apply(wikiMod.Events, [ "afterscriptexecute", {
                _this: this,
                args: arguments
            } ]);
        }
        addEventListener(window, "afterscriptexecute", AfterScriptExec, false);
        var mwWaitInterval = 100;
        function waitForMediaWiki(count) {
            count = count || 1;
            if (!wikiMod.mw && count < 200) return setTimeout(function() {
                waitForMediaWiki(count + 1);
            }, mwWaitInterval);
        }
        if (!wikiMod.mw) {
            var _origMW = uw ? uw.mediaWiki : winGlUw.mediaWiki;
            if (!_origMW) {
                _origMW = {
                    loader: {
                        state: function() {}
                    }
                };
                if (uw) _origMW = mCloneInto(_origMW, uw, mCloneIntoDefaultArgs);
            }
            var mwWatcherSet = function(val) {
                try {
                    delete winGlUw.mediaWiki;
                    delete winGlUw.mw;
                } catch (e) {}
                try {
                    winGlUw.mw = winGlUw.mediaWiki = undefined;
                    delete winGlUw.mediaWiki;
                    delete winGlUw.mw;
                } catch (e) {}
                if (uw) {
                    try {
                        delete uw.mediaWiki;
                        delete uw.mw;
                    } catch (e) {}
                    try {
                        uw.mw = uw.mediaWiki = undefined;
                        delete uw.mediaWiki;
                        delete uw.mw;
                    } catch (e) {}
                }
                try {
                    if (uw) uw.mw = uw.mediaWiki = val; else winGlUw.mw = winGlUw.mediaWiki = val;
                } catch (e) {
                    var tVal = {
                        value: val,
                        writeable: true,
                        enumerable: true
                    };
                    if (uw) tVal = mCloneInto(tVal, uw, {
                        cloneFunctions: true,
                        wrapReflectors: true
                    });
                    Object.defineProperty(uw || winGlUw, "mediaWiki", tVal);
                    Object.defineProperty(uw || winGlUw, "mw", tVal);
                }
                try {
                    if (wikiMod.mw) return;
                } catch (e) {
                    console.log("mediaWiki capture fail", e, wikiMod.mw, val);
                }
            };
            var mwWatcherGet = function() {
                return _origMW;
            };
            try {
                delete winGlUw.mediaWiki;
            } catch (e) {}
            try {
                winGlUw.mediaWiki = undefined;
                delete winGlUw.mediaWiki;
            } catch (e) {}
            if (uw) {
                try {
                    delete uw.mediaWiki;
                } catch (e) {}
                try {
                    uw.mediaWiki = undefined;
                    delete uw.mediaWiki;
                } catch (e) {}
            }
            try {
                Object.defineProperty(uw, "mediaWiki", {
                    get: uw ? mExportFunction(mwWatcherGet, uw, {
                        allowCallbacks: true,
                        allowCrossOriginArguments: true
                    }) : mwWatcherGet,
                    set: uw ? mExportFunction(mwWatcherSet, uw, {
                        allowCallbacks: true,
                        allowCrossOriginArguments: true
                    }) : mwWatcherSet,
                    enumerable: true,
                    configurable: true
                });
            } catch (e) {
                mwWaitInterval = 25;
                try {
                    if (uw) uw.mw = uw.mediaWiki = _origMW; else winGlUw.mw = winGlUw.mediaWiki = _origMW;
                } catch (x) {}
            }
            setAsap(function() {
                waitForMediaWiki();
            });
        }
    }();
    return wikiMod;
});