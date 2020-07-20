/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
if ( wgNamespaceNumber != undefined && !window.chatango ) {
        addOnloadHook( addChatango );
}
 
var chatango = true;
 
function addChatango () {
var ChatangoSection = '<section class="Chatango module"><h1 style="margin-top:0px; margin-bottom:7px;">Whatever Chat</h1><object align="center" width="290" height="360" id="obj_1320038262203"><param name="movie" value="http://whateverwiki.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1320038262203&c=BEA771&d=#fcfcfc&f=0&g=#fcfcfc&i=0&j=#fcfcfc&l=2B2B2B&m=1a1854&n=-FFFFFF&o=99&p=11&q=111311&t=0&v=0&aa=1"/><embed id="emb_1320038262203" src="http://whateverwiki.chatango.com/group" width="290" height="360" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1320038262203&c=BEA771&d=#fcfcfc&f=0&g=#fcfcfc&i=0&j=#fcfcfc&l=2B2B2B&m=1a1854&n=FFFFFF&o=99&p=11&q=111311&t=0&v=0&aa=1"></embed></object></section>';
var ChatangoMPSection = '<section class="Chatango module"><object width="300" height="360" id="obj_1320038262203"><param name="movie" value="http://whateverwiki.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1320038262203&c=BEA771&d=#fcfcfc&f=0&g=#fcfcfc&i=0&j=#fcfcfc&l=2B2B2B&m=1a1854&n=FFFFFF&o=99&p=11&q=1113119&t=0&v=0&aa=1"/><embed id="emb_1320038262203" src="http://whateverwiki.chatango.com/group" width="300" height="360" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1320038262203&c=BEA771&d=#fcfcfc&f=0&g=#fcfcfc&i=0&j=#fcfcfc&l=2B2B2B&m=1a1854&n=FFFFFF&o=99&p=11&q=111311&t=0&v=0&aa=1"></embed></object></section>';
 
$(ChatangoSection).insertBefore('#LatestPhotosModule'); /* Wyświetlanie chatango w aktywności przed listą najczęściej ostatnio edytowanych */
$(ChatangoSection).insertBefore('.HotSpotsModule'); /* Wyświetlanie chatango w aktywności przed listą najczęściej ostatnio edytowanych */
$(ChatangoMPSection).appendTo("#MainSiteChat");  /* Wyświetlanie chatango na stronie głównej */
 
}