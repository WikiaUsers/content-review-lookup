/* Any JavaScript here will be loaded for all users on every page load. */
window.dev = window.dev || {};

window.dev.DynamicImages = {
	svgGallery: true,
	svgLightbox: true,
	svgIncreaseSrc: 1
}
 
var MultiUploadoption = {
  max: 20
};

//$('.parallax-window').parallax({imageSrc: '/path/to/image.jpg'});
 
window.ajaxRefresh = 500;
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:WikiActivity",];
 
massCategorizationDelay = 4000;
 
 
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
 
var MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 for this/those reaction(s) $1',
  autocheck : true
};
 
window.lastEdited = {
    avatar: false
};
 
 
/** Import stuff */
importArticles(
{
    type: "script",
    articles: 
    [
        'u:dev:AjaxDelete/code.js',
        'u:dev:DynamicImages/code.js',  
        'u:dev:AjaxDiff/code.js',
        'w:c:dev:MarkForDeletion/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:AddRailModule/code.js',
        'u:dev:HeaderLinks/code.js',
        'u:dev:LastEdited/code.js', //This is already on all the wikis!
        'w:c:dev:RevealAnonIP/code.js', //Let's get fun with unregistred.
        'u:dev:MessageBlock/code.js',
        //'w:c:dev:InactiveUsers/code.js',
        'w:avatar:MediaWiki:Common.js/wallgreetingbutton.js',
        'w:c:dev:ExternalImageLoader/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'w:c:dev:UserTags/code.js',
        'w:c:dev:DupImageList/code.js',
        'w:c:dev:FixMultipleUpload/code.js',
        'w:avatar:MediaWiki:Common.js/rollbacktag.js',
        'w:c:dev:CleanWantedFiles/code.js',
        'u:embercastle:MediaWiki:AjaxUndo.js',
        'u:dev:MediaWiki:Linksweeper/code.js',
        'u:dev:MediaWiki:AnchoredRollback/code.js',
        'u:dev:MediaWiki:MassCategorization/code.js',
        'u:dev:MediaWiki:MultiUpload/code.js',
        'w:c:dev:WikiPlus/code.js',
    ]
});

window.MessageWallUserTags =
{
    tagColor: '#d0d0d0',
    glow: true,
    glowSize: '15px',
    glowColor: '#e9e9e9',
    
    users:
    {
        //blah
    }
};

window.UserTagsJS =
{
	modules: {},
	tags:
	{
		// group: { associated tag data }
        sysop: { u:'Angel' },
        founder: { u:'Guardian' }		
		//usertagname: { type(u, m, f):'UserTagName', order: -1/0 },
	}
};
 
UserTagsJS.modules.custom =
{ 
    "Gamer Hour74(reserve)": ['sysop'],
    //'username': ['tags'],
}
 
UserTagsJS.modules.inactive = 10;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.isblocked = true;
 
UserTagsJS.modules.newuser =
{
	days: 4,
	edits: 10,
	namespace: 0
};
 
UserTagsJS.modules.userfilter =
{
	'Gamer Hour74(reserve)': ['nonuser', 'newuser', 'inactive'],
	'Kmyc89': ['nonuser', 'newuser', 'inactive', 'bureaucrat'],
};
 
UserTagsJS.modules.mwGroups = 
[
    'bureaucrat', 
    'chatmoderator', 
    'patroller', 
    'rollback', 
    'sysop', 
    'bannedfromchat', 
    'bot', 
    'bot-global', 
    'newuser'
];

UserTagsJS.modules.metafilter =
{
    sysop: ['bureaucrat', 'founder'], 
    chatmoderator: ['sysop', 'bureaucrat', 'rollback'],
    rollback: ['sysop'], 
    newuser: ['chatmoderator', 'bannedfromchat']
}