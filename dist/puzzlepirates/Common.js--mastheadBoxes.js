// <source lang="JavaScript">
// Adapted by Rappy 4187

$(function() {
	var rights = {};
 
 	rights["Cblair91Bot"]		= ["AWB", "BOT"],
	rights["Cblair91"]		= ["Bureaucrat", "Owner", "Chat Moderator"];

	// Append user title for all users
	$('<span class="tag" style="margin-left: 10px !important">User</span>').appendTo('.masthead-info hgroup');

	// Append rights if exist in above
	if(typeof rights[wgTitle] != "undefined")
		for(var i = 0, len = rights[wgTitle].length; i < len; i++)
			$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
});

// Coded by Cblair91 below here

var icons = {};

icons["Owner"]		= "f/f5/Icon_captain.png",
icons["Bureaucrat"]	= "9/9d/Icon_senior_officer.png",
icons["Admin"]		= "e/e4/Icon_fleet_officer.png",
icons["Chat Moderator"] = "6/67/Icon_officer.png",
icons["BOT"]		= "d/d2/Icon_pirate.png",
icons["AWB"]		= "d/d2/Icon_pirate.png",
icons["User"]		= "4/4e/Icon_cabin_person.png",
icons["Blocked"]	= "6/65/Icon_jobbing_pirate.png";

$(document).ready(function() {
	$.each($('.tag'), function() {
		if(typeof icons[$(this).html()] != "undefined")
			$(this).prepend("<img src='https://images.wikia.nocookie.net/yohoho/images/" + icons[$(this).html()] + "' />");
	});
});

// </source>