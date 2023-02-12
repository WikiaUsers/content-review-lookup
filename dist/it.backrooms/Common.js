/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */
document.getElementById("feature1").addEventListener("click",function() {
    location.href = 'https://backrooms.fandom.com/it/wiki/Consigliato_1' ;
}, false);

document.getElementById("feature2").addEventListener("click",function() {
    location.href = 'https://backrooms.fandom.com/it/wiki/Consigliato_2' ;
}, false);

document.getElementById("feature3").addEventListener("click",function() {
    location.href = 'https://backrooms.fandom.com/it/wiki/Consigliato_3';
}, false);

document.getElementById("feature4").addEventListener("click",function() {
    location.href = 'https://backrooms.fandom.com/it/wiki/Consigliato_4';
}, false);

window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};