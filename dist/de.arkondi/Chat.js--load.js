if ( mw.config.get( 'wgCanonicalSpecialPageName' ) == 'Chat' ) {
  importArticles({
    type: 'script',
    articles: [
      'MediaWiki:Chat.js',
      'User:' + mw.config.get( 'wgUserName' ) + '/chat.js'
    ]
  });
  importArticles({
    type: 'style',
    articles: [
      'MediaWiki:Chat.css',
      'User:' + mw.config.get( 'wgUserName' ) + '/chat.css'
    ]
  });
}