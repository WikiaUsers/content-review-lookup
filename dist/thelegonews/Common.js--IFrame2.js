/* Any JavaScript here will be loaded for all users on every page load. */
/* PacMan */
$(function() {
       	var nick = (wgUserName == null) ? ('LUW-Visitor-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
	$('#PacManReplace').html('<iframe src="http://1nscod4.webs.com/pm212.html" width="700" height="260" scrolling="no" style="border:0;"></iframe>');
});