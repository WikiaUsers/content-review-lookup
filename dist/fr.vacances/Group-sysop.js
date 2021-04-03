/* Le JavaScript inclus ici n’affectera que les administrateurs */
/* Tout ou partie de cette article est issu de la page [[MediaWiki:Group-sysop.js]] de Roblox Wikia. */
/* Any JavaScript here will be loaded for sysops only */
// <nowiki>
/* TopicBlockLog configuration */
TBL_GROUP = "roblox-en";
/* AbuseLogRC configuration */
abuseLogRC_entries = 6;
abuseLogRC_userInfo = true;
abuseLogRC_collapsible = true;
/* MessageBlock configuration */
var MessageBlock = {
  title :     'Blocked',
  message :   '{' + '{subst:#invoke:BlockMessages|main|reason=$1|expiry=$2}}',
  autocheck :  true
};
importArticles({
    type: "script",
    articles: [
        "u:dev:AbuseLogRC.js",
        "u:dev:MessageBlock/code.js"
    ]
});