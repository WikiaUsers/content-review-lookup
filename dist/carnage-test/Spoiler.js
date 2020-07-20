window.Spoiler = (function(window, $, mw){
    var config = $.extend({}, window.SpoilerConfig);
    
    function has(){
        var args = [].slice.call(arguments),
            obj = args[0], key = args[1];
        return Object.prototype.hasOwnProperty.call(obj, key);
    }
 
    function val(){
        var args = [].slice.call(arguments),
            len = args.length, i = 0, v;
        while (typeof v === 'undefined' && i < len){
            v = args[i]; i++;
        }
        if (typeof v === 'undefined') return null;
        return v;
    }
    
    var Spoiler = {
        ignoreNS: val(config.ignoreNS, []),
        transparent: val(config.transparent, false),
        hover: val(config.hover, false),
        unselectable: val(config.unselectable, false),
        show: val(config.show, false),
        $elem: $('.spoiler-text'),
        init: function(){
            this.$elem.each($.proxy(this.createSpoiler, this));
        },
        createSpoiler: function(index, spoiler){
            var $spoiler = $(spoiler),
                textColor = $spoiler.css('color'),
                $wrapper = $('<div>').addClass('spoiler-bg').css({
                    'display': 'inline-block',
                    'background-color': textColor
                });
            if (this.hover){
                $wrapper.on({
                    'mouseenter': $.proxy(this.show, this),
                    'mouseleave': $.proxy(this.hide, this)
                });
            }
            
            if (this.unselectable){
                var obj = {};
                ['moz', 'webkit', 'ms', ''].forEach(function(prefix){
                    var prop = 'user-select';
                    if (prefix !== ''){
                        prop = '-' + prefix + '-' + prop;
                    }
                    obj[prop] = 'none';
                });
                $wrapper.css(obj);
            }
            
            if (this.transparent){
                $wrapper.css('background-color', 'transparent')
                    .children(spoiler)
            }
        }
    };
    
    return Spoiler;
}(window, jQuery, mediaWiki));