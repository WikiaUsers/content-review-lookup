(function($) {(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [
        function(require, module, exports) {
            var ConfigDefaults = (function() {
                function ConfigDefaults() {
                    this.num = 200;
                    this.speed = 1;
                    this.showOnce = '';
                    this.disableMouse = false;
                    this.fadeScroll = false;
                    this.url = '';
                    this.prefix = 'fly3d';
                    this.direction = 'down';
                    this.minScale = 10;
                    this.maxScale = 30;
                    this.closeButton = 'Hide';
                    this.closeButtonMode = 'session';
                    this.closeButtonStyles = '';
                }
                return ConfigDefaults;
            })();

            module.exports = ConfigDefaults;

        }, {}
    ],
    2: [
        function(require, module, exports) {
            var __extends = this.__extends || function(d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p)) d[p] = b[p];

                function __() {
                    this.constructor = d;
                }
                __.prototype = b.prototype;
                d.prototype = new __();
            };
            var b = require('./core/base-config');
            var cd = require('./config-defaults');

            var _defaults = new cd();

            var Config = (function(_super) {
                __extends(Config, _super);

                function Config(cfg, onChange) {
                    var v = cfg['value'];
                    delete cfg['value'];
                    cfg['value'] = v;

                    _super.call(this, $.extend({}, _defaults, cfg), onChange, _defaults);
                }
                Config.setDefaults = function() {};
                return Config;
            })(b.BaseConfig);
            module.exports = Config;

        }, {
            "./config-defaults": 1,
            "./core/base-config": 5
        }
    ],
    3: [
        function(require, module, exports) {
            var __extends = this.__extends || function(d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p)) d[p] = b[p];

                function __() {
                    this.constructor = d;
                }
                __.prototype = b.prototype;
                d.prototype = new __();
            };
            var a = require('./core/a');
            var Observable = require('./core/observable');
            var Config = require('./config');
            var Engine = require('./engine');

            window['requestAnimFrame'] = (function() {
                return window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'] || window['oRequestAnimationFrame'] || window.msRequestAnimationFrame || function(callback, element) {
                    window.setTimeout(callback, 1000 / 60);
                };
            })();

            var Controller = (function(_super) {
                __extends(Controller, _super);

                function Controller($el, cfg) {
                    _super.call(this);
                    this.isActive = true;
                    this.mouseX = 0;
                    this.mouseY = 0;

                    var me = this;
                    me.$el = $el;

                    var config = me._config = new Config(cfg, a.bind(me._onConfigChange, me));

                    var prefix = config.get('prefix');

                    if (config.get('showOnce')) {
                        var currentCookie = $.cookie(prefix);

                        var cookieSett = {
                            path: '/'
                        };
                        if (config.get('showOnce') != 'session') {
                            cookieSett['expires'] = parseInt(config.get('showOnce'), 10) || 1;
                        }
                        $.cookie(prefix, true, cookieSett);

                        if (currentCookie) {
                            return;
                        }
                    }

                    if ($.cookie(prefix + '-hidden'))
                        return;

                    var _engine = me.engine = new Engine(a.bind(me.getXY, me));

                    _engine.create($el);

                    var baseUrl = config.get('url');
                    var images = config.get('images'),
                        urls = [];
                    if ($.type(images) == 'string') {
                        images = images.split(',');
                    }

                    var loader = new PxLoader();

                    a.each(images, function(image) {
                        loader.addImage(baseUrl + image);
                        urls.push(baseUrl + image);
                    });

                    loader.addCompletionListener(function() {
                        me.create(urls);
                    });

                    loader.start();

                    if (config.get('fadeScroll')) {
                        $(window).scroll(a.bind(me.onScroll, me));
                    }
                    $(window).resize(a.bind(me.onResize, me));

                    if (!config.get('disableMouse')) {
                        document.addEventListener('mousemove', a.bind(me.onDocumentMouseMove, me), false);
                        document.addEventListener('touchstart', a.bind(me.onDocumentTouchStart, me), false);
                        document.addEventListener('touchmove', a.bind(me.onDocumentTouchMove, me), false);
                    }

                    me.closeButton();
                }
                Controller.prototype.closeButton = function() {
                    var me = this,
                        closeButtonS = me._config.get('closeButton'),
                        closeButtonMode = me._config.get('closeButtonMode'),
                        closeButtonStyles = me._config.get('closeButtonStyles');

                    if (!closeButtonS)
                        return;

                    me.closeBtn = $('<a/>', {
                        'class': 'fly-close-btn',
                        'css': {
                            'background-color': 'white',
                            'cursor': 'pointer',
                            'position': 'fixed',
                            'bottom': '0px',
                            'left': '0px',
                            'padding': '10px 20px',
                            'z-index': '10000000'
                        },
                        html: closeButtonS || 'Close'
                    });

                    if (closeButtonStyles) {
                        me.closeBtn.attr("style", me.closeBtn.attr("style") + "; " + closeButtonStyles);
                    }

                    var prefix = me._config.get('prefix');

                    me.closeBtn.click(function() {
                        if (closeButtonMode != 'once') {
                            var cookieSett = {
                                path: '/'
                            };
                            if (closeButtonMode != 'session') {
                                cookieSett['expires'] = parseInt(closeButtonMode, 10) || 1;
                            }
                            $.cookie(prefix + '-hidden', true, cookieSett);
                        }
                        me.destroy();
                    });

                    $('body').append(me.closeBtn);
                };

                Controller.prototype.onScroll = function() {
                    var me = this;

                    me.engine.updateOpacity();
                };

                Controller.prototype.create = function(urls) {
                    var me = this,
                        config = me._config,
                        _engine = me.engine;

                    _engine.generateParticles(urls, config.get('num'), config.get('speed'), config.get('minScale'), config.get('maxScale'), config.get('direction'));

                    var frame = a.bind(_engine.frame, _engine);

                    var _action = function() {
                        if (!me.isActive)
                            return;

                        setTimeout(frame, 0);
                        window['requestAnimFrame'](_action);
                    };
                    _action();
                };

                Controller.prototype.onResize = function() {
                    var me = this;

                    me.engine.updateSize(me.$el);
                };

                Controller.prototype.getXY = function() {
                    var me = this;

                    return [me.mouseX, me.mouseY];
                };

                Controller.prototype.onDocumentMouseMove = function(event) {
                    var me = this;
                    me.mouseX = event.clientX - $(window).width() / 2;
                    me.mouseY = event.clientY - $(window).height() / 2;
                };
                Controller.prototype.onDocumentTouchStart = function(event) {
                    var me = this;
                    if (event.touches.length == 1) {
                        me.mouseX = event.touches[0].pageX - $(window).width() / 2;
                        me.mouseY = event.touches[0].pageY - $(window).height() / 2;
                    }
                };

                Controller.prototype.onDocumentTouchMove = function(event) {
                    var me = this;
                    if (event.touches.length == 1) {
                        me.mouseX = event.touches[0].pageX - $(window).width() / 2;
                        me.mouseY = event.touches[0].pageY - $(window).height() / 2;
                    }
                };

                Controller.prototype._onConfigChange = function() {};

                Controller.prototype.destroy = function() {
                    var me = this;

                    me.isActive = false;

                    me.engine.stop();
                    me.closeBtn.remove();
                };
                return Controller;
            })(Observable);
            exports.Controller = Controller;

        }, {
            "./config": 2,
            "./core/a": 4,
            "./core/observable": 6,
            "./engine": 7
        }
    ],
    4: [
        function(require, module, exports) {
            var breaker = {};
            var ArrayProto = Array.prototype,
                ObjProto = Object.prototype,
                FuncProto = Function.prototype;

            var slice = ArrayProto.slice;
            var nativeForEach = ArrayProto.forEach,
                nativeIndexOf = ArrayProto.indexOf,
                nativeKeys = Object.keys,
                nativeBind = FuncProto.bind,
                toString = ObjProto.toString,
                hasOwnProperty = ObjProto.hasOwnProperty,
                nativeTrim = String.prototype.trim;

            var defaultToWhiteSpace = function(characters) {
                if (characters == null)
                    return '\\s';
                else if (characters.source)
                    return characters.source;
                else
                    return '[' + A.strEscapeRegExp(characters) + ']';
            };

            var idCounter = 0;
            var ctor = function() {};
            var A = (function() {
                function A() {}
                A.has = function(obj, key) {
                    return hasOwnProperty.call(obj, key);
                };

                A.keys = function(obj) {
                    if (!A.isObject(obj))
                        return [];
                    if (nativeKeys)
                        return nativeKeys(obj);
                    var keys = [];
                    for (var key in obj)
                        if (A.has(obj, key))
                            keys.push(key);
                    return keys;
                };

                A.each = function(obj, iterator, context) {
                    if (obj == null)
                        return obj;
                    if (nativeForEach && obj.forEach === nativeForEach) {
                        obj.forEach(iterator, context);
                    } else if (obj.length === +obj.length) {
                        for (var i = 0, length = obj.length; i < length; i++) {
                            if (iterator.call(context, obj[i], i, obj) === breaker)
                                return;
                        }
                    } else {
                        var keys = A.keys(obj);
                        for (var i = 0, lengthK = keys.length; i < lengthK; i++) {
                            if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker)
                                return;
                        }
                    }
                    return obj;
                };

                A.extend = function(obj) {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 1); _i++) {
                        args[_i] = arguments[_i + 1];
                    }
                    A.each(slice.call(arguments, 1), function(source) {
                        if (source) {
                            for (var prop in source) {
                                obj[prop] = source[prop];
                            }
                        }
                    });
                    return obj;
                };

                A.uniqueId = function(prefix) {
                    var id = ++idCounter + '';
                    return prefix ? prefix + id : id;
                };

                A.indexOf = function(array, item, isSorted) {
                    if (array == null)
                        return -1;
                    var i = 0,
                        length = array.length;
                    if (isSorted) {
                        if (typeof isSorted == 'number') {
                            i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
                        } else {
                            i = _.sortedIndex(array, item);
                            return array[i] === item ? i : -1;
                        }
                    }
                    if (nativeIndexOf && array.indexOf === nativeIndexOf)
                        return array.indexOf(item, isSorted);
                    for (; i < length; i++)
                        if (array[i] === item)
                            return i;
                    return -1;
                };

                A.isObject = function(obj) {
                    return obj === Object(obj);
                };

                A.bind = function(func, context) {
                    var args, bound;
                    if (nativeBind && func.bind === nativeBind)
                        return nativeBind.apply(func, slice.call(arguments, 1));
                    if (!A.isFunction(func))
                        throw new TypeError;
                    args = slice.call(arguments, 2);
                    return bound = function() {
                        if (!(this instanceof bound))
                            return func.apply(context, args.concat(slice.call(arguments)));
                        ctor.prototype = func.prototype;
                        var self = new ctor;
                        ctor.prototype = null;
                        var result = func.apply(self, args.concat(slice.call(arguments)));
                        if (Object(result) === result)
                            return result;
                        return self;
                    };
                };

                A.isFunction = function(obj) {
                    return toString.call(obj) == '[object Function]';
                };

                A.format = function(str) {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 1); _i++) {
                        args[_i] = arguments[_i + 1];
                    }
                    return str.replace(/\{\{|\}\}|\{(\d+)\}/g, function(m, n) {
                        if (m == "{{") {
                            return "{";
                        }
                        if (m == "}}") {
                            return "}";
                        }
                        return args[n];
                    });
                };

                A.strEscapeRegExp = function(str) {
                    if (str == null)
                        return '';
                    return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
                };

                A.strTrim = function(str, characters) {
                    if (str == null)
                        return '';
                    if (!characters && nativeTrim)
                        return nativeTrim.call(str);
                    characters = defaultToWhiteSpace(characters);
                    return String(str).replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
                };
                A.strCamelize = function(str) {
                    return A.strTrim(str).replace(/[-_\s]+(.)?/g, function(match, c) {
                        return c ? c.toUpperCase() : "";
                    });
                };

                A.strCapitalize = function(str) {
                    str = str == null ? '' : String(str);
                    return str.charAt(0).toUpperCase() + str.slice(1);
                };
                return A;
            })();

            module.exports = A;

        }, {}
    ],
    5: [
        function(require, module, exports) {
            var __extends = this.__extends || function(d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p)) d[p] = b[p];

                function __() {
                    this.constructor = d;
                }
                __.prototype = b.prototype;
                d.prototype = new __();
            };
            var a = require('./a');
            var Observable = require('./observable');

            var BaseConfig = (function(_super) {
                __extends(BaseConfig, _super);

                function BaseConfig(cfg, onChange, defaults) {
                    this._data = {};

                    this._defaults = defaults;

                    _super.call(this);

                    if (a.isFunction(onChange)) {
                        this.on('change', onChange);
                    }
                    if (a.isObject(cfg)) {
                        this.update(cfg);
                    }
                }
                BaseConfig.prototype.update = function(data, opt_params) {
                    var me = this;

                    if (a.isObject(data)) {
                        a.each(data, function(value, key) {
                            return me.set(key, value, opt_params);
                        });
                    }
                };

                BaseConfig.prototype.get = function(key) {
                    var c = a.strCapitalize(a.strCamelize(key)),
                        fnName = "get" + c;

                    if (a.isFunction(this[key])) {
                        return this._data[key](this);
                    }
                    if (a.isFunction(this[fnName])) {
                        return this._data[fnName](this);
                    } else {
                        return this._data[key];
                    }
                };

                BaseConfig.prototype.set = function(key, value, opt_params) {
                    var c = a.strCapitalize(a.strCamelize(key)),
                        fnName = "set" + c,
                        old = this._data[key];

                    if (a.isFunction(this[fnName])) {
                        this._data[fnName](value);
                    } else {
                        if ($.type(this._defaults[key]) == 'boolean') {
                            value = String(value) === 'true';
                        }
                        if ($.type(this._defaults[key]) == 'number') {
                            value = parseFloat(value);
                        }
                        if ($.type(this._defaults[key]) == 'string') {
                            value = String(value);
                        }

                        this._data[key] = value;
                    }

                    if ((old !== value && (!opt_params || !opt_params.silence)) || (opt_params && opt_params.force)) {
                        this.trigger('change', [this, key, value, old, opt_params]);
                    }
                };

                BaseConfig.prototype.toggle = function(key) {
                    this.set(key, !this.get(key));
                };
                return BaseConfig;
            })(Observable);
            exports.BaseConfig = BaseConfig;

        }, {
            "./a": 4,
            "./observable": 6
        }
    ],
    6: [
        function(require, module, exports) {
            var a = require('./a');

            var Observable = (function() {
                function Observable() {}
                Observable.prototype.on = function(type, fn, scope) {
                    var me = this;

                    var _on = function(type, fn, scope) {
                        if (scope)
                            fn = _.bind(fn, scope);
                        $(me).on(type, fn);
                    };
                    if (a.isObject(type)) {
                        a.each(type, function(value, key) {
                            if (key == "scope")
                                return;
                            _on(key, value, type["scope"]);
                        });
                    } else {
                        _on.apply(me, arguments);
                    }
                    return this;
                };

                Observable.prototype.one = function(type, fn, scope) {
                    if (scope)
                        fn = _.bind(fn, scope);
                    $(this).one(type, fn);
                    return this;
                };

                Observable.prototype.off = function(type) {
                    $(this).off(type);
                    return this;
                };

                Observable.prototype.trigger = function(type, args) {
                    $(this).trigger(type, args);
                    return this;
                };

                Observable.prototype.only = function(type, fn, scope) {
                    this.off(type);
                    this.on(type, fn, scope);
                    return this;
                };
                return Observable;
            })();
            module.exports = Observable;

        }, {
            "./a": 4
        }
    ],
    7: [
        function(require, module, exports) {
            var __extends = this.__extends || function(d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p)) d[p] = b[p];

                function __() {
                    this.constructor = d;
                }
                __.prototype = b.prototype;
                d.prototype = new __();
            };
            var a = require('./core/a');
            var Observable = require('./core/observable');
            var Particle = require('./particle');

            function randomBetweenInt(min, max) {
                return min + Math.floor(Math.random() * (max - min + 1));
            };

            var Engine = (function(_super) {
                __extends(Engine, _super);

                function Engine(positionReader) {
                    _super.call(this);
                    this.disabled = false;

                    var me = this;

                    me.positionReader = positionReader;
                }
                Engine.prototype.create = function($el) {
                    var me = this;

                    me.camera = new THREE.PerspectiveCamera(75, 1, 1, 5000);
                    me.camera.position.z = 1000;

                    me.scene = new THREE.Scene();

                    me.scene.add(me.camera);

                    me.renderer = WebGLDetector.webgl ? new THREE.WebGLRenderer({
                        alpha: true,
                        antialias: true
                    }) : new THREE.CanvasRenderer({
                        alpha: true,
                        overdraw: true
                    });

                    me.updateSize($el);

                    me.container = $('<div/>', {
                        css: {
                            position: 'fixed',
                            left: '0px',
                            top: '0px',
                            right: '0px',
                            bottom: '0px',
                            pointerEvents: 'none',
                            zIndex: 9999999
                        },
                        html: me.renderer.domElement
                    });

                    $el.append(me.container);
                };

                Engine.prototype.stop = function() {
                    var me = this;

                    me.renderer.clear();
                    me.container.remove();
                };

                Engine.prototype.updateOpacity = function() {
                    var h = $(window).height(),
                        top = $(window).scrollTop(),
                        percent = (h - top) / h;

                    if (percent == 0) {
                        this.disabled = true;
                        this.container.hide();
                    } else {
                        this.disabled = false;
                        this.container.show();
                    }

                    this.container.animate({
                        'opacity': percent
                    }, 150);
                };

                Engine.prototype.updateSize = function($el) {
                    var me = this,
                        width = $el.width(),
                        height = $el.height();

                    if ($el.is('body')) {
                        width = $(window).width();
                        height = $(window).height();
                    }

                    me.renderer.setSize(width, height);

                    me.camera.aspect = width / height;
                    me.camera.updateProjectionMatrix();
                };

                Engine.prototype.generateParticles = function(urls, num, speed, minScale, maxScale, direction) {
                    var me = this;

                    me.particles = [];

                    for (var i = 0; i <= num; i++) {
                        var imgIndex = randomBetweenInt(0, urls.length - 1);

                        THREE.ImageUtils.loadTexture(urls[imgIndex], null, function(texture) {
                            var material = new THREE.SpriteMaterial({
                                map: texture,
                                color: 0xffffff,
                                transparent: true
                            });

                            var particle = new Particle(material, speed, direction);
                            particle.position.x = randomBetweenInt(-1000, 1000);
                            particle.position.y = randomBetweenInt(-1000, 1000);
                            particle.position.z = randomBetweenInt(200, 1000);

                            particle.scale.x = particle.scale.y = randomBetweenInt(minScale, maxScale);
                            me.scene.add(particle);
                            me.particles.push(particle);
                        });
                    }
                };

                Engine.prototype.resetPosition = function(particle) {
                    var me = this,
                        delta = me.camera.position.z;

                    var solve = function(val) {
                        if (val > delta)
                            val -= 2 * delta;
                        if (val < -1 * delta)
                            val += 2 * delta;
                        return val;
                    };

                    particle.position.x = solve(particle.position.x);
                    particle.position.y = solve(particle.position.y);
                    particle.position.z = solve(particle.position.z);
                };

                Engine.prototype.frame = function() {
                    if (this.disabled)
                        return;

                    var me = this,
                        mousePosition = me.positionReader();

                    a.each(me.particles, function(particle) {
                        particle.position.add(particle.velocity);
                        me.resetPosition(particle);
                    });

                    me.camera.position.x += (-mousePosition[0] - me.camera.position.x) * 0.15;
                    me.camera.position.y += (mousePosition[1] - me.camera.position.y) * 0.15;
                    me.camera.lookAt(me.scene.position);
                    me.renderer.render(me.scene, me.camera);
                };
                return Engine;
            })(Observable);

            module.exports = Engine;

        }, {
            "./core/a": 4,
            "./core/observable": 6,
            "./particle": 9
        }
    ],
    8: [
        function(require, module, exports) {
            var controller = require('./controller');

            var pointerEventsSupported = (function() {
                var a = document.createElement("x");
                a.style.cssText = "pointer-events:auto";
                return a.style.pointerEvents === "auto";
            })();

            var detectmob = function() {
                if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
                    return true;
                } else {
                    return false;
                }
            };

            var fn = function(config) {
                var _this = this;
                if (!pointerEventsSupported)
                    return;
                if (config && !config.enableMobile && detectmob()) {
                    return;
                }

                return this.each(function() {
                    var $this = $(_this),
                        prefix = config.prefix || 'fly3d',
                        cnt = $this.data(prefix);

                    cnt && cnt['destroy']();

                    var _cnt = new controller.Controller($this, config || {});
                    $this.data(prefix, _cnt);
                });
            };

            $.fn.snow3d = fn;
            $.fn.fly3d = fn;

        }, {
            "./controller": 3
        }
    ],
    9: [
        function(require, module, exports) {
            var __extends = this.__extends || function(d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p)) d[p] = b[p];

                function __() {
                    this.constructor = d;
                }
                __.prototype = b.prototype;
                d.prototype = new __();
            };

            function randomBetween(min, max) {
                return ((Math.random() * (max - min)) + min);
            };

            var PI180 = Math.PI / 180;

            var Particle = (function(_super) {
                __extends(Particle, _super);

                function Particle(material, speed, direction) {
                    _super.call(this, material);

                    var me = this;

                    if (direction == 'up') {
                        me.velocity = new THREE.Vector3(0, 3 * speed, 0);
                    } else {
                        me.velocity = new THREE.Vector3(0, -3 * speed, 0);
                    }
                    me.rotateXY(randomBetween(-65, 65), randomBetween(0, 270));

                    me.gravity = new THREE.Vector3(0, 0, 0);
                    me.drag = 1;
                }
                Particle.prototype.rotateXY = function(angleX, angleY) {
                    var me = this,
                        el = me.velocity;

                    var x, y, z, cos, sin, piX = angleX * PI180,
                        piY = angleY * PI180;

                    cos = Math.cos(piX);
                    sin = Math.sin(piX);

                    y = (el.y * cos) + (el.z * sin);
                    z = (el.y * -sin) + (el.z * cos);

                    el.y = y;
                    el.z = z;

                    cos = Math.cos(piY);
                    sin = Math.sin(piY);

                    x = (el.x * cos) + (el.z * sin);
                    z = (el.x * -sin) + (el.z * cos);

                    el.x = x;
                    el.z = z;
                };
                return Particle;
            })(THREE.Sprite);

            module.exports = Particle;

        }, {}
    ]
}, {}, [8])
})(jQuery);