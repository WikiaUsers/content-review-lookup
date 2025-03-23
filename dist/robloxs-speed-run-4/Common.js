/* Any JavaScript here will be loaded for all users on every page load. */

//Locks old comments that are 30 days old
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;

//Topic Block log
TBL_GROUP = "roblox-en";

//No image preview
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = "https://static.wikia.nocookie.net/47d54da7-58be-4f8d-8562-81309da0b108/scale-to-width/1000";
const pageToolsModuleHeading = document.querySelector(".page-tools-module .rail-module__header");

//Back To Top Button
window.BackToTopModern = true;
window.BackToTopSpeed = 4;

//UTC Clock
window.UTCClockConfig = {
    format: '%2I:%2M:%2S %p %{Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday}w,  %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %2d, %Y (UTC)',
}

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreeting.js',
        ]
});