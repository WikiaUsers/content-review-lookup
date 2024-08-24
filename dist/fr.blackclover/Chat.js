//Plugin emoticones
window.kockaEmoticons = {
    vocab: {
        emoticons: "�motic�nes",
        close: "Fermer"
    },
    helpText: "Choisissez un �motic�ne en cliquant dessus"
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
				"Appel": "est au t�l�phone",
				"modif": "contribue",
				"charmy": "mange",
				"livre": "lit",
				"manga" : "lit un manga",
				"devoirs" : "fait ses devoirs",
				"musique" : "�coute de la musique",
				"anime" : "regarde un anime",
				"youtube" : "se perd sur YouTube",
				"laver": "est parti prendre une douche",
				"dessin": "dessine",
				"anniv" : "f�te son anniversaire",
				"Jeuvid�o" : "joue � un jeu vid�o",
				"sommeil": "dort",
				"ennui" : "s'ennuie",
				"nettoie" : "fait le m�nage",
    },
};