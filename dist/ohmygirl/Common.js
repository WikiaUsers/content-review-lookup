/* Any JavaScript here will be loaded for all users on every page load. */
//LockForums config
window.LockForums = {
    expiryDays: 14,
    lockMessageWalls: true,
    expiryMessage: 'This thread has been archived due to inactivity.'
};
 
//ArchiveBoards config
window.ArchiveBoards = {
    post: true,
    threads: false,
    boards: ['Wikia Updates']
};

// Add [[ Category: Images]] @ images aytomatically
 
if(wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') {
$('#wpUploadDescription').val('[[Category:Images]]');
};
 
//TZclock config
window.TZclockSimpleFormat = true;
 
//Rollback config
window.RollbackWikiDisable = true;
 
//AjaxRC config
window.ajaxRefresh = 30000;
window.ajaxPages = ['Blog:Recent_posts'];
window.ajaxSpecialPages = ['WikiActivity', 'Recentchanges', 'Watchlist', 'Log'];
 
 
 /*Usertags from Dev Wiki*/
window.UserTagsJS = {
	modules: {},
	tags: {
		stan: { u:'Miracle'},
		nonstop: { u:'This User Favorite Song Are Nonstop'}
		},
	oasisPlaceBefore: ''
};

 
/*Add Usertags for Users*/
UserTagsJS.modules.custom = {
	'Birbfriend': ['stan'],
	'Rheinaldi kian jiu': ['nonstop']
    
};
 
/* Rail WAM */
window.railWAM = {
    logPage:"Project:WAM Log"
};

//Template:USERNAME
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});
 
/* Allows for the embedding of videos from vlive.tv (Base Code - KockaAdmiralac) 
mw.hook('wikipage.content').add(function($content) {
    var current = 0;
    $content.find('.Vlive:not(.loaded)').each(function() {
        var el = document.getElementsByClassName("Vlive")[current];
        var video_id = "https://www.vlive.tv/embed/" + el.getAttribute("data-id") + "?autoPlay=false";
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: el.getAttribute("data-height"),
                scrolling: 'no',
                src: video_id,
                width: el.getAttribute("data-width"),
                allow: "fullscreen",
            })
        ).addClass('loaded');
        current += 1;
    });
});
*/

// Enable modern behaviour and import BackToTopButton
window.BackToTopModern = true;
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:BackToTopButton/code.js'
});