/* Any JavaScript here will be loaded for all users on every page load. */

// Création de d'une liste des comptes concernés par une étiquette

function addMastheadTags() {
  var rights = {};
 
  // Liste
 
   //BOT (ROBOTS)
 
   //BUREAUCRATES
 
    rights["Non0w"]              = ["Maître de Guilde"];
 
   //ADMINS
 
    rights["Shin-itchi"] = ["Maître Chasseur"];
    rights["Wrondral"] = ["Maître Chasseur"];
    rights["Cizalto"]  = ["Maître Chasseur"];
    rights["Badbart86"] = ["Maître Chasseur"];
    rights["Narzaal"] = ["Maître Chasseur"];

   //DISPARU(S/ES)
 
    rights["Fandemanga62"]    = ["Maître Chasseur (Inactif)"];
 
   //MODÉRATEUR DU TCHAT
    rights["Bllob"]         = ["Chasseur d'élite"];
    rights["Dysmea"] = ["Chasseur d'élite"];
    rights["Manipendeh"] = ["Chasseur d'élite"];

 
   //ROLLBACK
    
  // Fin de la liste des comptes concernés
 
  // Début du Script qui permet de changer les étiquettes
 
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
 
  // Fin du Script qui retire les anciennes étiquettes et en met des nouvelles
 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// FIN DU SCRIPT