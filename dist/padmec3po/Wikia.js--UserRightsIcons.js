function addMastheadTags() {
  var rights = {};
  var crat       = "<span class='tag'>Super Mod Commander</span>";
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
  var klinsserv = "<span class='tag'>Klin's Servant</span>";
  var patroller  = "<span class='tag'>Amazingly Awesome Admin</span>";
 
 
  rights["Legoguy1866"]      = founder + inadmin;
  rights["Drew1200"]         = crat + checkuser;
  rights["LBK10"]  = crat;
  rights["Nehpets700"]      = klinsserv;
  rights["Kai The Fire Ninja"]      = klinsserv;
  rights["Danielboone6702"]  = admin + checkuser;
  rights["LegoI3rickI3uilder"] = admin;
  rights["Seaside98"]        = admin;
  rights["Agent_Swipe"]      = admin;
 
  rights["Seabot98"]         = bot;
  rights["Bot1200"]          = bot;
  rights["Bot6702"]          = bot;
 
  rights["1999bug"]          = mod + rollback;
  rights["A5637"]            = mod;
  rights["Alemas2005"]       = mod + rollback + patroller;
  rights["Aokpisz"]          = mod;
  rights["Apple123350"]      = mod;
  rights["Birdbot4444"]      = patroller;
  rights["Bud1955"]          = mod + councilor;
  rights["BusyCityGirl"]     = inmod;
  rights["Chipika123"]       = mod;
  rights["Dwarfminefan580"]  = mod + patroller;
  rights["Fancypantguy8"]    = mod;
  rights["Genralaustin"]     = inmod;
  rights["GuacamoleCCXR"]    = mod;
  rights["Idkwhoyouare"]     = mod;
  rights["Indigo~"]          = mod;
  rights["Invisible Hunter"] = mod + rollback + patroller;
  rights["Ireithien"]        = mod + rollback + patroller;
  rights["Jdude420"]         = mod + patroller;
  rights["Jediliam01"]       = inmod + inrollback;
  rights["Klintrin"]         = mod + rollback + patroller;
  rights["LEGOMessProductions1"] = mod;
  rights["Legostudios34"]    = mod;
  rights["Man.city1"]        = mod;
  rights["MiniTheFig"]       = mod + rollback + patroller;
  rights["NancyDrew4ever"]   = rollback + patroller;
  rights["Nxtstep101"]       = mod + patroller;
  rights["Obi the LEGO Fan"] = mod + rollback + patroller;
  rights["Pepsicola112"]     = mod;
  rights["PinguBonScott"]    = mod;
  rights["Riolu777"]         = mod;
  rights["Roa-LU"]           = mod;
  rights["The real cat1948"] = rollback + patroller;
  rights["TheNightwing44"]   = mod;
  rights["Wertys761"]        = mod;
 
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