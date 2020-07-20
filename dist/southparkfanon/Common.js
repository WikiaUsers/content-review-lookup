//************************************************
// Imported Scripts
//************************************************
importArticles({
	type:'script',
	articles: [
		'w:c:dev:UserTags/code.js',
                'w:c:dev:Countdown/code.js',
                'w:c:dev:BackToTopButton/code.js',
                'w:c:dev:PurgeButton/code.js',
                'w:c:dev:DisableArchiveEdit/code.js',
                'w:c:dev:ReferencePopups/code.js',
                'MediaWiki:Common.js/stdsummaries.js',
                'MediaWiki:Common.js/Date.js',
	]
});
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;
//************************************************
// User Tag Config
//************************************************
//*** Make New Tags
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { link:'South Park Fanon Wikia:Administrators'},
                bot: { link:'South Park Fanon Wikia', order:1 },
		sysop: { u: 'Administrator', link:'South Park Fanon Wikia:Administrators', order:2 },
		rollback: { u: 'Rollback', order:3 },
		chatmoderator: { u: 'Moderator', order:4 },
		'inactivebcrat': { u: 'Inactive Bureaucrat', order:8 },
		'inactiveadmin': { u: 'Inactive Administrator', order:9 },
		'inactive': { u: 'Inactive User', order:10 },
		'fired': { u: 'Fired Administrator', order:11 }
	}
};

//*** Tags New Accounts
UserTagsJS.modules.autoconfirmed = true;

//*** Tags New Users - <10 Days or <30 Edits
UserTagsJS.modules.newuser = {
	namespace: 0, 
	computation: function(days, edits) { return days < 10 && edits < 30; }
};

//*** Tags Inactive Users - >=30 Days 
UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0]
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'chatmoderator', 'rollback', 'bannedfromchat', 'bot'];
//*** Combine Multiple Tags
UserTagsJS.modules.implode = {
	'inactivebcrat': ['bureaucrat', 'inactive'], //+inactivebcrat -bureaucrat -inactive
	'inactiveadmin': ['sysop', 'inactive'] //+inactiveadmin -sysop - inactive
};
//************************************************
// Username Template
//************************************************
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

//************************************************
// Wanted Files Tweak
//************************************************
$(function() {
    if ("Special" == wgCanonicalNamespace && "WantedFiles" == wgCanonicalSpecialPageName) {
        $('ol.special a.new').each(function() {
            var m = $(this).attr('href').match(/title=File:([^&]+)/);
            if (m) {
                $(this).attr({
                    href: '/wiki/Special:Upload?wpDestFile=' + m[1],
                    title: 'Upload ' + m[1]
                });
            }
        });
    }
});

//************************************************
// Adds Button to Edit Message Wall Greeting
//************************************************
function EditGreeting() {
	if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
		if (wgTitle == wgUserName) {
			$('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit greeting	</a></div>');
		}
	}
}

addOnloadHook(EditGreeting);

//************************************************
// Test if an element has a certain class
// Credit: Mike Dillon, R. Koot, SG
//************************************************
var hasClass = (function () {
   var reCache = {};
   return function (element, className) {
      return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
   };
})();

//************************************************
// Disable Archive Edit Config
//************************************************
var DisableArchiveEditConfig = { 
   archiveSubpage: 'Archive',
   disableCompletely: True,
   textColor: '#D9D9D9',
   userLang: true
};