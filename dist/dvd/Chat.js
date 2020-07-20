importScriptPage( 'ChatObject/code.js', 'dev' );
Chat.setColorScheme({
chatBackground: '#eaff00',
pageBackground: 'black',
textColor: '#FFB600'
});
window.outputWarning = '';
window.badWords = ["blocked-test", "bfd", "omfg", "fuck", "shit", "bastard", "bitch", "faggot", "fag", "nigger", "dick", "whore", "cunt", "wtf", "stfu", "piss", "tits", "damn", "masturbate", "slut", "lmao", "joder", "jodete", "jodido", "tetas", "pechos", "masturbar", "masturbación", "felación", "semen", "puta", "mierda", "coño", "nigga", "gilipollas", "cabrón", "fap", "fapear", "fapearse"];
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

var textSound = $('#myText').val();
$('ul.WikiChatList').prepend('<div>Type here the URL of the <abbr style="border-bottom:1px dotted black" title="MP3, OGG & WAV"> audio file</abbr> and press Enter<audio></audio></div><div><input type="text" /></div><a href="//www.google.com/search?q=mp3">Search MP3 files</a>');
$('#playAudio').click(function() {
var audiowtf = document.getElementById("audiowtf"); 
audiowtf.play();
});
 
var audioElement = document.getElementsByTagName('audio')[0];
var inputElement = document.getElementsByTagName('input')[0];
 
$('input').keyup(function() {
  if (event.keyCode == 13) {
    loadAndPlay(inputElement.value);
  }
});
 
function loadAndPlay(src) {
  audioElement.pause();
  audioElement.src = src;
  audioElement.load();
  audioElement.play();
}
 
loadAndPlay(inputElement.value);

//
importArticles( {
    type: 'script',
    articles: [
        "u:dev:jumbles/startup.js"
    ]
} );
importArticles( {
    type: 'script',
    articles: [
        "u:dev:tictactoe/code.js"
    ]
} );
importArticles( {
    type: 'script',
    articles: [
        "u:dev:SpellingBee/startup.js"
    ]
} );
importScriptPage('ChatOptions/code.js', 'dev');
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!mods/code.js',
        // ...
    ]
} );
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!kick/code.js',
        // ...
    ]
} );