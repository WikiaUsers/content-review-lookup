/* Add Buttons */
$(window).load(function addButtons() {
    var $o = $('#EmoticonsWindowButton');
});

/* —————————————————————————————— ! ! ! ——————————————————————————————— */

/* Import scripts. NOTE: Scripts configurations go bove this line */
importArticles({
    type: 'script',
    articles: [
        'u:kocka:Emoticons/code.js', // EmoticonsWindow
        'u:dev:AjaxEmoticons/code.js', // AjaxEmoticons
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:su:!mods.js'
    ]
});