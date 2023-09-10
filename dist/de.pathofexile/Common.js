/* Any JavaScript here will be loaded for all users on every page load.                      */
/* JS placed here is optional and will force the equalization the main page layout columns   */
/*                                                                                           */
/* This section js has been moved to two different pages: MediaWiki:3colmainpage.js and      */
/* MediaWiki:2colmainpage.js                                                                 */
/* Wiki managers can either use one or the other for their wiki and overwrite this page with */
/* customized version, or use the import commands shown below                                */
/*                                                                                           */
/* The following is for the regular 2 column responsive main page                            */
/*                                                                                           */
/* @import url(/index.php?title=MediaWiki:2colmainpage.js&action=raw&ctype=text/javascript); */
/*                                                                                           */
/*                                                                                           */
/* The following is for the regular 3 column responsive main page                            */
/*                                                                                           */
/* @import url(/index.php?title=MediaWiki:3colmainpage.js&action=raw&ctype=text/javascript); */
/*                                                                                           */
/* ***************************************************************************************** */

/* global mw, $ */
/* jshint strict:false, browser:true */

/* Detect browser via JS and add a class to the main element so it can be used in css */
function detect_browser() {
	var browser = 'unknown';
	if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
		browser = 'opera';
	} else if (typeof InstallTrigger !== 'undefined') {
		browser = 'firefox';
	} else if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))) {
		browser = 'safari';
	} else if (/*@cc_on!@*/false || !!document.documentMode) {
		browser = 'internet-explorer';
	} else if (!(/*@cc_on!@*/false || !!document.documentMode) && !!window.StyleMedia) {
		browser = 'edge';
	} else if (!!window.chrome && !!window.chrome.webstore) {
		browser = 'chrome';
	}
	$('html').addClass('browser-' + browser);
}

function reponsive_table (tables){
	'use strict';
	if ( tables.length > 0 ) {
		const expand = '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"></path></svg><span>Expand</span>';
		const collapse = '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M436 192H312c-13.3 0-24-10.7-24-24V44c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-276-24V44c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 300V344c0-13.3-10.7-24-24-24H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12H312c-13.3 0-24 10.7-24 24v124c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"></path></svg><span>Collapse</span>';
		const do_toggle = function( wrap ) {
			if ( wrap.classList.contains('is-expanded') ) {
				this.innerHTML = expand;
				wrap.classList.remove('is-expanded');
			} else {
				this.innerHTML = collapse;
				wrap.classList.add('is-expanded');
			}
		};
		for ( var i = 0; i < tables.length; i++ ) {
			var table = tables[i];
			var wrap = document.createElement('div');
			wrap.classList.add('c-responsive-table');
			table.before(wrap);
			var scroll = document.createElement('div');
			scroll.classList.add('c-responsive-table__scroll');
			wrap.appendChild(scroll);
			scroll.appendChild(table);
			table.classList.add('c-responsive-table__table');
			if ( scroll.offsetHeight < scroll.scrollHeight ) {
				var toolbar = document.createElement('div');
				toolbar.classList.add('c-responsive-table__toolbar');
				scroll.before(toolbar);
				var toggle = document.createElement('button');
				toggle.classList.add('c-responsive-table__toolbar-button');
				toggle.innerHTML = expand;
				toolbar.appendChild(toggle);
				toggle.addEventListener( 'click', do_toggle.bind(toggle, wrap) );
			}
		}
	}
}

