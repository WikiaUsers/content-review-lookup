if ( wgNamespaceNumber != undefined && !window.chatango ) {
        addOnloadHook( addChatango2 );
}
 
var chatango2 = true;
 
function addChatango2 () {
    $('<section class="Chatango2 module"><fb:like-box href="http://www.facebook.com/pages/BlazBlue-Wiki/108293942669881" height="150" width="297" colorscheme="dark" border_color="#171717" show_faces="false" stream="true" header="false"></fb:like-box></section>').insertAfter('.WikiaActivityModule').insertBefore('.CommunityCornerModule');
}