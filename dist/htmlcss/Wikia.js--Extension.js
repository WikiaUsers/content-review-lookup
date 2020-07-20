window.Extension = typeof window.Extension !== 'undefined' ? window.Extension : {};

Extension._import = function _import(){
    var _s = {
        scripts: [],
        styles: []
    };
    
    if (arguments.length){
        for (let i = 0; i < arguments.length; i++){
            var _s_ = arguments[i];
            if (_s_.type == 'script')
                _s.scripts.push(_s_.article);
            else if (_s_.type == 'style')
                _s.styles.push(_s_.article);
        }
    }
    
    importArticles({
        type: 'script',
        articles: _s.scripts
    }, {
        type: 'style',
        articles: _s.styles
    });
};

Extension._import(
    {
        type: 'script',
        article: 'MediaWiki:Wikia.js/ExtensionUI.js'
    },
    {
        type: 'style',
        artlcle: 'MediaWiki:ExtensionUI.css'
    }
);