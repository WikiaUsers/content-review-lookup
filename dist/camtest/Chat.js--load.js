importScriptURI('/load.php?debug=true&lang=en&mode=articles&skin=oasis&articles=u:rs:MediaWiki:Chat.js|u:rs:User:'+mw.config.get('wgUserName')+'/chat.js|u:c:User:'+mw.config.get('wgUserName')+'/chat-global.js&only=scripts');

importStylesheetURI('/load.php?debug=true&lang=en&mode=articles&skin=oasis&articles=u:rs:MediaWiki:Chat.css|u:rs:User:'+mw.config.get('wgUserName')+'/chat.css|u:c:User:'+mw.config.get('wgUserName')+'/chat-global.css&only=styles');

var onNewMessage = [], onStatusMessage = [];