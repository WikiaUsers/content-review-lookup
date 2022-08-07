window.MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for not following our local rules or continuing to break our rules.'
};

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;

TBL_GROUP = "roblox-en";

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = "https://cdn.shopify.com/s/files/1/0403/1568/2971/files/Regular_Piggy_Logo_500x.png?v=1591032294";

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