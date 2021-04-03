//<nowiki>

//==========================================================
// Allows CSS to target pages with a specific template. 
// Made by KockaAdmiralac upon request.
//==========================================================

$('body').attr('data-topic', $('#mw-content-text .article-topic').attr('data-topic'));


//==============
// Ajax Rename
//==============

if (wgUserGroups.includes("chatmoderator") ||
    wgUserGroups.includes("rollback") ||
    wgUserGroups.includes("threadmoderator") ||
    wgUserGroups.includes("content-moderator") ||
    wgUserGroups.includes("sysop")) {
        importScriptPage("MediaWiki:AjaxRename/code.js", "dev");
}

//==========================
// AjaxRC Configuration 
//==========================

window.ajaxPages = new Array(
    "Blog:Recent posts",
    "Special:WikiActivity",
    "Special:Watchlist",
    "Special:Images",
    "Special:ListFiles",
    "Special:Log",
    "Special:Contributions",
    "Special:RecentChangesLinked",
    "Special:RecentChanges"
);
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/deathbattlefanon/images/d/de/Ajax-loader.gif/revision/latest?cb=20200828094018';

//=============================================
// Test if an element has a certain class.
// Increases general performance.
//=============================================

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = 
        new RegExp("(?:\\s|^)" + className + "(?:\\s|$)")))
        .test(element.className);
};})();

//=======================================================================
// Prompt users if they didn't sign their posts on the Forum
//=======================================================================

window.i = window.i || 0;
 
window.SignatureCheckJS = {
	preamble: 'Hold up a sec...',
	noSignature: 'Please sign your post with three or four consecutive tildes (~~' + 
				  '~~) or, if applicable, your custom signature template. It is important and required that you do so.',
	noForumHeader: 'There is no forum header on this forum page. You may not create forum pages without the header or \
					remove it from existing posts since they will not actually show up in the forum list.',
	epilogue: 'Please correct your message. Proceeding regardless will incur a warning or other action by the admins.',
	forumheader: 'Forumheader',
	checkSignature: true,  // Enable the signature check function
    extraNamespaces: [{    // Enable signature checking on other namespaces and subpages can be omitted
                        namespace: 5,
                        patterns: ['/Archive'],
                    }, {
                        namespace: 9,
                        patterns: ['/Archive'],
                    }, {
                        namespace: 11,
                        patterns: ['/Archive'],
                    }, {
                        namespace: 13,
                        patterns: ['/Archive'],
                    }, {
                        namespace: 15,
                        patterns: ['/Archive']
                    }, {
                        namespace: 7,
                        patterns: ['/Archive']
                    }, {
                        namespace: 110,
                        patterns: ['/Archive']
                    }
 
]};

//=========================
// Spoiler Alert Code
//=========================

window.SpoilerAlertJS = {
    question: "This page potentially contains spoilers or otherwise important information initially concealed. Are you sure want to see them?",
    yes: 'Yes',
    no: 'No',
    fadeDelay: 625
};

//===========================
// Standard Edit Summaries
//===========================

window.dev = window.dev || {}; //Required for SES to work

window.dev.editSummaries = {
    select: new Array(
        '(click to browse)',
        'Fixes', [
            'Cleanup',
            'Correcting spelling/grammar',
            'Rewriting page to fit standard format',
            'Fixing HTML / Wikitext',
            'Removing / replacing duplicate information / images',
            'Fixing broken link',
            'Correcting false template usage',
            'Rewording information'
         ],
         'Content revision', [
           'Upgrade',
           'Downgrade',
           'Revising information',
           'Replacing images',
           'Adding keys',
           'Removing keys',
           'Adding a key',
           'Removing a key',
           'Adding a power',
           'Adding powers',
           'Removing a power',
           'Removing powers',
           'Changing a power',
           'Changing powers'
        ],
        'Reverts', [
          'Reverting vandalism',
          'Removing spam',
          'Removing hate speech',
          'Removing copyright violation',
          'Reverting test edit'
        ],
        'Categories', [
          'Changing category',
          'Changing categories',
          'Removing unneeded category',
          'Removing unneeded categories'
        ],
        'CSS (admins only)', [
          'Fixing / removing broken CSS',
          'Adding CSS',
          'Changing CSS',
          'Removing customization policy violations',
          'Removing flashy / eye hurting modifications',
          "Ranked users' usernames, comments or messages",
          'Fixes',
          'Changing HTTP to HTTPS',
          'Adding import',
          'Changing import',
          'Removing import',
          'Adding a page background'
        ],
        'ImportJS (admins only)', [
          'Adding a script',
          'Removing a script',
          'Replacing a script',
          'Correcting import'
        ],
        'Miscellaneous', [
          'Adding content to userpage', // Userpages only
          'Adding a comment to the Source editor', // <!-- stuff -->
          'Adding reply', // For talk page-style pages
          'Signing guestbook', // For users with guestbooks on their userpages
          'Created page',
          'Adding sources'
        ]
    )
};

//=========================================================
// Makes {{Username}} display the username of the visitor
// Requires copying of Template:Username
//=========================================================
 
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) !== 'undefined' 
    && disableUsernameReplace || wgUserName === null) return;
    $(".InsertUsername").html(wgUserName);
});
 
//==============================================================
// Sorts content on Special:WhatLinksHere alphabetically
//==============================================================
 
(function($) {
    if (wgCanonicalSpecialPageName !== 'Whatlinkshere') return;
    var sorted_list,
        $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > 
        $(b).find('a:first').attr('title')) ? 1 : -1;});
    $list.children('li').remove();
    $list.append(sorted_list);
})(jQuery);
 
////////////////////////////////////////////////////////////////////////////////
///////////////// START CODES TAKEN FROM ONETWOTHREEFALL'S GLOBAL JS ///////////
////////////////////////////////////////////////////////////////////////////////

// Adds links to Special:WhatLinksHere to edit pages linked on it.

if (mw.config.get('wgCanonicalSpecialPageName') === 'Whatlinkshere') {
    $('#mw-whatlinkshere-list > li').each(function (ignore, element) {
        var link = new mw.Uri($(element).children('a').attr('href'));
        link.extend({action: 'edit'});
        $(element).find('.mw-whatlinkshere-tools > a:last-child')
            .after(' | ', $('<a>').attr('href', link.toString()).text('edit'));
    });
}

// Adds separate list of uncreated categories on Special:Categories.

if (mw.config.get('wgCanonicalSpecialPageName') === 'Categories') {
    var $newCats = $('<div>').css('float', 'right').text('Uncreated categories:');
    var $newCatsList = $('<ul>').appendTo($newCats);
    $('.mw-spcontent > ul').before($newCats);
    $('.mw-spcontent > ul > li').has('.newcategory').clone().appendTo($newCatsList);
}

// Adds a button to clear Deletion reasons

if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').after(' <span id="wpClearReason" class="button">\u232b</span>');
    $('#wpClearReason').click(function () {
        $('#wpReason').val('').focus();
    });
}

// Expand collapsed information on Recent Changes and Watchlist

if ($.inArray(mw.config.get('wgCanonicalSpecialPageName'), ['Recentchanges', 'Recentchangeslinked', 'Watchlist']) !== -1) {
    $(window).load(function () {
        $('.mw-collapsible-toggle-collapsed').click();
    });
}

////////////////////////////////////////////////////////////////////////////////
///////////////// END CODES TAKEN FROM ONETWOTHREEFALL'S GLOBAL JS /////////////
////////////////////////////////////////////////////////////////////////////////