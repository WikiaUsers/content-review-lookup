/* Replaces {{Gebruikersnaam}} with the name of the user browsing the page. */

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* End of the {{Gebruikersnaam}} replacement */


importArticles({
    type: 'script',
    articles: [
        'u:dev:LastEdited/code.js',
        'w:c:dev:RevealAnonIP/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'w:c:nl.clashofclans:MediaWiki:Common.js/Protection.js',
        'u:dev:LastEdited/code.js',
        'w:c:dev:UserTags/code.js',
        'w:dev:WallGreetingButton/code.js'
    ]
});

window.lastEdited = {
    size: false,
    diff: true,
    comment: true,
    time: true
};

window.UserTagsJS = {
	modules: {},
	tags: {
		vakantie: { u:'Op vakantie' }
	}
};
UserTagsJS.modules.custom = {
	'Pepertje25': ['vakantie'] 
};
UserTagsJS.modules.metafilter = {
    'bureacrat': ['founder'],
    'sysop': ['founder', 'bureaucrat'],
    'moderator': ['founder', 'bureacrat', 'sysop'],
    'chatmoderator': ['founder', 'bureacrat', 'sysop', 'moderator'],
    'rollback': ['founder', 'bureacrat', 'sysop', 'moderator']
};