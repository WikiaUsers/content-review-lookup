importScriptPage('ChatOptions/code.js', 'dev');
importScriptPage('MediaWiki:Chat.js/taunt.js', 'jultrunen');
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatToolbox/code.js',
    ]
});

if (wgCanonicalSpecialPageName == 'Chat') {
    $(function() {
        $.get('/wiki/MediaWiki:Custom-Chat-reproductor?action=raw&ctype=text/raw').done(function(data) {
            if (data !== "") {
                $('#ChatHeader').append('<div id="reproductor-chat"><audio controls autoplay><source src="' + data + '"></audio></div>');
            }
        });



    });

}