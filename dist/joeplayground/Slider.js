(function ($) {
	$(document).ready( function(){

	function isAppleDevice(){
        return (
            (navigator.userAgent.toLowerCase().indexOf("ipad") > -1) ||
            (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
            (navigator.userAgent.toLowerCase().indexOf("ipod") > -1)
        );
    }
	if (isAppleDevice()) {
		$('#content .slider .item-list > ul').after('<div class="pager">').maximage({
    cycleOptions: {
      fx:'scrollHorzTouch',
      speed: 5000,
      timeout: 3000,
      pager:'#content .slider .pager',
      speedIn:   400,
      speedOut:   400,
      before: beforeSlide,
      after: afterSlide,
      startingSlide: 0
    }
		});
		
		$('#content .slider .item-list > ul').swipe({ swipeMoving: function( pageX ){

        if( slideFlag ) return;

        var newLeft = currentLeft-pageX;

        currenSlide.css('left', newLeft+'px'  );

        var $slides = $( sliderExpr, $('#content .slider .item-list > ul') );
        var scrollSlide;

        nextSlideLeft =   newLeft > 0 ? newLeft - currenSlide.width(): newLeft+currenSlide.width();
        flag = newLeft > 0 ? -1: 1;
        scrollSlide  = slideNumber + flag;
        if( scrollSlide < 0 || scrollSlide > ($slides.length - 1 ) )
        {
            scrollSlide = scrollSlide < 0 ? $slides.length - 1 : 0;
        }

         $slides.eq( scrollSlide ).css('left',nextSlideLeft + 'px' );
         $slides.eq( scrollSlide ).show();
    },
    swipeLeft: function(){$('#content .slider .item-list > ul').cycle('next');},
    swipeRight: function(){ $('#content .slider .item-list > ul').cycle('prev'); }
})

// Call this function before the slide start
function beforeSlide( curr, next , opt )
{
     sliderExpr = opt.slideExpr;
     slideFlag = true;
}

// Call this function after the slide start
function afterSlide(curr, next , opt )
{
    currenSlide =  $(next);
    slideNumber = opt.currSlide;
    currentLeft = $(next).position().left;
    slideFlag = false;
}

/* Swipe Variables */
$.fn.cycle.transitions.scrollHorzTouch = function($cont, $slides, opts) {
	$cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev) {
			fwd = !fwd;
		}

    positionNext = $(next).position();
    positionCurr = $(curr).position();

    $.fn.cycle.commonReset(curr,next,opts);
    if( ( positionNext.left > 0 && fwd ) || ( positionNext.left <  0 && !fwd ) )
    {
      opts.cssBefore.left = positionNext.left;
    }
    else
    {
      opts.cssBefore.left = fwd ? (next.cycleW-1) : (1-next.cycleW);
    }
    if( ( positionCurr.left > 0 && fwd ) || ( positionCurr.left <  0 && !fwd ) )
    {
      opts.animOut.left = positionCurr.left;
    }
    else
    {
      opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
    }
	});
	//opts.cssFirst.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = 0;
};
	}
	
});
})(jQuery);