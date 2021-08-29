/**
 * RevisionDelete
 * Allows users to selectively remove revisions from page histories
 * @author Thundercraft5 <https://dev.fandom.com/wiki/User:Thundercraft5>
 * @version 1.0
 * @license BSD 3-Clause <https://opensource.org/licenses/BSD-3-Clause>
 */

/* global mw, $ */
"use strict";
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function() {	
	var api = new mw.Api();
	
	return $.when(mw.user.getRights(), api, api.loadMessagesIfMissing([
		"checkbox-all",
		"checkbox-none",
		"checkbox-invert",
		"checkbox-select",
	]));
}).then(function(rights, api) {
	if (window.RevisionDeleteLoaded) return console.warn('[RevisionDelete v1] [WARN]: Script was double loaded, exiting...');
	if (!~rights.indexOf('delete') || !~rights.indexOf('undelete')) return console.log('[RevisionDelete v1] [Log]: user cannot delete/undelete pages, exiting...');
	if (!$('.historysubmit').length || mw.config.get('wgAction') !== 'history') return console.log('[RevisionDelete v1] [Log]: Page only has 1 revision or page is not a history page, exiting...');
		
	window.RevisionDeleteLoaded = true;
	
	mw.util.addCSS('.revdel-checkbox-control, .revdel-submit { cursor: pointer !important }');
	
	$('.mw-history-compareselectedversions-button').after($('<button>', {
		class: "revdel-submit",
		text: "Delete selected revisions",
		click: function(e) {
			e.preventDefault();
			var $checkboxes = $('.revdel-checkbox');
			var deleteCount = $checkboxes.filter(':checked').length;
			var revisions = $checkboxes.filter(function() {
				return !this.checked;
			}).map(function() { 
				return +$(this).parent().attr('data-mw-revid');
			}).toArray();
			var reason = prompt("Enter a reason for deleting " + deleteCount + " revision(s) from the history of " + mw.config.get('wgPageName') + ":");
			if (reason === null) return;
			reason = "Deleting " + deleteCount + " revision(s) from page history" + (reason === "" ? reason : ": " + reason);
			
			$('.revdel-submit').attr('disabled', true);
			$('.revdel-submit').html([
				$('<img>', {
					src: "https://static.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif/revision/latest",
				}), 
				'&nbsp;Removing revisions...'
			]);
			
			api.get({
				action: "query",
				prop: "revisions",
				rvprop: "timestamp|ids",
				titles: mw.config.get('wgPageName'),
				rvdir: "older",
				rvlimit: 'max',
			}).then(function(revData) {
				var timestamps = Object.values(revData.query.pages)[0].revisions.filter(function(rev) {
					return revisions.indexOf(rev.revid) !== -1 || !$('li[data-mw-revid="' + rev.revid + '"]').length;
				}).map(function(rev) {
					return rev.timestamp;
				});	
	
				api.postWithEditToken({
					action: "delete",
					title: mw.config.get('wgPageName'),
					reason: reason,
				}).then(function() {
					// Hack: Simulate Special:Undelete form submission to avoid timestamp limits
					var params = {
						wpComment: reason,
						target: mw.config.get('wgPageName'),
						wpEditToken: mw.user.tokens.values.editToken,
						restore: 1,
					};
					
					timestamps.forEach(function(ts) {
						params['ts' + ts.slice(0, 19).replace('T', '').replace(/-|:/g, "")] = "1";
					});
					
					fetch(mw.util.getUrl('Special:Undelete', { action: "submit" }), {
						"body": $.param(params),
						headers: {
							"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
						},
						method: "POST",
						credentials: "include"
					}).then(function() {
						window.location.reload();
					}, console.warn);
				}, console.warn);
			}, console.warn);
		},
	}));
	
	if (!$('.mw-history-editchangetags-button').length) $('#pagehistory > li').each(function() {
		$(this).prepend($('<input>', {
			class: "revdel-checkbox",
			type: "checkbox",
		}));
	});
	else $('#pagehistory > li > input[type="checkbox"]').addClass('revdel-checkbox');
	
	function updateButton() {
		var $checkboxes = $('.revdel-checkbox');
		var $checked = $checkboxes.filter(':checked');
	
		if ($checked.length === 0 || $checked.length === $checkboxes.length) $('.revdel-submit').attr('disabled', true);
		else $('.revdel-submit').attr('disabled', false);
	}
	
	if (!$('.mw-history-editchangetags-button').length) $('<div>', {
		insertBefore: '#pagehistory',
	
		class: "revdel-checkboxcontrols",
		html: [
			mw.msg('checkbox-select').slice(0, -2),
			$('<a>', {
				text: mw.msg('checkbox-all'),
				class: "revdel-checkbox-control",
				click: function() {
					updateButton();
					$('#pagehistory > li > input[type="checkbox"]').prop('checked', true);
				},
			}),
			', ',
			$('<a>', {
				text: "None",
				class: mw.msg('checkbox-none'),
				click: function() {
					updateButton();
					$('#pagehistory > li > input[type="checkbox"]').prop('checked', false);
				},
			}),
			', ',
			$('<a>', {
				text: mw.msg('checkbox-invert'),
				class: "revdel-checkbox-control",
				click: function() {
					updateButton();
					$('#pagehistory > li > input[type="checkbox"]').each(function() {
						$(this).prop('checked', !this.checked);
					});
				},
			}),
		],
	}).clone().insertAfter('#pagehistory');
	else $('.mw-checkbox-toggle-controls').on('click', 'a', function() {
		updateButton();	
	});
	
	var selected = new Set();
	var anchor;
	
	$('#mw-content-text').on('click', '#pagehistory > li > input[type="checkbox"]', function(e) {
		var $input = $(this);
	
		if (e.target.children.length === 0 && e.target !== $input[0]) return;
		if (e.target !== $input[0]) $input.prop('checked', !$input[0].checked);
		if (!e.shiftKey || e.shiftKey && !anchor) anchor = $input[0], selected.clear(), selected.add($input[0]);
	
		if (anchor && e.shiftKey && !e.ctrlKey) {
			var $coll = $(this).parent().parent().children().map(function() { return $(this).find('input[type="checkbox"]')[0] });
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
	
		updateButton();
	});
});