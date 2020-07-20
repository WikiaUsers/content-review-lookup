// global helper object for the chat (unused)
//importScriptPage( 'ChatObject/code.js', 'dev' );

// source: http://dev.wikia.com/wiki/ChatTags
//importScriptPage("ChatTags/code.js", "dev");
// The script was moved to another wikia:
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

// Sinthoniel's chat notification script [EXPERIMENTAL]
/*
var sound = document.createElement("audio");
sound.setAttribute("src","vignette4.wikia.nocookie.net/lotrminecraftmod/images/0/09/Chat_notification.ogg");
document.body.appendChild(sound);
$('.Chat ul').change(function() {
    $('audio').trigger('play');
});
*/

// Chat memes...
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        var nodeList = mutation.addedNodes;
        for (var i = 0; i < nodeList.length; ++i) {
            var message = nodeList[i].lastChild;
            var messageText = message.textContent;
            if (messageText.startsWith('>')) {
                message.style.color = '#0F0';
            }
        }
    });    
});
var target = $('.Chat ul');
var config = { attributes: true, childList: true, characterData: true };
observer.observe(target, config);