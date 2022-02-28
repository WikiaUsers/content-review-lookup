/* Any JavaScript here will be loaded for all users on every loaded pages. */

// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

/* massBlockDelay */

importArticles({    
       type: 'script',    
       articles: [        
          'u:dev:MediaWiki:MassBlock/code.js',
       ]
});

/* Message Wall Greeting for all users */
importArticles({    
	type: 'script',    
	articles: [        
		'u:dev:MediaWiki:WallGreeting.js',    
		]
});

/* Custom Status */
window.UserStatusSettings = {
    colorBlindMode: 1,
    lightTheme: 1,
    statusIndicator: 0,
    online: '#43b581',
    away: '#faa61a',
    dnd: '#f04747',
    offline: '#747f8d',
};
// Prepare custom messages for NoLicenseWarning
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['NoLicenseWarning'] = window.dev.i18n.overrides['NoLicenseWarning'] || {};

// Add custom content instead of default messages
window.dev.i18n.overrides['NoLicenseWarning']['warning-text'] = 'Your custom warning message';
window.dev.i18n.overrides['NoLicenseWarning']['rejected-text'] = 'Your custom rejected message';
// Configuration for NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop',
        'threadmoderator',
        'content-moderator',
        'rollback'
    ]
};
/* Quiz */
window.quizName = "Quiz";
window.quizLang = "en";
window.resultsTextArray = [ 
    "Text displayed after the user completes the quiz with the LOWEST score",
    "Text displayed after the user completes the quiz somewhere between the lowest and highest scores. Feel free to add more than one of these (separated by commas and inside double quotes)",
    "Text displayed after the user completes the quiz with the HIGHEST score" 
];
window.questions = [
    ["Did you meet Small Skull and Angry Small Skull",
    "I meet them in The Skeletons and Larva Heroes",
    "I meet them sometimes",
    "Nah, i hate them",
    "They kill my BFF"], 

    ["Hey Boys and Girls, do you like Angry Small Skull",
    "Yes, i like him",
    "I like him formerly or temporarily",
    "I hate him"],

    ["Did Angry Little Mummy and his variations you will be nicer to him",
    "I will be very nice to Angry Little Mummy and his more male and female",
    "I ain't nice"]
];
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});