/* Any JavaScript here will be loaded for all users on every page load. */

/* ====================================================================== *\
	# friendly greeting
\* ====================================================================== */

console.log("%cwhat up champ \u0028\u0020\u0361\u00b0\u0020\u035c\u0296\u0020\u0361\u00b0\u0029 lookin' for something? we hope you're having a good time \u0028\u0020\u0361\u007e\u0020\u035c\u0296\u0020\u0361\u00b0\u0029", "font-family: arial, calibri, sans, sans-serif;");




/* ====================================================================== *\
	# [[Template:USERNAME]]
	# from Bloons wiki [[w:c:bloons]]
\* ====================================================================== */

$(function() {
	if (
		typeof wgUserName != 'undefined' && // user is logged in
		[1201,2001].indexOf(mw.config.get("wgNamespaceNumber")) === -1 // namespace != forum thread of board thread, due to template abuse
	) {
		$('.insertusername').html(wgUserName);
	}
});


/* ====================================================================== *\
	# hoverimage
\* ====================================================================== */

$(function() {
	$('div.fadein img').css('opacity','0.7');
	$('div.fadein img').mouseover(function() {
		$(this).animate({opacity:1},800);
	}).mouseout(function() {
		$(this).animate({opacity:0.7},800);
	});
});


/* ====================================================================== *\
	# hide toc for [[template:hidetoc]]
\* ====================================================================== */

if ($(".hidetoc").length > 0) {
	$(document).ready(function() {
		$("#toc .toctogglelabel").click();
	});
}


/* ====================================================================== *\
	# [[Template:No license]] when no license is specified
\* ====================================================================== */

$(document).on("submit", function(e) {
	if (e.target.id == "mw-upload-form" || e.target.action == "https://clubpenguin.wikia.com/wikia.php?controller=UploadPhotos&method=Upload&format=html") {
		$(e.target).find('[name="wpLicense"] [value=""]:not([disabled])').attr("value", "No license");
	}
});


/* ====================================================================== *\
	# chat log search - using google search
\* ====================================================================== */

$(function() {
	if (mw.config.get("wgPageName") == "Club_Penguin_Wiki:Chat/Logs") {
		// markup
		// affects <div id="chat-search" style="text-align: center;"></div>
		$("#chat-search").html(
			'<input type="text" placeholder="Search chat logs" id="chatlogs-search-box" style="width: 148px;" />' +
			'&nbsp;' +
			'<a id="chatlogs-search-button" class="wikia-button" style="padding: 1px 4px 0px 4px;">GO</a>'
		);

		function googleSearch() {
			if ($("input#chatlogs-search-box").val().length > 0) {
				var google = "https://www.google.com/#q=site:",
					site = encodeURIComponent("https://clubpenguin.wikia.com/wiki/Club_Penguin_Wiki:Chat/Logs/"),
					string = encodeURIComponent($("input#chatlogs-search-box").val().replace(/ /g, "+")),
					searchPage = google + site + "+" + string;
				open(searchPage, "_blank");
			}
		}

		// when link is pressed
		$("a#chatlogs-search-button").click(function() {
			googleSearch();
		});

		// when enter is pressed (on the text box)
		$("input#chatlogs-search-box").on("keypress", function(e) {
			if (e.keyCode == 13) {
				// if enter is pressed
				// e.preventDefault();
				googleSearch();
			}
		});
	}
});


/* ====================================================================== *\
	# use the api to list the chat logs
	# will not affect subpages of [[Club Penguin Wiki:Chat/Logs/misc]] (misc can begin with M)
\* ====================================================================== */

