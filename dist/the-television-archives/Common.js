/* Any JavaScript here will be loaded for all users on every page load. */



/* WHM toolbar advertisement */
var toolbarLabel = 'Other Schedule Archive Wikis';
var toolbarLinks = [
    {link: 'https://nickstory.fandom.com/wiki/Nickstory_Wiki', label: 'Nickstory Archives'},
    {link: 'https://dcba.fandom.com/wiki/Disney_Channel_Broadcast_Archives_Wiki', label: 'Disney Channel Broadcast Archives'},
    {link: 'https://cnas.fandom.com/wiki/Cartoon_Network/Adult_Swim_Archives_Wiki', label: 'Cartoon Network/Adult Swim Archives'},
    {link: 'https://foxworld.fandom.com/wiki/FoxWorld_Archives', label: 'FoxWorld Archives'},
    {link: 'https://www.youtube.com/@LiamVickersAnimation', label: 'Liam Vicker\'s YouTube Channel'},
];
var toolbarElement = document.createElement( 'li' );
var toolbarWrapper = document.querySelector( '#WikiaBar .tools, #WikiaBar .wikia-bar-anon' );
toolbarElement.classList.add( 'custom' );
toolbarElement.classList.add( 'menu' );
toolbarElement.classList.add( 'wds-dropdown' );
toolbarElement.classList.add( 'wikiabar-button' );
toolbarElement.classList.add( 'wds-is-flipped' );
toolbarElement.innerHTML = '<span class="wds-dropdown__toggle">' + 
    '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg><a href="#">' + toolbarLabel + '</a>' + 
'</span>' + 
'<div class="wds-dropdown__content">' + 
    '<h2 style="margin-left: 16px">GLITCH Resources</h2>' +
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);

/* below logo link bar */
$('.fandom-community-header__image').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Click here to view the first schedule.')
        )
        .attr('href', 'https://the-television-archives.fandom.com/wiki/Nickelodeon_(April_21%2C_2001)')
);

/* ================
   TABLE stuff 
   ================ */

//$("tr:odd").addClass("zebra-stripe"); (adversely affects TOCs for a reason I've not yet determined)

$("table").delegate('td','mouseover mouseleave', function(e) {
    if (e.type == 'mouseover') {
      $(this).parent().addClass("hover");
      $("colgroup").eq($(this).index()).addClass("hover2");
    }
    else {
      $(this).parent().removeClass("hover");
      $("colgroup").eq($(this).index()).removeClass("hover2");
    }
});
/* ================
   ROTATING PICS
   helps with infobox
   images of characters
   with mulitple 
   actors, principally
   [[The Doctor]] and
   [[The Master]].
   
   Also has some helper
   CSS elsewhere.
   ================
   
   globals defaults:true, window:false, $:false

   First of all we need to detect whether browser
   supports animation natively or it needs a javascript
   polyfill.

   The detection code by the courtesy of Christian Heilmann
   http://hacks.mozilla.org/2011/09/detecting-and-generating-css-animations-in-javascript/ */

var animation = false,
    elm = document.createElement('detect'),
    animationstring = 'animation',
    keyframeprefix = '',
    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
    pfx  = '';


if( elm.style.animationName ) { animation = true; }

if( animation === false ) {
  for( var i = 0; i < domPrefixes.length; i++ ) {
    if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
      pfx = domPrefixes[ i ];
      animationstring = pfx + 'Animation';
      keyframeprefix = '-' + pfx.toLowerCase() + '-';
      animation = true;
      break;
    }
  }
}

(function ($) {
    $.slowEach = function (array, interval, callback) {
        if (!array.length) {
            return;
        }
        var i = 0;
        function next() {
            if (callback.call(array[i], i, array[i]) !== false) {
                if (++i < array.length) {
                    setTimeout(next, interval);
                }
            }
        }
        next();
        return array;
    };
    $.fn.dissolve = function (options) {
        var op = $.extend(defaults, options),
            $that = $(this),
            interval = op.visibleItemDuration + op.transitionDuration;
        return $.slowEach(this, interval, function () {
            var $this = $(this);
            $this
                .animate({
                    opacity: 1
                }, op.transitionDuration, function () {
                    function initCarousel() {
                        $that.dissolve(options);
                    }
                    if ($this.is(':last-child')) {
                        setTimeout(initCarousel, op.visibleItemDuration);
                    }
                })
                .delay(op.visibleItemDuration)
                .animate({
                    opacity: 0
                }, op.transitionDuration);
        });
    };
    var defaults = {
        visibleItemDuration: 4000,
        transitionDuration: 1000
    };
}(window.jQuery));

