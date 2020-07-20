importArticles({
    type: "script",
    articles: [ 
        "u:dev:ChatNotifications/code.js",
        "u:dev:ChatOptions/fr/code.js",
        "u:dev:ChatStatus/fr/code.js",
        "u:dev:IsTyping/code.js",
        "u:dev:MediaWiki:EmoticonsWindow/code.js"
  ]
});
 
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
		afk: "Absent(e)",
		busy: "Occupé(e)",
		edit: "Modifie",
		food: "Mange",
		game: "Joue",
		tv: "Regarde la TV"
	},
	debug: false
};