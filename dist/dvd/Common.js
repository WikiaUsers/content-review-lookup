/* Any JavaScript here will be loaded for all users on every page load. */

if(mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Discord Server",
            id: "220223330081308674"
        }
    };
}

AnswersHistoryButtonText = 'Previous statements';

window.ajaxPages = [
    "DVD Database: Policies",
    "Special:Contributions",
    "Special:Log",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:WikiActivity",
];

// Window.UserTagsJS.modules.stopblocked = false; // Manually turn off

massRenameDelay = 1000;
massRenameSummary = 'automatic';
batchDeleteDelay = 1000;
massRedirectDelay = 1000;
massCategorizationDelay = 1000;

importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxBatchDelete/code.2.js',
        'u:dev:AjaxDiff/code.js',
        'u:dev:AjaxPatrol/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:AjaxRedirect/code.js',
        'u:dev:AjaxUndo/code.js',
        'u:dev:AnswersHistoryButton/code.js',
        'u:dev:AntiUnicruft/code.js',
        'u:dev:ArchiveBoards/code.js',
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:ChatBlockButton/code.2.js',
        'u:dev:ChatReload/code.js',
        'u:dev:CleanWantedFiles/code.js',
        'u:dev:ColorPreview/code.js',
        'u:dev:ContribsLink/code.js',
        'u:dev:DisplayTimer/code.js',
        'u:dev:DynamicImages/code.js',
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:FindAndReplace/code.js',
        'u:dev:FixMultipleUpload/code.js',
        'u:dev:HeaderLinks/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:MassBlock/code.js',
        'u:dev:MassCategorization/code.js',
        'u:dev:MassRedirect/code.1.js',
        'u:dev:MassRename/code.js',
        'u:dev:MassRenameRevert/code.js',
//      'u:dev:MessageWallUserTags/code.js',
        'u:dev:MultipleFileDelete/code.js',
        'u:dev:NullEditButton/code.js',
        'u:dev:PageMakerPro/code.js',
        'u:dev:PurgeBlogs/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:RecentChangesMultiple/code.js',
        'u:dev:RedirectManagement/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:SearchSuggest/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:TabKeyInserter/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:ViewRemoved/code.js',
        'u:dev:UserRightsRecord/code.js',
        'u:dev:User Rights Reasons Dropdown/code.js',
//      'u:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js'
    ]
});

/*
window.MessageWallUserTags = {
    tagColor: 'blue',
    glow: true,
    glowSize: '15px',
    glowColor: '#ef0',
    users: {
        'username': 'usergroup',
        'User1': 'Founder',
        'User2': 'Bureaucrat',
        'User3': 'Admin',
        'User4': 'Rollback',
        'User5': 'Custom Tag'
    }
};
*/

window.LockOldBlogs = {
    expiryDays: 365,
    expiryMessage: "This blog is considered archived because it hasn't been commented on in over <expiryDays> days, please don't bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};

/* timeCircles begin */
 
var timeCrirclesDivs = document.getElementsByClassName("TimeCirclesDiv");
 
for (var i = 0; i < timeCrirclesDivs.length; i++) {
	var dateTime = timeCrirclesDivs[i].innerHTML.substring(1).split("]")[0];
 
	var width = "100%";
 
	var height = Math.round(timeCrirclesDivs[i].offsetWidth / 4) + "px";
 
	timeCrirclesDivs[i].innerHTML = '<iframe scrolling="no" src="http://spongebobia.com/ESB/TimeCircle/TimeCirclesImport.php?dateTime=' + dateTime + '" style="width:' + width + '; height:' + height + ';"></iframe>'; 
}
 
/* timeCircles end */