// 04:40, March 15, 2014 (UTC)
// <source lang="JavaScript">

// WRITTEN BY User: Rappy_4187 (originally called "userRightsIcons.js")
// MODIFIED BY User: Fandyllic
//   Custom background color based on "Administrator", "Bureaucrat", "Founder", or "Inactive"
//   Other tags use inherited "tag" class CSS
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU

// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

function addMastheadTags() {
  var rights = {};
  var userRightsAdministratorStyle = "background-color: #5588a6;";
  var userRightsBureaucratStyle = "background-color: #55a896;";
  var userRightsFounderStyle = "background-color: #a65856;";
  var userRightsInactiveStyle = "background-color: #848484;";
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // STAFF
 // rights["?"]       = ["Staff"],

    // FOUNDERS
 
    rights["Swannie"] = ["Founder","Bureaucrat Emeritus","Administrator"],
 
    // BUREAUCRATS
 
    rights["Fandyllic"] = ["Bureaucrat","Administrator","Mostly Retired"],
 // rights[""]          = ["Bureaucrat","Administrator"],
 
    // BUREAUCRATS EMERITUS
 
    rights["Lcawte"] = ["Bureaucrat Emeritus","Administrator"],
 
    // ADMINISTRATORS
 
    rights["Inuyasha-titan"] = ["Administrator"],
    rights["Rswfan"]         = ["Administrator"], 
 // rights["Queennicolee"]   = ["Administrator"],

    // ADMINISTRATORS EMERITUS
 
 // rights[""] = ["Administrator Emeritus"],


    // ROLLBACK

 // rights[""]    = ["Rollback"], 
 
    // MISCELLANEOUS
 
 // rights[""]       = ["Misc","Stuff"],

   // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]       = ["Wikia Bot"], 
  rights["Wikia"]          = ["Wikia User Bot"];
 
  // END List of Accounts Given Extra User Rights Icons

  // BEGIN Script to Remove Old Rights Icons & Insert New

    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        if (rights[user][i] == "Administrator")
          // add new rights for "Administrator"
          $('<span class="userRightsAdministratorStyle tag usergroup-' + rights[user][i].toLowerCase() + '" style="' + userRightsAdministratorStyle + ' margin-left: 8px !important;">' + rights[user][i] + '</span>').appendTo('.masthead-info hgroup');

        else if (rights[user][i] == "Bureaucrat")
          // add new rights for "Bureaucrat"
           $('<span class="userRightsBureaucratStyle tag usergroup-' + rights[user][i].toLowerCase() + '" style="' + userRightsBureaucratStyle + ' margin-left: 8px !important;">' + rights[user][i] + '</span>').appendTo('.masthead-info hgroup');

       else if (rights[user][i] == "Founder")
          // add new rights for "Founder"
          $('<span class="userRightsFounderStyle tag usergroup-' + rights[user][i].toLowerCase() + '" style="' + userRightsFounderStyle + ' margin-left: 8px !important;">' + rights[user][i] + '</span>').appendTo('.masthead-info hgroup');

       else if (rights[user][i] == "Inactive")
          // add new rights for "Inactive"
          $('<span class="userRightsInactiveStyle tag usergroup-' + rights[user][i].toLowerCase() + '" style="' + userRightsInactiveStyle + ' margin-left: 8px !important;">' + rights[user][i] + '</span>').appendTo('.masthead-info hgroup');
       else $('<span class="tag" style="margin-left: 8px !important;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
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