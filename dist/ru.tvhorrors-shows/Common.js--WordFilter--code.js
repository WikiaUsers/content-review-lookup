// <syntaxhighlight lang="javascript">
/* Script for WordFilter - Written by Drew1200. (Warning: Following script contains a list of expletives) */ 
window.outputWarning = '';
window.badWords = ["blocked-test", "bfd", "omfg", "blumpkin", "pussy", "boner", "felch", "fuck", "shit", "bitch", "faggot", "fag", "nigger", "dick", "whore", "cunt", "wtf", "stfu", "piss", "boobs", "tits", "damn", "slut", "lmao", "joder", "jodete", "jodido", "tetas", "pechos", "felación", "semen", "puta", "mierda", "coño", "nigga", "gilipollas", "cabrón", "fap", "fapear", "fapearse", "caralho", "cacete", "siririca", "sexo oral", "sexo anal", "fazer anal", "fazer oral", "ppk", "bronheiro", "comer cu", "punheteiro",  "aquela puta", "sua puta", "é puta", "que puta", "fodi", "fodendo", "oco no rabo", "deixar um oco", "da puta", "brioco", " piru ", "meu piru ", "meu piru,", "meu piru.", "viadão", "viadaum", "tô puto", "muito puta", "toma no cu", "tome no cu", "cacete", "kct", "cecete", "crl", "bct", "escravorola", " porra ", "q porra", "saporra", "çáporra", "poha", "poh4", "porr4", "çapoha", "çápoha", "çaporra", "que porra", "essa porra", "essa porr4", "essa porra", "essa poha", "essa poh4", "poarr", "po4rr", "viadaji", "porrã", "porrá", "prra", " viada", "viadu", "viadin", "viadim", "viadona", "viadage", "viadagi", "fodã", "porra", "cu", "xota", "buceta", "fdp", "tnc", "foda-se", "foda", "caralha", "punheta", "transa", "kurwa", "pochwa", "сука", "блять", "блядь", "хуй", "пидарос", "пизда"];
$('#Write textarea').keydown(function(e) {
    if (e.keyCode == 13 && wordFilter() === true && mainRoom.active === true) {
        for (var i = 0; i < window.badWords.length; i++) {
            window.outputWarning = $('#Write textarea').val();
        }
        $("div.Chat>ul").append("<li class='inline-alert'>Внимание: Сообщение содержит оскорбительные слова. Всё равно отправить?<span id='temporary'> ~<br><br>~ <span onclick='ignoreWarning();' style='color:blue;cursor:pointer;'>Yes</span> or <span onclick='endMessage();' style='color:blue;cursor:pointer;'>Cancel</span><span></li>");
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