function addMastheadTags() {
  var rights = {};
  var galvs      = "<span class='tag'>Galv's Servant</span>";
  var crat       = "<span class='tag'>Super Mod Commander</span>";
  var admin      = "<span class='tag'><font color="green">Administrator</font></span>";
  var inadmin    = "<span class='tag'>Inactive Administrator</span>";
  var bot        = "<span class='tag'><a style='color:#cfd2da;' href= '/wiki/LSW Creations Wiki:Bots'>Bot</a></span>";
  var inbot      = "<span class='tag'>Inactive Bot</span>";
  var founder    = "<span class='tag'>Founder</span>";
  var checkuser  = "<span class='tag'>Checkuser</span>";
  var rollback   = "<span class='tag'>Rollback</span>";
  var mod        = "<span class='tag'>Moderator</span>";
  var councilor  = "<span class='tag'>Councilor</span>";
  var banrequest = "<span class='tag'>Banned From Chat (Personal Request)</span>";
  var cool       = "<span class='tag'>Hey look I'm awesome!</span>";
 
 
  rights["Kingjulian13"]      = galvs;
  
 
  if (typeof rights[wgTitle] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    $(".masthead-info hgroup").append(rights[wgTitle])
  }
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});