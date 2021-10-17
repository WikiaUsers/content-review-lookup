/* 
Any JavaScript here will be loaded for all users on every page load.
See MediaWiki:Wikia.js for scripts that only affect the oasis skin.
*/

/* Table of Contents
-----------------------
 * (B00) Element animator
 * (W00) Small scripts
 * (X00) importArticle pre-script actions
 * * (X01) Less
 * * (X02) UserTagsJS
 * * (X03) HighlightUsers
 * (Y00) importArticles
*/

/* jshint 
	esversion: 5, forin: true, 
	immed: true, indent: 4, 
	latedef: true, newcap: true,
	noarg: true, undef: true,
	undef: true, unused: true,
	browser: true, jquery: true,
	onevar: true, eqeqeq: true,
	multistr: true, maxerr: 999999,
	-W082, -W084
*/
/* global mw, importScripts */

// Small script to change wall text
$('a[title="Message Wall"]').html('wall');
$('a.external.text').removeAttr('target');

var wgArticlePath = mw.config.get('wgArticlePath').replace('$1', '');

// Add custom "focusable" class
$('.focusable').attr('tabindex', 0);

// Add comment guidelines notice (wiki/fandom staff/users with > 100 edits exempt)
if (!/bureaucrat|content-moderator|threadmoderator|rollback|sysop|util|staff|helper|global-discussions-moderator|wiki-manager|soap/.test(mw.config.get('wgUserGroups').join('\n')) && mw.config.get('wgEditCount') < 100) {
	mw.loader.using([ 'mediawiki.api' ]).then(function() {
		var api = new mw.Api();
		api.get({ action:'parse', text:'{{MediaWiki:Custom-comment-guidelines-notice}}', contentmodel:'wikitext' })
		.done(function(data){
			if(!data.error) {
				$('#articleComments').before($(data.parse.text["*"]));
			}
		});
	});
}

// Small script to fix article comments links
var handlerAdded = false;
var inter = setInterval(function() {
	var userGroups = mw.config.get('wgUserGroups');
	var canBlock = /sysop|util|staff|helper|global-discussions-moderator|wiki-manager|content-team-member|soap|bureaucrat/.test(userGroups.join('\n'));

    function changeCommentLinks() { // jshint ignore:line
        $('span[class^="EntityHeader_header-details"] > div[class^="wds-avatar EntityHeader_avatar"] > a').each(function() {
            var user = decodeURIComponent($(this).attr('href')).replace(new RegExp(wgArticlePath + "((User|사용자):|(Special:Contributions|특수:기여)\\/)"), ''),
                $link = $(this).parent().parent().children('a:last-of-type:not(.mw-user-anon-link)'),
                $this = $(this);

            // Dont reveal IP's if the user is not an admin/bureaucrat/global groups
            if (!canBlock && mw.util.isIPAddress(user, true)) return;

            $link
                .attr('href', wgArticlePath + 'Special:Contributions/' + user)
                .html(user);

            $this.attr('href', wgArticlePath + 'Special:Contributions/' + user);

            $link.after(
                '&nbsp;(',
                $('<a>', {
                    href: wgArticlePath + "Message_wall:" + user,
                    html: "wall",
                    title: "Message_wall:" + user,
                    class: "mw-user-anon-link",
                }),
                canBlock ? '&nbsp;<b>&bull;</b>&nbsp;' : "",
                canBlock ? $('<a>', {
                    href: wgArticlePath + "Special:Block/" + user,
                    html: "block",
                    title: "Special:Block/" + user,
                    class: "mw-user-anon-link",
                }) : "",
                  ')'
            );
        });
    }

	if ($('#articleComments [class*="Comment_wrapper"]').length) {
		clearInterval(inter);
		changeCommentLinks();
	}

    if (!handlerAdded) {
        handlerAdded = true;
        $(document.body).on('click', '[class^="ReplyList_view-all-replies"], [class^="ArticleCommentsSingleThread_toolbar-button-back__"], [class*="ViewFilter_view-filter-view-option__"] *', function() {
            var inter = setInterval(function() {
                if (!$('#articleComments [class*="Comment_wrapper"]').length) return;
                clearInterval(inter);
                changeCommentLinks();
            }, 10);
        });
    }
}, 25);

//##############################################################
/* ==Element animator== (B00)*/
// Taken from https://minecraft.gamepedia.com/MediaWiki:Gadget-site.js
/**
 * Element animator
 *
 * Cycles through a set of elements (or "frames") on a 2 second timer per frame
 * Add the "animated" class to the frame containing the elements to animate.
 * Optionally, add the "animated-active" class to the frame to display first.
 * Optionally, add the "animated-subframe" class to a frame, and the
 * "animated-active" class to a subframe within, in order to designate a set of
 * subframes which will only be cycled every time the parent frame is displayed.
 * Animations with the "animated-paused" class will be skipped each interval.
 *
 * Requires some styling in wiki's CSS.
 */

