/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		//mythic: { u: 'Mythic', order: 100 },
                //badboy: { u: 'Honorable Graffiti Artist' },
                badboy: { u: 'Smurf King' },
                brigmaster: { u: 'Brigade Guru' },
                mastermind: { u: 'Mastermind' },
                trader: { u: 'The Wall Street Journalist' },
                iamneo: { u: 'I am The Matrix' },
                wwwcaptain: { u: 'WWW Captain' },
                quizprince: { u: 'Prince of Quiz' },
                thosewhogetspanked: { u: 'The Stoner' },
                chef: {u: 'Iron Chef' },
		bureaucrat: { order: 1 },
                moderator: { u: 'Epic', order: 2 },
                chatmoderator: { u: 'Rare', order: 3 },
	}
};
UserTagsJS.modules.custom = {
        // NOTE: order of list here does NOT matter
	//'Nlby001': ['mythic'],
        'Chinhodado': ['mastermind'],
        'Ashebash': ['brigmaster'],
        '-Leroy-': ['badboy'],
        'Yuhhaur': ['iamneo'],
        'FieryBlaz': ['quizprince'],
        'GuitarRock': ['trader'],
        'MrMcSpankie': ['thosewhogetspanked'],
        'Swinkel': ['wwwcaptain'],
        'Loan Deranger': ['wwwcaptain'],
        'Sweisdapro': ['chef'],
}
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'moderator', 'chatmoderator'];

UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
        'chatmoderator' : ['sysop', 'moderator'], // Remove "Chat moderator" tag from administrators and moderators
        'threadmoderator' : ['sysop', 'moderator'], //Remove double "Moderator" tag from administrators and moderators
};

/*
Imports 
1. user tags
2. Countdown Script
3. filterable tables
*/
importArticles({
    type: "script",
    articles: [
	"w:c:dev:UserTags/code.js",
        "w:c:dev:Countdown/code.js",
        "u:pad.wikia.com:MediaWiki:FilterTable.js",

    ]
});
importScriptPage( 'ShowHide/code.js', 'dev' );

// End Countdown Script

importScript('MediaWiki:Common.js/profileRedesign.js');

// only apply the Familiar.js to familiar pages
if (-1 != mw.config.get('wgCategories').indexOf('Familiars'))
{
    importArticles({
        type: "script",
        articles: [
            "MediaWiki:Familiar.js",
        ]
    });
}

switch (wgPageName)
{
    case "Familiar_Comparison_Tool":
        importArticles({
           type: "script",
           articles: [
               "MediaWiki:POPETableParser.js",
               "MediaWiki:FamiliarComparison.js",
            ]
        });
        break;
    case "Familiars_Formation_Generator":
        importArticles({
           type: "script",
           articles: [
               "MediaWiki:POPETableParser.js",
               "MediaWiki:FormationGenerator.js",
            ]
        });        
        break;
}

// adds rollover tooltips

var tooltips_config = {
    waitForImages: true,
};
importScriptPage('Tooltips/code.js', 'dev');

/* End of rollover tooltips */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */