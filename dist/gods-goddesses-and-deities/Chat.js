window.WordFilter = $.extend(window.WordFilter, {
    alert: 'You are about to post a banned word. Continuing may result in being kicked or banned.',
    badWords: ['fuck', 'shit', 'damn',]
});
 
//FeatureRelated
importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatHacks.js',
        'u:dev:MediaWiki:IsTyping.js',
        'u:dev:MediaWiki:BlinkingTabAlert.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:ChatImages/code.js',
        'u:dev:MediaWiki:FixChatWhitespace.js',
        'u:dev:MediaWiki:ChatAwayButton/code.js',
    ]
} );