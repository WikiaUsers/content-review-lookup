/**
 * TODO:
 *
 * - throbbing
 */

// __NOWYSIWYG__ <source lang="javascript">

/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:true*/

$.fn.rateableWidget = (function () {
    
    'use strict';
    
    var SYMBOL_MIN_SIZE = 15,
        STAR_SVG = '//vignette3.wikia.nocookie.net/sonako/images/9/94/Trophy1.png',
        STAR_SVG_SHADOW = '//vignette3.wikia.nocookie.net/sonako/images/3/3d/Trophygray.png';
    
    function adjustRating (event) {
        /*jshint validthis:true*/
        var $this = $(this),
            widget = $this.data('widget');
        widget.setRating((event.pageX - $this.offset().left + 5) / widget.inc);
    }
    
    function resetRating () {
        /*jshint validthis:true*/
        $(this).data('widget').resetRating();
    }
    
    function submitRating () {
        /*jshint validthis:true*/
        var widget = $(this).data('widget');
        widget.lock();
        widget.submit(widget.rating);
    }
    
    function RateableWidget ($widget, options) {
        
        this.$widget = $widget;
        this.src = options.src || STAR_SVG;
        this.altSrc = this.src === STAR_SVG ? STAR_SVG_SHADOW : (options.altSrc || false);
        this.starSize = Math.max((parseInt(options.starSize, 10) || 0), SYMBOL_MIN_SIZE);
        this.numStars = options.numStars;
        this.maxRating = options.maxRating;
        this.rating = 0;
        this.change = options.change;
        this.submit = options.submit;
        this.inc = this.starSize * this.numStars / this.maxRating;
        this.locked = options.locked;
        
        this.$slider = $(
            '<div class="rateable-widget-front" style="position: absolute; display: block; overflow: hidden; background: transparent; top: 0; left: 0; margin: 0; padding: 0; z-index: 2; ' +
            'height: ' + this.starSize + 'px; width: 0; ' +
            'background: url(' + this.sizeSVG(this.src, this.starSize) + ') repeat-x scroll 0 0 transparent; white-space: nowrap;"> </div>' +
            '<div class="rateable-widget-back" style="position: absolute; display: block; overflow: visible; background: transparent; top: 0; left: 0; margin: 0; padding: 0; z-index: 1; ' +
            'height: ' + this.starSize + 'px; ' +
            'width: ' + this.starSize * this.numStars + 'px; ' +
            'background: url(' + this.sizeSVG(this.altSrc || this.src, this.starSize) + ') repeat-x scroll 0 0 transparent;' +
            (this.altSrc ? '' : ' opacity: 0.2') + '"> </div>'
         )
        .appendTo($widget)
        .first();
        this.$back = this.$slider.next();
        
        this.$widget
        .css({
            position: 'absolute',
            display: 'block',
            width: this.starSize * this.numStars + 'px',
            height: this.starSize + 'px'
        })
        .addClass('rateable-widget');
        
        if (!this.locked) {
            this.$widget
            .on('mouseenter mousemove', adjustRating)
            .on('mouseleave', resetRating)
            .on('click', submitRating);
        }
    }
    
    RateableWidget.prototype.setRating = function (rating) {
        rating = Math.max(1, Math.min(this.maxRating, Math.round(rating) || 1));
        if (rating === this.rating) return;
        this.rating = rating;
        var width = Math.round(this.starSize * rating * this.numStars / this.maxRating);
        this.$slider.css('width', width + 'px');
        if (this.change) this.change(rating);
    };
    
    RateableWidget.prototype.resetRating = function () {
        this.rating = 0;
        this.$slider.css('width', '0');
        this.change(0);
    };
    
    RateableWidget.prototype.lock = function () {
        this.locked = true;
        this.$widget.off('mouseenter mousemove mouseleave click');
    };
  
    RateableWidget.prototype.sizeSVG = function (svg, size) {
        var file = svg.split('/').pop();
        svg = svg.replace(/\/images\/(thumb\/)?/, "/images/thumb/");
        return svg + '/' + size + 'px-' + file + '.png';
    };
    
    RateableWidget.prototype.startThrobbing = function () {
        //...
    };
    
    RateableWidget.prototype.stopThrobbing = function () {
        //...
    };
    
    function rateableWidget(options) {
        /*jshint validthis:true*/
        if (!this.data('widget')) {
            this.data('widget', new RateableWidget(this, options));
        }
        return this;
    }
    
    return rateableWidget;
}());