$(function() {
	/* Hover Item Box (Old) */
	$(function(){"use strict";$(".itemhover").hover(function(){var e=$(this),t=e.next(".itemboxhover"),n=t.next(".itemboxhovericon"),r=$(window).width(),i=$(window).height(),s=$(window).scrollTop(),o=$(window).scrollLeft(),u=e.offset(),a=e.outerWidth(),f=e.outerHeight(),l=t.outerWidth(),c=t.outerHeight(),h=12,p={},d=n.outerWidth(),v=n.outerHeight(),m={},g;if(u.top-h-c-s>0){g="t";p.top=u.top-c-h;p.left=u.left+a/2-l/2}else if(r+o-u.left-a-h-l-d>0){g="r";p.top=u.top+f/2-c/2;p.left=u.left+a+h}else if(u.left-o-h-l-d>0){g="l";p.top=u.top+f/2-c/2;p.left=u.left-l-h}else{g="b";p.top=u.top+f+h;p.left=u.left+a/2-l/2}if((g==="t"||g==="b")&&p.left<o){p.left=o}else if((g==="t"||g==="b")&&r+o-l<p.left){p.left=r+o-l}else if((g==="r"||g==="l")&&p.top<s){p.top=s}m.top=p.top;m.left=p.left+l;if(g==="l"||r+o-d<m.left){m.left=p.left-d}if(i+s-v<m.top){m.top=i+s-v}t.offset({top:p.top,left:p.left}).removeClass("itemboxhoverhide");n.offset({top:m.top,left:m.left}).removeClass("itemboxhoverhide")},function(){var e=$(this),t=e.next(".itemboxhover"),n=t.next(".itemboxhovericon");t.addClass("itemboxhoverhide");n.addClass("itemboxhoverhide")}).children("a").removeAttr("title").end().nextAll(".itemboxhover, .itemboxhovericon").removeClass("itemboxhovernojs")});

	/* For adding expand/collapse all buttons for mw-collapsible */
	$(".mw-collapsible-collapse-all").on("click", function () {
		$('.mw-collapsible-toggle-expanded a').trigger('click');
	});

	$(".mw-collapsible-expand-all").on("click", function () {
		$(".mw-collapsible-toggle-collapsed a").trigger('click');
	});

	detect_browser();
	
	reponsive_table(document.getElementsByClassName('responsive-table'));
	const table_containers = document.getElementsByClassName('responsive-table-container');
	for (var i = 0; i < table_containers.length; i++) {
		reponsive_table(table_containers[i].getElementsByTagName('table'));
	}
});

/* Item hoverbox */
jQuery(document).ready(function($) {
	'use strict';

	var $window = $(window),
		$hover = $('.c-item-hoverbox');
	$hover.each(function() {
		var $this = $(this),
			$activator = $this.find('.c-item-hoverbox__activator').first(),
			$display = $this.find('.c-item-hoverbox__display').first();
		$display.css('display', 'none');
		$activator.hover(function() {
			$display.css('display', '');
			var viewport = {},
				activator = {},
				display = {},
				position, // position relative to the activator
				location; // location relative to the viewport
			viewport.width = $window.width();
			viewport.height = $window.height();
			viewport.top = $window.scrollTop();
			viewport.left = $window.scrollLeft();
			viewport.bottom = viewport.top + viewport.height;
			viewport.right = viewport.left + viewport.width;
			activator.width = $activator.outerWidth();
			activator.height = $activator.outerHeight();
			activator.top = $activator.offset().top;
			activator.left = $activator.offset().left;
			activator.bottom = activator.top + activator.height;
			activator.right = activator.left + activator.width;
			display.width = $display.outerWidth();
			display.height = $display.outerHeight();
			if ( viewport.width < display.width ) { // Don't bother showing the hoverbox at all if the viewport is too small
				return false;
			}
			if ( activator.left > viewport.width - activator.right ) {
				location = 'right';
			} else {
				location = 'left';
			}
			if ( activator.top - display.height > viewport.top ) {
				position = 'above';
				display.top = activator.top - display.height;
				display.left = activator.left + (activator.width / 2) - (display.width / 2);
			} else if ( activator.right + display.width < viewport.right ) {
				position = 'right-of';
				display.top = activator.top + (activator.height / 2) - (display.height / 2);
				display.left = activator.right;
			} else if ( activator.left - display.width > viewport.left ) {
				position = 'left-of';
				display.top = activator.top + (activator.height / 2) - (display.height / 2);
				display.left = activator.left - display.width;
			} else {
				position = 'below';
				display.top = activator.bottom;
				display.left = activator.left + (activator.width / 2) - (display.width / 2);
			}
			display.top = Math.max( viewport.top, display.top );
			display.left = Math.max( viewport.left, Math.min(viewport.right - display.width, display.left) );
			$display.addClass('is-visible is-' + position + '-activator is-' + location + '-side-of-viewport').offset(display);
		}, function() {
			$display.css('display', 'none');
			$display.removeClass('is-visible is-above-activator is-below-activator is-left-of-activator is-right-of-activator is-left-side-of-viewport is-right-side-of-viewport');
		});
	});

});

/* DO NOT ADD CODE BELOW THIS LINE */