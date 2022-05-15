/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EditBio/code.js',
        'u:dev:YoutubePlayer/code.js',
    ]
});

//Auto Message Blocked
var MessageBlock = {
    title : 'Diblokir.',
    message : 'Anda telah diblokir selama $2 untuk alasan berikut: "$1"',
    autocheck : true
};
 
/* AjaxRC */
window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:Images"
];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/theloudhouse/images/5/53/Loading_bar.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Perbarui konten';
window.AjaxRCRefreshHoverText = 'Segarkan halaman ini secara otomatis';
 
/* LockForums */
window.LockForums = {
    expiryDays: 30,
    lockMessageWalls: true,
    expiryMessage: 'Utas ini telah diarsipkan karena tidak aktif.'
}; 
 
/* LockOldBlogs */
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Blog ini belum dikomentari selama lebih dari 30 hari. Tidak perlu berkomentar."
};
 
//UserTags config
window.UserTagsJS = {
    modules: {
        inactive: 60,
        userage: true,
        mwGroups: true,
        autoconfirmed: true
    },
    tags: {
            'bot': {link: 'Special:ListUsers/bot'},
            'bureaucrat': {link: 'Special:ListUsers/bureaucrat'},
            'chatmoderator': {link: 'Special:ListUsers/chatmoderator'},
            'content-moderator': {link: 'Special:ListUsers/content-moderator'},
            'rollback': {link: 'Special:ListUsers/rollback'},
            'sysop': {link: 'Special:ListUsers/sysop'},
            'threadmoderator': {link: 'Special:ListUsers/threadmoderator'
    }
    },
};
 
/* Users blocked infinite */
window.addEventListener('load', function() {
	// Timeouts are always a terrible way to go, but UserTags has no event dispatched when it finished loading.
	setTimeout(function() {
		if (document.getElementById('UserProfileMasthead') === null) return;
		var blockTag = document.querySelector('.tag.usergroup-blocked.blocked-user');
		if (blockTag === null) return;
		new mw.Api().get({
			action: 'query',
			list: 'blocks',
			bkprop: 'expiry',
			bktimestamp: new Date().getTime(),
			bkusers: wgTitle
		}).done(function(d) {
			if (d.query.blocks[0] && d.query.blocks[0].expiry == 'infinity') {
				blockTag.innerHTML = 'Shattered';
			}
		});
	}, 250);
});
 
/* to make ReportLog visible */
(function showLogs() {
	var $reportLog = $('.ReportLog');
	ug = mw.config.get('wgUserGroups');
	if ( wgPageName==="Special:WikiActivity" && $reportLog.length === 0) setTimeout(showLogs, 250);
	else if (ug.indexOf('bot') + ug.indexOf('chatmoderator') + ug.indexOf('imagecontrol') + ug.indexOf('rollback') + ug.indexOf('sysop') + ug.indexOf('patroller') + ug.indexOf('bureaucrat') > -7) $reportLog.css('display', 'block');
})();
 
/* Spoiler tag + buttons */
if ($('.spoiler').length) {
    switch (wgCanonicalNamespace) {
        case 'User':
        case 'User_talk':
            $('.UserProfileActionButton .wikia-menu-button').before(
                '<button class="wikia-button" id="toggle-spoiler" title="Show all spoilers on page">Show Spoilers</button>'
            );
            break;
    }
    $('.wikinav2 .WikiaPageHeader').css('padding-right', '0');
    $('#WikiaPageHeader .comments').after(
        '<button class="wikia-button" id="toggle-spoiler" title="Show all spoilers on page">Show Spoilers</button>'
    );
}
$('#toggle-spoiler').click(function() {
    if ($('.spoiler.on, .spoiler.off').length) {
        $('.spoiler').attr('class', 'spoiler').removeAttr('title');
        $('.wikia-button#toggle-spoiler').attr('title', 'Hide all spoilers on the page').html('Hide Spoilers');
    } else {
        $('.spoiler').attr('class', 'spoiler on').attr('title', 'click to show the spoilers');
        $('.wikia-button#toggle-spoiler').attr('title', 'Show all spoilers on page').html('Show Spoilers');
    }
});
 
var spoilerConfig = function(i, el) {
    var $el = $(el);
    $el.attr('title', 'click to show the spoilers');
    $el.click(function() {
        var $this = $(this);
        if ($this.hasClass('on'))
            $this.attr('class', 'spoiler off').removeAttr('title');
        else
            $this.attr('class', 'spoiler on').attr('title', 'click to show the spoilers');
    });
};
 
$('.spoiler.on').each(spoilerConfig);
 
// Fix for Article comments.
if ( wgIsArticle ) {
    var fixPagination = function() {
        // Fix for bad HTML code. Funnily enough, this cannot be made with jQuery,
        // or ArticleComments.setPage will stop working.
        var paginations = Array.from(document.getElementsByClassName('article-comments-pagination'));
        for (var i in paginations) {
            var childNodes = Array.from(paginations[i].childNodes);
            for (var child in childNodes) {
                var childElement = childNodes[child];
                if (childElement.nodeType == 3) {
                    childElement.nodeValue = ' ... ';
                }
            }
        }
    };
    $(document).on('DOMNodeInserted', '#article-comments .spoiler.on', spoilerConfig);
    $(document).on('DOMNodeInserted', '.article-comments-pagination', fixPagination);
    var AC = ArticleComments.init;
    ArticleComments.init = function() {
        AC();
        $('#article-comments .spoiler.on').each(spoilerConfig);
        fixPagination();
        $('#article-comm').attr('placeholder', 'Remember, leaks are strictly prohibited on this wiki! If you are unsure if something is a leak or not, please contact an admin.');
    };
}