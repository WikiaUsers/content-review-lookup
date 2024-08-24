/* Any JavaScript here will be loaded for all users on every page load. */

// Cr�ation de d'une liste des comptes concern�s par une �tiquette

function addMastheadTags() {
  var rights = {};
 
  // Liste
 
   //BOT (ROBOTS)
 
   //BUREAUCRATES
 
    rights["Non0w"]              = ["Ma�tre de Guilde"];
 
   //ADMINS
 
    rights["Shin-itchi"] = ["Ma�tre Chasseur"];
    rights["Wrondral"] = ["Ma�tre Chasseur"];
    rights["Cizalto"]  = ["Ma�tre Chasseur"];
    rights["Badbart86"] = ["Ma�tre Chasseur"];
    rights["Narzaal"] = ["Ma�tre Chasseur"];

   //DISPARU(S/ES)
 
    rights["Fandemanga62"]    = ["Ma�tre Chasseur (Inactif)"];
 
   //MOD�RATEUR DU TCHAT
    rights["Bllob"]         = ["Chasseur d'�lite"];
    rights["Dysmea"] = ["Chasseur d'�lite"];
    rights["Manipendeh"] = ["Chasseur d'�lite"];

 
   //ROLLBACK
    
  // Fin de la liste des comptes concern�s
 
  // D�but du Script qui permet de changer les �tiquettes
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // Retrait des anciens droits
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // Fin du Script qui retire les anciennes �tiquettes et en met des nouvelles
 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// FIN DU SCRIPT