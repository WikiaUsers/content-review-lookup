// <syntaxhighlight lang="javascript">
/* Script for WordFilter - Written by Drew1200. (Warning: Following script contains a list of expletives) */ 
/* Continued by Curiouscrab */

var alertMessage;
window.outputWarning = ''; //NSFW!!!
window.badWords = (window.badWords || []).concat(["blocked-test", "bfd", "blumpkin", "pussy", "boner", "felch", "fuck", "shit", "bastard", "bitch", "faggot", "fag", "nigger", "cum", "fuq", "dafuq", "dick", "whore", "cunt", "stfu", "boob", "slut", "joder", "jodete", "jodido", "tetas", "pechos", "semen", "puta", "mierda", "coño", "nigga", "gilipollas", "cabrón", "fap", "fapear", "fapearse", "vagina", "penis", "rape", "bullock", "prick", "urbandictionary", "boku no pico", "horny", "fak", "fark", "faku", "porn", "asshole", "tits", "titties", "twat", "wank",]);

$('#Write textarea').keydown(function(e) {
    if (e.keyCode == 13 && wordFilter() === true && mainRoom.active === true) {
        for (var i = 0; i < window.badWords.length; i++) {
            window.outputWarning = $('#Write textarea').val();
        }
        $("div.Chat>ul").append("<li class='inline-alert' id='temporary'>" + (alertMessage || "WARNING: The message you just posted contains words marked as inappropriate. Are you sure you want to send this message?") + " ~<br><br>~ <button onclick='ignoreWarning();'>Continue</button> or <button onclick='endMessage();'>Cancel</button></span></li>");
        $(this).unbind('keypress').val('');
    }
});
 
function ignoreWarning() {
    mainRoom.socket.send(new models.ChatEntry({roomId:this.roomId,name:wgUserName,text:window.outputWarning}).xport());
    $("#temporary").remove();
}
 
function endMessage() {
    $('#temporary').remove();
}
 
function wordFilter() {
    for (var i = 0; i < window.badWords.length; i++) {
        if ($('#Write textarea').val().toLowerCase().indexOf(window.badWords[i]) > -1) {
            return true;
        }
    }
}
// </syntaxhighlight>