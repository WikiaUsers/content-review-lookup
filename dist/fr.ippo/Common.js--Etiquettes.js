/* Any JavaScript here will be loaded for all users on every page load. */

// Script etiquettes (aucune idée de la source réelle)
console.log('ok etiq');
function addMastheadTags() 
{
      var rights = {};
      var user;
      
      rights.VaLoon = ["Fondateur"];
      rights['Think D. Solucer'] = ["Soummis de VaLoon"];
      rights['TerminatorGenesis'] = ["Robot"];
     
        if (wgCanonicalSpecialPageName == "Contributions")
            user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
        else
            user = wgTitle;
     
        if (typeof rights[user] != "undefined") 
        {
          $('.UserProfileMasthead .masthead-info span.tag').remove();
          for( var i=0, len=rights[user].length; i < len; i++) 
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
              '</span>').appendTo('.masthead-info hgroup');
        }
}
 
$(function() {
  if ($('#UserProfileMasthead'))
    addMastheadTags();
});