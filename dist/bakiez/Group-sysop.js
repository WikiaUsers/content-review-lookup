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

/* AbuseLogRC configuration */
abuseLogRC_entries = 6;
abuseLogRC_userInfo = true;
abuseLogRC_collapsible = true;

importArticles({
	type: "script",
	articles: [
		"MediaWiki:NotabilityMove/code.js",
		"u:dev:MediaWiki:MessageBlock/code.js",
		"u:dev:MediaWiki:AbuseLogRC.js"
    ]
});