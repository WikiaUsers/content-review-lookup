// This is for the YouTube Subscriber Count For Templates: YouTuber & YouTuber1
mw.loader.load('https://apis.google.com/js/platform.js');

if(wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') {
$('#wpUploadDescription').val('[[Category:Images]]');
}

// UserTags Settings
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
 
// LastEdited Settings
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
        discordadmin: { u:'Discord Admin' },
        discordmod: { u:'Discord Moderator' },
        rollback: { u:'Rollbacker' }
    }
};

UserTagsJS.modules.custom = {
    'Davidjl123': ['discordadmin'],
    'JustLeafy': ['discordadmin'],
    'Sidemen19': ['discordadmin'],
    'Cluckster': ['discordadmin'],
    'EpicNinjaDude37': ['discordadmin'],
    'ITurkishmapping': ['discordmod'],
    'Nintendofan885': ['rollback'],
};