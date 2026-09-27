/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {

		// former staff
		formerbureaucrat: { u:'Former Bureaucrat', order: 100 },
		formersysop: { u:'Former Administrator', order: 101 },
		formermod: { u:'Former Moderator', order: 102 },

		// former staff reasons
		retired: { u:'Retired Staff', order: 103 },
		fired: { u:'Hall of Shame', order: 104 },

		// other
		inactive: {u:'Inactive', order: 1001 },
	}
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'threadmoderator', 'content-moderator', 'sysop', 'bot', 'bot-global'];

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};



importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
        'u:dev:MediaWiki:CategoryQuickRemove.js',
    ]
});

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});

// FNDM page subtitle for FNDM namespaced pages
$(function () {
    if (mw.config.get('wgCanonicalNamespace') !== 'FNDM') return;

    $('#firstHeading .mw-page-title-namespace').remove();
    $('#firstHeading .mw-page-title-separator').remove();

    if (!$('.page-header__page-subtitle').length) {
        $('.page-header__title-wrapper').append(
            '<div class="page-header__page-subtitle">FNDM Page</div>'
        );
    }
});