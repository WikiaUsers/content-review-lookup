/*
* Nuke
* Reverse engineered Nuke extension
* https://www.mediawiki.org/wiki/Extension:Nuke
* Modified by Applemasterexpert (Thanks to Dev)
*/

mw.loader.using(['mediawiki.util', 'mediawiki.api'], function() {

var config = mw.config.get([
		'wgUserGroups',
		'stylepath',
		'wgCanonicalSpecialPageName',
		'wgFormattedNamespaces',
		'wgMainpage',
		'wgPageName',
		'wgSiteName'
	]),
	token = mw.user.tokens.get('editToken'),
	api = new mw.Api(),
	deleteDelay = window.nukeDelay || 1000;

if (
	window.NukeLoaded ||
	!/sysop|bureaucrat|vstf|staff|helper|content-volunteer|content-moderator/.test(config.wgUserGroups.join())
) {
	return;
}
window.NukeLoaded = true;

var self = {
	init: function() {

		$('#PageHeader h1.page-header__title').text('Nuke');
		document.title = "Nuke - " + config.wgSiteName;
		mw.util.addCSS('.thumbnail-nuke { max-width: 250px; width: auto; height: 85px; }');

		if (mw.util.getParamValue('nukeuser')) {
			var user = mw.util.getParamValue('nukeuser'),
				deleteReason = mw.html.escape(window.nukeDeleteReason || "Mass removal of pages created by " + user.replace(/_/g,' '));

			$('#mw-content-text p').html(
				'<a href="' + mw.util.getUrl('Special:Blankpage', {blankspecial: 'nuke'}) + '">Switch to Nuke main form</a>' +
				'<br/>' +
				'The following pages were created by <a href="' + mw.util.getUrl('Special:Contributions/' + user) + '">' + mw.html.escape(user.replace(/_/g,' ')) + '</a>; put in a comment and hit the button to delete them.' +
				'<br/>' +
				'Reason for deletion: <input style="width: 500px" type="text" id="nuke-delete-reason" value="' + deleteReason + '"/>' +
				'<br/>' +
				'<a class="wikia-button nuke-submit">Delete</a>' +
				'<div id="nuke-status"/>' +
				'<ul id="nuke-query-results"></ul>' +
				'<a class="wikia-button nuke-submit">Delete</a>'
			);
			$('#nuke-status').html('Getting pages... please wait <img src="' + config.stylepath + '/common/progress-wheel.gif"/>');

			api.get({
				action: 'query',
				list: 'usercontribs',
				ucnamespace: mw.util.getParamValue('nukenamespace') || '',
				ucuser: user,
				uclimit: 'max',
				cb: Date.now()
			})
			.done(function(d) {
				if (!d.error) {
					var usercontribs = d.query.usercontribs,
						maxLimit = mw.util.getParamValue('nukelimit') || 10000,
						count = 0,
						images = [];

					for (var i in usercontribs) {
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
						if (images.length > 0)
							self.displayImages(images);
					}
				}
				else
					self.outputError("Failed to get user contributions: " + d.error.code);
			})
			.fail(function() {
				self.outputError("Failed to get user contributions");
			});
			$('#nuke-status').empty();
		}
		else {
			$('#mw-content-text p').html(
				'This tool allows for mass deletions of pages recently added by a given user or IP address.' +
				'<br/>' +
				'Input the username or IP address to get a list of pages to delete, or leave blank for all users.' +
				'<br/>' +
				'Username, IP address or blank: <input type="text" id="nuke-username"/>' +
				'<br/>' +
				'Pattern for the page name: <input type="text" id="nuke-match"/>' +
				'<br/>' +
				'Limit to namespace: <select id="nuke-namespace">' +
					'<option value="All">All</option>' +
					'<option value="0">Main</option>' +
					'<option value="1">Talk</option>' +
					'<option value="2">User</option>' +
					'<option value="3">User talk</option>' +
					'<option value="4">Project</option>' +
					'<option value="5">Project talk</option>' +
					'<option value="6">File</option>' +
					'<option value="7">File talk</option>' +
					'<option value="10">Template</option>' +
					'<option value="11">Template talk</option>' +
					'<option value="12">Help</option>' +
					'<option value="13">Help talk</option>' +
					'<option value="14">Category</option>' +
					'<option value="15">Category talk</option>' +
				'</select>' +
				'<br/>' +
				'Maximum number of pages: <input type="text" id="nuke-max" value="500"/>' +
				'<br/>' +
				'<a class="wikia-button" id="nuke-rc">Go</a>' +
				'<br/>' +
				'<div id="nuke-status"/>' +
				'<div id="nuke-query-results"/>'
			);

			$('#nuke-rc').click(function() {
				if ($(this).attr('disabled')) return;

				$(this).attr('disabled','disabled');

				if ($('#nuke-username').val()) {
					var locationParams = {
						blankspecial: 'nuke',
						nukeuser: $('#nuke-username').val()
					};

					if ($('#nuke-namespace').val() != "All")
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
				.done(function(d) {
					if (!d.error) {
						var recentchanges = d.query.recentchanges,
							RCTitles = [],
							maxLimit = $('#nuke-max').val() || 5000,
							count = 0,
							images = [];

						for (var i in recentchanges) {
							if (count >= maxLimit) break;

							if (
								$.inArray(recentchanges[i].title, RCTitles) === -1
								&& (
									$('#nuke-namespace').val() === "All"
									|| Number($('#nuke-namespace').val()) === recentchanges[i].ns
								)
								&& (
									recentchanges[i].type === "new"
									|| (
										recentchanges[i].type === "log"
										&& recentchanges[i].ns === 6
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
						if (!$('.nuke-query-result').length)
							self.outputError("No recent changes found");
						else {
							$('#nuke-query-results')
								.before('<br/><a class="wikia-button nuke-submit">Delete</a>')
								.after('<a class="wikia-button nuke-submit">Delete</a>');
							$('#nuke-status').empty();
							if (images.length > 0)
								self.displayImages(images);
						}
					}
					else
						self.outputError("Failed to get recent changes: " + d.error.code);
				})
				.fail(function() {
					self.outputError("Failed to get recent changes");
				});
				$('#nuke-status').empty();
				$(this).removeAttr('disabled');
			});
		}

		$('.nuke-submit').click(function() {
			if (!$('.nuke-query-result').length || $(this).attr('disabled')) return;

			$('.nuke-submit').attr('disabled','disabled');
			$('#nuke-status').html('Deleting pages... please wait <img src="' + config.stylepath + '/common/progress-wheel.gif"/>');
			$('.nuke-title-check:checked').each(function(i) {
				var title = $(this).parent().find('a').text();
				setTimeout(function() {
					api.post({
						action: 'delete',
						title: title,
						reason: $('#nuke-delete-reason').val() || '',
						bot: true,
						token: token
					})
					.done(function(d) {
						if (!d.error) {
							console.log('Deletion of ' + title + ' successful!');
						}
						else {
							console.log('Failed to delete ' + title + ': '+ d.error.code);
						}
					})
					.fail(function() {
						console.log('Failed to delete ' + title);
					});
					if (i === $('.nuke-title-check:checked').length - 1) {
						setTimeout(function() {
							location.replace(mw.util.getUrl(config.wgMainpage));
						}, 1000);
					}
				}, i*deleteDelay);
			});
		});
	},
	outputError: function(text) {
		new BannerNotification(mw.html.escape(text), 'error').show();
	},
	displayImages: function(imgs) {
		api.post({ //POST instead of GET for longer length
			action: 'query',
			prop: 'imageinfo',
			titles: imgs.join('|'),
			iiprop: 'url',
			iilimit: 'max'
		})
		.done(function(d) {
			if (!d.error) {
				for (var i in d.query.pages) {
					if (d.query.pages[i].missing !== "" && d.query.pages[i].imageinfo) {
						var href = mw.util.getUrl(d.query.pages[i].title);
						$('a[href="' + href + '"]').parent().children('.nuke-title-check').after(
							'<a href="' + href + '">' +
							'<img class="thumbnail-nuke" src="' + d.query.pages[i].imageinfo[0].url + '" />' +
							'</a>'
						);
					}
				}
			}
			else
				self.outputError('Failed to display images: ' + d.error.code);
		})
		.fail(function() {
			self.outputError('Failed to display images');
		});
	}
};

switch (config.wgCanonicalSpecialPageName) {
	case "Contributions":
		var usr = mw.util.getParamValue('target') || config.wgPageName.split('/')[1],
			url = mw.util.getUrl('Special:BlankPage', {
				blankspecial: 'nuke',
				nukeuser: usr
			});
		if (usr) {
			if (!window.QuickLogs) {
				$('#contentSub a:last-child').after(' | <a title="Special:Nuke" href="' + url + '">Nuke</a>');
			}
			mw.hook('QuickLogs.loaded').add(function(ql) {
				ql.addLink('nuke', {
					href: url,
					message: 'Nuke'
				});
			});
		}

	break;

	case "Specialpages":
		if (!$('a[title="Special:Nuke"]').length)
			$('.mw-specialpagerestricted a[title="Special:Undelete"]').after(
				'<li class="mw-specialpagerestricted">' +
				'<a title="Special:Nuke" href="' + mw.util.getUrl('Special:Blankpage', {blankspecial: 'nuke'}) + '">Mass delete</a>' +
				'</li>'
			);
		else
			$('.mw-specialpagerestricted a[title="Special:Nuke"]').after(
				'<li class="mw-specialpagerestricted">' +
				'<a title="Special:Nuke" href="' + mw.util.getUrl('Special:Blankpage', {blankspecial: 'nuke'}) + '">Mass delete (JavaScript)</a>' +
				'</li>'
			);
	break;

	case "Blankpage":
		if (mw.util.getParamValue('blankspecial') == "nuke")
			self.init();
	break;
}

});