// Dodawanie odpowiedniej klasy do infoboksów, tabel i podstron
$(function(){
themes = document.getElementsByClassName("komunikat")[0].classList.item(1);
    
    if (themes !== "gray") {
        infopudlo = document.getElementsByClassName("portable-infobox"),
        len1 = infopudlo !== null ? infopudlo.length : 0,
        tabela = document.getElementsByClassName("wikitable"),
        len2 = tabela !== null ? tabela.length : 0,
        i = 0;
        j = 0;
    for(i; i < len1; i++) {
        infopudlo[i].className += " "+themes+""; 
        }
    for(j; j < len2; j++) {
        tabela[j].className += " "+themes+""; 
        }
    }
    document.getElementsByClassName("karta")[0].className += " "+themes+""; 
});