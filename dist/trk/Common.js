console.log("TRK JS LOADED");
// MediaWiki:Common.js
importArticle({ type: 'script', article: 'u:dev:Tabber/code.js' });
importScriptPage('Countdown/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');
/* Spoiler Alert */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
  },
    back: true
};
importScriptPage('SpoilerAlert/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');

$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

// Countdown Timer Script
/* Imports */
importArticles({
    type: 'script',
    articles: [
        "u:dev:MediaWiki:Countdown/code.js"  // Countdown timer
    ]
});

// Configuration for Pathway application form
window.adoptInternational = {
    unsupportedLanguages: window.communityRequestsUnsupportedLangs,
    adoptionConfig: {
        blockDays: 0,
        activeDays: 30,
        permissionTypes: [
            'bureaucrat',
            'sysop',
            'content-mod',
            'thread-mod'
        ],
    },
    pageConfig: {
        namespace: 'Pathway application',
        namespaceId: 118,
        adoptionsPage: 'Pathway:Applications'
    },
    wikitextSchema: "{{bStart}}Pathway application\n" +
    "|1-Wiki User       = {{userName}}\n" +
    "|2-Discord User    = {{{DiscordURL}}}\n" +
    "|3-Rights type     = {{permissionsType}}\n" +
    "|4-Block history   = {{blockDays}}\n" +
    "|5-User activity   = {{activeDays}}\n" +
    "|6-Your motivation = <nowiki>{{comments}}</nowiki>\n" +
    "{{bEnd}}"
};

// Configuration for NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop',
        'threadmoderator',
        'content-moderator',
        'rollback'
    ]
};
// Countdown template
mw.loader.using(['mediawiki.util']).then(function () {

    function runCountdown() {
        const elements = document.querySelectorAll('.trk-countdown');

        if (!elements.length) return;

        elements.forEach(function (el) {
            const targetAttr = el.getAttribute('data-target');
            if (!targetAttr) return;

            const target = parseInt(targetAttr) * 1000;
            const textEl = el.querySelector('.trk-countdown-text');

            function update() {
                const now = Date.now();
                let diff = target - now;

                if (diff <= 0) {
                    textEl.innerHTML = "RELEASED";
                    return;
                }

                const days = Math.floor(diff / 86400000);
                diff %= 86400000;

                const hours = Math.floor(diff / 3600000);
                diff %= 3600000;

                const mins = Math.floor(diff / 60000);
                diff %= 60000;

                const secs = Math.floor(diff / 1000);

                textEl.innerHTML =
                    days + " DAYS, " +
                    hours + " HOURS, " +
                    mins + " MIN, " +
                    ("0" + secs).slice(-2) + " SEC";
            }

            update();
            setInterval(update, 1000);
        });
    }

    // 🔥 THIS is the important part (Fandom-safe hook)
    $(runCountdown);
});