$( function() {

( function() {
	var $content = $( '#mw-content-text' );
	var advanceFrame = function( parentElem, parentSelector ) {
		var curFrame = parentElem.querySelector( parentSelector + ' > .animated-active' );
		$( curFrame ).removeClass( 'animated-active' );
		var $nextFrame = $( curFrame && curFrame.nextElementSibling || parentElem.firstElementChild );
		return $nextFrame.addClass( 'animated-active' );
	};

	// Set the name of the hidden property
	var hidden; 
	if ( typeof document.hidden !== 'undefined' ) {
		hidden = 'hidden';
	} else if ( typeof document.msHidden !== 'undefined' ) {
		hidden = 'msHidden';
	} else if ( typeof document.webkitHidden !== 'undefined' ) {
		hidden = 'webkitHidden';
	}

	setInterval( function() {
		if ( hidden && document[hidden] ) {
			return;
		}
		$content.find( '.animated' ).each( function() {
			if ( $( this ).hasClass( 'animated-paused' ) ) {
				return;
			}

			var $nextFrame = advanceFrame( this, '.animated' );
			if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
				advanceFrame( $nextFrame[0], '.animated-subframe' );
			}
		} );
	}, 2000 );
}() );

/**
 * Pause animations on mouseover of a designated container (.animated-container and .mcui)
 *
 * This is so people have a chance to look at the image and click on pages they want to view.
 */
$( '#mw-content-text' ).on( 'mouseenter mouseleave', '.animated-container, .mcui', function( e ) {
	$( this ).find( '.animated' ).toggleClass( 'animated-paused', e.type === 'mouseenter' );
} );

// A work around to force wikia's lazy loading to fire
setTimeout(function(){
	$(".animated .lzy[onload]").load();
}, 1000);

} );



//##############################################################
/* ==Small scripts== (W00)*/

/* Used to move ID from {{Text anchor}} onto a parent tr tag (if it exists), allowing the whole row to be styliszed in CSS (using the :target seloector) */
function _goToID(id) {
	$("html, body").animate({ scrollTop: $('#'+id).offset().top-65 }, 500);
}
$("tr .text-anchor").each(function(){
	var id = $(this).attr("id");
	$(this).removeAttr("id");
	$(this).closest("tr").attr("id", id);

	// Re-trigger hash tag
	if(location.hash.replace("#", "") === id) {
		// Show table if collapsed:
		var inCollapseTable = $(this).parents(".mw-collapsed");
		setTimeout(function(){
			if(inCollapseTable.length) {
				var parentTable = $(inCollapseTable[0]);
				parentTable.removeClass("mw-collapsed");
				parentTable.find("tr").stop().show();

				/*if(parentTable.hasClass("mw-made-collapsible")) {
					var collapseID = parentTable.attr("id").replace("mw-customcollapsible-", "");
					$(".mw-customtoggle-"+collapseID).click();
				} else {
					parentTable.removeClass("mw-collapsed");
				}*/
			}
			_goToID(id);
		}, 1000);
	}
});

$(window).on( 'hashchange', function(e) {
	var hash = location.hash.replace("#", "");
	$("tr[id]").each(function(){
		var $row = $(this);
		var id = $row.attr("id");
		if(id === hash) {
			var inCollapseTable = $row.parents(".mw-collapsed");
			if(inCollapseTable.length) {
				var $parentTable = $(inCollapseTable[0]);
				var collapseID = $parentTable.attr("id").replace("mw-customcollapsible-", "");
				$(".mw-customtoggle-"+collapseID).click();
			}
			_goToID(id);
		}
	});
} );

$('a[href=\"#ajaxundo\"]').attr('title', 'Instantly undo this edit without leaving the page');

/* Temp fix to force scrollbars to appear on very wide tables when they are collapsed by default */
$("div[class^='mw-customtoggle-'],div[class*=' mw-customtoggle-']").on("click", function(){ $(".mw-collapsible").resize(); });

/* Arbitrator Icon */
$.when(
    $.getJSON(wgArticlePath + "MediaWiki:Custom-ArbitratorsList.json?action=raw&ctype=text/json"),
    $.getJSON(wgArticlePath + "MediaWiki:Gadget-StaffColorsUpdater.js/staff-colors.json?action=raw&ctype=text/json")
).then(function() {
	var json = arguments[0][0];
	var selector = arguments[1][0].selectors.ICONS;

    json.forEach(function(user) {
        $(selector.replace(/\$1/, user).replace(/::before/, '').replace(/,$/, '')).after($('<a>', {
            href: wgArticlePath + "Project:Arbitration Committe",
            title: "This User is an Arbitrator",
            html: $('<img>', {
                src: "https://static.wikia.nocookie.net/hypixel-skyblock/images/4/41/Scale_of_justice.png/revision/latest/scale-to-width-down/16",
            }),
        }));
    });
}).catch(console.warn);

