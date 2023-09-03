$(function() {
    if(mw.config.get('wgUserName')) {
        $('.insertusername').html(mw.config.get('wgUserName'));
    }
});