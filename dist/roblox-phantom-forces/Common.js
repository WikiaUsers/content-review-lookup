 /************              WELCOME TO COMMON.JS                   ************/
/*               Maintained by Ivan Clemente and DuoDeca-S                   */

// FANDOM DEV IMPORT
// Note from Duo: I prefer to have the importArticle addons here as opposed to
// ImportJS for sake of organization
importArticles({               
    type: "script",
    articles: [
        "u:dev:ProfileTags/code.js",
        "u:dev:Countdown/code.js",
        'u:dev:TopEditors/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:AjaxBatchDelete/code.2.js',
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
		'Atvelonis': 'Wiki Manager',
		
		// Wiki Bureaucrats
		'Ivan Clemente': 'Bureaucrat',
		'DuoDeca-S': 'Bureaucrat',
		'SundownMKII': 'Bureaucrat',
		
		// Wiki Administrators
		'Aurified': 'Administrator',
		'Dinocamo': 'Administrator',
		'ScarL4life': 'Administrator',
		'PhantomForcesUser': 'Administrator',
		'M231 FPW': 'Administrator',
		'ForbiddenExceed': 'Administrator',
		
		// Wiki Moderators
		
		// Developers
		'Litozinnamon': 'Developer',
		'Shaylan007': 'Developer',
		
		// Contributors
		'Glowydingus': 'Contributor',
		'FlamingSwifferDuster': 'Contributor',
		'Goofiershoes': 'Contributor',
		'BiddinUp': 'Contributor',
		'Poodros': 'Contributor',
		
		// StyLiS Staff
		'Savaughn08': 'StyLiS Staff',
    }
};