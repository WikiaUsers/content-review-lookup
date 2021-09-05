// Import user group scripts (Mark Otaris)
var ug = mw.config.get("wgUserGroups").join(), group;

if      (/sysop/.test(ug))             group = "sysop";
else if (/content-moderator/.test(ug)) group = "content-moderator";

if (group)
    importScript("MediaWiki:Group-" + group + ".js");