$.fn.rateable = (function () {
    
    'use strict';
    
    var MAX_RATING = 10,
        PERMISSABLE_NUM_STARS = [5, 10],
        NO_VALUE = '-';
    
    function Rateable ($rateable, options) {
        this.votes  = 0;
        this.rating = 0;
        this.avg    = 0;
        this.changeCallbacks = $.Callbacks();
        this.submitCallbacks = $.Callbacks();
        this.$rateable = $rateable
        .empty().addClass('rateable');
        this.$avg    = $('<div class="rateable-avg">' + NO_VALUE + '</div>')   .appendTo($rateable);
        this.$rating = $('<div class="rateable-rating">' + NO_VALUE + '</div>').appendTo($rateable);
        this.$votes  = $('<div class="rateable-votes">' + NO_VALUE + '</div>') .appendTo($rateable);
        
        this.numStars = parseInt($rateable.attr('data-numstars'), 10);
        if ($.inArray(this.numStars, PERMISSABLE_NUM_STARS) === -1) {
            this.numStars =  PERMISSABLE_NUM_STARS[0];
        }
        
        this.$widget = $('<div class="rateable-widget"> </div>')
        .appendTo($rateable)
        .rateableWidget({
            src:      $rateable.attr('data-src') || false,
            altSrc:   $rateable.attr('data-altsrc') || false,
            starSize: $rateable.attr('data-starsize') || false,
            numStars: this.numStars,
            maxRating: MAX_RATING,
            change: $.proxy(this.change, this),
            submit: $.proxy(this.submit, this),
            locked: false
        });
        
        this.setOptions(options);
    }
    
    function numFormat (num) {
        return Math.round(num * 10) / 10;
    }
    
    function limitRating (rating) {
        return Math.max(1, Math.min(rating, MAX_RATING));
    }
    
    Rateable.prototype.setOptions = function (options) {
        var widget = this.$widget.data('widget');
        
        if (options.votes) {
            this.votes = Math.floor(options.votes);
        }
        this.$votes.html(this.votes || NO_VALUE);
        
        // this.rating is set indirectly by the widget which calls this object's change method
        if (options.rating) {
            widget.setRating(options.rating);
        } else {
            widget.resetRating();
        }
        
        this.avg = options.avg ? limitRating(options.avg) : this.avg;
        this.$avg.html(this.avg ? numFormat(this.avg * this.numStars / MAX_RATING) : NO_VALUE);
        this.$avg.html();
        
        if (options.locked) {
            widget.lock();
        }
        
        if ($.isFunction(options.change)) {
            this.changeCallbacks.add($.proxy(options.change, this.$rateable));
        }
        if ($.isFunction(options.submit)) {
            this.submitCallbacks.add($.proxy(options.submit, this.$rateable));
        }
    };
    
    Rateable.prototype.change = function(rating) {
        rating = rating && limitRating(Math.floor(rating));
        if (rating !== this.rating) {
            this.$rating.html(
                rating ?
                    numFormat(rating * this.numStars / MAX_RATING) :
                    NO_VALUE
            );
            this.rating = rating;
            this.changeCallbacks.fire(this.rating);
        }
    };
    
    Rateable.prototype.submit = function (rating) {
        this.change(rating);
        this.$votes.html((parseInt(this.$votes.html(), 10) || 0) + 1);
        this.submitCallbacks.fire(this.rating);
    };
    
    function rateable (data) {
        /*jshint validthis:true*/
        if (data === undefined) {
            data = {};
        } else if ($.isPlainObject(data)) {
            this.each(function () {
                var $rateable = $(this);
                if (!$rateable.data('rateable')) {
                    $rateable.data('rateable', new Rateable($rateable, data));
                } else {
                    $rateable.data('rateable').setOptions(data);
                }
            });
            return this;
        }
        throw new Error('Cannot process arguments');
    }
    
    return rateable;
}());

