/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */


/* Instauration du menu de sélection des couleurs de fond optionelles pour
les pages de profil ou de discussion
* Nom du script : Inconnu
* Abréviation : IMSC
* Auteur : Franky003
* Etat : Presque terminé*/

// Cible uniquement les pages utilisateurs ou mur/page de discu.
var pagename = mw.config.get( 'wgPageName' );
var page = pagename.charAt(0) + pagename.charAt(1) + pagename.charAt(2) + pagename.charAt(3);

if(page === "Util" || page === "Mur:") {
    
// Apparition du menu

$('.tabs-container').append('<span class="Depliage">Change la couleur de cette page en une seconde ! <b>+</b></span><div class="choixcouleur"><div id="blacksquare" title="Fond noir"></div><div id="bluesquare" title="Fond bleu"></div><div id="redsquare" title="Fond rouge"></div><div id="purplesquare" title="Fond violet"></div><div id="greensquare" title="Fond vert"></div><div id="orangesquare" title="Fond orange"></div><div id="goldsquare" title="Fond doré"></div><div id="skybluesquare" title="Fond bleu ciel"></div><div id="silversquare" title="Fond argenté"></div><input type="text" id="otherC"></input><span class="button" id="valid">Ok</span></div>');
$('.choixcouleur').hide();
$('.Depliage b').click(function () {
$('.choixcouleur').show();
$('.Depliage b').text('-');
$(this).click(function () {
$(this).text('+');
$('.choixcouleur').hide();
});
});
jQuery(function SeLeCtion () { // Fonction SeLeCtion commence ici

// Au clic de blacksquare
$('#blacksquare').click(function () {
$('.WikiaPageBackground').css('background', 'black');
});

// Au clic de bluesquare

$('#bluesquare').click(function () {
$('.WikiaPageBackground').css('background', 'blue');
});

// Au clic de redsquare

$('#redsquare').click(function () {
$('.WikiaPageBackground').css('background', 'red');
});

// Au clic de purplesquare

$('#purplesquare').click(function () {
$('.WikiaPageBackground').css('background', 'purple');
});

// Au clic de greensquare

$('#greensquare').click(function () {
$('.WikiaPageBackground').css('background', 'green');
});

// Au clic de orangesquare

$('#orangesquare').click(function () {
$('.WikiaPageBackground').css('background', 'orange');
});

// Au clic de goldsquare

$('#goldsquare').click(function () {
$('.WikiaPageBackground').css('background', 'gold');
});

// Au clic de skybluesquare

$('#skybluesquare').click(function () {
$('.WikiaPageBackground').css('background', 'skyblue');
});

// Au clic de silversquare

$('#silversquare').click(function () {
$('.WikiaPageBackground').css('background', 'silver');
});

// Couleur supplémentaire

$('#valid').click(function AddColor () {
var rep = $('#otherC').val();
$('.WikiaPageBackground').css('background', rep);
$('.choixcouleur').append('<div id="square+1"></div> ');
$('#square+1').css('background', rep).css('width', '15px').css('height', '15px').css('padding', '4px');
$(this).mouseover(function () {
$(this).css('border', '3px inset white');
$(this).mouseout(function () {
$(this).css('border', '1px solid transparent');
}); // Fermeture de la fonction de sortie du pointeur
}); // Fermeture de la fonction d'entrée du pointeur
}); // Fermeture de AddColor

}); // Fermeture de SeLeCtion
} // Fermeture de la condition

// $('form#Write.Write').css('display', 'none');
$('.Chat').css('color', 'red');