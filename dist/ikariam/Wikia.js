//
// Any JavaScript here will be loaded for all users using the Wikia skin on every page load
//
//
// Format for multiple scripts
//
// importArticles({
//  type: "script",
//  articles: [
//    "MediaWiki:Common.js",
//    "MediaWiki:FloatingToc/code.js"     // popout TOC. static as is used nearly all pages but portals, etc...
//    ]
// });
//
// Import the scripts located in MediaWiki:Common.js
//
 importArticle({
     type: "script",
     article: "MediaWiki:Common.js"     // Loads the MediaWiki:Common.js file
 });