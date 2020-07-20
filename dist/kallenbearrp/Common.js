/* Any JavaScript here will be loaded for all users on every page load. */

$(function() {
    $('.username').text(mw.config.get('wgUserName'));
});