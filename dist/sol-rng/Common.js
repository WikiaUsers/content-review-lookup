/*
mw.loader.using(['mediawiki.util', 'mediawiki.api', 'jquery'], function() {
    mw.hook('wikipage.editform').add(function($form) {
        $form.on('submit', function(e) {
            var bannedWords = [];
            var articleText = $('#wpTextbox1').val();
            var regex = new RegExp(bannedWords.join("|"), "i");

            if (regex.test(articleText)) {
                alert("Your edit contains banned words and cannot be saved.");
                e.preventDefault();
            }
        });
    });
});
*/

window.UserTagsJS = {
	modules: {},
	tags: {
		fandomcontributor: {u: "Fandom Contributor"},
		bureaucrat: {order:0},
		sysop: {order:1},
		bot: {order:2},
		'content-moderator': {order: 3},
		'threadmoderator': {order: 4},
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.custom = {
	'Idk what life is or what the meaning is': ['fandomcontributor'],
	'IamIV': ['fandomcontributor'],
	'NoobieAtCode': ['fandomcontributor'],
	'MattPlays607': ['fandomcontributor'],
	'NiRex2002': ['fandomcontributor'],
	'ItzJaack': ['fandomcontributor'],
	'Arcsanta': ['fandomcontributor'],
	'CraftyCookie': ['fandomcontributor'],
	'Crytpt0hack_er': ['fandomcontributor'],
	'IcySpriggan': ['fandomcontributor'],
	//'UserName1': ['fandomcontributor'],
}

/*Test Popups*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});

/* Rail Module */
window.AddRailModule = [
    {page: 'Template:RandomPage', prepend: true},
    'Template:AdminList',
];

importScript('MediaWiki:OppressionTitleFont.js');