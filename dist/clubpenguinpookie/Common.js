/* Official admin messages */

$(".OfficialAdminMsg").each(function(){
	var admindd;
	var adminname = $(this).closest('.MiniEditorWrapper').find('.edited-by a').text();
	var ts = Date.parse($(this).closest('.MiniEditorWrapper').find('.msg-toolbar .timestamp .permalink').text().replace(/(^[\S\s]*[0-9][0-9]:[0-9][0-9], |\n\t*$)/g, ''));
    if ( adminname == "C H U N K Y"   ||
         adminname == "Falling Stars" ||
         adminname == "Pam pam4"      ||
         adminname == "Sansy Sinner" ) {
		admindd = ts+1;
    } else if ( adminname == "XxObjectShows4LifexX" ) { admindd = Date.parse("June 26, 2016");
    } else if ( adminname == "Galactic Papyrus" ) { admindd = Date.parse("June 28, 2016");
    } else if ( adminname == "Duccie" ) { admindd = Date.parse("July 27, 2016");
    } else if ( adminname == "Super Miron" ) { admindd = Date.parse("July 27, 2016");
	} else {
		admindd = 0;
	}
	if ( admindd >= ts ) {
		$(this).closest('.MiniEditorWrapper').find('.edited-by').append('<span style="color: red; font-weight: normal; font-style: italic;">[official admin message]</span>');
	}
});

window.UserTagsJS = {
	modules: {},
	tags: {
		coder: { u: 'Coder', order: 100 },
	}
};
UserTagsJS.modules.custom = {
	'Zynethyst': ['coder'] // NOTE: order of list here does NOT matter
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YoutubePlayer/code.js'
    ]
});