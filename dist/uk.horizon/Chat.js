importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!mods/code.js'
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
    var headline_bar = '<div id="HeadLineBar" style="' + headline_styles + '">Ласкаво просимо в чат !</br><a href="/wiki/Правила" target="_blank">Правила</a> &bull; <a href="/wiki/MediaWiki:Emoticons" target="_blank">Смайлики</a> &bull; <a href="/wiki/Special:Listadmins" target="_blank">Адміністратори</a> &bull;  <a href="/wiki/Special:ListUsers/chatmoderator" target="_blank">Модератори</a></div>';
    $('.ChatHeader > .wordmark').append(headline_bar);
});
 
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');