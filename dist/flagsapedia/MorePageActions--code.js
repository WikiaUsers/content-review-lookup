/* 
 * Script: MorePageActions
 *
 * Author: WooperIsBest
 * Co-Author: Caburum
 * A simple script that adds extra page actions to the page contributions dropdown menu
 */

;(function ($, mw) {
	'use strict';

	if (window.MorePageActionsLoaded) return;
	window.MorePageActionsLoaded = true;

	const ddm = $('#p-cactions > ul'), // Gets dropdown menu
	currentPage = encodeURIComponent(mw.config.get('wgRelevantPageName')),
	path = mw.config.get('wgArticlePath');

	function link(id, page, msg) {
		$( '<li><a id="ca-' + id + '" href="' + path.replace('$1', page) + '">' + mw.msg(msg) + '</a></li>' ).appendTo(ddm);
	}

	mw.loader.using(['mediawiki.api']).then(function() {
		return new mw.Api().loadMessagesIfMissing([
			'whatlinkshere',
			'pageinfo',
			'log',
			'currentrev',
			'movesubpage'
		]);
	}).then(function() {
		link('whatlinkshere', 'Special:WhatLinksHere/' + currentPage, 'whatlinkshere');
		link('info', currentPage + '?action=info', 'pageinfo');
		link('logs', 'Special:Log?page=' + currentPage, 'log');
		link('latestdiff', currentPage + '?diff=latest', 'currentrev');
		link('subpages', 'Special:PrefixIndex/' + currentPage + '/', 'movesubpage');
	});

}(window.jQuery, window.mediaWiki));