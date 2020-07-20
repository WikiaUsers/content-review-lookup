$(function() {
	if(skin == "oasis") {
		$('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.  
			var $sidebar = $('.ChatModule.module');
			var comboString ='<div style="background:none!important;margin-top:20px"><a class="twitter-timeline"  href="https://twitter.com/DWFWiki" data-widget-id="426921251429285888">Tweets by @DWF</a></div>' +
'<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';

			if ($sidebar.size()) { //check that the target has been loaded
				if (!$('.twitter-timeline').size()) { //check to make sure it hasn't already been added. 
					$sidebar.append(comboString);
				}
			}
	
			var $sidebar = $('.activity-heading');
			var comboString2 = "<div id='mosbox' style='margin-top:0px; align:center'><table style='width:98%;padding-bottom:20px;margin-bottom:20px'><td class=moscolor style='width:125px'><a href='https://itunes.apple.com/us/app/my-wikia-fan-app-join-300/id623705389?mt=8#'><img src='https://images.wikia.nocookie.net/tardis/images/f/fa/MyWikiaWBigger.png'><a></td><td style='text-align:left;font-size:75%;line-height:120%;text-transform:uppercase;letter-spacing:2px'><a href='https://itunes.apple.com/us/app/my-wikia-fan-app-join-300/id623705389?mt=8#'>See the DWF in a whole new way</a></td></table></div>";

			if ($sidebar.size()) { //check that the target has been loaded
				if (!$('#mosbox').size()) { //check to make sure it hasn't already been added. 
					$sidebar.prepend(comboString2)
				}
			}
		}); //end of DOMNodeInserted block

	} else if(skin == "monobook") {
		var $sidebar = $('#n-wikicitieshome');
		var comboString = "<div id='mosbox'><div style='background-color:transparent !important;line-height:100%'><strong>join the chat</strong> by <a href='http://doctrwhofanon.wikia.com/wiki/Special:Chat?useskin=wikia'>clicking here.</a><hr>Wondering why things are changing around here? Keep up by <a href='http://doctorwhofanon.wikia.com/wiki/MediaWiki:Community-corner'>reading the community news</a> or by <a href='http://doctorwhofanon.wikia.com/wiki/Forum'>visiting the Forum</a>.</a></div></div>";
		$sidebar.prepend(comboString);
	}
});