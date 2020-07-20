/*Script SfondoAlternato per cambiare lo sfondo della wiki durante la notte. Riadattato da Lord Ghiraim dallo Script RandomBackground di BranDaniMB e Saektide*/

// Alternanza giorno/notte
    //Definisce le variabili
    var t = new Date();
    var notte, giorno;

    //Alterna lo sfondo in base all'ora
    if (t.getHours() >= notte || t.getHours() <= giorno) {
        var bg = nightbg;
 
    } else {
        var bg = daybg;
    }
    //Modifica effettivamente lo sfondo col CSS
    $('.mediawiki').css({'background-image' : 'url("'+bg+'")'});