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
// Small script to change wall text
$('a[title="Message Wall"]').html('wall');
$('a.external.text').removeAttr('target');
// Small script to fix article comments links
var inter = setInterval(function() {
    var userGroups = mw.config.get('wgUserGroups');
    var canBlock = /sysop|util|staff|helper|global-discussions-moderator|wiki-manager|soap/.test(userGroups.join('\n'));
    if ($('.article-comments-app').length) {
        clearInterval(inter);
        $('span[class^="EntityHeader_header-details"] > div[class^="wds-avatar EntityHeader_avatar"] > a').each(function() {
            var user = $(this).attr('href').replace(/\/wiki\/(User:|Special:Contributions\/)/gi, ''),
                isIP = /^(?:(?:\d{1,3}\.){3}\d{1,3}|([0-9A-F]{0,4}:){1,7}[0-9A-F]{0,4})(?:\/\d{2})?$/gi.test(user),
                $link = $(this).parent().parent().children('a:last-of-type'),
                $this = $(this);
            if (isIP) {
                $link
                    .attr('href', '/wiki/Special:Contributions/' + user)
                    .html(user);
                $this.attr('href', '/wiki/Special:Contributions/' + user);
            }
            $link.after(
                '&nbsp;(',
                $('<a>', {
                    href: "/wiki/Message_wall:" + user,
                    html: "wall",
                    title: "Message_wall:" + user,
                }),
                canBlock ? '&nbsp;<b>&bull;</b>&nbsp;' : "",
                canBlock ? $('<a>', {
                    href: "/wiki/Special:Block/" + user,
                    html: "block",
                    title: "Special:Block/" + user,
                }) : "",
                ')'
            );
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
    console.log(id)
    $("html, body").animate({ scrollTop: $('#'+id).offset().top-65 }, 500);
}
$("tr .text-anchor").each(function(){
	var id = decodeURI($(this).attr("id").replace(/\./g, '%').replace(/\_/g, '+'));
	$(this).removeAttr("id");
	$(this).closest("tr").attr("id", id);
	
	// Re-trigger hash tag
	if(decodeURI(location.hash.replace("#", "")) === id) {
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
$(window).on('hashchange', function(e) {
    var hash = decodeURI(location.hash.replace("#", ""));
    $("tr[id]").each(function(){
	    var $row = $(this);
	    var id = decodeURI($row.attr("id").replace(/\./g, '%').replace(/\_/g, '+'));
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


$('a[href=\"#ajaxundo\"]').attr('title', 'Instantly undo this edit without leaving the page');
function changeLinks() {
    $('a[href^="/wiki/Module_talk:"], a[href^="/wiki/Module talk:"]').each(function() {
        if ($(this).prop('href').match(/Module[_ ]talk:(.+?)\/doc/g)) {
            $(this).html($(this).html().replace(/Module[ _]talk:(.+?)\/doc/g, 'Module documentation:$1'));
        }
    });
    $('h3').each(function() {
        if ($(this).html().match(/Module[_ ]talk:(.+?)\/doc/g)) {
            $(this).html($(this).html().replace(/Module[ _]talk:(.+?)\/doc/g, 'Module documentation:$1'));
            $(this).attr('title', $(this).attr('title').replace(/Module[ _]talk:(.+?)\/doc/g, 'Module documentation:$1'));
        }
    });
}
window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain.push(changeLinks);
$(document).ready(changeLinks);
// Code to allow making {{Slot}} clickable to show different content
$(function(){
    if(!$(".sbw-ui-tabber").length) { return; }
    // .hidden works on mobile, but not on desktop
    $(".sbw-ui-tab-content.hidden").hide();
    
    $(".sbw-ui-tabber .invslot").each(function(){
        var classes = Array.from(
                $(this)[0].classList
            ).filter(
                function(c) {
                    return(
                        c.indexOf("goto-") === 0 
                        || c.indexOf("ui-") === 0
                    );
                });
    
        if(classes.length) {
            var className = classes[(classes.length)-1]
                .replace("goto-", "")
                .replace("ui-", "");
                
            $(this).click(function() {
                clickTab(className);
            });
        }
    });
    
    $(".sbw-ui-tabber .sbw-ui-tab").click(function(){
        var id = $(this).data("tab");
        if(id) { clickTab(id); }
    });
    
    function clickTab(id) {
        id = "ui-"+id;
        if(!$("#"+id).length) { console.warn("No such tab ID"); return; }
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
if (mw.config.get('wgPageName').match(/^MD:(.+)$/i) && mw.config.get('wgAction') === 'view') {
    window.location.replace(mw.util.getUrl('Module_talk:' + mw.config.get('wgPageName').match(/^MD:(.+)$/i)[1]) + '/doc');
}
// Lua Syntax highlighting function
(function() {
if (!$('.mw-highlight').length) return;
    var libs = {
        "package": true,
        "table": true,
        "string": true,
        "io": true,
        "file": true,
        "math": true,
        "utf8": true,
        "coroutine": true,
        "debug": true,
        "os": true,
        "util": true,
        "number": true,
        "mw": true,
    };
    
    var keywords = {
"time": true,
        "cos": true,
        "sin": true,
        "huge": true,
        "wrap": true,
        "len": true,
        "lower": true,
        "config": true,
        "open": true,
        "close": true,
        "input": true,
        "require": true,
        "format": true,
        "min": true,
        "max": true,
        "cosh": true,
        "sinh": true,
        "tan": true,
        "tanh": true,
        "gsub": true,
        "gmatch": true,
        "upper": true,
        "concat": true,
        "unpack": true,
        "tonumber": true,
        "type": true,
        "sub": true,
        "create": true,
        "date": true,
        "error": true,
        "output": true,
        "rep": true,
        "pairs": true,
        "ipairs": true,
        "pow": true,
        "maxn": true,
        "match": true,
        "remove": true,
        "sort": true,
        "log": true,
        "seeall": true,
        "byte": true,
        "char": true,
        "find": true,
        "reverse": true,
        "preload": true,
        "loaded": true,
        "init": true,
        "clock": true,
        "rad": true,
        "random": true,
        "pi": true,
        "mod": true,
        "modf": true,
        "log10": true,
        "ldexp": true,
        "exp": true,
        "expr": true,
        "dofile": true,
        "print": true,
        "running": true,
        "status": true,
        "yield": true,
        "cpath": true,
        "loadlib": true,
        "path": true,
        "searchers": true,
        "searchpath": true,
        "dump": true,
        "packsize": true,
        "codes": true,
        "offset": true,
        "charpattern": true,
        "mininteger": true,
        "ult": true,
        "randomseed": true,
        "flush": true,
        "lines": true,
        "popen": true,
        "read": true,
        "seek": true,
        "write": true,
        "setvbuf": true,
        "difftime": true,
        "execute": true,
        "exit": true,
        "getenv": true,
        "rename": true,
        "getinfo": true,
        "getlocal": true,
        "isyieldable": true,
        "fmod": true,
        "deg": true,
        "ceil": true,
        "floor": true,
        "abs": true,
        "acos": true,
        "asin": true,
        "atan": true,
        "atan2": true,
        "traceback": true,
        "stack": true,
        "pcall": true,
        "xpcall": true,
        "call": true,
        "select": true,
        "getmetatable": true,
        "next": true,
        "assert": true,
        "join": true,
        "name": true,
        "__index": true,
        "__newindex": true,
        "__call": true,
        "__mode": true,
        "__add": true,
        "__sub": true,
        "__mul": true,
        "__div": true,
        "__mod": true,
        "__pow": true,
        "__unm": true,
        "__concat": true,
        "__eq": true,
        "__lt": true,
        "__le": true,
        "__pairs": true,
        "__ipairs": true,
        "__metatable": true,
        "__tostring": true,
        "metatable": true,
        "rawset": true,
        "rawget": true,
        "set": true,
        "get": true,
        "new": true,
        "class": true,
        "load": true,
        "loaders": true,
        "object": true,
        "style": true,
        "title": true,
        "tag": true,
    };
    function copySet(o) {
        var newArr = [];
        Object.keys(o).forEach(function(key) {
            newArr.push(key)
        })
        return newArr
    }
    var libsArr = copySet(libs)
      keywordsArr = copySet(keywords);
    
    $('.p').each(function() {
        var $this = $(this),
            $text = $this.html();
        if ($text.match(/([\(\)\{\}\[\]]+)/g)) {
            $this.html($text.replace(/([\(\)\{\}\[\]]+)/, '<span class="l">$1</span>'));
        }
    });
    $('.n').each(function() {
        var $this = $(this),
            $text = $this.html();
        if ($text.match(new RegExp('^(' + keywordsArr.join('|') + ")$", 'gi'))) {
            $this.removeClass('n').addClass('nf')
        } else if ($text.match(new RegExp('^(' + libsArr.join('|') + ")$", 'gi'))) {
            $this.removeClass('n').addClass('lb')
        } else if (($this.next().html() || "").match(/(<span class="l">([\(\{]+)<\/span>|^\"$)/)) {
            $this.removeClass('n').addClass('f')
        } else if ($this.next().html() === ":") {
            $this.addClass('nc').removeClass('n')
        }
    });
})();

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
    oldstaff: {u: 'Retired Staff'},
},
oasisPlaceBefore: ''
};
UserTagsJS.modules.custom = {
    // Old Wiki Staff
'IcyOfficial': ['oldstaff', 'mod', 'discord'],
'4hrue2kd83f': ['oldstaff', 'discord'],
'SirCowMC': ['oldstaff', 'hypixelstaff', 'discord'],
// Admins
'Thundercraft5': ['templates', 'html', 'css', 'lua'],
'Joker876': ['templates', 'html', 'css', 'lua'],
'Fewfre': ['templates', 'html', 'css', 'lua', 'js'],
'Specter Elite': ['html', 'css', 'templates'],
// Content Moderators
'Snoo999':  ['templates', 'html', 'lua', 'css', 'translator'],
'Southmelon': ['templates', 'lua'],
'100KPureCool': ['html', 'translator'],
// Discussions Moderators
'Thecrazybone': ['rollback'],
'Bewioeop': ['rollback'],
'YakuzaMC': ['rollback'],
// Ryanbansriyar: ['rollback'], <-- Disabled due to invite abuse
// Rollbackers
'BigBoiSchmeedas': ['rollback'],
    'BrandonXLF': ['rollback', 'lua', 'js'],
    'Doej134567': ['rollback'],
    'Fealtous': ['rollback'],
    'Flachdachs': ['rollback', 'js'],
    'Hexafish': ['rollback'],
    'Lunatic Lunala': ['rollback'],
    'OfTheAsh': ['rollback'],
    'PaperAeroplane555': ['rollback'],
    'Powman898': ['rollback'],
    'Pwign': ['rollback', 'js', 'lua', 'templates'],
    'SamuraiMosey': ['rollback'],
    'Spectrogram': ['rollback'],
// Users
'Eason329': ['translator'],
'HibiscusLavaR': ['translator'],
'DarkblueKR': ['translator'],
'EinsMarcel': ['translator'],
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