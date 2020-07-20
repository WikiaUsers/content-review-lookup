/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */

/* Plakietka "Nieakwywny" */

InactiveUsers = { text: 'Nieaktywny' };
importScriptPage('InactiveUsers/code.js', 'dev');

/* Inne Palkietki */

$(function() {
  var rights = {};
  
  rights["Maciek1222201"]               = ["Administrator", "Biurokrata", "Detektyw"]
 
  if (typeof rights[wgTitle] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.tag').remove();
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});