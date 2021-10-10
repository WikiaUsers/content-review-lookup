/* This imports the latest version of sound from the Terraria Wiki. */

// Import CSS (before JS to prevent CSS flash): https://terraria.fandom.com/MediaWiki:Gadget-sound.css
$('head').first().append('<link rel="stylesheet" type="text/css" href="https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-sound.css&action=raw&ctype=text/css" />');

// Import JS: https://terraria.fandom.com/MediaWiki:Gadget-sound.js
mw.loader.load('https://terraria.fandom.com/index.php?title=MediaWiki:Gadget-sound.js&action=raw&ctype=text/javascript');