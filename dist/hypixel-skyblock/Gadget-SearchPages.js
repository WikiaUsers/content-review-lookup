/* jshint
	forin: true, 
	immed: true, indent: 4, 
	latedef: true, newcap: true,
	noarg: true, undef: true,
	undef: true, unused: true,
	browser: true, jquery: true,
	onevar: true, eqeqeq: true,
	multistr: true, maxerr: 999999,
	-W082, -W084
*/
/* global mw, ace */
mw.loader.using(['mediawiki.util', 'mediawiki.api', 'ext.codeEditor.ace']).then(function() {	
	var api = new mw.Api();
	var aceShown = false;
	var on = false;
	var contentEditor, titleEditor;
	var canDelete = !!mw.config.get('wgUserGroups').join().match('^(bureaucrat|sysop|staff|util|wiki-manager|content-moderator|soap|content-team-member)');
	var inputSelector = 'input select button textarea'
		.split(' ')
		.map(function(v) {
			return '#mw-content-text' + v;
		})
		.join(', ');
	var $checkboxes;
	
	ace.define('ace/mode/regex', [], function(require, exports) {
		var oop = require("../lib/oop");
		var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
		
		var RegexHighlightRules = function() {
			this.$rules = {
				"start": [{
					// escapes
					token: "regexp.keyword.operator",
					regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
				}, {
					// flag
					token: "string.regexp",
					regex: "/[sxngimy]*",
				}, {
					// invalid operators
					token : "invalid",
					regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
				}, {
					// operators
					token : "constant.language.escape",
					regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
				}, {
					token : "constant.language.delimiter",
					regex: /\|/
				}, {
					token: "constant.language.escape",
					regex: /\[\^?/,
					next: "regex_character_class"
				}, {
					defaultToken: "string.regexp"
				}],
			};
		};
		
		
		oop.inherits(RegexHighlightRules, TextHighlightRules);
		exports.RegexHighlightRules = RegexHighlightRules;
	});

	function setupEditor(id) {
		var aceEditor = ace.edit(id);
		var mode = new (ace.require("ace/mode/javascript").Mode)();
		mode.HighlightRules = ace.require('ace/mode/regex').RegexHighlightRules;
		aceEditor.session.setMode(mode);

		if (id === "SP-ContentRegex") {
			aceEditor.setOptions({
				wrapBehavioursEnabled: true,
				wrap: true,
			});
			
			aceEditor.session.on('change', function() {
				var size = aceEditor.session.getScreenLength()
					* aceEditor.renderer.lineHeight
					+ aceEditor.renderer.scrollBar.getWidth();
				
				$('#' + id).css('height', size);
				aceEditor.resize();
			});
		} else {
			aceEditor.setOptions({
				maxLines: 1,
			});
		}
		
		return aceEditor;
	}
	
	function generateNamespaces() {
		var o = mw.config.get('wgFormattedNamespaces'),
			ret = [];

		Object.keys(o).forEach(function(key) {
			var value = o[key];

			ret.push($('<option>', {
				value: key,
				text: value,
			}));
		});
		
		ret[0] = $('<option>', {
			value: 0,
			text: "(Main)",
		});

		return $('<select>', {
			id: "SP-namespace",
			html: ret,
		});
	}

	function getData() {
		var def = new $.Deferred();

		function reject(_, r) {
			def.reject(r.error.info);
		}

		api.get({
			action: "query",
			format: "json",
			list: "allpages",
			aplimit: window.searchPages.limit,
			apnamespace: $('#SP-namespace').val() || undefined,
			apfilterredir: !$('#showredir').prop('checked') ? 'nonredirects' : null,
		}).then(function(d) {
			var pages = d.query.allpages.map(function(v) {
				return v.title;
			});
			var titles = [[]];
			console.log(pages);

			var counter = 0;
			var calls = 0;
			var total = 0;
			
			pages.forEach(function(page) {
				counter++;
				total++;
				if (total > window.searchPages.limit) return;
				if (counter >= 35) {
					titles.push([page]);
					counter = 0;
					calls++;
				} else {
					titles[calls].push(page);
				}
			});
			
			$.when.apply($, titles.map(function(v) {
				return api.get({
					action: "query",
					format: "json",
					prop: "revisions",
					titles: v.join('|'),
					formatversion: "2",
					rvprop: "content",
					rvslots: "*",
				});
			})).then(function() {
				var revs = [];
				Array.from(arguments).filter(function(v) { return v[0] || v.query; }).forEach(function(query) {
					(query[0] || query).query.pages.forEach(function(v) {
						revs.push(v);
					});
				});

				if (revs.length > window.searchPages.limit) revs.length = window.searchPages.limit;

				revs = revs.map(function(v) {
					return { 
						pageid: v.pageid,
						ns: v.ns,
						title: v.title,
						content: v.revisions[0].slots.main.content,
						contentformat: v.revisions[0].slots.main.contentformat,
						contentmodel: v.revisions[0].slots.main.contentmodel,
					};
				});
				def.resolve(revs);					   
			}, reject);
		}, reject);
		
		return def;
	}

	function filterMatch(data, titleSearch, contentSearch, caseInsensitive, regex, regexFlags) {
		if (regexFlags.match(/[^gmisuy]/)) return error("Invalid regular expression flags \"" + regexFlags + "\"");
		if (regex) {
			try {
				titleSearch = new RegExp(titleSearch, regexFlags + (caseInsensitive && !regexFlags.includes('i') ? "i" : "")); 
				contentSearch = new RegExp(contentSearch, regexFlags + (caseInsensitive && !regexFlags.includes('i') ? "i" : "")); 
			} catch(e) {
				return error(e.message);
			}
		}

		function testMatch(testString, matcher, caseInsensitive) {
			if (matcher instanceof RegExp) {
				return !!matcher.test(testString);
			} else {
				if (caseInsensitive) {
					testString = testString.toLowerCase();
					matcher = matcher.toLowerCase();
				}
				return !!testString.includes(matcher);
			}
		}
		return data.filter(function(page) {
			var pass = true;
			if (titleSearch && !testMatch(page.title, titleSearch, caseInsensitive)) {
				pass = false;
			}
			if (contentSearch && !testMatch(page.content, contentSearch, caseInsensitive)) {
				pass = false;
			}
			return pass;
		});
	}

	function error(msg) {
		console.warn("Error in getting data: " + msg.replace(/(\/.+?\/[a-z]*)/));
		
		$('#SP-note').html($("<b>", { 
			html: "Error in getting data: " + msg.replace(/(\/.+?\/[a-z]*)/, $('<span>', {
				style: "font-family: consolas;",
				text: '$1'
			}).prop('outerHTML')), 
			class: "error",
		}));
		donePending();
	}

	function createCheckbox(label, title, id, click, options) {
		if (typeof(click) === 'object') options = click, click = undefined;
		options = options || {};
		
		return $('<div>', $.extend({
			class: "SP-checkbox",
			id: "SP-" + id + "-wrapper",
			html: [
				$('<input>', $.extend({
					id: "SP-" + id,
					name: "SP-" + id,
					type: "checkbox",
					title: title,
				}, options.input)),
				'&nbsp;',
				$('<label>', $.extend({
					for: "SP-" + id,
					id: "SP-" + id + "-label",
					text: label,
					title: title,
					click: click,
				}, options.label)),
			],
		}, options.wrapper));
	}
	
	function createInput(label, title, id, options) {
		options = options || {};
		options.input = options.input || {};
		
		var html = [
			!options.input.type ? $('<b>', $.extend({
				html: label + ':&nbsp;',
				title: title,
			}, options.label)) : "",
			$('<input>', $.extend({
				id: "SP-" + id,
				name: options.input.name || "SP-" + id,
				title: title,
			}, options.input)),
			options.input.type ? $('<label>', $.extend({
				for: "SP-" + id,
				id: "SP-" + id + "-label",
				text: label,
				title: title,
			}, options.label)) : "",
		];
		return $('<div>', $.extend({
			class: "SP-input",
			id: "SP-" + id + "-wrapper",
			html: html,
		}, options.wrapper));
	}
	
	function createLinks(title) {
		return $('<div>', {
			html: [
				$('<input>', {
					class: "SP-deleteSelectionCheckbox SP-checkbox",
					checked: true,
					type: "checkbox",
					'data-title': title,
				}),
				$('<a>', {
					href: mw.util.getUrl(title),
					title: title,
					text: title,
				}),
				' (',
				$('<a>', {
					href: mw.util.getUrl(title, { action: "edit" }),
					title: mw.util.getUrl(title, { action: "edit" }),
					text: "edit",
				}),
				' | ',
				$('<a>', {
					href: mw.util.getUrl(title, { action: "history" }),
					title: mw.util.getUrl(title, { action: "history" }),
					text: "hist",
				}),
				' | ',
				$('<a>', {
					href: mw.util.getUrl('Special:Log', { page: title }),
					title: mw.util.getUrl('Special:Log', { page: title }),
					text: "logs",
				}),
				')',
			],
		});
	}
	
	function toggleEditors() {
		aceShown = !aceShown;
		$('#SP-ContentRegex, #SP-TitleRegex, #SP-title-search, #SP-content-search').fadeToggle();
		
		if (aceShown) {
			$('#SP-ContentRegex, #SP-TitleRegex').removeClass('hidden');
			$('#SP-title-search, #SP-content-search').addClass('hidden');
			
			contentEditor.setValue($('#SP-content-search').val());
			titleEditor.setValue($('#SP-title-search').val());
			$('#SP-TitleRegex').css({ display: 'inline-block' });
		} else {
			$('#SP-ContentRegex, #SP-TitleRegex').addClass('hidden');
			$('#SP-title-search, #SP-content-search').removeClass('hidden');
			
			$('#SP-content-search').val(contentEditor.getValue());
			$('#SP-title-search').val(titleEditor.getValue());
		}
	}
	
	function setPending() {
		$(inputSelector).prop('disabled', true);
		contentEditor.setOptions({ readOnly: true });
		titleEditor.setOptions({ readOnly: true });
		$('#SP-PageList, #SP-note').empty();
		$('#SP-results').addClass('mw-ajax-loader');
		$('#SP-resultsToolsWrapper, .SP-buttonGroup, #SP-resultsAmount').addClass('hidden');
	}
	
	function donePending() {
		$('#SP-results').removeClass('mw-ajax-loader');
		contentEditor.setOptions({ readOnly: false });
		titleEditor.setOptions({ readOnly: false });
		$(inputSelector).prop('disabled', false);
		$('#SP-resultsToolsWrapper, .SP-buttonGroup, #SP-resultsAmount').removeClass('hidden');
	}	
	
	function getPages() {
		var pages = [];
		Array.from(document.querySelectorAll('.SP-deleteSelectionCheckbox')).forEach(function(el) {
			if (el.checked) pages.push(el.attributes['data-title'].value);
		});
		return pages;
	}
	
	function onDelete(pages) {
		if (!confirm('Are you sure you want to delete the selected pages?')) return;
		
		var protectLevel = Array.from(document.getElementsByName('pl-protect-options')).find(function(el) {
			return el.checked;
		}).value;
		
		$(inputSelector).prop('disabled', true);
		
		console.log(pages);
		$.when.apply($, pages.map(function(page) {
			var def = $.Deferred();
			
			api.postWithToken('csrf', {
				action: "delete",
				title: page,
				reason: $('#SP-del-reason').val(),
				watchlist: "preferences",
			}).then(function() {
				console.log('Deletion of ' + page + 'Successful!');
				
				$('[data-title="' + page + '"]').parent().parent().remove();
				if ($('#SP-protect-del').prop('checked')) {
					return api.postWithToken('csrf', {
						action: "protect",
						title: page,
						protections: "create=" + protectLevel,
						reason: $('#SP-protect-reason').val(),
						watchlist: "preferences",
					});
				} else def.resolve();
			}, function(_, r) {
				def.reject();
				console.warn('Failed to delete' + page + ': ' + r.error.info);
			}).then(function() {
				console.log('Protection of ' + page + 'Successful!');	
				def.resolve();
			}, function(_, r) {
				console.warn('Protection to delete' + page + ': ' + r.error.info);
				def.reject();
			});
		})).always(function() {
			mw.notify('Deletions of selected pages have finished.');
			$(inputSelector).prop('disabled', false);
		});
	}
	
	function onSubmit() {
		setPending();
		getData().then(function(d) {
			donePending();
			
			d = filterMatch(
				d, 
				(aceShown ? titleEditor.getValue() : $('#SP-title-search').val()).trim(), 
				( aceShown ? contentEditor.getValue() : $('#SP-content-search').val()).trim(),
				$("#SP-case-insensitive").prop('checked'),
				$("#SP-regex").prop('checked'),
				$('#SP-regex-flags').val()
			);
			
			if (!d) return;
			d = d.map(function(v) {
				return $('<li>', {
					html: createLinks(v.title),
				});
			});
			
			if (!d.length) {
				$('#SP-note').text('No pages matched your search.');
				$('#SP-resultsToolsWrapper, .SP-buttonGroup, #SP-resultsAmount').addClass('hidden');
				return;
			}
			$('#SP-PageList').html(d);
			 
			$checkboxes = $('.SP-deleteSelectionCheckbox');
			$('#SP-resultsAmount').html([
				"Total Results: " + d.length,
				' (',
				$('<a>', {
					style: "cursor: pointer",
					text: "copy selected pages",
					click: function() {
						window.navigator.clipboard.writeText(getPages().join('\n'));
						
						return alert('Copied!');
					},
				}),
				')',
			]);
			
			updateCount();
		}, error);
		
	}
	
	function updateCount(count) {
		if (typeof(count) === 'undefined') {
			count = 0;
			Array.from(document.body.querySelectorAll('.SP-deleteSelectionCheckbox')).forEach(function(el) {
				if (el.checked) count++;
			});
		}
		$('.SP-deleteSelected').text("Delete Selected (" + count + ")");
	}
	
	function initInterface() {
		(document.getElementById('firstHeading') || document.getElementsByClassName('page-header__title')[0]).innerHTML = 'Search For Pages';
		document.title = 'Search For Pages | ' + mw.config.get('wgSiteName') + ' | Fandom';

		$(document.body).on('click', '.SP-deleteSelectionCheckbox', function() {
			updateCount();
		});

		$('#mw-content-text').html($('<div>', {
			html: [
				'<b>Namespace to search: </b>',
				generateNamespaces(),
				createCheckbox("Show Redirects", "Show redirects in the results", "showredir"),
				createCheckbox("Case insensitive", "Make the matchers case insensitive", "case-insensitive"),
				createCheckbox("Regex", "Make the matchers use regular expressions", "regex", function() {
					toggleEditors();
					$('#SP-regex-flags-wrapper').fadeToggle();
				}),
				$('<div>', {
					id: "SP-regex-flags-wrapper",
					style: "display: none;",
					html: [
						$('<b>', {
							title: "Regular expression flags to use",
							id: "SP-regex-flags-label",
							text: "Regex Flags: ",
						}),
						$('<input>', {
							id: "SP-regex-flags",
							title: "Regular expression flags to use",
						}),
					],
				}),
				'<b>Page title to match: </b>',
				$('<input>', { type: "text", id: "SP-title-search" }).attr({ size: 100 }),
				$('<div>', { 
					id: "SP-TitleRegex",
					css: {
						display: "none",
						width: "600px",
						height: "20px",
						'font-size': '14px',
						'line-height': '18px',
						'border': '1px solid #474747',
						'margin-bottom': '-5px',
					},
				}),
				'<br>',
				'<b>Page content to match: </b>',
				'<br>',
				$('<textarea>', { cols: 100, rows: 6, id: "SP-content-search", resizable: true }),
				$('<div>', { 
					id: "SP-ContentRegex", 
					css: {
						display: "none",
						'font-size': '14px',
						'line-height': '18px',
						'min-height': '200px',
						'max-height': '400px',
						'min-width': '600px',
						'max-width': '1000px',
						'border': '1px solid #474747',
					},
				}),
				'<br>',
				'<br>',
				$('<h2>', {
					html: ["Search Results", "&nbsp;".repeat(2), $('<button>', { 
						id: "SP-submit", 
						text: "Submit",
						click: onSubmit,
					})],
				}), 
				'<br>',
				$('<big>', {
					id: "SP-note",
					text: "Submit inputs to see pages.",
				}),
				$('<div>', { 
					id: "SP-results", 
					html: [
						$('<div>', {
							id: "SP-resultsToolsWrapper",
							class: "hidden",
							html: [
								canDelete ? createCheckbox('Delete Found', 'Delete all pages found', 'del-found', function() {
									if (on) $('#SP-protect-levels-wrapper').fadeOut();
									else if ($('#SP-protect-del').prop('checked')) $('#SP-protect-levels-wrapper').fadeIn();
									
									$('#SP-del-reason-wrapper, #SP-protect-del-wrapper, .SP-deleteSelected').fadeToggle();	
									on = !on;
								}) : "",
								canDelete ? createInput('Deletion reason', 'Deletion reason', 'del-reason', {
									wrapper: {
										style: "display: none",
									}
								}) : "",
								canDelete ? createCheckbox('Protect Deleted', 'Protet Deleted pages', 'protect-del', function() {
									$('#SP-protect-levels-wrapper').fadeToggle();
								}, {
									wrapper: {
										style: "display: none",
									},
								}) : "",
								canDelete ? $('<div>', {
									id: "SP-protect-levels-wrapper",
									style: "display: none",
									html: [
										$("<b>", {
											text: "Create Protection level: ",
											id: "SP-protect-level-sign",
										}),
									].concat([
										createInput('Administrators only', 'Administrators only can edit the deleted page.', 'pl-admin-only', {
											input: {
												type: "radio",
												checked: true,
												value: "sysop",
												name: "pl-protect-options",
											},
										}),
										createInput('Autoconfirmed only', 'Autoconfirmed users only can edit the deleted page.', 'pl-auto-only', {
											input: {
												type: "radio",
												value: "autoconfirmed",
												name: "pl-protect-options",
											},
										}),
										createInput('Protection reason', 'Protection reason', 'protect-reason'),
									]),
								}) : "",
								'<br>',
								$('<b>', {
									id: "SP-resultsAmount",
								}),
								$('<ul>', {
									id: "SP-PageList",
								}),
							],
						}),
					],
				}),
			],
		}));
		
		var buttonGroup = $('<div>', {
			class: "SP-buttonGroup hidden",
			html: [
				$('<button>', {
					click: function() {
						onDelete(getPages());
					},
					text: "Delete Selected",
					class: "SP-deleteSelected",
					style: "display: none",
				}),
				$('<button>', {
					text: "Uncheck All",
					class: "SP-checkAll",
					attr: {
						checked: false,
					},
					click: function() {
						var $el = $('.SP-checkAll');
						var checked = $el.attr('checked');
						var count = 0;
						
						$el.attr('checked', !checked);
						$el.text(!checked ? "Check All" : "Uncheck All");
						
						$checkboxes.each(function() {
							var doCheck = checked ? true : false;
							
							if (doCheck) count++;
							this.checked = doCheck;
						});
						updateCount(count);
					},
				}),
				$('<button>', {
					text: "Invert Selection",
					class: "SP-invertSelection",
					attr: {
						checked: true,
					},
					click: function() {
						var $el = $('.SP-invertSelection');
						var checked = $el.attr('checked');
						var count = 0;
						
						$el.attr('checked', !checked);
						$el.text(!checked ? "Invert Selection" : "Uninvert Selection");

						$checkboxes.each(function() {
							var doCheck = !this.checked;
							
							if (doCheck) count++;
							this.checked = doCheck;
						});
						updateCount(count);
					},
				}),
			],
		});

		$('#SP-PageList').before(buttonGroup.clone(true, true)).after(buttonGroup.clone(true, true));
		
		contentEditor = setupEditor("SP-ContentRegex");
		titleEditor = setupEditor("SP-TitleRegex");
	}

	function initSpecialPages() {
		var listItem = $('<li>', {
			html: $('<a>', {
				text: "Search For Pages",
				href: mw.util.getUrl('Special:SearchPages'),
			}),
		});
		
		$('#mw-specialpagesgroup-pagetools').next().find('ul').append(listItem);
		$('#AdminDashboardAdvanced').find('h2').parent().slice(8, 9).next().find('ul').last().append(listItem);
	}

	(function init() {
		if (window.searchPagesLoaded || mw.config.get('wgNamespaceNumber') !== -1) return;
		window.searchPagesLoaded = true;
		window.searchPages = $.extend({
			limit: 1500,
		}, window.searchPages);
		
		if (window.searchPages.limit > 1500) window.searchPages.limit = 1500;

		mw.util.addCSS('#SP-title-search, #SP-content-search { font-family: consolas; } .SP-checkbox > * { cursor: pointer !important; } .hidden { display: none !important }');
		
		switch(mw.config.get('wgTitle')) {
			case('SearchPages'): return initInterface();
			case('AdminDashboard'): 
			case('SpecialPages'): return initSpecialPages();
		}
	}());
	
}).catch(console.warn);