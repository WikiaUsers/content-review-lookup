function RCM() {
	! function e(t, i, a) {
		function r(s, o) {
			if(!i[s]) {
				if(!t[s]) {
					var l = "function" == typeof require && require;
					if(!o && l) return l(s, !0);
					if(n) return n(s, !0);
					var c = new Error("Cannot find module '" + s + "'");
					throw c.code = "MODULE_NOT_FOUND", c
				}
				var d = i[s] = {
					exports: {}
				};
				t[s][0].call(d.exports, function(e) {
					var i = t[s][1][e];
					return r(i || e)
				}, d, d.exports, e, t, i, a)
			}
			return i[s].exports
		}
		for(var n = "function" == typeof require && require, s = 0; s < a.length; s++) r(a[s]);
		return r
	}({
		1: [function(e, t, i) {
			"use strict";
			var a = window.mediaWiki,
				r = function() {
					function e() {}
					return e.init = function(t) {
						e.FAVICON_BASE = t.FAVICON_BASE || e.FAVICON_BASE, e.LOADER_IMG = t.LOADER_IMG || e.LOADER_IMG, e.NOTIFICATION_ICON = t.NOTIFICATION_ICON || e.NOTIFICATION_ICON, e.userOptions = a.user.options.get(["date", "gender"])
					}, e.getLoader = function(e) {
						return void 0 === e && (e = 15), '<svg width="' + e + '" height="' + e + '" id="rcm-loading" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg">\n\t\t\t<g transform="translate(20 50)">\n\t\t\t\t<rect class="bar bar1" fill="#3769c8" x="-10" y="-30" width="20" height="60" opacity="0.3" style="outline:1px solid #3769c8;"/>\n\t\t\t</g>\n\t\t\t<g transform="translate(50 50)">\n\t\t\t\t<rect class="bar bar2" fill="#3769c8" x="-10" y="-30" width="20" height="60" opacity="0.6" style="outline:1px solid #3769c8;"/>\n\t\t\t</g>\n\t\t\t<g transform="translate(80 50)">\n\t\t\t\t<rect class="bar bar3" fill="#3769c8" x="-10" y="-30" width="20" height="60" opacity="0.9" style="outline:1px solid #3769c8;"/>\n\t\t\t</g>\n\t\t</svg>'
					}, e.getLoaderLarge = function(e) {
						return void 0 === e && (e = 75), '<svg width="' + e + '" height="' + e + '" id="rcm-loading-large" viewBox="0 0 100 100">\n\t\t\t<g transform="translate(-20,-20)">\n\t\t\t\t<path class="gear1" fill="#8f7f59" d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z"/>\n\t\t\t</g>\n\t\t\t<g transform="translate(20,20) rotate(15 50 50)">\n\t\t\t\t<path class="gear2" fill="#9f9fab" d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z"/>\n\t\t\t</g>\n\t\t</svg>'
					}, e.getSymbol = function(e, t, i) {
						return void 0 === t && (t = 15), void 0 === i && (i = t), '<svg width="' + t + '" height="' + i + "\" class='rcm-svg-icon'><use xlink:href=\"#" + e + '" width="' + t + '" height="' + i + '" /></svg>'
					}, e.initSymbols = function() {
						if(e.SVG_SYMBOLS) {
							var t = '<svg xmlns:dc="http://purl.org/dc/elements/1.1/" style="height: 0px; width: 0px; position: absolute; overflow: hidden;">\'\n\t\t\t' + e.SVG_SYMBOLS.join("") + "\n\t\t</svg>";
							return delete e.SVG_SYMBOLS, t
						}
					}, e.version = "2.6", e.lastVersionDateString = "Sun Jan 29 2017 00:39:12 GMT-0400 (Eastern Standard Time)", e.config = a.config.get(["skin", "debug", "wgPageName", "wgUserName", "wgUserLanguage", "wgServer", "wgScriptPath", "wgMonthNames"]), e.debug = e.config.debug, e.AUTO_REFRESH_LOCAL_STORAGE_ID = "RecentChangesMultiple-autorefresh-" + e.config.wgPageName, e.OPTIONS_SETTINGS_LOCAL_STORAGE_ID = "RecentChangesMultiple-saveoptionscookie-" + e.config.wgPageName, e.FAVICON_BASE = "http://www.google.com/s2/favicons?domain=", e.LOADER_IMG = "https://images.wikia.nocookie.net/__cb1421922474/common/skins/common/images/ajax.gif", e.NOTIFICATION_ICON = "https://vignette.wikia.nocookie.net/fewfre/images/4/44/RecentChangesMultiple_Notification_icon.png/revision/latest?cb=20161013043805", e.username = e.config.wgUserName, e.uniqID = 0, e.useLocalSystemMessages = !0, e.timezone = "utc", e.loadDelay = 10, e.SVG_SYMBOLS = ['<symbol id="rcm-loading" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg">\n\t\t\t<g transform="translate(20 50)">\n\t\t\t\t<rect class="bar bar1" fill="#3769c8" x="-10" y="-30" width="20" height="60" opacity="0.3" style="outline:1px solid #3769c8;"/>\n\t\t\t</g>\n\t\t\t<g transform="translate(50 50)">\n\t\t\t\t<rect class="bar bar2" fill="#3769c8" x="-10" y="-30" width="20" height="60" opacity="0.6" style="outline:1px solid #3769c8;"/>\n\t\t\t</g>\n\t\t\t<g transform="translate(80 50)">\n\t\t\t\t<rect class="bar bar3" fill="#3769c8" x="-10" y="-30" width="20" height="60" opacity="0.9" style="outline:1px solid #3769c8;"/>\n\t\t\t</g>\n\t\t</symbol>', '<symbol id="rcm-loading-large" viewBox="0 0 100 100">\n\t\t\t<g transform="translate(-20,-20)">\n\t\t\t\t<path class="gear1" fill="#8f7f59" d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z"/>\n\t\t\t</g>\n\t\t\t<g transform="translate(20,20) rotate(15 50 50)">\n\t\t\t\t<path class="gear2" fill="#9f9fab" d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z"/>\n\t\t\t</g>\n\t\t</symbol>', '<symbol id="rcm-columns" viewBox="0 -256 1792 1792" version="1.1" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" inkscape:version="0.48.3.1 r9886" sodipodi:docname="columns_font_awesome.svg">\n\t\t\t<metadata id="metadata12"><rdf:rdf><cc:work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type></cc:work></rdf:rdf></metadata>\n\t\t\t<defs id="defs10"></defs>\n\t\t\t<sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="640" inkscape:window-height="480" id="namedview8" showgrid="false" inkscape:zoom="0.13169643" inkscape:cx="896" inkscape:cy="896" inkscape:window-x="0" inkscape:window-y="25" inkscape:window-maximized="0" inkscape:current-layer="svg2"></sodipodi:namedview>\n\t\t\t<g transform="matrix(1,0,0,-1,68.338983,1277.8305)" id="g4">\n\t\t\t\t<path d="M 160,0 H 768 V 1152 H 128 V 32 Q 128,19 137.5,9.5 147,0 160,0 z M 1536,32 V 1152 H 896 V 0 h 608 q 13,0 22.5,9.5 9.5,9.5 9.5,22.5 z m 128,1216 V 32 q 0,-66 -47,-113 -47,-47 -113,-47 H 160 Q 94,-128 47,-81 0,-34 0,32 v 1216 q 0,66 47,113 47,47 113,47 h 1344 q 66,0 113,-47 47,-47 47,-113 z" id="path6" inkscape:connector-curvature="0" style="fill:currentColor"></path>\n\t\t\t</g>\n\t\t</symbol>', '<symbol id="rcm-picture" viewBox="0 0 548.176 548.176" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="enable-background:new 0 0 548.176 548.176;" xml:space="preserve">\n\t\t\t<g>\n\t\t\t\t<path style="fill:currentColor" d="M534.75,68.238c-8.945-8.945-19.694-13.417-32.261-13.417H45.681c-12.562,0-23.313,4.471-32.264,13.417 C4.471,77.185,0,87.936,0,100.499v347.173c0,12.566,4.471,23.318,13.417,32.264c8.951,8.946,19.702,13.419,32.264,13.419h456.815 c12.56,0,23.312-4.473,32.258-13.419c8.945-8.945,13.422-19.697,13.422-32.264V100.499 C548.176,87.936,543.699,77.185,534.75,68.238z M511.623,447.672c0,2.478-0.899,4.613-2.707,6.427 c-1.81,1.8-3.952,2.703-6.427,2.703H45.681c-2.473,0-4.615-0.903-6.423-2.703c-1.807-1.813-2.712-3.949-2.712-6.427V100.495 c0-2.474,0.902-4.611,2.712-6.423c1.809-1.803,3.951-2.708,6.423-2.708h456.815c2.471,0,4.613,0.905,6.42,2.708 c1.801,1.812,2.707,3.949,2.707,6.423V447.672L511.623,447.672z"/>\n\t\t\t\t<path style="fill:currentColor" d="M127.91,237.541c15.229,0,28.171-5.327,38.831-15.987c10.657-10.66,15.987-23.601,15.987-38.826 c0-15.23-5.333-28.171-15.987-38.832c-10.66-10.656-23.603-15.986-38.831-15.986c-15.227,0-28.168,5.33-38.828,15.986 c-10.656,10.66-15.986,23.601-15.986,38.832c0,15.225,5.327,28.169,15.986,38.826C99.742,232.211,112.683,237.541,127.91,237.541z"/>\n\t\t\t\t<polygon style="fill:currentColor" points="210.134,319.765 164.452,274.088 73.092,365.447 73.092,420.267 475.085,420.267 475.085,292.36 356.315,173.587"/>\n\t\t\t</g>\n\t\t</symbol>', '<symbol id="rcm-preview" viewBox="0 0 480.606 480.606" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="enable-background:new 0 0 480.606 480.606;" xml:space="preserve">\n\t\t\t<g>\n\t\t\t\t<rect x="85.285" y="192.5" width="200" height="30"/>\n\t\t\t\t<path style="fill:currentColor" d="M439.108,480.606l21.213-21.213l-71.349-71.349c12.528-16.886,19.949-37.777,19.949-60.371\n\t\t\t\t\tc0-40.664-24.032-75.814-58.637-92.012V108.787L241.499,0H20.285v445h330v-25.313c6.188-2.897,12.04-6.396,17.475-10.429\n\t\t\t\t\tL439.108,480.606z M250.285,51.213L299.072,100h-48.787V51.213z M50.285,30h170v100h100v96.957\n\t\t\t\t\tc-4.224-0.538-8.529-0.815-12.896-0.815c-31.197,0-59.148,14.147-77.788,36.358H85.285v30h126.856\n\t\t\t\t\tc-4.062,10.965-6.285,22.814-6.285,35.174c0,1.618,0.042,3.226,0.117,4.826H85.285v30H212.01\n\t\t\t\t\tc8.095,22.101,23.669,40.624,43.636,52.5H50.285V30z M307.389,399.208c-39.443,0-71.533-32.09-71.533-71.533\n\t\t\t\t\ts32.089-71.533,71.533-71.533s71.533,32.089,71.533,71.533S346.832,399.208,307.389,399.208z"/>\n\t\t\t</g>\n\t\t</symbol>', '<symbol id="rcm-upvote-tiny" viewBox="0 0 14 14">\n\t\t\t<path style="fill:currentColor" d="M9.746 6.83c-.114.113-.263.17-.413.17-.15 0-.298-.057-.412-.17L7.584 5.49V10.5c0 .322-.26.583-.583.583-.322 0-.583-.26-.583-.583V5.492L5.08 6.829c-.23.227-.598.227-.826 0-.228-.23-.228-.598 0-.826L6.588 3.67c.053-.053.117-.095.19-.125.142-.06.303-.06.445 0 .07.03.136.072.19.126l2.333 2.334c.228.228.228.597 0 .825M7 0C3.14 0 0 3.14 0 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7" fill-rule="evenodd"/>\n\t\t</symbol>', '<symbol id="rcm-lock" viewBox="0 0 18 18">\n\t\t\t<path style="fill:currentColor" d="M11 6H7V5c0-1.1.9-2 2-2s2 .9 2 2v1zm-1 6.7V14H8v-1.3c-.6-.3-1-1-1-1.7 0-1.1.9-2 2-2s2 .9 2 2c0 .7-.4 1.4-1 1.7zM9 1C6.8 1 5 2.8 5 5v1H3c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1h-2V5c0-2.2-1.8-4-4-4z" fill="#999" fill-rule="evenodd"/>\n\t\t</symbol>', '<symbol id="rcm-report" viewBox="0 0 18 18">\n\t\t\t<path style="fill:currentColor" d="M10 9a1 1 0 0 1-2 0V4.5a1 1 0 0 1 2 0V9zm0 4.5a1 1 0 0 1-2 0V13a1 1 0 0 1 2 0v.5zM9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1z" fill-rule="evenodd"></path>\n\t\t</symbol>', '<symbol id="rcm-settings-gear" viewBox="0 0 24 24" enable-background="new 0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">\n\t\t\t<path style="fill:currentColor" d="M20,14.5v-2.9l-1.8-0.3c-0.1-0.4-0.3-0.8-0.6-1.4l1.1-1.5l-2.1-2.1l-1.5,1.1c-0.5-0.3-1-0.5-1.4-0.6L13.5,5h-2.9l-0.3,1.8 C9.8,6.9,9.4,7.1,8.9,7.4L7.4,6.3L5.3,8.4l1,1.5c-0.3,0.5-0.4,0.9-0.6,1.4L4,11.5v2.9l1.8,0.3c0.1,0.5,0.3,0.9,0.6,1.4l-1,1.5 l2.1,2.1l1.5-1c0.4,0.2,0.9,0.4,1.4,0.6l0.3,1.8h3l0.3-1.8c0.5-0.1,0.9-0.3,1.4-0.6l1.5,1.1l2.1-2.1l-1.1-1.5c0.3-0.5,0.5-1,0.6-1.4 L20,14.5z M12,16c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S13.7,16,12,16z"/>\n\t\t</symbol>'], e
				}();
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = r
		}, {}],
		2: [function(e, t, i) {
			"use strict";
			var a = e("./RCMManager"),
				r = e("./ConstantsApp"),
				n = e("./Utils"),
				s = e("./i18n"),
				o = window.Notification,
				l = window.jQuery,
				c = window.mediaWiki,
				d = function() {
					function e() {
						this._notifications = [], this.rcmList = [], this.langLoaded = !1, this.onLangLoadCallbacks = [], this.numLangLoadErrors = 0
					}
					return e.prototype.init = function(e) {
						var t = this;
						c.loader.using("mediawiki.util", "mediawiki.user.options").done(function() {
							r.default.init(e), l(document).ready(l.proxy(t._ready, t)), l(document).unload(l.proxy(t._unload, t)), l(window).focus(l.proxy(t._onFocus, t))
						})
					}, e.prototype._ready = function() {
						var e = this,
							t = document.querySelector(".rc-content-multiple, #rc-content-multiple"),
							i = t.dataset;
						s.default.init(i.lang), "false" === i.localsystemmessages && (r.default.useLocalSystemMessages = !1), i.loaddelay && (r.default.loadDelay = i.loaddelay), i.timezone && (r.default.timezone = i.timezone.toLowerCase()), "false" !== i.hiderail && (document.querySelector("body").className += " rcm-hiderail"), i = null, t = null, n.default.newElement("link", {
							rel: "stylesheet",
							type: "text/css",
							href: "/load.php?mode=articles&articles=u:dev:RecentChangesMultiple/stylesheet.css&only=styles"
						}, document.head), this._loadLangMessages(), c.loader.load(["mediawiki.special.recentchanges", "mediawiki.action.history.diff"]), l("body").append(l(r.default.initSymbols())), this.rcParamsURL = {};
						var a;
						["limit", "days"].forEach(function(t) {
							null != (a = c.util.getParamValue(t)) && (e.rcParamsURL[t] = parseInt(a))
						}), ["hideminor", "hidebots", "hideanons", "hideliu", "hidemyself", "hideenhanced", "hidelogs"].forEach(function(t) {
							null != (a = c.util.getParamValue(t)) && (e.rcParamsURL[t] = "1" == a)
						}), this._parsePage(document), setTimeout(function() {
							c.hook("wikipage.content").add(function(t) {
								t[0].classList && t[0].classList.contains("tabBody") && t[0].querySelector(".rc-content-multiple, #rc-content-multiple") && e._parsePage(t[0])
							})
						}, 0)
					}, e.prototype._parsePage = function(e) {
						var t = this,
							i = e.querySelectorAll(".rc-content-multiple, #rc-content-multiple");
						n.default.forEach(i, function(e, i, n) {
							if(e.rcm_wrapper_used) c.log("[Main](_parsePage) Wrapper already parsed; exiting.");
							else {
								e.rcm_wrapper_used = !0;
								var s = new a.default(e, i);
								t.rcmList.push(s), t.langLoaded ? s.init() : (s.resultCont.innerHTML = "<center>" + r.default.getLoaderLarge() + "</center>", t.onLangLoadCallbacks.push(function() {
									s.init(), s = null
								}))
							}
						});
						var s = e.querySelector(".rcm-refresh-all");
						s && s.addEventListener("click", function() {
							t._refreshAllManagers()
						}), i = null
					}, e.prototype._refreshAllManagers = function() {
						for(var e = 0; e < this.rcmList.length; e++) this.rcmList[e].refresh()
					}, e.prototype._unload = function() {}, e.prototype._onFocus = function() {
						this.clearNotifications(), this.cancelBlinkWindowTitle();
						for(var e = 0; e < this.rcmList.length; e++) this.rcmList[e].lastLoadDateTime = this.rcmList[e].lastLoadDateTimeActual
					}, e.prototype._loadLangMessages = function() {
						function e(e) {
							var t = (r.default.useLocalSystemMessages ? r.default.config.wgServer + r.default.config.wgScriptPath : "http://community.wikia.com") + "/api.php?action=query&format=json&meta=allmessages&amlang=" + s.default.defaultLang + "&ammessages=" + e;
							return c.log(t.replace("&format=json", "&format=jsonfm")), l.ajax({
								type: "GET",
								dataType: "jsonp",
								data: {},
								url: t,
								success: function(e) {
									void 0 !== e && void 0 !== e.query && l.each((e.query || {}).allmessages, function(e, t) {
										"" !== t.missing && (s.default.MESSAGES[t.name] = t["*"])
									})
								}
							})
						}
						var t = this,
							i = [],
							a = "",
							n = 0;
						Object.keys(s.default.MESSAGES).forEach(function(t) {
							a += (n > 0 ? "|" : "") + t, ++n >= 50 && (i.push(e(a)), a = "", n = 0)
						}, this), "" != a && i.push(e(a)), l.when.apply(l, i).done(function(e) {
							t._onAllLangeMessagesLoaded()
						}).fail(function(e) {
							t.numLangLoadErrors < 15 ? (t.numLangLoadErrors++, t._loadLangMessages()) : (c.log("ERROR: " + JSON.stringify(e)), alert("ERROR: RecentChanges text not loaded properly (" + t.numLangLoadErrors + " tries); defaulting to English."), t._onAllLangeMessagesLoaded())
						})
					}, e.prototype._onAllLangeMessagesLoaded = function() {
						this.langLoaded = !0;
						for(var e = 0; e < this.onLangLoadCallbacks.length; e++) this.onLangLoadCallbacks[e]();
						this.onLangLoadCallbacks = []
					}, e.prototype.blinkWindowTitle = function(e) {
						var t = this;
						this.cancelBlinkWindowTitle(), this._originalTitle = document.title, this._blinkInterval = setInterval(function() {
							document.title = document.title == t._originalTitle ? e + " - " + t._originalTitle : t._originalTitle
						}, 1e3)
					}, e.prototype.cancelBlinkWindowTitle = function() {
						this._blinkInterval && (clearInterval(this._blinkInterval), this._blinkInterval = null, document.title = this._originalTitle)
					}, e.prototype.addNotification = function(e, t) {
						"granted" === o.permission && ((t = t || {}).icon = t.icon || r.default.NOTIFICATION_ICON, this._notifications.push(new o(e, t)), this._notifications.length > 1 && this._notifications.shift().close())
					}, e.prototype.clearNotifications = function() {
						for(var e = 0; e < this._notifications.length; e++) this._notifications[e].close();
						this._notifications = []
					}, e
				}();
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = new d
		}, {
			"./ConstantsApp": 1,
			"./RCMManager": 5,
			"./Utils": 11,
			"./i18n": 13
		}],
		3: [function(e, t, i) {
			"use strict";
			var a = e("./ConstantsApp"),
				r = e("./RCMModal"),
				n = e("./Utils"),
				s = e("./i18n"),
				o = e("./RC_TYPE"),
				l = window.jQuery,
				c = window.mediaWiki,
				d = function() {
					function e(e, t) {
						this.manager = t, this.wikiInfo = e
					}
					return e.prototype.dispose = function() {
						delete this.manager, delete this.wikiInfo, this.date = null, this.type = null
					}, e.prototype.init = function(t, i) {
						if(this.date = new Date(t.timestamp), this.userEdited = "" != t.user && "" != t.anon, this.author = this.userEdited ? t.user : t.anon ? t.anon : t.user, this.userhidden = "" == t.userhidden, this.title = n.default.escapeCharacters(t.title.split("/@comment")[0]), this.namespace = t.ns, this.logtype = t.logtype, this.logaction = t.logaction, this.newlen = t.newlen, this.oldlen = t.oldlen, this.summary = e.formatParsedComment(t.parsedcomment, "" == t.commenthidden, this.wikiInfo), this.unparsedComment = t.comment, this.pageid = t.pageid, this.revid = t.revid, this.old_revid = t.old_revid, this.isNewPage = "" == t.new, this.isBotEdit = "" == t.bot, this.isMinorEdit = "" == t.minor, this.isPatrolled = "" == t.patrolled, this.titleNoNS = 0 != this.namespace && this.title.indexOf(":") > -1 ? this.title.split(":")[1] : this.title, this.uniqueID = this.title, this.hrefTitle = n.default.escapeCharactersLink(t.title), this.href = this.wikiInfo.articlepath + this.hrefTitle, this.hrefBasic = this.href.split("/@comment")[0], this.hrefFS = this.href + this.wikiInfo.firstSeperator, this.logtype && "0" != this.logtype) this.type = o.default.LOG, this.log_info_0 = t[0], this.actionhidden = "" == t.actionhidden, this._initLog(t, i);
						else if(t.title.indexOf("/@comment") > -1) {
							if(this.isSubComment = t.title.indexOf("/@comment") != t.title.lastIndexOf("/@comment"), 2001 == this.namespace ? this.type = o.default.BOARD : 1201 == this.namespace ? this.type = o.default.WALL : this.type = o.default.COMMENT, this.type == o.default.BOARD || this.type == o.default.WALL) {
								if(this.uniqueID = n.default.escapeCharactersLink(t.title.split("/@comment")[0] + "/@comment" + t.title.split("/@comment")[1]), 0 == this.isSubComment) {
									var a = /&lt;ac_metadata title=&quot;(.*?)&quot;&gt;.*?&lt;\/ac_metadata&gt;/g.exec(this.summary);
									null != a && (this.threadTitle = a[1], this.summary = this.summary.replace(a[0], ""))
								}
								this.isWallBoardAction = "0" == this.logtype, 0 == this.isWallBoardAction && 0 == this.isNewPage && "" == this.summary && (this.summary = this.type == o.default.BOARD ? s.default("forum-recentchanges-edit") : s.default("wall-recentchanges-edit"))
							}
						} else this.type = o.default.NORMAL;
						return this
					}, e.prototype._initLog = function(e, t) {
						if(!this.actionhidden) {
							var i = null;
							if(this.wikiInfo.useOutdatedLogSystem) {
								if(void 0 == t) return;
								for(var a = -1, r = 0; r < t.length; r++)
									if(e.logid == t[r].logid) {
										a = r;
										break
									}
								if(-1 == a) return;
								i = t[a]
							} else i = e.logparams;
							switch(this.logtype) {
								case "move":
									this.log_move_newTitle = "";
									var o = !1;
									0 == this.wikiInfo.useOutdatedLogSystem ? i && (this.log_move_newTitle = n.default.escapeCharacters(i.target_title), o = "" == i.suppressredirect) : (i = i.move) && (this.log_move_newTitle = n.default.escapeCharacters(i.new_title), o = "" == i.suppressedredirect), this.log_move_noredirect = o ? "-noredirect" : "";
									break;
								case "rights":
									this.log_rights_oldgroups = "?", this.log_rights_newgroups = "?", 0 == this.wikiInfo.useOutdatedLogSystem ? i && (this.log_rights_oldgroups = 0 == i.oldgroups.length ? s.default("rightsnone") : i.oldgroups.join(", "), this.log_rights_newgroups = 0 == i.newgroups.length ? s.default("rightsnone") : i.newgroups.join(", ")) : (i = i.rights) && (this.log_rights_oldgroups = "" == i.old ? s.default("rightsnone") : i.old, this.log_rights_newgroups = "" == i.new ? s.default("rightsnone") : i.new);
									break;
								case "block":
									this.log_block_duration = "?";
									var l = [];
									0 == this.wikiInfo.useOutdatedLogSystem ? i && (this.log_block_duration = i.duration, l = i.flags || []) : (i = i.block) && (this.log_block_duration = i.duration, l = i.flags.split(","));
									for(a = 0; a < l.length; a++) s.default("block-log-flags-" + l[a]) && (l[a] = s.default("block-log-flags-" + l[a]));
									this.log_block_flags = "(" + l.join(", ") + ")", l = null;
									break;
								case "delete":
									this.log_delete_revisions_num = 1;
									var c = "?";
									switch(0 == this.wikiInfo.useOutdatedLogSystem ? i && (this.log_delete_revisions_num = (i.ids || [1]).length, c = (i.new || {}).bitmask) : this.log_info_0 && (c = parseInt((this.log_info_0.split("\n")[3] || "=1").split("=")[1])), c) {
										case 1:
											this.log_delete_new_bitmask = s.default("revdelete-content-hid");
											break;
										case 2:
											this.log_delete_new_bitmask = s.default("revdelete-summary-hid");
											break;
										case 3:
											this.log_delete_new_bitmask = s.default("revdelete-content-hid") + s.default("and") + " " + s.default("revdelete-summary-hid")
									}
									break;
								case "merge":
									this.log_merge_destination = "", this.log_merge_mergepoint = "0", 0 == this.wikiInfo.useOutdatedLogSystem ? i && (this.log_merge_destination = n.default.escapeCharacters(i.dest_title), this.log_merge_mergepoint = i.mergepoint) : this.log_info_0 && e[1] && (this.log_merge_destination = n.default.escapeCharacters(this.log_info_0), this.log_merge_mergepoint = n.default.getTimestampForYYYYMMDDhhmmSS(e[1]))
							}
							i = null
						}
					}, e.prototype.time = function() {
						return n.default.pad(n.default.getHours(this.date), 2) + ":" + n.default.pad(n.default.getMinutes(this.date), 2)
					}, e.prototype.userDetails = function() {
						return e.formatUserDetails(this.wikiInfo, this.author, this.userhidden, this.userEdited)
					}, e.formatUserDetails = function(e, t, i, a) {
						if(i) return '<span class="history-deleted">' + s.default("rev-deleted-user") + "</span>";
						var r = e.canBlock ? s.default("pipe-separator") + "<a href='{0}Special:Block/{1}'>" + s.default("blocklink") + "</a>" : "";
						return a ? n.default.formatString("<span class='mw-usertoollinks'><a href='{0}User:{1}'>{2}</a> (<a href='{0}User_talk:{1}'>" + s.default("talkpagelinktext") + "</a>" + s.default("pipe-separator") + "<a href='{0}Special:Contributions/{1}'>" + s.default("contribslink") + "</a>" + r + ")</span>", e.articlepath, n.default.escapeCharactersLink(t), t) : n.default.formatString("<span class='mw-usertoollinks'><a href='{0}Special:Contributions/{1}'>{2}</a> (<a href='{0}User_talk:{1}'>" + s.default("talkpagelinktext") + "</a>" + r + ")</span>", e.articlepath, n.default.escapeCharactersLink(t), t)
					}, e.prototype.logTitleLink = function() {
						return "(<a class='rc-log-link' href='" + this.wikiInfo.articlepath + "Special:Log/" + this.logtype + "'>" + this.logTitle() + "</a>)"
					}, e.prototype.logTitle = function() {
						switch(this.logtype) {
							case "abusefilter":
								return s.default("abusefilter-log");
							case "block":
								return s.default("blocklogpage");
							case "chatban":
								return s.default("chat-chatban-log");
							case "delete":
								return s.default("dellogpage");
							case "import":
								return s.default("importlogpage");
							case "maps":
								return s.default("wikia-interactive-maps-log-name");
							case "merge":
								return s.default("mergelog");
							case "move":
								return s.default("movelogpage");
							case "protect":
								return s.default("protectlogpage");
							case "upload":
								return s.default("uploadlogpage");
							case "useravatar":
								return s.default("useravatar-log");
							case "newusers":
								return s.default("newuserlogpage");
							case "renameuser":
								return s.default("userrenametool-logpage");
							case "rights":
								return s.default("rightslog");
							case "wikifeatures":
								return s.default("wikifeatures-log-name");
							default:
								return this.logtype
						}
					}, e.prototype.getThreadTitle = function() {
						return this.threadTitle ? this.threadTitle : "<i>" + s.default("rcm-unknownthreadname") + "</i>"
					}, e.prototype.getSummary = function() {
						return e.formatSummary(this.summary)
					}, e.formatSummary = function(e) {
						return "" == e || void 0 == e ? "" : ' <span class="comment" dir="auto">(' + e + ")</span>"
					}, e.formatParsedComment = function(e, t, i) {
						return "" == (e = t ? '<span class="history-deleted">' + s.default("rev-deleted-comment") + "</span>" : e.replace(/<a href="\//g, '<a href="' + i.server + "/")) || void 0 == e || (e = (e = e.trim()).replace(/(\r\n|\n|\r)/gm, " ")), e
					}, e.prototype.logActionText = function() {
						var e = "";
						switch(this.actionhidden && (e = '<span class="history-deleted">' + s.default("rev-deleted-event") + "</span>", e += this.getSummary()), this.logtype) {
							case "block":
								switch(e += this.userDetails() + " ", this.logaction) {
									case "block":
										e += s.default("blocklogentry", this.href + "|" + this.titleNoNS, this.log_block_duration, this.log_block_flags);
										break;
									case "reblock":
										e += s.default("reblock-logentry", this.href + "|" + this.titleNoNS, this.log_block_duration, this.log_block_flags);
										break;
									case "unblock":
										e += s.default("unblocklogentry", this.titleNoNS)
								}
								break;
							case "delete":
								e += s.default("logentry-delete-" + this.logaction, this.userDetails(), void 0, "<a href='" + this.href + "'>" + this.title + "</a>", this.log_delete_new_bitmask, this.log_delete_revisions_num);
								break;
							case "import":
								switch(e += this.userDetails() + " ", this.logaction) {
									case "upload":
										e += s.default("import-logentry-upload", this.href + "|" + this.title);
										break;
									case "interwiki":
										e += s.default("import-logentry-interwiki", this.title)
								}
								break;
							case "merge":
								e += this.userDetails() + " ", e += s.default("import-logentry-upload", this.href + "|" + this.title, this.wikiInfo.articlepath + this.log_merge_destination + "|" + this.log_merge_destination, this.getLogTimeStamp(new Date(this.log_merge_mergepoint)));
								break;
							case "move":
								e += s.default("logentry-move-" + this.logaction + (this.log_move_noredirect || ""), this.userDetails(), void 0, "<a href='" + this.hrefFS + "redirect=no'>" + this.title + "</a>", "<a href='" + (this.wikiInfo.articlepath + n.default.escapeCharactersLink(this.log_move_newTitle)) + "'>" + this.log_move_newTitle + "</a>");
								break;
							case "protect":
								e += this.userDetails() + " ";
								var t = this.href + "|" + this.title;
								switch(this.logaction) {
									case "protect":
										e += s.default("protectedarticle", t) + " " + this.log_info_0;
										break;
									case "modify":
										e += s.default("modifiedarticleprotection", t) + " " + this.log_info_0;
										break;
									case "unprotect":
										e += s.default("unprotectedarticle", t);
										break;
									case "move_prot":
										e += s.default.wiki2html(s.default.MESSAGES.movedarticleprotection.replace("[[$2]]", this.log_info_0), t)
								}
								break;
							case "upload":
								switch(e += this.userDetails() + " ", this.logaction) {
									case "upload":
										e += s.default("uploadedimage", this.href + "|" + this.title);
										break;
									case "overwrite":
										e += s.default("overwroteimage", this.href + "|" + this.title)
								}
								break;
							case "newusers":
								e += s.default("logentry-newusers-" + this.logaction, this.userDetails(), void 0, "");
								break;
							case "rights":
								switch(e += this.userDetails() + " ", this.logaction) {
									case "rights":
										e += s.default("rightslogentry", "<a href='" + this.href + "'>" + this.title + "</a>", this.log_rights_oldgroups, this.log_rights_newgroups)
								}
								break;
							case "useravatar":
								switch(e += this.userDetails() + " ", this.logaction) {
									case "avatar_chn":
										e += s.default("blog-avatar-changed-log");
										break;
									case "avatar_rem":
										e += s.default("blog-avatar-removed-log", "<a href='" + this.href + "'>" + this.title + "</a>")
								}
								break;
							case "renameuser":
								e += this.userDetails() + " renameuser";
								break;
							case "wikifeatures":
								e += this.userDetails() + " wikifeatures";
								break;
							case "chatban":
								var i = this.log_info_0.split("\n"),
									a = void 0;
								i[3] && (a = this.getLogTimeStamp(new Date(1e3 * parseInt(i[3])))), e += this.userDetails() + " ", e += s.default("chat-" + this.logaction + "-log-entry", "<a href='" + this.href + "'>" + this.titleNoNS + "</a>", i[2], a), i = null;
								break;
							case "maps":
								e += s.default("logentry-maps-" + this.logaction, this.userDetails(), void 0, this.title);
								break;
							case "abusefilter":
								var r = this.log_info_0.split("\n"),
									o = r.shift();
								switch(e += this.userDetails() + " ", this.logaction) {
									case "modify":
										e += s.default("abusefilter-log-entry-modify", "<a href='" + this.href + "'>" + this.title + "</a>", "<a href='" + this.wikiInfo.articlepath + "Special:AbuseFilter/history/" + r + "/diff/prev/" + o + "'>" + s.default("abusefilter-log-detailslink") + "</a>")
								}
						}
						return "" == e && (e += this.userDetails() + " ??? (" + this.logtype + " - " + this.logaction + ") "), e += this.getSummary()
					}, e.prototype.wallBoardActionMessageWithSummary = function(e) {
						var t = e || this.getThreadTitle(),
							i = "",
							a = this.type == o.default.BOARD ? "forum-recentchanges" : "wall-recentchanges",
							r = this.isSubComment ? "reply" : "thread";
						switch(this.logaction) {
							case "wall_remove":
								i = a + "-removed-" + r;
								break;
							case "wall_admindelete":
								i = a + "-deleted-" + r;
								break;
							case "wall_restore":
								i = a + "-restored-" + r;
								break;
							case "wall_archive":
								i = a + "-closed-thread";
								break;
							case "wall_reopen":
								i = a + "-reopened-thread"
						}
						return "" != i ? " " + s.default(i, this.href, t, this.getBoardWallParentLink(), this.titleNoNS) + this.getSummary() : this.getSummary()
					}, e.prototype.getBoardWallParentTitleWithNamespace = function() {
						return this.type == o.default.BOARD ? "Board:" + this.titleNoNS : this.type == o.default.WALL ? "Message_Wall:" + this.titleNoNS : (c.log("This should not happen in getBoardWallParent()"), this.title)
					}, e.prototype.getBoardWallParentLink = function() {
						return this.wikiInfo.articlepath + this.getBoardWallParentTitleWithNamespace()
					}, e.prototype.pageTitleTextLink = function() {
						return this.type == o.default.COMMENT ? s.default("article-comments-rc-comment", this.href, this.titleNoNS) : "<a class='rc-pagetitle' href='" + this.href + "'>" + this.title + "</a>"
					}, e.prototype.wallBoardTitleText = function(e) {
						return void 0 == e && (e = this.getThreadTitle()), this.type == o.default.WALL ? s.default("wall-recentchanges-thread-group", "<a href='" + this.href + "'>" + e + "</a>", this.getBoardWallParentLink(), this.titleNoNS) : s.default("forum-recentchanges-thread-group", "<a href='" + this.href + "'>" + e + "</a>", this.getBoardWallParentLink(), this.titleNoNS)
					}, e.prototype.wallBoardHistoryLink = function() {
						var e = "",
							t = "";
						return this.type == o.default.WALL ? (e = this.wikiInfo.articlepath + n.default.escapeCharactersLink(this.getBoardWallParentTitleWithNamespace()) + this.wikiInfo.firstSeperator + "action=history", t = this.isSubComment ? "wall-recentchanges-thread-history-link" : "wall-recentchanges-history-link") : (e = this.wikiInfo.articlepath + n.default.escapeCharactersLink(this.getBoardWallParentTitleWithNamespace()) + this.wikiInfo.firstSeperator + "action=history", t = this.isSubComment ? "forum-recentchanges-thread-history-link" : "forum-recentchanges-history-link"), "(<a href='" + e + "'>" + s.default(t) + "</a>)"
					}, e.prototype.getLogTimeStamp = function(t) {
						return e.getFullTimeStamp(t)
					}, e.getFullTimeStamp = function(e) {
						return n.default.formatWikiTimeStamp(e)
					}, e.prototype.shouldBeRemoved = function(e) {
						return this.date.getSeconds() < e.getSeconds() - 86400 * this.wikiInfo.rcParams.days || this.type != o.default.DISCUSSION && this.wikiInfo.resultsCount > this.wikiInfo.rcParams.limit || this.type == o.default.DISCUSSION && this.wikiInfo.discussionsCount > Math.min(this.wikiInfo.rcParams.limit, 50)
					}, e.previewDiff = function(t, i, a, n, o, d) {
						c.log("http:" + a), c.log(n), c.log(o);
						var h = t + " - " + s.default("rcm-module-diff-title"),
							u = [];
						u.push({
							value: s.default("rcm-module-diff-open"),
							event: "diff",
							callback: function() {
								window.open(n, "_blank")
							}
						}), null != o && u.push({
							value: s.default("rcm-module-diff-undo"),
							event: "undo",
							callback: function() {
								window.open(o, "_blank")
							}
						}), r.default.showLoadingModal({
							title: h,
							rcm_buttons: u
						}, function() {
							l.ajax({
								type: "GET",
								dataType: "jsonp",
								data: {},
								url: a,
								success: function(t) {
									if(r.default.isModalOpen()) {
										var a = t.query.pages[i].revisions[0],
											n = "" == a.minor ? '<abbr class="minoredit">' + s.default("minoreditletter") + "</abbr> " : "",
											o = d.newRev.minor ? '<abbr class="minoredit">' + s.default("minoreditletter") + "</abbr> " : "",
											l = "<div id='rcm-diff-view'><table class='diff'><colgroup><col class='diff-marker'><col class='diff-content'><col class='diff-marker'><col class='diff-content'></colgroup><tbody><tr class='diff-header' valign='top'><td class='diff-otitle' colspan='2'><div class='mw-diff-otitle1'><strong><a href='" + d.hrefFS + "oldid=" + a.diff.from + "' data-action='revision-link-before'>" + s.default("revisionasof", e.getFullTimeStamp(new Date(a.timestamp))) + "</a> <span class='mw-rev-head-action'>(<a href=\"" + d.hrefFS + "oldid=" + a.diff.from + '&action=edit" data-action="edit-revision-before">' + s.default("editold") + "</a>)</span></strong></div><div class='mw-diff-otitle2'>" + e.formatUserDetails(d.wikiInfo, a.user, "" == a.userhidden, "" != a.anon) + "</div><div class='mw-diff-otitle3'>" + n + e.formatSummary(e.formatParsedComment(a.parsedcomment, "" == a.commenthidden, d.wikiInfo)) + "</div></td><td class='diff-ntitle' colspan='2'><div class='mw-diff-ntitle1'><strong><a href='" + d.hrefFS + "oldid=" + a.diff.to + "' data-action='revision-link-after'>" + s.default("revisionasof", e.getFullTimeStamp(d.newRev.date)) + "</a> <span class='mw-rev-head-action'>(<a href=\"" + d.hrefFS + "oldid=" + a.diff.to + '&action=edit" data-action="edit-revision-after">' + s.default("editold") + "</a>)</span><span class='mw-rev-head-action'>(<a href=\"" + d.hrefFS + "action=edit&undoafter=" + a.diff.to + "&undo=" + a.diff.to + '" data-action="undo">' + s.default("editundo") + "</a>)</span></strong></div><div class='mw-diff-ntitle2'>" + d.newRev.user + "</div><div class='mw-diff-ntitle3'>" + o + d.newRev.summary + "</div></td></tr>" + a.diff["*"] + "</tbody></table>";
										r.default.setModalContent(l)
									}
								}
							})
						})
					}, e.previewImages = function(t, i, o) {
						var d = i.slice(),
							h = (t += "&iiurlwidth=210&iiurlheight=210") + "&titles=" + d.splice(0, 50).join("|");
						c.log("http:" + h.replace("&format=json", "&format=jsonfm"), i);
						var u = s.default("awc-metrics-images"),
							m = [],
							f = function() {
								if(d.length > 0) {
									c.log("Over 50 images to display; Extra images must be loaded later.");
									var i = document.querySelector("#" + r.default.MODAL_CONTENT_ID),
										u = i.querySelector(".rcm-gallery"),
										m = n.default.newElement("center", {
											style: "margin-bottom: 8px;"
										}, i);
									n.default.newElement("button", {
										innerHTML: s.default("specialvideos-btn-load-more")
									}, m).addEventListener("click", function() {
										h = t + "&titles=" + d.splice(0, 50).join("|"), c.log("http:" + h.replace("&format=json", "&format=jsonfm")), m.innerHTML = a.default.getLoader(25), l.ajax({
											type: "GET",
											dataType: "jsonp",
											data: {},
											url: h,
											success: function(t) {
												n.default.removeElement(m), u.innerHTML += e.previewImages_getGalleryItemsFromData(t.query.pages, o, 210), f()
											}
										})
									})
								}
							};
						r.default.showLoadingModal({
							title: u,
							rcm_buttons: m
						}, function() {
							l.ajax({
								type: "GET",
								dataType: "jsonp",
								data: {},
								url: h,
								success: function(t) {
									if(r.default.isModalOpen()) {
										var i = '<div class="rcm-gallery wikia-gallery wikia-gallery-caption-below wikia-gallery-position-center wikia-gallery-spacing-medium wikia-gallery-border-small wikia-gallery-captions-center wikia-gallery-caption-size-medium">' + e.previewImages_getGalleryItemsFromData(t.query.pages, o, 210) + "</div>";
										r.default.setModalContent(i), f()
									}
								}
							})
						})
					}, e.previewImages_getGalleryItemsFromData = function(t, i, a) {
						var r = "";
						for(var n in t) r += e.previewImages_getGalleryItem(t[n], i, a);
						return r
					}, e.previewImages_getGalleryItem = function(e, t, i) {
						var a = e.title,
							r = a.indexOf(":") > -1 ? a.split(":")[1] : a,
							o = e.imageinfo ? e.imageinfo[0] : null,
							l = null;
						"" == e.missing ? l = {
							thumbHref: t + n.default.escapeCharactersLink(a),
							thumbText: s.default("filedelete-success", a)
						} : null == o ? l = {
							thumbHref: t + n.default.escapeCharactersLink(a),
							thumbText: s.default("shared_help_was_redirect", a)
						} : n.default.isFileAudio(a) ? l = {
							thumbHref: o.url,
							thumbText: '<img src="/extensions/OggHandler/play.png" height="22" width="22"><br />' + a
						} : ("" == o.thumburl || 0 == o.width && 0 == o.height) && (l = {
							thumbHref: o.url,
							thumbText: a
						});
						var c = function(e) {
							var t = e.wrapperStyle,
								i = e.image,
								a = e.imageHref,
								r = e.imageStyle,
								n = e.isLightbox,
								s = e.caption;
							return '<div class="wikia-gallery-item"><div class="thumb"><div class="gallery-image-wrapper accent" ' + (t = t ? 'style="' + t + '"' : "") + '><a class="' + (n ? "image-no-lightbox" : "image lightbox") + '" href="' + a + '" target="_blank" style="' + r + '">' + i + '</a></div></div><div class="lightbox-caption" style="width:100%;">' + s + "</div></div>"
						};
						if(l) return c({
							isLightbox: !1,
							wrapperStyle: null,
							image: l.thumbText,
							imageHref: l.thumbHref,
							imageStyle: "height:" + i + "px; width:" + i + "px; line-height:inherit;",
							caption: r
						});
						var d = i / 2 - o.thumbheight / 2,
							h = o.thumbwidth;
						return c({
							isLightbox: !0,
							wrapperStyle: "position: relative; width:" + h + "px; top:" + d + "px;",
							image: '<img class="thumbimage" src="' + o.thumburl + '" alt="' + a + '">',
							imageHref: o.url,
							imageStyle: "width:" + h + "px;",
							caption: '<a href="' + o.descriptionurl + '">' + r + "</a>"
						})
					}, e.previewPage = function(e, t, i, a) {
						c.log("http:" + e);
						var o = "" + t,
							d = [{
								value: s.default("wikiaPhotoGallery-conflict-view"),
								event: "diff",
								callback: function() {
									window.open(i, "_blank")
								}
							}];
						r.default.showLoadingModal({
							title: o,
							rcm_buttons: d
						}, function() {
							l.ajax({
								type: "GET",
								dataType: "jsonp",
								data: {},
								url: e,
								success: function(e) {
									if(r.default.isModalOpen()) {
										var t = e.parse.text["*"],
											i = "<div class='ArticlePreview'><div class='ArticlePreviewInner'><div class='WikiaArticle'><div id='mw-content-text'>" + t + "</div></div></div></div>";
										r.default.setModalContent(i);
										var s = document.querySelector("#" + r.default.MODAL_CONTENT_ID),
											o = document.querySelector("#" + r.default.MODAL_CONTENT_ID + " #mw-content-text");
										if(o.attachShadow) {
											r.default.setModalContent(""), (s = s.attachShadow({
												mode: "open"
											})).innerHTML = i, (o = s.querySelector("#mw-content-text")).innerHTML = "";
											var d = document.querySelector("head").cloneNode(!0);
											n.default.forEach(d.querySelectorAll("link[rel=stylesheet]"), function(e, t, i) {
												o.innerHTML += "<style> @import url(" + e.href + "); </style>"
											}), n.default.forEach(d.querySelectorAll("link"), function(e, t, i) {
												n.default.removeElement(e)
											});
											h = n.default.newElement("div", {
												innerHTML: e.parse.headhtml["*"]
											});
											n.default.forEach(h.querySelectorAll("link[rel=stylesheet]"), function(e, t, i) {
												o.innerHTML += "<style> @import url(" + e.href + "); </style>"
											}), n.default.forEach(h.querySelectorAll("link"), function(e, t, i) {
												n.default.removeElement(e)
											}), o.innerHTML += d.innerHTML, o.innerHTML += "\n\x3c!-- Loaded Wiki Styles --\x3e\n", o.innerHTML += h.innerHTML, o.innerHTML += t
										} else if("scoped" in document.createElement("style")) {
											var h = n.default.newElement("div", {
												innerHTML: e.parse.headhtml["*"]
											});
											n.default.forEach(h.querySelectorAll("link[rel=stylesheet]"), function(e, t, i) {
												o.innerHTML += "<style scoped> @import url(" + e.href + "); </style>"
											})
										}
										n.default.forEach(o.querySelectorAll("a[href^='/']"), function(e, t, i) {
											e.href = a + e.getAttribute("href")
										}), c.hook("wikipage.content").fire(l(o))
									}
								}
							})
						})
					}, e
				}();
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = d
		}, {
			"./ConstantsApp": 1,
			"./RCMModal": 6,
			"./RC_TYPE": 10,
			"./Utils": 11,
			"./i18n": 13
		}],
		4: [function(e, t, i) {
			"use strict";
			var a = e("./RCData"),
				r = e("./Utils"),
				n = e("./i18n"),
				s = e("./RC_TYPE"),
				o = e("./ConstantsApp"),
				l = window.jQuery,
				c = window.mediaWiki,
				d = function() {
					function e(e) {
						this.manager = e, this.list = []
					}
					return Object.defineProperty(e.prototype, "newest", {
						get: function() {
							return this.list[0]
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(e.prototype, "oldest", {
						get: function() {
							return this.list[this.list.length - 1]
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(e.prototype, "date", {
						get: function() {
							return this.newest.date
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(e.prototype, "wikiInfo", {
						get: function() {
							return this.newest.wikiInfo
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(e.prototype, "type", {
						get: function() {
							return this.newest.type
						},
						enumerable: !0,
						configurable: !0
					}), e.prototype.dispose = function() {
						delete this.manager;
						for(var e = 0; e < this.list.length; e++) this.list[e].dispose(), this.list[e] = null;
						this.list = null, this.htmlNode = null
					}, e.prototype.addRC = function(e) {
						return this.list.push(e), this.list.sort(function(e, t) {
							return t.date.valueOf() - e.date.valueOf()
						}), this
					}, e.prototype.removeRC = function(e) {
						var t = this.list.indexOf(e);
						t > -1 ? this.list.splice(t, 1)[0].dispose() : c.log("[RCList](removeRC) Data did not exist in list, and thus could not be removed.", e)
					}, e.prototype.shouldGroupWith = function(e) {
						if(this.wikiInfo.servername == e.wikiInfo.servername && this.type == e.type && r.default.getMonth(this.date) == r.default.getMonth(e.date) && r.default.getDate(this.date) == r.default.getDate(e.date)) switch(this.type) {
							case s.default.LOG:
								if(this.newest.logtype == e.logtype) return !0;
								break;
							default:
								if(this.newest.uniqueID == e.uniqueID) return !0
						}
						return !1
					}, e.prototype.getLink = function(e, t, i) {
						return e.hrefFS + "curid=" + e.pageid + (t || 0 == t ? "&diff=" + t : "") + (i ? "&oldid=" + i : "")
					}, e.prototype.getDiffLink = function(e, t) {
						return e.hrefFS + "curid=" + e.pageid + "&diff=" + (t ? t.revid : 0) + "&oldid=" + e.old_revid
					}, e.prototype._diffHist = function(e) {
						var t = n.default("diff");
						return 0 == e.isNewPage && (t = "<a class='rc-diff-link' href='" + this.getDiffLink(e, e) + "'>" + t + "</a>" + this.getAjaxDiffButton()), this.type == s.default.NORMAL && 6 == e.namespace && (t += this.getAjaxImageButton()), "(" + (t + n.default("pipe-separator")) + "<a class='rc-hist-link' href='" + e.hrefFS + "action=history'>" + n.default("hist") + "</a>)"
					}, e.prototype._diffSizeText = function(e, t) {
						var i = e.newlen - (t || e).oldlen,
							a = c.language.convertNumber(i),
							s = "<strong class='{0}'>{1}</strong>";
						return i > 0 ? r.default.formatString(s, "mw-plusminus-pos", n.default("parentheses", "+" + a)) : i < 0 ? r.default.formatString(s, "mw-plusminus-neg", n.default("parentheses", a)) : r.default.formatString(s, "mw-plusminus-null", n.default("parentheses", a))
					}, e.prototype._contributorsCountText = function() {
						var e = this,
							t = {};
						this.list.forEach(function(e) {
							t.hasOwnProperty(e.author) ? t[e.author].count++ : (t[e.author] = {
								count: 1,
								userEdited: e.userEdited
							}, t[e.author].avatar = e.type == s.default.DISCUSSION ? e.getAvatarImg() : "")
						});
						var i = "[",
							a = 0,
							r = this.list.length;
						return Object.keys(t).forEach(function(n) {
							i += e._userPageLink(n, t[n].userEdited, t[n].avatar) + (t[n].count > 1 ? " (" + t[n].count + "&times;)" : ""), (a += t[n].count) < r && (i += "; ")
						}, this), i + "]"
					}, e.prototype._changesText = function() {
						var e = n.default("nchanges", this.list.length);
						return this.type == s.default.NORMAL && 0 == this.oldest.isNewPage && (e = "<a class='rc-changes-link' href='" + this.getDiffLink(this.oldest, this.newest) + "'>" + e + "</a>" + this.getAjaxDiffButton()), this.type == s.default.NORMAL && 6 == this.newest.namespace && (e += this.getAjaxImageButton()), e
					}, e.prototype._userPageLink = function(e, t, i) {
						return t ? i + "<a href='" + this.wikiInfo.articlepath + "User:" + r.default.escapeCharactersLink(e) + "'>" + e + "</a>" : "<a href='" + this.wikiInfo.articlepath + "Special:Contributions/" + r.default.escapeCharactersLink(e) + "'>" + e + "</a>"
					}, e.prototype.getExistingThreadTitle = function() {
						var e = null;
						return this.list.some(function(t) {
							return !!t.threadTitle && (e = t.threadTitle, !0)
						}), e
					}, e.prototype.getThreadTitle = function() {
						var e = this,
							t = this.getExistingThreadTitle(),
							i = t;
						if(this.manager.extraLoadingEnabled) {
							var a = r.default.uniqID();
							if(i = "<span id='" + a + "'><i>" + (t || n.default("rcm-unknownthreadname")) + "</i></span>", this.type != s.default.DISCUSSION) this.manager.secondaryWikiData.push({
								url: this.wikiInfo.scriptpath + "/api.php?action=query&format=json&prop=revisions&titles=" + this.newest.uniqueID + "&rvprop=content",
								callback: function(t) {
									var i = document.querySelector("#" + a),
										n = r.default.getFirstItemFromObject(t.query.pages);
									i.parentNode.href = e.wikiInfo.articlepath + "Thread:" + n.pageid;
									var s = /<ac_metadata title="(.*?)".*?>.*?<\/ac_metadata>/g.exec(n.revisions[0]["*"]);
									null != s && (i.innerHTML = s[1])
								}
							});
							else if(null == t) {
								var l = this.newest;
								this.manager.secondaryWikiData.push({
									url: "https://services.wikia.com/discussion/" + this.wikiInfo.wikiaCityID + "/threads/" + l.threadId,
									dataType: "json",
									callback: function(t) {
										e.newest.threadTitle = t.title || t.rawContent.slice(0, 35).trim() + "...";
										var i = document.querySelector("#" + a);
										if(i) {
											i.innerHTML = e.newest.threadTitle;
											var n = "";
											t.isLocked && (n += o.default.getSymbol("rcm-lock")), t.isReported && (n += o.default.getSymbol("rcm-report")), n && i.parentNode.insertBefore(r.default.newElement("span", {
												innerHTML: n
											}), i)
										}
									}
								})
							} else i = t
						} else null == i && (i = "<i>" + n.default("rcm-unknownthreadname") + "</i>");
						return i
					}, e.prototype.getAjaxDiffButton = function() {
						return ' <span class="rcm-ajaxIcon rcm-ajaxDiff">' + o.default.getSymbol("rcm-columns") + "</span>"
					}, e.prototype.getAjaxImageButton = function() {
						return ' <span class="rcm-ajaxIcon rcm-ajaxImage">' + o.default.getSymbol("rcm-picture") + "</span>"
					}, e.prototype.getAjaxPagePreviewButton = function() {
						return ' <span class="rcm-ajaxIcon rcm-ajaxPage">' + o.default.getSymbol("rcm-preview") + "</span>"
					}, e.prototype.addPreviewDiffListener = function(e, t, i) {
						if(e) {
							void 0 == i && (i = t);
							var r = t.title,
								n = t.pageid,
								s = this.wikiInfo.scriptpath + "/api.php?action=query&format=json&prop=revisions|info&rvprop=size|user|parsedcomment|timestamp|flags&rvdiffto=" + i.revid + "&revids=" + t.old_revid,
								o = t.hrefFS + "curid=" + t.pageid + "&diff=" + i.revid + "&oldid=" + t.old_revid,
								l = t.hrefFS + "curid=" + t.pageid + "&undo=" + i.revid + "&undoafter=" + t.old_revid + "&action=edit",
								c = {
									wikiInfo: t.wikiInfo,
									hrefFS: t.hrefFS,
									newRev: {
										user: i.userDetails(),
										summary: i.getSummary(),
										date: i.date,
										minor: i.isMinorEdit
									}
								};
							this._addAjaxClickListener(e, function() {
								a.default.previewDiff(r, n, s, o, l, c)
							}), t = null, i = null
						}
					}, e.prototype.addPreviewImageListener = function(e, t) {
						if("[object Array]" !== Object.prototype.toString.call(t) && (t = [t]), t = t, e) {
							for(var i = [], r = 0; r < t.length; r++) i.indexOf(t[r].hrefTitle) < 0 && i.push(t[r].hrefTitle);
							var n = this.wikiInfo.scriptpath + "/api.php?action=query&prop=imageinfo&format=json&redirects&iiprop=url|size",
								s = this.wikiInfo.articlepath;
							this._addAjaxClickListener(e, function() {
								a.default.previewImages(n, i, s)
							}), t = null
						}
					}, e.prototype.addPreviewPageListener = function(e, t) {
						if(e) {
							var i = this.wikiInfo.scriptpath + "/api.php?action=parse&format=json&pageid=" + t.pageid + "&prop=text|headhtml&disabletoc=true",
								r = t.title,
								n = t.href;
							t.type != s.default.WALL && t.type != s.default.BOARD && t.type != s.default.COMMENT || (n = this.wikiInfo.articlepath + "Thread:" + t.pageid);
							var o = this.wikiInfo.server;
							this._addAjaxClickListener(e, function() {
								a.default.previewPage(i, r, n, o)
							})
						}
					}, e.prototype._addAjaxClickListener = function(e, t) {
						var i = function(e) {
							e.preventDefault(), t()
						};
						e.addEventListener("click", i)
					}, e.prototype._flag = function(e, t, i) {
						var a = "",
							r = "";
						switch(e) {
							case "newpage":
								t.isNewPage && (a = "newpageletter", r = "recentchanges-label-newpage");
								break;
							case "minoredit":
								t.isMinorEdit && (a = "minoreditletter", r = "recentchanges-label-minor");
								break;
							case "botedit":
								t.isBotEdit && (a = "boteditletter", r = "recentchanges-label-bot")
						}
						return "" == a ? i : '<abbr class="' + e + '" title="' + n.default(r) + '">' + n.default(a) + "</abbr>"
					}, e.prototype._getFlags = function(e, t, i) {
						return i = i || {}, "" + this._flag("newpage", e, t) + (i.ignoreminoredit ? t : this._flag("minoredit", e, t)) + this._flag("botedit", e, t) + t
					}, e.prototype._showFavicon = function() {
						return this.manager.chosenWikis.length > 1
					}, e.prototype._getBackgroundClass = function() {
						return this._showFavicon() ? "rcm-tiled-favicon" : ""
					}, e.prototype._toHTMLSingle = function(t) {
						if(this.list.length > 1) return this._toHTMLBlock();
						var i = "";
						switch(t.type) {
							case s.default.LOG:
								i += t.logTitleLink(), "upload" == t.logtype && (i += this.getAjaxImageButton()), i += e.SEP, i += t.logActionText();
								break;
							case s.default.WALL:
							case s.default.BOARD:
								t.isWallBoardAction ? (i += e.SEP, i += t.userDetails(), i += t.wallBoardActionMessageWithSummary(this.getThreadTitle())) : (i += t.wallBoardTitleText(this.getThreadTitle()), i += this.getAjaxPagePreviewButton(), i += " " + this._diffHist(t), i += e.SEP, i += this._diffSizeText(t), i += e.SEP, i += t.userDetails(), i += t.getSummary());
								break;
							case s.default.DISCUSSION:
								var a = t;
								i += a.getThreadStatusIcons(), i += a.discusssionTitleText(this.getThreadTitle()), i += e.SEP, i += a.userDetails(), i += a.getSummary();
								break;
							case s.default.COMMENT:
							case s.default.NORMAL:
							default:
								i += t.pageTitleTextLink(), i += this.getAjaxPagePreviewButton(), i += " " + this._diffHist(t), i += e.SEP, i += this._diffSizeText(t), i += e.SEP, i += t.userDetails(), i += t.getSummary()
						}
						var n = r.default.newElement("table", {
							className: "mw-enhanced-rc " + t.wikiInfo.rcClass
						});
						r.default.newElement("caption", {
							className: this._getBackgroundClass()
						}, n);
						var o = r.default.newElement("tr", {}, n);
						return this._showFavicon() && r.default.newElement("td", {
							innerHTML: t.wikiInfo.getFaviconHTML(!0)
						}, o), r.default.newElement("td", {
							className: "mw-enhanced-rc",
							innerHTML: '<img src="https://images.wikia.nocookie.net/__cb1422546004/common/skins/common/images/Arr_.png" width="12" height="12" alt="&nbsp;" title="">' + this._getFlags(t, "&nbsp;") + "&nbsp;" + t.time() + "&nbsp;"
						}, o), r.default.newElement("td", {
							innerHTML: i
						}, o), this.addPreviewDiffListener(n.querySelector(".rcm-ajaxDiff"), t), this.addPreviewImageListener(n.querySelector(".rcm-ajaxImage"), t), this.addPreviewPageListener(n.querySelector(".rcm-ajaxPage"), t), this.manager.makeLinksAjax && (this.addPreviewDiffListener(n.querySelector(".rc-diff-link"), t), n.querySelector(".rcm-ajaxImage") && (this.addPreviewImageListener(n.querySelector(".rc-log-link"), t), this.addPreviewImageListener(n.querySelector(".rc-pagetitle"), t))), n
					}, e.prototype._toHTMLBlock = function() {
						if(1 == this.list.length) return this._toHTMLSingle(this.newest);
						for(var e = this._toHTMLBlockHead(), t = 0; t < this.list.length; t++) e.querySelector("tbody").appendChild(this._toHTMLBlockLine(this.list[t]));
						return l(e).makeCollapsible && l(e).makeCollapsible(), e
					}, e.prototype._toHTMLBlockHead = function() {
						var t = "";
						switch(this.type) {
							case s.default.LOG:
								t += this.newest.logTitleLink(), "upload" == this.newest.logtype && (t += this.getAjaxImageButton());
								break;
							case s.default.NORMAL:
								t += "<a class='rc-pagetitle' href='" + this.newest.href + "'>" + this.newest.title + "</a>", t += this.getAjaxPagePreviewButton(), t += " (" + this._changesText() + n.default("pipe-separator") + "<a href='" + this.newest.hrefFS + "action=history'>" + n.default("hist") + "</a>)", t += e.SEP, t += this._diffSizeText(this.newest, this.oldest);
								break;
							case s.default.WALL:
							case s.default.BOARD:
								t += this.newest.wallBoardTitleText(this.getThreadTitle()), t += " (" + this._changesText() + ")";
								break;
							case s.default.DISCUSSION:
								t += this.newest.discusssionTitleText(this.getThreadTitle(), !0), t += " (" + this._changesText() + ")";
								break;
							case s.default.COMMENT:
								t += n.default.wiki2html(n.default.MESSAGES["article-comments-rc-comments"].replace("$1", "$3|$1"), this.newest.titleNoNS, void 0, this.wikiInfo.articlepath + (1 == this.newest.namespace ? "" : this.wikiInfo.namespaces[String(this.newest.namespace - 1)]["*"] + ":") + this.newest.titleNoNS + "#WikiaArticleComments"), t += " (" + this._changesText() + ")"
						}
						t += e.SEP, t += this._contributorsCountText();
						var i = r.default.newElement("table", {
							className: "mw-collapsible mw-enhanced-rc mw-collapsed " + this.newest.wikiInfo.rcClass
						});
						r.default.newElement("caption", {
							className: this._getBackgroundClass()
						}, i);
						var a = r.default.newElement("tbody", {}, i),
							o = r.default.newElement("tr", {}, a);
						this._showFavicon() && r.default.newElement("td", {
							innerHTML: this.newest.wikiInfo.getFaviconHTML(!0)
						}, o);
						var l = r.default.newElement("td", {}, o);
						return r.default.newElement("span", {
							className: "mw-collapsible-toggle",
							innerHTML: '<span class="mw-rc-openarrow"><a title="' + n.default("rc-enhanced-expand") + '"><img width="12" height="12" title="' + n.default("rc-enhanced-expand") + '" alt="+" src="https://images.wikia.nocookie.net/__cb1422546004/common/skins/common/images/Arr_r.png"></a></span><span class="mw-rc-closearrow"><a title="' + n.default("rc-enhanced-hide") + '"><img width="12" height="12" title="' + n.default("rc-enhanced-hide") + '" alt="-" src="https://images.wikia.nocookie.net/__cb1422546004/common/skins/common/images/Arr_d.png"></a></span>'
						}, l), r.default.newElement("td", {
							className: "mw-enhanced-rc",
							innerHTML: this._getFlags(this.oldest, "&nbsp;", {
								ignoreminoredit: !0
							}) + "&nbsp;" + this.newest.time() + "&nbsp;"
						}, o), r.default.newElement("td", {
							innerHTML: t
						}, o), this.addPreviewDiffListener(i.querySelector(".rcm-ajaxDiff"), this.oldest, this.newest), this.addPreviewImageListener(i.querySelector(".rcm-ajaxImage"), this.list), this.addPreviewPageListener(i.querySelector(".rcm-ajaxPage"), this.newest), this.manager.makeLinksAjax && (this.addPreviewDiffListener(i.querySelector(".rc-diff-link, .rc-changes-link"), this.oldest, this.newest), i.querySelector(".rcm-ajaxImage") && (this.addPreviewImageListener(i.querySelector(".rc-log-link"), this.list), this.addPreviewImageListener(i.querySelector(".rc-pagetitle"), this.list))), i
					}, e.prototype._toHTMLBlockLine = function(t) {
						var i = "";
						switch(t.type) {
							case s.default.LOG:
								i += "<span class='mw-enhanced-rc-time'>" + t.time() + "</span>", "upload" == t.logtype && (i += this.getAjaxImageButton()), i += e.SEP, i += t.logActionText();
								break;
							case s.default.WALL:
							case s.default.BOARD:
								t.isWallBoardAction ? (i += "<span class='mw-enhanced-rc-time'>" + t.time() + "</span>", i += e.SEP, i += t.userDetails(), i += t.wallBoardActionMessageWithSummary(this.getThreadTitle())) : (i += "<span class='mw-enhanced-rc-time'><a href='" + t.href + "' title='" + t.title + "'>" + t.time() + "</a></span>", i += " (<a href='" + t.href + "'>" + n.default("cur") + "</a>", i += this.getAjaxPagePreviewButton(), 0 == t.isNewPage && (i += n.default("pipe-separator") + "<a href='" + this.getDiffLink(t, t) + "'>" + n.default("last") + "</a>" + this.getAjaxDiffButton()), i += ")", i += e.SEP, i += this._diffSizeText(t), i += e.SEP, i += t.userDetails(), i += t.getSummary());
								break;
							case s.default.DISCUSSION:
								var a = t;
								i += "<span class='mw-enhanced-rc-time'><a href='" + a.href + "' title='" + a.title + "'>" + a.time() + "</a></span>", i += a.getThreadStatusIcons(), i += a.getUpvoteCount(), i += e.SEP, i += t.userDetails(), i += t.getSummary();
								break;
							case s.default.COMMENT:
							case s.default.NORMAL:
								i += "<span class='mw-enhanced-rc-time'><a href='" + this.getLink(t, null, t.revid) + "' title='" + t.title + "'>" + t.time() + "</a></span>", i += " (<a href='" + this.getLink(t, 0, t.revid) + "'>" + n.default("cur") + "</a>", t.type == s.default.COMMENT && (i += this.getAjaxPagePreviewButton()), 0 == t.isNewPage && (i += n.default("pipe-separator") + "<a href='" + this.getLink(t, t.revid, t.old_revid) + "'>" + n.default("last") + "</a>" + this.getAjaxDiffButton()), i += ")", i += e.SEP, i += this._diffSizeText(t), i += e.SEP, i += t.userDetails(), i += t.getSummary()
						}
						var o = r.default.newElement("tr", {
							style: "display: none;"
						});
						return this._showFavicon() && r.default.newElement("td", {}, o), r.default.newElement("td", {}, o), r.default.newElement("td", {
							className: "mw-enhanced-rc",
							innerHTML: this._getFlags(t, "&nbsp;") + "&nbsp;"
						}, o), r.default.newElement("td", {
							className: "mw-enhanced-rc-nested",
							innerHTML: i
						}, o), this.addPreviewDiffListener(o.querySelector(".rcm-ajaxDiff"), t), this.addPreviewImageListener(o.querySelector(".rcm-ajaxImage"), t), this.addPreviewPageListener(o.querySelector(".rcm-ajaxPage"), t), this.manager.makeLinksAjax && this.addPreviewDiffListener(o.querySelector(".rc-diff-link"), t), o
					}, e.prototype._toHTMLNonEnhanced = function(t, i) {
						var a = "";
						switch(t.type) {
							case s.default.LOG:
								a += t.logTitleLink(), "upload" == t.logtype && (a += this.getAjaxImageButton()), a += n.default("semicolon-separator") + t.time(), a += e.SEP, a += t.logActionText();
								break;
							case s.default.WALL:
							case s.default.BOARD:
								t.isWallBoardAction ? (a += t.wallBoardHistoryLink(), a += n.default("semicolon-separator") + t.time(), a += e.SEP, a += t.userDetails(), a += t.wallBoardActionMessageWithSummary(this.getThreadTitle())) : (a += this._diffHist(t), a += e.SEP, a += this._getFlags(t, "") + " ", a += t.wallBoardTitleText(this.getThreadTitle()), a += this.getAjaxPagePreviewButton(), a += n.default("semicolon-separator") + t.time(), a += e.SEP, a += this._diffSizeText(t), a += e.SEP, a += t.userDetails(), a += t.getSummary());
								break;
							case s.default.DISCUSSION:
								var o = t;
								a += o.getThreadStatusIcons(), a += o.discusssionTitleText(this.getThreadTitle()), a += n.default("semicolon-separator") + t.time(), a += e.SEP, a += o.userDetails(), a += o.getSummary();
								break;
							case s.default.COMMENT:
							case s.default.NORMAL:
							default:
								a += this._diffHist(t), a += e.SEP, a += this._getFlags(t, "") + " ", a += t.pageTitleTextLink(), a += this.getAjaxPagePreviewButton(), a += n.default("semicolon-separator") + t.time(), a += e.SEP, a += this._diffSizeText(t), a += e.SEP, a += t.userDetails(), a += t.getSummary()
						}
						var l = r.default.newElement("li", {
							className: (i % 2 == 0 ? "mw-line-even" : "mw-line-odd") + " " + t.wikiInfo.rcClass
						});
						return r.default.newElement("div", {
							className: this._getBackgroundClass()
						}, l), this._showFavicon() && (l.innerHTML += t.wikiInfo.getFaviconHTML(!0) + " "), l.innerHTML += a, this.addPreviewDiffListener(l.querySelector(".rcm-ajaxDiff"), t), this.addPreviewImageListener(l.querySelector(".rcm-ajaxImage"), t), this.addPreviewPageListener(l.querySelector(".rcm-ajaxPage"), t), this.manager.makeLinksAjax && (this.addPreviewDiffListener(l.querySelector(".rc-diff-link"), t), l.querySelector(".rcm-ajaxImage") && (this.addPreviewImageListener(l.querySelector(".rc-log-link"), t), this.addPreviewImageListener(l.querySelector(".rc-pagetitle"), t))), l
					}, e.prototype.toHTML = function(e) {
						return this.manager.rcParams.hideenhanced ? this.htmlNode = this._toHTMLNonEnhanced(this.newest, e) : this.list.length > 1 ? this.htmlNode = this._toHTMLBlock() : this.htmlNode = this._toHTMLSingle(this.newest)
					}, e.SEP = " . . ", e
				}();
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = d
		}, {
			"./ConstantsApp": 1,
			"./RCData": 3,
			"./RC_TYPE": 10,
			"./Utils": 11,
			"./i18n": 13
		}],
		5: [function(e, t, i) {
			"use strict";
			var a = e("./Main"),
				r = e("./RCMWikiPanel"),
				n = e("./RCMOptions"),
				s = e("./ConstantsApp"),
				o = e("./RCMModal"),
				l = e("./WikiData"),
				c = e("./RCData"),
				d = e("./RCMWikiaDiscussionData"),
				h = e("./RCList"),
				u = e("./Utils"),
				m = e("./i18n"),
				f = e("./RC_TYPE"),
				g = window.Notification,
				p = window.jQuery,
				v = window.mediaWiki,
				w = function() {
					function e(e, t) {
						this.modID = "rcm" + t, this.resultCont = e, this.makeLinksAjax = !1, this.ajaxID = 0, this.autoRefreshLocalStorageID = s.default.AUTO_REFRESH_LOCAL_STORAGE_ID + "-" + this.modID, this.extraLoadingEnabled = !0, this.flagWikiDataIsLoaded = !1, this.isHardRefresh = !0, this._parseWikiList()
					}
					return e.prototype.dispose = function() {
						if(this.resultCont = null, this.optionsNode.dispose(), this.optionsNode = null, this.statusNode = null, this.wikisNode.dispose(), this.wikisNode = null, this.resultsNode = null, this.footerNode = null, this.rcmNewChangesMarker = null, this.rcmNoNewChangesMarker = null, this.hideusers = null, this.onlyshowusers = null, this.rcData = null, this.newRecentChangesEntries = null, this.recentChangesEntries) {
							for(var e = 0; e < this.recentChangesEntries.length; e++) this.recentChangesEntries[e].dispose(), this.recentChangesEntries[e] = null;
							this.recentChangesEntries = null
						}
						this.ajaxCallbacks = null, this.erroredWikis = null, this.secondaryWikiData = null, this.lastLoadDateTime = null
					}, e.prototype._parseWikiList = function() {
						var e = this,
							t = this.resultCont.dataset;
						this.rcParamsBase = p.extend({}, a.default.rcParamsURL, this.parseRCParams(t.params, "&", "=")), this.rcParams = p.extend(this.getDefaultRCParams(), this.rcParamsBase), this.autoRefreshEnabledDefault = "true" == t.autorefreshEnabled, this.autoRefreshTimeoutNum = 1e3 * (t.autorefresh ? parseInt(t.autorefresh) : 60), this.autoRefreshEvenOnFocus = "false" != t.autorefreshEvenonfocus, this.discussionsEnabled = "false" !== t.discussionsEnabled, this.hideusers = [], t.hideusers && (this.hideusers = t.hideusers.replace(/_/g, " ").split(",")), this.hideusers.forEach(function(e, t, i) {
							i[t] = u.default.ucfirst(i[t].trim())
						}), this.notificationsHideusers = [], t.notificationsHideusers && (this.notificationsHideusers = t.notificationsHideusers.replace(/_/g, " ").split(",")), this.notificationsHideusers.forEach(function(e, t, i) {
							i[t] = u.default.ucfirst(i[t].trim())
						}), this.onlyshowusers = [], t.onlyshowusers && (this.onlyshowusers = t.onlyshowusers.replace(/_/g, " ").split(",")), this.onlyshowusers.forEach(function(e, t, i) {
							i[t] = u.default.ucfirst(i[t].trim())
						}), this.extraLoadingEnabled = "false" != t.extraLoadingEnabled, this.makeLinksAjax = "true" == t.ajaxlinks, this.chosenWikis = [], u.default.forEach(this.resultCont.querySelectorAll("li"), function(t) {
							e.chosenWikis.push(new l.default(e).initListData(t))
						}), this.chosenWikis = u.default.uniq_fast_key(this.chosenWikis, "servername"), t = null, this.resultCont.innerHTML = ""
					}, e.prototype.init = function() {
						this.resultCont.innerHTML = "", this.resultCont.className += " " + this.modID, this.modID = "." + this.modID, this.rcData = [], this.recentChangesEntries = [], this.optionsNode = new n.default(this).init(u.default.newElement("div", {
							className: "rcm-options"
						}, this.resultCont)), this.statusNode = u.default.newElement("div", {
							className: "rcm-status"
						}, this.resultCont), this.wikisNode = new r.default(this).init(u.default.newElement("div", {
							className: "rcm-wikis"
						}, this.resultCont)), this.resultsNode = u.default.newElement("div", {
							className: "rcm-results rc-conntent"
						}, this.resultCont), this.footerNode = u.default.newElement("div", {
							className: "rcm-footer"
						}, this.resultCont);
						var e = new Date(s.default.lastVersionDateString);
						e.setDate(e.getDate() + 3);
						var t = e > new Date ? '<sup class="rcm-new-version">' + m.default("wikifeatures-promotion-new") + "</sup>" : "";
						return this.footerNode.innerHTML = "[<a href='http://dev.wikia.com/wiki/RecentChangesMultiple'>RecentChangesMultiple</a>] " + m.default("rcm-footer", "<a href='https://github.com/fewfre/RecentChangesMultiple/blob/master/changelog'>" + s.default.version + "</a>" + t, "<img src='http://fewfre.com/images/rcm_avatar.jpg' height='14' /> <a href='http://fewfre.wikia.com/wiki/Fewfre_Wiki'>Fewfre</a>"), p(this.resultsNode).on("click", ".rcm-favicon-goto-button", this.wikisNode.goToAndOpenInfo), this._startWikiDataLoad(), this
					}, e.prototype._load = function(e, t, i, a, r, n, s) {
						void 0 === s && (s = 0), ++a, setTimeout(function() {
							p.ajax({
								type: "GET",
								dataType: i,
								data: {},
								timeout: 15e3,
								url: t,
								success: function(t) {
									n(t, e, a, r, null)
								},
								error: function(t, i) {
									n(null, e, a, r, i)
								}
							})
						}, s)
					}, e.prototype._retryOrError = function(t, i, a, r, n, s) {
						v.log("Error loading " + t.servername + " (" + i + "/" + this.loadingErrorRetryNum + " tries)"), i < this.loadingErrorRetryNum ? n(t, i, a, 0) : 0 === this.erroredWikis.length ? s(t, i, a, null == r ? "rcm-error-loading-syntaxhang" : "rcm-error-loading-connection", e.LOADING_ERROR_RETRY_NUM_INC) : (this.erroredWikis.push({
							wikiInfo: t,
							tries: i,
							id: a
						}), this.statusNode.querySelector(".errored-wiki").innerHTML += ", " + t.servername)
					}, e.prototype._onParsingFinished = function(e) {
						var t = this;
						this.wikisLeftToLoad--, document.querySelector(this.modID + " .rcm-load-perc").innerHTML = this.calcLoadPercent() + "%", this.wikisLeftToLoad > 0 ? this.ajaxCallbacks.length > 0 && (this.ajaxCallbacks.shift(), this.ajaxCallbacks.length > 0 && setTimeout(function() {
							t.ajaxCallbacks[0]()
						}, 0)) : e()
					}, e.prototype._startWikiDataLoad = function() {
						var t = this;
						this.erroredWikis = [], this.ajaxCallbacks = [], this.ajaxID++, this.loadingErrorRetryNum = e.LOADING_ERROR_RETRY_NUM_INC, this.chosenWikis.length > 0 ? (u.default.forEach(this.chosenWikis, function(e, i) {
							t._loadWikiData(e, 0, t.ajaxID, (i + 1) * s.default.loadDelay)
						}), this.totalItemsToLoad = this.chosenWikis.length, this.wikisLeftToLoad = this.totalItemsToLoad, this.statusNode.innerHTML = s.default.getLoader() + " " + m.default("app-loading") + " (<span class='rcm-load-perc'>0%</span>)") : (u.default.removeElement(this.statusNode), u.default.removeElement(this.wikisNode.root), this.resultsNode.innerHTML = "<div class='banner-notification error center'>" + m.default("wikiacuratedcontent-content-empty-section") + "</div>")
					}, e.prototype._loadWikiData = function(e, t, i, a) {
						void 0 === a && (a = 0), this._load(e, e.getWikiDataApiUrl(), "jsonp", t, i, this._onWikiDataLoaded.bind(this), a)
					}, e.prototype._onWikiDataLoaded = function(e, t, i, a, r) {
						if(a == this.ajaxID) {
							if(e && e.error && null == e.query) throw console.error(e, e.error, null == e.query), this.statusNode.innerHTML = "<div class='rcm-error'><div>ERROR: " + t.servername + "</div>" + JSON.stringify(e.error) + "</div>", "Wiki returned error";
							"timeout" != r ? null != e && null != e.query && null != e.query.general ? (e && e.warning && v.log("WARNING: ", e.warning), t.initAfterLoad(e.query), this._onWikiDataParsingFinished(t)) : this._retryOrError(t, i, a, r, this._loadWikiData.bind(this), this._handleWikiDataLoadError.bind(this)) : this._handleWikiDataLoadError(t, i, a, "rcm-error-loading-syntaxhang", 1)
						}
					}, e.prototype._handleWikiDataLoadError = function(e, t, i, a, r) {
						var n = this;
						this.statusNode.innerHTML = "<div class='rcm-error'>" + m.default(a, "<span class='errored-wiki'>" + e.servername + "</span>", t) + "</div>";
						var o = function(e) {
							n.loadingErrorRetryNum += r, e && e.target.removeEventListener("click", o), o = null, n.erroredWikis.forEach(function(e) {
								n._loadWikiData(e.wikiInfo, e.tries, e.id)
							}), n.erroredWikis = [], n.statusNode.innerHTML = s.default.getLoader() + " " + m.default("rcm-loading") + " (<span class='rcm-load-perc'>" + n.calcLoadPercent() + "%</span>)"
						};
						u.default.newElement("button", {
							innerHTML: m.default("rcm-error-trymoretimes", r)
						}, this.statusNode).addEventListener("click", o);
						var l = function(t) {
							t && t.target.removeEventListener("click", l), l = null, n.chosenWikis.splice(n.chosenWikis.indexOf(e), 1), n.statusNode.innerHTML = s.default.getLoader() + " " + m.default("rcm-loading") + " (<span class='rcm-load-perc'>" + n.calcLoadPercent() + "%</span>)", n._onWikiDataParsingFinished(null)
						};
						u.default.addTextTo(" ", this.statusNode), u.default.newElement("button", {
							innerHTML: m.default("wikia-hubs-remove")
						}, this.statusNode).addEventListener("click", l), this.erroredWikis.push({
							wikiInfo: e,
							tries: t,
							id: i
						})
					}, e.prototype._onWikiDataParsingFinished = function(e) {
						var t = this;
						this._onParsingFinished(function() {
							t._onAllWikiDataParsed()
						})
					}, e.prototype._onAllWikiDataParsed = function() {
						this.flagWikiDataIsLoaded = !0;
						var e = "";
						this.chosenWikis.forEach(function(t) {
							e += "\n." + t.rcClass + " .rcm-tiled-favicon {" + (null != t.bgcolor ? "background: " + t.bgcolor + ";" : "background-image: url(" + t.favicon + ");") + " }"
						}), v.util.addCSS(e), this._start(!0)
					}, e.prototype._startDiscussionLoading = function(t) {
						var i = this;
						if(this.discussionsEnabled) {
							if(this.ajaxCallbacks = [], this.loadingErrorRetryNum = e.LOADING_ERROR_RETRY_NUM_INC, this.totalItemsToLoad = 0, u.default.forEach(this.chosenWikis, function(e, a) {
									!1 !== e.usesWikiaDiscussions && (i.totalItemsToLoad++, i._loadWikiaDiscussions(e, 0, t, i.totalItemsToLoad * s.default.loadDelay))
								}), this.totalItemsToLoad <= 0) return this.discussionsEnabled = !1, void this.rcmChunkStart();
							this.wikisLeftToLoad = this.totalItemsToLoad, this.statusNode.innerHTML = s.default.getLoader() + " " + m.default("embeddable-discussions-loading") + " (<span class='rcm-load-perc'>0%</span>)"
						}
					}, e.prototype._loadWikiaDiscussions = function(e, t, i, a) {
						void 0 === a && (a = 0), this._load(e, e.getWikiDiscussionUrl(), "json", t, i, this._onWikiDiscussionLoaded.bind(this), a)
					}, e.prototype._onWikiDiscussionLoaded = function(e, t, i, a, r) {
						var n = this;
						if(a == this.ajaxID)
							if(null == r && e && e._embedded && e._embedded["doc:posts"]) t.usesWikiaDiscussions = !0, this.ajaxCallbacks.push(function() {
								n._parseWikiDiscussions(e._embedded["doc:posts"], t)
							}), 1 === this.ajaxCallbacks.length && this.ajaxCallbacks[0]();
							else {
								if(!0 === t.usesWikiaDiscussions) return v.log("Error loading " + t.servername + " (" + i + "/" + this.loadingErrorRetryNum + " tries)"), void(i < this.loadingErrorRetryNum && "timeout" == r ? this._loadWikiaDiscussions(t, i, a, 0) : this._onDiscussionParsingFinished(t));
								"timeout" != r && (v.log("[RCMManager](loadWikiDiscussions) " + t.servername + " has no discussions."), t.usesWikiaDiscussions = !1), this._onDiscussionParsingFinished(t)
							}
					}, e.prototype._parseWikiDiscussions = function(e, t) {
						var i = this;
						if(e.length <= 0) this._onDiscussionParsingFinished(t);
						else {
							e.sort(function(e, t) {
								return(e.modificationDate || e.creationDate).epochSecond < (t.modificationDate || t.creationDate).epochSecond ? 1 : -1
							}), t.updateLastDiscussionDate(u.default.getFirstItemFromObject(e));
							var a;
							e.forEach(function(e) {
								var r = e.createdBy.name;
								r && i.hideusers.indexOf(r) > -1 || t.hideusers && t.hideusers.indexOf(r) > -1 || r && 0 != i.onlyshowusers.length && -1 == i.onlyshowusers.indexOf(r) || r && void 0 != t.onlyshowusers && -1 == t.onlyshowusers.indexOf(r) || t.rcParams.hidemyself && s.default.username == r || (e.modificationDate || e.creationDate).epochSecond < Math.round(t.getEndDate().getTime() / 1e3) || (i.itemsToAddTotal++, (a = new d.default(t, i)).init(e), i._addRCDataToList(a), t.discussionsCount++)
							}), v.log("Discussions:", t.servername, e), this._onDiscussionParsingFinished(t)
						}
					}, e.prototype._onDiscussionParsingFinished = function(e) {
						var t = this;
						this._onParsingFinished(function() {
							t.rcmChunkStart()
						})
					}, e.prototype._start = function(t) {
						var i = this;
						void 0 === t && (t = !1), clearTimeout(this.autoRefreshTimeoutID), this.wikisNode.populate(), this.newRecentChangesEntries = [], this.ajaxCallbacks = [], this.erroredWikis = [], this.secondaryWikiData = [], this.ajaxID++, this.loadingErrorRetryNum = e.LOADING_ERROR_RETRY_NUM_INC, this.itemsAdded = this.itemsToAddTotal = 0, this.chosenWikis.forEach(function(e, a) {
							t && e.setupRcParams(), i._loadWiki(e, 0, i.ajaxID, (a + 1) * s.default.loadDelay)
						}), this.totalItemsToLoad = this.chosenWikis.length, this.wikisLeftToLoad = this.totalItemsToLoad, this.statusNode.innerHTML = s.default.getLoader() + " " + m.default("rcm-loading") + " (<span class='rcm-load-perc'>0%</span>)"
					}, e.prototype.refresh = function(e) {
						void 0 === e && (e = !1), 0 != this.chosenWikis.length && this.flagWikiDataIsLoaded && (this.isHardRefresh = !1, this.statusNode.innerHTML = "", this.wikisNode.clear(), this.rcmNewChangesMarker && (!this.isAutoRefreshEnabled() || document.hasFocus() || this.lastLoadDateTime >= this.recentChangesEntries[0].date) && (u.default.removeElement(this.rcmNewChangesMarker), this.rcmNewChangesMarker = null), this.rcmNoNewChangesMarker && (u.default.removeElement(this.rcmNoNewChangesMarker), this.rcmNoNewChangesMarker = null), this.ajaxCallbacks = null, this.secondaryWikiData = null, o.default.closeModal(), this._start(e))
					}, e.prototype.hardRefresh = function(e) {
						if(void 0 === e && (e = !1), 0 != this.chosenWikis.length && this.flagWikiDataIsLoaded) {
							if(this.isHardRefresh = !0, this.statusNode.innerHTML = "", this.resultsNode.innerHTML = "", this.rcmNewChangesMarker = null, this.rcmNoNewChangesMarker = null, this.wikisNode.clear(), this.chosenWikis.forEach(function(e) {
									e.lastChangeDate = e.getEndDate(), e.lastDiscussionDate = e.getEndDate(), e.resultsCount = 0, e.discussionsCount = 0
								}), this.rcData = [], null != this.recentChangesEntries) {
								for(var t = 0; t < this.recentChangesEntries.length; t++) this.recentChangesEntries[t].dispose(), this.recentChangesEntries[t] = null;
								this.recentChangesEntries = null
							}
							this.recentChangesEntries = [], this.ajaxCallbacks = null, this.secondaryWikiData = null, o.default.closeModal(), this._start(e)
						}
					}, e.prototype._loadWiki = function(e, t, i, a) {
						void 0 === a && (a = 0), this._load(e, e.getApiUrl(), "jsonp", t, i, this._onWikiLoaded.bind(this), a)
					}, e.prototype._onWikiLoaded = function(e, t, i, a, r) {
						var n = this;
						if(a == this.ajaxID) {
							if(e && e.error && null == e.query) throw this.statusNode.innerHTML = "<div class='rcm-error'><div>ERROR: " + t.servername + "</div>" + JSON.stringify(e.error) + "</div>", this.addRefreshButtonTo(this.statusNode), "Wiki returned error";
							"timeout" != r ? null != e && null != e.query && null != e.query.recentchanges ? (e && e.warning && v.log("WARNING: ", e.warning), this.ajaxCallbacks.push(function() {
								n._parseWiki(e.query.recentchanges, e.query.logevents, t)
							}), 1 === this.ajaxCallbacks.length && this.ajaxCallbacks[0]()) : this._retryOrError(t, i, a, r, this._loadWiki.bind(this), this._handleWikiLoadError.bind(this)) : this._handleWikiLoadError(t, i, a, "rcm-error-loading-syntaxhang", 1)
						}
					}, e.prototype._handleWikiLoadError = function(e, t, i, a, r) {
						var n = this;
						clearTimeout(this.loadErrorTimeoutID), this.loadErrorTimeoutID = null, this.statusNode.innerHTML = "<div class='rcm-error'>" + m.default(a, "<span class='errored-wiki'>" + e.servername + "</span>", t) + "</div>", this.addRefreshButtonTo(this.statusNode);
						var o = function(e) {
							clearTimeout(n.loadErrorTimeoutID), n.loadErrorTimeoutID = null, n.loadingErrorRetryNum += r, e && e.target.removeEventListener("click", o), o = null, n.erroredWikis.forEach(function(e) {
								n._loadWiki(e.wikiInfo, e.tries, e.id)
							}), n.erroredWikis = [], n.statusNode.innerHTML = s.default.getLoader() + " " + m.default("rcm-loading") + " (<span class='rcm-load-perc'>" + n.calcLoadPercent() + "%</span>)"
						};
						u.default.newElement("button", {
							innerHTML: m.default("rcm-error-trymoretimes", r)
						}, this.statusNode).addEventListener("click", o), this.erroredWikis.push({
							wikiInfo: e,
							tries: t,
							id: i
						}), this.isAutoRefreshEnabled() && (this.loadErrorTimeoutID = setTimeout(function() {
							o && o(null)
						}, 2e4))
					}, e.prototype._parseWiki = function(e, t, i) {
						var a = this;
						if(e.length <= 0) this._onWikiParsingFinished(i);
						else {
							v.log(i.servername, e), i.updateLastChangeDate(u.default.getFirstItemFromObject(e));
							var r;
							e.forEach(function(e) {
								e.user && a.hideusers.indexOf(e.user) > -1 || i.hideusers && i.hideusers.indexOf(e.user) > -1 || e.user && 0 != a.onlyshowusers.length && -1 == a.onlyshowusers.indexOf(e.user) || e.user && void 0 != i.onlyshowusers && -1 == i.onlyshowusers.indexOf(e.user) || (a.itemsToAddTotal++, r = new c.default(i, a).init(e, t), a._addRCDataToList(r), i.resultsCount++)
							}), this._onWikiParsingFinished(i)
						}
					}, e.prototype._addRCDataToList = function(e) {
						var t = this,
							i = {
								data: e,
								list: null
							};
						this.rcData.push(i);
						var a, r, n = "" == this.resultsNode.innerHTML;
						if(this.rcParams.hideenhanced) r = !0;
						else if(n) r = this.recentChangesEntries.every(function(i, r) {
							return e.date > i.date ? (t.recentChangesEntries.splice(r, 0, a = new h.default(t).addRC(e)), !1) : !i.shouldGroupWith(e) || (a = i.addRC(e), !1)
						});
						else {
							var s = -1,
								o = u.default.formatWikiTimeStamp(e.date, !1);
							r = this.recentChangesEntries.every(function(i, r) {
								if(-1 == s && e.date > i.date) {
									if(s = r, i.shouldGroupWith(e)) return a = i.addRC(e), !1
								} else {
									if(i.shouldGroupWith(e)) return a = i.addRC(e), s > -1 && (t.recentChangesEntries.splice(r, 1), t.recentChangesEntries.splice(s, 0, i)), !1;
									if(s > -1 && o != u.default.formatWikiTimeStamp(i.date, !1)) return t.recentChangesEntries.splice(s, 0, a = new h.default(t).addRC(e)), !1
								}
								return !0
							})
						}
						r && this.recentChangesEntries.push(a = new h.default(this).addRC(e)), i.list = a
					}, e.prototype._onWikiParsingFinished = function(e) {
						var t = this;
						this.wikisNode.addWiki(e), this._onParsingFinished(function() {
							t._onAllWikisParsed()
						})
					}, e.prototype._onAllWikisParsed = function() {
						this.discussionsEnabled ? this._startDiscussionLoading(this.ajaxID) : this.rcmChunkStart()
					}, e.prototype.rcmChunkStart = function() {
						var e = this,
							t = new Date;
						this.statusNode.innerHTML = m.default("rcm-download-timestamp", "<b><tt>" + u.default.pad(u.default.getHours(t), 2) + ":" + u.default.pad(u.default.getMinutes(t), 2) + "</tt></b>"), this.statusNode.innerHTML += "<span class='rcm-content-loading'>" + m.default("rcm-download-changesadded", "<span class='rcm-content-loading-num'>0</span> / " + this.itemsToAddTotal) + "</span>", this.rcData.sort(function(e, t) {
							return t.data.date.valueOf() - e.data.date.valueOf()
						}), this.rcParams.hideenhanced && this.recentChangesEntries.sort(function(e, t) {
							return t.date.valueOf() - e.date.valueOf()
						}), this.removeOldResults(t), this.newRecentChangesEntries = [];
						var i = "" == this.resultsNode.innerHTML;
						if(this.recentChangesEntries.every(function(t, a) {
								return !!(t.date > e.lastLoadDateTimeActual || i) && (e.newRecentChangesEntries.push(t), !0)
							}), 0 == this.recentChangesEntries.length || null != this.lastLoadDateTime && this.recentChangesEntries[0].date <= this.lastLoadDateTime) this.rcmNewChangesMarker || (this.rcmNoNewChangesMarker = this.resultsNode.insertBefore(u.default.newElement("div", {
							className: "rcm-noNewChanges",
							innerHTML: "<strong>" + m.default("rcm-nonewchanges") + "</strong>"
						}), this.resultsNode.firstChild));
						else {
							if(!this.rcmNewChangesMarker && this.newRecentChangesEntries.length > 0 && null != this.lastLoadDateTime && "" != this.resultsNode.innerHTML) {
								var a = this.resultsNode.querySelector("div, ul");
								this.rcmNewChangesMarker = a.insertBefore(u.default.newElement("div", {
									className: "rcm-previouslyLoaded",
									innerHTML: "<strong>" + m.default("rcm-previouslyloaded") + "</strong>"
								}), a.firstChild), a = null
							}
							null != this.lastLoadDateTimeActual && this.isAutoRefreshEnabled() && !document.hasFocus() && this.recentChangesEntries[0].date > this.lastLoadDateTimeActual && this.notifyUserOfChange()
						}
						this.rcmChunk(0, 99, 99, null, this.ajaxID)
					}, e.prototype.removeOldResults = function(e) {
						var t = this;
						if("" != this.resultsNode.innerHTML) {
							for(var i, a, r = this.chosenWikis.slice(0), n = [], s = this.rcData.length - 1; s >= 0; s--)
								if(i = this.rcData[s], -1 != (a = r.indexOf(i.data.wikiInfo)))
									if(i.data.shouldBeRemoved(e)) i.data.type != f.default.DISCUSSION ? i.data.wikiInfo.resultsCount-- : i.data.wikiInfo.discussionsCount--, this.rcData[s] = null, this.rcData.splice(s, 1), i.list.removeRC(i.data), (this.rcParams.hideenhanced || -1 == n.indexOf(i.list)) && n.push(i.list), i.data, i.list = null;
									else if(i.data.wikiInfo.resultsCount <= i.data.wikiInfo.rcParams.limit && i.data.wikiInfo.discussionsCount <= Math.min(i.data.wikiInfo.rcParams.limit, 50) && (r.splice(a, 1), 0 == r.length)) break;
							i = null, r = null;
							var o, l;
							n.forEach(function(e) {
								(l = t.recentChangesEntries.indexOf(e)) > -1 ? e.list.length <= 0 ? (e.htmlNode && u.default.removeElement(e.htmlNode), t.recentChangesEntries[l].dispose(), t.recentChangesEntries[l] = null, t.recentChangesEntries.splice(l, 1)) : e.htmlNode && (o = e.htmlNode, u.default.insertAfter(e.toHTML(l), o), u.default.removeElement(o)) : console.warn("[RCMManager](removeOldResults) Failed to remove old list.")
							}), null, o = null, n = null, u.default.forEach(this.resultsNode.querySelectorAll(".rcm-rc-cont"), function(e) {
								"" == e.innerHTML && (u.default.removeElement(e.previousSibling), u.default.removeElement(e))
							})
						}
					}, e.prototype.notifyUserOfChange = function() {
						var e = this.recentChangesEntries[0].newest;
						if(!(this.notificationsHideusers.indexOf(e.author) > -1 || e.wikiInfo.notificationsHideusers && e.wikiInfo.notificationsHideusers.indexOf(e.author) > -1 || !e.wikiInfo.notificationsEnabled)) {
							for(var t = 0, i = 0, r = 0; r < this.recentChangesEntries.length && this.recentChangesEntries[r].date > this.lastLoadDateTime; r++)
								for(var n = 0; n < this.recentChangesEntries[r].list.length && this.recentChangesEntries[r].list[n].date > this.lastLoadDateTime; n++) t++, this.recentChangesEntries[r].wikiInfo.servername == e.wikiInfo.servername && i++;
							a.default.blinkWindowTitle(m.default("wikifeatures-promotion-new") + "! " + m.default("nchanges", t));
							var s = e.title;
							e.type == f.default.LOG ? s = e.logTitle() + (s ? " - " + s : "") : null == s && (s = (s = this.recentChangesEntries[0].getExistingThreadTitle()) ? m.default("discussions") + " - " + s : m.default("discussions")), s = s ? s + "\n" : "";
							var o = e.unparsedComment ? "\n" + m.default("edit-summary") + ": " + e.unparsedComment : "";
							a.default.addNotification(m.default("nchanges", t) + " - " + e.wikiInfo.sitename + (i != t ? " (" + i + ")" : ""), {
								body: s + u.default.ucfirst(m.default("myhome-feed-edited-by", e.author)) + o
							})
						}
						e = null
					}, e.prototype.rcmChunk = function(e, t, i, a, r) {
						var n = this;
						if(r == this.ajaxID)
							if(0 != this.newRecentChangesEntries.length) {
								var s = this.newRecentChangesEntries[e].date;
								if(u.default.getDate(s) != t || u.default.getMonth(s) != i) {
									t = u.default.getDate(s), i = u.default.getMonth(s);
									var o = u.default.formatWikiTimeStamp(s, !1),
										l = void 0;
									if(l = this.resultsNode.querySelector('[data-timestamp="' + o + '"]')) a = l;
									else {
										var c = u.default.newElement("h4", {
											innerHTML: o
										});
										(l = 0 == this.rcParams.hideenhanced ? u.default.newElement("div", {
											className: "rcm-rc-cont"
										}) : u.default.newElement("ul", {
											className: "special rcm-rc-cont"
										})).dataset.timestamp = o, a ? (u.default.insertAfter(c, a), u.default.insertAfter(l, c)) : this.isHardRefresh ? (this.resultsNode.appendChild(c), this.resultsNode.appendChild(l)) : (u.default.prependChild(c, this.resultsNode), u.default.insertAfter(l, c)), a = l, c = null
									}
									l = null
								}
								if(this.rcmNewChangesMarker) {
									this.newRecentChangesEntries[e].htmlNode && u.default.removeElement(this.newRecentChangesEntries[e].htmlNode);
									var d = this.newRecentChangesEntries[e].toHTML(e);
									"" == a.innerHTML ? a.appendChild(d) : 0 == e ? a.firstChild.parentNode.insertBefore(d, a.firstChild) : this.newRecentChangesEntries[e - 1].htmlNode.parentNode != a ? a.appendChild(d) : u.default.insertAfter(d, this.newRecentChangesEntries[e - 1].htmlNode), d = null
								} else a.appendChild(this.newRecentChangesEntries[e].toHTML(e));
								this.itemsAdded += this.newRecentChangesEntries[e].list.length, ++e < this.newRecentChangesEntries.length ? (document.querySelector(this.modID + " .rcm-content-loading-num").innerHTML = this.itemsAdded.toString(), e % 5 == 0 ? setTimeout(function() {
									n.rcmChunk(e, t, i, a, r)
								}) : this.rcmChunk(e, t, i, a, r)) : this.finishScript()
							} else this.finishScript()
					}, e.prototype.finishScript = function() {
						u.default.removeElement(document.querySelector(this.modID + " .rcm-content-loading")), this.addRefreshButtonTo(this.statusNode), this.addAutoRefreshInputTo(this.statusNode), null != this.lastLoadDateTime && this.isAutoRefreshEnabled() && !document.hasFocus() || (this.lastLoadDateTime = this.recentChangesEntries.length > 0 ? this.recentChangesEntries[0].date : null), this.lastLoadDateTimeActual = this.recentChangesEntries.length > 0 ? this.recentChangesEntries[0].date : null, this.startAutoRefresh(), (window.ajaxCallAgain || []).forEach(function(e) {
							e()
						}), this.extraLoadingEnabled && this._loadExtraInfo(this.ajaxID)
					}, e.prototype.startAutoRefresh = function() {
						var e = this;
						this.isAutoRefreshEnabled() && (this.autoRefreshTimeoutID = setTimeout(function() {
							o.default.isModalOpen() || 0 == e.autoRefreshEvenOnFocus && document.hasFocus() ? e.startAutoRefresh() : e.refresh()
						}, this.autoRefreshTimeoutNum))
					}, e.prototype._loadExtraInfo = function(e) {
						var t = this;
						if(e == this.ajaxID)
							if(0 != this.secondaryWikiData.length) {
								var i = this.secondaryWikiData[0].url,
									a = this.secondaryWikiData[0].callback,
									r = this.secondaryWikiData[0].dataType || "jsonp";
								this.secondaryWikiData.splice(0, 1), p.ajax({
									type: "GET",
									dataType: r,
									data: {},
									url: i,
									success: function() {
										for(var i = [], r = 0; r < arguments.length; r++) i[r - 0] = arguments[r];
										e == t.ajaxID && a.apply(t, i)
									}
								}), setTimeout(function() {
									t._loadExtraInfo(e)
								}, s.default.loadDelay)
							} else v.log("[RCMManager](_loadExtraInfo) All loading finished.")
					}, e.prototype.addRefreshButtonTo = function(e) {
						var t = this;
						e.appendChild(document.createTextNode(" ")), u.default.newElement("button", {
							innerHTML: m.default("rcm-refresh")
						}, e).addEventListener("click", function e(i) {
							i.target.removeEventListener("click", e), t.refresh()
						})
					}, e.prototype.addAutoRefreshInputTo = function(e) {
						var t = this;
						e.appendChild(document.createTextNode(" "));
						var i = u.default.newElement("span", {
							className: "rcm-autoRefresh"
						}, e);
						u.default.newElement("label", {
							htmlFor: "rcm-autoRefresh-checkbox",
							innerHTML: m.default("rcm-autorefresh"),
							title: m.default("rcm-autorefresh-tooltip", Math.floor(t.autoRefreshTimeoutNum / 1e3))
						}, i);
						var a = u.default.newElement("input", {
							className: "rcm-autoRefresh-checkbox",
							type: "checkbox"
						}, i);
						a.checked = this.isAutoRefreshEnabled(), a.addEventListener("click", function(e) {
							document.querySelector(t.modID + " .rcm-autoRefresh-checkbox").checked ? (localStorage.setItem(t.autoRefreshLocalStorageID, (!0).toString()), t.refresh(), g.requestPermission()) : (localStorage.setItem(t.autoRefreshLocalStorageID, (!1).toString()), clearTimeout(t.autoRefreshTimeoutID))
						})
					}, e.prototype.isAutoRefreshEnabled = function() {
						return "true" == localStorage.getItem(this.autoRefreshLocalStorageID) || this.autoRefreshEnabledDefault
					}, e.prototype.calcLoadPercent = function() {
						return Math.round((this.totalItemsToLoad - this.wikisLeftToLoad) / this.totalItemsToLoad * 100)
					}, e.prototype.parseRCParams = function(e, t, i) {
						var a = {},
							r = [];
						if(!e) return a;
						for(var n, s = e.split(t), o = 0; o < s.length; o++)(n = s[o].split(i)).length > 1 && ("limit" == n[0] && n[1] ? a.limit = parseInt(n[1]) : "days" == n[0] && n[1] ? a.days = parseInt(n[1]) : "namespace" != n[0] || !n[1] && "0" !== n[1] ? n[1] && (a[n[0]] = "1" == n[1]) : a.namespace = n[1], r.push(n[0] + "=" + n[1]));
						return a.paramString = r.join("&"), r = null, a
					}, e.prototype.getDefaultRCParams = function() {
						return {
							paramString: "",
							limit: 50,
							days: 7,
							hideminor: !1,
							hidebots: !0,
							hideanons: !1,
							hideliu: !1,
							hidemyself: !1,
							hideenhanced: !1,
							hidelogs: !1,
							namespace: null
						}
					}, e.LOADING_ERROR_RETRY_NUM_INC = 5, e
				}();
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = w
		}, {
			"./ConstantsApp": 1,
			"./Main": 2,
			"./RCData": 3,
			"./RCList": 4,
			"./RCMModal": 6,
			"./RCMOptions": 7,
			"./RCMWikiPanel": 8,
			"./RCMWikiaDiscussionData": 9,
			"./RC_TYPE": 10,
			"./Utils": 11,
			"./WikiData": 12,
			"./i18n": 13
		}],
		6: [function(e, t, i) {
			"use strict";
			var a = e("./ConstantsApp"),
				r = e("./i18n"),
				n = window.jQuery,
				s = (window.mediaWiki, function() {
					function e() {}
					return e.showModal = function(t) {
						e.closeModal();
						var i = {
								type: "default",
								vars: n.extend({
									id: e.MODAL_ID,
									title: t.title,
									content: '<div id="' + e.MODAL_CONTENT_ID + '">' + t.content + "</div>",
									size: "auto",
									buttons: []
								}, t.vars)
							},
							a = i.vars;
						a.buttons.unshift({
							vars: {
								value: r.default("flags-edit-modal-close-button-text"),
								data: {
									key: "event",
									value: "close_button"
								}
							}
						}), t.rcm_buttons && t.rcm_buttons.forEach(function(e, t, i) {
							a.buttons.push({
								vars: {
									value: e.value,
									classes: ["normal", "primary"],
									data: {
										key: "event",
										value: e.event
									}
								}
							})
						}), e.createModalComponent(i, function(e) {
							e.bind("close_button", function(t) {
								e.trigger("close")
							}), t.rcm_buttons && t.rcm_buttons.forEach(function(t, i, a) {
								t.event && t.callback && e.bind(t.event, function(i) {
									t.callback(i), !1 !== t.closeOnClick && e.trigger("close")
								})
							}), e.show(), t.rcm_onModalShown && t.rcm_onModalShown()
						})
					}, e.createModalComponent = function(t, i) {
						e.modalFactory ? e.createModalComponentWithExistingFactory(t, i) : window.require(["wikia.ui.factory"], function(a) {
							a.init(["modal"]).then(function(a) {
								e.modalFactory = a, e.createModalComponentWithExistingFactory(t, i)
							})
						})
					}, e.createModalComponentWithExistingFactory = function(t, i) {
						e.modalFactory.createComponent(t, function(t) {
							e.modal = t, t.bind("close", function(t) {
								e.modal = null
							}), i(t)
						})
					}, e.showLoadingModal = function(t, i) {
						e.isModalOpen() || (t.content = "<div style='text-align:center; padding:10px;'>" + a.default.getLoaderLarge() + "</div>", t.rcm_onModalShown = i, e.showModal(t))
					}, e.setModalContent = function(t) {
						document.querySelector("#" + e.MODAL_CONTENT_ID).innerHTML = t
					}, e.isModalOpen = function() {
						return !!e.modal
					}, e.closeModal = function() {
						e.isModalOpen() && e.modal.trigger("close")
					}, e.MODAL_ID = "rcm-modal", e.MODAL_CONTENT_ID = "rcm-modal-content", e.modalFactory = null, e.modal = null, e
				}());
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = s
		}, {
			"./ConstantsApp": 1,
			"./i18n": 13
		}],
		7: [function(e, t, i) {
			"use strict";
			var a = e("./ConstantsApp"),
				r = e("./Utils"),
				n = e("./i18n"),
				s = window.jQuery,
				o = (window.mediaWiki, function() {
					function e(e) {
						this.manager = e, this.localStorageID = a.default.OPTIONS_SETTINGS_LOCAL_STORAGE_ID + "-" + e.modID.replace(".", "")
					}
					return e.prototype.dispose = function() {
						this.removeEventListeners(), this.manager = null, this.root = null, this.rcParams = null, this.settingsSaveCookieCheckbox = null, this.settingsShowDiscussionsCheckbox = null, this.limitField = null, this.daysField = null, this.minorEditsCheckbox = null, this.botsCheckbox = null, this.anonsCheckbox = null, this.usersCheckbox = null, this.myEditsCheckbox = null, this.groupedChangesCheckbox = null, this.logsCheckbox = null
					}, e.prototype.init = function(e) {
						this.root = e;
						var t = this.getSave();
						return this.rcParams = t.options || {}, this.manager.rcParams = s.extend(this.manager.rcParams, this.rcParams), this.discussionsEnabled = t.discussionsEnabled, null != this.discussionsEnabled && (this.manager.discussionsEnabled = this.discussionsEnabled), this._addElements(), this
					}, e.prototype._addElements = function() {
						var e = r.default.newElement("fieldset", {
							className: "rcoptions collapsible"
						}, this.root);
						r.default.newElement("legend", {
							innerHTML: n.default("recentchanges-legend")
						}, e);
						var t = r.default.newElement("div", {
								className: "rc-fieldset-content"
							}, e),
							i = r.default.newElement("aside", {
								className: "rcm-options-settings"
							}, t);
						i.innerHTML = a.default.getSymbol("rcm-settings-gear", 19), i.querySelector("svg").style.cssText = "vertical-align: top;";
						var s = r.default.newElement("div", {
							className: "rcm-options-settings-cont"
						}, i);
						this.settingsSaveCookieCheckbox = this._createNewSettingsOption(n.default("rcm-optionspanel-savewithcookie"), this.isSaveEnabled(), s), this.settingsShowDiscussionsCheckbox = this._createNewSettingsOption(n.default("discussions"), this.manager.discussionsEnabled, s);
						var o = n.default("rclinks").split("<br />")[0].split("$3")[0].split(/\$1|\$2/),
							l = r.default.newElement("div", {}, t);
						r.default.addTextTo(o[0], l), this.limitField = r.default.newElement("select", {}, l), r.default.addTextTo(o[1], l), this.daysField = r.default.newElement("select", {}, l), r.default.addTextTo(o[2] || "", l);
						var c = r.default.newElement("div", {}, t);
						return this.minorEditsCheckbox = this._newCheckbox(n.default("rcshowhideminor", ""), c), r.default.addTextTo(" | ", c), this.botsCheckbox = this._newCheckbox(n.default("rcshowhidebots", ""), c), r.default.addTextTo(" | ", c), this.anonsCheckbox = this._newCheckbox(n.default("rcshowhideanons", ""), c), r.default.addTextTo(" | ", c), this.usersCheckbox = this._newCheckbox(n.default("rcshowhideliu", ""), c), r.default.addTextTo(" | ", c), this.myEditsCheckbox = this._newCheckbox(n.default("rcshowhidemine", ""), c), a.default.username && -1 != this.manager.hideusers.indexOf(a.default.username) && (this.myEditsCheckbox.disabled = !0, this.myEditsCheckbox.checked = !1, this.myEditsCheckbox.title = n.default("rcm-optionspanel-hideusersoverride")), r.default.addTextTo(" | ", c), this.groupedChangesCheckbox = this._newCheckbox(n.default("rcshowhideenhanced", ""), c), r.default.addTextTo(" | ", c), this.logsCheckbox = this._newCheckbox(n.default("rcshowhidelogs", ""), c), this.addEventListeners(), this.refresh(), this
					}, e.prototype._newCheckbox = function(e, t) {
						var i = r.default.newElement("label", null, t),
							a = r.default.newElement("input", {
								type: "checkbox"
							}, i);
						return r.default.addTextTo(e, i), a
					}, e.prototype._createNewSettingsOption = function(e, t, i) {
						var a = this._newCheckbox(e, i);
						return a.checked = t, a
					}, e.prototype.refresh = function() {
						this.limitField.innerHTML = "";
						var e = this.manager.rcParams.limit,
							t = [25, 50, 75, 100, 200, 350, 500]; - 1 == t.indexOf(e) && (t.push(e), t.sort(function(e, t) {
							return e - t
						}));
						for(n = 0; n < t.length; n++) r.default.newElement("option", {
							value: t[n],
							innerHTML: t[n],
							selected: e == t[n] ? "selected" : void 0
						}, this.limitField);
						this.daysField.innerHTML = "";
						var i = this.manager.rcParams.days,
							a = [1, 3, 7, 14, 30]; - 1 == a.indexOf(i) && (a.push(i), a.sort(function(e, t) {
							return e - t
						}));
						for(var n = 0; n < a.length; n++) r.default.newElement("option", {
							value: a[n],
							innerHTML: a[n],
							selected: i == a[n] ? "selected" : void 0
						}, this.daysField);
						this.minorEditsCheckbox.checked = !this.manager.rcParams.hideminor, this.botsCheckbox.checked = !this.manager.rcParams.hidebots, this.anonsCheckbox.checked = !this.manager.rcParams.hideanons, this.usersCheckbox.checked = !this.manager.rcParams.hideliu, this.myEditsCheckbox.checked = !this.manager.rcParams.hidemyself, this.groupedChangesCheckbox.checked = !this.manager.rcParams.hideenhanced, this.logsCheckbox.checked = !this.manager.rcParams.hidelogs
					}, e.prototype.addEventListeners = function() {
						this.settingsSaveCookieCheckbox.addEventListener("change", this._onChange_settingsSaveCookie.bind(this)), this.settingsShowDiscussionsCheckbox.addEventListener("change", this._onChange_settingsShowDiscussions.bind(this)), this.limitField.addEventListener("change", this._onChange_limit.bind(this)), this.daysField.addEventListener("change", this._onChange_days.bind(this)), this.minorEditsCheckbox.addEventListener("change", this._onChange_hideminor.bind(this)), this.botsCheckbox.addEventListener("change", this._onChange_hidebots.bind(this)), this.anonsCheckbox.addEventListener("change", this._onChange_hideanons.bind(this)), this.usersCheckbox.addEventListener("change", this._onChange_hideliu.bind(this)), this.myEditsCheckbox.addEventListener("change", this._onChange_hidemyself.bind(this)), this.groupedChangesCheckbox.addEventListener("change", this._onChange_hideenhanced.bind(this)), this.logsCheckbox.addEventListener("change", this._onChange_hidelogs.bind(this))
					}, e.prototype.removeEventListeners = function() {
						this.settingsSaveCookieCheckbox.removeEventListener("change", this._onChange_settingsSaveCookie.bind(this)), this.settingsShowDiscussionsCheckbox.removeEventListener("change", this._onChange_settingsShowDiscussions.bind(this)), this.limitField.removeEventListener("change", this._onChange_limit), this.daysField.removeEventListener("change", this._onChange_days), this.minorEditsCheckbox.removeEventListener("change", this._onChange_hideminor), this.botsCheckbox.removeEventListener("change", this._onChange_hidebots), this.anonsCheckbox.removeEventListener("change", this._onChange_hideanons), this.usersCheckbox.removeEventListener("change", this._onChange_hideliu), this.myEditsCheckbox.removeEventListener("change", this._onChange_hidemyself), this.groupedChangesCheckbox.removeEventListener("change", this._onChange_hideenhanced), this.logsCheckbox.removeEventListener("change", this._onChange_hidelogs)
					}, e.prototype._onChange_limit = function(e) {
						this.afterChangeNumber("limit", parseInt(e.target.value))
					}, e.prototype._onChange_days = function(e) {
						this.afterChangeNumber("days", parseInt(e.target.value))
					}, e.prototype._onChange_hideminor = function(e) {
						this.afterChangeBoolean("hideminor", !e.target.checked)
					}, e.prototype._onChange_hidebots = function(e) {
						this.afterChangeBoolean("hidebots", !e.target.checked)
					}, e.prototype._onChange_hideanons = function(e) {
						0 == e.target.checked && 0 == this.usersCheckbox.checked && (this.manager.rcParams.hideliu = !1, this.usersCheckbox.checked = !0), this.afterChangeBoolean("hideanons", !e.target.checked)
					}, e.prototype._onChange_hideliu = function(e) {
						0 == e.target.checked && 0 == this.anonsCheckbox.checked && (this.manager.rcParams.hideanons = !1, this.anonsCheckbox.checked = !0), this.afterChangeBoolean("hideliu", !e.target.checked)
					}, e.prototype._onChange_hidemyself = function(e) {
						this.afterChangeBoolean("hidemyself", !e.target.checked)
					}, e.prototype._onChange_hideenhanced = function(e) {
						this.afterChangeBoolean("hideenhanced", !e.target.checked)
					}, e.prototype._onChange_hidelogs = function(e) {
						this.afterChangeBoolean("hidelogs", !e.target.checked)
					}, e.prototype._onChange_settingsSaveCookie = function(e) {
						e.target.checked ? this.save() : localStorage.removeItem(this.localStorageID)
					}, e.prototype._onChange_settingsShowDiscussions = function(e) {
						this.discussionsEnabled = e.target.checked, this.manager.discussionsEnabled = e.target.checked, this.manager.hardRefresh(!0), this.save()
					}, e.prototype.afterChangeNumber = function(e, t, i) {
						void 0 === i && (i = !1), this.rcParams[e] = t, this.manager.rcParams[e] = t, this.manager.hardRefresh(!0), this.save()
					}, e.prototype.afterChangeBoolean = function(e, t, i) {
						void 0 === i && (i = !1), this.rcParams[e] = t, this.manager.rcParams[e] = t, this.manager.hardRefresh(!0), this.save()
					}, e.prototype.save = function() {
						this.settingsSaveCookieCheckbox.checked && localStorage.setItem(this.localStorageID, JSON.stringify({
							options: this.rcParams,
							discussionsEnabled: this.discussionsEnabled
						}))
					}, e.prototype.getSave = function() {
						return localStorage.getItem(this.localStorageID) ? JSON.parse(localStorage.getItem(this.localStorageID)) : {}
					}, e.prototype.isSaveEnabled = function() {
						return null != localStorage.getItem(this.localStorageID)
					}, e
				}());
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = o
		}, {
			"./ConstantsApp": 1,
			"./Utils": 11,
			"./i18n": 13
		}],
		8: [function(e, t, i) {
			"use strict";
			var a = e("./ConstantsApp"),
				r = e("./Utils"),
				n = e("./i18n"),
				s = window.jQuery,
				o = (window.mediaWiki, function() {
					function e(e) {
						this.manager = e, this.singleWiki = 1 == this.manager.chosenWikis.length, this.count = 0
					}
					return e.prototype.dispose = function() {
						this.manager = null, this.root = null, this.listNode = null, this.infoNode = null
					}, e.prototype.init = function(e) {
						return this.root = e, this.singleWiki || (this.listNode = r.default.newElement("span", {
							className: "rcm-wikis-list"
						}, this.root)), this.infoNode = r.default.newElement("div", {
							className: "rcm-wikis-info"
						}, this.root), this
					}, e.prototype.populate = function() {
						this.singleWiki || (this.listNode.innerHTML = n.default("rcm-wikisloaded"))
					}, e.prototype.clear = function() {
						this.singleWiki || (this.listNode.innerHTML = "", this.infoNode.innerHTML = ""), this.count = 0
					}, e.prototype.addWiki = function(e) {
						var t = this;
						this.singleWiki ? this.infoNode.innerHTML || this.onIconClick(e, null) : (this.count > 0 && r.default.addTextTo(":", this.listNode), r.default.newElement("span", {
							id: e.infoID,
							className: "favicon",
							innerHTML: e.getFaviconHTML()
						}, this.listNode).addEventListener("click", function(i) {
							t.onIconClick(e, i)
						})), this.count++
					}, e.prototype.onIconClick = function(e, t) {
						var i = this.infoNode.querySelector(".banner-notification");
						i && i.dataset.wiki == e.servername && t && 0 != t.screenX && 0 != t.screenY ? this.closeInfo() : (this.infoNode.innerHTML = "<div class='banner-notification warn' data-wiki='" + e.servername + "'>" + (this.singleWiki ? "" : "<button class='close wikia-chiclet-button'><img></button>") + "<div class='msg'><table class='rcm-wiki-infotable'><tr><td rowspan='2' class='rcm-title-cell'>" + e.getFaviconHTML() + " <b><a href='" + e.articlepath + r.default.escapeCharactersLink(e.mainpage) + "'>" + e.sitename + "</a></b> : </td><td><a href='" + e.articlepath + "Special:RecentChanges" + e.firstSeperator + e.rcParams.paramString + "'>" + n.default("recentchanges") + "</a> - <a href='" + e.articlepath + "Special:NewPages'>" + n.default("newpages") + "</a> - <a href='" + e.articlepath + "Special:NewFiles'>" + n.default("newimages") + "</a> - <a href='" + e.articlepath + "Special:Log'>" + n.default("log") + "</a>" + (e.isWikiaWiki ? " - <a href='" + e.articlepath + "Special:Insights'>" + n.default("insights") + "</a>" : "") + " - <a href='" + e.articlepath + "Special:Random'>" + n.default("randompage") + "</a></td></tr><tr><td><table class='wikitable center statisticstable' style='margin: 0;'><tr><td><a href='" + e.articlepath + "Special:AllPages'>" + n.default("awc-metrics-articles") + "</a>: <b>" + e.statistics.articles + "</b></td><td><a href='" + e.articlepath + "Special:ListFiles'>" + n.default("prefs-files") + "</a>: <b>" + e.statistics.images + "</b></td><td><a href='" + e.articlepath + "Special:ListUsers'>" + n.default("group-user") + "</a>: <b>" + e.statistics.activeusers + "</b></td><td><a href='" + e.articlepath + "Special:ListAdmins'>" + n.default("group-sysop") + "</a>: <b>" + e.statistics.admins + "</b></td><td><a href='" + e.articlepath + "Special:Statistics'>" + n.default("awc-metrics-edits") + "</a>: <b>" + e.statistics.edits + "</b></td></tr></table></td></tr></table></div>", this.singleWiki || this.infoNode.querySelector(".banner-notification .close").addEventListener("click", this.closeInfo.bind(this)))
					}, e.prototype.closeInfo = function() {
						s(this.infoNode.querySelector(".banner-notification")).animate({
							height: "toggle",
							opacity: "toggle"
						}, 200, function() {
							s(this).remove()
						})
					}, e.prototype.goToAndOpenInfo = function(e) {
						var t = document.querySelector("#" + e.currentTarget.dataset.infoid);
						if(t) {
							if(!r.default.elemIsVisible(t)) {
								var i = "oasis" == a.default.config.skin ? -46 : 0;
								s("html, body").scrollTop(s(t).offset().top + i - 6)
							}
							t.click()
						}
					}, e
				}());
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = o
		}, {
			"./ConstantsApp": 1,
			"./Utils": 11,
			"./i18n": 13
		}],
		9: [function(e, t, i) {
			"use strict";
			var a = this && this.__extends || function(e, t) {
					function i() {
						this.constructor = e
					}
					for(var a in t) t.hasOwnProperty(a) && (e[a] = t[a]);
					e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
				},
				r = e("./ConstantsApp"),
				n = e("./RCData"),
				s = e("./Utils"),
				o = e("./i18n"),
				l = e("./RC_TYPE"),
				c = (window.jQuery, window.mediaWiki, function(e) {
					function t(t, i) {
						e.call(this, t, i)
					}
					return a(t, e), t.prototype.dispose = function() {
						e.prototype.dispose.call(this)
					}, t.prototype.init = function(e) {
						return this.type = l.default.DISCUSSION, this.date = new Date(0), this.date.setUTCSeconds((e.modificationDate || e.creationDate).epochSecond), this.userEdited = !0, this.author = e.createdBy.name, this.userhidden = !1, this.title = e.title, this.namespace = -5234, this.summary = e.rawContent, this.summary.length > 175 && (this.summary = this.summary.slice(0, 175) + "..."), this.unparsedComment = this.summary, this.forumId = e.forumId, this.threadId = e.threadId, this.pageid = e.id, this.isNewPage = null == e.modificationDate, this.isBotEdit = !1, this.isMinorEdit = !1, this.isPatrolled = !1, this.titleNoNS = this.title, this.uniqueID = e.threadId, this.hrefTitle = s.default.escapeCharactersLink(e.title), this.threadHref = "//" + this.wikiInfo.servername + "/d/p/" + this.threadId, this.href = this.threadHref + (e.isReply ? "#reply-" + e.id : ""), this.hrefBasic = this.href, this.hrefFS = this.href + this.wikiInfo.firstSeperator, this.threadTitle = e.title, this.user_id = e.createdBy.id, this.user_avatarUrl = e.createdBy.avatarUrl ? e.createdBy.avatarUrl.replace("/scale-to-width-down/100", "/scale-to-width-down/15") : e.createdBy.avatarUrl, this.upvoteCount = e.upvoteCount, this.forumName = e.forumName, this.rawContent = e.rawContent, this.isLocked = e.isLocked, this.isReported = e.isReported, null
					}, t.prototype.userDetails = function() {
						if(this.userhidden) return '<span class="history-deleted">' + o.default("rev-deleted-user") + "</span>";
						var e = this.wikiInfo.canBlock ? o.default("pipe-separator") + "<a href='{0}Special:Block/{1}'>" + o.default("blocklink") + "</a>" : "",
							t = "//" + this.wikiInfo.servername + "/d/u/" + this.user_id;
						return s.default.formatString("<span class='mw-usertoollinks'>" + this.getAvatarImg() + "<a href='{0}User:{1}'>{2}</a> (<a href='{0}User_talk:{1}'>" + o.default("talkpagelinktext") + "</a>" + o.default("pipe-separator") + "<a href='" + t + "'>" + o.default("contribslink") + "</a>" + e + ")</span>", this.wikiInfo.articlepath, s.default.escapeCharactersLink(this.author), this.author)
					}, t.prototype.getAvatarImg = function() {
						return this.user_avatarUrl ? '<span class="rcm-avatar"><a href="' + this.wikiInfo.articlepath + "User:" + s.default.escapeCharactersLink(this.author) + "\"><img src='" + this.user_avatarUrl + '\' width="15" height="15" /></a> </span>' : ""
					}, t.prototype.discusssionTitleText = function(e, t) {
						void 0 === t && (t = !1), void 0 == e && (e = this.getThreadTitle());
						var i = '<a href="//' + this.wikiInfo.servername + "/d/f?catId=" + this.forumId + '&sort=latest">' + this.forumName + "</a>",
							a = o.default.MESSAGES["wall-recentchanges-thread-group"];
						return a = a.replace(/(\[\[.*\]\])/g, i), a = o.default.wiki2html(a, '<a href="' + (t ? this.threadHref : this.href) + '">' + e + "</a>" + (t ? "" : this.getUpvoteCount()))
					}, t.prototype.getUpvoteCount = function() {
						return '<span class="rcm-upvotes"> (' + r.default.getSymbol("rcm-upvote-tiny") + " " + this.upvoteCount + ")</span>"
					}, t.prototype.getThreadStatusIcons = function() {
						return "" + (this.isLocked ? r.default.getSymbol("rcm-lock") : "") + (this.isReported ? r.default.getSymbol("rcm-report") : "")
					}, t
				}(n.default));
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = c
		}, {
			"./ConstantsApp": 1,
			"./RCData": 3,
			"./RC_TYPE": 10,
			"./Utils": 11,
			"./i18n": 13
		}],
		10: [function(e, t, i) {
			"use strict";
			var a;
			! function(e) {
				e[e.NORMAL = 0] = "NORMAL", e[e.LOG = 1] = "LOG", e[e.COMMENT = 2] = "COMMENT", e[e.WALL = 3] = "WALL", e[e.BOARD = 4] = "BOARD", e[e.DISCUSSION = 5] = "DISCUSSION"
			}(a || (a = {})), Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = a
		}, {}],
		11: [function(e, t, i) {
			"use strict";
			var a = e("./ConstantsApp"),
				r = (window.jQuery, window.mediaWiki),
				n = function() {
					function e() {}
					return e.forEach = function(e, t, i) {
						void 0 != e && Array.prototype.forEach.call(e, t, i)
					}, e.newElement = function(e, t, i) {
						var a = document.createElement(e);
						if(void 0 != t)
							for(var r in t) "style" == r ? a.style.cssText = t[r] : a[r] = t[r];
						return void 0 != i && i.appendChild(a), a
					}, e.removeElement = function(e) {
						(e = e).parentNode.removeChild(e)
					}, e.addTextTo = function(e, t) {
						t.appendChild(document.createTextNode(e))
					}, e.elemIsVisible = function(e) {
						var t = e.getBoundingClientRect(),
							i = Math.max(document.documentElement.clientHeight, window.innerHeight);
						return !(t.bottom < 0 || t.top - i >= 0)
					}, e.insertAfter = function(e, t) {
						return t.nextSibling ? t.parentNode.insertBefore(e, t.nextSibling) : t.parentNode.appendChild(e)
					}, e.prependChild = function(e, t) {
						return t.firstChild ? t.insertBefore(e, t.firstChild) : t.appendChild(e)
					}, e.getSeconds = function(e) {
						return "utc" == a.default.timezone ? e.getUTCSeconds() : e.getSeconds()
					}, e.getMinutes = function(e) {
						return "utc" == a.default.timezone ? e.getUTCMinutes() : e.getMinutes()
					}, e.getHours = function(e) {
						return "utc" == a.default.timezone ? e.getUTCHours() : e.getHours()
					}, e.getDate = function(e) {
						return "utc" == a.default.timezone ? e.getUTCDate() : e.getDate()
					}, e.getMonth = function(e) {
						return "utc" == a.default.timezone ? e.getUTCMonth() : e.getMonth()
					}, e.getYear = function(e) {
						return "utc" == a.default.timezone ? e.getUTCFullYear() : e.getFullYear()
					}, e.formatWikiTimeStamp = function(t, i) {
						void 0 === i && (i = !0);
						var r = e.getYear(t),
							n = e.getMonth(t) + 1,
							s = a.default.config.wgMonthNames[n],
							o = e.getDate(t),
							l = "";
						if(i) {
							var c = e.getHours(t),
								d = e.getMinutes(t),
								h = e.getSeconds(t);
							l = e.pad(c, 2) + ":" + e.pad(d, 2), "ISO 8601" != a.default.userOptions.date ? l += ", " : l = "T" + l + ":" + e.pad(h, 2)
						}
						switch(a.default.userOptions.date) {
							case "mdy":
							default:
								return l + (s + " ") + o + ", " + r;
							case "dmy":
								return l + (o + " ") + s + " " + r;
							case "ymd":
								return l + (r + " ") + s + " " + o;
							case "ISO 8601":
								return r + "-" + e.pad(n, 2, 0) + "-" + e.pad(o, 2, 0) + l
						}
					}, e.getTimestampForYYYYMMDDhhmmSS = function(e) {
						var t = 0;
						return(e = "" + e).slice(t, t += 4) + "-" + e.slice(t, t += 2) + "-" + e.slice(t, t += 2) + "T" + e.slice(t, t += 2) + ":" + e.slice(t, t += 2) + ":" + e.slice(t, t += 2)
					}, e.pad = function(e, t, i) {
						return void 0 === i && (i = 0), e = e.toString(), e.length >= t ? e : new Array(t - e.length + 1).join(i.toString()) + e
					}, e.formatString = function(e) {
						for(var t = [], i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
						return e.replace(/{(\d+)}/g, function(e, i) {
							return void 0 !== t[i] ? t[i] : e
						})
					}, e.escapeCharacters = function(e) {
						return e ? e.replace(/"/g, "&quot;").replace(/'/g, "&apos;") : e
					}, e.escapeCharactersLink = function(e) {
						return r.util.wikiUrlencode(e)
					}, e.ucfirst = function(e) {
						return e && e[0].toUpperCase() + e.slice(1)
					}, e.uniq_fast_key = function(e, t) {
						for(var i = {}, a = [], r = e.length, n = 0, s = 0; s < r; s++) {
							var o = e[s];
							1 !== i[o[t]] && (i[o[t]] = 1, a[n++] = o)
						}
						return a
					}, e.uniqID = function() {
						return "id" + ++a.default.uniqID
					}, e.getFirstItemFromObject = function(e) {
						for(var t in e) return e[t]
					}, e.isFileAudio = function(e) {
						for(var t = null, i = ["oga", "ogg", "ogv"], a = 0; a < i.length; a++)
							if(t = "." + i[a], -1 !== e.indexOf(t, e.length - t.length)) return !0;
						return !1
					}, e.version_compare = function(e, t, i) {
						var a = 0,
							r = 0,
							n = 0,
							s = {
								dev: -6,
								alpha: -5,
								a: -5,
								beta: -4,
								b: -4,
								RC: -3,
								rc: -3,
								"#": -2,
								p: 1,
								pl: 1
							},
							o = function(e) {
								return e = ("" + e).replace(/[_\-+]/g, "."), e = e.replace(/([^.\d]+)/g, ".$1.").replace(/\.{2,}/g, "."), e.length ? e.split(".") : [-8]
							},
							l = function(e) {
								return e ? isNaN(e) ? s[e] || -7 : parseInt(e, 10) : 0
							},
							c = o(e),
							d = o(t);
						for(r = Math.max(c.length, d.length), a = 0; a < r; a++)
							if(c[a] != d[a]) {
								if(c[a] = l(c[a]), d[a] = l(d[a]), c[a] < d[a]) {
									n = -1;
									break
								}
								if(c[a] > d[a]) {
									n = 1;
									break
								}
							}
						if(!i) return n.toString();
						switch(i) {
							case ">":
							case "gt":
								return(n > 0).toString();
							case ">=":
							case "ge":
								return(n >= 0).toString();
							case "<=":
							case "le":
								return(n <= 0).toString();
							case "==":
							case "=":
							case "eq":
								return(0 === n).toString();
							case "<>":
							case "!=":
							case "ne":
								return(0 !== n).toString();
							case "":
							case "<":
							case "lt":
								return(n < 0).toString();
							default:
								return null
						}
					}, e
				}();
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = n
		}, {
			"./ConstantsApp": 1
		}],
		12: [function(e, t, i) {
			"use strict";
			var a = e("./ConstantsApp"),
				r = e("./Utils"),
				n = e("./i18n"),
				s = window.jQuery,
				o = window.mediaWiki,
				l = function() {
					function e(e) {
						this.manager = e, this.notificationsEnabled = !0, this.needsSiteinfoData = !0, this.needsUserData = !0, this.canBlock = !1, this.canRollback = !0, this.isWikiaWiki = !0, this.useOutdatedLogSystem = !1, this.lastChangeDate = null, this.lastDiscussionDate = null, this.resultsCount = 0, this.discussionsCount = 0
					}
					return e.prototype.dispose = function() {
						this.manager = null, this.hideusers = null, this.onlyshowusers = null, this.rcParamsBase = null, this.rcParams = null, this.namespaces = null, this.lastChangeDate = null, this.lastDiscussionDate = null
					}, e.prototype.initListData = function(e) {
						var t = e.textContent.replace(/(\r\n|\n|\r)/gm, "").trim().split("&");
						if(this.servername = t[0], this.scriptdir = "", this.firstSeperator = "?", this.htmlName = this.servername.replace(/(\.)/g, "-"), this.isWikiaWiki = this.servername.indexOf(".wikia.") > -1, this.useOutdatedLogSystem = this.isWikiaWiki, this.servername.indexOf("/") > -1) throw this.manager.resultCont.innerHTML = "<div style='color:red; padding:4px 5px; background:rgba(0,0,0,0.1);'>" + n.default("rcm-error-linkformat", this.servername) + "</div>", "Incorrect format";
						for(var i, s, o, l = 1; l < t.length; l++)
							if((i = t[l].split("=")).length > 1) switch(s = i[0], o = i[1], s) {
								case "params":
									this.rcParamsBase = this.manager.parseRCParams(o, ",", ":");
									break;
								case "hideusers":
									this.hideusers = o.replace("", " ").split(","), this.hideusers.forEach(function(e, t, i) {
										i[t] = r.default.ucfirst(i[t].trim())
									});
									break;
								case "onlyshowusers":
									this.onlyshowusers = o.replace("", " ").split(","), this.onlyshowusers.forEach(function(e, t, i) {
										i[t] = r.default.ucfirst(i[t].trim())
									});
									break;
								case "notifications_hideusers":
									this.notificationsHideusers = o.replace("", " ").split(","), this.notificationsHideusers.forEach(function(e, t, i) {
										i[t] = r.default.ucfirst(i[t].trim())
									});
									break;
								case "notifications_enabled":
									this.notificationsEnabled = "false" !== o;
									break;
								case "scriptdir":
									this.scriptdir = o, "/" != this.scriptdir[0] && (this.scriptdir = "/" + this.scriptdir), "/" == this.scriptdir[this.scriptdir.length - 1] && (this.scriptdir = this.scriptdir.slice(0, -1));
									break;
								case "favicon":
									this.favicon = o, this.favicon.indexOf(".") > -1 ? this.favicon = "//" + this.favicon : this.favicon = "https://vignette.wikia.nocookie.net/" + this.favicon + "/images/6/64/Favicon.ico";
									break;
								case "username":
									this.username = o;
									break;
								case "bgcolor":
									this.bgcolor = o;
									break;
								default:
									this[s] = o
							}
						return !this.username && this.isWikiaWiki && a.default.username && (this.username = a.default.username), this.scriptpath = "//" + this.servername + this.scriptdir, this.infoID = "wiki-" + this.htmlName, this.rcClass = "rc-entry-" + this.htmlName, s = null, o = null, t = null, i = null, this
					}, e.prototype.initAfterLoad = function(e) {
						if(this.needsSiteinfoData && e.general) {
							if(this.needsSiteinfoData = !1, this.server = e.general.server || "//" + this.servername, this.articlepath = this.server + e.general.articlepath.replace("$1", ""), this.articlepath.indexOf("?") > -1 && (this.firstSeperator = "&"), this.sitename = e.general.sitename, this.mainpage = e.general.mainpage, this.mwversion = e.general.generator, null == this.favicon)
								if(e.general.favicon) this.favicon = e.general.favicon, 0 != this.favicon.indexOf("http") && 0 != this.favicon.indexOf("//") && (this.favicon = this.server + "/" + this.favicon);
								else if(e.pages) {
								var t;
								for(t in e.pages) break;
								e.pages[t] && e.pages[t].imageinfo && (this.favicon = e.pages[t].imageinfo[0].url)
							}
							if(this.namespaces = e.namespaces || {}, this.statistics = e.statistics || {}, e.variables) {
								var i = s.grep(e.variables, function(e) {
									return "wgCityId" === e.id
								})[0];
								i ? this.wikiaCityID = i["*"] : this.usesWikiaDiscussions = !1
							}
						}
						if(this.needsUserData && e.users) {
							this.canBlock = !1, this.canRollback = !1, this.needsUserData = !1;
							for(var r in e.users[0].rights) "block" == e.users[0].rights[r] ? this.canBlock = !0 : "rollback" == e.users[0].rights[r] && (this.canRollback = !0)
						}
						return null == this.favicon && (this.favicon = a.default.FAVICON_BASE + this.servername), this
					}, e.prototype.setupRcParams = function() {
						this.rcParams = s.extend({}, this.manager.rcParamsBase), Object.keys(this.manager.optionsNode.rcParams).length > 0 && (this.rcParams = s.extend(this.rcParams, this.manager.optionsNode.rcParams)), null != this.rcParamsBase && (this.rcParams = s.extend(this.rcParams, this.rcParamsBase)), this.rcParams.paramString = this.createRcParamsString(this.rcParams), this.rcParams = s.extend(this.manager.getDefaultRCParams(), this.rcParams), this.lastChangeDate || (this.lastChangeDate = this.getEndDate(), this.lastDiscussionDate = this.getEndDate())
					}, e.prototype.createRcParamsString = function(e) {
						var t = [];
						return s.each(e, function(e, i) {
							"paramString" != e && (!0 === i && (i = "1"), !1 === i && (i = "0"), t.push(e + "=" + i))
						}), t.join("&")
					}, e.prototype.getFaviconHTML = function(e) {
						void 0 === e && (e = !1);
						var t = "<img src='" + this.favicon + "' title='" + this.sitename + "' width='16' height='16' />";
						return e && (t = "<span class='rcm-favicon-goto-button' data-infoid='" + this.infoID + "'>" + t + "</span>"), t
					}, e.prototype.getEndDate = function() {
						var e = new Date;
						return e.setDate(e.getDate() - this.rcParams.days), e
					}, e.prototype.updateLastChangeDate = function(e) {
						this.lastChangeDate = new Date(e.timestamp), this.lastChangeDate.setSeconds(this.lastChangeDate.getSeconds() + 1), this.lastChangeDate.setMilliseconds(1)
					}, e.prototype.updateLastDiscussionDate = function(e) {
						var t = (e.modificationDate || e.creationDate).epochSecond;
						this.lastDiscussionDate = new Date(0), this.lastDiscussionDate.setUTCSeconds(t), this.lastDiscussionDate.setUTCMilliseconds(1)
					}, e.prototype.getWikiDataApiUrl = function() {
						if(!this.needsSiteinfoData || !this.needsUserData) return null;
						var e = this.scriptpath + "/api.php?action=query&format=json&continue=",
							t = [],
							i = [],
							a = [];
						return i.push("siteinfo"), e += "&siprop=" + ["general", "namespaces", "statistics", "variables"].join("|"), a.push("imageinfo"), e += "&iiprop=url&titles=File:Favicon.ico", this.username ? (t.push("users"), e += "&ususers=" + this.username + "&usprop=rights") : this.needsUserData = !1, t.length > 0 && (e += "&list=" + t.join("|")), i.length > 0 && (e += "&meta=" + i.join("|")), a.length > 0 && (e += "&prop=" + a.join("|")), e.replace(/ /g, "_"), i = null, a = null, o.log("[WikiData](getWikiDataApiUrl)", "http:" + e.replace("&format=json", "&format=jsonfm")), e
					}, e.prototype.getWikiDiscussionUrl = function() {
						var e = this.lastDiscussionDate,
							t = this.rcParams.limit < 50 ? this.rcParams.limit : 50,
							i = "https://services.wikia.com/discussion/" + this.wikiaCityID + "/posts?limit=" + t + "&page=0&since=" + e.toISOString() + "&responseGroup=small&reported=false&viewableOnly=" + !this.canBlock;
						return o.log("[WikiData](getWikiDiscussionUrl) " + i), i
					}, e.prototype.getApiUrl = function() {
						var t = this.scriptpath + "/api.php?action=query&format=json&continue=",
							i = [],
							a = [],
							r = [],
							n = this.lastChangeDate;
						i.push("recentchanges"), t += "&rcprop=" + e.RC_PROPS, t += "&rclimit=" + this.rcParams.limit, t += "&rcend=" + n.toISOString();
						var s = [];
						this.rcParams.hideminor && s.push("!minor"), this.rcParams.hidebots && s.push("!bot"), this.rcParams.hideanons && s.push("!anon"), this.rcParams.hideliu && s.push("anon"), t += "&rcshow=" + s.join("|"), s = null;
						var l = ["edit", "new"];
						0 == this.rcParams.hidelogs && l.push("log"), t += "&rctype=" + l.join("|"), l = null;
						var c = null;
						return this.rcParams.hidemyself && this.username ? c = this.username : this.manager.hideusers.length > 0 ? c = this.manager.hideusers[0] : this.hideusers && (c = this.hideusers[0]), null != c && (t += "&rcexcludeuser=" + c), (this.rcParams.namespace || "0" === this.rcParams.namespace) && (t += "&rcnamespace=" + this.rcParams.namespace), this.useOutdatedLogSystem && (i.push("logevents"), t += "&leprop=" + ["details", "user", "title", "timestamp", "type", "ids"].join("|"), t += "&letype=" + ["rights", "move", "delete", "block", "merge"].join("|"), t += "&lelimit=" + this.rcParams.limit, t += "&leend=" + n.toISOString()), t += "&list=" + i.join("|"), a.length > 0 && (t += "&meta=" + a.join("|")), r.length > 0 && (t += "&prop=" + r.join("|")), t.replace(/ /g, "_"), i = null, a = null, r = null, n = null, o.log("[WikiData](getApiUrl)", "http:" + t.replace("&format=json", "&format=jsonfm")), t
					}, e.RC_PROPS = ["user", "flags", "title", "ids", "sizes", "timestamp", "loginfo", "parsedcomment", "comment"].join("|"), e
				}();
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = l
		}, {
			"./ConstantsApp": 1,
			"./Utils": 11,
			"./i18n": 13
		}],
		13: [function(e, t, i) {
			"use strict";
			var a = e("./ConstantsApp"),
				r = window.jQuery,
				n = window.mediaWiki,
				s = function(e) {
					for(var t = [], i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
					var a = s.TEXT[e] || s.MESSAGES[e];
					return void 0 == a ? (n.log("[RecentChangesMultiple.i18n]() '" + e + "' is undefined."), e) : s.wiki2html.apply(s, [a].concat(t))
				};
			s.defaultLang = "en", s.init = function(e) {
				s.defaultLang = e ? e.toLowerCase() : a.default.config.wgUserLanguage, s.TEXT = r.extend(s.TEXT.en, s.TEXT[s.defaultLang] || s.TEXT[s.defaultLang.split("-")[0]]), n.language.setData(a.default.config.wgUserLanguage, s.TEXT.mwLanguageData)
			}, s.TEXT = {
				en: {
					"rcm-error-linkformat": "'$1' is an incorrect format. Please do '''not''' include 'http://' or anything after the domain, including the first '/'.",
					"rcm-error-loading-syntaxhang": "Error loading [$1] ($2 tries). Please correct syntax (or refresh script to try again).",
					"rcm-error-loading-connection": "Error loading [$1] ($2 tries). Most likely a connection issue; refresh script to try again.",
					"rcm-error-trymoretimes": "Try $1 more times",
					"rcm-loading": "Loading/Sorting...",
					"rcm-refresh": "Refresh",
					"rcm-download-timestamp": "Recent Changes downloaded at: $1",
					"rcm-download-changesadded": " - [$1 Recent Changes added]",
					"rcm-wikisloaded": "Wikis Loaded: ",
					"rcm-previouslyloaded": "Previously loaded:",
					"rcm-nonewchanges": "No new changes",
					"rcm-autorefresh": "Auto Refresh",
					"rcm-autorefresh-tooltip": "Automatically refreshes Recent Changes every $1 seconds",
					"rcm-footer": "Version $1 by $2",
					"rcm-optionspanel-hideusersoverride": "data-hideusers overrides this.",
					"rcm-optionspanel-savewithcookie": "Save options with cookie",
					"rcm-module-diff-title": "Diff Viewer",
					"rcm-module-diff-open": "Open diff",
					"rcm-module-diff-undo": "Undo edit",
					"rcm-unknownthreadname": "thread",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: null,
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1"],
						digitGroupingPattern: null,
						fallbackLanguages: []
					}
				},
				be: {
					"rcm-error-linkformat": "'$1' паказаны ў няздатным фармаце. Калі ласка, не выкарыстоўвайце элемент 'http://', не ўстаўляйце нічога пасля яго і першага '/'.",
					"rcm-error-loading-syntaxhang": "Памылка пры загрузцы [$1] (спроб: $2) Калі ласка, выпраўце сінтаксіс (або абновіце скрыпт, каб паспрабаваць зноў).",
					"rcm-error-loading-connection": "Памылка пры загрузцы [$1] (спроб: $2). Хутчэй за ўсе, гэта памылка з падключэннем, абновіце скрыпт, каб паспрабаваць зноў.",
					"rcm-error-trymoretimes": "Паспрабуйце $1 раз(а)",
					"rcm-loading": "Загрузка/Сартаванне...",
					"rcm-refresh": "Абнавіць",
					"rcm-download-timestamp": "Апошнія змены ўзятыя з: $1",
					"rcm-download-changesadded": " - [$1 апошніх дададзеных змяненняў]",
					"rcm-wikisloaded": "Загружаныя вікі: ",
					"rcm-previouslyloaded": "Раней загружаныя:",
					"rcm-nonewchanges": "Няма новых зменаў",
					"rcm-autorefresh": "Аўтаматычнае абнаўленне",
					"rcm-autorefresh-tooltip": "Аўтаматычнае абнаўленне апошніх змяненняў кожныя $1 секунд",
					"rcm-footer": "Версія $1, створаная $2",
					"rcm-optionspanel-savewithcookie": "Захаваць змены ў Cookie",
					"rcm-module-diff-title": "Папярэдні прагляд змяненняў",
					"rcm-module-diff-open": "Паказаць змены",
					"rcm-module-diff-undo": "Адмяніць змены",
					"rcm-unknownthreadname": "тэма",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: {
							",": " ",
							".": ","
						},
						grammarForms: {
							"родны": {
								"ВікіВіды": "ВікіВідаў",
								"ВікіКнігі": "ВікіКніг",
								"Вікікрыніцы": "Вікікрыніц",
								"ВікіНавіны": "ВікіНавін",
								"Вікіслоўнік": "Вікіслоўніка",
								"Вікіпедыя": "Вікіпедыі"
							},
							"вінавальны": {
								"Вікіпедыя": "Вікіпедыю"
							},
							"месны": {
								"ВікіВіды": "ВікіВідах",
								"ВікіКнігі": "ВікіКнігах",
								"Вікікрыніцы": "Вікікрыніцах",
								"ВікіНавіны": "ВікіНавінах",
								"Вікіслоўнік": "Вікіслоўніку",
								"Вікіпедыя": "Вікіпедыі"
							}
						},
						pluralRules: ["n % 10 = 1 and n % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, … @decimal 1.0, 21.0, 31.0, 41.0, 51.0, 61.0, 71.0, 81.0, 101.0, 1001.0, …", "n % 10 = 2..4 and n % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, … @decimal 2.0, 3.0, 4.0, 22.0, 23.0, 24.0, 32.0, 33.0, 102.0, 1002.0, …", "n % 10 = 0 or n % 10 = 5..9 or n % 100 = 11..14 @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"],
						digitGroupingPattern: null,
						fallbackLanguages: ["en"]
					}
				},
				ca: {
					"rcm-error-linkformat": "'$1' és un format incorrecte. Si us plau, no afegeixis 'http://' o alguna cosa darrere del domini, incloent el primer '/'.",
					"rcm-error-loading-syntaxhang": "Error de càrrega [$1] ($2 intents). Si us plau, corregeix les teves sintaxis (o recarrega el teu script i intenta-ho un altre cop).",
					"rcm-error-loading-connection": "Error de càrrega [$1] ($2 intents). A causa d'un error de connexió, has de recarregar el teu script i intenta-ho un altre cop.",
					"rcm-error-trymoretimes": "Intenta-ho $1 més vegades",
					"rcm-loading": "Carregant/Classificant…",
					"rcm-refresh": "Actualització",
					"rcm-download-timestamp": "Canvis recents baixats a: $1",
					"rcm-download-changesadded": " - [$1 Canvis recents afegits]",
					"rcm-wikisloaded": "Wikis carregats: ",
					"rcm-previouslyloaded": "Breument carregats:",
					"rcm-nonewchanges": "No hi ha nous canvis",
					"rcm-autorefresh": "Actualització automàtica",
					"rcm-autorefresh-tooltip": "Recarrega automàticament els canvis recents cada $1 segons",
					"rcm-footer": "Versió $1 de $2",
					"rcm-optionspanel-hideusersoverride": "data-hideusers overrides this.",
					"rcm-optionspanel-savewithcookie": "Guarda els canvis pel cookie",
					"rcm-module-diff-title": "Visualitzador de pàgina",
					"rcm-module-diff-open": "Obre la pàgina",
					"rcm-module-diff-undo": "Desfés el canvi",
					"rcm-unknownthreadname": "tema",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: {
							",": ".",
							".": ","
						},
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1"],
						digitGroupingPattern: null,
						fallbackLanguages: ["en"]
					}
				},
				de: {
					"rcm-error-linkformat": "'$1' ist ein fehlerhaftes Format. Bitte füge '''nicht''' 'http://' oder Weiteres nach der Domain ein. Dies gilt auch für das erste '/'.",
					"rcm-error-loading-syntaxhang": "Ladefehler [$1] ($2 Versuche). Bitte korrigiere den Syntax (oder aktualisiere das Script, um es erneut zu versuchen).",
					"rcm-error-loading-connection": "Ladefehler [$1] ($2 Versuche). Höchstwahrscheinlich ein Verbindungsproblem; Lade das Script neu, um es erneut zu versuchen.",
					"rcm-error-trymoretimes": "Versuche $1 mehrmals",
					"rcm-loading": "Lade/Sortiere...",
					"rcm-refresh": "Aktualisieren",
					"rcm-download-timestamp": "Letzte Veränderungen nach: $1",
					"rcm-download-changesadded": " - [$1 Letzte Änderungen, die hinzugefügt wurden]",
					"rcm-wikisloaded": "Geladene Wikis: ",
					"rcm-previouslyloaded": "Bisher geladen:",
					"rcm-nonewchanges": "Keine neuen Veränderungen",
					"rcm-autorefresh": "Auto-Aktualisierung",
					"rcm-autorefresh-tooltip": "Aktualisiert automatisch die letzten Veränderungen jede $1 Sekunden",
					"rcm-footer": "Version $1 bis $2",
					"rcm-optionspanel-hideusersoverride": "data-hideusers überschreibt dies.",
					"rcm-optionspanel-savewithcookie": "Speicher Veränderungen mit Cookie",
					"rcm-module-diff-title": "Anderer Viewer",
					"rcm-module-diff-open": "Öffne Veränderung",
					"rcm-module-diff-undo": "Rückgängig",
					"rcm-unknownthreadname": "Thread",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: {
							",": ".",
							".": ","
						},
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1"],
						digitGroupingPattern: null,
						fallbackLanguages: ["en"]
					}
				},
				es: {
					"rcm-error-linkformat": "'$1' es un formato incorrecto. Por favor '''no''' incluyas 'http://' o cualquier cosa después, incluyendo el primer '/'.",
					"rcm-error-loading-syntaxhang": "Error cargando [$1] ($2 intentos). Por favor corrige la sintaxis (o recarga el script para intentarlo otra vez).",
					"rcm-error-loading-connection": "Error cargando [$1] ($2 intentos). Seguramente sea un problema de conexión; recarga el script para intentarlo otra vez.",
					"rcm-error-trymoretimes": "Inténtalo $1 veces más",
					"rcm-loading": "Cargando/Clasificando...",
					"rcm-refresh": "Recargar",
					"rcm-download-timestamp": "Cambios recientes descargados en: $1",
					"rcm-download-changesadded": " - [$1 Cambios Recientes añadidos]",
					"rcm-wikisloaded": "Wikis Cargados: ",
					"rcm-previouslyloaded": "Previamente cargados:",
					"rcm-nonewchanges": "No hay nuevos cambios",
					"rcm-autorefresh": "Auto Recargar",
					"rcm-autorefresh-tooltip": "Recarga los Cambios Recientes automáticamente cada $1 segundos",
					"rcm-footer": "Versión $1 por $2",
					"rcm-module-diff-title": "Visor de cambios",
					"rcm-module-diff-open": "Abrir cambio",
					"rcm-module-diff-undo": "Deshacer edición",
					"rcm-unknownthreadname": "hilo",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: null,
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1"],
						digitGroupingPattern: null,
						fallbackLanguages: []
					}
				},
				gl: {
					"rcm-error-linkformat": "'$1' é un formato incorrecto. Por favor, non tes que engadir 'http://' ou algunha cousa despois do dominio, incluíndo o primeiro '/'.",
					"rcm-error-loading-syntaxhang": "Erro de carregamento [$1] ($2 tentativas). Por favor, corrixe as túas sintaxes (ou recarrega o teu script e téntao novamente).",
					"rcm-error-loading-connection": "Erro de carregamento [$1] ($2 tentativas). Debido a un erro de conexión, tes de recarregar o teu script e téntao novamente.",
					"rcm-error-trymoretimes": "Téntao $1 máis veces",
					"rcm-loading": "A cargar/A clasificar…",
					"rcm-refresh": "Actualización",
					"rcm-download-timestamp": "Cambios recentes baixados en: $1",
					"rcm-download-changesadded": " - [$1 Cambios recentes engadidos]",
					"rcm-wikisloaded": "Wikis cargados: ",
					"rcm-previouslyloaded": "Brevemente cargados:",
					"rcm-nonewchanges": "Non hai novos cambios",
					"rcm-autorefresh": "Actualización automática",
					"rcm-autorefresh-tooltip": "Recarregar automaticamente os cambios recentes cada $1 segundos",
					"rcm-footer": "Versión $1 de $2",
					"rcm-optionspanel-hideusersoverride": "data-hideusers overrides this.",
					"rcm-optionspanel-savewithcookie": "Gardar cambios polo cookie",
					"rcm-module-diff-title": "Visualizador de páxina",
					"rcm-module-diff-open": "Abrir páxina",
					"rcm-module-diff-undo": "Desfacer cambio",
					"rcm-unknownthreadname": "tópico",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: {
							",": ".",
							".": ","
						},
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1"],
						digitGroupingPattern: null,
						fallbackLanguages: ["pt", "en"]
					}
				},
				it: {
					"rcm-errore-linkformat": "'$1' non è in un formato corretto. Per favore, '''non''' includere 'http://' o qualsiasi altra cosa dopo il dominio, compreso la prima '/'.",
					"rcm-Errore-loading-syntaxhang": "Errore caricando [$1] ($2 tentativi). Per favore, correggi la tua sintassi (o ricarica il tuo script per riprovare).",
					"rcm-Errore-loading-connection": "Errore caricando [$1] ($2 tentativi). Quasi sicuramente si tratta di un problema di connessione; ricarica lo script per riprovare.",
					"rcm-Errore-trymoretimes": "Prova $1 volte ancora",
					"rcm-loading": "Caricando / Ordinando...",
					"rcm-refresh": "Ricarica",
					"rcm-download-timestamp": "Ultime Modifiche scaricate alle: $1",
					"rcm-download-changesadded": " - [$1 Ultime Modifiche aggiunte]",
					"rcm-wikisloaded": "Wiki caricate:",
					"rcm-previouslyloaded": "Precedentemente caricate:",
					"rcm-nonewchanges": "Non ci sono nuove modifiche",
					"rcm-autorefresh": "Aggiornamento automatico",
					"rcm-autorefresh-tooltip": "Ricarica automaticamente le Ultime Modifihce ogni $1 secondi",
					"rcm-footer": "Versione $1 ad opera di $2",
					"rcm-optionspanel-hideusersoverride": "data-hideusers sovrascrive questo.",
					"rcm-optionspanel-savewithcookie": "Salvare modifiche con un cookie",
					"rcm-module-diff-title": "Visualizzazione cambiamenti",
					"rcm-module-diff-open": "Apri il confronto delle versioni",
					"rcm-module-diff-undo": "Annulla modifica",
					"rcm-unknownthreadname": "Conversazione",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: {
							",": " ",
							".": ","
						},
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1"],
						digitGroupingPattern: null,
						fallbackLanguages: ["en"]
					}
				},
				ja: {
					"rcm-error-linkformat": "'$1' は表記に誤りがあります。 'http://' や、'/'を含むドメイン名以降の部分を'''含めずに'''指定してください。",
					"rcm-error-loading-syntaxhang": "($2回試しましたが) [$1]の読み込みに失敗しました。（再更新してみるか、）設定を修正してください。",
					"rcm-error-loading-connection": "($2回試しましたが) [$1]の読み込みに失敗しました。接続に失敗した可能性があります。再更新してください。",
					"rcm-error-trymoretimes": "もう$1回お試しください",
					"rcm-loading": "読込・整列中...",
					"rcm-refresh": "更新",
					"rcm-download-timestamp": "$1時点の最近の更新を表示中",
					"rcm-download-changesadded": " - [$1件の最近の更新が追加されました]",
					"rcm-wikisloaded": "対象のWikiaコミュニティ: ",
					"rcm-previouslyloaded": "前回との変更点:",
					"rcm-nonewchanges": "新しい変更はありません",
					"rcm-autorefresh": "自動更新",
					"rcm-autorefresh-tooltip": "$1秒おきに情報を自動更新します",
					"rcm-footer": "Version $1 (編集者は$2)",
					"rcm-optionspanel-hideusersoverride": "data-hideusersの設定によって無効にされています",
					"rcm-optionspanel-savewithcookie": "クッキーに変更を保存する",
					"rcm-module-diff-title": "差分を表示",
					"rcm-module-diff-open": "差分を別のページで表示",
					"rcm-module-diff-undo": "編集を取り消す",
					"rcm-unknownthreadname": "無題",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: null,
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1"],
						digitGroupingPattern: null,
						fallbackLanguages: ["en"]
					}
				},
				nl: {
					"rcm-error-linkformat": "'$1' is een onjuist formaat. Gelieve '''niet''' 'http://' of iets anders na het domein, inclusief de eerste '/' bij te voegen.",
					"rcm-error-loading-syntaxhang": "Fout bij het laden van [$1] ($2 pogingen). Corrigeer de syntax (of ververs het script om opnieuw te proberen).",
					"rcm-error-loading-connection": "Fout bij het laden van [$1] ($2 pogingen). Hoogstwaarschijnlijk een verbindingsprobleem; ververs het script om opnieuw te proberen.",
					"rcm-error-trymoretimes": "Probeer het $1 keer meer",
					"rcm-loading": "Laden/Sorteren...",
					"rcm-refresh": "Verversen",
					"rcm-download-timestamp": "Recente Wijzigingen gedownload van: $1",
					"rcm-download-changesadded": " - [$1 Recente Wijzigingen toegevoegd]",
					"rcm-wikisloaded": "Wiki's geladen: ",
					"rcm-previouslyloaded": "Eerder geladen:",
					"rcm-nonewchanges": "Geen nieuwe wijzigingen",
					"rcm-autorefresh": "Auto Verversen",
					"rcm-autorefresh-tooltip": "Automatisch Recente Wijzigingen elke $1 seconden verversen",
					"rcm-footer": "Versie $1 door $2",
					"rcm-optionspanel-hideusersoverride": "data-hideusers overschrijft dit.",
					"rcm-optionspanel-savewithcookie": "Sla wijzigingen op met een cookie",
					"rcm-module-diff-title": "Toon wijz",
					"rcm-module-diff-open": "Open wijz",
					"rcm-module-diff-undo": "Bewerking ongedaan maken",
					"rcm-unknownthreadname": "draad",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: {
							",": ".",
							".": ","
						},
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1"],
						digitGroupingPattern: null,
						fallbackLanguages: ["en"]
					}
				},
				oc: {
					"rcm-error-linkformat": "'$1' es un format incorrècte. Se vos plai, apondètz pas 'http://' o quicòm darrièr del domeni, en comprenent lo primièr '/'.",
					"rcm-Error-loading-syntaxhang": "Error de carga [$1] ($2 assages). Se vos plai, corregissètz las vòstras sintaxis (o recarga lo vòstre script e ensaja-o un autre còp).",
					"rcm-Error-loading-connection": "Error de carga [$1] ($2 assages). A causa d'un error de connexion, te cal recargar lo tieu script e ensaja-o un autre còp.",
					"rcm-Error-trymoretimes": "Ensaja-o $1 mai de còps",
					"rcm-loading": "En cargant/En classificant…",
					"rcm-refresh": "Actualizacion",
					"rcm-download-timestamp": "Cambiaments recents davalats sus: $1",
					"rcm-download-changesadded": " - [$1 Cambiaments recents apondis]",
					"rcm-wikisloaded": "Wikis cargats: ",
					"rcm-previouslyloaded": "Brèvament cargats:",
					"rcm-nonewchanges": "I a pas de nòus cambiaments",
					"rcm-autorefresh": "Actualizacion automatica",
					"rcm-autorefresh-tooltip": "Recargatz automaticament los cambiaments recents cada $1 segon",
					"rcm-footer": "Version $1 de $2",
					"rcm-optionspanel-hideusersoverride": "data-hideusers overrides this.",
					"rcm-optionspanel-savewithcookie": "Gardatz los cambiaments pel cookie",
					"rcm-module-diff-title": "Visualitzador de pagina",
					"rcm-module-diff-open": "Dobrissètz la pagina",
					"rcm-module-diff-undo": "Desfasètz lo cambiament",
					"rcm-unknownthreadname": "tèma",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: {
							",": " ",
							".": ","
						},
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1"],
						digitGroupingPattern: null,
						fallbackLanguages: ["en"]
					}
				},
				pl: {
					"rcm-error-linkformat": "'$1' to nieodpowiedni format. Proszę nie używać elementu 'http://', niczego po nim oraz pierwszego '/'.",
					"rcm-error-loading-syntaxhang": "Błąd podczas wczytywania [$1] (prób: $2) Proszę poprawić syntax (lub odświeżyć skrypt by spróbować ponownie).",
					"rcm-error-loading-connection": "Błąd podczas wczytywania [$1] (prób: $2). Najprawdopodobniej jest to błąd z połączeniem, odśwież skrypt by spróbować ponownie.",
					"rcm-error-trymoretimes": "Spróbuj $1 razy",
					"rcm-loading": "Ładowanie/Sortowanie...",
					"rcm-refresh": "Odśwież",
					"rcm-download-timestamp": "Ostatnie zmiany pobrane o: $1",
					"rcm-download-changesadded": " - [$1 dodanych ostatnich zmian]",
					"rcm-wikisloaded": "Załadowane wiki: ",
					"rcm-previouslyloaded": "Poprzednio załadowane:",
					"rcm-nonewchanges": "Brak nowych zmian",
					"rcm-autorefresh": "Automatyczne odświeżanie",
					"rcm-autorefresh-tooltip": "Automatyczne odświeżanie ostatnich zmian co każde $1 sekund",
					"rcm-footer": "Wersja $1 stworzona przez $2",
					"rcm-optionspanel-savewithcookie": "Zapisz zmiany w pamięci podręcznej",
					"rcm-module-diff-title": "Podgląd zmian",
					"rcm-module-diff-open": "Pokaż zmiany",
					"rcm-module-diff-undo": "Cofnij zmiany",
					"rcm-unknownthreadname": "wątek",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: {
							",": " ",
							".": ","
						},
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1", "v = 0 and i % 10 = 2..4 and i % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, …", "v = 0 and i != 1 and i % 10 = 0..1 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 12..14 @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …"],
						digitGroupingPattern: null,
						fallbackLanguages: ["en"]
					}
				},
				pt: {
					"rcm-error-linkformat": "'$1' é um formato incorrecto. Por favor, não tens de acrescentar 'http://' ou alguma coisa depois do domínio, incluindo o primeiro '/'.",
					"rcm-error-loading-syntaxhang": "Erro de carregamento [$1] ($2 tentativas). Por favor, corrige as tuas sintaxes (ou recarrega o teu script e tenta novamente).",
					"rcm-error-loading-connection": "Erro de carregamento [$1] ($2 tentativas). Devido a um erro de conexão, tens de recarregar o teu script e tenta novamente.",
					"rcm-error-trymoretimes": "Tenta $1 mais vezes",
					"rcm-loading": "A carregar/A classificar…",
					"rcm-refresh": "Actualização",
					"rcm-download-timestamp": "Mudanças recentes baixadas em: $1",
					"rcm-download-changesadded": " - [$1 Mudanças recentes acrescentadas]",
					"rcm-wikisloaded": "Wikis carregados: ",
					"rcm-previouslyloaded": "Brevemente carregados:",
					"rcm-nonewchanges": "Não há novas mudanças",
					"rcm-autorefresh": "Actualização automática",
					"rcm-autorefresh-tooltip": "Recarregar automaticamente as mudanças recentes a cada $1 segundos",
					"rcm-footer": "Versão $1 de $2",
					"rcm-optionspanel-hideusersoverride": "data-hideusers overrides this.",
					"rcm-optionspanel-savewithcookie": "Guardar mudanças pelo cookie",
					"rcm-module-diff-title": "Visualizador de página",
					"rcm-module-diff-open": "Abrir página",
					"rcm-module-diff-undo": "Desfazer mudança",
					"rcm-unknownthreadname": "tópico",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: {
							",": " ",
							".": ","
						},
						grammarForms: [],
						pluralRules: ["n = 0..2 and n != 2 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000"],
						digitGroupingPattern: null,
						fallbackLanguages: ["pt-br", "en"]
					}
				},
				"pt-br": {
					"rcm-error-linkformat": "'$1' é um formato incorreto. Por favor, não inclua 'http://' ou alguma coisa depois do domínio, incluindo a primeira '/'.",
					"rcm-error-loading-syntaxhang": "Erro de carregamento [$1] ($2 tentativas). Por favor, corrija as suas sintaxes (ou recarregue o seu script para tentar novamente).",
					"rcm-error-loading-connection": "Erro de carregamento [$1] ($2 tentativas). Devido a um erro de conexão,; recarregue o seu script e tente novamente.",
					"rcm-error-trymoretimes": "Tente $1 mais vezes",
					"rcm-loading": "Carregando/Classificando...",
					"rcm-refresh": "Refresh",
					"rcm-download-timestamp": "Mudanças recentes baixadas em: $1",
					"rcm-download-changesadded": " - [$1 Mudanças recentes adicionadas]",
					"rcm-wikisloaded": "Wikias carregadas: ",
					"rcm-previouslyloaded": "Brevemente carregadas:",
					"rcm-nonewchanges": "Não há novas mudanças",
					"rcm-autorefresh": "Auto refresh para atualizar automaticamente",
					"rcm-autorefresh-tooltip": "Recarregar automaticamente as mudanças recentes a cada $1 segundos",
					"rcm-footer": "Versão $1 de $2",
					"rcm-optionspanel-hideusersoverride": "data-hideusers o substitui",
					"rcm-optionspanel-savewithcookie": "Salvar mudanças pelo cookie",
					"rcm-module-diff-title": "Visualizador de página",
					"rcm-module-diff-open": "Abrir página",
					"rcm-module-diff-undo": "Desfazer mudança",
					"rcm-unknownthreadname": "tópico",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: {
							",": " ",
							".": ","
						},
						grammarForms: [],
						pluralRules: ["n = 0..2 and n != 2 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000"],
						digitGroupingPattern: null,
						fallbackLanguages: ["pt", "en"]
					}
				},
				ro: {
					"rcm-eroare-linkformat": "'$1' este un format incorect. Te rog să nu incluzi 'http://' sau oricare lucru după aceea, incluzând primul '/'.",
					"rcm-eroare-loading-syntaxhang": "Eroare încărcând [$1] ($2 încercări). Te rog să corectezi sintaxele (sau reîncărca-ţi script-ul pentru a încerca din nou).",
					"rcm-eroare-loading-connection": "Eroare încărcând [$1] ($2 încercări). Cu siguranţă, este o problemă de conexiune; reîncărca-ţi script-ul pentru a încerca din nou.",
					"rcm-eroare-trymoretimes": "Încearcă-l mai mult de $1 ori",
					"rcm-loading": "Încărcând/Clasificând…",
					"rcm-refresh": "Reîncărcare",
					"rcm-download-timestamp": "Schimburi recente descărcate pe: $1",
					"rcm-download-changesadded": " - [$1 Schimburi recente adăugate]",
					"rcm-wikisloaded": "Wiki-uri încărcate: ",
					"rcm-previouslyloaded": "În prealabil încărcate:",
					"rcm-nonewchanges": "Nu există noi schimburi",
					"rcm-autorefresh": "Actualizare automată",
					"rcm-autorefresh-tooltip": "Reîncărcaţi schimburile recente în mod automat fiecare $1 secunde",
					"rcm-footer": "Versiune $1 de $2",
					"rcm-module-diff-title": "Vizualizatorul paginei",
					"rcm-module-diff-open": "Deschideţi pagina",
					"rcm-module-diff-undo": "Desfaceţi ediţia",
					"rcm-unknownthreadname": "fir",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: {
							",": ".",
							".": ","
						},
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1", "v != 0 or n = 0 or n != 1 and n % 100 = 1..19 @integer 0, 2~16, 101, 1001, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"],
						digitGroupingPattern: null,
						fallbackLanguages: ["en"]
					}
				},
				ru: {
					"rcm-error-linkformat": "'$1' указан в неподходящем формате. Пожалуйста, не используйте элемент 'http://', не вставляйте ничего после него и первого '/'.",
					"rcm-error-loading-syntaxhang": "Ошибка при загрузке [$1] (попыток: $2) Пожалуйста, исправьте синтаксис (или обновите скрипт, чтобы попытаться снова).",
					"rcm-error-loading-connection": "Ошибка при загрузке [$1] (попыток: $2). Скорее всего, это ошибка с подключением, обновите скрипт, чтобы попробовать снова.",
					"rcm-error-trymoretimes": "Попробуйте $1 раз(а)",
					"rcm-loading": "Загрузка/Сортировка...",
					"rcm-refresh": "Обновить",
					"rcm-download-timestamp": "Последние изменения взяты с: $1",
					"rcm-download-changesadded": " - [$1 последних добавленных изменений]",
					"rcm-wikisloaded": "Загруженные вики: ",
					"rcm-previouslyloaded": "Ранее загруженные:",
					"rcm-nonewchanges": "Нет новых изменений",
					"rcm-autorefresh": "Автоматическое обновление",
					"rcm-autorefresh-tooltip": "Автоматическое обновление последних изменений каждые $1 секунд",
					"rcm-footer": "Версия $1, созданная $2",
					"rcm-optionspanel-savewithcookie": "Сохранить изменения в Cookie",
					"rcm-module-diff-title": "Предварительный просмотр изменений",
					"rcm-module-diff-open": "Показать изменения",
					"rcm-module-diff-undo": "Отменить изменения",
					"rcm-unknownthreadname": "тема",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: {
							",": " ",
							".": ","
						},
						grammarForms: [],
						pluralRules: ["v = 0 and i % 10 = 1 and i % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, …", "v = 0 and i % 10 = 2..4 and i % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, …", "v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14 @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …"],
						digitGroupingPattern: null,
						fallbackLanguages: ["en"]
					}
				},
				uk: {
					"rcm-error-linkformat": "'$1' вказаний в невідповідному форматі. Будь ласка, не використовуйте елемент 'http://', не вставляйте нічого після нього і першого '/'.",
					"rcm-error-loading-syntaxhang": "Помилка при завантаженні [$1] (спроб: $2) Будь ласка, виправте синтаксис (або поновіть скрипт, щоб спробувати знову).",
					"rcm-error-loading-connection": "Помилка при завантаженні [$1] (спроб: $2). Швидше за все, це помилка з підключенням, поновіть скрипт, щоб спробувати знову.",
					"rcm-error-trymoretimes": "Спробуйте $1 раз(а)",
					"rcm-loading": "Завантаження/Сортування...",
					"rcm-refresh": "Оновити",
					"rcm-download-timestamp": "Останні зміни взяті з: $1",
					"rcm-download-changesadded": " - [$1 останніх доданих змін]",
					"rcm-wikisloaded": "Завантажені вікі: ",
					"rcm-previouslyloaded": "Раніше завантажені:",
					"rcm-nonewchanges": "Немає нових змін",
					"rcm-autorefresh": "Автоматичне оновлення",
					"rcm-autorefresh-tooltip": "Автоматичне оновлення останніх змін кожні $1 секунд",
					"rcm-footer": "Версія $1, що створена $2",
					"rcm-optionspanel-savewithcookie": "Зберегти зміни в Cookie",
					"rcm-module-diff-title": "Попередній перегляд змін",
					"rcm-module-diff-open": "Показати зміни",
					"rcm-module-diff-undo": "Скасувати зміни",
					"rcm-unknownthreadname": "тема",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: {
							",": " ",
							".": ","
						},
						grammarForms: {
							genitive: {
								"Вікіпедія": "Вікіпедії",
								"Вікісловник": "Вікісловника",
								"Вікісховище": "Вікісховища",
								"Вікіпідручник": "Вікіпідручника",
								"Вікіцитати": "Вікіцитат",
								"Вікіджерела": "Вікіджерел",
								"Вікіновини": "Вікіновин",
								"Вікідані": "Вікіданих",
								"Вікімандри": "Вікімандрів"
							},
							dative: {
								"Вікіпедія": "Вікіпедії",
								"Вікісловник": "Вікісловнику",
								"Вікісховище": "Вікісховищу",
								"Вікіпідручник": "Вікіпідручнику",
								"Вікіцитати": "Вікіцитатам",
								"Вікіджерела": "Вікіджерелам",
								"Вікіновини": "Вікіновинам",
								"Вікідані": "Вікіданим",
								"Вікімандри": "Вікімандрам"
							},
							accusative: {
								"Вікіпедія": "Вікіпедію",
								"Вікісловник": "Вікісловник",
								"Вікісховище": "Вікісховище",
								"Вікіпідручник": "Вікіпідручник",
								"Вікіцитати": "Вікіцитати",
								"Вікіджерела": "Вікіджерела",
								"Вікіновини": "Вікіновини",
								"Вікідані": "Вікідані",
								"Вікімандри": "Вікімандри"
							},
							instrumental: {
								"Вікіпедія": "Вікіпедією",
								"Вікісловник": "Вікісловником",
								"Вікісховище": "Вікісховищем",
								"Вікіпідручник": "Вікіпідручником",
								"Вікіцитати": "Вікіцитатами",
								"Вікіджерела": "Вікіджерелами",
								"Вікіновини": "Вікіновинами",
								"Вікідані": "Вікіданими",
								"Вікімандри": "Вікімандрами"
							},
							locative: {
								"Вікіпедія": "у Вікіпедії",
								"Вікісловник": "у Вікісловнику",
								"Вікісховище": "у Вікісховищі",
								"Вікіпідручник": "у Вікіпідручнику",
								"Вікіцитати": "у Вікіцитатах",
								"Вікіджерела": "у Вікіджерелах",
								"Вікіновини": "у Вікіновинах",
								"Вікідані": "у Вікіданих",
								"Вікімандри": "у Вікімандрах"
							},
							vocative: {
								"Вікіпедія": "Вікіпедіє",
								"Вікісловник": "Вікісловнику",
								"Вікісховище": "Вікісховище",
								"Вікіпідручник": "Вікіпідручнику",
								"Вікіцитати": "Вікіцитати",
								"Вікіджерела": "Вікіджерела",
								"Вікіновини": "Вікіновини",
								"Вікідані": "Вікідані",
								"Вікімандри": "Вікімандри"
							}
						},
						pluralRules: ["v = 0 and i % 10 = 1 and i % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, …", "v = 0 and i % 10 = 2..4 and i % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, …", "v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14 @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …"],
						digitGroupingPattern: null,
						fallbackLanguages: ["ru", "en"]
					}
				},
				val: {
					"rcm-error-linkformat": "'$1' és un format incorrecte. Per favor, no afiggues 'http://' o alguna cosa darrere del domini, incloent el primer '/'.",
					"rcm-error-loading-syntaxhang": "Error de càrrega [$1] ($2 intents). Per favor, corrig les tues sintaxis (o recarrega la tua script i intenta-ho un atre colp).",
					"rcm-error-loading-connection": "Error de càrrega [$1] ($2 intents). Per un error de conexió, tens que recarregar la tua script i intenta-ho un atre colp.",
					"rcm-error-trymoretimes": "Intenta-ho $1 més voltes",
					"rcm-loading": "Carregant/Classificant…",
					"rcm-refresh": "Actualisació",
					"rcm-download-timestamp": "Canvis recents baixats a: ",
					"rcm-download-changesadded": " - [$1 Canvis recents afegits]",
					"rcm-wikisloaded": "Wikis carregats: ",
					"rcm-previouslyloaded": "Breument carregats:",
					"rcm-nonewchanges": "No hi ha nous canvis",
					"rcm-autorefresh": "Actualisació automàtica",
					"rcm-autorefresh-tooltip": "Recarregar automàticament els canvis recents cada $1 segons",
					"rcm-footer": "Versió $1 de $2",
					"rcm-optionspanel-hideusersoverride": "data-hideusers overrides this.",
					"rcm-optionspanel-savewithcookie": "Guardar els canvis pel cookie",
					"rcm-module-diff-title": "Visualisador de pàgina",
					"rcm-module-diff-open": "Obrir la pàgina",
					"rcm-module-diff-undo": "Desfer el canvi",
					"rcm-unknownthreadname": "tema",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: null,
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1"],
						digitGroupingPattern: null,
						fallbackLanguages: ["en"]
					}
				},
				vi: {
					"rcm-error-linkformat": "'$1' không đúng định dạng. Xin đừng '''thêm''' 'http://' hay bất cứ ký tự gì trước tên miền trang, bao gồm dấu gạch chéo '/'.",
					"rcm-error-loading-syntaxhang": "Lỗi tải [$1] ($2 lần thử). Hãy sửa lại đúng cú pháp (hoặc làm mới lại trang để thử lại.).",
					"rcm-error-loading-connection": "Lỗi tải [$1] ($2 lần thử). Khả năng lớn đây là lỗi kết nối; làm mới lại trang để thử lại.",
					"rcm-error-trymoretimes": "Thử thêm $1 lần nữa",
					"rcm-loading": "Đang Tải/Đang Sắp Xếp...",
					"rcm-refresh": "Làm mới",
					"rcm-download-timestamp": "Thay Đổi Gần Đây đã được tải vào: $1",
					"rcm-download-changesadded": " - [$1 Thay Đổi Gần Đây đã được thêm vào]",
					"rcm-wikisloaded": "Các Wiki đã tải: ",
					"rcm-previouslyloaded": "Đã tải trước đó:",
					"rcm-nonewchanges": "Không có thay đổi nào mới",
					"rcm-autorefresh": "Tự Động Làm Mới",
					"rcm-autorefresh-tooltip": "Tự động làm mới trang Thay Đổi Gần Đây sau mỗi $1 giây",
					"rcm-footer": "Phiên bản $1 bởi $2",
					"rcm-optionspanel-hideusersoverride": "data-hideusers đã loại trừ điều này.",
					"rcm-optionspanel-savewithcookie": "Lưu lại thiết đặt bằng cookie",
					"rcm-module-diff-title": "Trình Xem Thay Đổi",
					"rcm-module-diff-open": "Mở xem khác",
					"rcm-module-diff-undo": "Lùi sửa",
					"rcm-unknownthreadname": "luồng",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: {
							",": ".",
							".": ","
						},
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1"],
						digitGroupingPattern: null,
						fallbackLanguages: ["en"]
					}
				},
				zh: {
					"rcm-error-linkformat": "「$1」为错误格式。请'''不要'''在网域后加入「http://」或任何文字，包括第一个「/」字符。",
					"rcm-error-loading-syntaxhang": "读取[$1]时发生错误（$2次尝试）。请更正语法（或刷新语法后再试一次）。",
					"rcm-error-loading-connection": "读取[$1]时发生错误（$2次尝试）。极可能为联机问题。请刷新语法后再试一次。",
					"rcm-error-trymoretimes": "请再试$1次",
					"rcm-loading": "正在载入／整理中......",
					"rcm-refresh": "刷新",
					"rcm-download-timestamp": "最近更改于$1载入",
					"rcm-download-changesadded": " - [已添加$1个最近更改内容]",
					"rcm-wikisloaded": "已载入的维基：",
					"rcm-previouslyloaded": "之前已加载：",
					"rcm-nonewchanges": "无新更动",
					"rcm-autorefresh": "自动刷新",
					"rcm-autorefresh-tooltip": "每隔$1秒自动更新最近更改",
					"rcm-footer": "由$2编辑的版本$1",
					"rcm-optionspanel-hideusersoverride": "以data-hideusers覆盖原有设定。",
					"rcm-optionspanel-savewithcookie": "使用cookie储存变动",
					"rcm-module-diff-title": "差异查看器",
					"rcm-module-diff-open": "开启差异",
					"rcm-module-diff-undo": "复原编辑",
					"rcm-unknownthreadname": "话题",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: null,
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1"],
						digitGroupingPattern: null,
						fallbackLanguages: ["zh-hans", "en"]
					}
				},
				"zh-hant": {
					"rcm-error-linkformat": "「$1」為錯誤格式。請'''不要'''在網域後加入「http://」或任何文字，包括第一個「/」字元。",
					"rcm-error-loading-syntaxhang": "讀取[$1]時發生錯誤（$2 次嘗試）。請更正語法（或重新載入語法後再試一次）。",
					"rcm-error-loading-connection": "讀取[$1]時發生錯誤（$2 次嘗試）。極可能為連線問題。請重新載入語法後再試一次。",
					"rcm-error-trymoretimes": "請再試$1次",
					"rcm-loading": "正在載入／整理中......",
					"rcm-refresh": "重新整理",
					"rcm-download-timestamp": "近期變動於$1載入",
					"rcm-download-changesadded": " - [已新增$1個近期變動內容]",
					"rcm-wikisloaded": "已載入的維基：",
					"rcm-previouslyloaded": "之前已載入：",
					"rcm-nonewchanges": "無新變更",
					"rcm-autorefresh": "自動重整",
					"rcm-autorefresh-tooltip": "每隔$1秒自動更新近期變動",
					"rcm-footer": "由$2編輯的版本$1",
					"rcm-optionspanel-hideusersoverride": "以data-hideusers覆蓋原有設定。",
					"rcm-optionspanel-savewithcookie": "使用cookie儲存變動",
					"rcm-module-diff-title": "差異檢視器",
					"rcm-module-diff-open": "開啟差異",
					"rcm-module-diff-undo": "復原編輯",
					"rcm-unknownthreadname": "討論串",
					mwLanguageData: {
						digitTransformTable: null,
						separatorTransformTable: null,
						grammarForms: [],
						pluralRules: ["i = 1 and v = 0 @integer 1"],
						digitGroupingPattern: null,
						fallbackLanguages: ["zh-hans", "en"]
					}
				}
			}, s.MESSAGES = {
				talkpagelinktext: "Talk",
				cur: "cur",
				last: "prev",
				"recentchanges-legend": "Recent changes options",
				rclinks: "Show last $1 changes in last $2 days<br />$3",
				rcshowhideminor: "$1 minor edits",
				rcshowhidebots: "$1 bots",
				rcshowhideliu: "$1 logged-in users",
				rcshowhideanons: "$1 anonymous users",
				rcshowhidemine: "$1 my edits",
				rcshowhideenhanced: "$1 grouped recent changes",
				rcshowhidelogs: "$1 logs",
				diff: "diff",
				hist: "hist",
				hide: "Hide",
				show: "Show",
				minoreditletter: "m",
				newpageletter: "N",
				boteditletter: "b",
				unpatrolledletter: "!",
				blocklink: "block",
				contribslink: "contribs",
				nchanges: "$1 {{PLURAL:$1|change|changes}}",
				rollbacklink: "rollback",
				"recentchanges-label-newpage": "This edit created a new page",
				"recentchanges-label-minor": "This is a minor edit",
				"recentchanges-label-bot": "This edit was performed by a bot",
				"recentchanges-label-unpatrolled": "This edit has not yet been patrolled",
				"rc-enhanced-expand": "Show details (requires JavaScript)",
				"rc-enhanced-hide": "Hide details",
				"semicolon-separator": ";&#32;",
				"pipe-separator": "&#32;|&#32;",
				parentheses: "($1)",
				"rev-deleted-comment": "(edit summary removed)",
				"rev-deleted-user": "(username removed)",
				"rev-deleted-event": "(log action removed)",
				"article-comments-rc-comment": 'Article comment (<span class="plainlinks">[$1 $2]</span>)',
				"article-comments-rc-comments": "Article comments ([[$1]])",
				and: "&#32;and",
				recentchanges: "Recent changes",
				newpages: "New pages",
				newimages: "New photos",
				log: "Logs",
				insights: "Insights",
				randompage: "Random page",
				"group-sysop": "Administrators",
				"group-user": "Users",
				"prefs-files": "Files",
				"awc-metrics-articles": "Articles",
				"awc-metrics-edits": "Edits",
				"filedelete-success": "'''$1''' has been deleted.",
				shared_help_was_redirect: "This page is a redirect to $1",
				"specialvideos-btn-load-more": "Load More",
				"flags-edit-modal-close-button-text": "Close",
				"awc-metrics-images": "Images",
				"wikifeatures-promotion-new": "New",
				"wikiacuratedcontent-content-empty-section": "This section needs some items",
				"myhome-feed-edited-by": "edited by $1",
				"edit-summary": "Edit summary",
				"wikiaPhotoGallery-conflict-view": "View the current page",
				"app-loading": "Loading...",
				"wikia-hubs-remove": "Remove",
				revisionasof: "Revision as of $1",
				editold: "edit",
				editundo: "undo",
				blocklogpage: "Block log",
				dellogpage: "Deletion log",
				importlogpage: "Import log",
				mergelog: "Merge log",
				movelogpage: "Move log",
				protectlogpage: "Protection log",
				uploadlogpage: "Upload log",
				newuserlogpage: "User creation log",
				rightslog: "User rights log",
				"useravatar-log": "User avatar log",
				"userrenametool-logpage": "User rename log",
				"wikifeatures-log-name": "Wiki Features log",
				"chat-chatban-log": "Chat ban log",
				"wikia-interactive-maps-log-name": "Maps log",
				"abusefilter-log": "Abuse filter log",
				blocklogentry: "blocked [[$1]] with an expiry time of $2 $3",
				"reblock-logentry": "changed block settings for [[$1]] with an expiry time of $2 $3",
				unblocklogentry: "unblocked $1",
				"block-log-flags-anononly": "anonymous users only",
				"block-log-flags-nocreate": "account creation disabled",
				"block-log-flags-noautoblock": "autoblock disabled",
				"block-log-flags-noemail": "e-mail blocked",
				"block-log-flags-nousertalk": "cannot edit own talk page",
				"block-log-flags-angry-autoblock": "enhanced autoblock enabled",
				"block-log-flags-hiddenname": "username hidden",
				"logentry-delete-delete": "$1 deleted page $3",
				"logentry-delete-restore": "$1 restored page $3",
				"logentry-delete-event": "$1 changed visibility of {{PLURAL:$5|a log event|$5 log events}} on $3: $4",
				"logentry-delete-revision": "$1 changed visibility of {{PLURAL:$5|a revision|$5 revisions}} on page $3: $4",
				"logentry-delete-event-legacy": "$1 changed visibility of log events on $3",
				"logentry-delete-revision-legacy": "$1 changed visibility of revisions on page $3",
				"revdelete-content-hid": "content hidden",
				"revdelete-summary-hid": "edit summary hidden",
				"import-logentry-upload": "imported [[$1]] by file upload",
				"import-logentry-interwiki": "transwikied $1",
				"pagemerge-logentry": "merged [[$1]] into [[$2]] (revisions up to $3)",
				"logentry-move-move": "$1 moved page $3 to $4",
				"logentry-move-move-noredirect": "$1 moved page $3 to $4 without leaving a redirect",
				"logentry-move-move_redir": "$1 moved page $3 to $4 over redirect",
				"logentry-move-move_redir-noredirect": "$1 moved page $3 to $4 over a redirect without leaving a redirect",
				protectedarticle: 'protected "[[$1]]"',
				modifiedarticleprotection: 'changed protection level for "[[$1]]"',
				unprotectedarticle: 'removed protection from "[[$1]]"',
				movedarticleprotection: 'moved protection settings from "[[$2]]" to "[[$1]]"',
				uploadedimage: 'uploaded "[[$1]]"',
				overwroteimage: 'uploaded a new version of "[[$1]]"',
				"logentry-newusers-newusers": "$1 created a user account",
				"logentry-newusers-create": "$1 created a user account",
				"logentry-newusers-create2": "$1 created a user account $3",
				"logentry-newusers-autocreate": "Account $1 was created automatically",
				rightslogentry: "changed group membership for $1 from $2 to $3",
				"rightslogentry-autopromote": "was automatically promoted from $2 to $3",
				rightsnone: "(none)",
				"blog-avatar-changed-log": "Added or changed avatar",
				"blog-avatar-removed-log": "Removed $1's avatars",
				"userrenametool-success": 'The user "$1" has been renamed to "$2".',
				"chat-chatbanadd-log-entry": "banned $1 from chat with an expiry time of $2, ends $3",
				"chat-chatbanremove-log-entry": "unbanned $1 from chat",
				"chat-chatbanchange-log-entry": "changed ban settings for $1 with an expiry time of $2, ends $3",
				"logentry-maps-create_map": "$1 created new map $3",
				"logentry-maps-update_map": "$1 updated map $3",
				"logentry-maps-delete_map": "$1 deleted map $3",
				"logentry-maps-undelete_map": "$1 restored map $3",
				"logentry-maps-create_pin_type": "$1 created new pin category for $3",
				"logentry-maps-update_pin_type": "$1 updated pin category for $3",
				"logentry-maps-delete_pin_type": "$1 deleted pin category for $3",
				"logentry-maps-create_pin": "$1 created new pin for $3",
				"logentry-maps-update_pin": "$1 updated pin for $3",
				"logentry-maps-delete_pin": "$1 deleted pin for $3",
				"abusefilter-log-entry-modify": "modified $1 ($2)",
				"abusefilter-log-detailslink": "details",
				"wall-recentchanges-edit": "edited message",
				"wall-recentchanges-removed-thread": 'removed thread "[[$1|$2]]" from [[$3|$4\'s wall]]',
				"wall-recentchanges-removed-reply": 'removed reply from "[[$1|$2]]" from [[$3|$4\'s wall]]',
				"wall-recentchanges-restored-thread": 'restored thread "[[$1|$2]]" to [[$3|$4\'s wall]]',
				"wall-recentchanges-restored-reply": 'restored reply on "[[$1|$2]]" to [[$3|$4\'s wall]]',
				"wall-recentchanges-deleted-thread": 'deleted thread "[[$1|$2]]" from [[$3|$4\'s wall]]',
				"wall-recentchanges-deleted-reply": 'deleted reply from "[[$1|$2]]" from [[$3|$4\'s wall]]',
				"wall-recentchanges-closed-thread": 'closed thread "[[$1|$2]]" on [[$3|$4\'s wall]]',
				"wall-recentchanges-reopened-thread": 'reopened thread "[[$1|$2]]" on [[$3|$4\'s wall]]',
				"wall-recentchanges-thread-group": "$1 on [[$2|$3's wall]]",
				"wall-recentchanges-history-link": "wall history",
				"wall-recentchanges-thread-history-link": "thread history",
				"forum-recentchanges-edit": "edited message",
				"forum-recentchanges-removed-thread": 'removed thread "[[$1|$2]]" from the [[$3|$4 Board]]',
				"forum-recentchanges-removed-reply": 'removed reply from "[[$1|$2]]" from the [[$3|$4 Board]]',
				"forum-recentchanges-restored-thread": 'restored thread "[[$1|$2]]" to the [[$3|$4 Board]]',
				"forum-recentchanges-restored-reply": 'restored reply on "[[$1|$2]]" to the [[$3|$4 Board]]',
				"forum-recentchanges-deleted-thread": 'deleted thread "[[$1|$2]]" from the [[$3|$4 Board]]',
				"forum-recentchanges-deleted-reply": 'deleted reply from "[[$1|$2]]" from the [[$3|$4 Board]]',
				"forum-recentchanges-thread-group": "$1 on the [[$2|$3 Board]]",
				"forum-recentchanges-history-link": "board history",
				"forum-recentchanges-thread-history-link": "thread history",
				"forum-recentchanges-closed-thread": 'closed thread "[[$1|$2]]" from [[$3|$4]]',
				"forum-recentchanges-reopened-thread": 'reopened thread "[[$1|$2]]" from [[$3|$4]]',
				discussions: "Discussions",
				"forum-related-discussion-heading": "Discussions about $1",
				"embeddable-discussions-loading": "Loading Discussions..."
			}, s.wiki2html = function(e) {
				for(var t = [], i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
				return void 0 == e ? (n.log("ERROR: [RecentChangesMultiple] i18n.wiki2html was passed an undefined string"), e) : e.replace(/'''(.*?)'''/g, function(e, t) {
					return "<strong>" + t + "</strong>"
				}).replace(/''(.*?)''/g, function(e, t) {
					return "<em>" + t + "</em>"
				}).replace(/[^\[](http[^\[\s]*)/g, function(e, t) {
					return '<a href="' + t + '">' + t + "</a>"
				}).replace(/\$(\d+)/g, function(e, i) {
					return void 0 !== t[i - 1] ? t[i - 1] : e
				}).replace(/\[\[(.*?)\]\]/g, function(e, t) {
					var i = t.split(/\|/),
						a = i.shift();
					return '<a href="' + a + '">' + (i.length ? i.join("|") : a) + "</a>"
				}).replace(/[\[](http:\/\/.*|\/\/.*)[!\]]/g, function(e, t) {
					var i = t.replace(/[\[\]]/g, "").split(/ /),
						a = i.shift();
					return '<a href="' + a + '">' + (i.length ? i.join(" ") : a) + "</a>"
				}).replace(/{{GENDER:(.*?)}}/g, function(e, t) {
					var i = t.split("|");
					i.shift();
					return n.language.gender(a.default.userOptions.gender, i)
				}).replace(/{{PLURAL:(.*?)}}/g, function(e, t) {
					var i = t.split("|"),
						a = i.shift();
					return n.language.convertPlural(a, i)
				}).replace(/{{GRAMMAR:(.*?)}}/g, function(e, t) {
					var i = t.split("|");
					return n.language.convertGrammar(i[1], i[0])
				})
			}, Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = s
		}, {
			"./ConstantsApp": 1
		}],
		14: [function(e, t, i) {
			"use strict";
			var a = e("./Main"),
				r = (window.dev = window.dev || {}).RecentChangesMultiple = window.dev.RecentChangesMultiple || {};
			void 0 == document.querySelectorAll(".rc-content-multiple, #rc-content-multiple")[0] ? console.log("RecentChangesMultiple tried to run despite no data. Exiting.") : (a.default.init(r), window.dev.RecentChangesMultiple.app = a.default)
		}, {
			"./Main": 2
		}]
	}, {}, [14]),
	function(e, t, i, a) {
		if(8 === wgNamespaceNumber) {
			if(void 0 == t.querySelectorAll(".rc-content-multiple, #rc-content-multiple")[0]) return void console.log('[RecentChangesMultiple] Nie znaleziono istniejącego kontenera "rc-content-multiple".');
			if(a.loaded) return void console.log("[RecentChangesMultiple] Skrypt został już załadowany.");
			a.loaded = !0
		}
	}(window.jQuery, document, window.mediaWiki, (window.dev = window.dev || {}).RecentChangesMultiple = dev.RecentChangesMultiple || {})
}
addOnloadHook(RCM);