// will affect <span class="ChatLogsList"></span> in subpages of [[Club Penguin Wiki:Chat]]
$(function() {
	if (mw.config.get("wgPageName").indexOf("Club_Penguin_Wiki:Chat/") == 0) {
		/* add css */
		mw.util.addCSS(
			'span.ChatLogsList {\n' +
				'\tdisplay: none;\n' +
			'}\n' +
			'div.ChatLogsList {\n' +
				'\twidth: 400px;\n' +
				'\theight: 230px;\n' +
				'\tmargin: 10px auto 5px auto;\n' +
				'\tpadding: 0px;\n' +
				'\tbackground: #fafafa;\n' +
				'\tborder: 1px solid #cccccc;\n' +
			'}\n' +
			'div.ChatLogsList > div {\n' +
				'\tbackground: #cccce8;\n' +
				'\ttext-align: center;\n' +
				'\tfont-size: 14px;\n' +
				'\tline-height: 22px;\n' +
				'\tfont-weight: bold;\n' +
			'}\n' +
			'div.ChatLogsList > ul {\n' +
				'\tlist-style: none;\n' +
				'\toverflow-y: scroll;\n' +
				'\theight: 200px;\n' +
				'\tmargin: 2px;\n' +
				'\tpadding: 2px;\n' +
			'}'
		);

		/* data storage */
		var obj = {
			data: {},
			fn: {}
		};
		obj.data.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		obj.data.pagelist = []; // responses from json will be listed here

		/* functions */
		// load json
		obj.fn.loadJSON = function(apfrom, cb) {
			$.getJSON("/api.php?action=query&format=json&list=allpages&apnamespace=4&rawcontinue&apprefix=Chat/Logs/&apfrom=" + encodeURIComponent(apfrom) + "&aplimit=max&cb=" + new Date().getTime(), function(data) {
				cb(data.query.allpages, data["query-continue"]);
			});
		}

		// process all json data
		obj.fn.processJSONData = function() {
			var a = obj.data.pagelist,
				b = [],
				months = obj.data.months;
			for (var i = 0; i < a.length; i++) {
				if (a[i].title.search(/Club Penguin Wiki\:Chat\/Logs\/[Mm]isc\//) == -1) {
					var t = a[i].title.split("/Logs/")[1].split(" ");
					b.push(t[2] + "-" + (String(months.indexOf(t[1])).length == 1 ? "0" + months.indexOf(t[1]) : months.indexOf(t[1])) + "-" + t[0]);
					if (i + 1 == a.length) {
						var c = b.sort().reverse(), // sort() to sort by dates, reverse() to change it direction so it sorted by recent dates
							d = [];
						for (var j = 0; j < c.length; j++) {
							var t = c[j].split("-"),
								u = months[Number(t[1])] + ' ' + t[2] + ', ' + t[0];
							d.push(
								'<li>' +
								'<a href="/wiki/Club_Penguin_Wiki:Chat/Logs/' +
								t[2] + '_' + months[Number(t[1])] + '_' + t[0] +
								'" title="Chat logs for ' +
								u +
								'">' +
								u +
								'</a>' +
								'</li>'
							);
							if (j + 1 == c.length) {
								$("span.ChatLogsList").replaceWith('<div class="ChatLogsList">\n<div>Chat logs</div>\n<ul>\n' + d.join('\n') + '\n</ul></div>');
							}
						}
					}
				}
			}
		}

		// initiate
		obj.fn.init = function(apfrom) {
			obj.fn.loadJSON(apfrom, function(allpages, queryContinue) {
				// add pages returned from the request to the main list
				obj.data.pagelist = obj.data.pagelist.concat(allpages);
				// check if there are more requests that need to be done
				if (queryContinue) {
					// more requests needed
					obj.fn.init(queryContinue.allpages.apcontinue);
				} else {
					// all done
					obj.fn.processJSONData();
				}
			});
		}

		/* implement */
		obj.fn.init("");
	}
});


/* ====================================================================== *\
	# DynamicImages settings
\* ====================================================================== */

window.dev = window.dev || {};
window.dev.DynamicImages = {
	svgIncreaseSrc: 2.3
}


/* ====================================================================== *\
	# LockOldBlogs settings
\* ====================================================================== */

window.LockOldBlogs = {
    expiryDays: 180
};


/* ====================================================================== *\
	# importArticles - import codes from other wiki pages
	# before adding, it's recommended to move the pages to a subpage of
	  Common.js
	# also, make sure that you separate each page from the
	  array with a comma (,)
\* ====================================================================== */

importArticles({
	type: "script",
	articles: [
		"u:dev:AjaxRC/code.js",
		"u:dev:DisplayTimer/code.js",
		"u:zh.pad:MediaWiki:CountDown.js",
		"u:dev:DupImageList/code.js",
		"u:dev:LockOldBlogs/code.js",
		"MediaWiki:Common.js/chatLogView.js",
		"MediaWiki:Common.js/plok.js",
		mw.config.get("wgPageName") == "Club_Penguin_Island/Music" ? "MediaWiki:Common.js/cpi-music.js" : ""
	]
}, {
	type: "style",
	articles: [
		"u:zh.pad.wikia.com:MediaWiki:CountDown.css"
	]
});


/* ====================================================================== *\
	# add to [[Template:Expansion]] a link to the incompleted section
\* ====================================================================== */

$("#mw-content-text").find(".mw-headline").each(function(i) {
	var node = $(this).parent().next(),
		a = $('<a />');
	if ($(node).hasClass("section-stub")) {
		$(a).attr("href", "/wiki/" + encodeURIComponent(mw.config.get("wgPageName")) + "?action=edit&section=" + (i + 1)).text("expanding it");
		$(node).find(".expand").replaceWith(a);
	}
});



/* ====================================================================== *\
	# music templates
\* ====================================================================== */

window.wikiMusic = (function() {
	var fn = {},
		noRequestsWaiting = true;

	/* functions */
	// add music
	fn.addMusic = function(node, data) {
		if (!document.querySelector("nav#wiki-music") && data.src) {
			// there is no existing interface already
			var nav = fn.createInterface(),
				audio = nav.querySelector("audio"),
				btn = nav.querySelector("img");
			audio.autoplay = true;
			audio.loop = true;
			audio.src = data.src;
			btn.src = "https\x3a//upload.wikimedia.org/wikipedia/commons/thumb/7/71/Media-playback-pause.svg/28px-Media-playback-pause.svg.png";
			btn.title = "Click to pause/unpause the music. Double-click to restart.";
			btn.addEventListener("click", function() {
				// audio[audio.paused ? "play" : "pause"]();
				if (audio.paused) {
					audio.play();
					btn.src = "https\x3a//upload.wikimedia.org/wikipedia/commons/thumb/7/71/Media-playback-pause.svg/28px-Media-playback-pause.svg.png";
				} else {
					audio.pause();
					btn.src = "https\x3a//upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Media-playback-start.svg/24px-Media-playback-start.svg.png";
				}
			});
			btn.addEventListener("dblclick", function() {
				// double click - restart
				btn.src = "https\x3a//upload.wikimedia.org/wikipedia/commons/thumb/7/71/Media-playback-pause.svg/28px-Media-playback-pause.svg.png";
				audio.currentTime = 0;
				audio.play();
			});
			document.body.appendChild(nav);
			if (!node.classList.contains("wiki-music-debug")) {
				node.parentNode.removeChild(node);
			}
		} else if (!data.src) {
			fn.getMusicSrc(data.name, function(src) {
				data.src = src;
				fn.addMusic(node, data);
			});
		}
	}

	// get music src
	fn.getMusicSrc = function(name, cb) {
		var a = new XMLHttpRequest();
		a.open("GET", "/api.php?action=query&format=json&prop=imageinfo&iiprop=mime|metadata|url&titles=" + encodeURIComponent("File:" + name), true);
		a.addEventListener("load", function() {
			var b = JSON.parse(a.responseText),
				c = b.query.pages,
				d;
			try {
				for (var pageid in c) {
					if (Number(pageid) < 0) {
						// page exists
						break;
					}
					d = c[pageid].imageinfo[0];
					if (d.mime == "application/ogg") {
						noRequestsWaiting = true;
						cb(d.url);
						break;
					}
				}
			} catch(err) {}
		});
		if (noRequestsWaiting) {
			// send only if no music already exists, to prevent multi-sending many requests if exist on a single page
			noRequestsWaiting = false;
			a.send();
		}
	}

	// create interface
	fn.createInterface = function() {
		var nav = document.createElement("nav"),
			audio = document.createElement("audio"),
			btn = new Image();
		nav.id = "wiki-music";
		audio.id = "wiki-music-src";
		btn.id = "wiki-music-btn";
		nav.appendChild(audio);
		nav.appendChild(btn);
		return nav;
	}

	/* check node validity */
	fn.checkNode = function(node) {
		var type = node.getAttribute("data-music-type"),
			name = node.getAttribute("data-music-name"),
			isValid = false;
		switch(type) {
			case "file":
				try {
					if (!name.match(/[^A-Za-z0-9 \(\)\+\-\*\=\!\?\.\,\;\:'"\$&\u0080-\uFFFF]/) && name.length > 4) { // special case of 'wgLegalTitleChars'
						isValid = {
							name: name.trim(),
							type: type
						};
					}
				} catch(err) {}
				break;
			case "cp":
				// not implemented yet
				break;
		}
		return isValid;
	}

	/* scan given '#mw-content-text' element */
	fn.scanPage = function(mct) {
		var found = false;
		Array.prototype.forEach.call(mct.querySelectorAll(".wiki-music"), function(node) {
			if (!found) {
				var isValid = fn.checkNode(node); // returns object with data
				if (isValid) {
					fn.addMusic(node, isValid);
				}
			}
		});
	}

	/* mutation observer for editing mode */
	fn.obs = new MutationObserver(function(ms) {
		ms.forEach(function(m) {
			// first for removed nodes first
			Array.prototype.forEach.call(m.removedNodes, function(node) {
				var isEditPageDialog = false;
				try {
					if (node.nodeType == 1 && node.id == "EditPageDialog") {
						isEditPageDialog = true;
					}
				} catch(err) {}
				if (isEditPageDialog) {
					var nav = document.querySelector("nav#wiki-music");
					if (nav) {
						nav.querySelector("audio").pause();
						nav.parentNode.removeChild(nav);
					}
				}
			});
			// now check for inserted nodes
			Array.prototype.forEach.call(m.addedNodes, function(node) {
				var isPreviewArticle = false;
				try {
					if (node.nodeType == 1 && node.classList.contains("WikiaArticle") && fn.parents(node, 4).id == "EditPageDialog") {
						isPreviewArticle = true;
					}
				} catch(err) {}
				if (isPreviewArticle) {
					fn.scanPage(node.querySelector("#mw-content-text"));
				}
			});
		});
	});

	/* parents */
	fn.parents = function(node, depth) {
		if (depth == -1) {
			return node;
		} else {
			try {
				return fn.parents(node.parentNode, depth - 1);
			} catch(err) {
				// end of parents chain
				return null;
			}
		}
	}

	/* css */
	mw.util.addCSS(
		'#wiki-music {\n' +
			'\tposition: fixed;\n' +
			'\ttop: 55px;\n' +
			'\tleft: 15px;\n' +
			'\tz-index: 999999999;\n' +
		'}\n' +
		'img#wiki-music-btn {\n' +
			'\twidth: 24px;\n' +
			'\theight: 24px;\n' +
			'\tbackground-color: #cdc;\n' +
			'\tbackground-image: linear-gradient(to bottom, #b3ffad, #52e452, #cdc);\n' +
			'\tborder: 1px solid #5a5;\n' +
			'\tborder-radius: 7px;\n' +
			'\tanimation: wiki-music-ani 5s linear infinite;\n' +
			'\tcursor: pointer;\n' +
		'}' +
		'\t@keyframes wiki-music-ani {\n' +
			'\t\t0% {\n' +
				'\t\t\tbox-shadow: 0 0 1px 1px red;\n' +
			'\t\t}\n' +
			'\t\t17% {\n' +
				'\t\t\tbox-shadow: 0 0 1px 1px yellow;\n' +
			'\t\t}\n' +
			'\t\t33% {\n' +
				'\t\t\tbox-shadow: 0 0 1px 1px lime;\n' +
			'\t\t}\n' +
			'\t\t50% {\n' +
				'\t\t\tbox-shadow: 0 0 1px 1px cyan;\n' +
			'\t\t}\n' +
			'\t\t67% {\n' +
				'\t\t\tbox-shadow: 0 0 1px 1px blue;\n' +
			'\t\t}\n' +
			'\t\t83% {\n' +
				'\t\t\tbox-shadow: 0 0 1px 1px purple;\n' +
			'\t\t}\n' +
			'\t\t100% {box-shadow: 0 0 1px 1px red;}\n' +
		'\t}'
	);

	/* implementations */
	if ([2, 3, 10, 500].indexOf(mw.config.get("wgNamespaceNumber")) > -1) {
		switch(mw.config.get("wgAction")) {
			case "view":
			case "watch":
			case "unwatch":
			case "render":
				// ordinary page
				fn.scanPage(document.querySelector("#mw-content-text"));
				break;
			case "edit":
			case "submit":
				// edit mode (not visual, yuck :P)
				fn.obs.observe(document.body, {
					childList: true,
					subtree: true
				});
		}
	}
	return fn;
}());


/* ====================================================================== *\
	# adding SVG section to the article [[Color]]
\* ====================================================================== */

if (mw.config.get("wgPageName") == "Color" && typeof window.SVGAElement !== "undefined") {
	// page is [[Color]] and the client supports SVG
	$.getJSON("/api.php?action=query&format=json&prop=revisions&titles=MediaWiki:ArticleColorInteractive&rvprop=content&cb=" + new Date().getTime(), function(data) {
		var a = data.query.pages;
		for (var pageid in a) {
			var content = a[pageid].revisions[0]["*"];
			$("table#color-table").after(
				'<h3><span id="color_svg">Interactive Color Preview</span></h3>\n' +
				content
			);
			$("svg#colors-cp-interactive").css({
				"display": "block",
				"margin": "auto"
			});
			$("svg#colors-cp-interactive .color-svg-icon-container").mouseover(function() {
				var fill = $(this).find(".color-svg-icon").css("fill");
				$("svg#colors-cp-interactive .color-svg-target").each(function() {
					$(this).css("fill", fill);
				});
			});
		}
	});
}


/* ====================================================================== *\
	# open links on the main page that have the "new_tab" class in a new tab
\* ====================================================================== */
if (mw.config.get("wgPageName") == "Club_Penguin_Wiki") {
	$(".new_tab a").attr("target", "_blank");
}


/* ====================================================================== *\
	# $cp api
\* ====================================================================== */

/* global object */
window.$cp = {};

/* json */
$cp.json = {};

// loaded data
$cp.json.val = {};

// custom callback names
$cp.json.cbs = {
	"cover": "cp_covers",
	"chunking_map": "cp_chunking_maps",
	"puffles_v2": "cp_puffles_v2s",
	"stamps_tokenized": "cp_stamps_tokenizeds"
};

// callback queue for files that have yet to be loaded
$cp.json.que = {};

// generate url based on filename + lang
$cp.json.stringToUrl = function(file, lang) {
	var lang = ["pt", "fr", "es", "de", "ru"].indexOf(lang) > -1 ? lang : "en",
		url = "https://icer.ink/media1." + (["characters", "worlds"].indexOf(file) > -1 ? "friends.go.com/content/disney-land-clubpenguin/" + lang + "/" : ["lands", "text"].indexOf(file) > -1 ? "friends.go.com/content/" + lang + "/" : ["markup", "images"].indexOf(file) > -1 ? "friends.go.com/content/" : "clubpenguin.com/play/" + lang + "/web_service/game_configs/") + file + ".jsonp";
	return url;
}

// get callback name
$cp.json.getCbName = function(file) {
	return ["lands", "characters", "text", "markup", "images", "worlds"].indexOf(file) > -1 ? file + "Data" : ($cp.json.cbs.hasOwnProperty(file) ? $cp.json.cbs[file] : "cp_" + file);
}

// get file
$cp.json.get = function(a) {
	var lang = ["pt", "fr", "es", "de", "ru"].indexOf(a.lang) > -1 ? a.lang : "en",
		file = a.file,
		url = $cp.json.stringToUrl(file, lang),
		cb = $cp.json.getCbName(file),
		cbfn = typeof a.success === "function" ? a.success : function() {console.log("Finished loading '" + file + "' file as JSONP (" + lang + ")");},
		cbkey = lang + "::" + file;
	$cp.json.val[lang] = $cp.json.val[lang] || {};
	if ($cp.json.val[lang].hasOwnProperty(file)) {
		// file has already been requested and loaded
		cbfn($cp.json.val[lang][file]);
	} else {
		// file hasn't loaded yet
		if (!$cp.json.que.hasOwnProperty(cbkey)) {
			// no requests in queue - this is the first one
			$cp.json.que[cbkey] = [cbfn];
			$cp.json.requestJsonpResource(url, lang, file, cb, cbkey);
		} else {
			// file hasn't loaded, yet a request has already been sent
			$cp.json.que[cbkey].push(cbfn);
		}
	}
}

// make a jsonp request
$cp.json.requestJsonpResource = function(url, lang, file, cb, cbkey) {
	var args = arguments;
	args = {
		url: args[0],
		lang: args[1],
		file: args[2],
		cb: args[3],
		cbkey: args[4]
	};
	$.ajax({
		url: url,
		dataType: "jsonp",
		jsonpCallback: cb,
		success: function(data) {
			$cp.json.val[args.lang][args.file] = data;
			for (var i in $cp.json.que[args.cbkey]) {
				$cp.json.que[args.cbkey][i](data);
			}
		}
	});
}

// get multiple resources in a single function
$cp.json.multi = function(a, b) {
	var arg = Array.prototype.slice.apply(arguments),
		toget = arg[0],
		onDone = arg[1];
	function get() {
		if (toget.length > 0) {
			var newReq = toget.shift();
			newReq.success = function() {
				if (toget.length == 0) {
					if (typeof onDone === "function") {
						onDone();
					}
				} else {
					get();
				}
			}
			$cp.json.get(newReq);
		}
	}
	get();
}


/*
	player card generator
	special thanks: [[User:Hey.youcp]], [[User:Kallie Jo]]
*/
$cp.card = {};

// core components
$cp.card.fn = {};
$cp.card.data = {};

// data
	// type ids by item ids
$cp.card.data.items = {};
	// order of items, from back to front
$cp.card.data.clothingTypes = {
	"1": "color",
	"2": "head",
	"3": "face",
	"4": "neck",
	"5": "body",
	"6": "hand",
	"7": "feet",
	"8": "pin",
	"9": "background"
};
	// array of back items, containing item ids
$cp.card.data.backItems = [];
	// layer depths by item ids
$cp.card.data.layer = {};
	// array of items with custom depth
$cp.card.data.layerItems = [];
	// dimensions limits for canvas
$cp.card.data.dimensions = {
	min: 10,
	def: 88
};
	// blank image - used if a given item has no image
$cp.card.data.blank = mw.config.get("wgBlankImgUrl");
	// puffle and puffle info-related data
$cp.card.data.puffle = {
	// puffle_filenames required as no jsonp or cross-domain json request are available
	puffle_filenames: {}, // a jsonp version is now available (:D !!!) no need to store all the data here like n00bs
	puffleitems: {}
}

// functions
	// create a new canvas node
$cp.card.fn.newCard = function(obj) {
	var canvas = document.createElement("canvas"),
		_sizes = [60, 88, 95, 300, 600], // sorted from in an ascending order (!!!)
		size = undefined,
		srcSize = undefined;
	// update the canvas element
	canvas.className = "player-card-gen" + (obj.transparent ? " player-card-gen-transparent" : "");
	canvas.innerHTML = 'Sorry! Your browser does not support the <span style="font-style: italic;">&lt;canvas&gt;</span> element';
	// take care for setting dimensions and source sizes
	for (var i in _sizes) {
		if (obj.size <= _sizes[i]) {
			size = obj.size;
			srcSize = _sizes[i];
			break;
		}
	}
	if (size && size < $cp.card.data.dimensions.min) {
		// if is set but is smaller than minimum permitted dimensions
		size = $cp.card.data.dimensions.min;
		srcSize = 60;
	} else if (!size) {
		// no size matched
		size = $cp.card.data.dimensions.def;
		srcSize = $cp.card.data.dimensions.def;
	}
	// give the element some data
	$(canvas).data({
		outfit: {},
		src: srcSize,
		size: size
	});
	for (var typeId in $cp.card.data.clothingTypes) {
		$(canvas).data().outfit[$cp.card.data.clothingTypes[typeId]] = null;
	}
	// add ids based on 'obj'
	for (var i in obj.items) {
		var id = obj.items[i];
		if ($cp.card.data.items[id]) {
			var type = $cp.card.data.items[id];
			$(canvas).data().outfit[$cp.card.data.clothingTypes[type]] = id;
		}
	}
	// puffle content
	$(canvas).data().puffle = {
		puffle: obj.puffle.puffle,
		items: {
			head: null
		}
	};
	for (var i in obj.puffle.items) {
		var id = obj.puffle.items[i];
		if ($cp.card.data.puffle.puffleitems[id] == "head") {
			$(canvas).data().puffle.items.head = id;
		}
	}
	// set blue color as default
	if (!$.isNumeric($(canvas).data().outfit.color)) {
		$(canvas).data().outfit.color = 1; // set outfit to blue by default
	}
	$(canvas).attr({
		width: size,
		height: size
	});
	return canvas;
}
	// update canvas content based on its data
$cp.card.fn.update = function(node) {
	$cp.card.fn.clear(node);
	var ids = [],
		existingIds = $cp.card.fn.layerify($cp.card.fn.getClothingIds(node)), // ordered by layers
		hasCheckedBackItems = false,
		data = $(node).data();
	for (var i in existingIds) {
		var id = existingIds[i];
		if ($.isNumeric(id)) {
			if ($cp.card.data.clothingTypes[$cp.card.data.items[id]] == "background") {
				ids.push(id);
			}
			if (
				data.outfit.neck && // neck item is defined
				$cp.card.data.backItems.indexOf(data.outfit.neck) > -1 && // nack item has a back version
				!hasCheckedBackItems && // back item has still not been added
				$cp.card.data.clothingTypes[existingIds[i]] != "background" // this isn't the background layer
			) {
				ids.push("https://web.archive.org/web/http://media8.clubpenguin.com/game/items/images/paper/image/" + data.src + "/" + data.outfit.neck + "_back.png");
				hasCheckedBackItems = true;
			}
			if ($cp.card.data.clothingTypes[$cp.card.data.items[id]] != "background") {
				// need to check before and after the back item, to make sure that it's not loaded behind the background
				ids.push(id);
			}
		}
	}
	function success() {
		if (ids.length > 0) {
			$cp.card.fn.loadImage(node, ids.shift(), success);
		} else {
			$cp.card.fn.updatePuffle(node);
		}
	}
	success();
}
	// update - puffle and puffle items version
$cp.card.fn.updatePuffle = function(node) {
	var data = $(node).data(),
		urls = [];
	// see what urls to get
	if ($.isNumeric(data.puffle.items.head)) {
		// if puffle head item exist
		// start with the back of the hat
		urls.push("https://web.archive.org/web/http://media8.clubpenguin.com/game/items/images/puffles/hats/player_card/" + data.src + "/" + data.puffle.items.head + "_back.png");
		if ($.isNumeric(data.puffle.puffle)) {
			// if puffle specified, add image next
			var filedata = String($cp.card.data.puffle.puffle_filenames[data.puffle.puffle]);
			urls.push("https://web.archive.org/web/http://media8.clubpenguin.com/game/items/images/puffles/paper/" + data.src + "/" + (filedata.length > 0 ? filedata + "_" + data.puffle.puffle : data.puffle.puffle) + ".png");
		}
		// add front hat part
		urls.push("https://web.archive.org/web/http://media8.clubpenguin.com/game/items/images/puffles/hats/player_card/" + data.src + "/" + data.puffle.items.head + ".png");
	} else if ($.isNumeric(data.puffle.puffle)) {
		// if no puffle head item exists, but a puffle is specified
		var filedata = String($cp.card.data.puffle.puffle_filenames[data.puffle.puffle]);
		urls.push("https://web.archive.org/web/http://media8.clubpenguin.com/game/items/images/puffles/paper/" + data.src + "/" + (filedata.length > 0 ? filedata + "_" + data.puffle.puffle : data.puffle.puffle) + ".png");
	}
	function success() {
		if (urls.length > 0) {
			$cp.card.fn.loadImage(node, urls.shift(), success);
		}
	}
	success();
}
	// clear canvas
$cp.card.fn.clear = function(node) {
	node.getContext("2d").clearRect(0, 0, 600, 600); // since 600 is the maximum possible width, no need to get the dimensions
}
	// add item
$cp.card.fn.addItem = function(node, type, id) {
	var data = $(node).data(),
		isChanged = true;
	switch (type) {
		case "clothing":
			var propType = $cp.card.data.clothingTypes[$cp.card.data.items[id]];
			if (propType) {
				data.outfit[propType] = Number(id);
			}
			break;
		case "puffle":
			var path = $cp.card.data.puffle.puffle_filenames[id];
			if (typeof path !== "undefined") {
				data.puffle.puffle = path.length > 0 ? path + "_" + id : id;
			}
			break;
		case "puffleitem":
			var propType = $cp.card.data.puffle.puffleitems[id];
			if (["head"].indexOf(propType) > -1 && typeof data.puffle.items[propType] !== "undefined") {
				data.puffle.items[propType] = Number(id);
			}
			break;
		default:
			isChanged = false;
	}
	if (isChanged) {
		$cp.card.fn.update(node);
	}
}
	// remove item
$cp.card.fn.removeItem = function(node, type, id) {
	var data = $(node).data(),
		isChanged = true;
	switch (type) {
		case "clothing":
			var propType = $cp.card.data.clothingTypes[$cp.card.data.items[id]];
			if (propType && data.outfit[propType] == Number(id)) {
				data.outfit[propType] = null;
			}
			break;
		case "puffle":
			data.puffle.puffle = null;
			break;
		case "puffleitem":
			var propType = $cp.card.data.puffle.puffleitems[id];
			if (["head"].indexOf(propType) > -1 && typeof data.puffle.items[propType] !== "undefined" && data.puffle.items[propType] == Number(id)) {
				data.puffle.items[propType] = null;
			}
			break;
		default:
			isChanged = false;
	}
	if (isChanged) {
		$cp.card.fn.update(node);
	}
}
	// load image using canvas.drawImage()
$cp.card.fn.loadImage = function(node, id, success) {
	var img = new Image,
		data = $(node).data();
	img.src = $.isNumeric(id) ? "https://web.archive.org/web/http://media8.clubpenguin.com/game/items/images/paper/image/" + data.src + "/" + id + ".png" : id;
	img.onload = function() {
		node.getContext("2d").drawImage(img, 0, 0, data.size, data.size);
		success();
	}
	img.onerror = function() {
		// loading eror / no image exists for that item
		$cp.card.fn.loadImage(node, $cp.card.data.blank, success);
	}
}
	// apply on <span> placeholder node
$cp.card.fn.apply = function(node) {
	$(node).addClass("player-card-gen-que");
	var obj = {
		puffle: {}
	};
	if ($.isNumeric($(node).attr("data-size"))) {
		obj.size = Number($(node).attr("data-size"));
	}
	if (typeof $(node).attr("data-items") === "string") {
		var temp = $(node).attr("data-items").split(","),
			items = [];
		for (var i in temp) {
			if ($.isNumeric(temp[i])) {
				items.push(Number(temp[i]));
			}
		}
		obj.items = items;
	}
	if (typeof $(node).attr("data-puffle") === "string") {
		var id = $(node).attr("data-puffle").match(/^ *(\d+)/);
		if ($.isArray(id)) {
			obj.puffle.puffle = id[1];
		}
	}
	if (typeof $(node).attr("data-puffle-items") === "string") {
		var temp = $(node).attr("data-puffle-items").split(","),
			items = [];
		for (var i in temp) {
			if ($.isNumeric(temp[i])) {
				items.push(Number(temp[i]));
			}
		}
		obj.puffle.items = items;
	}
	if (["1", "yes", "true", "transparent"].indexOf($(node).attr("data-transparent")) > -1) {
		obj.transparent = true;
	}
	var canvas = $cp.card.fn.newCard(obj);
	$(node).replaceWith(canvas);
	$cp.card.fn.update(canvas);
}
	// go through matching <span> nodes and update
$cp.card.fn.exe = function() {
	$("span.player-card-gen:not(.player-card-gen-que)").each(function() {
		if (!$(this).hasClass("player-card-gen-que")) { // in case its been called twice or more for some reason
			$cp.card.fn.apply(this);
		}
	});
}

	// order items by layers
$cp.card.fn.layerify = function(ids) {
	var layers = [],
		orderByLayers = [],
		idsByLayers = {};
	for (var i in ids) {
		layers.push($cp.card.data.layer[ids[i]]);
		idsByLayers[layers[i]] = ids[i];
	}
	layers = $cp.card.fn.ascend(layers);
	for (var i in layers) {
		orderByLayers.push(idsByLayers[layers[i]]);
	}
	return orderByLayers;
}

	// order numbers in an ascending order
$cp.card.fn.ascend = function(arr) {
	// from MDN, modified version https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
	return arr.concat().sort(function(a, b) {
		return a - b;
	});
}

	// get list of clothing ids
$cp.card.fn.getClothingIds = function(node) {
	var ids = [],
		outfit = $(node).data().outfit;
		types = $cp.card.data.clothingTypes;
	for (var typeId in types) {
		if ($.isNumeric(outfit[$cp.card.data.clothingTypes[typeId]])) {
			ids.push(outfit[$cp.card.data.clothingTypes[typeId]]);
		}
	}
	return ids;
}

// load json data
$cp.json.multi(
	[
		{file: "paper_items"},
		{file: "puffle_items"},
		{file: "puffles_v2"}
	],
	function() {
		var clothing = $cp.json.val.en.paper_items,
			puffleitems = $cp.json.val.en.puffle_items,
			pufflesv2 = $cp.json.val.en.puffles_v2;
		for (var i in pufflesv2) {
			var puffleid = pufflesv2[i].puffle_id,
				parentid = pufflesv2[i].parent_puffle_id;
			$cp.card.data.puffle.puffle_filenames[puffleid] = puffleid < 1000 ? "" : parentid;
		}
		for (var i in clothing) {
			var a = clothing[i],
				id = a.paper_item_id,
				type = a.type;
			$cp.card.data.items[id] = type;
			if ([a.is_back, a.has_back].indexOf("1") > -1) {
				$cp.card.data.backItems.push(id);
			}
			if ([a.is_back, a.has_back].indexOf("1") > -1) {
				$cp.card.data.backItems.push(id);
			}
			$cp.card.data.layer[id] = a.layer;
			if (a.hasOwnProperty("customDepth")) {
				$cp.card.data.layerItems.push(id);
			}
		}
		for (var i in puffleitems) {
			var a = puffleitems[i];
			$cp.card.data.puffle.puffleitems[a.puffle_item_id] = a.type;
		}
		// now execute
		$cp.card.fn.exe();
		$("body").on("DOMNodeInserted", "span.player-card-gen, :has(span.player-card-gen)", function() {
			$cp.card.fn.exe();
		});
	}
);


/*
    dingus farm
*/

// core components
$cp.pfarm = {
	data: {},
	fn: {}
};

// data
	// base images url
$cp.pfarm.data.baseURI = "https://icer.ink/media8.clubpenguin.com/mobile/cp-mobile-ui/clubpenguin_v1_6/en_US/deploy/metaplace/devicepng/assets/";
	// namespaces
$cp.pfarm.data.ns = {
	xlink: "https://www.w3.org/1999/xlink",
	svg: "https://www.w3.org/2000/svg"
}

// functions
	// initiate (parse json input and proceed if is valid)
$cp.pfarm.fn.init = function(node) {
	var json;
	try {
		json = JSON.parse($(node).find('input[type="text"]').val());
		this.updateMarkup(node, json);
	} catch(err) {
		if (typeof json === "undefined") {
			this.onInvalidJSON(node, err);
		}
	}
}
	// on invalid json input
$cp.pfarm.fn.onInvalidJSON = function(node, err) {
	$(node).find(".pigfarm-errorbox").html("Invalid JSON input.").show();
}
	// update 'nav.pigfarm' markup
$cp.pfarm.fn.updateMarkup = function(node, json) {
	$(node).find(".pigfarm-errorbox").hide();
	$(node).find(".pigfarm-preview-container").html("");
	var canvas = document.createElement("canvas"),
		svg = document.createElementNS($cp.pfarm.data.ns.svg, "svg"),
		svgDefs = document.createElementNS($cp.pfarm.data.ns.svg, "defs"),
		svgG = document.createElementNS($cp.pfarm.data.ns.svg, "g"),
		svgPath = document.createElementNS($cp.pfarm.data.ns.svg, "path"),
		data;
	this.generateNodeData(node, json);
	data = $(node).data();
	// set svg and canvas dimensions and insert them
	$(svgG).attr({
		class: "pigfarm-svg-g"
	});
	this.setAttr(svgPath, {
		id: "pigfarm-svg-corner",
		d: "M 0 0 q 38 82 63 113 A 21 17 0 1 0 38 143 h -38 z" // originally was (for testing): M 0 0 v 20 h 15 z
	});
	$(canvas).attr({
		width: data.d.w,
		height: data.d.h
	});
	this.setAttr(svg, {
		/*
			originally used 1x1 as dimensions with visible overflow to allow downloading
			but removed to make the graphics elements visible by custom settings
		*/
		width: data.d.w,
		height: data.d.h
	});
	svgDefs.appendChild(svgPath);
	svg.appendChild(svgDefs);
	svg.appendChild(svgG);
	$(node).addClass("pigfarm-loaded");
	// fill div container
	$(node).find(".pigfarm-preview-container").css({
		zoom: 460 / data.d.w
	}).append(canvas, svg);
	// add page navigation controls
	this.addInterfaceControls(node);
	// draw first page
	this.drawPage(node);
}
    // generate node data -- $(node).data({ ... })
$cp.pfarm.fn.generateNodeData = function(node, json) {
	$(node).data({
		json: json,
		d: {
			w: json.sourceWidth,
			h: json.sourceHeight
		},
		btns: {
			trig: "rgba(0, 255, 0, 0" + ($(node).find('[data-role="trig"]').prop("checked") ? ".4" : "") + ")",
			page: "rgba(0, 255, 0, 0" + ($(node).find('[data-role="page"]').prop("checked") ? ".4" : "") + ")"
		},
		pages: [],
		currPage: 0
	});
	var comp = json.components,
		innerPages = comp.slice(1, comp.length - 1);
	while (innerPages.length > 0) {
		// add new items, each is a set of paired pages
		$(node).data().pages.push(innerPages.splice(0, 2));
	}
	$(node).data().pages.unshift([comp[0]]);
	$(node).data().pages.push([comp[comp.length - 1]]);
}
	// set attribute(s)
$cp.pfarm.fn.setAttr = function(node, attrs) {
	for (var attr in attrs) {
		var val = attrs[attr],
			ns = null;
		if (["number", "string"].indexOf(typeof attrs[attr]) == -1) {
			// namespace specified
			ns = val.ns;
			val = val.val;
		}
		node.setAttributeNS(ns, attr, val);
	}
}
	// add control buttons
$cp.pfarm.fn.addInterfaceControls = function(node) {
	var pagenav = $(node).find(".pigfarm-pagenav");
	$(pagenav).find('input[type="text"]').keydown(function(e) {
		var a = $(this).val();
		if (e.keyCode == 13) {
			// enter key
			if ($.isNumeric(a)) {
				// enter key + numeric input
				$cp.pfarm.fn.jumpToPage(node, Number(a) - 1);
			} else {
				// special values
				switch (a.toLowerCase()) {
					case "f":
					case "first":
						// go to first page ("f")
						$cp.pfarm.fn.jumpToPage(node, 0);
						break;
					case "l":
					case "last":
						// go to last page ("f")
						$cp.pfarm.fn.jumpToPage(node, $(node).data().pages.length - 1);
						break;
				}
			}
		}
	});
	$(pagenav).find('input[type="checkbox"]').click(function() {
		var role = $(this).attr("data-role");
		// update trigger opacity
		$(node).data().btns[role] = "rgba(0, 255, 0, " + (this.checked ? "0.4" : "0") + ")";
		// redraw page
		$cp.pfarm.fn.drawPage(node);
	});
}
	// draw page
$cp.pfarm.fn.drawPage = function(node) {
	var data = $(node).data(),
		pages = data.pages,
		page = pages[data.currPage],
		canvas = node.querySelector("canvas"),
		svg = node.querySelector("svg"),
		offsetX,
		totalWidth = 0,
		widthPerPage = [];
	this.clearCanvas(canvas);
	this.clearSVG(svg);
	for (var i in page) {
		totalWidth += page[i].width;
		widthPerPage.push(page[i].width);
	}
	offsetX = (data.d.w - totalWidth) / 2;
	for (var i in page) {
		// draw page i of the page group
		var a = page[i],
			b = a.layout,
			offsetY = (data.d.h - a.height) / 2;
			if (b.hasOwnProperty("images")) {
				for (var j in b.images) {
					var c = b.images[j];
					this.drawImage(canvas, $cp.pfarm.data.baseURI + c.image, offsetX, offsetY, c.width, c.height);
				}
			}
			if (b.hasOwnProperty("frames")) {
				for (var j in b.frames) {
					// draw frames on svg
					this.addItemLabel(svg, b.frames[j], offsetX, offsetY);
				}
			}
		// increase offset count for next page usage
		offsetX += widthPerPage.shift();
	}
	// now generate buttons to go to next/prev pages
	this.addPageButtons(node, svg, totalWidth);
}
	// draw image
$cp.pfarm.fn.drawImage = function(canvas, url, x, y, w, h) {
	var img = new Image();
	img.onload = function() {
		var a = canvas.getContext("2d");
		a.drawImage(img, x, y, w, h);
	}
	img.src = url;
}
	// clear canvas
$cp.pfarm.fn.clearCanvas = function(canvas) {
	var a = canvas.getContext("2d");
	a.clearRect(0, 0, canvas.width, canvas.height);
}
	// draw clear canvas
$cp.pfarm.fn.clearSVG = function(svg) {
	var g = svg.querySelector(".pigfarm-svg-g");
	while (g.childNodes.length > 0) {
		g.removeChild(g.childNodes[0]);
	}
}
	// add item label (purchase trigger)
$cp.pfarm.fn.addItemLabel = function(svg, itemData, offsetX, offsetY) {
	var g = svg.querySelector(".pigfarm-svg-g"),
		rect = document.createElementNS($cp.pfarm.data.ns.svg, "rect"),
		title = document.createElementNS($cp.pfarm.data.ns.svg, "title");
	this.setAttr(rect, {
		width: itemData.width,
		height: itemData.height,
		x: offsetX + itemData.originX,
		y: offsetY + itemData.originY,
		fill: $(svg).parents(".pigfarm").first().data().btns.trig
	});
	title.textContent = "Item: " + itemData.name + "\nID: " + itemData.configurator_id;
	rect.appendChild(title);
	g.appendChild(rect);
}
	// load previous page
$cp.pfarm.fn.prevPage = function(node) {
	var data = $(node).data();
	if (data.currPage > 0) {
		data.currPage--;
		this.drawPage(node);
	}
}
	// load next page
$cp.pfarm.fn.nextPage = function(node) {
	var data = $(node).data();
	if (data.currPage < data.pages.length - 1) {
		data.currPage++;
		this.drawPage(node);
	}
}
	// go to page
$cp.pfarm.fn.jumpToPage = function(node, i) {
	var data = $(node).data();
	if (i >= 0 && i < data.pages.length) {
		// index in range
		data.currPage = i;
		this.drawPage(node);
	}
}
	// add prev & next buttons
$cp.pfarm.fn.addPageButtons = function(node, svg, layoutWidth) {
	var data = $(node).data(),
		page = data.pages[data.currPage],
		offsetX = (data.d.w - layoutWidth) / 2,
		offsetY = (data.d.h - page[0].height) / 2 + page[0].height - 143, // 143 = height of button
		g = svg.querySelector(".pigfarm-svg-g"),
		btn0 = document.createElementNS($cp.pfarm.data.ns.svg, "use"),
		btn1;
	this.setAttr(btn0, {
		"xlink:href": {val: "#pigfarm-svg-corner", ns: $cp.pfarm.data.ns.xlink},
		"x": offsetX,
		"y": offsetY,
		"class": "pigfarm-button",
		"fill": $(node).data().btns.page
	});
	btn1 = btn0.cloneNode(true);
	this.setAttr(btn1, {
		"x": (offsetX + layoutWidth) * -1,
		"transform": "scale(-1 1)"
	});
	btn0.onclick = function() {
		$cp.pfarm.fn.prevPage(node);
	}
	btn1.onclick = function() {
		$cp.pfarm.fn.nextPage(node);
	}
	if (data.currPage > 0) {
		// add "next" button (not to front cover)
		g.appendChild(btn0);
	}
	if (data.currPage < data.pages.length - 1) {
		// add "prev" button (not to back cover)
		g.appendChild(btn1);
	}
}

/* ====================================================================== *\
	# remove video caption with file name if a caption was already specified
\* ====================================================================== */

$(document).ready(function() {
	$(".wikia-gallery .title + .lightbox-caption, figcaption > .title + .caption").prev().hide();
});


/* ====================================================================== *\
	# tree list for [[List of Safe Chat Messages]]
\* ====================================================================== */

if (mw.config.get("wgArticleId") == 367219) {
	// affects #scm-list-preload
	$cp.json.get({
		file: "safe_chat_messages",
		success: function() {
		    var data = $cp.json.val.en.safe_chat_messages;
			function parse(a) {
				var markup = "";
				for (var i in a) {
					markup += '<li>' + (typeof a[i].menu !== "undefined" ? '<span class="scm-list-hasmenu">' + a[i].message + '</span>' + parse(a[i].menu) : a[i].message) + '</li>';
				}
				return '<ul>' + markup + '</ul>';
			}
			var el = $(parse(data));
			$(el).attr("id", "scm-list").prepend(
				'<li><span class="wikia-menu-button" data-button="show">&nbsp;show all&nbsp;</span> <span class="wikia-menu-button" data-button="hide">&nbsp;hide all&nbsp;</span> <span class="wikia-menu-button" data-button="toggle">&nbsp;toggle all&nbsp;</span></li>'
			);
			mw.util.addCSS("#scm-list {margin-left: 20px; font-size: 88%;} #scm-list li {list-style: none;} #scm-list ul {display: none;} .scm-list-hasmenu {font-weight: bold;}");
			$("#scm-list-preload").html(el);
			$("#scm-list .scm-list-hasmenu").click(function() {
				$(this).next().toggle(80);
			});
			$("#scm-list .wikia-menu-button").click(function() {
				$("#scm-list ul")[$(this).attr("data-button")](80);
			});
		}
	});
}


/* ====================================================================== *\
	# player card generator interface
\* ====================================================================== */

$(function() {
	if ([4].indexOf(mw.config.get("wgNamespaceNumber")) > -1) {
		// add css
		mw.util.addCSS(
			'.pc-generator p {\n' +
				'\tpadding: 2px 8px;\n' +
			'}\n' +
			'.pc-generator-field input[type="button"] {\n' +
				'\tborder: 1px solid #ccc;\n' +
			'}\n' +
			'.pc-generator-field input:first-child {\n' +
				'\tborder-radius: 8px 0 0 8px;\n' +
			'}\n' +
			'.pc-generator-field input:last-child {\n' +
				'\tborder-radius: 0 8px 8px 0;\n' +
			'}\n' +
			'.pc-generator-field input[type="text"] {\n' +
				'\twidth: 100px;\n' +
				'\tpadding-left: 3px;\n' +
				'\tbackground: #f2fcf5;\n' +
				'\tborder-color: #ccc;\n' +
				'\tborder-style: solid;\n' +
				'\tborder-width: 1px 0;' +
			'}\n' +
			'.pc-generator .explain {\n' +
				'\tfont-weight: bold;\n' +
			'}' +
			'#pc-generator-transparent {\n' +
				'\tdisplay: none;\n' +
			'}' +
			'#pc-generator-transparent + label span {\n' +
				'\tdisplay: inline-block;\n' +
				'\twidth: 11px;\n' +
				'\theight: 11px;\n' +
				'\tbackground: linear-gradient(to bottom, #fafafa, #eee);\n' +
				'\tborder: 1px solid #ccc;\n' +
				'\tborder-radius: 4px;\n' +
			'}' +
			'#pc-generator-transparent:checked + label span {\n' +
				'\tbackground: linear-gradient(to bottom, #bbb, #ddd);\n' +
			'}'
		);

		// insert html
		$(".pc-generator").replaceWith('<div class="pc-generator" style="width: 400px; margin: auto; border: 1px solid #ccc; background: white; text-align: center;">\n' +
			'\t<h3 style="font-weight: bold; font-size: 20px;">Player Card Generator</h3>\n' +
			'\t<span style="display: inline-block; zoom: 0.5;"><span class="player-card-gen" style="width: 600px; height: 600px;" data-size="600"></span></span>\n' +
			'\t<table style="width: 390px; width: calc(100% - 20px); margin: auto; border-collapse: separate; border-spacing: 0; text-align: left;">\n' +
				'\t\t<tbody>\n' +
					'\t\t\t<tr>\n' +
						'\t\t\t\t<td><span class="explain" title="Use a clothing ID for adding an item to the player card generator">Clothing items</span></td>\n' +
						'\t\t\t\t<td class="pc-generator-field pc-generator-field-item" data-type="clothing">\n' +
							'\t\t\t\t\t<input type="button" class="button" value="remove" /><!--\n' +
							'\t\t\t\t\t--><input type="text" placeholder="Clothing ID" /><!--\n' +
							'\t\t\t\t\t--><input type="button" class="button" value="add" />\n' +
						'\t\t\t\t</td>\n' +
					'\t\t\t</tr>\n' +
					'\t\t\t<tr>\n' +
						'\t\t\t\t<td><span class="explain" title="Use a puffle item ID for adding an item for your puffle in the player card generator">Puffle items</span></td>\n' +
						'\t\t\t\t<td class="pc-generator-field pc-generator-field-pitem" data-type="puffleitem">\n' +
							'\t\t\t\t\t<input type="button" class="button" value="remove" /><!--\n' +
							'\t\t\t\t\t--><input type="text" placeholder="Puffle item ID" /><!--\n' +
							'\t\t\t\t\t--><input type="button" class="button" value="add" />\n' +
						'\t\t\t\t</td>\n' +
					'\t\t\t</tr>\n' +
					'\t\t\t<tr>\n' +
						'\t\t\t\t<td><span class="explain" title="Use a puffle species ID for adding a puffle to the player card generator">Puffle</span></td>\n' +
						'\t\t\t\t<td class="pc-generator-field pc-generator-field-puffle" data-type="puffle">\n' +
							'\t\t\t\t\t<input type="button" class="button" value="remove" /><!--\n' +
							'\t\t\t\t\t--><input type="text" placeholder="Puffle ID" /><!--\n' +
							'\t\t\t\t\t--><input type="button" class="button" value="add" />\n' +
						'\t\t\t\t</td>\n' +
					'\t\t\t</tr>\n' +
				'\t\t</tbody>\n' +
			'\t</table>\n' +
			'\t<p style="text-align: left;">\n' +
				'\t\t<input type="checkbox" id="pc-generator-transparent" style="display: none;" />\n' +
				'\t\t<label for="pc-generator-transparent"><span class="pc-generator-checkbox"></span> Transparent background</label>\n' +
			'\t</p>\n' +
		'</div>');

		// toggle transparency
		$("#pc-generator-transparent + label").click(function() {
			$(".pc-generator canvas").toggleClass("player-card-gen-transparent");
		});

		// add item
		$('.pc-generator input[value="add"]').click(function() {
			var id = $(this).prev().val().match(/\d+/);
			if ($.isArray(id)) {
				var id = Number(id[0]);
				$cp.card.fn.addItem(
					document.querySelector(".pc-generator canvas"),
					$(this).parent().attr("data-type"),
					id
				);
				$(this).prev().val("");
			}
		});

		// remove item
		$('.pc-generator input[value="remove"]').click(function() {
			var id = $(this).next().val().match(/\d+/);
			if ($.isArray(id)) {
				var id = Number(id[0]);
				$cp.card.fn.removeItem(
					document.querySelector(".pc-generator canvas"),
					$(this).parent().attr("data-type"),
					id
				);
				$(this).next().val("");
			}
		});
	}
});


/* ====================================================================== *\
	# names in other languages generator
\* ====================================================================== */

$(function() {
if ([4].indexOf(mw.config.get("wgNamespaceNumber")) > -1 && $("#interlangcp").length == 1) {
	var il = {};
	il.fn = {};
	il.data = {items: {}};

	/* =============================== *\
		# data
	\* =============================== */

	// id properties
	il.data.idProps = {
		paper_items: "paper_item_id",
		furniture_items: "furniture_item_id",
		puffle_items: "puffle_item_id",
		igloos: "igloo_id",
		igloo_locations: "igloo_location_id",
		igloo_floors: "igloo_floor_id",
		rooms: "room_id",
		stamps: "stamp_id"
	};

	// item name properties
	il.data.nameProps = {
		paper_items: "label",
		furniture_items: "label",
		puffle_items: "label",
		igloos: "name",
		igloo_locations: "label",
		igloo_floors: "label",
		rooms: "short_name",
		stamps: "name"
	};

	// css
	il.data.css = (
		'nav#interlangcp {\n' +
			'\twidth: 500px;\n' +
			'\theight: 400px;\n' +
			'\tmargin: 0 auto;\n' +
			'\tpadding: 0;\n' +
			'\tborder: 1px solid #cccccc;\n' +
			'\ttext-align: center;\n' +
		'}\n' +
		'nav#interlangcp .interlangcp-title {\n' +
			'\tfont-weight: bold;\n' +
		'}\n' +
		'nav#interlangcp p {\n' +
			'\tmargin: 10px;\n' +
			'\tpadding: 0;\n' +
			'\ttext-align: left;\n' +
		'}\n' +
		'nav#interlangcp textarea {\n' +
			'\twidth: 400px;\n' +
			'\theight: 300px;\n' +
			'\tresize: none;\n' +
			'\ttext-align: left;\n' +
		'}\n' +
		'nav#interlangcp input[type="text"] {\n' +
			'\twidth: 400px;\n' +
		'}'
	);

	/* =============================== *\
		# functions
	\* =============================== */
	// prepare list of resources
	il.fn.getFilesConst = function(file) {
		var langs = ["pt", "fr", "es", "de", "ru"],
			arr = [];
		while (langs.length > 0) {
			arr.push({
				file: file,
				lang: langs.shift()
			});
		}
		return arr;
	}
	// import resources
	il.fn.getFiles = function(file, id) {
		$cp.json.multi(
			il.fn.getFilesConst(file),
			function() {
				il.fn.parseContent(file, id);
			}
		);
	}
	// parse content
	il.fn.parseContent = function(file, id) {
		if (!il.data.items.hasOwnProperty(file)) {
			il.data.items[file] = {};
			if (file == "stamps") {
				// special case for stamps
				il.fn.parseStampContent();
			} else {
				for (var i in $cp.json.val) {
					var lang = $cp.json.val[i];
					if (i != "en") { // in case en file has already been loaded by something else
						for (var j in lang[file]) {
							var _id = lang[file][j][il.data.idProps[file]];
							if (!il.data.items[file].hasOwnProperty(_id)) {
								il.data.items[file][_id] = {};
							}
							il.data.items[file][_id][i] = lang[file][j][il.data.nameProps[file]];
						}
					}
				}
			}
		}
		if (il.data.items[file].hasOwnProperty(id)) {
			il.fn.makeTable(file, id);
		} else {
			il.fn.enable("Error: ID " + id + " for that item type could not found. Please enter a different ID or try a different type");
		}
	}
	// parse content for stamp files
	il.fn.parseStampContent = function() {
		var file = "stamps";
		for (var lang in $cp.json.val) {
			var locale = $cp.json.val[lang][file];
			if (lang != "en") { // in case en file has already been loaded by something else
				for (var category in locale) {
					for (var item in locale[category].stamps) {
						var curr = locale[category].stamps[item],
							_id = curr.stamp_id,
							_name = curr.name;
						if (!il.data.items[file].hasOwnProperty(_id)) {
							il.data.items[file][_id] = {};
						}
						il.data.items[file][_id][lang] = _name;
					}
				}
			}
		}
	}
	// make table
	il.fn.makeTable = function(file, id) {
		var output = "",
			a = il.data.items[file][id]
		for (var lang in a) {
			output += "\n|" + lang + "= " + a[lang];
		}
		var txt = output.length > 0 ? "==Names in other languages==\n{{Language" + output + "\n}}" : il.fn.error(id);
		il.fn.enable(txt);
	}
	// generate error message
	il.fn.error = function(id) {
		return "ERROR: no item with ID " + id + " for the given type could be found. Please make sure that the ID and the item type are correct";
	}
	// trigger
	il.fn.generate = function(file, id) {
		il.fn.getFiles(file, id);
	}
	// process inputs
	il.fn.process = function(file, id) {
		$("#interlangcp input, #interlangcp textarea, #interlangcp select")
			.attr("disabled", "disabled")
			.filter("textarea").val("Preparing resources...\nThis may take a few seconds on the first time for each item type");
		if (id.length > 0) {
			return il.fn.generate(file, id);
		} else {
			il.fn.enable("Please enter a valid ID");
		}
	}
	// de-disable form
	il.fn.enable = function(newTextareaText) {
		$("#interlangcp [disabled]")
			.removeAttr("disabled")
			.filter("textarea").val(newTextareaText);
	}
	// activation function
	il.fn.activation = function() {
		il.fn.process(
			$("#interlangcp-select").val(),
			$("#interlangcp-id").val().replace(/[^\d]/g, "")
		);
	}

	/* =============================== *\
		# implementation
	\* =============================== */
	// css
	mw.util.addCSS(il.data.css);

	// markup
	$("#interlangcp").replaceWith(
		'<nav id="interlangcp">\n' +
			'\t<p>\n' +
				'\t\t<span class="interlangcp-title">Item ID:</span> <input type="text" id="interlangcp-id" /><br />\n' +
				'\t\t<span class="interlangcp-title">Item sort:</span>\n' +
				'\t\t<select id="interlangcp-select">\n' + // orid = original order, during the development. not important
					'\t\t\t<option data-orid="0" value="paper_items">Clothing</option>\n' +
					'\t\t\t<option data-orid="1" value="furniture_items">Furniture</option>\n' +
					'\t\t\t<option data-orid="6" value="puffle_items">Puffle item</option>\n' +
					'\t\t\t<option data-orid="2" value="igloos">Igloo</option>\n' +
					'\t\t\t<option data-orid="3" value="igloo_locations">Igloo location</option>\n' +
					'\t\t\t<option data-orid="4" value="igloo_floors">Flooring</option>\n' +
					'\t\t\t<option data-orid="7" value="rooms">Rooms</option>\n' +
					'\t\t\t<option data-orid="7" value="stamps">Stamps</option>\n' +
				'\t\t</select><br />\n' +
				'\t\t<input type="button" id="interlangcp-go" value="go" />\n' +
			'\t</p>\n' +
			'\t<textarea></textarea>\n' +
		'</nav>'
	);

	// activation
	$("#interlangcp-go").click(function() {
		il.fn.activation();
	});
	$("#interlangcp-id").keydown(function(e) {
		if (e.keyCode == 13) {
			il.fn.activation();
		}
	});
}
});


/* ====================================================================== *\
	# party article data generator
\* ====================================================================== */

/* get resources and process */
if (mw.config.get("wgArticleId") == 444649) {
$cp.json.multi([
	{file: "safe_chat_messages"},
	{file: "jokes"},
	{file: "rooms"},
	{file: "tour_guide_messages"}
], function() {
	/* css */

	mw.util.addCSS(
		'#party-data-generator {\n' +
			'\twidth: 100%;\n' +
			'\tpadding: 5px;\n' +
			'\tborder: 1px solid #ccc;\n' +
		'}\n' +
		'#party-data-generator ul {\n' +
			'\t-moz-column-count: 4;\n' +
			'\t-webkit-column-count: 4;\n' +
			'\tcolumn-count: 4;\n' +
		'}\n' +
		'#party-data-generator textarea {\n' +
			'\twidth: ' + ($("#mw-content-text").width() - 14) + 'px;\n' +
			'\theight: 200px;\n' +
			'\tresize: none;\n' +
		'}'
	);

	/* interface */
	$("#party-data-generator-loader").replaceWith(
		'<nav id="party-data-generator">\n' +
			'\t<p>\n' +
				'\t\tThe following feature would load the jokes, tour guide messages and safe chat messages, in the format of party articles.<br />\n' +
				'\t\tPlease select the rooms you\'d like to retrieve tour guide description from, and then press "go".<br />\n' +
				'\t\tIn addition, make sure that the links in the Tour Guide Messages section are correct, since the official names of rooms are not always indexed.\n' +
			'\t</p>\n' +
			'\t<ul>\n' +
				'\t\tLoading... please wait\n' +
			'\t</ul>\n' +
			'\t<p>\n' +
				'\t\t<input type="button" id="party-data-generator-go" value="go" />\n' +
			'\t</p>\n' +
			'\t<textarea></textarea>\n' +
		'</nav>'
	);

	/* main code goes below this comment */
	var jokes = $cp.json.val.en.jokes,
		rooms = $cp.json.val.en.rooms,
		safe_chat_messages = $cp.json.val.en.safe_chat_messages,
		tour_guide_messages = $cp.json.val.en.tour_guide_messages,
		txt = {};

	/* jokes */
	txt.jokes = [];
	for (var i in jokes) {
		txt.jokes.push("| " + jokes[i].split("|")[0] + " || " + jokes[i].split("|")[1]);
	}
	txt.jokes = '==[[List of Jokes|Jokes]]==\n{| class="wikitable sortable"\n! Question !! Answer\n|-\n' + txt.jokes.join("\n|-\n") + "\n|}";

	/* safe chat messages */
	txt.scm = [];
	var scmIds = [1, 22, 2, 3, 4, 5, 6, 7, 8, 10, 20, 21]; // ordinary topic ids
	for (var i in safe_chat_messages) {
		if (scmIds.indexOf(safe_chat_messages[i].id) == -1) {
			var a = safe_chat_messages[i];
			txt.scm.push('==[[List of Safe Chat Messages|Safe Chat Messages]]==\n{| class="wikitable sortable"\n! ' + a.message);
			for (var j in a.menu) {
				txt.scm.push('| ' + a.menu[j].message);
			}
			break;
		}
	}
	if (txt.scm.length > 1) {
		txt.scm = txt.scm.join("\n|-\n") + '\n|}';
	}

	/* tour guide messages */
	txt.tour = [];
	var rmMarkup = "";

	for (var i in rooms) {
		if (rooms[i].room_key && rooms[i].path) {
			rmMarkup += '<li><input class="party-data-generator-roomfilter" data-room-key="' + rooms[i].room_key + '" data-room-name="' + rooms[i].name + '" type="checkbox" /><code>' + rooms[i].room_key + '.swf</code></li>';
		}
	}
	$("#party-data-generator ul").html(rmMarkup);
	$("#party-data-generator-go").click(function() {
		$("#party-data-generator").find("input, textarea").attr("disabled", "disabled");
		txt.tour = [];
		$("#party-data-generator .party-data-generator-roomfilter:checked").each(function() {
			var key = $(this).attr("data-room-key");
			txt.tour.push("| " + (key.search(/party\d*$/i) == 0 ? key : "[[" + $(this).attr("data-room-name") + "]]") + " || " + (tour_guide_messages.hasOwnProperty(key) ? tour_guide_messages[key].replace(/\|/g, "<br />") : "\'\'no_message_found\'\'"));
		});
		txt.tour = '==[[List of Tour Guide Messages|Tour Guide Messages]]==\n{| class="wikitable sortable"\n! Room !! Tour Guide\n|-\n' + txt.tour.join("\n|-\n") + "\n|}";
		$("#party-data-generator textarea").val(txt.scm + "\n\n" + txt.jokes + "\n\n" + txt.tour);
		$("#party-data-generator [disabled]").removeAttr("disabled");
		$("#party-data-generator textarea")[0].select();
	});
});
} // end if statement


/* ====================================================================== *\
	# dingus farm generator interface
\* ====================================================================== */

if (mw.config.get("wgArticleId") == 444649) {
/* css */
mw.util.addCSS(
	'nav.pigfarm {\n' +
		'\twidth: 480px;\n' +
		'\tmargin: 0 auto;\n' +
		'\tpadding: 0;\n' +
		'\tbackground: #fafafa;\n' +
		'\tborder: 1px solid #ccc;\n' +
		'\tborder-radius: 10px;\n' +
	'}\n' +
	'nav.pigfarm-loaded .pigfarm-preview-wrapper {\n' +
		'\ttext-align: center;\n' +
	'}\n' +
	'nav.pigfarm-loaded .pigfarm-preview-container {\n' +
		'\tdisplay: inline-block;\n' +
		'\tposition: relative;\n' +
	'}\n' +
	'nav.pigfarm.pigfarm-loaded svg {\n' +
		'\tposition: absolute;\n' +
		'\ttop: 0;\n' +
		'\tleft: 0;\n' +
		'\toverflow: visible;\n' +
	'}\n' +
	'nav.pigfarm.pigfarm-loaded rect, nav.pigfarm.pigfarm-loaded use {\n' +
		'\tcursor: pointer;\n' +
	'}\n' +
	'nav.pigfarm p {\n' +
		'\tmargin: 0;\n' +
		'\tpadding: 4px 7px 10px 4px;\n' +
		'\ttext-align: center;\n' +
	'}\n' +
	'nav.pigfarm p:empty {\n' +
		'\tdisplay: none;\n' +
	'}\n' +
	'nav.pigfarm .pigfarm-errorbox {\n' +
		'\tdisplay: none;\n' +
		'\tcolor: red;\n' +
	'}\n' +
	'nav.pigfarm dl {\n' +
		'\tmargin: 0;\n' +
		'\tpadding: 5px 0 2px 10px;\n' +
	'}\n' +
	'nav.pigfarm dt {\n' +
		'\tmargin: 0;\n' +
		'\tpadding: 0;\n' +
	'}\n' +
	'nav.pigfarm dd {\n' +
		'\tmargin: 0;\n' +
		'\tpadding: 2px 0 2px 10px;\n' +
	'}\n' +
	'nav.pigfarm input[type="text"] {\n' +
		'\twidth: 300px;\n' +
		'\tborder-radius: 5px 0 0 5px;\n' +
	'}\n' +
	'nav.pigfarm input[type="button"] {\n' +
		'\tborder-radius: 0 5px 5px 0;\n' +
	'}\n' +
	'nav.pigfarm .pigfarm-pagenav {\n' +
		'\tmargin-left: 20px;\n' +
		'\ttext-align: left;\n' +
	'}\n' +
	'nav.pigfarm .pigfarm-pagenav input[type="text"] {\n' +
		'\twidth: 30px;\n' +
		'\tborder-radius: 5px;\n' +
	'}\n' +
	'nav.pigfarm:not(.pigfarm-loaded) .pigfarm-pagenav {\n' +
		'\tdisplay: none;\n' +
	'}'
);

/* initiate */
$("span.pigfarm").each(function() {
	var a = $(
		'<nav class="pigfarm">\n' +
			'\t<div class="pigfarm-controls">\n' +
				'\t\t<dl>\n' +
					'\t\t\t<dt>Instructions:</dt>\n' +
					'\t\t\t<dd>Insert to the input box the wanted catalog JSON content, and press "go" (see <a href="/wiki/Club_Penguin_Wiki:JSON#Mobile_catalogs">this section</a>).</dd>\n' +
				'\t\t</dl>\n' +
				'\t\t<p>\n' +
					'\t\t\t<input type="text" />\n' +
					'\t\t\t<input type="button" value="go" />\n' +
				'\t\t</p>\n' +
				'\t\t<p class="pigfarm-errorbox"></p>\n' +
			'\t</div>' +
			'\t<div class="pigfarm-preview-wrapper">\n' +
				'\t\t<div class="pigfarm-preview-container"></div>\n' +
			'\t</div>\n' +
			'\t<div class="pigfarm-pagenav">\n' +
				'\t\t<hr />\n' +
				'\t\tGo to page <input type="text" /><br />\n' +
				'\t\t<input type="checkbox" data-role="trig" /> Show triggers<br />\n' +
				'\t\t<input type="checkbox" data-role="page" /> Show buttons\n' +
			'\t</div>\n' +
		'</nav>'
	);
	$(this).replaceWith(a);
	$(a).find('input[type="button"]').click(function() {
		$cp.pfarm.fn.init($(this).parents(".pigfarm")[0]);
	});
});
} // end of if statement