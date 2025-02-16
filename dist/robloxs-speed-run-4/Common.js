/* Any JavaScript here will be loaded for all users on every page load. */

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;

TBL_GROUP = "roblox-en";

const pageToolsModuleHeading = document.querySelector(".page-tools-module .rail-module__header");
// making it empty
pageToolsModuleHeading.innerHTML = "";

const pageToolsModuleIcon = document.createElement("span");
pageToolsModuleIcon.classList.add("fandom-icons");
pageToolsModuleIcon.classList.add("wds-icon");

pageToolsModuleIcon.textContent = "pencil";

pageToolsModuleHeading.append(pageToolsModuleIcon, pageToolsModuleText);

const pageToolsModuleText = document.createTextNode(" Page Tools");

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = "https://static.wikia.nocookie.net/47d54da7-58be-4f8d-8562-81309da0b108/scale-to-width/1000";

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreeting.js',
        ]
});