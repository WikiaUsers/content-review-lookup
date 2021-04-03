var chatags = { images: true, videos: true };

var tWordStorage= {en: ['scripts', 'lua', 'developers', 'wikia', 'lifestyle', 'entertainment', 'games', 'java', 'jedi']};

window.chatTimestamps24Hour = true;

window.chatTimestampsNoAPM = true;

window.ClassicModIcons = true;

window.ChatStatus = {
	statuses: {
		afk: "Away From Keyboard",
		edit: "Editing Pages",
		food: "Eating Food",
		tv: "Watching TV",
		game: "Playing Games"
	},
	debug: flase
};

window.FaviconNotifier = $.extend(window.FaviconNotifier, {
    circleColor: 'red',
    textColor: '#ffffff',
    includeInlineAlerts: true,
    countMainMessages: true,
    ignoreMainMessages: false
});

window.IsTyping = $.extend(window.IsTyping, {
    privateRoomDisabled: true,
    ignore: ['FANDOM', 'R9H9']
});

$.extend(window, {
    backgroundColor: '#2c343d',
    textColor: '#d5d4d4',
    foregroundColor: '#39424d',
    selfTextColor: '#414954',
    linkColor: '#00c8e0',
    userStatsColor: '#2e5d6a',
});

window.ChatThemes = {
    themes: [
            light = {
                name: 'Light',
                class: 'light'
            },
            dark = {
                name: 'Dark',
                class: 'dark'
            }
    ]
}

window.PrivateMessageAlert = $.extend(window.PrivateMessageAlert, {
    beepSound:  ['https://soundbible.com/grab.php?id=1645&type=mp3', 'https://soundbible.com/grab.php?id=1815&type=mp3'],
    message: '$1 sent you a message!',
    notifications: true,
    alertWhileFocused: false,
    interval: 2000
});

window.Pings = {
    maxRecentPings: 5,
    storage: {
        whitelist: false,
        notifications: false,
        casesensitive: false,
        'word-boundary': false,
        'audio-enabled': false,
        'inline-alerts': false,
        'highlight-ping': false,
        blacklist: '',
        audio: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
        pings: '',
        color: 'red',
    }
};

window.pingEveryone = {
    modsOnly: false,
    color: 'yellow',
    phrase: '@everyone',
    audio: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
    titleAlert: 'Alert!!!',
};

window.WordFilter = $.extend(window.WordFilter, {
    alert: 'An inappropiate word was found',
    badWords: ['f**k', 's**t']
});