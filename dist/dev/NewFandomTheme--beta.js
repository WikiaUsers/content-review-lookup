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
    
    mw.hook('dev.wds').add(function(wds){
        var GEAR = wds.icon('gear-tiny'), 
            MENU_CONTROL = wds.icon('menu-control-tiny', {
                'class': 'wds-bar-collapse'
            }), 
            DROPDOWN = wds.icon('dropdown-tiny', {
                'class': 'wds-dropdown__toggle-chevron'
            }),
            WIKIA_BAR = document.querySelector('#WikiaBar'),
            TAB_LABEL = document.createElement('div');
        
        TAB_LABEL.className = "wds-tabs__tab-label";
        var OVERFLOW_LIMIT = 0;
        
        
    });
 
    mw.hook('dev.colors').add(function(colors){
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
        /**
         * Wikia rail improvements
         **/
        // Rail module background
        THEMES[PREFIX + "rail-background"] = colors.parse(FANDOM.body).lighten(IS_BRIGHT ? -8 : 8).rgb();
        // Rail header accent
        THEMES[PREFIX + "rail-header-accent"] = toAlpha(colors.parse(FANDOM.body).lighten(IS_BRIGHT ? 8 : -8).rgb(), 0.15);
        // Rail module text
        THEMES[PREFIX + "rail-font-color"] = FANDOM.contrast;
        /**
         * Wikia toolbar improvements
         **/
        // TBA
        // Creating CSS variables
        var STYLE = Object.keys(THEMES).reduce(function(string, key){
            var value = THEMES[key];
            string = string.concat(key + ": " + value + "; \n");
            return string;
        }, ":root { \n");
 
        STYLE = STYLE.concat("}");
 
        $(document.body).append($(ENV).text(STYLE));
 
        importArticle({ type: 'style', article: 'u:dev:MediaWiki:NewFandomTheme/beta-theme.css' });
    });
 
    window.dev = Object.assign({}, window.dev);
    // Importing Colors for theming
    if (!("colors" in window.dev)) importArticle({ type: 'script', article: 'u:dev:MediaWiki:Colors/code.js' });
    // Importing WDSIcons for toolbar modification
    if (!("wds" in window.dev)) importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });
})(window, document, jQuery, mediaWiki);