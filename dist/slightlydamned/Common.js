/**
 * This is the central JavaScript file for the Wiki. Any code placed in here will
 * run on every page for every user (logged in or not) on every skin (Oasis or
 * Monobook).
 * Only JS which works on both Oasis and Monobook should be here, if it doesn't work
 * on one or the other then use MediaWiki:Wikia.js (Oasis) or MediaWiki:Monobook.js
 * [[w:c:Help:JavaScript_and_CSS_Cheatsheet]]
 */
/*jshint smarttabs:true laxcomma:true laxbreak:true jquery:true browser:true */
/*global mediaWiki */

(function(window, $, mw) {
	"use strict";

	// Bulk loading scripts.
	// scriptList are scripts to load everywhere
	// pageScriptList are scripts which only certain pages need.
	var scriptList = [], pageScriptList = [];

	// Make WantedFiles File:xxx entries become links to Special:Upload (bug fix)
	scriptList.push('MediaWiki:Common.js/FixWantedFiles.js');

	// Configure AjaxRC
	(window.ajaxPages = (window.ajaxPages || [])).push(
		"Special:RecentChanges",
		"Special:Watchlist",
		"Special:Log",
		"Special:Contributions",
		"Special:NewFiles",
		"Special:NewPages",
		"Special:ListFiles",
		"Special:WikiActivity"
	);
	window.AjaxRCRefreshText = 'Automatically refresh every 60secs';
	window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
	scriptList.push('w:dev:AjaxRC/code.js');

	// Custom User Tags, including Inactive
	window.UserTagsJS = {
		tags: {
			distracted: { u: 'Distracted', title: 'Not doing much at the moment. Leave me a message if you need something.' }
		},
		modules: {
			inactive: { // Edits must be to content namespaces, not user/walls/forum/blog
				days: 30,
				namespaces: [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
				zeroIsInactive: true
			},
			mwGroups: ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: true,
			newuser: true,
			metafilter: {
				sysop: ['bureaucrat'],
				bot: ['bot-global']
			},
			userfilter: {
				Pokenutter: ['bureaucrat'] // Founder
			},
			custom: {
				Lunarity: ['distracted']
			}
		}
	};
	scriptList.push('w:dev:UserTags/code.js');

	// Reveal Anonymous Contributors
	window.RevealAnonIP = { permissions: ['bureaucrat', 'sysop'] };
	scriptList.push('w:dev:RevealAnonIP/code.js');

	// Display Clock
	scriptList.push('w:dev:DisplayClock/code.js');

	// Reference Popups, like on Wikipedia
	scriptList.push('w:dev:ReferencePopups/code.js');

	// Import the Image Switch support JS [Make sure the page is protected to Sysops]
	scriptList.push('MediaWiki:Common.js/TemplateImageSwitch.js');

	// User page image template
	scriptList.push('MediaWiki:Common.js/UserImageHotlink.js');

	// Navbox fixes and adjustments
	scriptList.push('MediaWiki:Common.js/TemplateNavbox.js');

	// Add an edit button for Message Wall Grettings
	if (mw.config.get('wgNamespaceNumber') >= 1200) {
		pageScriptList.push('w:dev:WallGreetingButton/code.js');
	}

	// Remove red-links (deleted pages) from Recent Changes
	// [They stay red, they just don't link to ?action=edit]
	if (({Recentchanges: 1, Log: 1})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
		var deNewRC = function() {
			$('a.new').each(function() {
				this.href = this.href.replace(/\?[^?]*$/, '');
			});
		};
		$(deNewRC);
		window.ajaxCallAgain.push(deNewRC);
	}

	// Custom Special:[Multiple]Upload UI
	$(function($) {
		// Detach the AJAX upload feature from the Recent Image Uploads "Add Image" button
		// because the pop-up form does not obey the Template:Information preload and such.
		$('a.wikia-button.upphotos').off('click');
	});
	if (({Upload:1, MultipleUpload:1})[mediaWiki.config.get('wgCanonicalSpecialPageName')] === 1) {
		pageScriptList.push(
			'MediaWiki:Common.js/UploadHook.js',
			'w:dev:FixMultipleUpload/code.js' // Fix the Special:MultipleUpload page
		);
	}

	// Infobox Collapsing script
	// Doing this here makes things easier since we don't need to alter the mark-up
	// And it deals with multiple infoboxes in one article (duplicate IDs=bad)
	mw.loader.load('jquery.makeCollapsible', null, true);
	mw.loader.using('jquery.makeCollapsible', function() {
		$(function($) {
			var expand = '[' + mw.msg('collapsible-expand') + ']',
			    collapse = '[' + mw.msg('collapsible-collapse') + ']';
			function toggleText() {
				/*jshint validthis:true */
				var $this = $(this);
				$this.text($this.closest('.infobox').hasClass('mw-collapsed') ? expand : collapse);
				// NOTE: Default is prevented by mw-collapsible already
			}
			$('#mw-content-text .infobox').not('.mw-collapsible').each(function(index) {
				var $this = $(this),
				    $title = $this.find('> * > tr.infobox-title > th'),
				    $toggle;
				if ($title.length) {
					this.id = 'mw-customcollapsible-infobox' + index;
					$toggle = $('<div style="text-align:center; font-size:xx-small" class="noprint">' +
					'<a href="#" class="mw-customtoggle-infobox' + index + '"></a>' +
					'</div>').appendTo($title);
					$toggle = $toggle.children();
					toggleText.call($toggle[0]);
				}
				$this.makeCollapsible();
				if ($toggle) {
					$toggle.click(toggleText); // Installed 2nd so collapser click runs first
				}
			});
		});
	});

	// HOOK: Verbatim imports embedded on particular pages.
	if ($.isArray(window.pageNeededScripts)) {
		pageScriptList.push.apply(pageScriptList, window.pageNeededScripts);
		try { delete window.pageNeededScripts; } catch(e) { window.pageNeededScripts = null; } // IE8 sucks.
	}

	// Import all scripts in bulk (and minified)
	window.importArticles({
		type: 'script',
		articles: scriptList
	}, {
		type: 'script',
		articles: pageScriptList
	});

	// Fix IE8's CSS so I don't have to care about it.
	// Inserting a conditional comment like this DOES work fortunately, so I can avoid the
	// deprecated $.browser check.
	var cssFix = $('<!--[if lt IE 9]><script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script><![endif]-->')[0];
	// IE9 will parse this, evaluate false and end up empty instead of a comment.
	// Normal browsers will just see this as a comment (nodeType === 8) instead of an element (1)
	if (cssFix && cssFix.nodeType === 1) {
		$('head').append(cssFix);
	}

	// HACK: Wikia have busted their PHP templates for the slider. Sigh.
	$(window).one('load', function() {
		$('.WikiaPhotoGalleryPreview').find('li[class^="wikiaPhotoGallery-slider-"] > a').each(function() {
			var x = this.firstChild;
			if (x.nodeType === 3) { x.nodeValue = ' '; }
		});
	});
})(window, jQuery, mediaWiki);