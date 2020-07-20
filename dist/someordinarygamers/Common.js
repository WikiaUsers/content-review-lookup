/* Any JavaScript here will be loaded for all users on every page load. */
 
/* UserTags - http://dev.wikia.com/wiki/UserTags */
 
window.UserTagsJS = {
	modules: {},
	tags: {
		NUAhelper: { u: 'NUA', order: 1/0 }, // Appears last
                EmoteLordhelper: { u: 'Emote Lord', order: 2/0 }, // Appears last
                WorstAdminhelper: { u: 'Worst Admin!', order: 2/0}, //Appears last
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		bureaucrat: { order: 1 } // 0 is default order for all Wikia tags
	}
};
UserTagsJS.modules.custom = {
	'Link is a Master': ['NUAhelper'],  // Add New User Advisor
	'Sshakenbakee': ['NUAhelper'],      // Add New User Advisor
	'Refreshing Demise': ['NUAhelper'], // Add New User Advisor
	'CTstories': ['NUAhelper'],         // Add New User Advisor
	'CyberTheNerd': ['NUAhelper'],      // Add New User Advisor
	'FMGaming462': ['NUAhelper'],       // Add New User Advisor
    'Scarysamuel32': ['NUAhelper'],     // Add New User Advisor
    'Mr. Xenomorph321': ['NUAhelper'],   // Add New User Advisor
    'Creeper50': ['NUAhelper'],
        'TheCosmicDestroyer': ['EmoteLordhelper'],   // Add Emote Lord
        'Urkelbot666' : ['WorstAdminhelper']   // Add Worst Admin!
};
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Default wiki groups only 
                                              // Admin tag won't show unless 'sysop' is added            
 
/* End of UserTags */
 
/* Beginning of script importing */
 
importArticles({
    type: "script",
    articles: [
        'w:c:dev:BackToTopButton/code.js',  // Back-to-the-top Button
        'w:c:dev:AjaxBatchDelete/code.js',  // Batch Delete for Sysops
        'w:c:dev:UserTags/code.js',          // User Rights Tags
        'w:c:dev:Countdown/code.js',         // Countdown timer
        'u:dev:QuickDelete/code.js',         // Quick delete
    ]
});
 
/* End of script importing */
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of {{USERNAME}} replacement */