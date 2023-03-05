// 02:35, June 11, 2022 (UTC)

// Ajax auto-refresh
window.ajaxPages = ["Special:Log", "Special:Watchlist", "Special:NewFiles",
                 "Special:NewPages", "Special:ListFiles", "Special:Videos"];
window.ajaxRefresh = 30000;

// Site scripts
// @todo: review if these are relevant, if not remove them
importArticles({
	type: 'script',
	articles: [
		'MediaWiki:Common.js/helpHover.js', // JS for Template:HelpButton
		'MediaWiki:Common.js/magicEditintros.js', // Add editintros for disambigs
		'MediaWiki:Common.js/screenResolution.js', // For use at Project:Screen_resolution */
		'MediaWiki:Common.js/UserInfo.js', // JS for Project:User_info
]});

// For sysops only
if (mw.config.get('wgUserGroups').indexOf('sysop') > -1) {
    massCategorizationDelay = 1000;
    importArticles({
		type: 'script',
		articles: [
			'u:dev:AjaxRedirect/code.js',
			'u:dev:MediaWiki:MassCategorization/code.js',
	]});
}

// Add ImageMapEdit functionality
importScriptURI('//tools.wmflabs.org/imagemapedit/ime.js');

// Hide redirects at PrefixIndex & AllPages
// Last edit details on articles
if(wgAction=='view') {
window.lastEdited = {
    avatar: false,
    size: true,
    diff: true,
    comment: true,
    time: 'timestamp',
    namespaces: {
        //  2 - User:
        //  4 - Project:
        // 13 - Help talk:
        include: [13],
        exclude: [2,4]
    },
    pages: ["Scratchpad"]
};
}

// Add Bureaucrat promotion warning message
!function() {
    if (wgCanonicalSpecialPageName !== 'Userrights') return;
    $('#mw-content-text').on('change', '#wpGroup-bureaucrat', function() {
    if ($('#wpGroup-bureaucrat').attr('checked') && !confirm('Do you truly want to appoint a bureaucrat?')) $('#wpGroup-bureaucrat').attr('checked', null);
    });
}();

/* Toggle spolier button text */
$(function () {
    var button = $('.mw-customtoggle-ShowSpoiler');
    if (button.length !== 1) {
        return;
    }

    function toggleText () {
        if ($(this).hasClass('shown')) {
            $(this).removeClass('shown');
            $(this).text('Show spoilers');
        } else {
            $(this).addClass('shown');
            $(this).text('Hide spoilers');
        }
    }

    button.text('Show spoilers');

	button.click(toggleText);
});

// Template:Stext JS
$('.spoiler_on').click(function () {
    if ($(this).hasClass('spoiler_on')) {
        $(this).switchClass('spoiler_on', 'spoiler_off');
    } else {
        $(this).switchClass('spoiler_off', 'spoiler_on');
    }
});