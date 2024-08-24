importScriptPage('ChatOptions/code.js', 'dev');

importArticles({
    type: "script",
    articles: [ 
        "u:dev:ChatNotifications/code.js",
        "u:dev:ChatOptions/fr/code.js",
        "u:dev:ChatStatus/fr/code.js",
        "u:kocka:MediaWiki:Emoticons.js"
        
        
window.kockaEmoticons = {
    vocab: {
        emoticons: "�motic�nes",
        close: "Fermer"
    },
    help: "S�lectionnez un �motic�ne en cliquant dessus."
};
 
//Ajoute un lien vers les �motic�nes et les r�gles du tchat
var link = '<a class="chatlink" href="http://fr.naruto.wikia.com/wiki/project:R�gles_du_tchat" target="_blank">R�gles du tchat</a>';
$('.public.wordmark').first().append(link);
 
// Notifications de tchat
var sfNotifications = {};
sfNotifications.options = {
    caseInsensitive: true,
    pings: [mw.config.get("wgUserName")],
};
 
if (($.inArray("sysop",wgUserGroups) + $.inArray("chatmoderator",wgUserGroups)) > -2) {
    sfNotifications.options.pings.push("!mod");
}

// Statuts de tchat
window.ChatStatus = {
	statuses: {
		afk: "Je suis absent(e)",
		busy: "Je suis occup�(e)",
		edit: "Je ne suis pas l�",
		food: "Je mange",
		game: "Je joue",
		tv: "Je regarde la TV"
	},
	debug: false
};