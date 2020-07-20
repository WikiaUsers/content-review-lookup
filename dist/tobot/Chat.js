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

var chatags = { images: true, videos: true };

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatMessageWallCount.js',
        'u:dev:ChatImages/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatHacks.js',
        'u:dev:NewMessageCount.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:SpellingBee/startup.js',
        'u:dev:TitleNotifications.js',
        'u:dev:Tictactoe/code.js',
        'u:dev:IsTyping/code.js',
        'u:dev:ExtendedPrivateMessaging/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
    ]
});