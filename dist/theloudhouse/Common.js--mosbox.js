/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================
// wikiSidething
// from Brickipedia
// Function: Adds a new sidebar element 
//
// Version 1.5 modified by [[user:452]]
// ============================================================
 
/*Twitter under chat (THANKS TO TARDIS WIKI)*/
$(function() {
	if(skin == "oasis") {
		$('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.  
			var $sidebar = $('.ChatModule.module');
			var comboString ='<div style="background:none!important;margin-top:20px"><a class="twitter-timeline" data-dnt="true" href="https://twitter.com/TLHWiki" data-widget-id="645742338082480132">Tweets by @TLHWiki</a></div>' +
'<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';
 
			if ($sidebar.size()) { //check that the target has been loaded
				if (!$('.twitter-timeline').size()) { //check to make sure it hasn't already been added. 
					$sidebar.append(comboString);
				}
			}
		});
	}
});