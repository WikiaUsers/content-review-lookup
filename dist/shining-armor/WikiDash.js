var WikiDash = {};

WikiDash.isTarget = false;

WikiDash.loadResources = function(articles, callback) {
    if (typeof articles === 'object' && typeof callback === 'function') {
        var node = document.createElement('script'),
            uri  = '//' + window.location.origin.replace('http://', '').split('.')[0] + '.wikia.com/load.php?debug=false&mode=articles&articles=',
            scripts = '';
            
        for (var i = 0; i < articles.length; i++) {
            scripts = articles.join('|');
        }
        
        node.setAttribute('src', uri + scripts);
        node.onload = function() { callback(); };
        
        document.getElementsByTagName('head')[0].appendChild(node);
    }
};

WikiDash.loadModule = function(dir) {
    if (typeof dir === 'string') {
        this.loadResources([
            'MediaWiki:WikiDash.js/' + dir + '/ui.js',
            'MediaWiki:WikiDash.js/' + dir + '/function.js'
        ]);
    }
};

WikiDash.initialize = function() {
    if (mw.config.get('wgPageName') === 'WikiDash') {
        WikiDash.isTarget = true;
        
        var css = "\
            nav,\
            figure,\
            img,\
            button,\
            #globalNavigation,\
            #WikiaRail,\
            #catlinks,\
            #WikiaFooter,\
            #WikiaBar,\
            #WikiHeader,\
            #WikiaPageHeader,\
            .WikiaArticleFooter,\
            .wikia-gallery,\
            .wordmark {\
                display: none !important;\
            }\
            #WikiaMainContentContainer {\
                margin-right: 0px !important;\
                color: #000000;\
                opacity: none !important;\
            }\
            body,\
            #WikiaPageBackground,\
            #WikiaPage,\
            .WikiaPAge {\
                background-color: #FFFFFF !important;\
                border: none !important;\
            }";
            
        var node = document.createElement( 'style' );
            node.textContent = css;
            
        document.getElementsByTagName('head')[0].appendChild(node);
    }
};

document.getElementsByTagName('body')[0].onload = function() {
    WikiDash.initialize();
};