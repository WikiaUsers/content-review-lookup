/* Cookie */
/* Script from W3School */
 
// Set Cookie
function setCookie(c_name,value,exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}
// Get Cookie
function getCookie(c_name) {
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1) {
		c_value = null;
	} else {
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1) {
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}
 
 
 
/* Rules Agreement
 
 
// set \/ check Widget
Widget = typeof Widget === "undefined" ? {} : Widget;
 
// Object
Widget.policyWarning = {};
 
// Markup
Widget.policyWarning.markup = '<div class=\"blackout\" id=\"policy-notice-blackout\" data-opacity=\"0.65\" style=\"z-index: 100; opacity: 0.65; display: block;\"></div>\n\
	<section id=\"policy-notice\" style=\"z-index: 101; display: block; width: 100%; position: absolute; top: 190px; text-align: center; color: rgb(51, 51, 51);\">\n\
	\t<div style=\"width: 370px; margin: auto; padding: 3px 7px; background: #b08148; border: 2px solid #b08148; border-radius: 10px; -moz-border-radius: 10px; -webkit-border-radius: 10px;\">\n\
	\t\t<h3 style=\"margin: 0px; position: relative; font-size: 16px; font-weight: bold; text-align: center;\">Important!<br /></h3>\n\
	\t\t<p style=\"padding: 5px;\">\n\
	\t\t\tYou confirm that you have read <a href=\"/wiki/An Awesome Girl Wiki:Chat\" target="_new">the Chat Rules</a> and its <a href=\"/wiki/An Awesome Girl Wiki:Chat Policy\" target="_new">General Policy.</a>.<br />\n\
	\t\t\t<input type=\"button\" value=\"I have read the rules.\" style=\"margin-top: 3px;\" onclick=\"Widget.policyWarning.agree();\" />\n\
	\t\t</p>\n\
	\t</div>\n\
	</section>';
 
	// Agree
Widget.policyWarning.agree = function() {
	if (confirm("Have you really read the rules?") === true) {
		// agree - close notice/ disable message
		setCookie("chatPolicy", "Yes", 60);
		$('#policy-notice-blackout, #policy-notice').remove();
		Widget.policyWarning.clear();
	} else {
		// disagree - close window 
		window.close();
	}
}
 
// Trigger
if (typeof getCookie("chatPolicy") !== "string") {
	$("body").append(Widget.policyWarning.markup);
}
 
 
// Reset if user is kicked
Widget.policyWarning.clear = function() {
	$("body").on("DOMNodeInserted", "section.WikiaPage .Chat li", function(ev) {
		if (
			$(ev.target).hasClass("inline-alert") &&
			typeof getCookie("chatPolicy") === "string" &&
			(
				$(ev.target).html().indexOf("You have been kicked by ") > -1 ||
				$(ev.target).html().indexOf("You have been banned by ") > -1
			)
		) {
			document.cookie = "chatPolicy" + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
		}
	});
}
if (typeof getCookie("chatPolicy") === "string") {
	Widget.policyWarning.clear();
}
*/
 
/* stop chat spam when someone posts an excessively long link into chat */
/* Full credit to clubpenguin.wikia.com */
$("body").on("DOMNodeInserted", function(el) {
	$(el.target).find(".message a").each(function() {
		if ($(this).text().length > 150 && $(this).attr("href").indexOf(location.origin) !== 0) {
			// external link with over 150 characters
			var a = $(this).text();
			$(this).text(a.substr(0,50) + "\u2026" + a.substr(a.length - 51, 50));
		}
	});
});
 
$('#ChatHeader').append("<span id='clock' style='position: absolute; bottom: 0; right: 200px'></span>");
setInterval('updateClock()', 1000);
 
function updateClock ( )
    {
    var currentTime = new Date();
    var currentHours = currentTime.getUTCHours();
    var currentMinutes = currentTime.getUTCMinutes();
    var currentSeconds = currentTime.getUTCSeconds();
 
    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
 
    // Choose either "AM" or "PM" as appropriate
    var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
 
    // Convert the hours component to 12-hour format if needed
    currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
 
    // Convert an hours component of "0" to "12"
    currentHours = ( currentHours === 0 ) ? 12 : currentHours;
 
    // Compose the string for display
    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay + " UTC";
 
    $("#clock").html(currentTimeString);
 }