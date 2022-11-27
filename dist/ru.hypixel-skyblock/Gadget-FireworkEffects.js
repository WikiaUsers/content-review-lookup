/** FireworkEffects
 * Сценарий для показа фейерверка на Новый год.
 */

/** Attribution: Scripts Referenced:
 * "SnowStorm" from Fandom Dev Wiki
 * https://dev.fandom.com/wiki/MediaWiki:SnowStorm.js
 * Firework Script by slicker.me (CC BY 3.0)
 * http://slicker.me/javascript/fireworks.htm
 */

/* jshint
    esversion: 5, forin: true,
    immed: true, indent: 4,
    latedef: true, newcap: true,
    noarg: true, undef: true,
    undef: true, unused: true,
    browser: true, jquery: true,
    onevar: true, eqeqeq: true,
    multistr: true, maxerr: 999999,
    forin: false,
    -W082, -W084
*/
/* global window, document, navigator, mw */

var scriptLoaded = !!(window.fireworkShow && window.fireworkShow.Loaded);
window.fireworkShow = window.fireworkShow || {};
window.fireworkShow.Loaded = true;
/* Set Up Dimmer */
if (!(window.HswSiteDimmer && window.HswSiteDimmer.loaded)) {
    window.HswSiteDimmer = Object.assign({
        loaded: true,
        siteDimmed: false,
        dimClass: "hsw-site-dimmer",
    }, window.HswSiteDimmer || {});
    window.HswSiteDimmer.dim = function () {
        if (window.HswSiteDimmer.siteDimmed)
            return;
        var el = window.HswSiteDimmer.element || $("." + window.HswSiteDimmer.dimClass);
        if (el.length > 0) {
            el.css("opacity", 0.8);
        } else {
            var themeBgCol = $("body").css("--theme-body-background-color");
            if (!["#000", "#000000", "black"].includes(themeBgCol)) {
                window.HswSiteDimmer.element = $("<div>", {
                    class: window.HswSiteDimmer.dimClass,
                }).appendTo("body");
                setTimeout(function () {
                    window.HswSiteDimmer.element.css("opacity", 0.8);
                }, 20);
            }
        }
        window.HswSiteDimmer.siteDimmed = true;
    };
    window.HswSiteDimmer.undim = function () {
        (window.HswSiteDimmer.element || $("." + window.HswSiteDimmer.dimClass)).css("opacity", 0);
        window.HswSiteDimmer.siteDimmed = false;
    };
}

mw.loader.using(["mediawiki.util", "mediawiki.Uri"], function () {
    if (scriptLoaded) {
        if (window.fireworkShow.optionalDeferredRegister)
            window.fireworkShow.optionalDeferredRegister.resolve(window.fireworkShow);
        return;
    }

    console.log("[FireworkEffects] Загрузка скрипта.");

    window.fireworkShow = (new function () { // jshint ignore:line
        var defaults = {
            autoStart: false, // Должен ли фейерверк запускаться автоматически или нет.
            excludeMobile: true, // Искры, скорее всего, станут плохой новостью для процессоров (и батарей) мобильных телефонов.) Включайте на свой страх и риск.
            onlyStartOnViewMode: true, // Предотвращает запуск при выполнении действий (редактирование, история, очистка и т.д.), отличных от просмотра
            max_fireworks: 5,
            max_sparks: 50, // Limit amount of firework sparks firing at once (less = lower CPU use)
            animationInterval: 35, // Theoretical "milliseconds per frame" measurement. 20 = fast + smooth, but high CPU use. 50 = more conservative, but slower

            // Specific Variables For Firework Custom Script
            fireworksHideToBackground: true, // If enabled, this.zIndex will be set to -1 after the timeout
            fireworksHideTimeout: 10000, // Sets the timeout after which the firework will hide in the background
            max_sparks_after_recycle: 25, // When the firework hides to background, the amount of sparks that should leave

            // --- less-used bits ---
            freezeOnBlur: true, // Only show sparks when the window is in focus (foreground.) Saves CPU.
            zIndex: 2, // CSS stacking order applied to each firework flake
        };

        var config = Object.assign(defaults, window.fireworkShow || {});

        Object.assign(this, config);

        // --- "No user-serviceable parts inside" past this point, yadda yadda ---
        var show = this,
            features,
            // UA sniffing and backCompat rendering mode checks for fixed position, etc.
            isIE = navigator.userAgent.match(/msie/i),
            isMobile = navigator.userAgent.match(/mobile|opera m(ob|in)/i),
            didInit = false,
            canvas = document.createElement("canvas");

        canvas.style.position = "fixed";
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.style.zIndex = show.zIndex;
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.style.pointerEvents = "none";
        canvas.style.transition = "opacity .35s linear 0s";
        document.body.appendChild(canvas);

        var context = canvas.getContext("2d"),
            rocket = new Image(),
            rocketsrc = "https://static.wikia.nocookie.net/hypixel-skyblock/images/2/25/Firework_Rocket.png/revision/latest/scale-to-width-down/80?cb=20210615224504";
        rocket.src = rocketsrc;

        features = (function () {
            var getAnimationFrame;

            /**
             * hat tip: paul irish
             * https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
             * https://gist.github.com/838785
             */
            function timeoutShim(callback) {
                window.setTimeout(callback, 1000 / (show.animationInterval || 20));
            }

            var _animationFrame = (window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                timeoutShim);

            // apply to window, avoid "illegal invocation" errors in Chrome
            getAnimationFrame = _animationFrame ? function () {
                return _animationFrame.apply(window, arguments);
            } : null;

            return getAnimationFrame;
        }());

        this.resetFirework = function (firework) {
            firework.x = Math.floor(Math.random() * canvas.width);
            firework.y = canvas.height;
            firework.age = 0;
            firework.phase = "fly";
        };

        this.explode = function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            var explode_height = Math.round(canvas.height / 4);
            for (var a = 0; a < show.fireworks.length; a++) {
                var firework = show.fireworks[a];
                if (firework.phase === "explode") {
                    for (var c = 0; c < firework.sparks.length; c++) {
                        var spark = firework.sparks[c];
                        for (var d = 0; d < 10; d++) {
                            var trailAge = firework.age + d;
                            var x = firework.x + spark.vx * trailAge;
                            var y = firework.y + spark.vy * trailAge + spark.weight * trailAge * spark.weight * trailAge;
                            var fade = d * 40 - firework.age * 2;
                            var r = Math.floor(spark.red * fade);
                            var g = Math.floor(spark.green * fade);
                            var b = Math.floor(spark.blue * fade);
                            if (firework.enabled) {
                                context.beginPath();
                                context.fillStyle = "rgba(" + r + "," + g + "," + b + ",1)";
                                context.rect(x, y, 4, 4);
                                context.fill();
                            }
                        }
                    }
                    firework.age++;
                    if (firework.age > 100 && Math.random() < 0.05) {
                        firework.enabled = true; // only enabled from second time on
                        show.resetFirework(firework);
                    }
                } else {
                    firework.y = firework.y - 30;
                    if (firework.enabled) {
                        window.HswSiteDimmer.dim();
                        context.drawImage(rocket, firework.x, firework.y);
                    }
                    if (Math.random() < 0.01 || firework.y < explode_height) {
                        firework.phase = "explode";
                    }
                }
            }
            if (show.active && show.timer) {
                features(show.explode);
            }
        };

        this.events = (function () {
            var old = !window.addEventListener && window.attachEvent,
                slice = Array.prototype.slice,
                evt = {
                    add: old ? "attachEvent" : "addEventListener",
                    remove: old ? "detachEvent" : "removeEventListener",
                };

            function getArgs(oArgs) {
                var args = slice.call(oArgs),
                    len = args.length;
                if (old) {
                    args[1] = "on" + args[1]; // prefix
                    if (len > 3) {
                        args.pop(); // no capture
                    }
                } else if (len === 3) {
                    args.push(false);
                }
                return args;
            }

            function apply(args, sType) {
                var element = args.shift(),
                    method = [evt[sType]];
                if (old) {
                    element[method](args[0], args[1]);
                } else {
                    element[method].apply(element, args);
                }
            }

            function addEvent() {
                apply(getArgs(arguments), "add");
            }

            function removeEvent() {
                apply(getArgs(arguments), "remove");
            }

            return {
                add: addEvent,
                remove: removeEvent
            };
        }());

        this.resizeHandler = function () {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
        };

        this.resizeHandlerAlt = function () {
            canvas.height = show.targetElement.style.height;
            canvas.width = show.targetElement.style.width;
        };

        this.freeze = function () {
            show.active = false;
        };

        this.resume = function () {
            show.active = true;
            show.explode();
        };

        this.stop = function () {
            this.freeze();
            context.clearRect(0, 0, canvas.width, canvas.height);
        };

        this.timerInit = function () {
            show.timer = true;
        };

        this.init = function () {
            console.log("[FireworkEffects] Инициализация..");
            this.fireworks = [];
            this.active = false;
            for (var i = 0; i < show.max_fireworks; i++) {
                var firework = {
                    sparks: [],
                    enabled: false,
                };
                for (var n = 0; n < show.max_sparks; n++) {
                    var spark = {
                        vx: Math.random() * 5 + 0.5,
                        vy: Math.random() * 5 + 0.5,
                        weight: Math.random() * 0.3 + 0.03,
                        red: Math.floor(Math.random() * 2),
                        green: Math.floor(Math.random() * 2),
                        blue: Math.floor(Math.random() * 2)
                    };
                    if (Math.random() > 0.5) spark.vx = -spark.vx;
                    if (Math.random() > 0.5) spark.vy = -spark.vy;
                    firework.sparks.push(spark);
                }
                show.fireworks.push(firework);
                show.resetFirework(firework);
            }
            show.events.add(window, "resize", show.resizeHandler);
            if (show.freezeOnBlur) {
                if (isIE) {
                    show.events.add(document, "focusout", show.freeze);
                    show.events.add(document, "focusin", show.resume);
                } else {
                    show.events.add(window, "blur", show.freeze);
                    show.events.add(window, "focus", show.resume);
                }
            }
            show.resizeHandler();
            show.animationInterval = Math.max(20, show.animationInterval);
            show.timerInit();
        };

        this.start = function (bFromOnLoad) {
            if (show.onlyStartOnViewMode && mw.config.get("wgAction") !== "view")
                return;
            if (show.fireworksHideToBackground) {
                setTimeout(function () {
                    console.log("[FireworkEffects] Открытие шоу закончилось. Шоу фейерверков продолжится в фоновом режиме.");
                    canvas.style.opacity = 0;
                    setTimeout(function () {
                        canvas.style.zIndex = -1;
                        canvas.style.opacity = 1;
                    }, 350);
                    for (var a = 0; a < show.fireworks.length; a++) {
                        var firework = show.fireworks[a];
                        firework.sparks.splice(show.max_sparks_after_recycle);
                    }
                }, show.fireworksHideTimeout);
            }
            if (didInit && bFromOnLoad) {
                // уже загружен и запущен
                return true;
            }
            didInit = true;

            show.init();
            show.active = true;
            show.explode();
        };

        function doDelayedStart() {
            window.setTimeout(function () {
                show.start(true);
            }, 20);
            // event cleanup
            show.events.remove(isIE ? document : window, "mousemove", doDelayedStart);
        }

        function doStart() {
            if ((!show.excludeMobile || !isMobile)) {
                doDelayedStart();
            }
            // event cleanup
            show.events.remove(window, "load", doStart);
        }

        // hooks for starting the firework show
        if (show.autoStart) {
            if (document.readyState === 'complete') {
                doStart();
            } else {
                show.events.add(window, 'load', doStart, false);
            }
        }

        if (window.fireworkShow.optionalDeferredRegister)
            window.fireworkShow.optionalDeferredRegister.resolve(window.fireworkShow);
    }());
});