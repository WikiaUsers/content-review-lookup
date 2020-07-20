 /************              WELCOME TO COMMON.JS                   ************/
/*                Maintained by Ivan Clemente and Godonan                    */

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


// PARALLAX ANIMATION

// IVAN
$(window).scroll(function() {
    
    var wScroll = $(this).scrollTop();
    
    $('.para-content-profile').css({
        'transform': 'translate(0px, '+ wScroll /40 + '%)'
    });
    
    $('.para-content-profile2').css({
        'transform': 'translate(0px, -'+ wScroll /20 + '%)'
    });
    
    $('.grass').css({
        'transform': 'translate(0px, -'+ wScroll /16 + '%)'
    });
    
    $('.flowers').css({
        'transform': 'translate(0px, '+ wScroll /60 + '%)'
    });
    
    $('.balloons').css({
        'transform': 'translate(0px, -'+ wScroll /20 + '%)'
    });
});


// BlockLog config
TBL_GROUP = "roblox-en";


// Message Wall and Forum User Tags

//     Sysops and Bureaucrats, you may choose to have your own
// custom tag, just make sure that it properly describes
// your position of responsibility.
//     If 
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
		
		// Wiki Moderators
		'Gggy': 'Moderator',
		'EpixSnipexMLG360': 'Moderator',
		'Xylven': 'Moderator',
		'Youngtan': 'Moderator',
		'ForbiddenExceed': 'Moderator',
		
		// Developers
		'Litozinnamon': 'Developer',
		'Shaylan007': 'Developer',
		
		// Contributors
		'Glowydingus': 'Contributor',
		'FlamingSwifferDuster': 'Contributor',
		'Goofiershoes': 'Contributor',
		'BiddinUp': 'Contributor',
		
		// StyLiS Staff
		'RyanTheRobloxian': 'StyLiS Staff',
		'MiinhThePig': 'StyLiS Staff',
		'TruckerJj2': 'StyLiS Staff',
		'Lionehh': 'StyLiS Staff',
		'Savaughn08': 'StyLiS Staff',
    }
};