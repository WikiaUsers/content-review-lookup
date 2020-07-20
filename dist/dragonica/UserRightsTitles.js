// 07:52, January 12, 2013 (UTC)
// <source lang="JavaScript">

// WRITTEN BY User:Rappy_4187 from w:c:wow 
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU

// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

function addMastheadTags() {
  var rights = {};

// BEGIN List of Accounts Given Extra User Rights Icons using this format:
// rights["User Name"] = ["Tag1","Tag2","Tag3","etc. ..."],
 
     // Founder

rights["Kroova"] = ["Founder - Creator","Inactive Bureaucrat","Inactive Sysop (Admin)"],

     // Bureaucrats - Active

     // Bureaucrats - Inactive

     // Administrators (Sysops) - Active

rights["Tythesly"] = ["Sysop (Admin)", "Project WAM Founder", "Project WAM Leader"],

     // Administrators (Sysops) - Inactive

rights["Antebellum"]    = ["Inactive Sysop (Admin)"],

     // Non-Staff Bots

     // Patroller + Rollback

     // Patroller Only

     // Rollback Only

     // Moderators Only

     // Non-Admins on the wiki

     // Wikia Staff (all variations)

rights["Avatar"]         = ["Wikia Staff","Wikia Utilities"],
rights["Dopp"]           = ["Wikia Staff","Wikia Utilities"],
rights["Eulalia459678"]  = ["Volunteer Spam Task Force (VSTF)"],
rights["Jimbo Wales"]    = ["Wikia Staff"],
rights["Kirkburn"]       = ["Wikia Staff","Wikia Utilities"],
rights["KyleH"]          = ["Wikia Staff","Wikia Utilities"],
rights["MerryStar"]      = ["Wikia Staff","Wikia Utilities"],
rights["Minerva Titani"] = ["Wikia Helper","CheckUser-Global"],
rights["Moli.wikia"]     = ["Wikia Staff","Wikia Utilities"],
rights["Randomtime"]     = ["Volunteer Spam Task Force (VSTF)"],
rights["Rappy 4187"]     = ["Wikia Staff"],
rights["Sannse"]         = ["Wikia Staff","Wikia Utilities"],
rights["Sarah Manley"]   = ["Wikia Staff","Wikia Utilities"],
rights["Sulfur"]         = ["Volunteer Spam Task Force (VSTF)"],
rights["Toughpigs"]      = ["Wikia Staff","Wikia Utilities"],

     // Wikia bots

rights["Default"]           = ["Wikia Setup Bot"],
rights["MediaWiki default"] = ["Wikia MediaWiki bot"],
rights["QATestsBot"]        = ["Wikia Quality Assurance Test Bot"], 
rights["WikiaBot"]          = ["Wikia Bot"], 
rights["Wikia"]             = ["Wikia User Bot"],

rights["END OF LIST"]       = ["END OF LIST"];

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