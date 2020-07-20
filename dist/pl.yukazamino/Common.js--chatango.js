if ( wgNamespaceNumber != undefined && !window.chatango ) {
        addOnloadHook( addChatango );
}
 
var chatango = true;
 
function addChatango () {
var ChatangoSection = '<section class="Chatango module"><h1 style="margin-top:0px; margin-bottom:7px;">Yukazami Czat <span style="float:right;color:white !important;font-family:Verdana !important;" title="Jeśli chcesz, by ta sekcja przestała być dla Ciebie widoczna, dodaj do /wiki/Użytkownik:Twój_nick/wikia.css następującą linijkę: .Chatango { display: none !important; } - nie zobaczysz już tego okienka, dopóki nie skasujesz tego tekstu "><sup><small>?</small></sup></span></h1><object width="282" height="360" id="obj_1334059042500"><param name="movie" value=http://yukazamino.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=0010000006224043410&c=000000&d=FF6600&f=0&g=FF6600&i=0&j=000000&l=333333&m=CCCCCC&n=FF6600&o=99&p=12&q=686768&t=0&v=0&aa=1"/><embed id="emb_1320038262203" src="http://yukazamino.chatango.com/group" width="282" height="360" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=0010000006224043410&c=FF6600&d=000000&f=0&g=000000&i=0&j=000000&l=333333&m=CCCCCC&n=333333&o=99&p=12&q=686768&t=0&v=0&aa=1"></embed></object></section>';

    //Artykuły
$(ChatangoSection).insertAfter('#LatestPhotosModule');

   //Aktywność
$(ChatangoSection).insertBefore('.HotSpotsModule');

   //Strona Główna
$(ChatangoSection).appendTo("#MainSiteChat");
}