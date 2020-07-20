// Any JavaScript here will be loaded for all users on every page load.
// If you do not know what you are doing, do not edit this page.
// <source lang="JavaScript">

/* Ask the Oracle */
$(function() {
    if (document.getElementById('asktheoracle')) {
        var div_asktheoracle = document.getElementById('asktheoracle');
        div_asktheoracle.innerHTML = "<object width='600' height='470'><param name='movie' value='https://images.wikia.nocookie.net/olympians/images/4/47/Asktheoracle.swf'><embed src='https://images.wikia.nocookie.net/olympians/images/4/47/Asktheoracle.swf' width='600' height='470'></embed></object>";
    }
});

// User Tags
window.UserTagsJS = {
	modules: {
        inactive: 61,
		mwGroups: [
            'bureaucrat',
            'chatmoderator',
            'rollback',
            'sysop',
            'threadmoderator',
            'bannedfromchat',
            'bot',
            'bot-global'
        ],
		autoconfirmed: false,
		metafilter: {
			sysop: ['bureaucrat'],
			chatmoderator: ['sysop'],
			rollback: ['sysop'],
		},
		newuser: true,},
	tags: {
		bureaucrat: { link:'Project:Bureaucrats' },
		sysop: { link:'Project:Administrators' },
		chatmoderator: { link:'Project:Chat Moderators' },
		rollback: { u:'Rollback', link:'Project:Rollbacks' },
		featured: { u:'Featured Wikian', link:'Project:Featured Wikian' },
		threadmoderator: { link:'Project:Forum Moderators' },
		bot: { u:'Bot', link:'Help:Bots' }
	}
};
UserTagsJS.modules.custom = {
	'SayuriDarling': ['bureaucrat'],
	'RoyallyBella': ['bureaucrat'],
	'ArchieScotts': ['featured'],
};
UserTagsJS.modules.userfilter = {
	'HyperBOT': ['sysop', 'inactive', 'rollback', 'chatmoderator']
};
UserTagsJS.modules.mwGroups = ['bureaucrat']; 
UserTagsJS.modules.mwGroups = ['rollback'];

// Open chat in new window
$(".openchat a").click(function () {
    window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
    return false;
});

// LockForums
window.LockForums = {
    expiryDays: 90,
    expiryMessage: "This forum is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this forum!",
    forumName: "Forum",
    banners: true,
    ignoreDeletes: true,
    warningPopup: true,
};
 
/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
$(function disableOldForumEdit() {
    if (wgNamespaceNumber == 110 || wgNamespaceNumber === 114) {
        if (typeof(enableOldForumEdit) != 'undefined' && enableOldForumEdit) {
            return;
        }
        if (!document.getElementById('old-forum-warning') || !document.getElementById('ca-edit')) {
            return;
        }

        var editLink = null;
        if (skin == 'monobook') {
            editLink = document.getElementById('ca-edit').firstChild;
            editLink.removeAttribute('href', 0);
            editLink.removeAttribute('title', 0);
            editLink.style.color = 'gray';
            editLink.innerHTML = 'Archived';
        } else if (skin == 'oasis') {
            $('#WikiaPageHeader .wikia-menu-button > a').html('Archived').removeAttr('href');
            return;
        }
    }
	

    $('span.editsection-upper').remove();

});

// Facebook thing
$(function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=202082182029&amp;connections=10&amp;stream=1" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
});

$(function fBox2() {
	$('#fbox2').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=202082182029&amp;connections=0&amp;stream=0" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
});
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 });

/* End of the {{USERNAME}} replacement */

/* ShowHide configuration */
window.ShowHideConfig = { 
    brackets: '[[]]'
};

// Collapsibles 
window.autoCollapse = 2;
window.collapseCaption = "hide";
window.expandCaption = "show";
window.maxHeight = 300;

// Ajax auto-refresh
window.ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
window.AjaxRCRefreshText = 'Auto-refresh';

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
    });
});