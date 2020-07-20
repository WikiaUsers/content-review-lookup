//************************************************
// Imported Scripts
//************************************************
// Please See MediaWiki:ImportJS

((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;

//************************************************
// User Tag Config
//************************************************
//*** Make New Tags
window.UserTagsJS = {
	modules: {},
	tags: {
        bureaucrat: {u: 'Bureaucrat', link:'South Park Archives:Administrators', order:1},
        bot: { link:'South Park Archives', order:1 },
        founder: {u:'Founder', order:1},
		sysop: { u: 'Administrator', link:'South Park Archives:Administrators', order:2 },
		seniorbcrat: {u: 'Senior Bureaucrat',link:'South Park Archives:Administrators', order:1},
		assistantbcrat: {u: 'Assistant Bureaucrat',link:'South Park Archives:Administrators', order:1},
		leadbcrat: {u: 'Lead Bureaucrat',link:'South Park Archives:Administrators', order:1},
		rollback: { u: 'Rollback', order:3 },
		chatmoderator: { u: 'Moderator', order:4 },
		discordmod: {u: 'Discord Moderator', order:4},
		inactivebcrat: { u: 'Inactive Bureaucrat', order:8 },
		inactiveadmin: { u: 'Inactive Administrator', order:9 },
		inactive: { u: 'Inactive User', order:10 },
		fired: { u: 'Fired Administrator', order:11 }
	}
};

//*** Custom Set Tags
UserTagsJS.modules.custom = {
	'Forsbern': ['fired'],
	'VadimZ': ['fired'],
	'Jamesb1':['leadbcrat'],
	'Tomius':['founder'],
	'HighJewElfKing':['seniorbcrat'],
	'Cryptar':['sysop'],
	'LuigiMaster123':['sysop'],
	'Technical58CZ':['sysop'],
	'SilasGreaves12':['assistantbcrat'],
	'1212DragonGirl':['discordmod'],
	'Airborn56':['discordmod'],
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
UserTagsJS.modules.userfilter = {
	'Jamesb1': ['bureaucrat', 'sysop','chatmoderator', 'rollback'], 
	'HighJewElfKing': ['sysop', 'chatmoderator', 'rollback'],
	'Tomius': ['inactive'],
	'Jackstanbrah': ['rollback'],
	'PissCoveredOcelot': ['rollback']
	
};
//************************************************
// Username Template
//************************************************
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

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
$(function EditGreeting() {
	if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
		if (wgTitle == wgUserName) {
			$('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wds-button wds-is-squished" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px; background-color:#0c7c0c;color: #FBFCFC; border-color: #0c7c0c;"> Edit greeting	</a></div>');
		}
	}
});

//************************************************
// Disable Archive Edit Config
//************************************************
var DisableArchiveEditConfig = { 
   archiveSubpage: 'Archive',
   disableCompletely: true,
   textColor: '#D9D9D9',
   userLang: true
};

//************************************************
// Archive Old Blog Posts
//************************************************
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!"
};

//TAG CONFIG//