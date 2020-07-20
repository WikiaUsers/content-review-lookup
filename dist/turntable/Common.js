//Loaded stuffs.


// LockOldBlogs config - http://dev.wikia.com/wiki/LockOldBlogs
window.LockOldBlogs = {
    expiryDays: 2,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};
 

// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};




/* RevealAnonIP */
window.RevealAnonIP = {
    permissions : ['user']
// Syntax -     permissions : ['GROUP1', 'GROUP2', 'GROUP3']
};
/* End RevealAnonIP */




//Loaded scripts
importArticles({
    type: "script",
    articles: [
        'w:c:dev:LockOldBlogs/code.js',
        //'w:c:dev:UserTags/code.js', //Don't need
        'w:c:dev:InactiveUsers/code.js',
        'w:c:dev:ListAdmins/code.js',
        'w:dev:WallGreetingButton/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:SearchSuggest/code.js',
        'w:c:dev:Countdown/code.js',
        //'MediaWiki:Common.js/CEB.js', //Don't need
        'u:dev:TimedSlider/code.js',
        "w:c:dev:RevealAnonIP/code.js",               
        "w:c:dev:FloatingToc/code.js"   
    ]
});