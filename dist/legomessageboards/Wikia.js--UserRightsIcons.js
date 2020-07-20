/* This page is no longer in use, user tags have been moved to a different script that will automatically keep them updated. 
If you see any glitches, report them to Seaside */
function addMastheadTags() {
  var title      = wgTitle.replace("Contributions/","");
  var rights     = {};
  var crat       = "<span class='tag'><a style='color:#cfd2da;' href='/wiki/Lego_Message_Boards_Wiki%3AAdministrators'>Super Mod Commander</a></span>";
  var admin      = "<span class='tag'><a style='color:#cfd2da;' href='/wiki/Lego_Message_Boards_Wiki%3AAdministrators'>Administrator</a></span>";
  var inadmin    = "<span class='tag'>Inactive Administrator</span>";
  var bot        = "<span class='tag'><a style='color:#cfd2da;' href= '/wiki/Lego Message Boards Wiki:Bots'>Bot</a></span>";
  var inbot      = "<span class='tag'>Inactive Bot</span>";
  var founder    = "<span class='tag'>Founder</span>";
  var checkuser  = "<span class='tag'>Checkuser</span>";
  var rollback   = "<span class='tag'>Rollback</span>";
  var inrollback = "<span class='tag'>Inactive Rollback</span>";
  var mod        = "<span class='tag'>Moderator</span>";
  var inmod      = "<span class='tag'>Inactive Moderator</span>";
  var councilor  = "<span class='tag'>Councilor</span>";
  var banrequest = "<span class='tag'>Banned From Chat (Personal Request)</span>";
  var patroller  = "<span class='tag'>Patroller</span>";

  rights["Legoguy1866"]      = founder + inadmin;
  rights["Drew1200"]         = crat + checkuser;
  rights["Seaside98"]        = inadmin;
  rights["LBK10"]            = inadmin + crat;
  rights["BusyCityGuy"]      = crat;
  rights["Eagleeyedan"]      = inadmin;
  rights["Danielboone6702"]  = crat + checkuser;
  rights["LegoI3rickI3uilder"] = inadmin;
  rights["Agent_Swipe"]      = inadmin;
  rights["Obi the LEGO Fan"] = admin;
  rights["Riolu777"]         = admin;
  rights["Malc."]            = admin;
  rights["Nxtstep101"]       = admin;
  
  rights["SauceBot"]         = bot;
  rights["Seabot98"]         = bot;
  rights["Bot1200"]          = bot;
  rights["Bot6702"]          = bot;
  rights["NXTbot"]           = bot;
  rights["LMBWikiBot"]   = bot;
 
  rights["75x"]              = inmod;
  rights["1999bug"]          = inmod + patroller;
  rights["A5637"]            = mod;
  rights["Agent Spy"]        = mod + patroller;
  rights["Alemas2005"]       = mod + patroller;
  rights["Aokpisz"]          = mod;
  rights["Apple123350"]      = mod;
  rights["Birdbot4444"]      = patroller;
  rights["Bud1955"]          = inmod + councilor;
  rights["BusyCityGirl"]     = mod;
  rights["Cipher Brony"]     = inmod
  rights["Dwarfminefan580"]  = inmod + patroller;
  rights["Fancypantguy8"]    = inmod;
  rights["Genralaustin"]     = inmod;
  rights["GuacamoleCCXR"]    = mod;
  rights["Idkwhoyouare"]     = mod;
  rights["Indigo~"]          = mod;
  rights["Invisible Hunter"] = mod + patroller;
  rights["Ireithien"]        = mod + patroller;
  rights["Jdude420"]         = mod + patroller;
  rights["Jediliam01"]       = inmod + inrollback;
  rights["LEGOMessProductions1"] = mod;
  rights["Legostudios34"]    = mod;
  rights["Man.city1"]        = mod;
  rights["MiniTheFig"]       = inmod + patroller;
  rights["NancyDrew4ever"]   = patroller;
  rights["Pepsicola112"]     = inmod;
  rights["PinguBonScott"]    = inmod;
  rights["RePeat"]           = patroller
  rights["Wertys761"]        = inmod;
  rights["Sadistica"]        = mod;
  rights["Gslover1"]         = mod;
  rights["AravisOfNarnia"]   = mod;
  rights["Loney 97"]         = mod;

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