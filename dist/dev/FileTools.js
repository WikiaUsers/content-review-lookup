/**
 * FileTools.js
 * SOAP script to add quick action buttons on file pages
 * @summary Quick file actions
 * @see https://dev.fandom.com/wiki/FileTools
 * @author Kopcap94
 * @author Noreplyz
 * @author magiczocker
 */
 
;(function($, mw, window) {
	"use strict";
	const config = mw.config.get([
		'wgScriptPath',
		'wgArticlePath',
		'wgPageName',
		'wgCanonicalNamespace',
		'wgUserLanguage'
	]);
	if (config.wgCanonicalNamespace !== 'File' || window.FileToolsLoaded) return;
	window.FileToolsLoaded = true;
	
	var last_summary = "";
	const token = mw.user.tokens.values.csrfToken;
	var msg;
	
	$.post( config.wgScriptPath + '/api.php', {
		action: 'query',
		format: 'json',
		prop: 'imageinfo',
		meta: 'userinfo',
		titles: config.wgPageName,
		formatversion: 2,
		iilocalonly: 1,
		uiprop: 'rights'
	}).done(function (d) {
		if (d.query.pages[0].imagerepository === 'local') {
			var FT = {
				buttons: function() {
					if (d.query.userinfo.rights.includes('delete')) {
						$('.filehistory tr:nth-of-type(n + 3) td:nth-child(1) > a:first-child').each(function() {
							$(this).after(
								'<center>' +
									'<button class="wds-button delete">' + msg('button_delete').escape() + '</button>' +
								'</center>');
							$(this).parent().find('br').remove();
						});
					}

					if (d.query.userinfo.rights.includes('reupload')) {
						$('.filehistory tr:nth-of-type(n + 3) td:nth-child(2) > a:first-child').each(function() {
							$(this).after(
							'<center>' +
								'<button class="wds-button revert">' + msg('button_revert').escape() + '</button>' +
							'</center>');
						});
					}
				},

				refresh: function() {
					$('#mw-imagepage-section-filehistory').load( config.wgArticlePath.replace("$1", config.wgPageName) + ' #mw-imagepage-section-filehistory', function() {
						FT.init();
					});
				},

				init: function() {
					if ($('.wds-button.deleteAll').length === 0) {
						var content = '';
						if (d.query.userinfo.rights.includes('delete')) {
							content += '<button class="wds-button deleteAll">' + msg('button_delete_all').escape() + '</button>&nbsp;&nbsp;';
						}
						content += '<button class="wds-button refresh">' + msg('button_refresh').escape() + '</button>&nbsp;&nbsp;';
						if (d.query.userinfo.rights.includes('protect')) {
							content += '<button class="wds-button protect">' + msg('button_protect').escape() + '</button>';
						}
						$('[data-tab-body="history"] h2, #filehistory').after(content);
					}
					FT.buttons();
					$('.wds-button.deleteAll').click(function(that) {
						const leng = $('#mw-imagepage-section-filehistory tr').length;
						var summary = prompt(msg('summary_title', msg('summary_default_clean').plain() ).parse(), last_summary);
						if (summary === null) return null;
						last_summary = summary;
						if (summary.length === 0) {
							summary = msg('summary_default_clean').plain();
						}
						for (var i=3;i<=leng;i++) {
							var rev = $('#mw-imagepage-section-filehistory tr:nth-child(' + i + ') > td:first-child > a:first-child').attr('href').replace(/.*oldimage=(.+)(&.*)?/,'$1'),
							num = i;
							$.post( config.wgScriptPath + '/api.php', {
								action: 'delete', 
								title: config.wgPageName, 
								oldimage: decodeURIComponent(rev), 
								reason: summary,
								token: token,
								formatversion: 2
							}).done(function() {
								if (num==leng) { 
									FT.refresh();
								}
							});
						}
					});
					$('.wds-button.refresh').click(function() {
						FT.refresh();
					});
					$('.wds-button.protect').click(function() {
						var summary = prompt(msg('summary_title', msg('summary_default_protect').plain() ).parse(), last_summary);
						if (summary === null) return null;
						last_summary = summary;
						if (summary.length === 0) {
							summary = msg('summary_default_protect').plain();
						}
						$.post( config.wgScriptPath + '/api.php', {
							action: 'protect',
							title: config.wgPageName,
							protections: 'upload=sysop', 
							reason: summary,
							expiry: '2 weeks',
							token: token,
							formatversion: 2
						}).done(function() {
							$('#filehistory').after('<div class="mw-warning-with-logexcerpt" style="margin:5px 0; text-align:center;">' + msg('status_protected').escape() + '</div>');
						});
					});
					$('.wds-button.revert').click(function(that) {
						var archname = $(that.target).parents('td').find('a:first-child').attr('href').replace(/.*oldimage=(.+)&?.*/,'$1');
						console.log(archname);
						var summary = prompt(msg('summary_title', msg('summary_default_revert').plain() ).parse(), last_summary);
						if (summary === null) return null;
						last_summary = summary;
						if (summary.length === 0) {
							summary = msg('summary_default_revert').plain();
						}
						$.post( config.wgScriptPath + '/api.php', {
							action: 'filerevert',
							filename: config.wgPageName.replace(/^[^:]+:(.+)/,'$1'), 
							archivename: decodeURIComponent(archname), 
							comment: summary,
							token: token,
							formatversion: 2
						}).done(function() {
							FT.refresh();
						});
					});
					$('.wds-button.delete').click(function(that) {
						var delname = $(that.target).parents('td').find('a:first-child').attr('href').replace(/.*oldimage=(.+)(&.*)?/,'$1');
						var summary = prompt(msg('summary_title', msg('summary_default_deletea').plain() ).parse(), last_summary);
						if (summary === null) return null;
						last_summary = summary;
						if (summary.length === 0) {
							summary = msg('summary_default_deletea').plain();
						}
						$.post( config.wgScriptPath + '/api.php', {
							action: 'delete', 
							title: config.wgPageName,
							oldimage: decodeURIComponent(delname), 
							reason: summary,
							token: token,
							formatversion: 2
						}).done(function() {
							$(that).parents('tr').css('opacity','0.2');
						});
					});

				}
			};

			mw.hook('dev.i18n').add(function (i18n) {
				i18n.loadMessages('FileTools').done(function (i18no) {
					msg = i18no.msg;
					$(FT.init);
				});
			});
		}
	});
})(this.jQuery, this.mediaWiki, window);