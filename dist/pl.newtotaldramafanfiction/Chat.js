/* Chat Stuff */
window.kockaEmoticons = {
    vocab: {
        emoticons: "Emotikony",
        close: "Zamknij",
        help: "Wybierz emotikon z poniższej listy."
    },
};
$(function() {
    var ping = new Audio(window.ModPing || 'https://vignette.wikia.nocookie.net/najlepsze-fikcje-totalnej-porazki/images/a/ad/Ctf_mode.ogg/revision/latest?cb=20170125190842&path-prefix=pl');
    if(
        mw.config.get('wgCanonicalSpecialPageName') === 'Chat' &&
        window.mainRoom
    ) window.mainRoom.model.chats.bind('afteradd', function(data) {
        if(data && data.attributes && data.attributes.text && data.attributes.text.substr(0, 5) == '!hey')
            ping.play();
    });
});
$(function() {
    var ping = new Audio(window.ModPing || 'https://vignette.wikia.nocookie.net/najlepsze-fikcje-totalnej-porazki/images/b/ba/PING.ogg/revision/latest?cb=20160805153650&path-prefix=pl');
    if(
        mw.config.get('wgCanonicalSpecialPageName') === 'Chat' &&
        /(sysop|chatmoderator|helper|vstf|staff|threadmoderator)/.test(mw.config.get('wgUserGroups').join(' ')) &&
        window.mainRoom
    ) window.mainRoom.model.chats.bind('afteradd', function(data) {
        if(data && data.attributes && data.attributes.text && data.attributes.text.substr(0, 5) == '!mods')
            ping.play();
    });
});
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:ChatTags/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        "u:dev:MediaWiki:PrivateMessageAlert/code.js",
        'u:dev:NewMessageCount.js',
        "u:dev:IsTyping/code.js"
        // ...
    ]
} );

/* Chat Tags */
importScriptPage('MediaWiki:ChatTags/code.js','shining-armor');
importScriptPage('MediaWiki:ChatOptions/pl/code.js', 'dev');

/* Delay Chat */
window.dev = window.dev || {};
window.dev.chatdelay = {
	max: 10,
	mainOnly: false
};
importArticles({
	type: "script",
	articles: [
		"u:dev:ChatDelay/code.js",
	]
});
importScriptPage('ChatImages/code.js', 'dev');
/* Chat Announcements */
chatAnnouncementsAll = true;
importScriptPage('ChatAnnouncements/code.js','dev');
/* Mobile Send Button */
$(function () {
    'use strict';
 
    var $messageBox = $('.Write [name="message"]');
    var $sendButton = $('<span class="button">Wyślij</span>');
 
    $sendButton
        .css({
            position: 'relative',
            bottom: '3px',
            left: '75px'
        })
        .click(function () {
            $messageBox.trigger({
                type: 'keypress',
                which: 13
            });
        });
 
    $messageBox
        .css('width', 'calc(100% - 70px)')
        .after($sendButton);
 
});
/* Toggle Custom AFK Statuses */
window.ChatStatus = {
	statuses: {
		write: "Piszę odcinek",
		play: "Gram",
		toilet: "WC",
		homework: "Odrabiam lekcje",
		other: "ZW"
	},
	debug: false
};
importArticles({
	type: "script",
	articles: [
		"u:dev:MediaWiki:ChatStatus/code.js"
	]
});