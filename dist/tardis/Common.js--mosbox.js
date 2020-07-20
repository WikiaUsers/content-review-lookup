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
			var comboString ='<div style="background:none!important;margin-top:20px"><a class="twitter-timeline"  href="https://twitter.com/TardisWiki" data-widget-id="276806948735819776">Tweets by @TardisWiki</a></div>' +
'<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';

			if ($sidebar.size()) { //check that the target has been loaded
				if (!$('.twitter-timeline').size()) { //check to make sure it hasn't already been added. 
					$sidebar.append(comboString);
				}
			}
	
			var $sidebar = $('.activity-heading');
			var comboString2 = "<div id='mosbox' style='margin-top:0px; align:center'><table style='width:98%;padding-bottom:20px;margin-bottom:20px'><td class=moscolor style='width:125px'><a href='https://itunes.apple.com/ca/app/wikia-fan-app-for-doctor-who/id920825506?mt=8'><img src='https://vignette.wikia.nocookie.net/tardis/images/3/33/TardisApp.png'></a></td><td style='text-align:left;font-size:75%;line-height:120%;text-transform:uppercase;letter-spacing:2px'><a href='https://itunes.apple.com/ca/app/wikia-fan-app-for-doctor-who/id920825506?mt=8'>See the Tardis in a whole new way</a><hr><a href='https://play.google.com/store/apps/details?id=com.wikia.singlewikia.doctorwho'><i>Also for Android</i></a></td></table><div class=mosheadcolor style='letter-spacing:2px;text-transform:uppercase;margin-bottom:5px;'>Log on and play</div><table style='width:98%'><td class=moscolor style='font-size:85%;line-height:120%;'>We need <b><i>you</b></i> to help us edit articles about the <a href='http://tardis.wikia.com/wiki/Doctor Who universe'>DWU.</a> We'll even give you (totally worthless) prizes for your hard work! <strong><a href='http://tardis.wikia.com/wiki/Special:UserLogin'>Log on</a></strong> and start playing the <strong><a href='http://tardis.wikia.com/wiki/Special:Leaderboard'><strong>Game of Rassilon</strong></a></strong> today!<br /></td></tr></table><table style='width:98%'><hr><td class=moscolor style='font-size:85%;line-height:120%;'>Wondering why things are changing around here? Keep up by <strong><a href='http://tardis.wikia.com/wiki/Board:Tales_from_the_Tardis'>reading the community news</a></strong> or by <strong><a href='http://tardis.wikia.com/wiki/Board:The_Panopticon'>visiting the Panopticon.</a></strong><hr></td></table></div>";

			if ($sidebar.size()) { //check that the target has been loaded
				if (!$('#mosbox').size()) { //check to make sure it hasn't already been added. 
					$sidebar.prepend(comboString2)
				}
			}
		}); //end of DOMNodeInserted block

	} else if(skin == "monobook") {
		var $sidebar = $('#n-wikicitieshome');
		var comboString = "<div id='mosbox'><div style='background-color:transparent !important;line-height:100%'><hr><a href='http://tardis.wikia.com/wiki/Special:Leaderboard?useskin=wikia'>Check your score</a> in <a href='http://tardis.wikia.com/wiki/Game of Rassilon'><strong>The Game of Rassilon.</strong></a><hr> Also, you can <strong>join the chat</strong> by <a href='http://tardis.wikia.com/wiki/Special:Chat?useskin=wikia'>clicking here.</a><hr>Wondering why things are changing around here? Keep up by <a href='http://tardis.wikia.com/wiki/MediaWiki:Community-corner'>reading the community news</a> or by <a href='http://tardis.wikia.com/wiki/Forum:Panopticon'>visiting the Panopticon</a>.</a></div></div>";
		$sidebar.prepend(comboString);
	}
});