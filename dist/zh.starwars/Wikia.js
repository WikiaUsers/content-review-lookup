/* En title */
(function() {
    var $ent = $('#enTitle'),
        $header = $('.page-header__main');
    if ($ent.exists() && $header.exists() && !mw.config.get('wgIsMainPage')) {
        $header.append($ent.clone().css('display', 'block'));
    }
})();

// INACTIVE USER
InactiveUsers = { text: 'inactive' }; 
importScriptPage('InactiveUsers/code.js', 'dev');