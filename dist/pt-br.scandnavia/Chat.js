/* Cabeçalho */
var chatTopic = 'Bem-vindo ao chat da Scandnávia Wiki.<br /><a href="/wiki/Scandnávia Wiki:Diretrizes_do_Chat" target="_blank" title="Scandnávia Wiki:Diretrizes do Chat</a>'
 
$(function() {
        $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:whitesmoke;font-weight:bold;line-height:1.6;margin-left:210px;">'+chatTopic+'</div>')
        .find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!mods/code.js',
        // ...
    ]
} );
importScriptPage('ChatImages/code.js', 'dev');

importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!mods/code.js',
        // ...
    ]
} );

/* ChatTags criado por [[User:Shining-Armor]] */
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
importScriptPage('MediaWiki:ChatAnnouncements/code.js');