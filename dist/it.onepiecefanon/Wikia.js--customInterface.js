//==========================================
//    Personalizzazioni dell'interfaccia
//==========================================

//==================================
//       Strumenti aggiuntivi
//==================================
/* Aggiunta link aggiuntivi     */
/* nel menù di modifica (oasis) */
$(function () {
    $(($( '.UserProfileActionButton' ).length ? '.UserProfileActionButton' : '#WikiaPageHeader') + ' > .wikia-menu-button > ul').append('<li><a href="/wiki/'+ wgPageName +'?useskin=monobook" title="Vedi in Monobook">Vedi in Monobook</a></li><li><a href="/wiki/'+ wgPageName +'?useskin=wikiamobile" title="Vedi in Wikia Mobile">Vedi in Wikia Mobile</a></li><li><a href="/wiki/Speciale:PuntanoQui/'+ wgPageName +'" title="Puntano qui">Puntano qui</a></li><li><a href="/wiki/Speciale:Prefissi/'+ wgPageName +'" title="Sottopagine">Sottopagine</a></li>');
});