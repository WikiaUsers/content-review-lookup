/* 
此處的JavaScript將加載於所有用戶每一個頁面
*/

/* ######################################################################### */
/* Wiki log setting
/* ######################################################################### */

window.ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Log"];
window.ajaxRefresh = 20000; /* 20 seconds */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
        bot: { u:'WX-78', link:'Project:機器人' },
        bureaucrat: { u:'夢魘王座', link:'Project:行政員' },
        chatmoderator: { u:'維斯的代言', link:'Project:聊天主持人' },
        "content-moderator": { u:'薇克伯頓的智慧', link:'Project:内容版主' },
        inactive: { u:'遠離塵囂' },
        rollback: { u:'暗影之手', link:'Project:回退權' },
        sysop: { u:'管理員', link:'Project:管理員' },
        threadmoderator: { u:'薇格弗德的勇氣', link:'Project:話題版主' },
	}
};
UserTagsJS.modules.mwGroups = ['bot', 'bureaucrat', 'chatmoderator','content-moderator', 'sysop', 'inactive', 'rollback', 'bannedfromchat', 'sysop', 'threadmoderator'];
UserTagsJS.modules.inactive = 30; // 30 days

/* ######################################################################### */
/* END Wiki log setting
/* ######################################################################### */


/* ######################################################################### */
/* Blog and Forum control setting */
/* ######################################################################### */

window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days. The conversation is considered over. There is no need to comment.",
    nonexpiryCategory: "Never archived blogs"
}; 

window.LockForums = {
    expiryDays: 30,
    expiryMessage: "This forum has been automatically archived because its most recent comment is over <expiryDays> days old.",
    warningDays: 25,
    warningMessage: "This forum is now <actualDays> days old; please do not comment unless it is absolutely necessary. This forum will archive automatically when the last comment is <expiryDays> days old.",
    banners: false,
    ignoreDeletes: true,
    warningPopup: true,
    warningPopupMessage: "By posting on an old forum you may be filling up the e-mail boxes of many people who are still following this topic but are not interested in the discussion anymore. Are you sure you want to do this?",
};

/* ######################################################################### */
/* END Blog and Forum control setting */
/* ######################################################################### */


/* ######################################################################### */
/* {{Username}} setting */
/* ######################################################################### */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* ######################################################################### */
/* END {{Username}} setting */
/* ######################################################################### */


/* ######################################################################### */
/* {{Games}} setting */
/* ######################################################################### */
 
// Description: Add game icons to top right corner of articles
// Credit:      User:Porter21
 
$(function addTitleIcons() {
   if (skin == 'monobook' || skin == 'oasis') {
      var insertTarget;
 
      switch (skin) {
         case 'monobook':
            insertTarget = $('#firstHeading');
            break;
         case 'oasis':
            if (wgAction != 'submit' && wgNamespaceNumber != 112) {
               insertTarget = $('#WikiaPageHeader');
            }
            break;
      }
 
      if (insertTarget) {
         $('#directory-in-header').css('position', 'absolute').prependTo(insertTarget);
      }
   }
});
 
/* ######################################################################### */
/* END {{Games}} setting */
/* ######################################################################### */


/* ######################################################################### */
/* PreloadFileDescription */
/* Credit: Nanaki
/* ######################################################################### */

PFD_templates = [{
        label: 'Images',
        desc: '{{File\n| Description = \n| Date = \n| Source = \n| Author = \n| Other versions = \n}}\n[[Category:Images]]',
    },
    'Group header', {
        label: 'Videos',
        desc: '{{File\n| Description = \n| Date = \n| Source = \n| Author = \n| Other versions = \n}}\n[[Category:Videos]]',
    },
];
 
PFD_requireLicense = true;

/* ######################################################################### */
/* END PreloadFileDescription */
/* ######################################################################### */