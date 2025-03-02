/**
 * Name:        Minimalism - Files.js
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Makes file history table collapsible
 */
mw.loader.using('jquery.makeCollapsible').then(function() {
    var $fileHistory = $('.wikitable.filehistory');
    if ($fileHistory.length) {
        $fileHistory.addClass('mw-collapsed').makeCollapsible();
    }
});