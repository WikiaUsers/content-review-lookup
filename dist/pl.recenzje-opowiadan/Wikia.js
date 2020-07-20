$(function() {
  var rights = {};
 
// Rangi Użytkowników
 
  rights["Zorrozo"]                  = ["Poważny biznesman","Tomarz"];
  rights["Kane188"]                  = ["Technik","Rewolucjonista"];
  rights["Pedator"]                  = ["Administrator","Krzyżak"];
  rights["Thiannne"]                 = ["Creepypastorka","Gamerka","Siecioholiczka"]
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});