/* Any JavaScript here will be loaded for all users on every page load. */
TBL_GROUP = "roblox-en";

// RailWAM configuration
window.railWAM = {
    logPage:"Project:WAM Log"
};

// Configuration for Mass Managament Tools
window.MassCategorizationGroups = ['sysop', 'content-moderator'];
window.MassRedirectGroups = ['sysop', 'content-moderator'];
window.MassRenameGroups = ['sysop', 'content-moderator'];
window.MassRenameRevertGroups = ['sysop', 'content-moderator'];


importArticles({
     type: 'script',
     articles: [
        'MediaWiki:Common.js/StatCalculator.js',
        'MediaWiki:Common.js/ExpYieldCalculator.js',
        'MediaWiki:Common.js/TypePlayer.js'
    ]
});