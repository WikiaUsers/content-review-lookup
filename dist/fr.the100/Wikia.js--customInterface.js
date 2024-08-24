//==========================================
//    Personnalisation d'interface (Test)
//==========================================
 
//====================================
//          Image aléatoire
//====================================
/* Affiche une image aléatoire en bas */
/* barre laterale (Oasis)           */
 
/* Liste des images */
var WikiaRailImageArray = new Array();
    WikiaRailImageArray[0] = "<img id='RailImg' src='https://vignette.wikia.nocookie.net/the-100/images/1/14/RailImg_Poster_Saison_3.png/revision/latest?cb=20151230141211&path-prefix=fr' alt='RailImg Poster Saison 3'>";

/* Choisir une image */
var chosenWikiaRailImage = Math.round(Math.random() * (WikiaRailImageArray.length - 1));
 
/* Insérer l'image */
$(window).load(function() {
      $('#WikiaRail').append(WikiaRailImageArray[chosenWikiaRailImage]);
});