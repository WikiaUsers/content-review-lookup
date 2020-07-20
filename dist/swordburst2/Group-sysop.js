/* Any JavaScript here will be loaded for sysops only */

TBL_GROUP = "roblox-en";
 
// MessageBlock
var MessageBlock = {
    title : 'Blocked',
    message : '{'+'{subst:#invoke:BlockMessages|main|reason=$1|expiry=$2}'+'}'
};
 
importArticles({
    type: "script",
    articles: ["u:dev:MessageBlock/code.js", "u:dev:TopicBlockLog/code.js"]
});