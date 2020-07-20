/* Any JavaScript here will be loaded for all users on every page load. */

// IRClogin div
$(function() {
	if ($("#IRClogin").length) {
		if (typeof wgUserName == "undefined") {
			var nick = "Wikian" + Math.floor(Math.random() * 100);
		} else {
			var nick = wgUserName.replace(/ /g, "_");
		}
		$("#IRClogin").html("<iframe src=\"http://webchat.freenode.net/?nick=" + nick + "&channels=wikia-sixgunschat&prompt=true\" width=\"660\" height=\"400\" style=\"border: 0;\"></iframe>");
	}
});

$(function() {
	var rights = {};
	var active = "Active";
	var semiactive = "Semi-Active";
	var sysop = "System Operator";
	var bureaucrat = "Bureaucrat";
	var patroller = "Patroller";
	var helper = "Gameloft Helper";
	var agent = "Gameloft Agent";
	var codeEditor = "Code Editor";
	
	// BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
	
	// BUREAUCRATS
	rights["Bashihbk01"]			= [sysop, codeEditor, helper, active];
	rights["Keplers"]				= [sysop, bureaucrat];
 
	// ADMINISTRATORS
	rights["Amrsatrio"]				= [sysop, codeEditor, active];
	rights["Amwl415"]				= [sysop, helper, active];
	rights["Kevinlai33 six-guns"]	= [sysop, active];
	rights["Minja536"]				= [sysop, active];
 
	// Mixed 1
	rights["TheMCGamer"]			= [patroller, active];
	
	// Editors with no rights
	rights["Danial.dali.37"]		= [semiactive];
	rights["Fabien Gameloft"]		= [agent, semiactive];
	rights["Java55555Obeseman"]		= [semiactive];
	rights["Kakula"]				= [semiactive];
	rights["Loneranger124"]			= [semiactive];
	rights["Masonmancini"]			= [semiactive];
	rights["Pyro15232"]				= [semiactive];
	rights["SpearArc"]				= [active];
		
	// END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
	if (typeof rights[wgTitle] != "undefined") {
		// remove old rights
		$(".UserProfileMasthead .masthead-info span.tag").remove();
 
		for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
			// add new rights
			$("<span class=\"tag\" style=\"margin-left: 10px;\">" + rights[wgTitle][i] + "</span>").appendTo(".masthead-info hgroup");
		}
	}
});