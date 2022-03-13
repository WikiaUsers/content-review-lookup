window.MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for not following our local rules or continuing to break our rules, to appeal, please contact us on Community Central or reply to this message. Note: This action is carried out just as after your block was added.'
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