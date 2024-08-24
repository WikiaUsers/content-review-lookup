// RANGOS PARA USUARIOS
$(function() {
  var rights = {};

  // WIKI INGL�S
  rights["MakeShift"]                   = ["Contacto - Wiki ingl�s"];
  rights["TimeShade"]                   = ["Contacto - Wiki ingl�s"];
  rights["Wraiyf"]                      = ["Contacto - Wiki ingl�s"];
  // WIKI POLACO
  rights["Szynka013"]                   = ["Contacto - Wiki polaco"];
  rights["DarknessEyes23"]              = ["Contacto - Wiki polaco"];
  // WIKI FRANC�S
  rights["Choupi"]                      = ["Contacto - Wiki franc�s"];
  rights["Brochy"]                      = ["Contacto - Wiki franc�s"];
  // WIKI BRASILE�O
  rights["Fernando Marcos"]             = ["Contacto - Wiki brasile�o"];
  rights["NetoMonteiro"]                = ["Contacto - Wiki brasile�o"];
 
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