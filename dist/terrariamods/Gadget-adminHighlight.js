/* This imports the latest version of adminHighlight from the Terraria Wiki. */

// Import CSS (before JS to prevent CSS flash): https://terraria.fandom.com/MediaWiki:Gadget-adminHighlight.css
$('head').first().append('<link rel="stylesheet" type="text/css" href="https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-adminHighlight.css&action=raw&ctype=text/css" />');

// Import JS: https://terraria.fandom.com/MediaWiki:Gadget-adminHighlight.js
mw.loader.load('https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-adminHighlight.js&action=raw&ctype=text/javascript');