/* Any JavaScript here will be loaded for content-moderators only */
 
/* AbuseLogRC configuration */
abuseLogRC_entries = 6;
abuseLogRC_userInfo = true;
abuseLogRC_collapsible = true;
 
importArticles({
    type: "script",
    articles: [
        "MediaWiki:NotabilityMove/code.js",
        "u:dev:AbuseLogRC.js"
    ]
});