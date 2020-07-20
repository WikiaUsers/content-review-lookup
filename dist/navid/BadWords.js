//If your a mod, then if someone says something thats on the list below (swears) it will ping you
if (mainRoom.userMain.attributes.isModerator) {
    // Swearlist.
    // Using a double backslash '\\b' is a substitute for a barrier: word\\b would trigger on forword but not on wordgame, etc.
        var SWEAR_LIST = [
        "fuck",
        "shit",
        "fag",
        "bitch",
        "cunt",
        "coon",
        "\\bcum",
        "nigg",
        "niglet",
        "whore",
        "gtfo",
        "stfu",
        "wtf",
        "idfk",
        "idfc",
        "idgaf",
        "jfc",
        "\\bomf",
        "\\bbs\\b",
        "\\bffs\\b",
        "milf",
        "retard"
    ];

    var PING_SOUND = 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg';

    // Ask our end-user if we want notifications for the script.
    Notification.requestPermission();

    // Function itself.
    console.log("Swearchecking activated!");
    var afterChat = function (chat) {
    var t = chat.attributes.text,
    n = chat.attributes.name,
    isInline = chat.attributes.isInlineAlert || false,
    context = mainRoom.viewDiscussion.chatUL.children().last();
    if (new RegExp(SWEAR_LIST.join('|'), 'mi').test(t)) {
        $('<audio>', {
            id: 'ping',
            src: PING_SOUND,
            autoplay: true
        }).appendTo('body');
        // Display desktop notifications.
        if (Notification.permission === 'granted') {
            new Notification(n + " swore!", {
                body: t,
                icon: context.children('.avatar').attr('src').slice(0, -2) + '150'
            });
        }
        // Change the look of the triggered message.
        context.children('.message').wrap('<span style="color:red !important; font-weight:bold !important; text-shadow:0px 0px 10px red !important;" />');
    }
    var chatMain = mainRoom.viewDiscussion.chatDiv[0];
    if (chatMain.scrollHeight - chatMain.scrollTop - chatMain.clientHeight > 150) return;
    mainRoom.viewDiscussion.scrollToBottom();
    };
    mainRoom.model.chats.bind('afteradd', afterChat);
}