/* Any JavaScript here will be loaded for all users on every page load. */
/* PacMan */
$(function() {
       	var nick = (wgUserName == null) ? ('LUW-Visitor-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
	$('#xx').html('<iframe src="http://jquerymobile.com/test/experiments/scrollview/scrollview-direction.html" width="700" height="260" scrolling="yes" style="border:0;"></iframe>');
});