$.fn.rated = function (rating) {
    /*jshint validthis:true*/
    
    'use strict';
    
    var MAX_RATING = 10,
        PERMISSABLE_NUM_STARS = [5, 10],
        SYMBOL_MIN_SIZE = 15;
        
    rating = Math.max(0, Math.min(MAX_RATING, Math.round(rating)));
    
    if (!rating) return this;
    
    return this
    .each(function () {
        var $rated = $(this),
            numStars = parseInt($rated.attr('data-numstars'), 10),
            starSize = Math.max(
                SYMBOL_MIN_SIZE,
                (parseInt($rated.attr('data-starsize'), 10) || 0)
            ),
            title = rating;
            
        if ($.inArray(numStars, PERMISSABLE_NUM_STARS) === -1) {
            numStars =  PERMISSABLE_NUM_STARS[0];
        }
        
        if (numStars !== MAX_RATING) {
            title = Math.round(title * numStars / MAX_RATING * 10) / 10;
        }
        
        $rated
        .empty().addClass('rated')
        .css({
            position: 'relative',
            width: starSize * numStars + 'px',
            height: starSize + 'px'
        });
        
        $('<div class="rateable-widget"> </div>')
        .appendTo($rated)
        .rateableWidget({
            src:      $rated.attr('data-src') || false,
            altSrc:   $rated.attr('data-altsrc') || false,
            starSize: $rated.attr('data-starsize') || false,
            numStars: numStars,
            maxRating: MAX_RATING,
            change: false,
            submit: false,
            locked: true
        })
        .attr('title', title)
        .data('widget').setRating(rating);
    });
};

// the following is pure demo code and not part of the actual library
$(function () {
    
    'use strict';
    
    // load "Berkshire Swash" typeface and define .preset1
    $('head').append('<link href="http://fonts.googleapis.com/css?family=Berkshire+Swash" rel="stylesheet" type="text/css"><style type="text/css">.rateable.preset1{font-family:"Berkshire Swash",sans-serif;font-size:.95em;margin:0 auto}.rateable.preset1{background:url("//vignette3.wikia.nocookie.net/sonako/images/6/68/Star.svg.png") no-repeat-x scroll 0 10px transparent;display:block;height:60px;position:relative;width:160px}.rateable.preset1 .rateable-avg,.rateable.preset1 .rateable-rating,.rateable.preset1 .rateable-votes{display:block;position:absolute}.rateable.preset1 .rateable-avg{color:black;font-size:1.4em;left:5px;text-align:center;top:24px;width:40px}.rateable.preset1 .rateable-widget{display:block;left:55px;margin:0;position:absolute;top:21px}.rateable.preset1 .rateable-votes{bottom:-6px;font-size:1.2em;left:52px}.rateable.preset1 .rateable-votes:after{content:"votes";font-size:.8em;margin-left:.3em;position:relative;top:-0.25em}.rateable.preset1 .rateable-rating{font-size:1.4em;left:115px;top:-6px}.rateable.preset1 .rateable-rating:before{content:"your rating:";left:-70px;font-size:.75em;position:absolute;top:4px;width:70px}</style>');
    
    $('.rateable')
    .each(function () {
        $(this)
        .rateable({
            votes: 0,
            avg:   0,
            change: function (rating) {
                console.log('current value: ' + rating);
            },
            submit: function (rating) {
                console.log('final value: ' + rating);
            }
        });
    });
    
    $('.rated')
    .each(function () {
        $(this).rated(0);
    });
});
//</source>