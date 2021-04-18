/* Content originally from roblox.fandom.com/wiki/MediaWiki:Group-sysop.js */
/* Any JavaScript here will be loaded for sysops only */
// <nowiki>

/* TopicBlockLog configuration */
TBL_GROUP = "roblox-en";

/* MessageBlock configuration */
var MessageBlock = {
  title :     'Blocked',
  message :   '{' + '{subst:#invoke:BlockMessages|main|reason=$1|expiry=$2}}',
  autocheck :  true
};


importArticles({
    type: "script",
    articles: [
        "MediaWiki:NotabilityMove/code.js",
        "u:dev:MediaWiki:MessageBlock/code.js"
    ]
});