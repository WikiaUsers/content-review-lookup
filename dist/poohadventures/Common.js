/* Any JavaScript here will be loaded for all users on every page load. */

/* QuickDelete options */
// window.category = 'Delete Pages';
// window.reason = 'See: [[User:Love Robin|Love Robin]]';
// window.buttonText = 'Remove All';
 
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/profileRedesign.js',
//        'u:dev:QuickDelete/code.js'
    ]
});