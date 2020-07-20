// ============================================================
// wikiSidething
// from Brickipedia
// Function: Adds a new sidebar element 
// Modified for use on tardis.wikia.com by [[User:Czechout]]
// Version 1.5 modified by [[user:452]]
// ============================================================
 
 
$(function() {
	if(skin == "oasis") {
		$('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.  
			var $sidebar = $('.WikiaRecentActivity');
			var comboString = $.get('http://jorgesandbox.wikia.com/wiki/Top_10_list:Test_5?action=render', function(data) { $('body').html(data); });
			if ($sidebar.size()) { //check that the target has been loaded
				if (!$('.toplists-list-body').size()) { //check to make sure it hasn't already been added. 
					$sidebar.prepend(comboString);
				}
			}
		});
 
	} else if(skin == "monobook") {
     }
});