/* Script to make page-specific styling */
$('#mw-content-text > .mw-parser-output').find('.pageStyles').each(function() {
	var $this = $(this);
	var css = $this.text();
	var id = $this.attr('id');

	/* For security purposes, DO NOT REMOVE! */
	function validateCSS(css) {
		return css
			.replaceAll(/([\t ]*)[a-z0-9\-]+\s*:.*url\(["']?(.*?)["']?\)[^;}]*;?[\t ]*/gi, '$1/* url() is not allowed */') // url()
			.replaceAll(/([\t ]*)[a-z0-9\-]+\s*:.*expression\(["']?(.*?)["']?\)[^;}]*;?[\t ]*/gi, '$1/* expression() is not allowed */') // expression()
			.replaceAll(/([\t ]*)@import.*/gi, "$1/* @import is not allowed */") // @import
			.replaceAll(/([\t ]*)[a-z0-9\-]+\s*:[ \t]*["']?javascript:([^;\n]*)?;?[\t ]*/gi, '$1/* javascript: is not allowed */') // javascript:
			.replaceAll(/^([\t ]*)@font-face\s*{[^\0]*?}/gi, "$1/* @font-face is not allowed */"); // @font-face
	}

	$('<style>', {
		text: validateCSS(css),
		type: "text/css",
		class: $this.attr('class') && $this.attr('class').replaceAll(/^pageStyles\s*|pageStyles\s*$/g, ""),
		id: id,
	}).appendTo('head');
});

// Change profile links
var count = 0;
var inter = setInterval(function() {
	if (count > 12000) return;
	if (mw.config.get('profileUserId') && $('#userProfileApp').length) $('#userProfileApp .user-identity-stats a[href*="' + wgArticlePath + "Special:UserProfileActivity/\"]").attr('href', '/f/u/' + mw.config.get('profileUserId')), clearInterval(inter);
}, 5);	

// Script to respond to ANI reports
if (
	mw.config.get('wgUserGroups').find(function(v) { return ['bureaucrat', 'sysop'].includes(v) })
	&& mw.config.get('wgPageName').includes('Administrator\'s_Noticeboard') 
	&& mw.config.get('wgNamespaceNumber') === 4
)
	$(".mw-editsection").append(' | ', $("<a>", {
		class: "mw-complete-report",
		text: "mark as complete",
		title: "Mark this report as compelete",
		css: {
			cursor: "pointer",
		},
		click: function() {
			var user = $(this).parent().parent().next().find('li:first-of-type').children('a:first-of-type').text();
			var message = prompt('Enter a message to respond with:');

			if (message === null) return;

			new mw.Api().postWithEditToken({
				action: "edit",
				appendtext: "\n:\{\{AIV|done\}\} " + message + " \{\{Subst:sig\}\}",
				title: mw.config.get('wgPageName'),
				summary: "Marking report of [[Special:Contributions/" + user + "|" + user + "]] as completed",
				section: new mw.Uri($(this).parent().find('a[href*="&section="]').attr('href')).query.section,
			}).then(console.log, console.warn);
		},
	}));

// Code to allow making {{Slot}} clickable to show different content
$(function(){
	if (!$(".sbw-ui-tabber").length) {
		return;
	}

	// .hidden works on mobile, but not on desktop
	$(".sbw-ui-tab-content.hidden").hide();

	$(".sbw-ui-tabber .invslot").each(function(){
		var classes = Array.from($(this)[0].classList).filter(function(c) {
				return c.indexOf("goto-") === 0 || c.indexOf("ui-") === 0;
			});

		if (classes.length) {
			var className = classes[(classes.length)-1]
				.replace("goto-", "")
				.replace("ui-", "");

			$(this).click(function() {
				clickTab(className);
			});
		}
	});

	$(".sbw-ui-tabber .sbw-ui-tab").click(function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		var id = $(this).data("tab");
		if (id) { 
			clickTab(id); 
		}
	});

	function clickTab(id) {
		id = "ui-"+id;
		if(!$("#"+id).length) { console.warn("No such tab ID \"" + id + "\""); return; }
		$(".sbw-ui-tab-content").addClass("hidden").hide();
		$(".sbw-ui-tab-content#"+id).removeClass("hidden").show();
		// Since images don't load on hidden tabs, force them to load
		$(".sbw-ui-tab-content#"+id+" .lzy[onload]").load();
	}
});

if (mw.config.get('wgPageName').match(/^S:(.+)$/i)) {
	window.location.replace(mw.util.getUrl('Special:' + mw.config.get('wgPageName').match(/^S:(.+)$/i)[1]));
}

if (mw.config.get('wgPageName').match(/^HSW:(.+)$/i) && mw.config.get('wgAction') === 'view') {
	window.location.replace(mw.util.getUrl('Project:' + mw.config.get('wgPageName').match(/^HSW:(.+)$/i)[1]));
}

//##############################################################
/* ==importArticle pre-script actions== (X00)*/
// The code in this section is for a script imported below

// AjaxRC
window.ajaxRefresh = 30000;
window.ajaxPages = [
	"Special:RecentChanges",
	"Special:WikiActivity",
	"Special:Watchlist",
	"Special:Log",
	"Special:Contributions",
	"Special:AbuseLog",
];
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
	'ajaxrc-refresh-text': 'Auto Refresh',
	'ajaxrc-refresh-hover': 'Enable automatically refreshing of this page',
}}}}});

//###########################################
/* ===Less=== (X01) */

window.lessOpts = window.lessOpts || [];
window.lessOpts.push( {
	// this is the page that has the compiled CSS
	target: '미디어위키:Common.css',
	// this is the page that lists the LESS files to compile
	source: '미디어위키:Custom-common.less',
	// these are the pages that you want to be able to update the target page from
	// note, you should not have more than one update button per page
	load: [ '미디어위키:Common.css', '미디어위키:Custom-common.less' ],
	// target page header
	header: '미디어위키:Custom-css-header/common',
	// allowed groups
	allowed: [],
} );

//###########################################
/* ===UserTagsJS=== (X02) */
window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: {u: 'Rollback'},
		mod: {u:'Mod'},
		hypixelstaff: {u:'Hypixel Staff'},
		juniorsysop: {u:'Junior Sysop'},
		discord: {u:'Discord Server'},
		templates: {u:'Templates'},
		css: {u:'CSS'},
		html: {u:'HTML'},
		js: {u:'Java Script'},
		lua: {u:'Lua'},
		translator: {u: 'Translator'},
		oldstaff: {u: 'Retired Staff'},
	},
	oasisPlaceBefore: ''
};

