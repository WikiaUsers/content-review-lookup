// Imports
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ReferencePopups/code.js',
//        'w:c:dev:LockOldBlogs/code.js',
        'u:dev:MiniComplete/code.js',
        'MediaWiki:Common.js/standardeditsummaries.js'
    ]
});
// -end- Imports

// Spoiler Alert
SpoilerAlert = {
    question: 'WARNING! This page contains MAJOR spoilers from recently released material.<br />Are you sure you wish to proceed to the page?.',
    yes: 'Yes, please',
    no: 'No, not yet',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilery');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
 
// - end -  Spoiler Alert