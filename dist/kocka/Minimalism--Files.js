/**
 * Name:        Minimalism - Files.js
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Version:     v1.0
 * Description: Makes file history table collapsible
 */
(function() {
    var $fileHistory = $('.wikitable.filehistory');
    if ($fileHistory.exists()) {
        $fileHistory.addClass('mw-collapsed').makeCollapsible();
    }
})();