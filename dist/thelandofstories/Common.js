/* Any JavaScript here will be loaded for all users on every page load. */
/* User Tags */


window.UserTagsJS = {
    tags: {
        designer: { u: 'Designer', link:'User_blog:River_That_Crashes_Onshore/About_Designers' },
        sysop: { u:'Administrator', link:'Project:Staff#Administrators' },
        threadmoderator: { u:'Discussions Moderator', link:'Project:Staff#Discussion Moderators' },
    }
};

UserTagsJS.modules.custom = {
	'River_That_Crashes_Onshore': ['designer'],
	'River%20That%20Crashes%20Onshore': ['designer']
};

window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['SandboxTab'] = window.dev.i18n.overrides['SandboxTab'] || {};
window.dev.i18n.overrides['SandboxTab']['editcount'] = 'EditCount';