/*************** Site-wide JavaScript for the Wikia skin (Oasis) ***************/

/*---------- Configure options ----------*/

var SocialMediaButtons = {
    position           : 'top',
    buttonSize         : '50px',
    wikiTwitterAccount : 'LoUatWikia',
    gInactive          : 'https://images.wikia.nocookie.net/lordofultima/images/8/8c/G%2B-wood.png',
    gHover             : 'https://images.wikia.nocookie.net/lordofultima/images/6/6f/G%2B-wood-hover.png',
    fbInactive         : 'https://images.wikia.nocookie.net/lordofultima/images/e/ee/Fb-wood.png',
    fbHover            : 'https://images.wikia.nocookie.net/lordofultima/images/e/ed/Fb-wood-hover.png',
    twitterInactive    : 'https://images.wikia.nocookie.net/lordofultima/images/7/73/Wood-twitter.png',
    twitterHover       : 'https://images.wikia.nocookie.net/lordofultima/images/e/e7/Wood-twitter-hover.png'
};

PurgeButtonText = 'Purge';

var fdButtons = [];
fdButtons[fdButtons.length] = {
    'label': 'Delete'
};

window.RevealAnonIP = {
    permissions: ['sysop', 'bureaucrat']
};

window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxRefresh = 30000; // Refresh-time in milliseconds; Refresh once every 30 seconds.

window.DupImageListIndicator = 'https://images.wikia.nocookie.net/lordofultima/images/5/59/AjaxLoader.gif';

//MessageWallUserTags config
var messageWallUserTags = {
    'Phreakwr': 'Founder',
    'WilliamLazycat': 'Bureaucrat • Admin • GFX',
    'RyaNayR': 'Admin • Coder',
    'BFH-Wiki': 'Rollbacker'
};
window.messageWallTagColor = '#00ae00';


/*---------- Load scripts ----------*/

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:UserTagsConfig.js',
        'MediaWiki:SocialIcons.js',
        'MediaWiki:PurgeButton.js',
        'MediaWiki:FastDelete.js',
        'MediaWiki:DupImageList.js',
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:ListAdmins/code.js',
        'u:dev:AjaxRC/beta.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:HeaderLinks/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:MessageWallUserTags/code.js'
    ]
});


/*---------- Custom functions ----------*/

// Set Wordmark image and attributes
$('#WikiHeader .wordmark img, #EditPageHeader .wordmark img').removeAttr('width height src').attr({
    src: 'https://images.wikia.nocookie.net/lordofultima/images/c/cf/LoU-Wiki-Logo.png'
});

// Change image for redirect-arrow
$('.redirectMsg img').attr({
    src   : 'https://images.wikia.nocookie.net/lordofultima/images/f/f2/Msc_forum_post_arrow.png',
    style : 'margin: 0 6px 10px 0;'
});

// Fix search-bar position on message walls
if (mediaWiki.config.get('wgNamespaceNumber') === 1201) {
    $('.WikiaPage .WikiaRail').css('padding-top', '0');
}

// CSS overrides
$('.WikiaSearch .wikia-button').attr('style', 'height: 25px !important;');
$('#wpSave').attr('style', 'height: 22px !important;');
$('.WikiaSearch input[type="text"], .WikiaSearch input[type="text"]:focus').attr('style', 'height: 16px !important;');

// Fix link on WikiNav
//$('li.nav-item:nth-child(5) > ul:nth-child(2) > li:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)')
//    .attr('href', 'http://forum.lordofultima.com/forum.php');
//console.log('test');


// Load ExtendedNavigation for the preview module
$(document).ready(function() {
    if (window.mediaWiki.config.get('skin') === 'oasis' && window.mediaWiki.config.get('wgAction') === 'edit') {
        $(window).on('EditPageAfterRenderPreview', function(ev, popup) {
            mw.loader.load('//dev.wikia.com/index.php?title=ExtendedNavigation/code.js&action=raw');
            $(document).on('DOMNodeInserted', function() {
                $('.global-notification.error').remove();
            });
            $('.neutral.modalToolbar').append('<a class="wikia-button" id="publish">Publish</a>');
        });
    }
});


/***  ***/
(function($) {
    var a = $('#1 > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)');
    var b = $(a).html().replace('closed this thread because:', 'closed this thread.');

    $('#1 > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)').html(b);
}(jQuery));