/*
---------------------------------
 Floating HTML Wiki Notification
---------------------------------

-----------------------
 COMPLEMENTARY SCRIPTS
-----------------------
- WikiNotification.css

---------
 AUTHORS 
---------
- E12Dragon: current and orginal version

-----------------------
 Example Configuration
-----------------------
<div class="wiki-notification">
Your text here<span class="wiki-notification-sprite-close"></span>
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