$(function () {
    if( animation === false ) {
        $('.dissolve .item').dissolve({
            // TUNE YOUR CAROUSEL HERE

            // duration of an item being visible in miliseconds
            visibleItemDuration: 4000,

            // duration of a transition between items in miliseconds
            transitionDuration: 1000
        });
    }
});
/* ================
   AJAX 
   customisation
   ================ */
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:Watchlist","Special:Log","Special:Contributions"];
window.ajaxRefresh = 30000;
AjaxRCRefreshText = 'Auto-refresh via AJAX';
AjaxRCRefreshHoverText = 'Automatically refreshes the page';
/* ================
   ARCHIVE TOOL
   customisation 
   ================ */
var ArchiveToolConfig = { 
   archiveListTemplate: 'ArchCat',
   archivePageTemplate: 'ArchPage',
   archiveSubpage: 'Archive',
   userLang: true
}; 
/* ================
   SPOILER ALERT
   customisation 
   ================ */

/** 
 * SpoilerAlert
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 * 
 * __NOWYSIWYG__
 */

window.SpoilerAlertJS = {
            question: 'This section may contain spoilers about unreleased stories. Are you sure you want to read it?',
           yes : 'Hit me with your best shot',
            no : 'Get me the hell out of here',
     fadeDelay : 1000
};

/* ================
   AutoCreateUserPages
   customisation 
   ================ */
/** 
 * documentation at: https://dev.fandom.com/wiki/AutoCreateUserPages
*/

window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{Remove this message to start building your user page}}',
        3: '{{sub'+'st:Welcome}}'
    },
    summary: 'Automatic creation of user pages via script',
    notify: '<a href="/wiki/User talk:$2">Welcome to Tardis!, $1!</a>'
};

/* ================
   {{cite source}}
   Accesability
   tweaks
   ================ */
$(document).ready(function(){
	$('.cse').each(function(i, obj) {
	    $(obj).attr("aria-hidden","true");
	    var citeID = $(obj).attr('id');
	    var citeIDNum = citeID.slice(23); //get number at end of ID
	    var toggle = $(".mw-customtoggle-cs" + citeIDNum);
	    $(toggle).attr("aria-controls",citeID);
		$(toggle).attr("title","Show " + $(toggle).attr("title").slice(7));
		$(toggle).attr("aria-label",$(toggle).attr("title"));
	});
}); 
$(".cse").on("afterExpand.mw-collapsible", function() {
	$(this).attr("aria-hidden","false");
	var citeIDNum = $(this).attr('id').slice(23); //get number at end of ID
	var toggle = $(".mw-customtoggle-cs" + citeIDNum);
	$(toggle).attr("aria-expanded","true");
	$(toggle).attr("title","Hide " + $(toggle).attr("title").slice(5));
	$(toggle).attr("aria-label",$(toggle).attr("title"));
});
$(".cse").on("afterCollapse.mw-collapsible", function() {
	$(this).attr("aria-hidden","true");
	var citeIDNum = $(this).attr('id').slice(23); //get number at end of ID
	var toggle = $(".mw-customtoggle-cs" + citeIDNum);
	$(toggle).attr("aria-expanded","false");
	$(toggle).attr("title","Show " + $(toggle).attr("title").slice(5));
	$(toggle).attr("aria-label",$(toggle).attr("title"));
});
/* ================
   {{pullout}}
   Accesability
   tweaks
   ================ */
$(document).ready(function(){
	$('.pullout-content').each(function(i, obj) {
	    $(obj).attr("aria-hidden","false");
	    var toggle = $(".pullout-handle");
	    $(toggle).attr("aria-controls","mw-customcollapsible-pullout");
		$(toggle).attr("title","Hide editor notices");
		$(toggle).attr("aria-label","Hide editor notices");
	});
}); 
$(".pullout-content").on("afterExpand.mw-collapsible", function() {
	$(this).attr("aria-hidden","false");
	var toggle = $(".pullout-handle");
	$(toggle).attr("aria-expanded","true");
	$(toggle).attr("title","Hide editor notices");
	$(toggle).attr("aria-label","Hide editor notices");
});
$(".pullout-content").on("afterCollapse.mw-collapsible", function() {
	$(this).attr("aria-hidden","true");
	var toggle = $(".pullout-handle");
	$(toggle).attr("aria-expanded","false");
	$(toggle).attr("title","Show editor notices");
	$(toggle).attr("aria-label","Show editor notices");
});

/* ================
   {{nwlh}}
   ================ */
$(document).ready(function(){
	$('NWLH').children("a").each(function(i, obj) {
		$(obj).removeAttr("target");
	});
});