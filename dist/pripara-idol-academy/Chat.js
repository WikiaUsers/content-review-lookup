var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
 
mw.loader.using('jquery.ui.autocomplete', function() {
    $(function() {
        var availableTags = [
            '[b][/b]',
            '[bg=""][/bg]',
            '[big][/big]',
            '[c=""][/c]',
            '[code][/code]',
            '[font=""][/font]',
            '[i][/i]',
            '[img=""]',
            '[small][/small]',
            '[s][/s]',
            '[sub][/sub]',
            '[sup][/sup]',
            '[u][/u]',
            '[yt=""]'
        ];
 
        $('textarea[name=message]').autocomplete({
            source: availableTags,
            position: { my: "left bottom", at: "left top", collision: "none" }
        });
 
        mw.util.addCSS('.ui-autocomplete{border:1px solid #000;background:#000;width:150px!important}.ui-menu-item{background:#fff;border-bottom:2px solid #000}.ui-menu-item a{font-family:monospace;color:#000!important}');
    });
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