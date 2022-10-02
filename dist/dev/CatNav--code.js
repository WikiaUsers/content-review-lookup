/*
	allow a category navigation based on a list of categories (instead of the usual single category navigation)
*/

// Used files: [[File:CatNav delete.png]]

// note: the 'section#WikiaPageBackground' selector in the bottom is used for non-ucp wikis. may be removed in the future once all wikis have been transfered to the unified community platform
/* <nowiki> */
;(function(window, $, mw) {
	'use strict';
	var config = mw.config.get([
		'wgTitle',
		'wgNamespaceNumber',
		'wgArticlePath',
		'wgScriptPath',
		'wgBlankImgUrl',
		'wgUserName'
	]);
	// re-add wgBlankImgUrl since it is no longer available as a wg variable in Fandom
	// from CSS-Tricks
	// https://css-tricks.com/snippets/html/base64-encode-of-1x1px-transparent-gif/
	config.wgBlankImgUrl = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
	var msg;

	var cndata = { // catnav data
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
	var settings = {
		rows: 3, // default number of rows
		itemsInNavigator: Math.floor(($("#mw-content-text").width() - 100) / 146) // number of columns determined by the width of the user's screen
	};
	
	/* ================================== *\
		# wiki links to [[Special:CatNav]]
	\* ================================== */
	$("#WikiaBarWrapper .tools").append('<li><a href="' + config.wgArticlePath.replace("$1", "Special:CatNav") + '">CatNav</a></li>');

	/* ================================== *\
		# console
	\* ================================== */

	var customConsole = {
		logs: [],
		debug: true // will be changed to 'false' after defining data, unless 'window.CatNav.debug' is also 'true'
	};
	customConsole.add = function(type, data) {
		var debug = customConsole.debug;
		if (["log", "error", "info", "warn"].indexOf(type) > -1) {
			type = "log";
		}
		customConsole.logs.push([type, debug, data]);
		if (debug) {
			console[type]("[-] CatNav :: ", data);
		}
	};
	customConsole.log = function(data) {
		customConsole.add("log", data);
	};
	customConsole.error = function(data) {
		customConsole.add("error", data);
	};
	customConsole.info = function(data) {
		customConsole.add("info", data);
	};
	customConsole.warn = function(data) {
		customConsole.add("warn", data);
	};
	
	// error message
	function errorMsg(bool, msg) {
		customConsole.error(["'errorMsg' call ::", {bool: bool, msg: msg}]);
		// if 'bool' show message, otherwise hide
		// 'msg' is the new html content
		$("#catnav-noneerror").html(msg)[bool ? "show" : "hide"]();
	}

	// collaps text
	function collapseText(s) {
		return s.replace(/\n+[ ]+\n+|\n{2,}/g, "\n").trim();
	}

	// escape string for regex
	function stringToRegex(s) {
		return s.replace(/[\\\/\[\]\(\)\?\!\=\-\+\*\.\{\}\<\>\,\^\$]/g, function(a) {
			return "\\" + a;
		});
	}
	
	// html
	function htmlContent() {
		return '<nav id="catnav">' +
			'<p>' + msg('instruction').escape() + '</p>' +
			// categories' input
			'<div class="catnav-gui-group">' +
				'<div class="catnav-commoncats">' +
					'<h3>' +
						msg('commonCats').escape() +
						'&nbsp;<input type="button" class="wds-button" value="add" id="catnav-commoncats-add" />' +
					'</h3>' +
					'<h5>' +
						msg('merge').parse() +
						'&nbsp;<input type="button" class="wds-button catnav-commoncats-global" value="import" id="catnav-commoncats-global-import" />' +
						'&nbsp;<input type="button" class="wds-button catnav-commoncats-global" value="export" id="catnav-commoncats-global-export" />' +
					'</h5>' +
					'<div id="catnav-commoncats-wrapper">' +
					'<span style="font-size: smaller;">' + msg('click').escape() + '</span>' +
						'<div id="catnav-commoncats-container">' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<table><tbody>' +
					'<tr>' +
						'<th>' + msg('addFrom').escape() + '</th>' +
						'<th>' + msg('notFrom').escape() + '</th>' +
					'</tr>' +
					'<tr>' +
						'<td><textarea id="catnav-textarea-include"></textarea></td>' +
						'<td><textarea id="catnav-textarea-exclude"></textarea></td>' +
					'</tr>' +
				'</tbody></table>' +
			'</div>' +
			// filter options
			'<div class="catnav-gui-group">' +
				'<p>' +
					'<input type="checkbox" id="catnav-filter-state" /><label for="catnav-filter-state">Filter page titles</label><br />' +
					'<input type="text" id="catnav-filter-text" placeholder="Filter pattern" /><br />' +
					'<input type="checkbox" id="catnav-filter-case" checked /><label for="catnav-filter-case">Case-insensitive search</label><br />' +
					'<input type="checkbox" id="catnav-filter-regex" /><label for="catnav-filter-regex">Regex pattern</label>' +
				'</p>' +
			'</div>' +
			// settings
			'<div class="catnav-gui-group">' +
				'<p>' +
					msg('rowsNumber').escape() + ' <input type="text" id="catnav-rows" value="3" /><br />' +
					'<input type="checkbox" id="catnav-ns" checked /><label for="catnav-ns">' + msg('nsOnly').escape() + '</label><br />' +
					'<input type="radio" name="catnav-sort" id="catnav-sort-alphabet" value="alphabet" checked /><label for="catnav-sort-alphabet">' + msg('sortAlphabet').escape() + '</label> <span style="font-size: 66%;">' + msg('alphabeticAlert').escape() + '</span><br />' +
					'<input type="radio" name="catnav-sort" id="catnav-sort-bypageid" value="bypageid" /><label for="catnav-sort-bypageid">' + msg('sortID').escape() + '</label><br />' +
					'<!-- <input type="radio" name="catnav-sort" id="catnav-sort-creation" value="creation" /><label for="catnav-sort-creation">' + msg('sortCreation').escape() + '</label><br /> -->' +
					'<input type="radio" name="catnav-sort" id="catnav-sort-lastedit" value="lastedit" /><label for="catnav-sort-lastedit">' + msg('sortLastEdit').escape() + '</label><br />' +
					'<input type="checkbox" id="catnav-dir" /><label for="catnav-dir">' + msg('descending').escape() + '</label><br />' +
				'</p>' +
				'<input type="button" class="wds-button" id="catnav-go" value="generate" /> <span id="catnav-loading">' +
					'<svg width="12" height="12" style="margin-right: 4px;">' +
						'<style type="text/css"><![CDATA[@keyframes spin{to{transform:rotate(360deg);}}circle{animation: spin 1s linear infinite;transform-origin:6px 6px;}]]></style>' +
						'<circle cx="6" cy="6" r="5.5" fill="none" stroke="#999" stroke-dasharray="8.63937979737193 8.63937979737193" />' +
					'</svg>' +
					msg('loading').escape() +
				'</span>' +
			'</div>' +
			// error messages
			'<div id="catnav-noneerror" style="display: none;">' +
				msg('noPagesFound').escape() +
			'</div>' +
			// nav result
			'<div id="catnav-container">' +
			'</div>' +
			'<div id="catnav-resultscounter">' +
			'</div>' +
			'<div id="catnav-pagenav">' +
			'</div>' +
			// lol what is this even...
			'<div id="catnav-generator">' +
			'</div>' +
		'</nav>';
	}
	
	/* global favorites */
	var globalString = location.href.match(/^https?\:\/{2}(.+)\.fandom\.com(?:\/(.+))?\/wiki\//);
	globalString = (typeof globalString[2] === "string" ? globalString[2] + "." : "") + globalString[1];
	
	// get members of a given category
	function catMembers(cat, ns, arr, cont, cb) {
		/*
		getMembersOfCat("Foo", 0, [], "", function(data) {
			customConsole.log(data);
		});
		*/
		var req = new XMLHttpRequest();
		req.open("GET", config.wgScriptPath + "/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:" + encodeURIComponent(cat) + "&cmnamespace=" + ns + "&cmcontinue=" + encodeURIComponent(cont) + "&rawcontinue=&cmlimit=max&cb=" + new Date().getTime(), true);
		req.onload = function() {
			var data = JSON.parse(this.responseText);
			if (data.hasOwnProperty("query")) {
				var a = data.query.categorymembers,
					b;
				for (var i in a) {
					b = a[i];
					arr.push(b.title);
					cndata.pageids[b.title] = b.pageid;
				}
				if (typeof data["query-continue"] === "object") {
					return catMembers(cat, ns, arr, data["query-continue"].categorymembers.cmcontinue, cb);
				} else {
					cb(arr);
				}
			} else {
				onLoadingEnd();
				errorMsg(1, msg('errorLooking', cat).escape() + "<br />\n" + msg('errorCode').escape() + " <code>" + data.error.code + "</code><br />\n" + msg('errorInfo').escape() + " " + data.error.info + "<br /><hr />" + msg('noEmptyLines').escape());
			}
		};
		req.send();
	}

	// get members of multiple categories
	function catMembersMulti(catstr, ns, cb) {
		var cats = catstr.split("|"),
			completed = 0,
			allcats = {};
		function query() {
			if (completed == cats.length) {
				// all requests have been made
				cb(allcats);
			} else {
				catMembers(cats[completed], ns, [], "", function(data) {
					allcats[cats[completed]] = data;
					completed++;
					query();
				});
			}
		}
		query();
	}

	// search for members that exist in all specified categories
	function joinMembers(data, isCommonMembers, fn) {
		var smallestCat,
			finalList = [];
		if (isCommonMembers === true) {
			// mode for the "find-in-categories" list: only list a page if it has all the listed categories
			smallestCat = data[getSmallestCat(data)]; // start from smallest category - should take less time
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
			for (var cat2 in data) {
				for (var j in data[cat2]) {
					var currCat = data[cat2][j];
					if (finalList.indexOf(finalList) == -1) {
						// although we categorize all pages, we still don't want a category to repeat- it's time consuming and pointless
						finalList.push(currCat);
					}
				}
			}
		}
		fn(finalList);
	}

	// find the category with the fewest members
	function getSmallestCat(data) {
		customConsole.log("smallest cat!", data);
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
	}

	// divide to pages - take a long list of titles, and split them to groups, each with no more than 'n' titles
	function divideToPages(titles) {
		var result = [];
		while (titles.length > 0) {
			result.push(titles.splice(0, settings.itemsInNavigator * getNumberOfRows()));
		}
		return result;
	}

	// get number of rows
	function getNumberOfRows() {
		var rows = settings.rows,
			specified = $("#catnav-rows").val();
		if ($.isNumeric(specified) && specified > 0 && specified == Math.round(specified)) {
			// specified number of rows is a valid positive integer
			rows = specified;
		}
		return rows;
	}
	
	// implement new members
	function implementNewTitles(titles, categories) { // needs 'categories' parameter if advanced category sorting is desired
		// 'titles' is an array of page titles
		sortTitles(titles, categories, $('[name="catnav-sort"]:checked').val(), $('#catnav-dir').prop("checked"), function(sortedTitles) {
			var asPages = divideToPages(sortedTitles); // divide the 'titles' array to a list of smaller groups of titles
			if (asPages.length > 0) {
				cndata.current = asPages;
				onLoadingEnd();
				errorMsg(0, null); // hide error
				updatePagesListNav();
				gotoPage(0, true);
				$("#catnav-resultscounter").text(function() {
					var n = 0,
						c = cndata.current,
						i;
					for (i = 0; i < c.length; i++) {
						n += c[i].length;
					}
					return n + " " + msg('results', n).plain();
				});
			} else {
				onLoadingEnd();
				errorMsg(1, msg('nothingFound').escape()); // show error
			}
		});
	}

	// update pages' numbers
	function updatePagesListNav() {
		var a,
			pagenav = $("#catnav-pagenav");
		$(pagenav).html("");
		for (var i = 0; i < cndata.current.length; i++) {
			a = $('<a data-catnav-page="' + i + '" />').html("(" + (Number(i) + 1) + ")");
			$(pagenav).append(a);
			$(a).click(function() {
				gotoPage(Number($(this).attr("data-catnav-page")));
			});
		}
	}

	// clear results
	function clear() {
		cndata.current = [];
		updateMarkup();
		updatePagesListNav();
	}

	// go to page 'n + 1'
	function gotoPage(n, uponGeneration) {
		cndata.selectedPage = n;
		$("#catnav-pagenav .catnav-pagenav-selected").removeClass("catnav-pagenav-selected");
		$("#catnav-pagenav a").eq(n).addClass("catnav-pagenav-selected");
		queryPages(cndata.current[n], function(titles) {
			updateMarkup(titles);
			// trigger events
			var pageloadEvent = new Event("catnavpageload");
			if (uponGeneration) {
				document.querySelector("#catnav").dispatchEvent(new Event("catnavgenerated"));
				pageloadEvent.uponGeneration = true;
			}
			document.querySelector("#catnav").dispatchEvent(pageloadEvent);
		});
	}

	// query missing titles for queryPages
	function queryMissingPages(missingTitles, cb, totalRequestLength) {
		var req = new XMLHttpRequest(),
			f = new FormData(),
			fD,
			fDProp,
			maxTitlesPerRequest = 500, // limit max titles per request, for very large requests can cause load issues
			currentTitlesToCheck = missingTitles.splice(0, maxTitlesPerRequest), // titles for the current check
			i;
		customConsole.error(currentTitlesToCheck);
		// check if there are any titles to check
		if (currentTitlesToCheck.length === 0) {
			// data about at least 1 page needs to be requested
			$("#catnav-loading-fandomapi-progress").remove();
			cb();
			return;
		}
		// form data for requestest
		fD = {
			abstract: 0,
			width: 140,
			height: 140,
			ids: currentTitlesToCheck.join(",")
		};
		for (fDProp in fD) {
			f.append(fDProp, fD[fDProp]);
		}
		// the actual request
		req.open("POST", config.wgScriptPath + "/api/v1/Articles/Details", true);
		req.onload = function() {
			parsePagesQuery(JSON.parse(this.responseText));
			// call queryMissingPages again in case there are more titles left
			queryMissingPages(missingTitles, cb, totalRequestLength);
		};
		$("#catnav-loading-fandomapi-progress").text(((1 - (missingTitles.length + currentTitlesToCheck.length) / totalRequestLength) * 100).toFixed(2) + "%");
		req.send(f);
	}

	// get info about pages (url, thumb, etc.)
	function queryPages(titles, cb) {
		var missingTitles = [],
			i;
		for (i = 0; i < titles.length; i++) {
			// missingTitles lists all articles that haven't been previously loaded by 'queryPages'
			// articles already in 'cndata.details' will not be requested again
			if (!cndata.details.hasOwnProperty(titles[i])) {
				missingTitles.push(cndata.pageids[titles[i]]);
			}
		}
		// query all missing titles
		$("#catnav-loading").append('<span id="catnav-loading-fandomapi-progress"></span>');
		queryMissingPages(missingTitles, function() {
			// call queryPages's own cb() and pass the original titles
			cb(titles);
		}, missingTitles.length);
	}

	// process info about pages from json
	function parsePagesQuery(data) {
		for (var pageid in data.items) {
			var a = data.items[pageid],
				title = decodeURIComponent(a.url.replace(/^[^\n]*\/wiki\//, "")).replace(/_/g, " "); // a.title doesn't provide the namespace - easiest method is to do this
			cndata.details[title] = {
				id: a.id,
				title: title,
				url: a.url,
				img: a.thumbnail,
				lastedit: a.revision.timestamp
			};
		}
	}

	// update markup
	function updateMarkup(titles) {
		var container = $('<div />');
		for (var i in titles) {
			var a = cndata.details[titles[i]],
				item = $('<div class="catnav-item' + (a.img ? "" : " catnav-item-noimage") + '"><a href="' + a.url + '" title="' + a.title.replace(/["'&<>]/g, function(m) {return "&#" + m.charCodeAt(0) + ";";}) + '"><img src="' + (a.img ? a.img : config.wgBlankImgUrl) + '" width="140" height="140" /><span class="catnav-item-label"></span></a></div>');
			$(item).find("span").text(a.title);
			$(container).append(item);
		}
		$("#catnav-container").html($(container).html());
		//window.q = container; // lol why do i always use window.q, i keep finding old lines with this whenever i set it somewhere else in the code for debugging
	}
	
	// sort pages by user preferences
	function sortTitles(titles, categories, mode, reverse, cb) {
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
			};
			try {
				filter.pattern = new RegExp(filter.re ? filter.value : stringToRegex(filter.value), filter.ci ? "i" : "");
				// filter patterns
				titles = titles.filter(function(title) {
					if (filter.pattern.test(title)) {
						return true;
					}
				});
			} catch(err) {
				alert(msg('regex').escape());
				console.error("[catnav] :: regex error", err);
				customConsole.error(err);
			}
		}

		/* start sorting */
		mode = ["bypageid", "lastedit", "alphabet"].indexOf(mode) > -1 ? mode : "alphabet";
		var sortedTitles;
		customConsole.log("sortTitles", arguments);
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
				queryPages(titles, function(titles) {
					// 'queryPages' is required to know how to sort all titles before splitting into navpages
					var details = cndata.details,
						title,
						curr,
						arr = [], // array of values (last edit timestamp)
						pagesBySortingMethod = {}, // object: key => sorting method value (timestamp, value => array with titles with that associated value (in case 2+ articles have the value)
						i;
					// copy info from 'cndata.details' about the wanted titles
					for (title in details) {
						if (titles.indexOf(title) > -1) {
							curr = details[title].lastedit;
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
				queryPages(titles, function(titles) {
					// now when 'queryPages' was used, 'cndata.details' has been created
					var pagesByIds = {},
						details = cndata.details,
						title,
						i,
						id,
						ids = [];
					// 'pagesByIds': key => pageid, value => title
					customConsole.info("details as of running: " + JSON.stringify(details));
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
	}
	
	// get creation time of pages
	function getCreationTime(titles, cb) {
		// lol don't use this stupid module, while running it i figured it would be much more efficient to use wgArticleId :P
		if (titles.length === 0) {
			cb();
		} else {
			var req = new XMLHttpRequest();
			req.open("GET", config.wgScriptPath + "/api.php?action=query&format=json&prop=revisions&rvprop=timestamp&rvlimit=1&rvdir=newer&titles=" + encodeURIComponent(titles.shift()), true);
			// can only get 1 title at a time when getting the first revisions :(
			req.onload = function() {
				var data = JSON.parse(req.responseText),
					pageid,
					page;
				for (pageid in data.query.pages) {
					page = data.query.pages[pageid];
					cndata.details[page.title] = cndata.details[page.title] || {};
					cndata.details[page.title].creation = page.revisions[0].timestamp;
					// continue getting info about the remaining titles
					getCreationTime(titles, cb);
				}
			};
			req.send();
		}
	}

	// manipulate storage
	function storageFn(method, savingData) {
		var gs = globalString;
		switch (method) {
			case "get":
				var store = localStorage.getItem("catnav");
				customConsole.log(method, store);
				store = store ? JSON.parse(store) : {favorites: {}};
				if (!store.favorites.hasOwnProperty(gs)) {
					store.favorites[gs] = [];
				}
				customConsole.log(method, store);
				return store;
			case "set":
				localStorage.setItem("catnav", JSON.stringify(savingData));
				return true;
		}
	}

	// add favorite to list
	function insertFavorite(category) {
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
			customConsole.log(e.target, this);
			if ($(e.target).is(this) && e.which === 1) {
				var a = $("#catnav-textarea-include"),
					b = $(a).val().split("\n");
				b.push($(this).data("name"));
				$(a).val(b.join("\n").trim());
			}
		});
		$(item).find("img").click(function() {
			var storage = storageFn("get"),
				gs = globalString,
				fave = storage.favorites[gs],
				index = fave.indexOf($(this).parent().data("name"));
				if (index > -1) {
					fave.splice(index, 1);
					storage = storageFn("set", storage);
					$(this).parent().remove();
				}
		});
		$("#catnav-commoncats-container").append(item);
	}

	// import global settings ([[w:Special:MyPage/catnav.css]])
	function addGlobalFavorites() {
		var user = encodeURIComponent(config.wgUserName);
		$.ajax({
			url: cndata.storage.url + (cndata.storage.url === "//community.fandom.com" ? "" : config.wgScriptPath) + "/api.php?" + new Date().getTime(),
			data: {
				action: 'query',
				format: 'json',
				prop: 'revisions',
				rvprop: 'content',
				titles: 'User:' + user + '/catnav.css',
				callback: 'catnavcb'
			},
			action: "GET",
			dataType: "jsonp",
			jsonpCallback: "catnavcb",
			success: function(data) {
				var pages = data.query.pages,
					pageid,
					content,
					cities = {},
					currCity,
					wiki = globalString,
					storage;
				for (pageid in pages) {
					if (pageid == -1) {
						alert(msg('checkCSS').escape());
					} else {
						content = pages[pageid].revisions[0]["*"];
						content.split("\n").forEach(function(line, lineNumber) {
							customConsole.warn(lineNumber, lineNumber + 1, line);
							var temp;
							switch (line.charAt(0)) {
								case "@":
									temp = line.substr(1).trim().toLowerCase();
									try {
										currCity = temp;
										cities[temp] = cities[temp] || [];
									} catch(err) {
										alert(msg('invalidSubdomain', lineNumber + 1).escape() + " " + temp);
									}
									break;
								case "#":
									temp = line.substr(1).trim();
									temp = temp.charAt(0).toUpperCase() + temp.substr(1); // make first letter uppercase per case-insensitivity in pages' initials
									if (currCity) {
										cities[currCity].push(temp);
									} else {
										alert(msg('categoryAlert', lineNumber + 1).escape());
									}
									break;
							}
						});
					}
					break;
				}
				if (cities.hasOwnProperty(wiki)) {
					storage = storageFn("get");
					customConsole.info(storage);
					cities[wiki].forEach(function(category) {
						customConsole.info(category);
						if (storage.favorites[wiki].indexOf(category) === -1) {
							storage.favorites[wiki].push(category);
							insertFavorite(category);
						}
					});
					storage = storageFn("set", storage);
				}
			}
		});
	}
	
	// get sizes of categories
	function getCategorySizes(categories, sizelist, cb) {
		// arguments => ["Foo1", "Foo2", "Fooetc."], {}, function() {}
		customConsole.log("inite :: getCategorySizes");
		var req = new XMLHttpRequest(),
			curr = categories.splice(0, 50);
		for (var i = 0; i < curr.length; i++) {
			curr[i] = "Category:" + curr[i];
		}
		req.open("GET", config.wgScriptPath + "/api.php?action=query&format=json&prop=categoryinfo&titles=" + encodeURIComponent(curr.join("|")) + "&cb=" + new Date().getTime(), true);
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
				getCategorySizes(categories, sizelist, cb);
			} else {
				// done
				cb(sizelist);
			}
		};
		req.send();
	}

	// when no further resources are to be loaded
	// when all required resources have loaded and processed, or when an error prevents the process completion
	function onLoadingEnd() {
		unsealUI();
		$("#catnav-loading").hide();
	}

	// convert local favorites to global favorites syntax (that the user can copy and paste in their global list)
	function exportGlobalFavorites() {
		var wiki = globalString,
			favorites = storageFn("get").favorites[wiki],
			lines = ["@" + wiki];
		for (var i = 0; i < favorites.length; i++) {
			lines.push("#" + favorites[i]);
		}
		return lines.join("\n");
	}

	// init
	function initMain() {
		// # html
		// interface markup
		$("#mw-content-text").html(htmlContent());

		// # triggers
		// 'generate' button
		$("#catnav-go").click(function() {
			clear();
			sealUI();
			$("#catnav-loading").show(); // show loading text
			var incCats = collapseText($("#catnav #catnav-textarea-include").val()).replace(/\n/g, "|"), // included categories
				disCats = collapseText($("#catnav #catnav-textarea-exclude").val()).replace(/\n/g, "|"), // exclude categories
				catList = incCats.split("|"), // array of included categories - needed for advanced page sorting methods
				nsStr = $("#catnav-ns")[0].checked ? "0" : "";
			// get included categories (object: key => categoryname, val => array of listed pages in that category)
			if (incCats.length === 0) {
				unsealUI();
				$("#catnav-loading").hide();
				errorMsg(1, "Please enter at least one valid category under the \"Add from categories\" field.");
				return;
			}
			catMembersMulti(incCats, nsStr, function(incData) {
				// sort the pages into a single array
				joinMembers(incData, true, function(incTitles) {
					if (disCats.length === 0) {
						// no unwated categories requested - update immediately
						implementNewTitles(incTitles, catList);
					} else {
						// unwated categories requiested - get their categorized pages
						catMembersMulti(disCats, nsStr, function(disData) {
							// sort the pages into a single array
							joinMembers(disData, false, function(disTitles) {
								for (var i in disTitles) {
									if (incTitles.indexOf(disTitles[i]) > -1) {
										// unwanted page detected - remove from 'incTitles'
										incTitles.splice(incTitles.indexOf(disTitles[i]), 1);
									}
								}
								implementNewTitles(incTitles, catList);
							});
						});
					}
				});
			});
		});
		// adding categories to favorites
		$("#catnav-commoncats-add").click(function() {
			var category = prompt(msg('insertCategory').escape()),
				storage,
				gs = globalString;
			if (category) {
				storage = storageFn("get");
				if (storage.favorites[gs].indexOf(category) === -1) {
					storage.favorites[gs].push(category);
					storage = storageFn("set", storage);
					insertFavorite(category);
				}
			}
		});
		// importing global categories
		$("#catnav-commoncats-global-import").click(function() {
			addGlobalFavorites();
		});
		// initiating favorites
		$(function() {
			var storage = storageFn("get"),
				gs = globalString,
				fave = storage.favorites[gs],
				i;
			for (i = 0; i < fave.length; i++) {
				insertFavorite(fave[i]);
			}
		});
		// export global categories
		$("#catnav-commoncats-global-export").click(function() {
			$("#catnav-export-modal-textarea").val(exportGlobalFavorites());
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
	}

	// set contrast color
	function contrastfy(colorValue) {
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
	}

	// seal ui fields while searching
	function sealUI() {
		$("nav#catnav .catnav-gui-group").find("textarea, input").attr("disabled", "disabled");
	}
	function unsealUI() {
		$("nav#catnav .catnav-gui-group").find("textarea, input").removeAttr("disabled");
	}
	
	function init() {
		/* ================================== *\
			# global CatNav object management
		\* ================================== */
		var catnav = {};
		if (catnav._g instanceof Object) {
			// global CatNav is an object
			if (Array.isArray(catnav._g.storage)) {
				// import+export storage - base url to hosting wiki
				cndata.storage.url = catnav._g.storage[0];
				cndata.storage.scriptPath = catnav._g.storage[1];
			} else if (catnav._g.hasOwnProperty("storage")) {
				customConsole.error("catnav :: global 'CatNav.storage' has been defined, but it is not a valid array");
			}
		} else {
			// window.CatNav has not been defined - define it
			window.CatNav = {};
		}
		if (window.CatNav.debug !== true) {
			customConsole.debug = false;
		}
	

		/* ================================== *\
			# implementations
		\* ================================== */

		importArticles({
			type: 'script',
			articles: 'u:dev:MediaWiki:I18n-js/code.js'
		});
		/* css */
		importArticle({
			type: 'style',
			article: 'u:dev:MediaWiki:CatNav.css'
		});
		// redefine results counter
		mw.util.addCSS(
			'#catnav-resultscounter {' +
				// support for pre-ucp, ucp-compatible, fandom desktop, and legacy gamepedia
				// intentionally not adding fallback (e.g. 'document.body') as possible layout changes in the future might make detecting style issues problematic
				'color: ' + contrastfy(getComputedStyle(document.querySelector("section#WikiaPageBackground") || document.querySelector(".WikiaPageContentWrapper") || document.querySelector("main.page__main") || document.querySelector("body > #global-wrapper > #pageWrapper > #content")).backgroundColor) + ';' +
			'}' +
			'#catnav .catnav-gui-group {' +
				'border: 1px solid ' + getComputedStyle(document.body).backgroundColor + ';' +
	        '}\n'
		);
	
		/* document title */
		document.title = document.title.split(" | ").map(function(a, b) {
			return b === 0 ? "CatNav" : a;
		}).join(" | ");
	
		/* markup */
		// export modal (main content loaded using 'initMain'
		$("body").append(
			'<nav id="catnav-export-modal">' +
				'<nav id="catnav-export-modal-content">' +
					'<h3>' +
						msg('exportFavs').escape() +
						'<span id="catnav-export-modal-close" />' +
					'</h3>' +
					'<p>' +
						msg('copyAndPaste').parse() + '<br />' + msg('mergeTwo').escape() +
					'</p>' +
					'<textarea id="catnav-export-modal-textarea"></textarea>' +
				'</nav>'+
			'</nav>'
		);
		// update titles
		$(".page-header__title").html("CatNav");

		// init
		initMain();

		// provide global access
		window.CatNav.init = initMain;
	}
	// check if the page is [[Special:CatNav]]
	if (config.wgNamespaceNumber === -1 && config.wgTitle === "CatNav") {
		mw.hook('dev.i18n').add(function (i18n) {
			i18n.loadMessages('CatNav').done(function (i18no) {
				msg = i18no.msg;
				init();
			});
		});
		importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });
	} else {
		// this is not [[Special:CatNav]]
		window.CatNav.init = function() {
			customConsole.warn("catnav :: 'CatNav.init' was requested, but has not been defined on [[Special:CatNav]]");
		};
	}
})(window, window.jQuery, window.mediaWiki);
/* </nowiki> */