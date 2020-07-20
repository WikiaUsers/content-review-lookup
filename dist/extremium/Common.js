/* Any JavaScript here will be loaded for all users on every page load. */

window.massEditConfig = {
    editInterval: 1500
};

window.SpoilerAlertJS = {
    question: 'This area might cause spoilers from your wanted films to watch that you should not read this without watching your desired show, are you sure to read this?',
    yes: 'Yes',
    no: 'Nope',
    fadeDelay: 0
};

// This is the tags that 

window.MessageWallUserTags = {
    tagColor: 'red',
    txtSize: '10px',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'BlitzFIR3A1': 'Founder',
        'RhavenJames2': 'Admin',
    }
};

window.PrivateMessageAlert = $.extend(window.PrivateMessageAlert, {
    beepSound: 'https://soundbible.com/grab.php?id=1645&type=mp3',
//  beepSound: ['https://soundbible.com/grab.php?id=1645&type=mp3', 'https://soundbible.com/grab.php?id=1815&type=mp3'],
    message: '$1 has sent you some message!',
    notifications: true,
    alertWhileFocused: true,
    interval: 2000
});

window.IsTyping = $.extend(window.IsTyping, {
    mainRoomDisabled: true,
    ignore: ['WikiaBot', 'Dorumin']
});

// Importable...
// register hook before import to avoid race conditions
mw.hook('dev.wds').add(function(wds) {
    // wds is a shortcut to window.dev.wds
});

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Code.js',
        'MediaWiki:Wikia.js',
    ]
});

window.fdButtons = [
    {
        summary: 'Housekeeping',
        label: 'HK'
    },
    {
        summary: 'Vandalism',
        label: 'V'
    },
    {
        summary: 'Spam',
        label: 'S'
    }
];


// register the hook before the import to avoid race conditions
mw.hook('dev.highlight').add(function(hljs) {
    // hljs is a shortcut to window.dev.highlight
});
importArticle({ type: 'script', article: 'u:dev:MediaWiki:Highlight-js.js' });

window.BackToTopModern = true; // This is a modernization of the "BackToTopButton"
window.BackToTopSpeed = 300; // Scroll speed might be 300ms/1 page from buttom to top.
window.BackToTopStart = 1000; //Will appear the arrows

var ArrowNavigation = {
    noStyles: false, // Will add any style, disabled NoStyles
    selector: '#myhome-activityfeed > li, #mw-content-text #Wall .SpeechBubble'
};

window.AjaxThreadDeleteConfig = {
    fastDelete: false,
    reason: 'Deleting thread'
};

// The AddInsights ItemsToAdd
window.ItemsToAdd = [
  {
    'Name': 'Article stubs',
    'Page': 'Category:Article stubs',
    'Description': 'Article stubs that needs to be completed'
  }
];
window.AffectsSidebar = true;

/* I DON'T KNOW IF WE ARE ALLOWED TO ADD CODES BELOW THIS LINE */