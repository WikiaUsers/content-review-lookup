(function(mw, $, mainRoom, factory){
    if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat'){
        $.when($.getScript('//dev.wikia.com/index.php?title=MediaWiki:Colors/code.js&action=raw&ctype=text/javascript'))
            .done(function(data){
                mw.hook('dev.colors').add(function(colors){
                    factory(mw, $, mainRoom, colors);
                });
            });
    }
}(this.mediaWiki, this.jQuery, function(mw, $, mainRoom, colors){
    var themes = {};
    
    themes.CSS = function(string, options){
        $.extend(this, {
            text: string,
            hasVariables: /\$([a-z][\w\-]*)/gi.test(string),
            colors: colors.wikia,
            wikiaColors: colors.wikia,
            cssColors: null
        }, options || {});
        this.getColors();
        return this;
    };
    
    themes.CSS.prototype.darkenToHex = function(color, n){
        var parsed = colors.parse(color);
        if (!isNaN(n)){
            n = Number(n);
            if (n > 1){
                n = n % 1;
            }
            n = n * 100;
        }
        return parsed.lighten(-Math.abs(n)).hex();
    };
    
    themes.CSS.prototype.lightenToHex = function(color, n){
        var parsed = colors.parse(color);
        if (!isNaN(n)){
            n = Number(n);
            if (n > 1){
                n = n % 1;
            }
            n = n * 100;
        }
        return parsed.lighten(Math.abs(n)).hex();
    };
    
    themes.CSS.prototype.getColors = function(){
        var colors = this.colors,
            _colors = {
                self: this.darkenToHex(this.colors.nav, 0.5),
                selftext: this.lightenToHex(this.colors.nav, 0.8),
                rail: this.lightenToHex(this.colors.page, 0.2),
                user: this.lightenToHex(this.colors.nav, 0.2),
                chatheader: this.darkenToHex(this.colors.nav, 0.1)
            };
        $.extend(this.colors, _colors);
        this.cssColors = _colors;
    };
    
    themes.CSS.prototype.parse = themes.CSS.prototype.add = function(){
        colors.css(this.text, this.cssColors);
    };
    
    themes.init = function(){
        var cssText =
                '.ChatHeader {\
                    background-color: $chatheader; \
                } \
                .Rail {\
                    background-color: $rail; \
                } \
                .Rail .User {\
                    color: $header-text; \
                } \
                .Rail .User.self {\
                    background-color: $self; \
                    color: $selftext; \
                } \
                .Rail .User:hover { \
                    background-color: $user; \
                    color: $page; \
                } \
                #list-arrow-down, \
                #list-arrow-up, \
                #toggleChatList { \
                    color: $header-text; \
                }',
            FandomizedChatCSS = new themes.CSS(cssText);
        FandomizedChatCSS.add();
        mw.hook('FandomizedChat.themes.loaded').fire(themes);
    };
    
    $(themes.init);
    window.FandomizedChatThemes = themes;
}));