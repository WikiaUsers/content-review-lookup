// <source lang="JavaScript">

$(function() {
  var rights = {};
 
  // Usuarios con etiquetas personalizadas
    
  rights["Kenbill"]          = ["Fundador"];
 
  if (typeof rights[wgTitle] != "undefined") {
    // Quitamos las antiguas etiquetas...
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // ...y añadimos las nuevas
      $('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>