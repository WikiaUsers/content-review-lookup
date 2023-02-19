/* <pre> */

// ============================================================
// Author(s): Various
// Name: pagetitle.js
// Version: 1.2 (Wikia/Oasis and Monobook)
// Description: Rewrites a page title, used by Template:Title
// Original by: Sikon
// ============================================================
 
$(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});

//Keeping the last tab you hover over opened

$(function() {
	$('.showbutton').mouseover(function() {
		// Get the outermost panel
		var $top = $(this).parents('.showbutton').last();
		$top = $top.size() > 0 ? $top : $(this);

		// Change the panel which has the deftext class based on the mouseover
		$('.deftext', $top).removeClass('deftext').addClass('showtext');
		$(this).children('.showtext').removeClass('showtext').addClass('deftext');

		// Stop event bubbling
		return false;
	});
});

/* </pre> */