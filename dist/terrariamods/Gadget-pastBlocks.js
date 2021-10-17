/* This imports the latest version of pastBlocks from the Terraria Wiki. */

// Import CSS (before JS to prevent CSS flash): https://terraria.fandom.com/MediaWiki:Gadget-pastBlocks.css
$('head').first().append('<link rel="stylesheet" type="text/css" href="https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-pastBlocks.css&action=raw&ctype=text/css" />');

// Import JS: https://terraria.fandom.com/MediaWiki:Gadget-pastBlocks.js
mw.loader.load('https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-pastBlocks.js&action=raw&ctype=text/javascript');