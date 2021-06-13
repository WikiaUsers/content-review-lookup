$(function() {
    if(window.chatBlockedloaded) {
        return;
    }
    
var usersBlocked;
$.getJSON("http://vampirediaries.wikia.com/?action=ajax&rs=ChatAjax&method=getPrivateBlocks", function(users) {
    var blocked = users.blockedByChatUsers;
    usersBlocked = blocked;
});

console.log("You are currently blocked by" + ' ' + usersBlocked.toString());
$('#ChatHeader h1.public.wordmark').append("<span style=\"font-size:11px; text-align:center;\">PM's are currently blocked to" + " " + usersBlocked.toString() + "</div>");

    // Don't forget to set the variable afterwards
    window.chatBlockedloaded = true;
});