/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia

Skrypt został wyłączony w związku z testowym wdrożeniem innego rozwiązania w Common.js

$(document).ready(function () {
    var badgesTpl = document.getElementById('badges');
    if ((typeof badgesTpl !== "undefined") && (badgesTpl !== null)) {
        $("#badges").addClass("module");
        $('#WikiaRail').prepend(badgesTpl);
    }
});
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  rights["Rani19xx"]                   = ["Biurokratka"],
//  rights["Finealt"]                    = ["LeniwyBiurokrata"],
  rights["Fretka Flynn"]               = ["Rollback"],
  rights["Mateusz2097"]                = ["Rollback"];
  rights["Fineasz Flynn"]              = ["Rollback"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
$(".big-img").click(function () {
  $(this).hide(500, function () {
    $(this).remove();
  });
});

*/