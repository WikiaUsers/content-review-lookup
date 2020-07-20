/* Any JavaScript here will be loaded for all users on every page load. */

//mw.loader.load('https://apis.google.com/js/platform.js');
 
if(wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') {
$('#wpUploadDescription').val('[[Category:Images]]');
}

// UserBadges settings
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { link:'Project:Administration#Bureaucrats and Administrators' },
		sysop: { link:'Project:Administration#Bureaucrats and Administrators' },
		rollback: { link:'Project:Administration#Rollbacks and Chat Moderators' },
                chatmoderator: { link:'Project:Administration#Rollbacks and Chat Moderators' }
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator', 'bot'];
UserTagsJS.modules.metafilter = { 'notautoconfirmed': ['newuser'] };
UserTagsJS.modules.newuser = { days: 5, edits: 0 };
 
// LastEdited settings
window.lastEdited = {
    position: 'bottom',
    size: false,
    comment: false,
    time: true
};

window.UserTagsJS = {
    modules: {},
    tags: {
        discordfounder: { u:'Discord Founder' },
        discorddev: { u:'Discord Developer' },
        discordadmin: { u:'Discord Admin' },
        discordmod: { u:'Discord Moderator' },
        rollback: { u:'Rollbacker' }
    }
};

UserTagsJS.modules.custom = {
    'Aeywoo': ['discordfounder','discorddev']
};

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1)
  importScriptPage('MediaWiki:AjaxRedirect/code.js', 'dev');