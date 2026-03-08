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

// ---------------------------------------------------------------------
//          RIGHT RAIL MODULE
// ---------------------------------------------------------------------

window.AddRailModule = [
    {
        module: 'Template:RailModule',
        prepend: true
    }
];

// </syntax type="javascript">