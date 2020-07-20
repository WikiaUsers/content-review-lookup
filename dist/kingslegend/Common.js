/* Any JavaScript here will be loaded for all users on every page load. */(function ($, mw, store) {
    "use strict";
    var articles;
 
   /* if (store && store.getItem('commonjs')) {
        console.log('You have chosen to disable site-wide JavaScript in MediaWiki:Common.js. Please remove \'commonjs\' from localStorage to re-enable site-wide JavaScript.');
        return;
    }*/

    articles = ['MediaWiki:Common.js/SubNav.js', 'w:c:dev:UserTags/code.js'];
    // Use Wikia's importArticles() function to load JavaScript files
    window.importArticles({
        type: 'script',
        articles: articles
    });
    console.log('Site-wide JavaScript in MediaWiki:Common.js will load the following JavaScript files:', articles);
}(jQuery, mediaWiki, window.localStorage));