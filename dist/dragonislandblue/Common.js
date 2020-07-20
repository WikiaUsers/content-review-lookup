/* ######################################################################### */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Most scripts can be refered to http://dev.wikia.com */
/* ######################################################################### */


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
		communityrep: { u:'Community Rep' },
        custodian: { u:'Custodian' },
        chatmoderator: { u:'Chat Moderator' },
        'bot-global': { link: 'Project:Bots' },   
	}
};
UserTagsJS.modules.custom = {
	//'username': ['communityrep'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'custodian', 'chatmoderator'];
UserTagsJS.modules.inactive = 30; // 30 days

/* ######################################################################### */
/* END Wiki log setting
/* ######################################################################### */


/* ######################################################################### */
/* Blog and Forum control setting */
/* ######################################################################### */

window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days. The conversation is considered over. There is no need to comment.",
    nonexpiryCategory: "Never archived blogs"
}; 

window.LockForums = {
    expiryDays: 60,
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