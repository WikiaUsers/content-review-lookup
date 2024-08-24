/* Configuration de l'extension AjaxRC.js */
AjaxRCRefreshText = 'Actualisation automatique';
AjaxRCRefreshHoverText = 'Actualisation automatique de la page';
ajaxSpecialPages = ["WikiActivity","Recentchanges"];

/* Configuration pour le module Horloge personalisé: MediaWiki:ClocksModule.js */
clocksModuleLabels = ["Paris", "PST"];
clocksModuleTimezones = ["Europe/Paris", "Pacific/Pitcairn"];
clocksModuleFormat = [
        {local : "fr", format : "%H:%M:%S \n%d/%m/%Y"},
        {local : "fr", format : "%H:%M:%S \n%d/%m/%Y"}
    ];
    
/* Configuration pour le module MessageWallUserTags */
window.MessageWallUserTags = {
    tagColor: 'black',
    txtSize: '10px',
    glow: false,
    users: {
        'Trunksuu777': 'Fondateur',
        'KowaiSSJ': 'Admini',
        'Matt2905': 'Admin',
        'Spatch13': 'Team Builder',
        'Vippirr': 'Team Builder'
    }
};
    
    

/* Collapser personalisé style tabber dans le but de permettre des conditions d'affichage */
var collapsers = document.getElementsByClassName('Collapser');
var collapseFunction = function( event ) {
    
    for (i = 0; i < collapsers.length; ++i) {
        var id = collapsers[i].id;
        var collapse = document.getElementById("Collapse" + id);
        
        $(collapse).toggle("slow");
        $(collapsers[i]).toggleClass("tabberactive");
    }
    
    return false;
};
for (i = 0; i < collapsers.length; ++i) {
    collapsers[i].addEventListener("click", collapseFunction);

}

/* Function pour switch les données entre les différents niveaux d'éveil extrême Z avec flash */
var CollapserExtremeZ = document.getElementsByClassName('CollapserExtremeZ');
var elementCollapsed = document.getElementsByClassName('dataExtemeZ');
var CollapserExtremeZFunction = function( event ) {
    
    for (i = 0; i < elementCollapsed.length; ++i) {
        if (elementCollapsed[i].classList.contains("fadeIt")) {
            $(elementCollapsed[i]).toggleClass("fadeIt");
        }
        if (elementCollapsed[i].classList.contains(this.id)) {
            elementCollapsed[i].style.display = 'inline';
            $(elementCollapsed[i]).toggleClass("fadeIt");
            window.scrollBy(0, -1);
            window.scrollBy(0, 1);
        } else {
            elementCollapsed[i].style.display = 'none';
        }
    }
    for (i = 0; i < CollapserExtremeZ.length; ++i) {
        if (CollapserExtremeZ[i].classList.contains("tabberactive")) {
            $(CollapserExtremeZ[i]).toggleClass("tabberactive");
        }
    }
    $(this).toggleClass("tabberactive");
 
    return false;
};
for (i = 0; i < CollapserExtremeZ.length; ++i) {
    CollapserExtremeZ[i].addEventListener("click", CollapserExtremeZFunction);
}