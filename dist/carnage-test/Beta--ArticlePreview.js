/**
 * @title           ArticlePreview
 * @version         v2.0
 * @author          Ultimate Dark Carnage
 * @description     This script allows the viewer to see a preview of
 *                  an article by hovering a local link.
 * @changelog
 *                  - version v1.0.1 -
 *                  * Allows a user to create a new page if it does not
 *                    exist
 *                  - version v1.1 -
 *                  * Added support to default colors
 * @file            [[File:Image_Placeholder.png]]
 **/
(function(window, $, mw){
    var Loader, hasPromise;
    if (typeof window.Promise === 'function'){
        hasPromise = true;
        Loader = new Promise(function(resolve, reject){
            $(importArticles({
                type: 'script',
                articles: [
                    'u:dev:MediaWiki:I18n-js/code.js',
                    'u:dev:MediaWiki:Colors/code.js'
                ]
            }, {
                type: 'style',
                articles: [
                    'MediaWiki:ArticlePreview.css'
                ]
            })).on('load', function(){
                mw.loader.using([
                    'mediawiki.util', 'mediawiki.api', 'mediawiki.Title'
                ]).then(resolve);
            });
        });
    } else {
        hasPromise = false;
        Loader = $.Deferred(function(deferred){
            $(importArticles({
                type: 'script',
                articles: [
                    'u:dev:MediaWiki:I18n-js/code.js',
                    'u:dev:MediaWiki:Colors/code.js'
                ]
            }, {
                type: 'style',
                articles: [
                    'MediaWiki:ArticlePreview.css'
                ]
            })).on('load', 
                $.proxy(deferred.resolve, deferred)
            );
        });
    }
    
    (hasPromise ? Loader.then : $.when(
        Loader,
        mw.loader.using([
            'mediawiki.util', 'mediawiki.api', 'mediawiki.Title'
        ])
    ).done)(function(){
        var config = window.articlePreview;
        function ArticlePreview(){
            this.i18n = {};
            this.pos = { left: 0, top: 0 };
            this.articlePath = mw.config.get('wgArticlePath');
            this.page = mw.config.get('wgPageName');
            this.exceptions = ['.free', '.toc a', '.wikia-button', '.button', '.button a', '.wikia-menu-button a', '.wds-button', '.wds-button a', '.external', '.new'];
            this.isActive = false;
            this.throttling = null;
            this.version = 'v2.0';
        }
        
        ArticlePreview.prototype = {
            constructor: ArticlePreview,
            loadI18n: function(){
                mw.hook('dev.i18n')
            }
        };
    });
}(this, jQuery, mediaWiki));