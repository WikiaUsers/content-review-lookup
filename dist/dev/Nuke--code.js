/*
 * Nuke
 * Reverse engineered Nuke extension
 * https://www.mediawiki.org/wiki/Extension:Nuke
 * @author Ozank Cx (https://dev.fandom.com/wiki/User:Ozank Cx)
 * @author Thundercraft5 (https://dev.fandom.com/wiki/User:Thundercraft5)
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
/* global mw */
mw.loader.using(['mediawiki.util', 'mediawiki.api', 'mediawiki.user']).then(function() {
	var api = new mw.Api();
	
	return $.when(
		mw.user.getRights(),
		api,
		api.loadMessagesIfMissing([
			'invert',
			'nuke', 
			'nuke-linkoncontribs',
			'nuke-linkoncontribs-text',
			'nuke-tools',
			'nuke-submit-delete',
			'nuke-submit-user',
			'nuke-list',
			'nuke-list-multiple',
			'nuke-deleted',
			'nuke-not-deleted',
			'nuke-editby',
			'nuke-nopages',
			'nuke-userorip',
			'nuke-namespace',
			'nuke-maxpages',
		])
	);
}).then(function(rights, api) {
	if (window.Nuke && window.Nuke.loaded) return this.warn('Script was double loaded, exiting...');
	else if (![-1, 2, 3, 1200].includes(this.wg.wgNamespaceNumber) 
		&& !(this.wg.wgNamespaceNumber === 500 && !this.wg.wgPageName.includes('/'))
	) return this.log('Namespace is not supported, exiting...');
	else if (!rights.includes('delete')) return this.log('User cannot delete pages, exiting...');

	var Nuke = window.Nuke = Object.assign(this, {
		loaded: true,
		limit: Number(mw.util.getParamValue('nukelimit') || 500),
		deleteDelay: window.nukeDelay || 1000,
		label: mw.msg('nuke'),
		contribsLabel: mw.msg('nuke-linkoncontribs'),
		token: mw.user.tokens.values.editToken,
		
		init: function() {
			$('.page-header__title').text(this.label);
			document.title = this.label + " | " + this.wg.wgSiteName + " | Fandom";
			mw.util.addCSS('.thumbnail-nuke {\
				max-width: 250px;\
				width: auto;\
				height: 80px;\
			}\
			\
			li.nuke-query-result:hover {\
				cursor: pointer !important;\
				background: rgba(0, 0, 0, 0.5)\
			}\
			\
			li.nuke-query-result {\
				transition: 0.3s background ease;\
			}\
			\
			button {\
				cursor: pointer !important;\
			}');

			if (mw.util.getParamValue('nukeuser')) {
				this.loadUserUI();
			} else {
				this.loadMainUI();
			}
			$(document.body).on('click', '.nuke-submit', this.submitHandler);
		},
		
		msg: function(name) {
			return mw.message.apply(mw, [name].concat(Array.from(arguments).slice(1))).parse();
		},
		
		rcSubmit: function() {
			if ($('#nuke-rc').attr('disabled')) return;

			$('#nuke-rc').attr('disabled', true);
			$('.nuke-check-all, .nuke-invert').remove();
			
			if ($('#nuke-username').val()) {
				var locationParams = {
					blankspecial: 'nuke',
					nukeuser: $('#nuke-username').val()
				};

				if ($('#nuke-namespace').val() !== "All")
					locationParams.nukenamespace = $('#nuke-namespace').val();

				if ($.isNumeric($('#nuke-max').val()) && $('#nuke-max').val() > 0)
					locationParams.nukelimit = $('#nuke-max').val();

				if ($('#nuke-match').val())
					locationParams.nukematch = $('#nuke-match').val();

				location.replace(mw.util.getUrl('Special:Blankpage', locationParams));
				return;
			}

			$('#nuke-query-results').empty();

			if ($('.nuke-submit').length) {
				$('.nuke-submit').remove();
				$('#mw-content-text > p:nth-child(1) > br:nth-child(14)').remove();
			}

			$('#nuke-status').html('Getting pages... please wait <img src="https://static.wikia.nocookie.net/dev/images/c/c5/Circle_throbber.gif/revision/latest"/>');
			this.queryRecentChanges();
		},

		submitHandler: function() {
			if (!$('.nuke-query-result, .nuke-title-check:checked').length || $(this).attr('disabled')) return;

			$('.nuke-submit, .nuke-check-all, .nuke-invert, #nuke-protect').attr('disabled', true);
			$('#nuke-status').html('Deleting pages... please wait <img src="https://static.wikia.nocookie.net/dev/images/c/c5/Circle_throbber.gif/revision/latest"/>');
			$('.nuke-title-check:checked').each(function(i) {
				var title = $(this).parent().find('a').first().text();
				setTimeout(function() {
					api.post({
						action: 'delete',
						title: title,
						reason: $('#nuke-delete-reason').val() || '',
						bot: true,
						token: this.token,
						watchlist: 'nochange',
					}).then(function() {
						this.notify('success', this.msg('nuke-deleted', title));
						
						$('#nuke-protect').prop('checked') ? api.post({
							action: 'protect',
							protections: 'create=sysop',
							expiry: 'infinite',
							bot: true,
							watchlist: 'nochange',
							token: this.token,
							title: title,
							reason: $('#nuke-delete-reason').val(),
						}).then(function() {
							this.notify('success', 'Protection of ' + title + ' successful!');
						}.bind(this), function(_, data) {
							this.notify('warn', 'Failed to protect ' + title + ':', data.error.info);
						}.bind(this)) : undefined;
					}.bind(this), function(_, data) {
						this.notify('warn', this.msg('nuke-not-deleted').replace(/\.$/, ': ' + data.error.info));
					}.bind(this));
					
					if (i === $('.nuke-title-check:checked').length - 1) {
						setTimeout(function() {
							this.log('Deletions All Done, redirecting...');
							
							location.replace(
								!mw.util.getParamValue('nukeuser') 
								
								? mw.util.getUrl(
									'Special:BlankPage', 
									$.extend({ blankspecial: 'nuke' }, this.parseUrlParams(location.search))
								)
								
								: mw.util.getUrl(
									mw.util.getParamValue('returnto') 
									|| ("Special:Contributions/" + mw.util.getParamValue('nukeuser')),
									mw.util.getParamValue('returntoparams') ? this.parseUrlParams(mw.util.getParamValue('returntoparams')) : ''
								)
							);
						}.bind(this), 1000);
					}
				}.bind(Nuke), i * this.deleteDelay);
			});
		},

		loadUserUI: function() {
			var user = mw.util.getParamValue('nukeuser').replace(/_/g, ' '),
				deleteReason = mw.html.escape(
					mw.util.getParamValue('nukereason') 
						|| window.nukeDeleteReason && window.nukeDeleteReason.replaceAll(/\$1/g, user) 
						|| "Mass removal of pages created by [[Special:Contributions/" + user + "|" + user + "]] ([[User talk:" + user + "|talk]])"
				);
				
			this.addCheckboxHandler();

			$('#mw-content-text p').html($('<span>', { html: [
				$('<a>', {
					href: mw.util.getUrl('Special:Blankpage', { blankspecial: 'nuke' }),
					html: "Switch to Nuke main form",
				}),
				 '<br/>',
				this.msg('nuke-list', user),
				'<br>',
				'Deletion reason: ',
				$('<input>', {
					css: {
						width: "400px"
					},
					type: "text",
					id: "nuke-delete-reason",
					value: deleteReason,
				}),
				$('<div>', {
					html: [
						$('<input>', {
							type: "checkbox",
							name: "nuke-protect",
							id: "nuke-protect",
							title: 'Check this box to protect deleted pages from re-creation',
						}),
						$('<label>', {
							html: "Protect deleted pages",
							'for': 'nuke-protect',
							id: "nuke-protect-label",
							title: 'Check this box to protect deleted pages from re-creation',
						}),
					],
					class: "nuke-label",
				}),
				$('<hr>', { css: { 'margin': '0 20px;' }}),
				$("<button>", {
					class: "nuke-submit",
					html: this.msg('nuke-submit-delete') + ' (0)',
				}),
				$('<div>', { id: "nuke-status" }),
				$('<ul>', { id: "nuke-query-results" }),
				$("<button>", { 
					class: "nuke-submit",
					html: this.msg('nuke-submit-delete') + ' (0)',
				}),
			]}));
			
			$('#nuke-status')
				.html('Getting pages... please wait <img src="https://static.wikia.nocookie.net/dev/images/c/c5/Circle_throbber.gif/revision/latest"/>');
			this.queryUserContribs(user);
			
			$('#nuke-status').empty();
		},
		
		 		
		loadMainUI: function() {
			this.addCheckboxHandler();
			
			$('#mw-content-text p').html($('<span>', { html: [
				this.msg('nuke-tools'),
				'<br/>', 
				this.msg('nuke-userorip'),
				$('<input>', {
					type: "text",
					id: "nuke-username",
				}),
				'<br>', 
				'Regex pattern (e.g. <code>.*</code>) for the page name: ',
				$('<input>', {
					type: "text",
					id: "nuke-match",
					value: mw.util.getParamValue('nukepattern'),
				}),
				'<br>', 
				this.msg('nuke-namespace'),
				$('<select>', {
					id: "nuke-namespace",
					name: "nuke-namespace",
					html: [
						$('<option>', {
							value: "all",
							selected: "",
							html: "all",
						}),
					].concat(this.generateNamespaceSelect()),
				}),
				'<br>', 
				this.msg('nuke-maxpages'),
				$('<input>', {
					type: "text",
					id: "nuke-max",
					value: mw.util.getParamValue('nukelimit') || 500,
				}),
				'<br>',
				'Deletion Reason: ',
				$('<input>', {
					type: "text",
					id: "nuke-delete-reason",
					value: mw.util.getParamValue('nukereason'),
				}),
				'<br>', 
				$('<input>', {
					type: "checkbox",
					name: "nuke-protect",
					id: "nuke-protect",
					title: 'Check this box to protect deleted pages from re-creation',
				}),
				$('<label>', {
					html: "Protect deleted pages",
					'for': 'nuke-protect',
					id: "nuke-protect-label",
					title: 'Check this box to protect deleted pages from re-creation',
				}),
				$('<div>', {
					html: $("<input>", {
						class: "wikia-button",
						id: "nuke-rc",
						name: "nuke-rc",
						value: this.msg('nuke-submit-user'),
						type: "submit",
						click: this.rcSubmit.bind(this),
					}),
					css: {
						'margin-top': '10px',
						'margin-bottom': "30px",
					},
				}),
				$('<div>', {
					id: "nuke-status"
				}),
				$('<hr>'),
				$('<ul>', {
					id: "nuke-query-results",
				}),
			]}));
			
			$('#nuke-namespace').val(mw.util.getParamValue('nukenamespace'));
		},
		
		queryUserContribs: function(user) {
			api.get({
				action: 'query',
				list: 'usercontribs',
				ucnamespace: mw.util.getParamValue('nukenamespace') || '',
				ucuser: user,
				uclimit: 'max',
			}).then(function(d) {
				var usercontribs = d.query.usercontribs,
					images = [],
					count = 0;

				usercontribs.forEach(function(contrib) {
					if (count >= this.limit) return;

					if ('new' in contrib) {
						if (!mw.util.getParamValue('nukematch') || new RegExp(mw.util.getParamValue('nukematch')).test(contrib.title)) {
							count++;
							$('#nuke-query-results').append(
								$('<li>', {
									class: "nuke-query-result",
									html: [
										$('<input>', {
											type: "checkbox",
											class: "nuke-title-check",
											checked: "checked",
										}),
										$('<a>', {
											href: mw.util.getUrl(contrib.title),
											target: "_blank",
											title: contrib.title,
											text: mw.html.escape(contrib.title),
										}),
										'&nbsp;(',
										$('<a>', {
											target: "_blank",
											href: mw.util.getUrl(contrib.title, { action: "info" }),
											title: contrib.title,
											text: "info",
										}),
										')',
									],
								})
							);
							if (contrib.title.indexOf(this.wg.wgFormattedNamespaces[6] + ':') === 0)
								images.push(contrib.title);
						}
					}
				}, this);
				
				if (!$('.nuke-query-result').length) {
					this.notify('error', this.msg('nuke-nopages', user));
				} else {
					if (images.length > 0) this.displayImages(images);
					this.addCheckToggleButton();
					$('.nuke-submit').html(this.msg('nuke-submit-delete') + ' (' + $('.nuke-title-check:checked').length + ')');
				}
			}.bind(this).bind(this), function(_, data) {
				this.notify('error', "Failed to get user contributions: " + data.error.info);
			}.bind(this));	
		},
		
		queryRecentChanges: function() {
			api.get({
				action: 'query',
				list: 'recentchanges',
				rcshow: '!bot',
				rctype: 'new|log',
				rclimit: 'max',
			}).then(function(d) {
				var recentchanges = d.query.recentchanges,
					rcTitles = [],
					maxLimit = $('#nuke-max').val() || 5000,
					images = [],
					count = 0;
	
				recentchanges.forEach(function(page) {
					if (count >= maxLimit) return;
					if (
						rcTitles.indexOf(page.title, rcTitles) === -1 && (
							$('#nuke-namespace').val() === "All" ||
							Number($('#nuke-namespace').val()) === page.ns
						) && (page.type === "new" || (
							page.type === "log" &&
							page.ns === 6
						))
					) {
						if (!$('#nuke-match').val() || new RegExp($('#nuke-match').val()).test(page.title)) {
							count++;
							rcTitles.push(page.title);
							$('#nuke-query-results').append($('<li>', {
								class: "nuke-query-result",
								html: [
									$('<input>', {
										type: "checkbox",
										class: "nuke-title-check",
										checked: "checked",
									}),
									$('<a>', {
										href: mw.util.getUrl(page.title),
										target: "_blank",
										title: page.title,
										text: mw.html.escape(page.title),
									}),
									'&nbsp;(',
									$('<a>', {
										target: "_blank",
										href: mw.util.getUrl(page.title, { action: "info" }),
										title: page.title,
										text: "info",
									}),
									')',
								],
							}));
							if (page.title.indexOf(this.wg.wgFormattedNamespaces[6] + ':') === 0)
								images.push(page.title);
						}
					}
				}, this);
				
				if (!$('.nuke-query-result').length) {
					this.notify('error', "No recent changes found");
				} else {
					var $button = $('<button>', {
						class: "nuke-submit",
						html: 'Delete selected (' + $('.nuke-title-check:checked').length + ')</a>',
					});
						
					$('#nuke-query-results').before($button).after($button.clone());
	
					$('#nuke-status').empty();
					$('.nuke-sumbit, .nuke-check-all, .nuke-invert').remove();
					
					this.addCheckToggleButton();
	
					if (images.length > 0) this.displayImages(images);
				}
			}.bind(this), function(_, data) {
				this.notify('error', "Failed to get recent changes: " + data.error.info);
			}.bind(this));
	
			$('#nuke-status').empty();
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
						text: namespace === "" ? "(Main)" : namespace,
					});
				});
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
			
			$('#mw-content-text').on('click', 'li.nuke-query-result', function(e) {
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
			$('.nuke-submit')
				.after(
					$('<button>', {
						class: "nuke-check-all",
						'data-checked': true,
						text: "Uncheck All",
					}),
					$('<button>', {
						text: this.msg('invert'),
						class: "nuke-invert",
					})
				);

			$('.nuke-submit').text(this.msg('nuke-submit-delete') + ' (' + $('.nuke-title-check:checked').length + ')');
			
			// Check/Uncheck all
			$('.nuke-check-all').click(function() {
				var checked = $(this).attr('data-checked') === "true";
				
				$('.nuke-title-check').prop('checked', !checked);
				$('.nuke-check-all')
					.attr('data-checked', !checked)
					.text(!checked ? "Uncheck All" : 'Check All');  
			});
			
			// Invert/Uninvert all
			$('.nuke-invert').click(function() {
				$('.nuke-title-check').each(function() {
					$(this).prop('checked', !$(this).prop('checked'));	
				});
			});
			
			// Update count
			$(document.body).on("click", '.nuke-query-result, .nuke-check-all, .nuke-invert', function() {
				$('.nuke-submit').html(this.msg('nuke-submit-delete') + ' (' + $('.nuke-title-check:checked').length + ')');
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
							.children('.nuke-title-check')
							.after($('<a>', {
								href: href,
								html: $('<img>', {
									class: "thumbnail-nuke",
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
	
	var inter = setInterval(function() {
		var username = this.wg.wgRelevantUserName || this.wg.profileUserName;
		
		if ($('.page-tools-module').length) {
			clearInterval(inter);
			
			var $el = $('<li>', {
				id: "t-nuke",
				html: $('<a>', {
					text: this.label,
					title: window.nukeTitle || this.msg('nuke-linkoncontribs-text', username),
					href: mw.util.getUrl('Special:BlankPage', {
						blankspecial: 'nuke',
						nukeuser: username,
					}),
				}),
			});
			
			var $list = $('.page-tools-module ul');
			
			if ($list.find('li#t-reconst').length || window.Reconstitute) {
				$list.find('li#t-reconst').before($el);
			} else {
				$list.find('li:is(#t-userrights, :last-of-type)').first().after($el);
			}
		}
	}.bind(this));
	
	switch (this.wg.wgCanonicalSpecialPageName) {
		case "UserProfileActivity":
		case "DeletedContributions":
		case "Contributions": {
			var usr = this.wg.wgRelevantUserName || this.wg.profileUserName,
				nukeTitle = window.nukeTitle || this.msg('nuke-linkoncontribs-text', usr),
				url = mw.util.getUrl('Special:BlankPage', {
					blankspecial: 'nuke',
					nukeuser: usr,
				});

			if (usr) {
				var $el = $('<span>', {
					id: "link-nuke",
					html: $('<a>', {
						title: nukeTitle,
						href: url,
						text: this.contribsLabel,
					}),
				});
				
				if (!window.QuickLogs) {
					if (this.wg.wgCanonicalSpecialPageName === 'DeletedContributions') {
						$('.page-header__subtitle > a:last-of-type').after(' | ', $el.find('a'));
					} else {
						if ($('#link-rconst').length) {
							$('#link-rconst').before($el);
						} else {
							$([
								'.mw-contributions-user-tools > .mw-changeslist-links > span:last-child',
								'.UserProfileActivityModeration__links > span:last-child',
							].join(', ')).after($el);
						}
					}	
				}
				mw.hook('QuickLogs.loaded').add(function(ql) {
					ql.addLink('nuke', {
						href: url,
						title: nukeTitle,
						message: this.contribsLabel,
					});
				});
			}

			break;
		}

		case "AdminDashboard":
		case "Specialpages": {
			var link = mw.util.getUrl('Special:Blankpage', { blankspecial: 'nuke' });
			var canNuke = rights.includes('nuke');
			
			$(canNuke
				? '#mw-content-text a[href*="Special:Nuke"]'
				: '#mw-content-text a[title="Special:Undelete"]'
			).after(
				$('<li>', { 
					class: "mw-specialpagerestricted",
					html: $('<a>', {
						title: "Special:Nuke",
						href: link,
						text: this.label + (canNuke ? ' (JavaScript)' : ""),
					}),
				})
			);
			break;
		}
		case "Blankpage": {
			if (mw.util.getParamValue('blankspecial') === "nuke")
				this.init();
			break;
		}
	}
}.bind(function() {
	Object.keys(this).forEach(function(key) {
		this[key] = function() {
			console[key].apply(null, [ '[Nuke v1.5] [' + key.toUpperCase() + ']' ].concat(Array.from(arguments)));
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
	
	return this;
}.call({
	error: console.error,
	warn: console.warn,
	log: console.log,
	debug: console.debug,
})));

window.Nuke = window.Nuke || {};