/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
/* Lecteur Ogg */
var oggPlayerButtonOnly = false;

importArticles({
    type: 'script',
    articles: [
        'u:dev:YouTubeAudio/code.js',
        'u:dev:YoutubePlayer/code.js',
    ]
});


importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* Retrait du bouton Ajouter Image Galerie */
$( "li:last" ).removeClass(function() {
  return $( this ).prev().attr( "wikia-photogallery-add wikia-button noprint" );
});

/* Compte à rebours */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});


/* Quiz */
window.quizName = "Qui sera le grand fan de Kirby ?";
window.resultsTextArray = [ 
    "Courage ! La voie est encore longue pour devenir le plus grand fan de Kirby",
    "Encore un petit effort avant d'atteindre le titre de grand fan de Kirby !",
    "Félicitations, vous êtes un grand fan de Kirby !" 
];
window.questions = [
    ["Dans quel jeu est apparu Kirby ?",
    "Kirby's Dream Land",
    "Kirby et la tomate magique",
    "Kirby's Adventure",
    "Kirby contre Popopo"], 

    ["Comment Kirby peut vaincre ses adversaires ?",
    "En les aspirant",
    "Avec une baguette de pain",
    "Avec des arguments",
    "C'est impossible"],
    
    ["Quel pouvoir obtient Kirby en aspirant Brûltête ?",
    "Feu",
    "Torche",
    "Lave",
    "Magma"],
    
    ["Dans quel jeu est apparu pour la première fois le boss Cramaud ?",
     "Kirby: Triple Deluxe",
     "Kirby's Adventure Wii",
     "Kirby: Planet Robobot",
     "Team Kirby Clash Deluxe"],
        
    ["Quel est le dernier jeu Kirby où Masahiro Sakurai est crédité ?",
    "Kirby et le Labyrinthe des Miroirs",
    "Kirby Air Ride",
    "Kirby : Le Pinceau du Pouvoir",
    "Kirby : Cauchemar au Pays des Rêves"],
    
    ["Parmi ces propositions, lequel de ces ennemis ne possède aucun pouvoir à copier ?",
    "Waddle Dee Lance",
    "Como",
    "Scarfy",
    "Chabalai"
    ],
    
    ["Quel pouvoir n'apparaît pas dans Kirby: Planet Robobot ?",
    "Aiguille",
    "Feuille",
    "Fouet",
    "Cirque"],
    
    ["En commandant un Hamburger Kirby plus une Maxi-Tomate au Café Waddle Dee, quel est le prix à payer ?",
    "120",
    "110",
    "130",
    "100"],
    
     ["Avec quel véhicule Kirby doit effectuer un tour en moins de 58 secondes sur Beanstalk Park pour gagner un défi ?",
    "Winged Star",
    "Shadow Star",
    "Warpstar",
    "Jet Star"],
    
    ["Quelle combinaison de touches permet d'ouvrir le Configuration Mode de Kirby's Dream Land ?",
    "B + Bas + SELECT",
    "A + Haut + SELECT",
    "B + Haut + SELECT",
    "A + Bas + SELECT"
    ],
    
    ["Quel score doit réaliser le joueur pour obtenir le score Border Line du stage 1 de Kirby's Block Ball ?",
    "120 000",
    "125 000",
    "130 000",
    "145 000"],
    
    ["Parmi ces capacités, laquelle n'est pas nécessaire pour obtenir la Larme d'arc-en-ciel du niveau Dark Castle dans Kirby's Dream Land 2 ?",
    "Étincelle",
    "Torche",
    "Aiguille",
    "Rocher"
    ]
];
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});