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
	    if(id == hash) {
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
 
$('a[href=\"#ajaxundo\"]').attr('title', 'Instantly undo this edit without leaving the page')
 
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
    target: 'MediaWiki:Common.css',
    // this is the page that lists the LESS files to compile
    source: 'MediaWiki:Custom-common.less',
    // these are the pages that you want to be able to update the target page from
    // note, you should not have more than one update button per page
    load: [ 'MediaWiki:Common.css', 'MediaWiki:Custom-common.less' ],
    // target page header
    header: 'MediaWiki:Custom-css-header/common'
} );
/*window.lessOpts.push( {
    target: 'MediaWiki:Handheld.css',
    source: 'MediaWiki:Custom-handheld.less',
    load: [ 'MediaWiki:Handheld.css', 'MediaWiki:Custom-handheld.less' ],
    header: 'MediaWiki:Custom-css-header/handheld'
} );*/
 
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
	},
	// oasisPlaceBefore: '.'
};
 
UserTagsJS.modules.custom = {
    // Old Wiki Staff
	'IcyOfficial': ['mod', 'discord'],
	'4hrue2kd83f': ['discord'],
	'SirCowMC': ['hypixelstaff', 'discord'],
 
	// Wiki Staff (Admins)
	'Thundercraft5': ['templates', 'html', 'css', 'lua'],
	'Joker876': ['templates', 'html', 'css', 'lua'],
	'Fewfre': ['templates', 'html', 'css', 'lua', 'js'],
	'Specter Elite': ['html', 'css', 'templates'],
 
	// Content Moderators
	'Snoo999':  ['templates', 'html', 'lua', 'css', 'translator'],
	'Southmelon': ['templates', 'lua'],
 
	//Rollbackers
	'Fealtous': ['rollback'],
	'SamuraiMosey': ['rollback'],
	'Hexafish': ['rollback'],
	'PaperAeroplane555': ['rollback'],
	'BrandonXLF': ['lua', 'js', 'rollback'],
	'Spectrogram': ['rollback'],
	'Flachdachs': ['js', 'rollback'],
	'Powman898': ['rollback'],
	'Pwign': ['rollback', 'js', 'lua', 'templates'],
	'Doej134567': ['rollback'],
	'BigBoiSchmeedas': ['rollback'],
 
	// Users
	'Eason329': ['translator'],
	'HibiscusLavaR': ['translator'],
	'DarkblueKR': ['translator'],
	'EinsMarcel': ['translator'],
	'100KPureCool': ['html'],
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
    },
    styles: {
        'bureaucrat': 'text-shadow: 0 0 4px #c77979 !important;',
        'bot': 'text-shadow: 0 0 3px gray !important;',
        'sysop': 'text-shadow: 0 0 4px #7550ac !important;',
        'content-moderator': 'text-shadow: 0 0 3px #397561 !important;',
        'rollback': 'text-shadow: 0 0 4px #a36726 !important;',
        'threadmoderator': 'text-shadow: 0 0 3px #648264 !important;'
    }
};
 
//##############################################################
/* ==importArticles== (Y00)*/
// Imports scripts from other pages/wikis.
 
importArticles({
	type: 'script',
	articles: [
	    "MediaWiki:Common.js/minetip.js",
	    "MediaWiki:Common.js/skydate.js",
	    "MediaWiki:Common.js/calc.js",
 
	    // Both of these are deprecated (replaced by calc.js, and currently unused; leaving in to make sure no issue arise) - 1 Aug 2020 --Fewfre
	    "MediaWiki:Common.js/kat-cost-calculator.js",
	    "MediaWiki:Common.js/ehp-calculator.js",
	]
});