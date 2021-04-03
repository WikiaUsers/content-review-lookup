window.RevealAnonIP = { permissions : ['user'] };

mw.loader.load('https://apis.google.com/js/platform.js');

importArticles({
  type: 'script',
  articles: [
    'u:dev:MediaWiki:Countdown/code.js',
    'u:dev:MediaWiki:DiscordIntegrator/code.js',
    'MediaWiki:OggPlayer.js',
    // 'u:dev:MediaWiki:BackToTopButton/code.js',
    // 'u:dev:MediaWiki:ReferencePopups/code.js',
    // 'u:dev:MediaWiki:ReferencePopups/code.configure.js',
    // 'u:dev:MediaWiki:ReferencePopups/custom.js',
    // 'u:dev:MediaWiki:RevealAnonIP/code.js',
  ]
});