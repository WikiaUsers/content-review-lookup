//==========================================
//    Personalizzazioni dell'interfaccia
//==========================================

$(window).load(function() {
    //==================================
    //       Strumenti aggiuntivi
    //==================================
    /* Aggiunta link aggiuntivi     */
    /* nel menù di modifica (oasis) */
    var $button = $('.UserProfileActionButton .WikiaMenuElement');
    
    if(!$button.exists()) {
        $button = $('.page-header__contribution-buttons .wds-list');
    }
    
    $button.append(
        '<li><a href="/it/wiki/' + wgPageName + '?useskin=mercury" title="Vedi nella skin Mobile">Vedi come su Mobile</a></li>' +
        '<li><a href="/it/wiki/Speciale:PuntanoQui/' + wgPageName + '" title="Puntano qui">Puntano qui</a></li>' +
        '<li><a href="/it/wiki/Speciale:Prefissi/' + wgPageName + '" title="Sottopagine">Sottopagine</a></li>'
    );


    //==================================
    //      Avviso su WikiActivity
    //==================================
    var avvisoRC = '<div class="avviso-rc">Vuoi tenere d\'occhio l\'attività completa della wiki? Vai su <a href="/it/wiki/Speciale:UltimeModifiche">Speciale:UltimeModifiche</a>!</div>';
    $('.mw-special-WikiActivity #WikiaArticle').before( avvisoRC );

    //==================================
    //    Default tab su pagine file
    //==================================
    /*
    $('.tabs li[data-tab=history]').removeClass('selected');
    $('div[data-tab-body=history').removeClass('selected');
 
    $('.tabs li[data-tab=about]').addClass('selected');
    $('div[data-tab-body=about').addClass('selected');
    */
    
    //=============
    //    Altro
    //=============
    // Cambio stile pulsanti nella barra laterale
    $("#WikiaRail .community-page-rail-module .wds-button, #WikiaRail .chat-module .wds-button, #WikiaRail .photo-module .photo-stats .wds-button").removeClass("wds-is-secondary");
});