/*The following code was mercilessly stolen from Tardis Data Core before being edited by Imamadmad*/

// ============================================================
// wikiSidething
// from Brickipedia
// Function: Adds a new sidebar element 
//
// Version 1.5 modified by [[user:452]]
// ============================================================
 

$(function() {
	if(skin == "oasis") {
		$('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.  
			var $sidebar = $('.activity-heading');
			var comboString2 = "<div id='mosbox' style='margin-top:0px; align:center'><img src='https://images.wikia.nocookie.net/__cb20140712142620/imamadmad/images/a/af/Question_mark.png' width='50px' style='float:left;'><div class='mosbox-heading'>Keep Track of Your Questions</div><br />See what questions you've asked and if they've been answered yet! Just check out <a href='/wiki/Special:MyPage'>your userpage</a> to see how they're going.  <br /><br /><span style='font-size:13px;'>Note: you must be logged in to track your questions. <a href='/wiki/Special:SignUp'>Sign up</a> for an account now to get the most out of your DWA experience!</span><br /><div style='font-size:10px; text-align:right;'><a href='/wiki/Help:Question_tracker'>Don't see the tracker?</a></div></div>";

			if ($sidebar.size()) { //check that the target has been loaded
				if (!$('#mosbox').size()) { //check to make sure it hasn't already been added. 
					$sidebar.prepend(comboString2)
				}
			}
		}); //end of DOMNodeInserted block

	} else if(skin == "monobook") {
		var $sidebar = $('#n-wikicitieshome');
		var comboString = "<div id='mosbox' style='margin-top:0px; align:center'><img src='https://images.wikia.nocookie.net/__cb20140712142620/imamadmad/images/a/af/Question_mark.png' width='50px' style='float:left;'><div class='mosbox-heading'>Keep Track of Your Questions</div><br />See what questions you've asked and if they've been answered yet! Just check out <a href='/wiki/Special:MyPage'>your userpage</a> to see how they're going.  <br /><br /><span style='font-size:13px;'>Note: you must be logged in to track your questions. <a href='/wiki/Special:SignUp'>Sign up</a> for an account now to get the most out of your DWA experience!</span><br /><div style='font-size:10px; text-align:right;'><a href='/wiki/Help:Question_tracker'>Don't see the tracker?</a></div></div>";
		$sidebar.prepend(comboString);
	}
});