/* Tout code Javascript se trouvant sur cette page sera visible pour tous. */
 
// Création de d'une liste des comptes concernés par une étiquette Noms par ORDRE ALPHABETIQUE

function addMastheadTags() {
  var rights = {};
 
  // Liste
 
   //BOT (ROBOTS)
 
    rights["Colonel Macro"]             = ["Robot"];
    rights["Wikia"]                     = ["Robot"];
    rights["Major Erwin Smith"]         = ["Robot"];

   //FONDATEUR

    rights["Jailo"]                     = ["Hunter Légendaire"];

   //BUREAUCRATE
 
    rights["Jolsma"]                    = ["Présidente Hunter"];

 
   //ADMINS
 
    rights["Magickirua"]                = ["Vice-Président Hunter"];
    rights["WolfIce"]                   = ["Vice-Président Hunter"];
                                        
                                           
   //MODÉRATEUR DU TCHAT

    rights["Koogers17"]                  = ["Membre des Zodiaques"]; 

   //ROLLBACK

  // Fin de la liste des comptes concernés
 
  // Début du Script qui permet de changer les etiquettes
 
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