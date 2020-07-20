window.ChatStatus = {
    statuses: {
        afk: "En guerra",
        edit: "Editando",
        food: "Comiendo",
        tv: "Descansando",
        game: "Gaming"
    },
    debug: false
};

$('.User').first().attr('data-user', mw.config.get('wgUserName'));
importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js',
        'u:dev:!kick/code.js',
        'u:dev:!mods.js',
        'u:dev:AjaxEmoticons.js',
        'u:dev:BlinkingTabAlert.js',
        'u:dev:ChatBlockButton/code.3.js',
        'u:dev:ChatSendButton.js',
        'u:dev:ChatStatus/code.js',
        'u:dev:CustomChatPings/code.js',
        'u:dev:EmoticonsWindow/code.js',
        'u:dev:ExtendedPrivateMessaging/code.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:IsTyping/code.js',
        'u:shining-armor:ChatTags/code.js',
        'u:dev:ChatBlockButton/code.2.js',
    ]
});

window.chatBanMessage = {
    title: 'Chat Ban', // The title of the message
    body: 'Has sido bloqueado del chat. El bloqueo expirará en $1, y la razón de tu ban es $2' 
};