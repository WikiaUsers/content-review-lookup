;(function(mw, $, toolbar){
    importArticles({
        type: 'script',
        articles: [
            'u:dev:Colors/code.js'
        ]
    });
    
    mw.hook('dev.colors').add(function(colors){
        $.ajax({
            method: 'GET',
            dataType: 'text',
            url: mw.util.wikiScript('index'),
            data: {
                title: 'MediaWiki:Toolbar.css',
                action: 'raw',
                format: 'text'
            }
        }).done(function(data){
            data = String(data);
            var _colors = {
                hover: (function(colors){
                    var bg = colors.wikia.menu,
                        parsed = colors.parse(bg),
                        res = colors.lighten(10);
                    return res.hex();
                })(colors),
                level_two: (function(colors){
                    var bg = colors.wikia.menu,
                        parsed = colors.parse(bg),
                        res = colors.lighten(-2);
                    return res.hex();
                })(colors)
            };
            colors.css(data, {
                'hover': _colors.hover,
                'level_two': _colors.level_two
            });
        }).fail(function(){
            throw new ReferenceError('Cannot fetch the toolbar\'s CSS. Try again later.');
        });
    });
    
    var config = $.extend(toolbar, {
        collapsed: true,
        limit: 10,
        extra_items: {},
        mw: mw.config.get([
                'wgPageName',
                'wgUserName',
                'wgUserGroups',
                'wgServer',
                'wgArticlePath',
                'wgAction',
                'wgUserLanguage',
                'skin'
            ])
    });
})(this.mediaWiki, this.jQuery, this.FandomToolbar);