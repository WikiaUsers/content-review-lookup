/* This imports the latest version of previewTab from Terraria: https://terraria.gamepedia.com/MediaWiki:Gadget-previewTab.css */
//import css before js to reduce CSS Flash
$('head').first().append('<link rel="stylesheet" type="text/css" href="https://terraria.gamepedia.com/index.php?title=MediaWiki:Gadget-previewTab.css&action=raw&ctype=text/css" />');
/* This imports the latest version of previewTab from Terraria: https://terraria.gamepedia.com/MediaWiki:Gadget-previewTab.js */
mw.loader.load('https://terraria.gamepedia.com/index.php?title=MediaWiki:Gadget-previewTab.js&action=raw&ctype=text/javascript');