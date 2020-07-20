importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!ban/code.js',
        // ...
    ]
} );

ImportArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!mods/code.js',
        // ...
    ]
} );

importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!kick/code.js',
        // ...
    ]
} );

importArticles({ type: 'script', articles: [
    'u:dev:MediaWiki:ChatHacks.js'
]});
importScriptPage('MediaWiki:AjaxEmoticons/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:SpellingBee/startup.js'
    ]
});

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