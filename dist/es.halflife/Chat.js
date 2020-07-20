var ExtendedPrivateMessaging = {
    enableExperimentalGroupIcons: true
};
var PrivateMessageAlert = {
	beepSound: 'http://gdurl.com/OdG4',
	notifications: true,
	alertWhileFocused: true
};
window.EmoticonsWindowVocab = {
    emoticons: "Emoticonos",
	close: "Cerrar",
	help: "Toca un emote pa' insertarlo"
};
importArticles({
	type: "script",
	articles: [
		'u:dev:AjaxEmoticons/code.js',
		'u:dev:Tabinsert.js',
		'u:kocka:MediaWiki:Emoticons.js',
		'u:es.steven-universe:MediaWiki:PMA.js',
		'MediaWiki:Tags-import.js',
		'u:es.steven-universe:MediaWiki:ChatPings.js',
		'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
	]
});