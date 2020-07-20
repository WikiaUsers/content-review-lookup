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
importScriptPage("ChatNotifications/code.js", "dev");