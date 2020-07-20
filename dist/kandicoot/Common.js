/* Any JavaScript here will be loaded for all users on every page load. */
if (wgCanonicalNamespace == 'User' || wgCanonicalNamespace == 'User_talk') {
$('<span class="button" onclick="hideBar()">Hide</span>').insertAfter('.UserProfileActionButton');
$('<span class="button" onclick="showBar()">Show</span>').insertAfter('.UserProfileActionButton');
}
 
function hideBar() {
$('#UserProfileMasthead').hide();
}
 
function showBar() {
$('#UserProfileMasthead').show();
}
function addMastheadTags() {
  var rights 
= {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["Crash Kandicoot "]                
= ["THE BLOOPER'S CREATOR'"];
 
  // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName 
== "Contributions") {
      var user 
= wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user 
= wgTitle; }
 
  if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i
=0, len
=rights[user].length; i < len; i++) {
 
        // add new rights
        $('' + rights[user][i] +
          '').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
 
};
 
$(function() {
if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});