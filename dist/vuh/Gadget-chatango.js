if ( wgNamespaceNumber != undefined && !window.chatango ) {
        addOnloadHook( addChatango );
}
 
var chatango = true;
 
function addChatango () {
    $('<section class="Chatango module"><h1 style="margin-top:0px; margin-bottom:7px;">Czat Elder Scrolls Wiki<span style="float:right;color:white !important;font-family:Verdana !important;" title="Jeśli nie chcesz, aby nowy chat, był dłużej wyświetlany, dodaj do „/wiki/Specjalna:MyPage/wikia.css” następującą linijkę: .Chatango {display:none !important;}"><sup><small style="cursor:help;">?</small></sup></span></h1><object width="280" height="400" id="obj_1295488390137"><param name="movie" value="http://elderscrollswiki.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1295488390137&c=FFFFFF&d=DAA520&f=0&g=FFFFFF&i=0&j=CCCCCC&l=696969&m=696969&n=FFFFFF&o=99&p=10&q=000000&t=0&v=0&aa=1"/><embed id="emb_1295488390137" src="http://elderscrollswiki.chatango.com/group" width="280" height="400" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1295488390137&c=FFFFFF&d=DAA520&f=0&g=FFFFFF&i=0&j=CCCCCC&l=696969&m=696969&n=FFFFFF&o=99&p=10&q=000000&t=0&v=0&aa=1"></embed></object></section>').insertAfter('.WikiaActivityModule','HotSpotsModule').insertBefore('.FollowedPagesModule');
}