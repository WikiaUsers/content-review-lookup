/* Custom username hilite (goodbye intervals!) */
/* by Cod4 */
 
/* Listen for new messages and update hilite for each incoming message */
window.mainRoom.socket.bind('chat:add', function(message) {
    var name = getName(message);
    updateHighlight($('.username').last(), name);
});
 
/* Listen for new user joins and update hilite on the userlist accordingly */
window.mainRoom.socket.bind('join', function(message) {
    var name = getName(message);
    /* Loop around userlist to find appropriate element */
    $('#WikiChatList').find('li.User').each(function() { 
        if ($(this).attr("data-user") == name) {
            updateHighlight($(this).find('span.username'), name);
        }
    });
});
 
/* Listen for user status changes and keep user highlight on the userlist */
window.mainRoom.socket.bind('updateUser', function(message) {
    var name = getName(message);
    if (name == mw.config.get('wgUserName')) {
        updateYourHighlight();
    }
    else {
        $('#WikiChatList').find('li.User').each(function() { 
            if ($(this).attr("data-user") == name) {
                updateHighlight($(this).find('span.username'), name);
            }
        });
    }
});
 
/* update your username and the existing userlist when you join chat */
updateHighlight();
$('#WikiChatList').find('li.User').each(function() { 
        updateHighlight($(this).find('span.username'), $(this).attr("data-user"));
}); 
 
/* Get a username from a chat event to use */
function getName(messageData) {
    var userData = new models.User();
    userData.mport(messageData.data);
    return userData.get('name');
}
 
/* Function to update your highlight at the upper right */
function updateYourHighlight() {
    var headerUserElement = $('#ChatHeader').find('div.User').find('span.username');
    updateHighlight(headerUserElement, mw.config.get('wgUserName'));
}
 
/* Clear chat */
function addClearChatText() {
    "use strict";
    if ($('.clearChatText').length <= 0) {
        var clearChatText = document.createElement('span');
        $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto; -webkit-user-select: none; -moz-user-select: none; user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
    }
}
function clearChat() {
    "use strict";
    var chatSize = $('div.Chat:first ul li').size() - 1;
    $('.Chat:first li:lt(' + chatSize + ')').remove();
}
window.onload = addClearChatText();
 
/* Chat options */
var chatOptionsLoaded = false;
if (!chatOptionsLoaded) {
    chatOptionsLoaded = true;
}
 
//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
importArticles( {
    type: 'script',
    articles: [
        'u:dev:ChatTags/code.js',
        'u:dev:!mods/code.js',
        'u:dev:ChatOptions/code.js'
    ]
} );

/* This will most likely let the bot still work without removing the ChatHacks function */
if(mw.config.get('wgUserName') !== 'ShinyVaporeon') {
    importScriptPage('User:ShinyVaporeon/wikia.js', 'pokepasta');
}