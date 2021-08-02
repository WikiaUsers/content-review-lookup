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
	noarg: true, undef: true,
	undef: true, unused: true,
	browser: true, jquery: true,
	onevar: true, eqeqeq: true,
	multistr: true, maxerr: 999999,
	-W082, -W084
*/
/* global mw, BannerNotification */
mw.loader.using(['jquery.client', 'mediawiki.util', 'mediawiki.api', 'mediawiki.user'], function() {
	
	var config = mw.config.get([
			'wgUserGroups',
			'stylepath',
			'wgCanonicalSpecialPageName',
			'wgFormattedNamespaces',
			'wgMainpage',
			'wgPageName',
			'wgSiteName',
			'wgFormattedNamespaces',
		]),
		token = mw.user.tokens.get('editToken'),
		api = new mw.Api(),
		deleteDelay = window.nukeDelay || 1000;

	if (
		window.NukeLoaded ||
		!/sysop|staff|helper|wiki-representative|content-moderator|wiki-specialist|soap/.test(config.wgUserGroups.join())
	) {
		return;
	}
	window.NukeLoaded = true;

	var self = {
		init: function() {
			$('.page-header__title').text('Nuke');
			document.title = "Nuke | " + config.wgSiteName + " | Fandom";
			mw.util.addCSS('.thumbnail-nuke { max-width: 250px; width: auto; height: 80px; }');

			if (mw.util.getParamValue('nukeuser')) {
				this.loadUserUI()
					.done(function() {
						self.deletePages();
					});
			} else {
				this.loadMainUI()
					.done(function() {
						self.deletePages();
					});
			}
		},
		
		deletePages: function() {
			$('.wikia-button.nuke-submit').click(function() {
				if (!$('.nuke-query-result').length || $(this).attr('disabled')) return;

				$('.nuke-submit, .nuke-check-all').attr('disabled', true);
				$('#nuke-status').html('Deleting pages... please wait <img src="' + config.stylepath + '/common/progress-wheel.gif"/>');
				$('.nuke-title-check:checked').each(function(i) {
					var title = $(this).parent().find('a').text();
					setTimeout(function() {
						api.post({
							action: 'delete',
							title: title,
							reason: $('#nuke-delete-reason').val() || '',
							bot: true,
							token: token,
							watchlist: 'nochange',
						}).then(function() {
							console.log('Deletion of ' + title + ' successful!');
							
							$('#nuke-protect').attr('checked') ? api.post({
								action: 'protect',
								protections: 'create=sysop',
								expiry: 'infinite',
								bot: true,
								watchlist: 'nochange',
								token: token,
								title: title,
								reason: $('#nuke-delete-reason').val() || '',
							}).then(function() {
								console.log('Protection of ' + title + ' successful!');
							}, function(_, data) {
								console.warn('Failed to protect ' + title + 'successful:', data.error.info);
							}) : undefined;
						}, function(_, data) {
							console.warn('Failed to delete ' + title + ': ' + data.error.info);
						});
						
						if (i === $('.nuke-title-check:checked').length - 1) {
							setTimeout(function() {
								console.log('Deletions All Done, redirecting...');
								
								location.replace(
									!mw.util.getParamValue('nukeuser') 
									
									? mw.util.getUrl(
										'Special:BlankPage', 
										$.extend({ blankspecial: 'nuke' }, self.parseUrlParams(location.search))
									)
									
									: mw.util.getUrl(
										mw.util.getParamValue('returnto') 
										|| ("Special:Contributions/" + mw.util.getParamValue('nukeuser')),
										mw.util.getParamValue('returntoparams') ? self.parseUrlParams(mw.util.getParamValue('returntoparams')) : ''
									)
								);
							}, 1000);
						}
					}, i * deleteDelay);
				});
			});
		},
		
		loadUserUI: function() {
			var user = mw.util.getParamValue('nukeuser'),
				deleteReason = mw.html.escape(mw.util.getParamValue('nukereason') || window.nukeDeleteReason || "Mass removal of pages created by " + user.replace(/_/g, ' ')),
				$promise = $.Deferred();

			$('#mw-content-text p').html($('<span>', { html: [
				$('<a>', {
					href: mw.util.getUrl('Special:Blankpage', { blankspecial: 'nuke' }),
					html: "Switch to Nuke main form",
				}),
				 $('<br/>'),
				$('<a>'),
				'The following pages were recently created by ',
				$('<a>', {
					href: mw.util.getUrl('Special:Contributions/' + user),
					html: mw.html.escape(user.replace(/_/g, ' '))
				}),
				'; put in a comment and hit the button to delete them.',
				$('<br/>'),
				'Reason for deletion: ',
				$('<input>', {
					css: {
						width: "400px"
					},
					type: "text",
					id: "nuke-delete-reason",
					value: deleteReason,
				}),
				$('<br/>'),
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
				$('<hr>', { css: { 'margin': '0 20px;' }}),
				$("<button>", {
					class: "wikia-button nuke-submit",
					html: "Delete selected",
				}),
				$('<div>', { id: "nuke-status" }),
				$('<ul>', { id: "nuke-query-results" }),
				$("<button>", { 
					class: "wikia-button nuke-submit",
					html: "Delete selected",
				}),
			]}));
			
			$('#nuke-status').html('Getting pages... please wait <img src="https://static.wikia.nocookie.net/dev/images/c/c5/Circle_throbber.gif/revision/latest"/>');

			api.get({
				action: 'query',
				list: 'usercontribs',
				ucnamespace: mw.util.getParamValue('nukenamespace') || '',
				ucuser: user,
				uclimit: 'max',
				cb: Date.now()
			}).then(function(d) {
				var usercontribs = d.query.usercontribs,
					maxLimit = mw.util.getParamValue('nukelimit') || 500,
					count = 0,
					images = [];

				for (var i in usercontribs) {
					if (!usercontribs.hasOwnProperty(i)) continue;
					if (count >= maxLimit) break;

					if (usercontribs[i].hasOwnProperty('new')) {
						if (!mw.util.getParamValue('nukematch') || new RegExp(mw.util.getParamValue('nukematch')).test(usercontribs[i].title)) {
							$('#nuke-query-results').append(
								'<li class="nuke-query-result">' +
								'<input type="checkbox" class="nuke-title-check" checked="checked"/>' +
								' <a href="' + mw.util.getUrl(usercontribs[i].title) + '" target="_blank">' + mw.html.escape(usercontribs[i].title) + '</a>' +
								'</li>'
							);
							if (usercontribs[i].title.indexOf(config.wgFormattedNamespaces[6] + ':') === 0)
								images.push(usercontribs[i].title);
							count++;
						}
					}
				}
				if (!$('.nuke-query-result').length)
					self.outputError("No user contributions found");
				else {
					if (images.length > 0) self.displayImages(images);
					self.checkAll();
					$('.nuke-submit').html('Deleted Selected (' + $('.nuke-title-check:checked').length + ')');
				}
				$promise.resolve();
			}, function(_, data) {
				self.outputError("Failed to get user contributions: " + data.error.info);
			});
			$('#nuke-status').empty();

			return $promise;
		},
		loadMainUI: function() {
			var $promise = $.Deferred();

			$('#mw-content-text p').html($('<span>', { html: [
				'This tool allows for mass deletions of pages recently added by a given user or an IP address.',
				'<br/>', 
				'Input the username or IP address to get a list of pages to delete, or leave blank for all users.',
				'<br/>', 
				'Username, IP address or blank: ',
				$('<input>', {
					type: "text",
					id: "nuke-username",
				}),
				$('<br/>'), 
				'Regex pattern (e.g. <code>.*</code>) for the page name: ',
				$('<input>', {
					type: "text",
					id: "nuke-match",
					value: mw.util.getParamValue('nukepattern'),
				}),
				$('<br/>'), 
				'Limit to namespace: ',
				$('<select>', {
					id: "nuke-namespace",
					name: "nuke-namespace",
					html: [
						$('<option>', {
							value: "all",
							selected: "",
							html: "all",
						}),
					].concat(Object.entries(config.wgFormattedNamespaces)
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
						})
					),
				}),
				$('<br/>'), 
				'Maximum number of pages: ',
				$('<input>', {
					type: "text",
					id: "nuke-max",
					value: mw.util.getParamValue('nukelimit') || 500,
				}),
				$('<br/>'),
				'Deletion Reason: ',
				$('<input>', {
					type: "text",
					id: "nuke-delete-reason",
					value: mw.util.getParamValue('nukereason'),
				}),
				$('<br/>'), 
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
						value: 'List pages',
						type: "submit",
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
			
			$('#nuke-rc').click(function() {
				if ($('#nuke-rc').attr('disabled')) return;

				$('#nuke-rc').attr('disabled', true);
				$('.nuke-check-all').remove();

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

				$('#nuke-status').html('Getting pages... please wait <img src="' + config.stylepath + '/common/progress-wheel.gif"/>');

				api.get({
					action: 'query',
					list: 'recentchanges',
					rcshow: '!bot',
					rctype: 'new|log',
					rclimit: 'max',
					cb: Date.now()
				})
				.then(function(d) {
					var recentchanges = d.query.recentchanges,
						RCTitles = [],
						maxLimit = $('#nuke-max').val() || 5000,
						count = 0,
							images = [];

					for (var i in recentchanges) {
						if (!recentchanges.hasOwnProperty(i)) continue;
						if (count >= maxLimit) break;

						if (
							$.inArray(recentchanges[i].title, RCTitles) === -1 &&
							(
								$('#nuke-namespace').val() === "All" ||
								Number($('#nuke-namespace').val()) === recentchanges[i].ns
							) &&
							(
								recentchanges[i].type === "new" ||
								(
									recentchanges[i].type === "log" &&
									recentchanges[i].ns === 6
								)
							)
						) {
							if (!$('#nuke-match').val() || new RegExp($('#nuke-match').val()).test(recentchanges[i].title)) {
								RCTitles.push(recentchanges[i].title);
								$('#nuke-query-results').append(
									'<li class="nuke-query-result">' +
									'<input type="checkbox" class="nuke-title-check" checked="checked"/>' +
									' <a href="' + mw.util.getUrl(recentchanges[i].title) + '" target="_blank"> ' + mw.html.escape(recentchanges[i].title) + '</a>' +
									'</li>'
								);
								if (recentchanges[i].title.indexOf(config.wgFormattedNamespaces[6] + ':') === 0)
									images.push(recentchanges[i].title);
								count++;
							}
						}
					}
					if (!$('.nuke-query-result').length) {
						self.outputError("No recent changes found");
					} else {
						$('#nuke-query-results')
							.before($('<button>', {
								class: "wikia-button nuke-submit",
								html: 'Delete selected (' + $('.nuke-title-check:checked').length + ')</a>',
							}))
							.after($('<button>', {
								class: "wikia-button nuke-submit",
								html: 'Delete selected (' + $('.nuke-title-check:checked').length + ')</a>',
							}));

						$('#nuke-status').empty();
						$('.nuke-sumbit').remove();
						$('.nuke-check-all').remove();
						
						self.checkAll();

						if (images.length > 0) self.displayImages(images);
					}

					$promise.resolve();
				}, function(_, data) {
					self.outputError("Failed to get recent changes: " + data.error.info);
				});

				$('#nuke-status').empty();
				$(this).attr('disabled', false);
			});
			return $promise;
		},
		outputError: function(text) {
			mw.notify(mw.html.escape(text), { type: "error" });
		},
		checkAll: function() {
			$('.nuke-submit')
				.after($('<button>', {
					class: "wikia-button nuke-check-all",
					'data-checked': true,
					html: "Uncheck All",
				}));

			$('.nuke-submit').html('Deleted Selected (' + $('.nuke-title-check:checked').length + ')');
			
			$('.nuke-check-all').click(function() {
				var $selec = $('.nuke-check-all');
				var checked = $(this).attr('data-checked') === "true";

				if (checked) {
					$('.nuke-title-check').attr('checked', false);
					$selec
						.attr('data-checked', false)
						.html('Check All');  
						
				} else {
					$('.nuke-title-check').attr('checked', true);
					$selec
						.attr('data-checked', true)
						.html('Uncheck All');							  
				}
			});

			this.updateCount();
		},
		updateCount: function() {
			$(document.body).on("click", '.nuke-query-result, .nuke-check-all', function() {
				$('.nuke-submit').html('Delete Selected (' + $('.nuke-title-check:checked').length + ')');
			});
		},
		displayImages: function(imgs) {
			api.post({ //POST instead of GET to avoid http 416
				action: 'query',
				prop: 'imageinfo',
				titles: imgs.join('|'),
				iiprop: 'url',
				iilimit: 'max'
			}).then(function(d) {
				for (var i in d.query.pages) {
					if (d.query.pages[i].missing !== "" && d.query.pages[i].imageinfo) {
						var href = mw.util.getUrl(d.query.pages[i].title);
						$('a[href="' + href + '"]')
							.parent()
							.children('.nuke-title-check')
							.after(
								'<a href="' + href + '">' +
								'<img class="thumbnail-nuke" src="' + d.query.pages[i].imageinfo[0].url + '" />' +
								'</a>'
							);
					}
				}
			}, function(_, data) {
				self.outputError('Failed to display images: ' + data.error.info);
			});
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
	};

	switch (config.wgCanonicalSpecialPageName) {
		case "UserProfileActivity":
		case "Contributions":
			var usr = mw.util.getParamValue('target') || config.wgPageName.split('/')[1],
				nukeTitle = window.nukeTitle || 'Special:Nuke',
				url = mw.util.getUrl('Special:BlankPage', {
					blankspecial: 'nuke',
					nukeuser: usr,
				});

			if (usr) {
				var el = $('<span>', {
					html: $('<a>', {
						title: nukeTitle,
						href: url,
						text: "Nuke",
					}),
				});
				
				if (!window.QuickLogs) {
					if (config.wgCanonicalSpecialPageName === "UserProfileActivity") {
						$('.UserProfileActivityModeration__links > span:last-child').after(el);
					} else {
						$('.mw-contributions-user-tools > .mw-changeslist-links > span:last-child').after(el);
					}
				}
				mw.hook('QuickLogs.loaded').add(function(ql) {
					ql.addLink('nuke', {
						href: url,
						title: nukeTitle,
						message: 'Nuke'
					});
				});
			}

			break;

		case "Specialpages":
			if (!$('a[title="Special:Nuke"]').length)
				$('.mw-specialpagerestricted a[title="Special:Undelete"]').after(
					'<li class="mw-specialpagerestricted">' +
					'<a title="Special:Nuke" href="' + mw.util.getUrl('Special:Blankpage', { blankspecial: 'nuke' }) + '">Mass delete</a>' +
					'</li>'
				);
			else
				$('.mw-specialpagerestricted a[title="Special:Nuke"]').after(
					'<li class="mw-specialpagerestricted">' +
					'<a title="Special:Nuke" href="' + mw.util.getUrl('Special:Blankpage', { blankspecial: 'nuke' }) + '">Mass delete (JavaScript)</a>' +
					'</li>'
				);
			break;

		case "Blankpage":
			if (mw.util.getParamValue('blankspecial') === "nuke")
				self.init();
			break;
	}

}).catch(function(e) {
	console.warn('Error in loading Nuke: ' + e); 
});