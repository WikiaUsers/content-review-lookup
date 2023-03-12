/* Any JavaScript here will be loaded for all users on every page load. */
var WikiaNotificationMessage = "Check our new mobile app for <a href='https://play.google.com/store/apps/details?id=com.wikia.singlewikia.warhammerfantasy&hl=en'>Android</a> and <a href='https://itunes.apple.com/app/fandom-community-for-warhammer/id1167494527?mt=8%27'>IPhone</a>";
var WikiaNotificationexpiry = 10;

/*
importArticles({
    type: "script",
    articles: [
        "w:c:comunidad:MediaWiki:Parallax.js"
    ]
});
*/

jQuery(document).ready(function($) {
	$(".contbtn").mouseleave(function(){
		$(this).find('#imove').animate({ top: '100px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#imove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});