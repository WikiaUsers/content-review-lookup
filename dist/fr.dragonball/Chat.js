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
        emoticons: "Émoticônes",
        close: "Fermer"
    },
    help: "Sélectionnez un émoticône en cliquant dessus."
};
 
//Ajoute un lien vers les émoticônes et les règles du tchat
var link = '<a class="chatlink" href="http://fr.naruto.wikia.com/wiki/project:Règles_du_tchat" target="_blank">Règles du tchat</a>';
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
		busy: "Je suis occupé(e)",
		edit: "Je ne suis pas là",
		food: "Je mange",
		game: "Je joue",
		tv: "Je regarde la TV"
	},
	debug: false
};