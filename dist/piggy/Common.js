window.MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for not following our local rules or continuing to break our rules.'
};

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;

TBL_GROUP = "roblox-en";

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = "https://static.wikia.nocookie.net/9ebc9dd0-3305-497a-8a4e-669b1da24b9e/scale-to-width/1000";

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreeting.js',
    ]
});

var DisplayTitle = document.getElementsByClassName("DisplayTitle");
var title =document.getElementsByClassName("page-header__title")[0];
for (var i=0; i<DisplayTitle.length; i++) {
    DisplayTitle[i].innerText = title.innerText;
}