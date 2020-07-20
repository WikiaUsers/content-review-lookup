/**
 * ChatNotification.js
 *
 * Plays a sound whenever someone writes a message in the chat.
 * author: [[User:Sinthoniel]]
 */

var sound = document.createElement("audio");
sound.setAttribute("src","vignette4.wikia.nocookie.net/lotrminecraftmod/images/0/09/Chat_notification.ogg");
document.body.appendChild(sound);

$('.Chat ul').change(function() {
    $('audio').trigger('play');
})