/* Any JavaScript here will be loaded for all users on every page load. */


// MediaWiki:Common.js
// Show ADMIN badge on user profile pages for certain usergroups

var api = new mw.Api();

var config = mw.config.get([
    'wgAction',
    'wgArticlePath',
    'wgCanonicalSpecialPageName',
    'wgPagename',
    'wgTitle',
    'wgSiteName'
]);


$(function () {
    if (mw.config.get("wgTitle") === "Value") {

        var notice = $('<div><b>'
            + 'Trading values are just opinions, and do not matter much. '
            + 'They only depend on trades, popularity, rarity, less owned, etc.'
            + '</b></div><br>');

        // Insert at the top of the article content
        $('#mw-content-text').prepend(notice);
    }
});


( function () {
    'use strict';

    // groups to check (Fandom / MediaWiki group names)
    var targetGroups = ['sysop', 'content-moderator', 'threadmoderator', 'bureaucrat'];

    // Only run on User pages (namespace number 2 on most wikis)
    if ( mw.config.get('wgNamespaceNumber') !== 2 ) {
        return;
    }

    var profileUser = mw.config.get('wgTitle'); // username part of page title

    if ( !profileUser ) {
        return;
    }

    var api = new mw.Api();

    // Helper: test intersection
    function hasIntersection(arr1, arr2) {
        var s = {};
        for (var i = 0; i < arr1.length; i++) s[arr1[i]] = true;
        for (var j = 0; j < arr2.length; j++) if (s[arr2[j]]) return true;
        return false;
    }

    // Get the user's groups
    api.get({
        action: 'query',
        list: 'users',
        ususers: profileUser,
        usprop: 'groups',
        format: 'json'
    }).done(function (d) {
        try {
            var users = d.query && d.query.users;
            if (!users || !users.length) return;
            var groups = users[0].groups || [];

            // If the profile owner is in any of the target groups, proceed
            if (!hasIntersection(groups, targetGroups)) return;

            // Get direct file URL for the badge image (first try Special:FilePath)
            var fallbackFilePath = mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?title=Special:FilePath&file=ADMINBADGE.png';

            // But better: query imageinfo to get canonical URL
            api.get({
                action: 'query',
                titles: 'File:ADMINBADGE.png',
                prop: 'imageinfo',
                iiprop: 'url',
                format: 'json'
            }).done(function (res) {
                var imageUrl = fallbackFilePath;
                if (res && res.query && res.query.pages) {
                    for (var k in res.query.pages) {
                        if (res.query.pages[k].imageinfo && res.query.pages[k].imageinfo[0] && res.query.pages[k].imageinfo[0].url) {
                            imageUrl = res.query.pages[k].imageinfo[0].url;
                            break;
                        }
                    }
                }

                // Build the badge element
                var $badge = $('<a>')
                    .attr('href', mw.util.getUrl('File:ADMINBADGE.png'))
                    .attr('title', 'Staff badge')
                    .addClass('custom-admin-badge-link')
                    .css({ 'display': 'inline-block', 'vertical-align': 'middle' })
                    .append(
                        $('<img>')
                        .attr('src', imageUrl)
                        .attr('alt', 'Admin badge')
                        .addClass('custom-admin-badge')
                        .css({
                            'height': '28px',
                            'width': 'auto',
                            'margin-left': '6px',
                            'vertical-align': 'middle'
                        })
                    );

                // Try multiple selectors to insert the badge into the profile masthead
                var selectors = [
                    '.page-header__user',           // some newer skins
                    '.masthead-info .username',     // Fandom classic
                    '.profile-info .username',      // fallback
                    '.masthead-avatar',             // avatar area
                    '.profile-identity',            // another fallback
                    '#WikiaUserPagesHeader'         // older
                ];

                var $insertTarget = null;
                for (var i = 0; i < selectors.length; i++) {
                    var sel = selectors[i];
                    var $el = $(sel).first();
                    if ($el && $el.length) {
                        $insertTarget = $el;
                        break;
                    }
                }

                // If we found nothing, append to the top of the page as a last resort
                if (!$insertTarget) {
                    $insertTarget = $('h1').first() || $('body');
                }

                // Append the badge after the username element
                $insertTarget.append($badge);

            }).fail(function () {
                // If imageinfo query fails, fall back to special file path link + image
                var imageUrl = mw.config.get('wgServer') + '/wiki/Special:FilePath/ADMINBADGE.png';
                var $badgeFallback = $('<a>')
                    .attr('href', mw.util.getUrl('File:ADMINBADGE.png'))
                    .attr('title', 'Staff badge')
                    .append($('<img>').attr('src', imageUrl).css({ 'height': '28px', 'margin-left': '6px' }));
                // append fallback
                $('h1').first().append($badgeFallback);
            });

        } catch (e) {
            // silently fail to avoid breaking the page
            window.console && console.error && console.error('admin-badge script error', e);
        }
    }).fail(function () {
        // API failed; do nothing
    });

})();


// Insert warning text at top of page if title is "Lore"
$(function () {
    if (mw.config.get("wgPageName") === "Trading Value") {

        var notice = $('<div><b>'
            + 'Trading values do not exist in Pet Story.'
            + 'It is mostly based on how many people want it, trade for it, and the items value.'
            + '</b></div><br>');

        // Insert at the top of the article content
        $('#mw-content-text').prepend(notice);
    }
});