importScriptPage('MediaWiki:AnonymousChatAnnouncements/code.js','dev');
window.kockaEmoticons = {
    vocab: {
        emoticons: "Emoticons",
        close: "Close Menu"
    },
    help: "Click on an Emoticon below to be able to type it into the chat!"
};
alertMessage = 'A bad word was found in your message.  If you post this message, you might get a punishment from a chat mod or admin.  Are you sure you want to continue?';
window.badWords = ['shit', 'fuck','cancer','autism','ebola','bitch','dammit','asshole','buttcheek','butthole']; // add bad words to pre-generated list
importArticles({
	type: "script",
	articles: [
		'u:dev:ChatImages/code.js',
		'u:kocka:MediaWiki:Emoticons.js',
		'u:dev:MediaWiki:WordFilter/code.js',
	]
});