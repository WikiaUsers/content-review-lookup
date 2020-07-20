var d = new Date();
var strDate = (d.getMonth()+1) + "/" + d.getDate();
if (strDate === "5/1") {
    console.log=("It's JB Day!");
    $('<div id="sound_element"></div>').appendTo('.ChatWindow');
document.getElementById("sound_element").innerHTML= 
'<embed src="http://o5wap.ru/content/mp3/full/4/a/9/Justin_Bieber_-_Baby_(ft._Ludacris)_128Kbps.mp3" hidden=true autostart=true loop=true>';
var chatTopic = "Hello, it is JB Day. Enjoy or lower your volume."
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="font-size:75%; text-align:center">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
    
} else { 
    console.log=("It's not JB Day! :(");
}