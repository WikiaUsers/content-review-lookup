/* This imports the latest version of ipInfo from the Terraria Wiki. */

// Import CSS (before JS to prevent CSS flash): https://terraria.fandom.com/MediaWiki:Gadget-ipInfo.css
$('head').first().append('<link rel="stylesheet" type="text/css" href="https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-ipInfo.css&action=raw&ctype=text/css" />');

// Import JS: https://terraria.fandom.com/MediaWiki:Gadget-ipInfo.js
mw.loader.load('https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-ipInfo.js&action=raw&ctype=text/javascript');