mw.hook('dev.ct').add(function(addButtons) {
    addButtons({
        icon: 'garbage', // This will be hidden using CSS
        link: 'https://translate.google.com/translate?sl=pl&tl=en&u=https://gwfanon.fandom.com/wiki/' + mw.config.get('wgPageName'),
        placement: 'page-tools-left',
        position: 1000,
        text: 'Translate into English',
        classes: ['translate-button'] // Add a unique class for the translate button
    });
});