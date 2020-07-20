// Configure AjaxRC
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:NewFiles",
    "Special:NewPages",
    "Special:ListFiles",
    "Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh every 60secs';
window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ListFiles/code.js',
        'u:dev:AjaxBatchDelete/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:AjaxRC/code.js',]
});
 importScriptPage('MediaWiki:Chat.js/options.js','cod');
 
$(document).ready(function() {
    $('&nbsp;|&nbsp;<a href="/wiki/User_talk:' + wgUserName + '" target="_blank">Talk</a>').insertAfter('.ChatWindow .ChatHeader .User .username');
});
// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions: ['sysop', 'bureaucrat']
};
 
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)) {
    importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}
 
// Custom Special:[Multiple]Upload UI
if (({
    Upload: 1,
    MultipleUpload: 1
})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
    pageScriptList.push(
        'MediaWiki:Common.js/FairUseUpload.js',
        'MediaWiki:Common.js/FixMultipleUpload.js' // Fix the Special:MultipleUpload page
    );
}
 
// List Duplicate images
if (mw.config.get('wgPageName') === 'Biblicalapedia:Duplicate_Images') {
    pageScriptList.push('u:dev:DupImageList/code.js');
}
importScriptPage('Voice_Dictation/voice.js', 'dev');
$.getScript("https://raw.github.com/sactage/wikia-js-snippets/master/RollbackMods.js");