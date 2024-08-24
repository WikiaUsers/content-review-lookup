/*
---------------------------------
 Floating HTML Wiki Notification
---------------------------------

-----------------------
 SCRIPTS COMPLEMENTARIOS
-----------------------
- WikiNotification.css

---------
 AUTORES 
---------
- E12Dragon: current and orginal version

-----------------------
 EJEMPLO DE CONFIGURACIÓN
-----------------------
<div class="wiki-notification">
Su texto aquí<span class="wiki-notification-sprite-close"></span>
</div>
*/

function closeWikiNotification () {
	$(".wiki-notification-sprite-close").click(function(){
		$(this).parents(".wiki-notification").remove();
	});
}

$(function () {
	if (mw.config.get('wgCanonicalNamespace') == 'Message_Wall') {
		var interval = setInterval(function () {
			if ($('.wiki-notification').length) {
        	clearInterval(interval);
        	closeWikiNotification();
    		}
		}, 100 );
	} else {
		closeWikiNotification();	
	}
});