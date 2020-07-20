/*
Any JavaScript here will be loaded for all users on the oasis skin.
See MediaWiki:Common.js for scripts that affect every skin.
*/

/* Table of Contents
-----------------------
 * (A00) Move star poll to rail
 * (X00) Relocate wiki page tally
 * (Y00) importArticles
*/

//##############################################################
/* ==Move star poll to rail== (A00)*/
// This code will move a game's rating poll to the right side of the page.

$(function() {
	var pollTitle = $("#starRatingPollHeading");
	if(pollTitle && $('#WikiaRail')) {
		var pollCont = $("#starRatingPollCont");
		var pollHeader = pollCont.find(".header");
		var poll = pollCont.find(".ajax-poll");
		

		$('#WikiaRail').prepend( pollCont.remove() );
		poll.addClass("module");
		pollHeader.replaceWith($('<h2 style="margin-bottom:0;">' + pollHeader.html() + '</h2>'));
		$("#toc").find("a[href=#"+pollTitle.find("span").attr('id')+"]").parent().remove();
		pollTitle.remove();
	}
});