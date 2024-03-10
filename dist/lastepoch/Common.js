/* Any JavaScript here will be loaded for all users on every page load. */

$( function ()  {
	/* Moving infoboxes from some template to their appropriate location - just before the ToC */
	$("#maininfobox").insertBefore("#toc")
	
	/* For spoiler boxes in quest logs */
	$(".LogHeader").click(function(){
	   $(this).parent(".Log").children(".LogSpoiler").toggle();
	});
	
	/* For Generic Spoiler Buttons */
	$(".SpoilButton").click(function(){
	   $(this).parent(".Spoiler").children(".SpoilContent").toggle();
	   $(this).hide();
	});
	
	/* For Dialogue Boxes */
	$(".DialogueOption").click(function(){
	   $(this).parent().children(".Dialogue").toggle();
	});
} );