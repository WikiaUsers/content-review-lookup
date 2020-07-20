/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
// WRITTEN BY User:Rappy_4187
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["Никитос12332145"]       = ["ТЕХ. АДМИН", "ОСНОВАТЕЛЬ"];
    rights["Grand wizard Scrolls Spell master"]       = ["БОТ"];
 
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
/***************************/
/***** Script Imports ******/
/***************************/
 

$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
importArticles({
    type: 'script',
    articles: [
        'u:dev:DisplayClock/code.js',
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:HighlightUsers/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:WallGreetingButton/code.js'
    ]
});
/* HighlightUsers */
highlight = {
    selectAll: true,
    bot: '#60F',
    staff: '#008',
    vstf: '#008'
};