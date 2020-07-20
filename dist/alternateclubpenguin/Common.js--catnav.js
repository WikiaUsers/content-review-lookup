/*
	allow a category navigation based on a list of categories (instead of the usual single category navigation)
*/
if (mw.config.get("wgPageName") == "Club_Penguin_Wiki:Wiki_data_generators") {
/* ================================== *\
	# core objects
\* ================================== */

var catnav = {
	fn: {},
	settings: {
		itemsInNavigator: Math.floor(($("#mw-content-text").width() - 100) / 154) * 3 // 3 rows, number of columns determined by the width of the user's screen
	}
};
catnav.data = {
	details: {},  // details about pages
	current: [],
	selectedPage: null
}

/* ================================== *\
	# functions
\* ================================== */

/* functions for getting info about categories */

// get members of a given category
catnav.fn.catMembers = function(cat, ns, arr, cont, cb) {
	/*
	catnav.fn.getMembersOfCat("Foo", 0, [], "", function(data) {
		console.log(data);
	});
	*/
	var req = new XMLHttpRequest();
	req.open("get", "/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:" + encodeURIComponent(cat) + "&cmnamespace=" + ns + "&cmcontinue=" + encodeURIComponent(cont) + "&cmlimit=max&cb=" + new Date().getTime());
	req.onload = function() {
		var data = JSON.parse(this.responseText);
		if (data.hasOwnProperty("query")) {
			var a = data.query.categorymembers;
			for (var i in a) {
				arr.push(data.query.categorymembers[i].title);
			}
			if (typeof data["query-continue"] === "object") {
				return catnav.fn.catMembers(cat, ns, arr, data["query-continue"].categorymembers.cmcontinue, cb);
			} else {
				cb(arr);
			}
		} else {
			catnav.fn.error(1, "An error has occured when looking for pages in the category [[" + cat + "]]. The error message is the following:<br />\nError code: <code>" + data.error.code + "</code><br />\nError info: " + data.error.info + "<br /><hr />Please make sure that you've entered some text to the category input. Do not add empty lines.");
		}
	}
	req.send();
}

// get members of multiple categories
catnav.fn.catMembersMulti = function(catstr, ns, cb) {
	var cats = catstr.split("|"),
		completed = 0,
		allcats = {};
	function query() {
		if (completed == cats.length) {
			// all requests have been made
			cb(allcats);
		} else {
			catnav.fn.catMembers(cats[completed], ns, [], "", function(data) {
				allcats[cats[completed]] = data;
				completed++;
				query();
			});
		}
	}
	query();
}

// search for members that exist in all specified categories
catnav.fn.joinMembers = function(data, fn) {
	console.info("members of all categories have loaded");
	console.log(data);
	var smallestCat = data[catnav.fn.getSmallestCat(data)], // start from smallest category - should take less time
		finalList = [];
	for (var i in smallestCat) {
		var itemLeSmall = smallestCat[i], // current item for check
			isSharedCommon = true;
		for (var cat in data) {
			if (cat != smallestCat && data[cat].indexOf(itemLeSmall) == -1) {
				// the page 'itemLeSmall' is not categorized in one of these cats
				isSharedCommon = false;
				break;
			}
		}
		if (isSharedCommon) {
			finalList.push(itemLeSmall);
		}
	}
	fn(finalList);
}

// find the category with the fewest members
catnav.fn.getSmallestCat = function(data) {
	var small = {
		cat: null,
		length: Infinity
	}
	for (var cat in data) {
		if (data[cat].length < small.length) {
			small.cat = cat;
			small.length = data[cat].length;
		}
	}
	return small.cat; // return name of property with the smallest number of items
}

// divide to pages - take a long list of titles, and split them to groups, each with no more than 'n' titles
catnav.fn.divideToPages = function(titles) {
	var result = [];
	while (titles.length > 0) {
		result.push(titles.splice(0, catnav.settings.itemsInNavigator));
	}
	return result;
}

/* functions for getting info about pages */

// implement new members
catnav.fn.implementNewTitles = function(titles) {
	// 'titles' is an array of page titles
	var asPages = catnav.fn.divideToPages(titles); // divide the 'titles' array to a list of smaller groups of titles
	if (asPages.length > 0) {
		catnav.data.current = asPages;
		console.info("Done!");
		catnav.fn.error(0, null); // hide error
		catnav.fn.updatePagesListNav();
		catnav.fn.gotoPage(0);
	} else {
		console.log("No matches found!");
		catnav.fn.error(1, "No pages with all specified categories were found!"); // show error
	}
}

// update pages' numbers
catnav.fn.updatePagesListNav = function() {
	var container = $('<div />');
	for (var i = 0; i < catnav.data.current.length; i++) {
		$('<a href="javascript:catnav.fn.gotoPage(' + i + ')">' + (i + 1) + '</a>').appendTo(container);
	}
	$("#catnav-pagenav").html($(container).html());
}

// go to page 'n + 1'
catnav.fn.gotoPage = function(n) {
	console.log("Attempting to go to page " + (n + 1));
	catnav.data.selectedPage = n;
	$("#catnav-pagenav .catnav-pagenav-selected").removeClass("catnav-pagenav-selected");
	$("#catnav-pagenav a").eq(n).addClass("catnav-pagenav-selected");
	catnav.fn.queryPages(catnav.data.current[n]);
}

// get info about pages (url, thumb, etc.)
catnav.fn.queryPages = function(titles) {
	var req = new XMLHttpRequest(),
		missingTitles = [];
	for (var i in titles) {
		if (!catnav.data.details.hasOwnProperty(titles[i])) {
			missingTitles.push(titles[i]);
		}
	}
	req.open("get", "/api/v1/Articles/Details?&abstract=0&width=140&height=140&titles=" + encodeURIComponent(missingTitles.join(",")));
	req.onload = function() {
		catnav.fn.parsePagesQuery(JSON.parse(this.responseText));
		catnav.fn.updateMarkup(titles);
	}
	if (missingTitles.length > 0) {
		req.send();
	} else {
		// info about those pages has already loaded
		catnav.fn.updateMarkup(titles);
	}
}

// process info about pages from json
catnav.fn.parsePagesQuery = function(data) {
	for (var pageid in data.items) {
		var a = data.items[pageid],
			title = decodeURIComponent(a.url.substr(6)).replace(/_/g, " "); // a.title doesn't provide the namespace - easiest method is to do this
		catnav.data.details[title] = {
			title: title,
			url: a.url,
			img: a.thumbnail
		}
	}
}

// update markup
catnav.fn.updateMarkup = function(titles) {
	var container = $('<div />');
	console.log(titles);
	for (var i in titles) {
		console.log(i, titles[i], catnav.data.details[titles[i]]);
		var a = catnav.data.details[titles[i]],
			item = $('<div class="catnav-item' + (a.img ? "" : " catnav-item-noimage") + '"><a href="' + a.url + '" title="' + a.title.replace(/["'&<>]/g, function(m) {return "&#" + m.charCodeAt(0) + ";";}) + '"><img src="' + (a.img ? a.img : mw.config.get("wgBlankImgUrl")) + '" width="140" height="140" /><span class="catnav-item-label"></span></a></div>');
		$(item).find("span").text(a.title);
		$(container).append(item);
	}
	$("#catnav-container").html($(container).html());
	console.log(container);
	window.q = container;
}

// error message
catnav.fn.error = function(bool, msg) {
	// if 'bool' show message, otherwise hide
	// 'msg' is the new html content
	$("#catnav-noneerror").html(msg)[bool ? "show" : "hide"]()
}
	/* ================================== *\
		# css and markup
	\* ================================== */

	/* css */
	mw.util.addCSS(
		'#catnav {\n' +
			'\twidth: 100%;\n' +
			'\tmargin: 0;\n' +
			'\tpadding: 0;\n' +
		'}\n' +
		'#catnav-container {\n' +
			'\tdisplay: flex;\n' +
			'\tflex-wrap: wrap;\n' +
			'\tmargin: 10px auto 20px auto;\n' +
			'\tmargin: 10px 50px 20px 50px;\n' +
		'}\n' +
		'#catnav-container .catnav-item {\n' +
			'\tdisplay: inline-block;\n' +
			'\twidth: 140px;\n' +
			'\theight: 140px;\n' +
			'\tmargin: 3px;\n' +
			'\tpadding: 2px;\n' +
			'\tposition: relative;\n' +
			'\toverflow: hidden;\n' +
			'\tborder: 2px solid navy;\n' +
			'\tborder-radius: 10px;\n' +
		'}\n' +
		'#catnav-container .catnav-item .catnav-item-label {\n' +
			'\tmax-width: 90px;\n' +
			'\theight: 18px;\n' +
			'\tpadding: 0 4px;\n' +
			'\tposition: absolute;\n' +
			'\tbottom: 0;\n' +
			'\tright: 0;\n' +
			'\toverflow: hidden;\n' +
			'\tbackground: #006cb0;\n' +
			'\tborder-top-left-radius: 7px;\n' +
			'\tcolor: #fff;\n' +
			'\tfont-size: 14px;\n' +
			'\tline-height: 18px;\n' +
		'}\n' +
		'#catnav-container img {\n' +
			'\tborder-radius: 7px;\n' +
		'}\n' +
		'#catnav-container .catnav-item-noimage {\n' +
			'\tborder-color: #c00;\n' +
		'}\n' +
		'#catnav-container .catnav-item-noimage .catnav-item-label {\n' +
			'\tbackground: #c00;\n' +
		'}\n' +
		'#catnav-pagenav {\n' +
			'\tpadding: 3px 7px;\n' +
			'\ttext-align: center;\n' +
			'\tfont-size: 18px;\n' +
			'\tline-height: 18px;\n' +
		'}\n' +
		'#catnav-pagenav a:not(.catnav-pagenav-selected) {\n' +
			'\tcolor: #a6d1ec;\n' +
			'\ttext-shadow: 1px 1px 0 navy;\n' +
		'}\n' +
		'#catnav-pagenav a ~ a {\n' +
			'\tmargin-left: 10px;\n' +
		'}\n' +
		'#catnav-pagenav a.catnav-pagenav-selected {\n' +
			'\tcolor: black;\n' +
			'\tcursor: pointer;\n' +
			'\tfont-weight: bold;\n' +
		'}\n' +
		'#catnav textarea {\n' +
			'\twidth: 100%;\n' +
			'\twidth: calc(100% - 6px);\n' +
			'\theight: 60px;\n' +
			'\tresize: none;\n' +
		'}\n' +
		'#catnav label {\n' +
			'\tfont-size: smaller;\n' +
		'}\n' +
		'#catnav #catnav-noneerror {\n' +
			'\tcolor: #c00;\n' +
			'\tfont-weight: bold;\n' +
		'}'
	);

	/* markup */
	$("#catnav-loader").replaceWith(
		'<nav id="catnav">\n' +
			'\t<p>\n' +
				'\t\tThe following generator allows you to collect pages from multiple categories. Insert the names of the categories that you\'d like to get pages from to the following text area, in order to retreive pages contain all listed categories (see example):\n' +
			'\t</p>\n' +
			'\t<textarea>Rare&#10;Flags and Pins</textarea>\n' +
			'\t<input type="button" id="catnav-go" value="generate" />\n' +
			'\t<input type="checkbox" id="catnav-ns" checked /><label for="catnav-ns">list mainspace only</label>\n' +
			'\t<div id="catnav-noneerror" style="display: none;">\n' +
				'\t\tNo pages were found!\n' +
			'\t</div>\n' +
			'\t<div id="catnav-container">\n' +
			'\t</div>\n' +
			'\t<div id="catnav-pagenav">\n' +
			'\t</div>\n' +
			'\t<div id="catnav-generator">\n' +
			'\t</div>\n' +
		'</nav>'
	);


	/* ================================== *\
		# triggers
	\* ================================== */
	$("#catnav-go").click(function() {
		var cats = $("#catnav textarea").val().replace(/\n/g, "|"),
			nsStr = $("#catnav-ns")[0].checked ? "0" : "";
		catnav.fn.catMembersMulti(cats, nsStr, function(data) {
			catnav.fn.joinMembers(data, function(titles) {
				catnav.fn.implementNewTitles(titles);
			});
		});
	});
}