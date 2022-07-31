/**
 * FileTools.js
 * SOAP script to add quick action buttons on file pages
 * @summary Quick file actions
 * @see https://dev.fandom.com/wiki/FileTools
 * @author Kopcap94
 * @author Noreplyz
 * @author magiczocker
 */
 
;(function(window, $, mw) {
	'use strict';
	
	const config = mw.config.get([
		'wgScriptPath',
		'wgArticlePath',
		'wgPageName',
		'wgCanonicalNamespace'
	]);
	
	if (config.wgCanonicalNamespace !== 'File' || window.FileToolsLoaded) return;
	window.FileToolsLoaded = true;
	
	var last_summary = "";
	const token = mw.user.tokens.values.csrfToken;
	var msg, rights;
	
	function btn(txt) {
		return '<button class="wds-button">' + msg(txt).escape() + '</button>';
	}
	
	function addHeaderButtons() {

		// delete all button
		var delete_all_button = rights.includes('protect') ?
			$(btn('button_delete_all')).on('click',function() {
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
							refresh();
						}
					});
				}
			}) : '';
		
		// refresh button
		var refresh_button = $(btn('button_refresh')).on('click',function() {
				refresh();
			});
		
		// protect button
		var protect_button = rights.includes('protect') ?
			$(btn('button_protect')).on('click',function(){
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
			}) : '';
		
		// add buttons to "File history" section
		$('#filehistory')
			.after(protect_button)
			.after(' ')
			.after(refresh_button)
			.after(' ')
			.after(delete_all_button);
	}
	
	function addImageButtons() {

		// delete button
		if (rights.includes('delete')) {
			$('.filehistory tr:nth-of-type(n + 3) td:nth-child(1) > a:first-child').each(function() {
				var button = $(btn('button_delete')).click(function() {
					var $this = this;
					var delname = $(this).parents('td').find('a:first-child').attr('href').replace(/.*oldimage=(.+)(&.*)?/,'$1');
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
						$($this).parents('tr').css('opacity','0.2');
					});
				});
				var button_out = $('<center>').append(button);
				$(this).after(button_out);
				$(this).parent().find('br').remove();
			});
		}
		
		// revert button
		if (rights.includes('reupload')) {
			$('.filehistory tr:nth-of-type(n + 3) td:nth-child(2) > a:first-child').each(function() {
				var button = $(btn('button_revert')).click(function() {
					var archname = $(this).parents('td').find('a:first-child').attr('href').replace(/.*oldimage=(.+)&?.*/,'$1');
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
						refresh();
					});
				});
				var button_out = $('<center>').append(button);
				$(this).after(button_out);
			});
		}
	}
	
	function refresh() {
		$('#mw-imagepage-section-filehistory').load( config.wgArticlePath.replace("$1", config.wgPageName) + ' #mw-imagepage-section-filehistory', function() {
			addImageButtons();
		});
	}
	
	// Init: Query image rights and add buttons
	$.get( config.wgScriptPath + '/api.php', {
		action: 'query',
		format: 'json',
		prop: 'imageinfo',
		meta: 'userinfo',
		titles: config.wgPageName,
		formatversion: 2,
		iilocalonly: 1,
		uiprop: 'rights'
	}).done(function (data) {
		if (data.query.pages[0].imagerepository === 'local') {
			rights = data.query.userinfo.rights;
			mw.hook('dev.i18n').add(function (i18n) {
				i18n.loadMessages('FileTools').done(function (i18no) {
					msg = i18no.msg;
					addHeaderButtons();
					addImageButtons();
				});
			});
			if (!(window.dev && window.dev.i18n && window.dev.i18n.loadMessages)) {
				mw.loader.load('https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:I18n-js/code.js&*');
			}
		}
	});
})(window, window.jQuery, window.mediaWiki);