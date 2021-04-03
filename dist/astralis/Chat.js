/* CHAT TAGS */
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

/* USTATS CHANGE */
setInterval(function(){
    "use strict";
    $('.info').each(function(){
       if (this.innerHTML.match(/Ahri-chan/)){
           $(this).attr('id', 'Ahri');
       }
       if (this.innerHTML.match(/Grizzly Bear/)){
           $(this).attr('id', 'Bear');
       }
       if (this.innerHTML.match(/Shuraen/)){
           $(this).attr('id', 'Shu');
       }
       if (this.innerHTML.match(/Ｍｅｒｒｉ Ｘｏｚｕ/)){
           $(this).attr('id', 'Cel');
       }
     });
}, 1);

/* GREENTEXT SCRIPT */
mainRoom.model.chats.bind("afteradd", function(c) { 
    var string = $("#Chat_" + roomId + " .message:last").html(); 
    if (string.search(/^&gt;[^\.\(:;]/)!=-1){
    $("#Chat_" + roomId + " .message:last").css('color', '#789922');
} 
});