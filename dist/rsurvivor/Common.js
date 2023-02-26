/* Any JavaScript here will be loaded for all users on every page load. */

/*<source lang="javascript">*/

// taken from [[commons:MediaWiki:Common.js]] by [[commons:User:Remember the dot]] - thanks
// Import language-specific stylesheet, especially useful for languages like German that have (un)usual capitalization rules
//
importStylesheet("MediaWiki:" + mw.config.get('skin') + ".css/" + mw.config.get('wgUserLanguage'));

//Multilingual description.js from commons
//mw.loader.load('http://commons.wikimedia.org/w/index.php?title=MediaWiki:Gadget-LanguageSelect.js&action=raw&ctype=text/javascript');

// Ajax auto-refresh
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.ajaxRefresh = 32768;
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

// http://dev.wikia.com/wiki/DisableBotMessageWalls
window.DisableBotMessageWalls = {
    exceptions: ['Bwburke94', 'Quit In Protest Bot']
};

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['chatmoderator', 'rollback', 'staff', 'sysop', 'bureaucrat']
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

// window.cacheSkip = [];
// window.cacheSkipLimit = 1000;
window.topLevelCat = 'Survivor';

importArticles({
	type: 'script',
	articles: [
		'w:c:dev:AjaxRC/code.js',
		'w:c:dev:CacheCheck/code.js',
		'w:c:dev:Countdown/code.js',
		'w:c:dev:DisableBotMessageWalls/code.js',
		'w:c:dev:LastEdited/code.js',
		'w:c:dev:ReferencePopups/code.js',
		'w:c:dev:ReferencePopups/custom.js',
		'w:c:dev:RevealAnonIP/code.js',
		'w:c:dev:TopEditors/code.js',
		'w:c:dev:UserTags/code.js',
		'w:c:dev:VisualSpellCheck/code.js',
		'w:c:dev:WallGreetingButton/code.js'
	]
});

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});

/**
 * SpoilerAlert
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 *
 * __NOWYSIWYG__
 */
/*jshint curly:false jquery:true browser:true */
 
