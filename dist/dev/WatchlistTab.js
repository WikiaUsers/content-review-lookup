/*
 * @title       WatchlistTab.js
 * @version     1.0.0
 * @description Adds a tab leading to Special:EditWatchlist to your masthead
 * @author      Himmalerin
 * @license     CC-BY-SA-3.0
 */

(function () {
    'use strict';
    if (window.wlLoaded) return;
    window.wlLoaded = true;

    // Cache the wg variables we use
    var wlConf = mw.config.get([
        'wgTitle',
        'wgUserName',
        'wgNamespaceNumber',
        'wgUserLanguage',
    ]);

    mw.loader
        .using(['mediawiki.util', 'mediawiki.api', 'mediawiki.jqueryMsg'])
        .then(function () {
            // Make sure the watchlist message has been loaded
            return new mw.Api().loadMessagesIfMissing(['watchlist']);
        })
        .then(function () {
            // Only run on your userpage. Since wgUserName is null for anons this
            // doesn't work for them
            if (
                wlConf.wgTitle == wlConf.wgUserName &&
                wlConf.wgNamespaceNumber == 2
            ) {
                // Wait until the masthead has appeared to run
                var interval = setInterval(function () {
                    if ($('#userProfileApp .user-profile-navigation').length) {
                        clearInterval(interval);
                        // Find the tab list
                        var profileNavigation = document.querySelector(
                            '#userProfileApp .user-profile-navigation'
                        );

                        // Create the tab li
                        var wlTab = document.createElement('li');
                        wlTab.className = 'user-profile-navigation__link false';

                        // Create the tab link
                        var wlLink = document.createElement('a');
                        wlLink.textContent = mw.message('watchlist').text();
                        wlLink.setAttribute(
                            'href',
                            mw.util.getUrl('Special:EditWatchlist')
                        );

                        // Add the tab
                        wlTab.appendChild(wlLink);
                        profileNavigation.appendChild(wlTab);
                    }
                }, 1000);
            }
        });
})();