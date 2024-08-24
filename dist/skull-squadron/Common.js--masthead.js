/*Ajouts d'entrées extra masthead pour les:
-Administrateurs
-Patrouilleurs
-Infos sur le staff
-Bots
*/
 
// Écrit par:Emperor_Jarjarkine
$(function() {
 var rights = {};
 
   //BUREAUCRATES
 
 rights["John Trololo"]                    = ["Bureaucrate"];
 
 
   //Administrateur+ Membre du mois (MDM)
 
 rights["Emperor Jarjarkine"]             = ["Administrateur","MDM Décembre 2013"];
 
  //ADMINISTRATORS
 
  rights["Portgas D. Dohv"] = ["Administrateur"];
  rights["WolfIce"]         = ["Administrateur"];
  if (typeof rights[wgTitle] != "undefined") {
 
   //PATROUILLEURS
 
 rights["WolfIce"]           = ["Conseiller"];
 
//Conseil
 rights["Portgas D. Dohv"]            = ["Conseiller"];
rights["TehBlaaz"]            = ["Conseiller"];
 
 
 
 
   //BOTS
 rights["Colonel Macro"]             = ["Bot"];
 rights["Major Erwin Smith"]             = ["Bot"];
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
     for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});