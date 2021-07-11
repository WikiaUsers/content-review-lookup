// Ligbox - by ShopDD  http://shopdd.net/ligbox/
$(function(){
    $('body:not([class*="page-特別"]):not([class*="page-ファイル"]) #content').on('click', 'a', function(event) {
        var url = $(this).attr("href");
 
		if(!url.match(/(jpg|gif|png)/i)){
			return;
		}

		$('body').addClass('modal-open');
		$('body').append('<div id="ovray"><div id="imagebox"><img src="' + url + '" id="img" /></div></div>');
		$('#ovray').fadeIn(0,function(){
			var img = new Image();
			img.src = url;
			$('#imagebox').fadeIn();
		});
 
		$('#ovray').on('click', function() {
			$(this).fadeOut(0, function(){
				$(this).remove();
				$('body').removeClass('modal-open');
			});
		});
        return false;
    });
});