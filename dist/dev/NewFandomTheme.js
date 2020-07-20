/**
 * @title               NewFandomTheme
 * @version             v1.0
 * @author              Ultimate Dark Carnage
 * @description         Creates a theme similar to Feeds
 **/ 
(function(window, document, $, mw){
    "use strict";
    var ENV = document.createElement('style');
    ENV.setAttribute('id', 'fandom-theme__style');
    
    mw.hook('dev.colors').add(function(colors){
        // Fandom theme fixes
        var FANDOM = colors.wikia, PREFIX = '--fandom-', THEMES = new Proxy({}, Object.freeze({
            get: function getter(object, property){
                return property in object ? object[property] : null;
            }
        })), IS_BRIGHT = colors.parse(FANDOM.body).isBright();
        // The Colors script currently does not support alpha
        function toAlpha(rgb, a){
            if (a < 0 || a > 1 || isNaN(a)) return rgb;
            var RGB_PATTERN = /rgb\((.*)\)/g;
            
            var RGB = RGB_PATTERN.exec(rgb)[1] || "";
            if (RGB === "") return rgb;
            
            var RGB_TUPLE = RGB.split(/,\s?/g);
            if (RGB_TUPLE.length !== 3) return rgb;
            
            var rgba = 'rgba(' + RGB_TUPLE.join(', ') + ', ' + Number(a) + ')';
            return rgba;
        }
        // Rail module background
        THEMES[PREFIX + "rail-background"] = colors.parse(FANDOM.border).lighten(IS_BRIGHT ? 7 : -7).rgb();
        // Rail header accent
        THEMES[PREFIX + "rail-header-accent"] = toAlpha(colors.parse(FANDOM.menu).lighten(IS_BRIGHT ? -12 : 12).rgb(), 0.15);
        // Rail module text
        THEMES[PREFIX + "rail-font-color"] = FANDOM.text;
        
        var STYLE = Object.keys(THEMES).reduce(function(string, key){
            var value = THEMES[key];
            string = string.concat(key + ": " + value + "; \n");
            return string;
        }, ":root { \n");
        
        STYLE = STYLE.concat("}");
        
        $(document.body).append($(ENV).text(STYLE));
        
        importArticle({ type: 'style', article: 'u:dev:MediaWiki:NewFandomTheme/theme.css' });
        
        // Adding the 'wds-has-shadow' class to the nav
        $('.wds-community-header > .wds-community-header__local-navigation .wds-tabs__tab').each(function(index, elem){
            var $nav__item = $(elem), $dropdown = $nav__item.find('.wds-dropdown');
            if ($dropdown) $dropdown.addClass('wds-has-shadow');
        });
    });
    
    window.dev = Object.assign({}, window.dev);
    if (!("colors" in window.dev)) importArticle({ type: 'script', article: 'u:dev:MediaWiki:Colors/code.js' });
})(window, document, jQuery, mediaWiki);