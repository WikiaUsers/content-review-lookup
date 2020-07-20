/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		sysop: { u:'Administrator' }
	},
};
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'Spongebob2567': 'Founder • Bureaucrat • Admin',
        'Auron%7EGuardian': 'Bureaucrat • Admin',
        'Random Pony': 'Admin',
        'Spongebob789':'Admin',
        'Nicko756':'Admin',
        'President Dubstep':'Admin'

    }
};
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});

 
// *************************************************
// BEGIN Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
 
if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User talk") {
$(function () {
    var newTitle = $("#title-meta").html();
    if (!newTitle) return;
    var edits = $("#user_masthead_since").text();
    $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
    //$(".user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});
}
 
// *************************************************
// END Pagetitle rewrite
// *************************************************