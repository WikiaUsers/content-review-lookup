/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */

// MODUŁ FACEBOOKA by Nanaki
$(function(){
    function addToRail() { // funkcja, żeby się nie powtarzać poniżej
        var ad = $('#top-right-boxad-wrapper, #NATIVE_TABOOLA_RAIL').last(); // znajdujemy reklamy z góry i wybieramy ostatni element, żeby wcisnąć się pod niego
        
        // div z widżetem
        var fb = $('<div class="rail-module"><div class="fb-page" data-href="https://www.facebook.com/sonicwikipolska" data-width="300" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"></div></div>');
        // zawarłem widżet w divie, bo nie wszystkie skrypty sprawdzają sam element podany do hooka, a nie powinno się odpalać hooka na elementach, które już istnieją, bo nie wszystkie skrypty sprawdzają, czy aktywowały wcześniej jakieś elementy
        
        if(ad.length == 0) { // jeśli nie ma reklam to wciskamy moduł na górę
            $('#WikiaRail').prepend(fb);
        } else { // jeśli są to dodajemy poniżej
            fb.insertAfter(ad);
        }
        
        // na sam koniec odpalamy hook na elemencie, aby aktywować moduł
        mw.hook('wikipage.content').fire(fb);
    }
    
    if(!$('#WikiaRail').hasClass('loaded')) { // jeśli prawy panel się nie wgrał to odpalamy z opóźnieniem:
        $('#WikiaRail').on('afterLoad.rail', addToRail);
    } else { // jeśli się wgrał to odpalamy od razu
        addToRail();
    }
});

// Podpisy zamiast prefiksów 
// (np. Sonic Wiki:Polecany artykuł >> 
 // Polecany artykuł
 // Strona projektu
 
$(function() {
    // Strony projektu
    $('.ns-4 .page-header__title').text(wgTitle); // usuń prefiks z tytułu strony
    $('.ns-4 .page-header__title').after('<div class="page-header__page-subtitle">Strona projektu</div>'); // dodaj podpis pod tytułem
    
    // Portale
    $('.ns-112 .page-header__title').text(wgTitle); // usuń prefiks z tytułu strony
    $('.ns-112 .page-header__title').after('<div class="page-header__page-subtitle">Strona portalu</div>'); // dodaj podpis pod tytułem
    
});

// Podpisy pod polecanymi artykułami
// Do użycia wyamagany jest szablon {{Polecany}}
 // Tytuł
 // Polecany artykuł
$(function() {
var szablon = $("span.PolecanyArt").text();
var tresc = "Ten artykuł został wyróżniony jako polecany artykuł."
    
    if (szablon === tresc) {
        $(".page-header__title").after('<div class="page-header__page-subtitle" style="font-size:120%"><a href="/Project:Polecany_artykuł" title="Sonic Wiki:Polecany artykuł">' + "Polecany artykuł" + '</a></div>'); // podpis
    }
});