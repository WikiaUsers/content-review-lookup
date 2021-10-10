/* This imports the latest version of selfHighlight from the Terraria Wiki. */

// Import CSS (before JS to prevent CSS flash): https://terraria.fandom.com/MediaWiki:Gadget-selfHighlight.css
$('head').first().append('<link rel="stylesheet" type="text/css" href="https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-selfHighlight.css&action=raw&ctype=text/css" />');

// Import JS: https://terraria.fandom.com/MediaWiki:Gadget-selfHighlight.js
mw.loader.load('https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-selfHighlight.js&action=raw&ctype=text/javascript');