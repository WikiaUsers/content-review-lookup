window.MWUT = (function(window, $, mw){
    function val(){
        var args = [].slice.call(arguments),
            len = args.length, i = 0, v;
        while (typeof v === 'undefined' && i < len){
            v = args[i]; i++;
        }
        if (typeof v === 'undefined') return null;
        return v;
    }
    
    var config = $.extend({}, window.MWUTconfig);
    var MWUT = {
        loadCSS: val(config.loadCSS, false),
        loadI18n: val(config.loadI18n, false),
        namespaces: mw.config.get('wgFormattedNamespaces'),
        namespaceids: [3, 1200],
        users: $.extend({}, config.users),
        i18n: null,
        fallback: {
            tagColor: val(config.tagColor, 'red'),
            glow: val(config.glow, true),
            glowColor: val(config.glowColor, '#f77'),
            glowSize: val(config.glowSize, '20px'),
            txtSize: val(config.txtSize, '10px')
        },
        createSelector: function(){
            return this.namespaceids.map($.proxy(function(ns){
                var string = 'a.subtle[href=$="',
                    namespace = this.namespaces[ns].replace(/\s+/, '_');
                string += namespace + ':$1]';
                return string;
            }, this)).join(',');
        },
        addCSS: function(loadLocal){
            var source;
            if (typeof loadLocal === 'boolean' && loadLocal)
                source = 'MediaWiki:MessageWallUserTags.css';
            else
                source = 'u:carnage-test:MediaWiki:MessageWallUserTags.css';
            importArticle({ type: 'script', article: source });
        },
        addI18n: function(){
            mw.hook('dev.i18n').add($.proxy(function(i18no){
                $.when(i18no.loadMessages('MessageWallUserTags'))
                    .done($.proxy(function(i18n){
                        this.i18n = i18n;
                    }, this));
            }, this));
        },
        init: function(){
            Object.keys(this.users).forEach($.proxy(function(name){
                var value = this.users[name], $elem = [];
                if (Array.isArray(value)){
                    
                }
            }, this));
        }
    };
    return MWUT;
}(window, jQuery, mediaWiki));