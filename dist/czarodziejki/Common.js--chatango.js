if ( wgNamespaceNumber != undefined && !window.chatango ) {
addOnloadHook( addChatango );
}

var chatango = true;

function addChatango () {

$('<section class="Chatango module"><h1 style="margin-top:0px; margin-bottom:7px;">Czat Czrodziejki Wiki<span style="float:right;color:black !important;font-family:Verdana !important;" title="Jeśli chcesz, by ta sekcja przestała być dla Ciebie widoczna, dodaj do /wiki/Użytkownik:Twój_nick/wikia.css następującą linijkę: .Chatango { display: none !important; } - nie zobaczysz już tego okienka, dopóki nie skasujesz tego tekstu "><sup><small>?</small></sup></span></h1><object width="282" height="360" id="obj_1334059042500"><param name="movie" value="http://plczarodziejkiwiki.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1320038262203&c=BEA771&d=E1E1E1&f=0&g=E1E1E1&i=0&j=E1E1E1&l=2B2B2B&m=525418&n=FFFFFF&o=99&p=12&q=999999&t=0&v=0&aa=1"/><embed id="emb_1320038262203" src="http://plczarodziejkiwiki.chatango.com/group" width="282" height="360" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1336903907203&a=9555B2&b=100&c=FF9900&d=333333&e=CC6699&f=59&g=333333&h=686768&j=FFCC99&k=9555B2&l=660000&m=33FFCC&n=333333&q=333366&r=100&s=1"></embed></object></section>').insertAfter('.ChatModule');
}