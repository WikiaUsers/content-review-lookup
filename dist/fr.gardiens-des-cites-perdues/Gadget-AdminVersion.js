$(document).ready(function() {
    var specialGroups = ["bot-global", "staff", "soap", "helper", "wiki-representative", "wiki-specialist", "content-volunteer", "checkuser", "vanguard", "util"];
    var userGroups = mw.config.get('wgUserGroups');

    for (var i = 0; i < specialGroups.length; i++) {
        if (userGroups.indexOf(specialGroups[i]) !== -1) {
            // Mass editing should only be available to sysops and content moderators.
            return;
        }
    }

    // Import scripts
    importArticles({
        type: "script",
        articles: [
            'u:dev:MediaWiki:MassEdit.js',
            'u:dev:MediaWiki:CategoryQuickRemove'
        ]
    }, {
        type: "style",
        article: "MediaWiki:Administration.css"
    });
});