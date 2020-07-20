$(function() {
	var rights = {},
            title = wgTitle;
 
 	rights["Ghhghgh"]	= ["Owner"],
 	rights["Freddysback"]	= ["Admin"],
 	rights["Gamerboy555"]	= ["Admin"],
 
	// Allow ranks to be displayed on user contribution pages
	if(title.indexOf("Contributions/") != -1)
    		title = title.replace("Contributions/", "");
	// Append rights if exist in above
	if(typeof rights[title] != "undefined")
		for(var i = 0, len = rights[title].length; i < len; i++)
			$('<span class="tag" style="margin-left: 10px !important">' + rights[title][i] + '</span>').appendTo('.masthead-info hgroup');
});
 
// Coded by Cblair91 below here
 
var icons = {};
 
icons["Owner"]		= "7/70/recovery_icon_by_sherrybirkinfan227-d3e0jam.png",
icons["Admin"]		= "7/7f/Em-eminem-18412730-75-75";
 
$(document).ready(function() {
	$.each($('.tag'), function() {
		if(typeof icons[$(this).html()] != "undefined") {
			// Give it a class of it's rank
			$(this).addClass("Rank-" + $(this).html());	
			$(this).prepend("<img src='https://images.wikia.nocookie.net/eminem/images/" + icons[$(this).html()] + "' />");
		}
	});
	// If they are admin and bureaucrat, we hide the admin rank
	if($('.Rank-Admin').length != 0 && $('.Rank-Bureaucrat').length != 0)
		$('.Rank-Admin').css("display", "none");
});