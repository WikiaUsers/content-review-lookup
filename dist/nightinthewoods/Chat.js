/* =======================================
 
Pings and Title Notifications
Credits to Rose (Incongruence) & Ozu
Hooks into options and won't work without it lol
 
======================================  */
 
var old = document.title; // So we can modify the title message properly
var unread = 0; // A counter for how many messages we haven't looked at yet
$("head").append('<style>.pinged {color: red;}</style>');
 
// The main function. This will add +1 to unread messages in the title bar (like when you have a
// notification on Facebook), and it will ping the user if they have the setting enabled.
pingUser = function(e) {
    var message = e.attributes.text.toString();
    if (!document.hasFocus()) {
        unread++;
        document.title = "(" + unread + ") " + old;
    }
};
 
// This just lets us return the page title to normal once we click on the page
window.onfocus = function() {
    document.title = old;
    unread = 0;
};

// Time to load everything in (thx to ozu for this snippet)
var loader = setInterval(function() {
    if (typeof mainRoom !== "undefined") {
        mainRoom.model.chats.bind("afteradd", function(e) {
            pingUser(e);
        });
        clearInterval(loader);
    }
}, 200);