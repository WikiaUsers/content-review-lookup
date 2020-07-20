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