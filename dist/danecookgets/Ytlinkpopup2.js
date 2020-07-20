// DO NOT USE THIS TOGETHER WITH THE OLDER ytlinkpopup.js
importStylesheetPage('User:Mfaizsyahmi/ytlinkpopup2.css', 'hitlerparody');
var ytlinkpopup_ctrl = 0
if ( $(".YT_popup").length==0 ) { 
	$('.WikiaArticle').prepend('<div class="YT_popup" style="position:absolute; bottom:20px, left:0px; z-index:1000; background-color:#555555">Alo</div>');
	$(".YT_popup").hide()
	function closeYtPopup() { $(".YT_popup").html("").hide() }
 
	$('a.external[href*="www.youtube.com/watch"]').wrap('<span class="YT-popup-wrapper" style="position:relative"></span>');
	$('a.external[href*="www.youtube.com/watch"]').click(function(e) {
		if (ytlinkpopup_ctrl == 1) return
		e.preventDefault();
		$(".YT_popup").hide()
		var vidurl=$(this).attr("href");
		var videoid=vidurl.split("v=")[1].substr(0,11);
		$(".YT_popup").html('<iframe width="300" height="170" src="http://www.youtube.com/embed/'+videoid+'?autoplay=1" frameborder="0"></iframe><p style="font-size:75%;float:left">Don\'t forget to like the parodies on their <a href="http://youtu.be/'+videoid+'">watch page</a>!</p><button style="float:right" onclick="closeYtPopup()">Close</button><div class="YT_popup_tail"></div>'); //?autoplay=1
		$(".YT_popup").appendTo( $(this).parent() ).show()
	}).attr('title', 'Click to preview video\nCtrl+click to go to watch page');
 
	$(document).keydown(function(e) {
		if (e.keyCode=17) {	
			ytlinkpopup_ctrl = 1;
			console.log( 'CTRL key pressed')
		}
	}).keyup(function(e) {
		ytlinkpopup_ctrl = 0
		console.log('global keyup')
	}); 
}