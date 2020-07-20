/* Hello, I'll hide this code temporally to see if the MediaWiki:Common.js */
/* new tags code works, because right now it was glitchly. If the common.js */
/* code works, this page won't be deleted. It will keep as how it is right */
/* now. (If you think this page needs to be deleted, then do it. Thanks. */
/*
// 19:49, September 4, 2012 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
    var rights = {},
        user = "";
 
    // BEGIN List of Accounts Given Extra User Rights Icons
 
    // Burócratas
    rights["BowserRDML"]            = ["Burócrata"];
    rights["Thundenix"]             = ["Burócrata"];
    rights["Alejandro171"]          = ["Burócrata"];
    rights["Thundenix"]             = ["Burócrata"];
    rights["XMonsterLegend"]        = ["Burócrata"];
    
    // Administradores
    rights["Dannyth92"]             = ["Administrador"];
    rights["Marian1781"]            = ["Administrador"];
    rights["Tobias Alcaraz"]        = ["Administrador"];
    rights["Klout4"]                = ["Administrador"];
    
    //Reversores
    rights["Klout4"]                = ["Reversor"];
    
    // Moderadores del chat
    rights["Ebenecer"]              = ["Moderador del chat"];
    rights["Pxndx Clxus"]           = ["Moderador del chat"];
    
    // Moderadores de discusiónes
    rights["BranDaniMB"]            = ["Moderador de discusiónes"];
    rights["Klout4"]                = ["Moderador de discusiónes"];
    
    // Moderadores de contenido
    rights["BranDaniMB"]            = ["Moderador de contenido"];
    rights["Klout4"]                = ["Moderador de contenido"];
 
    // GROUP 2
    rights["Professor Chingleto"]   = ["Boluh con sombrero de copa"];
 
    // END List of Accounts Given Extra User Rights Icons
 
    // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
        user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
         // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
}
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
*/