//var chatTopic = 'Please read our <a href="/wiki/Wiki_Chat_Rules" target="_blank" title="Chat Rules">Chat Rules</a> before participating here. Thanks!<br /> Have a question? Feel free to ask one of our <a href="/wiki/Game/Wiki_Staff" target="_blank" title="Chat Staff">Chat Staff</a>'
//$(function() {
//	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text//-align:center;width:90%;;font-size:14px;color:#edfafe">'+chatTopic+'</div>')
//	.find('a').attr('style','text-decoration:underline;')
//})
// Testing Above
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {
    importScriptPage('ChatNotifications/code.js', 'dev');
}
importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!mods/code.js',
    ]

} );
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons.js',
        // ...
    ]
});
// Chat Notifications. . . probably?
//alertMessage = 'You got caught! Refrain from using swear words in the chat';
//window.badWords = ['Fuck', 'Ass', 'Shit', 'Bitch', 'Penis', 'Vagina', 'Succ', //'Bastard', 'Pussy', 'Rakka', 'Kisser', 'Taint', 'Douche', 'Nigger', 'Nigga']; // //add bad words to pre-generated list
//importScriptPage('WordFilter/code.js','dev');
//Chat Filter.  .  . probably?