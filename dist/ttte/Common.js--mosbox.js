// ============================================================
// wikiSidething
// from Brickipedia
// Function: Adds a new sidebar element 
//
// Version 1.5 modified by [[user:452]]
// ============================================================
 
 
$(function() {
	if(skin == "oasis") {
		$('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.  
			var $sidebar = $('.ChatModule.module');
			var comboString ='<div style="background:none!important;margin-top:20px"><a class="twitter-timeline"  href="https://twitter.com/TTTEWikia"  data-widget-id="404136128392876032">Tweets by @TTTEWikia</a></div>' +
    '<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';

			if ($sidebar.size()) { //check that the target has been loaded
				if (!$('.twitter-timeline').size()) { //check to make sure it hasn't already been added. 
					$sidebar.append(comboString);
				}
			}
		}); //end of DOMNodeInserted block