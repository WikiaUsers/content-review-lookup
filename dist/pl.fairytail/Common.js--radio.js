if ( wgNamespaceNumber != undefined && !window.radio ) {
        addOnloadHook( addRadio );
}
 
var radio = true;
 
function addRadio () {
    $( '<section class="Radio module"><h1 style="margin-top:0px; margin-bottom:7px;">Radio iOtaku<span style="float:right;color:white !important;font-family:Verdana !important;" title="Jeśli chcesz, by ta sekcja przestała być dla Ciebie widoczna, dodaj do /wiki/Użytkownik:Twój_nick/wikia.css następującą linijkę: .Radio { display: none !important; } - nie zobaczysz już tego okienka, dopóki nie skasujesz tego tekstu "></h1><center><iframe src="http://www.katsumi.com.pl/staty/iotaku.php" frameborder="no" marginwidth="0" marginheight="0" scrolling="no" width="152" height="227"></iframe><br /><a href="http://184.107.155.170:9852/listen.pls" target="_blank"><strong>SŁUCHAJ</strong></a><br /><a href="http://iotaku.pl/?page_id=2">Pozdrowienia</a><br /><a href="http://iotaku.pl/?page_id=6" target="_self">Ramówka</a></center></section>')


    //Artykuły
$(RadioPrefix+RadioSection+"</section>").insertAfter('#LatestPhotosModule');

   //Aktywność
$(RadioPrefix+RadioSection+"</section>").insertBefore('.HotSpotsModule');

   //Radio
$(RadioSection).insertAfter('.Radio');

   //Strona Główna
$(RadioSection).appendTo("#MainSiteChat");
}