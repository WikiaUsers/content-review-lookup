// <source lang="JavaScript">
// WRITTEN BY USER:RAPPY_4187

function addMastheadTags() {
    var rights  = {},
        user    = "";
 
    // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // GROUP 2
 
    rights["Jamiem2001"]    = ["Founder", "Admin", "Bureaucrat"],
    rights["Awildmew"]      = ["Admin", "Chat Moderator"],
    rights["Igor0The0Mii2"] = ["Admin", "Chat Moderator"],
    
    rights["Non-existent User"] = ["Do not remove this line"];

    if (wgCanonicalSpecialPageName == "Contributions") {
        user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { 
        user = wgTitle; 
    }
 
    if (typeof rights[user] != "undefined") {
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        for( var i=0, len=rights[user].length; i < len; i++) {
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
}
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});

// </source>