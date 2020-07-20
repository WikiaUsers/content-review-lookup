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
rights["Woolva"] = ["Founder - Creator","Inactive Bureaucrat","Inactive Sysop (Admin)"],

     // Bureaucrats - Active

     // Bureaucrats - Inactive
rights["LunaC"]  = ["Inactive Bureaucrat","Inactive Sysop (Admin)", "Patroller&Rollback at Farmville wiki"],
rights["*-jester-*"] = ["Inactive Bureaucrat","Inactive Sysop (Admin)", "fb-user"],
rights["Fireranaurion"] = ["Inactive Bureaucrat","Inactive Sysop (Admin)", "Rollback"],
rights["Woolva"] = ["Founder - Creator","Inactive Bureaucrat","Inactive Sysop (Admin)"],

     // Administrators (Sysops) - Active

     // Administrators (Sysops) - Inactive
rights["Tonille"] = ["Sysop (Admin)"],
rights["Spicie 006"] = ["Sysop (Admin)", "Patroller", "Rollback"],
rights["Greg Noel"] = ["Sysop (Admin)", "Patroller", "Rollback"],
rights["Woolva"] = ["Founder - Creator","Inactive Bureaucrat","Inactive Sysop (Admin)"],
rights["LunaC"]  = ["Inactive Bureaucrat","Inactive Sysop (Admin)", "Patroller&Rollback at Farmville wiki"],
rights["*-jester-*"] = ["Inactive Bureaucrat","Inactive Sysop (Admin)", "fb-user"],
rights["Fireranaurion"] = ["Inactive Bureaucrat","Inactive Sysop (Admin)", "Rollback"],

     // Patroller + Rollback
rights["Spicie 006"]       = ["Patroller", "Rollback"],

     // Patroller Only

     // Rollback Only

     // Moderators Only

     // Non-Admins on the wiki
rights["Hollibeth"] = ["user", "editor", "hard worker"],
rights["Goodlad"] = ["user", "Image-Guru"],
rights["Divine Wrath"] = ["user", "editor", "hard worker"],
rights["Lord0din69"] = ["user", "editor", "hard worker"],
rights["Hiddenchronicleskozani"] = ["user", "editor", "hard worker"],
rights["Crispycrispin"] = ["user", "editor", "hard worker"],
rights["Yyyvonne"] = ["user", "editor", "hard worker"],
rights["Deaconu Andrei"] = ["user", "editor", "hard worker"],
rights["Tyciol"] = ["user", "editor", "hard worker"],
rights["Miha Mitič"] = ["user", "editor", "hard worker"],
rights["TalinaQ"] = ["user", "editor", "hard worker"],
rights["Odelacr01"] = ["user", "editor", "hard worker"],
rights["Ahlam jassim"] = ["user", "editor", "hard worker"],
rights["Alto-enciel"] = ["user"],
rights["J36miles"] = ["user"],
rights["Drew1200"] = ["user", "visitor", "helper"],
rights["Baltaisguru"] = ["user"],
rights["Siva.orcldba"] = ["user"],
rights["Aphaia"] = ["user"],
rights["Carsrac"] = ["user", "editor"],
rights["Fefe20906"] = ["user", "editor"],
rights["Hemanth Immanuel"] = ["user", "editor"],
rights["Matt620"] = ["user", "editor"],
rights["Roche Bernardo"] = ["user", "editor"],
rights["Loknica"] = ["user", "editor"],
rights["Djtoko"] = ["user", "editor"],
rights["Caroparo"] = ["user", "editor"],
rights["Sdfgbh"] = ["user", "editor"],
rights["Naat.xX9"] = ["user", "editor"],
rights["Ofearna"] = ["user", "editor"],
rights["Goodlad"] = ["user", "editor"],
rights["Jayts81"] = ["user", "editor"],
rights["Moonlove"] = ["user", "editor"],
rights["Vandraedha"] = ["friend of the wiki"],

     // Wikia Staff (all variations)
rights["Sarah Manley"] = ["util","staff"],
rights["Rappy 4187"] = ["util","staff"],
rights["Sannse"] = ["util","staff"],
rights["Xean"] = ["util","staff"],
rights["Wildecoyote"] = ["council"],
rights["Avatar"] = ["util","staff"],
rights["Toughpigs"] = ["util","staff"],
rights["Toughpigs"] = ["util","staff"],
rights["Jimbo Wales"] = ["util","staff"],
rights["WikiaBot"] = ["Wikia Bot", "staff", "bot-global"], 
rights["Wikia"] = ["staff", "bot-global"], 

     // Wikia bots
rights["WikiaBot"]          = ["Wikia Bot", "staff", "bot-global"], 
rights["Wikia"] = ["staff", "bot-global"], 
rights["Default"] = ["bot-global"], 
rights["CreateWiki script"] = ["bot-global"], 

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