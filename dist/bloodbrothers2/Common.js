/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
        faceless: { u: 'The Faceless', order:-1/0 },
        thosewhogetspanked: { u: 'The Stoner' },
        wdg: { u: 'WDG' },
        founder: { order:-1/0},
		bureaucrat: { order: 1 },
        moderator: { u: 'Epic', order: 2 },
        chatmoderator: { u: 'Rare', order: 3 },
	}
};
UserTagsJS.modules.custom = {
    // NOTE: order of list here does NOT matter
    'MrMcSpankie': ['thosewhogetspanked', 'wdg'],
    'Jareif': ['faceless'],
    'Squal284': ['wdg'],
    'ThorAres': ['wdg'],
};
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'moderator',
    'chatmoderator',
    'threadmoderator'
];
 
UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
    'chatmoderator' : ['sysop', 'moderator'], // Remove "Chat moderator" tag from administrators and moderators
    'threadmoderator' : ['sysop', 'moderator'], //Remove double "Moderator" tag from administrators and moderators
};

var tooltips_list = [{
    classname: 'brig-tooltip',
    parse: '{|class="wikitable" style="width: 165px;"\n!colspan="2" style="font-style:bold;"|<#name#>\n|-\n|colspan="2"|[[File:<#name#>_Image.png|165px|center]]\n|-\n!HP:\n|<#hp#>\n|-\n!ATK:\n|<#atk#>\n|-\n!DEF:\n|<#def#>\n|-\n!WIS:\n|<#wis#>\n|-\n!Charge:\n|<#charge#>\n|}',
}];

var tooltips_config = {
    waitForImages: true,
};

importArticles({
	type: "script",
	articles: [
        'u:dev:Countdown/code.js',
        'u:dev:Tooltips/code.js',
        'u:dev:UserTags/code.js',
        'u:pad:MediaWiki:FilterTable.js',
    ]
});

if (wgPageName == "Commander_Comparison_Tool") {
    importArticles({
       type: "script",
       articles: [
           "MediaWiki:CommTableParser.js",
           "MediaWiki:CommanderComparison.js",
        ]
    });
}