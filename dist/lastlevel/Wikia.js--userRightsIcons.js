// 21:22, June 27, 2012 (UTC)
// <source lang="JavaScript">

// WRITTEN BY User:Rappy_4187
// This code is meant to *supplement* current rights groups for users'
// mastheads on the wiki. It is not intended to replace Wikia's versions thereof.
// If you choose to use this code on your wiki, you must use it in the same manner.
// For example, it is not permissable to replace "admin" with "beat cop".
// Doing so, may be a breach of Wikia's Terms of Use.

// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

$(function() {
  var rights = {};

  // BEGIN List of Accounts Given Extra User Rights Icons

    // FOUNDERS

    rights["EnemyPeacemaker"]   = ["Co-Founder"],
    rights["Wattz2000"]         = ["Co-Founder"];

  // END List of Accounts Given Extra User Rights Icons

  // BEGIN Script to Remove Old Rights Icons & Insert New

    if (wgTitle == "Contributions") {
      var user = fbReturnToTitle.substring(fbReturnToTitle.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.group').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="group">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }

  // END Script to Remove Old Rights Icons & Insert New

});

// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

// </source>