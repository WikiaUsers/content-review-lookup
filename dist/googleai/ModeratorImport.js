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