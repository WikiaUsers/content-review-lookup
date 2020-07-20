var sfNotifications = {};
    sfNotifications.options = {
        audio: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
        caseInsensitive: true,
        highlight: true,
        highlightColor: 'red',
        notification: true,
        ping: true,
        pings: ["Foo", "Bar", "Baz"],
        regex: false,
        window: false
    };
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatTags/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:!mods/code.js',
        'u:dev:ChatNotifications/code.js'
    ]
});