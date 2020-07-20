// RANGOS PARA USUARIOS
$(function() {
  var rights = {};

  // WIKI INGLÉS
  rights["MakeShift"]                   = ["Contacto - Wiki inglés"];
  rights["TimeShade"]                   = ["Contacto - Wiki inglés"];
  rights["Wraiyf"]                      = ["Contacto - Wiki inglés"];
  // WIKI POLACO
  rights["Szynka013"]                   = ["Contacto - Wiki polaco"];
  rights["DarknessEyes23"]              = ["Contacto - Wiki polaco"];
  // WIKI FRANCÉS
  rights["Choupi"]                      = ["Contacto - Wiki francés"];
  rights["Brochy"]                      = ["Contacto - Wiki francés"];
  // WIKI BRASILEÑO
  rights["Fernando Marcos"]             = ["Contacto - Wiki brasileño"];
  rights["NetoMonteiro"]                = ["Contacto - Wiki brasileño"];
 
  if (typeof rights[wgTitle] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.tag').remove();
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
        $('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + 
            '</span>').appendTo('.masthead-info hgroup');
    }
  }
});

InactiveUsers = { text: 'inactivo' };

importArticles({
    type: 'script',
    articles: [
        'u:dev:InactiveUsers/code.js',
        'u:dev:Toggler.js',
    ]
});