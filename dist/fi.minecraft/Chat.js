importScriptURI("https://raw.github.com/sactage/wikia-js-snippets/master/ChatOptions.js");


// Chat-scriptien tuonti
ajaxEmoticonsInterval = 25000;
importArticles({
	type: 'script',
	articles: [
		'u:shining-armor:MediaWiki:ChatTags/code.js',
                'u:dev:AjaxEmoticons/code.js',
                'u:kocka:MediaWiki:Emoticons.js'
	]
});
// EmoticonWindows suomennos
window.kockaEmoticons = {
    vocab: {
        emoticons: "Hymiöt",
        close: "Sulje"
    },
    helpText: "Valitse hymiö klikkaamalla sitä."
};