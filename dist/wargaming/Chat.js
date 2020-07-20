importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WordFilter/code.js', ///Inital filter for chat
        'u:dev:MediaWiki:PingEveryone/code.js', ///pinging for announcments
        'u:dev:MediaWiki:IsTyping.js', ///More flexible way for responding
        'u:dev:MediaWiki:ChatBlockButton/code.2.js', ///quickblock
        'u:dev:MediaWiki:ChatLinkPreview.js', ///Further protect from phishing/scamming
        'u:dev:MediaWiki:!mods.js',///Quick mod ping if something is wrong with the chat
    ]
});

/* Insert new imports inside the importArticles brackets */

/* NOTE: All changes must be final before submitting the Javascript for review

/* Configuration of chat WordFilter. Excuse for the profanity here. */
window.WordFilter = $.extend(window.WordFilter, {
    alert: 'WARNING: You are posting a bad word detected by the filter!',
    badWords: ['Fuck','Bitch','Shit','Pussy','Phuck','Dick','Cunt','D!ck', 'Pu$$y','Fck','Fcking','B!tch','Faqing','Faq','Phap','Fap','Fapping','F@q','F@qing','F@pping','F@p','Sex','sex','fuck','bitch','shit','pussy','phuck','dick','cunt','d!ck','pu$$y','fap','fapping','f@p','f@pping','faqing','faq','Dammit','dammit','D@mmit',]
});

/* Configuration for @everyone ping */
window.pingEveryone = {
    modsOnly: true, // So only moderators can use the ping, false by default
    color: '#7289da', // The background color of the message that pinged everyone, default is yellow
    phrase: '@everyone', // The phrase to use that will ping everyone, default is @everyone
    audio: 'https://vignette.wikia.nocookie.net/wargaming/images/f/fa/SirYesSir%21.ogg/revision/latest?cb=20191005130232', // The URL for the audio used to ping everyone
    titleAlert: '@everyone! Check Chat for more information about the @everyone!', // The browser tab message that everyone not looking at the chat will see
};

/* IsTyping Config */
window.IsTyping = $.extend(window.IsTyping, {
    mainRoomDisabled: false,
    noStyle: true,
    filterSelf: false,
    ignore: ['WikiaBot', 'CCChatSentry']
});

/* Chat Block Config */
window.chatBlockReason = "Violation of Chat Rules (QuickBlock)";
window.chatBlockExpiry = "1 hour";

/* !mod */
window.ModPing = "https://vignette.wikia.nocookie.net/wargaming/images/e/e9/RadioBeep.ogg/revision/latest?cb=20191005131207";