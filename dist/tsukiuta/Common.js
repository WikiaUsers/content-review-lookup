/* Any JavaScript here will be loaded for all users on every page load. */

// <syntax type="javascript">

// START CustomImages script
(function CustomImages($) {
    var imgWidth = $('.custom-image img').attr('width');

    $('.custom-image').css('width', imgWidth);

    $('.custom-image img').css({
        'border': '1px solid #f8f4eb',
            'border-radius': '1em',
            'overflow': 'hidden',
            'padding': '0'
    });

    $('.custom-image-desc').css({
        'border': '1px solid #f8f4eb',
            'border-radius': '1em',
            'text-align': 'center',
            'width': '100%'
    });
}(jQuery));
// END CustomImages script

/* Import Articles Start */

// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};

window.ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

window.MessageWallUserTags = {
    tagColor: '#A58200',
    glowColor: '#F7F3EA',
    users: {
        'NengeMishou': 'Bureaucrat ★ Administrator'
    }
};

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		bureaucrats: { u:'Bureaucrat' },
	}
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:ExternalImageLoader/code.js',
        'w:c:dev:Countdown/code.js',
        'u:dev:Toggler.js'
    ]
});