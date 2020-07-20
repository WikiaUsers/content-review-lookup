/* Adventskalender */
if (mediaWiki.config.get('wgPageName') === "Projekt:Adventskalender_2016") {
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	} 
 
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
		}
		return "";
	} 
 
	$(document).ready(function() {
		var date = new Date();
		var currentmonth = date.getMonth(); // 0-11: January is 0, December is 11
		var currentday = date.getDate(); 
		var currentyear = date.getFullYear();
		var cookie = jQuery.parseJSON(getCookie("advent"));
 
			$('.advent .item').each(function(index) {
				var opened = $(this).data('opened');
				var day = $(this).data('day');
				var image = $(this).data('image');
				var link = $(this).data('link');
 
				if (((currentmonth == 11 && currentday >= day) ||  currentyear > 2016) && opened == 0) {
					$(this).addClass('canopen');
					$(this).attr('style','cursor: pointer;');
				}	
				if(cookie) {
					var thisopened = cookie[day];
					if(thisopened === 1) {
						$(this).removeClass('canopen');
						$(this).data('opened','1');
						$('img',this).data('src',image);
						$('img',this).attr('src',image);
						$('img',this).wrap('<a href="' + mw.html.escape(link) + '">');
					}
				}
			});
 
		$('.advent .canopen').hover(function() {	
			var opened = $(this).data('opened');
			if(!opened) {
				var originalimage = $('img',this).attr('src');
				$(this).data('original',originalimage);
				var hoverimage = $(this).data('hover');
				$('img',this).data('src',hoverimage);
				$('img',this).attr('src',hoverimage);
			}
		}, function() {
			var opened = $(this).data('opened');
			if(!opened) {
				var originalimage = $(this).data('original');
				$('img',this).data('src',originalimage);
				$('img',this).attr('src',originalimage);
			}
		});
		$('.advent .item').on('click',function() {
			var opened = $(this).data('opened');
			var day = $(this).data('day');
			var image = $(this).data('image');
			var link = $(this).data('link');
			if(!cookie) {
				cookie = {};
			}
			if ((currentmonth == 11 && currentday >= day) ||  currentyear > 2016) {
				$('img',this).data('src',image);
				$('img',this).attr('src',image);
				$('img',this).wrap('<a href="' + mw.html.escape(link) + '">');
				$(this).data('opened','1');
				cookie[day] = 1;
				setCookie("advent",JSON.stringify(cookie),365);
			}
		});
	});
}