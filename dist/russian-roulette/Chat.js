// List of ping noises for the script to randomly pick.
var pings = [
	"https://dl.dropboxusercontent.com/s/78lr7h3zy9u2snn/ping1.ogg",
	"https://dl.dropboxusercontent.com/s/3l25m0az5bgcpwh/ping2.ogg",
	"https://dl.dropboxusercontent.com/s/hibisxgd9v7qnzv/ping3.ogg",
	"https://dl.dropboxusercontent.com/s/8b2guzxjn4rkj3a/ping4.ogg",
	"https://dl.dropboxusercontent.com/s/3ajcgpx2kpi5v9b/ping5.ogg",
	"https://dl.dropboxusercontent.com/s/dsu8vi2vf8buoxe/ping6.ogg",
	"https://dl.dropboxusercontent.com/s/stmx5bg4u6ncopa/ping7.ogg"
];

// Checks for player's username and spin marker at the end.
var pingsCheck = function(chat) {
    
    // Define chat message, chat user, if alert, message context.
    var text = chat.attributes.text;
    var name = chat.attributes.name;
    var isInline = chat.attributes.isInlineAlert || false;
    var context = mainRoom.viewDiscussion.chatUL.children().last();
    
    // If the user isn't Rouletta (the bot) or is inline, it isn't worth checking.
    if (name != 'Rouletta' || isInline) return;
    
    // If the message contains the player's username and the spin marker, ping them.
    if (text.indexOf(mw.config.get('wgUserName')) != -1 && /\[\[spin\| \]\]/.test(text)) {
        
        // Display desktop notification.
        if (Notification.permission === 'granted') {
            new Notification("Russian Roulette", {
                body: "It's your turn, " + mw.config.get('wgUserName') + ", you're up!",
                icon: context.children('.avatar').attr('src').slice(0, -2) + '150'
            });
        }
        
        // Play the sound.
        $('<audio>', {
            id: 'ping',
            src: pings[Math.floor(Math.random() * pings.length)],
            autoplay: true
        }).appendTo('body');
    }
};

// Fix "mainRoom is not defined"
var binded = false;
var interval = setInterval(function() {
    if (window.mainRoom && !binded) {
        Notification.requestPermission();
        mainRoom.model.chats.bind('afteradd', pingsCheck);
        binded = true;
        clearInterval(interval);
    }
}, 250);
 
/* Imports */ 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Tabinsert.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:PrivateMessageAlert/code.js',
    ]
});