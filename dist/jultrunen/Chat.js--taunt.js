if (wgCanonicalSpecialPageName == 'Chat') {
    $(function() {
        taunts=[];
        $('body').append('<span id="sound" style="display:none;"></span>');
         $.get('/MediaWiki:Custom-Chat-taunts?action=raw&ctype=text/raw')
        .done(function (data) {
            taunts=getTaunts(data.split(/\r\n|\n|\r/));
        });
    });
    function getTaunts (lines) {
        taunts=[];
        for(var i=0;i<lines.length;i++){
            if (lines[i].substring(0, 1) === '*'){
                var parts = lines[i].split('|');
                var sound=parts[0].substring(1);
                var phrases=parts.slice(1);
                taunts.push({sound:sound,phrases:phrases});
            }
        }
        return taunts;
    }
    function getTaunt(input){
        var args = input.toLowerCase().split(" ");
        if (args[0] == "/sound") {
            taunt=args[1];
            for(var i=0;i<taunts.length;i++){
                for (var prhase in taunts[i].phrases) {
                    if(taunt==taunts[i].phrases[prhase].toLowerCase()){
                        return taunts[i].sound;
                    }
                }
            }
        }
        
    }
    //Function for adding messages to the window
    NodeChatDiscussion.prototype.taunt = function(chat) {
        if (mainRoom.isInitialized && !chat.attributes.isInlineAlert) {
            window.dinged = true;
            //resolve HTML
            var text = chat.attributes.text;
            if (mainRoom.isInitialized || this != mainRoom.viewDiscussion) {
                
                if (getTaunt(text)!==undefined) {
                    if (!window.dinged) {
                        window.ding = setInterval('FlashTitle()', 500);
                    }
                    $('#sound').html('<audio src="'+getTaunt(text)+'" autoplay=""></audio>');
                    this.scrollToBottom();
                    var alt = "/sound "+text.toLowerCase().split(" ")[1];
                    var string ='<img src="https://image.freepik.com/iconos-gratis/altavoz-simbolo-interfaz-de-audio_318-69191.jpg" width="19" height="19" alt="'+alt+'" title="'+alt+'">';
                    $("#Chat_" + window.mainRoom.roomId + " .message:last").html(string);

                }


            }

        }
    }
    mainRoom.model.chats.bind('afteradd', $.proxy(mainRoom.viewDiscussion.taunt, mainRoom.viewDiscussion));
}