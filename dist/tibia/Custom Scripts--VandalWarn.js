/*globals mediaWiki, jQuery, undefined*/
//<source lang="javascript">
(function (mw, $, undefined) {
    "use strict";
    // add names here - these users will have their revisions counted as "trusted"
    var trustedUsers, tips, reasons, currentTime, TRUST_USER_AFTER_TIME, TRUST_REVISION_AFTER_TIME, NUM_REASONS_TO_WARN;
    trustedUsers = [
        'Sixorish',
        'DM',
        'Arkshi',
        'SixBot',
        'Bennie',
        'Wouterboy',
        'Vapaus',
        'Kopcap94',
        'Kesta',
        'Daniel Letalis',
        'Craggles',
        'Art Featherpitch',
        'Beejay',
        'Hunter of Dragoes',
        'Cauli92',
        'Tustanuxo',
        'Mathias',
        'Creon14',
        'Wikif',
        'Gargot',
        'Moj mistrz',
        'Fluffy the Wise',
        'Cidragon',
        'Zinina',
        'RaymondTFR',
        'Tibialover',
        'Alkaline',
        'Gaasmoos',
        '469Bot',
        'Reezow',
        'Jake Command Wolf',
        'Connarhea',
        'Molx',
        'Lord Galarzaa',
        'JO hn',
        'Wirox0',
        'VoydBot'
    ];
    tips = [];
    reasons = [];
    currentTime = +new Date();
    TRUST_USER_AFTER_TIME     = 1000 * 60 * 60 * 24 * 1; // 1 day
    TRUST_REVISION_AFTER_TIME = 1000 * 60 * 60 * 24 * 1; // 1 day
    NUM_REASONS_TO_WARN       = 3;
    function isTrusted(user) {
        return trustedUsers.indexOf(user) !== -1;
    }
    $.ajax({
        url: '/api.php',
        dataType: 'json',
        type: 'POST',
        data: {
            action: 'query',
            prop: 'revisions',
            titles: mw.config.get('wgPageName'),
            rvprop: 'timestamp|user|content|ids',
            rvlimit: '10',
            format: 'json'
        },
        success: function (r) {
            var pageid = -1,
                revs,
                dtRevision,
                lastTrustedRevisionId = -1,
                currentRevisionId = -1,
                currentRevisionUser = "",
                currentRevisionTimestamp = "",
                i;
            // Find the pageid (object key)
            for (pageid in r.query.pages) {
                if (r.query.pages.hasOwnProperty(pageid)) {
                    revs = r.query.pages[pageid].revisions;
                    break;
                }
            }
            currentRevisionId = revs[0].revid;
            currentRevisionUser = revs[0].user;
            currentRevisionTimestamp = revs[0].timestamp;
            dtRevision = (currentTime - new Date(currentRevisionTimestamp));
            // Don't warn if the current revision is old
            if (dtRevision > TRUST_REVISION_AFTER_TIME) {
                return false;
            }
            // If we are viewing an old revision of the page (?oldid=), do not display the warning
            if (mw.config.get('wgRevisionId') !== currentRevisionId) {
                return;
            }
            for (i = 0; i < 10; i += 1) {
                if (isTrusted(revs[i].user)) {
                    lastTrustedRevisionId = revs[i].revid;
                    break;
                }
            }
            tips = [
                "Treat the current revision of this page with suspicion.",
                "Ignore any warnings that your software is out of date. TibiaWiki / Wikia will never say this!",
                "Do not blindly click on links - and if you don't recognize the target, do not click!",
                "If this page seems suspicious, " + (lastTrustedRevisionId !== -1 ? "go to <a href=\"" + mw.config.get('wgPageName') + "?oldid=" + lastTrustedRevisionId + "\">the last known trusted revision</a> or " : "") + "<a href=\"" + mw.config.get('wgPageName') + "?action=history\">see the full edit history</a>."
            ];
            if (lastTrustedRevisionId === currentRevisionId) {
                // This revision is trusted. Don't print any message.
                return;
            }
            $.ajax({
                url: '/api.php',
                dataType: 'json',
                type: 'POST',
                data: {
                    action: 'query',
                    list: 'users',
                    ususers: currentRevisionUser,
                    usprop: 'blockinfo|editcount|emailable|registration',
                    format: 'json'
                },
                success: function (json) {
                    var u, user, dtRegister;
                    for (u in json.query.users) {
                        if (json.query.users.hasOwnProperty(u)) {
                            user = json.query.users[u];
                            break;
                        }
                    }
                    reasons.push("The editor has not been whitelisted.");
                    if (user.editcount < 50) {
                        reasons.push("The editor has a low edit count.");
                    }
                    /* Does this even work?
                    if (user.emailable !== '') {
                        reasons.push("The editor has not confirmed his email address.");
                    }
                    */
                    // NOTE: for more precise calculations we need to consider timezones etc.
                    dtRegister = (currentTime - (+new Date(user.registration)));
                    if (dtRegister < TRUST_USER_AFTER_TIME) {
                        reasons.push("The editor has recently signed up.");
                    }
                    
                    if (reasons.length < NUM_REASONS_TO_WARN) {
                        return;
                    }
                    $("#mw-content-text").prepend([
                        "<div id=\"vandalism-notice\">",
                        "Warning! This page is a possible vandalism target. Please exercise caution while using this page.<br /><br />",
                        "<b>How to stay safe:</b><br />",
                        "<ul><li>" + tips.join("</li><li>") + "</li></ul>",
                        "<b>You are seeing this message because:</b>",
                        "<ul><li>" + reasons.join("</li><li>") + "</li></ul>",
                        "</div>"
                    ].join(""));
                }
            });
        }
    });
}(mediaWiki, jQuery));
//</source>