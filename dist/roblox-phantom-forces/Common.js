 /************              WELCOME TO COMMON.JS                   ************/
/*               Maintained by Ivan Clemente and DuoDeca-S                   */

// FANDOM DEV IMPORT
importArticles({               
    type: "script",
    articles: [
        'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
        'u:dev:MediaWiki:AdminDashboard block/code.js',
        'u:dev:MediaWiki:MastheadRightsBadge.js',
    ]
});

// TEMPLATE:USERNAME
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

// BlockLog config
TBL_GROUP = "roblox-en";

// Message Wall and Forum User Tags

// Sysops and Bureaucrats, you may choose to have your own
// custom tag, just make sure that it properly describes
// your position of responsibility.
window.MessageWallUserTags = {
    tagColor: 'white',
    txtSize: '10px',
    glow: false,
    glowSize: '0px',
    glowColor: 'transparent',
    users: {
		// Wiki Founder
		'TaigaTheWikiaEditor': 'Wiki Founder',
		
		// Wiki Manager
		'Moviesign': 'Wiki Manager',
		
		// Wiki Bureaucrats
		'Ivan Clemente': 'Sysop',
		'DuoDeca-S': 'Sysop',
		'SundownMKII': 'Sysop',
		
		// Wiki Administrators
		'Aurified': 'Administrator',
		'Dinocamo': 'Administrator',
		'ScarL4life': 'Administrator',
		'PhantomForcesUser': 'Administrator',
		'M231 FPW': 'Administrator',
		'ForbiddenExceed': 'Administrator',
		
		// Wiki Moderators
		'Slow-ying': 'Moderator',
		
		// Developers
		'Litozinnamon': 'Developer',
		'Shaylan007': 'Developer',
		
		// Contributors
		'Glowydingus': 'Contributor',
		'FlamingSwifferDuster': 'Contributor',
		'Goofiershoes': 'Contributor',
		'Poodros': 'Contributor',
		'WolfDawgz': 'Contributor',
		'VictorReznov345': 'Contributor',
		'Destrukktoid': 'Contributor',
		
		// StyLiS Staff
		'Savaughn08': 'StyLiS Staff',
		'Spezi12': 'StyLiS Staff',
    }
};

// Prevents the default tags (e.g. Sysop, etc.) from being hidden when using ProfileTags.js
(window.dev = window.dev || {}).profileTags = { noHideTags: true };