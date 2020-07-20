/*
	Simple but flexible javascript tabs
	v0.3
	Author: Abdullah A. Abduldayem
	Contact: http://www.zeldawiki.org/User:Abdullah
	See http://www.zeldawiki.org/MediaWiki_talk:Tabs.js for examples and documentation
*/

$(document).ready(function(){
	// When a tab is clicked
	$(".tab_tab").click(function () {
		var $siblings= $(this).parent().children();
		var $alltabs = $(this).closest(".tabcontainer");
		var $content = $alltabs.parent().children(".tabcontents");
		
		// switch all tabs off
		$siblings.removeClass("tabselected");
		
		// switch this tab on
		$(this).addClass("tabselected");
		
		// hide all content
		$content.children(".tab_content").css("display","none");
		
		// show content corresponding to the tab
		var index = $siblings.index(this);
		$content.children().eq(index).css("display","block");
	});
});