/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */
$(function() {
  var rights = {};
 
  rights["Masza108"]               = ["Lea Webcam"];
  rights["Czikorita08"]               = ["Silver Ice"];
  rights["RainbowStar100"]               = ["Wiktoria"];
  rights["Lyra1231"]       = ["Anaira"];
 
  if (typeof rights[wgTitle] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.tag').remove();
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});