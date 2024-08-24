// <source lang="JavaScript">
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // BURÓCRATAS
 
  rights["DanielWW"]      = ["Presentador","Presentador de DTVW,"Kerorense","Español","Leshawnero"]
  rights["6teen"] = ["Presentador","Concursante de DTVW"]
  rights["Fabianignacio1999"] = ["Presentador","Concursante de DTVW","Inactivo"]
  rights["Codex12"] = ["Presentador","Ganador de DTVW","Inactivo"] 
 
   //Administradores 
  rights["Disney22"] = ["Chef","Leshawnera"] 
    // Moderadores 
  rights["Noahforever"] = ["Pasante","Sarcástico"] 
  rights["Marcos13Castillo"] = ["Pasante","Concursante de DTVW"]

 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="group">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>