$(function () {
    "use strict";
 
    window.SpoilerAlert = (function (my, console, Math) {
 
        my = $.extend({
            question: 'This page contains information about a current or future season. Are you sure you want to read it?',
            yes: 'Yes, continue to page',
            no: 'No, leave page',
            isSpoiler: function () {
                return (/^Spoiler\:/.test(document.title));
            },
            back: false
        }, my); // If my is undefined/null/not-object then jQuery will ignore it
 
        var wgArticleId = (window.mediaWiki && window.mediaWiki.config && window.mediaWiki.config.get('wgArticleId')) || window.wgArticleId;
 
        var dialog =
        '<table id="dialog" border="0" cellpadding="20" style="background-color: white; border-radius: 4px; border: 2px solid black;">' +
            '<tr>' +
                '<td colspan="2" style="padding: 20px 30px; border-style: none; text-align: center; color: black">' +
                    my.question +
                '</td>' +
            '</tr>' +
            '<tr>' +
                '<td style="padding: 0 30px 20px; text-align: center; border-style: none;">' +
                    '<button id="no">' + my.no + '</button>' +
                '</td>' +
                '<td style="padding: 0 30px 20px; text-align: center; border-style: none;">' +
                    '<button id="yes">' + my.yes + '</button>' +
                '</td>' +
            '</tr>' +
        '</table>';
 
        function getBackgroundColor () {
            var color = $('#WikiaPageBackground').css('background-color');
            if ('transparent' !== color) return color;
            color = $('#WikiaPage').css('background-color');
            if ('transparent' !== color) return color;
            color = $('section.module', '#WikiaRail').css('background-color');
            if ('transparent' !== color) return color;
            console.log('SpoilerAlert: Cannot determine color');
            return color;
        }
 
        // Use LocalStorage, it doesn't get sent to the server every HTTP request
        var ids = $.storage.get('SpoilerAlertJS');
        // Backwards compatibility. This block can be removed after a week or so
        if (!ids) {
            ids = $.cookies.get('spoilers');
            if (ids) { // Old cookie found, convert to local storage
                ids = ids.split(',');
                $.cookies.del('spoilers', {hoursToLive:0, path:'/', domain: location.host});
                $.storage.set('SpoilerAlertJS', ids);
            } else {
                ids = [];
            }
        }
        if (my.isSpoiler() && -1 === $.inArray(wgArticleId, ids)) {
            var article = $('#WikiaArticle');
            var articleHeight = article.height();
            var dialogHeight;
            $('<div id="blackout">' + dialog + '</div>').prependTo(article).css({
                position: 'absolute',
                top: 0, left: 0,
                right: 0, bottom: 0,
                zIndex: 2000000001,
                backgroundColor: getBackgroundColor(),
                minHeight: (dialogHeight = $('#dialog').height())
            });
            var dialogPadding = 100;
            var topRelativeToWindow = Math.round(
                ($(window).height() - dialogHeight) / 2 - $('#WikiaArticle').offset().top
            );
            var topRelativeToArticle = Math.round((articleHeight - dialogHeight) / 2);
            console.log(
                'window.height: ', $(window).height(),
                ', WikiaArticle.offset.top: ', $('#WikiaArticle').offset().top,
                ', articleHeight:', articleHeight,
                ', dialogHeight:', dialogHeight,
                ', topRelativeToWindow:', topRelativeToWindow,
                ', topRelativeToArticle: ', topRelativeToArticle
            );
            $('#dialog').css({
                position: 'absolute',
                left: Math.round(($('#WikiaArticle').width() - $('#dialog').width() ) / 2) + 'px',
                top:  Math.max(Math.min(topRelativeToWindow, topRelativeToArticle), dialogPadding) + 'px'
            });
            $('#no').click(function () {
                $('#dialog').remove();
                if (my.back) {
                    if (history.length) {
                        history.back();
                    } else {
                        location.href = location.protocol + '//' + location.host;
                    }
                }
            });
            $('#yes').click(function () {
                $('#dialog').remove();
                $('#blackout').fadeOut(1600, function () {
                    $(this).remove();
                });
                ids.push(wgArticleId);
                $.storage.set('SpoilerAlertJS', ids);
            });
        }
 
        return my;
 
    }) (window.SpoilerAlert, window.console || { log: $.noop }, Math);
 });


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

function collapseTable( tableIndex )
{
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );

     if ( !Table || !Button ) {
         return false;
     }

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

function createCollapseButtons()
{
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
}

jQuery( createCollapseButtons );


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
function toggleNavigationBar(indexNavigationBar)
{
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
        return false;
    }

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
function createNavigationBarToggleButton()
{
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
}

jQuery( createNavigationBarToggleButton );


//Shuffle for election candidates
function dshuf(){
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

}

jQuery(dshuf);

/* Ratings/Stars widget code
      You can add more Rating-Widgets in your site,
      just pick some new rating-widget-unique-id (must be positive integer).
      For example (rating-widget-unique-id = 38):
      <div class="rw-ui-container rw-urid-38"></div>
    IMPORTANT: The number must be unique across the entire wiki. [One number = one page]
 */
jQuery(function($) {
        "use strict";

        // Disable on pages without a ratings widget, since it just crashes.
        if (!$('.rw-ui-container').length) { return; }

        // Async Rating-Widget initialization.
        window.RW_Async_Init = function(){
            RW.init("41C535FD4EAF22F2E49A4F91A588605E",
            {
                advanced: {
                    star: {
                        stars: 10
                    },
                    font: {
                        color: "#000"
                    },
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

importScriptPage('BackToTopButton/code.js', 'dev');

// <syntax type="javascript">
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
            case "_reset":
                for (var j in toggles)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j in toggles)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j in toggles)
                    toggles[j].style.display = 'none';
                break;
            case "":
            default:
                // Toggle
                for (var j in toggles)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
}
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();     
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
dev:DiscordIntegrator/code.js
 
addOnloadHook(toggleInit);
 
// </syntax>