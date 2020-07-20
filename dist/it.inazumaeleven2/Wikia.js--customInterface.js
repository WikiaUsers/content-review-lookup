//==========================================
//    Personalizzazioni dell'interfaccia
//==========================================
 
//====================================
//          Immagine casuale
//====================================
/* Mostra un'immagine casuale nella */
/* barra laterale (Oasis)           */
 
/* Lista immagini */
var WikiaRailImageArray = new Array();
    WikiaRailImageArray[0] = "<img src='https://images.wikia.nocookie.net/inazumaelevenwiki-italia/it/images/d/d3/Inazuma.ElevenMarkJudeAxel.png' alt='Mark-Jude-Axel'>";
    WikiaRailImageArray[1] = "<img src='https://images.wikia.nocookie.net/inazumaelevenwiki-italia/it/images/c/cd/InazumaJapan11.png' alt='Inazuma Japan'>";
    WikiaRailImageArray[2] = "<img src='https://images.wikia.nocookie.net/inazumaelevenwiki-italia/it/images/8/87/Inazuma-Eleven-Japan.png' alt='Mark-Axel-Jude'>";
    WikiaRailImageArray[3] = "<img src='https://images.wikia.nocookie.net/inazumaelevenwiki-italia/it/images/a/a2/Raimon_Eleven.png' alt='Raimon Eleven'>";
    WikiaRailImageArray[4] = "<img src='https://images.wikia.nocookie.net/inazumaelevenwiki-italia/it/images/1/11/Inazuma-Eleven.png' alt='Inazuma Eleven'>";
    WikiaRailImageArray[5] = "<img src='https://images.wikia.nocookie.net/inazumaelevenwiki-italia/it/images/5/53/EnegiadellaTerraAxelMarkShawn.png' alt='Energia della Terra'>"
 
/* Scelta immagine */
var chosenWikiaRailImage = Math.round(Math.random() * (WikiaRailImageArray.length - 1));
 
/* Inserimento immagine */
$(window).load(function() {
      $('#WikiaRail').append(WikiaRailImageArray[chosenWikiaRailImage]);
});
 
//==================================
//       Strumenti aggiuntivi
//==================================
/* Aggiunta link aggiuntivi     */
/* nel menù di modifica (oasis) */
$(function () {
    $(($( '.UserProfileActionButton' ).length ? '.UserProfileActionButton' : '#WikiaPageHeader') + ' > .wikia-menu-button > ul').append('<li><a href="/wiki/'+ wgPageName +'?useskin=monobook" title="Vedi in Monobook">Vedi in Monobook</a></li><li><a href="/wiki/'+ wgPageName +'?useskin=wikiamobile" title="Vedi in Wikia Mobile">Vedi in Wikia Mobile</a></li><li><a href="/wiki/Speciale:PuntanoQui/'+ wgPageName +'" title="Puntano qui">Puntano qui</a></li><li><a href="/wiki/Speciale:Prefissi/'+ wgPageName +'" title="Sottopagine">Sottopagine</a></li>');
});