/*********************
 * User-tags changes *
 ********************/
window.UserTagsJS = {
	modules: { 
        mwGroups: ['bureaucrat', 'patroller', 'rollback'],
        metafilter: {	
           sysop: ['bureaucrat'],
           chatmoderator: ['rollback'],
        }
    },
	tags: {
        rollback: { u:'Patroller' }
    }
};

/****************
 * Auto Refresh *
 ***************/
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'Auto-refresh';

/**********************
 * Special Side Boxes *
 *********************/
//Special side boxes
 
$(function(){
    $('<section class="RandomModule module"></section>')
    .appendTo('#WikiaRail')
    .load('/index.php?title=Template:RandomModule&action=render');
});

//usernames
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $('.insertusername').html(wgUserName); 
});