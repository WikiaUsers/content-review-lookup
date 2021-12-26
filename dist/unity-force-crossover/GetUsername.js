//PARSES USERNAME
//CODE DERIVED FROM https://community.fandom.com/f/p/2751425935310850967
$(function($, user) {
    if (user !== '') {
        $('.insertusername').text(user);
    }
}(window.jQuery, (window.mw.config.get('wgUserName') || '')));