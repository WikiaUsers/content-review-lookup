/*
 * Reconstitution
 * Mass restores deleted pages for a specific user, or all users. Opposite function of nuke.
 * @author Thundercraft5 <https://dev.fandom.com/wiki/User:Thundercraft5>
 */
/* jshint
	esversion: 6, forin: true, 
	immed: true, indent: 4, 
	latedef: true, newcap: true,
	onevar: true, eqeqeq: true,
	multistr: true, maxerr: 999999,
	noarg: true, undef: true,
	undef: true, unused: true,
	browser: true, jquery: true,
	-W082, -W084
*/
/* global mw, importArticles */
mw.loader.using(['mediawiki.util', 'mediawiki.api', 'mediawiki.user']).then(function() {
	"use strict";
	var api = new mw.Api();
	
	return $.when(
		mw.user.getRights(),
		api,
		new $.Deferred(function(promise) {
			mw.hook('dev.i18n').add(function() {
			    window.dev.i18n.loadMessages('Reconstitution').then(function(i18n) {
			    	promise.resolve(i18n);
			    });
			});
		}),
		api.loadMessagesIfMissing(['invert', 'undeletelink', 'deletionlog', 'namespacesall'])
	);
}).then(function(rights, api, i18n) {
	if (window.Reconstitution) return this.warn('Script was double loaded, exiting...');
	else if (![-1, 2, 3, 1200].includes(this.wg.wgNamespaceNumber)
		&& !(this.wg.wgNamespaceNumber === 500 && !this.wg.wgPageName.includes('/'))
	) this.log('Namespace is not supported, exiting...');
	else if (!rights.includes('undelete') || !rights.includes('deletedhistory')) return this.log('User cannot undelete pages or view deleted contributions, exiting...');

	var that;
	var Reconstitution = that = window.Reconstitution = Object.assign(this, {
		loaded: true,
		i18n: i18n,
		limit: Number(mw.util.getParamValue('reconstlimit') || 500),
		label: i18n.msg('reconst').plain(),
		token: mw.user.tokens.get('csrfToken'),
		
		init: function() {
			$('.page-header__title').text(this.label);
			document.title = this.label + " | " + this.wg.wgSiteName + " | Fandom";
			mw.util.addCSS('.thumbnail-reconst {\
				max-width: 250px;\
				width: auto;\
				height: 80px;\
			}\
			\
			li.reconst-query-result:hover {\
				cursor: pointer !important;\
				background: rgba(0, 0, 0, 0.5)\
			}\
			\
			li.reconst-query-result {\
				transition: 0.3s background ease;\
			}\
			\
			button {\
				cursor: pointer !important;\
			}');

			if (mw.util.getParamValue('reconstuser')) {
				this.loadUserUI();
			} else {
				this.loadMainUI();
			}
			$(document.body).on('click', '.reconst-submit', this.submitHandler);
		},
		
		msg: function(name) {
			var messageArgs = [name].concat(Array.from(arguments).slice(1));
			
			return name in mw.messages.values
				? mw.message.apply(mw, messageArgs).parse()
				: this.i18n.msg.apply(this.i18n, messageArgs).parse();
		},
		
		rcSubmit: function() {
			if ($('#reconst-rc').attr('disabled')) return;

			$('#reconst-rc').attr('disabled', true);
			$('.reconst-check-all, .reconst-invert').remove();
			
			if ($('#reconst-username').val()) {
				var locationParams = {
					blankspecial: 'reconst',
					reconstuser: $('#reconst-username').val()
				};

				if ($('#reconst-namespace').val() !== "All")
					locationParams.reconstnamespace = $('#reconst-namespace').val();

				if ($.isNumeric($('#reconst-max').val()) && $('#reconst-max').val() > 0)
					locationParams.reconstlimit = $('#reconst-max').val();

				if ($('#reconst-match').val())
					locationParams.reconstmatch = $('#reconst-match').val();

				location.replace(mw.util.getUrl('Special:Blankpage', locationParams));
				return;
			}

			$('#reconst-query-results').empty();

			if ($('.reconst-submit').length) {
				$('.reconst-submit').remove();
				$('#mw-content-text > p:nth-child(1) > br:nth-child(14)').remove();
			}
			
			$('#reconst-status').show();
			$('#reconst-status-text').text(this.msg('reconst-getting-pages'));
			
			this.queryDeletedPages();
		},

		submitHandler: function() {
			if (!$('.reconst-query-result, .reconst-title-check:checked').length || $(this).attr('disabled')) return;

			$('.reconst-submit, .reconst-check-all, .reconst-invert, #reconst-protect').attr('disabled', true);
			$('#reconst-status').show();
			$('#reconst-status-text').text(that.msg('reconst-restoring-pages'));
			$('.reconst-title-check:checked').each(function(i) {
				var title = $(this).parent().find('a').first().text();
				setTimeout(function() {
					api.post({
						action: 'undelete',
						title: title,
						reason: $('#reconst-restore-reason').val() || '',
						bot: true,
						token: this.token,
						watchlist: 'nochange',
					}).then(function() {
						this.notify('success', this.msg('reconst-undeleted', title));
					}.bind(this), function(_, data) {
						this.notify('warn', this.msg('reconst-not-undeleted', title, data.error.info));
					}.bind(this));
					
					if (i === $('.reconst-title-check:checked').length - 1) {
						setTimeout(function() {
							this.log('Restorations All Done, redirecting...');
							
							location.replace(
								!mw.util.getParamValue('reconstuser') 
								
								? mw.util.getUrl(
									'Special:BlankPage', 
									$.extend({ blankspecial: 'reconst' }, this.parseUrlParams(location.search))
								)
								
								: mw.util.getUrl(
									mw.util.getParamValue('returnto') 
									|| ("Special:Contributions/" + mw.util.getParamValue('reconstuser')),
									mw.util.getParamValue('returntoparams') ? this.parseUrlParams(mw.util.getParamValue('returntoparams')) : ''
								)
							);
						}.bind(this), 1000);
					}
				}.bind(Reconstitution), i * this.delay);
			});
		},

		loadUserUI: function() {
			var user = mw.util.getParamValue('reconstuser').replace(/_/g, ' '),
				deleteReason = mw.html.escape(mw.util.getParamValue('reconstreason') || this.reason).replaceAll(/\$1/g, user);
				
			this.addCheckboxHandler();

			$('#mw-content-text p').html($('<span>', { html: [
				$('<a>', {
					href: mw.util.getUrl('Special:Blankpage', { blankspecial: 'reconst' }),
					html: this.msg('reconst-switch-main'),
				}),
				 '<br/>',
				this.msg('reconst-list', user),
				'<br>',
				this.msg('reconst-reason-label'),
				$('<input>', {
					css: {
						width: "400px"
					},
					type: "text",
					id: "reconst-restore-reason",
					value: deleteReason,
				}),
				$('<hr>', { css: { 'margin': '0 20px;' }}),
				$("<button>", {
					class: "reconst-submit",
					html: this.msg('reconst-submit-restore') + ' (0)',
				}),
				$('<div>', { 
					id: "reconst-status" ,
					html: [
						$('<span>', {
							id: "reconst-status-text",
						}),
						'<img src="https://static.wikia.nocookie.net/dev/images/c/c5/Circle_throbber.gif/revision/latest"/>',
					],
				}),
				$('<ul>', { id: "reconst-query-results" }),
				$("<button>", { 
					class: "reconst-submit",
					html: this.msg('reconst-submit-restore') + ' (0)',
				}),
			]}));
			
			$('#reconst-status').show();
			$('#reconst-status-text').text(this.msg('reconst-getting-pages'));
			this.queryUserContribs(user);
		},
		
		 		
		loadMainUI: function() {
			this.addCheckboxHandler();
			
			$('#mw-content-text p').html($('<span>', { html: [
				this.msg('reconst-tools'),
				'<br/>', 
				this.msg('reconst-userorip'),
				$('<input>', {
					type: "text",
					id: "reconst-username",
				}),
				'<br>', 
				this.msg('reconst-regex-pattern'),
				$('<input>', {
					type: "text",
					id: "reconst-match",
					value: mw.util.getParamValue('reconstpattern'),
				}),
				'<br>', 
				this.msg('reconst-namespace'),
				$('<select>', {
					id: "reconst-namespace",
					name: "reconst-namespace",
					html: [
						$('<option>', {
							value: "all",
							selected: "",
							html: "all",
						}),
					].concat(this.generateNamespaceSelect()),
				}),
				'<br>', 
				this.msg('reconst-maxpages'),
				$('<input>', {
					type: "text",
					id: "reconst-max",
					value: mw.util.getParamValue('reconstlimit') || 500,
				}),
				'<br>',
				'Restoration Reason: ',
				$('<input>', {
					type: "text",
					id: "reconst-restore-reason",
					value: mw.util.getParamValue('reconstreason'),
				}),
				'<br>', 
				$('<div>', {
					html: $("<input>", {
						id: "reconst-rc",
						name: "reconst-rc",
						value: this.msg('reconst-submit-user'),
						type: "submit",
						click: this.rcSubmit.bind(this),
					}),
					css: {
						'margin-top': '10px',
						'margin-bottom': "30px",
					},
				}),
				$('<div>', {
					id: "reconst-status"
				}),
				$('<hr>'),
				$('<ul>', {
					id: "reconst-query-results",
				}),
			]}));
			
			$('#reconst-namespace').val(mw.util.getParamValue('reconstnamespace'));
		},
		
		queryUserContribs: function(user) {
			api.get({
				action: "query",
				format: "json",
				list: "alldeletedrevisions",
				adrprop: "user",
				adrslots: "*",
				adrlimit: "max",
				adruser: user,
			}).then(function(d) {
				var adr = d.query.alldeletedrevisions;
			
				// Check if matching pages are deleted
				return api.post({
					action: "query",
					titles: adr.slice(0, mw.util.getParamValue('reconstlimit') || 500).map(function(deletedPage) {
						return deletedPage.title;
					}).join('|'),
				}).then(function(d) {
					return [adr, d.query && d.query.pages || []];
				});
			}).then(function(adr) {
				var titles = adr[1];
				adr = adr[0];
			
				// Remove page from list if it's not deleted or it's most recent creator was not our target
				Object.values(titles).filter(function(page) {
					return !('missing' in page);
				}).forEach(function(page) {
					adr.splice(adr.findIndex(function(deletedPage) {
						return deletedPage.title === page.title || deletedPage.revisions[0].user !== user;
					}), 1);
				});
			
				return adr;
			}).then(function(adr) {
				var images = [],
					count = 0;

				adr.forEach(function(deletedPage) {
					if (count >= this.limit) return;

					if (!mw.util.getParamValue('reconstmatch') || new RegExp(mw.util.getParamValue('reconstmatch')).test(deletedPage.title)) {
						count++;
						$('#reconst-query-results').append(
							$('<li>', {
								class: "reconst-query-result",
								html: [
									$('<input>', {
										type: "checkbox",
										class: "reconst-title-check",
										checked: "checked",
									}),
									$('<a>', {
										href: mw.util.getUrl('Special:Undelete/' + deletedPage.title),
										class: "new",
										target: "_blank",
										title: 'Special:Undelete/' + deletedPage.title,
										text: deletedPage.title,
									}),
									'&nbsp;(',
									$('<a>', {
										target: "_blank",
										href: mw.util.getUrl('Special:Log/delete', { page: deletedPage.title }),
										title: 'Special:Log/delete',
										text: this.msg('deletionlog'),
									}),
									')',
								],
							})
						);
						if (deletedPage.title.indexOf(this.wg.wgFormattedNamespaces[6] + ':') === 0)
							images.push(deletedPage.title);
					}
				}, this);
							
				$('#reconst-status').hide();
				
				if (!$('.reconst-query-result').length) {
					this.notify('error', this.msg('reconst-nopages', user));
				} else {
					if (images.length > 0) this.displayImages(images);
					this.addCheckToggleButton();
					$('.reconst-submit').html(this.msg('reconst-submit-restore') + ' (' + $('.reconst-title-check:checked').length + ')');
				}
			}.bind(this).bind(this), function(_, data) {
				this.notify('error', this.msg('reconst-usercontribs-failed', data.error.info));
			}.bind(this));	
		},
		
		queryDeletedPages: function() {
			api.get({
				action: "query",
				format: "json",
				list: "alldeletedrevisions",
				adrprop: "",
				adrslots: "*",
				adrlimit: "max",
				adrnamespace: $('#reconst-namespace').val() || 0,
			}).then(function(d) {
				var adr = d.query.alldeletedrevisions;
			
				// Check if matching pages are deleted
				return api.post({
					action: "query",
					titles: adr.slice(0, mw.util.getParamValue('reconstlimit') || 500).map(function(deletedPage) {
						return deletedPage.title;
					}).join('|'),
				}).then(function(d) {
					return [adr, d.query.pages];
				});
			}).then(function(adr) {
				var titles = adr[1];
				adr = adr[0];
			
				// Remove page from list if it's not deleted
				Object.values(titles).filter(function(page) {
					return !('missing' in page);
				}).forEach(function(page) {
					adr.splice(adr.findIndex(function(deletedPage) {
						return deletedPage.title === page.title;
					}), 1);
				});
			
				return adr;
			}).then(function(adr) {
				var maxLimit = +$('#reconst-max').val() || 5000,
					images = [],
					count = 0;
	
				adr.forEach(function(deletedPage) {
					if (count >= maxLimit) return;
					
					if (!$('#reconst-match').val() || new RegExp($('#reconst-match').val()).test(deletedPage.title)) {
						count++;
						$('#reconst-query-results').append($('<li>', {
							class: "reconst-query-result",
							html: [
								$('<input>', {
									type: "checkbox",
									class: "reconst-title-check",
									checked: "checked",
								}),
								$('<a>', {
									href: mw.util.getUrl('Special:Undelete/' + deletedPage.title),
									class: "new",
									target: "_blank",
									title: 'Special:Undelete/' + deletedPage.title,
									text: deletedPage.title,
								}),
								'&nbsp;(',
								$('<a>', {
									target: "_blank",
									href: mw.util.getUrl('Special:Log/delete', { page: deletedPage.title }),
									title: 'Special:Log/delete',
									text: this.msg('deletionlog'),
								}),
								')',
							],
						}));
						if (deletedPage.title.indexOf(this.wg.wgFormattedNamespaces[6] + ':') === 0)
							images.push(deletedPage.title);
					}
				}, this);
				
				$('#reconst-rc').attr('disabled', false);
				$('#reconst-status').hide();
				
				if (!$('.reconst-query-result').length) {
					this.notify('error', this.msg('reconst-no-deleted-pages'));
				} else {
					var $button = $('<button>', {
						class: "reconst-submit",
						text: this.msg('reconst-submit-restore') + ' (' + $('.reconst-title-check:checked').length + ')</a>',
					});
						
					$('#reconst-query-results').before($button).after($button.clone());
					$('.reconst-sumbit, .reconst-check-all, .reconst-invert').remove();
					
					this.addCheckToggleButton();
	
					if (images.length > 0) this.displayImages(images);
				}
			}.bind(this), function(_, data) {
				this.notify('error', this.msg('reconst-wikiquery-failed', data.error.info));
			}.bind(this));
	
			$('#reconst-status').hide();
			$(this).attr('disabled', false);	
		},
		
		generateNamespaceSelect: function() {
			return Object.entries(this.wg.wgFormattedNamespaces)
				.map(function(v) { return [+v[0], v[1]] })
				.sort(function(a, b) {
					var id1 = a[0];
					var id2 = b[0];
					
					if (id1 < id2) return -1;
					else if (id1 > id2) return 1;
					else return 0;
				})
				.slice(2)
				.map(function(d) {
					var namespace = d[1];
					var id = d[0];
					
					return $('<option>', {
						value: id,
						text: namespace === "" ? this.msg('namespacesall') : namespace,
					});
				}.bind(this));
		},
		
		notify: function(level) {
			var params = Array.from(arguments).slice(1);
			mw.notify($('<div>', { html: params.join(' ') }), { type: level });
			
			(this[level] || this.log).apply(null, params.map(function(val) {
				return $($.parseHTML(val)).text();
			}));
		},
		
		addCheckboxHandler: function() {
			var selected = new Set();
			var anchor;
			
			$('#mw-content-text').on('click', 'li.reconst-query-result', function(e) {
				var $input = $(this).find('input');
				
				if (e.target.children.length === 0 && e.target !== $input[0]) return;
				if (e.target !== $input[0]) $input.prop('checked', !$input[0].checked);
				if (!e.shiftKey || e.shiftKey && !anchor) anchor = $input[0], selected.clear(), selected.add($input[0]);
				
				if (anchor && e.shiftKey && !e.ctrlKey) {
					var $coll = $(this).parent().children().map(function() { return $(this).find('input[type="checkbox"]')[0] });
					var targetIndex = $coll.index($input[0]);
					var anchorIndex = $coll.index(anchor);
					
					if (targetIndex < anchorIndex) $coll = $coll.slice(targetIndex, anchorIndex + 1);
					else $coll = $coll.slice(anchorIndex, targetIndex + 1);
					
					$coll.each(function() { selected.add(this); });
				}
				
				if (e.ctrlKey && !e.shiftKey) 
					if (selected.has($input[0])) selected.delete($input[0]);
					else selected.add($input[0]);
				
				if (selected.size > 1) selected.forEach(function(node) {
					$(node).prop('checked', anchor.checked);
				});
			});
		},		
		
		addCheckToggleButton: function() {
			$('.reconst-submit')
				.after(
					$('<button>', {
						class: "reconst-check-all",
						'data-checked': true,
						text: "Uncheck All",
					}),
					$('<button>', {
						text: this.msg('invert'),
						class: "reconst-invert",
					})
				);

			$('.reconst-submit').text(this.msg('reconst-submit-restore') + ' (' + $('.reconst-title-check:checked').length + ')');
			
			// Check/Uncheck all
			$('.reconst-check-all').click(function() {
				var checked = $(this).attr('data-checked') === "true";
				
				$('.reconst-title-check').prop('checked', !checked);
				$('.reconst-check-all')
					.attr('data-checked', !checked)
					.text(!checked ? "Uncheck All" : 'Check All');  
			});
			
			// Invert/Uninvert all
			$('.reconst-invert').click(function() {
				$('.reconst-title-check').each(function() {
					$(this).prop('checked', !$(this).prop('checked'));	
				});
			});
			
			// Update count
			$(document.body).on("click", '.reconst-query-result, .reconst-check-all, .reconst-invert', function() {
				$('.reconst-submit').html(this.msg('reconst-submit-restore') + ' (' + $('.reconst-title-check:checked').length + ')');
			}.bind(this));			
		},
		displayImages: function(imgs) {
			api.post({ //POST instead of GET to avoid http 416
				action: 'query',
				prop: 'imageinfo',
				titles: imgs.join('|'),
				iiprop: 'url',
				iilimit: 'max'
			}).then(function(d) {
				Object.values(d.query.pages).forEach(function(page) {
					if (page.missing !== "" && page.imageinfo) {
						var href = mw.util.getUrl(page.title);
						
						$('a[href="' + href + '"]')
							.parent()
							.children('.reconst-title-check')
							.after($('<a>', {
								href: href,
								html: $('<img>', {
									class: "thumbnail-reconst",
									src: page.imageinfo[0].url, 
								}),
							}));
					}
				});
			}, function(_, data) {
				this.notify('error', 'Failed to display images: ' + data.error.info);
			}.bind(this));
		},
		parseUrlParams: function(s) {
			var params = s.replace(/^(?:\?|%26)/, '').split(/(?:&|%26)/);
			var o = {};	
		
			params.forEach(function(k) {
				var tmp = k.match(/(.+?)=(.+)/i);
				o[tmp[1]] = tmp[2];
			});
		
			return o;
		}
	});
	
	// Default config values
	this.mergeDefaults({
		delay: 1000,	
		reason: i18n.msg('reconst-restore-reason').plain(),
	});
	
	var inter = setInterval(function() {
		var username = this.wg.wgRelevantUserName || this.wg.profileUserName;
		
		if ($('.page-tools-module').length) {
			clearInterval(inter);

			var $el = $('<li>', {
				id: "t-reconst",
				html: $('<a>', {
					text: this.label,
					title: this.msg('reconst-linkoncontribs-text', username),
					href: mw.util.getUrl('Special:BlankPage', {
						blankspecial: 'reconst',
						reconstuser: username,
					}),
				}),
			});
			
			var $list = $('.page-tools-module ul');
			
			if ($list.find('li#t-nuke').length) {
				$list.find('li#t-nuke').after($el);
			} else {
				$list.find('li:is(#t-userrights, :last-of-type)').after($el);
			}
		}
	}.bind(this));
	
	switch (this.wg.wgCanonicalSpecialPageName) {
		case "DeletedContributions":
		case "UserProfileActivity":
		case "Contributions": {
			var usr = this.wg.wgRelevantUserName || this.wg.profileUserName,
				reconstTitle = window.reconstTitle || this.msg('reconst-linkoncontribs-text', usr),
				url = mw.util.getUrl('Special:BlankPage', {
					blankspecial: 'reconst',
					reconstuser: usr,
				});

			if (usr) {
				var $el = $('<span>', {
					html: $('<a>', {
						title: reconstTitle,
						href: url,
						text: this.msg('reconst-linkoncontribs'),
					}),
				});
				
				if (!window.QuickLogs) {
					if (this.wg.wgCanonicalSpecialPageName === 'DeletedContributions') {
						$('.page-header__subtitle > a:last-of-type').after(' | ', $el.find('a'));
					} else {
						$([
							'.mw-contributions-user-tools > .mw-changeslist-links > span > a[href*="blankspecial=nuke"]:parent',
							'.mw-contributions-user-tools > .mw-changeslist-links > span:last-child',
							'.UserProfileActivityModeration__links > span:last-child',
						].join(', ')).first().after($el);
					}	
				}
				mw.hook('QuickLogs.loaded').add(function(ql) {
					ql.addLink('reconst', {
						href: url,
						title: reconstTitle,
						message: this.msg('reconst-linkoncontribs'),
					});
				});
			}

			break;
		}

		case "AdminDashboard":
		case "Specialpages": {
			var link = mw.util.getUrl('Special:Blankpage', { blankspecial: 'reconst' });
			
			$('a[href*="Special:Undelete"]').after(
				$('<li>', { 
					class: "mw-specialpagerestricted",
					html: $('<a>', {
						title: "Special:Reconstitution",
						href: link,
						text: this.label,
					}),
				})
			);
			break;
		}
		case "Blankpage": {
			if (mw.util.getParamValue('blankspecial') === "reconst")
				this.init();
			break;
		}
	}
}.bind(function() {
	Object.keys({
		error: console.error,
		warn: console.warn,
		log: console.log,
		debug: console.debug,
	}).forEach(function(key) {
		this[key] = function() {
			console[key].apply(null, [ '[Reconstitution v1.5] [' + key.toUpperCase() + ']' ].concat(Array.from(arguments)));
		};
	}, this);
	
	this.wg = mw.config.get([
		'wgUserGroups',
		'wgCanonicalSpecialPageName',
		'wgFormattedNamespaces',
		'wgMainpage',
		'wgPageName',
		'wgSiteName',
		'wgNamespaceNumber',
		'profileUserName',
		'wgRelevantUserName',
	]);
	
	this.mergeDefaults = function(params) {
		for (var i in params) { // jshint ignore:line
			if (!params.hasOwnProperty(i) || i in this) continue;
			
			this[i] = params[i];
		}
		
		return this;
	};
	
	return this;
}.call(window.Reconstitution || {})));

if (!window.dev || !window.dev.i18n)
	importArticles({
		type: "script",
		articles: [
			"u:dev:MediaWiki:I18n-js/code.js",
		],
	});