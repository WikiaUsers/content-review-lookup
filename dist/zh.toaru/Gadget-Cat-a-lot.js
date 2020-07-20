// <nowiki>
//
// Cat-A-Lot
// Changes category of multiple files
//
// Originally by Magnus Manske
// RegExes by Ilmari Karonen
// Completely rewritten by DieBuche
//
// Requires [[MediaWiki:Gadget-SettingsManager.js]] and [[MediaWiki:Gadget-SettingsUI.js]] (properly registered) for per-user-settings
//
// READ THIS PAGE IF YOU WANT TO TRANSLATE OR USE THIS ON ANOTHER SITE:
// http://commons.wikimedia.org/wiki/MediaWiki:Gadget-Cat-a-lot.js/translating
// jshint valid

/*global jQuery:false, mediaWiki:false, alert:false, importStylesheet:false */
/*jshint curly:false, smarttabs:true, loopfunc:true*/

(function($, mw) {
'use strict';

var nsNumber = mw.config.get('wgNamespaceNumber'),
	nsCat = 14,
	currentCat = mw.config.get('wgTitle'),
	formattedNS = mw.config.get('wgFormattedNamespaces'),
	nsIDs = mw.config.get('wgNamespaceIds'),
	catALot;

catALot = window.catALot = {
	apiUrl: mw.util.wikiScript('api'),
	searchmode: false,
	version: 3.5,
	setHeight: 450,
	settings: {},
	init: function() {
		this._initSettings();
		$("body").append('<div id="cat_a_lot">' + 
			'<div id="cat_a_lot_data"><div>' + '<input type="text" id="cat_a_lot_searchcatname" placeholder="' + this.i18n.enterName + '"/>' + '</div>' + 
				'<div id="cat_a_lot_category_list"></div>' + 
				'<div id="cat_a_lot_mark_counter"> </div>' + 
				'<div id="cat_a_lot_selections">' + this.i18n.select + 
					' <a id="cat_a_lot_select_all">' + this.i18n.all + '</a> / ' + 
					'<a id="cat_a_lot_select_none">' + this.i18n.none + '</a>' + 
				'</div>' +
				'<div id="cat_a_lot_settings"><a id="cat_a_lot_config_settings">' + this.i18n.configSettings + '</a></div></div>' + 
			'<div id="cat_a_lot_head">' + '<a id="cat_a_lot_toggle">Cat-a-lot</a></div></div>');

		if (!this.searchmode) $('#cat_a_lot_selections').append('<br><a id="cat_a_lot_remove"><b>' + this.i18n.removeFromCat + '</b></a>');
		
		if ('MediaWiki:Gadget-Cat-a-lot.js' === mw.util.getParamValue('withJS') && !mw.util.getParamValue('withCSS')) {
			importStylesheet('MediaWiki:Gadget-Cat-a-lot.css');
		}

		var $searchName = $('#cat_a_lot_searchcatname'),
			reCat = new RegExp('^\\s*' + catALot.localizedRegex(nsCat, 'Category') + ':', '');
			
		$searchName.keypress(function(e) {
			if (e.which === 13) {
				catALot.updateCats($.trim($(this).val()));
			}
		}).autocomplete({
			source: function(request, response) {
				catALot.doAPICall({
					action: 'opensearch',
					search: request.term,
					namespace: nsCat
				}, function(data) {
					if (data[1]) response($(data[1]).map(function(index, item) {
						return item.replace(reCat, '');
					}));
				});
			},
			open: function() {
				$(".ui-autocomplete").position({
					my: $('body').is('.rtl') ? "left bottom" : "right bottom",
					at: $('body').is('.rtl') ? "left top" : "right top",
					of: $('#cat_a_lot_searchcatname')
				});
			},
			appendTo: '#cat_a_lot'
		}).bind('input keyup', function() {
			var oldVal = this.value,
				newVal = oldVal.replace(reCat, '');
			if (newVal !== oldVal) this.value = newVal;
		});
		if (this.searchmode) {
			$searchName.val(mw.util.getParamValue('search'));
		}
		
		$('#cat_a_lot_remove').click(function() {
			catALot.remove();
		});
		$('#cat_a_lot_select_all').click(function() {
			catALot.toggleAll(true);
		});
		$('#cat_a_lot_select_none').click(function() {
			catALot.toggleAll(false);
		});
		$('#cat_a_lot_toggle').click(function() {
			$(this).toggleClass('cat_a_lot_enabled');
			catALot.run();
		});
		$('#cat_a_lot_config_settings').click(function(e) {
			catALot.manageSettings();
		});

		this.localCatName = formattedNS[nsCat];
	},
	findAllLabels: function() {
		// It's possible to allow any kind of pages as well but what happens if you click on "select all" and don't expect it
		if (this.searchmode) {
			this.labels = $('table.searchResultImage').find('tr>td:eq(1)');
			if (this.settings.editpages) {
				this.labels = this.labels.add('div.mw-search-result-heading');
			}
		} else {
			this.labels = $('div.gallerytext').add($('div#mw-category-media').find('li[class!="gallerybox"]'));
			
			if (this.settings.editpages) {
				var $pgs = $('div#mw-pages, div#mw-subcategories').find('li');
				this.labels = this.labels.add($pgs);
			}
		}
	},
	
	getTitleFromLink: function(href) {
		try {
			return decodeURIComponent(href).match(/wiki\/(.+?)(?:#.+)?$/)[1].replace(/_/g, ' ');
		} catch (ex) {
			return '';
		}
	},

	getMarkedLabels: function() {
		var marked = [];
		this.selectedLabels = this.labels.filter('.cat_a_lot_selected');
		this.selectedLabels.each(function() {
			var file = $(this).find('a[title]'),
				title = file.attr('title') || catALot.getTitleFromLink(file.attr('href')) || catALot.getTitleFromLink($(this).find('a').attr('href'));
				
			marked.push([title, $(this)]);
		});
		return marked;
	},

	updateSelectionCounter: function() {
		this.selectedLabels = this.labels.filter('.cat_a_lot_selected');
		$('#cat_a_lot_mark_counter').show().text(this.selectedLabels.length + this.i18n.filesSelected);
	},

	makeClickable: function() {
		this.findAllLabels();
		this.labels.catALotShiftClick(function() {
			catALot.updateSelectionCounter();
		}).addClass('cat_a_lot_label');
	},

	toggleAll: function(select) {
		this.labels.toggleClass('cat_a_lot_selected', select);
		this.updateSelectionCounter();
	},

	getSubCats: function() {
		var data = {
			action: 'query',
			list: 'categorymembers',
			cmtype: 'subcat',
			cmlimit: this.settings.subcatcount,
			cmtitle: 'Category:' + this.currentCategory
		};

		this.doAPICall(data, function(result) {

			var cats = result.query.categorymembers;

			catALot.subCats = [];
			for (var i = 0; i < cats.length; i++) {
				catALot.subCats.push(cats[i].title.replace(/^[^:]+:/, ""));
			}
			catALot.catCounter++;
			if (catALot.catCounter === 2) catALot.showCategoryList();
		});
	},


	getParentCats: function() {
		var data = {
			action: 'query',
			prop: 'categories',
			titles: 'Category:' + this.currentCategory
		};
		this.doAPICall(data, function(result) {
			catALot.parentCats = [];
			var cats, pages = result.query.pages;
			if (pages[-1] && pages[-1].missing === '') {
				catALot.catlist.html('<span id="cat_a_lot_no_found">' + catALot.i18n.catNotFound + '</span>');
				document.body.style.cursor = 'auto';

				catALot.catlist.append('<ul></ul>');
				catALot.createCatLinks("→", [catALot.currentCategory]);
				return;
			}
			// there should be only one, but we don't know its ID
			for (var id in pages) {
				cats = pages[id].categories;
			}
			for (var i = 0; i < cats.length; i++) {
				catALot.parentCats.push(cats[i].title.replace(/^[^:]+:/, ""));
			}

			catALot.catCounter++;
			if (catALot.catCounter === 2) catALot.showCategoryList();
		});
	},
	localizedRegex: function(namespaceNumber, fallback) {
		//Copied from HotCat. Thanks Lupo.
		var wikiTextBlank = '[\\t _\\xA0\\u1680\\u180E\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000]+';
		var wikiTextBlankRE = new RegExp(wikiTextBlank, 'g');

		var createRegexStr = function(name) {
				if (!name || name.length === 0) return "";
				var regex_name = "";
				for (var i = 0; i < name.length; i++) {
					var initial = name.substr(i, 1);
					var ll = initial.toLowerCase();
					var ul = initial.toUpperCase();
					if (ll === ul) {
						regex_name += initial;
					} else {
						regex_name += '[' + ll + ul + ']';
					}
				}
				return regex_name.replace(/([\\\^\$\.\?\*\+\(\)])/g, '\\$1').replace(wikiTextBlankRE, wikiTextBlank);
		};

		fallback = fallback.toLowerCase();
		var canonical = formattedNS[namespaceNumber].toLowerCase();
		var RegexString = createRegexStr(canonical);
		if (fallback && canonical !== fallback) RegexString += '|' + createRegexStr(fallback);
		for (var catName in nsIDs) {
			if (typeof(catName) === 'string' && catName.toLowerCase() !== canonical && catName.toLowerCase() !== fallback && nsIDs[catName] === namespaceNumber) {
				RegexString += '|' + createRegexStr(catName);
			}
		}
		return ( '(?:' + RegexString + ')' );
	},
	regexBuilder: function(category) {
		var catname = this.localizedRegex(nsCat, 'Category');

		// Build a regexp string for matching the given category:
		// trim leading/trailing whitespace and underscores
		category = category.replace(/^[\s_]+/, "").replace(/[\s_]+$/, "");

		// escape regexp metacharacters (= any ASCII punctuation except _)
		category = $.escapeRE(category);

		// any sequence of spaces and underscores should match any other
		category = category.replace(/[\s_]+/g, '[\\s_]+');

		// Make the first character case-insensitive:
		var first = category.substr(0, 1);
		if (first.toUpperCase() !== first.toLowerCase()) category = '[' + first.toUpperCase() + first.toLowerCase() + ']' + category.substr(1);

		// Compile it into a RegExp that matches MediaWiki category syntax (yeah, it looks ugly):
		// XXX: the first capturing parens are assumed to match the sortkey, if present, including the | but excluding the ]]
		return new RegExp('\\[\\[[\\s_]*' + catname + '[\\s_]*:[\\s_]*' + category + '[\\s_]*(\\|[^\\]]*(?:\\][^\\]]+)*)?\\]\\]', 'g');
	},

	getContent: function(file, targetcat, mode) {

		var data = {
			action: 'query',
			prop: 'info|revisions',
			rvprop: 'content|timestamp',
			intoken: 'edit',
			titles: file[0]
		};

		this.doAPICall(data, function(result) {
			catALot.editCategories(result, file, targetcat, mode);
		});
	},

	// Remove {{Uncategorized}}. No need to replace it with anything.
	removeUncat: function(text) {
		return text.replace(/\{\{\s*[Uu]ncategorized\s*(\|?.*?)\}\}/, "");
	},
	
	doCleanup: function(text) {
		if (this.settings.docleanup) {
			return text.replace(/\{\{\s*[Ch]eck categories\s*(\|?.*?)\}\}/, "");
		} else {
			return text;
		}
	},

	editCategories: function(result, file, targetcat, mode) {
		var otext, starttimestamp, timestamp;
		if (!result) {
			//Happens on unstable wifi connections..
			this.connectionError.push(file[0]);
			this.updateCounter();
			return;
		}
		var pages = result.query.pages;

		// there should be only one, but we don't know its ID
		for (var id in pages) {
			// The edittoken only changes between logins
			this.edittoken = pages[id].edittoken;
			otext = pages[id].revisions[0]['*'];
			starttimestamp = pages[id].starttimestamp;
			timestamp = pages[id].revisions[0].timestamp;
		}


		var sourcecat = currentCat;
		// Check if that file is already in that category
		if (mode !== "remove" && this.regexBuilder(targetcat).test(otext)) {

			//If the new cat is already there, just remove the old one.
			if (mode === 'move') {
				mode = 'remove';
			} else {
				this.alreadyThere.push(file[0]);
				this.updateCounter();
				return;
			}
		}

		var text = otext;
		var comment;

		// Fix text
		switch (mode) {
		case 'add':
			text += "\n[[" + this.localCatName + ":" + targetcat + "]]\n";
			comment = this.i18n.summaryAdd + targetcat + "]]";
			break;
		case 'copy':
			text = text.replace(this.regexBuilder(sourcecat), "[[" + this.localCatName + ":" + sourcecat + "$1]]\n[[" + this.localCatName + ":" + targetcat + "$1]]");
			comment = this.i18n.summaryCopy + sourcecat + "]] " + this.i18n.to + targetcat + "]]";
			//If category is added through template:
			if (otext === text) {
				text += "\n[[" + this.localCatName + ":" + targetcat + "]]";
			}
			break;
		case 'move':
			text = text.replace(this.regexBuilder(sourcecat), "[[" + this.localCatName + ":" + targetcat + "$1]]");
			comment = this.i18n.summaryMove + sourcecat + "]] " + this.i18n.to + targetcat + "]]";
			break;
		case 'remove':
			text = text.replace(this.regexBuilder(sourcecat), "");
			comment = this.i18n.summaryRemove + sourcecat + "]]";
			break;
		}

		if (text === otext) {
			this.notFound.push(file[0]);
			this.updateCounter();
			return;
		}

		// Remove uncat after we checked whether we changed the text successfully.
		// Otherwise we might fail to do the changes, but still replace {{uncat}}
		if (mode !== 'remove') {
			text = this.doCleanup(this.removeUncat(text));
		}
		var data = {
			action: 'edit',
			summary: comment,
			title: file[0],
			text: text,
			starttimestamp: starttimestamp,
			basetimestamp: timestamp,
			watchlist: this.settings.watchlist,
			token: this.edittoken
		};
		if (this.settings.minor) data.minor = true;
		
		this.doAPICall(data, function(ret) {
			catALot.updateCounter();
		});
		this.markAsDone(file[1], mode, targetcat);
	},
	markAsDone: function(label, mode, targetcat) {

		label.addClass('cat_a_lot_markAsDone');
		switch (mode) {
		case 'add':
			label.append('<br>' + this.i18n.addedCat + ' ' + targetcat);
			break;
		case 'copy':
			label.append('<br>' + this.i18n.copiedCat + ' ' + targetcat);
			break;
		case 'move':
			label.append('<br>' + this.i18n.movedCat + ' ' + targetcat);
			break;
		case 'remove':
			label.append('<br>' + this.i18n.movedCat);
			break;
		}
	},
	updateCounter: function() {

		this.counterCurrent++;
		if (this.counterCurrent > this.counterNeeded) this.displayResult();
		else this.domCounter.text(this.counterCurrent);
	},

	displayResult: function() {

		document.body.style.cursor = 'auto';
		$('.cat_a_lot_feedback').addClass('cat_a_lot_done');
		$('.ui-dialog-content').height('auto');
		var rep = this.domCounter.parent();
		rep.html('<h3>' + this.i18n.done + '</h3>');
		rep.append(this.i18n.allDone + '<br />');

		var close = $('<a>').append(this.i18n.returnToPage);
		close.click(function() {
			catALot.progressDialog.remove();
			catALot.toggleAll(false);
		});
		rep.append(close);
		if (this.alreadyThere.length) {
			rep.append(this.i18n.skippedAlready);
			rep.append(this.alreadyThere.join('<br>'));
		}
		if (this.notFound.length) {
			rep.append(this.i18n.skippedNotFound);
			rep.append(this.notFound.join('<br>'));
		}
		if (this.connectionError.length) {
			rep.append(this.i18n.skippedServer);
			rep.append(this.connectionError.join('<br>'));
		}

	},

	moveHere: function(targetcat) {
		this.doSomething(targetcat, 'move');
	},

	copyHere: function(targetcat) {
		this.doSomething(targetcat, 'copy');
	},

	addHere: function(targetcat) {
		this.doSomething(targetcat, 'add');
	},

	remove: function() {
		this.doSomething('', 'remove');
	},

	doSomething: function(targetcat, mode) {
		var files = this.getMarkedLabels();
		if (files.length === 0) {
			alert(this.i18n.noneSelected);
			return;
		}
		this.notFound = [];
		this.alreadyThere = [];
		this.connectionError = [];
		this.counterCurrent = 1;
		this.counterNeeded = files.length;
		this.showProgress();
		for (var i = 0; i < files.length; i++) {
			this.getContent(files[i], targetcat, mode);
		}
	},

	doAPICall: function(params, callback) {
		params.format = 'json';
		var i = 0;
		var apiUrl = this.apiUrl;
		var handleError = function(jqXHR, textStatus, errorThrown) {
				if (window.console && $.isFunction(window.console.log)) {
					window.console.log('Error: ', jqXHR, textStatus, errorThrown);
				}
				if (i < 4) {
					window.setTimeout(doCall, 300);
					i++;
				} else if (params.title) {
					this.connectionError.push(params.title);
					this.updateCounter();
					return;
				}
			};
		var doCall = function() {
				$.ajax({
					url: apiUrl,
					cache: false,
					dataType: 'json',
					data: params,
					type: 'POST',
					success: callback,
					error: handleError
				});
			};
		doCall();
	},

	createCatLinks: function(symbol, list) {
		list.sort();
		var domlist = this.catlist.find('ul');
		for (var i = 0; i < list.length; i++) {
			var li = $('<li></li>');

			var link = $('<a></a>'),
				add, move, copy;
				
			link.text(list[i]);
			li.data('cat', list[i]);
			link.click(function() {
				catALot.updateCats($(this).parent().data('cat'));
			});

			if (this.searchmode) {
				add = $('<a class="cat_a_lot_action"><b>' + this.i18n.add + '</b></a>');
				add.click(function() {
					catALot.addHere($(this).parent().data('cat'));
				});
			} else {
				move = $('<a class="cat_a_lot_move"><b>' + this.i18n.move + '</b></a>');
				move.click(function() {
					catALot.moveHere($(this).parent().data('cat'));
				});

				copy = $('<a class="cat_a_lot_action"><b>' + this.i18n.copy + '</b></a>');
				copy.click(function() {
					catALot.copyHere($(this).parent().data('cat'));
				});
			}

			li.append(symbol).append(' ').append(link);

			// Can't move to source category
			if (list[i] !== currentCat && this.searchmode) li.append(' ').append(add);
			else if (list[i] !== currentCat && !this.searchmode) li.append(' ').append(move).append(' ').append(copy);

			domlist.append(li);
		}
	},

	getCategoryList: function() {
		this.catCounter = 0;
		this.getParentCats();
		this.getSubCats();
	},

	showCategoryList: function() {
		var thiscat = [this.currentCategory];

		this.catlist.empty();
		this.catlist.append('<ul></ul>');

		this.createCatLinks("↑", this.parentCats);
		this.createCatLinks("→", thiscat);
		this.createCatLinks("↓", this.subCats);

		document.body.style.cursor = 'auto';
		//Reset width
		var cat = $('#cat_a_lot');
		cat.width('');
		cat.height('');
		cat.width(Math.min(cat.width() * 1.1 + 15, $(window).width() - 10));
		var list = $('#cat_a_lot_category_list');
		list.css({
			maxHeight: this.setHeight + 'px',
			height: ''
		});
	},

	updateCats: function(newcat) {
		document.body.style.cursor = 'wait';

		this.currentCategory = newcat;
		this.catlist = $('#cat_a_lot_category_list');
		this.catlist.html('<div class="cat_a_lot_loading">' + this.i18n.loading + '</div>');
		this.getCategoryList();
	},
	showProgress: function() {
		document.body.style.cursor = 'wait';

		this.progressDialog = $('<div></div>').html(this.i18n.editing + ' <span id="cat_a_lot_current">' + this.counterCurrent + '</span> ' + this.i18n.of + this.counterNeeded).dialog({
			width: 450,
			height: 90,
			minHeight: 90,
			modal: true,
			resizable: false,
			draggable: false,
			closeOnEscape: false,
			dialogClass: "cat_a_lot_feedback"
		});
		$('.ui-dialog-titlebar').hide();
		this.domCounter = $('#cat_a_lot_current');

	},

	run: function() {
		if ($('.cat_a_lot_enabled').length) {
			this.makeClickable();
			$("#cat_a_lot_data").show();
			$('#cat_a_lot').resizable({
				handles: 'n',
				alsoResize: '#cat_a_lot_category_list',
				resize: function(event, ui) {
					$(this).css({
						left: "",
						top: ""
					});
					catALot.setHeight = $(this).height();
					$('#cat_a_lot_category_list').css({
						maxHeight: '',
						width: ''
					});
				}
			});
			$('#cat_a_lot_category_list').css({
				maxHeight: '450px'
			});
			if (this.searchmode) this.updateCats("Pictures and images");
			else this.updateCats(currentCat);

		} else {
			$("#cat_a_lot_data").hide();
			$("#cat_a_lot").resizable("destroy");
			//Unbind click handlers
			this.labels.unbind('click.catALot');
		}
	},
	
	manageSettings: function() {
		mw.loader.using(['ext.gadget.SettingsManager', 'ext.gadget.SettingsUI', 'jquery.ui.progressbar'], function() {
			catALot._manageSettings();
		});
	},
	_manageSettings: function() {
		window.mw.libs.SettingsUI(this.defaults, "Cat-A-Lot").show().done(function(s, verbose, loc, settingsOut, $dlg ) {
			var mustRestart = false,
				_restart = function() {
					if (!mustRestart) return;
					$('#cat_a_lot').remove();
					catALot.labels.unbind('click.catALot');
					catALot.init();
				},
				_saveToJS = function() {
				var opt = mw.libs.settingsManager.option({ 
						optionName: 'catALotPrefs', 
						value: catALot.settings,
						encloseSignature: 'catALot',
						encloseBlock:	'////////// Cat-A-Lot user preferences //////////\n',
						triggerSaveAt: /Cat.?A.?Lot/i,
						editSummary: catALot.i18n.prefSaveSummary
					}),
					oldHeight = $dlg.height(),
					$prog = $('<div>');
					
				$dlg.css('height', oldHeight).html('');
				$prog.css({
					'height': Math.round(oldHeight/8),
					'margin-top': Math.round((7*oldHeight)/16)
				}).appendTo($dlg);
				
				$dlg.parent().find('.ui-dialog-buttonpane button').button('option', 'disabled', true);
				
				opt.save().done(function(text, progress, opt) {
					$prog.progressbar({ value: progress });
					$prog.fadeOut(function() {
						$dlg.dialog('close');
						_restart();
					});
				}).progress(function(text, progress, opt) {
					$prog.progressbar({ value: progress });
					// TODO: Add "details" to progressbar
				}).fail(function(text) {
					$prog.addClass('ui-state-error');
					$dlg.prepend($('<p>').text(text));
				});
			};
			$.each(settingsOut, function(n, v) {
				if (v.forcerestart && catALot.settings[v.name] !== v.value) {
					mustRestart = true;
				}
				catALot.settings[v.name] = v.value;
				window.catALotPrefs[v.name] = v.value;
			});
			switch (loc) {
				case 'page':
					$dlg.dialog('close');
					_restart();
					break;
				case 'account-publicly':
					_saveToJS();
					break;
			}
		});
	},
	_initSettings: function() {
		if (this.settings.watchlist) return;
		if (!window.catALotPrefs) window.catALotPrefs = {};
		$.each(this.defaults, function(n, v) {
			v.value = catALot.settings[v.name] = (window.catALotPrefs[v.name] || v['default']);
			v.label = catALot.i18n[v.label_i18n];
			if (v.select_i18n) {
				v.select = {};
				$.each(v.select_i18n, function(i18nk, val) {
					v.select[ catALot.i18n[i18nk] ] = val;
				});
			}
		});
	},
	defaults: [{
		name: 'watchlist',
		'default': 'preferences',
		label_i18n: 'watchlistpref',
		select_i18n: {
			'watch_pref': 'preferences',
			'watch_nochange': 'nochange',
			'watch_watch': 'watch',
			'watch_unwatch': 'unwatch'
		}
	}, {
		name: 'minor',
		'default': false,
		label_i18n: 'minorpref'
	}, {
		name: 'editpages',
		'default': true,
		label_i18n: 'editpagespref',
		forcerestart: true
	}, {
		name: 'docleanup',
		'default': false,
		label_i18n: 'docleanuppref'
	}, {
		name: 'subcatcount',
		'default': 50,
		'min': 5,
		'max': 500,
		label_i18n: 'subcatcountpref',
		forcerestart: true
	}],
	
	
	i18n: {
		// Preferences
		// new: added 2012-09-19. Please translate.
		// Use user language for i18n
		watchlistpref: "Watchlist preference concerning files edited with Cat-A-Lot",
		watch_pref: "According to your general preferences",
		watch_nochange: "Do not change watchstatus",
		watch_watch: "Watch pages edited with Cat-A-Lot",
		watch_unwatch: "Remove pages while editing with Cat-A-Lot from your watchlist",
		minorpref: "Mark edits as minor (if you generally mark your edits as minor, this won't change anything)",
		editpagespref: "Allow categorising pages (including categories) that are not files",
		docleanuppref: "Remove {{Check categories}} and other minor cleanup",
		subcatcountpref: "Sub-categories to show at most",
		configSettings: "Preferences",
		// Use site language for i18n
		prefSaveSummary: "[[Help:Gadget-Cat-a-lot|Cat-a-lot]] is updating user preferences",
	
		//Progress
		loading: 'Loading...',
		editing: 'Editing page',
		of: 'of ',
		skippedAlready: '<h5>The following pages were skipped, because the page was already in the category:</h5>',
		skippedNotFound: '<h5>The following pages were skipped, because the old category could not be found:</h5>',
		skippedServer: '<h5>The following pages couldn\'t be changed, since there were problems connecting to the server:</h5>',
		allDone: 'All pages are processed.',
		done: 'Done!',
		addedCat: 'Added category',
		copiedCat: 'Copied to category',
		movedCat: 'Moved to category',
		removedCat: 'Removed from category',
		returnToPage: 'Return to page',
		catNotFound: 'Category not found.',


		//as in 17 files selected
		filesSelected: ' files selected.',

		//Actions
		copy: 'Copy',
		move: 'Move',
		add: 'Add',
		removeFromCat: 'Remove from this category',
		enterName: 'Enter category name',
		select: 'Select',
		all: 'all',
		none: 'none',

		noneSelected: 'No files selected!',

		//Summaries:
		summaryAdd: '[[Help:Cat-a-lot|Cat-a-lot]]: Adding [[Category:',
		summaryCopy: '[[Help:Cat-a-lot|Cat-a-lot]]: Copying from [[Category:',
		to: 'to [[Category:',
		summaryMove: '[[Help:Cat-a-lot|Cat-a-lot]]: Moving from [[Category:',
		summaryRemove: '[[Help:Cat-a-lot|Cat-a-lot]]: Removing from [[Category:'
	}
};

if ((nsNumber === -1 && mw.config.get('wgCanonicalSpecialPageName') === "Search") || nsNumber === nsCat) {
	if (nsNumber === -1) {
		catALot.searchmode = true;
	}
	var loadingLocalizations = 1;
	var loadLocalization = function(lang, cb) {
		loadingLocalizations++;
		switch (lang) {
			case 'zh-hk':
			case 'zh-mo':
			case 'zh-tw':
				lang = 'zh-hant';
				break;
			case 'zh':
			case 'zh-cn':
			case 'zh-my':
			case 'zh-sg':
				lang = 'zh-hans';
				break;

		}
		$.ajax({
			url: '//commons.wikimedia.org/w/index.php',
			dataType: 'script',
			data: {
				title: 'MediaWiki:Gadget-Cat-a-lot.js/' + lang,
				action: 'raw',
				ctype: 'text/javascript',
				// Allow caching for 28 days
				maxage: 2419200,
				smaxage: 2419200
			},
			cache: true,
			success: cb,
			error: cb
		});
	};
	var maybeLaunch = function() {
		loadingLocalizations--;
		if (0 === loadingLocalizations) {
			mw.loader.using(['jquery.ui.dialog', 'jquery.ui.autocomplete'], function() {
				$(document).ready(function() {
					catALot.init();
				});
			});
		}
	};

	if (mw.config.get('wgUserLanguage') !== 'en') {
		loadLocalization(mw.config.get('wgUserLanguage'), maybeLaunch);
	}
	if (mw.config.get('wgContentLanguage') !== 'en') {
		loadLocalization(mw.config.get('wgContentLanguage'), maybeLaunch);
	}
	maybeLaunch();
}

})(jQuery, mediaWiki);

/**
 *  Derivative work of
 *  (replace "checkboxes" with cat-a-lot labels in your mind)
 */ 
	/**
	 * jQuery checkboxShiftClick
	 *
	 * This will enable checkboxes to be checked or unchecked in a row by clicking one, holding shift and clicking another one
	 *
	 * @author Krinkle <krinklemail@gmail.com>
	 * @license GPL v2
	 */
( function ( $ ) {
	$.fn.catALotShiftClick = function ( cb ) {
		var prevCheckbox = null, $box = this;
		// When our boxes are clicked..
		$box.bind('click.catALot', function ( e ) {
		
			// Highlight last selected
			$('#cat_a_lot_last_selected').removeAttr('id');
			var $thisControl = $(e.target),
				method;
			if (!$thisControl.hasClass('cat_a_lot_label')) {
				$thisControl = $thisControl.parents('.cat_a_lot_label');
			}
			$thisControl.attr('id', 'cat_a_lot_last_selected').toggleClass('cat_a_lot_selected');
			
			// And one has been clicked before...
			if ( prevCheckbox !== null && e.shiftKey ) {
				// Prevent selection
				e.preventDefault();
				
				method = $thisControl.hasClass('cat_a_lot_selected') ? 'addClass' : 'removeClass';
				
				// Check or uncheck this one and all in-between checkboxes
				$box.slice(
					Math.min( $box.index( prevCheckbox ), $box.index( $thisControl ) ),
					Math.max( $box.index( prevCheckbox ), $box.index( $thisControl ) ) + 1
				)[method]('cat_a_lot_selected');
			}
			// Either way, update the prevCheckbox variable to the one clicked now
			prevCheckbox = $thisControl;
			
			if ($.isFunction(cb)) cb();
		} );
		return $box;
	};
}( jQuery ) );

// </nowiki>