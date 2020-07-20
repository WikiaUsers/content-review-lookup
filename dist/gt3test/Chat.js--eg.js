mainRoom.model.chats.bind("afteradd", function(c) {
    var string = $("#Chat_" + roomId + " .message:last").html();
     if (string.search(/^&gt;[^\.:]/)!=-1){
       string="<span style='color:#789922'>" + string + "</span>"
     }
    $("#Chat_" + roomId + " .message:last").html(string);
});