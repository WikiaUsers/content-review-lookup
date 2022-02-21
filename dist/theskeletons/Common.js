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