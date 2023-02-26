/* Any JavaScript here will be loaded for all users on every page load. */

// AjaxRC
window.ajaxRefresh=16000;
window.ajaxPages=["Special:RecentChanges","Special:WikiActivity","Special:Watchlist","Special:Log","Special:Contributions"];
window.AjaxRCRefreshText='Auto-Refresh';
window.AjaxRCRefreshHoverText='Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');

// DisplayClock
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});

// RevealAnonIP
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

// BackToTopArrow
importScriptPage('BackToTopArrow/code.js', 'dev');

// FixMultipleUpload
importArticles({
    type: 'script',
    articles: [
        //...
        'w:c:dev:FixMultipleUpload/code.js',
        //...
    ]
});

// FixWantedFiles
importScriptPage('FixWantedFiles/code.js', 'dev');

// ListAdmins
importScriptPage('ListAdmins/code.js', 'dev');

// ReferencePopups
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

// SignatureCheck
importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
		// ...
	]
});

// SpoilerAlert
importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.js"
    ]
});

// TopEditors
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:TopEditors/code.js'
    ]
});

// UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
                founder: { u:'Founder' },
                bureaucrat: { u:'Bureaucrat', link:'Project:Bureaucrats' },
		sysop: { u:'Administrator', link:'Project:Administrators' },
                rollback: { u:'Rollback' },
                chatmoderator: { u:'Chat Moderator' },
                blocked: { u:'Blocked' },
		inactive: { u: 'Inactive' },
                developer: { u:'Recognized Developer' },
                elitedeveloper: { u:'Elite Developer' },
                contributor: { u:'Recognized Contributor' },
                elitecontributor: { u:'Elite Contributor' },
		newseditor: { u:'News Editor' },
		newswriter: { u:'News Writer' },
		hated: { u:'Hated' },
	}
};
UserTagsJS.modules.custom = {
        Abgar: ['elitedeveloper'],
        AChocoboNamedCecil: ['elitecontributor', 'developer'],
        BrianXP7: ['elitecontributor', 'newseditor'],
        Bluerobin2: ['elitedeveloper', 'newswriter'],
        Brizobst: ['elitedeveloper'],
        Calc84maniac: ['developer'],
        ChangeV: ['elitedeveloper'],
        Discordstew: ['elitedeveloper'],
        GimmeMoreCoinz: ['developer'],
        Hseiken: ['developer'],
        IAmAPersson: ['elitecontributor', 'elitedeveloper'],
        LeviCelJir: ['elitecontributor', 'developer'],
        Lumage: ['elitecontributor', 'hated'],
        'Pixel-Voxel': ['elitecontributor', 'hated'],
        Pokeyoshi19: ['developer'],
        Sparkystream: ['elitecontributor'],
        SquareFingers: ['elitecontributor'],
        TheV360: ['developer'],
        Toodles78: ['elitecontributor'],
        TriforceOfKirby: ['developer'],
        TwinArmageddonz: ['elitedeveloper'],
	Randomouscrap98: ['elitecontributor', 'elitedeveloper'],
};
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'],
};
UserTagsJS.modules.userfilter = {
        Ddayton: ['bureaucrat'],
	'PTC Wikia Bot': ['inactive'],
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});