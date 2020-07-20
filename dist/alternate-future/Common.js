importStylesheetPage('MediaWiki:PseudoMonobook.css', 'dev');
importArticles({
    type: 'script',
    articles: [
        'u:dev:AddTag/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
         'u:dev:View_Source/code.js'
    ]
});

importScriptPage('ListAdmins/code.js', 'dev');

importScriptPage('Translator/Translator.js', 'dev');

importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

importScriptPage('ShowHide/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        'w:c:dev:SignatureCheck/code.js',
        'w:c:dev:Voice_Output/code.js',
        // ...
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
        "w:c:dev:DisplayClock/code.js",
 
    ]
});

//User tags
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Brass', link:'Project:Bureaucrats' },
		sysop: { u: 'Lieutenant', link:'Project:Administrators' },
                rollback: { u: 'Constable', link:'Project:Rollbacks' },
                chatmoderator: { u: 'Sub-lieutenant', link:'Project:ChatModerators' },
	}
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
importScriptPage("CategoryRenameAuto-update/code.js", "dev");
importScriptPage("FileUsageAuto-update/code.js", "dev");
massCategorizationDelay = 1000;
importScriptPage('MassCategorization/code.js', 'dev');