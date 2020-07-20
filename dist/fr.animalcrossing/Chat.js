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
        'u:dev:ChatAnnouncements/code.js', //annonces sur le tchat
        'u:kocka:MediaWiki:Emoticons.js', //affichage menu emoticones
        'u:dev:MediaWiki:ChatStatus/code.js' //edition et affichage statut membre
    ]
});
 
 
//Message chat : Regles & Emoticones
var div = document.createElement('div');
div.className = 'tooltip-wrap';
div.innerHTML = '<a style="emoteShow" href="http://fr.animalcrossing.wikia.com/wiki/MediaWiki:Emoticons" target="_blank"><button class="kockaEmoticonsSpan ChatCustomButton emoteShow">Émoticônes</button></a><span class="popperblack">  |  </span><a href="http://fr.animalcrossing.wikia.com/wiki/Animal_Crossing_Wiki:R%C3%A8gles#Tchat" target="_blank"><button class="kockaEmoticonsSpan ChatCustomButton">Règles du tchat</button></a>';
document.getElementsByClassName('public wordmark')[0].appendChild(div);


//Message annonces
$('.Rail').prepend('<a href="https://discord.gg/3sGKduR" target="_blank"><div class="pvw-title"><span>Facts</span></div></a>');
 
 
//Status utilisateurs
window.ChatStatus = {
    statuses: {
				"afkboy": "est absent",
				"afkgirl": "est absente",
				"edit": "modifie",
				"food": "mange",
				"book": "lit",
				"manga" : "lit un manga",
				"workhome" : "fait ses devoirs",
				"music" : "écoute de la musique",
				"anime" : "regarde un anime",
				"youtube" : "se perd sur YouTube",
				"write": "écrit",
				"draw": "dessine",
				"birthday" : "fête son anniversaire",
				"Jeuvidéo" : "joue à un jeu vidéo",
				"dors": "dort",
				"ennui" : "s'ennuie",
				"perso" : "fantasme sur un personnage d'anime",
    },
};

//Is typing
 
importArticles({
    type: "script",
    articles: [
        // ...
        "u:dev:IsTyping/code.js",
        // ...
    ]
});