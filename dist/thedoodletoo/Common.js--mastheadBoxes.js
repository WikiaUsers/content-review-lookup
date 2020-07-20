// Adapted by Rappy 4187
$(function() {
	var rights = {};
 
 	rights["Ownslo"]		= [" "], /*1Space icon*/ 
	rights["Niruh"]		= ["Bureaucrat", "Owner", "Chat Moderator"];
 
	// Append user title for all users
	$('<span class="tag" style="margin-left: 10px !important">User</span>').appendTo('.masthead-info hgroup');
 
	// Append rights if exist in above
	if(typeof rights[wgTitle] != "undefined")
		for(var i = 0, len = rights[wgTitle].length; i < len; i++)
			$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
});
 
 
var icons = {};
 
icons[" "]		= "2/26/Owner.png", /*1Space icon*/ 
icons["Christmas"]  = "c/c7/Snowman.png", /* test only */ 
icons["User"]		= "d/db/User.png"; /*2Space icon*/ 
 
$(document).ready(function() {
	$.each($('.tag'), function() {
		if(typeof icons[$(this).html()] != "undefined")
			$(this).prepend("<img src='https://images.wikia.nocookie.net/thedoodletoo/images/" + icons[$(this).html()] + "' />");
	});
});