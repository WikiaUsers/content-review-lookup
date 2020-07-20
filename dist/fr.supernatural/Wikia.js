if ($('#LblClignotant').length) {
    var signe = -1; 
    var clignotementFading = function(){ 
        var obj = document.getElementById('LblClignotant'); 
        if (obj.style.opacity >= 0.96){ 
            signe = -1; 
        } 
        if (obj.style.opacity <= 0.04){ 
            signe = 1; 
        } 
        obj.style.opacity = (obj.style.opacity * 1) + (signe * 0.04); 
    }; 

    // mise en place de l appel de la fonction toutes les 0.085 secondes 
    // Pour arrêter le clignotement : clearInterval(periode); 
    periode = setInterval(clignotementFading, 85 ); 
}
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});