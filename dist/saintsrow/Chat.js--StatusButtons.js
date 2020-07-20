/* 
 * Based on ChatHacks.js, by Monchoman45.
 * Modified for the Saints Row Wiki by User:452
 * If you copy any part of this script, you are required to attribute the source.
 * 
 * Features:
 *   Inline alerts when your own away status changes.
 *   Buttons to toggle between "auto-away", "away" and "here"
 */
window.Version['StatusButtons'] = "2014-08-07 - 3 state toggle, moved prototype functions";

function goAway() {
	window.changingStatus = true;
	if($(".toggleStatus").attr("status") == 2) return false; //do not set as away if status is locked to "here".
	$(".toggleStatus").addClass("isAway");
	if($(".toggleStatus").attr("status") == 0) {$(".alertStatus").remove(); mainRoom.inlineAlert('Your status has been set to "idle"', "alertStatus");}
}
function goBack() {
	window.changingStatus = true;
	$(".toggleStatus").removeClass("isAway");
	if (!$("li.User[data-user='"+wgUserName+"']").hasClass('away')) return;
	if($(".toggleStatus").attr("status") == 1) return false; //do not set back if forced "away".

	if($(".toggleStatus").attr("status") == 0) {$(".alertStatus").remove(); mainRoom.inlineAlert('Your status is set to "here", and will change to "idle" automatically', "alertStatus"); }
}

function toggleStatus(status) {
	window.changingStatus = true;
	if (status != undefined) $(".toggleStatus").attr("status", status);
	else $(".toggleStatus").attr("status", ($(".toggleStatus").attr("status")+1)%3);

	$(".alertStatus").remove();
	if ($(".toggleStatus").attr("status") == 0) { 
		mainRoom.inlineAlert('Your status is set to "here", and will change to "idle" automatically', "alertStatus"); 
		mainRoom.setBack();
	}
	if ($(".toggleStatus").attr("status") == 1) {
		mainRoom.inlineAlert('Your status is locked to "away"', "alertStatus");
		mainRoom.setAway();
	}
	if ($(".toggleStatus").attr("status") == 2) {
		mainRoom.inlineAlert('Your status is locked to "here"', "alertStatus");
		mainRoom.setBack();
	}
}

$(function () {
	//Unbind all of the window listeners that set your status to back
	$(window).unbind('mousemove').unbind('focus').unbind('keypress');
	$(window).bind('focus', function() { window.hasFocus = true; window.flashing = false; });
	//this is bound in the sound script, but is bound here just in case it is unbound here.

	statusbutton = '<a class="wikia-button setStatus" status="2" title="This button prompts for a new status" href="javascript:newStatus()" style="position: absolute; right: 40px; top: 0px;">Status</a>';
	awaybutton = '<a class="wikia-button toggleStatus" status="0" title="This button toggles your away status" href="javascript:toggleStatus()" style="position:absolute; right:0; top:0;"></a>';
	mainRoom.resetActivityTimer(); //start away status timer.
	$('#Write').append(statusbutton+awaybutton);

	$('head').append('<style type="text/css">\n.Write .message {\nmargin-right: 80px; \n}\n</style>');
});