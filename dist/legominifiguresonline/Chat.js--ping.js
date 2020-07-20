function chatMsgSound() {
    $("body").append("<audio src='https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg' id='newmsgsound'></audio>"), document.getElementById("newmsgsound").volume = 1, document.getElementById("newmsgsound").play(), window.setTimeout(function () {
        $("#newmsgsound").remove()
    }, 500)
}

$("textarea[name=message]").focus();
var window_focus = true;
$(window).focus(function() {
    window_focus = true;
})
    .blur(function() {
        window_focus = false;
});
 
chatEnableNotification();
jQuery(window).load(function () {
$('.Chat').bind("DOMSubtreeModified",function(){
    if (!window_focus)    
  chatMsgSound()
});
});