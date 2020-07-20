importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:ChatDelay/code.js',
        'u:dev:MediaWiki:ChatImages/code.js',
        'u:dev:MediaWiki:ChatLinkPreview.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:ChatUserPageButton.js',
        'u:dev:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:IsTyping/code.js'
    ]
} );

importScriptPage('ChatOptions/code.js', 'dev');
importScript('MediaWiki:Chatfilter.js');

// Original: w:c:ru.elderscrolls:MediaWiki:Chat.js*/
$(function() {
    if ($('#HeadLineBar').length) {
        return;
    }
    var headline_styles = 'display:inline-block; width:300px; font-size:12px; text-align:center; line-height:14px; padding:7px 0; color:white; font-weight:bold; position:absolute; right:170px;';
    var headline_bar = '<div id="HeadLineBar" style="' + headline_styles + '">Добро пожаловать в чат Five Nights at Freddy\'s вики!</br><a href="/wiki/Project:Правила_чата" target="_blank">Правила</a> &bull; <a href="/wiki/MediaWiki:Emoticons" target="_blank">Смайлики</a> &bull; <a href="/wiki/Special:Listadmins" target="_blank">Админы</a> &bull;  <a href="/wiki/Special:ListUsers/chatmoderator" target="_blank">Модераторы</a></div>';
    $('.ChatHeader > .wordmark').append(headline_bar);
});

var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');