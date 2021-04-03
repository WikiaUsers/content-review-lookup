/* Any JavaScript here will be loaded for sysops only */

/* MessageBlock configuration */
var MessageBlock = {
  title :     'Blocked',
  message :   '{' + '{subst:#invoke:BlockMessages|main|reason=$1|expiry=$2}}',
  autocheck :  true
};


importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:MessageBlock/code.js"
    ]
});