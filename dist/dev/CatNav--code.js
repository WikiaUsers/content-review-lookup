/*
	allow a category navigation based on a list of categories (instead of the usual single category navigation)
*/

// Used files: [[File:CatNav delete.png]]

// note: the 'section#WikiaPageBackground' selector in the bottom is used for non-ucp wikis. may be removed in the future once all wikis have been transfered to the unified community platform

$(function() {
	/* ================================== *\
		# wiki links to [[Special:CatNav]]
	\* ================================== */
	if ($("#WikiaBarWrapper .tools").length > 0) {
		// fandom or fandom desktop
		$("#WikiaBarWrapper .tools").append('<li><a href="' + mw.config.get("wgArticlePath").replace("$1", "Special:CatNav") + '">CatNav</a></li>');
	} else {
		// non-fandom-desktop gamepedia
		$('#p-tb[role="navigation"] ul').append('<li id="t-catnav"><a href="' + mw.config.get("wgArticlePath").replace("$1", "Special:CatNav") + '">CatNav</a></li>');
	}

	/* ================================== *\
		# core objects
	\* ================================== */
	var catnav = {
		fn: {},
		settings: {
			rows: 3, // default number of rows
			itemsInNavigator: Math.floor(($("#mw-content-text").width() - 100) / 154) // number of columns determined by the width of the user's screen
		}
	};

	/* ================================== *\
		# console
	\* ================================== */

	catnav.console = {
		logs: [],
		debug: true // will be changed to 'false' after defining catnav.data, unless 'window.CatNav.debug' is also 'true'
	};
	catnav.console.add = function(type, data) {
		var debug = catnav.console.debug;
		if (["log", "error", "info", "warn"].indexOf(type) > -1) {
			type = "log";
		}
		catnav.console.logs.push([type, debug, data]);
		if (debug) {
			console[type]("[-] CatNav :: ", data);
		}
	};
	catnav.logs = [];
	catnav.console.log = function(data) {
		catnav.console.add("log", data);
	};
	catnav.console.error = function(data) {
		catnav.console.add("error", data);
	};
	catnav.console.info = function(data) {
		catnav.console.add("info", data);
	};
	catnav.console.warn = function(data) {
		catnav.console.add("warn", data);
	};
	
	/* ================================== *\
		# data
	\* ================================== */

	/* regular data */
	catnav.data = {
		details: {}, // details about pages
		pageids: {}, // pageids by titles
		current: [],
		selectedPage: null,
		storage: {
			url: "//community.fandom.com", // url to the wiki that hosts your imports
			scriptPath: "" // e.g. "/w" for wikipedia, empty string for fandom
		},
		markup: {
			html: null,
			css: null
		},
		_g: window.CatNav // global modifiers
	};

	/* html */
	catnav.data.markup.html = '<nav id="catnav">\n' +
		'\t<p>\n' +
			'\t\tThe following generator allows you to collect pages from multiple categories. Insert the names of the categories that you\'d like to get pages from to the following text area, in order to retreive pages contain all listed categories (see example):\n' +
		'\t</p>\n' +
		// categories' input
		'\t<div class="catnav-gui-group">\n' +
			'\t\t<div class="catnav-commoncats">\n' +
				'\t\t\t<h3>\n' +
					'\t\t\t\tCommon categories' +
					'&nbsp;<input type="button" class="wikia-button" value="add" id="catnav-commoncats-add" />\n' +
				'\t\t\t</h3>\n' +
				'\t\t\t<h5>\n' +
					'\t\t\t\tImport and merge with&nbsp;<a href="//community.fandom.com/wiki/Special:MyPage/catnav.css">global settings</a>' +
					'&nbsp;<input type="button" class="wikia-button catnav-commoncats-global" value="import" id="catnav-commoncats-global-import" />\n' +
					'&nbsp;<input type="button" class="wikia-button catnav-commoncats-global" value="export" id="catnav-commoncats-global-export" />\n' +
				'\t\t\t</h5>\n' +
				'\t\t\t<div id="catnav-commoncats-wrapper">\n' +
				'\t\t\t\t<span style="font-size: smaller;">Left click an item to add it to the included categories list, or right click it to add it to the excluded categories list. Clicking the delete icon would remove the associated item from your favorites from the browser\'s cache. To remove a link from future imports, please manually remove it from your global favorites page.</span>\n' +
					'\t\t\t\t<div id="catnav-commoncats-container">\n' +
					'\t\t\t\t</div>\n' +
				'\t\t\t</div>\n' +
			'\t\t</div>\n' +
			'\t\t<table><tbody>\n' +
				'\t\t\t<tr>\n' +
					'\t\t\t\t<th>Add from categories:</th>\n' +
					'\t\t\t\t<th>Don\'t list from categories:</th>\n' +
				'\t\t\t</tr>\n' +
				'\t\t\t<tr>\n' +
					'\t\t\t\t<td><textarea id="catnav-textarea-include"></textarea></td>\n' +
					'\t\t\t\t<td><textarea id="catnav-textarea-exclude"></textarea></td>\n' +
				'\t\t\t</tr>\n' +
			'\t\t</tbody></table>\n' +
		'\t</div>\n' +
		// filter options
		'\t<div class="catnav-gui-group">\n' +
			'\t\t<p>\n' +
				'\t\t\t<input type="checkbox" id="catnav-filter-state" /><label for="catnav-filter-state">Filter page titles</label><br />\n' +
				'\t\t\t<input type="text" id="catnav-filter-text" placeholder="Filter pattern" /><br />\n' +
				'\t\t\t<input type="checkbox" id="catnav-filter-case" checked /><label for="catnav-filter-case">Case-insensitive search</label><br />\n' +
				'\t\t\t<input type="checkbox" id="catnav-filter-regex" /><label for="catnav-filter-regex">Regex pattern</label>\n' +
			'\t\t</p>\n' +
		'\t</div>\n' +
		// settings
		'\t<div class="catnav-gui-group">\n' +
			'\t\t<p>\n' +
				'\t\t\tNumber of rows: <input type="text" id="catnav-rows" value="3" /><br />\n' +
				'\t\t\t<input type="checkbox" id="catnav-ns" checked /><label for="catnav-ns">List mainspace only</label><br />\n' +
				'\t\t\t<input type="radio" name="catnav-sort" id="catnav-sort-alphabet" value="alphabet" checked /><label for="catnav-sort-alphabet">Sort by alphabetic order</label> <span style="font-size: 66%;">(note that using other modes may dramatically increase loading time)</span><br />\n' +
				'\t\t\t<input type="radio" name="catnav-sort" id="catnav-sort-bypageid" value="bypageid" /><label for="catnav-sort-bypageid">Sort by page ID (date of creation / restoration for deleted pages)</label><br />\n' +
				'\t\t\t<!-- <input type="radio" name="catnav-sort" id="catnav-sort-creation" value="creation" /><label for="catnav-sort-creation">Sort by creation date</label><br /> -->\n' +
				'\t\t\t<input type="radio" name="catnav-sort" id="catnav-sort-lastedit" value="lastedit" /><label for="catnav-sort-lastedit">Sort by last edit</label><br />\n' +
				'\t\t\t<input type="checkbox" id="catnav-dir" /><label for="catnav-dir">Use descending order</label><br />\n' +
			'\t\t</p>\n' +
			'\t\t<input type="button" id="catnav-go" value="generate" /> <span id="catnav-loading">\n' +
				'\t\t\t<svg width="12" height="12" style="margin-right: 4px;">\n' +
					'\t\t\t\t<style type="text/css"><![CDATA[@keyframes spin{to{transform:rotate(360deg);}}circle{animation: spin 1s linear infinite;transform-origin:6px 6px;}]]></style>\n' +
					'\t\t\t\t<circle cx="6" cy="6" r="5.5" fill="none" stroke="#999" stroke-dasharray="8.63937979737193 8.63937979737193" />\n' +
				'\t\t\t</svg>\n' +
				'\t\t\tloading...\n' +
			'\t\t</span>\n' +
		'\t</div>\n' +
		// error messages
		'\t<div id="catnav-noneerror" style="display: none;">\n' +
			'\t\tNo pages were found!\n' +
		'\t</div>\n' +
		// nav result
		'\t<div id="catnav-container">\n' +
		'\t</div>\n' +
		'\t<div id="catnav-resultscounter">\n' +
		'\t</div>\n' +
		'\t<div id="catnav-pagenav">\n' +
		'\t</div>\n' +
		// lol what is this even...
		'\t<div id="catnav-generator">\n' +
		'\t</div>\n' +
	'</nav>';

	/* global favorites */
	catnav.data.globalString = 	location.href.match(/^https?\:\/{2}(.+)\.fandom\.com(?:\/(.+))?\/wiki\//);
	catnav.data.globalString = (typeof catnav.data.globalString[2] === "string" ? catnav.data.globalString[2] + "." : "") + catnav.data.globalString[1];

	/* ================================== *\
		# global CatNav object management
	\* ================================== */
	if (catnav._g instanceof Object) {
		// global CatNav is an object
		if (Array.isArray(catnav._g.storage)) {
			// import+export storage - base url to hosting wiki
			catnav.data.storage.url = catnav._g.storage[0];
			catnav.data.storage.scriptPath = catnav._g.storage[1];
		} else if (catnav._g.hasOwnProperty("storage")) {
			catnav.console.error("catnav :: global 'CatNav.storage' has been defined, but it is not a valid array");
		}
	} else {
		// window.CatNav has not been defined - define it
		window.CatNav = {};
	}
	if (window.CatNav.debug !== true) {
		catnav.console.debug = false;
	}

	/* ================================== *\
		# functions
	\* ================================== */

	/* functions for getting info about categories */

	// get members of a given category
	catnav.fn.catMembers = function(cat, ns, arr, cont, cb) {
		/*
		catnav.fn.getMembersOfCat("Foo", 0, [], "", function(data) {
			catnav.console.log(data);
		});
		*/
		var req = new XMLHttpRequest();
		req.open("get", mw.config.get("wgScriptPath") + "/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:" + encodeURIComponent(cat) + "&cmnamespace=" + ns + "&cmcontinue=" + encodeURIComponent(cont) + "&rawcontinue=&cmlimit=max&cb=" + new Date().getTime(), true);
		req.onload = function() {
			var data = JSON.parse(this.responseText);
			if (data.hasOwnProperty("query")) {
				var a = data.query.categorymembers,
					b;
				for (var i in a) {
					b = a[i];
					arr.push(b.title);
					catnav.data.pageids[b.title] = b.pageid;
				}
				if (typeof data["query-continue"] === "object") {
					return catnav.fn.catMembers(cat, ns, arr, data["query-continue"].categorymembers.cmcontinue, cb);
				} else {
					cb(arr);
				}
			} else {
				catnav.fn.onLoadingEnd();
				catnav.fn.error(1, "An error has occured when looking for pages in the category [[" + cat + "]]. The error message is the following:<br />\nError code: <code>" + data.error.code + "</code><br />\nError info: " + data.error.info + "<br /><hr />Please make sure that you've entered some text to the category input. Do not add empty lines.");
			}
		};
		req.send();
	};

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
	};

	// search for members that exist in all specified categories
	catnav.fn.joinMembers = function(data, isCommonMembers, fn) {
		var smallestCat,
			finalList = [];
		if (isCommonMembers === true) {
			// mode for the "find-in-categories" list: only list a page if it has all the listed categories
			smallestCat = data[catnav.fn.getSmallestCat(data)]; // start from smallest category - should take less time
			for (var i in smallestCat) {
				var itemLeSmall = smallestCat[i], // current item for check
				isSharedCommon = true;
				// if 'isCommonMembers == true', only list pages that are listed in all categories
				// otherwise, list all pages anyway
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
		} else {
			// mode for the "unwanted categories" list: list any categorized page that is categorized at least once
			for (var cat in data) {
				for (var i in data[cat]) {
					var currCat = data[cat][i];
					if (finalList.indexOf(finalList) == -1) {
						// although we categorize all pages, we still don't want a category to repeat- it's time consuming and pointless
						finalList.push(currCat);
					}
				}
			}
		}
		fn(finalList);
	};

	// find the category with the fewest members
	catnav.fn.getSmallestCat = function(data) {
		catnav.console.log("smallest cat!", data);
		var small = {
			cat: null,
			length: Infinity
		};
		for (var cat in data) {
			if (data[cat].length < small.length) {
				small.cat = cat;
				small.length = data[cat].length;
			}
		}
		return small.cat; // return name of property with the smallest number of items
	};

	// divide to pages - take a long list of titles, and split them to groups, each with no more than 'n' titles
	catnav.fn.divideToPages = function(titles) {
		var result = [];
		while (titles.length > 0) {
			result.push(titles.splice(0, catnav.settings.itemsInNavigator * catnav.fn.getNumberOfRows()));
		}
		return result;
	};

	// get number of rows
	catnav.fn.getNumberOfRows = function() {
		var rows = catnav.settings.rows,
			specified = $("#catnav-rows").val();
		if ($.isNumeric(specified) && specified > 0 && specified == Math.round(specified)) {
			// specified number of rows is a valid positive integer
			rows = specified;
		}
		return rows;
	};

	/* functions for getting info about pages */

	// implement new members
	catnav.fn.implementNewTitles = function(titles, categories) { // needs 'categories' parameter if advanced category sorting is desired
		// 'titles' is an array of page titles
		catnav.fn.sortTitles(titles, categories, $('[name="catnav-sort"]:checked').val(), $('#catnav-dir').prop("checked"), function(sortedTitles) {
			var asPages = catnav.fn.divideToPages(sortedTitles); // divide the 'titles' array to a list of smaller groups of titles
			if (asPages.length > 0) {
				catnav.data.current = asPages;
				catnav.fn.onLoadingEnd();
				catnav.fn.error(0, null); // hide error
				catnav.fn.updatePagesListNav();
				catnav.fn.gotoPage(0, true);
				$("#catnav-resultscounter").text(function() {
					var n = 0,
						c = catnav.data.current,
						i;
					for (i = 0; i < c.length; i++) {
						n += c[i].length;
					}
					return n + " results found";
				});
			} else {
				catnav.fn.onLoadingEnd();
				catnav.fn.error(1, "No pages with all specified categories were found!"); // show error
			}
		});
	};

	// update pages' numbers
	catnav.fn.updatePagesListNav = function() {
		var a,
			pagenav = $("#catnav-pagenav");
		$(pagenav).html("");
		for (var i = 0; i < catnav.data.current.length; i++) {
			a = $('<a data-catnav-page="' + i + '" />').html("(" + (Number(i) + 1) + ")");
			$(pagenav).append(a);
			$(a).click(function() {
				catnav.fn.gotoPage(Number($(this).attr("data-catnav-page")));
			});
		}
	};

	// clear results
	catnav.fn.clear = function() {
		catnav.data.current = [];
		catnav.fn.updateMarkup();
		catnav.fn.updatePagesListNav();
	}

	// go to page 'n + 1'
	catnav.fn.gotoPage = function(n, uponGeneration) {
		catnav.data.selectedPage = n;
		$("#catnav-pagenav .catnav-pagenav-selected").removeClass("catnav-pagenav-selected");
		$("#catnav-pagenav a").eq(n).addClass("catnav-pagenav-selected");
		catnav.fn.queryPages(catnav.data.current[n], function(titles) {
			catnav.fn.updateMarkup(titles);
			// trigger events
			var pageloadEvent = new Event("catnavpageload");
			if (uponGeneration) {
				document.querySelector("#catnav").dispatchEvent(new Event("catnavgenerated"));
				pageloadEvent.uponGeneration = true;
			}
			document.querySelector("#catnav").dispatchEvent(pageloadEvent);
		});
	};

	// get info about pages (url, thumb, etc.)
	catnav.fn.queryPages = function(titles, cb) {
		var req = new XMLHttpRequest(),
			missingTitles = [],
			i;
		catnav.console.error(titles);
		for (i = 0; i < titles.length; i++) {
			// missingTitles lists all articles that haven't been previously loaded by 'queryPages'
			// articles already in 'catnav.data.details' will not be requested again
			if (!catnav.data.details.hasOwnProperty(titles[i])) {
				missingTitles.push(catnav.data.pageids[titles[i]]);
			}
		}
		req.open("get", mw.config.get("wgScriptPath") + "/api/v1/Articles/Details?&abstract=0&width=140&height=140&ids=" + missingTitles.join(","), true);
		req.onload = function() {
			catnav.fn.parsePagesQuery(JSON.parse(this.responseText));
			cb(titles);
		};
		if (missingTitles.length > 0) {
			// data about at least 1 page needs to be requested
			req.send();
		} else {
			// info about those pages has already loaded
			cb(titles);
		}
	};

	// process info about pages from json
	catnav.fn.parsePagesQuery = function(data) {
		for (var pageid in data.items) {
			var a = data.items[pageid],
				title = decodeURIComponent(a.url.replace(/^[^\n]*\/wiki\//, "")).replace(/_/g, " "); // a.title doesn't provide the namespace - easiest method is to do this
			catnav.data.details[title] = {
				id: a.id,
				title: title,
				url: a.url,
				img: a.thumbnail,
				lastedit: a.revision.timestamp
			};
		}
	};

	// update markup
	catnav.fn.updateMarkup = function(titles) {
		var container = $('<div />');
		for (var i in titles) {
			var a = catnav.data.details[titles[i]],
				item = $('<div class="catnav-item' + (a.img ? "" : " catnav-item-noimage") + '"><a href="' + a.url + '" title="' + a.title.replace(/["'&<>]/g, function(m) {return "&#" + m.charCodeAt(0) + ";";}) + '"><img src="' + (a.img ? a.img : mw.config.get("wgBlankImgUrl")) + '" width="140" height="140" /><span class="catnav-item-label"></span></a></div>');
			$(item).find("span").text(a.title);
			$(container).append(item);
		}
		$("#catnav-container").html($(container).html());
		//window.q = container; // lol why do i always use window.q, i keep finding old lines with this whenever i set it somewhere else in the code for debugging
	};

	// error message
	catnav.fn.error = function(bool, msg) {
		catnav.console.error(["'catnav.fn.error' call ::", {bool: bool, msg: msg}]);
		// if 'bool' show message, otherwise hide
		// 'msg' is the new html content
		$("#catnav-noneerror").html(msg)[bool ? "show" : "hide"]();
	};

	// collaps text
	catnav.fn.collapseText = function(s) {
		return s.replace(/\n+[ \t]+\n+|\n{2,}/g, "\n").trim();
	};

	// escape string for regex
	catnav.fn.stringToRegex = function(s) {
		return s.replace(/[\\\/\[\]\(\)\?\!\=\-\+\*\.\{\}\<\>\,\^\$]/g, function(a) {
			return "\\" + a;
		});
	}

	// sort pages by user preferences
	catnav.fn.sortTitles = function(titles, categories, mode, reverse, cb) {
		//window.q = [titles.concat(), mode, reverse];
		/*
			modes:
				{
					creation => by creation time
					lastedit => by last edit time
					alphabet => by alphabetic order
				}
			'reverse' is a boolean: set as true in order to reverse the list of pages in the end of the process
			'categories' parameter may be needed for specific advanced sorting methods
		*/
		/* first, check if there's need to filter titles */
		if ($("#catnav-filter-state")[0].checked) {
			var filter = {
				value: $("#catnav-filter-text").val(),
				ci: $("#catnav-filter-case")[0].checked,
				re: $("#catnav-filter-regex")[0].checked
			}
			try {
				filter.pattern = new RegExp(filter.re ? filter.value : catnav.fn.stringToRegex(filter.value), filter.ci ? "i" : "");
				// filter patterns
				titles = titles.filter(function(title) {
					if (filter.pattern.test(title)) {
						return true;
					}
				});
			} catch(err) {
				alert("Invalid regex- filter was ignored for the current search and all available titles are shown.\nPlease check your filter text (open console to view the full error message).");
				console.error("[catnav] :: regex error", err);
				catnav.console.error(err);
			}
		}

		/* start sorting */
		mode = ["bypageid", "lastedit", "alphabet"].indexOf(mode) > -1 ? mode : "alphabet";
		var sortedTitles;
		catnav.console.log("sortTitles", arguments);
		switch (mode) {
			// @ mode == "alphabet"
			case "alphabet":
				// sort by alphabet order
				sortedTitles = titles.sort();
				if (reverse) {
					sortedTitles.reverse();
				}
				cb(sortedTitles);
				break;
			// @ mode == "lastedit"
			case "lastedit":
				// sort by lastedit
				catnav.fn.queryPages(titles, function(titles) {
					// 'catnav.fn.queryPages' is required to know how to sort all titles before splitting into navpages
					var details = catnav.data.details,
						title,
						curr,
						arr = [], // array of values (last edit timestamp)
						pagesBySortingMethod = {}, // object: key => sorting method value (timestamp, value => array with titles with that associated value (in case 2+ articles have the value)
						i;
					// copy data from 'catnav.data.details' about the wanted titles
					for (title in details) {
						if (titles.indexOf(title) > -1) {
							curr = details[title]["lastedit"];
							if (arr.indexOf(Number(curr)) === -1) {
								arr.push(Number(curr));
							}
							pagesBySortingMethod[curr] = pagesBySortingMethod[curr] || [];
							pagesBySortingMethod[curr].push(title);
						}
					}
					arr.sort(function(a, b) {
						// sort by numerically ascending order
						return a - b;
					});
					sortedTitles = [];
					for (i = 0; i < arr.length; i++ ) {
						// combine the mini-arrays, from the lowest timestamp to the highest
						sortedTitles = sortedTitles.concat(pagesBySortingMethod[arr[i]]);
					}
					if (reverse) {
						sortedTitles.reverse();
					}
					window.q = {
						details: details,
						title: title,
						curr: curr,
						arr: arr,
						pagesBySortingMethod: pagesBySortingMethod,
						i: i,
						sortedTitles: sortedTitles
					};
					cb(sortedTitles);
				});
				break;

			// @ mode == "bypageid"
			case "bypageid":
				// sort by pageid (=wgArticleId)
				catnav.fn.queryPages(titles, function(titles) {
					// now when 'catnav.fn.queryPages' was used, 'catnav.data.details' has been created
					var pagesByIds = {},
						details = catnav.data.details,
						title,
						i,
						id,
						ids = [];
					// 'pagesByIds': key => pageid, value => title
					catnav.console.info("details as of running: " + JSON.stringify(details));
					for (title in details) {
						if (titles.indexOf(title) > -1) {
							id = details[title].id;
							pagesByIds[id] = title;
							ids.push(id);
						}
					}
					// sort by ascending ids
					ids.sort(function(a, b) {
						return a - b;
					});
					// map by the now-ordered ids
					sortedTitles = [];
					for (i = 0; i < ids.length; i++) {
						sortedTitles.push(pagesByIds[ids[i]]);
					}
					if (reverse) {
						sortedTitles.reverse();
					}
					cb(sortedTitles);
				});
				break;
		}
	};

	// get creation time of pages
	catnav.fn.getCreationTime = function(titles, cb) {
		// lol don't use this stupid module, while running it i figured it would be much more efficient to use wgArticleId :P
		if (titles.length === 0) {
			cb();
		} else {
			var req = new XMLHttpRequest();
			req.open("GET", mw.config.get("wgScriptPath") + "/api.php?action=query&format=json&prop=revisions&rvprop=timestamp&rvlimit=1&rvdir=newer&titles=" + encodeURIComponent(titles.shift()), true);
			// can only get 1 title at a time when getting the first revisions :(
			req.onload = function() {
				var data = JSON.parse(req.responseText),
					pageid,
					page;
				for (pageid in data.query.pages) {
					page = data.query.pages[pageid];
					catnav.data.details[page.title] = catnav.data.details[page.title] || {};
					catnav.data.details[page.title].creation = page.revisions[0].timestamp;
					// continue getting data about the remaining titles
					catnav.fn.getCreationTime(titles, cb);
				}
			};
			req.send();
		}
	};

	// manipulate storage
	catnav.fn.storage = function(method, savingData) {
		var gs = catnav.data.globalString;
		switch (method) {
			case "get":
				var storage = localStorage.getItem("catnav");
				catnav.console.log(method, storage);
				storage = storage ? JSON.parse(storage) : {favorites: {}};
				if (!storage.favorites.hasOwnProperty(gs)) {
					storage.favorites[gs] = [];
				}
				catnav.console.log(method, storage);
				return storage;
			case "set":
				localStorage.setItem("catnav", JSON.stringify(savingData));
				return true;
		}
	};

	// add favorite to list
	catnav.fn.insertFavorite = function(category) {
		var item = $('<div class="catnav-commoncats-item"></div>')
			.data({name: category})
			.text(category)
			.prepend('<img src="https://images.wikia.nocookie.net/dev/images/7/79/CatNav_delete.png" class="catnav-commoncats-item-delete" />', '&nbsp;&nbsp;');
		$(item).contextmenu(function(e) {
			if ($(e.target).is(this)) {
				e.preventDefault();
				var a = $("#catnav-textarea-exclude"),
					b = $(a).val().split("\n");
				b.push($(this).data("name"));
				$(a).val(b.join("\n").trim());
			}
		}).click(function(e) {
			catnav.console.log(e.target, this);
			if ($(e.target).is(this) && e.which === 1) {
				var a = $("#catnav-textarea-include"),
					b = $(a).val().split("\n");
				b.push($(this).data("name"));
				$(a).val(b.join("\n").trim());
			}
		});
		$(item).find("img").click(function() {
			var storage = catnav.fn.storage("get"),
				gs = catnav.data.globalString,
				fave = storage.favorites[gs],
				index = fave.indexOf($(this).parent().data("name"));
				if (index > -1) {
					fave.splice(index, 1);
					storage = catnav.fn.storage("set", storage);
					$(this).parent().remove();
				}
		});
		$("#catnav-commoncats-container").append(item);
	};

	// import global settings ([[w:Special:MyPage/catnav.css]])
	catnav.fn.addGlobalFavorites = function() {
		var user = encodeURIComponent(mw.config.get("wgUserName"));
		$.ajax({
			url: catnav.data.storage.url + (catnav.data.storage.url === "//community.fandom.com" ? "" : mw.config.get("wgScriptPath")) + "/api.php?action=query&format=json&prop=revisions&rvprop=content&titles=User:" + user + "/catnav.css&callback=catnavcb&" + new Date().getTime(),
			action: "GET",
			dataType: "jsonp",
			jsonpCallback: "catnavcb",
			success: function(data) {
				var pages = data.query.pages,
					pageid,
					content,
					cities = {},
					currCity,
					wiki = catnav.data.globalString,
					storage;
				for (pageid in pages) {
					if (pageid == -1) {
						alert("No data found. Please make sure that 'https://community.fandom.com/wiki/User:" + user + "/catnav.css' exists");
					} else {
						content = pages[pageid].revisions[0]["*"];
						content.split("\n").forEach(function(line, lineNumber) {
							catnav.console.warn(lineNumber, lineNumber + 1, line);
							var temp;
							switch (line.charAt(0)) {
								case "@":
									temp = line.substr(1).trim().toLowerCase();
									try {
										currCity = temp;
										cities[temp] = cities[temp] || [];
									} catch(err) {
										alert("Invalid wiki subdomain at line " + (lineNumber + 1) + ": " + temp);
									}
									break;
								case "#":
									temp = line.substr(1).trim();
									temp = temp.charAt(0).toUpperCase() + temp.substr(1); // make first letter uppercase per case-insensitivity in pages' initials
									if (currCity) {
										cities[currCity].push(temp);
									} else {
										alert("Error at line " + (lineNumber + 1) + ": category listed without first declaring a wiki subdomain");
									}
									break;
							}
						});
					}
					break;
				}
				if (cities.hasOwnProperty(wiki)) {
					storage = catnav.fn.storage("get");
					catnav.console.info(storage);
					cities[wiki].forEach(function(category) {
						catnav.console.info(category);
						if (storage.favorites[wiki].indexOf(category) === -1) {
							storage.favorites[wiki].push(category);
							catnav.fn.insertFavorite(category);
						}
					});
					storage = catnav.fn.storage("set", storage);
				}
			}
		});
	};

	// get sizes of categories
	catnav.fn.getCategorySizes = function(categories, sizelist, cb) {
		// arguments => ["Foo1", "Foo2", "Fooetc."], {}, function() {}
		catnav.console.log("inite :: getCategorySizes");
		var req = new XMLHttpRequest(),
			curr = categories.splice(0, 50);
		for (var i = 0; i < curr.length; i++) {
			curr[i] = "Category:" + curr[i];
		}
		req.open("GET", mw.config.get("wgScriptPath") + "/api.php?action=query&format=json&prop=categoryinfo&titles=" + encodeURIComponent(curr.join("|")) + "&cb=" + new Date().getTime(), true);
		req.onload = function() {
			var data = JSON.parse(req.responseText),
				cat,
				catname;
			for (var pageid in data.query.pages) {
				cat = data.query.pages[pageid];
				catname = cat.title.replace(/^[^\:]+\:/, "");
				if (!cat.hasOwnProperty("categoryinfo")) {
					// no category members - continue
					// note: pageid can be negative if the category is being used in pages, but its category page has yet to be created
					sizelist[catname] = 0; // note that this will be smaller than any other category!!!
					continue;
				}
				sizelist[catname] = cat.categoryinfo.size; // size = any page (including other categories) that uses this category
			}
			if (categories.length > 0) {
				// not done
				catnav.fn.getCategorySizes(categories, sizelist, cb);
			} else {
				// done
				cb(sizelist);
			}
		};
		req.send();
	};

	// when no further resources are to be loaded
	// when all required resources have loaded and processed, or when an error prevents the process completion
	catnav.fn.onLoadingEnd = function() {
		catnav.fn.unsealUI();
		$("#catnav-loading").hide();
	};

	// convert local favorites to global favorites syntax (that the user can copy and paste in their global list)
	catnav.fn.exportGlobalFavorites = function() {
		var wiki = catnav.data.globalString,
			favorites = catnav.fn.storage("get").favorites[wiki],
			lines = ["@" + wiki];
		for (var i = 0; i < favorites.length; i++) {
			lines.push("#" + favorites[i]);
		}
		return lines.join("\n");
	};

	// init
	catnav.fn.init = function() {
		// # html
		// interface markup
		$("#mw-content-text").html(catnav.data.markup.html);

		// # triggers
		// 'generate' button
		$("#catnav-go").click(function() {
			catnav.fn.clear();
			catnav.fn.sealUI();
			$("#catnav-loading").show(); // show loading text
			var incCats = catnav.fn.collapseText($("#catnav #catnav-textarea-include").val()).replace(/\n/g, "|"), // included categories
				disCats = catnav.fn.collapseText($("#catnav #catnav-textarea-exclude").val()).replace(/\n/g, "|"), // exclude categories
				catList = incCats.split("|"), // array of included categories - needed for advanced page sorting methods
				nsStr = $("#catnav-ns")[0].checked ? "0" : "";
			// get included categories (object: key => categoryname, val => array of listed pages in that category)
			if (incCats.length === 0) {
				catnav.fn.unsealUI();
				$("#catnav-loading").hide();
				catnav.fn.error(1, "Please enter at least one valid category under the \"Add from categories\" field.");
				return;
			}
			catnav.fn.catMembersMulti(incCats, nsStr, function(incData) {
				// sort the pages into a single array
				catnav.fn.joinMembers(incData, true, function(incTitles) {
					if (disCats.length === 0) {
						// no unwated categories requested - update immediately
						catnav.fn.implementNewTitles(incTitles, catList);
					} else {
						// unwated categories requiested - get their categorized pages
						catnav.fn.catMembersMulti(disCats, nsStr, function(disData) {
							// sort the pages into a single array
							catnav.fn.joinMembers(disData, false, function(disTitles) {
								for (var i in disTitles) {
									if (incTitles.indexOf(disTitles[i]) > -1) {
										// unwanted page detected - remove from 'incTitles'
										incTitles.splice(incTitles.indexOf(disTitles[i]), 1);
									}
								}
								catnav.fn.implementNewTitles(incTitles, catList);
							});
						});
					}
				});
			});
		});
		// adding categories to favorites
		$("#catnav-commoncats-add").click(function() {
			var category = prompt("Please insert a name of a category you'd like to add to favorites"),
				storage,
				gs = catnav.data.globalString;
			if (category) {
				storage = catnav.fn.storage("get");
				if (storage.favorites[gs].indexOf(category) === -1) {
					storage.favorites[gs].push(category);
					storage = catnav.fn.storage("set", storage);
					catnav.fn.insertFavorite(category);
				}
			}
		});
		// importing global categories
		$("#catnav-commoncats-global-import").click(function() {
			catnav.fn.addGlobalFavorites();
		});
		// initiating favorites
		$(function() {
			var storage = catnav.fn.storage("get"),
				gs = catnav.data.globalString,
				fave = storage.favorites[gs],
				i;
			for (i = 0; i < fave.length; i++) {
				catnav.fn.insertFavorite(fave[i]);
			}
		});
		// export global categories
		$("#catnav-commoncats-global-export").click(function() {
			$("#catnav-export-modal-textarea").val(catnav.fn.exportGlobalFavorites());
			$("#catnav-export-modal").css("display", "flex");
			$("#catnav-export-modal-textarea").select();
		});
		// close favorites export modal
		$("#catnav-export-modal-close").click(function() {
			$("#catnav-export-modal").hide();
		});
		$("#catnav-export-modal").keydown(function(e) {
			if (e.which == 27) {
				$("#catnav-export-modal").hide();
			}
		});
		$("#catnav-export-modal-textarea").keydown(function(e) {
			if (e.which == 67 && e.ctrlKey && this.selectionEnd - this.selectionStart === this.value.length) {
				// ctrl+c, while all text is selected
				// close modal after 80ms (to prevent deselection of target text before copying is done)
				setTimeout(function() {
					$("#catnav-export-modal").hide();
				}, 80);
			}
		});
		// mark as ready
		document.body.dispatchEvent(new Event("catnavready"));
	};

	// set contrast color
	catnav.fn.contrastfy = function(colorValue) {
		// myst use canvas because apparently sometimes the color value will be a color name and not a convertable hex value
		var c = document.createElement("canvas"),
			ctx,
			rgb,
			avg,
			contrast;
		c.width = 1;
		c.height = 1;
		ctx = c.getContext("2d");
		ctx.fillStyle = colorValue;
		ctx.fillRect(0, 0, 1, 1);
		rgb = ctx.getImageData(0, 0, 1, 1).data.slice(0, 3);
		avg = (rgb[0] + rgb[1] + rgb[2]) / 3;
		contrast = Math.floor(128 + avg - (avg < 128 ? 0 : 255));
		contrast = contrast.toString(16);
		contrast = contrast.length == 2 ? contrast : "0" + contrast;
		return "#" + new Array(4).join(contrast);
	};

	// seal ui fields while searching
	catnav.fn.sealUI = function() {
		$("nav#catnav .catnav-gui-group").find("textarea, input").attr("disabled", "disabled");
	}
	catnav.fn.unsealUI = function() {
		$("nav#catnav .catnav-gui-group").find("textarea, input").removeAttr("disabled");
	}

	/* ================================== *\
		# implementations
	\* ================================== */

	// check if the page is [[Special:CatNav]]
	if (mw.config.get("wgNamespaceNumber") === -1 && mw.config.get("wgTitle") == "CatNav") {
		/* css */
		if (window.importArticle) {
			// fandom
			importArticle({
				type: 'style',
				article: 'u:dev:MediaWiki:CatNav.css'
			});
		} else {
			// gamepedia
			(function(c) {
				c.rel = "stylesheet";
				c.type = "text/css";
				c.href = "https://dev.fandom.com/wiki/MediaWiki:CatNav.css?action=raw&ctype=text/css";
				document.head.appendChild(c);
			}(document.createElement("link")));
		}
		// redefine results counter
		mw.util.addCSS(
			'#catnav-resultscounter {\n' +
				// support for pre-ucp, ucp-compatible, fandom desktop, and legacy gamepedia
				// intentionally not adding fallback (e.g. 'document.body') as possible layout changes in the future might make detecting style issues problematic
				'\tcolor: ' + catnav.fn.contrastfy(getComputedStyle(document.querySelector("section#WikiaPageBackground") || document.querySelector(".WikiaPageContentWrapper") || document.querySelector("main.page__main") || document.querySelector("body > #global-wrapper > #pageWrapper > #content")).backgroundColor) + ';\n' +
			'}' +
			'#catnav .catnav-gui-group {\n' +
				'\tborder: 1px solid ' + getComputedStyle(document.body).backgroundColor + ';\n' +
            '}\n'
		);

		/* document title */
		document.title = document.title.split(" | ").map(function(a, b) {
			return b === 0 ? "CatNav" : a;
		}).join(" | ");

		/* markup */
		// export modal (main content loaded using 'catnav.fn.init'
		$("body").append(
			'<nav id="catnav-export-modal">\n' +
				'\t<nav id="catnav-export-modal-content">\n' +
					'\t\t<h3>\n' +
						'\t\t\tExport favorites\n' +
						'\t\t\t<span id="catnav-export-modal-close" />\n' +
					'\t\t</h3>\n' +
					'\t\t<p>\n' +
						'\t\t\tCopy the following data and paste it in the bottom of your <a href="//community.fandom.com/wiki/Special:MyPage/catnav.css">global settings</a>.<br />\n' +
						'\t\t\tIn case you have previously created global favorites list for the current wiki, you might want to merge the two lists.\n' +
					'\t\t</p>\n' +
					'\t\t<textarea id="catnav-export-modal-textarea"></textarea>\n' +
				'\t</nav>'+
			'</nav>'
		);
		// update titles
		$(".page-header__title").html("CatNav");

		// init
		catnav.fn.init();

		// provide global access
		CatNav.init = catnav.fn.init;
	} else {
		// this is not [[Special:CatNav]]
		CatNav.init = function() {
			catnav.console.warn("catnav :: 'CatNav.init' was requested, but has not been defined on [[Special:CatNav]]");
		};
	}
});