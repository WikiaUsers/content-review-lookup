/* HoverEditCount
 *
 * Loads the edit count by hovering over the tally in the user masthead.
 * @scope any
 * @author Dorumin
 */

(function() {
    if (!$ || !mw || !$('.tally').length || window.HoverEditCountInit) return;
    window.HoverEditCountInit = true;
    var obj = {
        css:'.editCount {               \
                z-index: 100;           \
                position: absolute;     \
            }                           \
            .ecrowcenter {              \
                text-align: center;     \
            }                           \
            .ecrowright {               \
                text-align: right;      \
            }                           \
            .TablePager,                \
            .TablePager td,             \
            .TablePager th {            \
                padding: 0.20em 0.15em; \
            }',
        x: 0,
        y: 0,
        t: 0, // For the timeout, not for placing the div.
        html: false,
        wait: false,
        elem: false,
        name: $('[itemprop="name"]').text(),
        $div: $('<div class="editCount" />'),
        $tally: $('.tally'),
        preload: window.preloadEditCount || false,
        delay: window.hoverEditCountDelay || 300,
        addDiv: function() {
            $('.editCount').remove();
            this.$div.css({
                top: this.y,
                left: this.x
            })
            .html(this.html)
            .appendTo(document.body);
        },
        isHover: function(el) {
            return Boolean($(el).closest('.tally, .editCount').length);
        },
        getEdits: function() {
            var that = this;
            if (that.html) return;
            $.get(mw.util.getUrl('Special:EditCount/' + that.name), function(d) {
                that.html = $(d).find('.TablePager').parent().html();
                if ( that.wait && that.isHover(that.elem) ) 
                    that.addDiv();
            });
        },
        hover: function() {
            var that = this;
            if ($('.editCount').length) return;
            that.getEdits();
            that.t = setTimeout(function() {
                if (!that.html) that.wait = true;
                else if (that.isHover(that.elem))
                    that.addDiv();
            }, that.delay);
        },
        unhover: function() {
            var that = this;
            setTimeout(function() {
               if (that.isHover(that.elem)) {
                   that.$div.hover($.noop, that.unhover.bind(that));
               } else {
                   that.$div.remove();
                   clearTimeout(that.t);
               }
            }, 100);
        },
        init: function() {
            var that = this;
            mw.util.addCSS(that.css);
            $(document).mousemove(function(e) {
                that.x    = e.pageX;
                that.y    = e.pageY;
                that.elem = e.target;
            });
            if (that.preload)
                that.getEdits();
            that.$tally.hover(that.hover.bind(that), that.unhover.bind(that));
        }
    };
    obj.init();
})();