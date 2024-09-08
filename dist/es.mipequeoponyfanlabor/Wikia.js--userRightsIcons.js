// <source lang="JavaScript">
 
 
$(function() {
  var rights = {};
 
  // LISTA DE USUARIOS CON CARGOS EXTRA (BOTÓN)
 
    // BURÓCRATA
 
  rights["Peach_Asamiya"]      = ["Burócrata","Admin"]

  // FIN DE LA LISTA CON USUARIOS DE CARGO EXTRA (BOTÓN)
 
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