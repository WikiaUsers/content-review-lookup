// <source lang="JavaScript"> 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS 

function addMastheadTags() { 
    var rights = {}; 
    // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags

    // BUREAUCRATS 
    rights["Mystical Jade"] = ["Bureaucrat", "Administrator", "Rollback", "Chat Moderator", "Founder" ];

    // OTHERS 
    rights["The Great Lord David"] = ["Wiki Adviser" ];
    

    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else if (wgCanonicalSpecialPageName == "Following") {
      var user = wgUserName;
    } else {
      var user = wgTitle;
    }
 
    if (typeof rights[user] != "undefined") {
       for( var i=0, len=rights[user].length; i < len; i++) {
         // add new rights
         $('<span class="tag" style="margin-left: 10px !important;">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
       }
    }
}

$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});