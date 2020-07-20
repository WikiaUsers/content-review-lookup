/******************
 * New Chat Party Plugin
 * ---------------------
 * Original version created by ShermanTheMythran
 * New version created by Ultimate Dark Carnage
 ******************/

/******************
 * Importing required plugins
 * ----------------
 * + MediaWiki:KeyCode.js
 * + MediaWiki:UserAgent.js
 * + User:<user>/audio.js
 * + User:<user>/config.js
 * + User:<user>/skins.js
 ******************/

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:KeyCode.js',
        'MediaWiki:UserAgent.js',
        'User:' + wgUserName + '/audio.js',
        'User:' + wgUserName + '/config.js',
        'User:' + wgUserName + '/skins.js'
    ]
});

/*****************
 * Creating required objects
 * ---------------
 * + PartyMode
 * 
 *   type: object
 *   description: This is the primary object for the script. This object
 *     is necessary for the script to function properly. Do not remove this
 *     object, otherwise the script will fail to load.
 * 
 * + Disco
 * 
 *   type: object
 *   description: This is the parent container for the disco balls.
 * 
 * + Light
 * 
 *   type: function
 *   params:
 *     - color: [string] The color of the disco ball.
 *     - position: [string] The position of the disco ball (separated by spaces).
 *     - shadow: [boolean] Whether the ball has a shadow or not [optional].
 *   description: This object creates a new disco ball.
 * 
 * + Skin
 * 
 *   type: function
 *   params:
 *     - name: [string]
 *     - config: [object]
 * 
 * ---------------
 * TODO:
 * + Support for multiple languages
 ****************/

const PartyMode = {
    // DO NOT change below
    version: '1.0.0 alpha',
    browser: new UserAgentData(),
    name: 'Chat Party',
    author: 'Ultimate Dark Carnage',
    // You can change the settings below
    message: {
        trigger: {
            en: 'Party Mode'
        },
        loaded: {
            en: 'Chat Party' + ' ' + PartyMode.version + ' ' + 'loaded successfully.'
        },
        failed: {
            en: 'Chat Party' + ' ' + PartyMode.version + ' ' + 'failed to load. If you want to learn more, click <a href="/wiki/User:Ultimate_Dark_Carnage/ChatPartyFAQ">here</a>'
        },
        enabled: {
            en: 'Chat Party has been enabled.'
        },
        disabled: {
            en: 'Chat Party has been disabled.'
        }
    },
    selector: {
        main: '#ChatParty',
        disco: '#ChatParty #disco',
        music: '#ChatParty #music',
        ChatWindow: '.ChatWindow'
    },
    html: $('<section class="ChatParty" id="ChatParty" />')
};

var Disco = {
    orientation: 'right',
    speed: 'slow',
    loop_time: '500ms',
    active: false,
    options: {
        'white': {
        },
        'multicolored': {
        },
        'monochrome': {
        },
        'sepia': {
        },
        'off': {
            handler: Disco.toggle(false)
        }
    }
};