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
 
			var $sidebar = $('.activity-heading');
			var comboString2 = "<div id='mosbox' style='margin-top:0px; align:center'><table style='width:98%;padding-bottom:20px;margin-bottom:20px'><td class=moscolor style='width:125px'><a href='https://vk.com/yanderesimulatorwiki'><img src='https://vignette.wikia.nocookie.net/yandere-simulator/images/c/c8/Post-29246-0-19281900-1471268844.png/revision/latest?cb=20161130141426&path-prefix=ru'></a></td><td style='text-align:left;font-size:75%;line-height:120%;text-transform:uppercase;letter-spacing:2px'><a href='https://vk.com/yanderesimulatorwiki'>Подписывайтесь на официальную группу Wiki Симулятора Яндере в ВКонтакте!</a><hr>
 
			if ($sidebar.size()) { //check that the target has been loaded
				if (!$('#mosbox').size()) { //check to make sure it hasn't already been added. 
					$sidebar.prepend(comboString2)
				}
			}
		}); //end of DOMNodeInserted block