/**
 * PingEveryone
 * Allows for users to ping everyone in the chat
 * @Author Mario&LuigiBowser'sInsideStory
 * Now with the feature of the notifications on the tab
 */
(function(){
    if (mw.config.get('wgCanonicalSpecialPageName') !== "Chat" || window.pingEveryoneLoaded) return;
    window.pingEveryoneLoaded = true;
    window.pingEveryone = window.pingEveryone ? window.pingEveryone : {};
    window.pingEveryone.phrase = window.pingEveryone.phrase ? window.pingEveryone.phrase : '@everyone';
    window.pingEveryone.color = window.pingEveryone.color ? window.pingEveryone.color : '#f4dd2c';
    window.pingEveryone.titleAlert = window.pingEveryone.titleAlert ? window.pingEveryone.titleAlert : "Alert!";
    mw.util.addCSS(".pinged {" +
        "background-color: " + window.pingEveryone.color + " !important;" +
    "}");
    window.oldTitle = document.title;
    window.addEventListener('focus', function(){
        window.isActive = true;
        clearInterval(window.titleSwitch);
        document.title = window.oldTitle;
        window.titleSwitchActive = false;
    });
    window.addEventListener('blur', function(){
        window.isActive = false;
    });
    mainRoom.model.chats.bind('afteradd', function(data){
        var ping = new Audio(window.pingEveryone.audio || 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg');
        if (new RegExp(window.pingEveryone.phrase, 'i').test(data.attributes.text)) {
            if (window.pingEveryone.modsOnly === true) {
                if (mainRoom.model.users.findByName(data.attributes.name).attributes.isModerator){
                    mainRoom.viewDiscussion.chatUL.children().last().addClass('pinged');
                    if (window.isActive) return;
                    ping.play();
                    if (window.titleSwitchActive) return;
                    window.titleSwitchActive = true;
                    window.titleSwitch = setInterval(function(){
                        document.title = document.title !== window.oldTitle ? window.oldTitle : window.pingEveryone.titleAlert + " " + document.title;
                    }, 1000);
                }
            }
            else {
                mainRoom.viewDiscussion.chatUL.children().last().addClass('pinged');
                if (window.isActive) return;
                ping.play();
                if (window.titleSwitchActive) return;
                window.titleSwitch = setInterval(function(){
                window.titleSwitchActive = true;
                document.title = document.title !== window.oldTitle ? window.oldTitle : window.pingEveryone.titleAlert + " " + document.title;
                }, 1000);
            }
        }
    });
})();