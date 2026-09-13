/* Any JavaScript here will be loaded for all users on every page load. */

/* All script imports in MediaWiki:ImportJS */

// NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true
};

/* BackToTop */
window.BackToTopModern = true;

/* Spoiler */
window.SpoilerAlert = {
  categories: "Spoiler",
};

/* UserTag */
window.UserTagsJS = {
    modules: {},
    tags: {
        bureaucrat: { order:-1 },
        sysop: { order:0 },
        bot: { u: 'AutoBot', order:50 }
    }
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.metafilter = {
	'autoconfirmed': []
};

UserTagsJS.modules.newuser = {
	days: 14, // Must have been on the Wiki for 14 days
	edits: 50, // And have at least 50 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};

importArticles({
    type: "style",
    articles: [
        "w:c:dev:MediaWiki:FontAwesome.css"
    ]
});

// prevent data-hash by tabber
(function () {
    'use strict';

    function removeTabberHash() {
        if (!window.location.hash) {
            return;
        }

        history.replaceState(
            history.state,
            document.title,
            window.location.pathname + window.location.search
        );
    }

    document.addEventListener('click', function (event) {
        var tabLink = event.target.closest(
            '.wds-tabber .wds-tabs__tab-label a'
        );

        if (!tabLink) {
            return;
        }

        window.setTimeout(removeTabberHash, 0);
        window.setTimeout(removeTabberHash, 50);
        window.setTimeout(removeTabberHash, 200);
    });
})();