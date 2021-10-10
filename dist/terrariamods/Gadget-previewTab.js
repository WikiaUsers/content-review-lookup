/* This imports the latest version of previewTab from the Terraria Wiki. */

// Import CSS (before JS to prevent CSS flash): https://terraria.fandom.com/MediaWiki:Gadget-previewTab.css
$('head').first().append('<link rel="stylesheet" type="text/css" href="https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-previewTab.css&action=raw&ctype=text/css" />');

// Import JS: https://terraria.fandom.com/MediaWiki:Gadget-previewTab.js
mw.loader.load('https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-previewTab.js&action=raw&ctype=text/javascript');