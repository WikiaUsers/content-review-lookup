// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["PhilippL"]                = ["Admin", "Bureaucrat"];
    rights["IAmAwesome2"]             = ["Admin", "Wiki Friend"];
    rights["AWCUser1"]                = ["Founder", "Wiki Friend"];
    rights["Durvensonisback"]               = ["Wiki Friend", "Admin",  "Founder of Test wiki4 wiki",  "Bureaucrat"];
    rights["DaZumi"]                  = ["Wiki Guest"];
    rights["LilGreenYoshi"]           = ["Wii Expert"];
    rights["Charizard 'M"]            = ["Wiki Guest"];
    rights["Qubit2222"]               = ["Wiki Guest"];
    rights["WikiaBot"]                = ["Staff", "Global Bot"];
    rights["Skylox267"]               = ["Admin", "Inactive"];
    rights["MichiRecRoom"]            = ["Wikia Editor", "Wiki Guest"];
    rights["CreateWiki script"]       = ["Bot-Global"];
 

  // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
 
}
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
// </source>

importScriptPage('DivRoundedCorners/code2.css', 'dev');

$(".UserProfileMasthead .masthead-info hgroup h1:contains('AWCUser1')").html("<a href='http://test-wiki2.wikia.com/wiki/User:IAmAwesome2' style='color: white; title:AWCUser1's new account'>AWCUser1</a>");

$("#AdminDashboardGeneral .control-section.wiki .controls").prepend("<a href='http://test-wiki2.wikia.com/wiki/MediaWiki:Wikia.js?action=edit' onmouseover='$(\" #AdminDashboardGeneral .control-section.wiki header .dashboard-tooltip\").prepend(\" Customize your wiki with JavaScript.\")' onmouseout='$(\" #AdminDashboardGeneral .control-section.wiki header .dashboard-tooltip\").append(\" \")'><div style='border: 1px solid #C8B890; width: 50px; height: 50px; border-radius: 7px; font-family: Arial; cursor: pointer; position: absolute; left: 430px; top: 58px;' href='http://test-wiki2.wikia.com/wiki/MediaWiki:Wikia.js?action=edit' ><img src='https://vignette.wikia.nocookie.net/lllioliol/images/d/d0/JS.png/revision/latest?cb=20150727171949' width='36' height='22' style='position:absolute; top: 13px; left: 8px;'><p style='position:absolute; top: 50px; font-size: 11px;'><a href='http://test-wiki2.wikia.com/wiki/MediaWiki:Wikia.js?action=edit' style='text-decoration:none;' onMouseOver='text-decoration: underline;'>JavaScript</a></p></div></a>");

$(document).ready(function () {
      $(".eg").wrap("<h2 style='color:red;'></h2>");
});
 
(function(s) {
	s.type = "application/javascript";
	s.src = "https://code.jquery.com/jquery-2.1.4.js";
	document.head.appendChild(s);
}(document.createElement("script")));