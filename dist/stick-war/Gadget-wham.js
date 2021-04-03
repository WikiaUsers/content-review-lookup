//##############################################################
/* ==WHAM configurations== */
window.WHAMBotMe = true;
window.WHAMBotReason = "Cleanup";
window.WHAMDelay = 100;
window.WHAMDeleteReason = "Cleanup";
window.WHAMBlockReason = "Vandalism and/or general disruption";

//##############################################################
/* ==importing WHAM script== */
// mwloader
mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.Uri', 'ext.fandom.ContentReview.legacyLoaders.js']).then(function() {
    if (window.dontWantRoleSpecificJS) {
        return;
    }
    
    // This function checks if the user belongs to any of the groups passed in
    function userBelongsToGroup() {
        var groups = Array.from(arguments);
        return wgUserGroups.some(function(g){ return groups.includes(g) });
    }
//Wham import
    if (userBelongsToGroup('sysop', 'bureaucrat')) {
        importArticles({
    	type: 'script',
    	    articles: [
                'u:dev:MediaWiki:WHAM/code.2.js',
            ]
        });
    }
});

// Originates from [[w:c:dev:WHAM]]