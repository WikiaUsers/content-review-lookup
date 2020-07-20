importArticles( {
    type: 'script',
    articles: [
        'MediaWiki:Wikia.js/preload.js'        // Template preloads
    ]
});

// Randomize wiki logo: http://community.wikia.com/wiki/Thread:578801
$(function() {
    var images = [
        'https://vignette.wikia.nocookie.net/ben-10-the-new-omniverse/images/6/68/LogoGreen.png',
        'https://vignette.wikia.nocookie.net/ben-10-the-new-omniverse/images/d/de/LogoOrange.png',
        'https://vignette.wikia.nocookie.net/ben-10-the-new-omniverse/images/5/58/LogoRed.png',
        'https://vignette.wikia.nocookie.net/ben-10-the-new-omniverse/images/4/49/LogoPurple.png',
        'https://vignette.wikia.nocookie.net/ben-10-the-new-omniverse/images/7/76/LogoPink.png',
        'https://vignette.wikia.nocookie.net/ben-10-the-new-omniverse/images/2/23/LogoBlue.png',
        'https://vignette.wikia.nocookie.net/ben-10-the-new-omniverse/images/9/94/LogoYellow.png',
    ];
    $('h2.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});