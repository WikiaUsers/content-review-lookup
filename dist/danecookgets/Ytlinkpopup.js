if ($('.WikiaRail').length) {
    $(".WikiaRail").append('<section class="module YTlinkmodule" style="position:fixed; bottom:75px; width:296px;; z-index:1000"></section>');
    $(".YTlinkmodule").hide();
    function closeytpopup() { $(".YTlinkmodule").html("").hide() }
 
    $('a.external[href*="www.youtube.com/watch"]').click(function(e) {
	e.preventDefault();
	vidurl=$(this).attr("href");
	videoid=vidurl.split("v=")[1].substr(0,11);
	$(".YTlinkmodule").html('<iframe width="300" height="225" src="http://www.youtube.com/embed/'+videoid+'?autoplay=1" frameborder="0"></iframe><p style="font-size:75%;float:left">Don\'t forget to like the parodies on their <a href="http://youtu.be/'+videoid+'">watch page</a>!</p><button style="float:right" onclick="closeytpopup()">Close</button>').show();
    });
};