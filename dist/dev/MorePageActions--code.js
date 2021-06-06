/* 
 * Script: MorePageActions
 *
 * Author: WooperIsBest
 * Co-Author: Caburum
 * A simple script that adds extra page actions to the page contributions dropdown menu
*/

;(function (window, $, mw) {
	'use strict';
	
	if (window.MorePageActionsLoaded) return;
	window.MorePageActionsLoaded = true;

	var ddm = $('.skin-oasis .page-header__contribution-buttons .wds-dropdown__content > ul, .skin-fandomdesktop .page-header .page-header__actions .wds-dropdown__content > ul'); // Gets dropdown menu
	var currentPage = encodeURIComponent(mw.config.get('wgPageName'));
	var path = mw.config.get('wgArticlePath');

	$( '<li><a id="ca-linkshere" href="' + path.replace('$1', 'Special:WhatLinksHere/' + currentPage) + '">What links here</a></li>' ).appendTo(ddm); // What links here
	$( '<li><a id="ca-logs" href="' + path.replace('$1', 'Special:Log') + '?page=' + currentPage +'">Logs</a></li>').appendTo(ddm); // Logs
	$( '<li><a id="ca-purge" href="' + path.replace('$1', currentPage) + '?action=purge">Purge</a></li>').appendTo(ddm); // Purge
	$( '<li><a id="ca-latestdiff" href="' + path.replace('$1', currentPage) + '?diff=latest">Latest diff</a></li>' ).appendTo(ddm); // Latest dif
	$( '<li><a id="ca-subpages" href="' + path.replace('$1', 'Special:PrefixIndex/' + currentPage + '/') + '">Subpages</a></li>' ).appendTo(ddm); // Subpages 

}(this, this.jQuery, this.mediaWiki));