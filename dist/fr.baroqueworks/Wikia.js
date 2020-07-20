


/************************************************************
 *** Ajout d'une palette de couleur pour les pages de profils
 *** IMSC (Instauration d'un Menu de Sélection de Couleur)
 *** Auteur : Franky003
 *** Etat : En développement
 *************************************************************/
var page = mw.config.get('wgPageName');
if(page.indexOf("Utilisateur:") !== -1) {
// Apparition du menu 
$('.tabs-container').append(cnT);
var cnT = palette + dg + c_1 + c_2 + c_3 + c_4 + input + button;
var palette = '<img src="http://sournoishack.com/uploads/803272030palette.jpeg" style="float:left; height:20px; width:20px;" id="icone" title="Colorier cette page (sélectionne ta couleur dans la palette où propose là puis clique sur Ok.)" />';
var  dg = '<div class="palette"><input id="dg" type="checkbox">Dégradé</input>';
var c_1 = '<div id="chco"><div id="goldsquare" title="Fond doré"></div><div id="redsquare" title="Fond rouge"></div>';
var c_2 = '<div id="greensquare" title="Fond vert"></div><div id="purplesquare" title="Fond mauve"></div>';
var c_3 = '<div id="bluesquare" title="Fond bleu"></div><div id="orangesquare" title="Fond orange"></div>';
var c_4 = '<div id="silversquare" title="Fond argenté"></div><div id="blacksquare" title="Fond noir"></div><div id="whitesquare" title="Fond blanc"></div></div>';
var input = '<input id="barre" type="text" size="33" style="color:gray;"></input>';
var button = '<button id="valid">Ok</button></div>';
$('.palette').hide();
$('#icone').mouseover(function () {
$(this).remove();
$('.palette').show();
});
// Insertion d'une couleur dans l'input box
$('#barre').val('Entre la couleur ici et clique sur "Ok".');
$(this).click(function () {
$(this).val('#');
});
jQuery('#valid').click(function () {
var color = $('#barre').val();
$('.WikiaSiteWrapper, .WikiaPageBackground').css('background-image', 'linear-gradient(' + color + ',' + color + ')');
$('#chco').append('<div class="newsquare"></div>');
$('.newsquare').css('width', '17px').css('height', '17px').css('border-radius', '8.5px').css('background-image', 'linear-gradient(' + color + ',' + color + ')');
});
// Activation des couleurs disponibles dans la palette
$('#goldsquare').click(function () {$('.WikiaSiteWrapper, .WikiaPageBackground').css('background-image', 'linear-gradient(gold, gold)').css('color', 'black')});
$('#redsquare').click(function () {$('.WikiaSiteWrapper, .WikiaPageBackground').css('background-image', 'linear-gradient(red, red)').css('color', 'white')});
$('#greensquare').click(function () {$('.WikiaSiteWrapper, .WikiaPageBackground').css('background-image', 'linear-gradient(green, green)').css('color', 'white')});
$('#purplesquare').click(function () {$('.WikiaSiteWrapper, .WikiaPageBackground').css('background-image', 'linear-gradient(purple, purple)')});
$('#bluesquare').click(function () {$('.WikiaSiteWrapper, .WikiaPageBackground').css('background-image', 'linear-gradient(blue, blue)').css('color', 'white')});
$('#orangesquare').click(function () {$('.WikiaSiteWrapper, .WikiaPageBackground').css('background-image', 'linear-gradient(orange, orange)').css('color', 'black')});
$('#silversquare').click(function () {$('.WikiaSiteWrapper, .WikiaPageBackground').css('background-image', 'linear-gradient(silver, silver)').css('color', 'black')});
$('#blacksquare').click(function () {$('.WikiaSiteWrapper, .WikiaPageBackground').css('background-image', 'linear-gradient(black, black)').css('color', 'white')});
$('#whitesquare').click(function () {$('.WikiaSiteWrapper, .WikiaPageBackground').css('background-image', 'linear-gradient(white, white)').css('color', 'black')});
$('#newsquare').click(function () {$('.WikiaSiteWrapper, .WikiaPageBackground').css('background-image', 'linear-gradient(' + color + ',' + color + ')')});
// Options pour les dégradés
$('#dg:checked').css('margin-left', '100px');
var toz = '<input type="checkbox" id="central">Central</input><br /><input type="checkbox" id="linear">Linéaire</input>';
} // Fin condition


/* Imports */

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Wikia.js/Sidebar.js'
    ]
});

// Animation page d'accueil  //
var page = mw.config.get( 'wgPageName');
if(page === "Wiki_Baroque_Works"){ 
    var message =  "Bienvenue sur le wiki Baroque Works ! N'hésitez pas à nous rejoindre !!!!";
    alert(message);
}



/* Signature de Franky003 */

console.log('franky sig');
;(function($, mw) {
    function afficher_popup()
    {
        $.showCustomModal(titreHTML, contenuHTML, {
            id: 'popup_msg_intro',
            width: 600,
            buttons: [{
                message: 'Fermer',
                handler: function() {
                    $('#popup_msg_intro').closeModal();
                }
            }]
        });
    }
 
    /*jshint multistr:true */
    titreHTML      = 'Yo ! Tu as cliqué sur ma signature, où veux tu aller?';
    contenuHTML    = '<div style="width:100%; background-image:linear-gradient(60deg, gray, dimgray, dimgray, black); height:400px; color:white; font-size:200%; font-weight:bold;"><span style="float:left; font-size:60%;"><a class="pagehtml" style="color:white;" href="/wiki/User_talk:Franky003">Aller sur ma page de discussion</a></span><span style="font-size:60%;"><a class="pagehtml" style="color:white;" href="/wiki/User:Franky003">Visiter ma page d\'utilisateur</a><span style="float:right; font-size:60%;"><a class="pagehtml" style="color:white;" href="/wiki/Special:Contributions/Franky003">Voir mes contributions</a></span><br /><br /><br /><br /><br /><br /><br /><br /><u>Si tu souhaites m\'envoyer un message sur ma page de discussion, tu peux directement le faire ici !</u><br /><textarea row="5" id="champsigfr">(n\'oublies pas de signer)</textarea><br /><span class="button" id="buttonsigfr" style="margin-left:50px;">Envoyer  :D </span></span></div>';
 
    // Début code
    $("#sigFranky").click(function()
    {
        afficher_popup();
        var msg = $('#champsigfr').val();
        $('#buttonsigfr').click(function () {
jQuery('body .page-User:Franky003').append(msg);
    }); 
    });
    // Fin code
}) (this.jQuery);