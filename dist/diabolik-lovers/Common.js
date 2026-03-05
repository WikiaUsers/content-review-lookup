/* Any JavaScript here will be loaded for all users on every page load. */

/* global $, mw */

// <syntax type="javascript">

// ---------------------------------------------------------------------
//       CONFIG SHORTCUT
// ---------------------------------------------------------------------

var config = mw.config.get.bind(mw.config);

// ---------------------------------------------------------------------
// UPLOAD PAGE: PRELOAD FAIR USE RATIONALE
// ---------------------------------------------------------------------

function preloadUploadDesc() {
    if (config('wgCanonicalSpecialPageName') !== 'Upload') return;

    var desc = document.getElementById('wpUploadDescription');
    if (!desc) return;

    var text = [
        '{{Fair use rationale',
        '| Description       = ',
        '| Source            = ',
        '| Portion           = ',
        '| Purpose           = ',
        '| Resolution        = ',
        '| Replaceability    = ',
        '| Other Information = ',
        '}}'
    ].join('\r');

    desc.appendChild(document.createTextNode(text));
}

// ---------------------------------------------------------------------
//       AJAXRC / AUTO-REFRESH CONFIG
// ---------------------------------------------------------------------

window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ['Special:RecentChanges', 'Special:WikiActivity'];

// ---------------------------------------------------------------------
//          PURGE BUTTON CONFIG
// ---------------------------------------------------------------------

window.PurgeButtonText = 'Purge';

// ---------------------------------------------------------------------
//        IMPORTED SCRIPTS & STYLES
// ---------------------------------------------------------------------

/* importScriptPages-start */
importArticles(
    {
        type: 'script',
        articles: [
            // Local placeholder (empty but harmless)
            'MediaWiki:Common.js/Toggler.js',
            /* Load custom link preview script */
            'MediaWiki:LinkPreview.js',

            // Dev Wiki tools
            'u:dev:AjaxBatchDelete/code.2.js',
            'u:dev:AjaxRC/code.js',
            'u:dev:AllPagesHideRedirect/code.js',
            'u:dev:AutoEditDropdown/code.js',
            'u:dev:BackToTopButton/code.js',
            'u:dev:Countdown/code.js',
            'u:dev:ExternalImageLoader/code.js',
            'u:dev:ListFiles/code.js',
            'u:dev:PurgeButton/code.js',
            'u:dev:ReferencePopups/code.js',
            'u:dev:SignatureCheck/code.js',
            'u:dev:ShowHide/code.js',
            'u:dev:MediaWiki:AbuseLogRC.js',
            'u:dev:FileUsageAuto-update/code.js'
        ]
    },
    {
        type: 'style',
        article: 'u:dev:Highlight/code.css'
    }
);
/* importScriptPages-end */

// ---------------------------------------------------------------------
//            USERNAME REPLACEMENT
// Replaces {{USERNAME}} with the name of the user browsing the page.
// Requires Template:USERNAME.
// ---------------------------------------------------------------------

function userNameReplace() {
    if (window.disableUsernameReplace) return;

    var userName = config('wgUserName');
    if (!userName) return;

    $('span.insertusername').text(userName);
}

// ---------------------------------------------------------------------
//            FIX SEARCH RESULT LINKS
// (Kept for compatibility with older search behavior)
// ---------------------------------------------------------------------

function fixSearchResultLinks() {
    $('ul.mw-search-results a').each(function () {
        var $a = $(this);
        var title = $a.text().replace(/ /g, '_');
        var encoded = encodeURIComponent(title).replace(/%3A/g, ':');
        var path = config('wgArticlePath').replace('$1', encoded);
        $a.attr('href', path);
    });
}

// ---------------------------------------------------------------------
//          MOBILE / HANDHELD DETECTION
// Shows spans with class "tt_for_handy" on handheld devices.
// ---------------------------------------------------------------------

function ttforhandy() {
    var agents = [
        'Windows CE', 'Pocket', 'Mobile',
        'Portable', 'Smartphone', 'SDA',
        'PDA', 'Handheld', 'Symbian',
        'WAP', 'Palm', 'Avantgo',
        'cHTML', 'BlackBerry', 'Opera Mini',
        'Nokia', 'Android', 'Nintendo DSi'
    ];

    var ua = navigator.userAgent;
    var isHandheld = agents.some(function (agent) {
        return ua.indexOf(agent) > -1;
    });

    if (!isHandheld) return;

    var spans = document.getElementsByTagName('span');
    for (var i = 0; i < spans.length; i++) {
        if (spans[i].className === 'tt_for_handy') {
            spans[i].style.display = 'inline';
        }
    }
}

// ---------------------------------------------------------------------
//          FILE LINKS AUTO UPDATE
// (FileUsageAuto-update is already imported above)
// ---------------------------------------------------------------------

function fileLinksAutoUpdate() {
    var pageName = config('wgPageName') || '';
    var ns = config('wgCanonicalNamespace');

    if (
        pageName.indexOf('Special:MovePage/File:') !== -1 ||
        (ns === 'File' && window.Storage)
    ) {
        // Script already loaded via importArticles
    }
}

// ---------------------------------------------------------------------
//          MAIN INITIALIZATION
// ---------------------------------------------------------------------

mw.loader.using(['mediawiki.util', 'jquery'], function () {
    $(function () {
        preloadUploadDesc();
        userNameReplace();

        if (
            config('wgNamespaceNumber') === -1 &&
            config('wgCanonicalSpecialPageName') === 'Search'
        ) {
            fixSearchResultLinks();
        }

        ttforhandy();
        fileLinksAutoUpdate();
    });
});

// </syntax type="javascript">