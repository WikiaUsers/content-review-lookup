/**
 * Always show the WikiaBar (bottom floating bar) on UCP wikis
 * @author Noreplyz
 */
;(function() {
    var isUCP = mw.config.get("wgVersion") !== '1.19.24';
    if (!isUCP) return;
    
    var $bar = document.getElementById('WikiaBarWrapper');
    if (!$bar.classList.contains('hidden')) return;

    mw.loader.using(['mediawiki.user', 'mediawiki.storage'], function () {

        // Immediately show the bar
        document.getElementById('WikiaBarWrapper').classList.remove('hidden');
        var $collapseBar = document.getElementsByClassName('WikiaBarCollapseWrapper');
        if ($collapseBar.length)
            $collapseBar[0].classList.add('hidden');

        // Set localStorage item to keep the state across pages
        var WIKIA_BAR_STATE_USER_KEY_SUFFIX = 'UserWikiaBar_1.0004',
            LOCAL_STORAGE_DATA_KEY = mw.config.get("wgUserName") + '_' + WIKIA_BAR_STATE_USER_KEY_SUFFIX;
        mw.storage.set(LOCAL_STORAGE_DATA_KEY, 'shown');

        // Set the bar to show all the time, on this wiki on all devices
        fetch('/wikia.php?controller=WikiaBar&method=changeWikiaBarState&format=json', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                changeTo: 'shown',
                token: mw.user.tokens.get('csrfToken')
            })
        });
    });
})();