importScriptPage('Countdown/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('User:Joeyaa/wham.js', 'vstf'); 
importScriptPage('SearchGoButton/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('ListAdmins/code.js', 'dev');
importScriptPage('AutoEditDropdown/code.js', 'dev');
importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('Mediawiki:FindReplace.js', 'kangaroopower');
importScriptPage('User:Nikolaitttt/whammod.js', 'southpark');
importScriptPage('AjaxBatchDelete/code.js', 'dev');
importScriptPage( 'AjaxUndo/code.js', 'dev' );
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('ShowHide2/code.js', 'dev');
importScriptPage('CollapsibleEdittools/code.js', 'dev'); 
importScriptPage('FixWantedFiles/code.js', 'dev');

//main
importScript('MediaWiki:Common.js/main.js');
//main//

function massblock() {
	if (wgPageName == "Special:Massblock") {
		document.title = "Krimpet's mass block tool";
		document.getElementById("WikiaArticle").innerHTML = "<h1 class=\"firstHeading\">mass block tool</h1><span style=\"color:red\">"
					+"MESS SOMETHING UP WITH THIS, AND <em>YOU</em> TAKE THE BLAME, BUCKO.</span><br /><br />List of IPs to block, "
					+"one on each line please:<br><textarea id=\"iplist\" columns=\"24\" rows=\"10\"></textarea><br /><br />"
					+"Expiry: <input type=\"text\" value=\"1 year\" id=\"expiry\"><br />Reason: <input type=\"text\" value=\""
					+"[[w:open proxy|open proxy]] or [[w:zombie computer|zombie]] ([[m:WM:OP|more info]])\" id=\"reason\"><br />"
					+"<input type=\"checkbox\" id=\"ao\" /> Anon only<br /><input type=\"checkbox\" id=\"acb\" checked=\"checked\" /> "
					+"Prevent account creation<br /><br />Blocks/min: <input type=\"text\" value=\"10\" id=\"epm\"><br /><button "
					+"onclick=\"massblock2()\">Block IPs</button> <button onclick=\"massblock4()\">Abort</button><div style=\"z-index:"
					+"-1;position:relative;top:0px;left:0px\"><iframe name=\"blockframe0\" width=\"1px\" height=\"1px\"></iframe>"
					+"<iframe name=\"blockframe1\" width=\"1px\" height=\"1px\"></iframe><iframe name=\"blockframe2\" width=\"1px\" "
					+"height=\"1px\"></iframe><iframe name=\"blockframe3\" width=\"1px\" height=\"1px\"></iframe><iframe name=\"blockframe4\""
					+"width=\"1px\" height=\"1px\"></iframe><iframe name=\"blockframe5\" width=\"1px\" height=\"1px\"></iframe></div>";
	}
	else if (document.location.search.match("__MASSBLOCK__")) {
		document.getElementById("wpAnonOnly").checked = getParameter("ao") == "1";
		document.getElementById("wpCreateAccount").checked = getParameter("acb") == "1";
		document.getElementById("mw-bi-other").value = getParameter("expiry").replace("+"," ","g");
		document.getElementById("mw-bi-reason").value = getParameter("reason").replace("+"," ","g");
		setTimeout("document.getElementById(\"blockip\").submit()", 500);
	}
}
 
var wgBlocksToDo;
var wgBlocksToDoIndex;
var wgBlocksToDoInterval = 0;
var wgBlockFrame;
function massblock2() {
	if (!parseFloat(document.getElementById("epm").value)) return;
	wgBlocksToDo = new Array();
 
	iplist = document.getElementById("iplist").value.split("\n");
	for (i=0;i<iplist.length;i++) {
		wgBlocksToDo[i] = iplist[i].split(":")[0];
	}
 
	mbcode = "massblock3(wgBlocksToDo[wgBlocksToDoIndex++]);if (wgBlocksToDoIndex >= wgBlocksToDo.length) massblock4();";
 
	wgBlocksToDoIndex = wgBlockFrame = 0;
	eval(mbcode);
	wgBlocksToDoInterval = setInterval(mbcode, (60 / parseFloat(document.getElementById("epm").value)) * 1000);
}
 
function massblock3(ipToBlock) {
	if (ipToBlock + "" == "undefined") return;
 
	iplistobj = document.getElementById("iplist");
	if (iplistobj.value.indexOf("\n") == -1) iplistobj.value = "";
	iplistobj.value = iplistobj.value.substring(iplistobj.value.indexOf("\n") + 1);
 
	if (ipToBlock == "") return;
 
	frames["blockframe" + wgBlockFrame++].location.href = wgServer + wgScript + "?title=Special:Block&wpBlockAddress=" + 
				ipToBlock + "&__MASSBLOCK__=1&wpBlockOther=" + document.getElementById("expiry").value + 
				"&wpBlockReason=" + document.getElementById("reason").value + "&wpAnonOnly=" + (document.getElementById("ao").checked ? "1" : "0") 
				+ "&wpCreateAccount=" + (document.getElementById("acb").checked ? "1" : "0");
	if (wgBlockFrame == 6) wgBlockFrame = 0;
}
 
function massblock4() {
	clearInterval(wgBlocksToDoInterval);
}
 
addOnloadHook(massblock);
  
// WRITTEN BY USER:A.r.s.h.
// Caveats: Does not work on Special:Contributions/username
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FOUNDERS
 
  rights["Owlfang33"] = ["Founder","Bureaucrat","Administrator"],
 
    // BUREAUCRATS
 
  rights["A.r.s.h."]      = ["Bureaucrat","Administrator","Wiki Stats Manager","Wikia God","The Most Interesting Man in the World"],
 
    // ADMINISTRATORS
 
  rights["Dr._Sonya"]        = ["Doctor","Administrator"],
  rights["Servian"]        = ["Administrator","a crazy person"],
  rights[""] = ["Administrator "],

    // MODERATORS

  // rights[""]    = ["Moderator","Chatmod"], 

    // ROLLBACK

  // rights[""]    = ["Rollback"], 

   // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]       = ["Wikia Bot"], 
  rights["Wikia"]          = ["Wikia User Bot"]
  rights["A.r.s.h.'s_bot"]       = ["Bot"];
 

  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="group">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 

/* Add a button to edit Message Wall Greeting
 * By: [[User:Eladske]], modified by [[User:The 888th Avatar]]
 */
 
function EditGreeting() {
	if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
		if (wgTitle == wgUserName) {
			$('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit greeting	</a></div>');
		}
	}
}
addOnloadHook(EditGreeting);


/* Add "about us" link from "On the Wiki" menu
 * From RuneScape Wiki, modified by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeaderRestyle nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Animation_Central_Wiki:About">About us</a></li>');
    }
});
 
importScriptPage('Countdown/code.js', 'dev');
// </source>

//</source>

//do not edit this page without A.r.s.h.'s consent