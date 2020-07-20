/* Pop-up images remover */

function imagelinks() {
    var a = document.getElementsByTagName("a");
    for ( var t = 0; t < a.length; ++t ) {
        var a2 = a[t];
        var img = a2.getElementsByTagName("img");
        if ( img[0] != null ) {
            if ( a2.href.indexOf("images.wikia.com") != -1 ) {
                var link = wgServer + '/wiki/File:' + a2.href.substring(a2.href.lastIndexOf('/') + 1);
                a2.setAttribute('href',link);
                a2.onclick = (function (link_a) { return function(){window.location=link_a; return false};})(link);
            }
        }
    }
}

addOnloadHook(imagelinks);

// <source lang="JavaScript">
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
 
 
    rights["Ajax 013"] = ["Bureaucrat"];
    rights["Brodie-001"] = ["Bureaucrat"];
    rights["Actene"] = ["Admin"];
    rights["Ahalosniper"] = ["Admin"];
    rights["Lordofmonsterisland"] = ["Admin"];
    rights["Anonymous ONI agent"] = ["Site Patrol"];
    rights["Lieutenant Davis"] = ["Site Patrol"];
    rights["Revan180193"] = ["Site Patrol"];
    rights["Minuteman 2492"] = ["Site Patrol"];
    rights["Sev40"] = ["Site Patrol"];
    rights["Distant Tide"] = ["Site Patrol"];
    rights["S-D379"] = ["Site Patrol"]; 
 
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
 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
 
 
// </source>