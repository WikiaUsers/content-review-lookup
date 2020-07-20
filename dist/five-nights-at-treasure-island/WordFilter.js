// <syntaxhighlight lang="javascript">
/* Script for WordFilter - Written by Drew1200. (Warning: Following script contains a list of expletives) */ 
window.outputWarning = '';
window.badWords = ["blocked-test", "bfd", "omfg", "penis", "fuck", "shit", "bastard", "bitch", "faggot", "fag", "nigger", "dick", "whore", "cunt", "wtf", "stfu", "piss", "boobs", "tits", "damn", "masturbate", "slut", "lmao", "cunt", "twat"];
$('#Write textarea').keydown(function(e) {
    if (e.keyCode == 13 && wordFilter() === true && mainRoom.active === true) {
        for (var i = 0; i < window.badWords.length; i++) {
            window.outputWarning = $('#Write textarea').val();
        }
        $("div.Chat>ul").append("<li class='inline-alert'>WARNING: The message you just posted contains words marked as inappropriate. Are you sure you want to send this message?<span id='temporary'> ~<br><br>~ <span onclick='ignoreWarning();' style='color:blue;cursor:pointer;'>Yes</span> or <span onclick='endMessage();' style='color:blue;cursor:pointer;'>Cancel</span><span></li>");
        $(this).unbind('keypress').val('');
    }
})
 
function ignoreWarning() {
    mainRoom.socket.send(new models.ChatEntry({roomId:this.roomId,name:wgUserName,text:window.outputWarning}).xport());
    $("#temporary").remove();
}
 
function endMessage() {
    $('#temporary').remove();
}
 
function wordFilter() {
    for (var i = 0; i < window.badWords.length; i++) {
        if ($('#Write textarea').val().toLowerCase().indexOf(window.badWords[i]) !== -1) {
            return true;
        }
    }
}
// </syntaxhighlight>