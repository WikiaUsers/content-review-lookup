// 14:39, November 25, 2011 (UTC)
// <source lang="JavaScript">
 
// CODE WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
	// Założyciel
		rights[""]		= ["Założyciel"];
 
 
	// Moderator
		rights[""]		= ["Moderator"];
 
 
	// Pomocnik
		rights[""]		= ["Pomocniczka"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
	if (typeof rights[wgTitle] != "undefined") {
		// Usunięcie poprzednich opisów grup
		$('.UserProfileMasthead .masthead-info span.tag').remove();
 
	for( var i=0, len=rights[wgTitle].length; i < len; i++) {
		// Dodanie nowych opisów grup
		$('<span class="tag">' + rights[wgTitle][i] +
		'</span>').appendTo('.masthead-info hgroup');
	}
  }
});
 
// </source>