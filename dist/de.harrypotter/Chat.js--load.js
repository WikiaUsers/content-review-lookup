if (wgPageName == "Special:Chat"){
    importScript('MediaWiki:Chat.js');
    importScript('User:'+wgUserName+'/chat.js');
    importStylesheet('MediaWiki:Chat.css');
    importStylesheet('User:'+wgUserName+'/chat.css');
}