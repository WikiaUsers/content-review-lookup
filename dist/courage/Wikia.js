/* Any JavaScript here will be loaded for all users on every page load. */
/*jshint multistr: true */

/*------ Config ------*/
window.cacheSkip = [];
window.cacheSkipLimit = 1000;
window.galleryButtonIconHidden = false;
window.galleryButtonText = 'Add photo / Edit gallery';
window.DisplayClockJS = {location: 'global'};
window.DupImageListIndicator = 'https://images.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif';
window.rcArrowRight = 'https://vignette.wikia.nocookie.net/courage/images/e/e3/Arr_r-dark-theme.png';
window.rcArrowDown = 'https://vignette.wikia.nocookie.net/courage/images/0/0d/Arr_d-dark-theme.png';

var fdButtons = [];
fdButtons[fdButtons.length] = {
    'label': 'Quick Delete'
};

// AjaxRC Config
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:Watchlist',
    'Special:Log',
    'Special:Contributions'
];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/courage/images/d/de/Ajax-loader.gif';
window.ajaxRefresh = 30000;
 // ajaxCallAgain — Re-run functions after AjaxRC refreshes the page.
window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain.push(window.rcArrow);


/*------ Load scripts ------*/
/*
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:AjaxRC.js',
        'MediaWiki:PurgeButton.js',
        'MediaWiki:FastDelete.js',
        'MediaWiki:FloatingToc.js',
        'MediaWiki:CategoryRenameAuto-update.js'
    ]
});
*/

/* w:c:dev:FileUsageAuto-update: Allows for updating file-links across all pages when renaming an image
if (wgPageName.indexOf('Special:MovePage/File:') !== -1 || (wgCanonicalNamespace === 'File' && Storage)) {
    importScriptPage('FileUsageAuto-update/code.js/min.js', 'dev');
}*/


/*------ End load scripts ------*/


/*======================== Customizations & Functions ========================*/

/* Add WhatLinksHere on redirect pages:
(function ($) {
    $('.redirectText').append('<br/><span id="redirectWLH">→ <a class="redirectWLH-link" href="/wiki/Special:WhatLinksHere/'
        + mw.config.get('wgPageName')
        + '">Links pointing to this redirect</a></span>');
    $('.redirectMsg img').attr('src', 'https://images.wikia.nocookie.net/dev/images/a/aa/Redirectltr-inverted.png');
})(jQuery); */

// Add WhatLinksHere on redirect pages:
(function ($) {
    $('.redirectText').append(
        '<a class="redirectWLH" href="/wiki/Special:WhatLinksHere/'
        + mw.config.get('wgPageName')
        + '">→ Links pointing to this redirect</a>'
    );
})(jQuery);
// END redirectWLH

// Special:RecentChanges multi-edit list expansion arrow
(function rcArrow ($) {
    $('.mw-rc-openarrow img').attr('src', window.rcArrowRight);
    $('.mw-rc-closearrow img').attr('src', window.rcArrowDown);
})(jQuery);

// Cleanup template
(function cleanupTemplate ($) {
    var cleanupImgHTML = '<a class="image" href="https://images.wikia.nocookie.net/courage/images/1/12/Cleanup.png"><img id="CleanupImg" alt="Courage-Cleanup" src="https://images.wikia.nocookie.net/courage/images/thumb/1/12/Cleanup.png/132px-Cleanup.png" width="132" height="99" data-image-name="Cleanup.png" data-image-key="Cleanup.png"/></a>';

    $('#CleanupNotice').prepend(cleanupImgHTML);

    if ( $('#CleanupReason').length && !$('.ns-10').exists() ) {
        $('#CleanupImg').css('margin-top', '3%');
    }
}(jQuery));

// Candidate for deletion template JS
(function deleteTemplateJS ($) {
    if ($('#delete').width() > 700) {
        $('#deleteImg img').each(function(){
            var y = ($('#delete').height() - $(this).height()) / 2;
                y = Math.round(y);
            var x = (y / 4);
                x = Math.round(x),
                y = y - ($('#delete').css('paddingTop').slice(0,-2) / 2),
                y = Math.round(y);
            
            $(this).css({
                position: 'relative',
                right: x + 'px',
                top: y + 'px'
            });
        });
    }
    if ($('#delete').width() < 700) {
        $('#deleteImg img').css({
            position: 'relative',
            top: '22px',
            right: '22px'
        });
    }
}(jQuery));

// Thumbnails
(function ($) {
    var thumbCSS = '\
.WikiaArticle figcaption.thumbcaption { padding: 0 }\
.WikiaArticle .magnify { margin: -20px 4px 0 0 }\n';
    $('.WikiaArticle .picture-attribution').remove();
    if ($('.WikiaArticle figcaption.thumbcaption').text()) mw.util.addCSS(thumbCSS);
})(jQuery);

// "Rename/Move" Button
(function ($) {
    $('#ca-move').load(function(){
        $(this).text('Rename / Move');
    });
})(jQuery);


/************
var blah = $('#DisplayClockJS');
$('.subnav-2').after(blah);
************/

// $('#WallNotifications .bubbles').append('<img class="envelope" src="https://images.wikia.nocookie.net/courage/images/0/02/Envelope.png">');

/************/
(function ($) {
    $('.emptymwmsg.mediawiki_historywarning').remove();
})(jQuery);
/************/