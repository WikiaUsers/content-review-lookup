/* Any JavaScript here will be loaded for all users on every page load. */
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
$(document).ready(function () {
    if ($('#info-widgets').length) {
        importScriptPage('InfoWidgets/code.js', 'dev');
        window.widgetsLoaded = function () {
 
            np = Widgets.newPages();
            np.selector = '#new-pages';
            Widgets.add(np);
 
            rc = Widgets.recentChanges();
            rc.selector = '#recent-changes';
 
            Widgets.add(rc);
 
            Widgets.add({
                selector: '#new-files',
                type: 'api',
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'recentchanges',
                    rclimit: 20,
                    rcshow: '!redirect',
                    rcprop: 'title',
                    rcnamespace: 6
                }
            });
         }
    }
});
importScriptPage('MediaWiki:Translator/Translator.js', 'dev');
importScriptPage('MediaWiki:PowerPageMaker/code.js', 'dev');
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});
importScriptPage('MediaWiki:TabKeyInserter/code.js', 'dev');
importArticles({
    type: 'script',
    articles: [
        //... preceding scripts ...
        'u:dev:CustomGalleryButton.js',
        //... following scripts ...
    ]
});
importScriptPage('ClearSandbox/code.js', 'dev');
importScriptPage('MediaWiki:PowerPageMaker/code.js', 'dev');
importScriptPage('MediaWiki:AudioIntegrator/AudioIntegrator.js', 'dev');
importScriptPage('MediaWiki:ShareMenu/code.js', 'dev');
importScriptPage('MediaWiki:PlusOneButton/code.js', 'dev');
importScriptPage('User Rights Reasons Dropdown/code.js', 'dev');