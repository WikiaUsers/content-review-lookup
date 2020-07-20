/* 此处的JavaScript将加载于所有用户每一个页面。 */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
    ]
});

if (mwCustomEditButtons.length) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "删除线",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "被删除的文字"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "换行",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "添加注释行",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "请在此处添加注释"};
}


/* 回到顶部 */
$(function() {
    var txt = "回最上面",
        btn = $('<div/>', {
            'text': txt,
            'attr': {
                'title': txt,
                'class': 'backToTop'
            },
            'css': {
                'user-select': 'none'
            },
            'bind': {
                'click': function() {
                    $("html, body").animate({
                        scrollTop: 0
                    }, 120);
                }
            }
        }).appendTo(document.body);
    $(window).bind('scroll', function() {
        $(document).scrollTop() > 0 ? btn.fadeIn() : btn.fadeOut();
    }).scroll();
});