// **************************************************
// Manually added tagline
// **************************************************
$(function(){
     if ($('#WikiaPageHeader').length ) {
            $('#WikiaPageHeader').append('<div id="siteSub"><img alt="Bullseye-Logo.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20140430181230/pediaofinterest/images/thumb/0/08/Bullseye-Logo.png/20px-Bullseye-Logo.png"> <span style="font-weight:bold;">Samaritan</span> v.978.0.06.51</div>');
     }
});

/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
		indigo: { u: 'Indigo 5A', order: 100 },
		bureaucrat: { order: 1 } // Normal order is 0
	}
};

UserTagsJS.modules.custom = {
	'Helloclaire': ['indigo'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

/* Dissolve class - from TARDIS Data Core */
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
        visibleItemDuration: 10000,
        transitionDuration: 500
    };
}(window.jQuery));
 
$(function () {
    if( animation === false ) {
        $('.dissolve .item').dissolve({
            // TUNE YOUR CAROUSEL HERE
 
            // duration of an item being visible in miliseconds
            visibleItemDuration: 10000,
 
            // duration of a transition between items in miliseconds
            transitionDuration: 500
        });
    }
});

window.countdownTimer = {
    myFunction: function () {
       $(this).text('The premiere is airing!');
    }
};