function addMastheadTags() {
  var rights = {};
  var crat       = "<span class='tag'>Super Mod Commander</span>";
  var admin      = "<span class='tag'><font color="green">Administrator</font></span>";
  var inadmin    = "<span class='tag'>Inactive Administrator</span>";
  var bot        = "<span class='tag'><a style='color:#cfd2da;' href= '/wiki/Lego Message Boards Wiki:Bots'>Bot</a></span>";
  var inbot      = "<span class='tag'>Inactive Bot</span>";
  var founder    = "<span class='tag'>Founder</span>";
  var checkuser  = "<span class='tag'>Checkuser</span>";
  var rollback   = "<span class='tag'>Rollback</span>";
  var mod        = "<span class='tag'>Moderator</span>";
  var councilor  = "<span class='tag'>Councilor</span>";
  var banrequest = "<span class='tag'>Banned From Chat (Personal Request)</span>";
  var cool       = "<span class='tag'>Hey look I'm awesome!</span>";


  rights["Legoguy1866"]      = founder + inadmin;
  rights["Drew1200"]         = crat + checkuser;
  rights["Legobatmankid10"]  = crat;
  rights["Eagleeyedan"]      = inadmin;
  rights["BusyCityGuy"]      = inadmin;
  rights["Danielboone6702"]  = admin + checkuser;
  rights["LegoI3rickI3uilder"] = admin;
  rights["Seaside98"]        = admin;
  rights["Agent_Swipe"]      = admin;
  
  rights["Seabot98"]         = bot;
  rights["Bot1200"]          = bot;
 
  rights["1999bug"]          = mod + rollback;
  rights["Bud1955"]          = mod + councilor;
  rights["BusyCityGirl"]     = mod;
  rights["Fancypantguy8"]    = mod;
  rights["Genralaustin"]     = mod;
  rights["Invisible Hunter"] = mod + rollback;
  rights["Legostudios34"]    = mod;
  rights["Man.city1"]        = mod;
  rights["Pepsicola112"]     = mod;
  rights["Riolu777"]         = mod;
  rights["Wertys761"]        = mod;
  rights["Obi_the_LEGO_Fan"] = admin;
  rights["Klintrin"]         = crat;

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