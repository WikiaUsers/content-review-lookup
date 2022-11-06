/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */

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
window.ajaxRefresh = 30000
/* ================
   ARCHIVE TOOL
   customisation 
   ================ */
var ArchiveToolConfig = { 
   archiveListTemplate: 'ArchCat',
   archivePageTemplate: 'ArchPage',
   archiveSubpage: '存档',
   userLang: true
}; 
/* ================
   SPOILER ALERT
   customisation 
   ================ */

/** 
 * SpoilerAlert
 * 说明文档位于：http://dev.wikia.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 * 
 * __NOWYSIWYG__
 */

window.SpoilerAlertJS = {
            question: '此部分可能含有关于未发表故事的剧透，你确定要阅读吗？',
           yes : '快来剧透我',
            no : '快带我离开这',
     fadeDelay : 1000
};

/* ================
   AutoCreateUserPages
   customisation 
   ================ */
/** 
 * 说明文档位于：https://dev.fandom.com/wiki/AutoCreateUserPages
*/

window.AutoCreateUserPagesConfig = {
    content: '{{你可以移除此留言}}',
    summary: '通过脚本自动创建用户页面',
    notify: '<a href="/zh/wiki/User:$2">欢迎登上Tardis，$1！</a>'
};