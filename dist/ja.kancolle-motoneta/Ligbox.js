// Ligbox - by ShopDD  http://shopdd.net/ligbox/
$(function(){
    $('body:not([class*="page-特別"]):not([class*="page-ファイル"]) #WikiaMainContent').on('click', 'a', function(event) {
        var url = $(this).attr("href");
 
		if(!url.match(/(jpg|gif|png)/i)){
			return;
		}
 
		$('body').append('<div id="ovray"><div id="imagebox"><img src="' + url + '" id="img" /></div></div>');
		$('#ovray').fadeIn(0,function(){
			var img = new Image();
			img.src = url;
			var width  = img.width / 2;
			var height = img.height / 2;
			$('#imagebox').fadeIn().css({margin:"-"+ height + "px 0 0 -" + width +"px"});
		});
 
		$('#ovray').on('click', function() {
			$(this).fadeOut(100, function(){
				$(this).remove();
			});
		});
        return false;
    });
});