// Dodawanie odpowiedniej klasy do infoboksów, tabel i podstron
$(function(){
themes = document.getElementsByClassName("komunikat")[0].classList.item(1);
    
    if (themes !== "gray") {
        infopudlo = document.getElementsByClassName("portable-infobox"),
        len1 = infopudlo !== null ? infopudlo.length : 0,
        tabela = document.getElementsByClassName("wikitable"),
        len2 = tabela !== null ? tabela.length : 0,
        cytat = document.getElementsByClassName("cytat"),
        len3 = cytat !== null ? cytat.length : 0,
        karta = document.getElementsByClassName("karta"),
        len4 = karta !== null ? karta.length : 0,
        i = 0;
        j = 0;
        k = 0;
        l = 0;
    for(var i; i < len1; i++) {
        infopudlo[i].className += " "+themes+""; 
        }
    for(var j; j < len2; j++) {
        tabela[j].className += " "+themes+""; 
        }
    for(var k; k < len3; k++) {
        cytat[k].className += " "+themes+""; 
        }
    for(var l; l < len4; l++) {
        karta[l].className += " "+themes+""; 
        }
    }
});

// Dynamiczne kolory dla "pudełek" list chronologicznych
$(function(){
	document.querySelectorAll('.pudelko-duze, .pudelko-male').forEach(element => {
	  const bgcolor = element.getAttribute('data-bgcolor');
	  element.style.setProperty('--bgcolor', bgcolor);
	});
});

// Obsługa Szablonu:Sic wystającego poza prawą krawędź artykułu
$(function() {
  $('.sic').each(function() {
    const $popup = $(this).find('.sic-popup');
    $(this).on('mouseenter', function() {
      const rect = $popup[0].getBoundingClientRect();
      if(rect.right > window.innerWidth) {
        $popup.css({ left: 'auto', right: '0' });
      } else {
        $popup.css({ left: '0', right: 'auto' });
      }
    });
  });
});