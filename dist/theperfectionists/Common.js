/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('MediaWiki:WallGreetingButton/code.js', 'dev');
 
/* Username Detector */
$(function() {
    $('.insertusername').text(mw.config.get('wgUserName'));
});