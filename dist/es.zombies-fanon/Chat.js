importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BlinkingTabAlert.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Pings.js',
    ]
});
window.Pings = {
    maxRecentPings: 5,
    storage: {
        whitelist: true,
        notifications: true,
        casesensitive: true,
        'word-boundary': true,
        'audio-enabled': true,
        'inline-alerts': true,
        'highlight-ping': true,
        blacklist: '',
        audio: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
        pings: '',
        color: 'maroon',
    }
};

importArticles ( {
     type :  'script' ,
     artículos :  [ 
'u: dev: MediaWiki: EmoticonsWindow / code.js' 
,
 ] } ) ;
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FandomizedChat/code.2.js',
    ]
});