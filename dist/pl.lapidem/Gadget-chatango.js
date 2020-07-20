if ( wgNamespaceNumber != undefined && !window.chatango ) {
        addOnloadHook( addChatango );
}
 
var chatango = true;
 
function addChatango () {
var ChatangoPrefix = '<section class="Chatango module"><h1 style="margin-top:0px; margin-bottom:7px;">Czat Oficjalnej Strony Lapidem<span style="float:right;color:white !important;font-family:Verdana !important;" title="Jeśli chcesz, by ta sekcja przestała być dla Ciebie widoczna, dodaj do /wiki/Użytkownik:Twój_nick/wikia.css następującą linijkę: .Chatango { display: none !important; } - nie zobaczysz już tego okienka, dopóki nie skasujesz tego tekstu "><sup><small>?</small></sup></span></h1>';
var ChatangoSection = '<a href="http://pl.lapidem.wikia.com/wiki/Pomoc:Chatango" style="margin-left:5px; color:yellow;">Pomoc: Jak założyć konto?</a><object width="282" height="360" id="obj_1334059042500"><param name="movie" value="http://pl-lapidem.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1320038262203&c=FFFFFF&d=E1E1E1&f=0&g=E1E1E1&i=0&j=E1E1E1&l=2B2B2B&m=000000&n=FFFFFF&o=99&p=12&q=999999&t=0&v=0&aa=1"/><embed id="emb_1320038262203" src="http://pl-lapidem.chatango.com/group" width="305" height="360" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1320038262203&c=FFFFFF&d=E1E1E1&f=0&g=E1E1E1&i=0&j=E1E1E1&l=2B2B2B&m=0000&n=FFFFFF&o=99&p=12&q=999999&t=0&v=0&aa=1"></embed></object>';
var RadioSection = '<section class="Radio module"><h1 style="margin-top:0px; margin-bottom:7px;">Radio Anime24<span style="float:right;color:white !important;font-family:Verdana !important;" title="Jeśli chcesz, by ta sekcja przestała być dla Ciebie widoczna, dodaj do /wiki/Użytkownik:Twój_nick/wikia.css następującą linijkę: .Radio { display: none !important; } - nie zobaczysz już tego okienka, dopóki nie skasujesz tego tekstu "><sup><small>?</small></sup></span></h1><center><iframe src="http://shippuuden.home.pl/radio/statystyki/staty2.php" frameborder="no" marginwidth="0" marginheight="0" scrolling="no" width="152" height="227"></iframe><br /><a href="http://sc.freecast.pl:8038/listen.pls" target="_blank"><strong>SŁUCHAJ</strong></a><br /><a href="http://radio.anime24.pl/?page_id=215">Pozdrowienia</a><br /><a href="http://radio.anime24.pl/?page_id=211" target="_self">Ramówka</a></center></section>';

    //Artykuły
$(ChatangoPrefix+ChatangoSection+"</section>").insertAfter('#LatestPhotosModule');

   //Aktywność
$(ChatangoPrefix+ChatangoSection+"</section>").insertBefore('.HotSpotsModule');

   //Radio
$(RadioSection).insertAfter('.Chatango');

   //Strona Główna
$(ChatangoSection).appendTo("#MainSiteChat");
}