


// 14:39, November 25, 2011 (UTC)
// <source lang="JavaScript">
// CODE WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // Projektanci
 
  rights["DizzY"]                    = ["Shinigami","4-latek"],
  rights["Retsuunochana"]            = ["Gwałcicielka na zlecenie","Major"],
  rights["SweetDreams1"]             = ["Shinigami"],
  rights["TouchFly"]                 = ["Pieseł"],
  rights["GhostlyFan"]                 = ["Brony"],
  rights["Salai69"]                  = ["Shinigami","Demon","Proxy","Rysowniczka","Królowa Yaoiców","Mentor","Toperz","Władczyni Piekieł","Pegasister","Technik","Diller jointów","Otaku","Mangozjeb","Yes, my lord","Szalony Kapelusznik",
  rights["Insanity223"]              = ["Shinigami","Demon"],["Obłąkanie"],["Anioł"],["Wąż"],["Właścicielka Pentagrammy"],["Otaku"],["Mangozjeb"],
  rights["MatDieep"]                 = ["Kasia & Mat cursed"],
  rights["BowserXL"]                 = ["Yoshi","Smok","Król Natury"],
  rights["TajemniczaVellox"]         = ["Opiekunka do dzieci"],
  rights["Loki the Killer"]           =["Nazgul"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// Przenosi interwiki do stopki na Specjalna:Forum
$(function(){ if ($('#forum-display').length ) { $('#forum-display').insertBefore('#WikiaFooter'); } });
// </source>