var pagename = mediaWiki.config.get('wgPageName');

/* Adventskalendar */
if (pagename.indexOf("Calendrier_Avent") == 0) {
  $('body').addClass('neige');

  if (pagename !== "Calendrier_Avent") {
    $(document).ready(function() {
       $('<a style="font-size: small;" href="/Calendrier_Avent">&nbsp;&lt;&nbsp;Retour au calendrier</a>').insertBefore('.avent');
    });
  }
}

if (pagename === "Calendrier_Avent") {
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

        function showDay(elm, day) {
 	   $(elm).css('cursor', 'initial');

           $('.numero',elm).show();
           $('.fenetre',elm).show();
        }
 
	$(document).ready(function() {

               var cookie = jQuery.parseJSON(getCookie("advent"));
 
		$('.avent .case').each(function(index) {
			var opened = $(this).data('opened');
			var day = $(this).data('day');
 
			if(cookie) {
				var thisopened = cookie[day];
				if(thisopened === 1) {
					$(this).data('opened','1');
					showDay(this, day);
				}
			}

                        if ($(this).data('opened') === 0 && $(this).hasClass('canopen')) {
                     	   $(this).css('cursor', 'pointer');
                        }
		});
 
		$('.avent .case.canopen').hover(function() {	
			var opened = $(this).data('opened');
			if(!opened) {
                                $('.coin',this).show();
			}
		}, function() {
                        $('.coin',this).hide();
		});

		$('.avent .case').on('click', function() {
			var opened = $(this).data('opened');
			var day = $(this).data('day');
			if(!cookie) {
				cookie = {};
			}
			if($(this).hasClass('canopen')) {
				$(this).data('opened','1');

				$('.coin',this).hide();

				showDay(this, day);

				cookie[day] = 1;
				setCookie("advent",JSON.stringify(cookie),365);
			}
		});
	});
}