/* Any JavaScript here will be loaded for all users on every page load. */

// taken from [[commons:MediaWiki:Common.js]] by [[commons:User:Remember the dot]] - thanks
// Import language-specific stylesheet, especially useful for languages like German that have (un)usual capitalization rules

importStylesheet("MediaWiki:" + mw.config.get('skin') + ".css/" + mw.config.get('wgUserLanguage'));

//Multilingual description.js from commons
//mw.loader.load('http://commons.wikimedia.org/w/index.php?title=MediaWiki:Gadget-LanguageSelect.js&action=raw&ctype=text/javascript');

// REMOVED because of bugs
// // http://dev.wikia.com/wiki/Standard_Edit_Summary
// window.dev = window.dev || {};
// window.dev.editSummaries = {
//      css: '#stdSummaries { ... }',
//      select: 'MediaWiki:StandardEditSummary'
// };

// Ajax auto-refresh
window.ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
window.AjaxRCRefreshText = 'Auto-refresh';
window.ajaxRefresh = 32768;
// END of ajax auto-refresh

window.DisableBotMessageWalls = {
    exceptions: ['Bwburke94', 'Quit In Protest Bot']
};

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['sysop', 'bureaucrat']
};

// http://dev.wikia.com/wiki/UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		founder: { u:'Wiki Founder' },
		qipb: { u:'Bwburke94\'s Bot', link:'User:Bwburke94' }
	}
};

UserTagsJS.modules.custom = {
	'Beatles20147': ['founder'],
	'Quit In Protest Bot': ['qipb'],
};

UserTagsJS.modules.userfilter = {
	'Bwburke94': ['bot'],
};

UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'],
	'sysop': ['bureaucrat'],
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};

UserTagsJS.modules.autoconfirmed = true;

UserTagsJS.modules.newuser = {
	days: 7, 
	edits: 10, 
	namespace: 0 
};

/**
 * SpoilerAlert
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 *
 * __NOWYSIWYG__
 */
SpoilerAlert = {
    question: 'This page contains information about a current or future season. Are you sure you want to read it?',
    yes: 'Yes, continue to page',
    no: 'No, leave page',
    isSpoiler: function () {
        return (/^Spoiler\:/.test(document.title));
    }
};

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainer on Wikipedia: [[User:R. Koot]]
  */

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function hasClass( element, className ) {
  var Classes = element.className.split( " " );
  for ( var i = 0; i < Classes.length; i++ ) {
    if ( Classes[i] == className ) {
      return ( true );
    }
  }
  return ( false );
}

function collapseTable( tableIndex ) {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );

     if ( !Table || !Button ) { return false; }

     var Rows = Table.getElementsByTagName( "tr" );

     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
}

$(function createCollapseButtons() {
     var tableIndex = 0;
     var NavigationBoxes = {};
     var Tables = document.getElementsByTagName( "table" );

     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );

             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );

             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";

             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );

             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );

             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }

     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
});


/** Dynamic Navigation Bars (experimental) *************************************
*
*  Description: See [[Wikipedia:NavFrame]].
*  Maintainers: UNMAINTAINED
*/

// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';

// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar) {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) { return false; }

    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if ( hasClass( NavChild, 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
            if ( hasClass( NavChild, 'NavContent') ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;

    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}

// adds show/hide-button to navigation bars
$(function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements
    var divs = document.getElementsByTagName("div");
    for (var i = 0, NavFrame; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var NavToggleText = document.createTextNode(NavigationBarHide);
            for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                    if (NavChild.style.display == 'none') {
                        NavToggleText = document.createTextNode(NavigationBarShow);
                        break;
                    }
                }
            }

            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(var j=0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
});

//Shuffle for election candidates
$(function dshuf(){
    var shufsets={};
    var rx=/dshuf\s+(dshufset\d+)/i;
    var divs=document.getElementsByTagName("div");
    for (var i=0; i<divs.length; i++){
        if (rx.test(divs[i].className)){
            if (typeof shufsets[RegExp.$1]=="undefined"){
                shufsets[RegExp.$1]={};
                shufsets[RegExp.$1].inner=[];
                shufsets[RegExp.$1].member=[];
            }
            shufsets[RegExp.$1].inner.push(divs[i].innerHTML);
			shufsets[RegExp.$1].member.push(divs[i]);
        }
    }
    for (shufset in shufsets){
        shufsets[shufset].inner.sort(function() {return 0.5 - Math.random();});
        for (var i=0; i<shufsets[shufset].member.length; i++){
        shufsets[shufset].member[i].innerHTML=shufsets[shufset].inner[i];
        shufsets[shufset].member[i].style.display="block";
        }
    }
});

/* Ratings/Stars widget code
      You can add more Rating-Widgets in your site,
      just pick some new rating-widget-unique-id (must be positive integer).
      For example (rating-widget-unique-id = 38):
      <div class="rw-ui-container rw-urid-38"></div>
    IMPORTANT: The number must be unique across the entire wiki. [One number = one page]
 */
$(function($) {
    "use strict";

    // Disable on pages without a ratings widget, since it just crashes.
    if (!$('.rw-ui-container').length) { return; }

    // Async Rating-Widget initialization.
    window.RW_Async_Init = function(){
        RW.init("41C535FD4EAF22F2E49A4F91A588605E", {
            advanced: {
                star: { stars: 10 },
                font: { color: "#000" },
                layout: {
                    align: {
                        hor: "center",
                        ver: "top"
                    },
                    dir: "ltr"
                }
            },
            size: "medium",
            color: "yellow",
            type: "star"
        });
        RW.render();
    };

    // Append Rating-Widget JavaScript library.
    if (typeof(window.RW) === "undefined"){
        // <div class="rw-js-container"> (Part of the interface contract)
        var rw = document.createElement('div');
        rw.className = 'rw-js-container';
        rw.appendChild(document.createElement('script'));
        document.body.appendChild(rw);
        rw = document.createElement("script");
        rw.type = "text/javascript";
        rw.src = "http://js.rating-widget.com/external.min.js?t=js";
        document.getElementsByTagName("head")[0].appendChild(rw);
    }
});

$(function ($) {
    "use strict";
    if (!$('#admin-list').length) return;
    $.getJSON('/api.php?action=query&list=allusers&augroup=sysop&format=json', function (data) {
        if (data.query && data.query.allusers) {
            var html = '';
            for (var i = 0; i < data.query.allusers.length; i++) {
                var n = data.query.allusers[i].name;
                var nURL = mediaWiki.util.wikiUrlencode(n);
                html += '<li><a href="/wiki/User:' + nURL + '">' + n + '</a></li>';
            }
            if (html.length) {
                $('#admin-list').html('<ul>' + html + '</ul>');
            }
        }
    });
});

/*jshint jquery:true, browser:true, curly:false */
/*global mediaWiki */

if (mediaWiki.config.get('wgAction') === 'view')  (function ($) {

    'use strict';

    function createSlider () {
        /*jshint validthis:true*/
        var scrollPane = $(this),
            scrollContent = scrollPane.find('.scroll-content');

        var scrollbar = scrollPane.find('.scroll-bar').slider({
            slide: function(event, ui) {
                scrollContent.scrollLeft(ui.value / 100 * (scrollContent[0].scrollWidth - scrollContent[0].clientWidth));
            }
        });

        scrollPane.css( "overflow", "hidden" );

        scrollbar.find('.ui-slider-handle').css({
            width: '60px',
            marginLeft: '-30px'
        });
    }

    $(function ($) {
        var imgSlider = $('.img-slider');
        if (!imgSlider.length) return;

        $('head')
        .append('<style type="text/css"> .ui-widget-header { background: transparent; border: none; } .scroll-bar-wrap{ width: 500px; margin: 0 auto; padding: 4px; background: transparent; border: none; } .ui-slider { border: 1px solid #333652; box-shadow: 0 0 4px #333652; background: transparent; } .scroll-bar-wrap .ui-slider-handle {background: url("https://images.wikia.nocookie.net/survivor/images/d/d7/Survivor_header_image.png"); border: none; } .scroll-bar-wrap .ui-slider-handle:hover { background: none repeat scroll 0 0 black; } .img-slider { overflow: hidden; white-space: nowrap; width: auto; } .img-slider figure { display: inline-block; white-space: normal; }</style>');

        imgSlider
        .wrap('<div class="scroll-pane"></div>')
        .addClass('scroll-content')
        .after('<div class="scroll-bar-wrap ui-widget-content"><div class="scroll-bar"></div></div>');

        mediaWiki.loader.using('jquery.ui.slider', function () {
            $('.scroll-pane').each(createSlider);
        });
    });
}(jQuery));