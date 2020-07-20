//username command 
$(function($, user) {
    if (user !== '') {
        $('.insertusername').text(user);
    }
}(window.jQuery, (window.mw.config.get('wgUserName') || '')));