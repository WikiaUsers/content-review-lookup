window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: {u:'Editor of the Month'},
                rewrite: {u:'Volunteer', title:'This user is a volunteer' },
		featured: 'Featured',
		templates: 'Templates Guru',
                founder2: {u:'Founder', title:'This is the founder of MicroWiki, forever to be remembered.' },
                engin: {u:'Engineer', title:'This user experiments with the JS and CSS of MicroWiki and/or their own pages.' },
                inactivebureaucrat: {u:'Inactive Bureaucrat' },
                inactivesysop: {u:'Inactive Administrator' },
                mwstaff: {u:'MicroNations Fandom Staff', title:'This user is part of the MicroWiki Staff!', order:-1/0  },
                bot: {u:'Bot', title: 'This is a bot account with no special editing privileges.' },
                amazing: {u:'Honored Contributor', title:'This user is amazing and has been honored by the MicroWiki administration because they helped around the wiki and participated in several projects!'},
                veteran: {u:'Veteran', title:'This user was chosen to be a part of the veteran user group, comprising of the longest active contributors at MicroWiki.'},
                caretaker: {u:'Caretaker',}
	}
};

UserTagsJS.modules.implode = {
	'inactivebureaucrat': ['bureaucrat', 'inactive'],
	'inactivesysop': ['sysop', 'inactive'],
};

UserTagsJS.modules.custom = {
	'Monsterfurby': ['mwstaff', 'inactivesysop'],
    'Austenasia': ['mwstaff', 'veteran'],
    'Sabovia': ['mwstaff', 'veteran'],
    'LurkSAR': ['mwstaff', 'veteran'],
    'Eno of Laurencia': ['mwstaff'],
    'Suzukiano': ['mwstaff']
};

var messageWallUserTags = {
    'Monsterfurby': 'Founder',
};

window.LockForums = {
    expiryDays: 30,
    expiryMessage: "This thread had no responses in more than thirty days. It is considered archived.",
    warningDays: 10,
    warningMessage: "This thread had no responses for more than ten days. We advise you to not post any messages, unless absolutely necessary.",
    ignoreDeletes: false,
    banners: true,
    expiryBannerMessage: "<b>Note</b>: This topic has been unedited for <actualDays> days. It is considered archived—the discussion is over. If you feel this forum needs additional information, contact the MicroWiki Staff.",
    expiryBannerStyle: {'border': '2px solid #f66', 'background-color': 'whitesmoke', 'margin': '0.8em 0px', 'padding': '0.5em 12px', 'color': 'black'},
    warningBannerMessage: "<b>Note</b>: This topic has been unedited for <actualDays> days. It is considered archived - the discussion is over. Do not add to unless it really needs a response.",
    warningBannerStyle: {'border': '2px solid #f66', 'background-color': 'whitesmoke', 'margin': '0.8em 0px', 'padding': '0.5em 12px', 'color': 'black'},
    warningPopup: true,
    warningPopupMessage: "This forum has not had a response for over <actualDays> days; are you sure you want to reply?",
    boxHeight: 50,
    forumName: "MicroWiki Forum"
};
window.messageWallTagColor = 'red';
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Messages.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:SignatureCheck/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:SearchSuggest/code.js',
	'u:dev:DisplayClock/code.js',
	'MediaWiki:Logo.js',
        'MediaWiki:LastEdited.js',
        'u:dev:LockForums/code.js'
        //'u:dev:WikiaNotification/code.js'
    ]
});

//Sitenotice: the notion of prepending to $WikiaArticle came from [[User:Cåm]]
//$('#WikiaArticle').prepend('<div style="color:white;font-family:\'PT Sans\';padding:10px;border-bottom:2px solid:#29AB87;text-align:center;margin-left:auto;margin-right:auto;margin-bottom:20px;"><a href="http://micronations.wikia.com/wiki/MicroWiki:Save_the_Internet">Help MicroWiki Defend Net Neutrality!</a></span></div>');