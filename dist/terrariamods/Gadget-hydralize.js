/* This imports the latest version of hydralize from the Terraria Wiki. */

// Import CSS (before JS to prevent CSS flash): https://terraria.fandom.com/MediaWiki:Gadget-hydralize.css
$('head').first().append('<link rel="stylesheet" type="text/css" href="https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-hydralize.css&action=raw&ctype=text/css" />');

// Import JS: https://terraria.fandom.com/MediaWiki:Gadget-hydralize.js
mw.loader.load('https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-hydralize.js&action=raw&ctype=text/javascript');