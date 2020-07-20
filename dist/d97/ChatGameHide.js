// Script with no imports for hiding ChatGame messages in chats 
// which don't want to make ChatGame default functionality.

chatroomID = "Chat_".concat(roomId);

function clearChatGame() {
    message = '';
    id = $($("#" + chatroomID + " > ul > li")[$("#" + chatroomID + " > ul > li").length - 1]).attr("id").slice(6);

    if ($("#entry-" + id).hasClass("inline-alert")) {
        message = $("#entry-" + id).html().trim(); // gets the contents of messaeg
    } else {
        a = $("#entry-" + id + " > span.message");
        message = $(a).html(); // gets the content of message
    }

    m = $("#"+chatroomID+" > ul > li")[$("#"+chatroomID+" > ul > li").length-2];
    n = $("#"+chatroomID+" > ul > li")[$("#"+chatroomID+" > ul > li").length-1];
 
    p = $($("#"+chatroomID+" > ul > li")[$("#"+chatroomID+" > ul > li").length-2]).attr('data-user');
    q = $($("#"+chatroomID+" > ul > li")[$("#"+chatroomID+" > ul > li").length-1]).attr('data-user');
 
    if($(n).hasClass("inline-alert") && $(m).hasClass("inline-alert") && !$(n).hasClass("continued")) {
        $(n).addClass("continued");
    } // Make sure that the inline alerts don't mess up
     
    if(p == q && !$(n).hasClass("continued")) {
        $(n).addClass("continued");
    } // Check if the usernames are the same. If they are, make n continued
    
    if(p != q && $(n).hasClass("continued")) {
        $(n).removeClass("continued");
    } // If the usernames aren't the same, we're going to make n not-continued
    
    if (message.slice(0,9) == "!ChatGame") {
        $("#entry-"+id).remove(); // Removes ChatGame messages
    }
}

if ($("#" + JLAPI.chatroomID + " > ul > li").length !== 0) {
    console.log("Chat is loaded. Script importing begins");
    mainRoom.model.chats.bind("afteradd", function() {
        clearChatGame();
    });
} else {
    console.log("Chat isn't loaded yet.");
    var i = setInterval(function() {
        if ($("#" + JLAPI.chatroomID + " > ul > li").length !== 0) {
            clearInterval(i);
            console.log("Chat is loaded. Script importing begins");
            mainRoom.model.chats.bind("afteradd", function() {
                clearChatGame();
            });
        } else {
            console.log("Chat isn't loaded yet.");
        }
    }, 1000);
}