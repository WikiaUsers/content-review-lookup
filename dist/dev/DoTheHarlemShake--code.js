/**
 * 
 * @name: Do The Harlem Shake
 * @description: Does the Harlem Shake
 * @author: Unai01
 *
 * HarlemShake effect by Commadelimited (https://gist.github.com/commadelimited/4958196)
 */
(function (window, $, mw) {
	'use strict';
	mw.hook('dev.i18n').add(function (i18no) {
		i18no.loadMessages('DoTheHarlemShake').done(function (i18n) {
			var DoTheHarlemShake = {
				init: function () {
					if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {
						importArticle({
							type: 'script',
							article: 'u:dev:MediaWiki:Chat-js.js'
						});
						mw.hook('dev.chat').add(function (chat) {
							new chat.Button({
								name: 'DoTheHarlemShake',
								attr: {
									click: DoTheHarlemShake.harlemShake,
									'class': 'wds-button',
									text: i18n.msg('harlemShake').plain(),
									id: 'HarlemShakeLink'
								}
							});
						});
					} else {
						importArticle({
							type: 'script',
							article: 'u:dev:MediaWiki:Placement.js'
						});
						mw.hook('dev.placement').add(function (placement) {
							placement.script('ToolsMenuLink');
							$(placement.element('toolbar'))[placement.type('append')](
								$('<li>').html(
									$('<a>', {
										click: DoTheHarlemShake.harlemShake,
										href: '#',
										style: 'cursor:pointer',
										text: i18n.msg('doHS').plain()
									})
								)
							)
						})
					}
				},
				harlemShake: function () {
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
						setTimeout(function () {
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
						e.addEventListener("canplay", function () {
							setTimeout(function () {
								x(k);
							}, 500);
							setTimeout(function () {
								N();
								p();
								for (var e = 0; e < O.length; e++) {
									T(O[e]);
								}
							}, 15500);
						}, true);
						e.addEventListener("ended", function () {
							N();
							h();
						}, true);
						var m = document.createElement("p");
						m.textContent = i18n.msg('error').plain();
						e.appendChild(m);
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
					var i = "https://s3.amazonaws.com/moovweb-marketing/playground/harlem-shake.mp3";
					var s = "mw-harlem_shake_me";
					var o = "im_first";
					var u = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
					var a = "mw-strobe_light";
					var f = "https://s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css";
					var l = "mw_added_css";
					var b = g();
					var w = y();
					var C = document.getElementsByTagName("*");
					var k = null;
					var A;
					for (var L = 0; L < C.length; L++) {
						A = C[L];
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
						A = C[L];
						if (v(A)) {
							O.push(A);
						}
					}
				}
			};
			DoTheHarlemShake.init();
			if (!window.dev || !window.dev.i18n) {
				importArticle({
					type: 'script',
					article: 'u:dev:I18n-js/code.js'
				});
			}
		});
	});
}(this, jQuery, mediaWiki));