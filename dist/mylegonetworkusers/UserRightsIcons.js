function addMastheadTags() {
  var title      = wgTitle.replace("Contributions/","");
  var rights     = {};
  var crat       = "<span class='tag'>Secret Networker</span>";
  var admin      = "<span class='tag'>Networker</span>";
  var inadmin    = "<span class='tag'>Inactive Networker</span>";
  var bot        = "<span class='tag'>Bot</span>";
  var inbot      = "<span class='tag'>Inactive Bot</span>";
  var founder    = "<span class='tag'>Super Secret Networker</span>";
  var checkuser  = "<span class='tag'>Checkuser</span>";
  var rollback   = "<span class='tag'>Rank 10 User</span>";
  var inrollback = "<span class='tag'>Inactive Rank 10 User</span>";
  var mod        = "<span class='tag'>Rank 10 User</span>";
  var inmod      = "<span class='tag'>Inactive Rank 10 User</span>";
  var councilor  = "<span class='tag'>Councilor</span>";
  var banrequest = "<span class='tag'>Banned From Chat (Personal Request)</span>";
  var patroller  = "<span class='tag'>Rank 9 User</span>";
 
 
  rights["Agent_Spy"]      = founder + crat;
  rights["Yoyoer1000"]      = crat + inadmin;
  rights["Hugh-Z"]      = admin;
  rights["Codyn329"]      = admin;

  rights["AgentBot"]      = bot + crat;

  rights["TAHU9908"]      = mod + rollback;
  
  if (typeof rights[title] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    $(".masthead-info hgroup").append(rights[title]);
  }
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});