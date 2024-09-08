/*Instalação do código !mods*/
importArticles( {     type: 'script',     articles: [         // ...         'u:dev:MediaWiki:!mods/code.js',         // ...     ] } );
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatTags/code.js',
        'u:dev:ChatOptions/code.js',
        'u:hedgeworks:WordFilter/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:!mods/code.js'
    ]
});
 
/*Interface do ChatOptions*/
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
 
/*Instalação de arquivos de áudio (MP3, WAV e OGG)*/
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
 
/*Inserção de imagens*/
importScriptPage('ChatImages/code.js', 'dev');
 
/*Modificação da marca temporal*/
importScriptPage('ChatTimestamps/code.js','dev');

/*Janela de emoticons*/
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons.js',
        // ...
    ]
});