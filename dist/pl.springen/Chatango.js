if ( wgNamespaceNumber != undefined && !window.chatango ) {
        addOnloadHook( addChatango );
}
 
var chatango = true;
 
function addChatango () {
    $('<section class="Chatango module"><h1 style="margin-top:0px; margin-bottom:7px;">Czat Ski Jump Wiki<span style="float:right;color:white !important;font-family:Verdana !important;" title="Jeśli nie chcesz, aby nowy chat, był dłużej wyświetlany, dodaj do „/wiki/Specjalna:MyPage/wikia.css” następującą linijkę: .Chatango {display:none !important;}"><sup><small style="cursor:help;">?</small></sup></span></h1><object width="300" height="400" id="obj_33085936485"><param name="movie" value="http://skijumpwiki.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=33085936485&v=0&ab=0"/><embed id="emb_33085936485" src="http://skijumpwiki.chatango.com/group" width="300" height="400" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=33085936485&v=0&ab=0"></embed></object></section>').insertAfter('.WikiaActivityModule').insertBefore('.FollowedPagesModule').insertAfter('.CommunityCornerModule');
}