/* Any JavaScript here will be loaded for all users on every page load. */


//Personal scripts. 
//youtube - Adds a viewable video to a page.
//frame - Adds a rotatable 3D model to a page. 
//tooltip - Adds hoverable information to Objects.

var scripts = [
    'MediaWiki:Common.js/youtube.js',
    'MediaWiki:Common.js/frame.js',
    'MediaWiki:Common.js/tooltip.js',
    'u:dev:MediaWiki:Tooltips.js',
];


importArticles({
    type: 'script',
    articles: scripts
});