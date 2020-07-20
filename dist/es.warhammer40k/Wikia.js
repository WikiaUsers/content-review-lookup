importArticles({
    type: "script",
    articles: [
        "w:c:comunidad:MediaWiki:Parallax.js"
    ]
});

jQuery(document).ready(function($) {
	$(".contbtn").mouseleave(function(){
		$(this).find('#imove').animate({ top: '127px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#imove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});

   $('.vozdehorus').append('<iframe src="http://www.ivoox.com/player_es_podcast_394221_1.html" width="100%" height="440" frameborder="0" allowfullscreen="0" scrolling="no" ></iframe>');

// Para notificación de alianza con otras wikias
var WikiaNotificationexpiry = 10;
importScriptPage('WikiaNotification/code.js', 'dev');