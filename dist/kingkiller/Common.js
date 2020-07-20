/* Any JavaScript here will be loaded for all users on every page load. */

/*
    ##############################################
    SCRIPTS CONFIGURATION
    ##############################################
*/

// User tags
window.UserTagsJS = {
	tags: {
		featured: { u:'Featured' },
		'bot-owner': { u:'Bot owner' },
		'inactive-bureaucrat': { u:'Retired chancellor' },
		'inactive-sysop': { u:'Retired master' },

                'master-alchemist': { u:'Master Alchemist' },
                'master-archivist': { u:'Master Archivist' },
                'master-arithmetician': { u:'Master Arithmetician' },
                'master-artificer': { u:'Master Artificer' },
                'master-linguist': { u:'Master Linguist' },
                'master-namer': { u:'Master Namer' },
                'master-physicker': { u:'Master Physicker' },
                'master-rhetorician': { u:'Master Retorician' },
                'master-sympathist': { u:'Master Sympathist' },
	},
	modules: {
        inactive: 35, // Inactive if no edits in 35 days
        mwGroups: ['bureaucrat', 'sysop', 'moderator', 'chatmoderator', 'bot'],
        autoconfirmed: false,
        newuser: true,
        metafilter: {
            'inactive-sysop': ['inactive-bureaucrat'],
            'sysop':  ['bureaucrat'],
            'bot': ['sysop']
        },
        implode: {
            'inactive-bureaucrat': ['bureaucrat', 'inactive'],
            'inactive-sysop': ['sysop', 'inactive'],
        },
        custom: {
            'Cörey': 'master-archivist',
            'Iasov': 'master-namer',
            'Serpentizer': 'master-sympathist',
        }
	}
};

/*
    ##############################################
    IMPORT SCRIPTS
    ##############################################
*/

importArticles({
    type: "script",
    articles: [
        "w:dev:DisplayClock/code.js",
        "w:dev:RevealAnonIP/code.js",
        "w:dev:UserTags/code.js",
    ]
});

/*
    ##############################################
    CUSTOM SCRIPTS / HACKS
    ##############################################
*/

// Comments, message wall, forum posts user tags
(function ($, ArticleComments) {
    "use strict";
 
    function addTag() {
        var users = {
            'C%C3%B6rey': 'Master Archivist',
            'Huffdogg': 'Retired master',
            'Gaylesking': 'Retired chancellor',
            'Iasov': 'Master Namer',
            'Ivorydoom': 'Retired chancellor',
            'Ohmystars': 'Retired chancellor',
            'Serpentizer': 'Master Sympathist',
            'Ziggelly': 'Retired master',
        };
 
        for (var name in users) {
            $('.comments .edited-by a[href$="' + name + '"]:not(.subtle)')
            .after('<span class="tag">' + users[name] + '</span>');
        }
    }
 
    function init() {
        addTag();
        if (ArticleComments && ArticleComments.addHover) {
            var realFunc = ArticleComments.addHover;
            ArticleComments.addHover = function () {
                var result = realFunc.apply(ArticleComments, arguments);
                addTag();
                return result;
            };
        }
    }
 
    $(init);
}(jQuery, window.ArticleComments));