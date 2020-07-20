// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************

window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { link:'Project:Administrators' },
                formeradmin: { u:'Former Admin' }
	}
};
UserTagsJS.modules.custom = {
	'DEmersonJMFM': ['formeradmin']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'chatmoderator', 'threadmoderator'];
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = { days: 10, edits: 10, namespace: 0 };
UserTagsJS.modules.inactive = { days: 31, namespaces: [0, 2, 4, 8, 10] };
UserTagsJS.modules.metafilter = { 'newuser': ['inactive', 'staff'], 'inactive': ['staff'], 'chatmoderator': ['sysop'] 
};

// *****************************
// Beginning of Script importing
// *****************************

importArticles({
    type: "script",
    articles: [
        "w:c:dev:DupImageList/code.js",           // Lists Duplicate Images
        "w:c:dev:UserTags/code.js",               // User Rights Tags
        "MediaWiki:Common.js/countdownclock.js",  // Countdown Count
        "MediaWiki:Common.js/AjaxRC.js"           // Auto Refresh
    ]
});

// *********************************************************
// Dead Videos via Special:BlankPage?blankspecial=deadvideos
// *********************************************************
 
if (
  mw.config.get('wgPageName') === 'Special:BlankPage' &&
  mw.util.getParamValue('blankspecial') === 'deadvideos'
) {
    window.deadVideosCategories = ['Videos'];
 
    importArticle({
        type: 'script',
        article: [
            'w:c:mlp:MediaWiki:Common.js/DeadVideos.js'
        ]
    });
}