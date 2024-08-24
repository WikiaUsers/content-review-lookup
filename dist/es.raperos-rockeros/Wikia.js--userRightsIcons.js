// <source lang="JavaScript">
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons

 // BUREAUCRATS
 
    rights["Michelle Michelle"]               = ["LA DIOSA, MICHELLE MA BELLE"];

   // CHATMOD
 
    rights["Cake la Gata."]               = ["GATA LOCA"];
    rights["Llywelyn Ludwig"]         = ["SIRENO","LECHERO"];
    rights["Alice :3"]                 = ["AMIGA DE MICHELLE"];
    rights["Sir Arthur Connor"]         = ["GATO MONGOLO"];

  // ADMINS

    rights["SealShyl"]               = ["SEXO DUDOSO","ASPIRANTE PA' DOBLAJE CON CLAUDIA URBÁN"];
    rights["Temor-memes"]               = ["TUMOR","CAGÓN"];

 // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
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
 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
// </source>