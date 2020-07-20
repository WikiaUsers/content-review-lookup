if($('.UserProfileMasthead hgroup').exists()) {
    importArticle({
        type: "style",
        article: "u:de.harry-grangers-test:MediaWiki:VSTF Report Menu.css"
    });
    $('.UserProfileMasthead hgroup').append(
	$('<a />')
            .addClass('vstf-report-menu')
            .attr({
                'href': 'http://vstf.wikia.com/wiki/Report:Profile',
                'title':'Report profile',
                'target': '_blank'
            })
    );
}