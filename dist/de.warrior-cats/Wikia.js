importArticles({
    type: 'script',
    articles: [
        'u:dev:SocialIcons/code.js'
    ]
});

if(mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Discord-Server",
            id: "209616524703432704"
        }
    };
}

// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };