if(mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Discord Server",
            id: "408020231290748938"
        }
    };
}
window.railWAM = {
    logPage:"Project:WAM Log"
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FileUsageAuto-update/code.js',
    ]
});