/* Any JavaScript here will be loaded for all users on every page load. */
(function ($) {
    // requestAnimationFrame Polyfill
    (function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];

        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                        callback(currTime + timeToCall);
                    },
                    timeToCall);
                lastTime = currTime + timeToCall;

                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }());

    // Sakura function.
    $.fn.sakura = function (options) {
        // We rely on these random values a lot, so define a helper function for it.
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Helper function to attach cross-browser events to an element.
        var prefixes = ['moz', 'ms', 'o', 'webkit', ''];
        var prefCount = prefixes.length;

        function prefixedEvent(element, type, callback) {
            for (var i = 0; i < prefCount; i++) {
                if (!prefixes[i]) {
                    type = type.toLowerCase();
                }

                element.get(0).addEventListener(prefixes[i] + type, callback, false);
            }
        }

        // Defaults for the option object, which gets extended below.
        var defaults = {
            blowAnimations: ['blow-soft-left', 'blow-medium-left', 'blow-hard-left', 'blow-soft-right', 'blow-medium-right', 'blow-hard-right'],
            className: 'sakura',
            fallSpeed: 1,
            maxSize: 14,
            minSize: 9,
            newOn: 300,
            swayAnimations: ['sway-0', 'sway-1', 'sway-2', 'sway-3', 'sway-4', 'sway-5', 'sway-6', 'sway-7', 'sway-8']
        };

        var options = $.extend({}, defaults, options);

        // Declarations.
        var documentHeight = $(document).height();
        var documentWidth = $(document).width();
        var sakura = $('<div class="' + options.className + '" />');

        // Set the overflow-x CSS property on the body to prevent horizontal scrollbars.
        $('body').css({ 'overflow-x': 'hidden' });

        // Function that inserts new petals into the document.
        var petalCreator = function () {
            setTimeout(function () {
                requestAnimationFrame(petalCreator);
            }, options.newOn);

            // Get one random animation of each type and randomize fall time of the petals.
            var blowAnimation = options.blowAnimations[Math.floor(Math.random() * options.blowAnimations.length)];
            var swayAnimation = options.swayAnimations[Math.floor(Math.random() * options.swayAnimations.length)];
            var fallTime = (Math.round(documentHeight * 0.007) + Math.random() * 5) * options.fallSpeed;

            var animations = 'fall ' + fallTime + 's linear 0s 1' + ', ' +
                blowAnimation + ' ' + (((fallTime > 30 ? fallTime : 30) - 20) + getRandomInt(0, 20)) + 's linear 0s infinite' + ', ' +
                swayAnimation + ' ' + getRandomInt(2, 4) + 's linear 0s infinite';
            var petal = sakura.clone();
            var size = getRandomInt(options.minSize, options.maxSize);
            var startPosLeft = Math.random() * documentWidth - 100;
            var startPosTop = -((Math.random() * 20) + 15);

            // Apply Event Listener to remove petals that reach the bottom of the page.
            prefixedEvent(petal, 'AnimationEnd', function () {
                $(this).remove();
            });

            // Apply Event Listener to remove petals that finish their horizontal float animation.
            prefixedEvent(petal, 'AnimationIteration', function (ev) {
                if ($.inArray(ev.animationName, options.blowAnimations) != -1) {
                    $(this).remove();
                }
            });

            petal
                .css({
                    '-webkit-animation': animations,
                    '-o-animation': animations,
                    '-ms-animation': animations,
                    '-moz-animation': animations,
                    animation: animations,
                    height: size,
                    left: startPosLeft,
                    'margin-top': startPosTop,
                    width: size
                })
                .appendTo('body');
        };


        // Recalculate documentHeight and documentWidth on browser resize.
        $(window).resize(function () {
            documentHeight = $(document).height();
            documentWidth = $(document).width();
        });

        // Finally: Start adding petals.
        requestAnimationFrame(petalCreator);
    };
}(jQuery));

/*Min */
! function(n) {
    ! function() {
        for (var n = 0, i = ["ms", "moz", "webkit", "o"], a = 0; a < i.length && !window.requestAnimationFrame; ++a) window.requestAnimationFrame = window[i[a] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i[a] + "CancelAnimationFrame"] || window[i[a] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(i) {
            var a = (new Date).getTime(),
                t = Math.max(0, 16 - (a - n)),
                o = window.setTimeout(function() {
                    i(a + t)
                }, t);
            return n = a + t, o
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(n) {
            clearTimeout(n)
        })
    }(), n.fn.sakura = function(i) {
        function a(n, i) {
            return Math.floor(Math.random() * (i - n + 1)) + n
        }

        function t(n, i, a) {
            for (var t = 0; e > t; t++) o[t] || (i = i.toLowerCase()), n.get(0).addEventListener(o[t] + i, a, !1)
        }
        var o = ["moz", "ms", "o", "webkit", ""],
            e = o.length,
            m = {
                blowAnimations: ["blow-soft-left", "blow-medium-left", "blow-hard-left", "blow-soft-right", "blow-medium-right", "blow-hard-right"],
                className: "sakura",
                fallSpeed: 1,
                maxSize: 14,
                minSize: 9,
                newOn: 300,
                swayAnimations: ["sway-0", "sway-1", "sway-2", "sway-3", "sway-4", "sway-5", "sway-6", "sway-7", "sway-8"]
            },
            i = n.extend({}, m, i),
            r = n(document).height(),
            s = n(document).width(),
            w = n('<div class="' + i.className + '" />');
        n("body").css({
            "overflow-x": "hidden"
        });
        var d = function() {
            setTimeout(function() {
                requestAnimationFrame(d)
            }, i.newOn);
            var o = i.blowAnimations[Math.floor(Math.random() * i.blowAnimations.length)],
                e = i.swayAnimations[Math.floor(Math.random() * i.swayAnimations.length)],
                m = (Math.round(.007 * r) + 5 * Math.random()) * i.fallSpeed,
                l = "fall " + m + "s linear 0s 1, " + o + " " + ((m > 30 ? m : 30) - 20 + a(0, 20)) + "s linear 0s infinite, " + e + " " + a(2, 4) + "s linear 0s infinite",
                u = w.clone(),
                c = a(i.minSize, i.maxSize),
                h = Math.random() * s - 100,
                f = -(20 * Math.random() + 15);
            t(u, "AnimationEnd", function() {
                n(this).remove()
            }), t(u, "AnimationIteration", function(a) {
                -1 != n.inArray(a.animationName, i.blowAnimations) && n(this).remove()
            }), u.css({
                "-webkit-animation": l,
                "-o-animation": l,
                "-ms-animation": l,
                "-moz-animation": l,
                animation: l,
                height: c,
                left: h,
                "margin-top": f,
                width: c
            }).appendTo("body")
        };
        n(window).resize(function() {
            r = n(document).height(), s = n(document).width()
        }), requestAnimationFrame(d)
    }
}(jQuery);