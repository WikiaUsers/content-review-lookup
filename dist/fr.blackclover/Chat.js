//Plugin emoticones
window.kockaEmoticons = {
    vocab: {
        emoticons: "Émoticônes",
        close: "Fermer"
    },
    helpText: "Choisissez un émoticône en cliquant dessus"
};
 
//Importation scripts 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatOptions/code.js', //ChatOptions, notif, 
        'u:shining-armor:ChatTags/code.js', //tag format texte
        'u:kocka:MediaWiki:Emoticons.js', //affichage menu emoticones
        'u:dev:MediaWiki:ChatStatus/code.js' //edition et affichage statut membre
    ]
});
 

//Status utilisateurs
window.ChatStatus = {
    statuses: {
				"afkboy": "est absent",
				"Appel": "est au téléphone",
				"modif": "contribue",
				"charmy": "mange",
				"livre": "lit",
				"manga" : "lit un manga",
				"devoirs" : "fait ses devoirs",
				"musique" : "écoute de la musique",
				"anime" : "regarde un anime",
				"youtube" : "se perd sur YouTube",
				"laver": "est parti prendre une douche",
				"dessin": "dessine",
				"anniv" : "fête son anniversaire",
				"Jeuvidéo" : "joue à un jeu vidéo",
				"sommeil": "dort",
				"ennui" : "s'ennuie",
				"nettoie" : "fait le ménage",
    },
};