/* Any JavaScript here will be loaded for all users on every page load. */
dev:Countdown/code.js
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
var wiki_names = ["We're talking real dollars and cents here!" , "FUKOUNA GIRLS!" , "Just spillin' our guts!"];
var wiki_name_number = -1;
while (wiki_name_number < 0 || wiki_name_number > wiki_names.length) {
  wiki_name_number = Math.random().toFixed(2) * 100;
}
var elements = document.getElementsByClassName('fandom-community-header__community-name');
elements[0].textContent = wiki_names[wiki_name_number];
window.AddRailModule = [{prepend: true}];
/*Credit to Coding Help Wiki*/
// Automatic daily purge
(function DailyPurge(window, $, mw) {
    "use strict";
    /* Add pages to be purged every 1 hour directly below */
    const pagesList = [
        'Blog:Staff Blog Posts',
        'Special:Community',
        'Blog:Guide'
    ].map(function(string) {
        return string.replace(/ /g, '_');
    });
    if (!pagesList.includes(mw.config.get('wgPageName'))) return;
    mw.loader.using('mediawiki.api').then(function() {
        try {
            const lastPurgeTimestamp = mw.config.get('wgPageParseReport').cachereport.timestamp;
            const lastPurgeTimeParts = lastPurgeTimestamp.match(/(....)(..)(..)(..)(..)(..)/);
            const lastPurgeTime = new Date(Date.UTC(
                lastPurgeTimeParts[1],
                lastPurgeTimeParts[2] - 1,
                lastPurgeTimeParts[3],
                lastPurgeTimeParts[4],
                lastPurgeTimeParts[5],
                lastPurgeTimeParts[6]
            ));
            if (Date.now() - lastPurgeTime.valueOf() <= 60 * 1000) return;ci
        } catch (e) {
            return;
        }
        (new mw.Api()).post({
            action: 'purge',
            titles: mw.config.get('wgPageName')
        });
    });
})(window, jQuery, mediaWiki);

/*
*****
********** Admin/Moderator
*****
*/
// Only import these scripts for content mods and admins so we don't waste the
// bandwidth of users who can't actually use them.
if (mw.config.get("wgUserGroups").includes("content-moderator") || mw.config.get("wgUserGroups").includes("sysop")) {
    importArticles({
        type: "script",
        articles: [
            "u:dev:MediaWiki:AjaxBatchDelete.js",
            "u:dev:MediaWiki:MassEdit/code.js",
            "u:dev:MediaWiki:MassCategorization/code.js",
            "u:dev:MediaWiki:PowerDelete.js",
            "u:dev:MediaWiki:Stella.js",
            "u:dev:MediaWiki:DiscussionsRestoreAll.js",
            "u:dev:MediaWiki:AddAnnouncement/code.js",
            "u:dev:MediaWiki:DiscussionsAFLog.js",
            "u:dev:MediaWiki:PageRenameAuto-update/code.js",
            "u:dev:MediaWiki:AbuseLogRC.js",
            "u:dev:MediaWiki:MassBlock/code.js",
            "u:dev:MediaWiki:Nuke/code.js",
            "u:dev:MediaWiki:AjaxBatchDelete.js",
            "u:dev:MediaWiki:AjaxUndo/code.js",
            "u:dev:MediaWiki:AjaxDelete/code.js",
            "u:dev:MediaWiki:RedirectManagement/code.js",
            "u:dev:MediaWiki:RevisionDelete.js",
        ],
    });
}

// Discussions moderator and admin
if (mw.config.get("wgUserGroups").includes("discussions-moderator") || mw.config.get("wgUserGroups").includes("sysop")) {
    importArticles({
        type: "script",
        articles: [
            "u:dev:MediaWiki:DiscussionsDeleteAll/code.js",
        ],
    });
}

// Admin only
if (mw.config.get("wgUserGroups").includes("sysop")) {
    importArticles({
        type: "script",
        articles: [
            "u:dev:MediaWiki:AdminDashboard_block/code.js",
            "u:dev:MediaWiki:AdminDashboard_JS-Button/code.js",
            "u:dev:MediaWiki:MassProtect/code.js",
            "u:dev:MediaWiki:AddAnnouncement/code.js",
            "u:dev:MediaWiki:Reconstitution.js",
            "u:dev:MediaWiki:MessageBlock/code.js",
        ],
    });
}