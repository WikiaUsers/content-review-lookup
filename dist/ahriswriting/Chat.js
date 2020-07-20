importArticles({
       type: 'script',
       articles: [
        'u:dev:ChatObject/code.js',
        'MediaWiki:Chat.js/Sandbox.js'
       ]
});

importScriptPage("ChatTags/code.js", "dev");

/* Greentext script */
mainRoom.model.chats.bind("afteradd", function(c) { 
var string = $("#Chat_" + roomId + " .message:last").html(); 
if (string.search(/^&gt;[^\.\(:;]/)!=-1){
$("#Chat_" + roomId + " .message:last").css('color', '#789922');
} 
});