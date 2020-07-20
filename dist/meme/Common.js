/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('ProtectedHighlight/code.js', 'dev');

$('.insertusername').text(mw.config.get('wgUserName'));

window.railWAM = {
    logPage:"Project:WAM Log"
};