/* Any JavaScript here will be loaded for all users on every page load. */

SpoilerAlert = {
  pages: ["Gotaya","Jayun"],
}

// ============================================================
//                       Imports
// ============================================================
// Check the original pages for more information.
// Most of these are found at
//    http://dev.wikia.com/wiki/List_of_JavaScript_enhancements
 
importArticles({
    type: 'script',
    articles: [
        "u:dev:EditConflictAlert/code.js",
        'w:c:dev:ReferencePopups/code.js',
        'w:dev:PurgeButton/code.js',
        "w:c:dev:SpoilerAlert/code.2.js"
    ]
});