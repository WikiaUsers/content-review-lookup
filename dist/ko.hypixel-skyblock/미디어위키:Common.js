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
 * * (X03) StandardEditSummaries
 * * (X04) HighlightUsers
 * (Y00) importArticles
 * * (Y01) Role-specific Scripts
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
 
// Range block link for IP's 
$(function() {
    var url = window.location.pathname.split('/'),
        urlContribs = url[3];
    if (!/\d+\.\d+\.\d+\.\d+/.test(urlContribs) || url[4] || window.rangeBlockLinkLoaded) {
        console.log('Skipped Apending rangeblock text due to user not being an IP');
        window.rangeBlockLinkLoaded = null;
        return;
    } else {
            window.rangeBlockLinkLoaded = true;
    }
 
    if (window.rangeBlockLinkLoaded) {
        $('#contentSub a:nth-child(2)').after(' | <a href="https://hypixel-skyblock.fandom.com/wiki/Special:Block/' + urlContribs +'/24">Range Block</a>');
        console.log('Sucessfuly appended rangeblock text');
    }
});
//##############################################################
/* ==importArticle pre-script actions== (X00)*/
// The code in this section is for a script imported below
 
// AjaxCommentDelete
window.AjaxCommentDeleteConfig = {
    fastDelete: "Comment Was [[#|Off Topic]]/[[w:c:community:Help:Spam|Spam]]/[[w:c:community:Help:Vandalism|Vandalism]]"
};
// Mass Rename
window.massRenameDelay = 5;
// AjaxBatchDelete/Undelete
window.batchDeleteDelay = 5;
window.batchUnDeleteDelay = 5;
//MassEdit
window.MassEditConfig = {
  interval: 10,
  placement: {
    element: "toolbar",
    type: "append"
  }
};
// FileLinksAutoUpdate
LIRoptions = {
    bottomMessage: '',
    editSummary: 'Updating file links (automatic)',
    singleButtonText: 'Rename and update',
    queueButtonText: 'Add to queue',
    delay: 10
};
//Nuke
window.nukeDelay = 5;
window.nukeTitle = "Mass delete all pages created by this user";
 
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
	oasisPlaceBefore: ''
};
UserTagsJS.modules.custom = {
    // Admins
	'DarkblueKR': ['templates', 'translator'],
 
	// English Wiki Staffs
	'Thundercraft5': ['templates', 'html', 'css', 'lua'],
	'Joker876': ['templates', 'html', 'css', 'lua'],
	'Fewfre': ['templates', 'html', 'css', 'lua', 'js'],
	//Users
	'Snoo999': ['templates', 'html', 'lua', 'css']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
 
//###########################################
/* ===Standard_Edit_Summary=== (X03) */
 
window.dev = window.dev || {};
window.dev.editSummaries = {
	css: '#stdSummaries { ... }',
	select: 'MediaWiki:Custom-StandardEditSummary'
};
 
//###########################################
/* ===HighlightUsers=== (X04) */
window.highlightUsersConfig = {
    colors: {
        'bot': 'darkgray',
        'sysop': '#3D9900',
        'content-moderator': '#7FFFD4',
        'threadmoderator': '#d818c4',
        'rollback': '#ff992b',
    },
    styles: {
        'bot': 'text-shadow: 0 0 3px gray !important;',
        'sysop': 'font-weight: bold; text-shadow: 0 0 4px #5D9935 !important;',
        'content-moderator': 'text-shadow: 0 0 3px #397561 !important;',
        'rollback': 'text-shadow: 0 0 4px #a36726 !important;',
    }
};
 
//##############################################################
/* ==importArticles== (Y00)*/
// Imports scripts from other pages/wikis.
 
importArticles({
	type: 'script',
	articles: [
	    "u:dev:MediaWiki:Standard_Edit_Summary/code.js",
	    "MediaWiki:Common.js/minetip.js",
	    "MediaWiki:Common.js/skydate.js",
	    "MediaWiki:Common.js/kat-cost-calculator.js",
	    "MediaWiki:Common.js/ehp-calculator.js",
	]
});
 
//##############################################################
/* ===Role Specific scripts=== (Y01)*/
 
// setTimeout used to allow for time to check user preferences
setTimeout(function(){
    // Allow users to opt-out of role-specific scripts
    if(window.dontWantRoleSpecificJS) { console.log("Role Scripts skipped by user request"); return; }
 
    // This function checks if the user belongs to any of the groups passed in
    function userBelongsToGroup() {
        return wgUserGroups.some(function(g){ return Array.from(arguments).includes(g) });
    }
 
    if(userBelongsToGroup('autoconfirmed', 'rollback', 'content-moderator', 'sysop')) {
        importArticles({
    	type: 'script',
    	    articles: [
    	        'u:dev:MediaWiki:AjaxUndo/code.js',
    	        'u:dev:MediaWiki:AjaxRedirect/code.js',
    	    ]
        });
    }
 
    if(userBelongsToGroup('rollback', 'content-moderator', 'sysop')) {
        importArticles({
    	type: 'script',
    	    articles: [
                'u:dev:MediaWiki:MassRedirect/code.1.js',
                'u:dev:MediaWiki:MassEdit/code.js',
                'u:dev:MediaWiki:MassRename/code.js',
                'u:dev:MediaWiki:MassCategorization/code.js',
                'u:dev:MediaWiki:AnchoredRollback/code.js',
        	]
        });
    }
 
    if (userBelongsToGroup('content-moderator', 'sysop')) {
        importArticles({
    	type: 'script',
    	    articles: [
                'u:dev:MediaWiki:AjaxCommentDelete/code.js',
                'u:dev:MediaWiki:MassProtect/code.js',
                'u:dev:MediaWiki:ViewDeleted/code.js',
                'u:dev:MediaWiki:AjaxBatchUndelete.js',
                'u:dev:MediaWiki:AjaxPatrol/code.js',
                'u:dev:MediaWiki:FastOldImageDelete/code.js',
                'u:dev:MediaWiki:PowerDelete.js',
                'u:dev:MediaWiki:MultipleFileDelete/code.js',
                'u:dev:MediaWiki:AjaxDelete/code.js',
                'u:dev:MediaWiki:Nuke/code.js',
                'u:dev:MediaWiki:AjaxBatchDelete.js',
                'u:dev:MediaWiki:AjaxThreadDelete/code.js',
            ]
        });
    }
}, 300);