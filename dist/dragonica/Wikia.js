//
// Any JavaScript here will be loaded for all users using the Wikia skin on every page load
//
//
// Format for multiple scripts
//
// importArticles({
//   type: "script",
//     articles: [
//       "MediaWiki:Common.js",
//       "MediaWiki:Common.js"
//     ]
// });
//
//
// Imports the scripts located in MediaWiki:Common.js
//
 
importArticle({
    type: "script",
    article: "MediaWiki:Common.js"
});