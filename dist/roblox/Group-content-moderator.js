/* AbuseLogRC configuration */
abuseLogRC_entries = 6;
abuseLogRC_userInfo = true;
abuseLogRC_collapsible = true;
abuseLogRC_showTo = ['content-moderator'];

importArticles({
    type: "script",
    articles: [
        "MediaWiki:NotabilityMove/code.js",
        "u:dev:MediaWiki:AbuseLogRC.js"
    ]
});