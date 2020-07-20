/* Any JavaScript here will be loaded for all users on every page load. */

AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
importScriptPage('AjaxRC/code.js', 'dev');

/* LockForums */
window.LockForums = {
    expiryDays: 15,
    expiryMessage: "This thread is considered archived because it hasn't been commented on in over <expiryDays> days, please don't bump this thread!",
    forumName: "Forum" }
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

// Tags
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
        bot: {
           link: 'Special:Listusers/bot'
        },
        chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        patroller: {
            link: 'Special:ListUsers/patroller'
        },
        imagecontrol: {
    u: 'imagecontrol',
    link: 'Special:ListUsers/imagecontrol'
},
        rollback: {
            link: 'Special:ListUsers/rollback'
        },
        sysop: {
            link: 'Special:ListUsers/sysop'
        }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'sysop',
            'rollback',
            'patroller',
            'bot',
            'imagecontrol'
        ],
        newuser: true
    }
};


window.UserTagsJS = {
	modules: {},
	tags: {
                procrastinator: { u:'Procrastinator'},
                retired: {u:'Retired Bureaucrat'},
                bureaucrat: { u:'Bureaucrat'},
	}
};
 
UserTagsJS.modules.custom = {
        'HawluchaChamp12345678': ['retired'],
        'BurningEdje': ['founder', 'bureaucrat', 'sysop', 'procrastinator'],
        'HumanHashtag99': ['bureaucrat', 'sysop']
};

//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MassProtect/code.js',        //Mass protection.
        'u:dev:BackToTopButton/code.js',    //Back to top button.
        'u:dev:WallGreetingButton/code.js', //Message walls greetings. 
        'u:dev:UserTags/code.js',           //Customizes user tags.
        'u:dev:SignatureCheck/code.js',     //Talk pages vestige.
        'u:dev:ReferencePopups/code.js',    //Allowes to make very neat things :0
        'u:dev:PurgeButton/code.js',        //Refresh button.
        'u:dev:LockOldBlogs/code.js',       //Automatically locks old blogposts.
        'u:dev:FloatingToc/code.js',        //Makes the toc more mobile.
        'u:dev:LockForums/code.js',         //Automatically locks old forums. 
        'u:dev:Countdown/code.js'           //Countdowns.
    ]
});