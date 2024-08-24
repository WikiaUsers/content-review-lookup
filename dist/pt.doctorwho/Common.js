/* Código Javascript colocado aqui será carregado para todos os utilizadores em cada carregamento de página */

 
/* =============
   MOS box 
   from Brickipedia
   ==============
   This is the little box underneath the
   search bar and article tally, which has the 
   Seal of Rassilon in it.
   ===============
   Keep at end of common.js, but before
   any addOnloadHooks.
   ================ */
 
importScript('MediaWiki:Common.js/mosbox.js');
 
importScriptPage('ArchiveTool/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');


// This contains the current, April 2012 code, now
// found at [[starwars:MediaWiki:Common.js]].  Grunny no longer
// keeps this code in a separate file, but it seems to be 
// working just as well to have it separately as to have it
// imbedded in THIS file.  Since it's fairly arcane, mundane code
// it may be better to have it out of the way in its own file.

window.AjaxRCRefreshText = 'Recarregar';
window.AjaxRCRefreshHoverText = 'Recarregar a página automaticamente';
window.ajaxPages = ["Especial:Mudanças_recentes","Especial:WikiActivity"];


var ArchiveToolConfig = { 
   archiveListTemplate: 'ArchCat',
   archivePageTemplate: 'ArchPage',
   archiveSubpage: 'Archive',
   userLang: true
}; 

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
 
/*globals defaults:true, window:false, $:false */
 
// First of all we need to detect whether browser
// supports animation natively or it needs a javascript
// polyfill.
// The detection code by the courtesy of Christian Heilmann
// http://hacks.mozilla.org/2011/09/detecting-and-generating-css-animations-in-javascript/
 
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
 
/** 
 * SpoilerAlert
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 * 
 * __NOWYSIWYG__
 */
 
SpoilerAlert = {
            question: 'This page may contain spoilers about unreleased stories. Are you sure you want to read it?',
            yes: 'Hit me with your best shot',
            no: 'Get me the hell out of here',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Contains spoilers');
    },
    back:true
};
 

// Etiquetas
window.UserTagsJS = {
    tags: {
        bureaucrat: { link: 'Special:ListUsers/bureaucrat' },
        founder: { link: 'Special:ListUsers/bureaucrat' },
        bot: { link: 'Special:Listusers/bot' },
        chatmoderator: { link: 'Special:ListUsers/chatmoderator' },
        rollback: { link: 'Special:ListUsers/rollback' },
        sysop: { link: 'Special:ListUsers/sysop' }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: false
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'founder',
            'sysop',
            'rollback',
            'bot'
        ],
        newuser: false
    }
};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Lord Chanceler'},
        newuser: { u:'Na Academia'},
        sysop: { u:'Castelão'},
        rollback: {u:'Guarda da Chancelaria'},
        chatmoderator: {u:'Guarda do Capitólio'},
        founder: {u:'Lord Presidente'},
    }
};