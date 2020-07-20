
$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'Welcome' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});

var logInterval = 100000;
importScriptPage('User:Monchoman45/ChatHacks.js', 'c');

//BEGIN script for new Message Wall tags
 
 
// url variable
 
var url = 'my-ghostly-friends';
 
// Adding the class for the users 
 
var admin = function(addAdmins) {
    $('.edited-by a[href="http://' + url + '.wikia.com/wiki/Message_Wall:' + addAdmins + '"]').addClass('AdminMessage');
};
 
var bureaucrat = function(addBureaucrats) {
    $('.edited-by a[href="http://' + url + '.wikia.com/wiki/Message_Wall:' + addBureaucrats + '"]').addClass('BureaucratMessage');
};
 
 
var chatmod = function(addChatmods) {
    $('.edited-by a[href="http://' + url + '.wikia.com/wiki/Message_Wall:' + addChatmods + '"]').addClass('Chat-ModMessage');
};
 
var contentmod = function(addContentmods) {
    $('.edited-by a[href="http://' + url + '.wikia.com/wiki/Message_Wall:' + addContentmods + '"]').addClass('Content-ModMessage');
};
 
var discussionmod = function(addDiscussionmods) {
    $('.edited-by a[href="http://' + url + '.wikia.com/wiki/Message_Wall:' + addDiscussionmods + '"]').addClass('Discussion-ModMessage');
};
 
 
// Users that the tags will be given to
 
// Remember to copy the link to your message wall because it will pick up any special characters that are important for functioning. Furthermore don't use the entire link just use the part after "Message_Wall:"
 
bureaucrat('Chase_McFly');
bureaucrat('Messenger_of_Heaven');
 
// Continued script for adding the tags
 
$('<span>(Bureaucrat)</span>').prependTo('.subtle.BureaucratMessage');
$('<span>(Administrator)</span>').prependTo('.subtle.AdminMessage');
$('<span>(Chat Moderator)</span>').prependTo('.subtle.Chat-ModMessage');
$('<span>(Content Moderator)</span>').prependTo('.subtle.Content-ModMessage');
$('<span>(Discussions Moderator)</span>').prependTo('.subtle.Discussion-ModMessage');
 
//END of script for the tags