abuseLogRC_entries = 6;
abuseLogRC_userInfo = true;
abuseLogRC_collapsible = true;
abuseLogRC_showTo = ['content-moderator', 'sysop'];

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:AbuseLogRC.js"
    ]
});