window.UserTagsJS.modules.custom = {
	// Old Wiki Staff

	// Admins

	// Content Moderators

	// Discussions Moderators

	// Rollbackers

	// Users
};

//###########################################
/* ===HighlightUsers=== (X03) */
window.highlightUsersConfig = {
	colors: {
		'bureaucrat': '#ff4f52',
		'bot': 'darkgray',
		'sysop': '#7e2dbc',
		'content-moderator': '#7FFFD4',
		'threadmoderator': '#1f9921',
		'rollback': '#ff992b',
	},
	styles: {
		'bureaucrat': 'text-shadow: 0 0 4px #c77979 !important;',
		'bot': 'text-shadow: 0 0 3px gray !important;',
		'sysop': 'text-shadow: 0 0 4px #7550ac !important;',
		'content-moderator': 'text-shadow: 0 0 3px #397561 !important;',
		'threadmoderator': 'text-shadow: 0 0 3px #648264 !important;',
		'rollback': 'text-shadow: 0 0 4px #a36726 !important;',
	}
};

//##############################################################
/* ==importArticles== (Y00)*/
// Imports scripts from other pages/wikis.
// NOTE: importAricles() is currently broken.
window.importScripts = function(pages) {
	if (!Array.isArray(pages)) {
		pages = [pages];
	}

	pages.forEach(function(v) {
		var wiki;
		var match = v.match(/^(?:u|url):(.+?):(.+)$/);
		(match|| []).shift();

		wiki = wiki || mw.config.get('wgServer').replace('https://', '').replace('.fandom.com', '');
		match = match || v;

		$.ajax({
			url: 'https://' + (Array.isArray(match) ? match[0] : wiki) + '.fandom.com' + wgArticlePath + (Array.isArray(match) ? match[1] : match) + '?action=raw&ctype=text/javascript',
			dataType: "script",
			cache: true,
		}).then(function() {
			console.log(v + ': Imported Successfuly!');
		});
	});
};

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/hypxielskyblock/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200303134947&format=original&path-prefix=ko'
window.pPreview.noimage = 'https://static.wikia.nocookie.net/hypxielskyblock/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200303134947&format=original&path-prefix=ko'

importScripts([
	"MediaWiki:Common.js/minetip.js",
	"MediaWiki:Common.js/skydate.js",
	"MediaWiki:Common.js/calc.js",
]);

/* Custom Tooltips for use with the Tooltips/code.js */
window.tooltips_list = [
    {   classname: 'weapon-icon',
        parse: '{'+'{툴팁/무기|weapon=<#weapon#>|variant=<#variant#>|game=<#game#>}}'},
    {   classname: 'armor-icon',
        parse: '{'+'{툴팁/갑옷|armor=<#armor#>|variant=<#variant#>|game=<#game#>}}'},
];
 
window.tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true
};