/* Any JavaScript here will be loaded for all users on every page load. */
/* DO NOT TOUCH UNLESS YOU KNOW JAVASCRIPT */
// Core configuration. We add 2 custom tags and change what the built-in sysop tag says.

massProtectDelay = 200;
importArticles({
    type: "script",
    articles: [
        "w:c:dev:UserTags/code.js",
        "w:c:dev:Countdown/code.js",
        'w:c:dev:TopEditors/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:MassProtect/code.js',
        'u:dev:AjaxBatchDelete/code.2.js'
    ]
});
importScriptPage('MassProtect/code.js', 'dev');
window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript' },
		csshelper: { u: 'CSS' },
		editor: { u: 'Editor'}
	}
};

// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Godonan': ['jshelper','csshelper', 'editor'],
	'BoomTexan': ['editor'],
	'Loltol1234': ['editor']
};

/* Username Template */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

importArticle({
    type: "script",
    article: [
        "w:c:dev:DisplayClock/code.js"
    ]
});

/* Import modules */
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

importScriptPage('MediaWiki:AudioIntegrator/AudioIntegrator.js', 'dev');
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});