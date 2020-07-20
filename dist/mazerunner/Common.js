//Spoiler alert config 
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};

/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

//lock old blogs config
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days.",
    nonexpiryCategory: "Never archived blogs"
};

//Usertags config
window.UserTagsJS = {
    modules: {},
    tags: {
        sysop: {
            link: 'Project:Administrators '
        },
        rollback: {
            u: 'Bagger'
        },
        bot: {
            link: 'Help:Bots'
        },
        bureaucrat: {
            u: 'Chair',
            link: 'Help:User_Acess_Levels#Bureaucrats'
        },
        Adminbot: {
            u: 'Administrative Bot'
        },
        RC: {
            u: 'Retired Chair'
        },
    }
};
UserTagsJS.modules.isblocked = true;

UserTagsJS.modules.mwGroups = ['bot', 'bot-global', 'rollback', 'bureaucrat', ];

UserTagsJS.modules.inactive = {
    days: 60,
    zeroIsInactive: true
};
UserTagsJS.modules.metafilter = {
    'rollback': ['sysop'],
};
UserTagsJS.modules.autoconfirmed = true;


UserTagsJS.modules.implode = {
    'Adminbot': ['sysop', 'bot'],
        'RC': ['bureaucrat', 'inactive'],
};

UserTagsJS.modules.nonuser = (mediaWiki.config.get('skin') === 'monobook');

//ajax rc config
window.ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions"];
//script imports

importArticles({
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js',
        'u:dev:FixWantedFiles/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:SpoilerAlert/code.js',
        'u:dev:LockForums/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:MisspelledPage/code.js',
        'u:dev:SignatureCheck/code.js'
    ]
});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

//RailWAM
window.railWAM = {
    logPage:"Project:WAM Log"
};
//End of RailWAM