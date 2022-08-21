/* jshint
	esversion: 6, forin: true, esnext: false,
	immed: true, indent: 4, 
	latedef: true, newcap: true,
	noarg: true, undef: true,
	undef: true, unused: true,
	browser: true, jquery: true,
	onevar: true, eqeqeq: true,
	multistr: true, maxerr: 999999,
	-W082, -W084, -W090, -W040
*/
/* global mw, importArticles */
mw.loader.using([ 'mediawiki.api', 'mediawiki.util', 'mediawiki.notification' ]).then(function() {
	"use strict";
 
	window.ajaxAbuseLog = {};
	var userGroups = mw.config.get('wgUserGroups');
 
	function logMsg(msg) {
		console.log('[AjaxAbuseLog V0.4.1] [LOG]:', msg);
	}
 
	if (!/sysop|util|staff|helper|wiki-representative|wiki-specialist|soap/.test(userGroups.join('\n')) ||
		window.ajaxAbuseLogInit
	) {
		logMsg('Script Double loaded, or user rights requirements not met, skipping import.');
		return;
	}
	window.ajaxAbuseLogInit = true;

	var msg;
	var pagePathname = mw.config.get('wgArticlePath').replace('$1', '');
 
	mw.util.addCSS('.mw-abuselog-details { width: 100% !important; } #ajax-abuselog-modal { width: 100% !important; height: 100% !important }');
 
	function entryExists(entry) {
		return new mw.Api().post({
			"action": "query",
			"format": "json",
			"list": "abuselog",
			"afllimit": "1",
			"afllogid": Number(entry),
		}).then(function(afData) {
			return (afData.query.abuselog.length > 0) && (afData.query.abuselog[0].id >= Number(entry));
		}).catch(function(error) {
			console.warn(error);
			return false;
		});
	}
 
	function main(e) {
		if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
			logMsg('Key to prevent modal has been pressed, exiting...');
			return;
		}
 
		var id = Number($(this).attr('href').match(/Special:AbuseLog\/(\d{1,})/)[1]);
 
		e.preventDefault();
 
		$.ajax({
			cache: true,
			dataType: "script",
			url: "https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:QDmodal.js"
		}).done(function() {
			var myModal = new mw.libs.QDmodal("ajax-abuselog-modal");
			$('.qdmodal-container').remove();
			myModal
				.show({
					content: $('<div>', {
						class: "mw-ajax-loader",
						css: {
							"margin-top": "20.6%",
						}
					}),
					title: msg('abuselog-entry-title', id).plain(),
					buttons: [{
						text: msg('open-link').plain(),
						href: pagePathname + "Special:AbuseLog/" + id,
					}]
				});
 
			logMsg('Successfully showed the modal!');
 
			$.get(pagePathname + 'Special:AbuseLog/' + id).then(function(data) {
				var $content = $('<fieldset>', {
						html: $(data)
							.find('fieldset')
							.html(),
					});
 
				logMsg('Successfully fetched abuselog HTML!');
				var user =
					($content.find('a[title^="Special:Contributions"]:first-of-type').html()
					|| $content.find('span.mw-usertoollinks > a:first-of-type').attr('title')).replace(/([Mm]essage[_ ]wall:|<\/?bdi>)/gmi, ''),
					title = $content.find('span > .mw-usertoollinks + a + a').html();
 
				// var isBlocked = $content.find('p').first().html().match(/Actions taken: .*?block.*?;/gmi) ? true : false;
				var canAddEdit =
				   $content.find('p').first().html().match(/action "edit"/gmi) ? true : false;
 
				entryExists(id + 1).then(function(exists) {
					function addEdit() {
						var text = $('.mw-abuselog-details-new_wikitext.mw-abuselog-value')
								.children()
								.last()
								.children()
								.html()
								.replace(/&lt;/g, '<')
								.replace(/&gt;/g, '>')
								.replace(/&amp;/g, '&')
								.replace(/^'|'$/g, ''),
							userSummary = $('mw-abuselog-details-summary.mw-abuselog-value')
								.children()
								.last()
								.children()
								.html(),
							title = $('fieldset a:nth-child(4)').html(),
							summary = prompt(
									msg('enter-summary').plain(),
									(msg('abuselog-summary-filter', user, userSummary ? userSummary : msg('no-summary').plain()).plain())
								);
						
						if (!summary) return logMsg('Edit cancelled');
 
						return new mw.Api().post({
							action: "edit",
							text: text,
							summary: summary,
							title: title,
							watchlist: "nochange",
							bot: true,
							minor: true,
							token: mw.user.tokens.get('csrfToken'),
						}).always(function(data) {
							var msg;
							if (data.edit) {
								msg = msg('successful-add-filter').plain();
								mw.notify(msg, { type: 'success' });
								console.log(data);
							} else {
								msg = msg('failed-edit', title, data).plain();
 
								mw.notify(msg, { type: "warn" });
								console.warn(msg);
							}
						});
					}
					if ($content.find('h3').first().html() === msg('abuselog-changes').plain() && canAddEdit) {
						$content.find('h3').first().append(
							$("<span>", {
								style: "font-size: 80%",
								html: [
									"	(",
									$('<a>', {
										text: msg('add-filter').plain(),
										click: addEdit,
										css: {
											cursor: "pointer"
										},
										title: msg('add-filter-tooltip').plain()
									}),
									")"
								]
							})
						);
					}
 
					$content.children('table.diff').before(
						$('<div>', {
							style: "margin-top: 2em",
							html: [(id - 1) >= 0 ? $('<a>', {
									text: msg('older-entry').plain(),
									href: pagePathname + 'Special:AbuseLog/' + (id - 1),
									title: 'Special:AbuseLog/' + (id - 1),
									style: "float: left; padding-left: 25%;",
								}) : "",
								exists ? $('<a>', {
									text: msg('newer-entry').plain(),
									href: pagePathname + 'Special:AbuseLog/' + (id + 1),
									title: 'Special:AbuseLog/' + (id + 1),
									style: "float: right; padding-right: 25%;",
								}) : "",
							]
						})
					);
 
				   $content.find('span > .mw-usertoollinks + a + a')
						.after(
							' (',
							$('<a>', {
								href: pagePathname + title + "?action=edit",
								text: msg('edit').plain(),
								title: msg('edit-tooltip', title).plain(),
							}),
							' | ',
							$('<a>', {
								href: pagePathname + title + "?action=history",
								text: msg('history').plain(),
								title: msg('history-tooltip', title).plain(),
							}),
							' | ',
							$('<a>', {
								href: pagePathname + title + "?diff=cur",
								text: msg('latest-edit').plain(),
								title: msg('latest-edit-tooltop', title).plain(),
							}),
							' | ',
							$('<a>', {
								href: pagePathname + 'Special:Log?page=' + title,
								text: msg('logs').plain(),
								title: msg('logs-tooltip', title).plain(),
							}),
							' | ',
							$('<a>', {
								href: pagePathname + 'Special:AbuseLog?wpSearchTitle=' + title,
								text: msg('abuse-log').plain(),
								title: msg('abuse-log-tooltip', title).plain(),
							}),
							' | ',
							$('<a>', {
								href: pagePathname + 'Special:Undelete/' + title,
								text: msg('del-revisions').plain(),
								title: 'Special:Undelete/' + title,
							}),
							' | ',
							$('<a>', {
								href: pagePathname + title + "?action=protect",
								text: msg('protect').plain(),
								title: msg('protect-tooltip', title).plain(),
							}),
							' | ',
							$('<a>', {
								href: pagePathname + 'Special:MovePage/' + title,
								text: msg('move').plain(),
								title: msg('move-tooltip', title).plain(),
							}),
							')'
						);
 
					$('.qdmodal')
						.find('footer')
						.append(
							canAddEdit ? $('<a>', {
								text: msg('add-filtered-edit-link').plain(),
								click: addEdit,
								title: msg('add-filtered-edit-tooltip').plain(),
								class: "qdmodal-button",
							}) : "",
							$('<a>', {
								text: msg('nuke-link').plain(),
								title: "Special:Nuke/" + user,
								href: pagePathname + "Special:BlankPage?blankspecial=nuke&returnto=Special:AbuseLog&nukeuser=" + user + "&returntoparams=wpSearchUser=" + user,
								target: "_blank",
								class: "qdmodal-button",
							}),
							$('<a>', {
								text: msg('block-link').plain(),
								title: "Special:Block/" + user,
								href: pagePathname + "Special:Block/" + user,
								target: "_blank",
								class: "qdmodal-button",
							}),
							$('<a>', {
								text: msg('unblock-link').plain(),
								title: "Special:Unblock/" + user,
								href: pagePathname + "Special:Unblock/" + user,
								target: "_blank",
								class: "qdmodal-button",
							}),
							$('<a>', {
								text: msg('abuse-log-title-link').plain(),
								title: "Special:AbuseLog?wpSearchUser=" + user,
								href: pagePathname + "Special:AbuseLog?wpSearchUser=" + user,
								target: "_blank",
								class: "qdmodal-button",
							}),
							$('<a>', {
								text: msg('logs-link').plain(),
								title: "Special:Log/" + user,
								href: pagePathname + "Special:Log/" + user,
								target: "_blank",
								class: "qdmodal-button",
							}),
							$('<a>', {
								text: msg('del-contribs-link').plain(),
								title: "Special:DeletedContributions/" + user,
								href: pagePathname + "Special:DeletedContributions/" + user,
								target: "_blank",
								class: "qdmodal-button",
							}),
							$('<a>', {
								text: msg('contribs-link').plain(),
								title: "Special:Contributions/" + user,
								href: pagePathname + "Special:Contributions/" + user,
								target: "_blank",
								class: "qdmodal-button",
							}),
							$('<a>', {
								text: msg('wall-link').plain(),
								title: "Message Wall:" + user,
								href: pagePathname + "Message Wall:" + user,
								target: "_blank",
								class: "qdmodal-button",
							})
						);
 
				}).then(function() {
					$content.children('h3').css('border-bottom', '1px solid #5e484a');
					$('div#ajax-abuselog-modal > section').html($content);
				});
			});
		});
	}

	mw.hook('dev.i18n').add(function (i18n) {
		i18n.loadMessages('AjaxAbuseLog').done(function (i18no) {
			msg = i18no.msg;
			mw.loader.load([ "mediawiki.diff.styles", 'ext.abuseFilter']);
			$(document.body).on("click", "a[href^=\"/wiki/Special:AbuseLog/\"]", main);
			$(document.body).on('keydown', null, function(event) {
				if (event.key === "ArrowLeft" && $("#ajax-abuselog-modal").length) {
					$('h3 ~ div[style="margin-top: 2em"] > a:nth-child(1)').click();
				} else if (event.key === "ArrowRight" && $("#ajax-abuselog-modal").length) {
					$('h3 ~ div[style="margin-top: 2em"] > a:nth-child(2)').click();
				}
			});
			logMsg('Successfully added click event handlers!');
		});
	});
	importArticles({
		type: 'script',
		articles: 'u:dev:MediaWiki:I18n-js/code.js'
	});
}).catch(function(error) {
	console.warn(error);
});