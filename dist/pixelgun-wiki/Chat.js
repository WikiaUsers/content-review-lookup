importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatHacks.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatSendButton.js',
        'u:dev:ChatImages/code.js',
        'u:dev:EscapeEmoticons/code.js',
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:dev:FandomizedChat/code.js',
        'u:dev:MediaWiki:FaviconNotifier/code.js',
        "u:dev:IsTyping/code.js",
    ]
});

alertMessage = 'MESSAGETOSHOWWHENBADWORDFOUND';
window.badWords = ['asshole',	'arsehole',	'asshat',	'asslicker',	'bastard',	'bitch',	'bitchass',	'bitchy',	'bitching',	'blowjob',	'bellend',	'brotherfucker',	'bullshit',	'boobs',	'buttfucker',	'ballsack',	'camel toe',	'clit', 'cock',	'cocksucker',	'cockshit',	'cum',	'cunt',	'cuntfucker',	'dickbag',	'douche',	'douchebag',	'dickhole',	'dipshit',	'dumbass',	'dumbfuck',	'dumbshit',	'faggit',	'faggot',	'fuck',	'fuckass',	'fucked',	'fucker',	'fuck you',	'fuck off',	'fuckhead',	'fucking',	'fucktard',	'fap',	'fapping',	'goddamn',	'gook',	'handjob',	'homo',	'humping',	'hore',	'jackass',	'jerk off',	'mcfagget',	'mothafucka',	'motherfucker',	'motherfucking',	'masturbate',	'masturbating',	'nigger',	'nigga',	'negro',	'niglet',	'nutsack',	'penis',	'penisfucker',	'penis fucker',	'pussy',	'pussyfucker',	'pussyfucking',	'pussycreaming',	'pussylicking',	'puto',	'puta',	'queer',	'sand nigger',	'sandnigger',	'pussy fucking',	'shit',	'shitbag',	'shitbagger',	'shitting',	'shitty','shit eater',	'shitface',	'shithead',	'shittier',	'shittiest',	'slut',	'slutbag',	'saggytitties',	'turd',	'titties',	'twat',	'vag',	'vagina',	'wank',	'whore']; // add bad words to pre-generated list
importScriptPage('WordFilter/code.js','dev');
importScriptPage('MediaWiki:FixAdminKick/code.js','dev');

var customMessage = {
    message: '$1 New Messages!'
};