/**
 * 
 * @name: Komm, Süsser Tod
 * @description: Adds a button to play the End of Evangelion
 * @author: Americhino
 *
 * HarlemShake effect by Commadelimited (https://gist.github.com/commadelimited/4958196
 * Original script ([[w:c:dev:DoTheHarlemShake]]) by Unai01
 */
(function(window, $, mw) {
    'use strict';
    var conf = mw.config.get([
        'wgTitle',
        'skin'
    ]);
    var KommSusserTod = {
        init: function() {
            this.initUI();
        },
        initUI: function() {
            switch (conf.skin) {
                case "oasis":
                    if (conf.wgTitle === 'Chat') {
                        $('<a>').text('Tumbling Down').addClass('wds-button wds-is-squished')
                            .attr('id', 'KommSusserTodLink').click(function() {
                                KommSusserTod.tumblingDown();
                            }).prependTo('#Rail');
                    } else if (conf.wgTitle !== 'Chat') {
                    $('<li>').addClass('overflow').css('cursor', 'pointer').append('<a>').text('Komm, Süsser Tod').appendTo($(window.WikiaBar.wikiaBarWrapperObj.find('.tools'))).click(function() {
                                KommSusserTod.tumblingDown();
                            });
                    }
                    break;
                case "monobook":
                    var portletLink = mw.util.addPortletLink('p-tb', '#',
                        'Komm, Süsser Tod', 'ca-harlem-shake', 'Click here if you are bored'
                    );
                    $(portletLink).click(function(e) {
                        e.preventDefault();
                        KommSusserTod.tumblingDown();
                    });
                    break;
            }
        },
        tumblingDown: function() {
            function c() {
                var e = document.createElement("link");
                e.setAttribute("type", "text/css");
                e.setAttribute("rel", "stylesheet");
                e.setAttribute("href", f);
                e.setAttribute("class", l);
                document.body.appendChild(e);
            }

            function h() {
                var e = document.getElementsByClassName(l);
                for (var t = 0; t < e.length; t++) {
                    document.body.removeChild(e[t]);
                }
            }

            function p() {
                var e = document.createElement("div");
                e.setAttribute("class", a);
                document.body.appendChild(e);
                setTimeout(function() {
                    document.body.removeChild(e);
                }, 100);
            }

            function d(e) {
                return {
                    height: e.offsetHeight,
                    width: e.offsetWidth
                };
            }

            function v(i) {
                var s = d(i);
                return s.height > e && s.height < n && s.width > t && s.width < r;
            }

            function m(e) {
                var t = e;
                var n = 0;
                while (!!t) {
                    n += t.offsetTop;
                    t = t.offsetParent;
                }
                return n;
            }

            function g() {
                var e = document.documentElement;
                if (!!window.innerWidth) {
                    return window.innerHeight;
                } else if (e && !isNaN(e.clientHeight)) {
                    return e.clientHeight;
                }
                return 0;
            }

            function y() {
                if (window.pageYOffset) {
                    return window.pageYOffset;
                }
                return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            }

            function E(e) {
                var t = m(e);
                return t >= w && t <= b + w;
            }

            function S() {
                var e = document.createElement("audio");
                e.setAttribute("class", l);
                e.src = i;
                e.loop = false;
                e.addEventListener("canplay", function() {
                    setTimeout(function() {
                        x(k);
                    }, 500);
                    setTimeout(function() {
                        N();
                        p();
                        for (var e = 0; e < O.length; e++) {
                            T(O[e]);
                        }
                    }, 15500);
                }, true);
                e.addEventListener("ended", function() {
                    N();
                    h();
                }, true);
                e.innerHTML = " <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>";
                document.body.appendChild(e);
                e.play();
            }

            function x(e) {
                e.className += " " + s + " " + o;
            }

            function T(e) {
                e.className += " " + s + " " + u[Math.floor(Math.random() * u.length)];
            }

            function N() {
                var e = document.getElementsByClassName(s);
                var t = new RegExp("\\b" + s + "\\b");
                for (var n = 0; n < e.length;) {
                    e[n].className = e[n].className.replace(t, "");
                }
            }
            var e = 30;
            var t = 30;
            var n = 350;
            var r = 350;
            var i = "//vignette.wikia.nocookie.net/botkylorens-test/images/a/a2/KommSusserTod.ogg";
            var s = "mw-returning_to_nothing";
            var o = "im_first";
            var u = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
            var a = "mw-lilith";
            var f = "/load.php?mode=articles&articles=u:americhino:MediaWiki:KommSusserTod.css&only=styles";
            var l = "mw_added_css";
            var b = g();
            var w = y();
            var C = document.getElementsByTagName("*");
            var k = null;
            for (var L = 0; L < C.length; L++) {
                var A = C[L];
                if (v(A)) {
                    if (E(A)) {
                        k = A;
                        break;
                    }
                }
            }

            if (A === null) {
                console.warn("Could not find a node of the right size. Please try a different page.");
                return;
            }
            c();
            S();
            var O = [];
            for (L = 0; L < C.length; L++) {
                var A = C[L];
                if (v(A)) {
                    O.push(A);
                }
            }
        }
    };
    KommSusserTod.init();
}(this, jQuery, mediaWiki));
//</source>