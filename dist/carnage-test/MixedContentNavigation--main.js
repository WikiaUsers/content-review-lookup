(function(mw, $){
    var MCN = $.extend({}, window.MCN);
    
    MCN.types = $.extend({
        'slideshow': '.mcn-slideshow',
        'menu': '.mcn-menu',
        'portal': '.mcn-portal',
        'search': '.mcn-search'
    }, MCN.types);
    
    MCN.getType = function($elem){
        if (!$elem.parent().is('.mixed-content-navigation')){
            return '';
        } else {
            var k = Object.keys(this.types),
                type = '';
            for (var i = 0, len = k.length; i < len; i++){
                var name = k[i],
                    selector = this.types[name];
                if ($elem.is(selector)){
                    type = name;
                    break;
                }
            }
            return type;
        }
    };
    
    MCN.generate = function($elem, fn){
        var type = this.getType($elem);
        if (type !== ''){
            if (typeof fn === 'function'){
                fn.apply(this, [$elem, type]);
            }
        }
    };
    
    MCN.create = function(type, $elem){
        var _MCN = new MCN[type]($elem);
        if (_MCN.element === null) return '';
        return _MCN.createElement();
    };
    
    window.MCN = MCN;
}(mediaWiki, jQuery));