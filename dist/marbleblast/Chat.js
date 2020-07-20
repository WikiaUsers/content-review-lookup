importScriptPage('MediaWiki:ChatParty.js');

importStylesheetPage('User:ShermanTheMythran/chat.css','legomessageboards');

importScript('MediaWiki:Chat.js/options.js');

/* TODO: FIX SKINS Chat Skins - by Seaside98, Nxtstep101, and Edward_Nigma 
importScriptPage('MediaWiki:ChatSkins.js'); */

/* Chat room title */
$('head link[rel="shortcut icon"]').attr('href','https://images.wikia.nocookie.net/lcf119testinggrounds/images/d/d1/MBUMarbleDefault-Chat.png');$('head title').text('Marble Blast Wiki Chat');

/* ChatTags */
importScriptPage("ChatTags/code.js", "dev");