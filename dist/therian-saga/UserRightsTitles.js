// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
// WRITTEN BY USER:RAPPY_4187 from w:c:wow 
// Caveats: Does not work on Special:Contributions/username
 
// 07:52, January 12, 2013 (UTC)
// <source lang="JavaScript">
// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for ensuring compliance with Wikia’s ToU

// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

  // BEGIN List of Accounts Given Extra User Rights Titles using this format:
  // rights["User Name"] = ["Tag1","Tag2","Tag3","etc. ..."],
 
function addMastheadTags() {
    var rights = {};

     // Founder


rights["Fresi"] = ["Founder","Bureaucrat","Sysop (Admin)"],


     // Bureaucrats - Active


rights["Feherlo"] = ["Bureaucrat","Sysop (Admin)"],

rights["Tysk"] = ["Bureaucrat","Sysop (Admin)","Crossings owner"],


     // Bureaucrats - Inactive



     // Administrators (Sysops) - Active


rights["Jrooksjr"] = ["Sysop (Admin)","Templates Guy","Behind the scenes person","MediaWiki upkeeper"],

rights["Kasarn"] = ["Sysop (Admin)"],

rights["Shinsee"] = ["Sysop (Admin)"],


     // Administrators (Sysops) - Inactive



     // Rollback Only



     // Moderators Only



     // Other Wikis Only



     // Wikia Staff (all variations)


rights["Avatar"]          = ["Wikia Staff","Wikia Utilities"],

rights["Dopp"]            = ["Wikia Staff","Wikia Utilities"],

rights["Eulalia459678"]   = ["Volunteer Spam Task Force (VSTF)"],

rights["Jimbo Wales"]     = ["Wikia Staff"],

rights["JM Pessanha"]     = ["Wikia Helper", "Ikapédia (pt-br) - Founder", "Gameforge wiki (pt-br) - Founder", "GoblinKeeper wiki (pt-br) - Founder"],

rights["Kirkburn"]        = ["Wikia Staff","Wikia Utilities"],

rights["KyleH"]           = ["Wikia Staff","Wikia Utilities"],

rights["MerryStar"]       = ["Wikia Staff","Wikia Utilities"],

rights["Minerva Titani"]  = ["Wikia Helper","CheckUser-Global", "Ikariam (it) - Founder"],

rights["Moli.wikia"]      = ["Wikia Staff","Wikia Utilities"],

rights["Randomtime"]      = ["Volunteer Spam Task Force (VSTF)"],

rights["Rappy 4187"]      = ["Wikia Staff"],

rights["Sannse"]          = ["Wikia Staff","Wikia Utilities"],

rights["Sarah Manley"]    = ["Wikia Staff","Wikia Utilities"],

rights["Sulfur"]          = ["Volunteer Spam Task Force (VSTF)"],

rights["Toughpigs"]       = ["Wikia Staff","Wikia Utilities"],


     // Wikia bots


rights["Default"]           = ["Wikia Setup Bot"],

rights["MediaWiki default"] = ["Wikia MediaWiki bot"],

rights["QATestsBot"]        = ["Wikia Quality Assurance Test Bot"], 

rights["WikiaBot"]          = ["Wikia Bot"], 

rights["Wikia"]             = ["Wikia User Bot"],


rights["END OF USER LIST"] = ["END OF TITLE LIST"];

  // END List of Accounts Given Extra User Rights Titles

  // BEGIN Script to Remove Old Rights Titles & Insert New

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
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});

  // END Script to Remove Old Rights Titles & Insert New

// END CREATING ADDITIONAL USER RIGHTS TITLES FOR PROFILEMASTHEADS

// </source>