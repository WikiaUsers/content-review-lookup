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