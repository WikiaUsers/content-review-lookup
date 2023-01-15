/* ChatMP3 */
var textSound = $('#myText').val();
$('ul.WikiChatList').prepend('<div>音樂箱<abbr style="border-bottom:1px dotted black" title="MP3, OGG & WAV"></abbr><audio></audio></div><div><input type="text" /></div>');
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