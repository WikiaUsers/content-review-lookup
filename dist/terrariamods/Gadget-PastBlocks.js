/* This imports the latest version of PastBlocks from the Terraria Wiki. */

// Import CSS (before JS to prevent CSS flash): https://terraria.fandom.com/MediaWiki:Gadget-PastBlocks.css
$('head').first().append('<link rel="stylesheet" type="text/css" href="https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-PastBlocks.css&action=raw&ctype=text/css" />');

// Import JS: https://terraria.fandom.com/MediaWiki:Gadget-PastBlocks.js
mw.loader.load('https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-PastBlocks.js&action=raw&ctype=text/javascript');